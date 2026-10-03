import './styles/app.css';
import {
  FolderOpen, FolderInput, Save, FileDown, Printer, PenLine, Columns2, Eye, Sun, Moon, Settings, ShieldCheck,
  ShieldAlert, Lock, Plus, X, FileUp, TriangleAlert, Menu, Type, ChevronDown,
} from 'lucide';
import { Editor } from './app/editor';
import { Preview } from './app/preview';
import { buildToolbar } from './app/toolbar';
import { AssetStore } from './app/assets';
import { collectDropped, collectPicked, isMedia, isTextDoc, readTextFile, type IncomingFile } from './app/files';
import { basename, dirname, pathKey, resolveRef } from './app/paths';
import { renderDocument, type Protection, type Issue } from './markdown/pipeline';
import { $, h, icon, toast, confirmDialog, bindPopover, showPopover, closePopover, download } from './app/ui';
import { settings, saveSettings, storage } from './app/settings';
import { t, setLocale, detectLocale, isLocale, locale, translateDom, LOCALES } from './i18n';

// ---------------------------------------------------------------- state

interface Doc {
  id: string;
  name: string;
  path: string;
  text: string;
  savedText: string;
  encoding: string;
  /** Untouched sample or empty tab — replaced when files are opened. */
  pristine: boolean;
  /** The welcome document; re-translated on language change while untouched. */
  sample?: boolean;
}

const DOCS_KEY = 'mpe:docs';
let docs: Doc[] = [];
let active!: Doc;
let seq = 0;
const newId = () => `d${Date.now().toString(36)}${(++seq).toString(36)}`;

// Protection is never persisted: every page load starts in full protection.
const protection: Protection = { links: false, images: false, media: false };

const assets = new AssetStore();
let lastIssues: Issue[] = [];
let pendingAnchor: string | null = null;

// ---------------------------------------------------------------- theme

const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

/** A link can ask for a theme with ?theme=dark|light; it applies to this tab until the user picks one. */
function readThemeHint(): 'light' | 'dark' | null {
  const params = new URLSearchParams(location.search);
  let hint = params.get('theme');
  try {
    if (hint === 'light' || hint === 'dark') sessionStorage.setItem('mpe:theme-hint', hint);
    else hint = sessionStorage.getItem('mpe:theme-hint');
  } catch {
    /* storage unavailable: the hint still applies to this page view */
  }
  if (params.has('theme')) {
    params.delete('theme');
    const query = params.toString();
    history.replaceState(history.state, '', location.pathname + (query ? '?' + query : '') + location.hash);
  }
  return hint === 'light' || hint === 'dark' ? hint : null;
}
const themeHint = readThemeHint();
const effectiveTheme = (): 'light' | 'dark' => settings.theme ?? themeHint ?? (systemDark.matches ? 'dark' : 'light');

function applyTheme(rerender = true) {
  const theme = effectiveTheme();
  document.documentElement.dataset.theme = theme;
  const btn = $('theme-btn');
  btn.replaceChildren(icon(theme === 'dark' ? Sun : Moon));
  btn.title = t(theme === 'dark' ? 'theme.light' : 'theme.dark');
  btn.setAttribute('aria-label', btn.title);
  preview?.setTheme(theme);
  if (rerender && preview) scheduleRender(0);
}
systemDark.addEventListener('change', () => settings.theme === null && themeHint === null && applyTheme());

// ---------------------------------------------------------------- editor & preview

const editor = new Editor({
  parent: $('editor-host'),
  onChange(text) {
    active.text = text;
    if (active.pristine) active.pristine = false;
    updateTabs();
    updateCounts();
    scheduleRender();
    schedulePersist();
  },
  onScroll: () => syncScroll('editor'),
  onSave: () => saveActive(),
});

const preview = new Preview($('preview-host'), {
  onExternalLink: openExternal,
  onDocLink(docId, hash) {
    const doc = docs.find((d) => d.id === docId);
    if (!doc) return;
    pendingAnchor = hash;
    activate(doc);
  },
  onScroll: () => syncScroll('preview'),
  onKeydown: handleShortcut,
  onDropAttempt: () => toast(t('drop.wrongPlace'), 'info'),
});

// ---------------------------------------------------------------- rendering

let renderTimer = 0;
let renderSeq = 0;

