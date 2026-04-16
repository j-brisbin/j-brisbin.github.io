import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        designs: resolve(__dirname, 'designs.html'),
        photography: resolve(__dirname, 'photography.html'),
        programs: resolve(__dirname, 'programs.html'),
        video: resolve(__dirname, 'video.html'),
      },
    },
  },
});
