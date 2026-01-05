import { Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  
  readonly searchInput = 'input[name="search"]';
  readonly searchButton = '#search .btn.btn-default.btn-lg';
  readonly productResults = '.product-thumb';
  readonly noResultsMessage = '#content p:has-text("no product")';
  readonly pageHeading = 'h1';
  readonly productTitles = '.product-thumb h4 a';

  constructor(page: Page) {
    this.page = page;
  }

  async searchProduct(productName: string) {
    await this.page.locator(this.searchInput).fill(productName);
    await this.page.locator(this.searchButton).click();
  }

  async getProductResultsCount() {
    return await this.page.locator(this.productResults).count();
  }

  async isNoResultsMessageVisible() {
    return await this.page.locator(this.noResultsMessage).isVisible();
  }

  async getProductTitles() {
    return await this.page.locator(this.productTitles).allTextContents();
  }

  async getPageHeading() {
    return await this.page.locator(this.pageHeading).textContent();
  }
}