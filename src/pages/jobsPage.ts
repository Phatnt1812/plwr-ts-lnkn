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
    try{
    await this.page.locator(easyApplyLocSel).first().waitFor({ state: 'visible' });
    await this.page.locator(easyApplyLocSel).first().click();
    } catch (error) {      
      console.error('Error clicking Easy Apply job:', error);
      throw error;
    }
  }

  async openEasyApply() {
    try{
    await this.page.locator(easyApplyButtonSel).first().click();
    } catch (error) {
      console.error('Error opening Easy Apply modal:', error);
      throw error;
    }
  }
}
