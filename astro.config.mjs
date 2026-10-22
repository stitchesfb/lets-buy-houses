// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Serves the site from https://stitchesfb.github.io/lets-buy-houses/ (GitHub Pages preview).
// Set to '/' once a custom domain serves the site from its root.
const base = '/lets-buy-houses';

export default defineConfig({
  site: 'https://letsbuyhouses.com',
  base,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !/\/(search|home-valuation)\/$/.test(page),
      // List production URLs (no preview base path), matching each page's canonical.
      serialize: (item) => ({ ...item, url: item.url.replace(`${base}/`, '/') }),
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
