# Property Management Chain

> Physical infrastructure: properties, units, zones, devices.

## Epic: Property CRUD — TEC-16

**Actor:** System Administrator (Admin TecniPass)

**Summary:** Full lifecycle management of properties (conjuntos inmobiliarios). A property is the top-level physical entity — a building complex with its own access rules, parking, and tenant structure.

**Core Stories:**

- Admin TecniPass can create a property with: name, short name, NIT, address, city, phone, property type, timezone, logo.
- Admin TecniPass can list all properties with search and pagination.
- Admin TecniPass can view property detail and edit any field.
- Admin TecniPass can soft-delete a property only if it has no active organizations.
- Selection-based fields (property type, city) must be parameterizable — not hardcoded.
- All entities carry audit fields: `createdBy`, `createdAt`, `updatedBy`, `updatedAt`.

**Key Constraints:**

- `[DEFINED]` Property short name must be unique across the system.
- `[DEFINED]` Deletion is soft — record persists with inactive flag.
- `[GENERAL]` All dropdown/select options are system-configurable, not enum-locked.

---

## Epic: Unit Management — TEC-17

**Actor:** Property Administrator (Admin Inmobiliaria)

**Summary:** Units are the subdivisions of a property — offices, apartments, warehouses, parking spots. Units are assigned to organizations via contracts.

**Core Stories:**

- Admin Inmobiliaria can create units within a property: name, floor, unit type, area.
- Admin Inmobiliaria can list, filter, edit, and soft-delete units.
- Parking units have additional attributes: vehicle type, capacity, has duplicator, is for disabled persons.
- Units can be associated with organizations only through a valid contract.

**Key Constraints:**

- `[DEFINED]` A unit belongs to exactly one property.
- `[DEFINED]` Parking units define capacity and vehicle-type compatibility.
- `[RELATIVE]` Unit assignment to organizations is governed by contract validity dates.

---

## Epic: Zone Management — TEC-63 (sub-scope)

**Actor:** Property Administrator

**Summary:** Zones are logical groupings within a property for access-control segmentation. A zone can contain multiple devices and restrict user access to specific areas.

**Core Stories:**

- Admin Inmobiliaria can create zones within a property with name and description.
- Zones are assigned to access-control devices.
- User roles can be scoped to specific zones.

**Key Constraints:**

- `[DEFINED]` A zone belongs to exactly one property.
- `[RELATIVE]` Zone access is inherited through user-role zone assignments.

---

## Epic: Device Management — TEC-125 (sub-scope)

**Actor:** System Administrator

**Summary:** Devices are physical access-control hardware (turnstiles, barriers, cameras, biometric readers) installed at a property and optionally assigned to zones.

**Core Stories:**

- Admin can register devices with: name, type, direction (entry/exit), zone assignment.
- System tracks device online/offline status in real time.
- Doorman dashboard displays device status aggregates.

**Device Types:** Turnstile, barrier, camera (facial recognition), camera (LPR), biometric reader, QR reader.

**Device Directions:** Entry, exit, bidirectional.

**Key Constraints:**

- `[DEFINED]` Each device belongs to exactly one property.
- `[RELATIVE]` Device zone assignment determines which user-role zone scopes grant passage.
- `[GENERAL]` Device status is monitored via heartbeat; offline triggers operational alerts.
