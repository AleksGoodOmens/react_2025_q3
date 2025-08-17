import js from '@eslint/js';
import eslintPluginNext from '@next/eslint-plugin-next';
import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintPluginNoComments from 'eslint-plugin-no-comments';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules', '*.d.ts'] },

  ...pluginQuery.configs['flat/recommended'],

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      'eslint-plugin-no-comments': eslintPluginNoComments,
      '@next/next': eslintPluginNext,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react-compiler/react-compiler': 'error',
      'eslint-plugin-no-comments/disallowComments': 'error',
      'import/order': 'off',
      'sort-imports': 'off',
      'react-refresh/only-export-components': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
    ],
  }
);
