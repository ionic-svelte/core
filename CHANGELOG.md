# Change Log Ionic-Svelte-NPM

All notable changes to this project will be documented in this file.

## 0.5.86

- added prettier and applied it to the files

## 0.5.85

- fix as per discord suggestion https://discord.com/channels/520266681499779082/1049388501629681675/1264201865231339520
  (style 100% in IonNav)

## 0.5.83

- bumped Ionic core 8.2.2

## 0.5.81/82

- bumped Ionic core to 7.2.1
- bumped Svelte to 4.0.5
- added message referring to Vite PWA to make your app a PWA

## 0.5.80

- modalController does not function - use inline - which is better for styling and binding anyway

## 0.5.79

- support for a href and goto routing for IonTabs - solving https://github.com/Tommertom/svelte-ionic-app/issues/76
- this may create an issue with slug navigation - will test later

## 0.5.78

- migrated the demo-app - see MIGRATION.md https://github.com/Tommertom/svelte-ionic-app/blob/mainMIGRATION.md on how I did so
- Fixed issue with IonTabs - a href and goto navigation not supported - https://github.com/Tommertom/svelte-ionic-app/issues/76
- May create issue with slug-routing
- removed default exports of IonTabs, IonNav and IonPage so non-kit users can use Ionic
- removed defineComponents - deprecated so people use all.js to import components - can cause BREAKING changes for some older implementations

## 0.5.77

- Bumped to 7.0.3 - including creator scripts
- Fix on MenuI
- IonPage.svelte now holds a secret

## 0.5.74/75/76 Ionic 7 (Ionic 7.0.2)

- Ionic 7 package landed - demo app is not upgraded yet
- Creator scripts are updated to 7.0.2 as well - fixing to that version as I assume there will be updates on core

## 0.5.73 create scripts

- bump create-svelte dependency to latest

## 0.5.71/72

- Added platforms back (typescript)

## 0.5.70

- Ionic core 6.6.0 and create scripts locked to latest of 6 (arrival of 7)

## 0.5.69

- IonTabs - possibly breaking changes for users - fixed bug when tabs are placed in main route

## 0.5.68

- added some typings for platform functions

## 0.5.62/63/64/65/66/67

- removed typescript in _.svelte components as Vite does not process them (but does process _.ts)
- removed IonTabsLegacy.svelte - can still be found here https://github.com/Tommertom/svelte-ionic-app/blob/main/src/IonTabsLegacy.svelte for manual inclusion

## 0.5.60/61

- Put the NPM package with the demo app in one repo

## Creator scripts / 0.5.59

- css classic style selectors for dark, so developer can do apply dark theme programmatically
- bumped to Ionic 6.5.3

## Creator scripts fixes

- added dark mode variables (they were missing)
- fixed HMR flag url - there needs to be http://

## 0.5.57/58

- Event types fixed - needed CustomEvent wrapper - https://github.com/ionic-team/ionic-framework/issues/26747

## 0.5.56

- Platform types added

## 0.5.54/55

- Updated README to cover HOWTOs
- Changed description for SSR/SPA

## 0.5.53

- Forgot about the typings for controllers! Added them

## 0.5.52

- Bumped ionic to 6.4.2 for creator scripts and ionic-svelte
- Ionic Nav and navController cleanup for better API:

Now you can load the ion-nav via `<IonNav root={SvelteRootComponent}/>` and this "NavHome" can use the `navController` to `push` new Sveltecomponents on the stack.

See HOWTO - https://github.com/Tommertom/ionic-svelte-nav-howto

## 0.5.51

- Typescript update after receiving good support from Svelte community

## 0.5.50

- Added navController and IonNav.svelte for better nav APIs - experimental, will make a HOWTO to show how it works

## 0.5.49

- Typings update (exporting the default pages)

## 0.5.47/0.5.48

- Typings update (exporting the default functions)

## 0.5.46

- Typings update - some more debugging

## Creator scripts updated

- Better HMR support (via dynamic config) - generated for _.json or _.ts approach

## 0.5.45

- Typings changed using svelte/elements

## 0.5.44

- NavController added (experimental) - to support IonNav easy DX - not working
- IonNav.svelte introduced as wrapper for Ionic's Nav navigation stack.

## 0.5.43

- Added `IonNav` component for better API support on an IonNav (experimental)

## Update to creator scripts (both)

- Running npx cap init from the script
- Feedback on capacitor config so user can tweak where needed

## Creator scripts for Capacitor and Ionic

- Updated to have HMR enabled by default
- Additional instructions for users

## 0.5.37/38/39/40/41/42

- Fixed issues in typings (camelcase to kebabcase for props, and fixed urls to api docs)

## 0.5.35/0.5.36

- BREAKING change for IonTabs - If you are using IonTabs, please import `IonTabsLegacy.svelte`
- Implemented IonTabs which uses SvelteKit Layout System
- If you are not using SvelteKit -> please continue using `IonTabsLegacy.svelte`
- See - https://github.com/Tommertom/ionic-svelte-tabs-howto
- Important notes when migrating away from legacy:
  - Change your icon reference and include imports `import {close} from 'ionicons/icons';`
  - Complete the `+layout.svelte` as per howto
  - Create the subfolders for the routes
  - Place your components in `+page.svelte` files
  - Make sure they are wrapped in `ion-tab` with `tab` property

