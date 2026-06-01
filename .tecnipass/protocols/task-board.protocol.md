---
name: task-board
description: Shared Task List schema and ownership rules for sequential, parallel, and Agent Team execution.
---

# Task Board Protocol

## Purpose
The task board is the source of truth for active execution.

Use it for:
- complex sequential work;
- any parallel or Agent Team session;
- long tasks that may need handoff;
- work with multiple validation steps or file ownership risks.

## Location
Preferred locations:
- active task: `tasks/active/{task-id}.task.md`
- session state: `sessions/{date}-{topic}.session.md`
- handoff snapshot: `sessions/{date}-{topic}.snapshot.md`

## Shared Task List Schema

```md
## Shared Task List

| ID | Status | Priority | Owner | Scope | Files | Deliverable | Dependencies | Validation |
|---|---|---|---|---|---|---|---|---|
| T1 | pending | P0 | frontend | Route UI fix | `app/routes/...` | Patch + notes | none | `pnpm type-check` |
```

## Status Values
- `pending`: ready but not started.
- `in_progress`: currently owned and being worked.
- `blocked`: cannot proceed; blocker must be explicit.
- `review`: implementation done, waiting for QA or review.
- `done`: accepted by the Orchestrator with evidence.
- `deferred`: intentionally left out of scope.

## Priority Values
- `P0`: required to satisfy the user request.
- `P1`: important for correctness or regression safety.
- `P2`: useful improvement when time and scope allow.
- `P3`: optional follow-up.

## Ownership Rules
1. One task has one owner at a time.
2. Every task must declare editable files or file patterns.
3. Two agents must not edit the same file in parallel.
4. Shared contracts, schemas, routes, and generated files require serialized ownership.
5. A task may expand file scope only after Orchestrator approval.
6. A blocked task must state the exact missing input or dependency.

## Progress Update Format

```md
### Progress Update: {timestamp}
- Task:
- Owner:
- Status:
- Files read:
- Files changed:
- Evidence:
- Blockers:
- Next step:
```

## Completion Rules
A task can move to `done` only when:
- the deliverable exists;
- validation evidence is recorded;
- file scope was respected or scope expansion was approved;
- no unresolved P0/P1 review issue remains.
