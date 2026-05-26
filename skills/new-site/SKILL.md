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

Extract: business name, industry, pages, color preference. If any are missing, ask.

## Phase 0 — Brief (if not provided in prompt)

Ask these five questions only if the prompt doesn't answer them:
1. Business name and tagline
2. Industry (determines color palette and copy tone)
3. Pages needed
4. Brand color preference (or derive from industry)
5. Any specific requirements (e.g., blog, pricing, portfolio)

See `references/site-brief.md` for industry → color mapping and example prompts.

## Phase 1 — Scaffold

1. Copy `starter/` to target directory
2. Update `astro.config.mjs` site URL
3. Adjust `--color-brand` tokens for industry (see site-brief.md)
4. Generate `CLAUDE.md` hierarchy and `SITE_MAP.md` via `init` patterns
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

6. `git commit -m "chore: scaffold [Business Name] site"`

## Phase 2 — Build Pages (One at a Time)

For each page where `status === "pending"`:

1. Call `new-page` skill to create the page file
2. Call `new-section` for each section in the page's `sections` array
3. Run `npx astro check` — fix errors before proceeding
4. Run `npm run build` — fix errors before proceeding
5. Update page `status` to `"complete"` in `.claude/build-state.json`
6. `git commit -m "feat: build [page-id] page"`

## Phase 3 — SEO Pass

Call `seo-optimize` for every page. Add LocalBusiness JSON-LD on homepage.
Update `build-state.json`: `"seo_done": true`. Commit.

## Phase 4 — Verification

Run `quality-check` and `performance-check` skill logic automatically. Fix any failures.
Update `build-state.json`: `"quality_check_done": true`, `"status": "complete"`, `"completed_at": "<ISO>"`.
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

If `.claude/build-state.json` exists with `"status": "in_progress"`, read it and resume from the first page where `status !== "complete"`. Never re-build pages that are already complete.

## Context Note

Claude Code on paid plans supports a 1M token context window with automatic compaction. Single-prompt full-site builds are viable. Build state is a safety net for error recovery and resumption, not because context is expected to run out.
