/**
 * /idx/details.css: styles for the IDX property detail layout (see details.js.ts).
 * Served unprocessed at a fixed URL so it never changes the hashed wrapper stylesheet.
 */
import type { APIRoute } from 'astro';
import css from '@/styles/idx-details.css?raw';

export const GET: APIRoute = () => new Response(css, { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
