# PR #43 — Fix/responsive views · Copilot Code Review

**Repositorio:** `Tecnologia-Inmobiliaria-SA/tecnipass-frontend`  
**Branch:** `fix/responsive-views` → `feat/new-backend-connection`  
**Autor:** OneCode182 · 18 commits · 37 archivos modificados

---

## Descripción del PR

**Objetivo de Negocio:** Asegurar que la plataforma TECNIPASS sea completamente accesible y funcional desde dispositivos móviles, optimizando la navegación principal y los flujos críticos de autenticación y gestión de roles.

| Historia / Contexto | Tipo de Cambio | Riesgo |
|---|---|---|
| Optimización Mobile y Responsive | Feature / Refactor | Medio |

### Cambios Principales

- Implementado menú lateral (Sidebar) responsivo con toggle flotante y modularizado en subcomponentes (SRP).
- Refactorizada la tabla de funcionarios a una vista de tarjetas (Card List) optimizada para móviles con controles de paginación táctiles.
- Unificado y optimizado el diseño de las vistas de Login y Recuperación de Contraseña para pantallas pequeñas.
- Migrados los layouts de Home y Header a TailwindCSS, eliminando hojas de estilo exclusivas (`.module.css`).

### Componentes Afectados

| Estado | Archivos / Componentes Clave |
|---|---|
| Nuevos | `user-roles-card-list.tsx`, `mobile-pagination.tsx`, `collapsible-sections.tsx`, `navigation-buttons.tsx` |
| Modificados | `Sidebar (index.tsx)`, `auth.login/route.tsx`, `auth.password-recovery/route.tsx`, `user-roles-table/index.tsx` |
| Eliminados | `header.module.css`, `login.module.css`, `home.module.css`, `sidebar.v2.module.css` |

---

## Commits

| Hash | Descripción |
|---|---|
| `5c67342` | feat(auth): optimize login responsive design and mobile accessibility |
| `f5cd782` | feat(auth): unify password recovery UI and optimize button icons |
| `026eedd` | chore(auth): fix auth.login maintainability findings |
| `eb42b2c` | refactor(auth): simplify password recovery maintainability |
| `c7f7443` | feat(shared): implement mobile-responsive sidebar with floating toggle |
| `a716806` | refactor(ui): standardize sidebar navigation and cleanup legacy code |
| `ee5593e` | fix(dashboard-controls): refactor sidebar to resolve Sonar issues |
| `8134690` | style(ui): improve dashboard and sidebar visual interactivity |
| `cc89bdb` | style(dashboard-home): standardize button alignment and layout behavior |
| `4ad3982` | refactor(ui): migrate home and header layouts to tailwind |
| `7bc38ed` | fix(roles): resolve role selector flickering and visibility issues |
| `908e95a` | refactor(ui): modularize sidebar and standardize formatting |
| `b92ca0d` | fix(header): resolve header errors |
| `36d051f` | feat(user-roles): implement responsive card list view for mobile |
| `1cd0158` | feat(user-roles): reorganize mobile layout and update pagination icons |
| `1d1620b` | feat(user-roles): enhance mobile pagination UI with modern look and feel |
| `4394246` | style(user-roles): remove background from mobile pagination counter |
| `1317621` | feat(user-roles): conditionally hide mobile pagination navigation |

---

## Copilot Code Review

> Copilot revisó **37 de 37 archivos** modificados y generó **7 comentarios**.

### Resumen del PR (por Copilot)

Este PR busca mejorar la experiencia móvil/responsive en TECNIPASS, especialmente en navegación principal (sidebar/header) y en flujos críticos de autenticación, además de optimizar la vista de funcionarios para pantallas pequeñas.

**Changes:**
- Refactor del Sidebar para soportar drawer móvil con backdrop + botón flotante, y modularización en subcomponentes.
- Rediseño responsive de Login y Recuperación de contraseña (Tailwind) y ajustes en Home/Header.
- Vista móvil para funcionarios basada en cards + paginación táctil (manteniendo DataTable en desktop).

---

## Comentarios de Copilot

---

### Comentario 1 — `app/routes/_home/components/sidebar/index.tsx`

**Líneas:** +66 a +77

```tsx
{/* Backdrop — only rendered on mobile when sidebar is open */}
{isMobile && isOpen && (
     <button
          type='button'
          className={styles.backdrop}
          onClick={closeSidebar}
          onKeyDown={(e) => {
               if (e.key === 'Escape') closeSidebar();
          }}
          tabIndex={-1}
          aria-label='Cerrar menú lateral'
     />
```

**Problema:** El backdrop incluye un handler `onKeyDown` para Escape, pero el elemento tiene `tabIndex={-1}` y el foco típicamente permanece en el elemento previamente enfocado mientras el drawer está abierto. En la práctica, presionar Escape no disparará este handler de forma confiable.

**Solución sugerida:** Manejar Escape a nivel del `document` mientras el sidebar está abierto, o mover el foco hacia el sidebar/backdrop al abrirlo (focus trap) para que los usuarios de teclado puedan cerrarlo consistentemente.

---

### Comentario 2 — `app/routes/_home/components/sidebar/components/sidebar-action-button.tsx`

**Líneas:** +7 a +24

```tsx
interface SidebarActionButtonProps
     extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     icon: Icon;
     label: string;
     iconClassName?: string;
}

export const SidebarActionButton = ({
     icon: Icon,
     label,
     className,
     iconClassName,
     ...props
}: SidebarActionButtonProps) => {
     return (
          <Button
               className={cn(styles.homeButton, 'w-full !h-auto !py-0.5', className)}
               icon={Icon}
```

