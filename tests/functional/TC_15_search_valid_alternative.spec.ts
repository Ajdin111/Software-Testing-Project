import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';
import { TestData } from '../../utils/testData';

test.describe('TC_15: Search with Valid Keyword Alternative', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.navigateToHome();
  });

  test('should display search results for alternative valid keyword', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const searchData = TestData.getSearchData();
    
    await homePage.search(searchData.validSearchAlternative);
    
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
    
    const hasResults = await searchPage.hasResults();
    const resultCount = await searchPage.getResultCount();
    
    console.log(`Search for: ${searchData.validSearchAlternative}`);
    console.log(`Results found: ${resultCount}`);
    
    expect(hasResults).toBeTruthy();
    expect(resultCount).toBeGreaterThan(0);
    
    await page.screenshot({ path: 'test-results/TC_15-search-alternative.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});