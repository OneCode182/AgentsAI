
# Workflow: Solicitud de Análisis de como funciona el Dashboard Home

# Análisis del Funcionamiento del Dashboard Home
El Dashboard Home en la ruta `tecnipass-frontend\app\routes\_home.dashboard.home._index\...` está diseñado para mostrar tres tablas principales: Vehículos, Personas y Parqueaderos. Cada una de estas tablas está organizada en pestañas, lo que permite a los usuarios navegar fácilmente entre ellas.


1. Analiza la ruta que se encuentra: `tecnipass-frontend\app\routes\_home.dashboard.home._index\...`
> Allí tengo 3 tablas (grupo de pestañas): Pestaña de Vehículos, de Personas y de Parqueaderos (En base a autorizaciónes)
2. Revisa el código de esas tablas y como funcionan.
3. Revisa si hay algún hook personalizado que se esté utilizando.
4. Revisa si hay algún esquema de validación (Zod) que se esté utilizando.
5. Genera un análisis detallado de cómo funciona el Dashboard Home, incluyendo:
   - Cómo se estructuran las tablas y las pestañas.
   - Qué datos se están mostrando y cómo se están obteniendo.
   - Qué hooks personalizados se están utilizando y para qué.
   - Qué esquemas de validación (Zod) se están utilizando y cómo contribuyen a la funcionalidad.
6. Si el esquema de validación (Zod) no existe, indícalo claramente en el análisis.
7. Proporciona ejemplos de código relevantes para ilustrar los puntos clave del análisis.

-----------
Luego de ese primer análisis, te voy a pedir que propongas, pues debo decirle al backend qué datos necesito para mostrar en esas tablas.
1. Dame El esquema Zod que debería existir para validar los datos que se muestran en el Dashboard Home. (Para las 3 tablas)
2. Las 3 tablas van a ser en realtime (websocket por ejemplo), las mas importantes son las de Vehículos y Personas.
3. Proponme el endpoint RESTful que debería existir para obtener esos datos inicialmente (antes de abrir el websocket)
4. Proponme la estructura JSON de respuesta para ese endpoint (basándote en el esquema Zod que generes)
5. Proponme query params que podrían ser útiles para filtrar los datos en ese endpoint (por ejemplo, por estado de autorización, fechas, etc.)

-----------
## Que tienes que darme?
Basicamente basadote en el ejemplo de `.context\memory\schema-sample.md`
Hacer algo similar
Un schema Zod para las 3 tablas, 1 por cada tabla
