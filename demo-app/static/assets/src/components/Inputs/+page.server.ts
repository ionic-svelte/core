import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

import { accountSchema } from './account.interface';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		let success = true;
		let errors = {};

		const formBody = await request.formData();
		let formAsObject = Object.fromEntries(formBody);

		const result = accountSchema.safeParse(formAsObject);
		console.log('newAccountSchema.safeParse result', formAsObject, result);
		if (!result.success) {
			/* 
            Taken from - https://www.okupter.com/blog/sveltekit-form-validation-with-zod

            Errors will be placed in an array of:
            {field:'name', message:'the message'}
            */
			errors = result.error.errors.map((error) => {
				return {
					field: error.path[0],
					message: error.message
				};
			});
			console.log('newAccountSchema.safeParse errors', errors);
			success = false;
		}

		if (result.success) {
			formAsObject = result.data;
		}

		console.log('Logging to vite window', formAsObject, errors, success);
		return { success, errors, formData: formAsObject };
	}
} satisfies Actions;
