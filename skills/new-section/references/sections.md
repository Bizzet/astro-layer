# 8-Section Library

All sections use token-only CSS. No hard-coded values. All images use `<Image />` except SVGs.

Each section lists multiple layout variants. **Read `.claude/design-brief.md` first** and choose the variant that matches the archetype's layout tendency and section preferences. Never default to Variant A without considering the others.

---

## Hero

**Purpose:** Primary page introduction — headline, subheadline, CTA, optional image.

**Props:**
```ts
interface Props {
  headline: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  image?: ImageMetadata;
  imageAlt?: string;
}
```

---

### Hero — Variant A: Split

Two-column layout. Text left, image right. Strong for product/service sites with real photography.

**Best for:** Organic/Natural, Coastal/Airy, Soft/Pastel, Tech-Industrial (dark bg).

```astro
---
import { Image } from 'astro:assets';
interface Props { headline: string; subheadline: string; ctaPrimary: { label: string; href: string }; ctaSecondary?: { label: string; href: string }; image?: ImageMetadata; imageAlt?: string; }
const { headline, subheadline, ctaPrimary, ctaSecondary, image, imageAlt } = Astro.props;
---
<section class="hero" transition:animate="fade">
  <div class="container hero-inner">
    <div class="hero-content">
      <h1>{headline}</h1>
      <p class="hero-sub">{subheadline}</p>
      <div class="hero-cta">
        <a href={ctaPrimary.href} class="btn btn--primary">{ctaPrimary.label}</a>
        {ctaSecondary && <a href={ctaSecondary.href} class="btn btn--outline">{ctaSecondary.label}</a>}
      </div>
    </div>
    {image && (
      <Image src={image} alt={imageAlt ?? ''} width={600} height={500}
        fetchpriority="high" loading="eager" class="hero-image" />
    )}
  </div>
</section>
```

```css
.hero { padding-block: var(--space-20) var(--space-24); }
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}
.hero h1 {
  font-size: var(--text-4xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}
.hero-sub { font-size: var(--text-lg); color: var(--color-text-muted); margin-top: var(--space-4); }
.hero-cta { display: flex; gap: var(--space-4); flex-wrap: wrap; margin-top: var(--space-8); }
.hero-image { width: 100%; height: auto; border-radius: var(--radius-lg); }
@media (max-width: 48rem) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-image { order: -1; }
}
```

---

### Hero — Variant B: Centered Editorial

Single-column, centered. Strong typographic hierarchy. No image required — the headline IS the statement.

**Best for:** Editorial, Minimal/Clean, Art Deco/Geometric, Brutalist, Luxury/Refined.

```astro
---
interface Props { headline: string; subheadline: string; ctaPrimary: { label: string; href: string }; ctaSecondary?: { label: string; href: string }; }
const { headline, subheadline, ctaPrimary, ctaSecondary } = Astro.props;
---
<section class="hero hero--editorial" transition:animate="fade">
  <div class="container hero-editorial-inner">
    <p class="hero-eyebrow">— Est. {new Date().getFullYear()} —</p>
    <h1>{headline}</h1>
    <p class="hero-sub">{subheadline}</p>
    <div class="hero-cta">
      <a href={ctaPrimary.href} class="btn btn--primary">{ctaPrimary.label}</a>
      {ctaSecondary && <a href={ctaSecondary.href} class="btn btn--outline">{ctaSecondary.label}</a>}
    </div>
  </div>
</section>
```

```css
.hero--editorial {
  padding-block: var(--space-24) var(--space-32);
  border-bottom: var(--border);
}
.hero-editorial-inner {
  max-width: 52rem;
  margin-inline: auto;
  text-align: center;
}
.hero-eyebrow {
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
}
.hero--editorial h1 {
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}
.hero--editorial .hero-sub {
  font-size: var(--text-xl);
  color: var(--color-text-muted);
  margin-top: var(--space-6);
  max-width: 38rem;
  margin-inline: auto;
}
.hero--editorial .hero-cta {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  margin-top: var(--space-10);
}
```

---

### Hero — Variant C: Fullscreen Cinematic

Viewport-height. Background image or gradient with overlay. Text emerges from atmosphere.

**Best for:** Dark/Moody, Retro-Futuristic, Art Deco, Luxury/Refined, Coastal/Airy.

