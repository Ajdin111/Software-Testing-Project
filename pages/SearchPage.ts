import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

 async getResultCount(): Promise<number> {
    try {
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(2000);
      const products = this.page.locator('.product').filter({ hasText: /KM/ });
      return await products.count();
    } catch {
      return 0;
    }
}

  async hasNoResults(): Promise<boolean> {
    try {
      return await this.page.getByText('No Results Found').isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  async getNoResultsMessage(): Promise<string> {
    if (await this.hasNoResults()) {
      const message = await this.page.getByText('No Results Found').textContent();
      return message || '';
    }
    return '';
  }

  async hasResults(): Promise<boolean> {
    const count = await this.getResultCount();
    return count > 0;
  }

  async clickFirstProduct(): Promise<void> {
    const firstProduct = this.page.getByRole('button', { name: /Dodaj u korpu|Pročitaj više/ }).first();
    const productContainer = firstProduct.locator('..');
    await productContainer.click();
    await this.waitForNavigation();
  }

  async clickProductByIndex(index: number): Promise<void> {
    const products = this.page.getByRole('button', { name: /Dodaj u korpu|Pročitaj više/ });
    const productContainer = products.nth(index).locator('..');
    await productContainer.click();
    await this.waitForNavigation();
  }

  async addToCartFromResults(index: number): Promise<void> {
    const addToCartButtons = this.page.getByRole('button', { name: 'Dodaj u korpu' });
    await addToCartButtons.nth(index).click();
    await this.wait(2000);
  }

  async waitForResults(): Promise<void> {
    await this.page.waitForSelector('text=No Results Found, button:has-text("Dodaj u korpu"), button:has-text("Pročitaj više")', { timeout: 10000 });
  }
}