import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	console.log('Doing a redirect on tabs');
	throw redirect(301, 'tabs/test1');
};
