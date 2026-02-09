import { devices } from '@playwright/test';

export type DeviceName =
  | 'desktop_chrome'
  | 'desktop_edge'
  | 'iphone_14'
  | 'pixel_7'
  | 'ipad';

export const deviceConfig = {
  desktop_chrome: {
    name: 'Desktop Chrome',
    use: {
      browserName: 'chromium',
      viewport: { width: 1920, height: 1080 },
      isMobile: false,
      hasTouch: false
    }
  },

  desktop_edge: {
    name: 'Desktop Edge',
    use: {
      browserName: 'chromium',
      channel: 'msedge',
      viewport: { width: 1920, height: 1080 },
      isMobile: false,
      hasTouch: false
    }
  },

  iphone_14: {
    name: 'iPhone 14',
    use: {
      ...devices['iPhone 14'],
      browserName: 'webkit'
    }
  },

  pixel_7: {
    name: 'Pixel 7',
    use: {
      ...devices['Pixel 7'],
      browserName: 'chromium'
    }
  },

  ipad: {
    name: 'iPad (gen 9)',
    use: {
      ...devices['iPad (gen 9)'],
      browserName: 'webkit'
    }
  }
} as const;

export function getDeviceConfig(device?: string) {
  if (!device) return deviceConfig.desktop_chrome;

  return (
    deviceConfig[device as DeviceName] ?? deviceConfig.desktop_chrome
  );
}
