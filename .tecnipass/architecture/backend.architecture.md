---
name: backend-architecture
description: Monorepo workspace scaffolding, modular Domain-Driven Design (DDD) layers, file naming conventions, and technology guidelines for the NestJS backend.
---

# Backend Architecture & Modular DDD Specification

This document details the monorepo workspace scaffolding, Domain-Driven Design (DDD) layers, coding conventions, and technological guidelines for the TecniPass backend. It acts as the single source of truth for writing consistent, decoupled NestJS code.

## Rules & Guidelines

### 1. Monorepo Workspace Structure
The backend is a Turborepo monorepo. The directory layout of the repository is organized as follows:

```
.
├── apps/                 # Monorepo active applications
│   ├── api/              # Core API Gateway and business logic orchestrator (NestJS)
│   │   └── src/          # API source code
│   │       ├── app/      # NestJS root application module setup
│   │       ├── drizzle/  # Database connection and ORM configurations
│   │       ├── features/ # Business domains following DDD structure
│   │       │   └── {name}/
│   │       │       ├── domain/       # Pure business domain entities & interfaces
│   │       │       ├── application/  # Use cases and command/query handlers
│   │       │       ├── infra/        # Controllers, database models, adapters
│   │       │       └── {name}.module.ts
│   │       └── main.ts   # Entry point of NestJS API gateway
│   ├── notification-service/  # Worker for asynchronous mail/jobs (BullMQ)
│   ├── signature/        # Digital signature processing service
│   └── device-manager/   # Local building physical hardware controller
├── packages/             # Shared local packages across apps
│   ├── biometric-core/   # Common contracts and event types for biometrics
│   ├── biostar-adapter/  # Suprema BioStar hardware adapter package
│   ├── logger/           # Core logging package for standardized stdout
│   ├── redis-client/     # Type-safe Redis client wrapper
│   └── utility/          # Standard utility classes (e.g., Result monad)
├── docker-compose.yml    # Development infrastructure environment orchestrator
├── pnpm-workspace.yaml   # Workspace monorepo definitions for PNPM
├── package.json          # Root scripts and monorepo configurations
└── turbo.json            # Turborepo task pipeline execution configurations
```

### 2. Feature Scaffolding (Domain-Driven Design)
Within `/apps/api/src/features/`, each business module must follow a strict 3-tier DDD structure to decouple business logic from framework and infrastructure details:
- `domain/`: Pure business rules. Contains Aggregates, Entities, Value Objects, and Repository Interfaces. **Never import third-party frameworks, NestJS modules, or database ORM models in this directory.**
- `application/`: Application orchestration. Contains Use Cases, Commands, Queries, and DTOs. Translates user intents into domain actions.
- `infra/`: Framework, persistence, and external adapters. Subdivided into:
  - `http/`: REST controllers (`*.rest-controller.ts`) and validation schemas (`*.rest-schema.ts`).
  - `schemas/`: Drizzle database models (`*.schema.ts`).
  - `adapters/`: Concrete implementations of repository interfaces defined in the domain layer.
  - `services/`/`guards/`/`middleware/`: NestJS specific services, authorization guards, and custom middlewares.
- **Root Module**: `/apps/api/src/features/{feature-name}/{feature-name}.module.ts` binds domain interfaces to infra implementations and registers providers.

### 3. File Naming Conventions
- **Feature Modules**: Lowercase kebab-case folder (e.g., `access-control/`). Module file: `{feature-name}.module.ts`.
- **Controllers**: `{name}.rest-controller.ts` (REST endpoints).
- **Validation**: `{name}.rest-schema.ts` (Zod or class-validator schemas).
- **Database Schemas**: `{name}.schema.ts` (Drizzle model).
- **Use Cases**: `{action-name}.use-case.ts`.
- **Services/Adapters**: `{name}.service.ts` or `{name}.repository.ts`.
- **General Files**: Lowercase kebab-case for all files and directories.

### 4. Coding Standards & Conventions
- **Dependency Inversion**: Controllers and Use Cases must depend on interfaces (from the `domain/` layer). Use NestJS provider registration to inject concrete classes:
  ```typescript
  { provide: IPropertyRepository, useClass: DrizzlePropertyRepository }
  ```
- **Database Access**: Database operations are strictly isolated inside Repository classes inside `infra/adapters/` utilizing **Drizzle ORM**. Raw queries or direct DB access inside use cases or controllers are forbidden.
- **Error Handling**: Use the monadic `Result<T, Error>` pattern from `@tecnipass/utility` to propagate errors from domain/use-cases. Do not throw HTTP exceptions at the domain layer; map `Result` failures to HTTP status codes at the controller level.
- **Task Queuing**: Asynchronous or heavy tasks (emails, batch syncing) must be queued using **BullMQ** on Redis. Ensure workers are isolated from the main API thread.

---

## Developer Workflow

### 1. Adding a New Feature / Module
1. Create folder `apps/api/src/features/{new-feature}/`.
2. Define Domain Entities and Repository interfaces under `domain/`.
3. Implement business Use Cases under `application/`.
4. Create Drizzle schemas, concrete repository adapters, and REST controllers under `infra/`.
5. Create `{new-feature}.module.ts` and declare controllers, providers, and exports.
6. Import the new module into `AppModule` (`apps/api/src/app/app.module.ts`).

### 2. Creating a Database Migration
1. Define the Drizzle schema in `infra/schemas/{table-name}.schema.ts`.
2. Run database migration generation command:
   ```bash
   pnpm db:generate
   ```
3. Apply migrations locally or to staging using:
   ```bash
   pnpm db:migrate
   ```

