const pwaManifest = {
	name: 'Ionic Svelte',
	short_name: 'Ionic Svelte Demo',
	description: 'Coolness in Vite Svelte and Ionic',
	theme_color: '#ffffff',
	icons: [
		{
			src: '/android-chrome-192x192.png',
			sizes: '192x192',
			type: 'image/png',
			purpose: 'maskable any'
		},
		{
			src: '/android-chrome-512x512.png',
			sizes: '512x512',
			type: 'image/png',
			purpose: 'maskable any'
		}
	]
};

const componentList = [
	'Accordion',
	'Actionsheet',
	'Alert',
	'Animations',
	'Avatar',
	'Badge',
	'Breadcrumb',
	'Button',
	'Card',
	'Checkbox',
	'Chip',
	'Controllers',
	'Datetime',
	'Fab',
	'Gesture',
	'Grid',
	'Icon',
	'Infinitescroll',
	'Inputs',
	'Item',
	'List',
	'Loading',
	'Modal',
	'Nav',
	'Note',
	'Page',
	'Picker',
	'Platform',
	'Popover',
	'ProgressBar',
	'Radio',
	'Range',
	'Refresher',
	'Reorder',
	'Searchbar',
	'Segment',
	'Select',
	'Skeleton',
	'Slides',
	'Spinner',
	'Splash',
	'SvelteAnimate',
	'SvelteSpring',
	'SvelteTransition',
	'SvelteTweened',
	'tabs',
	'Text',
	'Thumbnails',
	'Toast',
	'Toggle',
	'Toolbar'
].map((item) => {
	return `assets/src/components/${item}/*`;
});

const ionicSvelteDirectories = [
	'assets/json/*',
	'assets/img/*',
	'assets/img/slides/*',
	'assets/img/ionic/*',
	'assets/src/ionic-docs/api/*',
	...componentList
];

const pwaConfiguration = {
	srcDir: './build',
	outDir: './build', // to ensure sw.js and workbox are in build - not according to docs, but works nevertheless?
	includeAssets: [
		'favicon.svg',
		'favicon.ico',
		'robots.txt',
		'apple-touch-icon.png',
		'assets/*',
		...ionicSvelteDirectories
	],
	base: '/',
	scope: '/',
	manifest: pwaManifest
};

export { pwaConfiguration };
