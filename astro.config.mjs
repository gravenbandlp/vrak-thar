// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Cambia con l'URL definitivo quando il progetto Cloudflare Pages è attivo.
  site: 'https://vrak-thar.pages.dev',
  // URL senza slash finale: /diario, non /diario/
  trailingSlash: 'never',
  build: { format: 'file' },
});