**Problema:** `iconClassName` se acepta en las props pero nunca se usa, lo cual es confuso para quienes llaman al componente y hace que la API sea engañosa.

**Solución sugerida:** Eliminar esta prop o conectarla al renderizado del `Button`/ícono para que tenga efecto.

---

### Comentario 3 — `app/shared/context/sidebar.tsx`

**Líneas:** +25 a +47

```tsx
/**
 * Determines whether the viewport matches the desktop breakpoint.
 * Falls back to `true` on the server (SSR).
 */
const getIsDesktop = (): boolean => {
     if (typeof globalThis.matchMedia !== 'function') {
          return true;
     }
     return globalThis.matchMedia(DESKTOP_BREAKPOINT).matches;
};

// ...

const [isDesktop, setIsDesktop] = React.useState(getIsDesktop);
const [isOpen, setIsOpen] = React.useState(getIsDesktop);
```

**Problema:** `getIsDesktop()` retorna `true` durante SSR, pero en mobile el cliente inicializará `isOpen` / `isDesktop` como `false` (vía `matchMedia`) durante la hidratación. Esto significa que el markup del servidor probablemente renderiza el sidebar como abierto y el cliente inmediatamente lo hidrata como cerrado, lo cual puede disparar warnings de hidratación y un visible layout shift.

**Solución sugerida:** Hacer el estado inicial seguro para SSR (por ejemplo, inicializar en una constante como `false` y setear el valor real en un efecto después del mount, o usar `useSyncExternalStore` / un guard de "mounted" para que SSR y el primer render del cliente coincidan).

---

### Comentario 4 — `app/routes/_home/components/sidebar/components/collapsible-sections.tsx`

**Líneas:** +217 a +229

```tsx
<Collapsible
     open={openSection === section.id}
     onOpenChange={() => handleTriggerClick(section.id)}
>
     <CollapsibleTrigger
          icon={section.icon}
          iconSize={28}
          className={styles.sidebarCollapsibleTrigger}
          onClick={(e) => {
               e.preventDefault();
               handleTriggerClick(section.id);
          }}
          data-active={dataAttr(section.isActive)}
```

**Problema:** `handleTriggerClick` está siendo invocado tanto vía el `onOpenChange` de `Collapsible` como vía el `onClick` de `CollapsibleTrigger`. Con el toggle funcional de `setOpenSection`, esto típicamente alternará dos veces en un solo click, dejando la sección cerrada (es decir, los clicks parecen no hacer nada).

**Solución sugerida:** Usar solo uno de estos handlers (preferir `onOpenChange={(open) => setOpenSection(open ? section.id : null)}`) y eliminar el `onClick` / `preventDefault` extra, o viceversa.

---

### Comentario 5 — `app/routes/_home/components/sidebar/components/sidebar-link.tsx`

**Líneas:** +22 a +33

```tsx
}: SidebarLinkProps) => {
     const location = useLocation();
     const isActive = location.pathname === to;

     return (
          <Link
               {...props}
               to={to}
               className={cn(className, styles.sidebarLink)}
               data-disabled={dataAttr(isDisabled)}
               data-active={dataAttr(isActive)}
          >
```

**Problema:** `isActive` se computa como `location.pathname === to`, pero varios valores de `to` incluyen query strings (ej. `...?source=sidebar`). Como `location.pathname` nunca incluye el query string, esos links nunca serán marcados como activos.

**Solución sugerida:** Comparar contra la porción de pathname de `to` (ej. dividir en `?` / usar `new URL(to, base).pathname`) e incluir opcionalmente lógica de search-params cuando sea necesario.

---

### Comentario 6 — `app/routes/_home/components/header/index.tsx`

**Líneas:** 36 a 224

```tsx
- const Header = () => {
+ const Header = ({ session }: HeaderProps) => {
     return (
-         <header className={styles.header}>
+         <header className='sticky top-0 z-30 flex items-center justify-between gap-4 w-full pl-16 pr-...'>
               <SearchBar />
-              <Options />
+              <Options session={session} />
          </header>
```

**Problema:** `Header` ahora requiere una prop `session`, pero todavía hay call sites renderizando `<Header />` sin props (ej. `app/routes/invitation.qr._index/route.tsx`). Esto romperá el type-check/build.

**Solución sugerida:** Para evitar un breaking API change, considerar hacer `session` opcional y usar `useSessionStore` como fallback, o exportar un componente separado `HeaderWithSession` manteniendo la firma existente de `Header`.

---

### Comentario 7 — `app/routes/auth.password-recovery/route.tsx`

**Líneas:** 111 a 122

```tsx
onSubmit: ({ value }) => {
     if (isResetMode) {
-         void executeResetPasswordRef.current?.({
+              executeResetPasswordRef.current?.({
               authentication: value.authentication,
          });
          return;
     }

-    void executeRequestPasswordRecoveryRef.current?.({
+         executeRequestPasswordRecoveryRef.current?.({
          email: value.email,
     });
},
```

**Problema:** `executeResetPasswordRef.current` / `executeRequestPasswordRecoveryRef.current` están tipados como retornando `Promise<unknown>`, pero las llamadas actualmente no están siendo esperadas (awaited) y les falta el prefijo `void` previo. Si el repo tiene una regla `no-floating-promises` (ya usa `void` en otros lugares de este archivo), esto puede fallar el linting y también hace más fácil introducir accidentalmente rechazos no manejados.

**Solución sugerida:** Preferir `void execute...(...)` (o `await` si el flujo de submission necesita bloquear).

---

*Generado el 29/04/2026 · Copilot revisó 37/37 archivos · 7 comentarios generados*