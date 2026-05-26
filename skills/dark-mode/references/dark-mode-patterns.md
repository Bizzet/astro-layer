# Dark Mode Patterns

## System Preference (CSS-Only)

Add at the bottom of `src/styles/tokens.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:          var(--color-neutral-900);
    --color-surface:     var(--color-neutral-800);
    --color-text:        var(--color-neutral-100);
    --color-text-muted:  var(--color-neutral-400);
    --color-border:      var(--color-neutral-700);
    --color-brand-subtle: hsl(220 70% 15%);
  }
}
```

This is the simplest approach — no JavaScript needed. Respects the OS setting automatically.

---

## Manual Toggle with `data-theme`

For sites that need a user toggle button:

### 1. Add to `tokens.css`

```css
/* After the @media block above, add: */
[data-theme="dark"] {
  --color-bg:          var(--color-neutral-900);
  --color-surface:     var(--color-neutral-800);
  --color-text:        var(--color-neutral-100);
  --color-text-muted:  var(--color-neutral-400);
  --color-border:      var(--color-neutral-700);
  --color-brand-subtle: hsl(220 70% 15%);
}
```

### 2. Anti-FOUC Script in `Base.astro` `<head>`

This must run before `<body>` renders to prevent the flash of unstyled content:

```astro
---
// In Base.astro, inside <head>
---
<script is:inline>
  // Runs synchronously before paint
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored ?? (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

### 3. ThemeToggle Component

```astro
---
// src/components/ThemeToggle.astro
---
<button
  class="theme-toggle"
  type="button"
  aria-label="Toggle dark mode"
  aria-pressed="false"
>
  <span class="theme-toggle__icon theme-toggle__icon--light" aria-hidden="true">☀️</span>
  <span class="theme-toggle__icon theme-toggle__icon--dark" aria-hidden="true">🌙</span>
</button>

<script>
  const toggle = document.querySelector('.theme-toggle') as HTMLButtonElement;
  if (!toggle) throw new Error('ThemeToggle: button not found');

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') ?? 'light';
  }

  function setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    toggle.dispatchEvent(new CustomEvent('theme-change', {
      bubbles: true,
      detail: { theme },
    }));
  }

  // Initialize button state
  toggle.setAttribute('aria-pressed', getTheme() === 'dark' ? 'true' : 'false');

  toggle.addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
</script>

<style>
  .theme-toggle {
    background: none;
    border: var(--border);
    border-radius: var(--radius-full);
    padding: var(--space-2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-text);
    transition: background-color var(--duration-base) var(--ease-standard);
  }

  .theme-toggle:hover {
    background-color: var(--color-neutral-100);
  }

  /* Show correct icon based on current theme */
  [data-theme="light"] .theme-toggle__icon--dark,
  [data-theme="dark"]  .theme-toggle__icon--light {
    display: none;
  }
</style>
```

### 4. Add ThemeToggle to Header

```astro
---
// In Header.astro
import ThemeToggle from './ThemeToggle.astro';
---
<header>
  <!-- ... nav ... -->
  <ThemeToggle />
</header>
```

---

## Dark Mode + View Transitions

If using Astro's `<ClientRouter />`, the anti-FOUC script needs to also run on navigation:

```astro
<script is:inline>
  // Initial load
  const applyTheme = () => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored ?? (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  };

  applyTheme();

  // Re-apply after page transitions
  document.addEventListener('astro:after-swap', applyTheme);
</script>
```

---

## Dark Mode Image Swapping (Optional)

For logos or images that need different versions in dark mode:

```css
.logo-light { display: block; }
.logo-dark  { display: none;  }

[data-theme="dark"] .logo-light { display: none; }
[data-theme="dark"] .logo-dark  { display: block; }
```

Or use CSS `filter` for simple inversions on icon SVGs:

```css
[data-theme="dark"] .icon-svg {
  filter: invert(1) hue-rotate(180deg);
}
```
