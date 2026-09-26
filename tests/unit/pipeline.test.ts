import { describe, expect, it } from 'vitest';
import { renderDocument, type LocalAsset, type Protection, type RenderContext } from '../../src/markdown/pipeline';

const FULL: Protection = { links: false, images: false, media: false };
const OPEN: Protection = { links: true, images: true, media: true };

const localAssets: Record<string, LocalAsset> = {
  'img/cat.png': { name: 'cat.png', url: 'blob:http://localhost/cat', verdict: { risk: 'ok', reasons: [], detected: 'png' } },
  'evil.jpg': { name: 'evil.jpg', url: 'blob:http://localhost/evil', verdict: { risk: 'danger', reasons: ['exe'], detected: 'exe' } },
  'song.mp3': { name: 'song.mp3', url: 'blob:http://localhost/song', verdict: { risk: 'ok', reasons: [], detected: 'mp3' } },
};

function ctx(protection: Protection): RenderContext {
  return {
    docPath: 'readme.md',
    protection,
    theme: 'light',
    resolveAsset: (ref) => localAssets[ref] ?? null,
    resolveDoc: (ref) => (ref === 'other.md' ? 'doc-2' : null),
  };
}

const render = async (md: string, protection = FULL) => {
  const r = await renderDocument(md, ctx(protection));
  const doc = new DOMParser().parseFromString(`<body>${r.html}</body>`, 'text/html');
  return { ...r, doc };
};

