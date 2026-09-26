import { expect, type Page, type FrameLocator } from '@playwright/test';

export interface TestFile {
  name: string;
  /** Text content, or base64 when `base64` is true. */
  content: string;
  base64?: boolean;
  type?: string;
}

export const PNG_1PX =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

/** Simulates dropping files onto an element, the way a real drag from the OS does. */
export async function dropFiles(page: Page, selector: string, files: TestFile[]): Promise<void> {
  await page.evaluate(
    ({ selector, files }) => {
      const dt = new DataTransfer();
      for (const f of files) {
        const data = f.base64 ? Uint8Array.from(atob(f.content), (c) => c.charCodeAt(0)) : f.content;
        dt.items.add(new File([data], f.name, { type: f.type ?? '' }));
      }
      const target = document.querySelector(selector)!;
      for (const type of ['dragenter', 'dragover', 'drop']) {
        target.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt }));
      }
    },
    { selector, files },
  );
}

export const preview = (page: Page): FrameLocator => page.frameLocator('.preview-frame');

export async function openApp(page: Page): Promise<void> {
  await page.goto('/');
  await expect(preview(page).locator('#content h1')).toBeVisible();
}

/** Opens a markdown document by dropping it into the editor. */
export async function openDoc(page: Page, text: string, extra: TestFile[] = [], name = 'test.md'): Promise<void> {
  await dropFiles(page, '.cm-content', [{ name, content: text }, ...extra]);
  await expect(page.locator('.tab.active .tab-name')).toHaveText(name);
}

export async function setPermissions(page: Page, perms: { links?: boolean; images?: boolean; media?: boolean }) {
  await page.locator('#protection-btn').click();
  for (const [key, on] of Object.entries(perms)) {
    const input = page.locator(`#prot-${key}`);
    if ((await input.isChecked()) !== on) await page.locator(`label:has(#prot-${key})`).click();
  }
  await page.keyboard.press('Escape');
}

export async function editorText(page: Page): Promise<string> {
  return page.locator('.cm-content').evaluate((el) =>
    [...el.querySelectorAll('.cm-line')].map((l) => l.textContent).join('\n'),
  );
}
