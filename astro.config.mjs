// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node"; // AJOUT

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server", // AJOUT => active le mode SSR pour build server
  adapter: node({
    // AJOUT => adapter Node SSR
    mode: "standalone", // recommandé
  }),
});
