# Session Lifecycle Protocol

> **Purpose**: standardize how TecniPass agents start, execute, verify, and close development sessions.

## 1. Session Start
When taking control of a task:

1. Bootstrap from `AGENTS.md` and `env.json`.
2. Check `sessions/` for an active snapshot.
3. For substantial prompts, run `workflows/prompt-intake.workflow.md` to archive the original request and decide resume vs new session.
4. Load the assigned task or spec.
5. Run `protocols/charter-preflight.protocol.md`.
6. Select execution mode with `protocols/execution-mode.protocol.md`.
7. Load only the protocols, skills, architecture docs, and memory sections required by that mode.
8. For long or resumed sessions, perform the lightweight Harness Evolution Gate by reading `workflows/harness-evolution.state.json`. Load `workflows/harness-evolution.workflow.md` only when there is evidence of harness drift, regression, repeated corrections, or serious token waste.

Start message format:

```md
Session started.
- Environment:
- Prompt archive:
- Assigned task:
- Execution mode:
- Initial constraints:
```

## 2. Execution Flow
Use the pattern:

```text
Analyze -> Plan -> Execute -> Verify -> Document
```

### Analyze
Inspect current code, dependencies, constraints, and previous decisions.

### Plan
State files to read or modify, validation steps, and risk controls.

For multi-agent work, create a Shared Task List using `protocols/task-board.protocol.md`.

### Execute
Modify only scoped files. Follow relevant skills and architecture rules.

### Verify
Run applicable checks from `protocols/quality-gate.protocol.md` and `protocols/verification-retry.protocol.md`.

### Document
Update the active task, session log, and durable memory only when the information will matter later.

## 3. Normal Close
When the task is complete:

1. Summarize changed files and decisions.
2. Update the active `.task.md` status or checklist when a task file exists.
3. Create or update `sessions/{date}-{topic}.session.md` for long or multi-step work.
4. Update `memory/decisions.md`, `memory/patterns.md`, `memory/mistakes.md`, or `memory/module-status.md` only for durable lessons.
5. If the session was long, produced harness changes, or revealed harness drift, run the lightweight Harness Evolution Gate before final reporting.
6. Report validation results and unresolved risks.

## 4. Interrupted Or Long Session
If context is near exhaustion, the session is interrupted, or a handoff is needed:

1. Stop coding.
2. Create or update a snapshot in `sessions/`.
3. Include objective, constraints, files inspected, files changed, validations, blockers, and next step.
4. If context pressure came from harness drift, duplicated rules, stale references, or broad loading, note that the next session should evaluate `workflows/harness-evolution.state.json`.
5. Continue only from the snapshot or wait for the human to resume.

Use `protocols/context-budget.protocol.md` for checkpoint content.
