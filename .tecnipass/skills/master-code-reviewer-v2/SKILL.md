---
name: master-code-reviewer-v2
description: "Master Code Reviewer para TECNIPASS. Revisa Pull Requests del proyecto tecnipass-frontend / tecnipass-backend contra estándares ISO/IEC 25000, SOLID, Clean Code, Look & Feel del Design System, reglas Tailwind, contrato Tanstack Form/Zod y patrones de arquitectura frontend de la app. Sincroniza ramas con git, compara la rama actual contra `feat/new-backend-connection` y produce un único entregable: un `feedback-<branch>-<YYYY-MM-DD>.md` clasificado en Crítico, Medio y Normal, optimizado para Obsidian. Triggers: review pr, code review tecnipass, master review, revisar pull request, auditar pr, revisar rama feat/new-backend-connection, evaluar calidad de código tecni, hacer code review profundo, code review profesional, verificar calidad TECNIPASS."
---

# Master Code Reviewer v2 — TECNIPASS

Skill de **revisión de código maestra** para los repos de TECNIPASS. Une lo mejor de:

- `prepare-pr` y `review-pr` (flujo PR script-first, deterministas)
- `frontend-architecture-authority` (decisión arquitectónica, SOLID, sistemas)
- `enforce-quality-standards` (Clean Architecture, Quality Gate)
- `coding-standards` (KISS, DRY, YAGNI, naming, error handling, performance)
- `frontend-patterns` (composición, hooks, perf, accesibilidad)
- `frontend-design` + `ui-ux-pro-max` (Look & Feel, accesibilidad, motion, UI states)
- `ui-tailwindcss-rules` (Tailwind exclusivo, no CSS modules)
- `tanstack-specs` (contrato Tanstack Form + Zod del proyecto)
- `obsidian-markdown` (sintaxis Obsidian para el feedback final)

> [!important] Esta skill **NO modifica código**. Solo audita y produce un único documento `feedback-*.md` con propuestas de cambio para que otro agente las aplique.

---

## Cuándo usar

Activar cuando el usuario pide:

- "Haz un code review profundo del PR de TECNIPASS"
- "Revisa la rama actual contra `feat/new-backend-connection`"
- "Auditar calidad ISO 25000 del frontend"
- "Master review pre-merge"
- "Quiero feedback Crítico/Medio/Normal"

**No activar** si el usuario pide aplicar cambios, hacer commits o mergear. Esta skill es **read-only**.

---

## Contexto verificado del proyecto

### Stack TECNIPASS Frontend (`D:\tecnipass-frontend`)

| Capa | Tecnología | Notas |
|------|------------|-------|
| Framework | **Remix 2.14** + React 18.3 + TypeScript 5.9 | Routing en `app/routes` con convención `_home.*` y `auth.*` |
| Estilos | **Tailwind 3.4** + `tailwind-variants` + `tailwind-merge` + `tailwindcss-themer` | **Prohibido** CSS Modules y `.css` propios (regla `ui-tailwindcss-rules`) |
| UI Primitivas | **Radix UI** (alert-dialog, dropdown-menu, popover, select, switch, tooltip, etc.) + **shadcn-style** wrappers en `app/shared/components` |
| Formularios | **@tanstack/react-form 1.15** + **Zod** | Patrón obligatorio: ver `tanstack-specs/SKILL.md` |
| Data fetching | **@tanstack/react-query 5.83** + Axios | Mutaciones tipadas en `app/shared/hooks/**` |
| Tablas | **@tanstack/react-table 8.21** | Wrappers en `app/shared/components/tabbed-table-group` |
| Realtime | socket.io-client 4.8 | Contexto en `app/shared/context/recording.tsx` |
| Iconos | `iconsax-react` + SVGs propios en `app/shared/components/icons/*` | **Prohibido** emojis como iconos estructurales |
| Package manager | **pnpm** | Scripts: `pnpm format`, `pnpm check` (ver `enforce-quality-standards`) |

### Negocio TECNIPASS (resumen no negociable)

