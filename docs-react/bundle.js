(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function createPencil (html) {
    return function PencilButton (props) {
        var cl = props.class || props.className
        return html`<button ...${props}
            className="edit-pencil${cl ? (' ' + cl) : ''}"
        >
            <span role="img" aria-label="edit">
                ✏
            </span>
        </button>`
    }
}

module.exports = createPencil

},{}],2:[function(require,module,exports){
"use strict";

var _preact = require("preact");

var _preact2 = require("htm/preact");

var _hooks = require("preact/hooks");

var {
  TextInput,
  NumberInput,
  Button,
  EditableField,
  PencilButton
} = require('../preact');

function submit(ev) {
  ev.preventDefault();
  console.log('submit');
  console.log('value', ev.target.elements['test-input'].value);
  console.log('something else', ev.target.elements['something'].value);
}

function ClickingDemo() {
  var [resolving, setResolving] = (0, _hooks.useState)(false);

  function doSomething(ev) {
    ev.preventDefault();
    setResolving(true); // 3 second delay

    setTimeout(() => setResolving(false), 3000);
  }

  return (0, _preact2.html)`<div class="clicking-demo">
        <${Button} type="submit" onClick=${doSomething} isSpinning=${resolving}>
            do something
        </${Button}>
    </div>`;
}

function Counter(props) {
  var {
    min,
    max
  } = props;
  var [count, setCount] = (0, _hooks.useState)(3);

  function inc() {
    if (parseInt(count) + 1 > max) return;
    if (count < min) return setCount(min);
    setCount(count + 1);
  }

  function dec() {
    if (parseInt(count) - 1 < min) return;
    if (count > max) return setCount(max);
    setCount(count - 1);
  }

  function change(ev) {
    console.log('change', ev.target.value);
    setCount(ev.target.value);
  }

  return (0, _preact2.html)`
        <${NumberInput} min=${2} max=${6} value=${count}
            onIncrease=${inc} onDecrease=${dec} onChange=${change} />
    `;
}

function Editing() {
  function save(newValue) {
    console.log('save', newValue); // wait 1 second
    // you *must* return a promise here;
    //   it is used by the `EditableField` component to
    //   set the resolving state

    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  return (0, _preact2.html)`
        <${EditableField} value="example" onSave=${save} name="example" />
    `;
}

function Demo() {
  var [formDemoState, setFormState] = (0, _hooks.useState)({
    isResolving: false
  });

  function formSubmit(ev) {
    ev.preventDefault();
    setFormState({
      isResolving: true
    });
    var els = ev.target.elements;
    console.log('els', els);
    setTimeout(() => {
      setFormState({
        isResolving: false
      });
      console.log('done submitting');
    }, 3000);
  }

  return (0, _preact2.html)`<form onsubmit=${submit}>
        <${TextInput} name="test-input" displayName="test input" value="bar"
            minlength="3" maxlength="6" required=${true}
        />

        <${TextInput} name="something" displayName="something else" value="foo"
            minlength="3" maxlength="6" required=${false}
        />

        <div class="number">
            <p>min 2, max 6</p>
            <${Counter} min=${2} max=${6} />
        </div>

        <div class="editing">
            <${Editing} />
        </div>

        <div class="btn">
            <${ClickingDemo} />
        </div>

        <div>
            testing the pencil button
            <${PencilButton} onClick=${ev => {
    ev.preventDefault();
    console.log('click', ev);
  }} />
        </div>
    </form>

    <form class="form-demo" onSubmit=${submit}>
        <${TextInput} name="more-stuff" displayName="more stuff"
            minlength="3" maxlength="6" required=${false}
        />

        <${Button} type="submit"
            isSpinning=${formDemoState.isResolving}
        >
            Submit the form
        </${Button}>
    </div>`;
}

(0, _preact.render)((0, _preact2.html)`<${Demo} />`, document.getElementById('content'));

},{"../preact":9,"htm/preact":4,"preact":5,"preact/hooks":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var n = function (t, s, r, e) {
  var u;
  s[0] = 0;

  for (var h = 1; h < s.length; h++) {
    var p = s[h++],
        a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
    3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t.apply(a, n(t, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
  }

  return e;
},
    t = new Map();

function _default(s) {
  var r = t.get(this);
  return r || (r = new Map(), t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function (n) {
    for (var t, s, r = 1, e = "", u = "", h = [0], p = function (n) {
      1 === r && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n, e) : 3 === r && (n || e) ? (h.push(3, n, e), r = 2) : 2 === r && "..." === e && n ? h.push(4, n, 0) : 2 === r && e && !n ? h.push(5, 0, !0, e) : r >= 5 && ((e || !n && 5 === r) && (h.push(r, 0, e, s), r = 6), n && (h.push(r, n, 0, s), r = 6)), e = "";
    }, a = 0; a < n.length; a++) {
      a && (1 === r && p(), p(a));

      for (var l = 0; l < n[a].length; l++) t = n[a][l], 1 === r ? "<" === t ? (p(), h = [h], r = 3) : e += t : 4 === r ? "--" === e && ">" === t ? (r = 1, e = "") : e = t + e[0] : u ? t === u ? u = "" : e += t : '"' === t || "'" === t ? u = t : ">" === t ? (p(), r = 1) : r && ("=" === t ? (r = 5, s = e, e = "") : "/" === t && (r < 5 || ">" === n[a][l + 1]) ? (p(), 3 === r && (h = h[0]), r = h, (h = h[0]).push(2, 0, r), r = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (p(), r = 2) : e += t), 3 === r && "!--" === e && (r = 4, h = h[0]);
    }

    return p(), h;
  }(s)), r), arguments, [])).length > 1 ? r : r[0];
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "h", {
  enumerable: true,
  get: function () {
    return _preact.h;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _preact.render;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function () {
    return _preact.Component;
  }
});
exports.html = void 0;

var _preact = require("preact");

var _htm = _interopRequireDefault(require("htm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var m = _htm.default.bind(_preact.h);

exports.html = m;

},{"htm":3,"preact":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = N;
exports.hydrate = O;
exports.h = exports.createElement = a;
exports.Fragment = y;
exports.createRef = h;
exports.Component = p;
exports.cloneElement = S;
exports.createContext = q;
exports.toChildArray = w;
exports.options = exports.isValidElement = void 0;
var n,
    l,
    u,
    i,
    t,
    o,
    r = {},
    f = [],
    e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
exports.isValidElement = l;
exports.options = n;

function c(n, l) {
  for (var u in l) n[u] = l[u];

  return n;
}

function s(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function a(n, l, u) {
  var i,
      t,
      o,
      r = arguments,
      f = {};

  for (o in l) "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];

  if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) u.push(r[o]);
  if (null != u && (f.children = u), "function" == typeof n && null != n.defaultProps) for (o in n.defaultProps) void 0 === f[o] && (f[o] = n.defaultProps[o]);
  return v(n, f, i, t, null);
}

function v(l, u, i, t, o) {
  var r = {
    type: l,
    props: u,
    key: i,
    ref: t,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == o ? ++n.__v : o
  };
  return null != n.vnode && n.vnode(r), r;
}

function h() {
  return {
    current: null
  };
}

function y(n) {
  return n.children;
}

function p(n, l) {
  this.props = n, this.context = l;
}

function d(n, l) {
  if (null == l) return n.__ ? d(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

  return "function" == typeof n.type ? d(n) : null;
}

function _(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
      n.__e = n.__c.base = u.__e;
      break;
    }

    return _(n);
  }
}

function k(l) {
  (!l.__d && (l.__d = !0) && u.push(l) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b);
}

function b() {
  for (var n; b.__r = u.length;) n = u.sort(function (n, l) {
    return n.__v.__b - l.__v.__b;
  }), u = [], n.some(function (n) {
    var l, u, i, t, o, r;
    n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = c({}, t)).__v = t.__v + 1, I(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [o] : null, u, null == o ? d(t) : o, t.__h), T(u, t), t.__e != o && _(t)));
  });
}

function m(n, l, u, i, t, o, e, c, s, a) {
  var h,
      p,
      _,
      k,
      b,
      m,
      w,
      A = i && i.__k || f,
      P = A.length;

  for (u.__k = [], h = 0; h < l.length; h++) if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(y, {
    children: k
  }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, null, k.__v) : k)) {
    if (k.__ = u, k.__b = u.__b + 1, null === (_ = A[h]) || _ && k.key == _.key && k.type === _.type) A[h] = void 0;else for (p = 0; p < P; p++) {
      if ((_ = A[p]) && k.key == _.key && k.type === _.type) {
        A[p] = void 0;
        break;
      }

      _ = null;
    }
    I(n, k, _ = _ || r, t, o, e, c, s, a), b = k.__e, (p = k.ref) && _.ref != p && (w || (w = []), _.ref && w.push(_.ref, null, k), w.push(p, k.__c || b, k)), null != b ? (null == m && (m = b), "function" == typeof k.type && null != k.__k && k.__k === _.__k ? k.__d = s = g(k, s, n) : s = x(n, k, _, A, b, s), a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && _.__e == s && s.parentNode != n && (s = d(_));
  }

  for (u.__e = m, h = P; h--;) null != A[h] && ("function" == typeof u.type && null != A[h].__e && A[h].__e == u.__d && (u.__d = d(i, h + 1)), L(A[h], A[h]));

  if (w) for (h = 0; h < w.length; h++) z(w[h], w[++h], w[++h]);
}

function g(n, l, u) {
  var i, t;

  for (i = 0; i < n.__k.length; i++) (t = n.__k[i]) && (t.__ = n, l = "function" == typeof t.type ? g(t, l, u) : x(u, t, t, n.__k, t.__e, l));

  return l;
}

function w(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    w(n, l);
  }) : l.push(n)), l;
}

function x(n, l, u, i, t, o) {
  var r, f, e;
  if (void 0 !== l.__d) r = l.__d, l.__d = void 0;else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;else {
    for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) if (f == t) break n;

    n.insertBefore(t, o), r = o;
  }
  return void 0 !== r ? r : t.nextSibling;
}

function A(n, l, u, i, t) {
  var o;

  for (o in u) "children" === o || "key" === o || o in l || C(n, o, null, u[o], i);

  for (o in l) t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || C(n, o, l[o], u[o], i);
}

function P(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || e.test(l) ? u : u + "px";
}

function C(n, l, u, i, t) {
  var o;

  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) u && l in u || P(n.style, l, "");
      if (u) for (l in u) i && u[l] === i[l] || P(n.style, l, u[l]);
    }
  } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? H : $, o) : n.removeEventListener(l, o ? H : $, o);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
  }
}

function $(l) {
  this.l[l.type + !1](n.event ? n.event(l) : l);
}

function H(l) {
  this.l[l.type + !0](n.event ? n.event(l) : l);
}

function I(l, u, i, t, o, r, f, e, s) {
  var a,
      v,
      h,
      d,
      _,
      k,
      b,
      g,
      w,
      x,
      A,
      P = u.type;

  if (void 0 !== u.constructor) return null;
  null != i.__h && (s = i.__h, e = u.__e = i.__e, u.__h = null, r = [e]), (a = n.__b) && a(u);

  try {
    n: if ("function" == typeof P) {
      if (g = u.props, w = (a = P.contextType) && t[a.__c], x = a ? w ? w.props.value : a.__ : t, i.__c ? b = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(g, x) : (u.__c = v = new p(g, x), v.constructor = P, v.render = M), w && w.sub(v), v.props = g, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = c({}, v.__s)), c(v.__s, P.getDerivedStateFromProps(g, v.__s))), d = v.props, _ = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && g !== d && null != v.componentWillReceiveProps && v.componentWillReceiveProps(g, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(g, v.__s, x) || u.__v === i.__v) {
          v.props = g, v.state = v.__s, u.__v !== i.__v && (v.__d = !1), v.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
            n && (n.__ = u);
          }), v.__h.length && f.push(v);
          break n;
        }

        null != v.componentWillUpdate && v.componentWillUpdate(g, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
          v.componentDidUpdate(d, _, k);
        });
      }
      v.context = x, v.props = g, v.state = v.__s, (a = n.__r) && a(u), v.__d = !1, v.__v = u, v.__P = l, a = v.render(v.props, v.state, v.context), v.state = v.__s, null != v.getChildContext && (t = c(c({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (k = v.getSnapshotBeforeUpdate(d, _)), A = null != a && a.type === y && null == a.key ? a.props.children : a, m(l, Array.isArray(A) ? A : [A], u, i, t, o, r, f, e, s), v.base = u.__e, u.__h = null, v.__h.length && f.push(v), b && (v.__E = v.__ = null), v.__e = !1;
    } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = j(i.__e, u, i, t, o, r, f, s);

    (a = n.diffed) && a(u);
  } catch (l) {
    u.__v = null, (s || null != r) && (u.__e = e, u.__h = !!s, r[r.indexOf(e)] = null), n.__e(l, u, i);
  }
}

function T(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}

function j(n, l, u, i, t, o, e, c) {
  var a,
      v,
      h,
      y,
      p = u.props,
      d = l.props,
      _ = l.type,
      k = 0;
  if ("svg" === _ && (t = !0), null != o) for (; k < o.length; k++) if ((a = o[k]) && (a === n || (_ ? a.localName == _ : 3 == a.nodeType))) {
    n = a, o[k] = null;
    break;
  }

  if (null == n) {
    if (null === _) return document.createTextNode(d);
    n = t ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, d.is && d), o = null, c = !1;
  }

  if (null === _) p === d || c && n.data === d || (n.data = d);else {
    if (o = o && f.slice.call(n.childNodes), v = (p = u.props || r).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !c) {
      if (null != o) for (p = {}, y = 0; y < n.attributes.length; y++) p[n.attributes[y].name] = n.attributes[y].value;
      (h || v) && (h && (v && h.__html == v.__html || h.__html === n.innerHTML) || (n.innerHTML = h && h.__html || ""));
    }

    if (A(n, d, p, t, c), h) l.__k = [];else if (k = l.props.children, m(n, Array.isArray(k) ? k : [k], l, u, i, t && "foreignObject" !== _, o, e, n.firstChild, c), null != o) for (k = o.length; k--;) null != o[k] && s(o[k]);
    c || ("value" in d && void 0 !== (k = d.value) && (k !== n.value || "progress" === _ && !k) && C(n, "value", k, p.value, !1), "checked" in d && void 0 !== (k = d.checked) && k !== n.checked && C(n, "checked", k, p.checked, !1));
  }
  return n;
}

function z(l, u, i) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, i);
  }
}

function L(l, u, i) {
  var t, o, r;

  if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || z(t, null, u)), i || "function" == typeof l.type || (i = null != (o = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }
    t.base = t.__P = null;
  }

  if (t = l.__k) for (r = 0; r < t.length; r++) t[r] && L(t[r], u, i);
  null != o && s(o);
}

function M(n, l, u) {
  return this.constructor(n, u);
}

function N(l, u, i) {
  var t, o, e;
  n.__ && n.__(l, u), o = (t = "function" == typeof i) ? null : i && i.__k || u.__k, e = [], I(u, l = (!t && i || u).__k = a(y, null, [l]), o || r, r, void 0 !== u.ownerSVGElement, !t && i ? [i] : o ? null : u.firstChild ? f.slice.call(u.childNodes) : null, e, !t && i ? i : o ? o.__e : u.firstChild, t), T(e, l);
}

function O(n, l) {
  N(n, l, O);
}

function S(n, l, u) {
  var i,
      t,
      o,
      r = arguments,
      f = c({}, n.props);

  for (o in l) "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];

  if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) u.push(r[o]);
  return null != u && (f.children = u), v(n.type, f, i || n.key, t || n.ref, null);
}

function q(n, l) {
  var u = {
    __c: l = "__cC" + o++,
    __: n,
    Consumer: function (n, l) {
      return n.children(l);
    },
    Provider: function (n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(k);
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}

exports.options = n = {
  __e: function (n, l) {
    for (var u, i, t; l = l.__;) if ((u = l.__c) && !u.__) try {
      if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
    } catch (l) {
      n = l;
    }

    throw n;
  },
  __v: 0
}, exports.isValidElement = l = function (n) {
  return null != n && void 0 === n.constructor;
}, p.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), "function" == typeof n && (n = n(c({}, u), this.props)), n && c(u, n), null != n && this.__v && (l && this.__h.push(l), k(this));
}, p.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), k(this));
}, p.prototype.render = y, u = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useState = l;
exports.useReducer = p;
exports.useEffect = y;
exports.useLayoutEffect = h;
exports.useRef = s;
exports.useImperativeHandle = _;
exports.useMemo = d;
exports.useCallback = A;
exports.useContext = F;
exports.useDebugValue = T;
exports.useErrorBoundary = q;

var _preact = require("preact");

var t,
    u,
    r,
    o = 0,
    i = [],
    c = _preact.options.__b,
    f = _preact.options.__r,
    e = _preact.options.diffed,
    a = _preact.options.__c,
    v = _preact.options.unmount;

function m(t, r) {
  _preact.options.__h && _preact.options.__h(u, t, o || r), o = 0;
  var i = u.__H || (u.__H = {
    __: [],
    __h: []
  });
  return t >= i.__.length && i.__.push({}), i.__[t];
}

function l(n) {
  return o = 1, p(w, n);
}

function p(n, r, o) {
  var i = m(t++, 2);
  return i.t = n, i.__c || (i.__ = [o ? o(r) : w(void 0, r), function (n) {
    var t = i.t(i.__[0], n);
    i.__[0] !== t && (i.__ = [t, i.__[1]], i.__c.setState({}));
  }], i.__c = u), i.__;
}

function y(r, o) {
  var i = m(t++, 3);
  !_preact.options.__s && k(i.__H, o) && (i.__ = r, i.__H = o, u.__H.__h.push(i));
}

function h(r, o) {
  var i = m(t++, 4);
  !_preact.options.__s && k(i.__H, o) && (i.__ = r, i.__H = o, u.__h.push(i));
}

function s(n) {
  return o = 5, d(function () {
    return {
      current: n
    };
  }, []);
}

function _(n, t, u) {
  o = 6, h(function () {
    "function" == typeof n ? n(t()) : n && (n.current = t());
  }, null == u ? u : u.concat(n));
}

function d(n, u) {
  var r = m(t++, 7);
  return k(r.__H, u) && (r.__ = n(), r.__H = u, r.__h = n), r.__;
}

function A(n, t) {
  return o = 8, d(function () {
    return n;
  }, t);
}

function F(n) {
  var r = u.context[n.__c],
      o = m(t++, 9);
  return o.__c = n, r ? (null == o.__ && (o.__ = !0, r.sub(u)), r.props.value) : n.__;
}

function T(t, u) {
  _preact.options.useDebugValue && _preact.options.useDebugValue(u ? u(t) : t);
}

function q(n) {
  var r = m(t++, 10),
      o = l();
  return r.__ = n, u.componentDidCatch || (u.componentDidCatch = function (n) {
    r.__ && r.__(n), o[1](n);
  }), [o[0], function () {
    o[1](void 0);
  }];
}

function x() {
  i.forEach(function (t) {
    if (t.__P) try {
      t.__H.__h.forEach(g), t.__H.__h.forEach(j), t.__H.__h = [];
    } catch (u) {
      t.__H.__h = [], _preact.options.__e(u, t.__v);
    }
  }), i = [];
}

_preact.options.__b = function (n) {
  u = null, c && c(n);
}, _preact.options.__r = function (n) {
  f && f(n), t = 0;
  var r = (u = n.__c).__H;
  r && (r.__h.forEach(g), r.__h.forEach(j), r.__h = []);
}, _preact.options.diffed = function (t) {
  e && e(t);
  var o = t.__c;
  o && o.__H && o.__H.__h.length && (1 !== i.push(o) && r === _preact.options.requestAnimationFrame || ((r = _preact.options.requestAnimationFrame) || function (n) {
    var t,
        u = function () {
      clearTimeout(r), b && cancelAnimationFrame(t), setTimeout(n);
    },
        r = setTimeout(u, 100);

    b && (t = requestAnimationFrame(u));
  })(x)), u = void 0;
}, _preact.options.__c = function (t, u) {
  u.some(function (t) {
    try {
      t.__h.forEach(g), t.__h = t.__h.filter(function (n) {
        return !n.__ || j(n);
      });
    } catch (r) {
      u.some(function (n) {
        n.__h && (n.__h = []);
      }), u = [], _preact.options.__e(r, t.__v);
    }
  }), a && a(t, u);
}, _preact.options.unmount = function (t) {
  v && v(t);
  var u = t.__c;
  if (u && u.__H) try {
    u.__H.__.forEach(g);
  } catch (t) {
    _preact.options.__e(t, u.__v);
  }
};
var b = "function" == typeof requestAnimationFrame;

function g(n) {
  var t = u;
  "function" == typeof n.__c && n.__c(), u = t;
}

function j(n) {
  var t = u;
  n.__c = n.__(), u = t;
}

function k(n, t) {
  return !n || n.length !== t.length || t.some(function (t, u) {
    return t !== n[u];
  });
}

