webpackJsonp([8],{987:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,c){try{var o=t[a](c),i=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(i).then(function(e){r("next",e)},function(e){r("throw",e)});e(i)}return r("next")})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"ProcedureConsent",function(){return J});var u=n(14),l=n.n(u),s=n(1),p=n.n(s),m=n(185),f=(n.n(m),n(26)),d=n.n(f),E=n(41),b=n(19),y=n(15),h=n(329),v=n.n(h),j=n(194),g=n.n(j),x=n(330),O=n.n(x),P=n(331),w=n.n(P),C=n(988),k=n.n(C),F=n(23),I=n(44),R=n(24),S=n(20),_=n(122),q=n(51),U=n(42),A=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),T=i(["\n    && {\n        padding: 2px 28px 2px 12px;\n    }\n    @media screen and (min-width: 600px) {\n        && {\n            padding: 4px 56px 4px 24px;\n        }\n    }\n"],["\n    && {\n        padding: 2px 28px 2px 12px;\n    }\n    @media screen and (min-width: 600px) {\n        && {\n            padding: 4px 56px 4px 24px;\n        }\n    }\n"]),B=i(["\n    && {\n      display: none;  \n    }\n\n    @media screen and (min-width: 600px) {\n        && {\n            display: auto;\n        }\n    }\n"],["\n    && {\n      display: none;  \n    }\n\n    @media screen and (min-width: 600px) {\n        && {\n            display: auto;\n        }\n    }\n"]),z=i(["\n    border-top: 3px solid rgba(0,0,0,0.36);\n"],["\n    border-top: 3px solid rgba(0,0,0,0.36);\n"]),D=Object(y.b)(g.a)(T),M=D.extend(B),Y=Object(y.b)(w.a)(z),$=function(e,t){return Object(m.orderBy)(e,[R.m],["asc"]).filter(function(e){return e.status===t})},N=function(e){if(Object(m.isEmpty)(e))return p.a.createElement("div",null,p.a.createElement(S.a,{pb:3}),p.a.createElement(S.q,{fontSize:3},"There are no outstanding procedures."));var t=e.map(function(e,t){return p.a.createElement(w.a,{key:t},p.a.createElement(D,null,d()(e.dateCreated).format("MM/DD/YYYY")),p.a.createElement(D,null,e.name),p.a.createElement(M,{numeric:!0},Object(_.c)(e.totalCost)),p.a.createElement(M,{numeric:!0},Object(_.c)(e.insuranceEstimate)),p.a.createElement(D,{numeric:!0},Object(_.c)(e.patientEstimate)))});return p.a.createElement(S.p,{mt:3},p.a.createElement(O.a,null,p.a.createElement(w.a,null,p.a.createElement(D,{header:"true"},"Date"),p.a.createElement(D,{header:"true"},"Procedure"),p.a.createElement(M,{numeric:!0},"Total Cost"),p.a.createElement(M,{numeric:!0},"Insurance Estimate"),p.a.createElement(D,{numeric:!0},"Patient Estimate"))),p.a.createElement(v.a,null,t,p.a.createElement(Y,null,p.a.createElement(D,null,p.a.createElement(S.q,{fontWeight:"bold"},"Total")),p.a.createElement(D,null),p.a.createElement(M,{numeric:!0},Object(_.c)(Object(m.sumBy)(e,"totalCost"))),p.a.createElement(M,{numeric:!0},Object(_.c)(Object(m.sumBy)(e,"insuranceEstimate"))),p.a.createElement(D,{numeric:!0},p.a.createElement(S.q,{fontSize:3,fontWeight:"bold"},Object(_.c)(Object(m.sumBy)(e,"patientEstimate")))))))},W=function(){return p.a.createElement(S.p,{mt:3},p.a.createElement(O.a,null,p.a.createElement(w.a,null,p.a.createElement(D,null,"Date"),p.a.createElement(D,null,"Procedure"),p.a.createElement(M,{numeric:!0},"Total Cost"),p.a.createElement(M,{numeric:!0},"Insurancve Estimate"),p.a.createElement(D,{numeric:!0},"Patient Estimate"))),p.a.createElement(v.a,null,p.a.createElement(w.a,null,p.a.createElement(D,null),p.a.createElement(D,null),p.a.createElement(D,{numeric:!0})),p.a.createElement(w.a,null,p.a.createElement(D,null),p.a.createElement(D,null),p.a.createElement(D,{numeric:!0})),p.a.createElement(w.a,null,p.a.createElement(D,null),p.a.createElement(D,null),p.a.createElement(D,{numeric:!0}))))},J=function(e){function t(){return a(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),A(t,[{key:"componentDidMount",value:function(){var e=this.props.auth;this.props.queryPatientProcedure(R.w,e.id)}},{key:"calcTotal",value:function(){return this.props.patientProcedures.map(function(e){return e.fee}).reduce(function(e,t){return e+t})}},{key:"onSubmit",value:function(){function e(){return t.apply(this,arguments)}var t=r(l.a.mark(function e(){var t,n,r,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props,n=t.auth,r=t.patientProcedures,a={},a.type=R.D,a.patientId=n.id,a.procedureIds=JSON.stringify(r.map(function(e){return e.id})),a.totalPaid=Object(m.sumBy)(r,"patientEstimate"),a.procedurePatientEstimate=Object(m.sumBy)(r,"patientEstimate"),I.a.push("/payment?"+k.a.stringify(a));case 8:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){var e=this.props,t=e.submitting,n=e.patientProcedures,r=e.isFetching,a=e.handleSubmit;return p.a.createElement(S.a,{mt:[3,5],mx:[3,7]},p.a.createElement(S.q,{fontSize:5},"Outstanding procedures for billing"),r&&W(),!r&&N(n),p.a.createElement(S.a,{pb:[3,5]}),!r&&!Object(m.isEmpty)(n)&&p.a.createElement("form",{onSubmit:a(this.onSubmit.bind(this))},p.a.createElement(E.a,{name:"consent",label:"I agree upon the above procedures to be performed by the practitioner.",component:U.d,validate:q.a}),p.a.createElement(S.a,{pb:[4,2]}),p.a.createElement(S.h,{justifyContent:"flex-end"},p.a.createElement(S.b,{color:"secondary",type:"submit",disabled:t},p.a.createElement(S.q,{fontSize:4,fontWeight:"medium"},"Proceed to checkout")))))}}]),t}(s.Component),G=function(e){return{auth:e.auth,patientProcedures:$(e.patientProcedures.all,R.C),isFetching:e.patientProcedures.isFetching}};t.default=Object(E.g)({form:"treatmentConsent"})(Object(b.b)(G,{queryPatientProcedure:F.queryPatientProcedure,updatePatientProcedure:F.updatePatientProcedure})(J))},988:function(e,t,n){"use strict";function r(e){switch(e.arrayFormat){case"index":return function(t,n,r){return null===n?[c(t,e),"[",r,"]"].join(""):[c(t,e),"[",c(r,e),"]=",c(n,e)].join("")};case"bracket":return function(t,n){return null===n?c(t,e):[c(t,e),"[]=",c(n,e)].join("")};default:return function(t,n){return null===n?c(t,e):[c(t,e),"=",c(n,e)].join("")}}}function a(e){var t;switch(e.arrayFormat){case"index":return function(e,n,r){if(t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),!t)return void(r[e]=n);void 0===r[e]&&(r[e]={}),r[e][t[1]]=n};case"bracket":return function(e,n,r){return t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0===r[e]?void(r[e]=[n]):void(r[e]=[].concat(r[e],n)):void(r[e]=n)};default:return function(e,t,n){if(void 0===n[e])return void(n[e]=t);n[e]=[].concat(n[e],t)}}}function c(e,t){return t.encode?t.strict?l(e):encodeURIComponent(e):e}function o(e){return Array.isArray(e)?e.sort():"object"===typeof e?o(Object.keys(e)).sort(function(e,t){return Number(e)-Number(t)}).map(function(t){return e[t]}):e}function i(e){var t=e.indexOf("?");return-1===t?"":e.slice(t+1)}function u(e,t){t=s({arrayFormat:"none"},t);var n=a(t),r=Object.create(null);return"string"!==typeof e?r:(e=e.trim().replace(/^[?#&]/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),a=t.shift(),c=t.length>0?t.join("="):void 0;c=void 0===c?null:p(c),n(p(a),c,r)}),Object.keys(r).sort().reduce(function(e,t){var n=r[t];return Boolean(n)&&"object"===typeof n&&!Array.isArray(n)?e[t]=o(n):e[t]=n,e},Object.create(null))):r}var l=n(990),s=n(121),p=n(991);t.extract=i,t.parse=u,t.stringify=function(e,t){t=s({encode:!0,strict:!0,arrayFormat:"none"},t),!1===t.sort&&(t.sort=function(){});var n=r(t);return e?Object.keys(e).sort(t.sort).map(function(r){var a=e[r];if(void 0===a)return"";if(null===a)return c(r,t);if(Array.isArray(a)){var o=[];return a.slice().forEach(function(e){void 0!==e&&o.push(n(r,e,o.length))}),o.join("&")}return c(r,t)+"="+c(a,t)}).filter(function(e){return e.length>0}).join("&"):""},t.parseUrl=function(e,t){return{url:e.split("?")[0]||"",query:u(i(e),t)}}},990:function(e,t,n){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}},991:function(e,t,n){"use strict";function r(e,t){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;t=t||1;var n=e.slice(0,t),a=e.slice(t);return Array.prototype.concat.call([],r(n),r(a))}function a(e){try{return decodeURIComponent(e)}catch(a){for(var t=e.match(o),n=1;n<t.length;n++)e=r(t,n).join(""),t=e.match(o);return e}}function c(e){for(var t={"%FE%FF":"\ufffd\ufffd","%FF%FE":"\ufffd\ufffd"},n=i.exec(e);n;){try{t[n[0]]=decodeURIComponent(n[0])}catch(e){var r=a(n[0]);r!==n[0]&&(t[n[0]]=r)}n=i.exec(e)}t["%C2"]="\ufffd";for(var c=Object.keys(t),o=0;o<c.length;o++){var u=c[o];e=e.replace(new RegExp(u,"g"),t[u])}return e}var o=new RegExp("%[a-f0-9]{2}","gi"),i=new RegExp("(%[a-f0-9]{2})+","gi");e.exports=function(e){if("string"!==typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return c(e)}}}});
//# sourceMappingURL=8.7f9d1ec9.chunk.js.map