---
name: context-budget
description: Context loading budget, checkpoint, and reset rules for long-running TecniPass agent sessions.
---

# Context Budget Protocol

## Purpose
This protocol prevents context overload and instruction drift.

Use it when:
- reading many files;
- running multi-step debugging;
- orchestrating specialists;
- resuming a long session;
- the agent starts re-reading the same information.

## Core Rules
1. Load only context that can change the next decision.
2. Prefer `rg`, file lists, symbols, and focused excerpts before full files.
3. Do not re-read a file unless the file changed or the previous read is insufficient.
4. Record important findings in a task or session note instead of keeping everything in chat context.
5. Load skills and protocols only when their trigger applies.

## Loading Budget

| Context Type | Rule |
|---|---|
| `AGENTS.md` and `env.json` | Load at boot or when paths/authority are unclear. |
| `project.md` | Load once per new product area or when stack assumptions matter. |
| `protocols/` | Load only the protocol required by the current workflow. |
| `skills/` | Load only the skill required by the current operation. |
| `architecture/` | Load only for structural, infrastructure, or cross-contract decisions. |
| `memory/` | Load the relevant section, not the whole memory library. |
| source code | Start with search and targeted reads. Full-file reads are acceptable for small files or when structure matters. |

## Checkpoint Triggers
Create or update a session/task checkpoint when:
- the work spans more than one substantial phase;
- more than five important files have been inspected;
- a multi-agent session starts;
- a rebase/conflict flow is underway;
- validations failed and require a second implementation attempt;
- context is approaching the point where key constraints may be forgotten.

When context pressure is caused by harness drift, duplicated guidance, stale references, repeated corrections, or broad context loading, do not immediately load more harness files. First read `workflows/harness-evolution.state.json`; load `workflows/harness-evolution.workflow.md` only if the lightweight gate passes.

## Checkpoint Content

```md
## Context Checkpoint
- Objective:
- Non-negotiable constraints:
- Files inspected:
- Files changed:
- Decisions made:
- Remaining tasks:
- Validation status:
- Risks:
```

## Reset Rules
If a specialist appears stuck, shallow, or inconsistent:
1. stop assigning new work to that context;
2. write a checkpoint;
3. restart the specialist or continue sequentially from the checkpoint;
4. include only the remaining task, constraints, changed files, and validation failures.
