/** GitHub-style heading anchors that keep Cyrillic and other letters. */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');
}

/** Hands out unique slugs the same way the renderer does (foo, foo-1, foo-2…). */
export class SlugRegistry {
  private used = new Map<string, number>();
  next(text: string): string {
    const base = slugify(text) || 'section';
    const n = this.used.get(base) ?? 0;
    this.used.set(base, n + 1);
    return n === 0 ? base : `${base}-${n}`;
  }
}
