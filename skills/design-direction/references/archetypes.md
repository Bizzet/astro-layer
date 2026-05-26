# Aesthetic Archetypes

12 named directions. Each defines **color parameter constraints** — not example values. Derive actual HSL values from the brand adjectives using `color-system.md`. Two sites with the same archetype must produce different colors.

---

## 1. Editorial

**Character:** Magazine/newspaper gravitas. Typography IS the design. Tension from hierarchy and composition, not decoration.

**Best for:** Publishers, consultants, law firms, agencies, serious brands, cultural institutions.

**Color parameters:**
- Base: **light**
- Brand hue territory: anything except mid-blue (180–240°) — unexpected pops work: burnt sienna (12°), vermillion (5°), deep teal (172°), forest (88°), ochre (40°)
- Brand saturation: 65–85% — must contrast sharply against warm neutrals
- Brand lightness: 40–55%
- Neutral hue: warm, 25–40° — pulled toward the surface warmth, not the brand hue
- Neutral saturation: 8–15%
- Surface: warm off-white — `hsl(30–40° 15–20% 96–98%)`, never pure white
- Brand-subtle: very light tint, `hsl(brandH brandS% 95–97%)`
- **Accent pairing (optional):** Editorial can use a second accent when the concept demands unexpected tension — e.g., a bold editorial brand that pairs burnt sienna (12°) with teal (172°) for a "magazine cover" energy. Use the intuitive clash method. The accent appears only on secondary interactive elements and pull-quote borders — never on the primary CTA. If the concept is restrained or serious, omit the accent entirely.

**Radius:** Sharp — `--radius-sm: 2px; --radius-md: 3px; --radius-lg: 4px;` — almost none.

**Shadow:** Subtle or none. Let negative space do the work.

**Font tone constraint** (select from `font-catalog.md`):
- Display: high-contrast serif, humanist serif, or condensed display sans — something that commands the page at large sizes
- Body: humanist serif or neutral geometric sans — must be readable at 1rem
- Avoid: rounded/playful fonts, monospace, anything that feels tech or casual

**Heading style:** Tight tracking (`--tracking-tight`), heavy weight for display, lighter for subheads. Mix weights dramatically.

**Layout tendency:** Asymmetric. Columns of different widths. Text that breaks into the gutter. Section titles as small-caps sidebars.

**Hero variant:** Centered Editorial or Split.

**Atmosphere:** Newsprint warmth. Strong horizontal rules. Headlines that feel like ink on paper. No rounded cards — use ruled borders instead of box shadows.

**Signature Moves — at least 2 must appear in every Editorial site:**
1. Hero `h1` at `clamp(3.5rem, 12vw, 9rem)` or larger — not content typography, architecture. Tight tracking, heavy weight.
2. Section identifier displayed as a small-caps label rotated 90° in a narrow column left of the content, or as a 2-digit number in a contrasting weight — separates sections without using visual decoration.
3. One italic pull-quote at `clamp(1.6rem, 3vw, 2.4rem)` that spans asymmetrically — left-offset, wider than the body column, with a thin left-border rule in the brand color.

**Anti-patterns:** Rounded pill buttons, purple gradient CTAs, icon-in-circle service cards, anything that looks "SaaS."

---

## 2. Brutalist

**Character:** Raw structure exposed. Borders as elements. Functional to the point of confrontation.

**Best for:** Creative agencies, artists, studios, tech-forward brands, anything that wants to stand out hard.

**Color parameters:**
- Base: **light** (high contrast white) — or fully dark (pure black), but never grey
- Brand hue territory: ANY hue — this is the one accent against a neutral field. Neon yellow (55–65°), hot pink (320–335°), electric lime (75–90°), cyan (175–190°), orange (20–30°). Pick what the adjectives support.
- Brand saturation: 90–100% — no compromises, must be electric
- Brand lightness: 45–55%
- Neutral hue: pure gray — saturation 0%. The brand color is the only color.
- **Accent pairing:** Brutalist supports — and often benefits from — a second electric accent derived via triadic or split-complementary method (see `color-system.md`). The accent must be equally saturated (90–100%) and appear at roughly half the frequency of the brand. The two colors become the entire visual language against the pure gray/white field.
- Surface: `hsl(0 0% 100%)` or `hsl(0 0% 4%)` — no tinting, no warmth
- Border: 2px solid (heavier than default)

