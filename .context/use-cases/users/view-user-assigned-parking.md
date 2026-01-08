---
name: view-user-assigned-parking
actor: system-admin
scenario: Visualización de parqueaderos asignados a un usuario
---

# User Story Title
Visualización y Verificación de Parqueaderos Asignados

# Actor & Narrative
**As a** system-admin
**I want to** consultar el perfil de un usuario existente
**So that** pueda verificar que los parqueaderos asignados coinciden exactamente con los cupos otorgados durante su creación o edición.

---

# Structured Use Case

### Pre-conditions
- El usuario ya ha sido creado y tiene parqueaderos asignados.
- El `system-admin` tiene permisos de lectura sobre el módulo de usuarios.

### Main Flow
1. **Búsqueda**: El administrador busca al usuario por nombre o identificación en la tabla de usuarios.
2. **Selección**: Hace clic en el registro del usuario para abrir su perfil/detalle.
3. **Consulta de Cupos**: El administrador navega a la pestaña o sección de "Parqueaderos/Vehículos".
4. **Verificación**: El sistema lista los parqueaderos asociados, mostrando:
   - Nombre/Nomenclatura del cupo.
   - Piso.
   - Tipo de vehículo permitido.
5. **Validación**: El administrador confirma que la lista es idéntica a la configurada originalmente.

### Exceptions
- **E1: Usuario sin parqueaderos**: Si el usuario no tiene asignaciones, se muestra un estado vacío con el mensaje: "Este usuario no tiene parqueaderos privados asignados".
- **E2: Error de carga**: Si el servicio de consulta falla, se muestra un mensaje de reintento.

### Post-conditions
- La información mostrada es de solo lectura (a menos que se inicie un flujo de edición).
- No se muestran parqueaderos de otras organizaciones o propiedades.

---

# Acceptance Criteria
1. **Integridad de Datos**: Los parqueaderos listados deben corresponder exactamente a los IDs almacenados en la tabla `user_parking_assignment`.
2. **Visibilidad de Atributos**: Cada cupo listado debe mostrar claramente su piso y tipo para facilitar la identificación física.
3. **Consistencia RBAC**: Solo usuarios con permisos de administración pueden ver esta información sensible de asignación.

---

# Technical Dependencies
- **Endpoint GET `/users/{id}`**: Debe incluir en el payload (o mediante un expand) la colección de parqueaderos asignados.
- **Relación `parking_units`**: Para traer los metadatos de los parqueaderos (Piso, Tipo) basados en los IDs asignados.
