import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test.describe('TC_14: Smoke Test - Add to Cart', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.navigateToMacBook();
  });

  test('should add product to cart', async ({ page }) => {
    await productPage.clickAddToCart();

    await productPage.waitForSuccessAlert();

    const isAlertVisible = await productPage.isSuccessAlertVisible();
    expect(isAlertVisible).toBeTruthy();
  });
});