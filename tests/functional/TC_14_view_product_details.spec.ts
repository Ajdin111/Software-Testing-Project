import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';

test.describe('TC_14: View Product Details', () => {
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await homePage.navigateToHome();
  });

  test('should successfully view product details page', async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
    
    await homePage.clickFirstProduct();
    
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
    
    const productTitle = await productPage.getProductTitle();
    const productPrice = await productPage.getProductPrice();
    
    console.log(`Product: ${productTitle}`);
    console.log(`Price: ${productPrice}`);
    
    expect(productTitle).toBeTruthy();
    expect(productPrice).toMatch(/\d+,\d+KM/);
    
    await page.screenshot({ path: 'test-results/TC_14-product-details.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});