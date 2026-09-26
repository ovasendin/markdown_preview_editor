// Checks local media files (dropped together with a document) by their
// signature ("magic bytes") instead of trusting the file extension.
import type { Risk } from './url-check';

export type MediaCategory = 'image' | 'audio' | 'video';

export interface FileVerdict {
  risk: Risk;
  reasons: string[];
  detected: string;
}

const IMAGE_EXT = ['png', 'jpg', 'jpeg', 'jfif', 'gif', 'webp', 'avif', 'bmp', 'ico', 'svg', 'apng'];
const AUDIO_EXT = ['mp3', 'wav', 'ogg', 'oga', 'opus', 'm4a', 'aac', 'flac', 'weba'];
const VIDEO_EXT = ['mp4', 'm4v', 'webm', 'ogv', 'mov', 'mkv'];

export function extOf(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? '';
  return base.includes('.') ? base.split('.').pop()!.toLowerCase() : '';
}

export function mediaCategory(name: string): MediaCategory | null {
  const ext = extOf(name);
  if (IMAGE_EXT.includes(ext)) return 'image';
  if (AUDIO_EXT.includes(ext)) return 'audio';
  if (VIDEO_EXT.includes(ext)) return 'video';
  return null;
}

const startsWith = (b: Uint8Array, sig: number[], offset = 0) => sig.every((v, i) => b[offset + i] === v);
const ascii = (b: Uint8Array, from: number, to: number) => String.fromCharCode(...b.subarray(from, to));

/** Identifies the real format of a file from its first bytes. */
export function sniff(b: Uint8Array): string {
  if (startsWith(b, [0x89, 0x50, 0x4e, 0x47])) return 'png';
  if (startsWith(b, [0xff, 0xd8, 0xff])) return 'jpeg';
  if (ascii(b, 0, 4) === 'GIF8') return 'gif';
  if (ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 12) === 'WEBP') return 'webp';
  if (ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 12) === 'WAVE') return 'wav';
  if (ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 12) === 'AVI ') return 'avi';
  if (startsWith(b, [0x42, 0x4d])) return 'bmp';
  if (startsWith(b, [0x00, 0x00, 0x01, 0x00])) return 'ico';
  if (ascii(b, 4, 8) === 'ftyp') {
    const brand = ascii(b, 8, 12);
    if (/^(avif|avis)/.test(brand)) return 'avif';
    if (/^(heic|heix|mif1|msf1)/.test(brand)) return 'heic';
    if (/^(M4A |M4B )/.test(brand)) return 'm4a';
    if (/^qt/.test(brand)) return 'mov';
    return 'mp4';
  }
  if (startsWith(b, [0x1a, 0x45, 0xdf, 0xa3])) return 'webm';
  if (ascii(b, 0, 4) === 'OggS') return 'ogg';
  if (ascii(b, 0, 4) === 'fLaC') return 'flac';
  if (ascii(b, 0, 3) === 'ID3' || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0)) return b[1] >= 0xf0 && (b[1] & 0x06) === 0 ? 'aac' : 'mp3';
  if (ascii(b, 0, 5) === '%PDF-') return 'pdf';
  if (startsWith(b, [0x4d, 0x5a])) return 'exe';
  if (startsWith(b, [0x7f, 0x45, 0x4c, 0x46])) return 'elf';
  if (startsWith(b, [0xcf, 0xfa, 0xed, 0xfe]) || startsWith(b, [0xfe, 0xed, 0xfa, 0xce]) || startsWith(b, [0xca, 0xfe, 0xba, 0xbe])) return 'macho';
  if (startsWith(b, [0x50, 0x4b, 0x03, 0x04])) return 'zip';
  if (ascii(b, 0, 4) === 'Rar!') return 'rar';
  if (startsWith(b, [0x37, 0x7a, 0xbc, 0xaf])) return '7z';
  if (startsWith(b, [0xd0, 0xcf, 0x11, 0xe0])) return 'ole';
  if (ascii(b, 0, 2) === '#!') return 'script';
  const head = new TextDecoder('utf-8', { fatal: false }).decode(b.subarray(0, 512)).trimStart().toLowerCase();
  if (head.startsWith('<svg') || (head.startsWith('<?xml') && head.includes('<svg'))) return 'svg';
  if (head.startsWith('<!doctype html') || head.startsWith('<html') || head.startsWith('<script')) return 'html';
  return 'unknown';
}

const CATEGORY_OF: Record<string, MediaCategory> = {
  png: 'image', jpeg: 'image', gif: 'image', webp: 'image', bmp: 'image', ico: 'image', avif: 'image', heic: 'image', svg: 'image',
  wav: 'audio', ogg: 'audio', flac: 'audio', mp3: 'audio', aac: 'audio', m4a: 'audio',
  mp4: 'video', mov: 'video', webm: 'video', avi: 'video',
};

const EXECUTABLE_LIKE: Record<string, string> = {
  exe: 'a Windows executable',
  elf: 'a Linux executable',
  macho: 'a macOS executable',
  script: 'a script',
  html: 'a web page',
  zip: 'a ZIP archive (or Office document)',
  rar: 'a RAR archive',
  '7z': 'a 7z archive',
  ole: 'a legacy Office document (may contain macros)',
  pdf: 'a PDF document',
};

/** Verdict for a local media file. `bytes` must hold at least the first 512 bytes. */
export function checkMediaFile(name: string, bytes: Uint8Array): FileVerdict {
  const expected = mediaCategory(name);
  const detected = sniff(bytes);
  const reasons: string[] = [];
  let risk: Risk = 'ok';

  if (detected in EXECUTABLE_LIKE) {
    risk = 'danger';
    reasons.push(`File "${name}" pretends to be media but is actually ${EXECUTABLE_LIKE[detected]}`);
  } else if (detected === 'unknown') {
    risk = 'warn';
    reasons.push(`Could not identify the format of "${name}" from its content`);
  } else if (expected && (CATEGORY_OF[detected] === 'video' || CATEGORY_OF[detected] === 'audio') &&
             (expected === 'video' || expected === 'audio')) {
    // mp4 vs m4a, ogg audio vs video: containers overlap, that is fine.
  } else if (expected && CATEGORY_OF[detected] !== expected) {
    risk = 'warn';
    reasons.push(`The extension of "${name}" does not match its content (${detected})`);
  }

  if (detected === 'svg') {
    const text = new TextDecoder().decode(bytes).toLowerCase();
    if (/<script|\son[a-z]+\s*=|javascript:|<foreignobject|<iframe|<embed|<object/.test(text)) {
      risk = risk === 'danger' ? risk : 'warn';
      reasons.push(`SVG "${name}" contains active content (scripts or embedded HTML). It is shown as a plain image, where the browser never runs it`);
    }
  }
  return { risk, reasons, detected };
}
