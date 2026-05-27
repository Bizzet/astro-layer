# Header / Navigation Variants

The starter `Header.astro` is a baseline — it must be replaced with an archetype-appropriate version. Every archetype produces a visually distinct navigation. The nav is the first element visitors see; a generic sticky-white-bar immediately signals a template site.

**Required:** After `design-direction` runs and the archetype is known, rewrite `Header.astro` using the pattern below that matches the archetype.

---

## Archetype → Nav Pattern

| Archetype | Style | Key trait |
|---|---|---|
| Editorial | Thin rule nav | 1px bottom border only, no background, small-caps links |
| Brutalist | Thick-border block nav | 2px border, ALL CAPS links, hard hover offset |
| Luxury/Refined | Ghost → solid scroll nav | Transparent on hero, transitions solid on scroll |
| Dark/Moody | Floating transparent nav | No background, floats over hero, solid on scroll |
| Retro-Futuristic | Neon-accent dark nav | Dark bg, brand-color left border, monospace links |
| Organic/Natural | Inline scrolling nav | No sticky, soft color, scrolls with page |
| Soft/Pastel | Soft floating pill nav | Rounded, very light fill, soft shadow |
| Art Deco | Dark ornamental nav | Dark bg, gold tracked links, decorative divider |
| Tech-Industrial | Dark utility nav | Dark bg, monospace or tight grotesque, status-tag active |
| Minimal/Clean | Ghost minimal nav | Nearly invisible, single accent on active link |
| Coastal/Airy | Light transparent nav | Transparent, becomes white on scroll, no CTA button |
| Playful/Toy-like | Chunky bold nav | Heavy font, colored active state, stacked shadow on CTA |

---

## Nav Variant Code

### Editorial — Thin Rule Nav

```astro
<header class="site-header site-header--editorial">
  <div class="container header-inner">
    <a href="/" class="logo" aria-label="Home">
      <span class="logo-text">Business Name</span>
    </a>
    <nav aria-label="Main navigation">
      <ul role="list" class="nav-list">
        {navLinks.map(({ href, label }) => (
          <li>
            <a href={href}
               class:list={['nav-link', { 'is-active': currentPath === href }]}
               aria-current={currentPath === href ? 'page' : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</header>
```

```css
.site-header--editorial {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-text);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--space-5);
}

.logo-text {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  letter-spacing: 0.04em;
  color: var(--color-text);
  text-transform: uppercase;
}

.nav-list {
  display: flex;
  gap: var(--space-10);
}

.nav-link {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  text-decoration: none;
  position: relative;
  transition: color var(--duration-fast) var(--ease-standard);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-brand);
  transition: width 0.35s cubic-bezier(0.77, 0, 0.175, 1);
}

.nav-link:hover,
.nav-link.is-active { color: var(--color-text); }
.nav-link:hover::after,
.nav-link.is-active::after { width: 100%; }
```

---

### Brutalist — Thick-Border Block Nav

```astro
<header class="site-header site-header--brutalist">
  <div class="container header-inner">
    <a href="/" class="logo" aria-label="Home">
      <span class="logo-text">Business Name</span>
    </a>
    <nav aria-label="Main navigation">
      <ul role="list" class="nav-list">
        {navLinks.map(({ href, label }) => (
          <li>
            <a href={href}
               class:list={['nav-link', { 'is-active': currentPath === href }]}
               aria-current={currentPath === href ? 'page' : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <a href="/contact" class="nav-cta">Contact →</a>
  </div>
</header>
```

```css
.site-header--brutalist {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 2px solid var(--color-text);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding-block: var(--space-4);
}

.logo-text {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.nav-list {
  display: flex;
  gap: 0;
  margin-inline-start: auto;
}

.nav-link {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text);
  text-decoration: none;
  padding: var(--space-2) var(--space-5);
  border-left: 2px solid var(--color-text);
  transition: background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard);
}

.nav-link:last-of-type { border-right: 2px solid var(--color-text); }

.nav-link:hover,
.nav-link.is-active {
  background: var(--color-text);
  color: var(--color-surface);
}

.nav-cta {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-brand);
  text-decoration: none;
  padding: var(--space-2) var(--space-4);
  border: 2px solid var(--color-brand);
  transition: background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard);
}

.nav-cta:hover {
  background: var(--color-brand);
  color: var(--color-surface);
}
```

