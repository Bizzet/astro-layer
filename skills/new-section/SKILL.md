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

1. Read `.claude/design-brief.md` if it exists. It defines the archetype, layout tendency, section variant preferences, typography composition, signature moves, and atmosphere. Every section must match the brief.
2. Check the brief's **Signature Moves** section. If generating a Hero or the first visible section, at least one Signature Move must appear. For all other sections, check whether this is the designated location for any signature move or grid break — if it is, implement it here.
3. Check the brief's **Typography Composition** section before writing any headline. The hero `h1` must use the specified `clamp()` display size, tracking, and weight contrast. Apply the type risk move in the Hero section.
4. Check the brief's **One Grid Break** entry. If this section is the specified location, implement the grid break as described.
5. Check the brief's **Visual Motif** entry. Apply it in this section if it hasn't appeared in 3 or more sections yet. The motif is a recurring structural element — it accumulates across the site, not an optional detail.
6. If no brief exists, default to whatever `tokens.css` contains — but sections must still vary layout and atmosphere rather than copying templates verbatim.

## Choosing a layout variant

Every section has multiple layout variants in `references/sections.md`. **Do not default to Variant A every time.** Choose based on:
- The archetype's layout tendency from the design brief
- What sections are already on the page (vary rhythm — don't repeat the same layout twice in a row)
- The content being placed (many items → grid; few items → editorial/spotlight)

## The Section Library

| Section | Key Elements |
|---|---|
| Hero | `<h1>` headline, subheadline `<p>`, CTA `<a>`, optional raster `<Image />` background. **Variant E (Kinetic Word-Cycle)** available for sites where the brand idea can be expressed as rotating charged words — pure CSS, zero JS. |
| Services | `<ul role="list">` of icon + title + description cards |
| About | `<Image />` + bio `<p>` + trust signals |
| Testimonials | `<blockquote>` + `<cite>` + star rating via CSS counter. **Variant D (Numbered Portrait)** for leadership voices — bold index numbers + portrait photo. |
| Pricing | 2–3 `<article>` tier cards, featured tier via token override |
| FAQ | `<details>`/`<summary>` accordion — no JS required |
| Contact | `<form>` (Formspree action or Astro API route), address/hours |
| Footer | Logo, nav `<ul>`, social links, copyright |
| Logos | Infinite-scroll CSS marquee of partner/client/portfolio logos. Pause-on-hover. Reduces to static grid with `prefers-reduced-motion`. |
| Metrics | Large-number stat display — Pattern D typography (tiny uppercase label + giant value). Use for proof-of-scale: years, clients, revenue, units. |

## Requirements

- Use semantic HTML for the section type (see table above)
- All CSS values use `var(--token)` — zero hard-coded values
- SVG images: import as Astro components or use bare `<img>` — never pass `.svg` sources to `<Image />` (Astro 6.3 throws)
- Raster images (`<Image />` from `astro:assets`): explicit `width`, `height`, `alt`
- Add `transition:animate` directive for View Transitions
- Include appropriate ARIA labels for interactive elements

## Visual quality rules — enforce always

- **Never default to `auto-fit minmax(18rem, 1fr)`** for Services without considering the Editorial Feature List or Alternating Spotlight variants.
- **Never use `text-align: center` on every section** — centered layouts feel generic. Vary alignment between sections.
- **Never give every section the same background** — use the atmosphere patterns from `references/sections.md` to create variation: surface-tinted sections, brand-accent bands, full-bleed imagery, texture overlays.
- **Never stack sections with identical visual weight** — vary section density, background, and layout rhythm deliberately.
- **Never produce a CTA button with `color: #fff` hard-coded** — use `var(--color-surface)` or a semantic token.
- **Hero sections require at least one technique from `references/depth-and-blend.md`.** Check that file before writing the Hero CSS. Apply the technique appropriate to the archetype — noise grain for Organic/Natural, mix-blend-mode for Editorial, glass morphism for Retro-Futuristic, duotone for Dark/Moody. The technique is not optional.
- **Hover states on interactive elements must be distinctive** — not just `opacity: 0.8`. Match the archetype's shadow style, scale behavior, or color shift as described in the design brief.
- **Hero display type must never be smaller than `clamp(4rem, 10vw, 7rem)`.** Timid type is the primary reason sites look generic rather than award-worthy. When the brief specifies a larger scale, use it. When it doesn't specify, default to ambitious.
- **For VC, investment, consulting, or corporate-authority sites, offer Hero Variant E (Kinetic Word-Cycle)** — it is the defining pattern of award-winning sites in these categories. Suggest it proactively if the design brief matches.
- **If no variant in the section library fits the content and concept, invent a custom section.** Do not force content into a mismatched template. Write the custom section with CSS class names prefixed `custom-` and a single-line comment noting it is bespoke. The concept is the design authority — the library is a starting point, not a limit.
- **The Logos section is not optional for multi-client or portfolio businesses.** Any site with more than 5 named clients, investors, or partners should use the Logos section. A static logo grid is a fallback — prefer the marquee.

## Reference

- `references/sections.md` — complete HTML/CSS/Props for all 8 sections, 3–4 layout variants each (including bold "statement" Variant D for Hero, Services, About), atmosphere patterns
- `references/section-transitions.md` — geometric dividers (wave SVG, angled cut, curved bottom, torn paper), overlapping sections, color bands, scroll-activated background shift; archetype recommendation table
- `skills/svg-decorative` — background blob shapes, texture overlays, grid patterns, ring motifs, corner ornaments; use when a section needs atmospheric depth beyond a color band
