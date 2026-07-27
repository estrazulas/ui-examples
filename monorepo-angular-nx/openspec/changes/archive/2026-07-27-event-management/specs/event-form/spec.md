## ADDED Requirements

### Requirement: Event form component with Reactive Forms and Signals
The frontend SHALL have an `EventFormComponent` at route `/event/new` that uses Angular Reactive Forms with Signals for form state management.

#### Scenario: Form renders with all fields
- **WHEN** the user navigates to `/event/new`
- **THEN** the form SHALL display fields for nome, endereco, capacidade, and data

#### Scenario: Form uses Reactive Forms
- **WHEN** the EventFormComponent is instantiated
- **THEN** it SHALL use `FormControl` or `FormGroup` from `@angular/forms` with signal-based state

### Requirement: Event form reuses CFP design tokens
The EventFormComponent SHALL use the same CSS classes as the CFP form (`.glass-card`, `.form-group`, `.submit-btn`, `.error`, `.success`) to maintain visual consistency.

#### Scenario: Event form looks like CFP form
- **WHEN** the user views `/event/new`
- **THEN** the form SHALL have the same glassmorphism card style, colors, and layout as the `/cfp` form

### Requirement: Event form validation
The EventFormComponent SHALL validate all fields as required before allowing submission.

#### Scenario: Submit with empty fields
- **WHEN** the user clicks submit without filling the form
- **THEN** validation error messages SHALL appear for each empty required field

#### Scenario: Submit with valid data
- **WHEN** the user fills all fields and clicks submit
- **THEN** the form SHALL send a POST request to `/api/events` and display a success message upon 201 response

### Requirement: Event form submits to API
The EventFormComponent SHALL send a POST request to `/api/events` with the form data on successful submission.

#### Scenario: Successful submission
- **WHEN** the user submits a valid form
- **THEN** the component SHALL call `POST /api/events` with `{ nome, endereco, capacidade, data }` and display "Evento criado com sucesso" on success
