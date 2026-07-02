import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx)$/,
    }),
    nodePolyfills({
      globals: {
        Buffer: true,
        process: true,
        global: true,
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /(src|tests)\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './tests/vitestSetup.js',
      './tests/polyfills.js',
      './tests/setupTests.js',
    ],
  },
});
