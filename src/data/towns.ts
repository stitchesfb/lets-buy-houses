/**
 * Town landing page content. Each entry generates a page at /{slug}/.
 *
 * SEO notes:
 *  - `headline` is the page H1; `metaTitle` carries the "{Town} NJ homes for sale" keywords.
 *  - `marketOverview`, `buyerTips`, `sellerTips` and `faqs` each render under their own H2
 *    targeting buyer/seller intent; `faqs` also feed FAQPage schema.
 *  - `marketStats` values are TODO placeholders; update monthly from MLS data.
 */

import type { IdxCity } from '@/lib/idx';

export type TownSlug =
  | 'toms-river-nj'
  | 'brick-nj'
  | 'manahawkin-nj'
  | 'whiting-nj'
  | 'tinton-falls-nj'
  | 'point-pleasant-nj'
  | 'manalapan-nj';

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
  /** Key in src/data/photos.ts; falls back to a styled placeholder until a photo is added. */
  photo?: string;
  metaTitle: string;
  metaDescription: string;
  /** Page H1. */
  headline: string;
  subheadline: string;
  /**
   * Pre-filters the IDX widget — must match how the MLS stores the city.
   * Use a list when listings are filed under several names.
   */
  idxCity: IdxCity;
  /** Area slug on her RE/MAX Revolution site's live MLS search, e.g. 'toms+river'. */
  remaxArea: string;
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
    slug: 'toms-river-nj',
    name: 'Toms River',
    county: 'Ocean County',
    zipCodes: ['08753', '08755'],
    angle: 'County seat with river, bay & barrier-island homes',
    photo: 'toms-river',
    metaTitle: 'Toms River NJ Homes for Sale & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Search Toms River, NJ homes for sale, from established neighborhoods to riverfront, bay, and Ortley Beach homes, with local guidance from Jacquelyn Guevara of RE/MAX Revolution.',
    headline: 'Toms River, NJ Homes for Sale & Real Estate',
    subheadline: 'Ocean County’s seat, with neighborhoods along the river, the bay, and the barrier island.',
    idxCity: 'Toms River',
    remaxArea: 'toms+river',
    intro:
      'Toms River Township is the county seat of Ocean County and one of the largest municipalities in New Jersey. It stretches from inland neighborhoods west of the Garden State Parkway to homes along the Toms River and Barnegat Bay, and it includes Ortley Beach on the barrier island. Downtown, along the river, is home to county offices, shops, and restaurants.',
    highlights: [
      'Garden State Parkway access, plus Routes 9, 37, and 166',
      'Route 37 connects to the barrier island and Seaside Heights',
      'Toms River Regional Schools',
      'Waterfront along the Toms River and Barnegat Bay, plus Ortley Beach',
    ],
    neighborhoods: [
      { name: 'Downtown & Riverfront', blurb: 'Older homes and walkable streets near the river and the county seat.' },
      { name: 'North Dover', blurb: 'Established suburban neighborhoods in the township’s northern section.' },
      { name: 'Ortley Beach', blurb: 'Barrier-island homes between the bay and the ocean.' },
    ],
    marketOverview:
      'Toms River offers a wide range of housing, from starter homes and established suburban neighborhoods to waterfront properties on the river, the bay, and the barrier island. That variety means pricing and demand can differ sharply from one section of the township to the next.',
    buyerTips: [
      'Compare sections of the township carefully, since prices, flood zones, and commutes vary widely.',
      'For waterfront and barrier-island homes, review elevation certificates and flood insurance costs early.',
      'Check drive times to the Parkway and Route 37 at the hours you’ll actually travel.',
    ],
    sellerTips: [
      'Price against recent sales in your own section of the township, not the town as a whole.',
      'Highlight updates like roofs, HVAC, and windows; buyers in established neighborhoods ask about them.',
      'For waterfront homes, have bulkhead, elevation, and flood documentation ready for buyers.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.9537, longitude: -74.1979 },
    faqs: [
      {
        question: 'Is Toms River the same as South Toms River?',
        answer:
          'No. South Toms River is a separate borough. Toms River Township is the much larger municipality that includes downtown, North Dover, and Ortley Beach.',
      },
      {
        question: 'Does Toms River have waterfront or beach homes?',
        answer:
          'Yes. The township includes Ortley Beach on the barrier island, along with homes on the Toms River and Barnegat Bay. Flood zones and insurance requirements vary by location.',
      },
      {
        question: 'Which school district serves Toms River?',
        answer:
          'Toms River Regional Schools serves the township. The NJ Department of Education publishes School Performance Reports for each school.',
      },
    ],
  },
  {
    slug: 'brick-nj',
    name: 'Brick',
    county: 'Ocean County',
    zipCodes: ['08723', '08724'],
    angle: 'Bayfront, riverfront & suburban neighborhoods',
    photo: 'brick',
    metaTitle: 'Brick NJ Homes for Sale | Waterfront & Suburban Homes | Jacquelyn Guevara',
    metaDescription:
      'Find Brick Township, NJ homes for sale — Barnegat Bay and Metedeconk River waterfront, lagoon homes, and established neighborhoods. Request a home value review.',
    headline: 'Waterfront Living & Established Neighborhoods in Brick, NJ',
    subheadline: 'From tranquil lagoon-front properties to thriving suburban communities near the Jersey Shore.',
    idxCity: 'Brick',
    remaxArea: 'brick',
    intro:
      'Brick Township is a boater’s paradise and a well-established year-round community rolled into one. Bordered by the Metedeconk River, Barnegat Bay, and just minutes from the Atlantic Ocean, Brick offers incredible waterfront access, a thriving local dining scene, and diverse housing options ranging from cozy starter homes to grand waterfront estates.',
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
    slug: 'manahawkin-nj',
    name: 'Manahawkin',
    county: 'Ocean County',
    zipCodes: ['08050'],
    angle: 'Gateway to LBI — shore life, year-round',
    photo: 'manahawkin',
    metaTitle: 'Manahawkin NJ Homes for Sale | Stafford Township & LBI Gateway',
    metaDescription:
      'Search Manahawkin & Stafford Township, NJ homes for sale — lagoon homes, Ocean Acres, and minutes to Long Beach Island. Home value reviews from a local agent.',
    headline: 'The Gateway to LBI: Real Estate in Manahawkin, NJ',
    subheadline:
      'Enjoy spacious suburban neighborhoods, excellent value, and immediate access to Long Beach Island.',
    // Manahawkin listings are filed under any of these names depending on the listing agent.
    idxCity: ['Manahawkin', 'Stafford Township', 'Stafford Twp'],
    remaxArea: 'manahawkin',
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
      { name: 'Ocean Acres', blurb: 'Wooded neighborhoods with many newer homes.' },
      { name: 'Mill Creek', blurb: 'Waterfront pockets close to the causeway.' },
    ],
    marketOverview:
      'Manahawkin is experiencing strong growth as buyers look for more square footage and property value without sacrificing proximity to the shore. Its location appeals to buyers who want year-round living close to the shore.',
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
  {
    slug: 'whiting-nj',
    name: 'Whiting',
    county: 'Ocean County',
    zipCodes: ['08759'],
    angle: 'Pinelands setting & active-adult communities',
    photo: 'whiting',
    metaTitle: 'Whiting NJ Homes for Sale | Manchester Township | Jacquelyn Guevara',
    metaDescription:
      'Search Whiting, NJ homes for sale in Manchester Township, including single-family homes and 55+ communities, with local guidance from Jacquelyn Guevara of RE/MAX Revolution.',
    headline: 'Whiting, NJ Homes for Sale & Real Estate',
    subheadline: 'A wooded Manchester Township community with single-family homes and many 55+ neighborhoods.',
    idxCity: ['Whiting', 'Manchester'],
    remaxArea: 'whiting',
    intro:
      'Whiting is an unincorporated community in Manchester Township, in western Ocean County, surrounded by the pine forests of the New Jersey Pinelands. Many of its homes are in active-adult (55+) communities, alongside single-family neighborhoods on wooded lots.',
    highlights: [
      'Part of Manchester Township (ZIP 08759)',
      'Many active-adult (55+) communities',
      'Route 70 runs through Whiting, toward Toms River and Lakewood',
      'Close to state forests and wildlife areas of the Pinelands',
    ],
    neighborhoods: [
      { name: '55+ Communities', blurb: 'Age-restricted neighborhoods; each has its own HOA rules and fees.' },
      { name: 'Single-Family Neighborhoods', blurb: 'Homes on wooded lots outside the age-restricted communities.' },
      { name: 'Wooded Lots', blurb: 'Larger, tree-covered parcels in the township’s less-developed areas.' },
    ],
    marketOverview:
      'Whiting’s housing mix is shaped by its many active-adult communities, along with single-family homes outside them. HOA fees, age requirements, and land-lease arrangements can differ from one community to the next, so details matter when comparing homes.',
    buyerTips: [
      'In 55+ communities, review HOA fees, rules, and age requirements before making an offer.',
      'Ask whether a home sits on owned land or in a land-lease community; it affects financing and monthly costs.',
      'Consider drive times to shopping, medical offices, and Route 70.',
    ],
    sellerTips: [
      'Have HOA documents and fee details ready up front; buyers will ask.',
      'Updated kitchens, baths, and low-maintenance features stand out.',
      'Price against recent sales inside your specific community.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.9465, longitude: -74.381 },
    faqs: [
      {
        question: 'Is Whiting its own town?',
        answer:
          'No. Whiting is an unincorporated community within Manchester Township in Ocean County. Property taxes and public schools are handled by Manchester Township.',
      },
      {
        question: 'What types of homes are in Whiting?',
        answer:
          'Many homes are in active-adult (55+) communities, and there are also single-family homes in wooded neighborhoods outside those communities.',
      },
    ],
  },
  {
    slug: 'tinton-falls-nj',
    name: 'Tinton Falls',
    county: 'Monmouth County',
    zipCodes: ['07724', '07753'],
    angle: 'Central Monmouth location near the Parkway',
    photo: 'tinton-falls',
    metaTitle: 'Tinton Falls NJ Homes for Sale & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Search Tinton Falls, NJ homes for sale, from single-family neighborhoods to townhomes and condos, with local guidance from Jacquelyn Guevara of RE/MAX Revolution.',
    headline: 'Tinton Falls, NJ Homes for Sale & Real Estate',
    subheadline: 'Single-family neighborhoods, townhomes, and condos in central Monmouth County.',
    idxCity: 'Tinton Falls',
    remaxArea: 'tinton+falls',
    intro:
      'Tinton Falls is a borough in central Monmouth County, named for the waterfall on Pine Brook in its historic area. Its location near the Garden State Parkway makes it convenient to the shore towns, Red Bank, and routes toward northern New Jersey.',
    highlights: [
      'Near Garden State Parkway interchanges',
      'Tinton Falls School District, with high school at Monmouth Regional',
      'A mix of single-family homes, townhomes, and condominiums',
      'Short drives to Red Bank, Asbury Park, and Monmouth County beaches',
    ],
    neighborhoods: [
      { name: 'Single-Family Neighborhoods', blurb: 'Established streets with detached homes and yards.' },
      { name: 'Townhomes & Condos', blurb: 'Lower-maintenance options in planned communities.' },
      { name: 'Historic Tinton Falls', blurb: 'The older area around the borough’s namesake falls.' },
    ],
    marketOverview:
      'Tinton Falls offers detached homes, townhomes, and condominiums, which gives buyers several ways into central Monmouth County. Its Parkway access is a draw for buyers commuting north or to nearby employers.',
    buyerTips: [
      'When weighing townhomes and condos against detached homes, compare HOA fees and what they cover.',
      'Check commute routes to the Parkway at the times you’ll travel.',
      'Confirm which schools a specific address is assigned to before you make an offer.',
    ],
    sellerTips: [
      'If your home is in a planned community, present HOA details clearly.',
      'Price against recent sales of the same home type: detached, townhome, or condo.',
      'Small updates like fresh paint and good lighting help homes show well online.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 40.2665, longitude: -74.0904 },
    faqs: [
      {
        question: 'Which schools serve Tinton Falls?',
        answer:
          'Elementary and middle school students attend the Tinton Falls School District, and high school students attend Monmouth Regional High School. The NJ Department of Education publishes School Performance Reports for each school.',
      },
      {
        question: 'Is Tinton Falls near the Garden State Parkway?',
        answer:
          'Yes. Parkway interchanges are in and near the borough, which makes trips along the shore and toward northern New Jersey convenient.',
      },
    ],
  },
  {
    slug: 'point-pleasant-nj',
    name: 'Point Pleasant',
    county: 'Ocean County',
    zipCodes: ['08742'],
    angle: 'Waterfront homes, river & beach living',
    photo: 'point-pleasant',
    metaTitle: 'Point Pleasant NJ Waterfront Homes for Sale | Beach & Riverfront',
    metaDescription:
      'Browse Point Pleasant & Point Pleasant Beach, NJ waterfront homes for sale — riverfront, lagoon, and beach-block properties. Local guidance from Jacquelyn Guevara of RE/MAX Revolution.',
    headline: 'Coastal Charm & Prime Real Estate in Point Pleasant, NJ',
    subheadline:
      'Experience classic shore living with easy access to local beaches and rivers.',
    idxCity: 'Point Pleasant',
    remaxArea: 'point+pleasant',
    intro:
      'Point Pleasant (Point Pleasant Borough) is the quintessential Jersey Shore coastal town. Known for its community feel, its own public school district, the Riverfront park system, and proximity to the Manasquan Inlet, it is one of the most desirable places to call home along the Jersey coast.',
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
          'Point Pleasant (the Borough) is a primarily residential town with its own school district and river access, whereas Point Pleasant Beach is directly on the oceanfront and features the commercial boardwalk.',
      },
      {
        question: 'Are there good commuter options from Point Pleasant?',
        answer:
          'Yes, residents enjoy easy access to the nearby Point Pleasant Beach station on the NJ Transit North Jersey Coast Line, offering convenient rail service north toward Newark and New York City.',
      },
    ],
  },
  {
    slug: 'manalapan-nj',
    name: 'Manalapan',
    county: 'Monmouth County',
    zipCodes: ['07726'],
    angle: 'Spacious homes & established suburban neighborhoods',
    photo: 'manalapan',
    metaTitle: 'Manalapan NJ Homes for Sale & Real Estate | Local Expert',
    metaDescription:
      'Search Manalapan, NJ homes for sale — colonials, 55+ communities, and established neighborhoods, with local guidance from Jacquelyn Guevara of RE/MAX Revolution.',
    headline: 'Luxury Living & Premier Estates in Manalapan, NJ',
    subheadline:
      'Discover upscale suburban neighborhoods and spacious properties with guidance from an agent licensed for over 15 years.',
    idxCity: 'Manalapan',
    remaxArea: 'manalapan',
    intro:
      'Manalapan offers the ultimate suburban lifestyle in Western Monmouth County, blending sprawling estate properties, community amenities, and established school districts. Whether you are looking for custom luxury homes or private acreage, living here provides a sophisticated retreat while staying connected to major commuting routes.',
    highlights: [
      'Manalapan-Englishtown Regional Schools & Freehold Regional High School District',
      'Large-lot colonials, luxury new construction, and active-adult (55+) communities',
      'Route 9 corridor express buses toward NYC',
      'Parks, farms, and Monmouth Battlefield State Park nearby',
    ],
    neighborhoods: [
      { name: 'Luxury Estates', blurb: 'Custom and executive colonials on acre-plus lots.' },
      { name: '55+ Communities', blurb: 'Active-adult options including Covered Bridge.' },
      { name: 'Established Subdivisions', blurb: 'Mature neighborhoods close to schools and parks.' },
    ],
    marketOverview:
      'The Manalapan real estate market favors well-priced, high-end homes and properties offering modern updates and acreage. Buyers relocating from North Jersey and New York often look here for more space and privacy.',
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
          'Manalapan-Englishtown Regional School District and the Freehold Regional High School District (including Manalapan High School) serve the township. The NJ Department of Education publishes School Performance Reports for each school.',
      },
    ],
  },
];

/**
 * Other areas listed on her RE/MAX Revolution site without a community page here yet.
 * Shown only as a preview note; add a full entry above to give one a page.
 */
export const candidateAreas = ['Bayville', 'Beachwood', 'Lacey', 'Lavallette', 'Seaside Park', 'Barnegat'];

/** "Toms River, Brick, Manahawkin, Whiting, and Tinton Falls": the first `n` towns in page order. */
export const townList = (n = towns.length) => {
  const names = towns.slice(0, n).map((t) => t.name);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}` : names.join('');
};

export const getTown = (slug: string) => towns.find((t) => t.slug === slug);
