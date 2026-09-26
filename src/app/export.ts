// Standalone HTML export: one file with inline styles, embedded local media
// and its own strict Content-Security-Policy. Loaded only when used.
import mdLight from 'github-markdown-css/github-markdown-light.css?raw';
import mdDark from 'github-markdown-css/github-markdown-dark.css?raw';
import hlLight from 'highlight.js/styles/github.min.css?raw';
import hlDark from 'highlight.js/styles/github-dark.min.css?raw';
import previewCss from '../styles/preview.css?raw';
import { sanitizeForExport, type Protection } from '../markdown/pipeline';

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function buildStandaloneHtml(
  title: string,
  contentHtml: string,
  theme: 'light' | 'dark',
  protection: Protection,
  inlineBlob: (url: string) => Promise<string | null>,
): Promise<string> {
  const doc = new DOMParser().parseFromString(`<!doctype html><body>${contentHtml}</body>`, 'text/html');

  for (const el of doc.querySelectorAll<HTMLElement>('[src^="blob:"], [poster^="blob:"]')) {
    for (const attr of ['src', 'poster']) {
      const value = el.getAttribute(attr);
      if (!value?.startsWith('blob:')) continue;
      const data = await inlineBlob(value);
      if (data) el.setAttribute(attr, data);
      else el.removeAttribute(attr);
    }
  }
  // Links to other open documents cannot work in a single file.
  for (const a of doc.querySelectorAll('a[data-doc]')) {
    const span = doc.createElement('span');
    span.append(...a.childNodes);
    a.replaceWith(span);
  }

  const body = sanitizeForExport(doc.body.innerHTML);
  const csp = [
    "default-src 'none'",
    "style-src 'unsafe-inline'",
    `img-src data:${protection.images ? ' https:' : ''}`,
    `media-src data:${protection.media ? ' https:' : ''}`,
    "base-uri 'none'",
    "form-action 'none'",
  ].join('; ');
  const dark = theme === 'dark';

  return `<!doctype html>
<html lang="en" data-theme="${theme}">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="referrer" content="no-referrer">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="generator" content="Markdown Preview Editor">
<title>${escapeHtml(title)}</title>
<style>
${dark ? mdDark : mdLight}
${dark ? hlDark : hlLight}
${previewCss}
</style>
</head>
<body>
<article class="markdown-body">
${body}
</article>
</body>
</html>
`;
}
