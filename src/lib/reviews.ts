import { site } from '@/data/site';
import type { ReviewSource } from '@/data/testimonials';

/** Her profile on each review platform, when the link has been added in site.ts. */
export const reviewProfiles = (): { source: ReviewSource; url: string }[] =>
  (
    [
      { source: 'Zillow', url: site.social.zillow },
      { source: 'Realtor.com', url: site.social.realtorCom },
      { source: 'RealSatisfied', url: site.social.realSatisfied },
    ] as { source: ReviewSource; url: string }[]
  ).filter((p) => p.url);
