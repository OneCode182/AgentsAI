# Test Automation Patterns for Tecnipass

## Page Object Model (POM) Lite
While we aim for 1 file per test Case, common logic (like Login or Navigation) should be abstracted if it's reused across dozens of tests. However, for specific use cases, keep the logic local to avoid "abstraction hell".

### The "Role Setup" Pattern
Always encapsulate authentication in a reusable way or a `beforeEach` block using environment variables.

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/auth/login');
  await page.locator('[data-test="email-input"]').fill(process.env.TEST_USER_EMAIL!);
  await page.locator('[data-test="password-input"]').fill(process.env.TEST_USER_PASSWORD!);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/.*dashboard/);
});
```

## Resilience Patterns

### 1. The "Signal Waiter"
Instead of waiting for a fixed time, wait for a specific element that appears only after an action is complete.

```typescript
// Good: Wait for the toast message
await page.locator('[data-test="save-button"]').click();
await expect(page.locator('[data-test="success-toast"]')).toBeVisible();

// Better: Wait for API response + UI change
const responsePromise = page.waitForResponse(response =>
  response.url().includes('/api/contracts') && response.status() === 200
);
await page.locator('[data-test="save-button"]').click();
await responsePromise;
await expect(page.locator('[data-test="contract-list"]')).toBeVisible();
```

### 2. The "Clean State" Pattern
Ensure each test starts with a clean slate. Use `page.goto('/')` or clear cookies if necessary, though Playwright contexts handle this mostly by default.

## Data Driven Patterns
Use `.env` for dynamic data that might change between environments (Dev, Staging, Local).

- `TEST_EMPLOYEE_EMAIL`
- `TEST_ADMIN_EMAIL`
- `BASE_URL` (usually handled by `playwright.config.ts`)

## Debugging Workflow (The "Loop")
When a test fails during development:
1. **Analyze Traces**: Run with `--trace on` and inspect the `.zip` file.
2. **Visual Inspection**: Use `await page.pause()` or run in headed mode (`--headed`).
3. **Selector Validation**: Use the Playwright Inspector to verify the `data-test` attribute exists and is unique.

## Cleanup Pattern
If a test creates an entity (e.g., a new contract), try to delete it at the end of the test or using an `afterAll` hook if the API allows it, to keep the environment stable.