describe('full protection', () => {
  it('replaces external images with a placeholder and never keeps their URL as src', async () => {
    const { doc, html, stats } = await render('![x](https://example.com/a.png)');
    expect(doc.querySelector('img')).toBeNull();
    expect(doc.querySelector('.media-placeholder.mp-blocked')).not.toBeNull();
    expect(html).not.toMatch(/src="https:/);
    expect(stats.blocked).toBe(1);
  });

  it('disables external links', async () => {
    const { doc } = await render('[site](https://example.com)');
    expect(doc.querySelector('a')).toBeNull();
    expect(doc.querySelector('.link-disabled')?.textContent).toBe('site');
  });

  it('blocks external audio and video in raw HTML', async () => {
    const { doc } = await render('<video src="https://example.com/v.mp4" autoplay></video>\n\n<audio><source src="https://example.com/a.mp3"></audio>');
    expect(doc.querySelector('video, audio')).toBeNull();
    expect(doc.querySelectorAll('.media-placeholder').length).toBe(2);
  });

  it('shows local files dropped with the document', async () => {
    const { doc } = await render('![cat](img/cat.png)\n\n![song](song.mp3)');
    expect(doc.querySelector('img')?.getAttribute('src')).toBe('blob:http://localhost/cat');
    const audio = doc.querySelector('audio');
    expect(audio?.getAttribute('src')).toBe('blob:http://localhost/song');
    expect(audio?.hasAttribute('controls')).toBe(true);
  });

  it('reports missing local files', async () => {
    const { doc, stats } = await render('![x](img/missing.png)');
    expect(doc.querySelector('.mp-missing')).not.toBeNull();
    expect(stats.missing).toBe(1);
  });

  it('blocks local files whose content is dangerous', async () => {
    const { doc, stats } = await render('![x](evil.jpg)');
    expect(doc.querySelector('img')).toBeNull();
    expect(doc.querySelector('.mp-danger')).not.toBeNull();
    expect(stats.dangers).toBe(1);
  });

  it('keeps in-document anchors and links other open documents', async () => {
    const { doc } = await render('# Раздел\n\n[к разделу](#раздел) [другой](other.md#x)');
    const links = doc.querySelectorAll('a');
    expect(links[0].getAttribute('href')).toBe('#%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB');
    expect(links[1].getAttribute('data-doc')).toBe('doc-2');
    expect(links[1].getAttribute('data-hash')).toBe('x');
    expect(doc.getElementById('раздел')).not.toBeNull();
  });
});

describe('permissions', () => {
  it('loads external images without referrer when allowed', async () => {
    const { doc } = await render('![x](https://example.com/a.png)', { ...FULL, images: true });
    const img = doc.querySelector('img')!;
    expect(img.getAttribute('src')).toBe('https://example.com/a.png');
    expect(img.getAttribute('referrerpolicy')).toBe('no-referrer');
  });

  it('keeps video blocked when only images are allowed', async () => {
    const { doc } = await render('![v](https://example.com/v.mp4)', { ...FULL, images: true });
    expect(doc.querySelector('video')).toBeNull();
  });

  it('still blocks dangerous sources when everything is allowed', async () => {
    const { doc } = await render('![r](http://192.168.1.1/a.png)\n\n[p](https://bank.com@evil.example/)', OPEN);
    expect(doc.querySelector('img')).toBeNull();
    expect(doc.querySelector('a')).toBeNull();
    expect(doc.querySelectorAll('.risk-danger').length).toBeGreaterThan(0);
  });

  it('marks suspicious links for confirmation', async () => {
    const { doc } = await render('[https://bank.example.com](https://bank-example.xyz/login)', OPEN);
    const a = doc.querySelector('a')!;
    expect(a.getAttribute('data-risk')).toBe('warn');
    expect(a.getAttribute('data-external')).toBe('1');
    expect(doc.querySelector('.risk-warn')).not.toBeNull();
  });

  it('removes autoplay from allowed media', async () => {
    const { doc } = await render('<video src="https://example.com/v.mp4" autoplay></video>', OPEN);
    const v = doc.querySelector('video')!;
    expect(v.hasAttribute('autoplay')).toBe(false);
    expect(v.hasAttribute('controls')).toBe(true);
  });
});

describe('sanitising', () => {
  const vectors = [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    '<a href="javascript:alert(1)">x</a>',
    '[x](javascript:alert(1))',
    '<iframe src="https://evil.example"></iframe>',
    '<object data="x.swf"></object>',
    '<svg onload=alert(1)><circle/></svg>',
    '<math><mi xlink:href="javascript:alert(1)">x</mi></math>',
    '<form action="https://evil.example"><input name=p></form>',
    '<style>body{background:url(https://evil.example/x)}</style>',
    '<p style="background:url(https://evil.example/x)">x</p>',
    '<img srcset="https://evil.example/x.png 1x">',
    '<base href="https://evil.example/">',
    '<meta http-equiv="refresh" content="0;url=https://evil.example">',
    '<link rel=stylesheet href="https://evil.example/x.css">',
    '<details open ontoggle=alert(1)>',
    '<a href="https://evil.example" ping="https://evil.example/p">x</a>',
    '<video poster="https://evil.example/p.png" src="x.mp4"></video>',
  ];

  // URLs may still appear as visible text (placeholders, tooltips); what matters is
  // that no element can execute code or make the browser fetch or navigate anywhere.
  it.each(vectors)('neutralises %s', async (vector) => {
    for (const protection of [FULL, OPEN]) {
      const { doc } = await render(vector, protection);
      expect(doc.querySelector('script, iframe, object, embed, form, style, base, meta, link, svg')).toBeNull();
      for (const el of doc.body.querySelectorAll('*')) {
        for (const attr of el.attributes) {
          expect(attr.name).not.toMatch(/^on|^style$|^srcset$|^ping$|^formaction$|^background$/i);
          if (['src', 'href', 'poster', 'xlink:href', 'action', 'data'].includes(attr.name)) {
            expect(attr.value).not.toMatch(/^\s*(javascript|vbscript|data:text)/i);
            if (protection === FULL) expect(attr.value).not.toMatch(/evil/);
          }
        }
      }
    }
  });

  it('converts table alignment to classes (no inline styles)', async () => {
    const { html } = await render('| a | b |\n| :-: | --: |\n| 1 | 2 |');
    expect(html).toContain('class="align-center"');
    expect(html).not.toContain('style=');
  });

  it('adds source line numbers for scroll sync', async () => {
    const { doc } = await render('# a\n\ntext\n\n- item');
    expect(doc.querySelector('h1')?.getAttribute('data-line')).toBe('0');
    expect(doc.querySelector('p')?.getAttribute('data-line')).toBe('2');
  });

  it('renders math as MathML', async () => {
    const { doc } = await render('Inline $a^2$ and\n\n$$\n\\frac{1}{2}\n$$');
    expect(doc.querySelectorAll('math').length).toBe(2);
  });
});