function scheduleRender(delay = 120) {
  clearTimeout(renderTimer);
  renderTimer = window.setTimeout(renderNow, delay);
}

function resolveDoc(ref: string, docPath: string): string | null {
  const key = pathKey(resolveRef(ref, docPath));
  const exact = docs.find((d) => pathKey(d.path) === key);
  if (exact) return exact.id;
  const name = basename(key);
  const byName = docs.filter((d) => basename(pathKey(d.path)) === name);
  return byName.length === 1 ? byName[0].id : null;
}

async function renderNow() {
  const mySeq = ++renderSeq;
  const doc = active;
  try {
    const result = await renderDocument(doc.text, {
      docPath: doc.path,
      protection: { ...protection },
      theme: effectiveTheme(),
      resolveAsset: (ref, path) => assets.resolve(ref, path),
      resolveDoc,
    });
    if (mySeq !== renderSeq) return;
    preview.setContent(result.html);
    lastIssues = result.issues;
    updateIssues(result.stats);
    if (pendingAnchor) {
      const anchor = pendingAnchor;
      pendingAnchor = null;
      requestAnimationFrame(() => preview.scrollToAnchor(anchor));
    } else if (settings.sync && lastScrollSource !== 'preview') {
      preview.scrollToLine(editor.topLine(), editor.view.state.doc.lines);
    }
  } catch (err) {
    console.error(err);
    toast(t('render.error', { error: (err as Error).message }), 'error');
  }
}

// ---------------------------------------------------------------- scroll sync

let scrollLock: 'editor' | 'preview' | null = null;
let lastScrollSource: 'editor' | 'preview' | null = null;
let unlockTimer = 0;

function syncScroll(source: 'editor' | 'preview') {
  if (!settings.sync || settings.view !== 'both') return;
  if (scrollLock && scrollLock !== source) return;
  scrollLock = source;
  lastScrollSource = source;
  const lines = editor.view.state.doc.lines;
  if (source === 'editor') preview.scrollToLine(editor.topLine(), lines);
  else editor.scrollToLine(preview.topLine(lines));
  clearTimeout(unlockTimer);
  unlockTimer = window.setTimeout(() => (scrollLock = null), 120);
}

// ---------------------------------------------------------------- documents & tabs

function createDoc(name: string, text: string, opts: Partial<Doc> = {}): Doc {
  const doc: Doc = { id: newId(), name, path: opts.path ?? name, text, savedText: opts.savedText ?? text, encoding: 'UTF-8', pristine: false, ...opts };
  docs.push(doc);
  return doc;
}

const isDirty = (d: Doc) => d.text !== d.savedText;

function activate(doc: Doc) {
  const changed = active !== doc;
  active = doc;
  editor.open(doc.id, doc.text);
  updateTabs();
  updateCounts();
  if (changed) preview.setContent('');
  scheduleRender(0);
  schedulePersist();
}

function untitledName(): string {
  let n = 1;
  while (docs.some((d) => d.name === t('tab.untitled', { n }))) n++;
  return t('tab.untitled', { n });
}

function newDocument() {
  const doc = createDoc(untitledName(), '', { pristine: true });
  activate(doc);
  editor.focus();
}

async function closeDoc(doc: Doc) {
  if (isDirty(doc) && !doc.pristine && doc.text.trim()) {
    const ok = await confirmDialog({
      title: t('close.title'),
      body: [t('close.body', { name: doc.name })],
      ok: t('tab.close'),
      danger: true,
    });
    if (!ok) return;
  }
  const index = docs.indexOf(doc);
  docs.splice(index, 1);
  editor.forget(doc.id);
  if (docs.length === 0) {
    newDocument();
    return;
  }
  if (active === doc) activate(docs[Math.min(index, docs.length - 1)]);
  else updateTabs();
  schedulePersist();
}

/** Focuses the active tab after the tab strip is re-rendered (keyboard navigation). */
const focusActiveTab = () => $('tabs').querySelector<HTMLElement>('.tab.active')?.focus();

