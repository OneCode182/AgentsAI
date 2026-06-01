# Convenciones de Desarrollo (Development Conventions)

> Este documento define las convenciones de nombrado, arquitectura de archivos, estilos de código, control de versiones y convenciones de idioma utilizadas en TecniPass.

---

## 1. Convención de Idiomas
- **Dominio de Negocio (Business Domain)**: Se utiliza **Español** para los conceptos del negocio, nombres de campos de negocio, historias de usuario, especificaciones y documentación de casos de uso (e.g., `Recepcionista`, `Visitante`, `Reunión`, `c:p:g`).
- **Términos Técnicos y Código (Technical Terms & Code)**: Se utiliza **Inglés** para la escritura de código, variables, nombres de archivos, funciones, bases de datos, APIs y commits de git (e.g., `visitorId`, `createVisitor()`, `use-cases/`, `env.json`).

---

## 2. Nombres de Archivos y Carpetas
- **Archivos de Código General**: kebab-case (e.g., `quick-invitation.tsx`, `auth-handler.ts`).
- **Componentes React**: PascalCase (e.g., `MobilePagination.tsx`, `AlertPopupDetail.tsx`).
- **Carpetas/Directorios**: kebab-case (e.g., `use-cases/`, `route-components/`).

---

## 3. Estructura de Rutas y Componentes (Remix Frontend)
- **Definición de Rutas**: Siguiendo el sistema de rutas anidadas de Remix, los módulos principales de la app viven bajo la ruta padre `_home`:
  `frontend/app/routes/_home.{module}/` (e.g., `frontend/app/routes/_home.reception/route.tsx`).
- **Componentes de Ruta**: Los componentes específicos de un módulo/ruta **deben** vivir en un directorio `components/` adyacente a su archivo de ruta correspondiente:
  `frontend/app/routes/_home.{module}/components/` (e.g., `frontend/app/routes/_home.reception/components/AlertPopupDetail.tsx`).
- **Componentes Compartidos**: Aquellos reutilizables por múltiples módulos del sistema deben ser guardados en la raíz de componentes compartidos:
  `frontend/app/components/` (e.g., `frontend/app/components/InfoMessage.tsx`).

---

## 4. Convención de Git (Commits y Ramas)

### Mensajes de Commit (Conventional Commits)
Se debe seguir el formato convencional: `<type>(<scope>): <description>`
- **`feat`**: Nueva funcionalidad (e.g., `feat(reception): add quick invitation form`).
- **`fix`**: Solución de un error (e.g., `fix(iam): resolve rbac token validation issue`).
- **`refactor`**: Reestructuración de código sin cambiar comportamiento (e.g., `refactor(backend): use cases encapsulation`).
- **`docs`**: Cambios en documentación (e.g., `docs(harness): update memory patterns`).
- **`test`**: Añadir o corregir pruebas (e.g., `test(signature): add unit tests for verification`).

### Nombres de Ramas (Branches)
- Ramas de Feature: `feat/{ticket-or-description}` (e.g., `feat/TEC-495-pending-approval`, `feat/reception-tablet-layout`).
- Ramas de Fix: `fix/{ticket-or-description}` (e.g., `fix/sonar-vulnerabilities`).

---

## 5. UI y Estilos (TailwindCSS)
- Prohibido crear archivos `.css` tradicionales a menos que sea para configuraciones globales.
- Prohibido el uso de la propiedad `style={{...}}` en componentes de React.
- Usar de forma prioritaria la biblioteca `iconsax-react` para iconos. No incluir SVG en crudo en los componentes a menos que no exista en la biblioteca.

---

## 6. Formularios (TanStack Form)
- Todo formulario no trivial debe implementar validación con TanStack Form y Zod.
- La validación del formulario debe realizarse tanto en cliente (reactiva) como en el servidor (action loaders de Remix) para asegurar robustez.

---

## 7. Arquitectura del Backend (NestJS)
- La lógica de negocio no debe vivir en el Controlador (`Controller`).
- Utilizar el patrón de **Casos de Uso (Use Cases)**: cada endpoint ejecuta una clase dedicada a resolver una tarea de negocio específica.
- Usar `DTO` (Data Transfer Objects) con validaciones explícitas (`class-validator`) para todas las solicitudes entrantes y respuestas salientes de la API.