Sistema de **control de acceso** y **optimización de parqueaderos** para conjuntos inmobiliarios de Tecni. Entidades clave: *Conjunto Inmobiliario, Unidad Inmobiliaria, Unidad Ocupante, Parqueadero, Recurso Reservable, Barrera de Acceso, Vehículo*. Actores: *Adm Inmobiliario, Gestor de Unidad, Ocupante, Visitante, Portero, Gerente, Adm Sistema, Cajero*. **Prioridades del negocio**:

1. **Agilidad y seguridad** en ingreso (biometría, placas, NFC, QR).
2. **Disponibilidad 7×24** y modo de operación en falla.
3. **Confidencialidad** y tratamiento de datos.
4. **Independencia** de la administradora.
5. **Datos consolidados** para analítica.

> [!tip] Toda observación del review debe **trazar al impacto de negocio** cuando aplique (ej.: "Si esta consulta cae, los porteros pierden el listado en línea").

---

## Workflow de ejecución (orden estricto)

### Phase 0 — Preflight

1. Confirmar repo y rama de trabajo:
   ```bash
   cd D:/tecnipass-frontend   # o D:/tecnipass-backend según pida el usuario
   git rev-parse --abbrev-ref HEAD
   ```
2. Verificar limpieza del working tree:
   ```bash
   git status --porcelain
   ```
   Si hay cambios sin commitear, **detenerse** y reportar; no se revisa con working tree sucio.

### Phase 1 — Sincronización de ramas

> [!warning] Las ramas pueden estar desincronizadas. Esta fase es **obligatoria** antes de cualquier diff.

```bash
git fetch origin --prune
git checkout feat/new-backend-connection
git pull --ff-only origin feat/new-backend-connection
git checkout -    # vuelve a la rama actual del PR
git pull --ff-only origin "$(git rev-parse --abbrev-ref HEAD)" || true
```

Computar la base de comparación:

```bash
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
TARGET_BRANCH=feat/new-backend-connection
MERGE_BASE=$(git merge-base "$TARGET_BRANCH" "$CURRENT_BRANCH")

git log --oneline "$MERGE_BASE".."$CURRENT_BRANCH"
git diff --stat "$MERGE_BASE".."$CURRENT_BRANCH"
```

Si `MERGE_BASE` está vacío o las ramas divergen sin antepasado común, **detenerse** y avisar al usuario.

### Phase 2 — Inventario del cambio

Listar archivos tocados y clasificarlos:

```bash
git diff --name-status "$MERGE_BASE".."$CURRENT_BRANCH"
```

Categorías esperadas:

- **Rutas / pages** (`app/routes/**/route.tsx`, `*.form.ts`)
- **Componentes compartidos** (`app/shared/components/**`)
- **Hooks de datos** (`app/shared/hooks/**`)
- **Validaciones / utils** (`app/shared/lib/**`)
- **Estilos / temas** (`tailwind.config.*`, themer)
- **Tests** (Playwright en `tests/`)
- **Config** (`vite.config.ts`, `package.json`, `tsconfig.json`)

### Phase 3 — Análisis multi-eje

Cada archivo modificado se evalúa contra los **8 ejes** que combinan ISO/IEC 25010 (model dentro de la familia 25000) con las reglas operativas del proyecto. **Ningún eje se omite.**

#### Eje A — Functional Suitability (ISO 25010 §1)

- ¿La feature cumple lo descrito en el ticket / use case?
- ¿La función es **completa** (sin TODOs colgantes en flujo crítico)?
- ¿Es **correcta** (cubre casos límite del negocio: visitante sin foto, vehículo sin placa, fallo de barrera, modo offline)?
- ¿Es **apropiada** (no introduce comportamiento ajeno al alcance del PR)?

#### Eje B — Performance Efficiency (ISO 25010 §2)

