import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test.describe('TC_07: Submit Contact Form with Valid Data', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigate();
  });

  test('should submit contact form successfully', async ({ page }) => {
    await contactPage.submitContactForm(
      'John Doe',
      'johndoe@example.com',
      'This is a test enquiry message.'
    );

    await page.waitForURL('**information/contact/success');

    const currentURL = page.url();
    expect(currentURL).toContain('contact/success');

    const pageHeading = await page.locator('#content h1').textContent();
    expect(pageHeading).toContain('Contact Us');
  });
});