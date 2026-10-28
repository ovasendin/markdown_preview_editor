import { describe, expect, it } from 'vitest';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { insertCodeBlock, setHeading, toggleLinePrefix } from '../../src/app/commands';

const DOC = 'Привет\nЭто круто\nЭто нет';

function run(cmd: (v: EditorView) => boolean, doc: string, anchor: number, head = anchor): string {
  const view = new EditorView({ state: EditorState.create({ doc, selection: { anchor, head } }), parent: document.body });
  cmd(view);
  const out = view.state.doc.toString();
  view.destroy();
  return out;
}

describe('selection ending at the start of the next line', () => {
  const end = 'Привет\n'.length; // start of line 2

  it('heading changes only the selected line', () => {
    expect(run(setHeading(1), DOC, 0, end)).toBe('# Привет\nЭто круто\nЭто нет');
  });

  it('list prefixes and quote change only the selected line', () => {
    expect(run(toggleLinePrefix('bullet'), DOC, 0, end)).toBe('- Привет\nЭто круто\nЭто нет');
    expect(run(toggleLinePrefix('ordered'), DOC, 0, end)).toBe('1. Привет\nЭто круто\nЭто нет');
    expect(run(toggleLinePrefix('task'), DOC, 0, end)).toBe('- [ ] Привет\nЭто круто\nЭто нет');
    expect(run(toggleLinePrefix('quote'), DOC, 0, end)).toBe('> Привет\nЭто круто\nЭто нет');
  });

  it('works for a backwards selection too', () => {
    expect(run(setHeading(1), DOC, end, 0)).toBe('# Привет\nЭто круто\nЭто нет');
  });

  it('does not touch an empty line below', () => {
    expect(run(setHeading(1), 'Привет\n\nEnd', 0, end)).toBe('# Привет\n\nEnd');
  });

  it('insertBlock wraps only the selected line', () => {
    expect(run(insertCodeBlock, DOC, 0, end)).toBe('```\nПривет\n```\n\nЭто круто\nЭто нет');
  });
});

describe('other selections are unchanged', () => {
  it('selection ending mid-line affects every touched line', () => {
    expect(run(setHeading(2), DOC, 2, 'Привет\nЭто'.length)).toBe('## Привет\n## Это круто\nЭто нет');
    expect(run(toggleLinePrefix('bullet'), DOC, 0, 'Привет\nЭто'.length)).toBe('- Привет\n- Это круто\nЭто нет');
  });

  it('selection spanning to the start of a later line excludes that line only', () => {
    expect(run(setHeading(1), DOC, 0, 'Привет\nЭто круто\n'.length)).toBe('# Привет\n# Это круто\nЭто нет');
  });

  it('empty selection (cursor) affects the current line', () => {
    expect(run(setHeading(1), DOC, 3)).toBe('# Привет\nЭто круто\nЭто нет');
    expect(run(setHeading(1), DOC, 'Привет\n'.length)).toBe('Привет\n# Это круто\nЭто нет');
    expect(run(toggleLinePrefix('quote'), DOC, 0)).toBe('> Привет\nЭто круто\nЭто нет');
  });

  it('selection to the very end of the document affects the last line', () => {
    expect(run(setHeading(1), DOC, 0, DOC.length)).toBe('# Привет\n# Это круто\n# Это нет');
    expect(run(setHeading(1), 'a\nb\n', 0, 'a\nb\n'.length)).toBe('# a\n# b\n');
  });

  it('selection that fully covers a trailing empty line still selects the text lines', () => {
    expect(run(setHeading(1), 'a\n', 0, 2)).toBe('# a\n');
  });
});
