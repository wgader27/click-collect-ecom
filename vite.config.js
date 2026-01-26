import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
  plugins: [
    tailwindcss(),
    {
      name: 'html-transform',
      transform(code, id) {
        if (id.includes('.html')) {
          console.log('[HTML-TRANSFORM] Processing:', id);

          let replaced = code;
          replaced = replaced.replace(/src=["']\/assets\/([^"']+)["']/g, 'src="/click-collect-ecom/assets/$1"');
          replaced = replaced.replace(/href=["']\/assets\/([^"']+)["']/g, 'href="/click-collect-ecom/assets/$1"');
          replaced = replaced.replace(/href=["']\/["']/g, 'href="/click-collect-ecom/"');

          if (code !== replaced) {
            console.log('[HTML-TRANSFORM] Modified:', id);
          }
          return replaced;
        }
      }
    }
  ],
  base: "/click-collect-ecom/",
});
