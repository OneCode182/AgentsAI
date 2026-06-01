# Rebase And Conflict Workflow

Use this for rebase, rebase continuation, autosquash, and conflict resolution.

## Preconditions
```bash
git status --short --branch
git branch --show-current
git log --oneline -20
git rev-parse --abbrev-ref @{upstream}
```

Do not start or continue a rebase on `main`, `master`, or protected base branches unless the user explicitly instructed it and the repo policy allows it.

## Starting A Rebase
Use only when authorized:

```bash
git rebase origin/develop
```

Never use `git pull --rebase` as a shortcut. Inspect and rebase explicitly.

## During A Rebase
Find conflicts:

```bash
git status --short
git diff --name-only --diff-filter=U
rg -n "^(<<<<<<<|=======|>>>>>>>)" .
```

For each conflict:
1. Read the full file or at least the surrounding component/function.
2. Understand both sides.
3. Preserve user-requested behavior and critical fixes from both sides.
4. Remove markers.
5. Run targeted checks if possible.
6. Stage resolved files.

Continue:

```bash
git add path/to/resolved-file
GIT_EDITOR=true git rebase --continue
```

PowerShell:

```powershell
$env:GIT_EDITOR='true'; git rebase --continue
```

## Ours/Theirs Warning
Do not resolve conflicts with `git checkout --ours`, `git checkout --theirs`, `git restore --ours`, or `git restore --theirs` unless the user explicitly requested that strategy for the file set and you have confirmed what each side means in the current operation.

During rebase, meanings are easy to invert:
- `ours`: temporary rebased HEAD/base side.
- `theirs`: commit currently being replayed.

## Abort And Recovery
```bash
git rebase --abort
git reflog
```

Use abort only when continuing would be unsafe or the user asks to stop.

## Post-Rebase Verification
```bash
git status --short --branch
rg -n "^(<<<<<<<|=======|>>>>>>>)" .
git log --oneline --decorate -10
```

Run project checks relevant to touched files. Report any failing global check separately from conflict-resolution failures.