function updateTabs() {
  const tabs = $('tabs');
  // WAI-ARIA tabs: the tablist holds only tabs. The close icon is a mouse shortcut;
  // from the keyboard a focused tab is closed with Delete, tabs are switched with arrows.
  tabs.replaceChildren(
    ...docs.map((doc, i) => {
      const selected = doc === active;
      const tab = h('div', {
        class: `tab${selected ? ' active' : ''}${isDirty(doc) && !doc.pristine ? ' dirty' : ''}`,
        role: 'tab',
        'aria-selected': String(selected),
        'aria-keyshortcuts': 'Delete',
        tabindex: selected ? '0' : '-1',
        title: doc.path,
      });
      const label = h('span', { class: 'tab-name' }, doc.name);
      const close = h('span', { class: 'tab-close', 'aria-hidden': 'true', title: t('tab.closeNamed', { name: doc.name }) }, icon(X, 14));
      tab.append(h('span', { class: 'tab-dot', 'aria-hidden': 'true' }), label, close);
      tab.addEventListener('click', () => activate(doc));
      tab.addEventListener('auxclick', (e) => e.button === 1 && closeDoc(doc));
      tab.addEventListener('keydown', (e) => {
        const go = (target: Doc | undefined) => {
          e.preventDefault();
          if (!target) return;
          activate(target);
          focusActiveTab();
        };
        if (e.key === 'Enter' || e.key === ' ') go(doc);
        else if (e.key === 'ArrowRight') go(docs[(i + 1) % docs.length]);
        else if (e.key === 'ArrowLeft') go(docs[(i - 1 + docs.length) % docs.length]);
        else if (e.key === 'Home') go(docs[0]);
        else if (e.key === 'End') go(docs[docs.length - 1]);
        else if (e.key === 'Delete') {
          e.preventDefault();
          closeDoc(doc);
          focusActiveTab();
        }
      });
      close.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDoc(doc);
      });
      return tab;
    }),
  );
  // "New document" sits next to the tablist, not inside it.
  let add = document.getElementById('tab-new');
  if (!add) {
    add = h('button', { type: 'button', id: 'tab-new', class: 'tab-new' }, icon(Plus, 16));
    add.addEventListener('click', newDocument);
    tabs.after(add);
  }
  add.title = t('tab.new');
  add.setAttribute('aria-label', t('tab.new'));
  tabs.querySelector('.tab.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  document.title = `${active.name} — Markdown Preview`;
}

// ---------------------------------------------------------------- status bar

