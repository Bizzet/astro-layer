# Local SEO Page Patterns

---

## SERVICE PILLAR

---

## services.ts — Service Data Schema

```ts
// src/data/services.ts

export interface ServiceEntry {
  name: string;         // Display name: "Drain Cleaning"
  slug: string;         // URL segment: "drain-cleaning"
  headline: string;     // H1 text: "Professional Drain Cleaning Service"
  description: string;  // Meta description, 150–160 chars, includes service keyword + primary city
  blurb: string;        // 2–3 sentences for page intro — must be service-specific, not boilerplate
  benefits: string[];   // ["Same-day service", "Licensed technicians", "Upfront pricing"]
  isPrimary: boolean;   // true = main/flagship service (shown prominently in nav/hero)
}

export const services: ServiceEntry[] = [
  {
    name: "Drain Cleaning",
    slug: "drain-cleaning",
    headline: "Professional Drain Cleaning Service",
    description: "Fast, reliable drain cleaning in Austin TX. Martinez Plumbing clears clogs in sinks, tubs, and main lines — same-day service available.",
    blurb: "Clogged drains slow everything down. Our licensed plumbers use professional-grade equipment to clear blockages completely, not just punch through them temporarily.",
    benefits: ["Same-day service available", "Camera inspection included", "All drain types: sink, tub, main line", "Upfront flat-rate pricing"],
    isPrimary: true,
  },
  {
    name: "Water Heater Repair",
    slug: "water-heater-repair",
    headline: "Water Heater Repair & Replacement",
    description: "Water heater repair and replacement in Austin TX. Martinez Plumbing services all makes and models — tankless, gas, and electric.",
    blurb: "A failing water heater disrupts your entire household. We diagnose and repair all makes and models, and offer same-day replacement when repair isn't cost-effective.",
    benefits: ["All brands serviced", "Tankless specialists", "Same-day replacement available", "10-year warranty on new units"],
    isPrimary: false,
  },
  // Add remaining services — one entry per service the business offers.
  // Every description and blurb must be unique and service-specific.
];

export const primaryService = services.find((s) => s.isPrimary)!;
```

---

## Services index page

```astro
---
// src/pages/services/index.astro
import Base from '../../layouts/Base.astro';
import { services } from '../../data/services';
import { primaryCity } from '../../data/locations';

const businessName = "Business Name";
const title = `Services | ${businessName}`;
const description = `${businessName} offers ${services.map(s => s.name).join(', ')} in ${primaryCity.city}, ${primaryCity.state} and surrounding areas.`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": businessName,
  "url": Astro.site?.href ?? "",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": `${businessName} Services`,
    "itemListElement": services.map((s) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": s.name,
        "url": `${Astro.site?.href ?? ""}services/${s.slug}/`,
      },
    })),
  },
};
---
<Base {title} {description} jsonLd={jsonLd}>
  <div class="container" style="padding-block: var(--space-20);">
    <h1>Our Services</h1>
    <p>Serving {primaryCity.city}, {primaryCity.state} and surrounding communities.</p>

    <ul class="services-grid" role="list">
      {services.map((svc) => (
        <li>
          <a href={`/services/${svc.slug}/`} class="service-card">
            <span class="service-name">{svc.name}</span>
            <span class="service-blurb">{svc.blurb}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
</Base>

<style>
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-6);
    list-style: none;
    padding: 0;
    margin-block-start: var(--space-10);
  }
  .service-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .service-card:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-sm);
  }
  .service-name {
    font-weight: var(--font-semibold);
    color: var(--color-heading);
  }
  .service-blurb {
    font-size: var(--text-sm);
    color: var(--color-muted);
  }
</style>
```

---

## Dynamic service page