**Radius:** Zero. `--radius-sm: 0; --radius-md: 0; --radius-lg: 0; --radius-xl: 0;`

**Shadow:** Hard offset, not blurred — `--shadow-sm: 3px 3px 0 hsl(0 0% 0%); --shadow-md: 5px 5px 0 hsl(0 0% 0%);`

**Border:** Heavier — `--border: 2px solid var(--color-neutral-900);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: monospace, condensed display sans, or heavy grotesque — raw and unapologetic
- Body: monospace or practical grotesque — functional, zero decoration
- Avoid: elegant serifs, rounded fonts, anything that reads as "beautiful" or "refined"

**Heading style:** ALL CAPS, very wide tracking (`--tracking-wide: 0.12em`), heavy weight.

**Layout tendency:** Exposed grid, elements that intentionally break alignment, oversized type.

**Hero variant:** Fullscreen Cinematic (text only, high contrast) or Centered Editorial.

**Atmosphere:** No decoration — structure IS the decoration. Thick borders. Stark contrast. Text at unexpected scales.

**Signature Moves — at least 2 must appear in every Brutalist site:**
1. At least one heading so large it presses against or bleeds past the container: `white-space: nowrap; overflow: visible; font-size: clamp(4rem, 14vw, 11rem)` — the overflow IS the statement.
2. Hard-offset box shadows on featured cards and interactive elements: `5px 5px 0 hsl(0 0% 0%)` — never blurred, never colored, always black offset.
3. At least one section where the layout grid is exposed as a design element: visible 1–2px borders on grid cells, or a structural line framework beneath content, or column markers in the background.

**Anti-patterns:** Rounded corners (any), soft shadows, gradient backgrounds, stock photos with soft bokeh.

---

## 3. Organic/Natural

**Character:** Earthy, handcrafted, alive. Imperfect beauty. Materials and textures suggested by CSS.

**Best for:** Food, wellness, agriculture, sustainability brands, artisan makers, natural products.

**Color parameters:**
- Base: **light**, warm
- Brand hue territory: earthy spectrum — greens (65–155°), earth tones (10–42°), sage (75–95°), terracotta (12–22°), amber (38–50°), dusty rose (340–358°). Driven by what the specific business grows, makes, or sells.
- Brand saturation: 22–48% — muted, not vivid; it should feel like a plant, not a logo
- Brand lightness: 33–50%
- Neutral hue: sandy warm, 30–45° — must feel like natural material (linen, sand, clay)
- Neutral saturation: 10–22% — more saturated than most archetypes; the warmth is structural
- Surface: cream/warm-white — `hsl(38–45° 18–25% 97–99%)`

**Radius:** Mixed — some zero, some very round. Use `--radius-xl: 2rem` on cards and `--radius-sm: 2px` on inputs.

**Shadow:** Soft and warm — `--shadow-sm: 0 2px 8px hsl(38 20% 20% / 0.08);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: humanist or expressive serif (quirky, warm, slightly imperfect) — something that feels grown from the earth
- Body: humanist sans or rounded sans — friendly and readable, not sterile
- Avoid: geometric precision fonts, monospace, condensed display sans, anything industrial

**Heading style:** Mixed weights, relaxed tracking. Italic display weights. Feels handwritten-adjacent.

**Layout tendency:** Flowing, not rigid. Sections with organic shapes via `border-radius` on containers. Generous whitespace.

**Hero variant:** Split (with real photo) or Fullscreen Cinematic with texture overlay.

**Atmosphere:** Warmth and texture. Use SVG noise filter as a subtle background texture. Soft gradients from warm white to cream. No sharp geometric decoration.

**Signature Moves — at least 2 must appear in every Organic/Natural site:**
1. SVG noise/grain filter applied as a background texture on at least one panel — the grain must be perceptible at normal viewing distance, not invisible: `<feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />` at 3–6% opacity overlay.
2. One hero or section statement in italic display weight at large scale — `clamp(2.8rem, 7vw, 5.5rem)`, `font-style: italic` — feels hand-set, organic, not mechanical.
3. At least one container that breaks the rectangle: high `border-radius` asymmetry on a hero image frame, or an SVG organic blob shape as a background element behind a content panel.

