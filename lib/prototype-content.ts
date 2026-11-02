export type PrototypePage = {
  slug: string;
  eyebrow: string;
  title: string;
  purpose: string;
  contentNeeds: string[];
  lengthGuide: string[];
};

export const prototypePages: PrototypePage[] = [
  {
    slug: "approach",
    eyebrow: "Approach detail",
    title: "Approach content brief",
    purpose: "Use this page to explain ArdbergAI's process in more detail after the short homepage version.",
    contentNeeds: [
      "1 opening paragraph about how ArdbergAI moves from problem understanding to implementation.",
      "4 short process blocks matching Reality, Understanding, Build, and Opportunity.",
      "1 example scenario showing a messy business problem becoming a working capability.",
      "Optional proof point: delivery timeline, collaboration model, or measurable outcome.",
    ],
    lengthGuide: [
      "Opening: 60-90 words.",
      "Each process block: 35-50 words.",
      "Example scenario: 120-180 words.",
      "Keep the total page around 500-700 words for prototype review.",
    ],
  },
  {
    slug: "platforms",
    eyebrow: "Service detail",
    title: "Platforms content brief",
    purpose: "Use this page to describe AI products, business platforms, and software systems ArdbergAI can build.",
    contentNeeds: [
      "1 clear definition of what 'platforms' means for ArdbergAI.",
      "3-5 platform examples such as dashboards, AI assistants, workflow systems, or analytics products.",
      "Who this is for: business teams, operations teams, product teams, or engineering teams.",
      "Expected outcomes: speed, visibility, automation, decision support, or reduced manual work.",
    ],
    lengthGuide: ["Hero copy: 40-60 words.", "Examples: 20-30 words each.", "Outcome section: 80-120 words."],
  },
  {
    slug: "partner",
    eyebrow: "Service detail",
    title: "Partner content brief",
    purpose: "Use this page to explain project collaboration, delivery ownership, and how ArdbergAI works with client teams.",
    contentNeeds: [
      "1 paragraph about working alongside client stakeholders.",
      "3 collaboration modes: discovery, build, and launch/support.",
      "What the client provides and what ArdbergAI provides.",
      "A short note about communication cadence and delivery checkpoints.",
    ],
    lengthGuide: ["Hero copy: 40-60 words.", "Collaboration modes: 35-45 words each.", "Total: 350-500 words."],
  },
  {
    slug: "embed",
    eyebrow: "Service detail",
    title: "Embedded engineers content brief",
    purpose: "Use this page to describe forward-deployed engineers and embedded technical support.",
    contentNeeds: [
      "Explain when embedded engineers are useful.",
      "List the type of work they handle: integration, automation, AI workflows, data pipelines, product features.",
      "Clarify engagement length or project style if known.",
      "Add a short trust statement about accountability and ownership.",
    ],
    lengthGuide: ["Hero copy: 40-60 words.", "Work types: 5 bullets.", "Total: 300-450 words."],
  },
  {
    slug: "industries",
    eyebrow: "Industries detail",
    title: "Industry content brief",
    purpose: "Use this page to define which industries matter most and what use cases ArdbergAI should highlight.",
    contentNeeds: [
      "Choose 4-6 priority industries for the first version.",
      "For each industry, prepare 2-3 practical use cases.",
      "Add one business outcome per industry.",
      "Optional: mention existing experience or proof if available.",
    ],
    lengthGuide: ["Each industry: 60-90 words.", "Use cases: short bullets.", "Total: 600-900 words."],
  },
  {
    slug: "blog-featured",
    eyebrow: "Blog detail",
    title: "Featured blog content brief",
    purpose: "Use this page for the main article your team wants visitors to notice first.",
    contentNeeds: [
      "1 strong title with a practical point of view.",
      "Short introduction explaining the business problem.",
      "3-5 sections with useful lessons or examples.",
      "Closing CTA that connects the idea back to ArdbergAI services.",
    ],
    lengthGuide: ["Article: 800-1,200 words.", "Summary card: 25-40 words.", "Read time: 4-6 minutes."],
  },
  {
    slug: "blog-supporting",
    eyebrow: "Blog detail",
    title: "Supporting blog post brief",
    purpose: "Use this page for shorter blog articles that show expertise without becoming too heavy.",
    contentNeeds: [
      "Category: AI implementation, data strategy, industry insight, or engineering notes.",
      "Title and 2-3 line card summary.",
      "3 short article sections.",
      "Optional image idea or diagram note.",
    ],
    lengthGuide: ["Article: 500-800 words.", "Card summary: 25-35 words.", "Read time: 3-5 minutes."],
  },
];

export function getPrototypePage(slug: string) {
  return prototypePages.find((page) => page.slug === slug);
}
