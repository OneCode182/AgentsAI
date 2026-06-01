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
