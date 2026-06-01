# Scenario: Receptionist Signature Sync

## Overview
This document outlines the workflow and technical context for the **Real-Time Signature Synchronization** scenario at the reception desk. It details the interaction between a Receptionist (using a PC) and a Guest (using a Tablet) to securely capture digital signatures and data protection policy acceptances.

## Core Scenario
An unregistered guest arrives at the reception and requires a new invitation. The receptionist manages the registration process across two devices: a PC for data entry and a Tablet dedicated to the guest for signing.

## Workflow Execution

### 1. Registration Initiation
- The receptionist starts the creation of a new invitation on their PC.
- Basic guest details and the destination office are filled out in the system.

### 2. Secure Session & Policy Presentation
- The system reaches the **Signature and Data Protection Policy** section.
- A secure, real-time session is established between the PC and the Tablet.
- The Tablet transitions from its idle state to display a two-faced Data Protection Policy and a signature pad for the guest.

### 3. Real-Time Signature Synchronization
- The guest reviews the policy and begins signing on the Tablet.
- As the guest signs, the strokes are transmitted in real-time from the Tablet to the Receptionist's PC.
- The Receptionist can visually confirm the signature progress on their screen.

### 4. Completion & Session Termination
- Upon finishing, the guest clicks "Send" on the Tablet.
- The secure session is immediately terminated, and the Tablet returns to its original default state.
- The completed signature is securely transferred to the Receptionist's browser session.
- The Receptionist finalizes the invitation flow with the captured signature.

## Technical Context

### Frontend (`tecnipass-frontend`)
- **Device Routing:**
  - **Receptionist PC:** `/reception/invitation`
  - **Guest Tablet:** `/auth/signing`
- **Communication Hook:** Utilizes `useSignatureSync` to manage WebSocket connections.
- **Modes:** The Tablet operates in `broadcast` mode to send strokes, while the PC operates in `receive` mode to listen and render them.
- **Components:** The `SignaturePad` component handles the drawing interface and event emission.

### Backend (`tecnipass-backend`)
- **WebSocket Architecture:** Powered by NestJS and Socket.IO (`@nestjs/websockets`).
- **Session Isolation:** Uses unique `sessionId` rooms to ensure signature data is strictly isolated between the paired PC and Tablet.
- **Events:** Manages `signature:join`, `signature:stroke`, `signature:clear`, and `signature:complete` events to orchestrate the real-time flow.
