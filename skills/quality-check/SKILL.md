---
name: quality-check
description: Use before client handoff to verify accessibility and SEO completeness.
disable-model-invocation: true
---

# quality-check

Verifies accessibility, SEO, and Astro 6 correctness before client handoff.

## Checklist

Run each check against `src/` and `public/`:

### SEO

- [ ] Every page has a unique `<title>`
- [ ] Every page has a unique `<meta name="description">`
- [ ] Homepage has LocalBusiness JSON-LD
- [ ] `sitemap.xml` accessible at `/sitemap-index.xml` (requires `@astrojs/sitemap`)
- [ ] `robots.txt` exists at `/robots.txt`

### Accessibility

- [ ] Every `<Image />` and `<img>` has a non-empty, descriptive `alt` attribute
- [ ] One `<h1>` per page — no skipped heading levels (h1→h3 without h2)
- [ ] Every `<input>`, `<textarea>`, `<select>` has an associated `<label>`
- [ ] All interactive elements are keyboard-reachable with a visible focus style
- [ ] All links have descriptive text (no "click here", "read more", "learn more")

### Astro 6 Correctness

- [ ] No `<ViewTransitions />` in codebase — must be `<ClientRouter />` from `astro:transitions`
- [ ] No `entry.render()` calls — must be `render(entry)` imported from `astro:content`
- [ ] No `import { z } from 'astro:content'` — must be `from 'astro/zod'`
- [ ] No `entry.slug` in params — must be `entry.id`
- [ ] No SVG sources passed to `<Image />` component
- [ ] Content collection config at `src/content.config.ts` (not `src/content/config.ts`)

### TypeScript

- [ ] `npx astro check` passes with zero errors

## How to Run

This skill executes each check by grepping source files and reading pages. Fix any failures before marking the build complete.

## Reference

See `references/quality-checklist.md` for grep patterns to detect each violation automatically.
