# Handoff: letsbuyhouses.com

Website for **Jacquelyn (Jackie) Guevara**, licensed real estate salesperson with **1st Class
Real Estate Agency**, Toms River, NJ. Astro static site, deployed to GitHub Pages at
https://letsbuyhouses.com.

Last updated: 2026-11-07. Live commit on `main`: **`f73ab6a`** (IDX Broker dynamic wrapper).

---

## 1. What we built

### The site
- **Stack:** Astro 7 + Tailwind v4, static output. Production build: `PUBLIC_SITE_MODE=production npm run build`.
  Type check: `npx astro check` (expect 0 errors, 0 warnings).
- **Deploy:** every push to `main` runs `.github/workflows/deploy.yml` (build + GitHub Pages).
  The custom domain is set in GitHub Pages settings; GoDaddy DNS points the apex and `www` at GitHub.
- **Pages:** home, Buy, Sell, About, Reviews, Contact, Communities, Privacy, Photo credits, and
  **25 community guides** generated from `src/data/towns.ts` (one template, `src/pages/[town].astro`).
- **Forms:** all lead forms post to Jackie's Formspree form `https://formspree.io/f/xkjjzkwg`
  (default in the deploy workflow; local/review builds without `PUBLIC_FORM_ENDPOINT` show a
  "not connected" note on purpose). Logic in `src/lib/lead-form.ts`.
- **Structured data:** `src/lib/schema.ts`. Person (Jackie), separate brokerage entity (no phone),
  Service with `areaServed` = the 25 communities; sections of a township (Ortley Beach, Whiting,
  Bayville, Manahawkin) are typed as Places inside their municipality.

### IDX Broker integration (MLS search and buyer accounts)
- **Direct links** to Jackie's hosted IDX Broker pages, kept in one place: `idxLinks` in
  `src/lib/idx.ts`.
  - Search Homes → `https://letsbuyhouses.idxbroker.com/idx/map/mapsearch`
  - Sign In → `https://letsbuyhouses.idxbroker.com/idx/userlogin`
  - Create an Account → `https://letsbuyhouses.idxbroker.com/idx/usersignup`
- **Header** (`src/components/layout/Header.astro`), modeled on a RE/MAX reference but in Jackie's
  colors, fonts, and 1st Class branding:
  - Desktop: logo spans the header; **Sign In** alone in a slim upper-right row; main row
    **Search Homes · Home Value · Your Agent ▾ · Buy | Sell ▾ · Communities ▾**, then **Let's Talk**.
    "Home" was removed (the logo links home). Header height is still 97px.
  - Dropdowns: Your Agent (About Jacquelyn, Client Reviews), Buy | Sell (Buying a Home, Selling a
    Home, Mortgage Calculator), Communities (6 featured towns + View All Communities).
  - Accessible disclosure buttons: click/tap, Enter/Space, Arrow keys, Escape; hover on desktop.
  - Mobile: Sign In first, the same groups as tap-to-expand sections, then Let's Talk and Call.
    The open menu fits the screen so its last buttons stay above the Call/Text/Contact bar.
