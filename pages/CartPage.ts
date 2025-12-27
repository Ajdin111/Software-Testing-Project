import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage - Handles shopping cart operations
 */
export class CartPage extends BasePage {
  readonly selectors = {
    // Cart page elements
    cartTable: '.shop_table, .cart-table, table',
    cartItems: '.cart_item, tr.cart-item, [class*="cart-item"]',
    
    // Item information
    itemName: '.product-name a, td.product-name',
    itemPrice: '.product-price, td[data-title*="Price"], .amount',
    itemQuantity: 'input.qty, input[type="number"]',
    itemSubtotal: '.product-subtotal, td[data-title*="Subtotal"]',
    
    // Actions
    removeButton: '.remove, a.remove, [class*="remove"]',
    updateCartButton: 'button[name="update_cart"], input[name="update_cart"], button:has-text("Update cart")',
    
    // Cart totals
    subtotal: '.cart-subtotal .amount, [class*="subtotal"] .amount',
    shippingCost: '.shipping .amount, [class*="shipping"] .amount',
    totalPrice: '.order-total .amount, .cart-total .amount',
    
    // Checkout
    proceedToCheckoutButton: 'a.checkout-button, a:has-text("Proceed to checkout"), .wc-proceed-to-checkout a',
    
    // Empty cart
    emptyCartMessage: '.cart-empty, .woocommerce-info',
    returnToShopLink: 'a:has-text("Return to shop"), .return-to-shop a',
    
    // Messages
    updateMessage: '.woocommerce-message',
    errorMessage: '.woocommerce-error',
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to cart page
   */
  async navigateToCart(): Promise<void> {
    await this.goto('/shop/');
    await this.waitForNavigation();
  }

  /**
   * Get number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    try {
      return await this.getElementCount(this.selectors.cartItems);
    } catch {
      return 0;
    }
  }

  /**
   * Get item name by index
   */
  async getItemName(index: number): Promise<string> {
    const items = this.page.locator(this.selectors.itemName);
    const text = await items.nth(index).textContent();
    return text || '';
  }

  /**
   * Get item price by index
   */
  async getItemPrice(index: number): Promise<string> {
    const items = this.page.locator(this.selectors.itemPrice);
    const text = await items.nth(index).textContent();
    return text || '';
  }

  /**
   * Get item quantity by index
   */
  async getItemQuantity(index: number): Promise<number> {
    const quantityInput = this.page.locator(this.selectors.cartItems)
      .nth(index)
      .locator('input.qty, input[type="number"]');
    const value = await quantityInput.inputValue();
    return parseInt(value || '1');
  }

  /**
   * Update item quantity
   */
  async updateItemQuantity(index: number, quantity: number): Promise<void> {
    const quantityInput = this.page.locator(this.selectors.cartItems)
      .nth(index)
      .locator('input.qty, input[type="number"]');
    await quantityInput.clear();
    await quantityInput.fill(quantity.toString());
    await this.clickUpdateCart();
    await this.wait(2000);
  }

  /**
   * Remove item from cart by index
   */
  async removeItem(index: number): Promise<void> {
    const removeButtons = this.page.locator(this.selectors.removeButton);
    await removeButtons.nth(index).click();
    await this.wait(2000);
  }

  /**
   * Click update cart button
   */
  async clickUpdateCart(): Promise<void> {
    if (await this.isVisible(this.selectors.updateCartButton)) {
      await this.click(this.selectors.updateCartButton);
      await this.wait(2000);
    }
  }

  /**
   * Get cart subtotal
   */
  async getSubtotal(): Promise<string> {
    if (await this.isVisible(this.selectors.subtotal)) {
      return await this.getText(this.selectors.subtotal);
    }
    return '0';
  }

  /**
   * Get cart total
   */
  async getTotal(): Promise<string> {
    if (await this.isVisible(this.selectors.totalPrice)) {
      return await this.getText(this.selectors.totalPrice);
    }
    return '0';
  }

  /**
   * Get shipping cost
   */
  async getShippingCost(): Promise<string> {
    if (await this.isVisible(this.selectors.shippingCost)) {
      return await this.getText(this.selectors.shippingCost);
    }
    return '0';
  }

  /**
   * Click proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.waitForElement(this.selectors.proceedToCheckoutButton);
    await this.click(this.selectors.proceedToCheckoutButton);
    await this.waitForNavigation();
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    return await this.isVisible(this.selectors.emptyCartMessage);
  }

  /**
   * Check if update message is displayed
   */
  async isUpdateMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.updateMessage);
  }

  /**
   * Get all item names in cart
   */
  async getAllItemNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.getCartItemCount();
    
    for (let i = 0; i < count; i++) {
      const name = await this.getItemName(i);
      names.push(name.trim());
    }
    
    return names;
  }

  /**
   * Wait for cart page to load
   */
  async waitForCartPage(): Promise<void> {
    try {
      await this.page.waitForSelector(
        `${this.selectors.cartTable}, ${this.selectors.emptyCartMessage}`,
        { timeout: 10000 }
      );
    } catch {
      console.log('Cart page elements not found');
    }
  }

  /**
   * Clear all items from cart
   */
  async clearCart(): Promise<void> {
    const count = await this.getCartItemCount();
    
    for (let i = count - 1; i >= 0; i--) {
      await this.removeItem(i);
      await this.wait(1000);
    }
  }

  /**
   * Check if proceed to checkout button is visible
   */
  async isCheckoutButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.proceedToCheckoutButton);
  }
}