/**
 * "Explore Available Homes" on the homepage: up to three live MLS listings.
 *
 * Leave this empty until an approved IDX provider is connected (see
 * docs/IDX-INTEGRATION.md). The section stays hidden on every build, preview
 * included, until real entries exist; there are no sample cards for it.
 *
 * Each entry must come from the approved feed, use `source: 'mls'`, link to its
 * property page (`url`), and credit the listing brokerage (`listingBrokerage`).
 * Entries missing either are skipped. Put the MLS disclaimer your provider
 * requires in `idxDisclaimer`.
 */
import type { Listing } from '@/data/listings';

export const availableHomes: Listing[] = [];

/** MLS/IDX disclaimer text supplied by the provider or MLS. Required once listings show. */
export const idxDisclaimer = '';
