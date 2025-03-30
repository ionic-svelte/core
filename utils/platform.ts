import { config } from "@ionic/core/dist/collection/global/config";
import { readable } from "svelte/store";

let _win: Window;
let _doc: Document;

export type Platforms = keyof typeof PLATFORMS_MAP;

interface IsPlatformSignature {
  (plt: Platforms): boolean;
  (win: Window, plt: Platforms): boolean;
}

export const getPlatforms = (win?: any) => setupPlatforms(win);

export const isPlatform: IsPlatformSignature = (
  winOrPlatform: Window | Platforms | undefined,
  platform?: Platforms,
) => {
  if (typeof winOrPlatform === "string") {
    platform = winOrPlatform;
    winOrPlatform = undefined;
  }
  return getPlatforms(winOrPlatform).includes(platform!);
};

export const setupPlatforms = (win: any) => {
  // = window

  // to support SSR we need to wrap window and not initialise as default
  if (typeof window !== "undefined") {
    win = window;
    _win = window;
  }

  // we need the document object later on as well - if possible
  if (typeof document !== "undefined") {
    _doc = document;
  }

  if (typeof win === "undefined") {
    return [];
  }
  win.Ionic = win.Ionic || {};

  let platforms: Platforms[] | undefined | null = win.Ionic.platforms;
  if (platforms == null) {
    platforms = win.Ionic.platforms = detectPlatforms(win);
    platforms.forEach((p) =>
      win.document.documentElement.classList.add(`plt-${p}`),
    );
  }
  return platforms;
};

const detectPlatforms = (win: Window) => {
  const customPlatformMethods = config.get("platform");
  return (Object.keys(PLATFORMS_MAP) as Platforms[]).filter((p) => {
    const customMethod = customPlatformMethods?.[p];
    return typeof customMethod === "function"
      ? customMethod(win)
      : PLATFORMS_MAP[p](win);
  });
};

const isMobileWeb = (win: Window): boolean => isMobile(win) && !isHybrid(win);

const isIpad = (win: Window) => {
  // iOS 12 and below
  if (testUserAgent(win, /iPad/i)) {
    return true;
  }

  // iOS 13+
  if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
    return true;
  }

  return false;
};

const isIphone = (win: Window) => testUserAgent(win, /iPhone/i);

const isIOS = (win: Window) =>
  testUserAgent(win, /iPhone|iPod/i) || isIpad(win);

const isAndroid = (win: Window) => testUserAgent(win, /android|sink/i);

const isAndroidTablet = (win: Window) => {
  return isAndroid(win) && !testUserAgent(win, /mobile/i);
};

const isPhablet = (win: Window) => {
  const width = win.innerWidth;
  const height = win.innerHeight;
  const smallest = Math.min(width, height);
  const largest = Math.max(width, height);

  return smallest > 390 && smallest < 520 && largest > 620 && largest < 800;
};

const isTablet = (win: Window) => {
  const width = win.innerWidth;
  const height = win.innerHeight;
  const smallest = Math.min(width, height);
  const largest = Math.max(width, height);

  return (
    isIpad(win) ||
    isAndroidTablet(win) ||
    (smallest > 460 && smallest < 820 && largest > 780 && largest < 1400)
  );
};

const isMobile = (win: Window) => matchMedia(win, "(any-pointer:coarse)");

const isDesktop = (win: Window) => !isMobile(win);

const isHybrid = (win: Window) => isCordova(win) || isCapacitorNative(win);

const isCordova = (win: any): boolean =>
  !!(win["cordova"] || win["phonegap"] || win["PhoneGap"]);

const isCapacitorNative = (win: any): boolean => {
  const capacitor = win["Capacitor"];
  return !!capacitor?.isNative;
};

const isElectron = (win: Window): boolean => testUserAgent(win, /electron/i);

const isPWA = (win: Window): boolean =>
  !!(
    win.matchMedia?.("(display-mode: standalone)").matches ||
    (win.navigator as any).standalone
  );

export const testUserAgent = (win: Window, expr: RegExp) =>
  expr.test(win.navigator.userAgent);

const matchMedia = (win: Window, query: string): boolean =>
  win.matchMedia?.(query).matches;

export type PlatformConfig = Partial<typeof PLATFORMS_MAP>;

const PLATFORMS_MAP = {
  ipad: isIpad,
  iphone: isIphone,
  ios: isIOS,
  android: isAndroid,
  phablet: isPhablet,
  tablet: isTablet,
  cordova: isCordova,
  capacitor: isCapacitorNative,
  electron: isElectron,
  pwa: isPWA,
  mobile: isMobile,
  mobileweb: isMobileWeb,
  desktop: isDesktop,
  hybrid: isHybrid,
};

