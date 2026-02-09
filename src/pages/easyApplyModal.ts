import { Page, expect } from '@playwright/test';


const emailLabelSel = '//span[@aria-hidden = "true" and contains(text(),"Email")]';
const phoneCountryLabelSel = '//span[@aria-hidden = "true" and contains(text(),"Email")]';

export class EasyApplyPage {
  constructor(private page: Page) {}

  async validateRequiredFields() {
    try{
    await expect(this.page.locator(emailLabelSel)).toBeVisible();
    await expect(this.page.locator(phoneCountryLabelSel)).toBeVisible();
    } catch (error) {
      console.error('Error validating required fields:', error);
      throw error;
    }
  }

  async validateSubmitDisabled() {
    try{
    const submitBtn = this.page.locator('button:has-text("Submit")');
    await expect(submitBtn).toBeDisabled();
    } catch (error) {
      console.error('Error validating submit button state:', error);
      throw error;
    }
  }
}
