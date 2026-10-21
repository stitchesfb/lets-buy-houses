/**
 * Town landing page content. Each entry generates a page at /{slug}/.
 *
 * SEO notes:
 *  - `h1` and `metaTitle` target "{Town} NJ homes for sale / real estate" intent.
 *  - `sections` render as H2s targeting secondary buyer/seller queries.
 *  - Write `intro` and section bodies in the agent's own voice — unique,
 *    first-hand local content is what ranks (and what AI search engines quote).
 *  - `marketStats` values are TODO placeholders; update monthly from MLS data.
 */

export type TownSlug = 'manalapan-nj' | 'brick-nj' | 'point-pleasant-nj' | 'manahawkin-nj';

export interface MarketStat {
  label: string;
  value: string;
  note?: string;
}

export interface TownSection {
  heading: string;
  body: string[];
}

export interface Town {
  slug: TownSlug;
  name: string;
  county: 'Monmouth' | 'Ocean';
  zipCodes: string[];
  /** Short positioning used on cards. */
  angle: string;
  cardImage: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subhead: string;
  intro: string;
  highlights: string[];
  neighborhoods: { name: string; blurb: string }[];
  sections: TownSection[];
  marketStats: { asOf: string; stats: MarketStat[] };
  /** Pre-filters the IDX widget (city name as the MLS stores it). */
  idx: { city: string; extraQuery?: string };
  geo: { latitude: number; longitude: number };
  faqs: { q: string; a: string }[];
}

const placeholderStats = (): Town['marketStats'] => ({
  asOf: 'TODO: Month YYYY',
  stats: [
    { label: 'Median Sale Price', value: 'TBD' },
    { label: 'Avg. Days on Market', value: 'TBD' },
    { label: 'Sale-to-List Ratio', value: 'TBD' },
    { label: 'Active Listings', value: 'TBD' },
  ],
});

