import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Test data utility for MyBook.ba testing
 * Provides credentials and test data from environment variables
 */

export interface UserCredentials {
  email: string;
  password: string;
}

export interface NewUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  address?: string;
  postcode?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
}

export interface InvalidCredentials {
  invalidEmail: string;
  invalidPassword: string;
  emptyEmail: string;
  emptyPassword: string;
  nonExistentEmail: string;
  wrongPassword: string;
}

export interface SearchData {
  validSearch: string;
  validSearchAlternative: string;
  invalidSearch: string;
  emptySearch: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export class TestData {
  /**
   * Get base URL
   */
  static getBaseUrl(): string {
    return process.env.BASE_URL || 'https://mybook.ba';
  }

  /**
   * Get existing user credentials for login tests
   */
  static getExistingUser(): UserCredentials {
    return {
      email: process.env.TEST_EMAIL || 'test@example.com',
      password: process.env.TEST_PASSWORD || 'password123'
    };
  }

  /**
   * Generate new user credentials for registration tests
   * Uses timestamp to ensure unique email
   */
  static getNewUser(): NewUserData {
    const timestamp = Date.now();
    return {
      firstName: 'Test',
      lastName: 'User',
      email: `testuser${timestamp}@example.com`,
      password: 'TestPassword123!',
      dateOfBirth: '01/01/1990',
      address: 'Test Address 123',
      postcode: '71000',
      city: 'Sarajevo',
      state: 'Federation of Bosnia and Herzegovina',
      country: 'Bosnia and Herzegovina',
      phone: '+387 61 123 456'
    };
  }

  /**
   * Get invalid login credentials for negative tests
   */
  static getInvalidCredentials(): InvalidCredentials {
    return {
      invalidEmail: 'notanemail',
      invalidPassword: 'wrong',
      emptyEmail: '',
      emptyPassword: '',
      nonExistentEmail: 'nonexistent@example.com',
      wrongPassword: 'WrongPassword123!'
    };
  }

  /**
   * Get search test data
   */
  static getSearchData(): SearchData {
    return {
      validSearch: 'filozofija',
      validSearchAlternative: 'roman',
      invalidSearch: 'xyzabc123notfound',
      emptySearch: ''
    };
  }

  /**
   * Get contact form test data
   */
  static getContactFormData(): ContactFormData {
    return {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      subject: 'Test Subject',
      message: 'This is a test message for contact form validation.'
    };
  }

  /**
   * Wait times for common scenarios (in milliseconds)
   */
  static getWaitTimes() {
    return {
      short: 1000,
      medium: 3000,
      long: 5000,
      navigation: 2000
    };
  }
}