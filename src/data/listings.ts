/**
 * Featured properties: REAL, approved listings only.
 *
 * Add an entry when Jacquelyn has a listing to feature. `source` controls the label:
 *   'agent'     → "Jacquelyn’s Listing"
 *   'brokerage' → "1st Class Real Estate Agency Listing"
 *   'mls'       → "MLS Listing", with `listingBrokerage` shown as "Courtesy of …"
 *                 (IDX rules require crediting the listing brokerage).
 * Photos: put files in src/assets/listings/ and import them here.
 *
 * Sample listings for the design preview live in src/data/demo/listings.ts and
 * are never shown when PUBLIC_SITE_MODE=production.
 */
import type { ImageMetadata } from 'astro';

export interface Listing {
  id: string;
  status: 'For Sale' | 'Under Contract' | 'Sold';
  price: number;
  street: string;
  city: string;
  zip?: string;
  beds: number;
  baths: number;
  sqft?: number;
  source: 'agent' | 'brokerage' | 'mls';
  listingBrokerage?: string;
  /** Property page (e.g. the MLS or brokerage listing). Required for real listings. */
  url?: string;
  photo?: ImageMetadata;
  /** True only for demonstration entries. */
  demo?: boolean;
}

export const listings: Listing[] = [];