## 0.5.34

- Minor text update for creator - explanation CapacitorJS
- fixed Vite4 dependency in creator
- Package size reduction

## 0.5.33

- Creator 0.0.15 - some fixes & better reference for npx cap init (webdir flag)

## 0.5.32

- Typings - Added on-handlers for all components per component

## 0.5.31

- Capacitor added to creator 0.0.8
- Ionicons bug fix in creator - disabled verbose logging for the time being

## 0.5.30

- Changed the default starter to use the cjs import, also to enable codesplitting - creator 0.0.8
- `setupIonicSvelte()` deprecated - Changed config routine to `setupIonicBase();`

```
<script lang="ts">
	import { setupIonicSvelte } from 'ionic-svelte';

	/* Theme variables */
	import '../theme/variables.css';

	/* Call Ionic's setup routine */
	setupIonicSvelte();

</script>

<ion-app>
	<slot />
</ion-app>

```

Should become:

```
<script lang="ts">
	import { setupIonicBase } from 'ionic-svelte';

	/* Call Ionic's setup routine */
	setupIonicBase();

	/* Import all components - or do partial loading - see below */
	import 'ionic-svelte/components/all';

	/* Theme variables */
	import '../theme/variables.css';

	/*
		This part - import 'ionic-svelte/components/all'; -  loads all components at once.

		This adds at least >800kb (uncompressed) to your bundle.

		You can also choose to import each component you want to use separately. Example:

        	import 'ionic-svelte/components/ion-app';
                import 'ionic-svelte/components/ion-card';
                import 'ionic-svelte/components/ion-card-title';
                import 'ionic-svelte/components/ion-card-subtitle';
                import 'ionic-svelte/components/ion-card-header';
                import 'ionic-svelte/components/ion-card-content';
                import 'ionic-svelte/components/ion-chip';
                import 'ionic-svelte/components/ion-button';

		It is recommended to do this in this file, as you only need to do such once. But you are free
		to do this elsewhere if you like to code-split differently.

		You can find these import lines to copy here by going to the imported file below (ionic-svelte/components/all).

		Please don't forget to import ion-app in this file when you decide to code-split:

	    import 'ionic-svelte/components/ion-app';
	*/

</script>

<ion-app>
	<slot />
</ion-app>


```

## 0.5.29

- Updated typings
- Modular imports available, but not defaulted yet

## 0.5.28/27

- Typings for style, default events, class added
- Still problem with ok-text (ion-select), is-open (modal) etc...
- How to deal with svelte specific goodies like use: and bind:....?
- Also padding (with =true), checked (without parameter)
- Fixed issue create-app script (now 0.0.7) - Package warnings are treated as errors

## 0.5.26

- Ionic event type bindings fix

## 0.5.25

- Fixes in type definitions (slots)

## 0.5.24

- Removed Experimental package - no ES-imports because of style encapsulation
- Added typings (need a bit more testing)

## 0.5.22

- Added create-ionic-svelte-app package

## 0.5.21

- Fixed issue with generation of slots - experimental is working again

## 0.5.20

- Package.json main added - so working with new Kit
- Experimental package is BROKEN

## 0.5.19

- FAIL warning when working with newer SvelteKit versions...

## 0.5.18

- multiple fixes on generate script (slots missing in ion-buttons - source code does not have slots)
- comments added for manual post processing
- removed warning in IonMenu.svelte

## 0.5.17

- added typing in IonTabs
- fixed issue icon in IonItem
- ion-menu warning added
- slot support introduced! (experimental still) - solution found in one of the references in https://github.com/sveltejs/svelte/issues/1689 (ui5 example), but had to tweak it a bit (using $$props, not $$restprops)

## 0.5.16

- fixed issue with not globally replacing tags
- added warning that type conversion is not done (like, translucent="true" will not be converted into translucent={true})

## 0.5.13

- Regenerated all experimental components as they had on:click twice - leading to triggering the event twice
- Support for bind:value bindings by redispatching and using ionChange events, making property binding finally possible

## 0.5.11

- minor updates to experimental components
- added migration script to migrate from kebab-case components to pascal-case - `migrateToImport.js` which you can run using `node migrateToImport <directoryname>`

## 0.5.10

- starting with changelog
- added generator scripts to generate svelte wrappers from Core Stencil code on github
- added "experimental" components - in order to move from kebab-case/webcomponent usage to tree-shakeable and type-safe Pascalcase. So moving from `<ion-button>A great button</ion-button>` to

```
import { IonButton } from 'ionic-svelte/experimental/components/IonButton.svelte';
<IonButton>A great button</IonButton>
```

Experimental also has version of `setupIonicSvelte`.

So if you want to use this, change imports from ` ... from 'ionic-svelte` to ` ... from 'ionic-svelte/experimental`
