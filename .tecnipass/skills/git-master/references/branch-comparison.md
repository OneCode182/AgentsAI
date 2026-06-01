# Branch Comparison Workflow

Use this when the user asks what the current branch changes versus another branch, commonly `origin/develop`.

## Identify Branch Context
```bash
git branch --show-current
git status --short --branch
git rev-parse --abbrev-ref @{upstream}
git merge-base HEAD origin/develop
```

If the target branch may be stale, ask or confirm before network updates. Do not run `git pull`. Use `git fetch` only when authorized or when the user explicitly asked for latest remote state.

## Current Branch Changes Since Target
For "what does my current branch change compared to `origin/develop`":

```bash
git diff --stat origin/develop...HEAD
git diff --name-status origin/develop...HEAD
git diff origin/develop...HEAD -- path/to/file
git log --oneline --decorate origin/develop..HEAD
```

## Divergence Both Ways
```bash
git log --left-right --cherry-pick --oneline origin/develop...HEAD
```

Interpretation:
- `<` commits are only on `origin/develop`.
- `>` commits are only on current `HEAD`.

## Target Changes Not In Current Branch
```bash
git log --oneline HEAD..origin/develop
git diff --stat HEAD..origin/develop
```

## File-Level Comparison
```bash
git diff origin/develop...HEAD -- app/routes/example.tsx
git log --oneline --follow origin/develop..HEAD -- app/routes/example.tsx
```

## Report Format
Report:
1. Current branch and target branch.
2. Merge base hash.
3. Commit counts both ways.
4. Files changed by current branch.
5. Any risky overlap with target changes.
