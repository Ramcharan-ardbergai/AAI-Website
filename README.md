# Ardbergai website

Single-page site: Next.js (App Router, TypeScript), Tailwind CSS v4, shadcn/ui (Button, Sheet).

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
| All text, nav links, industries list, contact email | `lib/content.ts` (search `TODO` for placeholders) |
| Colours | CSS variables at the top of `app/globals.css` |
| Fonts | `app/layout.tsx` (`next/font/google`) |
| Logo | replace `public/logo.png` (wordmark is text in `components/site/Logo.tsx`) |
| Sections | `components/sections/*`, composed in `app/page.tsx` |
| Spacing / layout wrappers | `components/site/Section.tsx`, `components/site/Container.tsx` |

## Palette

Dark **Cobalt + Gold**: night `#0b1e4d` (page), panel `#13296a` (cards), gold `#ffc857` (accent), ice `#8ec5ff` (labels),
text `#eaf0ff`. All are variables at the top of `app/globals.css`.

Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels), Lora (serif accents).
