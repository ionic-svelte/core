// Types
import { create } from 'create-svelte';
import fs from 'fs-extra';
import ip from 'ip';
import { bold, grey, red } from 'kleur/colors';
import { spawnSync } from 'node:child_process';
import path from 'path';
import process from 'process';
import {
	getDemoCapacitorApp,
	getDemoIonicApp,
	getIonicVariables,
	getTSCapacitorConfig,
	mkdirp,
	whichPMRuns
} from './utils.js';
// NOTE: Any changes here must also be reflected in the --help output in utils.ts and shortcut expansions in bin.ts.
// Probably a good idea to do a search on the values you are changing to catch any other areas they are used in
// Codebase would be a lot cleaner if Reflect() actually returned anything useful.
// unbuild doesn't seem to like it when SkeletonOptions implements the Options type from create-svelte's internal type definitions
// so they are copied over here just to make everything even more brittle.

export class IonicSvelteOptions {
	// svelte-create expects these options, do not change the names or values.
	name = 'new-ionic-svelte-app';
	template = 'skeleton';
	types = 'typescript';
	prettier = true;
	eslint = true;
	playwright = false;
	vitest = false;

	// Ionic
	ionicons = false;
	capacitor = true;
	ionic = false;

	// create-skeleton-app additions
	// _ = []; //catch all for extraneous params from mri, used to capture project name.
	help = false;
	quiet = false;
	framework = 'svelte-kit';
	path = '.';
	// forms = false;
	// typography = false;
	// lineclamp = false;
	// skeletontheme = 'skeleton';
	// skeletontemplate = 'bare';
	packagemanager = 'npm';
	// // props below are private to the Skeleton team
	verbose = false;
	// monorepo = false;
	packages = [];
	// skeletonui = true;
	// skeletontemplatedir = '../templates';
	workspace = '';
}