---

### Luxury/Refined — Ghost → Solid Scroll Nav

Requires a small `<script>` to add `.is-scrolled` when past the hero.

```astro
<header class="site-header site-header--luxury">
  <div class="container header-inner">
    <a href="/" class="logo" aria-label="Home">
      <span class="logo-text">Business Name</span>
    </a>
    <nav aria-label="Main navigation">
      <ul role="list" class="nav-list">
        {navLinks.map(({ href, label }) => (
          <li>
            <a href={href}
               class:list={['nav-link', { 'is-active': currentPath === href }]}
               aria-current={currentPath === href ? 'page' : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <a href="/contact" class="nav-cta">Get in Touch</a>
  </div>
</header>

<script>
  const header = document.querySelector('.site-header--luxury');
  const observer = new IntersectionObserver(
    ([entry]) => header?.classList.toggle('is-scrolled', !entry.isIntersecting),
    { rootMargin: '-80px 0px 0px 0px' }
  );
  const hero = document.querySelector('section');
  if (hero) observer.observe(hero);
</script>
```

```css
.site-header--luxury {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 100;
  background: transparent;
  transition: background var(--duration-slow) var(--ease-standard),
              border-color var(--duration-slow) var(--ease-standard);
  border-bottom: 1px solid transparent;
}

.site-header--luxury.is-scrolled {
  background: var(--color-surface);
  border-bottom-color: var(--color-border);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--space-6);
  transition: padding var(--duration-slow) var(--ease-standard);
}

.is-scrolled .header-inner { padding-block: var(--space-4); }

.logo-text {
  font-size: var(--text-sm);
  font-weight: var(--font-light);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-neutral-100);
  transition: color var(--duration-slow) var(--ease-standard);
}

.is-scrolled .logo-text { color: var(--color-text); }

.nav-list { display: flex; gap: var(--space-10); }

.nav-link {
  font-size: var(--text-xs);
  font-weight: var(--font-light);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: hsl(0 0% 100% / 0.75);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

.is-scrolled .nav-link { color: var(--color-text-muted); }
.nav-link:hover,
.nav-link.is-active { color: var(--color-brand); }

.nav-cta {
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-brand);
  text-decoration: none;
  border-bottom: 1px solid var(--color-brand);
  padding-bottom: 2px;
  transition: opacity var(--duration-fast) var(--ease-standard);
}
.nav-cta:hover { opacity: 0.7; }
```

**Note:** Pages using this nav must add `padding-top: 5rem` (or equivalent) to the hero section to account for the fixed positioning.

---

### Dark/Moody — Floating Transparent Nav

```astro
<header class="site-header site-header--moody">
  <div class="container header-inner">
    <a href="/" class="logo" aria-label="Home">
      <span class="logo-text">Business Name</span>
    </a>
    <nav aria-label="Main navigation">
      <ul role="list" class="nav-list">
        {navLinks.map(({ href, label }) => (
          <li>
            <a href={href}
               class:list={['nav-link', { 'is-active': currentPath === href }]}
               aria-current={currentPath === href ? 'page' : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</header>

<script>
  const header = document.querySelector('.site-header--moody');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 60);
  }, { passive: true });
</script>
```

```css
.site-header--moody {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 100;
  background: transparent;
  transition: background 0.5s ease;
}

.site-header--moody.is-scrolled {
  background: hsl(var(--bg-h, 220) var(--bg-s, 12%) var(--bg-l, 6%) / 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--space-6);
}

.logo-text {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  letter-spacing: 0.06em;
  color: var(--color-neutral-100);
}

.nav-list { display: flex; gap: var(--space-8); }

.nav-link {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: hsl(0 0% 100% / 0.6);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

.nav-link:hover,
.nav-link.is-active { color: var(--color-brand); }
```

