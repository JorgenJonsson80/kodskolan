import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// På GitHub Pages ligger appen under /kodskolan/, lokalt under /.
// Pythons worker laddar Pyodide med import(), så den måste byggas som
// ES-modul.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/kodskolan/' : '/',
  plugins: [react()],
  worker: { format: 'es' },
  test: { testTimeout: 30000, hookTimeout: 60000 },
}))
