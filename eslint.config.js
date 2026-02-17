import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React 與外部套件
            ['^react$', '^react', '^@?\\w'],
            // 專案別名或內部模組（可依需求擴充）
            ['^(@|assets|components|hooks|layout|routes|services|slice|store|views)(/.*|$)'],
            // 具有副作用的匯入
            ['^\\u0000'],
            // 父層與相對匯入
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 樣式檔匯入置於最後
            ['^.+\\.(css|scss)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
])
