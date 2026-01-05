import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('TC_08: Login with Invalid Credentials', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should display error message for invalid credentials', async ({ page }) => {
    await loginPage.login('oka@gmail.com', 'wrongpassword');

    await page.waitForTimeout(1000);

    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Warning');
  });
});