import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';

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
          try {
            fs.appendFileSync('build-log.txt', `[MATCHED] ${id}\n`);
            // fs.appendFileSync('build-log.txt', `[CODE] ${code.substring(0, 50)}\n`); 
          } catch (e) { }

          let replaced = code;
          replaced = replaced.replace(/src=["']\/assets\/([^"']+)["']/g, 'src="/click-collect-ecom/assets/$1"');
          replaced = replaced.replace(/href=["']\/assets\/([^"']+)["']/g, 'href="/click-collect-ecom/assets/$1"');
          replaced = replaced.replace(/href=["']\/["']/g, 'href="/click-collect-ecom/"');

          if (code !== replaced) {
            try { fs.appendFileSync('build-log.txt', `[MODIFIED] ${id}\n`); } catch (e) { }
          } else {
            try { fs.appendFileSync('build-log.txt', `[NO CHANGE] ${id}\n`); } catch (e) { }
          }
          return replaced;
        }
      }
    }
  ],
  base: "/click-collect-ecom/",
});
