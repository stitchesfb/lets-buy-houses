/**
 * IDX provider configuration. Switch providers with env vars only — no
 * component changes needed. See docs/IDX-INTEGRATION.md.
 */
export type IdxProvider = 'placeholder' | 'iframe' | 'script' | 'idx-broker';

export const idxConfig = {
  provider: (import.meta.env.PUBLIC_IDX_PROVIDER || 'placeholder') as IdxProvider,
  /** For `iframe`: hosted search URL. `{city}` is replaced with the town's MLS city name. */
  iframeUrl: import.meta.env.PUBLIC_IDX_IFRAME_URL || '',
  /** For `script`: vendor widget loader URL. */
  scriptSrc: import.meta.env.PUBLIC_IDX_SCRIPT_SRC || '',
  /** For `idx-broker`: account domain, e.g. https://letsbuyhouses.idxbroker.com */
  idxBrokerDomain: (import.meta.env.PUBLIC_IDX_BROKER_DOMAIN || '').replace(/\/$/, ''),
};

/** Build the URL a search should load for a given town (or all markets). */
export function idxSearchUrl(city?: string): string {
  const { provider, iframeUrl, idxBrokerDomain } = idxConfig;
  const enc = encodeURIComponent(city ?? '');
  if (provider === 'iframe' && iframeUrl) return iframeUrl.replaceAll('{city}', enc);
  if (provider === 'idx-broker' && idxBrokerDomain) {
    // IDX Broker hosted results page. Swap for a saved-link URL per town for best results.
    return `${idxBrokerDomain}/idx/results/listings${city ? `?ccz=city&city[]=${enc}` : ''}`;
  }
  return '';
}
