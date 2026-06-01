# Business Rules Index

> Consolidated reference of all business rules across TecniPass.
> Tags: `[DEFINED]` = absolute/invariant, `[RELATIVE]` = context-dependent, `[GENERAL]` = cross-cutting convention.

---

## DEFINED Rules (Invariant)

These rules must hold true under all circumstances. Violations are system errors.

### Identity & Uniqueness

| ID | Rule | Source |
|---|---|---|
| D-01 | Person uniqueness: no duplicate combination of identification type + identification number | TEC-43, TEC-24 |
| D-02 | Property short name must be unique system-wide | TEC-16 |
| D-03 | Email must be unique across all system users | TEC-68 |
| D-04 | Permission slugs are the canonical authorization tokens — no freeform checks | TEC-11 |

### Lifecycle & Deletion

| ID | Rule | Source |
|---|---|---|
| D-05 | Property deletion is soft — record persists with inactive flag | TEC-16 |
| D-06 | Organization deletion blocked while active contracts or user roles exist | TEC-63 |
| D-07 | Activation link is single-use and time-bound | TEC-77 |

### Access & Authorization

| ID | Rule | Source |
|---|---|---|
| D-08 | Facial capture must verify liveness — real person, real-time photo | TEC-77 |
| D-09 | Double verification flag requires both face + ID document | TEC-77 |
| D-10 | Admin TecniPass can only manage user roles whose `createdById` matches their user ID | TEC-24 |
| D-11 | QR code encodes invitation ID; validated against server state | TEC-90 |
| D-12 | Movements are append-only — no edits or deletions | TEC-463 |
| D-13 | Walk-in registration requires real-time authorization from receiving occupant | TEC-43 |

### Data Integrity

| ID | Rule | Source |
|---|---|---|
| D-14 | Contract can only assign parking units of type "private" | TEC-73 |
| D-15 | Occupant count must not exceed contract-defined limit | TEC-73 |
| D-16 | A unit belongs to exactly one property | TEC-17 |
| D-17 | A zone belongs to exactly one property | TEC-63 |
| D-18 | A user role belongs to exactly one organization within one property | TEC-24 |
| D-19 | Each device belongs to exactly one property | TEC-125 |
| D-20 | New permission slugs must be registered in both frontend enum and backend seed | TEC-11 |

---

## RELATIVE Rules (Context-Dependent)

These rules depend on configuration, temporal state, or user context.

| ID | Rule | Context | Source |
|---|---|---|---|
| R-01 | Unit assignment to organizations governed by contract validity dates | Active contract required | TEC-17 |
| R-02 | Zone access inherited through user-role zone assignments | Zone scoping | TEC-63 |
| R-03 | Auth capabilities (QR, facial) configured per user role | User role settings | TEC-24 |
| R-04 | Zone + unit assignments scope where person can access | Property topology | TEC-24 |
| R-05 | Expired contract: user roles remain but lose active access | Temporal state | TEC-73 |
| R-06 | Parking on invitation only if organization has parking via contract | Contract scope | TEC-90 |
| R-07 | Face and document capture requirements vary by property policy | Property config | TEC-43 |
| R-08 | Vehicle registration shown only if user role has parking allocation | User role context | TEC-77 |
| R-09 | `facialRegistrationAllowed` flag controls face step visibility | User role flag | TEC-77 |
| R-10 | Alert severity escalates based on time thresholds per property | Property config | TEC-463 |
| R-11 | Parking snapshot reflects real-time occupancy from movement events | Live state | TEC-463 |
| R-12 | Meeting creation gated by `canCreateMeetings` user role setting | User role settings | TEC-90 |
| R-13 | Home view determined by active user role's permissions | Session context | TEC-117 |
| R-14 | Device zone assignment determines which user-role zone scopes grant passage | Device + zone config | TEC-125 |
| R-15 | Vehicle type must be compatible with parking unit vehicle type | Parking config | TEC-425 |

---

## GENERAL Rules (Cross-Cutting)

These are conventions that apply across the entire system.

| ID | Rule | Source |
|---|---|---|
| G-01 | All dropdown/select options are system-configurable, not enum-locked | TEC-16, TEC-125 |
| G-02 | All entities carry audit fields: `createdBy`, `createdAt`, `updatedBy`, `updatedAt` | TEC-16 |
| G-03 | Adding a parameter value must not require code deployment | TEC-125 |
| G-04 | Reception flow must work in degraded mode — offline fallback with later sync | TEC-43 |
| G-05 | Dashboard uses WebSocket (Socket.IO) for real-time updates | TEC-463 |
| G-06 | All user-facing flows must be functional on mobile (375px+) | TEC-127 |
| G-07 | Reception and doorman views optimized for tablet (768px+) | TEC-127 |
| G-08 | QR code display must be full-screen capable for device scanning | TEC-127 |
| G-09 | Do not invent permission slugs — check existing enum first | TEC-11 |
| G-10 | Contract integrity check surfaces: expired contracts with active roles, uncovered units, parking over-allocation | TEC-73 |
| G-11 | Digital signature is drawn-on-screen capture stored as image | TEC-43 |
| G-12 | Device health monitored via heartbeat; offline triggers operational alerts | TEC-125 |
| G-13 | Session payload includes full permission array for active user role | TEC-493 |
| G-14 | Role switch updates session permissions without full re-auth | TEC-493 |
