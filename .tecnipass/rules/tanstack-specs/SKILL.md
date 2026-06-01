# SKILL: TanStack Form + Zod en tecnipass-frontend

## Objetivo
Guía operativa para implementar/editar formularios con **@tanstack/react-form** manteniendo el patrón real del proyecto: **validación con Zod**, **submit con mutaciones**, y **mapeo de errores a `setErrorMap`**.

## Haz / No hagas

### Haz
- Define el contrato del formulario en un archivo `*.form.ts` con:
  - tipo de estado (`...FormState` o `...FormValues`),
  - estado inicial,
  - `createFormHookContexts()` + `createFormHook()`,
  - export de `use...Form` y (cuando aplique) `withForm`.
- En componentes TSX, renderiza campos con `<form.Field name='...'>` y conecta UI con:
  - `value={field.state.value}`
  - `onValueChange={field.handleChange}` (o adaptación equivalente para `Select`)
  - `errorMessage={getFieldErrors(field.state.meta.errors)}`
- Valida en `validators.onSubmit` usando `validationSchema.safeParse(...)` y retorna `{ form, fields }` con `groupIssuesByPath(getErrorsFromZodError(parsed.error))` cuando falle.
- En submit del `<form>`, usa `event.preventDefault()`; cuando haya paso de confirmación/foco de errores, ejecuta `await form.validate('submit')` antes de `form.handleSubmit(...)`.
- Usa `onSubmitMeta` + `form.handleSubmit({ submitAction: ... })` cuando exista flujo de confirmación/modal.
- Para errores de backend/validación remota, aplica `form.setErrorMap({ onSubmit: { form, fields } })` con issues agrupados.
- Usa `useStore(form.store, selector)` o `<form.Subscribe selector={...}>` para estado derivado (modales, botones, flags, etc.).
- Para campos dependientes, usa `validators.onChangeListenTo`.
- Para listas, usa `<form.Field mode='array'>` con `pushValue/removeValue`.

### No hagas
- No uses `useState` para duplicar valores de campos que ya están en TanStack Form.
- No inventes un formato de errores distinto al patrón `ApiErrorIssue[] -> groupIssuesByPath -> setErrorMap(onSubmit)`.
- No envíes al API el estado crudo si el proyecto ya define transformación (`to...Payload` o `transformToApi`).

## Patrones de archivos (usar estos puntos de extensión)
- Definición del form hook: `app/routes/**/components/**/**.form.ts` y `app/routes/auth.*/**/*.form.ts`.
- Validaciones Zod y transformaciones: `app/shared/lib/validation/*.ts`.
- Mutaciones (React Query): `app/shared/hooks/**`.
- Utilidades de errores/mapeo: `app/shared/lib/utils.ts`, `app/shared/lib/errors.ts`.

## Patrón de implementación (paso a paso)
1. Crear/ajustar `*.form.ts` con `defaultValues`, metadatos de submit y `use...Form`.
2. En componente contenedor, inicializar `use...Form({ defaultValues, validators, listeners, onSubmitMeta, onSubmit })`.
3. En `validators.onSubmit`, correr `safeParse` con schema de `@shared/lib/validation/*`; mapear errores con `groupIssuesByPath`.
4. En el `onSubmit` del form, controlar flujo (`showConfirmation` vs `submit`) con `meta.submitAction`.
5. Conectar mutaciones (`useCreate...`, `useUpdate...`, `useActivate...`, etc.) y, en error, llamar `setErrorMap` + acciones UI (cerrar modal/focus).
6. Pintar campos con `<form.Field>` y `getFieldErrors(field.state.meta.errors)`.
7. Para estado reactivo de UI, usar `useStore`/`<form.Subscribe>` con selector específico.

## Checklist de PR (rápido)
- [ ] Existe `*.form.ts` con `createFormHookContexts/createFormHook`.
- [ ] `validators.onSubmit` usa `safeParse` + `groupIssuesByPath(getErrorsFromZodError(...))`.
- [ ] Submit HTML usa `preventDefault`; si aplica confirmación/foco de errores, valida con `validate('submit')` antes de `handleSubmit`.
- [ ] Errores de mutación se reflejan vía `setErrorMap({ onSubmit: { form, fields } })`.
- [ ] Campos usan `field.state.value`, `field.handleChange` y `getFieldErrors(field.state.meta.errors)`.
- [ ] Si hay flujo de confirmación, usa `onSubmitMeta` y `submitAction`.
- [ ] Si hay arrays/dependencias entre campos, usa `mode='array'` y/o `onChangeListenTo`.

## Alcance verificado
Evidencia directa en frontend (sin reglas inventadas):
- Hook de formulario con `createFormHook*`:  
  - `app/routes/auth.password-recovery/password-recovery.form.ts`  
  - `app/routes/auth.account-activation._index/account-activation.form.ts`  
  - `app/routes/_home.organizations/components/organization-form/organization.form.ts`  
  - `app/routes/_home.contracts/components/contract-form/contract.form.ts`
- Validación Zod en `validators.onSubmit` + `safeParse` + `groupIssuesByPath`:  
  - `app/routes/auth.password-recovery/route.tsx`  
  - `app/routes/auth.account-activation._index/route.tsx`  
  - `app/routes/_home.organizations/components/organization-form/organization-form.component.tsx`  
  - `app/routes/_home.contracts/components/contract-form/contract-form.component.tsx`
- Mapeo de errores de mutación a formulario (`setErrorMap` con `onSubmit`):  
  - `app/routes/auth.account-activation._index/route.tsx`  
  - `app/routes/_home.organizations/components/organization-form/organization-form.component.tsx`  
  - `app/routes/_home.contracts/components/contract-form/contract-form.component.tsx`
- Patrón React Query + clasificación de error (`isValidationError`, `isApiError`):  
  - `app/shared/hooks/auth/activate-account.ts`  
  - `app/shared/hooks/auth/request-password-recovery.ts`  
  - `app/shared/hooks/auth/reset-password.ts`  
  - `app/shared/hooks/auth/login.ts`
- Utilidades de error usadas por los formularios:  
  - `app/shared/lib/utils.ts` (`getErrorsFromZodError`, `groupIssuesByPath`, `getFieldErrors`, `isValidationError`)  
  - `app/shared/lib/errors.ts` (`isApiError`, `getErrorsFromApiResponse`)
- Dependencias entre campos y arrays:  
  - `app/routes/auth.account-activation._index/route.tsx` (`onChangeListenTo`, `mode='array'`, `pushValue/removeValue`)  
  - `app/routes/_home.user-roles/components/user-role-form/user-role-data.component.tsx` (`onChangeListenTo`)
