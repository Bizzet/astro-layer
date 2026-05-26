---
name: animate
description: Use when adding animations or motion effects to sections or components.
  Defaults to pure CSS keyframes and scroll-driven animations. Uses GSAP only when
  explicitly requested or when timeline complexity requires it.
paths:
  - src/**
---

# animate

Adds animations to sections and components. Always respects `prefers-reduced-motion`.

**Default path:** pure CSS keyframes + scroll-driven animations — no install, no JS required.
**GSAP path:** explicit opt-in only, for timeline sequences, counters, or stagger effects on JS-rendered content that CSS can't handle cleanly.

## Decision Rule

Use **CSS** for:
- Page-load entrance animations
- Scroll-triggered fade/slide (via `animation-timeline: view()`)
- Hover and focus effects
- nth-child stagger via `animation-delay`

Use **GSAP** only when the user explicitly asks, or when:
- Complex multi-step timeline sequences are required
- Animated counters (`data-count`) are needed
- Stagger applies to JS-rendered content (dynamic lists)
- Scroll scrubbing or element pinning is required

## CSS Animations (Default)

No install needed. Add to the component's `<style>` block or `src/styles/global.css`.

**Always include a reduced-motion block:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Fade-in on scroll (scroll-driven):**
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

**Entrance slide-up (page load):**
```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(2rem); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-content {
  animation: slideUp 0.6s ease-out both;
}
```

**Stagger via nth-child:**
```css
.stagger-grid > * {
  animation: fadeInUp 0.5s ease-out both;
}
.stagger-grid > *:nth-child(1) { animation-delay:   0ms; }
.stagger-grid > *:nth-child(2) { animation-delay: 100ms; }
.stagger-grid > *:nth-child(3) { animation-delay: 200ms; }
.stagger-grid > *:nth-child(4) { animation-delay: 300ms; }
```

## GSAP Animations (Advanced — Explicit Opt-in Only)

Use when the user asks for GSAP, or when CSS genuinely can't handle the complexity.

**First use:** install GSAP and create `src/scripts/animations.ts`:
```bash
npm install gsap
```

**Always guard with reduced-motion check:**
```ts
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
```

**Entrance animation:**
```ts
gsap.from(el, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out',
  scrollTrigger: { trigger: el, start: 'top 80%' }
});
```

**Stagger for grids:**
```ts
gsap.from(cards, { opacity: 0, y: 20, duration: 0.5, stagger: 0.1,
  scrollTrigger: { trigger: container, start: 'top 75%' }
});
```

**Counter for stats:**
```ts
const obj = { val: 0 };
gsap.to(obj, { val: targetNumber, duration: 1.5,
  onUpdate: () => { el.textContent = Math.round(obj.val).toString(); },
  scrollTrigger: { trigger: el, start: 'top 80%' }
});
```

## View Transitions Integration (GSAP)

Re-initialize ScrollTrigger after each page transition:
```ts
document.addEventListener('astro:page-load', () => {
  ScrollTrigger.refresh();
  initAnimations();
});
```

## Reference

See `references/animation-patterns.md` for complete CSS patterns, full GSAP `animations.ts` scaffold, and View Transitions integration.
