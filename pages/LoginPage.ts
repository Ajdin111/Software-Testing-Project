import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { NewUserData } from '../utils/testData';

/**
 * LoginPage - Handles login and registration functionality
 */
export class LoginPage extends BasePage {
  readonly selectors = {
    // Login button in header
    loginButton: 'text=Login',
    
    // Login form fields
    emailInput: 'input[type="email"], input[name="email"]',
    passwordInput: 'input[type="password"], input[name="password"]',
    loginSubmitButton: 'button[type="submit"]:has-text("Login"), input[type="submit"]',
    
    // Registration link
    signUpLink: 'text=Sign Up, a[href*="register"]',
    
    // Registration form fields
    registerFirstName: 'input[name="first_name"], input[name="firstName"]',
    registerLastName: 'input[name="last_name"], input[name="lastName"]',
    registerEmail: 'input[name="email"][type="email"]',
    registerPassword: 'input[name="password"][type="password"]',
    registerDateOfBirth: 'input[name="dob"], input[name="date_of_birth"]',
    registerAddress: 'input[name="address"]',
    registerPostcode: 'input[name="postcode"], input[name="zip"]',
    registerCity: 'input[name="city"]',
    registerState: 'input[name="state"]',
    registerCountry: 'input[name="country"]',
    registerPhone: 'input[name="phone"], input[type="tel"]',
    termsCheckbox: 'input[type="checkbox"]',
    registerSubmitButton: 'button[type="submit"]:has-text("Sign Up")',
    
    // Error messages
    errorMessage: '.error, .alert, [class*="error"], [class*="alert"]',
    
    // Success indicators
    userAccountMenu: '.user-menu, [class*="user"], [class*="account"]',
    logoutButton: 'text=Logout'
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('/');
    await this.click(this.selectors.loginButton);
    await this.waitForNavigation();
  }

  /**
   * Login with credentials
   */
  async login(email: string, password: string): Promise<void> {
    await this.navigateToLogin();
    await this.fill(this.selectors.emailInput, email);
    await this.fill(this.selectors.passwordInput, password);
    await this.click(this.selectors.loginSubmitButton);
    await this.waitForNavigation();
  }

  /**
   * Navigate to registration page
   */
  async navigateToRegister(): Promise<void> {
    await this.navigateToLogin();
    await this.click(this.selectors.signUpLink);
    await this.waitForNavigation();
  }

  /**
   * Register new user
   */
  async register(userData: NewUserData): Promise<void> {
    await this.navigateToRegister();
    
    // Fill registration form
    await this.fill(this.selectors.registerFirstName, userData.firstName);
    await this.fill(this.selectors.registerLastName, userData.lastName);
    await this.fill(this.selectors.registerEmail, userData.email);
    await this.fill(this.selectors.registerPassword, userData.password);
    
    if (userData.dateOfBirth) {
      await this.fill(this.selectors.registerDateOfBirth, userData.dateOfBirth);
    }
    if (userData.address) {
      await this.fill(this.selectors.registerAddress, userData.address);
    }
    if (userData.postcode) {
      await this.fill(this.selectors.registerPostcode, userData.postcode);
    }
    if (userData.city) {
      await this.fill(this.selectors.registerCity, userData.city);
    }
    if (userData.state) {
      await this.fill(this.selectors.registerState, userData.state);
    }
    if (userData.country) {
      await this.fill(this.selectors.registerCountry, userData.country);
    }
    if (userData.phone) {
      await this.fill(this.selectors.registerPhone, userData.phone);
    }
    
    // Accept terms
    await this.check(this.selectors.termsCheckbox);
    
    // Submit
    await this.click(this.selectors.registerSubmitButton);
    await this.waitForNavigation();
  }

  /**
   * Fill only email field (for negative tests)
   */
  async fillEmail(email: string): Promise<void> {
    await this.fill(this.selectors.emailInput, email);
  }

  /**
   * Fill only password field (for negative tests)
   */
  async fillPassword(password: string): Promise<void> {
    await this.fill(this.selectors.passwordInput, password);
  }

  /**
   * Click login submit button
   */
  async clickLoginSubmit(): Promise<void> {
    await this.click(this.selectors.loginSubmitButton);
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.selectors.userAccountMenu);
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.selectors.errorMessage, 5000);
    return await this.getText(this.selectors.errorMessage);
  }

  /**
   * Check if error message is displayed
   */
  async hasError(): Promise<boolean> {
    return await this.isVisible(this.selectors.errorMessage);
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    if (await this.isLoggedIn()) {
      await this.click(this.selectors.logoutButton);
      await this.waitForNavigation();
    }
  }

  /**
   * Clear login form
   */
  async clearLoginForm(): Promise<void> {
    await this.clearInput(this.selectors.emailInput);
    await this.clearInput(this.selectors.passwordInput);
  }
}