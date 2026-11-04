export const palettes = [
  {
    slug: "graphite",
    name: "Graphite",
    font: "Instrument Sans + Instrument Serif",
    description: "The current dark palette",
    href: "/",
    swatches: [
      { name: "Graphite", hex: "#1C1E22" },
      { name: "Panel", hex: "#26282E" },
      { name: "Lavender", hex: "#A47FE3" },
      { name: "Gold", hex: "#D9AB3F" },
    ],
  },
  {
    slug: "violet",
    name: "Brand violet",
    font: "IBM Plex Sans",
    description: "Light, brand led, intelligent",
    href: "/palette/violet",
    swatches: [
      { name: "Primary Violet", hex: "#51349A" },
      { name: "Primary Hover", hex: "#302578" },
      { name: "Secondary Indigo", hex: "#545AB8" },
      { name: "Accent Light", hex: "#EEE9F7" },
    ],
  },
  {
    slug: "signal",
    name: "Signal blue",
    font: "DM Sans",
    description: "Light, minimal, high contrast",
    href: "/palette/signal",
    swatches: [
      { name: "Ink Black", hex: "#090B0F" },
      { name: "Signal Blue", hex: "#1F5FD6" },
      { name: "Steel Grey", hex: "#687280" },
      { name: "Soft White", hex: "#F8F8F6" },
    ],
  },
  {
    slug: "navy",
    name: "Deep navy",
    font: "Manrope",
    description: "Cool white with Ardberg blue",
    href: "/palette/navy",
    swatches: [
      { name: "Deep Navy", hex: "#0D3259" },
      { name: "Ardberg Blue", hex: "#2563A8" },
      { name: "Sky", hex: "#7CC4E8" },
      { name: "Cool White", hex: "#F5F8FA" },
    ],
  },
] as const;

export type Palette = (typeof palettes)[number];
export type PaletteSlug = Palette["slug"];

export function getPalette(slug: string) {
  return palettes.find((palette) => palette.slug === slug);
}
