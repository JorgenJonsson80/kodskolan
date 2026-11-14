import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { existsSync, readFileSync } from 'node:fs'
import { defineConfig } from 'vite'

// I bygget med betalvägg byts varje kurs content.js mot den genererade
// filen i .content/ (scripts/content.mjs), där betalbanorna bara är skal.
// Finns ingen genererad fil används kursens egen, med allt innehåll.
function protectedContent() {
  return {
    name: 'kodskolan-content',
    apply: 'build',
    enforce: 'pre',
    load(id) {
      const match = id.match(/\/src\/courses\/([^/]+)\/content\.js$/)
      const file = match && `.content/${match[1]}.js`
      if (file && existsSync(file)) return readFileSync(file, 'utf8')
    },
  }
}

// På GitHub Pages ligger appen under /kodskolan/, lokalt under /. Med en
// egen domän sätts VITE_BASE till / (och VITE_SITE_URL, se
// scripts/prerender.mjs). Pythons worker laddar Pyodide med import(), så
// den måste byggas som ES-modul.
const BASE = process.env.VITE_BASE || '/kodskolan/'

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? BASE : '/',
  plugins: [react(), protectedContent()],
  worker: { format: 'es' },
  // Tailwind (HTML-kursens bana 12) och det JS-kursens worker rättar
  // React med laddas först när de behövs. Utan den här raden hittar Vite
  // dem då och laddar om sidan mitt i rättningen (bara under utveckling).
  optimizeDeps: {
    include: ['tailwindcss', 'react-dom/server', 'react-test-renderer'],
  },
  // Två omgångar: allt i Node, och *.browser.test.js i riktig Chrome, där
  // HTML-kursens layout räknas ut och @media slår till.
  test: {
    testTimeout: 30000,
    hookTimeout: 60000,
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          exclude: ['**/node_modules/**', '**/*.browser.test.js'],
        },
      },
      {
        extends: true,
        test: {
          name: 'chrome',
          include: ['src/**/*.browser.test.js'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
}))
