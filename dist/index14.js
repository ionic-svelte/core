import { config as w } from "./index15.js";
import { writable as k, readable as i } from "./index16.js";
let o, c;
const M = (e) => L(e),
  A = (e, t) => (
    typeof e == "string" && ((t = e), (e = void 0)), M(e).includes(t)
  ),
  L = (e) => {
    if (
      (typeof window < "u" && ((e = window), (o = window)),
      typeof document < "u" && (c = document),
      typeof e > "u")
    )
      return [];
    e.Ionic = e.Ionic || {};
    let t = e.Ionic.platforms;
    return (
      t == null &&
        ((t = e.Ionic.platforms = E(e)),
        t.forEach((n) => e.document.documentElement.classList.add(`plt-${n}`))),
      t
    );
  },
  E = (e) => {
    const t = w.get("platform");
    return Object.keys(h).filter((n) => {
      const r = t == null ? void 0 : t[n];
      return typeof r == "function" ? r(e) : h[n](e);
    });
  },
  P = (e) => l(e) && !g(e),
  u = (e) => !!(d(e, /iPad/i) || (d(e, /Macintosh/i) && l(e))),
  C = (e) => d(e, /iPhone/i),
  I = (e) => d(e, /iPhone|iPod/i) || u(e),
  v = (e) => d(e, /android|sink/i),
  x = (e) => v(e) && !d(e, /mobile/i),
  D = (e) => {
    const t = e.innerWidth,
      n = e.innerHeight,
      r = Math.min(t, n),
      s = Math.max(t, n);
    return r > 390 && r < 520 && s > 620 && s < 800;
  },
  H = (e) => {
    const t = e.innerWidth,
      n = e.innerHeight,
      r = Math.min(t, n),
      s = Math.max(t, n);
    return u(e) || x(e) || (r > 460 && r < 820 && s > 780 && s < 1400);
  },
  l = (e) => T(e, "(any-pointer:coarse)"),
  S = (e) => !l(e),
  g = (e) => y(e) || b(e),
  y = (e) => !!(e.cordova || e.phonegap || e.PhoneGap),
  b = (e) => {
    const t = e.Capacitor;
    return !!(t != null && t.isNative);
  },
  B = (e) => d(e, /electron/i),
  W = (e) => {
    var t;
    return !!(
      ((t = e.matchMedia) != null &&
        t.call(e, "(display-mode: standalone)").matches) ||
      e.navigator.standalone
    );
  },
  d = (e, t) => t.test(e.navigator.userAgent),
  T = (e, t) => {
    var n;
    return (n = e.matchMedia) == null ? void 0 : n.call(e, t).matches;
  },
  h = {
    ipad: u,
    iphone: C,
    ios: I,
    android: v,
    phablet: D,
    tablet: H,
    cordova: y,
    capacitor: b,
    electron: B,
    pwa: W,
    mobile: l,
    mobileweb: P,
    desktop: S,
    hybrid: g,
  },
  J = i(
    typeof window < "u"
      ? (window.navigator.onLine ? "on" : "off") + "line"
      : "",
    (e) => {
      const t = () => {
        typeof window < "u" &&
          e((window.navigator.onLine ? "on" : "off") + "line");
      };
      return (
        typeof window < "u" &&
          (window.addEventListener("offline", t),
          window.addEventListener("online", t)),
        () => {
          typeof window < "u" &&
            (window.removeEventListener("offline", t),
            window.removeEventListener("online", t));
        }
      );
    },
  ),
  a = (e) => {
    const { defaultvalue: t, event: n, eventAttr: r, listenerComponent: s } = e;
    return i(t, (f) => {
      const m = (p) => {
        f(r ? p[r] : p);
      };
      return (
        s.addEventListener(n, m),
        () => {
          s.removeEventListener(n, m);
        }
      );
    });
  };
let F = i("", (e) => () => {}),
  R = i("", (e) => () => {}),
  z = i("", (e) => () => {});
typeof window < "u" &&
  ((F = a({
    defaultvalue: "",
    event: "resize",
    eventAttr: "timeStamp",
    listenerComponent: window,
  })),
  (R = a({
    defaultvalue: "",
    event: "ionKeyboardDidShow",
    eventAttr: "",
    listenerComponent: window,
  })),
  (z = a({
    defaultvalue: "",
    event: "ionKeyboardDidHide",
    eventAttr: "",
    listenerComponent: window,
  })));
let K = i("", (e) => () => {}),
  N = i("", (e) => () => {}),
  Q = i("", (e) => () => {}),
  U = i("", (e) => () => {});
typeof document < "u" &&
  ((K = a({
    defaultvalue: "",
    event: "resume",
    eventAttr: "",
    listenerComponent: document,
  })),
  (N = a({
    defaultvalue: "",
    event: "pause",
    eventAttr: "",
    listenerComponent: document,
  })),
  (Q = a({
    defaultvalue: "",
    event: "ionBackButton",
    eventAttr: "",
    listenerComponent: document,
  })),
  (U = a({
    defaultvalue: "",
    event: "keydown",
    eventAttr: "key",
    listenerComponent: document,
  })));
const O = (e, t = 10) => {
    typeof document < "u" &&
      document.addEventListener("ionBackButton", (n) => {
        n.detail.register(t, () => {
          e(), console.log("Handler was called!");
        });
      });
  },
  V = () => (o ? o.innerHeight : 0),
  X = () => (o ? o.innerWidth : 0),
  Y = () => (o ? o.location.href : ""),
  j = () => {
    var e;
    return o
      ? (e = o.matchMedia) == null
        ? void 0
        : e.call(o, "(orientation: portrait)").matches
      : !1;
  },
  Z = () => !j(),
  ee = (e) => (o ? G(o.location.href, e) : null),
  te = () => (c ? c.dir === "rtl" : !1),
  ne = (e) => (o ? A(o, e) : !1),
  G = (e, t) => {
    t = t.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    const r = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(e);
    return r ? decodeURIComponent(r[1].replace(/\+/g, " ")) : null;
  },
  _ = k(
    typeof window < "u"
      ? window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      : "",
  );
typeof window < "u" &&
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      _.set(!!e.matches);
    });
const oe = (e) => {
  c && document.body.classList.toggle("dark", e);
};
export {
  Q as backButton,
  O as backButtonSubscribeWithPriority,
  M as getPlatforms,
  ee as getQueryParam,
  V as height,
  ne as is,
  Z as isLandscape,
  A as isPlatform,
  j as isPortrait,
  te as isRTL,
  z as keyboardDidHide,
  R as keyboardDidShow,
  U as keydown,
  J as networkStatus,
  N as pause,
  _ as prefersDark,
  F as resize,
  K as resume,
  L as setupPlatforms,
  d as testUserAgent,
  oe as toggleDarkTheme,
  Y as url,
  X as width,
};
//# sourceMappingURL=index14.js.map