```astro
---
import { Image } from 'astro:assets';
interface Props { headline: string; subheadline: string; ctaPrimary: { label: string; href: string }; ctaSecondary?: { label: string; href: string }; image?: ImageMetadata; imageAlt?: string; }
const { headline, subheadline, ctaPrimary, ctaSecondary, image, imageAlt } = Astro.props;
---
<section class="hero hero--cinematic" transition:animate="fade">
  {image && (
    <Image src={image} alt={imageAlt ?? ''} width={1600} height={900}
      fetchpriority="high" loading="eager" class="hero-bg-image" />
  )}
  <div class="hero-overlay" aria-hidden="true"></div>
  <div class="container hero-cinematic-inner">
    <h1>{headline}</h1>
    <p class="hero-sub">{subheadline}</p>
    <div class="hero-cta">
      <a href={ctaPrimary.href} class="btn btn--primary">{ctaPrimary.label}</a>
      {ctaSecondary && <a href={ctaSecondary.href} class="btn btn--ghost">{ctaSecondary.label}</a>}
    </div>
  </div>
</section>
```

```css
.hero--cinematic {
  position: relative;
  min-height: 100svh;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.hero-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    hsl(var(--bg-h, 220) var(--bg-s, 15%) var(--bg-l, 8%) / 0.4) 0%,
    hsl(var(--bg-h, 220) var(--bg-s, 15%) var(--bg-l, 8%) / 0.75) 100%
  );
}
.hero-cinematic-inner {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--color-neutral-900);
  padding-block: var(--space-32);
}
.hero--cinematic h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}
.hero--cinematic .hero-sub {
  font-size: var(--text-xl);
  opacity: 0.85;
  margin-top: var(--space-6);
  max-width: 40rem;
  margin-inline: auto;
}
.hero--cinematic .hero-cta { display: flex; gap: var(--space-4); justify-content: center; margin-top: var(--space-10); }
.btn--ghost {
  background: transparent;
  border: 1px solid currentColor;
  color: inherit;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  transition: background var(--duration-base) var(--ease-standard);
}
.btn--ghost:hover { background: hsl(0 0% 100% / 0.12); }
```

**Accessibility:** When using a background image, ensure sufficient contrast between overlay and text. Test with WCAG contrast checker.

---

## Services

**Purpose:** Display service offerings in a scannable layout.

**Props:**
```ts
interface Props {
  headline?: string;
  services: Array<{
    title: string;
    description: string;
    icon: string;
    href?: string;
  }>;
}
```

---

### Services — Variant A: Auto-fit Grid

Responsive card grid. Good for 4–9 items. Standard but appropriate for many contexts.

**Best for:** Soft/Pastel, Coastal/Airy, Tech-Industrial.

```astro
<section class="services" transition:animate="slide">
  <div class="container">
    {headline && <h2 class="section-title">{headline}</h2>}
    <ul role="list" class="services-grid">
      {services.map((service) => (
        <li class="service-card">
          <span class="service-icon" aria-hidden="true">{service.icon}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          {service.href && <a href={service.href} class="service-link">Learn more <span aria-hidden="true">→</span></a>}
        </li>
      ))}
    </ul>
  </div>
</section>
```

```css
.section-title {
  font-size: var(--text-3xl);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-12);
}
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--space-6);
}
.service-card {
  padding: var(--space-8);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: var(--border);
}
.service-icon { font-size: var(--text-2xl); display: block; margin-bottom: var(--space-4); }
.service-card h3 { font-size: var(--text-xl); margin-bottom: var(--space-2); }
.service-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-brand);
  text-decoration: none;
}
```

---

### Services — Variant B: Editorial Feature List

Numbered items with horizontal rules and large number decoration. Typographic, not card-based.

**Best for:** Editorial, Minimal/Clean, Luxury/Refined, Brutalist.

```astro
<section class="services services--editorial" transition:animate="slide">
  <div class="container">
    <div class="services-editorial-header">
      {headline && <h2>{headline}</h2>}
    </div>
    <ol role="list" class="services-editorial-list">
      {services.map((service, i) => (
        <li class="service-editorial-item">
          <span class="service-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <div class="service-editorial-body">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {service.href && <a href={service.href} class="service-link">Explore <span aria-hidden="true">→</span></a>}
          </div>
        </li>
      ))}
    </ol>
  </div>
</section>
```

