/**
 * JSON-LD structured data builders (schema.org).
 * Validate output at https://search.google.com/test/rich-results
 */
import { site } from '@/data/site';
import { towns, type Town } from '@/data/towns';

const agentId = `${site.url}/#agent`;

export function realEstateAgentSchema() {
  const { agent, brokerage, contact, geo, social } = site;
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': agentId,
    name: `${agent.name} — ${site.brand}`,
    url: site.url,
    image: new URL(agent.headshot, site.url).href,
    logo: new URL('/favicon.svg', site.url).href,
    description: `${agent.title} with ${agent.yearsExperience} years of experience helping buyers and sellers in Manalapan, Brick, Point Pleasant, and Manahawkin, NJ.`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: brokerage.address.street,
      addressLocality: brokerage.address.city,
      addressRegion: brokerage.address.region,
      postalCode: brokerage.address.postalCode,
      addressCountry: brokerage.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude },
    areaServed: towns.map((t) => ({
      '@type': 'City',
      name: `${t.name}, NJ`,
      containedInPlace: { '@type': 'AdministrativeArea', name: `${t.county} County, NJ` },
    })),
    knowsAbout: ['Residential real estate', 'Waterfront homes', 'Home valuation', 'Jersey Shore real estate'],
    parentOrganization: { '@type': 'RealEstateOrganization', name: brokerage.name },
    sameAs: Object.values(social).filter(Boolean),
    // TODO: once you have verifiable reviews on-site, add aggregateRating here.
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.brand,
    publisher: { '@id': agentId },
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

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
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
    about: {
      '@type': 'City',
      name: `${town.name}, NJ`,
      geo: { '@type': 'GeoCoordinates', latitude: town.geo.latitude, longitude: town.geo.longitude },
      containedInPlace: { '@type': 'AdministrativeArea', name: `${town.county} County, NJ` },
    },
    provider: { '@id': agentId },
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
