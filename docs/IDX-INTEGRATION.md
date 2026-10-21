# IDX / MLS Search Integration

Every listing search on the site goes through **one component**,
`src/components/idx/IdxSearch.astro`. It is already placed on:

| Location | Usage |
| --- | --- |
| `/search/` | `<IdxSearch minHeight={900} />` (all markets, receives hero quick-search params) |
| Each town page (`/{town}-nj/#listings`) | `<IdxSearch city={town.idx.city} heading="…" />` |

You switch providers with **environment variables only**. Until one is set, a
branded placeholder is shown that still captures leads ("Get Listings by Email").

```bash
cp .env.example .env
```

---

## Step 0 — Get IDX approval

IDX feeds are licensed by your MLS (for these towns that is typically
**Monmouth Ocean Regional MLS / MORMLS** or **Bright MLS** — confirm which one
the agent belongs to). The broker of record must sign the IDX agreement, then
the vendor is approved to pull the feed. Expect 1–3 weeks. Required MLS
disclaimers/logos go in `Footer.astro` (a generic one is already there).

## Option A — Hosted search page in an iframe (fastest; any vendor)

Works with IDX Broker, iHomefinder, Showcase IDX, Real Geeks, SimplyRETS-hosted
pages, etc.

```env
PUBLIC_IDX_PROVIDER=iframe
PUBLIC_IDX_IFRAME_URL=https://search.example-idx.com/results?city={city}
```

- `{city}` is replaced with each town's `idx.city` value from `src/data/towns.ts`
  (e.g. `Point Pleasant`, `Stafford` for Manahawkin — match how your MLS names it).
- The hero quick search sends `?city=&max=&beds=` to `/search/`. Map these to your
  vendor's query parameter names in `IDX_PARAM_MAP` at the bottom of
  `src/pages/search.astro`.
- Iframes use `loading="lazy"` so they don't slow the first paint.

## Option B — IDX Broker

```env
PUBLIC_IDX_PROVIDER=idx-broker
PUBLIC_IDX_BROKER_DOMAIN=https://letsbuyhouses.idxbroker.com
```

This loads IDX Broker's hosted results page for each town. For the best
result, create a **Saved Link** per town in the IDX Broker dashboard and swap
`idxSearchUrl()` in `src/lib/idx.ts` to return those URLs. Also set the IDX
Broker "wrapper" to `https://letsbuyhouses.com/search/` so the hosted
listing-detail pages share your header and footer.

## Option C — Vendor JavaScript widget

For vendors that give you a `<script>` embed (e.g. IDX Broker widgets, iHomefinder
Kestrel, Showcase IDX):

```env
PUBLIC_IDX_PROVIDER=script
PUBLIC_IDX_SCRIPT_SRC=https://vendor.example.com/widget.js
```

The component renders a `.idx-widget` container and injects the script **only
when it scrolls near the viewport**, which protects page speed. If a vendor needs
a per-town widget ID, pass it in: `<IdxSearch city="Brick" widgetId="12345" />`.
If the vendor's snippet needs extra attributes, edit the `load()` function in
`IdxSearch.astro`.

## Option D (best for SEO) — API-rendered listings

iframes and JS widgets show listings to people, **but Google gives you little or no
credit for them**. To have listings indexed on your own domain, pull them from
an API at build or request time:

- **SimplyRETS** (`https://api.simplyrets.com/properties?cities=Brick`)
- **Spark API**, **Bridge Interactive**, or **Trestle** (RESO Web API)

Recommended path:

1. Add an SSR adapter (`npx astro add netlify` or `vercel`) so pages can refresh
   listings without a full rebuild, or rebuild on a schedule (for example every hour).
2. Create `src/lib/listings.ts` that fetches from the API using a **server-only**
   key (`IDX_API_KEY`, no `PUBLIC_` prefix).
3. Add a `ListingCard.astro` grid under the IDX widget on each town page, and
   `src/pages/listing/[mls].astro` for detail pages with `RealEstateListing` schema.

Keep `IdxSearch` for the interactive map/search and use the API grid for SEO.

## Checklist before launch

- [ ] MLS IDX agreement signed; vendor approved
- [ ] `idx.city` values in `towns.ts` match MLS city names
- [ ] Vendor lead capture/registration is routed to the same CRM as site forms
- [ ] MLS-required disclaimer and logo in the footer and on search pages
- [ ] Lighthouse mobile score checked **after** the widget is live
