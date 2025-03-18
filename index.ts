/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";

import { menuController } from "@ionic/core";

import { initialize } from "@ionic/core/components";
import type { IonicConfig } from "@ionic/core/components";

import type { MenuI } from "@ionic/core/dist/types/interface";

// all exports
export {
  actionSheetController,
  alertController,
  loadingController,
  menuController,
  pickerController,
  toastController,
} from "@ionic/core";

// from setupIonicReact
// TYPES
export type {
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
  ToggleCustomEvent,
} from "@ionic/core/components";

// UTILS
export {
  createAnimation,
  createGesture,
  iosTransitionAnimation,
  mdTransitionAnimation,
  IonicSlides,
  getTimeGivenProgression,
} from "@ionic/core/components";

export const setupIonicBase = async (config?: IonicConfig) => {
  /* Ionic initialisation */
  initialize(config);

  /* something else needed */
  if (typeof (document as any) !== "undefined") {
    document.documentElement.classList.add("ion-ce");
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
export { default as IonTabs } from "./components/TabsEmpty.svelte";
// @ts-ignore
// export { default as IonTabsLegacy } from "./components/IonTabsLegacy.svelte";
// @ts-ignore
export { default as IonPage } from "./components/PageEmpty.svelte";
// @ts-ignore
export { default as IonNav } from "./components/NavEmpty.svelte";
