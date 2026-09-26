// Markdown → safe HTML for the preview frame.
//
//   1. markdown-it renders the source (untrusted HTML included).
//   2. The result is parsed into an inert document (nothing loads or runs there).
//   3. Every link and media reference is checked and either kept, replaced by a
//      placeholder, or marked with a warning badge.
//   4. Math and Mermaid placeholders are rendered (libraries load on demand).
//   5. DOMPurify removes anything executable as the final gate.
//
// Even if a step is bypassed, the preview frame has no script permission and a
// Content-Security-Policy matching the protection mode.
import DOMPurify, { type Config } from 'dompurify';
import { renderMarkdownToHtml } from './md';
import { checkUrl, hasScheme, type Risk, type UrlVerdict } from '../security/url-check';
import { mediaCategory, type FileVerdict, type MediaCategory } from '../security/file-check';
import { t } from '../i18n';

export interface Protection {
  links: boolean;
  images: boolean;
  media: boolean;
}

export interface LocalAsset {
  name: string;
  url: string;
  verdict: FileVerdict;
}

export interface RenderContext {
  docPath: string;
  protection: Protection;
  theme: 'light' | 'dark';
  resolveAsset(ref: string, docPath: string): LocalAsset | null;
  resolveDoc(ref: string, docPath: string): string | null;
}

export interface Issue {
  risk: Risk | 'blocked' | 'missing' | 'unsupported';
  what: string;
  target: string;
  reasons: string[];
}

export interface RenderResult {
  html: string;
  stats: { blocked: number; warnings: number; dangers: number; missing: number };
  issues: Issue[];
}

const purify = DOMPurify();
const PURIFY_CONFIG: Config = {
  USE_PROFILES: { html: true, mathMl: true },
  FORBID_TAGS: [
    'style', 'link', 'meta', 'base', 'form', 'button', 'textarea', 'select', 'option', 'iframe', 'frame',
    'frameset', 'object', 'embed', 'applet', 'template', 'dialog', 'portal', 'noscript', 'map', 'area',
    'svg', 'marquee', 'track', 'script',
  ],
  FORBID_ATTR: [
    'style', 'srcset', 'sizes', 'ping', 'formaction', 'action', 'background', 'autoplay', 'autofocus',
    'longdesc', 'lowsrc', 'dynsrc', 'cite', 'download', 'target', 'contenteditable', 'usemap',
  ],
  ALLOW_DATA_ATTR: true,
  ADD_ATTR: ['controls', 'preload', 'loop', 'muted', 'playsinline', 'referrerpolicy', 'loading', 'decoding'],
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel|blob):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
};

purify.addHook('afterSanitizeAttributes', (node) => {
  // Only task-list checkboxes may remain as inputs, always read-only.
  if (node.nodeName === 'INPUT') {
    if ((node as HTMLInputElement).getAttribute('type') !== 'checkbox') node.remove();
    else node.setAttribute('disabled', '');
  }
});

const mediaWord = (c: MediaCategory) => t(c === 'image' ? 'media.image' : c === 'audio' ? 'media.audio' : 'media.video');

class Processor {
  readonly issues: Issue[] = [];
  readonly stats = { blocked: 0, warnings: 0, dangers: 0, missing: 0 };
  constructor(private doc: Document, private ctx: RenderContext) {}

  private el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
    const e = this.doc.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  private badge(risk: 'warn' | 'danger', reasons: string[]): HTMLElement {
    const b = this.el('span', `risk-badge risk-${risk}`, risk === 'danger' ? '⛔' : '⚠');
    b.title = `${t(risk === 'danger' ? 'pv.badgeDanger' : 'pv.badgeWarn')}\n• ` + reasons.join('\n• ');
    return b;
  }

  private record(risk: Issue['risk'], what: string, target: string, reasons: string[]) {
    this.issues.push({ risk, what, target, reasons });
    if (risk === 'warn') this.stats.warnings++;
    else if (risk === 'danger') this.stats.dangers++;
    else if (risk === 'blocked') this.stats.blocked++;
    else if (risk === 'missing') this.stats.missing++;
  }

