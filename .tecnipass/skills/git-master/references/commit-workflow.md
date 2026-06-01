# Commit Workflow

Use this when the user asks to commit or prepare commits.

## 1. Inspect Before Planning
```bash
git status --short --branch
git diff --stat
git diff --cached --stat
git diff --name-status
git log -30 --oneline
```

## 2. Detect Commit Style
Read recent commit messages and follow the dominant local style.

Common styles:
- Semantic: `fix(scope): message`, `feat: message`, `chore: message`
- Plain: `Add login flow`
- Short: `format`, `lint`

Do not default to semantic commits unless the repository history uses them.

## 3. Plan Atomic Commits
A commit is atomic when it can be understood and reverted independently.

Split commits when changes involve:
- Different features or bug fixes.
- Different directories/modules without a direct dependency.
- UI, logic, configuration, tests, or tooling as separate concerns.
- Generated or formatting-only changes mixed with behavior changes.

Keep together:
- Implementation and its direct test.
- A type/schema and the only code change that requires it.
- Files that must change together to keep the project compiling.

## 4. Stage Precisely
```bash
git add path/to/fileA path/to/fileB
git diff --cached --stat
git diff --cached -- path/to/fileA
```

Avoid `git add .` unless the user explicitly wants all current changes and you have inspected every changed file.

## 5. Commit Message Rules
Commit messages must be:
- Concise.
- Specific.
- Written in the repo's dominant style/language.
- Focused on the single atomic change.

Good:
```text
fix(reception): allow approval without guest attachments
chore(lint): add changed-file sonar command
```

Bad:
```text
fix stuff
update files
final changes
```

## 6. Execute And Verify
```bash
git commit -m "message"
git log -1 --oneline
git status --short --branch
```

If hooks modify files, inspect the new status. If hook changes are intentional formatting for committed files, amend or create a follow-up commit only after verifying the diff.

## 7. Final Report
Include:
- Commit hash and message.
- Files/concerns committed.
- Validation commands run and their status.
- Any remaining uncommitted files.
