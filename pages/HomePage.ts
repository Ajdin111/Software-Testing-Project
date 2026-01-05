import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  
  readonly logo = '#logo';
  readonly searchInput = 'input[name="search"]';
  readonly searchButton = '#search .btn.btn-default.btn-lg';
  readonly myAccountDropdown = 'a[title="My Account"]';
  readonly shoppingCart = '#cart';
  readonly cartTotal = '#cart-total';
  readonly wishlist = '#wishlist-total';
  readonly navigationMenu = '#menu';
  readonly featuredSection = 'h3:has-text("Featured")';
  readonly productThumbs = '.product-thumb';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://naveenautomationlabs.com/opencart');
  }

  async isLogoVisible() {
    return await this.page.locator(this.logo).isVisible();
  }

  async isSearchBarVisible() {
    return await this.page.locator(this.searchInput).isVisible();
  }

  async isMyAccountVisible() {
    return await this.page.locator(this.myAccountDropdown).isVisible();
  }

  async isShoppingCartVisible() {
    return await this.page.locator(this.shoppingCart).isVisible();
  }

  async isNavigationMenuVisible() {
    return await this.page.locator(this.navigationMenu).isVisible();
  }

  async isFeaturedSectionVisible() {
    return await this.page.locator(this.featuredSection).isVisible();
  }

  async getFeaturedProductsCount() {
    return await this.page.locator(this.productThumbs).count();
  }

  async getPageTitle() {
    return await this.page.title();
  }
}