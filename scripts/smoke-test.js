import fetch from "node-fetch";
import { env } from "../src/config/env.js";
import { buildPrompt } from "../src/lib/prompt.js";
import {
  createElementorDocument,
  resolveTemplateName,
  validateElementorDocument,
} from "../src/lib/elementor.js";
import { landingPageContentSchema } from "../src/lib/schema.js";

const prompt = process.argv[2] || "landing page simples para nutricionista";
const model = process.argv[3] || "gpt-4o-mini";
const template = process.argv[4] || "default";

if (!env.openAiApiKey) {
  console.error("OPENAI_API_KEY nao encontrada.");
  process.exit(1);
}

const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${env.openAiApiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model,
    temperature: 0.2,
    max_completion_tokens: 700,
    response_format: {
      type: "json_schema",
      json_schema: landingPageContentSchema,
    },
    messages: [
      {
        role: "system",
        content: "Voce gera somente JSON estruturado para conteudo de landing page.",
      },
      {
        role: "user",
        content: buildPrompt(prompt),
      },
    ],
  }),
});

const data = await response.json();

if (!response.ok) {
  console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}

const contentText = data.choices?.[0]?.message?.content;

if (!contentText) {
  console.error("A resposta da OpenAI veio vazia.");
  process.exit(1);
}

const content = JSON.parse(contentText);
const selectedTemplate = resolveTemplateName(template);
const document = createElementorDocument(content, selectedTemplate);
const errors = validateElementorDocument(document);

console.log(
  JSON.stringify(
    {
      content,
      validation: {
        valid: errors.length === 0,
        errors,
      },
      template: selectedTemplate,
      document,
    },
    null,
    2
  )
);

if (errors.length > 0) {
  process.exit(1);
}
