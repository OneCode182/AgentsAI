# History Search Workflow

Use this when the user asks who changed something, when code was added, or which commit introduced a behavior.

## Recent History
```bash
git log --oneline --decorate -30
git show --stat <commit>
git show <commit> -- path/to/file
```

## File History
```bash
git log --follow --oneline -- path/to/file
git log --follow -p -- path/to/file
```

## Pickaxe Search: Exact String Added Or Removed
Use `-S` when the count of a string changed.

```bash
git log -S "searchString" --oneline
git log -S "searchString" -p -- path/to/file
git log -S "searchString" --all --oneline
```

## Regex Diff Search
Use `-G` when looking for commits whose diff matches a regex.

```bash
git log -G "pattern" --oneline
git log -G "pattern" -p -- path/to/file
```

## Blame
```bash
git blame path/to/file
git blame -L 120,150 path/to/file
git blame -w -C -L 120,150 path/to/file
```

Use `-w` to ignore whitespace and `-C` to detect moved/copied lines.

## Bisect
Use only when there is a reproducible good/bad test boundary.

```bash
git bisect start
git bisect bad HEAD
git bisect good <known-good-commit-or-tag>
git bisect run <test-command>
git bisect reset
```

## Reflog Recovery
```bash
git reflog
git show <reflog-hash>
```

Do not reset to a reflog hash without explicit user authorization.

## Result Report
Include:
- Command used.
- Matching commits.
- Most relevant commit.
- Author/date when useful.
- Short explanation of why the commit is relevant.
