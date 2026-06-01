---
name: biome-linting
description: Run formatting and type-checking in tecnipass-frontend, fix all errors, and repeat until both commands pass.
---

# Biome Linting Skill

## Scope
Use this workflow only in:
`/home/onecode/data/tecnipass-frontend`

## Goal
Finish with both checks passing:
1. `pnpm format`
2. `pnpm type-check`

## Required Workflow
1. Run `pnpm format`.
2. Run `pnpm type-check`.
3. If any error appears in either command:
   - Fix the reported issues in code.
   - Re-run `pnpm format`.
   - Re-run `pnpm type-check`.
4. Repeat step 3 until both commands pass with no errors.

## Rules
- Do not stop after the first failure.
- Do not mark the task complete while errors remain.
- Keep fixes minimal and safe: preserve existing behavior.
- Report completion only after both commands are clean in the same final run.