function updateCounts() {
  const text = active.text;
  // Chinese and Japanese have no spaces between words: count each character.
  const words = (text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]|[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;
  const minutes = Math.max(1, Math.round(words / 200));
  const num = (n: number) => n.toLocaleString(locale());
  $('status-counts').textContent = t('status.counts', {
    words: num(words),
    chars: num(text.length),
    lines: num(editor.view.state.doc.lines),
    minutes,
  });
  $('status-encoding').textContent = active.encoding;
}

let lastStats = { blocked: 0, warnings: 0, dangers: 0, missing: 0 };

function updateIssues(stats = lastStats) {
  lastStats = stats;
  const btn = $('status-issues');
  const parts: string[] = [];
  if (stats.blocked) parts.push(t('status.blocked', { n: stats.blocked }));
  if (stats.dangers) parts.push(t('status.dangers', { n: stats.dangers }));
  if (stats.warnings) parts.push(t('status.warnings', { n: stats.warnings }));
  if (stats.missing) parts.push(t('status.missing', { n: stats.missing }));
  btn.hidden = parts.length === 0;
  btn.className = `status-issues${stats.dangers ? ' has-danger' : stats.warnings ? ' has-warn' : ''}`;
  btn.replaceChildren(icon(stats.dangers || stats.warnings ? TriangleAlert : ShieldCheck, 14), parts.join(' · '));
  btn.title = t('status.details');
}

function showIssues() {
  const labels: Record<Issue['risk'], string> = {
    danger: t('issues.danger'),
    warn: t('issues.warn'),
    blocked: t('issues.blocked'),
    missing: t('issues.missing'),
    unsupported: t('issues.unsupported'),
    ok: 'OK',
  };
  const order: Issue['risk'][] = ['danger', 'warn', 'blocked', 'missing', 'unsupported'];
  const list = h('div', { class: 'issues' });
  for (const risk of order) {
    const items = lastIssues.filter((i) => i.risk === risk);
    if (!items.length) continue;
    list.append(h('h3', { class: `issues-group issues-${risk}` }, `${labels[risk]} (${items.length})`));
    const ul = h('ul');
    for (const item of items) {
      const li = h('li', {}, h('span', { class: 'issue-what' }, item.what), ' ', h('code', { class: 'issue-target' }, item.target));
      if (item.reasons.length) li.append(h('ul', { class: 'issue-reasons' }, ...item.reasons.map((r) => h('li', {}, r))));
      ul.append(li);
    }
    list.append(ul);
  }
  list.append(h('p', { class: 'issues-note' }, t('issues.note')));
  confirmDialog({ title: t('issues.title'), body: [list], ok: t('dialog.close'), cancel: false });
}

// ---------------------------------------------------------------- protection

const protFull = $('prot-full') as HTMLInputElement;
const protInputs = {
  links: $('prot-links') as HTMLInputElement,
  images: $('prot-images') as HTMLInputElement,
  media: $('prot-media') as HTMLInputElement,
};

function syncProtectionUi() {
  const full = !protection.links && !protection.images && !protection.media;
  protFull.checked = full;
  for (const [k, input] of Object.entries(protInputs)) input.checked = protection[k as keyof Protection];
  const btn = $('protection-btn');
  const allowed = [
    protection.links && t('prot.listLinks'),
    protection.images && t('prot.listImages'),
    protection.media && t('prot.listMedia'),
  ].filter(Boolean);
  btn.className = `protection-btn ${full ? 'is-full' : 'is-relaxed'}`;
  btn.replaceChildren(icon(full ? ShieldCheck : ShieldAlert, 17), h('span', { class: 'protection-label' }, t(full ? 'prot.full' : 'prot.relaxed')));
  btn.title = full ? t('prot.fullTooltip') : t('prot.allowed', { list: allowed.join(', ') });
  document.documentElement.dataset.protection = full ? 'full' : 'relaxed';
}

async function applyProtection() {
  syncProtectionUi();
  await preview.setVariant(protection.images, protection.media);
  scheduleRender(0);
}

protFull.addEventListener('change', () => {
  if (protFull.checked) {
    protection.links = protection.images = protection.media = false;
  } else if (!protection.links && !protection.images && !protection.media) {
    // Unticking full protection alone does not grant anything; keep it on and explain.
    protFull.checked = true;
    toast(t('prot.enableHint'), 'info');
    return;
  }
  applyProtection();
});
for (const [k, input] of Object.entries(protInputs)) {
  input.addEventListener('change', () => {
    protection[k as keyof Protection] = input.checked;
    applyProtection();
  });
}

async function openExternal(url: string, risky: boolean, reasons: string[]) {
  if (risky) {
    const ok = await confirmDialog({
      title: t('link.title'),
      body: [
        h('p', {}, t('link.found')),
        h('ul', { class: 'issue-reasons' }, ...reasons.map((r) => h('li', {}, r))),
        h('p', {}, `${t('link.address')} `, h('code', { class: 'issue-target' }, url)),
        h('p', { class: 'muted' }, t('link.note')),
      ],
      ok: t('link.open'),
      danger: true,
    });
    if (!ok) return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ---------------------------------------------------------------- files

async function handleIncoming(files: IncomingFile[]) {
  if (files.length === 0) return;
  const textFiles = files.filter((f) => isTextDoc(f.file.name));
  const mediaFiles = files.filter((f) => isMedia(f.file.name));
  const skipped = files.filter((f) => !isTextDoc(f.file.name) && !isMedia(f.file.name));

  for (const f of mediaFiles) await assets.add(f.file, f.path);

  const opened: Doc[] = [];
  const errors: string[] = [];
  for (const f of textFiles) {
    try {
      const { text, encoding } = await readTextFile(f.file);
      const existing = docs.find((d) => d.path === f.path && d.text === text);
      if (existing) {
        opened.push(existing);
        continue;
      }
      opened.push(createDoc(basename(f.path), text, { path: f.path, encoding }));
    } catch (err) {
      errors.push((err as Error).message);
    }
  }

  if (opened.length) {
    // Untouched sample / empty tabs give way to the opened files.
    for (const d of docs.filter((d) => d.pristine && !opened.includes(d))) {
      docs.splice(docs.indexOf(d), 1);
      editor.forget(d.id);
    }
    activate(opened[0]);
  } else if (mediaFiles.length) {
    insertMediaReferences(mediaFiles);
  }

  const parts: string[] = [];
  if (opened.length) parts.push(t('files.opened', { n: opened.length }));
  if (mediaFiles.length) parts.push(t('files.media', { n: mediaFiles.length }));
  if (skipped.length) {
    const names = skipped.slice(0, 3).map((f) => f.file.name).join(', ');
    parts.push(t('files.skipped', { n: skipped.length, names: names + (skipped.length > 3 ? '…' : '') }));
  }
  if (parts.length) toast(parts.join(' · '), skipped.length ? 'warn' : 'ok');
  for (const e of errors) toast(e, 'error', 6000);
  scheduleRender(0);
}

function insertMediaReferences(files: IncomingFile[]) {
  const baseDir = dirname(active.path);
  const refs = files.map(({ file, path }) => {
    const rel = baseDir && path.startsWith(`${baseDir}/`) ? path.slice(baseDir.length + 1) : path;
    const target = /[\s()<>]/.test(rel) ? `<${rel}>` : rel;
    return `![${file.name.replace(/\.[^.]+$/, '').replace(/[[\]]/g, '')}](${target})`;
  });
  const view = editor.view;
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);
  const prefix = line.text.trim() ? '\n\n' : '';
  const insert = `${prefix}${refs.join('\n\n')}\n`;
  const at = line.text.trim() ? line.to : pos;
  view.dispatch({ changes: { from: at, insert }, selection: { anchor: at + insert.length }, scrollIntoView: true });
  editor.focus();
}

function hasFiles(e: DragEvent): boolean {
  return !!e.dataTransfer && [...e.dataTransfer.types].includes('Files');
}

function setupDragAndDrop() {
  const pane = $('editor-pane');
  const overlay = $('drop-overlay');
  $('drop-icon').append(icon(FileUp, 44));
  let depth = 0;
  const hide = () => {
    depth = 0;
    overlay.hidden = true;
    pane.classList.remove('dragging');
  };
  pane.addEventListener('dragenter', (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault();
    depth++;
    overlay.hidden = false;
    pane.classList.add('dragging');
  }, true);
  pane.addEventListener('dragover', (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer!.dropEffect = 'copy';
  }, true);
  pane.addEventListener('dragleave', (e) => {
    if (!hasFiles(e)) return;
    depth--;
    if (depth <= 0) hide();
  }, true);
  pane.addEventListener('drop', (e) => {
    if (!hasFiles(e)) return;
    // Capture phase: CodeMirror must not paste file contents as text itself.
    e.preventDefault();
    e.stopPropagation();
    hide();
    const pending = collectDropped(e.dataTransfer!);
    pending.then(handleIncoming).catch((err) => toast(t('files.readError', { error: err.message }), 'error'));
  }, true);

  // Anywhere else: never let the browser navigate away to the dropped file.
  window.addEventListener('dragover', (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault();
    if (!pane.contains(e.target as Node)) e.dataTransfer!.dropEffect = 'none';
  });
  window.addEventListener('drop', (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault();
    hide();
    if (!pane.contains(e.target as Node)) toast(t('drop.wrongPlace'), 'info');
  });
  window.addEventListener('dragend', hide);
}

function pickFiles(folder = false) {
  const input = $(folder ? 'folder-input' : 'file-input') as HTMLInputElement;
  input.value = '';
  input.click();
}

for (const id of ['file-input', 'folder-input']) {
  $(id).addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) handleIncoming(collectPicked(input.files));
  });
}

