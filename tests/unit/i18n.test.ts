import { describe, expect, it } from 'vitest';
import en from '../../src/i18n/locales/en';
import { LOCALES, setLocale, t, type Messages } from '../../src/i18n';

const modules = import.meta.glob<{ default: Messages }>('../../src/i18n/locales/*.ts', { eager: true });
const locales = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.match(/(\w+)\.ts$/)![1], mod.default]),
);

const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
// Structural elements of the welcome document that every translation must keep.
const structure = (md: string) => ({
  headings: (md.match(/^#{1,6} /gm) ?? []).length,
  fences: (md.match(/^```/gm) ?? []).length,
  urls: (md.match(/https?:\/\/[^\s)]+/g) ?? []).sort(),
  tasks: (md.match(/^- \[[ x]\]/gm) ?? []).length,
  tableRows: (md.match(/^\|/gm) ?? []).length,
  math: (md.match(/\$/g) ?? []).length,
  footnotes: (md.match(/\[\^1\]/g) ?? []).length,
});

describe('translations', () => {
  it('has a file for every listed language', () => {
    expect(Object.keys(locales).sort()).toEqual(LOCALES.map((l) => l.code).sort());
  });

  for (const [code, dict] of Object.entries(locales)) {
    if (code === 'en') continue;
    describe(code, () => {
      it('has exactly the same keys as English', () => {
        expect(Object.keys(dict).sort()).toEqual(Object.keys(en).sort());
      });

      it('keeps every {placeholder} and has no empty strings', () => {
        for (const key of Object.keys(en) as (keyof typeof en)[]) {
          expect(dict[key].trim(), `${code}:${key}`).not.toBe('');
          expect(placeholders(dict[key]), `${code}:${key}`).toEqual(placeholders(en[key]));
        }
      });

      it('keeps the structure of the welcome document', () => {
        expect(structure(dict['sample.body'])).toEqual(structure(en['sample.body']));
        expect(dict['sample.name']).toMatch(/\.md$/);
      });
    });
  }
});

describe('t()', () => {
  it('interpolates parameters and falls back to English', async () => {
    await setLocale('en');
    expect(t('tab.untitled', { n: 3 })).toBe('Untitled 3.md');
    await setLocale('de');
    expect(t('tab.untitled', { n: 3 })).toBe('Unbenannt 3.md');
    await setLocale('en');
  });
});