- Listas largas: ¿se virtualiza con `@tanstack/react-virtual` o se pagina? (regla `frontend-patterns` §Virtualization).
- Renders: ¿se usa `useMemo` / `useCallback` / `React.memo` donde corresponde sin abusar?
- Imágenes / assets: dimensiones declaradas, lazy load (regla `ui-ux-pro-max` §Performance).
- Red: `Promise.all` para llamadas paralelas (regla `coding-standards`).
- Sin `console.log` en hot paths.

#### Eje C — Compatibility & Architecture (ISO 25010 §3 + Frontend Authority)

- **Separation of concerns**: rutas no contienen lógica de fetching cruda; va a `shared/hooks`.
- **SRP** (Single Responsibility): un componente = un propósito.
- **Predecibilidad de estado**: estado local del form en TanStack, **no** duplicado en `useState`.
- **Convención sobre configuración**: respeta `app/routes/<scope>/<feature>/{route.tsx, components/, *.form.ts}`.
- No introduce ciclos de import; respeta `@shared/*` paths.

#### Eje D — Usability / Look & Feel (ISO 25010 §4 + ui-ux-pro-max)

> [!check] Revisar **siempre** estos puntos cuando el PR toca UI.

- **Accesibilidad CRITICAL**: contraste ≥ 4.5:1, focus visible, `aria-label` en iconos, navegación por teclado, `prefers-reduced-motion` respetado.
- **Touch targets** ≥ 44×44px; spacing ≥ 8px entre elementos tocables.
- **Feedback de estado**: loading, success, error, disabled tienen tratamiento visual distinto y semántico.
- **Tipografía**: 16px base, `line-height` 1.5–1.75, jerarquía clara.
- **Color tokens**: usar tokens del themer, **prohibido hex crudo** en componentes.
- **Iconos**: SVG/iconsax, **nunca** emojis estructurales; un solo set, stroke consistente.
- **Animaciones**: 150–300ms, `transform`/`opacity`, sin animar `width`/`height`/`top`/`left`.
- **Layout shift**: reservar espacio para contenido async (CLS < 0.1).
- **Responsividad**: mobile-first, sin scroll horizontal, breakpoints sistemáticos.

#### Eje E — Reliability & Robustez (ISO 25010 §5)

- Manejo de errores: bloques `try/catch` con mensaje legible; nunca tragar excepciones.
- **Modo falla** del negocio: si la feature toca acceso/parqueadero, ¿se contempla pérdida de red? (requisito TECNIPASS).
- Estados vacíos: empty states con guía, no pantallas en blanco.
- Defensa contra `null` / `undefined`: optional chaining + fallback.
- Idempotencia en mutaciones críticas (autorizaciones, cobros).

#### Eje F — Security (ISO 25010 §6)

- No hay tokens / secretos hardcodeados.
- JWT decodificado con `jwt-decode` se valida vencimiento.
- Inputs validados con **Zod** antes de enviar al backend.
- No se confía en datos del cliente para autorización (RBAC server-side).
- No se loggean PII (cédulas, placas, fotos) en `console.log` ni Sentry sin redaction.

#### Eje G — Maintainability / Clean Code & SOLID (ISO 25010 §7)

- **Naming**: descriptivo (`isUserAuthenticated`, `fetchOccupantById`), no abreviaturas oscuras.
- **Funciones**: < 50 líneas; una responsabilidad; verbo-sustantivo.
- **Profundidad** de anidación ≤ 3; usar early-returns.
- **Magic numbers**: extraídos a constantes con nombre.
- **DRY**: lógica repetida en 2+ lugares se extrae a `shared/lib` o hook custom.
- **YAGNI**: no se introduce abstracción especulativa.
- **Inmutabilidad**: spread operator, `never push/mutate`.
- **TypeScript**: nada de `any`; tipos explícitos en exports públicos.
- **SOLID** en componentes:
  - **S**RP — un componente, una intención.
  - **O**CP — variantes vía props (`variant`, `size`), no condicionales hardcodeadas.
  - **L**SP — wrappers de Radix mantienen contrato.
  - **I**SP — props granulares, no "god props".
  - **D**IP — depender de hooks/servicios, no de implementaciones concretas.

