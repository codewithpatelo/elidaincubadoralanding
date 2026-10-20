# Elida Incubadora — sitio web

Sitio publicado en https://www.elidaincubadora.com con GitHub Pages (rama `main`, carpeta raíz).

## Estructura

- `web/` — código fuente (Vite + React + Motion + Lenis).
  - `web/src/content.js` — **todo el texto del sitio**. Para cambiar copy, editá este archivo.
  - `web/src/styles/tokens.css` — tokens del sistema de marca (colores, tipografía, gradientes, movimiento).
  - `web/brand/` — página del sistema de marca, publicada en `/brand/`.
- `index.html`, `brand/index.html`, `assets/`, `img/`, `favicon.svg` — **salida del build** que sirve GitHub Pages. No editar a mano.
- `legacy/` — versiones anteriores del sitio, como referencia.
- `CNAME` — dominio personalizado (no borrar).

## Cómo actualizar

```bash
cd web
npm install
npm run dev     # vista previa local en http://localhost:5173
npm run build   # regenera index.html, brand/ y assets/ en la raíz
```

Después del build, hacé commit de los cambios en `web/` y de los archivos generados en la raíz.
