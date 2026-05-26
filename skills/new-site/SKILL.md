---
name: new-site
description: Use when building a new small-business Astro website from scratch.
  Builds the entire site autonomously from a single prompt using build-state
  checkpointing for safe resumption if interrupted.
disable-model-invocation: true
---

# new-site

Builds a complete small-business Astro 6.3 website autonomously from a single prompt.

## Single-Prompt Usage

If the user provides enough context in the invocation, skip the Q&A phase entirely:

```
/astro-layer:new-site — Martinez Plumbing, Austin TX, plumbing & HVAC,
  pages: Home/About/Services/Contact, earthy greens

/astro-layer:new-site — Lakeview Dental, friendly family dentist,
  pages: Home/Services/About/Contact/Blog, clean blue and white
```

Map prompt content to the five brief fields below. Note which fields are **inferred** vs explicitly stated, and which are **missing** (ask only for missing ones).

## Phase 0 — Brief

### Five Required Questions

Ask these five questions only if the prompt doesn't answer them. When extracting from a single-prompt, map to these fields and note inferred vs missing.

See `references/site-brief.md` for the full question list, industry → color mapping, and example prompts.

1. **Business type & name** — what do they do and what are they called?
2. **The one action** — what should a visitor do when they land on the site?
3. **The differentiator** — what keeps customers coming back that competitors can't honestly say about themselves?
4. **The customer** — describe the best customer as a person: who are they, and why did they choose this business over others?
5. **Look, feel & assets** — a reference site with the right feeling, what to avoid, and what content already exists (photos, logo, reviews)

### Scraping Existing or Reference Sites

If the client mentioned an existing site URL or a reference site in their prompt or answers, scrape it with Firecrawl before writing the brief:

```
use firecrawl MCP to scrape <url>
```

Extract from the scraped content:
- Existing copy (headlines, service descriptions, about text)
- Page structure and navigation
- Contact info (address, phone, email)
- Business hours
- Any photos or assets referenced

Populate the brief fields automatically from scraped content. This replaces asking the client for information that's already on their site. Note what was scraped vs what was provided.

### Write BRIEF.md

After brief collection, write `BRIEF.md` at the project root before touching any code:

```markdown
# [Business Name] — Creative Brief

**Business:** [name], [tagline], [industry]
**One action:** [the single thing a visitor should do]
**Differentiator:** [what keeps customers coming back]
**Best customer:** [persona — who they are and why they chose this business]

## Look & Feel
[reference site], avoid: [things to avoid]
[any existing assets: photos, logo, reviews]

## Brand Color
[rationale for chosen hue]

## SEO Details
Address: [if known]
Phone: [if known]
Hours: [if known]
```

## Phase 0.5 — Information Architecture

**Run this phase for any site with 4+ pages or multiple audience types. Skip for 3 or fewer pages with a single audience.**

Use Sequential Thinking MCP to determine before touching any files:
- Audience hierarchy (primary → secondary)
- Primary conversion path (the sequence of pages/sections that moves a visitor to the one action)
- Section order per page (most important content first)
- Content priority (what to emphasize vs de-emphasize)

### Write PLAN.md

After IA (or immediately after BRIEF.md for small sites), write `PLAN.md` at the project root before touching any code. For sites that ran Phase 0.5, include the IA output as context above the checklist.

```markdown
# [Business Name] — Build Plan

## Pages & Sections
- **Home:** hero → services-teaser → testimonials → cta
- **About:** about
- **Services:** services-grid
- **Contact:** contact

## Components
- Header, Footer, HeroSection, ServicesTeaser, TestimonialsSection, CtaBand, AboutSection, ServicesGrid, ContactSection

## Build Tasks
- [ ] Scaffold project
- [ ] Build Home page
- [ ] Build About page
- [ ] Build Services page
- [ ] Build Contact page
- [ ] SEO pass
- [ ] Quality & performance check
- [ ] Deploy to Vercel
```

Check off tasks using str_replace as they complete: `- [ ]` → `- [x]`.

## Phase 1 — Scaffold

BRIEF.md and PLAN.md are already written. Now:

1. Copy `starter/` to target directory
2. Update `astro.config.mjs` site URL
3. Adjust `--color-brand` tokens for industry (see site-brief.md)
4. Generate `CLAUDE.md` hierarchy and `SITE_MAP.md` following the `init` skill (see `skills/init/SKILL.md` steps 3–5). All four files are required:
   - `CLAUDE.md` — root context (from `skills/init/references/CLAUDE.root.md`)
   - `src/components/CLAUDE.md` — component conventions
   - `src/pages/CLAUDE.md` — page conventions
   - `src/styles/CLAUDE.md` — token catalog populated from actual `tokens.css`
5. Initialize build state at `.claude/build-state.json`:

```json
{
  "version": "1",
  "status": "in_progress",
  "business": { "name": "", "tagline": "", "industry": "" },
  "pages": [
    { "id": "home",     "status": "pending", "sections": ["hero","services-teaser","testimonials","cta"] },
    { "id": "about",    "status": "pending", "sections": ["about"] },
    { "id": "services", "status": "pending", "sections": ["services-grid"] },
    { "id": "contact",  "status": "pending", "sections": ["contact"] }
  ],
  "seo_done": false,
  "quality_check_done": false,
  "started_at": "<ISO timestamp>",
  "completed_at": null
}
```

6. Update PLAN.md: check off `- [ ] Scaffold project` → `- [x] Scaffold project`
7. `git commit -m "chore: scaffold [Business Name] site"`

## Phase 2 — Build Pages (One at a Time)

For each page where `status === "pending"`:

1. Call `new-page` skill to create the page file
2. Call `new-section` for each section in the page's `sections` array
3. Run `npx astro check` — fix errors before proceeding
4. Run `npm run build` — fix errors before proceeding
5. Update page `status` to `"complete"` in `.claude/build-state.json`
6. Update PLAN.md: check off `- [ ] Build [Page] page` → `- [x] Build [Page] page`
7. `git commit -m "feat: build [page-id] page"`

## Phase 3 — SEO Pass

Call `seo-optimize` for every page. Add LocalBusiness JSON-LD on homepage using SEO details from BRIEF.md.
Update `build-state.json`: `"seo_done": true`. Update PLAN.md: check off SEO task. Commit.

## Phase 4 — Verification

Run `quality-check` and `performance-check` skill logic automatically. Fix any failures.
Update `build-state.json`: `"quality_check_done": true`, `"status": "complete"`, `"completed_at": "<ISO>"`.
Update PLAN.md: check off quality, performance, and deploy tasks as applicable.
Final commit: `git commit -m "feat: complete [Business Name] site build"`

## Phase 5 — Report

```
✓ [Business Name] site built successfully.

Pages:          Home, About, Services, Contact
Sections:       Hero, Services teaser, Testimonials, CTA, About, Services grid, Contact form
SEO:            LocalBusiness JSON-LD, OG tags, sitemap, robots.txt
Quality check:  Passed
Performance:    Passed
Commits:        5

Next steps:
  npm run dev                          — preview locally
  /astro-layer:deploy-vercel           — get a live preview URL
  /astro-layer:client-handoff          — generate client documentation
```

## Resuming an Interrupted Build

If `.claude/build-state.json` exists with `"status": "in_progress"`, read it and resume from the first page where `status !== "complete"`. Also read BRIEF.md and PLAN.md for context. Never re-build pages that are already complete.

## Context Note

Claude Code on paid plans supports a 1M token context window with automatic compaction. Single-prompt full-site builds are viable. Build state is a safety net for error recovery and resumption, not because context is expected to run out.
