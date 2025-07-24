import type { Context } from 'hono';

type ZodError = {
	name: string;
	message: string;
};

export const zodErrorHandler = <T>(
	result: { success: true; data: T } | { success: false; error: ZodError },
	c: Context,
) => {
	if (!result.success) {
		const error = result.error;
		const data = JSON.parse(error.message);

		return c.json(
			{
				success: false,
				error: {
					name: error.name,
					data,
					message: data[0].message || 'Validation failed',
				},
			},
			400,
		);
	}
};
