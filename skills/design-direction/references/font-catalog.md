# Font Catalog

Fonts organized by personality trait, not archetype. Select based on the brand adjectives first — then verify the choice doesn't violate the archetype's tone constraint.

All fonts are available via Fontsource. Install with `npm install @fontsource/[package-name]`.

Use the Astro Fonts API (preferred) or import directly. See the `add-font` skill for wiring.

---

## How to select a font pair

1. Match the **display font** to the primary brand adjective (the one that should hit first visually).
2. Match the **body font** to the secondary adjective, or choose a neutral that supports the display font without competing.
3. Check the archetype's tone constraint — filter out anything that violates it.
4. Prefer the **least obvious** choice that still fits. If Playfair Display is the first font you think of, look at the other options in that row first.
5. Two sites with the same archetype must never share both fonts. Vary at least one.

---

## Display Fonts (headlines, h1–h3)

### High-contrast serif — "refined, editorial, literary, authoritative"

| Font | Package | Character |
|---|---|---|
| Playfair Display | `@fontsource/playfair-display` | Classic editorial, strong contrast — overused, pick last |
| Cormorant Garamond | `@fontsource/cormorant-garamond` | Extremely thin, aristocratic, needs large sizes |
| Cormorant | `@fontsource/cormorant` | Wider Cormorant family, more weight options |
| DM Serif Display | `@fontsource/dm-serif-display` | Warmer than Playfair, slightly quirky |
| Instrument Serif | `@fontsource/instrument-serif` | Modern high-contrast, elegant but not stuffy |
| Libre Baskerville | `@fontsource/libre-baskerville` | Sturdy editorial, less precious than Cormorant |
| EB Garamond | `@fontsource/eb-garamond` | Old-world, classical, very thin at display weights |
| Spectral | `@fontsource/spectral` | Screen-optimized high-contrast, good range of weights |

### Humanist serif — "warm, trustworthy, approachable, storytelling"

| Font | Package | Character |
|---|---|---|
| Lora | `@fontsource/lora` | Warm, calligraphic curves — great body font too |
| Source Serif 4 | `@fontsource/source-serif-4` | Practical warmth, variable, very readable |
| Crimson Pro | `@fontsource/crimson-pro` | Old-style, literary, compact — feels like a good book |
| Fraunces | `@fontsource/fraunces` | Optical size axis, quirky serifs, "wonky" character |

### Display / expressive serif — "dramatic, bold, opinionated, memorable"

| Font | Package | Character |
|---|---|---|
| Abril Fatface | `@fontsource/abril-fatface` | Heavy contrast, poster-quality, one weight only |
| Yeseva One | `@fontsource/yeseva-one` | Round and bold, softer than Abril, one weight |
| Cinzel | `@fontsource/cinzel` | Roman inscriptions, all-caps works beautifully |
| Tenor Sans | `@fontsource/tenor-sans` | Quiet elegance, all-caps feel at any case |

### Geometric sans — "clean, precise, systematic, modern"

| Font | Package | Character |
|---|---|---|
| Jost | `@fontsource/jost` | Futura-inspired, very geometric, elegant |
| Outfit | `@fontsource/outfit` | Friendly geometric, versatile weight range |
| Urbanist | `@fontsource/urbanist` | Wide, airy geometric, contemporary |
| Plus Jakarta Sans | `@fontsource/plus-jakarta-sans` | Warm geometric, Indonesian origin, distinctive |
| DM Sans | `@fontsource/dm-sans` | Clean geometric, good for both display and body |
| Josefin Sans | `@fontsource/josefin-sans` | Art Deco geometry, wide tracking natural, 1920s feel |

### Humanist sans — "friendly, human, accessible, unpretentious"

| Font | Package | Character |
|---|---|---|
| Nunito | `@fontsource/nunito` | Round terminals, cheerful, very approachable |
| Raleway | `@fontsource/raleway` | Elegant humanist, distinctive W shape |
| Work Sans | `@fontsource/work-sans` | Practical and clear, slightly informal |
| Cabin | `@fontsource/cabin` | Humanist warmth, condensed option available |

### Grotesque sans — "neutral, Swiss, confident, utilitarian"

| Font | Package | Character |
|---|---|---|
| Barlow | `@fontsource/barlow` | Rounded grotesque, condensed variant available |
| IBM Plex Sans | `@fontsource/ibm-plex-sans` | Technical precision, corporate in a good way |
| Syne | `@fontsource/syne` | Experimental grotesque, distinctive at heavy weights |
| Bricolage Grotesque | `@fontsource/bricolage-grotesque` | Quirky variable grotesque, distinctive personality |

### Condensed / display sans — "powerful, compressed, high-impact, editorial"

| Font | Package | Character |
|---|---|---|
| Barlow Condensed | `@fontsource/barlow-condensed` | Strong editorial presence, good weight range |
| Oswald | `@fontsource/oswald` | Narrow, bold, feels like newspaper headlines |
| Bebas Neue | `@fontsource/bebas-neue` | All-caps only, maximum impact, one weight |
| Rajdhani | `@fontsource/rajdhani` | Devanagari-influenced, geometric, tech feel |

