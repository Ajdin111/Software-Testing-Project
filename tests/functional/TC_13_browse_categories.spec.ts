import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('TC_13: Browse Product Categories', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should successfully navigate to product category', async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.waitForLoadState('networkidle');
    
    await homePage.navigateToCategory('Knjige za odrasle');
    
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
    
    const currentUrl = await page.url();
    console.log(`Current URL: ${currentUrl}`);
    
    const productCount = await homePage.getProductCount();
    console.log(`Products found: ${productCount}`);
    
    expect(currentUrl).toContain('knjige-za-odrasle');
    expect(productCount).toBeGreaterThan(0);
    
    await page.screenshot({ path: 'test-results/TC_13-browse-category.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});