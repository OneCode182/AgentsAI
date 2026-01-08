# GitHub Copilot Instructions (OneContext)

> STOP: Before responding to ANY prompt
> You have to give me the sequence of steps that you will take to answer my prompt.
> You need to explain the exact workflow you're using; the context environment has several files, but you won't be reading them all; you'll only be accessing the ones you're interested in.
> I need you to show me the step-by-step process you're following. Let's say a kind of tree or workflow that you follow, accessing the files in chronological order, well-structured, and extremely concise.
> Finally, read `CONTEXT_HUB.md`.

---

## Instructions

Before performing any task, you MUST:

1. Read `CONTEXT_HUB.md` — the project entry point (mandatory).
2. Read `.context/governance/constitution.md` — role, tone, constraints (mandatory).
3. Read `.context/governance/tech-stack.md` — stack decisions and constraints.
4. When naming/terms matter, consult `.context/memory/domain-glossary.md` (zero-drift).
5. When asked to write frontend code, follow `.context/workflows/frontend-coding.md`.
6. When drafting backend asks/specs, follow `.context/workflows/backend-request.md`.

---

## Navigation

- Entry point: `CONTEXT_HUB.md`
- Governance: `.context/governance/`
- Memory: `.context/memory/`
- Workflows: `.context/workflows/`
- Skills: `.context/skills/`

---

This file exists to enforce the OneContext workflow and minimize drift.