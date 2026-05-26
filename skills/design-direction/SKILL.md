---
name: design-direction
description: Use when establishing or changing the visual identity of a site — before
  init, before building sections, or when a site needs a design overhaul. Commits
  to a named aesthetic archetype and generates a unique tokens.css.
paths:
  - src/styles/**
  - .claude/**
---

# design-direction

Establishes the visual DNA of a site before any code is written. Generates a unique `tokens.css` and a `.claude/design-brief.md` that all other skills read to stay coherent with the chosen aesthetic.

**Run this before `init` on new projects. Run it alone to redesign an existing site.**

## Flow

### Step 1 — Gather context

Ask the user three questions (can be answered in one message):

1. **Industry & audience** — What does this business do, and who is the customer? (e.g. "artisan bakery serving local families", "B2B SaaS for logistics teams")
2. **Three brand adjectives** — Words that should describe how the site feels. (e.g. "warm, trustworthy, unpretentious" or "precise, premium, modern")
3. **Anti-adjectives (optional)** — Words that must NOT describe it. (e.g. "not corporate, not clinical")

### Step 2 — Choose an archetype

**Adjectives are the primary input. Industry is context, not a category.**

Do not map industry → archetype directly. Instead:

1. Read the three brand adjectives. Find archetypes in `references/archetypes.md` whose character, tone, and anti-patterns are compatible with those adjectives.
2. List the 2–3 archetypes that fit the adjectives. From those candidates, apply the anti-convergence rule below.
3. Select one and explain the choice in one sentence tied to the *adjectives*, not the industry.

**Anti-convergence rule — check before selecting:**

Certain archetype/industry pairings are so common they produce generic results. If the leading candidate is one of these, require that the adjectives *strongly and specifically* support it before choosing it. If another candidate also fits the adjectives, prefer that one instead.

| Industry type | Overused archetype | Prefer instead |
|---|---|---|
| Food, wellness, organic products | Organic/Natural | Editorial, Soft/Pastel, Minimal/Clean |
| Tech, SaaS, developer tools | Tech-Industrial | Brutalist, Art Deco, Retro-Futuristic |
| Law, finance, consulting | Editorial | Luxury/Refined, Minimal/Clean, Art Deco |
| Restaurants, bars | Dark/Moody | Art Deco, Organic/Natural, Coastal/Airy |
| Beauty, wellness | Soft/Pastel | Luxury/Refined, Editorial, Organic/Natural |
| Hospitality, travel | Coastal/Airy | Art Deco, Dark/Moody, Luxury/Refined |
| Creative agencies | Brutalist | Retro-Futuristic, Editorial, Minimal/Clean |

This table is a *nudge*, not a rule. If the adjectives are "raw, confrontational, handmade" for a bakery, Brutalist is correct — don't fight it. The goal is to prevent the system from converging by default.

**Within-archetype differentiation — vary these every time:**

Even when two sites use the same archetype, they must feel distinct. Before finishing Step 3, decide on all four:

- **Hue offset:** how far to shift from the archetype's example hue (10°, 20°, 35°?) — vary based on the business name or adjectives
- **Font choice:** pick a *different* option from the archetype's font list each time; if all three have been used, suggest a comparable alternative
- **Section variant mix:** record in the brief which variant to use for each section — e.g. "Hero B, Services C, About A" — no two sites should have the same combination
- **Atmosphere stack:** pick exactly 2 of the 8 atmosphere patterns from `sections.md` that match this archetype — log them in the brief so every section applies them consistently

Present the choice as: `Archetype: [Name] — [one-line reason tied to adjectives]`

### Step 3 — Generate a unique tokens.css

Using the archetype's token recipe from `references/archetypes.md`:

1. **Vary the hue** — Do not use the archetype's example hue verbatim. Shift it 10–40 degrees to make this instance unique. Use business context to motivate the shift (e.g. a coffee shop using Organic/Natural gets warmer amber-greens, a florist gets cooler sage-greens).
2. **Set font pair** — Read `references/font-catalog.md`. Select fonts based on the brand adjectives (which personality rows match?), then verify the choice doesn't violate the archetype's tone constraint. Do NOT default to the first font in the archetype's tone row — rotate across the full catalog. See Step 2 above for the within-archetype variation rule.
3. **Write the complete `src/styles/tokens.css`** — full file, not a diff. Use the archetype's radius personality, shadow style, and dark/light base preference.

### Step 4 — Write design brief

Write `.claude/design-brief.md` with this structure:

```markdown
# Design Brief

**Archetype:** [Name]
**Brand adjectives:** [three words]
**Anti-adjectives:** [words to avoid]

## Palette
- Brand: `hsl(H S% L%)` — [one-word character, e.g. "amber", "slate", "coral"]
- Surface: [light/dark + value]
- Accent: [optional second accent]

## Typography
- Display font: [Fontsource package + CSS var]
- Body font: [Fontsource package + CSS var]
- Heading style: [e.g. "tight tracking, heavy weight" / "wide tracking, light weight, uppercase"]

## Layout personality
- Radius: [sharp / medium / round / mixed]
- Shadow style: [none / soft / hard-offset / colored / glow]
- Spacing rhythm: [tight / balanced / generous]
- Layout tendency: [centered / asymmetric / editorial / full-bleed]

## Section variant mix
- Hero: [A / B / C] — [one-word reason]
- Services: [A / B / C] — [one-word reason]
- About: [A / B / C] — [one-word reason]
- Testimonials: [A / B / C] — [one-word reason]

## Atmosphere stack (exactly 2 patterns from sections.md)
1. [Pattern name] — [where/how applied]
2. [Pattern name] — [where/how applied]

## Atmosphere description
[2–3 sentences. What does this site feel like to scroll through? What's the dominant visual texture or spatial quality?]

## Anti-patterns for this site
- [3 specific things to never do — tied to the adjectives, not generic warnings]
```

### Step 5 — Report

Summarize what was decided and what files were written. List the Fontsource install commands so the user can run them.

## Rules

- Never produce the same hue twice in a session — vary intentionally.
- Never choose Minimal/Clean as the default when context is ambiguous — pick something with more personality.
- Dark-base themes (Luxury, Retro-Futuristic, Tech-Industrial, Dark/Moody) are valid for any business type. Don't default to light themes.
- The design brief is the contract — all other skills must read it before generating anything.
- If `.claude/design-brief.md` already exists, show it to the user and ask: update direction, or keep it?
