import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductPage - Handles product detail page interactions
 */
export class ProductPage extends BasePage {
  readonly selectors = {
    // Product information
    productTitle: 'h1.product-title, h1, .product_title',
    productPrice: '.price, .amount, [class*="price"]',
    productDescription: '.product-description, .description, [class*="description"]',
    productImage: '.product-image img, .wp-post-image',
    
    // Actions
    addToCartButton: 'button:has-text("Dodaj u korpu"), a:has-text("Dodaj u korpu"), .single_add_to_cart_button',
    quantityInput: 'input[type="number"], input.qty, [name="quantity"]',
    quantityIncrease: '.quantity-up, .plus',
    quantityDecrease: '.quantity-down, .minus',
    
    // Cart notifications
    addedToCartMessage: '.woocommerce-message, .added-to-cart-message, [class*="success"]',
    viewCartLink: 'a:has-text("View cart"), a[href*="cart"]',
    
    // Stock status
    inStock: '.in-stock',
    outOfStock: '.out-of-stock',
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get product title
   */
  async getProductTitle(): Promise<string> {
    await this.waitForElement(this.selectors.productTitle);
    return await this.getText(this.selectors.productTitle);
  }

  /**
   * Get product price
   */
  async getProductPrice(): Promise<string> {
    await this.waitForElement(this.selectors.productPrice);
    return await this.getText(this.selectors.productPrice);
  }

  /**
   * Add product to cart
   */
  async addToCart(): Promise<void> {
    await this.waitForElement(this.selectors.addToCartButton);
    await this.click(this.selectors.addToCartButton);
    await this.wait(2000);
  }

  /**
   * Set product quantity
   */
  async setQuantity(quantity: number): Promise<void> {
    if (await this.isVisible(this.selectors.quantityInput)) {
      await this.clearInput(this.selectors.quantityInput);
      await this.fill(this.selectors.quantityInput, quantity.toString());
    }
  }

  /**
   * Increase quantity by clicking plus button
   */
  async increaseQuantity(): Promise<void> {
    if (await this.isVisible(this.selectors.quantityIncrease)) {
      await this.click(this.selectors.quantityIncrease);
    }
  }

  /**
   * Decrease quantity by clicking minus button
   */
  async decreaseQuantity(): Promise<void> {
    if (await this.isVisible(this.selectors.quantityDecrease)) {
      await this.click(this.selectors.quantityDecrease);
    }
  }

  /**
   * Check if "Added to cart" message is displayed
   */
  async isAddedToCartMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.addedToCartMessage);
  }

  /**
   * Click "View cart" link after adding to cart
   */
  async clickViewCart(): Promise<void> {
    await this.waitForElement(this.selectors.viewCartLink);
    await this.click(this.selectors.viewCartLink);
    await this.waitForNavigation();
  }

  /**
   * Check if product is in stock
   */
  async isInStock(): Promise<boolean> {
    if (await this.isVisible(this.selectors.inStock)) {
      return true;
    }
    if (await this.isVisible(this.selectors.outOfStock)) {
      return false;
    }
    return true;
  }

  /**
   * Check if Add to Cart button is visible
   */
  async isAddToCartButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.addToCartButton);
  }

  /**
   * Wait for product page to load
   */
  async waitForProductPage(): Promise<void> {
    await this.waitForElement(this.selectors.productTitle);
    await this.waitForElement(this.selectors.addToCartButton);
  }

  /**
   * Get current quantity value
   */
  async getQuantity(): Promise<number> {
    if (await this.isVisible(this.selectors.quantityInput)) {
      const value = await this.page.locator(this.selectors.quantityInput).inputValue();
      return parseInt(value || '1');
    }
    return 1;
  }
}