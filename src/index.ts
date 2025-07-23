import { serve } from '@hono/node-server';

import { Hono } from 'hono';

import { config } from './config.js';
import './instrument';
import { captureException, flush } from './instrument';
import { loggerMiddleware } from './middleware/loggerMiddleware.js';
import { sentryRequestMiddleware } from './middleware/sentryMiddleware.js';
import { logger } from './utils/logger.js';

const app = new Hono();

app.use('*', sentryRequestMiddleware);
app.use('*', loggerMiddleware);

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.get('/debug-sentry', () => {
	// This will be thrown, caught by your sentryError middleware, and sent to GlitchTip
	throw new Error('Debug Sentry: this error should appear in GlitchTip');
});

// Sentry test
app.get('/capture-sentry', async (c) => {
	try {
		// simulate something going wrong
		JSON.parse('this is not valid JSON');
	} catch (err) {
		captureException(err);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return c.text('Manually captured an exception to GlitchTip');
	}
	return c.text('This will never run');
});

app.onError(async (err, c) => {
	captureException(err);
	await flush(2000);

	return c.text('Internal Server Error', 500);
});

serve(
	{
		fetch: app.fetch,
		port: config.app.port,
	},
	(info) => {
		logger.info(`Server is running on http://localhost:${info.port}`);
	},
);
