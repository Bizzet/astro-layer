---
name: new-page
description: Use when creating a new Astro page. Wraps Base layout, adds SEO
  frontmatter, follows file-based routing conventions.
paths:
  - src/pages/**
---

# new-page

Creates a new Astro page using the Base layout, with SEO frontmatter and correct Astro 6 routing conventions.

## Requirements

Every page created by this skill must:
- Import and use `Base` from `../layouts/Base.astro` (or adjust relative path)
- Declare `title` and `description` props for SEO
- Use kebab-case filename matching the nav label
- Have a unique `<title>` and `<meta name="description">` (set via Base layout's SEO component)
- Use `Astro.url` for canonical URLs

## Dynamic Routes

For content-collection-backed pages:
- Use `[...slug].astro` + `getStaticPaths()`
- Use `entry.id` (not `entry.slug`) in the `params` object
- Render content with `render(entry)` imported from `astro:content` — the old `entry.render()` method does not exist in Astro 6

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';

export async function getStaticPaths() {
  const entries = await getCollection('blog');
  return entries.map((entry) => ({
    params: { slug: entry.id },   // entry.id, NOT entry.slug
    props: entry,
  }));
}

const entry = Astro.props;
const { Content } = await render(entry);  // render() fn, NOT entry.render()
---
<Base title={entry.data.title} description={entry.data.description}>
  <Content />
</Base>
```

## Reference

See `references/page-patterns.md` for:
- Standard page template
- Frontmatter conventions
- Route naming rules
- Dynamic route patterns with content collections
- Astro 6 breaking changes (entry.id, render fn)
