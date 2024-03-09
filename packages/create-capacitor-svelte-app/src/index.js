#!/usr/bin/env node
import fs from 'fs-extra';
import { bold, cyan, gray, green, grey, red } from 'kleur/colors';
import mri from 'mri';
import prompts from 'prompts';
import { IonicSvelteOptions, createIonicSvelte } from './creator.js';
import { dist, getHelpText } from './utils.js';

/* Ionic Svelte Create NPM script

Taken from 
https://github.com/skeletonlabs/create-skeleton-app

So all kudos to the Skeleton crew

Go to their Discord - https://discord.com/invite/EXqV7W8MtY
Use their great tools - https://www.skeleton.dev/

*/


async function main() {
	// grab any passed arguments from the command line
	let opts = await parseArgs();

	if ('quiet' in opts) {
		// in quiet mode we prefill the defaults, then overlay the passed options and bypass all of askForMissingParams so that it
		// doesn't have to constantly check for quietmode all the time.
		let defaults = new IonicSvelteOptions();
		opts = Object.assign(defaults, opts);
	} else {
		// in interactive mode we ask the user to fill anything not passed in
		opts = await askForMissingParams(opts);
	}

	// Now that we have all of the options, lets create it. 
	await createIonicSvelte(opts);

	// And give the user some final information on what to do Next
	if (!(opts?.quiet)) {
		// @ts-ignore
		const pm = opts.packagemanager;
		let runString = `${pm} dev`;

		if (pm == 'npm') {
			runString = 'npm run dev';
		}

		const options = opts;
		// below taken from SvelteKit's bin.js in packages/create-svelte
		// https://raw.githubusercontent.com/sveltejs/kit/master/packages/create-svelte/bin.js
		console.log(bold(green('\nYour project is ready!')));

		if (options.types === 'typescript') {
			console.log(bold('✔ Typescript'));
			console.log('  Inside Svelte components, use <script lang="ts">');
		} else if (options.types === 'checkjs') {
			console.log(bold('✔ Type-checked JavaScript'));
			console.log('  https://www.typescriptlang.org/tsconfig#checkJs');
		}

		if (options.eslint) {
			console.log(bold('✔ ESLint'));
			console.log(cyan('  https://github.com/sveltejs/eslint-plugin-svelte3'));
		}

		if (options.prettier) {
			console.log(bold('✔ Prettier'));
			console.log(cyan('  https://prettier.io/docs/en/options.html'));
			console.log(cyan('  https://github.com/sveltejs/prettier-plugin-svelte#options'));
		}

		if (options.playwright) {
			console.log(bold('✔ Playwright'));
			console.log(cyan('  https://playwright.dev'));
		}

		if (options.vitest) {
			console.log(bold('✔ Vitest'));
			console.log(cyan('  https://vitest.dev'));
		}

		if (options.capacitor) {
			console.log(bold('✔ Capacitor'));
			console.log(cyan('  https://capacitorjs.com/docs/getting-started'));
			console.log(bold('  Please note - the project is configured with HMR - remove server entry in capacitor.config.json for final build'));
		}

		if (options.ionic) {
			console.log(bold('✔ Ionic UI'));
			console.log(cyan('  https://ionicframework.com/docs'));
		}

		if (options.ionicons) {
			console.log(bold('✔ Ionicons'));
			console.log(cyan('  https://ionic-svelte.firebaseapp.com/components/Icon'));
		}

		console.log('\nInstall community-maintained integrations:');
		console.log(cyan('  https://github.com/svelte-add/svelte-adders'));

		console.log(`\nCapacitor configuration - see: ${bold(cyan('capacitor.config.json|ts'))}`);
		console.log(`  App name ${bold(cyan(opts.name))}`);
		console.log(`  Package name ${bold(cyan(opts.name + '.ionic.io'))}`);
		console.log(`  Vite dev server url ${bold(cyan('http://192.168.137.1:5173/'))}`);

		console.log('\nNext steps:');
		let i = 1;

		const relative = opts.name;
		if (relative !== '') {
			console.log(`  ${i++}: ${bold(cyan(`cd ${relative}`))} `);
		}

		console.log(`  ${i++}: ${bold(cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional)`);

		//	console.log(`  ${ i++ }: ${ bold(cyan('npm install')) } (or pnpm install, etc)`);
		// prettier-ignore
		if (options.capacitor) {
			console.log(`  ${i++}: ${bold(cyan('npm i @capacitor/android'))} and/or ${bold(cyan('@capacitor/ios'))}`);
			console.log(`  ${i++}: ${bold(cyan('npx cap add android'))} and/or ${bold(cyan('ios'))}`);
			console.log(`  ${i++}: ${bold(cyan('npm run build'))} to fill the ${bold(cyan('build'))} directory`);
			console.log(`  ${i++}: ${bold(cyan('npx cap sync'))} sync the build into the target folder`);
			console.log(`  ${i++}: ${bold(cyan('npx cap open android'))} or ${bold(cyan('ios'))} to open the project and mark as trusted`);
		}
		console.log(`  ${i++}: ${bold(cyan('npm run dev -- --open'))}`);
		console.log(`\nTo close the dev server, hit ${bold(cyan('Ctrl-C'))}`);
		if (options.capacitor && opts.types != 'typescript') {
			console.log(`\nWant HMR in Capacitor dev mode? Rename ${bold(cyan('_server'))} to ${bold(cyan('server'))} in ${bold(cyan('capacitor.config.json'))}`);
		}
		if (options.capacitor && opts.types == 'typescript') {
			console.log(`\nUse the ${bold(cyan('-hmr'))} flag after your ${bold(cyan('npx cap run/open/sync'))} commands to use HMR together with ${bold(cyan('npm run dev'))}`);
		}

		console.log(`\nHint: Make your app offline and near native by turning it into a progressive web app - see ${cyan(' https://github.com/vite-pwa/sveltekit')}`);

		console.log(`\nStuck? Visit us at Ionic's discord ${cyan('https://discordapp.com/channels/520266681499779082/1049388501629681675')}`);

		console.log(grey(`\nNeed some help or found an issue with this installer? Visit us on Github https://github.com/Tommertom/svelte-ionic-npm`));
	}
	process.exit();
}

