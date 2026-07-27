## 1. Setup Cypress e2e project

- [x] 1.1 Gerar projeto Cypress e2e no workspace Nx: `npx nx g @nx/cypress:configuration --project frontend-cypress-e2e` ou `npx nx g @nx/cypress:e2e-project` (verificar gerador disponivel)
- [x] 1.2 Instalar dependencias do Cypress (`cypress`) caso nao estejam presentes no `package.json`
- [x] 1.3 Configurar `cypress.config.ts` com `baseUrl: http://localhost:4200` e `webServer` apontando para `npx nx run frontend:serve`
- [x] 1.4 Criar `project.json` do projeto `frontend-cypress-e2e` com target `e2e` e dependencia implicita em `frontend`

## 2. Implementar cenario de sucesso

- [x] 2.1 Criar arquivo `frontend-cypress-e2e/src/e2e/event-registration.cy.ts`
- [x] 2.2 Escrever teste `describe('Event Registration - Success')` com `it('should submit form with valid data')`
- [x] 2.3 Navegar ate `/event/new` com `cy.visit('/event/new')`
- [x] 2.4 Preencher campo nome usando `cy.get('#nome').type('Evento Teste')` (ou seletor CSS equivalente)
- [x] 2.5 Preencher campo endereco usando `cy.get('#endereco').type('Rua Teste, 123')`
- [x] 2.6 Preencher campo capacidade usando `cy.get('#capacidade').type('100')`
- [x] 2.7 Preencher campo data usando `cy.get('#data').type('2026-12-31')`
- [x] 2.8 Clicar no botao submeter com `cy.get('button[type="submit"]').click()` ou `cy.contains('button', 'Cadastrar').click()`
- [x] 2.9 Verificar mensagem de sucesso com `cy.contains('Evento criado com sucesso!').should('be.visible')` ou assercao equivalente

## 3. Implementar cenario de erro

- [x] 3.1 Escrever teste `it('should show validation errors when submitting empty form')` no mesmo `describe`
- [x] 3.2 Navegar ate `/event/new` com `cy.visit('/event/new')`
- [x] 3.3 Clicar no botao submeter sem preencher campos
- [x] 3.4 Verificar mensagens de erro de validacao com `cy.get('.error').should('have.length.greaterThan', 0)` ou assercoes por campo
- [x] 3.5 Verificar mensagens especificas por campo (ex: `cy.contains('Nome é obrigatório.').should('be.visible')`)

## 4. Validar execucao

- [x] 4.1 Executar `npx nx e2e frontend-cypress-e2e` e verificar que ambos os cenarios passam
- [x] 4.2 Confirmar que nenhum plugin ou biblioteca externa de IA foi importada nos arquivos de teste
