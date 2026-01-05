import { Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  
  readonly firstNameInput = '#input-firstname';
  readonly lastNameInput = '#input-lastname';
  readonly emailInput = '#input-email';
  readonly telephoneInput = '#input-telephone';
  readonly passwordInput = '#input-password';
  readonly passwordConfirmInput = '#input-confirm';
  readonly privacyPolicyCheckbox = 'input[name="agree"]';
  readonly continueButton = 'input[type="submit"][value="Continue"]';
  readonly errorMessage = '.alert-danger';
  readonly successMessage = '#content h1';
  readonly pageHeading = 'h1:has-text("Register Account")';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
  }

  async fillFirstName(firstName: string) {
    await this.page.locator(this.firstNameInput).fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.locator(this.lastNameInput).fill(lastName);
  }

  async fillEmail(email: string) {
    await this.page.locator(this.emailInput).fill(email);
  }

  async fillTelephone(telephone: string) {
    await this.page.locator(this.telephoneInput).fill(telephone);
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInput).fill(password);
  }

  async fillPasswordConfirm(password: string) {
    await this.page.locator(this.passwordConfirmInput).fill(password);
  }

  async checkPrivacyPolicy() {
    await this.page.locator(this.privacyPolicyCheckbox).check();
  }

  async clickContinue() {
    await this.page.locator(this.continueButton).click();
  }

  async register(firstName: string, lastName: string, email: string, telephone: string, password: string) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillTelephone(telephone);
    await this.fillPassword(password);
    await this.fillPasswordConfirm(password);
    await this.checkPrivacyPolicy();
    await this.clickContinue();
  }

  async isErrorMessageVisible() {
    return await this.page.locator(this.errorMessage).isVisible();
  }

  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).first().textContent();
  }
}