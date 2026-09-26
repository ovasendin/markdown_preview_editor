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

export function buildToolbar(editor: Editor, hosts: ToolbarHosts): void {
  const view = editor.view;

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
    { type: 'button', class: 'tool tool-advanced-toggle', 'aria-expanded': String(hosts.advancedOpen), 'aria-controls': 'toolbar-advanced', title: 'Advanced editor' },
    icon(SlidersHorizontal, 16),
    h('span', { class: 'tool-text' }, 'Advanced editor'),
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
    cmd('Undo (Ctrl+Z)', Undo2, undo),
    cmd('Redo (Ctrl+Y)', Redo2, redo),
    sep(),
    menu('Heading', Heading, [
      { label: 'Normal text', icon: Pilcrow, run: setHeading(0) },
      { label: 'Heading 1', icon: Heading1, run: setHeading(1) },
      { label: 'Heading 2', icon: Heading2, run: setHeading(2) },
      { label: 'Heading 3', icon: Heading3, run: setHeading(3) },
    ]),
    cmd('Bold (Ctrl+B)', Bold, wrapInline('**')),
    cmd('Italic (Ctrl+I)', Italic, wrapInline('*')),
    cmd('Strikethrough', Strikethrough, wrapInline('~~')),
    sep(),
    cmd('Link (Ctrl+K)', Link, insertLink()),
    cmd('Image', Image, insertLink(true)),
    sep(),
    cmd('Bulleted list', List, toggleLinePrefix('bullet')),
    cmd('Numbered list', ListOrdered, toggleLinePrefix('ordered')),
    cmd('Task list', ListTodo, toggleLinePrefix('task')),
    cmd('Quote', Quote, toggleLinePrefix('quote')),
    sep(),
    cmd('Inline code', Code, wrapInline('`', '`', 'code')),
    cmd('Code block', SquareCode, insertCodeBlock),
    cmd('Table', Table, insertTable),
    cmd('Horizontal rule', Minus, insertRule),
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
    menu('Headings 4–6', Heading4, [
      { label: 'Heading 4', icon: Heading4, run: setHeading(4) },
      { label: 'Heading 5', icon: Heading5, run: setHeading(5) },
      { label: 'Heading 6', icon: Heading6, run: setHeading(6) },
    ]),
    cmd('Highlight ==text==', Highlighter, wrapInline('==')),
    cmd('Superscript x^2^', Superscript, wrapInline('^', '^', '2')),
    cmd('Subscript H~2~O', Subscript, wrapInline('~', '~', '2')),
    cmd('Keyboard key <kbd>', Keyboard, wrapInline('<kbd>', '</kbd>', 'Ctrl')),
    sep(),
    cmd('Footnote', Asterisk, insertFootnote),
    cmd('Collapsible section (spoiler)', ListCollapse, insertDetails),
    menu('Alert', MessageSquareWarning, [
      { label: 'Note', run: insertAlert('NOTE') },
      { label: 'Tip', run: insertAlert('TIP') },
      { label: 'Important', run: insertAlert('IMPORTANT') },
      { label: 'Warning', run: insertAlert('WARNING') },
      { label: 'Caution', run: insertAlert('CAUTION') },
    ]),
    sep(),
    cmd('Math formula', Sigma, insertMath),
    cmd('Mermaid diagram', Workflow, insertMermaid),
    cmd('Table of contents', ListTree, withToast(insertToc, 'The document has no headings for a table of contents')),
    sep(),
    cmd('Indent', IndentIncrease, indentMore),
    cmd('Outdent', IndentDecrease, indentLess),
    cmd('Find and replace (Ctrl+F)', Search, openSearchPanel),
    sep(),
    toggle('Line numbers', Hash, () => settings.lineNumbers, (v) => {
      settings.lineNumbers = v;
      editor.setLineNumbers(v);
      saveSettings();
    }),
    toggle('Word wrap', WrapText, () => settings.wrap, (v) => {
      settings.wrap = v;
      editor.setWrap(v);
      saveSettings();
    }),
  );
}
