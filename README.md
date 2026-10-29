# ardbergai website

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
| Logo | replace `public/logo.svg` (placeholder "ab" monogram; wordmark is text in `components/site/Logo.tsx`) |
| Sections | `components/sections/*`, composed in `app/page.tsx` |
| Spacing / layout wrappers | `components/site/Section.tsx`, `components/site/Container.tsx` |

## Palette

Default is **Cobalt + Gold** (navy `#0b1e4d`, panel `#13296a`, gold `#ffc857`, ice `#8ec5ff`) on a warm cream
background `#f1ede6`, with lavender `#a47fe3` from the opening picture. The alternative **Graphite Governance**
values are noted in a comment in `globals.css`.

Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels), Lora (serif accents).
