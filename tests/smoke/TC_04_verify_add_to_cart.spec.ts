import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('TC_04: Add Product to Cart', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should successfully add product to cart from homepage', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const addToCartButton = page.getByRole('button', { name: /Add to cart/ }).first();
    await addToCartButton.scrollIntoViewIfNeeded();
    await addToCartButton.click();
    await page.waitForTimeout(3000);
    
    const cartCount = await homePage.getCartCount();
    
    expect(cartCount).toBeGreaterThan(0);
    
    await page.screenshot({ path: 'test-results/TC_04-add-to-cart.png' });
  });
});