# TecniPass Project Context

> Single source of truth for TecniPass business context, technical stack, repository conventions, and core product modules.

## 1. Business Context
TecniPass is an access control and visitor management system for residential and corporate buildings.

It supports:
- invitations;
- authorization workflows;
- reception check-in and check-out;
- visitor and employee registration;
- mobile and web flows;
- digital document signatures;
- facial and document capture flows.

## 2. Development Ownership
- Backend and architecture ownership: NestJS, database, services, and backend contracts.
- Frontend ownership: Remix, UI/UX, routes, forms, and user flows.

Agents must not infer ownership as permission to change a domain. Follow the current human request and task scope.

## 3. Technical Stack

### Frontend
- Framework: React / Remix with SSR and nested routing.
- Language: TypeScript.
- Styling: Tailwind CSS, responsive mobile-first design.
- Data and forms: TanStack Query and TanStack Form.
- Lint and format: Biome and project-specific linting.
- Icons: project-standard icon libraries.

### Backend
- Framework: NestJS.
- Language: TypeScript.
- Architecture: modular features, use cases, DTOs, and service boundaries.
- Database: PostgreSQL.
- Cache and queues: Redis.
- File storage: MinIO / S3-compatible storage.
- Local development: Docker and Docker Compose.

## 4. Repository Structure
The main product workspaces are resolved through `env.json`.

Expected areas:
- frontend application routes, shared components, hooks, validators, and UI modules;
- backend feature modules, controllers, use cases, DTOs, repositories, and tests;
- harness documentation under `.tecnipass`.

Technical autoskills live under `skills/autoskills/`. They are installed by autoskill and provide stack-context guidance for frameworks, tools, design patterns, SOLID-style practices, testing, accessibility, and best practices. Agents should load the matching autoskill when it improves implementation or validation quality, especially for code construction and testing tasks.

Use environment-resolved paths instead of hardcoded machine paths.

## 5. Core Product Modules

| Module | Responsibility |
|---|---|
| Reception | Tablet/mobile visitor registration, invitation confirmation, access control, and policy signatures. |
| IAM and Roles | Administrative users, guards, residents, permissions, and access scopes. |
| Meetings | Meeting scheduling, invitation links, and QR flows. |
| Notifications | Email, SMS, push, and operational alerts. |
| Portfolio | Properties, offices, organizations, and related management views. |
| Signature | Digital signature capture and verification. |
| Feedback | Service feedback and issue reporting from reception surfaces. |

## 6. RBAC Slug Convention
Permissions use compact slugs in the form:

```text
action:resource:scope
```

Common action aliases:
- `c`: create
- `r`: read
- `u`: update
- `d`: delete

Examples:
- `c:p:g`: create property at general scope.
- `r:u-r:o-a`: read user roles at organization-admin scope.
- `u:v:p`: update visitor personal information.

Do not invent permission slugs without checking existing backend/frontend permission usage.

## 7. Project Management
- Ticket format: `TEC-XXX`.
- Non-trivial work should be tied to a ticket, spec, task, or documented product area.
- If no ticket exists, use an area-based task ID such as `reception/invitation-flow` or `harness/orchestration-protocol`.
