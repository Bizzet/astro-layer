---
name: new-section
description: Use when adding a named business section to a page — Hero, Services,
  About, Testimonials, Pricing, FAQ, Contact, Footer.
paths:
  - src/**
---

# new-section

Adds one of the 8 standard business sections to an Astro page. Each section is a self-contained component with semantic HTML, design-token-only CSS, and ARIA.

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

## Reference

See `references/sections.md` for complete HTML/CSS/Props patterns for all 8 sections.
