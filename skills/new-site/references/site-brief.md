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

## Industry → Color Mapping

| Industry | Brand Hue | Tone | Notes |
|---|---|---|---|
| Plumbing / HVAC | Earthy greens (hsl 140–160) | Trustworthy, earthy | Deep green or teal |
| Dental / Medical | Clean blues (hsl 200–220) | Clinical, calm | Soft blue-white |
| Legal / Finance | Confident navy (hsl 220–240) | Professional, authoritative | Deep navy |
| Restaurant / Food | Warm ambers (hsl 30–50) | Inviting, appetizing | Warm orange-gold |
| Fitness / Wellness | Energetic orange-red (hsl 10–30) | Energetic, motivating | Vibrant accent |
| Consulting | Slate blue (hsl 215–230) | Strategic, trustworthy | Muted professional |
| Real Estate | Earthy neutrals (hsl 35–45) | Warm, approachable | Tan with dark text |
| Landscaping | Deep greens (hsl 130–150) | Natural, growth-oriented | Forest green |
| Beauty / Salon | Rose pinks (hsl 340–360) | Elegant, modern | Blush pink |
| Tech / SaaS | Indigo / violet (hsl 250–270) | Innovative, modern | Deep purple-blue |

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

These prompts extract all required info from one message — no Q&A phase:

```
/astro-layer:new-site — Martinez Plumbing, Austin TX, plumbing & HVAC,
  pages: Home/About/Services/Contact, earthy greens

/astro-layer:new-site — Lakeview Dental, friendly family dentist,
  pages: Home/Services/About/Contact/Blog, clean blue and white

/astro-layer:new-site — Summit Strategy Consulting, executive coaching,
  pages: Home/About/Services/Pricing/Contact, confident navy

/astro-layer:new-site — Green Thumb Landscaping, residential & commercial,
  pages: Home/Services/Portfolio/About/Contact, deep forest green

/astro-layer:new-site — Bella Beauty Studio, full-service hair salon,
  pages: Home/Services/About/Booking/Contact, elegant rose pink
```

## Token Adjustment by Industry

When adjusting `--color-brand` for industry, also update:
- `--color-brand-hover` (5–8 points darker lightness)
- `--color-brand-subtle` (95–97% lightness, same hue)

Example — earthy green (plumbing):
```css
--color-brand:        hsl(148 55% 38%);
--color-brand-hover:  hsl(148 55% 30%);
--color-brand-subtle: hsl(148 55% 96%);
```
