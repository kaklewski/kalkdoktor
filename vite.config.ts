import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kalkdoktor',
        short_name: 'Kalkdoktor',
        lang: 'pl',
        description:
          'Darmowa, otwartoźródłowa aplikacja webowa zawierająca kalkulatory, skale i konwertery przeznaczone dla lekarzy. Ułatwia diagnozowanie pacjenta poprzez szybki dostęp do niezbędnych narzędzi.',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#000',
        theme_color: 'transparent',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
