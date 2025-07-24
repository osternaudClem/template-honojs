import { zValidator } from '@hono/zod-validator';

import { Hono } from 'hono';

import { TestController } from './test.controller';
import { TestCreate, TestParams, TestUpdate } from './test.schema';

const router = new Hono();

router.get('/', TestController.list);

router.get(
	'/:id',
	zValidator('param', TestParams.shape.params),
	TestController.get,
);

router.post(
	'/',
	zValidator('json', TestCreate.shape.body),
	TestController.create,
);

router.patch(
	'/:id',
	zValidator('param', TestParams.shape.params),
	zValidator('json', TestUpdate.shape.body),
	TestController.patch,
);

router.delete(
	'/:id',
	zValidator('param', TestParams.shape.params),
	TestController.remove,
);

export default router;
