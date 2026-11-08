/**
 * IDX provider configuration. Switch providers with env vars only — no
 * component changes needed. See docs/IDX-INTEGRATION.md.
 */
import type { TownSlug } from '@/data/towns';

export type IdxProvider = 'placeholder' | 'iframe' | 'script' | 'idx-broker';

/** One MLS city name, or every spelling the MLS files a town under. */
export type IdxCity = string | string[];

export const idxConfig = {
  provider: (import.meta.env.PUBLIC_IDX_PROVIDER || 'placeholder') as IdxProvider,
  /**
   * For `iframe`: hosted search URL. Tokens:
   *   {city}   → first city name, URL-encoded
   *   {cities} → every name as repeated params, e.g. city[]=Manahawkin&city[]=Stafford+Township
   */
  iframeUrl: import.meta.env.PUBLIC_IDX_IFRAME_URL || '',
  /** Query param name used for each city in `{cities}` and on /search/. */
  cityParam: import.meta.env.PUBLIC_IDX_CITY_PARAM || 'city[]',
  /** For `script`: vendor widget loader URL. */
  scriptSrc: import.meta.env.PUBLIC_IDX_SCRIPT_SRC || '',
  /** For `idx-broker`: account domain, e.g. https://letsbuyhouses.idxbroker.com */
  idxBrokerDomain: (import.meta.env.PUBLIC_IDX_BROKER_DOMAIN || '').replace(/\/$/, ''),
};

/**
 * Jacquelyn's hosted IDX Broker pages, linked directly (no embed). Signed-out
 * visitors can browse the map; an account lets buyers save homes and searches.
 */
export const idxLinks = {
  search: 'https://letsbuyhouses.idxbroker.com/idx/map/mapsearch',
  signIn: 'https://letsbuyhouses.idxbroker.com/idx/userlogin',
  signUp: 'https://letsbuyhouses.idxbroker.com/idx/usersignup',
};

/**
 * Saved IDX searches for each community guide, created in Jacquelyn's IDX Broker
 * account. Keyed by the guide's route so every published community needs one.
 */
const idxCommunitySlugs: Record<TownSlug, string> = {
  'asbury-park-nj': 'asbury-park-nj-homes-for-sale',
  'barnegat-nj': 'barnegat-nj-homes-for-sale',
  'bayville-nj': 'bayville-nj-homes-for-sale',
  'beach-haven-nj': 'beach-haven-nj-homes-for-sale',
  'beachwood-nj': 'beachwood-nj-homes-for-sale',
  'brick-nj': 'brick-nj-homes-for-sale',
  'jackson-nj': 'jackson-nj-homes-for-sale',
  'lacey-nj': 'lacey-nj-homes-for-sale',
  'lavallette-nj': 'lavallette-nj-homes-for-sale',
  'manahawkin-nj': 'manahawkin-nj-homes-for-sale',
  'manchester-nj': 'manchester-nj-homes-for-sale',
  'mantoloking-nj': 'mantoloking-nj-homes-for-sale',
  'middletown-nj': 'middletown-nj-homes-for-sale',
  'neptune-township-nj': 'neptune-township-nj-homes-for-sale',
  'ocean-gate-nj': 'ocean-gate-nj-homes-for-sale',
  'ortley-beach-nj': 'ortley-beach-nj-homes-for-sale',
  'pine-beach-nj': 'pine-beach-nj-homes-for-sale',
  'point-pleasant-nj': 'point-pleasant-borough-nj-homes-for-sale',
  'point-pleasant-beach-nj': 'point-pleasant-beach-nj-homes-for-sale',
  'red-bank-nj': 'red-bank-nj-homes-for-sale',
  'seaside-heights-nj': 'seaside-heights-nj-homes-for-sale',
  'seaside-park-nj': 'seaside-park-nj-homes-for-sale',
  'tinton-falls-nj': 'tinton-falls-nj-homes-for-sale',
  'toms-river-nj': 'toms-river-nj-homes-for-sale',
  'whiting-nj': 'whiting-nj-homes-for-sale',
};

/** IDX saved search for a community guide, e.g. https://letsbuyhouses.idxbroker.com/i/brick-nj-homes-for-sale */
export const idxCommunityUrl = (slug: TownSlug): string => `https://letsbuyhouses.idxbroker.com/i/${idxCommunitySlugs[slug]}`;

export const toCityList = (city?: IdxCity): string[] => (city === undefined ? [] : Array.isArray(city) ? city : [city]);

/** `city[]=Manahawkin&city[]=Stafford+Township&city[]=Stafford+Twp` */
export function cityQuery(city?: IdxCity, param = idxConfig.cityParam): string {
  const qs = new URLSearchParams();
  toCityList(city).forEach((c) => qs.append(param, c));
  return qs.toString();
}

/** Build the URL a search should load for a given town (or all markets). */
export function idxSearchUrl(city?: IdxCity): string {
  const { provider, iframeUrl, idxBrokerDomain } = idxConfig;
  const cities = toCityList(city);
  if (provider === 'iframe' && iframeUrl) {
    return iframeUrl.replaceAll('{city}', encodeURIComponent(cities[0] ?? '')).replaceAll('{cities}', cityQuery(cities));
  }
  if (provider === 'idx-broker' && idxBrokerDomain) {
    // IDX Broker hosted results page. Swap for a saved-link URL per town for best results.
    return `${idxBrokerDomain}/idx/results/listings${cities.length ? `?ccz=city&${cityQuery(cities, 'city[]')}` : ''}`;
  }
  return '';
}
