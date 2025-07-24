import { TestService } from '@/routes/test/test.service';
import { logger } from '@/utils/logger';

const seedTest = async () => {
	await TestService.create({
		title: 'Test title',
		content: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	});

	logger.info(`✅ new test content created`);
};

export default seedTest;
