import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('TC_06: Login with Invalid Credentials', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    loginPage = new LoginPage(page);
  });

  test('should show verification message with invalid credentials', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    await page.getByRole('textbox', { name: 'Username / Email' }).fill('wrongemail@test.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    await page.waitForTimeout(5000);
    
    const hasVerificationMessage = await page.getByText(/VERIFICATION REQUIRED|verification is required/i).isVisible({ timeout: 10000 });
    
    expect(hasVerificationMessage).toBeTruthy();
    
    await page.screenshot({ path: 'test-results/TC_06-invalid-credentials.png' });
    
    console.log('Verification message displayed for invalid credentials');
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});