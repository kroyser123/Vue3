import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
        // Убираем project: './tsconfig.json' — это отключает typed linting
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
]
