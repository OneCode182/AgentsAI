---
name: generate-pr-description
description: Generates an ultra-concise, business-aligned PR description using markdown tables. Scans git history and diffs in read-only mode. Does not modify code, commits, or comments.
---

# Generate PR Description

## Overview

This skill analyzes git changes in **read-only mode** to generate an ultra-concise, professional, and business-aligned Pull Request description. It synthesizes technical details into a structured Markdown format optimized for quick review.

> [!important] 
> **READ-ONLY EXECUTION**: This skill MUST NOT modify any code, files, comments, or git history. It only reads information to generate the Markdown output.

## Workflow

1. **Context Gathering (Read-Only)**
   - Identify current and target branches (`git branch --show-current`, `git merge-base`).
   - Extract commit messages and diffs (`git log`, `git diff --name-status`, `git diff`).
2. **Analysis & Synthesis**
   - Align changes with business objectives.
   - Categorize files into New, Modified, and Deleted.
   - Extract the core intent and impact of the PR.
3. **Output Generation**
   - Produce the Markdown description using the exact template below.

## Output Template

Generate **ONLY** the following Markdown structure. Keep it ultra-concise.

```markdown
### 🚀 Resumen del PR

**Objetivo de Negocio:** [Explicación ultra-concisa de 1-2 líneas del valor que aporta este PR]

| Historia / Contexto | Tipo de Cambio | Riesgo |
| :--- | :--- | :--- |
| [Breve ref a HU o Cambio] | [Feature/Fix/Refactor/Chore] | [Bajo/Medio/Alto] |

---

### 📝 Cambios Principales

- [Cambio clave 1, ej: "Implementada autenticación Zod"]
- [Cambio clave 2, ej: "Refactorizado sidebar a componentes SRP"]

---

### 🧩 Componentes Afectados

| Estado | Archivos / Componentes Clave |
| :---: | :--- |
| 🟢 **Nuevos** | `EjemploNuevo.tsx`, `useEjemplo.ts` |
| 🟡 **Modificados** | `Sidebar.tsx`, `auth.route.tsx` |
| 🔴 **Eliminados** | `legacy.css` |

---

### ✅ Criterios de Calidad (Quality Gate)

| Criterio | Estado |
| :--- | :---: |
| Cumple estándares de Clean Code / SOLID | [✅/⚠️] |
| Sin TODOs colgantes en rutas críticas | [✅/⚠️] |
| Impacto en Performance evaluado | [✅/⚠️] |
| Accesibilidad y Look & Feel respetados | [✅/⚠️] |
```

## Guardrails (Reglas Estrictas)

- **Ultra-conciso**: Evita párrafos largos. Usa viñetas y tablas.
- **Sin formato crudo**: No incluyas dumps de git log ni diffs en la salida final.
- **Read-only absoluto**: No ejecutes comandos que alteren el estado (ni `commit`, ni `push`, ni formateo de código).
- **Negocio primero**: El resumen debe entenderse desde la perspectiva del producto/negocio.
- **Sin emojis**: No usar emojis ni íconos decorativos en títulos, tablas o contenido.
