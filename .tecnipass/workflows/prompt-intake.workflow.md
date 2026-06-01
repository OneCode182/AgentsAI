---
name: prompt-intake
description: Archive incoming human prompts, search similar sessions, and decide whether to resume existing work or create a new task/session.
---

# Prompt Intake Workflow

> Preserve the original human prompt before agents summarize or execute it.

Use this workflow for substantial prompts that start, resume, redirect, or validate work.

## Phase 1: Archive Prompt

**Actor:** Orchestrator (`agents/orchestrator.agent.md`)

1. Read `memory/prompts/_.index.md`.
2. Create `memory/prompts/YYYY-MM-DD-{short-kebab-name}.prompt.md` from `_template.prompt.md`.
3. Store the original prompt verbatim unless it contains secrets.
4. Extract routing metadata: product area, routes/endpoints, roles, states, technical surface, requested skills, and constraints.

Output:

```md
PROMPT_ARCHIVE:
- File:
- Short name:
- Prompt type:
- Constraints:
```

## Phase 2: Similarity Search

Search only targeted layers:

1. `memory/prompts/` for similar archived prompts.
2. `sessions/` for active, blocked, or recent related sessions.
3. `tasks/active/` for matching active task boards.
4. `memory/mistakes.md` and `memory/patterns.md` only if the prompt is a bugfix or repeated pattern.

Search by route, endpoint, query param, UI label, business state, role, field name, requested skill, and visible error.

Output:

```md
SIMILARITY_RESULT:
- Similar prompts:
- Similar sessions:
- Similar active tasks:
- Confidence: low | medium | high
```

## Phase 3: Resume Or Create Decision

Resume existing work when:
- confidence is high;
- a matching session/task is active, blocked, or incomplete;
- the new prompt asks to continue or fix the same unresolved issue.

Create new work when:
- confidence is low or medium without active state;
- previous work is completed;
- the new prompt changes scope, constraints, workflow, or validation requirements.

Update the prompt archive `execution_decision` and related file references.

Output:

```md
PROMPT_ROUTING_DECISION:
- Decision: resume-existing | create-new
- Rationale:
- Related prompt:
- Related session:
- Related task:
```

## Phase 4: Workflow And Agent Routing

Select the next workflow:
- Product implementation, bugfix, validation, or review: `workflows/init-session.workflow.md`.
- Harness improvement: `workflows/harness-evolution.workflow.md` after reading `workflows/harness-evolution.state.json`.
- Git-only task: `agents/git-master.agent.md` with the relevant Git skill.

Define:
- primary agent;
- supporting agents;
- required skills;
- relevant autoskills;
- business context;
- validation expectations.

Do not load all selected resources immediately. Pass them as a scoped context plan for the next phase.

## Phase 5: Continue Session

If resuming:
- load the matching session snapshot or task board;
- continue from the recorded next action.

If creating new:
- continue through `workflows/init-session.workflow.md`;
- create a task/session only when the work is substantial enough to track.

The prompt archive remains the immutable source of the original user request.
