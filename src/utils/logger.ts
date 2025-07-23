import chalk from 'chalk';

const timestamp = () => new Date().toISOString();

const formatMessage = (level: string, message: unknown, ...meta: unknown[]) => {
	const time = chalk.gray(timestamp());

	return `${time} ${level} ${
		typeof message === 'string' ? message : JSON.stringify(message)
	}${
		meta.length
			? ' ' +
				meta
					.map((m) => (typeof m === 'string' ? m : JSON.stringify(m)))
					.join(' ')
			: ''
	}`;
};

export const logger = {
	info: (message: unknown, ...meta: unknown[]) => {
		// eslint-disable-next-line no-console
		console.log(formatMessage(chalk.cyan('INFO'), message, ...meta));
	},
	warn: (message: unknown, ...meta: unknown[]) => {
		console.warn(formatMessage(chalk.yellow('WARN'), message, ...meta));
	},
	error: (message: unknown, ...meta: unknown[]) => {
		console.error(formatMessage(chalk.red('ERROR'), message, ...meta));
	},
	debug: (message: unknown, ...meta: unknown[]) => {
		// eslint-disable-next-line no-console
		console.debug(formatMessage(chalk.greenBright('DEBUG'), message, ...meta));
	},
};
