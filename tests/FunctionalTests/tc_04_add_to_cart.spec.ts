import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test.describe('TC_04: Add Product to Shopping Cart', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.navigateToMacBook();
  });

  test('should add product to cart successfully', async ({ page }) => {
    await productPage.clickAddToCart();

    await productPage.waitForSuccessAlert();

    const isAlertVisible = await productPage.isSuccessAlertVisible();
    expect(isAlertVisible).toBeTruthy();

    const successMessage = await productPage.getSuccessMessage();
    expect(successMessage).toContain('Success');
  });
});