import { describe, expect, it } from 'vitest';
import { checkUrl, hasScheme } from '../../src/security/url-check';

const risk = (url: string, kind: 'link' | 'image' | 'media' = 'link', text?: string) => checkUrl(url, kind, text).risk;

describe('checkUrl — safe addresses', () => {
  it.each([
    'https://github.com/user/repo',
    'https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%80%D0%BA%D0%B4%D0%B0%D1%83%D0%BD',
    'https://docs.python.org/3/library/os.html#os.path',
    'mailto:someone@example.com',
    'tel:+46701234567',
    'https://xn--80aswg.xn--p1ai/', // сайт.рф — native Cyrillic domain
  ])('%s is ok', (url) => {
    expect(risk(url)).toBe('ok');
  });

  it('allows safe inline images', () => {
    expect(risk('data:image/png;base64,iVBORw0KGgo=', 'image')).toBe('ok');
    expect(checkUrl('data:image/png;base64,iVBORw0KGgo=', 'image').network).toBe(false);
  });
});

describe('checkUrl — always dangerous', () => {
  it.each([
    ['javascript:alert(1)', 'link'],
    ['JaVaScRiPt:alert(1)', 'link'],
    ['vbscript:msgbox(1)', 'link'],
    ['file:///C:/Windows/System32/', 'link'],
    ['data:text/html;base64,PHNjcmlwdD4=', 'link'],
    ['data:text/html,<script>alert(1)</script>', 'image'],
    ['blob:https://evil.example/123', 'image'],
    ['https://bank.com@evil.example/login', 'link'],
    ['https://user:pass@example.com/', 'link'],
    ['https://example.com/invoice.pdf.exe', 'link'],
    ['https://example.com/photo.jpg.scr', 'link'],
    ['http://192.168.1.1/admin.png', 'image'],
    ['http://10.0.0.5/cam.jpg', 'image'],
    ['http://localhost:8080/x.png', 'image'],
    ['http://router.local/logo.png', 'media'],
    ['http://[::1]/a.png', 'image'],
    ['http://[::ffff:192.168.0.1]/a.png', 'image'],
    ['http://3232235777/a.png', 'image'], // 192.168.1.1 as a decimal number
    ['https://example.com/setup.exe', 'image'],
    ['https://example.com/\u202Egpj.exe', 'link'],
  ] as const)('%s (%s) is danger', (url, kind) => {
    expect(risk(url, kind)).toBe('danger');
  });
});

describe('checkUrl — suspicious', () => {
  it.each([
    ['https://example.com/tool.exe', 'executable'],
    ['https://example.com/macro.docm', 'macros'],
    ['http://93.184.216.34/page', 'IP address'],
    ['https://example.com:8443/', 'port'],
    ['http://example.com/', 'no TLS'],
    ['https://bit.ly/3abcd', 'shortener'],
    ['https://clck.ru/abc', 'shortener'],
    ['https://free-prizes.xyz/', 'tld'],
    ['https://login.example.zip/', 'tld'],
    ['https://xn--pple-43d.com/', 'mixed/lookalike IDN (аpple.com)'],
    ['https://a.b.c.d.e.example.com/', 'subdomains'],
    ['https://example.notarealtld/', 'unknown tld'],
    ['http://192.168.1.1/', 'local network link'],
    ['https://example.com/%61%64%6d%69%6e/%6c%6f%67%69%6e/%70%61%73%73', 'encoded'],
  ])('%s is warn (%s)', (url) => {
    expect(risk(url)).toBe('warn');
  });

  it('flags link text that shows a different domain', () => {
    const v = checkUrl('https://bank-example.xyz/login', 'link', 'https://bank.example.com');
    expect(v.risk).toBe('warn');
    expect(v.reasons.join(' ')).toMatch(/link text shows/);
  });

  it('does not flag matching link text', () => {
    expect(risk('https://www.github.com/x', 'link', 'github.com')).toBe('ok');
  });

  it('shows IDN hosts decoded', () => {
    expect(checkUrl('https://xn--pple-43d.com/', 'link').display).toContain('аpple.com');
  });
});

describe('hasScheme', () => {
  it('detects absolute and protocol-relative URLs', () => {
    expect(hasScheme('https://x.y')).toBe(true);
    expect(hasScheme('//x.y/a.png')).toBe(true);
    expect(hasScheme('javascript:1')).toBe(true);
    expect(hasScheme('img/a.png')).toBe(false);
    expect(hasScheme('./a.png')).toBe(false);
    expect(hasScheme('#section')).toBe(false);
  });
});
