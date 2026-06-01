# TanStack Form (React) – Project Instructions for AI Agents

Purpose: Standardize how forms are built, validated, wired to UI, and submitted across this project using @tanstack/react-form v1.21+. Replace ad‑hoc## Do vs Don't (updated with new components)
Don't (anti-pattern)
- useState for form field values, validation state, or UI toggles
- Manually compute validity with useMemo and maintain touched flags
- Pass raw field.state.meta.errors directly to errorMessage
- Use native HTML icons without FieldIcon wrapper
- Manually parse error objects - use useErrorParser
- Toggle submit disabled state by ad-hoc booleans

Do (required)
- useForm for values and validation; local Zod validators in `*.validators.tsx` file
- Render fields with <form.Field> and wire to HeroUI Input/Checkbox/Button
- Use FieldError component with useErrorParser for error display
- Use FieldIcon component for consistent icon styling and state-based colors
- Use validators on fields (e.g., onBlur) and errorMap/errors for messages
- Keep UI-only state via <form.Subscribe selector={(s)=>s.isValid}> for submit button
- Toggle auxiliary booleans (e.g., showPassword) via form.setFieldValue
- Use React Query mutations for submit lifecycles; connect isPending to UI state
- Use dataAttr for data-* attributes on form wrappers and loading states
- Separate stateSchema (input types) from validationSchema (with transformations)with a single, typed form source of truth that handles values, validation, reactivity, and submission.

Core contract
- Library: @tanstack/react-form (v1.x). Validation via Standard Schema (Zod v4).
- One form instance per screen or logical form.
- Render with form.Field and subscribe with form.Subscribe/useStore.
- Validation lives on fields and/or the form (validators). Dynamic validation requires validationLogic.
- Transform output data on submit (schemas don’t auto-transform values in the form state).

Do not
- Do not manage field state with React useState/useMemo for validity, touched, etc.
- Do not compute global form validity manually.
- Do not mutate DOM state (e.g., native reset) without coordinating with form.reset().

References (keep these open when implementing)
- Basic concepts: https://tanstack.com/form/latest/docs/framework/react/guides/basic-concepts
- Validation: https://tanstack.com/form/latest/docs/framework/react/guides/validation
- Dynamic validation: https://tanstack.com/form/latest/docs/framework/react/guides/dynamic-validation
- Async initial values: https://tanstack.com/form/latest/docs/framework/react/guides/async-initial-values
- Arrays: https://tanstack.com/form/latest/docs/framework/react/guides/arrays
- Linked fields: https://tanstack.com/form/latest/docs/framework/react/guides/linked-fields
- Reactivity: https://tanstack.com/form/latest/docs/framework/react/guides/reactivity
- Listeners: https://tanstack.com/form/latest/docs/framework/react/guides/listeners
- Submission handling: https://tanstack.com/form/latest/docs/framework/react/guides/submission-handling

## Quick start recipe (pattern to replicate)
1) Create a typed form instance
- useForm({ defaultValues, onSubmit }) typed by a Zod “state schema” (input types) kept next to the page (see `app/pages/login/login.validators.tsx`).

2) Render fields via render-prop API
- <form.Field name="path.to.value"> children={(field) => …} </form.Field>
- Bind HeroUI inputs: value={field.state.value}, onValueChange={field.handleChange}, onBlur={field.handleBlur}.
- Display errors using FieldError component with useErrorParser hook.

3) Subscribe for UI-only reactive bits
- Use <form.Subscribe selector={...}> to derive canSubmit/isSubmitting or any derived UI state. Prefer Subscribe for UI to avoid whole-component rerenders.

4) Submit correctly
- Prevent default in the HTML form onSubmit and call form.handleSubmit(meta?). Use onSubmitMeta to pass submit variants. Transform output with schema.parse() if you need coerced types.

5) Keep side effects out of render
- Use listeners (onChange/onBlur) for cross-field side effects (e.g., reset dependent fields), and validation callbacks for validation only.

## HeroUI wiring (required)
- Always use HeroUI controls (Input, Checkbox, Select, Button, Form) over native.
- Always set Input props from field APIs:
	- name={field.name}
	- value={field.state.value}
	- onValueChange={field.handleChange}
	- onBlur={field.handleBlur}
	- isInvalid={!field.state.meta.isValid}
	- errorMessage={<FieldError errors={parseFieldErrors(field.state.meta.errors)} />}
- Use dataAttr for state data-* attributes on wrappers: data-loading={dataAttr(loginMutation.isPending)}.

## Project Components (required)

### FieldError Component
Advanced error display component with tooltips and multiple error support:

