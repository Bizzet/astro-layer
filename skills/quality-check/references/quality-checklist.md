# Quality Checklist

Run through this before every client handoff.

---

## SEO Completeness

- [ ] Every page has a **unique** `<title>` tag
- [ ] Every page has a **unique** `<meta name="description">` (150–160 chars)
- [ ] Contact page has LocalBusiness JSON-LD structured data
- [ ] Homepage has LocalBusiness JSON-LD structured data
- [ ] `sitemap.xml` accessible at `/sitemap-index.xml` (after `npm run build`)
- [ ] `robots.txt` exists at `/robots.txt`
- [ ] No duplicate title tags across pages
- [ ] Canonical URLs match the production domain in `astro.config.mjs`

---

## Accessibility

- [ ] Every `<Image />`: non-empty, descriptive `alt` text
- [ ] Decorative images have `alt=""` (empty string, not missing attribute)
- [ ] Heading hierarchy: exactly **one `<h1>` per page**
- [ ] No skipped heading levels (h1 → h3 without h2)
- [ ] All `<input>` / `<textarea>` / `<select>`: associated `<label>` via matching `for`/`id`
- [ ] All interactive elements keyboard-reachable (Tab order makes sense)
- [ ] All interactive elements have visible focus styles (`:focus-visible`)
- [ ] All links have descriptive text — no "click here", "read more", "here"
- [ ] Navigation has `aria-label="Main navigation"` (or appropriate label)
- [ ] Footer navigation has `aria-label="Footer navigation"`
- [ ] Buttons have descriptive `aria-label` when text alone isn't enough
- [ ] Color contrast meets WCAG AA: 4.5:1 for body text, 3:1 for large text
- [ ] Site works with keyboard navigation only (test: Tab, Enter, Space, Arrow keys)

---

## Code Quality — Astro 6 Conventions

- [ ] No `<ViewTransitions />` in codebase — must be `<ClientRouter />`
  ```bash
  grep -r "ViewTransitions" src/ --include="*.astro"  # should return nothing
  ```

- [ ] No `entry.render()` calls — must be `render(entry)` from `astro:content`
  ```bash
  grep -r "\.render()" src/ --include="*.astro" --include="*.ts"  # should return nothing
  ```

- [ ] No `import { z } from 'astro:content'` — must be `from 'astro/zod'`
  ```bash
  grep -r "from 'astro:content'" src/ --include="*.ts"  # check for z imports
  ```

- [ ] No SVG sources passed to `<Image />` component
  ```bash
  grep -r "\.svg" src/ --include="*.astro" | grep "Image"  # review each hit
  ```

- [ ] No `Astro.glob()` — use `import.meta.glob()` or `getCollection()`
  ```bash
  grep -r "Astro\.glob" src/  # should return nothing
  ```

- [ ] No `entry.slug` in dynamic route params — must use `entry.id`
  ```bash
  grep -r "entry\.slug\|post\.slug" src/  # should return nothing
  ```

- [ ] Content collections config at `src/content.config.ts` (not `src/content/config.ts`)

---

## CSS / Design System

- [ ] No hard-coded colors in component `<style>` blocks (no hex, hsl, rgb)
- [ ] No magic pixel values that should be tokens
- [ ] All spacing uses `var(--space-*)` tokens
- [ ] `tokens.css` is the only file defining `:root` variables
- [ ] Dark mode (if added) works in both `prefers-color-scheme` and manual toggle

---

## Forms

- [ ] All forms have a valid `action` (Formspree, API route, etc.)
- [ ] Required fields marked with `required` attribute
- [ ] Form submission provides user feedback (success/error state)
- [ ] No form stores sensitive data in client-side storage

---

## Final Build Verification

```bash
# Must pass with zero errors
npx astro check

# Must complete without errors
npm run build

# Check sitemap was generated
ls dist/sitemap*.xml

# Check robots.txt was copied
ls dist/robots.txt
```

---

## Browser Testing Checklist

- [ ] Desktop Chrome: full functionality
- [ ] Desktop Firefox: full functionality
- [ ] Mobile Safari (iOS): layout and touch interactions
- [ ] Mobile Chrome (Android): layout and touch interactions
- [ ] Windows High Contrast mode: text and interactive elements visible
