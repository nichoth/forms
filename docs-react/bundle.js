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
            </button>` : (0, _preact.html)`<button ...${props}>
                ${props.children}
            </button>`}
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
            <input ...${_props} name="${name}" type=${props.type || 'text'}
                placeholder=" " required=${props.required}
                minLength=${props.minlength} maxLength=${props.maxlength}
                id="${name}"
            />
            <label htmlFor=${name}>${displayName}</label>
        </div>
    </div>`;
}

module.exports = TextInput;

},{"htm/preact":4}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjcmVhdGUtcGVuY2lsLWJ1dHRvbi5qcyIsImRvY3MvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaHRtL2Rpc3QvaHRtLm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9odG0vcHJlYWN0L2luZGV4Lm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NvbnN0YW50cy5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL29wdGlvbnMuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9jcmVhdGUtZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NvbXBvbmVudC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NyZWF0ZS1jb250ZXh0LmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9zcmMvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2RpZmYvY2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9kaWZmL3Byb3BzLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9zcmMvZGlmZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL3JlbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2Nsb25lLWVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9kaWZmL2NhdGNoLWVycm9yLmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9ob29rcy9zcmMvaW5kZXguanMiLCJwcmVhY3QvYnV0dG9uLmpzIiwicHJlYWN0L2VkaXRhYmxlLWZpZWxkLmpzIiwicHJlYWN0L2luZGV4LmpzIiwicHJlYWN0L251bWJlci1pbnB1dC5qcyIsInByZWFjdC9wZW5jaWwtYnV0dG9uLmpzIiwicHJlYWN0L3RleHQtaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtB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QixZQUFZLENBQUMsWUFBRCxDQUE3Qjs7Ozs7QUNIQTs7QUFFQSxTQUFTLFNBQVQsQ0FBb0IsS0FBcEIsRUFBMkI7QUFDdkIsTUFBSTtBQUFFLElBQUEsSUFBRjtBQUFRLElBQUE7QUFBUixNQUF3QixLQUE1QjtBQUNBLE1BQUksTUFBTSxHQUFHLEVBQUMsR0FBRztBQUFKLEdBQWI7QUFDQSxTQUFPLE1BQU0sQ0FBQyxXQUFkO0FBRUEsU0FBTyxpQkFBSztBQUNoQixzQ0FBc0MsSUFBSztBQUMzQyx3QkFBd0IsTUFBTyxVQUFTLElBQUssVUFBUyxLQUFLLENBQUMsSUFBTixJQUFjLE1BQU87QUFDM0UsMkNBQTJDLEtBQUssQ0FBQyxRQUFTO0FBQzFELDRCQUE0QixLQUFLLENBQUMsU0FBVSxjQUFhLEtBQUssQ0FBQyxTQUFVO0FBQ3pFLHNCQUFzQixJQUFLO0FBQzNCO0FBQ0EsNkJBQTZCLElBQUssSUFBRyxXQUFZO0FBQ2pEO0FBQ0EsV0FUSTtBQVVIOztBQUVELE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gY3JlYXRlUGVuY2lsIChodG1sKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIFBlbmNpbEJ1dHRvbiAocHJvcHMpIHtcbiAgICAgICAgdmFyIGNsID0gcHJvcHMuY2xhc3MgfHwgcHJvcHMuY2xhc3NOYW1lXG4gICAgICAgIHJldHVybiBodG1sYDxidXR0b24gLi4uJHtwcm9wc31cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImVkaXQtcGVuY2lsJHtjbCA/ICgnICcgKyBjbCkgOiAnJ31cIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbD1cImVkaXRcIj5cbiAgICAgICAgICAgICAgICDinI9cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+YFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVQZW5jaWxcbiIsInZhciB7IFRleHRJbnB1dCwgTnVtYmVySW5wdXQsIEJ1dHRvbiwgRWRpdGFibGVGaWVsZCwgUGVuY2lsQnV0dG9uIH0gPVxuICAgIHJlcXVpcmUoJy4uL3ByZWFjdCcpXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2h0bS9wcmVhY3QnO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuXG5mdW5jdGlvbiBzdWJtaXQgKGV2KSB7XG4gICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnNvbGUubG9nKCdzdWJtaXQnKVxuICAgIGNvbnNvbGUubG9nKCd2YWx1ZScsIGV2LnRhcmdldC5lbGVtZW50c1sndGVzdC1pbnB1dCddLnZhbHVlKVxuICAgIGNvbnNvbGUubG9nKCdzb21ldGhpbmcgZWxzZScsIGV2LnRhcmdldC5lbGVtZW50c1snc29tZXRoaW5nJ10udmFsdWUpXG59XG5cbmZ1bmN0aW9uIENsaWNraW5nRGVtbyAoKSB7XG4gICAgdmFyIFtyZXNvbHZpbmcsIHNldFJlc29sdmluZ10gPSB1c2VTdGF0ZShmYWxzZSlcblxuICAgIGZ1bmN0aW9uIGRvU29tZXRoaW5nIChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHNldFJlc29sdmluZyh0cnVlKVxuICAgICAgICAvLyAzIHNlY29uZCBkZWxheVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFJlc29sdmluZyhmYWxzZSksIDMwMDApXG4gICAgfVxuXG4gICAgIHJldHVybiBodG1sYDxkaXYgY2xhc3M9XCJjbGlja2luZy1kZW1vXCI+XG4gICAgICAgIDwke0J1dHRvbn0gdHlwZT1cInN1Ym1pdFwiIG9uQ2xpY2s9JHtkb1NvbWV0aGluZ30gaXNTcGlubmluZz0ke3Jlc29sdmluZ30+XG4gICAgICAgICAgICBkbyBzb21ldGhpbmdcbiAgICAgICAgPC8ke0J1dHRvbn0+XG4gICAgPC9kaXY+YFxufVxuXG5mdW5jdGlvbiBDb3VudGVyIChwcm9wcykge1xuICAgIHZhciB7IG1pbiwgbWF4IH0gPSBwcm9wc1xuICAgIHZhciBbY291bnQsIHNldENvdW50XSA9IHVzZVN0YXRlKDMpXG5cbiAgICBmdW5jdGlvbiBpbmMgKCkge1xuICAgICAgICBpZiAoKHBhcnNlSW50KGNvdW50KSArIDEpID4gbWF4KSByZXR1cm5cbiAgICAgICAgaWYgKGNvdW50IDwgbWluKSByZXR1cm4gc2V0Q291bnQobWluKVxuICAgICAgICBzZXRDb3VudChjb3VudCArIDEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVjICgpIHtcbiAgICAgICAgaWYgKChwYXJzZUludChjb3VudCkgLSAxKSA8IG1pbikgcmV0dXJuXG4gICAgICAgIGlmIChjb3VudCA+IG1heCkgcmV0dXJuIHNldENvdW50KG1heClcbiAgICAgICAgc2V0Q291bnQoY291bnQgLSAxKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYW5nZSAoZXYpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZScsIGV2LnRhcmdldC52YWx1ZSlcbiAgICAgICAgc2V0Q291bnQoZXYudGFyZ2V0LnZhbHVlKVxuICAgIH1cblxuICAgIHJldHVybiBodG1sYFxuICAgICAgICA8JHtOdW1iZXJJbnB1dH0gbWluPSR7Mn0gbWF4PSR7Nn0gdmFsdWU9JHtjb3VudH1cbiAgICAgICAgICAgIG9uSW5jcmVhc2U9JHtpbmN9IG9uRGVjcmVhc2U9JHtkZWN9IG9uQ2hhbmdlPSR7Y2hhbmdlfSAvPlxuICAgIGBcbn1cblxuZnVuY3Rpb24gRWRpdGluZyAoKSB7XG4gICAgZnVuY3Rpb24gc2F2ZSAobmV3VmFsdWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NhdmUnLCBuZXdWYWx1ZSlcbiAgICAgICAgLy8gd2FpdCAxIHNlY29uZFxuICAgICAgICAvLyB5b3UgKm11c3QqIHJldHVybiBhIHByb21pc2UgaGVyZTtcbiAgICAgICAgLy8gICBpdCBpcyB1c2VkIGJ5IHRoZSBgRWRpdGFibGVGaWVsZGAgY29tcG9uZW50IHRvXG4gICAgICAgIC8vICAgc2V0IHRoZSByZXNvbHZpbmcgc3RhdGVcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSlcbiAgICB9XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgICAgPCR7RWRpdGFibGVGaWVsZH0gdmFsdWU9XCJleGFtcGxlXCIgb25TYXZlPSR7c2F2ZX0gbmFtZT1cImV4YW1wbGVcIiAvPlxuICAgIGBcbn1cblxuXG5mdW5jdGlvbiBEZW1vICgpIHtcbiAgICB2YXIgW2Zvcm1EZW1vU3RhdGUsIHNldEZvcm1TdGF0ZV0gPSB1c2VTdGF0ZSh7IGlzUmVzb2x2aW5nOiBmYWxzZSB9KVxuXG4gICAgZnVuY3Rpb24gZm9ybVN1Ym1pdCAoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICBzZXRGb3JtU3RhdGUoeyBpc1Jlc29sdmluZzogdHJ1ZSB9KVxuICAgICAgICB2YXIgZWxzID0gZXYudGFyZ2V0LmVsZW1lbnRzXG4gICAgICAgIHZhciBzdHVmZiA9IGVsc1snbW9yZS1zdHVmZiddLnZhbHVlXG4gICAgICAgIGNvbnNvbGUubG9nKCdzdWJtaXQnLCBzdHVmZilcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzZXRGb3JtU3RhdGUoeyBpc1Jlc29sdmluZzogZmFsc2UgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkb25lIHN1Ym1pdHRpbmcnKVxuICAgICAgICB9LCAzMDAwKVxuICAgIH1cblxuICAgIHJldHVybiBodG1sYDxmb3JtIG9uc3VibWl0PSR7c3VibWl0fT5cbiAgICAgICAgPCR7VGV4dElucHV0fSBuYW1lPVwidGVzdC1pbnB1dFwiIGRpc3BsYXlOYW1lPVwidGVzdCBpbnB1dFwiIHZhbHVlPVwiYmFyXCJcbiAgICAgICAgICAgIG1pbmxlbmd0aD1cIjNcIiBtYXhsZW5ndGg9XCI2XCIgcmVxdWlyZWQ9JHt0cnVlfVxuICAgICAgICAvPlxuXG4gICAgICAgIDwke1RleHRJbnB1dH0gbmFtZT1cInNvbWV0aGluZ1wiIGRpc3BsYXlOYW1lPVwic29tZXRoaW5nIGVsc2VcIiB2YWx1ZT1cImZvb1wiXG4gICAgICAgICAgICBtaW5sZW5ndGg9XCIzXCIgbWF4bGVuZ3RoPVwiNlwiIHJlcXVpcmVkPSR7ZmFsc2V9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlclwiPlxuICAgICAgICAgICAgPHA+bWluIDIsIG1heCA2PC9wPlxuICAgICAgICAgICAgPCR7Q291bnRlcn0gbWluPSR7Mn0gbWF4PSR7Nn0gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRpbmdcIj5cbiAgICAgICAgICAgIDwke0VkaXRpbmd9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG5cIj5cbiAgICAgICAgICAgIDwke0NsaWNraW5nRGVtb30gLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHRlc3RpbmcgdGhlIHBlbmNpbCBidXR0b25cbiAgICAgICAgICAgIDwke1BlbmNpbEJ1dHRvbn0gb25DbGljaz0ke2V2ID0+IHtcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrJywgZXYpXG4gICAgICAgICAgICB9fSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG5cbiAgICA8Zm9ybSBjbGFzcz1cImZvcm0tZGVtb1wiIG9uU3VibWl0PSR7Zm9ybVN1Ym1pdH0+XG4gICAgICAgIDwke1RleHRJbnB1dH0gbmFtZT1cIm1vcmUtc3R1ZmZcIiBkaXNwbGF5TmFtZT1cIm1vcmUgc3R1ZmZcIlxuICAgICAgICAgICAgbWlubGVuZ3RoPVwiM1wiIG1heGxlbmd0aD1cIjZcIiByZXF1aXJlZD0ke3RydWV9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPCR7QnV0dG9ufSB0eXBlPVwic3VibWl0XCIgaXNTcGlubmluZz0ke2Zvcm1EZW1vU3RhdGUuaXNSZXNvbHZpbmd9PlxuICAgICAgICAgICAgU3VibWl0IHRoZSBmb3JtXG4gICAgICAgIDwvJHtCdXR0b259PlxuICAgIDwvZGl2PmBcbn1cblxucmVuZGVyKGh0bWxgPCR7RGVtb30gLz5gLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpKTtcbiIsInZhciBuPWZ1bmN0aW9uKHQscyxyLGUpe3ZhciB1O3NbMF09MDtmb3IodmFyIGg9MTtoPHMubGVuZ3RoO2grKyl7dmFyIHA9c1toKytdLGE9c1toXT8oc1swXXw9cD8xOjIscltzW2grK11dKTpzWysraF07Mz09PXA/ZVswXT1hOjQ9PT1wP2VbMV09T2JqZWN0LmFzc2lnbihlWzFdfHx7fSxhKTo1PT09cD8oZVsxXT1lWzFdfHx7fSlbc1srK2hdXT1hOjY9PT1wP2VbMV1bc1srK2hdXSs9YStcIlwiOnA/KHU9dC5hcHBseShhLG4odCxhLHIsW1wiXCIsbnVsbF0pKSxlLnB1c2godSksYVswXT9zWzBdfD0yOihzW2gtMl09MCxzW2hdPXUpKTplLnB1c2goYSl9cmV0dXJuIGV9LHQ9bmV3IE1hcDtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzKXt2YXIgcj10LmdldCh0aGlzKTtyZXR1cm4gcnx8KHI9bmV3IE1hcCx0LnNldCh0aGlzLHIpKSwocj1uKHRoaXMsci5nZXQocyl8fChyLnNldChzLHI9ZnVuY3Rpb24obil7Zm9yKHZhciB0LHMscj0xLGU9XCJcIix1PVwiXCIsaD1bMF0scD1mdW5jdGlvbihuKXsxPT09ciYmKG58fChlPWUucmVwbGFjZSgvXlxccypcXG5cXHMqfFxccypcXG5cXHMqJC9nLFwiXCIpKSk/aC5wdXNoKDAsbixlKTozPT09ciYmKG58fGUpPyhoLnB1c2goMyxuLGUpLHI9Mik6Mj09PXImJlwiLi4uXCI9PT1lJiZuP2gucHVzaCg0LG4sMCk6Mj09PXImJmUmJiFuP2gucHVzaCg1LDAsITAsZSk6cj49NSYmKChlfHwhbiYmNT09PXIpJiYoaC5wdXNoKHIsMCxlLHMpLHI9NiksbiYmKGgucHVzaChyLG4sMCxzKSxyPTYpKSxlPVwiXCJ9LGE9MDthPG4ubGVuZ3RoO2ErKyl7YSYmKDE9PT1yJiZwKCkscChhKSk7Zm9yKHZhciBsPTA7bDxuW2FdLmxlbmd0aDtsKyspdD1uW2FdW2xdLDE9PT1yP1wiPFwiPT09dD8ocCgpLGg9W2hdLHI9Myk6ZSs9dDo0PT09cj9cIi0tXCI9PT1lJiZcIj5cIj09PXQ/KHI9MSxlPVwiXCIpOmU9dCtlWzBdOnU/dD09PXU/dT1cIlwiOmUrPXQ6J1wiJz09PXR8fFwiJ1wiPT09dD91PXQ6XCI+XCI9PT10PyhwKCkscj0xKTpyJiYoXCI9XCI9PT10PyhyPTUscz1lLGU9XCJcIik6XCIvXCI9PT10JiYocjw1fHxcIj5cIj09PW5bYV1bbCsxXSk/KHAoKSwzPT09ciYmKGg9aFswXSkscj1oLChoPWhbMF0pLnB1c2goMiwwLHIpLHI9MCk6XCIgXCI9PT10fHxcIlxcdFwiPT09dHx8XCJcXG5cIj09PXR8fFwiXFxyXCI9PT10PyhwKCkscj0yKTplKz10KSwzPT09ciYmXCIhLS1cIj09PWUmJihyPTQsaD1oWzBdKX1yZXR1cm4gcCgpLGh9KHMpKSxyKSxhcmd1bWVudHMsW10pKS5sZW5ndGg+MT9yOnJbMF19XG4iLCJpbXBvcnR7aCBhcyByLENvbXBvbmVudCBhcyBvLHJlbmRlciBhcyB0fWZyb21cInByZWFjdFwiO2V4cG9ydHtoLHJlbmRlcixDb21wb25lbnR9ZnJvbVwicHJlYWN0XCI7aW1wb3J0IGUgZnJvbVwiaHRtXCI7dmFyIG09ZS5iaW5kKHIpO2V4cG9ydHttIGFzIGh0bWx9O1xuIiwiZXhwb3J0IGNvbnN0IEVNUFRZX09CSiA9IHt9O1xuZXhwb3J0IGNvbnN0IEVNUFRZX0FSUiA9IFtdO1xuZXhwb3J0IGNvbnN0IElTX05PTl9ESU1FTlNJT05BTCA9IC9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8Z3JpZHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkfGl0ZXJhL2k7XG4iLCJpbXBvcnQgeyBfY2F0Y2hFcnJvciB9IGZyb20gJy4vZGlmZi9jYXRjaC1lcnJvcic7XG5cbi8qKlxuICogVGhlIGBvcHRpb25gIG9iamVjdCBjYW4gcG90ZW50aWFsbHkgY29udGFpbiBjYWxsYmFjayBmdW5jdGlvbnNcbiAqIHRoYXQgYXJlIGNhbGxlZCBkdXJpbmcgdmFyaW91cyBzdGFnZXMgb2Ygb3VyIHJlbmRlcmVyLiBUaGlzIGlzIHRoZVxuICogZm91bmRhdGlvbiBvbiB3aGljaCBhbGwgb3VyIGFkZG9ucyBsaWtlIGBwcmVhY3QvZGVidWdgLCBgcHJlYWN0L2NvbXBhdGAsXG4gKiBhbmQgYHByZWFjdC9ob29rc2AgYXJlIGJhc2VkIG9uLiBTZWUgdGhlIGBPcHRpb25zYCB0eXBlIGluIGBpbnRlcm5hbC5kLnRzYFxuICogZm9yIGEgZnVsbCBsaXN0IG9mIGF2YWlsYWJsZSBvcHRpb24gaG9va3MgKG1vc3QgZWRpdG9ycy9JREVzIGFsbG93IHlvdSB0b1xuICogY3RybCtjbGljayBvciBjbWQrY2xpY2sgb24gbWFjIHRoZSB0eXBlIGRlZmluaXRpb24gYmVsb3cpLlxuICogQHR5cGUge2ltcG9ydCgnLi9pbnRlcm5hbCcpLk9wdGlvbnN9XG4gKi9cbmNvbnN0IG9wdGlvbnMgPSB7XG5cdF9jYXRjaEVycm9yLFxuXHRfdm5vZGVJZDogMFxufTtcblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9ucztcbiIsImltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIHZpcnR1YWwgbm9kZSAodXNlZCBmb3IgSlNYKVxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZVtcInR5cGVcIl19IHR5cGUgVGhlIG5vZGUgbmFtZSBvciBDb21wb25lbnRcbiAqIGNvbnN0cnVjdG9yIGZvciB0aGlzIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtvYmplY3QgfCBudWxsIHwgdW5kZWZpbmVkfSBbcHJvcHNdIFRoZSBwcm9wZXJ0aWVzIG9mIHRoZSB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuJykuQ29tcG9uZW50Q2hpbGRyZW4+fSBbY2hpbGRyZW5dIFRoZSBjaGlsZHJlbiBvZiB0aGUgdmlydHVhbCBub2RlXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuXHRsZXQgbm9ybWFsaXplZFByb3BzID0ge30sXG5cdFx0a2V5LFxuXHRcdHJlZixcblx0XHRpO1xuXHRmb3IgKGkgaW4gcHJvcHMpIHtcblx0XHRpZiAoaSA9PSAna2V5Jykga2V5ID0gcHJvcHNbaV07XG5cdFx0ZWxzZSBpZiAoaSA9PSAncmVmJykgcmVmID0gcHJvcHNbaV07XG5cdFx0ZWxzZSBub3JtYWxpemVkUHJvcHNbaV0gPSBwcm9wc1tpXTtcblx0fVxuXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMykge1xuXHRcdGNoaWxkcmVuID0gW2NoaWxkcmVuXTtcblx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vcHJlYWN0anMvcHJlYWN0L2lzc3Vlcy8xOTE2XG5cdFx0Zm9yIChpID0gMzsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y2hpbGRyZW4ucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdH1cblx0fVxuXHRpZiAoY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdG5vcm1hbGl6ZWRQcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuXHR9XG5cblx0Ly8gSWYgYSBDb21wb25lbnQgVk5vZGUsIGNoZWNrIGZvciBhbmQgYXBwbHkgZGVmYXVsdFByb3BzXG5cdC8vIE5vdGU6IHR5cGUgbWF5IGJlIHVuZGVmaW5lZCBpbiBkZXZlbG9wbWVudCwgbXVzdCBuZXZlciBlcnJvciBoZXJlLlxuXHRpZiAodHlwZW9mIHR5cGUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlLmRlZmF1bHRQcm9wcyAhPSBudWxsKSB7XG5cdFx0Zm9yIChpIGluIHR5cGUuZGVmYXVsdFByb3BzKSB7XG5cdFx0XHRpZiAobm9ybWFsaXplZFByb3BzW2ldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0bm9ybWFsaXplZFByb3BzW2ldID0gdHlwZS5kZWZhdWx0UHJvcHNbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNyZWF0ZVZOb2RlKHR5cGUsIG5vcm1hbGl6ZWRQcm9wcywga2V5LCByZWYsIG51bGwpO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIFZOb2RlICh1c2VkIGludGVybmFsbHkgYnkgUHJlYWN0KVxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZVtcInR5cGVcIl19IHR5cGUgVGhlIG5vZGUgbmFtZSBvciBDb21wb25lbnRcbiAqIENvbnN0cnVjdG9yIGZvciB0aGlzIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtvYmplY3QgfCBzdHJpbmcgfCBudW1iZXIgfCBudWxsfSBwcm9wcyBUaGUgcHJvcGVydGllcyBvZiB0aGlzIHZpcnR1YWwgbm9kZS5cbiAqIElmIHRoaXMgdmlydHVhbCBub2RlIHJlcHJlc2VudHMgYSB0ZXh0IG5vZGUsIHRoaXMgaXMgdGhlIHRleHQgb2YgdGhlIG5vZGUgKHN0cmluZyBvciBudW1iZXIpLlxuICogQHBhcmFtIHtzdHJpbmcgfCBudW1iZXIgfCBudWxsfSBrZXkgVGhlIGtleSBmb3IgdGhpcyB2aXJ0dWFsIG5vZGUsIHVzZWQgd2hlblxuICogZGlmZmluZyBpdCBhZ2FpbnN0IGl0cyBjaGlsZHJlblxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZVtcInJlZlwiXX0gcmVmIFRoZSByZWYgcHJvcGVydHkgdGhhdCB3aWxsXG4gKiByZWNlaXZlIGEgcmVmZXJlbmNlIHRvIGl0cyBjcmVhdGVkIGNoaWxkXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWTm9kZSh0eXBlLCBwcm9wcywga2V5LCByZWYsIG9yaWdpbmFsKSB7XG5cdC8vIFY4IHNlZW1zIHRvIGJlIGJldHRlciBhdCBkZXRlY3RpbmcgdHlwZSBzaGFwZXMgaWYgdGhlIG9iamVjdCBpcyBhbGxvY2F0ZWQgZnJvbSB0aGUgc2FtZSBjYWxsIHNpdGVcblx0Ly8gRG8gbm90IGlubGluZSBpbnRvIGNyZWF0ZUVsZW1lbnQgYW5kIGNvZXJjZVRvVk5vZGUhXG5cdGNvbnN0IHZub2RlID0ge1xuXHRcdHR5cGUsXG5cdFx0cHJvcHMsXG5cdFx0a2V5LFxuXHRcdHJlZixcblx0XHRfY2hpbGRyZW46IG51bGwsXG5cdFx0X3BhcmVudDogbnVsbCxcblx0XHRfZGVwdGg6IDAsXG5cdFx0X2RvbTogbnVsbCxcblx0XHQvLyBfbmV4dERvbSBtdXN0IGJlIGluaXRpYWxpemVkIHRvIHVuZGVmaW5lZCBiL2MgaXQgd2lsbCBldmVudHVhbGx5XG5cdFx0Ly8gYmUgc2V0IHRvIGRvbS5uZXh0U2libGluZyB3aGljaCBjYW4gcmV0dXJuIGBudWxsYCBhbmQgaXQgaXMgaW1wb3J0YW50XG5cdFx0Ly8gdG8gYmUgYWJsZSB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIGFuIHVuaW5pdGlhbGl6ZWQgX25leHREb20gYW5kXG5cdFx0Ly8gYSBfbmV4dERvbSB0aGF0IGhhcyBiZWVuIHNldCB0byBgbnVsbGBcblx0XHRfbmV4dERvbTogdW5kZWZpbmVkLFxuXHRcdF9jb21wb25lbnQ6IG51bGwsXG5cdFx0X2h5ZHJhdGluZzogbnVsbCxcblx0XHRjb25zdHJ1Y3RvcjogdW5kZWZpbmVkLFxuXHRcdF9vcmlnaW5hbDogb3JpZ2luYWwgPT0gbnVsbCA/ICsrb3B0aW9ucy5fdm5vZGVJZCA6IG9yaWdpbmFsXG5cdH07XG5cblx0aWYgKG9wdGlvbnMudm5vZGUgIT0gbnVsbCkgb3B0aW9ucy52bm9kZSh2bm9kZSk7XG5cblx0cmV0dXJuIHZub2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVmKCkge1xuXHRyZXR1cm4geyBjdXJyZW50OiBudWxsIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFnbWVudChwcm9wcykge1xuXHRyZXR1cm4gcHJvcHMuY2hpbGRyZW47XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSB0aGUgYXJndW1lbnQgaXMgYSB2YWxpZCBQcmVhY3QgVk5vZGUuXG4gKiBAcGFyYW0geyp9IHZub2RlXG4gKiBAcmV0dXJucyB7dm5vZGUgaXMgaW1wb3J0KCcuL2ludGVybmFsJykuVk5vZGV9XG4gKi9cbmV4cG9ydCBjb25zdCBpc1ZhbGlkRWxlbWVudCA9IHZub2RlID0+XG5cdHZub2RlICE9IG51bGwgJiYgdm5vZGUuY29uc3RydWN0b3IgPT09IHVuZGVmaW5lZDtcbiIsImltcG9ydCB7IGFzc2lnbiB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBkaWZmLCBjb21taXRSb290IH0gZnJvbSAnLi9kaWZmL2luZGV4JztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgeyBGcmFnbWVudCB9IGZyb20gJy4vY3JlYXRlLWVsZW1lbnQnO1xuXG4vKipcbiAqIEJhc2UgQ29tcG9uZW50IGNsYXNzLiBQcm92aWRlcyBgc2V0U3RhdGUoKWAgYW5kIGBmb3JjZVVwZGF0ZSgpYCwgd2hpY2hcbiAqIHRyaWdnZXIgcmVuZGVyaW5nXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgVGhlIGluaXRpYWwgY29tcG9uZW50IHByb3BzXG4gKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBUaGUgaW5pdGlhbCBjb250ZXh0IGZyb20gcGFyZW50IGNvbXBvbmVudHMnXG4gKiBnZXRDaGlsZENvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCkge1xuXHR0aGlzLnByb3BzID0gcHJvcHM7XG5cdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG59XG5cbi8qKlxuICogVXBkYXRlIGNvbXBvbmVudCBzdGF0ZSBhbmQgc2NoZWR1bGUgYSByZS1yZW5kZXIuXG4gKiBAdGhpcyB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fVxuICogQHBhcmFtIHtvYmplY3QgfCAoKHM6IG9iamVjdCwgcDogb2JqZWN0KSA9PiBvYmplY3QpfSB1cGRhdGUgQSBoYXNoIG9mIHN0YXRlXG4gKiBwcm9wZXJ0aWVzIHRvIHVwZGF0ZSB3aXRoIG5ldyB2YWx1ZXMgb3IgYSBmdW5jdGlvbiB0aGF0IGdpdmVuIHRoZSBjdXJyZW50XG4gKiBzdGF0ZSBhbmQgcHJvcHMgcmV0dXJucyBhIG5ldyBwYXJ0aWFsIHN0YXRlXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IFtjYWxsYmFja10gQSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb25jZSBjb21wb25lbnQgc3RhdGUgaXNcbiAqIHVwZGF0ZWRcbiAqL1xuQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uKHVwZGF0ZSwgY2FsbGJhY2spIHtcblx0Ly8gb25seSBjbG9uZSBzdGF0ZSB3aGVuIGNvcHlpbmcgdG8gbmV4dFN0YXRlIHRoZSBmaXJzdCB0aW1lLlxuXHRsZXQgcztcblx0aWYgKHRoaXMuX25leHRTdGF0ZSAhPSBudWxsICYmIHRoaXMuX25leHRTdGF0ZSAhPT0gdGhpcy5zdGF0ZSkge1xuXHRcdHMgPSB0aGlzLl9uZXh0U3RhdGU7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IHRoaXMuX25leHRTdGF0ZSA9IGFzc2lnbih7fSwgdGhpcy5zdGF0ZSk7XG5cdH1cblxuXHRpZiAodHlwZW9mIHVwZGF0ZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gU29tZSBsaWJyYXJpZXMgbGlrZSBgaW1tZXJgIG1hcmsgdGhlIGN1cnJlbnQgc3RhdGUgYXMgcmVhZG9ubHksXG5cdFx0Ly8gcHJldmVudGluZyB1cyBmcm9tIG11dGF0aW5nIGl0LCBzbyB3ZSBuZWVkIHRvIGNsb25lIGl0LiBTZWUgIzI3MTZcblx0XHR1cGRhdGUgPSB1cGRhdGUoYXNzaWduKHt9LCBzKSwgdGhpcy5wcm9wcyk7XG5cdH1cblxuXHRpZiAodXBkYXRlKSB7XG5cdFx0YXNzaWduKHMsIHVwZGF0ZSk7XG5cdH1cblxuXHQvLyBTa2lwIHVwZGF0ZSBpZiB1cGRhdGVyIGZ1bmN0aW9uIHJldHVybmVkIG51bGxcblx0aWYgKHVwZGF0ZSA9PSBudWxsKSByZXR1cm47XG5cblx0aWYgKHRoaXMuX3Zub2RlKSB7XG5cdFx0aWYgKGNhbGxiYWNrKSB0aGlzLl9yZW5kZXJDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG5cdFx0ZW5xdWV1ZVJlbmRlcih0aGlzKTtcblx0fVxufTtcblxuLyoqXG4gKiBJbW1lZGlhdGVseSBwZXJmb3JtIGEgc3luY2hyb25vdXMgcmUtcmVuZGVyIG9mIHRoZSBjb21wb25lbnRcbiAqIEB0aGlzIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnR9XG4gKiBAcGFyYW0geygpID0+IHZvaWR9IFtjYWxsYmFja10gQSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgYWZ0ZXIgY29tcG9uZW50IGlzXG4gKiByZS1yZW5kZXJlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0aWYgKHRoaXMuX3Zub2RlKSB7XG5cdFx0Ly8gU2V0IHJlbmRlciBtb2RlIHNvIHRoYXQgd2UgY2FuIGRpZmZlcmVudGlhdGUgd2hlcmUgdGhlIHJlbmRlciByZXF1ZXN0XG5cdFx0Ly8gaXMgY29taW5nIGZyb20uIFdlIG5lZWQgdGhpcyBiZWNhdXNlIGZvcmNlVXBkYXRlIHNob3VsZCBuZXZlciBjYWxsXG5cdFx0Ly8gc2hvdWxkQ29tcG9uZW50VXBkYXRlXG5cdFx0dGhpcy5fZm9yY2UgPSB0cnVlO1xuXHRcdGlmIChjYWxsYmFjaykgdGhpcy5fcmVuZGVyQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuXHRcdGVucXVldWVSZW5kZXIodGhpcyk7XG5cdH1cbn07XG5cbi8qKlxuICogQWNjZXB0cyBgcHJvcHNgIGFuZCBgc3RhdGVgLCBhbmQgcmV0dXJucyBhIG5ldyBWaXJ0dWFsIERPTSB0cmVlIHRvIGJ1aWxkLlxuICogVmlydHVhbCBET00gaXMgZ2VuZXJhbGx5IGNvbnN0cnVjdGVkIHZpYSBbSlNYXShodHRwOi8vamFzb25mb3JtYXQuY29tL3d0Zi1pcy1qc3gpLlxuICogQHBhcmFtIHtvYmplY3R9IHByb3BzIFByb3BzIChlZzogSlNYIGF0dHJpYnV0ZXMpIHJlY2VpdmVkIGZyb20gcGFyZW50XG4gKiBlbGVtZW50L2NvbXBvbmVudFxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRlIFRoZSBjb21wb25lbnQncyBjdXJyZW50IHN0YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBDb250ZXh0IG9iamVjdCwgYXMgcmV0dXJuZWQgYnkgdGhlIG5lYXJlc3RcbiAqIGFuY2VzdG9yJ3MgYGdldENoaWxkQ29udGV4dCgpYFxuICogQHJldHVybnMge2ltcG9ydCgnLi9pbmRleCcpLkNvbXBvbmVudENoaWxkcmVuIHwgdm9pZH1cbiAqL1xuQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBGcmFnbWVudDtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZVxuICogQHBhcmFtIHtudW1iZXIgfCBudWxsfSBbY2hpbGRJbmRleF1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERvbVNpYmxpbmcodm5vZGUsIGNoaWxkSW5kZXgpIHtcblx0aWYgKGNoaWxkSW5kZXggPT0gbnVsbCkge1xuXHRcdC8vIFVzZSBjaGlsZEluZGV4PT1udWxsIGFzIGEgc2lnbmFsIHRvIHJlc3VtZSB0aGUgc2VhcmNoIGZyb20gdGhlIHZub2RlJ3Mgc2libGluZ1xuXHRcdHJldHVybiB2bm9kZS5fcGFyZW50XG5cdFx0XHQ/IGdldERvbVNpYmxpbmcodm5vZGUuX3BhcmVudCwgdm5vZGUuX3BhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih2bm9kZSkgKyAxKVxuXHRcdFx0OiBudWxsO1xuXHR9XG5cblx0bGV0IHNpYmxpbmc7XG5cdGZvciAoOyBjaGlsZEluZGV4IDwgdm5vZGUuX2NoaWxkcmVuLmxlbmd0aDsgY2hpbGRJbmRleCsrKSB7XG5cdFx0c2libGluZyA9IHZub2RlLl9jaGlsZHJlbltjaGlsZEluZGV4XTtcblxuXHRcdGlmIChzaWJsaW5nICE9IG51bGwgJiYgc2libGluZy5fZG9tICE9IG51bGwpIHtcblx0XHRcdC8vIFNpbmNlIHVwZGF0ZVBhcmVudERvbVBvaW50ZXJzIGtlZXBzIF9kb20gcG9pbnRlciBjb3JyZWN0LFxuXHRcdFx0Ly8gd2UgY2FuIHJlbHkgb24gX2RvbSB0byB0ZWxsIHVzIGlmIHRoaXMgc3VidHJlZSBjb250YWlucyBhXG5cdFx0XHQvLyByZW5kZXJlZCBET00gbm9kZSwgYW5kIHdoYXQgdGhlIGZpcnN0IHJlbmRlcmVkIERPTSBub2RlIGlzXG5cdFx0XHRyZXR1cm4gc2libGluZy5fZG9tO1xuXHRcdH1cblx0fVxuXG5cdC8vIElmIHdlIGdldCBoZXJlLCB3ZSBoYXZlIG5vdCBmb3VuZCBhIERPTSBub2RlIGluIHRoaXMgdm5vZGUncyBjaGlsZHJlbi5cblx0Ly8gV2UgbXVzdCByZXN1bWUgZnJvbSB0aGlzIHZub2RlJ3Mgc2libGluZyAoaW4gaXQncyBwYXJlbnQgX2NoaWxkcmVuIGFycmF5KVxuXHQvLyBPbmx5IGNsaW1iIHVwIGFuZCBzZWFyY2ggdGhlIHBhcmVudCBpZiB3ZSBhcmVuJ3Qgc2VhcmNoaW5nIHRocm91Z2ggYSBET01cblx0Ly8gVk5vZGUgKG1lYW5pbmcgd2UgcmVhY2hlZCB0aGUgRE9NIHBhcmVudCBvZiB0aGUgb3JpZ2luYWwgdm5vZGUgdGhhdCBiZWdhblxuXHQvLyB0aGUgc2VhcmNoKVxuXHRyZXR1cm4gdHlwZW9mIHZub2RlLnR5cGUgPT0gJ2Z1bmN0aW9uJyA/IGdldERvbVNpYmxpbmcodm5vZGUpIDogbnVsbDtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIGluLXBsYWNlIHJlLXJlbmRlcmluZyBvZiBhIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fSBjb21wb25lbnQgVGhlIGNvbXBvbmVudCB0byByZXJlbmRlclxuICovXG5mdW5jdGlvbiByZW5kZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG5cdGxldCB2bm9kZSA9IGNvbXBvbmVudC5fdm5vZGUsXG5cdFx0b2xkRG9tID0gdm5vZGUuX2RvbSxcblx0XHRwYXJlbnREb20gPSBjb21wb25lbnQuX3BhcmVudERvbTtcblxuXHRpZiAocGFyZW50RG9tKSB7XG5cdFx0bGV0IGNvbW1pdFF1ZXVlID0gW107XG5cdFx0Y29uc3Qgb2xkVk5vZGUgPSBhc3NpZ24oe30sIHZub2RlKTtcblx0XHRvbGRWTm9kZS5fb3JpZ2luYWwgPSB2bm9kZS5fb3JpZ2luYWwgKyAxO1xuXG5cdFx0ZGlmZihcblx0XHRcdHBhcmVudERvbSxcblx0XHRcdHZub2RlLFxuXHRcdFx0b2xkVk5vZGUsXG5cdFx0XHRjb21wb25lbnQuX2dsb2JhbENvbnRleHQsXG5cdFx0XHRwYXJlbnREb20ub3duZXJTVkdFbGVtZW50ICE9PSB1bmRlZmluZWQsXG5cdFx0XHR2bm9kZS5faHlkcmF0aW5nICE9IG51bGwgPyBbb2xkRG9tXSA6IG51bGwsXG5cdFx0XHRjb21taXRRdWV1ZSxcblx0XHRcdG9sZERvbSA9PSBudWxsID8gZ2V0RG9tU2libGluZyh2bm9kZSkgOiBvbGREb20sXG5cdFx0XHR2bm9kZS5faHlkcmF0aW5nXG5cdFx0KTtcblx0XHRjb21taXRSb290KGNvbW1pdFF1ZXVlLCB2bm9kZSk7XG5cblx0XHRpZiAodm5vZGUuX2RvbSAhPSBvbGREb20pIHtcblx0XHRcdHVwZGF0ZVBhcmVudERvbVBvaW50ZXJzKHZub2RlKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZVxuICovXG5mdW5jdGlvbiB1cGRhdGVQYXJlbnREb21Qb2ludGVycyh2bm9kZSkge1xuXHRpZiAoKHZub2RlID0gdm5vZGUuX3BhcmVudCkgIT0gbnVsbCAmJiB2bm9kZS5fY29tcG9uZW50ICE9IG51bGwpIHtcblx0XHR2bm9kZS5fZG9tID0gdm5vZGUuX2NvbXBvbmVudC5iYXNlID0gbnVsbDtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHZub2RlLl9jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IGNoaWxkID0gdm5vZGUuX2NoaWxkcmVuW2ldO1xuXHRcdFx0aWYgKGNoaWxkICE9IG51bGwgJiYgY2hpbGQuX2RvbSAhPSBudWxsKSB7XG5cdFx0XHRcdHZub2RlLl9kb20gPSB2bm9kZS5fY29tcG9uZW50LmJhc2UgPSBjaGlsZC5fZG9tO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdXBkYXRlUGFyZW50RG9tUG9pbnRlcnModm5vZGUpO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIHJlbmRlciBxdWV1ZVxuICogQHR5cGUge0FycmF5PGltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59XG4gKi9cbmxldCByZXJlbmRlclF1ZXVlID0gW107XG5cbi8qKlxuICogQXN5bmNocm9ub3VzbHkgc2NoZWR1bGUgYSBjYWxsYmFja1xuICogQHR5cGUgeyhjYjogKCkgPT4gdm9pZCkgPT4gdm9pZH1cbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbi8vIE5vdGUgdGhlIGZvbGxvd2luZyBsaW5lIGlzbid0IHRyZWUtc2hha2VuIGJ5IHJvbGx1cCBjdXogb2Ygcm9sbHVwL3JvbGx1cCMyNTY2XG5jb25zdCBkZWZlciA9XG5cdHR5cGVvZiBQcm9taXNlID09ICdmdW5jdGlvbidcblx0XHQ/IFByb21pc2UucHJvdG90eXBlLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSlcblx0XHQ6IHNldFRpbWVvdXQ7XG5cbi8qXG4gKiBUaGUgdmFsdWUgb2YgYENvbXBvbmVudC5kZWJvdW5jZWAgbXVzdCBhc3luY2hyb25vdXNseSBpbnZva2UgdGhlIHBhc3NlZCBpbiBjYWxsYmFjay4gSXQgaXNcbiAqIGltcG9ydGFudCB0aGF0IGNvbnRyaWJ1dG9ycyB0byBQcmVhY3QgY2FuIGNvbnNpc3RlbnRseSByZWFzb24gYWJvdXQgd2hhdCBjYWxscyB0byBgc2V0U3RhdGVgLCBldGMuXG4gKiBkbywgYW5kIHdoZW4gdGhlaXIgZWZmZWN0cyB3aWxsIGJlIGFwcGxpZWQuIFNlZSB0aGUgbGlua3MgYmVsb3cgZm9yIHNvbWUgZnVydGhlciByZWFkaW5nIG9uIGRlc2lnbmluZ1xuICogYXN5bmNocm9ub3VzIEFQSXMuXG4gKiAqIFtEZXNpZ25pbmcgQVBJcyBmb3IgQXN5bmNocm9ueV0oaHR0cHM6Ly9ibG9nLml6cy5tZS8yMDEzLzA4L2Rlc2lnbmluZy1hcGlzLWZvci1hc3luY2hyb255KVxuICogKiBbQ2FsbGJhY2tzIHN5bmNocm9ub3VzIGFuZCBhc3luY2hyb25vdXNdKGh0dHBzOi8vYmxvZy5vbWV0ZXIuY29tLzIwMTEvMDcvMjQvY2FsbGJhY2tzLXN5bmNocm9ub3VzLWFuZC1hc3luY2hyb25vdXMvKVxuICovXG5cbmxldCBwcmV2RGVib3VuY2U7XG5cbi8qKlxuICogRW5xdWV1ZSBhIHJlcmVuZGVyIG9mIGEgY29tcG9uZW50XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudH0gYyBUaGUgY29tcG9uZW50IHRvIHJlcmVuZGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnF1ZXVlUmVuZGVyKGMpIHtcblx0aWYgKFxuXHRcdCghYy5fZGlydHkgJiZcblx0XHRcdChjLl9kaXJ0eSA9IHRydWUpICYmXG5cdFx0XHRyZXJlbmRlclF1ZXVlLnB1c2goYykgJiZcblx0XHRcdCFwcm9jZXNzLl9yZXJlbmRlckNvdW50KyspIHx8XG5cdFx0cHJldkRlYm91bmNlICE9PSBvcHRpb25zLmRlYm91bmNlUmVuZGVyaW5nXG5cdCkge1xuXHRcdHByZXZEZWJvdW5jZSA9IG9wdGlvbnMuZGVib3VuY2VSZW5kZXJpbmc7XG5cdFx0KHByZXZEZWJvdW5jZSB8fCBkZWZlcikocHJvY2Vzcyk7XG5cdH1cbn1cblxuLyoqIEZsdXNoIHRoZSByZW5kZXIgcXVldWUgYnkgcmVyZW5kZXJpbmcgYWxsIHF1ZXVlZCBjb21wb25lbnRzICovXG5mdW5jdGlvbiBwcm9jZXNzKCkge1xuXHRsZXQgcXVldWU7XG5cdHdoaWxlICgocHJvY2Vzcy5fcmVyZW5kZXJDb3VudCA9IHJlcmVuZGVyUXVldWUubGVuZ3RoKSkge1xuXHRcdHF1ZXVlID0gcmVyZW5kZXJRdWV1ZS5zb3J0KChhLCBiKSA9PiBhLl92bm9kZS5fZGVwdGggLSBiLl92bm9kZS5fZGVwdGgpO1xuXHRcdHJlcmVuZGVyUXVldWUgPSBbXTtcblx0XHQvLyBEb24ndCB1cGRhdGUgYHJlbmRlckNvdW50YCB5ZXQuIEtlZXAgaXRzIHZhbHVlIG5vbi16ZXJvIHRvIHByZXZlbnQgdW5uZWNlc3Nhcnlcblx0XHQvLyBwcm9jZXNzKCkgY2FsbHMgZnJvbSBnZXR0aW5nIHNjaGVkdWxlZCB3aGlsZSBgcXVldWVgIGlzIHN0aWxsIGJlaW5nIGNvbnN1bWVkLlxuXHRcdHF1ZXVlLnNvbWUoYyA9PiB7XG5cdFx0XHRpZiAoYy5fZGlydHkpIHJlbmRlckNvbXBvbmVudChjKTtcblx0XHR9KTtcblx0fVxufVxucHJvY2Vzcy5fcmVyZW5kZXJDb3VudCA9IDA7XG4iLCJpbXBvcnQgeyBlbnF1ZXVlUmVuZGVyIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuXG5leHBvcnQgbGV0IGkgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udGV4dChkZWZhdWx0VmFsdWUsIGNvbnRleHRJZCkge1xuXHRjb250ZXh0SWQgPSAnX19jQycgKyBpKys7XG5cblx0Y29uc3QgY29udGV4dCA9IHtcblx0XHRfaWQ6IGNvbnRleHRJZCxcblx0XHRfZGVmYXVsdFZhbHVlOiBkZWZhdWx0VmFsdWUsXG5cdFx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5GdW5jdGlvbkNvbXBvbmVudH0gKi9cblx0XHRDb25zdW1lcihwcm9wcywgY29udGV4dFZhbHVlKSB7XG5cdFx0XHQvLyByZXR1cm4gcHJvcHMuY2hpbGRyZW4oXG5cdFx0XHQvLyBcdGNvbnRleHRbY29udGV4dElkXSA/IGNvbnRleHRbY29udGV4dElkXS5wcm9wcy52YWx1ZSA6IGRlZmF1bHRWYWx1ZVxuXHRcdFx0Ly8gKTtcblx0XHRcdHJldHVybiBwcm9wcy5jaGlsZHJlbihjb250ZXh0VmFsdWUpO1xuXHRcdH0sXG5cdFx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5GdW5jdGlvbkNvbXBvbmVudH0gKi9cblx0XHRQcm92aWRlcihwcm9wcykge1xuXHRcdFx0aWYgKCF0aGlzLmdldENoaWxkQ29udGV4dCkge1xuXHRcdFx0XHRsZXQgc3VicyA9IFtdO1xuXHRcdFx0XHRsZXQgY3R4ID0ge307XG5cdFx0XHRcdGN0eFtjb250ZXh0SWRdID0gdGhpcztcblxuXHRcdFx0XHR0aGlzLmdldENoaWxkQ29udGV4dCA9ICgpID0+IGN0eDtcblxuXHRcdFx0XHR0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uKF9wcm9wcykge1xuXHRcdFx0XHRcdGlmICh0aGlzLnByb3BzLnZhbHVlICE9PSBfcHJvcHMudmFsdWUpIHtcblx0XHRcdFx0XHRcdC8vIEkgdGhpbmsgdGhlIGZvcmNlZCB2YWx1ZSBwcm9wYWdhdGlvbiBoZXJlIHdhcyBvbmx5IG5lZWRlZCB3aGVuIGBvcHRpb25zLmRlYm91bmNlUmVuZGVyaW5nYCB3YXMgYmVpbmcgYnlwYXNzZWQ6XG5cdFx0XHRcdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vcHJlYWN0anMvcHJlYWN0L2NvbW1pdC80ZDMzOWZiODAzYmVhMDllOWYxOThhYmYzOGNhMWJmOGVhNGI3NzcxI2RpZmYtNTQ2ODJjZTM4MDkzNWE3MTdlNDFiOGJmYzU0NzM3ZjZSMzU4XG5cdFx0XHRcdFx0XHQvLyBJbiB0aG9zZSBjYXNlcyB0aG91Z2gsIGV2ZW4gd2l0aCB0aGUgdmFsdWUgY29ycmVjdGVkLCB3ZSdyZSBkb3VibGUtcmVuZGVyaW5nIGFsbCBub2Rlcy5cblx0XHRcdFx0XHRcdC8vIEl0IG1pZ2h0IGJlIGJldHRlciB0byBqdXN0IHRlbGwgZm9sa3Mgbm90IHRvIHVzZSBmb3JjZS1zeW5jIG1vZGUuXG5cdFx0XHRcdFx0XHQvLyBDdXJyZW50bHksIHVzaW5nIGB1c2VDb250ZXh0KClgIGluIGEgY2xhc3MgY29tcG9uZW50IHdpbGwgb3ZlcndyaXRlIGl0cyBgdGhpcy5jb250ZXh0YCB2YWx1ZS5cblx0XHRcdFx0XHRcdC8vIHN1YnMuc29tZShjID0+IHtcblx0XHRcdFx0XHRcdC8vIFx0Yy5jb250ZXh0ID0gX3Byb3BzLnZhbHVlO1xuXHRcdFx0XHRcdFx0Ly8gXHRlbnF1ZXVlUmVuZGVyKGMpO1xuXHRcdFx0XHRcdFx0Ly8gfSk7XG5cblx0XHRcdFx0XHRcdC8vIHN1YnMuc29tZShjID0+IHtcblx0XHRcdFx0XHRcdC8vIFx0Yy5jb250ZXh0W2NvbnRleHRJZF0gPSBfcHJvcHMudmFsdWU7XG5cdFx0XHRcdFx0XHQvLyBcdGVucXVldWVSZW5kZXIoYyk7XG5cdFx0XHRcdFx0XHQvLyB9KTtcblx0XHRcdFx0XHRcdHN1YnMuc29tZShlbnF1ZXVlUmVuZGVyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0dGhpcy5zdWIgPSBjID0+IHtcblx0XHRcdFx0XHRzdWJzLnB1c2goYyk7XG5cdFx0XHRcdFx0bGV0IG9sZCA9IGMuY29tcG9uZW50V2lsbFVubW91bnQ7XG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsVW5tb3VudCA9ICgpID0+IHtcblx0XHRcdFx0XHRcdHN1YnMuc3BsaWNlKHN1YnMuaW5kZXhPZihjKSwgMSk7XG5cdFx0XHRcdFx0XHRpZiAob2xkKSBvbGQuY2FsbChjKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcHJvcHMuY2hpbGRyZW47XG5cdFx0fVxuXHR9O1xuXG5cdC8vIERldnRvb2xzIG5lZWRzIGFjY2VzcyB0byB0aGUgY29udGV4dCBvYmplY3Qgd2hlbiBpdFxuXHQvLyBlbmNvdW50ZXJzIGEgUHJvdmlkZXIuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIHN1cHBvcnRcblx0Ly8gc2V0dGluZyBgZGlzcGxheU5hbWVgIG9uIHRoZSBjb250ZXh0IG9iamVjdCBpbnN0ZWFkXG5cdC8vIG9mIG9uIHRoZSBjb21wb25lbnQgaXRzZWxmLiBTZWU6XG5cdC8vIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9jb250ZXh0Lmh0bWwjY29udGV4dGRpc3BsYXluYW1lXG5cblx0cmV0dXJuIChjb250ZXh0LlByb3ZpZGVyLl9jb250ZXh0UmVmID0gY29udGV4dC5Db25zdW1lci5jb250ZXh0VHlwZSA9IGNvbnRleHQpO1xufVxuIiwiLyoqXG4gKiBBc3NpZ24gcHJvcGVydGllcyBmcm9tIGBwcm9wc2AgdG8gYG9iamBcbiAqIEB0ZW1wbGF0ZSBPLCBQIFRoZSBvYmogYW5kIHByb3BzIHR5cGVzXG4gKiBAcGFyYW0ge099IG9iaiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0b1xuICogQHBhcmFtIHtQfSBwcm9wcyBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcmV0dXJucyB7TyAmIFB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ24ob2JqLCBwcm9wcykge1xuXHQvLyBAdHMtaWdub3JlIFdlIGNoYW5nZSB0aGUgdHlwZSBvZiBgb2JqYCB0byBiZSBgTyAmIFBgXG5cdGZvciAobGV0IGkgaW4gcHJvcHMpIG9ialtpXSA9IHByb3BzW2ldO1xuXHRyZXR1cm4gLyoqIEB0eXBlIHtPICYgUH0gKi8gKG9iaik7XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgY2hpbGQgbm9kZSBmcm9tIGl0cyBwYXJlbnQgaWYgYXR0YWNoZWQuIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvclxuICogSUUxMSB3aGljaCBkb2Vzbid0IHN1cHBvcnQgYEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZSgpYC4gVXNpbmcgdGhpcyBmdW5jdGlvblxuICogaXMgc21hbGxlciB0aGFuIGluY2x1ZGluZyBhIGRlZGljYXRlZCBwb2x5ZmlsbC5cbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSBUaGUgbm9kZSB0byByZW1vdmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSkge1xuXHRsZXQgcGFyZW50Tm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcblx0aWYgKHBhcmVudE5vZGUpIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG4iLCJpbXBvcnQgeyBkaWZmLCB1bm1vdW50LCBhcHBseVJlZiB9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHsgY3JlYXRlVk5vZGUsIEZyYWdtZW50IH0gZnJvbSAnLi4vY3JlYXRlLWVsZW1lbnQnO1xuaW1wb3J0IHsgRU1QVFlfT0JKLCBFTVBUWV9BUlIgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0RG9tU2libGluZyB9IGZyb20gJy4uL2NvbXBvbmVudCc7XG5cbi8qKlxuICogRGlmZiB0aGUgY2hpbGRyZW4gb2YgYSB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IHBhcmVudERvbSBUaGUgRE9NIGVsZW1lbnQgd2hvc2VcbiAqIGNoaWxkcmVuIGFyZSBiZWluZyBkaWZmZWRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudENoaWxkcmVuW119IHJlbmRlclJlc3VsdFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG5ld1BhcmVudFZOb2RlIFRoZSBuZXcgdmlydHVhbFxuICogbm9kZSB3aG9zZSBjaGlsZHJlbiBzaG91bGQgYmUgZGlmZidlZCBhZ2FpbnN0IG9sZFBhcmVudFZOb2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gb2xkUGFyZW50Vk5vZGUgVGhlIG9sZCB2aXJ0dWFsXG4gKiBub2RlIHdob3NlIGNoaWxkcmVuIHNob3VsZCBiZSBkaWZmJ2VkIGFnYWluc3QgbmV3UGFyZW50Vk5vZGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBnbG9iYWxDb250ZXh0IFRoZSBjdXJyZW50IGNvbnRleHQgb2JqZWN0IC0gbW9kaWZpZWQgYnkgZ2V0Q2hpbGRDb250ZXh0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3ZnIFdoZXRoZXIgb3Igbm90IHRoaXMgRE9NIG5vZGUgaXMgYW4gU1ZHIG5vZGVcbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnQ+fSBleGNlc3NEb21DaGlsZHJlblxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2ludGVybmFsJykuQ29tcG9uZW50Pn0gY29tbWl0UXVldWUgTGlzdCBvZiBjb21wb25lbnRzXG4gKiB3aGljaCBoYXZlIGNhbGxiYWNrcyB0byBpbnZva2UgaW4gY29tbWl0Um9vdFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gb2xkRG9tIFRoZSBjdXJyZW50IGF0dGFjaGVkIERPTVxuICogZWxlbWVudCBhbnkgbmV3IGRvbSBlbGVtZW50cyBzaG91bGQgYmUgcGxhY2VkIGFyb3VuZC4gTGlrZWx5IGBudWxsYCBvbiBmaXJzdFxuICogcmVuZGVyIChleGNlcHQgd2hlbiBoeWRyYXRpbmcpLiBDYW4gYmUgYSBzaWJsaW5nIERPTSBlbGVtZW50IHdoZW4gZGlmZmluZ1xuICogRnJhZ21lbnRzIHRoYXQgaGF2ZSBzaWJsaW5ncy4gSW4gbW9zdCBjYXNlcywgaXQgc3RhcnRzIG91dCBhcyBgb2xkQ2hpbGRyZW5bMF0uX2RvbWAuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzSHlkcmF0aW5nIFdoZXRoZXIgb3Igbm90IHdlIGFyZSBpbiBoeWRyYXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZDaGlsZHJlbihcblx0cGFyZW50RG9tLFxuXHRyZW5kZXJSZXN1bHQsXG5cdG5ld1BhcmVudFZOb2RlLFxuXHRvbGRQYXJlbnRWTm9kZSxcblx0Z2xvYmFsQ29udGV4dCxcblx0aXNTdmcsXG5cdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRjb21taXRRdWV1ZSxcblx0b2xkRG9tLFxuXHRpc0h5ZHJhdGluZ1xuKSB7XG5cdGxldCBpLCBqLCBvbGRWTm9kZSwgY2hpbGRWTm9kZSwgbmV3RG9tLCBmaXJzdENoaWxkRG9tLCByZWZzO1xuXG5cdC8vIFRoaXMgaXMgYSBjb21wcmVzc2lvbiBvZiBvbGRQYXJlbnRWTm9kZSE9bnVsbCAmJiBvbGRQYXJlbnRWTm9kZSAhPSBFTVBUWV9PQkogJiYgb2xkUGFyZW50Vk5vZGUuX2NoaWxkcmVuIHx8IEVNUFRZX0FSUlxuXHQvLyBhcyBFTVBUWV9PQkouX2NoaWxkcmVuIHNob3VsZCBiZSBgdW5kZWZpbmVkYC5cblx0bGV0IG9sZENoaWxkcmVuID0gKG9sZFBhcmVudFZOb2RlICYmIG9sZFBhcmVudFZOb2RlLl9jaGlsZHJlbikgfHwgRU1QVFlfQVJSO1xuXG5cdGxldCBvbGRDaGlsZHJlbkxlbmd0aCA9IG9sZENoaWxkcmVuLmxlbmd0aDtcblxuXHRuZXdQYXJlbnRWTm9kZS5fY2hpbGRyZW4gPSBbXTtcblx0Zm9yIChpID0gMDsgaSA8IHJlbmRlclJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHRcdGNoaWxkVk5vZGUgPSByZW5kZXJSZXN1bHRbaV07XG5cblx0XHRpZiAoY2hpbGRWTm9kZSA9PSBudWxsIHx8IHR5cGVvZiBjaGlsZFZOb2RlID09ICdib29sZWFuJykge1xuXHRcdFx0Y2hpbGRWTm9kZSA9IG5ld1BhcmVudFZOb2RlLl9jaGlsZHJlbltpXSA9IG51bGw7XG5cdFx0fVxuXHRcdC8vIElmIHRoaXMgbmV3Vk5vZGUgaXMgYmVpbmcgcmV1c2VkIChlLmcuIDxkaXY+e3JldXNlfXtyZXVzZX08L2Rpdj4pIGluIHRoZSBzYW1lIGRpZmYsXG5cdFx0Ly8gb3Igd2UgYXJlIHJlbmRlcmluZyBhIGNvbXBvbmVudCAoZS5nLiBzZXRTdGF0ZSkgY29weSB0aGUgb2xkVk5vZGVzIHNvIGl0IGNhbiBoYXZlXG5cdFx0Ly8gaXQncyBvd24gRE9NICYgZXRjLiBwb2ludGVyc1xuXHRcdGVsc2UgaWYgKFxuXHRcdFx0dHlwZW9mIGNoaWxkVk5vZGUgPT0gJ3N0cmluZycgfHxcblx0XHRcdHR5cGVvZiBjaGlsZFZOb2RlID09ICdudW1iZXInIHx8XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdmFsaWQtdHlwZW9mXG5cdFx0XHR0eXBlb2YgY2hpbGRWTm9kZSA9PSAnYmlnaW50J1xuXHRcdCkge1xuXHRcdFx0Y2hpbGRWTm9kZSA9IG5ld1BhcmVudFZOb2RlLl9jaGlsZHJlbltpXSA9IGNyZWF0ZVZOb2RlKFxuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHRjaGlsZFZOb2RlLFxuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHRjaGlsZFZOb2RlXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZFZOb2RlKSkge1xuXHRcdFx0Y2hpbGRWTm9kZSA9IG5ld1BhcmVudFZOb2RlLl9jaGlsZHJlbltpXSA9IGNyZWF0ZVZOb2RlKFxuXHRcdFx0XHRGcmFnbWVudCxcblx0XHRcdFx0eyBjaGlsZHJlbjogY2hpbGRWTm9kZSB9LFxuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHRudWxsXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAoY2hpbGRWTm9kZS5fZGVwdGggPiAwKSB7XG5cdFx0XHQvLyBWTm9kZSBpcyBhbHJlYWR5IGluIHVzZSwgY2xvbmUgaXQuIFRoaXMgY2FuIGhhcHBlbiBpbiB0aGUgZm9sbG93aW5nXG5cdFx0XHQvLyBzY2VuYXJpbzpcblx0XHRcdC8vICAgY29uc3QgcmV1c2UgPSA8ZGl2IC8+XG5cdFx0XHQvLyAgIDxkaXY+e3JldXNlfTxzcGFuIC8+e3JldXNlfTwvZGl2PlxuXHRcdFx0Y2hpbGRWTm9kZSA9IG5ld1BhcmVudFZOb2RlLl9jaGlsZHJlbltpXSA9IGNyZWF0ZVZOb2RlKFxuXHRcdFx0XHRjaGlsZFZOb2RlLnR5cGUsXG5cdFx0XHRcdGNoaWxkVk5vZGUucHJvcHMsXG5cdFx0XHRcdGNoaWxkVk5vZGUua2V5LFxuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHRjaGlsZFZOb2RlLl9vcmlnaW5hbFxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGRWTm9kZSA9IG5ld1BhcmVudFZOb2RlLl9jaGlsZHJlbltpXSA9IGNoaWxkVk5vZGU7XG5cdFx0fVxuXG5cdFx0Ly8gVGVyc2VyIHJlbW92ZXMgdGhlIGBjb250aW51ZWAgaGVyZSBhbmQgd3JhcHMgdGhlIGxvb3AgYm9keVxuXHRcdC8vIGluIGEgYGlmIChjaGlsZFZOb2RlKSB7IC4uLiB9IGNvbmRpdGlvblxuXHRcdGlmIChjaGlsZFZOb2RlID09IG51bGwpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNoaWxkVk5vZGUuX3BhcmVudCA9IG5ld1BhcmVudFZOb2RlO1xuXHRcdGNoaWxkVk5vZGUuX2RlcHRoID0gbmV3UGFyZW50Vk5vZGUuX2RlcHRoICsgMTtcblxuXHRcdC8vIENoZWNrIGlmIHdlIGZpbmQgYSBjb3JyZXNwb25kaW5nIGVsZW1lbnQgaW4gb2xkQ2hpbGRyZW4uXG5cdFx0Ly8gSWYgZm91bmQsIGRlbGV0ZSB0aGUgYXJyYXkgaXRlbSBieSBzZXR0aW5nIHRvIGB1bmRlZmluZWRgLlxuXHRcdC8vIFdlIHVzZSBgdW5kZWZpbmVkYCwgYXMgYG51bGxgIGlzIHJlc2VydmVkIGZvciBlbXB0eSBwbGFjZWhvbGRlcnNcblx0XHQvLyAoaG9sZXMpLlxuXHRcdG9sZFZOb2RlID0gb2xkQ2hpbGRyZW5baV07XG5cblx0XHRpZiAoXG5cdFx0XHRvbGRWTm9kZSA9PT0gbnVsbCB8fFxuXHRcdFx0KG9sZFZOb2RlICYmXG5cdFx0XHRcdGNoaWxkVk5vZGUua2V5ID09IG9sZFZOb2RlLmtleSAmJlxuXHRcdFx0XHRjaGlsZFZOb2RlLnR5cGUgPT09IG9sZFZOb2RlLnR5cGUpXG5cdFx0KSB7XG5cdFx0XHRvbGRDaGlsZHJlbltpXSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRWl0aGVyIG9sZFZOb2RlID09PSB1bmRlZmluZWQgb3Igb2xkQ2hpbGRyZW5MZW5ndGggPiAwLFxuXHRcdFx0Ly8gc28gYWZ0ZXIgdGhpcyBsb29wIG9sZFZOb2RlID09IG51bGwgb3Igb2xkVk5vZGUgaXMgYSB2YWxpZCB2YWx1ZS5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBvbGRDaGlsZHJlbkxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdG9sZFZOb2RlID0gb2xkQ2hpbGRyZW5bal07XG5cdFx0XHRcdC8vIElmIGNoaWxkVk5vZGUgaXMgdW5rZXllZCwgd2Ugb25seSBtYXRjaCBzaW1pbGFybHkgdW5rZXllZCBub2Rlcywgb3RoZXJ3aXNlIHdlIG1hdGNoIGJ5IGtleS5cblx0XHRcdFx0Ly8gV2UgYWx3YXlzIG1hdGNoIGJ5IHR5cGUgKGluIGVpdGhlciBjYXNlKS5cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdG9sZFZOb2RlICYmXG5cdFx0XHRcdFx0Y2hpbGRWTm9kZS5rZXkgPT0gb2xkVk5vZGUua2V5ICYmXG5cdFx0XHRcdFx0Y2hpbGRWTm9kZS50eXBlID09PSBvbGRWTm9kZS50eXBlXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdG9sZENoaWxkcmVuW2pdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG9sZFZOb2RlID0gbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRvbGRWTm9kZSA9IG9sZFZOb2RlIHx8IEVNUFRZX09CSjtcblxuXHRcdC8vIE1vcnBoIHRoZSBvbGQgZWxlbWVudCBpbnRvIHRoZSBuZXcgb25lLCBidXQgZG9uJ3QgYXBwZW5kIGl0IHRvIHRoZSBkb20geWV0XG5cdFx0ZGlmZihcblx0XHRcdHBhcmVudERvbSxcblx0XHRcdGNoaWxkVk5vZGUsXG5cdFx0XHRvbGRWTm9kZSxcblx0XHRcdGdsb2JhbENvbnRleHQsXG5cdFx0XHRpc1N2Zyxcblx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuLFxuXHRcdFx0Y29tbWl0UXVldWUsXG5cdFx0XHRvbGREb20sXG5cdFx0XHRpc0h5ZHJhdGluZ1xuXHRcdCk7XG5cblx0XHRuZXdEb20gPSBjaGlsZFZOb2RlLl9kb207XG5cblx0XHRpZiAoKGogPSBjaGlsZFZOb2RlLnJlZikgJiYgb2xkVk5vZGUucmVmICE9IGopIHtcblx0XHRcdGlmICghcmVmcykgcmVmcyA9IFtdO1xuXHRcdFx0aWYgKG9sZFZOb2RlLnJlZikgcmVmcy5wdXNoKG9sZFZOb2RlLnJlZiwgbnVsbCwgY2hpbGRWTm9kZSk7XG5cdFx0XHRyZWZzLnB1c2goaiwgY2hpbGRWTm9kZS5fY29tcG9uZW50IHx8IG5ld0RvbSwgY2hpbGRWTm9kZSk7XG5cdFx0fVxuXG5cdFx0aWYgKG5ld0RvbSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoZmlyc3RDaGlsZERvbSA9PSBudWxsKSB7XG5cdFx0XHRcdGZpcnN0Q2hpbGREb20gPSBuZXdEb207XG5cdFx0XHR9XG5cblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIGNoaWxkVk5vZGUudHlwZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRcdGNoaWxkVk5vZGUuX2NoaWxkcmVuICE9IG51bGwgJiYgLy8gQ2FuIGJlIG51bGwgaWYgY2hpbGRWTm9kZSBzdXNwZW5kZWRcblx0XHRcdFx0Y2hpbGRWTm9kZS5fY2hpbGRyZW4gPT09IG9sZFZOb2RlLl9jaGlsZHJlblxuXHRcdFx0KSB7XG5cdFx0XHRcdGNoaWxkVk5vZGUuX25leHREb20gPSBvbGREb20gPSByZW9yZGVyQ2hpbGRyZW4oXG5cdFx0XHRcdFx0Y2hpbGRWTm9kZSxcblx0XHRcdFx0XHRvbGREb20sXG5cdFx0XHRcdFx0cGFyZW50RG9tXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvbGREb20gPSBwbGFjZUNoaWxkKFxuXHRcdFx0XHRcdHBhcmVudERvbSxcblx0XHRcdFx0XHRjaGlsZFZOb2RlLFxuXHRcdFx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0XHRcdG9sZENoaWxkcmVuLFxuXHRcdFx0XHRcdG5ld0RvbSxcblx0XHRcdFx0XHRvbGREb21cblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnJvd3NlcnMgd2lsbCBpbmZlciBhbiBvcHRpb24ncyBgdmFsdWVgIGZyb20gYHRleHRDb250ZW50YCB3aGVuXG5cdFx0XHQvLyBubyB2YWx1ZSBpcyBwcmVzZW50LiBUaGlzIGVzc2VudGlhbGx5IGJ5cGFzc2VzIG91ciBjb2RlIHRvIHNldCBpdFxuXHRcdFx0Ly8gbGF0ZXIgaW4gYGRpZmYoKWAuIEl0IHdvcmtzIGZpbmUgaW4gYWxsIGJyb3dzZXJzIGV4Y2VwdCBmb3IgSUUxMVxuXHRcdFx0Ly8gd2hlcmUgaXQgYnJlYWtzIHNldHRpbmcgYHNlbGVjdC52YWx1ZWAuIFRoZXJlIGl0IHdpbGwgYmUgYWx3YXlzIHNldFxuXHRcdFx0Ly8gdG8gYW4gZW1wdHkgc3RyaW5nLiBSZS1hcHBseWluZyBhbiBvcHRpb25zIHZhbHVlIHdpbGwgZml4IHRoYXQsIHNvXG5cdFx0XHQvLyB0aGVyZSBhcmUgcHJvYmFibHkgc29tZSBpbnRlcm5hbCBkYXRhIHN0cnVjdHVyZXMgdGhhdCBhcmVuJ3Rcblx0XHRcdC8vIHVwZGF0ZWQgcHJvcGVybHkuXG5cdFx0XHQvL1xuXHRcdFx0Ly8gVG8gZml4IGl0IHdlIG1ha2Ugc3VyZSB0byByZXNldCB0aGUgaW5mZXJyZWQgdmFsdWUsIHNvIHRoYXQgb3VyIG93blxuXHRcdFx0Ly8gdmFsdWUgY2hlY2sgaW4gYGRpZmYoKWAgd29uJ3QgYmUgc2tpcHBlZC5cblx0XHRcdGlmICghaXNIeWRyYXRpbmcgJiYgbmV3UGFyZW50Vk5vZGUudHlwZSA9PT0gJ29wdGlvbicpIHtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZSBXZSBoYXZlIHZhbGlkYXRlZCB0aGF0IHRoZSB0eXBlIG9mIHBhcmVudERPTSBpcyAnb3B0aW9uJ1xuXHRcdFx0XHQvLyBpbiB0aGUgYWJvdmUgY2hlY2tcblx0XHRcdFx0cGFyZW50RG9tLnZhbHVlID0gJyc7XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBuZXdQYXJlbnRWTm9kZS50eXBlID09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Ly8gQmVjYXVzZSB0aGUgbmV3UGFyZW50Vk5vZGUgaXMgRnJhZ21lbnQtbGlrZSwgd2UgbmVlZCB0byBzZXQgaXQnc1xuXHRcdFx0XHQvLyBfbmV4dERvbSBwcm9wZXJ0eSB0byB0aGUgbmV4dFNpYmxpbmcgb2YgaXRzIGxhc3QgY2hpbGQgRE9NIG5vZGUuXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIGBvbGREb21gIGNvbnRhaW5zIHRoZSBjb3JyZWN0IHZhbHVlIGhlcmUgYmVjYXVzZSBpZiB0aGUgbGFzdCBjaGlsZFxuXHRcdFx0XHQvLyBpcyBhIEZyYWdtZW50LWxpa2UsIHRoZW4gb2xkRG9tIGhhcyBhbHJlYWR5IGJlZW4gc2V0IHRvIHRoYXQgY2hpbGQncyBfbmV4dERvbS5cblx0XHRcdFx0Ly8gSWYgdGhlIGxhc3QgY2hpbGQgaXMgYSBET00gVk5vZGUsIHRoZW4gb2xkRG9tIHdpbGwgYmUgc2V0IHRvIHRoYXQgRE9NXG5cdFx0XHRcdC8vIG5vZGUncyBuZXh0U2libGluZy5cblx0XHRcdFx0bmV3UGFyZW50Vk5vZGUuX25leHREb20gPSBvbGREb207XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdG9sZERvbSAmJlxuXHRcdFx0b2xkVk5vZGUuX2RvbSA9PSBvbGREb20gJiZcblx0XHRcdG9sZERvbS5wYXJlbnROb2RlICE9IHBhcmVudERvbVxuXHRcdCkge1xuXHRcdFx0Ly8gVGhlIGFib3ZlIGNvbmRpdGlvbiBpcyB0byBoYW5kbGUgbnVsbCBwbGFjZWhvbGRlcnMuIFNlZSB0ZXN0IGluIHBsYWNlaG9sZGVyLnRlc3QuanM6XG5cdFx0XHQvLyBgZWZmaWNpZW50bHkgcmVwbGFjZSBudWxsIHBsYWNlaG9sZGVycyBpbiBwYXJlbnQgcmVyZW5kZXJzYFxuXHRcdFx0b2xkRG9tID0gZ2V0RG9tU2libGluZyhvbGRWTm9kZSk7XG5cdFx0fVxuXHR9XG5cblx0bmV3UGFyZW50Vk5vZGUuX2RvbSA9IGZpcnN0Q2hpbGREb207XG5cblx0Ly8gUmVtb3ZlIHJlbWFpbmluZyBvbGRDaGlsZHJlbiBpZiB0aGVyZSBhcmUgYW55LlxuXHRmb3IgKGkgPSBvbGRDaGlsZHJlbkxlbmd0aDsgaS0tOyApIHtcblx0XHRpZiAob2xkQ2hpbGRyZW5baV0gIT0gbnVsbCkge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2YgbmV3UGFyZW50Vk5vZGUudHlwZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0XHRcdG9sZENoaWxkcmVuW2ldLl9kb20gIT0gbnVsbCAmJlxuXHRcdFx0XHRvbGRDaGlsZHJlbltpXS5fZG9tID09IG5ld1BhcmVudFZOb2RlLl9uZXh0RG9tXG5cdFx0XHQpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIG5ld1BhcmVudFZOb2RlLl9fbmV4dERvbSBwb2ludHMgdG8gYSBkb20gbm9kZSB0aGF0IGlzIGFib3V0IHRvXG5cdFx0XHRcdC8vIGJlIHVubW91bnRlZCwgdGhlbiBnZXQgdGhlIG5leHQgc2libGluZyBvZiB0aGF0IHZub2RlIGFuZCBzZXRcblx0XHRcdFx0Ly8gX25leHREb20gdG8gaXRcblx0XHRcdFx0bmV3UGFyZW50Vk5vZGUuX25leHREb20gPSBnZXREb21TaWJsaW5nKG9sZFBhcmVudFZOb2RlLCBpICsgMSk7XG5cdFx0XHR9XG5cblx0XHRcdHVubW91bnQob2xkQ2hpbGRyZW5baV0sIG9sZENoaWxkcmVuW2ldKTtcblx0XHR9XG5cdH1cblxuXHQvLyBTZXQgcmVmcyBvbmx5IGFmdGVyIHVubW91bnRcblx0aWYgKHJlZnMpIHtcblx0XHRmb3IgKGkgPSAwOyBpIDwgcmVmcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0YXBwbHlSZWYocmVmc1tpXSwgcmVmc1srK2ldLCByZWZzWysraV0pO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiByZW9yZGVyQ2hpbGRyZW4oY2hpbGRWTm9kZSwgb2xkRG9tLCBwYXJlbnREb20pIHtcblx0Zm9yIChsZXQgdG1wID0gMDsgdG1wIDwgY2hpbGRWTm9kZS5fY2hpbGRyZW4ubGVuZ3RoOyB0bXArKykge1xuXHRcdGxldCB2bm9kZSA9IGNoaWxkVk5vZGUuX2NoaWxkcmVuW3RtcF07XG5cdFx0aWYgKHZub2RlKSB7XG5cdFx0XHQvLyBXZSB0eXBpY2FsbHkgZW50ZXIgdGhpcyBjb2RlIHBhdGggb24gc0NVIGJhaWxvdXQsIHdoZXJlIHdlIGNvcHlcblx0XHRcdC8vIG9sZFZOb2RlLl9jaGlsZHJlbiB0byBuZXdWTm9kZS5fY2hpbGRyZW4uIElmIHRoYXQgaXMgdGhlIGNhc2UsIHdlIG5lZWRcblx0XHRcdC8vIHRvIHVwZGF0ZSB0aGUgb2xkIGNoaWxkcmVuJ3MgX3BhcmVudCBwb2ludGVyIHRvIHBvaW50IHRvIHRoZSBuZXdWTm9kZVxuXHRcdFx0Ly8gKGNoaWxkVk5vZGUgaGVyZSkuXG5cdFx0XHR2bm9kZS5fcGFyZW50ID0gY2hpbGRWTm9kZTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2bm9kZS50eXBlID09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0b2xkRG9tID0gcmVvcmRlckNoaWxkcmVuKHZub2RlLCBvbGREb20sIHBhcmVudERvbSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvbGREb20gPSBwbGFjZUNoaWxkKFxuXHRcdFx0XHRcdHBhcmVudERvbSxcblx0XHRcdFx0XHR2bm9kZSxcblx0XHRcdFx0XHR2bm9kZSxcblx0XHRcdFx0XHRjaGlsZFZOb2RlLl9jaGlsZHJlbixcblx0XHRcdFx0XHR2bm9kZS5fZG9tLFxuXHRcdFx0XHRcdG9sZERvbVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvbGREb207XG59XG5cbi8qKlxuICogRmxhdHRlbiBhbmQgbG9vcCB0aHJvdWdoIHRoZSBjaGlsZHJlbiBvZiBhIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2luZGV4JykuQ29tcG9uZW50Q2hpbGRyZW59IGNoaWxkcmVuIFRoZSB1bmZsYXR0ZW5lZFxuICogY2hpbGRyZW4gb2YgYSB2aXJ0dWFsIG5vZGVcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGVbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2hpbGRBcnJheShjaGlsZHJlbiwgb3V0KSB7XG5cdG91dCA9IG91dCB8fCBbXTtcblx0aWYgKGNoaWxkcmVuID09IG51bGwgfHwgdHlwZW9mIGNoaWxkcmVuID09ICdib29sZWFuJykge1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG5cdFx0Y2hpbGRyZW4uc29tZShjaGlsZCA9PiB7XG5cdFx0XHR0b0NoaWxkQXJyYXkoY2hpbGQsIG91dCk7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0b3V0LnB1c2goY2hpbGRyZW4pO1xuXHR9XG5cdHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIHBsYWNlQ2hpbGQoXG5cdHBhcmVudERvbSxcblx0Y2hpbGRWTm9kZSxcblx0b2xkVk5vZGUsXG5cdG9sZENoaWxkcmVuLFxuXHRuZXdEb20sXG5cdG9sZERvbVxuKSB7XG5cdGxldCBuZXh0RG9tO1xuXHRpZiAoY2hpbGRWTm9kZS5fbmV4dERvbSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gT25seSBGcmFnbWVudHMgb3IgY29tcG9uZW50cyB0aGF0IHJldHVybiBGcmFnbWVudCBsaWtlIFZOb2RlcyB3aWxsXG5cdFx0Ly8gaGF2ZSBhIG5vbi11bmRlZmluZWQgX25leHREb20uIENvbnRpbnVlIHRoZSBkaWZmIGZyb20gdGhlIHNpYmxpbmdcblx0XHQvLyBvZiBsYXN0IERPTSBjaGlsZCBvZiB0aGlzIGNoaWxkIFZOb2RlXG5cdFx0bmV4dERvbSA9IGNoaWxkVk5vZGUuX25leHREb207XG5cblx0XHQvLyBFYWdlcmx5IGNsZWFudXAgX25leHREb20uIFdlIGRvbid0IG5lZWQgdG8gcGVyc2lzdCB0aGUgdmFsdWUgYmVjYXVzZVxuXHRcdC8vIGl0IGlzIG9ubHkgdXNlZCBieSBgZGlmZkNoaWxkcmVuYCB0byBkZXRlcm1pbmUgd2hlcmUgdG8gcmVzdW1lIHRoZSBkaWZmIGFmdGVyXG5cdFx0Ly8gZGlmZmluZyBDb21wb25lbnRzIGFuZCBGcmFnbWVudHMuIE9uY2Ugd2Ugc3RvcmUgaXQgdGhlIG5leHRET00gbG9jYWwgdmFyLCB3ZVxuXHRcdC8vIGNhbiBjbGVhbiB1cCB0aGUgcHJvcGVydHlcblx0XHRjaGlsZFZOb2RlLl9uZXh0RG9tID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKFxuXHRcdG9sZFZOb2RlID09IG51bGwgfHxcblx0XHRuZXdEb20gIT0gb2xkRG9tIHx8XG5cdFx0bmV3RG9tLnBhcmVudE5vZGUgPT0gbnVsbFxuXHQpIHtcblx0XHRvdXRlcjogaWYgKG9sZERvbSA9PSBudWxsIHx8IG9sZERvbS5wYXJlbnROb2RlICE9PSBwYXJlbnREb20pIHtcblx0XHRcdHBhcmVudERvbS5hcHBlbmRDaGlsZChuZXdEb20pO1xuXHRcdFx0bmV4dERvbSA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGBqPG9sZENoaWxkcmVuTGVuZ3RoOyBqKz0yYCBpcyBhbiBhbHRlcm5hdGl2ZSB0byBgaisrPG9sZENoaWxkcmVuTGVuZ3RoLzJgXG5cdFx0XHRmb3IgKFxuXHRcdFx0XHRsZXQgc2liRG9tID0gb2xkRG9tLCBqID0gMDtcblx0XHRcdFx0KHNpYkRvbSA9IHNpYkRvbS5uZXh0U2libGluZykgJiYgaiA8IG9sZENoaWxkcmVuLmxlbmd0aDtcblx0XHRcdFx0aiArPSAyXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKHNpYkRvbSA9PSBuZXdEb20pIHtcblx0XHRcdFx0XHRicmVhayBvdXRlcjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cGFyZW50RG9tLmluc2VydEJlZm9yZShuZXdEb20sIG9sZERvbSk7XG5cdFx0XHRuZXh0RG9tID0gb2xkRG9tO1xuXHRcdH1cblx0fVxuXG5cdC8vIElmIHdlIGhhdmUgcHJlLWNhbGN1bGF0ZWQgdGhlIG5leHRET00gbm9kZSwgdXNlIGl0LiBFbHNlIGNhbGN1bGF0ZSBpdCBub3dcblx0Ly8gU3RyaWN0bHkgY2hlY2sgZm9yIGB1bmRlZmluZWRgIGhlcmUgY3V6IGBudWxsYCBpcyBhIHZhbGlkIHZhbHVlIG9mIGBuZXh0RG9tYC5cblx0Ly8gU2VlIG1vcmUgZGV0YWlsIGluIGNyZWF0ZS1lbGVtZW50LmpzOmNyZWF0ZVZOb2RlXG5cdGlmIChuZXh0RG9tICE9PSB1bmRlZmluZWQpIHtcblx0XHRvbGREb20gPSBuZXh0RG9tO1xuXHR9IGVsc2Uge1xuXHRcdG9sZERvbSA9IG5ld0RvbS5uZXh0U2libGluZztcblx0fVxuXG5cdHJldHVybiBvbGREb207XG59XG4iLCJpbXBvcnQgeyBJU19OT05fRElNRU5TSU9OQUwgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucyc7XG5cbi8qKlxuICogRGlmZiB0aGUgb2xkIGFuZCBuZXcgcHJvcGVydGllcyBvZiBhIFZOb2RlIGFuZCBhcHBseSBjaGFuZ2VzIHRvIHRoZSBET00gbm9kZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuUHJlYWN0RWxlbWVudH0gZG9tIFRoZSBET00gbm9kZSB0byBhcHBseVxuICogY2hhbmdlcyB0b1xuICogQHBhcmFtIHtvYmplY3R9IG5ld1Byb3BzIFRoZSBuZXcgcHJvcHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvbGRQcm9wcyBUaGUgb2xkIHByb3BzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzU3ZnIFdoZXRoZXIgb3Igbm90IHRoaXMgbm9kZSBpcyBhbiBTVkcgbm9kZVxuICogQHBhcmFtIHtib29sZWFufSBoeWRyYXRlIFdoZXRoZXIgb3Igbm90IHdlIGFyZSBpbiBoeWRyYXRpb24gbW9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlmZlByb3BzKGRvbSwgbmV3UHJvcHMsIG9sZFByb3BzLCBpc1N2ZywgaHlkcmF0ZSkge1xuXHRsZXQgaTtcblxuXHRmb3IgKGkgaW4gb2xkUHJvcHMpIHtcblx0XHRpZiAoaSAhPT0gJ2NoaWxkcmVuJyAmJiBpICE9PSAna2V5JyAmJiAhKGkgaW4gbmV3UHJvcHMpKSB7XG5cdFx0XHRzZXRQcm9wZXJ0eShkb20sIGksIG51bGwsIG9sZFByb3BzW2ldLCBpc1N2Zyk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yIChpIGluIG5ld1Byb3BzKSB7XG5cdFx0aWYgKFxuXHRcdFx0KCFoeWRyYXRlIHx8IHR5cGVvZiBuZXdQcm9wc1tpXSA9PSAnZnVuY3Rpb24nKSAmJlxuXHRcdFx0aSAhPT0gJ2NoaWxkcmVuJyAmJlxuXHRcdFx0aSAhPT0gJ2tleScgJiZcblx0XHRcdGkgIT09ICd2YWx1ZScgJiZcblx0XHRcdGkgIT09ICdjaGVja2VkJyAmJlxuXHRcdFx0b2xkUHJvcHNbaV0gIT09IG5ld1Byb3BzW2ldXG5cdFx0KSB7XG5cdFx0XHRzZXRQcm9wZXJ0eShkb20sIGksIG5ld1Byb3BzW2ldLCBvbGRQcm9wc1tpXSwgaXNTdmcpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBzZXRTdHlsZShzdHlsZSwga2V5LCB2YWx1ZSkge1xuXHRpZiAoa2V5WzBdID09PSAnLScpIHtcblx0XHRzdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlKTtcblx0fSBlbHNlIGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0c3R5bGVba2V5XSA9ICcnO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnbnVtYmVyJyB8fCBJU19OT05fRElNRU5TSU9OQUwudGVzdChrZXkpKSB7XG5cdFx0c3R5bGVba2V5XSA9IHZhbHVlO1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlW2tleV0gPSB2YWx1ZSArICdweCc7XG5cdH1cbn1cblxuLyoqXG4gKiBTZXQgYSBwcm9wZXJ0eSB2YWx1ZSBvbiBhIERPTSBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBkb20gVGhlIERPTSBub2RlIHRvIG1vZGlmeVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIHNldFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0IHRoZSBwcm9wZXJ0eSB0b1xuICogQHBhcmFtIHsqfSBvbGRWYWx1ZSBUaGUgb2xkIHZhbHVlIHRoZSBwcm9wZXJ0eSBoYWRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdmcgV2hldGhlciBvciBub3QgdGhpcyBET00gbm9kZSBpcyBhbiBTVkcgbm9kZSBvciBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFByb3BlcnR5KGRvbSwgbmFtZSwgdmFsdWUsIG9sZFZhbHVlLCBpc1N2Zykge1xuXHRsZXQgdXNlQ2FwdHVyZTtcblxuXHRvOiBpZiAobmFtZSA9PT0gJ3N0eWxlJykge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcblx0XHRcdGRvbS5zdHlsZS5jc3NUZXh0ID0gdmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0eXBlb2Ygb2xkVmFsdWUgPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0ZG9tLnN0eWxlLmNzc1RleHQgPSBvbGRWYWx1ZSA9ICcnO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob2xkVmFsdWUpIHtcblx0XHRcdFx0Zm9yIChuYW1lIGluIG9sZFZhbHVlKSB7XG5cdFx0XHRcdFx0aWYgKCEodmFsdWUgJiYgbmFtZSBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdHNldFN0eWxlKGRvbS5zdHlsZSwgbmFtZSwgJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodmFsdWUpIHtcblx0XHRcdFx0Zm9yIChuYW1lIGluIHZhbHVlKSB7XG5cdFx0XHRcdFx0aWYgKCFvbGRWYWx1ZSB8fCB2YWx1ZVtuYW1lXSAhPT0gb2xkVmFsdWVbbmFtZV0pIHtcblx0XHRcdFx0XHRcdHNldFN0eWxlKGRvbS5zdHlsZSwgbmFtZSwgdmFsdWVbbmFtZV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQvLyBCZW5jaG1hcmsgZm9yIGNvbXBhcmlzb246IGh0dHBzOi8vZXNiZW5jaC5jb20vYmVuY2gvNTc0Yzk1NGJkYjk2NWI5YTAwOTY1YWM2XG5cdGVsc2UgaWYgKG5hbWVbMF0gPT09ICdvJyAmJiBuYW1lWzFdID09PSAnbicpIHtcblx0XHR1c2VDYXB0dXJlID0gbmFtZSAhPT0gKG5hbWUgPSBuYW1lLnJlcGxhY2UoL0NhcHR1cmUkLywgJycpKTtcblxuXHRcdC8vIEluZmVyIGNvcnJlY3QgY2FzaW5nIGZvciBET00gYnVpbHQtaW4gZXZlbnRzOlxuXHRcdGlmIChuYW1lLnRvTG93ZXJDYXNlKCkgaW4gZG9tKSBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpLnNsaWNlKDIpO1xuXHRcdGVsc2UgbmFtZSA9IG5hbWUuc2xpY2UoMik7XG5cblx0XHRpZiAoIWRvbS5fbGlzdGVuZXJzKSBkb20uX2xpc3RlbmVycyA9IHt9O1xuXHRcdGRvbS5fbGlzdGVuZXJzW25hbWUgKyB1c2VDYXB0dXJlXSA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZiAoIW9sZFZhbHVlKSB7XG5cdFx0XHRcdGNvbnN0IGhhbmRsZXIgPSB1c2VDYXB0dXJlID8gZXZlbnRQcm94eUNhcHR1cmUgOiBldmVudFByb3h5O1xuXHRcdFx0XHRkb20uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyLCB1c2VDYXB0dXJlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgaGFuZGxlciA9IHVzZUNhcHR1cmUgPyBldmVudFByb3h5Q2FwdHVyZSA6IGV2ZW50UHJveHk7XG5cdFx0XHRkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyLCB1c2VDYXB0dXJlKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobmFtZSAhPT0gJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJykge1xuXHRcdGlmIChpc1N2Zykge1xuXHRcdFx0Ly8gTm9ybWFsaXplIGluY29ycmVjdCBwcm9wIHVzYWdlIGZvciBTVkc6XG5cdFx0XHQvLyAtIHhsaW5rOmhyZWYgLyB4bGlua0hyZWYgLS0+IGhyZWYgKHhsaW5rOmhyZWYgd2FzIHJlbW92ZWQgZnJvbSBTVkcgYW5kIGlzbid0IG5lZWRlZClcblx0XHRcdC8vIC0gY2xhc3NOYW1lIC0tPiBjbGFzc1xuXHRcdFx0bmFtZSA9IG5hbWUucmVwbGFjZSgveGxpbmtbSDpoXS8sICdoJykucmVwbGFjZSgvc05hbWUkLywgJ3MnKTtcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0bmFtZSAhPT0gJ2hyZWYnICYmXG5cdFx0XHRuYW1lICE9PSAnbGlzdCcgJiZcblx0XHRcdG5hbWUgIT09ICdmb3JtJyAmJlxuXHRcdFx0Ly8gRGVmYXVsdCB2YWx1ZSBpbiBicm93c2VycyBpcyBgLTFgIGFuZCBhbiBlbXB0eSBzdHJpbmcgaXNcblx0XHRcdC8vIGNhc3QgdG8gYDBgIGluc3RlYWRcblx0XHRcdG5hbWUgIT09ICd0YWJJbmRleCcgJiZcblx0XHRcdG5hbWUgIT09ICdkb3dubG9hZCcgJiZcblx0XHRcdG5hbWUgaW4gZG9tXG5cdFx0KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRkb21bbmFtZV0gPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcblx0XHRcdFx0Ly8gbGFiZWxsZWQgYnJlYWsgaXMgMWIgc21hbGxlciBoZXJlIHRoYW4gYSByZXR1cm4gc3RhdGVtZW50IChzb3JyeSlcblx0XHRcdFx0YnJlYWsgbztcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXG5cdFx0Ly8gQVJJQS1hdHRyaWJ1dGVzIGhhdmUgYSBkaWZmZXJlbnQgbm90aW9uIG9mIGJvb2xlYW4gdmFsdWVzLlxuXHRcdC8vIFRoZSB2YWx1ZSBgZmFsc2VgIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBhdHRyaWJ1dGUgbm90XG5cdFx0Ly8gZXhpc3Rpbmcgb24gdGhlIERPTSwgc28gd2UgY2FuJ3QgcmVtb3ZlIGl0LiBGb3Igbm9uLWJvb2xlYW5cblx0XHQvLyBBUklBLWF0dHJpYnV0ZXMgd2UgY291bGQgdHJlYXQgZmFsc2UgYXMgYSByZW1vdmFsLCBidXQgdGhlXG5cdFx0Ly8gYW1vdW50IG9mIGV4Y2VwdGlvbnMgd291bGQgY29zdCB1cyB0b28gbWFueSBieXRlcy4gT24gdG9wIG9mXG5cdFx0Ly8gdGhhdCBvdGhlciBWRE9NIGZyYW1ld29ya3MgYWxzbyBhbHdheXMgc3RyaW5naWZ5IGBmYWxzZWAuXG5cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvLyBuZXZlciBzZXJpYWxpemUgZnVuY3Rpb25zIGFzIGF0dHJpYnV0ZSB2YWx1ZXNcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0dmFsdWUgIT0gbnVsbCAmJlxuXHRcdFx0KHZhbHVlICE9PSBmYWxzZSB8fCAobmFtZVswXSA9PT0gJ2EnICYmIG5hbWVbMV0gPT09ICdyJykpXG5cdFx0KSB7XG5cdFx0XHRkb20uc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZG9tLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBQcm94eSBhbiBldmVudCB0byBob29rZWQgZXZlbnQgaGFuZGxlcnNcbiAqIEBwYXJhbSB7RXZlbnR9IGUgVGhlIGV2ZW50IG9iamVjdCBmcm9tIHRoZSBicm93c2VyXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBldmVudFByb3h5KGUpIHtcblx0dGhpcy5fbGlzdGVuZXJzW2UudHlwZSArIGZhbHNlXShvcHRpb25zLmV2ZW50ID8gb3B0aW9ucy5ldmVudChlKSA6IGUpO1xufVxuXG5mdW5jdGlvbiBldmVudFByb3h5Q2FwdHVyZShlKSB7XG5cdHRoaXMuX2xpc3RlbmVyc1tlLnR5cGUgKyB0cnVlXShvcHRpb25zLmV2ZW50ID8gb3B0aW9ucy5ldmVudChlKSA6IGUpO1xufVxuIiwiaW1wb3J0IHsgRU1QVFlfT0JKLCBFTVBUWV9BUlIgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50JztcbmltcG9ydCB7IEZyYWdtZW50IH0gZnJvbSAnLi4vY3JlYXRlLWVsZW1lbnQnO1xuaW1wb3J0IHsgZGlmZkNoaWxkcmVuIH0gZnJvbSAnLi9jaGlsZHJlbic7XG5pbXBvcnQgeyBkaWZmUHJvcHMsIHNldFByb3BlcnR5IH0gZnJvbSAnLi9wcm9wcyc7XG5pbXBvcnQgeyBhc3NpZ24sIHJlbW92ZU5vZGUgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4uL29wdGlvbnMnO1xuXG4vKipcbiAqIERpZmYgdHdvIHZpcnR1YWwgbm9kZXMgYW5kIGFwcGx5IHByb3BlciBjaGFuZ2VzIHRvIHRoZSBET01cbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IHBhcmVudERvbSBUaGUgcGFyZW50IG9mIHRoZSBET00gZWxlbWVudFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IG5ld1ZOb2RlIFRoZSBuZXcgdmlydHVhbCBub2RlXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gb2xkVk5vZGUgVGhlIG9sZCB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBnbG9iYWxDb250ZXh0IFRoZSBjdXJyZW50IGNvbnRleHQgb2JqZWN0LiBNb2RpZmllZCBieSBnZXRDaGlsZENvbnRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdmcgV2hldGhlciBvciBub3QgdGhpcyBlbGVtZW50IGlzIGFuIFNWRyBub2RlXG4gKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50Pn0gZXhjZXNzRG9tQ2hpbGRyZW5cbiAqIEBwYXJhbSB7QXJyYXk8aW1wb3J0KCcuLi9pbnRlcm5hbCcpLkNvbXBvbmVudD59IGNvbW1pdFF1ZXVlIExpc3Qgb2YgY29tcG9uZW50c1xuICogd2hpY2ggaGF2ZSBjYWxsYmFja3MgdG8gaW52b2tlIGluIGNvbW1pdFJvb3RcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IG9sZERvbSBUaGUgY3VycmVudCBhdHRhY2hlZCBET01cbiAqIGVsZW1lbnQgYW55IG5ldyBkb20gZWxlbWVudHMgc2hvdWxkIGJlIHBsYWNlZCBhcm91bmQuIExpa2VseSBgbnVsbGAgb24gZmlyc3RcbiAqIHJlbmRlciAoZXhjZXB0IHdoZW4gaHlkcmF0aW5nKS4gQ2FuIGJlIGEgc2libGluZyBET00gZWxlbWVudCB3aGVuIGRpZmZpbmdcbiAqIEZyYWdtZW50cyB0aGF0IGhhdmUgc2libGluZ3MuIEluIG1vc3QgY2FzZXMsIGl0IHN0YXJ0cyBvdXQgYXMgYG9sZENoaWxkcmVuWzBdLl9kb21gLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNIeWRyYXRpbmddIFdoZXRoZXIgb3Igbm90IHdlIGFyZSBpbiBoeWRyYXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmYoXG5cdHBhcmVudERvbSxcblx0bmV3Vk5vZGUsXG5cdG9sZFZOb2RlLFxuXHRnbG9iYWxDb250ZXh0LFxuXHRpc1N2Zyxcblx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdGNvbW1pdFF1ZXVlLFxuXHRvbGREb20sXG5cdGlzSHlkcmF0aW5nXG4pIHtcblx0bGV0IHRtcCxcblx0XHRuZXdUeXBlID0gbmV3Vk5vZGUudHlwZTtcblxuXHQvLyBXaGVuIHBhc3NpbmcgdGhyb3VnaCBjcmVhdGVFbGVtZW50IGl0IGFzc2lnbnMgdGhlIG9iamVjdFxuXHQvLyBjb25zdHJ1Y3RvciBhcyB1bmRlZmluZWQuIFRoaXMgdG8gcHJldmVudCBKU09OLWluamVjdGlvbi5cblx0aWYgKG5ld1ZOb2RlLmNvbnN0cnVjdG9yICE9PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuXG5cdC8vIElmIHRoZSBwcmV2aW91cyBkaWZmIGJhaWxlZCBvdXQsIHJlc3VtZSBjcmVhdGluZy9oeWRyYXRpbmcuXG5cdGlmIChvbGRWTm9kZS5faHlkcmF0aW5nICE9IG51bGwpIHtcblx0XHRpc0h5ZHJhdGluZyA9IG9sZFZOb2RlLl9oeWRyYXRpbmc7XG5cdFx0b2xkRG9tID0gbmV3Vk5vZGUuX2RvbSA9IG9sZFZOb2RlLl9kb207XG5cdFx0Ly8gaWYgd2UgcmVzdW1lLCB3ZSB3YW50IHRoZSB0cmVlIHRvIGJlIFwidW5sb2NrZWRcIlxuXHRcdG5ld1ZOb2RlLl9oeWRyYXRpbmcgPSBudWxsO1xuXHRcdGV4Y2Vzc0RvbUNoaWxkcmVuID0gW29sZERvbV07XG5cdH1cblxuXHRpZiAoKHRtcCA9IG9wdGlvbnMuX2RpZmYpKSB0bXAobmV3Vk5vZGUpO1xuXG5cdHRyeSB7XG5cdFx0b3V0ZXI6IGlmICh0eXBlb2YgbmV3VHlwZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRsZXQgYywgaXNOZXcsIG9sZFByb3BzLCBvbGRTdGF0ZSwgc25hcHNob3QsIGNsZWFyUHJvY2Vzc2luZ0V4Y2VwdGlvbjtcblx0XHRcdGxldCBuZXdQcm9wcyA9IG5ld1ZOb2RlLnByb3BzO1xuXG5cdFx0XHQvLyBOZWNlc3NhcnkgZm9yIGNyZWF0ZUNvbnRleHQgYXBpLiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgd2lsbCBwYXNzXG5cdFx0XHQvLyB0aGUgY29udGV4dCB2YWx1ZSBhcyBgdGhpcy5jb250ZXh0YCBqdXN0IGZvciB0aGlzIGNvbXBvbmVudC5cblx0XHRcdHRtcCA9IG5ld1R5cGUuY29udGV4dFR5cGU7XG5cdFx0XHRsZXQgcHJvdmlkZXIgPSB0bXAgJiYgZ2xvYmFsQ29udGV4dFt0bXAuX2lkXTtcblx0XHRcdGxldCBjb21wb25lbnRDb250ZXh0ID0gdG1wXG5cdFx0XHRcdD8gcHJvdmlkZXJcblx0XHRcdFx0XHQ/IHByb3ZpZGVyLnByb3BzLnZhbHVlXG5cdFx0XHRcdFx0OiB0bXAuX2RlZmF1bHRWYWx1ZVxuXHRcdFx0XHQ6IGdsb2JhbENvbnRleHQ7XG5cblx0XHRcdC8vIEdldCBjb21wb25lbnQgYW5kIHNldCBpdCB0byBgY2Bcblx0XHRcdGlmIChvbGRWTm9kZS5fY29tcG9uZW50KSB7XG5cdFx0XHRcdGMgPSBuZXdWTm9kZS5fY29tcG9uZW50ID0gb2xkVk5vZGUuX2NvbXBvbmVudDtcblx0XHRcdFx0Y2xlYXJQcm9jZXNzaW5nRXhjZXB0aW9uID0gYy5fcHJvY2Vzc2luZ0V4Y2VwdGlvbiA9IGMuX3BlbmRpbmdFcnJvcjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEluc3RhbnRpYXRlIHRoZSBuZXcgY29tcG9uZW50XG5cdFx0XHRcdGlmICgncHJvdG90eXBlJyBpbiBuZXdUeXBlICYmIG5ld1R5cGUucHJvdG90eXBlLnJlbmRlcikge1xuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmUgVGhlIGNoZWNrIGFib3ZlIHZlcmlmaWVzIHRoYXQgbmV3VHlwZSBpcyBzdXBwb3NlIHRvIGJlIGNvbnN0cnVjdGVkXG5cdFx0XHRcdFx0bmV3Vk5vZGUuX2NvbXBvbmVudCA9IGMgPSBuZXcgbmV3VHlwZShuZXdQcm9wcywgY29tcG9uZW50Q29udGV4dCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbmV3LWNhcFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmUgVHJ1c3QgbWUsIENvbXBvbmVudCBpbXBsZW1lbnRzIHRoZSBpbnRlcmZhY2Ugd2Ugd2FudFxuXHRcdFx0XHRcdG5ld1ZOb2RlLl9jb21wb25lbnQgPSBjID0gbmV3IENvbXBvbmVudChuZXdQcm9wcywgY29tcG9uZW50Q29udGV4dCk7XG5cdFx0XHRcdFx0Yy5jb25zdHJ1Y3RvciA9IG5ld1R5cGU7XG5cdFx0XHRcdFx0Yy5yZW5kZXIgPSBkb1JlbmRlcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocHJvdmlkZXIpIHByb3ZpZGVyLnN1YihjKTtcblxuXHRcdFx0XHRjLnByb3BzID0gbmV3UHJvcHM7XG5cdFx0XHRcdGlmICghYy5zdGF0ZSkgYy5zdGF0ZSA9IHt9O1xuXHRcdFx0XHRjLmNvbnRleHQgPSBjb21wb25lbnRDb250ZXh0O1xuXHRcdFx0XHRjLl9nbG9iYWxDb250ZXh0ID0gZ2xvYmFsQ29udGV4dDtcblx0XHRcdFx0aXNOZXcgPSBjLl9kaXJ0eSA9IHRydWU7XG5cdFx0XHRcdGMuX3JlbmRlckNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbnZva2UgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzXG5cdFx0XHRpZiAoYy5fbmV4dFN0YXRlID09IG51bGwpIHtcblx0XHRcdFx0Yy5fbmV4dFN0YXRlID0gYy5zdGF0ZTtcblx0XHRcdH1cblx0XHRcdGlmIChuZXdUeXBlLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyAhPSBudWxsKSB7XG5cdFx0XHRcdGlmIChjLl9uZXh0U3RhdGUgPT0gYy5zdGF0ZSkge1xuXHRcdFx0XHRcdGMuX25leHRTdGF0ZSA9IGFzc2lnbih7fSwgYy5fbmV4dFN0YXRlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFzc2lnbihcblx0XHRcdFx0XHRjLl9uZXh0U3RhdGUsXG5cdFx0XHRcdFx0bmV3VHlwZS5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV3UHJvcHMsIGMuX25leHRTdGF0ZSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0b2xkUHJvcHMgPSBjLnByb3BzO1xuXHRcdFx0b2xkU3RhdGUgPSBjLnN0YXRlO1xuXG5cdFx0XHQvLyBJbnZva2UgcHJlLXJlbmRlciBsaWZlY3ljbGUgbWV0aG9kc1xuXHRcdFx0aWYgKGlzTmV3KSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRuZXdUeXBlLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9PSBudWxsICYmXG5cdFx0XHRcdFx0Yy5jb21wb25lbnRXaWxsTW91bnQgIT0gbnVsbFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjLmNvbXBvbmVudFdpbGxNb3VudCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGMuY29tcG9uZW50RGlkTW91bnQgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKGMuY29tcG9uZW50RGlkTW91bnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0bmV3VHlwZS5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPT0gbnVsbCAmJlxuXHRcdFx0XHRcdG5ld1Byb3BzICE9PSBvbGRQcm9wcyAmJlxuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAhPSBudWxsXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcywgY29tcG9uZW50Q29udGV4dCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0KCFjLl9mb3JjZSAmJlxuXHRcdFx0XHRcdFx0Yy5zaG91bGRDb21wb25lbnRVcGRhdGUgIT0gbnVsbCAmJlxuXHRcdFx0XHRcdFx0Yy5zaG91bGRDb21wb25lbnRVcGRhdGUoXG5cdFx0XHRcdFx0XHRcdG5ld1Byb3BzLFxuXHRcdFx0XHRcdFx0XHRjLl9uZXh0U3RhdGUsXG5cdFx0XHRcdFx0XHRcdGNvbXBvbmVudENvbnRleHRcblx0XHRcdFx0XHRcdCkgPT09IGZhbHNlKSB8fFxuXHRcdFx0XHRcdG5ld1ZOb2RlLl9vcmlnaW5hbCA9PT0gb2xkVk5vZGUuX29yaWdpbmFsXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGMucHJvcHMgPSBuZXdQcm9wcztcblx0XHRcdFx0XHRjLnN0YXRlID0gYy5fbmV4dFN0YXRlO1xuXHRcdFx0XHRcdC8vIE1vcmUgaW5mbyBhYm91dCB0aGlzIGhlcmU6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL0pvdmlEZUNyb29jay9iZWM1ZjJjZTkzNTQ0ZDJlNjA3MGVmOGUwMDM2ZTRlOFxuXHRcdFx0XHRcdGlmIChuZXdWTm9kZS5fb3JpZ2luYWwgIT09IG9sZFZOb2RlLl9vcmlnaW5hbCkgYy5fZGlydHkgPSBmYWxzZTtcblx0XHRcdFx0XHRjLl92bm9kZSA9IG5ld1ZOb2RlO1xuXHRcdFx0XHRcdG5ld1ZOb2RlLl9kb20gPSBvbGRWTm9kZS5fZG9tO1xuXHRcdFx0XHRcdG5ld1ZOb2RlLl9jaGlsZHJlbiA9IG9sZFZOb2RlLl9jaGlsZHJlbjtcblx0XHRcdFx0XHRuZXdWTm9kZS5fY2hpbGRyZW4uZm9yRWFjaCh2bm9kZSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAodm5vZGUpIHZub2RlLl9wYXJlbnQgPSBuZXdWTm9kZTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRpZiAoYy5fcmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0Y29tbWl0UXVldWUucHVzaChjKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhayBvdXRlcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjLmNvbXBvbmVudFdpbGxVcGRhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGMuY29tcG9uZW50V2lsbFVwZGF0ZShuZXdQcm9wcywgYy5fbmV4dFN0YXRlLCBjb21wb25lbnRDb250ZXh0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjLmNvbXBvbmVudERpZFVwZGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0Yy5fcmVuZGVyQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0XHRcdFx0Yy5jb21wb25lbnREaWRVcGRhdGUob2xkUHJvcHMsIG9sZFN0YXRlLCBzbmFwc2hvdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Yy5jb250ZXh0ID0gY29tcG9uZW50Q29udGV4dDtcblx0XHRcdGMucHJvcHMgPSBuZXdQcm9wcztcblx0XHRcdGMuc3RhdGUgPSBjLl9uZXh0U3RhdGU7XG5cblx0XHRcdGlmICgodG1wID0gb3B0aW9ucy5fcmVuZGVyKSkgdG1wKG5ld1ZOb2RlKTtcblxuXHRcdFx0Yy5fZGlydHkgPSBmYWxzZTtcblx0XHRcdGMuX3Zub2RlID0gbmV3Vk5vZGU7XG5cdFx0XHRjLl9wYXJlbnREb20gPSBwYXJlbnREb207XG5cblx0XHRcdHRtcCA9IGMucmVuZGVyKGMucHJvcHMsIGMuc3RhdGUsIGMuY29udGV4dCk7XG5cblx0XHRcdC8vIEhhbmRsZSBzZXRTdGF0ZSBjYWxsZWQgaW4gcmVuZGVyLCBzZWUgIzI1NTNcblx0XHRcdGMuc3RhdGUgPSBjLl9uZXh0U3RhdGU7XG5cblx0XHRcdGlmIChjLmdldENoaWxkQ29udGV4dCAhPSBudWxsKSB7XG5cdFx0XHRcdGdsb2JhbENvbnRleHQgPSBhc3NpZ24oYXNzaWduKHt9LCBnbG9iYWxDb250ZXh0KSwgYy5nZXRDaGlsZENvbnRleHQoKSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghaXNOZXcgJiYgYy5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRcdHNuYXBzaG90ID0gYy5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZShvbGRQcm9wcywgb2xkU3RhdGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgaXNUb3BMZXZlbEZyYWdtZW50ID1cblx0XHRcdFx0dG1wICE9IG51bGwgJiYgdG1wLnR5cGUgPT09IEZyYWdtZW50ICYmIHRtcC5rZXkgPT0gbnVsbDtcblx0XHRcdGxldCByZW5kZXJSZXN1bHQgPSBpc1RvcExldmVsRnJhZ21lbnQgPyB0bXAucHJvcHMuY2hpbGRyZW4gOiB0bXA7XG5cblx0XHRcdGRpZmZDaGlsZHJlbihcblx0XHRcdFx0cGFyZW50RG9tLFxuXHRcdFx0XHRBcnJheS5pc0FycmF5KHJlbmRlclJlc3VsdCkgPyByZW5kZXJSZXN1bHQgOiBbcmVuZGVyUmVzdWx0XSxcblx0XHRcdFx0bmV3Vk5vZGUsXG5cdFx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0XHRnbG9iYWxDb250ZXh0LFxuXHRcdFx0XHRpc1N2Zyxcblx0XHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdFx0XHRcdGNvbW1pdFF1ZXVlLFxuXHRcdFx0XHRvbGREb20sXG5cdFx0XHRcdGlzSHlkcmF0aW5nXG5cdFx0XHQpO1xuXG5cdFx0XHRjLmJhc2UgPSBuZXdWTm9kZS5fZG9tO1xuXG5cdFx0XHQvLyBXZSBzdWNjZXNzZnVsbHkgcmVuZGVyZWQgdGhpcyBWTm9kZSwgdW5zZXQgYW55IHN0b3JlZCBoeWRyYXRpb24vYmFpbG91dCBzdGF0ZTpcblx0XHRcdG5ld1ZOb2RlLl9oeWRyYXRpbmcgPSBudWxsO1xuXG5cdFx0XHRpZiAoYy5fcmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRjb21taXRRdWV1ZS5wdXNoKGMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2xlYXJQcm9jZXNzaW5nRXhjZXB0aW9uKSB7XG5cdFx0XHRcdGMuX3BlbmRpbmdFcnJvciA9IGMuX3Byb2Nlc3NpbmdFeGNlcHRpb24gPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRjLl9mb3JjZSA9IGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRleGNlc3NEb21DaGlsZHJlbiA9PSBudWxsICYmXG5cdFx0XHRuZXdWTm9kZS5fb3JpZ2luYWwgPT09IG9sZFZOb2RlLl9vcmlnaW5hbFxuXHRcdCkge1xuXHRcdFx0bmV3Vk5vZGUuX2NoaWxkcmVuID0gb2xkVk5vZGUuX2NoaWxkcmVuO1xuXHRcdFx0bmV3Vk5vZGUuX2RvbSA9IG9sZFZOb2RlLl9kb207XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5ld1ZOb2RlLl9kb20gPSBkaWZmRWxlbWVudE5vZGVzKFxuXHRcdFx0XHRvbGRWTm9kZS5fZG9tLFxuXHRcdFx0XHRuZXdWTm9kZSxcblx0XHRcdFx0b2xkVk5vZGUsXG5cdFx0XHRcdGdsb2JhbENvbnRleHQsXG5cdFx0XHRcdGlzU3ZnLFxuXHRcdFx0XHRleGNlc3NEb21DaGlsZHJlbixcblx0XHRcdFx0Y29tbWl0UXVldWUsXG5cdFx0XHRcdGlzSHlkcmF0aW5nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICgodG1wID0gb3B0aW9ucy5kaWZmZWQpKSB0bXAobmV3Vk5vZGUpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0bmV3Vk5vZGUuX29yaWdpbmFsID0gbnVsbDtcblx0XHQvLyBpZiBoeWRyYXRpbmcgb3IgY3JlYXRpbmcgaW5pdGlhbCB0cmVlLCBiYWlsb3V0IHByZXNlcnZlcyBET006XG5cdFx0aWYgKGlzSHlkcmF0aW5nIHx8IGV4Y2Vzc0RvbUNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdG5ld1ZOb2RlLl9kb20gPSBvbGREb207XG5cdFx0XHRuZXdWTm9kZS5faHlkcmF0aW5nID0gISFpc0h5ZHJhdGluZztcblx0XHRcdGV4Y2Vzc0RvbUNoaWxkcmVuW2V4Y2Vzc0RvbUNoaWxkcmVuLmluZGV4T2Yob2xkRG9tKV0gPSBudWxsO1xuXHRcdFx0Ly8gXiBjb3VsZCBwb3NzaWJseSBiZSBzaW1wbGlmaWVkIHRvOlxuXHRcdFx0Ly8gZXhjZXNzRG9tQ2hpbGRyZW4ubGVuZ3RoID0gMDtcblx0XHR9XG5cdFx0b3B0aW9ucy5fY2F0Y2hFcnJvcihlLCBuZXdWTm9kZSwgb2xkVk5vZGUpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2ludGVybmFsJykuQ29tcG9uZW50Pn0gY29tbWl0UXVldWUgTGlzdCBvZiBjb21wb25lbnRzXG4gKiB3aGljaCBoYXZlIGNhbGxiYWNrcyB0byBpbnZva2UgaW4gY29tbWl0Um9vdFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IHJvb3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1pdFJvb3QoY29tbWl0UXVldWUsIHJvb3QpIHtcblx0aWYgKG9wdGlvbnMuX2NvbW1pdCkgb3B0aW9ucy5fY29tbWl0KHJvb3QsIGNvbW1pdFF1ZXVlKTtcblxuXHRjb21taXRRdWV1ZS5zb21lKGMgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBAdHMtaWdub3JlIFJldXNlIHRoZSBjb21taXRRdWV1ZSB2YXJpYWJsZSBoZXJlIHNvIHRoZSB0eXBlIGNoYW5nZXNcblx0XHRcdGNvbW1pdFF1ZXVlID0gYy5fcmVuZGVyQ2FsbGJhY2tzO1xuXHRcdFx0Yy5fcmVuZGVyQ2FsbGJhY2tzID0gW107XG5cdFx0XHRjb21taXRRdWV1ZS5zb21lKGNiID0+IHtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZSBTZWUgYWJvdmUgdHMtaWdub3JlIG9uIGNvbW1pdFF1ZXVlXG5cdFx0XHRcdGNiLmNhbGwoYyk7XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIGMuX3Zub2RlKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vKipcbiAqIERpZmYgdHdvIHZpcnR1YWwgbm9kZXMgcmVwcmVzZW50aW5nIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBkb20gVGhlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZ1xuICogdGhlIHZpcnR1YWwgbm9kZXMgYmVpbmcgZGlmZmVkXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5WTm9kZX0gbmV3Vk5vZGUgVGhlIG5ldyB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSBvbGRWTm9kZSBUaGUgb2xkIHZpcnR1YWwgbm9kZVxuICogQHBhcmFtIHtvYmplY3R9IGdsb2JhbENvbnRleHQgVGhlIGN1cnJlbnQgY29udGV4dCBvYmplY3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTdmcgV2hldGhlciBvciBub3QgdGhpcyBET00gbm9kZSBpcyBhbiBTVkcgbm9kZVxuICogQHBhcmFtIHsqfSBleGNlc3NEb21DaGlsZHJlblxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2ludGVybmFsJykuQ29tcG9uZW50Pn0gY29tbWl0UXVldWUgTGlzdCBvZiBjb21wb25lbnRzXG4gKiB3aGljaCBoYXZlIGNhbGxiYWNrcyB0byBpbnZva2UgaW4gY29tbWl0Um9vdFxuICogQHBhcmFtIHtib29sZWFufSBpc0h5ZHJhdGluZyBXaGV0aGVyIG9yIG5vdCB3ZSBhcmUgaW4gaHlkcmF0aW9uXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGRpZmZFbGVtZW50Tm9kZXMoXG5cdGRvbSxcblx0bmV3Vk5vZGUsXG5cdG9sZFZOb2RlLFxuXHRnbG9iYWxDb250ZXh0LFxuXHRpc1N2Zyxcblx0ZXhjZXNzRG9tQ2hpbGRyZW4sXG5cdGNvbW1pdFF1ZXVlLFxuXHRpc0h5ZHJhdGluZ1xuKSB7XG5cdGxldCBvbGRQcm9wcyA9IG9sZFZOb2RlLnByb3BzO1xuXHRsZXQgbmV3UHJvcHMgPSBuZXdWTm9kZS5wcm9wcztcblx0bGV0IG5vZGVUeXBlID0gbmV3Vk5vZGUudHlwZTtcblx0bGV0IGkgPSAwO1xuXG5cdC8vIFRyYWNrcyBlbnRlcmluZyBhbmQgZXhpdGluZyBTVkcgbmFtZXNwYWNlIHdoZW4gZGVzY2VuZGluZyB0aHJvdWdoIHRoZSB0cmVlLlxuXHRpZiAobm9kZVR5cGUgPT09ICdzdmcnKSBpc1N2ZyA9IHRydWU7XG5cblx0aWYgKGV4Y2Vzc0RvbUNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRmb3IgKDsgaSA8IGV4Y2Vzc0RvbUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBjaGlsZCA9IGV4Y2Vzc0RvbUNoaWxkcmVuW2ldO1xuXG5cdFx0XHQvLyBpZiBuZXdWTm9kZSBtYXRjaGVzIGFuIGVsZW1lbnQgaW4gZXhjZXNzRG9tQ2hpbGRyZW4gb3IgdGhlIGBkb21gXG5cdFx0XHQvLyBhcmd1bWVudCBtYXRjaGVzIGFuIGVsZW1lbnQgaW4gZXhjZXNzRG9tQ2hpbGRyZW4sIHJlbW92ZSBpdCBmcm9tXG5cdFx0XHQvLyBleGNlc3NEb21DaGlsZHJlbiBzbyBpdCBpc24ndCBsYXRlciByZW1vdmVkIGluIGRpZmZDaGlsZHJlblxuXHRcdFx0aWYgKFxuXHRcdFx0XHRjaGlsZCAmJlxuXHRcdFx0XHQoY2hpbGQgPT09IGRvbSB8fFxuXHRcdFx0XHRcdChub2RlVHlwZSA/IGNoaWxkLmxvY2FsTmFtZSA9PSBub2RlVHlwZSA6IGNoaWxkLm5vZGVUeXBlID09IDMpKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGRvbSA9IGNoaWxkO1xuXHRcdFx0XHRleGNlc3NEb21DaGlsZHJlbltpXSA9IG51bGw7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmIChkb20gPT0gbnVsbCkge1xuXHRcdGlmIChub2RlVHlwZSA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZSBjcmVhdGVUZXh0Tm9kZSByZXR1cm5zIFRleHQsIHdlIGV4cGVjdCBQcmVhY3RFbGVtZW50XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobmV3UHJvcHMpO1xuXHRcdH1cblxuXHRcdGlmIChpc1N2Zykge1xuXHRcdFx0ZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuXHRcdFx0XHQnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuXHRcdFx0XHQvLyBAdHMtaWdub3JlIFdlIGtub3cgYG5ld1ZOb2RlLnR5cGVgIGlzIGEgc3RyaW5nXG5cdFx0XHRcdG5vZGVUeXBlXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQvLyBAdHMtaWdub3JlIFdlIGtub3cgYG5ld1ZOb2RlLnR5cGVgIGlzIGEgc3RyaW5nXG5cdFx0XHRcdG5vZGVUeXBlLFxuXHRcdFx0XHRuZXdQcm9wcy5pcyAmJiBuZXdQcm9wc1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvLyB3ZSBjcmVhdGVkIGEgbmV3IHBhcmVudCwgc28gbm9uZSBvZiB0aGUgcHJldmlvdXNseSBhdHRhY2hlZCBjaGlsZHJlbiBjYW4gYmUgcmV1c2VkOlxuXHRcdGV4Y2Vzc0RvbUNoaWxkcmVuID0gbnVsbDtcblx0XHQvLyB3ZSBhcmUgY3JlYXRpbmcgYSBuZXcgbm9kZSwgc28gd2UgY2FuIGFzc3VtZSB0aGlzIGlzIGEgbmV3IHN1YnRyZWUgKGluIGNhc2Ugd2UgYXJlIGh5ZHJhdGluZyksIHRoaXMgZGVvcHRzIHRoZSBoeWRyYXRlXG5cdFx0aXNIeWRyYXRpbmcgPSBmYWxzZTtcblx0fVxuXG5cdGlmIChub2RlVHlwZSA9PT0gbnVsbCkge1xuXHRcdC8vIER1cmluZyBoeWRyYXRpb24sIHdlIHN0aWxsIGhhdmUgdG8gc3BsaXQgbWVyZ2VkIHRleHQgZnJvbSBTU1InZCBIVE1MLlxuXHRcdGlmIChvbGRQcm9wcyAhPT0gbmV3UHJvcHMgJiYgKCFpc0h5ZHJhdGluZyB8fCBkb20uZGF0YSAhPT0gbmV3UHJvcHMpKSB7XG5cdFx0XHRkb20uZGF0YSA9IG5ld1Byb3BzO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBJZiBleGNlc3NEb21DaGlsZHJlbiB3YXMgbm90IG51bGwsIHJlcG9wdWxhdGUgaXQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50J3MgY2hpbGRyZW46XG5cdFx0ZXhjZXNzRG9tQ2hpbGRyZW4gPVxuXHRcdFx0ZXhjZXNzRG9tQ2hpbGRyZW4gJiYgRU1QVFlfQVJSLnNsaWNlLmNhbGwoZG9tLmNoaWxkTm9kZXMpO1xuXG5cdFx0b2xkUHJvcHMgPSBvbGRWTm9kZS5wcm9wcyB8fCBFTVBUWV9PQko7XG5cblx0XHRsZXQgb2xkSHRtbCA9IG9sZFByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MO1xuXHRcdGxldCBuZXdIdG1sID0gbmV3UHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw7XG5cblx0XHQvLyBEdXJpbmcgaHlkcmF0aW9uLCBwcm9wcyBhcmUgbm90IGRpZmZlZCBhdCBhbGwgKGluY2x1ZGluZyBkYW5nZXJvdXNseVNldElubmVySFRNTClcblx0XHQvLyBAVE9ETyB3ZSBzaG91bGQgd2FybiBpbiBkZWJ1ZyBtb2RlIHdoZW4gcHJvcHMgZG9uJ3QgbWF0Y2ggaGVyZS5cblx0XHRpZiAoIWlzSHlkcmF0aW5nKSB7XG5cdFx0XHQvLyBCdXQsIGlmIHdlIGFyZSBpbiBhIHNpdHVhdGlvbiB3aGVyZSB3ZSBhcmUgdXNpbmcgZXhpc3RpbmcgRE9NIChlLmcuIHJlcGxhY2VOb2RlKVxuXHRcdFx0Ly8gd2Ugc2hvdWxkIHJlYWQgdGhlIGV4aXN0aW5nIERPTSBhdHRyaWJ1dGVzIHRvIGRpZmYgdGhlbVxuXHRcdFx0aWYgKGV4Y2Vzc0RvbUNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdFx0b2xkUHJvcHMgPSB7fTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkb20uYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdG9sZFByb3BzW2RvbS5hdHRyaWJ1dGVzW2ldLm5hbWVdID0gZG9tLmF0dHJpYnV0ZXNbaV0udmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG5ld0h0bWwgfHwgb2xkSHRtbCkge1xuXHRcdFx0XHQvLyBBdm9pZCByZS1hcHBseWluZyB0aGUgc2FtZSAnX19odG1sJyBpZiBpdCBkaWQgbm90IGNoYW5nZWQgYmV0d2VlbiByZS1yZW5kZXJcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCFuZXdIdG1sIHx8XG5cdFx0XHRcdFx0KCghb2xkSHRtbCB8fCBuZXdIdG1sLl9faHRtbCAhPSBvbGRIdG1sLl9faHRtbCkgJiZcblx0XHRcdFx0XHRcdG5ld0h0bWwuX19odG1sICE9PSBkb20uaW5uZXJIVE1MKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRkb20uaW5uZXJIVE1MID0gKG5ld0h0bWwgJiYgbmV3SHRtbC5fX2h0bWwpIHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZGlmZlByb3BzKGRvbSwgbmV3UHJvcHMsIG9sZFByb3BzLCBpc1N2ZywgaXNIeWRyYXRpbmcpO1xuXG5cdFx0Ly8gSWYgdGhlIG5ldyB2bm9kZSBkaWRuJ3QgaGF2ZSBkYW5nZXJvdXNseVNldElubmVySFRNTCwgZGlmZiBpdHMgY2hpbGRyZW5cblx0XHRpZiAobmV3SHRtbCkge1xuXHRcdFx0bmV3Vk5vZGUuX2NoaWxkcmVuID0gW107XG5cdFx0fSBlbHNlIHtcblx0XHRcdGkgPSBuZXdWTm9kZS5wcm9wcy5jaGlsZHJlbjtcblx0XHRcdGRpZmZDaGlsZHJlbihcblx0XHRcdFx0ZG9tLFxuXHRcdFx0XHRBcnJheS5pc0FycmF5KGkpID8gaSA6IFtpXSxcblx0XHRcdFx0bmV3Vk5vZGUsXG5cdFx0XHRcdG9sZFZOb2RlLFxuXHRcdFx0XHRnbG9iYWxDb250ZXh0LFxuXHRcdFx0XHRpc1N2ZyAmJiBub2RlVHlwZSAhPT0gJ2ZvcmVpZ25PYmplY3QnLFxuXHRcdFx0XHRleGNlc3NEb21DaGlsZHJlbixcblx0XHRcdFx0Y29tbWl0UXVldWUsXG5cdFx0XHRcdGRvbS5maXJzdENoaWxkLFxuXHRcdFx0XHRpc0h5ZHJhdGluZ1xuXHRcdFx0KTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGNoaWxkcmVuIHRoYXQgYXJlIG5vdCBwYXJ0IG9mIGFueSB2bm9kZS5cblx0XHRcdGlmIChleGNlc3NEb21DaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRcdGZvciAoaSA9IGV4Y2Vzc0RvbUNoaWxkcmVuLmxlbmd0aDsgaS0tOyApIHtcblx0XHRcdFx0XHRpZiAoZXhjZXNzRG9tQ2hpbGRyZW5baV0gIT0gbnVsbCkgcmVtb3ZlTm9kZShleGNlc3NEb21DaGlsZHJlbltpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyAoYXMgYWJvdmUsIGRvbid0IGRpZmYgcHJvcHMgZHVyaW5nIGh5ZHJhdGlvbilcblx0XHRpZiAoIWlzSHlkcmF0aW5nKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCd2YWx1ZScgaW4gbmV3UHJvcHMgJiZcblx0XHRcdFx0KGkgPSBuZXdQcm9wcy52YWx1ZSkgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHQvLyAjMjc1NiBGb3IgdGhlIDxwcm9ncmVzcz4tZWxlbWVudCB0aGUgaW5pdGlhbCB2YWx1ZSBpcyAwLFxuXHRcdFx0XHQvLyBkZXNwaXRlIHRoZSBhdHRyaWJ1dGUgbm90IGJlaW5nIHByZXNlbnQuIFdoZW4gdGhlIGF0dHJpYnV0ZVxuXHRcdFx0XHQvLyBpcyBtaXNzaW5nIHRoZSBwcm9ncmVzcyBiYXIgaXMgdHJlYXRlZCBhcyBpbmRldGVybWluYXRlLlxuXHRcdFx0XHQvLyBUbyBmaXggdGhhdCB3ZSdsbCBhbHdheXMgdXBkYXRlIGl0IHdoZW4gaXQgaXMgMCBmb3IgcHJvZ3Jlc3MgZWxlbWVudHNcblx0XHRcdFx0KGkgIT09IGRvbS52YWx1ZSB8fCAobm9kZVR5cGUgPT09ICdwcm9ncmVzcycgJiYgIWkpKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNldFByb3BlcnR5KGRvbSwgJ3ZhbHVlJywgaSwgb2xkUHJvcHMudmFsdWUsIGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdGlmIChcblx0XHRcdFx0J2NoZWNrZWQnIGluIG5ld1Byb3BzICYmXG5cdFx0XHRcdChpID0gbmV3UHJvcHMuY2hlY2tlZCkgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRpICE9PSBkb20uY2hlY2tlZFxuXHRcdFx0KSB7XG5cdFx0XHRcdHNldFByb3BlcnR5KGRvbSwgJ2NoZWNrZWQnLCBpLCBvbGRQcm9wcy5jaGVja2VkLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRvbTtcbn1cblxuLyoqXG4gKiBJbnZva2Ugb3IgdXBkYXRlIGEgcmVmLCBkZXBlbmRpbmcgb24gd2hldGhlciBpdCBpcyBhIGZ1bmN0aW9uIG9yIG9iamVjdCByZWYuXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcmVmXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlSZWYocmVmLCB2YWx1ZSwgdm5vZGUpIHtcblx0dHJ5IHtcblx0XHRpZiAodHlwZW9mIHJlZiA9PSAnZnVuY3Rpb24nKSByZWYodmFsdWUpO1xuXHRcdGVsc2UgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgdm5vZGUpO1xuXHR9XG59XG5cbi8qKlxuICogVW5tb3VudCBhIHZpcnR1YWwgbm9kZSBmcm9tIHRoZSB0cmVlIGFuZCBhcHBseSBET00gY2hhbmdlc1xuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IHZub2RlIFRoZSB2aXJ0dWFsIG5vZGUgdG8gdW5tb3VudFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IHBhcmVudFZOb2RlIFRoZSBwYXJlbnQgb2YgdGhlIFZOb2RlIHRoYXRcbiAqIGluaXRpYXRlZCB0aGUgdW5tb3VudFxuICogQHBhcmFtIHtib29sZWFufSBbc2tpcFJlbW92ZV0gRmxhZyB0aGF0IGluZGljYXRlcyB0aGF0IGEgcGFyZW50IG5vZGUgb2YgdGhlXG4gKiBjdXJyZW50IGVsZW1lbnQgaXMgYWxyZWFkeSBkZXRhY2hlZCBmcm9tIHRoZSBET00uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bm1vdW50KHZub2RlLCBwYXJlbnRWTm9kZSwgc2tpcFJlbW92ZSkge1xuXHRsZXQgcjtcblx0aWYgKG9wdGlvbnMudW5tb3VudCkgb3B0aW9ucy51bm1vdW50KHZub2RlKTtcblxuXHRpZiAoKHIgPSB2bm9kZS5yZWYpKSB7XG5cdFx0aWYgKCFyLmN1cnJlbnQgfHwgci5jdXJyZW50ID09PSB2bm9kZS5fZG9tKSBhcHBseVJlZihyLCBudWxsLCBwYXJlbnRWTm9kZSk7XG5cdH1cblxuXHRsZXQgZG9tO1xuXHRpZiAoIXNraXBSZW1vdmUgJiYgdHlwZW9mIHZub2RlLnR5cGUgIT0gJ2Z1bmN0aW9uJykge1xuXHRcdHNraXBSZW1vdmUgPSAoZG9tID0gdm5vZGUuX2RvbSkgIT0gbnVsbDtcblx0fVxuXG5cdC8vIE11c3QgYmUgc2V0IHRvIGB1bmRlZmluZWRgIHRvIHByb3Blcmx5IGNsZWFuIHVwIGBfbmV4dERvbWBcblx0Ly8gZm9yIHdoaWNoIGBudWxsYCBpcyBhIHZhbGlkIHZhbHVlLiBTZWUgY29tbWVudCBpbiBgY3JlYXRlLWVsZW1lbnQuanNgXG5cdHZub2RlLl9kb20gPSB2bm9kZS5fbmV4dERvbSA9IHVuZGVmaW5lZDtcblxuXHRpZiAoKHIgPSB2bm9kZS5fY29tcG9uZW50KSAhPSBudWxsKSB7XG5cdFx0aWYgKHIuY29tcG9uZW50V2lsbFVubW91bnQpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHIuY29tcG9uZW50V2lsbFVubW91bnQoKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0b3B0aW9ucy5fY2F0Y2hFcnJvcihlLCBwYXJlbnRWTm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ci5iYXNlID0gci5fcGFyZW50RG9tID0gbnVsbDtcblx0fVxuXG5cdGlmICgociA9IHZub2RlLl9jaGlsZHJlbikpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChyW2ldKSB1bm1vdW50KHJbaV0sIHBhcmVudFZOb2RlLCBza2lwUmVtb3ZlKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoZG9tICE9IG51bGwpIHJlbW92ZU5vZGUoZG9tKTtcbn1cblxuLyoqIFRoZSBgLnJlbmRlcigpYCBtZXRob2QgZm9yIGEgUEZDIGJhY2tpbmcgaW5zdGFuY2UuICovXG5mdW5jdGlvbiBkb1JlbmRlcihwcm9wcywgc3RhdGUsIGNvbnRleHQpIHtcblx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpO1xufVxuIiwiaW1wb3J0IHsgRU1QVFlfT0JKLCBFTVBUWV9BUlIgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBjb21taXRSb290LCBkaWZmIH0gZnJvbSAnLi9kaWZmL2luZGV4JztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIEZyYWdtZW50IH0gZnJvbSAnLi9jcmVhdGUtZWxlbWVudCc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMnO1xuXG4vKipcbiAqIFJlbmRlciBhIFByZWFjdCB2aXJ0dWFsIG5vZGUgaW50byBhIERPTSBlbGVtZW50XG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLkNvbXBvbmVudENoaWxkfSB2bm9kZSBUaGUgdmlydHVhbCBub2RlIHRvIHJlbmRlclxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50fSBwYXJlbnREb20gVGhlIERPTSBlbGVtZW50IHRvXG4gKiByZW5kZXIgaW50b1xuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5QcmVhY3RFbGVtZW50IHwgb2JqZWN0fSBbcmVwbGFjZU5vZGVdIE9wdGlvbmFsOiBBdHRlbXB0IHRvIHJlLXVzZSBhblxuICogZXhpc3RpbmcgRE9NIHRyZWUgcm9vdGVkIGF0IGByZXBsYWNlTm9kZWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcih2bm9kZSwgcGFyZW50RG9tLCByZXBsYWNlTm9kZSkge1xuXHRpZiAob3B0aW9ucy5fcm9vdCkgb3B0aW9ucy5fcm9vdCh2bm9kZSwgcGFyZW50RG9tKTtcblxuXHQvLyBXZSBhYnVzZSB0aGUgYHJlcGxhY2VOb2RlYCBwYXJhbWV0ZXIgaW4gYGh5ZHJhdGUoKWAgdG8gc2lnbmFsIGlmIHdlIGFyZSBpblxuXHQvLyBoeWRyYXRpb24gbW9kZSBvciBub3QgYnkgcGFzc2luZyB0aGUgYGh5ZHJhdGVgIGZ1bmN0aW9uIGluc3RlYWQgb2YgYSBET01cblx0Ly8gZWxlbWVudC4uXG5cdGxldCBpc0h5ZHJhdGluZyA9IHR5cGVvZiByZXBsYWNlTm9kZSA9PT0gJ2Z1bmN0aW9uJztcblxuXHQvLyBUbyBiZSBhYmxlIHRvIHN1cHBvcnQgY2FsbGluZyBgcmVuZGVyKClgIG11bHRpcGxlIHRpbWVzIG9uIHRoZSBzYW1lXG5cdC8vIERPTSBub2RlLCB3ZSBuZWVkIHRvIG9idGFpbiBhIHJlZmVyZW5jZSB0byB0aGUgcHJldmlvdXMgdHJlZS4gV2UgZG9cblx0Ly8gdGhpcyBieSBhc3NpZ25pbmcgYSBuZXcgYF9jaGlsZHJlbmAgcHJvcGVydHkgdG8gRE9NIG5vZGVzIHdoaWNoIHBvaW50c1xuXHQvLyB0byB0aGUgbGFzdCByZW5kZXJlZCB0cmVlLiBCeSBkZWZhdWx0IHRoaXMgcHJvcGVydHkgaXMgbm90IHByZXNlbnQsIHdoaWNoXG5cdC8vIG1lYW5zIHRoYXQgd2UgYXJlIG1vdW50aW5nIGEgbmV3IHRyZWUgZm9yIHRoZSBmaXJzdCB0aW1lLlxuXHRsZXQgb2xkVk5vZGUgPSBpc0h5ZHJhdGluZ1xuXHRcdD8gbnVsbFxuXHRcdDogKHJlcGxhY2VOb2RlICYmIHJlcGxhY2VOb2RlLl9jaGlsZHJlbikgfHwgcGFyZW50RG9tLl9jaGlsZHJlbjtcblxuXHR2bm9kZSA9IChcblx0XHQoIWlzSHlkcmF0aW5nICYmIHJlcGxhY2VOb2RlKSB8fFxuXHRcdHBhcmVudERvbVxuXHQpLl9jaGlsZHJlbiA9IGNyZWF0ZUVsZW1lbnQoRnJhZ21lbnQsIG51bGwsIFt2bm9kZV0pO1xuXG5cdC8vIExpc3Qgb2YgZWZmZWN0cyB0aGF0IG5lZWQgdG8gYmUgY2FsbGVkIGFmdGVyIGRpZmZpbmcuXG5cdGxldCBjb21taXRRdWV1ZSA9IFtdO1xuXHRkaWZmKFxuXHRcdHBhcmVudERvbSxcblx0XHQvLyBEZXRlcm1pbmUgdGhlIG5ldyB2bm9kZSB0cmVlIGFuZCBzdG9yZSBpdCBvbiB0aGUgRE9NIGVsZW1lbnQgb25cblx0XHQvLyBvdXIgY3VzdG9tIGBfY2hpbGRyZW5gIHByb3BlcnR5LlxuXHRcdHZub2RlLFxuXHRcdG9sZFZOb2RlIHx8IEVNUFRZX09CSixcblx0XHRFTVBUWV9PQkosXG5cdFx0cGFyZW50RG9tLm93bmVyU1ZHRWxlbWVudCAhPT0gdW5kZWZpbmVkLFxuXHRcdCFpc0h5ZHJhdGluZyAmJiByZXBsYWNlTm9kZVxuXHRcdFx0PyBbcmVwbGFjZU5vZGVdXG5cdFx0XHQ6IG9sZFZOb2RlXG5cdFx0XHQ/IG51bGxcblx0XHRcdDogcGFyZW50RG9tLmZpcnN0Q2hpbGRcblx0XHRcdD8gRU1QVFlfQVJSLnNsaWNlLmNhbGwocGFyZW50RG9tLmNoaWxkTm9kZXMpXG5cdFx0XHQ6IG51bGwsXG5cdFx0Y29tbWl0UXVldWUsXG5cdFx0IWlzSHlkcmF0aW5nICYmIHJlcGxhY2VOb2RlXG5cdFx0XHQ/IHJlcGxhY2VOb2RlXG5cdFx0XHQ6IG9sZFZOb2RlXG5cdFx0XHQ/IG9sZFZOb2RlLl9kb21cblx0XHRcdDogcGFyZW50RG9tLmZpcnN0Q2hpbGQsXG5cdFx0aXNIeWRyYXRpbmdcblx0KTtcblxuXHQvLyBGbHVzaCBhbGwgcXVldWVkIGVmZmVjdHNcblx0Y29tbWl0Um9vdChjb21taXRRdWV1ZSwgdm5vZGUpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBhbiBleGlzdGluZyBET00gZWxlbWVudCB3aXRoIGRhdGEgZnJvbSBhIFByZWFjdCB2aXJ0dWFsIG5vZGVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50Q2hpbGR9IHZub2RlIFRoZSB2aXJ0dWFsIG5vZGUgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlByZWFjdEVsZW1lbnR9IHBhcmVudERvbSBUaGUgRE9NIGVsZW1lbnQgdG9cbiAqIHVwZGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0ZSh2bm9kZSwgcGFyZW50RG9tKSB7XG5cdHJlbmRlcih2bm9kZSwgcGFyZW50RG9tLCBoeWRyYXRlKTtcbn1cbiIsImltcG9ydCB7IGFzc2lnbiB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBjcmVhdGVWTm9kZSB9IGZyb20gJy4vY3JlYXRlLWVsZW1lbnQnO1xuXG4vKipcbiAqIENsb25lcyB0aGUgZ2l2ZW4gVk5vZGUsIG9wdGlvbmFsbHkgYWRkaW5nIGF0dHJpYnV0ZXMvcHJvcHMgYW5kIHJlcGxhY2luZyBpdHMgY2hpbGRyZW4uXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbnRlcm5hbCcpLlZOb2RlfSB2bm9kZSBUaGUgdmlydHVhbCBET00gZWxlbWVudCB0byBjbG9uZVxuICogQHBhcmFtIHtvYmplY3R9IHByb3BzIEF0dHJpYnV0ZXMvcHJvcHMgdG8gYWRkIHdoZW4gY2xvbmluZ1xuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnRDaGlsZHJlbj59IHJlc3QgQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIHdpbGwgYmUgdXNlZCBhcyByZXBsYWNlbWVudCBjaGlsZHJlbi5cbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5WTm9kZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb25lRWxlbWVudCh2bm9kZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG5cdGxldCBub3JtYWxpemVkUHJvcHMgPSBhc3NpZ24oe30sIHZub2RlLnByb3BzKSxcblx0XHRrZXksXG5cdFx0cmVmLFxuXHRcdGk7XG5cdGZvciAoaSBpbiBwcm9wcykge1xuXHRcdGlmIChpID09ICdrZXknKSBrZXkgPSBwcm9wc1tpXTtcblx0XHRlbHNlIGlmIChpID09ICdyZWYnKSByZWYgPSBwcm9wc1tpXTtcblx0XHRlbHNlIG5vcm1hbGl6ZWRQcm9wc1tpXSA9IHByb3BzW2ldO1xuXHR9XG5cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG5cdFx0Y2hpbGRyZW4gPSBbY2hpbGRyZW5dO1xuXHRcdGZvciAoaSA9IDM7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNoaWxkcmVuLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHR9XG5cdH1cblx0aWYgKGNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRub3JtYWxpemVkUHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcblx0fVxuXG5cdHJldHVybiBjcmVhdGVWTm9kZShcblx0XHR2bm9kZS50eXBlLFxuXHRcdG5vcm1hbGl6ZWRQcm9wcyxcblx0XHRrZXkgfHwgdm5vZGUua2V5LFxuXHRcdHJlZiB8fCB2bm9kZS5yZWYsXG5cdFx0bnVsbFxuXHQpO1xufVxuIiwiLyoqXG4gKiBGaW5kIHRoZSBjbG9zZXN0IGVycm9yIGJvdW5kYXJ5IHRvIGEgdGhyb3duIGVycm9yIGFuZCBjYWxsIGl0XG4gKiBAcGFyYW0ge29iamVjdH0gZXJyb3IgVGhlIHRocm93biB2YWx1ZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2ludGVybmFsJykuVk5vZGV9IHZub2RlIFRoZSB2bm9kZSB0aGF0IHRocmV3XG4gKiB0aGUgZXJyb3IgdGhhdCB3YXMgY2F1Z2h0IChleGNlcHQgZm9yIHVubW91bnRpbmcgd2hlbiB0aGlzIHBhcmFtZXRlclxuICogaXMgdGhlIGhpZ2hlc3QgcGFyZW50IHRoYXQgd2FzIGJlaW5nIHVubW91bnRlZClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jYXRjaEVycm9yKGVycm9yLCB2bm9kZSkge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi4vaW50ZXJuYWwnKS5Db21wb25lbnR9ICovXG5cdGxldCBjb21wb25lbnQsIGN0b3IsIGhhbmRsZWQ7XG5cblx0Zm9yICg7ICh2bm9kZSA9IHZub2RlLl9wYXJlbnQpOyApIHtcblx0XHRpZiAoKGNvbXBvbmVudCA9IHZub2RlLl9jb21wb25lbnQpICYmICFjb21wb25lbnQuX3Byb2Nlc3NpbmdFeGNlcHRpb24pIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGN0b3IgPSBjb21wb25lbnQuY29uc3RydWN0b3I7XG5cblx0XHRcdFx0aWYgKGN0b3IgJiYgY3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IgIT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbXBvbmVudC5zZXRTdGF0ZShjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihlcnJvcikpO1xuXHRcdFx0XHRcdGhhbmRsZWQgPSBjb21wb25lbnQuX2RpcnR5O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGNvbXBvbmVudC5jb21wb25lbnREaWRDYXRjaCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0Y29tcG9uZW50LmNvbXBvbmVudERpZENhdGNoKGVycm9yKTtcblx0XHRcdFx0XHRoYW5kbGVkID0gY29tcG9uZW50Ll9kaXJ0eTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRoaXMgaXMgYW4gZXJyb3IgYm91bmRhcnkuIE1hcmsgaXQgYXMgaGF2aW5nIGJhaWxlZCBvdXQsIGFuZCB3aGV0aGVyIGl0IHdhcyBtaWQtaHlkcmF0aW9uLlxuXHRcdFx0XHRpZiAoaGFuZGxlZCkge1xuXHRcdFx0XHRcdHJldHVybiAoY29tcG9uZW50Ll9wZW5kaW5nRXJyb3IgPSBjb21wb25lbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGVycm9yID0gZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aHJvdyBlcnJvcjtcbn1cbiIsImltcG9ydCB7IG9wdGlvbnMgfSBmcm9tICdwcmVhY3QnO1xuXG4vKiogQHR5cGUge251bWJlcn0gKi9cbmxldCBjdXJyZW50SW5kZXg7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fSAqL1xubGV0IGN1cnJlbnRDb21wb25lbnQ7XG4vKipcbiAqIEtlZXAgdHJhY2sgb2YgdGhlIHByZXZpb3VzIGNvbXBvbmVudCBzbyB0aGF0IHdlIGNhbiBzZXRcbiAqIGBjdXJyZW50Q29tcG9uZW50YCB0byBgbnVsbGAgYW5kIHRocm93IHdoZW4gYSBob29rIGlzIGludm9rZWRcbiAqIG91dHNpZGUgb2YgcmVuZGVyXG4gKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29tcG9uZW50fVxuICovXG5sZXQgcHJldmlvdXNDb21wb25lbnQ7XG5cbi8qKiBAdHlwZSB7bnVtYmVyfSAqL1xubGV0IGN1cnJlbnRIb29rID0gMDtcblxuLyoqIEB0eXBlIHtBcnJheTxpbXBvcnQoJy4vaW50ZXJuYWwnKS5Db21wb25lbnQ+fSAqL1xubGV0IGFmdGVyUGFpbnRFZmZlY3RzID0gW107XG5cbmxldCBvbGRCZWZvcmVEaWZmID0gb3B0aW9ucy5fZGlmZjtcbmxldCBvbGRCZWZvcmVSZW5kZXIgPSBvcHRpb25zLl9yZW5kZXI7XG5sZXQgb2xkQWZ0ZXJEaWZmID0gb3B0aW9ucy5kaWZmZWQ7XG5sZXQgb2xkQ29tbWl0ID0gb3B0aW9ucy5fY29tbWl0O1xubGV0IG9sZEJlZm9yZVVubW91bnQgPSBvcHRpb25zLnVubW91bnQ7XG5cbmNvbnN0IFJBRl9USU1FT1VUID0gMTAwO1xubGV0IHByZXZSYWY7XG5cbm9wdGlvbnMuX2RpZmYgPSB2bm9kZSA9PiB7XG5cdGN1cnJlbnRDb21wb25lbnQgPSBudWxsO1xuXHRpZiAob2xkQmVmb3JlRGlmZikgb2xkQmVmb3JlRGlmZih2bm9kZSk7XG59O1xuXG5vcHRpb25zLl9yZW5kZXIgPSB2bm9kZSA9PiB7XG5cdGlmIChvbGRCZWZvcmVSZW5kZXIpIG9sZEJlZm9yZVJlbmRlcih2bm9kZSk7XG5cblx0Y3VycmVudENvbXBvbmVudCA9IHZub2RlLl9jb21wb25lbnQ7XG5cdGN1cnJlbnRJbmRleCA9IDA7XG5cblx0Y29uc3QgaG9va3MgPSBjdXJyZW50Q29tcG9uZW50Ll9faG9va3M7XG5cdGlmIChob29rcykge1xuXHRcdGhvb2tzLl9wZW5kaW5nRWZmZWN0cy5mb3JFYWNoKGludm9rZUNsZWFudXApO1xuXHRcdGhvb2tzLl9wZW5kaW5nRWZmZWN0cy5mb3JFYWNoKGludm9rZUVmZmVjdCk7XG5cdFx0aG9va3MuX3BlbmRpbmdFZmZlY3RzID0gW107XG5cdH1cbn07XG5cbm9wdGlvbnMuZGlmZmVkID0gdm5vZGUgPT4ge1xuXHRpZiAob2xkQWZ0ZXJEaWZmKSBvbGRBZnRlckRpZmYodm5vZGUpO1xuXG5cdGNvbnN0IGMgPSB2bm9kZS5fY29tcG9uZW50O1xuXHRpZiAoYyAmJiBjLl9faG9va3MgJiYgYy5fX2hvb2tzLl9wZW5kaW5nRWZmZWN0cy5sZW5ndGgpIHtcblx0XHRhZnRlclBhaW50KGFmdGVyUGFpbnRFZmZlY3RzLnB1c2goYykpO1xuXHR9XG5cdGN1cnJlbnRDb21wb25lbnQgPSBwcmV2aW91c0NvbXBvbmVudDtcbn07XG5cbm9wdGlvbnMuX2NvbW1pdCA9ICh2bm9kZSwgY29tbWl0UXVldWUpID0+IHtcblx0Y29tbWl0UXVldWUuc29tZShjb21wb25lbnQgPT4ge1xuXHRcdHRyeSB7XG5cdFx0XHRjb21wb25lbnQuX3JlbmRlckNhbGxiYWNrcy5mb3JFYWNoKGludm9rZUNsZWFudXApO1xuXHRcdFx0Y29tcG9uZW50Ll9yZW5kZXJDYWxsYmFja3MgPSBjb21wb25lbnQuX3JlbmRlckNhbGxiYWNrcy5maWx0ZXIoY2IgPT5cblx0XHRcdFx0Y2IuX3ZhbHVlID8gaW52b2tlRWZmZWN0KGNiKSA6IHRydWVcblx0XHRcdCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29tbWl0UXVldWUuc29tZShjID0+IHtcblx0XHRcdFx0aWYgKGMuX3JlbmRlckNhbGxiYWNrcykgYy5fcmVuZGVyQ2FsbGJhY2tzID0gW107XG5cdFx0XHR9KTtcblx0XHRcdGNvbW1pdFF1ZXVlID0gW107XG5cdFx0XHRvcHRpb25zLl9jYXRjaEVycm9yKGUsIGNvbXBvbmVudC5fdm5vZGUpO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKG9sZENvbW1pdCkgb2xkQ29tbWl0KHZub2RlLCBjb21taXRRdWV1ZSk7XG59O1xuXG5vcHRpb25zLnVubW91bnQgPSB2bm9kZSA9PiB7XG5cdGlmIChvbGRCZWZvcmVVbm1vdW50KSBvbGRCZWZvcmVVbm1vdW50KHZub2RlKTtcblxuXHRjb25zdCBjID0gdm5vZGUuX2NvbXBvbmVudDtcblx0aWYgKGMgJiYgYy5fX2hvb2tzKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGMuX19ob29rcy5fbGlzdC5mb3JFYWNoKGludm9rZUNsZWFudXApO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgYy5fdm5vZGUpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBHZXQgYSBob29rJ3Mgc3RhdGUgZnJvbSB0aGUgY3VycmVudENvbXBvbmVudFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgaG9vayB0byBnZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlIFRoZSBpbmRleCBvZiB0aGUgaG9vayB0byBnZXRcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGdldEhvb2tTdGF0ZShpbmRleCwgdHlwZSkge1xuXHRpZiAob3B0aW9ucy5faG9vaykge1xuXHRcdG9wdGlvbnMuX2hvb2soY3VycmVudENvbXBvbmVudCwgaW5kZXgsIGN1cnJlbnRIb29rIHx8IHR5cGUpO1xuXHR9XG5cdGN1cnJlbnRIb29rID0gMDtcblxuXHQvLyBMYXJnZWx5IGluc3BpcmVkIGJ5OlxuXHQvLyAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNoYWVsLWtsZWluL2Z1bmN5LmpzL2Jsb2IvZjZiZTczNDY4ZTZlYzQ2YjBmZjVhYTNjYzRjOWJhZjcyYTI5MDI1YS9zcmMvaG9va3MvY29yZV9ob29rcy5tanNcblx0Ly8gKiBodHRwczovL2dpdGh1Yi5jb20vbWljaGFlbC1rbGVpbi9mdW5jeS5qcy9ibG9iLzY1MGJlYWE1OGM0M2MzM2E3NDgyMGEzYzk4YjNjNzA3OWNmMmUzMzMvc3JjL3JlbmRlcmVyLm1qc1xuXHQvLyBPdGhlciBpbXBsZW1lbnRhdGlvbnMgdG8gbG9vayBhdDpcblx0Ly8gKiBodHRwczovL2NvZGVzYW5kYm94LmlvL3MvbW5veDA1cXA4XG5cdGNvbnN0IGhvb2tzID1cblx0XHRjdXJyZW50Q29tcG9uZW50Ll9faG9va3MgfHxcblx0XHQoY3VycmVudENvbXBvbmVudC5fX2hvb2tzID0ge1xuXHRcdFx0X2xpc3Q6IFtdLFxuXHRcdFx0X3BlbmRpbmdFZmZlY3RzOiBbXVxuXHRcdH0pO1xuXG5cdGlmIChpbmRleCA+PSBob29rcy5fbGlzdC5sZW5ndGgpIHtcblx0XHRob29rcy5fbGlzdC5wdXNoKHt9KTtcblx0fVxuXHRyZXR1cm4gaG9va3MuX2xpc3RbaW5kZXhdO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2luZGV4JykuU3RhdGVVcGRhdGVyPGFueT59IFtpbml0aWFsU3RhdGVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdGF0ZShpbml0aWFsU3RhdGUpIHtcblx0Y3VycmVudEhvb2sgPSAxO1xuXHRyZXR1cm4gdXNlUmVkdWNlcihpbnZva2VPclJldHVybiwgaW5pdGlhbFN0YXRlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbmRleCcpLlJlZHVjZXI8YW55LCBhbnk+fSByZWR1Y2VyXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9pbmRleCcpLlN0YXRlVXBkYXRlcjxhbnk+fSBpbml0aWFsU3RhdGVcbiAqIEBwYXJhbSB7KGluaXRpYWxTdGF0ZTogYW55KSA9PiB2b2lkfSBbaW5pdF1cbiAqIEByZXR1cm5zIHtbIGFueSwgKHN0YXRlOiBhbnkpID0+IHZvaWQgXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFN0YXRlLCBpbml0KSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuUmVkdWNlckhvb2tTdGF0ZX0gKi9cblx0Y29uc3QgaG9va1N0YXRlID0gZ2V0SG9va1N0YXRlKGN1cnJlbnRJbmRleCsrLCAyKTtcblx0aG9va1N0YXRlLl9yZWR1Y2VyID0gcmVkdWNlcjtcblx0aWYgKCFob29rU3RhdGUuX2NvbXBvbmVudCkge1xuXHRcdGhvb2tTdGF0ZS5fdmFsdWUgPSBbXG5cdFx0XHQhaW5pdCA/IGludm9rZU9yUmV0dXJuKHVuZGVmaW5lZCwgaW5pdGlhbFN0YXRlKSA6IGluaXQoaW5pdGlhbFN0YXRlKSxcblxuXHRcdFx0YWN0aW9uID0+IHtcblx0XHRcdFx0Y29uc3QgbmV4dFZhbHVlID0gaG9va1N0YXRlLl9yZWR1Y2VyKGhvb2tTdGF0ZS5fdmFsdWVbMF0sIGFjdGlvbik7XG5cdFx0XHRcdGlmIChob29rU3RhdGUuX3ZhbHVlWzBdICE9PSBuZXh0VmFsdWUpIHtcblx0XHRcdFx0XHRob29rU3RhdGUuX3ZhbHVlID0gW25leHRWYWx1ZSwgaG9va1N0YXRlLl92YWx1ZVsxXV07XG5cdFx0XHRcdFx0aG9va1N0YXRlLl9jb21wb25lbnQuc2V0U3RhdGUoe30pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XTtcblxuXHRcdGhvb2tTdGF0ZS5fY29tcG9uZW50ID0gY3VycmVudENvbXBvbmVudDtcblx0fVxuXG5cdHJldHVybiBob29rU3RhdGUuX3ZhbHVlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuRWZmZWN0fSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRWZmZWN0KGNhbGxiYWNrLCBhcmdzKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuRWZmZWN0SG9va1N0YXRlfSAqL1xuXHRjb25zdCBzdGF0ZSA9IGdldEhvb2tTdGF0ZShjdXJyZW50SW5kZXgrKywgMyk7XG5cdGlmICghb3B0aW9ucy5fc2tpcEVmZmVjdHMgJiYgYXJnc0NoYW5nZWQoc3RhdGUuX2FyZ3MsIGFyZ3MpKSB7XG5cdFx0c3RhdGUuX3ZhbHVlID0gY2FsbGJhY2s7XG5cdFx0c3RhdGUuX2FyZ3MgPSBhcmdzO1xuXG5cdFx0Y3VycmVudENvbXBvbmVudC5fX2hvb2tzLl9wZW5kaW5nRWZmZWN0cy5wdXNoKHN0YXRlKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuRWZmZWN0fSBjYWxsYmFja1xuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlTGF5b3V0RWZmZWN0KGNhbGxiYWNrLCBhcmdzKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuRWZmZWN0SG9va1N0YXRlfSAqL1xuXHRjb25zdCBzdGF0ZSA9IGdldEhvb2tTdGF0ZShjdXJyZW50SW5kZXgrKywgNCk7XG5cdGlmICghb3B0aW9ucy5fc2tpcEVmZmVjdHMgJiYgYXJnc0NoYW5nZWQoc3RhdGUuX2FyZ3MsIGFyZ3MpKSB7XG5cdFx0c3RhdGUuX3ZhbHVlID0gY2FsbGJhY2s7XG5cdFx0c3RhdGUuX2FyZ3MgPSBhcmdzO1xuXG5cdFx0Y3VycmVudENvbXBvbmVudC5fcmVuZGVyQ2FsbGJhY2tzLnB1c2goc3RhdGUpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VSZWYoaW5pdGlhbFZhbHVlKSB7XG5cdGN1cnJlbnRIb29rID0gNTtcblx0cmV0dXJuIHVzZU1lbW8oKCkgPT4gKHsgY3VycmVudDogaW5pdGlhbFZhbHVlIH0pLCBbXSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IHJlZlxuICogQHBhcmFtIHsoKSA9PiBvYmplY3R9IGNyZWF0ZUhhbmRsZVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGNyZWF0ZUhhbmRsZSwgYXJncykge1xuXHRjdXJyZW50SG9vayA9IDY7XG5cdHVzZUxheW91dEVmZmVjdChcblx0XHQoKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIHJlZiA9PSAnZnVuY3Rpb24nKSByZWYoY3JlYXRlSGFuZGxlKCkpO1xuXHRcdFx0ZWxzZSBpZiAocmVmKSByZWYuY3VycmVudCA9IGNyZWF0ZUhhbmRsZSgpO1xuXHRcdH0sXG5cdFx0YXJncyA9PSBudWxsID8gYXJncyA6IGFyZ3MuY29uY2F0KHJlZilcblx0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geygpID0+IGFueX0gZmFjdG9yeVxuICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlTWVtbyhmYWN0b3J5LCBhcmdzKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuTWVtb0hvb2tTdGF0ZX0gKi9cblx0Y29uc3Qgc3RhdGUgPSBnZXRIb29rU3RhdGUoY3VycmVudEluZGV4KyssIDcpO1xuXHRpZiAoYXJnc0NoYW5nZWQoc3RhdGUuX2FyZ3MsIGFyZ3MpKSB7XG5cdFx0c3RhdGUuX3ZhbHVlID0gZmFjdG9yeSgpO1xuXHRcdHN0YXRlLl9hcmdzID0gYXJncztcblx0XHRzdGF0ZS5fZmFjdG9yeSA9IGZhY3Rvcnk7XG5cdH1cblxuXHRyZXR1cm4gc3RhdGUuX3ZhbHVlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7YW55W119IGFyZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhbGxiYWNrKGNhbGxiYWNrLCBhcmdzKSB7XG5cdGN1cnJlbnRIb29rID0gODtcblx0cmV0dXJuIHVzZU1lbW8oKCkgPT4gY2FsbGJhY2ssIGFyZ3MpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuUHJlYWN0Q29udGV4dH0gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlQ29udGV4dChjb250ZXh0KSB7XG5cdGNvbnN0IHByb3ZpZGVyID0gY3VycmVudENvbXBvbmVudC5jb250ZXh0W2NvbnRleHQuX2lkXTtcblx0Ly8gV2UgY291bGQgc2tpcCB0aGlzIGNhbGwgaGVyZSwgYnV0IHRoYW4gd2UnZCBub3QgY2FsbFxuXHQvLyBgb3B0aW9ucy5faG9va2AuIFdlIG5lZWQgdG8gZG8gdGhhdCBpbiBvcmRlciB0byBtYWtlXG5cdC8vIHRoZSBkZXZ0b29scyBhd2FyZSBvZiB0aGlzIGhvb2suXG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuQ29udGV4dEhvb2tTdGF0ZX0gKi9cblx0Y29uc3Qgc3RhdGUgPSBnZXRIb29rU3RhdGUoY3VycmVudEluZGV4KyssIDkpO1xuXHQvLyBUaGUgZGV2dG9vbHMgbmVlZHMgYWNjZXNzIHRvIHRoZSBjb250ZXh0IG9iamVjdCB0b1xuXHQvLyBiZSBhYmxlIHRvIHB1bGwgb2YgdGhlIGRlZmF1bHQgdmFsdWUgd2hlbiBubyBwcm92aWRlclxuXHQvLyBpcyBwcmVzZW50IGluIHRoZSB0cmVlLlxuXHRzdGF0ZS5fY29udGV4dCA9IGNvbnRleHQ7XG5cdGlmICghcHJvdmlkZXIpIHJldHVybiBjb250ZXh0Ll9kZWZhdWx0VmFsdWU7XG5cdC8vIFRoaXMgaXMgcHJvYmFibHkgbm90IHNhZmUgdG8gY29udmVydCB0byBcIiFcIlxuXHRpZiAoc3RhdGUuX3ZhbHVlID09IG51bGwpIHtcblx0XHRzdGF0ZS5fdmFsdWUgPSB0cnVlO1xuXHRcdHByb3ZpZGVyLnN1YihjdXJyZW50Q29tcG9uZW50KTtcblx0fVxuXHRyZXR1cm4gcHJvdmlkZXIucHJvcHMudmFsdWU7XG59XG5cbi8qKlxuICogRGlzcGxheSBhIGN1c3RvbSBsYWJlbCBmb3IgYSBjdXN0b20gaG9vayBmb3IgdGhlIGRldnRvb2xzIHBhbmVsXG4gKiBAdHlwZSB7PFQ+KHZhbHVlOiBULCBjYj86ICh2YWx1ZTogVCkgPT4gc3RyaW5nIHwgbnVtYmVyKSA9PiB2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRGVidWdWYWx1ZSh2YWx1ZSwgZm9ybWF0dGVyKSB7XG5cdGlmIChvcHRpb25zLnVzZURlYnVnVmFsdWUpIHtcblx0XHRvcHRpb25zLnVzZURlYnVnVmFsdWUoZm9ybWF0dGVyID8gZm9ybWF0dGVyKHZhbHVlKSA6IHZhbHVlKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7KGVycm9yOiBhbnkpID0+IHZvaWR9IGNiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VFcnJvckJvdW5kYXJ5KGNiKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL2ludGVybmFsJykuRXJyb3JCb3VuZGFyeUhvb2tTdGF0ZX0gKi9cblx0Y29uc3Qgc3RhdGUgPSBnZXRIb29rU3RhdGUoY3VycmVudEluZGV4KyssIDEwKTtcblx0Y29uc3QgZXJyU3RhdGUgPSB1c2VTdGF0ZSgpO1xuXHRzdGF0ZS5fdmFsdWUgPSBjYjtcblx0aWYgKCFjdXJyZW50Q29tcG9uZW50LmNvbXBvbmVudERpZENhdGNoKSB7XG5cdFx0Y3VycmVudENvbXBvbmVudC5jb21wb25lbnREaWRDYXRjaCA9IGVyciA9PiB7XG5cdFx0XHRpZiAoc3RhdGUuX3ZhbHVlKSBzdGF0ZS5fdmFsdWUoZXJyKTtcblx0XHRcdGVyclN0YXRlWzFdKGVycik7XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gW1xuXHRcdGVyclN0YXRlWzBdLFxuXHRcdCgpID0+IHtcblx0XHRcdGVyclN0YXRlWzFdKHVuZGVmaW5lZCk7XG5cdFx0fVxuXHRdO1xufVxuXG4vKipcbiAqIEFmdGVyIHBhaW50IGVmZmVjdHMgY29uc3VtZXIuXG4gKi9cbmZ1bmN0aW9uIGZsdXNoQWZ0ZXJQYWludEVmZmVjdHMoKSB7XG5cdGFmdGVyUGFpbnRFZmZlY3RzLmZvckVhY2goY29tcG9uZW50ID0+IHtcblx0XHRpZiAoY29tcG9uZW50Ll9wYXJlbnREb20pIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbXBvbmVudC5fX2hvb2tzLl9wZW5kaW5nRWZmZWN0cy5mb3JFYWNoKGludm9rZUNsZWFudXApO1xuXHRcdFx0XHRjb21wb25lbnQuX19ob29rcy5fcGVuZGluZ0VmZmVjdHMuZm9yRWFjaChpbnZva2VFZmZlY3QpO1xuXHRcdFx0XHRjb21wb25lbnQuX19ob29rcy5fcGVuZGluZ0VmZmVjdHMgPSBbXTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29tcG9uZW50Ll9faG9va3MuX3BlbmRpbmdFZmZlY3RzID0gW107XG5cdFx0XHRcdG9wdGlvbnMuX2NhdGNoRXJyb3IoZSwgY29tcG9uZW50Ll92bm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblx0YWZ0ZXJQYWludEVmZmVjdHMgPSBbXTtcbn1cblxubGV0IEhBU19SQUYgPSB0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09ICdmdW5jdGlvbic7XG5cbi8qKlxuICogU2NoZWR1bGUgYSBjYWxsYmFjayB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBicm93c2VyIGhhcyBhIGNoYW5jZSB0byBwYWludCBhIG5ldyBmcmFtZS5cbiAqIERvIHRoaXMgYnkgY29tYmluaW5nIHJlcXVlc3RBbmltYXRpb25GcmFtZSAockFGKSArIHNldFRpbWVvdXQgdG8gaW52b2tlIGEgY2FsbGJhY2sgYWZ0ZXJcbiAqIHRoZSBuZXh0IGJyb3dzZXIgZnJhbWUuXG4gKlxuICogQWxzbywgc2NoZWR1bGUgYSB0aW1lb3V0IGluIHBhcmFsbGVsIHRvIHRoZSB0aGUgckFGIHRvIGVuc3VyZSB0aGUgY2FsbGJhY2sgaXMgaW52b2tlZFxuICogZXZlbiBpZiBSQUYgZG9lc24ndCBmaXJlIChmb3IgZXhhbXBsZSBpZiB0aGUgYnJvd3NlciB0YWIgaXMgbm90IHZpc2libGUpXG4gKlxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBhZnRlck5leHRGcmFtZShjYWxsYmFjaykge1xuXHRjb25zdCBkb25lID0gKCkgPT4ge1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRpZiAoSEFTX1JBRikgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKTtcblx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrKTtcblx0fTtcblx0Y29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoZG9uZSwgUkFGX1RJTUVPVVQpO1xuXG5cdGxldCByYWY7XG5cdGlmIChIQVNfUkFGKSB7XG5cdFx0cmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvbmUpO1xuXHR9XG59XG5cbi8vIE5vdGU6IGlmIHNvbWVvbmUgdXNlZCBvcHRpb25zLmRlYm91bmNlUmVuZGVyaW5nID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxuLy8gdGhlbiBlZmZlY3RzIHdpbGwgQUxXQVlTIHJ1biBvbiB0aGUgTkVYVCBmcmFtZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IG9uZSwgaW5jdXJyaW5nIGEgfjE2bXMgZGVsYXkuXG4vLyBQZXJoYXBzIHRoaXMgaXMgbm90IHN1Y2ggYSBiaWcgZGVhbC5cbi8qKlxuICogU2NoZWR1bGUgYWZ0ZXJQYWludEVmZmVjdHMgZmx1c2ggYWZ0ZXIgdGhlIGJyb3dzZXIgcGFpbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gbmV3UXVldWVMZW5ndGhcbiAqL1xuZnVuY3Rpb24gYWZ0ZXJQYWludChuZXdRdWV1ZUxlbmd0aCkge1xuXHRpZiAobmV3UXVldWVMZW5ndGggPT09IDEgfHwgcHJldlJhZiAhPT0gb3B0aW9ucy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRwcmV2UmFmID0gb3B0aW9ucy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdFx0KHByZXZSYWYgfHwgYWZ0ZXJOZXh0RnJhbWUpKGZsdXNoQWZ0ZXJQYWludEVmZmVjdHMpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vaW50ZXJuYWwnKS5FZmZlY3RIb29rU3RhdGV9IGhvb2tcbiAqL1xuZnVuY3Rpb24gaW52b2tlQ2xlYW51cChob29rKSB7XG5cdC8vIEEgaG9vayBjbGVhbnVwIGNhbiBpbnRyb2R1Y2UgYSBjYWxsIHRvIHJlbmRlciB3aGljaCBjcmVhdGVzIGEgbmV3IHJvb3QsIHRoaXMgd2lsbCBjYWxsIG9wdGlvbnMudm5vZGVcblx0Ly8gYW5kIG1vdmUgdGhlIGN1cnJlbnRDb21wb25lbnQgYXdheS5cblx0Y29uc3QgY29tcCA9IGN1cnJlbnRDb21wb25lbnQ7XG5cdGlmICh0eXBlb2YgaG9vay5fY2xlYW51cCA9PSAnZnVuY3Rpb24nKSBob29rLl9jbGVhbnVwKCk7XG5cdGN1cnJlbnRDb21wb25lbnQgPSBjb21wO1xufVxuXG4vKipcbiAqIEludm9rZSBhIEhvb2sncyBlZmZlY3RcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL2ludGVybmFsJykuRWZmZWN0SG9va1N0YXRlfSBob29rXG4gKi9cbmZ1bmN0aW9uIGludm9rZUVmZmVjdChob29rKSB7XG5cdC8vIEEgaG9vayBjYWxsIGNhbiBpbnRyb2R1Y2UgYSBjYWxsIHRvIHJlbmRlciB3aGljaCBjcmVhdGVzIGEgbmV3IHJvb3QsIHRoaXMgd2lsbCBjYWxsIG9wdGlvbnMudm5vZGVcblx0Ly8gYW5kIG1vdmUgdGhlIGN1cnJlbnRDb21wb25lbnQgYXdheS5cblx0Y29uc3QgY29tcCA9IGN1cnJlbnRDb21wb25lbnQ7XG5cdGhvb2suX2NsZWFudXAgPSBob29rLl92YWx1ZSgpO1xuXHRjdXJyZW50Q29tcG9uZW50ID0gY29tcDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2FueVtdfSBvbGRBcmdzXG4gKiBAcGFyYW0ge2FueVtdfSBuZXdBcmdzXG4gKi9cbmZ1bmN0aW9uIGFyZ3NDaGFuZ2VkKG9sZEFyZ3MsIG5ld0FyZ3MpIHtcblx0cmV0dXJuIChcblx0XHQhb2xkQXJncyB8fFxuXHRcdG9sZEFyZ3MubGVuZ3RoICE9PSBuZXdBcmdzLmxlbmd0aCB8fFxuXHRcdG5ld0FyZ3Muc29tZSgoYXJnLCBpbmRleCkgPT4gYXJnICE9PSBvbGRBcmdzW2luZGV4XSlcblx0KTtcbn1cblxuZnVuY3Rpb24gaW52b2tlT3JSZXR1cm4oYXJnLCBmKSB7XG5cdHJldHVybiB0eXBlb2YgZiA9PSAnZnVuY3Rpb24nID8gZihhcmcpIDogZjtcbn1cbiIsImltcG9ydCB7IGh0bWwgfSBmcm9tICdodG0vcHJlYWN0J1xuXG5mdW5jdGlvbiBCdXR0b24gKHByb3BzKSB7XG4gICAgcmV0dXJuIGh0bWxgPHNwYW4gY2xhc3M9XCJmb3JtLXN0dWZmXCI+XG4gICAgICAgICR7cHJvcHMuaXNTcGlubmluZyA/XG4gICAgICAgICAgICBodG1sYDxidXR0b24gLi4uJHtwcm9wc30gY2xhc3M9JHtwcm9wcy5jbGFzcyB8fCAnJyArICcgc3Bpbm5pbmcnfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPSR7dHJ1ZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0bi1jb250ZW50XCI+JHtwcm9wcy5jaGlsZHJlbn08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5gIDpcbiAgICAgICAgICAgIGh0bWxgPGJ1dHRvbiAuLi4ke3Byb3BzfT5cbiAgICAgICAgICAgICAgICAke3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+YFxuICAgICAgICB9XG4gICAgICAgIDwvc3Bhbj5gXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uXG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCdcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncHJlYWN0L2hvb2tzJztcbnZhciBQZW5jaWxCdXR0b24gPSByZXF1aXJlKCcuL3BlbmNpbC1idXR0b24nKVxuXG5mdW5jdGlvbiBFZGl0YWJsZUZpZWxkIChwcm9wcykge1xuICAgIHZhciB7IHZhbHVlLCBvblNhdmUsIG5hbWUgfSA9IHByb3BzXG4gICAgdmFyIFtpc0VkaXRpbmcsIHNldEVkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gICAgdmFyIFtpc1Jlc29sdmluZywgc2V0UmVzb2x2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gICAgZnVuY3Rpb24gX3NldEVkaXRpbmcgKGV2KSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgc2V0RWRpdGluZyh0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3BFZGl0aW5nIChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHNldEVkaXRpbmcoZmFsc2UpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX29uU2F2ZSAoZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICB2YXIgdmFsID0gZXYudGFyZ2V0LmVsZW1lbnRzW25hbWVdLnZhbHVlXG4gICAgICAgIHNldFJlc29sdmluZyh0cnVlKVxuICAgICAgICBvblNhdmUodmFsKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFJlc29sdmluZyhmYWxzZSlcbiAgICAgICAgICAgICAgICBzZXRFZGl0aW5nKGZhbHNlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHNldFJlc29sdmluZyhmYWxzZSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJycnJycicsIGVycilcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgdmFyIF9jbGFzcyA9ICdlZGl0YWJsZS1maWVsZCcgK1xuICAgICAgICAoaXNSZXNvbHZpbmcgPyAnIHJlc29sdmluZycgOiAnJykgK1xuICAgICAgICAocHJvcHMuY2xhc3MgPyAoJyAnICsgcHJvcHMuY2xhc3MpIDogJycpXG5cbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICAgIHJldHVybiBodG1sYDxmb3JtIG9ucmVzZXQ9JHtzdG9wRWRpdGluZ31cbiAgICAgICAgICAgIG9uc3VibWl0PSR7X29uU2F2ZX1cbiAgICAgICAgICAgIGNsYXNzPSR7X2NsYXNzfVxuICAgICAgICA+XG4gICAgICAgICAgICA8aW5wdXQgbmFtZT0ke25hbWV9IGlkPSR7bmFtZX0gcGxhY2Vob2xkZXI9XCIke3ZhbHVlfVwiIC8+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiIGRpc2FibGVkPSR7aXNSZXNvbHZpbmd9PmNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9JHtpc1Jlc29sdmluZ30+c2F2ZTwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+YDtcbiAgICB9XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWVsZFwiPiR7dmFsdWV9PC9zcGFuPlxuXG4gICAgICAgIDwhLS0gcGVuY2lsIGVtb2ppIC0tPlxuICAgICAgICA8JHtQZW5jaWxCdXR0b259IG9uQ2xpY2s9JHtfc2V0RWRpdGluZ30gdGl0bGU9XCJlZGl0XCIgLz5cbiAgICBgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdGFibGVGaWVsZFxuIiwidmFyIE51bWJlcklucHV0ID0gcmVxdWlyZSgnLi9udW1iZXItaW5wdXQnKVxudmFyIFRleHRJbnB1dCA9IHJlcXVpcmUoJy4vdGV4dC1pbnB1dCcpXG52YXIgQnV0dG9uID0gcmVxdWlyZSgnLi9idXR0b24nKVxudmFyIEVkaXRhYmxlRmllbGQgPSByZXF1aXJlKCcuL2VkaXRhYmxlLWZpZWxkJylcbnZhciBQZW5jaWxCdXR0b24gPSByZXF1aXJlKCcuL3BlbmNpbC1idXR0b24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgVGV4dElucHV0LCBOdW1iZXJJbnB1dCwgQnV0dG9uLCBFZGl0YWJsZUZpZWxkLFxuICAgIFBlbmNpbEJ1dHRvbiB9XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCdcblxuZnVuY3Rpb24gTnVtYmVySW5wdXQgKHByb3BzKSB7XG4gICAgdmFyIHsgbmFtZSwgbWluLCBtYXgsIG9uQ2hhbmdlLCB2YWx1ZSwgb25JbmNyZWFzZSwgb25EZWNyZWFzZSB9ID0gcHJvcHNcblxuICAgIHJldHVybiBodG1sYDxkaXYgY2xhc3M9XCJmb3JtLXN0dWZmXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1udW1iZXJcIj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaW5wdXRtb2RlPVwibnVtZXJpY1wiXG4gICAgICAgICAgICAgICAgcGF0dGVybj1cIlswLTldKlwiXG4gICAgICAgICAgICAgICAgbWF4PVwiJHttYXh9XCJcbiAgICAgICAgICAgICAgICBtaW49JHttaW59XG4gICAgICAgICAgICAgICAgb25jaGFuZ2U9JHtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT0ke3ZhbHVlfVxuICAgICAgICAgICAgICAgIG5hbWU9JHtuYW1lfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXItbmF2XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlci1idXR0b24gbnVtYmVyLXVwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25jbGljaz1cIiR7ZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgb25JbmNyZWFzZShldilcbiAgICAgICAgICAgICAgICAgICAgfSB9XCI+KzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlci1idXR0b24gbnVtYmVyLWRvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwiJHtldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRlY3JlYXNlKGV2KVxuICAgICAgICAgICAgICAgICAgICB9IH1cIj4tPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+YFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE51bWJlcklucHV0XG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCdcbnZhciBjcmVhdGVQZW5jaWwgPSByZXF1aXJlKCcuLi9jcmVhdGUtcGVuY2lsLWJ1dHRvbicpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUGVuY2lsKGh0bWwpXG4iLCJpbXBvcnQgeyBodG1sIH0gZnJvbSAnaHRtL3ByZWFjdCdcblxuZnVuY3Rpb24gVGV4dElucHV0IChwcm9wcykge1xuICAgIHZhciB7IG5hbWUsIGRpc3BsYXlOYW1lIH0gPSBwcm9wc1xuICAgIHZhciBfcHJvcHMgPSB7Li4ucHJvcHN9XG4gICAgZGVsZXRlIF9wcm9wcy5kaXNwbGF5TmFtZVxuXG4gICAgcmV0dXJuIGh0bWxgPGRpdiBjbGFzc05hbWU9XCJmb3JtLXN0dWZmXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAgJHtuYW1lfVwiPlxuICAgICAgICAgICAgPGlucHV0IC4uLiR7X3Byb3BzfSBuYW1lPVwiJHtuYW1lfVwiIHR5cGU9JHtwcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD0ke3Byb3BzLnJlcXVpcmVkfVxuICAgICAgICAgICAgICAgIG1pbkxlbmd0aD0ke3Byb3BzLm1pbmxlbmd0aH0gbWF4TGVuZ3RoPSR7cHJvcHMubWF4bGVuZ3RofVxuICAgICAgICAgICAgICAgIGlkPVwiJHtuYW1lfVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9JHtuYW1lfT4ke2Rpc3BsYXlOYW1lfTwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0SW5wdXRcbiJdfQ==
