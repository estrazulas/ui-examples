# talk-list Specification

## Purpose
TBD - created by archiving change event-management. Update Purpose after archive.
## Requirements
### Requirement: Talk list component
The frontend SHALL have a `TalkListComponent` at route `/talks` that displays all speaker submissions from the API.

#### Scenario: List displays talks
- **WHEN** the user navigates to `/talks` and submissions exist
- **THEN** the component SHALL display a list of talks with nome, email, talkTitle, and isGDE status

#### Scenario: List displays empty state
- **WHEN** the user navigates to `/talks` and no submissions exist
- **THEN** the component SHALL display a message like "Nenhuma palestra submetida"

