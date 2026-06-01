---
applyTo: '**/*.tsx'
---

# TSX Performance Rules

## React Performance Optimization Guidelines

1. **Use React.memo for Pure Components**  
   Wrap components with `React.memo` if they are pure and receive props that rarely change.

2. **Use useCallback and useMemo**  
   - Use `useCallback` to memoize event handlers and callbacks passed to child components.
   - Use `useMemo` to memoize expensive calculations or derived data.
  - Memoize `tv`-derived values by calling the tv factory once at module scope; only call `variants()` inside render with primitive props.

3. **Avoid Inline Functions in JSX**  
   Define functions outside of the JSX return to prevent unnecessary re-renders.

## Performance Best Practices

4. **Memoize Event Handlers**  
   Always wrap event handlers with `useCallback` when passing them to child components to prevent unnecessary re-renders.

5. **Memoize Expensive Calculations**  
   Use `useMemo` for any computationally expensive operations or derived data that depends on props or state.

6. **Optimize Re-renders**  
   Structure your components to minimize unnecessary re-renders by using React.memo and proper dependency arrays.
  - Prefer `forwardRef` + `memo` for DOM-exposing components.
  - Keep `classNames` and `className` stable; prefer objects created outside render or memoized with `useMemo` if computed.

## Example of Performance Optimizations

```tsx
import React, { memo, useCallback, useMemo } from "react";

export const OptimizedComponent = memo(function OptimizedComponent({ 
  items, 
  onItemClick,
  expensiveCalculationInput
}) {
  // Memoize expensive calculations
  const expensiveResult = useMemo(() => {
    return performExpensiveCalculation(expensiveCalculationInput);
  }, [expensiveCalculationInput]);

  // Memoize event handlers
  const handleClick = useCallback((id: string) => {
    onItemClick(id);
  }, [onItemClick]);

  // Memoize filtered data
  const filteredItems = useMemo(() => {
    return items.filter(item => item.isActive);
  }, [items]);

  return (
    <div>
      {filteredItems.map(item => (
        <button 
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          {item.name}
        </button>
      ))}
      <div>Result: {expensiveResult}</div>
    </div>
  );
});
```

## Summary

- **Memoize components and callbacks**
- **No inline functions in JSX**
- **Use React.memo for pure components**
- **Use useCallback for event handlers**
- **Use useMemo for expensive calculations**
