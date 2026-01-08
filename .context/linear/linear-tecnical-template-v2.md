# 🚀 [TICKET-ID] | [Feature Name]

> **Context**: [Brief 1-sentence context]
> **Recipient**: @[Backend/Frontend Lead]

---

## 🎯 Objective
[Clear, concise description of what we want to achieve and why.]

---

## 🛠️ Technical Specification

### 📡 Data Contracts (Zod Schema)
```typescript
// Define the source of truth for data exchange
const [Entity]Schema = z.object({
  // ... fields
});
```

### 🔗 API & Real-time
| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `GET` | `/api/v1/...` | Initial data fetch |
| `WS` | `/ws/...` | Real-time updates |

**Query Params:**
- `param1`: [Description]
- `param2`: [Description]

---

## 📋 Implementation Checklist

### 🔹 Backend (Requirements)
- [ ] [Actionable BE task]
- [ ] [Actionable BE task]

### 🔸 Frontend (Integration)
- [ ] [Actionable FE task]
- [ ] [Actionable FE task]

---

## 🔐 Constraints & Logic
- **Multi-Property**: [How it handles property scoping]
- **Real-time**: [WebSocket event names and triggers]
- **Edge Cases**: [Handling nulls, errors, etc.]

---

## 📂 Reference Files
- **Frontend**: [path/to/file.tsx](path/to/file.tsx)
- **Backend**: [path/to/file.py](path/to/file.py)
- **Docs**: [link-to-docs]
