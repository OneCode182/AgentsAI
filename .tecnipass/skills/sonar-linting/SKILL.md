---
name: sonar-linting
description: Code quality and Sonar linting assistant focused on running validations, fixing static analysis errors on modified files, and ensuring modular and robust code.
---

# Sonar Linting and Code Quality Skill

This skill guides the agent to act as a code quality specialist. It focuses on running static analysis, addressing SonarJS/ESLint warnings, and applying clean code principles to modified files in the current branch without breaking existing application features.

## Rules & Guidelines

1. **Targeted Analysis Only**:
   - Do NOT run general linting on the entire project unless specifically requested.
   - The agent MUST target only the files currently being modified or within the focus of the current branch.
   - Execute the targeted check using:
     ```bash
     npx eslint <file-1> <file-2> ... <file-n>
     ```

2. **Sonar Linting execution**:
   - Run the SonarJS static analysis suite using:
     ```bash
     pnpm lint:sonar
     ```

3. **No Regression Policy (Do Not Break Functionality)**:
   - Modifications made to resolve lint issues MUST preserve the exact business logic, UI behavior, and system flow.
   - Verify stability after refactoring by running:
     - `pnpm type-check` (to confirm type safety)
     - `pnpm format` / `pnpm lint` (to confirm styling and general lint rules pass)

4. **Applying Clean Code and Quality Concepts**:
   - **Modularity**: Extract large inline components, nested logic, or heavy functions into separate, focused components or utility helpers.
   - **English Codebase Standard**: All written code, variables, functions, components, and comments must be in English.
   - **Comments**: Write clear, concise, and helpful comments for complex or non-obvious code paths.
   - **Cognitive Complexity**: Avoid deep nesting, large function bodies, and convoluted conditionals.
   - **Vulnerable Patterns**: Resolve regex patterns prone to catastrophic backtracking and delete unused state hooks/variables completely.

## Workflow

### 1. Identify Modified Files
- Run `git status` or `git diff --name-only` to obtain a list of modified files in the current branch.

### 2. Run Focused ESLint/Sonar Checks
- Target ESLint/SonarJS checks only on those identified files:
  ```bash
  npx eslint <file-1> <file-2> ... <file-n>
  ```
- Run the full project Sonar suite when needed using:
  ```bash
  pnpm lint:sonar
  ```

### 3. Refactor and Fix Errors
- **Cognitive Complexity warnings**: Refactor by extracting nested helper functions or splitting complex components.
- **Nested Ternaries warnings**: Replace nested ternary operators with clear `if-else` blocks or early returns.
- **Backtracking Regex warnings**: Replace greedy repetitions (`.*`) with safe, specific character exclusions (e.g. `[^;]+`).
- **Unused Variables/States**: Clean up unused variables, destructured state values, or imports.

### 4. Verify Cohesion
- Run the formatting and type-checking validations:
  ```bash
  pnpm format
  ```
  ```bash
  pnpm type-check
  ```
  > [!IMPORTANT]
  > Execute these two `pnpm` validations **IF AND ONLY IF** they have not already been run during the current verification or commit workflow. Running them repeatedly on unchanged files creates unnecessary overhead and redundancy.
- Re-run the focused ESLint check to confirm all warnings are cleared.
