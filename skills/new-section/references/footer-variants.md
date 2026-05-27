# Footer Variants by Archetype

The starter footer template is a baseline — replace it with the pattern that matches the site's archetype. The footer is the last thing a visitor sees; an undifferentiated dark bar undermines everything the rest of the page built.

**Required:** Read `.claude/design-brief.md` before generating any footer. The archetype determines which pattern to use.

---

## Archetype → Footer Pattern

| Archetype | Style | Key trait |
|---|---|---|
| Editorial | Warm off-white, typographic | Horizontal rule top, no dark bg, columns by content weight |
| Brutalist | Black, exposed structure | Thick border grid, ALL CAPS, raw list layout |
| Luxury/Refined | Deep dark, precious restraint | One thin brand-color rule, tracked caps, minimal links |
| Dark/Moody | Very dark atmospheric | Large ambient text element, few links, cinematic |
| Retro-Futuristic | Dark + neon accents | Scanline texture, neon logo glow, monospace links |
| Organic/Natural | Warm cream, unhurried | No dark bg, warm surface, botanical separator |
| Art Deco | Deep warm dark, ornamental | Gold decorative dividers, chevron separator |
| Soft/Pastel | Light tinted, round, gentle | Brand-subtle background, rounded sections |
| Tech-Industrial | Dark utility | Monospace, dense info, status indicators |
| Minimal/Clean | Near-invisible | One thin line separator, minimal content, single accent |
| Coastal/Airy | White or very light | No dark bg, open spacing, wave or organic border-top |
| Playful | Bright colored background | Bold, oversized logo, stacked offset shadow on brand element |

---

## Footer Code Patterns

### Editorial Footer

```astro
---
interface Props {
  businessName: string;
  tagline?: string;
  navLinks: Array<{ href: string; label: string }>;
  socialLinks?: Array<{ href: string; label: string; icon: string }>;
}
const { businessName, tagline, navLinks, socialLinks } = Astro.props;
---
<footer class="site-footer site-footer--editorial">
  <div class="container footer-editorial-inner">
    <div class="footer-brand">
      <p class="footer-wordmark">{businessName}</p>
      {tagline && <p class="footer-tagline">{tagline}</p>}
    </div>
    <nav aria-label="Footer navigation" class="footer-nav-col">
      <p class="footer-col-label">Navigation</p>
      <ul role="list" class="footer-nav">
        {navLinks.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
      </ul>
    </nav>
    {socialLinks && (
      <div class="footer-social-col">
        <p class="footer-col-label">Connect</p>
        <ul role="list" class="footer-social">
          {socialLinks.map((l) => (
            <li><a href={l.href} aria-label={l.label} rel="noopener noreferrer" target="_blank">{l.label}</a></li>
          ))}
        </ul>
      </div>
    )}
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p class="footer-copy">&copy; {new Date().getFullYear()} {businessName}</p>
    </div>
  </div>
</footer>
```

```css
.site-footer--editorial {
  background: var(--color-surface);
  border-top: 2px solid var(--color-text);
  padding-top: var(--space-16);
}

.footer-editorial-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-12);
  padding-bottom: var(--space-16);
  border-bottom: var(--border);
}

.footer-wordmark {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  margin-bottom: var(--space-3);
}

.footer-tagline {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  max-width: 28rem;
  line-height: var(--leading-relaxed);
}

.footer-col-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.footer-nav { list-style: none; display: flex; flex-direction: column; gap: var(--space-3); }

.footer-nav a {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  background-image: linear-gradient(var(--color-brand), var(--color-brand));
  background-repeat: no-repeat;
  background-size: 0% 1px;
  background-position: left bottom;
  transition: background-size 0.3s ease, color 0.2s ease;
}

.footer-nav a:hover {
  color: var(--color-text);
  background-size: 100% 1px;
}

.footer-social { list-style: none; display: flex; flex-direction: column; gap: var(--space-3); }
.footer-social a { font-size: var(--text-sm); color: var(--color-text-muted); text-decoration: none; transition: color 0.2s ease; }
.footer-social a:hover { color: var(--color-brand); }

.footer-bottom { padding-block: var(--space-6); }
.footer-bottom-inner { display: flex; justify-content: space-between; }
.footer-copy { font-size: var(--text-xs); color: var(--color-text-muted); letter-spacing: 0.04em; }

@media (max-width: 48rem) { .footer-editorial-inner { grid-template-columns: 1fr; } }
```

