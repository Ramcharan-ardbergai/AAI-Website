# Ardbergai website

Single-page site using the version 2 design, with colour palette previews. Built with Next.js (App Router, TypeScript), Tailwind CSS v4, and shadcn/ui (Button, Sheet).

Use the **Palettes** menu in the navbar to compare the current Graphite design with Brand violet, Signal blue, and Deep navy. The previews are available at `/palette/violet`, `/palette/signal`, and `/palette/navy`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Where to edit

| What | Where |
| --- | --- |
| All text, navigation groups, industries list, contact email | `lib/version2-content.ts` (search `TODO` for placeholders) |
| Colours | Palette tokens in `app/globals.css`; names, links, and swatches in `lib/palettes.ts` |
| Fonts | `app/layout.tsx` (`next/font/google`) |
| Logo | replace `public/logo.png` (wordmark is text in `components/site/Logo.tsx`) |
| Navbar and footer | `components/site/Header.tsx`, `components/site/Footer.tsx`; shared colour frame in `components/site/ThemeFrame.tsx` |
| Sections | `components/version2/sections/*`, composed in `app/page.tsx` |
| Spacing / layout wrappers | `components/version2/site/Section.tsx`, `components/version2/site/Container.tsx` |

## Palette

Dark **Graphite + Lavender**: graphite `#1c1e22` (page), panel `#26282e` (cards), lavender `#a47fe3` (primary accent), gold `#d9ab3f` (labels), and mist `#eceef0` (text). These are variables at the top of `app/globals.css`.

Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels), Lora (serif accents).
