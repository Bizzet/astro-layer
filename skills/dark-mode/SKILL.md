---
name: dark-mode
description: Use when adding dark mode — CSS prefers-color-scheme token overrides
  and an optional manual toggle component.
paths:
  - src/styles/**
  - src/components/**
---

# dark-mode

Adds dark mode support via CSS custom property overrides. Supports both automatic (`prefers-color-scheme`) and manual toggle via `data-theme` attribute.

## What Gets Created / Modified

1. **`src/styles/tokens.css`** — add `@media (prefers-color-scheme: dark)` block overriding semantic tokens
2. **`src/components/ThemeToggle.astro`** — optional toggle button component
3. **`src/layouts/Base.astro`** — add inline `<script>` to `<head>` to set `data-theme` before paint

## CSS Token Override Pattern

```css
/* in tokens.css */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:         var(--color-neutral-900);
    --color-surface:    var(--color-neutral-800);
    --color-text:       var(--color-neutral-100);
    --color-text-muted: var(--color-neutral-400);
    --color-border:     var(--color-neutral-700);
  }
}

/* Manual override — takes priority */
[data-theme="dark"] {
  --color-bg:         var(--color-neutral-900);
  --color-surface:    var(--color-neutral-800);
  --color-text:       var(--color-neutral-100);
  --color-text-muted: var(--color-neutral-400);
  --color-border:     var(--color-neutral-700);
}
```

## FOUC Prevention (inline script in Base.astro `<head>`)

```html
<script>
  const stored = localStorage.getItem('theme');
  if (stored) document.documentElement.dataset.theme = stored;
</script>
```

This must be inline (not `src`) so it runs synchronously before paint.

## ThemeToggle Component

- Button that reads/writes `localStorage.getItem('theme')`
- Toggles `document.documentElement.dataset.theme` between `'light'` and `'dark'`
- Dispatches a `theme-change` CustomEvent for other components to listen

## Reference

See `references/dark-mode-patterns.md` for complete CSS patterns, ThemeToggle component code, and Base.astro integration.
