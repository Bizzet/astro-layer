# Kinetic Typography Patterns

Text that moves is the single biggest visual differentiator between an average site and an award-winning one. Use these patterns to give headlines, subheadings, and pull quotes a physical presence.

**Always include reduced-motion guard.** Every pattern here must be wrapped or have a `prefers-reduced-motion` override.

---

## CSS-Only Patterns

No JS required. Wrap text in `<span>` elements at build time (Astro frontmatter or a helper).

---

### Word-by-Word Stagger Reveal

Each word fades and rises into position with cascading delay. Strong for hero headlines.

```astro
---
// Helper: split headline into word spans
const words = headline.split(' ');
---
<h1 class="kinetic-headline" aria-label={headline}>
  {words.map((word, i) => (
    <span class="word-wrap" aria-hidden="true">
      <span class="word" style={`--i: ${i}`}>{word}</span>
    </span>
  ))}
</h1>
```

```css
.kinetic-headline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
}

.word-wrap {
  overflow: hidden;
  display: inline-block;
}

.word {
  display: inline-block;
  animation: word-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--i) * 80ms);
}

@keyframes word-rise {
  from { opacity: 0; transform: translateY(110%); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .word { animation: none; }
}
```

---

### Clip-Path Text Wipe (Line Reveal)

Text is revealed by an expanding clip-path — looks like a curtain drawing back. More dramatic than fade.

```css
.line-reveal {
  animation: clip-wipe 0.8s cubic-bezier(0.77, 0, 0.175, 1) both;
}

@keyframes clip-wipe {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}

@media (prefers-reduced-motion: reduce) {
  .line-reveal { animation: none; clip-path: none; }
}
```

Apply `class="line-reveal"` with `animation-delay` offsets for multiple lines.

---

### Oversized Scroll Text (Parallax Headline)

A headline that moves slower than the page scroll — creates depth and separates foreground from background. Pure CSS using `animation-timeline: scroll()`.

```css
.scroll-headline {
  font-size: clamp(4rem, 15vw, 12rem);
  line-height: 0.9;
  font-weight: var(--font-bold);
  letter-spacing: var(--tracking-tight);
  transform: translateY(var(--parallax-y, 0));
  animation: parallax-drift linear both;
  animation-timeline: scroll(root);
  animation-range: 0% 50%;
}

@keyframes parallax-drift {
  from { --parallax-y: -3rem; }
  to   { --parallax-y: 3rem; }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-headline { animation: none; }
}
```

---

### Variable Font Weight Morph

If the font supports `wght` axis (Fraunces, Recursive, etc.), animate between weights on load or scroll. Creates a living, breathing headline.

```css
@supports (font-variation-settings: normal) {
  .morph-headline {
    font-variation-settings: 'wght' 100;
    animation: weight-morph 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
  }

  @keyframes weight-morph {
    from { font-variation-settings: 'wght' 100; opacity: 0; }
    to   { font-variation-settings: 'wght' 800; opacity: 1; }
  }

  /* Scroll-driven weight pulse */
  .weight-scroll {
    animation: weight-scroll-pulse linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 50%;
  }

  @keyframes weight-scroll-pulse {
    from { font-variation-settings: 'wght' 200; }
    to   { font-variation-settings: 'wght' 900; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .morph-headline,
  .weight-scroll { animation: none; font-variation-settings: 'wght' 700; }
}
```

---

### Blurred Focus-In (Soft Emerge)

Text starts blurred and in focus. More atmospheric than a simple fade — good for Dark/Moody and Luxury archetypes.

```css
.focus-in {
  animation: focus-emerge 0.9s ease-out both;
}

@keyframes focus-emerge {
  from {
    opacity: 0;
    filter: blur(8px);
    letter-spacing: 0.3em;
  }
  to {
    opacity: 1;
    filter: blur(0);
    letter-spacing: var(--tracking-tight);
  }
}

@media (prefers-reduced-motion: reduce) {
  .focus-in { animation: none; }
}
```

