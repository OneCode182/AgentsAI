In this ticket, I’m attaching the frontend requirements needed for the backend “Home” section. If you need additional information or context, or even corrections, let me know.

Objective

Transitioning the main monitoring dashboard from simulated mock data to a production-ready real-time architecture. Establish data contracts and communication infrastructure (REST + WebSocket) to power the three main monitoring tables: Vehicles, People, and Parking Occupancy.

UI Screenshots

Vehicles Table

Table display showing recent vehicle entries and exits with columns: Timestamp, Plate, Parking Spot, Type, Organization, Vehicle Type.

People Table

Table display showing authorized personnel and visitors with columns: Timestamp, ID Number, Name, Type, Organization, Office.

Parking Occupancy Table

Table display showing parking zone status with columns: Name, Floor, Usage Type, Vehicle Type, Occupied Status.

Technical Specification

Data Contracts (Zod Schemas)

These schemas define the source of truth for the initial REST fetch, WebSocket updates (Summary), and on-demand Detail fetches.

Vehicle Authorization Types

Enumerations for vehicle categories used throughout the dashboard.

import { z } from 'zod';

export const VEHICLE_TYPES = {
  CAR: 'car',
  MOTORCYCLE: 'motorcycle',
  BIKE: 'bike',
  TRUCK: 'truck',
  HEAVY_TRUCK: 'heavy_truck',
  OTHER: 'other',
} as const;

export const VehicleTypeSchema = z.enum([
  VEHICLE_TYPES.CAR,
  VEHICLE_TYPES.MOTORCYCLE,
  VEHICLE_TYPES.BIKE,
  VEHICLE_TYPES.TRUCK,
  VEHICLE_TYPES.HEAVY_TRUCK,
  VEHICLE_TYPES.OTHER,
]);

export const AUTHORIZATION_TYPES = {
  PRIVATE: 'private',
  INVITATION: 'invitation',
} as const;

export const AuthorizationTypeSchema = z.enum([
  AUTHORIZATION_TYPES.PRIVATE,
  AUTHORIZATION_TYPES.INVITATION,
]);

Vehicle Summary Schema

Lightweight schema for table list view. Contains only visible columns to reduce payload size on initial load and WebSocket events.

export const VehicleSummarySchema = z.object({
  id: z.string().uuid(),
  timestamp: z.string().datetime(),
  plate: z.string(),
  parking: z.string(),
  type: AuthorizationTypeSchema,
  organization: z.string(),
  vehicle: VehicleTypeSchema.nullable(),
});

export type VehicleSummary = z.infer<typeof VehicleSummarySchema>;

Vehicle Detail Schema

Complete authorization record fetched on-demand when user clicks "View Details". Includes PII and authorization metadata.

export const VehicleDetailSchema = z.object({
  id: z.string().uuid(),
  identificationType: z.string(),
  identificationNumber: z.string(),
  email: z.string().email().optional(),
  authStartDate: z.string().datetime(),
  authEndDate: z.string().datetime(),
  organization: z.string(),
  property: z.string(),
  office: z.string(),
  plate: z.string(),
  parking: z.string(),
});

export type VehicleDetail = z.infer<typeof VehicleDetailSchema>;

Person Summary Schema

Lightweight schema for authorized people table list view.

export const PersonSummarySchema = z.object({
  id: z.string().uuid(),
  timestamp: z.string().datetime(),
  identificationNumber: z.string(),
  name: z.string(),
  type: AuthorizationTypeSchema,
  organization: z.string(),
  office: z.string(),
});

export type PersonSummary = z.infer<typeof PersonSummarySchema>;

Person Detail Schema

Complete person authorization record with sensitive information.

export const PersonDetailSchema = z.object({
  id: z.string().uuid(),
  identificationType: z.string(),
  identificationNumber: z.string(),
  name: z.string(),
  email: z.string().email(),
  authStartDate: z.string().datetime(),
  authEndDate: z.string().datetime(),
  organization: z.string(),
  property: z.string(),
  office: z.string(),
  invitedBy: z.string().optional(),
});

export type PersonDetail = z.infer<typeof PersonDetailSchema>;

Parking Occupancy Schema

Current state of parking zones in the building.

export const ParkingDashboardSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  floor: z.string(),
  usage: AuthorizationTypeSchema,
  vehicleType: VehicleTypeSchema.or(z.literal('any')),
  occupied: z.boolean(),
  organization: z.string().optional(),
});

export type ParkingDashboard = z.infer<typeof ParkingDashboardSchema>;

export const ParkingDetailSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  floor: z.string(),
  usage: AuthorizationTypeSchema,
  vehicleType: VehicleTypeSchema.or(z.literal('any')),
  occupied: z.boolean(),
  organization: z.string().optional(),
  authorizedVehicles: z.array(z.object({
    identificationType: z.string(),
    identificationNumber: z.string(),
    email: z.string().email().optional(),
    authStartDate: z.string().datetime(),
    authEndDate: z.string().datetime(),
    organization: z.string(),
    property: z.string(),
    office: z.string(),
  })),
});

export type ParkingDetail = z.infer<typeof ParkingDetailSchema>;

API and Real-time Infrastructure

REST Endpoints

Method

Endpoint

Purpose

GET

/api/v1/dashboard/{property_id}/home/summary/

Initial state for home tab (Vehicles, People, Parking)

GET

/api/v1/dashboard/{property_id}/home/vehicle/{id}/

Lazy Load: Full vehicle authorization details

GET

/api/v1/dashboard/{property_id}/home/person/{id}/

Lazy Load: Full person authorization details

GET

/api/v1/dashboard/{property_id}/home/parking/{id}/

Lazy Load: Full parking spot details and authorized vehicles

Query Parameters (GET Summary):

limit: (Optional) Number of recent records to return (Default: 50).

WebSocket Endpoints

Endpoint

Purpose

/ws/dashboard/{property_id}/home/vehicles/

Real-time stream for vehicle entries and exits

/ws/dashboard/{property_id}/home/people/

Real-time stream for authorized personnel and visitors

/ws/dashboard/{property_id}/home/parking/

Real-time stream for parking occupancy updates

Connection Strategy:
Each subtab (Vehicles, People, Parking) within the home tab maintains its own WebSocket connection. This allows:

Isolated event streams per data type

Independent connection lifecycle

Optimized bandwidth (only relevant updates per connection)

Implementation Checklist

Backend Requirements

Database Partitioning: Implement table partitioning for VehicleLogs and PersonLogs (e.g., by month/year) to handle high-volume real-time insertions without degrading read performance.

Summary View: Endpoint must return lightweight SummarySchema objects to reduce payload size.

Detail Endpoints: Create dedicated endpoints for fetching full record details by ID.

Unified WebSocket Consumer: Broadcast SummarySchema events.

Property Scoping: Strict filtering by property_id.

Constraints and Logic

Performance First: The initial load and WebSocket streams must ONLY transmit SummarySchema data. Never send full details (PII, dates, etc.) unless explicitly requested by the user via the Detail Modal.

Partitioning Strategy: Given the high frequency of access logs, the backend must ensure that queries for the "Recent Activity" list are optimized (e.g., querying only the latest partition).

Separate Streams: Each subtab (Vehicles, People, Parking) has its own WebSocket to avoid coupling and enable independent scaling.

Event Types: Each stream sends data matching its respective schema (VehicleSummarySchema, PersonSummarySchema, ParkingDashboardSchema).

Property Scoping: All endpoints require property_id in the URL path to ensure data isolation.

Reference Files

Backend Models: src/tecnipass/core/models/ (VehicleLog, Person, ParkingSpot)