#### Eje H — Portability / Tooling (ISO 25010 §8)

- Sólo `pnpm` (sin `npm`/`yarn`).
- `pnpm format && pnpm check` deben pasar.
- Sin imports relativos profundos (`../../../`); usar alias `@/`, `@shared/*`.
- ESLint/BiomeJS sin warnings nuevos.

### Phase 4 — Reglas no negociables del proyecto

> [!danger] El incumplimiento de cualquiera de estas reglas se clasifica **automáticamente como Crítico**.

#### R1 — Tailwind exclusivo (`ui-tailwindcss-rules`)

- ❌ Crear `.css` o `.module.css`.
- ❌ Usar valores arbitrarios `w-[317px]` salvo edge case justificado.
- ✅ Tokens del `tailwind.config`.
- ✅ Si una composición se repite, extraer **componente**, no clase CSS.

#### R2 — Tanstack Form + Zod (`tanstack-specs`)

- ✅ Existe `*.form.ts` con `createFormHookContexts/createFormHook`.
- ✅ `validators.onSubmit` usa `safeParse` + `groupIssuesByPath(getErrorsFromZodError(...))`.
- ✅ Errores de mutación se reflejan vía `setErrorMap({ onSubmit: { form, fields } })`.
- ✅ Campos usan `field.state.value`, `field.handleChange`, `getFieldErrors(field.state.meta.errors)`.
- ❌ **Prohibido** `useState` para duplicar valores que ya están en TanStack Form.
- ❌ **Prohibido** inventar formato de errores distinto al patrón `ApiErrorIssue[]`.

#### R3 — Estructura de directorios

- Rutas en `app/routes/<scope>/<feature>/{route.tsx, components/, *.form.ts}`.
- Hooks de datos en `app/shared/hooks/<domain>/`.
- Validaciones Zod en `app/shared/lib/validation/`.
- Utilidades en `app/shared/lib/{utils,errors}.ts`.

#### R4 — Idioma y comentarios

- Código y comentarios técnicos en **inglés**.
- Mensajes para el usuario final en **español**.
- Commits siguen el `commit-helper`/Conventional Commits.

#### R5 — No mutar nunca el sistema en review

- ❌ No `git push`, no `git commit`, no merges.
- ❌ No correr migraciones, no tocar `.env`.
- ✅ Solo lectura + producción del feedback `.md`.

### Phase 5 — Producción del feedback

Crear el documento de feedback en la **misma carpeta de la skill**:

```
D:/AgentsAI/.tecni/skills/master-code-reviewer-v2/feedback-<current-branch>-<YYYY-MM-DD>.md
```

Reemplazar `<current-branch>` slug-ificado (ej.: `refactor-data-table`) y `<YYYY-MM-DD>` con la fecha del review.

Si ya existe el archivo, **no sobreescribir**; agregar sufijo `-rNN` (`-r02`, `-r03`...).

#### Plantilla obligatoria del feedback

> [!important] Usar **exactamente** esta plantilla. Está optimizada para Obsidian: frontmatter YAML, callouts, tablas, wikilinks, mermaid si aplica.

