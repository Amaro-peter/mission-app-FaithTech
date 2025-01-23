import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/sendgrid': {
        target: 'https://api.sendgrid.com/v3/mail/send',
        changeOrigin: true,
        secure: false, // Added to handle SSL issues
        rewrite: (path) => path.replace(/^\/api\/sendgrid/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log("Proxy Request URL:", proxyReq.path); // Added logging
            proxyReq.setHeader('Authorization', `Bearer ${process.env.SENDGRID_API_KEY}`);
          });
        },
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});