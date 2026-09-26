// Lightweight, fully offline URL threat heuristics.
// This is NOT an antivirus: it only recognises well-known tricks. Online
// reputation services are deliberately not used, because querying them would
// send the document's URLs to a third party.
import { parse as parseDomain } from 'tldts';
import ipaddr from 'ipaddr.js';
import { toUnicodeHost } from './punycode';
import { t } from '../i18n';

export type Risk = 'ok' | 'warn' | 'danger';
export type UrlKind = 'link' | 'image' | 'media';

export interface UrlVerdict {
  risk: Risk;
  reasons: string[];
  /** Human-readable form of the URL (IDN decoded). */
  display: string;
  /** True when loading/opening it involves the network. */
  network: boolean;
}

const EXECUTABLE_EXT = new Set([
  'exe', 'msi', 'msix', 'msp', 'appx', 'appxbundle', 'bat', 'cmd', 'com', 'scr', 'pif', 'cpl', 'inf', 'reg',
  'ps1', 'psm1', 'psd1', 'vbs', 'vbe', 'js', 'jse', 'wsf', 'wsh', 'hta', 'jar', 'apk', 'xapk', 'aab',
  'dmg', 'pkg', 'app', 'deb', 'rpm', 'sh', 'run', 'bin', 'appimage', 'command', 'lnk', 'scf', 'url',
  'iso', 'img', 'vhd', 'vhdx', 'docm', 'dotm', 'xlsm', 'xltm', 'xlam', 'pptm', 'potm', 'ppam', 'sldm',
  'application', 'gadget', 'msc', 'chm',
]);

const DOUBLE_EXT =
  /\.(pdf|docx?|xlsx?|pptx?|txt|rtf|odt|jpe?g|png|gif|bmp|webp|mp[34]|avi|mov|wav|zip|rar|7z|csv|html?)\.(exe|scr|bat|cmd|com|pif|js|jse|vbs|vbe|ps1|msi|hta|jar|lnk|wsf|cpl|reg)$/i;

const SUSPICIOUS_TLD = new Set([
  'zip', 'mov', 'top', 'xyz', 'tk', 'ml', 'ga', 'cf', 'gq', 'work', 'click', 'country', 'kim', 'men',
  'loan', 'download', 'racing', 'review', 'stream', 'gdn', 'bid', 'win', 'date', 'faith', 'party',
  'science', 'trade', 'accountant', 'cricket', 'rest', 'fit', 'cam', 'icu', 'buzz', 'monster', 'sbs',
  'cfd', 'quest', 'lol', 'support', 'help',
]);

const SHORTENERS = new Set([
  'bit.ly', 'bitly.com', 't.co', 'tinyurl.com', 'goo.gl', 'ow.ly', 'is.gd', 'v.gd', 'buff.ly', 'cutt.ly',
  'rebrand.ly', 't.ly', 's.id', 'shorturl.at', 'rb.gy', 'tiny.cc', 'bl.ink', 'lnkd.in', 'clck.ru',
  'vk.cc', 'u.to', 'qps.ru', 'shorte.st', 'adf.ly', 'bc.vc', 'soo.gd', 'x.co', 'db.tt', 'tiny.one',
  'shorturl.com', 'rotf.lol', 'surl.li', 'urlz.fr', 'gg.gg', 'short.io', 'kutt.it', 'trib.al',
]);

const LOCAL_SUFFIXES = ['.localhost', '.local', '.internal', '.intranet', '.lan', '.home', '.home.arpa', '.corp', '.localdomain'];

const IDN_NATIVE_TLDS = new Set(['рф', 'рус', 'москва', 'дети', 'сайт', 'онлайн', 'орг', 'ком', 'укр', 'бел', 'қаз', 'срб', 'мкд', 'мон']);

const SAFE_IMAGE_DATA = /^data:image\/(png|jpe?g|gif|webp|avif|bmp|svg\+xml|x-icon|vnd\.microsoft\.icon)[;,]/i;
const SAFE_MEDIA_DATA = /^data:(audio|video)\/[a-z0-9.+-]+[;,]/i;

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
const BIDI_CHARS = /[‪-‮⁦-⁩‎‏]/;

export function hasScheme(raw: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(raw.trim()) || raw.trim().startsWith('//');
}

function scriptsOf(label: string): Set<string> {
  const found = new Set<string>();
  for (const ch of label) {
    if (/\p{Script=Latin}/u.test(ch)) found.add('latin');
    else if (/\p{Script=Cyrillic}/u.test(ch)) found.add('cyrillic');
    else if (/\p{Script=Greek}/u.test(ch)) found.add('greek');
    else if (/\p{L}/u.test(ch)) found.add('other');
  }
  return found;
}

function isLocalHostname(host: string): boolean {
  const h = host.toLowerCase().replace(/\.$/, '');
  if (h === 'localhost' || !h.includes('.')) return true;
  return LOCAL_SUFFIXES.some((s) => h.endsWith(s));
}

type IpClass = 'none' | 'public' | 'local';
function classifyIp(host: string): IpClass {
  const h = host.replace(/^\[|\]$/g, '');
  if (!ipaddr.isValid(h)) return 'none';
  let addr = ipaddr.parse(h);
  if (addr.kind() === 'ipv6' && (addr as ipaddr.IPv6).isIPv4MappedAddress()) {
    addr = (addr as ipaddr.IPv6).toIPv4Address();
  }
  return addr.range() === 'unicast' ? 'public' : 'local';
}

function registrable(host: string): string {
  const info = parseDomain(host);
  return (info.domain ?? info.hostname ?? host).toLowerCase();
}