async function parseArgs() {
	const argv = process.argv.slice(2);

	// mri will parse argv and expand any shorthand args.  Accepted args are the literal props of SkelOptions
	const opts = mri(argv, {
		alias: {
			h: 'help',
			f: 'framework',
			n: 'name',
			p: 'path',
			m: 'monorepo',
			q: 'quiet',
			v: 'verbose',
			i: 'ionicons',
			c: 'capacitor'
		},
		boolean: [
			'help',
			'quiet',
			'monorepo',
			'prettier',
			'eslint',
			'playwright',
			'verbose',
			'vitest',
			'ionicons',
			'capacitor'
		],
	});

	// If a user invokes 'create-app blah foo', it falls into the _ catch all list, the best we can do is take the first one and use that as the name
	// if args are passed in incorrectly such as --prettier=0 instead of --prettier=false then a 0 will be added to the _ collection, we check that the
	// first one isn't a bungled arg set to 0
	if (opts._.length && opts._[0] != 0) {
		opts.name = opts._[0];
	}
	// Show help if specified regardless of how many other options are specified, have fun updating the text string in utils.ts :(
	if ('help' in opts) {
		console.log(getHelpText());
		process.exit();
	}
	return opts;
}


export async function askForMissingParams(opts) {
	// prettier-ignore
	const disclaimer = `
${bold(cyan('Welcome to Capacitor Svelte '))}

This script will install a SvelteKit project using their SvelteKit create script. 
And then adds Capacitor power to it - deploy you app as Android/iOS/Electron app, and use its plugin ecosystem to build cross-platform experience, also supporting PWA!

Optional:
- Ionicons - free package of icons to use in your app
- Ionic UI - UI elements integrated via ionic-svelte

${bold(red('This is BETA software; expect bugs and missing features.'))}

Problems? Open an issue on ${cyan('https://github.com/Tommertom/svelte-capacitor-npm/issues')}.
`;

	const { version } = JSON.parse(
		fs.readFileSync(dist('../package.json'), 'utf-8'),
	);

	console.log(gray(`\ncreate-capacitor-svelte-app version ${version}`));
	console.log(disclaimer);

	const questions = [];

	//NOTE: When doing checks here, make sure to test for the presence of the prop, not the prop value as it may be set to false deliberately.

	if (!('name' in opts)) {
		questions.push({
			type: 'text',
			name: 'name',
			message: 'Name for your new project:',
		});
	}

	// if (!('framework' in opts)) {
	// 	const q = {
	// 		type: 'select',
	// 		name: 'framework',
	// 		message: 'Select what framework you wish to use:',
	// 		choices: [
	// 			{ title: 'Svelte Kit', value: 'svelte-kit' },
	// 			{ title: 'Svelte Kit Library', value: 'svelte-kit-lib' }
	// 			// { title: 'Vite (Svelte)', value: 'vite' },
	// 			// { title: 'Astro', value: 'astro' }
	// 		]
	// 	};
	// 	questions.push(q);
	// }

	if (!('types' in opts)) {
		const q = {
			type: 'select',
			name: 'types',
			message: 'Add type checking with TypeScript?',
			initial: false,
			choices: [
				{
					title: 'Yes, using JavaScript with JSDoc comments',
					value: 'checkjs',
				},
				{
					title: 'Yes, using TypeScript syntax',
					value: 'typescript',
				},
				{ title: 'No', value: null },
			],
		};
		questions.push(q);
	}

	if (!('eslint' in opts)) {
		const q = {
			type: 'toggle',
			name: 'eslint',
			message: 'Add ESLint for code linting?',
			initial: false,
			active: 'Yes',
			inactive: 'No',
		};
		questions.push(q);
	}

	if (!('prettier' in opts)) {
		const q = {
			type: 'toggle',
			name: 'prettier',
			message: 'Add Prettier for code formatting?',
			initial: false,
			active: 'Yes',
			inactive: 'No',
		};
		questions.push(q);
	}

	if (!('playwright' in opts)) {
		const q = {
			type: 'toggle',
			name: 'playwright',
			message: 'Add Playwright for browser testing?',
			initial: false,
			active: 'Yes',
			inactive: 'No',
		};
		questions.push(q);
	}

	if (!('vitest' in opts)) {
		const q = {
			type: 'toggle',
			name: 'vitest',
			message: 'Add Vitest for unit testing?',
			initial: false,
			active: 'Yes',
			inactive: 'No'
		}
		questions.push(q);
	}

	if (!('ionicons' in opts)) {
		const q = {
			type: 'toggle',
			name: 'ionicons',
			message: 'Add Ionicons?',
			initial: false,
			active: 'Yes',
			inactive: 'No'
		}
		questions.push(q);
	}

	// if (!('capacitor' in opts)) {
	// 	const q = {
	// 		type: 'toggle',
	// 		name: 'capacitor',
	// 		message: 'Add Capacitor dependencies?',
	// 		initial: false,
	// 		active: 'Yes',
	// 		inactive: 'No'
	// 	}
	// 	questions.push(q);
	// }
	if (!('ionic' in opts)) {
		const q = {
			type: 'toggle',
			name: 'ionic',
			message: 'Add Ionic UI components?',
			initial: false,
			active: 'Yes',
			inactive: 'No'
		}
		questions.push(q);
	}

	const onCancel = () => {
		console.log('Exiting');
		process.exit();
	};

	// Get user responses to missing args
	//@ts-ignore
	const response = await prompts(questions, { onCancel });

	//Prompts returns the twplugins as an array, but it makes it easier to use on the command line if they are seperated booleans
	//We map them out from the array here and delete the now useless twplugins prop before proceeding to overlay the response values onto opts
	//@ts-ignore
	if (response.twplugins != undefined) Object.keys(response.twplugins).forEach((index) => (opts[response.twplugins[index]] = true));
	delete response.twplugins;
	Object.assign(opts, response);
	const skelOpts = new IonicSvelteOptions();
	Object.assign(skelOpts, opts);

	// console.log('skelOpts', skelOpts)

	//Map some values for compat with what svelte-create expects.  Note that the skeleton references below
	//have nothing to do with us, but rather create-svelte's internal naming for their starter templates.
	// if (opts.framework == 'svelte-kit') {
	// 	opts.template = 'skeleton';
	// }
	// if (opts.framework == 'svelte-kit-lib') {
	// 	opts.template = 'skeletonlib';
	// }
	return skelOpts;
}
main();