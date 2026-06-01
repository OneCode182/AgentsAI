---
created: 2026-04-29
modified: 2026-04-29
type: code-review
project: tecnipass
repo: tecnipass-frontend
current-branch: fix/responsive-views
target-branch: feat/new-backend-connection
merge-base: 3b99888
reviewer: master-code-reviewer-v2
status: pending-fixes
tags:
  - code-review
  - tecnipass
  - iso-25000
  - responsive-views
  - sidebar
  - auth
---

# Code Review — fix/responsive-views → feat/new-backend-connection

> [!abstract] Resumen ejecutivo
> - **Archivos tocados:** 37
> - **Hallazgos:** Críticos 6 · Medios 7 · Normales 5
> - **Recomendación final:** `CHANGES REQUESTED`
> - **Riesgo de negocio:** Medio
> - **Cumplimiento ISO/IEC 25010:** 72%  (ver tabla abajo)

## Contexto

- **Rama actual:** `fix/responsive-views`
- **Rama destino:** `feat/new-backend-connection`
- **Merge base:** `3b99888`
- **Commits revisados:**
  - `1317621 — feat(user-roles): conditionally hide mobile pagination navigation`
  - `4394246 — style(user-roles): remove background from mobile pagination counter`
  - `1d1620b — feat(user-roles): enhance mobile pagination UI with modern look and feel`
  - `1cd0158 — feat(user-roles): reorganize mobile layout and update pagination icons`
  - `36d051f — feat(user-roles): implement responsive card list view for mobile`
  - `b92ca0d — fix(header): resolve header errors`
  - `908e95a — refactor(ui): modularize sidebar and standardize formatting`
  - `7bc38ed — fix(roles): resolve role selector flickering and visibility issues`
  - `4ad3982 — refactor(ui): migrate home and header layouts to tailwind`
  - `cc89bdb — style(dashboard-home): standardize button alignment and layout behavior`
  - `8134690 — style(ui): improve dashboard and sidebar visual interactivity`
  - `ee5593e — fix(dashboard-controls): refactor sidebar to resolve Sonar issues`
  - `a716806 — refactor(ui): standardize sidebar navigation and cleanup legacy code`
  - `c7f7443 — feat(shared): implement mobile-responsive sidebar with floating toggle`
  - `eb42b2c — refactor(auth): simplify password recovery maintainability`
  - `026eedd — chore(auth): fix auth.login maintainability findings`
  - `f5cd782 — feat(auth): unify password recovery UI and optimize button icons`
  - `5c67342 — feat(auth): optimize login responsive design and mobile accessibility`

## Mapa de cumplimiento ISO/IEC 25010

| Eje | Estado | Comentario |
|-----|:------:|------------|
| Functional Suitability | ✅ | Las features de responsive sidebar, card list mobile y auth unificada cumplen su propósito. Sin TODOs colgantes críticos. |
| Performance Efficiency | ⚠️ | `TypewriterEffect` ejecuta animación por carácter sin control de `prefers-reduced-motion`. Card list no virtualiza pero pagina (aceptable). |
| Compatibility / Architecture | ⚠️ | Buena modularización del sidebar en sub-componentes. Sin embargo, persisten `.module.css` cuando la regla R1 prohíbe CSS propios. `index.v2.tsx` aún existe. |
| Usability / Look & Feel | ⚠️ | Mobile sidebar con backdrop + floating button es correcto. Faltan `aria-label` en algunos botones icon-only. Login usa `text-red-500` (no token). |
| Reliability / Robustez | ✅ | Empty states presentes en `UserRolesCardList`. Defensas contra `null` con optional chaining. |
| Security | ✅ | No se exponen tokens. Login form no loguea PII. Validación Zod presente en password-recovery. |
| Maintainability (Clean Code + SOLID) | ⚠️ | Sidebar descompuesto en SRP. Pero se repite `hoverEffect` como string literal en 3 lugares. `sidebar.module.css` tiene 426 líneas con `!important` masivos. |
| Portability / Tooling | ⚠️ | Se añade `packageManager` en `package.json` (bueno). Se eliminan CSS modules en header y login, pero se expanden en sidebar (inconsistente). |

