## Why

O projeto possui apenas o formulario CFP para submissao de palestras, mas nao ha gerenciamento de eventos. E necessario criar a funcionalidade de cadastro de eventos para que organizadores possam criar eventos e, futuramente, vincular palestras a eles. O sistema tambem precisa de um dashboard para visualizacao dos dados e navegacao entre as secoes.

## What Changes

- Criar `EventDto` na lib `@org/shared-types` com campos: id, nome, endereco, capacidade, data
- Implementar endpoints no backend NestJS:
  - `POST /api/events` - criar evento
  - `GET /api/events` - listar eventos
  - `GET /api/events/:id` - detalhar evento
  - `POST /api/auth/login` - login do organizador
  - `GET /api/cfp` - listar palestras
- Armazenamento em memoria (arrays) no backend
- Organizador hardcoded para testes (email/senha fixos)
- Criar componente `EventFormComponent` em `/event/new` com Reactive Forms + Signals
- Reutilizar design tokens do CFP (glass-card, cores, classes)
- Criar componentes de listagem: `EventListComponent` (/events) e `TalkListComponent` (/talks)
- Criar `DashboardComponent` com paineis de eventos e palestras
- Atualizar menu de navegacao: Eventos / Palestras / Dashboard
- Implementar auth simples (login + guard para proteger /event/new)

## Capabilities

### New Capabilities
- `event-dto`: Contrato de dados EventDto em shared-types
- `event-api`: Endpoints REST para CRUD de eventos no backend
- `event-form`: Formulario de criacao de eventos com Reactive Forms + Signals
- `event-list`: Listagem de eventos cadastrados
- `talk-list`: Listagem de palestras submetidas
- `dashboard`: Painel com resumo de eventos e palestras
- `navigation`: Menu de navegacao atualizado
- `auth-simple`: Autenticacao simplificada para organizador

### Modified Capabilities

## Impact

- `shared-types`: Novo EventDto adicionado
- `api`: Novos controllers e services para events e auth; storage em memoria
- `frontend`: Novos componentes (EventForm, EventList, TalkList, Dashboard, Login)
- `frontend`: Atualizacao do menu de navegacao (app.component)
- `frontend`: Novas rotas e guards de autenticacao
- Design tokens reutilizados do CFP para consistencia visual
