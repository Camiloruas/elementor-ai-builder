import { randomUUID } from "node:crypto";
import { buildSimpleTemplate } from "../templates/simple.js";
import { buildPremiumTemplate } from "../templates/premium.js";
import { buildMinimalTemplate } from "../templates/minimal.js";

const allowedWidgets = new Set([
  "heading",
  "text-editor",
  "button",
  "image",
  "icon-list",
  "toggle",
]);

const baseSpacing = {
  unit: "px",
  top: "100",
  right: "0",
  bottom: "100",
  left: "0",
  isLinked: false,
};

const defaultHeroImageUrl =
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80";

const templateBuilders = {
  default: buildSimpleTemplate,
  simple: buildSimpleTemplate,
  premium: buildPremiumTemplate,
  minimal: buildMinimalTemplate,
};

function makeId() {
  return randomUUID();
}

function makeWidget(widgetType, settings) {
  return {
    id: makeId(),
    elType: "widget",
    widgetType,
    isInner: false,
    settings,
    elements: [],
  };
}

function makeSection(widgets, extraSettings = {}) {
  const sectionId = makeId();
  const columnId = makeId();
  const { cssId, sectionName, ...settings } = extraSettings;

  return {
    id: sectionId,
    elType: "section",
    isInner: false,
    settings: {
      background_background: "classic",
      background_color: "#0f0c29",
      padding: baseSpacing,
      ...settings,
      ...(cssId ? { _element_id: cssId } : {}),
    },
    elements: [
      {
        id: columnId,
        elType: "column",
        isInner: false,
        settings: {
          _column_size: 100,
        },
        elements: widgets,
      },
    ],
  };
}

function normalizeText(value, fallback) {
  if (typeof value !== "string") {
    return fallback;
  }

  const text = value.trim();
  return text || fallback;
}

function normalizeList(values, fallback, maxItems) {
  if (!Array.isArray(values) || values.length === 0) {
    return fallback.slice(0, maxItems);
  }

  return values
    .slice(0, maxItems)
    .map((value, index) => normalizeText(value, fallback[index] || fallback[0]));
}

function createButtonSettings(text) {
  return {
    text,
    align: "center",
    background_color: "#22c55e",
    button_text_color: "#ffffff",
    link: {
      url: "#oferta",
      is_external: "",
      nofollow: "",
    },
  };
}

function createImageSettings(url) {
  return {
    image: {
      url,
    },
    image_size: "full",
    align: "center",
  };
}

function createOfferHtml(description) {
  return `<p>${description}</p><p><strong>Garantia de 7 dias</strong></p>`;
}

function buildTemplateApi(content) {
  const heroHeading = normalizeText(
    content?.hero?.heading,
    "Transforme visitantes em clientes"
  );
  const heroDescription = normalizeText(
    content?.hero?.description,
    "Apresente sua oferta com clareza e um CTA forte."
  );
  const heroButton = normalizeText(content?.hero?.buttonText, "Quero saber mais");
  const heroImageUrl = normalizeText(content?.hero?.imageUrl, defaultHeroImageUrl);

  const benefitTitle = normalizeText(
    content?.benefits?.title,
    "Por que escolher esta solucao"
  );
  const benefitItems = normalizeList(
    content?.benefits?.items,
    [
      "Implementacao simples e rapida",
      "Mensagem clara para aumentar conversao",
      "Visual profissional e organizado",
    ],
    3
  );

  const offerHeading = normalizeText(content?.offer?.heading, "Oferta especial");
  const offerDescription = normalizeText(
    content?.offer?.description,
    "Aproveite uma condicao exclusiva por tempo limitado."
  );
  const offerButton = normalizeText(content?.offer?.buttonText, "Quero aproveitar");

  const faqTitle = normalizeText(content?.faq?.title, "Perguntas frequentes");
  const faqItems = Array.isArray(content?.faq?.items) ? content.faq.items.slice(0, 3) : [];
  const normalizedFaqItems =
    faqItems.length === 3
      ? faqItems.map((item, index) => ({
          title: normalizeText(item?.question, `Pergunta ${index + 1}`),
          content: normalizeText(item?.answer, "Resposta curta e objetiva."),
        }))
      : [
          {
            title: "Como funciona?",
            content: "Voce entra em contato, alinhamos a necessidade e iniciamos rapidamente.",
          },
          {
            title: "Preciso contratar na hora?",
            content: "Nao. Voce pode tirar duvidas antes de decidir.",
          },
          {
            title: "Como comeco?",
            content: "Basta clicar no botao e solicitar seu atendimento.",
          },
        ];

  return {
    content,
    heroHeading,
    heroDescription,
    heroButton,
    heroImageUrl,
    benefitTitle,
    benefitItems,
    offerHeading,
    offerDescription,
    offerButton,
    faqTitle,
    normalizedFaqItems,
    makeSection,
    makeWidget,
    createButtonSettings,
    createImageSettings,
    createOfferHtml,
  };
}

