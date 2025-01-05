import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  test: {
    globals: true,
    setupFiles: 'src/lib/tests/setupTests.ts',
    environment: 'jsdom',
  },
});
