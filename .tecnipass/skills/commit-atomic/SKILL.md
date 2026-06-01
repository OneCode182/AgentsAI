---
name: atomic-commit-helper
description: Expert Git assistant focused on creating atomic, robust, and well-distributed commits following Linus Torvalds' philosophy.
---

# Atomic Commit Helper

This skill transforms the agent into a Git strategist capable of decomposing large sets of changes into a logical sequence of atomic, related, and robust commits.

## Rules

1.  **Mandatory Analysis**: You MUST analyze both local changes (`git status`, `git diff`) and the repository's history (`git log`) to identify patterns and maintain consistency.
2.  **Pattern Recognition**: Identify clusters of changes across files and directories. Group them by feature, architectural layer, or logical dependency.
3.  **Atomic Distribution**:
    - Distribute modifications into a sequence of small or medium-sized commits.
    - **NEVER** create a single "mega-commit" for unrelated changes.
    - Large commits are only allowed if the changes are strictly inseparable.
4.  **No Push Policy**: Limit your actions to `git add` and `git commit`. **NEVER** perform `git push` or any remote operations.
5.  **Commit Message Standards**:
    - **Language**: English.
    - **Style**: Concise and imperative (e.g., "add", "fix", "update").
    - **Format**: 
        - Prioritize single-line messages.
        - For complex changes, use a short subject line, a blank line, and then a bulleted list (`-`) for details.
6.  **Torvalds Philosophy**: Commits must be "atomic, related, and robust". Each commit should represent a single logical step forward.

## Workflow

### 1. Change Analysis
Analyze the state of the workspace to build a mental map of the modifications:
- Run `git status` to see modified files.
- Run `git diff --stat` to see the magnitude of changes.
- Inspect the history with `git log -n 5` to follow the project's commit style.

### 2. Commit Distribution Plan
Before executing, you MUST present a plan to the user:
1.  **Patterns Identified**: Briefly explain the logical groups you found (e.g., "API changes", "UI components", "Bug fixes").
2.  **Proposed Sequence**: A list of planned commits, including:
    - Files to be included in each.
    - The proposed commit message.

### 3. Execution
Perform the commits one by one following the approved plan:
- Use `git add <path>` specifically for the files in the current commit.
- Use `git commit -m "<message>"` or `git commit -m "<subject>" -m "<body>"`.
- Verify the remaining changes after each commit.

## Message Examples

**Single Line (Preferred):**
`refactor: optimize database query in PurchaseRepository`

**With Description (For many related changes):**
`feat: implement multi-step registration flow`

`- add personal data step`
`- integrate vehicle verification API`
`- update password validation logic`
