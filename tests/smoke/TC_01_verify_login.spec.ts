import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TestData } from '../../utils/testData';

test.describe('TC_01: Verify User Login', () => {
  let loginPage: LoginPage;
  const credentials = TestData.getExistingUser();

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    loginPage = new LoginPage(page);
  });

  test('should display email verification message after login', async ({ page }) => {
    
    await loginPage.login(credentials.email, credentials.password);
    await page.waitForTimeout(2000);

    const hasEmailVerification = await loginPage.hasEmailVerificationMessage();
    
    expect(hasEmailVerification).toBeTruthy();
    
    await page.screenshot({ path: 'test-results/TC_01-email-verification.png' });
  });


});