---

### Brutalist Footer

```astro
<footer class="site-footer site-footer--brutalist">
  <div class="footer-brutalist-top">
    <div class="container">
      <p class="footer-brutalist-headline">{businessName}</p>
    </div>
  </div>
  <div class="container footer-brutalist-inner">
    <div class="footer-brutalist-col">
      {tagline && <p class="footer-tagline">{tagline}</p>}
    </div>
    <nav aria-label="Footer navigation">
      <ul role="list" class="footer-brutalist-nav">
        {navLinks.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
      </ul>
    </nav>
  </div>
  <div class="footer-brutalist-bottom">
    <div class="container">
      <p>&copy; {new Date().getFullYear()} {businessName}. ALL RIGHTS RESERVED.</p>
    </div>
  </div>
</footer>
```

```css
.site-footer--brutalist {
  background: var(--color-text);
  color: var(--color-surface);
  border-top: 2px solid var(--color-text);
}

.footer-brutalist-top {
  border-bottom: 2px solid var(--color-surface);
  padding-block: var(--space-8);
}

.footer-brutalist-headline {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: var(--font-bold);
  letter-spacing: -0.03em;
  line-height: 0.9;
  color: var(--color-brand);
}

.footer-brutalist-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  padding-block: var(--space-12);
  border-bottom: 2px solid hsl(0 0% 100% / 0.15);
}

.footer-brutalist-nav { list-style: none; display: flex; flex-direction: column; gap: 0; }

.footer-brutalist-nav a {
  display: block;
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-surface);
  text-decoration: none;
  padding-block: var(--space-3);
  border-bottom: 1px solid hsl(0 0% 100% / 0.1);
  transition: color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard);
  padding-inline: var(--space-2);
}

.footer-brutalist-nav a:hover {
  color: var(--color-text);
  background: var(--color-brand);
}

.footer-brutalist-bottom {
  padding-block: var(--space-4);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: hsl(0 0% 100% / 0.4);
}

@media (max-width: 48rem) { .footer-brutalist-inner { grid-template-columns: 1fr; } }
```

---

### Luxury/Refined Footer

```astro
<footer class="site-footer site-footer--luxury">
  <div class="container footer-luxury-inner">
    <div class="footer-brand">
      <p class="footer-wordmark">{businessName}</p>
      {tagline && <p class="footer-tagline">{tagline}</p>}
    </div>
    <nav aria-label="Footer navigation">
      <ul role="list" class="footer-luxury-nav">
        {navLinks.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
      </ul>
    </nav>
  </div>
  <div class="footer-luxury-bottom">
    <div class="container footer-bottom-inner">
      <p>&copy; {new Date().getFullYear()} {businessName}</p>
    </div>
  </div>
</footer>
```

```css
.site-footer--luxury {
  background: var(--color-neutral-900);
  color: var(--color-neutral-400);
  border-top: 1px solid var(--color-brand);
  padding-top: var(--space-20);
}

.footer-luxury-inner {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-20);
  align-items: start;
  padding-bottom: var(--space-20);
}

.footer-wordmark {
  font-size: var(--text-sm);
  font-weight: var(--font-light);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-brand);
  margin-bottom: var(--space-4);
}

.footer-tagline {
  font-size: var(--text-sm);
  color: var(--color-neutral-500);
  max-width: 30rem;
  line-height: var(--leading-relaxed);
  font-weight: var(--font-light);
}

.footer-luxury-nav { list-style: none; display: flex; flex-direction: column; gap: var(--space-4); }

.footer-luxury-nav a {
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: var(--font-light);
  color: var(--color-neutral-500);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

.footer-luxury-nav a:hover { color: var(--color-brand); }

.footer-luxury-bottom {
  border-top: 1px solid hsl(0 0% 100% / 0.06);
  padding-block: var(--space-6);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--color-neutral-600);
}

@media (max-width: 48rem) { .footer-luxury-inner { grid-template-columns: 1fr; } }
```

---

