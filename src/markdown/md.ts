// Markdown → HTML string. Everything produced here is still untrusted and is
// sanitised afterwards (see pipeline.ts).
import MarkdownItFactory, { type MarkdownIt } from 'markdown-it';
import footnote from 'markdown-it-footnote';
import taskLists from 'markdown-it-task-lists';
import mark from 'markdown-it-mark';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';
import { full as emoji } from 'markdown-it-emoji';
import alerts from 'markdown-it-github-alerts';
import frontMatter from 'markdown-it-front-matter';
import hljs from 'highlight.js/lib/common';
import { mathPlugin } from './math';
import { SlugRegistry } from './slug';

const md: MarkdownIt = new MarkdownItFactory({
  html: true,
  linkify: true,
  typographer: false,
  breaks: false,
  highlight(code, lang) {
    const language = lang?.trim().toLowerCase();
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(code, { language, ignoreIllegals: true }).value;
      } catch {
        /* fall through to plain text */
      }
    }
    return '';
  },
});

md.use(footnote)
  .use(taskLists, { enabled: false, label: true })
  .use(mark)
  .use(sub)
  .use(sup)
  .use(emoji)
  .use(alerts, {
    icons: { note: '', tip: '', important: '', warning: '', caution: '' },
    titles: { note: 'Note', tip: 'Tip', important: 'Important', warning: 'Warning', caution: 'Caution' },
  })
  .use(frontMatter, () => {})
  .use(mathPlugin);

md.linkify.set({ fuzzyEmail: false });

const esc = md.utils.escapeHtml;

md.renderer.rules.front_matter = (tokens, idx) =>
  `<details class="front-matter" data-line="0"><summary>Front matter</summary><pre><code class="language-yaml">${esc(String(tokens[idx].meta ?? ''))}</code></pre></details>\n`;

// Mermaid blocks become placeholders; the pipeline renders them into images.
const defaultFence = md.renderer.rules.fence!;
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const lang = token.info.trim().split(/\s+/)[0].toLowerCase();
  const line = token.map?.[0] ?? '';
  if (lang === 'mermaid') {
    return `<div class="mermaid-block" data-line="${line}"><pre class="mermaid-src">${esc(token.content)}</pre></div>\n`;
  }
  if (lang === 'math' || lang === 'latex' || lang === 'tex') {
    return `<div class="math math-display" data-line="${line}" data-tex="${esc(token.content)}">${esc(token.content)}</div>\n`;
  }
  return defaultFence(tokens, idx, options, env, self);
};

// Source line numbers on block elements drive scroll synchronisation;
// heading ids make #anchors and the table of contents work.
md.core.ruler.push('annotate', (state) => {
  const slugs = new SlugRegistry();
  for (let i = 0; i < state.tokens.length; i++) {
    const token = state.tokens[i];
    if (token.map && token.nesting !== -1 && token.block) {
      token.attrSet('data-line', String(token.map[0]));
    }
    if (token.type === 'heading_open') {
      const inline = state.tokens[i + 1];
      token.attrSet('id', slugs.next(inline?.content ?? ''));
    }
    // Inline styles are forbidden by the preview's security policy, so table
    // alignment is expressed with classes instead.
    if (token.type === 'th_open' || token.type === 'td_open') {
      const style = token.attrGet('style');
      const align = String(style ?? '').match(/text-align:(left|right|center)/)?.[1];
      if (style) {
        token.attrs = (token.attrs ?? []).filter(([name]) => name !== 'style');
        if (align) token.attrJoin('class', `align-${align}`);
      }
    }
  }
});

export function renderMarkdownToHtml(source: string): string {
  return md.render(source, {});
}
