import { Page } from 'playwright';

export class LoginPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('https://www.linkedin.com/login');
  }
}
