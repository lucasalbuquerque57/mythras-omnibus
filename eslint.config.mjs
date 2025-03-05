// eslint.config.mjs
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Semicolon rules
      'semi': ['error', 'always'],
      'semi-spacing': ['error', { 'after': true, 'before': false }],
      'semi-style': ['error', 'last'],

      // Comma rules
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { 'after': true, 'before': false }],
      'comma-style': ['error', 'last'],
    },
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];

export default eslintConfig;


/*import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import next from "next/core-web-vitals";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import checkFilePlugin from 'eslint-plugin-check-file';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

/!** @type {import('eslint').Linter.FlatConfig[]} *!/
const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**!/!*.ts', '**!/!*.tsx'],
    ignores: [".next/", "node_modules/", ".git/", ".idea/"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },Z
  },
  {
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'check-file': checkFilePlugin
    },
    rules: {
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE']
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },
        // Exceção para componentes React (PascalCase)
        {
          selector: 'function',
          modifiers: ['exported'],
          format: ['PascalCase', 'camelCase']
        }
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          // Ignora arquivos do Next.js (page.tsx, layout.tsx, etc)
          'src/app/!**!/!*.{ts,tsx}': 'CAMEL_CASE',
          '!(*.spec|*.test|*.config).{ts,tsx}': 'KEBAB_CASE'
        }
      ]
    }
  }
];

export default eslintConfig;*/