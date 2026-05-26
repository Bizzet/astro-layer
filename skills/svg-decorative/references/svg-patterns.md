# SVG Decorative Patterns

All components: `aria-hidden="true"`, `focusable="false"`, token-only colors. Drop into `src/components/decorative/`.

---

## 1. Blob / Organic Fill

**Best for:** Organic/Natural, Soft/Pastel, Playful, Coastal/Airy

### Asymmetric Blob (background fill)

Full-section background blob. Position: absolute, behind content.

```astro
---
// src/components/decorative/BlobFill.astro
interface Props {
  class?: string;
  color?: string; // CSS custom property name, e.g. "--color-brand-subtle"
  opacity?: number;
}
const { class: className, color = '--color-brand-subtle', opacity = 1 } = Astro.props;
---
<svg
  class:list={['blob-fill', className]}
  viewBox="0 0 700 600"
  preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
  style={`opacity: ${opacity}`}
>
  <path
    d="M350,60 C480,30 590,110 610,250 C630,390 550,490 410,540
       C270,590 130,530 80,390 C30,250 100,130 200,80 C250,56 300,72 350,60Z"
    fill={`var(${color})`}
  />
</svg>
```

```css
/* In the parent section's <style> block */
.blob-fill {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
```

### Dual-Layer Blob (depth effect)

Two offset blobs create depth. Use brand + surface colors.

```astro
---
// src/components/decorative/BlobDual.astro
interface Props { class?: string; }
const { class: className } = Astro.props;
---
<svg
  class:list={['blob-dual', className]}
  viewBox="0 0 800 700"
  preserveAspectRatio="xMidYMid slice"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <!-- Back layer -->
  <path
    d="M380,80 C510,50 640,140 650,290 C660,440 570,530 420,560
       C270,590 140,510 110,370 C80,230 160,110 260,75 C305,58 345,90 380,80Z"
    fill="var(--color-brand-subtle)"
    opacity="0.6"
  />
  <!-- Front layer — offset right/down -->
  <path
    d="M440,120 C550,100 650,180 640,320 C630,460 540,540 400,555
       C260,570 160,490 150,360 C140,230 220,130 330,100 C375,88 410,130 440,120Z"
    fill="var(--color-brand-subtle)"
    opacity="0.9"
  />
</svg>
```

### Floating Accent Blob (corner placement)

Sized to ~40% of section width. Positioned at one corner, partially clipped.

```astro
---
// src/components/decorative/BlobAccent.astro
interface Props { class?: string; }
const { class: className } = Astro.props;
---
<svg
  class:list={['blob-accent', className]}
  viewBox="0 0 400 400"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <path
    d="M200,40 C280,20 350,80 360,170 C370,260 310,330 220,350
       C130,370 60,310 50,210 C40,110 100,50 170,35 C184,32 192,42 200,40Z"
    fill="var(--color-brand)"
    opacity="0.12"
  />
</svg>
```

```css
/* Top-right corner accent */
.blob-accent {
  position: absolute;
  top: -4rem;
  right: -4rem;
  width: clamp(16rem, 35vw, 28rem);
  height: auto;
  pointer-events: none;
  z-index: 0;
}
```

---

## 2. Hard Geometry

**Best for:** Brutalist, Art Deco, Tech-Industrial, Retro-Futuristic

### Brutalist Bars (raw rectangular strokes)

Overlapping thick strokes — deliberately unrefined.

```astro
---
// src/components/decorative/BrutalistBars.astro
interface Props { class?: string; }
const { class: className } = Astro.props;
---
<svg
  class:list={['brutalist-bars', className]}
  viewBox="0 0 500 400"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <rect x="0" y="60" width="340" height="32" fill="var(--color-brand)" />
  <rect x="80" y="130" width="420" height="18" fill="var(--color-text)" opacity="0.08" />
  <rect x="20" y="210" width="260" height="48" fill="var(--color-brand)" opacity="0.15" />
  <rect x="200" y="290" width="300" height="22" fill="var(--color-brand)" opacity="0.5" />
</svg>
```

### Art Deco Fan

Symmetrical radiating fan shape — corner ornament or section cap.

```astro
---
// src/components/decorative/DecaFan.astro
interface Props { class?: string; }
const { class: className } = Astro.props;
---
<svg
  class:list={['deco-fan', className]}
  viewBox="0 0 200 120"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <g fill="none" stroke="var(--color-brand)" stroke-width="1.5">
    <path d="M100,110 L100,10" />
    <path d="M100,110 L30,20" />
    <path d="M100,110 L170,20" />
    <path d="M100,110 L10,60" />
    <path d="M100,110 L190,60" />
    <path d="M100,110 L5,95" />
    <path d="M100,110 L195,95" />
    <!-- Arc spanning fan -->
    <path d="M15,95 A90,90 0 0 1 185,95" />
    <path d="M35,45 A75,75 0 0 1 165,45" />
  </g>
</svg>
```

