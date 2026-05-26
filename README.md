# astro-layer

A Claude Code community plugin that gives Claude everything it needs to build complete, beautiful small-business Astro 6.3 websites autonomously.

---

## Prerequisites

```bash
node --version   # must be v22.12.0 or higher (Astro 6 requirement)
npm install -g @astrojs/language-server
```

> **Without the language server**, LSP silently fails and Claude falls back to text search.

---

## Install

```bash
/plugin marketplace add Bizzet/astro-layer
/plugin install astro-layer
```

---

## Usage

```bash
# ── Entry points (type once) ──────────────────────────────
/astro-layer:new-site          # full site from brief
/astro-layer:init              # instrument existing project

# ── Auto-invoked as Claude works ─────────────────────────
# new-component, new-page, new-section, design-tokens,
# seo-optimize, content-collection, add-blog,
# animate, dark-mode, add-font

# ── Deliberate actions (type explicitly) ─────────────────
/astro-layer:deploy-vercel
/astro-layer:quality-check
/astro-layer:performance-check
/astro-layer:client-handoff

# ── Verify install ────────────────────────────────────────
node tooling/validate-all.js   # 15/15

# ── Keep current ─────────────────────────────────────────
npx @astrojs/upgrade           # upgrades Astro + all official integrations
```

---

## How skills load

**User-invoked entry points** (`new-site`, `init`) require you to type the command explicitly and have `disable-model-invocation: true`.

**Model-auto-invoked** skills (`new-component`, `new-page`, `new-section`, `design-tokens`, `seo-optimize`, `content-collection`, `add-blog`, `animate`, `dark-mode`, `add-font`) are selected by Claude automatically when they match the task.

**User-invoked deliberate actions** (`deploy-vercel`, `performance-check`, `quality-check`, `client-handoff`) require explicit invocation and have `disable-model-invocation: true`.

---

## Subdirectory initialization

Start Claude from within a subdirectory when working in one area:

```bash
# Components only
cd src/components && claude

# Pages only
cd src/pages && claude
```

Claude walks up the tree automatically — root `CLAUDE.md` is never lost.

---

## Astro 6 key facts

- Node 22.12.0+ required
- `<ClientRouter />` replaces removed `<ViewTransitions />`
- Content collections use Content Layer API (`src/content.config.ts` + `glob()`)
- Import `z` from `'astro/zod'`, not from `'astro:content'`
- `entry.id` replaces `entry.slug`; `render(entry)` replaces `entry.render()`
- SVG sources cannot be passed to `<Image />` by default
- Built-in Fonts API available (`fontProviders` in `astro.config.mjs`)

---

## What gets generated (`init`)

| File | Contents |
|---|---|
| `CLAUDE.md` | Business name, tech stack, integrations, design system overview, commands, v6 conventions, subdirectory init guidance |
| `src/components/CLAUDE.md` | Props pattern, scoped CSS rules, ARIA requirements, Image/SVG usage, scoped command |
| `src/pages/CLAUDE.md` | Layout pattern, SEO frontmatter, routing conventions, entry.id/render() v6 patterns, scoped command |
| `src/styles/CLAUDE.md` | Full token catalog (auto-populated), @layer rules, scoped command |
| `SITE_MAP.md` | All pages, routes, sections — updated by Stop hook each session |
| `.claudeignore` | `dist/`, `.astro/`, `node_modules/`, `public/fonts/` |
| `.claude/settings.json` | allow/deny for Astro commands including `npx @astrojs/upgrade`, `ASTRO_ENV=development` |

---

## Maintaining your AI layer

Run `npx @astrojs/upgrade` to keep Astro and integrations current.

Review `.claude/` skills and `CLAUDE.md` files every 3–6 months. After major Claude model releases, delete rules that compensate for limitations the new model no longer has.

The Stop hook proposes incremental updates after each session — review `.claude/claude-md-review.md` periodically.

---

## Vercel MCP setup

1. Install: `npm install -g @vercel/mcp-adapter`
2. Add to `~/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "vercel": {
      "command": "vercel-mcp",
      "env": {
        "VERCEL_API_TOKEN": "your_token_here"
      }
    }
  }
}
```

3. Run `/astro-layer:deploy-vercel` — the skill will guide you if setup is incomplete.

---

## Validate your install

```bash
node tooling/validate-all.js   # expects 15/15
```

---

## Changelog: v1 (Astro 3.6.5) → v2 (Astro 6.3)

| Area | Change |
|---|---|
| `package.json` | `astro ^3.6.5` → `^6.3.7`; added `engines.node >=22.12.0` |
| `Base.astro` | `<ViewTransitions />` → `<ClientRouter />` (component removed in Astro 6) |
| `astro.config.mjs` | Import includes `fontProviders`; commented `fonts: []` placeholder |
| `new-site` skill | Full rewrite: single-prompt support, 5-phase flow, per-page git checkpoints, auto quality-check, resume logic |
| `content-collection` skill | Full rewrite: Content Layer API, `src/content.config.ts`, `glob()` loader, `z` from `astro/zod` |
| `add-blog` skill | `entry.render()` → `render(entry)` from `astro:content`; `entry.slug` → `entry.id` in params |
| All CLAUDE.md templates | v6 conventions: ClientRouter, SVG rule, Content Layer API, Zod 4 imports |
| `add-font` skill | Astro built-in Fonts API now primary option; Fontsource npm retained as fallback |
| `performance-check` | Added SVG rasterization caveat (`<Image />` throws on SVG by default in v6.3) |
| `quality-check` | Added v6-specific checks: ClientRouter, render(), z import, SVG |
| `settings.json.template` | Added `npx @astrojs/upgrade` to allowed commands |
| `seo-optimize` | Mention stable `security.csp` as available hardening option |
| `hooks/build-state.js` | New utility: `readBuildState` / `writeBuildState` for `.claude/build-state.json` |
| `hooks/session-start.js` | Now reads build state and surfaces resume point if build was interrupted |
| Validation script | 13 → 15 checks; check 12 verifies `<ClientRouter />`; check 13 verifies build-state exports |
| README | Node 22 prereq; `npx @astrojs/upgrade`; Astro 6 key facts; single-prompt examples |
