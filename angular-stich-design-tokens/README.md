# ui-design-prompts

Projeto gerado inteiramente via **prompts especialistas em UI** para criar uma aplicação bancária de Pix em Angular 21. O foco está em **Design Tokens** — variáveis CSS semânticas que definem o padrão visual da marca (cores, espaçamentos, tipografia) e são consumidas por todos os componentes.

Usamos modelos gerados com **Google Stitch** e **Figma** para criar interfaces de alta fidelidade, mas sempre respeitando os design tokens da marca. Nenhum componente usa cores absolutas — tudo é construído sobre `var(--color-primary)`, `var(--spacing-md)`, etc.

## Como funcionam os prompts

Cada arquivo na pasta `prompts/` é um prompt especialista que guia a IA em tarefas específicas:

| Arquivo | Descrição |
|---------|-----------|
| `prompt-nova-marca.txt` | Briefing textual da identidade visual (cores, fontes, espaçamentos) que serve como entrada para gerar os design tokens |
| `design-tokens-generator.md` | Gera o arquivo base de Design Tokens em CSS puro (variáveis semânticas como `--color-primary`, `--spacing-md`) a partir do briefing da marca |
| `prompt-angular.txt` | Cria a estrutura base do app Angular 21: layout com menu lateral, roteamento e componente de transferência Pix usando Signals |
| `a11y-component-generator.md` | Template para gerar componentes Angular acessíveis (WAI-ARIA, navegação por teclado) consumindo exclusivamente design tokens |
| `figma-to-angular.md` | Converte imagem de alta fidelidade do Figma em componente Angular, usando `@for` para listas e consumindo tokens (sem cores absolutas) |
| `componente-figma.txt` | Prompt curto que invoca o `figma-to-angular.md` para analisar uma imagem específica e criar o componente respeitando os tokens |
| `stitch-code-refactor.md` | Refatora código HTML/CSS bruto exportado do Google Stitch para Standalone Component Angular moderno, substituindo estilos por tokens |
| `refatoracao-stich.txt` | Prompt curto que invoca o `stitch-code-refactor.md` para refatorar arquivos específicos do Stitch |
| `correcao_css.md` | Ajustes de responsividade (mobile < 600px) e acessibilidade (contraste de cores) nos componentes |
| `adicionar-fluxo-comprovante.txt` | Integra o componente de comprovante na tela de transferência, usando `@if`/`@else` para alternar entre telas |
| `criacao-menu-extrato.txt` | Configura rota `/extrato` e adiciona link no menu lateral para o histórico de transações |

## O que a aplicação faz

A aplicação resultante é um app bancário de Pix com:

- **Transferência Pix**: formulário com campos para chave Pix, valor e data de agendamento
- **Validação de limite**: se o valor exceder R$ 5.000, exibe modal de erro
- **Comprovante**: após confirmação, exibe recibo com efeito 3D tilt e dados da transação
- **Extrato/Histórico**: lista de transações recentes (recebidas e enviadas) com ícones e formatação
- **Navegação**: menu lateral com links para "Pix" e "Extrato"
- **Responsividade**: menu colapsável em mobile (hambúrguer)

## Tecnologias

- Angular 21 (Standalone Components, Signals, Control Flow `@if`/`@for`)
- Design Tokens em CSS puro (Custom Properties)
- Google Stitch + Figma para geração de interfaces
- Material Symbols para ícones

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
