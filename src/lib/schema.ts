/**
 * JSON-LD structured data builders (schema.org).
 * Validate output at https://search.google.com/test/rich-results
 */
import { site } from '@/data/site';
import { towns, type Faq, type Town } from '@/data/towns';
import { absoluteUrl } from '@/lib/paths';

const agentId = `${site.url}/#agent`;

export function realEstateAgentSchema() {
  const { agent, brokerage, contact, geo, social } = site;
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': agentId,
    name: agent.legalName,
    alternateName: agent.name,
    url: site.url,
    image: absoluteUrl(agent.headshot),
    logo: absoluteUrl('/favicon.svg'),
    description: `${agent.legalName}, ${agent.title} with ${brokerage.name}, helping buyers and sellers in Manalapan, Brick, Point Pleasant, and Manahawkin, NJ.`,
    telephone: contact.phone,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: brokerage.address.street,
      addressLocality: brokerage.address.city,
      addressRegion: brokerage.address.region,
      postalCode: brokerage.address.postalCode,
      addressCountry: brokerage.address.country,
    },
    ...(geo && { geo: { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude } }),
    areaServed: towns.map((t) => ({
      '@type': 'City',
      name: `${t.name}, NJ`,
      containedInPlace: { '@type': 'AdministrativeArea', name: `${t.county}, NJ` },
    })),
    parentOrganization: {
      '@type': 'RealEstateOrganization',
      name: brokerage.name,
      ...(brokerage.officePhone ? { telephone: brokerage.officePhone } : {}),
    },
    sameAs: Object.values(social).filter(Boolean),
    // Only verified facts belong here: no ratings, awards or credentials until confirmed.
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
    about: {
      '@type': 'City',
      name: `${town.name}, NJ`,
      geo: { '@type': 'GeoCoordinates', latitude: town.geo.latitude, longitude: town.geo.longitude },
      containedInPlace: { '@type': 'AdministrativeArea', name: `${town.county}, NJ` },
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
