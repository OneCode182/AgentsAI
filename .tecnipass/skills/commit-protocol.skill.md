# Guía Técnica: Convención de Commits y Ramas (Commit Protocol)

> **Propósito**: Estandarizar el flujo de control de versiones y el registro de cambios en los repositorios de TecniPass, garantizando un historial de Git legible y fácil de auditar.

---

## 1. Formato de Mensaje de Commit (Conventional Commits)

Todos los commits deben seguir la estructura convencional:
`{type}({scope}): {description}`

### Tipos Permitidos (`type`):
- **`feat`**: Incorporación de una nueva funcionalidad (e.g., `feat(reception): add visitor registration page`).
- **`fix`**: Solución de un bug o error en el sistema (e.g., `fix(iam): resolve rbac token validation issue`).
- **`refactor`**: Cambios de estructura de código sin alterar su comportamiento externo (e.g., `refactor(backend): use cases modularization`).
- **`docs`**: Modificaciones exclusivas de documentación o guías del sistema (e.g., `docs(harness): update memory files`).
- **`style`**: Ajustes estéticos, formateo de código o espacios (e.g., `style(frontend): run biome code formatter`).
- **`test`**: Creación o modificación de scripts de prueba unitarios o E2E (e.g., `test(signature): add mock signature verification`).
- **`chore`**: Tareas de mantenimiento de configuración del proyecto, dependencias o builds (e.g., `chore(backend): bump nestjs core dependencies`).

### Alcance (`scope`):
Representa el módulo o área afectada por el cambio. Debe escribirse siempre en minúsculas y usar conceptos del proyecto:
- `reception`, `iam`, `meetings`, `notifications`, `signature`, `feedback`, `mobile`, `sonarqube`.

### Descripción (`description`):
- Escrita siempre en **Inglés**, en minúsculas y usando el modo imperativo (e.g., `add field`, `fix bug`, `refactor method`).
- No debe terminar con punto.

---

## 2. Nombres de Ramas (Branches)
Las ramas deben crearse a partir de la rama principal (`main` o `develop`) siguiendo esta nomenclatura:
- **Features / Nuevos Módulos**: `feat/{ticket-or-description}` (e.g., `feat/TEC-495-pending-approval`, `feat/reception-tablet-signature`).
- **Fixes / Correcciones**: `fix/{ticket-or-description}` (e.g., `fix/TEC-512-sonar-vulnerabilities`, `fix/mobile-pagination-styling`).
- **Refactorizaciones**: `refactor/{description}` (e.g., `refactor/dto-restructuring`).

---

## 3. Reglas Inquebrantables del Protocolo de Commits
1. **Commits Atómicos**: Cada commit debe contener exactamente **un cambio lógico**. No acumules múltiples arreglos de bugs y features en un solo commit.
2. **Prohibido `--no-verify`**: Bajo ninguna circunstancia se debe saltar la verificación de los pre-commit hooks de Biome y TypeScript en Git.
3. **Aprobación para Push**: El agente no debe ejecutar `git push` hacia ramas compartidas o principales sin que el Humano haya validado los cambios de la sesión de desarrollo.
4. **Separación de Capas**: Si un cambio afecta tanto al frontend como al backend, realiza commits separados para cada repositorio para mantener los historiales desacoplados.

---

## 4. Convención para Pull Requests (PRs)
- **Título**: Debe coincidir exactamente con el formato del commit principal (e.g., `feat(reception): add quick invitation form`).
- **Cuerpo**: Debe detallar:
  1. ¿Qué se modificó?
  2. ¿Por qué se hizo el cambio?
  3. ¿Cómo probarlo localmente?
  4. Capturas de pantalla o grabaciones (si el cambio afecta la interfaz de usuario).
- **Referencia a Linear**: Incluir al final de la descripción el tag `Refs: TEC-XXX` para vincular automáticamente el PR con la tarea de Linear.
