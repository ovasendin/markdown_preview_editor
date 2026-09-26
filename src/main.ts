import './styles/app.css';
import {
  FolderOpen, FolderInput, Save, FileDown, Printer, PenLine, Columns2, Eye, Sun, Moon, Settings, ShieldCheck,
  ShieldAlert, Lock, Plus, X, FileUp, TriangleAlert,
} from 'lucide';
import { Editor } from './app/editor';
import { Preview } from './app/preview';
import { buildToolbar } from './app/toolbar';
import { AssetStore } from './app/assets';
import { collectDropped, collectPicked, isMedia, isTextDoc, readTextFile, type IncomingFile } from './app/files';
import { basename, dirname, pathKey, resolveRef } from './app/paths';
import { renderDocument, type Protection, type Issue } from './markdown/pipeline';
import { SAMPLE, SAMPLE_NAME } from './app/sample';
import { $, h, icon, toast, confirmDialog, bindPopover, showPopover, closePopover, download } from './app/ui';
import { settings, saveSettings, storage } from './app/settings';

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
const effectiveTheme = (): 'light' | 'dark' => settings.theme ?? (systemDark.matches ? 'dark' : 'light');

function applyTheme(rerender = true) {
  const theme = effectiveTheme();
  document.documentElement.dataset.theme = theme;
  const btn = $('theme-btn');
  btn.replaceChildren(icon(theme === 'dark' ? Sun : Moon));
  btn.title = theme === 'dark' ? 'Light theme' : 'Dark theme';
  btn.setAttribute('aria-label', btn.title);
  preview?.setTheme(theme);
  if (rerender && preview) scheduleRender(0);
}
systemDark.addEventListener('change', () => settings.theme === null && applyTheme());

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
  onDropAttempt: () => toast('Drop files onto the editor (left side of the window)', 'info'),
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
    toast(`Rendering error: ${(err as Error).message}`, 'error');
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
  while (docs.some((d) => d.name === `Untitled ${n}.md`)) n++;
  return `Untitled ${n}.md`;
}

function newDocument() {
  const doc = createDoc(untitledName(), '', { pristine: true });
  activate(doc);
  editor.focus();
}

