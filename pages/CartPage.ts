import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  
  readonly cartItems = '.table-responsive tbody tr';
  readonly removeButtons = 'button[data-toggle="tooltip"][data-original-title="Remove"]';
  readonly emptyCartMessage = '#content p:has-text("empty!")';
  readonly continueButton = 'a[href*="common/home"].btn.btn-primary';
  readonly pageHeading = '#content h1';
  readonly cartTotal = '.table-responsive tfoot tr:last-child td:last-child';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart');
  }

  async getCartItemsCount() {
    const items = await this.page.locator(this.cartItems);
    return await items.count();
  }

  async removeFirstItem() {
    await this.page.locator(this.removeButtons).first().click();
  }

  async isEmptyCartMessageVisible() {
    return await this.page.locator(this.emptyCartMessage).isVisible();
  }

  async getEmptyCartMessage() {
    return await this.page.locator(this.emptyCartMessage).textContent();
  }
}