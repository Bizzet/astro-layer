---
name: content-collection
description: Use when setting up or extending Astro Content Collections for
  structured content like blog posts, services, or team members.
paths:
  - src/content/**
---

# content-collection

Sets up or extends Astro Content Collections using the Astro 6 Content Layer API.

## Critical: Astro 6 Content Layer API

The old API (`src/content/config.ts`, `type: 'content'`, `getEntryBySlug()`) is **fully removed** in Astro 6. All collections must use the Content Layer API.

**Config file location:** `src/content.config.ts` (not inside `src/content/`)

**Import `z` from `astro/zod`** — never from `astro:content` (deprecated) or `astro:schema` (deprecated).

## Standard Collection Template

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
  }),
});

export const collections = { blog };
```

## Querying Collections

- Use `getCollection('name')` — `getEntryBySlug()` is removed
- Use `entry.id` in params — `entry.slug` is removed
- Use `render(entry)` imported from `astro:content` — `entry.render()` is removed

## Zod 4 Notes (Astro 6 upgraded to Zod 4)

- `z.string().email()` → `z.email()`
- `z.string().url()` → `z.url()`
- Default values must match the output type (after transforms)

## Reference

See `references/collection-schemas.md` for blog, services, and team collection schemas, plus querying patterns.