function saveActive() {
  const name = /\.(md|markdown|mdown|mkd|mkdn|mdx|txt)$/i.test(active.name) ? active.name : `${active.name}.md`;
  download(name, new Blob([active.text], { type: 'text/markdown;charset=utf-8' }));
  active.savedText = active.text;
  active.pristine = false;
  updateTabs();
  toast(t('save.done', { name }), 'ok');
}

async function exportHtml() {
  await renderNow();
  const { buildStandaloneHtml } = await import('./app/export');
  const title = active.name.replace(/\.[^.]+$/, '');
  const html = await buildStandaloneHtml(title, preview.content, effectiveTheme(), protection, (u) => assets.inlineBlobUrl(u));
  download(`${title}.html`, new Blob([html], { type: 'text/html;charset=utf-8' }));
  toast(t('export.done', { name: `${title}.html` }), 'ok');
}

// ---------------------------------------------------------------- persistence (opt-in)

let persistTimer = 0;
function schedulePersist() {
  if (!settings.remember) return;
  clearTimeout(persistTimer);
  persistTimer = window.setTimeout(() => {
    storage.set(DOCS_KEY, JSON.stringify({
      active: docs.indexOf(active),
      docs: docs.map(({ name, path, text, savedText, encoding }) => ({ name, path, text, savedText, encoding })),
    }));
  }, 400);
}

