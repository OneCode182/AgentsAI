---
name: init-session
description: Universal entry point for starting any task session. Covers session creation, execution mode decision, task definition with Gherkin acceptance criteria, INVEST/MoSCoW evaluation, agent delegation, and inter-layer communication.
---

# Init Session Workflow

> The single, unambiguous starting point for any agent entering the TecniPass harness to perform work.

Every task — regardless of complexity, domain, or provider — begins here.

---

## Phase 1: Environment Bootstrap

**Actor:** Orchestrator (`agents/orchestrator.agent.md`)

**Steps:**

1. Read `AGENTS.md` — resolve authority order and folder responsibilities.
2. Read `env.json` — resolve local paths for frontend, backend, and harness.
3. Check `sessions/_.index.md` → scan `sessions/` for an active or recent snapshot.
   - If a snapshot exists and matches the incoming task → resume from snapshot. Skip to Phase 3.
   - If no snapshot → continue to Phase 2.
4. Read `project.md` if the task touches product modules, permissions, or business rules.
5. Run the lightweight Harness Evolution Gate:
   - read `workflows/harness-evolution.state.json`;
   - do not load `harness-evolution.workflow.md` at boot unless there is already evidence of harness regression, stale references, repeated correction, or serious token waste.

**Output:** Environment is resolved. The orchestrator knows the harness layout, active sessions, and project context.

---

## Phase 2: Task Reception and Charter Preflight

**Actor:** Orchestrator

**Steps:**

1. Receive the task from the human (direct instruction, ticket reference, or spec file).
2. If the prompt is substantial, run `workflows/prompt-intake.workflow.md`:
   - archive the original prompt in `memory/prompts/`;
   - search similar prompts, sessions, and active tasks;
   - decide whether to resume existing work or create new work.
3. If prompt intake selects an existing session/task → resume that state and continue to Phase 3.
4. If a `.spec.md` exists → read it from `specs/`.
5. If no spec exists → the orchestrator formulates the task scope from the human instruction and links the prompt archive when available.
6. Run `protocols/charter-preflight.protocol.md` and produce the CHARTER_CHECK block:

```md
CHARTER_CHECK:
- Clarification level: LOW | MEDIUM | HIGH
- Work domain: {frontend | backend | full-stack | infrastructure | harness | product}
- Execution mode candidate: solo | subagents | agent-team
- Objective: {one sentence}
- Must not do: {explicit constraints}
- Success criteria: {testable conditions}
- Assumptions: {defaults applied}
- Blockers: {none or exact blocker}
```

7. **If HIGH** → stop, ask the human for clarification. Do not proceed.
8. **If MEDIUM** → state the ambiguity, pick the safest reversible path, document the assumption.
9. **If LOW** → proceed.

**Output:** The prompt is archived when needed, resume/new decision is explicit, and objective, constraints, and success criteria are clear.

---

## Phase 3: Execution Mode Decision

**Actor:** Orchestrator

**Input:** CHARTER_CHECK block from Phase 2 (or snapshot context from Phase 1).

Run `protocols/execution-mode.protocol.md` and apply this decision tree:

