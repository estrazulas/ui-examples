## Context

O workspace é um monorepo Nx com quatro projetos: `frontend` (Angular 21 standalone), `api` (NestJS 11), `frontend-e2e` (Playwright) e `api-e2e` (Jest). A lib `@org/shared-types` já exporta a interface `SpeakerDto` usada como contrato de dados. O workspace está em estado de scaffold — sem features implementadas. O proxy de desenvolvimento do frontend já redireciona `/api` para `localhost:3333`.

## Goals / Non-Goals

**Goals:**
- Criar endpoint `POST /api/cfp/submit` no NestJS que valide o payload com `class-validator`, retorne 201 no sucesso e 400 para payloads inválidos
- Criar componente standalone `CfpFormComponent` no Angular com formulário reativo gerenciado por Signals
- Ambos os lados devem consumir o contrato `SpeakerDto` da lib `shared-types`
- Testes unitários obrigatórios: NestJS (payload inválido → 400) e Angular (estado inicial do Signal + bloqueio do botão de envio)
- Acessibilidade: atributos WAI-ARIA (`aria-label`, `aria-required`, `aria-invalid`, `aria-describedby`) nos campos do formulário

**Non-Goals:**
- Persistência em banco de dados (os dados serão armazenados em memória)
- Autenticação/autorização no endpoint
- Listagem ou gestão de palestras submetidas (apenas submissão)
- Design system completo — estilo mínimo funcional
- Integração com serviço de email ou notificações

## Decisions

### 1. DTO de entrada: `CreateSpeakerDto` implementando `Omit<SpeakerDto, 'id'>`

**Decisão:** Criar na API uma classe `CreateSpeakerDto` com decorators do `class-validator` que implementa `Omit<SpeakerDto, 'id'>`. O `id` é gerado pelo servidor no momento da submissão.

**Alternativa considerada:** Modificar `SpeakerDto` na lib `shared-types` para ser uma classe com decorators. Rejeitada porque poluiria a lib compartilhada com dependência de `class-validator` que não é necessária no frontend.

**Justificativa:** Mantém o contrato `SpeakerDto` puro (interface TypeScript) na lib compartilhada e isola a lógica de validação apenas no backend.

### 2. Gestão de estado no frontend com Signals

**Decisão:** Usar `signal()` para cada campo do formulário e `computed()` para derivar o estado de validade do formulário e bloqueio do botão de envio.

**Alternativa considerada:** `FormGroup` do `@angular/forms` com `ReactiveFormsModule`. Rejeitada porque o requisito pede explicitamente Signals.

**Justificativa:** Signals são o padrão moderno do Angular 21, alinham-se com Zone-less/OnPush e são mais previsíveis para testes.

### 3. Validação no backend com `class-validator` + `ValidationPipe` global

**Decisão:** Aproveitar o `ValidationPipe` configurado globalmente no `main.ts` (já incluso no scaffold NestJS) e aplicar decorators como `@IsString()`, `@IsEmail()`, `@IsNotEmpty()`, `@IsBoolean()` na `CreateSpeakerDto`.

**Justificativa:** Já existe suporte nativo no NestJS. Não requer bibliotecas adicionais.

### 4. ID gerado no servidor como UUID v4

**Decisão:** Usar `crypto.randomUUID()` (nativo do Node.js 19+) para gerar o `id` do palestrante.

**Alternativa considerada:** UUID via pacote `uuid`. Rejeitada porque `crypto.randomUUID()` está disponível nativamente e não requer dependência extra.

### 5. Estrutura de diretórios no backend

**Decisão:** Criar módulo `cfp` em `api/src/app/cfp/` com a seguinte estrutura:

```
api/src/app/cfp/
├── cfp.module.ts
├── cfp.controller.ts
├── cfp.service.ts
├── cfp.controller.spec.ts
├── cfp.service.spec.ts
└── dto/
    └── create-speaker.dto.ts
```

**Estrutura de diretórios no frontend:**

```
frontend/src/app/cfp/
├── cfp-form.component.ts
├── cfp-form.component.html
├── cfp-form.component.css
├── cfp-form.component.spec.ts
└── cfp.service.ts
```

### 6. Comunicação HTTP do frontend

**Decisão:** Usar `HttpClient` do Angular com um serviço `CfpService` injetável. O proxy de desenvolvimento (`proxy.conf.json`) já encaminha `/api` para `localhost:3333`.

## Risks / Trade-offs

- **[Risco] Armazenamento em memória perde dados ao reiniciar o servidor** → Mitigação: Documentado como non-goal. A feature atual foca na submissão, não na persistência.
- **[Risco] Sem autenticação, qualquer pessoa pode submeter** → Mitigação: Documentado como non-goal. Autenticação será adicionada em feature futura.
- **[Trade-off] `CreateSpeakerDto` duplica parcialmente os campos de `SpeakerDto`** → Aceito para manter a pureza da lib compartilhada e isolar validação no backend.
