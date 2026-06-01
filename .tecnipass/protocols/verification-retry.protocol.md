---
name: verification-retry
description: Verification, retry, and escalation loop for implementation, QA, and review tasks.
---

# Verification Retry Protocol

## Purpose
This protocol turns validation failures into controlled correction loops.

Use it when:
- code was changed;
- a specialist reports completion;
- lint, type-check, tests, Sonar, QA, or review fails;
- a repeated bug needs a different hypothesis.

## Verification Stack
Run the checks that match the task scope:

| Scope | Required Evidence |
|---|---|
| Documentation only | Markdown links and reference consistency. |
| Frontend code | format, type-check, lint, targeted tests when available. |
| Backend code | format/lint, type-check/build, targeted tests, migration safety when relevant. |
| Shared component | impacted call sites or compatibility review. |
| Git operation | status, diff, staged files, commit message, branch context. |
| Multi-agent work | task board status, deliverables, QA/review evidence. |

## Retry Loop
When verification fails:

1. Capture the exact failure.
2. Identify whether the cause is implementation, requirement, environment, or tool availability.
3. Fix the root cause when it is in scope.
4. Re-run the failed check and any dependent checks.
5. Record evidence.

Retry limits:
- same mechanical failure: maximum 2 fix attempts before escalation;
- same requirement ambiguity: stop and ask the human;
- same architectural conflict: replan with the Orchestrator;
- same external tool outage: document and continue only if the human approves or the task allows skip conditions.

## Exploration Loop
Activate after the same in-scope issue fails twice.

Required steps:
1. State 2 or 3 hypotheses.
2. Choose the lowest-risk hypothesis first.
3. Test one hypothesis at a time.
4. Keep the winning approach and discard the others.
5. Record why the selected approach is safer.

## Escalation Output

```md
VERIFICATION_ESCALATION:
- Failed check:
- Attempts:
- Root cause classification:
- Evidence:
- Remaining options:
- Required human decision:
```

Do not claim completion while a required check is failing unless the human explicitly accepts the residual risk.
