import chalk from 'chalk';
import { type Context, type Next } from 'hono';

export const loggerMiddleware = async (c: Context, next: Next) => {
	const start = Date.now();

	await next();

	const ms = Date.now() - start;
	const method = chalk.blue(c.req.method);
	const url = new URL(c.req.url, 'http://localhost');
	const path = chalk.green(url.pathname);
	const time = ms > 100 ? chalk.red(`${ms}ms`) : chalk.yellow(`${ms}ms`);
	const responseStatus = c.res.status;

	const responseStatusColor =
		responseStatus >= 500
			? chalk.red(responseStatus)
			: responseStatus >= 400
				? chalk.yellow(responseStatus)
				: chalk.green(responseStatus);

	// eslint-disable-next-line no-console
	console.log(`${method} ${responseStatusColor} ${path} — ${time}`);
};
