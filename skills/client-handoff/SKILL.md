---
name: client-handoff
description: Use when ready to hand the site off to the client.
disable-model-invocation: true
---

# client-handoff

Generates `HANDOFF.md` — complete documentation for the client covering site structure, how to make updates, and maintenance guidance.

## What Gets Generated

Create `HANDOFF.md` in the project root with these sections:

### 1. Site Map

All pages with their URLs and a one-line description of what each contains.

### 2. How to Update Content

Plain-language instructions for:
- Changing text content (which files, what to edit)
- Replacing images (file naming, where to put them, recommended sizes)
- Updating contact information and business hours
- Changing the navigation menu

### 3. How to Add a Blog Post (if blog present)

Step-by-step guide:
1. Create a new `.md` file in `src/data/blog/`
2. Required frontmatter fields (title, description, pubDate)
3. How to add an image
4. How to publish (push to main branch → Vercel auto-deploys)

### 4. Environment Variables

List any environment variables and where to set them in the Vercel dashboard.

### 5. Deployment

- Preview URL from Vercel
- Production URL / custom domain (if configured)
- How deployment is triggered (push to `main`)

### 6. Getting Help

Who to contact for technical changes. Link to repository.

### 7. AI Layer Maintenance Note

```
## Maintaining the AI layer

The .claude/ directory contains AI-assisted development tools that help
future developers work on this site efficiently.

Maintenance recommendations:
- Run `npx @astrojs/upgrade` periodically to keep Astro and integrations current.
- Review .claude/ skills and CLAUDE.md files every 3–6 months.
- After major Claude model releases, delete rules that compensate for
  limitations the new model no longer has.
- The Stop hook proposes incremental updates after each session —
  review .claude/claude-md-review.md periodically.
```

## Invocation

Run `quality-check` and `performance-check` before generating HANDOFF.md. If either has unresolved failures, fix them first.
