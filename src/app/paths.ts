// Path helpers for files dropped into the page. Paths are always relative to
// the root of what was dropped, with forward slashes.

function decodeSafe(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/** Normalises `a/./b/../c` → `a/c`; never climbs above the root. */
export function normalizePath(path: string): string {
  const parts: string[] = [];
  for (const part of path.replace(/\\/g, '/').split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') parts.pop();
    else parts.push(part);
  }
  return parts.join('/');
}

export function dirname(path: string): string {
  const i = path.lastIndexOf('/');
  return i === -1 ? '' : path.slice(0, i);
}

export function basename(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1);
}

/** Resolves a reference found in a document relative to that document's folder. */
export function resolveRef(ref: string, docPath: string): string {
  const clean = decodeSafe(ref.split(/[?#]/)[0].trim().replace(/^<|>$/g, ''));
  if (clean.startsWith('/')) return normalizePath(clean);
  return normalizePath(`${dirname(docPath)}/${clean}`);
}

export const pathKey = (path: string) => normalizePath(path).toLowerCase();
