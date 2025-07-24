import { zValidator } from '@hono/zod-validator';

import { Hono } from 'hono';

import { zodErrorHandler } from '@/utils/zodError';

import { TestController } from './test.controller';
import { TestCreate, TestParams, TestUpdate } from './test.schema';

const router = new Hono();

router.get('/', TestController.list);

router.get(
	'/:id',
	zValidator('param', TestParams.shape.params, zodErrorHandler),
	TestController.get,
);

router.post(
	'/',
	zValidator('json', TestCreate.shape.body, zodErrorHandler),
	TestController.create,
);

router.patch(
	'/:id',
	zValidator('param', TestParams.shape.params, zodErrorHandler),
	zValidator('json', TestUpdate.shape.body, zodErrorHandler),
	TestController.patch,
);

router.delete(
	'/:id',
	zValidator('param', TestParams.shape.params, zodErrorHandler),
	TestController.remove,
);

export default router;
