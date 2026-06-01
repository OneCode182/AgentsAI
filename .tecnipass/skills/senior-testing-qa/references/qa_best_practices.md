# QA Best Practices for Tecnipass

## Core Principles

### 1. Zero Tolerance for Flakiness
A test that fails randomly is worse than no test at all. Always use auto-retrying assertions and avoid hard-coded timeouts.

### 2. Selective Testing (CUJ)
Focus on **Critical User Journeys**. Do not attempt to test every single UI permutation. If a bug in a feature would block a user from completing their goal, it must be covered by an E2E test.

### 3. Role-Based Access Control (RBAC)
Tecnipass heavily relies on roles (Employee, Resident, System Admin). Every test must:
- Start with the correct role.
- Verify that restricted areas are indeed inaccessible.
- Validate that the UI reflects the user's permissions.

## Implementation Standards

### Locators
- **Preference Order**: `data-test` > `getByRole` > `getByText`.
- **Avoid**: CSS classes, IDs (unless unique and stable), and XPath.

```typescript
// Good
await page.locator('[data-test="submit-button"]').click();

// Acceptable (if data-test is missing)
await page.getByRole('button', { name: 'Submit' }).click();

// Bad
await page.locator('.btn-primary').click();
```

### Assertions
- Always use `expect(locator).toBeVisible()` or similar async matchers.
- Use `toBeEditable()`, `toBeDisabled()`, `toHaveValue()` to validate form states.

### Environment & Data
- Use `process.env` for credentials (e.g., `TEST_EMPLOYEE_EMAIL`).
- Ensure the `webServer` is running (usually `pnpm dev` on `http://localhost:5173`).
- Clean up data if the test modifies global state, although isolation is preferred.

## Performance & Stability

- **Parallelism**: Tests should be able to run in parallel. Avoid global state dependencies.
- **Retries**: Configured in `playwright.config.ts`. Locally, we aim for 0 retries (first-time pass).
- **Traces**: Essential for debugging failures in CI or loop execution. Use `trace: 'on-first-retry'` or `'retain-on-failure'`.

## Prohibited Patterns (Anti-Patterns)
- `page.waitForTimeout(n)`: Never use sleep. Wait for an element or a network response.
- Testing Third-Party Integrations: Mock external APIs (Stripe, Twilio) unless it's a dedicated integration project.
- Long Chains: Keep tests focused. A test should ideally cover one complete user goal.
