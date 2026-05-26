# [Business Name]

[One-line description]. Astro 6.3, static output, @astrojs/sitemap.

## Subdirectory initialization
When working in a specific area, start Claude from that directory:
- Components only: start Claude from `src/components/`
- Pages only: start Claude from `src/pages/`
Claude walks up the tree automatically — root context is never lost.

## Where things live
See SITE_MAP.md for all pages and routes.
- `src/layouts/`    — Base.astro wraps every page
- `src/components/` — reusable UI elements
- `src/pages/`      — file-based routing
- `src/styles/`     — tokens.css is the single source of truth for all values
- `src/content.config.ts` — content collection definitions (Content Layer API)

## Critical conventions
- All CSS values come from tokens.css — no hard-coded hex, px, or rem
- All images use `<Image />` from `astro:assets` — never bare `<img>`
  WARNING: never pass SVG sources to `<Image />` — Astro 6 throws an error.
  Use SVGs as components (`import Foo from './foo.svg'`) or bare `<img>` tags.
- Every page has a unique `<title>` and `<meta name="description">`
- View transitions use `<ClientRouter />` from `astro:transitions` — NOT the
  removed `<ViewTransitions />` component
- Content collections use the Content Layer API (`src/content.config.ts` with
  `glob()` loaders). The old `src/content/config.ts` and `type: 'content'` are gone.
- Import `z` from `'astro/zod'`, never from `'astro:content'`
- Never use `Astro.glob()` — use `import.meta.glob()` or `getCollection()`

## Commands
```
npm run dev           # dev server
npm run build         # production build
npm run preview       # preview build
npx astro check       # full TypeScript check (run before committing)
npx @astrojs/upgrade  # upgrade Astro and all official integrations together
```
