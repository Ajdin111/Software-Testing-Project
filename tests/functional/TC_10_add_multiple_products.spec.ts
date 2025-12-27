import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('TC_10: Add Multiple Products to Cart', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should successfully add multiple different products to cart', async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
    
    const firstProduct = page.getByRole('button', { name: /Add to cart/ }).nth(0);
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForTimeout(3000);
    
    const cartCountAfterFirst = await homePage.getCartCount();
    console.log(`Cart count after first product: ${cartCountAfterFirst}`);
    
    const secondProduct = page.getByRole('button', { name: /Add to cart/ }).nth(1);
    await secondProduct.scrollIntoViewIfNeeded();
    await secondProduct.click();
    await page.waitForTimeout(3000);
    
    const cartCountAfterSecond = await homePage.getCartCount();
    console.log(`Cart count after second product: ${cartCountAfterSecond}`);
    
    expect(cartCountAfterSecond).toBeGreaterThanOrEqual(2);
    
    await page.screenshot({ path: 'test-results/TC_10-multiple-products.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});