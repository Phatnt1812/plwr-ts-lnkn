import { chromium } from 'playwright';
import { users } from '../src/config/users';
import fs from 'fs';
import path from 'path';


(async () => {
  console.log('Generating LinkedIn login sessions...');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 50
  });

  for (const userKey of Object.keys(users)) {
    const user = users[userKey as keyof typeof users];

    console.log(`Logging in as ${userKey}`);
    const storageDir = path.dirname(user.storage);
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.linkedin.com/login', {
      waitUntil: 'domcontentloaded'
    });

    if (!user.email || !user.password) {
        throw new Error(
        `Missing email/password for user: ${userKey}`
        );
    }


    await page.fill('#username', user.email);
    await page.fill('#password', user.password);

    await page.click('button[type="submit"]');
    console.log('Waiting for successful login...');
    await page.waitForURL('**/feed/', {timeout: 120_000});
    await context.storageState({
      path: user.storage
    });

    console.log(`Session saved for ${userKey} → ${user.storage}`);

    await context.close();
  }

  await browser.close();
  console.log('All sessions generated successfully');
})();
