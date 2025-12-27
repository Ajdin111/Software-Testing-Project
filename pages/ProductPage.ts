import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getProductTitle(): Promise<string> {
    await this.page.getByRole('heading').first().waitFor({ timeout: 5000 });
    const title = await this.page.getByRole('heading').first().textContent();
    return title || '';
  }

  async getProductPrice(): Promise<string> {
    const priceElement = this.page.locator('text=/\\d+,\\d+KM/').first();
    await priceElement.waitFor({ timeout: 5000 });
    const price = await priceElement.textContent();
    return price || '';
  }

  async addToCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Dodaj u korpu' }).click();
    await this.wait(2000);
  }

  async setQuantity(quantity: number): Promise<void> {
    const quantityInput = this.page.getByRole('spinbutton', { name: 'Product quantity' });
    await quantityInput.clear();
    await quantityInput.fill(quantity.toString());
  }

  async getQuantity(): Promise<number> {
    const quantityInput = this.page.getByRole('spinbutton', { name: 'Product quantity' });
    const value = await quantityInput.inputValue();
    return parseInt(value || '1');
  }

  async clickViewCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'Vidi korpu' }).click();
    await this.waitForNavigation();
  }

  async isAddToCartButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Dodaj u korpu' }).isVisible();
  }

  async waitForProductPage(): Promise<void> {
    await this.page.getByRole('heading').first().waitFor({ timeout: 10000 });
    await this.page.getByRole('button', { name: 'Dodaj u korpu' }).waitFor({ timeout: 10000 });
  }
}