```astro
---
// src/pages/services/[service].astro
import Base from '../../layouts/Base.astro';
import { services } from '../../data/services';
import { locations, primaryCity } from '../../data/locations';

export function getStaticPaths() {
  return services.map((entry) => ({
    params: { service: entry.slug },
    props: { entry },
  }));
}

interface Props {
  entry: typeof services[0];
}

const { entry } = Astro.props;
const businessName = "Business Name";

const title = `${entry.name} in ${primaryCity.city}, ${primaryCity.state} | ${businessName}`;
const description = entry.description;

// Breadcrumb JSON-LD
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",     "item": Astro.site?.href ?? "/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": `${Astro.site?.href ?? ""}services/` },
    { "@type": "ListItem", "position": 3, "name": entry.name, "item": Astro.url.href },
  ],
};

// Service + LocalBusiness JSON-LD
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": entry.name,
  "description": entry.blurb,
  "provider": {
    "@type": "LocalBusiness",
    "name": businessName,
    "url": Astro.site?.href ?? "",
    "areaServed": locations.map((l) => ({ "@type": "City", "name": l.city })),
  },
  "areaServed": locations.map((l) => ({ "@type": "City", "name": l.city })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [breadcrumbLd, serviceLd],
};
---
<Base {title} {description} {jsonLd}>
  <div class="container" style="padding-block: var(--space-20);">

    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li><a href="/">Home</a></li>
        <li><a href="/services/">Services</a></li>
        <li aria-current="page">{entry.name}</li>
      </ol>
    </nav>

    <h1>{entry.headline}</h1>

    <p class="intro">{entry.blurb}</p>

    {entry.benefits.length > 0 && (
      <ul class="benefits">
        {entry.benefits.map((b) => <li>{b}</li>)}
      </ul>
    )}

    <!-- Reuse the existing CTA section component -->
    <!-- <CTASection /> -->

    <!-- Internal links to location pages (cross-pillar linking) -->
    <section class="service-areas">
      <h2>Available In</h2>
      <ul class="area-list" role="list">
        {locations.map((loc) => (
          <li>
            <a href={`/locations/${loc.slug}/`}>
              {entry.name} in {loc.city}, {loc.state}
            </a>
          </li>
        ))}
      </ul>
    </section>

  </div>
</Base>

<style>
  .breadcrumb {
    display: flex;
    gap: var(--space-2);
    list-style: none;
    padding: 0;
    font-size: var(--text-sm);
    margin-block-end: var(--space-8);
  }
  .breadcrumb li + li::before {
    content: "/";
    margin-inline-end: var(--space-2);
    color: var(--color-muted);
  }
  .intro {
    font-size: var(--text-lg);
    max-width: 65ch;
    margin-block: var(--space-6) var(--space-8);
  }
  .benefits {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding-inline-start: var(--space-5);
    margin-block-end: var(--space-10);
  }
  .service-areas {
    margin-block-start: var(--space-16);
    padding-block-start: var(--space-10);
    border-block-start: 1px solid var(--color-border);
  }
  .area-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    list-style: none;
    padding: 0;
    margin-block-start: var(--space-4);
    font-size: var(--text-sm);
  }
</style>
```

---

## LOCATION PILLAR

---

## locations.ts — City Data Schema

```ts
// src/data/locations.ts

export interface CityEntry {
  city: string;         // Display name: "Round Rock"
  state: string;        // Two-letter abbreviation: "TX"
  slug: string;         // URL segment: "round-rock-tx"
  isPrimary: boolean;   // true = the business's actual home city
  county: string;       // "Williamson"
  lat: number;          // Decimal degrees
  lng: number;
  distanceMi: number;   // Miles from primary city (0 for primary)
  blurb: string;        // 1–2 unique sentences for the page intro — must be city-specific
  landmarks: string[];  // Nearby areas/neighborhoods for content variation
}

export const locations: CityEntry[] = [
  {
    city: "Austin",
    state: "TX",
    slug: "austin-tx",
    isPrimary: true,
    county: "Travis",
    lat: 30.2672,
    lng: -97.7431,
    distanceMi: 0,
    blurb: "Austin's rapid growth has made reliable local services more essential than ever across its expanding neighborhoods.",
    landmarks: ["South Congress", "East Austin", "The Domain", "Zilker Park"],
  },
  {
    city: "Round Rock",
    state: "TX",
    slug: "round-rock-tx",
    isPrimary: false,
    county: "Williamson",
    lat: 30.5083,
    lng: -97.6789,
    distanceMi: 20,
    blurb: "Round Rock has grown from a quiet suburb into one of the fastest-expanding communities in Central Texas, with thousands of new homes built every year.",
    landmarks: ["La Frontera", "Old Settlers Park", "IH-35 corridor"],
  },
  // Add 6–10 more nearby cities following the same shape.
  // Every blurb must be unique and city-specific — never generic filler.
];

export const primaryCity = locations.find((l) => l.isPrimary)!;
export const serviceAreaCities = locations.filter((l) => !l.isPrimary);
```

