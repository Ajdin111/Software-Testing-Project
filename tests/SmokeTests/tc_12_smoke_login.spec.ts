import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('TC_12: Smoke Test - User Can Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should allow user to login with valid credentials', async ({ page }) => {
    await loginPage.login('mujko@gmail.com', '123456');

    await page.waitForURL('**account/account');

    expect(page.url()).toContain('account/account');
  });
});