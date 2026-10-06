import { test, expect } from '@playwright/test';
import { openApp, openDoc, preview, dropFiles, editorText, PNG_1PX } from './helpers';

test('drag and drop: several documents open in tabs, images dropped alongside are shown', async ({ page }) => {
  await openApp(page);
  await dropFiles(page, '.cm-content', [
    { name: 'one.md', content: '# Первый\n\n![кот](img/cat.png)\n\n[второй](two.md)' },
    { name: 'two.md', content: '# Второй' },
    { name: 'cat.png', content: PNG_1PX, base64: true, type: 'image/png' },
    { name: 'notes.pdf', content: '%PDF-1.4' },
  ]);
  // The untouched welcome tab is replaced by the opened files.
  await expect(page.locator('.tab')).toHaveCount(2);
  await expect(page.locator('.tab.active .tab-name')).toHaveText('one.md');
  await expect(page.locator('.toast').last()).toContainText('skipped: 1 (notes.pdf)');

  const img = preview(page).locator('img[alt="кот"]');
  await expect(img).toBeVisible();
  expect(await img.getAttribute('src')).toMatch(/^blob:/);
  expect(await img.evaluate((i: HTMLImageElement) => i.naturalWidth)).toBe(1);

  // A link to another open document switches tabs.
  await preview(page).locator('a.doc-link').click();
  await expect(page.locator('.tab.active .tab-name')).toHaveText('two.md');
  await expect(preview(page).locator('h1')).toHaveText('Второй');
});

test('drop overlay covers the whole editor part of the window', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => {
    const dt = new DataTransfer();
    dt.items.add(new File(['x'], 'a.md'));
    document.querySelector('.toolbar')!.dispatchEvent(new DragEvent('dragenter', { bubbles: true, cancelable: true, dataTransfer: dt }));
  });
  const overlay = page.locator('#drop-overlay');
  await expect(overlay).toBeVisible();
  const pane = await page.locator('#editor-pane').boundingBox();
  const box = await overlay.boundingBox();
  expect(box).toEqual(pane);
});

test('dropping only an image inserts a reference at the cursor', async ({ page }) => {
  await openApp(page);
  await openDoc(page, 'Текст');
  await page.locator('.cm-content').click();
  await page.keyboard.press('Control+End');
  await dropFiles(page, '.cm-content', [{ name: 'photo one.png', content: PNG_1PX, base64: true, type: 'image/png' }]);
  await expect.poll(() => editorText(page)).toContain('![photo one](<photo one.png>)');
  await expect(preview(page).locator('img[alt="photo one"]')).toBeVisible();
});

test('Windows-1251 files are decoded correctly', async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => {
    const dt = new DataTransfer();
    // "# Привет" in Windows-1251
    dt.items.add(new File([new Uint8Array([0x23, 0x20, 0xcf, 0xf0, 0xe8, 0xe2, 0xe5, 0xf2])], 'old.md'));
    const t = document.querySelector('.cm-content')!;
    for (const type of ['dragenter', 'dragover', 'drop']) t.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt }));
  });
  await expect(preview(page).locator('h1')).toHaveText('Привет');
  await expect(page.locator('#status-encoding')).toHaveText('Windows-1251');
});

test('toolbar formats the selection', async ({ page }) => {
  await openApp(page);
  await openDoc(page, 'hello');
  await page.locator('.cm-content').click();
  await page.keyboard.press('Control+A');
  await page.getByRole('button', { name: 'Bold (Ctrl+B)' }).click();
  expect(await editorText(page)).toBe('**hello**');
  await page.getByRole('button', { name: 'Bold (Ctrl+B)' }).click();
  expect(await editorText(page)).toBe('hello');

  await page.keyboard.press('Control+A');
  await page.getByRole('button', { name: 'Bulleted list' }).click();
  expect(await editorText(page)).toBe('- hello');
  await page.getByRole('button', { name: 'Numbered list' }).click();
  expect(await editorText(page)).toBe('1. hello');

  await page.getByRole('button', { name: 'Heading', exact: true }).click();
  await page.getByRole('menuitem', { name: 'Heading 2' }).click();
  expect(await editorText(page)).toBe('## 1. hello');
  await expect(preview(page).locator('h2')).toBeVisible();
});

