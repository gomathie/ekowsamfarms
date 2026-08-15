import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    outDir: 'dist',
    // Cloudflare Pages serves these straight from the CDN; inlining hurts caching.
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split React out of the app bundle so app edits don't bust the vendor cache.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
