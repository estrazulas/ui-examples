## ADDED Requirements

### Requirement: Navigation menu with three links
The frontend navigation SHALL contain exactly three links: Eventos, Palestras, and Dashboard.

#### Scenario: Navigation renders with correct links
- **WHEN** the application loads
- **THEN** the navigation menu SHALL display links to `/events` (Eventos), `/talks` (Palestras), and `/dashboard` (Dashboard)

#### Scenario: Navigation links are functional
- **WHEN** the user clicks on "Eventos"
- **THEN** the application SHALL navigate to `/events`