```css
.services--editorial { padding-block: var(--space-20); }
.services-editorial-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 2px solid var(--color-text);
  padding-top: var(--space-6);
  margin-bottom: var(--space-12);
}
.services-editorial-header h2 { font-size: var(--text-3xl); }
.services-editorial-list { display: flex; flex-direction: column; }
.service-editorial-item {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: var(--space-8);
  padding-block: var(--space-8);
  border-bottom: var(--border);
  align-items: start;
}
.service-num {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-brand);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.service-editorial-body h3 { font-size: var(--text-xl); margin-bottom: var(--space-3); }
```

---

### Services — Variant C: Alternating Spotlight

Each service takes full width, alternating image-left / text-right. For 2–4 services with strong imagery.

**Best for:** Organic/Natural, Coastal/Airy, Dark/Moody, Art Deco.

```astro
<section class="services services--spotlight" transition:animate="slide">
  <div class="container">
    {headline && <h2 class="section-title">{headline}</h2>}
    {services.map((service, i) => (
      <div class={`service-spotlight ${i % 2 === 1 ? 'service-spotlight--flip' : ''}`}>
        <div class="service-spotlight-icon" aria-hidden="true">{service.icon}</div>
        <div class="service-spotlight-body">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          {service.href && <a href={service.href} class="btn btn--outline">Learn more</a>}
        </div>
      </div>
    ))}
  </div>
</section>
```

```css
.services--spotlight { padding-block: var(--space-20); }
.service-spotlight {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
  padding-block: var(--space-16);
  border-bottom: var(--border);
}
.service-spotlight--flip { direction: rtl; }
.service-spotlight--flip > * { direction: ltr; }
.service-spotlight-icon {
  font-size: clamp(4rem, 10vw, 8rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-brand-subtle);
  border-radius: var(--radius-lg);
  aspect-ratio: 1;
}
.service-spotlight-body h3 { font-size: var(--text-2xl); margin-bottom: var(--space-4); }
@media (max-width: 48rem) {
  .service-spotlight, .service-spotlight--flip { grid-template-columns: 1fr; direction: ltr; }
}
```

---

## About

**Purpose:** Business story, team introduction, trust signals.

**Props:**
```ts
interface Props {
  headline: string;
  body: string;
  image?: ImageMetadata;
  imageAlt?: string;
  trustSignals?: string[];
}
```

---

### About — Variant A: Split Image

Image one side, text the other. Classic trust-building layout.

**Best for:** Organic/Natural, Coastal/Airy, Soft/Pastel.

```astro
---
import { Image } from 'astro:assets';
interface Props { headline: string; body: string; image?: ImageMetadata; imageAlt?: string; trustSignals?: string[]; }
const { headline, body, image, imageAlt, trustSignals } = Astro.props;
---
<section class="about" transition:animate="slide">
  <div class="container about-inner">
    {image && (
      <Image src={image} alt={imageAlt ?? ''} width={600} height={700} class="about-image" />
    )}
    <div class="about-content">
      <h2>{headline}</h2>
      <p>{body}</p>
      {trustSignals && (
        <ul class="trust-signals" role="list">
          {trustSignals.map((signal) => <li>{signal}</li>)}
        </ul>
      )}
    </div>
  </div>
</section>
```

```css
.about { padding-block: var(--space-20); }
.about-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}
.about-image { width: 100%; height: auto; border-radius: var(--radius-lg); object-fit: cover; }
.about-content h2 { font-size: var(--text-3xl); letter-spacing: var(--tracking-tight); margin-bottom: var(--space-6); }
.about-content p { color: var(--color-text-muted); line-height: var(--leading-relaxed); }
.trust-signals {
  list-style: none;
  margin-top: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.trust-signals li::before {
  content: '✓ ';
  color: var(--color-brand);
  font-weight: var(--font-bold);
}
@media (max-width: 48rem) { .about-inner { grid-template-columns: 1fr; } }
```

---

### About — Variant B: Full-bleed Image with Overlay Text

Image spans full width with text overlaid. Cinematic and immersive.

**Best for:** Dark/Moody, Art Deco, Luxury/Refined, Coastal/Airy.

```astro
---
import { Image } from 'astro:assets';
interface Props { headline: string; body: string; image: ImageMetadata; imageAlt: string; trustSignals?: string[]; }
const { headline, body, image, imageAlt, trustSignals } = Astro.props;
---
<section class="about about--fullbleed" transition:animate="fade">
  <div class="about-fullbleed-media">
    <Image src={image} alt={imageAlt} width={1400} height={700} class="about-fullbleed-image" />
    <div class="about-fullbleed-overlay" aria-hidden="true"></div>
  </div>
  <div class="container about-fullbleed-content">
    <h2>{headline}</h2>
    <p>{body}</p>
    {trustSignals && (
      <ul class="trust-signals" role="list">
        {trustSignals.map((signal) => <li>{signal}</li>)}
      </ul>
    )}
  </div>
</section>
```

