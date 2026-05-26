# Animation Patterns

**Default:** pure CSS keyframes. No install, no JS.
**Advanced:** GSAP — only when explicitly requested or when CSS can't handle the complexity.

---

## CSS Animations (Default)

No install. Add to a component's `<style>` block or `src/styles/global.css`.

### Reduced-Motion Block

Always include in global CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Fade-In on Scroll (Scroll-Driven Animation)

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(1.5rem); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fadeInUp 0.6s ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
```

Add `class="reveal"` to any element that should animate when it enters the viewport.

> **Browser support:** `animation-timeline: view()` is Chrome 115+, Firefox 114+, Safari 18+. For older browsers, use the GSAP scroll reveal below.

### Entrance Slide-Up (Page Load)

```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(2rem); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-content {
  animation: slideUp 0.6s ease-out both;
}
```

### Stagger via animation-delay (nth-child)

```css
.stagger-grid > * {
  animation: fadeInUp 0.5s ease-out both;
}

.stagger-grid > *:nth-child(1) { animation-delay:   0ms; }
.stagger-grid > *:nth-child(2) { animation-delay: 100ms; }
.stagger-grid > *:nth-child(3) { animation-delay: 200ms; }
.stagger-grid > *:nth-child(4) { animation-delay: 300ms; }
.stagger-grid > *:nth-child(5) { animation-delay: 400ms; }
.stagger-grid > *:nth-child(6) { animation-delay: 500ms; }
```

Add `class="stagger-grid"` to any grid container.

### Reduced-Motion Override (Component Level)

```css
.hero-content {
  animation: slideUp 0.6s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .hero-content { animation: none; }
}
```

---

## Advanced — GSAP (Explicit Opt-in Only)

Use GSAP when the user explicitly asks for it, or when the animation requires timeline sequencing, animated counters, or stagger on JS-rendered content that CSS can't handle cleanly.

### Setup (First Use)

Install GSAP and create the animation script:

```bash
npm install gsap
```

Create `src/scripts/animations.ts`.

---

### Reduced Motion Guard — Always Check First

```ts
// src/scripts/animations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
  if (prefersReducedMotion) return;  // respect user preference — always
  initEntrances();
  initScrollReveals();
}
```

---

### Entrance Animations

```ts
function initEntrances() {
  gsap.from('.hero-content', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power2.out',
    delay: 0.1,
  });
}
```

---

### Scroll-Triggered Reveals

```ts
function initScrollReveals() {
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });
  });
}
```

Add `class="reveal"` to any element you want to animate on scroll.

---

### Stagger for Grids

```ts
function initStaggerGrids() {
  gsap.utils.toArray<HTMLElement>('.stagger-grid').forEach((grid) => {
    const items = grid.querySelectorAll(':scope > *');
    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        once: true,
      },
    });
  });
}
```

Add `class="stagger-grid"` to any grid container.

---

### Counter for Stats

```ts
function initCounters() {
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count ?? '0', 10);
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power1.out',
      onUpdate() {
        el.textContent = Math.round(obj.val).toLocaleString();
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}
```

Usage in component: `<span data-count="150">0</span>`

---

### View Transition Hook

GSAP ScrollTrigger needs to be re-initialized after Astro page transitions:

```ts
// In src/scripts/animations.ts or in a component's <script>
document.addEventListener('astro:page-load', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Kill existing ScrollTrigger instances before re-init
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  initAnimations();
});
```

---

### Usage in Astro Components

```astro
---
// In any component that needs animations
---
<section class="services">
  <ul role="list" class="stagger-grid services-grid">
    {services.map((s) => (
      <li class="service-card"><!-- ... --></li>
    ))}
  </ul>
</section>

<script>
  import { initAnimations } from '../scripts/animations';
  initAnimations();
</script>
```
