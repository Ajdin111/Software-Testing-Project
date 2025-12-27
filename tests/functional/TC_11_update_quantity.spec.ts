import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';

test.describe('TC_11: Update Product Quantity in Cart', () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigateToHome();
  });

  test('should successfully update product quantity in cart', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const addToCartButton = page.getByRole('button', { name: /Add to cart/ }).first();
    await addToCartButton.scrollIntoViewIfNeeded();
    await addToCartButton.click();
    await page.waitForTimeout(3000);
    
    await homePage.goToCart();
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
    
    const initialQuantity = await cartPage.getItemQuantity(0);
    console.log(`Initial quantity: ${initialQuantity}`);
    
    await cartPage.updateItemQuantity(0, 3);
    await page.waitForTimeout(3000);
    
    const updatedQuantity = await cartPage.getItemQuantity(0);
    console.log(`Updated quantity: ${updatedQuantity}`);
    
    expect(updatedQuantity).toBe(3);
    
    await page.screenshot({ path: 'test-results/TC_11-update-quantity.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});