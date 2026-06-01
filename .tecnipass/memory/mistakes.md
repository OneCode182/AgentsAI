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
