# Access Control Chain

> Invitations, reception, visitor registration, doorman operations.

## Epic: Visitor Pre-Registration / Invitations — TEC-90

**Actor:** Occupant (employee, resident), Unit Manager

**Summary:** Occupants can pre-authorize visitors before they arrive. An invitation creates a temporary access authorization with defined validity, visitor details, and optional vehicle/parking allocation.

**Core Stories:**

- Occupant can create an invitation for a visitor with: name, identification, email, phone, visit reason, validity start/end, vehicle info (optional), parking unit (optional).
- Quick invitation flow: minimal fields for fast visitor authorization.
- Invitation generates a QR code sent to the visitor via email.
- Visitor can use QR code for self-service check-in at reception or device.
- Occupant can view, edit, and cancel their own invitations.
- Unit Manager can view all invitations for their organization.
- Invitation supports batch creation (multiple invitees).

**Invitation Statuses:** `pending`, `confirmed`, `checked-in`, `checked-out`, `cancelled`, `expired`.

**Key Constraints:**

- `[DEFINED]` Invitation validity is bound by start and end datetime.
- `[DEFINED]` QR code encodes invitation ID and is validated against server state.
- `[RELATIVE]` Parking assignment on invitation only available if organization has parking allocation via contract.
- `[RELATIVE]` Invitation permissions scoped by inviter's own user-role organization.
- `[GENERAL]` Visitor data captured at invitation becomes the pre-registration record — reused if visitor returns.

---

## Epic: Reception — Walk-in Registration — TEC-43

**Actor:** Receptionist (Portero), Visitor

**Summary:** Physical reception point for visitors arriving without pre-registration. Receptionist captures visitor identity, verifies authorization, registers entry, and handles document/face capture if required by property policy.

**Core Stories:**

- Receptionist can search for existing invitations by: visitor name, identification number, QR scan.
- If invitation exists: confirm arrival, capture signature if required, register entry.
- If no invitation: create walk-in registration with full visitor details, request authorization from occupant.
- System captures: identification document photo, visitor face photo, digital signature (policy acceptance).
- Receptionist can register visitor exit (check-out).
- Reception tablet interface optimized for kiosk/tablet use.

**Key Constraints:**

- `[DEFINED]` System must not allow duplicate person records (identification type + number uniqueness).
- `[DEFINED]` Walk-in registration requires real-time authorization from the receiving occupant or unit manager.
- `[DEFINED]` Document signature is digital capture (drawn on screen), stored as image.
- `[RELATIVE]` Face and document capture requirements vary by property-level policy configuration.
- `[GENERAL]` Reception flow must work in degraded mode — offline fallback with later sync.

---

## Epic: Doorman Dashboard — TEC-463

**Actor:** Doorman (Portero)

**Summary:** Real-time operational dashboard for security personnel at property entry points. Provides unified search, movement tracking, parking status, device health, and alert management.

**Core Stories:**

- Doorman can view property overview: authorized people count (current + future), vehicle count, recent movements, parking snapshot, device status.
- Doorman can search across all entities: persons, user roles, invitations, vehicles, parking units, movement history.
- Search results are polymorphic — each kind returns relevant fields.
- Doorman can view detailed status of parking units: capacity, current assignees, future assignees, authorized vehicles.
- Doorman can view device list with online/offline status.
- Doorman receives real-time alerts: person overdue (no exit after expected time), person no-entry-after-start (authorized but never arrived).
- Movement log tracks: entry, exit, denied, timeout events with device and person attribution.

**Alert Types:**

| Type | Trigger | Severity |
|---|---|---|
| `person-overdue` | Person entered but no exit recorded past expected time | warning / critical |
| `person-no-entry-after-start` | Authorization active but no entry recorded | info |

**Search Kinds:**

| Kind | Key Fields |
|---|---|
| `person` | name, ID number, organization, validity, vehicles, parking |
| `userRole` | same as person, source = user role |
| `invitation` | same as person, source = invitation |
| `vehicle` | plate number, type, owner, parking units |
| `parkingUnit` | name, floor, type, capacity, current/future assignees |
| `movement` | timestamp, direction, person, device |

**Key Constraints:**

- `[DEFINED]` Movements are append-only — no edits or deletions.
- `[DEFINED]` Alert severity escalates based on time thresholds (configurable per property).
- `[RELATIVE]` Parking snapshot reflects real-time occupancy from movement events.
- `[GENERAL]` Dashboard uses WebSocket (Socket.IO) for real-time updates — movements and alerts push to connected clients.

---

## Emphasis Line Summary

```
Invitation (pre-reg) ──or──▶ Walk-in Registration
         │                            │
         ▼                            ▼
    QR Code sent              Receptionist captures
    to visitor                identity + authorization
         │                            │
         └──────────┬─────────────────┘
                    ▼
              Entry Movement
                    │
                    ▼
           Doorman Dashboard
           (search, alerts, parking, devices)
                    │
                    ▼
              Exit Movement
```