**Anti-patterns:** Hard box shadows, geometric icons, monospace fonts, dark tech aesthetics, anything that feels synthetic.

---

## 4. Luxury/Refined

**Character:** Restraint, precision, quiet confidence. Nothing wasted. Premium through absence.

**Best for:** High-end services, hospitality, jewelry, fashion, financial advisory, premium real estate.

**Color parameters:**
- Base: **dark** (preferred) — bg lightness 6–9%, surface lightness 10–13%
- Brand hue territory: precious metals — gold (38–50°), champagne (32–44°), platinum/silver (200–215° at low saturation 10–20%), antique bronze (28–38°). Avoid vivid colors entirely.
- Brand saturation: 55–75% for gold/champagne; 8–20% for platinum/silver
- Brand lightness: 55–68% (must be visible on dark background)
- Neutral hue: cool dark — 210–228°, or match brand hue for warm-dark variation
- Neutral saturation: 8–16%
- Surface: dark — `hsl(neutralH neutralS% 10–13%)`
- Brand-subtle: dark-tinted — `hsl(brandH brandS% 8–14%)`
- Remember: neutral scale is inverted — 50=darkest, 900=lightest

**Radius:** Sharp to medium — `--radius-sm: 1px; --radius-md: 2px; --radius-lg: 4px;`

**Shadow:** Subtle glow in brand color — `--shadow-sm: 0 0 20px hsl(44 70% 58% / 0.08);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: high-contrast serif at light weight (200–300), or Art Deco geometric sans — must feel considered and slow
- Body: elegant geometric sans or humanist sans — clean, never casual
- Avoid: rounded fonts, heavy grotesque, monospace, anything playful or technical

**Heading style:** Wide tracking on headings (`--tracking-wide: 0.06em`), light weight (300), uppercase for labels. Contrast between ultra-thin display and medium body.

**Layout tendency:** Generous whitespace. Sections with single focal point. Nothing crowded.

**Hero variant:** Fullscreen Cinematic or Centered Editorial.

**Atmosphere:** Deep background, gold accents used sparingly (never everywhere). Thin horizontal rules. Everything feels considered.

**Signature Moves — at least 2 must appear in every Luxury/Refined site:**
1. A 1px horizontal rule in the brand color (`border-top: 1px solid var(--color-brand)`) placed between every major section — not a divider as afterthought, but a design element that gives the layout its cadence.
2. One full-bleed near-black section containing only a single centered line of text in the brand color — nothing else. No subhead, no button, no image. The restraint IS the statement.
3. Display font at `font-weight: 100–200`, `font-size: clamp(4rem, 8vw, 7rem)` — the extreme thinness at large scale creates the tension that defines the archetype.

**Anti-patterns:** Bright colors, rounded buttons, busy icon grids, testimonial carousels, anything energetic or playful.

---

## 5. Retro-Futuristic

**Character:** Cyberpunk meets 80s sci-fi. Neon on dark. Geometric precision. Feels like the future someone imagined in 1983.

**Best for:** Gaming, crypto/web3, tech startups, creative tools, nightlife, entertainment.

**Color parameters:**
- Base: **dark** — bg lightness 4–8%, must feel like deep space or a CRT screen
- Brand hue territory: neon spectrum — cyan (162–182°), magenta/hot-pink (278–300°), neon green (108–128°), electric yellow (55–68°). Pick by adjectives — "cold/digital" → cyan; "aggressive/rave" → magenta; "toxic/hacker" → green.
- Brand saturation: 90–100% — must glow
- Brand lightness: 45–55% on dark base
- Neutral hue: slightly tinted dark — purple-blue (228–248°) or match brand hue at very low saturation (12–20%)
- Neutral saturation: 12–22% — more saturated than most; the dark void should have a color cast
- Surface: `hsl(neutralH neutralS% 9–12%)`
- Brand-subtle: `hsl(brandH brandS% 6–10%)` — almost invisible, just a hint
- **Accent pairing:** Retro-Futuristic commonly uses two neon colors — a primary glow and a secondary highlight. Use split-complementary (brand hue ± 150°) for maximum drama. The accent appears on borders, scanline elements, and secondary interactive states. Both colors glow; primary glows more intensely. Example: cyan (175°) as brand + magenta (295°) as accent — the canonical cyberpunk pairing.
- Remember: neutral scale is inverted

**Radius:** Zero or very sharp. `--radius-sm: 0; --radius-md: 2px; --radius-lg: 4px;`

**Shadow:** Neon glow — `--shadow-sm: 0 0 12px hsl(168 100% 50% / 0.3); --shadow-md: 0 0 24px hsl(168 100% 50% / 0.4);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: geometric or sci-fi sans (angular, condensed, or tech-flavored) — must feel like the future
- Body: monospace or technical sans — functional, code-adjacent
- Avoid: humanist serifs, rounded fonts, warm or organic typefaces