### Chevron Stack

Repeating diagonal chevrons — works as full-section background fill or as an accent strip.

```astro
---
// src/components/decorative/ChevronStack.astro
interface Props { class?: string; }
const { class: className } = Astro.props;
---
<svg
  class:list={['chevron-stack', className]}
  viewBox="0 0 800 600"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <defs>
    <pattern id="chevrons" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
      <polyline points="0,20 20,0 40,20 60,0 80,20" fill="none" stroke="var(--color-brand)" stroke-width="1" opacity="0.2" />
      <polyline points="0,40 20,20 40,40 60,20 80,40" fill="none" stroke="var(--color-brand)" stroke-width="1" opacity="0.2" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#chevrons)" />
</svg>
```

---

## 3. Texture Overlays (SVG Filter)

**Best for:** Dark/Moody, Luxury/Refined, Editorial, Organic/Natural

Layer these on top of section backgrounds using `mix-blend-mode: overlay` or `multiply` at low opacity.

### Film Grain (feTurbulence)

Adds analog noise to any section. The foundational texture for Dark/Moody and Luxury.

```astro
---
// src/components/decorative/GrainOverlay.astro
interface Props {
  class?: string;
  opacity?: number;
  frequency?: number; // 0.55–0.75 is typical grain range
}
const { class: className, opacity = 0.04, frequency = 0.65 } = Astro.props;
---
<svg
  class:list={['grain-overlay', className]}
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <filter id="grain" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence
      type="fractalNoise"
      baseFrequency={frequency}
      numOctaves="4"
      stitchTiles="stitch"
      result="noise"
    />
    <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
    <feBlend in="SourceGraphic" in2="grey" mode="overlay" />
  </filter>
  <rect width="100%" height="100%" filter="url(#grain)" style={`opacity: ${opacity}`} />
</svg>
```

```css
.grain-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1; /* above background shape, below content */
}
```

> Note: `feTurbulence` re-renders on each paint — do not animate it with CSS transforms. For a static grain that doesn't shift on resize, use `stitchTiles="stitch"`.

### Radial Vignette

Dark edge fade — atmospheric depth for Dark/Moody and Luxury hero sections.

```astro
---
// src/components/decorative/Vignette.astro
interface Props { class?: string; intensity?: number; }
const { class: className, intensity = 0.4 } = Astro.props;
---
<svg
  class:list={['vignette', className]}
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <defs>
    <radialGradient id="vignette-grad" cx="50%" cy="50%" r="70%">
      <stop offset="40%" stop-color="transparent" />
      <stop offset="100%" stop-color="var(--color-bg)" stop-opacity={intensity} />
    </radialGradient>
  </defs>
  <rect width="100" height="100" fill="url(#vignette-grad)" />
</svg>
```

---

## 4. Grid and Line Patterns

**Best for:** Tech-Industrial, Retro-Futuristic, Minimal/Clean, Editorial

### Dot Grid

Low-contrast dot pattern — technical, precise.

```astro
---
// src/components/decorative/DotGrid.astro
interface Props { class?: string; spacing?: number; dotSize?: number; }
const { class: className, spacing = 24, dotSize = 1.5 } = Astro.props;
---
<svg
  class:list={['dot-grid', className]}
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <defs>
    <pattern id="dots" x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
      <circle cx={dotSize} cy={dotSize} r={dotSize} fill="var(--color-brand)" opacity="0.18" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#dots)" />
</svg>
```

### Line Grid (orthogonal)

Squared graph-paper grid. Strong for Tech-Industrial and Retro-Futuristic.

```astro
---
// src/components/decorative/LineGrid.astro
interface Props { class?: string; }
const { class: className } = Astro.props;
---
<svg
  class:list={['line-grid', className]}
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <defs>
    <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-brand)" stroke-width="0.5" opacity="0.15" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>
```

### Diagonal Stripe

Bold or subtle diagonal stripe fill. Adjustable angle via viewBox + pattern transform.

```astro
---
// src/components/decorative/DiagonalStripe.astro
interface Props { class?: string; gap?: number; weight?: number; }
const { class: className, gap = 20, weight = 2 } = Astro.props;
---
<svg
  class:list={['diagonal-stripe', className]}
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <defs>
    <pattern id="stripes" x="0" y="0" width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2={gap} stroke="var(--color-brand)" stroke-width={weight} opacity="0.1" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#stripes)" />
</svg>
```

---

## 5. Ring / Arc Motifs

**Best for:** Retro-Futuristic, Art Deco, Luxury/Refined

### Concentric Rings (radar)

Floating at a corner. Archetype signal for Retro-Futuristic — suggests depth and precision.