```css
.about--fullbleed { position: relative; }
.about-fullbleed-media { position: relative; height: 60vh; overflow: hidden; }
.about-fullbleed-image { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.about-fullbleed-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, hsl(0 0% 0% / 0.7) 0%, hsl(0 0% 0% / 0.2) 60%);
}
.about-fullbleed-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-neutral-900);
}
.about-fullbleed-content h2 { font-size: var(--text-3xl); margin-bottom: var(--space-4); }
.about-fullbleed-content p { max-width: 36rem; opacity: 0.9; line-height: var(--leading-relaxed); }
```

---

### About — Variant C: Text-Forward with Pull Quote

No image. Bold typography with a large pull quote. All tension from text hierarchy.

**Best for:** Editorial, Brutalist, Minimal/Clean.

```astro
---
interface Props { headline: string; body: string; pullQuote?: string; trustSignals?: string[]; }
const { headline, body, pullQuote, trustSignals } = Astro.props;
---
<section class="about about--text" transition:animate="slide">
  <div class="container about-text-inner">
    <header class="about-text-header">
      <h2>{headline}</h2>
    </header>
    <div class="about-text-body">
      {pullQuote && <blockquote class="about-pull-quote">{pullQuote}</blockquote>}
      <p>{body}</p>
      {trustSignals && (
        <ul class="trust-signals" role="list">
          {trustSignals.map((signal) => <li>{signal}</li>)}
        </ul>
      )}
    </div>
  </div>
</section>
```

```css
.about--text { padding-block: var(--space-20); border-top: var(--border); border-bottom: var(--border); }
.about-text-inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-16);
  align-items: start;
}
.about-text-header h2 {
  font-size: var(--text-3xl);
  letter-spacing: var(--tracking-tight);
  position: sticky;
  top: var(--space-8);
}
.about-pull-quote {
  font-size: var(--text-2xl);
  font-style: italic;
  line-height: var(--leading-snug);
  border-left: 4px solid var(--color-brand);
  padding-left: var(--space-6);
  margin-bottom: var(--space-8);
  color: var(--color-text);
}
@media (max-width: 48rem) { .about-text-inner { grid-template-columns: 1fr; } }
```

---

## Testimonials

**Purpose:** Social proof from real customers.

**Props:**
```ts
interface Props {
  headline?: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role?: string;
    rating?: 1 | 2 | 3 | 4 | 5;
  }>;
}
```

---

### Testimonials — Variant A: Grid

Static responsive grid. Reliable for 3–6 testimonials.

**Best for:** Soft/Pastel, Coastal/Airy, Tech-Industrial.

```astro
<section class="testimonials" transition:animate="slide">
  <div class="container">
    {headline && <h2 class="section-title">{headline}</h2>}
    <ul role="list" class="testimonials-grid">
      {testimonials.map((t) => (
        <li>
          <blockquote class="testimonial-card">
            {t.rating && (
              <div class="stars" aria-label={`${t.rating} out of 5 stars`}>
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
            )}
            <p>{t.quote}</p>
            <footer><cite>{t.author}{t.role && `, ${t.role}`}</cite></footer>
          </blockquote>
        </li>
      ))}
    </ul>
  </div>
</section>
```

```css
.testimonials { padding-block: var(--space-20); background: var(--color-bg); }
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-12);
}
.testimonial-card {
  padding: var(--space-8);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: var(--border);
  box-shadow: var(--shadow-sm);
}
.stars { color: var(--color-brand); font-size: var(--text-lg); margin-bottom: var(--space-4); }
.testimonial-card p { font-style: italic; line-height: var(--leading-relaxed); color: var(--color-text-muted); }
.testimonial-card footer { margin-top: var(--space-4); }
.testimonial-card cite { font-style: normal; font-weight: var(--font-semibold); font-size: var(--text-sm); }
```

---

### Testimonials — Variant B: Single Feature

One large testimonial, full prominence. Use when one quote is exceptional or the brand is high-end.

**Best for:** Luxury/Refined, Editorial, Minimal/Clean, Dark/Moody.