// SSR proof
export const networkStatus = readable(
  typeof window !== "undefined"
    ? (window.navigator.onLine ? "on" : "off") + "line"
    : "",
  (set) => {
    const eventFunction = () => {
      if (typeof window !== "undefined")
        set((window.navigator.onLine ? "on" : "off") + "line");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("offline", eventFunction);
      window.addEventListener("online", eventFunction);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("offline", eventFunction);
        window.removeEventListener("online", eventFunction);
      }
    };
  },
);

// taken from Angular's platform service
const readableEventFactory = (args: {
  defaultvalue: any;
  event: string;
  eventAttr: string;
  listenerComponent: Window | Document;
}) => {
  const { defaultvalue, event, eventAttr, listenerComponent } = args;
  return readable(defaultvalue, (set) => {
    const eventFunction = (event) => {
      if (eventAttr) set(event[eventAttr]);
      else set(event);
    };
    listenerComponent.addEventListener(event, eventFunction);
    return () => {
      listenerComponent.removeEventListener(event, eventFunction);
    };
  });
};

// SSR friendly
export let resize = readable("", (set) => {
  return () => {};
});
export let keyboardDidShow = readable("", (set) => {
  return () => {};
});
export let keyboardDidHide = readable("", (set) => {
  return () => {};
});
if (typeof window !== "undefined") {
  resize = readableEventFactory({
    defaultvalue: "",
    event: "resize",
    eventAttr: "timeStamp",
    listenerComponent: window,
  });
  keyboardDidShow = readableEventFactory({
    defaultvalue: "",
    event: "ionKeyboardDidShow",
    eventAttr: "",
    listenerComponent: window,
  });
  keyboardDidHide = readableEventFactory({
    defaultvalue: "",
    event: "ionKeyboardDidHide",
    eventAttr: "",
    listenerComponent: window,
  });
}

export let resume = readable("", (set) => {
  return () => {};
});
export let pause = readable("", (set) => {
  return () => {};
});
export let backButton = readable("", (set) => {
  return () => {};
});
export let keydown = readable("", (set) => {
  return () => {};
});
if (typeof document !== "undefined") {
  resume = readableEventFactory({
    defaultvalue: "",
    event: "resume",
    eventAttr: "",
    listenerComponent: document,
  });
  pause = readableEventFactory({
    defaultvalue: "",
    event: "pause",
    eventAttr: "",
    listenerComponent: document,
  });
  backButton = readableEventFactory({
    defaultvalue: "",
    event: "ionBackButton",
    eventAttr: "",
    listenerComponent: document,
  });
  keydown = readableEventFactory({
    defaultvalue: "",
    event: "keydown",
    eventAttr: "key",
    listenerComponent: document,
  });
}

export const backButtonSubscribeWithPriority = (
  handler: () => {},
  priority: number = 10,
) => {
  if (typeof document !== "undefined")
    document.addEventListener("ionBackButton", (ev: any) => {
      ev.detail.register(priority, () => {
        handler();
        console.log("Handler was called!");
      });
    });
};

export const height = (): number => {
  if (_win) return _win.innerHeight;
  return 0;
};

export const width = (): number => {
  if (_win) return _win.innerWidth;
  return 0;
};

export const url = (): string => {
  if (_win) return _win.location.href;
  return "";
};

// make this in a readable - problem is that iOS does not support https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation
export const isPortrait = (): boolean => {
  if (_win) return _win.matchMedia?.("(orientation: portrait)").matches;
  return false;
};

// make this in a derived
export const isLandscape = (): boolean => {
  return !isPortrait();
};

export const getQueryParam = (key: string): string | null => {
  if (_win) return readQueryParam(_win.location.href, key);
  return null;
};

export const isRTL = (): boolean => {
  if (_doc) return _doc.dir === "rtl";
  else return false;
};

/* redundant addition */
export const is = (platformName: Platforms): boolean => {
  if (_win) return isPlatform(_win, platformName);
  return false;
};

const readQueryParam = (url: string, key: string) => {
  key = key.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
  const results = regex.exec(url);
  return results ? decodeURIComponent(results[1].replace(/\+/g, " ")) : null;
};

// todo - implement toggle for dark mode https://ionicframework.com/docs/theming/dark-mode
import { writable } from "svelte/store";
export const prefersDark = writable(
  typeof window !== "undefined"
    ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    : "",
);
if (typeof window !== "undefined")
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      prefersDark.set(e.matches ? true : false);
    });
export const toggleDarkTheme = (shouldAdd) => {
  if (_doc) document.body.classList.toggle("dark", shouldAdd);
};
