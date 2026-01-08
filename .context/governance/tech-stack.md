# Tech Stack

> I am the Law (Stack & Constraints). **Never ignore me.**

---

## Frontend (tecnipass-frontend)

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Remix (React Router v7) | 2.14.x |
| Language | TypeScript | 5.6.x |
| Runtime | Node.js | >= 20.0.0 |
| Build Tool | Vite | 5.4.x |
| Styling | Tailwind CSS | 3.4.x |
| UI Components | Radix UI | 1.x / 2.x |
| Forms | TanStack Form | 1.15.x |
| Tables | TanStack Table | 8.21.x |
| Data Fetching | TanStack Query | 5.83.x |
| Validation | Zod | 4.0.x |
| Real-time | Socket.io Client | 4.8.x |
| Linting | Biome | 1.9.x |
| Git Hooks | Husky + Commitlint | 9.x / 19.x |

---

## Backend (tecnipass-backend)

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Django + DRF | 5.2.x / 3.16.x |
| Language | Python | >= 3.13 |
| Auth | SimpleJWT | 5.5.x |
| ASGI Server | Uvicorn + Gunicorn | 0.34.x / 23.x |
| Real-time | python-socketio | 5.13.x |
| Cache | Redis (hiredis) | 6.x |
| Database | PostgreSQL (psycopg2) | - |
| Linting | Ruff | 0.12.x |
| Testing | Pytest + Factory Boy | 7.x / 3.x |

---

## Infrastructure

| Category | Technology |
|----------|------------|
| Cloud | AWS |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Real-time Protocol | WebSocket (Socket.io) |

---

## Coding Standards

### Frontend

- **Strict TypeScript**: `strict: true` in tsconfig.
- **Biome**: Must pass `biome check` before commit.
- **Conventional Commits**: Enforced via Commitlint.
- **No `any`**: Use proper types or `unknown`.
- **No inline styles**: Use Tailwind or CSS Modules.

### Backend

- **Ruff**: Must pass lint checks (E, W, F, I, B, DJ, UP, SIM).
- **Type Hints**: Required for all public functions.
- **Line Length**: Max 100 characters.
- **Migrations excluded**: From linting scope.

---

## Naming Conventions

| Type | Frontend | Backend |
|------|----------|---------|
| Files (Components) | PascalCase (`UserCard.tsx`) | - |
| Files (Utils) | kebab-case (`format-date.ts`) | snake_case (`format_date.py`) |
| Variables | camelCase | snake_case |
| Constants | SCREAMING_SNAKE | SCREAMING_SNAKE |
| Types/Interfaces | PascalCase | PascalCase (classes) |
| CSS Classes | kebab-case (Tailwind) | - |

---

## Forbidden Patterns

1. **No `console.log` in production** — Use proper logging.
2. **No hardcoded secrets** — Use `.env` files.
3. **No `// @ts-ignore` or `# type: ignore`** — Fix the type issue.
4. **No `var` (JS) or mutable globals (Python)** — Use `const`/`let` or proper scoping.
5. **No raw SQL concatenation** — Use ORM or parameterized queries.
6. **No nested callbacks** — Use async/await.

---

## Required Patterns

1. **Error Handling**: Try/catch in async code, proper HTTP error responses.
2. **Loading States**: Always show loading indicators in UI.
3. **Input Validation**: Zod on frontend, DRF Serializers on backend.
4. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation.
5. **Responsive Design**: Mobile-first approach.

---

## Security Rules

1. **HTTPS only** — No HTTP in production.
2. **JWT expiration** — Short-lived access tokens, refresh rotation.
3. **CORS whitelist** — Only allowed origins.
4. **Rate limiting** — On all public endpoints.
5. **Input sanitization** — Prevent XSS and injection attacks.

---

## Testing Requirements

| Layer | Coverage Target | Tool |
|-------|-----------------|------|
| Frontend Unit | 70% | Vitest (TBD) |
| Backend Unit | 80% | Pytest |
| Integration | Critical paths | Pytest + Factory Boy |
| E2E | Happy paths | Playwright (TBD) |

---

*This stack definition is non-negotiable. All code must comply.*