```astro
---
// src/components/decorative/ConcentricRings.astro
interface Props { class?: string; rings?: number; }
const { class: className, rings = 5 } = Astro.props;
const radii = Array.from({ length: rings }, (_, i) => 40 + i * 30);
---
<svg
  class:list={['concentric-rings', className]}
  viewBox="0 0 400 400"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  {radii.map((r, i) => (
    <circle
      cx="200"
      cy="200"
      r={r}
      fill="none"
      stroke="var(--color-brand)"
      stroke-width="1"
      opacity={0.6 - i * 0.1}
    />
  ))}
  <circle cx="200" cy="200" r="4" fill="var(--color-brand)" opacity="0.4" />
</svg>
```

```css
/* Position at top-right, partially clipped */
.concentric-rings {
  position: absolute;
  top: -6rem;
  right: -6rem;
  width: clamp(18rem, 40vw, 32rem);
  height: auto;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
}
```

### Arc Sweep (partial ring)

A single partial arc — cleaner than full rings. Works as a geometric horizon line.

```astro
---
// src/components/decorative/ArcSweep.astro
interface Props { class?: string; }
const { class: className } = Astro.props;
---
<svg
  class:list={['arc-sweep', className]}
  viewBox="0 0 600 300"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <!-- Large arc — 300px radius, starts lower-left, ends lower-right -->
  <path
    d="M 50,280 A 260,260 0 0 1 550,280"
    fill="none"
    stroke="var(--color-brand)"
    stroke-width="1.5"
    opacity="0.3"
  />
  <path
    d="M 100,280 A 200,200 0 0 1 500,280"
    fill="none"
    stroke="var(--color-brand)"
    stroke-width="1"
    opacity="0.2"
  />
</svg>
```

---

## 6. Corner and Edge Ornaments

**Best for:** Art Deco, Luxury/Refined, Editorial

Placed at section corners. Keep `pointer-events: none`, `aria-hidden`. Scale at ~10–15% of section width.

### Art Deco Corner

Four-point geometric corner motif — mirrors horizontally and vertically as needed.

```astro
---
// src/components/decorative/DecoCorner.astro
interface Props { class?: string; }
const { class: className } = Astro.props;
---
<svg
  class:list={['deco-corner', className]}
  viewBox="0 0 80 80"
  preserveAspectRatio="xMinYMin meet"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <g fill="none" stroke="var(--color-brand)" stroke-width="1">
    <!-- L-frame -->
    <polyline points="0,0 0,70 10,70" />
    <polyline points="0,0 70,0 70,10" />
    <!-- Inner diamond -->
    <polygon points="15,15 30,5 45,15 35,30 45,45 30,55 15,45 25,30" opacity="0.4" />
    <!-- Corner dot -->
    <circle cx="5" cy="5" r="2" fill="var(--color-brand)" />
  </g>
</svg>
```

```css
/* Top-left corner */
.deco-corner {
  position: absolute;
  top: var(--space-6);
  left: var(--space-6);
  width: clamp(3rem, 6vw, 5rem);
  height: auto;
  pointer-events: none;
  z-index: 0;
}

/* Mirror for top-right: transform: scaleX(-1) */
/* Mirror for bottom-left: transform: scaleY(-1) */
/* Mirror for bottom-right: transform: scale(-1, -1) */
```

### Editorial Hairline Mark

A single thin L-rule. Minimal. Used as section eyebrow or card cap.

```astro
---
// src/components/decorative/HairlineMark.astro
interface Props { class?: string; }
const { class: className } = Astro.props;
---
<svg
  class:list={['hairline-mark', className]}
  viewBox="0 0 60 40"
  preserveAspectRatio="xMinYMin meet"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <line x1="0" y1="0" x2="0" y2="40" stroke="var(--color-brand)" stroke-width="1" />
  <line x1="0" y1="0" x2="60" y2="0" stroke="var(--color-brand)" stroke-width="1" />
</svg>
```

---

## 7. Composition Rules

**One SVG element per section maximum.** If the section needs both a background shape and a grain overlay, wrap them in a single `<BlobWithGrain />` component — don't scatter multiple positioned elements.

**Match SVG category to archetype** using the table in SKILL.md. Cross-archetype choices only work if the brief explicitly supports the tension (e.g., a Brutalist site that uses a blob is making a deliberate statement — make sure the brief says so).

**Scale check before committing:**
- Background fills: cover ≥ 60% of section area or they look accidental
- Accent shapes: 25–40% of section width; clip at the edge so they read as extending beyond the frame, not floating in space
- Corner ornaments: 8–15% of section width; any larger and they compete with content

**Reduce on mobile:** Most accent shapes should hide at small viewports. Use `@media (max-width: 48rem) { .my-accent { display: none; } }` — decorative elements should never push content on small screens.

**Never stack the same category twice on the same page.** Blob on the hero + blob on services = wallpaper. Mix: blob hero → line grid services → grain testimonials.
