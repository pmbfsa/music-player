import { defineConfig } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  base: './',
  plugins: [
    webfontDownload(
      [
        'https://fonts.googleapis.com/css2?family=Spartan:wght@400;700&display=swap',
      ],
      { assetsSubfolder: 'fonts' },
    ),
    sitemap({
      hostname: 'http://pmbfsa.github.io/music-player/',
      outDir: 'docs',
    }),
  ],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
