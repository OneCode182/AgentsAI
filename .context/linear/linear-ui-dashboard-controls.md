# [FE] Diseño UI/UX: Centro de Control y Accesos Físicos

## Objetivo
Diseñar una interfaz de control crítico que permita al portero accionar talanqueras y torniquetes de manera segura y eficiente. El diseño debe garantizar que cada acción física esté vinculada a un registro manual obligatorio (Auditoría), minimizando errores operativos y asegurando la trazabilidad total.

---

## [Mockup]
> *[Insertar aquí la captura del Mockup de Nivel 2: Vista de Centro de Control]*
> **Nota para la diseñadora**: Los elementos deben estar agrupados por zona física (ej: Entrada Principal, Lobby de Propietarios, Sótano).

---

## Tareas de Diseño
- [ ] **Acciones de Control**: Diseñar botones de acción rápida para "Abrir Talanquera" y "Abrir Torniquete" con estados visuales claros (Presionado, Esperando Respuesta, Éxito).
- [ ] **Flujo de Registro Obligatorio**: Diseñar el flujo donde, al hacer clic en "Abrir", se despliegue automáticamente el formulario de **Registro Manual**.
- [ ] **Validación y Confirmación**: Implementar modales de confirmación para acciones críticas (ej: "¿Está seguro que desea abrir el Torniquete de Salida?") para evitar aperturas accidentales.
- [ ] **Categorización Visual**: Separar los torniquetes del Lobby de los del parqueadero usando convenciones de nombres distintas (ej: "Acceso Peatonal Lobby" vs "Acceso Peatonal Sótano") para evitar confusiones operativas.

---

## Inventario de Componentes

### Componentes Existentes (Reutilizar)
- **Modales de Sistema**: Usar el estándar de modales para las confirmaciones.
- **Formularios de Registro**: Reutilizar campos de validación de Placa, Nombre y Documento.

### Nuevos Componentes (A Diseñar)
- **Access Control Card**: Una tarjeta que contenga el nombre del acceso físico, un indicador de estado (Cerrado/Abierto) y el botón de acción principal.
- **Audit Log Snippet**: Una pequeña lista o badge que muestre la última acción realizada por el usuario actual en ese acceso.

---

## Propuesta (Wireframe anterior)
La propuesta inicial contemplaba los "Reinicios Masivos" en esta vista. **IMPORTANTE**: Estos se han movido a la pestaña de "Ocupación". En esta versión, el enfoque debe ser exclusivamente en **Operación Directa** (Abrir/Cerrar/Registrar).

**Esquema de Datos para Registro Manual:**
```json
{
  "access_id": "TALANQUERA_01",
  "action": "OPEN",
  "registration": {
    "type": "vehicle | person",
    "direction": "entry | exit",
    "id_number": "1.090...",
    "plate": "XYZ-987",
    "observation": "Ingreso por mantenimiento de ascensores",
    "authorized_by": "ID_PORTERO_01"
  }
}
```

---

## Referencias
- **Requerimientos Funcionales**: [linear-dashboard-controls.md](file:///c:/Users/Sergio%20Silva/Documents/OneContext/.context/memory/linear-dashboard-controls.md)
- **Arquitectura de Dashboard**: [linear-dashboard.md](file:///c:/Users/Sergio%20Silva/Documents/OneContext/.context/memory/linear-dashboard.md)
- **Diseño General**: [linear-ui-template.md](file:///c:/Users/Sergio%20Silva/Documents/OneContext/.context/memory/linear-ui-template.md)
