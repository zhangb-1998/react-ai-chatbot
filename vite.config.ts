import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.ts
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '^/api/.*': {
  //       target: 'https://api-y2e5t0jdqcvel145.aistudio-app.com',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, ''),
  //       secure: false,
  //     },
  //   },
  // }
});
