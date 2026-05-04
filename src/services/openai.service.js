import fetch from "node-fetch";
import { env } from "../config/env.js";
import { buildPrompt } from "../lib/prompt.js";
import { landingPageContentSchema } from "../lib/schema.js";

export async function generateLandingContent({ prompt, model }) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.openAiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model || "gpt-4o-mini",
      temperature: 0.2,
      max_completion_tokens: 700,
      response_format: {
        type: "json_schema",
        json_schema: landingPageContentSchema,
      },
      messages: [
        {
          role: "system",
          content:
            "Voce gera somente JSON estruturado para conteudo de landing page. Nao escreva nada fora do JSON.",
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
    const message = data.error?.message || "Erro ao chamar OpenAI";
    const error = new Error(message);
    error.statusCode = response.status;
    error.details = data;
    throw error;
  }

  const contentJson = data.choices?.[0]?.message?.content;
  if (!contentJson) {
    const error = new Error("Resposta da OpenAI veio vazia");
    error.statusCode = 502;
    throw error;
  }

  try {
    return JSON.parse(contentJson);
  } catch (parseError) {
    const error = new Error("A OpenAI nao retornou um JSON valido");
    error.statusCode = 502;
    error.details = parseError.message;
    throw error;
  }
}

