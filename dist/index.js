/* empty css       */
/* empty css       */
/* empty css       */
/* empty css       */
/* empty css       */
/* empty css       */
/* empty css       */
/* empty css       */
/* empty css        */
/* empty css        */
import { menuController as t } from "@ionic/core";
import {
  actionSheetController as b,
  alertController as x,
  loadingController as S,
  menuController as T,
  pickerController as w,
  toastController as A,
} from "@ionic/core";
import { initialize as i } from "@ionic/core/components";
import {
  IonicSlides as v,
  createAnimation as B,
  createGesture as L,
  getTimeGivenProgression as q,
  iosTransitionAnimation as z,
  mdTransitionAnimation as G,
} from "@ionic/core/components";
import { modalController as E, popoverController as H } from "./index12.js";
import { navController as Q } from "./index13.js";
import {
  backButton as U,
  backButtonSubscribeWithPriority as W,
  getPlatforms as _,
  getQueryParam as j,
  height as F,
  is as J,
  isLandscape as K,
  isPlatform as N,
  isPortrait as O,
  isRTL as V,
  keyboardDidHide as X,
  keyboardDidShow as Y,
  keydown as Z,
  networkStatus as $,
  pause as oo,
  prefersDark as eo,
  resize as ro,
  resume as to,
  setupPlatforms as io,
  testUserAgent as no,
  toggleDarkTheme as mo,
  url as so,
  width as ao,
} from "./index14.js";
const k = async (o) => {
    i(o),
      typeof document < "u" && document.documentElement.classList.add("ion-ce");
  },
  y = (o) => {
    const r = "ion-menu[menu-id='" + o + "']",
      e = document.querySelector(r);
    return e && t._register(e), !!e;
  };
export {
  v as IonicSlides,
  b as actionSheetController,
  x as alertController,
  U as backButton,
  W as backButtonSubscribeWithPriority,
  B as createAnimation,
  L as createGesture,
  _ as getPlatforms,
  j as getQueryParam,
  q as getTimeGivenProgression,
  F as height,
  z as iosTransitionAnimation,
  J as is,
  K as isLandscape,
  N as isPlatform,
  O as isPortrait,
  V as isRTL,
  X as keyboardDidHide,
  Y as keyboardDidShow,
  Z as keydown,
  S as loadingController,
  G as mdTransitionAnimation,
  T as menuController,
  E as modalController,
  Q as navController,
  $ as networkStatus,
  oo as pause,
  w as pickerController,
  H as popoverController,
  eo as prefersDark,
  y as registerMenu,
  ro as resize,
  to as resume,
  k as setupIonicBase,
  io as setupPlatforms,
  no as testUserAgent,
  A as toastController,
  mo as toggleDarkTheme,
  so as url,
  ao as width,
};
//# sourceMappingURL=index.js.map
