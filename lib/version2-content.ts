// All site copy lives here. Every TODO marks placeholder text to replace.

export const site = {
  name: "ardbergai",
  domain: "ardbergai.com",
  location: "Hyderabad, India",
  // TODO: replace with the real contact address
  email: "hello@ardbergai.com",
};

export const about = {
  // TODO: placeholder copy
  title: "Every industry runs on complexity.",
  lead: "We turn it into connected intelligence.",
  scrollLabel: "Scroll down",
  // Copy taken from the opening picture
  columns: [
    {
      label: "The possibility",
      title: "Imagine what's next.",
      body: "A bigger idea. A real business need.",
    },
    {
      label: "The engineering",
      title: "We connect the pieces.",
      body: "The right data. The right models. The right systems. Working together.",
    },
    {
      label: "The reality",
      title: "Now it works.",
      body: "Ideas become real capabilities that move your business forward.",
    },
  ],
};

export const intro = {
  eyebrow: "Introducing ardbergai",
  // TODO: placeholder copy
  title: "We started in life sciences, where AI has to be right.",
  body: "Today, we bring that same care to every industry.",
};

export const approach = {
  eyebrow: "Our approach",
  // TODO: placeholder copy
  title: "From cluster to clarity.",
  // Messy starting points, taken from the website-story picture
  cluster: ["Spreadsheets", "Legacy ERP", "Siloed data", "PDF archives", "Disconnected tools"],
  // TODO: placeholder copy
  steps: [
    {
      title: "Understand the challenge",
      body: "We start with your goals and the systems in the way, before anything is built.",
    },
    {
      title: "Match the right solution",
      body: "We identify the opportunity and choose the right models, data and software for it.",
    },
    {
      title: "Connect it into one intelligence",
      body: "Everything works together as one system your teams and decisions can rely on.",
    },
  ],
};

export const offer = {
  eyebrow: "What we offer",
  title: "Three ways to work with us.",
  // TODO: placeholder copy
  items: [
    { title: "We build platforms.", body: "Purpose-built AI and software platforms, designed around your business." },
    { title: "We partner with your teams, start to finish.", body: "From the first conversation to a system in production." },
    { title: "We embed engineers.", body: "Engineers who join your team and carry the load on your projects." },
  ],
};

const industryTitleLines = ["Specific challenges.", "Connected solutions."] as const;

export const industries = {
  eyebrow: "Industries",
  title: industryTitleLines.join(" "),
  titleLines: industryTitleLines,
  description: "Every industry has its own data, workflows, and decisions. We bring the right engineering to each.",
  // TODO: validate industry-specific examples against real client work
  items: [
    { title: "Pharmaceuticals", body: "Connect fragmented research data and workflows so teams can move from evidence to better decisions.", signals: ["Research data", "Documents", "Workflows"] },
    { title: "Advanced Manufacturing", body: "Bring production and quality data together to spot issues earlier and improve processes.", signals: ["Production", "Quality", "Assets"] },
    { title: "Financial Services", body: "Connect risk and transaction signals to support faster, more consistent reviews.", signals: ["Transactions", "Risk", "Compliance"] },
    { title: "Energy & Utilities", body: "Use operational data to forecast demand and plan maintenance with greater confidence.", signals: ["Demand", "Grid", "Maintenance"] },
    { title: "Healthcare", body: "Bring clinical and operational information into clearer, more useful workflows.", signals: ["Clinical data", "Operations", "Care"] },
    { title: "Retail & Consumer Goods", body: "Turn demand and customer signals into better inventory and experience decisions.", signals: ["Inventory", "Customers", "Demand"] },
    { title: "Logistics & Supply Chain", body: "Connect routing, demand, and operations data to keep goods moving.", signals: ["Routing", "Demand", "Operations"] },
    { title: "Telecommunications", body: "Use network signals to identify issues and improve service reliability.", signals: ["Networks", "Operations", "Experience"] },
    { title: "Automotive & Mobility", body: "Link vehicle and manufacturing data to inform decisions across the product lifecycle.", signals: ["Vehicle data", "Manufacturing", "Mobility"] },
  ],
  beyond: "A different industry? Tell us the challenge you're working through.",
};

export const contact = {
  // TODO: placeholder copy
  title: "Let's build together.",
  body: "Tell us the challenge. We'll help you find the right way forward.",
  cta: "Start a conversation",
};

export const footer = {
  // TODO: placeholder copy
  tagline: "AI & software engineering",
};

export function industryAnchor(title: string) {
  return `industry-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

type NavDestination = {
  label: string;
  href: string;
  description?: string;
  id?: string;
};

type NavGroup = {
  label: string;
  eyebrow: string;
  featured?: NavDestination;
  items: NavDestination[];
  variant: "wide" | "compact";
};

export const navGroups: NavGroup[] = [
  {
    label: "What we do",
    eyebrow: "Explore ardbergai",
    variant: "wide",
    featured: { label: "Overview", href: "/#about", id: "about", description: about.lead },
    items: [
      { label: "Our approach", href: "/#approach", id: "approach", description: approach.title },
      { label: "What we offer", href: "/#offer", id: "offer", description: offer.title },
    ],
  },
  {
    label: "Industries",
    eyebrow: "Where we work",
    variant: "wide",
    featured: { label: "All industries", href: "/#industries", id: "industries", description: industries.title },
    items: industries.items.map(({ title }) => ({
      label: title,
      href: `/#${industryAnchor(title)}`,
      id: industryAnchor(title),
    })),
  },
  {
    label: "Company",
    eyebrow: "Get to know us",
    variant: "compact",
    items: [
      { label: "About ardbergai", href: "/#intro", id: "intro" },
      { label: "Contact", href: "/#contact", id: "contact" },
    ],
  },
];
