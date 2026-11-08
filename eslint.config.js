import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx,mjs}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  // Bygget körs i Node.
  {
    files: ['vite.config.js', 'scripts/**', '*.mjs'],
    languageOptions: { globals: globals.node },
  },
  // Kärnan vet inget om språken. Det den behöver får den från kursen
  // (useCourse), annars går det inte att lägga till en kurs utan att
  // ändra kärnan.
  {
    files: ['src/core/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/courses/**', '**/app/**'],
              message: 'Kärnan får inte importera från en kurs eller appen.',
            },
          ],
        },
      ],
    },
  },
])
