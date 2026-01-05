import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';

test.describe('TC_13: Smoke Test - Search Functionality', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.navigate();
  });

  test('should return search results successfully', async ({ page }) => {
    await searchPage.searchProduct('iPhone');

    await page.waitForURL('**product/search**');

    const resultsCount = await searchPage.getProductResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });
});