**Heading style:** Wide tracking, geometric sans, often all-caps with neon color on dark.

**Layout tendency:** Grid-exposed, diagonal elements, scanlines as CSS pattern, geometric accent shapes.

**Hero variant:** Fullscreen Cinematic with gradient overlay.

**Atmosphere:** CRT glow. Background gradients that suggest depth and space. Fine grid lines via `repeating-linear-gradient`. Neon borders instead of shadows.

**Signature Moves — at least 2 must appear in every Retro-Futuristic site:**
1. Scanline texture on at least one section background: `background-image: repeating-linear-gradient(transparent 0px, transparent 2px, hsl(0 0% 0% / 0.05) 2px, hsl(0 0% 0% / 0.05) 4px)` — subtle presence, not overwhelming.
2. Hero heading with neon atmospheric glow: `text-shadow: 0 0 20px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.8), 0 0 60px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.35)` — the text appears to emit light.
3. At least one neon-border card or container: `box-shadow: inset 0 0 0 1px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.6), 0 0 16px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.15)` — glowing edge, not filled.

**Anti-patterns:** Warm colors, organic shapes, serif fonts, anything pastoral or earthy.

---

## 6. Soft/Pastel

**Character:** Gentle, approachable, human. Diffuse light. Colors that feel like watercolor washes.

**Best for:** Wellness, children's products, beauty, lifestyle, coaching, mental health, community.

**Color parameters:**
- Base: **light**, slightly tinted — the whole page should feel like it's bathed in soft light
- Brand hue territory: muted versions of any hue — mauve/rose (310–340°), lavender (255–275°), peach (18–30°), sage (85–105°), sky (198–215°). The hue matters less than the saturation and lightness.
- Brand saturation: 32–52% — muted; the color should feel like watercolor, not paint
- Brand lightness: 58–70% — higher than most archetypes; pastels live in this range
- Neutral hue: match brand hue closely (within ±10°) — the whole palette should feel tinted
- Neutral saturation: 12–28% — notably more saturated than other archetypes; this is intentional warmth
- Surface: barely-tinted, `hsl(brandH 20–30% 98–100%)`
- Brand-subtle: very light, `hsl(brandH brandS% 94–97%)`

**Radius:** Very round. `--radius-sm: 0.5rem; --radius-md: 1rem; --radius-lg: 1.5rem; --radius-xl: 2.5rem; --radius-full: 9999px;`

