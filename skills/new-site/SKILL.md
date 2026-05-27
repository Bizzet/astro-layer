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
5. **Look, feel & assets** — a reference site with the right feeling, what to avoid, and what content already exists (photos, logo, reviews). Include 2–3 words describing how the site should *feel* (e.g. "warm, trustworthy, no-nonsense" or "precise, premium, quiet").

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

## Brand Adjectives
[3 words — how the site should feel]
Anti-adjectives: [words it must NOT feel like, from the "avoid" field above]

## SEO Details
Address: [if known]
Phone: [if known]
Hours: [if known]
```

## Phase 0.5 — Information Architecture

**Run this phase for any site with 4+ pages or multiple audience types. Skip for 3 or fewer pages with a single audience.**

**Call the `sequentialthinking` MCP tool** to determine before touching any files:
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
3. **Run `design-direction`** using the brief's industry/audience, brand adjectives, and anti-adjectives. This overwrites `src/styles/tokens.css` with a fully-derived visual identity and writes `.claude/design-brief.md`. Do not adjust token colors manually — design-direction owns this step entirely. See `references/site-brief.md` for adjective derivation guidance when the user's prompt lacks explicit adjectives.
4. **Rewrite `src/components/Header.astro`** based on the archetype from the design brief. Read `skills/init/references/nav-variants.md` and use the pattern that matches the archetype. The starter Header.astro is a baseline — it must not survive into any built site verbatim. Archetype-specific traits: background treatment (transparent/solid/ghost), link style (small-caps/mono/tracked/bold), hover state (underline draw / color flood / glow / hard block), CTA treatment (present/absent/text-link). If the archetype is Luxury or Dark/Moody, use the fixed+scroll-transition pattern and add `padding-top` to the hero section. Always include the mobile hamburger overlay.
5. Generate `CLAUDE.md` hierarchy and `SITE_MAP.md` following the `init` skill (see `skills/init/SKILL.md` steps 3–5). All four files are required:
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

**Before building any page, evaluate whether it qualifies for a scroll storytelling section** (from `skills/animate/references/animation-patterns.md`). Use a pinned scroll story section when:
- A Services page has 4+ discrete steps or offerings that benefit from sequential reveal
- A home page has a "how it works" or "our process" block with 3+ steps
- An About page has a team or timeline that benefits from sequential unveiling

If a page qualifies, replace the static section with a pinned scroll story. This is a defining pattern of premium landing pages and immediately distinguishes the site from templates.

For each page where `status === "pending"`:

1. Call `new-page` skill to create the page file
2. Call `new-section` for each section in the page's `sections` array
3. Run `npx astro check` — fix errors before proceeding
4. Run `npm run build` — fix errors before proceeding
5. **Design quality gate** — before marking the page complete, verify all of the following. Fix any that are missing:
   - [ ] **Entrance animations**: Every section has `animation-timeline: view()` reveals on headlines and content blocks
   - [ ] **Section boundaries**: At least 2 sections on this page use a non-flat transition (wave / diagonal / curve / overlap / color band)
   - [ ] **Depth technique**: At least 1 section uses a technique from `depth-and-blend.md` (noise grain, blend mode, glass, duotone, parallax, or overlapping element)
   - [ ] **Overlapping element**: At least 1 element breaks its section boundary via negative margin, absolute overflow, or z-axis layering
   - [ ] **Signature moves**: All moves from the design brief that are designated for this page appear
   - [ ] **Hover states**: All interactive cards and links use a pattern from `references/interactions.md` — not `opacity: 0.8`
   - [ ] **Section background variation**: No more than 2 consecutive sections have the same background — verify color bands / dark sections / tinted panels alternate with flat sections
   - [ ] **Concept-driven hero copy**: The hero headline must reflect the creative concept sentence from the brief — not a generic industry tagline. If the concept is "a logistics company with the restraint of a Swiss watchmaker's archive," the headline should evoke precision/restraint, not "Fast & Reliable Shipping." Rewrite if the copy is generic.
   - [ ] **Custom cursor** *(Luxury, Dark/Moody, Editorial, Retro-Futuristic, Minimal/Clean only)*: Add the custom cursor script from `skills/animate/references/interactions.md` to `src/layouts/Base.astro`. This is a defining premium signal — a small branded dot with lag that expands over interactive elements. Add only if the archetype is in this list; skip for Organic/Natural, Soft/Pastel, Coastal/Airy, Playful.
6. Update page `status` to `"complete"` in `.claude/build-state.json`
7. Update PLAN.md: check off `- [ ] Build [Page] page` → `- [x] Build [Page] page`
8. `git commit -m "feat: build [page-id] page"`

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
