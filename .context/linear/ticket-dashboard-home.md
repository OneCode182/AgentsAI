# 🚀 TEC-XXX | Dashboard Home Real-time Integration

> **Context**: Transitioning from mock data to real backend integration for the main monitoring dashboard.
> **Recipient**: @lesanmiguel93

---

## 🎯 Objective
Implement the backend infrastructure and frontend integration to provide real-time monitoring of Vehicles, People, and Parking occupancy in the main dashboard.

---

## 🛠️ Technical Specification

### 📡 Data Contracts (Zod Schema)
```typescript
// Main schema for Vehicle events
export const VehicleDashboardSchema = z.object({
  id: z.string().uuid(),
  action: z.enum(['enter', 'exit']),
  vehicle: z.enum(['car', 'motorcycle', 'bike', 'truck', 'heavy_truck', 'other']),
  timestamp: z.string().datetime(),
  plate: z.string(),
  parking: z.string(),
  type: z.enum(['private', 'invitation']),
  organization: z.string(),
  personName: z.string(),
  identificationNumber: z.string(),
  property: z.string(),
  office: z.string().optional(),
});

// Main schema for Parking status
export const ParkingDashboardSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  floor: z.string(),
  usage: z.enum(['P', 'V']),
  capacity: z.number().int(),
  currentOccupancy: z.number().int(),
});
```

### 🔗 API & Real-time
| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `GET` | `/api/v1/dashboard/summary/` | Initial state for all 3 tables |
| `WS` | `/ws/dashboard/` | Real-time stream for events |

**Query Params:**
- `property_id`: Scope data to a specific building.
- `limit`: Number of recent records to return (default: 50).

---

## 📋 Implementation Checklist

### 🔹 Backend (Requirements)
- [ ] Create `SummaryView` to aggregate recent vehicle/person logs and current parking occupancy.
- [ ] Implement WebSocket consumers to broadcast `VEHICLE_EVENT` and `PARKING_UPDATE`.
- [ ] Ensure all queries are filtered by `property_id` via middleware.

### 🔸 Frontend (Integration)
- [ ] Replace `useSimulatedRealTimeData` with a real `useDashboardSocket` hook.
- [ ] Implement Zod validation on incoming WebSocket messages.
- [ ] Add "Connection Status" indicator based on WS state.

---

## 🔐 Constraints & Logic
- **Multi-Property**: All data must be strictly scoped to the user's active property context.
- **Real-time**: WebSocket must emit the full object matching the Zod schema to avoid extra API calls.
- **Performance**: Use partial updates for the Parking table (only update the specific spot ID).

---

## 📂 Reference Files
- **Frontend Route**: [app/routes/_home.dashboard.home._index/route.tsx](app/routes/_home.dashboard.home._index/route.tsx)
- **Mock Data (Current Source)**: [app/routes/_home.dashboard.home._index/mock-data.ts](app/routes/_home.dashboard.home._index/mock-data.ts)
- **Backend Models**: `src/tecnipass/core/models/`
