# Color System

This file explains how to derive a complete `tokens.css` from an archetype's color parameters. The archetypes define *constraints* — you derive the actual HSL values from the brand adjectives and business context.

---

## Derivation process

### 1. Pick the brand hue

Read the archetype's **Brand hue territory** (a range of degrees on the color wheel). Within that range, pick a specific hue using the adjectives:

- "warm, amber, golden" → pull toward higher end of a warm range (orange-yellows 30–50°)
- "cool, crisp, precise" → pull toward blues/teals (180–220°)
- "earthy, grounded" → settle mid-range in greens or terracottas
- "unexpected, distinctive" → pick the least common hue in the territory for that industry

Never default to hue 220 (generic blue) unless the territory specifically includes it and the adjectives support it.

### 2. Set saturation and lightness

Use the archetype's **Brand saturation** and **Brand lightness** ranges. Within those ranges:
- Strong, confident adjectives → push toward higher saturation
- Understated, refined adjectives → pull toward lower saturation
- Dark-base archetypes need higher lightness on the brand color to remain legible

### 3. Derive the neutral hue

Most archetypes specify a neutral hue strategy:
- **Warm neutrals**: neutral hue = brand hue ±15°, pulled toward 30–45°
- **Cool neutrals**: neutral hue = brand hue ±10°, pulled toward 210–225°
- **Pure gray**: neutral saturation = 0%, hue is irrelevant (Brutalist)
- **Match brand**: neutral hue within 20° of brand hue

Neutral saturation is almost always 6–16%. Higher saturation on neutrals looks like a mistake.

### 4. Build the surface colors

- **Light base**: bg = neutral-50 (slightly off-white, never pure `hsl(0 0% 100%)`), surface = pure white or slightly warmer
- **Dark base**: bg = very dark (lightness 5–9%), surface = slightly lighter than bg (lightness 9–13%)
- **Warm surface**: shift bg hue toward 30–45° and add 15–25% saturation for cream tones

### 5. Semantic overrides for dark-base themes

Dark-base archetypes (Luxury, Retro-Futuristic, Tech-Industrial, Art Deco, Dark/Moody) must override the semantic tokens. The neutral scale runs inverted — 50 is the darkest, 900 is the lightest — so the semantic aliases must be remapped:

```css
--color-text:       var(--color-neutral-800); /* near-white on dark */
--color-text-muted: var(--color-neutral-500);
--color-border:     var(--color-neutral-200); /* subtle on dark */
--color-bg:         hsl(H S% 7%);            /* very dark */
--color-surface:    hsl(H S% 11%);           /* slightly lighter */
```

---

## Dual-color pairing system

Use a second accent color (`--color-accent`) when the concept demands energy, contrast, or unexpectedness that a single brand color can't deliver. This is not decoration — it is a structural decision that affects hierarchy and identity.

### When to introduce a second accent

Introduce `--color-accent` when **two or more** of these are true:
- The brand adjectives include words like "energetic," "bold," "unexpected," "vivid," "playful," or "electric"
- The archetype is Brutalist, Playful/Toy-like, or Retro-Futuristic
- The concept sentence describes tension between two contrasting qualities
- The anti-adjectives rule out "safe" or "corporate" — meaning the palette must take a risk

Do NOT add a second accent for Editorial, Luxury, Minimal/Clean, or Coastal/Airy unless the concept specifically demands it. Those archetypes derive power from restraint.

### How to derive the accent hue

Three valid pairing methods — choose based on the emotional register:

| Method | Formula | Result | Use when |
|---|---|---|---|
| **Split-complementary** | brand hue ± 150° | High contrast, less tension than direct complement | Most cases — feels bold but resolved |
| **Triadic** | brand hue + 120° or − 120° | Vibrant, equal-energy feel | Playful, Retro-Futuristic, maximum energy |
| **Intuitive clash** | Pick a hue that shares the concept's emotional charge but occupies distant territory (>90° away) | Unexpected but purposeful | When split-comp or triadic feel too mechanical |

**Examples of valid pairings:**
- Orange (25°) + lime green (85°) — triadic, max energy, Playful/Brutalist
- Electric cyan (175°) + hot pink (320°) — split-complementary, Retro-Futuristic
- Burnt sienna (12°) + teal (175°) — intuitive clash, Editorial with unexpected tension
- Neon yellow (58°) + violet (268°) — triadic, Brutalist

**Saturation alignment rule:** The accent saturation must be within 15% of the brand saturation. Two vivid colors of equal saturation feel intentional. A vivid color paired with a muted one feels like an accident.

**Lightness alignment rule:** On light base — both accent and brand should be 38–55% lightness. On dark base — both should be 45–62%.

### Role distribution

Never let two accent colors compete equally for dominance. Assign roles before writing CSS:

| Role | Color | Usage |
|---|---|---|
| **Primary** | `--color-brand` | CTAs, key links, active states, dominant accent elements |
| **Secondary** | `--color-accent` | Highlights, tags, decorative elements, hover states on brand elements |
| **Background / field** | Neutrals | 60–70% of visible area — keeps the pairing readable |

The secondary accent should appear at roughly half the frequency of the primary. If they feel equal in weight, reduce the secondary's lightness by 8% or its usage by half.

### Token structure for dual-color palettes