---

## 🔴 1. Hallazgos Críticos

> [!danger] Los hallazgos Críticos **deben resolverse** antes de mergear. Bloquean la PR.

### C-01 — CSS Modules persisten y se expanden en sidebar (viola R1)

- **Eje:** H — Portability / Tooling + Regla R1
- **Regla violada:** R1 Tailwind exclusivo — "❌ Crear `.css` o `.module.css`"
- **Archivos involucrados:**
  - [[app/routes/_home/components/sidebar/sidebar.module.css]] — 426 líneas, expandida significativamente
  - [[app/routes/_home._index/home-route.module.css]] — 86 líneas, aún presente con `grid-template-columns` raw
  - [[app/shared/components/button/button.module.css]] — modificado
  - [[app/routes/_home._index/components/welcome-message/welcome-message.module.css]] — aún presente
- **Componentes afectados:** `Sidebar`, `SidebarLink`, `SidebarNavButton`, `SidebarCloseButton`, `UserProfileBadge`, `HomeRoute`
- **Por qué es un error:** La regla R1 del proyecto prohíbe explícitamente CSS Modules. El PR eliminó correctamente `header.module.css`, `login.module.css`, `home.module.css` y `sidebar.v2.module.css`, pero **expandió** `sidebar.module.css` de ~120 a 426 líneas. Esto crea una inconsistencia: la mitad de los componentes migrados a Tailwind inline, la otra mitad aún usa CSS modules.
- **Impacto en el negocio:** Incrementa deuda técnica y confunde a futuros desarrolladores sobre cuál es el estándar de estilos.
- **Propuesta de cambio:**
  Migrar `sidebar.module.css` a clases Tailwind inline en los componentes o a `tailwind-variants` (ya presente en el proyecto). Se puede crear un ticket de seguimiento si se acuerda, pero debe bloquearse la expansión del archivo.
  ```diff
  - import styles from '../sidebar.module.css';
  + // Use Tailwind classes directly or tailwind-variants
  + const sidebarLink = tv({ base: 'flex items-center gap-2 px-3 py-1.5 ...' });
  ```
  Pasos:
  1. Extraer cada clase de `sidebar.module.css` a su componente con clases Tailwind inline.
  2. Usar `tv()` de `tailwind-variants` para variantes complejas (collapsed/expanded).
  3. Eliminar `sidebar.module.css`.
- **Verificación:** `grep -r "module.css" app/routes/_home/components/sidebar/` debe retornar vacío.

### C-02 — Exceso de `!important` en sidebar CSS (30+ ocurrencias)

- **Eje:** G — Maintainability + D — Usability
- **Regla violada:** Clean Code, R1 (si una composición se repite, extraer componente, no clase CSS)
- **Archivos involucrados:**
  - [[app/routes/_home/components/sidebar/sidebar.module.css]]
- **Por qué es un error:** El archivo contiene ~30+ usos de `!important` via `@apply` (e.g., `!flex`, `!items-center`, `!justify-start`, `!bg-transparent`, `!text-white`, `!font-bold`, `!hidden`, `!px-0`). Este patrón indica guerra de especificidad — los estilos base del `Button` se están sobreescribiendo a la fuerza. Esto hace el sistema de estilos frágil e impredecible.
- **Impacto en el negocio:** Cualquier cambio en el componente `Button` base puede romper silenciosamente el sidebar, afectando la navegación para todos los actores (porteros, administradores).
- **Propuesta de cambio:**
  1. Crear variantes específicas en `Button` para el sidebar nav (e.g., `variant='sidebar'`).
  2. O usar `tailwind-variants` con slots para manejar los estados expand/collapse.
  3. Eliminar todos los `!important`.
- **Verificación:** `grep -c "!" sidebar.module.css` debe tender a 0.

### C-03 — Color hardcodeado `text-red-500` en login error message