function w(n, t) {
  return "function" == typeof t ? t(n) : t;
}

},{"preact":5}],7:[function(require,module,exports){
"use strict";

var _preact = require("htm/preact");

function Button(props) {
  return (0, _preact.html)`<span class="form-stuff">
        ${props.isSpinning ? (0, _preact.html)`<button ...${props} class=${props.class || '' + ' spinning'}
                disabled=${true}
            >
                <span class="btn-content">${props.children}</span>
            </button>` : (0, _preact.html)`<div >
                <button ...${props}>
                    ${props.children}
                </button>
            </div>`}
        </span>`;
}

module.exports = Button;

},{"htm/preact":4}],8:[function(require,module,exports){
"use strict";

var _preact = require("htm/preact");

var _hooks = require("preact/hooks");

var PencilButton = require('./pencil-button');

function EditableField(props) {
  var {
    value,
    onSave,
    name
  } = props;
  var [isEditing, setEditing] = (0, _hooks.useState)(false);
  var [isResolving, setResolving] = (0, _hooks.useState)(false);

  function _setEditing(ev) {
    ev.preventDefault();
    setEditing(true);
  }

  function stopEditing(ev) {
    ev.preventDefault();
    setEditing(false);
  }

  function _onSave(ev) {
    ev.preventDefault();
    var val = ev.target.elements[name].value;
    setResolving(true);
    onSave(val).then(() => {
      setResolving(false);
      setEditing(false);
    }).catch(err => {
      setResolving(false);
      console.log('errrrrr', err);
    });
  }

  var _class = 'editable-field' + (isResolving ? ' resolving' : '') + (props.class ? ' ' + props.class : '');

  if (isEditing) {
    return (0, _preact.html)`<form onreset=${stopEditing}
            onsubmit=${_onSave}
            class=${_class}
        >
            <input name=${name} id=${name} placeholder="${value}" />
            <button type="reset" disabled=${isResolving}>cancel</button>
            <button type="submit" disabled=${isResolving}>save</button>
        </form>`;
  }

  return (0, _preact.html)`
        <span class="field">${value}</span>

        <!-- pencil emoji -->
        <${PencilButton} onClick=${_setEditing} title="edit" />
    `;
}

module.exports = EditableField;

},{"./pencil-button":11,"htm/preact":4,"preact/hooks":6}],9:[function(require,module,exports){
var NumberInput = require('./number-input')
var TextInput = require('./text-input')
var Button = require('./button')
var EditableField = require('./editable-field')
var PencilButton = require('./pencil-button')

module.exports = { TextInput, NumberInput, Button, EditableField,
    PencilButton }

},{"./button":7,"./editable-field":8,"./number-input":10,"./pencil-button":11,"./text-input":12}],10:[function(require,module,exports){
"use strict";

var _preact = require("htm/preact");

function NumberInput(props) {
  var {
    name,
    min,
    max,
    onChange,
    value,
    onIncrease,
    onDecrease
  } = props;
  return (0, _preact.html)`<div class="form-stuff">
        <div class="input-group-number">
            <input type="number" inputmode="numeric"
                pattern="[0-9]*"
                max="${max}"
                min=${min}
                onchange=${onChange}
                value=${value}
                name=${name}
            />
            <div class="number-nav">
                <div class="number-button number-up">
                    <button onclick="${ev => {
    ev.preventDefault();
    onIncrease(ev);
  }}">+</button>
                </div>

                <div class="number-button number-down">
                    <button onclick="${ev => {
    ev.preventDefault();
    onDecrease(ev);
  }}">-</button>
                </div>
            </div>
        </div>
    </div>`;
}

module.exports = NumberInput;

},{"htm/preact":4}],11:[function(require,module,exports){
"use strict";

var _preact = require("htm/preact");

var createPencil = require('../create-pencil-button');

module.exports = createPencil(_preact.html);

},{"../create-pencil-button":1,"htm/preact":4}],12:[function(require,module,exports){
"use strict";

var _preact = require("htm/preact");

function TextInput(props) {
  var {
    name,
    displayName
  } = props;
  var _props = { ...props
  };
  delete _props.displayName;
  return (0, _preact.html)`<div className="form-stuff">
        <div className="input-group ${name}">
            <input ...${_props} name="${name}" type="text" placeholder=" "
                required=${props.required} minLength=${props.minlength || props.minLength}
                maxLength=${props.maxlength || props.maxLength}
                id="${name}"
            />
            <label htmlFor=${name}>${displayName}</label>
        </div>
    </div>`;
}

module.exports = TextInput;

},{"htm/preact":4}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjcmVhdGUtcGVuY2lsLWJ1dHRvbi5qcyIsImRvY3MvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9odG0vcHJlYWN0L2luZGV4Lm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NvbnN0YW50cy5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL29wdGlvbnMuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9jcmVhdGUtZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NvbXBvbmVudC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NyZWF0ZS1jb250ZXh0LmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2RpZmYvY2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9kaWZmL3Byb3BzLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9zcmMvZGlmZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL3JlbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2Nsb25lLWVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9kaWZmL2NhdGNoLWVycm9yLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9ob29rcy9zcmMvaW5kZXguanMiLCJwcmVhY3QvYnV0dG9uLmpzIiwicHJlYWN0L2VkaXRhYmxlLWZpZWxkLmpzIiwicHJlYWN0L2luZGV4LmpzIiwicHJlYWN0L251bWJlci1pbnB1dC5qcyIsInByZWFjdC9wZW5jaWwtYnV0dG9uLmpzIiwicHJlYWN0L3RleHQtaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtB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Q0hBOztBQUVBLFNBQVMsU0FBVCxDQUFvQixLQUFwQixFQUEyQjtBQUN2QixNQUFJO0FBQUUsSUFBQSxJQUFGO0FBQVEsSUFBQTtBQUFSLE1BQXdCLEtBQTVCO0FBQ0EsTUFBSSxNQUFNLEdBQUcsRUFBQyxHQUFHO0FBQUosR0FBYjtBQUNBLFNBQU8sTUFBTSxDQUFDLFdBQWQ7QUFFQSxTQUFPLGlCQUFLO0FBQ2hCLHNDQUFzQyxJQUFLO0FBQzNDLHdCQUF3QixNQUFPLFVBQVMsSUFBSztBQUM3QywyQkFBMkIsS0FBSyxDQUFDLFFBQVMsY0FBYSxLQUFLLENBQUMsU0FBTixJQUNuQyxLQUFLLENBQUMsU0FBVTtBQUNwQyw0QkFBNEIsS0FBSyxDQUFDLFNBQU4sSUFBbUIsS0FBSyxDQUFDLFNBQVU7QUFDL0Qsc0JBQXNCLElBQUs7QUFDM0I7QUFDQSw2QkFBNkIsSUFBSyxJQUFHLFdBQVk7QUFDakQ7QUFDQSxXQVZJO0FBV0g7O0FBRUQsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBjcmVhdGVQZW5jaWwgKGh0bWwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gUGVuY2lsQnV0dG9uIChwcm9wcykge1xuICAgICAgICB2YXIgY2wgPSBwcm9wcy5jbGFzcyB8fCBwcm9wcy5jbGFzc05hbWVcbiAgICAgICAgcmV0dXJuIGh0bWxgPGJ1dHRvbiAuLi4ke3Byb3BzfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZWRpdC1wZW5jaWwke2NsID8gKCcgJyArIGNsKSA6ICcnfVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsPVwiZWRpdFwiPlxuICAgICAgICAgICAgICAgIOKcj1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5gXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBlbmNpbFxuIiwidmFyIHsgVGV4dElucHV0LCBOdW1iZXJJbnB1dCwgQnV0dG9uLCBFZGl0YWJsZUZpZWxkLCBQZW5jaWxCdXR0b24gfSA9XG4gICAgcmVxdWlyZSgnLi4vcHJlYWN0JylcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3ByZWFjdC9ob29rcyc7XG5cbmZ1bmN0aW9uIHN1Ym1pdCAoZXYpIHtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc29sZS5sb2coJ3N1Ym1pdCcpXG4gICAgY29uc29sZS5sb2coJ3ZhbHVlJywgZXYudGFyZ2V0LmVsZW1lbnRzWyd0ZXN0LWlucHV0J10udmFsdWUpXG4gICAgY29uc29sZS5sb2coJ3NvbWV0aGluZyBlbHNlJywgZXYudGFyZ2V0LmVsZW1lbnRzWydzb21ldGhpbmcnXS52YWx1ZSlcbn1cblxuZnVuY3Rpb24gQ2xpY2tpbmdEZW1vICgpIHtcbiAgICB2YXIgW3Jlc29sdmluZywgc2V0UmVzb2x2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gICAgZnVuY3Rpb24gZG9Tb21ldGhpbmcgKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgc2V0UmVzb2x2aW5nKHRydWUpXG4gICAgICAgIC8vIDMgc2Vjb25kIGRlbGF5XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0UmVzb2x2aW5nKGZhbHNlKSwgMzAwMClcbiAgICB9XG5cbiAgICAgcmV0dXJuIGh0bWxgPGRpdiBjbGFzcz1cImNsaWNraW5nLWRlbW9cIj5cbiAgICAgICAgPCR7QnV0dG9ufSB0eXBlPVwic3VibWl0XCIgb25DbGljaz0ke2RvU29tZXRoaW5nfSBpc1NwaW5uaW5nPSR7cmVzb2x2aW5nfT5cbiAgICAgICAgICAgIGRvIHNvbWV0aGluZ1xuICAgICAgICA8LyR7QnV0dG9ufT5cbiAgICA8L2Rpdj5gXG59XG5cbmZ1bmN0aW9uIENvdW50ZXIgKHByb3BzKSB7XG4gICAgdmFyIHsgbWluLCBtYXggfSA9IHByb3BzXG4gICAgdmFyIFtjb3VudCwgc2V0Q291bnRdID0gdXNlU3RhdGUoMylcblxuICAgIGZ1bmN0aW9uIGluYyAoKSB7XG4gICAgICAgIGlmICgocGFyc2VJbnQoY291bnQpICsgMSkgPiBtYXgpIHJldHVyblxuICAgICAgICBpZiAoY291bnQgPCBtaW4pIHJldHVybiBzZXRDb3VudChtaW4pXG4gICAgICAgIHNldENvdW50KGNvdW50ICsgMSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWMgKCkge1xuICAgICAgICBpZiAoKHBhcnNlSW50KGNvdW50KSAtIDEpIDwgbWluKSByZXR1cm5cbiAgICAgICAgaWYgKGNvdW50ID4gbWF4KSByZXR1cm4gc2V0Q291bnQobWF4KVxuICAgICAgICBzZXRDb3VudChjb3VudCAtIDEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhbmdlIChldikge1xuICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdlJywgZXYudGFyZ2V0LnZhbHVlKVxuICAgICAgICBzZXRDb3VudChldi50YXJnZXQudmFsdWUpXG4gICAgfVxuXG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICAgIDwke051bWJlcklucHV0fSBtaW49JHsyfSBtYXg9JHs2fSB2YWx1ZT0ke2NvdW50fVxuICAgICAgICAgICAgb25JbmNyZWFzZT0ke2luY30gb25EZWNyZWFzZT0ke2RlY30gb25DaGFuZ2U9JHtjaGFuZ2V9IC8+XG4gICAgYFxufVxuXG5mdW5jdGlvbiBFZGl0aW5nICgpIHtcbiAgICBmdW5jdGlvbiBzYXZlIChuZXdWYWx1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2F2ZScsIG5ld1ZhbHVlKVxuICAgICAgICAvLyB3YWl0IDEgc2Vjb25kXG4gICAgICAgIC8vIHlvdSAqbXVzdCogcmV0dXJuIGEgcHJvbWlzZSBoZXJlO1xuICAgICAgICAvLyAgIGl0IGlzIHVzZWQgYnkgdGhlIGBFZGl0YWJsZUZpZWxkYCBjb21wb25lbnQgdG9cbiAgICAgICAgLy8gICBzZXQgdGhlIHJlc29sdmluZyBzdGF0ZVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKVxuICAgIH1cblxuICAgIHJldHVybiBodG1sYFxuICAgICAgICA8JHtFZGl0YWJsZUZpZWxkfSB2YWx1ZT1cImV4YW1wbGVcIiBvblNhdmU9JHtzYXZlfSBuYW1lPVwiZXhhbXBsZVwiIC8+XG4gICAgYFxufVxuXG5cbmZ1bmN0aW9uIERlbW8gKCkge1xuICAgIHZhciBbZm9ybURlbW9TdGF0ZSwgc2V0Rm9ybVN0YXRlXSA9IHVzZVN0YXRlKHsgaXNSZXNvbHZpbmc6IGZhbHNlIH0pXG5cbiAgICBmdW5jdGlvbiBmb3JtU3VibWl0IChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHNldEZvcm1TdGF0ZSh7IGlzUmVzb2x2aW5nOiB0cnVlIH0pXG4gICAgICAgIHZhciBlbHMgPSBldi50YXJnZXQuZWxlbWVudHNcbiAgICAgICAgY29uc29sZS5sb2coJ2VscycsIGVscylcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzZXRGb3JtU3RhdGUoeyBpc1Jlc29sdmluZzogZmFsc2UgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb25lIHN1Ym1pdHRpbmcnKVxuICAgICAgICB9LCAzMDAwKVxuICAgIH1cblxuICAgIHJldHVybiBodG1sYDxmb3JtIG9uc3VibWl0PSR7c3VibWl0fT5cbiAgICAgICAgPCR7VGV4dElucHV0fSBuYW1lPVwidGVzdC1pbnB1dFwiIGRpc3BsYXlOYW1lPVwidGVzdCBpbnB1dFwiIHZhbHVlPVwiYmFyXCJcbiAgICAgICAgICAgIG1pbmxlbmd0aD1cIjNcIiBtYXhsZW5ndGg9XCI2XCIgcmVxdWlyZWQ9JHt0cnVlfVxuICAgICAgICAvPlxuXG4gICAgICAgIDwke1RleHRJbnB1dH0gbmFtZT1cInNvbWV0aGluZ1wiIGRpc3BsYXlOYW1lPVwic29tZXRoaW5nIGVsc2VcIiB2YWx1ZT1cImZvb1wiXG4gICAgICAgICAgICBtaW5sZW5ndGg9XCIzXCIgbWF4bGVuZ3RoPVwiNlwiIHJlcXVpcmVkPSR7ZmFsc2V9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlclwiPlxuICAgICAgICAgICAgPHA+bWluIDIsIG1heCA2PC9wPlxuICAgICAgICAgICAgPCR7Q291bnRlcn0gbWluPSR7Mn0gbWF4PSR7Nn0gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRpbmdcIj5cbiAgICAgICAgICAgIDwke0VkaXRpbmd9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cbiAgICAgICAgICAgIDwke0NsaWNraW5nRGVtb30gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHRlc3RpbmcgdGhlIHBlbmNpbCBidXR0b25cbiAgICAgICAgICAgIDwke1BlbmNpbEJ1dHRvbn0gb25DbGljaz0ke2V2ID0+IHtcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrJywgZXYpXG4gICAgICAgICAgICB9fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG5cbiAgICA8Zm9ybSBjbGFzcz1cImZvcm0tZGVtb1wiIG9uU3VibWl0PSR7c3VibWl0fT5cbiAgICAgICAgPCR7VGV4dElucHV0fSBuYW1lPVwibW9yZS1zdHVmZlwiIGRpc3BsYXlOYW1lPVwibW9yZSBzdHVmZlwiXG4gICAgICAgICAgICBtaW5sZW5ndGg9XCIzXCIgbWF4bGVuZ3RoPVwiNlwiIHJlcXVpcmVkPSR7ZmFsc2V9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPCR7QnV0dG9ufSB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgIGlzU3Bpbm5pbmc9JHtmb3JtRGVtb1N0YXRlLmlzUmVzb2x2aW5nfVxuICAgICAgICA+XG4gICAgICAgICAgICBTdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgPC8ke0J1dHRvbn0+XG4gICAgPC9kaXY+YFxufVxuXG5yZW5kZXIoaHRtbGA8JHtEZW1vfSAvPmAsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykpO1xuIiwidmFyIG49ZnVuY3Rpb24odCxzLHIsZSl7dmFyIHU7c1swXT0wO2Zvcih2YXIgaD0xO2g8cy5sZW5ndGg7aCsrKXt2YXIgcD1zW2grK10sYT1zW2hdPyhzWzBdfD1wPzE6MixyW3NbaCsrXV0pOnNbKytoXTszPT09cD9lWzBdPWE6ND09PXA/ZVsxXT1PYmplY3QuYXNzaWduKGVbMV18fHt9LGEpOjU9PT1wPyhlWzFdPWVbMV18fHt9KVtzWysraF1dPWE6Nj09PXA/ZVsxXVtzWysraF1dKz1hK1wiXCI6cD8odT10LmFwcGx5KGEsbih0LGEscixbXCJcIixudWxsXSkpLGUucHVzaCh1KSxhWzBdP3NbMF18PTI6KHNbaC0yXT0wLHNbaF09dSkpOmUucHVzaChhKX1yZXR1cm4gZX0sdD1uZXcgTWFwO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHMpe3ZhciByPXQuZ2V0KHRoaXMpO3JldHVybiByfHwocj1uZXcgTWFwLHQuc2V0KHRoaXMscikpLChyPW4odGhpcyxyLmdldChzKXx8KHIuc2V0KHMscj1mdW5jdGlvbihuKXtmb3IodmFyIHQscyxyPTEsZT1cIlwiLHU9XCJcIixoPVswXSxwPWZ1bmN0aW9uKG4pezE9PT1yJiYobnx8KGU9ZS5yZXBsYWNlKC9eXFxzKlxcblxccyp8XFxzKlxcblxccyokL2csXCJcIikpKT9oLnB1c2goMCxuLGUpOjM9PT1yJiYobnx8ZSk/KGgucHVzaCgzLG4sZSkscj0yKToyPT09ciYmXCIuLi5cIj09PWUmJm4/aC5wdXNoKDQsbiwwKToyPT09ciYmZSYmIW4/aC5wdXNoKDUsMCwhMCxlKTpyPj01JiYoKGV8fCFuJiY1PT09cikmJihoLnB1c2gociwwLGUscykscj02KSxuJiYoaC5wdXNoKHIsbiwwLHMpLHI9NikpLGU9XCJcIn0sYT0wO2E8bi5sZW5ndGg7YSsrKXthJiYoMT09PXImJnAoKSxwKGEpKTtmb3IodmFyIGw9MDtsPG5bYV0ubGVuZ3RoO2wrKyl0PW5bYV1bbF0sMT09PXI/XCI8XCI9PT10PyhwKCksaD1baF0scj0zKTplKz10OjQ9PT1yP1wiLS1cIj09PWUmJlwiPlwiPT09dD8ocj0xLGU9XCJcIik6ZT10K2VbMF06dT90PT09dT91PVwiXCI6ZSs9dDonXCInPT09dHx8XCInXCI9PT10P3U9dDpcIj5cIj09PXQ/KHAoKSxyPTEpOnImJihcIj1cIj09PXQ/KHI9NSxzPWUsZT1cIlwiKTpcIi9cIj09PXQmJihyPDV8fFwiPlwiPT09blthXVtsKzFdKT8ocCgpLDM9PT1yJiYoaD1oWzBdKSxyPWgsKGg9aFswXSkucHVzaCgyLDAscikscj0wKTpcIiBcIj09PXR8fFwiXFx0XCI9PT10fHxcIlxcblwiPT09dHx8XCJcXHJcIj09PXQ/KHAoKSxyPTIpOmUrPXQpLDM9PT1yJiZcIiEtLVwiPT09ZSYmKHI9NCxoPWhbMF0pfXJldHVybiBwKCksaH0ocykpLHIpLGFyZ3VtZW50cyxbXSkpLmxlbmd0aD4xP3I6clswXX1cbiIsImltcG9ydHtoIGFzIHIsQ29tcG9uZW50IGFzIG8scmVuZGVyIGFzIHR9ZnJvbVwicHJlYWN0XCI7ZXhwb3J0e2gscmVuZGVyLENvbXBvbmVudH1mcm9tXCJwcmVhY3RcIjtpbXBvcnQgZSBmcm9tXCJodG1cIjt2YXIgbT1lLmJpbmQocik7ZXhwb3J0e20gYXMgaHRtbH07XG4iLCJleHBvcnQgY29uc3QgRU1QVFlfT0JKID0ge307XG5leHBvcnQgY29uc3QgRU1QVFlfQVJSID0gW107XG5leHBvcnQgY29uc3QgSVNfTk9OX0RJTUVOU0lPTkFMID0gL2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxncmlkfG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmR8aXRlcmEvaTtcbiIsImltcG9ydCB7IF9jYXRjaEVycm9yIH0gZnJvbSAnLi9kaWZmL2NhdGNoLWVycm9yJztcblxuLyoqXG4gKiBUaGUgYG9wdGlvbmAgb2JqZWN0IGNhbiBwb3RlbnRpYWxseSBjb250YWluIGNhbGxiYWNrIGZ1bmN0aW9uc1xuICogdGhhdCBhcmUgY2FsbGVkIGR1cmluZyB2YXJpb3VzIHN0YWdlcyBvZiBvdXIgcmVuZGVyZXIuIFRoaXMgaXMgdGhlXG4gKiBmb3VuZGF0aW9uIG9uIHdoaWNoIGFsbCBvdXIgYWRkb25zIGxpa2UgYHByZWFjdC9kZWJ1Z2AsIGBwcmVhY3QvY29tcGF0YCxcbiAqIGFuZCBgcHJlYWN0L2hvb2tzYCBhcmUgYmFzZWQgb24uIFNlZSB0aGUgYE9wdGlvbnNgIHR5cGUgaW4gYGludGVybmFsLmQudHNgXG4gKiBmb3IgYSBmdWxsIGxpc3Qgb2YgYXZhaWxhYmxlIG9wdGlvbiBob29rcyAobW9zdCBlZGl0b3JzL0lERXMgYWxsb3cgeW91IHRvXG4gKiBjdHJsK2NsaWNrIG9yIGNtZCtjbGljayBvbiBtYWMgdGhlIHR5cGUgZGVmaW5pdGlvbiBiZWxvdykuXG4gKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuT3B0aW9uc31cbiAqL1xuY29uc3Qgb3B0aW9ucyA9IHtcblx0X2NhdGNoRXJyb3IsXG5cdF92bm9kZUlkOiAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBvcHRpb25zO1xuIiwiaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gdmlydHVhbCBub2RlICh1c2VkIGZvciBKU1gpXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlW1widHlwZVwiXX0gdHlwZSBUaGUgbm9kZSBuYW1lIG9yIENvbXBvbmVudFxuICogY29uc3RydWN0b3IgZm9yIHRoaXMgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge29iamVjdCB8IG51bGwgfCB1bmRlZmluZWR9IFtwcm9wc10gVGhlIHByb3BlcnRpZXMgb2YgdGhlIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4nKS5Db21wb25lbnRDaGlsZHJlbj59IFtjaGlsZHJlbl0gVGhlIGNoaWxkcmVuIG9mIHRoZSB2aXJ0dWFsIG5vZGVcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG5cdGxldCBub3JtYWxpemVkUHJvcHMgPSB7fSxcblx0XHRrZXksXG5cdFx0cmVmLFxuXHRcdGk7XG5cdGZvciAoaSBpbiBwcm9wcykge1xuXHRcdGlmIChpID09ICdrZXknKSBrZXkgPSBwcm9wc1tpXTtcblx0XHRlbHNlIGlmIChpID09ICdyZWYnKSByZWYgPSBwcm9wc1tpXTtcblx0XHRlbHNlIG5vcm1hbGl6ZWRQcm9wc1tpXSA9IHByb3BzW2ldO1xuXHR9XG5cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG5cdFx0Y2hpbGRyZW4gPSBbY2hpbGRyZW5dO1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wcmVhY3Rqcy9wcmVhY3QvaXNzdWVzLzE5MTZcblx0XHRmb3IgKGkgPSAzOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjaGlsZHJlbi5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0fVxuXHR9XG5cdGlmIChjaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0bm9ybWFsaXplZFByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG5cdH1cblxuXHQvLyBJZiBhIENvbXBvbmVudCBWTm9kZSwgY2hlY2sgZm9yIGFuZCBhcHBseSBkZWZhdWx0UHJvcHNcblx0Ly8gTm90ZTogdHlwZSBtYXkgYmUgdW5kZWZpbmVkIGluIGRldmVsb3BtZW50LCBtdXN0IG5ldmVyIGVycm9yIGhlcmUuXG5cdGlmICh0eXBlb2YgdHlwZSA9PSAnZnVuY3Rpb24nICYmIHR5cGUuZGVmYXVsdFByb3BzICE9IG51bGwpIHtcblx0XHRmb3IgKGkgaW4gdHlwZS5kZWZhdWx0UHJvcHMpIHtcblx0XHRcdGlmIChub3JtYWxpemVkUHJvcHNbaV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRub3JtYWxpemVkUHJvcHNbaV0gPSB0eXBlLmRlZmF1bHRQcm9wc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3JlYXRlVk5vZGUodHlwZSwgbm9ybWFsaXplZFByb3BzLCBrZXksIHJlZiwgbnVsbCk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgVk5vZGUgKHVzZWQgaW50ZXJuYWxseSBieSBQcmVhY3QpXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlW1widHlwZVwiXX0gdHlwZSBUaGUgbm9kZSBuYW1lIG9yIENvbXBvbmVudFxuICogQ29uc3RydWN0b3IgZm9yIHRoaXMgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge29iamVjdCB8IHN0cmluZyB8IG51bWJlciB8IG51bGx9IHByb3BzIFRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMgdmlydHVhbCBub2RlLlxuICogSWYgdGhpcyB2aXJ0dWFsIG5vZGUgcmVwcmVzZW50cyBhIHRleHQgbm9kZSwgdGhpcyBpcyB0aGUgdGV4dCBvZiB0aGUgbm9kZSAoc3RyaW5nIG9yIG51bWJlcikuXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlciB8IG51bGx9IGtleSBUaGUga2V5IGZvciB0aGlzIHZpcnR1YWwgbm9kZSwgdXNlZCB3aGVuXG4gKiBkaWZmaW5nIGl0IGFnYWluc3QgaXRzIGNoaWxkcmVuXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlW1wicmVmXCJdfSByZWYgVGhlIHJlZiBwcm9wZXJ0eSB0aGF0IHdpbGxcbiAqIHJlY2VpdmUgYSByZWZlcmVuY2UgdG8gaXRzIGNyZWF0ZWQgY2hpbGRcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZOb2RlKHR5cGUsIHByb3BzLCBrZXksIHJlZiwgb3JpZ2luYWwpIHtcblx0Ly8gVjggc2VlbXMgdG8gYmUgYmV0dGVyIGF0IGRldGVjdGluZyB0eXBlIHNoYXBlcyBpZiB0aGUgb2JqZWN0IGlzIGFsbG9jYXRlZCBmcm9tIHRoZSBzYW1lIGNhbGwgc2l0ZVxuXHQvLyBEbyBub3QgaW5saW5lIGludG8gY3JlYXRlRWxlbWVudCBhbmQgY29lcmNlVG9WTm9kZSFcblx0Y29uc3Qgdm5vZGUgPSB7XG5cdFx0dHlwZSxcblx0XHRwcm9wcyxcblx0XHRrZXksXG5cdFx0cmVmLFxuXHRcdF9jaGlsZHJlbjogbnVsbCxcblx0XHRfcGFyZW50OiBudWxsLFxuXHRcdF9kZXB0aDogMCxcblx0XHRfZG9tOiBudWxsLFxuXHRcdC8vIF9uZXh0RG9tIG11c3QgYmUgaW5pdGlhbGl6ZWQgdG8gdW5kZWZpbmVkIGIvYyBpdCB3aWxsIGV2ZW50dWFsbHlcblx0XHQvLyBiZSBzZXQgdG8gZG9tLm5leHRTaWJsaW5nIHdoaWNoIGNhbiByZXR1cm4gYG51bGxgIGFuZCBpdCBpcyBpbXBvcnRhbnRcblx0XHQvLyB0byBiZSBhYmxlIHRvIGRpc3Rpbmd1aXNoIGJldHdlZW4gYW4gdW5pbml0aWFsaXplZCBfbmV4dERvbSBhbmRcblx0XHQvLyBhIF9uZXh0RG9tIHRoYXQgaGFzIGJlZW4gc2V0IHRvIGBudWxsYFxuXHRcdF9uZXh0RG9tOiB1bmRlZmluZWQsXG5cdFx0X2NvbXBvbmVudDogbnVsbCxcblx0XHRfaHlkcmF0aW5nOiBudWxsLFxuXHRcdGNvbnN0cnVjdG9yOiB1bmRlZmluZWQsXG5cdFx0X29yaWdpbmFsOiBvcmlnaW5hbCA9PSBudWxsID8gKytvcHRpb25zLl92bm9kZUlkIDogb3JpZ2luYWxcblx0fTtcblxuXHRpZiAob3B0aW9ucy52bm9kZSAhPSBudWxsKSBvcHRpb25zLnZub2RlKHZub2RlKTtcblxuXHRyZXR1cm4gdm5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWYoKSB7XG5cdHJldHVybiB7IGN1cnJlbnQ6IG51bGwgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYWdtZW50KHByb3BzKSB7XG5cdHJldHVybiBwcm9wcy5jaGlsZHJlbjtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHRoZSBhcmd1bWVudCBpcyBhIHZhbGlkIFByZWFjdCBWTm9kZS5cbiAqIEBwYXJhbSB7Kn0gdm5vZGVcbiAqIEByZXR1cm5zIHt2bm9kZSBpcyBpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGlzVmFsaWRFbGVtZW50ID0gdm5vZGUgPT5cblx0dm5vZGUgIT0gbnVsbCAmJiB2bm9kZS5jb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkO1xuIiwiaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IGRpZmYsIGNvbW1pdFJvb3QgfSBmcm9tICcuL2RpZmYvaW5kZXgnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCB7IEZyYWdtZW50IH0gZnJvbSAnLi9jcmVhdGUtZWxlbWVudCc7XG5cbi8qKlxuICogQmFzZSBDb21wb25lbnQgY2xhc3MuIFByb3ZpZGVzIGBzZXRTdGF0ZSgpYCBhbmQgYGZvcmNlVXBkYXRlKClgLCB3aGljaFxuICogdHJpZ2dlciByZW5kZXJpbmdcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBUaGUgaW5pdGlhbCBjb21wb25lbnQgcHJvcHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFRoZSBpbml0aWFsIGNvbnRleHQgZnJvbSBwYXJlbnQgY29tcG9uZW50cydcbiAqIGdldENoaWxkQ29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0KSB7XG5cdHRoaXMucHJvcHMgPSBwcm9wcztcblx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcbn1cblxuLyoqXG4gKiBVcGRhdGUgY29tcG9uZW50IHN0YXRlIGFuZCBzY2hlZHVsZSBhIHJlLXJlbmRlci5cbiAqIEB0aGlzIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9XG4gKiBAcGFyYW0ge29iamVjdCB8ICgoczogb2JqZWN0LCBwOiBvYmplY3QpID0+IG9iamVjdCl9IHVwZGF0ZSBBIGhhc2ggb2Ygc3RhdGVcbiAqIHByb3BlcnRpZXMgdG8gdXBkYXRlIHdpdGggbmV3IHZhbHVlcyBvciBhIGZ1bmN0aW9uIHRoYXQgZ2l2ZW4gdGhlIGN1cnJlbnRcbiAqIHN0YXRlIGFuZCBwcm9wcyByZXR1cm5zIGEgbmV3IHBhcnRpYWwgc3RhdGVcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gW2NhbGxiYWNrXSBBIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbmNlIGNvbXBvbmVudCBzdGF0ZSBpc1xuICogdXBkYXRlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24odXBkYXRlLCBjYWxsYmFjaykge1xuXHQvLyBvbmx5IGNsb25lIHN0YXRlIHdoZW4gY29weWluZyB0byBuZXh0U3RhdGUgdGhlIGZpcnN0IHRpbWUuXG5cdGxldCBzO1xuXHRpZiAodGhpcy5fbmV4dFN0YXRlICE9IG51bGwgJiYgdGhpcy5fbmV4dFN0YXRlICE9PSB0aGlzLnN0YXRlKSB7XG5cdFx0cyA9IHRoaXMuX25leHRTdGF0ZTtcblx0fSBlbHNlIHtcblx0XHRzID0gdGhpcy5fbmV4dFN0YXRlID0gYXNzaWduKHt9LCB0aGlzLnN0YXRlKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgdXBkYXRlID09ICdmdW5jdGlvbicpIHtcblx0XHQvLyBTb21lIGxpYnJhcmllcyBsaWtlIGBpbW1lcmAgbWFyayB0aGUgY3VycmVudCBzdGF0ZSBhcyByZWFkb25seSxcblx0XHQvLyBwcmV2ZW50aW5nIHVzIGZyb20gbXV0YXRpbmcgaXQsIHNvIHdlIG5lZWQgdG8gY2xvbmUgaXQuIFNlZSAjMjcxNlxuXHRcdHVwZGF0ZSA9IHVwZGF0ZShhc3NpZ24oe30sIHMpLCB0aGlzLnByb3BzKTtcblx0fVxuXG5cdGlmICh1cGRhdGUpIHtcblx0XHRhc3NpZ24ocywgdXBkYXRlKTtcblx0fVxuXG5cdC8vIFNraXAgdXBkYXRlIGlmIHVwZGF0ZXIgZnVuY3Rpb24gcmV0dXJuZWQgbnVsbFxuXHRpZiAodXBkYXRlID09IG51bGwpIHJldHVybjtcblxuXHRpZiAodGhpcy5fdm5vZGUpIHtcblx0XHRpZiAoY2FsbGJhY2spIHRoaXMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcblx0XHRlbnF1ZXVlUmVuZGVyKHRoaXMpO1xuXHR9XG59O1xuXG4vKipcbiAqIEltbWVkaWF0ZWx5IHBlcmZvcm0gYSBzeW5jaHJvbm91cyByZS1yZW5kZXIgb2YgdGhlIGNvbXBvbmVudFxuICogQHRoaXMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH1cbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gW2NhbGxiYWNrXSBBIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhZnRlciBjb21wb25lbnQgaXNcbiAqIHJlLXJlbmRlcmVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRpZiAodGhpcy5fdm5vZGUpIHtcblx0XHQvLyBTZXQgcmVuZGVyIG1vZGUgc28gdGhhdCB3ZSBjYW4gZGlmZmVyZW50aWF0ZSB3aGVyZSB0aGUgcmVuZGVyIHJlcXVlc3Rcblx0XHQvLyBpcyBjb21pbmcgZnJvbS4gV2UgbmVlZCB0aGlzIGJlY2F1c2UgZm9yY2VVcGRhdGUgc2hvdWxkIG5ldmVyIGNhbGxcblx0XHQvLyBzaG91bGRDb21wb25lbnRVcGRhdGVcblx0XHR0aGlzLl9mb3JjZSA9IHRydWU7XG5cdFx0aWYgKGNhbGxiYWNrKSB0aGlzLl9yZW5kZXJDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG5cdFx0ZW5xdWV1ZVJlbmRlcih0aGlzKTtcblx0fVxufTtcblxuLyoqXG4gKiBBY2NlcHRzIGBwcm9wc2AgYW5kIGBzdGF0ZWAsIGFuZCByZXR1cm5zIGEgbmV3IFZpcnR1YWwgRE9NIHRyZWUgdG8gYnVpbGQuXG4gKiBWaXJ0dWFsIERPTSBpcyBnZW5lcmFsbHkgY29uc3RydWN0ZWQgdmlhIFtKU1hdKGh0dHA6Ly9qYXNvbmZvcm1hdC5jb20vd3RmLWlzLWpzeCkuXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgUHJvcHMgKGVnOiBKU1ggYXR0cmlidXRlcykgcmVjZWl2ZWQgZnJvbSBwYXJlbnRcbiAqIGVsZW1lbnQvY29tcG9uZW50XG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGUgVGhlIGNvbXBvbmVudCdzIGN1cnJlbnQgc3RhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IENvbnRleHQgb2JqZWN0LCBhcyByZXR1cm5lZCBieSB0aGUgbmVhcmVzdFxuICogYW5jZXN0b3IncyBgZ2V0Q2hpbGRDb250ZXh0KClgXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL2luZGV4JykuQ29tcG9uZW50Q2hpbGRyZW4gfCB2b2lkfVxuICovXG5Db21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IEZyYWdtZW50O1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9IHZub2RlXG4gKiBAcGFyYW0ge251bWJlciB8IG51bGx9IFtjaGlsZEluZGV4XVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RG9tU2libGluZyh2bm9kZSwgY2hpbGRJbmRleCkge1xuXHRpZiAoY2hpbGRJbmRleCA9PSBudWxsKSB7XG5cdFx0Ly8gVXNlIGNoaWxkSW5kZXg9PW51bGwgYXMgYSBzaWduYWwgdG8gcmVzdW1lIHRoZSBzZWFyY2ggZnJvbSB0aGUgdm5vZGUncyBzaWJsaW5nXG5cdFx0cmV0dXJuIHZub2RlLl9wYXJlbnRcblx0XHRcdD8gZ2V0RG9tU2libGluZyh2bm9kZS5fcGFyZW50LCB2bm9kZS5fcGFyZW50Ll9jaGlsZHJlbi5pbmRleE9mKHZub2RlKSArIDEpXG5cdFx0XHQ6IG51bGw7XG5cdH1cblxuXHRsZXQgc2libGluZztcblx0Zm9yICg7IGNoaWxkSW5kZXggPCB2bm9kZS5fY2hpbGRyZW4ubGVuZ3RoOyBjaGlsZEluZGV4KyspIHtcblx0XHRzaWJsaW5nID0gdm5vZGUuX2NoaWxkcmVuW2NoaWxkSW5kZXhdO1xuXG5cdFx0aWYgKHNpYmxpbmcgIT0gbnVsbCAmJiBzaWJsaW5nLl9kb20gIT0gbnVsbCkge1xuXHRcdFx0Ly8gU2luY2UgdXBkYXRlUGFyZW50RG9tUG9pbnRlcnMga2VlcHMgX2RvbSBwb2ludGVyIGNvcnJlY3QsXG5cdFx0XHQvLyB3ZSBjYW4gcmVseSBvbiBfZG9tIHRvIHRlbGwgdXMgaWYgdGhpcyBzdWJ0cmVlIGNvbnRhaW5zIGFcblx0XHRcdC8vIHJlbmRlcmVkIERPTSBub2RlLCBhbmQgd2hhdCB0aGUgZmlyc3QgcmVuZGVyZWQgRE9NIG5vZGUgaXNcblx0XHRcdHJldHVybiBzaWJsaW5nLl9kb207XG5cdFx0fVxuXHR9XG5cblx0Ly8gSWYgd2UgZ2V0IGhlcmUsIHdlIGhhdmUgbm90IGZvdW5kIGEgRE9NIG5vZGUgaW4gdGhpcyB2bm9kZSdzIGNoaWxkcmVuLlxuXHQvLyBXZSBtdXN0IHJlc3VtZSBmcm9tIHRoaXMgdm5vZGUncyBzaWJsaW5nIChpbiBpdCdzIHBhcmVudCBfY2hpbGRyZW4gYXJyYXkpXG5cdC8vIE9ubHkgY2xpbWIgdXAgYW5kIHNlYXJjaCB0aGUgcGFyZW50IGlmIHdlIGFyZW4ndCBzZWFyY2hpbmcgdGhyb3VnaCBhIERPTVxuXHQvLyBWTm9kZSAobWVhbmluZyB3ZSByZWFjaGVkIHRoZSBET00gcGFyZW50IG9mIHRoZSBvcmlnaW5hbCB2bm9kZSB0aGF0IGJlZ2FuXG5cdC8vIHRoZSBzZWFyY2gpXG5cdHJldHVybiB0eXBlb2Ygdm5vZGUudHlwZSA9PSAnZnVuY3Rpb24nID8gZ2V0RG9tU2libGluZyh2bm9kZSkgOiBudWxsO1xufVxuXG4vKipcbiAqIFRyaWdnZXIgaW4tcGxhY2UgcmUtcmVuZGVyaW5nIG9mIGEgY29tcG9uZW50LlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9IGNvbXBvbmVudCBUaGUgY29tcG9uZW50IHRvIHJlcmVuZGVyXG4gKi9cbmZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQpIHtcblx0bGV0IHZub2RlID0gY29tcG9uZW50Ll92bm9kZSxcblx0XHRvbGREb20gPSB2bm9kZS5fZG9tLFxuXHRcdHBhcmVudERvbSA9IGNvbXBvbmVudC5fcGFyZW50RG9tO1xuXG5cdGlmIChwYXJlbnREb20pIHtcblx0XHRsZXQgY29tbWl0UXVldWUgPSBbXTtcblx0XHRjb25zdCBvbGRWTm9kZSA9IGFzc2lnbih7fSwgdm5vZGUpO1xuXHRcdG9sZFZOb2RlLl9vcmlnaW5hbCA9IHZub2RlLl9vcmlnaW5hbCArIDE7XG5cblx0XHRkaWZmKFxuXHRcdFx0cGFyZW50RG9tLFxuXHRcdFx0dm5vZGUsXG5cdFx0XHRvbGRWTm9kZSxcblx0XHRcdGNvbXBvbmVudC5fZ2xvYmFsQ29udGV4dCxcblx0XHRcdHBhcmVudERvbS5vd25lclNWR0VsZW1lbnQgIT09IHVuZGVmaW5lZCxcblx0XHRcdHZub2RlLl9oeWRyYXRpbmcgIT0gbnVsbCA/IFtvbGREb21dIDogbnVsbCxcblx0XHRcdGNvbW1pdFF1ZXVlLFxuXHRcdFx0b2xkRG9tID09IG51bGwgPyBnZXREb21TaWJsaW5nKHZub2RlKSA6IG9sZERvbSxcblx0XHRcdHZub2RlLl9oeWRyYXRpbmdcblx0XHQpO1xuXHRcdGNvbW1pdFJvb3QoY29tbWl0UXVldWUsIHZub2RlKTtcblxuXHRcdGlmICh2bm9kZS5fZG9tICE9IG9sZERvbSkge1xuXHRcdFx0dXBkYXRlUGFyZW50RG9tUG9pbnRlcnModm5vZGUpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9IHZub2RlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBhcmVudERvbVBvaW50ZXJzKHZub2RlKSB7XG5cdGlmICgodm5vZGUgPSB2bm9kZS5fcGFyZW50KSAhPSBudWxsICYmIHZub2RlLl9jb21wb25lbnQgIT0gbnVsbCkge1xuXHRcdHZub2RlLl9kb20gPSB2bm9kZS5fY29tcG9uZW50LmJhc2UgPSBudWxsO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdm5vZGUuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgY2hpbGQgPSB2bm9kZS5fY2hpbGRyZW5baV07XG5cdFx0XHRpZiAoY2hpbGQgIT0gbnVsbCAmJiBjaGlsZC5fZG9tICE9IG51bGwpIHtcblx0XHRcdFx0dm5vZGUuX2RvbSA9IHZub2RlLl9jb21wb25lbnQuYmFzZSA9IGNoaWxkLl9kb207XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB1cGRhdGVQYXJlbnREb21Qb2ludGVycyh2bm9kZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgcmVuZGVyIHF1ZXVlXG4gKiBAdHlwZSB7QXJyYXk8aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50Pn1cbiAqL1xubGV0IHJlcmVuZGVyUXVldWUgPSBbXTtcblxuLyoqXG4gKiBBc3luY2hyb25vdXNseSBzY2hlZHVsZSBhIGNhbGxiYWNrXG4gKiBAdHlwZSB7KGNiOiAoKSA9PiB2b2lkKSA9PiB2b2lkfVxuICovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuLy8gTm90ZSB0aGUgZm9sbG93aW5nIGxpbmUgaXNuJ3QgdHJlZS1zaGFrZW4gYnkgcm9sbHVwIGN1eiBvZiByb2xsdXAvcm9sbHVwIzI1NjZcbmNvbnN0IGRlZmVyID1cblx0dHlwZW9mIFByb21pc2UgPT0gJ2Z1bmN0aW9uJ1xuXHRcdD8gUHJvbWlzZS5wcm90b3R5cGUudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKVxuXHRcdDogc2V0VGltZW91dDtcblxuLypcbiAqIFRoZSB2YWx1ZSBvZiBgQ29tcG9uZW50LmRlYm91bmNlYCBtdXN0IGFzeW5jaHJvbm91c2x5IGludm9rZSB0aGUgcGFzc2VkIGluIGNhbGxiYWNrLiBJdCBpc1xuICogaW1wb3J0YW50IHRoYXQgY29udHJpYnV0b3JzIHRvIFByZWFjdCBjYW4gY29uc2lzdGVudGx5IHJlYXNvbiBhYm91dCB3aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAsIGV0Yy5cbiAqIGRvLCBhbmQgd2hlbiB0aGVpciBlZmZlY3RzIHdpbGwgYmUgYXBwbGllZC4gU2VlIHRoZSBsaW5rcyBiZWxvdyBmb3Igc29tZSBmdXJ0aGVyIHJlYWRpbmcgb24gZGVzaWduaW5nXG4gKiBhc3luY2hyb25vdXMgQVBJcy5cbiAqICogW0Rlc2lnbmluZyBBUElzIGZvciBBc3luY2hyb255XShodHRwczovL2Jsb2cuaXpzLm1lLzIwMTMvMDgvZGVzaWduaW5nLWFwaXMtZm9yLWFzeW5jaHJvbnkpXG4gKiAqIFtDYWxsYmFja3Mgc3luY2hyb25vdXMgYW5kIGFzeW5jaHJvbm91c10oaHR0cHM6Ly9ibG9nLm9tZXRlci5jb20vMjAxMS8wNy8yNC9jYWxsYmFja3Mtc3luY2hyb25vdXMtYW5kLWFzeW5jaHJvbm91cy8pXG4gKi9cblxubGV0IHByZXZEZWJvdW5jZTtcblxuLyoqXG4gKiBFbnF1ZXVlIGEgcmVyZW5kZXIgb2YgYSBjb21wb25lbnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fSBjIFRoZSBjb21wb25lbnQgdG8gcmVyZW5kZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVucXVldWVSZW5kZXIoYykge1xuXHRpZiAoXG5cdFx0KCFjLl9kaXJ0eSAmJlxuXHRcdFx0KGMuX2RpcnR5ID0gdHJ1ZSkgJiZcblx0XHRcdHJlcmVuZGVyUXVldWUucHVzaChjKSAmJlxuXHRcdFx0IXByb2Nlc3MuX3JlcmVuZGVyQ291bnQrKykgfHxcblx0XHRwcmV2RGVib3VuY2UgIT09IG9wdGlvbnMuZGVib3VuY2VSZW5kZXJpbmdcblx0KSB7XG5cdFx0cHJldkRlYm91bmNlID0gb3B0aW9ucy5kZWJvdW5jZVJlbmRlcmluZztcblx0XHQocHJldkRlYm91bmNlIHx8IGRlZmVyKShwcm9jZXNzKTtcblx0fVxufVxuXG4vKiogRmx1c2ggdGhlIHJlbmRlciBxdWV1ZSBieSByZXJlbmRlcmluZyBhbGwgcXVldWVkIGNvbXBvbmVudHMgKi9cbmZ1bmN0aW9uIHByb2Nlc3MoKSB7XG5cdGxldCBxdWV1ZTtcblx0d2hpbGUgKChwcm9jZXNzLl9yZXJlbmRlckNvdW50ID0gcmVyZW5kZXJRdWV1ZS5sZW5ndGgpKSB7XG5cdFx0cXVldWUgPSByZXJlbmRlclF1ZXVlLnNvcnQoKGEsIGIpID0+IGEuX3Zub2RlLl9kZXB0aCAtIGIuX3Zub2RlLl9kZXB0aCk7XG5cdFx0cmVyZW5kZXJRdWV1ZSA9IFtdO1xuXHRcdC8vIERvbid0IHVwZGF0ZSBgcmVuZGVyQ291bnRgIHlldC4gS2VlcCBpdHMgdmFsdWUgbm9uLXplcm8gdG8gcHJldmVudCB1bm5lY2Vzc2FyeVxuXHRcdC8vIHByb2Nlc3MoKSBjYWxscyBmcm9tIGdldHRpbmcgc2NoZWR1bGVkIHdoaWxlIGBxdWV1ZWAgaXMgc3RpbGwgYmVpbmcgY29uc3VtZWQuXG5cdFx0cXVldWUuc29tZShjID0+IHtcblx0XHRcdGlmIChjLl9kaXJ0eSkgcmVuZGVyQ29tcG9uZW50KGMpO1xuXHRcdH0pO1xuXHR9XG59XG5wcm9jZXNzLl9yZXJlbmRlckNvdW50ID0gMDtcbiIsImltcG9ydCB7IGVucXVldWVSZW5kZXIgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBsZXQgaSA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250ZXh0KGRlZmF1bHRWYWx1ZSwgY29udGV4dElkKSB7XG5cdGNvbnRleHRJZCA9ICdfX2NDJyArIGkrKztcblxuXHRjb25zdCBjb250ZXh0ID0ge1xuXHRcdF9pZDogY29udGV4dElkLFxuXHRcdF9kZWZhdWx0VmFsdWU6IGRlZmF1bHRWYWx1ZSxcblx0XHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkZ1bmN0aW9uQ29tcG9uZW50fSAqL1xuXHRcdENvbnN1bWVyKHByb3BzLCBjb250ZXh0VmFsdWUpIHtcblx0XHRcdC8vIHJldHVybiBwcm9wcy5jaGlsZHJlbihcblx0XHRcdC8vIFx0Y29udGV4dFtjb250ZXh0SWRdID8gY29udGV4dFtjb250ZXh0SWRdLnByb3BzLnZhbHVlIDogZGVmYXVsdFZhbHVlXG5cdFx0XHQvLyApO1xuXHRcdFx0cmV0dXJuIHByb3BzLmNoaWxkcmVuKGNvbnRleHRWYWx1ZSk7XG5cdFx0fSxcblx0XHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkZ1bmN0aW9uQ29tcG9uZW50fSAqL1xuXHRcdFByb3ZpZGVyKHByb3BzKSB7XG5cdFx0XHRpZiAoIXRoaXMuZ2V0Q2hpbGRDb250ZXh0KSB7XG5cdFx0XHRcdGxldCBzdWJzID0gW107XG5cdFx0XHRcdGxldCBjdHggPSB7fTtcblx0XHRcdFx0Y3R4W2NvbnRleHRJZF0gPSB0aGlzO1xuXG5cdFx0XHRcdHRoaXMuZ2V0Q2hpbGRDb250ZXh0ID0gKCkgPT4gY3R4O1xuXG5cdFx0XHRcdHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24oX3Byb3BzKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMucHJvcHMudmFsdWUgIT09IF9wcm9wcy52YWx1ZSkge1xuXHRcdFx0XHRcdFx0Ly8gSSB0aGluayB0aGUgZm9yY2VkIHZhbHVlIHByb3BhZ2F0aW9uIGhlcmUgd2FzIG9ubHkgbmVlZGVkIHdoZW4gYG9wdGlvbnMuZGVib3VuY2VSZW5kZXJpbmdgIHdhcyBiZWluZyBieXBhc3NlZDpcblx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wcmVhY3Rqcy9wcmVhY3QvY29tbWl0LzRkMzM5ZmI4MDNiZWEwOWU5ZjE5OGFiZjM4Y2ExYmY4ZWE0Yjc3NzEjZGlmZi01NDY4MmNlMzgwOTM1YTcxN2U0MWI4YmZjNTQ3MzdmNlIzNThcblx0XHRcdFx0XHRcdC8vIEluIHRob3NlIGNhc2VzIHRob3VnaCwgZXZlbiB3aXRoIHRoZSB2YWx1ZSBjb3JyZWN0ZWQsIHdlJ3JlIGRvdWJsZS1yZW5kZXJpbmcgYWxsIG5vZGVzLlxuXHRcdFx0XHRcdFx0Ly8gSXQgbWlnaHQgYmUgYmV0dGVyIHRvIGp1c3QgdGVsbCBmb2xrcyBub3QgdG8gdXNlIGZvcmNlLXN5bmMgbW9kZS5cblx0XHRcdFx0XHRcdC8vIEN1cnJlbnRseSwgdXNpbmcgYHVzZUNvbnRleHQoKWAgaW4gYSBjbGFzcyBjb21wb25lbnQgd2lsbCBvdmVyd3JpdGUgaXRzIGB0aGlzLmNvbnRleHRgIHZhbHVlLlxuXHRcdFx0XHRcdFx0Ly8gc3Vicy5zb21lKGMgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gXHRjLmNvbnRleHQgPSBfcHJvcHMudmFsdWU7XG5cdFx0XHRcdFx0XHQvLyBcdGVucXVldWVSZW5kZXIoYyk7XG5cdFx0XHRcdFx0XHQvLyB9KTtcblxuXHRcdFx0XHRcdFx0Ly8gc3Vicy5zb21lKGMgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gXHRjLmNvbnRleHRbY29udGV4dElkXSA9IF9wcm9wcy52YWx1ZTtcblx0XHRcdFx0XHRcdC8vIFx0ZW5xdWV1ZVJlbmRlcihjKTtcblx0XHRcdFx0XHRcdC8vIH0pO1xuXHRcdFx0XHRcdFx0c3Vicy5zb21lKGVucXVldWVSZW5kZXIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHR0aGlzLnN1YiA9IGMgPT4ge1xuXHRcdFx0XHRcdHN1YnMucHVzaChjKTtcblx0XHRcdFx0XHRsZXQgb2xkID0gYy5jb21wb25lbnRXaWxsVW5tb3VudDtcblx0XHRcdFx0XHRjLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gKCkgPT4ge1xuXHRcdFx0XHRcdFx0c3Vicy5zcGxpY2Uoc3Vicy5pbmRleE9mKGMpLCAxKTtcblx0XHRcdFx0XHRcdGlmIChvbGQpIG9sZC5jYWxsKGMpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBwcm9wcy5jaGlsZHJlbjtcblx0XHR9XG5cdH07XG5cblx0Ly8gRGV2dG9vbHMgbmVlZHMgYWNjZXNzIHRvIHRoZSBjb250ZXh0IG9iamVjdCB3aGVuIGl0XG5cdC8vIGVuY291bnRlcnMgYSBQcm92aWRlci4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gc3VwcG9ydFxuXHQvLyBzZXR0aW5nIGBkaXNwbGF5TmFtZWAgb24gdGhlIGNvbnRleHQgb2JqZWN0IGluc3RlYWRcblx0Ly8gb2Ygb24gdGhlIGNvbXBvbmVudCBpdHNlbGYuIFNlZTpcblx0Ly8gaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL2NvbnRleHQuaHRtbCNjb250ZXh0ZGlzcGxheW5hbWVcblxuXHRyZXR1cm4gKGNvbnRleHQuUHJvdmlkZXIuX2NvbnRleHRSZWYgPSBjb250ZXh0LkNvbnN1bWVyLmNvbnRleHRUeXBlID0gY29udGV4dCk7XG59XG4iLCIvKipcbiAqIEFzc2lnbiBwcm9wZXJ0aWVzIGZyb20gYHByb3BzYCB0byBgb2JqYFxuICogQHRlbXBsYXRlIE8sIFAgVGhlIG9iaiBhbmQgcHJvcHMgdHlwZXNcbiAqIEBwYXJhbSB7T30gb2JqIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvXG4gKiBAcGFyYW0ge1B9IHByb3BzIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEByZXR1cm5zIHtPICYgUH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbihvYmosIHByb3BzKSB7XG5cdC8vIEB0cy1pZ25vcmUgV2UgY2hhbmdlIHRoZSB0eXBlIG9mIGBvYmpgIHRvIGJlIGBPICYgUGBcblx0Zm9yIChsZXQgaSBpbiBwcm9wcykgb2JqW2ldID0gcHJvcHNbaV07XG5cdHJldHVybiAvKiogQHR5cGUge08gJiBQfSAqLyAob2JqKTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYSBjaGlsZCBub2RlIGZyb20gaXRzIHBhcmVudCBpZiBhdHRhY2hlZC4gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yXG4gKiBJRTExIHdoaWNoIGRvZXNuJ3Qgc3VwcG9ydCBgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlKClgLiBVc2luZyB0aGlzIGZ1bmN0aW9uXG4gKiBpcyBzbWFsbGVyIHRoYW4gaW5jbHVkaW5nIGEgZGVkaWNhdGVkIHBvbHlmaWxsLlxuICogQHBhcmFtIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG5cdGxldCBwYXJlbnROb2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXHRpZiAocGFyZW50Tm9kZSkgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cbiIsImltcG9ydCB7IGRpZmYsIHVubW91bnQsIGFwcGx5UmVmIH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBjcmVhdGVWTm9kZSwgRnJhZ21lbnQgfSBmcm9tICcuLi9jcmVhdGUtZWxlbWVudCc7XG5pbXBvcnQgeyBFTVBUWV9PQkosIEVNUFRZX0FSUiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXREb21TaWJsaW5nIH0gZnJvbSAnLi4vY29tcG9uZW50JztcblxuLyoqXG4gKiBEaWZmIHRoZSBjaGlsZHJlbiBvZiBhIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gcGFyZW50RG9tIFRoZSBET00gZWxlbWVudCB3aG9zZVxuICogY2hpbGRyZW4gYXJlIGJlaW5nIGRpZmZlZFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuQ29tcG9uZW50Q2hpbGRyZW5bXX0gcmVuZGVyUmVzdWx0XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gbmV3UGFyZW50Vk5vZGUgVGhlIG5ldyB2aXJ0dWFsXG4gKiBub2RlIHdob3NlIGNoaWxkcmVuIHNob3VsZCBiZSBkaWZmJ2VkIGFnYWluc3Qgb2xkUGFyZW50Vk5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBvbGRQYXJlbnRWTm9kZSBUaGUgb2xkIHZpcnR1YWxcbiAqIG5vZGUgd2hvc2UgY2hpbGRyZW4gc2hvdWxkIGJlIGRpZmYnZWQgYWdhaW5zdCBuZXdQYXJlbnRWTm9kZVxuICogQHBhcmFtIHtvYmplY3R9IGdsb2JhbENvbnRleHQgVGhlIGN1cnJlbnQgY29udGV4dCBvYmplY3QgLSBtb2RpZmllZCBieSBnZXRDaGlsZENvbnRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdmcgV2hldGhlciBvciBub3QgdGhpcyBET00gbm9kZSBpcyBhbiBTVkcgbm9kZVxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudD59IGV4Y2Vzc0RvbUNoaWxkcmVuXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fSBjb21taXRRdWV1ZSBMaXN0IG9mIGNvbXBvbmVudHNcbiAqIHdoaWNoIGhhdmUgY2FsbGJhY2tzIHRvIGludm9rZSBpbiBjb21taXRSb290XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBvbGREb20gVGhlIGN1cnJlbnQgYXR0YWNoZWQgRE9NXG4gKiBlbGVtZW50IGFueSBuZXcgZG9tIGVsZW1lbnRzIHNob3VsZCBiZSBwbGFjZWQgYXJvdW5kLiBMaWtlbHkgYG51bGxgIG9uIGZpcnN0XG4gKiByZW5kZXIgKGV4Y2VwdCB3aGVuIGh5ZHJhdGluZykuIENhbiBiZSBhIHNpYmxpbmcgRE9NIGVsZW1lbnQgd2hlbiBkaWZmaW5nXG4gKiBGcmFnbWVudHMgdGhhdCBoYXZlIHNpYmxpbmdzLiBJbiBtb3N0IGNhc2VzLCBpdCBzdGFydHMgb3V0IGFzIGBvbGRDaGlsZHJlblswXS5fZG9tYC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNIeWRyYXRpbmcgV2hldGhlciBvciBub3Qgd2UgYXJlIGluIGh5ZHJhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZkNoaWxkcmVuKFxuXHRwYXJlbnREb20sXG5cdHJlbmRlclJlc3VsdCxcblx0bmV3UGFyZW50Vk5vZGUsXG5cdG9sZFBhcmVudFZOb2RlLFxuXHRnbG9iYWxDb250ZXh0LFxuXHRpc1N2Zyxcblx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdGNvbW1pdFF1ZXVlLFxuXHRvbGREb20sXG5cdGlzSHlkcmF0aW5nXG4pIHtcblx0bGV0IGksIGosIG9sZFZOb2RlLCBjaGlsZFZOb2RlLCBuZXdEb20sIGZpcnN0Q2hpbGREb20sIHJlZnM7XG5cblx0Ly8gVGhpcyBpcyBhIGNvbXByZXNzaW9uIG9mIG9sZFBhcmVudFZOb2RlIT1udWxsICYmIG9sZFBhcmVudFZOb2RlICE9IEVNUFRZX09CSiAmJiBvbGRQYXJlbnRWTm9kZS5fY2hpbGRyZW4gfHwgRU1QVFlfQVJSXG5cdC8vIGFzIEVNUFRZX09CSi5fY2hpbGRyZW4gc2hvdWxkIGJlIGB1bmRlZmluZWRgLlxuXHRsZXQgb2xkQ2hpbGRyZW4gPSAob2xkUGFyZW50Vk5vZGUgJiYgb2xkUGFyZW50Vk5vZGUuX2NoaWxkcmVuKSB8fCBFTVBUWV9BUlI7XG5cblx0bGV0IG9sZENoaWxkcmVuTGVuZ3RoID0gb2xkQ2hpbGRyZW4ubGVuZ3RoO1xuXG5cdG5ld1BhcmVudFZOb2RlLl9jaGlsZHJlbiA9IFtdO1xuXHRmb3IgKGkgPSAwOyBpIDwgcmVuZGVyUmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2hpbGRWTm9kZSA9IHJlbmRlclJlc3VsdFtpXTtcblxuXHRcdGlmIChjaGlsZFZOb2RlID09IG51bGwgfHwgdHlwZW9mIGNoaWxkVk5vZGUgPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gbnVsbDtcblx0XHR9XG5cdFx0Ly8gSWYgdGhpcyBuZXdWTm9kZSBpcyBiZWluZyByZXVzZWQgKGUuZy4gPGRpdj57cmV1c2V9e3JldXNlfTwvZGl2PikgaW4gdGhlIHNhbWUgZGlmZixcblx0XHQvLyBvciB3ZSBhcmUgcmVuZGVyaW5nIGEgY29tcG9uZW50IChlLmcuIHNldFN0YXRlKSBjb3B5IHRoZSBvbGRWTm9kZXMgc28gaXQgY2FuIGhhdmVcblx0XHQvLyBpdCdzIG93biBET00gJiBldGMuIHBvaW50ZXJzXG5cdFx0ZWxzZSBpZiAoXG5cdFx0XHR0eXBlb2YgY2hpbGRWTm9kZSA9PSAnc3RyaW5nJyB8fFxuXHRcdFx0dHlwZW9mIGNoaWxkVk5vZGUgPT0gJ251bWJlcicgfHxcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB2YWxpZC10eXBlb2Zcblx0XHRcdHR5cGVvZiBjaGlsZFZOb2RlID09ICdiaWdpbnQnXG5cdFx0KSB7XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gY3JlYXRlVk5vZGUoXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdGNoaWxkVk5vZGUsXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdGNoaWxkVk5vZGVcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkVk5vZGUpKSB7XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gY3JlYXRlVk5vZGUoXG5cdFx0XHRcdEZyYWdtZW50LFxuXHRcdFx0XHR7IGNoaWxkcmVuOiBjaGlsZFZOb2RlIH0sXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdG51bGxcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChjaGlsZFZOb2RlLl9kZXB0aCA+IDApIHtcblx0XHRcdC8vIFZOb2RlIGlzIGFscmVhZHkgaW4gdXNlLCBjbG9uZSBpdC4gVGhpcyBjYW4gaGFwcGVuIGluIHRoZSBmb2xsb3dpbmdcblx0XHRcdC8vIHNjZW5hcmlvOlxuXHRcdFx0Ly8gICBjb25zdCByZXVzZSA9IDxkaXYgLz5cblx0XHRcdC8vICAgPGRpdj57cmV1c2V9PHNwYW4gLz57cmV1c2V9PC9kaXY+XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gY3JlYXRlVk5vZGUoXG5cdFx0XHRcdGNoaWxkVk5vZGUudHlwZSxcblx0XHRcdFx0Y2hpbGRWTm9kZS5wcm9wcyxcblx0XHRcdFx0Y2hpbGRWTm9kZS5rZXksXG5cdFx0XHRcdG51bGwsXG5cdFx0XHRcdGNoaWxkVk5vZGUuX29yaWdpbmFsXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGlsZFZOb2RlID0gbmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuW2ldID0gY2hpbGRWTm9kZTtcblx0XHR9XG5cblx0XHQvLyBUZXJzZXIgcmVtb3ZlcyB0aGUgYGNvbnRpbnVlYCBoZXJlIGFuZCB3cmFwcyB0aGUgbG9vcCBib2R5XG5cdFx0Ly8gaW4gYSBgaWYgKGNoaWxkVk5vZGUpIHsgLi4uIH0gY29uZGl0aW9uXG5cdFx0aWYgKGNoaWxkVk5vZGUgPT0gbnVsbCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y2hpbGRWTm9kZS5fcGFyZW50ID0gbmV3UGFyZW50Vk5vZGU7XG5cdFx0Y2hpbGRWTm9kZS5fZGVwdGggPSBuZXdQYXJlbnRWTm9kZS5fZGVwdGggKyAxO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgd2UgZmluZCBhIGNvcnJlc3BvbmRpbmcgZWxlbWVudCBpbiBvbGRDaGlsZHJlbi5cblx0XHQvLyBJZiBmb3VuZCwgZGVsZXRlIHRoZSBhcnJheSBpdGVtIGJ5IHNldHRpbmcgdG8gYHVuZGVmaW5lZGAuXG5cdFx0Ly8gV2UgdXNlIGB1bmRlZmluZWRgLCBhcyBgbnVsbGAgaXMgcmVzZXJ2ZWQgZm9yIGVtcHR5IHBsYWNlaG9sZGVyc1xuXHRcdC8vIChob2xlcykuXG5cdFx0b2xkVk5vZGUgPSBvbGRDaGlsZHJlbltpXTtcblxuXHRcdGlmIChcblx0XHRcdG9sZFZOb2RlID09PSBudWxsIHx8XG5cdFx0XHQob2xkVk5vZGUgJiZcblx0XHRcdFx0Y2hpbGRWTm9kZS5rZXkgPT0gb2xkVk5vZGUua2V5ICYmXG5cdFx0XHRcdGNoaWxkVk5vZGUudHlwZSA9PT0gb2xkVk5vZGUudHlwZSlcblx0XHQpIHtcblx0XHRcdG9sZENoaWxkcmVuW2ldID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBFaXRoZXIgb2xkVk5vZGUgPT09IHVuZGVmaW5lZCBvciBvbGRDaGlsZHJlbkxlbmd0aCA+IDAsXG5cdFx0XHQvLyBzbyBhZnRlciB0aGlzIGxvb3Agb2xkVk5vZGUgPT0gbnVsbCBvciBvbGRWTm9kZSBpcyBhIHZhbGlkIHZhbHVlLlxuXHRcdFx0Zm9yIChqID0gMDsgaiA8IG9sZENoaWxkcmVuTGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0b2xkVk5vZGUgPSBvbGRDaGlsZHJlbltqXTtcblx0XHRcdFx0Ly8gSWYgY2hpbGRWTm9kZSBpcyB1bmtleWVkLCB3ZSBvbmx5IG1hdGNoIHNpbWlsYXJseSB1bmtleWVkIG5vZGVzLCBvdGhlcndpc2Ugd2UgbWF0Y2ggYnkga2V5LlxuXHRcdFx0XHQvLyBXZSBhbHdheXMgbWF0Y2ggYnkgdHlwZSAoaW4gZWl0aGVyIGNhc2UpLlxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0b2xkVk5vZGUgJiZcblx0XHRcdFx0XHRjaGlsZFZOb2RlLmtleSA9PSBvbGRWTm9kZS5rZXkgJiZcblx0XHRcdFx0XHRjaGlsZFZOb2RlLnR5cGUgPT09IG9sZFZOb2RlLnR5cGVcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0b2xkQ2hpbGRyZW5bal0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0b2xkVk5vZGUgPSBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG9sZFZOb2RlID0gb2xkVk5vZGUgfHwgRU1QVFlfT0JKO1xuXG5cdFx0Ly8gTW9ycGggdGhlIG9sZCBlbGVtZW50IGludG8gdGhlIG5ldyBvbmUsIGJ1dCBkb24ndCBhcHBlbmQgaXQgdG8gdGhlIGRvbSB5ZXRcblx0XHRkaWZmKFxuXHRcdFx0cGFyZW50RG9tLFxuXHRcdFx0Y2hpbGRWTm9kZSxcblx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0Z2xvYmFsQ29udGV4dCxcblx0XHRcdGlzU3ZnLFxuXHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdFx0XHRjb21taXRRdWV1ZSxcblx0XHRcdG9sZERvbSxcblx0XHRcdGlzSHlkcmF0aW5nXG5cdFx0KTtcblxuXHRcdG5ld0RvbSA9IGNoaWxkVk5vZGUuX2RvbTtcblxuXHRcdGlmICgoaiA9IGNoaWxkVk5vZGUucmVmKSAmJiBvbGRWTm9kZS5yZWYgIT0gaikge1xuXHRcdFx0aWYgKCFyZWZzKSByZWZzID0gW107XG5cdFx0XHRpZiAob2xkVk5vZGUucmVmKSByZWZzLnB1c2gob2xkVk5vZGUucmVmLCBudWxsLCBjaGlsZFZOb2RlKTtcblx0XHRcdHJlZnMucHVzaChqLCBjaGlsZFZOb2RlLl9jb21wb25lbnQgfHwgbmV3RG9tLCBjaGlsZFZOb2RlKTtcblx0XHR9XG5cblx0XHRpZiAobmV3RG9tICE9IG51bGwpIHtcblx0XHRcdGlmIChmaXJzdENoaWxkRG9tID09IG51bGwpIHtcblx0XHRcdFx0Zmlyc3RDaGlsZERvbSA9IG5ld0RvbTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2YgY2hpbGRWTm9kZS50eXBlID09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0Y2hpbGRWTm9kZS5fY2hpbGRyZW4gIT0gbnVsbCAmJiAvLyBDYW4gYmUgbnVsbCBpZiBjaGlsZFZOb2RlIHN1c3BlbmRlZFxuXHRcdFx0XHRjaGlsZFZOb2RlLl9jaGlsZHJlbiA9PT0gb2xkVk5vZGUuX2NoaWxkcmVuXG5cdFx0XHQpIHtcblx0XHRcdFx0Y2hpbGRWTm9kZS5fbmV4dERvbSA9IG9sZERvbSA9IHJlb3JkZXJDaGlsZHJlbihcblx0XHRcdFx0XHRjaGlsZFZOb2RlLFxuXHRcdFx0XHRcdG9sZERvbSxcblx0XHRcdFx0XHRwYXJlbnREb21cblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9sZERvbSA9IHBsYWNlQ2hpbGQoXG5cdFx0XHRcdFx0cGFyZW50RG9tLFxuXHRcdFx0XHRcdGNoaWxkVk5vZGUsXG5cdFx0XHRcdFx0b2xkVk5vZGUsXG5cdFx0XHRcdFx0b2xkQ2hpbGRyZW4sXG5cdFx0XHRcdFx0bmV3RG9tLFxuXHRcdFx0XHRcdG9sZERvbVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCcm93c2VycyB3aWxsIGluZmVyIGFuIG9wdGlvbidzIGB2YWx1ZWAgZnJvbSBgdGV4dENvbnRlbnRgIHdoZW5cblx0XHRcdC8vIG5vIHZhbHVlIGlzIHByZXNlbnQuIFRoaXMgZXNzZW50aWFsbHkgYnlwYXNzZXMgb3VyIGNvZGUgdG8gc2V0IGl0XG5cdFx0XHQvLyBsYXRlciBpbiBgZGlmZigpYC4gSXQgd29ya3MgZmluZSBpbiBhbGwgYnJvd3NlcnMgZXhjZXB0IGZvciBJRTExXG5cdFx0XHQvLyB3aGVyZSBpdCBicmVha3Mgc2V0dGluZyBgc2VsZWN0LnZhbHVlYC4gVGhlcmUgaXQgd2lsbCBiZSBhbHdheXMgc2V0XG5cdFx0XHQvLyB0byBhbiBlbXB0eSBzdHJpbmcuIFJlLWFwcGx5aW5nIGFuIG9wdGlvbnMgdmFsdWUgd2lsbCBmaXggdGhhdCwgc29cblx0XHRcdC8vIHRoZXJlIGFyZSBwcm9iYWJseSBzb21lIGludGVybmFsIGRhdGEgc3RydWN0dXJlcyB0aGF0IGFyZW4ndFxuXHRcdFx0Ly8gdXBkYXRlZCBwcm9wZXJseS5cblx0XHRcdC8vXG5cdFx0XHQvLyBUbyBmaXggaXQgd2UgbWFrZSBzdXJlIHRvIHJlc2V0IHRoZSBpbmZlcnJlZCB2YWx1ZSwgc28gdGhhdCBvdXIgb3duXG5cdFx0XHQvLyB2YWx1ZSBjaGVjayBpbiBgZGlmZigpYCB3b24ndCBiZSBza2lwcGVkLlxuXHRcdFx0aWYgKCFpc0h5ZHJhdGluZyAmJiBuZXdQYXJlbnRWTm9kZS50eXBlID09PSAnb3B0aW9uJykge1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlIFdlIGhhdmUgdmFsaWRhdGVkIHRoYXQgdGhlIHR5cGUgb2YgcGFyZW50RE9NIGlzICdvcHRpb24nXG5cdFx0XHRcdC8vIGluIHRoZSBhYm92ZSBjaGVja1xuXHRcdFx0XHRwYXJlbnREb20udmFsdWUgPSAnJztcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIG5ld1BhcmVudFZOb2RlLnR5cGUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHQvLyBCZWNhdXNlIHRoZSBuZXdQYXJlbnRWTm9kZSBpcyBGcmFnbWVudC1saWtlLCB3ZSBuZWVkIHRvIHNldCBpdCdzXG5cdFx0XHRcdC8vIF9uZXh0RG9tIHByb3BlcnR5IHRvIHRoZSBuZXh0U2libGluZyBvZiBpdHMgbGFzdCBjaGlsZCBET00gbm9kZS5cblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gYG9sZERvbWAgY29udGFpbnMgdGhlIGNvcnJlY3QgdmFsdWUgaGVyZSBiZWNhdXNlIGlmIHRoZSBsYXN0IGNoaWxkXG5cdFx0XHRcdC8vIGlzIGEgRnJhZ21lbnQtbGlrZSwgdGhlbiBvbGREb20gaGFzIGFscmVhZHkgYmVlbiBzZXQgdG8gdGhhdCBjaGlsZCdzIF9uZXh0RG9tLlxuXHRcdFx0XHQvLyBJZiB0aGUgbGFzdCBjaGlsZCBpcyBhIERPTSBWTm9kZSwgdGhlbiBvbGREb20gd2lsbCBiZSBzZXQgdG8gdGhhdCBET01cblx0XHRcdFx0Ly8gbm9kZSdzIG5leHRTaWJsaW5nLlxuXHRcdFx0XHRuZXdQYXJlbnRWTm9kZS5fbmV4dERvbSA9IG9sZERvbTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0b2xkRG9tICYmXG5cdFx0XHRvbGRWTm9kZS5fZG9tID09IG9sZERvbSAmJlxuXHRcdFx0b2xkRG9tLnBhcmVudE5vZGUgIT0gcGFyZW50RG9tXG5cdFx0KSB7XG5cdFx0XHQvLyBUaGUgYWJvdmUgY29uZGl0aW9uIGlzIHRvIGhhbmRsZSBudWxsIHBsYWNlaG9sZGVycy4gU2VlIHRlc3QgaW4gcGxhY2Vob2xkZXIudGVzdC5qczpcblx0XHRcdC8vIGBlZmZpY2llbnRseSByZXBsYWNlIG51bGwgcGxhY2Vob2xkZXJzIGluIHBhcmVudCByZXJlbmRlcnNgXG5cdFx0XHRvbGREb20gPSBnZXREb21TaWJsaW5nKG9sZFZOb2RlKTtcblx0XHR9XG5cdH1cblxuXHRuZXdQYXJlbnRWTm9kZS5fZG9tID0gZmlyc3RDaGlsZERvbTtcblxuXHQvLyBSZW1vdmUgcmVtYWluaW5nIG9sZENoaWxkcmVuIGlmIHRoZXJlIGFyZSBhbnkuXG5cdGZvciAoaSA9IG9sZENoaWxkcmVuTGVuZ3RoOyBpLS07ICkge1xuXHRcdGlmIChvbGRDaGlsZHJlbltpXSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBuZXdQYXJlbnRWTm9kZS50eXBlID09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0b2xkQ2hpbGRyZW5baV0uX2RvbSAhPSBudWxsICYmXG5cdFx0XHRcdG9sZENoaWxkcmVuW2ldLl9kb20gPT0gbmV3UGFyZW50Vk5vZGUuX25leHREb21cblx0XHRcdCkge1xuXHRcdFx0XHQvLyBJZiB0aGUgbmV3UGFyZW50Vk5vZGUuX19uZXh0RG9tIHBvaW50cyB0byBhIGRvbSBub2RlIHRoYXQgaXMgYWJvdXQgdG9cblx0XHRcdFx0Ly8gYmUgdW5tb3VudGVkLCB0aGVuIGdldCB0aGUgbmV4dCBzaWJsaW5nIG9mIHRoYXQgdm5vZGUgYW5kIHNldFxuXHRcdFx0XHQvLyBfbmV4dERvbSB0byBpdFxuXHRcdFx0XHRuZXdQYXJlbnRWTm9kZS5fbmV4dERvbSA9IGdldERvbVNpYmxpbmcob2xkUGFyZW50Vk5vZGUsIGkgKyAxKTtcblx0XHRcdH1cblxuXHRcdFx0dW5tb3VudChvbGRDaGlsZHJlbltpXSwgb2xkQ2hpbGRyZW5baV0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIFNldCByZWZzIG9ubHkgYWZ0ZXIgdW5tb3VudFxuXHRpZiAocmVmcykge1xuXHRcdGZvciAoaSA9IDA7IGkgPCByZWZzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRhcHBseVJlZihyZWZzW2ldLCByZWZzWysraV0sIHJlZnNbKytpXSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHJlb3JkZXJDaGlsZHJlbihjaGlsZFZOb2RlLCBvbGREb20sIHBhcmVudERvbSkge1xuXHRmb3IgKGxldCB0bXAgPSAwOyB0bXAgPCBjaGlsZFZOb2RlLl9jaGlsZHJlbi5sZW5ndGg7IHRtcCsrKSB7XG5cdFx0bGV0IHZub2RlID0gY2hpbGRWTm9kZS5fY2hpbGRyZW5bdG1wXTtcblx0XHRpZiAodm5vZGUpIHtcblx0XHRcdC8vIFdlIHR5cGljYWxseSBlbnRlciB0aGlzIGNvZGUgcGF0aCBvbiBzQ1UgYmFpbG91dCwgd2hlcmUgd2UgY29weVxuXHRcdFx0Ly8gb2xkVk5vZGUuX2NoaWxkcmVuIHRvIG5ld1ZOb2RlLl9jaGlsZHJlbi4gSWYgdGhhdCBpcyB0aGUgY2FzZSwgd2UgbmVlZFxuXHRcdFx0Ly8gdG8gdXBkYXRlIHRoZSBvbGQgY2hpbGRyZW4ncyBfcGFyZW50IHBvaW50ZXIgdG8gcG9pbnQgdG8gdGhlIG5ld1ZOb2RlXG5cdFx0XHQvLyAoY2hpbGRWTm9kZSBoZXJlKS5cblx0XHRcdHZub2RlLl9wYXJlbnQgPSBjaGlsZFZOb2RlO1xuXG5cdFx0XHRpZiAodHlwZW9mIHZub2RlLnR5cGUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRvbGREb20gPSByZW9yZGVyQ2hpbGRyZW4odm5vZGUsIG9sZERvbSwgcGFyZW50RG9tKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9sZERvbSA9IHBsYWNlQ2hpbGQoXG5cdFx0XHRcdFx0cGFyZW50RG9tLFxuXHRcdFx0XHRcdHZub2RlLFxuXHRcdFx0XHRcdHZub2RlLFxuXHRcdFx0XHRcdGNoaWxkVk5vZGUuX2NoaWxkcmVuLFxuXHRcdFx0XHRcdHZub2RlLl9kb20sXG5cdFx0XHRcdFx0b2xkRG9tXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG9sZERvbTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGFuZCBsb29wIHRocm91Z2ggdGhlIGNoaWxkcmVuIG9mIGEgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW5kZXgnKS5Db21wb25lbnRDaGlsZHJlbn0gY2hpbGRyZW4gVGhlIHVuZmxhdHRlbmVkXG4gKiBjaGlsZHJlbiBvZiBhIHZpcnR1YWwgbm9kZVxuICogQHJldHVybnMge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9DaGlsZEFycmF5KGNoaWxkcmVuLCBvdXQpIHtcblx0b3V0ID0gb3V0IHx8IFtdO1xuXHRpZiAoY2hpbGRyZW4gPT0gbnVsbCB8fCB0eXBlb2YgY2hpbGRyZW4gPT0gJ2Jvb2xlYW4nKSB7XG5cdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcblx0XHRjaGlsZHJlbi5zb21lKGNoaWxkID0+IHtcblx0XHRcdHRvQ2hpbGRBcnJheShjaGlsZCwgb3V0KTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRvdXQucHVzaChjaGlsZHJlbik7XG5cdH1cblx0cmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gcGxhY2VDaGlsZChcblx0cGFyZW50RG9tLFxuXHRjaGlsZFZOb2RlLFxuXHRvbGRWTm9kZSxcblx0b2xkQ2hpbGRyZW4sXG5cdG5ld0RvbSxcblx0b2xkRG9tXG4pIHtcblx0bGV0IG5leHREb207XG5cdGlmIChjaGlsZFZOb2RlLl9uZXh0RG9tICE9PSB1bmRlZmluZWQpIHtcblx0XHQvLyBPbmx5IEZyYWdtZW50cyBvciBjb21wb25lbnRzIHRoYXQgcmV0dXJuIEZyYWdtZW50IGxpa2UgVk5vZGVzIHdpbGxcblx0XHQvLyBoYXZlIGEgbm9uLXVuZGVmaW5lZCBfbmV4dERvbS4gQ29udGludWUgdGhlIGRpZmYgZnJvbSB0aGUgc2libGluZ1xuXHRcdC8vIG9mIGxhc3QgRE9NIGNoaWxkIG9mIHRoaXMgY2hpbGQgVk5vZGVcblx0XHRuZXh0RG9tID0gY2hpbGRWTm9kZS5fbmV4dERvbTtcblxuXHRcdC8vIEVhZ2VybHkgY2xlYW51cCBfbmV4dERvbS4gV2UgZG9uJ3QgbmVlZCB0byBwZXJzaXN0IHRoZSB2YWx1ZSBiZWNhdXNlXG5cdFx0Ly8gaXQgaXMgb25seSB1c2VkIGJ5IGBkaWZmQ2hpbGRyZW5gIHRvIGRldGVybWluZSB3aGVyZSB0byByZXN1bWUgdGhlIGRpZmYgYWZ0ZXJcblx0XHQvLyBkaWZmaW5nIENvbXBvbmVudHMgYW5kIEZyYWdtZW50cy4gT25jZSB3ZSBzdG9yZSBpdCB0aGUgbmV4dERPTSBsb2NhbCB2YXIsIHdlXG5cdFx0Ly8gY2FuIGNsZWFuIHVwIHRoZSBwcm9wZXJ0eVxuXHRcdGNoaWxkVk5vZGUuX25leHREb20gPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoXG5cdFx0b2xkVk5vZGUgPT0gbnVsbCB8fFxuXHRcdG5ld0RvbSAhPSBvbGREb20gfHxcblx0XHRuZXdEb20ucGFyZW50Tm9kZSA9PSBudWxsXG5cdCkge1xuXHRcdG91dGVyOiBpZiAob2xkRG9tID09IG51bGwgfHwgb2xkRG9tLnBhcmVudE5vZGUgIT09IHBhcmVudERvbSkge1xuXHRcdFx0cGFyZW50RG9tLmFwcGVuZENoaWxkKG5ld0RvbSk7XG5cdFx0XHRuZXh0RG9tID0gbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gYGo8b2xkQ2hpbGRyZW5MZW5ndGg7IGorPTJgIGlzIGFuIGFsdGVybmF0aXZlIHRvIGBqKys8b2xkQ2hpbGRyZW5MZW5ndGgvMmBcblx0XHRcdGZvciAoXG5cdFx0XHRcdGxldCBzaWJEb20gPSBvbGREb20sIGogPSAwO1xuXHRcdFx0XHQoc2liRG9tID0gc2liRG9tLm5leHRTaWJsaW5nKSAmJiBqIDwgb2xkQ2hpbGRyZW4ubGVuZ3RoO1xuXHRcdFx0XHRqICs9IDJcblx0XHRcdCkge1xuXHRcdFx0XHRpZiAoc2liRG9tID09IG5ld0RvbSkge1xuXHRcdFx0XHRcdGJyZWFrIG91dGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRwYXJlbnREb20uaW5zZXJ0QmVmb3JlKG5ld0RvbSwgb2xkRG9tKTtcblx0XHRcdG5leHREb20gPSBvbGREb207XG5cdFx0fVxuXHR9XG5cblx0Ly8gSWYgd2UgaGF2ZSBwcmUtY2FsY3VsYXRlZCB0aGUgbmV4dERPTSBub2RlLCB1c2UgaXQuIEVsc2UgY2FsY3VsYXRlIGl0IG5vd1xuXHQvLyBTdHJpY3RseSBjaGVjayBmb3IgYHVuZGVmaW5lZGAgaGVyZSBjdXogYG51bGxgIGlzIGEgdmFsaWQgdmFsdWUgb2YgYG5leHREb21gLlxuXHQvLyBTZWUgbW9yZSBkZXRhaWwgaW4gY3JlYXRlLWVsZW1lbnQuanM6Y3JlYXRlVk5vZGVcblx0aWYgKG5leHREb20gIT09IHVuZGVmaW5lZCkge1xuXHRcdG9sZERvbSA9IG5leHREb207XG5cdH0gZWxzZSB7XG5cdFx0b2xkRG9tID0gbmV3RG9tLm5leHRTaWJsaW5nO1xuXHR9XG5cblx0cmV0dXJuIG9sZERvbTtcbn1cbiIsImltcG9ydCB7IElTX05PTl9ESU1FTlNJT05BTCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuLyoqXG4gKiBEaWZmIHRoZSBvbGQgYW5kIG5ldyBwcm9wZXJ0aWVzIG9mIGEgVk5vZGUgYW5kIGFwcGx5IGNoYW5nZXMgdG8gdGhlIERPTSBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBkb20gVGhlIERPTSBub2RlIHRvIGFwcGx5XG4gKiBjaGFuZ2VzIHRvXG4gKiBAcGFyYW0ge29iamVjdH0gbmV3UHJvcHMgVGhlIG5ldyBwcm9wc1xuICogQHBhcmFtIHtvYmplY3R9IG9sZFByb3BzIFRoZSBvbGQgcHJvcHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdmcgV2hldGhlciBvciBub3QgdGhpcyBub2RlIGlzIGFuIFNWRyBub2RlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGh5ZHJhdGUgV2hldGhlciBvciBub3Qgd2UgYXJlIGluIGh5ZHJhdGlvbiBtb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmUHJvcHMoZG9tLCBuZXdQcm9wcywgb2xkUHJvcHMsIGlzU3ZnLCBoeWRyYXRlKSB7XG5cdGxldCBpO1xuXG5cdGZvciAoaSBpbiBvbGRQcm9wcykge1xuXHRcdGlmIChpICE9PSAnY2hpbGRyZW4nICYmIGkgIT09ICdrZXknICYmICEoaSBpbiBuZXdQcm9wcykpIHtcblx0XHRcdHNldFByb3BlcnR5KGRvbSwgaSwgbnVsbCwgb2xkUHJvcHNbaV0sIGlzU3ZnKTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKGkgaW4gbmV3UHJvcHMpIHtcblx0XHRpZiAoXG5cdFx0XHQoIWh5ZHJhdGUgfHwgdHlwZW9mIG5ld1Byb3BzW2ldID09ICdmdW5jdGlvbicpICYmXG5cdFx0XHRpICE9PSAnY2hpbGRyZW4nICYmXG5cdFx0XHRpICE9PSAna2V5JyAmJlxuXHRcdFx0aSAhPT0gJ3ZhbHVlJyAmJlxuXHRcdFx0aSAhPT0gJ2NoZWNrZWQnICYmXG5cdFx0XHRvbGRQcm9wc1tpXSAhPT0gbmV3UHJvcHNbaV1cblx0XHQpIHtcblx0XHRcdHNldFByb3BlcnR5KGRvbSwgaSwgbmV3UHJvcHNbaV0sIG9sZFByb3BzW2ldLCBpc1N2Zyk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlKHN0eWxlLCBrZXksIHZhbHVlKSB7XG5cdGlmIChrZXlbMF0gPT09ICctJykge1xuXHRcdHN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUpO1xuXHR9IGVsc2UgaWYgKHZhbHVlID09IG51bGwpIHtcblx0XHRzdHlsZVtrZXldID0gJyc7XG5cdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9ICdudW1iZXInIHx8IElTX05PTl9ESU1FTlNJT05BTC50ZXN0KGtleSkpIHtcblx0XHRzdHlsZVtrZXldID0gdmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGVba2V5XSA9IHZhbHVlICsgJ3B4Jztcblx0fVxufVxuXG4vKipcbiAqIFNldCBhIHByb3BlcnR5IHZhbHVlIG9uIGEgRE9NIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IGRvbSBUaGUgRE9NIG5vZGUgdG8gbW9kaWZ5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gc2V0XG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgdGhlIHByb3BlcnR5IHRvXG4gKiBAcGFyYW0geyp9IG9sZFZhbHVlIFRoZSBvbGQgdmFsdWUgdGhlIHByb3BlcnR5IGhhZFxuICogQHBhcmFtIHtib29sZWFufSBpc1N2ZyBXaGV0aGVyIG9yIG5vdCB0aGlzIERPTSBub2RlIGlzIGFuIFNWRyBub2RlIG9yIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0UHJvcGVydHkoZG9tLCBuYW1lLCB2YWx1ZSwgb2xkVmFsdWUsIGlzU3ZnKSB7XG5cdGxldCB1c2VDYXB0dXJlO1xuXG5cdG86IGlmIChuYW1lID09PSAnc3R5bGUnKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0ZG9tLnN0eWxlLmNzc1RleHQgPSB2YWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGVvZiBvbGRWYWx1ZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRkb20uc3R5bGUuY3NzVGV4dCA9IG9sZFZhbHVlID0gJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvbGRWYWx1ZSkge1xuXHRcdFx0XHRmb3IgKG5hbWUgaW4gb2xkVmFsdWUpIHtcblx0XHRcdFx0XHRpZiAoISh2YWx1ZSAmJiBuYW1lIGluIHZhbHVlKSkge1xuXHRcdFx0XHRcdFx0c2V0U3R5bGUoZG9tLnN0eWxlLCBuYW1lLCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0XHRmb3IgKG5hbWUgaW4gdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAoIW9sZFZhbHVlIHx8IHZhbHVlW25hbWVdICE9PSBvbGRWYWx1ZVtuYW1lXSkge1xuXHRcdFx0XHRcdFx0c2V0U3R5bGUoZG9tLnN0eWxlLCBuYW1lLCB2YWx1ZVtuYW1lXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8vIEJlbmNobWFyayBmb3IgY29tcGFyaXNvbjogaHR0cHM6Ly9lc2JlbmNoLmNvbS9iZW5jaC81NzRjOTU0YmRiOTY1YjlhMDA5NjVhYzZcblx0ZWxzZSBpZiAobmFtZVswXSA9PT0gJ28nICYmIG5hbWVbMV0gPT09ICduJykge1xuXHRcdHVzZUNhcHR1cmUgPSBuYW1lICE9PSAobmFtZSA9IG5hbWUucmVwbGFjZSgvQ2FwdHVyZSQvLCAnJykpO1xuXG5cdFx0Ly8gSW5mZXIgY29ycmVjdCBjYXNpbmcgZm9yIERPTSBidWlsdC1pbiBldmVudHM6XG5cdFx0aWYgKG5hbWUudG9Mb3dlckNhc2UoKSBpbiBkb20pIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCkuc2xpY2UoMik7XG5cdFx0ZWxzZSBuYW1lID0gbmFtZS5zbGljZSgyKTtcblxuXHRcdGlmICghZG9tLl9saXN0ZW5lcnMpIGRvbS5fbGlzdGVuZXJzID0ge307XG5cdFx0ZG9tLl9saXN0ZW5lcnNbbmFtZSArIHVzZUNhcHR1cmVdID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdGlmICghb2xkVmFsdWUpIHtcblx0XHRcdFx0Y29uc3QgaGFuZGxlciA9IHVzZUNhcHR1cmUgPyBldmVudFByb3h5Q2FwdHVyZSA6IGV2ZW50UHJveHk7XG5cdFx0XHRcdGRvbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIsIHVzZUNhcHR1cmUpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBoYW5kbGVyID0gdXNlQ2FwdHVyZSA/IGV2ZW50UHJveHlDYXB0dXJlIDogZXZlbnRQcm94eTtcblx0XHRcdGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIsIHVzZUNhcHR1cmUpO1xuXHRcdH1cblx0fSBlbHNlIGlmIChuYW1lICE9PSAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnKSB7XG5cdFx0aWYgKGlzU3ZnKSB7XG5cdFx0XHQvLyBOb3JtYWxpemUgaW5jb3JyZWN0IHByb3AgdXNhZ2UgZm9yIFNWRzpcblx0XHRcdC8vIC0geGxpbms6aHJlZiAvIHhsaW5rSHJlZiAtLT4gaHJlZiAoeGxpbms6aHJlZiB3YXMgcmVtb3ZlZCBmcm9tIFNWRyBhbmQgaXNuJ3QgbmVlZGVkKVxuXHRcdFx0Ly8gLSBjbGFzc05hbWUgLS0+IGNsYXNzXG5cdFx0XHRuYW1lID0gbmFtZS5yZXBsYWNlKC94bGlua1tIOmhdLywgJ2gnKS5yZXBsYWNlKC9zTmFtZSQvLCAncycpO1xuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRuYW1lICE9PSAnaHJlZicgJiZcblx0XHRcdG5hbWUgIT09ICdsaXN0JyAmJlxuXHRcdFx0bmFtZSAhPT0gJ2Zvcm0nICYmXG5cdFx0XHQvLyBEZWZhdWx0IHZhbHVlIGluIGJyb3dzZXJzIGlzIGAtMWAgYW5kIGFuIGVtcHR5IHN0cmluZyBpc1xuXHRcdFx0Ly8gY2FzdCB0byBgMGAgaW5zdGVhZFxuXHRcdFx0bmFtZSAhPT0gJ3RhYkluZGV4JyAmJlxuXHRcdFx0bmFtZSAhPT0gJ2Rvd25sb2FkJyAmJlxuXHRcdFx0bmFtZSBpbiBkb21cblx0XHQpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGRvbVtuYW1lXSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHRcdFx0XHQvLyBsYWJlbGxlZCBicmVhayBpcyAxYiBzbWFsbGVyIGhlcmUgdGhhbiBhIHJldHVybiBzdGF0ZW1lbnQgKHNvcnJ5KVxuXHRcdFx0XHRicmVhayBvO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cblx0XHQvLyBBUklBLWF0dHJpYnV0ZXMgaGF2ZSBhIGRpZmZlcmVudCBub3Rpb24gb2YgYm9vbGVhbiB2YWx1ZXMuXG5cdFx0Ly8gVGhlIHZhbHVlIGBmYWxzZWAgaXMgZGlmZmVyZW50IGZyb20gdGhlIGF0dHJpYnV0ZSBub3Rcblx0XHQvLyBleGlzdGluZyBvbiB0aGUgRE9NLCBzbyB3ZSBjYW4ndCByZW1vdmUgaXQuIEZvciBub24tYm9vbGVhblxuXHRcdC8vIEFSSUEtYXR0cmlidXRlcyB3ZSBjb3VsZCB0cmVhdCBmYWxzZSBhcyBhIHJlbW92YWwsIGJ1dCB0aGVcblx0XHQvLyBhbW91bnQgb2YgZXhjZXB0aW9ucyB3b3VsZCBjb3N0IHVzIHRvbyBtYW55IGJ5dGVzLiBPbiB0b3Agb2Zcblx0XHQvLyB0aGF0IG90aGVyIFZET00gZnJhbWV3b3JrcyBhbHNvIGFsd2F5cyBzdHJpbmdpZnkgYGZhbHNlYC5cblxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdC8vIG5ldmVyIHNlcmlhbGl6ZSBmdW5jdGlvbnMgYXMgYXR0cmlidXRlIHZhbHVlc1xuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHR2YWx1ZSAhPSBudWxsICYmXG5cdFx0XHQodmFsdWUgIT09IGZhbHNlIHx8IChuYW1lWzBdID09PSAnYScgJiYgbmFtZVsxXSA9PT0gJ3InKSlcblx0XHQpIHtcblx0XHRcdGRvbS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFByb3h5IGFuIGV2ZW50IHRvIGhvb2tlZCBldmVudCBoYW5kbGVyc1xuICogQHBhcmFtIHtFdmVudH0gZSBUaGUgZXZlbnQgb2JqZWN0IGZyb20gdGhlIGJyb3dzZXJcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV2ZW50UHJveHkoZSkge1xuXHR0aGlzLl9saXN0ZW5lcnNbZS50eXBlICsgZmFsc2VdKG9wdGlvbnMuZXZlbnQgPyBvcHRpb25zLmV2ZW50KGUpIDogZSk7XG59XG5cbmZ1bmN0aW9uIGV2ZW50UHJveHlDYXB0dXJlKGUpIHtcblx0dGhpcy5fbGlzdGVuZXJzW2UudHlwZSArIHRydWVdKG9wdGlvbnMuZXZlbnQgPyBvcHRpb25zLmV2ZW50KGUpIDogZSk7XG59XG4iLCJpbXBvcnQgeyBFTVBUWV9PQkosIEVNUFRZX0FSUiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgRnJhZ21lbnQgfSBmcm9tICcuLi9jcmVhdGUtZWxlbWVudCc7XG5pbXBvcnQgeyBkaWZmQ2hpbGRyZW4gfSBmcm9tICcuL2NoaWxkcmVuJztcbmltcG9ydCB7IGRpZmZQcm9wcywgc2V0UHJvcGVydHkgfSBmcm9tICcuL3Byb3BzJztcbmltcG9ydCB7IGFzc2lnbiwgcmVtb3ZlTm9kZSB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5cbi8qKlxuICogRGlmZiB0d28gdmlydHVhbCBub2RlcyBhbmQgYXBwbHkgcHJvcGVyIGNoYW5nZXMgdG8gdGhlIERPTVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gcGFyZW50RG9tIFRoZSBwYXJlbnQgb2YgdGhlIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gbmV3Vk5vZGUgVGhlIG5ldyB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBvbGRWTm9kZSBUaGUgb2xkIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtvYmplY3R9IGdsb2JhbENvbnRleHQgVGhlIGN1cnJlbnQgY29udGV4dCBvYmplY3QuIE1vZGlmaWVkIGJ5IGdldENoaWxkQ29udGV4dFxuICogQHBhcmFtIHtib29sZWFufSBpc1N2ZyBXaGV0aGVyIG9yIG5vdCB0aGlzIGVsZW1lbnQgaXMgYW4gU1ZHIG5vZGVcbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnQ+fSBleGNlc3NEb21DaGlsZHJlblxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2ludGVybmFsJykuQ29tcG9uZW50Pn0gY29tbWl0UXVldWUgTGlzdCBvZiBjb21wb25lbnRzXG4gKiB3aGljaCBoYXZlIGNhbGxiYWNrcyB0byBpbnZva2UgaW4gY29tbWl0Um9vdFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gb2xkRG9tIFRoZSBjdXJyZW50IGF0dGFjaGVkIERPTVxuICogZWxlbWVudCBhbnkgbmV3IGRvbSBlbGVtZW50cyBzaG91bGQgYmUgcGxhY2VkIGFyb3VuZC4gTGlrZWx5IGBudWxsYCBvbiBmaXJzdFxuICogcmVuZGVyIChleGNlcHQgd2hlbiBoeWRyYXRpbmcpLiBDYW4gYmUgYSBzaWJsaW5nIERPTSBlbGVtZW50IHdoZW4gZGlmZmluZ1xuICogRnJhZ21lbnRzIHRoYXQgaGF2ZSBzaWJsaW5ncy4gSW4gbW9zdCBjYXNlcywgaXQgc3RhcnRzIG91dCBhcyBgb2xkQ2hpbGRyZW5bMF0uX2RvbWAuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0h5ZHJhdGluZ10gV2hldGhlciBvciBub3Qgd2UgYXJlIGluIGh5ZHJhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZihcblx0cGFyZW50RG9tLFxuXHRuZXdWTm9kZSxcblx0b2xkVk5vZGUsXG5cdGdsb2JhbENvbnRleHQsXG5cdGlzU3ZnLFxuXHRleGNlc3NEb21DaGlsZHJlbixcblx0Y29tbWl0UXVldWUsXG5cdG9sZERvbSxcblx0aXNIeWRyYXRpbmdcbikge1xuXHRsZXQgdG1wLFxuXHRcdG5ld1R5cGUgPSBuZXdWTm9kZS50eXBlO1xuXG5cdC8vIFdoZW4gcGFzc2luZyB0aHJvdWdoIGNyZWF0ZUVsZW1lbnQgaXQgYXNzaWducyB0aGUgb2JqZWN0XG5cdC8vIGNvbnN0cnVjdG9yIGFzIHVuZGVmaW5lZC4gVGhpcyB0byBwcmV2ZW50IEpTT04taW5qZWN0aW9uLlxuXHRpZiAobmV3Vk5vZGUuY29uc3RydWN0b3IgIT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG5cblx0Ly8gSWYgdGhlIHByZXZpb3VzIGRpZmYgYmFpbGVkIG91dCwgcmVzdW1lIGNyZWF0aW5nL2h5ZHJhdGluZy5cblx0aWYgKG9sZFZOb2RlLl9oeWRyYXRpbmcgIT0gbnVsbCkge1xuXHRcdGlzSHlkcmF0aW5nID0gb2xkVk5vZGUuX2h5ZHJhdGluZztcblx0XHRvbGREb20gPSBuZXdWTm9kZS5fZG9tID0gb2xkVk5vZGUuX2RvbTtcblx0XHQvLyBpZiB3ZSByZXN1bWUsIHdlIHdhbnQgdGhlIHRyZWUgdG8gYmUgXCJ1bmxvY2tlZFwiXG5cdFx0bmV3Vk5vZGUuX2h5ZHJhdGluZyA9IG51bGw7XG5cdFx0ZXhjZXNzRG9tQ2hpbGRyZW4gPSBbb2xkRG9tXTtcblx0fVxuXG5cdGlmICgodG1wID0gb3B0aW9ucy5fZGlmZikpIHRtcChuZXdWTm9kZSk7XG5cblx0dHJ5IHtcblx0XHRvdXRlcjogaWYgKHR5cGVvZiBuZXdUeXBlID09ICdmdW5jdGlvbicpIHtcblx0XHRcdGxldCBjLCBpc05ldywgb2xkUHJvcHMsIG9sZFN0YXRlLCBzbmFwc2hvdCwgY2xlYXJQcm9jZXNzaW5nRXhjZXB0aW9uO1xuXHRcdFx0bGV0IG5ld1Byb3BzID0gbmV3Vk5vZGUucHJvcHM7XG5cblx0XHRcdC8vIE5lY2Vzc2FyeSBmb3IgY3JlYXRlQ29udGV4dCBhcGkuIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSB3aWxsIHBhc3Ncblx0XHRcdC8vIHRoZSBjb250ZXh0IHZhbHVlIGFzIGB0aGlzLmNvbnRleHRgIGp1c3QgZm9yIHRoaXMgY29tcG9uZW50LlxuXHRcdFx0dG1wID0gbmV3VHlwZS5jb250ZXh0VHlwZTtcblx0XHRcdGxldCBwcm92aWRlciA9IHRtcCAmJiBnbG9iYWxDb250ZXh0W3RtcC5faWRdO1xuXHRcdFx0bGV0IGNvbXBvbmVudENvbnRleHQgPSB0bXBcblx0XHRcdFx0PyBwcm92aWRlclxuXHRcdFx0XHRcdD8gcHJvdmlkZXIucHJvcHMudmFsdWVcblx0XHRcdFx0XHQ6IHRtcC5fZGVmYXVsdFZhbHVlXG5cdFx0XHRcdDogZ2xvYmFsQ29udGV4dDtcblxuXHRcdFx0Ly8gR2V0IGNvbXBvbmVudCBhbmQgc2V0IGl0IHRvIGBjYFxuXHRcdFx0aWYgKG9sZFZOb2RlLl9jb21wb25lbnQpIHtcblx0XHRcdFx0YyA9IG5ld1ZOb2RlLl9jb21wb25lbnQgPSBvbGRWTm9kZS5fY29tcG9uZW50O1xuXHRcdFx0XHRjbGVhclByb2Nlc3NpbmdFeGNlcHRpb24gPSBjLl9wcm9jZXNzaW5nRXhjZXB0aW9uID0gYy5fcGVuZGluZ0Vycm9yO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSW5zdGFudGlhdGUgdGhlIG5ldyBjb21wb25lbnRcblx0XHRcdFx0aWYgKCdwcm90b3R5cGUnIGluIG5ld1R5cGUgJiYgbmV3VHlwZS5wcm90b3R5cGUucmVuZGVyKSB7XG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZSBUaGUgY2hlY2sgYWJvdmUgdmVyaWZpZXMgdGhhdCBuZXdUeXBlIGlzIHN1cHBvc2UgdG8gYmUgY29uc3RydWN0ZWRcblx0XHRcdFx0XHRuZXdWTm9kZS5fY29tcG9uZW50ID0gYyA9IG5ldyBuZXdUeXBlKG5ld1Byb3BzLCBjb21wb25lbnRDb250ZXh0KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuZXctY2FwXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZSBUcnVzdCBtZSwgQ29tcG9uZW50IGltcGxlbWVudHMgdGhlIGludGVyZmFjZSB3ZSB3YW50XG5cdFx0XHRcdFx0bmV3Vk5vZGUuX2NvbXBvbmVudCA9IGMgPSBuZXcgQ29tcG9uZW50KG5ld1Byb3BzLCBjb21wb25lbnRDb250ZXh0KTtcblx0XHRcdFx0XHRjLmNvbnN0cnVjdG9yID0gbmV3VHlwZTtcblx0XHRcdFx0XHRjLnJlbmRlciA9IGRvUmVuZGVyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChwcm92aWRlcikgcHJvdmlkZXIuc3ViKGMpO1xuXG5cdFx0XHRcdGMucHJvcHMgPSBuZXdQcm9wcztcblx0XHRcdFx0aWYgKCFjLnN0YXRlKSBjLnN0YXRlID0ge307XG5cdFx0XHRcdGMuY29udGV4dCA9IGNvbXBvbmVudENvbnRleHQ7XG5cdFx0XHRcdGMuX2dsb2JhbENvbnRleHQgPSBnbG9iYWxDb250ZXh0O1xuXHRcdFx0XHRpc05ldyA9IGMuX2RpcnR5ID0gdHJ1ZTtcblx0XHRcdFx0Yy5fcmVuZGVyQ2FsbGJhY2tzID0gW107XG5cdFx0XHR9XG5cblx0XHRcdC8vIEludm9rZSBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHNcblx0XHRcdGlmIChjLl9uZXh0U3RhdGUgPT0gbnVsbCkge1xuXHRcdFx0XHRjLl9uZXh0U3RhdGUgPSBjLnN0YXRlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG5ld1R5cGUuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKGMuX25leHRTdGF0ZSA9PSBjLnN0YXRlKSB7XG5cdFx0XHRcdFx0Yy5fbmV4dFN0YXRlID0gYXNzaWduKHt9LCBjLl9uZXh0U3RhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YXNzaWduKFxuXHRcdFx0XHRcdGMuX25leHRTdGF0ZSxcblx0XHRcdFx0XHRuZXdUeXBlLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhuZXdQcm9wcywgYy5fbmV4dFN0YXRlKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRvbGRQcm9wcyA9IGMucHJvcHM7XG5cdFx0XHRvbGRTdGF0ZSA9IGMuc3RhdGU7XG5cblx0XHRcdC8vIEludm9rZSBwcmUtcmVuZGVyIGxpZmVjeWNsZSBtZXRob2RzXG5cdFx0XHRpZiAoaXNOZXcpIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdG5ld1R5cGUuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzID09IG51bGwgJiZcblx0XHRcdFx0XHRjLmNvbXBvbmVudFdpbGxNb3VudCAhPSBudWxsXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbE1vdW50KCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYy5jb21wb25lbnREaWRNb3VudCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0Yy5fcmVuZGVyQ2FsbGJhY2tzLnB1c2goYy5jb21wb25lbnREaWRNb3VudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRuZXdUeXBlLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9PSBudWxsICYmXG5cdFx0XHRcdFx0bmV3UHJvcHMgIT09IG9sZFByb3BzICYmXG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzICE9IG51bGxcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzLCBjb21wb25lbnRDb250ZXh0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQoIWMuX2ZvcmNlICYmXG5cdFx0XHRcdFx0XHRjLnNob3VsZENvbXBvbmVudFVwZGF0ZSAhPSBudWxsICYmXG5cdFx0XHRcdFx0XHRjLnNob3VsZENvbXBvbmVudFVwZGF0ZShcblx0XHRcdFx0XHRcdFx0bmV3UHJvcHMsXG5cdFx0XHRcdFx0XHRcdGMuX25leHRTdGF0ZSxcblx0XHRcdFx0XHRcdFx0Y29tcG9uZW50Q29udGV4dFxuXHRcdFx0XHRcdFx0KSA9PT0gZmFsc2UpIHx8XG5cdFx0XHRcdFx0bmV3Vk5vZGUuX29yaWdpbmFsID09PSBvbGRWTm9kZS5fb3JpZ2luYWxcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Yy5wcm9wcyA9IG5ld1Byb3BzO1xuXHRcdFx0XHRcdGMuc3RhdGUgPSBjLl9uZXh0U3RhdGU7XG5cdFx0XHRcdFx0Ly8gTW9yZSBpbmZvIGFib3V0IHRoaXMgaGVyZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vSm92aURlQ3Jvb2NrL2JlYzVmMmNlOTM1NDRkMmU2MDcwZWY4ZTAwMzZlNGU4XG5cdFx0XHRcdFx0aWYgKG5ld1ZOb2RlLl9vcmlnaW5hbCAhPT0gb2xkVk5vZGUuX29yaWdpbmFsKSBjLl9kaXJ0eSA9IGZhbHNlO1xuXHRcdFx0XHRcdGMuX3Zub2RlID0gbmV3Vk5vZGU7XG5cdFx0XHRcdFx0bmV3Vk5vZGUuX2RvbSA9IG9sZFZOb2RlLl9kb207XG5cdFx0XHRcdFx0bmV3Vk5vZGUuX2NoaWxkcmVuID0gb2xkVk5vZGUuX2NoaWxkcmVuO1xuXHRcdFx0XHRcdG5ld1ZOb2RlLl9jaGlsZHJlbi5mb3JFYWNoKHZub2RlID0+IHtcblx0XHRcdFx0XHRcdGlmICh2bm9kZSkgdm5vZGUuX3BhcmVudCA9IG5ld1ZOb2RlO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGlmIChjLl9yZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRjb21taXRRdWV1ZS5wdXNoKGMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGJyZWFrIG91dGVyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGMuY29tcG9uZW50V2lsbFVwZGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsVXBkYXRlKG5ld1Byb3BzLCBjLl9uZXh0U3RhdGUsIGNvbXBvbmVudENvbnRleHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGMuY29tcG9uZW50RGlkVXBkYXRlICE9IG51bGwpIHtcblx0XHRcdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MucHVzaCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRjLmNvbXBvbmVudERpZFVwZGF0ZShvbGRQcm9wcywgb2xkU3RhdGUsIHNuYXBzaG90KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjLmNvbnRleHQgPSBjb21wb25lbnRDb250ZXh0O1xuXHRcdFx0Yy5wcm9wcyA9IG5ld1Byb3BzO1xuXHRcdFx0Yy5zdGF0ZSA9IGMuX25leHRTdGF0ZTtcblxuXHRcdFx0aWYgKCh0bXAgPSBvcHRpb25zLl9yZW5kZXIpKSB0bXAobmV3Vk5vZGUpO1xuXG5cdFx0XHRjLl9kaXJ0eSA9IGZhbHNlO1xuXHRcdFx0Yy5fdm5vZGUgPSBuZXdWTm9kZTtcblx0XHRcdGMuX3BhcmVudERvbSA9IHBhcmVudERvbTtcblxuXHRcdFx0dG1wID0gYy5yZW5kZXIoYy5wcm9wcywgYy5zdGF0ZSwgYy5jb250ZXh0KTtcblxuXHRcdFx0Ly8gSGFuZGxlIHNldFN0YXRlIGNhbGxlZCBpbiByZW5kZXIsIHNlZSAjMjU1M1xuXHRcdFx0Yy5zdGF0ZSA9IGMuX25leHRTdGF0ZTtcblxuXHRcdFx0aWYgKGMuZ2V0Q2hpbGRDb250ZXh0ICE9IG51bGwpIHtcblx0XHRcdFx0Z2xvYmFsQ29udGV4dCA9IGFzc2lnbihhc3NpZ24oe30sIGdsb2JhbENvbnRleHQpLCBjLmdldENoaWxkQ29udGV4dCgpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFpc05ldyAmJiBjLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlICE9IG51bGwpIHtcblx0XHRcdFx0c25hcHNob3QgPSBjLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKG9sZFByb3BzLCBvbGRTdGF0ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBpc1RvcExldmVsRnJhZ21lbnQgPVxuXHRcdFx0XHR0bXAgIT0gbnVsbCAmJiB0bXAudHlwZSA9PT0gRnJhZ21lbnQgJiYgdG1wLmtleSA9PSBudWxsO1xuXHRcdFx0bGV0IHJlbmRlclJlc3VsdCA9IGlzVG9wTGV2ZWxGcmFnbWVudCA/IHRtcC5wcm9wcy5jaGlsZHJlbiA6IHRtcDtcblxuXHRcdFx0ZGlmZkNoaWxkcmVuKFxuXHRcdFx0XHRwYXJlbnREb20sXG5cdFx0XHRcdEFycmF5LmlzQXJyYXkocmVuZGVyUmVzdWx0KSA/IHJlbmRlclJlc3VsdCA6IFtyZW5kZXJSZXN1bHRdLFxuXHRcdFx0XHRuZXdWTm9kZSxcblx0XHRcdFx0b2xkVk5vZGUsXG5cdFx0XHRcdGdsb2JhbENvbnRleHQsXG5cdFx0XHRcdGlzU3ZnLFxuXHRcdFx0XHRleGNlc3NEb21DaGlsZHJlbixcblx0XHRcdFx0Y29tbWl0UXVldWUsXG5cdFx0XHRcdG9sZERvbSxcblx0XHRcdFx0aXNIeWRyYXRpbmdcblx0XHRcdCk7XG5cblx0XHRcdGMuYmFzZSA9IG5ld1ZOb2RlLl9kb207XG5cblx0XHRcdC8vIFdlIHN1Y2Nlc3NmdWxseSByZW5kZXJlZCB0aGlzIFZOb2RlLCB1bnNldCBhbnkgc3RvcmVkIGh5ZHJhdGlvbi9iYWlsb3V0IHN0YXRlOlxuXHRcdFx0bmV3Vk5vZGUuX2h5ZHJhdGluZyA9IG51bGw7XG5cblx0XHRcdGlmIChjLl9yZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbW1pdFF1ZXVlLnB1c2goYyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjbGVhclByb2Nlc3NpbmdFeGNlcHRpb24pIHtcblx0XHRcdFx0Yy5fcGVuZGluZ0Vycm9yID0gYy5fcHJvY2Vzc2luZ0V4Y2VwdGlvbiA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGMuX2ZvcmNlID0gZmFsc2U7XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuID09IG51bGwgJiZcblx0XHRcdG5ld1ZOb2RlLl9vcmlnaW5hbCA9PT0gb2xkVk5vZGUuX29yaWdpbmFsXG5cdFx0KSB7XG5cdFx0XHRuZXdWTm9kZS5fY2hpbGRyZW4gPSBvbGRWTm9kZS5fY2hpbGRyZW47XG5cdFx0XHRuZXdWTm9kZS5fZG9tID0gb2xkVk5vZGUuX2RvbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bmV3Vk5vZGUuX2RvbSA9IGRpZmZFbGVtZW50Tm9kZXMoXG5cdFx0XHRcdG9sZFZOb2RlLl9kb20sXG5cdFx0XHRcdG5ld1ZOb2RlLFxuXHRcdFx0XHRvbGRWTm9kZSxcblx0XHRcdFx0Z2xvYmFsQ29udGV4dCxcblx0XHRcdFx0aXNTdmcsXG5cdFx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRcdFx0XHRjb21taXRRdWV1ZSxcblx0XHRcdFx0aXNIeWRyYXRpbmdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKCh0bXAgPSBvcHRpb25zLmRpZmZlZCkpIHRtcChuZXdWTm9kZSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRuZXdWTm9kZS5fb3JpZ2luYWwgPSBudWxsO1xuXHRcdC8vIGlmIGh5ZHJhdGluZyBvciBjcmVhdGluZyBpbml0aWFsIHRyZWUsIGJhaWxvdXQgcHJlc2VydmVzIERPTTpcblx0XHRpZiAoaXNIeWRyYXRpbmcgfHwgZXhjZXNzRG9tQ2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0bmV3Vk5vZGUuX2RvbSA9IG9sZERvbTtcblx0XHRcdG5ld1ZOb2RlLl9oeWRyYXRpbmcgPSAhIWlzSHlkcmF0aW5nO1xuXHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW5bZXhjZXNzRG9tQ2hpbGRyZW4uaW5kZXhPZihvbGREb20pXSA9IG51bGw7XG5cdFx0XHQvLyBeIGNvdWxkIHBvc3NpYmx5IGJlIHNpbXBsaWZpZWQgdG86XG5cdFx0XHQvLyBleGNlc3NEb21DaGlsZHJlbi5sZW5ndGggPSAwO1xuXHRcdH1cblx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIG5ld1ZOb2RlLCBvbGRWTm9kZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fSBjb21taXRRdWV1ZSBMaXN0IG9mIGNvbXBvbmVudHNcbiAqIHdoaWNoIGhhdmUgY2FsbGJhY2tzIHRvIGludm9rZSBpbiBjb21taXRSb290XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gcm9vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbWl0Um9vdChjb21taXRRdWV1ZSwgcm9vdCkge1xuXHRpZiAob3B0aW9ucy5fY29tbWl0KSBvcHRpb25zLl9jb21taXQocm9vdCwgY29tbWl0UXVldWUpO1xuXG5cdGNvbW1pdFF1ZXVlLnNvbWUoYyA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIEB0cy1pZ25vcmUgUmV1c2UgdGhlIGNvbW1pdFF1ZXVlIHZhcmlhYmxlIGhlcmUgc28gdGhlIHR5cGUgY2hhbmdlc1xuXHRcdFx0Y29tbWl0UXVldWUgPSBjLl9yZW5kZXJDYWxsYmFja3M7XG5cdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MgPSBbXTtcblx0XHRcdGNvbW1pdFF1ZXVlLnNvbWUoY2IgPT4ge1xuXHRcdFx0XHQvLyBAdHMtaWdub3JlIFNlZSBhYm92ZSB0cy1pZ25vcmUgb24gY29tbWl0UXVldWVcblx0XHRcdFx0Y2IuY2FsbChjKTtcblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgYy5fdm5vZGUpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogRGlmZiB0d28gdmlydHVhbCBub2RlcyByZXByZXNlbnRpbmcgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IGRvbSBUaGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nXG4gKiB0aGUgdmlydHVhbCBub2RlcyBiZWluZyBkaWZmZWRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBuZXdWTm9kZSBUaGUgbmV3IHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG9sZFZOb2RlIFRoZSBvbGQgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge29iamVjdH0gZ2xvYmFsQ29udGV4dCBUaGUgY3VycmVudCBjb250ZXh0IG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBpc1N2ZyBXaGV0aGVyIG9yIG5vdCB0aGlzIERPTSBub2RlIGlzIGFuIFNWRyBub2RlXG4gKiBAcGFyYW0geyp9IGV4Y2Vzc0RvbUNoaWxkcmVuXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fSBjb21taXRRdWV1ZSBMaXN0IG9mIGNvbXBvbmVudHNcbiAqIHdoaWNoIGhhdmUgY2FsbGJhY2tzIHRvIGludm9rZSBpbiBjb21taXRSb290XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzSHlkcmF0aW5nIFdoZXRoZXIgb3Igbm90IHdlIGFyZSBpbiBoeWRyYXRpb25cbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gZGlmZkVsZW1lbnROb2Rlcyhcblx0ZG9tLFxuXHRuZXdWTm9kZSxcblx0b2xkVk5vZGUsXG5cdGdsb2JhbENvbnRleHQsXG5cdGlzU3ZnLFxuXHRleGNlc3NEb21DaGlsZHJlbixcblx0Y29tbWl0UXVldWUsXG5cdGlzSHlkcmF0aW5nXG4pIHtcblx0bGV0IG9sZFByb3BzID0gb2xkVk5vZGUucHJvcHM7XG5cdGxldCBuZXdQcm9wcyA9IG5ld1ZOb2RlLnByb3BzO1xuXHRsZXQgbm9kZVR5cGUgPSBuZXdWTm9kZS50eXBlO1xuXHRsZXQgaSA9IDA7XG5cblx0Ly8gVHJhY2tzIGVudGVyaW5nIGFuZCBleGl0aW5nIFNWRyBuYW1lc3BhY2Ugd2hlbiBkZXNjZW5kaW5nIHRocm91Z2ggdGhlIHRyZWUuXG5cdGlmIChub2RlVHlwZSA9PT0gJ3N2ZycpIGlzU3ZnID0gdHJ1ZTtcblxuXHRpZiAoZXhjZXNzRG9tQ2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdGZvciAoOyBpIDwgZXhjZXNzRG9tQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGNoaWxkID0gZXhjZXNzRG9tQ2hpbGRyZW5baV07XG5cblx0XHRcdC8vIGlmIG5ld1ZOb2RlIG1hdGNoZXMgYW4gZWxlbWVudCBpbiBleGNlc3NEb21DaGlsZHJlbiBvciB0aGUgYGRvbWBcblx0XHRcdC8vIGFyZ3VtZW50IG1hdGNoZXMgYW4gZWxlbWVudCBpbiBleGNlc3NEb21DaGlsZHJlbiwgcmVtb3ZlIGl0IGZyb21cblx0XHRcdC8vIGV4Y2Vzc0RvbUNoaWxkcmVuIHNvIGl0IGlzbid0IGxhdGVyIHJlbW92ZWQgaW4gZGlmZkNoaWxkcmVuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdGNoaWxkICYmXG5cdFx0XHRcdChjaGlsZCA9PT0gZG9tIHx8XG5cdFx0XHRcdFx0KG5vZGVUeXBlID8gY2hpbGQubG9jYWxOYW1lID09IG5vZGVUeXBlIDogY2hpbGQubm9kZVR5cGUgPT0gMykpXG5cdFx0XHQpIHtcblx0XHRcdFx0ZG9tID0gY2hpbGQ7XG5cdFx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuW2ldID0gbnVsbDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKGRvbSA9PSBudWxsKSB7XG5cdFx0aWYgKG5vZGVUeXBlID09PSBudWxsKSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlIGNyZWF0ZVRleHROb2RlIHJldHVybnMgVGV4dCwgd2UgZXhwZWN0IFByZWFjdEVsZW1lbnRcblx0XHRcdHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuZXdQcm9wcyk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzU3ZnKSB7XG5cdFx0XHRkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG5cdFx0XHRcdCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG5cdFx0XHRcdC8vIEB0cy1pZ25vcmUgV2Uga25vdyBgbmV3Vk5vZGUudHlwZWAgaXMgYSBzdHJpbmdcblx0XHRcdFx0bm9kZVR5cGVcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdC8vIEB0cy1pZ25vcmUgV2Uga25vdyBgbmV3Vk5vZGUudHlwZWAgaXMgYSBzdHJpbmdcblx0XHRcdFx0bm9kZVR5cGUsXG5cdFx0XHRcdG5ld1Byb3BzLmlzICYmIG5ld1Byb3BzXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8vIHdlIGNyZWF0ZWQgYSBuZXcgcGFyZW50LCBzbyBub25lIG9mIHRoZSBwcmV2aW91c2x5IGF0dGFjaGVkIGNoaWxkcmVuIGNhbiBiZSByZXVzZWQ6XG5cdFx0ZXhjZXNzRG9tQ2hpbGRyZW4gPSBudWxsO1xuXHRcdC8vIHdlIGFyZSBjcmVhdGluZyBhIG5ldyBub2RlLCBzbyB3ZSBjYW4gYXNzdW1lIHRoaXMgaXMgYSBuZXcgc3VidHJlZSAoaW4gY2FzZSB3ZSBhcmUgaHlkcmF0aW5nKSwgdGhpcyBkZW9wdHMgdGhlIGh5ZHJhdGVcblx0XHRpc0h5ZHJhdGluZyA9IGZhbHNlO1xuXHR9XG5cblx0aWYgKG5vZGVUeXBlID09PSBudWxsKSB7XG5cdFx0Ly8gRHVyaW5nIGh5ZHJhdGlvbiwgd2Ugc3RpbGwgaGF2ZSB0byBzcGxpdCBtZXJnZWQgdGV4dCBmcm9tIFNTUidkIEhUTUwuXG5cdFx0aWYgKG9sZFByb3BzICE9PSBuZXdQcm9wcyAmJiAoIWlzSHlkcmF0aW5nIHx8IGRvbS5kYXRhICE9PSBuZXdQcm9wcykpIHtcblx0XHRcdGRvbS5kYXRhID0gbmV3UHJvcHM7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIElmIGV4Y2Vzc0RvbUNoaWxkcmVuIHdhcyBub3QgbnVsbCwgcmVwb3B1bGF0ZSBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQncyBjaGlsZHJlbjpcblx0XHRleGNlc3NEb21DaGlsZHJlbiA9XG5cdFx0XHRleGNlc3NEb21DaGlsZHJlbiAmJiBFTVBUWV9BUlIuc2xpY2UuY2FsbChkb20uY2hpbGROb2Rlcyk7XG5cblx0XHRvbGRQcm9wcyA9IG9sZFZOb2RlLnByb3BzIHx8IEVNUFRZX09CSjtcblxuXHRcdGxldCBvbGRIdG1sID0gb2xkUHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw7XG5cdFx0bGV0IG5ld0h0bWwgPSBuZXdQcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTDtcblxuXHRcdC8vIER1cmluZyBoeWRyYXRpb24sIHByb3BzIGFyZSBub3QgZGlmZmVkIGF0IGFsbCAoaW5jbHVkaW5nIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKVxuXHRcdC8vIEBUT0RPIHdlIHNob3VsZCB3YXJuIGluIGRlYnVnIG1vZGUgd2hlbiBwcm9wcyBkb24ndCBtYXRjaCBoZXJlLlxuXHRcdGlmICghaXNIeWRyYXRpbmcpIHtcblx0XHRcdC8vIEJ1dCwgaWYgd2UgYXJlIGluIGEgc2l0dWF0aW9uIHdoZXJlIHdlIGFyZSB1c2luZyBleGlzdGluZyBET00gKGUuZy4gcmVwbGFjZU5vZGUpXG5cdFx0XHQvLyB3ZSBzaG91bGQgcmVhZCB0aGUgZXhpc3RpbmcgRE9NIGF0dHJpYnV0ZXMgdG8gZGlmZiB0aGVtXG5cdFx0XHRpZiAoZXhjZXNzRG9tQ2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0XHRvbGRQcm9wcyA9IHt9O1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRvbS5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b2xkUHJvcHNbZG9tLmF0dHJpYnV0ZXNbaV0ubmFtZV0gPSBkb20uYXR0cmlidXRlc1tpXS52YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobmV3SHRtbCB8fCBvbGRIdG1sKSB7XG5cdFx0XHRcdC8vIEF2b2lkIHJlLWFwcGx5aW5nIHRoZSBzYW1lICdfX2h0bWwnIGlmIGl0IGRpZCBub3QgY2hhbmdlZCBiZXR3ZWVuIHJlLXJlbmRlclxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0IW5ld0h0bWwgfHxcblx0XHRcdFx0XHQoKCFvbGRIdG1sIHx8IG5ld0h0bWwuX19odG1sICE9IG9sZEh0bWwuX19odG1sKSAmJlxuXHRcdFx0XHRcdFx0bmV3SHRtbC5fX2h0bWwgIT09IGRvbS5pbm5lckhUTUwpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGRvbS5pbm5lckhUTUwgPSAobmV3SHRtbCAmJiBuZXdIdG1sLl9faHRtbCkgfHwgJyc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRkaWZmUHJvcHMoZG9tLCBuZXdQcm9wcywgb2xkUHJvcHMsIGlzU3ZnLCBpc0h5ZHJhdGluZyk7XG5cblx0XHQvLyBJZiB0aGUgbmV3IHZub2RlIGRpZG4ndCBoYXZlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MLCBkaWZmIGl0cyBjaGlsZHJlblxuXHRcdGlmIChuZXdIdG1sKSB7XG5cdFx0XHRuZXdWTm9kZS5fY2hpbGRyZW4gPSBbXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aSA9IG5ld1ZOb2RlLnByb3BzLmNoaWxkcmVuO1xuXHRcdFx0ZGlmZkNoaWxkcmVuKFxuXHRcdFx0XHRkb20sXG5cdFx0XHRcdEFycmF5LmlzQXJyYXkoaSkgPyBpIDogW2ldLFxuXHRcdFx0XHRuZXdWTm9kZSxcblx0XHRcdFx0b2xkVk5vZGUsXG5cdFx0XHRcdGdsb2JhbENvbnRleHQsXG5cdFx0XHRcdGlzU3ZnICYmIG5vZGVUeXBlICE9PSAnZm9yZWlnbk9iamVjdCcsXG5cdFx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRcdFx0XHRjb21taXRRdWV1ZSxcblx0XHRcdFx0ZG9tLmZpcnN0Q2hpbGQsXG5cdFx0XHRcdGlzSHlkcmF0aW5nXG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBSZW1vdmUgY2hpbGRyZW4gdGhhdCBhcmUgbm90IHBhcnQgb2YgYW55IHZub2RlLlxuXHRcdFx0aWYgKGV4Y2Vzc0RvbUNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdFx0Zm9yIChpID0gZXhjZXNzRG9tQ2hpbGRyZW4ubGVuZ3RoOyBpLS07ICkge1xuXHRcdFx0XHRcdGlmIChleGNlc3NEb21DaGlsZHJlbltpXSAhPSBudWxsKSByZW1vdmVOb2RlKGV4Y2Vzc0RvbUNoaWxkcmVuW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIChhcyBhYm92ZSwgZG9uJ3QgZGlmZiBwcm9wcyBkdXJpbmcgaHlkcmF0aW9uKVxuXHRcdGlmICghaXNIeWRyYXRpbmcpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0J3ZhbHVlJyBpbiBuZXdQcm9wcyAmJlxuXHRcdFx0XHQoaSA9IG5ld1Byb3BzLnZhbHVlKSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdC8vICMyNzU2IEZvciB0aGUgPHByb2dyZXNzPi1lbGVtZW50IHRoZSBpbml0aWFsIHZhbHVlIGlzIDAsXG5cdFx0XHRcdC8vIGRlc3BpdGUgdGhlIGF0dHJpYnV0ZSBub3QgYmVpbmcgcHJlc2VudC4gV2hlbiB0aGUgYXR0cmlidXRlXG5cdFx0XHRcdC8vIGlzIG1pc3NpbmcgdGhlIHByb2dyZXNzIGJhciBpcyB0cmVhdGVkIGFzIGluZGV0ZXJtaW5hdGUuXG5cdFx0XHRcdC8vIFRvIGZpeCB0aGF0IHdlJ2xsIGFsd2F5cyB1cGRhdGUgaXQgd2hlbiBpdCBpcyAwIGZvciBwcm9ncmVzcyBlbGVtZW50c1xuXHRcdFx0XHQoaSAhPT0gZG9tLnZhbHVlIHx8IChub2RlVHlwZSA9PT0gJ3Byb2dyZXNzJyAmJiAhaSkpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2V0UHJvcGVydHkoZG9tLCAndmFsdWUnLCBpLCBvbGRQcm9wcy52YWx1ZSwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKFxuXHRcdFx0XHQnY2hlY2tlZCcgaW4gbmV3UHJvcHMgJiZcblx0XHRcdFx0KGkgPSBuZXdQcm9wcy5jaGVja2VkKSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdGkgIT09IGRvbS5jaGVja2VkXG5cdFx0XHQpIHtcblx0XHRcdFx0c2V0UHJvcGVydHkoZG9tLCAnY2hlY2tlZCcsIGksIG9sZFByb3BzLmNoZWNrZWQsIGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZG9tO1xufVxuXG4vKipcbiAqIEludm9rZSBvciB1cGRhdGUgYSByZWYsIGRlcGVuZGluZyBvbiB3aGV0aGVyIGl0IGlzIGEgZnVuY3Rpb24gb3Igb2JqZWN0IHJlZi5cbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSByZWZcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IHZub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVJlZihyZWYsIHZhbHVlLCB2bm9kZSkge1xuXHR0cnkge1xuXHRcdGlmICh0eXBlb2YgcmVmID09ICdmdW5jdGlvbicpIHJlZih2YWx1ZSk7XG5cdFx0ZWxzZSByZWYuY3VycmVudCA9IHZhbHVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0b3B0aW9ucy5fY2F0Y2hFcnJvcihlLCB2bm9kZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBVbm1vdW50IGEgdmlydHVhbCBub2RlIGZyb20gdGhlIHRyZWUgYW5kIGFwcGx5IERPTSBjaGFuZ2VzXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGUgVGhlIHZpcnR1YWwgbm9kZSB0byB1bm1vdW50XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gcGFyZW50Vk5vZGUgVGhlIHBhcmVudCBvZiB0aGUgVk5vZGUgdGhhdFxuICogaW5pdGlhdGVkIHRoZSB1bm1vdW50XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtza2lwUmVtb3ZlXSBGbGFnIHRoYXQgaW5kaWNhdGVzIHRoYXQgYSBwYXJlbnQgbm9kZSBvZiB0aGVcbiAqIGN1cnJlbnQgZWxlbWVudCBpcyBhbHJlYWR5IGRldGFjaGVkIGZyb20gdGhlIERPTS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVubW91bnQodm5vZGUsIHBhcmVudFZOb2RlLCBza2lwUmVtb3ZlKSB7XG5cdGxldCByO1xuXHRpZiAob3B0aW9ucy51bm1vdW50KSBvcHRpb25zLnVubW91bnQodm5vZGUpO1xuXG5cdGlmICgociA9IHZub2RlLnJlZikpIHtcblx0XHRpZiAoIXIuY3VycmVudCB8fCByLmN1cnJlbnQgPT09IHZub2RlLl9kb20pIGFwcGx5UmVmKHIsIG51bGwsIHBhcmVudFZOb2RlKTtcblx0fVxuXG5cdGxldCBkb207XG5cdGlmICghc2tpcFJlbW92ZSAmJiB0eXBlb2Ygdm5vZGUudHlwZSAhPSAnZnVuY3Rpb24nKSB7XG5cdFx0c2tpcFJlbW92ZSA9IChkb20gPSB2bm9kZS5fZG9tKSAhPSBudWxsO1xuXHR9XG5cblx0Ly8gTXVzdCBiZSBzZXQgdG8gYHVuZGVmaW5lZGAgdG8gcHJvcGVybHkgY2xlYW4gdXAgYF9uZXh0RG9tYFxuXHQvLyBmb3Igd2hpY2ggYG51bGxgIGlzIGEgdmFsaWQgdmFsdWUuIFNlZSBjb21tZW50IGluIGBjcmVhdGUtZWxlbWVudC5qc2Bcblx0dm5vZGUuX2RvbSA9IHZub2RlLl9uZXh0RG9tID0gdW5kZWZpbmVkO1xuXG5cdGlmICgociA9IHZub2RlLl9jb21wb25lbnQpICE9IG51bGwpIHtcblx0XHRpZiAoci5jb21wb25lbnRXaWxsVW5tb3VudCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ci5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIHBhcmVudFZOb2RlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyLmJhc2UgPSByLl9wYXJlbnREb20gPSBudWxsO1xuXHR9XG5cblx0aWYgKChyID0gdm5vZGUuX2NoaWxkcmVuKSkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgci5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHJbaV0pIHVubW91bnQocltpXSwgcGFyZW50Vk5vZGUsIHNraXBSZW1vdmUpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChkb20gIT0gbnVsbCkgcmVtb3ZlTm9kZShkb20pO1xufVxuXG4vKiogVGhlIGAucmVuZGVyKClgIG1ldGhvZCBmb3IgYSBQRkMgYmFja2luZyBpbnN0YW5jZS4gKi9cbmZ1bmN0aW9uIGRvUmVuZGVyKHByb3BzLCBzdGF0ZSwgY29udGV4dCkge1xuXHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCk7XG59XG4iLCJpbXBvcnQgeyBFTVBUWV9PQkosIEVNUFRZX0FSUiB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGNvbW1pdFJvb3QsIGRpZmYgfSBmcm9tICcuL2RpZmYvaW5kZXgnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgRnJhZ21lbnQgfSBmcm9tICcuL2NyZWF0ZS1lbGVtZW50JztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogUmVuZGVyIGEgUHJlYWN0IHZpcnR1YWwgbm9kZSBpbnRvIGEgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50Q2hpbGR9IHZub2RlIFRoZSB2aXJ0dWFsIG5vZGUgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IHBhcmVudERvbSBUaGUgRE9NIGVsZW1lbnQgdG9cbiAqIHJlbmRlciBpbnRvXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnQgfCBvYmplY3R9IFtyZXBsYWNlTm9kZV0gT3B0aW9uYWw6IEF0dGVtcHQgdG8gcmUtdXNlIGFuXG4gKiBleGlzdGluZyBET00gdHJlZSByb290ZWQgYXQgYHJlcGxhY2VOb2RlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHZub2RlLCBwYXJlbnREb20sIHJlcGxhY2VOb2RlKSB7XG5cdGlmIChvcHRpb25zLl9yb290KSBvcHRpb25zLl9yb290KHZub2RlLCBwYXJlbnREb20pO1xuXG5cdC8vIFdlIGFidXNlIHRoZSBgcmVwbGFjZU5vZGVgIHBhcmFtZXRlciBpbiBgaHlkcmF0ZSgpYCB0byBzaWduYWwgaWYgd2UgYXJlIGluXG5cdC8vIGh5ZHJhdGlvbiBtb2RlIG9yIG5vdCBieSBwYXNzaW5nIHRoZSBgaHlkcmF0ZWAgZnVuY3Rpb24gaW5zdGVhZCBvZiBhIERPTVxuXHQvLyBlbGVtZW50Li5cblx0bGV0IGlzSHlkcmF0aW5nID0gdHlwZW9mIHJlcGxhY2VOb2RlID09PSAnZnVuY3Rpb24nO1xuXG5cdC8vIFRvIGJlIGFibGUgdG8gc3VwcG9ydCBjYWxsaW5nIGByZW5kZXIoKWAgbXVsdGlwbGUgdGltZXMgb24gdGhlIHNhbWVcblx0Ly8gRE9NIG5vZGUsIHdlIG5lZWQgdG8gb2J0YWluIGEgcmVmZXJlbmNlIHRvIHRoZSBwcmV2aW91cyB0cmVlLiBXZSBkb1xuXHQvLyB0aGlzIGJ5IGFzc2lnbmluZyBhIG5ldyBgX2NoaWxkcmVuYCBwcm9wZXJ0eSB0byBET00gbm9kZXMgd2hpY2ggcG9pbnRzXG5cdC8vIHRvIHRoZSBsYXN0IHJlbmRlcmVkIHRyZWUuIEJ5IGRlZmF1bHQgdGhpcyBwcm9wZXJ0eSBpcyBub3QgcHJlc2VudCwgd2hpY2hcblx0Ly8gbWVhbnMgdGhhdCB3ZSBhcmUgbW91bnRpbmcgYSBuZXcgdHJlZSBmb3IgdGhlIGZpcnN0IHRpbWUuXG5cdGxldCBvbGRWTm9kZSA9IGlzSHlkcmF0aW5nXG5cdFx0PyBudWxsXG5cdFx0OiAocmVwbGFjZU5vZGUgJiYgcmVwbGFjZU5vZGUuX2NoaWxkcmVuKSB8fCBwYXJlbnREb20uX2NoaWxkcmVuO1xuXG5cdHZub2RlID0gKFxuXHRcdCghaXNIeWRyYXRpbmcgJiYgcmVwbGFjZU5vZGUpIHx8XG5cdFx0cGFyZW50RG9tXG5cdCkuX2NoaWxkcmVuID0gY3JlYXRlRWxlbWVudChGcmFnbWVudCwgbnVsbCwgW3Zub2RlXSk7XG5cblx0Ly8gTGlzdCBvZiBlZmZlY3RzIHRoYXQgbmVlZCB0byBiZSBjYWxsZWQgYWZ0ZXIgZGlmZmluZy5cblx0bGV0IGNvbW1pdFF1ZXVlID0gW107XG5cdGRpZmYoXG5cdFx0cGFyZW50RG9tLFxuXHRcdC8vIERldGVybWluZSB0aGUgbmV3IHZub2RlIHRyZWUgYW5kIHN0b3JlIGl0IG9uIHRoZSBET00gZWxlbWVudCBvblxuXHRcdC8vIG91ciBjdXN0b20gYF9jaGlsZHJlbmAgcHJvcGVydHkuXG5cdFx0dm5vZGUsXG5cdFx0b2xkVk5vZGUgfHwgRU1QVFlfT0JKLFxuXHRcdEVNUFRZX09CSixcblx0XHRwYXJlbnREb20ub3duZXJTVkdFbGVtZW50ICE9PSB1bmRlZmluZWQsXG5cdFx0IWlzSHlkcmF0aW5nICYmIHJlcGxhY2VOb2RlXG5cdFx0XHQ/IFtyZXBsYWNlTm9kZV1cblx0XHRcdDogb2xkVk5vZGVcblx0XHRcdD8gbnVsbFxuXHRcdFx0OiBwYXJlbnREb20uZmlyc3RDaGlsZFxuXHRcdFx0PyBFTVBUWV9BUlIuc2xpY2UuY2FsbChwYXJlbnREb20uY2hpbGROb2Rlcylcblx0XHRcdDogbnVsbCxcblx0XHRjb21taXRRdWV1ZSxcblx0XHQhaXNIeWRyYXRpbmcgJiYgcmVwbGFjZU5vZGVcblx0XHRcdD8gcmVwbGFjZU5vZGVcblx0XHRcdDogb2xkVk5vZGVcblx0XHRcdD8gb2xkVk5vZGUuX2RvbVxuXHRcdFx0OiBwYXJlbnREb20uZmlyc3RDaGlsZCxcblx0XHRpc0h5ZHJhdGluZ1xuXHQpO1xuXG5cdC8vIEZsdXNoIGFsbCBxdWV1ZWQgZWZmZWN0c1xuXHRjb21taXRSb290KGNvbW1pdFF1ZXVlLCB2bm9kZSk7XG59XG5cbi8qKlxuICogVXBkYXRlIGFuIGV4aXN0aW5nIERPTSBlbGVtZW50IHdpdGggZGF0YSBmcm9tIGEgUHJlYWN0IHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnRDaGlsZH0gdm5vZGUgVGhlIHZpcnR1YWwgbm9kZSB0byByZW5kZXJcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gcGFyZW50RG9tIFRoZSBET00gZWxlbWVudCB0b1xuICogdXBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRlKHZub2RlLCBwYXJlbnREb20pIHtcblx0cmVuZGVyKHZub2RlLCBwYXJlbnREb20sIGh5ZHJhdGUpO1xufVxuIiwiaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IGNyZWF0ZVZOb2RlIH0gZnJvbSAnLi9jcmVhdGUtZWxlbWVudCc7XG5cbi8qKlxuICogQ2xvbmVzIHRoZSBnaXZlbiBWTm9kZSwgb3B0aW9uYWxseSBhZGRpbmcgYXR0cmlidXRlcy9wcm9wcyBhbmQgcmVwbGFjaW5nIGl0cyBjaGlsZHJlbi5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9IHZub2RlIFRoZSB2aXJ0dWFsIERPTSBlbGVtZW50IHRvIGNsb25lXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgQXR0cmlidXRlcy9wcm9wcyB0byBhZGQgd2hlbiBjbG9uaW5nXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudENoaWxkcmVuPn0gcmVzdCBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgd2lsbCBiZSB1c2VkIGFzIHJlcGxhY2VtZW50IGNoaWxkcmVuLlxuICogQHJldHVybnMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVFbGVtZW50KHZub2RlLCBwcm9wcywgY2hpbGRyZW4pIHtcblx0bGV0IG5vcm1hbGl6ZWRQcm9wcyA9IGFzc2lnbih7fSwgdm5vZGUucHJvcHMpLFxuXHRcdGtleSxcblx0XHRyZWYsXG5cdFx0aTtcblx0Zm9yIChpIGluIHByb3BzKSB7XG5cdFx0aWYgKGkgPT0gJ2tleScpIGtleSA9IHByb3BzW2ldO1xuXHRcdGVsc2UgaWYgKGkgPT0gJ3JlZicpIHJlZiA9IHByb3BzW2ldO1xuXHRcdGVsc2Ugbm9ybWFsaXplZFByb3BzW2ldID0gcHJvcHNbaV07XG5cdH1cblxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDMpIHtcblx0XHRjaGlsZHJlbiA9IFtjaGlsZHJlbl07XG5cdFx0Zm9yIChpID0gMzsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y2hpbGRyZW4ucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdH1cblx0fVxuXHRpZiAoY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdG5vcm1hbGl6ZWRQcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuXHR9XG5cblx0cmV0dXJuIGNyZWF0ZVZOb2RlKFxuXHRcdHZub2RlLnR5cGUsXG5cdFx0bm9ybWFsaXplZFByb3BzLFxuXHRcdGtleSB8fCB2bm9kZS5rZXksXG5cdFx0cmVmIHx8IHZub2RlLnJlZixcblx0XHRudWxsXG5cdCk7XG59XG4iLCIvKipcbiAqIEZpbmQgdGhlIGNsb3Nlc3QgZXJyb3IgYm91bmRhcnkgdG8gYSB0aHJvd24gZXJyb3IgYW5kIGNhbGwgaXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvciBUaGUgdGhyb3duIHZhbHVlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGUgVGhlIHZub2RlIHRoYXQgdGhyZXdcbiAqIHRoZSBlcnJvciB0aGF0IHdhcyBjYXVnaHQgKGV4Y2VwdCBmb3IgdW5tb3VudGluZyB3aGVuIHRoaXMgcGFyYW1ldGVyXG4gKiBpcyB0aGUgaGlnaGVzdCBwYXJlbnQgdGhhdCB3YXMgYmVpbmcgdW5tb3VudGVkKVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NhdGNoRXJyb3IoZXJyb3IsIHZub2RlKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gKi9cblx0bGV0IGNvbXBvbmVudCwgY3RvciwgaGFuZGxlZDtcblxuXHRmb3IgKDsgKHZub2RlID0gdm5vZGUuX3BhcmVudCk7ICkge1xuXHRcdGlmICgoY29tcG9uZW50ID0gdm5vZGUuX2NvbXBvbmVudCkgJiYgIWNvbXBvbmVudC5fcHJvY2Vzc2luZ0V4Y2VwdGlvbikge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y3RvciA9IGNvbXBvbmVudC5jb25zdHJ1Y3RvcjtcblxuXHRcdFx0XHRpZiAoY3RvciAmJiBjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvciAhPSBudWxsKSB7XG5cdFx0XHRcdFx0Y29tcG9uZW50LnNldFN0YXRlKGN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yKGVycm9yKSk7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IGNvbXBvbmVudC5fZGlydHk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY29tcG9uZW50LmNvbXBvbmVudERpZENhdGNoICE9IG51bGwpIHtcblx0XHRcdFx0XHRjb21wb25lbnQuY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IpO1xuXHRcdFx0XHRcdGhhbmRsZWQgPSBjb21wb25lbnQuX2RpcnR5O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVGhpcyBpcyBhbiBlcnJvciBib3VuZGFyeS4gTWFyayBpdCBhcyBoYXZpbmcgYmFpbGVkIG91dCwgYW5kIHdoZXRoZXIgaXQgd2FzIG1pZC1oeWRyYXRpb24uXG5cdFx0XHRcdGlmIChoYW5kbGVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIChjb21wb25lbnQuX3BlbmRpbmdFcnJvciA9IGNvbXBvbmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0ZXJyb3IgPSBlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHRocm93IGVycm9yO1xufVxuIiwiaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJ3ByZWFjdCc7XG5cbi8qKiBAdHlwZSB7bnVtYmVyfSAqL1xubGV0IGN1cnJlbnRJbmRleDtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9ICovXG5sZXQgY3VycmVudENvbXBvbmVudDtcbi8qKlxuICogS2VlcCB0cmFjayBvZiB0aGUgcHJldmlvdXMgY29tcG9uZW50IHNvIHRoYXQgd2UgY2FuIHNldFxuICogYGN1cnJlbnRDb21wb25lbnRgIHRvIGBudWxsYCBhbmQgdGhyb3cgd2hlbiBhIGhvb2sgaXMgaW52b2tlZFxuICogb3V0c2lkZSBvZiByZW5kZXJcbiAqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9XG4gKi9cbmxldCBwcmV2aW91c0NvbXBvbmVudDtcblxuLyoqIEB0eXBlIHtudW1iZXJ9ICovXG5sZXQgY3VycmVudEhvb2sgPSAwO1xuXG4vKiogQHR5cGUge0FycmF5PGltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59ICovXG5sZXQgYWZ0ZXJQYWludEVmZmVjdHMgPSBbXTtcblxubGV0IG9sZEJlZm9yZURpZmYgPSBvcHRpb25zLl9kaWZmO1xubGV0IG9sZEJlZm9yZVJlbmRlciA9IG9wdGlvbnMuX3JlbmRlcjtcbmxldCBvbGRBZnRlckRpZmYgPSBvcHRpb25zLmRpZmZlZDtcbmxldCBvbGRDb21taXQgPSBvcHRpb25zLl9jb21taXQ7XG5sZXQgb2xkQmVmb3JlVW5tb3VudCA9IG9wdGlvbnMudW5tb3VudDtcblxuY29uc3QgUkFGX1RJTUVPVVQgPSAxMDA7XG5sZXQgcHJldlJhZjtcblxub3B0aW9ucy5fZGlmZiA9IHZub2RlID0+IHtcblx0Y3VycmVudENvbXBvbmVudCA9IG51bGw7XG5cdGlmIChvbGRCZWZvcmVEaWZmKSBvbGRCZWZvcmVEaWZmKHZub2RlKTtcbn07XG5cbm9wdGlvbnMuX3JlbmRlciA9IHZub2RlID0+IHtcblx0aWYgKG9sZEJlZm9yZVJlbmRlcikgb2xkQmVmb3JlUmVuZGVyKHZub2RlKTtcblxuXHRjdXJyZW50Q29tcG9uZW50ID0gdm5vZGUuX2NvbXBvbmVudDtcblx0Y3VycmVudEluZGV4ID0gMDtcblxuXHRjb25zdCBob29rcyA9IGN1cnJlbnRDb21wb25lbnQuX19ob29rcztcblx0aWYgKGhvb2tzKSB7XG5cdFx0aG9va3MuX3BlbmRpbmdFZmZlY3RzLmZvckVhY2goaW52b2tlQ2xlYW51cCk7XG5cdFx0aG9va3MuX3BlbmRpbmdFZmZlY3RzLmZvckVhY2goaW52b2tlRWZmZWN0KTtcblx0XHRob29rcy5fcGVuZGluZ0VmZmVjdHMgPSBbXTtcblx0fVxufTtcblxub3B0aW9ucy5kaWZmZWQgPSB2bm9kZSA9PiB7XG5cdGlmIChvbGRBZnRlckRpZmYpIG9sZEFmdGVyRGlmZih2bm9kZSk7XG5cblx0Y29uc3QgYyA9IHZub2RlLl9jb21wb25lbnQ7XG5cdGlmIChjICYmIGMuX19ob29rcyAmJiBjLl9faG9va3MuX3BlbmRpbmdFZmZlY3RzLmxlbmd0aCkge1xuXHRcdGFmdGVyUGFpbnQoYWZ0ZXJQYWludEVmZmVjdHMucHVzaChjKSk7XG5cdH1cblx0Y3VycmVudENvbXBvbmVudCA9IHByZXZpb3VzQ29tcG9uZW50O1xufTtcblxub3B0aW9ucy5fY29tbWl0ID0gKHZub2RlLCBjb21taXRRdWV1ZSkgPT4ge1xuXHRjb21taXRRdWV1ZS5zb21lKGNvbXBvbmVudCA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbXBvbmVudC5fcmVuZGVyQ2FsbGJhY2tzLmZvckVhY2goaW52b2tlQ2xlYW51cCk7XG5cdFx0XHRjb21wb25lbnQuX3JlbmRlckNhbGxiYWNrcyA9IGNvbXBvbmVudC5fcmVuZGVyQ2FsbGJhY2tzLmZpbHRlcihjYiA9PlxuXHRcdFx0XHRjYi5fdmFsdWUgPyBpbnZva2VFZmZlY3QoY2IpIDogdHJ1ZVxuXHRcdFx0KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb21taXRRdWV1ZS5zb21lKGMgPT4ge1xuXHRcdFx0XHRpZiAoYy5fcmVuZGVyQ2FsbGJhY2tzKSBjLl9yZW5kZXJDYWxsYmFja3MgPSBbXTtcblx0XHRcdH0pO1xuXHRcdFx0Y29tbWl0UXVldWUgPSBbXTtcblx0XHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgY29tcG9uZW50Ll92bm9kZSk7XG5cdFx0fVxuXHR9KTtcblxuXHRpZiAob2xkQ29tbWl0KSBvbGRDb21taXQodm5vZGUsIGNvbW1pdFF1ZXVlKTtcbn07XG5cbm9wdGlvbnMudW5tb3VudCA9IHZub2RlID0+IHtcblx0aWYgKG9sZEJlZm9yZVVubW91bnQpIG9sZEJlZm9yZVVubW91bnQodm5vZGUpO1xuXG5cdGNvbnN0IGMgPSB2bm9kZS5fY29tcG9uZW50O1xuXHRpZiAoYyAmJiBjLl9faG9va3MpIHtcblx0XHR0cnkge1xuXHRcdFx0Yy5fX2hvb2tzLl9saXN0LmZvckVhY2goaW52b2tlQ2xlYW51cCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0b3B0aW9ucy5fY2F0Y2hFcnJvcihlLCBjLl92bm9kZSk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIEdldCBhIGhvb2sncyBzdGF0ZSBmcm9tIHRoZSBjdXJyZW50Q29tcG9uZW50XG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBob29rIHRvIGdldFxuICogQHBhcmFtIHtudW1iZXJ9IHR5cGUgVGhlIGluZGV4IG9mIHRoZSBob29rIHRvIGdldFxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZ2V0SG9va1N0YXRlKGluZGV4LCB0eXBlKSB7XG5cdGlmIChvcHRpb25zLl9ob29rKSB7XG5cdFx0b3B0aW9ucy5faG9vayhjdXJyZW50Q29tcG9uZW50LCBpbmRleCwgY3VycmVudEhvb2sgfHwgdHlwZSk7XG5cdH1cblx0Y3VycmVudEhvb2sgPSAwO1xuXG5cdC8vIExhcmdlbHkgaW5zcGlyZWQgYnk6XG5cdC8vICogaHR0cHM6Ly9naXRodWIuY29tL21pY2hhZWwta2xlaW4vZnVuY3kuanMvYmxvYi9mNmJlNzM0NjhlNmVjNDZiMGZmNWFhM2NjNGM5YmFmNzJhMjkwMjVhL3NyYy9ob29rcy9jb3JlX2hvb2tzLm1qc1xuXHQvLyAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNoYWVsLWtsZWluL2Z1bmN5LmpzL2Jsb2IvNjUwYmVhYTU4YzQzYzMzYTc0ODIwYTNjOThiM2M3MDc5Y2YyZTMzMy9zcmMvcmVuZGVyZXIubWpzXG5cdC8vIE90aGVyIGltcGxlbWVudGF0aW9ucyB0byBsb29rIGF0OlxuXHQvLyAqIGh0dHBzOi8vY29kZXNhbmRib3guaW8vcy9tbm94MDVxcDhcblx0Y29uc3QgaG9va3MgPVxuXHRcdGN1cnJlbnRDb21wb25lbnQuX19ob29rcyB8fFxuXHRcdChjdXJyZW50Q29tcG9uZW50Ll9faG9va3MgPSB7XG5cdFx0XHRfbGlzdDogW10sXG5cdFx0XHRfcGVuZGluZ0VmZmVjdHM6IFtdXG5cdFx0fSk7XG5cblx0aWYgKGluZGV4ID49IGhvb2tzLl9saXN0Lmxlbmd0aCkge1xuXHRcdGhvb2tzLl9saXN0LnB1c2goe30pO1xuXHR9XG5cdHJldHVybiBob29rcy5fbGlzdFtpbmRleF07XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW5kZXgnKS5TdGF0ZVVwZGF0ZXI8YW55Pn0gW2luaXRpYWxTdGF0ZV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVN0YXRlKGluaXRpYWxTdGF0ZSkge1xuXHRjdXJyZW50SG9vayA9IDE7XG5cdHJldHVybiB1c2VSZWR1Y2VyKGludm9rZU9yUmV0dXJuLCBpbml0aWFsU3RhdGUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2luZGV4JykuUmVkdWNlcjxhbnksIGFueT59IHJlZHVjZXJcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2luZGV4JykuU3RhdGVVcGRhdGVyPGFueT59IGluaXRpYWxTdGF0ZVxuICogQHBhcmFtIHsoaW5pdGlhbFN0YXRlOiBhbnkpID0+IHZvaWR9IFtpbml0XVxuICogQHJldHVybnMge1sgYW55LCAoc3RhdGU6IGFueSkgPT4gdm9pZCBdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlUmVkdWNlcihyZWR1Y2VyLCBpbml0aWFsU3RhdGUsIGluaXQpIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5SZWR1Y2VySG9va1N0YXRlfSAqL1xuXHRjb25zdCBob29rU3RhdGUgPSBnZXRIb29rU3RhdGUoY3VycmVudEluZGV4KyssIDIpO1xuXHRob29rU3RhdGUuX3JlZHVjZXIgPSByZWR1Y2VyO1xuXHRpZiAoIWhvb2tTdGF0ZS5fY29tcG9uZW50KSB7XG5cdFx0aG9va1N0YXRlLl92YWx1ZSA9IFtcblx0XHRcdCFpbml0ID8gaW52b2tlT3JSZXR1cm4odW5kZWZpbmVkLCBpbml0aWFsU3RhdGUpIDogaW5pdChpbml0aWFsU3RhdGUpLFxuXG5cdFx0XHRhY3Rpb24gPT4ge1xuXHRcdFx0XHRjb25zdCBuZXh0VmFsdWUgPSBob29rU3RhdGUuX3JlZHVjZXIoaG9va1N0YXRlLl92YWx1ZVswXSwgYWN0aW9uKTtcblx0XHRcdFx0aWYgKGhvb2tTdGF0ZS5fdmFsdWVbMF0gIT09IG5leHRWYWx1ZSkge1xuXHRcdFx0XHRcdGhvb2tTdGF0ZS5fdmFsdWUgPSBbbmV4dFZhbHVlLCBob29rU3RhdGUuX3ZhbHVlWzFdXTtcblx0XHRcdFx0XHRob29rU3RhdGUuX2NvbXBvbmVudC5zZXRTdGF0ZSh7fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRdO1xuXG5cdFx0aG9va1N0YXRlLl9jb21wb25lbnQgPSBjdXJyZW50Q29tcG9uZW50O1xuXHR9XG5cblx0cmV0dXJuIGhvb2tTdGF0ZS5fdmFsdWU7XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5FZmZlY3R9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VFZmZlY3QoY2FsbGJhY2ssIGFyZ3MpIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5FZmZlY3RIb29rU3RhdGV9ICovXG5cdGNvbnN0IHN0YXRlID0gZ2V0SG9va1N0YXRlKGN1cnJlbnRJbmRleCsrLCAzKTtcblx0aWYgKCFvcHRpb25zLl9za2lwRWZmZWN0cyAmJiBhcmdzQ2hhbmdlZChzdGF0ZS5fYXJncywgYXJncykpIHtcblx0XHRzdGF0ZS5fdmFsdWUgPSBjYWxsYmFjaztcblx0XHRzdGF0ZS5fYXJncyA9IGFyZ3M7XG5cblx0XHRjdXJyZW50Q29tcG9uZW50Ll9faG9va3MuX3BlbmRpbmdFZmZlY3RzLnB1c2goc3RhdGUpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5FZmZlY3R9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VMYXlvdXRFZmZlY3QoY2FsbGJhY2ssIGFyZ3MpIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5FZmZlY3RIb29rU3RhdGV9ICovXG5cdGNvbnN0IHN0YXRlID0gZ2V0SG9va1N0YXRlKGN1cnJlbnRJbmRleCsrLCA0KTtcblx0aWYgKCFvcHRpb25zLl9za2lwRWZmZWN0cyAmJiBhcmdzQ2hhbmdlZChzdGF0ZS5fYXJncywgYXJncykpIHtcblx0XHRzdGF0ZS5fdmFsdWUgPSBjYWxsYmFjaztcblx0XHRzdGF0ZS5fYXJncyA9IGFyZ3M7XG5cblx0XHRjdXJyZW50Q29tcG9uZW50Ll9yZW5kZXJDYWxsYmFja3MucHVzaChzdGF0ZSk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJlZihpbml0aWFsVmFsdWUpIHtcblx0Y3VycmVudEhvb2sgPSA1O1xuXHRyZXR1cm4gdXNlTWVtbygoKSA9PiAoeyBjdXJyZW50OiBpbml0aWFsVmFsdWUgfSksIFtdKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gcmVmXG4gKiBAcGFyYW0geygpID0+IG9iamVjdH0gY3JlYXRlSGFuZGxlXG4gKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgY3JlYXRlSGFuZGxlLCBhcmdzKSB7XG5cdGN1cnJlbnRIb29rID0gNjtcblx0dXNlTGF5b3V0RWZmZWN0KFxuXHRcdCgpID0+IHtcblx0XHRcdGlmICh0eXBlb2YgcmVmID09ICdmdW5jdGlvbicpIHJlZihjcmVhdGVIYW5kbGUoKSk7XG5cdFx0XHRlbHNlIGlmIChyZWYpIHJlZi5jdXJyZW50ID0gY3JlYXRlSGFuZGxlKCk7XG5cdFx0fSxcblx0XHRhcmdzID09IG51bGwgPyBhcmdzIDogYXJncy5jb25jYXQocmVmKVxuXHQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7KCkgPT4gYW55fSBmYWN0b3J5XG4gKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VNZW1vKGZhY3RvcnksIGFyZ3MpIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5NZW1vSG9va1N0YXRlfSAqL1xuXHRjb25zdCBzdGF0ZSA9IGdldEhvb2tTdGF0ZShjdXJyZW50SW5kZXgrKywgNyk7XG5cdGlmIChhcmdzQ2hhbmdlZChzdGF0ZS5fYXJncywgYXJncykpIHtcblx0XHRzdGF0ZS5fdmFsdWUgPSBmYWN0b3J5KCk7XG5cdFx0c3RhdGUuX2FyZ3MgPSBhcmdzO1xuXHRcdHN0YXRlLl9mYWN0b3J5ID0gZmFjdG9yeTtcblx0fVxuXG5cdHJldHVybiBzdGF0ZS5fdmFsdWU7XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FsbGJhY2soY2FsbGJhY2ssIGFyZ3MpIHtcblx0Y3VycmVudEhvb2sgPSA4O1xuXHRyZXR1cm4gdXNlTWVtbygoKSA9PiBjYWxsYmFjaywgYXJncyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5QcmVhY3RDb250ZXh0fSBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VDb250ZXh0KGNvbnRleHQpIHtcblx0Y29uc3QgcHJvdmlkZXIgPSBjdXJyZW50Q29tcG9uZW50LmNvbnRleHRbY29udGV4dC5faWRdO1xuXHQvLyBXZSBjb3VsZCBza2lwIHRoaXMgY2FsbCBoZXJlLCBidXQgdGhhbiB3ZSdkIG5vdCBjYWxsXG5cdC8vIGBvcHRpb25zLl9ob29rYC4gV2UgbmVlZCB0byBkbyB0aGF0IGluIG9yZGVyIHRvIG1ha2Vcblx0Ly8gdGhlIGRldnRvb2xzIGF3YXJlIG9mIHRoaXMgaG9vay5cblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db250ZXh0SG9va1N0YXRlfSAqL1xuXHRjb25zdCBzdGF0ZSA9IGdldEhvb2tTdGF0ZShjdXJyZW50SW5kZXgrKywgOSk7XG5cdC8vIFRoZSBkZXZ0b29scyBuZWVkcyBhY2Nlc3MgdG8gdGhlIGNvbnRleHQgb2JqZWN0IHRvXG5cdC8vIGJlIGFibGUgdG8gcHVsbCBvZiB0aGUgZGVmYXVsdCB2YWx1ZSB3aGVuIG5vIHByb3ZpZGVyXG5cdC8vIGlzIHByZXNlbnQgaW4gdGhlIHRyZWUuXG5cdHN0YXRlLl9jb250ZXh0ID0gY29udGV4dDtcblx0aWYgKCFwcm92aWRlcikgcmV0dXJuIGNvbnRleHQuX2RlZmF1bHRWYWx1ZTtcblx0Ly8gVGhpcyBpcyBwcm9iYWJseSBub3Qgc2FmZSB0byBjb252ZXJ0IHRvIFwiIVwiXG5cdGlmIChzdGF0ZS5fdmFsdWUgPT0gbnVsbCkge1xuXHRcdHN0YXRlLl92YWx1ZSA9IHRydWU7XG5cdFx0cHJvdmlkZXIuc3ViKGN1cnJlbnRDb21wb25lbnQpO1xuXHR9XG5cdHJldHVybiBwcm92aWRlci5wcm9wcy52YWx1ZTtcbn1cblxuLyoqXG4gKiBEaXNwbGF5IGEgY3VzdG9tIGxhYmVsIGZvciBhIGN1c3RvbSBob29rIGZvciB0aGUgZGV2dG9vbHMgcGFuZWxcbiAqIEB0eXBlIHs8VD4odmFsdWU6IFQsIGNiPzogKHZhbHVlOiBUKSA9PiBzdHJpbmcgfCBudW1iZXIpID0+IHZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VEZWJ1Z1ZhbHVlKHZhbHVlLCBmb3JtYXR0ZXIpIHtcblx0aWYgKG9wdGlvbnMudXNlRGVidWdWYWx1ZSkge1xuXHRcdG9wdGlvbnMudXNlRGVidWdWYWx1ZShmb3JtYXR0ZXIgPyBmb3JtYXR0ZXIodmFsdWUpIDogdmFsdWUpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHsoZXJyb3I6IGFueSkgPT4gdm9pZH0gY2JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUVycm9yQm91bmRhcnkoY2IpIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5FcnJvckJvdW5kYXJ5SG9va1N0YXRlfSAqL1xuXHRjb25zdCBzdGF0ZSA9IGdldEhvb2tTdGF0ZShjdXJyZW50SW5kZXgrKywgMTApO1xuXHRjb25zdCBlcnJTdGF0ZSA9IHVzZVN0YXRlKCk7XG5cdHN0YXRlLl92YWx1ZSA9IGNiO1xuXHRpZiAoIWN1cnJlbnRDb21wb25lbnQuY29tcG9uZW50RGlkQ2F0Y2gpIHtcblx0XHRjdXJyZW50Q29tcG9uZW50LmNvbXBvbmVudERpZENhdGNoID0gZXJyID0+IHtcblx0XHRcdGlmIChzdGF0ZS5fdmFsdWUpIHN0YXRlLl92YWx1ZShlcnIpO1xuXHRcdFx0ZXJyU3RhdGVbMV0oZXJyKTtcblx0XHR9O1xuXHR9XG5cdHJldHVybiBbXG5cdFx0ZXJyU3RhdGVbMF0sXG5cdFx0KCkgPT4ge1xuXHRcdFx0ZXJyU3RhdGVbMV0odW5kZWZpbmVkKTtcblx0XHR9XG5cdF07XG59XG5cbi8qKlxuICogQWZ0ZXIgcGFpbnQgZWZmZWN0cyBjb25zdW1lci5cbiAqL1xuZnVuY3Rpb24gZmx1c2hBZnRlclBhaW50RWZmZWN0cygpIHtcblx0YWZ0ZXJQYWludEVmZmVjdHMuZm9yRWFjaChjb21wb25lbnQgPT4ge1xuXHRcdGlmIChjb21wb25lbnQuX3BhcmVudERvbSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29tcG9uZW50Ll9faG9va3MuX3BlbmRpbmdFZmZlY3RzLmZvckVhY2goaW52b2tlQ2xlYW51cCk7XG5cdFx0XHRcdGNvbXBvbmVudC5fX2hvb2tzLl9wZW5kaW5nRWZmZWN0cy5mb3JFYWNoKGludm9rZUVmZmVjdCk7XG5cdFx0XHRcdGNvbXBvbmVudC5fX2hvb2tzLl9wZW5kaW5nRWZmZWN0cyA9IFtdO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRjb21wb25lbnQuX19ob29rcy5fcGVuZGluZ0VmZmVjdHMgPSBbXTtcblx0XHRcdFx0b3B0aW9ucy5fY2F0Y2hFcnJvcihlLCBjb21wb25lbnQuX3Zub2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXHRhZnRlclBhaW50RWZmZWN0cyA9IFtdO1xufVxuXG5sZXQgSEFTX1JBRiA9IHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT0gJ2Z1bmN0aW9uJztcblxuLyoqXG4gKiBTY2hlZHVsZSBhIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGJyb3dzZXIgaGFzIGEgY2hhbmNlIHRvIHBhaW50IGEgbmV3IGZyYW1lLlxuICogRG8gdGhpcyBieSBjb21iaW5pbmcgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIChyQUYpICsgc2V0VGltZW91dCB0byBpbnZva2UgYSBjYWxsYmFjayBhZnRlclxuICogdGhlIG5leHQgYnJvd3NlciBmcmFtZS5cbiAqXG4gKiBBbHNvLCBzY2hlZHVsZSBhIHRpbWVvdXQgaW4gcGFyYWxsZWwgdG8gdGhlIHRoZSByQUYgdG8gZW5zdXJlIHRoZSBjYWxsYmFjayBpcyBpbnZva2VkXG4gKiBldmVuIGlmIFJBRiBkb2Vzbid0IGZpcmUgKGZvciBleGFtcGxlIGlmIHRoZSBicm93c2VyIHRhYiBpcyBub3QgdmlzaWJsZSlcbiAqXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGFmdGVyTmV4dEZyYW1lKGNhbGxiYWNrKSB7XG5cdGNvbnN0IGRvbmUgPSAoKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdGlmIChIQVNfUkFGKSBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xuXHRcdHNldFRpbWVvdXQoY2FsbGJhY2spO1xuXHR9O1xuXHRjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dChkb25lLCBSQUZfVElNRU9VVCk7XG5cblx0bGV0IHJhZjtcblx0aWYgKEhBU19SQUYpIHtcblx0XHRyYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9uZSk7XG5cdH1cbn1cblxuLy8gTm90ZTogaWYgc29tZW9uZSB1c2VkIG9wdGlvbnMuZGVib3VuY2VSZW5kZXJpbmcgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4vLyB0aGVuIGVmZmVjdHMgd2lsbCBBTFdBWVMgcnVuIG9uIHRoZSBORVhUIGZyYW1lIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgb25lLCBpbmN1cnJpbmcgYSB+MTZtcyBkZWxheS5cbi8vIFBlcmhhcHMgdGhpcyBpcyBub3Qgc3VjaCBhIGJpZyBkZWFsLlxuLyoqXG4gKiBTY2hlZHVsZSBhZnRlclBhaW50RWZmZWN0cyBmbHVzaCBhZnRlciB0aGUgYnJvd3NlciBwYWludHNcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZXdRdWV1ZUxlbmd0aFxuICovXG5mdW5jdGlvbiBhZnRlclBhaW50KG5ld1F1ZXVlTGVuZ3RoKSB7XG5cdGlmIChuZXdRdWV1ZUxlbmd0aCA9PT0gMSB8fCBwcmV2UmFmICE9PSBvcHRpb25zLnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuXHRcdHByZXZSYWYgPSBvcHRpb25zLnJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0XHQocHJldlJhZiB8fCBhZnRlck5leHRGcmFtZSkoZmx1c2hBZnRlclBhaW50RWZmZWN0cyk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkVmZmVjdEhvb2tTdGF0ZX0gaG9va1xuICovXG5mdW5jdGlvbiBpbnZva2VDbGVhbnVwKGhvb2spIHtcblx0Ly8gQSBob29rIGNsZWFudXAgY2FuIGludHJvZHVjZSBhIGNhbGwgdG8gcmVuZGVyIHdoaWNoIGNyZWF0ZXMgYSBuZXcgcm9vdCwgdGhpcyB3aWxsIGNhbGwgb3B0aW9ucy52bm9kZVxuXHQvLyBhbmQgbW92ZSB0aGUgY3VycmVudENvbXBvbmVudCBhd2F5LlxuXHRjb25zdCBjb21wID0gY3VycmVudENvbXBvbmVudDtcblx0aWYgKHR5cGVvZiBob29rLl9jbGVhbnVwID09ICdmdW5jdGlvbicpIGhvb2suX2NsZWFudXAoKTtcblx0Y3VycmVudENvbXBvbmVudCA9IGNvbXA7XG59XG5cbi8qKlxuICogSW52b2tlIGEgSG9vaydzIGVmZmVjdFxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5FZmZlY3RIb29rU3RhdGV9IGhvb2tcbiAqL1xuZnVuY3Rpb24gaW52b2tlRWZmZWN0KGhvb2spIHtcblx0Ly8gQSBob29rIGNhbGwgY2FuIGludHJvZHVjZSBhIGNhbGwgdG8gcmVuZGVyIHdoaWNoIGNyZWF0ZXMgYSBuZXcgcm9vdCwgdGhpcyB3aWxsIGNhbGwgb3B0aW9ucy52bm9kZVxuXHQvLyBhbmQgbW92ZSB0aGUgY3VycmVudENvbXBvbmVudCBhd2F5LlxuXHRjb25zdCBjb21wID0gY3VycmVudENvbXBvbmVudDtcblx0aG9vay5fY2xlYW51cCA9IGhvb2suX3ZhbHVlKCk7XG5cdGN1cnJlbnRDb21wb25lbnQgPSBjb21wO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55W119IG9sZEFyZ3NcbiAqIEBwYXJhbSB7YW55W119IG5ld0FyZ3NcbiAqL1xuZnVuY3Rpb24gYXJnc0NoYW5nZWQob2xkQXJncywgbmV3QXJncykge1xuXHRyZXR1cm4gKFxuXHRcdCFvbGRBcmdzIHx8XG5cdFx0b2xkQXJncy5sZW5ndGggIT09IG5ld0FyZ3MubGVuZ3RoIHx8XG5cdFx0bmV3QXJncy5zb21lKChhcmcsIGluZGV4KSA9PiBhcmcgIT09IG9sZEFyZ3NbaW5kZXhdKVxuXHQpO1xufVxuXG5mdW5jdGlvbiBpbnZva2VPclJldHVybihhcmcsIGYpIHtcblx0cmV0dXJuIHR5cGVvZiBmID09ICdmdW5jdGlvbicgPyBmKGFyZykgOiBmO1xufVxuIiwiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2h0bS9wcmVhY3QnXG5cbmZ1bmN0aW9uIEJ1dHRvbiAocHJvcHMpIHtcbiAgICByZXR1cm4gaHRtbGA8c3BhbiBjbGFzcz1cImZvcm0tc3R1ZmZcIj5cbiAgICAgICAgJHtwcm9wcy5pc1NwaW5uaW5nID9cbiAgICAgICAgICAgIGh0bWxgPGJ1dHRvbiAuLi4ke3Byb3BzfSBjbGFzcz0ke3Byb3BzLmNsYXNzIHx8ICcnICsgJyBzcGlubmluZyd9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9JHt0cnVlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuLWNvbnRlbnRcIj4ke3Byb3BzLmNoaWxkcmVufTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPmAgOlxuICAgICAgICAgICAgaHRtbGA8ZGl2ID5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIC4uLiR7cHJvcHN9PlxuICAgICAgICAgICAgICAgICAgICAke3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICB9XG4gICAgICAgIDwvc3Bhbj5gXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uXG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCdcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbnZhciBQZW5jaWxCdXR0b24gPSByZXF1aXJlKCcuL3BlbmNpbC1idXR0b24nKVxuXG5mdW5jdGlvbiBFZGl0YWJsZUZpZWxkIChwcm9wcykge1xuICAgIHZhciB7IHZhbHVlLCBvblNhdmUsIG5hbWUgfSA9IHByb3BzXG4gICAgdmFyIFtpc0VkaXRpbmcsIHNldEVkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gICAgdmFyIFtpc1Jlc29sdmluZywgc2V0UmVzb2x2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gICAgZnVuY3Rpb24gX3NldEVkaXRpbmcgKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgc2V0RWRpdGluZyh0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3BFZGl0aW5nIChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHNldEVkaXRpbmcoZmFsc2UpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX29uU2F2ZSAoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICB2YXIgdmFsID0gZXYudGFyZ2V0LmVsZW1lbnRzW25hbWVdLnZhbHVlXG4gICAgICAgIHNldFJlc29sdmluZyh0cnVlKVxuICAgICAgICBvblNhdmUodmFsKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFJlc29sdmluZyhmYWxzZSlcbiAgICAgICAgICAgICAgICBzZXRFZGl0aW5nKGZhbHNlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHNldFJlc29sdmluZyhmYWxzZSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJycnJycicsIGVycilcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgdmFyIF9jbGFzcyA9ICdlZGl0YWJsZS1maWVsZCcgK1xuICAgICAgICAoaXNSZXNvbHZpbmcgPyAnIHJlc29sdmluZycgOiAnJykgK1xuICAgICAgICAocHJvcHMuY2xhc3MgPyAoJyAnICsgcHJvcHMuY2xhc3MpIDogJycpXG5cbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICAgIHJldHVybiBodG1sYDxmb3JtIG9ucmVzZXQ9JHtzdG9wRWRpdGluZ31cbiAgICAgICAgICAgIG9uc3VibWl0PSR7X29uU2F2ZX1cbiAgICAgICAgICAgIGNsYXNzPSR7X2NsYXNzfVxuICAgICAgICA+XG4gICAgICAgICAgICA8aW5wdXQgbmFtZT0ke25hbWV9IGlkPSR7bmFtZX0gcGxhY2Vob2xkZXI9XCIke3ZhbHVlfVwiIC8+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiIGRpc2FibGVkPSR7aXNSZXNvbHZpbmd9PmNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9JHtpc1Jlc29sdmluZ30+c2F2ZTwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWVsZFwiPiR7dmFsdWV9PC9zcGFuPlxuXG4gICAgICAgIDwhLS0gcGVuY2lsIGVtb2ppIC0tPlxuICAgICAgICA8JHtQZW5jaWxCdXR0b259IG9uQ2xpY2s9JHtfc2V0RWRpdGluZ30gdGl0bGU9XCJlZGl0XCIgLz5cbiAgICBgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdGFibGVGaWVsZFxuIiwidmFyIE51bWJlcklucHV0ID0gcmVxdWlyZSgnLi9udW1iZXItaW5wdXQnKVxudmFyIFRleHRJbnB1dCA9IHJlcXVpcmUoJy4vdGV4dC1pbnB1dCcpXG52YXIgQnV0dG9uID0gcmVxdWlyZSgnLi9idXR0b24nKVxudmFyIEVkaXRhYmxlRmllbGQgPSByZXF1aXJlKCcuL2VkaXRhYmxlLWZpZWxkJylcbnZhciBQZW5jaWxCdXR0b24gPSByZXF1aXJlKCcuL3BlbmNpbC1idXR0b24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgVGV4dElucHV0LCBOdW1iZXJJbnB1dCwgQnV0dG9uLCBFZGl0YWJsZUZpZWxkLFxuICAgIFBlbmNpbEJ1dHRvbiB9XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCdcblxuZnVuY3Rpb24gTnVtYmVySW5wdXQgKHByb3BzKSB7XG4gICAgdmFyIHsgbmFtZSwgbWluLCBtYXgsIG9uQ2hhbmdlLCB2YWx1ZSwgb25JbmNyZWFzZSwgb25EZWNyZWFzZSB9ID0gcHJvcHNcblxuICAgIHJldHVybiBodG1sYDxkaXYgY2xhc3M9XCJmb3JtLXN0dWZmXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1udW1iZXJcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaW5wdXRtb2RlPVwibnVtZXJpY1wiXG4gICAgICAgICAgICAgICAgcGF0dGVybj1cIlswLTldKlwiXG4gICAgICAgICAgICAgICAgbWF4PVwiJHttYXh9XCJcbiAgICAgICAgICAgICAgICBtaW49JHttaW59XG4gICAgICAgICAgICAgICAgb25jaGFuZ2U9JHtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT0ke3ZhbHVlfVxuICAgICAgICAgICAgICAgIG5hbWU9JHtuYW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXItbmF2XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlci1idXR0b24gbnVtYmVyLXVwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25jbGljaz1cIiR7ZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgb25JbmNyZWFzZShldilcbiAgICAgICAgICAgICAgICAgICAgfSB9XCI+KzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlci1idXR0b24gbnVtYmVyLWRvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwiJHtldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRlY3JlYXNlKGV2KVxuICAgICAgICAgICAgICAgICAgICB9IH1cIj4tPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlcklucHV0XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCdcbnZhciBjcmVhdGVQZW5jaWwgPSByZXF1aXJlKCcuLi9jcmVhdGUtcGVuY2lsLWJ1dHRvbicpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUGVuY2lsKGh0bWwpXG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCdcblxuZnVuY3Rpb24gVGV4dElucHV0IChwcm9wcykge1xuICAgIHZhciB7IG5hbWUsIGRpc3BsYXlOYW1lIH0gPSBwcm9wc1xuICAgIHZhciBfcHJvcHMgPSB7Li4ucHJvcHN9XG4gICAgZGVsZXRlIF9wcm9wcy5kaXNwbGF5TmFtZVxuXG4gICAgcmV0dXJuIGh0bWxgPGRpdiBjbGFzc05hbWU9XCJmb3JtLXN0dWZmXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgJHtuYW1lfVwiPlxuICAgICAgICAgICAgPGlucHV0IC4uLiR7X3Byb3BzfSBuYW1lPVwiJHtuYW1lfVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCIgXCJcbiAgICAgICAgICAgICAgICByZXF1aXJlZD0ke3Byb3BzLnJlcXVpcmVkfSBtaW5MZW5ndGg9JHtwcm9wcy5taW5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMubWluTGVuZ3RofVxuICAgICAgICAgICAgICAgIG1heExlbmd0aD0ke3Byb3BzLm1heGxlbmd0aCB8fCBwcm9wcy5tYXhMZW5ndGh9XG4gICAgICAgICAgICAgICAgaWQ9XCIke25hbWV9XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0ke25hbWV9PiR7ZGlzcGxheU5hbWV9PC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRJbnB1dFxuIl19
