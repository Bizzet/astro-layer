# Component Patterns

## Required Structure

Every Astro component must follow this pattern:

```astro
---
// 1. Props interface — always named `Props`
interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

// 2. Destructure props
const { title, description, variant = 'primary' } = Astro.props;
---

<!-- 3. Semantic HTML with ARIA where needed -->
<article class:list={['card', `card--${variant}`]}>
  <h3>{title}</h3>
  {description && <p>{description}</p>}
  <slot />
</article>

<!-- 4. Scoped CSS — only var(--token) -->
<style>
  .card {
    padding: var(--space-8);
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    border: var(--border);
    box-shadow: var(--shadow-sm);
  }

  .card--primary { border-top: 3px solid var(--color-brand); }
  .card--secondary { background: var(--color-brand-subtle); }
</style>
```

## Rules

### Props
- Interface must be named `Props` — not `ComponentProps`, not inline
- Always provide defaults for optional props via destructuring
- Use union types for variants: `'primary' | 'secondary' | 'ghost'`

### CSS
- **Zero hard-coded values** — every color, size, spacing uses `var(--token)`
- Scoped `<style>` blocks only — never global styles in a component file
- Any hard-coded value (hex, px, rem) is a bug — add a token instead
- Use `class:list` for conditional classes, not string interpolation

### Images
- Always use `<Image />` from `astro:assets` with explicit `width`, `height`, `alt`
- **SVG rule**: Never pass `.svg` file sources to `<Image />` — Astro 6.3 throws by default
  - For SVG logos/icons: `import Logo from './logo.svg'` and render as `<Logo />`
  - For decorative SVGs: use bare `<img>` tag
  - Enabling SVG in Image requires `image.dangerouslyProcessSVG: true` in config — avoid this
- `loading="lazy"` on all images by default
- `fetchpriority="high"` + `loading="eager"` only on the page's LCP image
- All `alt` text must be descriptive, not empty (except purely decorative images: `alt=""`)

### View Transitions
- `transition:name="hero-[element]"` for morphing animations between pages
- `transition:animate="fade"` / `"slide"` / `"none"` on section elements
- Always pair `transition:name` values between source and target

### ARIA Patterns

**Button:**
```astro
<button type="button" aria-pressed={isActive} aria-label="Descriptive label">
```

**Dialog/Modal:**
```astro
<dialog aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <h2 id="dialog-title">Title</h2>
  <p id="dialog-desc">Description</p>
</dialog>
```

**Navigation:**
```astro
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/" aria-current={isHome ? 'page' : undefined}>Home</a></li>
  </ul>
</nav>
```

**Accordion (CSS-only):**
```astro
<details>
  <summary>Question text</summary>
  <div>Answer text</div>
</details>
```

**Card with link:**
```astro
<article>
  <h3><a href={href}>{title}</a></h3>
  <p>{description}</p>
</article>
```

## Naming Conventions

- File names: PascalCase matching the component name (`ServiceCard.astro`)
- CSS class names: kebab-case BEM-lite (`.service-card`, `.service-card__title`, `.service-card--featured`)
- Props: camelCase (`isActive`, `heroImage`, `ctaLabel`)
- Slot names: kebab-case (`<slot name="card-footer" />`)

## Common Patterns

### Responsive container
```astro
<div class="container">
  <slot />
</div>
<style>
  .container {
    max-width: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-padding);
  }
</style>
```

### Icon + text
```astro
<span class="icon-label" aria-hidden="true">{icon}</span>
<span>{label}</span>
```

### Visually hidden (screen reader only)
```astro
<span class="sr-only">{screenReaderText}</span>
```
(`.sr-only` is defined in `global.css` — don't redefine in component)
