# Font Patterns

## Option A — Astro Built-in Fonts API (Preferred)

Astro 6 ships a built-in Fonts API. It downloads and caches fonts at build time, serving them from your own domain. No third-party CDN, no privacy concerns, automatic fallback optimization.

### 1. Configure in `astro.config.mjs`

```js
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  output: 'static',
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
});
```

### 2. Add `<Font />` to `Base.astro`

```astro
---
import { Font } from 'astro:assets';
// ... other imports
---
<html>
  <head>
    <Font cssVariable="--font-sans" preload />
    <!-- ... rest of head -->
  </head>
```

The CSS variable `--font-sans` defined in `tokens.css` is automatically populated with the font stack. No `@import` needed.

### Available Built-in Providers

| Provider | Usage |
|---|---|
| `fontProviders.google()` | Google Fonts — proxied through your domain |
| `fontProviders.fontsource()` | Fontsource — npm-based, high reliability |
| `fontProviders.bunny()` | Bunny Fonts — GDPR-friendly European CDN |
| `fontProviders.fontshare()` | Fontshare — curated quality fonts |
| `fontProviders.adobe()` | Adobe Fonts — requires Adobe account |
| `fontProviders.local()` | Local files from `public/fonts/` |

### Pairing Example (Heading + Body)

```js
fonts: [
  {
    provider: fontProviders.fontsource(),
    name: 'Playfair Display',
    cssVariable: '--font-serif',
    weights: [700],
    styles: ['normal'],
    subsets: ['latin'],
    fallbacks: ['Georgia', 'serif'],
  },
  {
    provider: fontProviders.fontsource(),
    name: 'Source Sans 3',
    cssVariable: '--font-sans',
    weights: [400, 600],
    styles: ['normal', 'italic'],
    subsets: ['latin'],
    fallbacks: ['system-ui', 'sans-serif'],
  },
],
```

Multiple `<Font />` tags in Base.astro, one per variable:
```astro
<Font cssVariable="--font-serif" preload />
<Font cssVariable="--font-sans" preload />
```

---

## Option B — Fontsource npm Package (Fallback)

Use this when you need variable font control or the Fonts API doesn't support a specific font.

```bash
npm install @fontsource-variable/inter
```

Import in `Base.astro` before styles:

```astro
---
import '@fontsource-variable/inter';
import '../styles/global.css';
---
```

Update `--font-sans` in `tokens.css`:

```css
--font-sans: 'InterVariable', system-ui, -apple-system, sans-serif;
```

`font-display: swap` is applied automatically by Fontsource. Self-hosted — no CDN calls.

---

## Option C — Local Fonts

For purchased or proprietary fonts, place files in `public/fonts/` and use the local provider:

```js
// astro.config.mjs
fonts: [
  {
    provider: fontProviders.local(),
    name: 'BrandFont',
    cssVariable: '--font-brand',
    variants: [
      {
        weight: 400,
        style: 'normal',
        src: ['./public/fonts/BrandFont-Regular.woff2'],
      },
      {
        weight: 700,
        style: 'normal',
        src: ['./public/fonts/BrandFont-Bold.woff2'],
      },
    ],
    fallbacks: ['Georgia', 'serif'],
  },
],
```

---

## What to Avoid

**Never use Google Fonts CDN `<link>` tags:**
```html
<!-- ❌ Never do this -->
<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
```
Problems: privacy issues (passes user IP to Google), external dependency, performance penalty (render-blocking), GDPR concerns for EU users.

**Never use `@import` inside CSS for fonts:**
```css
/* ❌ Never do this */
@import url('https://fonts.googleapis.com/css2?family=Inter');
```
Blocks CSS parsing, external dependency.

---

## Token Update After Adding a Font

After adding a font, update `tokens.css` comment to note the font:

```css
/* ── Typography ── */
--font-sans:  'InterVariable', system-ui, -apple-system, sans-serif;
/* ^ Populated automatically by Astro Fonts API (cssVariable: --font-sans) */
```

And update `src/styles/CLAUDE.md` to list the fonts in use.
