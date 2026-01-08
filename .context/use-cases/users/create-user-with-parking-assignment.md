---
name: create-user-with-parking-assignment
actor: system-admin
scenario: Creación de usuario con asignación de cupos de parqueadero por organización
---

# User Story Title
Creación de Usuario con Asignación de Parqueaderos Privados por Organización

# Actor & Narrative
**As a** system-admin
**I want to** crear un nuevo usuario en el sistema asignándole datos básicos, permisos de acceso y cupos de parqueadero específicos de su organización
**So that** el usuario tenga acceso controlado al edificio y a los espacios de estacionamiento que le corresponden legalmente por contrato.

---

# Structured Use Case

### Pre-conditions
- El `system-admin` ha iniciado sesión exitosamente.
- La organización y la propiedad del nuevo usuario ya existen en el sistema.
- Existen contratos (`contracts`) de ocupación vigentes que vinculan la organización y la propiedad con parqueaderos específicos.

### Main Flow
1. **Acceso**: El administrador navega a la sección de "Usuarios".
2. **Inicio de Creación**: Selecciona la opción para "Crear Usuario".
3. **Datos Básicos**: Digita la información del usuario (Nombre, Identificación, etc.).
4. **Configuración de Acceso**: 
   - Define el periodo de autorización (Fecha inicio/fin).
   - Selecciona los días de acceso permitidos.
   - Selecciona las zonas del edificio a las que tendrá acceso.
5. **Asignación de Parqueadero**:
   - El sistema filtra automáticamente los parqueaderos de la propiedad seleccionada que sean de tipo `private`.
   - El sistema cruza la base de datos para mostrar solo aquellos que están vinculados a la organización del usuario mediante un permiso de ocupación (`contract`).
   - El administrador utiliza los filtros por "Tipo de Vehículo" y "Piso" para localizar los cupos.
   - El administrador selecciona uno o más parqueaderos mediante el checklist.
6. **Confirmación**: El sistema abre una ventana de confirmación mostrando el resumen del usuario y la lista exacta de parqueaderos seleccionados.
7. **Finalización**: El administrador confirma la creación.
8. **Verificación**: El sistema redirige a la vista de detalle del usuario recién creado.

### Exceptions
- **E1: No hay parqueaderos disponibles**: Si la combinación de Propiedad y Organización no tiene contratos asociados, el sistema muestra un mensaje: "No se encontraron parqueaderos vinculados a esta organización en la propiedad seleccionada".
- **E2: Datos obligatorios incompletos**: El sistema resalta los campos faltantes y bloquea el botón de creación.
- **E3: Conflicto de contrato**: Si un parqueadero seleccionado ya alcanzó su límite de usuarios según el contrato, el sistema lanza una alerta de validación.

### Post-conditions
- El usuario es creado en la base de datos con su perfil de acceso.
- Los parqueaderos seleccionados quedan vinculados exclusivamente a este usuario dentro de la sesión de acceso.
- La vista de detalle del usuario muestra exactamente los mismos parqueaderos que fueron seleccionados en el flujo de creación.

---

# Acceptance Criteria
1. **Filtro de Privacidad**: Solo los parqueaderos con `parkingType == "private"` deben ser visibles para asignación.
2. **Validación de Contrato**: Un usuario NO puede ver parqueaderos que no pertenezcan a su organización o que no estén en su contrato de ocupación.
3. **Multi-selección**: El sistema debe permitir seleccionar 0, 1 o N parqueaderos.
4. **Resumen de Confirmación**: Antes de guardar, se debe presentar una ventana modal con los nombres/IDs exactos de los parqueaderos elegidos.
5. **Persistencia**: Al consultar el perfil del usuario post-creación, los parqueaderos mostrados deben coincidir 1:1 con la selección inicial.
6. **Filtros Funcionales**: Los filtros de "Piso" y "Tipo de Vehículo" deben actualizar la lista de parqueaderos en tiempo real.

---

# Technical Dependencies
- **Endpoint POST `/users`**: Para persistir la data básica y las zonas.
- **Endpoint GET `/parking-lots/available`**: Debe aceptar los parámetros `propertyId`, `organizationId` y `parkingType="private"`.
- **Relación `contracts`**: La lógica de negocio debe validar la relación entre `property`, `organization` y `parking_unit`.
- **Relación `user_parking_assignment`**: Tabla intermedia para guardar la relación de los cupos asignados.
