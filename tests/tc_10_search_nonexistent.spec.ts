import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

test.describe('TC_10: Search for Non-Existent Product', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.navigate();
  });

  test('should display no results message', async ({ page }) => {
    await searchPage.searchProduct('XYZ12345ABC');

    await page.waitForURL('**product/search**');

    const isNoResultsVisible = await searchPage.isNoResultsMessageVisible();
    expect(isNoResultsVisible).toBeTruthy();

    const resultsCount = await searchPage.getProductResultsCount();
    expect(resultsCount).toBe(0);
  });
});