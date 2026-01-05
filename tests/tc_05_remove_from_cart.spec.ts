import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('TC_05: Remove Product from Shopping Cart', () => {
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    
    await productPage.navigateToMacBook();
    await productPage.clickAddToCart();
    await productPage.waitForSuccessAlert();
    await cartPage.navigate();
  });

  test('should remove product from cart successfully', async ({ page }) => {
    const initialCount = await cartPage.getCartItemsCount();
    expect(initialCount).toBeGreaterThan(0);

    await cartPage.removeFirstItem();

    await page.waitForTimeout(1000);

    const isEmptyMessageVisible = await cartPage.isEmptyCartMessageVisible();
    expect(isEmptyMessageVisible).toBeTruthy();

    const emptyMessage = await cartPage.getEmptyCartMessage();
    expect(emptyMessage).toContain('empty');
  });
});