```
┌─────────────────────────────────────────────────────────┐
│                   EXECUTION MODE DECISION                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Q1: Can ONE agent complete the full task in a single    │
│      pass without needing exploration, testing, or       │
│      multiple file domains?                              │
│                                                          │
│      YES → SOLO MODE (Phase 4A)                          │
│      NO  → continue                                      │
│                                                          │
│  Q2: Are the subtasks independent? Can each be resolved  │
│      without lateral communication between workers?      │
│      Does the task need exploration, testing, or          │
│      moderate code study, but NOT cross-domain            │
│      collaboration?                                      │
│                                                          │
│      YES → SUBAGENT MODE (Phase 4B)                      │
│      NO  → continue                                      │
│                                                          │
│  Q3: Does the task require multiple viewpoints, code     │
│      study across domains, requirements validation,      │
│      testing, documentation, competing hypotheses, or    │
│      cross-layer coordination?                           │
│                                                          │
│      YES → AGENT TEAM MODE (Phase 4C)                    │
│      NO  → default to SOLO MODE (Phase 4A)               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Decision is recorded in the session.** No going back without an explicit replan trigger (see Phase 7).

---

## Phase 4A: Solo Mode

**Actor:** Orchestrator (acts as sole executor)

The orchestrator performs all work directly. No delegation.

1. Load required context from harness layers:
   - `architecture/_.index.md` → select relevant architecture docs.
   - `memory/_.index.md` → load `conventions.md` + domain-relevant memory.
   - `project/_.index.md` → load relevant business rules if product-facing.
   - `skills/` → load matching skills for the task domain.
2. Create the task checklist (see Phase 5).
3. Execute: Analyze → Plan → Execute → Verify → Document.
4. Run quality gate: `protocols/quality-gate.protocol.md`.
5. Close session (Phase 6).

---

## Phase 4B: Subagent Mode

**Actor:** Orchestrator (delegates to subagents)

Subagents work in isolation. They report results to the orchestrator. No lateral communication.

1. Decompose the task into independent subtasks.
2. For each subtask, verify:
   - Clear file ownership (no overlap).
   - Concrete deliverable.
   - Testable done criteria.
3. Create the task checklist with all subtasks (see Phase 5).
4. Build a **context pack** for each subagent (see `protocols/parallel-agent-architecture.md` → Context Packs):
   - Objective for the subtask.
   - Allowed/forbidden files.
   - Required skills, architecture docs, memory entries.
   - Expected deliverable format.
   - Acceptance criteria in Gherkin format.
5. Dispatch subagents from `agents/_.index.md` — select the matching specialist(s).
6. Collect results.
7. Synthesize: merge deliverables, resolve any inconsistencies.
8. Run quality gate on the merged result.
9. Close session (Phase 6).

---

## Phase 4C: Agent Team Mode

**Actor:** Orchestrator (acts as team lead)

Specialists collaborate through a shared task list. They can communicate laterally following `protocols/parallel-agent-architecture.md` → Communication Rules.

1. Load additional protocols:
   - `protocols/parallel-agent-architecture.md`
   - `protocols/task-board.protocol.md`
   - `protocols/context-budget.protocol.md`
   - `protocols/verification-retry.protocol.md`
   - `protocols/decision-log.protocol.md`
2. Decompose the task into a **Shared Task List** with dependencies (see Phase 5 for task shape).
3. Assign team members from `agents/_.index.md`:
   - Select specialists based on task domains (frontend, backend, QA, reviewer, git-master).
   - Each specialist receives a scoped context pack (not the full harness).
4. Build context packs per specialist:
   - Include: objective, task IDs, relevant files, required skills, architecture refs, known risks.
   - Exclude: irrelevant layers, other specialists' context, full repo context.
5. Dispatch the team. The orchestrator:
   - Monitors progress via task status updates.
   - Resolves blocking dependencies.
   - Prevents file ownership conflicts (serialize if overlap detected).
   - Facilitates inter-agent communication when needed.
6. As specialists complete tasks:
   - Collect deliverables and verification evidence.
   - Run `protocols/quality-gate.protocol.md` on each deliverable.
   - Failed checks → `protocols/verification-retry.protocol.md`.
7. Synthesize: merge all deliverables, produce final output.
8. Close session (Phase 6).

---

## Phase 5: Task Definition

**Actor:** Orchestrator (in all modes)

Every task — whether solo, subtask, or shared — must be defined with this structure before execution begins.

### 5.1 Task Checklist Structure

```md
## Task: {TEC-XXX or descriptive ID}

**Objective:** {one sentence}
**Owner:** {orchestrator | agent role}
**Priority (MoSCoW):** Must | Should | Could | Won't
**Files in scope:** {list}
**Files forbidden:** {list}
**Dependencies:** {task IDs or "none"}

### Acceptance Criteria (Gherkin)

- **Given** {precondition}
  **When** {action}
  **Then** {expected outcome}

- **Given** {precondition}
  **When** {action}
  **Then** {expected outcome}

### Evaluation Criteria

- [ ] **Completeness:** All acceptance criteria are met. No partial deliverables.
- [ ] **Clarity:** Code/output is readable, well-named, and follows `memory/conventions.md`.
- [ ] **Quality (INVEST):**
  - [ ] Independent: task can be completed without coupling to unrelated work.
  - [ ] Negotiable: implementation details are flexible within acceptance criteria.
  - [ ] Valuable: delivers measurable value toward the objective.
  - [ ] Estimable: scope is concrete enough to estimate effort.
  - [ ] Small: task is completable in a single focused session.
  - [ ] Testable: every criterion has a verifiable condition.
- [ ] **Business Value:** Change aligns with product rules in `project/business-rules.md`.
- [ ] **Prioritization (MoSCoW):** Priority is justified and respected during execution.

### Deliverable

