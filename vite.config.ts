/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import { CSP_APP, metaPolicy, headersForPath } from './scripts/security.mjs';

/** Mirrors the production headers on `vite preview`, so tests run against the real policy. */
function securityHeaders(): Plugin {
  return {
    name: 'security-headers',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = new URL((req as { url?: string }).url ?? '/', 'http://localhost').pathname;
        for (const [k, v] of Object.entries(headersForPath(path))) (res as unknown as { setHeader(k: string, v: string): void }).setHeader(k, v);
        next();
      });
    },
    // A <meta> copy of the policy protects the app even on hosts that drop headers.
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (ctx.server) return html; // the dev server needs inline scripts and websockets
        return html.replace(
          '<meta charset="utf-8">',
          `<meta charset="utf-8">\n    <meta http-equiv="Content-Security-Policy" content="${metaPolicy(CSP_APP)}">`,
        );
      },
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [securityHeaders()],
  build: {
    // Lowered syntax keeps the site working in older browsers (e.g. Edge 92).
    target: ['es2020', 'chrome87', 'edge88', 'firefox78', 'safari14'],
    // The polyfill uses fetch(), which connect-src 'none' forbids.
    modulePreload: { polyfill: false },
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 4000,
    sourcemap: false,
  },
  preview: { port: 4173, strictPort: true },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'jsdom',
  },
});
