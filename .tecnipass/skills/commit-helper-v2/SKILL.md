---
name: commit-helper-v2
description: Help create git commits for the tecnipass-frontend project following a strict validation flow (format, check) and Conventional Commits principles.
---

# Tecnipass Frontend Commit Helper v2

Help the user create meaningful, atomic, and properly formatted commit messages for the Tecnipass frontend repository, ensuring all code quality standards are met before committing.

## Rules

- **Non-negotiable**: UNLESS EXPLICITLY INSTRUCTED BY THE USER, NEVER use `--no-verify` when committing.
- **Non-negotiable**: NEVER execute commits directly. You MUST first present the full commit distribution plan (table/summary) to the user and wait for explicit approval. Only after the user confirms (e.g., "Si", "Dale", "Aprobado") you proceed to execute. If the user rejects or requests changes, adjust the plan and present it again.
- **Non-negotiable**: The validation flow (format -> check) MUST be followed in order.
- **Non-negotiable**: You MUST validate until no errors are found. Bypassing errors is strictly prohibited.
- **Non-negotiable**: Commit messages MUST follow Conventional Commits and Linus Torvalds principles.
- **Non-negotiable**: NEVER create a single "mega-commit" for unrelated changes. Distribute modifications into a sequence of small or medium-sized atomic commits. Large commits are only allowed if the changes are strictly inseparable.
- **Non-negotiable**: Limit actions to `git add` and `git commit`. NEVER perform `git push` or any remote operations unless the user explicitly requests it.

## Workflow

### 1. Correction & Validation Flow
- You MUST run the following commands in **separate terminal executions** (total of 2):
  1. `pnpm format`
  2. `pnpm type-check`
- **The Loop**: After running each command, check the output for errors. If errors exist, you MUST fix them and **start the flow again** (run all 2 commands).
- Only proceed when both commands pass with **ZERO errors**. Bypassing or ignoring errors is strictly prohibited.
- Once the code is clean, analyze the final state of the repository.

### 2. Change Analysis & Pattern Recognition
- Run `git status` to see modified files.
- Run `git diff --stat` to see the magnitude of changes.
- Run `git log -n 5` to follow the project's commit style and maintain consistency.
- **Identify clusters**: Group changes by feature, architectural layer, or logical dependency (e.g., "API changes", "UI components", "Bug fixes").

### 3. Commit Distribution Plan (MANDATORY — STOP HERE UNTIL APPROVED)
Before executing, you MUST present the plan and **STOP**. Do NOT proceed to step 4 without explicit user approval.

Present the plan as a table:

| # | Type | Message | Files |
|---|------|---------|-------|
| 1 | feat(invitations) | add mobile card list for invitations | `invitations-card-list.tsx`, `index.tsx` |
| 2 | fix(meetings) | fix desktop grid layout in create form | `meeting-details.component.tsx` |
| ... | ... | ... | ... |

Then ask: **"¿Procedo con estos commits?"**

- If the user approves → proceed to step 4.
- If the user rejects or requests changes → adjust and present again.
- If the user does not respond → do NOT proceed.

### 4. Execution (ONLY after user approval)
Perform the commits one by one following the approved plan:
- Use `git add <path>` specifically for the files in the current commit (NOT `git add .` when distributing into multiple commits).
- Write the subject line: imperative mood, no period, under 72 characters. Follow `type(scope): description`.
- Write the body:
  - **Small/Simple changes**: Single inline sentence (no sub-items).
  - **Complex changes**: List of descriptive items (`-`) explaining the "why" and intent.
- Create the commit using the properly formatted message.
- Verify the remaining changes after each commit with `git status`.

## Commit Message Structure

**Basic Format:**

```markdown
type(scope): imperative subject without period

- Use a single line (inline) without bullets for simple or small changes
- Use a list of descriptive items (`-`) ONLY if the change is complex or requires explicit detail
- Focus on the "why", intent, and concreteness
- Keep the description as short as possible to maintain cohesion and impact
```

**Key Requirements:**

- **Must** use [Conventional Commits](https://www.conventionalcommits.org/) format.
- **Must** separate subject from body with a blank line.
- **Must** use imperative mood in the subject (e.g., "add feature" not "added feature").
- **Recommended** wrap body lines at 72-100 characters.

## Commit Types

| Type | Description |
| :--- | :--- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Non-functional formatting tweaks |
| `refactor` | Code restructuring without new behavior |
| `perf` | Performance improvement |
| `test` | Adding or adjusting tests |
| `chore` | Tooling or auxiliary updates |

## Commit Scopes

Scopes correspond to the main feature areas or routes in the tecnipass-frontend project.

| Scope | Description |
| :--- | :--- |
| `users` | User management and creation |
| `meetings` | Meeting forms and workflows |
| `invitations` | Invitation handling and resend logic |
| `properties` | Property management and details |
| `organizations` | Organization management |
| `contracts` | Contract handling and creation |
| `roles` | Role management and assignment |
| `auth` | Authentication and login flows |
| `account-activation` | Account activation workflows |
| `dashboard-home` | Dashboard home route (`/dashboard/home`) |
| `dashboard-status` | Dashboard status route (`/dashboard/status`) |
| `dashboard-alerts` | Dashboard alerts route (`/dashboard/alerts`) |
| `dashboard-search` | Dashboard search route (`/dashboard/search`) |
| `dashboard-controls` | Dashboard controls route (`/dashboard/controls`) |
| `dashboard-occupancy` | Dashboard occupancy route (`/dashboard/occupancy`) |
| `dashboard-parking` | Dashboard parking route (`/dashboard/parking`) |
| `shared` | Shared components, hooks, or utilities |
| `ui` | UI components and design system |
| `types` | Type definitions and schemas |
| `utils` | Utility functions and helpers |
| `styles` | Global styles and CSS updates |

## Torvalds Principles

- **Think like Linus Torvalds**: Keep commits small, atomic, and focused on one concern.
- **Explain the "Why"**: The diff shows "how"; the message should explain why the change was necessary.
- **Stay ultra-concise**: Sacrifice extensibility and excessive detail for a synthesized, ultra-concrete, yet highly descriptive commit message. Prioritize brevity to ensure cohesion and impact.
- **Inline vs Bullets**:
  - If the commit involves few files or simple logic, keep the body as a **single inline sentence**.
  - If the change is non-trivial or multi-faceted, use **bullet points** to provide necessary context without being verbose.

## How to Avoid Common Pitfalls

- **Be specific**: Avoid generic titles; mention what changed or which subsystem the commit affects.
- **Avoid large mixed commits**: Split unrelated changes into multiple commits.
- **Verify after each commit**: Always run `git status` after committing to confirm the remaining state is correct before proceeding to the next commit.
- **Respect the plan**: Follow the approved distribution plan. If deviations are needed, explain why before proceeding.
