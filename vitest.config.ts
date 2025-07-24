import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		globals: true,
		coverage: {
			reporter: ['text', 'html'],
		},
		include: ['src/**/*.test.ts'],
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			'@lib': resolve(__dirname, 'src/lib'),
			'@prisma': resolve(__dirname, 'prisma'),
			'@utils': resolve(__dirname, 'src/utils'),
			'@types': resolve(__dirname, 'src/types'),
		},
	},
});
