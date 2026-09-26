// Markdown formatting commands used by the toolbar and keyboard shortcuts.
import { EditorSelection, type ChangeSpec, type SelectionRange } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import { SlugRegistry } from '../markdown/slug';
import { t } from '../i18n';

type Cmd = (view: EditorView) => boolean;

/** Wraps each selection in `before…after`, or unwraps it if already wrapped. */
export function wrapInline(before: string, after = before, placeholder?: string): Cmd {
  return (view) => {
    const { state } = view;
    const tr = state.changeByRange((range) => {
      const text = state.sliceDoc(range.from, range.to);
      const outerBefore = state.sliceDoc(range.from - before.length, range.from);
      const outerAfter = state.sliceDoc(range.to, range.to + after.length);
      if (!range.empty && outerBefore === before && outerAfter === after) {
        return {
          changes: [
            { from: range.from - before.length, to: range.from },
            { from: range.to, to: range.to + after.length },
          ],
          range: EditorSelection.range(range.from - before.length, range.to - before.length),
        };
      }
      if (text.length >= before.length + after.length && text.startsWith(before) && text.endsWith(after) && !range.empty) {
        const inner = text.slice(before.length, text.length - after.length);
        return { changes: { from: range.from, to: range.to, insert: inner }, range: EditorSelection.range(range.from, range.from + inner.length) };
      }
      const content = range.empty ? (placeholder ?? t('snip.text')) : text;
      return {
        changes: { from: range.from, to: range.to, insert: before + content + after },
        range: EditorSelection.range(range.from + before.length, range.from + before.length + content.length),
      };
    });
    view.dispatch(state.update(tr, { scrollIntoView: true, userEvent: 'input.format' }));
    view.focus();
    return true;
  };
}

function selectedLines(view: EditorView, range: SelectionRange) {
  const { doc } = view.state;
  const first = doc.lineAt(range.from).number;
  const last = doc.lineAt(range.to).number;
  const lines = [];
  for (let n = first; n <= last; n++) lines.push(doc.line(n));
  return lines;
}

const LIST_PREFIX = /^(\s*)([-*+]\s+\[[ xX]\]\s+|[-*+]\s+|\d+[.)]\s+|>\s?)/;

/** Toggles a line prefix (lists, quotes) on every selected line. */
export function toggleLinePrefix(kind: 'bullet' | 'ordered' | 'task' | 'quote'): Cmd {
  const matches: Record<typeof kind, RegExp> = {
    bullet: /^(\s*)[-*+]\s+(?!\[[ xX]\])/,
    ordered: /^(\s*)\d+[.)]\s+/,
    task: /^(\s*)[-*+]\s+\[[ xX]\]\s+/,
    quote: /^(\s*)>\s?/,
  };
  return (view) => {
    const changes: ChangeSpec[] = [];
    for (const range of view.state.selection.ranges) {
      const lines = selectedLines(view, range).filter((l, _i, all) => all.length === 1 || l.text.trim() !== '');
      const allHave = lines.every((l) => matches[kind].test(l.text));
      lines.forEach((line, i) => {
        const existing = line.text.match(LIST_PREFIX);
        const indent = existing?.[1] ?? line.text.match(/^\s*/)![0];
        const prefixEnd = existing ? existing[0].length : indent.length;
        let insert = '';
        if (!allHave) {
          insert = { bullet: '- ', ordered: `${i + 1}. `, task: '- [ ] ', quote: '> ' }[kind];
        }
        changes.push({ from: line.from + indent.length, to: line.from + prefixEnd, insert });
      });
    }
    view.dispatch({ changes, userEvent: 'input.format' });
    view.focus();
    return true;
  };
}

