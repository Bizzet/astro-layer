# Section Transition Patterns

How sections connect to each other is as important as what's inside them. Flat white box after flat white box reads as template. These patterns create visual flow, depth, and rhythm between sections.

**Choose 2–3 patterns per page maximum.** Overusing transitions creates visual noise.

---

## Geometric Dividers

### Wave SVG Divider

Organic curve between sections. Works best transitioning from a colored section to white, or vice versa. The SVG color must match the section it belongs to.

```astro
<!-- Place at the BOTTOM of the outgoing section, matching the NEXT section's background -->
<div class="wave-divider" aria-hidden="true">
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-bg)" />
  </svg>
</div>
```

```css
.wave-divider {
  display: block;
  margin-bottom: -1px; /* kill the gap */
  line-height: 0;
}

.wave-divider svg {
  width: 100%;
  height: 5rem;
  display: block;
}

/* Variant: gentle double-wave */
/* path d="M0,30 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80 Z" */
```

---

### Angled Cut (clip-path)

Sharp diagonal cut between sections — more aggressive than a wave. Characteristic of Tech-Industrial and Brutalist.

```css
/* Section that ends at a diagonal */
.section--angle-bottom {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 5vw), 0 100%);
  padding-bottom: calc(var(--space-20) + 5vw);
}

/* Section that begins at a matching diagonal */
.section--angle-top {
  clip-path: polygon(0 5vw, 100% 0, 100% 100%, 0 100%);
  padding-top: calc(var(--space-20) + 5vw);
  margin-top: -5vw;
}

/* Opposing angle (chevron between two sections) */
.section--angle-both {
  clip-path: polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%);
  padding-block: calc(var(--space-20) + 5vw);
  margin-block: -5vw;
}
```

---

### Curved Bottom (Convex/Concave)

Soft curve that bows outward or inward. More subtle than a wave — single arc rather than S-curve.

```css
/* Convex — section bottom bows outward */
.section--curve-bottom {
  position: relative;
  padding-bottom: calc(var(--space-20) + 4rem);
}

.section--curve-bottom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5rem;
  background: var(--color-bg); /* match NEXT section bg */
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}

/* Concave — next section bites into the current */
.section--curve-top {
  position: relative;
  padding-top: calc(var(--space-20) + 4rem);
}

.section--curve-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  background: var(--color-bg); /* match PREVIOUS section bg */
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
}
```

---

### Stepped Color Block

No shape — just a deliberate color step. The section background itself is the transition. Use full-bleed color bands to break the white monotony.

```css
/* Tinted band between sections */
.section--band {
  background: var(--color-brand-subtle);
  padding-block: var(--space-24);
}

/* Deep dark band (Luxury, Dark/Moody) */
.section--dark-band {
  background: var(--color-neutral-900);
  color: var(--color-neutral-100);
  padding-block: var(--space-24);
}

.section--dark-band .section-title,
.section--dark-band h2 { color: var(--color-neutral-100); }

.section--dark-band .section-title-muted { color: var(--color-neutral-400); }
```

---

### Overlapping Sections (Z-axis Depth)

The next section physically overlaps the previous one, creating a layered, dimensional feel. Strong for card-heavy sections following a hero.

```css
/* Hero or previous section */
.section--overlap-source {
  padding-bottom: calc(var(--space-20) + 4rem);
}

/* This section slides over the one above */
.section--overlap {
  position: relative;
  z-index: 1;
  margin-top: -4rem;
  background: var(--color-surface);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  box-shadow: 0 -8px 40px hsl(0 0% 0% / 0.08);
  padding-top: var(--space-16);
}
```

Add `--radius-xl: 2rem` to tokens if not already present.

---

### Torn Paper / Jagged Edge

Irregular SVG edge — handmade, organic feel. Best for Organic/Natural and Playful archetypes.

```astro
<div class="torn-edge" aria-hidden="true">
  <svg viewBox="0 0 1440 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,20 L60,35 L120,15 L200,40 L280,18 L360,38 L440,12 L520,32 L600,22 L680,42 L760,16 L840,36 L920,20 L1000,38 L1080,14 L1160,34 L1240,22 L1320,40 L1440,18 L1440,50 L0,50 Z"
      fill="var(--color-bg)"
    />
  </svg>
</div>
```

```css
.torn-edge {
  display: block;
  margin-bottom: -1px;
  line-height: 0;
}

.torn-edge svg {
  width: 100%;
  height: 3rem;
  display: block;
}
```

---

## Scroll-Activated Transitions

### Section Fade-In with Background Shift

As a section enters the viewport, the page background transitions to match that section's color. Feels like the page breathing.

```css
/* Each section declares its own background via a data attribute */
/* Requires a small JS snippet to observe and apply */
.section--bg-shift {
  /* background is applied via JS based on data-bg */
  transition: background 0.6s ease;
}
```

```ts
// src/scripts/bg-shift.ts
export function initBgShift() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const sections = document.querySelectorAll<HTMLElement>('[data-bg]');
  const body = document.body;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bg = (entry.target as HTMLElement).dataset.bg ?? '';
          body.style.setProperty('--page-bg', bg);
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
}
```

Usage: `<section class="hero" data-bg="var(--color-brand-subtle)">`

---

### Horizontal Rule Reveal

A thin horizontal rule animates its width from 0 to 100% as the section enters. Editorial and precise.

```css
.section-rule {
  width: 0;
  height: 1px;
  background: var(--color-border);
  margin-bottom: var(--space-12);
  animation: rule-expand 0.8s cubic-bezier(0.77, 0, 0.175, 1) both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

@keyframes rule-expand {
  from { width: 0; }
  to   { width: 100%; }
}

/* Brand-colored variant */
.section-rule--brand { background: var(--color-brand); }

@media (prefers-reduced-motion: reduce) {
  .section-rule { animation: none; width: 100%; }
}
```

---

## Composition Rules

**Never stack two identical transitions.** If Hero ends with a wave, the next section boundary should be a color band or overlap — not another wave.

**Match transition type to archetype:**

| Archetype | Recommended transitions |
|---|---|
| Editorial | Horizontal rule reveal, stepped color block |
| Brutalist | Angled cut, stepped dark band |
| Organic/Natural | Wave divider, torn paper, overlap |
| Luxury/Refined | Overlap with card surface, dark band |
| Retro-Futuristic | Angled cut, grid background band |
| Soft/Pastel | Wave divider, curved bottom, overlap |
| Tech-Industrial | Angled cut, grid band, dark band |
| Art Deco/Geometric | Angled cut, stepped color block |
| Playful/Toy-like | Torn paper, wave, overlap |
| Minimal/Clean | Stepped color block, horizontal rule reveal |
| Coastal/Airy | Wave divider, curved bottom |
| Dark/Moody | Overlap, dark band, wave (inverted) |

**Limit per page:** 2 geometric dividers maximum. More than that fights for attention.
