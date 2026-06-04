# Registro de Decisiones de Arquitectura (ADR)

> Este archivo registra las decisiones arquitectónicas clave tomadas durante el desarrollo de TecniPass, proporcionando el contexto y la justificación histórica de por qué se eligieron ciertos caminos.

---

## ADR-001: Sistema de Permisos RBAC con Slugs Compactos
- **Fecha**: 2026-05-15
- **Estado**: Aprobado
- **Contexto**: El sistema requiere un control de acceso basado en roles (RBAC) granular pero eficiente. Pasar largas descripciones de permisos a los LLMs o almacenarlos de forma verbosa consume tokens y espacio innecesario.
- **Decisión**: Adoptar un formato de slugs de permisos compacto con el patrón `action:resource:scope` (e.g., `c:p:g` para `create:property:general` y `r:u-r:o-a` para `read:user-roles:organization-admin`).
- **Alternativas Consideradas**: 
  - Formato JSON descriptivo completo (descartado por alto consumo de tokens).
  - Permisos basados en cadenas planas como `CAN_CREATE_PROPERTY` (descartado por rigidez y falta de scope).
- **Consecuencias**: 
  - Reducción drástica del tamaño de los payloads de autenticación y de contexto de LLM.
  - Mayor consistencia y escalabilidad para nuevos módulos.

---

## ADR-002: Remix como Framework Frontend Principal
- **Fecha**: 2026-05-16
- **Estado**: Aprobado
- **Contexto**: Se necesita una aplicación altamente responsiva, con excelente rendimiento de carga en móviles y tablets, y buena indexación para ciertas páginas públicas.
- **Decisión**: Utilizar Remix (con React y TypeScript) debido a su arquitectura basada en Server-Side Rendering (SSR), rutas anidadas (nested routes) y el patrón loaders/actions para la manipulación de datos.
- **Alternativas Consideradas**:
  - Next.js (descartado por la simplicidad de manejo de datos nativo y transiciones en Remix).
  - Single Page Application tradicional con Vite (descartado por falta de SSR para carga instantánea y optimización SEO).
- **Consecuencias**:
  - Mayor velocidad de renderizado inicial en tablets de recepción.
  - Estructuración lógica del frontend basada en carpetas por módulo.

---

## ADR-003: TanStack Form para Gestión de Formularios Complejos
- **Fecha**: 2026-05-17
- **Estado**: Aprobado
- **Contexto**: Los flujos de registro de visitantes y empleados involucran formularios interactivos con múltiples campos dinámicos y validaciones complejas.
- **Decisión**: Utilizar TanStack Form en combinación con Zod para validación y tipado seguro a nivel de campo (field-level validation).
- **Alternativas Consideradas**:
  - React Hook Form (descartado por la integración nativa y type-safety total de TanStack Form en Remix).
  - Formularios nativos de HTML/Remix (descartado por falta de validación reactiva instantánea).
- **Consecuencias**:
  - Validación type-safe estricta en el cliente y servidor.
  - Mejoras de rendimiento en el renderizado de inputs.

---

## ADR-004: TailwindCSS para Estilizado y Diseño Responsivo
- **Fecha**: 2026-05-18
- **Estado**: Aprobado
- **Contexto**: El diseño debe verse premium y adaptarse sin esfuerzo a pantallas móviles, tablets y monitores de escritorio.
- **Decisión**: Adoptar TailwindCSS de forma exclusiva, prohibiendo los estilos CSS inline o archivos CSS ad-hoc.
- **Alternativas Consideradas**:
  - CSS Modules (descartado por complejidad y duplicación de archivos).
  - Styled Components (descartado por overhead en SSR de Remix).
- **Consecuencias**:
  - Consistencia absoluta del diseño utilizando las escalas predefinidas de Tailwind.
  - Archivos CSS finales optimizados y de tamaño mínimo.

---

## ADR-005: NestJS Modular Basado en Feature Directories
- **Fecha**: 2026-05-19
- **Estado**: Aprobado
- **Contexto**: El backend debe ser escalable, mantenible y permitir el desarrollo paralelo por múltiples desarrolladores o agentes sin generar conflictos de fusión constantes.
- **Decisión**: Estructurar el backend en NestJS utilizando módulos encapsulados dentro de una carpeta `features/`, implementando el patrón Use Case para la lógica de negocio y DTOs para la transferencia de datos.
- **Alternativas Consideradas**:
  - Express simple (descartado por falta de estructura rígida y escalabilidad).
  - Estructura tradicional de NestJS por capas globales (controllers/, services/, entities/ globales) (descartada para evitar acoplamiento).
- **Consecuencias**:
  - Mayor facilidad para aislar funcionalidades.
  - Contexto muy acotado para agentes de IA que solo necesitan modificar una feature.

---

