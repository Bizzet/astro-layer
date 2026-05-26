# Content Collection Schemas

## Astro 6 Content Layer API — Required for All Collections

The old API (`src/content/config.ts`, `type: 'content'`, `getEntryBySlug()`) is **fully removed** in Astro 6. All collections must use the Content Layer API.

## Config File Location

**`src/content.config.ts`** — NOT inside `src/content/`

All schemas import `z` from `astro/zod`, not from `astro:content`:

## Complete Config Example

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/services' }),
  schema: z.object({
    title: z.string(),
    shortDesc: z.string(),
    icon: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    photo: z.string(),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/testimonials' }),
  schema: z.object({
    author: z.string(),
    role: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, services, team, testimonials };
```

## Zod 4 Notes (Astro 6 upgraded to Zod 4)

| Zod 3 (old) | Zod 4 (new) |
|---|---|
| `z.string().email()` | `z.email()` |
| `z.string().url()` | `z.url()` |
| Import from `'astro:content'` | Import from `'astro/zod'` |
| Import from `'astro:schema'` | Import from `'astro/zod'` |

Default values must match the output type (after transforms), not the input type.

## Content Directory Structure

Files live under `src/data/` (not `src/content/`):

```
src/
├── content.config.ts
└── data/
    ├── blog/
    │   ├── first-post.md
    │   └── second-post.md
    ├── services/
    │   ├── plumbing.md
    │   └── hvac.md
    └── team/
        └── owner.md
```

## Querying Collections

```ts
import { getCollection, render } from 'astro:content';

// Get all published blog posts, newest first
const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

// Render a single entry
const { Content, headings } = await render(post);

// Use entry.id in dynamic routes (NOT entry.slug)
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
```

## Frontmatter Example (Blog Post)

```md
---
title: "5 Signs You Need Emergency Plumbing"
description: "Learn the warning signs that mean you need a plumber right away."
pubDate: 2024-03-15
tags: ["plumbing", "emergency", "tips"]
heroImage: "/images/blog/emergency-plumbing.jpg"
draft: false
---

Content goes here...
```

## What NOT to Do

```ts
// ❌ Old API — removed in Astro 6
import { defineCollection, z } from 'astro:content';  // z from wrong source
export const collections = { ... };                    // wrong file location

// ❌ Deprecated methods
const post = await getEntryBySlug('blog', slug);       // removed
const { Content } = await post.render();               // removed
params: { slug: post.slug }                            // use post.id

// ✅ Correct Astro 6 API
import { getCollection, render } from 'astro:content';
import { z } from 'astro/zod';
const { Content } = await render(post);
params: { slug: post.id }
```
