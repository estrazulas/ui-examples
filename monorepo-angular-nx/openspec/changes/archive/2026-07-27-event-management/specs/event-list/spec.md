## ADDED Requirements

### Requirement: Event list component
The frontend SHALL have an `EventListComponent` at route `/events` that displays all events from the API.

#### Scenario: List displays events
- **WHEN** the user navigates to `/events` and events exist
- **THEN** the component SHALL display a list of events with their nome, endereco, capacidade, and data

#### Scenario: List displays empty state
- **WHEN** the user navigates to `/events` and no events exist
- **THEN** the component SHALL display a message like "Nenhum evento cadastrado"
