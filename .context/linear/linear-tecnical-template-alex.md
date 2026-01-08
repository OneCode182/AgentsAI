Descripción

El sistema necesita mostrar la información de la propiedad a la que pertenece un usuario en la ventana de 'Detalles del usuario'. Actualmente, esta información no se está mostrando en ninguna de las vistas de detalles de usuario, a pesar de que los datos están disponibles en la estructura de datos del usuario [1].

La implementación debe agregarse en las dos ubicaciones principales donde se muestran los detalles del usuario:

Vista principal de usuarios (/users)

Vista de usuarios de organización (/organizations/{id})

Esta mejora permitirá a los administradores identificar rápidamente a qué propiedad está asociado cada usuario sin necesidad de navegar a otras secciones del sistema.

Detalles Técnicos

Archivos involucrados:

Componente principal de detalles de usuario:

app/routes/_home.users._index/route.tsx - Líneas 420-470 (componente DetailsAlert)

Componente de detalles de usuario en organizaciones:

app/routes/_home.organizations.$id._index/route.tsx - Líneas 165-220 (componente DetailsAlert)

Estructura de datos disponible:

La interfaz UserApi ya incluye la información de la propiedad [2]:

property: z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .optional(),

Implementación requerida:

En /users (archivo: app/routes/_home.users._index/route.tsx)

Agregar nuevo AlertDetailsField después de la línea de "Organización"

Campo: label='Propiedad'

Valor: selectedUser.property?.name || 'No asignada'

En /organizations/{id} (archivo: app/routes/_home.organizations.$id._index/route.tsx)

Agregar nuevo AlertDetailsField en la sección "Datos del usuario"

Campo: label='Propiedad'

Valor: selectedUser.property?.name || 'No asignada'

Notas de implementación:

El campo property es opcional en la estructura de datos, por lo que se debe manejar el caso donde sea null o undefined

Se debe mantener consistencia con el patrón existente de campos usando el componente AlertDetailsField

La implementación debe seguir las convenciones existentes del proyecto para manejo de datos opcionales

Fuentes