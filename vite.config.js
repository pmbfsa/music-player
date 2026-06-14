import { defineConfig } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl';

export default defineConfig({
  base: './',
  plugins: [
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Spartan:wght@400;700&display=swap',
    ]),
  ],
});
