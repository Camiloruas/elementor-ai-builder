export function buildMinimalTemplate(api) {
  const {
    makeSection,
    makeWidget,
    createButtonSettings,
    heroHeading,
    heroDescription,
    heroButton,
    benefitTitle,
    benefitItems,
    offerHeading,
    offerDescription,
    offerButton,
    faqTitle,
    normalizedFaqItems,
  } = api;

  return [
    makeSection(
      [
        makeWidget("heading", {
          title: heroHeading,
          align: "center",
          title_color: "#ffffff",
        }),
        makeWidget("text-editor", {
          editor: `<p>${heroDescription}</p>`,
          align: "center",
          text_color: "#cbd5e1",
        }),
        makeWidget("button", createButtonSettings(heroButton)),
      ],
      {
        sectionName: "hero",
        padding: {
          unit: "px",
          top: "80",
          right: "0",
          bottom: "80",
          left: "0",
          isLinked: false,
        },
      }
    ),
    makeSection(
      [
        makeWidget("heading", {
          title: benefitTitle,
          align: "center",
          title_color: "#22c55e",
        }),
        makeWidget("icon-list", {
          icon_color: "#22c55e",
          text_color: "#ffffff",
          icon_list: benefitItems.map((text) => ({
            text,
            selected_icon: {
              value: "fas fa-check",
              library: "fa-solid",
            },
          })),
        }),
      ],
      {
        sectionName: "benefits",
      }
    ),
    makeSection(
      [
        makeWidget("heading", {
          title: offerHeading,
          align: "center",
          title_color: "#22c55e",
        }),
        makeWidget("text-editor", {
          editor: `<p>${offerDescription}</p>`,
          align: "center",
          text_color: "#cbd5e1",
        }),
        makeWidget("button", createButtonSettings(offerButton)),
      ],
      {
        sectionName: "offer",
        cssId: "oferta",
      }
    ),
    makeSection(
      [
        makeWidget("heading", {
          title: faqTitle,
          align: "center",
          title_color: "#22c55e",
        }),
        makeWidget("toggle", {
          title_color: "#ffffff",
          icon_color: "#22c55e",
          content_color: "#cbd5e1",
          tabs: normalizedFaqItems,
        }),
      ],
      {
        sectionName: "faq",
      }
    ),
  ];
}
