# Git Glossary

## Repository State
- **Working tree**: Files currently on disk.
- **Index / staging area**: Files selected for the next commit.
- **Unstaged changes**: Working-tree edits not staged.
- **Staged changes**: Index edits that will be committed.
- **Untracked files**: Files not known to Git.
- **Clean tree**: No staged, unstaged, or untracked changes relevant to Git.

## Commits And References
- **Commit**: Immutable snapshot with metadata and parent commit(s).
- **HEAD**: The commit currently checked out.
- **Branch**: Movable name pointing to a commit.
- **Remote-tracking branch**: Local reference to a remote branch, e.g. `origin/develop`.
- **Upstream**: The remote branch configured as the tracking branch for the current branch.
- **Merge base**: Best common ancestor of two commits or branches.

## Ranges
- `A..B`: Commits reachable from `B` but not from `A`.
- `A...B`: Symmetric difference between `A` and `B`. For `git diff A...B`, Git compares `B` against the merge base of `A` and `B`.
- `HEAD..origin/develop`: What `origin/develop` has that current `HEAD` does not.
- `origin/develop..HEAD`: What current `HEAD` has that `origin/develop` does not.
- `origin/develop...HEAD`: Current branch changes since it forked from `origin/develop`.

## Conflict Terms
- **Ours / theirs** are context-dependent. During rebase, `ours` usually means the temporary rebased base/HEAD, and `theirs` means the commit being replayed. Do not use `--ours` or `--theirs` blindly.
- **Incoming/current branch** should be interpreted from the active operation and user wording, not guessed.

## History Rewrite Terms
- **Rebase**: Replay commits on top of another base.
- **Squash**: Combine commits.
- **Fixup**: Commit intended to be autosquashed into an earlier commit.
- **Force-with-lease**: Safer force push that refuses to overwrite remote work not present locally.
- **Reflog**: Local record of where references used to point; useful for recovery.
