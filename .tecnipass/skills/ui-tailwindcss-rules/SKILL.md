# Frontend Styling Standards: Tailwind CSS Architecture

## Overview
This document outlines the mandatory styling conventions and architectural decisions for frontend development. To ensure a scalable, predictable, and cohesive codebase, we strictly adhere to a utility-first styling paradigm. 

## NON-NEGOTIABLE
- **NO Standard CSS:** The use of traditional `.css` files is strictly prohibited.
- **NO CSS Modules:** Do not create, import, or use `.module.css` files under any circumstances.
- **Tailwind Exclusivity:** All styling must be executed using Tailwind CSS utility classes directly inline within the component markup.

**Rationale:** Mixing CSS Modules or standard CSS with Tailwind breaks the intended architecture. It creates fragmented sources of truth, complicates the build process, and defeats the purpose of a utility-first framework.

## Implementation Guidelines

### 1. Inline Utility Classes
Styles must be applied directly to the HTML/JSX elements using Tailwind classes. This ensures that the structural markup and its visual representation remain unified and easily scannable.

### 2. Component-Driven Abstraction
If a set of utility classes is repeated frequently, do not extract them into custom CSS classes. Instead, abstract the entire UI element into a reusable component (e.g., React, Vue, or Angular component) to maintain encapsulation.

### 3. Design System Adherence
Always utilize the predefined design tokens configured in `tailwind.config.js`. Avoid using arbitrary values (e.g., `w-[300px]`) unless absolutely required by a highly specific, one-off edge case.

### 4. Code Readability
When dealing with deeply nested or highly styled elements, order your Tailwind classes logically (e.g., layout, spacing, typography, colors, interactions) to maintain readability, or use tools like `prettier-plugin-tailwindcss` to enforce consistent class sorting.