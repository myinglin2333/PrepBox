import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),

    {
      name: 'copy-redirects',
      closeBundle() {
        try {
          fs.copyFileSync('public/_redirects', 'dist/_redirects');
          console.log(' _redirects copied to dist');
        } catch (err) {
          console.warn(' _redirects not found');
        }
      },
    },
  ],

  build: {
    outDir: 'dist',
  },
});
