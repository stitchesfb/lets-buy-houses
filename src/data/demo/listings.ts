/**
 * DEMONSTRATION LISTINGS — NOT REAL PROPERTIES.
 * Used only in preview mode to show the property card design in the towns
 * Jacquelyn serves. Street addresses are fictional placeholders; cards are
 * labeled "Sample" and have no inquiry action. Replace with real listings in
 * src/data/listings.ts.
 */
import type { Listing } from '@/data/listings';

export const demoListings: Listing[] = [
  { id: 'demo-1', demo: true, status: 'For Sale', price: 525000, street: '000 Sample Lane', city: 'Toms River', beds: 3, baths: 2, sqft: 1700, source: 'agent' },
  { id: 'demo-2', demo: true, status: 'Under Contract', price: 615000, street: '000 Example Court', city: 'Tinton Falls', beds: 3, baths: 2.5, sqft: 1950, source: 'brokerage' },
  { id: 'demo-3', demo: true, status: 'For Sale', price: 339000, street: '000 Placeholder Drive', city: 'Whiting', beds: 2, baths: 2, sqft: 1300, source: 'agent' },
  { id: 'demo-4', demo: true, status: 'Sold', price: 459000, street: '000 Demo Road', city: 'Bayville', beds: 3, baths: 2, sqft: 1600, source: 'mls', listingBrokerage: 'Sample Brokerage' },
];
