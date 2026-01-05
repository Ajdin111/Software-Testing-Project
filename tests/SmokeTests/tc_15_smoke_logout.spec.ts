import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';

test.describe('TC_15: Smoke Test - User Can Logout', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    
    await loginPage.navigate();
    await loginPage.login('mujko@gmail.com', '123456');
    await page.waitForURL('**account/account');
  });

  test('should logout user successfully', async ({ page }) => {
    await homePage.clickMyAccount();
    await homePage.clickLogout();

    await page.waitForURL('**account/logout');

    const currentURL = page.url();
    expect(currentURL).toContain('account/logout');

    const pageHeading = await page.locator('#content h1').textContent();
    expect(pageHeading).toContain('Account Logout');
  });
});