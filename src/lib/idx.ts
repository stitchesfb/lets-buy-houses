/**
 * IDX provider configuration. Switch providers with env vars only — no
 * component changes needed. See docs/IDX-INTEGRATION.md.
 */
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
