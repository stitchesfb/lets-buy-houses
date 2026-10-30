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
  | 'point-pleasant-nj'
  | 'barnegat-nj'
  | 'bayville-nj'
  | 'beach-haven-nj'
  | 'beachwood-nj'
  | 'lacey-nj'
  | 'lakewood-nj'
  | 'lavallette-nj'
  | 'little-egg-harbor-nj'
  | 'manchester-nj'
  | 'seaside-heights-nj'
  | 'seaside-park-nj'
  | 'tuckerton-nj'
  | 'tinton-falls-nj'
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
  /** Other names the MLS or her service-area list uses for this same place (e.g. "Point Pleasant Boro"). */
  aliases?: string[];
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
    metaTitle:
      'Toms River, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Toms River real estate guidance from Jacquelyn Guevara: inland neighborhoods, homes on the river and Barnegat Bay, and Ortley Beach on the barrier island.',
    headline: 'Toms River, NJ Homes for Sale & Real Estate',
    subheadline: 'Ocean County’s seat, with neighborhoods along the river, the bay, and the barrier island.',
    idxCity: 'Toms River',
    intro:
      'Toms River is Ocean County’s seat, and it offers a remarkable range of settings in one township: inland sections such as North Dover, homes along the Toms River and Barnegat Bay, and Ortley Beach on the barrier island. Historic downtown, right on the river, brings together the county offices, local shops, and restaurants.',
    highlights: [
      'Garden State Parkway, plus Routes 9, 37, and 70',
      'Route 37 bridges connect to the barrier island and Seaside Heights',
      'Toms River Regional Schools',
      'Homes along the Toms River and Barnegat Bay, plus Ortley Beach',
    ],
    neighborhoods: [
      { name: 'Downtown & Riverfront', blurb: 'Neighborhoods near the Toms River and the county government offices.' },
      { name: 'North Dover', blurb: 'Single-family subdivisions and senior communities in the township’s northern section.' },
      { name: 'Ortley Beach', blurb: 'Barrier-island homes between the bay and the ocean.' },
    ],
    marketOverview:
      'Toms River’s range is its strength, from starter homes and established suburban neighborhoods to waterfront properties on the river, the bay, and the barrier island. Because pricing and demand can differ sharply from one section to the next, I compare recent sales section by section rather than relying on town-wide averages.',
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
          'No. South Toms River is a separate borough. Toms River Township is the much larger municipality and includes downtown, North Dover, and Ortley Beach.',
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
    metaTitle:
      'Brick, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Brick Township real estate guidance from Jacquelyn Guevara: lagoon homes in Shore Acres, neighborhoods near the Metedeconk River, and established inland streets.',
    headline: 'Waterfront Living & Established Neighborhoods in Brick, NJ',
    subheadline:
      'Lagoon, bay, and river neighborhoods, established inland streets, and the township’s own ocean beaches.',
    idxCity: 'Brick',
    intro:
      'Brick is a wonderful place to live if you love the water. Neighborhoods line Barnegat Bay and the Metedeconk River, including lagoon communities such as Shore Acres, while established inland streets offer more room to spread out. The township even has its own ocean beaches on the barrier peninsula, Brick Ocean Beaches I, II, and III, and the Garden State Parkway and Routes 35, 70, and 88 keep you connected.',
    highlights: [
      'Neighborhoods on Barnegat Bay and the Metedeconk River',
      'Brick Public Schools, pre-kindergarten through grade 12',
      'Garden State Parkway and Routes 35, 70, and 88',
      'Brick Ocean Beaches I, II, and III on the barrier peninsula',
    ],
    neighborhoods: [
      { name: 'Shore Acres', blurb: 'Lagoon homes with boat access to Barnegat Bay.' },
      { name: 'Herbertsville', blurb: 'Established inland neighborhoods.' },
      { name: 'Breton Woods', blurb: 'A community near the Metedeconk River, first laid out for summer homes in the 1930s.' },
    ],
    marketOverview:
      'Brick offers a wide range of homes, from inland neighborhoods to lagoon and bayfront properties. Waterfront and inland homes are priced very differently, so I compare recent sales in the same part of the township to give you a clear picture.',
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
        question: 'Is Brick Township a year-round community?',
        answer:
          'Yes. Brick has year-round neighborhoods throughout the township, its own public school district from pre-kindergarten through grade 12, and parks such as Windward Beach Park on the Metedeconk River and the Drum Point Sports Complex.',
      },
      {
        question: 'How do I check property taxes in Brick?',
        answer:
          'Property taxes depend on a home’s assessed value and the current tax rate. Check the tax record for the specific property, and compare it with similar homes in nearby towns before you make an offer.',
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
    metaTitle:
      'Manahawkin, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Manahawkin and Stafford Township real estate guidance from Jacquelyn Guevara: Beach Haven West lagoon homes, Ocean Acres, and Route 72 to Long Beach Island.',
    headline: 'The Gateway to LBI: Real Estate in Manahawkin, NJ',
    subheadline:
      'Mainland living in Stafford Township, right on Route 72 to Long Beach Island.',
    // Manahawkin listings are filed under any of these names depending on the listing agent.
    idxCity: ['Manahawkin', 'Stafford Township', 'Stafford Twp'],
    intro:
      'Manahawkin, in Stafford Township, is where the mainland meets Long Beach Island. Route 72 crosses the Manahawkin Bay Bridge to LBI and is the island’s only road access, so the beaches, the bay, and island dining are a short drive away. The Garden State Parkway and U.S. Route 9 also run through the township.',
    highlights: [
      'Route 72 over the Manahawkin Bay Bridge to Long Beach Island',
      'Beach Haven West, a lagoon community reaching Barnegat Bay',
      'Stafford Township schools through grade 6; Southern Regional for grades 7–12',
      'Garden State Parkway and U.S. Route 9',
    ],
    neighborhoods: [
      { name: 'Beach Haven West', blurb: 'Lagoons and waterfront lots, with the development reaching Barnegat Bay.' },
      { name: 'Ocean Acres', blurb: 'Newer homes west of the Garden State Parkway, shared with Barnegat Township.' },
    ],
    marketOverview:
      'Stafford Township’s homes range from lagoon properties in Beach Haven West to newer homes in Ocean Acres. Flood exposure, upkeep, and price differ between these areas, and I’ll help you compare recent sales in the same section.',
    buyerTips: [
      'Compare Stafford Township’s sections: lagoon homes such as Beach Haven West differ from newer areas like Ocean Acres in flood exposure and upkeep.',
      'Factor in bridge traffic patterns during peak summer weekends when planning your property visits.',
      'Look for newly constructed homes or well-maintained resale properties that offer modern energy efficiency.',
    ],
    sellerTips: [
      'Note your home’s distance to Route 72 and the Manahawkin Bay Bridge in your listing.',
      'Ensure your home interior is bright, neutral, and meticulously cleaned to appeal to relocating buyers.',
      'Price against recent sales in your own section of the township.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.6954, longitude: -74.2588 },
    faqs: [
      {
        question: 'How close is Manahawkin to Long Beach Island?',
        answer:
          'Route 72 runs from Manahawkin over the Manahawkin Bay Bridge to Long Beach Island and is the island’s only road access. Drive times depend on where you start and on summer traffic.',
      },
      {
        question: 'What types of homes are common in Manahawkin?',
        answer:
          'Homes range from lagoon properties in Beach Haven West to newer homes in Ocean Acres, including ranch and bi-level designs.',
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
    metaTitle:
      'Whiting, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Whiting real estate guidance from Jacquelyn Guevara: retirement and active-adult communities and single-family homes in Manchester Township, Ocean County.',
    headline: 'Whiting, NJ Homes for Sale & Real Estate',
    subheadline:
      'A Pinelands community in Manchester Township with many active-adult neighborhoods.',
    idxCity: ['Whiting', 'Manchester'],
    intro:
      'Whiting sits on the west side of Manchester Township, set within the New Jersey Pinelands near the Whiting Wildlife Management Area. It’s home to many retirement and active-adult communities, such as Crestwood Village, along with single-family neighborhoods.',
    highlights: [
      'Part of Manchester Township (ZIP 08759)',
      'Many retirement and active-adult communities',
      'In the Pinelands, near the Whiting Wildlife Management Area',
      'Manchester Township School District',
    ],
    neighborhoods: [
      { name: '55+ Communities', blurb: 'Age-restricted neighborhoods; each has its own HOA rules and fees.' },
      { name: 'Crestwood Village', blurb: 'One of Whiting’s established active-adult communities.' },
      { name: 'Single-Family Neighborhoods', blurb: 'Homes outside the age-restricted communities.' },
    ],
    marketOverview:
      'Whiting’s housing mix is shaped by its many active-adult communities, along with single-family homes outside them. HOA fees, age requirements, and land-lease arrangements differ from one community to the next, and I’ll help you compare those details side by side.',
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
    slug: 'point-pleasant-nj',
    name: 'Point Pleasant',
    county: 'Ocean County',
    zipCodes: ['08742'],
    angle:
      'River, canal & creek neighborhoods',
    photo: 'point-pleasant',
    metaTitle:
      'Point Pleasant Borough, NJ Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Point Pleasant Borough real estate guidance from Jacquelyn Guevara: homes along the Manasquan River, the Point Pleasant Canal, and Beaver Dam Creek.',
    headline:
      'Point Pleasant Borough, NJ Homes for Sale & Real Estate',
    subheadline:
      'Riverfront, canal, and creekside living in a borough with its own school district.',
    idxCity: 'Point Pleasant',
    aliases: ['Point Pleasant Boro'],
    intro:
      'Point Pleasant Borough is shaped by its waterways: the Manasquan River along its northern edge, Beaver Dam Creek to the south, and the Point Pleasant Canal running through town. On the river, Riverfront Park has a pavilion, a walking pier, a playground, and benches for watching the boats. The borough is separate from neighboring Point Pleasant Beach, though the two share the 08742 ZIP code, and the Point Pleasant School District serves students from pre-kindergarten through Point Pleasant Borough High School.',
    highlights: [
      'Manasquan River to the north, Beaver Dam Creek to the south',
      'The Point Pleasant Canal runs through the borough',
      'Point Pleasant School District, through Point Pleasant Borough High School',
      'Next to Point Pleasant Beach, which has the boardwalk and an NJ Transit rail station',
    ],
    neighborhoods: [
      { name: 'Manasquan Riverfront', blurb: 'Homes along the river on the borough’s northern edge, near Riverfront Park.' },
      { name: 'Point Pleasant Canal', blurb: 'Homes near the canal that runs through the borough.' },
      { name: 'Beaver Dam Creek', blurb: 'Creekside homes on the borough’s southern edge.' },
    ],
    marketOverview:
      'Point Pleasant Borough has homes on the river, the canal, and the creek, along with inland streets. Waterfront and inland homes are priced differently, and flood zones vary from street to street, so I look at recent nearby sales and flood maps for each specific address.',
    buyerTips: [
      'Confirm the municipality: Point Pleasant Borough and Point Pleasant Beach share a ZIP code but have separate taxes, schools, and services.',
      'Evaluate elevation and insurance requirements, as proximity to the Manasquan River and other waterways affects flood zone designations.',
      'Look beyond surface cosmetics—location and lot orientation are the hardest things to change later.',
    ],
    sellerTips: [
      'Present the exterior well: tidy landscaping and fresh paint help a home photograph and show well.',
      'Highlight nearby amenities in your listing, such as marinas, parks, and dining.',
      'Use professional twilight photography to showcase outdoor entertaining spaces.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 40.0832, longitude: -74.0682 },
    faqs: [
      {
        question: 'What is the difference between Point Pleasant Borough and Point Pleasant Beach?',
        answer:
          'They are separate municipalities with separate school districts, although they share the 08742 ZIP code. Point Pleasant Borough is bounded by the Manasquan River and Beaver Dam Creek. Point Pleasant Beach, to the east, has the oceanfront boardwalk.',
      },
      {
        question: 'What public transit serves Point Pleasant Borough?',
        answer:
          'NJ Transit’s North Jersey Coast Line stops at Point Pleasant Beach station, in neighboring Point Pleasant Beach. In the borough itself, NJ Transit bus route 317 and Ocean Ride local buses provide service.',
      },
    ],
  },
  {
    slug: 'barnegat-nj',
    name: 'Barnegat',
    county: 'Ocean County',
    zipCodes: ['08005'],
    angle: 'Bayfront village with homes on both sides of the Parkway',
    photo: 'barnegat',
    metaTitle:
      'Barnegat, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Barnegat Township real estate guidance from Jacquelyn Guevara: neighborhoods along the Route 9 corridor and newer homes west of the Parkway, including Ocean Acres.',
    headline: 'Barnegat, NJ Homes for Sale & Real Estate',
    subheadline:
      'Bay access, a historic district, and neighborhoods on both sides of the Parkway.',
    idxCity: 'Barnegat',
    intro:
      'Barnegat Township reaches from Barnegat Bay to newer neighborhoods west of the Garden State Parkway. Along the bay, you’ll find a public dock and boardwalk, boat launching, and a bay beach, and the township’s historic district has parks, antique and gift shops, restaurants, and museums. Part of Ocean Acres is in Barnegat; the rest is in neighboring Stafford Township.',
    highlights: [
      'Barnegat Bay waterfront with a public dock, boat launch, and bay beach',
      'Part of Ocean Acres, west of the Parkway',
      'Barnegat Township School District, including Barnegat High School',
      'Separate from Barnegat Light on Long Beach Island',
    ],
    neighborhoods: [
      { name: 'Route 9 Corridor', blurb: 'Neighborhoods on the township’s east side.' },
      { name: 'Ocean Acres', blurb: 'Newer homes west of the Parkway, shared with Stafford Township.' },
      { name: '55+ Communities', blurb: 'Active-adult communities such as Four Seasons at Mirage and Heritage Point.' },
    ],
    marketOverview:
      'Barnegat has neighborhoods along the Route 9 corridor, newer homes west of the Parkway, including part of Ocean Acres, and several active-adult communities. Location relative to the bay and the Parkway affects commute, lot size, and flood considerations, and I’ll walk you through those trade-offs.',
    buyerTips: [
      'Compare homes east and west of the Parkway; commute, flood zone, and lot size often differ.',
      'In 55+ communities, review HOA fees, rules, and age requirements early.',
      'Ask for an elevation certificate on any home near the bay.',
    ],
    sellerTips: [
      'Price against recent sales in your own section of the township.',
      'Highlight updates and outdoor space in your listing.',
      'Have HOA documents ready if your home is in a planned or 55+ community.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.7529, longitude: -74.2229 },
    faqs: [
      {
        question: 'Is Barnegat the same as Barnegat Light?',
        answer:
          'No. Barnegat is a mainland township on Route 9. Barnegat Light is a separate borough at the northern tip of Long Beach Island, home to the Barnegat Lighthouse.',
      },
      {
        question: 'Which schools serve Barnegat?',
        answer:
          'The Barnegat Township School District serves the township from elementary grades through Barnegat High School. The NJ Department of Education publishes School Performance Reports for each school.',
      },
    ],
  },
  {
    slug: 'bayville-nj',
    name: 'Bayville',
    county: 'Ocean County',
    zipCodes: ['08721'],
    angle: 'Berkeley Township living along Barnegat Bay',
    photo: 'bayville',
    metaTitle:
      'Bayville, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Bayville real estate guidance from Jacquelyn Guevara: Berkeley Township neighborhoods along Route 9 and Barnegat Bay, with Central Regional schools for grades 7–12.',
    headline: 'Bayville, NJ Homes for Sale & Real Estate',
    subheadline: 'Berkeley Township neighborhoods between Route 9 and Barnegat Bay.',
    idxCity: ['Bayville', 'Berkeley'],
    intro:
      'Bayville is a community within Berkeley Township, which stretches from Barnegat Bay to the Pinelands. Near the bay, you’ll find lagoon neighborhoods such as Glen Cove; inland, established streets sit along the Route 9 corridor, and Garden State Parkway exits 77 and 80 make getting around easy.',
    highlights: [
      'Part of Berkeley Township (ZIP 08721)',
      'Route 9, with Garden State Parkway exits 77 and 80',
      'Berkeley Township schools through grade 6; Central Regional for grades 7–12',
      'Berkeley Township lies along Barnegat Bay',
    ],
    neighborhoods: [
      { name: 'Bayside', blurb: 'Homes near Barnegat Bay, including lagoon neighborhoods such as Glen Cove.' },
      { name: 'Route 9 Corridor', blurb: 'Established neighborhoods close to shopping and services.' },
      { name: 'Western Berkeley', blurb: 'West of the Parkway, with Pinelands areas and senior communities such as Holiday City and Silver Ridge.' },
    ],
    marketOverview:
      'Bayville’s homes range from modest single-family houses to homes near the bay and on lagoons. Distance to the water, flood zone, and condition shape pricing, so I compare recent sales close to your specific street.',
    buyerTips: [
      'For bay and lagoon homes, check bulkheads, flood zones, and insurance costs before you offer.',
      'Confirm whether a home is in Bayville or another Berkeley Township section; it can affect services and schools.',
      'Drive the Route 9 commute at the times you’ll actually travel.',
    ],
    sellerTips: [
      'Price against recent Berkeley Township sales close to your street.',
      'Have flood, elevation, and bulkhead paperwork ready for waterfront homes.',
      'Small updates and clean outdoor space help homes stand out online.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.9093, longitude: -74.1549 },
    faqs: [
      {
        question: 'Is Bayville its own town?',
        answer:
          'No. Bayville is a community within Berkeley Township in Ocean County. Property taxes and municipal services are handled by Berkeley Township.',
      },
      {
        question: 'Which schools serve Bayville?',
        answer:
          'Younger students attend the Berkeley Township School District, and students in grades 7–12 attend the Central Regional School District. The NJ Department of Education publishes School Performance Reports for each school.',
      },
    ],
  },
  {
    slug: 'beach-haven-nj',
    name: 'Beach Haven',
    county: 'Ocean County',
    zipCodes: ['08008'],
    angle: 'Ocean, bay & in-town homes on LBI',
    photo: 'beach-haven',
    metaTitle:
      'Beach Haven, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Beach Haven real estate guidance from Jacquelyn Guevara: ocean-side, bay-side, and in-town homes on Long Beach Island, with flood and rental questions answered.',
    headline: 'Beach Haven, NJ Homes for Sale on Long Beach Island',
    subheadline:
      'Ocean-side, bay-side, and in-town homes on southern Long Beach Island.',
    idxCity: 'Beach Haven',
    intro:
      'Beach Haven, on the southern part of Long Beach Island, keeps the beach and the bay within easy reach throughout the borough. Its Schooner’s Wharf and Historic Bay Village shopping districts and Fantasy Island amusement park give it a lively summer feel. From the mainland, Route 72 across the Manahawkin Bay Bridge is the island’s only road connection.',
    highlights: [
      'On Long Beach Island; Route 72 is the island’s only road link to the mainland',
      'Ocean beaches and Little Egg Harbor Bay within easy reach',
      'Schooner’s Wharf and Historic Bay Village shopping districts',
      'Year-round homes, second homes, and seasonal rentals',
    ],
    neighborhoods: [
      { name: 'Ocean Side', blurb: 'Homes on the blocks closest to the beach.' },
      { name: 'In Town', blurb: 'Streets near the shops, restaurants, and summer attractions.' },
      { name: 'Bay Side', blurb: 'Homes with bay views and access toward Little Egg Harbor Bay.' },
    ],
    marketOverview:
      'Beach Haven attracts both year-round owners and second-home buyers. Pricing depends heavily on distance to the ocean or bay, elevation, and rental history, so I make close comparisons with recent nearby sales.',
    buyerTips: [
      'Review flood zone, elevation, and insurance quotes before making an offer on the island.',
      'If you plan to rent the home, ask about rental history and local rental rules.',
      'Consider summer traffic on Route 72 when planning year-round use.',
    ],
    sellerTips: [
      'Share rental income history if the home has been rented; investors will ask.',
      'Have elevation certificates and recent improvements documented.',
      'I can help you time your listing around the season buyers are searching most.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.5593, longitude: -74.2432 },
    faqs: [
      {
        question: 'How do you get to Beach Haven?',
        answer:
          'Beach Haven is on Long Beach Island. From the mainland, take Route 72 across the Manahawkin Bay Bridge, the island’s only road access, then follow local roads to Beach Haven.',
      },
      {
        question: 'Do I need flood insurance in Beach Haven?',
        answer:
          'Many island homes are in FEMA flood zones, and lenders typically require flood insurance there. Review the elevation certificate and get insurance quotes before you make an offer.',
      },
    ],
  },
  {
    slug: 'beachwood-nj',
    name: 'Beachwood',
    county: 'Ocean County',
    zipCodes: ['08722'],
    angle: 'Small borough on the Toms River',
    photo: 'beachwood',
    metaTitle:
      'Beachwood, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Beachwood real estate guidance from Jacquelyn Guevara: single-family neighborhoods in an Ocean County borough on the Toms River, with a borough beach and marina.',
    headline: 'Beachwood, NJ Homes for Sale & Real Estate',
    subheadline:
      'A residential borough on the Toms River, with a borough beach and municipal marina.',
    idxCity: 'Beachwood',
    intro:
      'Beachwood is a residential borough on the Toms River, where residents enjoy a borough beach and the Riverfront Marina and boat ramp. It borders Berkeley Township, Pine Beach, and South Toms River, the Garden State Parkway passes through town, and students attend the Toms River Regional Schools.',
    highlights: [
      'On the Toms River, with a borough beach and municipal marina',
      'The Garden State Parkway passes through the borough',
      'Part of the Toms River Regional Schools',
      'Single-family neighborhoods',
    ],
    neighborhoods: [
      { name: 'Riverside', blurb: 'Streets near the Toms River, the borough beach, and the marina.' },
      { name: 'Central Beachwood', blurb: 'Established single-family neighborhoods.' },
      { name: 'Parkway Area', blurb: 'Homes near the Garden State Parkway, which passes through the borough.' },
    ],
    marketOverview:
      'Beachwood is mostly single-family neighborhoods, and the streets near the river have their own appeal. Recent sales near a specific street are the best guide to pricing, and I’ll pull those for you.',
    buyerTips: [
      'Check flood zones and insurance costs, even if a home isn’t waterfront.',
      'Compare recent sales street by street, since values vary by location.',
      'Check drive times to the Parkway and downtown Toms River.',
    ],
    sellerTips: [
      'Price against the most recent Beachwood sales near your street.',
      'Highlight updates such as roofs, HVAC, and windows.',
      'Note proximity to the river, the borough beach, and the marina in your listing.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.939, longitude: -74.1929 },
    faqs: [
      {
        question: 'Which schools serve Beachwood?',
        answer:
          'Beachwood is part of the Toms River Regional Schools. The NJ Department of Education publishes School Performance Reports for each school.',
      },
      {
        question: 'Is Beachwood on the water?',
        answer:
          'Yes. Beachwood is on the Toms River, with a borough beach and the borough’s Riverfront Marina, where residents get priority for slip rentals. It borders Berkeley Township, Pine Beach, and South Toms River.',
      },
    ],
  },
  {
    slug: 'lacey-nj',
    name: 'Lacey',
    county: 'Ocean County',
    zipCodes: ['08731', '08734'],
    angle: 'Forked River & Lanoka Harbor lagoons and woods',
    photo: 'lacey',
    metaTitle:
      'Lacey Township, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Lacey Township real estate guidance from Jacquelyn Guevara: homes in Forked River and Lanoka Harbor, east of the Parkway, with Pine Barrens forest to the west.',
    headline: 'Lacey Township, NJ Homes for Sale & Real Estate',
    subheadline:
      'Forked River and Lanoka Harbor, between Barnegat Bay and the Pine Barrens.',
    idxCity: ['Lacey', 'Forked River', 'Lanoka Harbor'],
    intro:
      'Lacey Township sits between two beautiful landscapes: Barnegat Bay to the east, with lagoon communities near the water, and the pine and cedar forest of New Jersey’s Pine Barrens west of the Garden State Parkway. Most of the township’s homes are in Forked River and Lanoka Harbor, east of the Parkway.',
    highlights: [
      'Forked River and Lanoka Harbor, with lagoon communities near Barnegat Bay',
      'Pine and cedar forest of the Pine Barrens west of the Parkway',
      'Lacey Township School District, including Lacey Township High School',
      'Garden State Parkway and Route 9 access',
    ],
    neighborhoods: [
      { name: 'Forked River', blurb: 'One of the township’s two main communities, east of the Parkway.' },
      { name: 'Lanoka Harbor', blurb: 'The township’s other main community, east of the Parkway.' },
      { name: 'Lagoon Communities', blurb: 'Homes on lagoons near Barnegat Bay.' },
    ],
    marketOverview:
      'Most of Lacey’s homes are in Forked River and Lanoka Harbor, east of the Parkway. For lagoon and waterfront homes, water access, bulkhead condition, and flood zone affect pricing, and I’ll help you weigh each one.',
    buyerTips: [
      'For lagoon homes, check bulkheads, dock condition, and water depth for your boat.',
      'Ask for elevation certificates and flood insurance quotes early.',
      'Compare east and west of Route 9; lifestyle and price differ.',
    ],
    sellerTips: [
      'Have bulkhead, dock, and elevation documentation ready for buyers.',
      'Highlight boating access and outdoor space.',
      'Price against recent sales on similar lagoons or streets.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.8398, longitude: -74.1901 },
    faqs: [
      {
        question: 'Is Forked River the same as Lacey Township?',
        answer:
          'Forked River is a community within Lacey Township, along with Lanoka Harbor. Mailing addresses may say Forked River or Lanoka Harbor, but taxes and services are handled by Lacey Township.',
      },
      {
        question: 'Which schools serve Lacey?',
        answer:
          'The Lacey Township School District serves the township through Lacey Township High School. The NJ Department of Education publishes School Performance Reports for each school.',
      },
    ],
  },
  {
    slug: 'lakewood-nj',
    name: 'Lakewood',
    county: 'Ocean County',
    zipCodes: ['08701'],
    angle: 'Large township with a wide range of housing',
    photo: 'lakewood',
    metaTitle:
      'Lakewood, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Lakewood real estate guidance from Jacquelyn Guevara: single-family homes, townhomes, condos, and active-adult communities near Lake Carasaljo’s parkland.',
    headline: 'Lakewood, NJ Homes for Sale & Real Estate',
    subheadline: 'Single-family homes, townhomes, condos, and active-adult communities in northern Ocean County.',
    idxCity: 'Lakewood',
    intro:
      'Lakewood’s centerpiece is Lake Carasaljo, set within 176 acres of parkland where people fish, bike, run, and picnic, with Georgian Court University along its shore. The township is also home to ShoreTown Ballpark and the Jersey Shore BlueClaws, and the Garden State Parkway and Routes 9, 70, and 88 all pass through.',
    highlights: [
      'Garden State Parkway and Routes 9, 70, and 88',
      'Lake Carasaljo and 176 acres of surrounding parkland',
      'Georgian Court University and ShoreTown Ballpark',
      'Single-family homes, townhomes, condos, and active-adult communities',
    ],
    neighborhoods: [
      { name: 'Lake Carasaljo Area', blurb: 'Neighborhoods near the lake, its parkland, and Georgian Court University.' },
      { name: 'Townhomes & Condos', blurb: 'Planned communities with lower-maintenance living.' },
      { name: 'Active-Adult Communities', blurb: 'Age-restricted neighborhoods with their own HOA rules.' },
    ],
    marketOverview:
      'Lakewood has a wide range of housing types, from older single-family homes to new construction, townhomes, and age-restricted communities. Inventory and pricing vary considerably from one section to another, so I compare homes of the same type in the same area.',
    buyerTips: [
      'Compare HOA fees and rules carefully between townhome, condo, and 55+ communities.',
      'For new construction, review the builder’s warranty and the timeline in writing.',
      'Check commute routes to the Parkway and Route 9 at your travel times.',
    ],
    sellerTips: [
      'Price against recent sales of the same home type in your section of the township.',
      'Have HOA documents and any permits for additions ready for buyers.',
      'Clear photos and accurate square footage help listings stand out.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 40.0821, longitude: -74.2097 },
    faqs: [
      {
        question: 'What types of homes are in Lakewood?',
        answer:
          'Lakewood has single-family homes, townhomes, condominiums, new construction, and active-adult (55+) communities.',
      },
      {
        question: 'How do you get around from Lakewood?',
        answer:
          'The Garden State Parkway passes through the eastern part of the township, and Routes 9, 70, and 88 also pass through Lakewood.',
      },
    ],
  },
  {
    slug: 'lavallette-nj',
    name: 'Lavallette',
    county: 'Ocean County',
    zipCodes: ['08735'],
    angle: 'Quiet barrier-island borough between ocean and bay',
    photo: 'lavallette',
    metaTitle:
      'Lavallette, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Lavallette real estate guidance from Jacquelyn Guevara: ocean-side and bay-side homes on the Barnegat Peninsula, with flood and rental considerations explained.',
    headline: 'Lavallette, NJ Homes for Sale & Real Estate',
    subheadline:
      'Ocean-side and bay-side homes on the Barnegat Peninsula.',
    idxCity: 'Lavallette',
    intro:
      'Lavallette gives you the ocean and the bay in one borough on the Barnegat Peninsula. Ocean beaches and a boardwalk line one side, and two bay beaches on Barnegat Bay offer calmer water on the other. Route 35 runs through town.',
    highlights: [
      'Ocean beaches, plus two bay beaches on Barnegat Bay',
      'Route 35 runs through the borough',
      'Bordered by Toms River Township’s Dover Beaches sections',
      'Year-round homes, second homes, and seasonal rentals',
    ],
    neighborhoods: [
      { name: 'Ocean Side', blurb: 'Homes east of Route 35, closest to the beach.' },
      { name: 'Bay Side', blurb: 'Homes west of Route 35, toward Barnegat Bay.' },
    ],
    marketOverview:
      'Value in Lavallette depends on ocean or bay proximity, elevation, and condition, so I make careful comparisons with recent nearby sales.',
    buyerTips: [
      'Review elevation certificates and flood insurance costs before making an offer.',
      'Ask whether the home has been raised or rebuilt and request permits and documentation.',
      'If renting, check local rental rules and the home’s rental history.',
    ],
    sellerTips: [
      'Have elevation, permit, and improvement records ready.',
      'Highlight the home’s distance to the beach and the bay.',
      'Share rental history if the home has been rented.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.9704, longitude: -74.069 },
    faqs: [
      {
        question: 'Is Lavallette on the ocean or the bay?',
        answer:
          'Both. Lavallette is on the Barnegat Peninsula, between the Atlantic Ocean and Barnegat Bay, with ocean beaches and two bay beaches.',
      },
      {
        question: 'Do I need flood insurance in Lavallette?',
        answer:
          'Many homes are in FEMA flood zones, and lenders typically require flood insurance there. Review the elevation certificate and get quotes before you make an offer.',
      },
    ],
  },
  {
    slug: 'little-egg-harbor-nj',
    name: 'Little Egg Harbor',
    county: 'Ocean County',
    zipCodes: ['08087'],
    angle: 'Mystic Island lagoons & Pinelands neighborhoods',
    photo: 'little-egg-harbor',
    metaTitle:
      'Little Egg Harbor, NJ Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Little Egg Harbor real estate guidance from Jacquelyn Guevara: Mystic Island lagoon homes, inland neighborhoods, and retirement communities in southern Ocean County.',
    headline: 'Little Egg Harbor, NJ Homes for Sale & Real Estate',
    subheadline:
      'Mystic Island lagoon homes and inland neighborhoods at the southern end of Ocean County.',
    idxCity: ['Little Egg Harbor', 'Mystic Island'],
    intro:
      'Little Egg Harbor Township is Ocean County’s southernmost municipality, and it surrounds the borough of Tuckerton. Mystic Island, a large lagoon community, has waterways leading out to Great Bay, and inland you’ll find established neighborhoods and many newer retirement communities.',
    highlights: [
      'Mystic Island, a large lagoon development with boat access to Great Bay',
      'Garden State Parkway and Route 9 pass through the township',
      'Little Egg Harbor schools through grade 6; Pinelands Regional for grades 7–12',
      'Many newer retirement communities',
    ],
    neighborhoods: [
      { name: 'Mystic Island', blurb: 'A large, mostly waterfront lagoon development, with lagoons leading to Great Bay.' },
      { name: 'Inland Neighborhoods', blurb: 'Homes away from the lagoons.' },
      { name: 'Retirement Communities', blurb: 'Newer neighborhoods for older adults, each with its own rules and fees.' },
    ],
    marketOverview:
      'Little Egg Harbor offers lagoon homes in Mystic Island, inland neighborhoods, and retirement communities. For waterfront homes, elevation, bulkheads, and flood insurance weigh heavily on value, and I’ll help you review them early.',
    buyerTips: [
      'For lagoon homes, check bulkheads, elevation, and flood insurance costs early.',
      'Ask whether a home has been raised or rebuilt and request documentation.',
      'In 55+ communities, review HOA fees and rules before you offer.',
    ],
    sellerTips: [
      'Have elevation and bulkhead documentation ready for waterfront homes.',
      'Highlight boating access and updates.',
      'Price against recent sales on similar lagoons or streets.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.5965, longitude: -74.3418 },
    faqs: [
      {
        question: 'Is Mystic Island part of Little Egg Harbor?',
        answer: 'Yes. Mystic Island is a lagoon community within Little Egg Harbor Township.',
      },
      {
        question: 'Which schools serve Little Egg Harbor?',
        answer:
          'Younger students attend the Little Egg Harbor Township School District, and students in grades 7–12 attend the Pinelands Regional School District. The NJ Department of Education publishes School Performance Reports for each school.',
      },
    ],
  },
  {
    slug: 'manchester-nj',
    name: 'Manchester',
    county: 'Ocean County',
    zipCodes: ['08759'],
    angle: 'Large Pinelands township including Whiting',
    photo: 'manchester',
    metaTitle:
      'Manchester Township, NJ Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Manchester Township real estate guidance from Jacquelyn Guevara: Whiting, Ridgeway, and Pine Lake Park, with many retirement and active-adult communities.',
    headline: 'Manchester Township, NJ Homes for Sale & Real Estate',
    subheadline: 'Single-family neighborhoods and active-adult communities across a wooded Pinelands township.',
    idxCity: 'Manchester',
    intro:
      'Manchester Township lies largely within the New Jersey Pinelands, with neighborhoods set among the pines. It includes Whiting, Ridgeway, and Pine Lake Park, and it completely surrounds the separate Borough of Lakehurst. Route 70 runs through the heart of the township, and Route 37 crosses its eastern side.',
    highlights: [
      'Includes Whiting, Ridgeway, and Pine Lake Park',
      'Routes 37 and 70 cross the township',
      'Manchester Township School District, including Manchester Township High School',
      'Many retirement and active-adult communities, especially in Whiting',
    ],
    neighborhoods: [
      { name: 'Whiting', blurb: 'The township’s west side, with many retirement communities.' },
      { name: 'Pine Lake Park', blurb: 'A census-designated community within the township.' },
      { name: 'Ridgeway', blurb: 'A community within the township.' },
    ],
    marketOverview:
      'Manchester’s market is shaped by its many active-adult communities and its single-family neighborhoods. HOA terms, land-lease arrangements, and location within the township all affect pricing, and I’ll help you compare them clearly.',
    buyerTips: [
      'In 55+ communities, review HOA fees, rules, and age requirements early.',
      'Ask whether a home is on owned land or in a land-lease community.',
      'Check drive times to Route 37, Route 70, and shopping.',
    ],
    sellerTips: [
      'Have HOA and community documents ready for buyers.',
      'Price against recent sales inside your community or neighborhood.',
      'Highlight updates and low-maintenance features.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.992, longitude: -74.364 },
    faqs: [
      {
        question: 'Is Whiting part of Manchester Township?',
        answer:
          'Yes. Whiting is a community within Manchester Township. See the Whiting page for more about its neighborhoods.',
      },
      {
        question: 'Is Lakehurst part of Manchester?',
        answer:
          'No. Lakehurst is a separate borough surrounded by Manchester Township.',
      },
    ],
  },
  {
    slug: 'seaside-heights-nj',
    name: 'Seaside Heights',
    county: 'Ocean County',
    zipCodes: ['08751'],
    angle: 'Boardwalk borough on the barrier island',
    photo: 'seaside-heights',
    metaTitle:
      'Seaside Heights, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Seaside Heights real estate guidance from Jacquelyn Guevara: homes and apartments near the boardwalk, with rental rules and flood considerations explained.',
    headline: 'Seaside Heights, NJ Homes for Sale & Real Estate',
    subheadline:
      'Homes and apartments near the boardwalk and the beach.',
    idxCity: 'Seaside Heights',
    intro:
      'Seaside Heights is known for its lively boardwalk and two amusement piers, Casino Pier and Funtown Pier, with the beach right alongside. Route 37 crosses the Thomas A. Mathis and J. Stanley Tunney Bridges to Toms River on the mainland. Compared with many shore towns, it has a sizable number of apartments.',
    highlights: [
      'Boardwalk with Casino Pier and Funtown Pier',
      'Route 37 bridges to Toms River',
      'On the Barnegat Peninsula, with an ocean beach',
      'Homes, apartments, and seasonal rentals',
    ],
    neighborhoods: [
      { name: 'Boardwalk Blocks', blurb: 'Homes closest to the beach and boardwalk.' },
      { name: 'Bay Side', blurb: 'Streets west of the main corridors, closer to the bay.' },
      { name: 'Central Seaside Heights', blurb: 'Apartments and homes between the boardwalk and the bay.' },
    ],
    marketOverview:
      'Seaside Heights draws second-home buyers and investors as well as year-round owners. Rental history, condo association rules, and flood considerations are central to evaluating a property here.',
    buyerTips: [
      'For condos, review association budgets, reserves, and rental rules.',
      'If you plan to rent, ask for rental history and check borough rental requirements.',
      'Review flood zone, elevation, and insurance costs before you offer.',
    ],
    sellerTips: [
      'Share rental income history and association documents up front.',
      'Highlight distance to the beach and boardwalk.',
      'I can help you time your listing around peak buyer interest.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.9443, longitude: -74.0729 },
    faqs: [
      {
        question: 'How do you get to Seaside Heights?',
        answer:
          'Seaside Heights is on the Barnegat Peninsula. From the mainland, take Route 37 east from Toms River across the Thomas A. Mathis and J. Stanley Tunney Bridges.',
      },
      {
        question: 'Can I rent out a home in Seaside Heights?',
        answer:
          'Many owners do, but rental rules and registration requirements apply. Check the borough’s current requirements, and for condos, the association’s rules, before you buy.',
      },
    ],
  },
  {
    slug: 'seaside-park-nj',
    name: 'Seaside Park',
    county: 'Ocean County',
    zipCodes: ['08752'],
    angle: 'Gateway to Island Beach State Park',
    photo: 'seaside-park',
    metaTitle:
      'Seaside Park, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Seaside Park real estate guidance from Jacquelyn Guevara: ocean-side and bay-side homes on the Barnegat Peninsula, along Route 35 toward Island Beach State Park.',
    headline: 'Seaside Park, NJ Homes for Sale & Real Estate',
    subheadline:
      'Beach and bay homes on Route 35, the road to Island Beach State Park.',
    idxCity: 'Seaside Park',
    intro:
      'Seaside Park sits on the Barnegat Peninsula with the ocean on one side and Barnegat Bay on the other. Route 35, its main road, continues south to Island Beach State Park, nearly 10 miles of natural barrier beach. The borough borders Seaside Heights and Berkeley Township.',
    highlights: [
      'Route 35 continues south to Island Beach State Park',
      'Between the Atlantic Ocean and Barnegat Bay',
      'Borders Seaside Heights, where Route 37 crosses to the mainland',
      'Year-round homes, second homes, and seasonal rentals',
    ],
    neighborhoods: [
      { name: 'Ocean Side', blurb: 'Homes on the blocks closest to the beach.' },
      { name: 'Bay Side', blurb: 'Homes on the bay side, near the borough marina on Barnegat Bay.' },
      { name: 'South End', blurb: 'Streets toward Island Beach State Park.' },
    ],
    marketOverview:
      'In Seaside Park, elevation, distance to the ocean or bay, and condition drive value, so I compare recent nearby sales closely.',
    buyerTips: [
      'Review elevation certificates and flood insurance costs before you offer.',
      'Ask whether the home has been raised or rebuilt and request permits.',
      'If you plan to rent, check rental rules and the home’s rental history.',
    ],
    sellerTips: [
      'Have elevation, permit, and improvement records ready.',
      'Highlight access to the beach, the bay, and Island Beach State Park.',
      'Share rental history if the home has been rented.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.9265, longitude: -74.0771 },
    faqs: [
      {
        question: 'Is Seaside Park the same as Seaside Heights?',
        answer:
          'No. They are separate boroughs that border each other on the Barnegat Peninsula.',
      },
      {
        question: 'Do I need flood insurance in Seaside Park?',
        answer:
          'Many homes are in FEMA flood zones, and lenders typically require flood insurance there. Review the elevation certificate and get quotes before you make an offer.',
      },
    ],
  },
  {
    slug: 'tuckerton-nj',
    name: 'Tuckerton',
    county: 'Ocean County',
    zipCodes: ['08087'],
    angle: 'Historic bayside borough on Route 9',
    photo: 'tuckerton',
    metaTitle:
      'Tuckerton, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Tuckerton real estate guidance from Jacquelyn Guevara: in-town homes on Route 9 near the Tuckerton Seaport and Lake Pohatcong, in southern Ocean County.',
    headline: 'Tuckerton, NJ Homes for Sale & Real Estate',
    subheadline:
      'Seaport history on Route 9, nestled between the Pine Barrens and the bay.',
    idxCity: 'Tuckerton',
    intro:
      'Tuckerton, nestled between the Pine Barrens and the bay, was once a thriving seaport, and the Tuckerton Seaport, a working maritime museum and village on Route 9, keeps that history alive. Main Street runs along Lake Pohatcong, and lagoon communities in the Tuckerton Beach area lead toward Little Egg Harbor Bay. The borough is surrounded by Little Egg Harbor Township.',
    highlights: [
      'Tuckerton Seaport maritime museum and village',
      'Main Street along Lake Pohatcong',
      'Route 9, with the Garden State Parkway nearby',
      'Tuckerton schools through grade 6; Pinelands Regional for grades 7–12',
    ],
    neighborhoods: [
      { name: 'Historic Center', blurb: 'Older homes along and near Route 9.' },
      { name: 'Lakeside', blurb: 'Streets near Lake Pohatcong.' },
      { name: 'Tuckerton Beach', blurb: 'Lagoon homes toward Little Egg Harbor Bay.' },
    ],
    marketOverview:
      'Tuckerton has older in-town homes near Route 9 and Lake Pohatcong, plus lagoon homes in the Tuckerton Beach area. Near the water, elevation and flood insurance weigh heavily on value; in town, condition and updates matter most.',
    buyerTips: [
      'For lagoon homes, check bulkheads, elevation, and flood insurance early.',
      'For older homes, plan for a thorough inspection of systems and foundation.',
      'Compare recent sales in Tuckerton and neighboring Little Egg Harbor.',
    ],
    sellerTips: [
      'Have elevation, bulkhead, and improvement records ready.',
      'Highlight historic character and recent updates.',
      'Price against recent sales of similar homes nearby.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 39.6032, longitude: -74.3404 },
    faqs: [
      {
        question: 'Is Tuckerton the same as Little Egg Harbor?',
        answer:
          'No. Tuckerton is a separate borough surrounded by Little Egg Harbor Township. The two share the 08087 ZIP code and the Pinelands Regional School District for grades 7–12.',
      },
      {
        question: 'What is the Tuckerton Seaport?',
        answer:
          'The Tuckerton Seaport is a working maritime museum and village on Route 9 (West Main Street) in the borough.',
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
    metaTitle:
      'Tinton Falls, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Tinton Falls real estate guidance from Jacquelyn Guevara: single-family homes, townhomes, and condos in a Monmouth County borough bordering Red Bank.',
    headline: 'Tinton Falls, NJ Homes for Sale & Real Estate',
    subheadline:
      'Single-family neighborhoods, townhomes, and condos in Monmouth County.',
    idxCity: 'Tinton Falls',
    intro:
      'Tinton Falls is a Monmouth County borough with deep roots: its historic district, the oldest settled part of town, sits across from the natural falls that once powered its mills. Today it offers detached homes, townhomes, and condos, and Garden State Parkway exits 100, 102, 105, and 109 make trips along the shore and toward northern New Jersey convenient.',
    highlights: [
      'Garden State Parkway exits 100, 102, 105, and 109',
      'Tinton Falls School District, with high school at Monmouth Regional',
      'A mix of single-family homes, townhomes, and condominiums',
      'Borders Red Bank',
    ],
    neighborhoods: [
      { name: 'Single-Family Neighborhoods', blurb: 'Established streets with detached homes and yards.' },
      { name: 'Townhomes & Condos', blurb: 'Lower-maintenance options in planned communities.' },
      { name: 'Historic Tinton Falls', blurb: 'The borough’s oldest settled area, across from the falls that once powered its mills.' },
    ],
    marketOverview:
      'Tinton Falls offers detached homes, townhomes, and condominiums, which gives buyers several ways into Monmouth County. Parkway access matters to many buyers, so commute routes are worth comparing.',
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
          'Yes. Garden State Parkway exits 100, 102, 105, and 109 are in the borough.',
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
    metaTitle:
      'Manalapan, NJ Homes & Real Estate | Jacquelyn Guevara',
    metaDescription:
      'Manalapan real estate guidance from Jacquelyn Guevara: single-family homes and 55+ communities in western Monmouth County, near Monmouth Battlefield State Park.',
    headline:
      'Manalapan, NJ Homes for Sale & Real Estate',
    subheadline:
      'Established neighborhoods and 55+ communities in western Monmouth County, with my guidance and more than 15 years of real estate experience.',
    idxCity: 'Manalapan',
    intro:
      'Manalapan offers established single-family neighborhoods and 55+ communities, with Monmouth Battlefield State Park extending into the township. U.S. Route 9, Route 33, and County Routes 522 and 527 cross Manalapan, and NJ Transit’s Route 139 bus runs to the Port Authority Bus Terminal in New York. Students attend the Manalapan-Englishtown Regional School District through grade 8, then Manalapan High School or Freehold Township High School.',
    highlights: [
      'Manalapan-Englishtown Regional Schools and the Freehold Regional High School District',
      'Single-family homes and 55+ communities such as Covered Bridge',
      'NJ Transit Route 139 bus to the Port Authority Bus Terminal in New York',
      'Monmouth Battlefield State Park and the Manalapan Recreation Center',
    ],
    neighborhoods: [
      { name: 'Gordons Corner', blurb: 'A community within the township, with its own fire company.' },
      { name: '55+ Communities', blurb: 'Active-adult options including Covered Bridge, near the county’s Pine Brook Golf Course.' },
      { name: 'Established Subdivisions', blurb: 'Single-family neighborhoods across the township.' },
    ],
    marketOverview:
      'Manalapan offers single-family homes in established subdivisions as well as 55+ communities. Prices vary with neighborhood, lot size, and the age and condition of the home, so recent nearby sales are the best guide.',
    buyerTips: [
      'Confirm which high school serves a specific address: Manalapan students attend Manalapan High School or Freehold Township High School.',
      'Factor in property taxes and lot sizes when evaluating long-term value in different sections of the township.',
      'Consider commute routes such as Route 9, Route 33, and NJ Transit’s Route 139 bus to New York when comparing sections of the township.',
    ],
    sellerTips: [
      'First impressions matter: a well-kept lawn and thoughtful staging help a home show well.',
      'Highlight custom upgrades, outdoor living spaces, and energy-efficient home features in your listing marketing.',
      'Price against recent sales in your neighborhood rather than county-wide averages.',
    ],
    marketStats: placeholderStats(),
    geo: { latitude: 40.2807, longitude: -74.3437 },
    faqs: [
      {
        question: 'What areas are in Manalapan?',
        answer:
          'Manalapan includes the community of Gordons Corner, established single-family subdivisions, and 55+ communities such as Covered Bridge.',
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
 * Areas without a community page yet (shown only as a preview note).
 * Every service area has a page.
 */
export const candidateAreas: string[] = [];

/** "Toms River, Brick, Manahawkin, Whiting, and Tinton Falls": the first `n` towns in page order. */
export const townList = (n = towns.length) => {
  const names = towns.slice(0, n).map((t) => t.name);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}` : names.join('');
};

export const getTown = (slug: string) => towns.find((t) => t.slug === slug);

/**
 * Her service areas (originally from her former brokerage profile), plus Tinton Falls
 * and Manalapan. Aliases (e.g. "Point Pleasant Boro") link to their main page.
 */
export const serviceAreas = towns
  .flatMap((t) => [{ name: t.name, slug: t.slug }, ...(t.aliases ?? []).map((a) => ({ name: a, slug: t.slug }))])
  .sort((a, b) => a.name.localeCompare(b.name));

/** Towns shown as photo tiles on the homepage (all towns are on /communities/). */
const FEATURED: TownSlug[] = ['toms-river-nj', 'brick-nj', 'point-pleasant-nj', 'seaside-heights-nj', 'beach-haven-nj', 'manahawkin-nj'];
export const featuredTowns = () => FEATURED.map((slug) => towns.find((t) => t.slug === slug)!);

/** The `n` towns closest to `town`, for "nearby communities". */
export function nearbyTowns(town: Town, n = 4) {
  const dist = (a: Town) => Math.hypot(a.geo.latitude - town.geo.latitude, (a.geo.longitude - town.geo.longitude) * Math.cos((town.geo.latitude * Math.PI) / 180));
  return towns.filter((t) => t.slug !== town.slug).sort((a, b) => dist(a) - dist(b)).slice(0, n);
}
