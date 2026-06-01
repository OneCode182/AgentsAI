---
name: commit-helper
description: Help create git commits for the tecnipass-frontend project following Conventional Commits and Linus Torvalds principles.
---

# Tecnipass Frontend Commit Helper

Help the user create meaningful, atomic, and properly formatted commit messages for the Tecnipass frontend repository.

## Rules
- **Non-negotiable**: UNLESS EXPLICITLY INSTRUCTED BY THE USER, NEVER use `--no-verify` when committing.
- **Non-negotiable**: All changes MUST pass `biome check` and `tsc` (Husky hooks) before being committed.
- **Non-negotiable**: If pre-existing errors block your commit, you MUST address them or ask for guidance; never bypass the checks.

## Workflow

1. **Analyze the changes**: Run `git diff --staged`, `git diff`, or `git status` to understand what was modified.
2. **Stage the changes**: Use `git add .` or `git add -A`, whichever fits the context, to capture the intended updates.
3. **Ask the user** for:
   - The Ticket ID (e.g., `TEC-XYZ`) only if it was not provided in the prompt.
4. **Write the subject line**: Use imperative mood, no period, under 72 characters. Follow `type(scope): description`.
5. **Write the body**: Explain the "why" behind the change and keep the description short.
6. **Add issue reference**: Include `Resolves: TEC-XYZ` only when the ID was provided in the prompt.
7. **Create the commit** using the properly formatted message.

## Commit Message Structure

**Basic Format:**
```
type(scope): imperative subject without period

- Brief bullet point explaining what changed
- Focus on the "why" and intent
- Keep the overall description concise

Resolves: TEC-XYZ
```

**Key Requirements:**
- **Must** use [Conventional Commits](https://www.conventionalcommits.org/) format.
- **Must** separate subject from body with a blank line.
- **Must** use imperative mood in the subject (e.g., "add feature" not "added feature").
- **Must** omit the `Resolves:` line if no ID was provided in the prompt.
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


- **Think like Linus Torvalds**: Keep commits small, atomic, and focused on one concern.
- **Explain the "Why"**: The diff shows "how"; the message should explain why the change was necessary.
- **Stay concise**: Avoid long explanations—describe the intent clearly in a few sentences or bullet points.
- **Tie to project context**: Mention which frontend area or user flow benefits from the change (meetings, invitations, auth, etc.).

## Examples

**Feature example:**
```
feat(meetings): add success modal and state to meeting form

- introduce SuccessModal component for post-submit feedback
- add isSuccessModalOpen state to meeting form logic
- enhance meeting form UX with clear confirmation options

Resolves: TEC-486
```

**Bug fix example:**
```
fix(styles): add max width to alertContent container

- apply max-w-screen-md to alertContent across modules
- ensure consistent dialog width for better readability

Resolves: TEC-475
```

## Issue References
- `Resolves: TEC-XYZ` (use only when provided explicitly).
- `Refs: #TEC-XYZ` (allowed for legacy commits).

## How to Avoid Common Pitfalls
- **No imaginary tickets**: Do not add `Resolves:` lines without a prompt-provided ID.
- **Be specific**: Avoid generic titles; mention what changed or which subsystem the commit affects.
- **Avoid large mixed commits**: Split unrelated changes into multiple commits.
- **Use meaningful scopes**: Prefer feature or path names (e.g., `invitations`, `shared`, `app/auth`).

## Pull Request Guidelines
- **Single-ticket focus**: Keep PRs centered on one ticket when possible.
- **Clean history**: Prefer rebasing instead of merging to keep the commit graph tidy, unless otherwise instructed.
description: Helps guide git commits with concise Conventional Commit messages aligned with Tecnipass and Linus Torvalds principles.

---

