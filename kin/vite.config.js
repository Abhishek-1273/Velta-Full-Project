import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js — heavy 3D lib, only loaded on pages with Globe/StickerPeeling
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/three-stdlib') ||
            id.includes('node_modules/@react-three')
          ) return 'vendor-three';

          // GSAP — was bundled with everything else before, now isolated
          if (id.includes('node_modules/gsap')) return 'vendor-gsap';

          // Leaflet — map only on PropertyDetails
          if (id.includes('node_modules/leaflet')) return 'vendor-leaflet';

          // React core
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router')
          ) return 'vendor-framework';

          // Swiper — slider
          if (id.includes('node_modules/swiper')) return 'vendor-swiper';

          // Framer Motion
          if (id.includes('node_modules/framer-motion')) return 'vendor-framer-motion';

          // Lenis — smooth scroll (tiny but lazy-loaded, keep separate)
          if (id.includes('node_modules/@studio-freight/lenis')) return 'vendor-lenis';

          // All other node_modules
          if (id.includes('node_modules')) return 'vendor-libs';
        },
      },
    },
  },
  // Pre-bundle heavy deps for faster dev server startup
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['three', '@studio-freight/lenis'],
  },
})
