# Components

Reusable Astro components. Each is self-contained: TypeScript Props, scoped CSS, ARIA.

## Conventions
- Props interface named `Props`, always in frontmatter
- CSS: scoped `<style>` block, only `var(--token)` — zero hard-coded values
- Images: always `<Image />` from `astro:assets` with explicit `width`, `height`, `alt`
  EXCEPTION: SVG files — import as components or use bare `<img>`. Never pass
  SVGs through the `<Image />` optimization pipeline (throws in Astro 6).
- `loading="lazy"` by default; `fetchpriority="high"` on LCP image only
- `transition:name="hero-[element]"` for View Transitions morphing
- ARIA patterns per type: button, dialog, nav, accordion, card

## Scoped command
```
npx astro check src/components/
```
