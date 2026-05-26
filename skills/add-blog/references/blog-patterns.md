# Blog Patterns

## Files to Create

1. `src/content.config.ts` — blog collection (Content Layer API)
2. `src/data/blog/` — directory for blog post `.md` / `.mdx` files
3. `src/pages/blog/index.astro` — listing page with pagination
4. `src/pages/blog/[...slug].astro` — individual post page
5. `src/pages/rss.xml.js` — RSS feed

---

## Blog Post Page (Critical Astro 6 Patterns)

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
  <article class="blog-post container">
    <header class="post-header">
      <h1>{post.data.title}</h1>
      <time datetime={post.data.pubDate.toISOString()}>
        {post.data.pubDate.toLocaleDateString('en-US', { dateStyle: 'long' })}
      </time>
    </header>

    <div class="post-body">
      <Content />
    </div>
  </article>
</Base>

<style>
  .blog-post { padding-block: var(--space-16); }
  .post-header { margin-bottom: var(--space-12); }
  .post-header time {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }
  .post-body {
    max-width: 70ch;
    line-height: var(--leading-relaxed);
  }
</style>
```

---

## Blog Listing Page with Pagination

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';

const allPosts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
<Base
  title="Blog | Business Name"
  description="Tips, news, and insights from Business Name."
>
  <div class="container blog-listing">
    <h1>Our Blog</h1>

    <ul role="list" class="post-grid">
      {allPosts.map((post) => (
        <li>
          <article class="post-card">
            <h2>
              <a href={`/blog/${post.id}`}>{post.data.title}</a>
            </h2>
            <time datetime={post.data.pubDate.toISOString()}>
              {post.data.pubDate.toLocaleDateString('en-US', { dateStyle: 'medium' })}
            </time>
            <p>{post.data.description}</p>
          </article>
        </li>
      ))}
    </ul>
  </div>
</Base>
```

---

## Pagination (with `paginate()`)

```astro
---
// src/pages/blog/[...page].astro — if you need paginated listing
import { getCollection } from 'astro:content';
import type { GetStaticPathsOptions } from 'astro';
import Base from '../../layouts/Base.astro';

export async function getStaticPaths({ paginate }: GetStaticPathsOptions) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return paginate(posts, { pageSize: 10 });
}

const { page } = Astro.props;
---
<Base title={`Blog — Page ${page.currentPage} | Business Name`} description="...">
  <!-- post list -->
  <nav aria-label="Pagination">
    {page.url.prev && <a href={page.url.prev}>← Previous</a>}
    <span>Page {page.currentPage} of {page.lastPage}</span>
    {page.url.next && <a href={page.url.next}>Next →</a>}
  </nav>
</Base>
```

---

## RSS Feed

```js
// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Business Name Blog',
    description: 'Tips and insights from Business Name.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}`,
    })),
  });
}
```

Install RSS package: `npm install @astrojs/rss`

---

## Reading Time Utility

```ts
// src/utils/reading-time.ts
export function readingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
```

---

## Tag Taxonomy

To add tag pages (`/blog/tag/[tag]`):

```astro
---
// src/pages/blog/tag/[tag].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const tags = [...new Set(posts.flatMap((p) => p.data.tags))];
  return tags.map((tag) => ({
    params: { tag },
    props: { posts: posts.filter((p) => p.data.tags.includes(tag)) },
  }));
}

const { tag, posts } = Astro.props;
---
```

---

## Sample Blog Post Frontmatter

```md
---
title: "5 Signs You Need Emergency Plumbing"
description: "Know these warning signs before a minor leak becomes a major flood."
pubDate: 2024-03-15
updatedDate: 2024-04-01
heroImage: "/images/blog/emergency-plumbing.jpg"
tags: ["plumbing", "emergency", "tips"]
draft: false
---
```
