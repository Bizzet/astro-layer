---
name: performance-check
description: Use before handing off to check for performance issues.
disable-model-invocation: true
---

# performance-check

Audits the site for performance issues before client handoff. Checks images, fonts, layout stability, and build output.

## Audit Steps

Run each check against all `.astro`, `.ts`, and `.css` files in `src/`:

### 1. Image Audit

- Every raster image (`jpg`, `png`, `webp`, `avif`) must use `<Image />` from `astro:assets`
- **SVG exception**: never pass `.svg` sources to `<Image />` — Astro 6.3 disables SVG rasterization by default and throws an error. SVGs must be imported as Astro components or use bare `<img>` tags
- LCP element: must have `fetchpriority="high"` + `loading="eager"`
- All other images: `loading="lazy"` with explicit `width` and `height` attributes

### 2. Font Audit

- Fonts must use Astro built-in Fonts API or Fontsource npm package
- No Google Fonts CDN `<link>` tags permitted (privacy, performance, external dependency)
- No `@import url(...)` for external fonts

### 3. CSS Audit

- No `@import` inside `@layer` blocks — breaks cascade layer order
- No `position: absolute` without a containing block that has defined dimensions (causes CLS)
- All custom properties reference tokens from `tokens.css`

### 4. Script Audit

- Audit all `<script>` tags — can any be replaced with CSS?
- No inline scripts blocking the main thread (except the theme FOUC-prevention script)

### 5. Build Configuration

- `astro.config.mjs` has `output: 'static'` for full SSG
- `@astrojs/sitemap` is in integrations

### 6. Final Build

Run `npm run build` — zero errors or warnings acceptable for handoff.

## Reference

See `references/perf-checklist.md` for the complete checklist with grep patterns for automated detection.
