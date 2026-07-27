## 1. Shared Types

- [x] 1.1 Criar interface `EventDto` em `shared-types/src/lib/event-dto.ts` com campos: id, nome, endereco, capacidade, data
- [x] 1.2 Exportar `EventDto` no `index.ts` da lib `shared-types`

## 2. Backend - Events API

- [x] 2.1 Criar `EventsService` no NestJS com array em memoria e metodos: create, findAll, findOne
- [x] 2.2 Criar `EventsController` com endpoints: POST /api/events, GET /api/events, GET /api/events/:id
- [x] 2.3 Adicionar validacao de payload no controller (nome, endereco, capacidade, data obrigatorios)
- [x] 2.4 Registrar `EventsModule` no `AppModule`

## 3. Backend - Speakers API (listagem)

- [x] 3.1 Criar `SpeakersService` com array em memoria e metodo findAll
- [x] 3.2 Criar `SpeakersController` com endpoint GET /api/cfp
- [x] 3.3 Migrar logica do CFP existente para o service (salvar submissions no array)

## 4. Backend - Auth

- [x] 4.1 Criar constante `ORGANIZER` com credenciais hardcoded (email: org@test.com, senha: 123456)
- [x] 4.2 Criar `AuthController` com endpoint POST /api/auth/login
- [x] 4.3 Implementar validacao de credenciais e retorno de token fake

## 5. Frontend - Event Form

- [x] 5.1 Criar `EventFormComponent` em `frontend/src/app/events/event-form/`
- [x] 5.2 Implementar Reactive Forms com FormControl/FormGroup e signals para estado
- [x] 5.3 Adicionar campos: nome, endereco, capacidade, data com validacao required
- [x] 5.4 Copiar CSS do CFP (.glass-card, .form-group, .submit-btn, etc.) para event-form.component.css
- [x] 5.5 Implementar submit com POST para /api/events e exibicao de mensagem de sucesso
- [x] 5.6 Criar `EventService` com metodo createEvent

## 6. Frontend - Event List

- [x] 6.1 Criar `EventListComponent` em `frontend/src/app/events/event-list/`
- [x] 6.2 Implementar GET /api/events e exibicao da lista de eventos
- [x] 6.3 Adicionar estado vazio ("Nenhum evento cadastrado")

## 7. Frontend - Talk List

- [x] 7.1 Criar `TalkListComponent` em `frontend/src/app/talks/talk-list/`
- [x] 7.2 Implementar GET /api/cfp e exibicao da lista de palestras
- [x] 7.3 Adicionar estado vazio ("Nenhuma palestra submetida")

## 8. Frontend - Dashboard

- [x] 8.1 Criar `DashboardComponent` em `frontend/src/app/dashboard/`
- [x] 8.2 Implementar painel de eventos (total + ultimos eventos)
- [x] 8.3 Implementar painel de palestras (total + ultimas palestras)

## 9. Frontend - Auth

- [x] 9.1 Criar `LoginComponent` em `frontend/src/app/auth/login/`
- [x] 9.2 Implementar formulario de login (email + senha) com POST /api/auth/login
- [x] 9.3 Criar `AuthService` com metodo login e signal para token (salvar em localStorage)
- [x] 9.4 Criar `authGuard` para proteger rotas autenticadas

## 10. Frontend - Navigation & Routes

- [x] 10.1 Atualizar `app.routes.ts` com rotas: /login, /event/new, /events, /talks, /dashboard, /cfp
- [x] 10.2 Aplicar authGuard na rota /event/new
- [x] 10.3 Atualizar menu de navegacao no app.component com links: Eventos, Palestras, Dashboard

## 11. Integracao

- [x] 11.1 Verificar proxy/redirect de /api no angular.json ou proxy.conf.json
- [ ] 11.2 Testar fluxo completo: login → /event/new → criar evento → /events → ver na lista
- [ ] 11.3 Testar dashboard com dados de eventos e palestras
