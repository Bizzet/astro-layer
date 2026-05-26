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

Ask the user four questions (can be answered in one message):

1. **Industry & audience** — What does this business do, and who is the customer? (e.g. "artisan bakery serving local families", "B2B SaaS for logistics teams")
2. **Three brand adjectives** — Words that should describe how the site feels. (e.g. "warm, trustworthy, unpretentious" or "precise, premium, modern")
3. **Anti-adjectives (optional)** — Words that must NOT describe it. (e.g. "not corporate, not clinical")
4. **Animation intensity** — How much motion should the site have? (e.g. "none — static only", "subtle — micro-interactions and hover states", "moderate — scroll reveals and page transitions", "expressive — motion is part of the brand identity")

### Step 2 — Form the creative concept

**Read `references/concept-formation.md` before this step.**

Before choosing an archetype, form a **single-sentence creative concept** that captures the idea behind this design — not what the client does, but the unexpected angle that makes this site worth looking at.

A concept creates productive tension between two things that don't normally belong together. It must be:
- **Specific** — visual enough to make design decisions from
- **Surprising** — you couldn't guess it from the industry alone
- **Honest** — it serves the brand adjectives, not a random reference

**Formation method:**
1. Name the cliché — what is the most obvious design for this type of business?
2. Find the unexpected parallel — what other world shares the same essential quality?
3. Form the tension sentence — combine the business with the parallel
4. Test it — can you make a specific visual decision from this sentence?

Present the concept as: `Concept: [one sentence]`

Example output:
> `Concept: A logistics company with the visual restraint of a Swiss watchmaker's archive — precision as identity, not decoration.`

### Step 3 — Choose an archetype

**Adjectives and concept are the primary inputs. Industry is context, not a category.**

1. Read the concept and brand adjectives. Find archetypes in `references/archetypes.md` whose character and atmosphere serve the concept.
2. List the 2–3 archetypes that fit. From those candidates, apply the anti-convergence rule below.
3. Select one and explain the choice in one sentence tied to the *concept*, not the industry.

**Anti-convergence rule — check before selecting:**

Certain archetype/industry pairings are so common they produce generic results. If the leading candidate is one of these, require that the adjectives *strongly and specifically* support it before choosing it. If another candidate also fits, prefer that one instead.

| Industry type | Overused archetype | Prefer instead |
|---|---|---|
| Food, wellness, organic products | Organic/Natural | Editorial, Soft/Pastel, Minimal/Clean |
| Tech, SaaS, developer tools | Tech-Industrial | Brutalist, Art Deco, Retro-Futuristic |
| Law, finance, consulting | Editorial | Luxury/Refined, Minimal/Clean, Art Deco |
| Restaurants, bars | Dark/Moody | Art Deco, Organic/Natural, Coastal/Airy |
| Beauty, wellness | Soft/Pastel | Luxury/Refined, Editorial, Organic/Natural |
| Hospitality, travel | Coastal/Airy | Art Deco, Dark/Moody, Luxury/Refined |
| Creative agencies | Brutalist | Retro-Futuristic, Editorial, Minimal/Clean |

This table is a *nudge*, not a rule. If the adjectives are "raw, confrontational, handmade" for a bakery, Brutalist is correct — don't fight it.

**Within-archetype differentiation — vary these every time:**

Even when two sites use the same archetype, they must feel distinct. Before finishing Step 4, decide on all four:

- **Hue offset:** how far to shift from the archetype's example hue (10°, 20°, 35°?) — vary based on the business name or adjectives
- **Font choice:** pick a *different* option from the archetype's font list each time; if all three have been used, suggest a comparable alternative
- **Section variant mix:** record in the brief which variant to use for each section — e.g. "Hero B, Services C, About A" — no two sites should have the same combination
- **Atmosphere stack:** pick exactly 2 of the 8 atmosphere patterns from `sections.md` that match this archetype — log them in the brief so every section applies them consistently

Present the choice as: `Archetype: [Name] — [one-line reason tied to the concept]`

