# 8-Section Library

All sections use token-only CSS. No hard-coded values. All images use `<Image />` except SVGs.

---

## Hero

**Purpose:** Primary page introduction — headline, subheadline, CTA, optional image.

**Key elements:**
- `<h1>` headline (one per page)
- Subheadline `<p>`
- CTA `<a>` button(s) — primary + optional secondary
- Optional background/side `<Image />` (raster only — **never pass SVG `src` to `<Image />`**)

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

**Template:**
```astro
---
import { Image } from 'astro:assets';
interface Props { /* ... */ }
const { headline, subheadline, ctaPrimary, ctaSecondary, image, imageAlt } = Astro.props;
---
<section class="hero" transition:animate="fade">
  <div class="container hero-inner">
    <div class="hero-content">
      <h1>{headline}</h1>
      <p class="hero-sub">{subheadline}</p>
      <div class="hero-cta">
        <a href={ctaPrimary.href} class="btn btn--primary">{ctaPrimary.label}</a>
        {ctaSecondary && (
          <a href={ctaSecondary.href} class="btn btn--outline">{ctaSecondary.label}</a>
        )}
      </div>
    </div>
    {image && (
      <Image
        src={image}
        alt={imageAlt ?? ''}
        width={600}
        height={500}
        fetchpriority="high"
        loading="eager"
        class="hero-image"
      />
    )}
  </div>
</section>
```

**Accessibility:** `<h1>` must be unique per page. Image alt must be descriptive.

---

## Services

**Purpose:** Display service offerings in a scannable grid.

**Key elements:**
- `<ul role="list">` of service cards
- Each card: icon + title `<h3>` + description `<p>` + optional CTA link

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

**Template:**
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
          {service.href && <a href={service.href}>Learn more</a>}
        </li>
      ))}
    </ul>
  </div>
</section>
```

**CSS pattern:**
```css
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: var(--space-8);
  margin-top: var(--space-12);
}
.service-card {
  padding: var(--space-8);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: var(--border);
}
```

---

## About

**Purpose:** Business story, team introduction, trust signals.

**Key elements:**
- `<Image />` (team photo or business photo — raster only)
- Bio `<p>` paragraphs
- Trust signals list (awards, certifications, years in business)

**Props:**
```ts
interface Props {
  headline: string;
  body: string;
  image: ImageMetadata;
  imageAlt: string;
  trustSignals?: string[];
}
```

**Accessibility:** Image alt must describe the actual photo. Trust signals can be a `<ul>` with checkmarks via CSS.

---

## Testimonials

**Purpose:** Social proof from real customers.

**Key elements:**
- `<blockquote>` + `<cite>` for each testimonial
- Star rating via CSS counter (no images needed)
- Carousel optional — start with static grid

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

**Template:**
```astro
<section class="testimonials">
  <div class="container">
    {headline && <h2>{headline}</h2>}
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
            <footer>
              <cite>{t.author}{t.role && `, ${t.role}`}</cite>
            </footer>
          </blockquote>
        </li>
      ))}
    </ul>
  </div>
</section>
```

---

## Pricing

**Purpose:** Display service tiers clearly.

**Key elements:**
- 2–3 `<article>` tier cards
- Featured tier highlighted via token override (data-featured attribute)
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

**Accessibility:** Featured card must be distinguishable beyond color alone — add a "Most Popular" text badge.

---

## FAQ

**Purpose:** Answer common questions without JS.

**Key elements:**
- `<details>`/`<summary>` accordion — no JavaScript required
- Group by topic using `<section>` with `<h3>` headings if many items

**Props:**
```ts
interface Props {
  headline?: string;
  items: Array<{ question: string; answer: string }>;
}
```

**Template:**
```astro
<section class="faq">
  <div class="container">
    {headline && <h2>{headline}</h2>}
    <dl class="faq-list">
      {items.map((item) => (
        <details class="faq-item">
          <summary class="faq-question">{item.question}</summary>
          <div class="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </dl>
  </div>
</section>
```

**CSS pattern:**
```css
.faq-item { border-bottom: var(--border); }
.faq-question {
  padding-block: var(--space-4);
  cursor: pointer;
  font-weight: var(--font-semibold);
  list-style: none;
}
.faq-question::marker { display: none; }
.faq-answer { padding-bottom: var(--space-4); }
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
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone?: string;
  email?: string;
  hours?: string[];
}
```

**Template (Formspree):**
```astro
<form action={formAction ?? 'https://formspree.io/f/YOUR_ID'} method="POST" class="contact-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required autocomplete="name" />
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required autocomplete="email" />
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  <button type="submit" class="btn btn--primary">Send Message</button>
</form>
```

**Accessibility:** Every `<input>` and `<textarea>` must have a matching `<label>` via `for`/`id`.

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

**Accessibility:** Social links need `aria-label="[Platform name]"`. Logo link needs `aria-label="Home"`.

---

## Section CTA Band

**Purpose:** Strong call-to-action between sections.

**Key elements:**
- `<section>` with brand background
- Headline + subtext + CTA button

**CSS pattern:**
```css
.cta-band {
  background-color: var(--color-brand);
  color: #fff;
  padding-block: var(--space-20);
  text-align: center;
}
.cta-band h2 { color: inherit; }
.cta-band .btn {
  background: #fff;
  color: var(--color-brand);
}
.cta-band .btn:hover {
  background: var(--color-brand-subtle);
}
```
