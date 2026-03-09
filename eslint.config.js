import prettierConfig from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['dist', 'build', 'node_modules'],
    },

    ...tseslint.configs.recommended,

    {
        files: ['vite.config.ts'],
        languageOptions: {
            globals: globals.node,
        },
    },

    {
        files: ['**/*.{ts,tsx}'],

        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },

        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'jsx-a11y': jsxA11y,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },

        rules: {
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,

            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/no-unused-vars': 'off',

            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',

            'unused-imports/no-unused-imports': 'error',

            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },

        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    prettierConfig,
];