export function listTemplates() {
  return Object.keys(templateBuilders);
}

export function resolveTemplateName(template = "default") {
  return templateBuilders[template] ? template : "default";
}

export function createElementorDocument(content, template = "default") {
  const selectedTemplate = templateBuilders[resolveTemplateName(template)];
  const api = buildTemplateApi(content);

  return {
    title: normalizeText(content?.pageTitle, "Landing Page"),
    type: "page",
    version: "0.4",
    page_settings: [],
    content: selectedTemplate(api),
  };
}

export function validateElementorDocument(doc) {
  const errors = [];

  if (!doc || typeof doc !== "object" || Array.isArray(doc)) {
    return ["Documento raiz precisa ser um objeto JSON."];
  }

  if (doc.version !== "0.4") {
    errors.push('A raiz precisa ter "version": "0.4".');
  }

  if (doc.type !== "page") {
    errors.push('A raiz precisa ter "type": "page".');
  }

  if (!Array.isArray(doc.page_settings)) {
    errors.push('"page_settings" precisa ser um array vazio ou valido.');
  }

  if (!Array.isArray(doc.content) || doc.content.length === 0) {
    errors.push('"content" precisa conter pelo menos uma section.');
    return errors;
  }

  for (const [sectionIndex, section] of doc.content.entries()) {
    if (section?.elType !== "section") {
      errors.push(`content[${sectionIndex}] precisa ser "section".`);
      continue;
    }

    if (section?.isInner !== false) {
      errors.push(`section ${section.id || sectionIndex} precisa ter isInner false.`);
    }

    if (!Array.isArray(section?.elements) || section.elements.length === 0) {
      errors.push(`section ${section.id || sectionIndex} precisa conter columns.`);
      continue;
    }

    for (const [columnIndex, column] of section.elements.entries()) {
      if (column?.elType !== "column") {
        errors.push(
          `section ${section.id || sectionIndex} elements[${columnIndex}] precisa ser "column".`
        );
        continue;
      }

      if (column?.isInner !== false) {
        errors.push(`column ${column.id || columnIndex} precisa ter isInner false.`);
      }

      if (!Array.isArray(column?.elements) || column.elements.length === 0) {
        errors.push(`column ${column.id || columnIndex} precisa conter widgets.`);
        continue;
      }

      for (const [widgetIndex, widget] of column.elements.entries()) {
        if (widget?.elType !== "widget") {
          errors.push(
            `column ${column.id || columnIndex} elements[${widgetIndex}] precisa ser "widget".`
          );
          continue;
        }

        if (!allowedWidgets.has(widget?.widgetType)) {
          errors.push(
            `widget ${widget.id || widgetIndex} usa widgetType nao permitido: ${widget?.widgetType}.`
          );
        }

        if (widget?.isInner !== false) {
          errors.push(`widget ${widget.id || widgetIndex} precisa ter isInner false.`);
        }

        if (!Array.isArray(widget?.elements)) {
          errors.push(`widget ${widget.id || widgetIndex} precisa ter "elements": [].`);
        }

        if (
          !widget?.settings ||
          typeof widget.settings !== "object" ||
          Array.isArray(widget.settings)
        ) {
          errors.push(`widget ${widget.id || widgetIndex} precisa ter "settings" como objeto.`);
        }
      }
    }
  }

  return errors;
}