- **Homepage:** "Find a Home" → IDX map. "Explore Buying" → `/buy/`.
- **Buy page, "Search homes for sale":** Search MLS Listings (primary, IDX map), Send Me Matching
  Homes (Jackie's inquiry form, `/buy/#buyer-inquiry`), Create an Account (IDX sign-up) with
  "Save your favorite homes and get email alerts when new listings match your search."

### IDX Broker dynamic wrapper (commit `f73ab6a`)
- **Page:** `src/pages/idx-wrapper.astro` → `https://letsbuyhouses.com/idx-wrapper/`. Jackie's
  approved header and footer around IDX's markers `<div id="idxStart"></div><div id="idxStop"></div>`.
  IDX Broker fetches this page and puts its search, listing, and account pages between the markers.
- **Absolute URLs:** an integration in `astro.config.mjs` (`idxWrapperAbsoluteUrls`) rewrites every
  root-relative link and asset on that page to `https://letsbuyhouses.com/...` after the build, so the
  logo, menus, footer links, and Let's Talk return to the main site from IDX Broker's domain.
- **Styles:** `src/styles/idx-wrapper.css` uses the same tokens/utilities as the site
  (`src/styles/tokens.css`, shared with `global.css`) but scopes Tailwind's reset to the header and
  footer, plus an `all: revert-layer` guard so IDX Broker's own CSS can't restyle them.
- Not linked anywhere, excluded from the sitemap, no phone contact bar.

---

## 2. Current status

| Area | Status |
|---|---|
| Site, 25 community guides, forms | Live |
| IDX links, header with dropdowns, Buy-page IDX actions | Live (`578bcef`, `584c77f`) |
| IDX wrapper page | **Live at `/idx-wrapper/`** (`f73ab6a`); **not yet configured in IDX Broker** |
| Signed-in My Listings Manager return path | **Open**: waiting on the user's test with their buyer account |
| Spring Lake guide | Built and reviewed on `claude/spring-lake` (`8205f48`), **not deployed** |
| My Listings homepage section | Planned, **waiting on a verified Listing Showcase embed** |
| `search.letsbuyhouses.com` + HTTPS | Not started (needs DNS) |

Post-deploy checks for `f73ab6a` (all passed on 2026-11-07):
- `/idx-wrapper/` returns 200 with no redirect, markers once each and in order, no root-relative
  URLs, no robots/canonical tags; its JS, CSS, images, and fonts return 200 with
  `Access-Control-Allow-Origin: *`.
- Not in the sitemap (34 URLs) and not linked from any page.
- Homepage, Buy page, desktop dropdowns, mobile menu, Search Homes, Sign In, Create an Account,
  Let's Talk, and the inquiry form all work. 32 forms post to Formspree; no preview notices.
- The live wrapper around the real Map Search (simulated the way IDX applies it): header, footer,
  500 results, dropdowns, mobile menu, and the logo back to `https://letsbuyhouses.com/` all work.

---

## 3. Key decisions and why

- **Direct links to IDX hosted pages, not embeds.** Simplest, fastest, and keeps IDX's own lead
  capture and buyer accounts working. One-line change later to move to `search.letsbuyhouses.com`.
- **Dynamic wrapper with absolute URLs.** IDX Broker's docs say dynamic wrappers suit sites that use
  absolute URLs; the Astro site uses root-relative ones, so the wrapper page is rewritten after the build.
- **Separate wrapper stylesheet.** IDX's map search ships
  `*, *:before, *:after { box-sizing: border-box; margin: 0; position: relative; font-weight: 400 }`,
  unlayered, which outranks Tailwind's layers and broke the header (mobile logo row hidden,
  dropdowns misplaced). Tailwind's reset also changed IDX's search box and results chip. The wrapper
  CSS scopes the reset to the header/footer and uses `all: revert-layer` there. Verified: header and
  footer computed styles match the standalone page on all tested IDX pages. The main site's compiled
  CSS rules are unchanged (fonts moved to a small inline block).
- **No robots/canonical tags on the wrapper.** IDX copies the wrapper's `<head>` onto its pages;
  a `noindex` there could de-index IDX listing pages. The page is simply unlinked and out of the sitemap.
- **No phone contact bar on the wrapper,** so it can't cover IDX's own bottom bars (Filter/Save,
  Add to Favorites).
- **Header:** "Home" dropped so the added links fit at the original 97px height; "Search by City"
  and "My Listings" are held until town-specific IDX searches and Jackie's listing feed are verified.
- **Content rules (from the user):**
  - The brokerage office number **(732) 314-4444** appears only as plain text in the footer disclosure,
    never as a link. Jackie's direct call/text number **(732) 773-3075** stays as is.
  - Jackie has **15+ years** in real estate and has lived in Ocean County **35+ years** (separate facts).
  - First-person voice; verify local facts against official sources; no population rankings as filler.
  - Point Pleasant Borough (`/point-pleasant-nj/`) and Point Pleasant Beach are separate pages.
  - Ortley Beach is a section of Toms River, not a town.
  - Retired pages (Manalapan, Lakewood, Tuckerton, Little Egg Harbor) return real 404s with no
    redirects. Jackie's bio keeps its historical Manalapan reference.
  - Photos must be location-accurate and commercially licensed, with credits on `/photo-credits/`.
  - No GoDaddy DNS changes from this side; nothing merges or deploys without approval.

---

## 4. Deployed vs. not deployed

**On `main` (live), newest first:**
- `f73ab6a` IDX Broker dynamic wrapper
- `584c77f` Header with dropdowns, Sign In upper row
- `578bcef` IDX Search Homes / Sign In links, Buy-page IDX actions
- `59d42c8` and earlier: revised service areas (25 communities), photos, transit wording, retired pages

**Not deployed:**
- `claude/spring-lake` @ `8205f48`: Spring Lake (Borough, Monmouth County) guide, photo credit, and
  updates to the selector, schema, and sitemap (26 communities). Based on an older main (`59d42c8`),
  so merge current `main` into it before release.
- This `HANDOFF.md` (on `claude/idx-wrapper` only).

All other `claude/*` branches are already contained in `main`.

---

## 5. Open issues

