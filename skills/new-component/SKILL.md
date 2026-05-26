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

1. Read `.claude/design-brief.md` if it exists. It defines the archetype, radius personality, shadow style, font choices, typography composition, signature moves, and atmosphere. Components must be coherent with the brief — a Brutalist site shouldn't get rounded pill buttons; a Luxury site shouldn't get playful bounce animations.
2. Check the brief's **Signature Moves** section. If this component is a Hero, feature card, or any prominent above-the-fold element, at least one Signature Move must be implemented in this component.
3. Check the brief's **Typography Composition** section. If this component contains a primary heading, apply the specified `clamp()` display size, tracking, and weight contrast. Apply the type risk move if this is the Hero component.
4. Check the brief's **Visual Motif** entry. If this component is a prominent or repeated element (hero, feature card, section header, nav, stat block), the motif should appear in or on it. The motif is a structural commitment — if it's absent from prominent components, the concept exists only in the brief.

## Requirements

Every component created by this skill must:
- Have a `Props` interface (not inline, not anonymous)
- Use only `var(--token)` in the scoped `<style>` block — zero hard-coded values
- Use `<Image />` from `astro:assets` for all raster images
- Never pass SVG sources to `<Image />` (Astro 6 throws — use import or bare `<img>`)
- Include appropriate ARIA attributes for the component type
- Export nothing from the frontmatter (components are not pages)

## Visual quality rules — enforce always

- **Never use `color: #fff` or `color: #000`** — use `var(--color-surface)`, `var(--color-text)`, or a semantic token.
- **Never use `font-family: system-ui`** as the display/heading font. The design brief specifies the font pair — use it.
- **Never default to `border-radius: 9999px`** (pill shape) for all buttons unless the brief's radius personality is "round" or "full".
- **Never use `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`** — use `var(--shadow-sm)`, `var(--shadow-md)`, or a custom shadow that matches the archetype's shadow style.
- **Never use `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)`** or any purple gradient.
- **Hover states must be distinctive.** `opacity: 0.8` on hover is not a design decision. Every interactive component needs a hover state that reflects the archetype: hard-offset shadow shift for Brutalist, glow intensification for Retro-Futuristic, thin underline reveal for Editorial, scale + shadow for Playful. Choose one that fits.
- **Hero and feature components require at least one technique from `references/depth-and-blend.md`.** Check that file before writing the CSS for any hero, feature card, or visually prominent component. The techniques are not optional for prominent placements — apply the one that best fits the archetype and concept.

## Reference

- `references/component-patterns.md` — required structure, Props naming, CSS conventions, SVG rule, ARIA patterns, naming conventions
- `references/depth-and-blend.md` — mix-blend-mode on text/images, duotone effects, color overlay with blend, glass morphism, overlapping elements (z-axis composition), noise grain texture, CSS gradient noise, scroll parallax on images; archetype usage guide. **Read this for every hero and feature component.**
- `skills/svg-decorative` — ready-made decorative SVG components (blobs, grain overlays, grids, rings, ornaments) for adding background atmosphere to prominent components
