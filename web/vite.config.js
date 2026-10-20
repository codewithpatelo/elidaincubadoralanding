import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// El sitio se publica con GitHub Pages desde la raíz del repo.
// `npm run build` escribe index.html, brand/index.html y assets/ en la raíz,
// sin borrar CNAME ni el resto del repo.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: resolve(__dirname, '..'),
    emptyOutDir: false,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        brand: resolve(__dirname, 'brand/index.html'),
      },
    },
  },
})
