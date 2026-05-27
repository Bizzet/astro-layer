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
5. Check the brief's **Visual Motif** entry. Apply it in this section if it hasn't appeared in 3 or more sections yet. The motif is a recurring structural element — it accumulates across the site, not an optional detail. **Track motif appearances explicitly:** after generating each section, note `Motif applied: [yes/no] — [where/how]`. If the motif has appeared fewer than 3 times by the time you reach the penultimate section, it must appear in the remaining sections regardless of fit — find a placement.
6. If no brief exists, default to whatever `tokens.css` contains — but sections must still vary layout and atmosphere rather than copying templates verbatim.

## Required declaration before writing code

**State all four of these before writing any HTML or CSS.** Do not proceed without declaring each.

```
Variant: [A/B/C/D/E/F/G] — [one-sentence reason tied to the brief, not "it's the default"]
Depth technique: [specific technique from depth-and-blend.md] — [applies to: which element/container]
  (required for Hero, About, Services spotlight, and any section with imagery — skip only for FAQ/Contact/Footer)
Section boundary: [transition out of this section] — [wave / diagonal clip-path / curve / overlap / color band / rule reveal]
  (use "flat" only if this section is immediately followed by a footer or if two transitions already exist on the page)
Entrance animation: [choose one from the list below based on section type]
```

**Entrance animation options by section type:**
- **Hero h1** — must use a kinetic typography pattern from `references/kinetic-type.md`, not a plain fadeInUp. Choose: `word-by-word stagger` (universal), `clip-path wipe` (Editorial/Brutalist/Minimal), `blur focus-in` (Luxury/Dark/Moody), `variable font morph` (if variable font in use), or `character pop` (Playful/Retro). Plain `slideUp` on the hero headline is not acceptable — it reads as a template.
- **Hero sub/CTA** — staggered fadeInUp after headline completes (animation-delay offset)
- **Section h2** — clip-path wipe left-to-right, or scroll-reveal fadeInUp
- **Card grids** — stagger via nth-child, 80ms gap per item
- **Pull quotes / stats** — blur focus-in or scroll-parallax drift
- **Image-heavy sections** — parallax scale on scroll (see depth-and-blend.md)

If the brief doesn't specify a preference for any of these, choose based on the archetype — do not default to the safest option. Flat boundaries, generic slide-up heroes, and Variant A defaults are the primary cause of generic output.

## The page as a scroll journey

Before choosing a variant, understand where this section sits in the page's emotional arc. A page is not a list of sections — it is a single experience with tension, climax, and resolution. Each section has a role:

| Position | Role | Design register |
|---|---|---|
| **Hero** | Arrival — the promise | Most ambitious typography, most visual energy |
| **Section 2** (Services/About teaser) | Proof — substantiate the promise | Calmer, more scannable, different layout from hero |
| **Section 3** (Social proof / Metrics) | Credibility — evidence | Quieter visual energy but high-impact numbers |
| **Section 4** (Detail / Process) | Depth — earn trust | More text, tighter layout, show the work |
| **Final section before footer** | Conversion — the ask | Re-amplify energy, strong CTA, return to hero's color register |

Apply this rhythm: hero peaks → middle sections gradually calm → final CTA section re-peaks. Never let the visual energy stay flat through the middle — create a valley that makes the final CTA feel earned.

## Choosing a layout variant

