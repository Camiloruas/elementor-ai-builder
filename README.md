# Elementor AI Builder

Projeto de engenharia aplicado a marketing digital que transforma um briefing textual em um JSON pronto para importação no Elementor, com foco em confiabilidade, previsibilidade e velocidade de entrega.

## Demonstração da Ferramenta

Quer ver o fluxo completo funcionando na prática?

1. Assista ao vídeo: [Ver demonstração](https://youtu.be/2eF25U2IRqg)
2. Link curto para compartilhar: `youtu.be/2eF25U2IRqg`

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
﻿# Elementor AI Builder

Escolha o idioma:
[Português](#portugues) | [English](#english)

## Portugues

Projeto de engenharia aplicado a marketing digital que transforma um briefing textual em um JSON pronto para importação no Elementor, com foco em confiabilidade, previsibilidade e velocidade de entrega.

### Demonstracao do Projeto

Veja o projeto funcionando na pratica:

[Assistir no YouTube](https://www.youtube.com/watch?v=2eF25U2IRqg)

### Visão Executiva

O desafio central deste projeto é reduzir falhas comuns de soluções baseadas em IA para geração de páginas, principalmente erros de estrutura, inconsistência de conteúdo e baixa compatibilidade com o WordPress.

A solução implementa uma arquitetura orientada a contratos:

1. A IA gera apenas conteúdo estratégico em JSON estrito.
2. O servidor aplica esse conteúdo em templates controlados.
3. Uma validação local garante integridade do documento final antes da entrega.

Resultado prático: saída estável, importável e adequada para uso real.

### Problema de Negócio

Times de tráfego e design precisam produzir landing pages em ritmo alto, mas o ciclo briefing, copy, layout e publicação costuma ser lento.

Este projeto acelera esse ciclo ao entregar um arquivo pronto para Elementor, preservando qualidade mínima de copy, padronização visual e segurança estrutural.

### Arquitetura da Solução

A arquitetura separa claramente geração de texto e montagem estrutural:

1. Camada de entrada: `POST /generate` recebe `prompt`, `model` e `template`.
2. Camada de IA: chamada à OpenAI com `response_format` baseado em JSON Schema estrito.
3. Camada de composição: mapeamento do conteúdo para templates `simple`, `premium` e `minimal`.
4. Camada de validação: verificação de regras críticas do documento Elementor.
5. Camada de entrega: resposta como arquivo JSON para download e importação.

### Diferenciais Técnicos

1. Contrato estrito de dados com `additionalProperties: false` para reduzir variação indesejada.
2. Fallbacks de conteúdo para manter robustez quando algum campo vier incompleto.
3. Geração de IDs únicos com `randomUUID` para evitar colisão no ecossistema WordPress.
4. Whitelist de widgets permitidos para reforçar integridade da estrutura.
5. Validação local profunda da hierarquia `section`, `column`, `widget` antes da resposta.
6. Backend stateless com CORS aberto para facilitar integração com ferramentas externas.

### Stack e Decisões

1. Node.js com ESM para código moderno e simples de manter.
2. Express 5 para API enxuta e clara.
3. `node-fetch` para integração explícita com a OpenAI.
4. `dotenv` para configuração por ambiente.
5. Frontend leve em HTML, CSS e JavaScript puro para reduzir complexidade e acelerar testes.

### Estrutura do Projeto

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

### Como Executar

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

### API

#### `POST /generate`

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

### Smoke Test

Valida o fluxo completo de geração e validação em linha de comando:

```bash
npm run smoke
```

Exemplo com parâmetros:

```bash
node scripts/smoke-test.js "landing page para clínica" "gpt-4o-mini" "simple"
```

### Relatório de Testes

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
2. `validation.valid: true` in smoke tests with real generation.
3. `validator_test PASS 0` no teste direto de validador estrutural.

### Competências Demonstradas

1. Design de API com contrato claro.
2. Engenharia de prompt com saída estruturada.
3. Tratamento de erro orientado a diagnóstico.
4. Programação defensiva com validação de integridade.
5. Organização modular para facilitar evolução do produto.
6. Entrega de solução aplicada a cenário real de negócio.

### Roadmap Técnico

1. Suite de testes automatizados para validação de contratos e templates.
2. Observabilidade com logs estruturados e métricas de falha por etapa.
3. Suporte a mais blocos do Elementor e novos padrões de seção.
4. Modo multi idioma para geração de páginas internacionais.
5. Persistência opcional de versões para auditoria de conteúdo.

### Contribuição

Contribuições são bem vindas para melhorias de arquitetura, experiência de uso, qualidade de código e cobertura de testes.

Fluxo sugerido:

1. Faça um fork do projeto.
2. Crie uma branch para sua melhoria.
3. Abra um Pull Request com descrição clara do problema e da solução.

### Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para todos os detalhes.

### Autor

Camiloruas  
Contato: miloruas@gmail.com

## English

Engineering project applied to digital marketing that transforms a text brief into JSON ready for Elementor import, focused on reliability, predictability, and delivery speed.

### Project Demo

See the project in action:

[Watch on YouTube](https://www.youtube.com/watch?v=2eF25U2IRqg)

### Executive Overview

The core challenge of this project is reducing common failures in AI based page generation solutions, especially structure errors, content inconsistency, and low WordPress compatibility.

The solution uses a contract driven architecture:

1. The AI generates only strategic content in strict JSON.
2. The server applies this content to controlled templates.
3. Local validation guarantees final document integrity before delivery.

Practical result: stable output, importable format, and real world usability.

### Business Problem

Traffic and design teams need to produce landing pages at high speed, but the brief, copy, layout, and publishing cycle is often slow.

This project accelerates that cycle by delivering a file ready for Elementor while preserving minimum copy quality, visual standardization, and structural safety.

### Solution Architecture

The architecture clearly separates text generation from structural assembly:

1. Input layer: `POST /generate` receives `prompt`, `model`, and `template`.
2. AI layer: OpenAI call using `response_format` based on strict JSON Schema.
3. Composition layer: content mapping into `simple`, `premium`, and `minimal` templates.
4. Validation layer: critical Elementor document rule checks.
5. Delivery layer: response as JSON file for download and import.

### Technical Differentiators

1. Strict data contract with `additionalProperties: false` to reduce unwanted variation.
2. Content fallbacks to keep robustness when fields are incomplete.
3. Unique ID generation with `randomUUID` to avoid collisions in the WordPress ecosystem.
4. Allowed widget whitelist to reinforce structure integrity.
5. Deep local validation of `section`, `column`, `widget` hierarchy before response.
6. Stateless backend with open CORS for easier integration with external tools.

### Stack and Decisions

1. Node.js with ESM for modern and maintainable code.
2. Express 5 for a lean and clear API.
3. `node-fetch` for explicit OpenAI integration.
4. `dotenv` for environment based configuration.
5. Lightweight frontend in HTML, CSS, and vanilla JavaScript to reduce complexity and speed up tests.

### Project Structure

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

### How to Run

1. Install dependencies.

```bash
npm install
```

2. Configure environment variables.

```bash
cp .env.example .env
```

3. Set your key in the `.env` file.

```env
OPENAI_API_KEY=your_key_here
PORT=3333
```

4. Start in development mode.

```bash
npm run dev
```

5. Or run in local production mode.

```bash
npm start
```

### API

#### `POST /generate`

Request body:

```json
{
  "prompt": "Landing page for a nutritionist focused on healthy weight loss",
  "template": "premium",
  "model": "gpt-4o-mini"
}
```

Successful response:

1. `Content Type: application/json`
2. `Content Disposition` with download filename
3. Valid Elementor document for import

Possible errors:

1. `400` when `prompt` is missing.
2. `500` when `OPENAI_API_KEY` is not configured.
3. `502` when JSON does not pass local validation.

### Smoke Test

Validates the full generation and validation flow in command line:

```bash
npm run smoke
```

Example with parameters:

```bash
node scripts/smoke-test.js "landing page for clinic" "gpt-4o-mini" "simple"
```

### Test Report

Execution date: May 2, 2026

Executed scope:

1. End to end integration test with OpenAI and Elementor JSON assembly.
2. Local Elementor document validation test (`validateElementorDocument`).
3. Generation test with template variation (`default`, `premium`, `minimal`).

Executed commands:

```bash
npm run smoke
node scripts/smoke-test.js "landing page for career consulting" "gpt-4o-mini" "premium"
node scripts/smoke-test.js "landing page for english course" "gpt-4o-mini" "minimal"
node -e "import('./src/lib/elementor.js').then(m=>{const doc={title:'t',type:'page',version:'0.4',page_settings:[],content:[{id:'1',elType:'section',isInner:false,settings:{},elements:[{id:'2',elType:'column',isInner:false,settings:{_column_size:100},elements:[{id:'3',elType:'widget',widgetType:'heading',isInner:false,settings:{title:'ok'},elements:[]}]}]}]};const errs=m.validateElementorDocument(doc);console.log('validator_test',errs.length===0?'PASS':'FAIL',errs.length);}).catch(e=>{console.error(e);process.exit(1);});"
```

Result:

1. `PASS` in all executed scenarios.
2. `validation.valid: true` in smoke tests with real generation.
3. `validator_test PASS 0` in the direct structural validator test.

### Demonstrated Skills

1. API design with a clear contract.
2. Prompt engineering with structured output.
3. Diagnostic oriented error handling.
4. Defensive programming with integrity validation.
5. Modular organization to support product evolution.
6. Solution delivery for a real business scenario.

### Technical Roadmap

1. Automated test suite for contracts and templates.
2. Observability with structured logs and failure metrics by stage.
3. Support for more Elementor blocks and new section patterns.
4. Multi language mode for international page generation.
5. Optional version persistence for content audit.

### Contribution

Contributions are welcome for architecture improvements, user experience, code quality, and test coverage.

Suggested flow:

1. Fork the project.
2. Create a branch for your improvement.
3. Open a Pull Request with a clear description of the problem and solution.

### License

This project is licensed under MIT. Check the `LICENSE` file for all details.

### Author

Camiloruas  
Contact: miloruas@gmail.com