```astro
<section class="testimonials testimonials--feature" transition:animate="fade">
  <div class="container">
    {testimonials[0] && (
      <blockquote class="testimonial-feature">
        {testimonials[0].rating && (
          <div class="stars" aria-label={`${testimonials[0].rating} out of 5 stars`}>
            {'★'.repeat(testimonials[0].rating)}
          </div>
        )}
        <p class="testimonial-feature-quote">{testimonials[0].quote}</p>
        <footer class="testimonial-feature-footer">
          <cite>{testimonials[0].author}{testimonials[0].role && `, ${testimonials[0].role}`}</cite>
        </footer>
      </blockquote>
    )}
  </div>
</section>
```

```css
.testimonials--feature { padding-block: var(--space-24); }
.testimonial-feature { max-width: 52rem; margin-inline: auto; text-align: center; }
.testimonial-feature-quote {
  font-size: var(--text-2xl);
  font-style: italic;
  line-height: var(--leading-snug);
  color: var(--color-text);
  margin-block: var(--space-8);
}
.testimonial-feature-quote::before { content: '\201C'; }
.testimonial-feature-quote::after  { content: '\201D'; }
.testimonial-feature-footer cite {
  font-style: normal;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.stars { color: var(--color-brand); font-size: var(--text-xl); }
```

---

### Testimonials — Variant C: Horizontal Scroll

Overflowing row of cards. Creates motion and depth. Good for many testimonials.

**Best for:** Playful/Toy-like, Retro-Futuristic, Organic/Natural.

```astro
<section class="testimonials testimonials--scroll" transition:animate="slide">
  <div class="testimonials-scroll-header container">
    {headline && <h2>{headline}</h2>}
  </div>
  <div class="testimonials-track" role="list" aria-label="Customer testimonials">
    {testimonials.map((t) => (
      <div role="listitem">
        <blockquote class="testimonial-card">
          {t.rating && <div class="stars" aria-label={`${t.rating} out of 5 stars`}>{'★'.repeat(t.rating)}</div>}
          <p>{t.quote}</p>
          <footer><cite>{t.author}{t.role && `, ${t.role}`}</cite></footer>
        </blockquote>
      </div>
    ))}
  </div>
</section>
```

```css
.testimonials--scroll { padding-block: var(--space-20); overflow: hidden; }
.testimonials-scroll-header { margin-bottom: var(--space-10); }
.testimonials-track {
  display: flex;
  gap: var(--space-6);
  overflow-x: auto;
  padding-inline: var(--container-padding);
  padding-bottom: var(--space-4);
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}
.testimonials-track .testimonial-card {
  flex: 0 0 min(22rem, 85vw);
  scroll-snap-align: start;
  padding: var(--space-8);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: var(--border);
}
```

---

## Pricing

**Purpose:** Display service tiers clearly.

**Key elements:**
- 2–3 `<article>` tier cards
- Featured tier highlighted via data-featured attribute
- Feature list per tier
- CTA button per tier

**Props:**
```ts
interface Props {
  headline?: string;
  tiers: Array<{
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    cta: { label: string; href: string };
    featured?: boolean;
  }>;
}
```

**Template:**
```astro
<section class="pricing" transition:animate="slide">
  <div class="container">
    {headline && <h2 class="section-title">{headline}</h2>}
    <div class="pricing-grid">
      {tiers.map((tier) => (
        <article class="pricing-card" data-featured={tier.featured ? '' : undefined}>
          {tier.featured && <p class="pricing-badge">Most Popular</p>}
          <h3 class="pricing-name">{tier.name}</h3>
          <div class="pricing-price">
            <span class="pricing-amount">{tier.price}</span>
            {tier.period && <span class="pricing-period">/{tier.period}</span>}
          </div>
          <p class="pricing-desc">{tier.description}</p>
          <ul role="list" class="pricing-features">
            {tier.features.map((f) => <li>{f}</li>)}
          </ul>
          <a href={tier.cta.href} class="btn btn--primary">{tier.cta.label}</a>
        </article>
      ))}
    </div>
  </div>
</section>
```

