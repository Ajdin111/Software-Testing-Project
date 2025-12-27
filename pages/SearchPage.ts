import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SearchPage - Handles search results page
 */
export class SearchPage extends BasePage {
  readonly selectors = {
    // Search results
    searchResults: '.product, .search-result, [class*="product"]',
    resultCount: '.woocommerce-result-count, .result-count',
    noResultsMessage: '.woocommerce-info, .no-results, p:has-text("No products found")',
    
    // Product cards in results
    productCard: '.product, [class*="product-item"]',
    productTitle: '.woocommerce-loop-product__title, h2, h3',
    productPrice: '.price, .amount',
    productImage: '.attachment-woocommerce_thumbnail',
    addToCartButton: 'a:has-text("Dodaj u korpu"), .add_to_cart_button',
    
    // Filtering and sorting
    orderByDropdown: '.orderby, select[name="orderby"]',
    filterSidebar: '.widget_layered_nav, .sidebar',
    categoryFilter: '.product-categories',
    
    // Pagination
    pagination: '.woocommerce-pagination, .pagination',
    nextPageLink: '.next.page-numbers',
    prevPageLink: '.prev.page-numbers',
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get number of search results
   */
  async getResultCount(): Promise<number> {
    try {
      return await this.getElementCount(this.selectors.productCard);
    } catch {
      return 0;
    }
  }

  /**
   * Check if "No results" message is displayed
   */
  async hasNoResults(): Promise<boolean> {
    return await this.isVisible(this.selectors.noResultsMessage);
  }

  /**
   * Get "No results" message text
   */
  async getNoResultsMessage(): Promise<string> {
    if (await this.hasNoResults()) {
      return await this.getText(this.selectors.noResultsMessage);
    }
    return '';
  }

  /**
   * Check if results are displayed
   */
  async hasResults(): Promise<boolean> {
    const count = await this.getResultCount();
    return count > 0;
  }

  /**
   * Get all product titles from search results
   */
  async getProductTitles(): Promise<string[]> {
    const titles: string[] = [];
    const count = await this.getResultCount();
    
    for (let i = 0; i < count; i++) {
      const titleElement = this.page.locator(this.selectors.productTitle).nth(i);
      const title = await titleElement.textContent();
      if (title) titles.push(title.trim());
    }
    
    return titles;
  }

  /**
   * Click on a product by index
   */
  async clickProduct(index: number): Promise<void> {
    const product = this.page.locator(this.selectors.productCard).nth(index);
    await product.click();
    await this.waitForNavigation();
  }

  /**
   * Click on first product in results
   */
  async clickFirstProduct(): Promise<void> {
    await this.clickProduct(0);
  }

  /**
   * Add product to cart from search results
   */
  async addToCartFromResults(index: number): Promise<void> {
    const addToCartButtons = this.page.locator(this.selectors.addToCartButton);
    await addToCartButtons.nth(index).click();
    await this.wait(2000);
  }

  /**
   * Check if a product title contains specific text
   */
  async hasProductWithText(text: string): Promise<boolean> {
    const titles = await this.getProductTitles();
    return titles.some(title => title.toLowerCase().includes(text.toLowerCase()));
  }

  /**
   * Get result count text
   */
  async getResultCountText(): Promise<string> {
    if (await this.isVisible(this.selectors.resultCount)) {
      return await this.getText(this.selectors.resultCount);
    }
    return '';
  }

  /**
   * Sort results by option
   */
  async sortBy(option: string): Promise<void> {
    if (await this.isVisible(this.selectors.orderByDropdown)) {
      await this.selectOption(this.selectors.orderByDropdown, option);
      await this.waitForNavigation();
    }
  }

  /**
   * Check if pagination exists
   */
  async hasPagination(): Promise<boolean> {
    return await this.isVisible(this.selectors.pagination);
  }

  /**
   * Go to next page of results
   */
  async goToNextPage(): Promise<void> {
    if (await this.isVisible(this.selectors.nextPageLink)) {
      await this.click(this.selectors.nextPageLink);
      await this.waitForNavigation();
    }
  }

  /**
   * Go to previous page of results
   */
  async goToPreviousPage(): Promise<void> {
    if (await this.isVisible(this.selectors.prevPageLink)) {
      await this.click(this.selectors.prevPageLink);
      await this.waitForNavigation();
    }
  }

  /**
   * Wait for search results to load
   */
  async waitForResults(): Promise<void> {
    await this.page.waitForSelector(
      `${this.selectors.productCard}, ${this.selectors.noResultsMessage}`,
      { timeout: 10000 }
    );
  }

  /**
   * Get product price by index
   */
  async getProductPrice(index: number): Promise<string> {
    const priceElements = this.page.locator(this.selectors.productPrice);
    const text = await priceElements.nth(index).textContent();
    return text || '';
  }

  /**
   * Verify search results contain keyword
   */
  async resultsContainKeyword(keyword: string): Promise<boolean> {
    const titles = await this.getProductTitles();
    if (titles.length === 0) return false;
    
    return titles.some(title => 
      title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  /**
   * Check if specific product exists in results
   */
  async hasProduct(productName: string): Promise<boolean> {
    const titles = await this.getProductTitles();
    return titles.some(title => 
      title.toLowerCase().includes(productName.toLowerCase())
    );
  }
}