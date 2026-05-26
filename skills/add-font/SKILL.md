---
name: add-font
description: Use when adding a custom web font to the project.
---

# add-font

Adds a custom web font using the Astro built-in Fonts API (preferred) or Fontsource npm package (fallback).

## Option A — Astro Built-in Fonts API (Preferred)

Downloads and caches fonts at build time. Served from your own domain — no third-party CDN, no privacy concerns. Automatic fallback optimization.

**1. Update `astro.config.mjs`:**

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

**2. Add `<Font>` to `Base.astro` `<head>`:**

```astro
---
import { Font } from 'astro:assets';
---
<head>
  <Font cssVariable="--font-sans" preload />
  ...
</head>
```

The CSS variable `--font-sans` in `tokens.css` is automatically populated by the Fonts API. No `@import` needed.

**Available providers:** `fontProviders.google()`, `fontProviders.fontsource()`, `fontProviders.bunny()`, `fontProviders.fontshare()`, `fontProviders.adobe()`, `fontProviders.local()`

## Option B — Fontsource npm (Fallback)

Use when you need advanced control or the Fonts API doesn't support the font.

```bash
npm install @fontsource-variable/inter
```

Import in `Base.astro` before styles. Update `--font-sans` token in `tokens.css`. `font-display: swap` is automatic. Self-hosted — no CDN.

## Never Use Google Fonts CDN `<link>` Tags

Privacy issues, external dependency, performance penalty. Always self-host via Option A or Option B.

## Reference

See `references/font-patterns.md` for complete setup for both options and all available Fonts API providers.