```tsx
import { FieldError } from '@shared/components/field-error/field-error.component';
import { useErrorParser } from '@shared/utility/errors';

// In your form field
const { parseFieldErrors } = useErrorParser();

<Input
  // ... other props
  errorMessage={
    <FieldError
      errors={parseFieldErrors(field.state.meta.errors)}
      maxDisplayLength={60}
      color="danger"
      size="sm"
      showCounter={true}
    />
  }
/>
```

**Features:**
- Tooltip support for long error messages
- Error counter for multiple validation errors
- Configurable display length and styling
- Dark mode support
- Accessible tooltip with proper ARIA attributes

### FieldIcon Component
Smart icon component that changes color based on field validation state:

```tsx
import { FieldIcon } from '@shared/components/field-icon/field-icon.component';
import { EnvelopeSimpleIcon } from '@phosphor-icons/react';

<Input
  startContent={
    <FieldIcon>
      <EnvelopeSimpleIcon size={18} />
    </FieldIcon>
  }
/>
```

**Features:**
- Automatic color change based on `data-invalid` attribute
- Consistent icon styling across forms
- No manual state management required

### useErrorParser Hook
Standardizes error parsing from various TanStack Form error formats:

```tsx
import { useErrorParser } from '@shared/utility/errors';

const { parseFieldErrors } = useErrorParser();

// Converts any error format to string[]
const errors = parseFieldErrors(field.state.meta.errors);
```

**Supported formats:**
- `string` - Single error message
- `string[]` - Array of error messages
- Zod error objects with `message` property
- Mixed error formats from async validations

### dataAttr Utility
Converts boolean conditions to data attributes for styling:

```tsx
import { dataAttr } from '@shared/utility/props';

// Use in JSX
<div data-loading={dataAttr(isLoading)}>
  <Form data-submitting={dataAttr(form.state.isSubmitting)}>
```

## Validation strategy
- Field-level: validators={{ onChange, onBlur, onChangeAsync, onBlurAsync }} — return string | object | undefined. Errors accumulate in meta.errors and meta.errorMap.
- Form-level: pass validators to useForm({ validators }) for cross-field or global rules. You can set field errors by returning { form?: string, fields?: Record<string, string> } from form validators (commonly onSubmitAsync).
- Standard Schema: pass Zod schemas to validators (supports Standard Schema). Note: Validation uses input types; it doesn’t transform values in form state.
- Async debouncing: prefer asyncDebounceMs at field or the more granular onChangeAsyncDebounceMs/onBlurAsyncDebounceMs.

## Schema Structure (updated pattern)
Use separate schemas for input types and validation/transformation:

```tsx
// Input types (for form state)
const stateSchema = z.object({
  email: z.string(),
  password: z.string(),
  showPassword: z.boolean(),
  rememberMe: z.boolean(),
});

// Validation rules (composable with z.pipe)
const validationRules = {
  email: z.pipe(
    z.string().min(1, { error: 'Email is required' }),
    z.email({ error: 'Invalid email address' })
  ),
  password: z.string().nonempty('Password is required').min(8, {
    error: 'Password must be at least 8 characters long'
  }),
};

// Output schema (with transformations)
const validationSchema = z.object({
  email: validationRules.email,
  password: validationRules.password,
  showPassword: z.boolean(),
  rememberMe: z.boolean(),
}).transform((data) => {
  // Clean/transform output data
  return { email: data.email, password: data.password };
});

export const LoginForm = {
  stateSchema,
  validationRules,
  validationSchema,
};
```

Display rules
- Show errors using FieldError component with useErrorParser
- Disable submit via form.Subscribe selector={(s) => s.isValid} and use isDisabled on buttons
- Use dataAttr for loading states: data-loading={dataAttr(mutation.isPending)}

## Dynamic validation (after first submit, different rules)
- Add validationLogic: revalidateLogic({ mode, modeAfterSubmission }) to useForm to enable onDynamic.
- Provide validators.onDynamic/onDynamicAsync at form or field level to change rules/reactivity based on submission lifecycle.

## Linked fields (re-validate when another field changes)
- Use validators.onChangeListenTo / onBlurListenTo on a field to re-run its validation when another field changes/blur: e.g., confirmPassword listens to ["password"].

## Listeners (side-effects, not validation)
- Field listeners: listeners={{ onChange, onBlur, onMount }} for imperative effects (e.g., reset province when country changes). Use onChangeDebounceMs/onBlurDebounceMs for API calls.
- Form listeners: onMount/onSubmit plus onChange/onBlur propagated from any field with access to { formApi, fieldApi }.

## Arrays
- Use <form.Field name="items" mode="array"> to manage lists.
- Mutations: field.pushValue(value), field.removeValue(index), field.swapValues(a,b), field.moveValue(from,to).
- Nested fields use bracket notation: name={`items[${i}].name`}.

