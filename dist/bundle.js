!function _(o,r,u){function i(n,e){if(!r[n]){if(!o[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);throw(t=new Error("Cannot find module '"+n+"'")).code="MODULE_NOT_FOUND",t}t=r[n]={exports:{}},o[n][0].call(t.exports,function(e){return i(o[n][1][e]||e)},t,t.exports,_,o,r,u)}return r[n].exports}for(var l="function"==typeof require&&require,e=0;e<u.length;e++)i(u[e]);return i}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var n=_.get(this);return n||(n=new Map,_.set(this,n)),1<(n=i(this,n.get(e)||(n.set(e,n=function(e){for(var n,t,_=1,o="",r="",u=[0],i=function(e){1===_&&(e||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?u.push(0,e,o):3===_&&(e||o)?(u.push(3,e,o),_=2):2===_&&"..."===o&&e?u.push(4,e,0):2===_&&o&&!e?u.push(5,0,!0,o):5<=_&&((o||!e&&5===_)&&(u.push(_,0,o,t),_=6),e&&(u.push(_,e,0,t),_=6)),o=""},l=0;l<e.length;l++){l&&(1===_&&i(),i(l));for(var c=0;c<e[l].length;c++)n=e[l][c],1===_?"<"===n?(i(),u=[u],_=3):o+=n:4===_?o="--"===o&&">"===n?(_=1,""):n+o[0]:r?n===r?r="":o+=n:'"'===n||"'"===n?r=n:">"===n?(i(),_=1):_&&("="===n?(_=5,t=o,o=""):"/"===n&&(_<5||">"===e[l][c+1])?(i(),3===_&&(u=u[0]),(u=(_=u)[0]).push(2,0,_),_=0):" "===n||"\t"===n||"\n"===n||"\r"===n?(i(),_=2):o+=n),3===_&&"!--"===o&&(_=4,u=u[0])}return i(),u}(e)),n),arguments,[])).length?n:n[0]};var i=function(e,n,t,_){n[0]=0;for(var o=1;o<n.length;o++){var r=n[o++],u=n[o]?(n[0]|=r?1:2,t[n[o++]]):n[++o];3===r?_[0]=u:4===r?_[1]=Object.assign(_[1]||{},u):5===r?(_[1]=_[1]||{})[n[++o]]=u:6===r?_[1][n[++o]]+=u+"":r?(r=e.apply(u,i(e,u,t,["",null])),_.push(r),u[0]?n[0]|=2:(n[o-2]=0,n[o]=r)):_.push(u)}return _},_=new Map},{}],2:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"h",{enumerable:!0,get:function(){return o.h}}),Object.defineProperty(t,"render",{enumerable:!0,get:function(){return o.render}}),Object.defineProperty(t,"Component",{enumerable:!0,get:function(){return o.Component}}),t.html=void 0;var _,o=e(3);var r=((_=e(1))&&_.__esModule?_:{default:_}).default.bind(o.h);t.html=r},{1:1,3:3}],3:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.render=h,t.hydrate=function e(n,t){h(n,t,e)},t.h=t.createElement=l,t.Fragment=P,t.createRef=function(){return{current:null}},t.Component=D,t.cloneElement=function(e,n,t){var _,o,r,u=arguments,i=C({},e.props);for(r in n)"key"==r?_=n[r]:"ref"==r?o=n[r]:i[r]=n[r];if(3<arguments.length)for(t=[t],r=3;r<arguments.length;r++)t.push(u[r]);return null!=t&&(i.children=t),b(e.type,i,_||e.key,o||e.ref,null)},t.createContext=function(e,_){e={__c:_="__cC"+u++,__:e,Consumer:function(e,n){return e.children(n)},Provider:function(e){var t,n;return this.getChildContext||(t=[],((n={})[_]=this).getChildContext=function(){return n},this.shouldComponentUpdate=function(e){this.props.value!==e.value&&t.some(c)},this.sub=function(e){t.push(e);var n=e.componentWillUnmount;e.componentWillUnmount=function(){t.splice(t.indexOf(e),1),n&&n.call(e)}}),e.children}};return e.Provider.__=e.Consumer.contextType=e},t.toChildArray=function n(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some(function(e){n(e,t)}):t.push(e)),t},t.options=t.isValidElement=void 0;var k,_,o,r,u,x={},$=[],i=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function C(e,n){for(var t in n)e[t]=n[t];return e}function E(e){var n=e.parentNode;n&&n.removeChild(e)}function l(e,n,t){var _,o,r,u=arguments,i={};for(r in n)"key"==r?_=n[r]:"ref"==r?o=n[r]:i[r]=n[r];if(3<arguments.length)for(t=[t],r=3;r<arguments.length;r++)t.push(u[r]);if(null!=t&&(i.children=t),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===i[r]&&(i[r]=e.defaultProps[r]);return b(e,i,_,o,null)}function b(e,n,t,_,o){o={type:e,props:n,key:t,ref:_,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++k.__v:o};return null!=k.vnode&&k.vnode(o),o}function P(e){return e.children}function D(e,n){this.props=e,this.context=n}function g(e,n){if(null==n)return e.__?g(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?g(e):null}function c(e){(!e.__d&&(e.__d=!0)&&_.push(e)&&!s.__r++||r!==k.debounceRendering)&&((r=k.debounceRendering)||o)(s)}function s(){for(var e;s.__r=_.length;)e=_.sort(function(e,n){return e.__v.__b-n.__v.__b}),_=[],e.some(function(e){var n,t,_,o,r;e.__d&&(o=(_=(n=e).__v).__e,(r=n.__P)&&(t=[],(e=C({},_)).__v=_.__v+1,M(r,_,e,n.__n,void 0!==r.ownerSVGElement,null!=_.__h?[o]:null,t,null==o?g(_):o,_.__h),d(t,_),_.__e!=o&&function e(n){var t,_;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,t=0;t<n.__k.length;t++)if(null!=(_=n.__k[t])&&null!=_.__e){n.__e=n.__c.base=_.__e;break}return e(n)}}(_)))})}function H(e,n,t,_,o,r,u,i,l,c){var s,f,a,p,d,h,v,m=_&&_.__k||$,y=m.length;for(t.__k=[],s=0;s<n.length;s++)if(null!=(p=t.__k[s]=null==(p=n[s])||"boolean"==typeof p?null:"string"==typeof p||"number"==typeof p||"bigint"==typeof p?b(null,p,null,null,p):Array.isArray(p)?b(P,{children:p},null,null,null):0<p.__b?b(p.type,p.props,p.key,null,p.__v):p)){if(p.__=t,p.__b=t.__b+1,null===(a=m[s])||a&&p.key==a.key&&p.type===a.type)m[s]=void 0;else for(f=0;f<y;f++){if((a=m[f])&&p.key==a.key&&p.type===a.type){m[f]=void 0;break}a=null}M(e,p,a=a||x,o,r,u,i,l,c),d=p.__e,(f=p.ref)&&a.ref!=f&&(v=v||[],a.ref&&v.push(a.ref,null,p),v.push(f,p.__c||d,p)),null!=d?(null==h&&(h=d),"function"==typeof p.type&&null!=p.__k&&p.__k===a.__k?p.__d=l=function e(n,t,_){var o,r;for(o=0;o<n.__k.length;o++)(r=n.__k[o])&&(r.__=n,t="function"==typeof r.type?e(r,t,_):S(_,r,r,n.__k,r.__e,t));return t}(p,l,e):l=S(e,p,a,m,d,l),c||"option"!==t.type?"function"==typeof t.type&&(t.__d=l):e.value=""):l&&a.__e==l&&l.parentNode!=e&&(l=g(a))}for(t.__e=h,s=y;s--;)null!=m[s]&&("function"==typeof t.type&&null!=m[s].__e&&m[s].__e==t.__d&&(t.__d=g(_,s+1)),function e(n,t,_){var o,r,u;if(k.unmount&&k.unmount(n),(o=n.ref)&&(o.current&&o.current!==n.__e||T(o,null,t)),_||"function"==typeof n.type||(_=null!=(r=n.__e)),n.__e=n.__d=void 0,null!=(o=n.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(n){k.__e(n,t)}o.base=o.__P=null}if(o=n.__k)for(u=0;u<o.length;u++)o[u]&&e(o[u],t,_);null!=r&&E(r)}(m[s],m[s]));if(v)for(s=0;s<v.length;s++)T(v[s],v[++s],v[++s])}function S(e,n,t,_,o,r){var u,i,l;if(void 0!==n.__d)u=n.__d,n.__d=void 0;else if(null==t||o!=r||null==o.parentNode)e:if(null==r||r.parentNode!==e)e.appendChild(o),u=null;else{for(i=r,l=0;(i=i.nextSibling)&&l<_.length;l+=2)if(i==o)break e;e.insertBefore(o,r),u=r}return void 0!==u?u:o.nextSibling}function f(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]=null==t?"":"number"!=typeof t||i.test(n)?t:t+"px"}function w(e,n,t,_,o){var r;e:if("style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof _&&(e.style.cssText=_=""),_)for(n in _)t&&n in t||f(e.style,n,"");if(t)for(n in t)_&&t[n]===_[n]||f(e.style,n,t[n])}else if("o"===n[0]&&"n"===n[1])r=n!==(n=n.replace(/Capture$/,"")),n=(n.toLowerCase()in e?n.toLowerCase():n).slice(2),e.l||(e.l={}),e.l[n+r]=t,t?_||e.addEventListener(n,r?p:a,r):e.removeEventListener(n,r?p:a,r);else if("dangerouslySetInnerHTML"!==n){if(o)n=n.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==n&&"list"!==n&&"form"!==n&&"tabIndex"!==n&&"download"!==n&&n in e)try{e[n]=null==t?"":t;break e}catch(e){}"function"==typeof t||(null!=t&&(!1!==t||"a"===n[0]&&"r"===n[1])?e.setAttribute(n,t):e.removeAttribute(n))}}function a(e){this.l[e.type+!1](k.event?k.event(e):e)}function p(e){this.l[e.type+!0](k.event?k.event(e):e)}function M(e,n,t,_,o,r,u,i,l){var c,s,f,a,p,d,h,v,m,y,b,g=n.type;if(void 0===n.constructor){null!=t.__h&&(l=t.__h,i=n.__e=t.__e,n.__h=null,r=[i]),(c=k.__b)&&c(n);try{e:if("function"==typeof g){if(v=n.props,m=(c=g.contextType)&&_[c.__c],y=c?m?m.props.value:c.__:_,t.__c?h=(s=n.__c=t.__c).__=s.__E:("prototype"in g&&g.prototype.render?n.__c=s=new g(v,y):(n.__c=s=new D(v,y),s.constructor=g,s.render=A),m&&m.sub(s),s.props=v,s.state||(s.state={}),s.context=y,s.__n=_,f=s.__d=!0,s.__h=[]),null==s.__s&&(s.__s=s.state),null!=g.getDerivedStateFromProps&&(s.__s==s.state&&(s.__s=C({},s.__s)),C(s.__s,g.getDerivedStateFromProps(v,s.__s))),a=s.props,p=s.state,f)null==g.getDerivedStateFromProps&&null!=s.componentWillMount&&s.componentWillMount(),null!=s.componentDidMount&&s.__h.push(s.componentDidMount);else{if(null==g.getDerivedStateFromProps&&v!==a&&null!=s.componentWillReceiveProps&&s.componentWillReceiveProps(v,y),!s.__e&&null!=s.shouldComponentUpdate&&!1===s.shouldComponentUpdate(v,s.__s,y)||n.__v===t.__v){s.props=v,s.state=s.__s,n.__v!==t.__v&&(s.__d=!1),(s.__v=n).__e=t.__e,n.__k=t.__k,n.__k.forEach(function(e){e&&(e.__=n)}),s.__h.length&&u.push(s);break e}null!=s.componentWillUpdate&&s.componentWillUpdate(v,s.__s,y),null!=s.componentDidUpdate&&s.__h.push(function(){s.componentDidUpdate(a,p,d)})}s.context=y,s.props=v,s.state=s.__s,(c=k.__r)&&c(n),s.__d=!1,s.__v=n,s.__P=e,c=s.render(s.props,s.state,s.context),s.state=s.__s,null!=s.getChildContext&&(_=C(C({},_),s.getChildContext())),f||null==s.getSnapshotBeforeUpdate||(d=s.getSnapshotBeforeUpdate(a,p)),b=null!=c&&c.type===P&&null==c.key?c.props.children:c,H(e,Array.isArray(b)?b:[b],n,t,_,o,r,u,i,l),s.base=n.__e,n.__h=null,s.__h.length&&u.push(s),h&&(s.__E=s.__=null),s.__e=!1}else null==r&&n.__v===t.__v?(n.__k=t.__k,n.__e=t.__e):n.__e=function(e,n,t,_,o,r,u,i){var l,c,s,f,a=t.props,p=n.props,d=n.type,h=0;if("svg"===d&&(o=!0),null!=r)for(;h<r.length;h++)if((l=r[h])&&(l===e||(d?l.localName==d:3==l.nodeType))){e=l,r[h]=null;break}if(null==e){if(null===d)return document.createTextNode(p);e=o?document.createElementNS("http://www.w3.org/2000/svg",d):document.createElement(d,p.is&&p),r=null,i=!1}if(null===d)a===p||i&&e.data===p||(e.data=p);else{if(r=r&&$.slice.call(e.childNodes),c=(a=t.props||x).dangerouslySetInnerHTML,s=p.dangerouslySetInnerHTML,!i){if(null!=r)for(a={},f=0;f<e.attributes.length;f++)a[e.attributes[f].name]=e.attributes[f].value;(s||c)&&(s&&(c&&s.__html==c.__html||s.__html===e.innerHTML)||(e.innerHTML=s&&s.__html||""))}if(function(e,n,t,_,o){for(var r in t)"children"===r||"key"===r||r in n||w(e,r,null,t[r],_);for(r in n)o&&"function"!=typeof n[r]||"children"===r||"key"===r||"value"===r||"checked"===r||t[r]===n[r]||w(e,r,n[r],t[r],_)}(e,p,a,o,i),s)n.__k=[];else if(h=n.props.children,H(e,Array.isArray(h)?h:[h],n,t,_,o&&"foreignObject"!==d,r,u,e.firstChild,i),null!=r)for(h=r.length;h--;)null!=r[h]&&E(r[h]);i||("value"in p&&void 0!==(h=p.value)&&(h!==e.value||"progress"===d&&!h)&&w(e,"value",h,a.value,!1),"checked"in p&&void 0!==(h=p.checked)&&h!==e.checked&&w(e,"checked",h,a.checked,!1))}return e}(t.__e,n,t,_,o,r,u,l);(c=k.diffed)&&c(n)}catch(e){n.__v=null,!l&&null==r||(n.__e=i,n.__h=!!l,r[r.indexOf(i)]=null),k.__e(e,n,t)}}}function d(e,n){k.__c&&k.__c(n,e),e.some(function(n){try{e=n.__h,n.__h=[],e.some(function(e){e.call(n)})}catch(e){k.__e(e,n.__v)}})}function T(e,n,t){try{"function"==typeof e?e(n):e.current=n}catch(e){k.__e(e,t)}}function A(e,n,t){return this.constructor(e,t)}function h(e,n,t){var _,o,r;k.__&&k.__(e,n),o=(_="function"==typeof t)?null:t&&t.__k||n.__k,r=[],M(n,e=(!_&&t||n).__k=l(P,null,[e]),o||x,x,void 0!==n.ownerSVGElement,!_&&t?[t]:!o&&n.firstChild?$.slice.call(n.childNodes):null,r,!_&&t?t:o?o.__e:n.firstChild,_),d(r,e)}t.isValidElement=void 0,t.options=k,t.options=k={__e:function(e,n){for(var t,_,o;n=n.__;)if((t=n.__c)&&!t.__)try{if((_=t.constructor)&&null!=_.getDerivedStateFromError&&(t.setState(_.getDerivedStateFromError(e)),o=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(e),o=t.__d),o)return t.__E=t}catch(n){e=n}throw e},__v:0},t.isValidElement=function(e){return null!=e&&void 0===e.constructor},D.prototype.setState=function(e,n){var t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=C({},this.state);(e="function"==typeof e?e(C({},t),this.props):e)&&C(t,e),null!=e&&this.__v&&(n&&this.__h.push(n),c(this))},D.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),c(this))},D.prototype.render=P,_=[],o="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,s.__r=0,u=0},{}],4:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useState=h,t.useReducer=v,t.useEffect=function(e,n){var t=d(o++,3);!u.options.__s&&$(t.__H,n)&&(t.__=e,t.__H=n,r.__H.__h.push(t))},t.useLayoutEffect=m,t.useRef=function(e){return i=5,y(function(){return{current:e}},[])},t.useImperativeHandle=function(e,n,t){i=6,m(function(){"function"==typeof e?e(n()):e&&(e.current=n())},null==t?t:t.concat(e))},t.useMemo=y,t.useCallback=function(e,n){return i=8,y(function(){return e},n)},t.useContext=function(e){var n=r.context[e.__c],t=d(o++,9);return t.__c=e,n?(null==t.__&&(t.__=!0,n.sub(r)),n.props.value):e.__},t.useDebugValue=function(e,n){u.options.useDebugValue&&u.options.useDebugValue(n?n(e):e)},t.useErrorBoundary=function(e){var n=d(o++,10),t=h();return n.__=e,r.componentDidCatch||(r.componentDidCatch=function(e){n.__&&n.__(e),t[1](e)}),[t[0],function(){t[1](void 0)}]};var o,r,_,u=e(3),i=0,l=[],c=u.options.__b,s=u.options.__r,f=u.options.diffed,a=u.options.__c,p=u.options.unmount;function d(e,n){u.options.__h&&u.options.__h(r,e,i||n),i=0;n=r.__H||(r.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function h(e){return i=1,v(C,e)}function v(e,n,t){var _=d(o++,2);return _.t=e,_.__c||(_.__=[t?t(n):C(void 0,n),function(e){e=_.t(_.__[0],e);_.__[0]!==e&&(_.__=[e,_.__[1]],_.__c.setState({}))}],_.__c=r),_.__}function m(e,n){var t=d(o++,4);!u.options.__s&&$(t.__H,n)&&(t.__=e,t.__H=n,r.__h.push(t))}function y(e,n){var t=d(o++,7);return $(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function b(){l.forEach(function(n){if(n.__P)try{n.__H.__h.forEach(k),n.__H.__h.forEach(x),n.__H.__h=[]}catch(e){n.__H.__h=[],u.options.__e(e,n.__v)}}),l=[]}u.options.__b=function(e){r=null,c&&c(e)},u.options.__r=function(e){s&&s(e),o=0;e=(r=e.__c).__H;e&&(e.__h.forEach(k),e.__h.forEach(x),e.__h=[])},u.options.diffed=function(e){f&&f(e);e=e.__c;e&&e.__H&&e.__H.__h.length&&(1!==l.push(e)&&_===u.options.requestAnimationFrame||((_=u.options.requestAnimationFrame)||function(e){function n(){clearTimeout(_),g&&cancelAnimationFrame(t),setTimeout(e)}var t,_=setTimeout(n,100);g&&(t=requestAnimationFrame(n))})(b)),r=void 0},u.options.__c=function(e,t){t.some(function(n){try{n.__h.forEach(k),n.__h=n.__h.filter(function(e){return!e.__||x(e)})}catch(e){t.some(function(e){e.__h&&(e.__h=[])}),t=[],u.options.__e(e,n.__v)}}),a&&a(e,t)},u.options.unmount=function(e){p&&p(e);var n=e.__c;if(n&&n.__H)try{n.__H.__.forEach(k)}catch(e){u.options.__e(e,n.__v)}};var g="function"==typeof requestAnimationFrame;function k(e){var n=r;"function"==typeof e.__c&&e.__c(),r=n}function x(e){var n=r;e.__c=e.__(),r=n}function $(t,e){return!t||t.length!==e.length||e.some(function(e,n){return e!==t[n]})}function C(e,n){return"function"==typeof n?n(e):n}},{3:3}],5:[function(e,n,t){"use strict";var _=e(2);n.exports=function(e){return _.html`<span class="form-stuff">
        ${e.isSpinning?_.html`<button ...${e} class=${e.class||" spinning"}
                disabled=${!0}
            >
                <span class="btn-content">${e.children}</span>
            </button>`:_.html`<div >
                <button ...${e}>
                    ${e.children}
                </button>
            </div>`}
        </span>`}},{2:2}],6:[function(e,n,t){"use strict";var l=e(2),c=e(4);n.exports=function(e){var{value:n,onSave:t,name:_}=e,[o,r]=(0,c.useState)(!1),[u,i]=(0,c.useState)(!1),e="editable-field"+(u?" resolving":"")+(e.class?" "+e.class:"");return o?l.html`<form onreset=${function(e){e.preventDefault(),r(!1)}}
            onsubmit=${function(e){e.preventDefault();e=e.target.elements[_].value;i(!0),t(e).then(()=>{i(!1),r(!1)}).catch(e=>{i(!1),console.log("errrrrr",e)})}}
            class=${e}
        >
            <input name=${_} id=${_} placeholder="${n}" />
            <button type="reset" disabled=${u}>cancel</button>
            <button type="submit" disabled=${u}>save</button>
        </form>`:l.html`
        <span class="field">${n}</span>

        <!-- pencil emoji -->
        <button class="edit-pencil"
            onClick=${function(e){e.preventDefault(),r(!0)}}
            title="edit"
        >
            ✏
        </button>
    `}},{2:2,4:4}],7:[function(e,n,t){var _=e(9),o=e(11),r=e(5),u=e(6),e=e(10);n.exports={TextInput:o,NumberInput:_,Button:r,EditableField:u,createPencil:e}},{10:10,11:11,5:5,6:6,9:9}],8:[function(e,n,t){window.forms=e(7)},{7:7}],9:[function(e,n,t){"use strict";var i=e(2);n.exports=function(e){var{name:n,min:t,max:_,onChange:o,value:e,onIncrease:r,onDecrease:u}=e;return i.html`<div class="form-stuff">
        <div class="input-group-number">
            <input type="number" inputmode="numeric"
                pattern="[0-9]*"
                max="${_}"
                min=${t}
                onchange=${o}
                value=${e}
                name=${n}
            />
            <div class="number-nav">
                <div class="number-button number-up">
                    <button onclick="${e=>{e.preventDefault(),r(e)}}">+</button>
                </div>

                <div class="number-button number-down">
                    <button onclick="${e=>{e.preventDefault(),u(e)}}">-</button>
                </div>
            </div>
        </div>
    </div>`}},{2:2}],10:[function(e,n,t){"use strict";n.exports=function(t){return function(e){var n=e.class||e.className;return t`<button ...${e}
            className="edit-pencil${n?" "+n:""}"
        >
            ✏
        </button>`}}},{}],11:[function(e,n,t){"use strict";var _=e(2);n.exports=function(e){var{name:n,displayName:t}=e;return _.html`<div class="form-stuff">
        <div class="input-group ${n}">
            <input name="${n}" type="text" placeholder=" "
                required=${e.required} minlength=${e.minlength}
                maxlength=${e.maxlength} id="${n}"
            />
            <label for=${n}>${t}</label>
        </div>
    </div>`}},{2:2}]},{},[8]);
