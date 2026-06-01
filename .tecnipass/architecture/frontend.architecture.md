---
name: frontend-architecture
description: Structural conventions, scaffolding patterns, naming rules, and technology dependencies for the Remix / React frontend application.
---

# Frontend Architecture & Development Specification

This document defines the structural conventions, coding guidelines, and scaffolding patterns for the TecniPass frontend application. It is optimized to help AI systems write consistent, decoupled, and maintainable UI code.

## Rules & Guidelines

### 1. Project Directory Scaffolding & Component Placement
All frontend code follows a clean, decoupled structure. The directory layout of the repository is organized as follows:

```
.
├── app/                  # Main Remix application directory
│   ├── routes/           # Remix flat-folder routing layer
│   │   └── {route}/      # Route folder with route.tsx, loader.ts, components/ etc.
│   ├── shared/           # Reusable shared core modules
│   │   ├── components/   # Modular global UI widgets (folders with component, css, index)
│   │   ├── hooks/        # Domain-specific and general React hooks
│   │   ├── services/     # API request clients and HTTP handlers (Axios wrappers)
│   │   ├── lib/          # External library configurations and initializers
│   │   ├── context/      # React context providers for global state
│   │   ├── types/        # TypeScript interfaces and API schemas
│   │   ├── styles/       # Tailwind CSS setups and global styles
│   │   └── stores/       # Client-side state management (e.g. Zustand)
│   ├── entry.client.tsx  # Remix client-side entry point
│   ├── entry.server.tsx  # Remix server-side entry point (SSR)
│   ├── root.tsx          # Remix root application layout
│   └── tailwind.css      # Core Tailwind CSS file
├── public/               # Static assets (images, icons, manifest)
├── tests/                # Playwright end-to-end (E2E) testing suite
├── biome.json            # Biome linter and formatter configuration
├── tailwind.config.ts    # Tailwind CSS layout configuration
├── vite.config.ts        # Vite build tool and Remix plugin configuration
└── package.json          # Dependency manifest and pnpm scripts
```

**Key Component Placement Rules**:
- **Route-Specific Components**: If a component is exclusive to a single route and is not reused anywhere else, it **must** be created adjacent to or within that route's directory hierarchy under `/app/routes/`. Do not pollute the shared folder with page-specific layouts.
- **Shared Components**: If a component is reused across multiple routes or features, it **must** be created in `/app/shared/components/`.
### 2. Folder Structures & Component Scaffolding

#### A. Shared Components Folder Structure (`/app/shared/components/`)
Any shared UI component must be modularized inside its own folder. Do not place raw `.tsx` files directly in `/app/shared/components/`.
- **Folder Structure**:
  ```
  /app/shared/components/{component-name}/
  ├── {component-name}.tsx
  ├── {component-name}.module.css
  └── index.tsx
  ```
- **Exporting**: The `index.tsx` file must act as the clean export gateway:
  ```typescript
  export { default } from './{component-name}';
  ```
- **Styling**: Styles specific to a component must reside inside `{component-name}.module.css` using Vanilla CSS, imported as `classes` inside the `.tsx` component. Ad-hoc Tailwind utility overrides are allowed only when necessary.
- **Example**:
  ```
  /app/shared/components/backward-button/
  ├── backward-button.tsx
  ├── backward-button.module.css
  └── index.tsx
  ```

#### B. Route Components Folder Structure (`/app/routes/`)
Routes use the Remix v2 flat-folder structure. If a route requires specific components, helpers, context, or constants that are not shared elsewhere, create subfolders inside that route's folder to keep them localized:
- **Folder Structure**:
  ```
  /app/routes/{flat-route-name}/
  ├── route.tsx (Main Page Layout & Entry Point)
  ├── loader.ts (Page Server Loaders)
  ├── meta.ts (Page SEO Metadata)
  ├── components/ (Route-Specific UI Components)
  ├── context/ (Route-Specific State Providers)
  ├── utils/ (Route-Specific Helper Utilities)
  └── constants/ (Route-Specific Constants)
  ```
- **Example**:
  For the reception invitation route (`/app/routes/_home.reception.invitation`):
  ```
  /app/routes/_home.reception.invitation/
  ├── route.tsx
  ├── loader.ts
  ├── components/
  │   ├── invitation-form.tsx
  │   └── signature-dialog.tsx
  ├── context/
  │   └── invitation-wizard.context.tsx
  └── utils/
      └── format-payload.ts
  ```

### 3. File & Directory Naming Conventions
- **Directories**: Always use lowercase kebab-case (e.g., `action-dialog`, `user-roles`).
- **Components (.tsx)**: Lowercase kebab-case (e.g., `mobile-pagination.tsx`, `backward-button.tsx`).
- **Hooks (.ts)**: camelCase prefixed with `use` (e.g., `useSignatureSync.ts`, `useAuth.ts`).
- **Services/Libraries/Types (.ts)**: camelCase or lowercase kebab-case (e.g., `invitations.ts`, `api-client.ts`).
- **Routes (.tsx)**: Remix routing conventions under `/app/routes/` (e.g., `dashboard._index.tsx` or `auth.login.tsx`).

### 4. Coding Standards, SOLID Principles & Best Practices
Always apply clean scaffolding, established design patterns, and SOLID principles:
- **Single Responsibility Principle (SRP)**: Each component, hook, or service must do exactly one thing. Decouple rendering (component), state management (Zustand/Context Providers), validation (TanStack Form), and data fetching (custom hooks calling services).
- **Open/Closed Principle (OCP)**: Design components to be extensible without editing their internal code (e.g., using React `children` props or render props).
- **Liskov Substitution Principle (LSP)**: Custom controls (buttons, inputs) must extend native HTML element attributes (e.g., `React.InputHTMLAttributes<HTMLInputElement>`) so they can be drop-in replacements.
- **Interface Segregation Principle (ISP)**: Components must only request the minimal set of props they require. Avoid passing large context/data objects if the component only uses one or two fields.
- **Dependency Inversion Principle (DIP)**: UI components must depend on service interfaces or custom query hooks, never on concrete network clients or raw axios calls directly.
- **Data Fetching**: Never perform direct fetch calls in rendering components. Wrap all API requests inside Services, and execute them using **TanStack Query** (`useQuery` / `useMutation`) wrapped in a custom Hook inside `shared/hooks/`.
- **Forms & Inputs**: Handle user input, validation, and submission states using **TanStack Form**.
- **Type Safety**: Avoid using `any`. Create interfaces under `shared/types/` for all network request/response models.
- **Icons**: Utilize the `iconsax-react` library. Do not import raw SVGs directly unless custom branding is required.
- **Linter & Formatter**: The codebase uses **Biome**. Ensure all code is formatted using `pnpm format` and validated with `pnpm lint` before pushing changes.

---

## Developer Workflow

### 1. Creating a New UI Component
1. Create `/app/shared/components/{new-component}/`.
2. Add `{new-component}.tsx` with a default export, typing the component props explicitly.
3. Add `{new-component}.module.css` for styling and import it in the component file.
4. Export the component via `index.tsx`.

### 2. Implementing API Integrations
1. Define TypeScript interface types in `/app/shared/types/`.
2. Implement service calls in `/app/shared/services/` using the Axios instance from `lib/`.
3. Wrap the service in a custom query hook inside `/app/shared/hooks/`.
4. Import and execute the custom hook inside the route page or component.

### 3. Adding a New Route
1. Define the file path inside `/app/routes/` matching Remix nested routing design.
2. Separate the page UI layout from the loaders/actions logic. Move heavy UI sub-components into `shared/components/` if they are reusable.

