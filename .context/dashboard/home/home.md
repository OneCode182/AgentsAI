
## Contexto General: Dashboard - Home

Componente Vehículos autorizados del día (TABLA)
- Tabla en tiempo real - Filtrado por defecto de "Registros más recientes o próximos"
- Que sea fácil de consultar por placa, podría separarse funcionarios de visitantes. que incluya
    - placa
    - nombre invitado/funcionario
    - organización
    - fecha
    - hora
    - quien invita.



---
## Contexto Linear: Dashboard - Home

Pantalla inicial del sistema. Entrega al portero una visión rápida y confiable del estado actual del edificio sin necesidad de interacción avanzada.

1. Resumen de autorizaciones

Cantidad de vehículos esperados hoy

Cantidad de personas esperadas hoy (funcionarios / visitantes)

2. Resumen de alertas

Vehículos abandonados

Personas con tiempo excedido

Acceso directo a vista de Alertas

ANOTACIÓN ALERTAS: No estadísticas; una sección donde el portero, de manera rápida, pueda saber el estado del edificio en tiempo real. Si el portero requiere detalle en estas alertas, lo va a redirigir a la vista dedicada de "Alertas"

3. Vehículos autorizados del día (TABLA)

Tabla en tiempo real - Filtrado por defecto de "Registros más recientes o próximos"

ANOTACIÓN (JUAN) Que sea fácil de consultar por placa, podría separarse funcionarios de visitantes. que incluya: placa, nombre invitado/funcionario, organización, fecha, hora, quien invita. ¿cómo mostrar si hay más de una persona y organización con el vehículo?

ANOTACIÓN (SERGIO): Para esta tabla en concreto, va a tener filtros por (tipo usuario, parqueadero, ingreso/salida, vehículo, organización, busqueda para placa nombre ID etc..). Si un vehículo registra que ha tenido más de 1 dueño o conductor, la idea es que la tabla permita mostrar esto en la sección de detalles.

4. Personas autorizadas del día (TABLA)

Tabla en tiempo real - Filtrado por defecto de "Registros más recientes o próximos"

ANOTACIÓN (JUAN): Separar funcionarios de visitantes. Que sea fácil de consultar por nombre, que incluya: nombre invitado/funcionario, organización, fecha, hora, quien invita. 

ANOTACIÓN (SERGIO): Es una tabla con el mismo modelo de la tabla para vehículos autorizados; cambian los iconos y la columna de placa ya no va; en su lugar va cedula y nombre de la persona.

5. Parqueaderos del edificio

Tabla en tiempo real 

ANOTACIÓN (JUAN): Mostrar todos los parqueaderos del inmueble ordenados por piso y por nombre. Indicar su nombre, uso (P|V), tipo (carro|moto|camión), organización (solo si es Privado), capacidad, y vehículos autorizados en el parqueadero 

ANOTACIÓN (SERGIO): Queda por definir si el diseño se hará como está actualmente en la aplicación; lo mas probable con el prototipo de tabla, con filtros por columna, ordenamiento por columna, busqueda general, y sección de detalles para cada parqueadero. Es importante que cada cupo de parqueadero, en su sección de detalles, esté en modo "tiempo real" para ver los vehículos autorizados del día que estan relacionados a este cupo, para ver un tipo de historial para ese cupo y que el portero pueda asegurar consistencia y seguridad en el uso de los cupos de parqueadero.