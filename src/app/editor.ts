// CodeMirror 6 editor with one EditorState per open document (keeps undo history per tab).
import { EditorState, Compartment, type Extension } from '@codemirror/state';
import {
  EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter, drawSelection,
  dropCursor, placeholder, rectangularSelection, crosshairCursor,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { searchKeymap, highlightSelectionMatches, search } from '@codemirror/search';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { syntaxHighlighting, HighlightStyle, bracketMatching, indentOnInput } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { wrapInline, insertLink } from './commands';

const mdHighlight = HighlightStyle.define([
  { tag: t.heading1, fontWeight: '700', fontSize: '1.3em', color: 'var(--cm-heading)' },
  { tag: t.heading2, fontWeight: '700', fontSize: '1.18em', color: 'var(--cm-heading)' },
  { tag: t.heading3, fontWeight: '700', fontSize: '1.08em', color: 'var(--cm-heading)' },
  { tag: [t.heading4, t.heading5, t.heading6], fontWeight: '700', color: 'var(--cm-heading)' },
  { tag: t.strong, fontWeight: '700' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: [t.link, t.url], color: 'var(--cm-link)' },
  { tag: t.monospace, fontFamily: 'var(--font-mono)', color: 'var(--cm-code)' },
  { tag: [t.processingInstruction, t.meta, t.contentSeparator], color: 'var(--cm-muted)' },
  { tag: t.quote, color: 'var(--cm-quote)', fontStyle: 'italic' },
  { tag: [t.keyword, t.operatorKeyword, t.modifier], color: 'var(--cm-keyword)' },
  { tag: [t.string, t.special(t.string)], color: 'var(--cm-string)' },
  { tag: [t.number, t.bool, t.atom], color: 'var(--cm-number)' },
  { tag: [t.comment, t.lineComment, t.blockComment], color: 'var(--cm-muted)', fontStyle: 'italic' },
  { tag: [t.function(t.variableName), t.definition(t.variableName)], color: 'var(--cm-function)' },
  { tag: [t.typeName, t.className, t.tagName], color: 'var(--cm-type)' },
  { tag: [t.attributeName, t.propertyName], color: 'var(--cm-attr)' },
]);

const baseTheme = EditorView.theme({
  '&': { height: '100%', fontSize: 'var(--editor-font-size)', backgroundColor: 'var(--bg-editor)', color: 'var(--text)' },
  '.cm-scroller': { fontFamily: 'var(--font-mono)', lineHeight: '1.6' },
  '.cm-content': { padding: '16px 0', caretColor: 'var(--accent)' },
  '.cm-line': { padding: '0 20px' },
  '.cm-gutters': { backgroundColor: 'var(--bg-editor)', color: 'var(--text-faint)', border: 'none' },
  '.cm-activeLine': { backgroundColor: 'var(--cm-active-line)' },
  '.cm-activeLineGutter': { backgroundColor: 'var(--cm-active-line)' },
  '&.cm-focused': { outline: 'none' },
  '.cm-cursor': { borderLeftColor: 'var(--accent)', borderLeftWidth: '2px' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: 'var(--cm-selection) !important' },
  '.cm-selectionMatch': { backgroundColor: 'var(--cm-match)' },
  '.cm-placeholder': { color: 'var(--text-faint)' },
  '.cm-panels': { backgroundColor: 'var(--bg-panel)', color: 'var(--text)' },
  '.cm-panels.cm-panels-top': { borderBottom: '1px solid var(--border)' },
  '.cm-searchMatch': { backgroundColor: 'var(--cm-match)', outline: '1px solid var(--accent-soft)' },
  '.cm-searchMatch.cm-searchMatch-selected': { backgroundColor: 'var(--accent-soft)' },
  '.cm-textfield, .cm-button': { fontSize: '13px' },
});

export interface EditorOptions {
  parent: HTMLElement;
  onChange(text: string): void;
  onScroll(): void;
  onSave(): void;
}

export class Editor {
  readonly view: EditorView;
  private lineNumbersC = new Compartment();
  private wrapC = new Compartment();
  private showLineNumbers = false;
  private wrap = true;
  private states = new Map<string, EditorState>();
  private currentId: string | null = null;

  constructor(private opts: EditorOptions) {
    this.view = new EditorView({ parent: opts.parent, state: this.createState('') });
    this.view.scrollDOM.addEventListener('scroll', () => this.opts.onScroll(), { passive: true });
  }

  private extensions(): Extension[] {
    return [
      history(),
      drawSelection(),
      dropCursor(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      highlightSelectionMatches(),
      indentOnInput(),
      bracketMatching(),
      search({ top: true }),
      EditorState.allowMultipleSelections.of(true),
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      syntaxHighlighting(mdHighlight),
      baseTheme,
      placeholder('Start writing Markdown or drop files here…'),
      this.lineNumbersC.of(this.showLineNumbers ? lineNumbers() : []),
      this.wrapC.of(this.wrap ? EditorView.lineWrapping : []),
      keymap.of([
        { key: 'Mod-b', run: wrapInline('**'), preventDefault: true },
        { key: 'Mod-i', run: wrapInline('*'), preventDefault: true },
        { key: 'Mod-k', run: insertLink(), preventDefault: true },
        { key: 'Mod-s', run: () => (this.opts.onSave(), true), preventDefault: true },
        ...searchKeymap,
        ...historyKeymap,
        ...defaultKeymap,
        indentWithTab,
      ]),
      EditorView.updateListener.of((u) => {
        if (u.docChanged) this.opts.onChange(u.state.doc.toString());
      }),
      EditorView.contentAttributes.of({ 'aria-label': 'Markdown editor', spellcheck: 'true' }),
    ];
  }

  private createState(text: string): EditorState {
    return EditorState.create({ doc: text, extensions: this.extensions() });
  }

  /** Shows the document `id`, creating its editor state on first use. */
  open(id: string, text: string): void {
    if (this.currentId === id) return;
    if (this.currentId) this.states.set(this.currentId, this.view.state);
    const state = this.states.get(id) ?? this.createState(text);
    this.currentId = id;
    this.view.setState(state);
    // Stored states may carry an older configuration of the toggles.
    this.view.dispatch({
      effects: [
        this.lineNumbersC.reconfigure(this.showLineNumbers ? lineNumbers() : []),
        this.wrapC.reconfigure(this.wrap ? EditorView.lineWrapping : []),
      ],
    });
  }

  /** Replaces a document's content with a fresh state (used when a file replaces an untouched tab). */
  reset(id: string, text: string): void {
    this.states.delete(id);
    if (this.currentId === id) {
      this.currentId = null;
      this.open(id, text);
    }
  }

  forget(id: string): void {
    this.states.delete(id);
    if (this.currentId === id) this.currentId = null;
  }

  forgetAll(): void {
    this.states.clear();
    this.currentId = null;
  }

  get text(): string {
    return this.view.state.doc.toString();
  }

  setLineNumbers(on: boolean): void {
    this.showLineNumbers = on;
    this.view.dispatch({ effects: this.lineNumbersC.reconfigure(on ? lineNumbers() : []) });
  }

  setWrap(on: boolean): void {
    this.wrap = on;
    this.view.dispatch({ effects: this.wrapC.reconfigure(on ? EditorView.lineWrapping : []) });
  }

  /** 0-based source line at the top of the editor viewport (fractional). */
  topLine(): number {
    const scroller = this.view.scrollDOM;
    const top = scroller.scrollTop;
    if (top <= 0) return 0;
    if (top + scroller.clientHeight >= scroller.scrollHeight - 2) return this.view.state.doc.lines;
    const block = this.view.lineBlockAtHeight(top);
    const line = this.view.state.doc.lineAt(block.from).number - 1;
    return line + (block.height ? (top - block.top) / block.height : 0);
  }

  scrollToLine(line: number): void {
    const doc = this.view.state.doc;
    const scroller = this.view.scrollDOM;
    if (line >= doc.lines) {
      scroller.scrollTop = scroller.scrollHeight;
      return;
    }
    const whole = Math.max(0, Math.floor(line));
    const block = this.view.lineBlockAt(doc.line(whole + 1).from);
    scroller.scrollTop = block.top + (line - whole) * block.height;
  }

  focus(): void {
    this.view.focus();
  }
}