- **Eje:** D — Usability / Look & Feel
- **Regla violada:** R1 — "❌ hex/color crudo en componentes", Design System tokens
- **Archivos involucrados:**
  - [[app/routes/auth.login/route.tsx]]
- **Componentes afectados:** `LoginForm`
- **Por qué es un error:** El login error message usa `text-red-500` que es un color genérico de Tailwind, no un token del design system. El sistema define `text-danger`, `text-danger-700`, `border-danger-200`, `bg-danger-50` (como se usaba en la versión previa con `styles.loginError`). La migración perdió los tokens correctos.
- **Impacto en el negocio:** Inconsistencia visual en la pantalla de login — primera impresión del usuario.
- **Propuesta de cambio:**
  ```diff
  - className='text-red-500 text-sm mt-4 font-medium'
  + className='mt-4 w-full rounded-small border border-danger-200 bg-danger-50 px-3 py-2 text-left text-body3 text-danger-700 whitespace-pre-line'
  ```
  Pasos:
  1. Restaurar los tokens del design system que tenía la clase `styles.loginError`.
  2. Añadir `whitespace-pre-line` para mantener el salto de línea.
- **Verificación:** Inspeccionar visualmente el error de login; el color debe coincidir con otros alerts de danger en la app.

### C-04 — `SidebarCloseButton` carece de `aria-label` (icon-only button)

- **Eje:** D — Usability / Accesibilidad CRITICAL
- **Regla violada:** Anti-pattern: "Un botón sin `aria-label` cuando es icon-only"
- **Archivos involucrados:**
  - [[app/routes/_home/components/sidebar/components/sidebar-close-button.tsx]]
- **Componentes afectados:** `SidebarCloseButton`
- **Por qué es un error:** El botón solo contiene un ícono `ArrowLeft` sin texto ni `aria-label`. Lectores de pantalla no pueden anunciarlo.
- **Propuesta de cambio:**
  ```diff
    <button
      type='button'
      className={styles.closeButton}
      onClick={toggleSidebar}
      data-sidebar-open={dataAttr(isOpen)}
  +   aria-label={isOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
    >
  ```
- **Verificación:** Navegar con lector de pantalla y confirmar que el botón se anuncia correctamente.

### C-05 — `TypewriterEffect` anima `width` (anti-pattern de performance)

- **Eje:** B — Performance Efficiency
- **Regla violada:** Anti-pattern: "Animar `width`, `height`, `top`, `left`"
- **Archivos involucrados:**
  - [[app/shared/components/typewriter-effect/typewriter-effect.tsx]]
- **Componentes afectados:** `TypewriterEffect`
- **Por qué es un error:** La animación incluye `width: 'fit-content'` en el objeto animado. Animar `width` causa layout shifts y reflows costosos. Debería usar solo `opacity` + `display`.
- **Propuesta de cambio:**
  ```diff
    animate(
      'span',
      {
        display: 'inline-block',
        opacity: 1,
  -     width: 'fit-content',
      },
  ```
  Las spans ya tienen `display: inline-block` que les da su ancho natural.
- **Verificación:** Verificar que el texto sigue apareciendo correctamente sin la propiedad `width` animada.

### C-06 — `TypewriterEffect` no respeta `prefers-reduced-motion`

- **Eje:** D — Usability / Accesibilidad CRITICAL
- **Regla violada:** "`prefers-reduced-motion` respetado" (Eje D accesibilidad)
- **Archivos involucrados:**
  - [[app/shared/components/typewriter-effect/typewriter-effect.tsx]]
- **Componentes afectados:** `TypewriterEffect`
- **Por qué es un error:** El componente ejecuta animación character-by-character sin verificar la preferencia del usuario por movimiento reducido.
- **Propuesta de cambio:**
  ```diff
  + const prefersReducedMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  +
    useEffect(() => {
  -   if (isInView) {
  +   if (isInView && !prefersReducedMotion) {
        animate('span', { display: 'inline-block', opacity: 1 }, { duration, delay: stagger(staggerDelay) });
  +   } else if (isInView) {
  +     animate('span', { display: 'inline-block', opacity: 1 }, { duration: 0 });
      }
    }, [isInView]);
  ```
