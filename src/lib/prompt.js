export const buildPrompt = (userPrompt) => `
Voce gera apenas dados de conteudo em JSON para uma landing page.

Retorne somente os campos pedidos pelo schema da API.
Nao gere a estrutura completa do Elementor.
Nao use markdown.
Nao use comentarios.
Nao inclua texto fora do JSON.

Objetivo:
- criar uma landing page curta e clara
- tom profissional
- texto em portugues do Brasil
- foco em conversao

Regras de conteudo:
- hero com titulo curto, subtitulo e botao
- exatamente 3 beneficios
- uma oferta com titulo, descricao e CTA
- exatamente 3 perguntas frequentes
- respostas do FAQ curtas
- evitar promessas exageradas

Contexto do cliente:
${userPrompt}
`;
