import {Before,After,BeforeAll,AfterAll,ITestCaseHookParameter, setDefaultTimeout} from '@cucumber/cucumber';
import {chromium,Browser,BrowserContext,Page} from 'playwright';
import { env } from '../config/env';
import { getDeviceConfig } from '../config/device';

import { users } from '../config/users';

export let page: Page;
const device = getDeviceConfig(process.env.DEVICE);
let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  console.log('Starting Cucumber test execution');
});

setDefaultTimeout(env.timeout);

Before(async function (scenario: ITestCaseHookParameter) {
  const userTag = scenario.pickle.tags.find(tag =>
    tag.name.startsWith('@user=')
  );
  const userKey = userTag
    ? userTag.name.split('=')[1]
    : 'user1';
  console.log(`Running scenario as user: ${userKey}`);
  browser = await chromium.launch({
    headless: env.headless,
  });

  context = await browser.newContext({
    ...device.use,
    storageState: users[userKey as keyof typeof users].storage,
    baseURL: env.baseUrl,
  });

  //log device info
  console.log(`Using device configuration: ${device.name}`);

  page = await context.newPage();

  await page.goto('https://www.linkedin.com/feed', {
    waitUntil: 'domcontentloaded'
  });

  if (page.url().includes('/login')) {
    throw new Error(
      `Session expired for user ${userKey}. Please regenerate storageState.`
    );
  }
});

After(async function (scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === 'FAILED') {
    console.error(`Scenario failed: ${scenario.pickle.name}`);
    await page.screenshot({
      path: `screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}.png`,
      fullPage: true
    });
  }
  await context.close();
  await browser.close();
});

AfterAll(async () => {
  console.log('Finished Cucumber test execution');
});