import { setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';

export class TestWorld extends World {
  context!: BrowserContext;
  page!: Page;
}

setWorldConstructor(TestWorld);