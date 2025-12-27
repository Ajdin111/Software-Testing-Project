import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToHome(): Promise<void> {
    await this.goto('/');
    await this.waitForNavigation();
  }

  async search(keyword: string): Promise<void> {
    await this.page.getByRole('searchbox', { name: 'Upiši pojam' }).click();
    await this.page.getByRole('searchbox', { name: 'Upiši pojam' }).fill(keyword);
    await this.page.getByRole('button', { name: 'Search magnifier button' }).click();
    await this.waitForNavigation();
  }

  async navigateToCategory(categoryName: string): Promise<void> {
    await this.page.getByRole('link', { name: categoryName }).click();
    await this.waitForNavigation();
  }

async getCartCount(): Promise<number> {
  try {
    const cartLink = await this.page.getByRole('link', { name: /Cart.*item/ }).textContent();
    const match = cartLink?.match(/(\d+)\s*item/);
    return parseInt(match?.[1] || '0');
  } catch {
    return 0;
  }
}

  async goToCart(): Promise<void> {
    await this.page.getByRole('link', { name: /Cart.*item/ }).click();
    await this.waitForNavigation();
  }

  async clickFirstProduct(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    const firstProduct = this.page.locator('.product').filter({ hasText: /KM/ }).first();
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await this.waitForNavigation();
}

  async clickProductByIndex(index: number): Promise<void> {
    const products = this.page.getByText(/Detaljnije/);
    await products.nth(index).click();
    await this.waitForNavigation();
  }

  async clickProductByName(productName: string): Promise<void> {
    await this.page.getByText(new RegExp(productName, 'i')).first().click();
    await this.waitForNavigation();
  }

  async getProductCount(): Promise<number> {
    return await this.page.getByRole('button', { name: /Dodaj u korpu|Pročitaj više/ }).count();
  }

  async addToCartFromHome(productName: string): Promise<void> {
    await this.page.getByRole('button', { name: `Add to cart: "${productName}"` }).click();
    await this.wait(2000);
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const loginVisible = await this.page.locator('#page-container').getByText('Login').isVisible({ timeout: 3000 });
      return !loginVisible;
    } catch {
      return true;
    }
  }

  async isSearchVisible(): Promise<boolean> {
    return await this.page.getByRole('searchbox', { name: 'Upiši pojam' }).isVisible();
  }

  async waitForProducts(): Promise<void> {
    await this.page.getByRole('button', { name: /Dodaj u korpu|Pročitaj više/ }).first().waitFor({ timeout: 10000 });
  }
}