1. **IDX wrapper not yet configured in IDX Broker** (the user is doing this).
2. **Signed-in My Listings Manager (`/idx/myaccount`)**: unknown whether it shows the wrapper.
   If not, buyers need a visible "Back to Jackie's Website" link: likely a sub-header under
   IDX *Design → Website → Page Templates*, to be confirmed with IDX Broker support.
3. **Search-results map** was blank in the test sandbox with and without the wrapper; check live.
4. **IDX forced registration:** after 5 listing views IDX shows "You must register to view this
   page!" over the page (and over the header) until closed. Review the setting with Jackie.
5. **IDX profile cleanup:** listing pages show "26 Main Street Suite" (missing "R"), the same phone
   twice (Phone and Phone Alt), no brokerage name in the agent box, and the page title
   "IDX Property Services".
6. **Hosted mobile map** shows an empty dropdown at the top; default search includes pending listings
   and a rental (IDX search defaults).
7. **IDX city names to confirm:** how the MLS files Ortley Beach (may be under Toms River),
   Neptune Township / Ocean Grove, Middletown, Point Pleasant Beach, and Spring Lake (vs. Spring Lake Heights).
8. **Photography follow-up** (noted at the top of `src/data/photos.ts`): Bayville and Whiting have no
   photo (plain navy hero and cards); Ortley Beach uses a temporary Route 35 street photo; the Red Bank
   aerial dates to 2007.
9. **My Listings homepage section:** waiting on the verified Listing Showcase embed and
   Jackie's Featured Agent ID.

---

## 6. Exact next steps

### A. Confirm what's live on `main`
```bash
git fetch origin
git log --oneline -3 origin/main          # top should be f73ab6a
git status                                # clean
```
- `curl -sI https://letsbuyhouses.com/idx-wrapper/` → `HTTP/2 200`, no `location:` header.
- `curl -s https://letsbuyhouses.com/idx-wrapper/ | grep -c 'id="idx'` → `2` (idxStart, idxStop).
- `curl -s https://letsbuyhouses.com/sitemap-0.xml | grep -c idx-wrapper` → `0`.
- Spot-check the homepage menu, the Buy page buttons, and that `/spring-lake-nj/` still returns 404.

### B. Configure the wrapper in IDX Broker (user)
1. *Design → Website → Wrappers.* If a page-level setting exists, set **Map Search** first:
   type **Dynamic**, URL exactly `https://letsbuyhouses.com/idx-wrapper/` (with the trailing slash;
   the no-slash URL redirects and IDX's fetcher doesn't follow redirects).
2. Check Map Search on desktop and phone: map, mobile menu, dropdowns, logo → `https://letsbuyhouses.com/`.
3. Apply it **Global**, then check search results (including the results map), a listing page,
   Sign In, and Create an Account.
4. Sign in with the existing buyer account and open **My Listings Manager** (`/idx/myaccount`).
   Record whether the header/footer show and whether there's a visible way back to Jackie's site.

### C. If the dashboard has no way back
- Ask IDX Broker support: *"Does the dynamic wrapper apply to the signed-in My Listings Manager
  dashboard (/idx/myaccount)? If not, can we add a visible link back to our main site there, via a
  sub-header in Page Templates or another setting?"*
- Then add a "← Back to Jackie's Website" link (`https://letsbuyhouses.com/`) in the setting they name.

### D. After the wrapper is confirmed
- **Subdomain:** add a GoDaddy CNAME `search` → `subdomains.idxbroker.com`; after propagation, set
  *Account → Details → Use Custom Domain* = `search.letsbuyhouses.com` and *Enable HTTPS*. Then change
  the three URLs in `idxLinks` (`src/lib/idx.ts`), build, review, and deploy.
- **IDX profile cleanup** (issue 5) and default-search review (issue 6).
- **Spring Lake:** merge current `main` into `claude/spring-lake`, rebuild, re-verify (26 communities,
  selector, schema, sitemap, wrapper unaffected), then deploy on approval.
- **My Listings:** when the verified embed arrives, add a compact section below the homepage hero
  (up to 3 cards, MLS attribution kept, hidden when the feed is empty), and add "My Listings" to the
  Your Agent dropdown.

### Release checklist (every deploy)
1. Branch from current `main`; confirm `main` is an ancestor and the diff is only the reviewed scope.
2. `npx astro check` → 0 errors; production build with
   `PUBLIC_SITE_MODE=production PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xkjjzkwg`.
3. In the build: every lead form posts to Formspree; no "Preview site"/"not connected" text; the office
   number is plain text with no `tel:` link; call/text links present; footer credit present; 8 logo variants.
4. Fast-forward `main` to the approved commit (no merge commits needed), push, and wait for the
   "Deploy to GitHub Pages" run.
5. Re-run the same checks against https://letsbuyhouses.com, including every sitemap URL.
