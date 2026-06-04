# Registro de Errores Comunes (Mistakes & Anti-patterns to Avoid)

> Este documento contiene una bitácora de errores cometidos durante el desarrollo de TecniPass, sus consecuencias y las medidas preventivas. Consúltalo antes de realizar cambios de código para evitar caer en las mismas trampas.

---

## 1. Modificar flujos fuera del scope de la ruta objetivo (Scope Creep)
- **Error**: Al arreglar un error en la ruta de Recepción, se modificó accidentalmente un hook compartido que afectaba el flujo de registro de Roles e IAM global, rompiendo la autenticación.
- **Impacto**: Regresión crítica que bloqueó el acceso de los administradores a la aplicación.
- **Cómo Evitarlo**: Mantener los cambios acotados al directorio de la ruta activa (`app/routes/_home.{module}/`). Si es necesario modificar un componente o hook global, se debe coordinar con el arquitecto y crear una tarea de prueba regresiva dedicada.

---

## 2. Apilamiento vertical incorrecto de botones de acción en resoluciones móviles
- **Error**: Apilar botones de acción ("Confirmar", "Cancelar") verticalmente ocupando toda la pantalla móvil, en lugar de mantener una disposición horizontal compacta o usar iconos limpios.
- **Impacto**: UI UX deficiente en tablets de recepción y pantallas móviles de tamaño intermedio.
- **Cómo Evitarlo**: Sigue la directiva de diseño responsivo: los botones clave deben ir uno al lado del otro en pantallas pequeñas (`flex-row`) a menos que el texto sea extremadamente largo, en cuyo caso se debe recortar o simplificar.

---

## 3. Uso de `--no-verify` en commits de Git
- **Error**: Ejecutar `git commit -m "..." --no-verify` para omitir los hooks de pre-commit de Biome y Type-checking.
- **Impacto**: Subida de código roto con fallos de tipo TypeScript y estilo inconsistente al repositorio principal, lo que rompió el pipeline de CI/CD.
- **Cómo Evitarlo**: Queda **estrictamente prohibido** utilizar la bandera `--no-verify`. Si hay fallos de Biome o TypeScript, debes solucionarlos localmente antes de commitear.

---

## 4. Hardcodear rutas absolutas de archivos según el ambiente
- **Error**: Escribir paths absolutos locales como `D:\tecnipass-frontend` o `/home/onecode/data/tecnipass-backend` directamente en el código de scripts o configuraciones.
- **Impacto**: Rompió la portabilidad del código al cambiar de ambiente de desarrollo (de Windows local a Linux OneCode o el Sandbox de la nube).
- **Cómo Evitarlo**: Utilizar siempre rutas relativas al proyecto o resolver el path absoluto del sistema leyendo el archivo `env.json` a través de variables de entorno virtuales.

---

## 5. Duplicar código de UI en lugar de parametrizar componentes existentes
- **Error**: Copiar y pegar el código completo del componente de paginación de recepción para crear un componente de paginación en reuniones, en lugar de extraerlo como un componente compartido.
- **Impacto**: Incremento de deuda técnica y aumento del tamaño del bundle de JavaScript.
- **Cómo Evitarlo**: Si vas a usar un patrón más de 2 veces, muévelo a `frontend/app/components/` y parameterízalo con propiedades (props).

---

## 6. Inconsistencia en la clave de proyecto de SonarQube
- **Error**: Configurar la clave de proyecto como `Tecnipass-Front` en el scanner de la terminal, mientras que en SonarQube estaba definida como `Tecnipass-Frontend`.
- **Impacto**: Los reportes de cobertura y bugs se subían a un proyecto fantasma, dejando la rama principal sin reportes de calidad actualizados.
- **Cómo Evitarlo**: Utiliza siempre los nombres correctos definidos en [env.json](file:///C:/Users/user/Documents/Obsidian%20Vault/TECNI/.tecnipass/env.json): `Tecnipass-Frontend` y `Tecnipass-Backend`. No abrevies los nombres de los proyectos.

---

## 7. Reutilizar componentes de UI para estados de negocio sem�nticamente distintos
- **Error**: Reutilizar el mismo componente y constante de texto (GuestPendingRegistrationWithoutAttachmentsMessage) tanto para el estado de "Aprobaci�n Pendiente sin Adjuntos" como para "Registro Pendiente", lo que causaba que la recepci�n mostrara alertas il�gicas (ej. pedir aprobaci�n cuando a�n falta registro).
- **Impacto**: Confusi�n operativa en recepci�n al presentar botones y mensajes incorrectos al flujo de negocio en el que se encontraba el visitante.
- **C�mo Evitarlo**: Separa siempre los componentes de alerta y botones seg�n el **estado sem�ntico del proceso** (ej. PendingApproval vs PendingRegistration). No acoples la UI bas�ndote �nicamente en una condici�n t�cnica (como "sin adjuntos"), ya que cada estado de negocio requiere instrucciones y acciones (ActionButtons) �nicas.

---

## 8. Asumir que el self-hosted runner ve los cambios de PATH del sistema sin reiniciar
- **Error**: Instalar `sonar-scanner` y agregarlo al PATH del sistema **después** de haber registrado el GitHub Actions runner como servicio de Windows. El job falla con `'sonar-scanner' is not recognized` aunque el comando funcione perfecto en una terminal del server.
- **Impacto**: Pipeline en rojo con un mensaje confuso; se pierde tiempo depurando una "instalación rota" que en realidad está bien.
- **Cómo Evitarlo**: Un Windows Service hereda las variables de entorno (incluido el PATH) al momento de arrancar y **no las refresca** hasta reiniciarse. Tras cualquier cambio de PATH en el server, ejecutar `Restart-Service actions.runner.*`. El workflow incluye un step "Verify prerequisites" que detecta este caso y lo reporta con la instrucción exacta. Ver patrón en `patterns.md` §8.

---

## 9. Dejar que sonar-scanner auto-detecte modo PR en SonarQube Community Edition
- **Error**: Ejecutar `sonar-scanner` dentro de GitHub Actions sin enmascarar las env vars de PR. El scanner detecta `GITHUB_EVENT_NAME=pull_request` y activa automáticamente el análisis de Pull Request / branch, que **no está soportado en Community Edition** (solo Developer Edition+). El scan falla con un error de licencia/feature no disponible.
- **Impacto**: El primer PR real rompe el pipeline pese a que el scan local en `main` funcionaba sin problemas. Diagnóstico no obvio porque el error apunta a "branch analysis" sin mencionar la edición.
- **Cómo Evitarlo**: En el step del scan, fijar a string vacío `GITHUB_EVENT_NAME`, `GITHUB_REF`, `GITHUB_BASE_REF` y `GITHUB_HEAD_REF`. Así el scanner trata cada ejecución como análisis de la rama principal (mismo comportamiento que correr el scanner localmente), y el reporte sube correctamente. Si en el futuro se migra a Developer Edition, revertir el mask para habilitar PR decoration. Ver `patterns.md` §8 y [ADR-008](decisions.md).
