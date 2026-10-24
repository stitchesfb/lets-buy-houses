/**
 * Single source of truth for Jacquelyn's verified business details.
 *
 * Everything here is confirmed by Jacquelyn or her family unless marked TODO.
 * Do not add awards, sales numbers, testimonials, languages or affiliations
 * until they are confirmed in writing. Keep name, address and phone identical
 * to her Google Business Profile and brokerage listings (local SEO "NAP").
 */
export const site = {
  domain: 'letsbuyhouses.com',
  url: 'https://letsbuyhouses.com',
  /** Website name; not her brokerage. */
  brand: "Let's Buy Houses",
  /**
   * Origin the built site is served from right now. Used for absolute asset URLs
   * (social preview images, schema images). At launch, set this to `url` and
   * `base` to '/' in astro.config.mjs.
   */
  liveOrigin: 'https://stitchesfb.github.io',
  /** Page language. Spanish can be added later once Jacquelyn confirms she serves Spanish-speaking clients. */
  lang: 'en-US',

  agent: {
    /** Her professional name. Do not use a nickname anywhere on the site. */
    name: 'Jacquelyn Guevara',
    legalName: 'Jacquelyn Guevara',
    firstName: 'Jacquelyn',
    title: 'Associate',
    /** From her bio: "a licensed real estate professional with RE/MAX Revolution for over 15 years". */
    yearsLicensed: '15+',
    /** From her bio: "an Ocean County resident for over 35 years". */
    yearsInOceanCounty: '35+',
    /** NJ Real Estate Commission license — must appear on all advertising. */
    licenseNumber: '1005595',
    headshot: '/images/jacquelyn-guevara.jpg', // 1200x1200, also used for social previews
    /** Two sentences taken verbatim from her bio, for short introductions. */
    intro: [
      'As an Ocean County resident for over 35 years and a licensed real estate professional with RE/MAX Revolution for over 15 years, I don’t just know the Jersey Shore and Monmouth County markets—I’ve lived them.',
      'When you work with me, you don’t get an agent who waits for things to happen—you get a partner who makes them happen.',
    ],
    bio: 'Hello, I’m Jacquelyn Guevara. As an Ocean County resident for over 35 years and a licensed real estate professional with RE/MAX Revolution for over 15 years, I don’t just know the Jersey Shore and Monmouth County markets—I’ve lived them. When you work with me, you don’t get an agent who waits for things to happen—you get a partner who makes them happen. I’ve built my career on relentless work ethic, rapid communication, and fierce negotiation. Whether marketing a listing in Manalapan, navigating waterfront properties in Point Pleasant and Brick, or guiding buyers near Manahawkin, I treat every home as if it were my own investment. Over 15+ years, my reputation has been built on quick turnarounds, seamless closings, and exceptional outcomes. Whether selling a family estate, acquiring an investment, or relocating to the Shore, I deliver what you need—faster, smarter, and stronger than expected.',
    /** Her renovation and resale experience, as provided. Shown at the top of the About page. */
    renovation:
      'Alongside my work in real estate, I’ve managed home renovation and resale projects from start to finish. That hands-on experience gives me a practical understanding of a home’s potential, the decisions involved in improving it, and how to prepare it for the market.',
    /** How she works, drawn from her bio. Shown in "Why Work With Jacquelyn?". */
    approach: [
      {
        title: 'Rapid, clear communication',
        body: 'I answer calls, texts and questions promptly, so you always know where things stand and what comes next.',
      },
      {
        title: 'Determined negotiation',
        body: 'Whether you’re buying or selling, I negotiate hard for the strongest possible terms on your behalf.',
      },
      {
        title: 'Organized from start to closing',
        body: 'From our first conversation to the closing table, I keep the details moving so the process stays smooth and on schedule.',
      },
    ],
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
    /** Listed as her "Work Phone" on her RE/MAX Revolution agent page. */
    officePhone: '(732) 678-1328' as string,
  },

  contact: {
    phone: '(732) 773-3075', // direct line — the number leads call/text
    phoneHref: 'tel:+17327733075',
    smsHref: 'sms:+17327733075',
    email: 'jackienguevara@gmail.com',
  },

  /** Office coordinates for schema. TODO: copy from the Google Business Profile pin. */
  geo: null as { latitude: number; longitude: number } | null,

  /**
   * Her RE/MAX Revolution website, which runs the live MLS search (Monmouth County
   * Association of REALTORS). Used for "Browse current listings" links.
   */
  listingsSite: 'https://jguevara.remaxbb.com',

  social: {
    youtube: '', // TODO: add once the channel exists
    facebook: '', // TODO
    instagram: '', // TODO
    zillow: '', // TODO: Zillow agent profile URL (reviews)
    realtorCom: '', // TODO: Realtor.com agent profile URL (reviews)
    realSatisfied: '', // TODO: RealSatisfied profile URL (reviews)
    googleBusiness: '', // TODO: Google Business Profile share link
  },
} as const;

export type Site = typeof site;
