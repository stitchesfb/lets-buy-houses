/**
 * Helpers for the `base` path in astro.config.mjs ('/' on letsbuyhouses.com; a subpath
 * such as /lets-buy-houses only for a project-path preview). Use withBase() for every
 * root-relative link or asset so either setup works.
 */
import { site } from '@/data/site';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes root-relative paths with the base ('/search/' stays '/search/' at the domain root). Leaves external, tel:, #hash links untouched. */
export const withBase = (path: string) => (path.startsWith('/') ? `${BASE}${path}` : path);

/** Removes the base from a pathname, for canonical URLs on the production domain. */
export const stripBase = (pathname: string) =>
  BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;

/** '/images/x.jpg' → 'https://letsbuyhouses.com/images/x.jpg' (social previews, structured data). */
export const absoluteUrl = (path: string) => new URL(withBase(path), site.url).href;
