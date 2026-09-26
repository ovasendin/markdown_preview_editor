// $inline$ and $$display$$ math. The renderer only emits placeholders holding
// the TeX source; KaTeX is loaded lazily and fills them in later.
import type { MarkdownIt, StateInline, StateBlock } from 'markdown-it';

function mathInline(state: StateInline, silent: boolean): boolean {
  const src = state.src;
  const start = state.pos;
  if (src[start] !== '$' || src[start + 1] === '$') return false;
  const next = src[start + 1];
  if (!next || /\s/.test(next)) return false;
  let end = start + 1;
  while ((end = src.indexOf('$', end)) !== -1) {
    if (src[end - 1] === '\\') { end++; continue; }
    // Pandoc rule: no space before the closing $ and no digit right after it.
    if (/\s/.test(src[end - 1]) || /\d/.test(src[end + 1] ?? '')) { end++; continue; }
    break;
  }
  if (end === -1 || end === start + 1) return false;
  if (!silent) {
    const token = state.push('math_inline', 'span', 0);
    token.content = src.slice(start + 1, end);
    token.markup = '$';
  }
  state.pos = end + 1;
  return true;
}

function mathBlock(state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (state.sCount[startLine] - state.blkIndent >= 4) return false;
  if (state.src.slice(pos, pos + 2) !== '$$') return false;
  if (silent) return true;

  let firstLine = state.src.slice(pos + 2, max);
  let content = '';
  let line = startLine;
  let closed = false;
  if (firstLine.trim().endsWith('$$')) {
    content = firstLine.trim().slice(0, -2);
    closed = true;
  } else {
    const lines: string[] = [firstLine];
    for (line = startLine + 1; line < endLine; line++) {
      pos = state.bMarks[line] + state.tShift[line];
      max = state.eMarks[line];
      if (pos < max && state.sCount[line] < state.blkIndent) break;
      const text = state.src.slice(pos, max);
      if (text.trim().endsWith('$$')) {
        lines.push(text.trim().slice(0, -2));
        closed = true;
        break;
      }
      lines.push(state.src.slice(state.bMarks[line], max));
    }
    content = lines.join('\n');
  }
  state.line = (closed ? line : line - 1) + 1;
  const token = state.push('math_block', 'div', 0);
  token.block = true;
  token.content = content.trim();
  token.map = [startLine, state.line];
  token.markup = '$$';
  return true;
}

export function mathPlugin(md: MarkdownIt): void {
  md.inline.ruler.after('escape', 'math_inline', mathInline);
  md.block.ruler.after('blockquote', 'math_block', mathBlock, { alt: ['paragraph', 'reference', 'blockquote', 'list'] });
  const esc = md.utils.escapeHtml;
  md.renderer.rules.math_inline = (tokens, idx) =>
    `<span class="math math-inline" data-tex="${esc(tokens[idx].content)}">${esc(tokens[idx].content)}</span>`;
  md.renderer.rules.math_block = (tokens, idx) => {
    const t = tokens[idx];
    return `<div class="math math-display" data-line="${t.map?.[0] ?? ''}" data-tex="${esc(t.content)}">${esc(t.content)}</div>\n`;
  };
}
