<script lang="ts">
	import { modalController, toastController } from 'ionic-svelte';
	import { close } from 'ionicons/icons';
	import localForage from 'localforage';

	import { HighlightSvelte, LineNumbers } from 'svelte-highlight';
	import githubDark from 'svelte-highlight/styles/github-dark';

	export let name = '/';

	const LASTLANGSELECTEDKEY = 'lastLangSelected';
	let REPLlink: string | undefined;
	let APIlink: string = '';
	let selectedCodeLanguage = 'svelte';
	let sources: { [id: string]: string } = {};
	let languages = ['svelte'];

	// a bit obsolete maybe..
	languages.forEach((lang) => {
		sources[lang] = 'Loading ' + lang + '....';
	});
	let sourceCode = sources[selectedCodeLanguage];

	// generate the name to source file
	name = name.charAt(0).toUpperCase() + name.slice(1);
	if (name.length == 0) {
		name = 'Splash';
	}

	let apiName = name.toLowerCase();

	// do a mapping for some exceptions
	apiName = apiName.replace('/', '');
	fetch('/assets/json/api-mappings.json')
		.then((response) => {
			if (response.ok) {
				response.json().then((json) => {
					let url = 'https://ionicframework.com/docs/api/';
					if (json[apiName]) {
						url += json[apiName];
						// if we found an exception - we replace
						if (json[apiName].toLowerCase().substring(0, 4) == 'http') {
							url = json[apiName];
						}
					} else {
						url += apiName;
					}

					// svelte override
					if (apiName.includes('svelte'))
						url = 'https://svelte.dev/tutorial/' + apiName.replace('svelte', '');

					APIlink = url;
				});
			}
		})

		.catch((error) => {
			console.error('Error HTTP', error);
		});

	// we use a separate way to load the svelte source
	// hack the name for tabs
	if (name == 'Tabs' || name == 'tabs') {
		name = 'tabs/explain';
	}

	console.log('getting', `assets/src/components/${name}/+page.svelte`);
	fetch(`assets/src/components/${name}/+page.svelte`).then((response) => {
		response
			.text()
			.then((txt) => {
				if (txt.search('<!DOCTYPE html>') > -1) {
					sources['svelte'] = `No svelte file found for ${name}.`;
				} else {
					sources['svelte'] = txt;
					sourceCode = sources[selectedCodeLanguage];
				}
			})
			.catch((err) => {
				console.log(`Could not resolve source for ${name} due to error`, err);
			});
	});

	// Sample code documentation - https://github.com/ionic-team/ionic-docs/blob/main/docs/api/accordion.md
	fetch(`/assets/src/ionic-docs/api/${name}.md`.toLowerCase()).then((response) => {
		response.text().then(async (responseText) => {
			const lines = responseText.split('\n');

			// Maybe very tedious way to parse code, but I am not getting regex properly done
			let inTag = false;
			let foundLang = '';
			let codeBody = '';
			lines.forEach((line) => {
				const scanLine = line
					.replace('```html', '')
					.replace('```javascript', '')
					.replace('```typescript', '')
					.replace('```tsx', '')
					.replace('```', '')
					.replace('\r', '\n');

				if (scanLine.includes('</TabItem>')) {
					inTag = false;
					sources[foundLang] = codeBody.replace('\n\n', '');
					codeBody = '';
				}

				if (inTag) {
					codeBody += scanLine;
				}

				if (scanLine.includes('<TabItem')) {
					inTag = true;
					foundLang = scanLine.replace('<TabItem value="', '').replace('">', '').replace('\n', '');
					languages = [...languages, foundLang].sort();
				}
			});

			//  console.log("CODE STUFF", responseText, sources, Object.keys(sources));

			// change to the last one selected, but only if found
			const lastSelected = (await localForage.getItem(LASTLANGSELECTEDKEY)) as string;
			if (languages.includes(lastSelected))
				languageChange({
					detail: { value: lastSelected }
				});
		});
	});

	fetch('/assets/json/repls.json').then((response) => {
		response.json().then((json) => {
			const url = json[name.toLowerCase()];
			if (url) {
				REPLlink = url;
			} else {
				REPLlink = undefined;
			}
		});
	});

	const closeOverlay = () => {
		modalController.dismiss();
	};

	// somehow does not fly on iOS?
	const copySource = async () => {
		if (navigator && navigator.clipboard)
			navigator.clipboard
				.writeText(sourceCode)
				.then(async () => {
					const toast = await toastController.create({
						color: 'dark',
						duration: 2000,
						message: `Copied ${selectedCodeLanguage} code for ${name.toLowerCase()}...`
					});
					await toast.present();
				})
				.catch(async (message) => {
					const toast = await toastController.create({
						color: 'danger',
						duration: 2000,
						message
					});
					await toast.present();
				});

		setTimeout(closeOverlay, 1000);
	};

	const languageChange = (event: { detail: any }) => {
		selectedCodeLanguage = event.detail.value;
		sourceCode = sources[selectedCodeLanguage];
		localForage.setItem(LASTLANGSELECTEDKEY, selectedCodeLanguage);
	};

	function simplePrettier(code: string) {
		const lines = code.split('\n');
		const result = lines.map((line) => line.replace(/^\t/, '')).join('\n');
		return result.replace(/\t/g, '   ');
	}

	$: sourceCode = simplePrettier(sourceCode);
</script>

<svelte:head>
	<title>Sourceviewer {name}</title>
	{@html githubDark}
</svelte:head>
<ion-header translucent={true}>
	<ion-toolbar>
		<ion-buttons slot="end">
			{#if REPLlink}
				<ion-button
					on:click={() => {
						if (REPLlink && REPLlink.length > 1) {
							window.open(REPLlink, '_blank');
						}
					}}>
					REPL
				</ion-button>
			{/if}

			<ion-button
				on:click={() => {
					window.open(APIlink, '_blank');
				}}>
				API
			</ion-button>

			{#if sourceCode.length > 5}
				<ion-button on:click={copySource}>COPY</ion-button>
			{/if}
			<ion-button on:click={closeOverlay}>
				<ion-icon icon={close} />
			</ion-button>
		</ion-buttons>
	</ion-toolbar>
	{#if languages.length > 1}
		<ion-toolbar>
			<ion-segment value={selectedCodeLanguage} on:ionChange={languageChange} scrollable>
				{#each languages as language}
					<ion-segment-button value={language}>
						<ion-label>{language}</ion-label>
					</ion-segment-button>
				{/each}
			</ion-segment>
		</ion-toolbar>
	{/if}
</ion-header>

<ion-content scroll-x={true} style="--padding-start: 15px;--padding-end: 15px;" fullscreen>
	<HighlightSvelte code={sourceCode} let:highlighted>
		<LineNumbers {highlighted} />
	</HighlightSvelte>
</ion-content>