  private placeholder(kind: MediaCategory | 'embed', variant: 'blocked' | 'danger' | 'missing', title: string, detail: string, reasons: string[] = []): HTMLElement {
    const block = kind === 'video' || kind === 'embed';
    const box = this.el(block ? 'div' : 'span', `media-placeholder mp-${variant} mp-${kind}`);
    const icon = { image: '🖼', audio: '🎵', video: '🎬', embed: '🧩' }[kind];
    box.append(this.el('span', 'mp-icon', variant === 'danger' ? '⛔' : icon));
    const body = this.el('span', 'mp-body');
    body.append(this.el('span', 'mp-title', title));
    if (detail) body.append(this.el('span', 'mp-detail', detail));
    box.append(body);
    box.title = [title, detail, ...reasons.map((r) => `• ${r}`)].filter(Boolean).join('\n');
    return box;
  }

  run(): void {
    this.processEmbeds();
    this.processImagesAsMedia();
    this.doc.querySelectorAll('img').forEach((img) => this.processMediaElement(img, 'image'));
    this.doc.querySelectorAll('audio, video').forEach((m) => this.processAvElement(m as HTMLMediaElement));
    this.processLinks();
  }

  /** iframes, objects and embeds are never allowed; show what was there instead of silently dropping it. */
  private processEmbeds() {
    this.doc.querySelectorAll('iframe, object, embed, frame, portal').forEach((node) => {
      const src = node.getAttribute('src') ?? node.getAttribute('data') ?? '';
      this.record('unsupported', t('pv.embed'), src, [t('pv.embedReason')]);
      node.replaceWith(this.placeholder('embed', 'blocked', t('pv.embedTitle'), src));
    });
  }

