import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';

test.describe('TC_09: Registration with Existing Email', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
  });

  test('should display error for existing email', async ({ page }) => {
    await registrationPage.register(
      'John',
      'Doe',
      'mujko@gmail.com',
      '12345678',
      'password123'
    );

    await page.waitForTimeout(1000);

    const isErrorVisible = await registrationPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();

    const errorMessage = await registrationPage.getErrorMessage();
    expect(errorMessage).toContain('Warning');
  });
});