**Concept-driven overrides — what does this concept break?**

Once the archetype is chosen, ask: does the concept demand something the archetype's defaults don't allow? Common targets: radius personality, color territory (hue outside the archetype's range), shadow style, weight contrast. If yes, override — the concept outranks the archetype. Record each override and its reason in the design brief.

### Step 4 — Select signature moves and typography composition

**Read the chosen archetype's Signature Moves section in `references/archetypes.md`.**
**Read `references/typography-composition.md`.**

Before generating any CSS, make four decisions that will define this site's visual identity:

1. **Signature moves** — choose 2–3 from the archetype's Signature Moves list. Record which ones and where they'll appear. These are not optional — they must appear in the site.

2. **Hero display size** — using `typography-composition.md`, choose the scale for the hero `h1`. Must be at least `clamp(3rem, 8vw, 6rem)`. Record the exact `clamp()` value.

3. **Tracking decision** — choose tracking for the hero display and for section labels. Record both values. Heavy display gets negative tracking; label caps get positive tracking.

4. **Weight contrast** — choose the weight pair for this site. Options from `typography-composition.md`: Giant/Thin, Heavy/Light, Mixed-in-heading, or Tiny-label/Giant-value. Record the pair and the weights.

5. **Type risk** — choose one unusual typographic move from `typography-composition.md` that fits the archetype and concept. Record it. It must appear at least once in the site.

6. **One grid break** — identify where one element will escape the grid. Record the location and method (e.g., "hero h1 overflows container by 40px on desktop" or "about section image intrudes 2rem into text column").

### Step 5 — Invent the site-specific visual motif

A visual motif is a CSS-expressible detail **invented from the concept**, not picked from the archetype's signature moves list. It must:
- Derive directly from the creative concept sentence — not from the industry or archetype
- Be expressible in CSS (not dependent on custom illustrations or photography)
- Appear in at least 3 places across the site — as a recurring structural element, not scattered decoration

**Formation method:**
1. Re-read the concept sentence. What physical or spatial quality does it describe?
2. Translate that quality into a CSS detail: a border treatment, a numbering system, a spacing rhythm, a text decoration, a background pattern, a positioning convention.
3. Name it: `[concept-word] motif: [one CSS sentence]`

**Examples:**
- Concept: "logistics company with the visual restraint of a Swiss watchmaker's archive"
  → Motif: hairline 1px rules with tabular measurement labels in monospace — section dividers, metric captions, card footers
- Concept: "investment firm with the rhythm of a film title sequence"
  → Motif: zero-padded scene counters (01, 02, 03) at 0.65rem / 0.2em tracking — section indexes, list markers, card identifiers
- Concept: "family-owned company with the cadence of a silent film intertitle"
  → Motif: wide-tracked all-caps label blocks with centered diamond separator (◆) — section eyebrows, footer labels, metric captions

The motif goes into the design brief. Every skill that builds sections or components reads it and applies it in the right places.

### Step 6 — Generate a unique tokens.css

Using the archetype's token recipe from `references/archetypes.md`:

1. **Vary the hue** — Do not use the archetype's example hue verbatim. Shift it 10–40 degrees to make this instance unique. Use business context to motivate the shift.
2. **Set font pair** — Read `references/font-catalog.md`. Select fonts based on the brand adjectives and the concept. Verify the choice doesn't violate the archetype's tone constraint. Do NOT default to the first font in the archetype's tone row — rotate across the full catalog.
3. **Decide on accent pairing** — Read the archetype's "Accent pairing" note and the dual-color pairing system in `references/color-system.md`. If the concept, adjectives, or archetype support a second accent, choose the pairing method (split-complementary / triadic / intuitive clash), derive the accent HSL, and add `--color-accent`, `--color-accent-hover`, and `--color-accent-subtle` tokens. If the archetype calls for restraint, omit the accent and note why.
4. **Write the complete `src/styles/tokens.css`** — full file, not a diff. Use the archetype's radius personality, shadow style, and dark/light base preference.

### Step 7 — Write design brief

Write `.claude/design-brief.md` with this structure:

```markdown
# Design Brief

**Archetype:** [Name]
**Brand adjectives:** [three words]
**Anti-adjectives:** [words to avoid]

## Creative Concept
[One sentence — the IDEA. Specific, visual, contains tension. Must pass the three tests from concept-formation.md.]

## Palette
- Brand: `hsl(H S% L%)` — [one-word character, e.g. "amber", "slate", "coral"]
- Surface: [light/dark + value]
- Accent: `hsl(AH AS% AL%)` — [pairing method: split-complementary / triadic / intuitive clash] — [role: where it appears] | *omit if not used — note reason*

## Typography
- Display font: [Fontsource package + CSS var]
- Body font: [Fontsource package + CSS var]
- Heading style: [e.g. "tight tracking, heavy weight" / "wide tracking, light weight, uppercase"]

## Typography Composition
- Hero display: [exact clamp() value, e.g. "clamp(3.5rem, 12vw, 9rem)"]
- Hero tracking: [e.g. "-0.04em" or "0em"]
- Weight contrast: [e.g. "200 display / 400 body" or "900 hero / 300 subhead"]
- Label tracking: [e.g. "0.15em uppercase all section labels"]
- Type risk: [one unusual move — e.g. "hero h1 bleeds 30px beyond container" or "section labels rotated 90° in left column"]

## Signature Moves (must appear in the site)
1. [First move from archetype list — include where/how it appears]
2. [Second move from archetype list — include where/how it appears]
3. [Optional third move if space allows]

## One Grid Break
[Where and how: e.g. "Hero h1 overflows container 40px right on desktop" or "Services section: first card pushed 2rem left of grid start"]

## Layout personality
- Radius: [sharp / medium / round / mixed]
- Shadow style: [none / soft / hard-offset / colored / glow]
- Spacing rhythm: [tight / balanced / generous]
- Layout tendency: [centered / asymmetric / editorial / full-bleed]
- Animation intensity: [none / subtle / moderate / expressive] — [one sentence on where motion appears and what it does]

## Section variant mix
- Hero: [A / B / C / D] — [one-word reason]
- Services: [A / B / C / D] — [one-word reason]
- About: [A / B / C / D] — [one-word reason]
- Testimonials: [A / B / C / D] — [one-word reason]

## Atmosphere stack (exactly 2 patterns from sections.md)
1. [Pattern name] — [where/how applied]
2. [Pattern name] — [where/how applied]

## Atmosphere description
[2–3 sentences. What does this site feel like to scroll through? What's the dominant visual texture or spatial quality?]

## Visual Motif
[Name]: [one CSS sentence — the recurring detail invented from the concept, not the archetype]
Appears in: [3+ placements — e.g., "section dividers, metric captions, card footers"]

## Archetype Overrides
[Any archetype defaults overridden by the concept. Format: "Override: [what] → [to what]. Reason: [the concept demand that requires it]." Omit section entirely if no overrides.]

## Anti-patterns for this site
[3 specific things to never do — derived from the concept, not generic warnings. If the concept says "Swiss watchmaker's restraint", the anti-patterns follow from that.]
```

### Step 8 — Report

Summarize what was decided and what files were written. List the Fontsource install commands so the user can run them. Call out the signature moves and type risk — these are the design decisions that will make the site memorable.

## Rules

- Never produce the same hue twice in a session — vary intentionally.
- Never choose Minimal/Clean as the default when context is ambiguous — pick something with more personality.
- Dark-base themes (Luxury, Retro-Futuristic, Tech-Industrial, Dark/Moody) are valid for any business type. Don't default to light themes.
- The design brief is the contract — all other skills must read it before generating anything.
- The creative concept is the foundation — if a token or layout choice contradicts the concept, the concept wins.
- Signature moves are not optional decoration — they are required visual commitments. If they don't appear, the site will look generic.
- If `.claude/design-brief.md` already exists, show it to the user and ask: update direction, or keep it?
