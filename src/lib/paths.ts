/**
 * Helpers for the `base` path in astro.config.mjs (e.g. /lets-buy-houses on the
 * GitHub Pages preview). Use withBase() for every root-relative link or asset.
 */
import { site } from '@/data/site';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** '/search/' → '/lets-buy-houses/search/'. Leaves external, tel:, #hash links untouched. */
export const withBase = (path: string) => (path.startsWith('/') ? `${BASE}${path}` : path);

/** '/lets-buy-houses/brick-nj/' → '/brick-nj/', for canonical URLs on the production domain. */
export const stripBase = (pathname: string) =>
  BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;

/** '/images/x.jpg' → 'https://stitchesfb.github.io/lets-buy-houses/images/x.jpg' (where the site is live now). */
export const absoluteUrl = (path: string) => new URL(withBase(path), site.liveOrigin).href;
