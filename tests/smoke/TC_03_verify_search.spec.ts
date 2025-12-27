import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';
import { TestData } from '../../utils/testData';

test.describe('TC_03: Verify Search Functionality', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.navigateToHome();
  });

  test('should display search results for valid keyword', async ({ page }) => {
    const searchData = TestData.getSearchData();
    
    await homePage.search(searchData.validSearch);
    await page.waitForTimeout(2000);
    
    const hasResults = await searchPage.hasResults();
    const resultCount = await searchPage.getResultCount();
    
    
    expect(hasResults).toBeTruthy();
    expect(resultCount).toBeGreaterThan(0);
    
    await page.screenshot({ path: 'test-results/TC_03-search-results.png' });
  });
});