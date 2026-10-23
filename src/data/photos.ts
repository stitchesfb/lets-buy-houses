/**
 * Local photography. Drop a JPG into src/assets/photos/ named after a key below,
 * add its credit, and every place that uses that key picks it up (Astro resizes
 * and converts it to WebP/AVIF at build time). Missing files fall back to a
 * styled placeholder, so the layout never breaks.
 *
 * Current photos are public-domain or Creative Commons images from Flickr,
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

export const credits: Record<string, PhotoCredit> = {
  hero: {
    title: 'Aerial view of Manahawkin, New Jersey',
    author: 'Lauren Owens Lambert / U.S. Fish and Wildlife Service',
    ...PD,
    sourceUrl: 'https://www.flickr.com/photos/usfwsnortheast/51856403896/',
    alt: 'Aerial view of lagoon-front homes in Manahawkin, New Jersey, beside the bay',
    position: '55% 40%',
  },
  manahawkin: {
    title: 'Manahawkin – Sunset',
    author: 'thisisbossi',
    ...BYSA2,
    sourceUrl: 'https://www.flickr.com/photos/thisisbossi/3903167556/',
    alt: 'Sunset over the bay at Manahawkin, New Jersey',
    position: '50% 65%',
  },
  'toms-river': {
    title: 'Just After Sunrise On Toms River',
    author: 'James Loesch',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/jal33/32749916852/',
    alt: 'Sunrise over the Toms River framed by bare trees along the shore',
    position: '50% 55%',
  },
  'seaside-heights': {
    title: 'Seaside Height Boardwalk',
    author: 'James Loesch',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/34920192@N02/20709319834',
    alt: 'The boardwalk at night in Seaside Heights, New Jersey',
    position: '50% 50%',
  },
  'seaside-park': {
    title: 'Island Beach State Park',
    author: 'James Loesch',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/34920192@N02/52378074308',
    alt: 'Aerial view of Island Beach State Park, just south of Seaside Park',
    position: '50% 50%',
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
    title: 'Barnegat Bay Sunset',
    author: 'Garden State Hiker',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/42693172@N05/9543327812',
    alt: 'Sunset over Barnegat Bay',
    position: '50% 60%',
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
    title: 'New Jersey Pine Barrens Fall Colors #2',
    author: 'James Loesch',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/34920192@N02/51671948499',
    alt: 'Aerial view of fall color in the New Jersey Pine Barrens',
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
    title: 'Above the Manasquan Inlet jetty and Point Pleasant Beach',
    author: 'James Loesch',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/jal33/51695142307/',
    alt: 'Aerial view of the Manasquan Inlet jetty and the beach at Point Pleasant Beach',
  },
  manalapan: {
    title: 'Monmouth Battlefield SP',
    author: 'Jim Lukach',
    ...BY2,
    sourceUrl: 'https://www.flickr.com/photos/65047661@N00/7776410346/',
    alt: 'Wildflowers in a meadow at Monmouth Battlefield State Park, which extends into Manalapan',
    position: '50% 60%',
  },
  brick: {
    title: 'Forsythe After Cleanup – Brick Township',
    author: 'Virginia Rettig / U.S. Fish and Wildlife Service',
    ...PD,
    sourceUrl: 'https://www.flickr.com/photos/usfwsnortheast/14060417632/',
    alt: 'Marsh and pine woods at the Edwin B. Forsythe National Wildlife Refuge in Brick Township',
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
