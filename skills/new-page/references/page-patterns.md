# Page Patterns

## Required Structure

Every page must use the Base layout and declare SEO props:

```astro
---
import Base from '../layouts/Base.astro';
// Adjust relative path based on nesting: ../../layouts/Base.astro for src/pages/blog/

interface Props {}  // only for dynamic routes
---
<Base
  title="Page Title | Business Name"
  description="Unique page description, 150–160 characters, includes primary keyword."
>
  <!-- Page content here -->
</Base>
```

## Naming Convention

- File names: kebab-case matching the nav label
  - `/about` → `src/pages/about.astro`
  - `/our-services` → `src/pages/our-services.astro`
- Index routes: `index.astro` (for `/`) or `[directory]/index.astro` (for `/blog/`)

## SEO Frontmatter

Every page needs a unique title and description:

```astro
<Base
  title="About Us | Martinez Plumbing"
  description="Learn about Martinez Plumbing — family-owned since 1987, serving Austin TX with licensed plumbers and honest pricing."
>
```

Title format: `Page | Business Name` (max ~60 chars)
Description: 150–160 chars, includes location and primary keyword for local businesses.

## Structured Data (JSON-LD)

Add `jsonLd` prop on pages where structured data is relevant:

```astro
---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Martinez Plumbing",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701"
  },
  "telephone": "+1-512-555-0000",
  "openingHours": ["Mo-Fr 08:00-18:00", "Sa 09:00-14:00"]
};
---
<Base title="..." description="..." jsonLd={jsonLd}>
```

## Dynamic Routes

### Blog / Collection posts

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },   // use post.id, NOT post.slug
    props: post,
  }));
}

const post = Astro.props;
const { Content, headings } = await render(post);  // render() fn, NOT post.render()
---
<Base title={`${post.data.title} | Blog`} description={post.data.description}>
  <article>
    <h1>{post.data.title}</h1>
    <Content />
  </article>
</Base>
```

**Astro 6 critical rules:**
- Use `post.id` not `post.slug` in params
- Use `render(post)` imported from `astro:content` — NOT `post.render()`
- Import `render` alongside `getCollection`:
  ```ts
  import { getCollection, render } from 'astro:content';
  ```

## Canonical URLs

```astro
---
const canonical = Astro.url;
---
```

The SEO component handles `<link rel="canonical" href={canonical} />` automatically — no manual addition needed.

## Common Page Layouts

### Simple content page (About, Privacy)
```astro
<Base title="..." description="...">
  <div class="container" style="padding-block: var(--space-20);">
    <h1>Page Heading</h1>
    <!-- content -->
  </div>
</Base>
```

### Section-based page (Home, Services)
```astro
<Base title="..." description="...">
  <HeroSection headline="..." />
  <ServicesSection services={services} />
  <CTASection />
</Base>
```

## Routing Reference

| File | Route |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/about.astro` | `/about` |
| `src/pages/services.astro` | `/services` |
| `src/pages/contact.astro` | `/contact` |
| `src/pages/blog/index.astro` | `/blog` |
| `src/pages/blog/[...slug].astro` | `/blog/[any-path]` |
| `src/pages/services/[slug].astro` | `/services/[slug]` |
