// Media files dropped together with documents. They stay in memory and are
// shown through blob: URLs, so the network is never involved.
import { checkMediaFile, extOf, type FileVerdict } from '../security/file-check';
import type { LocalAsset } from '../markdown/pipeline';
import { basename, pathKey, resolveRef } from './paths';

interface StoredAsset {
  path: string;
  file: File;
  verdict: FileVerdict;
  url?: string;
}

const SVG_READ_LIMIT = 2 * 1024 * 1024;

export class AssetStore {
  private assets = new Map<string, StoredAsset>();

  get size(): number {
    return this.assets.size;
  }

  async add(file: File, path: string): Promise<void> {
    const isSvg = extOf(file.name) === 'svg';
    const head = new Uint8Array(await file.slice(0, isSvg ? SVG_READ_LIMIT : 4096).arrayBuffer());
    const key = pathKey(path);
    const previous = this.assets.get(key);
    if (previous?.url) URL.revokeObjectURL(previous.url);
    this.assets.set(key, { path, file, verdict: checkMediaFile(file.name, head) });
  }

  private find(ref: string, docPath: string): StoredAsset | null {
    const exact = this.assets.get(pathKey(resolveRef(ref, docPath)));
    if (exact) return exact;
    // Fall back to a unique file-name match (documents often use other folder layouts).
    const name = basename(resolveRef(ref, docPath)).toLowerCase();
    const matches = [...this.assets.values()].filter((a) => basename(a.path).toLowerCase() === name);
    return matches.length === 1 ? matches[0] : null;
  }

  resolve(ref: string, docPath: string): LocalAsset | null {
    const asset = this.find(ref, docPath);
    if (!asset) return null;
    asset.url ??= URL.createObjectURL(asset.file);
    return { name: asset.file.name, url: asset.url, verdict: asset.verdict };
  }

  /** blob: URL → data: URL, for self-contained HTML export. */
  async inlineBlobUrl(url: string): Promise<string | null> {
    const asset = [...this.assets.values()].find((a) => a.url === url);
    if (!asset) return null;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(asset.file);
    });
  }

  clear(): void {
    for (const a of this.assets.values()) if (a.url) URL.revokeObjectURL(a.url);
    this.assets.clear();
  }
}