function restoreDocs(): boolean {
  if (!settings.remember) return false;
  try {
    const raw = storage.get(DOCS_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw) as { active: number; docs: Omit<Doc, 'id' | 'pristine'>[] };
    if (!Array.isArray(data.docs) || data.docs.length === 0) return false;
    for (const d of data.docs) createDoc(String(d.name), String(d.text), { path: String(d.path), savedText: String(d.savedText), encoding: String(d.encoding) });
    activate(docs[Math.min(Math.max(0, data.active), docs.length - 1)]);
    return true;
  } catch {
    return false;
  }
}

async function clearAll() {
  const ok = await confirmDialog({
    title: t('clear.title'),
    body: [t('clear.body')],
    ok: t('clear.ok'),
    danger: true,
  });
  if (!ok) return;
  docs = [];
  editor.forgetAll();
  assets.clear();
  storage.clearAll();
  try {
    sessionStorage.clear();
  } catch {
    /* unavailable */
  }
  settings.remember = false;
  saveSettings();
  syncSettingsUi();
  preview.setContent('');
  newDocument();
  closePopover();
  toast(t('clear.done'), 'ok');
}

// ---------------------------------------------------------------- settings UI

const setSync = $('set-sync') as HTMLInputElement;
const setRemember = $('set-remember') as HTMLInputElement;

function syncSettingsUi() {
  setSync.checked = settings.sync;
  setRemember.checked = settings.remember;
  $('remember-note').textContent = t(settings.remember ? 'settings.rememberOn' : 'settings.rememberOff');
}

setSync.addEventListener('change', () => {
  settings.sync = setSync.checked;
  saveSettings();
});
setRemember.addEventListener('change', () => {
  settings.remember = setRemember.checked;
  saveSettings();
  if (settings.remember) schedulePersist();
  else storage.remove(DOCS_KEY);
  syncSettingsUi();
});
$('clear-all').addEventListener('click', clearAll);

// ---------------------------------------------------------------- layout: view mode & resizer

const VIEW_MODES = [
  { id: 'editor', label: 'view.editor', icon: PenLine },
  { id: 'both', label: 'view.split', icon: Columns2 },
  { id: 'preview', label: 'view.preview', icon: Eye },
] as const;

function setView(mode: (typeof VIEW_MODES)[number]['id']) {
  settings.view = mode;
  saveSettings();
  $('workspace').dataset.view = mode;
  for (const b of $('view-mode').querySelectorAll('button')) {
    b.setAttribute('aria-checked', String(b.dataset.mode === mode));
  }
}

function renderViewModes() {
  const group = $('view-mode');
  group.replaceChildren(
    ...VIEW_MODES.map((m) => {
      const label = t(m.label);
      const b = h('button', { type: 'button', role: 'radio', 'data-mode': m.id, title: label, 'aria-label': label }, icon(m.icon, 16), h('span', { class: 'seg-label' }, label));
      b.addEventListener('click', () => setView(m.id));
      return b;
    }),
  );
  setView(settings.view);
}

function setupLayout() {
  renderViewModes();

  const workspace = $('workspace');
  const resizer = $('resizer');
  // role="separator" that can be focused needs its current value for assistive technology.
  resizer.setAttribute('aria-valuemin', '20');
  resizer.setAttribute('aria-valuemax', '80');
  resizer.setAttribute('aria-controls', 'workspace');
  const applySplit = () => {
    workspace.style.setProperty('--split', `${settings.split}%`);
    resizer.setAttribute('aria-valuenow', String(Math.round(settings.split)));
  };
  applySplit();
  resizer.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    resizer.setPointerCapture(e.pointerId);
    workspace.classList.add('resizing');
    const rect = workspace.getBoundingClientRect();
    const vertical = window.matchMedia('(max-width: 760px)').matches;
    const move = (ev: PointerEvent) => {
      const ratio = vertical ? (ev.clientY - rect.top) / rect.height : (ev.clientX - rect.left) / rect.width;
      settings.split = Math.round(Math.min(80, Math.max(20, ratio * 100)) * 10) / 10;
      applySplit();
    };
    const up = () => {
      workspace.classList.remove('resizing');
      resizer.removeEventListener('pointermove', move);
      saveSettings();
    };
    resizer.addEventListener('pointermove', move);
    resizer.addEventListener('pointerup', up, { once: true });
    resizer.addEventListener('pointercancel', up, { once: true });
  });
  resizer.addEventListener('keydown', (e) => {
    const step = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -2 : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 2 : 0;
    if (!step) return;
    e.preventDefault();
    settings.split = Math.min(80, Math.max(20, settings.split + step));
    applySplit();
    saveSettings();
  });
  resizer.addEventListener('dblclick', () => {
    settings.split = 50;
    applySplit();
    saveSettings();
  });
}

