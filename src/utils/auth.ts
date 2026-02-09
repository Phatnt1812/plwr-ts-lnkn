import { Page, BrowserContext } from 'playwright';
import { users } from '../config/users';

export async function isLoggedIn(page: Page): Promise<boolean> {
  try {
    await page.goto('https://www.linkedin.com/feed', {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });
    if (page.url().includes('/login')) {
      return false;
    }
    await page.waitForSelector('[data-test-global-nav-link="mynetwork"]', {
      timeout: 5000
    });
    return true;
  } catch {
    return false;
  }
}

export async function assertAuthenticated(
  page: Page,
  userKey: keyof typeof users
) {
  const loggedIn = await isLoggedIn(page);

  if (!loggedIn) {
    throw new Error(
      `User "${userKey}" is NOT authenticated.
Session may be expired.
Please re-run: npm run session`
    );
  }
}

export async function mockLogin(context: BrowserContext) {
  await context.addCookies([
    {
      name: 'li_at',
      value: 'MOCK_LINKEDIN_TOKEN',
      domain: '.linkedin.com',
      path: '/',
      httpOnly: true,
      secure: true
    }
  ]);
}