```css
.pricing { padding-block: var(--space-20); }
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-12);
  align-items: start;
}
.pricing-card {
  padding: var(--space-8);
  border: var(--border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}
.pricing-card[data-featured] {
  border-color: var(--color-brand);
  box-shadow: var(--shadow-md);
  transform: scale(1.02);
}
.pricing-badge {
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-brand);
  margin-bottom: var(--space-4);
}
.pricing-amount { font-size: var(--text-3xl); font-weight: var(--font-bold); }
.pricing-period { font-size: var(--text-base); color: var(--color-text-muted); }
.pricing-features {
  list-style: none;
  margin-block: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  font-size: var(--text-sm);
}
.pricing-features li::before { content: '✓ '; color: var(--color-brand); font-weight: var(--font-bold); }
```

**Accessibility:** Featured card must be distinguishable beyond color alone — the "Most Popular" badge handles this.

---

## FAQ

**Purpose:** Answer common questions without JS.

**Key elements:**
- `<details>`/`<summary>` accordion — no JavaScript required
- Group by topic if many items

**Props:**
```ts
interface Props {
  headline?: string;
  items: Array<{ question: string; answer: string }>;
}
```

**Template:**
```astro
<section class="faq" transition:animate="slide">
  <div class="container faq-inner">
    <div class="faq-header">
      {headline && <h2>{headline}</h2>}
    </div>
    <div class="faq-list">
      {items.map((item) => (
        <details class="faq-item">
          <summary class="faq-question">
            {item.question}
            <span class="faq-icon" aria-hidden="true">+</span>
          </summary>
          <div class="faq-answer"><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  </div>
</section>
```

```css
.faq { padding-block: var(--space-20); }
.faq-inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-16);
}
.faq-header h2 { font-size: var(--text-3xl); letter-spacing: var(--tracking-tight); position: sticky; top: var(--space-8); }
.faq-item { border-bottom: var(--border); }
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: var(--space-5);
  cursor: pointer;
  font-weight: var(--font-semibold);
  list-style: none;
  gap: var(--space-4);
}
.faq-question::marker, .faq-question::-webkit-details-marker { display: none; }
.faq-icon {
  font-size: var(--text-xl);
  transition: transform var(--duration-base) var(--ease-standard);
  flex-shrink: 0;
  color: var(--color-brand);
}
details[open] .faq-icon { transform: rotate(45deg); }
.faq-answer { padding-bottom: var(--space-5); color: var(--color-text-muted); line-height: var(--leading-relaxed); }
@media (max-width: 48rem) { .faq-inner { grid-template-columns: 1fr; } .faq-header h2 { position: static; margin-bottom: var(--space-8); } }
```

---

## Contact

**Purpose:** Primary conversion point — form + business info.

**Key elements:**
- `<form>` with Formspree action or Astro API route
- Fields: name, email, phone (optional), message
- Address + hours display
- All inputs have associated `<label>`

**Props:**
```ts
interface Props {
  formAction?: string;
  address?: { street: string; city: string; state: string; zip: string; };
  phone?: string;
  email?: string;
  hours?: string[];
}
```

**Template:**
```astro
<section class="contact" transition:animate="slide">
  <div class="container contact-inner">
    <div class="contact-info">
      <h2>Get in touch</h2>
      {address && (
        <address class="contact-address">
          <p>{address.street}</p>
          <p>{address.city}, {address.state} {address.zip}</p>
        </address>
      )}
      {phone && <p class="contact-detail"><a href={`tel:${phone}`}>{phone}</a></p>}
      {email && <p class="contact-detail"><a href={`mailto:${email}`}>{email}</a></p>}
      {hours && (
        <ul class="contact-hours" role="list">
          {hours.map((h) => <li>{h}</li>)}
        </ul>
      )}
    </div>
    <form action={formAction ?? 'https://formspree.io/f/YOUR_ID'} method="POST" class="contact-form" novalidate>
      <div class="form-group">
        <label for="contact-name">Name</label>
        <input type="text" id="contact-name" name="name" required autocomplete="name" />
      </div>
      <div class="form-group">
        <label for="contact-email">Email</label>
        <input type="email" id="contact-email" name="email" required autocomplete="email" />
      </div>
      <div class="form-group">
        <label for="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="5" required></textarea>
      </div>
      <button type="submit" class="btn btn--primary">Send Message</button>
    </form>
  </div>
</section>
```

