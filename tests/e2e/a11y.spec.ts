// Accessibility: WCAG 2.2 AA with axe-core in the main states of the app, in both themes.
// The preview iframe is included (AxeBuilder checks frames too).
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { openDoc, preview } from './helpers';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function audit(page: Page, state: string) {
  const { violations } = await new AxeBuilder({ page }).withTags(TAGS).setLegacyMode(true).analyze();
  const report = violations.map(
    (v) => `${v.id} (${v.impact}) in "${state}": ${v.help}\n` + v.nodes.slice(0, 3).map((n) => `  ${n.target.join(' ')} — ${n.failureSummary?.split('\n')[1] ?? ''}`).join('\n'),
  );
  expect(report, report.join('\n\n')).toEqual([]);
}

const DOC = `# Notes

Some **bold** text, \`code\`, a [link](https://example.com) and a footnote.[^1]

- [x] Done
- [ ] To do

| A | B |
|---|---|
| 1 | 2 |

> [!NOTE]
> An alert.

\`\`\`js
const x = 1; // comment
\`\`\`

[^1]: The footnote.
`;

for (const theme of ['light', 'dark'] as const) {
  test.describe(`${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/?theme=${theme}`);
      await expect(preview(page).locator('#content h1')).toBeVisible();
    });

    test('default view with the sample document', async ({ page }) => {
      await audit(page, `${theme}: default`);
    });

    test('several tabs, a rich document and the advanced toolbar', async ({ page }) => {
      await openDoc(page, DOC, [], 'notes.md');
      await openDoc(page, '# Second', [], 'second.md');
      await page.locator('.tab').first().click();
      const advanced = page.locator('[aria-controls="toolbar-advanced"]');
      if (await advanced.count()) await advanced.first().click();
      await audit(page, `${theme}: tabs + advanced toolbar`);
    });

    test('protection and settings panels', async ({ page }) => {
      await page.locator('#protection-btn').click();
      await audit(page, `${theme}: protection panel`);
      await page.keyboard.press('Escape');
      await page.locator('#settings-btn').click();
      await audit(page, `${theme}: settings panel`);
    });

    test('heading menu, relaxed protection and the issues dialog', async ({ page }) => {
      await page.locator('.tool-menu').first().click();
      await audit(page, `${theme}: heading menu`);
      await page.keyboard.press('Escape');
      // A suspicious link makes the issues indicator appear in the status bar.
      await openDoc(page, '# Links\n\n[pay](http://192.168.0.1/login) and ![x](https://example.com/a.png)', [], 'links.md');
      await page.locator('#protection-btn').click();
      await page.locator('label:has(#prot-links)').click();
      await page.locator('label:has(#prot-images)').click();
      await audit(page, `${theme}: protection relaxed`);
      await page.keyboard.press('Escape');
      const issues = page.locator('#status-issues');
      if (await issues.isVisible()) {
        await issues.click();
        await expect(page.locator('dialog[open]')).toBeVisible();
        await audit(page, `${theme}: issues dialog`);
      }
    });

    test('phone layout with the menu and formatting toolbar open', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 800 });
      await page.locator('#toolbar-toggle').click();
      await audit(page, `${theme}: phone + toolbar`);
      await page.locator('#menu-btn').click();
      await audit(page, `${theme}: phone + menu`);
    });
  });
}

test('tabs work from the keyboard: arrows switch, Delete closes', async ({ page }) => {
  await page.goto('/');
  await expect(preview(page).locator('#content h1')).toBeVisible();
  await openDoc(page, '# One', [], 'one.md');
  await openDoc(page, '# Two', [], 'two.md');
  await page.locator('.tab.active').focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.tab.active .tab-name')).toHaveText('one.md');
  await expect(page.locator('.tab.active')).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.locator('.tab.active .tab-name')).toHaveText('two.md');
  await page.keyboard.press('Delete');
  await expect(page.locator('.tab')).toHaveCount(1);
  await expect(page.locator('.tab.active')).toBeFocused();
  // The resizer exposes its position.
  await expect(page.locator('#resizer')).toHaveAttribute('aria-valuenow', /\d+/);
});