### Expressive / variable — "distinctive, contemporary, unexpected"

| Font | Package | Character |
|---|---|---|
| Fraunces | `@fontsource/fraunces` | Optical axis, "wonky" charm, memorable |
| Recursive | `@fontsource/recursive` | Casual↔formal axis, monospace↔sans axis, hugely variable |
| Cabinet Grotesk | `@fontsource/cabinet-grotesk` | Wide and confident, distinctive X-height |
| Exo 2 | `@fontsource/exo-2` | Sci-fi geometric, futuristic but readable |
| Orbitron | `@fontsource/orbitron` | Extreme tech aesthetic, use sparingly / display only |

### Monospace — "technical, code, precise, brutalist, retro"

| Font | Package | Character |
|---|---|---|
| Space Mono | `@fontsource/space-mono` | Quirky monospace, editorial coding feel |
| IBM Plex Mono | `@fontsource/ibm-plex-mono` | Clean technical, IBM heritage |
| JetBrains Mono | `@fontsource/jetbrains-mono` | Developer-tool feel, ligatures |
| Geist Mono | `@fontsource/geist-mono` | Vercel's monospace, contemporary precision |

### Rounded / playful — "joyful, approachable, child-friendly, energetic"

| Font | Package | Character |
|---|---|---|
| Nunito | `@fontsource/nunito` | Round terminals, widely beloved |
| Quicksand | `@fontsource/quicksand` | Rounded geometric, clean and friendly |
| Baloo 2 | `@fontsource/baloo-2` | Bouncy, multicultural, display-friendly |
| Fredoka | `@fontsource/fredoka` | Very round, toy-like, one weight range |
| Poiret One | `@fontsource/poiret-one` | Art Deco–meets–rounded, unique blend |

---

## Body Fonts (paragraphs, small text)

Body fonts must be highly readable at 1rem. Pair with a contrasting display font — don't use two fonts from the same personality row.

| Font | Package | Works with |
|---|---|---|
| Lora | `@fontsource/lora` | Any serif display; adds warmth to geometric sans display |
| Source Serif 4 | `@fontsource/source-serif-4` | Display serifs; provides readable contrast |
| Spectral | `@fontsource/spectral` | Heavy display serifs; slightly editorial |
| Crimson Pro | `@fontsource/crimson-pro` | Display serifs or geometric sans |
| DM Sans | `@fontsource/dm-sans` | Any display font; clean neutral |
| Jost | `@fontsource/jost` | Serif display fonts; clean geometric contrast |
| Nunito | `@fontsource/nunito` | Rounded/playful display; also works with geometric |
| IBM Plex Sans | `@fontsource/ibm-plex-sans` | Technical display fonts; monospace pairs |
| IBM Plex Mono | `@fontsource/ibm-plex-mono` | Body text in brutalist/technical sites |
| Barlow | `@fontsource/barlow` | Condensed display; slightly casual |
| Raleway | `@fontsource/raleway` | Most display fonts; elegant and neutral |
| Work Sans | `@fontsource/work-sans` | Any display; practical and clear |
| Outfit | `@fontsource/outfit` | Geometric display; consistent family feel |

---

## Pairing patterns

These cross-category pairs produce strong contrast and distinctiveness:

| Display | Body | Mood |
|---|---|---|
| Abril Fatface (heavy serif display) | Jost (geometric sans) | Editorial punch |
| Cormorant Garamond (thin serif) | IBM Plex Sans (grotesque) | Luxury minimalism |
| Bebas Neue (condensed all-caps) | Source Serif 4 (humanist serif) | Industrial–editorial |
| Josefin Sans (Art Deco geometric) | Crimson Pro (old-style serif) | Vintage refined |
| Fraunces (quirky serif) | DM Sans (clean geometric) | Contemporary warmth |
| Orbitron (tech display) | IBM Plex Mono (monospace) | Full tech/futuristic |
| Syne (grotesque variable) | Lora (humanist serif) | Expressive–grounded |
| Cinzel (Roman inscriptions) | Raleway (humanist sans) | Classical meets modern |
| Bricolage Grotesque (quirky variable) | Work Sans (practical sans) | Contemporary edge |
| Baloo 2 (rounded display) | Nunito (round body) | Fully playful |

---

## What to avoid

- **Inter** — do not use as a display font. Acceptable only as a last-resort body font if no brief exists.
- **Roboto** — too generic, too corporate by association.
- **Arial / Helvetica / system-ui** — default fallback, never intentional design.
- **Open Sans** — overused, characterless at display sizes.
- **Lato** — same problem as Open Sans.
- Two fonts from the same row (e.g. Nunito display + Quicksand body) — not enough contrast.
- A heavy display font paired with a heavy body font — one must yield.
