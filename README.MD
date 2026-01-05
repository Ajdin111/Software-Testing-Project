
# SE302 – Software Testing Project

## OpenCart Automated Testing Suite

This project is an automated testing suite for the OpenCart e-commerce demo website. It is built using **Playwright with TypeScript** and follows the **Page Object Model (POM)** design pattern to ensure clean, readable, and maintainable test code.

**Website under test:**
[https://naveenautomationlabs.com/opencart](https://naveenautomationlabs.com/opencart)

---

## Project Overview

The goal of this project is to verify the core functionality of an e-commerce platform through automated testing. The test suite covers:

* User registration and authentication
* Product search
* Shopping cart and wishlist actions
* Contact form submission
* Basic smoke tests for critical features

Both positive and negative test scenarios are included to ensure reliability and correctness of the system.

---

## Project Structure

```
├── pages/            Page Object Model classes
├── tests/            Test specifications
├── playwright.config.ts
├── package.json
└── README.md
```

Each page of the application has its own Page Object class, and each test case is written as a separate Playwright test file.

---

## Test Coverage

### Functional Tests

* User registration with valid data
* Login with valid and invalid credentials
* Registration with an existing email
* Search for existing and non-existing products
* Add and remove products from the cart
* Add products to the wishlist
* Submit the contact form

### Smoke Tests

* Homepage loads successfully
* User can log in
* Search functionality works
* Products can be added to the cart
* User can log out

---

## Technologies Used

* Playwright (end-to-end testing framework)
* TypeScript
* Node.js
* Page Object Model (POM)

---

## Setup Instructions

### Prerequisites

* Node.js (version 16 or higher)
* npm
* Git

### Installation

1. Clone the repository

bash
git clone https://github.com/Ajdin111/Software-Testing-Project.git
cd Software-Testing-Project

2. Install dependencies

bash
npm install


3. Install Playwright browsers

bash
npx playwright install


---

## Running Tests

Run all tests:

bash
npx playwright test


Run a specific test:

bash
npx playwright test tests/tc_01_registration_valid.spec.ts


Run tests with browser visible:

bash
npx playwright test --headed


Run tests in UI mode:

bash
npx playwright test --ui


View test report:

bash
npx playwright show-report


---

## Test Design

This project follows the **Page Object Model** pattern:

* Page classes contain locators and page-specific actions
* Tests focus only on test steps and assertions
* Common logic is reused across tests

This approach improves readability, reduces duplication, and makes tests easier to maintain.

---

## Test Data

* Registration tests generate unique email addresses automatically
* For login-related tests, a test user must exist
* Credentials can be hardcoded for simplicity or managed via environment variables

---

## Best Practices Used

* Clear separation between tests and page logic
* Stable and specific selectors
* Independent test cases
* Meaningful assertions
* Reusable and maintainable code

---

## Troubleshooting

* If a locator matches multiple elements, make it more specific
* If tests time out, increase the timeout or wait for elements properly
* If login tests fail, ensure the test user exists
* Registration tests should always use unique emails
