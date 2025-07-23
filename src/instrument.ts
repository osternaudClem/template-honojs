import {
	init,
	captureException as sentryCapture,
	flush as sentryFlush,
	setTag as sentrySetTag,
} from '@sentry/node';

import { config } from './config';
import { logger } from './utils/logger';

const hasDsn = Boolean(config.sentry.dsn);

if (hasDsn) {
	init({
		dsn: config.sentry.dsn,
		environment: config.app.nodeEnv,
		release: config.app.version || undefined,
		tracesSampleRate: 1.0,
	});
} else {
	logger.warn('⚠️ Sentry DSN not provided, Sentry is disabled');
}

export const captureException = (error: unknown): void => {
	if (hasDsn) {
		sentryCapture(error);
	}
};

export function flush(timeout?: number): Promise<boolean> {
	if (hasDsn) {
		return sentryFlush(timeout);
	}
	return Promise.resolve(true);
}

export function setTag(key: string, value: string): void {
	if (hasDsn) {
		sentrySetTag(key, value);
	}
}
