# Performance Checklist

Run through this before every deployment or client handoff.

---

## Images

- [ ] Every `<img>` must be `<Image />` from `astro:assets` — **except SVG files**
- [ ] SVGs: import as Astro/React components or use bare `<img>` — **never pass SVG `src` to `<Image />`**
  - Astro 6.3 throws by default on SVG sources
  - Workaround (`image.dangerouslyProcessSVG: true`) is not recommended
- [ ] LCP element: `fetchpriority="high"` + `loading="eager"`
- [ ] All other images: `loading="lazy"` with explicit `width` and `height`
- [ ] All images have non-empty `alt` text (except decorative: `alt=""`)
- [ ] Image file names are descriptive kebab-case (not `IMG_1234.jpg`)
- [ ] OG images exist at the paths referenced in SEO component

---

## Fonts

- [ ] Fonts use Astro's built-in Fonts API or Fontsource npm package
- [ ] **No Google Fonts CDN `<link>` tags** — external dependency, privacy issues
- [ ] **No `@import url(...)` for fonts** — blocks CSS parsing
- [ ] If using Fonts API: `<Font cssVariable="..." preload />` in Base.astro `<head>`

---

## CSS

- [ ] No `@import` inside `@layer` blocks — this breaks cascade layer order
- [ ] No `position: absolute` without a containing block with defined dimensions — causes CLS
- [ ] All `position: absolute/fixed` elements have explicit size or constrained by parent
- [ ] No unused CSS custom properties (no tokens defined but never used)
- [ ] `tokens.css` is the only place with `:root { }` declarations

---

## JavaScript

- [ ] Audit all `<script>` tags — can any be replaced with CSS?
- [ ] `is:inline` scripts only for critical (anti-FOUC) or third-party code
- [ ] GSAP imported only on pages/components that use it
- [ ] No `document.write()` calls
- [ ] Event listeners cleaned up if using `astro:page-load` hook

---

## Build Config

- [ ] `astro.config.mjs` has `output: 'static'` for full SSG
- [ ] `site:` URL in `astro.config.mjs` is the production URL (needed for sitemap)
- [ ] `@astrojs/sitemap` is in integrations array
- [ ] `public/robots.txt` exists and has correct sitemap URL

---

## Astro-Specific

- [ ] `<ClientRouter />` used (not removed `<ViewTransitions />`)
- [ ] `npx astro check` passes with zero errors
- [ ] `npm run build` completes without errors or warnings
- [ ] No `Astro.glob()` calls — use `import.meta.glob()` or `getCollection()`
- [ ] Content Layer API used (`src/content.config.ts` with `glob()` loaders)
- [ ] `z` imported from `'astro/zod'` not `'astro:content'`

---

## Core Web Vitals Targets

| Metric | Target | How to achieve |
|---|---|---|
| LCP | < 2.5s | `fetchpriority="high"` on hero image, preload fonts |
| CLS | < 0.1 | Explicit `width`/`height` on images, no layout-shifting elements |
| INP | < 200ms | Minimize JS, avoid long tasks on interaction |

---

## Quick Audit Commands

```bash
# TypeScript errors
npx astro check

# Production build (catches CSS/import errors)
npm run build

# Check for bare <img> tags that should be <Image />
grep -r "<img " src/ --include="*.astro"

# Check for ViewTransitions (should be zero)
grep -r "ViewTransitions" src/ --include="*.astro"

# Check for hardcoded colors in component styles
grep -rn "#[0-9a-fA-F]\{3,6\}" src/components/ src/pages/ --include="*.astro"
```
