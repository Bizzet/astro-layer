---
name: init
description: Use when setting up the astro-layer AI layer in an existing Astro project.
disable-model-invocation: true
---

# init

Sets up the astro-layer AI layer in an existing Astro project. Generates CLAUDE.md files, SITE_MAP.md, settings, and .claudeignore adapted to what the project already has.

## Flow

1. **Detect project** — Read `astro.config.mjs`:
   - Integrations (sitemap, mdx, etc.)
   - Output mode (static/server/hybrid)
   - Site URL
   - Any fonts configured

2. **Catalogue project** — Walk `src/`:
   - Pages in `src/pages/`
   - Components in `src/components/`
   - Layouts in `src/layouts/`
   - Content collections — check `src/content.config.ts`
   - Styles — check for `src/styles/tokens.css`

3. **Set up tokens** — If `src/styles/tokens.css` is missing, copy from starter template. If present, leave it and catalogue existing tokens.

4. **Generate CLAUDE.md hierarchy** from templates in `references/`:
   - Root `CLAUDE.md` — adapted with detected business name, integrations
   - `src/components/CLAUDE.md` — component conventions
   - `src/pages/CLAUDE.md` — page conventions
   - `src/styles/CLAUDE.md` — populate token catalog from actual `tokens.css`

5. **Generate SITE_MAP.md** — list all detected pages with routes, components, collections

6. **Write `.claudeignore`** from template

7. **Write `.claude/settings.json`** from template

## Templates

All templates are in `references/`. Adapt them to what was found:
- Replace `[Business Name]` with detected or inferred name
- Update integration list based on `astro.config.mjs`
- Auto-populate token catalog from actual `tokens.css` values

## Output Summary

Report what was created:
```
✓ astro-layer initialized

Generated:
  CLAUDE.md                 — root context
  src/components/CLAUDE.md  — component conventions
  src/pages/CLAUDE.md       — page conventions
  src/styles/CLAUDE.md      — token catalog (14 tokens found)
  SITE_MAP.md               — 4 pages catalogued
  .claudeignore
  .claude/settings.json

Detected:
  Astro integrations: @astrojs/sitemap, @astrojs/mdx
  Pages: /, /about, /services, /contact
  Collections: none
  Tokens.css: found (left unchanged)
```
