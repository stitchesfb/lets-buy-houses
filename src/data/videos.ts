/**
 * YouTube videos featured on the site. Add a video by pasting its 11-character
 * ID (the part after `watch?v=`). `town` lets a video also appear on that town's page.
 * TODO: replace placeholder IDs with the channel's real uploads.
 */
import type { TownSlug } from './towns';

export interface Video {
  id: string;
  title: string;
  description: string;
  town?: TownSlug;
}

export const videos: Video[] = [
  {
    id: '',
    title: 'Living in Manalapan, NJ: Full Town Tour',
    description: 'Neighborhoods, schools, commute, and what homes actually cost.',
    town: 'manalapan-nj',
  },
  {
    id: '',
    title: 'Point Pleasant Waterfront Homes: What Buyers Need to Know',
    description: 'Lagoon vs. river vs. beach block — flood zones, insurance, and value.',
    town: 'point-pleasant-nj',
  },
  {
    id: '',
    title: 'Moving to Brick Township: Pros & Cons',
    description: 'An honest local look at one of Ocean County’s biggest towns.',
    town: 'brick-nj',
  },
  {
    id: '',
    title: 'Manahawkin & the LBI Gateway: Year-Round Living',
    description: 'Shore life without the island prices.',
    town: 'manahawkin-nj',
  },
];
