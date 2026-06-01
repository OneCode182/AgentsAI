# Inspection Workflow

Use this when the user asks what changed, asks for a review before commit, or when you need repo context.

## Baseline Commands
Run read-only commands first:

```bash
git status --short --branch
git diff --stat
git diff --cached --stat
git diff --name-status
git diff --cached --name-status
```

## Review Actual Changes
Use targeted diffs, not broad noisy output:

```bash
git diff -- path/to/file
git diff --cached -- path/to/file
git diff --word-diff -- path/to/file
```

## Review Staged Versus Unstaged
```bash
git diff --cached
git diff
```

If both staged and unstaged changes exist in the same file, inspect both before staging or committing.

## Recent History
```bash
git log -20 --oneline --decorate
git log -20 --pretty=format:"%h %ad %s" --date=short
```

## Untracked Files
```bash
git ls-files --others --exclude-standard
```

Do not stage untracked files unless they are clearly part of the requested task.

## Dirty Tree Interpretation
- `M file`: modified in working tree.
- `A file`: added.
- `D file`: deleted.
- `UU file`: unresolved merge/rebase conflict.
- `?? file`: untracked.
- Two columns in porcelain status mean index status and working-tree status.
