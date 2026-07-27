# Genkit MCP - Como usar

## Iniciar runtime
```
genkit_start_runtime
  command: npx
  args: ["tsx", "src/genkit.ts"]
  projectRoot: /home/estrazulas/git/ui-examples/brag-bot
```

## Listar flows disponíveis
```
genkit_list_flows
  projectRoot: /home/estrazulas/git/ui-examples/brag-bot
```

## Executar um flow
```
genkit_run_flow
  flowName: helloFlow
  input: "seu prompt aqui"
  projectRoot: /home/estrazulas/git/ui-examples/brag-bot
```

## Parar runtime
```
genkit_kill_runtime
  projectRoot: /home/estrazulas/git/ui-examples/brag-bot
```

## Configuração
- `.env` contém `OPENAI_API_KEY`
- `src/genkit.ts` tem `import 'dotenv/config'` para carregar o env automaticamente
- Modelo atual: `gpt-5.5` via `@genkit-ai/compat-oai/openai`
