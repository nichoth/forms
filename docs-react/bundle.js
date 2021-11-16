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
    var stuff = els['more-stuff'].value;
    console.log('submit', stuff);
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

    <form class="form-demo" onSubmit=${formSubmit}>
        <${TextInput} name="more-stuff" displayName="more stuff"
            minlength="3" maxlength="6" required=${true}
        />

        <${Button} type="submit" isSpinning=${formDemoState.isResolving}>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjcmVhdGUtcGVuY2lsLWJ1dHRvbi5qcyIsImRvY3MvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9odG0vcHJlYWN0L2luZGV4Lm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NvbnN0YW50cy5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL29wdGlvbnMuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9jcmVhdGUtZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NvbXBvbmVudC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NyZWF0ZS1jb250ZXh0LmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2RpZmYvY2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9kaWZmL3Byb3BzLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9zcmMvZGlmZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL3JlbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2Nsb25lLWVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9kaWZmL2NhdGNoLWVycm9yLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9ob29rcy9zcmMvaW5kZXguanMiLCJwcmVhY3QvYnV0dG9uLmpzIiwicHJlYWN0L2VkaXRhYmxlLWZpZWxkLmpzIiwicHJlYWN0L2luZGV4LmpzIiwicHJlYWN0L251bWJlci1pbnB1dC5qcyIsInByZWFjdC9wZW5jaWwtYnV0dG9uLmpzIiwicHJlYWN0L3RleHQtaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDLE9BQVAsR0FBaUIsWUFBWSxDQUFDLFlBQUQsQ0FBN0I7Ozs7O0FDSEE7O0FBRUEsU0FBUyxTQUFULENBQW9CLEtBQXBCLEVBQTJCO0FBQ3ZCLE1BQUk7QUFBRSxJQUFBLElBQUY7QUFBUSxJQUFBO0FBQVIsTUFBd0IsS0FBNUI7QUFDQSxNQUFJLE1BQU0sR0FBRyxFQUFDLEdBQUc7QUFBSixHQUFiO0FBQ0EsU0FBTyxNQUFNLENBQUMsV0FBZDtBQUVBLFNBQU8saUJBQUs7QUFDaEIsc0NBQXNDLElBQUs7QUFDM0Msd0JBQXdCLE1BQU8sVUFBUyxJQUFLO0FBQzdDLDJCQUEyQixLQUFLLENBQUMsUUFBUyxjQUFhLEtBQUssQ0FBQyxTQUFOLElBQ25DLEtBQUssQ0FBQyxTQUFVO0FBQ3BDLDRCQUE0QixLQUFLLENBQUMsU0FBTixJQUFtQixLQUFLLENBQUMsU0FBVTtBQUMvRCxzQkFBc0IsSUFBSztBQUMzQjtBQUNBLDZCQUE2QixJQUFLLElBQUcsV0FBWTtBQUNqRDtBQUNBLFdBVkk7QUFXSDs7QUFFRCxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIGNyZWF0ZVBlbmNpbCAoaHRtbCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBQZW5jaWxCdXR0b24gKHByb3BzKSB7XG4gICAgICAgIHZhciBjbCA9IHByb3BzLmNsYXNzIHx8IHByb3BzLmNsYXNzTmFtZVxuICAgICAgICByZXR1cm4gaHRtbGA8YnV0dG9uIC4uLiR7cHJvcHN9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJlZGl0LXBlbmNpbCR7Y2wgPyAoJyAnICsgY2wpIDogJyd9XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9XCJlZGl0XCI+XG4gICAgICAgICAgICAgICAg4pyPXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPmBcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUGVuY2lsXG4iLCJ2YXIgeyBUZXh0SW5wdXQsIE51bWJlcklucHV0LCBCdXR0b24sIEVkaXRhYmxlRmllbGQsIFBlbmNpbEJ1dHRvbiB9ID1cbiAgICByZXF1aXJlKCcuLi9wcmVhY3QnKVxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGh0bWwgfSBmcm9tICdodG0vcHJlYWN0JztcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcblxuZnVuY3Rpb24gc3VibWl0IChldikge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zb2xlLmxvZygnc3VibWl0JylcbiAgICBjb25zb2xlLmxvZygndmFsdWUnLCBldi50YXJnZXQuZWxlbWVudHNbJ3Rlc3QtaW5wdXQnXS52YWx1ZSlcbiAgICBjb25zb2xlLmxvZygnc29tZXRoaW5nIGVsc2UnLCBldi50YXJnZXQuZWxlbWVudHNbJ3NvbWV0aGluZyddLnZhbHVlKVxufVxuXG5mdW5jdGlvbiBDbGlja2luZ0RlbW8gKCkge1xuICAgIHZhciBbcmVzb2x2aW5nLCBzZXRSZXNvbHZpbmddID0gdXNlU3RhdGUoZmFsc2UpXG5cbiAgICBmdW5jdGlvbiBkb1NvbWV0aGluZyAoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICBzZXRSZXNvbHZpbmcodHJ1ZSlcbiAgICAgICAgLy8gMyBzZWNvbmQgZGVsYXlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRSZXNvbHZpbmcoZmFsc2UpLCAzMDAwKVxuICAgIH1cblxuICAgICByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzPVwiY2xpY2tpbmctZGVtb1wiPlxuICAgICAgICA8JHtCdXR0b259IHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPSR7ZG9Tb21ldGhpbmd9IGlzU3Bpbm5pbmc9JHtyZXNvbHZpbmd9PlxuICAgICAgICAgICAgZG8gc29tZXRoaW5nXG4gICAgICAgIDwvJHtCdXR0b259PlxuICAgIDwvZGl2PmBcbn1cblxuZnVuY3Rpb24gQ291bnRlciAocHJvcHMpIHtcbiAgICB2YXIgeyBtaW4sIG1heCB9ID0gcHJvcHNcbiAgICB2YXIgW2NvdW50LCBzZXRDb3VudF0gPSB1c2VTdGF0ZSgzKVxuXG4gICAgZnVuY3Rpb24gaW5jICgpIHtcbiAgICAgICAgaWYgKChwYXJzZUludChjb3VudCkgKyAxKSA+IG1heCkgcmV0dXJuXG4gICAgICAgIGlmIChjb3VudCA8IG1pbikgcmV0dXJuIHNldENvdW50KG1pbilcbiAgICAgICAgc2V0Q291bnQoY291bnQgKyAxKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlYyAoKSB7XG4gICAgICAgIGlmICgocGFyc2VJbnQoY291bnQpIC0gMSkgPCBtaW4pIHJldHVyblxuICAgICAgICBpZiAoY291bnQgPiBtYXgpIHJldHVybiBzZXRDb3VudChtYXgpXG4gICAgICAgIHNldENvdW50KGNvdW50IC0gMSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2UgKGV2KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnLCBldi50YXJnZXQudmFsdWUpXG4gICAgICAgIHNldENvdW50KGV2LnRhcmdldC52YWx1ZSlcbiAgICB9XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgICAgPCR7TnVtYmVySW5wdXR9IG1pbj0kezJ9IG1heD0kezZ9IHZhbHVlPSR7Y291bnR9XG4gICAgICAgICAgICBvbkluY3JlYXNlPSR7aW5jfSBvbkRlY3JlYXNlPSR7ZGVjfSBvbkNoYW5nZT0ke2NoYW5nZX0gLz5cbiAgICBgXG59XG5cbmZ1bmN0aW9uIEVkaXRpbmcgKCkge1xuICAgIGZ1bmN0aW9uIHNhdmUgKG5ld1ZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzYXZlJywgbmV3VmFsdWUpXG4gICAgICAgIC8vIHdhaXQgMSBzZWNvbmRcbiAgICAgICAgLy8geW91ICptdXN0KiByZXR1cm4gYSBwcm9taXNlIGhlcmU7XG4gICAgICAgIC8vICAgaXQgaXMgdXNlZCBieSB0aGUgYEVkaXRhYmxlRmllbGRgIGNvbXBvbmVudCB0b1xuICAgICAgICAvLyAgIHNldCB0aGUgcmVzb2x2aW5nIHN0YXRlXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpXG4gICAgfVxuXG4gICAgcmV0dXJuIGh0bWxgXG4gICAgICAgIDwke0VkaXRhYmxlRmllbGR9IHZhbHVlPVwiZXhhbXBsZVwiIG9uU2F2ZT0ke3NhdmV9IG5hbWU9XCJleGFtcGxlXCIgLz5cbiAgICBgXG59XG5cblxuZnVuY3Rpb24gRGVtbyAoKSB7XG4gICAgdmFyIFtmb3JtRGVtb1N0YXRlLCBzZXRGb3JtU3RhdGVdID0gdXNlU3RhdGUoeyBpc1Jlc29sdmluZzogZmFsc2UgfSlcblxuICAgIGZ1bmN0aW9uIGZvcm1TdWJtaXQgKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgc2V0Rm9ybVN0YXRlKHsgaXNSZXNvbHZpbmc6IHRydWUgfSlcbiAgICAgICAgdmFyIGVscyA9IGV2LnRhcmdldC5lbGVtZW50c1xuICAgICAgICB2YXIgc3R1ZmYgPSBlbHNbJ21vcmUtc3R1ZmYnXS52YWx1ZVxuICAgICAgICBjb25zb2xlLmxvZygnc3VibWl0Jywgc3R1ZmYpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc2V0Rm9ybVN0YXRlKHsgaXNSZXNvbHZpbmc6IGZhbHNlIH0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZG9uZSBzdWJtaXR0aW5nJylcbiAgICAgICAgfSwgMzAwMClcbiAgICB9XG5cbiAgICByZXR1cm4gaHRtbGA8Zm9ybSBvbnN1Ym1pdD0ke3N1Ym1pdH0+XG4gICAgICAgIDwke1RleHRJbnB1dH0gbmFtZT1cInRlc3QtaW5wdXRcIiBkaXNwbGF5TmFtZT1cInRlc3QgaW5wdXRcIiB2YWx1ZT1cImJhclwiXG4gICAgICAgICAgICBtaW5sZW5ndGg9XCIzXCIgbWF4bGVuZ3RoPVwiNlwiIHJlcXVpcmVkPSR7dHJ1ZX1cbiAgICAgICAgLz5cblxuICAgICAgICA8JHtUZXh0SW5wdXR9IG5hbWU9XCJzb21ldGhpbmdcIiBkaXNwbGF5TmFtZT1cInNvbWV0aGluZyBlbHNlXCIgdmFsdWU9XCJmb29cIlxuICAgICAgICAgICAgbWlubGVuZ3RoPVwiM1wiIG1heGxlbmd0aD1cIjZcIiByZXF1aXJlZD0ke2ZhbHNlfVxuICAgICAgICAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXJcIj5cbiAgICAgICAgICAgIDxwPm1pbiAyLCBtYXggNjwvcD5cbiAgICAgICAgICAgIDwke0NvdW50ZXJ9IG1pbj0kezJ9IG1heD0kezZ9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0aW5nXCI+XG4gICAgICAgICAgICA8JHtFZGl0aW5nfSAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuXCI+XG4gICAgICAgICAgICA8JHtDbGlja2luZ0RlbW99IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICB0ZXN0aW5nIHRoZSBwZW5jaWwgYnV0dG9uXG4gICAgICAgICAgICA8JHtQZW5jaWxCdXR0b259IG9uQ2xpY2s9JHtldiA9PiB7XG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGljaycsIGV2KVxuICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9mb3JtPlxuXG4gICAgPGZvcm0gY2xhc3M9XCJmb3JtLWRlbW9cIiBvblN1Ym1pdD0ke2Zvcm1TdWJtaXR9PlxuICAgICAgICA8JHtUZXh0SW5wdXR9IG5hbWU9XCJtb3JlLXN0dWZmXCIgZGlzcGxheU5hbWU9XCJtb3JlIHN0dWZmXCJcbiAgICAgICAgICAgIG1pbmxlbmd0aD1cIjNcIiBtYXhsZW5ndGg9XCI2XCIgcmVxdWlyZWQ9JHt0cnVlfVxuICAgICAgICAvPlxuXG4gICAgICAgIDwke0J1dHRvbn0gdHlwZT1cInN1Ym1pdFwiIGlzU3Bpbm5pbmc9JHtmb3JtRGVtb1N0YXRlLmlzUmVzb2x2aW5nfT5cbiAgICAgICAgICAgIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICA8LyR7QnV0dG9ufT5cbiAgICA8L2Rpdj5gXG59XG5cbnJlbmRlcihodG1sYDwke0RlbW99IC8+YCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKSk7XG4iLCJ2YXIgbj1mdW5jdGlvbih0LHMscixlKXt2YXIgdTtzWzBdPTA7Zm9yKHZhciBoPTE7aDxzLmxlbmd0aDtoKyspe3ZhciBwPXNbaCsrXSxhPXNbaF0/KHNbMF18PXA/MToyLHJbc1toKytdXSk6c1srK2hdOzM9PT1wP2VbMF09YTo0PT09cD9lWzFdPU9iamVjdC5hc3NpZ24oZVsxXXx8e30sYSk6NT09PXA/KGVbMV09ZVsxXXx8e30pW3NbKytoXV09YTo2PT09cD9lWzFdW3NbKytoXV0rPWErXCJcIjpwPyh1PXQuYXBwbHkoYSxuKHQsYSxyLFtcIlwiLG51bGxdKSksZS5wdXNoKHUpLGFbMF0/c1swXXw9Mjooc1toLTJdPTAsc1toXT11KSk6ZS5wdXNoKGEpfXJldHVybiBlfSx0PW5ldyBNYXA7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocyl7dmFyIHI9dC5nZXQodGhpcyk7cmV0dXJuIHJ8fChyPW5ldyBNYXAsdC5zZXQodGhpcyxyKSksKHI9bih0aGlzLHIuZ2V0KHMpfHwoci5zZXQocyxyPWZ1bmN0aW9uKG4pe2Zvcih2YXIgdCxzLHI9MSxlPVwiXCIsdT1cIlwiLGg9WzBdLHA9ZnVuY3Rpb24obil7MT09PXImJihufHwoZT1lLnJlcGxhY2UoL15cXHMqXFxuXFxzKnxcXHMqXFxuXFxzKiQvZyxcIlwiKSkpP2gucHVzaCgwLG4sZSk6Mz09PXImJihufHxlKT8oaC5wdXNoKDMsbixlKSxyPTIpOjI9PT1yJiZcIi4uLlwiPT09ZSYmbj9oLnB1c2goNCxuLDApOjI9PT1yJiZlJiYhbj9oLnB1c2goNSwwLCEwLGUpOnI+PTUmJigoZXx8IW4mJjU9PT1yKSYmKGgucHVzaChyLDAsZSxzKSxyPTYpLG4mJihoLnB1c2gocixuLDAscykscj02KSksZT1cIlwifSxhPTA7YTxuLmxlbmd0aDthKyspe2EmJigxPT09ciYmcCgpLHAoYSkpO2Zvcih2YXIgbD0wO2w8blthXS5sZW5ndGg7bCsrKXQ9blthXVtsXSwxPT09cj9cIjxcIj09PXQ/KHAoKSxoPVtoXSxyPTMpOmUrPXQ6ND09PXI/XCItLVwiPT09ZSYmXCI+XCI9PT10PyhyPTEsZT1cIlwiKTplPXQrZVswXTp1P3Q9PT11P3U9XCJcIjplKz10OidcIic9PT10fHxcIidcIj09PXQ/dT10OlwiPlwiPT09dD8ocCgpLHI9MSk6ciYmKFwiPVwiPT09dD8ocj01LHM9ZSxlPVwiXCIpOlwiL1wiPT09dCYmKHI8NXx8XCI+XCI9PT1uW2FdW2wrMV0pPyhwKCksMz09PXImJihoPWhbMF0pLHI9aCwoaD1oWzBdKS5wdXNoKDIsMCxyKSxyPTApOlwiIFwiPT09dHx8XCJcXHRcIj09PXR8fFwiXFxuXCI9PT10fHxcIlxcclwiPT09dD8ocCgpLHI9Mik6ZSs9dCksMz09PXImJlwiIS0tXCI9PT1lJiYocj00LGg9aFswXSl9cmV0dXJuIHAoKSxofShzKSksciksYXJndW1lbnRzLFtdKSkubGVuZ3RoPjE/cjpyWzBdfVxuIiwiaW1wb3J0e2ggYXMgcixDb21wb25lbnQgYXMgbyxyZW5kZXIgYXMgdH1mcm9tXCJwcmVhY3RcIjtleHBvcnR7aCxyZW5kZXIsQ29tcG9uZW50fWZyb21cInByZWFjdFwiO2ltcG9ydCBlIGZyb21cImh0bVwiO3ZhciBtPWUuYmluZChyKTtleHBvcnR7bSBhcyBodG1sfTtcbiIsImV4cG9ydCBjb25zdCBFTVBUWV9PQkogPSB7fTtcbmV4cG9ydCBjb25zdCBFTVBUWV9BUlIgPSBbXTtcbmV4cG9ydCBjb25zdCBJU19OT05fRElNRU5TSU9OQUwgPSAvYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofGdyaWR8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZHxpdGVyYS9pO1xuIiwiaW1wb3J0IHsgX2NhdGNoRXJyb3IgfSBmcm9tICcuL2RpZmYvY2F0Y2gtZXJyb3InO1xuXG4vKipcbiAqIFRoZSBgb3B0aW9uYCBvYmplY3QgY2FuIHBvdGVudGlhbGx5IGNvbnRhaW4gY2FsbGJhY2sgZnVuY3Rpb25zXG4gKiB0aGF0IGFyZSBjYWxsZWQgZHVyaW5nIHZhcmlvdXMgc3RhZ2VzIG9mIG91ciByZW5kZXJlci4gVGhpcyBpcyB0aGVcbiAqIGZvdW5kYXRpb24gb24gd2hpY2ggYWxsIG91ciBhZGRvbnMgbGlrZSBgcHJlYWN0L2RlYnVnYCwgYHByZWFjdC9jb21wYXRgLFxuICogYW5kIGBwcmVhY3QvaG9va3NgIGFyZSBiYXNlZCBvbi4gU2VlIHRoZSBgT3B0aW9uc2AgdHlwZSBpbiBgaW50ZXJuYWwuZC50c2BcbiAqIGZvciBhIGZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgb3B0aW9uIGhvb2tzIChtb3N0IGVkaXRvcnMvSURFcyBhbGxvdyB5b3UgdG9cbiAqIGN0cmwrY2xpY2sgb3IgY21kK2NsaWNrIG9uIG1hYyB0aGUgdHlwZSBkZWZpbml0aW9uIGJlbG93KS5cbiAqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5PcHRpb25zfVxuICovXG5jb25zdCBvcHRpb25zID0ge1xuXHRfY2F0Y2hFcnJvcixcblx0X3Zub2RlSWQ6IDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9wdGlvbnM7XG4iLCJpbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuXG4vKipcbiAqIENyZWF0ZSBhbiB2aXJ0dWFsIG5vZGUgKHVzZWQgZm9yIEpTWClcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGVbXCJ0eXBlXCJdfSB0eXBlIFRoZSBub2RlIG5hbWUgb3IgQ29tcG9uZW50XG4gKiBjb25zdHJ1Y3RvciBmb3IgdGhpcyB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7b2JqZWN0IHwgbnVsbCB8IHVuZGVmaW5lZH0gW3Byb3BzXSBUaGUgcHJvcGVydGllcyBvZiB0aGUgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLicpLkNvbXBvbmVudENoaWxkcmVuPn0gW2NoaWxkcmVuXSBUaGUgY2hpbGRyZW4gb2YgdGhlIHZpcnR1YWwgbm9kZVxuICogQHJldHVybnMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcblx0bGV0IG5vcm1hbGl6ZWRQcm9wcyA9IHt9LFxuXHRcdGtleSxcblx0XHRyZWYsXG5cdFx0aTtcblx0Zm9yIChpIGluIHByb3BzKSB7XG5cdFx0aWYgKGkgPT0gJ2tleScpIGtleSA9IHByb3BzW2ldO1xuXHRcdGVsc2UgaWYgKGkgPT0gJ3JlZicpIHJlZiA9IHByb3BzW2ldO1xuXHRcdGVsc2Ugbm9ybWFsaXplZFByb3BzW2ldID0gcHJvcHNbaV07XG5cdH1cblxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDMpIHtcblx0XHRjaGlsZHJlbiA9IFtjaGlsZHJlbl07XG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3ByZWFjdGpzL3ByZWFjdC9pc3N1ZXMvMTkxNlxuXHRcdGZvciAoaSA9IDM7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNoaWxkcmVuLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHR9XG5cdH1cblx0aWYgKGNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRub3JtYWxpemVkUHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcblx0fVxuXG5cdC8vIElmIGEgQ29tcG9uZW50IFZOb2RlLCBjaGVjayBmb3IgYW5kIGFwcGx5IGRlZmF1bHRQcm9wc1xuXHQvLyBOb3RlOiB0eXBlIG1heSBiZSB1bmRlZmluZWQgaW4gZGV2ZWxvcG1lbnQsIG11c3QgbmV2ZXIgZXJyb3IgaGVyZS5cblx0aWYgKHR5cGVvZiB0eXBlID09ICdmdW5jdGlvbicgJiYgdHlwZS5kZWZhdWx0UHJvcHMgIT0gbnVsbCkge1xuXHRcdGZvciAoaSBpbiB0eXBlLmRlZmF1bHRQcm9wcykge1xuXHRcdFx0aWYgKG5vcm1hbGl6ZWRQcm9wc1tpXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG5vcm1hbGl6ZWRQcm9wc1tpXSA9IHR5cGUuZGVmYXVsdFByb3BzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjcmVhdGVWTm9kZSh0eXBlLCBub3JtYWxpemVkUHJvcHMsIGtleSwgcmVmLCBudWxsKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBWTm9kZSAodXNlZCBpbnRlcm5hbGx5IGJ5IFByZWFjdClcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGVbXCJ0eXBlXCJdfSB0eXBlIFRoZSBub2RlIG5hbWUgb3IgQ29tcG9uZW50XG4gKiBDb25zdHJ1Y3RvciBmb3IgdGhpcyB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7b2JqZWN0IHwgc3RyaW5nIHwgbnVtYmVyIHwgbnVsbH0gcHJvcHMgVGhlIHByb3BlcnRpZXMgb2YgdGhpcyB2aXJ0dWFsIG5vZGUuXG4gKiBJZiB0aGlzIHZpcnR1YWwgbm9kZSByZXByZXNlbnRzIGEgdGV4dCBub2RlLCB0aGlzIGlzIHRoZSB0ZXh0IG9mIHRoZSBub2RlIChzdHJpbmcgb3IgbnVtYmVyKS5cbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyIHwgbnVsbH0ga2V5IFRoZSBrZXkgZm9yIHRoaXMgdmlydHVhbCBub2RlLCB1c2VkIHdoZW5cbiAqIGRpZmZpbmcgaXQgYWdhaW5zdCBpdHMgY2hpbGRyZW5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGVbXCJyZWZcIl19IHJlZiBUaGUgcmVmIHByb3BlcnR5IHRoYXQgd2lsbFxuICogcmVjZWl2ZSBhIHJlZmVyZW5jZSB0byBpdHMgY3JlYXRlZCBjaGlsZFxuICogQHJldHVybnMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVk5vZGUodHlwZSwgcHJvcHMsIGtleSwgcmVmLCBvcmlnaW5hbCkge1xuXHQvLyBWOCBzZWVtcyB0byBiZSBiZXR0ZXIgYXQgZGV0ZWN0aW5nIHR5cGUgc2hhcGVzIGlmIHRoZSBvYmplY3QgaXMgYWxsb2NhdGVkIGZyb20gdGhlIHNhbWUgY2FsbCBzaXRlXG5cdC8vIERvIG5vdCBpbmxpbmUgaW50byBjcmVhdGVFbGVtZW50IGFuZCBjb2VyY2VUb1ZOb2RlIVxuXHRjb25zdCB2bm9kZSA9IHtcblx0XHR0eXBlLFxuXHRcdHByb3BzLFxuXHRcdGtleSxcblx0XHRyZWYsXG5cdFx0X2NoaWxkcmVuOiBudWxsLFxuXHRcdF9wYXJlbnQ6IG51bGwsXG5cdFx0X2RlcHRoOiAwLFxuXHRcdF9kb206IG51bGwsXG5cdFx0Ly8gX25leHREb20gbXVzdCBiZSBpbml0aWFsaXplZCB0byB1bmRlZmluZWQgYi9jIGl0IHdpbGwgZXZlbnR1YWxseVxuXHRcdC8vIGJlIHNldCB0byBkb20ubmV4dFNpYmxpbmcgd2hpY2ggY2FuIHJldHVybiBgbnVsbGAgYW5kIGl0IGlzIGltcG9ydGFudFxuXHRcdC8vIHRvIGJlIGFibGUgdG8gZGlzdGluZ3Vpc2ggYmV0d2VlbiBhbiB1bmluaXRpYWxpemVkIF9uZXh0RG9tIGFuZFxuXHRcdC8vIGEgX25leHREb20gdGhhdCBoYXMgYmVlbiBzZXQgdG8gYG51bGxgXG5cdFx0X25leHREb206IHVuZGVmaW5lZCxcblx0XHRfY29tcG9uZW50OiBudWxsLFxuXHRcdF9oeWRyYXRpbmc6IG51bGwsXG5cdFx0Y29uc3RydWN0b3I6IHVuZGVmaW5lZCxcblx0XHRfb3JpZ2luYWw6IG9yaWdpbmFsID09IG51bGwgPyArK29wdGlvbnMuX3Zub2RlSWQgOiBvcmlnaW5hbFxuXHR9O1xuXG5cdGlmIChvcHRpb25zLnZub2RlICE9IG51bGwpIG9wdGlvbnMudm5vZGUodm5vZGUpO1xuXG5cdHJldHVybiB2bm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZigpIHtcblx0cmV0dXJuIHsgY3VycmVudDogbnVsbCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhZ21lbnQocHJvcHMpIHtcblx0cmV0dXJuIHByb3BzLmNoaWxkcmVuO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGEgdGhlIGFyZ3VtZW50IGlzIGEgdmFsaWQgUHJlYWN0IFZOb2RlLlxuICogQHBhcmFtIHsqfSB2bm9kZVxuICogQHJldHVybnMge3Zub2RlIGlzIGltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfVxuICovXG5leHBvcnQgY29uc3QgaXNWYWxpZEVsZW1lbnQgPSB2bm9kZSA9PlxuXHR2bm9kZSAhPSBudWxsICYmIHZub2RlLmNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQ7XG4iLCJpbXBvcnQgeyBhc3NpZ24gfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgZGlmZiwgY29tbWl0Um9vdCB9IGZyb20gJy4vZGlmZi9pbmRleCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IHsgRnJhZ21lbnQgfSBmcm9tICcuL2NyZWF0ZS1lbGVtZW50JztcblxuLyoqXG4gKiBCYXNlIENvbXBvbmVudCBjbGFzcy4gUHJvdmlkZXMgYHNldFN0YXRlKClgIGFuZCBgZm9yY2VVcGRhdGUoKWAsIHdoaWNoXG4gKiB0cmlnZ2VyIHJlbmRlcmluZ1xuICogQHBhcmFtIHtvYmplY3R9IHByb3BzIFRoZSBpbml0aWFsIGNvbXBvbmVudCBwcm9wc1xuICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgVGhlIGluaXRpYWwgY29udGV4dCBmcm9tIHBhcmVudCBjb21wb25lbnRzJ1xuICogZ2V0Q2hpbGRDb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpIHtcblx0dGhpcy5wcm9wcyA9IHByb3BzO1xuXHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBjb21wb25lbnQgc3RhdGUgYW5kIHNjaGVkdWxlIGEgcmUtcmVuZGVyLlxuICogQHRoaXMge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH1cbiAqIEBwYXJhbSB7b2JqZWN0IHwgKChzOiBvYmplY3QsIHA6IG9iamVjdCkgPT4gb2JqZWN0KX0gdXBkYXRlIEEgaGFzaCBvZiBzdGF0ZVxuICogcHJvcGVydGllcyB0byB1cGRhdGUgd2l0aCBuZXcgdmFsdWVzIG9yIGEgZnVuY3Rpb24gdGhhdCBnaXZlbiB0aGUgY3VycmVudFxuICogc3RhdGUgYW5kIHByb3BzIHJldHVybnMgYSBuZXcgcGFydGlhbCBzdGF0ZVxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBbY2FsbGJhY2tdIEEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uY2UgY29tcG9uZW50IHN0YXRlIGlzXG4gKiB1cGRhdGVkXG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbih1cGRhdGUsIGNhbGxiYWNrKSB7XG5cdC8vIG9ubHkgY2xvbmUgc3RhdGUgd2hlbiBjb3B5aW5nIHRvIG5leHRTdGF0ZSB0aGUgZmlyc3QgdGltZS5cblx0bGV0IHM7XG5cdGlmICh0aGlzLl9uZXh0U3RhdGUgIT0gbnVsbCAmJiB0aGlzLl9uZXh0U3RhdGUgIT09IHRoaXMuc3RhdGUpIHtcblx0XHRzID0gdGhpcy5fbmV4dFN0YXRlO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSB0aGlzLl9uZXh0U3RhdGUgPSBhc3NpZ24oe30sIHRoaXMuc3RhdGUpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiB1cGRhdGUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIFNvbWUgbGlicmFyaWVzIGxpa2UgYGltbWVyYCBtYXJrIHRoZSBjdXJyZW50IHN0YXRlIGFzIHJlYWRvbmx5LFxuXHRcdC8vIHByZXZlbnRpbmcgdXMgZnJvbSBtdXRhdGluZyBpdCwgc28gd2UgbmVlZCB0byBjbG9uZSBpdC4gU2VlICMyNzE2XG5cdFx0dXBkYXRlID0gdXBkYXRlKGFzc2lnbih7fSwgcyksIHRoaXMucHJvcHMpO1xuXHR9XG5cblx0aWYgKHVwZGF0ZSkge1xuXHRcdGFzc2lnbihzLCB1cGRhdGUpO1xuXHR9XG5cblx0Ly8gU2tpcCB1cGRhdGUgaWYgdXBkYXRlciBmdW5jdGlvbiByZXR1cm5lZCBudWxsXG5cdGlmICh1cGRhdGUgPT0gbnVsbCkgcmV0dXJuO1xuXG5cdGlmICh0aGlzLl92bm9kZSkge1xuXHRcdGlmIChjYWxsYmFjaykgdGhpcy5fcmVuZGVyQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuXHRcdGVucXVldWVSZW5kZXIodGhpcyk7XG5cdH1cbn07XG5cbi8qKlxuICogSW1tZWRpYXRlbHkgcGVyZm9ybSBhIHN5bmNocm9ub3VzIHJlLXJlbmRlciBvZiB0aGUgY29tcG9uZW50XG4gKiBAdGhpcyB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fVxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBbY2FsbGJhY2tdIEEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpc1xuICogcmUtcmVuZGVyZWRcbiAqL1xuQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdGlmICh0aGlzLl92bm9kZSkge1xuXHRcdC8vIFNldCByZW5kZXIgbW9kZSBzbyB0aGF0IHdlIGNhbiBkaWZmZXJlbnRpYXRlIHdoZXJlIHRoZSByZW5kZXIgcmVxdWVzdFxuXHRcdC8vIGlzIGNvbWluZyBmcm9tLiBXZSBuZWVkIHRoaXMgYmVjYXVzZSBmb3JjZVVwZGF0ZSBzaG91bGQgbmV2ZXIgY2FsbFxuXHRcdC8vIHNob3VsZENvbXBvbmVudFVwZGF0ZVxuXHRcdHRoaXMuX2ZvcmNlID0gdHJ1ZTtcblx0XHRpZiAoY2FsbGJhY2spIHRoaXMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcblx0XHRlbnF1ZXVlUmVuZGVyKHRoaXMpO1xuXHR9XG59O1xuXG4vKipcbiAqIEFjY2VwdHMgYHByb3BzYCBhbmQgYHN0YXRlYCwgYW5kIHJldHVybnMgYSBuZXcgVmlydHVhbCBET00gdHJlZSB0byBidWlsZC5cbiAqIFZpcnR1YWwgRE9NIGlzIGdlbmVyYWxseSBjb25zdHJ1Y3RlZCB2aWEgW0pTWF0oaHR0cDovL2phc29uZm9ybWF0LmNvbS93dGYtaXMtanN4KS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBQcm9wcyAoZWc6IEpTWCBhdHRyaWJ1dGVzKSByZWNlaXZlZCBmcm9tIHBhcmVudFxuICogZWxlbWVudC9jb21wb25lbnRcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZSBUaGUgY29tcG9uZW50J3MgY3VycmVudCBzdGF0ZVxuICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgQ29udGV4dCBvYmplY3QsIGFzIHJldHVybmVkIGJ5IHRoZSBuZWFyZXN0XG4gKiBhbmNlc3RvcidzIGBnZXRDaGlsZENvbnRleHQoKWBcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vaW5kZXgnKS5Db21wb25lbnRDaGlsZHJlbiB8IHZvaWR9XG4gKi9cbkNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gRnJhZ21lbnQ7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGVcbiAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gW2NoaWxkSW5kZXhdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREb21TaWJsaW5nKHZub2RlLCBjaGlsZEluZGV4KSB7XG5cdGlmIChjaGlsZEluZGV4ID09IG51bGwpIHtcblx0XHQvLyBVc2UgY2hpbGRJbmRleD09bnVsbCBhcyBhIHNpZ25hbCB0byByZXN1bWUgdGhlIHNlYXJjaCBmcm9tIHRoZSB2bm9kZSdzIHNpYmxpbmdcblx0XHRyZXR1cm4gdm5vZGUuX3BhcmVudFxuXHRcdFx0PyBnZXREb21TaWJsaW5nKHZub2RlLl9wYXJlbnQsIHZub2RlLl9wYXJlbnQuX2NoaWxkcmVuLmluZGV4T2Yodm5vZGUpICsgMSlcblx0XHRcdDogbnVsbDtcblx0fVxuXG5cdGxldCBzaWJsaW5nO1xuXHRmb3IgKDsgY2hpbGRJbmRleCA8IHZub2RlLl9jaGlsZHJlbi5sZW5ndGg7IGNoaWxkSW5kZXgrKykge1xuXHRcdHNpYmxpbmcgPSB2bm9kZS5fY2hpbGRyZW5bY2hpbGRJbmRleF07XG5cblx0XHRpZiAoc2libGluZyAhPSBudWxsICYmIHNpYmxpbmcuX2RvbSAhPSBudWxsKSB7XG5cdFx0XHQvLyBTaW5jZSB1cGRhdGVQYXJlbnREb21Qb2ludGVycyBrZWVwcyBfZG9tIHBvaW50ZXIgY29ycmVjdCxcblx0XHRcdC8vIHdlIGNhbiByZWx5IG9uIF9kb20gdG8gdGVsbCB1cyBpZiB0aGlzIHN1YnRyZWUgY29udGFpbnMgYVxuXHRcdFx0Ly8gcmVuZGVyZWQgRE9NIG5vZGUsIGFuZCB3aGF0IHRoZSBmaXJzdCByZW5kZXJlZCBET00gbm9kZSBpc1xuXHRcdFx0cmV0dXJuIHNpYmxpbmcuX2RvbTtcblx0XHR9XG5cdH1cblxuXHQvLyBJZiB3ZSBnZXQgaGVyZSwgd2UgaGF2ZSBub3QgZm91bmQgYSBET00gbm9kZSBpbiB0aGlzIHZub2RlJ3MgY2hpbGRyZW4uXG5cdC8vIFdlIG11c3QgcmVzdW1lIGZyb20gdGhpcyB2bm9kZSdzIHNpYmxpbmcgKGluIGl0J3MgcGFyZW50IF9jaGlsZHJlbiBhcnJheSlcblx0Ly8gT25seSBjbGltYiB1cCBhbmQgc2VhcmNoIHRoZSBwYXJlbnQgaWYgd2UgYXJlbid0IHNlYXJjaGluZyB0aHJvdWdoIGEgRE9NXG5cdC8vIFZOb2RlIChtZWFuaW5nIHdlIHJlYWNoZWQgdGhlIERPTSBwYXJlbnQgb2YgdGhlIG9yaWdpbmFsIHZub2RlIHRoYXQgYmVnYW5cblx0Ly8gdGhlIHNlYXJjaClcblx0cmV0dXJuIHR5cGVvZiB2bm9kZS50eXBlID09ICdmdW5jdGlvbicgPyBnZXREb21TaWJsaW5nKHZub2RlKSA6IG51bGw7XG59XG5cbi8qKlxuICogVHJpZ2dlciBpbi1wbGFjZSByZS1yZW5kZXJpbmcgb2YgYSBjb21wb25lbnQuXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gY29tcG9uZW50IFRoZSBjb21wb25lbnQgdG8gcmVyZW5kZXJcbiAqL1xuZnVuY3Rpb24gcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuXHRsZXQgdm5vZGUgPSBjb21wb25lbnQuX3Zub2RlLFxuXHRcdG9sZERvbSA9IHZub2RlLl9kb20sXG5cdFx0cGFyZW50RG9tID0gY29tcG9uZW50Ll9wYXJlbnREb207XG5cblx0aWYgKHBhcmVudERvbSkge1xuXHRcdGxldCBjb21taXRRdWV1ZSA9IFtdO1xuXHRcdGNvbnN0IG9sZFZOb2RlID0gYXNzaWduKHt9LCB2bm9kZSk7XG5cdFx0b2xkVk5vZGUuX29yaWdpbmFsID0gdm5vZGUuX29yaWdpbmFsICsgMTtcblxuXHRcdGRpZmYoXG5cdFx0XHRwYXJlbnREb20sXG5cdFx0XHR2bm9kZSxcblx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0Y29tcG9uZW50Ll9nbG9iYWxDb250ZXh0LFxuXHRcdFx0cGFyZW50RG9tLm93bmVyU1ZHRWxlbWVudCAhPT0gdW5kZWZpbmVkLFxuXHRcdFx0dm5vZGUuX2h5ZHJhdGluZyAhPSBudWxsID8gW29sZERvbV0gOiBudWxsLFxuXHRcdFx0Y29tbWl0UXVldWUsXG5cdFx0XHRvbGREb20gPT0gbnVsbCA/IGdldERvbVNpYmxpbmcodm5vZGUpIDogb2xkRG9tLFxuXHRcdFx0dm5vZGUuX2h5ZHJhdGluZ1xuXHRcdCk7XG5cdFx0Y29tbWl0Um9vdChjb21taXRRdWV1ZSwgdm5vZGUpO1xuXG5cdFx0aWYgKHZub2RlLl9kb20gIT0gb2xkRG9tKSB7XG5cdFx0XHR1cGRhdGVQYXJlbnREb21Qb2ludGVycyh2bm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGVcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUGFyZW50RG9tUG9pbnRlcnModm5vZGUpIHtcblx0aWYgKCh2bm9kZSA9IHZub2RlLl9wYXJlbnQpICE9IG51bGwgJiYgdm5vZGUuX2NvbXBvbmVudCAhPSBudWxsKSB7XG5cdFx0dm5vZGUuX2RvbSA9IHZub2RlLl9jb21wb25lbnQuYmFzZSA9IG51bGw7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB2bm9kZS5fY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBjaGlsZCA9IHZub2RlLl9jaGlsZHJlbltpXTtcblx0XHRcdGlmIChjaGlsZCAhPSBudWxsICYmIGNoaWxkLl9kb20gIT0gbnVsbCkge1xuXHRcdFx0XHR2bm9kZS5fZG9tID0gdm5vZGUuX2NvbXBvbmVudC5iYXNlID0gY2hpbGQuX2RvbTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVwZGF0ZVBhcmVudERvbVBvaW50ZXJzKHZub2RlKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSByZW5kZXIgcXVldWVcbiAqIEB0eXBlIHtBcnJheTxpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fVxuICovXG5sZXQgcmVyZW5kZXJRdWV1ZSA9IFtdO1xuXG4vKipcbiAqIEFzeW5jaHJvbm91c2x5IHNjaGVkdWxlIGEgY2FsbGJhY2tcbiAqIEB0eXBlIHsoY2I6ICgpID0+IHZvaWQpID0+IHZvaWR9XG4gKi9cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4vLyBOb3RlIHRoZSBmb2xsb3dpbmcgbGluZSBpc24ndCB0cmVlLXNoYWtlbiBieSByb2xsdXAgY3V6IG9mIHJvbGx1cC9yb2xsdXAjMjU2NlxuY29uc3QgZGVmZXIgPVxuXHR0eXBlb2YgUHJvbWlzZSA9PSAnZnVuY3Rpb24nXG5cdFx0PyBQcm9taXNlLnByb3RvdHlwZS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpXG5cdFx0OiBzZXRUaW1lb3V0O1xuXG4vKlxuICogVGhlIHZhbHVlIG9mIGBDb21wb25lbnQuZGVib3VuY2VgIG11c3QgYXN5bmNocm9ub3VzbHkgaW52b2tlIHRoZSBwYXNzZWQgaW4gY2FsbGJhY2suIEl0IGlzXG4gKiBpbXBvcnRhbnQgdGhhdCBjb250cmlidXRvcnMgdG8gUHJlYWN0IGNhbiBjb25zaXN0ZW50bHkgcmVhc29uIGFib3V0IHdoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCwgZXRjLlxuICogZG8sIGFuZCB3aGVuIHRoZWlyIGVmZmVjdHMgd2lsbCBiZSBhcHBsaWVkLiBTZWUgdGhlIGxpbmtzIGJlbG93IGZvciBzb21lIGZ1cnRoZXIgcmVhZGluZyBvbiBkZXNpZ25pbmdcbiAqIGFzeW5jaHJvbm91cyBBUElzLlxuICogKiBbRGVzaWduaW5nIEFQSXMgZm9yIEFzeW5jaHJvbnldKGh0dHBzOi8vYmxvZy5penMubWUvMjAxMy8wOC9kZXNpZ25pbmctYXBpcy1mb3ItYXN5bmNocm9ueSlcbiAqICogW0NhbGxiYWNrcyBzeW5jaHJvbm91cyBhbmQgYXN5bmNocm9ub3VzXShodHRwczovL2Jsb2cub21ldGVyLmNvbS8yMDExLzA3LzI0L2NhbGxiYWNrcy1zeW5jaHJvbm91cy1hbmQtYXN5bmNocm9ub3VzLylcbiAqL1xuXG5sZXQgcHJldkRlYm91bmNlO1xuXG4vKipcbiAqIEVucXVldWUgYSByZXJlbmRlciBvZiBhIGNvbXBvbmVudFxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9IGMgVGhlIGNvbXBvbmVudCB0byByZXJlbmRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5xdWV1ZVJlbmRlcihjKSB7XG5cdGlmIChcblx0XHQoIWMuX2RpcnR5ICYmXG5cdFx0XHQoYy5fZGlydHkgPSB0cnVlKSAmJlxuXHRcdFx0cmVyZW5kZXJRdWV1ZS5wdXNoKGMpICYmXG5cdFx0XHQhcHJvY2Vzcy5fcmVyZW5kZXJDb3VudCsrKSB8fFxuXHRcdHByZXZEZWJvdW5jZSAhPT0gb3B0aW9ucy5kZWJvdW5jZVJlbmRlcmluZ1xuXHQpIHtcblx0XHRwcmV2RGVib3VuY2UgPSBvcHRpb25zLmRlYm91bmNlUmVuZGVyaW5nO1xuXHRcdChwcmV2RGVib3VuY2UgfHwgZGVmZXIpKHByb2Nlc3MpO1xuXHR9XG59XG5cbi8qKiBGbHVzaCB0aGUgcmVuZGVyIHF1ZXVlIGJ5IHJlcmVuZGVyaW5nIGFsbCBxdWV1ZWQgY29tcG9uZW50cyAqL1xuZnVuY3Rpb24gcHJvY2VzcygpIHtcblx0bGV0IHF1ZXVlO1xuXHR3aGlsZSAoKHByb2Nlc3MuX3JlcmVuZGVyQ291bnQgPSByZXJlbmRlclF1ZXVlLmxlbmd0aCkpIHtcblx0XHRxdWV1ZSA9IHJlcmVuZGVyUXVldWUuc29ydCgoYSwgYikgPT4gYS5fdm5vZGUuX2RlcHRoIC0gYi5fdm5vZGUuX2RlcHRoKTtcblx0XHRyZXJlbmRlclF1ZXVlID0gW107XG5cdFx0Ly8gRG9uJ3QgdXBkYXRlIGByZW5kZXJDb3VudGAgeWV0LiBLZWVwIGl0cyB2YWx1ZSBub24temVybyB0byBwcmV2ZW50IHVubmVjZXNzYXJ5XG5cdFx0Ly8gcHJvY2VzcygpIGNhbGxzIGZyb20gZ2V0dGluZyBzY2hlZHVsZWQgd2hpbGUgYHF1ZXVlYCBpcyBzdGlsbCBiZWluZyBjb25zdW1lZC5cblx0XHRxdWV1ZS5zb21lKGMgPT4ge1xuXHRcdFx0aWYgKGMuX2RpcnR5KSByZW5kZXJDb21wb25lbnQoYyk7XG5cdFx0fSk7XG5cdH1cbn1cbnByb2Nlc3MuX3JlcmVuZGVyQ291bnQgPSAwO1xuIiwiaW1wb3J0IHsgZW5xdWV1ZVJlbmRlciB9IGZyb20gJy4vY29tcG9uZW50JztcblxuZXhwb3J0IGxldCBpID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoZGVmYXVsdFZhbHVlLCBjb250ZXh0SWQpIHtcblx0Y29udGV4dElkID0gJ19fY0MnICsgaSsrO1xuXG5cdGNvbnN0IGNvbnRleHQgPSB7XG5cdFx0X2lkOiBjb250ZXh0SWQsXG5cdFx0X2RlZmF1bHRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuXHRcdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuRnVuY3Rpb25Db21wb25lbnR9ICovXG5cdFx0Q29uc3VtZXIocHJvcHMsIGNvbnRleHRWYWx1ZSkge1xuXHRcdFx0Ly8gcmV0dXJuIHByb3BzLmNoaWxkcmVuKFxuXHRcdFx0Ly8gXHRjb250ZXh0W2NvbnRleHRJZF0gPyBjb250ZXh0W2NvbnRleHRJZF0ucHJvcHMudmFsdWUgOiBkZWZhdWx0VmFsdWVcblx0XHRcdC8vICk7XG5cdFx0XHRyZXR1cm4gcHJvcHMuY2hpbGRyZW4oY29udGV4dFZhbHVlKTtcblx0XHR9LFxuXHRcdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuRnVuY3Rpb25Db21wb25lbnR9ICovXG5cdFx0UHJvdmlkZXIocHJvcHMpIHtcblx0XHRcdGlmICghdGhpcy5nZXRDaGlsZENvbnRleHQpIHtcblx0XHRcdFx0bGV0IHN1YnMgPSBbXTtcblx0XHRcdFx0bGV0IGN0eCA9IHt9O1xuXHRcdFx0XHRjdHhbY29udGV4dElkXSA9IHRoaXM7XG5cblx0XHRcdFx0dGhpcy5nZXRDaGlsZENvbnRleHQgPSAoKSA9PiBjdHg7XG5cblx0XHRcdFx0dGhpcy5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmdW5jdGlvbihfcHJvcHMpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZSAhPT0gX3Byb3BzLnZhbHVlKSB7XG5cdFx0XHRcdFx0XHQvLyBJIHRoaW5rIHRoZSBmb3JjZWQgdmFsdWUgcHJvcGFnYXRpb24gaGVyZSB3YXMgb25seSBuZWVkZWQgd2hlbiBgb3B0aW9ucy5kZWJvdW5jZVJlbmRlcmluZ2Agd2FzIGJlaW5nIGJ5cGFzc2VkOlxuXHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3ByZWFjdGpzL3ByZWFjdC9jb21taXQvNGQzMzlmYjgwM2JlYTA5ZTlmMTk4YWJmMzhjYTFiZjhlYTRiNzc3MSNkaWZmLTU0NjgyY2UzODA5MzVhNzE3ZTQxYjhiZmM1NDczN2Y2UjM1OFxuXHRcdFx0XHRcdFx0Ly8gSW4gdGhvc2UgY2FzZXMgdGhvdWdoLCBldmVuIHdpdGggdGhlIHZhbHVlIGNvcnJlY3RlZCwgd2UncmUgZG91YmxlLXJlbmRlcmluZyBhbGwgbm9kZXMuXG5cdFx0XHRcdFx0XHQvLyBJdCBtaWdodCBiZSBiZXR0ZXIgdG8ganVzdCB0ZWxsIGZvbGtzIG5vdCB0byB1c2UgZm9yY2Utc3luYyBtb2RlLlxuXHRcdFx0XHRcdFx0Ly8gQ3VycmVudGx5LCB1c2luZyBgdXNlQ29udGV4dCgpYCBpbiBhIGNsYXNzIGNvbXBvbmVudCB3aWxsIG92ZXJ3cml0ZSBpdHMgYHRoaXMuY29udGV4dGAgdmFsdWUuXG5cdFx0XHRcdFx0XHQvLyBzdWJzLnNvbWUoYyA9PiB7XG5cdFx0XHRcdFx0XHQvLyBcdGMuY29udGV4dCA9IF9wcm9wcy52YWx1ZTtcblx0XHRcdFx0XHRcdC8vIFx0ZW5xdWV1ZVJlbmRlcihjKTtcblx0XHRcdFx0XHRcdC8vIH0pO1xuXG5cdFx0XHRcdFx0XHQvLyBzdWJzLnNvbWUoYyA9PiB7XG5cdFx0XHRcdFx0XHQvLyBcdGMuY29udGV4dFtjb250ZXh0SWRdID0gX3Byb3BzLnZhbHVlO1xuXHRcdFx0XHRcdFx0Ly8gXHRlbnF1ZXVlUmVuZGVyKGMpO1xuXHRcdFx0XHRcdFx0Ly8gfSk7XG5cdFx0XHRcdFx0XHRzdWJzLnNvbWUoZW5xdWV1ZVJlbmRlcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHRoaXMuc3ViID0gYyA9PiB7XG5cdFx0XHRcdFx0c3Vicy5wdXNoKGMpO1xuXHRcdFx0XHRcdGxldCBvbGQgPSBjLmNvbXBvbmVudFdpbGxVbm1vdW50O1xuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbFVubW91bnQgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRzdWJzLnNwbGljZShzdWJzLmluZGV4T2YoYyksIDEpO1xuXHRcdFx0XHRcdFx0aWYgKG9sZCkgb2xkLmNhbGwoYyk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHByb3BzLmNoaWxkcmVuO1xuXHRcdH1cblx0fTtcblxuXHQvLyBEZXZ0b29scyBuZWVkcyBhY2Nlc3MgdG8gdGhlIGNvbnRleHQgb2JqZWN0IHdoZW4gaXRcblx0Ly8gZW5jb3VudGVycyBhIFByb3ZpZGVyLiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBzdXBwb3J0XG5cdC8vIHNldHRpbmcgYGRpc3BsYXlOYW1lYCBvbiB0aGUgY29udGV4dCBvYmplY3QgaW5zdGVhZFxuXHQvLyBvZiBvbiB0aGUgY29tcG9uZW50IGl0c2VsZi4gU2VlOlxuXHQvLyBodHRwczovL3JlYWN0anMub3JnL2RvY3MvY29udGV4dC5odG1sI2NvbnRleHRkaXNwbGF5bmFtZVxuXG5cdHJldHVybiAoY29udGV4dC5Qcm92aWRlci5fY29udGV4dFJlZiA9IGNvbnRleHQuQ29uc3VtZXIuY29udGV4dFR5cGUgPSBjb250ZXh0KTtcbn1cbiIsIi8qKlxuICogQXNzaWduIHByb3BlcnRpZXMgZnJvbSBgcHJvcHNgIHRvIGBvYmpgXG4gKiBAdGVtcGxhdGUgTywgUCBUaGUgb2JqIGFuZCBwcm9wcyB0eXBlc1xuICogQHBhcmFtIHtPfSBvYmogVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG9cbiAqIEBwYXJhbSB7UH0gcHJvcHMgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHJldHVybnMge08gJiBQfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduKG9iaiwgcHJvcHMpIHtcblx0Ly8gQHRzLWlnbm9yZSBXZSBjaGFuZ2UgdGhlIHR5cGUgb2YgYG9iamAgdG8gYmUgYE8gJiBQYFxuXHRmb3IgKGxldCBpIGluIHByb3BzKSBvYmpbaV0gPSBwcm9wc1tpXTtcblx0cmV0dXJuIC8qKiBAdHlwZSB7TyAmIFB9ICovIChvYmopO1xufVxuXG4vKipcbiAqIFJlbW92ZSBhIGNoaWxkIG5vZGUgZnJvbSBpdHMgcGFyZW50IGlmIGF0dGFjaGVkLiBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3JcbiAqIElFMTEgd2hpY2ggZG9lc24ndCBzdXBwb3J0IGBFbGVtZW50LnByb3RvdHlwZS5yZW1vdmUoKWAuIFVzaW5nIHRoaXMgZnVuY3Rpb25cbiAqIGlzIHNtYWxsZXIgdGhhbiBpbmNsdWRpbmcgYSBkZWRpY2F0ZWQgcG9seWZpbGwuXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgVGhlIG5vZGUgdG8gcmVtb3ZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcblx0bGV0IHBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdGlmIChwYXJlbnROb2RlKSBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuIiwiaW1wb3J0IHsgZGlmZiwgdW5tb3VudCwgYXBwbHlSZWYgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IGNyZWF0ZVZOb2RlLCBGcmFnbWVudCB9IGZyb20gJy4uL2NyZWF0ZS1lbGVtZW50JztcbmltcG9ydCB7IEVNUFRZX09CSiwgRU1QVFlfQVJSIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldERvbVNpYmxpbmcgfSBmcm9tICcuLi9jb21wb25lbnQnO1xuXG4vKipcbiAqIERpZmYgdGhlIGNoaWxkcmVuIG9mIGEgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBwYXJlbnREb20gVGhlIERPTSBlbGVtZW50IHdob3NlXG4gKiBjaGlsZHJlbiBhcmUgYmVpbmcgZGlmZmVkXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnRDaGlsZHJlbltdfSByZW5kZXJSZXN1bHRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBuZXdQYXJlbnRWTm9kZSBUaGUgbmV3IHZpcnR1YWxcbiAqIG5vZGUgd2hvc2UgY2hpbGRyZW4gc2hvdWxkIGJlIGRpZmYnZWQgYWdhaW5zdCBvbGRQYXJlbnRWTm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG9sZFBhcmVudFZOb2RlIFRoZSBvbGQgdmlydHVhbFxuICogbm9kZSB3aG9zZSBjaGlsZHJlbiBzaG91bGQgYmUgZGlmZidlZCBhZ2FpbnN0IG5ld1BhcmVudFZOb2RlXG4gKiBAcGFyYW0ge29iamVjdH0gZ2xvYmFsQ29udGV4dCBUaGUgY3VycmVudCBjb250ZXh0IG9iamVjdCAtIG1vZGlmaWVkIGJ5IGdldENoaWxkQ29udGV4dFxuICogQHBhcmFtIHtib29sZWFufSBpc1N2ZyBXaGV0aGVyIG9yIG5vdCB0aGlzIERPTSBub2RlIGlzIGFuIFNWRyBub2RlXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50Pn0gZXhjZXNzRG9tQ2hpbGRyZW5cbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59IGNvbW1pdFF1ZXVlIExpc3Qgb2YgY29tcG9uZW50c1xuICogd2hpY2ggaGF2ZSBjYWxsYmFja3MgdG8gaW52b2tlIGluIGNvbW1pdFJvb3RcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IG9sZERvbSBUaGUgY3VycmVudCBhdHRhY2hlZCBET01cbiAqIGVsZW1lbnQgYW55IG5ldyBkb20gZWxlbWVudHMgc2hvdWxkIGJlIHBsYWNlZCBhcm91bmQuIExpa2VseSBgbnVsbGAgb24gZmlyc3RcbiAqIHJlbmRlciAoZXhjZXB0IHdoZW4gaHlkcmF0aW5nKS4gQ2FuIGJlIGEgc2libGluZyBET00gZWxlbWVudCB3aGVuIGRpZmZpbmdcbiAqIEZyYWdtZW50cyB0aGF0IGhhdmUgc2libGluZ3MuIEluIG1vc3QgY2FzZXMsIGl0IHN0YXJ0cyBvdXQgYXMgYG9sZENoaWxkcmVuWzBdLl9kb21gLlxuICogQHBhcmFtIHtib29sZWFufSBpc0h5ZHJhdGluZyBXaGV0aGVyIG9yIG5vdCB3ZSBhcmUgaW4gaHlkcmF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmQ2hpbGRyZW4oXG5cdHBhcmVudERvbSxcblx0cmVuZGVyUmVzdWx0LFxuXHRuZXdQYXJlbnRWTm9kZSxcblx0b2xkUGFyZW50Vk5vZGUsXG5cdGdsb2JhbENvbnRleHQsXG5cdGlzU3ZnLFxuXHRleGNlc3NEb21DaGlsZHJlbixcblx0Y29tbWl0UXVldWUsXG5cdG9sZERvbSxcblx0aXNIeWRyYXRpbmdcbikge1xuXHRsZXQgaSwgaiwgb2xkVk5vZGUsIGNoaWxkVk5vZGUsIG5ld0RvbSwgZmlyc3RDaGlsZERvbSwgcmVmcztcblxuXHQvLyBUaGlzIGlzIGEgY29tcHJlc3Npb24gb2Ygb2xkUGFyZW50Vk5vZGUhPW51bGwgJiYgb2xkUGFyZW50Vk5vZGUgIT0gRU1QVFlfT0JKICYmIG9sZFBhcmVudFZOb2RlLl9jaGlsZHJlbiB8fCBFTVBUWV9BUlJcblx0Ly8gYXMgRU1QVFlfT0JKLl9jaGlsZHJlbiBzaG91bGQgYmUgYHVuZGVmaW5lZGAuXG5cdGxldCBvbGRDaGlsZHJlbiA9IChvbGRQYXJlbnRWTm9kZSAmJiBvbGRQYXJlbnRWTm9kZS5fY2hpbGRyZW4pIHx8IEVNUFRZX0FSUjtcblxuXHRsZXQgb2xkQ2hpbGRyZW5MZW5ndGggPSBvbGRDaGlsZHJlbi5sZW5ndGg7XG5cblx0bmV3UGFyZW50Vk5vZGUuX2NoaWxkcmVuID0gW107XG5cdGZvciAoaSA9IDA7IGkgPCByZW5kZXJSZXN1bHQubGVuZ3RoOyBpKyspIHtcblx0XHRjaGlsZFZOb2RlID0gcmVuZGVyUmVzdWx0W2ldO1xuXG5cdFx0aWYgKGNoaWxkVk5vZGUgPT0gbnVsbCB8fCB0eXBlb2YgY2hpbGRWTm9kZSA9PSAnYm9vbGVhbicpIHtcblx0XHRcdGNoaWxkVk5vZGUgPSBuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW5baV0gPSBudWxsO1xuXHRcdH1cblx0XHQvLyBJZiB0aGlzIG5ld1ZOb2RlIGlzIGJlaW5nIHJldXNlZCAoZS5nLiA8ZGl2PntyZXVzZX17cmV1c2V9PC9kaXY+KSBpbiB0aGUgc2FtZSBkaWZmLFxuXHRcdC8vIG9yIHdlIGFyZSByZW5kZXJpbmcgYSBjb21wb25lbnQgKGUuZy4gc2V0U3RhdGUpIGNvcHkgdGhlIG9sZFZOb2RlcyBzbyBpdCBjYW4gaGF2ZVxuXHRcdC8vIGl0J3Mgb3duIERPTSAmIGV0Yy4gcG9pbnRlcnNcblx0XHRlbHNlIGlmIChcblx0XHRcdHR5cGVvZiBjaGlsZFZOb2RlID09ICdzdHJpbmcnIHx8XG5cdFx0XHR0eXBlb2YgY2hpbGRWTm9kZSA9PSAnbnVtYmVyJyB8fFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHZhbGlkLXR5cGVvZlxuXHRcdFx0dHlwZW9mIGNoaWxkVk5vZGUgPT0gJ2JpZ2ludCdcblx0XHQpIHtcblx0XHRcdGNoaWxkVk5vZGUgPSBuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW5baV0gPSBjcmVhdGVWTm9kZShcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0Y2hpbGRWTm9kZSxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0Y2hpbGRWTm9kZVxuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRWTm9kZSkpIHtcblx0XHRcdGNoaWxkVk5vZGUgPSBuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW5baV0gPSBjcmVhdGVWTm9kZShcblx0XHRcdFx0RnJhZ21lbnQsXG5cdFx0XHRcdHsgY2hpbGRyZW46IGNoaWxkVk5vZGUgfSxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0bnVsbFxuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKGNoaWxkVk5vZGUuX2RlcHRoID4gMCkge1xuXHRcdFx0Ly8gVk5vZGUgaXMgYWxyZWFkeSBpbiB1c2UsIGNsb25lIGl0LiBUaGlzIGNhbiBoYXBwZW4gaW4gdGhlIGZvbGxvd2luZ1xuXHRcdFx0Ly8gc2NlbmFyaW86XG5cdFx0XHQvLyAgIGNvbnN0IHJldXNlID0gPGRpdiAvPlxuXHRcdFx0Ly8gICA8ZGl2PntyZXVzZX08c3BhbiAvPntyZXVzZX08L2Rpdj5cblx0XHRcdGNoaWxkVk5vZGUgPSBuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW5baV0gPSBjcmVhdGVWTm9kZShcblx0XHRcdFx0Y2hpbGRWTm9kZS50eXBlLFxuXHRcdFx0XHRjaGlsZFZOb2RlLnByb3BzLFxuXHRcdFx0XHRjaGlsZFZOb2RlLmtleSxcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0Y2hpbGRWTm9kZS5fb3JpZ2luYWxcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNoaWxkVk5vZGUgPSBuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW5baV0gPSBjaGlsZFZOb2RlO1xuXHRcdH1cblxuXHRcdC8vIFRlcnNlciByZW1vdmVzIHRoZSBgY29udGludWVgIGhlcmUgYW5kIHdyYXBzIHRoZSBsb29wIGJvZHlcblx0XHQvLyBpbiBhIGBpZiAoY2hpbGRWTm9kZSkgeyAuLi4gfSBjb25kaXRpb25cblx0XHRpZiAoY2hpbGRWTm9kZSA9PSBudWxsKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjaGlsZFZOb2RlLl9wYXJlbnQgPSBuZXdQYXJlbnRWTm9kZTtcblx0XHRjaGlsZFZOb2RlLl9kZXB0aCA9IG5ld1BhcmVudFZOb2RlLl9kZXB0aCArIDE7XG5cblx0XHQvLyBDaGVjayBpZiB3ZSBmaW5kIGEgY29ycmVzcG9uZGluZyBlbGVtZW50IGluIG9sZENoaWxkcmVuLlxuXHRcdC8vIElmIGZvdW5kLCBkZWxldGUgdGhlIGFycmF5IGl0ZW0gYnkgc2V0dGluZyB0byBgdW5kZWZpbmVkYC5cblx0XHQvLyBXZSB1c2UgYHVuZGVmaW5lZGAsIGFzIGBudWxsYCBpcyByZXNlcnZlZCBmb3IgZW1wdHkgcGxhY2Vob2xkZXJzXG5cdFx0Ly8gKGhvbGVzKS5cblx0XHRvbGRWTm9kZSA9IG9sZENoaWxkcmVuW2ldO1xuXG5cdFx0aWYgKFxuXHRcdFx0b2xkVk5vZGUgPT09IG51bGwgfHxcblx0XHRcdChvbGRWTm9kZSAmJlxuXHRcdFx0XHRjaGlsZFZOb2RlLmtleSA9PSBvbGRWTm9kZS5rZXkgJiZcblx0XHRcdFx0Y2hpbGRWTm9kZS50eXBlID09PSBvbGRWTm9kZS50eXBlKVxuXHRcdCkge1xuXHRcdFx0b2xkQ2hpbGRyZW5baV0gPSB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEVpdGhlciBvbGRWTm9kZSA9PT0gdW5kZWZpbmVkIG9yIG9sZENoaWxkcmVuTGVuZ3RoID4gMCxcblx0XHRcdC8vIHNvIGFmdGVyIHRoaXMgbG9vcCBvbGRWTm9kZSA9PSBudWxsIG9yIG9sZFZOb2RlIGlzIGEgdmFsaWQgdmFsdWUuXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgb2xkQ2hpbGRyZW5MZW5ndGg7IGorKykge1xuXHRcdFx0XHRvbGRWTm9kZSA9IG9sZENoaWxkcmVuW2pdO1xuXHRcdFx0XHQvLyBJZiBjaGlsZFZOb2RlIGlzIHVua2V5ZWQsIHdlIG9ubHkgbWF0Y2ggc2ltaWxhcmx5IHVua2V5ZWQgbm9kZXMsIG90aGVyd2lzZSB3ZSBtYXRjaCBieSBrZXkuXG5cdFx0XHRcdC8vIFdlIGFsd2F5cyBtYXRjaCBieSB0eXBlIChpbiBlaXRoZXIgY2FzZSkuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRvbGRWTm9kZSAmJlxuXHRcdFx0XHRcdGNoaWxkVk5vZGUua2V5ID09IG9sZFZOb2RlLmtleSAmJlxuXHRcdFx0XHRcdGNoaWxkVk5vZGUudHlwZSA9PT0gb2xkVk5vZGUudHlwZVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRvbGRDaGlsZHJlbltqXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRvbGRWTm9kZSA9IG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0b2xkVk5vZGUgPSBvbGRWTm9kZSB8fCBFTVBUWV9PQko7XG5cblx0XHQvLyBNb3JwaCB0aGUgb2xkIGVsZW1lbnQgaW50byB0aGUgbmV3IG9uZSwgYnV0IGRvbid0IGFwcGVuZCBpdCB0byB0aGUgZG9tIHlldFxuXHRcdGRpZmYoXG5cdFx0XHRwYXJlbnREb20sXG5cdFx0XHRjaGlsZFZOb2RlLFxuXHRcdFx0b2xkVk5vZGUsXG5cdFx0XHRnbG9iYWxDb250ZXh0LFxuXHRcdFx0aXNTdmcsXG5cdFx0XHRleGNlc3NEb21DaGlsZHJlbixcblx0XHRcdGNvbW1pdFF1ZXVlLFxuXHRcdFx0b2xkRG9tLFxuXHRcdFx0aXNIeWRyYXRpbmdcblx0XHQpO1xuXG5cdFx0bmV3RG9tID0gY2hpbGRWTm9kZS5fZG9tO1xuXG5cdFx0aWYgKChqID0gY2hpbGRWTm9kZS5yZWYpICYmIG9sZFZOb2RlLnJlZiAhPSBqKSB7XG5cdFx0XHRpZiAoIXJlZnMpIHJlZnMgPSBbXTtcblx0XHRcdGlmIChvbGRWTm9kZS5yZWYpIHJlZnMucHVzaChvbGRWTm9kZS5yZWYsIG51bGwsIGNoaWxkVk5vZGUpO1xuXHRcdFx0cmVmcy5wdXNoKGosIGNoaWxkVk5vZGUuX2NvbXBvbmVudCB8fCBuZXdEb20sIGNoaWxkVk5vZGUpO1xuXHRcdH1cblxuXHRcdGlmIChuZXdEb20gIT0gbnVsbCkge1xuXHRcdFx0aWYgKGZpcnN0Q2hpbGREb20gPT0gbnVsbCkge1xuXHRcdFx0XHRmaXJzdENoaWxkRG9tID0gbmV3RG9tO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBjaGlsZFZOb2RlLnR5cGUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHRjaGlsZFZOb2RlLl9jaGlsZHJlbiAhPSBudWxsICYmIC8vIENhbiBiZSBudWxsIGlmIGNoaWxkVk5vZGUgc3VzcGVuZGVkXG5cdFx0XHRcdGNoaWxkVk5vZGUuX2NoaWxkcmVuID09PSBvbGRWTm9kZS5fY2hpbGRyZW5cblx0XHRcdCkge1xuXHRcdFx0XHRjaGlsZFZOb2RlLl9uZXh0RG9tID0gb2xkRG9tID0gcmVvcmRlckNoaWxkcmVuKFxuXHRcdFx0XHRcdGNoaWxkVk5vZGUsXG5cdFx0XHRcdFx0b2xkRG9tLFxuXHRcdFx0XHRcdHBhcmVudERvbVxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b2xkRG9tID0gcGxhY2VDaGlsZChcblx0XHRcdFx0XHRwYXJlbnREb20sXG5cdFx0XHRcdFx0Y2hpbGRWTm9kZSxcblx0XHRcdFx0XHRvbGRWTm9kZSxcblx0XHRcdFx0XHRvbGRDaGlsZHJlbixcblx0XHRcdFx0XHRuZXdEb20sXG5cdFx0XHRcdFx0b2xkRG9tXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJyb3dzZXJzIHdpbGwgaW5mZXIgYW4gb3B0aW9uJ3MgYHZhbHVlYCBmcm9tIGB0ZXh0Q29udGVudGAgd2hlblxuXHRcdFx0Ly8gbm8gdmFsdWUgaXMgcHJlc2VudC4gVGhpcyBlc3NlbnRpYWxseSBieXBhc3NlcyBvdXIgY29kZSB0byBzZXQgaXRcblx0XHRcdC8vIGxhdGVyIGluIGBkaWZmKClgLiBJdCB3b3JrcyBmaW5lIGluIGFsbCBicm93c2VycyBleGNlcHQgZm9yIElFMTFcblx0XHRcdC8vIHdoZXJlIGl0IGJyZWFrcyBzZXR0aW5nIGBzZWxlY3QudmFsdWVgLiBUaGVyZSBpdCB3aWxsIGJlIGFsd2F5cyBzZXRcblx0XHRcdC8vIHRvIGFuIGVtcHR5IHN0cmluZy4gUmUtYXBwbHlpbmcgYW4gb3B0aW9ucyB2YWx1ZSB3aWxsIGZpeCB0aGF0LCBzb1xuXHRcdFx0Ly8gdGhlcmUgYXJlIHByb2JhYmx5IHNvbWUgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmVzIHRoYXQgYXJlbid0XG5cdFx0XHQvLyB1cGRhdGVkIHByb3Blcmx5LlxuXHRcdFx0Ly9cblx0XHRcdC8vIFRvIGZpeCBpdCB3ZSBtYWtlIHN1cmUgdG8gcmVzZXQgdGhlIGluZmVycmVkIHZhbHVlLCBzbyB0aGF0IG91ciBvd25cblx0XHRcdC8vIHZhbHVlIGNoZWNrIGluIGBkaWZmKClgIHdvbid0IGJlIHNraXBwZWQuXG5cdFx0XHRpZiAoIWlzSHlkcmF0aW5nICYmIG5ld1BhcmVudFZOb2RlLnR5cGUgPT09ICdvcHRpb24nKSB7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmUgV2UgaGF2ZSB2YWxpZGF0ZWQgdGhhdCB0aGUgdHlwZSBvZiBwYXJlbnRET00gaXMgJ29wdGlvbidcblx0XHRcdFx0Ly8gaW4gdGhlIGFib3ZlIGNoZWNrXG5cdFx0XHRcdHBhcmVudERvbS52YWx1ZSA9ICcnO1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgbmV3UGFyZW50Vk5vZGUudHlwZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdC8vIEJlY2F1c2UgdGhlIG5ld1BhcmVudFZOb2RlIGlzIEZyYWdtZW50LWxpa2UsIHdlIG5lZWQgdG8gc2V0IGl0J3Ncblx0XHRcdFx0Ly8gX25leHREb20gcHJvcGVydHkgdG8gdGhlIG5leHRTaWJsaW5nIG9mIGl0cyBsYXN0IGNoaWxkIERPTSBub2RlLlxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBgb2xkRG9tYCBjb250YWlucyB0aGUgY29ycmVjdCB2YWx1ZSBoZXJlIGJlY2F1c2UgaWYgdGhlIGxhc3QgY2hpbGRcblx0XHRcdFx0Ly8gaXMgYSBGcmFnbWVudC1saWtlLCB0aGVuIG9sZERvbSBoYXMgYWxyZWFkeSBiZWVuIHNldCB0byB0aGF0IGNoaWxkJ3MgX25leHREb20uXG5cdFx0XHRcdC8vIElmIHRoZSBsYXN0IGNoaWxkIGlzIGEgRE9NIFZOb2RlLCB0aGVuIG9sZERvbSB3aWxsIGJlIHNldCB0byB0aGF0IERPTVxuXHRcdFx0XHQvLyBub2RlJ3MgbmV4dFNpYmxpbmcuXG5cdFx0XHRcdG5ld1BhcmVudFZOb2RlLl9uZXh0RG9tID0gb2xkRG9tO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRvbGREb20gJiZcblx0XHRcdG9sZFZOb2RlLl9kb20gPT0gb2xkRG9tICYmXG5cdFx0XHRvbGREb20ucGFyZW50Tm9kZSAhPSBwYXJlbnREb21cblx0XHQpIHtcblx0XHRcdC8vIFRoZSBhYm92ZSBjb25kaXRpb24gaXMgdG8gaGFuZGxlIG51bGwgcGxhY2Vob2xkZXJzLiBTZWUgdGVzdCBpbiBwbGFjZWhvbGRlci50ZXN0LmpzOlxuXHRcdFx0Ly8gYGVmZmljaWVudGx5IHJlcGxhY2UgbnVsbCBwbGFjZWhvbGRlcnMgaW4gcGFyZW50IHJlcmVuZGVyc2Bcblx0XHRcdG9sZERvbSA9IGdldERvbVNpYmxpbmcob2xkVk5vZGUpO1xuXHRcdH1cblx0fVxuXG5cdG5ld1BhcmVudFZOb2RlLl9kb20gPSBmaXJzdENoaWxkRG9tO1xuXG5cdC8vIFJlbW92ZSByZW1haW5pbmcgb2xkQ2hpbGRyZW4gaWYgdGhlcmUgYXJlIGFueS5cblx0Zm9yIChpID0gb2xkQ2hpbGRyZW5MZW5ndGg7IGktLTsgKSB7XG5cdFx0aWYgKG9sZENoaWxkcmVuW2ldICE9IG51bGwpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIG5ld1BhcmVudFZOb2RlLnR5cGUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHRvbGRDaGlsZHJlbltpXS5fZG9tICE9IG51bGwgJiZcblx0XHRcdFx0b2xkQ2hpbGRyZW5baV0uX2RvbSA9PSBuZXdQYXJlbnRWTm9kZS5fbmV4dERvbVxuXHRcdFx0KSB7XG5cdFx0XHRcdC8vIElmIHRoZSBuZXdQYXJlbnRWTm9kZS5fX25leHREb20gcG9pbnRzIHRvIGEgZG9tIG5vZGUgdGhhdCBpcyBhYm91dCB0b1xuXHRcdFx0XHQvLyBiZSB1bm1vdW50ZWQsIHRoZW4gZ2V0IHRoZSBuZXh0IHNpYmxpbmcgb2YgdGhhdCB2bm9kZSBhbmQgc2V0XG5cdFx0XHRcdC8vIF9uZXh0RG9tIHRvIGl0XG5cdFx0XHRcdG5ld1BhcmVudFZOb2RlLl9uZXh0RG9tID0gZ2V0RG9tU2libGluZyhvbGRQYXJlbnRWTm9kZSwgaSArIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHR1bm1vdW50KG9sZENoaWxkcmVuW2ldLCBvbGRDaGlsZHJlbltpXSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gU2V0IHJlZnMgb25seSBhZnRlciB1bm1vdW50XG5cdGlmIChyZWZzKSB7XG5cdFx0Zm9yIChpID0gMDsgaSA8IHJlZnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGFwcGx5UmVmKHJlZnNbaV0sIHJlZnNbKytpXSwgcmVmc1srK2ldKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVvcmRlckNoaWxkcmVuKGNoaWxkVk5vZGUsIG9sZERvbSwgcGFyZW50RG9tKSB7XG5cdGZvciAobGV0IHRtcCA9IDA7IHRtcCA8IGNoaWxkVk5vZGUuX2NoaWxkcmVuLmxlbmd0aDsgdG1wKyspIHtcblx0XHRsZXQgdm5vZGUgPSBjaGlsZFZOb2RlLl9jaGlsZHJlblt0bXBdO1xuXHRcdGlmICh2bm9kZSkge1xuXHRcdFx0Ly8gV2UgdHlwaWNhbGx5IGVudGVyIHRoaXMgY29kZSBwYXRoIG9uIHNDVSBiYWlsb3V0LCB3aGVyZSB3ZSBjb3B5XG5cdFx0XHQvLyBvbGRWTm9kZS5fY2hpbGRyZW4gdG8gbmV3Vk5vZGUuX2NoaWxkcmVuLiBJZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSBuZWVkXG5cdFx0XHQvLyB0byB1cGRhdGUgdGhlIG9sZCBjaGlsZHJlbidzIF9wYXJlbnQgcG9pbnRlciB0byBwb2ludCB0byB0aGUgbmV3Vk5vZGVcblx0XHRcdC8vIChjaGlsZFZOb2RlIGhlcmUpLlxuXHRcdFx0dm5vZGUuX3BhcmVudCA9IGNoaWxkVk5vZGU7XG5cblx0XHRcdGlmICh0eXBlb2Ygdm5vZGUudHlwZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdG9sZERvbSA9IHJlb3JkZXJDaGlsZHJlbih2bm9kZSwgb2xkRG9tLCBwYXJlbnREb20pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b2xkRG9tID0gcGxhY2VDaGlsZChcblx0XHRcdFx0XHRwYXJlbnREb20sXG5cdFx0XHRcdFx0dm5vZGUsXG5cdFx0XHRcdFx0dm5vZGUsXG5cdFx0XHRcdFx0Y2hpbGRWTm9kZS5fY2hpbGRyZW4sXG5cdFx0XHRcdFx0dm5vZGUuX2RvbSxcblx0XHRcdFx0XHRvbGREb21cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb2xkRG9tO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYW5kIGxvb3AgdGhyb3VnaCB0aGUgY2hpbGRyZW4gb2YgYSB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbmRleCcpLkNvbXBvbmVudENoaWxkcmVufSBjaGlsZHJlbiBUaGUgdW5mbGF0dGVuZWRcbiAqIGNoaWxkcmVuIG9mIGEgdmlydHVhbCBub2RlXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlW119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0NoaWxkQXJyYXkoY2hpbGRyZW4sIG91dCkge1xuXHRvdXQgPSBvdXQgfHwgW107XG5cdGlmIChjaGlsZHJlbiA9PSBudWxsIHx8IHR5cGVvZiBjaGlsZHJlbiA9PSAnYm9vbGVhbicpIHtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuXHRcdGNoaWxkcmVuLnNvbWUoY2hpbGQgPT4ge1xuXHRcdFx0dG9DaGlsZEFycmF5KGNoaWxkLCBvdXQpO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdG91dC5wdXNoKGNoaWxkcmVuKTtcblx0fVxuXHRyZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBwbGFjZUNoaWxkKFxuXHRwYXJlbnREb20sXG5cdGNoaWxkVk5vZGUsXG5cdG9sZFZOb2RlLFxuXHRvbGRDaGlsZHJlbixcblx0bmV3RG9tLFxuXHRvbGREb21cbikge1xuXHRsZXQgbmV4dERvbTtcblx0aWYgKGNoaWxkVk5vZGUuX25leHREb20gIT09IHVuZGVmaW5lZCkge1xuXHRcdC8vIE9ubHkgRnJhZ21lbnRzIG9yIGNvbXBvbmVudHMgdGhhdCByZXR1cm4gRnJhZ21lbnQgbGlrZSBWTm9kZXMgd2lsbFxuXHRcdC8vIGhhdmUgYSBub24tdW5kZWZpbmVkIF9uZXh0RG9tLiBDb250aW51ZSB0aGUgZGlmZiBmcm9tIHRoZSBzaWJsaW5nXG5cdFx0Ly8gb2YgbGFzdCBET00gY2hpbGQgb2YgdGhpcyBjaGlsZCBWTm9kZVxuXHRcdG5leHREb20gPSBjaGlsZFZOb2RlLl9uZXh0RG9tO1xuXG5cdFx0Ly8gRWFnZXJseSBjbGVhbnVwIF9uZXh0RG9tLiBXZSBkb24ndCBuZWVkIHRvIHBlcnNpc3QgdGhlIHZhbHVlIGJlY2F1c2Vcblx0XHQvLyBpdCBpcyBvbmx5IHVzZWQgYnkgYGRpZmZDaGlsZHJlbmAgdG8gZGV0ZXJtaW5lIHdoZXJlIHRvIHJlc3VtZSB0aGUgZGlmZiBhZnRlclxuXHRcdC8vIGRpZmZpbmcgQ29tcG9uZW50cyBhbmQgRnJhZ21lbnRzLiBPbmNlIHdlIHN0b3JlIGl0IHRoZSBuZXh0RE9NIGxvY2FsIHZhciwgd2Vcblx0XHQvLyBjYW4gY2xlYW4gdXAgdGhlIHByb3BlcnR5XG5cdFx0Y2hpbGRWTm9kZS5fbmV4dERvbSA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmIChcblx0XHRvbGRWTm9kZSA9PSBudWxsIHx8XG5cdFx0bmV3RG9tICE9IG9sZERvbSB8fFxuXHRcdG5ld0RvbS5wYXJlbnROb2RlID09IG51bGxcblx0KSB7XG5cdFx0b3V0ZXI6IGlmIChvbGREb20gPT0gbnVsbCB8fCBvbGREb20ucGFyZW50Tm9kZSAhPT0gcGFyZW50RG9tKSB7XG5cdFx0XHRwYXJlbnREb20uYXBwZW5kQ2hpbGQobmV3RG9tKTtcblx0XHRcdG5leHREb20gPSBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBgajxvbGRDaGlsZHJlbkxlbmd0aDsgais9MmAgaXMgYW4gYWx0ZXJuYXRpdmUgdG8gYGorKzxvbGRDaGlsZHJlbkxlbmd0aC8yYFxuXHRcdFx0Zm9yIChcblx0XHRcdFx0bGV0IHNpYkRvbSA9IG9sZERvbSwgaiA9IDA7XG5cdFx0XHRcdChzaWJEb20gPSBzaWJEb20ubmV4dFNpYmxpbmcpICYmIGogPCBvbGRDaGlsZHJlbi5sZW5ndGg7XG5cdFx0XHRcdGogKz0gMlxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmIChzaWJEb20gPT0gbmV3RG9tKSB7XG5cdFx0XHRcdFx0YnJlYWsgb3V0ZXI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHBhcmVudERvbS5pbnNlcnRCZWZvcmUobmV3RG9tLCBvbGREb20pO1xuXHRcdFx0bmV4dERvbSA9IG9sZERvbTtcblx0XHR9XG5cdH1cblxuXHQvLyBJZiB3ZSBoYXZlIHByZS1jYWxjdWxhdGVkIHRoZSBuZXh0RE9NIG5vZGUsIHVzZSBpdC4gRWxzZSBjYWxjdWxhdGUgaXQgbm93XG5cdC8vIFN0cmljdGx5IGNoZWNrIGZvciBgdW5kZWZpbmVkYCBoZXJlIGN1eiBgbnVsbGAgaXMgYSB2YWxpZCB2YWx1ZSBvZiBgbmV4dERvbWAuXG5cdC8vIFNlZSBtb3JlIGRldGFpbCBpbiBjcmVhdGUtZWxlbWVudC5qczpjcmVhdGVWTm9kZVxuXHRpZiAobmV4dERvbSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0b2xkRG9tID0gbmV4dERvbTtcblx0fSBlbHNlIHtcblx0XHRvbGREb20gPSBuZXdEb20ubmV4dFNpYmxpbmc7XG5cdH1cblxuXHRyZXR1cm4gb2xkRG9tO1xufVxuIiwiaW1wb3J0IHsgSVNfTk9OX0RJTUVOU0lPTkFMIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG4vKipcbiAqIERpZmYgdGhlIG9sZCBhbmQgbmV3IHByb3BlcnRpZXMgb2YgYSBWTm9kZSBhbmQgYXBwbHkgY2hhbmdlcyB0byB0aGUgRE9NIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IGRvbSBUaGUgRE9NIG5vZGUgdG8gYXBwbHlcbiAqIGNoYW5nZXMgdG9cbiAqIEBwYXJhbSB7b2JqZWN0fSBuZXdQcm9wcyBUaGUgbmV3IHByb3BzXG4gKiBAcGFyYW0ge29iamVjdH0gb2xkUHJvcHMgVGhlIG9sZCBwcm9wc1xuICogQHBhcmFtIHtib29sZWFufSBpc1N2ZyBXaGV0aGVyIG9yIG5vdCB0aGlzIG5vZGUgaXMgYW4gU1ZHIG5vZGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaHlkcmF0ZSBXaGV0aGVyIG9yIG5vdCB3ZSBhcmUgaW4gaHlkcmF0aW9uIG1vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZQcm9wcyhkb20sIG5ld1Byb3BzLCBvbGRQcm9wcywgaXNTdmcsIGh5ZHJhdGUpIHtcblx0bGV0IGk7XG5cblx0Zm9yIChpIGluIG9sZFByb3BzKSB7XG5cdFx0aWYgKGkgIT09ICdjaGlsZHJlbicgJiYgaSAhPT0gJ2tleScgJiYgIShpIGluIG5ld1Byb3BzKSkge1xuXHRcdFx0c2V0UHJvcGVydHkoZG9tLCBpLCBudWxsLCBvbGRQcm9wc1tpXSwgaXNTdmcpO1xuXHRcdH1cblx0fVxuXG5cdGZvciAoaSBpbiBuZXdQcm9wcykge1xuXHRcdGlmIChcblx0XHRcdCghaHlkcmF0ZSB8fCB0eXBlb2YgbmV3UHJvcHNbaV0gPT0gJ2Z1bmN0aW9uJykgJiZcblx0XHRcdGkgIT09ICdjaGlsZHJlbicgJiZcblx0XHRcdGkgIT09ICdrZXknICYmXG5cdFx0XHRpICE9PSAndmFsdWUnICYmXG5cdFx0XHRpICE9PSAnY2hlY2tlZCcgJiZcblx0XHRcdG9sZFByb3BzW2ldICE9PSBuZXdQcm9wc1tpXVxuXHRcdCkge1xuXHRcdFx0c2V0UHJvcGVydHkoZG9tLCBpLCBuZXdQcm9wc1tpXSwgb2xkUHJvcHNbaV0sIGlzU3ZnKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0U3R5bGUoc3R5bGUsIGtleSwgdmFsdWUpIHtcblx0aWYgKGtleVswXSA9PT0gJy0nKSB7XG5cdFx0c3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSk7XG5cdH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHN0eWxlW2tleV0gPSAnJztcblx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT0gJ251bWJlcicgfHwgSVNfTk9OX0RJTUVOU0lPTkFMLnRlc3Qoa2V5KSkge1xuXHRcdHN0eWxlW2tleV0gPSB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZVtrZXldID0gdmFsdWUgKyAncHgnO1xuXHR9XG59XG5cbi8qKlxuICogU2V0IGEgcHJvcGVydHkgdmFsdWUgb24gYSBET00gbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gZG9tIFRoZSBET00gbm9kZSB0byBtb2RpZnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBzZXRcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldCB0aGUgcHJvcGVydHkgdG9cbiAqIEBwYXJhbSB7Kn0gb2xkVmFsdWUgVGhlIG9sZCB2YWx1ZSB0aGUgcHJvcGVydHkgaGFkXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3ZnIFdoZXRoZXIgb3Igbm90IHRoaXMgRE9NIG5vZGUgaXMgYW4gU1ZHIG5vZGUgb3Igbm90XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9wZXJ0eShkb20sIG5hbWUsIHZhbHVlLCBvbGRWYWx1ZSwgaXNTdmcpIHtcblx0bGV0IHVzZUNhcHR1cmU7XG5cblx0bzogaWYgKG5hbWUgPT09ICdzdHlsZScpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRkb20uc3R5bGUuY3NzVGV4dCA9IHZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodHlwZW9mIG9sZFZhbHVlID09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGRvbS5zdHlsZS5jc3NUZXh0ID0gb2xkVmFsdWUgPSAnJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9sZFZhbHVlKSB7XG5cdFx0XHRcdGZvciAobmFtZSBpbiBvbGRWYWx1ZSkge1xuXHRcdFx0XHRcdGlmICghKHZhbHVlICYmIG5hbWUgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRzZXRTdHlsZShkb20uc3R5bGUsIG5hbWUsICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRcdGZvciAobmFtZSBpbiB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICghb2xkVmFsdWUgfHwgdmFsdWVbbmFtZV0gIT09IG9sZFZhbHVlW25hbWVdKSB7XG5cdFx0XHRcdFx0XHRzZXRTdHlsZShkb20uc3R5bGUsIG5hbWUsIHZhbHVlW25hbWVdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Ly8gQmVuY2htYXJrIGZvciBjb21wYXJpc29uOiBodHRwczovL2VzYmVuY2guY29tL2JlbmNoLzU3NGM5NTRiZGI5NjViOWEwMDk2NWFjNlxuXHRlbHNlIGlmIChuYW1lWzBdID09PSAnbycgJiYgbmFtZVsxXSA9PT0gJ24nKSB7XG5cdFx0dXNlQ2FwdHVyZSA9IG5hbWUgIT09IChuYW1lID0gbmFtZS5yZXBsYWNlKC9DYXB0dXJlJC8sICcnKSk7XG5cblx0XHQvLyBJbmZlciBjb3JyZWN0IGNhc2luZyBmb3IgRE9NIGJ1aWx0LWluIGV2ZW50czpcblx0XHRpZiAobmFtZS50b0xvd2VyQ2FzZSgpIGluIGRvbSkgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5zbGljZSgyKTtcblx0XHRlbHNlIG5hbWUgPSBuYW1lLnNsaWNlKDIpO1xuXG5cdFx0aWYgKCFkb20uX2xpc3RlbmVycykgZG9tLl9saXN0ZW5lcnMgPSB7fTtcblx0XHRkb20uX2xpc3RlbmVyc1tuYW1lICsgdXNlQ2FwdHVyZV0gPSB2YWx1ZTtcblxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0aWYgKCFvbGRWYWx1ZSkge1xuXHRcdFx0XHRjb25zdCBoYW5kbGVyID0gdXNlQ2FwdHVyZSA/IGV2ZW50UHJveHlDYXB0dXJlIDogZXZlbnRQcm94eTtcblx0XHRcdFx0ZG9tLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGhhbmRsZXIgPSB1c2VDYXB0dXJlID8gZXZlbnRQcm94eUNhcHR1cmUgOiBldmVudFByb3h5O1xuXHRcdFx0ZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG5hbWUgIT09ICdkYW5nZXJvdXNseVNldElubmVySFRNTCcpIHtcblx0XHRpZiAoaXNTdmcpIHtcblx0XHRcdC8vIE5vcm1hbGl6ZSBpbmNvcnJlY3QgcHJvcCB1c2FnZSBmb3IgU1ZHOlxuXHRcdFx0Ly8gLSB4bGluazpocmVmIC8geGxpbmtIcmVmIC0tPiBocmVmICh4bGluazpocmVmIHdhcyByZW1vdmVkIGZyb20gU1ZHIGFuZCBpc24ndCBuZWVkZWQpXG5cdFx0XHQvLyAtIGNsYXNzTmFtZSAtLT4gY2xhc3Ncblx0XHRcdG5hbWUgPSBuYW1lLnJlcGxhY2UoL3hsaW5rW0g6aF0vLCAnaCcpLnJlcGxhY2UoL3NOYW1lJC8sICdzJyk7XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdG5hbWUgIT09ICdocmVmJyAmJlxuXHRcdFx0bmFtZSAhPT0gJ2xpc3QnICYmXG5cdFx0XHRuYW1lICE9PSAnZm9ybScgJiZcblx0XHRcdC8vIERlZmF1bHQgdmFsdWUgaW4gYnJvd3NlcnMgaXMgYC0xYCBhbmQgYW4gZW1wdHkgc3RyaW5nIGlzXG5cdFx0XHQvLyBjYXN0IHRvIGAwYCBpbnN0ZWFkXG5cdFx0XHRuYW1lICE9PSAndGFiSW5kZXgnICYmXG5cdFx0XHRuYW1lICE9PSAnZG93bmxvYWQnICYmXG5cdFx0XHRuYW1lIGluIGRvbVxuXHRcdCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZG9tW25hbWVdID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdFx0XHRcdC8vIGxhYmVsbGVkIGJyZWFrIGlzIDFiIHNtYWxsZXIgaGVyZSB0aGFuIGEgcmV0dXJuIHN0YXRlbWVudCAoc29ycnkpXG5cdFx0XHRcdGJyZWFrIG87XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblxuXHRcdC8vIEFSSUEtYXR0cmlidXRlcyBoYXZlIGEgZGlmZmVyZW50IG5vdGlvbiBvZiBib29sZWFuIHZhbHVlcy5cblx0XHQvLyBUaGUgdmFsdWUgYGZhbHNlYCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgYXR0cmlidXRlIG5vdFxuXHRcdC8vIGV4aXN0aW5nIG9uIHRoZSBET00sIHNvIHdlIGNhbid0IHJlbW92ZSBpdC4gRm9yIG5vbi1ib29sZWFuXG5cdFx0Ly8gQVJJQS1hdHRyaWJ1dGVzIHdlIGNvdWxkIHRyZWF0IGZhbHNlIGFzIGEgcmVtb3ZhbCwgYnV0IHRoZVxuXHRcdC8vIGFtb3VudCBvZiBleGNlcHRpb25zIHdvdWxkIGNvc3QgdXMgdG9vIG1hbnkgYnl0ZXMuIE9uIHRvcCBvZlxuXHRcdC8vIHRoYXQgb3RoZXIgVkRPTSBmcmFtZXdvcmtzIGFsc28gYWx3YXlzIHN0cmluZ2lmeSBgZmFsc2VgLlxuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Ly8gbmV2ZXIgc2VyaWFsaXplIGZ1bmN0aW9ucyBhcyBhdHRyaWJ1dGUgdmFsdWVzXG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdHZhbHVlICE9IG51bGwgJiZcblx0XHRcdCh2YWx1ZSAhPT0gZmFsc2UgfHwgKG5hbWVbMF0gPT09ICdhJyAmJiBuYW1lWzFdID09PSAncicpKVxuXHRcdCkge1xuXHRcdFx0ZG9tLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvbS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogUHJveHkgYW4gZXZlbnQgdG8gaG9va2VkIGV2ZW50IGhhbmRsZXJzXG4gKiBAcGFyYW0ge0V2ZW50fSBlIFRoZSBldmVudCBvYmplY3QgZnJvbSB0aGUgYnJvd3NlclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXZlbnRQcm94eShlKSB7XG5cdHRoaXMuX2xpc3RlbmVyc1tlLnR5cGUgKyBmYWxzZV0ob3B0aW9ucy5ldmVudCA/IG9wdGlvbnMuZXZlbnQoZSkgOiBlKTtcbn1cblxuZnVuY3Rpb24gZXZlbnRQcm94eUNhcHR1cmUoZSkge1xuXHR0aGlzLl9saXN0ZW5lcnNbZS50eXBlICsgdHJ1ZV0ob3B0aW9ucy5ldmVudCA/IG9wdGlvbnMuZXZlbnQoZSkgOiBlKTtcbn1cbiIsImltcG9ydCB7IEVNUFRZX09CSiwgRU1QVFlfQVJSIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBGcmFnbWVudCB9IGZyb20gJy4uL2NyZWF0ZS1lbGVtZW50JztcbmltcG9ydCB7IGRpZmZDaGlsZHJlbiB9IGZyb20gJy4vY2hpbGRyZW4nO1xuaW1wb3J0IHsgZGlmZlByb3BzLCBzZXRQcm9wZXJ0eSB9IGZyb20gJy4vcHJvcHMnO1xuaW1wb3J0IHsgYXNzaWduLCByZW1vdmVOb2RlIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuLi9vcHRpb25zJztcblxuLyoqXG4gKiBEaWZmIHR3byB2aXJ0dWFsIG5vZGVzIGFuZCBhcHBseSBwcm9wZXIgY2hhbmdlcyB0byB0aGUgRE9NXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBwYXJlbnREb20gVGhlIHBhcmVudCBvZiB0aGUgRE9NIGVsZW1lbnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBuZXdWTm9kZSBUaGUgbmV3IHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG9sZFZOb2RlIFRoZSBvbGQgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge29iamVjdH0gZ2xvYmFsQ29udGV4dCBUaGUgY3VycmVudCBjb250ZXh0IG9iamVjdC4gTW9kaWZpZWQgYnkgZ2V0Q2hpbGRDb250ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3ZnIFdoZXRoZXIgb3Igbm90IHRoaXMgZWxlbWVudCBpcyBhbiBTVkcgbm9kZVxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudD59IGV4Y2Vzc0RvbUNoaWxkcmVuXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fSBjb21taXRRdWV1ZSBMaXN0IG9mIGNvbXBvbmVudHNcbiAqIHdoaWNoIGhhdmUgY2FsbGJhY2tzIHRvIGludm9rZSBpbiBjb21taXRSb290XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBvbGREb20gVGhlIGN1cnJlbnQgYXR0YWNoZWQgRE9NXG4gKiBlbGVtZW50IGFueSBuZXcgZG9tIGVsZW1lbnRzIHNob3VsZCBiZSBwbGFjZWQgYXJvdW5kLiBMaWtlbHkgYG51bGxgIG9uIGZpcnN0XG4gKiByZW5kZXIgKGV4Y2VwdCB3aGVuIGh5ZHJhdGluZykuIENhbiBiZSBhIHNpYmxpbmcgRE9NIGVsZW1lbnQgd2hlbiBkaWZmaW5nXG4gKiBGcmFnbWVudHMgdGhhdCBoYXZlIHNpYmxpbmdzLiBJbiBtb3N0IGNhc2VzLCBpdCBzdGFydHMgb3V0IGFzIGBvbGRDaGlsZHJlblswXS5fZG9tYC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzSHlkcmF0aW5nXSBXaGV0aGVyIG9yIG5vdCB3ZSBhcmUgaW4gaHlkcmF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaWZmKFxuXHRwYXJlbnREb20sXG5cdG5ld1ZOb2RlLFxuXHRvbGRWTm9kZSxcblx0Z2xvYmFsQ29udGV4dCxcblx0aXNTdmcsXG5cdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRjb21taXRRdWV1ZSxcblx0b2xkRG9tLFxuXHRpc0h5ZHJhdGluZ1xuKSB7XG5cdGxldCB0bXAsXG5cdFx0bmV3VHlwZSA9IG5ld1ZOb2RlLnR5cGU7XG5cblx0Ly8gV2hlbiBwYXNzaW5nIHRocm91Z2ggY3JlYXRlRWxlbWVudCBpdCBhc3NpZ25zIHRoZSBvYmplY3Rcblx0Ly8gY29uc3RydWN0b3IgYXMgdW5kZWZpbmVkLiBUaGlzIHRvIHByZXZlbnQgSlNPTi1pbmplY3Rpb24uXG5cdGlmIChuZXdWTm9kZS5jb25zdHJ1Y3RvciAhPT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcblxuXHQvLyBJZiB0aGUgcHJldmlvdXMgZGlmZiBiYWlsZWQgb3V0LCByZXN1bWUgY3JlYXRpbmcvaHlkcmF0aW5nLlxuXHRpZiAob2xkVk5vZGUuX2h5ZHJhdGluZyAhPSBudWxsKSB7XG5cdFx0aXNIeWRyYXRpbmcgPSBvbGRWTm9kZS5faHlkcmF0aW5nO1xuXHRcdG9sZERvbSA9IG5ld1ZOb2RlLl9kb20gPSBvbGRWTm9kZS5fZG9tO1xuXHRcdC8vIGlmIHdlIHJlc3VtZSwgd2Ugd2FudCB0aGUgdHJlZSB0byBiZSBcInVubG9ja2VkXCJcblx0XHRuZXdWTm9kZS5faHlkcmF0aW5nID0gbnVsbDtcblx0XHRleGNlc3NEb21DaGlsZHJlbiA9IFtvbGREb21dO1xuXHR9XG5cblx0aWYgKCh0bXAgPSBvcHRpb25zLl9kaWZmKSkgdG1wKG5ld1ZOb2RlKTtcblxuXHR0cnkge1xuXHRcdG91dGVyOiBpZiAodHlwZW9mIG5ld1R5cGUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0bGV0IGMsIGlzTmV3LCBvbGRQcm9wcywgb2xkU3RhdGUsIHNuYXBzaG90LCBjbGVhclByb2Nlc3NpbmdFeGNlcHRpb247XG5cdFx0XHRsZXQgbmV3UHJvcHMgPSBuZXdWTm9kZS5wcm9wcztcblxuXHRcdFx0Ly8gTmVjZXNzYXJ5IGZvciBjcmVhdGVDb250ZXh0IGFwaS4gU2V0dGluZyB0aGlzIHByb3BlcnR5IHdpbGwgcGFzc1xuXHRcdFx0Ly8gdGhlIGNvbnRleHQgdmFsdWUgYXMgYHRoaXMuY29udGV4dGAganVzdCBmb3IgdGhpcyBjb21wb25lbnQuXG5cdFx0XHR0bXAgPSBuZXdUeXBlLmNvbnRleHRUeXBlO1xuXHRcdFx0bGV0IHByb3ZpZGVyID0gdG1wICYmIGdsb2JhbENvbnRleHRbdG1wLl9pZF07XG5cdFx0XHRsZXQgY29tcG9uZW50Q29udGV4dCA9IHRtcFxuXHRcdFx0XHQ/IHByb3ZpZGVyXG5cdFx0XHRcdFx0PyBwcm92aWRlci5wcm9wcy52YWx1ZVxuXHRcdFx0XHRcdDogdG1wLl9kZWZhdWx0VmFsdWVcblx0XHRcdFx0OiBnbG9iYWxDb250ZXh0O1xuXG5cdFx0XHQvLyBHZXQgY29tcG9uZW50IGFuZCBzZXQgaXQgdG8gYGNgXG5cdFx0XHRpZiAob2xkVk5vZGUuX2NvbXBvbmVudCkge1xuXHRcdFx0XHRjID0gbmV3Vk5vZGUuX2NvbXBvbmVudCA9IG9sZFZOb2RlLl9jb21wb25lbnQ7XG5cdFx0XHRcdGNsZWFyUHJvY2Vzc2luZ0V4Y2VwdGlvbiA9IGMuX3Byb2Nlc3NpbmdFeGNlcHRpb24gPSBjLl9wZW5kaW5nRXJyb3I7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBJbnN0YW50aWF0ZSB0aGUgbmV3IGNvbXBvbmVudFxuXHRcdFx0XHRpZiAoJ3Byb3RvdHlwZScgaW4gbmV3VHlwZSAmJiBuZXdUeXBlLnByb3RvdHlwZS5yZW5kZXIpIHtcblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlIFRoZSBjaGVjayBhYm92ZSB2ZXJpZmllcyB0aGF0IG5ld1R5cGUgaXMgc3VwcG9zZSB0byBiZSBjb25zdHJ1Y3RlZFxuXHRcdFx0XHRcdG5ld1ZOb2RlLl9jb21wb25lbnQgPSBjID0gbmV3IG5ld1R5cGUobmV3UHJvcHMsIGNvbXBvbmVudENvbnRleHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlIFRydXN0IG1lLCBDb21wb25lbnQgaW1wbGVtZW50cyB0aGUgaW50ZXJmYWNlIHdlIHdhbnRcblx0XHRcdFx0XHRuZXdWTm9kZS5fY29tcG9uZW50ID0gYyA9IG5ldyBDb21wb25lbnQobmV3UHJvcHMsIGNvbXBvbmVudENvbnRleHQpO1xuXHRcdFx0XHRcdGMuY29uc3RydWN0b3IgPSBuZXdUeXBlO1xuXHRcdFx0XHRcdGMucmVuZGVyID0gZG9SZW5kZXI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHByb3ZpZGVyKSBwcm92aWRlci5zdWIoYyk7XG5cblx0XHRcdFx0Yy5wcm9wcyA9IG5ld1Byb3BzO1xuXHRcdFx0XHRpZiAoIWMuc3RhdGUpIGMuc3RhdGUgPSB7fTtcblx0XHRcdFx0Yy5jb250ZXh0ID0gY29tcG9uZW50Q29udGV4dDtcblx0XHRcdFx0Yy5fZ2xvYmFsQ29udGV4dCA9IGdsb2JhbENvbnRleHQ7XG5cdFx0XHRcdGlzTmV3ID0gYy5fZGlydHkgPSB0cnVlO1xuXHRcdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSW52b2tlIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wc1xuXHRcdFx0aWYgKGMuX25leHRTdGF0ZSA9PSBudWxsKSB7XG5cdFx0XHRcdGMuX25leHRTdGF0ZSA9IGMuc3RhdGU7XG5cdFx0XHR9XG5cdFx0XHRpZiAobmV3VHlwZS5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgIT0gbnVsbCkge1xuXHRcdFx0XHRpZiAoYy5fbmV4dFN0YXRlID09IGMuc3RhdGUpIHtcblx0XHRcdFx0XHRjLl9uZXh0U3RhdGUgPSBhc3NpZ24oe30sIGMuX25leHRTdGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhc3NpZ24oXG5cdFx0XHRcdFx0Yy5fbmV4dFN0YXRlLFxuXHRcdFx0XHRcdG5ld1R5cGUuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKG5ld1Byb3BzLCBjLl9uZXh0U3RhdGUpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdG9sZFByb3BzID0gYy5wcm9wcztcblx0XHRcdG9sZFN0YXRlID0gYy5zdGF0ZTtcblxuXHRcdFx0Ly8gSW52b2tlIHByZS1yZW5kZXIgbGlmZWN5Y2xlIG1ldGhvZHNcblx0XHRcdGlmIChpc05ldykge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0bmV3VHlwZS5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPT0gbnVsbCAmJlxuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbE1vdW50ICE9IG51bGxcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsTW91bnQoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjLmNvbXBvbmVudERpZE1vdW50ICE9IG51bGwpIHtcblx0XHRcdFx0XHRjLl9yZW5kZXJDYWxsYmFja3MucHVzaChjLmNvbXBvbmVudERpZE1vdW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdG5ld1R5cGUuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzID09IG51bGwgJiZcblx0XHRcdFx0XHRuZXdQcm9wcyAhPT0gb2xkUHJvcHMgJiZcblx0XHRcdFx0XHRjLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgIT0gbnVsbFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMsIGNvbXBvbmVudENvbnRleHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCghYy5fZm9yY2UgJiZcblx0XHRcdFx0XHRcdGMuc2hvdWxkQ29tcG9uZW50VXBkYXRlICE9IG51bGwgJiZcblx0XHRcdFx0XHRcdGMuc2hvdWxkQ29tcG9uZW50VXBkYXRlKFxuXHRcdFx0XHRcdFx0XHRuZXdQcm9wcyxcblx0XHRcdFx0XHRcdFx0Yy5fbmV4dFN0YXRlLFxuXHRcdFx0XHRcdFx0XHRjb21wb25lbnRDb250ZXh0XG5cdFx0XHRcdFx0XHQpID09PSBmYWxzZSkgfHxcblx0XHRcdFx0XHRuZXdWTm9kZS5fb3JpZ2luYWwgPT09IG9sZFZOb2RlLl9vcmlnaW5hbFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjLnByb3BzID0gbmV3UHJvcHM7XG5cdFx0XHRcdFx0Yy5zdGF0ZSA9IGMuX25leHRTdGF0ZTtcblx0XHRcdFx0XHQvLyBNb3JlIGluZm8gYWJvdXQgdGhpcyBoZXJlOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9Kb3ZpRGVDcm9vY2svYmVjNWYyY2U5MzU0NGQyZTYwNzBlZjhlMDAzNmU0ZThcblx0XHRcdFx0XHRpZiAobmV3Vk5vZGUuX29yaWdpbmFsICE9PSBvbGRWTm9kZS5fb3JpZ2luYWwpIGMuX2RpcnR5ID0gZmFsc2U7XG5cdFx0XHRcdFx0Yy5fdm5vZGUgPSBuZXdWTm9kZTtcblx0XHRcdFx0XHRuZXdWTm9kZS5fZG9tID0gb2xkVk5vZGUuX2RvbTtcblx0XHRcdFx0XHRuZXdWTm9kZS5fY2hpbGRyZW4gPSBvbGRWTm9kZS5fY2hpbGRyZW47XG5cdFx0XHRcdFx0bmV3Vk5vZGUuX2NoaWxkcmVuLmZvckVhY2godm5vZGUgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHZub2RlKSB2bm9kZS5fcGFyZW50ID0gbmV3Vk5vZGU7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0aWYgKGMuX3JlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGNvbW1pdFF1ZXVlLnB1c2goYyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YnJlYWsgb3V0ZXI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYy5jb21wb25lbnRXaWxsVXBkYXRlICE9IG51bGwpIHtcblx0XHRcdFx0XHRjLmNvbXBvbmVudFdpbGxVcGRhdGUobmV3UHJvcHMsIGMuX25leHRTdGF0ZSwgY29tcG9uZW50Q29udGV4dCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYy5jb21wb25lbnREaWRVcGRhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKCgpID0+IHtcblx0XHRcdFx0XHRcdGMuY29tcG9uZW50RGlkVXBkYXRlKG9sZFByb3BzLCBvbGRTdGF0ZSwgc25hcHNob3QpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGMuY29udGV4dCA9IGNvbXBvbmVudENvbnRleHQ7XG5cdFx0XHRjLnByb3BzID0gbmV3UHJvcHM7XG5cdFx0XHRjLnN0YXRlID0gYy5fbmV4dFN0YXRlO1xuXG5cdFx0XHRpZiAoKHRtcCA9IG9wdGlvbnMuX3JlbmRlcikpIHRtcChuZXdWTm9kZSk7XG5cblx0XHRcdGMuX2RpcnR5ID0gZmFsc2U7XG5cdFx0XHRjLl92bm9kZSA9IG5ld1ZOb2RlO1xuXHRcdFx0Yy5fcGFyZW50RG9tID0gcGFyZW50RG9tO1xuXG5cdFx0XHR0bXAgPSBjLnJlbmRlcihjLnByb3BzLCBjLnN0YXRlLCBjLmNvbnRleHQpO1xuXG5cdFx0XHQvLyBIYW5kbGUgc2V0U3RhdGUgY2FsbGVkIGluIHJlbmRlciwgc2VlICMyNTUzXG5cdFx0XHRjLnN0YXRlID0gYy5fbmV4dFN0YXRlO1xuXG5cdFx0XHRpZiAoYy5nZXRDaGlsZENvbnRleHQgIT0gbnVsbCkge1xuXHRcdFx0XHRnbG9iYWxDb250ZXh0ID0gYXNzaWduKGFzc2lnbih7fSwgZ2xvYmFsQ29udGV4dCksIGMuZ2V0Q2hpbGRDb250ZXh0KCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzTmV3ICYmIGMuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRzbmFwc2hvdCA9IGMuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUob2xkUHJvcHMsIG9sZFN0YXRlKTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGlzVG9wTGV2ZWxGcmFnbWVudCA9XG5cdFx0XHRcdHRtcCAhPSBudWxsICYmIHRtcC50eXBlID09PSBGcmFnbWVudCAmJiB0bXAua2V5ID09IG51bGw7XG5cdFx0XHRsZXQgcmVuZGVyUmVzdWx0ID0gaXNUb3BMZXZlbEZyYWdtZW50ID8gdG1wLnByb3BzLmNoaWxkcmVuIDogdG1wO1xuXG5cdFx0XHRkaWZmQ2hpbGRyZW4oXG5cdFx0XHRcdHBhcmVudERvbSxcblx0XHRcdFx0QXJyYXkuaXNBcnJheShyZW5kZXJSZXN1bHQpID8gcmVuZGVyUmVzdWx0IDogW3JlbmRlclJlc3VsdF0sXG5cdFx0XHRcdG5ld1ZOb2RlLFxuXHRcdFx0XHRvbGRWTm9kZSxcblx0XHRcdFx0Z2xvYmFsQ29udGV4dCxcblx0XHRcdFx0aXNTdmcsXG5cdFx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRcdFx0XHRjb21taXRRdWV1ZSxcblx0XHRcdFx0b2xkRG9tLFxuXHRcdFx0XHRpc0h5ZHJhdGluZ1xuXHRcdFx0KTtcblxuXHRcdFx0Yy5iYXNlID0gbmV3Vk5vZGUuX2RvbTtcblxuXHRcdFx0Ly8gV2Ugc3VjY2Vzc2Z1bGx5IHJlbmRlcmVkIHRoaXMgVk5vZGUsIHVuc2V0IGFueSBzdG9yZWQgaHlkcmF0aW9uL2JhaWxvdXQgc3RhdGU6XG5cdFx0XHRuZXdWTm9kZS5faHlkcmF0aW5nID0gbnVsbDtcblxuXHRcdFx0aWYgKGMuX3JlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0Y29tbWl0UXVldWUucHVzaChjKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNsZWFyUHJvY2Vzc2luZ0V4Y2VwdGlvbikge1xuXHRcdFx0XHRjLl9wZW5kaW5nRXJyb3IgPSBjLl9wcm9jZXNzaW5nRXhjZXB0aW9uID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0Yy5fZm9yY2UgPSBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4gPT0gbnVsbCAmJlxuXHRcdFx0bmV3Vk5vZGUuX29yaWdpbmFsID09PSBvbGRWTm9kZS5fb3JpZ2luYWxcblx0XHQpIHtcblx0XHRcdG5ld1ZOb2RlLl9jaGlsZHJlbiA9IG9sZFZOb2RlLl9jaGlsZHJlbjtcblx0XHRcdG5ld1ZOb2RlLl9kb20gPSBvbGRWTm9kZS5fZG9tO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXdWTm9kZS5fZG9tID0gZGlmZkVsZW1lbnROb2Rlcyhcblx0XHRcdFx0b2xkVk5vZGUuX2RvbSxcblx0XHRcdFx0bmV3Vk5vZGUsXG5cdFx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0XHRnbG9iYWxDb250ZXh0LFxuXHRcdFx0XHRpc1N2Zyxcblx0XHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdFx0XHRcdGNvbW1pdFF1ZXVlLFxuXHRcdFx0XHRpc0h5ZHJhdGluZ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoKHRtcCA9IG9wdGlvbnMuZGlmZmVkKSkgdG1wKG5ld1ZOb2RlKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdG5ld1ZOb2RlLl9vcmlnaW5hbCA9IG51bGw7XG5cdFx0Ly8gaWYgaHlkcmF0aW5nIG9yIGNyZWF0aW5nIGluaXRpYWwgdHJlZSwgYmFpbG91dCBwcmVzZXJ2ZXMgRE9NOlxuXHRcdGlmIChpc0h5ZHJhdGluZyB8fCBleGNlc3NEb21DaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRuZXdWTm9kZS5fZG9tID0gb2xkRG9tO1xuXHRcdFx0bmV3Vk5vZGUuX2h5ZHJhdGluZyA9ICEhaXNIeWRyYXRpbmc7XG5cdFx0XHRleGNlc3NEb21DaGlsZHJlbltleGNlc3NEb21DaGlsZHJlbi5pbmRleE9mKG9sZERvbSldID0gbnVsbDtcblx0XHRcdC8vIF4gY291bGQgcG9zc2libHkgYmUgc2ltcGxpZmllZCB0bzpcblx0XHRcdC8vIGV4Y2Vzc0RvbUNoaWxkcmVuLmxlbmd0aCA9IDA7XG5cdFx0fVxuXHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgbmV3Vk5vZGUsIG9sZFZOb2RlKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59IGNvbW1pdFF1ZXVlIExpc3Qgb2YgY29tcG9uZW50c1xuICogd2hpY2ggaGF2ZSBjYWxsYmFja3MgdG8gaW52b2tlIGluIGNvbW1pdFJvb3RcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSByb290XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21taXRSb290KGNvbW1pdFF1ZXVlLCByb290KSB7XG5cdGlmIChvcHRpb25zLl9jb21taXQpIG9wdGlvbnMuX2NvbW1pdChyb290LCBjb21taXRRdWV1ZSk7XG5cblx0Y29tbWl0UXVldWUuc29tZShjID0+IHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZSBSZXVzZSB0aGUgY29tbWl0UXVldWUgdmFyaWFibGUgaGVyZSBzbyB0aGUgdHlwZSBjaGFuZ2VzXG5cdFx0XHRjb21taXRRdWV1ZSA9IGMuX3JlbmRlckNhbGxiYWNrcztcblx0XHRcdGMuX3JlbmRlckNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0Y29tbWl0UXVldWUuc29tZShjYiA9PiB7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmUgU2VlIGFib3ZlIHRzLWlnbm9yZSBvbiBjb21taXRRdWV1ZVxuXHRcdFx0XHRjYi5jYWxsKGMpO1xuXHRcdFx0fSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0b3B0aW9ucy5fY2F0Y2hFcnJvcihlLCBjLl92bm9kZSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBEaWZmIHR3byB2aXJ0dWFsIG5vZGVzIHJlcHJlc2VudGluZyBET00gZWxlbWVudFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gZG9tIFRoZSBET00gZWxlbWVudCByZXByZXNlbnRpbmdcbiAqIHRoZSB2aXJ0dWFsIG5vZGVzIGJlaW5nIGRpZmZlZFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG5ld1ZOb2RlIFRoZSBuZXcgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gb2xkVk5vZGUgVGhlIG9sZCB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBnbG9iYWxDb250ZXh0IFRoZSBjdXJyZW50IGNvbnRleHQgb2JqZWN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3ZnIFdoZXRoZXIgb3Igbm90IHRoaXMgRE9NIG5vZGUgaXMgYW4gU1ZHIG5vZGVcbiAqIEBwYXJhbSB7Kn0gZXhjZXNzRG9tQ2hpbGRyZW5cbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59IGNvbW1pdFF1ZXVlIExpc3Qgb2YgY29tcG9uZW50c1xuICogd2hpY2ggaGF2ZSBjYWxsYmFja3MgdG8gaW52b2tlIGluIGNvbW1pdFJvb3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNIeWRyYXRpbmcgV2hldGhlciBvciBub3Qgd2UgYXJlIGluIGh5ZHJhdGlvblxuICogQHJldHVybnMge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fVxuICovXG5mdW5jdGlvbiBkaWZmRWxlbWVudE5vZGVzKFxuXHRkb20sXG5cdG5ld1ZOb2RlLFxuXHRvbGRWTm9kZSxcblx0Z2xvYmFsQ29udGV4dCxcblx0aXNTdmcsXG5cdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRjb21taXRRdWV1ZSxcblx0aXNIeWRyYXRpbmdcbikge1xuXHRsZXQgb2xkUHJvcHMgPSBvbGRWTm9kZS5wcm9wcztcblx0bGV0IG5ld1Byb3BzID0gbmV3Vk5vZGUucHJvcHM7XG5cdGxldCBub2RlVHlwZSA9IG5ld1ZOb2RlLnR5cGU7XG5cdGxldCBpID0gMDtcblxuXHQvLyBUcmFja3MgZW50ZXJpbmcgYW5kIGV4aXRpbmcgU1ZHIG5hbWVzcGFjZSB3aGVuIGRlc2NlbmRpbmcgdGhyb3VnaCB0aGUgdHJlZS5cblx0aWYgKG5vZGVUeXBlID09PSAnc3ZnJykgaXNTdmcgPSB0cnVlO1xuXG5cdGlmIChleGNlc3NEb21DaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0Zm9yICg7IGkgPCBleGNlc3NEb21DaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgY2hpbGQgPSBleGNlc3NEb21DaGlsZHJlbltpXTtcblxuXHRcdFx0Ly8gaWYgbmV3Vk5vZGUgbWF0Y2hlcyBhbiBlbGVtZW50IGluIGV4Y2Vzc0RvbUNoaWxkcmVuIG9yIHRoZSBgZG9tYFxuXHRcdFx0Ly8gYXJndW1lbnQgbWF0Y2hlcyBhbiBlbGVtZW50IGluIGV4Y2Vzc0RvbUNoaWxkcmVuLCByZW1vdmUgaXQgZnJvbVxuXHRcdFx0Ly8gZXhjZXNzRG9tQ2hpbGRyZW4gc28gaXQgaXNuJ3QgbGF0ZXIgcmVtb3ZlZCBpbiBkaWZmQ2hpbGRyZW5cblx0XHRcdGlmIChcblx0XHRcdFx0Y2hpbGQgJiZcblx0XHRcdFx0KGNoaWxkID09PSBkb20gfHxcblx0XHRcdFx0XHQobm9kZVR5cGUgPyBjaGlsZC5sb2NhbE5hbWUgPT0gbm9kZVR5cGUgOiBjaGlsZC5ub2RlVHlwZSA9PSAzKSlcblx0XHRcdCkge1xuXHRcdFx0XHRkb20gPSBjaGlsZDtcblx0XHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW5baV0gPSBudWxsO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoZG9tID09IG51bGwpIHtcblx0XHRpZiAobm9kZVR5cGUgPT09IG51bGwpIHtcblx0XHRcdC8vIEB0cy1pZ25vcmUgY3JlYXRlVGV4dE5vZGUgcmV0dXJucyBUZXh0LCB3ZSBleHBlY3QgUHJlYWN0RWxlbWVudFxuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5ld1Byb3BzKTtcblx0XHR9XG5cblx0XHRpZiAoaXNTdmcpIHtcblx0XHRcdGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcblx0XHRcdFx0J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZSBXZSBrbm93IGBuZXdWTm9kZS50eXBlYCBpcyBhIHN0cmluZ1xuXHRcdFx0XHRub2RlVHlwZVxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZSBXZSBrbm93IGBuZXdWTm9kZS50eXBlYCBpcyBhIHN0cmluZ1xuXHRcdFx0XHRub2RlVHlwZSxcblx0XHRcdFx0bmV3UHJvcHMuaXMgJiYgbmV3UHJvcHNcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Ly8gd2UgY3JlYXRlZCBhIG5ldyBwYXJlbnQsIHNvIG5vbmUgb2YgdGhlIHByZXZpb3VzbHkgYXR0YWNoZWQgY2hpbGRyZW4gY2FuIGJlIHJldXNlZDpcblx0XHRleGNlc3NEb21DaGlsZHJlbiA9IG51bGw7XG5cdFx0Ly8gd2UgYXJlIGNyZWF0aW5nIGEgbmV3IG5vZGUsIHNvIHdlIGNhbiBhc3N1bWUgdGhpcyBpcyBhIG5ldyBzdWJ0cmVlIChpbiBjYXNlIHdlIGFyZSBoeWRyYXRpbmcpLCB0aGlzIGRlb3B0cyB0aGUgaHlkcmF0ZVxuXHRcdGlzSHlkcmF0aW5nID0gZmFsc2U7XG5cdH1cblxuXHRpZiAobm9kZVR5cGUgPT09IG51bGwpIHtcblx0XHQvLyBEdXJpbmcgaHlkcmF0aW9uLCB3ZSBzdGlsbCBoYXZlIHRvIHNwbGl0IG1lcmdlZCB0ZXh0IGZyb20gU1NSJ2QgSFRNTC5cblx0XHRpZiAob2xkUHJvcHMgIT09IG5ld1Byb3BzICYmICghaXNIeWRyYXRpbmcgfHwgZG9tLmRhdGEgIT09IG5ld1Byb3BzKSkge1xuXHRcdFx0ZG9tLmRhdGEgPSBuZXdQcm9wcztcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgZXhjZXNzRG9tQ2hpbGRyZW4gd2FzIG5vdCBudWxsLCByZXBvcHVsYXRlIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCdzIGNoaWxkcmVuOlxuXHRcdGV4Y2Vzc0RvbUNoaWxkcmVuID1cblx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuICYmIEVNUFRZX0FSUi5zbGljZS5jYWxsKGRvbS5jaGlsZE5vZGVzKTtcblxuXHRcdG9sZFByb3BzID0gb2xkVk5vZGUucHJvcHMgfHwgRU1QVFlfT0JKO1xuXG5cdFx0bGV0IG9sZEh0bWwgPSBvbGRQcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTDtcblx0XHRsZXQgbmV3SHRtbCA9IG5ld1Byb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MO1xuXG5cdFx0Ly8gRHVyaW5nIGh5ZHJhdGlvbiwgcHJvcHMgYXJlIG5vdCBkaWZmZWQgYXQgYWxsIChpbmNsdWRpbmcgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpXG5cdFx0Ly8gQFRPRE8gd2Ugc2hvdWxkIHdhcm4gaW4gZGVidWcgbW9kZSB3aGVuIHByb3BzIGRvbid0IG1hdGNoIGhlcmUuXG5cdFx0aWYgKCFpc0h5ZHJhdGluZykge1xuXHRcdFx0Ly8gQnV0LCBpZiB3ZSBhcmUgaW4gYSBzaXR1YXRpb24gd2hlcmUgd2UgYXJlIHVzaW5nIGV4aXN0aW5nIERPTSAoZS5nLiByZXBsYWNlTm9kZSlcblx0XHRcdC8vIHdlIHNob3VsZCByZWFkIHRoZSBleGlzdGluZyBET00gYXR0cmlidXRlcyB0byBkaWZmIHRoZW1cblx0XHRcdGlmIChleGNlc3NEb21DaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRcdG9sZFByb3BzID0ge307XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZG9tLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRvbGRQcm9wc1tkb20uYXR0cmlidXRlc1tpXS5uYW1lXSA9IGRvbS5hdHRyaWJ1dGVzW2ldLnZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChuZXdIdG1sIHx8IG9sZEh0bWwpIHtcblx0XHRcdFx0Ly8gQXZvaWQgcmUtYXBwbHlpbmcgdGhlIHNhbWUgJ19faHRtbCcgaWYgaXQgZGlkIG5vdCBjaGFuZ2VkIGJldHdlZW4gcmUtcmVuZGVyXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQhbmV3SHRtbCB8fFxuXHRcdFx0XHRcdCgoIW9sZEh0bWwgfHwgbmV3SHRtbC5fX2h0bWwgIT0gb2xkSHRtbC5fX2h0bWwpICYmXG5cdFx0XHRcdFx0XHRuZXdIdG1sLl9faHRtbCAhPT0gZG9tLmlubmVySFRNTClcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZG9tLmlubmVySFRNTCA9IChuZXdIdG1sICYmIG5ld0h0bWwuX19odG1sKSB8fCAnJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRpZmZQcm9wcyhkb20sIG5ld1Byb3BzLCBvbGRQcm9wcywgaXNTdmcsIGlzSHlkcmF0aW5nKTtcblxuXHRcdC8vIElmIHRoZSBuZXcgdm5vZGUgZGlkbid0IGhhdmUgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwsIGRpZmYgaXRzIGNoaWxkcmVuXG5cdFx0aWYgKG5ld0h0bWwpIHtcblx0XHRcdG5ld1ZOb2RlLl9jaGlsZHJlbiA9IFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpID0gbmV3Vk5vZGUucHJvcHMuY2hpbGRyZW47XG5cdFx0XHRkaWZmQ2hpbGRyZW4oXG5cdFx0XHRcdGRvbSxcblx0XHRcdFx0QXJyYXkuaXNBcnJheShpKSA/IGkgOiBbaV0sXG5cdFx0XHRcdG5ld1ZOb2RlLFxuXHRcdFx0XHRvbGRWTm9kZSxcblx0XHRcdFx0Z2xvYmFsQ29udGV4dCxcblx0XHRcdFx0aXNTdmcgJiYgbm9kZVR5cGUgIT09ICdmb3JlaWduT2JqZWN0Jyxcblx0XHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdFx0XHRcdGNvbW1pdFF1ZXVlLFxuXHRcdFx0XHRkb20uZmlyc3RDaGlsZCxcblx0XHRcdFx0aXNIeWRyYXRpbmdcblx0XHRcdCk7XG5cblx0XHRcdC8vIFJlbW92ZSBjaGlsZHJlbiB0aGF0IGFyZSBub3QgcGFydCBvZiBhbnkgdm5vZGUuXG5cdFx0XHRpZiAoZXhjZXNzRG9tQ2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKGkgPSBleGNlc3NEb21DaGlsZHJlbi5sZW5ndGg7IGktLTsgKSB7XG5cdFx0XHRcdFx0aWYgKGV4Y2Vzc0RvbUNoaWxkcmVuW2ldICE9IG51bGwpIHJlbW92ZU5vZGUoZXhjZXNzRG9tQ2hpbGRyZW5baV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gKGFzIGFib3ZlLCBkb24ndCBkaWZmIHByb3BzIGR1cmluZyBoeWRyYXRpb24pXG5cdFx0aWYgKCFpc0h5ZHJhdGluZykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQndmFsdWUnIGluIG5ld1Byb3BzICYmXG5cdFx0XHRcdChpID0gbmV3UHJvcHMudmFsdWUpICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0Ly8gIzI3NTYgRm9yIHRoZSA8cHJvZ3Jlc3M+LWVsZW1lbnQgdGhlIGluaXRpYWwgdmFsdWUgaXMgMCxcblx0XHRcdFx0Ly8gZGVzcGl0ZSB0aGUgYXR0cmlidXRlIG5vdCBiZWluZyBwcmVzZW50LiBXaGVuIHRoZSBhdHRyaWJ1dGVcblx0XHRcdFx0Ly8gaXMgbWlzc2luZyB0aGUgcHJvZ3Jlc3MgYmFyIGlzIHRyZWF0ZWQgYXMgaW5kZXRlcm1pbmF0ZS5cblx0XHRcdFx0Ly8gVG8gZml4IHRoYXQgd2UnbGwgYWx3YXlzIHVwZGF0ZSBpdCB3aGVuIGl0IGlzIDAgZm9yIHByb2dyZXNzIGVsZW1lbnRzXG5cdFx0XHRcdChpICE9PSBkb20udmFsdWUgfHwgKG5vZGVUeXBlID09PSAncHJvZ3Jlc3MnICYmICFpKSlcblx0XHRcdCkge1xuXHRcdFx0XHRzZXRQcm9wZXJ0eShkb20sICd2YWx1ZScsIGksIG9sZFByb3BzLnZhbHVlLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCdjaGVja2VkJyBpbiBuZXdQcm9wcyAmJlxuXHRcdFx0XHQoaSA9IG5ld1Byb3BzLmNoZWNrZWQpICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0aSAhPT0gZG9tLmNoZWNrZWRcblx0XHRcdCkge1xuXHRcdFx0XHRzZXRQcm9wZXJ0eShkb20sICdjaGVja2VkJywgaSwgb2xkUHJvcHMuY2hlY2tlZCwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkb207XG59XG5cbi8qKlxuICogSW52b2tlIG9yIHVwZGF0ZSBhIHJlZiwgZGVwZW5kaW5nIG9uIHdoZXRoZXIgaXQgaXMgYSBmdW5jdGlvbiBvciBvYmplY3QgcmVmLlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHJlZlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UmVmKHJlZiwgdmFsdWUsIHZub2RlKSB7XG5cdHRyeSB7XG5cdFx0aWYgKHR5cGVvZiByZWYgPT0gJ2Z1bmN0aW9uJykgcmVmKHZhbHVlKTtcblx0XHRlbHNlIHJlZi5jdXJyZW50ID0gdmFsdWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIHZub2RlKTtcblx0fVxufVxuXG4vKipcbiAqIFVubW91bnQgYSB2aXJ0dWFsIG5vZGUgZnJvbSB0aGUgdHJlZSBhbmQgYXBwbHkgRE9NIGNoYW5nZXNcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZSBUaGUgdmlydHVhbCBub2RlIHRvIHVubW91bnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBwYXJlbnRWTm9kZSBUaGUgcGFyZW50IG9mIHRoZSBWTm9kZSB0aGF0XG4gKiBpbml0aWF0ZWQgdGhlIHVubW91bnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NraXBSZW1vdmVdIEZsYWcgdGhhdCBpbmRpY2F0ZXMgdGhhdCBhIHBhcmVudCBub2RlIG9mIHRoZVxuICogY3VycmVudCBlbGVtZW50IGlzIGFscmVhZHkgZGV0YWNoZWQgZnJvbSB0aGUgRE9NLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5tb3VudCh2bm9kZSwgcGFyZW50Vk5vZGUsIHNraXBSZW1vdmUpIHtcblx0bGV0IHI7XG5cdGlmIChvcHRpb25zLnVubW91bnQpIG9wdGlvbnMudW5tb3VudCh2bm9kZSk7XG5cblx0aWYgKChyID0gdm5vZGUucmVmKSkge1xuXHRcdGlmICghci5jdXJyZW50IHx8IHIuY3VycmVudCA9PT0gdm5vZGUuX2RvbSkgYXBwbHlSZWYociwgbnVsbCwgcGFyZW50Vk5vZGUpO1xuXHR9XG5cblx0bGV0IGRvbTtcblx0aWYgKCFza2lwUmVtb3ZlICYmIHR5cGVvZiB2bm9kZS50eXBlICE9ICdmdW5jdGlvbicpIHtcblx0XHRza2lwUmVtb3ZlID0gKGRvbSA9IHZub2RlLl9kb20pICE9IG51bGw7XG5cdH1cblxuXHQvLyBNdXN0IGJlIHNldCB0byBgdW5kZWZpbmVkYCB0byBwcm9wZXJseSBjbGVhbiB1cCBgX25leHREb21gXG5cdC8vIGZvciB3aGljaCBgbnVsbGAgaXMgYSB2YWxpZCB2YWx1ZS4gU2VlIGNvbW1lbnQgaW4gYGNyZWF0ZS1lbGVtZW50LmpzYFxuXHR2bm9kZS5fZG9tID0gdm5vZGUuX25leHREb20gPSB1bmRlZmluZWQ7XG5cblx0aWYgKChyID0gdm5vZGUuX2NvbXBvbmVudCkgIT0gbnVsbCkge1xuXHRcdGlmIChyLmNvbXBvbmVudFdpbGxVbm1vdW50KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgcGFyZW50Vk5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHIuYmFzZSA9IHIuX3BhcmVudERvbSA9IG51bGw7XG5cdH1cblxuXHRpZiAoKHIgPSB2bm9kZS5fY2hpbGRyZW4pKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAocltpXSkgdW5tb3VudChyW2ldLCBwYXJlbnRWTm9kZSwgc2tpcFJlbW92ZSk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGRvbSAhPSBudWxsKSByZW1vdmVOb2RlKGRvbSk7XG59XG5cbi8qKiBUaGUgYC5yZW5kZXIoKWAgbWV0aG9kIGZvciBhIFBGQyBiYWNraW5nIGluc3RhbmNlLiAqL1xuZnVuY3Rpb24gZG9SZW5kZXIocHJvcHMsIHN0YXRlLCBjb250ZXh0KSB7XG5cdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KTtcbn1cbiIsImltcG9ydCB7IEVNUFRZX09CSiwgRU1QVFlfQVJSIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgY29tbWl0Um9vdCwgZGlmZiB9IGZyb20gJy4vZGlmZi9pbmRleCc7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBGcmFnbWVudCB9IGZyb20gJy4vY3JlYXRlLWVsZW1lbnQnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9vcHRpb25zJztcblxuLyoqXG4gKiBSZW5kZXIgYSBQcmVhY3QgdmlydHVhbCBub2RlIGludG8gYSBET00gZWxlbWVudFxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnRDaGlsZH0gdm5vZGUgVGhlIHZpcnR1YWwgbm9kZSB0byByZW5kZXJcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gcGFyZW50RG9tIFRoZSBET00gZWxlbWVudCB0b1xuICogcmVuZGVyIGludG9cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuUHJlYWN0RWxlbWVudCB8IG9iamVjdH0gW3JlcGxhY2VOb2RlXSBPcHRpb25hbDogQXR0ZW1wdCB0byByZS11c2UgYW5cbiAqIGV4aXN0aW5nIERPTSB0cmVlIHJvb3RlZCBhdCBgcmVwbGFjZU5vZGVgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIodm5vZGUsIHBhcmVudERvbSwgcmVwbGFjZU5vZGUpIHtcblx0aWYgKG9wdGlvbnMuX3Jvb3QpIG9wdGlvbnMuX3Jvb3Qodm5vZGUsIHBhcmVudERvbSk7XG5cblx0Ly8gV2UgYWJ1c2UgdGhlIGByZXBsYWNlTm9kZWAgcGFyYW1ldGVyIGluIGBoeWRyYXRlKClgIHRvIHNpZ25hbCBpZiB3ZSBhcmUgaW5cblx0Ly8gaHlkcmF0aW9uIG1vZGUgb3Igbm90IGJ5IHBhc3NpbmcgdGhlIGBoeWRyYXRlYCBmdW5jdGlvbiBpbnN0ZWFkIG9mIGEgRE9NXG5cdC8vIGVsZW1lbnQuLlxuXHRsZXQgaXNIeWRyYXRpbmcgPSB0eXBlb2YgcmVwbGFjZU5vZGUgPT09ICdmdW5jdGlvbic7XG5cblx0Ly8gVG8gYmUgYWJsZSB0byBzdXBwb3J0IGNhbGxpbmcgYHJlbmRlcigpYCBtdWx0aXBsZSB0aW1lcyBvbiB0aGUgc2FtZVxuXHQvLyBET00gbm9kZSwgd2UgbmVlZCB0byBvYnRhaW4gYSByZWZlcmVuY2UgdG8gdGhlIHByZXZpb3VzIHRyZWUuIFdlIGRvXG5cdC8vIHRoaXMgYnkgYXNzaWduaW5nIGEgbmV3IGBfY2hpbGRyZW5gIHByb3BlcnR5IHRvIERPTSBub2RlcyB3aGljaCBwb2ludHNcblx0Ly8gdG8gdGhlIGxhc3QgcmVuZGVyZWQgdHJlZS4gQnkgZGVmYXVsdCB0aGlzIHByb3BlcnR5IGlzIG5vdCBwcmVzZW50LCB3aGljaFxuXHQvLyBtZWFucyB0aGF0IHdlIGFyZSBtb3VudGluZyBhIG5ldyB0cmVlIGZvciB0aGUgZmlyc3QgdGltZS5cblx0bGV0IG9sZFZOb2RlID0gaXNIeWRyYXRpbmdcblx0XHQ/IG51bGxcblx0XHQ6IChyZXBsYWNlTm9kZSAmJiByZXBsYWNlTm9kZS5fY2hpbGRyZW4pIHx8IHBhcmVudERvbS5fY2hpbGRyZW47XG5cblx0dm5vZGUgPSAoXG5cdFx0KCFpc0h5ZHJhdGluZyAmJiByZXBsYWNlTm9kZSkgfHxcblx0XHRwYXJlbnREb21cblx0KS5fY2hpbGRyZW4gPSBjcmVhdGVFbGVtZW50KEZyYWdtZW50LCBudWxsLCBbdm5vZGVdKTtcblxuXHQvLyBMaXN0IG9mIGVmZmVjdHMgdGhhdCBuZWVkIHRvIGJlIGNhbGxlZCBhZnRlciBkaWZmaW5nLlxuXHRsZXQgY29tbWl0UXVldWUgPSBbXTtcblx0ZGlmZihcblx0XHRwYXJlbnREb20sXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBuZXcgdm5vZGUgdHJlZSBhbmQgc3RvcmUgaXQgb24gdGhlIERPTSBlbGVtZW50IG9uXG5cdFx0Ly8gb3VyIGN1c3RvbSBgX2NoaWxkcmVuYCBwcm9wZXJ0eS5cblx0XHR2bm9kZSxcblx0XHRvbGRWTm9kZSB8fCBFTVBUWV9PQkosXG5cdFx0RU1QVFlfT0JKLFxuXHRcdHBhcmVudERvbS5vd25lclNWR0VsZW1lbnQgIT09IHVuZGVmaW5lZCxcblx0XHQhaXNIeWRyYXRpbmcgJiYgcmVwbGFjZU5vZGVcblx0XHRcdD8gW3JlcGxhY2VOb2RlXVxuXHRcdFx0OiBvbGRWTm9kZVxuXHRcdFx0PyBudWxsXG5cdFx0XHQ6IHBhcmVudERvbS5maXJzdENoaWxkXG5cdFx0XHQ/IEVNUFRZX0FSUi5zbGljZS5jYWxsKHBhcmVudERvbS5jaGlsZE5vZGVzKVxuXHRcdFx0OiBudWxsLFxuXHRcdGNvbW1pdFF1ZXVlLFxuXHRcdCFpc0h5ZHJhdGluZyAmJiByZXBsYWNlTm9kZVxuXHRcdFx0PyByZXBsYWNlTm9kZVxuXHRcdFx0OiBvbGRWTm9kZVxuXHRcdFx0PyBvbGRWTm9kZS5fZG9tXG5cdFx0XHQ6IHBhcmVudERvbS5maXJzdENoaWxkLFxuXHRcdGlzSHlkcmF0aW5nXG5cdCk7XG5cblx0Ly8gRmx1c2ggYWxsIHF1ZXVlZCBlZmZlY3RzXG5cdGNvbW1pdFJvb3QoY29tbWl0UXVldWUsIHZub2RlKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgYW4gZXhpc3RpbmcgRE9NIGVsZW1lbnQgd2l0aCBkYXRhIGZyb20gYSBQcmVhY3QgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudENoaWxkfSB2bm9kZSBUaGUgdmlydHVhbCBub2RlIHRvIHJlbmRlclxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBwYXJlbnREb20gVGhlIERPTSBlbGVtZW50IHRvXG4gKiB1cGRhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGUodm5vZGUsIHBhcmVudERvbSkge1xuXHRyZW5kZXIodm5vZGUsIHBhcmVudERvbSwgaHlkcmF0ZSk7XG59XG4iLCJpbXBvcnQgeyBhc3NpZ24gfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgY3JlYXRlVk5vZGUgfSBmcm9tICcuL2NyZWF0ZS1lbGVtZW50JztcblxuLyoqXG4gKiBDbG9uZXMgdGhlIGdpdmVuIFZOb2RlLCBvcHRpb25hbGx5IGFkZGluZyBhdHRyaWJ1dGVzL3Byb3BzIGFuZCByZXBsYWNpbmcgaXRzIGNoaWxkcmVuLlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX0gdm5vZGUgVGhlIHZpcnR1YWwgRE9NIGVsZW1lbnQgdG8gY2xvbmVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBBdHRyaWJ1dGVzL3Byb3BzIHRvIGFkZCB3aGVuIGNsb25pbmdcbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50Q2hpbGRyZW4+fSByZXN0IEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyB3aWxsIGJlIHVzZWQgYXMgcmVwbGFjZW1lbnQgY2hpbGRyZW4uXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZUVsZW1lbnQodm5vZGUsIHByb3BzLCBjaGlsZHJlbikge1xuXHRsZXQgbm9ybWFsaXplZFByb3BzID0gYXNzaWduKHt9LCB2bm9kZS5wcm9wcyksXG5cdFx0a2V5LFxuXHRcdHJlZixcblx0XHRpO1xuXHRmb3IgKGkgaW4gcHJvcHMpIHtcblx0XHRpZiAoaSA9PSAna2V5Jykga2V5ID0gcHJvcHNbaV07XG5cdFx0ZWxzZSBpZiAoaSA9PSAncmVmJykgcmVmID0gcHJvcHNbaV07XG5cdFx0ZWxzZSBub3JtYWxpemVkUHJvcHNbaV0gPSBwcm9wc1tpXTtcblx0fVxuXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMykge1xuXHRcdGNoaWxkcmVuID0gW2NoaWxkcmVuXTtcblx0XHRmb3IgKGkgPSAzOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjaGlsZHJlbi5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0fVxuXHR9XG5cdGlmIChjaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0bm9ybWFsaXplZFByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG5cdH1cblxuXHRyZXR1cm4gY3JlYXRlVk5vZGUoXG5cdFx0dm5vZGUudHlwZSxcblx0XHRub3JtYWxpemVkUHJvcHMsXG5cdFx0a2V5IHx8IHZub2RlLmtleSxcblx0XHRyZWYgfHwgdm5vZGUucmVmLFxuXHRcdG51bGxcblx0KTtcbn1cbiIsIi8qKlxuICogRmluZCB0aGUgY2xvc2VzdCBlcnJvciBib3VuZGFyeSB0byBhIHRocm93biBlcnJvciBhbmQgY2FsbCBpdFxuICogQHBhcmFtIHtvYmplY3R9IGVycm9yIFRoZSB0aHJvd24gdmFsdWVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZSBUaGUgdm5vZGUgdGhhdCB0aHJld1xuICogdGhlIGVycm9yIHRoYXQgd2FzIGNhdWdodCAoZXhjZXB0IGZvciB1bm1vdW50aW5nIHdoZW4gdGhpcyBwYXJhbWV0ZXJcbiAqIGlzIHRoZSBoaWdoZXN0IHBhcmVudCB0aGF0IHdhcyBiZWluZyB1bm1vdW50ZWQpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY2F0Y2hFcnJvcihlcnJvciwgdm5vZGUpIHtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4uL2ludGVybmFsJykuQ29tcG9uZW50fSAqL1xuXHRsZXQgY29tcG9uZW50LCBjdG9yLCBoYW5kbGVkO1xuXG5cdGZvciAoOyAodm5vZGUgPSB2bm9kZS5fcGFyZW50KTsgKSB7XG5cdFx0aWYgKChjb21wb25lbnQgPSB2bm9kZS5fY29tcG9uZW50KSAmJiAhY29tcG9uZW50Ll9wcm9jZXNzaW5nRXhjZXB0aW9uKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjdG9yID0gY29tcG9uZW50LmNvbnN0cnVjdG9yO1xuXG5cdFx0XHRcdGlmIChjdG9yICYmIGN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbUVycm9yICE9IG51bGwpIHtcblx0XHRcdFx0XHRjb21wb25lbnQuc2V0U3RhdGUoY3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3IpKTtcblx0XHRcdFx0XHRoYW5kbGVkID0gY29tcG9uZW50Ll9kaXJ0eTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjb21wb25lbnQuY29tcG9uZW50RGlkQ2F0Y2ggIT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbXBvbmVudC5jb21wb25lbnREaWRDYXRjaChlcnJvcik7XG5cdFx0XHRcdFx0aGFuZGxlZCA9IGNvbXBvbmVudC5fZGlydHk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBUaGlzIGlzIGFuIGVycm9yIGJvdW5kYXJ5LiBNYXJrIGl0IGFzIGhhdmluZyBiYWlsZWQgb3V0LCBhbmQgd2hldGhlciBpdCB3YXMgbWlkLWh5ZHJhdGlvbi5cblx0XHRcdFx0aWYgKGhhbmRsZWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gKGNvbXBvbmVudC5fcGVuZGluZ0Vycm9yID0gY29tcG9uZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRlcnJvciA9IGU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dGhyb3cgZXJyb3I7XG59XG4iLCJpbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAncHJlYWN0JztcblxuLyoqIEB0eXBlIHtudW1iZXJ9ICovXG5sZXQgY3VycmVudEluZGV4O1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gKi9cbmxldCBjdXJyZW50Q29tcG9uZW50O1xuLyoqXG4gKiBLZWVwIHRyYWNrIG9mIHRoZSBwcmV2aW91cyBjb21wb25lbnQgc28gdGhhdCB3ZSBjYW4gc2V0XG4gKiBgY3VycmVudENvbXBvbmVudGAgdG8gYG51bGxgIGFuZCB0aHJvdyB3aGVuIGEgaG9vayBpcyBpbnZva2VkXG4gKiBvdXRzaWRlIG9mIHJlbmRlclxuICogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH1cbiAqL1xubGV0IHByZXZpb3VzQ29tcG9uZW50O1xuXG4vKiogQHR5cGUge251bWJlcn0gKi9cbmxldCBjdXJyZW50SG9vayA9IDA7XG5cbi8qKiBAdHlwZSB7QXJyYXk8aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50Pn0gKi9cbmxldCBhZnRlclBhaW50RWZmZWN0cyA9IFtdO1xuXG5sZXQgb2xkQmVmb3JlRGlmZiA9IG9wdGlvbnMuX2RpZmY7XG5sZXQgb2xkQmVmb3JlUmVuZGVyID0gb3B0aW9ucy5fcmVuZGVyO1xubGV0IG9sZEFmdGVyRGlmZiA9IG9wdGlvbnMuZGlmZmVkO1xubGV0IG9sZENvbW1pdCA9IG9wdGlvbnMuX2NvbW1pdDtcbmxldCBvbGRCZWZvcmVVbm1vdW50ID0gb3B0aW9ucy51bm1vdW50O1xuXG5jb25zdCBSQUZfVElNRU9VVCA9IDEwMDtcbmxldCBwcmV2UmFmO1xuXG5vcHRpb25zLl9kaWZmID0gdm5vZGUgPT4ge1xuXHRjdXJyZW50Q29tcG9uZW50ID0gbnVsbDtcblx0aWYgKG9sZEJlZm9yZURpZmYpIG9sZEJlZm9yZURpZmYodm5vZGUpO1xufTtcblxub3B0aW9ucy5fcmVuZGVyID0gdm5vZGUgPT4ge1xuXHRpZiAob2xkQmVmb3JlUmVuZGVyKSBvbGRCZWZvcmVSZW5kZXIodm5vZGUpO1xuXG5cdGN1cnJlbnRDb21wb25lbnQgPSB2bm9kZS5fY29tcG9uZW50O1xuXHRjdXJyZW50SW5kZXggPSAwO1xuXG5cdGNvbnN0IGhvb2tzID0gY3VycmVudENvbXBvbmVudC5fX2hvb2tzO1xuXHRpZiAoaG9va3MpIHtcblx0XHRob29rcy5fcGVuZGluZ0VmZmVjdHMuZm9yRWFjaChpbnZva2VDbGVhbnVwKTtcblx0XHRob29rcy5fcGVuZGluZ0VmZmVjdHMuZm9yRWFjaChpbnZva2VFZmZlY3QpO1xuXHRcdGhvb2tzLl9wZW5kaW5nRWZmZWN0cyA9IFtdO1xuXHR9XG59O1xuXG5vcHRpb25zLmRpZmZlZCA9IHZub2RlID0+IHtcblx0aWYgKG9sZEFmdGVyRGlmZikgb2xkQWZ0ZXJEaWZmKHZub2RlKTtcblxuXHRjb25zdCBjID0gdm5vZGUuX2NvbXBvbmVudDtcblx0aWYgKGMgJiYgYy5fX2hvb2tzICYmIGMuX19ob29rcy5fcGVuZGluZ0VmZmVjdHMubGVuZ3RoKSB7XG5cdFx0YWZ0ZXJQYWludChhZnRlclBhaW50RWZmZWN0cy5wdXNoKGMpKTtcblx0fVxuXHRjdXJyZW50Q29tcG9uZW50ID0gcHJldmlvdXNDb21wb25lbnQ7XG59O1xuXG5vcHRpb25zLl9jb21taXQgPSAodm5vZGUsIGNvbW1pdFF1ZXVlKSA9PiB7XG5cdGNvbW1pdFF1ZXVlLnNvbWUoY29tcG9uZW50ID0+IHtcblx0XHR0cnkge1xuXHRcdFx0Y29tcG9uZW50Ll9yZW5kZXJDYWxsYmFja3MuZm9yRWFjaChpbnZva2VDbGVhbnVwKTtcblx0XHRcdGNvbXBvbmVudC5fcmVuZGVyQ2FsbGJhY2tzID0gY29tcG9uZW50Ll9yZW5kZXJDYWxsYmFja3MuZmlsdGVyKGNiID0+XG5cdFx0XHRcdGNiLl92YWx1ZSA/IGludm9rZUVmZmVjdChjYikgOiB0cnVlXG5cdFx0XHQpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbW1pdFF1ZXVlLnNvbWUoYyA9PiB7XG5cdFx0XHRcdGlmIChjLl9yZW5kZXJDYWxsYmFja3MpIGMuX3JlbmRlckNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0fSk7XG5cdFx0XHRjb21taXRRdWV1ZSA9IFtdO1xuXHRcdFx0b3B0aW9ucy5fY2F0Y2hFcnJvcihlLCBjb21wb25lbnQuX3Zub2RlKTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmIChvbGRDb21taXQpIG9sZENvbW1pdCh2bm9kZSwgY29tbWl0UXVldWUpO1xufTtcblxub3B0aW9ucy51bm1vdW50ID0gdm5vZGUgPT4ge1xuXHRpZiAob2xkQmVmb3JlVW5tb3VudCkgb2xkQmVmb3JlVW5tb3VudCh2bm9kZSk7XG5cblx0Y29uc3QgYyA9IHZub2RlLl9jb21wb25lbnQ7XG5cdGlmIChjICYmIGMuX19ob29rcykge1xuXHRcdHRyeSB7XG5cdFx0XHRjLl9faG9va3MuX2xpc3QuZm9yRWFjaChpbnZva2VDbGVhbnVwKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIGMuX3Zub2RlKTtcblx0XHR9XG5cdH1cbn07XG5cbi8qKlxuICogR2V0IGEgaG9vaydzIHN0YXRlIGZyb20gdGhlIGN1cnJlbnRDb21wb25lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGhvb2sgdG8gZ2V0XG4gKiBAcGFyYW0ge251bWJlcn0gdHlwZSBUaGUgaW5kZXggb2YgdGhlIGhvb2sgdG8gZ2V0XG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBnZXRIb29rU3RhdGUoaW5kZXgsIHR5cGUpIHtcblx0aWYgKG9wdGlvbnMuX2hvb2spIHtcblx0XHRvcHRpb25zLl9ob29rKGN1cnJlbnRDb21wb25lbnQsIGluZGV4LCBjdXJyZW50SG9vayB8fCB0eXBlKTtcblx0fVxuXHRjdXJyZW50SG9vayA9IDA7XG5cblx0Ly8gTGFyZ2VseSBpbnNwaXJlZCBieTpcblx0Ly8gKiBodHRwczovL2dpdGh1Yi5jb20vbWljaGFlbC1rbGVpbi9mdW5jeS5qcy9ibG9iL2Y2YmU3MzQ2OGU2ZWM0NmIwZmY1YWEzY2M0YzliYWY3MmEyOTAyNWEvc3JjL2hvb2tzL2NvcmVfaG9va3MubWpzXG5cdC8vICogaHR0cHM6Ly9naXRodWIuY29tL21pY2hhZWwta2xlaW4vZnVuY3kuanMvYmxvYi82NTBiZWFhNThjNDNjMzNhNzQ4MjBhM2M5OGIzYzcwNzljZjJlMzMzL3NyYy9yZW5kZXJlci5tanNcblx0Ly8gT3RoZXIgaW1wbGVtZW50YXRpb25zIHRvIGxvb2sgYXQ6XG5cdC8vICogaHR0cHM6Ly9jb2Rlc2FuZGJveC5pby9zL21ub3gwNXFwOFxuXHRjb25zdCBob29rcyA9XG5cdFx0Y3VycmVudENvbXBvbmVudC5fX2hvb2tzIHx8XG5cdFx0KGN1cnJlbnRDb21wb25lbnQuX19ob29rcyA9IHtcblx0XHRcdF9saXN0OiBbXSxcblx0XHRcdF9wZW5kaW5nRWZmZWN0czogW11cblx0XHR9KTtcblxuXHRpZiAoaW5kZXggPj0gaG9va3MuX2xpc3QubGVuZ3RoKSB7XG5cdFx0aG9va3MuX2xpc3QucHVzaCh7fSk7XG5cdH1cblx0cmV0dXJuIGhvb2tzLl9saXN0W2luZGV4XTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbmRleCcpLlN0YXRlVXBkYXRlcjxhbnk+fSBbaW5pdGlhbFN0YXRlXVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlU3RhdGUoaW5pdGlhbFN0YXRlKSB7XG5cdGN1cnJlbnRIb29rID0gMTtcblx0cmV0dXJuIHVzZVJlZHVjZXIoaW52b2tlT3JSZXR1cm4sIGluaXRpYWxTdGF0ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW5kZXgnKS5SZWR1Y2VyPGFueSwgYW55Pn0gcmVkdWNlclxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW5kZXgnKS5TdGF0ZVVwZGF0ZXI8YW55Pn0gaW5pdGlhbFN0YXRlXG4gKiBAcGFyYW0geyhpbml0aWFsU3RhdGU6IGFueSkgPT4gdm9pZH0gW2luaXRdXG4gKiBAcmV0dXJucyB7WyBhbnksIChzdGF0ZTogYW55KSA9PiB2b2lkIF19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSwgaW5pdCkge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlJlZHVjZXJIb29rU3RhdGV9ICovXG5cdGNvbnN0IGhvb2tTdGF0ZSA9IGdldEhvb2tTdGF0ZShjdXJyZW50SW5kZXgrKywgMik7XG5cdGhvb2tTdGF0ZS5fcmVkdWNlciA9IHJlZHVjZXI7XG5cdGlmICghaG9va1N0YXRlLl9jb21wb25lbnQpIHtcblx0XHRob29rU3RhdGUuX3ZhbHVlID0gW1xuXHRcdFx0IWluaXQgPyBpbnZva2VPclJldHVybih1bmRlZmluZWQsIGluaXRpYWxTdGF0ZSkgOiBpbml0KGluaXRpYWxTdGF0ZSksXG5cblx0XHRcdGFjdGlvbiA9PiB7XG5cdFx0XHRcdGNvbnN0IG5leHRWYWx1ZSA9IGhvb2tTdGF0ZS5fcmVkdWNlcihob29rU3RhdGUuX3ZhbHVlWzBdLCBhY3Rpb24pO1xuXHRcdFx0XHRpZiAoaG9va1N0YXRlLl92YWx1ZVswXSAhPT0gbmV4dFZhbHVlKSB7XG5cdFx0XHRcdFx0aG9va1N0YXRlLl92YWx1ZSA9IFtuZXh0VmFsdWUsIGhvb2tTdGF0ZS5fdmFsdWVbMV1dO1xuXHRcdFx0XHRcdGhvb2tTdGF0ZS5fY29tcG9uZW50LnNldFN0YXRlKHt9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdF07XG5cblx0XHRob29rU3RhdGUuX2NvbXBvbmVudCA9IGN1cnJlbnRDb21wb25lbnQ7XG5cdH1cblxuXHRyZXR1cm4gaG9va1N0YXRlLl92YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkVmZmVjdH0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUVmZmVjdChjYWxsYmFjaywgYXJncykge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkVmZmVjdEhvb2tTdGF0ZX0gKi9cblx0Y29uc3Qgc3RhdGUgPSBnZXRIb29rU3RhdGUoY3VycmVudEluZGV4KyssIDMpO1xuXHRpZiAoIW9wdGlvbnMuX3NraXBFZmZlY3RzICYmIGFyZ3NDaGFuZ2VkKHN0YXRlLl9hcmdzLCBhcmdzKSkge1xuXHRcdHN0YXRlLl92YWx1ZSA9IGNhbGxiYWNrO1xuXHRcdHN0YXRlLl9hcmdzID0gYXJncztcblxuXHRcdGN1cnJlbnRDb21wb25lbnQuX19ob29rcy5fcGVuZGluZ0VmZmVjdHMucHVzaChzdGF0ZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkVmZmVjdH0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUxheW91dEVmZmVjdChjYWxsYmFjaywgYXJncykge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkVmZmVjdEhvb2tTdGF0ZX0gKi9cblx0Y29uc3Qgc3RhdGUgPSBnZXRIb29rU3RhdGUoY3VycmVudEluZGV4KyssIDQpO1xuXHRpZiAoIW9wdGlvbnMuX3NraXBFZmZlY3RzICYmIGFyZ3NDaGFuZ2VkKHN0YXRlLl9hcmdzLCBhcmdzKSkge1xuXHRcdHN0YXRlLl92YWx1ZSA9IGNhbGxiYWNrO1xuXHRcdHN0YXRlLl9hcmdzID0gYXJncztcblxuXHRcdGN1cnJlbnRDb21wb25lbnQuX3JlbmRlckNhbGxiYWNrcy5wdXNoKHN0YXRlKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUmVmKGluaXRpYWxWYWx1ZSkge1xuXHRjdXJyZW50SG9vayA9IDU7XG5cdHJldHVybiB1c2VNZW1vKCgpID0+ICh7IGN1cnJlbnQ6IGluaXRpYWxWYWx1ZSB9KSwgW10pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7KCkgPT4gb2JqZWN0fSBjcmVhdGVIYW5kbGVcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBjcmVhdGVIYW5kbGUsIGFyZ3MpIHtcblx0Y3VycmVudEhvb2sgPSA2O1xuXHR1c2VMYXlvdXRFZmZlY3QoXG5cdFx0KCkgPT4ge1xuXHRcdFx0aWYgKHR5cGVvZiByZWYgPT0gJ2Z1bmN0aW9uJykgcmVmKGNyZWF0ZUhhbmRsZSgpKTtcblx0XHRcdGVsc2UgaWYgKHJlZikgcmVmLmN1cnJlbnQgPSBjcmVhdGVIYW5kbGUoKTtcblx0XHR9LFxuXHRcdGFyZ3MgPT0gbnVsbCA/IGFyZ3MgOiBhcmdzLmNvbmNhdChyZWYpXG5cdCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHsoKSA9PiBhbnl9IGZhY3RvcnlcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZU1lbW8oZmFjdG9yeSwgYXJncykge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLk1lbW9Ib29rU3RhdGV9ICovXG5cdGNvbnN0IHN0YXRlID0gZ2V0SG9va1N0YXRlKGN1cnJlbnRJbmRleCsrLCA3KTtcblx0aWYgKGFyZ3NDaGFuZ2VkKHN0YXRlLl9hcmdzLCBhcmdzKSkge1xuXHRcdHN0YXRlLl92YWx1ZSA9IGZhY3RvcnkoKTtcblx0XHRzdGF0ZS5fYXJncyA9IGFyZ3M7XG5cdFx0c3RhdGUuX2ZhY3RvcnkgPSBmYWN0b3J5O1xuXHR9XG5cblx0cmV0dXJuIHN0YXRlLl92YWx1ZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IGNhbGxiYWNrXG4gKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWxsYmFjayhjYWxsYmFjaywgYXJncykge1xuXHRjdXJyZW50SG9vayA9IDg7XG5cdHJldHVybiB1c2VNZW1vKCgpID0+IGNhbGxiYWNrLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlByZWFjdENvbnRleHR9IGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNvbnRleHQoY29udGV4dCkge1xuXHRjb25zdCBwcm92aWRlciA9IGN1cnJlbnRDb21wb25lbnQuY29udGV4dFtjb250ZXh0Ll9pZF07XG5cdC8vIFdlIGNvdWxkIHNraXAgdGhpcyBjYWxsIGhlcmUsIGJ1dCB0aGFuIHdlJ2Qgbm90IGNhbGxcblx0Ly8gYG9wdGlvbnMuX2hvb2tgLiBXZSBuZWVkIHRvIGRvIHRoYXQgaW4gb3JkZXIgdG8gbWFrZVxuXHQvLyB0aGUgZGV2dG9vbHMgYXdhcmUgb2YgdGhpcyBob29rLlxuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbnRleHRIb29rU3RhdGV9ICovXG5cdGNvbnN0IHN0YXRlID0gZ2V0SG9va1N0YXRlKGN1cnJlbnRJbmRleCsrLCA5KTtcblx0Ly8gVGhlIGRldnRvb2xzIG5lZWRzIGFjY2VzcyB0byB0aGUgY29udGV4dCBvYmplY3QgdG9cblx0Ly8gYmUgYWJsZSB0byBwdWxsIG9mIHRoZSBkZWZhdWx0IHZhbHVlIHdoZW4gbm8gcHJvdmlkZXJcblx0Ly8gaXMgcHJlc2VudCBpbiB0aGUgdHJlZS5cblx0c3RhdGUuX2NvbnRleHQgPSBjb250ZXh0O1xuXHRpZiAoIXByb3ZpZGVyKSByZXR1cm4gY29udGV4dC5fZGVmYXVsdFZhbHVlO1xuXHQvLyBUaGlzIGlzIHByb2JhYmx5IG5vdCBzYWZlIHRvIGNvbnZlcnQgdG8gXCIhXCJcblx0aWYgKHN0YXRlLl92YWx1ZSA9PSBudWxsKSB7XG5cdFx0c3RhdGUuX3ZhbHVlID0gdHJ1ZTtcblx0XHRwcm92aWRlci5zdWIoY3VycmVudENvbXBvbmVudCk7XG5cdH1cblx0cmV0dXJuIHByb3ZpZGVyLnByb3BzLnZhbHVlO1xufVxuXG4vKipcbiAqIERpc3BsYXkgYSBjdXN0b20gbGFiZWwgZm9yIGEgY3VzdG9tIGhvb2sgZm9yIHRoZSBkZXZ0b29scyBwYW5lbFxuICogQHR5cGUgezxUPih2YWx1ZTogVCwgY2I/OiAodmFsdWU6IFQpID0+IHN0cmluZyB8IG51bWJlcikgPT4gdm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZURlYnVnVmFsdWUodmFsdWUsIGZvcm1hdHRlcikge1xuXHRpZiAob3B0aW9ucy51c2VEZWJ1Z1ZhbHVlKSB7XG5cdFx0b3B0aW9ucy51c2VEZWJ1Z1ZhbHVlKGZvcm1hdHRlciA/IGZvcm1hdHRlcih2YWx1ZSkgOiB2YWx1ZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0geyhlcnJvcjogYW55KSA9PiB2b2lkfSBjYlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRXJyb3JCb3VuZGFyeShjYikge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkVycm9yQm91bmRhcnlIb29rU3RhdGV9ICovXG5cdGNvbnN0IHN0YXRlID0gZ2V0SG9va1N0YXRlKGN1cnJlbnRJbmRleCsrLCAxMCk7XG5cdGNvbnN0IGVyclN0YXRlID0gdXNlU3RhdGUoKTtcblx0c3RhdGUuX3ZhbHVlID0gY2I7XG5cdGlmICghY3VycmVudENvbXBvbmVudC5jb21wb25lbnREaWRDYXRjaCkge1xuXHRcdGN1cnJlbnRDb21wb25lbnQuY29tcG9uZW50RGlkQ2F0Y2ggPSBlcnIgPT4ge1xuXHRcdFx0aWYgKHN0YXRlLl92YWx1ZSkgc3RhdGUuX3ZhbHVlKGVycik7XG5cdFx0XHRlcnJTdGF0ZVsxXShlcnIpO1xuXHRcdH07XG5cdH1cblx0cmV0dXJuIFtcblx0XHRlcnJTdGF0ZVswXSxcblx0XHQoKSA9PiB7XG5cdFx0XHRlcnJTdGF0ZVsxXSh1bmRlZmluZWQpO1xuXHRcdH1cblx0XTtcbn1cblxuLyoqXG4gKiBBZnRlciBwYWludCBlZmZlY3RzIGNvbnN1bWVyLlxuICovXG5mdW5jdGlvbiBmbHVzaEFmdGVyUGFpbnRFZmZlY3RzKCkge1xuXHRhZnRlclBhaW50RWZmZWN0cy5mb3JFYWNoKGNvbXBvbmVudCA9PiB7XG5cdFx0aWYgKGNvbXBvbmVudC5fcGFyZW50RG9tKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb21wb25lbnQuX19ob29rcy5fcGVuZGluZ0VmZmVjdHMuZm9yRWFjaChpbnZva2VDbGVhbnVwKTtcblx0XHRcdFx0Y29tcG9uZW50Ll9faG9va3MuX3BlbmRpbmdFZmZlY3RzLmZvckVhY2goaW52b2tlRWZmZWN0KTtcblx0XHRcdFx0Y29tcG9uZW50Ll9faG9va3MuX3BlbmRpbmdFZmZlY3RzID0gW107XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbXBvbmVudC5fX2hvb2tzLl9wZW5kaW5nRWZmZWN0cyA9IFtdO1xuXHRcdFx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIGNvbXBvbmVudC5fdm5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdGFmdGVyUGFpbnRFZmZlY3RzID0gW107XG59XG5cbmxldCBIQVNfUkFGID0gdHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PSAnZnVuY3Rpb24nO1xuXG4vKipcbiAqIFNjaGVkdWxlIGEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBhZnRlciB0aGUgYnJvd3NlciBoYXMgYSBjaGFuY2UgdG8gcGFpbnQgYSBuZXcgZnJhbWUuXG4gKiBEbyB0aGlzIGJ5IGNvbWJpbmluZyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgKHJBRikgKyBzZXRUaW1lb3V0IHRvIGludm9rZSBhIGNhbGxiYWNrIGFmdGVyXG4gKiB0aGUgbmV4dCBicm93c2VyIGZyYW1lLlxuICpcbiAqIEFsc28sIHNjaGVkdWxlIGEgdGltZW91dCBpbiBwYXJhbGxlbCB0byB0aGUgdGhlIHJBRiB0byBlbnN1cmUgdGhlIGNhbGxiYWNrIGlzIGludm9rZWRcbiAqIGV2ZW4gaWYgUkFGIGRvZXNuJ3QgZmlyZSAoZm9yIGV4YW1wbGUgaWYgdGhlIGJyb3dzZXIgdGFiIGlzIG5vdCB2aXNpYmxlKVxuICpcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gY2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gYWZ0ZXJOZXh0RnJhbWUoY2FsbGJhY2spIHtcblx0Y29uc3QgZG9uZSA9ICgpID0+IHtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0aWYgKEhBU19SQUYpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG5cdFx0c2V0VGltZW91dChjYWxsYmFjayk7XG5cdH07XG5cdGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRvbmUsIFJBRl9USU1FT1VUKTtcblxuXHRsZXQgcmFmO1xuXHRpZiAoSEFTX1JBRikge1xuXHRcdHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShkb25lKTtcblx0fVxufVxuXG4vLyBOb3RlOiBpZiBzb21lb25lIHVzZWQgb3B0aW9ucy5kZWJvdW5jZVJlbmRlcmluZyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSxcbi8vIHRoZW4gZWZmZWN0cyB3aWxsIEFMV0FZUyBydW4gb24gdGhlIE5FWFQgZnJhbWUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBvbmUsIGluY3VycmluZyBhIH4xNm1zIGRlbGF5LlxuLy8gUGVyaGFwcyB0aGlzIGlzIG5vdCBzdWNoIGEgYmlnIGRlYWwuXG4vKipcbiAqIFNjaGVkdWxlIGFmdGVyUGFpbnRFZmZlY3RzIGZsdXNoIGFmdGVyIHRoZSBicm93c2VyIHBhaW50c1xuICogQHBhcmFtIHtudW1iZXJ9IG5ld1F1ZXVlTGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIGFmdGVyUGFpbnQobmV3UXVldWVMZW5ndGgpIHtcblx0aWYgKG5ld1F1ZXVlTGVuZ3RoID09PSAxIHx8IHByZXZSYWYgIT09IG9wdGlvbnMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0cHJldlJhZiA9IG9wdGlvbnMucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHRcdChwcmV2UmFmIHx8IGFmdGVyTmV4dEZyYW1lKShmbHVzaEFmdGVyUGFpbnRFZmZlY3RzKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuRWZmZWN0SG9va1N0YXRlfSBob29rXG4gKi9cbmZ1bmN0aW9uIGludm9rZUNsZWFudXAoaG9vaykge1xuXHQvLyBBIGhvb2sgY2xlYW51cCBjYW4gaW50cm9kdWNlIGEgY2FsbCB0byByZW5kZXIgd2hpY2ggY3JlYXRlcyBhIG5ldyByb290LCB0aGlzIHdpbGwgY2FsbCBvcHRpb25zLnZub2RlXG5cdC8vIGFuZCBtb3ZlIHRoZSBjdXJyZW50Q29tcG9uZW50IGF3YXkuXG5cdGNvbnN0IGNvbXAgPSBjdXJyZW50Q29tcG9uZW50O1xuXHRpZiAodHlwZW9mIGhvb2suX2NsZWFudXAgPT0gJ2Z1bmN0aW9uJykgaG9vay5fY2xlYW51cCgpO1xuXHRjdXJyZW50Q29tcG9uZW50ID0gY29tcDtcbn1cblxuLyoqXG4gKiBJbnZva2UgYSBIb29rJ3MgZWZmZWN0XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkVmZmVjdEhvb2tTdGF0ZX0gaG9va1xuICovXG5mdW5jdGlvbiBpbnZva2VFZmZlY3QoaG9vaykge1xuXHQvLyBBIGhvb2sgY2FsbCBjYW4gaW50cm9kdWNlIGEgY2FsbCB0byByZW5kZXIgd2hpY2ggY3JlYXRlcyBhIG5ldyByb290LCB0aGlzIHdpbGwgY2FsbCBvcHRpb25zLnZub2RlXG5cdC8vIGFuZCBtb3ZlIHRoZSBjdXJyZW50Q29tcG9uZW50IGF3YXkuXG5cdGNvbnN0IGNvbXAgPSBjdXJyZW50Q29tcG9uZW50O1xuXHRob29rLl9jbGVhbnVwID0gaG9vay5fdmFsdWUoKTtcblx0Y3VycmVudENvbXBvbmVudCA9IGNvbXA7XG59XG5cbi8qKlxuICogQHBhcmFtIHthbnlbXX0gb2xkQXJnc1xuICogQHBhcmFtIHthbnlbXX0gbmV3QXJnc1xuICovXG5mdW5jdGlvbiBhcmdzQ2hhbmdlZChvbGRBcmdzLCBuZXdBcmdzKSB7XG5cdHJldHVybiAoXG5cdFx0IW9sZEFyZ3MgfHxcblx0XHRvbGRBcmdzLmxlbmd0aCAhPT0gbmV3QXJncy5sZW5ndGggfHxcblx0XHRuZXdBcmdzLnNvbWUoKGFyZywgaW5kZXgpID0+IGFyZyAhPT0gb2xkQXJnc1tpbmRleF0pXG5cdCk7XG59XG5cbmZ1bmN0aW9uIGludm9rZU9yUmV0dXJuKGFyZywgZikge1xuXHRyZXR1cm4gdHlwZW9mIGYgPT0gJ2Z1bmN0aW9uJyA/IGYoYXJnKSA6IGY7XG59XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCdcblxuZnVuY3Rpb24gQnV0dG9uIChwcm9wcykge1xuICAgIHJldHVybiBodG1sYDxzcGFuIGNsYXNzPVwiZm9ybS1zdHVmZlwiPlxuICAgICAgICAke3Byb3BzLmlzU3Bpbm5pbmcgP1xuICAgICAgICAgICAgaHRtbGA8YnV0dG9uIC4uLiR7cHJvcHN9IGNsYXNzPSR7cHJvcHMuY2xhc3MgfHwgJycgKyAnIHNwaW5uaW5nJ31cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD0ke3RydWV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4tY29udGVudFwiPiR7cHJvcHMuY2hpbGRyZW59PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+YCA6XG4gICAgICAgICAgICBodG1sYDxkaXYgPlxuICAgICAgICAgICAgICAgIDxidXR0b24gLi4uJHtwcm9wc30+XG4gICAgICAgICAgICAgICAgICAgICR7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgIH1cbiAgICAgICAgPC9zcGFuPmBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25cbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdodG0vcHJlYWN0J1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xudmFyIFBlbmNpbEJ1dHRvbiA9IHJlcXVpcmUoJy4vcGVuY2lsLWJ1dHRvbicpXG5cbmZ1bmN0aW9uIEVkaXRhYmxlRmllbGQgKHByb3BzKSB7XG4gICAgdmFyIHsgdmFsdWUsIG9uU2F2ZSwgbmFtZSB9ID0gcHJvcHNcbiAgICB2YXIgW2lzRWRpdGluZywgc2V0RWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSlcbiAgICB2YXIgW2lzUmVzb2x2aW5nLCBzZXRSZXNvbHZpbmddID0gdXNlU3RhdGUoZmFsc2UpXG5cbiAgICBmdW5jdGlvbiBfc2V0RWRpdGluZyAoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICBzZXRFZGl0aW5nKHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcEVkaXRpbmcgKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgc2V0RWRpdGluZyhmYWxzZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfb25TYXZlIChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHZhciB2YWwgPSBldi50YXJnZXQuZWxlbWVudHNbbmFtZV0udmFsdWVcbiAgICAgICAgc2V0UmVzb2x2aW5nKHRydWUpXG4gICAgICAgIG9uU2F2ZSh2YWwpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0UmVzb2x2aW5nKGZhbHNlKVxuICAgICAgICAgICAgICAgIHNldEVkaXRpbmcoZmFsc2UpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgc2V0UmVzb2x2aW5nKGZhbHNlKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJycnJyJywgZXJyKVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICB2YXIgX2NsYXNzID0gJ2VkaXRhYmxlLWZpZWxkJyArXG4gICAgICAgIChpc1Jlc29sdmluZyA/ICcgcmVzb2x2aW5nJyA6ICcnKSArXG4gICAgICAgIChwcm9wcy5jbGFzcyA/ICgnICcgKyBwcm9wcy5jbGFzcykgOiAnJylcblxuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgICAgcmV0dXJuIGh0bWxgPGZvcm0gb25yZXNldD0ke3N0b3BFZGl0aW5nfVxuICAgICAgICAgICAgb25zdWJtaXQ9JHtfb25TYXZlfVxuICAgICAgICAgICAgY2xhc3M9JHtfY2xhc3N9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxpbnB1dCBuYW1lPSR7bmFtZX0gaWQ9JHtuYW1lfSBwbGFjZWhvbGRlcj1cIiR7dmFsdWV9XCIgLz5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCIgZGlzYWJsZWQ9JHtpc1Jlc29sdmluZ30+Y2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD0ke2lzUmVzb2x2aW5nfT5zYXZlPC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5gO1xuICAgIH1cblxuICAgIHJldHVybiBodG1sYFxuICAgICAgICA8c3BhbiBjbGFzcz1cImZpZWxkXCI+JHt2YWx1ZX08L3NwYW4+XG5cbiAgICAgICAgPCEtLSBwZW5jaWwgZW1vamkgLS0+XG4gICAgICAgIDwke1BlbmNpbEJ1dHRvbn0gb25DbGljaz0ke19zZXRFZGl0aW5nfSB0aXRsZT1cImVkaXRcIiAvPlxuICAgIGBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0YWJsZUZpZWxkXG4iLCJ2YXIgTnVtYmVySW5wdXQgPSByZXF1aXJlKCcuL251bWJlci1pbnB1dCcpXG52YXIgVGV4dElucHV0ID0gcmVxdWlyZSgnLi90ZXh0LWlucHV0JylcbnZhciBCdXR0b24gPSByZXF1aXJlKCcuL2J1dHRvbicpXG52YXIgRWRpdGFibGVGaWVsZCA9IHJlcXVpcmUoJy4vZWRpdGFibGUtZmllbGQnKVxudmFyIFBlbmNpbEJ1dHRvbiA9IHJlcXVpcmUoJy4vcGVuY2lsLWJ1dHRvbicpXG5cbm1vZHVsZS5leHBvcnRzID0geyBUZXh0SW5wdXQsIE51bWJlcklucHV0LCBCdXR0b24sIEVkaXRhYmxlRmllbGQsXG4gICAgUGVuY2lsQnV0dG9uIH1cbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdodG0vcHJlYWN0J1xuXG5mdW5jdGlvbiBOdW1iZXJJbnB1dCAocHJvcHMpIHtcbiAgICB2YXIgeyBuYW1lLCBtaW4sIG1heCwgb25DaGFuZ2UsIHZhbHVlLCBvbkluY3JlYXNlLCBvbkRlY3JlYXNlIH0gPSBwcm9wc1xuXG4gICAgcmV0dXJuIGh0bWxgPGRpdiBjbGFzcz1cImZvcm0tc3R1ZmZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLW51bWJlclwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBpbnB1dG1vZGU9XCJudW1lcmljXCJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuPVwiWzAtOV0qXCJcbiAgICAgICAgICAgICAgICBtYXg9XCIke21heH1cIlxuICAgICAgICAgICAgICAgIG1pbj0ke21pbn1cbiAgICAgICAgICAgICAgICBvbmNoYW5nZT0ke29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgIHZhbHVlPSR7dmFsdWV9XG4gICAgICAgICAgICAgICAgbmFtZT0ke25hbWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlci1uYXZcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibnVtYmVyLWJ1dHRvbiBudW1iZXItdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwiJHtldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkluY3JlYXNlKGV2KVxuICAgICAgICAgICAgICAgICAgICB9IH1cIj4rPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibnVtYmVyLWJ1dHRvbiBudW1iZXItZG93blwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCIke2V2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVjcmVhc2UoZXYpXG4gICAgICAgICAgICAgICAgICAgIH0gfVwiPi08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTnVtYmVySW5wdXRcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdodG0vcHJlYWN0J1xudmFyIGNyZWF0ZVBlbmNpbCA9IHJlcXVpcmUoJy4uL2NyZWF0ZS1wZW5jaWwtYnV0dG9uJylcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVQZW5jaWwoaHRtbClcbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdodG0vcHJlYWN0J1xuXG5mdW5jdGlvbiBUZXh0SW5wdXQgKHByb3BzKSB7XG4gICAgdmFyIHsgbmFtZSwgZGlzcGxheU5hbWUgfSA9IHByb3BzXG4gICAgdmFyIF9wcm9wcyA9IHsuLi5wcm9wc31cbiAgICBkZWxldGUgX3Byb3BzLmRpc3BsYXlOYW1lXG5cbiAgICByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tc3R1ZmZcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cCAke25hbWV9XCI+XG4gICAgICAgICAgICA8aW5wdXQgLi4uJHtfcHJvcHN9IG5hbWU9XCIke25hbWV9XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIiBcIlxuICAgICAgICAgICAgICAgIHJlcXVpcmVkPSR7cHJvcHMucmVxdWlyZWR9IG1pbkxlbmd0aD0ke3Byb3BzLm1pbmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5taW5MZW5ndGh9XG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoPSR7cHJvcHMubWF4bGVuZ3RoIHx8IHByb3BzLm1heExlbmd0aH1cbiAgICAgICAgICAgICAgICBpZD1cIiR7bmFtZX1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSR7bmFtZX0+JHtkaXNwbGF5TmFtZX08L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gXG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dElucHV0XG4iXX0=
