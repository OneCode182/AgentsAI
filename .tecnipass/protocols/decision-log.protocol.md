---
name: decision-log
description: Lightweight decision and progress logging rules for TecniPass sessions.
---

# Decision Log Protocol

## Purpose
The decision log preserves reasoning that future agents must not rediscover.

Use it when:
- accepting a tradeoff;
- choosing between implementation paths;
- resolving a conflict;
- approving a scope expansion;
- skipping a validation;
- learning a durable project lesson.

## Where To Log

| Decision Type | Destination |
|---|---|
| Current task execution detail | `tasks/active/{task}.task.md` |
| Session progress and handoff state | `sessions/{date}-{topic}.session.md` |
| Durable product or architecture decision | `memory/decisions.md` |
| Reusable implementation pattern | `memory/patterns.md` |
| Avoidable mistake or pitfall | `memory/mistakes.md` |
| Module status change | `memory/module-status.md` |

## Entry Format

```md
### {YYYY-MM-DD} - {Decision title}
- Context:
- Decision:
- Rationale:
- Alternatives considered:
- Consequences:
- Evidence:
```

## Logging Rules
1. Log decisions, not every thought.
2. Keep entries short and factual.
3. Include file paths when the decision affects code.
4. Do not duplicate a decision across multiple memory files.
5. Promote task/session notes into `memory/` only when they are durable beyond the current task.

## Required Decisions
Always log:
- backend-forbidden frontend-only workarounds;
- shared component API changes;
- architecture or contract changes;
- validation skips;
- Git conflict resolution strategy;
- any repeated failure that changed the implementation approach.
