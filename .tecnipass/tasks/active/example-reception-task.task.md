---
id: TEC-495
spec_ref: specs/example-reception-feature.spec.md
status: in-progress
priority: high
execution_mode: sequential
created: 2026-05-26
updated: 2026-05-26
runtime_origin: current
---

# Task: TEC-495 - Implement Reception Search Autocomplete

> Example task showing how the harness tracks a reception feature with scoped subtasks and validation.

## Context

Frontend:
- `frontend/app/routes/_home.reception/route.tsx`
- `frontend/app/routes/_home.reception/components/SearchSuggestions.tsx`

Backend:
- `backend/src/features/reception/reception.controller.ts`
- `backend/src/features/reception/use-cases/search-visitor.use-case.ts`

## Charter Preflight

```md
CHARTER_CHECK:
- Clarification level: LOW
- Work domain: reception search
- Execution mode candidate: sequential
- Objective: implement debounced visitor search suggestions and direct check-in actions.
- Must not do: change unrelated reception flows, bypass validation, push remote branches.
- Success criteria: autocomplete renders after three characters and check-in mutation succeeds.
- Assumptions: existing backend module owns reception search.
- Blockers: none.
```

## Shared Task List

| ID | Status | Priority | Owner | Scope | Files | Deliverable | Dependencies | Validation |
|---|---|---|---|---|---|---|---|---|
| T1 | done | P0 | backend | Search use case | `backend/src/features/reception/...` | Search endpoint | none | backend tests |
| T2 | in_progress | P0 | frontend | Search suggestions UI | `frontend/app/routes/_home.reception/...` | Responsive suggestions component | T1 | type-check |
| T3 | pending | P1 | qa | Acceptance validation | changed files | QA verdict | T1,T2 | manual/test evidence |

## Done Criteria
- [ ] Autocomplete appears after at least three typed characters.
- [ ] Direct check-in calls the expected mutation successfully.
- [ ] UI adapts to mobile and tablet widths without overflow.
- [ ] Relevant frontend and backend checks pass or are documented.

## Decision Log

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-05-26 | Use TanStack Query for search state | Matches frontend data-fetching conventions. | Existing frontend stack |

## Progress Notes

### 2026-05-26
- Status: frontend integration in progress.
- Files inspected: reception route and backend use case.
- Files changed: example only.
- Validation: pending.
- Next step: wire debounced query to the suggestions component.

## Quality Gate
- [ ] Formatting completed.
- [ ] Type-check completed.
- [ ] Tests completed.
- [ ] Sonar/linting completed.
- [ ] No secrets or forbidden debug artifacts introduced.
- [ ] Commit message follows the requested commit protocol when committing.