### Dark/Moody Footer

```astro
<footer class="site-footer site-footer--moody">
  <div class="container footer-moody-inner">
    <p class="footer-moody-statement" aria-hidden="true">{businessName}</p>
    <div class="footer-moody-details">
      <nav aria-label="Footer navigation">
        <ul role="list" class="footer-moody-nav">
          {navLinks.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
        </ul>
      </nav>
      {tagline && <p class="footer-tagline">{tagline}</p>}
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p>&copy; {new Date().getFullYear()} {businessName}</p>
    </div>
  </div>
</footer>
```

```css
.site-footer--moody {
  background: var(--color-neutral-900);
  color: var(--color-neutral-400);
  padding-top: var(--space-24);
  position: relative;
  overflow: hidden;
}

/* Atmospheric background glow */
.site-footer--moody::before {
  content: '';
  position: absolute;
  width: 40rem;
  height: 20rem;
  background: radial-gradient(ellipse at center, hsl(var(--brand-h, 265) var(--brand-s, 55%) 20% / 0.2) 0%, transparent 70%);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.footer-moody-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  padding-bottom: var(--space-16);
  border-bottom: 1px solid hsl(0 0% 100% / 0.06);
}

.footer-moody-statement {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: var(--font-bold);
  letter-spacing: -0.03em;
  line-height: 0.9;
  color: hsl(0 0% 100% / 0.04);
  user-select: none;
  pointer-events: none;
}

.footer-moody-details {
  display: flex;
  gap: var(--space-16);
  align-items: flex-start;
}

.footer-moody-nav { list-style: none; display: flex; gap: var(--space-8); flex-wrap: wrap; }

.footer-moody-nav a {
  font-size: var(--text-sm);
  color: var(--color-neutral-500);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

.footer-moody-nav a:hover { color: var(--color-brand); }

.footer-bottom { padding-block: var(--space-6); font-size: var(--text-xs); color: var(--color-neutral-700); }
```

---

### Retro-Futuristic Footer

```css
.site-footer--retro {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-top-color: hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.4);
  padding-top: var(--space-16);
  position: relative;
  /* Scanline texture */
  background-image: repeating-linear-gradient(
    transparent 0px, transparent 3px,
    hsl(0 0% 0% / 0.03) 3px, hsl(0 0% 0% / 0.03) 4px
  );
}

.footer-wordmark {
  font-family: var(--font-mono);
  font-size: var(--text-xl);
  color: var(--color-brand);
  text-shadow: 0 0 12px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.5);
  letter-spacing: 0.08em;
}

.footer-nav a {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--duration-fast), text-shadow var(--duration-fast);
}

.footer-nav a:hover {
  color: var(--color-brand);
  text-shadow: 0 0 8px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.6);
}
```

---

### Organic/Natural Footer

```css
.site-footer--organic {
  background: var(--color-surface); /* warm cream — never dark */
  border-top: 1px solid hsl(var(--brand-h, 80) 20% 82%);
  padding-top: var(--space-16);
}

/* SVG wave separator above footer content */
.footer-organic-wave {
  width: 100%;
  height: 2rem;
  margin-bottom: var(--space-8);
  color: hsl(var(--brand-h, 80) 15% 88%);
}

.footer-wordmark {
  font-size: var(--text-2xl);
  font-style: italic;
  font-weight: var(--font-medium);
  color: var(--color-brand);
}

.footer-nav a {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--duration-fast);
}

.footer-nav a:hover { color: var(--color-brand); }

.footer-copy { color: var(--color-text-muted); font-size: var(--text-xs); }
```

---

## Rules

- **Never use the starter footer template on dark-base archetypes** — Luxury, Dark/Moody, Retro-Futuristic, Art Deco, Tech-Industrial all need dark-background footers styled per their archetype, not the generic `--color-neutral-900`.
- **The footer wordmark/logo treatment must differ from the nav** — if the nav uses uppercase tracking, the footer can use oversized italic; if the nav is minimal, the footer can be more expressive.
- **The footer is the last impression** — for Editorial and Luxury sites, the footer should feel like a final considered gesture, not an afterthought. A large ghosted business name as a background element, or a single centered quotation, can make the footer the most memorable part of the page.
