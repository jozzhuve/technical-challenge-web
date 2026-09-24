import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Configura Vite y redirige las llamadas locales hacia Apache APISIX.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:9080',
        changeOrigin: true,
      },
    },
  },
});