**Generation rule:** Use geographic knowledge to pick 8–12 realistic nearby cities. Fill each `blurb` with something factually specific (growth trends, character, known district, industry). Fill `landmarks` with real local areas. Never use placeholder text.

---

## Service Areas index page

```astro
---
// src/pages/locations/index.astro
import Base from '../../layouts/Base.astro';
import LocationCard from '../../components/LocationCard.astro';
import { locations, primaryCity } from '../../data/locations';

const title = `Service Areas | Business Name`;
const description = `Business Name serves ${primaryCity.city} and surrounding communities including ${locations.slice(1, 4).map(l => l.city).join(', ')}, and more across ${primaryCity.state}.`;

// LocalBusiness with areaServed as an array of all cities
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "url": Astro.site?.href ?? "",
  "areaServed": locations.map((l) => ({
    "@type": "City",
    "name": l.city,
    "containedInPlace": {
      "@type": "State",
      "name": l.state,
    },
  })),
};
---
<Base {title} {description} jsonLd={jsonLd}>
  <div class="container" style="padding-block: var(--space-20);">
    <h1>Service Areas</h1>
    <p>We proudly serve {primaryCity.city} and the surrounding communities listed below.</p>

    <ul class="location-grid" role="list">
      {locations.map((entry) => (
        <li>
          <LocationCard entry={entry} />
        </li>
      ))}
    </ul>
  </div>
</Base>

<style>
  .location-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--space-6);
    list-style: none;
    padding: 0;
    margin-block-start: var(--space-10);
  }
</style>
```

---

## Dynamic location page

