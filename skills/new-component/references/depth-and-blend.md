# Depth, Layering & Blend Mode Patterns

Flat backgrounds and clean white cards are safe. These patterns add the visual depth, texture, and image artistry that distinguish award-winning work from competent templates.

---

## mix-blend-mode Techniques

### Text Over Image with Blend Mode

Text that uses `mix-blend-mode` composites against the image beneath — creating color interactions that feel designed rather than placed on top.

```css
/* Screen: text brightens underlying image — good on dark images */
.blend-screen {
  mix-blend-mode: screen;
  color: var(--color-brand);
}

/* Multiply: text darkens into image — good on light images */
.blend-multiply {
  mix-blend-mode: multiply;
  color: var(--color-brand);
}

/* Overlay: high-contrast punch — dramatic on any image */
.blend-overlay {
  mix-blend-mode: overlay;
  color: white;
}

/* Difference: psychedelic invert — Retro-Futuristic, Brutalist */
.blend-difference {
  mix-blend-mode: difference;
  color: white;
}
```

**Always wrap the parent in `isolation: isolate`** to prevent the blend compositing outside its container:

```css
.blend-container {
  position: relative;
  isolation: isolate;
}
```

---

### Duotone Image Effect

Maps an image to two colors — a shadow tone and a highlight tone. Creates a strong brand-colored image treatment without Photoshop.

```css
/* Method 1: CSS filter + color overlay (simpler, less precise) */
.img--duotone-container {
  position: relative;
  isolation: isolate;
}

.img--duotone {
  filter: grayscale(1) contrast(1.1);
}

.img--duotone-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-brand);
  mix-blend-mode: multiply;
  opacity: 0.7;
  pointer-events: none;
}
```

```astro
<!-- Usage -->
<div class="img--duotone-container">
  <Image src={image} alt={imageAlt} width={800} height={600} class="img--duotone" />
</div>
```

For a two-color duotone (shadows one color, highlights another):

```css
/* Method 2: SVG filter (precise, two distinct colors) */
.img--duotone-svg {
  filter: url(#duotone-filter);
}
```

```astro
<!-- Add once to the page, hidden -->
<svg width="0" height="0" aria-hidden="true" style="position:absolute">
  <defs>
    <filter id="duotone-filter">
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <!-- Shadow color: var brand HSL as 0–1 values -->
        <feFuncR type="table" tableValues="0.1 0.8" />
        <feFuncG type="table" tableValues="0.05 0.55" />
        <feFuncB type="table" tableValues="0.3 0.1" />
      </feComponentTransfer>
    </filter>
  </defs>
</svg>
```

Adjust `tableValues` — first value is shadow tone (0–1 per channel), second is highlight tone.

---

### Color Overlay with Blend

A colored layer sits over an image and blends rather than obscures. More interesting than a plain dark overlay.

```css
/* Brand-tinted overlay */
.img-overlay-container {
  position: relative;
  isolation: isolate;
}

.img-overlay-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.5);
  mix-blend-mode: color; /* preserves image luminance, applies brand hue */
  z-index: 1;
  pointer-events: none;
}

/* Gradient overlay that burns into image at bottom */
.img-burn-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    hsl(var(--bg-h, 220) var(--bg-s, 10%) var(--bg-l, 5%) / 0.9) 0%,
    transparent 60%
  );
  mix-blend-mode: multiply;
  z-index: 1;
  pointer-events: none;
}
```

---

## Layering & Z-axis Composition

### Overlapping Elements (Breaking the Grid)

The most decisive visual move: let an element escape its container and overlap the next section. Feels deliberate, not accidental.

```css
/* Card or image that overlaps the section boundary below */
.overflow-element {
  position: relative;
  z-index: 1;
  margin-bottom: -4rem; /* pulls next section up behind it */
}

/* The next section needs space to account for the overflow */
.section--receives-overflow {
  padding-top: calc(var(--space-20) + 4rem);
  position: relative;
  z-index: 0;
}
```

