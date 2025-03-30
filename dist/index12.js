import { modalController as a, popoverController as d } from "@ionic/core";
const i = {
    create: (t) => (
      console.warn(
        "modalController broken - use inline modal - https://github.com/Tommertom/svelte-ionic-app/issues/77",
      ),
      console.warn(
        "modalController fails - use inline modal instead - https://github.com/Tommertom/svelte-ionic-app/issues/77",
      ),
      Promise.resolve(
        //@ts-ignore
        i.__create(t.component, t),
      )
    ),
    __create: (t, e) => {
      const r = document.createElement("div"),
        c = "id" + Date.now();
      r.id = c;
      const s = document.createElement("ion-modal");
      e.cssClass &&
        (Array.isArray(e.cssClass)
          ? e.cssClass.forEach((o) => {
              s.classList.add(o);
            })
          : s.classList.add(e.cssClass));
      let n = document.createElement("div");
      Object.keys(e)
        .filter((o) => !["component", "componentProps"].includes(o))
        .forEach((o) => {
          s[o] = e[o];
        }),
        r.appendChild(s),
        s.appendChild(n),
        document.body.appendChild(r);
      const l = new t({
        target: n,
        props: e.componentProps,
      });
      return (
        s.onDidDismiss().then(() => {
          l.$destroy(), r.remove();
        }),
        s
      );
    },
    dismiss: (t, e, r) => a.dismiss(t, e),
    getTop: () => a.getTop(),
  },
  m = {
    create: (t) =>
      Promise.resolve(
        //@ts-ignore
        m.__create(t.component, t),
      ),
    __create: (t, e) => {
      const r = document.createElement("div"),
        c = "id" + Date.now();
      r.id = c;
      const s = document.createElement("ion-popover");
      e.cssClass &&
        (Array.isArray(e.cssClass)
          ? e.cssClass.forEach((o) => {
              s.classList.add(o);
            })
          : s.classList.add(e.cssClass));
      let n = document.createElement("div");
      Object.keys(e)
        .filter((o) => !["component", "componentProps"].includes(o))
        .forEach((o) => {
          s[o] = e[o];
        }),
        r.appendChild(s),
        s.appendChild(n),
        document.body.appendChild(r);
      const l = new t({
        target: n,
        props: e.componentProps,
      });
      return (
        s.onDidDismiss().then(() => {
          l.$destroy(), r.remove();
        }),
        s
      );
    },
    dismiss: (t, e, r) => d.dismiss(t, e),
    getTop: () => d.getTop(),
  };
export { i as modalController, m as popoverController };
//# sourceMappingURL=index12.js.map
