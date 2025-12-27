import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('TC_08: Add Same Product Twice to Cart', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should increase quantity when adding same product twice', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const addToCartButton = page.getByRole('button', { name: /Add to cart/ }).first();
    await addToCartButton.scrollIntoViewIfNeeded();
    
    await addToCartButton.click();
    await page.waitForTimeout(2000);
    
    const cartCountAfterFirst = await homePage.getCartCount();
    console.log(`Cart count after first add: ${cartCountAfterFirst}`);
    
    await addToCartButton.click();
    await page.waitForTimeout(2000);
    
    const cartCountAfterSecond = await homePage.getCartCount();
    console.log(`Cart count after second add: ${cartCountAfterSecond}`);
    
    expect(cartCountAfterSecond).toBe(2);
    
    await page.screenshot({ path: 'test-results/TC_08-same-product-twice.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});