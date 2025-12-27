import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { NewUserData } from '../utils/testData';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.goto('/');
    await this.waitForNavigation();
    await this.page.locator('#page-container').getByText('Login').click();
    await this.wait(1000);
  }

  async login(email: string, password: string): Promise<void> {
    await this.navigateToLogin();
    
    if (await this.isRateLimited()) {
      const waitTime = await this.getRateLimitWaitTime();
      throw new Error(`Rate limited! ${waitTime}`);
    }
    
    await this.page.getByRole('textbox', { name: 'Username / Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.wait(3000);
    
    if (await this.isRateLimited()) {
      const waitTime = await this.getRateLimitWaitTime();
      throw new Error(`Rate limited! ${waitTime}`);
    }
  }

  async isRateLimited(): Promise<boolean> {
    try {
      return await this.page.getByText(/exceeded maximum login retries/i).isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }

  async getRateLimitWaitTime(): Promise<string> {
    try {
      const message = await this.page.getByText(/try after/i).textContent();
      return message || 'Please wait before trying again';
    } catch {
      return 'Unknown wait time';
    }
  }

  async hasEmailVerificationMessage(): Promise<boolean> {
    try {
      return await this.page.getByText(/check.*email|verify.*email/i).isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  async getEmailVerificationMessage(): Promise<string> {
    try {
      const message = await this.page.getByText(/check.*email|verify.*email/i).textContent();
      return message || 'Please check your email for verification';
    } catch {
      return '';
    }
  }

  async navigateToRegister(): Promise<void> {
    await this.navigateToLogin();
    await this.page.getByRole('listitem').filter({ hasText: 'Sign Up' }).click();
    await this.wait(1000);
}

  async register(userData: NewUserData): Promise<void> {
    await this.navigateToRegister();
    
    await this.page.locator('input[name="xoo_el_reg_email"]').fill(userData.email);
    await this.page.locator('input[name="xoo_el_reg_fname"]').fill(userData.firstName);
    await this.page.locator('input[name="xoo_el_reg_lname"]').fill(userData.lastName);
    await this.page.locator('input[name="xoo_el_reg_pass"]').fill(userData.password);
    await this.page.locator('input[name="xoo_el_reg_pass_again"]').fill(userData.password);
    
    await this.page.getByRole('checkbox').check();
    
    await this.page.getByRole('button', { name: 'SIGN UP' }).click();
    await this.wait(3000);
}

  async fillEmail(email: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Username / Email' }).fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async clickLoginSubmit(): Promise<void> {
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const loginVisible = await this.page.locator('#page-container').getByText('Login').isVisible({ timeout: 3000 });
      return !loginVisible;
    } catch {
      return true;
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      const error = await this.page.locator('.xoo-el-notice, .error').first();
      await error.waitFor({ state: 'visible', timeout: 3000 });
      return await error.textContent() || '';
    } catch {
      return '';
    }
  }

  async hasError(): Promise<boolean> {
    try {
      return await this.page.locator('.xoo-el-notice, .error').first().isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.page.getByText('Logout', { exact: false }).click({ timeout: 3000 });
      await this.wait(2000);
    } catch {
      console.log('Logout not available');
    }
  }

  async clearLoginForm(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Username / Email' }).clear();
    await this.page.getByRole('textbox', { name: 'Password' }).clear();
  }
}