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
