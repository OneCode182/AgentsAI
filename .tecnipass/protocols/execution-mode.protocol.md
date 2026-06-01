# Execution Mode Protocol

> **Purpose**: define how the Orchestrator chooses sequential execution, fork-join subagents, or collaborative Agent Team mode.

This protocol decides the mode. The detailed multi-agent operating model lives in:
`protocols/parallel-agent-architecture.md`

Before choosing a mode, run `protocols/charter-preflight.protocol.md`.

## Decision Tree

```text
Does the task have independent subtasks?
  no  -> sequential
  yes -> Do subtasks share mutable state, files, or contracts?
           yes -> sequential or serialized ownership
           no  -> Are there more than two substantial tasks or multiple roles?
                    yes -> agent team
                    no  -> parallel subagents
```

## Modes

### Sequential
One agent performs the full lifecycle.

Use when:
- the task is small;
- subtasks depend strongly on each other;
- the same files or contracts are touched;
- a technical decision must be made before implementation;
- a previous session snapshot requires careful continuation.

### Parallel Subagents
The Orchestrator delegates isolated subtasks and later synthesizes the outputs.

Use when:
- work can be split by independent files, folders, or checks;
- specialists do not need lateral communication;
- each output can be reviewed and merged independently;
- file ownership does not overlap.

### Agent Team
The Orchestrator leads a team of specialists using a Shared Task List.

Use when:
- multiple roles must collaborate;
- QA or review should run alongside implementation;
- specialists need to share findings;
- there are competing hypotheses;
- the work has several substantial streams with explicit dependencies.

When this mode is selected, the Orchestrator must read:
`protocols/parallel-agent-architecture.md`

Then load companion protocols only as needed:
- `protocols/task-board.protocol.md`
- `protocols/context-budget.protocol.md`
- `protocols/verification-retry.protocol.md`
- `protocols/decision-log.protocol.md`

## Provider-Agnostic Rules
- Select the mode from task structure, not from provider name.
- If native Agent Teams are available, use them following the architecture contract.
- If only subagents are available, emulate Agent Team handoffs through scoped subtasks and Orchestrator synthesis.
- If no multi-agent capability is available, emulate the same plan sequentially with explicit checkpoints.
- Parallelization is valid only when every unit has clear scope, file ownership, deliverable, and done criteria.
- If two specialists need the same file, the Orchestrator must serialize the work.

## TecniPass Examples
- Reception bug fix across one route and one shared hook: sequential.
- Sonar cleanup across unrelated folders: parallel subagents.
- New digital-signature workflow involving API, UI, QA, and review: Agent Team.
- Architecture change involving frontend/backend contracts: Agent Team until contracts settle, then sequential or parallel by file ownership.

## Replan Triggers
Switch modes or replan when:
- file ownership overlaps;
- a task has no concrete deliverable;
- QA cannot validate the result;
- a specialist needs broad context beyond its assigned scope;
- the Orchestrator cannot state the done criteria clearly.
