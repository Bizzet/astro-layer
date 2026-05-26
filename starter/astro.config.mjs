import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  output: 'static',
  // Fonts API — add entries here when add-font skill is invoked
  // fonts: [
  //   {
  //     provider: fontProviders.fontsource(),
  //     name: 'Inter',
  //     cssVariable: '--font-sans',
  //     weights: [400, 500, 600, 700],
  //     styles: ['normal'],
  //     subsets: ['latin'],
  //     fallbacks: ['sans-serif'],
  //   },
  // ],
});
