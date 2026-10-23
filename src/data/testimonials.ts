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

/**
 * Review totals shown in the testimonials header, as provided by Jacquelyn.
 * Update `total` when the count on her profiles changes.
 */
export const reviewSummary = {
  total: '30+',
  rating: 5,
  platforms: ['Zillow', 'Realtor.com', 'RealSatisfied'] as ReviewSource[],
};

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

// Exact review text as published on each platform. Do not edit the wording.
export const testimonials: Testimonial[] = [
  {
    name: 'Danielle Melapioni',
    town: 'Forked River',
    source: 'RealSatisfied',
    date: 'March 11, 2023',
    rating: 5,
    quote:
      "Jackie was amazing she went above and beyond. I didn't have a word in the world. Trusted her completely and would highly recommend Jackie was amazing. We had a contingent sale and the stress of finding a home was huge. She had sold our house within 4 days pending us finding something. Encouraged us not to settle and we would find something. She kept her word. She found us not just any home. But our dream home. She made sure our contingent sale went off flawlessly and we are currently sitting in our dream home writing this review :).",
  },
  {
    name: 'Domenica Bergin',
    town: 'Freehold',
    source: 'RealSatisfied',
    date: 'March 6, 2023',
    rating: 5,
    quote: 'Jackie has helped me close 4 deals in 4 years. She is 4/4! Thank you again for your professionalism and patience.',
  },
  {
    name: 'Steven Humphrey',
    town: 'Barnegat',
    source: 'RealSatisfied',
    date: 'May 13, 2022',
    rating: 5,
    quote:
      'Jacquelyn is a very aggressive agent, very attentive and gets the job done. She makes everything go as painless as possible and is always there when you need her. She did flawless execution of both sale and purchase of our new home to both close the same day. Couldn’t of asked for a better experience and she performed at a very high level as expected. We will always use her and recommend her for all real estate needs Always there when needed, she went above and beyond to ensure things went well and to calm nerves She made magic happen, I can’t say enough good things about her.',
  },
  {
    name: 'John',
    town: 'Toms River',
    source: 'Realtor.com',
    date: 'January 2, 2020',
    rating: 5,
    quote:
      'Ms. Guevara was exceptional as a realtor. She was highly knowledgeable about the local market. With a smile and encouragement, she guided us through the whole process, always quick to respond to an e-mail, text or call. She made what could be a daunting process both fun and exciting, and ultimately got us into our dream home. I would recommend her to anyone.',
  },
];

const time = (t: Testimonial) => (t.date ? Date.parse(t.date) || 0 : 0);
/** Reviews ready to display (quote filled in), newest first. */
export const publishedTestimonials = () =>
  testimonials.filter((t) => t.quote.trim().length > 0).sort((a, b) => time(b) - time(a));
/** Reviews still waiting for their text (shown as a preview note only). */
export const pendingTestimonials = () => testimonials.filter((t) => !t.quote.trim());
