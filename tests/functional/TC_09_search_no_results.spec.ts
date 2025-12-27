import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';

test.describe('TC_09: Search for Non-Existent Product', () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.navigateToHome();
  });

  test('should display no results message for invalid search', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    await homePage.search('xyzabc123notfound');
    
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
    
    const hasNoResults = await searchPage.hasNoResults();
    const noResultsMessage = await searchPage.getNoResultsMessage();
    
    console.log(`No results: ${hasNoResults}`);
    console.log(`Message: ${noResultsMessage}`);
    
    expect(hasNoResults).toBeTruthy();
    
    await page.screenshot({ path: 'test-results/TC_09-no-results.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});