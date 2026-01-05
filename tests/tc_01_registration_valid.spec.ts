import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('TC_01: User Registration with Valid Data', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
  });

  test('should register user successfully with valid data', async ({ page }) => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;

    await registrationPage.register(
      'John',
      'Doe',
      email,
      '1234567890',
      'password123'
    );

    await page.waitForURL('**account/success');

    const currentURL = page.url();
    expect(currentURL).toContain('account/success');

    const successHeading = await page.locator('#content h1').textContent();
    expect(successHeading).toContain('Your Account Has Been Created');
  });
});