## Async initial values (with TanStack Query)
- Fetch with useQuery and derive defaultValues from data inside useForm. Gate render with the query’s isLoading and show a loader in the meantime. This ensures initial values are stable at first render.

## Submission handling and data transformation
- Use onSubmitMeta + form.handleSubmit(meta) to pass submit variants (e.g., { submitAction: 'continue' | 'backToMenu' }). Provide onSubmitMeta default shape on the form.
- Transform/coerce in onSubmit using your Zod schema: const output = schema.parse(value). Form preserves input types during edit; parsing ensures final output types.

## React Query Integration (new pattern)
Connect form submission with React Query mutations:

```tsx
const loginMutation = useMutation({
  mutationKey: ['login'],
  mutationFn: async (data: LoginOutput) => {
    // API call logic
  },
});

const loginForm = useForm({
  // ... form config
  onSubmit: async (values) => {
    const output = LoginForm.validationSchema.parse(values);
    await loginMutation.mutateAsync(output);
  },
});

// In JSX
<Form data-loading={dataAttr(loginMutation.isPending)}>
  <Button
    isDisabled={!isFormValid || loginMutation.isPending}
    isLoading={loginMutation.isPending}
  >
    Submit
  </Button>
</Form>
```

## Reset behavior
- Avoid native <button type="reset"> without preventing default: it can desync with TanStack Form. Prefer a type="button" or intercept onClick to call event.preventDefault() then form.reset().

## Performance guidance (applies to forms)
- Prefer form.Subscribe for UI reactivity; use useStore(form.store, selector) only when you need values in component logic. Always provide a selector.
- Keep handlers stable with useCallback; avoid creating new functions inline except the render prop children for Field/Subscribe.
- Avoid lifting form state to React state. The form instance is the single source of truth.

## Do vs Don’t (extracted from the login example)
Don’t (anti-pattern)
- useState for email/password/remember/touched/showPassword
- Manually compute validity with useMemo and maintain touched flags
- Toggle submit disabled state by ad-hoc booleans

Do (required)
- useForm for values and validation; local Zod validators in a `*.validators.tsx` file
- Render fields with <form.Field> and wire to HeroUI Input/Checkbox
- Use validators on fields (e.g., onBlur) and errorMap/errors for messages
- Keep UI-only state via <form.Subscribe selector={(s)=>s.isValid}> for submit button
- Toggle auxiliary booleans (e.g., showPassword) via form.setFieldValue
- Use React Query mutations for submit lifecycles; connect isPending to UI state

## Project conventions
- Validation schemas & rules: colocate next to the page as `*.validators.tsx` (see `app/pages/login/login.validators.tsx`).
- HeroUI only for UI primitives; Tailwind via cn utility; use dataAttr for data-* attributes.
- Accessibility: wrap inputs with <Form validationBehavior="aria"> and prefer aria-disabled over disabled when gating actions by validity.
- Error handling: Always use FieldError + useErrorParser for consistent error display.
- Icons: Use FieldIcon wrapper for state-aware icon coloring.
- Loading states: Connect React Query mutation states to form UI with dataAttr.

## Minimal implementation checklist
- [ ] Define stateSchema (input types) and validation rules/schemas with Zod in `*.validators.tsx`
- [ ] Create useForm({ defaultValues, onSubmit, validators? })
- [ ] Render each field with <form.Field> and wire to HeroUI Input/Checkbox/Button
- [ ] Add FieldError component with useErrorParser for error display
- [ ] Add FieldIcon component for icons with automatic state-based coloring
- [ ] Add validators: onBlur/onChange and async variants with debouncing when necessary
- [ ] Add dynamic validation by supplying validationLogic if needed
- [ ] Use linked-field listeners (onChangeListenTo/onBlurListenTo) for confirm patterns
- [ ] Manage arrays with mode="array" and field push/remove/swap/move helpers
- [ ] Use <form.Subscribe> to drive submit button state and other UI reactions
- [ ] Handle submit with form.handleSubmit(meta?) and transform output via schema.parse(value)
- [ ] Integrate React Query mutations for loading states and error handling
- [ ] Use dataAttr for data-* attributes on form wrappers
- [ ] Guard against native reset issues; call form.reset() explicitly

## Example alignment
- For a working reference, see the Login page at `app/pages/login/login.page.tsx` and its validators at `app/pages/login/login.validators.tsx`.
- FieldError component: `app/shared/components/field-error/field-error.component.tsx`
- FieldIcon component: `app/shared/components/field-icon/field-icon.component.tsx`
- Error utilities: `app/shared/utility/errors.ts`
- Props utilities: `app/shared/utility/props.ts`