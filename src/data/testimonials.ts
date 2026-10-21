/**
 * TODO: Replace with REAL client reviews (with permission), ideally copied
 * verbatim from Google / Zillow so they can be verified. Never publish
 * invented reviews — it violates FTC rules and Google's review policies.
 * These entries are clearly-marked samples for layout only.
 */
export interface Testimonial {
  quote: string;
  name: string;
  town: string;
  type: 'Buyer' | 'Seller' | 'Buyer & Seller';
  rating: 1 | 2 | 3 | 4 | 5;
  source?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'SAMPLE REVIEW — replace with a real client quote about selling a home in Manalapan.',
    name: 'Client Name',
    town: 'Manalapan',
    type: 'Seller',
    rating: 5,
    source: 'Google',
  },
  {
    quote: 'SAMPLE REVIEW — replace with a real client quote about buying a waterfront home in Point Pleasant.',
    name: 'Client Name',
    town: 'Point Pleasant',
    type: 'Buyer',
    rating: 5,
    source: 'Zillow',
  },
  {
    quote: 'SAMPLE REVIEW — replace with a real client quote about a move to Manahawkin / LBI.',
    name: 'Client Name',
    town: 'Manahawkin',
    type: 'Buyer & Seller',
    rating: 5,
    source: 'Google',
  },
];
