/**
 * /idx/details.js: the property detail page layout for IDX Broker's hosted listing
 * pages, loaded through the dynamic wrapper (src/pages/idx-wrapper.astro). Served
 * at a fixed URL so changes reach IDX pages without IDX re-fetching the wrapper.
 * Jackie's details come from site.ts so the contact card matches the rest of the site.
 */
import type { APIRoute } from 'astro';
import script from '@/scripts/idx-details.js?raw';
import { site } from '@/data/site';

export const GET: APIRoute = () => {
  const { agent, brokerage, contact } = site;
  const a = brokerage.address;
  const config = {
    name: agent.name,
    firstName: agent.firstName,
    title: agent.title,
    brokerage: brokerage.name,
    street: a.street,
    cityLine: `${a.city}, ${a.region} ${a.postalCode}`,
    license: agent.licenseNumber,
    phone: contact.phone,
    phoneHref: contact.phoneHref,
    email: contact.email,
    headshot: new URL('/idx/jacquelyn-guevara-320.jpg', site.url).href,
  };
  const body = `/* letsbuyhouses.com IDX property detail layout */\nwindow.LBH_AGENT = ${JSON.stringify(config)};\n${script}`;
  return new Response(body, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
};
