---
applyTo: '**/*.tsx'
---

# TSX General Rules

## Basic React and TypeScript Guidelines

1. **Prefer Functional Components**  
   Always use React functional components instead of class components.

2. **Do Not Use React.FC**  
   Do not use the `React.FC` or `React.FunctionComponent` type for components. Instead, explicitly type props and use plain function declarations or arrow functions.

3. **Type Everything**  
   Always use TypeScript types or interfaces for props, state, and function signatures.

4. **Never use any type**  
   Avoid using `any` type. Always specify a more specific type.

5. **Never Use Default Exports**  
   Always use named exports for components and modules.

6. **Keep Components Small and Focused**  
   Each component should do one thing well. Split large components into smaller, reusable ones.

7. **Use Key for Lists**  
   Always provide a unique `key` prop when rendering lists.

8. **Handle Side Effects with useEffect**  
   Use `useEffect` for side effects, and always specify dependencies.

## Styling and State Guidelines

9. **Styling: Use tailwind-variants with semantic tokens**  
   - Define component styles with `tv({ slots, variants, defaultVariants, compoundVariants })`.
   - Use semantic tokens for color/text/shadow/border/background only (e.g., `bg-background`, `text-foreground`, `border-default-300`, `text-danger`).
   - Do not use CSS Modules in components.

10. **Never Use Conditional Classes**  
    Do not use conditional class name strings. Always use data attributes for conditional styling: `data-<foo>={dataAttr(booleanCondition)}`. The `dataAttr` function must be imported from `@shared/lib/utils`.
    Required root data attributes when applicable: `data-color`, `data-size`, `data-disabled`, `data-loading`, `data-error`, `data-invalid`, `data-filled`, `data-required`.

## Code Organization

11. **Destructure Props and State**  
    Destructure props and state at the top of your component for clarity and performance.

12. **Forward refs and memoization**  
   Use `forwardRef` for focusable/DOM-exposing components and wrap pure components with `memo`. Prefer `useCallback` and `useMemo` over inline JSX functions.

13. **Controllable state for input-like components**  
   Use `useControllableState` from `@shared/hooks/common` with props `value`, `defaultValue`, and `onValueChange`.

## Summary

- **Functional components only (never use React.FC)**
- **Type everything**
- **No default exports**
- **No any type**
- **Keep components small**
- **Always use keys in lists**
- **Handle side effects with useEffect**
- **Use tailwind-variants + semantic tokens for styling**
- **Never use conditional classes; always use data attributes with dataAttr**
- **Use forwardRef + memo; useControllableState for input-like components**
- **Destructure props/state**
