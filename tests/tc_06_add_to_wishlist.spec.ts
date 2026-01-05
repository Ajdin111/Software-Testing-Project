import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';

test.describe('TC_06: Add Product to Wish List', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    
    await loginPage.navigate();
    await loginPage.login('mujko@gmail.com', '123456');
    await page.waitForURL('**account/account');
    
    await productPage.navigateToMacBook();
  });

  test('should add product to wishlist successfully', async ({ page }) => {
    await productPage.clickAddToWishlist();

    await page.waitForTimeout(1000);

    const isAlertVisible = await productPage.isSuccessAlertVisible();
    expect(isAlertVisible).toBeTruthy();

    const successMessage = await productPage.getSuccessMessage();
    expect(successMessage).toContain('Success');
  });
});