// The preview lives in a sandboxed iframe WITHOUT script permission. The app
// fills it from outside (same origin via allow-same-origin) and handles clicks
// there itself. Each protection mode loads a different preview page whose
// Content-Security-Policy only permits the media that mode allows.

export interface PreviewHandlers {
  onExternalLink(url: string, risky: boolean, reasons: string[]): void;
  onDocLink(docId: string, hash: string | null): void;
  onScroll(): void;
  onKeydown(e: KeyboardEvent): void;
  onDropAttempt(): void;
}

interface Anchor {
  line: number;
  top: number;
}

export class Preview {
  readonly iframe: HTMLIFrameElement;
  private variant = '';
  private ready: Promise<Document> = Promise.resolve(document);
  private html = '';
  private theme: 'light' | 'dark' = 'light';
  private doc: Document | null = null;

  constructor(host: HTMLElement, private handlers: PreviewHandlers) {
    this.iframe = document.createElement('iframe');
    this.iframe.className = 'preview-frame';
    this.iframe.title = 'Document preview';
    // No allow-scripts: nothing inside the document can ever execute.
    // allow-modals only lets the app call print() on the frame.
    this.iframe.setAttribute('sandbox', 'allow-same-origin allow-modals');
    this.iframe.setAttribute('referrerpolicy', 'no-referrer');
    this.iframe.setAttribute('allow', 'fullscreen');
    host.append(this.iframe);
  }

  /** Switches to the preview page matching the allowed external media. */
  setVariant(images: boolean, media: boolean): Promise<Document> {
    const variant = `preview/p-${images ? 1 : 0}${media ? 1 : 0}.html`;
    if (variant === this.variant) return this.ready;
    this.variant = variant;
    const scrollRatio = this.scrollRatio();
    this.doc = null;
    this.ready = new Promise<Document>((resolve) => {
      const onLoad = () => {
        const doc = this.iframe.contentDocument;
        if (!doc || !doc.getElementById('content')) return; // about:blank during navigation
        this.iframe.removeEventListener('load', onLoad);
        this.attach(doc);
        this.doc = doc;
        this.applyTheme();
        this.write();
        const win = this.iframe.contentWindow!;
        win.scrollTo(0, scrollRatio * (doc.documentElement.scrollHeight - win.innerHeight));
        resolve(doc);
      };
      this.iframe.addEventListener('load', onLoad);
    });
    this.iframe.src = variant;
    return this.ready;
  }

  private attach(doc: Document) {
    const win = doc.defaultView!;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.('a');
      if (!a) return;
      e.preventDefault();
      if (e.type === 'auxclick' && e.button !== 1) return;
      const docId = a.getAttribute('data-doc');
      if (docId) {
        this.handlers.onDocLink(docId, a.getAttribute('data-hash'));
        return;
      }
      const href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#')) {
        this.scrollToAnchor(href.slice(1));
        return;
      }
      if (a.getAttribute('data-external') === '1') {
        const reasons = (a.getAttribute('data-reasons') ?? '').split('\n').filter(Boolean);
        this.handlers.onExternalLink(href, a.getAttribute('data-risk') === 'warn', reasons);
      }
    };
    doc.addEventListener('click', onClick, true);
    doc.addEventListener('auxclick', onClick, true);
    win.addEventListener('scroll', () => this.handlers.onScroll(), { passive: true });
    doc.addEventListener('keydown', (e) => this.handlers.onKeydown(e));
    // Dropping a file onto the frame would navigate it away; refuse and hint instead.
    const stopDrop = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'none';
      if (e.type === 'drop') this.handlers.onDropAttempt();
    };
    doc.addEventListener('dragover', stopDrop);
    doc.addEventListener('drop', stopDrop);
  }

  scrollToAnchor(rawId: string): void {
    if (!this.doc) return;
    let id = rawId;
    try {
      id = decodeURIComponent(rawId);
    } catch {
      /* keep raw */
    }
    const el = this.doc.getElementById(id) ?? this.doc.getElementById(rawId);
    el?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  setContent(html: string): void {
    this.html = html;
    this.write();
  }

  get content(): string {
    return this.html;
  }

  private write() {
    const target = this.doc?.getElementById('content');
    if (target) target.innerHTML = this.html;
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.theme = theme;
    this.applyTheme();
  }

  private applyTheme() {
    const doc = this.doc;
    if (!doc) return;
    doc.documentElement.dataset.theme = this.theme;
    const dark = this.theme === 'dark';
    (doc.getElementById('theme-md-light') as HTMLLinkElement).disabled = dark;
    (doc.getElementById('theme-hl-light') as HTMLLinkElement).disabled = dark;
    (doc.getElementById('theme-md-dark') as HTMLLinkElement).disabled = !dark;
    (doc.getElementById('theme-hl-dark') as HTMLLinkElement).disabled = !dark;
  }

  private anchors(): Anchor[] {
    const doc = this.doc;
    if (!doc) return [];
    const scrollY = doc.defaultView!.scrollY;
    const out: Anchor[] = [];
    for (const el of doc.querySelectorAll<HTMLElement>('#content [data-line]')) {
      const line = Number(el.getAttribute('data-line'));
      if (Number.isNaN(line)) continue;
      const top = el.getBoundingClientRect().top + scrollY;
      const prev = out[out.length - 1];
      if (prev && (line <= prev.line || top <= prev.top)) continue;
      out.push({ line, top });
    }
    return out;
  }

  private scrollRatio(): number {
    const doc = this.doc;
    if (!doc) return 0;
    const win = doc.defaultView!;
    const max = doc.documentElement.scrollHeight - win.innerHeight;
    return max > 0 ? win.scrollY / max : 0;
  }

  /** Source line (fractional) shown at the top of the preview. */
  topLine(totalLines: number): number {
    const doc = this.doc;
    if (!doc) return 0;
    const win = doc.defaultView!;
    const y = win.scrollY;
    if (y <= 0) return 0;
    if (y + win.innerHeight >= doc.documentElement.scrollHeight - 2) return totalLines;
    const list = this.anchors();
    if (list.length === 0) return 0;
    let i = list.findIndex((a) => a.top > y) - 1;
    if (i === -2) i = list.length - 1;
    if (i < 0) return 0;
    const a = list[i];
    const b = list[i + 1] ?? { line: totalLines, top: doc.documentElement.scrollHeight };
    return a.line + ((y - a.top) / Math.max(1, b.top - a.top)) * (b.line - a.line);
  }

  scrollToLine(line: number, totalLines: number): void {
    const doc = this.doc;
    if (!doc) return;
    const win = doc.defaultView!;
    if (line <= 0) {
      win.scrollTo(0, 0);
      return;
    }
    if (line >= totalLines) {
      win.scrollTo(0, doc.documentElement.scrollHeight);
      return;
    }
    const list = this.anchors();
    if (list.length === 0) return;
    let i = list.findIndex((a) => a.line > line) - 1;
    if (i === -2) i = list.length - 1;
    if (i < 0) {
      win.scrollTo(0, 0);
      return;
    }
    const a = list[i];
    const b = list[i + 1] ?? { line: totalLines, top: doc.documentElement.scrollHeight };
    win.scrollTo(0, a.top + ((line - a.line) / Math.max(1, b.line - a.line)) * (b.top - a.top));
  }

  print(): void {
    this.iframe.contentWindow?.print();
  }
}
