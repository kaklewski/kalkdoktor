import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import ROUTES from './src/data/routes';
import STRINGS from './src/data/strings';

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
        start_url: ROUTES.HOME,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#319795',
        theme_color: '#000000',
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
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
        shortcuts: [
          {
            name: STRINGS.PWA.SHORTCUTS.FAVORITES.TITLE,
            description: STRINGS.PWA.SHORTCUTS.FAVORITES.DESCRIPTION,
            url: ROUTES.FAVORITES,
            icons: [
              {
                src: 'icon-ulubione.png',
                sizes: '192x192',
              },
            ],
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      // Workaround for Tabler Icons slowdown issue
      // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
});
