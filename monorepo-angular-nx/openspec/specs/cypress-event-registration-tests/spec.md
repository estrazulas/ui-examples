# Cypress Event Registration Tests

## Purpose

End-to-end testing capability for event registration flows using Cypress within the Nx workspace.

## Requirements

### Requirement: Cypress e2e project in Nx workspace
The system SHALL have a dedicated Cypress e2e project (`frontend-cypress-e2e`) configured in the Nx workspace, with `cypress.config.ts` pointing to `http://localhost:4200` as base URL and a `webServer` configuration that starts the frontend dev server.

#### Scenario: Cypress project is scaffolded and runnable
- **WHEN** the developer runs `npx nx e2e frontend-cypress-e2e`
- **THEN** Cypress starts, connects to the running frontend at `http://localhost:4200`, and executes all spec files in `src/e2e/`

### Requirement: Successful event registration test
The system SHALL have a Cypress test that navigates to `/event/new`, fills in all required fields (nome, endereco, capacidade, data) using CSS selectors (id, class, or name), clicks the submit button, and verifies the submission succeeded.

#### Scenario: Form submission with valid data shows success
- **WHEN** the test navigates to `/event/new`, types "Evento Teste" in the nome field, "Rua Teste, 123" in the endereco field, "100" in the capacidade field, and "2026-12-31" in the data field, then clicks the submit button
- **THEN** the page SHALL display a success message confirming the event was registered

### Requirement: Empty form submission shows validation errors
The system SHALL have a Cypress test that navigates to `/event/new`, submits the empty form, and verifies that native validation error messages appear on screen.

#### Scenario: Submitting empty form displays validation errors
- **WHEN** the test navigates to `/event/new` and clicks the submit button without filling any fields
- **THEN** the page SHALL display validation error messages for each required field (nome, endereco, capacidade, data)

### Requirement: Traditional Cypress syntax only
All Cypress tests SHALL use only traditional Cypress API commands (`cy.get()`, `cy.contains()`, `cy.visit()`, `cy.type()`, `cy.click()`, `should()`, `expect()`) without any external AI libraries or plugins.

#### Scenario: Test file uses no external AI dependencies
- **WHEN** the test file `event-registration.cy.ts` is inspected
- **THEN** it SHALL contain only imports from `cypress` and no third-party AI or auto-healing libraries
