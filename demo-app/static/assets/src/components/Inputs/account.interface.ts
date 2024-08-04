// https://zod.dev/
// https://morioh.com/p/cc9d89e8a10b
import { z } from 'zod';

export const accountSchema = z.object({
	firstName: z.string().trim().min(3, { message: 'first_name_too_short' }),
	lastName: z.string().trim().min(5, { message: 'last_name_too_short' })
});

// not used
export type Account = z.infer<typeof accountSchema>;
