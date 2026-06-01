# Cross-Cutting Modules

> Modules that span multiple emphasis lines: home views, auth, parking, meetings, mobile, global config.

## Epic: Home Per Profile — TEC-117

**Actor:** All authenticated users

**Summary:** After login, each user lands on a role-appropriate home view. The system supports 9 distinct profiles, each with its own dashboard layout, navigation, and data scope.

**Profiles:**

| Profile | Primary View |
|---|---|
| Admin TecniPass | System-wide property + organization overview |
| Admin Inmobiliaria | Property-scoped management dashboard |
| Gestor de Unidad | Organization-scoped occupant + invitation management |
| Ocupante | Personal invitations, meetings, QR code, settings |
| Visitante | Invitation status, QR code |
| Portero (Doorman) | Doorman dashboard — movements, search, alerts |
| Recepcionista | Reception tablet — check-in/check-out flow |
| Cajero | Parking billing (future scope) |
| Gerente | Analytics and reporting (future scope) |

**Key Constraints:**

- `[DEFINED]` Home view is determined by the active user role's assigned role + permissions.
- `[DEFINED]` Users with multiple user roles see a role-switcher to select active context.
- `[RELATIVE]` Available navigation items are filtered by permission set.

---

## Epic: Authentication & Login — TEC-493

**Actor:** All users

**Summary:** Standard email + password authentication with session management. Supports role switching for users with multiple user roles across properties.

**Core Stories:**

- User logs in with email + password.
- Session returns: user, person, active user role, permissions, available user roles.
- User can switch active user role without re-authenticating.
- Session has configurable expiry (`sessionExpiresInMs`).
- Password recovery flow: request reset → email link → set new password.

**Key Constraints:**

- `[DEFINED]` Session payload includes full permission array for the active user role.
- `[DEFINED]` Role switch updates session permissions without full re-auth.
- `[GENERAL]` All auth endpoints return consistent `AuthMeResponse` shape.

---

## Epic: Meetings — TEC-90 (sub-scope)

**Actor:** Occupant (with `canCreateMeetings` setting enabled)

**Summary:** Meeting scheduling with automatic invitation generation. A meeting creates invitations for all attendees with a shared time window.

**Core Stories:**

- Occupant can create a meeting with: title, date, start/end time, attendees (existing contacts or new).
- Meeting creation auto-generates invitations for each attendee.
- Meeting detail shows attendee confirmation status.

**Key Constraints:**

- `[RELATIVE]` Meeting creation gated by `canCreateMeetings` flag in user role settings.
- `[RELATIVE]` Meeting invitations follow the same invitation lifecycle as standalone invitations.

---

## Epic: Parking — TEC-425

**Actor:** Occupant, Doorman, Property Administrator

**Summary:** Parking management covering unit allocation, vehicle registration, and real-time occupancy tracking.

**Core Stories:**

- Parking units are created as unit type `parking` with: vehicle type, capacity, floor, has duplicator, is for disabled.
- Parking units are assigned to organizations via contracts (private) or available for visitor use (public).
- Vehicle registration is part of user role and invitation flows.
- Doorman dashboard shows parking snapshot: capacity vs current occupancy per unit.
- Future scope: parking reservation system, visitor parking billing.

**Key Constraints:**

- `[DEFINED]` Only private parking units can be assigned through contracts.
- `[DEFINED]` Vehicle type must be compatible with parking unit vehicle type.
- `[RELATIVE]` Visitor parking availability message shown during account activation if property has visitor parking.

---

## Epic: Global System Configuration — TEC-125

**Actor:** Admin TecniPass

**Summary:** System-level configuration for parameterizable values: property types, unit types, identification types, vehicle types, and other dropdown options.

**Core Stories:**

- Admin can manage parameter catalogs used across the system.
- Parameters are referenced by entities via ID, not hardcoded strings.

**Key Constraints:**

- `[GENERAL]` All selection fields must resolve to configurable parameter records.
- `[GENERAL]` Adding a new parameter value must not require code deployment.

---

## Epic: Mobile Design — TEC-127

**Actor:** All mobile users

**Summary:** Responsive mobile-first design for key flows: account activation, QR display, invitation management, and doorman operations.

**Key Constraints:**

- `[GENERAL]` All user-facing flows must be functional on mobile viewport (375px+).
- `[GENERAL]` Reception and doorman views optimized for tablet (768px+).
- `[GENERAL]` QR code display must be full-screen capable for device scanning.
