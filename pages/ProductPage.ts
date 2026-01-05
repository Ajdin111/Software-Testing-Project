import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  
  readonly productTitle = '#content h1';
  readonly addToCartButton = '#button-cart';
  readonly addToWishlistButton = 'button[onclick*="wishlist.add"]';
  readonly quantityInput = '#input-quantity';
  readonly successAlert = '.alert-success';
  readonly productPrice = '#content .list-unstyled h2';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(productId: string) {
    await this.page.goto(`https://naveenautomationlabs.com/opencart/index.php?route=product/product&product_id=${productId}`);
  }

  async navigateToMacBook() {
    await this.navigate('43');
  }

  async clickAddToCart() {
    await this.page.locator(this.addToCartButton).click();
  }

  async clickAddToWishlist() {
    await this.page.locator(this.addToWishlistButton).click();
  }

  async setQuantity(quantity: string) {
    await this.page.locator(this.quantityInput).fill(quantity);
  }

  async isSuccessAlertVisible() {
    return await this.page.locator(this.successAlert).isVisible();
  }

  async getSuccessMessage() {
    return await this.page.locator(this.successAlert).textContent();
  }

  async getProductTitle() {
    return await this.page.locator(this.productTitle).textContent();
  }

  async waitForSuccessAlert() {
    await this.page.waitForSelector(this.successAlert, { state: 'visible', timeout: 5000 });
  }
}