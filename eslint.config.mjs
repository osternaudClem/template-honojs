import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import globals from 'globals';

export default [
	{
		ignores: ['**/dist/**', '**/node_modules/**', './src/prisma/generated/**'],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			globals: {
				...globals.node,
				fetch: 'readonly',
			},
			parser: tsParser,
		},
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {
			...pluginJs.configs.recommended.rules,
			...tseslint.configs.recommended.rules,
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error', 'info'], // if you still want console.warn / console.error
				},
			],
		},
	},
];