**Shadow:** Colored and soft — `--shadow-sm: 0 4px 16px hsl(325 45% 62% / 0.12); --shadow-md: 0 8px 32px hsl(325 45% 62% / 0.16);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: rounded/playful, or warm geometric sans — must feel gentle and approachable
- Body: rounded sans or humanist sans — soft, never authoritative
- Avoid: high-contrast serifs, condensed display sans, monospace, anything sharp or heavy

**Heading style:** Relaxed, rounded, medium-heavy weight. Friendly and approachable, not authoritative.

**Layout tendency:** Centered, symmetrical, gentle curves. Overlapping circles as decorative elements.

**Hero variant:** Centered Editorial or Split.

**Atmosphere:** Diffuse pastel gradients. Soft overlapping shapes. Nothing sharp or angular. The entire site feels like a hug.

**Signature Moves — at least 2 must appear in every Soft/Pastel site:**
1. Two overlapping soft shapes (CSS `border-radius: 50%` divs or pill blobs) in brand and accent colors at 12–20% opacity, used as decorative layout elements behind content panels — not decoration for its own sake but a spatial layer that adds depth.
2. Display heading at generous scale — `clamp(3rem, 10vw, 7rem)`, `font-weight: 600–700` — pastels need scale to avoid looking timid; the size is what gives the softness confidence.
3. At least one section with a soft multi-stop gradient background that transitions from pure white to `var(--color-brand-subtle)` over the full section height — the gradient is the atmosphere, not a border or divider.

**Anti-patterns:** Hard edges, monospace fonts, dark backgrounds, high-contrast brutalism, anything clinical or corporate.

---

## 7. Tech-Industrial

**Character:** Functional precision. Tools built to work, not to impress. Dark, focused, data-forward.

**Best for:** Developer tools, SaaS, infrastructure, analytics, fintech, B2B software.

**Color parameters:**
- Base: **dark** (preferred) — focused, screen-like
- Brand hue territory: cool functional spectrum — electric blue (205–220°), teal (185–200°), indigo (225–242°), steel (195–212°). Never warm colors, never neon-vivid — functional, not decorative.
- Brand saturation: 75–100% — must be clearly visible and purposeful on dark
- Brand lightness: 50–62%
- Neutral hue: blue-grey — 210–222°, closely aligned to brand hue
- Neutral saturation: 8–16%
- Surface: dark blue-grey, `hsl(neutralH neutralS% 11–14%)`
- Brand-subtle: `hsl(brandH brandS% 8–12%)`
- Remember: neutral scale is inverted

**Radius:** Sharp to small. `--radius-sm: 2px; --radius-md: 4px; --radius-lg: 6px;`

**Shadow:** Subtle, no glow — `--shadow-sm: 0 1px 4px hsl(215 18% 4% / 0.3);`

**Border:** Distinct and functional — `--border: 1px solid var(--color-neutral-200);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: grotesque sans, geometric sans, or technical sans — precise and functional, zero flourish
- Body: grotesque sans or monospace — matches the utilitarian register
- Avoid: decorative serifs, rounded fonts, expressive display fonts, anything that feels human or warm

**Heading style:** Medium-heavy, tight tracking, never decorative. Information-dense.

**Layout tendency:** Dense when needed, always structured. Data tables feel natural. Code snippets as section elements.

**Hero variant:** Split or Centered Editorial.

**Atmosphere:** Fine grid lines in background via CSS. Monochrome with one electric accent used purposefully. Every element looks like it has a function.

**Signature Moves — at least 2 must appear in every Tech-Industrial site:**
1. Fine grid texture as section background: `background-image: repeating-linear-gradient(hsl(215 15% 60% / 0.05) 1px, transparent 1px), repeating-linear-gradient(90deg, hsl(215 15% 60% / 0.05) 1px, transparent 1px); background-size: 100% 28px, 28px 100%` — the grid signals precision without being decorative.
2. At least one monospace status tag, version badge, or metric label using `font-family: var(--font-mono)` — reinforces the developer/infrastructure register.
3. Terminal cursor animation on a key heading or CTA: a blinking `|` character appended via `::after` pseudo-element with `@keyframes blink { 50% { opacity: 0 } }` — signals live system, not static brochure.

**Anti-patterns:** Decorative illustrations, warm palettes, rounded pill buttons, handwritten fonts, pastoral photography.

---

## 8. Art Deco/Geometric

**Character:** Symmetry, ornament, and precision. Geometric pattern as decoration. Glamour and structure in tension.

**Best for:** Upscale events, boutique hotels, vintage brands, cultural venues, high-end restaurants.

**Color parameters:**
- Base: **dark** — deep and velvety, `hsl(warmH warmS% 6–9%)`
- Brand hue territory: period-accurate metallic tones — antique gold (38–50°), art deco teal (165–178°), bronze (28–38°), brass (45–55°). Two strong options; pick based on adjectives ("warm/glamorous" → gold; "cool/geometric" → teal).
- Brand saturation: 62–80%
- Brand lightness: 50–62%
- Neutral hue: warm dark — 25–38° (warm mahogany-black, not blue-black)
- Neutral saturation: 5–14%
- Surface: `hsl(28–35° 10–14% 10–14%)`
- Border: use brand-color at 25–35% opacity instead of neutral — this is characteristic of the archetype
- Remember: neutral scale is inverted

**Radius:** Zero with decorative corner accents via CSS `::before`/`::after`.

