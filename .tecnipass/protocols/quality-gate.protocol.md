# Quality Gate Protocol

> **Purpose**: define the validation checks required before TecniPass code changes are considered complete or ready to commit.

Use this protocol together with `protocols/verification-retry.protocol.md`.

## Required Check Order

```text
1. Formatting
2. Type-check
3. Tests
4. Sonar or changed-file linting when applicable
5. Forbidden-pattern inspection
6. Commit convention when committing
```

## Checks

### 1. Formatting
- Frontend: use the project formatter, typically `pnpm format`.
- Backend: use the configured formatter or lint command.

### 2. Type-Check
- Frontend: use the project type-check command, typically `pnpm type-check`.
- Backend: use the configured build/type validation command.

Do not proceed with known type errors in modified code.

### 3. Tests
Run targeted tests when available and proportional to the risk.

Broaden tests when:
- shared behavior changed;
- contracts changed;
- a previous bug had regression risk;
- the user explicitly requested full validation.

### 4. Sonar And Linting
Use the relevant linting skill when requested:
- `skills/sonar-linting/SKILL.md`
- `skills/biome-linting/SKILL.md`

Changed-file linting is preferred for fast local feedback when the task scope is narrow.

### 5. Forbidden Patterns
Inspect modified files for:
- secrets or credentials;
- accidental `console.log` or `debugger`;
- avoidable `any`;
- dead code introduced by the change;
- hardcoded product behavior not requested by the task.

### 6. Commit Convention
When committing, use the Git specialist and commit skill requested by the human.

Commit messages must be concise, atomic, and conventional.

## Skip Conditions
Checks may be skipped only when the skip is explicit and justified:
- documentation-only changes can skip code format/type/test/Sonar checks;
- environment-only metadata can skip Sonar if no product code changed;
- unavailable local services can be documented as not run;
- emergency hotfix skips require direct human approval.

## Completion Rule
Do not report the task as complete until:
- required checks passed, or
- skipped checks are listed with a clear reason, and
- remaining risks are explicit.
