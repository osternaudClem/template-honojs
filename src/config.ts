import dotenv from 'dotenv';

import pkg from '../package.json';

type PackageJson = { version: string };

const EnvKeys = Object.freeze({
	NODE_ENV: 'NODE_ENV',
	PORT: 'PORT',
	DATABASE_URL: 'DATABASE_URL',
	BETTER_AUTH_SECRET: 'BETTER_AUTH_SECRET',
	GLITCHTIP_DSN: 'GLITCHTIP_DSN',
});

type EnvKey = keyof typeof EnvKeys;

// Load .env into process.env
dotenv.config();

const getEnv = (
	key: EnvKey,
	opts: {
		required?: boolean;
		default?: string;
	} = {},
): string | undefined => {
	const value = process.env[key] ?? opts.default;

	if (opts.required && (!value || value === undefined || value === '')) {
		throw new Error(`Missing required env var ${key}.`);
	}

	return value;
};

export const config = {
	app: {
		port: Number(getEnv('PORT', { default: '3000' })),
		nodeEnv: getEnv('NODE_ENV', { default: 'development' }),
		version: (pkg as PackageJson).version,
	},
	database: {
		url: getEnv(EnvKeys.DATABASE_URL, { required: true }),
	},
	auth: {
		secret: getEnv(EnvKeys.BETTER_AUTH_SECRET, { required: true }),
	},
	sentry: {
		dsn: getEnv(EnvKeys.GLITCHTIP_DSN),
	},
};
