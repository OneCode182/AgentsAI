# TecniPass Harness - Navigation Index

> Entry point for TecniPass agents. Use this document to resolve authority, load the minimum context, and choose the correct execution path.

## 1. Boot Sequence

**Primary entry point:** `workflows/init-session.workflow.md` — the universal starting sequence for any task.

The workflow orchestrates the full boot, but the core steps are:

1. Read `env.json` and resolve local paths for frontend, backend, and harness.
2. Detect available runtime capabilities from the actual tools in the session. Do not infer capabilities from provider names.
3. Read `project.md` when stack, modules, permissions, or product conventions matter.
4. Check `sessions/` for an active or recent snapshot that must be resumed.
5. For substantial human prompts, run `workflows/prompt-intake.workflow.md` to archive the original prompt and decide whether to resume existing work or create new work.
6. Load the assigned `.task.md` or `.spec.md`.
7. Run `protocols/charter-preflight.protocol.md` before implementation or orchestration.
8. Read `protocols/execution-mode.protocol.md` to choose solo, subagents, or Agent Team execution.
9. If execution mode is `subagents` or `agent-team`, read:
   - `protocols/parallel-agent-architecture.md`
   - `protocols/task-board.protocol.md`
   - `protocols/context-budget.protocol.md`
   - `protocols/verification-retry.protocol.md`
   - `protocols/decision-log.protocol.md`
10. For infrastructure, device integration, databases, microservices, or cross-contract changes, read the relevant file in `architecture/`.
11. For technical implementation, testing, design patterns, SOLID-style practices, framework details, or stack-specific best practices, check `skills/autoskills/` and load only the autoskill that matches the active task.
12. For every long workflow or long session, perform the lightweight Harness Evolution Gate:
   - read `workflows/harness-evolution.state.json`;
   - if evidence shows harness drift, heavy regression, repeated correction, or serious token waste, load `workflows/harness-evolution.workflow.md`;
   - otherwise skip it and continue. Do not spend tokens on harness evolution without evidence.

## 2. Work Navigation

| Work Type | Entry File | Context To Load |
|---|---|---|
| **Any new task (start here)** | `workflows/init-session.workflow.md` | Orchestrator bootstraps all required layers |
| Prompt intake or resume decision | `workflows/prompt-intake.workflow.md` | `memory/prompts/_.index.md`, `sessions/_.index.md`, `tasks/_.index.md` |
| New feature | `specs/{feature}.spec.md` | `memory/patterns.md`, `memory/decisions.md` |
| Bug fix | `tasks/active/{issue}.task.md` | `memory/mistakes.md`, `memory/conventions.md` |
| UI or styling | `specs/{ui}.spec.md` | `skills/ui-tailwindcss-rules/SKILL.md`, `memory/patterns.md` |
| Forms | route/component task | `specs/tanstack-specs/SKILL.md` |
| Stack best practices | active code task | relevant `skills/autoskills/{topic}/SKILL.md` |
| Quality gates | active task | `protocols/quality-gate.protocol.md`, relevant linting skill |
| Git or commits | active task or user command | `agents/git-master.agent.md`, `skills/git-master/SKILL.md` |
| Continue previous session | `sessions/{snapshot}.snapshot.md` | `protocols/handoff.protocol.md`, `memory/module-status.md` |
| Refactor or paradigm change | `specs/{refactor}.spec.md` | `memory/conventions.md`, `memory/decisions.md` |
| Architecture or infrastructure | `architecture/_.index.md` | relevant `architecture/*.architecture.md` |
| Multi-agent orchestration | `agents/orchestrator.agent.md` | `protocols/parallel-agent-architecture.md` and its referenced protocols |
| Harness engineering | `workflows/harness-evolution.workflow.md` | `protocols/harness-engineering-principles.md`, only the affected harness docs |
| New or updated agent | `agents/_template.agent.md` | agent role, required skills, charter check, rules, and output contract |

## 3. Authority Order
When sources conflict, use this order:

1. Direct human instructions in the current conversation.
2. `workflows/` for session orchestration sequences.
3. `protocols/` for agent behavior and workflow rules.
4. `specs/` for functional requirements.
5. `architecture/` for product, cloud, and system structure.
6. `tasks/` for active execution state.
7. `skills/` for technical execution guidance.
8. `memory/` for durable project knowledge.

## 4. Folder Responsibilities

Every layer contains a `_.index.md` file as its entry point. Read the layer's `_.index.md` first — it provides a routing table, access patterns, contribution rules, and layer-specific constraints. Never read all files in a layer; use the index to select only what the task requires.

| Folder | Responsibility | Index |
|---|---|---|
| `workflows/` | End-to-end orchestration sequences that coordinate agents across layers. | `workflows/_.index.md` |
| `agents/` | Role definitions and responsibilities. | `agents/_.index.md` |
| `protocols/` | Provider-agnostic workflow contracts. | `protocols/_.index.md` |
| `project/` | Epic-level product backbone, user stories, business rules. | `project/_.index.md` |
| `architecture/` | Software, infrastructure, cloud, and logical system architecture. | `architecture/_.index.md` |
| `memory/` | Durable decisions, patterns, mistakes, and module status. | `memory/_.index.md` |
| `memory/prompts/` | Archived original prompts and routing metadata for similarity search and resume decisions. | `memory/prompts/_.index.md` |
| `specs/` | Product requirements and feature/fix specifications. | `specs/_.index.md` |
| `tasks/` | Active work items, task boards, and execution checklists. | `tasks/_.index.md` |
| `sessions/` | Session logs, snapshots, and handoffs. | `sessions/_.index.md` |
| `skills/` | Tool, stack, and operation-specific execution guidance. | — |
| `skills/autoskills/` | Installed technical autoskills for current stack context, tools, design patterns, SOLID-style practices, testing, accessibility, and framework best practices. Load only the matching autoskill for the task. | — |

## 5. Portability Principle
Never adapt the workflow to a specific provider, model, or client.

The contract is always:
1. resolve environment;
2. load minimal context;
3. run charter preflight;
4. choose execution mode;
5. execute within scope;
6. verify;
7. document state and decisions.

Provider-specific tools may implement this contract, but they do not define it.
