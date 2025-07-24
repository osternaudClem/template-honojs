import { type Context } from 'hono';
import { treeifyError } from 'zod';

import { TestCreate, TestParams, TestUpdate } from './test.schema';
import { TestService } from './test.service';

const list = async (c: Context) => {
	return c.json(await TestService.findAll());
};

const get = async (c: Context) => {
	const id = c.req.param('id');
	const parsed = TestParams.safeParse({ params: { id } });

	if (!parsed.success) {
		const errTree = treeifyError(parsed.error);
		return c.json({ error: errTree }, 400);
	}

	const item = await TestService.findOne(parsed.data.params.id);
	return item ? c.json(item) : c.text('Not found', 404);
};

const create = async (c: Context) => {
	const json = await c.req.json();
	const parsed = TestCreate.shape.body.safeParse(json);
	if (!parsed.success) {
		const errTree = treeifyError(parsed.error);
		return c.json({ error: errTree }, 400);
	}

	const item = await TestService.create(parsed.data);
	return c.json(item, 201);
};

const patch = async (c: Context) => {
	const id = c.req.param('id');

	const paramsParse = TestParams.safeParse({ params: { id } });
	if (!paramsParse.success) {
		const errTree = treeifyError(paramsParse.error);
		return c.json({ error: errTree }, 400);
	}

	const json = await c.req.json();
	const updateParse = TestUpdate.shape.body.safeParse(json);
	if (!updateParse.success) {
		const errTree = treeifyError(updateParse.error);
		return c.json({ error: errTree }, 400);
	}

	const updated = await TestService.update(id, updateParse.data);
	return c.json(updated);
};

const remove = async (c: Context) => {
	const id = c.req.param('id');

	const parsed = TestParams.safeParse({ params: { id } });

	if (!parsed.success) {
		const errTree = treeifyError(parsed.error);
		return c.json({ error: errTree }, 400);
	}

	await TestService.delete(parsed.data.params.id);
	return c.json({ id: parsed.data.params.id }, 200);
};

export const TestController = {
	list,
	get,
	create,
	patch,
	remove,
};
