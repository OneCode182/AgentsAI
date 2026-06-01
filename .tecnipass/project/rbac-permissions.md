# RBAC & Permissions

> Role-based access control model, permission slug convention, scope hierarchy.

## Epic: Roles & Permissions — TEC-11 / TEC-218

**Actor:** Admin TecniPass, Property Administrator

**Summary:** TecniPass uses a compact slug-based RBAC system. Roles are collections of permissions assigned to user roles. Permissions govern every UI route and API endpoint.

**Core Stories:**

- Admin can create custom roles with a name, description, and permission set.
- Admin can assign a role to a user role during creation or edit.
- Permissions are enforced at both frontend (route guards, UI element visibility) and backend (controller guards).
- System ships with default roles; admins can create custom roles per property.

---

## Permission Slug Format

```
action:resource:scope
```

**Actions:**

| Alias | Meaning |
|---|---|
| `c` | create |
| `r` | read |
| `u` | update |
| `d` | delete |

**Resources** (by domain):

| Domain | Resource Slugs |
|---|---|
| Property | `p` |
| Unit | `un` |
| Zone | `z` |
| Device | `dv` |
| Organization | `o` |
| Contract | `ct` |
| User Role | `u-r` |
| Meeting | `mt` |
| Invitation | `inv` |
| Person | `pe` |
| Dashboard | `dash` |

**Scopes:**

| Alias | Meaning |
|---|---|
| `g` | General — system-wide |
| `o-a` | Organization admin — within own organization |
| `p` | Personal — own records only |

---

## Permission Examples

| Slug | Meaning |
|---|---|
| `c:p:g` | Create property (general scope) |
| `r:u-r:o-a` | Read user roles (organization-admin scope) |
| `u:v:p` | Update visitor (personal scope) |
| `c:inv:o-a` | Create invitation (organization-admin scope) |
| `r:dash:g` | Read dashboard (general scope) |
| `d:ct:g` | Delete contract (general scope) |

---

## Scope Hierarchy

```
General (g)
  └── Organization Admin (o-a)
        └── Personal (p)
```

A permission at `g` scope implies access across all properties and organizations.
A permission at `o-a` scope limits to the user's own organization.
A permission at `p` scope limits to the user's own records.

---

## Key Constraints

- `[DEFINED]` Permission slugs are the canonical authorization tokens — no freeform string checks.
- `[DEFINED]` Frontend reads permissions from `AuthSession.permissions: PermissionSlug[]`.
- `[DEFINED]` Backend guards validate the same slugs from the JWT session.
- `[DEFINED]` New permission slugs must be registered in both `permission-slugs.enum.ts` (frontend) and the backend permission seed.
- `[GENERAL]` Do not invent permission slugs — always check existing enum before adding new ones.

---

## Role Composition

A role is defined as:

```
Role {
  name: string
  description: string
  permissions: PermissionSlug[]
  rules: RoleRules  // additional behavioral flags
}
```

Roles are property-scoped. The same person can have different roles in different properties through different user roles.
