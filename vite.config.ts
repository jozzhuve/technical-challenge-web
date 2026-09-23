import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Configura Vite y los proxies locales hacia ambos servicios del reto.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/endorsement': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/endorsement/, ''),
      },
      '/api/routing': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/routing/, ''),
      },
    },
  },
});
