import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'

// På GitHub Pages ligger appen under /kodskolan/, lokalt under /.
// Pythons worker laddar Pyodide med import(), så den måste byggas som
// ES-modul.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/kodskolan/' : '/',
  plugins: [react()],
  worker: { format: 'es' },
  // Tailwind laddas först i HTML-kursens bana 12. Utan den här raden
  // hittar Vite den då och laddar om sidan mitt i rättningen (bara under
  // utveckling).
  optimizeDeps: { include: ['tailwindcss'] },
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
