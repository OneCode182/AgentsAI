---
name: git-master
description: Use for Git inspection, atomic commits, history search, branch comparison, rebase planning, and conflict resolution. Provides Git commands, safety constraints, and workflows; project behavior rules belong in the Git Master agent.
---

# Git Master Skill

## Purpose
This skill is a Git operations reference. It teaches an LLM how to inspect a repository, understand history, compare branches, create atomic commits, and resolve rebases safely.

It does not define project ownership, business rules, or user-approval policy. Those rules belong to the agent that invokes this skill.

## First Step
Classify the request before running commands, then load only the required reference for that mode:

| Request intent | Mode | Reference |
|---|---|---|
| What changed? staged/unstaged/status | Inspection | `references/inspection.md` |
| Commit current work | Commit | `references/commit-workflow.md` |
| Compare current branch to another branch, e.g. `origin/develop` | Branch comparison | `references/branch-comparison.md` |
| Rebase, continue rebase, resolve conflicts | Rebase/conflicts | `references/rebase-conflicts.md` |
| Find when/who introduced code | History search | `references/history-search.md` |
| Explain Git terms or ranges | Glossary | `references/glossary.md` |
| Any destructive/remote operation | Safety | `references/safety.md` |

## Universal Safety
Always read `references/safety.md` before remote operations, destructive operations, history rewrites, or rebases.

Hard defaults:
- Do not run `git push`, `git push --force`, `git pull`, `git reset --hard`, `git clean`, or destructive checkout/restore unless the user explicitly authorizes that exact class of operation.
- Prefer read-only inspection commands first.
- Stage only intentional files.
- Never hide uncertainty. If a command output changes the plan, report it and adapt.

## Minimal Operating Loop
1. Inspect the repo state with `git status --short --branch`.
2. Gather only the Git context required by the request.
3. Explain the plan when the operation can mutate history or commits.
4. Execute in small, reversible steps.
5. Verify with status, diff/log, and project checks when relevant.
6. Report exactly what changed and any commands that failed.

## Reference Index
- `references/glossary.md`: Git vocabulary every LLM must know.
- `references/inspection.md`: current changes, staged/unstaged, file-level diff review.
- `references/branch-comparison.md`: compare current branch against `origin/develop` or any target branch.
- `references/commit-workflow.md`: atomic commit planning, staging, messages, and verification.
- `references/rebase-conflicts.md`: safe rebase flow and conflict resolution.
- `references/history-search.md`: `log`, `show`, `blame`, `-S`, `-G`, `bisect`, `reflog`.
- `references/safety.md`: prohibited commands, approval boundaries, and recovery guidance.
