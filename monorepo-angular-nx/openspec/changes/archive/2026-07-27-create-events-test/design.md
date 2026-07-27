## Context

O workspace Nx monorepo contem um projeto `frontend` (Angular) com um formulario de cadastro e um projeto `frontend-e2e` existente configurado com Playwright. O usuario demanda testes e2e tradicionais com Cypress para a tela de cadastro de eventos na rota `/event/new`. O formulario possui campos: nome, endereco, capacidade e data, com validacao nativa do Angular.

## Goals / Non-Goals

**Goals:**
- Criar projeto Cypress e2e no workspace Nx para testes tradicionais
- Escrever teste de cenario de sucesso: preencher todos os campos e verificar submissao bem-sucedida
- Escrever teste de cenario de erro: submeter formulario vazio e verificar mensagens de erro de validacao
- Usar exclusivamente seletores CSS (id, class, name) e sintaxe Cypress tradicional (`cy.get()`, `cy.contains()`, `should()`)

**Non-Goals:**
- Migrar ou remover os testes Playwright existentes
- Adicionar bibliotecas externas de IA ou plugins de auto-cura
- Testar outros formularios ou rotas alem de `/event/new`
- Alterar o codigo de producao do frontend

## Decisions

**1. Projeto Cypress separado vs. dentro do frontend-e2e existente**
- **Decisao**: Criar um novo projeto `frontend-cypress-e2e` no workspace Nx, mantendo o `frontend-e2e` (Playwright) intacto
- **Racional**: Evita conflito de configuracao entre Playwright e Cypress no mesmo projeto. Permite coexistencia e execucao independente via Nx targets
- **Alternativa considerada**: Adicionar Cypress dentro de `frontend-e2e` — rejeitada por misturar dois frameworks de e2e na mesma configuracao

**2. Localizacao do arquivo de teste**
- **Decisao**: `frontend-cypress-e2e/src/e2e/event-registration.cy.ts`
- **Racional**: Segue convencao do Nx para projetos e2e com Cypress (`src/e2e/`). O caminho proposto pelo usuario (`apps/frontend/src/e2e-cy/`) nao se aplica pois o workspace nao usa prefixo `apps/`

**3. Seletores CSS**
- **Decisao**: Usar `id` como seletor primario (mais estavel), com fallback para `name` ou `class`
- **Racional**: IDs sao unicos e menos sensiveis a mudancas de layout. O formulario deve ter IDs nos campos para acessibilidade (label `for`), o que os torna seletores naturais

**4. Configuracao do webServer**
- **Decisao**: Configurar `webServer` no `cypress.config.ts` para iniciar `nx run frontend:serve` automaticamente
- **Racional**: Garante que o dev server esta rodando antes dos testes, seguindo o mesmo padrao do `playwright.config.ts` existente

## Risks / Trade-offs

- [Dois frameworks e2e coexistindo] → Maior custo de manutencao e dependencias. Mitigacao: documentar qual framework usar para novos testes
- [Rota `/event/new` pode nao existir ainda] → Os testes falharao se a pagina nao estiver implementada. Mitigacao: verificar existencia da rota antes de implementar os testes
- [Seletores CSS podem quebrar com refactor] → Mitigacao: preferir IDs que sao estaveis e ja existem para acessibilidade
