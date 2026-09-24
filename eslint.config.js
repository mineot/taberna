import pluginVue from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['dist/**', 'src/env.d.ts'],
  },
  ...pluginVue.configs['flat/recommended'],
  prettierConfig,

  {
    files: ['**/*.ts', '**/*.vue'],
    extends: [...tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
    },
  },
  {
    files: ['src/components/layouts/content.vue'],
    rules: {
      'vue/no-v-html': 'off',
    },
  },
]);
