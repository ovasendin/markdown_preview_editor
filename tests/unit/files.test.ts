import { describe, expect, it } from 'vitest';
import { checkMediaFile, sniff } from '../../src/security/file-check';
import { decodeText, looksBinary } from '../../src/app/files';
import { normalizePath, resolveRef } from '../../src/app/paths';
import { buildToc } from '../../src/app/commands';
import { toUnicodeHost } from '../../src/security/punycode';

const bytes = (...b: number[]) => new Uint8Array([...b, ...new Array(16).fill(0)]);
const text = (s: string) => new TextEncoder().encode(s);

describe('sniff', () => {
  it('recognises common formats', () => {
    expect(sniff(bytes(0x89, 0x50, 0x4e, 0x47))).toBe('png');
    expect(sniff(bytes(0xff, 0xd8, 0xff, 0xe0))).toBe('jpeg');
    expect(sniff(text('GIF89a......'))).toBe('gif');
    expect(sniff(text('RIFF\0\0\0\0WEBPVP8 '))).toBe('webp');
    expect(sniff(text('ID3\x03\0\0'))).toBe('mp3');
    expect(sniff(text('\0\0\0\x18ftypmp42'))).toBe('mp4');
    expect(sniff(bytes(0x1a, 0x45, 0xdf, 0xa3))).toBe('webm');
    expect(sniff(text('<svg xmlns="http://www.w3.org/2000/svg"></svg>'))).toBe('svg');
    expect(sniff(bytes(0x4d, 0x5a, 0x90, 0x00))).toBe('exe');
    expect(sniff(bytes(0x50, 0x4b, 0x03, 0x04))).toBe('zip');
  });
});

describe('checkMediaFile', () => {
  it('accepts a real PNG', () => {
    expect(checkMediaFile('a.png', bytes(0x89, 0x50, 0x4e, 0x47)).risk).toBe('ok');
  });
  it('blocks an executable disguised as an image', () => {
    const v = checkMediaFile('cat.jpg', bytes(0x4d, 0x5a, 0x90, 0x00));
    expect(v.risk).toBe('danger');
    expect(v.reasons[0]).toMatch(/Windows executable/);
  });
  it('blocks an HTML page disguised as an image', () => {
    expect(checkMediaFile('x.png', text('<!DOCTYPE html><script>alert(1)</script>')).risk).toBe('danger');
  });
  it('warns about active SVG content', () => {
    const v = checkMediaFile('x.svg', text('<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"></svg>'));
    expect(v.risk).toBe('warn');
  });
  it('accepts mp4 audio container named .m4a', () => {
    expect(checkMediaFile('a.m4a', text('\0\0\0\x18ftypM4A ')).risk).toBe('ok');
  });
  it('warns when image extension holds another image type', () => {
    expect(checkMediaFile('a.png', bytes(0xff, 0xd8, 0xff, 0xe0)).risk).toBe('ok'); // browsers render it fine
    expect(checkMediaFile('a.png', text('ID3\x03\0\0')).risk).toBe('warn');
  });
});

describe('decodeText', () => {
  it('decodes UTF-8 with and without BOM', () => {
    expect(decodeText(new Uint8Array([0xef, 0xbb, 0xbf, ...text('Привет')]).buffer).text).toBe('Привет');
    expect(decodeText(text('Привет').buffer as ArrayBuffer).encoding).toBe('UTF-8');
  });
  it('falls back to Windows-1251', () => {
    // "Привет" in cp1251
    const cp1251 = new Uint8Array([0xcf, 0xf0, 0xe8, 0xe2, 0xe5, 0xf2]);
    const r = decodeText(cp1251.buffer);
    expect(r.encoding).toBe('Windows-1251');
    expect(r.text).toBe('Привет');
  });
  it('decodes UTF-16 LE with BOM', () => {
    const buf = new Uint8Array([0xff, 0xfe, 0x41, 0x00, 0x42, 0x00]);
    expect(decodeText(buf.buffer).text).toBe('AB');
  });
  it('detects binary files', () => {
    expect(looksBinary(new Uint8Array([0x4d, 0x5a, 0, 0, 1]).buffer)).toBe(true);
    expect(looksBinary(text('# hi').buffer as ArrayBuffer)).toBe(false);
  });
});

describe('paths', () => {
  it('normalises and never climbs above the root', () => {
    expect(normalizePath('a/./b/../c.png')).toBe('a/c.png');
    expect(normalizePath('../../x.png')).toBe('x.png');
    expect(normalizePath('\\docs\\img\\a.png')).toBe('docs/img/a.png');
  });
  it('resolves references relative to the document', () => {
    expect(resolveRef('img/a.png', 'folder/docs/readme.md')).toBe('folder/docs/img/a.png');
    expect(resolveRef('../assets/b.png', 'folder/docs/readme.md')).toBe('folder/assets/b.png');
    expect(resolveRef('my%20pic.png?raw=1', 'readme.md')).toBe('my pic.png');
    expect(resolveRef('<my pic.png>', 'readme.md')).toBe('my pic.png');
  });
});

describe('buildToc', () => {
  it('creates links matching the renderer ids, skipping code blocks', () => {
    const toc = buildToc('# Введение\n\n```\n# not a heading\n```\n\n## Детали\n## Детали\n');
    expect(toc).toBe('- [Введение](#введение)\n  - [Детали](#детали)\n  - [Детали](#детали-1)');
  });
});

describe('punycode', () => {
  it('decodes IDN labels', () => {
    expect(toUnicodeHost('xn--80aswg.xn--p1ai')).toBe('сайт.рф');
    expect(toUnicodeHost('example.com')).toBe('example.com');
  });
});