test('advanced editor is collapsed by default and holds the extra tools', async ({ page }) => {
  await openApp(page);
  await expect(page.locator('#toolbar-advanced')).toBeHidden();
  await page.locator('.tool-advanced-toggle').click();
  await expect(page.locator('#toolbar-advanced')).toBeVisible();
  for (const name of ['Footnote', 'Mermaid diagram', 'Math formula', 'Table of contents', 'Find and replace (Ctrl+F)', 'Line numbers']) {
    await expect(page.locator('#toolbar-advanced').getByRole('button', { name })).toBeVisible();
  }
  await openDoc(page, '# A\n\n## B\n');
  await page.locator('.cm-content').click();
  await page.keyboard.press('Control+Home');
  await page.locator('#toolbar-advanced').getByRole('button', { name: 'Table of contents' }).click();
  expect(await editorText(page)).toContain('- [A](#a)\n  - [B](#b)');
  await preview(page).locator('a[href="#b"]').click();
});

test('save downloads the document', async ({ page }) => {
  await openApp(page);
  await openDoc(page, '# saved', [], 'note.md');
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Save' }).click()]);
  expect(download.suggestedFilename()).toBe('note.md');
  const content = await (await download.createReadStream()).toArray();
  expect(Buffer.concat(content).toString('utf8')).toBe('# saved');
});

test('HTML export is self-contained and strict', async ({ page }) => {
  await openApp(page);
  await openDoc(page, '# Экспорт\n\n![p](p.png)', [{ name: 'p.png', content: PNG_1PX, base64: true, type: 'image/png' }]);
  await expect(preview(page).locator('img[alt="p"]')).toBeVisible();
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'HTML' }).click()]);
  const html = Buffer.concat(await (await download.createReadStream()).toArray()).toString('utf8');
  expect(html).toContain('<h1');
  expect(html).toContain('Content-Security-Policy');
  expect(html).toContain('src="data:image/png;base64,');
  expect(html).not.toContain('blob:');
  expect(html).not.toMatch(/<script/i);
});

test('screenshots for visual review', async ({ page }, info) => {
  await openApp(page);
  await page.waitForTimeout(800);
  await page.screenshot({ path: info.outputPath('light.png') });
  await page.locator('#theme-btn').click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: info.outputPath('dark.png') });
  await page.locator('#protection-btn').click();
  await page.screenshot({ path: info.outputPath('protection-panel.png') });
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 390, height: 800 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: info.outputPath('mobile.png') });
});

test('scroll sync follows the editor', async ({ page }) => {
  await openApp(page);
  const long = Array.from({ length: 120 }, (_, i) => `## Раздел ${i}\n\nТекст абзаца номер ${i}.\n`).join('\n');
  await openDoc(page, long);
  await expect(preview(page).locator('h2').nth(119)).toBeAttached();
  await page.locator('.cm-scroller').evaluate((el) => (el.scrollTop = el.scrollHeight / 2));
  await page.waitForTimeout(400);
  // The heading at the top of the preview should be close to the editor's top line.
  const editorTop = await page.evaluate(() => {
    const scroller = document.querySelector('.cm-scroller')!;
    const top = scroller.getBoundingClientRect().top;
    const line = [...document.querySelectorAll('.cm-line')].find((l) => l.getBoundingClientRect().bottom > top + 1 && l.textContent);
    return line?.textContent ?? '';
  });
  const previewTop = await page.evaluate(() => {
    const doc = (document.querySelector('.preview-frame') as HTMLIFrameElement).contentDocument!;
    const h = [...doc.querySelectorAll('h2')].find((e) => e.getBoundingClientRect().bottom > 0);
    return h?.textContent ?? '';
  });
  const n = (s: string) => Number(s.match(/\d+/)?.[0] ?? -1);
  expect(Math.abs(n(editorTop) - n(previewTop))).toBeLessThanOrEqual(1);
});

test.describe('languages', () => {
  test.use({ locale: 'de-DE' });

  test('detects the browser language, loads it lazily and can switch languages', async ({ page }) => {
    const chunks: string[] = [];
    page.on('request', (r) => chunks.push(r.url()));
    await page.goto('/');
    await expect(page.locator('#protection-btn')).toContainText('Vollständiger Schutz');
    await expect(page.locator('.tab.active .tab-name')).toHaveText('Willkommen.md');
    await expect(preview(page).locator('h2').first()).toHaveText('Funktionen');
    expect(chunks.some((u) => /\/assets\/de-[\w-]+\.js$/.test(u))).toBe(true);
    expect(chunks.some((u) => /\/assets\/ja-[\w-]+\.js$/.test(u))).toBe(false);
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('de');

    await page.locator('#settings-btn').click();
    await page.locator('#set-lang').selectOption('ja');
    await expect(page.locator('#protection-btn')).toContainText('完全保護');
    await expect(page.getByRole('button', { name: '太字 (Ctrl+B)' })).toBeVisible();
    // The untouched welcome document follows the language.
    await expect(page.locator('.tab.active .tab-name')).toHaveText('ようこそ.md');
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('ja');

    // The choice is remembered across reloads.
    await page.reload();
    await expect(page.locator('#protection-btn')).toContainText('完全保護');

    await page.locator('#settings-btn').click();
    await page.locator('#set-lang').selectOption('');
    await expect(page.locator('#protection-btn')).toContainText('Vollständiger Schutz');
    for (const u of chunks) expect(u.startsWith(`${new URL(page.url()).origin}/`)).toBe(true);
  });

  test('switching language keeps edited documents intact', async ({ page }) => {
    await page.goto('/');
    await openDoc(page, '# Mein Text', [], 'notiz.md');
    await page.locator('#settings-btn').click();
    await page.locator('#set-lang').selectOption('fr');
    await expect(page.locator('#protection-btn')).toContainText('Protection totale');
    await expect(page.locator('.tab.active .tab-name')).toHaveText('notiz.md');
    expect(await editorText(page)).toBe('# Mein Text');
  });
});

