# Typography Composition

Font selection is table stakes. This is about how type is *used* — scale, weight contrast, tracking, spatial risk. Award-worthy sites treat type as architecture.

---

## The Core Principle: Extremes, Not Middle

Generic design lives at medium scale, medium weight, medium tracking. Award-worthy design lives at extremes and commits to the contrast between them.

**Two viable systems:**

| System | Display | Body | Contrast created |
|---|---|---|---|
| **Giant / Tiny** | 12–20vw, weight 700–900 | 0.9–1rem, weight 400 | Scale creates drama |
| **Thin / Dense** | 100–200 weight, 6–10vw | 400 weight, normal | Weight contrast creates tension |

Never choose the middle: medium display at medium weight is the most forgettable configuration.

---

## Display Scale Reference

```css
/* Minimal expression — typography IS the hero */
font-size: clamp(5rem, 15vw, 12rem);

/* Bold statement — fills the viewport */
font-size: clamp(4rem, 12vw, 9rem);

/* Editorial weight — commands without overwhelming */
font-size: clamp(3rem, 8vw, 6rem);

/* Section headline — clearly dominant */
font-size: clamp(2.5rem, 5vw, 4rem);
```

Rule: a Hero `h1` should never be smaller than `clamp(3rem, 8vw, 6rem)`. If it is, it lacks ambition.

---

## Tracking (Letter-Spacing) Rules

Tracking has personality — use it deliberately, not as an afterthought.

| Weight | Tracking | Effect |
|---|---|---|
| 800–900 (heavy) | `-0.03em` to `-0.06em` | Letterforms lock together — power, compression |
| 400–500 (normal) | `0` to `0.01em` | Default — neutral, invisible |
| 200–300 (light) | `0.04em` to `0.08em` | Open, refined, premium |
| All-caps labels (any weight) | `0.1em` to `0.2em` | Deliberate, architectural |

**Never track a heavy display font positively.** It breaks the letterform relationship and looks like a mistake.

**Always track all-caps.** Capital letters are designed for mixed case — spaced up they read as intentional, not uppercase-by-default.

---

## Weight Contrast Systems

A site with only one weight register is flat. Design a contrast pair for every key composition.

```
Pattern A — Giant/Thin
  h1: weight 100–200, scale 10–15vw
  p: weight 400, scale 1rem
  Effect: architectural elegance, luxury

Pattern B — Heavy/Light
  h1: weight 800–900, scale 8–12vw, tracking -0.04em
  p: weight 300, scale 1.1rem
  Effect: editorial confidence, directness

Pattern C — Mixed in same heading
  .headline-thin { font-weight: 200; display: block; }
  .headline-bold { font-weight: 900; display: block; }
  Effect: dynamic tension, stops the eye

Pattern D — Tiny label + Giant value
  .label { font-size: 0.65rem; font-weight: 400; letter-spacing: 0.15em; text-transform: uppercase; }
  .value { font-size: clamp(4rem, 10vw, 8rem); font-weight: 700; }
  Effect: data-forward, magazine-editorial
```

---

## Type Risk Moves

These are the choices that make a site memorable. Each one requires a deliberate decision to apply — they don't happen by default.

### 1. Overflow / Bleed
Let display text break out of its container.

```css
.hero-headline {
  font-size: clamp(5rem, 16vw, 13rem);
  white-space: nowrap;
  overflow: visible; /* allow it to bleed */
  margin-left: -0.02em; /* optical alignment at scale */
}
```
*When to use:* Brutalist, Editorial, Minimal/Clean. Any site that wants to feel spatial and confident.

### 2. Vertical / Rotated Label
Section labels or decorative text rotated 90°.

```css
.section-label {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
```
*When to use:* Editorial, Art Deco, Luxury/Refined, Minimal/Clean.

### 3. Background-Clip Text
Letterforms filled with an image or gradient.

```css
.clipped-headline {
  background: url('/your-texture.jpg') center / cover;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: clamp(5rem, 14vw, 11rem);
  font-weight: 900;
}
```
*When to use:* Dark/Moody, Organic/Natural (texture), Retro-Futuristic (gradient).

### 4. Letterform as Decoration
A single enormous letter used as a background element — not legible as content, read as texture.

```css
.decorative-letter {
  position: absolute;
  font-size: clamp(12rem, 35vw, 28rem);
  font-weight: 900;
  color: var(--color-brand-subtle);
  line-height: 0.8;
  user-select: none;
  pointer-events: none;
  z-index: 0;
}
```
*When to use:* Brutalist, Editorial, Minimal/Clean, Soft/Pastel.

### 5. Stacked Two-Weight Headline
Display heading where each line alternates weight.

```css
.headline-line-a { font-weight: 200; font-style: italic; }
.headline-line-b { font-weight: 900; }
```
*When to use:* Editorial, Luxury, Dark/Moody.

### 6. Tiny Caption Grid
Ultra-small text at wide tracking used as primary labels — makes the site feel like a museum or lookbook.

```css
.caption {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  line-height: 1.6;
}
```
*When to use:* Luxury/Refined, Editorial, Minimal/Clean, Art Deco.

---

## Archetype Typography Guidance

| Archetype | Display approach | Risk move to apply |
|---|---|---|
| Editorial | Heavy weight + tight tracking, ≥ 10vw | Overflow/bleed on hero h1; vertical section labels |
| Brutalist | ALL CAPS, widest tracking, full viewport | Bleed past container; letterform decoration |
| Organic/Natural | Light-to-medium italic, organic flow | Stacked alternating weight; caption grid for ingredients/details |
| Luxury/Refined | Ultra-thin (100–200), large scale | Thin giant + micro label (Pattern D); background-clip on key word |
| Retro-Futuristic | Monospace or geometric, tracking 0.08em | Background-clip with neon gradient; vertical scan labels |
| Soft/Pastel | Rounded, medium-heavy, friendly scale | Decorative letterform (large, pastel); no extremes — gentle scale |
| Tech-Industrial | Geometric sans, tight, functional | Caption grid for all data labels; terminal cursor as micro-animation |
| Art Deco | Wide-tracked all-caps, light weight | Vertical labels; caption grid; gold color on key word only |
| Playful | Maximum weight, rounded, large | Stacked heavy lines + color per line; no risk moves needed — scale IS the move |
| Minimal/Clean | Ultra-thin at enormous scale OR tiny at maximum restraint | Single word at 20vw; everything else disappears |
| Coastal/Airy | Light weight, relaxed, spacious | Caption grid for location/amenity labels; nothing at extreme scale |
| Dark/Moody | Dramatic contrast: thin display OR heavy display | Background-clip on hero word; atmospheric text-shadow glow |

---

## What Not to Do

- **Medium size, medium weight** — the most forgettable combination in existence. Choose an extreme.
- **Positive tracking on heavy display** — breaks letterform rhythm. Only negative or zero tracking on 700+.
- **System fonts at large scale** — `system-ui` has no personality at 12vw. The display font choice is why you chose it — use it at a size where it matters.
- **Every heading the same tracking** — tracking is a design signal. Vary it intentionally across heading levels.
- **Line-height 1.5 on display text** — display type needs tighter leading. Use `line-height: 0.9–1.1` for headlines above 4rem.
