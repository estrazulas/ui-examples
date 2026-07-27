# CFP Submission

## Purpose

Enable speakers to submit talk proposals via a web form, with backend validation, shared DTO contracts, and WAI-ARIA accessibility.

## Requirements

### Requirement: Palestrante pode submeter proposta de palestra
O sistema SHALL permitir que um palestrante submeta uma proposta de palestra através de um formulário web, fornecendo nome, email, título da palestra e se é GDE (Google Developer Expert).

#### Scenario: Submissão bem-sucedida com todos os campos
- **WHEN** o palestrante preenche todos os campos obrigatórios (nome, email, título da palestra) e opcionais (isGDE) e clica em "Enviar"
- **THEN** o sistema envia os dados ao endpoint `POST /api/cfp/submit`, o servidor retorna status 201 com o objeto `SpeakerDto` contendo um `id` gerado, e o formulário exibe uma mensagem de sucesso

#### Scenario: Submissão com campos obrigatórios ausentes
- **WHEN** o palestrante não preenche um ou mais campos obrigatórios (nome, email, título da palestra)
- **THEN** o botão de envio permanece bloqueado (disabled) e cada campo inválido exibe uma mensagem de erro com `aria-describedby`

#### Scenario: Submissão em andamento bloqueia novo envio
- **WHEN** o palestrante clica em "Enviar" e a requisição HTTP está em andamento
- **THEN** o botão de envio permanece bloqueado (disabled) até que a resposta do servidor seja recebida

### Requirement: API valida payload de submissão
O backend SHALL validar estritamente o payload recebido no endpoint `POST /api/cfp/submit` e rejeitar requisições com dados inválidos.

#### Scenario: Payload válido retorna 201
- **WHEN** o servidor recebe um `POST /api/cfp/submit` com `{ "nome": "Fulano", "email": "fulano@example.com", "talkTitle": "Angular Signals", "isGDE": false }`
- **THEN** o servidor retorna HTTP 201 com o objeto `SpeakerDto` contendo `id` (UUID), `nome`, `email`, `talkTitle`, `isGDE`

#### Scenario: Payload sem campo obrigatório retorna 400
- **WHEN** o servidor recebe um `POST /api/cfp/submit` com `{ "email": "fulano@example.com", "talkTitle": "Angular Signals" }` (nome ausente)
- **THEN** o servidor retorna HTTP 400 com uma mensagem de erro indicando que `nome` é obrigatório

#### Scenario: Payload com email inválido retorna 400
- **WHEN** o servidor recebe um `POST /api/cfp/submit` com `{ "nome": "Fulano", "email": "invalido", "talkTitle": "Angular Signals", "isGDE": false }`
- **THEN** o servidor retorna HTTP 400 com uma mensagem de erro indicando que `email` deve ser um email válido

#### Scenario: Payload com tipo incorreto para isGDE retorna 400
- **WHEN** o servidor recebe um `POST /api/cfp/submit` com `{ "nome": "Fulano", "email": "fulano@example.com", "talkTitle": "Angular Signals", "isGDE": "sim" }`
- **THEN** o servidor retorna HTTP 400 com uma mensagem de erro indicando que `isGDE` deve ser booleano

### Requirement: Contrato SpeakerDto é compartilhado entre frontend e backend
O contrato de dados `SpeakerDto` definido na lib `@org/shared-types` SHALL ser a fonte única de verdade para a tipagem dos dados de palestrante, sendo consumido tanto pelo frontend quanto pelo backend.

#### Scenario: Frontend tipa resposta com SpeakerDto
- **WHEN** o serviço HTTP do frontend recebe a resposta do endpoint `POST /api/cfp/submit`
- **THEN** o tipo de retorno é `SpeakerDto` importado de `@org/shared-types`

#### Scenario: Backend usa SpeakerDto como tipo de retorno
- **WHEN** o controller do NestJS processa uma submissão válida
- **THEN** o tipo de retorno do método é `SpeakerDto` importado de `@org/shared-types`

### Requirement: Formulário é acessível via WAI-ARIA
O formulário de submissão SHALL expor atributos WAI-ARIA para garantir que leitores de tela possam navegar e interagir com todos os campos e mensagens de erro.

#### Scenario: Campos exibem atributos de acessibilidade
- **WHEN** o formulário é renderizado
- **THEN** cada campo de input possui `aria-label` descrevendo seu propósito, `aria-required="true"` para campos obrigatórios, e o elemento de erro possui um `id` referenciado por `aria-describedby` no input correspondente

#### Scenario: Erro de validação é anunciado por leitor de tela
- **WHEN** um campo obrigatório perde o foco sem ser preenchido
- **THEN** o atributo `aria-invalid="true"` é aplicado ao input e a mensagem de erro vinculada via `aria-describedby` é anunciada pelo leitor de tela
