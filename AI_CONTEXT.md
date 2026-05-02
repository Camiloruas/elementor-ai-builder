# AI Context

## Projeto

Gerador de landing pages em JSON para importacao no Elementor do WordPress.

## O que foi feito

- Corrigido erro de sintaxe em `prompt.js` causado por crases dentro de template string.
- Instalado `nodemon` e criado o script `npm run dev`.
- Mudada a estrategia de geracao:
  - a OpenAI gera apenas o conteudo estruturado da landing page
  - o servidor monta o JSON final do Elementor localmente
- Adicionado `response_format` com `json_schema` para reduzir respostas inconsistentes.
- Criado `schema.js` para validar a estrutura do conteudo retornado pela OpenAI.
- Criado `elementor.js` para montar e validar o documento final do Elementor.
- Criados templates em `templates/`:
  - `simple`
  - `premium`
  - `minimal`
- O gerador agora aceita `createElementorDocument(content, template)`.
- IDs agora sao unicos com `randomUUID()`.
- Hero ganhou suporte a imagem.
- Botoes ganharam link para `#oferta`.
- Oferta foi fortalecida com copy extra em templates mais comerciais.
- Criado `smoke-test.js` para testes curtos com pouco consumo de tokens.

## Estado atual

- Endpoint principal: `POST /generate`
- Parametros aceitos no body:
  - `prompt`
  - `model`
  - `template`
- Templates suportados atualmente:
  - `default`
  - `simple`
  - `premium`
  - `minimal`

## Como testar

- Desenvolvimento com reload: `npm run dev`
- Smoke test barato:
  - `npm run smoke -- "landing page simples para nutricionista" "gpt-4o-mini" "premium"`

## Cuidados importantes

- Nunca versionar `.env` nem chaves reais de API.
- Antes de publicar em producao, trocar qualquer chave exposta anteriormente.
- O projeto ainda precisa de teste real de importacao no Elementor do WordPress antes de considerar producao.
- A imagem padrao do hero usa URL externa. Para producao, preferir imagem propria ou fluxo controlado.

## Arquivos principais

- `server.js`: recebe requisicao, chama OpenAI, monta e valida JSON final.
- `prompt.js`: instrui a OpenAI a gerar somente conteudo estruturado.
- `schema.js`: schema JSON esperado da OpenAI.
- `elementor.js`: montagem e validacao do documento do Elementor.
- `templates/`: variacoes visuais do documento.
- `smoke-test.js`: teste rapido de ponta a ponta.
