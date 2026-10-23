/**
 * Client testimonials — GENUINE, APPROVED QUOTES ONLY.
 *
 * Add a quote only with the client's permission, ideally copied verbatim from a
 * review Jackie received (Google, Zillow, email). Never edit the meaning or
 * invent quotes. When this list is empty, the testimonials section is hidden
 * on the live site (the preview shows an "awaiting content" note instead).
 */
export interface Testimonial {
  quote: string;
  /** As the client approved it, e.g. "Maria S." */
  name: string;
  context?: string; // e.g. "Sold a home in Brick"
  source?: string; // e.g. "Google review"
}

export const testimonials: Testimonial[] = [];
