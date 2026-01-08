# TEC-XXX | Dashboard Controls: Physical Access & Manual Registration

> Implementation of manual controls for physical access hardware (Barriers, Turnstiles) and the associated manual registration flow.

---

## Objective
Establish the API contracts and logic for controlling physical access points and recording manual entries/exits performed by security guards.

---

## Hardware Inventory (Access Points)

The system must interface with **14 distinct physical access points**.

### Vehicle Barriers (Talanqueras) - 6 Units
Used for vehicular access control.

| Zone | Type | Direction | Quantity |
| :--- | :--- | :--- | :--- |
| **Vehicular** | Car | In / Out | 2 |
| **Motos** | Motorcycle | In / Out | 2 |
| **Bicicletas** | Bike | In / Out | 2 |

### Turnstiles (Torniquetes) - 8 Units
Used for pedestrian access control.

| Zone | Direction | Quantity |
| :--- | :--- | :--- |
| **Parqueadero** | In / Out | 2 |
| **Lobbie 1** | In / Out | 2 |
| **Lobbie 2** | In / Out | 2 |
| **Lobbie 3** | In / Out | 2 |

---

## Technical Specification

### Data Contracts (Zod Schemas)

Only the **Manual Registration** requires a strict data schema. The hardware control is action-based.

#### Manual Registration Schema
Data captured by the guard when manually registering an entry or exit.

```typescript
import { z } from 'zod';

export const VISITOR_TYPES = {
  OFFICIAL: 'official', // Funcionario
  VISITOR: 'visitor',   // Visitante
} as const;

export const ManualRegistrationSchema = z.object({
  id: z.string().uuid().optional(), // Optional for creation payload
  identificationNumber: z.string(), // ID
  name: z.string(), // Nombre
  plate: z.string().optional(), // Placa (Only required for vehicle access)
  type: z.enum([VISITOR_TYPES.OFFICIAL, VISITOR_TYPES.VISITOR]), // Tipo
  office: z.string(), // Oficina
  organization: z.string(), // Organización
  reason: z.string(), // Motivo: Texto de explicación
  timestamp: z.string().datetime().optional(), // Server generated
});

export type ManualRegistration = z.infer<typeof ManualRegistrationSchema>;
```

### API Infrastructure

#### REST Endpoints - Access Control (Hardware)

| Method | Endpoint | Purpose | Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/dashboard/{property_id}/controls/access/{device_id}/open/` | Trigger opening of a specific barrier/turnstile | `{ registration_id?: string }` | `{ success: boolean, message: string }` |

> **Note:** The `device_id` identifies the specific hardware (e.g., `lobby-1-in`, `vehicle-out`). The backend must return whether the physical open command was successful.

#### REST Endpoints - Registration (Logs)

| Method | Endpoint | Purpose | Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/dashboard/{property_id}/controls/registration/` | Create a new manual access log | `ManualRegistrationSchema` |

---

## Logic & Constraints

### 1. Flexible Access Control (The "Open" Button)
- **Non-Blocking Flow:** The guard must be able to open any access point **without** a prior registration or with incomplete data.
- **Frontend Warning:** If the guard attempts to open a barrier without a linked registration or with missing fields, the UI must display a **Warning/Confirmation** (e.g., "Opening without full registration. Continue?"), but must **NOT** prevent the action.

### 2. Hardware Feedback
- The `POST` request to open a device is synchronous regarding the command acknowledgment.
- The response must explicitly state if the hardware received the command successfully (`success: true/false`).

### 3. Registration Workflow
- Typically, a guard creates a registration first (`POST /registration/`), receives an ID, and then sends that ID when opening the barrier (`POST /access/.../open/`).
- However, due to the flexible nature, the `registration_id` in the open command is **optional**.
