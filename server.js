import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { buildPrompt } from "./prompt.js";
import {
  createElementorDocument,
  resolveTemplateName,
  validateElementorDocument,
} from "./elementor.js";
import { landingPageContentSchema } from "./schema.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt, model, template } = req.body;

  //  validação básica
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "API KEY não encontrada no .env",
    });
  }

  if (!prompt) {
    return res.status(400).json({
      error: "Prompt é obrigatório",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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

    //  erro da OpenAI
    if (!response.ok) {
      console.error("ERRO OPENAI:", data);
      return res.status(response.status).json({
        error: data.error?.message || "Erro ao chamar OpenAI",
      });
    }

    const contentJson = data.choices?.[0]?.message?.content;

    if (!contentJson) {
      return res.status(502).json({
        error: "Resposta da OpenAI veio vazia",
      });
    }

    let content;
    try {
      content = JSON.parse(contentJson);
    } catch (e) {
      return res.status(502).json({
        error: "A OpenAI nao retornou um JSON valido",
        details: e.message,
      });
    }

    const selectedTemplate = resolveTemplateName(template);
    const document = createElementorDocument(content, selectedTemplate);
    const validationErrors = validateElementorDocument(document);

    if (validationErrors.length > 0) {
      return res.status(502).json({
        error: "JSON gerado nao passou na validacao local do Elementor",
        details: validationErrors,
      });
    }

    res.json({
      template: selectedTemplate,
      json: JSON.stringify(document, null, 2),
    });
  } catch (error) {
    console.error("ERRO INTERNO:", error);

    res.status(500).json({
      error: "Erro interno ao gerar JSON",
      details: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
