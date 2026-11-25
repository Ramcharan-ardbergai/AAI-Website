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
  // TODO: placeholder copy
  lead: "Your information is scattered across files and tools. We turn it into one system your team can use, in three steps.",
  // Messy starting points, taken from the website-story picture
  cluster: ["Spreadsheets", "Legacy ERP", "Siloed data", "PDF archives", "Disconnected tools"],
  // The building blocks chosen in step two
  solutions: ["Models", "Data", "Software"],
  resultLabel: "One connected system",
  outputLabel: "You get",
  // TODO: placeholder copy; confirm each output matches what is really delivered
  steps: [
    {
      title: "Understand the challenge",
      body: "We agree on the goal and map where your data lives and what blocks it.",
      output: "A clear problem statement and a map of your systems.",
    },
    {
      title: "Match the right solution",
      body: "We pick the use case worth solving first, then the models, data and software it needs.",
      output: "A focused plan with a defined first release.",
    },
    {
      title: "Connect it into one intelligence",
      body: "We build it, connect it to your existing tools and put it in your team's hands.",
      output: "A working system your team uses to make decisions.",
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

/** Copy for the Palette3 "Start a conversation" panel. */
export const contactForm = {
  // TODO: placeholder copy
  subject: "New conversation",
  otherIndustry: "Another industry",
  notSure: "Not sure yet",
  challengeHint: "What are you trying to solve? What gets in the way today?",
  note: "This opens a draft in your email app. Nothing is sent until you press send.",
  draftTitle: "Your email is ready to send",
  draftBody: "Check the draft in your email app and press send to reach us.",
  steps: ["Your world", "The challenge", "About you"],
  headings: ["Where are you working?", "What are you trying to solve?", "Where can we reach you?"],
  preview: { title: "Your message so far", industry: "Industry", help: "Together", challenge: "Challenge", from: "From" },
};

/** Copy for the Palette3 guided chat. */
export const contactChat = {
  // TODO: placeholder copy
  launcher: "Chat with us",
  title: "Chat with ardbergai",
  subtitle: "Automated questions, not a live agent",
  switchPrompt: "Prefer to chat?",
  greeting: "Hi! A few quick questions and your message will be ready.",
  questions: {
    industry: "Which industry are you in?",
    help: "How would you like to work together?",
    challenge: "What challenge are you working through?",
    name: "What's your name?",
    email: "What's your work email?",
    company: "Which company are you with? (optional)",
  },
  hint: "Type your answer",
  optionalHint: "Type, or press send to skip",
  chooseHint: "Choose an option above",
  skipped: "Skipped",
  summary: "Thanks. Here's your message:",
  copied: "Copied. Send it to",
  fallback: "No email app opened? Copy the message and send it to",
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
