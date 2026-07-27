## 1. Backend — DTO de validação

- [x] 1.1 Criar `api/src/app/cfp/dto/create-speaker.dto.ts` com classe `CreateSpeakerDto` implementando `Omit<SpeakerDto, 'id'>` e decorators `@IsString()`, `@IsNotEmpty()`, `@IsEmail()`, `@IsBoolean()` do `class-validator`
- [x] 1.2 Criar `api/src/app/cfp/dto/create-speaker.dto.spec.ts` com teste unitário garantindo que a classe rejeita payloads sem campos obrigatórios via `validate()` do `class-validator`

## 2. Backend — Serviço CfpService

- [x] 2.1 Criar `api/src/app/cfp/cfp.service.ts` com método `submit(dto: CreateSpeakerDto): SpeakerDto` que gera `id` via `crypto.randomUUID()`, armazena em um `Map<string, SpeakerDto>` e retorna o objeto completo
- [x] 2.2 Criar `api/src/app/cfp/cfp.service.spec.ts` com teste unitário Jest verificando que o `id` é gerado, o objeto retornado contém todos os campos do DTO, e o registro é armazenado no mapa

## 3. Backend — Controller e módulo

- [x] 3.1 Criar `api/src/app/cfp/cfp.controller.ts` com endpoint `POST /cfp/submit` decorado com `@Post('submit')`, usando `@Body()` com `CreateSpeakerDto` e retornando `SpeakerDto` com status 201 via `@HttpCode(201)`
- [x] 3.2 Criar `api/src/app/cfp/cfp.module.ts` registrando `CfpController` e `CfpService`
- [x] 3.3 Registrar `CfpModule` em `api/src/app/app.module.ts`
- [x] 3.4 Criar `api/src/app/cfp/cfp.controller.spec.ts` com testes Jest: (a) payload válido retorna 201 com `SpeakerDto` contendo `id`, (b) payload sem `nome` retorna 400, (c) payload com `email` inválido retorna 400, (d) payload com `isGDE` como string retorna 400

## 4. Frontend — Serviço HTTP

- [x] 4.1 Criar `frontend/src/app/cfp/cfp.service.ts` com método `submit(speaker: Omit<SpeakerDto, 'id'>): Observable<SpeakerDto>` usando `HttpClient.post()`
- [x] 4.2 Garantir que `HttpClient` está disponível via `provideHttpClient()` em `app.config.ts`

## 5. Frontend — Componente de formulário

- [x] 5.1 Criar `frontend/src/app/cfp/cfp-form.component.ts` como standalone component com Signals (`nome`, `email`, `talkTitle`, `isGDE`, `isSubmitting`, `submitted`, `errorMessage`) e `computed()` para `isFormValid` e `isSubmitDisabled`
- [x] 5.2 Criar `frontend/src/app/cfp/cfp-form.component.html` com formulário contendo inputs para nome, email, talkTitle, checkbox isGDE, botão submit, e atributos WAI-ARIA (`aria-label`, `aria-required`, `aria-invalid`, `aria-describedby`)
- [x] 5.3 Criar `frontend/src/app/cfp/cfp-form.component.css` com estilos mínimos funcionais
- [x] 5.4 Adicionar rota `/cfp` em `frontend/src/app/app.routes.ts` apontando para `CfpFormComponent`

## 6. Frontend — Testes unitários

- [x] 6.1 Criar `frontend/src/app/cfp/cfp-form.component.spec.ts` com teste Vitest/Angular: (a) estado inicial — todos os signals começam vazios, `isFormValid` é `false`, `isSubmitDisabled` é `false`, (b) botão de envio fica `disabled` quando formulário inválido, (c) botão de envio fica `disabled` durante `isSubmitting`

## 7. Integração e verificação

- [x] 7.1 Executar `npm exec nx test api` para validar todos os testes do backend
- [x] 7.2 Executar `npm exec nx test frontend` para validar todos os testes do frontend
- [x] 7.3 Executar `npm exec nx lint api` e `npm exec nx lint frontend` para garantir qualidade de código
- [x] 7.4 Executar `npm exec nx build api` e `npm exec nx build frontend` para garantir que ambos compilam sem