- **Verificación:** Activar "Reduce motion" en OS y verificar que el texto aparece instantáneamente.

---

## 🟡 2. Hallazgos Medios

> [!warning] Importantes para la calidad. Deberían resolverse en este PR; si se difieren, crear ticket.

### M-01 — `hoverEffect` string literal repetido 3 veces (DRY)

- **Eje:** G — Maintainability
- **Regla violada:** DRY — lógica repetida en 2+ lugares se extrae a `shared/lib` o constante
- **Archivos involucrados:**
  - [[app/routes/_home._index/route.tsx]] — declarado en `SystemConfigSection`, `QuickAccess`, `ManagementSection`
- **Por qué es un error:** La misma cadena `'hover:font-extrabold hover:text-secondary hover:scale-[1.02] hover:bg-secondary/5 transition-all duration-200'` se declara como constante local en 3 componentes diferentes del mismo archivo.
- **Propuesta de cambio:**
  ```diff
  + const CARD_HOVER_EFFECT = 'hover:font-extrabold hover:text-secondary hover:scale-[1.02] hover:bg-secondary/5 transition-all duration-200';
  +
    const SystemConfigSection = () => {
  -   const hoverEffect = '...';
      // usar CARD_HOVER_EFFECT
  ```
- **Verificación:** Solo una declaración de la constante en el archivo.

### M-02 — `index.v2.tsx` sobrevive como wrapper (dead code potencial)

- **Eje:** G — Maintainability / YAGNI
- **Regla violada:** YAGNI, Clean Code
- **Archivos involucrados:**
  - [[app/routes/_home/components/sidebar/index.v2.tsx]]
- **Por qué es un error:** El import en `_home/route.tsx` cambió de `SidebarV2` a `Sidebar` (importando de `index.tsx`). Si ya no se usa como entry point, debería eliminarse.
- **Propuesta de cambio:** Verificar que ningún otro archivo importa de `index.v2.tsx`. Si no, eliminarlo.
- **Verificación:** `grep -r "index.v2" app/` debe retornar vacío.

### M-03 — `sidebar.module.css` usa valores arbitrarios `text-[10px]` y `text-[13px]`

- **Eje:** H — Portability / Tooling
- **Regla violada:** R1 — "❌ Usar valores arbitrarios salvo edge case justificado"
- **Archivos involucrados:**
  - [[app/routes/_home/components/sidebar/sidebar.module.css]] — líneas 195, 402, 407
- **Por qué es un error:** `text-[10px]` y `text-[13px]` no están en el config de Tailwind. Deberían mapearse a tokens: `text-xs` (12px) o `text-sm` (14px).
- **Propuesta de cambio:** Usar el token más cercano o extender `tailwind.config.ts`.
- **Verificación:** Buscar `text-[` en el archivo y reemplazar.

### M-04 — Login image `alt='login'` no es descriptivo

- **Eje:** D — Usability / Accesibilidad
- **Regla violada:** Accesibilidad — alt text debe ser descriptivo
- **Archivos involucrados:**
  - [[app/routes/auth.login/route.tsx]]
- **Propuesta de cambio:**
  ```diff
  - alt='login'
  + alt='Imagen decorativa de conjunto residencial'
  ```
  O `alt=''` con `aria-hidden='true'` si es puramente decorativa.
- **Verificación:** Lector de pantalla no debe anunciar "login" como descripción de imagen.

### M-05 — Layout de auth duplicado entre login y password-recovery (DRY)

- **Eje:** G — Maintainability
- **Regla violada:** DRY
- **Archivos involucrados:**
  - [[app/routes/auth.login/route.tsx]] — `<main>` className ~180 caracteres
  - [[app/routes/auth.password-recovery/route.tsx]] — className idéntica
- **Por qué es un error:** Las clases Tailwind del layout se duplican exactamente en ambos archivos.
- **Propuesta de cambio:** Extraer a un componente `AuthLayout` reutilizable en `app/routes/auth/components/`.
- **Verificación:** Solo una definición del layout auth en el codebase.

