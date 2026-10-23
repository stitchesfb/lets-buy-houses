/**
 * Client testimonials — GENUINE, APPROVED REVIEWS ONLY.
 *
 * Paste each review's text into `quote` EXACTLY as it appears on RealSatisfied,
 * Zillow, or Realtor.com (copy it from her profile; don't rewrite or shorten it
 * in a way that changes the meaning). A review is shown on the site only once its
 * `quote` is filled in. Entries with an empty quote stay hidden.
 *
 * Show the name the way the platform shows it (e.g. "Domenica B." if the review
 * only gives an initial) unless the client has agreed to their full name.
 */
export type ReviewSource = 'RealSatisfied' | 'Zillow' | 'Realtor.com' | 'Google';

export interface Testimonial {
  /** Exact review text. Leave empty until copied from the source. */
  quote: string;
  name: string;
  /** Town the client bought or sold in, e.g. "Toms River". */
  town?: string;
  /** e.g. "Sold a home", "Bought a home". */
  context?: string;
  source?: ReviewSource;
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Link to the review or her profile on the source platform. */
  url?: string;
  /** Review date as shown on the platform, e.g. "March 2025". */
  date?: string;
}

// TODO: paste the exact review text (and town, platform, date) for each client.
export const testimonials: Testimonial[] = [
  { name: 'Danielle Melapioni', rating: 5, quote: '' },
  { name: 'Domenica Bergin', rating: 5, quote: '' },
  { name: 'Steven Humphrey', rating: 5, quote: '' },
  { name: 'John', rating: 5, quote: '' },
];

/** Reviews ready to display (quote filled in). */
export const publishedTestimonials = () => testimonials.filter((t) => t.quote.trim().length > 0);
/** Reviews still waiting for their text (shown as a preview note only). */
export const pendingTestimonials = () => testimonials.filter((t) => !t.quote.trim());
