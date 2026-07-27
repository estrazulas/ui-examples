## ADDED Requirements

### Requirement: EventDto contract in shared-types
The system SHALL define an `EventDto` interface in `@org/shared-types` with the following fields: `id: string`, `nome: string`, `endereco: string`, `capacidade: number`, `data: string`.

#### Scenario: EventDto is importable from shared-types
- **WHEN** a module imports `EventDto` from `@org/shared-types`
- **THEN** the interface SHALL be available with fields `id`, `nome`, `endereco`, `capacidade`, `data`