## ADR-006: Flujo de Quick Invitation (Invitación Rápida)
- **Fecha**: 2026-05-20
- **Estado**: Aprobado
- **Contexto**: El flujo de registro normal de empleados requiere una pre-aprobación del administrador de la organización. Si este proceso se bloquea por inactividad del administrador, los nuevos empleados no pueden ingresar a las instalaciones.
- **Decisión**: Crear un flujo alternativo denominado "Quick Invitation" que permite a los empleados iniciar el registro con datos básicos y continuar más tarde (modos: `continue` y `employeedata`), permitiendo el acceso rápido provisional.
- **Alternativas Consideradas**:
  - Permitir aprobación automática del sistema (descartado por riesgos de seguridad física).
  - Requerir aprobación física por el guardia de recepción (descartado por generar cuellos de botella).
- **Consecuencias**:
  - Mayor flexibilidad y adaptabilidad en la recepción del edificio.
  - Implementación de variantes de ruta dinámicas en Remix.

---

## ADR-007: Prompt Archive And Resume Decision Layer
- **Fecha**: 2026-05-27
- **Estado**: Aprobado
- **Contexto**: Long human prompts can contain business context, constraints, examples, required skills, and validation expectations that may be lost when agents summarize them into tasks.
- **Decisión**: Archive substantial prompts under `memory/prompts/` before task decomposition, then run targeted similarity search across prompt archives, sessions, and active tasks to decide whether to resume existing work or create new work.
- **Alternativas Consideradas**:
  - Store prompt text only inside sessions (rejected because sessions are execution records, not immutable original intent).
  - Store prompts in `tasks/` (rejected because tasks are mutable runtime state).
- **Consecuencias**:
  - The original user request remains auditable and reusable.
  - Session resume decisions become evidence-based.
  - Additional token cost is controlled by `workflows/prompt-intake.workflow.md` and targeted search.

---

## ADR-008: SonarQube CI/CD via Self-Hosted GitHub Runner on Windows 11
- **Fecha**: 2026-06-02
- **Estado**: Aprobado
- **Contexto**: Se requiere integrar SonarQube en el pipeline de CI/CD de GitHub Actions para ambos repositorios (frontend y backend). El servidor SonarQube de la empresa corre en un server físico Windows 11 (i3, 4 cores, 16GB RAM) que no está expuesto a internet — solo es accesible vía VPN.
- **Decisión**: Instalar un GitHub Actions self-hosted runner en el mismo servidor Windows 11 donde corre SonarQube. El runner hace polling saliente (HTTPS 443) a GitHub y ejecuta `sonar-scanner` contra `localhost:9005`. El CI se divide en dos jobs: `validate` (cloud runner, gratis) y `sonarqube` (self-hosted runner, labels `[self-hosted, sonar]`). Se usa `run: sonar-scanner` directamente en vez de la GitHub Action de Docker.
- **Alternativas Consideradas**:
  - Cloudflare Tunnel para exponer SonarQube (rechazado por exponer el servicio a internet).
  - VPN desde runner cloud de GitHub usando credenciales .ovpn (rechazado por riesgo de seguridad y complejidad).
  - GitHub Action `SonarSource/sonarqube-scan-action@v4` (rechazado porque usa Docker internamente y no corre en runners Windows).
- **Consecuencias**:
  - Cero exposición del servidor a internet.
  - Mínima carga en el server: solo el scanner temporal (~2-3 min por análisis).
  - GitHub Secrets (`SONAR_TOKEN`, `SONAR_HOST_URL`) necesarios en ambos repos.
  - Si el server se apaga, los jobs de SonarQube quedan en cola hasta que vuelva.
- **Implementación de referencia** (frontend, 2026-06-02): la forma estándar del job `sonarqube` quedó codificada como plantilla en [patterns.md](patterns.md) §8 para replicar en backend. El job incorpora estándares de robustez que forman parte de esta decisión:
  - `needs: validate` (lint/type-check/build corren gratis en cloud antes del scan), `timeout-minutes: 10`, `concurrency` por ref con `cancel-in-progress`, skip de PRs en borrador, `shell: pwsh`.
  - Step "Verify prerequisites" que falla rápido si `sonar-scanner` no está en PATH o faltan secrets (ver [mistakes.md](mistakes.md) §8).
  - Mask de env vars de PR (`GITHUB_EVENT_NAME`, `GITHUB_REF`, `GITHUB_BASE_REF`, `GITHUB_HEAD_REF`) porque el servidor corre **Community Edition**, que no soporta PR/branch analysis (ver [mistakes.md](mistakes.md) §9).
  - `pnpm install --frozen-lockfile` antes del scan para que el analizador TS resuelva imports y `tsconfigPaths`.
  - Quality Gate **report-only** en esta fase (sin `sonar.qualitygate.wait=true`); bloqueo del PR vía Branch Protection queda como mejora futura.
  - `.scannerwork/` git-ignored; no se necesita limpieza manual porque `actions/checkout@v4` corre `git clean -ffdx` por default.

