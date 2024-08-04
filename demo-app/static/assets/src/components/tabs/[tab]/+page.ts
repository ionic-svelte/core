import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { tab } = params;
	return { tab };
};
