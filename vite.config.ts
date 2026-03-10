import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';

import ROUTES from './src/data/routes';
import STRINGS from './src/data/strings';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        checker({
            typescript: {
                tsconfigPath: 'tsconfig.app.json',
            },
        }),
        VitePWA({
            injectRegister: 'auto',
            registerType: 'autoUpdate',
            manifest: {
                name: 'Kalkdoktor',
                short_name: 'Kalkdoktor',
                lang: 'pl',

                description:
                    'Darmowa, otwartoźródłowa aplikacja webowa zawierająca kalkulatory, skale i konwertery przeznaczone dla lekarzy.',
                categories: ['medical', 'health', 'utilities'],

                start_url: '/',
                scope: '/',

                display: 'standalone',
                orientation: 'portrait',

                theme_color: '#319795',
                background_color: '#319795',

                icons: [
                    {
                        src: 'icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: 'icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: 'icon.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                    },
                ],

                shortcuts: [
                    {
                        name: STRINGS.PWA.SHORTCUTS.FAVORITES.TITLE,
                        description:
                            STRINGS.PWA.SHORTCUTS.FAVORITES.DESCRIPTION,
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
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    ui: ['@chakra-ui/react'],
                    icons: ['@tabler/icons-react'],
                },
            },
        },
    },
});
