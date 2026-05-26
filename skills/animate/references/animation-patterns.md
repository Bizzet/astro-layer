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

### Scroll Storytelling — Pinned Section with Scrub

A section pins to the viewport while the user scrolls through it. Content transforms — text changes, images swap, progress fills — fully synced to scroll position. The signature pattern of premium landing pages.

```ts
// src/scripts/scroll-story.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollStory() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const section = document.querySelector<HTMLElement>('.scroll-story');
  if (!section) return;

  const steps  = gsap.utils.toArray<HTMLElement>('.story-step');
  const visuals = gsap.utils.toArray<HTMLElement>('.story-visual');

  // Pin the section for the full scroll-through
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: `+=${steps.length * 100}%`,
    pin: true,
    pinSpacing: true,
  });

  // Each step cross-fades in as user scrolls to that segment
  steps.forEach((step, i) => {
    const progress = i / steps.length;
    const nextProgress = (i + 1) / steps.length;

    ScrollTrigger.create({
      trigger: section,
      start: `top+=${progress * steps.length * 100}% top`,
      end: `top+=${nextProgress * steps.length * 100}% top`,
      onEnter()      { activateStep(i, steps, visuals); },
      onEnterBack()  { activateStep(i, steps, visuals); },
    });
  });

  activateStep(0, steps, visuals);
}

function activateStep(
  index: number,
  steps: HTMLElement[],
  visuals: HTMLElement[]
) {
  steps.forEach((s, i) => s.classList.toggle('is-active', i === index));
  visuals.forEach((v, i) => {
    gsap.to(v, {
      opacity: i === index ? 1 : 0,
      scale:   i === index ? 1 : 0.96,
      duration: 0.5,
      ease: 'power2.out',
    });
  });
}
```

HTML structure:

```astro
<section class="scroll-story" aria-label="How it works">
  <div class="story-layout">

    <!-- Left: text steps -->
    <div class="story-steps">
      {steps.map((step, i) => (
        <div class={`story-step ${i === 0 ? 'is-active' : ''}`}>
          <span class="story-step-num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{step.headline}</h3>
          <p>{step.body}</p>
        </div>
      ))}
    </div>

    <!-- Right: visuals swap -->
    <div class="story-visuals" aria-hidden="true">
      {steps.map((step, i) => (
        <div class={`story-visual ${i === 0 ? 'is-visible' : ''}`}>
          <Image src={step.image} alt="" width={700} height={500} />
        </div>
      ))}
    </div>

  </div>
</section>
```

```css
.scroll-story {
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.story-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
  width: 100%;
  max-width: var(--container-max);
  padding-inline: var(--container-padding);
}

.story-step {
  opacity: 0.3;
  transform: translateX(-1rem);
  transition: opacity 0.5s ease, transform 0.5s ease;
  padding-block: var(--space-6);
}

.story-step.is-active {
  opacity: 1;
  transform: translateX(0);
}

.story-step-num {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--color-brand);
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--space-3);
}

.story-visuals { position: relative; aspect-ratio: 7/5; }

.story-visual {
  position: absolute;
  inset: 0;
  opacity: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.story-visual img { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 48rem) {
  .story-layout { grid-template-columns: 1fr; }
  .story-visuals { display: none; }
}
```

---

### Horizontal Scroll Section (Pinned)

A section pins and content scrolls horizontally. Used for timelines, case study carousels, or feature showcases.

```ts
export function initHorizontalScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const track = document.querySelector<HTMLElement>('.h-scroll-track');
  if (!track) return;

  const totalWidth = track.scrollWidth - track.offsetWidth;

  gsap.to(track, {
    x: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '.h-scroll-section',
      start: 'top top',
      end: `+=${totalWidth}`,
      pin: true,
      scrub: 1,
    },
  });
}
```

```astro
<section class="h-scroll-section">
  <div class="h-scroll-track">
    {items.map((item) => (
      <article class="h-scroll-card">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </article>
    ))}
  </div>
</section>
```

```css
.h-scroll-section {
  overflow: hidden;
  height: 100vh;
}

.h-scroll-track {
  display: flex;
  gap: var(--space-8);
  width: max-content;
  padding-inline: var(--container-padding);
  align-items: center;
  height: 100%;
}

.h-scroll-card {
  width: min(28rem, 80vw);
  flex-shrink: 0;
  padding: var(--space-8);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: var(--border);
}
```

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
