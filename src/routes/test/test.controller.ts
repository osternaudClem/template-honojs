import { type Context } from 'hono';

import { fail, ok } from '@/utils/response';

import { TestService } from './test.service';

const list = async (c: Context) => {
	const items = await TestService.findAll();

	return ok(c, items, 200);
};

const get = async (c: Context) => {
	const id = c.req.param('id');
	const item = await TestService.findOne(id);

	if (!item) {
		return fail(c, 'Test not found', 404);
	}

	return ok(c, item);
};

const create = async (c: Context) => {
	const json = await c.req.json();

	const item = await TestService.create(json);
	return ok(c, item, 201);
};

const patch = async (c: Context) => {
	const id = c.req.param('id');
	const json = await c.req.json();

	const item = await TestService.findOne(id);

	if (!item) {
		return fail(c, 'Test not found', 404);
	}

	const updated = await TestService.update(id, json);

	return ok(c, updated, 200);
};

const remove = async (c: Context) => {
	const id = c.req.param('id');

	const item = await TestService.delete(id);

	if (!item) {
		return fail(c, 'Test not found', 404);
	}

	return ok(c, { id }, 200);
};

export const TestController = {
	list,
	get,
	create,
	patch,
	remove,
};
