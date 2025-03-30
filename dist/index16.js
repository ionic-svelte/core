import { noop as b, safe_not_equal as p } from "./index17.js";
const n = [];
function g(t, o) {
  return {
    subscribe: d(t, o).subscribe,
  };
}
function d(t, o = b) {
  let r;
  const i = /* @__PURE__ */ new Set();
  function u(s) {
    if (p(t, s) && ((t = s), r)) {
      const c = !n.length;
      for (const e of i) e[1](), n.push(e, t);
      if (c) {
        for (let e = 0; e < n.length; e += 2) n[e][0](n[e + 1]);
        n.length = 0;
      }
    }
  }
  function f(s) {
    u(s(t));
  }
  function l(s, c = b) {
    const e = [s, c];
    return (
      i.add(e),
      i.size === 1 && (r = o(u, f) || b),
      s(t),
      () => {
        i.delete(e), i.size === 0 && r && (r(), (r = null));
      }
    );
  }
  return { set: u, update: f, subscribe: l };
}
export { g as readable, d as writable };
//# sourceMappingURL=index16.js.map
