# Creative Interactions & Hover Artistry

The difference between a forgettable site and an award-winning one is often felt, not seen — it's in the hover states, the cursor, the micro-responses. These patterns require minimal code but create an outsized sense of craft.

**All JS patterns must check `prefers-reduced-motion` and skip if set.**

---

## CSS-Only Interactions

### Magnetic-Feel Button (CSS Transform)

No JS. The button appears to attract toward a hover point using a scale + translate combination. Convincing without actual magnetic tracking.

```css
.btn--magnetic {
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease;
  position: relative;
}

.btn--magnetic:hover {
  transform: scale(1.06) translateY(-2px);
  box-shadow: 0 12px 32px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.35);
}

.btn--magnetic:active {
  transform: scale(0.97) translateY(0);
  transition-duration: 0.1s;
}
```

---

### Color Flood Fill (Clip-Path Hover)

Background floods from left to right on hover. Works on any block element.

```css
.flood-hover {
  position: relative;
  isolation: isolate;
  color: var(--color-text);
  transition: color 0.4s ease;
}

.flood-hover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-brand);
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.4s cubic-bezier(0.77, 0, 0.175, 1);
  z-index: -1;
}

.flood-hover:hover { color: var(--color-surface); }
.flood-hover:hover::before { clip-path: inset(0 0% 0 0); }
```

---

### Underline Draw-On

Link underline animates from left to right on hover. Cleaner than default underline.

```css
.link-draw {
  text-decoration: none;
  background-image: linear-gradient(var(--color-brand), var(--color-brand));
  background-repeat: no-repeat;
  background-size: 0% 2px;
  background-position: left bottom;
  transition: background-size 0.35s cubic-bezier(0.77, 0, 0.175, 1);
}

.link-draw:hover { background-size: 100% 2px; }
```

For hover-out animation in reverse:

```css
.link-draw-both {
  background-position: right bottom;
  transition: background-size 0.35s ease;
}

.link-draw-both:hover {
  background-size: 100% 2px;
  background-position: left bottom;
}
```

---

### Image Reveal on Link Hover (CSS only, fixed position)

A thumbnail that appears next to a hovered link. Uses `::after` with a CSS custom property for the image URL. Best on desktop only.

```css
.link--image-reveal {
  --preview-url: none; /* set via inline style */
  position: relative;
}

.link--image-reveal::after {
  content: '';
  position: fixed;
  width: 16rem;
  aspect-ratio: 4/3;
  background: var(--preview-url) center/cover no-repeat var(--color-surface);
  border-radius: var(--radius-md);
  opacity: 0;
  transform: scale(0.92) rotate(-2deg);
  transition:
    opacity 0.3s ease,
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  top: var(--cursor-y, 50%);
  left: var(--cursor-x, 50%);
  translate: 1rem -50%;
  z-index: 100;

  @media (max-width: 48rem) { display: none; }
}

.link--image-reveal:hover::after {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
```

Requires updating `--cursor-x` / `--cursor-y` on mousemove (see JS section).

---

### Grayscale-to-Color Image Reveal

Images start desaturated and bloom to full color on hover. Restrained and editorial.

```css
.img--desaturated {
  filter: grayscale(1) contrast(1.05);
  transition:
    filter 0.6s ease,
    transform 0.6s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.img--desaturated:hover,
.card:hover .img--desaturated {
  filter: grayscale(0) contrast(1);
  transform: scale(1.03);
}
```

---

### Card Tilt (CSS Perspective, No JS)

3D tilt sensation on hover using CSS perspective. Subtle but adds dimensionality.

```css
.card--tilt {
  perspective: 800px;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.card--tilt:hover {
  transform: perspective(800px) rotateX(-4deg) rotateY(4deg) scale(1.02);
}
```

---

## JavaScript Interactions

### True Magnetic Hover

Element physically moves toward the cursor within a defined radius. The gold standard for CTA buttons on premium sites.

```ts
// src/scripts/magnetic.ts
export function initMagnetic(selector = '[data-magnetic]') {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const strength = parseFloat(el.dataset.magneticStrength ?? '0.4');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      el.style.transition = 'transform 0.15s ease-out';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}
```

