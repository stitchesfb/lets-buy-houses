import { listings } from '@/data/listings';
import { demoListings } from '@/data/demo/listings';
import { isPreview } from '@/lib/mode';

/** Real listings; in preview only, sample cards stand in when there are none. */
export function featuredListings() {
  const real = listings.filter((l) => !l.demo);
  return real.length ? real : isPreview ? demoListings : [];
}
