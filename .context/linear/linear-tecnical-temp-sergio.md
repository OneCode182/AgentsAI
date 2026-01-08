@lesanmiguel93: In this ticket, I’m attaching the frontend requirements needed for the backend “Controls” section. If you need additional information or context, or even corrections, let me know.

Objective

Provide RESTful endpoints for portero dashboard to:

Register manual access events (vehicles/persons) with validation

Control physical gates (talanqueras/torniquetes) via device integration

Support multi-property configuration (initially EcoTower100 with 3 lobbies)


Frontend Components Checklist

Frontend Component

Backend Resources Required

Type

Control Panel - Gate buttons

Execute physical access device operation (POST)

REST API

Control Panel - Device status indicators

Obtain the status of physical access devices (GET)

REST API

Registration Form - Manual entry/exit

Manually register a vehicle or person (POST)

REST API

Operations Log Table - Recent activity

Query endpoint + WebSocket stream

REST + WebSocket

Real-time Feedback - Success/fail notifications

Device operation response

REST API

Dashboard Updates - Live metrics

Access event emissions

WebSocket

EcoTower100 Initial Configuration

Parking Gates (8 devices):

2 Talanqueras Vehicular (entry/exit)

2 Talanqueras Moto (entry/exit)

2 Talanqueras Bicicleta (entry/exit)

2 Torniquetes Peatonales (entry/exit)

Lobby Turnstiles (6 devices):

Lobby 1: 2 torniquetes (entry/exit)

Lobby 2: 2 torniquetes (entry/exit)

Lobby 3: 2 torniquetes (entry/exit)

All devices must be property-scoped and parameterized for multi-building support.

Main Requirements

Real-time Feedback

Frontend must receive immediate success/fail response for every gate operation

Operation Registry

Every operation (manual or automated) creates permanent log entry

Logs must be queryable by: date range, device, actor type, success status

Multi-Property Support

All endpoints filtered by propertyId (via middleware)

Device configuration stored per property

Initial setup for EcoTower100

Audit Trail

For manual operations, frontend must send:

Portero name/ID

Reason for manual override

Destination office

Actor details (name, plate/document, organization)

Operation Log Requirements

Category

Required Data

Operation

Timestamp, unique ID, success status, trigger type (manual/automated)

Device

Device ID, device type, action performed

Actor

Type (vehicle/person), identifier (plate/document), name, role (funcionario/visitante)

Context

Organization, destination office, reason (if manual)

Audit

Operated by (portero ID if manual)

Real-time requirement: Operation logs must emit WebSocket events to update dashboard table instantly.
