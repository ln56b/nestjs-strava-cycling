const { defineConfig } = require('eslint/config');
const tsParser = require('@typescript-eslint/parser');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: require('@eslint/js').configs.recommended,
  allConfig: require('@eslint/js').configs.all,
});

module.exports = defineConfig([
  {
    files: ['*.ts', '**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    ignores: ['**/node_modules/**', 'dist/**'],
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    extends: [
      ...compat.extends('eslint:recommended'),
      ...compat.extends('plugin:@typescript-eslint/recommended'),
    ],
    rules: {
      // your custom overrides
      'no-console': ['warn'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
    },
  },
  {
    ignores: ['dist/**'],
  },
]);
