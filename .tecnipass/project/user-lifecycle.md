# User Lifecycle

> People, user roles, account activation, auth capabilities, settings.

## Epic: User Role Management — TEC-24

**Actor:** Admin TecniPass, Property Administrator, Unit Manager (Gestor de Unidad)

**Summary:** A user role is the central identity record that binds a person to an organization within a property, with a specific role, permissions, zones, units, and auth capabilities. It is the primary authorization entity in TecniPass.

**Core Stories:**

- Admin TecniPass can create user roles for any organization they own the registration of.
- Admin TecniPass can only view/edit/delete user roles whose registration they created.
- Unit Manager can create user roles within their organization.
- User role creation requires: person (identification type + number + name), role assignment, organization, position, unit assignments, zone assignments.
- User roles carry auth capabilities: QR access, facial recognition, document requirements.
- User roles carry settings: communication preferences (email, WhatsApp, SMS), notification preferences (visitor entry/exit, parking entry/exit, reservation expiring), meeting creation permission.
- User roles support vehicle registration with plate number and vehicle type.
- Batch import of user roles via file upload.
- User role status: `pending`, `active`, `inactive`.

**Key Constraints:**

- `[DEFINED]` Person uniqueness: the system must not allow duplicate combination of identification type + identification number.
- `[DEFINED]` Admin TecniPass can only manage user roles whose `createdById` matches their own user ID.
- `[DEFINED]` A user role belongs to exactly one organization within one property.
- `[RELATIVE]` Auth capabilities (QR, facial) are configured per user role and determine which access methods the person can use at devices.
- `[RELATIVE]` Zone and unit assignments scope where the person can access within the property.
- `[GENERAL]` Registration status transitions: `pending` → `active` (after account activation) → `inactive` (manual or contract expiry).

---

## Epic: Admin TecniPass User Creation — TEC-68

**Actor:** Super Administrator

**Summary:** Bootstrap flow for creating the first administrative user for the TecniPass platform. This is the system-level user who then creates properties, organizations, and downstream user roles.

**Core Stories:**

- Super Admin can create an Admin TecniPass user with email, identification, and initial role.
- Admin TecniPass receives account activation email.

**Key Constraints:**

- `[DEFINED]` Only super-admin level can create Admin TecniPass users.
- `[DEFINED]` Email must be unique across all system users.

---

## Epic: Account Activation — TEC-77

**Actor:** Any user with a pending user role (occupant, admin, visitor with account)

**Summary:** Self-service flow where a person completes their profile after receiving an activation link. Includes identity verification, facial registration, vehicle registration, and password creation.

**Activation Steps (conditional):**

1. **Identity documents** — capture front/back of ID document (required if `needsIdentityDocuments`).
2. **Facial registration** — live selfie capture with liveness detection (required if `needsFace`).
3. **Vehicle registration** — plate number + vehicle type (required if `needsVehicles`).
4. **Password creation** — set account password (required if `requiresPassword`).
5. **Privacy policy acceptance** — terms and data treatment consent.

**Email Cases** (determine which steps are required):

| Case | Face | ID Docs | Vehicles |
|---|---|---|---|
| `FACE_AND_ID_REQUIRED` | Yes | Yes | If parking |
| `FACE_ONLY_REQUIRED` | Yes | No | If parking |
| `ID_ONLY_REQUIRED` | No | Yes | If parking |
| `VEHICLES_ONLY` | No | No | Yes |
| `NO_ACTION_REQUIRED` | No | No | No |

**Key Constraints:**

- `[DEFINED]` Facial capture must verify the photo is of a real person taken in real time (liveness detection).
- `[DEFINED]` Double verification flag requires both face + ID document.
- `[DEFINED]` Activation link is single-use and time-bound.
- `[RELATIVE]` Vehicle registration shown only if the user role has parking allocation.
- `[RELATIVE]` `facialRegistrationAllowed` flag on user role controls whether face step appears.

---

## Epic: Authorization Views — TEC-84 / TEC-189

**Actor:** Property Administrator, Unit Manager

**Summary:** Read-only views showing who is currently authorized to access the property — aggregating active user roles and active invitations into a unified authorization list.

**Core Stories:**

- Admin can view all currently authorized persons with: name, organization, source (user role vs invitation), validity period.
- Admin can filter by: organization, authorization source, temporal status (current, future, expired).
- View includes vehicle authorization count.

**Key Constraints:**

- `[DEFINED]` Authorization view is read-only — modifications happen through user role or invitation management.
- `[RELATIVE]` Temporal filtering uses contract and invitation validity dates.

---

## Emphasis Line Summary

```
Person ──assigned──▶ User Role ──within──▶ Organization @ Property
                        │
                        ├── Auth Capabilities (QR, Face)
                        ├── Zone + Unit Scope
                        ├── Communication Settings
                        ├── Notification Preferences
                        ├── Vehicles
                        └── Registration Status
                              │
                              ▼
                        Account Activation
                        (ID docs → Face → Vehicles → Password → Privacy)
```
