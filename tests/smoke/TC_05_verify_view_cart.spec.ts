import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';

test.describe('TC_05: View Cart', () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigateToHome();
  });

  test('should successfully view cart after adding product', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const addToCartButton = page.getByRole('button', { name: /Add to cart/ }).first();
    await addToCartButton.scrollIntoViewIfNeeded();
    await addToCartButton.click();
    await page.waitForTimeout(3000);
    
    await homePage.goToCart();
    await page.waitForTimeout(2000);
    
    const itemCount = await cartPage.getCartItemCount();
    
    expect(itemCount).toBeGreaterThan(0);
    
    await page.screenshot({ path: 'test-results/TC_05-view-cart.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});