// playwright.config.ts
import { devices } from '@playwright/test';

export default {
  timeout: 60000,
  retries: 1,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chrome-Desktop',
      use: { browserName: 'chromium', channel: 'chrome' },
    },
    {
      name: 'Edge-Desktop',
      use: { browserName: 'chromium', channel: 'msedge' },
    },
    {
      name: 'iPhone-13',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'Galaxy-S9',
      use: { ...devices['Galaxy S9'] },
    }
  ],
};