Usage in component:

```astro
<a href="/contact" class="btn btn--primary" data-magnetic data-magnetic-strength="0.35">
  Get in touch
</a>
```

---

### Custom Cursor

Replace the browser cursor with a branded dot that lags behind the pointer. Standard on Awwwards winners. Keep it minimal — a small filled circle is enough.

```ts
// src/scripts/cursor.ts
export function initCursor() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return; // skip touch devices

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Expand on hover over interactive elements
  document.querySelectorAll('a, button, [data-cursor-expand]').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--expanded'));
  });

  // RAF loop for smooth lag
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}
```

```css
/* Add to global CSS */
@media (hover: hover) {
  * { cursor: none; }

  .custom-cursor {
    width: 10px;
    height: 10px;
    background: var(--color-brand);
    border-radius: 50%;
    position: fixed;
    top: -5px;
    left: -5px;
    pointer-events: none;
    z-index: 9999;
    transition:
      width 0.3s ease,
      height 0.3s ease,
      background 0.3s ease,
      opacity 0.3s ease;
    mix-blend-mode: difference; /* optional: invert over light/dark areas */
  }

  .custom-cursor.cursor--expanded {
    width: 40px;
    height: 40px;
    top: -20px;
    left: -20px;
    opacity: 0.5;
  }
}
```

---

### CSS Variable Cursor Position (for image reveal)

Updates `--cursor-x` / `--cursor-y` on `:root` for CSS-driven cursor-following effects.

```ts
// src/scripts/cursor-pos.ts
export function trackCursorPosition() {
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
  });
}
```

---

### Card Tilt with JS (Precise)

More precise than CSS-only tilt — tracks exact cursor position within the card.

```ts
// src/scripts/tilt.ts
export function initTilt(selector = '[data-tilt]') {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll<HTMLElement>(selector).forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      const maxTilt = parseFloat(card.dataset.tiltMax ?? '8');

      card.style.transform = `
        perspective(600px)
        rotateX(${-y * maxTilt}deg)
        rotateY(${x * maxTilt}deg)
        scale(1.02)
      `;
      card.style.transition = 'transform 0.1s ease-out';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)';
    });
  });
}
```

Usage: `<article class="service-card" data-tilt data-tilt-max="6">`

---

### Staggered Menu Reveal

Navigation links animate in with a stagger — each item slides and fades after the previous. Use for full-screen mobile menus or dropdowns.

```ts
// src/scripts/menu.ts
import { gsap } from 'gsap';

export function animateMenuOpen(menuEl: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const items = menuEl.querySelectorAll('[data-menu-item]');

  gsap.from(items, {
    opacity: 0,
    x: -20,
    duration: 0.4,
    ease: 'power2.out',
    stagger: 0.06,
    clearProps: 'all',
  });
}
```

---

## Initializing in Astro

All interaction scripts should be initialized inside `astro:page-load` to handle view transitions:

```astro
<!-- In Base.astro or a layout component -->
<script>
  import { initMagnetic } from '../scripts/magnetic';
  import { initCursor } from '../scripts/cursor';
  import { trackCursorPosition } from '../scripts/cursor-pos';
  import { initTilt } from '../scripts/tilt';

  document.addEventListener('astro:page-load', () => {
    initMagnetic();
    initCursor();
    trackCursorPosition();
    initTilt();
  });
</script>
```

---

## Archetype Recommendations

| Interaction | Best archetypes | Avoid for |
|---|---|---|
| Custom cursor | Luxury, Dark/Moody, Editorial, Retro-Futuristic | Organic/Natural, Soft/Pastel |
| Magnetic buttons | Luxury, Minimal/Clean, Dark/Moody | Playful (use bounce instead) |
| Color flood fill | Brutalist, Editorial, Tech-Industrial | Organic/Natural (too harsh) |
| Card tilt | Any with cards | Editorial (too playful) |
| Grayscale-to-color | Editorial, Luxury, Minimal | Coastal/Airy (already colorful) |
| Image reveal on hover | Editorial, Luxury, Art Deco | Mobile-first sites |
| Underline draw-on | Minimal, Editorial, Luxury | Playful (too restrained) |
