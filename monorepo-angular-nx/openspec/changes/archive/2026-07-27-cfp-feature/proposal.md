## Why

O evento precisa de um sistema para que palestrantes submetam propostas de palestras. Atualmente não há formulário de submissão no frontend nem endpoint de recebimento no backend — toda a captação é manual. A criação deste módulo viabiliza a coleta estruturada de propostas e serve como fundação para funcionalidades futuras (curadoria, agenda, etc.).

## What Changes

- **Backend (NestJS)**: Criação de um módulo `CfpModule` com controller `POST /api/cfp/submit` que recebe um payload validado conforme `SpeakerDto`, retornando 201 em caso de sucesso e 400 para payloads inválidos.
- **Frontend (Angular 21)**: Criação de um componente standalone `CfpFormComponent` com formulário reativo usando Signals para gestão de estado e atributos WAI-ARIA para acessibilidade. O botão de envio deve permanecer bloqueado enquanto o formulário estiver inválido ou o envio estiver em andamento.
- **Shared**: Consumo do contrato `SpeakerDto` exportado por `@org/shared-types` tanto no backend quanto no frontend.
- **Testes unitários** (Jest para NestJS, Vitest/Angular para frontend): Cobertura obrigatória com cenários de payload inválido (400) e validação de estado inicial do Signal e bloqueio do botão de envio.

## Capabilities

### New Capabilities
- `cfp-submission`: Formulário de submissão de palestras no frontend e endpoint REST de recebimento no backend, ambos consumindo o contrato `SpeakerDto` da lib `shared-types`.

### Modified Capabilities
<!-- Nenhuma capacidade existente é modificada — esta é a primeira feature após o scaffold. -->

## Impact

- **Code**: `apps/api/src/app/cfp/` (novo módulo NestJS), `apps/frontend/src/app/cfp/` (novo componente standalone Angular)
- **APIs**: Novo endpoint `POST /api/cfp/submit`
- **Dependencies**: `class-validator` e `class-transformer` (já disponíveis via NestJS), `@org/shared-types` (já existe)
- **Tests**: `api/src/app/cfp/` (Jest), `frontend/src/app/cfp/` (Vitest/Angular unit-test)
