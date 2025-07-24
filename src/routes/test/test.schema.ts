import { z } from 'zod';

export const TestCreate = z.object({
	body: z
		.object({
			title: z.string().min(1, 'Title is required'),
			content: z.string().optional(),
		})
		.strict(),
});

export const TestParams = z.object({
	params: z.object({ id: z.uuid() }),
});

export const TestUpdate = z.object({
	body: z
		.object({
			title: z.string().min(1, 'Title is required').optional(),
			content: z.string().optional(),
		})
		.strict()
		.partial()
		// ensure at least one key is present
		.refine((o) => Object.keys(o).length > 0, {
			message: 'At least one field must be provided',
		}),
});
