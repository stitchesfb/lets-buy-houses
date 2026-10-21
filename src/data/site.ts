/**
 * Single source of truth for the agent's business info (NAP = Name, Address, Phone).
 * Google Local SEO rewards NAP that is identical everywhere — keep this matching
 * the Google Business Profile, Zillow, Realtor.com, and brokerage listings exactly.
 *
 * Every value marked TODO is a placeholder and must be replaced before launch.
 */
export const site = {
  domain: 'letsbuyhouses.com',
  url: 'https://letsbuyhouses.com',
  brand: "Let's Buy Houses",
  tagline: 'Jersey Shore & Central NJ Real Estate',

  agent: {
    name: 'Agent Name', // TODO: full legal/marketing name
    firstName: 'Agent', // TODO
    title: 'REALTOR®',
    yearsExperience: 17,
    licenseNumber: 'NJ License #0000000', // TODO: NJREC requires license disclosure
    headshot: '/images/agent/headshot.svg', // TODO: replace with a real 1200x1500 photo (WebP/JPG)
    bio: 'With 17 years helping families buy and sell across Monmouth and Ocean Counties, I know these towns street by street — the school districts, the flood zones, the commuter routes, and the blocks where homes sell in a weekend.',
  },

  brokerage: {
    name: 'Brokerage Name', // TODO: NJ requires the brokerage name on all advertising
    address: {
      street: '123 Main Street', // TODO
      city: 'Manalapan', // TODO
      region: 'NJ',
      postalCode: '07726', // TODO
      country: 'US',
    },
    officePhone: '(732) 555-0100', // TODO
  },

  contact: {
    phone: '(732) 555-0123', // TODO: mobile — the number leads should call/text
    phoneHref: 'tel:+17325550123', // TODO
    smsHref: 'sms:+17325550123', // TODO
    email: 'hello@letsbuyhouses.com', // TODO
  },

  geo: { latitude: 40.2232, longitude: -74.3337 }, // TODO: office coordinates

  social: {
    youtube: 'https://www.youtube.com/@letsbuyhouses', // TODO
    facebook: '', // TODO
    instagram: '', // TODO
    zillow: '', // TODO: Zillow agent profile (reviews!)
    googleBusiness: '', // TODO: Google Business Profile share link
  },

  /** Headline stats for the trust banner. TODO: replace with verified numbers. */
  stats: [
    { value: '17+', label: 'Years of Local Experience' },
    { value: '500+', label: 'Homes Sold' }, // TODO
    { value: '$250M+', label: 'In Closed Sales' }, // TODO
    { value: '5.0★', label: 'Average Client Rating' }, // TODO
  ],
} as const;

export type Site = typeof site;
