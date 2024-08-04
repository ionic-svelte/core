/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';

import { menuController } from '@ionic/core';

import { initialize } from '@ionic/core/components';
import type { IonicConfig } from '@ionic/core/components';

import type { MenuI } from '@ionic/core/dist/types/interface';

// all exports
export {
	actionSheetController,
	alertController,
	loadingController,
	menuController,
	pickerController,
	toastController
} from '@ionic/core';

// from setupIonicReact
export type {
	// TYPES
	Animation,
	AnimationBuilder,
	AnimationCallbackOptions,
	AnimationDirection,
	AnimationFill,
	AnimationKeyFrames,
	AnimationLifecycle,
	Gesture,
	GestureConfig,
	GestureDetail,
	NavComponentWithProps,
	SpinnerTypes,
	AccordionGroupCustomEvent,
	AccordionGroupChangeEventDetail,
	BreadcrumbCustomEvent,
	BreadcrumbCollapsedClickEventDetail,
	ActionSheetOptions,
	ActionSheetButton,
	AlertOptions,
	AlertInput,
	AlertButton,
	BackButtonEvent,
	CheckboxCustomEvent,
	CheckboxChangeEventDetail,
	DatetimeCustomEvent,
	DatetimeChangeEventDetail,
	InfiniteScrollCustomEvent,
	InputCustomEvent,
	InputChangeEventDetail,
	ItemReorderEventDetail,
	ItemReorderCustomEvent,
	ItemSlidingCustomEvent,
	IonicSafeString,
	LoadingOptions,
	MenuCustomEvent,
	ModalOptions,
	NavCustomEvent,
	PickerOptions,
	PickerButton,
	PickerColumn,
	PickerColumnOption,
	PopoverOptions,
	RadioGroupCustomEvent,
	RadioGroupChangeEventDetail,
	RangeCustomEvent,
	RangeChangeEventDetail,
	RangeKnobMoveStartEventDetail,
	RangeKnobMoveEndEventDetail,
	RefresherCustomEvent,
	RefresherEventDetail,
	RouterEventDetail,
	RouterCustomEvent,
	ScrollBaseCustomEvent,
	ScrollBaseDetail,
	ScrollDetail,
	ScrollCustomEvent,
	SearchbarCustomEvent,
	SearchbarChangeEventDetail,
	SegmentChangeEventDetail,
	SegmentCustomEvent,
	SelectChangeEventDetail,
	SelectCustomEvent,
	TabsCustomEvent,
	TextareaChangeEventDetail,
	TextareaCustomEvent,
	ToastOptions,
	ToastButton,
	ToggleChangeEventDetail,
	ToggleCustomEvent
} from '@ionic/core/components';

export {
	// UTILS
	createAnimation,
	createGesture,
	iosTransitionAnimation,
	mdTransitionAnimation,
	IonicSlides,
	getTimeGivenProgression
} from '@ionic/core/components';

export * from './utils/controllers';
export { navController } from './utils/navcontroller';

export * from './utils/platform';

export const setupIonicSvelte = async (config?: IonicConfig) => {
	console.warn(
		`setupIonicSvelte will be deprecated - use setupIonicBase and add import 'ionic-svelte/components/all'; - see https://github.com/Tommertom/svelte-ionic-npm/blob/main/CHANGELOG.md#0530 and also for module-shaking options to reduce the size of your bundle. `
	);

	/* Ionic initialisation */
	initialize(config);

	/* Loading webcomponents en styles */
	console.warn('Ionic components not loaded - so your UI will appear broken.');

	/* something else needed */
	if (typeof (document as any) !== 'undefined') {
		document.documentElement.classList.add('ion-ce');
	}
};

export const setupIonicBase = async (config?: IonicConfig) => {
	/* Ionic initialisation */
	initialize(config);

	/* something else needed */
	if (typeof (document as any) !== 'undefined') {
		document.documentElement.classList.add('ion-ce');
	}
};

export const registerMenu = (menuId: string): boolean => {
	const query = "ion-menu[menu-id='" + menuId + "']";
	const menu = document.querySelector(query) as unknown as MenuI;

	if (menu) {
		menuController._register(menu);
	}
	return !!menu;
};

// special component export
// @ts-ignore
export { default as IonTabs } from './components/TabsEmpty.svelte';
// @ts-ignore
// export { default as IonTabsLegacy } from "./components/IonTabsLegacy.svelte";
// @ts-ignore
export { default as IonPage } from './components/PageEmpty.svelte';
// @ts-ignore
export { default as IonNav } from './components/NavEmpty.svelte';
