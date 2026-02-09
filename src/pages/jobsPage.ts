import { Page, expect } from '@playwright/test';
import { env } from '../config/env';
import { errors } from 'undici-types';

const easyApplyLocSel = '//p[text()="Easy Apply"]';
const easyApplyButtonSel = '//button[@id = "jobs-apply-button-id"]';

export class JobsPage {
  constructor(private page: Page) {}

  async openJobs() {
    await this.page.goto('https://www.linkedin.com/jobs')
  }

  async clickEasyApplyJob() {
    await this.page.locator(easyApplyLocSel).first().click();
  }

  async openEasyApply() {
    await this.page.locator(easyApplyLocSel).first().click();
    await this.page.locator(easyApplyButtonSel).first().click();
  }
}
