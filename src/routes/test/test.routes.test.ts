import { serve } from '@hono/node-server';

import { Hono } from 'hono';
import supertest from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import prisma from '@/lib/prisma/prisma';

import testRoutes from './test.routes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let server: any;
let request: supertest.SuperTest<supertest.Test>;

const FAKE_TEST_ID = '00000000-0000-0000-0000-000000000000';

beforeAll(async () => {
	const app = new Hono();
	app.route('/', testRoutes);
	server = serve({ fetch: app.fetch, port: 0 });
	// Wait for server to start and get port
	await new Promise((resolve) => setTimeout(resolve, 300));
	const port = server.address().port;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	request = supertest(`http://localhost:${port}`);
	await prisma.$executeRaw`BEGIN`;
});

afterAll(async (done) => {
	await prisma.$executeRaw`ROLLBACK`;
	server.close(done);
});

describe('Test routes', async () => {
	let createdId: string;

	/**
	 * Test for creating a new test item
	 */
	it('should create a new test item', async () => {
		const res = await request
			.post('/')
			.send({ title: 'Test title', content: 'Test content' });
		expect(res.status).toBe(201);
		expect(res.body.success).toBe(true);
		expect(res.body.data).toHaveProperty('id');
		createdId = res.body.data.id;
	});

	it('should return 400 for empty title', async () => {
		const res = await request.post('/').send({ title: '' });
		expect(res.status).toBe(400);
		expect(res.body.error.message).toBe('Title is required');
	});

	it('should return 400 for invalid content type', async () => {
		const res = await request
			.post('/')
			.send({ title: 'Test title', fakeKey: 'not existing' });
		expect(res.status).toBe(400);
		expect(res.body.error.message).toBe('Unrecognized key: "fakeKey"');
	});

	/**
	 * Test for listing all test items
	 */
	it('should list all test items', async () => {
		const res = await request.get('/');
		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(Array.isArray(res.body.data)).toBe(true);
	});

	/**
	 * Test for getting a single test item
	 */
	it('should get a single test item', async () => {
		const res = await request.get(`/${createdId}`);
		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(res.body.data.id).toBe(createdId);
	});

	it('should return 404 for non-existing test item', async () => {
		const res = await request.get(`/${FAKE_TEST_ID}`);
		expect(res.status).toBe(404);
		expect(res.body.success).toBe(false);
		expect(res.body.error.message).toBe('Test not found');
	});

	it('should return 400 for invalid test item ID', async () => {
		const res = await request.get('/invalid-id');
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('success', false);
		expect(res.body).toHaveProperty('error.message', 'Invalid UUID');
	});

	/**
	 * Test for updating a test item
	 */
	it('should update a test item', async () => {
		const res = await request
			.patch(`/${createdId}`)
			.send({ title: 'Updated title' });
		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(res.body.data.title).toBe('Updated title');
	});

	it('should return 400 for empty title', async () => {
		const res = await request.patch(`/${createdId}`).send({ title: '' });
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('error.message', 'Title is required');
	});

	it('should return 400 for invalid content type', async () => {
		const res = await request
			.patch(`/${createdId}`)
			.send({ fakeKey: 'not existing' });
		expect(res.status).toBe(400);
		expect(res.body.error.message).toBe('Unrecognized key: "fakeKey"');
	});

	it('should return 400 for empty body', async () => {
		const res = await request.patch(`/${createdId}`).send({});
		expect(res.status).toBe(400);
		expect(res.body.error.message).toBe('At least one field must be provided');
	});

	it('should return 404 for non-existing test item', async () => {
		const res = await request
			.patch(`/${FAKE_TEST_ID}`)
			.send({ title: 'Fake title' });
		expect(res.status).toBe(404);
		expect(res.body.success).toBe(false);
		expect(res.body.error.message).toBe('Test not found');
	});

	/**
	 * Test for deleting a test item
	 */
	it('should delete a test item', async () => {
		const res = await request.delete(`/${createdId}`);
		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(res.body.data.id).toBe(createdId);
	});

	it('should return 404 for deleting a non-existing test item', async () => {
		const res = await request.delete(`/${FAKE_TEST_ID}`);
		expect(res.status).toBe(404);
		expect(res.body.success).toBe(false);
		expect(res.body.error.message).toBe('Test not found');
	});
});
