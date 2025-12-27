import { Page } from '@playwright/test';

/**
 * BasePage - Parent class for all Page Objects
 * Contains common methods and utilities used across all pages
 */
export class BasePage {
  readonly page: Page;
  readonly baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.BASE_URL || 'https://mybook.ba';
  }

  /**
   * Navigate to a specific URL
   */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(`${this.baseURL}${path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  /**
   * Wait for an element to be visible
   */
  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout: timeout
    });
  }

  /**
   * Click an element
   */
  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   */
  async fill(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  /**
   * Get text content of an element
   */
  async getText(selector: string): Promise<string> {
    const text = await this.page.textContent(selector);
    return text || '';
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.isVisible(selector, { timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Wait for a specific amount of time
   */
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Press a key
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Scroll to element
   */
  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(filename: string): Promise<void> {
    await this.page.screenshot({ 
      path: `screenshots/${filename}.png`, 
      fullPage: true 
    });
  }

  /**
   * Get element count
   */
  async getElementCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  /**
   * Check if element contains text
   */
  async containsText(selector: string, text: string): Promise<boolean> {
    const elementText = await this.getText(selector);
    return elementText.includes(text);
  }

  /**
   * Reload the current page
   */
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Go back to previous page
   */
  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Clear input field
   */
  async clearInput(selector: string): Promise<void> {
    await this.page.fill(selector, '');
  }

  /**
   * Select option from dropdown
   */
  async selectOption(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  /**
   * Check if checkbox/radio is checked
   */
  async isChecked(selector: string): Promise<boolean> {
    return await this.page.isChecked(selector);
  }

  /**
   * Check a checkbox
   */
  async check(selector: string): Promise<void> {
    await this.page.check(selector);
  }

  /**
   * Uncheck a checkbox
   */
  async uncheck(selector: string): Promise<void> {
    await this.page.uncheck(selector);
  }
}