# Jacquelyn Guevara: Real Estate Website

The personal website of Jacquelyn Guevara, Associate with RE/MAX Revolution, serving **20 Ocean and Monmouth County service areas**, from Toms River, Brick, and Manahawkin to
Long Beach Island and the barrier-island towns (full list in `src/data/towns.ts`). The site name is Let's Buy
Houses (letsbuyhouses.com).

**Stack:** [Astro](https://astro.build) (static HTML, very little JavaScript) · Tailwind CSS v4 ·
Astro image optimization (AVIF/WebP) · self-hosted fonts · JSON-LD structured data · sitemap.

## Quick start

```bash
npm install
cp .env.example .env     # optional: site mode, form endpoint, IDX provider
npm run dev              # http://localhost:4321/lets-buy-houses/
npm run build            # type-check + static build to dist/
npm run preview          # serve the build
```

## Preview vs. production

`PUBLIC_SITE_MODE` controls sample content. Local development defaults to `preview`; the GitHub Pages
deploy defaults to `production` (set the repository variable to `preview` to publish a review build).

| | `preview` (default) | `production` |
|---|---|---|
| Sample listings | Shown, labeled **Sample**, no inquiry button | Never shown |
| Missing content (testimonials, market stats, marketing services) | Dashed “Awaiting content” notes | Section hidden |
| Top banner and footer launch notes | Shown | Hidden |

Forms are separate. Until `PUBLIC_FORM_ENDPOINT` is set, every form says it’s preview-only and shows
“Nothing was sent” after submitting, in either mode. Success appears only after the form service
confirms receipt.

## Editing content (no HTML needed)

| What | Where |
|---|---|
| Name, title, license, brokerage, phone, email, bio, “Why work with Jacquelyn” points | `src/data/site.ts` |
| Community pages (copy, highlights, neighborhoods, tips, FAQs, market stats) | `src/data/towns.ts` |
| Featured listings (real, approved only) | `src/data/listings.ts` |
| Sample listings for the preview | `src/data/demo/listings.ts` |
| Client reviews (exact text) and the review total shown in the header | `src/data/testimonials.ts` |
| Home Transformations (renovation projects with before/after photos; hidden live until added) | `src/data/transformations.ts` |
| Links to her Zillow, Realtor.com, and RealSatisfied profiles (for “Read all reviews”) | `src/data/site.ts` (`social`) |
| Photos and their credits | `src/assets/photos/` + `src/data/photos.ts` |
| Interface text (nav, buttons, form messages) | `src/i18n/en.ts` |
| Colors and fonts | `src/styles/global.css` (`@theme`) |

**Rules for content:** never add awards, sales numbers, reviews, languages or affiliations until they’re
confirmed in writing. Community copy should describe housing, amenities, transportation and local
resources. It must not describe who lives there or who a town “appeals to” (fair housing).

**Photos:** add a JPG to `src/assets/photos/` named after its key (`hero`, `brick`, `point-pleasant`,
`manahawkin`, `manalapan`, `path-buy`, `path-sell`), then add its credit in `src/data/photos.ts`.
Astro resizes it automatically. Current photos are public-domain or Creative Commons images,
credited on `/photo-credits/`.

## Pages

`/` · `/buy/` (with the mortgage calculator) · `/sell/` · `/communities/` · `/reviews/` · `/about/` · `/contact/` ·
19 community pages (one per town in `src/data/towns.ts`; “Point Pleasant Boro” redirects to Point Pleasant) · `/privacy/` (draft) ·
`/photo-credits/` · 404. The old `/search/` and `/home-valuation/` addresses redirect to `/buy/` and `/sell/`.

## Integrations

- **Forms:** set `PUBLIC_FORM_ENDPOINT` to a service that accepts a POST and answers JSON
  (e.g. a free Formspree form set to deliver to Jacquelyn’s email). Forms validate input and show
  sending, error and success states.
- **Listings:** until an IDX widget is connected, each community’s listings section links to the live MLS
  search on her RE/MAX Revolution site (`site.listingsSite` + each town’s `remaxArea`).
- **MLS/IDX search:** see `docs/IDX-INTEGRATION.md`. Without a provider, search areas invite
  visitors to send Jacquelyn their criteria instead of showing a fake search.
- **Analytics:** off unless `PUBLIC_GA_MEASUREMENT_ID` is set. If you turn it on, update `/privacy/`.

## Deployment

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`. Set the `PUBLIC_*`
values as repository variables (Settings → Secrets and variables → Actions → Variables).

The site currently builds with `base: '/lets-buy-houses'` for the preview at
https://stitchesfb.github.io/lets-buy-houses/. Wrap root-relative links in `withBase()` from
`src/lib/paths.ts`.

**Moving to letsbuyhouses.com later:**
1. Set `base` to `'/'` in `astro.config.mjs`, and `liveOrigin` to `site.url` in `src/data/site.ts`.
2. Enter the domain under Settings → Pages → Custom domain. Actions deploys ignore a `CNAME` file.
3. At the registrar, remove any forwarding. Point the apex `A` records to 185.199.108.153,
   185.199.109.153, 185.199.110.153 and 185.199.111.153, and `www` (CNAME) to `stitchesfb.github.io`.
4. Turn on Enforce HTTPS.

## Before launch

- [ ] Broker reviews the footer disclosure; add the brokerage office phone (`site.brokerage.officePhone`)
- [ ] Form service connected (`PUBLIC_FORM_ENDPOINT`) and a test message received
- [ ] Privacy page reviewed by the broker or an attorney
- [ ] Add her Zillow, Realtor.com, and RealSatisfied profile links so visitors can read all 30+ reviews
- [ ] Photos for Bayville, Lacey, Lakewood, Little Egg Harbor, and Tinton Falls (placeholders today)
- [ ] Real listings added to `src/data/listings.ts`, plus market stats and marketing services (or left hidden)
- [ ] IDX approved and connected, with the MLS disclaimer added (or leave the inquiry fallback)
- [ ] `PUBLIC_SITE_MODE=production`
- [ ] Validate structured data: https://search.google.com/test/rich-results
