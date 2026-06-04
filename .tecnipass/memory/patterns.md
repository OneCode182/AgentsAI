# Patrones de Código Establecidos (Design & Code Patterns)

> Este catálogo documenta los patrones UI y lógicos reutilizables creados en TecniPass. Los agentes deben consultar y aplicar estos patrones antes de diseñar nuevos componentes para mantener la consistencia de la base de código.

---

## 1. MobilePagination (Tablas Responsivas)
- **Propósito**: Adaptar la paginación y visualización de tablas densas en dispositivos móviles donde las columnas no caben horizontalmente.
- **Implementación**: Ocultar la tabla de escritorio en pantallas pequeñas (`hidden md:table`) y renderizar una lista de tarjetas (cards) apiladas. El control de paginación cambia de botones numerados a controles simples de "Anterior / Siguiente".
- **Archivos de Referencia**: 
  - `frontend/app/routes/_home.reception/components/MobilePagination.tsx`
  - `frontend/app/routes/_home.reception/route.tsx`
- **Uso**:
  ```tsx
  {/* Escritorio */}
  <div className="hidden md:block">
    <Table data={items} />
  </div>
  {/* Móvil */}
  <div className="block md:hidden space-y-4">
    {items.map(item => <ItemCard key={item.id} data={item} />)}
    <MobilePaginationControls currentPage={page} totalPages={total} onPageChange={setPage} />
  </div>
  ```

---

## 2. AlertPopupDetail (Detalle de Registro en Recepción)
- **Propósito**: Mostrar el detalle de un registro de entrada o salida del visitante en una ventana flotante (popup) modal de alerta rápida sin cambiar de ruta.
- **Implementación**: Uso de un portal de React o un overlay absoluto con Tailwind CSS que se activa al seleccionar una fila de la lista de recepción.
- **Archivos de Referencia**: 
  - `frontend/app/routes/_home.reception/components/AlertPopupDetail.tsx`
- **Uso**:
  - Debe contener la tarjeta de identificación del visitante, hora de registro, estado y botones de acción rápida ("Permitir Ingreso", "Rechazar", "Ver Perfil").

---

## 3. SearchSuggestion (Búsqueda en Tiempo Real con Acciones Rápidas)
- **Propósito**: Campo de búsqueda de autocompletado para residentes o visitantes que muestra sugerencias interactivas y botones para ejecutar acciones desde la misma lista de resultados.
- **Implementación**: Input reactivo enlazado a un hook de debounce que consulta el backend y despliega una lista de resultados con botones de acción flotantes para cada fila (por ejemplo: "Invitar", "Llamar").
- **Archivos de Referencia**:
  - `frontend/app/routes/_home.reception/components/SearchSuggestions.tsx`

---

## 4. QuickInvitation (Modos Continue y EmployeeData)
- **Propósito**: Permitir el flujo dinámico de invitaciones rápidas según el estado de la información del empleado.
- **Implementación**: Rutas en Remix parametrizadas que cargan datos condicionalmente según el flag `mode`.
  - `mode=continue`: Carga los datos existentes y permite completar los campos faltantes de la invitación.
  - `mode=employeedata`: Permite editar o registrar los datos personales del empleado durante el flujo de creación.
- **Archivos de Referencia**:
  - `frontend/app/routes/_home.reception.quick-invitation/route.tsx`

---

## 5. NotificationReuse (Acción de Reenvío de Invitación)
- **Propósito**: Reutilizar plantillas y flujos de notificación de invitaciones para reenviar un código QR de acceso.
- **Implementación**: Integración de un botón de acción rápida que ejecuta una llamada a un endpoint común en la API, pasando el ID de invitación y disparando la cola de notificaciones.
- **Archivos de Referencia**:
  - `frontend/app/components/NotificationResendButton.tsx`

---

## 6. OrganizationDetailOverlay (Detalle de Organización en Alertas)
- **Propósito**: Mostrar información contextual detallada del departamento, oficina o empresa a la que se dirige el visitante directamente sobre el modal de recepción.
- **Implementación**: Un componente modular que recibe el ID de la organización y se renderiza con un diseño semi-transparente sobre la información del visitante.
- **Archivos de Referencia**:
  - `frontend/app/routes/_home.reception/components/OrganizationDetailOverlay.tsx`

---

