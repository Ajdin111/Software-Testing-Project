import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - Handles homepage interactions
 */
export class HomePage extends BasePage {
  readonly selectors = {
    // Header elements
    searchInput: 'input[type="search"], input[name="s"], .search-field',
    searchButton: 'button[type="submit"].search-submit, .search-submit',
    loginButton: 'text=Login',
    cartIcon: 'a[href*="shop"], a[href*="cart"], .cart-icon, [class*="cart"]',
    cartCount: '.cart-count, .cart-items-count, [class*="cart-count"]',
    
    // Navigation menu
    mainMenu: 'nav, .main-navigation, .menu',
    
    // Product elements
    productCard: '.product, [class*="product-item"]',
    productTitle: '.product-title, h2, h3',
    productPrice: '.price, [class*="price"]',
    addToCartButton: 'a:has-text("Dodaj u korpu"), button:has-text("Dodaj u korpu"), .add-to-cart',
    
    // User account
    userMenu: '.user-menu, [class*="user"], [class*="account"]',
    logoutLink: 'text=Logout',
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to homepage
   */
  async navigateToHome(): Promise<void> {
    await this.goto('/');
    await this.waitForNavigation();
  }

  /**
   * Search for a product
   */
  async search(keyword: string): Promise<void> {
    await this.waitForElement(this.selectors.searchInput);
    await this.fill(this.selectors.searchInput, keyword);
    await this.pressKey('Enter');
    await this.waitForNavigation();
  }

  /**
   * Search using search button
   */
  async searchWithButton(keyword: string): Promise<void> {
    await this.waitForElement(this.selectors.searchInput);
    await this.fill(this.selectors.searchInput, keyword);
    await this.click(this.selectors.searchButton);
    await this.waitForNavigation();
  }

  /**
   * Navigate to a category
   */
  async navigateToCategory(category: string): Promise<void> {
    const categorySelector = `a:has-text("${category}")`;
    await this.click(categorySelector);
    await this.waitForNavigation();
  }

  /**
   * Get cart item count
   */
  async getCartCount(): Promise<number> {
    try {
      const countText = await this.getText(this.selectors.cartCount);
      const match = countText.match(/\d+/);
      return parseInt(match?.[0] || '0');
    } catch {
      return 0;
    }
  }

  /**
   * Click on cart icon to view cart
   */
  async goToCart(): Promise<void> {
    await this.click(this.selectors.cartIcon);
    await this.waitForNavigation();
  }

  /**
   * Click on first product in the list
   */
  async clickFirstProduct(): Promise<void> {
    await this.waitForElement(this.selectors.productCard);
    const firstProduct = this.page.locator(this.selectors.productCard).first();
    await firstProduct.click();
    await this.waitForNavigation();
  }

  /**
   * Click on a specific product by index
   */
  async clickProductByIndex(index: number): Promise<void> {
    await this.waitForElement(this.selectors.productCard);
    const product = this.page.locator(this.selectors.productCard).nth(index);
    await product.click();
    await this.waitForNavigation();
  }

  /**
   * Get number of products displayed on page
   */
  async getProductCount(): Promise<number> {
    return await this.getElementCount(this.selectors.productCard);
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.selectors.userMenu);
  }

  /**
   * Check if search input is visible
   */
  async isSearchVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.searchInput);
  }

  /**
   * Get all product titles on current page
   */
  async getProductTitles(): Promise<string[]> {
    const titles: string[] = [];
    const count = await this.getProductCount();
    
    for (let i = 0; i < count; i++) {
      const titleElement = this.page.locator(this.selectors.productTitle).nth(i);
      const title = await titleElement.textContent();
      if (title) titles.push(title.trim());
    }
    
    return titles;
  }

  /**
   * Click login button in header
   */
  async clickLogin(): Promise<void> {
    await this.click(this.selectors.loginButton);
    await this.waitForNavigation();
  }

  /**
   * Wait for products to load
   */
  async waitForProducts(): Promise<void> {
    await this.waitForElement(this.selectors.productCard, 10000);
  }

  /**
   * Scroll to first product
   */
  async scrollToProducts(): Promise<void> {
    await this.scrollToElement(this.selectors.productCard);
  }
}