import { auth } from '@/lib/auth/auth';
import { logger } from '@/utils/logger';

const seedAuth = async () => {
	await auth.api.signUpEmail({
		body: {
			email: 'test@test.com',
			password: 'testtest',
			name: 'Test',
		},
	});

	logger.info(`✅ new auth user: test@test.com`);
};

export default seedAuth;
