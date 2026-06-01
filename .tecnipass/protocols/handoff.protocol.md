# Handoff Protocol

> **Purpose**: preserve development continuity when context is low, a session must move to another runtime, or the current environment cannot finish the task.

Use this protocol with `sessions/_snapshot.template.md`.

## 1. Trigger Criteria
The Orchestrator must create a handoff when:

1. Context is running low or instruction drift is likely.
2. The human asks to continue in another environment or session.
3. A message, quota, time, or context limit is reached.
4. The current session lacks a required capability such as shell, filesystem, browser, MCP, or multi-agent execution.
5. A long task needs to pause safely.

## 2. Exit Procedure
When handoff is triggered:

1. Detect the trigger and stop code edits.
2. Create a snapshot using `sessions/_snapshot.template.md`.
3. Save it under `sessions/{date}-{task-id}.snapshot.md`.
4. Update the active task status if a task file exists.
5. Tell the human where the snapshot was saved and what to do next.

User-facing message format:

```md
I saved the session state in `sessions/{date}-{task-id}.snapshot.md`.
To continue elsewhere, load that snapshot and ask the next agent to resume from it.
```

## 3. Resume Procedure
When a new agent resumes:

1. Read the provided snapshot or the most recent relevant snapshot in `sessions/`.
2. Read `env.json` to resolve local absolute paths.
3. Go directly to the snapshot section `Next Action`.
4. Load only the files listed in the snapshot.
5. Continue from the exact recorded state.

Do not restart discovery from scratch unless the snapshot is stale or contradicted by current files.

## 4. Cross-Environment Paths
Snapshots must use paths relative to the relevant repository root.

Good:
- `app/routes/_home.reception/route.tsx`
- `src/modules/access/access.service.ts`

Bad:
- `D:\tecnipass-frontend\app\routes\...`
- `/home/onecode/data/tecnipass-frontend/app/routes/...`

The receiving agent resolves the absolute base path through `env.json`.

## 5. Snapshot Quality Rules
A useful snapshot must be:

- self-contained: no references like "as discussed earlier";
- actionable: the next action must be concrete;
- scoped: list only files that matter;
- honest: include validation state and blockers;
- resumable: include volatile errors or in-flight snippets only when needed.
