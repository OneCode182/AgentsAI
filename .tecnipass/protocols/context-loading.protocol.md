# Context Loading Protocol

> **Purpose**: load only the context required for the current decision, execution step, or validation.

For long-running sessions, use this protocol together with `protocols/context-budget.protocol.md`.

## Progressive Loading Levels

```text
Level 4: Source code excerpts required for the edit or verification
Level 3: Selective memory for the affected module
Level 2: Skills required by the active operation
Level 1: Prompt archive, active task, or specification
Level 0: Bootstrap context from AGENTS.md and env.json
```

## Level Rules

### Level 0 - Bootstrap
Load:
- `AGENTS.md`
- `env.json`

Only load `project.md` when stack, module, or permission context matters.

### Level 1 - Task Focus
For substantial human prompts, run `workflows/prompt-intake.workflow.md` and load the resulting `memory/prompts/{date}-{short-name}.prompt.md` reference.

Then load the assigned `.task.md` or `.spec.md`.

Do not scan unrelated active tasks unless the current work depends on them.

### Level 2 - Skills On Demand
Load a skill only when its trigger applies.

Examples:
- UI work: `skills/ui-tailwindcss-rules/SKILL.md`
- forms: `specs/tanstack-specs/SKILL.md`
- stack, pattern, SOLID-style, testing, accessibility, or framework best practices: relevant `skills/autoskills/{topic}/SKILL.md`
- Sonar validation: `skills/sonar-linting/SKILL.md`
- Git commit/conflict work: `agents/git-master.agent.md` and the specific `skills/git-master/` reference needed.

`skills/autoskills/` contains technical skills installed by autoskill for the current stack context and tools. Treat them as an on-demand technical library. Constructors of code and testing agents should actively consider them when implementing or validating stack-specific work.

### Level 3 - Selective Memory
Read only relevant sections from:
- `memory/patterns.md`
- `memory/mistakes.md`
- `memory/decisions.md`
- `memory/module-status.md`
- `memory/prompts/` only through `workflows/prompt-intake.workflow.md` or targeted similarity search

Do not load the full memory library unless the task is a harness or architecture review.

### Level 4 - Source Code
Use targeted discovery first:
- `rg --files`
- `rg`
- focused file excerpts;
- symbols or functions when available.

Full-file reads are acceptable for small files, route components, or when file-level structure matters.

## Anti-Patterns
Forbidden:
- loading multiple unrelated skills "just in case";
- reading broad repository context before identifying affected files;
- pasting large files into context when one function or component is enough;
- duplicating instructions that already live in an agent or protocol;
- re-reading files without checking whether they changed.

## Efficiency Rule
At least 70% of loaded context should influence the next action, analysis, or validation.

If loaded context is not used, narrow the next read and record only the relevant conclusion.