export async function createIonicSvelte(opts) {
	//create-svelte will happily overwrite an existing directory, foot guns are bad mkay

	let s = 0;
	opts.verbose = true;

	opts.path = path.resolve(opts?.path, opts.name.replace(/\s+/g, '-').toLowerCase());

	if (fs.existsSync(opts.path)) {
		console.error(red(bold('Install directory already exists!')));
		process.exit();
	}

	if (!opts?.quiet) {
		console.log('Working: Creating base Svelte Kit install supercharged with Capacitor.');
	}
	fs.mkdirp(opts.path);

	//create-svelte will build the base install for us
	// npm create svelte@latest my-project
	create(opts.path, opts);

	process.chdir(opts.path);

	// install packages
	opts.packagemanager = whichPMRuns()?.name || 'npm';

	// the order matters due to dependency resolution, because yarn
	let packages = [
		'svelte-preprocess',
		'@sveltejs/adapter-static@1.0.1'
		//	'vite@4'
	];
	if (opts?.capacitor) packages.push('@capacitor/cli');

	// if (opts?.typography) packages.push('@tailwindcss/typography');
	// if (opts?.forms) packages.push('@tailwindcss/forms');
	// if (opts?.lineclamp) packages.push('@tailwindcss/line-clamp');

	if (!opts?.quiet) {
		console.log('Working: Installing project dependencies ' + grey(packages.toString()));
	}

	// packages = [];
	let result = spawnSync(opts.packagemanager, ['add', '-D', ...packages], {
		shell: true
	});

	if (
		opts.packagemanager != 'yarn' &&
		result?.stderr.toString().length &&
		(result?.stderr.toString().includes('ERR_PNPM') || result?.stderr.toString().includes('ERR!'))
	) {
		console.log(
			'Create-Capacitor-Svelte App - we received an error from the package manager - please submit issue on https://github.com/Tommertom/svelte-ionic-npm/issues \n',
			result?.stderr.toString()
		);
		process.exit();
	}

	packages = [];
	if (opts?.ionic) packages = ['@ionic/core@8.2.2', 'ionic-svelte'];
	if (opts?.capacitor) packages.push('@capacitor/core');
	// packages = [];
	if (opts?.ionicons) packages.push('ionicons');

	console.log('Working: Adding ' + grey(packages.toString()));

	result = spawnSync(opts.packagemanager, ['add', '-S', ...packages], {
		shell: true
	});
	if (
		opts.packagemanager != 'yarn' &&
		result?.stderr.toString().length &&
		(result?.stderr.toString().includes('ERR_PNPM') || result?.stderr.toString().includes('ERR!'))
	) {
		console.log(
			'Create-Capacitor-Svelte App - we received an error from the package manager - please submit issue on https://github.com/Tommertom/svelte-ionic-npm/issues \n',
			result?.stderr.toString()
		);
		process.exit();
	}

	packages = ['@sveltejs/adapter-auto'];
	console.log('Working: Removing ' + grey(packages.toString()));
	result = spawnSync(opts.packagemanager, ['remove', '-D', ...packages], {
		shell: true
	});
	if (
		opts.packagemanager != 'yarn' &&
		result?.stderr.toString().length &&
		(result?.stderr.toString().includes('ERR_PNPM') || result?.stderr.toString().includes('ERR!'))
	) {
		console.log(
			'Create-Capacitor-Svelte App - we received an error from the package manager - please submit issue on https://github.com/Tommertom/svelte-ionic-npm/issues \n',
			result?.stderr.toString()
		);
		process.exit();
	}

	// Just to help with any user error reports
	// if (opts.verbose) {
	// 	const stdout = result?.stdout.toString();
	// 	if (stdout.length) console.log(bold(cyan('stdout:')), stdout);
	// 	const stderr = result?.stderr.toString();
	// 	if (stderr.length) console.log(bold(red('stderr:')), stderr);
	// }

	console.log('Working: Writing configs and default files');
	out('svelte.config.js', createSvelteConfig());

	if (opts.framework == 'svelte-kit' || opts.framework == 'svelte-kit-lib') {
		mkdirp(path.join('src', 'lib'));

		if (opts?.ionic) {
			mkdirp(path.join('src', 'theme'));
			out(
				path.resolve(process.cwd(), 'src/routes/', '+layout.svelte'),
				createSvelteKitLayout(opts)
			);

			out(path.resolve(process.cwd(), 'src/theme/', 'variables.css'), getIonicVariables());

			out(path.resolve(process.cwd(), 'src/routes/', '+page.svelte'), getDemoIonicApp());
		}

		if (!opts?.ionic) {
			out(path.resolve(process.cwd(), 'src/routes/', '+page.svelte'), getDemoCapacitorApp());
		}

		out(path.resolve(process.cwd(), 'src/routes/', '+layout.ts'), 'export const ssr = false;\n');

		// tsconfig
		if (opts.types == 'typescript' && opts?.ionic) {
			try {
				const tsconfig = fs.readFileSync('tsconfig.json', 'utf-8');
				//	console.log('Reading tsconfig ', tsconfig);
				const tsconfignew = tsconfig.replace(
					'"compilerOptions": {',
					`"compilerOptions": {
		"typeRoots": [
			"./node_modules/ionic-svelte"
		],
		"types": [
			"ionic-svelte"
		],`
				);

				//	console.log('New tsconfig ', tsconfignew);
				out(path.resolve(process.cwd(), './', 'tsconfig.json'), tsconfignew);
			} catch (e) {
				console.warn('TSconfig read/write error - ', e);
			}
		}

		// hot reload support - change the vite build script and point server url
		try {
			const packagagejson = fs.readFileSync('package.json', 'utf-8');
			//	console.log('Reading tsconfig ', tsconfig);
			const packagagejsonnew = packagagejson.replace(
				'"dev": "vite dev"',
				`"dev": "vite dev --host"`
			);

			//	console.log('New tsconfig ', tsconfignew);
			out(path.resolve(process.cwd(), './', 'package.json'), packagagejsonnew);
		} catch (e) {
			console.warn('TSconfig read/write error - ', e);
		}

		if (opts.types != 'typescript')
			out(
				'capacitor.config.json',
				`{
	"webDir":"build",
	"appId":"${opts.name}.ionic.io",
	"appName":"${opts.name}",
	"_server": {
	  "url": "http://${ip.address()}:5173/",
	  "cleartext": true
	}
}`
			);

		if (opts.types == 'typescript')
			out(
				'capacitor.config.ts',
				getTSCapacitorConfig({
					appId: opts.name + '.ionic.io',
					appName: opts.name,
					ip: ip.address() // 'http://192.168.137.1'
				})
			);
	}

	// close with prettier
	if (opts?.prettier) {
		console.log('Running Prettier on all files');
		result = spawnSync(opts.packagemanager, ['run', 'format'], {
			shell: true
		});

		if (
			opts.packagemanager !== 'yarn' &&
			result?.stderr.toString().length &&
			(result?.stderr.toString().includes('ERR_PNPM') || result?.stderr.toString().includes('ERR!'))
		) {
			console.log(
				'Create-Ionic-Svelte App - we received an error from the package manager - please submit issue on https://github.com/Tommertom/svelte-ionic-npm/issues \n',
				result?.stderr.toString()
			);
			process.exit();
		}
	}

	return opts;
}

