import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('TC_02: User Login with Valid Credentials', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('mujko@gmail.com', '123456');

    await page.waitForURL('**account/account');

    const currentURL = page.url();
    expect(currentURL).toContain('account/account');

    const pageTitle = await page.title();
    expect(pageTitle).toContain('My Account');
  });
});