## Tabla Cupos de Parqueadero del Edificio

> Esquema de datos para la tabla de cupos de parqueadero en el dashboard del portero

Datos que se ven en la tabla de primera vista
- Nombre del cupo
- Piso
- Uso: Privado o Visitante
- Tipo de Vehículo
- Ocupado o no: Libre o Ocupado
- Organización (Solo si es Privado)


Datos que se ven al hacerle al botón de "Ver detalles"
> Importante, esto es una relación inversa desde el esquema de parqueaderos hacia los vehículos autorizados; Se va a ver los mismos 

> Va a haber un listado de vehículos autorizados para ese cupo de parqueadero
- Por cada vehículo autorizado se va a ver (en detalles)
- Tipo de identificación: CC, ...
- Numero de ID: ...
- Correo: 
- Fecha y hora de inicio de autorización:
- Fecha y hora de fin de autorización:
- Organización:
- Propiedad:
- Oficina: Ejemplo OF405

