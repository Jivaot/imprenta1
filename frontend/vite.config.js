import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';

const repoRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'cleanup-final',
      apply: 'build',
      closeBundle() {
        const distPath = path.resolve(__dirname, 'dist');
        if (fs.existsSync(distPath)) {
          try {
            const files = fs.readdirSync(distPath);
            files.forEach(file => {
              if (file.startsWith('.pyserver') || file.startsWith('.')) {
                const filePath = path.join(distPath, file);
                try {
                  fs.chmodSync(filePath, 0o777);
                  fs.rmSync(filePath, { force: true });
                } catch (e) {
                  // Ignorar
                }
              }
            });
          } catch (e) {
            // Ignorar
          }
        }
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    fs: {
      allow: [repoRoot],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separar THREE.js y sus dependientes
          if (id.includes('three')) {
            return 'three-vendor';
          }
          // Separar librerías de UI
          if (id.includes('node_modules/swiper') || 
              id.includes('node_modules/react-hot-toast') ||
              id.includes('node_modules/formik')) {
            return 'ui-vendor';
          }
          // Separar Supabase
          if (id.includes('@supabase')) {
            return 'supabase-vendor';
          }
          // Separar Redux y state management
          if (id.includes('redux') || id.includes('@reduxjs')) {
            return 'redux-vendor';
          }
        },
      },
    },
  },
});