  /** `![](song.mp3)` / `![](clip.mp4)` become players. */
  private processImagesAsMedia() {
    this.doc.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') ?? '';
      const category = mediaCategory(src.split(/[?#]/)[0]);
      if (category !== 'audio' && category !== 'video') return;
      const player = this.doc.createElement(category);
      player.setAttribute('src', src);
      const label = img.getAttribute('alt') || img.getAttribute('title');
      if (label) player.setAttribute('aria-label', label);
      img.replaceWith(player);
    });
  }

  private allowed(category: MediaCategory): boolean {
    return category === 'image' ? this.ctx.protection.images : this.ctx.protection.media;
  }

  /**
   * Resolves one media reference. Returns the URL to use, or a placeholder
   * element if it must not be loaded.
   */
  private resolveMedia(raw: string, category: MediaCategory): { url: string; badge?: HTMLElement } | { placeholder: HTMLElement } {
    const word = mediaWord(category);
    if (!raw) return { placeholder: this.placeholder(category, 'missing', t('pv.empty'), '') };

    if (hasScheme(raw)) {
      const v: UrlVerdict = checkUrl(raw, category === 'image' ? 'image' : 'media');
      if (v.risk === 'danger') {
        this.record('danger', word, v.display, v.reasons);
        return { placeholder: this.placeholder(category, 'danger', t('pv.dangerSource'), v.display, v.reasons) };
      }
      if (v.network && !this.allowed(category)) {
        this.record('blocked', word, v.display, []);
        const title = category === 'image'
          ? t('pv.blockedImage', { hint: t('prot.images') })
          : t('pv.blockedMedia', { hint: t('prot.media') });
        return {
          placeholder: this.placeholder(category, 'blocked', title, v.display),
        };
      }
      if (v.risk === 'warn') {
        this.record('warn', word, v.display, v.reasons);
        return { url: raw, badge: this.badge('warn', v.reasons) };
      }
      return { url: raw };
    }

    const asset = this.ctx.resolveAsset(raw, this.ctx.docPath);
    if (!asset) {
      this.record('missing', word, raw, []);
      return {
        placeholder: this.placeholder(category, 'missing', t('pv.localMissing', { path: raw }), t('pv.localMissingHint')),
      };
    }
    if (asset.verdict.risk === 'danger') {
      this.record('danger', word, asset.name, asset.verdict.reasons);
      return { placeholder: this.placeholder(category, 'danger', t('pv.fileBlocked', { name: asset.name }), '', asset.verdict.reasons) };
    }
    if (asset.verdict.risk === 'warn') {
      this.record('warn', word, asset.name, asset.verdict.reasons);
      return { url: asset.url, badge: this.badge('warn', asset.verdict.reasons) };
    }
    return { url: asset.url };
  }

  private processMediaElement(node: Element, category: MediaCategory) {
    const r = this.resolveMedia((node.getAttribute('src') ?? '').trim(), category);
    if ('placeholder' in r) {
      node.replaceWith(r.placeholder);
      return;
    }
    node.setAttribute('src', r.url);
    node.setAttribute('referrerpolicy', 'no-referrer');
    if (category === 'image') {
      node.setAttribute('loading', 'lazy');
      node.setAttribute('decoding', 'async');
    }
    if (r.badge) node.after(r.badge);
  }

  private processAvElement(media: HTMLMediaElement) {
    const category: MediaCategory = media.tagName === 'VIDEO' ? 'video' : 'audio';
    media.removeAttribute('autoplay');
    media.setAttribute('controls', '');
    media.setAttribute('preload', 'metadata');

    const poster = media.getAttribute('poster');
    if (poster) {
      const r = this.resolveMedia(poster.trim(), 'image');
      if ('url' in r) media.setAttribute('poster', r.url);
      else media.removeAttribute('poster');
    }

    const sources = [...media.querySelectorAll('source')];
    const candidates = media.hasAttribute('src') ? [media as Element] : sources;
    if (candidates.length === 0) {
      media.replaceWith(this.placeholder(category, 'missing', t('pv.noSource'), ''));
      return;
    }
    let firstPlaceholder: HTMLElement | null = null;
    let kept = 0;
    const badges: HTMLElement[] = [];
    for (const el of candidates) {
      const r = this.resolveMedia((el.getAttribute('src') ?? '').trim(), category);
      if ('placeholder' in r) {
        firstPlaceholder ??= r.placeholder;
        if (el === media) media.removeAttribute('src');
        else el.remove();
      } else {
        el.setAttribute('src', r.url);
        if (r.badge) badges.push(r.badge);
        kept++;
      }
    }
    if (kept === 0 && firstPlaceholder) {
      media.replaceWith(firstPlaceholder);
      return;
    }
    media.setAttribute('referrerpolicy', 'no-referrer');
    if (badges[0]) media.after(badges[0]);
  }

  private processLinks() {
    this.doc.querySelectorAll('a[href]').forEach((node) => {
      const a = node as HTMLAnchorElement;
      const raw = (a.getAttribute('href') ?? '').trim();
      a.removeAttribute('target');

      if (raw.startsWith('#')) return; // in-document anchor, handled natively by the frame

      if (!hasScheme(raw)) {
        const [path, hash] = raw.split('#');
        const docId = path ? this.ctx.resolveDoc(path, this.ctx.docPath) : null;
        if (docId) {
          a.removeAttribute('href');
          a.setAttribute('data-doc', docId);
          if (hash) a.setAttribute('data-hash', hash);
          a.classList.add('doc-link');
          a.title = t('pv.openDoc', { path });
          return;
        }
        const span = this.el('span', 'link-local');
        span.append(...a.childNodes);
        span.title = t('pv.localLink', { path: raw });
        a.replaceWith(span);
        return;
      }

      const v = checkUrl(raw, 'link', a.textContent ?? '');
      if (v.risk === 'danger') {
        this.record('danger', t('pv.link'), v.display, v.reasons);
        const span = this.el('span', 'link-blocked');
        span.append(...a.childNodes);
        span.title = t('pv.linkBlocked', { url: v.display });
        a.replaceWith(span);
        span.after(this.badge('danger', v.reasons));
        return;
      }
      if (!this.ctx.protection.links && v.network) {
        this.record('blocked', t('pv.link'), v.display, []);
        const span = this.el('span', 'link-disabled');
        span.append(...a.childNodes);
        span.title = t('pv.linksDisabled', { url: v.display, hint: t('prot.links') });
        a.replaceWith(span);
        return;
      }
      a.setAttribute('data-external', '1');
      a.title = v.display;
      if (v.risk === 'warn') {
        this.record('warn', t('pv.link'), v.display, v.reasons);
        a.setAttribute('data-risk', 'warn');
        a.setAttribute('data-reasons', v.reasons.join('\n'));
        a.after(this.badge('warn', v.reasons));
      }
    });
  }
}

// ---------- lazily loaded renderers

const mermaidCache = new Map<string, string>();
let mermaidSeq = 0;

async function renderMermaid(doc: Document, theme: 'light' | 'dark') {
  const blocks = [...doc.querySelectorAll('.mermaid-block')];
  if (blocks.length === 0) return;
  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: theme === 'dark' ? 'dark' : 'default',
    htmlLabels: false,
    flowchart: { htmlLabels: false },
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  });
  for (const block of blocks) {
    const source = block.querySelector('.mermaid-src')?.textContent ?? '';
    const key = `${theme}\n${source}`;
    let dataUrl = mermaidCache.get(key);
    if (!dataUrl) {
      try {
        const { svg } = await mermaid.render(`mmd-${++mermaidSeq}`, source);
        dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        if (mermaidCache.size > 50) mermaidCache.clear();
        mermaidCache.set(key, dataUrl);
      } catch (err) {
        document.getElementById(`dmmd-${mermaidSeq}`)?.remove();
        const box = doc.createElement('div');
        box.className = 'mermaid-error';
        box.textContent = t('pv.diagramError', { error: String((err as Error)?.message ?? err) });
        block.append(box);
        continue;
      }
    }
    const img = doc.createElement('img');
    img.className = 'mermaid-diagram';
    img.alt = t('pv.diagram');
    img.src = dataUrl;
    block.querySelector('.mermaid-src')?.replaceWith(img);
  }
}

