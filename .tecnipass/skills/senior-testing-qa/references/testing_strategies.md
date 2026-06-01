# Testing Strategies for Tecnipass Frontend

## The Testing Pyramid
While this skill focuses on E2E, remember the pyramid:
- **Unit Tests**: Logic and utilities (fast).
- **Component Tests**: UI components (shadcn/ui, custom components).
- **E2E Tests**: Critical User Journeys (slow, but high confidence).

**Strategy**: If a bug can be caught by a unit test, don't write an E2E test for it. Use E2E for integration and flow validation.

## E2E Scoping Strategy

### 1. Happy Path (Primary Flow)
Always test the most common successful path for the given Role.
- *Example*: Employee logs in -> searches for a resident -> creates a meeting.

### 2. Negative Testing (Guardrails)
Test that the application handles errors gracefully and respects RBAC.
- *Example*: Employee tries to access System Admin settings -> gets redirected or sees 403.
- *Example*: Submitting a form with missing required fields -> sees validation messages.

### 3. State Persistence
Verify that actions have lasting effects.
- *Example*: Create a contract -> reload the page -> verify the contract is still in the list.

## Automation Workflow

1. **Prerequisites Check**: Ensure `pnpm install` was run and Node version is correct.
2. **Local Execution**: Run specific tests using the `--project=chromium` flag for speed.
3. **CI Alignment**: Ensure tests pass in the `html` reporter and traces are captured.

## Selector Guideline (Tecnipass)
Always priority:
1. `[data-test="unique-id"]`
2. `[data-test="shared-component"] >> text="Specific Text"`
3. `getByRole('button', { name: 'Action' })`

## RBAC Verification Strategy
For every major feature, we must verify:
- **Visibility**: Elements only shown to allowed roles.
- **Access**: URL routes protected at the server/client level.
- **Action**: Buttons or API calls rejected for unauthorized roles.

## Success Metrics
- **Stability**: < 1% fail rate on stable environments.
- **Execution Time**: Individual tests should not exceed 60 seconds (configured in `playwright.config.ts`).
- **Coverage**: 100% of defined "Critical User Journeys" must have an automated test.
