<h1> BIG OVERHAUL ONGOING </h1>
The repo is undergoing big overhaul into separate repos under the ionic-svelte organisation.
Some things might break because of this

<h1 align="center"> Ionic SvelteKit </h1> <br>
<p align="center">
  <a href="https://ionic-svelte.firebaseapp.com">
    <img alt="IonicSvelte" title="IonicSvelteKit" src="https://github.com/Tommertom/svelte-ionic-app/raw/main/demo-app/static/assets/svelte-ionic-logo.png" width="350">
  </a>

</p>
<br>
<p align="center">
  A library to include Ionic in your Svelte and SvelteKit app
</p>
<br>

<p align="center">
  <a href="https://ionic-svelte.firebaseapp.com">
    <img alt="Download as PWA" title="PWA power" src="https://github.com/Tommertom/svelte-ionic-app/raw/main/demo-app/static/assets/img/pwa-download.png" width="140"  target="_blank">
  </a>
</p>
Click the PWA Launch button to see this app live in action - and install as PWA on your desktop or mobile!
<br><br>

[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](./CONTRIBUTORS.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT license](https://img.shields.io/greasyfork/l/407466?style=flat-square)](./LICENSE.md)
[![Forks](https://img.shields.io/badge/forks-35-yellowgreen?style=flat-square)](https://github.com/Tommertom/svelte-ionic-app/fork)
[![Forks](https://img.shields.io/github/stars/tommertom/svelte-ionic-app?style=flat-square)](https://img.shields.io/github/stars/tommertom/svelte-ionic-app?style=flat-square)
[![Forks](https://img.shields.io/badge/watching-15-orange)](https://img.shields.io/badge/watching-15-orange)

NPM library to go along with the Ionic Svelte integration demonstrated at https://ionic-svelte.firebaseapp.com.

## How to get started - npm create ionic-svelte-app@latest

On the CLI just type `npm create ionic-svelte-app@latest` to spin a SvelteKit project from the CLI. This will
do all the lifting for you to create a SvelteKit SPA app.

## Show me Ionic!

A showcase app for all Ionic UI elements, Supercharged by SvelteKit can be found at https://ionic-svelte.firebaseapp.com. This also has a handy tool to show the source code for Svelte - and even Angular, VanillaJS, Vue, React and stencil!

And the code on how to use the components - repo at https://github.com/Tommertom/svelte-ionic-app/tree/main/demo-app

## How to get started - manual import of ionic-svelte library

Start a new SvelteKit project (or Svelte with Vite, even though I prefer Kit). Skip this part if you already have a project

```
npm create svelte@latest my-app
cd my-app
npm install
```

We need adapter static + `ssr=false`, because Ionic package cannot run in SSR=true.

I am choosing to deploy via adapter-static (to Firebase hosting), but if you deploy to Cloudflare, Vercel or Netflify you can opt to do differently. I checked with Vercel and that works still very well.

- `npm i -D @sveltejs/adapter-static`
- `import adapter from '@sveltejs/adapter-static'` in `svelte.config.js`
- `npm remove @sveltejs/adapter-auto`
- Configure adapter static: https://github.com/sveltejs/kit/tree/master/packages/adapter-static

```
adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		})
```

- Pages that use Ionic need to have ssr disabled in their layout files (if not earlier present in parent layout). Kit example: `src/routes/+layout.ts` and add `export const ssr = false;`

Integration of Ionic

- `npm i @ionic/core ionic-svelte`
- create a theme folder/file that contains the colours for Ionic (see starterfiles/theme). Example: https://raw.githubusercontent.com/Tommertom/svelte-ionic-app/main/starterfiles/theme/variables.css
- the top-route layout file `+layout.svelte` (Kit) or top root module (others) needs to run `setupIonicSvelte()` and import the theme stylesheet before anything else - also see starterfiles/+layout.svelte. Example:

```
<script lang="ts">
	import { setupIonicBase } from 'ionic-svelte';

	/* Theme variables */
	import '../theme/variables.css';

	/* load and register all components - you can also import separately to code split */
    import 'ionic-svelte/components/all';

	/* run base configuration code from ionic/core */
	setupIonicBase();
</script>

<ion-app>
   <slot />
</ion-app>

```

And then start working on the content of the app in `+page.svelte`:

```
	Hi there <ion-button>test</ion-button>
```

If you get a 500 internal error-error then likely SSR is not disabled. Making a SvelteKit app a real SPA really requires two steps - adapter static and `ssr=false`

Starterfiles on github: https://github.com/Tommertom/svelte-ionic-app/tree/main/starterfiles
Use these files as reference to see how to do the final steps integrating Ionic in your svelte project.

Code for this library - https://github.com/Tommertom/svelte-ionic-app

Ionic-svelte on NPMjs- https://www.npmjs.com/package/ionic-svelte

## Code Splitting to reduce bundle size

In order to reduce bundle size or limit the size of individual chunks, you can replace the import in main layout file. Example: if you replace the line `import 'ionic-svelte/components/all';` with imports like below. This can reduce the bundle for that chunk drastically. The import of `all` will result to at least an 800kb chunk (80 components), so it is worth it to change this.

Next you can choose to load specific components only where you use them.

Please note, you only need to import a component only once, as the import registers the webcomponent globally. So this saves you lots of imports, reducing the bundle as well (compared to tree-shaking).

And never forget to at least `import 'ionic-svelte/components/ion-app';` - as this one is in the main layout.

```
	import 'ionic-svelte/components/ion-app';
	import 'ionic-svelte/components/ion-card';
	import 'ionic-svelte/components/ion-card-title';
	import 'ionic-svelte/components/ion-card-subtitle';
	import 'ionic-svelte/components/ion-card-header';
	import 'ionic-svelte/components/ion-card-content';
	import 'ionic-svelte/components/ion-chip';
	import 'ionic-svelte/components/ion-button';
```

## How to use components

Ionic components are webcomponents, so appear in your template just like other dom elements. They don't need ECMA imports like `import {IonCard} from '...`.

```
<ion-card>
Here content
</ion-card>
```

So you can also apply css classes to them, also when wanting to tweak UI via the shadow dom/web-parts.

## Special components

Due to router issues and overlays, there are three special compontents included that override/replace the ionic standard webcomponents:

- IonTabs - fixing some default selected tabs as well as fixing compatibility with the router
- IonPage - wrapping the page and providing the ion-lifecycle hooks. And implementing a basic animation
- IonNav - supporting IonNav

To be imported from the package: `import { IonTab } from 'ionic-svelte';` etc..

See HOWTOs on how to implement tabs and nav. For Page - just check https://ionic-svelte.firebaseapp.com/

https://github.com/Tommertom/ionic-svelte-tabs-howto

https://github.com/Tommertom/ionic-svelte-nav-howto

## Typesafety and type-ahead support

The package provides typings for all webcomponents. These can be included in your IDE by adding the following to your the `compilerOptions` section in `tsconfig.json`:

```
		"typeRoots": [
			"./node_modules/ionic-svelte"
		],
		"types": [
			"ionic-svelte"
		]
```

Sample `tsconfig.json`:

```
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"typeRoots": [
			"./node_modules/ionic-svelte"
		],
		"types": [
			"ionic-svelte"
		]
	}
}
```

## How to contribute?

Would you like to contribute to this project? Great!

First and foremost - share you feedback!!!!!

- For issues with `ionic-svelte` library - https://github.com/Tommertom/svelte-ionic-npm/issues
- Or find me on Ionic's discord server, with a separate Ionic Svelte Channel - https://discordapp.com/channels/520266681499779082/1049388501629681675

And if you want to do more - what is there to do:

- EASY - fix typos (also great for your Github online profile - there are many), add examples for components
- MEDIUM - fix some minor bugs ( e.g. SvelteSpring), improve layout of pages (e.g. SvelteTransition)
- HARD - look at the open issues below

When you do a PR, make sure you explain what you did and why!

## Issues - help needed/workaround provided

- Ion Back Button - requires `default-href` to show in toolbar (page transitions need to add `can-go-back` class)

- IonTabs needs to manually call the select method of ion-tabs to ensure the selectedTab prop is really acted upon. Issue known: https://github.com/ionic-team/ionic-framework/issues/20060. Gives a brief undesireable view on the wrong tab. Might need to look into the angular/react/vue way as these packages don't have this issue. Probably tabs is wired up in the router.

- Gestures: Need a timeout to get proper style value even though I am using onMount??

- Ion Footer in Modal looks not ok - need to test in inline modal as well.

- bind:value does not seem to work on input and other form elements, so a click handler is needed - which is cumbersome - https://github.com/sveltejs/svelte/issues/892 - so probably not solvable without support by Ionic or Svelte - or we need to create wrappers for all elements - which is quite some work and you will be required to manually import all elements you use per page (like with Vue and React) - which seems a drag to me?

SvelteKit form actions make the usage of bind:value even obsolete. So that is the go-to way route anyway - https://kit.svelte.dev/docs/form-actions

Please note - if you use a library such as https://svelte-forms-lib-sapper-docs.vercel.app/introduction together with Yup schemas https://github.com/jquense/yup, the bind:value-issue actually becomes less relevant as you will have the library handle the events and you will use the observables to manage validation and final values to use for further processing. See https://blog.logrocket.com/form-validation-in-svelte/ for nice examples.

- Some styles are reported as unused - related to md and ios options for webcomponents? Or need to be discarded. Probably issue with webcomponents and the nature of Ionic being sensitive to md or ios style (as part of its config). Or the way Svelte/vite checks for unused css.

- Add IonPage, IonTabs and IonBackButton are not part of the default export - these are svelte components, so index.ts cannot handle these (?)

- Ion Icons implementation only uses icon-property syntax. Name/md/ios will not function

- In some cases IonPage clips the content enclosed - then you need to remove main tags in IonPage

- Routerlink, href and similar props on components like ion-item do not work properly, but I wonder if support is needed

- Menucontroller does not see the menu by default - you need to register the menu item manually - extra function added to help you with that (`registerMenu(menu-id:string)`) - `<ion-menu {side} content-id="main" menu-id="mainmenu">`see Menu.svelte with working example

- Nav component - works nicely, but implementation might be dirty (leaking DOM elements?). ion-nav-link not implemented.

- ItemSliding sometimes does not catch the gesture - known issue - needs fix in @ionic/core

- Many "File not found errors" on css.map files in the demo app. I frankly don't really mind these. Maybe it is easy to get rid of these, but for now, I leave it.

Check https://github.com/Tommertom/svelte-ionic-app/issues for most recent overview of issues.

## Things not being implemented

`ion-router-link`, `ion-router`,`ion-route`, `ion-route-redirect` and `ion-router-outlet` - these are imho obsolete because of usage of the router in this project. But tell me if I am wrong here!

`ion-nav-link` - not sure why not, but haven't used it yet in a project. Maybe my bad. What do you think?

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Tommertom/svelte-ionic-app&type=Date)](https://star-history.com/#Tommertom/svelte-ionic-app&Date)

## Acknowledgements

Logo by Brett Peary: https://brettpeary.com/

Ionic UI code: https://github.com/ionic-team/ionic-docs/tree/main/static/demos/api

README inspiration: https://github.com/gitpoint/git-point/blob/master/README.md

PWA logo: https://github.com/webmaxru/progressive-web-apps-logo

Borat logo: https://sapper.svelte.dev/

Raymondboswel's repo: https://github.com/raymondboswel/ionic-svelte-example

## Bumping Ionic Version

- download core.json file for @ionic/core@latest
- npm i @ionic/core@latest
- go to scripts folder and run node generator.js
- open index.d.ts and save file (pretty formatting) and check for errors
- bump package.json version
- run npm publish