function createSvelteConfig() {
	const str = `import adapter from '@sveltejs/adapter-static'
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		})
	}
};

export default config;
`;
	return str;
}

// TODO - this is for monorepos only, need to see everything that needs to be modified for monorepos
// currently packages are automatically added as a workspace reference if in a mono
function createViteConfig(opts) {
	let filename = '';
	if (opts.types == 'typescript') {
		filename = 'vite.config.ts';
	} else {
		filename = 'vite.config.js';
	}
	let vite = fs.readFileSync(filename);
	const insertString = `,
	server: {
		fs: {
			allow: ['../../packages/skeleton/']
		}
	}`;
	const token = 'kit()]';
	const insertPoint = vite.indexOf(token) + token.length;
	const str = vite.slice(0, insertPoint) + insertString + vite.slice(insertPoint);
	fs.writeFileSync(filename, str);
}

function createSvelteKitLayout(opts) {
	const str = `<script${opts.types == 'typescript' ? ` lang='ts'` : ''}>
	import { setupIonicBase } from 'ionic-svelte';

	/* Call Ionic's setup routine */
	setupIonicBase();

	/* Import all components - or do partial loading - see below */
	import 'ionic-svelte/components/all';

	/* Theme variables */
	import '../theme/variables.css';

	/*
		This part - import 'ionic-svelte/components/all'; -  loads all components at once.

		This adds at least >800kb (uncompressed) to your bundle - 80 components (so do your math!!)

		You can also choose to import each component you want to use separately and leave out others.

		It is recommended to do this in this file, as you only need to do such once. But you are free
		to do this elsewhere if you like to code-split differently. 

		Example: if you replace the line import 'ionic-svelte/components/all'; with the imports below, you will see the resulting bundle being much smaller
		
		import 'ionic-svelte/components/ion-app';
		import 'ionic-svelte/components/ion-card';
		import 'ionic-svelte/components/ion-card-title';
		import 'ionic-svelte/components/ion-card-subtitle';
		import 'ionic-svelte/components/ion-card-header';
		import 'ionic-svelte/components/ion-card-content';
		import 'ionic-svelte/components/ion-chip';
		import 'ionic-svelte/components/ion-button';

		Click the ionic-svelte-components-all-import above to go to the full list of possible imports.

		Please don't forget to import ion-app in this file when you decide to code-split:

	    import 'ionic-svelte/components/ion-app';

		You can report issues here - https://github.com/Tommertom/svelte-ionic-npm/issues
		Want to know what is happening more - follow me on Twitter - https://twitter.com/Tommertomm
		Discord channel on Ionic server - https://discordapp.com/channels/520266681499779082/1049388501629681675
	*/
</script>

<ion-app>
	<slot />
</ion-app>
`;
	return str;
}

function out(filename, data) {
	// console.log('WRITING', filename)
	fs.writeFileSync(filename, data);
}
