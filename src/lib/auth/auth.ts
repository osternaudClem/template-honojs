// If your Prisma file is located elsewhere, you can change the path
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { PrismaClient } from '../prisma/generated';

const prisma = new PrismaClient();

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		disableSignUp: false,
		disableEmailVerification: true,
		requireEmailVerification: false,
	},
});
