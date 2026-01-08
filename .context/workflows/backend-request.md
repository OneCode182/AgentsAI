# Workflow: Solicitud de Requerimientos a Backend

Usa este formato cuando el usuario necesite definir un contrato de API.

1. **Analiza la Vista UI:** Revisa qué datos se muestran (ej. Placa, Estado).
2. **Consulta el Glosario:** Asegura que los campos JSON coincidan con `domain-glossary.md` (ej. usar `snake_case` para Python).
3. **Genera el Contrato:**
   - Endpoint sugerido (RESTful).
   - Estructura JSON de Respuesta (usando Zod schema como referencia).
   - Query Params para filtros.
4. **Output:** Genera un documento Markdown listo para enviar al desarrollador Backend.