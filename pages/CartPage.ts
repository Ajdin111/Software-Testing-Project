import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToCart(): Promise<void> {
    await this.goto('/shop/');
    await this.waitForNavigation();
  }

  async getCartItemCount(): Promise<number> {
    try {
      return await this.page.getByRole('spinbutton', { name: /količina/ }).count();
    } catch {
      return 0;
    }
  }

  async getItemQuantity(index: number): Promise<number> {
    const quantityInputs = this.page.getByRole('spinbutton', { name: /količina/ });
    const value = await quantityInputs.nth(index).inputValue();
    return parseInt(value || '1');
  }

  async updateItemQuantity(index: number, quantity: number): Promise<void> {
    const quantityInputs = this.page.getByRole('spinbutton', { name: /količina/ });
    await quantityInputs.nth(index).clear();
    await quantityInputs.nth(index).fill(quantity.toString());
    await this.page.getByRole('button', { name: 'Ažuriraj korpu' }).click();
    await this.wait(2000);
  }

  async removeItem(index: number): Promise<void> {
    const removeButtons = this.page.getByRole('cell', { name: /Remove.*from/ });
    await removeButtons.nth(index).click();
    await this.wait(2000);
  }

  async clickUpdateCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Ažuriraj korpu' }).click();
    await this.wait(2000);
  }

  async getTotal(): Promise<string> {
    const totalElement = this.page.locator('text=/\\d+,\\d+KM/').last();
    const total = await totalElement.textContent();
    return total || '0';
  }

  async isCartEmpty(): Promise<boolean> {
    try {
      return await this.page.getByText(/cart is empty|korpa je prazna/i).isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  async waitForCartPage(): Promise<void> {
    await this.page.waitForSelector('button:has-text("Ažuriraj korpu"), text=/cart is empty/i', { timeout: 10000 });
  }

  async clearCart(): Promise<void> {
    const count = await this.getCartItemCount();
    
    for (let i = count - 1; i >= 0; i--) {
      await this.removeItem(i);
      await this.wait(1000);
    }
  }
}