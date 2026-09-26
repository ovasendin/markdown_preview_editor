import {
  Undo2, Redo2, Heading, Bold, Italic, Strikethrough, Link, Image, List, ListOrdered, ListTodo, Quote, Code,
  SquareCode, Table, Minus, ChevronDown, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Pilcrow,
  Highlighter, Superscript, Subscript, Asterisk, Keyboard, ListCollapse, MessageSquareWarning, Sigma, Workflow,
  ListTree, IndentIncrease, IndentDecrease, Search, Hash, WrapText, SlidersHorizontal, type IconNode,
} from 'lucide';
import { undo, redo, indentMore, indentLess } from '@codemirror/commands';
import { openSearchPanel } from '@codemirror/search';
import type { EditorView } from '@codemirror/view';
import type { Editor } from './editor';
import {
  wrapInline, toggleLinePrefix, setHeading, insertLink, insertTable, insertCodeBlock, insertRule, insertDetails,
  insertMath, insertMermaid, insertAlert, insertFootnote, insertToc,
} from './commands';
import { h, icon, toast, closePopover } from './ui';
import { settings, saveSettings } from './settings';
import { t } from '../i18n';

type Run = (view: EditorView) => boolean;

interface MenuItem {
  label: string;
  icon?: IconNode;
  hint?: string;
  run: Run;
}

interface ToolbarHosts {
  main: HTMLElement;
  advanced: HTMLElement;
  menu: HTMLElement;
  showMenu(button: HTMLElement, panel: HTMLElement): void;
  advancedOpen: boolean;
  onAdvancedToggle(open: boolean): void;
}

