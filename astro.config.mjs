// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readFile, writeFile } from 'node:fs/promises';

// https://astro.build/config
// Served from the root of https://letsbuyhouses.com (GitHub Pages custom domain).
// For a project-path preview such as <owner>.github.io/lets-buy-houses/, set base to that path.
const base = '/';
const site = 'https://letsbuyhouses.com';

/**
 * The IDX Broker wrapper page (src/pages/idx-wrapper.astro) is displayed on IDX Broker's
 * domain, so after the build its root-relative links and assets become absolute URLs
 * on the main site: the logo, menus, and Let's Talk lead back to letsbuyhouses.com.
 */
/** @type {import('astro').AstroIntegration} */
const idxWrapperAbsoluteUrls = {
  name: 'idx-wrapper-absolute-urls',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const file = new URL('idx-wrapper/index.html', dir);
      let html = await readFile(file, 'utf8');
      const origin = site + base.replace(/\/$/, '');
      /** @param {string} path */
      const abs = (path) => (path.startsWith('/') && !path.startsWith('//') ? origin + path : path);
      html = html
        .replace(/(\s(?:href|src|action|poster)=)"(\/[^"]*)"/g, (_, attr, path) => `${attr}"${abs(path)}"`)
        .replace(/(\ssrcset=)"([^"]*)"/g, (_, attr, set) => `${attr}"${set.split(',').map((/** @type {string} */ part) => part.trim().replace(/^\S+/, abs)).join(', ')}"`)
        .replace(/url\((['"]?)(\/[^)'"]*)\1\)/g, (_, q, path) => `url(${q}${abs(path)}${q})`)
        .replace(/(["'])\/_astro\//g, `$1${origin}/_astro/`);
      await writeFile(file, html);
    },
  },
};

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !/\/(search|home-valuation|point-pleasant-boro-nj|idx-wrapper)\/$/.test(page),
    }),
    idxWrapperAbsoluteUrls,
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
