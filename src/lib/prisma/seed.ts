import prisma from '@/lib/prisma/prisma';

import { resetDatabase } from './reset.seed';
import seedAuth from './seeds/auth.seed';

async function main() {
	await resetDatabase();

	await seedAuth();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