// ---------------------------------------------------------------- header

function renderHeaderActions() {
  const actions: { label: string; title: string; icon: typeof Save; run: () => void; cls?: string }[] = [
    { label: t('file.open'), title: t('file.openTitle'), icon: FolderOpen, run: () => pickFiles(), cls: 'btn-open' },
    { label: t('file.folder'), title: t('file.folderTitle'), icon: FolderInput, run: () => pickFiles(true), cls: 'hide-sm' },
    { label: t('file.save'), title: t('file.saveTitle'), icon: Save, run: saveActive, cls: 'hide-sm' },
    { label: t('file.html'), title: t('file.htmlTitle'), icon: FileDown, run: exportHtml, cls: 'hide-sm' },
    { label: t('file.print'), title: t('file.printTitle'), icon: Printer, run: () => preview.print(), cls: 'hide-sm' },
  ];
  $('file-actions').replaceChildren(
    ...actions.map((a) => {
      const b = h('button', { type: 'button', class: `btn btn-ghost ${a.cls ?? ''}`, title: a.title }, icon(a.icon, 17), h('span', { class: 'btn-label' }, a.label));
      b.addEventListener('click', a.run);
      return b;
    }),
  );
}

function setupHeader() {
  renderHeaderActions();

  bindPopover($('protection-btn'), $('protection-panel'));
  const settingsBtn = $('settings-btn');
  settingsBtn.append(icon(Settings));
  bindPopover(settingsBtn, $('settings-panel'));

  $('theme-btn').addEventListener('click', toggleTheme);

  // Phone layout: secondary actions, protection, theme and settings live in one menu.
  const menuBtn = $('menu-btn');
  menuBtn.append(icon(Menu));
  menuBtn.addEventListener('click', renderMobileMenu); // registered first: fills the menu before it opens
  bindPopover(menuBtn, $('mobile-menu'));

  $('toolbar-toggle').addEventListener('click', () => {
    settings.mobileToolbar = !settings.mobileToolbar;
    saveSettings();
    renderToolbarToggle();
  });

  $('status-issues').addEventListener('click', showIssues);
  $('status-private').prepend(icon(Lock, 13));
}

function toggleTheme() {
  settings.theme = effectiveTheme() === 'dark' ? 'light' : 'dark';
  saveSettings();
  applyTheme();
}

function renderMobileMenu() {
  const menuBtn = $('menu-btn');
  const full = !protection.links && !protection.images && !protection.media;
  const dark = effectiveTheme() === 'dark';
  const item = (ic: typeof Save, label: string, run: () => void, cls = '') => {
    const b = h('button', { type: 'button', class: `menu-item ${cls}`, role: 'menuitem' }, icon(ic, 17), h('span', {}, label));
    b.addEventListener('click', run);
    return b;
  };
  const then = (run: () => void) => () => {
    closePopover();
    run();
  };
  $('mobile-menu').replaceChildren(
    item(FolderInput, t('menu.folder'), then(() => pickFiles(true))),
    item(Save, t('menu.save'), then(saveActive)),
    item(FileDown, t('menu.html'), then(exportHtml)),
    item(Printer, t('menu.print'), then(() => preview.print())),
    h('div', { class: 'menu-sep', role: 'separator' }),
    // Opening another popover closes this menu and anchors the panel to the menu button.
    item(full ? ShieldCheck : ShieldAlert, t(full ? 'prot.full' : 'prot.relaxed'), () => showPopover(menuBtn, $('protection-panel')), full ? 'is-full' : 'is-relaxed'),
    item(dark ? Sun : Moon, t(dark ? 'theme.light' : 'theme.dark'), then(toggleTheme)),
    item(Settings, t('settings.title'), () => showPopover(menuBtn, $('settings-panel'))),
  );
}

