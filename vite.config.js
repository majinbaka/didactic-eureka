import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    includeAssets: ['icons/*.png'],
    manifest: {
      id: '/', name: 'Tu Tiên Loạn Giới', short_name: 'Loạn Giới',
      description: 'Hành trình tu tiên giữa những thế giới rạn vỡ.',
      lang: 'vi', start_url: '/', scope: '/', display: 'fullscreen', orientation: 'landscape',
      theme_color: '#142924', background_color: '#101d1c',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: { globPatterns: ['**/*.{js,css,html,png,svg,woff2}', 'assets/characters/**/*.json'], navigateFallbackDenylist: [/^\/api\//] },
  })],
})
