/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { analyzer } from 'vite-bundle-analyzer';

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    command === 'build' &&
      analyzer({
        analyzerMode: 'static',
        fileName: 'bundle-report',
        openAnalyzer: true,
        reportTitle: 'Bundle Analysis',
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}));
