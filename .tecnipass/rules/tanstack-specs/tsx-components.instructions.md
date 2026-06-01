# TSX Component Construction Rules

## Standard Component Requirements

1. **Standard Component Props**  
   When implementing a component (not a route, but an actual component like Button, QrCode, etc.), always implement the following standard props:
   - `disabled?: boolean` - Disable the component and provide visual/interaction feedback
   - `isLoading?: boolean` - Disable if necessary and show a pending state
   - `errorMessage?: string` - Display the error with "text-danger" styling and typically a red border or similar visual indicator

2. **ClassNames Prop for Styling Override**  
   Always expose a `classNames` prop that contains classes to be applied to each element of the component. Use the `cn` function from `@shared/lib/utils` to merge classes: `<span className={cn(classNames.subText, styles.subText)}>`

3. **Controlled/Uncontrolled Components with Value**  
   When implementing components that have a value (inputs, selects, etc.), always implement these three props:
   - `value?: T` - The controlled value (where T is the type of the component's value)
   - `defaultValue?: T` - The initial value for uncontrolled mode
   - `onValueChange?: (value: T) => void` - Callback when value changes
   
   Always implement the controlled/uncontrolled logic in the component body:
   ```tsx
   const [internalValue, setInternalValue] = useState(defaultValue ?? getInitialValue());
   const isControlled = value !== undefined;
   const currentValue = isControlled ? value : internalValue;
   
   const handleValueChange = useCallback((newValue: T) => {
     if (!isControlled) {
       setInternalValue(newValue);
     }
     onValueChange?.(newValue);
   }, [isControlled, onValueChange]);
   ```
   
   Where `getInitialValue()` returns the appropriate empty/initial state for the component type (e.g., `""` for strings, `null` for nullable types, `[]` for arrays, etc.). The component can be reset to initial state by setting `value` to `null`, `""`, or the appropriate empty value for that type.

## Component Examples

# TSX Component Rules — Tailwind Variants, Semantic Tokens, and Controllable State

All UI components must use tailwind-variants (tv) with semantic Tailwind tokens and data-* attributes for state styling. No CSS Modules are allowed in components.

## 1) Standard Component Contract

- Use React function components only. Export using named exports. Do not use React.FC.
- Wrap with `memo` and `forwardRef` when the component exposes a DOM element ref.
- Type everything. Avoid `any`.
- Props baseline for visual/state:
  - `color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'`
  - `size?: 'sm' | 'md' | 'lg'`
  - `isDisabled?: boolean`
  - `isLoading?: boolean`
  - `isError?: boolean`
  - `errorMessage?: React.ReactNode`
  - `isRequired?: boolean`
  - `className?: string` (merges with slots.base())
  - `classNames?: Partial<Record<slotName, string>>`

## 2) Styling: tailwind-variants with semantic tokens

- Imports: `import { cn, dataAttr, tv } from '@shared/lib/utils'`.
- Define a tv factory at module scope: `const ComponentVariants = tv({ slots, variants, defaultVariants, compoundVariants })`.
- Use only semantic tokens for color/text/shadow/border/background: e.g., `bg-background`, `text-foreground`, `border-default-300`, `text-danger`.
- No CSS Modules. Remove any `.module.css` imports from components.
- Use slots for sub-elements. Consumers override via `className` and `classNames`.

## 3) State styling with data-* attributes

- Mirror state to data attributes on the root element at minimum:
  - `data-color`, `data-size`, `data-disabled`, `data-loading`, `data-error`, `data-invalid`, `data-filled`, `data-required`.
- Use `dataAttr(Boolean(flag))` for boolean attributes.
- Do not use conditional className strings for state. Drive visuals via data-* selectors in tv definitions.

## 4) Controllable state for input-like components

- Imports: `import { useControllableState } from '@shared/hooks/common'`.
- Props: `value?: T`, `defaultValue?: T`, `onValueChange?: (next: T) => void`.
- Use `useControllableState<T>({ value, defaultValue, onChange: onValueChange })`.
- Derive `isFilled = currentValue != null && String(currentValue).length > 0`.

## 5) Accessibility

- Reflect `isDisabled` to `disabled` attribute when applicable and to `data-disabled`.
- Add `aria-invalid` when `isError || !!errorMessage`.
- Add `aria-required` when `isRequired`.
- Use appropriate roles/aria for non-native widgets.

---

## Example A — Button (non-input)

```tsx
import React, { forwardRef, memo, useCallback } from 'react';
import { tv, cn, dataAttr } from '@shared/lib/utils';
import type { VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  slots: {
    base: 'inline-flex items-center justify-center rounded-medium px-4 py-2 transition-colors duration-200',
    label: 'text-medium text-foreground',
    spinner: 'ml-2 inline-block animate-spin',
    message: 'mt-1 text-medium text-danger',
  },
  variants: {
    color: {
      default: { base: 'bg-default text-default-foreground' },
      primary: { base: 'bg-primary text-primary-foreground' },
      secondary: { base: 'bg-secondary text-secondary-foreground' },
      success: { base: 'bg-success text-success-foreground' },
      warning: { base: 'bg-warning text-warning-foreground' },
      danger: { base: 'bg-danger text-danger-foreground' },
    },
    size: {
      sm: { base: 'h-8 text-small px-3' },
      md: { base: 'h-10 text-medium px-4' },
      lg: { base: 'h-12 text-large px-5' },
    },
    isDisabled: { true: { base: 'opacity-50 cursor-not-allowed' }, false: {} },
    isLoading: { true: {}, false: {} },
    isError: { true: { base: 'border border-danger' }, false: {} },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
    isDisabled: false,
    isLoading: false,
    isError: false,
  },
});

type ButtonSlots = ReturnType<typeof buttonVariants>;
type VP = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends VP {
  children?: React.ReactNode;
  onPress?: () => void;
  className?: string;
  classNames?: Partial<Record<keyof ButtonSlots, string>>;
  errorMessage?: React.ReactNode;
}

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
      children,
      onPress,
      color,
      size,
      isDisabled,
      isLoading,
      isError,
      errorMessage,
      className,
      classNames = {},
    },
    ref,
  ) {
    const slots = buttonVariants({ color, size, isDisabled, isLoading, isError });

    const handlePress = useCallback(() => {
      if (isDisabled || isLoading) return;
      onPress?.();
    }, [isDisabled, isLoading, onPress]);

    return (
      <div
        className={cn(slots.base(), className, classNames.base)}
        data-color={color}
        data-size={size}
        data-disabled={dataAttr(!!isDisabled)}
        data-loading={dataAttr(!!isLoading)}
        data-error={dataAttr(!!isError || !!errorMessage)}
        data-invalid={dataAttr(!!isError || !!errorMessage)}
      >
        <button ref={ref} className={cn('w-full', classNames.root)} disabled={isDisabled} onClick={handlePress}>
          <span className={cn(slots.label(), classNames.label)}>{children}</span>
          {isLoading ? <span className={cn(slots.spinner(), classNames.spinner)} aria-hidden>⏳</span> : null}
        </button>
        {errorMessage ? (
          <span className={cn(slots.message(), classNames.message)}>{errorMessage}</span>
        ) : null}
      </div>
    );
  }),
);

Button.displayName = 'Button';
```

## Example B — TextInput (controlled/uncontrolled with useControllableState)

```tsx
import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { tv, cn, dataAttr } from '@shared/lib/utils';
import { useControllableState } from '@shared/hooks/common';
import type { VariantProps } from 'tailwind-variants';

const inputVariants = tv({
  slots: {
    base: 'flex w-full flex-col',
    label: 'mb-1 text-medium text-foreground',
    control: 'flex items-center rounded-medium border bg-background',
    input: 'w-full bg-transparent px-3 py-2 text-medium text-foreground outline-none',
    message: 'mt-1 text-medium text-danger',
  },
  variants: {
    color: {
      default: { control: 'border-default-300 focus-within:border-primary' },
      primary: { control: 'border-primary' },
      danger: { control: 'border-danger' },
    },
    size: {
      sm: { input: 'py-1 text-small', control: 'rounded-small' },
      md: { input: 'py-2 text-medium', control: 'rounded-medium' },
      lg: { input: 'py-3 text-large', control: 'rounded-large' },
    },
    isDisabled: { true: { control: 'opacity-50 cursor-not-allowed' }, false: {} },
    isLoading: { true: {}, false: {} },
    isError: { true: { control: 'border-danger' }, false: {} },
    isFilled: { true: {}, false: {} },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
    isDisabled: false,
    isLoading: false,
    isError: false,
    isFilled: false,
  },
});

type InputSlots = ReturnType<typeof inputVariants>;
type VP = VariantProps<typeof inputVariants>;

export interface TextInputProps extends VP {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (next: string) => void;
  isRequired?: boolean;
  className?: string;
  classNames?: Partial<Record<keyof InputSlots, string>>;
  errorMessage?: React.ReactNode;
}

export const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
    {
      id,
      name,
      label,
      placeholder,
      value,
      defaultValue,
      onValueChange,
      isRequired,
      color,
      size,
      isDisabled,
      isLoading,
      isError,
      errorMessage,
      className,
      classNames = {},
    },
    ref,
  ) {
    const [currentValue, setCurrentValue] = useControllableState<string>({
      value,
      defaultValue: defaultValue ?? '',
      onChange: onValueChange,
    });

    const hasError = !!isError || !!errorMessage;
    const isFilled = useMemo(() => (currentValue ?? '').length > 0, [currentValue]);

    const slots = inputVariants({
      color,
      size,
      isDisabled,
      isLoading,
      isError: hasError,
      isFilled,
    });

    const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
      (e) => setCurrentValue(e.target.value),
      [setCurrentValue],
    );

    return (
      <div
        className={cn(slots.base(), className, classNames.base)}
        data-color={color}
        data-size={size}
        data-disabled={dataAttr(!!isDisabled)}
        data-loading={dataAttr(!!isLoading)}
        data-error={dataAttr(hasError)}
        data-invalid={dataAttr(hasError)}
        data-filled={dataAttr(isFilled)}
        data-required={dataAttr(!!isRequired)}
      >
        {label ? (
          <label className={cn(slots.label(), classNames.label)} htmlFor={id}>
            {label}
          </label>
        ) : null}
        <div className={cn(slots.control(), classNames.control)}>
          <input
            ref={ref}
            id={id}
            name={name}
            className={cn(slots.input(), classNames.input)}
            placeholder={placeholder}
            value={currentValue ?? ''}
            onChange={onChange}
            aria-invalid={hasError || undefined}
            aria-required={isRequired || undefined}
            disabled={isDisabled}
          />
        </div>
        {errorMessage ? (
          <span className={cn(slots.message(), classNames.message)}>{errorMessage}</span>
        ) : null}
      </div>
    );
  }),
);

TextInput.displayName = 'TextInput';
```

## Summary

- Use tailwind-variants with semantic tokens and slots. No CSS Modules.
- Expose variants: color, size, isDisabled, isLoading, isError; add component-specific flags as needed.
- Expose `className` and `classNames` to merge with tv slots via `cn`.
- Mirror state to data-* attributes; never use conditional class strings.
- Input-like components must use `useControllableState` and support value/defaultValue/onValueChange.
- Use forwardRef + memo; named exports only; add ARIA attributes.