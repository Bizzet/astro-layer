---
name: add-blog
description: Use when adding a complete blog — Content Collection, listing page
  with pagination, individual post page, and RSS feed.
paths:
  - src/**
---

# add-blog

Adds a complete blog to an Astro 6.3 site: content collection, listing page with pagination, individual post page, and RSS feed.

## What Gets Created

1. `src/content.config.ts` — blog collection using Content Layer API
2. `src/data/blog/` — directory for markdown post files (with one example post)
3. `src/pages/blog/index.astro` — listing page with pagination
4. `src/pages/blog/[...slug].astro` — individual post page
5. `src/pages/rss.xml.js` — RSS feed endpoint

## Critical Astro 6 Patterns

**Post page — use `render()` function and `entry.id`:**

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },   // post.id, NOT post.slug
    props: post,
  }));
}

const post = Astro.props;
const { Content, headings } = await render(post);  // render() fn, NOT post.render()
---
<Base title={post.data.title} description={post.data.description}>
  <article>
    <Content />
  </article>
</Base>
```

## Additional Patterns

- Pagination with Astro's `paginate()` helper on the listing page
- Reading time calculated from content length in frontmatter processing
- Tag taxonomy via `tags` field in schema
- Per-post OG image using `heroImage` frontmatter field

## Reference

See `references/blog-patterns.md` for complete implementation of all 5 files, plus pagination, RSS, and reading-time patterns.
