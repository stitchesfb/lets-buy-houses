/**
 * Helpers for the `base` path in astro.config.mjs (e.g. /lets-buy-houses on the
 * GitHub Pages preview). Use withBase() for every root-relative link or asset.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** '/search/' → '/lets-buy-houses/search/'. Leaves external, tel:, #hash links untouched. */
export const withBase = (path: string) => (path.startsWith('/') ? `${BASE}${path}` : path);

/** '/lets-buy-houses/brick-nj/' → '/brick-nj/', for canonical URLs on the production domain. */
export const stripBase = (pathname: string) =>
  BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;