Every section has multiple layout variants in `references/sections.md`. **Do not default to Variant A every time.** Choose based on:
- The archetype's layout tendency from the design brief
- What sections are already on the page (vary rhythm — don't repeat the same layout twice in a row)
- The content being placed (many items → grid; few items → editorial/spotlight)
- The section's role in the page arc (arrival/proof/credibility/depth/conversion)

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
| Footer | Logo, nav `<ul>`, social links, copyright. **Read `references/footer-variants.md` before generating any footer** — the archetype determines which pattern to use. The starter template is never acceptable for a built site. |
| Logos | Infinite-scroll CSS marquee of partner/client/portfolio logos. Pause-on-hover. Reduces to static grid with `prefers-reduced-motion`. |
| Metrics | Large-number stat display — Pattern D typography (tiny uppercase label + giant value). Use for proof-of-scale: years, clients, revenue, units. **When a Metrics section contains 2+ stats, add GSAP counter animation** (from `skills/animate/references/animation-patterns.md`) — numbers that count up on scroll are a standard premium signal and require only ~15 lines of JS. |

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
- **Section h2 headlines must use the brief's weight contrast pair.** Not every section heading should be `var(--text-3xl)` at the same weight. Apply the brief's Pattern (A/B/C/D from `references/typography-composition.md`) to section headers: if the brief specifies Giant/Thin, section h2s should be thin-weight at a generous scale; if Heavy/Light, use bold weight tight tracking. The weight pair from the brief is not only for the hero — it's the site-wide typographic register.
- **For any section containing a number, stat, or measurable value** — use Pattern D (tiny-label/giant-value) from `typography-composition.md`. A number at `font-size: 1rem` inside a services card is a missed opportunity. Stats, testimonial counts, pricing amounts, and metrics must be oversized.
- **Hero and About sections require a decorative SVG background element.** Check `skills/svg-decorative` and choose an element appropriate to the archetype (blob for Organic/Natural/Soft, hard geometry for Brutalist/Art Deco, noise grain for Luxury/Dark/Moody, grid pattern for Tech-Industrial/Retro-Futuristic). The SVG sits absolutely positioned behind content. This is not optional — a hero with a plain flat background reads as unfinished.
- **Never generate a section with a flat rectangular top and bottom boundary** — every section either enters via a transition (wave, diagonal, curve, overlap) or exits via one. Flat box after flat box is the #1 visual tell of a template site. At minimum, 2–3 sections per page must have non-flat boundaries.
- **Never generate a section without entrance animations.** Apply `animation-timeline: view()` reveal animations to headlines, content blocks, and card grids. This is not optional and does not require a separate `/animate` call — add the CSS inline in the section's `<style>` block.
- **Hero sections require at least one technique from `references/depth-and-blend.md`.** Check that file before writing the Hero CSS. Apply the technique appropriate to the archetype — noise grain for Organic/Natural, mix-blend-mode for Editorial, glass morphism for Retro-Futuristic, duotone for Dark/Moody. The technique is not optional.
- **Overlapping elements must appear in at least 1 section per page** — a card, stat badge, or image that breaks out of its section boundary using negative margin or absolute positioning. See "Overlapping Elements (Breaking the Grid)" in `references/depth-and-blend.md`. This is the single highest-impact move for making a site feel designed rather than assembled.
- **Hover states on interactive elements must be distinctive** — not just `opacity: 0.8`. Match the archetype's shadow style, scale behavior, or color shift as described in the design brief. Apply a pattern from `references/interactions.md` — flood fill, underline draw-on, or card tilt — to at least one element per section that has interactive content.
- **Hero display type must never be smaller than `clamp(4rem, 10vw, 7rem)`.** Timid type is the primary reason sites look generic rather than award-worthy. When the brief specifies a larger scale, use it. When it doesn't specify, default to ambitious.
- **For VC, investment, consulting, or corporate-authority sites, offer Hero Variant E (Kinetic Word-Cycle)** — it is the defining pattern of award-winning sites in these categories. Suggest it proactively if the design brief matches.
- **If no variant in the section library fits the content and concept, invent a custom section.** Do not force content into a mismatched template. Write the custom section with CSS class names prefixed `custom-` and a single-line comment noting it is bespoke. The concept is the design authority — the library is a starting point, not a limit.
- **The Logos section is not optional for multi-client or portfolio businesses.** Any site with more than 5 named clients, investors, or partners should use the Logos section. A static logo grid is a fallback — prefer the marquee.
- **Section backgrounds must vary.** No page should have more than 2 consecutive sections with `var(--color-surface)` or `var(--color-bg)` as background. After 2 flat-background sections in a row, the next section must use: `var(--color-brand-subtle)`, a dark band (`var(--color-neutral-900)`), a gradient mesh, or a full-bleed image. Track this as you build the page.
- **Body copy paragraphs must be constrained to 60–72ch.** `max-width: 68ch` on any `<p>` that's the main reading column of a section. Full-width paragraphs spanning the container feel like a content dump, not a designed layout. The constraint also forces the surrounding composition to fill the remaining width with a secondary element (number, image, label column).
- **Accent color must appear if defined.** If the design brief defines a `--color-accent`, it must appear in at least 2 places per page — on a secondary CTA, a highlighted stat, a pull-quote border, or a decorative element. An accent that was defined but never appears means the dual-color system was wasted.

## Inline animation requirement

Every section must include reveal animations directly in its `<style>` block — do not defer to a separate `/animate` invocation. Minimum required:

```css
/* Apply to: headlines, content blocks, card/list items */
.section-name h2,
.section-name .intro-text {
  animation: section-reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-timeline: view();
  animation-range: entry 0% entry 35%;
}

.section-name .card-grid > * {
  animation: section-reveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

/* Stagger for repeated items */
.section-name .card-grid > *:nth-child(2) { animation-delay: 80ms; }
.section-name .card-grid > *:nth-child(3) { animation-delay: 160ms; }
.section-name .card-grid > *:nth-child(4) { animation-delay: 240ms; }

@keyframes section-reveal {
  from { opacity: 0; transform: translateY(1.25rem); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .section-name * { animation: none !important; }
}
```

Use a section-scoped keyframe name (e.g., `hero-reveal`, `services-reveal`) to avoid collision across sections.

## Reference

- `references/sections.md` — complete HTML/CSS/Props for all 8 sections, 3–4 layout variants each (including bold "statement" Variant D for Hero, Services, About), atmosphere patterns
- `references/section-transitions.md` — geometric dividers (wave SVG, angled cut, curved bottom, torn paper), overlapping sections, color bands, scroll-activated background shift; archetype recommendation table
- `skills/svg-decorative` — background blob shapes, texture overlays, grid patterns, ring motifs, corner ornaments; use when a section needs atmospheric depth beyond a color band
