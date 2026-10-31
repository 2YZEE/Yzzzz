import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs work for GitHub project pages and a future custom domain.
  base: './',
  build: { outDir: 'docs', emptyOutDir: true },
});
