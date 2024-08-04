# Migrating to Ionic 7 from Ionic 6

So these are the steps I took to migrate the Ionic demo from Ionic 6 to Ionic 7:

- npm i ionic-svelte@0.5.77
- npm i @ionic/core@7.0.2
  (or take the latest version as you can see https://www.npmjs.com/package/ionic-svelte)
- npm cache clean --force - possibly not necessary ion your end, but it was on mine
- update ionic components as per https://ionicframework.com/docs/updating/7-0
- but even better - look at the breaking changes https://github.com/ionic-team/ionic-framework/blob/main/BREAKING.md#version-7x
- and the warnings you get especially on the forms-related components - see https://ionicframework.com/docs/api/input#migrating-from-legacy-input-syntax
- implemented Slides via Swiper 9 (webcomponents) - https://swiperjs.com/element:

  - npm install swiper
  - configure as ion-slides was doing https://ionicframework.com/docs/angular/slides
  - styling https://ionicframework.com/docs/angular/slides#additional-ion-slides-styles
  - fix styling problem - add `flex-direction: column;` for `swiper-slide`
  - check events https://ionicframework.com/docs/angular/slides#events

- started implementing superforms as forms library https://superforms.vercel.app/, see Inputs. Issues:
  - input in form fields are not detected
  - hence likely the client side validation fails
  - how to do do the multi-input item with ion-label (now giving Ionic warning)
