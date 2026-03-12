import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      includeAssets: ["fonts/*.ttf", "images/*.png", "/favicon.ico"],
      manifest: {
        name: "Musycharts",
        short_name: "Musycharts",
        start_url: "/",
        scope: "/",
        display: "standalone",
        description: "Discover your top genres and most listened songs on Spotify.",
        lang: "en",
        dir: "auto",
        theme_color: "#000000",
        background_color: "#000000",
        orientation: "any",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "https://musycharts.deras.dev/screenshots/0.jpeg",
            sizes: "1722x1507",
            type: "image/jpeg",
            description: "Top Grainy Gradient",
          },
          {
            src: "https://musycharts.deras.dev/screenshots/1.jpeg",
            sizes: "1722x1473",
            type: "image/jpeg",
            description: "Top Radar",
          },
          {
            src: "https://musycharts.deras.dev/screenshots/2.jpeg",
            sizes: "1722x1478",
            type: "image/jpeg",
            description: "Home",
          },
          {
            src: "https://musycharts.deras.dev/screenshots/3.jpeg",
            sizes: "1722x913",
            type: "image/jpeg",
            description: "Inicio",
          },
        ],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: "Home",
            url: "/",
            description: "Log in with Spotify.",
          },
        ],
      },
    }),
    // Pre-render only the public landing page so crawlers get real HTML
    prerender({
      staticDir: resolve(__dirname, "dist"),
      routes: ["/"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  publicDir: "public",
});


