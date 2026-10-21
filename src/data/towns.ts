/**
 * Town landing page content. Each entry generates a page at /{slug}/.
 *
 * SEO notes:
 *  - `headline` is the page H1; `metaTitle` carries the "{Town} NJ homes for sale" keywords.
 *  - `marketOverview`, `buyerTips`, `sellerTips` and `faqs` each render under their own H2
 *    targeting buyer/seller intent; `faqs` also feed FAQPage schema.
 *  - `marketStats` values are TODO placeholders; update monthly from MLS data.
 */

export type TownSlug = 'manalapan-nj' | 'brick-nj' | 'point-pleasant-nj' | 'manahawkin-nj';

export interface MarketStat {
  label: string;
  value: string;
  note?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Town {
  slug: TownSlug;
  name: string;
  county: 'Monmouth County' | 'Ocean County';
  zipCodes: string[];
  /** Short positioning used on cards. */
  angle: string;
  cardImage: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  /** Page H1. */
  headline: string;
  subheadline: string;
  /** Pre-filters the IDX widget — must match the city name as the MLS stores it. */
  idxCity: string;
  intro: string;
  highlights: string[];
  neighborhoods: { name: string; blurb: string }[];
  marketOverview: string;
  buyerTips: string[];
  sellerTips: string[];
  marketStats: { asOf: string; stats: MarketStat[] };
  geo: { latitude: number; longitude: number };
  faqs: Faq[];
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
    county: 'Monmouth County',
    zipCodes: ['07726'],
    angle: 'Luxury suburban living & top-rated schools',
    cardImage: '/images/towns/manalapan.svg',
    heroImage: '/images/towns/manalapan-hero.svg',
    metaTitle: 'Manalapan NJ Homes for Sale & Real Estate | Local Expert',
    metaDescription:
      'Search Manalapan, NJ homes for sale — luxury colonials, 55+ communities, and family neighborhoods. 17 years of local expertise. Get a free home valuation.',
    headline: 'Luxury Living & Premier Estates in Manalapan, NJ',
    subheadline:
      'Discover upscale suburban neighborhoods, top-tier schools, and spacious properties with 17 years of local market expertise.',
    idxCity: 'Manalapan',
    intro:
      'Manalapan offers the ultimate suburban lifestyle in Western Monmouth County, blending sprawling estate properties, exceptional community amenities, and top-rated school districts. Whether you are looking for custom luxury homes or private acreage, living here provides a sophisticated retreat while staying connected to major commuting routes.',
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
    marketOverview:
      'The Manalapan real estate market favors well-priced, high-end homes and properties offering modern updates and acreage. Demand remains exceptionally strong among families relocating from North Jersey and New York for space, privacy, and educational excellence.',
    buyerTips: [
      'Be prepared to act quickly on homes in prime school districts as inventory moves fast.',
      'Factor in property taxes and lot sizes when evaluating long-term value in different sections of the township.',
      'Work with an agent who has deep neighborhood relationships to find off-market or coming-soon opportunities.',
    ],
    sellerTips: [
      'First impressions matter: manicured lawns and professional staging yield top-dollar offers in Manalapan.',
      'Highlight custom upgrades, outdoor living spaces, and energy-efficient home features in your listing marketing.',
      'Price competitively based on hyper-local recent comps rather than county-wide averages.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 40.2807, longitude: -74.3437 },
    faqs: [
      {
        question: 'What are the top neighborhoods in Manalapan?',
        answer:
          'Popular areas include properties surrounding Pine Brook, Gordons Corner, and the upscale developments featuring custom luxury builds and community clubhouses.',
      },
      {
        question: 'How are the schools in Manalapan?',
        answer:
          'Manalapan-Englishtown Regional School District and the Freehold Regional High School District (including Manalapan High School) consistently rank high for academics and extracurriculars.',
      },
    ],
  },
  {
    slug: 'brick-nj',
    name: 'Brick',
    county: 'Ocean County',
    zipCodes: ['08723', '08724'],
    angle: 'Bayfront, riverfront & family-friendly value',
    cardImage: '/images/towns/brick.svg',
    heroImage: '/images/towns/brick-hero.svg',
    metaTitle: 'Brick NJ Homes for Sale | Waterfront & Family Homes | Local Realtor',
    metaDescription:
      'Find Brick Township, NJ homes for sale — Barnegat Bay and Metedeconk River waterfront, lagoon homes, and family neighborhoods. Free home value report.',
    headline: 'Waterfront Living & Family Neighborhoods in Brick, NJ',
    subheadline: 'From tranquil lagoon-front properties to thriving suburban communities near the Jersey Shore.',
    idxCity: 'Brick',
    intro:
      'Brick Township is a boater’s paradise and a premier family community rolled into one. Bordered by the Metedeconk River, Barnegat Bay, and just minutes from the Atlantic Ocean, Brick offers incredible waterfront access, a thriving local dining scene, and diverse housing options ranging from cozy starter homes to grand waterfront estates.',
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
    marketOverview:
      'Brick is one of the most dynamic real estate markets in Ocean County. Waterfront homes and properties with quick bay access are perennially high in demand, while inland suburban neighborhoods offer great value and stability for first-time home buyers and downsizers alike.',
    buyerTips: [
      'For waterfront properties, always verify bulkhead conditions, flood zones, and riparian rights during your inspection period.',
      'Consider your boating needs—check bridge clearances and canal depths if you own a larger vessel.',
      'Keep an eye on proximity to major arteries like Route 70 and the Garden State Parkway for easier commuting.',
    ],
    sellerTips: [
      'Emphasize outdoor amenities: clean bulkheads, multi-tier decks, and dock space are major selling points.',
      'Declutter and brighten indoor spaces to highlight natural light and open-concept layouts.',
      'Leverage digital video tours to attract out-of-area buyers looking for Jersey Shore second homes.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 40.0593, longitude: -74.1371 },
    faqs: [
      {
        question: 'Is Brick Township good for year-round living or just summer homes?',
        answer:
          'Brick is a thriving year-round community with a strong local economy, excellent municipal parks, and full-time school systems, though it experiences a seasonal influx of summer residents.',
      },
      {
        question: 'What are the taxes like in Brick compared to neighboring coastal towns?',
        answer:
          'Brick generally offers attractive relative tax rates for the coastal region, providing a strong balance between property values, municipal services, and public beach access.',
      },
    ],
  },
  {
    slug: 'point-pleasant-nj',
    name: 'Point Pleasant',
    county: 'Ocean County',
    zipCodes: ['08742'],
    angle: 'Waterfront homes, river & beach living',
    cardImage: '/images/towns/point-pleasant.svg',
    heroImage: '/images/towns/point-pleasant-hero.svg',
    metaTitle: 'Point Pleasant NJ Waterfront Homes for Sale | Beach & Riverfront',
    metaDescription:
      'Browse Point Pleasant & Point Pleasant Beach, NJ waterfront homes for sale — riverfront, lagoon, and beach-block properties. 17 years of Jersey Shore expertise.',
    headline: 'Coastal Charm & Prime Real Estate in Point Pleasant, NJ',
    subheadline:
      'Experience classic shore living, top-rated schools, and exceptional walkability to local beaches and rivers.',
    idxCity: 'Point Pleasant',
    intro:
      'Point Pleasant (Point Pleasant Borough) is the quintessential Jersey Shore coastal town. Famed for its tight-knit community feel, excellent local schools, Riverfront park system, and proximity to the Manasquan Inlet, it is one of the most desirable places to call home along the Jersey coast.',
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
    marketOverview:
      'Inventory in Point Pleasant moves rapidly, especially for properties within cycling distance of the water or downtown merchant areas. Demand spans both year-round residents seeking a vibrant coastal lifestyle and investors looking for premium shore properties.',
    buyerTips: [
      'Move decisively when you find a well-maintained home; properties in Point Pleasant rarely sit long on the market.',
      'Evaluate elevation and insurance requirements, as proximity to the Manasquan River and the ocean impacts flood zone designations.',
      'Look beyond surface cosmetics—prime location and lot orientation are the hardest things to change later.',
    ],
    sellerTips: [
      'Curb appeal is king in Point Pleasant; coastal landscaping and fresh exterior paint instantly attract eager buyers.',
      'Highlight lifestyle perks in your listing descriptions, such as walkability to local marinas, parks, and dining.',
      'Use professional twilight photography to showcase outdoor entertaining spaces.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 40.0832, longitude: -74.0682 },
    faqs: [
      {
        question: 'What is the difference between Point Pleasant and Point Pleasant Beach?',
        answer:
          'Point Pleasant (the Borough) is a primarily residential, family-oriented town with its own school district and river access, whereas Point Pleasant Beach is directly on the oceanfront and features the commercial boardwalk.',
      },
      {
        question: 'Are there good commuter options from Point Pleasant?',
        answer:
          'Yes, residents enjoy easy access to the nearby Point Pleasant Beach station on the NJ Transit North Jersey Coast Line, offering convenient rail service north toward Newark and New York City.',
      },
    ],
  },
  {
    slug: 'manahawkin-nj',
    name: 'Manahawkin',
    county: 'Ocean County',
    zipCodes: ['08050'],
    angle: 'Gateway to LBI — shore life, year-round',
    cardImage: '/images/towns/manahawkin.svg',
    heroImage: '/images/towns/manahawkin-hero.svg',
    metaTitle: 'Manahawkin NJ Homes for Sale | Stafford Township & LBI Gateway',
    metaDescription:
      'Search Manahawkin & Stafford Township, NJ homes for sale — lagoon homes, Ocean Acres, and minutes to Long Beach Island. Free home valuation from a local expert.',
    headline: 'The Gateway to LBI: Real Estate in Manahawkin, NJ',
    subheadline:
      'Enjoy spacious suburban neighborhoods, excellent value, and immediate access to Long Beach Island.',
    idxCity: 'Manahawkin,Stafford Township', // TODO: or 'Stafford' — confirm with your IDX vendor how it accepts multiple cities
    intro:
      'Manahawkin (Stafford Township) serves as the vibrant mainland gateway to Long Beach Island. It offers the best of both worlds: larger residential lots, modern suburban developments, and lower price points than the barrier island, all while keeping you just minutes away from LBI beaches, dining, and bay activities.',
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
    marketOverview:
      'Manahawkin is experiencing strong growth as buyers look for more square footage and property value without sacrificing proximity to the shore. It appeals heavily to families, remote professionals, and retirees looking for a strategic coastal location.',
    buyerTips: [
      'Explore the different pockets of Stafford Township—some offer quiet wooded settings while others put you right next to the Route 72 retail corridor.',
      'Factor in bridge traffic patterns during peak summer weekends when planning your property visits.',
      'Look for newly constructed homes or well-maintained resale properties that offer modern energy efficiency.',
    ],
    sellerTips: [
      'Market the lifestyle advantage: emphasize how quickly buyers can get to LBI beaches while enjoying a quieter mainland neighborhood.',
      'Ensure your home interior is bright, neutral, and meticulously cleaned to appeal to relocating buyers.',
      'Price strategically based on recent neighborhood comps to spark immediate buyer competition.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.6954, longitude: -74.2588 },
    faqs: [
      {
        question: 'How close is Manahawkin to Long Beach Island?',
        answer:
          'Manahawkin sits directly at the foot of the Manahawkin Bay Bridge (Route 72), putting you on Long Beach Island in 5 to 10 minutes depending on your starting point.',
      },
      {
        question: 'What types of homes are common in Manahawkin?',
        answer:
          'You will find a great mix of single-family colonial homes in suburban developments, active adult (55+) communities, and waterfront properties along local bays and lagoons.',
      },
    ],
  },
];

export const getTown = (slug: string) => towns.find((t) => t.slug === slug);
