<h1 align="center"> Ionic SvelteKit Demo </h1> <br>
<p align="center">
  <a href="https://ionic-svelte.firebaseapp.com">
    <img alt="IonicSvelte" title="IonicSvelteKit" src="https://github.com/Tommertom/svelte-ionic-app/raw/main/demo-app/static/assets/svelte-ionic-logo.png" width="350">
  </a>
  
</p>
<br>
<p align="center">
  A showcase app for all Ionic UI elements. Supercharged by `ionic-svelte`, the unofficial Ionic Svelte integration.
</p>
<p align="center">
  With handy tool to see the actual code in all popular frameworks - Svelte, Vue, React, Stencil, VanillaJS and even Angular!
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

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Want to start your own Ionic project?](#want-to-start-your-own-ionic-project)
- [What is next - API](#what-is-next---api)
- [Screenshots](#screenshots)
- [Ionic starters - the Ionic CLI standard projects](#ionic-starters---the-ionic-cli-standard-projects)
- [How to contribute?](#how-to-contribute)
- [REPLS](#repls)
- [Things to do maybe one day...](#things-to-do-maybe-one-day)
- [Acknowledgements](#acknowledgements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

A showcase app for all Ionic UI elements - up to Ionic 6!!! Use this app to try-out the elements you like for your app, and then navigate directly to the API docs or the source code.

Published as web app: https://ionic-svelte.firebaseapp.com

_Open developer tools to see developer info in the console.log_

Design objectives

- Use all Ionic 6 UI elements
- Integration with SvelteKit as framework (n.b. only SPA mode works, SSR won't fly with Ionic)
- Ease PWA configuration with good documentation - using zero-config Vite (https://vite-plugin-pwa.netlify.app/)
- Deployable as PWA
- File based router (using SvelteKit's router)
- aligned as much as possible to the Ionic documentation for other integrations
- supporting other framework developers through source-code viewing

As far as I can see now, the current new version is getting there pretty close!

The original Svelte-Vite-Routify repo will continue to exist as separate branch (ViteSvelteIonic6) once the migration is completed. But I don't think I will upgrade that one anymore.

Hint: try responsive design of the app and ionic UI magic by using various devices or the Chrome developer view: iOS, Android's material design and fullscreen desktop responsiveness guaranteed!

## Want to start your own Ionic project?

On the CLI just type `npm create ionic-svelte-app@latest` to spin a SvelteKit project from the CLI. This will
do all the lifting for you to create a SvelteKit SPA app.

## What is next - API

The aim of this project is to stay as close as possible to Ionic's documentation. https://ionicframework.com/docs/components

But in some cases, that won't work. Visit https://github.com/Tommertom/svelte-ionic-npm to get more info on how to develop with Ionic Svelte and some issues.

And special components such as `IonPage`, `IonNav` and `IonTabs` which have their own APIs

Questions - find me on Ionic's discord server, with a separate Ionic Svelte Channel - https://discordapp.com/channels/520266681499779082/1049388501629681675

## Screenshots

<table>
  <tr>
    <th>Intro</th>
    <th>Component menu</th>
    <th>Sourcecode</th>
  </tr>
  <tr>
    <td align="center">
<img alt="IonicSvelte" title="IonicSvelte" src="screenshots/localhost_3000_folder_Inbox(iPhone SE).png" width="65%" ></td>
    <td align="center"><img alt="IonicSvelte" title="IonicSvelte" src="screenshots/localhost_3000_folder_Inbox(iPhone SE) (1).png" width="45%"></td>
    <td align="center"><img alt="IonicSvelte" title="IonicSvelte" src="screenshots/localhost_3000_folder_Inbox(iPhone SE) (2).png" width="45%"></td>
    </tr> 
</table>

<table>
  <tr>
<th>Progress bar</th>
<th>Icons</th>
<th>PWA IOS install</th>
  </tr>
  <tr>
       <td align="center"><img alt="IonicSvelte" title="IonicSvelte" src="screenshots/localhost_3000_components_Card(iPhone SE) (1).png" width="45%"></td>
     <td align="center"><img alt="IonicSvelte" title="IonicSvelte" src="screenshots/localhost_3000_components_Card(iPhone SE).png" width="45%"></td>
       <td align="center"><img alt="IonicSvelte" title="IonicSvelte" src="screenshots/localhost_3000_components_Badge(iPhone XR).png" width="45%"></td>
  </tr> 
</table>

More screens: https://ionic-svelte.firebaseapp.com

## Ionic starters - the Ionic CLI standard projects

If you want to get started with Ionic, Svelte and Vite, just use one of the starters that you can normally get when spinning a new Ionic project using the CLI

**PLEASE NOTE - THESE ARE NOT IN SVELTEKIT, BUT IN SVELTE+VITE+ROUTIFY**

- Blank demo

  - https://github.com/Tommertom/svelte-ionic-blank-demo
  - `npx degit Tommertom/svelte-ionic-blank-demo svelte-ionic-blank-demo`
  - Online playground - https://codesandbox.io/s/github/Tommertom/svelte-ionic-blank-demo

- Tabs demo

  - https://github.com/Tommertom/svelte-ionic-tabs-demo
  - `npx degit Tommertom/svelte-ionic-tabs-demo svelte-ionic-tabs-demo`
  - Online playground - https://codesandbox.io/s/github/Tommertom/svelte-ionic-tabs-demo

- Sidemenu demo

  - https://github.com/Tommertom/svelte-ionic-sidemenu-demo
  - `npx degit Tommertom/svelte-ionic-sidemenu-demo svelte-ionic-sidemenu-demo`
  - Online playground - https://codesandbox.io/s/github/Tommertom/svelte-ionic-sidemenu-demo

- Mystarter demo - taking photo with Capacitor

  - https://github.com/Tommertom/svelte-ionic-mystarter-demo
  - `npx degit Tommertom/svelte-ionic-mystarter-demo svelte-ionic-mystarter-demo`
  - Online playground - https://codesandbox.io/s/github/Tommertom/svelte-ionic-mystarter-demo

- List demo

  - https://github.com/Tommertom/svelte-ionic-list-demo
  - `npx degit Tommertom/svelte-ionic-list-demo svelte-ionic-list-demo`
  - Online playground - https://codesandbox.io/s/github/Tommertom/svelte-ionic-list-demo

- Conference demo - (sort of...check its README)
  - https://github.com/Tommertom/svelte-ionic-conference-demo
  - `npx degit Tommertom/svelte-ionic-conference-demo svelte-ionic-conference-demo`
  - Online playground - https://codesandbox.io/s/github/Tommertom/svelte-ionic-conference-demo

When using the online playground - make sure you pop-out the render window to see the demo in full size.

Would you like to start any of the above in your favorite framework (React, Vue or Angular), just use the Ionic CLI to start the app: `ionic start --type=angular|vue|react`. Ionic CLI is easy to install: `npm i -g @ionic/cli`. https://ionicframework.com/docs/cli/commands/start.

Or clone the repo of this full-demo-app to play with its code:

```bash
npx degit Tommertom/svelte-ionic-app svelte-ionic-app
cd svelte-ionic-app
npm i
npm run dev
```

## How to contribute?

Would you like to contribute to this project? Great!

First and foremost - share you feedback!!!!!

- For issues with `ionic-svelte` library - https://github.com/Tommertom/svelte-ionic-npm/issues
- For issues related to this demo app - https://github.com/Tommertom/svelte-ionic-app/issues
- Or find me on Ionic's discord server, with a separate Ionic Svelte Channel - https://discordapp.com/channels/520266681499779082/1049388501629681675

And if you want to do more - what is there to do:

- EASY - fix typos (also great for your Github online profile - there are many), add examples for components
- MEDIUM - fix some minor bugs ( e.g. SvelteSpring), improve layout of pages (e.g. SvelteTransition)
- HARD - look at the open issues below

When you do a PR, make sure you explain what you did and why!

## REPLS

REPLS available for each component separately - https://github.com/Tommertom/svelte-ionic-app/blob/main/REPLS.md
These are Ionic 4 components only.

## Things to do maybe one day...

- dark mode selector

## Acknowledgements

Logo by Brett Peary: https://brettpeary.com/

Ionic UI code: https://github.com/ionic-team/ionic-docs/tree/main/static/demos/api

README inspiration: https://github.com/gitpoint/git-point/blob/master/README.md

PWA logo: https://github.com/webmaxru/progressive-web-apps-logo

Borat logo: https://sapper.svelte.dev/

Raymondboswel's repo: https://github.com/raymondboswel/ionic-svelte-example

Code highlighting: https://github.com/metonym/svelte-highlight
