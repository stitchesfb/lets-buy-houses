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
  /**
   * Origin the built site is served from right now. Used for absolute asset URLs
   * (social preview images, schema images). At launch, set this to `url` and
   * `base` to '/' in astro.config.mjs.
   */
  liveOrigin: 'https://stitchesfb.github.io',

  agent: {
    name: 'Jacquelyn "Jackie" Guevara',
    /** Name without the nickname, for structured data and anywhere quotes read awkwardly. */
    legalName: 'Jacquelyn Guevara',
    firstName: 'Jackie',
    title: 'Associate',
    yearsExperience: 17,
    /** NJ Real Estate Commission license — must appear on all advertising. */
    licenseNumber: '1005595',
    headshot: '/images/jackie-guevara.jpg', // 1200x1200
    bio: 'Hello, I’m Jacquelyn Guevara, a proud Ocean County resident for over 35 years and a licensed real estate agent for more than 15. When you work with me, you don’t get an agent who waits for things to happen—you get someone who makes them happen. I built my business on hard work, rapid communication, and fierce negotiation. My clients know that when I take on a listing or represent a buyer, I move fast, stay organized, and fight for the strongest possible outcome. I treat every home as if it were my own investment, and I don’t stop until the deal is closed on your terms.',
  },

  brokerage: {
    name: 'RE/MAX Revolution',
    address: {
      street: '48 Brick Blvd',
      city: 'Brick',
      region: 'NJ',
      postalCode: '08723',
      country: 'US',
    },
    officePhone: '' as string, // TODO: brokerage office number (shown in the footer when set)
  },

  contact: {
    phone: '(732) 773-3075', // direct line — the number leads call/text
    phoneHref: 'tel:+17327733075',
    smsHref: 'sms:+17327733075',
    email: 'hello@letsbuyhouses.com', // TODO
  },

  /** Office coordinates for schema. TODO: copy from the Google Business Profile pin. */
  geo: null as { latitude: number; longitude: number } | null,

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
