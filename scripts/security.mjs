// Single source of truth for every security header the site sends.
// .htaccess, nginx.conf, Caddyfile and the local preview server are all
// generated from this file, so they can never drift apart.

/** Policy for the application shell (index.html). The shell never renders
 *  document content, so it gets no network access beyond its own files. */
export const CSP_APP = [
  "default-src 'none'",
  "script-src 'self'",
  // Mermaid measures diagrams by temporarily inserting SVG with inline styles
  // into the shell. User content never reaches the shell, and img/connect
  // restrictions below prevent any CSS-based exfiltration.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "font-src 'self'",
  "connect-src 'none'",
  "frame-src 'self'",
  "child-src 'self'",
  "worker-src 'none'",
  "manifest-src 'self'",
  "form-action 'none'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
];

/** The four preview documents differ only in what external media they may load. */
export const PREVIEW_VARIANTS = [
  { file: 'p-00.html', images: false, media: false },
  { file: 'p-10.html', images: true, media: false },
  { file: 'p-01.html', images: false, media: true },
  { file: 'p-11.html', images: true, media: true },
];

export function cspPreview({ images, media }) {
  return [
    "default-src 'none'",
    "script-src 'none'",
    "style-src 'self'",
    `img-src 'self' data: blob:${images ? ' https:' : ''}`,
    `media-src 'self' data: blob:${media ? ' https:' : ''}`,
    "font-src 'self'",
    "connect-src 'none'",
    "frame-src 'none'",
    "form-action 'none'",
    "base-uri 'none'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    'upgrade-insecure-requests',
  ];
}

/** frame-ancestors is not allowed inside <meta>; browsers log an error for it. */
export const metaPolicy = (directives) =>
  directives.filter((d) => !d.startsWith('frame-ancestors')).join('; ');

export const headerPolicy = (directives) => directives.join('; ');

export const COMMON_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), hid=(), midi=(), fullscreen=(self)',
};

export const HSTS = 'max-age=31536000';

/** Headers for a given request path, as the local preview server applies them. */
export function headersForPath(pathname) {
  const headers = { ...COMMON_HEADERS };
  const base = pathname.split('/').pop() || 'index.html';
  const variant = PREVIEW_VARIANTS.find((v) => v.file === base);
  if (variant) {
    headers['Content-Security-Policy'] = headerPolicy(cspPreview(variant));
    headers['X-Frame-Options'] = 'SAMEORIGIN';
  } else if (base === 'index.html' || !base.includes('.')) {
    headers['Content-Security-Policy'] = headerPolicy(CSP_APP);
    headers['X-Frame-Options'] = 'DENY';
  }
  return headers;
}
