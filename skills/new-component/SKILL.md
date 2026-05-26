---
name: new-component
description: Use when creating any Astro component — UI elements, layout wrappers,
  interactive widgets. Applies TypeScript props, scoped CSS with design tokens, ARIA.
paths:
  - src/components/**
---

# new-component

Creates self-contained Astro components with TypeScript Props interface, scoped CSS using design tokens only, and proper ARIA attributes.

## Requirements

Every component created by this skill must:
- Have a `Props` interface (not inline, not anonymous)
- Use only `var(--token)` in the scoped `<style>` block — zero hard-coded values
- Use `<Image />` from `astro:assets` for all raster images
- Never pass SVG sources to `<Image />` (Astro 6 throws — use import or bare `<img>`)
- Include appropriate ARIA attributes for the component type
- Export nothing from the frontmatter (components are not pages)

## Reference

See `references/component-patterns.md` for:
- Required structure template
- Props naming rules
- CSS conventions
- SVG handling rule
- ARIA patterns by component type (button, dialog, nav, accordion, card)
- Naming conventions
