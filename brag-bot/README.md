# BragBot

Aplicação Angular 21 com Tailwind CSS v4 que permite descrever conquistas profissionais e gerar cards estruturados com Contexto, Impacto, Métricas e Tecnologias.

## Setup

### Instalar Angular CLI e criar projeto
```bash
npm install -g @angular/cli && ng new brag-bot --ssr --style=css --routing
```

### Instalar dependências do projeto
```bash
cd brag-bot && npm install
```

### Instalar Tailwind CSS v4
```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

### Instalar Genkit
```bash
npm install genkit @genkit-ai/compat-oai dotenv
```

### Configurar MCP (opencode.jsonc)
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "genkit": {
      "type": "local",
      "command": ["npx", "-y", "genkit-cli@1.40.1", "mcp", "--explicitProjectRoot", "--no-update-notification", "--non-interactive"],
      "cwd": ".",
      "enabled": true
    },
    "angular-cli": {
      "type": "local",
      "command": ["npx", "-y", "@angular/cli", "mcp"],
      "enabled": true
    }
  }
}
```

### Variáveis de ambiente
Crie um `.env` na raiz:
```
OPENAI_API_KEY=sua-chave-aqui
```

## Prompt (Spec 02)

```
Spec 02: Interface Visual UNIPDS e Mock de Dados
Contexto: Projeto Angular 21 com Tailwind CSS. O Genkit e o MCP já estão instalados.

Objetivos de Interface e Roteamento:
1. Acesse https://unipds.com.br/org-pos-ia/ e extraia a identidade visual.
2. Crie dois componentes standalone: `DashboardComponent` e `DetailComponent`. Configure o `app.routes.ts` para navegar entre eles (rota padrão para dashboard e `/detail/:id` para o detalhe).
3. Crie um `BragService` usando Angular Signals. Ele deve ter:
   - Um sinal `brags` que guarda um array de conquistas.
   - Um sinal `loading` (boolean).
   - Um método `generateMockBrag(prompt: string)` que simula uma chamada de rede (ex: `setTimeout` de 1.5s), ativa o loading, e depois adiciona um objeto JSON mockado estático (com Título, Contexto, Impacto e Tecnologias) na lista de `brags`.
4. No `DashboardComponent` (HTML):
   - Crie um Header com o título "Brag-Bot | Pós IA UNIPDS".
   - Crie um formulário com um `<textarea>` para a conquista bruta e um botão "Destilar Conquista". O botão deve mostrar um spinner ou mudar de texto enquanto `loading` for true.
   - Abaixo do formulário, use o laço `@for` do Angular para renderizar os "cards" das conquistas geradas. Cada card deve ser clicável, redirecionando para o `DetailComponent`.
5. No `DetailComponent` (HTML):
   - Renderize os detalhes completos da conquista (Contexto, Impacto, Métricas e Tecnologias) com um layout de leitura agradável. Adicione um botão para "Voltar ao Dashboard".
```

## Comandos

### Desenvolvimento
```bash
npm start
```
Abre em `http://localhost:4200/` com hot reload.

### Build de produção
```bash
npm run build
```
Output em `dist/brag-bot/`.

### Servir build de produção
```bash
npm run serve:ssr:brag-bot
```
Roda em `http://localhost:4000/` com SSR.

### Testes
```bash
npm test
```

## Estrutura
```
src/app/
├── brag.service.ts          # Service com signals e mock
├── dashboard/
│   ├── dashboard.component.ts
│   └── dashboard.component.html
├── detail/
│   ├── detail.component.ts
│   └── detail.component.html
├── app.ts                   # Router outlet
├── app.routes.ts            # Rotas: / e /detail/:id
└── app.routes.server.ts     # SSR render modes
```

## Stack
- Angular 21 (standalone components, signals)
- Tailwind CSS v4
- Genkit + OpenAI (gpt-5.5)
- TypeScript
