# Organization Lifecycle

> Tenant structure: organizations, contracts, occupation permits.

## Epic: Organization CRUD — TEC-63

**Actor:** Property Administrator (Admin Inmobiliaria)

**Summary:** Organizations are the tenant entities that occupy units within a property — companies, families, or groups. An organization is the ownership boundary for user roles, invitations, and access policies.

**Core Stories:**

- Admin Inmobiliaria can create an organization within a property: name, NIT, organization type, contact info.
- Admin Inmobiliaria can list organizations with search, filter by property, and pagination.
- Admin Inmobiliaria can edit organization details and soft-delete if no active contracts exist.
- Each organization has a designated Unit Manager (Gestor de Unidad) who manages its occupants.

**Organization Types:** Company, family, government entity, mixed-use.

**Key Constraints:**

- `[DEFINED]` An organization belongs to exactly one property.
- `[DEFINED]` Deletion blocked while active contracts or active user roles exist.
- `[GENERAL]` Organization type is parameterizable.

---

## Epic: Contracts / Occupation Permits — TEC-73

**Actor:** Property Administrator

**Summary:** A contract binds an organization to one or more units within a property for a defined period. It governs parking allocation, access scope, and occupant capacity.

**Core Stories:**

- Admin Inmobiliaria can create a contract linking an organization to units with: start date, end date, parking unit assignments, occupant limit.
- Admin Inmobiliaria can view contract integrity — system flags issues like expired contracts, over-capacity, orphaned user roles.
- Contracts support temporal status: `future`, `active`, `expired`.
- Private parking units can only be assigned through a contract.
- Contract edit preserves audit trail.

**Key Constraints:**

- `[DEFINED]` A contract can only assign parking units of type "private" (privado).
- `[DEFINED]` Contract date range determines temporal status automatically.
- `[DEFINED]` Occupant count must not exceed contract-defined limit.
- `[RELATIVE]` When a contract expires, associated user roles remain but lose active access until a new contract covers them.
- `[GENERAL]` Contract integrity check runs on demand and surfaces: expired contracts with active user roles, units without coverage, parking over-allocation.

---

## Emphasis Line Summary

```
Property ──creates──▶ Organization ──bound-by──▶ Contract ──assigns──▶ Units + Parking
                                                     │
                                                     ▼
                                              Occupant capacity
                                              Validity period
                                              Access scope
```
