import { defineConfig } from 'vite'

// Förhandsvisningens sandlåda (src/courses/js/sandbox) byggs för sig, som
// ett vanligt skript i public/sandbox. Sidan där har ingen egen origin,
// och ett vanligt <script src> laddas ändå – en modul skulle kräva CORS.
export default defineConfig({
  publicDir: false,
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: 'public/sandbox',
    emptyOutDir: false,
    lib: {
      entry: 'src/courses/js/sandbox/main.js',
      formats: ['iife'],
      name: 'KodskolanSandbox',
      fileName: () => 'preview.js',
    },
  },
})
