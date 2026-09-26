// Tiny i18n layer. English is bundled; every other language is a separate
// chunk that is loaded only when selected (or detected from the browser).
import en from './locales/en';

export type MessageKey = keyof typeof en;
export type Messages = Record<MessageKey, string>;

export const LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'sv', name: 'Svenska' },
  { code: 'pl', name: 'Polski' },
  { code: 'uk', name: 'Українська' },
  { code: 'ru', name: 'Русский' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '简体中文' },
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];

const loaders: Record<Exclude<LocaleCode, 'en'>, () => Promise<{ default: Messages }>> = {
  de: () => import('./locales/de'),
  es: () => import('./locales/es'),
  fr: () => import('./locales/fr'),
  it: () => import('./locales/it'),
  pt: () => import('./locales/pt'),
  nl: () => import('./locales/nl'),
  sv: () => import('./locales/sv'),
  pl: () => import('./locales/pl'),
  uk: () => import('./locales/uk'),
  ru: () => import('./locales/ru'),
  tr: () => import('./locales/tr'),
  ja: () => import('./locales/ja'),
  ko: () => import('./locales/ko'),
  zh: () => import('./locales/zh'),
};

let current: LocaleCode = 'en';
let dict: Messages = en;

export const isLocale = (code: unknown): code is LocaleCode => LOCALES.some((l) => l.code === code);

/** First supported language from the browser's preference list, else English. */
export function detectLocale(): LocaleCode {
  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of prefs) {
    const base = tag?.toLowerCase().split('-')[0];
    if (isLocale(base)) return base;
  }
  return 'en';
}

export async function setLocale(code: LocaleCode): Promise<void> {
  dict = code === 'en' ? en : (await loaders[code]()).default;
  current = code;
  document.documentElement.lang = code;
}

export const locale = (): LocaleCode => current;

export function t(key: MessageKey, params?: Record<string, string | number>): string {
  const template = dict[key] ?? en[key] ?? key;
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (m, name: string) => (name in params ? String(params[name]) : m));
}

/**
 * Translates static markup: data-i18n sets text, data-i18n-title and
 * data-i18n-aria set the matching attribute.
 */
export function translateDom(root: ParentNode = document): void {
  for (const el of root.querySelectorAll<HTMLElement>('[data-i18n]')) el.textContent = t(el.dataset.i18n as MessageKey);
  for (const el of root.querySelectorAll<HTMLElement>('[data-i18n-title]')) el.title = t(el.dataset.i18nTitle as MessageKey);
  for (const el of root.querySelectorAll<HTMLElement>('[data-i18n-aria]')) el.setAttribute('aria-label', t(el.dataset.i18nAria as MessageKey));
}
