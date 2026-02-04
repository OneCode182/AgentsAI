# Lab 01: Stellar Luminosity - Linear and Polynomial Models

## 1. Resumen del Repositorio
Este repositorio contiene la implementación desde cero de modelos de **regresión lineal** y **regresión polinómica** para predecir la luminosidad estelar en función de la masa y la temperatura. El proyecto se destaca por no utilizar librerías de alto nivel (como scikit-learn), implementando la optimización matemática y el descenso de gradiente utilizando únicamente **NumPy** y **Matplotlib**.

## 2. Lo que se logró
- **Implementación desde principios básicos**: Se desarrollaron algoritmos de regresión y funciones de costo (MSE) sin frameworks de ML.
- **Optimización**: Implementación de Descenso de Gradiente tanto en versiones iterativas (bucles) como vectorizadas.
- **Análisis Comparativo**: Se compararon modelos lineales, cuadráticos y polinómicos completos (con términos de interacción) para evaluar la precisión.
- **Ejecución en Nube**: Despliegue y ejecución exitosa de los notebooks en **AWS SageMaker**.
- **Visualización**: Generación de superficies de costo 3D y contornos para entender la optimización.

## 3. Tema Principal
**Modelado de Luminosidad Estelar mediante Regresión Supervisada.**
El objetivo central fue inferir relaciones astrofísicas (Luminosidad vs Masa/Temperatura) utilizando modelos matemáticos ajustados mediante optimización numérica.

## 4. Temáticas
- **Regresión Lineal**: Ajuste de modelos de una sola variable ($L = wM + b$).
- **Regresión Polinómica**: Ingeniería de características para capturar no linealidades ($M^2, M \cdot T$).
- **Matemáticas del ML**: Derivación de gradientes, funciones de costo y superficies de error.
- **Vectorización**: Uso de álgebra lineal para optimizar el cómputo numérico.
- **Infraestructura Cloud**: Ejecución de cargas de trabajo de Data Science en AWS SageMaker.

## 5. Tecnologías
- **Lenguaje**: Python 3.11+
- **Cómputo Numérico**: NumPy (v2.x local, v1.26.x en nube)
- **Visualización**: Matplotlib (gráficos 2D y 3D)
- **Entorno de Desarrollo**: Jupyter Notebooks
- **Infraestructura**: AWS SageMaker Studio

## 6. Retos
- **Restricción de Librerías**: El desafío técnico principal fue la prohibición de librerías de ML convencionales (scikit-learn, TensorFlow), obligando a implementar la matemática "a mano".
- **Compatibilidad de Versiones**: Manejo de diferencias entre versiones de NumPy locales (más recientes) y las disponibles en el entorno de SageMaker.
- **Ajuste de Hiperparámetros**: Encontrar tasas de aprendizaje ($\alpha$) adecuadas para asegurar la convergencia sin divergencia.

## 7. Convenciones
- **Estructura del Proyecto**: Notebooks en la raíz numerados secuencialmente (`01_part1...`, `02_part2...`).
- **Definición de Datos**: Datasets definidos directamente en código (arrays de NumPy) en lugar de archivos CSV externos.
- **Documentación**: Uso estricto de Markdown para documentar la evidencia de ejecución (capturas de pantalla y videos).
- **Notación Matemática**: Consistencia en el uso de símbolos ($M$ para masa, $L$ para luminosidad, $w/b$ para parámetros).

## 8. Aprendizajes
- **Vectorización vs Bucles**: La implementación vectorizada es crítica para el rendimiento y la limpieza del código.
- **Interpretación de Modelos**: Cómo los términos de interacción ($M \cdot T$) y cuadráticos capturan comportamientos físicos que los modelos lineales ignoran.
- **Debugging Matemático**: La importancia de visualizar la función de costo para diagnosticar problemas de convergencia.
- **Diferencias de Entorno**: La ejecución en la nube puede presentar ligeras variaciones en tiempos de ejecución y versiones de librerías respecto al entorno local.
