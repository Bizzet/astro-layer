# SEO Patterns

## Per-Page Requirements

Every page must have:

```astro
<Base
  title="Page Name | Business Name"
  description="Unique description, 150–160 chars, includes primary keyword and location."
>
```

- **Title format:** `Page | Business Name` (max ~60 chars total)
- **Description:** 150–160 chars — unique per page, includes what the page offers and relevant location/keyword
- **Canonical URL:** Handled automatically by the SEO component via `Astro.url`

## Open Graph Tags

The SEO component handles all OG tags. Provide:

```astro
<Base
  title="About | Martinez Plumbing"
  description="Family-owned plumbing in Austin TX since 1987..."
  ogImage="/og-about.jpg"
  ogType="website"
>
```

OG image dimensions: **1200×630px** (standard social preview size).

## LocalBusiness JSON-LD

Add to **homepage** (and contact page):

```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "description": "What the business does.",
  "url": Astro.site?.href ?? "",
  "image": `${Astro.site?.href ?? ""}og-default.jpg`,
  "telephone": "+1-555-000-0000",
  "email": "hello@business.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "00000",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.2672,
    "longitude": -97.7431
  },
  "openingHours": [
    "Mo-Fr 08:00-18:00",
    "Sa 09:00-14:00"
  ],
  "priceRange": "$$",
  "areaServed": {
    "@type": "City",
    "name": "Austin"
  }
};
```

## Blog Post Structured Data

```ts
const articleLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.data.title,
  "description": post.data.description,
  "datePublished": post.data.pubDate.toISOString(),
  "dateModified": (post.data.updatedDate ?? post.data.pubDate).toISOString(),
  "author": {
    "@type": "Organization",
    "name": "Business Name"
  },
  "image": post.data.heroImage ?? `${Astro.site?.href}og-default.jpg`
};
```

## Sitemap

Configured automatically via `@astrojs/sitemap`:

```js
// astro.config.mjs — already present in starter
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://example.com',  // required for sitemap to work
  integrations: [sitemap()],
});
```

Sitemap is generated at `/sitemap-index.xml` during `npm run build`.

## robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap-index.xml
```

## Content Security Policy (Optional Hardening)

Astro 6 ships stable `security.csp` support. For high-trust clients who need CSP headers, add to `astro.config.mjs`:

```js
export default defineConfig({
  security: {
    csp: {
      // CSP directives — project-specific, not auto-generated
      // See https://docs.astro.build/en/reference/configuration-reference/#securitycsp
    }
  }
});
```

This is optional — too project-specific to auto-generate defaults. Mention as an available option during handoff.

## Heading Hierarchy Rules

- One `<h1>` per page — must match the page title concept
- No skipped heading levels (h1 → h3 without h2)
- Section headings: `<h2>` for major sections, `<h3>` for cards/items within

## Image SEO

- All meaningful images: descriptive `alt` text
- Decorative images: `alt=""` (empty string, not missing)
- Hero/product images: include in OG image if possible
- File names: descriptive kebab-case (`plumbing-team-austin.jpg` not `IMG_1234.jpg`)

## Performance → SEO Connection

Core Web Vitals affect rankings:
- LCP: use `fetchpriority="high"` on hero image, `loading="eager"`
- CLS: always provide explicit `width` and `height` on images
- FID/INP: minimize JavaScript, prefer CSS-only solutions
