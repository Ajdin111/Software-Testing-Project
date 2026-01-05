import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

test.describe('TC_03: Search for Existing Product', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.navigate();
  });

  test('should display search results for existing product', async ({ page }) => {
    await searchPage.searchProduct('MacBook');

    await page.waitForURL('**product/search**');

    const resultsCount = await searchPage.getProductResultsCount();
    expect(resultsCount).toBeGreaterThan(0);

    const pageHeading = await searchPage.getPageHeading();
    expect(pageHeading).toContain('MacBook');

    const productTitles = await searchPage.getProductTitles();
    const hasMacBook = productTitles.some(title => title.toLowerCase().includes('macbook'));
    expect(hasMacBook).toBeTruthy();
  });
});