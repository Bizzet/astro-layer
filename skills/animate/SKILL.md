---
name: animate
description: Use when adding scroll-triggered entrance animations or motion effects
  to sections or components.
paths:
  - src/**
---

# animate

Adds GSAP scroll-triggered animations to sections and components. Always respects `prefers-reduced-motion`.

## First Invocation

On first use, this skill:
1. Installs `gsap`: `npm install gsap`
2. Creates `src/scripts/animations.ts` with base animation setup

## Requirements

**Always check `prefers-reduced-motion` first:**

```ts
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
```

No animation runs if the user has requested reduced motion.

## Standard Patterns

**Entrance animation (on element entering viewport):**
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

## View Transitions Integration

Re-initialize ScrollTrigger after each page transition:
```ts
document.addEventListener('astro:page-load', () => {
  ScrollTrigger.refresh();
  initAnimations();
});
```

## Reference

See `references/animation-patterns.md` for complete `animations.ts` scaffold, all patterns, and View Transitions integration.
