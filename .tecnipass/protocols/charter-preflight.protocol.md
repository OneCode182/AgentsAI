---
name: charter-preflight
description: Mandatory ambiguity, scope, and success-criteria check before planning, coding, orchestration, or review.
---

# Charter Preflight Protocol

## Purpose
The Charter Preflight prevents agents from implementing under unclear requirements.

Use it before:
- writing or changing code;
- decomposing work into subtasks;
- starting a multi-agent session;
- making commits;
- reviewing a large or ambiguous change.

## Required Output
Before execution, produce this internal or visible block:

```md
CHARTER_CHECK:
- Clarification level: LOW | MEDIUM | HIGH
- Work domain:
- Execution mode candidate: sequential | parallel | team
- Objective:
- Must not do:
- Success criteria:
- Assumptions:
- Blockers:
```

Legacy task files may still contain `CHARTER_PREFLIGHT`; treat it as the same contract. New agent files must use `CHARTER_CHECK`.

## Clarification Levels

| Level | Meaning | Action |
|---|---|---|
| LOW | Requirements are clear. Missing details have one safe local default. | Proceed and record assumptions. |
| MEDIUM | More than one interpretation exists, but one path is clearly lower risk. | Proceed only if assumptions are explicit and reversible. |
| HIGH | Intent, scope, data source, or success criteria cannot be determined safely. | Stop and ask the human for clarification. |

## Scope Rules
- List what must not be changed.
- Identify product areas, routes, APIs, or files likely to be affected.
- If backend changes are forbidden, state it explicitly.
- If shared components are affected, require impact analysis.
- If Git operations are requested, load the Git specialist and Git skill only for the needed operation.

## Success Criteria Rules
Success criteria must be testable.

Good:
- "`/reception` no longer renders the `Reportar error` button."
- "`pnpm type-check` passes after the change."
- "The existing shared tooltip API remains backward compatible."

Bad:
- "Improve the UI."
- "Make it better."
- "Fix everything."

## Block Rule
Block execution when:
- the required repository or file cannot be found;
- the task asks for destructive Git actions without explicit permission;
- the agent cannot identify which behavior must win in a conflict;
- a change would violate a direct human constraint.

Do not block only because work is complex. Plan and execute when the path is discoverable from local context.