**Shadow:** Warm and dramatic — `--shadow-md: 0 8px 32px hsl(25 15% 4% / 0.5);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: Art Deco geometric sans, Roman serif, or ornamental display — symmetrical and architectural
- Body: elegant geometric sans or humanist sans — refined, wide tracking feels natural
- Avoid: rounded fonts, monospace, anything casual or informal

**Heading style:** Wide tracking, all-caps, light weight. Geometric letterforms. Gold color on dark.

**Layout tendency:** Strong vertical rhythm. Symmetrical with centered compositions. Decorative horizontal rules.

**Hero variant:** Fullscreen Cinematic or Centered Editorial.

**Atmosphere:** Deep, velvety background. Gold rules and dividers. Geometric pattern via CSS `repeating-linear-gradient`. Every section feels like entering a grand room.

**Signature Moves — at least 2 must appear in every Art Deco site:**
1. Decorative corner brackets on at least one featured card or section container: CSS `::before`/`::after` pseudo-elements forming an L-bracket in each corner — `border-top: 1px solid var(--color-brand); border-left: 1px solid var(--color-brand); width: 1rem; height: 1rem` — the geometric detail is the signature.
2. A geometric section divider — chevron, diamond, or repeating fan pattern via CSS `clip-path` or inline SVG between key sections, replacing the standard `<hr>`.
3. Key heading at `letter-spacing: 0.15–0.2em`, `font-weight: 300`, `text-transform: uppercase`, in brand color on the dark surface — the tracked thin caps is the purest expression of the archetype.

**Anti-patterns:** Organic shapes, rounded anything, bright saturated colors, casual typography, anything that feels modern-tech.

---

## 9. Playful/Toy-like

**Character:** High-energy, saturated, joyful. Everything bounces. Color as celebration.

**Best for:** Children's products, games, events, education, youth brands, food delivery, anything that should make people smile.

**Color parameters:**
- Base: **light** — but not white; warm cream or a very light tinted background, `hsl(40–50° 25–35% 97–99%)`
- Brand hue territory: warm vivid spectrum — tangerine (18–28°), hot coral (340–355°), electric yellow (48–60°), hot pink (320–340°), lime (85–100°). The brand color must feel like it's about to jump off the page.
- Brand saturation: 85–100%
- Brand lightness: 48–58%
- Neutral hue: warm, 35–48° — bright and sunny, not dusty
- Neutral saturation: 15–28% — warmer and more saturated than most; the whole palette should feel energetic
- Surface: `hsl(0 0% 100%)` or very lightly tinted warm white
- **Accent pairing:** Playful almost always benefits from a second accent derived via triadic method. Classic pairings: tangerine (22°) + lime (88°), hot pink (328°) + electric yellow (55°), coral (348°) + cyan (182°). The accent appears on tags, highlighted prices, hover states, and stacked shadow layers — never competing with the brand on CTAs.

**Radius:** Maximum. `--radius-sm: 0.75rem; --radius-md: 1.25rem; --radius-lg: 2rem; --radius-xl: 3rem; --radius-full: 9999px;`

**Shadow:** Stacked hard — `--shadow-sm: 3px 3px 0 hsl(22 95% 30%); --shadow-md: 5px 5px 0 hsl(22 95% 30%);` (colored, not grey)

**Font tone constraint** (select from `font-catalog.md`):
- Display: rounded/playful at heavy weight, or expressive display — must feel energetic and joyful
- Body: rounded sans or warm geometric — friendly, never clinical
- Avoid: high-contrast serifs, monospace, condensed display, anything serious or refined

**Heading style:** Heavy, round, big. Anti-tracking (normal or tight). Joyful.

**Layout tendency:** Slightly irregular, energetic. Sections that feel like they're about to burst.

**Hero variant:** Centered Editorial or Split.

**Atmosphere:** Bright background colors (not white). Bold shapes. Micro-animations on hover — things wiggle and bounce. The page feels alive.

**Signature Moves — at least 2 must appear in every Playful site:**
1. At least one element with a stacked multi-layer colored shadow: `box-shadow: 4px 4px 0 hsl(brandH 90% 35%), 8px 8px 0 hsl(brandH 90% 25%)` — the layered offset creates a cartoon-like depth that is the defining visual of the archetype.
2. At least one element with a subtle rotation: `transform: rotate(-1.5deg)` on a card, `rotate(1deg)` on an image — enough to feel casual and imperfect, not enough to look broken. Combined with `transition: transform 0.2s ease` so hover straightens it.
3. One oversized decorative element — a large emoji, a simple illustration, or a bold icon at `font-size: 4–6rem` — used as the primary visual of a section, larger than it "should" be. Scale is the personality.

**Anti-patterns:** Dark backgrounds, thin fonts, minimal aesthetic, anything corporate or serious.

---

## 10. Minimal/Clean

**Character:** Maximum restraint. One accent color. Let content breathe. Precision in every detail.

**When to use:** Only when the business itself is deliberately minimal — architecture, portfolio, luxury goods with no dark theme. Do NOT use as a default.

**Color parameters:**
- Base: **light** — near-pure white, the accent does all the work
- Brand hue territory: **anything unexpected for the industry** — rust/terracotta (14–22°), burgundy (338–350°), dark teal (172–182°), olive (72–88°), slate-blue (215–228°). The single rule: it must not be the color you'd expect. An architect's site with rust. A chef's site with slate-blue. Surprise is the constraint.
- Brand saturation: 68–90% — must be clearly decisive; one color, no hedging
- Brand lightness: 40–54%
- Neutral hue: pure gray (saturation 0–4%) — the brand color is the only color; neutrals must yield entirely
- Neutral saturation: 0–5%
- Surface: `hsl(0 0% 99–100%)` — pure, uncolored, gives the accent maximum contrast

**Radius:** Very small. `--radius-sm: 2px; --radius-md: 3px; --radius-lg: 4px;`

**Shadow:** None or near-invisible. `--shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.05);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: high-contrast serif at light weight, expressive serif, or thin geometric sans — one strong choice used at scale
- Body: clean geometric sans or humanist sans — invisible, lets content breathe
- Avoid: monospace, rounded/playful fonts, anything with personality that competes with the accent color