/** On phones the formatting toolbar sits behind this toggle (the advanced row is a second level). */
function renderToolbarToggle() {
  const open = settings.mobileToolbar;
  const btn = $('toolbar-toggle');
  btn.replaceChildren(icon(Type, 16), h('span', {}, t('toolbar.formatting')), icon(ChevronDown, 14));
  btn.setAttribute('aria-expanded', String(open));
  $('editor-pane').classList.toggle('toolbar-open', open);
}

// ---------------------------------------------------------------- language

const setLang = $('set-lang') as HTMLSelectElement;

function setupLanguageSelect() {
  setLang.replaceChildren(
    h('option', { value: '' }, t('settings.languageAuto')),
    ...LOCALES.map((l) => h('option', { value: l.code, lang: l.code }, l.name)),
  );
  setLang.value = settings.lang ?? '';
}

setLang.addEventListener('change', async () => {
  settings.lang = isLocale(setLang.value) ? setLang.value : null;
  saveSettings();
  await setLocale(isLocale(settings.lang) ? settings.lang : detectLocale());
  applyLanguage();
});

function buildEditorToolbar() {
  buildToolbar(editor, {
    main: $('toolbar'),
    advanced: $('toolbar-advanced'),
    menu: $('heading-menu'),
    showMenu: showPopover,
    advancedOpen: settings.advanced,
    onAdvancedToggle(open) {
      settings.advanced = open;
      saveSettings();
    },
  });
}

/** Re-renders every piece of UI text in the current language, without losing any state. */
function applyLanguage() {
  translateDom();
  renderToolbarToggle();
  setupLanguageSelect();
  renderHeaderActions();
  renderViewModes();
  buildEditorToolbar();
  editor.relabel();
  preview.iframe.title = t('preview.frameTitle');
  $('settings-btn').setAttribute('aria-label', t('settings.title'));
  syncProtectionUi();
  syncSettingsUi();
  applyTheme(false);
  for (const doc of docs.filter((d) => d.sample && d.pristine)) {
    doc.name = t('sample.name');
    doc.path = doc.name;
    doc.text = doc.savedText = t('sample.body');
    editor.reset(doc.id, doc.text);
  }
  if (active) {
    updateTabs();
    updateCounts();
    updateIssues();
    scheduleRender(0);
  }
}

// ---------------------------------------------------------------- shortcuts

function handleShortcut(e: KeyboardEvent) {
  if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
  const key = e.key.toLowerCase();
  // Cyrillic letters: the same physical keys on a Russian keyboard layout.
  if (key === 's' || key === 'ы') {
    e.preventDefault();
    saveActive();
  } else if (key === 'o' || key === 'щ') {
    e.preventDefault();
    pickFiles();
  } else if ((key === 'p' || key === 'з') && !e.shiftKey) {
    e.preventDefault();
    preview.print();
  }
}
document.addEventListener('keydown', (e) => {
  if (editor.view.hasFocus && (e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'ы')) return; // editor keymap handles it
  handleShortcut(e);
});

window.addEventListener('beforeunload', (e) => {
  if (settings.remember) return;
  if (docs.some((d) => isDirty(d) && !d.pristine && d.text.trim())) e.preventDefault();
});

// ---------------------------------------------------------------- start

async function start() {
  // Backup for hosts that drop the frame-ancestors / X-Frame-Options headers:
  // the app refuses to work inside someone else's page (clickjacking).
  if (window.self !== window.top) {
    document.body.textContent = t('app.framed');
    return;
  }
  // The language chunk loads in parallel with the preview frame.
  const localeReady = setLocale(isLocale(settings.lang) ? settings.lang : detectLocale()).catch(() => setLocale('en'));
  setupHeader();
  setupLayout();
  setupDragAndDrop();
  await Promise.all([localeReady, preview.setVariant(false, false)]);
  applyLanguage();
  if (!restoreDocs()) {
    const doc = createDoc(t('sample.name'), t('sample.body'), { pristine: true, sample: true });
    activate(doc);
  }
}

start();
