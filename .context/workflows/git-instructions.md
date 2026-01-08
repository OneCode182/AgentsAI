# Git Workflow & Commit Standards

> **Goal:** Ensure every commit is meaningful, context-aware, and linked to a specific task (TEC-XYZ).

---

## 🔄 The Workflow (Strict Execution)

When you are ready to commit changes in `tecnipass-frontend`, follow this exact sequence:

### 1. Contextualize
*   **Action:** Run `git status`.
*   **Purpose:** Identify which files have been added, modified, or deleted.

### 2. Analyze (Read-Only)
*   **Action:** Use `read_file` on **every** file listed in `git status`.
*   **Constraint:** **DO NOT MODIFY** any files at this stage. Just read to understand the exact changes.

### 3. Reason
*   **Action:** Synthesize the changes.
*   **Input:**
    *   File diffs/content from Step 2.
    *   Current conversation context.
    *   Project history.
*   **Output:** A mental model of "What exactly did we achieve here?"

### 4. Draft Message
*   **Action:** Construct a commit message following the **Commit Format** below.
*   **Focus:** Be concise but descriptive. Explain *why* the change was made, not just *what*.

### 5. User Review & Approval
*   **Action:** Present the drafted message to the user.
*   **Interaction:**
    1.  **Ask:** "Is this commit message correct? (Yes/No)"
    2.  **If NO:** Ask the user for specific improvements or details to add. Refine the draft.
    3.  **If YES:** Ask: "What is the Ticket ID? (e.g., TEC-405)"

### 6. Finalize & Commit
*   **Action:** Inject the Ticket ID into the message.
*   **Command:** Execute `git commit -m "..."`

---

## 📝 Commit Message Format

We follow a strict Conventional Commits structure.

```text
<type>(<scope>): <description>

[Optional Body: Detailed explanation of changes]

Ticket: [TEC-XYZ]
```

### Types
| Type | Description |
| :--- | :--- |
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that do not affect the meaning of the code (white-space, formatting, etc) |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf` | A code change that improves performance |
| `test` | Adding missing tests or correcting existing tests |
| `chore` | Changes to the build process or auxiliary tools and libraries |

### Examples

```text
feat(users): add parking unit dialog and dynamic tagging

- Implemented ParkingUnitDetailsDialog for detailed view.
- Added dynamic sizing to ParkingUnitTag based on content.
- Enforced vehicle type icon mapping (Car, Bike, Motorcycle, Truck).
- Implemented dialog stacking logic in UserDetailsAlert.

Ticket: TEC-405
```

```text
feat(account-activation): add warning dialog for missing images and refactor button component

- add warning dialog when no face or id images are uploaded during account activation
- refactor button component to use tailwind-variants and improve slot/class handling
- update account activation validation to allow empty idImages array or null

Ticket: TEC-440
```
