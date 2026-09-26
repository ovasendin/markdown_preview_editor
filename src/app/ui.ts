import { createElement, type IconNode } from 'lucide';

export function icon(node: IconNode, size = 18): SVGElement {
  const svg = createElement(node);
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('icon');
  return svg;
}

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<Record<string, string>> = {},
  ...children: (Node | string | null | undefined | false)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined) continue;
    if (k === 'class') el.className = v;
    else el.setAttribute(k, v);
  }
  for (const c of children) if (c) el.append(c);
  return el;
}

export function $(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} missing`);
  return el;
}

// ---------- toasts

export function toast(message: string, kind: 'info' | 'warn' | 'error' | 'ok' = 'info', ms = 4000): void {
  const host = $('toasts');
  const el = h('div', { class: `toast toast-${kind}`, role: kind === 'error' ? 'alert' : 'status' }, message);
  host.append(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, ms);
}

// ---------- confirmation dialog

export interface ConfirmOptions {
  title: string;
  body: (Node | string)[];
  ok: string;
  cancel?: string | false;
  danger?: boolean;
}

export function confirmDialog(opts: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const dialog = h('dialog', { class: 'dialog' });
    const okBtn = h('button', { class: `btn ${opts.danger ? 'btn-danger' : 'btn-primary'}`, value: 'ok' }, opts.ok);
    const cancelBtn = h('button', { class: 'btn', value: 'cancel' }, opts.cancel ?? 'Cancel');
    dialog.append(
      h('h2', { class: 'dialog-title' }, opts.title),
      h('div', { class: 'dialog-body' }, ...opts.body),
      h('div', { class: 'dialog-actions' }, opts.cancel === false ? null : cancelBtn, okBtn),
    );
    let result = false;
    okBtn.addEventListener('click', () => {
      result = true;
      dialog.close();
    });
    cancelBtn.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      dialog.remove();
      resolve(result);
    });
    document.body.append(dialog);
    dialog.showModal();
    (opts.cancel === false ? okBtn : cancelBtn).focus();
  });
}

// ---------- popovers (protection, settings, heading menu)

let openPopover: { panel: HTMLElement; button: HTMLElement } | null = null;

export function closePopover(): void {
  if (!openPopover) return;
  openPopover.panel.hidden = true;
  openPopover.button.setAttribute('aria-expanded', 'false');
  openPopover = null;
}

export function bindPopover(button: HTMLElement, panel: HTMLElement): void {
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-haspopup', 'true');
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasOpen = openPopover?.panel === panel;
    closePopover();
    if (!wasOpen) showPopover(button, panel);
  });
  panel.addEventListener('click', (e) => e.stopPropagation());
}

export function showPopover(button: HTMLElement, panel: HTMLElement): void {
  closePopover();
  panel.hidden = false;
  button.setAttribute('aria-expanded', 'true');
  openPopover = { panel, button };
  const r = button.getBoundingClientRect();
  const width = panel.offsetWidth;
  const left = Math.min(Math.max(8, r.right - width), window.innerWidth - width - 8);
  panel.style.left = `${Math.max(8, left)}px`;
  panel.style.top = `${r.bottom + 6}px`;
}

document.addEventListener('click', closePopover);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopover();
});
window.addEventListener('resize', closePopover);

export function download(name: string, content: Blob): void {
  const url = URL.createObjectURL(content);
  const a = h('a', { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