const mathCache = new Map<string, string>();

async function renderMath(doc: Document) {
  const nodes = [...doc.querySelectorAll<HTMLElement>('.math[data-tex]')];
  if (nodes.length === 0) return;
  const { default: katex } = await import('katex');
  for (const node of nodes) {
    const tex = node.getAttribute('data-tex') ?? '';
    const display = node.classList.contains('math-display');
    const key = `${display ? 'D' : 'I'}${tex}`;
    let html = mathCache.get(key);
    if (html === undefined) {
      html = katex.renderToString(tex, { displayMode: display, output: 'mathml', throwOnError: false, trust: false, strict: 'ignore' });
      if (mathCache.size > 500) mathCache.clear();
      mathCache.set(key, html);
    }
    node.innerHTML = html;
    node.removeAttribute('data-tex');
    node.classList.add('math-rendered');
  }
}

export async function renderDocument(source: string, ctx: RenderContext): Promise<RenderResult> {
  const raw = renderMarkdownToHtml(source);
  const doc = new DOMParser().parseFromString(`<!doctype html><html><body>${raw}</body></html>`, 'text/html');
  const processor = new Processor(doc, ctx);
  processor.run();
  await Promise.all([renderMath(doc), renderMermaid(doc, ctx.theme)]);
  const html = purify.sanitize(doc.body.innerHTML, PURIFY_CONFIG) as string;
  return { html, stats: processor.stats, issues: processor.issues };
}

/** Sanitises HTML for standalone export (same rules as the preview). */
export function sanitizeForExport(html: string): string {
  return purify.sanitize(html, PURIFY_CONFIG) as string;
}
