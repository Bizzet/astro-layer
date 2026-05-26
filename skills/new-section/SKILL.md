---
name: new-section
description: Use when adding a named business section to a page — Hero, Services,
  About, Testimonials, Pricing, FAQ, Contact, Footer.
paths:
  - src/**
---

# new-section

Adds one of the 8 standard business sections to an Astro page. Each section is a self-contained component with semantic HTML, design-token-only CSS, and ARIA.

## Before generating anything

1. Read `.claude/design-brief.md` if it exists. It defines the archetype, layout tendency, section variant preferences, and atmosphere. Every section must match the brief.
2. If no brief exists, default to whatever tokens.css contains — but note that sections should still vary layout and atmosphere rather than copying templates verbatim.

## Choosing a layout variant

Every section has multiple layout variants in `references/sections.md`. **Do not default to Variant A every time.** Choose based on:
- The archetype's layout tendency from the design brief
- What sections are already on the page (vary rhythm — don't repeat the same layout twice in a row)
- The content being placed (many items → grid; few items → editorial/spotlight)

## The 8-Section Library

| Section | Key Elements |
|---|---|
| Hero | `<h1>` headline, subheadline `<p>`, CTA `<a>`, optional raster `<Image />` background |
| Services | `<ul role="list">` of icon + title + description cards |
| About | `<Image />` + bio `<p>` + trust signals |
| Testimonials | `<blockquote>` + `<cite>` + star rating via CSS counter |
| Pricing | 2–3 `<article>` tier cards, featured tier via token override |
| FAQ | `<details>`/`<summary>` accordion — no JS required |
| Contact | `<form>` (Formspree action or Astro API route), address/hours |
| Footer | Logo, nav `<ul>`, social links, copyright |

## Requirements

- Use semantic HTML for the section type (see table above)
- All CSS values use `var(--token)` — zero hard-coded values
- SVG images: import as Astro components or use bare `<img>` — never pass `.svg` sources to `<Image />` (Astro 6.3 throws)
- Raster images (`<Image />` from `astro:assets`): explicit `width`, `height`, `alt`
- Add `transition:animate` directive for View Transitions
- Include appropriate ARIA labels for interactive elements

## Anti-generic rules — enforce always

- **Never default to `auto-fit minmax(18rem, 1fr)`** for Services without considering the Editorial Feature List or Alternating Spotlight variants.
- **Never use `text-align: center` on every section** — centered layouts feel generic. Vary alignment between sections.
- **Never give every section the same background** — use the atmosphere patterns from `references/sections.md` to create variation: surface-tinted sections, brand-accent bands, full-bleed imagery, texture overlays.
- **Never stack sections with identical visual weight** — vary section density, background, and layout rhythm deliberately.
- **Never produce a CTA button with `color: #fff` hard-coded** — use `var(--color-surface)` or a semantic token.

## Reference

- `references/sections.md` — complete HTML/CSS/Props for all 8 sections, 3–4 layout variants each (including bold "statement" Variant D for Hero, Services, About), atmosphere patterns
- `references/section-transitions.md` — geometric dividers (wave SVG, angled cut, curved bottom, torn paper), overlapping sections, color bands, scroll-activated background shift; archetype recommendation table
