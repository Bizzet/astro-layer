---
name: new-component
description: Use when creating any Astro component — UI elements, layout wrappers,
  interactive widgets. Applies TypeScript props, scoped CSS with design tokens, ARIA.
paths:
  - src/components/**
---

# new-component

Creates self-contained Astro components with TypeScript Props interface, scoped CSS using design tokens only, and proper ARIA attributes.

## Before generating anything

Read `.claude/design-brief.md` if it exists. It defines the archetype, radius personality, shadow style, font choices, and atmosphere. Components must be coherent with the brief — a Brutalist site shouldn't get rounded pill buttons; a Luxury site shouldn't get playful bounce animations.

## Requirements

Every component created by this skill must:
- Have a `Props` interface (not inline, not anonymous)
- Use only `var(--token)` in the scoped `<style>` block — zero hard-coded values
- Use `<Image />` from `astro:assets` for all raster images
- Never pass SVG sources to `<Image />` (Astro 6 throws — use import or bare `<img>`)
- Include appropriate ARIA attributes for the component type
- Export nothing from the frontmatter (components are not pages)

## Anti-generic rules — enforce always

- **Never use `color: #fff` or `color: #000`** on any element — use `var(--color-surface)`, `var(--color-text)`, or a semantic token.
- **Never use `font-family: system-ui`** as the display/heading font. The design brief specifies the font pair — use it.
- **Never default to `border-radius: 9999px`** (pill shape) for all buttons unless the brief's radius personality is "round" or "full".
- **Never use `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`** — that is generic CSS shadow. Use `var(--shadow-sm)`, `var(--shadow-md)`, or a custom shadow that matches the archetype's shadow style.
- **Never use `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)`** or any purple gradient — this is the most overused AI-generated aesthetic.
- **Consider**: could this component use an animation? Could the hover state be more interesting than just `opacity: 0.8`? Could the layout be asymmetric?

## Reference

See `references/component-patterns.md` for:
- Required structure template
- Props naming rules
- CSS conventions
- SVG handling rule
- ARIA patterns by component type (button, dialog, nav, accordion, card)
- Naming conventions
