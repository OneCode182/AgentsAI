---
name: use-case-specification-generator
description: Generates a structured Technical Specification (Problem or Scenario) for any use case and application role.
---

# Use Case and Problem Specification Generator

This skill defines the standard operating procedure for generating technical specifications for any use case, feature, or problem identified within the application, regardless of the user role (Receptionist, Admin, Guest, etc.). It transforms raw descriptions into actionable technical blueprints.

## Input

- **App Role:** The specific user persona involved (e.g., Receptionist, Tablet/Guest, SuperAdmin).
- **Use Case / Problem Description:** A raw explanation of the behavior, requirement, or technical hurdle.

## Output Requirements

The output must be a well-structured Markdown document adhering to the following constraints:
- **Language:** English.
- **Tone:** Technical, objective, and analytical.
- **Style:** Concise, concrete, and highly descriptive.
- **Formatting:** Use bold text for emphasis, bullet points for lists, and code blocks for technical references.
- **Strict Rule:** Absolutely no emojis.

## Context Integration

Actively leverage the existing technical context across the workspace:
- **Role-Based Logic:** Identify how the specific role interacts with the system.
- **Frontend Context:** Reference `tecnipass-frontend` (routes, components, hooks, state management relevant to the role).
- **Backend Context:** Reference `tecnipass-backend` (services, controllers, business logic, persistence layers).

## Output Structures

Choose the structure that best fits the input:

### 1. Problem Specification
Use this when documenting a technical debt, bug, or performance bottleneck.

```markdown
# Skill: [Concise Problem Name]

## Overview
High-level summary of the issue and its impact on the specific Role or Use Case.

## Problem Statement
Concrete description of the hurdle. Current vs. Expected behavior.

## Technical Analysis
Detailed breakdown of the constraints.
- **Frontend ([Role-specific]):** Component or architectural failures.
- **Backend:** Service or data-layer limitations.
- **Infrastructure:** External dependencies or environment issues.

## Requirements for Resolution
Specific technical and functional goals. Defined strategies for improvement.

## Execution Priority
Actionable, ordered steps to resolve the issue.
```

### 2. Scenario / Feature Specification
Use this when defining a new workflow or documenting an existing one.

```markdown
# Scenario: [Concise Use Case Name]

## Overview
Summary of the workflow's purpose for the specific Role.

## Workflow Context
- **Primary Actor:** [Role Name]
- **Objective:** What the user/system is trying to achieve.

## Execution Flow
Step-by-step breakdown of the interaction from start to finish. Focus on triggers and outcomes.

## Technical Implementation
Detailed mapping of the logic:
- **Frontend:** Relevant routes, hooks, and UI components.
- **Backend:** Supporting services, APIs, and data models.
- **State Management:** How data persists or flows between steps.
```
