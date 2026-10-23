import { site } from '@/data/site';
import type { Town } from '@/data/towns';

/** Live MLS search on her RE/MAX Revolution site, for one town or all areas. */
export const listingsUrl = (town?: Pick<Town, 'remaxArea'>) =>
  town ? `${site.listingsSite}/areas/${town.remaxArea}/nj` : `${site.listingsSite}/index.php?advanced=1`;
