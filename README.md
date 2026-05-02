# Elementor AI Builder

Projeto de engenharia aplicado a marketing digital que transforma um briefing textual em um JSON pronto para importação no Elementor, com foco em confiabilidade, previsibilidade e velocidade de entrega.

## Visão Executiva

O desafio central deste projeto é reduzir falhas comuns de soluções baseadas em IA para geração de páginas, principalmente erros de estrutura, inconsistência de conteúdo e baixa compatibilidade com o WordPress.

A solução implementa uma arquitetura orientada a contratos:

1. A IA gera apenas conteúdo estratégico em JSON estrito.
2. O servidor aplica esse conteúdo em templates controlados.
3. Uma validação local garante integridade do documento final antes da entrega.

Resultado prático: saída estável, importável e adequada para uso real.

## Problema de Negócio

Times de tráfego e design precisam produzir landing pages em ritmo alto, mas o ciclo briefing, copy, layout e publicação costuma ser lento.

Este projeto acelera esse ciclo ao entregar um arquivo pronto para Elementor, preservando qualidade mínima de copy, padronização visual e segurança estrutural.

## Arquitetura da Solução

A arquitetura separa claramente geração de texto e montagem estrutural:

1. Camada de entrada: `POST /generate` recebe `prompt`, `model` e `template`.
2. Camada de IA: chamada à OpenAI com `response_format` baseado em JSON Schema estrito.
3. Camada de composição: mapeamento do conteúdo para templates `simple`, `premium` e `minimal`.
4. Camada de validação: verificação de regras críticas do documento Elementor.
5. Camada de entrega: resposta como arquivo JSON para download e importação.

## Diferenciais Técnicos

1. Contrato estrito de dados com `additionalProperties: false` para reduzir variação indesejada.
2. Fallbacks de conteúdo para manter robustez quando algum campo vier incompleto.
3. Geração de IDs únicos com `randomUUID` para evitar colisão no ecossistema WordPress.
4. Whitelist de widgets permitidos para reforçar integridade da estrutura.
5. Validação local profunda da hierarquia `section`, `column`, `widget` antes da resposta.
6. Backend stateless com CORS aberto para facilitar integração com ferramentas externas.

## Stack e Decisões

1. Node.js com ESM para código moderno e simples de manter.
2. Express 5 para API enxuta e clara.
3. `node-fetch` para integração explícita com a OpenAI.
4. `dotenv` para configuração por ambiente.
5. Frontend leve em HTML, CSS e JavaScript puro para reduzir complexidade e acelerar testes.

## Estrutura do Projeto

```text
src/
  app.js
  server.js
  config/env.js
  routes/generate.route.js
  services/openai.service.js
  lib/elementor.js
  lib/prompt.js
  lib/schema.js
  templates/simple.js
  templates/premium.js
  templates/minimal.js
public/
  index.html
  style.css
  app.js
scripts/
  smoke-test.js
```

## Como Executar

1. Instale dependências.

```bash
npm install
```

2. Configure variáveis de ambiente.

```bash
cp .env.example .env
```

3. Defina sua chave no arquivo `.env`.

```env
OPENAI_API_KEY=sua_chave_aqui
PORT=3333
```

4. Inicie em desenvolvimento.

```bash
npm run dev
```

5. Ou rode em modo produção local.

```bash
npm start
```

## API

### `POST /generate`

Request body:

```json
{
  "prompt": "Landing page para nutricionista com foco em emagrecimento saudável",
  "template": "premium",
  "model": "gpt-4o-mini"
}
```

Resposta de sucesso:

1. `Content Type: application/json`
2. `Content Disposition` com nome de arquivo para download
3. Documento Elementor válido para importação

Possíveis erros:

1. `400` quando o `prompt` não é enviado.
2. `500` quando `OPENAI_API_KEY` não está configurada.
3. `502` quando o JSON não passa na validação local.

## Teste de Fumaça

Valida o fluxo completo de geração e validação em linha de comando:

```bash
npm run smoke
```

Exemplo com parâmetros:

```bash
node scripts/smoke-test.js "landing page para clínica" "gpt-4o-mini" "simple"
```

## Relatório de Testes

Data da execução: 02 de maio de 2026

Escopo executado:

1. Teste de integração ponta a ponta com OpenAI e montagem de JSON Elementor.
2. Teste de validação local do documento Elementor (`validateElementorDocument`).
3. Teste de geração com variação de templates (`default`, `premium`, `minimal`).

Comandos executados:

```bash
npm run smoke
node scripts/smoke-test.js "landing page para consultoria de carreira" "gpt-4o-mini" "premium"
node scripts/smoke-test.js "landing page para curso de ingles" "gpt-4o-mini" "minimal"
node -e "import('./src/lib/elementor.js').then(m=>{const doc={title:'t',type:'page',version:'0.4',page_settings:[],content:[{id:'1',elType:'section',isInner:false,settings:{},elements:[{id:'2',elType:'column',isInner:false,settings:{_column_size:100},elements:[{id:'3',elType:'widget',widgetType:'heading',isInner:false,settings:{title:'ok'},elements:[]}]}]}]};const errs=m.validateElementorDocument(doc);console.log('validator_test',errs.length===0?'PASS':'FAIL',errs.length);}).catch(e=>{console.error(e);process.exit(1);});"
```

Resultado:

1. `PASS` em todos os cenários executados.
2. `validation.valid: true` nos testes de smoke com geração real.
3. `validator_test PASS 0` no teste direto de validador estrutural.

## Competências Demonstradas

1. Design de API com contrato claro.
2. Engenharia de prompt com saída estruturada.
3. Tratamento de erro orientado a diagnóstico.
4. Programação defensiva com validação de integridade.
5. Organização modular para facilitar evolução do produto.
6. Entrega de solução aplicada a cenário real de negócio.

## Roadmap Técnico

1. Suite de testes automatizados para validação de contratos e templates.
2. Observabilidade com logs estruturados e métricas de falha por etapa.
3. Suporte a mais blocos do Elementor e novos padrões de seção.
4. Modo multi idioma para geração de páginas internacionais.
5. Persistência opcional de versões para auditoria de conteúdo.

## Licença

ISC
