---
name: local-seo-pages
description: Use when a local business wants to rank in nearby cities, set up
  service area pages, create location landing pages, add individual service pages,
  target multiple city markets, or build out the local SEO foundation for a
  service-area business.
paths:
  - src/data/**
  - src/pages/locations/**
  - src/pages/services/**
  - src/components/**
---

# local-seo-pages

Creates the two-pillar local SEO foundation for service-area businesses:

- **Service pages** — one page per service offered (`/services/[service]`), keyword-targeted
- **Location pages** — one page per city served (`/locations/[city]`), geo-targeted

Both pillars interlink: each service page lists the cities it's available in; each location page lists the services offered there.

## When This Skill Activates

- "rank in nearby cities / towns / suburbs"
- "set up service area pages / location pages"
- "target [city] and surrounding areas"
- "create pages for every city we serve"
- "local SEO for multiple locations"
- "add individual service pages" / "a page for each service"
- "we offer X, Y, and Z — each needs its own page"
- `src/data/locations.ts` or `src/data/services.ts` does not exist yet on a local business site

## Before Writing Any Files

**Call the `sequentialthinking` MCP tool** to plan:
- Extract `businessName`, `primaryCity`, `state`, and the full list of services from `CLAUDE.md`
- Decide which pillars are needed: service pages only, location pages only, or both
- Decide how many nearby cities to generate (default: 8–12)
- Order the files by dependency: data files → index pages → dynamic pages → shared components

## What Gets Created

### Service pillar
1. `src/data/services.ts` — service data file (generated once, human-editable)
2. `src/pages/services/index.astro` — services listing page
3. `src/pages/services/[service].astro` — dynamic page per service

URLs: `/services/`, `/services/drain-cleaning/`, `/services/water-heater-repair/`

### Location pillar
4. `src/data/locations.ts` — city data file (generated once, human-editable)
5. `src/pages/locations/index.astro` — "Service Areas" listing page
6. `src/pages/locations/[city].astro` — dynamic page per city slug
7. `src/components/LocationCard.astro` — card used in the locations index grid

URLs: `/locations/`, `/locations/austin-tx/`, `/locations/round-rock-tx/`

## Service Pages Data Strategy

Extract services from `CLAUDE.md` context. For each service produce:
- `name`: display name ("Drain Cleaning")
- `slug`: URL segment ("drain-cleaning")
- `headline`: H1 text ("Professional Drain Cleaning Service")
- `description`: unique 150–160 char meta description — must include service keyword and primary city
- `blurb`: 2–3 sentences for the page intro that describe what the service is and why it matters
- `benefits`: 3–5 short bullet strings ("Same-day service", "Licensed technicians")
- `isPrimary`: true for the business's main/flagship service

**Content rule:** `blurb` must be service-specific, not copy-pasted boilerplate. Each service page's title should follow: `[Service Name] in [City], [State] | [Business Name]`.

## Nearby Cities Data Strategy

Generate city entries using geographic knowledge — no external lookup needed. For each city produce:
- `blurb`: 1–2 sentences that are **factually specific** to that city (growth trends, character, known districts, industry). Never generic filler.
- `landmarks`: real local areas/neighborhoods that give each page unique anchor text

If geographic knowledge is uncertain (non-US/UK/AU metros, very rural areas), ask the user to supply city names before generating.

## Internal Linking Rule

Both pillars must cross-link:
- Service pages → list cities where that service is available (links to `/locations/[city]`)
- Location pages → list services available in that city (links to `/services/[service]`)

This creates a crawlable mesh that reinforces topical authority for both dimensions.

## After Creating Files

- Confirm `astro.config.mjs` has a `site:` URL set — required for sitemap to include both `/services/*` and `/locations/*`
- Update the homepage `LocalBusiness` JSON-LD: add `areaServed` array and `hasOfferCatalog` listing all services
- Tell the user both data files are human-editable — review blurbs and adjust before publishing

## Reference

See `references/local-seo-patterns.md` for the complete data schemas, all page templates, the `LocationCard` component, and all JSON-LD patterns (Service schema, BreadcrumbList, multi-city areaServed, `@graph` wrapper, `hasOfferCatalog`).
