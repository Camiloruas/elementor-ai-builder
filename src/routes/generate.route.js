import { Router } from "express";
import { env } from "../config/env.js";
import {
  createElementorDocument,
  resolveTemplateName,
  validateElementorDocument,
} from "../lib/elementor.js";
import { generateLandingContent } from "../services/openai.service.js";

const router = Router();

router.post("/generate", async (req, res) => {
  const { prompt, model, template } = req.body;

  if (!env.openAiApiKey) {
    return res.status(500).json({
      error: "API KEY nao encontrada no .env",
    });
  }

  if (!prompt) {
    return res.status(400).json({
      error: "Prompt e obrigatorio",
    });
  }

  try {
    const content = await generateLandingContent({ prompt, model });
    const selectedTemplate = resolveTemplateName(template);
    const document = createElementorDocument(content, selectedTemplate);
    const validationErrors = validateElementorDocument(document);

    if (validationErrors.length > 0) {
      return res.status(502).json({
        error: "JSON gerado nao passou na validacao local do Elementor",
        details: validationErrors,
      });
    }

    const fileName = `elementor-${selectedTemplate}.json`;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    return res.send(JSON.stringify(document, null, 2));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      error: error.message || "Erro interno ao gerar JSON",
      details: error.details || null,
    });
  }
});

export { router as generateRouter };

