// UI preferences. They never contain document text; documents are stored
// only when the user explicitly enables "remember documents".

export interface Settings {
  theme: 'light' | 'dark' | null;
  view: 'editor' | 'both' | 'preview';
  sync: boolean;
  remember: boolean;
  split: number;
  advanced: boolean;
  lineNumbers: boolean;
  wrap: boolean;
  /** Interface language; null follows the browser. */
  lang: string | null;
}

const KEY = 'mpe:settings';
const PREFIX = 'mpe:';

const DEFAULTS: Settings = {
  theme: null,
  view: 'both',
  sync: true,
  remember: false,
  split: 50,
  advanced: false,
  lineNumbers: false,
  wrap: true,
  lang: null,
};

/** localStorage can throw (private mode, blocked storage); never let that break the app. */
export const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable or full */
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      /* unavailable */
    }
  },
  clearAll(): void {
    try {
      for (const k of Object.keys(localStorage)) if (k.startsWith(PREFIX)) localStorage.removeItem(k);
    } catch {
      /* unavailable */
    }
  },
};

function load(): Settings {
  try {
    const parsed = JSON.parse(storage.get(KEY) ?? '{}') as Partial<Settings>;
    const s = { ...DEFAULTS, ...parsed };
    if (!['editor', 'both', 'preview'].includes(s.view)) s.view = 'both';
    if (s.theme !== 'light' && s.theme !== 'dark') s.theme = null;
    if (typeof s.lang !== 'string') s.lang = null;
    s.split = Math.min(80, Math.max(20, Number(s.split) || 50));
    return s;
  } catch {
    return { ...DEFAULTS };
  }
}

export const settings: Settings = load();

export function saveSettings(): void {
  storage.set(KEY, JSON.stringify(settings));
}