## 7. InfoMessageComponent (Mensajes Informativos Consistentes)
- **Propósito**: Mostrar banners de información del sistema, advertencias o consejos al usuario, reutilizado a partir del diseño de la sección de Configuración del Administrador.
- **Implementación**: Un banner simple con Tailwind CSS que acepta variantes de color (`info`, `warning`, `error`, `success`) y un icono de `iconsax-react`.
- **Archivos de Referencia**:
  - `frontend/app/components/InfoMessage.tsx`
- **Uso**:
  ```tsx
  <InfoMessage type="warning" title="Acceso no aprobado">
    Este visitante requiere pre-aprobación del departamento.
  </InfoMessage>
  ```

---

## 8. SonarQube CI Job (Self-Hosted Windows Runner)
- **Propósito**: Plantilla estándar para el job `sonarqube` en `.github/workflows/ci.yml` de cualquier repo TecniPass que use el self-hosted runner on-prem. Definida y validada en frontend; debe reutilizarse en backend (ver `tasks/active/ci-sonarqube-pipeline.task.md` T4). Relacionada con [ADR-008](decisions.md).
- **Decisiones clave embebidas** (no improvisar al replicar):
  - `needs: validate` — el scan solo corre si lint/type-check/build pasaron en el runner cloud (gratis). Minimiza carga del server on-prem.
  - `runs-on: [self-hosted, sonar]` — labels fijos del runner Windows 11.
  - `if: github.event.pull_request.draft != true` — no gasta el server en PRs en borrador.
  - `timeout-minutes: 10` — el runner nunca queda colgado indefinidamente.
  - `concurrency` por `github.ref` con `cancel-in-progress: true` — dos pushes a la misma rama no chocan en `.scannerwork/`.
  - `defaults.run.shell: pwsh` — el runner es Windows; explícito evita ambigüedad.
  - **Precheck de prerequisitos** — falla rápido y con mensaje accionable si `sonar-scanner` no está en PATH o faltan secrets. Ver `mistakes.md` §8.
  - **Mask de env vars de PR** (`GITHUB_EVENT_NAME`, `GITHUB_REF`, `GITHUB_BASE_REF`, `GITHUB_HEAD_REF` a `''`) — obligatorio en SonarQube Community Edition. Ver `mistakes.md` §9.
  - `run: sonar-scanner` directo (no la GitHub Action de Docker, que no corre en Windows).
  - Quality Gate **report-only** en esta fase (sin `sonar.qualitygate.wait=true`).
- **Archivos de Referencia**:
  - `frontend/.github/workflows/ci.yml` (job `sonarqube`)
  - `frontend/sonar-project.properties`
- **Plantilla del job** (adaptar solo lo marcado al replicar):
  ```yaml
  sonarqube:
    needs: validate
    if: github.event.pull_request.draft != true
    runs-on: [self-hosted, sonar]
    timeout-minutes: 10
    concurrency:
      group: sonarqube-${{ github.ref }}
      cancel-in-progress: true
    defaults:
      run:
        shell: pwsh
    steps:
      - name: Verify prerequisites
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
        run: |
          $missing = @()
          if (-not (Get-Command sonar-scanner -ErrorAction SilentlyContinue)) {
            $missing += "sonar-scanner no esta en PATH del runner. Reiniciar el servicio ('Restart-Service actions.runner.*') para refrescar el PATH del sistema."
          }
          if ([string]::IsNullOrWhiteSpace($env:SONAR_TOKEN)) { $missing += "Secret SONAR_TOKEN ausente." }
          if ([string]::IsNullOrWhiteSpace($env:SONAR_HOST_URL)) { $missing += "Secret SONAR_HOST_URL ausente." }
          if ($missing.Count -gt 0) {
            $msg = "Prerequisitos del job 'sonarqube' incompletos:`n - " + ($missing -join "`n - ")
            Write-Host "::error title=SonarQube prerequisites missing::$msg"
            throw $msg
          }
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0          # historial completo para análisis SCM de Sonar
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: SonarQube Scan
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
          # Community Edition: enmascarar env de PR para forzar análisis de rama main
          GITHUB_EVENT_NAME: ''
          GITHUB_REF: ''
          GITHUB_BASE_REF: ''
          GITHUB_HEAD_REF: ''
        run: sonar-scanner
  ```
- **Adaptación backend (monorepo)**: en `sonar-project.properties` ajustar `sonar.sources=apps,packages`, `sonar.typescript.tsconfigPaths` con múltiples paths (uno por app), y `sonar.test.inclusions` para `**/*.e2e-spec.ts`. La `projectKey` es `Tecnipass-Backend` (ver `mistakes.md` §6 — no abreviar).
