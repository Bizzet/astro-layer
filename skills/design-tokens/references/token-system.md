# Design Token System

All CSS values live in `src/styles/tokens.css`. Any hard-coded value in a component is a bug.

## Core Principle

One source of truth: `tokens.css`. To change a color, size, or spacing value anywhere on the site — change the token here.

## Token Categories

### Brand Colors
```css
--color-brand:        /* primary action color */
--color-brand-hover:  /* 5–8 lightness points darker */
--color-brand-subtle: /* 95–97% lightness, same hue — backgrounds, badges */
```

### Neutral Scale (10 steps)
```css
--color-neutral-50   /* near-white backgrounds */
--color-neutral-100  /* light backgrounds */
--color-neutral-200  /* borders, dividers */
--color-neutral-300  /* disabled text */
--color-neutral-400  /* placeholder text */
--color-neutral-500  /* muted text */
--color-neutral-600  /* secondary text */
--color-neutral-700  /* primary text (alt) */
--color-neutral-800  /* primary text */
--color-neutral-900  /* near-black */
```

### Semantic Surfaces
```css
--color-bg           /* page background → var(--color-neutral-50) */
--color-surface      /* card/panel background → #fff */
--color-text         /* body text → var(--color-neutral-800) */
--color-text-muted   /* secondary text → var(--color-neutral-500) */
--color-border       /* borders → var(--color-neutral-200) */
```

### Typography
```css
--font-sans          /* body font stack */
--font-serif         /* display/editorial font */
--font-mono          /* code font */
--text-xs through --text-4xl   /* fluid clamp() scales */
--font-normal/medium/semibold/bold   /* weights */
--leading-tight/snug/normal/relaxed  /* line heights */
--tracking-tight/normal/wide         /* letter spacing */
```

### Spacing (8px base)
```css
--space-1   /* 0.25rem */
--space-2   /* 0.5rem  */
--space-3   /* 0.75rem */
--space-4   /* 1rem    */
--space-5   /* 1.25rem */
--space-6   /* 1.5rem  */
--space-8   /* 2rem    */
--space-10  /* 2.5rem  */
--space-12  /* 3rem    */
--space-16  /* 4rem    */
--space-20  /* 5rem    */
--space-24  /* 6rem    */
--space-32  /* 8rem    */
```

### Layout
```css
--container-max      /* 72rem max width */
--container-padding  /* clamp responsive padding */
```

### Borders & Radius
```css
--radius-sm / --radius-md / --radius-lg / --radius-xl / --radius-full
--border             /* 1px solid var(--color-border) shorthand */
```

### Shadows
```css
--shadow-sm  /* subtle — cards */
--shadow-md  /* medium — dropdowns */
--shadow-lg  /* prominent — modals */
```

### Motion
```css
--ease-standard / --ease-out / --ease-in
--duration-fast  /* 120ms */
--duration-base  /* 200ms */
--duration-slow  /* 350ms */
```

## Adding New Tokens

1. Identify the category (color, spacing, typography, motion)
2. Add to the correct section in `tokens.css`
3. Use the naming pattern: `--category-variant` (e.g., `--color-success-subtle`, `--space-14`)
4. Update `src/styles/CLAUDE.md` token catalog

## Auditing for Hard-Coded Values

Signs of a token violation:
- Any `#` hex value in a component `<style>` block
- Any `px` value that isn't `0px` or `1px`
- Any `rem` value that isn't `0`
- Any `hsl()` call outside `tokens.css`
- RGB values, named colors (`red`, `blue`)

All of these should be replaced with the appropriate `var(--token)`.

## Dark Mode Token Overrides

Dark mode adds overrides at the bottom of `tokens.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:          var(--color-neutral-900);
    --color-surface:     var(--color-neutral-800);
    --color-text:        var(--color-neutral-100);
    --color-text-muted:  var(--color-neutral-400);
    --color-border:      var(--color-neutral-700);
  }
}
```

Or via `data-theme` for manual toggle:
```css
[data-theme="dark"] {
  /* same overrides */
}
```
