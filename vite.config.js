import { defineConfig } from 'vite';

export default defineConfig({
    base: '/', // Base path for root hosting (autocom.org.in)
    build: {
        outDir: 'dist',
    }
});
