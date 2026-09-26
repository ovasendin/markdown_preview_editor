// Reading files that the user drops or picks. Everything happens locally in
// the browser — no upload of any kind exists in this application.
import { extOf, mediaCategory } from '../security/file-check';
import { normalizePath } from './paths';

export const TEXT_EXT = ['md', 'markdown', 'mdown', 'mkd', 'mkdn', 'mdx', 'txt'];
const MAX_TEXT_BYTES = 20 * 1024 * 1024;

export interface IncomingFile {
  file: File;
  path: string;
}

export interface DecodedText {
  text: string;
  encoding: string;
}

export const isTextDoc = (name: string) => TEXT_EXT.includes(extOf(name));
export const isMedia = (name: string) => mediaCategory(name) !== null;

/** UTF-8 (with or without BOM), UTF-16 with BOM, otherwise Windows-1251. */
export function decodeText(buffer: ArrayBuffer): DecodedText {
  const b = new Uint8Array(buffer);
  if (b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf) {
    return { text: new TextDecoder('utf-8').decode(b.subarray(3)), encoding: 'UTF-8' };
  }
  if (b[0] === 0xff && b[1] === 0xfe) return { text: new TextDecoder('utf-16le').decode(b.subarray(2)), encoding: 'UTF-16 LE' };
  if (b[0] === 0xfe && b[1] === 0xff) return { text: new TextDecoder('utf-16be').decode(b.subarray(2)), encoding: 'UTF-16 BE' };
  try {
    return { text: new TextDecoder('utf-8', { fatal: true }).decode(b), encoding: 'UTF-8' };
  } catch {
    return { text: new TextDecoder('windows-1251').decode(b), encoding: 'Windows-1251' };
  }
}

export function looksBinary(buffer: ArrayBuffer): boolean {
  const b = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, 8000));
  let zeros = 0;
  for (const byte of b) if (byte === 0) zeros++;
  // UTF-16 text has many zeros but starts with a BOM, which decodeText handles.
  const bom16 = (b[0] === 0xff && b[1] === 0xfe) || (b[0] === 0xfe && b[1] === 0xff);
  return !bom16 && zeros > 0;
}

export async function readTextFile(file: File): Promise<DecodedText> {
  if (file.size > MAX_TEXT_BYTES) throw new Error(`File "${file.name}" is too large (over 20 MB)`);
  const buffer = await file.arrayBuffer();
  if (looksBinary(buffer)) throw new Error(`File "${file.name}" does not look like a text file`);
  return decodeText(buffer);
}

// ---------- directory traversal (drag & drop of folders)

function readAllEntries(reader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
  return new Promise((resolve, reject) => {
    const all: FileSystemEntry[] = [];
    const next = () =>
      reader.readEntries((batch) => {
        if (batch.length === 0) resolve(all);
        else {
          all.push(...batch);
          next();
        }
      }, reject);
    next();
  });
}

const entryFile = (entry: FileSystemFileEntry) => new Promise<File>((resolve, reject) => entry.file(resolve, reject));

const MAX_FILES = 2000;

async function walk(entry: FileSystemEntry, out: IncomingFile[]): Promise<void> {
  if (out.length >= MAX_FILES) return;
  if (entry.isFile) {
    out.push({ file: await entryFile(entry as FileSystemFileEntry), path: normalizePath(entry.fullPath) });
  } else if (entry.isDirectory) {
    if (/^(\.git|node_modules)$/.test(entry.name)) return;
    const children = await readAllEntries((entry as FileSystemDirectoryEntry).createReader());
    for (const child of children) await walk(child, out);
  }
}

/**
 * Collects files from a drop. Must be called synchronously inside the drop
 * handler: DataTransfer items become unavailable after the event returns.
 */
export function collectDropped(dt: DataTransfer): Promise<IncomingFile[]> {
  const entries: FileSystemEntry[] = [];
  const plainFiles: File[] = [];
  for (const item of [...dt.items]) {
    if (item.kind !== 'file') continue;
    const entry = item.webkitGetAsEntry?.();
    if (entry) entries.push(entry);
    else {
      const f = item.getAsFile();
      if (f) plainFiles.push(f);
    }
  }
  if (entries.length === 0 && plainFiles.length === 0) plainFiles.push(...dt.files);
  return (async () => {
    const out: IncomingFile[] = plainFiles.map((file) => ({ file, path: file.name }));
    for (const entry of entries) await walk(entry, out);
    return out;
  })();
}

export function collectPicked(list: FileList): IncomingFile[] {
  return [...list].map((file) => ({ file, path: normalizePath(file.webkitRelativePath || file.name) }));
}
