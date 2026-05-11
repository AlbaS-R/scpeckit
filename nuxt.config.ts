export default defineNuxtConfig({
  experimental: {
    appManifest: false,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
    head: {
      title: 'League of Legends - Champion Explorer',
      meta: [
        { name: 'description', content: 'Explora todos los campeones de League of Legends' },
        { name: 'theme-color', content: '#060a14' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icons/icon-192x192.png' },
      ],
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'LoL Champion Explorer',
      short_name: 'LoL Explorer',
      description: 'Explora todos los campeones de League of Legends',
      theme_color: '#060a14',
      background_color: '#060a14',
      display: 'standalone',
      orientation: 'portrait-primary',
      scope: '/',
      start_url: '/',
      icons: [
        { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/ddragon\.leagueoflegends\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'riot-datadragon',
            cacheableResponse: { statuses: [0, 200] },
            expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
      ],
    },
  },

  compatibilityDate: '2026-05-11',
})
