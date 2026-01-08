# E2E Testing Instructions

## Overview

End-to-End (E2E) testing in this project follows a **role-based use case testing strategy**. The primary principle is:

> **Test each use case for each role in the application**

This ensures that every feature works correctly for the specific user roles that have access to it, considering their permissions and workflows.

## Test Organization

### Directory Structure

Tests are organized by role in the `./tests` directory:

```
tests/
├── system-admin/         # System Administrator role tests
├── employee/             # Employee role tests
└── other-roles/          # Additional role tests
```

Each role directory contains test files that correspond to specific use cases or features:

```
tests/system-admin/
├── view-home-page.use-case.spec.ts
├── create-property.use-case.spec.ts
├── manage-users.use-case.spec.ts
└── ...
```

### Naming Convention

Test files follow the pattern: `{feature}.use-case.spec.ts`

Examples:
- `view-home-page.use-case.spec.ts`
- `login.use-case.spec.ts`
- `create-property.use-case.spec.ts`
- `manage-users.use-case.spec.ts`

## Playwright Configuration

### Base Configuration

Playwright is configured in `playwright.config.ts` with the following key settings:

```typescript
{
  testDir: './tests',          // Tests location
  fullyParallel: true,         // Run tests in parallel
  baseURL: 'http://localhost:5173',
  trace: 'on-first-retry',     // Collect trace on failed retries
  workers: 1,                  // Single worker on CI
}
```

### Supported Browsers

- **Chromium** (Desktop)
- **Firefox** (Desktop)
- WebKit is disabled

### Development Server

Playwright automatically starts the dev server before running tests:

```bash
pnpm dev  # Automatically started by Playwright
```

## Running Tests

### Commands

```bash
# Run all E2E tests
npx playwright test

# Run tests for a specific file
npx playwright test tests/system-admin/view-home-page.use-case.spec.ts

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run tests in debug mode (step-through)
npx playwright test --debug

# Show HTML report of last test run
npx playwright show-report
```

## Preparing TSX Components for Testing

### Data-Test Attributes

All interactive elements that will be tested must have `data-test` attributes. These serve as stable selectors that:
- Do not change with styling or class names
- Are intentional and specific to testing
- Clearly identify elements' purpose

### Guidelines

1. **Add data-test attributes to all interactive elements:**

```tsx
// Input elements
<Input
  name='email'
  placeholder='Enter your email'
  data-test='email-input'
/>

// Buttons
<Button
  type='submit'
  data-test='login-button'
>
  Login
</Button>

// Checkboxes
<Checkbox
  id='rememberMe'
  data-test='remember-me-checkbox'
/>

// Links
<a
  href='/forgot-password'
  data-test='forgot-password-link'
>
  Forgot Password?
</a>
```

2. **Name data-test attributes descriptively:**
   - Use kebab-case: `email-input`, `submit-button`, `user-name-field`
   - Include element type when helpful: `email-input`, `login-button`, `welcome-message`
   - Be specific: `forgot-password-link` instead of just `link`

3. **Add data-test to container elements:**

```tsx
// Form wrapper
<form data-test='login-form'>
  {/* fields */}
</form>

// Section containers
<div data-test='quick-access-container'>
  {/* buttons */}
</div>

// Page root
<main data-test='home-route'>
  {/* page content */}
</main>
```

