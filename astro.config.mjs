import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.darf6015.com.br',
  output: 'static',
  integrations: [sitemap()],
});