---

### Retro-Futuristic — Neon-Accent Dark Nav

```css
.site-header--retro {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  border-left: 3px solid var(--color-brand);
}

.logo-text {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-brand);
  text-shadow: 0 0 12px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.5);
}

.nav-link {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard), text-shadow var(--duration-fast) var(--ease-standard);
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--color-brand);
  text-shadow: 0 0 8px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.6);
}
```

---

### Organic/Natural — Soft Scrolling Nav (not sticky)

```css
.site-header--organic {
  position: relative; /* NOT sticky — scrolls with page */
  background: var(--color-surface);
  border-bottom: 1px solid hsl(var(--brand-h, 80) 20% 88%);
}

.logo-text {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  font-style: italic;
  color: var(--color-brand);
}

.nav-link {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}

.nav-link:hover,
.nav-link.is-active { color: var(--color-brand); }
```

---

### Art Deco — Dark Ornamental Nav

```css
.site-header--artdeco {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-neutral-900);
  border-bottom: 1px solid hsl(var(--brand-h, 45) var(--brand-s, 65%) var(--brand-l, 55%) / 0.3);
}

.logo-text {
  font-size: var(--text-base);
  font-weight: var(--font-light);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-brand);
}

.nav-list {
  display: flex;
  gap: 0;
}

.nav-link {
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: var(--font-light);
  color: var(--color-neutral-400);
  text-decoration: none;
  padding: var(--space-2) var(--space-6);
  border-left: 1px solid hsl(var(--brand-h, 45) var(--brand-s, 65%) var(--brand-l, 55%) / 0.2);
  transition: color var(--duration-fast) var(--ease-standard);
}

.nav-link:last-of-type { border-right: 1px solid hsl(var(--brand-h, 45) var(--brand-s, 65%) var(--brand-l, 55%) / 0.2); }

.nav-link:hover,
.nav-link.is-active { color: var(--color-brand); }
```

---

## Mobile Navigation (universal)

The mobile pattern is universal — a hamburger reveals a full-height overlay. Customize the overlay colors per archetype.

```astro
<!-- Add to Header.astro for mobile -->
<button class="nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Toggle navigation">
  <span></span><span></span><span></span>
</button>

<div class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <nav aria-label="Mobile navigation">
    <ul role="list" class="mobile-nav-list">
      {navLinks.map(({ href, label }) => (
        <li><a href={href} class="mobile-nav-link">{label}</a></li>
      ))}
    </ul>
  </nav>
</div>

<script>
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav?.setAttribute('aria-hidden', String(expanded));
    mobileNav?.classList.toggle('is-open', !expanded);
    document.body.style.overflow = expanded ? '' : 'hidden';
  });

  // Close on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
</script>
```

```css
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-2);
  background: none;
  border: none;
  cursor: pointer;
  margin-inline-start: auto;
}

.nav-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text);
  transition: transform 0.25s ease, opacity 0.25s ease;
}

[aria-expanded="true"] .nav-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
[aria-expanded="true"] .nav-toggle span:nth-child(2) { opacity: 0; }
[aria-expanded="true"] .nav-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.mobile-nav {
  position: fixed;
  inset: 0;
  background: var(--color-surface);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.mobile-nav.is-open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-nav-list { list-style: none; text-align: center; }

.mobile-nav-link {
  display: block;
  font-size: clamp(2rem, 7vw, 4rem);
  font-weight: var(--font-bold);
  color: var(--color-text);
  text-decoration: none;
  padding: var(--space-3) 0;
  transition: color var(--duration-fast) var(--ease-standard);
}

.mobile-nav-link:hover { color: var(--color-brand); }

@media (max-width: 48rem) {
  .nav-toggle { display: flex; }
  .nav-list { display: none; }
  .header-cta { display: none; }
}
```