```markdown
---
created: <YYYY-MM-DD>
modified: <YYYY-MM-DD>
type: code-review
project: tecnipass
repo: tecnipass-frontend
current-branch: <CURRENT_BRANCH>
target-branch: feat/new-backend-connection
merge-base: <SHORT_SHA>
reviewer: master-code-reviewer-v2
status: pending-fixes
tags:
  - code-review
  - tecnipass
  - iso-25000
  - <feature-tag>
---

# Code Review — <CURRENT_BRANCH> → feat/new-backend-connection

> [!abstract] Resumen ejecutivo
> - **Archivos tocados:** <N>
> - **Hallazgos:** Críticos <C> · Medios <M> · Normales <N>
> - **Recomendación final:** `READY` | `CHANGES REQUESTED` | `BLOCKED`
> - **Riesgo de negocio:** <Bajo | Medio | Alto>
> - **Cumplimiento ISO/IEC 25010:** <%>  (ver tabla abajo)

## Contexto

- **Rama actual:** `<CURRENT_BRANCH>`
- **Rama destino:** `feat/new-backend-connection`
- **Merge base:** `<SHORT_SHA>`
- **Commits revisados:**
  - `<sha> — <subject>`
  - ...

## Mapa de cumplimiento ISO/IEC 25010

| Eje | Estado | Comentario |
|-----|:------:|------------|
| Functional Suitability | ✅/⚠️/❌ | ... |
| Performance Efficiency | ✅/⚠️/❌ | ... |
| Compatibility / Architecture | ✅/⚠️/❌ | ... |
| Usability / Look & Feel | ✅/⚠️/❌ | ... |
| Reliability / Robustez | ✅/⚠️/❌ | ... |
| Security | ✅/⚠️/❌ | ... |
| Maintainability (Clean Code + SOLID) | ✅/⚠️/❌ | ... |
| Portability / Tooling | ✅/⚠️/❌ | ... |

---

## 🔴 1. Hallazgos Críticos

> [!danger] Los hallazgos Críticos **deben resolverse** antes de mergear. Bloquean la PR.

### C-01 — <Título corto y accionable>

- **Eje:** <A..H>
- **Regla violada:** <R1 Tailwind | R2 Tanstack Form | SOLID-SRP | ISO 25010 §X.Y | ...>
- **Archivos involucrados:**
  - [[<ruta/archivo.tsx>]]
  - [[<otra-ruta/archivo.ts>]]
- **Componentes / hooks afectados:** `<NombreComponente>`, `use<Hook>`
- **Por qué es un error:** <explicación clara, citando la línea o función>
- **Impacto en el negocio:** <ej.: rompe el ingreso de visitantes con vehículo en modo offline>
- **Propuesta de cambio:**
  ```diff
  - // código actual problemático
  + // código propuesto
  ```
  Pasos:
  1. ...
  2. ...
- **Verificación:** <cómo comprobar que se arregló — test, comando, escenario manual>

### C-02 — ...

---

## 🟡 2. Hallazgos Medios

> [!warning] Importantes para la calidad. Deberían resolverse en este PR; si se difieren, crear ticket.

### M-01 — <Título>

(Mismos campos que en Críticos)

---

## 🟢 3. Hallazgos Normales

> [!tip] Mejoras y polish. Pueden ir en este PR si son baratas; si no, ticket de seguimiento.

### N-01 — <Título>

(Mismos campos que en Críticos)

---

## Métricas del review

| Métrica | Valor |
|---------|------:|
| Archivos revisados | <N> |
| LOC añadidas | +<N> |
| LOC eliminadas | −<N> |
| Hallazgos totales | <N> |
| Cobertura de ejes ISO | 8/8 |

## Próximos pasos

- [ ] Resolver todos los Críticos
- [ ] Resolver Medios o crear ticket
- [ ] Re-ejecutar `pnpm format && pnpm check`
- [ ] Re-correr suite Playwright impactada
- [ ] Re-pedir review (`master-code-reviewer-v2`)

## Referencias

- [[Proyecto Tecni-Pass]]
- [[ui-ux-pro-max]]
- [[tanstack-specs]]
- [[ui-tailwindcss-rules]]
- [[frontend-architecture-authority]]
- [[enforce-quality-standards]]

%% Generado por master-code-reviewer-v2 — no editar manualmente sin marcar `modified`. %%
```

### Phase 6 — Cierre

1. Imprimir en consola un resumen de **una línea por hallazgo** con su severidad.
2. Imprimir la ruta absoluta del feedback `.md` generado.
3. Imprimir el veredicto final: `READY`, `CHANGES REQUESTED`, o `BLOCKED`.
4. **No** pushear, **no** commitear, **no** modificar archivos del repo.

---

## Criterios de severidad (no negociables)

> [!example] Cómo decidir la severidad de un hallazgo.

