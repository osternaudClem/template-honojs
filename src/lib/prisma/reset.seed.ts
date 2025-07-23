import { logger } from 'better-auth';
import path from 'path';
import { fileURLToPath } from 'url';

import prisma from '@/lib/prisma/prisma';

export async function resetDatabase() {
	logger.info('⚠️ Resetting database...');

	// Order matters due to foreign key constraints
	await prisma.verification.deleteMany({});
	await prisma.account.deleteMany({});
	await prisma.session.deleteMany({});
	await prisma.user.deleteMany({});

	logger.info('✅ All auth data deleted.');
}

// ESM-compatible “main” check
const thisFile = fileURLToPath(import.meta.url);
const entryPoint = process.argv[1];

if (path.resolve(entryPoint) === path.resolve(thisFile)) {
	resetDatabase()
		.catch((e) => {
			console.error(e);
			process.exit(1);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}
