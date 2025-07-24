import { z } from 'zod';

export const TestCreate = z.object({
	body: z.object({
		title: z.string().min(1),
		content: z.string().optional(),
	}),
});

export const TestParams = z.object({
	params: z.object({ id: z.uuid() }),
});

export const TestUpdate = z.object({
	body: z
		.object({
			title: z.string().min(1),
			content: z.string().optional(),
		})
		.partial()
		// ensure at least one key is present
		.refine((o) => Object.keys(o).length > 0, {
			message: 'At least one field must be provided',
		}),
});
