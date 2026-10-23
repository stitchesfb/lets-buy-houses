/**
 * DEMONSTRATION LISTINGS — NOT REAL PROPERTIES.
 * Used only in preview mode to show the property card design. Addresses are
 * fictional; cards are labeled "Sample" and have no inquiry action.
 */
import type { Listing } from '@/data/listings';

export const demoListings: Listing[] = [
  { id: 'demo-1', demo: true, status: 'For Sale', price: 549000, street: '000 Sample Lane', city: 'Brick', beds: 3, baths: 2, sqft: 1650, source: 'jackie' },
  { id: 'demo-2', demo: true, status: 'Under Contract', price: 689000, street: '000 Example Court', city: 'Point Pleasant', beds: 4, baths: 2.5, sqft: 2100, source: 'brokerage' },
  { id: 'demo-3', demo: true, status: 'For Sale', price: 474900, street: '000 Placeholder Drive', city: 'Manahawkin', beds: 3, baths: 2, sqft: 1480, source: 'mls', listingBrokerage: 'Sample Brokerage' },
];
