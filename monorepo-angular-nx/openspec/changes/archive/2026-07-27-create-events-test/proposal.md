## Why

A tela de cadastro de eventos (`/event/new`) nao possui testes e2e automatizados. O projeto `frontend-e2e` atual usa Playwright, mas ha demanda por testes e2e tradicionais com Cypress para validar o fluxo de submissao do formulario (cenarios de sucesso e erro), garantindo regressao zero em funcionalidades criticas de validacao e submissao.

## What Changes

- Adicao de um projeto Cypress e2e no workspace Nx (ex: `frontend-cypress-e2e`) ou configuracao de Cypress dentro do projeto existente
- Criacao do arquivo de teste `event-registration.cy.ts` com dois cenarios:
  - **Cenario de sucesso**: navegar ate `/event/new`, preencher campos (nome, endereco, capacidade, data) usando seletores CSS (class, id, name), clicar em submeter e verificar sucesso
  - **Cenario de erro**: navegar ate `/event/new`, submeter formulario vazio e verificar mensagens de erro de validacao nativas
- Uso exclusivo de sintaxe tradicional Cypress (`cy.get()`, `cy.contains()`, `should()`) — sem bibliotecas externas de IA

## Capabilities

### New Capabilities
- `cypress-event-registration-tests`: Testes e2e com Cypress para a tela de cadastro de eventos, cobrindo submissao valida e validacao de formulario vazio

### Modified Capabilities

## Impact

- Novo projeto e2e no workspace Nx (dependencias: `cypress`, possivelmente `@nx/cypress`)
- Arquivo de teste em `frontend/src/e2e-cy/event-registration.cy.ts` (ou no projeto e2e Cypress gerado)
- Necessidade de a aplicacao frontend ter a rota `/event/new` funcional com formulario (nome, endereco, capacidade, data) e validacao
- Nenhum impacto no codigo de producao do frontend
