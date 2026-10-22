# Let's Buy Houses — letsbuyhouses.com

A fast, SEO-focused real estate website for a REALTOR® with 17 years of
experience serving **Manalapan, Brick, Point Pleasant, and Manahawkin, NJ**.

**Stack:** [Astro](https://astro.build) (static HTML, almost no JavaScript sent to the browser) ·
Tailwind CSS v4 · self-hosted variable fonts · JSON-LD structured data · automatic sitemap.

## Quick start

```bash
npm install
cp .env.example .env     # optional: form endpoint, IDX provider, GA4
npm run dev              # http://localhost:4321
npm run build            # type-check + static build to dist/
npm run preview          # serve the production build
```

## Deployment

Pushing to `main` deploys to **GitHub Pages** via `.github/workflows/deploy.yml`
(type-check, build, publish). One-time setup:

1. Repo **Settings → Pages → Source: GitHub Actions**.
2. **Custom domain:** in **Settings → Pages → Custom domain**, enter `letsbuyhouses.com`
   (Actions deploys ignore a `CNAME` file). At the domain registrar, remove any domain
   forwarding, point the apex `A` records to GitHub Pages (185.199.108.153, .109.153,
   .110.153, .111.153) and `www` as a `CNAME` to `<owner>.github.io`. Then tick
   **Enforce HTTPS**. Until the domain is set, the `github.io/lets-buy-houses/` URL loads
   without styles, because the site is built for the domain root.
3. **Settings → Secrets and variables → Actions → Variables:** add the `PUBLIC_*` values
   from `.env.example`. **`PUBLIC_FORM_ENDPOINT` is required on GitHub Pages**, because
   Netlify Forms only work on Netlify.

The site is plain static files, so `dist/` also deploys to Netlify, Vercel or Cloudflare Pages unchanged.

## Project structure

```
src/
├── data/                  ← EDIT CONTENT HERE (no HTML needed)
│   ├── site.ts            agent/brokerage NAP, phone, license, social, stats
│   ├── towns.ts           all 4 town pages: headline, intro, market overview, buyer/seller tips, FAQs, stats
│   ├── testimonials.ts    client reviews (placeholders, replace with real ones)
│   └── videos.ts          YouTube video IDs for the Video Hub
├── layouts/
│   └── BaseLayout.astro   <head>, SEO, sitewide schema, header/footer, GA4
├── components/
│   ├── layout/            Header (Communities menu), Footer (NAP + NJ disclosures), MobileCtaBar
│   ├── home/              Hero, StatsBanner, TownGrid, Testimonials, VideoHub
│   ├── town/              MarketStats, BuySellTips, FaqList
│   ├── forms/LeadForm     home-valuation + contact form (variant prop)
│   ├── idx/               IdxSearch (the IDX container), QuickSearch (hero bar)
│   ├── seo/               SEO meta tags, JsonLd
│   └── ui/                YouTubeEmbed (click-to-load), Breadcrumbs, AgentCta
├── lib/
│   ├── schema.ts          RealEstateAgent, WebSite, Breadcrumb, FAQ, Video JSON-LD
│   ├── idx.ts             IDX provider config (env-driven)
│   └── lead-form.ts       form submit, UTM capture, GA4 lead event
├── pages/
│   ├── index.astro        homepage
│   ├── [town].astro       → /manalapan-nj/ /brick-nj/ /point-pleasant-nj/ /manahawkin-nj/
│   ├── search.astro       full IDX search
│   ├── home-valuation.astro, contact.astro, thank-you.astro (conversion page), 404.astro
│   └── robots.txt.ts
└── styles/global.css      brand colors/fonts (@theme) + button/form utilities
public/images/             placeholder SVGs; swap for real photos
docs/IDX-INTEGRATION.md    how to plug in the MLS search
```

## SEO features included

- A unique title, meta description, canonical URL, and Open Graph/Twitter tags on every page
- **RealEstateAgent** schema with `areaServed` for all four towns and the brokerage as `parentOrganization`
- **BreadcrumbList**, **FAQPage**, and **WebPage → City** schema on town pages; **VideoObject** for published videos
- One H1 per page; H2s on town pages target buyer and seller searches ("waterfront homes", "selling your home")
- URLs like `/point-pleasant-nj/` that match "Point Pleasant NJ real estate" searches
- Sitemap (`/sitemap-index.xml`), robots.txt, `noindex` on the thank-you page
- Speed: static HTML, self-hosted fonts, lazy-loaded images, YouTube players that load only on click, IDX scripts that load only when scrolled into view

## Pre-launch checklist

- [ ] Fill in every `TODO` in `src/data/site.ts`. Name, address, and phone must match the Google Business Profile **exactly**.
- [ ] NJ advertising rules: agent license #, brokerage name, and office phone are shown in the footer. Have the broker review it.
- [ ] Real headshot → `public/images/agent/`; real town photos → `public/images/towns/` (WebP, about 200 KB or less)
- [ ] Replace sample testimonials with **real** reviews. Never publish invented ones.
- [ ] Replace placeholder stats (`site.stats`) and town `marketStats` with verified MLS numbers
- [ ] Confirm each town's `idxCity` matches how the MLS spells it (Manahawkin listings are often filed under Stafford Township)
- [ ] Add YouTube video IDs to `src/data/videos.ts`
- [ ] Set `PUBLIC_FORM_ENDPOINT` (or deploy on Netlify) and send a test lead
- [ ] Set up the IDX provider (see `docs/IDX-INTEGRATION.md`)
- [ ] Validate schema: https://search.google.com/test/rich-results
- [ ] Submit the sitemap in Google Search Console; link the site from the Google Business Profile

## Adding a town

Add an entry to `src/data/towns.ts` (and a photo in `public/images/towns/`).
The page, nav menu, footer link, homepage card, sitemap entry, form dropdowns,
and `areaServed` schema are all generated from that entry automatically.
