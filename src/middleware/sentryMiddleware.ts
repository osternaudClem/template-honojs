import { type Context, type Next } from 'hono';

import { setTag } from '../instrument';

export const sentryRequestMiddleware = async (c: Context, next: Next) => {
	const url = new URL(c.req.url);

	setTag('method', c.req.method);
	setTag('path', url.pathname);

	return next();
};
