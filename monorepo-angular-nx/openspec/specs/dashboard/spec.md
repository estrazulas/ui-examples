# dashboard Specification

## Purpose
TBD - created by archiving change event-management. Update Purpose after archive.
## Requirements
### Requirement: Dashboard with event and talk panels
The frontend SHALL have a `DashboardComponent` at route `/dashboard` with two panels: one for events and one for talks.

#### Scenario: Dashboard displays event panel
- **WHEN** the user navigates to `/dashboard`
- **THEN** the dashboard SHALL display a panel showing the total number of events and a list of recent events

#### Scenario: Dashboard displays talk panel
- **WHEN** the user navigates to `/dashboard`
- **THEN** the dashboard SHALL display a panel showing the total number of talks and a list of recent talks

