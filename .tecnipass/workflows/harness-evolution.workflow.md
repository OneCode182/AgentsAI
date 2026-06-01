---
name: harness-evolution
description: Continuous improvement workflow for maintaining and optimizing the TecniPass harness during long-running or drift-prone sessions.
---

# Harness Evolution Workflow

> Improve `D:\AgentsAI\.tecnipass` only when there is evidence that the harness itself needs refinement.

Before loading this full workflow in future sessions, read `workflows/harness-evolution.state.json`. If the last execution is recent and no severe trigger exists, skip this workflow to preserve tokens.

Lifecycle:

```text
Observe -> Diagnose -> Propose -> Patch -> Verify -> Record -> Resume
```

## When To Use

**Actor:** Orchestrator (`agents/orchestrator.agent.md`)

Load this workflow only when at least one trigger has evidence:

| Trigger | Evidence |
|---|---|
| Long session | Context pressure, repeated checkpointing, or many phases completed. |
| Harness drift | Conflicting rules, stale references, missing indexes, naming mismatch, or duplicated rules. |
| Regression | A known harness flow became slower, noisier, ambiguous, or less reliable. |
| Repeated correction | The human corrected the same misunderstanding more than once. |
| Token inefficiency | Agents load broad context, duplicate rules, or read irrelevant files repeatedly. |
| Reusable pattern | A durable pattern belongs in `memory/`, `protocols/`, `workflows/`, `agents/`, or `skills/`. |
| Layer growth | New files were added and indexes, routing tables, or authority rules may be stale. |

Do not use this workflow for small product tasks without a harness concern.

## State Gate

Before executing this workflow, read `workflows/harness-evolution.state.json`, check `last_executed_at` and `cooldown_hours`, and skip unless evidence is strong enough. If cooldown has not elapsed, execute only when evidence matches `bypass_cooldown_when`.

After completing this workflow, update `harness-evolution.state.json`:

```json
{
  "last_executed_at": "{current ISO timestamp}",
  "last_execution_reason": "{trigger}",
  "last_result": "completed | skipped | blocked"
}
```

## Non-Goals

This workflow does not change product code, create generic recommendations without evidence, rewrite docs for aesthetics only, load every harness file, or replace `workflows/init-session.workflow.md`.

## Phase 1: Evidence Collection

**Goal:** prove a harness improvement is justified.

Load: `AGENTS.md`, `workflows/_.index.md`, `protocols/harness-engineering-principles.md`, `protocols/context-loading.protocol.md`, `protocols/context-budget.protocol.md`, and only files directly involved in the suspected issue.

Steps: state the trigger, record exact evidence, classify the issue as `drift`, `duplication`, `missing-reference`, `token-waste`, `quality-regression`, `stale-memory`, `unclear-agent-routing`, or `missing-workflow`, and stop if evidence is weak.

Output:

```md
HARNESS_OBSERVATION:
- Trigger:
- Evidence:
- Classification:
- Affected layer:
- Continue workflow: yes | no
```

## Phase 2: Minimal Diagnosis

**Goal:** find the smallest change that removes ambiguity or improves execution.

Load on demand:
- `agents/_.index.md` for agent routing issues.
- `protocols/_.index.md` for behavior-rule issues.
- `memory/_.index.md` for durable lessons.
- `sessions/_.index.md` for handoff/session issues.
- `tasks/_.index.md` for task-structure issues.
- relevant `skills/autoskills/{topic}/SKILL.md` only for technical-guidance quality.

Diagnosis checks:
1. Is the issue missing routing, stale routing, duplicated rules, unclear authority, or missing context guidance?
2. Which layer owns the fix?
3. Can the fix be one or two docs?
4. Does it reduce future token usage?
5. Does it improve execution quality measurably?

Stop if:
- the improvement is aesthetic only;
- the fix needs broad restructuring without clear benefit;
- the issue belongs to product code;
- the human forbids harness edits.

## Phase 3: Change Proposal

**Goal:** propose a narrow harness patch before editing.

```md
HARNESS_CHANGE_PROPOSAL:
- Problem:
- Evidence:
- Target files:
- Proposed change:
- Expected token impact:
- Expected quality impact:
- Risks:
- Validation plan:
```

Rules:
1. Do not propose more than three file edits unless the harness is structurally broken.
2. Prefer index/routing updates before new long documents.
3. Move rules to the correct layer instead of duplicating them.
4. Register new workflows, protocols, or agents in the matching `_.index.md`.
5. If agent behavior changes, update the agent template or routing docs.

## Phase 4: Patch

**Goal:** apply the approved or clearly safe minimal change.

Steps:
1. Edit only target harness files.
2. Keep files concise: workflows under 200 lines, protocols under 150 lines when practical, agents direct and role-specific, memory entries short and durable.
3. Use English Markdown.
4. Preserve provider-agnostic language.
5. Avoid tool-specific commands unless the file is a skill.

## Phase 5: Consistency Verification

**Goal:** keep the harness navigable and non-contradictory.

Verify:
- Index coverage: new or renamed files are listed in the correct `_.index.md`.
- Authority alignment: root `AGENTS.md` reflects layer responsibilities.
- No stale references: moved or removed files are not referenced by old paths.
- No duplicate rule drift: the same rule is not defined differently in multiple layers.
- Context discipline: normal tasks do not require broad loading.
- Provider neutrality: workflows and protocols are not tied to a specific vendor.

Fix any failed check before resuming product work.

## Phase 6: Decision And Memory Update

**Goal:** record only durable learning.

Use `protocols/decision-log.protocol.md`.

Update:
- `memory/decisions.md` for a durable harness architecture decision;
- `memory/patterns.md` for a reusable harness pattern;
- `memory/mistakes.md` for a repeated harness failure to avoid;
- no memory file for local housekeeping.

Do not log noise.

## Phase 7: Resume Original Session

**Goal:** return to the user's original work.

Before resuming, report:

```md
HARNESS_EVOLUTION_RESULT:
- Status: completed | skipped | blocked
- Trigger:
- Files changed:
- Token impact:
- Quality impact:
- Validation:
- Original session next step:
```

Continue the original task from its last known state.

## Replan Signals

Escalate to the human before continuing if:
- more than three harness layers need coordinated changes;
- authority order must change;
- an existing agent workflow would change materially;
- a product task depends on an unresolved harness decision;
- the same harness issue repeats after two improvement attempts.
