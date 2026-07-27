# monorepo-ui-openspec-examples

Plataforma de gerenciamento de eventos e palestras (CFP - Call for Papers) construída inteiramente via **OpenSpec**, um workflow spec-driven que gera proposals, designs, specs e tasks antes de qualquer código. Desenvolvida em monorepo Nx com Angular 21 no frontend e NestJS no backend.

## O que foi criado com OpenSpec

O projeto foi desenvolvido através de 3 changes arquivados no OpenSpec:

- **event-management** — CRUD completo de eventos, autenticação, dashboard com métricas e navegação
- **cfp-feature** — submissão de palestras (Call for Papers) com formulário acessível
- **create-events-test** — testes e2e com Cypress para validação do fluxo de cadastro de eventos

## Tecnologias

- **Frontend**: Angular 21 (Standalone Components, Signals, Control Flow `@if`/`@for`, Reactive Forms, Lazy Loading)
- **Backend**: NestJS 11 (Controllers, Services, class-validator)
- **Monorepo**: Nx 22 (task orchestration, module boundaries)
- **Shared library**: `shared-types` (DTOs compartilhados entre frontend e backend)
- **Testes unitários**: Jest + Vitest
- **Testes e2e**: Playwright (multi-browser) + Cypress (incluindo AI-driven testing)
- **Estilo**: CSS com glass-card design

## Shared-types: contratos entre frontend e backend

A biblioteca `@org/shared-types` define interfaces TypeScript que servem como contrato entre as camadas:

```typescript
// EventDto - usado por backend (retorno) e frontend (tipagem)
export interface EventDto {
  id: string;
  nome: string;
  endereco: string;
  capacidade: number;
  data: string;
}

// SpeakerDto - palestrante com informações da talk
export interface SpeakerDto {
  id: string;
  nome: string;
  email: string;
  talkTitle: string;
  isGDE: boolean;
}
```

O backend usa esses tipos como retorno dos endpoints. O frontend os importa para tipar as respostas HTTP. Os DTOs de criação (`CreateEventDto`, `CreateSpeakerDto`) implementam `Omit<Dto, 'id'>` com decorators do class-validator para validação automática.

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/login` | Login do organizador (retorna token) |
| POST | `/events` | Criar evento |
| GET | `/events` | Listar todos os eventos |
| GET | `/events/:id` | Buscar evento por ID |
| POST | `/cfp/submit` | Submeter proposta de palestra |
| GET | `/cfp` | Listar palestrantes |

## Telas da aplicação

```
┌─────────────────────────────────────────────────────────┐
│  Dashboard  Eventos  Palestras  +Criar Evento  +CFP  Sair │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │ Eventos (5)  │  │ Palestras(3) │                    │
│  │ • Evento A   │  │ • Talk X     │                    │
│  │   2026-12-31 │  │   João Silva │                    │
│  │ • Evento B   │  │ • Talk Y     │                    │
│  │   2026-11-15 │  │   Maria O.   │                    │
│  └──────────────┘  └──────────────┘                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Rotas:**
- `/login` — autenticação do organizador
- `/dashboard` — visão geral com contadores
- `/events` — lista de eventos cadastrados
- `/event/new` — formulário de criação (protegido por auth)
- `/talks` — lista de palestras submetidas
- `/cfp` — formulário de submissão de palestra

## Testes e2e

O projeto possui testes end-to-end em três níveis:

### Playwright (`frontend-e2e`)
Testes multi-browser (Chromium, Firefox, WebKit) para validação de UI.

```bash
npx nx run frontend-e2e:e2e
```

### Cypress (`frontend-cypress-e2e`)
Testes de fluxo completo com intercept de API e **AI-driven testing** usando `cy.prompt()` para interações semânticas.

```bash
npx nx run frontend-cypress-e2e:e2e
```

Exemplo de teste AI-driven:
```typescript
cy.prompt([
  'Type "Auditório Oracle" in the event name field',
  'Type "Av. Dr. Chucri Zaidan, SP" in the address field',
  'Click the button that submits or saves the event'
]);
cy.prompt(['Verify that a success message is visible']);
```

### API e2e (`api-e2e`)
Teste do endpoint raiz da API.

```bash
npx nx run api-e2e:e2e
```

## Como rodar

```bash
# Instalar dependências
npm install

# Rodar frontend (localhost:4200)
npx nx serve frontend

# Rodar backend
npx nx serve api

# Rodar todos os testes unitários
npx nx run-many -t test

# Rodar visualização do grafo Nx
npx nx graph
```

## Estrutura do monorepo

```
monorepo-angular-nx/
├── api/                    # Backend NestJS
├── api-e2e/                # Testes e2e da API
├── frontend/               # Frontend Angular 21
├── frontend-e2e/           # Testes Playwright
├── frontend-cypress-e2e/   # Testes Cypress
├── shared-types/           # DTOs compartilhados
├── packages/               # Bibliotecas reutilizáveis
└── openspec/               # Specs e changes do OpenSpec
```
