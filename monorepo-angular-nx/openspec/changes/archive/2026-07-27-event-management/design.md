## Context

O projeto e um sistema de gerenciamento de conferencias com:
- Frontend Angular (standalone components, signals)
- Backend NestJS
- Shared-types para contratos de dados
- CFP existente com template-driven forms

O CFP permite que palestrantes submetam propostas. Agora precisamos adicionar gerenciamento de eventos para organizadores.

## Goals / Non-Goals

**Goals:**
- Criar EventDto em shared-types (id, nome, endereco, capacidade, data)
- Implementar API REST para eventos (POST, GET, GET/:id)
- Armazenamento em memoria (arrays) no backend
- Organizador hardcoded para testes (sem CRUD de usuarios)
- Formulario /event/new com Reactive Forms + Signals
- Reutilizar design tokens do CFP (glass-card, cores)
- Listagem de eventos (/events) e palestras (/talks)
- Dashboard com paineis de eventos e palestras
- Menu de navegacao: Eventos / Palestras / Dashboard
- Auth simples (login + guard)

**Non-Goals:**
- CRUD completo de usuarios/organizadores
- Persistencia em banco de dados
- Vinculo entre palestras e eventos (futuro)
- Autorizacao por papel (roles)
- Validação complexa de capacidade vs palestras

## Decisions

**1. EventDto em shared-types**
- **Decisao**: Criar EventDto com { id: string, nome: string, endereco: string, capacidade: number, data: string }
- **Racional**: Mantem padrao do SpeakerDto, permite tipagem compartilhada entre frontend e backend
- **Alternativa**: Adicionar campos ao SpeakerDto — rejeitada, sao entidades diferentes

**2. Armazenamento em memoria**
- **Decisao**: Usar arrays no service do NestJS (const events: EventDto[] = [])
- **Racional**: Simples, sem dependencias, suficiente para MVP/testes
- **Alternativa**: JSON file ou SQLite — rejeitada, adiciona complexidade desnecessaria agora

**3. Organizador hardcoded**
- **Decisao**: Constante no backend com { id: 'org-001', nome: 'Organizador Teste', email: 'org@test.com', senha: '123456' }
- **Racional**: Atende requisito de "nao querer CRUD de usuarios", permite testes
- **Alternativa**: Seed em arquivo JSON — rejeitada, mesma complexidade sem beneficio

**4. Auth simples**
- **Decisao**: POST /api/auth/login retorna token fake (string fixa). Frontend guarda em localStorage e envia como header. Backend valida token (string match). Guard no frontend protege /event/new.
- **Racional**: Simples, funcional para testes, sem JWT real
- **Alternativa**: Session com cookie — rejeitada, mais complexo; Sem auth — rejeitada, usuario pediu login

**5. Reactive Forms para EventForm**
- **Decisao**: Usar Reactive Forms + Signals (FormControl signal-based)
- **Racional**: Usuario especificou Reactive Forms; mais testavel que template-driven
- **Alternativa**: Template-driven como CFP — rejeitada, usuario pediu Reactive Forms

**6. Design tokens reutilizados**
- **Decisao**: Copiar classes CSS do CFP (.glass-card, .form-group, .submit-btn, etc.) para EventForm
- **Racional**: Garante consistencia visual sem criar design system compartilhado
- **Alternativa**: Extrair para lib de componentes — rejeitada, over-engineering para MVP

**7. Menu de navegacao**
- **Decisao**: Atualizar app.component com links: Eventos / Palestras / Dashboard
- **Racional**: Usuario especificou exatamente esses 3 itens no menu
- **Alternativa**: Incluir CFP no menu — rejeitada, usuario nao pediu

**8. Dashboard com 2 paineis**
- **Decisao**: DashboardComponent com painel de eventos (total + ultimos) e painel de palestras (total + ultimas)
- **Racional**: Usuario especificou "painel para eventos cadastrados e outro para palestras"
- **Alternativa**: Graficos/charts — rejeitada, complexidade desnecessaria

## Risks / Trade-offs

- [Arrays em memoria perdem dados ao reiniciar] → Aceitavel para MVP. Migracao para DB futura.
- [Token fake nao e seguro] → Aceitavel para testes/desenvolvimento. Producao exigiria JWT real.
- [Organizador unico hardcoded] → Limita testes de multi-organizador. Aceitavel para MVP.
- [CSS copiado entre componentes] → Duplicacao, mas garante consistencia visual rapida. Refatorar para design system se crescer.
- [Reactive Forms vs Template-driven] → Inconsistencia com CFP, mas atende requisito do usuario.
- [Sem vinculo Event ↔ Speaker] → Palestras sao independentes dos eventos por enquanto. Vinculo sera adicionado em change futuro se necessario.