### M-06 — Template literal para clases condicionales en vez de `cn()`

- **Eje:** G — Maintainability
- **Regla violada:** Clean Code — usar utilidades del proyecto
- **Archivos involucrados:**
  - [[app/routes/_home.user-roles/components/user-roles-table/user-roles-card-list.tsx]]
- **Propuesta de cambio:**
  ```diff
  - className={`mt-1 w-fit ... ${isCompleted ? '...' : '...'}`}
  + className={cn('mt-1 w-fit ...', isCompleted ? '...' : '...')}
  ```
- **Verificación:** No más template literals para clases condicionales.

### M-07 — `SidebarCloseButton` naming misleading

- **Eje:** G — Maintainability / Naming
- **Regla violada:** Naming descriptivo
- **Archivos involucrados:**
  - [[app/routes/_home/components/sidebar/components/sidebar-close-button.tsx]]
- **Por qué es un error:** El componente se llama `SidebarCloseButton` pero llama `toggleSidebar()`. En desktop collapsed state, este botón **abre** el sidebar.
- **Propuesta de cambio:** Renombrar a `SidebarToggleButton`.
- **Verificación:** El nombre refleja su comportamiento real.

---

## 🟢 3. Hallazgos Normales

> [!tip] Mejoras y polish. Pueden ir en este PR si son baratas; si no, ticket de seguimiento.

### N-01 — `window.location` → `globalThis.location` (positivo, verificar consistencia)

- **Eje:** H — Portability
- **Archivos involucrados:**
  - [[app/routes/auth.login/route.tsx]]
- **Por qué:** Se cambió correctamente a `globalThis` para SSR. Verificar no queden otros `window.` en el scope del PR.

### N-02 — `useCallback` con empty deps para `handleFocus`

- **Eje:** B — Performance
- **Archivos involucrados:**
  - [[app/routes/auth.login/route.tsx]]
- **Por qué:** Micro-optimización innecesaria para un event handler de input. No causa problema pero agrega cognitive load.

### N-03 — Falta `data-test` ID en mobile floating button y backdrop

- **Eje:** H — Portability / Testing
- **Archivos involucrados:**
  - [[app/routes/_home/components/sidebar/index.tsx]]
- **Propuesta:** Agregar `data-test='sidebar-mobile-toggle'` y `data-test='sidebar-backdrop'`.

### N-04 — Login form aún no usa TanStack Form (fuera de alcance, crear ticket)

- **Eje:** A — Functional Suitability
- **Archivos involucrados:**
  - [[app/routes/auth.login/route.tsx]]
- **Por qué:** El TODO fue eliminado pero el form sigue nativo. Crear ticket para migración futura.

### N-05 — `packageManager` field en `package.json` (positivo)

- **Eje:** H — Portability
- **Archivos involucrados:**
  - [[package.json]]
- **Por qué:** Buena práctica con Corepack. Sin observación negativa.

---

## Métricas del review

| Métrica | Valor |
|---------|------:|
| Archivos revisados | 37 |
| LOC añadidas | +2485 |
| LOC eliminadas | −1437 |
| Hallazgos totales | 18 |
| Cobertura de ejes ISO | 8/8 |

## Próximos pasos

- [ ] Resolver todos los Críticos (C-01 a C-06)
- [ ] Resolver Medios o crear ticket (M-01 a M-07)
- [ ] Re-ejecutar `pnpm format && pnpm check`
- [ ] Re-correr suite Playwright impactada (auth, sidebar, user-roles)
- [ ] Re-pedir review (`master-code-reviewer-v2`)

## Referencias

- [[Proyecto Tecni-Pass]]
- [[ui-ux-pro-max]]
- [[tanstack-specs]]
- [[ui-tailwindcss-rules]]
- [[frontend-architecture-authority]]
- [[enforce-quality-standards]]

%% Generado por master-code-reviewer-v2 — no editar manualmente sin marcar `modified`. %%
