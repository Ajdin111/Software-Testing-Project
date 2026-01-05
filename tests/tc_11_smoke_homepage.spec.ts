import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('TC_11: Smoke Test - Homepage Loads', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should load homepage successfully with all key elements visible', async ({ page }) => {
    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toContain('Your Store');

    const isLogoVisible = await homePage.isLogoVisible();
    expect(isLogoVisible).toBeTruthy();

    const isSearchVisible = await homePage.isSearchBarVisible();
    expect(isSearchVisible).toBeTruthy();

    const isMyAccountVisible = await homePage.isMyAccountVisible();
    expect(isMyAccountVisible).toBeTruthy();

    const isCartVisible = await homePage.isShoppingCartVisible();
    expect(isCartVisible).toBeTruthy();

    const isNavVisible = await homePage.isNavigationMenuVisible();
    expect(isNavVisible).toBeTruthy();

    const isFeaturedVisible = await homePage.isFeaturedSectionVisible();
    expect(isFeaturedVisible).toBeTruthy();

    const productCount = await homePage.getFeaturedProductsCount();
    expect(productCount).toBeGreaterThanOrEqual(4);
  });
});