# Guía para la Creación de Resúmenes de Labs (AREP)

Este documento describe el proceso y la estructura para generar resúmenes automáticos de los laboratorios del repositorio AREP dentro de este directorio `.arep/`.

## 1. Ubicación de los Resúmenes
Todos los resúmenes generados deben almacenarse en la subcarpeta `labs/`:
`[Directorio de Labs](file:///run/media/onecode/DATA/AgentsAI/.arep/labs/)`

## 2. Convención de Nombres
Los archivos deben seguir el siguiente formato:
`lab-0x-<titulo-descriptivo>.md`
Donde `x` es el número del laboratorio (ej. `01`, `02`, etc.).

## 3. Proceso de Generación
Para crear un nuevo resumen, se debe proporcionar al agente el siguiente contexto:
1. **Repo del Lab**: Ruta al repositorio local con el código del laboratorio.
2. **Enunciado**: El archivo `.md` original (usualmente en `src/lab0x-moodle.md`) que contiene los requerimientos del profesor.

## 4. Estructura del Resumen
Cada archivo en `labs/` debe contener las siguientes secciones:

- **Resumen del Repositorio**: Descripción general de qué trata el lab.
- **Lo que se logró**: Hitos técnicos alcanzados.
- **Tema principal**: El foco central del laboratorio (ej. Regresión, Dockerización, etc.).
- **Temáticas**: Conceptos clave tratados (ej. Vectorización, AWS, Microservicios).
- **Tecnologías**: Stack tecnológico utilizado (Lenguajes, Librerías, Infraestructura).
- **Retos**: Dificultades técnicas y cómo se superaron.
- **Convenciones**: Estándares seguidos en el código y estructura del repo.
- **Aprendizajes**: Conclusiones y conocimientos adquiridos.

## 5. Instrucciones de Almacenamiento
Asegúrate de que cualquier nuevo resumen se coloque dentro de `.arep/labs/` para mantener la organización del proyecto.
