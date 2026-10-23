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