**Heading style:** Either very thin (200 weight) and large, or very heavy and small. Never medium-weight medium-size — that's generic.

**Layout tendency:** Vast whitespace. One strong element per section. Asymmetric but calm.

**Hero variant:** Centered Editorial.

**Atmosphere:** Barely there. The accent color appears once and it's enough. Typography does everything.

**Signature Moves — at least 2 must appear in every Minimal/Clean site:**
1. One section where a single word or number appears at `clamp(8rem, 20vw, 16rem)` as the sole visual element — no image, no subhead, no button. The scale of the word is the entire design of that section.
2. Maximum 2 visual elements per section: one text cluster + one other (image, number, or ruled line). Any third element is a violation of the archetype's fundamental constraint.
3. One section with more whitespace than content — the empty space is not a failure to fill the page, it is a deliberate design choice. The ratio should be approximately 70% space to 30% content.

**Anti-patterns:** Multiple colors, gradients, icons everywhere, busyness of any kind, drop shadows.

---

## 11. Coastal/Airy

**Character:** Open, salt-air freshness. Blues and sandy neutrals. Everything feels unhurried and light.

**Best for:** Hospitality, travel, vacation rentals, seafood, outdoor recreation, beach/coastal businesses.

**Color parameters:**
- Base: **light**, cool-tinted — like looking at the sky or water from a distance
- Brand hue territory: water and sky — ocean (195–208°), seafoam (180–195°), harbor blue (205–215°), Mediterranean (185–200°). Adjectives like "warm/tropical" push toward 185–195°; "cool/Nordic" push toward 205–215°.
- Brand saturation: 52–72%
- Brand lightness: 36–50%
- Neutral hue: mixed — light neutrals lean cool (190–205°); mid-range neutrals shift warm/sandy (35–45°); this split creates the "ocean meets beach" quality characteristic of the archetype
- Neutral saturation: 8–22% (varies by step — cool end for light, warm end for mid)
- Surface: `hsl(0 0% 100%)` or barely cool-tinted

**Radius:** Medium-round. `--radius-sm: 0.25rem; --radius-md: 0.75rem; --radius-lg: 1.5rem; --radius-xl: 2rem;`