---

### Staggered Character Reveal (Scramble-style, CSS)

Wrap each character in a `<span>`. Works for short words or labels — not long sentences.

```astro
---
const chars = label.split('');
---
<span class="char-reveal" aria-label={label}>
  {chars.map((char, i) => (
    <span class="char" style={`--i: ${i}`} aria-hidden="true">
      {char === ' ' ? ' ' : char}
    </span>
  ))}
</span>
```

```css
.char {
  display: inline-block;
  animation: char-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: calc(var(--i) * 40ms);
}

@keyframes char-pop {
  from { opacity: 0; transform: translateY(0.5em) scale(0.8); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .char { animation: none; }
}
```

---

## GSAP Patterns (Explicit Opt-in)

Use when CSS can't handle complexity: scroll-synced reveals, line-by-line splits on dynamic content, or coordinated multi-element sequences.

### Requires: gsap (no SplitText — use manual splitting instead)

```bash
npm install gsap
```

---

### Line-by-Line Reveal on Scroll

Splits a paragraph into `<div>` wrappers per line and reveals each as you scroll. Works with static content — wrap lines at render time.

```ts
// src/scripts/kinetic.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTextReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Each .reveal-lines element: wrap direct children or <br>-separated spans
  gsap.utils.toArray<HTMLElement>('.reveal-lines').forEach((el) => {
    const lines = el.querySelectorAll<HTMLElement>('.line');

    gsap.from(lines, {
      opacity: 0,
      y: '110%',
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });
  });
}
```

Usage in component:

```astro
<h2 class="reveal-lines" aria-label={headline}>
  <div class="line-wrap"><span class="line">First line of text</span></div>
  <div class="line-wrap"><span class="line">second line here</span></div>
</h2>
```

```css
.line-wrap { overflow: hidden; }
.line { display: block; }
```

---

### Headline Sequence (Orchestrated Entrance)

Coordinates headline, subheadline, eyebrow, and CTA with a precise timeline. Every element has its own role in the entrance story.

```ts
export function initHeroSequence() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-eyebrow',  { opacity: 0, y: 20, duration: 0.5 })
    .from('.hero-headline .line', {
      opacity: 0,
      y: '110%',
      duration: 0.75,
      stagger: 0.1,
    }, '-=0.2')
    .from('.hero-sub',      { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
    .from('.hero-cta > *',  { opacity: 0, y: 15, duration: 0.4, stagger: 0.1 }, '-=0.2');
}
```

---

### Scroll-Scrubbed Typewriter

Text writes itself as the user scrolls — fully scrubbed to scroll position. High impact for pull quotes or statistics.

```ts
export function initTypewriterScrub(selector: string) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
    const text = el.textContent ?? '';
    el.textContent = '';

    const obj = { progress: 0 };

    gsap.to(obj, {
      progress: text.length,
      ease: 'none',
      onUpdate() {
        el.textContent = text.slice(0, Math.round(obj.progress));
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 1,
      },
    });
  });
}
```

Usage: `<p class="typewriter" aria-label="Full text for screen readers">Full text here</p>`

---

## When to Use Each

| Pattern | Archetype fit | Complexity |
|---|---|---|
| Word-by-word stagger | Any — universal | CSS only |
| Clip-path wipe | Editorial, Brutalist, Minimal | CSS only |
| Scroll parallax headline | Luxury, Dark/Moody, Editorial | CSS only |
| Variable font morph | Any with variable font | CSS only |
| Focus-in blur | Luxury, Dark/Moody | CSS only |
| Character pop | Playful, Retro-Futuristic, Tech | CSS only |
| Line reveal (GSAP) | Any complex hero | GSAP |
| Hero sequence (GSAP) | Premium hero, award sites | GSAP |
| Typewriter scrub | Pull quotes, stats sections | GSAP |

**Rule:** prefer CSS-only. Only reach for GSAP when the animation must be scrubbed, sequenced with sub-100ms precision, or applied to dynamically rendered content.