{Expected output: file path, patch, report, evidence, etc.}
```

### 5.2 MoSCoW Prioritization

The orchestrator assigns priority to each task:

| Priority | Meaning | Execution rule |
|---|---|---|
| **Must** | Critical to the objective. Failure = session failure. | Execute first. Block session close if incomplete. |
| **Should** | Important but the objective survives without it. | Execute after all Musts. Flag if skipped. |
| **Could** | Desirable improvement. Low risk if omitted. | Execute only if time/context allows. |
| **Won't** | Out of scope for this session. Documented for future. | Do not execute. Log in session notes. |

### 5.3 INVEST Validation

Before dispatching any task, the orchestrator validates it against INVEST:

| Criterion | Check |
|---|---|
| Independent | No hidden coupling to other tasks' implementation. |
| Negotiable | Acceptance criteria define what, not how. |
| Valuable | Clear connection to the session objective. |
| Estimable | File scope and deliverable are concrete. |
| Small | Completable without context exhaustion. |
| Testable | Every acceptance criterion has a Given-When-Then. |

If a task fails INVEST → split it, clarify it, or escalate to the human.

### 5.4 Definition of Ready (DoR)

A task is ready for execution only when:

- [ ] Objective is one sentence, unambiguous.
- [ ] Acceptance criteria exist in Gherkin format (at least one Given-When-Then).
- [ ] File scope is declared (allowed + forbidden).
- [ ] Dependencies are resolved or explicitly listed.
- [ ] MoSCoW priority is assigned.
- [ ] INVEST criteria pass.
- [ ] Owner is assigned.
- [ ] Context pack is built (for subagent/team modes).

---

## Phase 6: Session Close

**Actor:** Orchestrator

1. Verify all **Must** tasks are `done` with evidence.
2. Document **Should** tasks that were skipped with reason.
3. Log **Won't** items for future reference.
4. Update harness layers as needed:

| Layer | Update when... |
|---|---|
| `tasks/` | Task files exist → update status to done or deferred. |
| `sessions/` | Multi-step or long session → create/update session record. |
| `memory/decisions.md` | A significant technical or product decision was made. |
| `memory/mistakes.md` | A bug, pitfall, or anti-pattern was discovered. |
| `memory/patterns.md` | A new reusable pattern emerged. |
| `memory/module-status.md` | A module's completion state changed. |

5. Re-run the lightweight Harness Evolution Gate before final response when the session was long, had repeated corrections, exposed harness drift, or created/renamed harness files.
   - If the gate passes → execute `workflows/harness-evolution.workflow.md`.
   - If the gate does not pass → record no harness evolution work and continue closing.
6. Produce the orchestrator output block:

```md
STATUS: completed | partial | blocked
- Execution mode: solo | subagents | agent-team
- Specialists: {list or "none"}
- Summary: {what was accomplished}
- Files changed: {list}
- Validations: {checks passed, skipped with reason}
- Decisions: {logged to memory/decisions.md or "none"}
- Residual risks: {list or "none"}
- Next step: {follow-up action or "none"}
```

---

## Phase 7: Replan Triggers

Switch execution mode or replan when any of these conditions appear during execution:

| Signal | Action |
|---|---|
| Two agents need the same file | Serialize: assign one owner, pause the other. |
| A task has vague deliverables | Stop. Redefine the task with concrete Gherkin criteria. |
| A specialist needs full repo context | Escalate to the orchestrator. Consider switching to solo mode. |
| Contracts are changing without a single owner | Pause all. Assign one owner for the contract. |
| QA cannot validate the deliverable | Redefine acceptance criteria or request evidence format. |
| Context budget is exhausted | Checkpoint via `protocols/context-budget.protocol.md`. Resume in a new session. |
| The orchestrator cannot state done criteria in one sentence | The task is too large. Split it. |

---

## Inter-Layer Communication Rules

Agents communicate through harness layers, not through ad-hoc messages. This ensures traceability and zero ambiguity.

| Need | Layer | Mechanism |
|---|---|---|
| Share a decision | `memory/decisions.md` | Append a dated entry. |
| Report a mistake or pitfall | `memory/mistakes.md` | Append a dated entry. |
| Update task progress | `tasks/` | Update task status in the shared task list. |
| Request a dependency resolution | `tasks/` | Set task status to `blocked` with blocking condition. |
| Transfer context to another session | `sessions/` | Create a snapshot per `protocols/handoff.protocol.md`. |
| Ask the orchestrator a question | Direct message (Agent Teams) or task comment | State the question and the decision needed. |
| Ask another specialist a question | Direct message (Agent Teams) or orchestrator relay | Only when it reduces risk or removes a dependency. |

**Rules:**

- All durable information goes into a harness layer file — not transient messages.
- Transient inter-agent messages are valid for real-time coordination but must not be the only record of a decision.
- When a specialist discovers new business rules, they report to the orchestrator, who updates `project/business-rules.md`.
- When a specialist encounters a reusable pattern, they report to the orchestrator, who updates `memory/patterns.md`.

---

## Quick Reference: Full Sequence

```
Human Instruction
       │
       ▼
 Phase 1: Bootstrap
 (AGENTS.md → env.json → sessions/ check → project.md)
       │
       ▼
 Phase 2: Charter Preflight
 (Receive task → CHARTER_CHECK → clarify or proceed)
       │
       ▼
 Phase 3: Execution Mode Decision
 (Q1: Solo? → Q2: Subagents? → Q3: Agent Team?)
       │
       ├──▶ Phase 4A: Solo ──────────────────┐
       ├──▶ Phase 4B: Subagents ─────────────┤
       └──▶ Phase 4C: Agent Team ────────────┤
                                              │
                                              ▼
                                     Phase 5: Task Definition
                                     (Gherkin + INVEST + MoSCoW + DoR)
                                              │
                                              ▼
                                         Execution
                                     (Analyze → Plan → Execute → Verify)
                                              │
                                              ▼
                                     Phase 6: Session Close
                                     (Evidence → Layer updates → Status report)
                                              │
                                     Phase 7: Replan if triggered
```
