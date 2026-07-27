## ADDED Requirements

### Requirement: Login endpoint
The backend SHALL expose `POST /api/auth/login` that validates credentials against the hardcoded organizer and returns an auth token.

#### Scenario: Valid login
- **WHEN** a POST request is sent to `/api/auth/login` with `{ "email": "org@test.com", "senha": "123456" }`
- **THEN** the server SHALL return HTTP 200 with `{ "token": "<auth-token>" }`

#### Scenario: Invalid login
- **WHEN** a POST request is sent to `/api/auth/login` with invalid credentials
- **THEN** the server SHALL return HTTP 401

### Requirement: Login page
The frontend SHALL have a `LoginComponent` at route `/login` with email and password fields.

#### Scenario: Successful login redirects
- **WHEN** the user submits valid credentials (org@test.com / 123456)
- **THEN** the frontend SHALL store the token and redirect to `/event/new`

#### Scenario: Failed login shows error
- **WHEN** the user submits invalid credentials
- **THEN** the frontend SHALL display an error message "Credenciais invalidas"

### Requirement: Auth guard for protected routes
The frontend SHALL have an auth guard that protects `/event/new` from unauthenticated access.

#### Scenario: Unauthenticated user redirected to login
- **WHEN** an unauthenticated user navigates to `/event/new`
- **THEN** the guard SHALL redirect to `/login`

#### Scenario: Authenticated user can access event form
- **WHEN** an authenticated user (with valid token) navigates to `/event/new`
- **THEN** the guard SHALL allow access to the event form
