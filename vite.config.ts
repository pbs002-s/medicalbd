import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'ShasthoSetu BD — স্বাস্থ্যসেতু বিডি',
        short_name: 'ShasthoSetu',
        description:
          'লাইভ চেম্বার সিরিয়াল, ই-প্রেসক্রিপশন, ওষুধের দাম, রক্তদাতা ও আইসিইউ বেড — এক প্ল্যাটফর্মে।',
        lang: 'bn',
        theme_color: '#2C5F43',
        background_color: '#F3F5F1',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            // Inline SVG icon, so no binary asset has to be committed.
            src:
              "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232C5F43'><path d='M19 10.5h-4.5V6a1.5 1.5 0 0 0-3 0v4.5H7a1.5 1.5 0 0 0 0 3h4.5V18a1.5 1.5 0 0 0 3 0v-4.5H19a1.5 1.5 0 0 0 0-3z'/></svg>",
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Precache the shell so the prescription builder and the student
        // logbook open with no connection at all — the whole point for a
        // rural chamber. Everything the app writes already lives in
        // localStorage, so an offline session loses nothing.
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Google Fonts stylesheets change rarely; serve the cached copy
            // immediately and refresh in the background.
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            // The font files themselves are immutable, so cache-first with a
            // long expiry is both correct and the fastest option.
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  build: {
    // Split the vendor code that never changes away from app code that does,
    // so a release only invalidates the app chunk in everyone's cache.
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-qr': ['qrcode'],
        },
      },
    },
    // Every remaining chunk is comfortably under this; a warning here means a
    // dependency landed in the wrong bundle and needs its own entry above.
    chunkSizeWarningLimit: 400,
  },
  server: {
    port: 3000,
    open: false,
    host: true,
  },
});
