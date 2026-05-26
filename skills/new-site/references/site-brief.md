# Site Brief Reference

## Brief Protocol — Five Required Questions

When Phase 0 Q&A is needed, ask exactly these five questions. Map single-prompt content to these fields; note inferred vs missing.

1. **Business type & name** — what do they do and what are they called?
2. **The one action** — what should a visitor do when they land on the site?
3. **The differentiator** — what keeps customers coming back that competitors can't honestly say about themselves?
4. **The customer** — describe the best customer as a person: who are they, and why did they choose this business over others?
5. **Look, feel & assets** — a reference site with the right feeling, what to avoid, and what content already exists (photos, logo, reviews)

## Scraping Existing Sites

If the client mentions an existing site URL or reference site, scrape it with Firecrawl and auto-populate the brief before asking any questions.

**What to extract:**
- Existing copy: headlines, service descriptions, about text
- Page structure and navigation items
- Contact info: address, phone, email
- Business hours
- Any photos, logos, or assets referenced

**How to use:** Populate brief fields from scraped content, noting what was scraped vs what was provided. Only ask questions for fields that couldn't be filled from the scrape.

## Adjective Derivation for design-direction

Brand adjectives come from the brief, not from the industry. When the user's prompt includes explicit feel words ("earthy greens", "clean and professional", "bold and energetic"), extract them directly. When they don't, derive from the differentiator and best-customer answers:

| If the differentiator says… | → Adjectives lean toward… |
|---|---|
| Fast, reliable, emergency available | dependable, no-nonsense, confident |
| Gentle, family-friendly, accepting new patients | warm, approachable, reassuring |
| Local, personal, community-focused | authentic, grounded, unpretentious |
| Expert, specialist, years of experience | authoritative, precise, trustworthy |
| Premium, bespoke, white-glove | refined, quiet, considered |
| Affordable, transparent, fair | honest, straightforward, accessible |
| Creative, unique, one-of-a-kind | distinctive, expressive, individual |

For anti-adjectives, use the "avoid" field from the look/feel answer. Common mappings:
- "Don't look corporate" → anti: corporate, sterile, generic
- "Not clinical" → anti: cold, technical, institutional
- "Not cheap-looking" → anti: garish, cluttered, discount

**The goal is 3 adjectives that are specific enough for design-direction to make a non-obvious archetype choice.** "Professional and modern" is too generic. "Precise, unhurried, considered" gives design-direction something to work with.

## Page → Section Mapping

### Home
- `hero` — Primary headline, subheadline, CTA button(s)
- `services-teaser` — 3-column service cards teaser
- `testimonials` — Customer testimonials / social proof
- `cta` — Bottom call-to-action band

### About
- `about` — Story, team photo, trust signals

### Services
- `services-grid` — Full services listing with descriptions

### Contact
- `contact` — Contact form + address/hours

### Blog (optional)
- `blog-listing` — Post cards with pagination

### Pricing (optional)
- `pricing` — 2–3 tier pricing cards

### FAQ (optional)
- `faq` — Accordion Q&A

### Portfolio (optional)
- `portfolio-grid` — Project/work image grid

## Industry-Specific Copy Hints

### Plumbing / HVAC
- Headline: "Fast, Reliable [Service] in [City]"
- Trust: licensed/insured, years of experience, emergency available
- CTA: "Get a Free Quote" or "Call Now"

### Dental
- Headline: "A Healthy Smile Starts Here"
- Trust: accepting new patients, gentle approach, family-friendly
- CTA: "Book Your Appointment"

### Legal
- Headline: "Experienced [Practice Area] Attorneys"
- Trust: years of practice, case wins, free consultation
- CTA: "Schedule a Consultation"

### Restaurant
- Headline: "[Cuisine] Made with Care in [City]"
- Trust: local ingredients, chef bio, years open
- CTA: "View Our Menu" or "Reserve a Table"

### Consulting
- Headline: "Results-Driven [Specialty] Consulting"
- Trust: clients served, industries, methodology
- CTA: "Book a Discovery Call"

## Example Single-Prompt Patterns

These prompts extract all required info from one message — no Q&A phase. Include feel words so design-direction has adjectives to work with:

```
/astro-layer:new-site — Martinez Plumbing, Austin TX, plumbing & HVAC,
  pages: Home/About/Services/Contact,
  feel: dependable, no-nonsense, local

/astro-layer:new-site — Lakeview Dental, friendly family dentist,
  pages: Home/Services/About/Contact/Blog,
  feel: warm, gentle, reassuring, not clinical

/astro-layer:new-site — Summit Strategy Consulting, executive coaching,
  pages: Home/About/Services/Pricing/Contact,
  feel: precise, authoritative, considered, not generic corporate

/astro-layer:new-site — Green Thumb Landscaping, residential & commercial,
  pages: Home/Services/Portfolio/About/Contact,
  feel: grounded, craft-focused, unhurried

/astro-layer:new-site — Bella Beauty Studio, full-service hair salon,
  pages: Home/Services/About/Booking/Contact,
  feel: refined, individual, confident, not chain-salon
```

When feel words are absent from the prompt, derive adjectives from the differentiator and best-customer answers using the Adjective Derivation table above before invoking design-direction.

## Token Generation

Token generation is handled entirely by `design-direction`. Do not adjust token values manually in `new-site`. design-direction writes the complete `src/styles/tokens.css` and `.claude/design-brief.md` — all downstream skills (new-section, new-component) read the brief to stay coherent with the visual identity.
