/**
 * JSON-LD structured data builders (schema.org).
 * Validate output at https://search.google.com/test/rich-results
 */
import { site } from '@/data/site';
import { towns, type Faq, type Town } from '@/data/towns';
import { absoluteUrl } from '@/lib/paths';

/** Stable entity IDs, reused by every page so search engines see one Person and one brokerage. */
const personId = `${site.url}/#jacquelyn`;
const brokerageId = `${site.url}/#brokerage`;
const servicesId = `${site.url}/#services`;
const websiteId = `${site.url}/#website`;

const brokerageAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: site.brokerage.address.street,
  addressLocality: site.brokerage.address.city,
  addressRegion: site.brokerage.address.region,
  postalCode: site.brokerage.address.postalCode,
  addressCountry: site.brokerage.address.country,
});

const city = (t: Pick<Town, 'name' | 'county'>) => ({
  '@type': 'City',
  name: `${t.name}, NJ`,
  containedInPlace: { '@type': 'AdministrativeArea', name: `${t.county}, NJ` },
});

/**
 * Jacquelyn (Person), her brokerage (a separate business), and the services she provides.
 * Only verified facts belong here: no ratings, review counts, prices, awards or profile
 * links until confirmed. The brokerage office phone stays out (footer disclosure only).
 */
export function identitySchema() {
  const { agent, brokerage, contact, social } = site;
  const sameAs = Object.values(social).filter(Boolean);
  const logo = { '@type': 'ImageObject', url: absoluteUrl(brokerage.logo.src), width: brokerage.logo.width, height: brokerage.logo.height };
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': personId,
      name: agent.legalName,
      url: site.url,
      image: absoluteUrl(agent.headshot),
      jobTitle: agent.title,
      description: `${agent.legalName} is a licensed real estate salesperson with ${brokerage.name}, helping buyers and sellers in Ocean and Monmouth counties, New Jersey.`,
      telephone: contact.phone,
      email: contact.email,
      worksFor: { '@id': brokerageId },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: 'New Jersey real estate salesperson license',
        identifier: agent.licenseNumber,
        recognizedBy: { '@type': 'GovernmentOrganization', name: 'New Jersey Real Estate Commission' },
      },
      memberOf: { '@type': 'Organization', name: 'National Association of REALTORS®', url: 'https://www.nar.realtor/' },
      ...(sameAs.length > 0 && { sameAs }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      '@id': brokerageId,
      name: brokerage.name,
      logo,
      image: logo.url,
      address: brokerageAddress(),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': servicesId,
      name: 'Residential real estate services',
      serviceType: ['Buyer representation', 'Seller representation', 'Home value reviews'],
      provider: { '@id': personId },
      areaServed: towns.map(city),
    },
  ];
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: site.brand,
    publisher: { '@id': personId },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.url, site.url).href,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function townPageSchema(town: Town) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site.url}/${town.slug}/#webpage`,
    url: `${site.url}/${town.slug}/`,
    name: town.metaTitle,
    description: town.metaDescription,
    isPartOf: { '@id': websiteId },
    about: {
      ...city(town),
      geo: { '@type': 'GeoCoordinates', latitude: town.geo.latitude, longitude: town.geo.longitude },
    },
    author: { '@id': personId },
  };
}

export function videoSchema(v: { id: string; title: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    // TODO: add uploadDate (ISO 8601) per video — required for video rich results.
  };
}
