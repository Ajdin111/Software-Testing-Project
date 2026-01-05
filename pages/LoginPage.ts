import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  
  readonly emailInput = '#input-email';
  readonly passwordInput = '#input-password';
  readonly loginButton = 'input[type="submit"][value="Login"]';
  readonly registerButton = 'a[href*="account/register"].btn.btn-primary';
  readonly forgottenPasswordLink = 'a[href*="account/forgotten"]';
  readonly errorMessage = '.alert-danger';
  readonly pageHeading = 'h2:has-text("Returning Customer")';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
  }

  async fillEmail(email: string) {
    await this.page.locator(this.emailInput).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInput).fill(password);
  }

  async clickLogin() {
    await this.page.locator(this.loginButton).click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async isPageHeadingVisible() {
    return await this.page.locator(this.pageHeading).isVisible();
  }

  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).textContent();
  }

  async isErrorMessageVisible() {
    return await this.page.locator(this.errorMessage).isVisible();
  }
}