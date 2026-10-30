/**
 * Local photography. Drop a JPG into src/assets/photos/ named after a key below,
 * add its credit, and every place that uses that key picks it up (Astro resizes
 * and converts it to WebP/AVIF at build time). Missing files fall back to a
 * styled placeholder, so the layout never breaks.
 *
 * Current photos are public-domain or Creative Commons images from Flickr and Wikimedia Commons,
 * credited on /photo-credits/ (CC BY licenses require it). Replace them with
 * Jacquelyn's own photography whenever it's available.
 */
import type { ImageMetadata } from 'astro';


export interface PhotoCredit {
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  /** What the photo shows, used as alt text. */
  alt: string;
  /** CSS object-position for crops, e.g. '50% 70%'. */
  position?: string;
}

const PD = { license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/' };
const BY2 = { license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' };
const BYSA2 = { license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/' };
const BYSA4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' };
const BYSA3 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' };
const BY3 = { license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/' };
const BY4 = { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' };
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const credits: Record<string, PhotoCredit> = {
  'home-hero': {
    title: 'Sea Girt, New Jersey',
    author: 'Doug Kerr',
    ...BYSA2,
    sourceUrl: 'https://www.flickr.com/photos/dougtone/16070173405/',
    alt: 'A classic Jersey Shore home with a turret and wraparound porch in Sea Girt, New Jersey',
    position: '50% 28%',
  },
  'path-buy': {
    title: 'Sea Girt, New Jersey',
    author: 'Doug Kerr',
    ...BYSA2,
    sourceUrl: 'https://www.flickr.com/photos/dougtone/15882749868/',
    alt: 'A shingled shore home with a covered front porch',
    position: '62% 55%',
  },
  'path-sell': {
    title: 'Porch',
    author: 'cdanna2003',
    ...BYSA2,
    sourceUrl: 'https://www.flickr.com/photos/49565454@N00/835706654/',
    alt: 'A colonial home’s front entry with hanging flower baskets',
    position: '45% 55%',
  },
  'seller-band': {
    title: 'Sea Girt, New Jersey',
    author: 'Doug Kerr',
    ...BYSA2,
    sourceUrl: 'https://www.flickr.com/photos/dougtone/15447879494/',
    alt: 'A white shore home with flower beds along the front walk',
    position: '40% 60%',
  },
  brick: {
    title: '5:07 PM Friday Night on the Metedeconk River',
    author: 'James Loesch',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/jal33/52634442304/',
    alt: 'Sunset over a dock on the Metedeconk River in Brick',
    position: '50% 55%',
  },
  manahawkin: {
    title: 'Aerial view of Manahawkin, New Jersey',
    author: 'Lauren Owens Lambert / U.S. Fish and Wildlife Service',
    ...PD,
    sourceUrl: 'https://www.flickr.com/photos/usfwsnortheast/51856403896/',
    alt: 'Aerial view of lagoon-front homes in Manahawkin, beside the bay',
    position: '55% 40%',
  },
  'toms-river': {
    title: 'Toms River, NJ',
    author: 'kurtlewisart',
    ...BYSA2,
    sourceUrl: 'https://www.flickr.com/photos/49977862@N03/10036529104/',
    alt: 'Boat slips and a riverside walkway on the Toms River on a sunny day',
    position: '50% 50%',
  },
  'seaside-heights': {
    title: 'Sunday Afternoon Seaside Heights',
    author: 'James Loesch',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/jal33/14217014945/',
    alt: 'The beach and amusement pier beside the boardwalk in Seaside Heights, New Jersey, on a summer afternoon',
    position: '55% 50%',
  },
  'seaside-park': {
    title: 'Sunrise Over Seaside Park New Jersey, Jersey Shore',
    author: 'Michael Vadon',
    ...BYSA2,
    sourceUrl: 'https://www.flickr.com/photos/80038275@N00/19605571783/',
    alt: 'Sunrise over the ocean from the beach in Seaside Park',
    position: '50% 45%',
  },
  'beach-haven': {
    title: 'Beach Haven, Long Beach Island, New Jersey — 2022',
    author: 'JFGryphon',
    license: 'CC0 1.0 (public domain dedication)',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    sourceUrl: 'https://www.flickr.com/photos/30484128@N03/52254269619',
    alt: 'A street in Beach Haven on Long Beach Island',
    position: '50% 60%',
  },
  'lavallette': {
    title: 'Lavallette, New Jersey',
    author: 'alisonpavlos',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/7884462@N04/2901603744',
    alt: 'Rocks and surf along the beach in Lavallette, New Jersey',
    position: '50% 50%',
  },
  'barnegat': {
    title: 'Barnegat Bay - Summer 2008',
    author: 'James Hertan',
    ...BY3,
    sourceUrl: commons('Barnegat_Bay_-_Summer_2008_-_panoramio.jpg'),
    alt: 'A sailboat on Barnegat Bay off Barnegat Township, with Barnegat Lighthouse in the distance',
    position: '60% 50%',
  },
  'tuckerton': {
    title: 'Tuckerton Seaport',
    author: 'LancerE',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/34132829@N07/3481271146',
    alt: 'The lighthouse at the Tuckerton Seaport',
    position: '60% 50%',
  },
  'manchester': {
    title: 'Harry Wright Lake',
    author: 'ManchesterTwp',
    ...BYSA4,
    sourceUrl: commons('Harry_Wright_Lake.jpg'),
    alt: 'The beach and swimming area at Harry Wright Lake in Manchester Township',
    position: '50% 50%',
  },
  'whiting': {
    title: 'New Jersey Pine Barrens Fall Colors',
    author: 'James Loesch',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/34920192@N02/51641253719',
    alt: 'Aerial view of a pond and fall foliage in the New Jersey Pine Barrens',
    position: '50% 50%',
  },
  beachwood: {
    title: 'Jakes Branch County Park',
    author: 'Hypnotica Studios Infinite',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/15119648@N04/10675157916',
    alt: 'A trail through pines and red blueberry brush at Jakes Branch County Park in Beachwood',
    position: '50% 55%',
  },
  'point-pleasant': {
    title: 'Manasquan River downstream from NJ Route 70, July 2026',
    author: 'Mr. Matté',
    ...BYSA4,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Manasquan_River_downstream_from_NJ_Route_70,_July_2026.jpg',
    alt: 'Boats and marinas along the Point Pleasant Borough shore of the Manasquan River',
    position: '70% 75%',
  },
  'pine-beach': {
    title: 'View of Island Heights, NJ from Pine Beach, Dec. 2024',
    author: 'Mr. Matté',
    ...BYSA4,
    sourceUrl: commons('View_of_Island_Heights,_NJ_from_Pine_Beach,_Dec._2024.jpg'),
    alt: 'The Toms River seen from the Pine Beach shoreline on a clear day',
    position: '50% 60%',
  },
  'ocean-gate': {
    title: 'Jeffreys Creek, Ocean Gate, NJ, Dec. 2024',
    author: 'Mr. Matté',
    ...BYSA4,
    sourceUrl: commons('Jeffreys_Creek,_Ocean_Gate,_NJ,_Dec._2024.jpg'),
    alt: 'Homes along Jeffreys Creek in Ocean Gate',
    position: '50% 50%',
  },
  mantoloking: {
    title: 'Above Mantoloking',
    author: 'James Loesch',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/jal33/48015407501/',
    alt: 'Aerial view of Mantoloking, with homes between the dunes and Route 35 along the ocean',
    position: '50% 55%',
  },
  'point-pleasant-beach': {
    title: 'Point Pleasant Beach boardwalk',
    author: 'Leif Knutsen',
    ...BYSA3,
    sourceUrl: commons('Point_Pleasant_Beach_boardw.jpg'),
    alt: 'The beach and boardwalk in Point Pleasant Beach',
    position: '50% 60%',
  },
  'red-bank': {
    title: 'Navesink River 2023',
    author: 'Antony-22',
    ...BYSA4,
    sourceUrl: commons('Navesink_River_2023.jpg'),
    alt: 'Aerial view of Red Bank and the Navesink River',
    position: '50% 50%',
  },
  'asbury-park': {
    title: 'Asbury Park Oceanfront Aerial (October 15, 2025)',
    author: 'Szeremeta',
    ...BY4,
    sourceUrl: commons('Asbury_Park_Oceanfront_Aerial_(October_15,_2025).jpg'),
    alt: 'Aerial view of the Asbury Park beach, boardwalk, and oceanfront',
    position: '50% 55%',
  },
  neptune: {
    title: 'Golden Hour at Ocean Grove Fishing Pier',
    author: 'Sri Reddy Photography',
    ...BYSA4,
    sourceUrl: commons('Golden_Hour_at_Ocean_Grove_Fishing_Pier.jpg'),
    alt: 'Sunrise over the fishing pier in Ocean Grove, part of Neptune Township',
    position: '50% 45%',
  },
  middletown: {
    title: 'Black Fish Cove, Hartshorne Woods Park - beach',
    author: 'Zeete',
    ...BYSA4,
    sourceUrl: commons('Black_Fish_Cove,_Hartshorne_Woods_Park_-_beach.jpg'),
    alt: 'A sandy cove on the Navesink River at Hartshorne Woods Park in Middletown',
    position: '50% 55%',
  },
  jackson: {
    title: 'Autumn view east from the northwest shore of Prospertown Lake',
    author: 'Famartin',
    ...BYSA4,
    sourceUrl: commons('2024-10-21_12_27_23_Autumn_view_east_from_the_northwest_shore_of_Prospertown_Lake_in_Jackson_Township,_Ocean_County,_New_Jersey.jpg'),
    alt: 'Prospertown Lake in Jackson Township on an autumn day',
    position: '50% 55%',
  },
  lacey: {
    title: 'Lake along Davenport Branch west of Ocean CR 614, Lacey Township, NJ, July 2025',
    author: 'Mr. Matté',
    ...BYSA4,
    sourceUrl: commons('Lake_along_Davenport_Branch_west_of_Ocean_CR_614,_Lacey_Township,_NJ,_July_2025.jpg'),
    alt: 'A lake surrounded by pine forest along the Davenport Branch in Lacey Township',
    position: '50% 60%',
  },
  'tinton-falls': {
    title: 'TintonFalls Falls1',
    author: 'Wikijazz (Flickr4Jazz)',
    ...BYSA3,
    sourceUrl: commons('TintonFalls_Falls1.jpg'),
    alt: 'The waterfall in the historic district of Tinton Falls',
    position: '50% 55%',
  },
  manalapan: {
    title: 'Monmouth Battlefield SP',
    author: 'Jim Lukach',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/65047661@N00/7776410346/',
    alt: 'Wildflowers in a meadow at Monmouth Battlefield State Park, which extends into Manalapan',
    position: '50% 60%',
  },
};

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.{jpg,jpeg,png,webp}', { eager: true });

export interface Photo extends PhotoCredit {
  src: ImageMetadata;
}

/** Returns the photo for a key, or undefined if its file hasn't been added yet. */
export function photo(key: string | undefined): Photo | undefined {
  if (!key) return undefined;
  const file = Object.entries(files).find(([path]) => path.split('/').pop()!.replace(/\.\w+$/, '') === key);
  return file && credits[key] ? { ...credits[key], src: file[1].default } : undefined;
}

/** Every credited photo whose file is present (for /photo-credits/). */
export const creditedPhotos = (): Photo[] =>
  Object.keys(credits).map((k) => photo(k)).filter((p): p is Photo => Boolean(p));
