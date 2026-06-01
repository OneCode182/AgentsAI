# Git Safety Rules

## Commands Requiring Explicit User Authorization
Do not run these unless the user explicitly asks for that exact operation or class of operation:

```bash
git push
git push --force
git push --force-with-lease
git pull
git reset --hard
git clean
git checkout -- path
git restore --source=<ref> -- path
git rebase
git merge
git cherry-pick
git revert
```

If authorization is ambiguous, ask first.

## Preferred Safe Alternatives
- Use `git status`, `git diff`, `git log`, `git show` for inspection.
- Use targeted `git add path` instead of `git add .`.
- Use `git restore --staged path` to unstage, not to discard work.
- Use `git stash push -m "message"` only when needed and explain why.

## Remote Safety
- Do not use `git pull`; it mixes fetch and integration.
- If latest remote state is required, prefer `git fetch origin` only after the user asks for latest remote comparison or authorizes remote update.
- Do not push from an agent unless the user explicitly says to push.
- Never use `--force`; use `--force-with-lease` only when explicitly authorized.

## Destructive Local Safety
Before destructive commands:
1. Show `git status --short --branch`.
2. Identify exactly which files/commits would be affected.
3. Confirm user intent.
4. Prefer reversible alternatives.

## Dirty Worktree Safety
Assume uncommitted changes may belong to the user.
- Do not discard them.
- Do not overwrite them.
- Do not include unrelated files in commits.
- If unrelated changes block the task, explain the conflict and ask.

## Hook Safety
- Do not use `--no-verify` unless the user explicitly authorizes bypassing hooks.
- If hooks modify files, inspect and report the resulting diff/status.
