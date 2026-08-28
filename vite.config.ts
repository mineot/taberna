import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@component': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@layout': fileURLToPath(
        new URL('./src/components/layouts', import.meta.url),
      ),
      '@page': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/stories', import.meta.url)),
      '@style': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@util': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@widget': fileURLToPath(
        new URL('./src/components/widgets', import.meta.url),
      ),
    },
  },
  plugins: [vue(), tailwindcss()],
  test: {
    environment: 'jsdom',
    restoreMocks: true,
  },
});
