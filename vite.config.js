import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'vendor-framer': ['framer-motion'],
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-utils': ['swiper', 'yet-another-react-lightbox', 'react-markdown', 'js-yaml'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increased limit for better visibility
  },
})
