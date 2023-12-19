import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['fonts/*.ttf', 'images/*.png', "/favicon.ico"],
      manifest: {
        name: "musycharts-dcdv",
        short_name: "musycharts",
        start_url: "/",
        display: "standalone",
        description: "Descubre tu top de géneros y canciones mas escuchadas en Spotify.",
        lang: "es",
        dir: "auto",
        theme_color: "#000000",
        background_color: "#000000",
        orientation: "any",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        screenshots: [
          {
            src: "https://musycharts-dcdv.vercel.app/screenshots/0.jpeg",
            sizes: "1722x1507",
            type: "image/jpeg",
            description: "Top Grainy Gradient"
          },
          {
            src: "https://musycharts-dcdv.vercel.app/screenshots/1.jpeg",
            sizes: "1722x1473",
            type: "image/jpeg",
            description: "Top Radar"
          },
          {
            src: "https://musycharts-dcdv.vercel.app/screenshots/2.jpeg",
            sizes: "1722x1478",
            type: "image/jpeg",
            description: "Home"
          },
          {
            src: "https://musycharts-dcdv.vercel.app/screenshots/3.jpeg",
            sizes: "1722x913",
            type: "image/jpeg",
            description: "Inicio"
          }
        ],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: "Inicio",
            url: "/",
            description: "Inicia sesión con Spotify."
          },
        ]
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicDir: 'public'
})