function linkTextHost(text: string): string | null {
  const t = text.trim();
  if (!/^(?:https?:\/\/)?(?:[\p{L}\p{N}-]+\.)+\p{L}{2,}(?::\d+)?(?:[/?#]\S*)?$/iu.test(t)) return null;
  try {
    return new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`).hostname;
  } catch {
    return null;
  }
}

/**
 * Checks an absolute URL. Relative references (local files) are handled by the
 * caller, which resolves them against files the user dropped in.
 */
export function checkUrl(raw: string, kind: UrlKind, linkText?: string): UrlVerdict {
  const reasons: string[] = [];
  let risk: Risk = 'ok';
  const flag = (level: Exclude<Risk, 'ok'>, reason: string) => {
    reasons.push(reason);
    if (level === 'danger' || risk === 'ok') risk = level;
  };
  const trimmed = raw.trim();

  if (BIDI_CHARS.test(trimmed)) {
    flag('danger', t('url.bidi'));
  }
  if (CONTROL_CHARS.test(trimmed)) {
    flag('danger', t('url.control'));
  }

  if (/^data:/i.test(trimmed)) {
    const ok = kind === 'image' ? SAFE_IMAGE_DATA.test(trimmed) : kind === 'media' ? SAFE_MEDIA_DATA.test(trimmed) : false;
    if (!ok) flag('danger', t('url.data'));
    return { risk, reasons, display: trimmed.slice(0, 60) + (trimmed.length > 60 ? '…' : ''), network: false };
  }

  let url: URL;
  try {
    url = new URL(trimmed.startsWith('//') ? `https:${trimmed}` : trimmed);
  } catch {
    flag('danger', t('url.invalid'));
    return { risk, reasons, display: trimmed, network: false };
  }

  const scheme = url.protocol.replace(':', '').toLowerCase();
  const allowedSchemes = kind === 'link' ? ['http', 'https', 'mailto', 'tel'] : ['http', 'https'];
  if (!allowedSchemes.includes(scheme)) {
    flag('danger', t('url.scheme', { scheme }));
    return { risk, reasons, display: trimmed, network: false };
  }
  if (scheme === 'mailto' || scheme === 'tel') {
    return { risk, reasons, display: trimmed, network: false };
  }

  const host = url.hostname;
  const unicodeHost = toUnicodeHost(host);
  const display = url.href.replace(host, unicodeHost);

  if (url.username || url.password) {
    flag('danger', t('url.credentials'));
  }

  const ipClass = classifyIp(host);
  if (ipClass === 'local' || (ipClass === 'none' && isLocalHostname(host))) {
    if (kind === 'link') {
      flag('warn', t('url.localLink'));
    } else {
      flag('danger', t('url.localMedia'));
    }
  } else if (ipClass === 'public') {
    flag('warn', t('url.ip'));
  }

  if (ipClass === 'none' && !isLocalHostname(host)) {
    const info = parseDomain(host);
    const labels = host.split('.');
    const tld = toUnicodeHost(labels[labels.length - 1]).toLowerCase();

    if (!info.isIcann && !info.isPrivate) {
      flag('warn', t('url.unknownTld', { tld }));
    } else if (SUSPICIOUS_TLD.has(tld)) {
      flag('warn', t('url.scamTld', { tld }));
    }

    if (host.includes('xn--')) {
      const mixed = labels.some((l) => scriptsOf(toUnicodeHost(l)).size > 1);
      const nativeTld = IDN_NATIVE_TLDS.has(tld);
      if (mixed) {
        flag('warn', t('url.mixed', { host: unicodeHost }));
      } else if (!nativeTld) {
        flag('warn', t('url.idn', { host: unicodeHost }));
      }
    }

    if (info.domain && SHORTENERS.has(info.domain.toLowerCase())) {
      flag('warn', t('url.shortener'));
    }

    const subdomains = info.subdomain ? info.subdomain.split('.').filter(Boolean).length : 0;
    if (subdomains >= 4) flag('warn', t('url.subdomains'));
  }

  if (url.port && url.port !== '80' && url.port !== '443') {
    flag('warn', t('url.port', { port: url.port }));
  }
  if (scheme === 'http') {
    flag('warn', t('url.http'));
  }

  const lastSegment = decodeSafe(url.pathname.split('/').pop() ?? '');
  const ext = lastSegment.includes('.') ? lastSegment.split('.').pop()!.toLowerCase() : '';
  if (DOUBLE_EXT.test(lastSegment)) {
    flag('danger', t('url.doubleExt', { name: lastSegment }));
  } else if (EXECUTABLE_EXT.has(ext)) {
    flag(kind === 'link' ? 'warn' : 'danger', t('url.executable', { ext }));
  }

  if (trimmed.length > 2000) flag('warn', t('url.long'));
  // Percent-encoding plain ASCII letters has no legitimate purpose; non-ASCII
  // (e.g. Cyrillic paths) is always encoded and therefore not counted.
  const asciiEncoded = (url.pathname + url.search).match(/%(?!20)[2-7][0-9a-f]/gi)?.length ?? 0;
  if (asciiEncoded > 10) {
    flag('warn', t('url.encoded'));
  }

  if (kind === 'link' && linkText) {
    const shownHost = linkTextHost(linkText);
    if (shownHost && registrable(shownHost) !== registrable(host)) {
      flag('warn', t('url.textMismatch', { shown: shownHost, host: unicodeHost }));
    }
  }

  return { risk, reasons, display, network: true };
}

function decodeSafe(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
