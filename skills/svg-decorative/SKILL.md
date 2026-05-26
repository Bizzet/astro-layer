---
name: svg-decorative
description: Use when adding decorative or structural SVG elements to sections or
  components — background shapes, texture overlays, geometric accents, atmospheric
  depth. Not for icons, logos, or section-to-section dividers.
paths:
  - src/components/decorative/**
  - src/**
---

# svg-decorative

Adds decorative SVG elements that give sections atmosphere, depth, and visual personality. Every SVG is archetype-derived — a Brutalist section gets hard geometry, not organic blobs.

**Scope of this skill:**
- Background fill shapes (blobs, geometric forms, organic fills)
- Texture overlays (SVG filter grain, noise, cross-hatch)
- Grid and pattern fills (dots, lines, isometric)
- Floating accent shapes (corners, edge ornaments, mid-section accents)

**Out of scope:**
- Section-to-section dividers (waves, torn paper, angled cuts) → `references/section-transitions.md`
- Icons and logos → wrap as `.astro` components directly
- SVG animation → hand off to the `animate` skill once placed

## Before generating anything

1. Read `.claude/design-brief.md`. The archetype, visual motif, and atmosphere stack determine which SVG category and shape vocabulary to use. A Luxury site does not get a wobble blob; a Playful site does not get a technical grid.
2. Check **Visual Motif** in the brief. If the motif is expressible as an SVG element (a grid, a geometric rule, a recurring shape), this is where it appears.
3. Check **Atmosphere stack**. Background texture and depth effects live here.

## Placement taxonomy

### Background layer
Sits behind section content. Section must have `position: relative; overflow: hidden` (or `overflow: visible` for a deliberate bleed). SVG is `position: absolute`.

```astro
<section class="my-section">
  <MyShape class="bg-shape" aria-hidden="true" />
  <div class="container"><!-- content --></div>
</section>

<style>
  .my-section { position: relative; overflow: hidden; }
  .bg-shape {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  .container { position: relative; z-index: 1; }
</style>
```

### Texture overlay
Sits on top of a colored or image background, adding grain or pattern. Uses `mix-blend-mode` or low `opacity`. Always `position: absolute; inset: 0; pointer-events: none`.

### Decorative accent
Floats at the edge or corner of a section — partially outside bounds (use `overflow: visible` on the section). Sized and positioned with explicit `top/right/bottom/left` or `translate`.

## Requirements

Every decorative SVG must:
- Include `aria-hidden="true"` and `focusable="false"` — decorative elements have no semantic value
- Use `viewBox` — never rely on width/height SVG attributes for sizing
- Use `preserveAspectRatio="none"` only for intentionally stretched shapes (dividers). Use `preserveAspectRatio="xMidYMid slice"` or `meet` for shapes that must hold their proportions
- Use `fill="var(--token)"` or `fill="currentColor"` — no hard-coded hex values inside SVG attributes
- For filter-based textures: define `<filter>` and `<defs>` inside the same SVG, never reference external IDs

## Color rules

| Use case | How to pass color |
|---|---|
| Shape fill matching a token | `fill="var(--color-brand-subtle)"` directly in the SVG path |
| Shape that inherits text color | `fill="currentColor"` |
| Multiple colors on one shape | Scoped `<style>` inside the SVG element |
| Texture opacity | `opacity` prop or CSS on the wrapper class |

Never put SVG in a CSS `background-image: url(...)` data URI — CSS custom properties don't resolve inside data URIs.

## Archetype → SVG category

| Archetype | Primary category | Shape vocabulary |
|---|---|---|
| Organic/Natural | Blob / organic fill | Irregular amorphous paths, soft asymmetry |
| Soft/Pastel | Blob / organic fill | Rounder blobs, higher fill opacity |
| Playful/Toy-like | Blob / organic fill | Exaggerated wobble, star bursts, zigzag |
| Coastal/Airy | Blob / layered wave fill | Multi-layer organic shapes, low opacity |
| Brutalist | Hard geometry | Raw polygons, thick rectangular bars, raw strokes |
| Art Deco/Geometric | Hard geometry + ornament | Fans, chevrons, symmetrical corner motifs |
| Tech-Industrial | Grid / line pattern | Dot grid, angled stripe, orthogonal lines |
| Retro-Futuristic | Grid / ring motif | Concentric circles, radar arcs, isometric grid |
| Editorial | Sparse line accent | Single hairline rule, minimal geometric mark |
| Minimal/Clean | Sparse line accent | One thin element max, disappears on mobile |
| Luxury/Refined | Ornament + texture grain | Fine symmetrical motif, subtle noise overlay |
| Dark/Moody | Texture grain + radial | High-opacity grain filter, dark radial vignette |

## Visual quality rules

- **One SVG element per section maximum.** Two decorative SVGs fight. If the section needs both a background shape and a texture, layer them inside a single component.
- **Scale with the section.** A background blob that's too small reads as a mistake. Background shapes should cover at least 60% of the section area.
- **Respect token opacity levels.** `var(--color-brand-subtle)` is already low-opacity — don't add an additional `opacity: 0.3` on top unless the result is checked.
- **Never use rainbow or multi-hue fills** unless the archetype is explicitly Playful and the brief allows it.
- **Accent shapes must not compete with content.** If the SVG is in the same visual region as the heading, reduce opacity or push it to the opposite corner.

## Reference

- `references/svg-patterns.md` — complete `.astro` component examples organized by category: blob shapes, hard geometry, texture overlays, grid patterns, ring motifs, corner ornaments, line accents