```astro
---
// src/pages/locations/[city].astro
import Base from '../../layouts/Base.astro';
import { locations, primaryCity } from '../../data/locations';
import { services } from '../../data/services';

export function getStaticPaths() {
  return locations.map((entry) => ({
    params: { city: entry.slug },
    props: { entry },
  }));
}

interface Props {
  entry: typeof locations[0];
}

const { entry } = Astro.props;
const businessName = "Business Name";
const serviceType = "Plumbing Services"; // replace with actual service from CLAUDE.md

const title = `${serviceType} in ${entry.city}, ${entry.state} | ${businessName}`;
const description = `${businessName} provides ${serviceType.toLowerCase()} in ${entry.city}, ${entry.state}. ${entry.blurb}`;

// Breadcrumb JSON-LD
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": Astro.site?.href ?? "/",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Service Areas",
      "item": `${Astro.site?.href ?? ""}locations/`,
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": entry.city,
      "item": Astro.url.href,
    },
  ],
};

// LocalBusiness JSON-LD scoped to this city
const localBizLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": businessName,
  "url": Astro.url.href,
  "areaServed": {
    "@type": "City",
    "name": entry.city,
    "containedInPlace": {
      "@type": "State",
      "name": entry.state,
    },
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": entry.lat,
    "longitude": entry.lng,
  },
};

// Wrap both schemas in @graph
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [breadcrumbLd, localBizLd],
};
---
<Base {title} {description} {jsonLd}>
  <div class="container" style="padding-block: var(--space-20);">

    <!-- Breadcrumb nav (visual) -->
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li><a href="/">Home</a></li>
        <li><a href="/locations/">Service Areas</a></li>
        <li aria-current="page">{entry.city}</li>
      </ol>
    </nav>

    <h1>{serviceType} in {entry.city}, {entry.state}</h1>

    <p class="intro">
      {entry.blurb} {businessName} has been serving {entry.city} and {entry.county} County
      {entry.distanceMi > 0 ? `— just ${entry.distanceMi} miles from our home base in ${primaryCity.city}` : ""}.
    </p>

    {entry.landmarks.length > 0 && (
      <p>
        We cover all areas of {entry.city}, including {entry.landmarks.join(', ')}.
      </p>
    )}

    <!-- Reuse the existing CTA section component -->
    <!-- <CTASection /> -->

    <!-- Internal links to service pages (cross-pillar linking) -->
    <section class="city-services">
      <h2>Services in {entry.city}</h2>
      <ul class="service-list" role="list">
        {services.map((svc) => (
          <li>
            <a href={`/services/${svc.slug}/`}>
              {svc.name} in {entry.city}, {entry.state}
            </a>
          </li>
        ))}
      </ul>
    </section>

  </div>
</Base>

<style>
  .breadcrumb {
    display: flex;
    gap: var(--space-2);
    list-style: none;
    padding: 0;
    font-size: var(--text-sm);
    margin-block-end: var(--space-8);
  }
  .breadcrumb li + li::before {
    content: "/";
    margin-inline-end: var(--space-2);
    color: var(--color-muted);
  }
  .intro {
    font-size: var(--text-lg);
    max-width: 65ch;
    margin-block: var(--space-6) var(--space-8);
  }
  .city-services {
    margin-block-start: var(--space-16);
    padding-block-start: var(--space-10);
    border-block-start: 1px solid var(--color-border);
  }
  .service-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    list-style: none;
    padding: 0;
    margin-block-start: var(--space-4);
    font-size: var(--text-sm);
  }
</style>
```

---

## LocationCard component

```astro
---
// src/components/LocationCard.astro
import type { CityEntry } from '../data/locations';

interface Props {
  entry: CityEntry;
}
const { entry } = Astro.props;
---
<a href={`/locations/${entry.slug}/`} class="location-card">
  <span class="city-name">{entry.city}{entry.isPrimary ? " ★" : ""}</span>
  <span class="meta">{entry.county} County</span>
  {entry.distanceMi > 0 && (
    <span class="distance">{entry.distanceMi} mi away</span>
  )}
</a>

<style>
  .location-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: var(--space-5) var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .location-card:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-sm);
  }
  .city-name {
    font-weight: var(--font-semibold);
    color: var(--color-heading);
  }
  .meta,
  .distance {
    font-size: var(--text-sm);
    color: var(--color-muted);
  }
</style>
```

---

## Homepage JSON-LD update (both pillars)

When both pillars exist, update the homepage `LocalBusiness` to declare all served cities **and** all services offered:

```ts
import { locations } from '../data/locations';
import { services } from '../data/services';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  // ... address, telephone, geo, etc. ...
  "areaServed": locations.map((l) => ({
    "@type": "City",
    "name": l.city,
  })),
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": services.map((s) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": s.name,
        "url": `${Astro.site?.href ?? ""}services/${s.slug}/`,
      },
    })),
  },
};
```

---

## BreadcrumbList JSON-LD (reusable pattern)

Use on any page deeper than one level:

```ts
const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",        "item": `${Astro.site?.href}` },
    { "@type": "ListItem", "position": 2, "name": "Parent Page", "item": `${Astro.site?.href}parent/` },
    { "@type": "ListItem", "position": 3, "name": "Current",     "item": Astro.url.href },
  ],
};
```

When a page needs multiple schemas, wrap in `@graph`:

```ts
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [breadcrumbLd, localBizLd],
};
```
