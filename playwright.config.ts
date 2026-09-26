import { defineConfig } from '@playwright/test';

// Uses the locally installed Google Chrome by default (no browser download).
// Set PW_CHANNEL=msedge for Edge, or PW_CHANNEL= (empty) after `npx playwright install chromium`.
const channel = process.env.PW_CHANNEL ?? 'chrome';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    channel: channel || undefined,
    viewport: { width: 1400, height: 860 },
  },
  webServer: {
    // Serves dist/ with the same security headers as production (see vite.config.ts).
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
});
