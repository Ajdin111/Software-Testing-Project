import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('TC_07: Login with Empty Password', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    loginPage = new LoginPage(page);
  });

  test('should require password field to be filled', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    await page.getByRole('textbox', { name: 'Username / Email' }).fill('test@example.com');
    
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    const isRequired = await passwordInput.getAttribute('required');
    
    expect(isRequired).not.toBeNull();
    
    await page.screenshot({ path: 'test-results/TC_07-empty-password.png' });
   
  });

  test.afterEach(async ({ context }) => {
    await context.clearCookies();
  });
});