Example — hero image bleeding into services section:

```css
.hero-overflow-image {
  position: relative;
  z-index: 2;
  margin-bottom: -6rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}
```

---

### Layered Background Depth (Pseudo-elements)

Use `::before` and `::after` to create depth behind a section without additional HTML.

```css
/* Offset background shape — creates the appearance of a layer behind content */
.section--layered {
  position: relative;
  isolation: isolate;
}

.section--layered::before {
  content: '';
  position: absolute;
  inset: var(--space-8) calc(-1 * var(--space-6)) calc(-1 * var(--space-8)) var(--space-6);
  background: var(--color-brand-subtle);
  border-radius: var(--radius-lg);
  z-index: -1;
}
```

---

### Glass Morphism Panel

Frosted glass effect — background blurs through the element. Use sparingly — best as a callout panel on a textured or image background. Avoid on plain white.

```css
.glass-panel {
  background: hsl(0 0% 100% / 0.12);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid hsl(0 0% 100% / 0.2);
  border-radius: var(--radius-lg);

  /* Dark variant */
  &.glass-panel--dark {
    background: hsl(0 0% 0% / 0.3);
    border-color: hsl(0 0% 100% / 0.08);
  }
}
```

**Browser note:** `backdrop-filter` requires the element to be above the blurred content in the stacking context. Parent must not have `overflow: hidden`.

---

## Texture & Noise

### Noise Grain Overlay (Component Level)

Add analog grain texture to a specific component — not just full sections.

```css
.texture-grain {
  position: relative;
  isolation: isolate;
}

.texture-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
}

/* Stronger grain for hero/dark sections */
.texture-grain--strong::after { opacity: 0.07; }
/* Subtle grain for cards */
.texture-grain--subtle::after { opacity: 0.025; }
```

---

### CSS Gradient Noise (No SVG)

Pure CSS approximation of grain using multiple overlapping radial gradients. Cheaper to render than SVG filter.

```css
.gradient-noise {
  background-image:
    radial-gradient(circle at 15% 25%, hsl(var(--brand-h) 60% 70% / 0.15) 0%, transparent 40%),
    radial-gradient(circle at 85% 75%, hsl(var(--brand-h) 80% 40% / 0.12) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, hsl(var(--brand-h) 40% 90% / 0.08) 0%, transparent 60%),
    var(--color-bg);
}
```

---

## Scroll-Driven Parallax on Images

Image moves at a different speed than content, creating a sense of depth. Pure CSS.

```css
@supports (animation-timeline: scroll()) {
  .parallax-image-container {
    overflow: hidden;
  }

  .parallax-image {
    will-change: transform;
    scale: 1.2; /* extra room so image stays visible while moving */
    animation: parallax-scroll linear both;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
  }

  @keyframes parallax-scroll {
    from { transform: translateY(-8%); }
    to   { transform: translateY(8%); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .parallax-image { animation: none; scale: 1; }
}
```

---

## Archetype Usage Guide

| Technique | Best archetypes | Avoid for |
|---|---|---|
| Duotone images | Luxury, Editorial, Retro-Futuristic | Organic/Natural (too clinical) |
| mix-blend-mode text | Brutalist, Dark/Moody, Art Deco | Soft/Pastel, Coastal/Airy |
| Glass morphism | Luxury, Dark/Moody, Tech-Industrial | Organic/Natural, Brutalist |
| Noise grain | Organic/Natural, Editorial, Luxury, Dark/Moody | Minimal/Clean, Soft/Pastel |
| Overlapping elements | Any — universal layout move | N/A |
| Layered pseudo-elements | Art Deco, Editorial, Luxury | Brutalist (too refined) |
| Parallax images | Any with photography | Sites with no real photography |
| Color overlay blend | Luxury, Dark/Moody, Retro-Futuristic | Organic/Natural |