export const towns: Town[] = [
  {
    slug: 'manalapan-nj',
    name: 'Manalapan',
    county: 'Monmouth',
    zipCodes: ['07726'],
    angle: 'Luxury suburban living & top-rated schools',
    cardImage: '/images/towns/manalapan.svg',
    heroImage: '/images/towns/manalapan-hero.svg',
    metaTitle: 'Manalapan NJ Homes for Sale & Real Estate | Local Expert',
    metaDescription:
      'Search Manalapan, NJ homes for sale — luxury colonials, 55+ communities, and family neighborhoods. 17 years of local expertise. Get a free home valuation.',
    h1: 'Manalapan, NJ Homes for Sale & Luxury Suburban Real Estate',
    subhead: 'Spacious homes, sought-after schools, and an easy commute — in the heart of western Monmouth County.',
    intro:
      'Manalapan offers the space and privacy of larger lots with quick access to Routes 9 and 33, NJ Turnpike connections, and express bus service toward New York City. Buyers come for the schools and the home sizes; sellers benefit from steady demand from families relocating out of North Jersey and NYC.',
    highlights: [
      'Manalapan-Englishtown Regional Schools & Freehold Regional High School District',
      'Large-lot colonials, luxury new construction, and active-adult (55+) communities',
      'Route 9 corridor express buses toward NYC',
      'Parks, farms, and Monmouth Battlefield State Park nearby',
    ],
    neighborhoods: [
      { name: 'Luxury Estates', blurb: 'Custom and executive colonials on acre-plus lots.' },
      { name: '55+ Communities', blurb: 'Active-adult options including Covered Bridge.' },
      { name: 'Family Subdivisions', blurb: 'Established neighborhoods close to schools and parks.' },
    ],
    sections: [
      {
        heading: 'Buying a Luxury Home in Manalapan',
        body: [
          'TODO: In your own words — what does $1M+ buy here, which streets hold value best, and what should out-of-area buyers know about taxes and lot sizes?',
        ],
      },
      {
        heading: 'Selling Your Manalapan Home',
        body: [
          'TODO: Pricing strategy, the best months to list, and what local buyers are paying a premium for right now.',
        ],
      },
    ],
    marketStats: placeholderStats(),
    idx: { city: 'Manalapan' },
    geo: { latitude: 40.2807, longitude: -74.3437 },
    faqs: [
      {
        q: 'What school district serves Manalapan, NJ?',
        a: 'Elementary and middle schools are part of the Manalapan-Englishtown Regional School District, and high school students attend schools in the Freehold Regional High School District, including Manalapan High School.',
      },
      {
        q: 'Is Manalapan a good place to commute to NYC from?',
        a: 'Many residents commute via express buses along the Route 9 corridor or drive to NJ Transit rail stations. Ask me about the commute from specific neighborhoods.',
      },
    ],
  },
  {
    slug: 'brick-nj',
    name: 'Brick',
    county: 'Ocean',
    zipCodes: ['08723', '08724'],
    angle: 'Bayfront, riverfront & family-friendly value',
    cardImage: '/images/towns/brick.svg',
    heroImage: '/images/towns/brick-hero.svg',
    metaTitle: 'Brick NJ Homes for Sale | Waterfront & Family Homes | Local Realtor',
    metaDescription:
      'Find Brick Township, NJ homes for sale — Barnegat Bay and Metedeconk River waterfront, lagoon homes, and family neighborhoods. Free home value report.',
    h1: 'Brick, NJ Homes for Sale — Waterfront, Lagoon & Family Neighborhoods',
    subhead: 'Bay, river, and ocean access with year-round amenities and real value for your money.',
    intro:
      'Brick Township stretches from western neighborhoods near the Garden State Parkway to the Barnegat Bay and a slice of oceanfront barrier island. It’s one of the most diverse housing markets at the Shore — from starter ranches to deep-water bayfront homes with boat lifts.',
    highlights: [
      'Waterfront on the Barnegat Bay and Metedeconk River',
      'Brick Township public schools and parks system',
      'Garden State Parkway & Route 70/88 access',
      'Township beaches on the barrier island',
    ],
    neighborhoods: [
      { name: 'Shore Acres', blurb: 'Bayfront and lagoon homes along the Barnegat Bay.' },
      { name: 'Herbertsville', blurb: 'Established, wooded neighborhoods near the Parkway.' },
      { name: 'Breton Woods', blurb: 'Quiet suburban streets with riverfront pockets.' },
    ],
    sections: [
      {
        heading: 'Waterfront & Lagoon Homes in Brick',
        body: [
          'TODO: Bulkhead condition, dock rights, bridge clearances, flood zones and elevation certificates — the questions every Brick waterfront buyer should ask.',
        ],
      },
      {
        heading: 'Selling a Home in Brick Township',
        body: ['TODO: What’s driving demand in Brick right now and how to price against recent comps.'],
      },
    ],
    marketStats: placeholderStats(),
    idx: { city: 'Brick' },
    geo: { latitude: 40.0593, longitude: -74.1371 },
    faqs: [
      {
        q: 'Does Brick, NJ have waterfront homes?',
        a: 'Yes — Brick has homes on the Barnegat Bay, the Metedeconk River, and many lagoons, plus a stretch of oceanfront barrier island. Water access, bulkheads, and flood zones vary block by block.',
      },
      {
        q: 'What ZIP codes are in Brick Township?',
        a: 'Brick Township is primarily served by ZIP codes 08723 and 08724.',
      },
    ],
  },
  {
    slug: 'point-pleasant-nj',
    name: 'Point Pleasant',
    county: 'Ocean',
    zipCodes: ['08742'],
    angle: 'Waterfront homes, river & beach living',
    cardImage: '/images/towns/point-pleasant.svg',
    heroImage: '/images/towns/point-pleasant-hero.svg',
    metaTitle: 'Point Pleasant NJ Waterfront Homes for Sale | Beach & Riverfront',
    metaDescription:
      'Browse Point Pleasant & Point Pleasant Beach, NJ waterfront homes for sale — riverfront, lagoon, and beach-block properties. 17 years of Jersey Shore expertise.',
    h1: 'Point Pleasant, NJ Waterfront Homes for Sale',
    subhead: 'Riverfront, lagoon, and beach-block homes in Point Pleasant Borough and Point Pleasant Beach.',
    intro:
      'Between the Manasquan River, the Point Pleasant Canal, Beaver Dam Creek, and the Atlantic, Point Pleasant has some of the most varied waterfront at the Jersey Shore. Point Pleasant Beach brings the boardwalk and summer energy; Point Pleasant Borough offers quieter year-round neighborhoods with deep-water boating.',
    highlights: [
      'Two distinct towns: Point Pleasant Borough & Point Pleasant Beach',
      'Manasquan Inlet access for ocean boating and fishing',
      'Boardwalk, beaches, and a walkable downtown in Point Pleasant Beach',
      'NJ Transit North Jersey Coast Line station in Point Pleasant Beach',
    ],
    neighborhoods: [
      { name: 'Manasquan Riverfront', blurb: 'Deep-water homes with quick inlet access.' },
      { name: 'Beaver Dam Creek', blurb: 'Lagoon homes with docks, close to the bay.' },
      { name: 'Point Pleasant Beach', blurb: 'Beach-block living steps from the boardwalk.' },
    ],
    sections: [
      {
        heading: 'Buying Waterfront Property in Point Pleasant',
        body: [
          'TODO: River vs. lagoon vs. beach block, flood insurance, elevation and FEMA zones, and dock/bulkhead inspections.',
        ],
      },
      {
        heading: 'Point Pleasant Beach vs. Point Pleasant Borough',
        body: ['TODO: Taxes, schools, summer traffic, rental potential — help buyers pick the right town.'],
      },
    ],
    marketStats: placeholderStats(),
    idx: { city: 'Point Pleasant' },
    geo: { latitude: 40.0832, longitude: -74.0682 },
    faqs: [
      {
        q: 'What is the difference between Point Pleasant and Point Pleasant Beach?',
        a: 'They are two separate municipalities. Point Pleasant Beach is the oceanfront town with the boardwalk; Point Pleasant Borough sits inland along the Manasquan River, canal, and creeks with more year-round residential neighborhoods.',
      },
      {
        q: 'Do I need flood insurance for a waterfront home in Point Pleasant?',
        a: 'If the home is in a FEMA Special Flood Hazard Area and you have a federally backed mortgage, flood insurance is typically required. I help buyers review elevation certificates and insurance quotes before making an offer.',
      },
    ],
  },
  {
    slug: 'manahawkin-nj',
    name: 'Manahawkin',
    county: 'Ocean',
    zipCodes: ['08050'],
    angle: 'Gateway to LBI — shore life, year-round',
    cardImage: '/images/towns/manahawkin.svg',
    heroImage: '/images/towns/manahawkin-hero.svg',
    metaTitle: 'Manahawkin NJ Homes for Sale | Stafford Township & LBI Gateway',
    metaDescription:
      'Search Manahawkin & Stafford Township, NJ homes for sale — lagoon homes, Ocean Acres, and minutes to Long Beach Island. Free home valuation from a local expert.',
    h1: 'Manahawkin, NJ Homes for Sale — Your Gateway to Long Beach Island',
    subhead: 'Lagoon homes, family neighborhoods, and year-round shore living minutes from LBI.',
    intro:
      'Manahawkin, part of Stafford Township, sits at the foot of the Route 72 causeway to Long Beach Island. Buyers get shore access and lagoon living without island pricing, plus year-round shopping, Garden State Parkway access, and Southern Regional schools.',
    highlights: [
      'Minutes to Long Beach Island via the Route 72 causeway',
      'Lagoon homes in Beach Haven West with bay access',
      'Southern Regional School District',
      'Garden State Parkway access and year-round retail',
    ],
    neighborhoods: [
      { name: 'Beach Haven West', blurb: 'Lagoon-front homes with docks and bay access.' },
      { name: 'Ocean Acres', blurb: 'Wooded, family-friendly neighborhoods with newer homes.' },
      { name: 'Mill Creek', blurb: 'Waterfront pockets close to the causeway.' },
    ],
    sections: [
      {
        heading: 'Lagoon & Waterfront Homes in Manahawkin',
        body: ['TODO: Bay access, lagoon depths, bulkheads, and how Beach Haven West compares to LBI for boaters.'],
      },
      {
        heading: 'Year-Round Living vs. Second Homes Near LBI',
        body: ['TODO: Commuting, rental potential, taxes, and what second-home buyers should know.'],
      },
    ],
    marketStats: placeholderStats(),
    idx: { city: 'Stafford', extraQuery: 'Manahawkin' },
    geo: { latitude: 39.6954, longitude: -74.2588 },
    faqs: [
      {
        q: 'Is Manahawkin the same as Stafford Township?',
        a: 'Manahawkin is a community within Stafford Township, Ocean County. MLS listings may show the town as Stafford Township with a Manahawkin mailing address (ZIP 08050).',
      },
      {
        q: 'How far is Manahawkin from Long Beach Island?',
        a: 'Manahawkin sits at the mainland end of the Route 72 causeway — LBI is just a few minutes’ drive away.',
      },
    ],
  },
];

export const getTown = (slug: string) => towns.find((t) => t.slug === slug);
