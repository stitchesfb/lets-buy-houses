/**
 * Home Transformations: renovation and resale projects Jacquelyn managed.
 *
 * REAL PROJECTS ONLY, with photos she owns or has permission to use. Put photos
 * in src/assets/transformations/ and import them here. The section stays hidden on
 * the live site until at least one project is added (preview shows placeholders).
 * Don't include street addresses or past owners' details without permission.
 */
import type { ImageMetadata } from 'astro';

export interface Transformation {
  title: string; // e.g. "Kitchen and main-floor refresh"
  town?: string; // e.g. "Toms River"
  condition: string; // the home's original condition, in a sentence
  improvements: string; // what was done, in a sentence or two
  role: string; // Jacquelyn's role, first person, e.g. "I managed the project from purchase through resale."
  scope?: string[]; // e.g. ['Kitchen', 'Flooring', 'Exterior paint']
  before: ImageMetadata;
  after: ImageMetadata;
}

export const transformations: Transformation[] = [];
