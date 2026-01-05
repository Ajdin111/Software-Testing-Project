import { Page } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  
  readonly nameInput = '#input-name';
  readonly emailInput = '#input-email';
  readonly enquiryTextarea = '#input-enquiry';
  readonly submitButton = 'input[type="submit"][value="Submit"]';
  readonly successMessage = '#content p';
  readonly pageHeading = '#content h1';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=information/contact');
  }

  async fillName(name: string) {
    await this.page.locator(this.nameInput).fill(name);
  }

  async fillEmail(email: string) {
    await this.page.locator(this.emailInput).fill(email);
  }

  async fillEnquiry(enquiry: string) {
    await this.page.locator(this.enquiryTextarea).fill(enquiry);
  }

  async clickSubmit() {
    await this.page.locator(this.submitButton).click();
  }

  async submitContactForm(name: string, email: string, enquiry: string) {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillEnquiry(enquiry);
    await this.clickSubmit();
  }

  async getSuccessMessage() {
    return await this.page.locator(this.successMessage).textContent();
  }
}