async function closeDoc(doc: Doc) {
  if (isDirty(doc) && !doc.pristine && doc.text.trim()) {
    const ok = await confirmDialog({
      title: 'Close without saving?',
      body: [`"${doc.name}" has unsaved changes. They will be lost.`],
      ok: 'Close',
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

function updateTabs() {
  const tabs = $('tabs');
  tabs.replaceChildren(
    ...docs.map((doc) => {
      const selected = doc === active;
      const tab = h('div', {
        class: `tab${selected ? ' active' : ''}${isDirty(doc) && !doc.pristine ? ' dirty' : ''}`,
        role: 'tab',
        'aria-selected': String(selected),
        tabindex: selected ? '0' : '-1',
        title: doc.path,
      });
      const label = h('span', { class: 'tab-name' }, doc.name);
      const close = h('button', { type: 'button', class: 'tab-close', 'aria-label': `Close ${doc.name}`, title: 'Close' }, icon(X, 14));
      tab.append(h('span', { class: 'tab-dot', 'aria-hidden': 'true' }), label, close);
      tab.addEventListener('click', () => activate(doc));
      tab.addEventListener('auxclick', (e) => e.button === 1 && closeDoc(doc));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') activate(doc);
      });
      close.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDoc(doc);
      });
      return tab;
    }),
  );
  const add = h('button', { type: 'button', class: 'tab-new', title: 'New document', 'aria-label': 'New document' }, icon(Plus, 16));
  add.addEventListener('click', newDocument);
  tabs.append(add);
  tabs.querySelector('.tab.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  document.title = `${active.name} — Markdown Preview`;
}

// ---------------------------------------------------------------- status bar

function updateCounts() {
  const text = active.text;
  const words = (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;
  const minutes = Math.max(1, Math.round(words / 200));
  $('status-counts').textContent =
    `Words: ${words.toLocaleString('en-US')} · Characters: ${text.length.toLocaleString('en-US')} · Lines: ${editor.view.state.doc.lines.toLocaleString('en-US')} · ~${minutes} min read`;
  $('status-encoding').textContent = active.encoding;
}

function updateIssues(stats: { blocked: number; warnings: number; dangers: number; missing: number }) {
  const btn = $('status-issues');
  const parts: string[] = [];
  if (stats.blocked) parts.push(`Blocked by protection: ${stats.blocked}`);
  if (stats.dangers) parts.push(`Dangerous: ${stats.dangers}`);
  if (stats.warnings) parts.push(`Suspicious: ${stats.warnings}`);
  if (stats.missing) parts.push(`Missing files: ${stats.missing}`);
  btn.hidden = parts.length === 0;
  btn.className = `status-issues${stats.dangers ? ' has-danger' : stats.warnings ? ' has-warn' : ''}`;
  btn.replaceChildren(icon(stats.dangers || stats.warnings ? TriangleAlert : ShieldCheck, 14), parts.join(' · '));
  btn.title = 'Show details';
}

function showIssues() {
  const labels: Record<Issue['risk'], string> = {
    danger: 'Dangerous — blocked',
    warn: 'Suspicious',
    blocked: 'Blocked by protection mode',
    missing: 'Local file not found',
    unsupported: 'Not supported',
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
  list.append(h('p', { class: 'issues-note' }, 'This is a lightweight check: heuristics that run inside the browser, without sending addresses to any online service. It is not an antivirus.'));
  confirmDialog({ title: 'External resources and threat check', body: [list], ok: 'Close', cancel: false });
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
  const allowed = [protection.links && 'links', protection.images && 'images', protection.media && 'audio & video'].filter(Boolean);
  btn.className = `protection-btn ${full ? 'is-full' : 'is-relaxed'}`;
  btn.replaceChildren(icon(full ? ShieldCheck : ShieldAlert, 17), h('span', { class: 'protection-label' }, full ? 'Full protection' : 'Protection relaxed'));
  btn.title = full ? 'Full protection: the document cannot access the network' : `Allowed: ${allowed.join(', ')}`;
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
    toast('To relax protection, enable one of the permissions below', 'info');
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
      title: 'Suspicious link',
      body: [
        h('p', {}, 'The lightweight check found warning signs:'),
        h('ul', { class: 'issue-reasons' }, ...reasons.map((r) => h('li', {}, r))),
        h('p', {}, 'Address: ', h('code', { class: 'issue-target' }, url)),
        h('p', { class: 'muted' }, 'This is a heuristic, not an antivirus. Open it only if you trust the source.'),
      ],
      ok: 'Open anyway',
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
  if (opened.length) parts.push(`Documents opened: ${opened.length}`);
  if (mediaFiles.length) parts.push(`media files: ${mediaFiles.length}`);
  if (skipped.length) {
    const names = skipped.slice(0, 3).map((f) => f.file.name).join(', ');
    parts.push(`skipped: ${skipped.length} (${names}${skipped.length > 3 ? '…' : ''})`);
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
    pending.then(handleIncoming).catch((err) => toast(`Could not read the files: ${err.message}`, 'error'));
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
    if (!pane.contains(e.target as Node)) toast('Drop files onto the editor (left side of the window)', 'info');
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
  toast(`Saved: ${name} (to your browser's downloads folder)`, 'ok');
}

async function exportHtml() {
  await renderNow();
  const { buildStandaloneHtml } = await import('./app/export');
  const title = active.name.replace(/\.[^.]+$/, '');
  const html = await buildStandaloneHtml(title, preview.content, effectiveTheme(), protection, (u) => assets.inlineBlobUrl(u));
  download(`${title}.html`, new Blob([html], { type: 'text/html;charset=utf-8' }));
  toast(`Exported: ${title}.html`, 'ok');
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
    title: 'Clear everything?',
    body: ['All open documents will be closed and removed from memory and from browser storage. Unsaved changes will be lost.'],
    ok: 'Clear',
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
  toast('Everything cleared', 'ok');
}

// ---------------------------------------------------------------- settings UI

const setSync = $('set-sync') as HTMLInputElement;
const setRemember = $('set-remember') as HTMLInputElement;

function syncSettingsUi() {
  setSync.checked = settings.sync;
  setRemember.checked = settings.remember;
  $('remember-note').textContent = settings.remember
    ? 'On: the text of open documents is stored in this browser (without images). Turn it off on shared computers.'
    : 'Off: closing the browser tab erases everything. Turn it on only on your personal computer.';
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
  { id: 'editor', label: 'Editor', icon: PenLine },
  { id: 'both', label: 'Split', icon: Columns2 },
  { id: 'preview', label: 'Preview', icon: Eye },
] as const;

function setView(mode: (typeof VIEW_MODES)[number]['id']) {
  settings.view = mode;
  saveSettings();
  $('workspace').dataset.view = mode;
  for (const b of $('view-mode').querySelectorAll('button')) {
    b.setAttribute('aria-checked', String(b.dataset.mode === mode));
  }
}

function setupLayout() {
  const group = $('view-mode');
  for (const m of VIEW_MODES) {
    const b = h('button', { type: 'button', role: 'radio', 'data-mode': m.id, title: m.label, 'aria-label': m.label }, icon(m.icon, 16), h('span', { class: 'seg-label' }, m.label));
    b.addEventListener('click', () => setView(m.id));
    group.append(b);
  }
  setView(settings.view);

  const workspace = $('workspace');
  const resizer = $('resizer');
  const applySplit = () => workspace.style.setProperty('--split', `${settings.split}%`);
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

function setupHeader() {
  const actions: { label: string; title: string; icon: typeof Save; run: () => void; cls?: string }[] = [
    { label: 'Open', title: 'Open files (Ctrl+O)', icon: FolderOpen, run: () => pickFiles() },
    { label: 'Folder', title: 'Open a folder with documents and images', icon: FolderInput, run: () => pickFiles(true), cls: 'hide-sm' },
    { label: 'Save', title: 'Save .md (Ctrl+S)', icon: Save, run: saveActive },
    { label: 'HTML', title: 'Export to a self-contained HTML file', icon: FileDown, run: exportHtml, cls: 'hide-sm' },
    { label: 'Print', title: 'Print or save as PDF', icon: Printer, run: () => preview.print(), cls: 'hide-sm' },
  ];
  const group = $('file-actions');
  for (const a of actions) {
    const b = h('button', { type: 'button', class: `btn btn-ghost ${a.cls ?? ''}`, title: a.title }, icon(a.icon, 17), h('span', { class: 'btn-label' }, a.label));
    b.addEventListener('click', a.run);
    group.append(b);
  }

  bindPopover($('protection-btn'), $('protection-panel'));
  const settingsBtn = $('settings-btn');
  settingsBtn.append(icon(Settings));
  settingsBtn.setAttribute('aria-label', 'Settings');
  bindPopover(settingsBtn, $('settings-panel'));

  $('theme-btn').addEventListener('click', () => {
    settings.theme = effectiveTheme() === 'dark' ? 'light' : 'dark';
    saveSettings();
    applyTheme();
  });

  $('status-issues').addEventListener('click', showIssues);
  const priv = $('status-private');
  priv.append(icon(Lock, 13), h('span', { class: 'status-private-text' }, 'Only in your browser'));
  priv.title = 'Documents never leave your browser: the site has no server to receive them, and network requests are forbidden by its security policy.';
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
    document.body.textContent = 'This site cannot be opened inside another page.';
    return;
  }
  setupHeader();
  setupLayout();
  syncSettingsUi();
  syncProtectionUi();
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
  setupDragAndDrop();
  applyTheme(false);
  await preview.setVariant(false, false);
  if (!restoreDocs()) {
    const doc = createDoc(SAMPLE_NAME, SAMPLE, { pristine: true });
    activate(doc);
  }
}

start();