```css
.contact { padding-block: var(--space-20); }
.contact-inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-16);
  align-items: start;
}
.contact-info h2 { font-size: var(--text-3xl); margin-bottom: var(--space-6); letter-spacing: var(--tracking-tight); }
.contact-address { font-style: normal; color: var(--color-text-muted); line-height: var(--leading-relaxed); margin-bottom: var(--space-4); }
.contact-detail a { color: var(--color-brand); text-decoration: none; }
.contact-detail a:hover { text-decoration: underline; }
.contact-hours { list-style: none; margin-top: var(--space-6); color: var(--color-text-muted); font-size: var(--text-sm); }
.form-group { display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-5); }
.form-group label { font-size: var(--text-sm); font-weight: var(--font-semibold); }
.form-group input,
.form-group textarea {
  padding: var(--space-3) var(--space-4);
  border: var(--border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  font: inherit;
  color: var(--color-text);
  transition: border-color var(--duration-fast) var(--ease-standard);
}
.form-group input:focus,
.form-group textarea:focus {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
  border-color: var(--color-brand);
}
@media (max-width: 48rem) { .contact-inner { grid-template-columns: 1fr; } }
```

**Accessibility:** Every `<input>` and `<textarea>` must have a matching `<label>` via `for`/`id`. Use unique IDs with `contact-` prefix to avoid collisions.

---

## Footer

**Purpose:** Site-wide closing — nav, contact, copyright.

**Key elements:**
- Logo (text or SVG as component — not `<Image />` for SVG)
- Nav `<ul>` with page links
- Social links with `aria-label`
- Copyright `<p>`

**Props:**
```ts
interface Props {
  businessName: string;
  tagline?: string;
  navLinks: Array<{ href: string; label: string }>;
  socialLinks?: Array<{ href: string; label: string; icon: string }>;
}
```

**Template:**
```astro
---
interface Props { businessName: string; tagline?: string; navLinks: Array<{ href: string; label: string }>; socialLinks?: Array<{ href: string; label: string; icon: string }>; }
const { businessName, tagline, navLinks, socialLinks } = Astro.props;
---
<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <a href="/" aria-label="Home" class="footer-logo">{businessName}</a>
      {tagline && <p class="footer-tagline">{tagline}</p>}
    </div>
    <nav aria-label="Footer navigation">
      <ul role="list" class="footer-nav">
        {navLinks.map((link) => (
          <li><a href={link.href}>{link.label}</a></li>
        ))}
      </ul>
    </nav>
    {socialLinks && (
      <ul role="list" class="footer-social">
        {socialLinks.map((link) => (
          <li>
            <a href={link.href} aria-label={link.label} rel="noopener noreferrer" target="_blank">
              <span aria-hidden="true">{link.icon}</span>
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p>&copy; {new Date().getFullYear()} {businessName}. All rights reserved.</p>
    </div>
  </div>
</footer>
```

```css
.site-footer {
  background: var(--color-neutral-900);
  color: var(--color-neutral-400);
  padding-top: var(--space-16);
}
.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: var(--space-12);
  align-items: start;
  padding-bottom: var(--space-12);
  border-bottom: 1px solid var(--color-neutral-700);
}
.footer-logo {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-neutral-100);
  text-decoration: none;
}
.footer-tagline { font-size: var(--text-sm); margin-top: var(--space-2); }
.footer-nav { list-style: none; display: flex; flex-direction: column; gap: var(--space-3); }
.footer-nav a {
  font-size: var(--text-sm);
  color: var(--color-neutral-400);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
}
.footer-nav a:hover { color: var(--color-neutral-100); }
.footer-social { list-style: none; display: flex; gap: var(--space-4); }
.footer-social a { font-size: var(--text-xl); color: var(--color-neutral-400); text-decoration: none; transition: color var(--duration-fast) var(--ease-standard); }
.footer-social a:hover { color: var(--color-brand); }
.footer-bottom { padding-block: var(--space-6); font-size: var(--text-xs); }
@media (max-width: 48rem) { .footer-inner { grid-template-columns: 1fr; } }
```

**Accessibility:** Social links need `aria-label="[Platform name]"`. Logo link needs `aria-label="Home"`.

---

## Section CTA Band

**Purpose:** Strong call-to-action between sections.

**Key elements:**
- `<section>` with brand background
- Headline + subtext + CTA button

**Template:**
```astro
---
interface Props { headline: string; body?: string; cta: { label: string; href: string }; }
const { headline, body, cta } = Astro.props;
---
<section class="cta-band">
  <div class="container cta-band-inner">
    <h2>{headline}</h2>
    {body && <p>{body}</p>}
    <a href={cta.href} class="btn btn--inverse">{cta.label}</a>
  </div>
</section>
```

