import type { UserConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { pwaConfiguration } from './pwa-configuration.js';

const config: UserConfig = {
	plugins: [VitePWA(pwaConfiguration), sveltekit()]
};

export default config;
