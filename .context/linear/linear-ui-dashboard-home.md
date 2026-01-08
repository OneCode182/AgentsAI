# [FE] Diseño UI/UX: Dashboard Home - Wireframes de Alta Fidelidad

## 🎯 Contexto y Objetivo
La sección "Home" es el centro de mando del portero. Proporciona el pulso del edificio en tiempo real. Necesitamos evolucionar la estructura de sub-pestañas actual hacia una vista de dashboard cohesiva, de alta densidad de datos pero visualmente respirable.

---

## 🎨 Tareas de Diseño
- [ ] **Wireframes de Alta Fidelidad**: Detallar el layout de las tres tablas principales (Vehículos, Personas, Parqueaderos) y las tarjetas de resumen (Summary Cards) superiores.
- [ ] **Indicadores de Tiempo Real**: Cues visuales para registros agregados vía WebSockets (ej: una animación sutil de resaltado cuando aparece una nueva fila).
- [ ] **Grilla Responsiva**: ¿Cómo encajan las tres tablas en una laptop? (Sugerencia: Vista con pestañas internas o grilla de dashboard con scroll).
- [ ] **Gestión de Densidad de Datos**: Asegurar que los textos sean legibles incluso con las tablas llenas.

---

## 🧩 Inventario de Componentes

### Componentes Existentes (Reutilizar)
- **Sidebar y Navegación Superior**: Ya definidos en el layout global.
- **Módulo DataTable**: Usar el componente base de tablas con encabezados de ordenamiento.

### Nuevos Componentes (A Diseñar)
- **Tarjetas Indicadoras (Summary Cards)**: 3-4 tarjetas superiores que muestren: Total Vehículos Esperados Hoy, Personas Esperadas, Cupos de Parqueadero Ocupados.
- **Badge de Estado WebSocket**: Un pequeño indicador que muestre si el flujo de datos está "En Vivo" o "Desconectado".
- **Fila de Registro Compacta**: Específicamente para la vista Home, las filas deben ser ligeramente más compactas que en la vista de "Búsqueda Profunda".

---

## ⚡ Estados Interactivos y Flujos
- **Estado de Carga (Loading)**: El Home debe usar **Skeleton Loaders** para las tres tablas simultáneamente durante el fetch inicial.
- **Entrada de Nuevo Registro**: Cuando llegue un evento de WebSocket, la nueva fila debe "deslizarse" o resaltar brevemente (efecto Flash).
- **Estado Cero (Zero-State)**: Ilustración que explique que aún no se han registrado movimientos el día de hoy.
- **Click en Fila**: Abre un **Side Drawer (Hoja Lateral)** con el detalle completo del registro (VehicleDetail o PersonDetail).

---

## 📊 Representación de Datos (Frontend Mocks)

### 1. Tabla de Vehículos (Tiempo Real)
```json
{
  "timestamp": "2024-05-20T10:30:00Z",
  "plate": "ABC-123",
  "parking": "Cajón A-45",
  "type": "private | invitation",
  "organization": "Tecnipass Corp",
  "vehicle": "car"
}
```

### 2. Tabla de Personas (Tiempo Real)
```json
{
  "timestamp": "2024-05-20T10:35:00Z",
  "identificationNumber": "1.090...",
  "name": "Juan Pérez",
  "type": "invitation",
  "organization": "Visitante",
  "office": "301"
}
```

### 3. Estado de Parqueaderos (Tiempo Real)
```json
{
  "name": "P-01",
  "floor": "Piso 1",
  "usage": "private",
  "occupied": true,
  "vehicleType": "car"
}
```

---

## 🛡️ Estándares Senior y Restricciones
- **Jerarquía Visual**: La hora (timestamp) y la Placa/Nombre deben ser los elementos más prominentes.
- **Micro-copy**: Usar etiquetas claras para el 'Tipo de Autorización' (ej: "Residente" vs "Invitado").
- **Performance**: Asegurar que las animaciones de actualización no causen saltos de layout (CLS).
- **ISO 27001**: Los números de identificación en la tabla resumen deben estar parcialmente enmascarados (ej: 1.090.XXX.XX) para proteger la privacidad en la pantalla del portero.

---

## 🔗 Referencias
- **Contexto Backend**: [linear-back-dashboard-home.md](file:///c:/Users/Sergio%20Silva/Documents/OneContext/.context/memory/linear-back-dashboard-home.md)
- **Arquitectura General**: [linear-dashboard.md](file:///c:/Users/Sergio%20Silva/Documents/OneContext/.context/memory/linear-dashboard.md)
