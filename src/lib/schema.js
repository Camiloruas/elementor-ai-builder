export const landingPageContentSchema = {
  name: "elementor_landing_page_content",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["pageTitle", "hero", "benefits", "offer", "faq"],
    properties: {
      pageTitle: {
        type: "string",
      },
      hero: {
        type: "object",
        additionalProperties: false,
        required: ["heading", "description", "buttonText", "imageUrl"],
        properties: {
          heading: { type: "string" },
          description: { type: "string" },
          buttonText: { type: "string" },
          imageUrl: { type: ["string", "null"] },
        },
      },
      benefits: {
        type: "object",
        additionalProperties: false,
        required: ["title", "items"],
        properties: {
          title: { type: "string" },
          items: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            items: { type: "string" },
          },
        },
      },
      offer: {
        type: "object",
        additionalProperties: false,
        required: ["heading", "description", "buttonText"],
        properties: {
          heading: { type: "string" },
          description: { type: "string" },
          buttonText: { type: "string" },
        },
      },
      faq: {
        type: "object",
        additionalProperties: false,
        required: ["title", "items"],
        properties: {
          title: { type: "string" },
          items: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["question", "answer"],
              properties: {
                question: { type: "string" },
                answer: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