```css
.cta-band {
  background-color: var(--color-brand);
  color: var(--color-surface);
  padding-block: var(--space-20);
  text-align: center;
}
.cta-band-inner { max-width: 40rem; margin-inline: auto; }
.cta-band h2 { font-size: var(--text-3xl); color: inherit; letter-spacing: var(--tracking-tight); }
.cta-band p { opacity: 0.88; margin-top: var(--space-4); }
.btn--inverse {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-8);
  padding: var(--space-3) var(--space-8);
  background: var(--color-surface);
  color: var(--color-brand);
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  text-decoration: none;
  transition: opacity var(--duration-base) var(--ease-standard);
}
.btn--inverse:hover { opacity: 0.9; }
```

---

## Atmosphere Patterns

Apply these to sections to add visual depth and prevent every section from having the same flat white background. Match to the design brief archetype.

### Pattern 1: Subtle Tinted Background

Light tint using brand-subtle. Good for alternating section backgrounds.

```css
.section--tinted { background: var(--color-brand-subtle); }
.section--muted { background: var(--color-bg); }
```

### Pattern 2: Gradient Mesh Background

Layered radial gradients that create a soft atmospheric depth. Use on Hero or prominent sections.

```css
.section--mesh {
  background:
    radial-gradient(ellipse 80% 60% at 20% 40%, hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 60%, hsl(var(--brand-h) calc(var(--brand-s) + 10%) calc(var(--brand-l) + 15%) / 0.08) 0%, transparent 50%),
    var(--color-bg);
}
```

*Note: for mesh to work, add `--brand-h`, `--brand-s`, `--brand-l` components to `:root` alongside the main brand color.*

### Pattern 3: SVG Noise Texture Overlay

Grain texture via SVG filter. Adds tactility without images. Apply as a `::before` pseudo-element.

```css
.section--textured { position: relative; isolation: isolate; }
.section--textured::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  pointer-events: none;
  z-index: -1;
}
```

### Pattern 4: Diagonal Section Divider

Diagonal clip-path transition between sections. Creates flow and motion.

```css
.section--diagonal-bottom {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 4rem), 0 100%);
  padding-bottom: calc(var(--space-20) + 4rem);
}
.section--diagonal-top {
  clip-path: polygon(0 4rem, 100% 0, 100% 100%, 0 100%);
  padding-top: calc(var(--space-20) + 4rem);
  margin-top: -4rem;
}
```

### Pattern 5: Staggered Scroll Reveal

CSS-only scroll-triggered animation using `@starting-style` and `animation-timeline`.

```css
@supports (animation-timeline: scroll()) {
  .reveal {
    animation: reveal-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 25%;
  }
  @keyframes reveal-up {
    from { opacity: 0; transform: translateY(1.5rem); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
@media (prefers-reduced-motion: reduce) {
  .reveal { animation: none; }
}
```

Apply `.reveal` to individual cards, list items, or content blocks within a section.

### Pattern 6: Fine Grid Background

Subtle grid lines via CSS gradient. Characteristic of Tech-Industrial and Retro-Futuristic archetypes.

```css
.section--grid-bg {
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 3rem 3rem;
  background-color: var(--color-bg);
}
```

### Pattern 7: Hard Drop Shadow Cards (Brutalist)

Offset box-shadow with no blur. Cards look physically offset from the page.

```css
.card--hard {
  border: 2px solid var(--color-text);
  border-radius: 0;
  box-shadow: 4px 4px 0 var(--color-text);
  transition: box-shadow var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out);
}
.card--hard:hover {
  box-shadow: 6px 6px 0 var(--color-brand);
  transform: translate(-2px, -2px);
}
```

### Pattern 8: Animated Stagger on Page Load

Staggered entrance via `animation-delay`. Apply to repeated items (cards, list items).

```css
.stagger-list > * {
  animation: fade-up var(--duration-slow) var(--ease-out) both;
}
.stagger-list > *:nth-child(1) { animation-delay: 0ms; }
.stagger-list > *:nth-child(2) { animation-delay: 80ms; }
.stagger-list > *:nth-child(3) { animation-delay: 160ms; }
.stagger-list > *:nth-child(4) { animation-delay: 240ms; }
.stagger-list > *:nth-child(5) { animation-delay: 320ms; }
.stagger-list > *:nth-child(6) { animation-delay: 400ms; }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(1rem); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .stagger-list > * { animation: none; }
}
```