test.describe('phone layout', () => {
  test.use({ viewport: { width: 390, height: 800 }, locale: 'en-US' });

  test('keeps Open and view modes in the header, moves the rest into a menu', async ({ page }) => {
    await openApp(page);
    await expect(page.getByRole('button', { name: 'Open', exact: true })).toBeVisible();
    await expect(page.locator('#view-mode button')).toHaveCount(3);
    for (const id of ['#protection-btn', '#theme-btn', '#settings-btn']) await expect(page.locator(id)).toBeHidden();
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeHidden();

    await page.locator('#menu-btn').click();
    const menu = page.locator('#mobile-menu');
    for (const label of ['Open folder', 'Save as .md', 'Export to HTML', 'Print / save as PDF', 'Full protection', 'Settings']) {
      await expect(menu.getByRole('menuitem', { name: label })).toBeVisible();
    }
    await menu.getByRole('menuitem', { name: 'Full protection' }).click();
    await expect(page.locator('#protection-panel')).toBeVisible();
    await expect(menu).toBeHidden();
  });

  test('formatting toolbar and advanced row are two nested spoilers', async ({ page }) => {
    await openApp(page);
    await expect(page.locator('#toolbar')).toBeHidden();
    await page.locator('#toolbar-toggle').click();
    await expect(page.locator('#toolbar')).toBeVisible();
    await expect(page.locator('#toolbar-advanced')).toBeHidden();
    await page.locator('.tool-advanced-toggle').click();
    await expect(page.locator('#toolbar-advanced')).toBeVisible();
    await page.locator('#toolbar-toggle').click();
    await expect(page.locator('#toolbar, #toolbar-advanced')).toHaveCount(2);
    await expect(page.locator('#toolbar')).toBeHidden();
    await expect(page.locator('#toolbar-advanced')).toBeHidden();
  });
});

test('?theme=dark from a link opens the dark theme for this tab without overriding a saved choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/?theme=dark');
  await expect(preview(page).locator('#content h1')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(page.url()).not.toContain('theme=');
  // Survives a reload in the same tab.
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  // A theme picked by the user wins.
  await page.locator('#theme-btn').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.goto('/?theme=dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('printing from the dark theme uses the light theme on paper and restores dark afterwards', async ({ page }) => {
  await page.goto('/?theme=dark');
  await expect(preview(page).locator('#content h1')).toBeVisible();
  // Capture what the page looks like at the moment print() is called.
  await page.evaluate(() => {
    const frame = document.querySelector('iframe') as HTMLIFrameElement;
    const w = frame.contentWindow as Window & { __printed?: { theme?: string; color: string } };
    w.print = () => {
      const p = w.document.querySelector('#content p') ?? w.document.body;
      w.__printed = { theme: w.document.documentElement.dataset.theme, color: w.getComputedStyle(p).color };
    };
  });
  await page.keyboard.press('Control+p');
  const printed = await page.waitForFunction(() => {
    const w = (document.querySelector('iframe') as HTMLIFrameElement).contentWindow as Window & { __printed?: unknown };
    return w.__printed;
  });
  const { theme, color } = (await printed.jsonValue()) as { theme: string; color: string };
  expect(theme).toBe('light');
  // Dark text on white paper.
  const [r, g, b] = color.match(/\d+/g)!.map(Number);
  expect(r + g + b).toBeLessThan(300);
  await page.evaluate(() => (document.querySelector('iframe') as HTMLIFrameElement).contentWindow!.dispatchEvent(new Event('afterprint')));
  await expect(preview(page).locator('html')).toHaveAttribute('data-theme', 'dark');
});
