const u = (o, n = {}) => {
    const e = document.createElement("div"),
      c = "id" + Date.now();
    e.id = c;
    const t = document.createElement("div");
    e.appendChild(t), document.body.appendChild(e);
    const r = {
      ...n,
      // ionNav
    };
    return (
      new o({
        target: t,
        props: r,
      }),
      e
    );
  },
  v = {
    canGoBack: function (o) {
      const n = document.querySelector("ion-nav");
      return n !== void 0 ? n.canGoBack(o) : void 0;
    },
    getActive: function () {
      const o = document.querySelector("ion-nav");
      return o !== void 0 ? o.getActive() : void 0;
    },
    getByIndex: function (o) {
      const n = document.querySelector("ion-nav");
      return n !== void 0 ? n.getByIndex(o) : void 0;
    },
    getPrevious: function (o) {
      const n = document.querySelector("ion-nav");
      return n !== void 0 ? n.getPrevious(o) : void 0;
    },
    insert: function (o, n, e, c, t) {
      const r = document.querySelector("ion-nav"),
        i = u(n, e);
      return r !== void 0 ? r.insert(o, i, e, c, t) : void 0;
    },
    insertPages: function (o, n, e, c) {
      const t = document.querySelector("ion-nav"),
        r = n.map((i) =>
          typeof i.component > "u"
            ? i
            : {
                //@ts-ignore
                component: u(
                  //@ts-ignore
                  i.component,
                  //@ts-ignore
                  i.componentProps,
                ),
                //@ts-ignore
                componentProps: i.componentProps,
              },
        );
      return t !== void 0 ? t.insertPages(o, r, e, c) : void 0;
    },
    pop: function (o, n) {
      const e = document.querySelector("ion-nav");
      return e !== void 0 ? e.pop(o, n) : void 0;
    },
    popTo: function (o, n, e) {
      const c = document.querySelector("ion-nav");
      return c !== void 0 ? c.popTo(o, n, e) : void 0;
    },
    popToRoot: function (o, n) {
      const e = document.querySelector("ion-nav");
      return e !== void 0 ? e.popToRoot(o, n) : void 0;
    },
    push: function (o, n, e, c) {
      const t = document.querySelector("ion-nav"),
        r = u(o, n);
      return t !== void 0 ? t.push(r, n, e, c) : void 0;
    },
    removeIndex: function (o, n, e, c) {
      const t = document.querySelector("ion-nav");
      return t !== void 0 ? t.removeIndex(o, n, e, c) : void 0;
    },
    setPages: function (o, n, e) {
      const c = document.querySelector("ion-nav"),
        t = o.map((r) =>
          typeof r.component > "u"
            ? r
            : {
                //@ts-ignore
                component: u(
                  //@ts-ignore
                  r.component,
                  //@ts-ignore
                  r.componentProps,
                ),
                //@ts-ignore
                componentProps: r.componentProps,
              },
        );
      return c !== void 0 ? c.setPages(t, n, e) : void 0;
    },
    setRoot: function (o, n, e, c) {
      const t = document.querySelector("ion-nav"),
        r = u(o, n);
      return t !== void 0 ? t.setRoot(r, n, e, c) : void 0;
    },
  };
export { v as navController };
//# sourceMappingURL=index13.js.map
