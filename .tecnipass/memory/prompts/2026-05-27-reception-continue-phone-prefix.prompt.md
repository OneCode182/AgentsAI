---
date: 2026-05-27
short_name: reception-continue-phone-prefix
prompt_type: bugfix
status: reference
source: human
related_task: none
related_session: none
related_spec: none
execution_decision: reference-only
---

# Prompt: Reception Continue Registration Phone Prefix

## Description
Reference prompt for a reception bug where continuing an invitation registration duplicates the country code in the contact number field.

## Original Prompt

````md
## Problematica


Desde recepcion, esta el caso de un registro:
- Usuario tipo Invitado/Visitante
- Estado de registro: Pendiente Registro

Estos registros, en el detalle de alert tienen una opcion "Continuar registro"

Esto redirige a la ruta `/reception/invitation` 
Con parametros:
- `mode=continue`
- `invitationId={invitationId}`

Ejemplo
```
/reception/invitation?mode=continue&invitationId=xdnfztd3tnw5o62t13ea3t4b
```


El problema esta en que 
- Al momento de rellenar el campo "Número de contacto", se rellena con codigo y todo

Ejemplo
- Codigo de pais es 57 (colombia)
- El input tiene actualmente este codigo ya diligenciado, pero el autocompletado en el formulario, hace que esto se duplique
- No deberia ser asi


---
## Propuesta de Solución

1. Entiende tu Rol y Skills adecuadas al negocio
2. Entiende el contexto y reglas de negocio
3. Identifica el problema
4. Disena una solucion para mejorar este problema
5. Implementa
6. Testea
7. Verifica que se soluciono

> Deben ser cambios quirurjicos, y no deben romper funcionalidad actual

> Importante: Justo despues de terminar el flujo principal, debes revisar la calidad de codigo con las skills de `biome` y `sonar` (Seccion "Skills adicionales")
```
````

## Extracted Routing Metadata

- Product area: reception
- Routes or endpoints: `/reception/invitation`
- User roles: invited visitor
- Business states: pending registration, continue registration
- Technical surface: phone/contact field prefill, query params `mode=continue`, `invitationId`
- Requested skills: biome, sonar
- Explicit constraints: surgical changes, do not break current functionality

## Similarity Search

- Search terms: `/reception/invitation`, `mode=continue`, `invitationId`, `Número de contacto`, country code, phone prefix, pending registration
- Similar prompts found: not searched in this reference archive
- Similar sessions found: not searched in this reference archive
- Similar tasks found: not searched in this reference archive

## Routing Decision

- Decision: reference-only
- Rationale: archived as an example of the prompt shape the harness must support.
- Workflow: `workflows/prompt-intake.workflow.md` then `workflows/init-session.workflow.md`
- Primary agent: `agents/orchestrator.agent.md`
- Supporting agents: `agents/frontend.agent.md`, `agents/qa.agent.md`, `agents/reviewer.agent.md`
- Skills to load: `skills/biome-linting/SKILL.md`, `skills/sonar-linting/SKILL.md`, relevant frontend/autoskills only as needed
- Validation expectations: format/type/lint/Sonar and targeted functional verification

## Notes
- This file is not an active task.
