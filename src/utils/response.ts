import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export type ApiResponse<T> =
	| { success: true; data: T }
	| {
			success: false;
			error: {
				name?: string;
				message: string;
				data?: unknown;
			};
	  };

/**
 * Send a generic API response
 */
const respond = <T>(
	c: Context,
	payload: ApiResponse<T>,
	status: ContentfulStatusCode,
) => {
	return c.json(payload, { status });
};

/**
 * 200–299 success
 */
export const ok = <T>(
	c: Context,
	data: T,
	status: ContentfulStatusCode = 200,
) => {
	return respond(c, { success: true, data }, status);
};

/**
 * 400–599 error
 */
export const fail = (
	c: Context,
	message: string,
	status: ContentfulStatusCode = 500,
	options?: { name?: string; data?: unknown },
) => {
	const errorPayload = {
		message,
		...(options?.name ? { name: options.name } : {}),
		...(options?.data ? { data: options.data } : {}),
	};
	return respond(c, { success: false, error: errorPayload }, status);
};