**Shadow:** Soft and airy — `--shadow-sm: 0 2px 12px hsl(200 40% 50% / 0.08);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: light geometric sans, humanist sans, or warm rounded sans — open and unhurried
- Body: humanist sans or rounded sans — relaxed, never demanding
- Avoid: heavy grotesque, condensed display, monospace, dark or dramatic typefaces

**Heading style:** Light weight, relaxed tracking. Never heavy or dense.

**Layout tendency:** Spacious. Full-bleed imagery. Sections that breathe.

**Hero variant:** Fullscreen Cinematic (with ocean/landscape photo) or Split.

**Atmosphere:** Open sky. Barely-there background tints. Photos as atmosphere. Sandy texture possible via noise overlay.

**Signature Moves — at least 2 must appear in every Coastal/Airy site:**
1. At least one full-bleed photography section at `min-height: 90vh` with minimal text overlay at the bottom — the image carries the section; text is subordinate to atmosphere.
2. One panel with a sandy grain texture applied via SVG noise filter overlay at 2–4% opacity — the texture breaks the clinical flatness that afflicts all-CSS sites and grounds the design in material warmth.
3. Section headline at `font-weight: 300`, `font-size: clamp(2.5rem, 6vw, 5rem)`, `line-height: 1.15` with generous padding above and below — the spaciousness of the typography is the primary atmosphere signal.

**Anti-patterns:** Dark backgrounds, heavy fonts, brutalist edges, neon colors, dense layouts.

---

## 12. Dark/Moody

**Character:** Cinematic, atmospheric, dramatic. Low-key lighting. Richness through depth.

**Best for:** Photography, music, nightlife, high-end restaurants, creative portfolios, tattoo studios, whiskey/spirits.

**Color parameters:**
- Base: **dark** — atmospheric and deep, bg lightness 5–8%
- Brand hue territory: jewel tones — amethyst (268–285°), crimson (342–355°), amber glow (30–42°), sapphire (220–235°), emerald (148–162°). Pick by adjective: "mysterious" → amethyst; "passionate" → crimson; "warm/whiskey" → amber; "cold/dramatic" → sapphire.
- Brand saturation: 48–68% — rich but not neon; jewel depth, not screaming color
- Brand lightness: 55–68% (needs to emerge from dark background)
- Neutral hue: match brand hue within ±20° — the darkness should feel colored, not neutral-grey
- Neutral saturation: 5–14%
- Surface: `hsl(neutralH neutralS% 9–13%)`
- Remember: neutral scale is inverted

**Radius:** Varies — can be zero (moody/raw) or medium (cinematic/rich). Decide based on adjectives.

**Shadow:** Atmospheric — `--shadow-md: 0 12px 40px hsl(265 18% 3% / 0.6);`

**Font tone constraint** (select from `font-catalog.md`):
- Display: dramatic serif (high contrast, expressive) or Roman serif — must feel cinematic and weighty
- Body: elegant geometric sans or humanist sans — recedes, lets the display font and imagery dominate
- Avoid: rounded fonts, monospace, anything playful or utilitarian

**Heading style:** Dramatic contrast — either ultra-thin serif at large scale, or heavy sans. Never medium.

**Layout tendency:** Full-bleed imagery, dark overlays, content that emerges from shadow.

**Hero variant:** Fullscreen Cinematic.

**Atmosphere:** Background that feels like late-night lighting. Gradients that suggest candlelight or neon glow. Images with dark atmospheric quality. Every section transition should feel like a scene change.

**Signature Moves — at least 2 must appear in every Dark/Moody site:**
1. At least one section with a radial gradient suggesting a single atmospheric light source: `background: radial-gradient(ellipse 80% 60% at 30% 50%, hsl(var(--brand-h) var(--brand-s) 20% / 0.35) 0%, transparent 70%), var(--color-bg)` — candlelight, spotlight, ember glow.
2. Hero or key display text with an atmospheric glow: `text-shadow: 0 0 40px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.25), 0 0 80px hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.12)` — the text appears to emit a subtle warmth, not neon, ambient.
3. At least one section where a full-height image bleeds edge to edge with content overlaid at the bottom third — content emerges from the image rather than sitting alongside it. This is the cinematic frame.

**Anti-patterns:** Light backgrounds, bright colors, playful rounded shapes, stock corporate photography.
