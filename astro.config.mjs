// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Served from the root of https://letsbuyhouses.com (GitHub Pages custom domain).
// For a project-path preview such as <owner>.github.io/lets-buy-houses/, set base to that path.
const base = '/';

export default defineConfig({
  site: 'https://letsbuyhouses.com',
  base,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Unlisted former service areas (UNLISTED in src/data/towns.ts) stay out of the sitemap.
      filter: (page) => !/\/(search|home-valuation|point-pleasant-boro-nj|manalapan-nj|lakewood-nj|tuckerton-nj|little-egg-harbor-nj)\/$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