/** Sets the heading level of selected lines (0 = plain paragraph). Same level again removes it. */
export function setHeading(level: number): Cmd {
  return (view) => {
    const changes: ChangeSpec[] = [];
    for (const range of view.state.selection.ranges) {
      for (const line of selectedLines(view, range)) {
        const m = line.text.match(/^(#{1,6})\s+/);
        const current = m ? m[1].length : 0;
        const target = current === level ? 0 : level;
        changes.push({ from: line.from, to: line.from + (m ? m[0].length : 0), insert: target ? `${'#'.repeat(target)} ` : '' });
      }
    }
    view.dispatch({ changes, userEvent: 'input.format' });
    view.focus();
    return true;
  };
}

/**
 * Inserts a block on its own lines, separated by blank lines. `$SEL$` in the
 * template is replaced by the selected text (or `fallback`), which ends up selected.
 */
export function insertBlock(template: string, fallback = ''): Cmd {
  return (view) => {
    const { state } = view;
    const range = state.selection.main;
    const doc = state.doc;
    const selected = state.sliceDoc(range.from, range.to);
    const startLine = doc.lineAt(range.from);
    const endLine = doc.lineAt(range.to);
    const wholeLines = !range.empty || startLine.text.trim() === '';
    const from = wholeLines ? startLine.from : endLine.to;
    const to = wholeLines ? endLine.to : endLine.to;
    const content = range.empty ? fallback : range.from === startLine.from && range.to === endLine.to ? selected : state.sliceDoc(startLine.from, endLine.to);

    const [head, tail] = template.split('$SEL$');
    const beforeText = doc.sliceString(0, from);
    const afterText = doc.sliceString(to);
    const lead = wholeLines
      ? beforeText === '' || beforeText.endsWith('\n\n') ? '' : beforeText.endsWith('\n') ? '\n' : '\n\n'
      : '\n\n';
    const trail = afterText === '' ? '\n' : afterText.startsWith('\n\n') ? '' : afterText.startsWith('\n') ? '\n' : '\n\n';
    const insert = lead + head + (tail !== undefined ? content + tail : '') + trail;
    const selFrom = from + lead.length + head.length;
    const selTo = tail !== undefined ? selFrom + content.length : selFrom;
    view.dispatch({
      changes: { from: wholeLines ? from : to, to, insert },
      selection: EditorSelection.range(selFrom, selTo),
      scrollIntoView: true,
      userEvent: 'input.format',
    });
    view.focus();
    return true;
  };
}

const URL_RE = /^(https?:\/\/|mailto:|www\.)\S+$/i;

export function insertLink(image = false): Cmd {
  return (view) => {
    const { state } = view;
    const range = state.selection.main;
    const text = state.sliceDoc(range.from, range.to).trim();
    const bang = image ? '!' : '';
    let insert: string;
    let sel: [number, number];
    if (URL_RE.test(text)) {
      insert = `${bang}[](${text})`;
      sel = [range.from + bang.length + 1, range.from + bang.length + 1];
    } else {
      const label = text || t(image ? 'snip.description' : 'snip.linkText');
      const url = image ? 'img/picture.png' : 'https://';
      insert = `${bang}[${label}](${url})`;
      const urlStart = range.from + bang.length + label.length + 3;
      sel = text ? [urlStart, urlStart + url.length] : [range.from + bang.length + 1, range.from + bang.length + 1 + label.length];
    }
    view.dispatch({ changes: { from: range.from, to: range.to, insert }, selection: EditorSelection.range(...sel), userEvent: 'input.format' });
    view.focus();
    return true;
  };
}

// Templates are built at call time so inserted text follows the current language.
export const insertTable: Cmd = (view) => {
  const [a, b, c] = [1, 2, 3].map((n) => t('snip.column', { n }));
  return insertBlock(`| ${a} | ${b} | ${c} |\n| --- | --- | --- |\n| $SEL$ |  |  |\n|  |  |  |`, t('snip.cell'))(view);
};

export const insertCodeBlock: Cmd = (view) => insertBlock('```\n$SEL$\n```', t('snip.code'))(view);

export const insertRule = insertBlock('---');

export const insertDetails: Cmd = (view) =>
  insertBlock(`<details>\n<summary>${t('snip.detailsTitle')}</summary>\n\n$SEL$\n\n</details>`, t('snip.detailsBody'))(view);

export const insertMath = insertBlock('$$\n$SEL$\n$$', 'E = mc^2');

export const insertMermaid: Cmd = (view) =>
  insertBlock(
    `\`\`\`mermaid\nflowchart LR\n    A[${t('snip.mmdStart')}] --> B{${t('snip.mmdCondition')}}\n    B -->|${t('snip.mmdYes')}| C[${t('snip.mmdResult')}]\n    B -->|${t('snip.mmdNo')}| D[${t('snip.mmdOther')}]\n\`\`\``,
  )(view);

export function insertAlert(kind: 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING' | 'CAUTION'): Cmd {
  return (view) => {
    const range = view.state.selection.main;
    const text = view.state.sliceDoc(range.from, range.to) || t('snip.alertText');
    const quoted = text.split('\n').map((l) => `> ${l}`).join('\n');
    return insertBlock(`> [!${kind}]\n${quoted}`)(view);
  };
}

export function insertFootnote(view: EditorView): boolean {
  const text = view.state.doc.toString();
  const used = [...text.matchAll(/\[\^(\d+)\]/g)].map((m) => Number(m[1]));
  const n = (used.length ? Math.max(...used) : 0) + 1;
  const cursor = view.state.selection.main.head;
  const end = view.state.doc.length;
  const tail = text.endsWith('\n') ? '' : '\n';
  const definition = `${tail}\n[^${n}]: `;
  view.dispatch({
    changes: [
      { from: cursor, insert: `[^${n}]` },
      { from: end, insert: definition },
    ],
    selection: EditorSelection.cursor(end + `[^${n}]`.length + definition.length),
    scrollIntoView: true,
    userEvent: 'input.format',
  });
  view.focus();
  return true;
}

/** Builds a table of contents whose links match the renderer's heading ids. */
export function buildToc(source: string): string {
  const slugs = new SlugRegistry();
  const items: { level: number; text: string; slug: string }[] = [];
  let fence: string | null = null;
  for (const line of source.split('\n')) {
    const f = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
      continue;
    }
    if (fence) continue;
    const h = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (h) {
      const text = h[2].replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`~]/g, '');
      items.push({ level: h[1].length, text, slug: slugs.next(h[2]) });
    }
  }
  if (items.length === 0) return '';
  const min = Math.min(...items.map((i) => i.level));
  return items.map((i) => `${'  '.repeat(i.level - min)}- [${i.text}](#${i.slug})`).join('\n');
}

export function insertToc(view: EditorView): boolean {
  const toc = buildToc(view.state.doc.toString());
  if (!toc) return false;
  return insertBlock(`**${t('snip.contents')}**\n\n${toc}`)(view);
}