/** Builds (or rebuilds, e.g. after a language change) both toolbar rows. */
export function buildToolbar(editor: Editor, hosts: ToolbarHosts): void {
  const view = editor.view;
  hosts.main.replaceChildren();
  hosts.advanced.replaceChildren();

  const button = (title: string, ic: IconNode, run: () => void, extra: Record<string, string> = {}) => {
    const b = h('button', { type: 'button', class: 'tool', title, 'aria-label': title, ...extra }, icon(ic, 17));
    b.addEventListener('mousedown', (e) => e.preventDefault()); // keep the editor selection
    b.addEventListener('click', run);
    return b;
  };
  const cmd = (title: string, ic: IconNode, run: Run) => button(title, ic, () => run(view));
  const sep = () => h('span', { class: 'tool-sep', 'aria-hidden': 'true' });

  const menu = (title: string, ic: IconNode, items: MenuItem[]) => {
    const b = h('button', { type: 'button', class: 'tool tool-menu', title, 'aria-label': title, 'aria-haspopup': 'menu' }, icon(ic, 17), icon(ChevronDown, 12));
    b.addEventListener('mousedown', (e) => e.preventDefault());
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const panel = hosts.menu;
      panel.replaceChildren(
        ...items.map((item) => {
          const mi = h('button', { type: 'button', class: 'menu-item', role: 'menuitem' }, item.icon ? icon(item.icon, 16) : null, h('span', {}, item.label), item.hint ? h('kbd', {}, item.hint) : null);
          mi.addEventListener('mousedown', (ev) => ev.preventDefault());
          mi.addEventListener('click', () => {
            closePopover();
            item.run(view);
          });
          return mi;
        }),
      );
      if (!panel.hidden && panel.dataset.owner === title) {
        closePopover();
        return;
      }
      panel.dataset.owner = title;
      hosts.showMenu(b, panel);
    });
    return b;
  };

  // ---------- main row: the most common Markdown formatting
  const advancedToggle = h(
    'button',
    { type: 'button', class: 'tool tool-advanced-toggle', 'aria-expanded': String(hosts.advancedOpen), 'aria-controls': 'toolbar-advanced', title: t('tb.advanced') },
    icon(SlidersHorizontal, 16),
    h('span', { class: 'tool-text' }, t('tb.advanced')),
    icon(ChevronDown, 14),
  );
  advancedToggle.addEventListener('click', () => {
    const open = advancedToggle.getAttribute('aria-expanded') !== 'true';
    advancedToggle.setAttribute('aria-expanded', String(open));
    hosts.advanced.hidden = !open;
    hosts.onAdvancedToggle(open);
  });
  hosts.advanced.hidden = !hosts.advancedOpen;

  hosts.main.append(
    cmd(t('tb.undo'), Undo2, undo),
    cmd(t('tb.redo'), Redo2, redo),
    sep(),
    menu(t('tb.heading'), Heading, [
      { label: t('tb.normal'), icon: Pilcrow, run: setHeading(0) },
      { label: t('tb.headingN', { n: 1 }), icon: Heading1, run: setHeading(1) },
      { label: t('tb.headingN', { n: 2 }), icon: Heading2, run: setHeading(2) },
      { label: t('tb.headingN', { n: 3 }), icon: Heading3, run: setHeading(3) },
    ]),
    cmd(t('tb.bold'), Bold, wrapInline('**')),
    cmd(t('tb.italic'), Italic, wrapInline('*')),
    cmd(t('tb.strike'), Strikethrough, wrapInline('~~')),
    sep(),
    cmd(t('tb.link'), Link, insertLink()),
    cmd(t('tb.image'), Image, insertLink(true)),
    sep(),
    cmd(t('tb.bullets'), List, toggleLinePrefix('bullet')),
    cmd(t('tb.numbers'), ListOrdered, toggleLinePrefix('ordered')),
    cmd(t('tb.tasks'), ListTodo, toggleLinePrefix('task')),
    cmd(t('tb.quote'), Quote, toggleLinePrefix('quote')),
    sep(),
    cmd(t('tb.code'), Code, (v) => wrapInline('`', '`', t('snip.code'))(v)),
    cmd(t('tb.codeBlock'), SquareCode, insertCodeBlock),
    cmd(t('tb.table'), Table, insertTable),
    cmd(t('tb.rule'), Minus, insertRule),
    h('span', { class: 'tool-spacer' }),
    advancedToggle,
  );

  // ---------- advanced row (collapsed by default)
  const toggle = (title: string, ic: IconNode, get: () => boolean, set: (v: boolean) => void) => {
    const b = button(title, ic, () => {
      set(!get());
      b.setAttribute('aria-pressed', String(get()));
    }, { 'aria-pressed': String(get()) });
    return b;
  };

  const withToast = (run: Run, message: string): Run => (v) => {
    const ok = run(v);
    if (!ok) toast(message, 'info');
    return ok;
  };

  editor.setLineNumbers(settings.lineNumbers);
  editor.setWrap(settings.wrap);

  hosts.advanced.append(
    menu(t('tb.headings46'), Heading4, [
      { label: t('tb.headingN', { n: 4 }), icon: Heading4, run: setHeading(4) },
      { label: t('tb.headingN', { n: 5 }), icon: Heading5, run: setHeading(5) },
      { label: t('tb.headingN', { n: 6 }), icon: Heading6, run: setHeading(6) },
    ]),
    cmd(t('tb.highlight'), Highlighter, wrapInline('==')),
    cmd(t('tb.sup'), Superscript, wrapInline('^', '^', '2')),
    cmd(t('tb.sub'), Subscript, wrapInline('~', '~', '2')),
    cmd(t('tb.kbd'), Keyboard, wrapInline('<kbd>', '</kbd>', 'Ctrl')),
    sep(),
    cmd(t('tb.footnote'), Asterisk, insertFootnote),
    cmd(t('tb.details'), ListCollapse, insertDetails),
    menu(t('tb.alert'), MessageSquareWarning, [
      { label: t('tb.alertNote'), run: insertAlert('NOTE') },
      { label: t('tb.alertTip'), run: insertAlert('TIP') },
      { label: t('tb.alertImportant'), run: insertAlert('IMPORTANT') },
      { label: t('tb.alertWarning'), run: insertAlert('WARNING') },
      { label: t('tb.alertCaution'), run: insertAlert('CAUTION') },
    ]),
    sep(),
    cmd(t('tb.math'), Sigma, insertMath),
    cmd(t('tb.mermaid'), Workflow, insertMermaid),
    cmd(t('tb.toc'), ListTree, withToast(insertToc, t('tb.tocEmpty'))),
    sep(),
    cmd(t('tb.indent'), IndentIncrease, indentMore),
    cmd(t('tb.outdent'), IndentDecrease, indentLess),
    cmd(t('tb.find'), Search, openSearchPanel),
    sep(),
    toggle(t('tb.lineNumbers'), Hash, () => settings.lineNumbers, (v) => {
      settings.lineNumbers = v;
      editor.setLineNumbers(v);
      saveSettings();
    }),
    toggle(t('tb.wrap'), WrapText, () => settings.wrap, (v) => {
      settings.wrap = v;
      editor.setWrap(v);
      saveSettings();
    }),
  );
}
