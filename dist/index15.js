/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
class s {
  constructor() {
    this.m = /* @__PURE__ */ new Map();
  }
  reset(t) {
    this.m = new Map(Object.entries(t));
  }
  get(t, n) {
    const e = this.m.get(t);
    return e !== void 0 ? e : n;
  }
  getBoolean(t, n = !1) {
    const e = this.m.get(t);
    return e === void 0 ? n : typeof e == "string" ? e === "true" : !!e;
  }
  getNumber(t, n) {
    const e = parseFloat(this.m.get(t));
    return isNaN(e) ? (n !== void 0 ? n : NaN) : e;
  }
  set(t, n) {
    this.m.set(t, n);
  }
}
const i = /* @__PURE__ */ new s();
export { s as Config, i as config };
//# sourceMappingURL=index15.js.map
