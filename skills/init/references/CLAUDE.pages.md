# Pages

File-based routing. Every page uses Base layout and declares SEO props.

## Conventions
- Import Base from `'../layouts/Base.astro'`
- Frontmatter provides: `title`, `description`, `jsonLd?` (for structured data)
- Route naming: kebab-case matching nav label
- Dynamic routes: `[...slug].astro` + `getStaticPaths()`
- Use `entry.id` (not `entry.slug`) in params for content collection routes
- Use `render(entry)` imported from `astro:content` — entries have no `.render()` method
- `Astro.url` for canonical URLs

## Scoped command
```
npx astro check src/pages/
```
