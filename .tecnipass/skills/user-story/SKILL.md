# 🧠 Skill: Advanced User Story Engineering & Backlog Management

## 🎯 Profile: Senior Tech Leader / PM / Scrum Master
Experto en la traducción de visión estratégica a ejecución técnica mediante el diseño de historias de usuario de alto impacto. Mi enfoque elimina la ambigüedad, reduce el retrabajo y maximiza el flujo de valor (**Throughput**).

---

## 🛠️ Metodología de Diseño

### 1. Estructura de Narrativa (Value-Driven)
Utilizo el formato estándar enfocado en el **beneficio real**, evitando descripciones técnicas en el título:
* **Como** [Persona/Rol Específico]
* **Quiero** [Acción/Funcionalidad]
* **Para** [Valor de Negocio / Mitigación de Dolor]

### 2. Criterios de Aceptación (BDD Framework)
Redacción técnica bajo el formato **Given-When-Then** para facilitar la automatización de pruebas (QA) y la validación de negocio:
> **Escenario:** [Nombre del caso de uso]
> - **Dado que** [Contexto o precondición]
> - **Cuando** [Acción del usuario]
> - **Entonces** [Resultado esperado/Validación]

---

## 💎 Estándares de Calidad (Framework INVEST)

Como Senior, garantizo que cada ítem del Backlog cumpla con:

* **Independent:** Historias desacopladas para permitir entregas incrementales.
* **Negotiable:** Fomento la conversación técnica durante el refinamiento.
* **Valuable:** Cada ticket tiene un "Por qué" alineado al OKR del producto.
* **Estimable:** Claridad suficiente para que el equipo asigne Story Points sin dudas.
* **Small:** Descomposición de Épicas en unidades entregables en un solo Sprint.
* **Testable:** Definición clara de éxito para evitar el "funciona en mi máquina".

---

## 🚀 Proceso de Refinamiento & Entrega

1.  **Refinement:** Lidero sesiones de grooming para identificar dependencias técnicas y riesgos tempranos.
2.  **Definition of Ready (DoR):** Ninguna historia entra al Sprint sin criterios de aceptación claros y activos de diseño (Figma/Wireframes).
3.  **Definition of Done (DoC):** Alineación total con los estándares de calidad, seguridad (OWASP) y performance.
4.  **Edge Case Management:** Identificación proactiva de flujos alternos y manejo de errores.

---

## 📝 Ejemplo de Referencia (Gold Standard)

**US-405: Autenticación Biométrica en Checkout**

**User Story:**
Como **Usuario Premium**, quiero **autenticar mi compra mediante FaceID/Huella**, para **finalizar la transacción sin ingresar contraseñas manualmente**.

**Criterios de Aceptación:**
* **Escenario: Compra exitosa con FaceID.**
    * **Dado que** el usuario tiene habilitada la biometría en su dispositivo.
    * **Cuando** presiona el botón "Pagar ahora".
    * **Entonces** el sistema debe invocar el SDK biométrico nativo y procesar el pago tras la validación exitosa.
* **Escenario: Fallo de autenticación.**
    * **Dado que** el sensor biométrico falla o el usuario cancela.
    * **Cuando** el sistema recibe el código de error del SO.
    * **Entonces** se debe mostrar el fallback de ingreso por PIN/Password.

**Restricciones:** No almacenar datos biométricos en servidores locales (Compliance de Privacidad).