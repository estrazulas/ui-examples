# event-api Specification

## Purpose
TBD - created by archiving change event-management. Update Purpose after archive.
## Requirements
### Requirement: Create event endpoint
The backend SHALL expose `POST /api/events` that accepts an event payload (nome, endereco, capacidade, data) and returns the created event with a generated `id`.

#### Scenario: Valid event creation
- **WHEN** a POST request is sent to `/api/events` with `{ "nome": "Angular Conf", "endereco": "Sao Paulo", "capacidade": 200, "data": "2026-12-31" }`
- **THEN** the server SHALL return HTTP 201 with `{ "id": "<uuid>", "nome": "Angular Conf", "endereco": "Sao Paulo", "capacidade": 200, "data": "2026-12-31" }`

#### Scenario: Missing required fields
- **WHEN** a POST request is sent to `/api/events` with missing `nome`
- **THEN** the server SHALL return HTTP 400 with an error message indicating `nome` is required

### Requirement: List events endpoint
The backend SHALL expose `GET /api/events` that returns all events stored in memory.

#### Scenario: List events when events exist
- **WHEN** a GET request is sent to `/api/events` and 2 events exist in memory
- **THEN** the server SHALL return HTTP 200 with an array of 2 EventDto objects

#### Scenario: List events when no events exist
- **WHEN** a GET request is sent to `/api/events` and no events exist
- **THEN** the server SHALL return HTTP 200 with an empty array

### Requirement: Get event by ID endpoint
The backend SHALL expose `GET /api/events/:id` that returns a single event by its ID.

#### Scenario: Event found
- **WHEN** a GET request is sent to `/api/events/abc-123` and an event with id `abc-123` exists
- **THEN** the server SHALL return HTTP 200 with the EventDto object

#### Scenario: Event not found
- **WHEN** a GET request is sent to `/api/events/non-existent`
- **THEN** the server SHALL return HTTP 404

### Requirement: List speakers endpoint
The backend SHALL expose `GET /api/cfp` that returns all speakers/submissions stored in memory.

#### Scenario: List speakers
- **WHEN** a GET request is sent to `/api/cfp`
- **THEN** the server SHALL return HTTP 200 with an array of SpeakerDto objects

### Requirement: In-memory storage for events
The backend SHALL store events in an in-memory array (not persisted to database).

#### Scenario: Events persist during server lifetime
- **WHEN** an event is created via POST /api/events
- **THEN** the event SHALL be available in subsequent GET /api/events requests until the server restarts

### Requirement: Hardcoded organizer for testing
The backend SHALL have a hardcoded organizer with credentials: email `org@test.com`, password `123456`.

#### Scenario: Organizer credentials are valid
- **WHEN** a login request is sent with email `org@test.com` and password `123456`
- **THEN** the server SHALL return a success response with an auth token