4. **Test-only elements are acceptable:**
   - Data-test attributes do not affect production styling or functionality
   - They are purely for testing purposes
   - Keep them in the component definition (don't remove them)

## Test Structure and Best Practices

### Architectural Standard: Page Object Model (POM)

We enforce the **Page Object Model** pattern to ensure scalability and maintainability.

- **Tests** (`tests/`) describe *what* happens.
- **Pages** (`pages/`) describe *how* interactions happen.

**Why?**
- If the UI changes, we update the selector in **one place** (the Page Class), not in 50 test files.
- Tests become readable English sentences (`loginPage.loginAsAdmin()`).

#### 1. Page Object Structure (`pages/LoginPage.ts`)

```typescript
import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-test="email-input"]');
    this.passwordInput = page.locator('[data-test="password-input"]');
    this.submitButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
    await this.page.waitForURL('**/dashboard');
  }
}
```

#### 2. Test File Format (`tests/auth/login.spec.ts`)

**NEVER use `page.locator('[data-test="..."]')` directly in a test file.**

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Role - Feature/Use Case', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully', async ({ page }) => {
    await loginPage.login('admin@tecnipass.com', 'securepass');
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### Key Testing Patterns

1. **Authentication Strategy**
   - **Prefer API Login**: Use `request.post('/api/login')` in `beforeEach` to set cookies/storage state, bypassing the slow UI login form for non-login tests.
   - Use `setup` projects in `playwright.config.ts` to log in once per role and save the storage state.

2. **Wait for Navigation**
   - Use `page.waitForURL()` after actions that navigate.
   - Use `networkidle` only when absolutely necessary (it makes tests slow).

3. **Visibility Checks**
   - Use `await expect(probing_element).toBeVisible()` (auto-retrying).
   - **Avoid** `isVisible()` boolean checks unless you are specifically testing for non-existence (`not.toBeVisible()`).

4. **User Interactions**
   - Encapsulate complex interactions (e.g., date pickers, drag-and-drop) into helper methods within Page Objects.

## Role-Based Testing Strategy

### Core Principle

Each use case test must verify that:
1. The role has access to the feature
2. The role can perform the required actions
3. The UI elements work as expected for that role
4. Navigation and permissions are correctly enforced

### Implementation Pattern

```typescript
// tests/system-admin/create-property.spec.ts
import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { PropertyPage } from '../../pages/PropertyPage';

test.describe('System Admin - Create Property', () => {
  let dashboardPage: DashboardPage;
  let propertyPage: PropertyPage;

  test.beforeEach(async ({ page }) => {
    // Ideally login via fixture or global setup
    // await loginAsRole(page, 'system-admin'); 
    
    dashboardPage = new DashboardPage(page);
    propertyPage = new PropertyPage(page);
  });

  test('should be able to access create property page', async ({ page }) => {
    // Assert usage of POM methods
    await expect(dashboardPage.createPropertyButton).toBeVisible();
  });

  test('should fill and submit property form', async ({ page }) => {
    await dashboardPage.navigateToCreateProperty();
    
    // Encapsulated form filling
    await propertyPage.createProperty({
        name: 'My Property',
        address: '123 Main St'
    });

    await expect(page).toHaveURL(/properties/);
  });
});
```

### Multi-Role Testing

When a feature should be tested across multiple roles:

```typescript
const roles = ['system-admin', 'property-manager', 'employee'];

roles.forEach((role) => {
  test.describe(`${role} - View Dashboard`, () => {
    test.beforeEach(async ({ page }) => {
      // Use role-based login helper
      // await loginAsRole(page, role);
    });

    test('should see dashboard', async ({ page }) => {
      const dashboard = new DashboardPage(page);
      await expect(dashboard.mainContainer).toBeVisible();
    });
  });
});
```

## Environment Variables

Configure test credentials in a `.env` file or environment:

```bash
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=testpassword
```

Access in tests:

```typescript
const testEmail = process.env.TEST_USER_EMAIL || 'default@example.com';
const testPassword = process.env.TEST_USER_PASSWORD || 'password';
```

## CI/CD Integration

In CI environments:
- Tests run with a single worker (`workers: 1`)
- Tests retry 2 times on failure (`retries: 2`)
- `forbidOnly` is enabled to prevent test.only from being committed

Local development can run tests in parallel for faster feedback.

## Tips and Troubleshooting

### Common Issues

1. **Element not found**
   - Verify data-test attribute exists in component
   - Check element is actually rendered (may require action first)
   - Use `--debug` mode to inspect page state

2. **Navigation timeout**
   - Increase timeout: `await page.waitForURL('...', { timeout: 10000 })`
   - Verify the route exists and is reachable

3. **Flaky tests**
   - Avoid hard waits: use `waitFor()` instead of `wait(1000)`
   - Use `waitForSelector()` or `waitForURL()` for expected changes
   - Check for race conditions in beforeEach hooks

### Debugging

```bash
# Run with headed browser to see what's happening
npx playwright test --headed

# Debug step-by-step
npx playwright test --debug

# View traces from failed tests
npx playwright show-report
```

## Summary

- **Location**: Tests live in `./tests/{role}/` directories
- **Format**: Use `{feature}.use-case.spec.ts` naming
- **Selectors**: Always use `data-test` attributes in TSX
- **Strategy**: Test each use case for each applicable role
- **Runner**: Playwright with automatic dev server startup
- **Execution**: Run with `npx playwright test` commands
