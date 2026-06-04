# Estado de los Módulos del Proyecto (Module Status)

> Este documento detalla el estado actual de implementación, cobertura de pruebas e incidencias abiertas para cada uno de los módulos y flujos del sistema de TecniPass.

---

## Estado General del Desarrollo

| Módulo / Feature | Estado | Responsable | Observaciones / Estado de Integración |
|---|---|---|---|
| **Recepción (Reception)** | En Desarrollo Activo | Sergio Silva | Flujo responsivo móvil terminado; Firma en tablet de recepción en progreso. |
| **Roles e IAM** | Estable | Tomás Panqueva | Sistema RBAC funcionando; Integrado con script de sincronización de seed-roles. |
| **Notificaciones** | Estable | Tomás Panqueva | Servicio de notificaciones por colas operativo en backend. |
| **Reuniones (Meetings)** | Estable | Tomás Panqueva | Añadido recientemente el contexto de organizaciones y código QR de acceso rápido. |
| **Portafolio (Portfolio)** | Inicial | Ambos | Solo documentación de especificación técnica y bocetos de base de datos. |
| **Firma Digital (Signature)**| En Desarrollo Activo | Tomás Panqueva | Nuevo microservicio `apps/signature` en proceso de andamiaje (scaffolding). |
| **Feedback** | En Desarrollo Activo | Sergio Silva | Refactorización de DTOs en curso para coincidir con el contrato de la API. |
| **Employee Registration** | Estable | Sergio Silva | Flujos de `PendingApproval` y `PendingRegistration` completamente implementados. |
| **Quick Invitation** | Estable | Sergio Silva | Flujo funcional con soporte para variantes `continue` y `employeedata`. |
| **SonarQube Quality** | En Desarrollo Activo | Sergio Silva | Server on-prem (Windows 11, puerto 9005, **Community Edition**). Self-hosted runner instalado y conectado. **Frontend**: pipeline auditado y endurecido (precheck de prerequisitos, mask de PR vars para Community Edition, pnpm install, timeout/concurrency), 8 commits atómicos en rama `ci/sonarqube`, listo para review/push humano. Plantilla reutilizable en `patterns.md` §8. **Backend**: pendiente (T4) — replicar plantilla. Pendiente global: configurar GitHub Secrets (`SONAR_TOKEN`, `SONAR_HOST_URL`). |
| **Mobile / Responsive** | En Desarrollo Activo | Sergio Silva | Diseño responsivo e interfaces adaptativas en flujos de recepción clave. |

---

## Cobertura de Pruebas y Deuda Técnica (Quality Overview)

- **Frontend**: Formateo por Biome al 100%. TypeScript estricto. Pruebas unitarias de componentes de UI pendientes de planificar.
- **Backend (API)**: Pruebas unitarias para Casos de Uso críticos al 75%. Integración con SonarQube activa.
- **Microservicio de Firma**: Scaffolding inicial con NestJS. Planificando cobertura de pruebas unitarias y de integración de firma biométrica.
