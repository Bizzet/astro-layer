# Animation Patterns

## Setup (First Invocation)

Install GSAP and create the animation script:

```bash
npm install gsap
```

Create `src/scripts/animations.ts`.

---

## Reduced Motion Guard — Always Check First

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

## Entrance Animations

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

## Scroll-Triggered Reveals

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

## Stagger for Grids

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

## Counter for Stats

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

## View Transition Hook

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

## Usage in Astro Components

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

---

## CSS-Only Alternatives (Prefer These When Possible)

Some animations don't need GSAP:

```css
/* Fade-in on load (no JS) */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(1rem); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-content {
  animation: fadeIn 0.6s var(--ease-out) both;
}

@media (prefers-reduced-motion: reduce) {
  .hero-content { animation: none; }
}
```

**Use CSS animations for:** page load, hover effects, focus indicators
**Use GSAP for:** scroll-triggered, staggered, counter, complex sequences
