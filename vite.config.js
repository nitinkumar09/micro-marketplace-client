import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ ensure correct path for Vercel deployment
  server: {
    port: 5173, // optional, local dev port
  },
});