| Severidad | Criterio | Ejemplos |
|-----------|----------|----------|
| 🔴 **Crítico** | Rompe negocio, seguridad, accesibilidad CRITICAL, viola R1–R5, introduce regresión, bug evidente, leak de PII, código no compila/lint falla | `useState` duplicando TanStack Form, hex hardcodeado en componente, falta de focus visible, `any` en API pública, query sin validación Zod, secret en repo |
| 🟡 **Medio** | Calidad / arquitectura / performance importante; no bloquea pero degrada el sistema | Falta `useMemo` en lista grande, función > 80 líneas sin razón, anidación profunda, naming poco claro, falta empty state, animación que respeta poco timing 150–300ms |
| 🟢 **Normal** | Polish, consistencia, documentación, micro-optimización | Comentario obvio sobrante, orden de classes Tailwind no canónico, falta JSDoc en util pública, magic number menor, ordering de imports |

---

## Checklist final del reviewer (antes de declarar el feedback listo)

- [ ] Sincronicé `feat/new-backend-connection` con `origin` (Phase 1).
- [ ] Calculé `MERGE_BASE` y revisé **todos** los archivos de `git diff --name-status`.
- [ ] Evalué los **8 ejes ISO/IEC 25010** sin omitir ninguno.
- [ ] Verifiqué reglas no negociables R1–R5.
- [ ] Cada hallazgo tiene: regla violada · archivos · componentes · porqué · impacto · propuesta · verificación.
- [ ] Cada hallazgo está clasificado como Crítico / Medio / Normal con criterio explícito.
- [ ] El feedback `.md` cumple sintaxis Obsidian (`obsidian-markdown`): frontmatter, callouts, wikilinks, tablas con header.
- [ ] El archivo se guardó en `D:/AgentsAI/.tecni/skills/master-code-reviewer-v2/feedback-*.md`.
- [ ] No modifiqué código del repo, no pusheé, no commiteé.
- [ ] Veredicto final emitido: `READY` / `CHANGES REQUESTED` / `BLOCKED`.

---

## Anti-patterns que SIEMPRE marcan Crítico

> [!failure] Lista negra. Verla en el diff = hallazgo Crítico inmediato.

- Un `useState` que duplica un valor ya gobernado por TanStack Form.
- Un componente con `style={{ color: '#abc' }}` o `.css` propio.
- Un `Select`/`Input` que no usa el wrapper de `app/shared/components`.
- Un fetch directo en `route.tsx` sin pasar por `app/shared/hooks/<domain>/`.
- Un `any` exportado.
- Un `console.log` con datos de ocupante / visitante / placa.
- Una mutación sin `setErrorMap` para errores de validación remota.
- Un emoji 🚀/⚙️/🎨 usado como icono estructural de UI.
- Un botón sin `aria-label` cuando es icon-only.
- Animar `width`, `height`, `top`, `left` (debe ser `transform`/`opacity`).
- Una lista de >50 items renderizada sin virtualización ni paginación.

---

## Glosario rápido

- **Look & Feel**: identidad visual de TECNIPASS — tokens del themer, tipografía, spacing 4/8 dp, radii, shadows, motion 150–300ms.
- **PR target**: `feat/new-backend-connection` (la base contra la que se compara cualquier rama de feature en esta etapa del proyecto).
- **Feedback**: el archivo `.md` resultado de esta skill. Es el **único** entregable.
- **ISO/IEC 25010**: modelo de calidad dentro de la familia 25000 (la 25000 define la serie SQuaRE; la 25010 define los 8 ejes que aquí auditamos).

---

## Notas de mantenimiento de esta skill

- Cuando cambien las reglas de `tanstack-specs`, `ui-tailwindcss-rules` o el design system, actualizar las **Reglas no negociables** y los **Anti-patterns**.
- Cuando se agreguen nuevos repos (móvil, edge, etc.), extender el bloque "Stack TECNIPASS" y duplicar los ejes que correspondan.
- Cuando cambie la rama destino del proyecto (deja de ser `feat/new-backend-connection`), actualizar Phase 1 y la plantilla del feedback.
