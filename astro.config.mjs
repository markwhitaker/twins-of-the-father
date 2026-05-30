import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://twins.bitrot.net',
  integrations: [tailwind()],
  output: 'static',
});
