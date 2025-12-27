import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';

test.describe('TC_12: Remove Product from Cart', () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigateToHome();
  });

  test('should successfully remove product from cart', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const addToCartButton = page.getByRole('button', { name: /Add to cart/ }).first();
    await addToCartButton.scrollIntoViewIfNeeded();
    await addToCartButton.click();
    await page.waitForTimeout(3000);
    
    await homePage.goToCart();
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
    
    const itemCountBefore = await cartPage.getCartItemCount();
    console.log(`Items before removal: ${itemCountBefore}`);
    
    await cartPage.removeItem(0);
    await page.waitForTimeout(3000);
    
    const isCartEmpty = await cartPage.isCartEmpty();
    console.log(`Cart empty: ${isCartEmpty}`);
    
    expect(isCartEmpty).toBeTruthy();
    
    await page.screenshot({ path: 'test-results/TC_12-remove-from-cart.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});