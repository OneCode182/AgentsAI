---
name: harness-engineering-principles
description: TecniPass harness engineering principles, reference analysis, and adoption rules for external harness patterns.
---

# Harness Engineering Principles

## Purpose
This document defines how TecniPass evaluates and absorbs patterns from external harness systems.

Use it when:
- comparing agent frameworks;
- adapting orchestration workflows;
- deciding whether a new rule belongs in `agents/`, `protocols/`, `skills/`, `tasks/`, `sessions/`, or `memory/`;
- preventing provider-specific behavior from leaking into the TecniPass operating model.

## Reference Analysis: `oh-my-agent`
`oh-my-agent` is a strong productized harness architecture for automated multi-agent execution.

Its strongest patterns are:
- explicit separation between agents, workflows, rules, skills, hooks, config, and results;
- a first-class task board for orchestration;
- role-specific agents with narrow responsibilities;
- charter checks before implementation;
- progressive context loading;
- durable session/progress/result artifacts;
- verification and retry loops;
- quality gates with review phases;
- provider dispatch abstraction.

Its risky patterns for TecniPass are:
- strong coupling to its own CLI, MCP memory, and vendor dispatch commands;
- mandatory workflow steps that can be too heavy for small product fixes;
- broad generic rules that do not know TecniPass business constraints;
- too many always-loaded instructions when a task only needs one route, one hook, or one skill.

## What TecniPass Does Better
TecniPass is project-specific, not a generic agent product.

Current advantages:
- direct mapping to TecniPass frontend, backend, Sonar, and local environments;
- domain-aware architecture docs for product modules and infrastructure;
- explicit authority hierarchy controlled by human instructions, protocols, specs, and architecture;
- provider-agnostic execution mode selection;
- skills tuned for the actual stack and validation commands;
- persistent project memory for decisions, patterns, mistakes, and module status;
- safer human-governed Git and release behavior.

## Adopted Patterns
TecniPass adopts these concepts from generic harness systems:
- charter preflight before planning or coding;
- shared task list for team execution;
- scoped context packs;
- progress, result, and decision logs;
- file ownership control;
- verification and retry loops;
- context budget checks;
- quality gates before completion.

## Rejected Patterns
TecniPass does not adopt:
- hardcoded provider routing as core behavior;
- mandatory MCP-only execution;
- mandatory CLI-specific event emitters;
- automatic push, pull, force-push, or remote mutation;
- heavyweight orchestration for small single-file tasks;
- broad skill exposure when one targeted skill is enough.

## Placement Rules
Use the correct folder for each concept:

| Concept | Location | Reason |
|---|---|---|
| Agent role and responsibilities | `agents/` | Defines who acts. |
| Workflow contract and control rules | `protocols/` | Defines how work proceeds. |
| Tool or stack-specific execution guidance | `skills/` | Defines how to execute a specialized action. |
| Installed technical autoskills | `skills/autoskills/` | Provides stack-aware guidance, framework practices, testing patterns, design patterns, SOLID-style rules, and best practices installed by autoskill. |
| Product or feature requirement | `specs/` | Defines what must be built. |
| Work item and progress tracker | `tasks/` | Defines the current execution unit. |
| Resume and handoff record | `sessions/` | Preserves active session state. |
| Durable lessons and conventions | `memory/` | Stores reusable project knowledge. |
| Software, cloud, or system structure | `architecture/` | Defines product architecture, not agent workflow theory. |

## Adoption Test
Before adding an external harness pattern, all answers must be yes:

1. Does it reduce ambiguity for a future agent?
2. Does it preserve TecniPass business and architecture authority?
3. Is it provider-agnostic at the protocol level?
4. Can it be loaded only when relevant?
5. Does it avoid breaking existing developer workflows?
6. Is it concise enough for an LLM to follow without interpretation drift?

If any answer is no, adapt the pattern further or reject it.
