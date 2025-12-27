import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TestData } from '../../utils/testData';

test.describe('TC_02: Verify User Registration', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    loginPage = new LoginPage(page);
  });

  test('should successfully register a new user', async ({ page }) => {
    const newUser = TestData.getNewUser();
    
    await loginPage.register(newUser);
    
    const isLoggedIn = await loginPage.isLoggedIn();
    
    expect(isLoggedIn).toBeTruthy();
    
    await page.screenshot({ path: 'test-results/TC_02-after-registration.png' });
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});