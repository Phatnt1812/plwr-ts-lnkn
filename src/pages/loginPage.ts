import { Page } from 'playwright';

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    try{
    await this.page.goto('https://www.linkedin.com/login');
    } catch (error) {
      console.error('Error navigating to login page:', error);
      throw error;
    }
  }
}
