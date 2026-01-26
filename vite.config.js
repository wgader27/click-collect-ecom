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
        if (id.endsWith('.html')) {
          // Replace /assets/ with /click-collect-ecom/assets/ during build
          return code.replace(/src="\/assets\//g, 'src="/click-collect-ecom/assets/')
            .replace(/href="\/assets\//g, 'href="/click-collect-ecom/assets/')
            .replace(/href="\/"/g, 'href="/click-collect-ecom/"'); // Fix logo link too
        }
      }
    }
  ],
  base: "/click-collect-ecom/",
});
