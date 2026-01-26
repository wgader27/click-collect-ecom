import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';
import path from 'path';

export default defineConfig({
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
  plugins: [
    tailwindcss(),
    {
      name: 'html-transform',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('.html')) {
          let replaced = code;
          // Regex that matches optional backslash before quote
          // Handles src="/assets/ and src=\"/assets/ (escaped in JS strings)
          replaced = replaced.replace(/src=(\\?["'])\/assets\//g, 'src=$1/click-collect-ecom/assets/');
          replaced = replaced.replace(/href=(\\?["'])\/assets\//g, 'href=$1/click-collect-ecom/assets/');

          // Match href="/" or href=\"/\" exactly (for logo)
          // We use lookahead/lookbehind or just match the closing quote to be sure it's exact
          // Actually, matching href="/" followed by quote is safest
          replaced = replaced.replace(/href=(\\?["'])\/(\1)/g, 'href=$1/click-collect-ecom/$1');

          return replaced;
        }
      },
      closeBundle() {
        try {
          fs.copyFileSync('dist/index.html', 'dist/404.html');
          console.log('[VITE PLUGIN] Copied index.html to 404.html for GitHub Pages SPA support');
        } catch (e) {
          console.error('[VITE PLUGIN] Failed to copy 404.html', e);
        }
      }
    }
  ],
  base: "/click-collect-ecom/",
});