Add these tokens immediately after the brand block:

```css
/* ── Accent (only when dual-color pairing is active) ── */
--color-accent:        hsl(AH AS% AL%);
--color-accent-hover:  hsl(AH AS% calc(AL% - 8%));
--color-accent-subtle: hsl(AH AS% [96% light / 10% dark]);
```

**Key:** AH = accent hue, AS = accent saturation, AL = accent lightness. Derive from the pairing method above.

---

## Complete tokens.css structure

Use this structure every time. Fill in the HSL values from the derivation above. The structure never changes — only the values do.

```css
:root {
  /* ── Brand ── */
  --color-brand:        hsl(H S% L%);
  --color-brand-hover:  hsl(H S% calc(L% - 8%));  /* darker for light-base, lighter for dark-base */
  --color-brand-subtle: hsl(H S% [96% light / 10% dark]);

  /* ── Neutral scale (10 steps) ── */
  /* Light base: 50=near-white → 900=near-black */
  /* Dark base: 50=near-black → 900=near-white (inverted) */
  --color-neutral-50:  hsl(NH NS% [97% light / 8% dark]);
  --color-neutral-100: hsl(NH NS% [93% light / 12% dark]);
  --color-neutral-200: hsl(NH NS% [85% light / 18% dark]);
  --color-neutral-300: hsl(NH NS% [72% light / 30% dark]);
  --color-neutral-400: hsl(NH NS% [56% light / 46% dark]);
  --color-neutral-500: hsl(NH NS% [44% light / 58% dark]);
  --color-neutral-600: hsl(NH NS% [32% light / 68% dark]);
  --color-neutral-700: hsl(NH NS% [22% light / 78% dark]);
  --color-neutral-800: hsl(NH NS% [14% light / 87% dark]);
  --color-neutral-900: hsl(NH NS% [8%  light / 95% dark]);

  /* ── Semantic surfaces ── */
  --color-bg:          [see above];
  --color-surface:     [see above];
  --color-text:        var(--color-neutral-800);
  --color-text-muted:  var(--color-neutral-500);
  --color-border:      var(--color-neutral-200);

  /* ── Status (keep consistent across all archetypes) ── */
  --color-success: hsl(142 70% 40%);
  --color-error:   hsl(  0 72% 50%);
  --color-warning: hsl( 38 92% 50%);

  /* ── Typography ── */
  --font-sans:  [body font family stack];
  --font-serif: [display font family stack, if serif];
  --font-mono:  'Courier New', monospace;

  --text-xs:   clamp(0.75rem,  1.5vw, 0.8125rem);
  --text-sm:   clamp(0.875rem, 2vw,   0.9375rem);
  --text-base: clamp(1rem,     2.5vw, 1.125rem);
  --text-lg:   clamp(1.125rem, 3vw,   1.25rem);
  --text-xl:   clamp(1.25rem,  3.5vw, 1.5rem);
  --text-2xl:  clamp(1.5rem,   4vw,   2rem);
  --text-3xl:  clamp(1.875rem, 5vw,   2.5rem);
  --text-4xl:  clamp(2.25rem,  6vw,   3.25rem);

  --font-normal:   400;
  --font-medium:   500;
  --font-semibold: 600;
  --font-bold:     700;

  --leading-tight:   1.2;
  --leading-snug:    1.35;
  --leading-normal:  1.6;
  --leading-relaxed: 1.75;

  --tracking-tight:  -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.05em;

  /* ── Spacing (8px base — do not change) ── */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* ── Layout ── */
  --container-max:     72rem;
  --container-padding: clamp(1rem, 5vw, 2rem);

  /* ── Borders (archetype-specific radius values) ── */
  --radius-sm:   [archetype value];
  --radius-md:   [archetype value];
  --radius-lg:   [archetype value];
  --radius-xl:   [archetype value];
  --radius-full: 9999px;
  --border:      [archetype border weight] solid var(--color-border);

  /* ── Shadows (archetype-specific style) ── */
  --shadow-sm: [archetype shadow];
  --shadow-md: [archetype shadow];
  --shadow-lg: [archetype shadow];

  /* ── Motion ── */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out:      cubic-bezier(0, 0, 0.2, 1);
  --ease-in:       cubic-bezier(0.4, 0, 1, 1);
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-slow: 350ms;
}
```

**Key:** H = brand hue, S = brand saturation, L = brand lightness, NH = neutral hue, NS = neutral saturation.

---

## How to make two same-archetype sites look different

Even within the same archetype, these choices compound to produce distinct results:

| Variable | Range of variation |
|---|---|
| Brand hue | Full territory (often 30–60° of freedom) |
| Brand saturation | ±15–20% within the archetype's range |
| Neutral hue | ±20° from brand hue (warm vs cool shift) |
| Neutral saturation | 6–16% (more saturated = more tinted, more personality) |
| Surface warmth | Pure white vs warm cream vs very slightly tinted |
| Shadow hue | Can use brand hue in shadow formula instead of neutral |
| Border weight | 1px vs 2px changes the entire feel |
| `--color-brand-subtle` | Wider tint range on dark-base themes (8–15%) |

Two Editorial sites can have a burnt-sienna brand on warm cream vs a slate-green brand on cool off-white — same archetype, completely different feel.
