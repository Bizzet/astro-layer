---
name: design-tokens
description: Use when a magic number or hard-coded color appears in CSS, or when
  extending the design system with a new token category.
paths:
  - src/styles/**
---

# design-tokens

Audits and extends the design token system. `tokens.css` is always the single source of truth — all values in the codebase must reference tokens, never hard-code values.

## When This Skill Activates

- A hard-coded hex, `rgb()`, or `hsl()` color value appears in any `.astro` or `.css` file
- A magic pixel or rem value that isn't mapped to a spacing token
- A duplicated value across multiple files that should be a shared token
- Request to add a new design token category (e.g., `--shadow-*`, `--z-*`, `--grid-*`)

## Audit Process

1. Grep for hex values (`#[0-9a-f]{3,6}`), `rgb(`, `rgba(`, non-token `px` values
2. Cross-reference against existing tokens in `src/styles/tokens.css`
3. For each violation: extract to a named `--custom-property` in `tokens.css`
4. Replace the violation with `var(--token-name)`

## Adding New Tokens

When adding a new category:
1. Add tokens under the matching comment section (or create a new `/* ── Category ── */` block)
2. Follow naming: `--category-variant` (e.g., `--shadow-lg`, `--z-modal`, `--grid-cols`)
3. Use semantic names for semantic tokens, descriptive names for scale tokens

## Rules

- Never edit a value in a component — add or update the token in `tokens.css` first
- Never add `!important` — specificity issues mean the token system is structured wrong
- All new tokens live in `:root` — no component-level custom property declarations unless scoped to that component's element

## Reference

See `references/token-system.md` for the full token catalog, naming conventions, and examples of common violations and their fixes.
