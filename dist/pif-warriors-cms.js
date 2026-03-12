import { signOut as zl, onAuthStateChanged as Hl, setPersistence as vo, browserLocalPersistence as xo, signInWithEmailAndPassword as Kl, createUserWithEmailAndPassword as Gl } from "firebase/auth";
import { ref as ee, defineComponent as Te, openBlock as I, createElementBlock as F, createElementVNode as v, withModifiers as an, withDirectives as on, vModelText as ln, toDisplayString as X, createCommentVNode as te, createTextVNode as Ye, createVNode as ut, unref as Pe, withCtx as Ut, onMounted as yn, onBeforeUnmount as wo, watch as Wt, computed as Oe, normalizeClass as Je, Fragment as Re, renderList as $e, createBlock as _e, resolveComponent as Ao } from "vue";
import { query as Ii, collection as cr, orderBy as Oi, getDocs as jr, updateDoc as Eo, doc as Yt, serverTimestamp as Ze, getDoc as is, setDoc as Xn, addDoc as Wl, deleteDoc as Zl, limit as No } from "firebase/firestore";
import { useRoute as as, useRouter as vn, RouterLink as Vt, RouterView as Yl } from "vue-router";
import { ref as Xl, uploadBytes as Ql, getDownloadURL as Jl } from "firebase/storage";
const eu = '*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.container{width:100%}@media(min-width:640px){.container{max-width:640px}}@media(min-width:768px){.container{max-width:768px}}@media(min-width:1024px){.container{max-width:1024px}}@media(min-width:1280px){.container{max-width:1280px}}@media(min-width:1536px){.container{max-width:1536px}}.fixed{position:fixed}.inset-0{inset:0}.inset-y-0{top:0;bottom:0}.left-0{left:0}.top-1\\/2{top:50%}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.mx-auto{margin-left:auto;margin-right:auto}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.ml-2{margin-left:.5rem}.mt-1{margin-top:.25rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-5{margin-top:1.25rem}.mt-6{margin-top:1.5rem}.mt-8{margin-top:2rem}.block{display:block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.h-\\[34px\\]{height:34px}.h-full{height:100%}.max-h-32{max-height:8rem}.min-h-\\[260px\\]{min-height:260px}.w-80{width:20rem}.w-full{width:100%}.min-w-0{min-width:0px}.max-w-2xl{max-width:42rem}.max-w-7xl{max-width:80rem}.max-w-md{max-width:28rem}.flex-1{flex:1 1 0%}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem * var(--tw-space-y-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.break-all{word-break:break-all}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-xl{border-radius:.75rem}.rounded-r-lg{border-top-right-radius:.5rem;border-bottom-right-radius:.5rem}.border{border-width:1px}.border-l-0{border-left-width:0px}.border-r{border-right-width:1px}.border-t{border-top-width:1px}.border-\\[var\\(--pw-border\\)\\]{border-color:var(--pw-border)}.border-amber-200{--tw-border-opacity: 1;border-color:rgb(253 230 138 / var(--tw-border-opacity, 1))}.border-emerald-200{--tw-border-opacity: 1;border-color:rgb(167 243 208 / var(--tw-border-opacity, 1))}.border-rose-200{--tw-border-opacity: 1;border-color:rgb(254 205 211 / var(--tw-border-opacity, 1))}.border-rose-300{--tw-border-opacity: 1;border-color:rgb(253 164 175 / var(--tw-border-opacity, 1))}.border-sky-200{--tw-border-opacity: 1;border-color:rgb(186 230 253 / var(--tw-border-opacity, 1))}.border-sky-300{--tw-border-opacity: 1;border-color:rgb(125 211 252 / var(--tw-border-opacity, 1))}.border-slate-200{--tw-border-opacity: 1;border-color:rgb(226 232 240 / var(--tw-border-opacity, 1))}.border-slate-300{--tw-border-opacity: 1;border-color:rgb(203 213 225 / var(--tw-border-opacity, 1))}.border-slate-900{--tw-border-opacity: 1;border-color:rgb(15 23 42 / var(--tw-border-opacity, 1))}.bg-\\[var\\(--pw-primary\\)\\]{background-color:var(--pw-primary)}.bg-\\[var\\(--pw-surface\\)\\]{background-color:var(--pw-surface)}.bg-amber-50{--tw-bg-opacity: 1;background-color:rgb(255 251 235 / var(--tw-bg-opacity, 1))}.bg-emerald-100{--tw-bg-opacity: 1;background-color:rgb(209 250 229 / var(--tw-bg-opacity, 1))}.bg-emerald-50{--tw-bg-opacity: 1;background-color:rgb(236 253 245 / var(--tw-bg-opacity, 1))}.bg-rose-50{--tw-bg-opacity: 1;background-color:rgb(255 241 242 / var(--tw-bg-opacity, 1))}.bg-sky-50{--tw-bg-opacity: 1;background-color:rgb(240 249 255 / var(--tw-bg-opacity, 1))}.bg-slate-100{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.bg-slate-50{--tw-bg-opacity: 1;background-color:rgb(248 250 252 / var(--tw-bg-opacity, 1))}.bg-slate-900{--tw-bg-opacity: 1;background-color:rgb(15 23 42 / var(--tw-bg-opacity, 1))}.bg-slate-900\\/20{background-color:#0f172a33}.bg-slate-900\\/40{background-color:#0f172a66}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.object-cover{-o-object-fit:cover;object-fit:cover}.p-2{padding:.5rem}.p-3{padding:.75rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.px-1{padding-left:.25rem;padding-right:.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-14{padding-top:3.5rem;padding-bottom:3.5rem}.py-16{padding-top:4rem;padding-bottom:4rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.pt-3{padding-top:.75rem}.pt-4{padding-top:1rem}.pt-5{padding-top:1.25rem}.text-left{text-align:left}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-black{font-weight:900}.font-bold{font-weight:700}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.italic{font-style:italic}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.text-\\[var\\(--pw-accent\\)\\]{color:var(--pw-accent)}.text-\\[var\\(--pw-muted-text\\)\\]{color:var(--pw-muted-text)}.text-\\[var\\(--pw-primary-text\\)\\]{color:var(--pw-primary-text)}.text-\\[var\\(--pw-text\\)\\]{color:var(--pw-text)}.text-amber-700{--tw-text-opacity: 1;color:rgb(180 83 9 / var(--tw-text-opacity, 1))}.text-emerald-700{--tw-text-opacity: 1;color:rgb(4 120 87 / var(--tw-text-opacity, 1))}.text-rose-700{--tw-text-opacity: 1;color:rgb(190 18 60 / var(--tw-text-opacity, 1))}.text-sky-700{--tw-text-opacity: 1;color:rgb(3 105 161 / var(--tw-text-opacity, 1))}.text-slate-200{--tw-text-opacity: 1;color:rgb(226 232 240 / var(--tw-text-opacity, 1))}.text-slate-300{--tw-text-opacity: 1;color:rgb(203 213 225 / var(--tw-text-opacity, 1))}.text-slate-500{--tw-text-opacity: 1;color:rgb(100 116 139 / var(--tw-text-opacity, 1))}.text-slate-600{--tw-text-opacity: 1;color:rgb(71 85 105 / var(--tw-text-opacity, 1))}.text-slate-700{--tw-text-opacity: 1;color:rgb(51 65 85 / var(--tw-text-opacity, 1))}.text-slate-800{--tw-text-opacity: 1;color:rgb(30 41 59 / var(--tw-text-opacity, 1))}.text-slate-900{--tw-text-opacity: 1;color:rgb(15 23 42 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.underline{text-decoration-line:underline}.shadow-2xl{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.outline-none{outline:2px solid transparent;outline-offset:2px}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-200{transition-duration:.2s}.hover\\:bg-rose-50:hover{--tw-bg-opacity: 1;background-color:rgb(255 241 242 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-100:hover{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-50:hover{--tw-bg-opacity: 1;background-color:rgb(248 250 252 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-700:hover{--tw-bg-opacity: 1;background-color:rgb(51 65 85 / var(--tw-bg-opacity, 1))}.hover\\:bg-white:hover{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.focus\\:border-\\[var\\(--pw-accent\\)\\]:focus{border-color:var(--pw-accent)}.focus\\:border-slate-500:focus{--tw-border-opacity: 1;border-color:rgb(100 116 139 / var(--tw-border-opacity, 1))}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:bg-slate-100:disabled{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.disabled\\:bg-slate-400:disabled{--tw-bg-opacity: 1;background-color:rgb(148 163 184 / var(--tw-bg-opacity, 1))}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:opacity-60:disabled{opacity:.6}@media(min-width:768px){.md\\:col-span-2{grid-column:span 2 / span 2}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.md\\:grid-cols-\\[180px\\,1fr\\,auto\\]{grid-template-columns:180px 1fr auto}.md\\:flex-row{flex-direction:row}.md\\:items-center{align-items:center}.md\\:justify-between{justify-content:space-between}}@media(min-width:1024px){.lg\\:mb-0{margin-bottom:0}.lg\\:hidden{display:none}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:py-8{padding-top:2rem;padding-bottom:2rem}}', tu = ":root{--pw-background: #f8fafc;--pw-surface: #ffffff;--pw-border: #cbd5e1;--pw-text: #0f172a;--pw-muted-text: #475569;--pw-primary: #0f172a;--pw-tertiary: #334155;--pw-primary-text: #ffffff;--pw-accent: #0ea5e9;--pw-hero-background: #e2e8f0}html,body{height:100%;min-height:100%;margin:0;background-color:var(--pw-background);color:var(--pw-text)}#app{height:100%;min-height:100%}.cms-main-shell{padding-left:1.25rem;padding-right:1.25rem}", ia = "pif-warriors-cms-inline-styles";
function ru() {
  if (typeof document > "u" || document.getElementById(ia))
    return;
  const r = document.createElement("style");
  r.id = ia, r.setAttribute("data-source", "@elmuki/pif-warriors-cms"), r.textContent = `${eu}
${tu}`, document.head.appendChild(r);
}
let fi = null;
function nu(r) {
  fi = r;
}
function Se() {
  if (!fi)
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  return fi;
}
const os = "users";
async function su(r) {
  const { firestore: e } = Se(), t = Yt(e, os, r.uid);
  if (!(await is(t)).exists()) {
    await Xn(t, {
      email: r.email ?? "",
      role: null,
      lastLoginAt: Ze(),
      createdAt: Ze(),
      updatedAt: Ze()
    });
    return;
  }
  await Xn(
    t,
    {
      email: r.email ?? "",
      lastLoginAt: Ze(),
      updatedAt: Ze()
    },
    { merge: !0 }
  );
}
async function iu(r) {
  const { firestore: e } = Se(), t = await is(Yt(e, os, r));
  return t.exists() ? To(t.data().role) : null;
}
async function au() {
  const { firestore: r } = Se(), e = Ii(cr(r, os), Oi("email", "asc"));
  return (await jr(e)).docs.map((n) => ({
    id: n.id,
    email: String(n.data().email ?? ""),
    role: To(n.data().role),
    lastLoginAt: n.data().lastLoginAt,
    createdAt: n.data().createdAt,
    updatedAt: n.data().updatedAt
  }));
}
async function ou(r, e) {
  const { firestore: t } = Se();
  await Eo(Yt(t, os, r), {
    role: e,
    updatedAt: Ze()
  });
}
function To(r) {
  return r === "admin" || r === "writer" || r === "manager" ? r : null;
}
const dn = ee(null), ko = ee(!1), $r = ee(null);
let Wn = null, lu = new Promise((r) => {
  Wn = r;
}), aa = !1;
function uu() {
  if (aa)
    return;
  const { auth: r } = Se();
  dn.value = r.currentUser, Hl(r, async (e) => {
    dn.value = e, $r.value = null, e && await Ri(e), ko.value = !0, Wn && (Wn(), Wn = null);
  }), aa = !0;
}
async function cu() {
  ko.value || await lu;
}
async function du(r, e) {
  const { auth: t } = Se();
  await vo(t, xo);
  const n = await Gl(t, r, e);
  await Ri(n.user);
}
async function hu(r, e) {
  const { auth: t } = Se();
  await vo(t, xo);
  const n = await Kl(t, r, e);
  await Ri(n.user);
}
async function fu() {
  const { auth: r } = Se();
  await zl(r);
}
async function Ri(r) {
  try {
    await su(r), $r.value = await iu(r.uid);
  } catch (e) {
    console.error("No se pudo sincronizar el perfil del usuario:", e);
  }
}
let pi = {
  basePath: "/admin",
  loginPath: "/ingresar",
  registerPath: "/registro",
  homePath: "/"
};
function pu(r) {
  pi = {
    ...pi,
    ...r
  };
}
function $i() {
  return pi;
}
const mu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, gu = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, bu = ["disabled"], yu = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, vu = /* @__PURE__ */ Te({
  __name: "LoginPage",
  setup(r) {
    const e = as(), t = vn(), { basePath: n, registerPath: s } = $i(), i = ee(""), o = ee(""), l = ee(!1), u = ee("");
    async function d() {
      u.value = "", l.value = !0;
      try {
        await hu(i.value, o.value);
        const p = typeof e.query.redirect == "string" ? e.query.redirect : n;
        await t.push(p);
      } catch {
        u.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, b) => (I(), F("main", mu, [
      b[6] || (b[6] = v("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Ingresar", -1)),
      b[7] || (b[7] = v("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Accede para administrar contenido y esquemas.", -1)),
      v("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: an(d, ["prevent"])
      }, [
        v("div", null, [
          b[2] || (b[2] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          on(v("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [ln, i.value]
          ])
        ]),
        v("div", null, [
          b[3] || (b[3] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          on(v("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (h) => o.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "********"
          }, null, 512), [
            [ln, o.value]
          ])
        ]),
        u.value ? (I(), F("p", gu, X(u.value), 1)) : te("", !0),
        v("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, X(l.value ? "Ingresando..." : "Entrar"), 9, bu)
      ], 32),
      v("p", yu, [
        b[5] || (b[5] = Ye(" ¿No tienes cuenta? ", -1)),
        ut(Pe(Vt), {
          to: Pe(s),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Ut(() => [...b[4] || (b[4] = [
            Ye("Crear cuenta", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), xu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, wu = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Au = ["disabled"], Eu = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, Nu = /* @__PURE__ */ Te({
  __name: "RegisterPage",
  setup(r) {
    const e = vn(), { basePath: t, loginPath: n } = $i(), s = ee(""), i = ee(""), o = ee(""), l = ee(!1), u = ee("");
    async function d() {
      if (u.value = "", i.value !== o.value) {
        u.value = "Las contraseñas no coinciden.";
        return;
      }
      l.value = !0;
      try {
        await du(s.value, i.value), await e.push(t);
      } catch {
        u.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, b) => (I(), F("main", xu, [
      b[8] || (b[8] = v("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Crear cuenta", -1)),
      b[9] || (b[9] = v("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Registro para administrar contenido.", -1)),
      v("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: an(d, ["prevent"])
      }, [
        v("div", null, [
          b[3] || (b[3] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          on(v("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => s.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [ln, s.value]
          ])
        ]),
        v("div", null, [
          b[4] || (b[4] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          on(v("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (h) => i.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Mínimo 6 caracteres"
          }, null, 512), [
            [ln, i.value]
          ])
        ]),
        v("div", null, [
          b[5] || (b[5] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Confirmar contraseña", -1)),
          on(v("input", {
            "onUpdate:modelValue": b[2] || (b[2] = (h) => o.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [ln, o.value]
          ])
        ]),
        u.value ? (I(), F("p", wu, X(u.value), 1)) : te("", !0),
        v("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, X(l.value ? "Creando cuenta..." : "Registrarme"), 9, Au)
      ], 32),
      v("p", Eu, [
        b[7] || (b[7] = Ye(" ¿Ya tienes cuenta? ", -1)),
        ut(Pe(Vt), {
          to: Pe(n),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Ut(() => [...b[6] || (b[6] = [
            Ye("Iniciar sesión", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), So = "cmsSchemas", Co = "schema", _o = "main", Tu = 3e4;
let Zn = null, mi = 0, Jr = null;
async function Di() {
  const r = Date.now();
  if (Zn && r - mi < Tu)
    return Zn;
  if (Jr)
    return Jr;
  const { firestore: e } = Se();
  Jr = (async () => {
    const n = (await jr(cr(e, So))).docs.map((s) => {
      const i = s.data();
      return Lo({ ...i, id: s.id });
    }).sort((s, i) => s.title.localeCompare(i.title, "es"));
    return Zn = n, mi = Date.now(), n;
  })();
  try {
    return await Jr;
  } finally {
    Jr = null;
  }
}
async function ku(r) {
  const { firestore: e } = Se(), t = Lo(r), n = Yt(e, So, t.id);
  await Xn(
    n,
    {
      ...t,
      updatedAt: Ze(),
      createdAt: Ze()
    },
    { merge: !0 }
  ), Su();
}
function Su() {
  Zn = null, mi = 0;
}
function Lo(r) {
  const e = r;
  let t = [];
  const n = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((u) => Qn(u)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([u, d]) => Qn({ key: u, ...d })
  ));
  const s = typeof e.dictionaryDocumentId == "string" ? e.dictionaryDocumentId : "", i = typeof e.dictionaryRootKey == "string" ? e.dictionaryRootKey : "", o = n === "dictionary" ? Lu(s || _o) : "", l = n === "dictionary" ? qu(i || Co) : "";
  return {
    id: Cu(String(e.id ?? "tipo-contenido")),
    title: String(e.title ?? "Tipo de contenido"),
    description: typeof e.description == "string" ? e.description : "",
    storageType: n,
    collectionName: _u(String(e.collectionName ?? "registros")),
    dictionaryDocumentId: o,
    dictionaryRootKey: l,
    slugFromField: typeof e.slugFromField == "string" ? e.slugFromField : "",
    previewField: typeof e.previewField == "string" ? e.previewField : "",
    fields: t
  };
}
function Qn(r) {
  const e = Io(r.type), t = {
    key: Bi(String(r.key ?? "campo")),
    label: String(r.label ?? "Campo"),
    type: e,
    autogenerated: Ro(e, r.autogenerated),
    required: !!r.required,
    placeholder: typeof r.placeholder == "string" ? r.placeholder : "",
    helpText: typeof r.helpText == "string" ? r.helpText : "",
    options: Oo(r.options),
    documentSchemaId: e === "document" ? Do(typeof r.documentSchemaId == "string" ? r.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Bo(typeof r.documentLabelField == "string" ? r.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = qo(
    $o(r.itemSchema) ? r.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(r.mapFields) ? r.mapFields.map((n) => Qn(n)) : [] : delete t.mapFields, t;
}
function qo(r) {
  const e = Io(r.type), t = {
    type: e,
    autogenerated: Ro(e, r.autogenerated),
    required: !!r.required,
    placeholder: typeof r.placeholder == "string" ? r.placeholder : "",
    helpText: typeof r.helpText == "string" ? r.helpText : "",
    options: Oo(r.options),
    documentSchemaId: e === "document" ? Do(typeof r.documentSchemaId == "string" ? r.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Bo(typeof r.documentLabelField == "string" ? r.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = qo(
    $o(r.itemSchema) ? r.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(r.mapFields) ? r.mapFields.map((n) => Qn(n)) : [] : delete t.mapFields, t;
}
function Io(r) {
  return r === "date" || r === "numeric" || r === "id" || r === "textarea" || r === "richtext" || r === "image" || r === "select" || r === "document" || r === "boolean" || r === "array" || r === "map" ? r : "text";
}
function Oo(r) {
  return Array.isArray(r) ? r.map((e) => String(e).trim()).filter(Boolean) : [];
}
function Ro(r, e) {
  return typeof e == "boolean" ? e : r === "id";
}
function $o(r) {
  return !!r && typeof r == "object" && !Array.isArray(r);
}
function Bi(r) {
  return r.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function Cu(r) {
  return r.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function _u(r) {
  return Bi(r);
}
function Lu(r) {
  return String(r).trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || _o;
}
function qu(r) {
  return String(r).trim().replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "") || Co;
}
function Do(r) {
  return String(r).trim().replace(/[^a-zA-Z0-9_-]/g, "").replace(/-+/g, "-");
}
function Bo(r) {
  const e = String(r ?? "").trim();
  return e ? Bi(e) : "";
}
const Iu = { class: "cms-root-fixed-height overflow-hidden bg-slate-100" }, Ou = { class: "cms-sidebar-header mb-3 flex items-center justify-between lg:mb-0" }, Ru = { class: "text-sm font-black uppercase tracking-wide text-slate-700" }, $u = { class: "px-3" }, Du = { class: "cms-sidebar-scroll space-y-2" }, Bu = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Fu = { class: "flex items-start justify-between gap-2" }, Mu = { class: "material-symbols-outlined text-base leading-none" }, ju = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Pu = { class: "font-semibold" }, Uu = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Vu = {
  key: 1,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, zu = {
  key: 0,
  class: "space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3"
}, Hu = { class: "font-semibold" }, Ku = {
  key: 1,
  class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white"
}, Gu = { class: "flex items-start justify-between gap-2" }, Wu = { class: "material-symbols-outlined text-base leading-none" }, Zu = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Yu = { class: "font-semibold" }, Xu = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Qu = { class: "cms-sidebar-footer" }, Ju = { class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2" }, ec = {
  type: "button",
  class: "min-w-0 flex-1 rounded-md bg-white px-3 py-2 text-left text-xs text-slate-700"
}, tc = { class: "truncate text-slate-600" }, rc = { class: "mx-auto w-full max-w-7xl space-y-6" }, nc = { class: "text-xl font-black text-slate-900" }, sc = { class: "mt-3" }, oa = "cms-developer-mode", ic = /* @__PURE__ */ Te({
  __name: "AdminLayoutPage",
  setup(r) {
    const e = as(), t = vn(), { basePath: n, loginPath: s, homePath: i } = $i(), o = ee([]), l = ee(!1), u = ee(!0), d = ee(!0), p = ee(!0), b = ee(!1);
    yn(async () => {
      await h(), typeof window < "u" && window.innerWidth < 1024 && (p.value = !1), typeof window < "u" && (b.value = window.localStorage.getItem(oa) === "true", M()), window.addEventListener("cms-schemas-updated", j);
    }), wo(() => {
      window.removeEventListener("cms-schemas-updated", j);
    }), Wt(
      () => e.fullPath,
      () => {
        e.path.startsWith(`${n}/content`) && (u.value = !0, h()), e.path.startsWith(`${n}/schemas`) && (d.value = !0, h()), typeof window < "u" && window.innerWidth < 1024 && (p.value = !1), M();
      }
    ), Wt(b, (D) => {
      typeof window < "u" && window.localStorage.setItem(oa, D ? "true" : "false"), M();
    });
    async function h() {
      l.value = !0;
      try {
        o.value = await Di();
      } finally {
        l.value = !1;
      }
    }
    const w = Oe(() => e.path.startsWith(`${n}/content`)), E = Oe(() => e.path.startsWith(`${n}/schemas`)), C = Oe(() => o.value.filter((D) => D.storageType === "document")), L = Oe(() => o.value.filter((D) => D.storageType === "dictionary"));
    function R(D) {
      return e.path.startsWith(D);
    }
    function j() {
      h();
    }
    function z(D) {
      return {
        path: `${n}/content`,
        query: { schema: D }
      };
    }
    function Q(D) {
      return {
        path: `${n}/schemas`,
        query: { schema: D }
      };
    }
    function K(D) {
      if (!w.value)
        return !1;
      const T = typeof e.query.schema == "string" ? e.query.schema : "";
      return T ? T === D : o.value[0]?.id === D;
    }
    function ae(D) {
      if (!E.value)
        return !1;
      const T = typeof e.query.schema == "string" ? e.query.schema : "";
      return T ? T === D : o.value[0]?.id === D;
    }
    function ie() {
      u.value = !u.value;
    }
    function be() {
      d.value = !d.value;
    }
    function Ae() {
      p.value = !p.value;
    }
    function we() {
      b.value = !b.value;
    }
    function y() {
      p.value = !1;
    }
    async function M() {
      b.value || (e.path.startsWith(`${n}/schemas`) || e.path.startsWith(`${n}/users`)) && await t.replace(`${n}/content`);
    }
    function k(D) {
      return /^(https?:)?\/\//i.test(D);
    }
    async function _() {
      if (i) {
        if (k(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await t.push(i);
      }
    }
    async function f() {
      await fu(), await t.push(s);
    }
    const A = Oe(() => dn.value?.email || "Sin correo"), S = Oe(() => {
      try {
        const D = Se().auth.app.options.projectId;
        if (typeof D == "string" && D.trim().length > 0)
          return D;
      } catch {
      }
      return "Panel";
    }), P = Oe(() => {
      if (e.path.startsWith(`${n}/content`)) {
        const D = typeof e.query.schema == "string" ? e.query.schema : "", T = o.value.find((N) => N.id === D) ?? o.value[0] ?? null;
        return T ? `Contenido · ${T.title}` : "Contenido";
      }
      return e.path.startsWith(`${n}/schemas`) ? b.value ? "Esquemas" : "Contenido" : e.path.startsWith(`${n}/users`) ? b.value ? "Usuarios" : "Contenido" : "Dashboard";
    });
    return (D, T) => (I(), F("main", Iu, [
      p.value ? te("", !0) : (I(), F("button", {
        key: 0,
        type: "button",
        "aria-label": "Abrir sidebar",
        class: "fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg border border-l-0 border-slate-300 bg-white px-2 py-3 text-slate-700 shadow-lg hover:bg-slate-50",
        onClick: Ae
      }, [...T[0] || (T[0] = [
        v("span", { class: "material-symbols-outlined text-lg" }, "left_panel_open", -1)
      ])])),
      p.value ? (I(), F("div", {
        key: 1,
        class: "fixed inset-0 z-30 bg-slate-900/20 lg:hidden",
        onClick: y
      })) : te("", !0),
      v("aside", {
        class: Je(["cms-sidebar-panel cms-sidebar-fixed-height fixed inset-y-0 left-0 z-40 w-80 border-r border-slate-200 bg-white shadow-xl transition-transform duration-200", p.value ? "cms-sidebar-open" : "cms-sidebar-closed"])
      }, [
        v("div", Ou, [
          v("h2", Ru, X(S.value), 1),
          v("div", { class: "flex items-center gap-2" }, [
            v("button", {
              type: "button",
              "aria-label": "Ir a inicio",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: _
            }, [...T[1] || (T[1] = [
              v("span", { class: "material-symbols-outlined text-lg" }, "home", -1)
            ])]),
            v("button", {
              type: "button",
              "aria-label": "Cerrar sidebar",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: y
            }, [...T[2] || (T[2] = [
              v("span", { class: "material-symbols-outlined text-lg" }, "left_panel_close", -1)
            ])])
          ])
        ]),
        v("div", $u, [
          v("button", {
            type: "button",
            class: "mb-2 flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50",
            onClick: we
          }, [
            T[3] || (T[3] = v("span", null, "Modo desarrollador", -1)),
            v("span", {
              class: Je(["rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", b.value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"])
            }, X(b.value ? "Activo" : "Oculto"), 3)
          ])
        ]),
        v("div", Du, [
          v("div", Bu, [
            v("div", Fu, [
              ut(Pe(Vt), {
                to: `${Pe(n)}/content`,
                class: "min-w-0 flex-1"
              }, {
                default: Ut(() => [...T[4] || (T[4] = [
                  v("p", { class: "text-sm font-black" }, "Contenido", -1),
                  v("p", { class: "text-xs text-slate-500" }, " Formularios y registros ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              v("button", {
                type: "button",
                "aria-label": "Expandir o contraer contenido",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: ie
              }, [
                v("span", Mu, X(u.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            u.value ? (I(), F("div", ju, [
              (I(!0), F(Re, null, $e(L.value, (N) => (I(), _e(Pe(Vt), {
                key: N.id,
                to: z(N.id),
                class: Je([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  K(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Ut(() => [
                  v("p", Pu, X(N.title), 1),
                  v("p", {
                    class: Je(K(N.id) ? "text-slate-300" : "text-slate-500")
                  }, X(N.storageType) + " · " + X(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (I(), F("p", Uu, " Cargando elementos... ")) : L.value.length ? te("", !0) : (I(), F("p", Vu, " No hay diccionarios configurados. "))
            ])) : te("", !0)
          ]),
          C.value.length ? (I(), F("div", zu, [
            T[5] || (T[5] = v("p", { class: "px-1 text-[11px] font-black uppercase tracking-wide text-slate-500" }, "Documentos", -1)),
            (I(!0), F(Re, null, $e(C.value, (N) => (I(), _e(Pe(Vt), {
              key: `document-link-${N.id}`,
              to: z(N.id),
              class: Je([
                "block rounded-lg border px-2 py-1.5 text-xs transition",
                K(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              ])
            }, {
              default: Ut(() => [
                v("p", Hu, X(N.title), 1),
                v("p", {
                  class: Je(K(N.id) ? "text-slate-300" : "text-slate-500")
                }, " document · " + X(N.collectionName), 3)
              ]),
              _: 2
            }, 1032, ["to", "class"]))), 128))
          ])) : te("", !0),
          b.value ? (I(), F("div", Ku, [
            v("div", Gu, [
              ut(Pe(Vt), {
                to: `${Pe(n)}/schemas`,
                class: "min-w-0 flex-1"
              }, {
                default: Ut(() => [...T[6] || (T[6] = [
                  v("p", { class: "text-sm font-black" }, "Esquemas", -1),
                  v("p", { class: "text-xs text-slate-500" }, " Edición de esquemas ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              v("button", {
                type: "button",
                "aria-label": "Expandir o contraer esquemas",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: be
              }, [
                v("span", Wu, X(d.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            d.value ? (I(), F("div", Zu, [
              (I(!0), F(Re, null, $e(o.value, (N) => (I(), _e(Pe(Vt), {
                key: `schema-edit-${N.id}`,
                to: Q(N.id),
                class: Je([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  ae(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Ut(() => [
                  v("p", Yu, X(N.title), 1),
                  v("p", {
                    class: Je(ae(N.id) ? "text-slate-300" : "text-slate-500")
                  }, X(N.storageType) + " · " + X(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (I(), F("p", Xu, " Cargando elementos... ")) : te("", !0)
            ])) : te("", !0)
          ])) : te("", !0),
          b.value ? (I(), _e(Pe(Vt), {
            key: 2,
            to: `${Pe(n)}/users`,
            class: Je([
              "block rounded-xl border p-3 transition",
              R(`${Pe(n)}/users`) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            ])
          }, {
            default: Ut(() => [
              T[7] || (T[7] = v("p", { class: "text-sm font-black" }, "Usuarios", -1)),
              v("p", {
                class: Je(["text-xs", R(`${Pe(n)}/users`) ? "text-slate-200" : "text-slate-500"])
              }, " Roles y último ingreso ", 2)
            ]),
            _: 1
          }, 8, ["to", "class"])) : te("", !0)
        ]),
        v("div", Qu, [
          v("div", Ju, [
            v("button", ec, [
              T[8] || (T[8] = v("p", { class: "font-semibold text-slate-900" }, "Cuenta actual", -1)),
              v("p", tc, X(A.value), 1)
            ]),
            v("button", {
              type: "button",
              "aria-label": "Cerrar sesión",
              class: "rounded-md border border-slate-300 bg-white px-2 py-2 text-slate-700 hover:bg-slate-100",
              onClick: f
            }, [...T[9] || (T[9] = [
              v("span", { class: "material-symbols-outlined text-lg" }, "logout", -1)
            ])])
          ])
        ])
      ], 2),
      v("section", {
        class: Je(["cms-content-fixed-height min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8", p.value ? "cms-content-with-open-sidebar" : ""])
      }, [
        v("div", rc, [
          T[10] || (T[10] = v("section", null, [
            v("h1", { class: "text-3xl font-black text-slate-900" }, "Dashboard"),
            v("p", { class: "mt-2 text-sm text-slate-600" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          v("section", null, [
            v("h2", nc, X(P.value), 1),
            v("div", sc, [
              ut(Pe(Yl))
            ])
          ])
        ])
      ], 2)
    ]));
  }
}), ac = (r, e) => {
  const t = r.__vccOpts || r;
  for (const [n, s] of e)
    t[n] = s;
  return t;
}, oc = /* @__PURE__ */ ac(ic, [["__scopeId", "data-v-effd6d4a"]]), lc = { class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700" }, uc = ["checked", "disabled"], cc = /* @__PURE__ */ Te({
  name: "BooleanFieldInput",
  __name: "BooleanFieldInput",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = e;
    return (n, s) => (I(), F("label", lc, [
      v("input", {
        checked: r.modelValue,
        type: "checkbox",
        disabled: r.disabled,
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.checked))
      }, null, 40, uc),
      s[1] || (s[1] = Ye(" Activo ", -1))
    ]));
  }
}), dc = { class: "space-y-2" }, hc = {
  key: 0,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, fc = { class: "block text-xs font-semibold uppercase tracking-wide text-slate-500" }, pc = {
  key: 0,
  class: "text-xs text-slate-500"
}, mc = {
  key: 0,
  class: "space-y-2"
}, gc = ["value", "disabled", "onChange"], bc = ["value", "disabled", "onInput"], yc = ["disabled", "onClick"], vc = ["disabled"], xc = {
  key: 1,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, wc = { class: "flex items-center justify-between" }, Ac = { class: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, Ec = ["disabled", "onClick"], Nc = ["disabled"], Tc = {
  key: 2,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, kc = ["checked", "disabled"], Sc = ["value", "placeholder", "disabled"], Cc = ["value", "disabled"], _c = ["value"], Lc = ["value", "placeholder", "disabled"], qc = ["value", "step", "placeholder", "disabled"], Ic = ["value", "placeholder", "disabled"], Oc = /* @__PURE__ */ Te({
  name: "CmsNestedValueEditor",
  __name: "CmsNestedValueEditor",
  props: {
    schema: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = r, n = e, s = Oe(
      () => Array.isArray(t.schema.mapFields) ? t.schema.mapFields : []
    ), i = Oe(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), o = Oe(() => d(t.modelValue)), l = Oe(() => Array.isArray(t.modelValue) ? t.modelValue : []), u = Oe(() => Object.entries(o.value));
    function d(_) {
      return _ && typeof _ == "object" && !Array.isArray(_) ? _ : {};
    }
    function p(_) {
      return _.type === "array" ? [] : _.type === "map" ? {} : _.type === "boolean" ? !1 : _.type === "date" ? "" : _.type === "numeric" || _.type === "id" ? null : "";
    }
    function b(_, f) {
      n("update:modelValue", {
        ...o.value,
        [_]: f
      });
    }
    function h() {
      n("update:modelValue", [...l.value, p(i.value)]);
    }
    function w(_) {
      const f = [...l.value];
      f.splice(_, 1), n("update:modelValue", f);
    }
    function E(_, f) {
      const A = [...l.value];
      A[_] = f, n("update:modelValue", A);
    }
    function C(_) {
      n("update:modelValue", _);
    }
    function L(_) {
      n("update:modelValue", _);
    }
    function R(_) {
      if (!_.trim()) {
        n("update:modelValue", null);
        return;
      }
      const f = Number(_);
      n("update:modelValue", Number.isFinite(f) ? f : null);
    }
    function j(_) {
      if (typeof _ == "number" && Number.isFinite(_))
        return String(_);
      if (typeof _ == "string") {
        const f = _.trim();
        if (!f)
          return "";
        const A = Number(f);
        if (Number.isFinite(A))
          return String(A);
      }
      return "";
    }
    function z(_) {
      n("update:modelValue", y(_));
    }
    function Q(_) {
      return y(_);
    }
    function K() {
      const _ = o.value;
      let f = 1, A = `campo_${f}`;
      for (; A in _; )
        f += 1, A = `campo_${f}`;
      n("update:modelValue", {
        ..._,
        [A]: ""
      });
    }
    function ae(_) {
      const f = { ...o.value };
      delete f[_], n("update:modelValue", f);
    }
    function ie(_, f) {
      const A = f.trim();
      if (!A || A === _)
        return;
      const S = { ...o.value }, P = S[_];
      delete S[_], S[A] = P, n("update:modelValue", S);
    }
    function be(_, f) {
      const A = { ...o.value };
      A[_] = we(f), n("update:modelValue", A);
    }
    function Ae(_) {
      if (typeof _ == "string")
        return _;
      if (_ == null)
        return "";
      try {
        return JSON.stringify(_);
      } catch {
        return String(_);
      }
    }
    function we(_) {
      const f = _.trim();
      if (!f)
        return "";
      if (f.startsWith("{") && f.endsWith("}") || f.startsWith("[") && f.endsWith("]"))
        try {
          return JSON.parse(f);
        } catch {
          return _;
        }
      return _;
    }
    function y(_) {
      if (typeof _ == "string") {
        const f = _.trim();
        if (!f)
          return "";
        const A = M(f);
        if (A)
          return k(A);
        const S = new Date(f);
        return Number.isNaN(S.getTime()) ? "" : k(S);
      }
      if (_ instanceof Date && !Number.isNaN(_.getTime()))
        return k(_);
      if (_ && typeof _ == "object" && "toDate" in _ && typeof _.toDate == "function") {
        const f = _.toDate();
        if (f instanceof Date && !Number.isNaN(f.getTime()))
          return k(f);
      }
      return "";
    }
    function M(_) {
      const f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(_);
      if (!f)
        return null;
      const A = Number(f[1]), S = Number(f[2]), P = Number(f[3]), D = new Date(Date.UTC(A, S - 1, P));
      return D.getUTCFullYear() !== A || D.getUTCMonth() + 1 !== S || D.getUTCDate() !== P ? null : D;
    }
    function k(_) {
      const f = String(_.getUTCFullYear()).padStart(4, "0"), A = String(_.getUTCMonth() + 1).padStart(2, "0"), S = String(_.getUTCDate()).padStart(2, "0");
      return `${f}-${A}-${S}`;
    }
    return (_, f) => {
      const A = Ao("CmsNestedValueEditor", !0);
      return I(), F("div", dc, [
        r.schema.type === "map" ? (I(), F("section", hc, [
          (I(!0), F(Re, null, $e(s.value, (S) => (I(), F("article", {
            key: S.key,
            class: "space-y-1 rounded-md border border-slate-200 bg-white p-3"
          }, [
            v("label", fc, X(S.label), 1),
            S.helpText ? (I(), F("p", pc, X(S.helpText), 1)) : te("", !0),
            ut(A, {
              schema: S,
              "model-value": o.value[S.key],
              disabled: r.disabled,
              "onUpdate:modelValue": (P) => b(S.key, P)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          s.value.length ? te("", !0) : (I(), F("div", mc, [
            (I(!0), F(Re, null, $e(u.value, ([S, P]) => (I(), F("article", {
              key: S,
              class: "grid gap-2 rounded-md border border-slate-200 bg-white p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              v("input", {
                value: S,
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: r.disabled,
                onChange: (D) => ie(S, D.target.value)
              }, null, 40, gc),
              v("input", {
                value: Ae(P),
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: r.disabled,
                onInput: (D) => be(S, D.target.value)
              }, null, 40, bc),
              v("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: r.disabled,
                onClick: (D) => ae(S)
              }, " Quitar ", 8, yc)
            ]))), 128)),
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
              disabled: r.disabled,
              onClick: K
            }, " Agregar item ", 8, vc),
            f[6] || (f[6] = v("p", { class: "text-xs text-slate-500" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : r.schema.type === "array" ? (I(), F("section", xc, [
          (I(!0), F(Re, null, $e(l.value, (S, P) => (I(), F("article", {
            key: P,
            class: "space-y-2 rounded-md border border-slate-200 bg-white p-3"
          }, [
            v("div", wc, [
              v("p", Ac, "Item " + X(P + 1), 1),
              v("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: r.disabled,
                onClick: (D) => w(P)
              }, " Quitar ", 8, Ec)
            ]),
            ut(A, {
              schema: i.value,
              "model-value": S,
              disabled: r.disabled,
              "onUpdate:modelValue": (D) => E(P, D)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          v("button", {
            type: "button",
            class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
            disabled: r.disabled,
            onClick: h
          }, " Agregar item ", 8, Nc)
        ])) : r.schema.type === "boolean" ? (I(), F("label", Tc, [
          v("input", {
            type: "checkbox",
            checked: !!r.modelValue,
            disabled: r.disabled,
            onChange: f[0] || (f[0] = (S) => L(S.target.checked))
          }, null, 40, kc),
          f[7] || (f[7] = Ye(" Activo ", -1))
        ])) : r.schema.type === "textarea" || r.schema.type === "richtext" ? (I(), F("textarea", {
          key: 3,
          value: typeof r.modelValue == "string" ? r.modelValue : "",
          rows: "4",
          placeholder: r.schema.placeholder || "",
          disabled: r.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[1] || (f[1] = (S) => C(S.target.value))
        }, null, 40, Sc)) : r.schema.type === "select" ? (I(), F("select", {
          key: 4,
          value: typeof r.modelValue == "string" ? r.modelValue : "",
          disabled: r.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onChange: f[2] || (f[2] = (S) => C(S.target.value))
        }, [
          f[8] || (f[8] = v("option", { value: "" }, "Selecciona una opción", -1)),
          (I(!0), F(Re, null, $e(r.schema.options || [], (S) => (I(), F("option", {
            key: S,
            value: S
          }, X(S), 9, _c))), 128))
        ], 40, Cc)) : r.schema.type === "date" ? (I(), F("input", {
          key: 5,
          value: Q(r.modelValue),
          type: "date",
          placeholder: r.schema.placeholder || "",
          disabled: r.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[3] || (f[3] = (S) => z(S.target.value))
        }, null, 40, Lc)) : r.schema.type === "numeric" || r.schema.type === "id" ? (I(), F("input", {
          key: 6,
          value: j(r.modelValue),
          type: "number",
          step: r.schema.type === "id" ? "1" : "any",
          placeholder: r.schema.placeholder || "",
          disabled: r.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[4] || (f[4] = (S) => R(S.target.value))
        }, null, 40, qc)) : (I(), F("input", {
          key: 7,
          value: typeof r.modelValue == "string" ? r.modelValue : "",
          type: "text",
          placeholder: r.schema.placeholder || "",
          disabled: r.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[5] || (f[5] = (S) => C(S.target.value))
        }, null, 40, Ic))
      ]);
    };
  }
}), Rc = /* @__PURE__ */ Te({
  name: "ComplexFieldInput",
  __name: "ComplexFieldInput",
  props: {
    field: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = e;
    return (n, s) => (I(), _e(Oc, {
      schema: r.field,
      "model-value": r.modelValue,
      disabled: r.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["schema", "model-value", "disabled"]));
  }
}), $c = ["value", "placeholder", "disabled"], Dc = /* @__PURE__ */ Te({
  name: "DateFieldInput",
  __name: "DateFieldInput",
  props: {
    modelValue: {},
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = e;
    return (n, s) => (I(), F("input", {
      value: r.modelValue,
      type: "date",
      placeholder: r.placeholder,
      disabled: r.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, $c));
  }
}), Bc = { class: "space-y-2" }, Fc = ["value", "disabled"], Mc = ["value"], jc = {
  key: 0,
  class: "text-xs text-slate-500"
}, Pc = /* @__PURE__ */ Te({
  name: "DocumentFieldInput",
  __name: "DocumentFieldInput",
  props: {
    modelValue: {},
    options: { default: () => [] },
    hint: { default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = e;
    return (n, s) => (I(), F("div", Bc, [
      v("select", {
        value: r.modelValue,
        disabled: r.disabled,
        class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
      }, [
        s[1] || (s[1] = v("option", { value: "" }, "Selecciona un documento", -1)),
        (I(!0), F(Re, null, $e(r.options, (i) => (I(), F("option", {
          key: i.id,
          value: i.id
        }, X(i.label), 9, Mc))), 128))
      ], 40, Fc),
      r.hint ? (I(), F("p", jc, X(r.hint), 1)) : te("", !0)
    ]));
  }
}), Uc = { class: "space-y-2" }, Vc = ["disabled"], zc = {
  key: 0,
  class: "text-xs text-slate-500 break-all"
}, Hc = ["src"], Kc = ["disabled"], Gc = /* @__PURE__ */ Te({
  name: "ImageFieldInput",
  __name: "ImageFieldInput",
  props: {
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:file", "remove"],
  setup(r, { emit: e }) {
    const t = e;
    function n(s) {
      const i = s.target;
      t("update:file", i.files?.[0] ?? null);
    }
    return (s, i) => (I(), F("div", Uc, [
      v("input", {
        type: "file",
        accept: "image/*",
        disabled: r.disabled,
        class: "block w-full text-sm text-slate-600 disabled:opacity-60",
        onChange: n
      }, null, 40, Vc),
      r.modelValue ? (I(), F("p", zc, " URL actual: " + X(r.modelValue), 1)) : te("", !0),
      r.modelValue ? (I(), F("img", {
        key: 1,
        src: r.modelValue,
        alt: "Vista previa",
        class: "max-h-32 rounded-md border border-slate-200 object-cover"
      }, null, 8, Hc)) : te("", !0),
      r.modelValue ? (I(), F("button", {
        key: 2,
        type: "button",
        class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50",
        disabled: r.disabled,
        onClick: i[0] || (i[0] = (o) => t("remove"))
      }, " Quitar URL ", 8, Kc)) : te("", !0)
    ]));
  }
}), Wc = ["value", "step", "min", "placeholder", "disabled"], Zc = /* @__PURE__ */ Te({
  name: "NumericFieldInput",
  __name: "NumericFieldInput",
  props: {
    modelValue: {},
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 },
    step: { default: "any" },
    min: { default: null }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = e;
    return (n, s) => (I(), F("input", {
      value: r.modelValue,
      type: "number",
      step: r.step,
      min: r.min ?? void 0,
      placeholder: r.placeholder,
      disabled: r.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, Wc));
  }
});
var Fo = typeof global == "object" && global && global.Object === Object && global, Yc = typeof self == "object" && self && self.Object === Object && self, xt = Fo || Yc || Function("return this")(), Zt = xt.Symbol, Mo = Object.prototype, Xc = Mo.hasOwnProperty, Qc = Mo.toString, en = Zt ? Zt.toStringTag : void 0;
function Jc(r) {
  var e = Xc.call(r, en), t = r[en];
  try {
    r[en] = void 0;
    var n = !0;
  } catch {
  }
  var s = Qc.call(r);
  return n && (e ? r[en] = t : delete r[en]), s;
}
var ed = Object.prototype, td = ed.toString;
function rd(r) {
  return td.call(r);
}
var nd = "[object Null]", sd = "[object Undefined]", la = Zt ? Zt.toStringTag : void 0;
function Vr(r) {
  return r == null ? r === void 0 ? sd : nd : la && la in Object(r) ? Jc(r) : rd(r);
}
function Ot(r) {
  return r != null && typeof r == "object";
}
var dr = Array.isArray;
function Xt(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
function jo(r) {
  return r;
}
var id = "[object AsyncFunction]", ad = "[object Function]", od = "[object GeneratorFunction]", ld = "[object Proxy]";
function Fi(r) {
  if (!Xt(r))
    return !1;
  var e = Vr(r);
  return e == ad || e == od || e == id || e == ld;
}
var Js = xt["__core-js_shared__"], ua = (function() {
  var r = /[^.]+$/.exec(Js && Js.keys && Js.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
})();
function ud(r) {
  return !!ua && ua in r;
}
var cd = Function.prototype, dd = cd.toString;
function mr(r) {
  if (r != null) {
    try {
      return dd.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var hd = /[\\^$.*+?()[\]{}|]/g, fd = /^\[object .+?Constructor\]$/, pd = Function.prototype, md = Object.prototype, gd = pd.toString, bd = md.hasOwnProperty, yd = RegExp(
  "^" + gd.call(bd).replace(hd, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function vd(r) {
  if (!Xt(r) || ud(r))
    return !1;
  var e = Fi(r) ? yd : fd;
  return e.test(mr(r));
}
function xd(r, e) {
  return r?.[e];
}
function gr(r, e) {
  var t = xd(r, e);
  return vd(t) ? t : void 0;
}
var gi = gr(xt, "WeakMap"), ca = Object.create, wd = /* @__PURE__ */ (function() {
  function r() {
  }
  return function(e) {
    if (!Xt(e))
      return {};
    if (ca)
      return ca(e);
    r.prototype = e;
    var t = new r();
    return r.prototype = void 0, t;
  };
})();
function Ad(r, e, t) {
  switch (t.length) {
    case 0:
      return r.call(e);
    case 1:
      return r.call(e, t[0]);
    case 2:
      return r.call(e, t[0], t[1]);
    case 3:
      return r.call(e, t[0], t[1], t[2]);
  }
  return r.apply(e, t);
}
function Ed(r, e) {
  var t = -1, n = r.length;
  for (e || (e = Array(n)); ++t < n; )
    e[t] = r[t];
  return e;
}
var Nd = 800, Td = 16, kd = Date.now;
function Sd(r) {
  var e = 0, t = 0;
  return function() {
    var n = kd(), s = Td - (n - t);
    if (t = n, s > 0) {
      if (++e >= Nd)
        return arguments[0];
    } else
      e = 0;
    return r.apply(void 0, arguments);
  };
}
function Cd(r) {
  return function() {
    return r;
  };
}
var Jn = (function() {
  try {
    var r = gr(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
})(), _d = Jn ? function(r, e) {
  return Jn(r, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Cd(e),
    writable: !0
  });
} : jo, Ld = Sd(_d);
function qd(r, e) {
  for (var t = -1, n = r == null ? 0 : r.length; ++t < n && e(r[t], t, r) !== !1; )
    ;
  return r;
}
var Id = 9007199254740991, Od = /^(?:0|[1-9]\d*)$/;
function Po(r, e) {
  var t = typeof r;
  return e = e ?? Id, !!e && (t == "number" || t != "symbol" && Od.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
function Mi(r, e, t) {
  e == "__proto__" && Jn ? Jn(r, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : r[e] = t;
}
function xn(r, e) {
  return r === e || r !== r && e !== e;
}
var Rd = Object.prototype, $d = Rd.hasOwnProperty;
function Uo(r, e, t) {
  var n = r[e];
  (!($d.call(r, e) && xn(n, t)) || t === void 0 && !(e in r)) && Mi(r, e, t);
}
function Dd(r, e, t, n) {
  var s = !t;
  t || (t = {});
  for (var i = -1, o = e.length; ++i < o; ) {
    var l = e[i], u = void 0;
    u === void 0 && (u = r[l]), s ? Mi(t, l, u) : Uo(t, l, u);
  }
  return t;
}
var da = Math.max;
function Bd(r, e, t) {
  return e = da(e === void 0 ? r.length - 1 : e, 0), function() {
    for (var n = arguments, s = -1, i = da(n.length - e, 0), o = Array(i); ++s < i; )
      o[s] = n[e + s];
    s = -1;
    for (var l = Array(e + 1); ++s < e; )
      l[s] = n[s];
    return l[e] = t(o), Ad(r, this, l);
  };
}
function Fd(r, e) {
  return Ld(Bd(r, e, jo), r + "");
}
var Md = 9007199254740991;
function Vo(r) {
  return typeof r == "number" && r > -1 && r % 1 == 0 && r <= Md;
}
function ls(r) {
  return r != null && Vo(r.length) && !Fi(r);
}
function jd(r, e, t) {
  if (!Xt(t))
    return !1;
  var n = typeof e;
  return (n == "number" ? ls(t) && Po(e, t.length) : n == "string" && e in t) ? xn(t[e], r) : !1;
}
function Pd(r) {
  return Fd(function(e, t) {
    var n = -1, s = t.length, i = s > 1 ? t[s - 1] : void 0, o = s > 2 ? t[2] : void 0;
    for (i = r.length > 3 && typeof i == "function" ? (s--, i) : void 0, o && jd(t[0], t[1], o) && (i = s < 3 ? void 0 : i, s = 1), e = Object(e); ++n < s; ) {
      var l = t[n];
      l && r(e, l, n, i);
    }
    return e;
  });
}
var Ud = Object.prototype;
function ji(r) {
  var e = r && r.constructor, t = typeof e == "function" && e.prototype || Ud;
  return r === t;
}
function Vd(r, e) {
  for (var t = -1, n = Array(r); ++t < r; )
    n[t] = e(t);
  return n;
}
var zd = "[object Arguments]";
function ha(r) {
  return Ot(r) && Vr(r) == zd;
}
var zo = Object.prototype, Hd = zo.hasOwnProperty, Kd = zo.propertyIsEnumerable, bi = ha(/* @__PURE__ */ (function() {
  return arguments;
})()) ? ha : function(r) {
  return Ot(r) && Hd.call(r, "callee") && !Kd.call(r, "callee");
};
function Gd() {
  return !1;
}
var Ho = typeof exports == "object" && exports && !exports.nodeType && exports, fa = Ho && typeof module == "object" && module && !module.nodeType && module, Wd = fa && fa.exports === Ho, pa = Wd ? xt.Buffer : void 0, Zd = pa ? pa.isBuffer : void 0, hn = Zd || Gd, Yd = "[object Arguments]", Xd = "[object Array]", Qd = "[object Boolean]", Jd = "[object Date]", eh = "[object Error]", th = "[object Function]", rh = "[object Map]", nh = "[object Number]", sh = "[object Object]", ih = "[object RegExp]", ah = "[object Set]", oh = "[object String]", lh = "[object WeakMap]", uh = "[object ArrayBuffer]", ch = "[object DataView]", dh = "[object Float32Array]", hh = "[object Float64Array]", fh = "[object Int8Array]", ph = "[object Int16Array]", mh = "[object Int32Array]", gh = "[object Uint8Array]", bh = "[object Uint8ClampedArray]", yh = "[object Uint16Array]", vh = "[object Uint32Array]", xe = {};
xe[dh] = xe[hh] = xe[fh] = xe[ph] = xe[mh] = xe[gh] = xe[bh] = xe[yh] = xe[vh] = !0;
xe[Yd] = xe[Xd] = xe[uh] = xe[Qd] = xe[ch] = xe[Jd] = xe[eh] = xe[th] = xe[rh] = xe[nh] = xe[sh] = xe[ih] = xe[ah] = xe[oh] = xe[lh] = !1;
function xh(r) {
  return Ot(r) && Vo(r.length) && !!xe[Vr(r)];
}
function Pi(r) {
  return function(e) {
    return r(e);
  };
}
var Ko = typeof exports == "object" && exports && !exports.nodeType && exports, un = Ko && typeof module == "object" && module && !module.nodeType && module, wh = un && un.exports === Ko, ei = wh && Fo.process, Pr = (function() {
  try {
    var r = un && un.require && un.require("util").types;
    return r || ei && ei.binding && ei.binding("util");
  } catch {
  }
})(), ma = Pr && Pr.isTypedArray, Ui = ma ? Pi(ma) : xh, Ah = Object.prototype, Eh = Ah.hasOwnProperty;
function Go(r, e) {
  var t = dr(r), n = !t && bi(r), s = !t && !n && hn(r), i = !t && !n && !s && Ui(r), o = t || n || s || i, l = o ? Vd(r.length, String) : [], u = l.length;
  for (var d in r)
    (e || Eh.call(r, d)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Po(d, u))) && l.push(d);
  return l;
}
function Wo(r, e) {
  return function(t) {
    return r(e(t));
  };
}
var Nh = Wo(Object.keys, Object), Th = Object.prototype, kh = Th.hasOwnProperty;
function Sh(r) {
  if (!ji(r))
    return Nh(r);
  var e = [];
  for (var t in Object(r))
    kh.call(r, t) && t != "constructor" && e.push(t);
  return e;
}
function Ch(r) {
  return ls(r) ? Go(r) : Sh(r);
}
function _h(r) {
  var e = [];
  if (r != null)
    for (var t in Object(r))
      e.push(t);
  return e;
}
var Lh = Object.prototype, qh = Lh.hasOwnProperty;
function Ih(r) {
  if (!Xt(r))
    return _h(r);
  var e = ji(r), t = [];
  for (var n in r)
    n == "constructor" && (e || !qh.call(r, n)) || t.push(n);
  return t;
}
function Zo(r) {
  return ls(r) ? Go(r, !0) : Ih(r);
}
var fn = gr(Object, "create");
function Oh() {
  this.__data__ = fn ? fn(null) : {}, this.size = 0;
}
function Rh(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var $h = "__lodash_hash_undefined__", Dh = Object.prototype, Bh = Dh.hasOwnProperty;
function Fh(r) {
  var e = this.__data__;
  if (fn) {
    var t = e[r];
    return t === $h ? void 0 : t;
  }
  return Bh.call(e, r) ? e[r] : void 0;
}
var Mh = Object.prototype, jh = Mh.hasOwnProperty;
function Ph(r) {
  var e = this.__data__;
  return fn ? e[r] !== void 0 : jh.call(e, r);
}
var Uh = "__lodash_hash_undefined__";
function Vh(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = fn && e === void 0 ? Uh : e, this;
}
function hr(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var n = r[e];
    this.set(n[0], n[1]);
  }
}
hr.prototype.clear = Oh;
hr.prototype.delete = Rh;
hr.prototype.get = Fh;
hr.prototype.has = Ph;
hr.prototype.set = Vh;
function zh() {
  this.__data__ = [], this.size = 0;
}
function us(r, e) {
  for (var t = r.length; t--; )
    if (xn(r[t][0], e))
      return t;
  return -1;
}
var Hh = Array.prototype, Kh = Hh.splice;
function Gh(r) {
  var e = this.__data__, t = us(e, r);
  if (t < 0)
    return !1;
  var n = e.length - 1;
  return t == n ? e.pop() : Kh.call(e, t, 1), --this.size, !0;
}
function Wh(r) {
  var e = this.__data__, t = us(e, r);
  return t < 0 ? void 0 : e[t][1];
}
function Zh(r) {
  return us(this.__data__, r) > -1;
}
function Yh(r, e) {
  var t = this.__data__, n = us(t, r);
  return n < 0 ? (++this.size, t.push([r, e])) : t[n][1] = e, this;
}
function $t(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var n = r[e];
    this.set(n[0], n[1]);
  }
}
$t.prototype.clear = zh;
$t.prototype.delete = Gh;
$t.prototype.get = Wh;
$t.prototype.has = Zh;
$t.prototype.set = Yh;
var pn = gr(xt, "Map");
function Xh() {
  this.size = 0, this.__data__ = {
    hash: new hr(),
    map: new (pn || $t)(),
    string: new hr()
  };
}
function Qh(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
function cs(r, e) {
  var t = r.__data__;
  return Qh(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Jh(r) {
  var e = cs(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
function ef(r) {
  return cs(this, r).get(r);
}
function tf(r) {
  return cs(this, r).has(r);
}
function rf(r, e) {
  var t = cs(this, r), n = t.size;
  return t.set(r, e), this.size += t.size == n ? 0 : 1, this;
}
function br(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var n = r[e];
    this.set(n[0], n[1]);
  }
}
br.prototype.clear = Xh;
br.prototype.delete = Jh;
br.prototype.get = ef;
br.prototype.has = tf;
br.prototype.set = rf;
function nf(r, e) {
  for (var t = -1, n = e.length, s = r.length; ++t < n; )
    r[s + t] = e[t];
  return r;
}
var Yo = Wo(Object.getPrototypeOf, Object), sf = "[object Object]", af = Function.prototype, of = Object.prototype, Xo = af.toString, lf = of.hasOwnProperty, uf = Xo.call(Object);
function cf(r) {
  if (!Ot(r) || Vr(r) != sf)
    return !1;
  var e = Yo(r);
  if (e === null)
    return !0;
  var t = lf.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Xo.call(t) == uf;
}
function df() {
  this.__data__ = new $t(), this.size = 0;
}
function hf(r) {
  var e = this.__data__, t = e.delete(r);
  return this.size = e.size, t;
}
function ff(r) {
  return this.__data__.get(r);
}
function pf(r) {
  return this.__data__.has(r);
}
var mf = 200;
function gf(r, e) {
  var t = this.__data__;
  if (t instanceof $t) {
    var n = t.__data__;
    if (!pn || n.length < mf - 1)
      return n.push([r, e]), this.size = ++t.size, this;
    t = this.__data__ = new br(n);
  }
  return t.set(r, e), this.size = t.size, this;
}
function yt(r) {
  var e = this.__data__ = new $t(r);
  this.size = e.size;
}
yt.prototype.clear = df;
yt.prototype.delete = hf;
yt.prototype.get = ff;
yt.prototype.has = pf;
yt.prototype.set = gf;
var Qo = typeof exports == "object" && exports && !exports.nodeType && exports, ga = Qo && typeof module == "object" && module && !module.nodeType && module, bf = ga && ga.exports === Qo, ba = bf ? xt.Buffer : void 0, ya = ba ? ba.allocUnsafe : void 0;
function Jo(r, e) {
  if (e)
    return r.slice();
  var t = r.length, n = ya ? ya(t) : new r.constructor(t);
  return r.copy(n), n;
}
function yf(r, e) {
  for (var t = -1, n = r == null ? 0 : r.length, s = 0, i = []; ++t < n; ) {
    var o = r[t];
    e(o, t, r) && (i[s++] = o);
  }
  return i;
}
function vf() {
  return [];
}
var xf = Object.prototype, wf = xf.propertyIsEnumerable, va = Object.getOwnPropertySymbols, Af = va ? function(r) {
  return r == null ? [] : (r = Object(r), yf(va(r), function(e) {
    return wf.call(r, e);
  }));
} : vf;
function Ef(r, e, t) {
  var n = e(r);
  return dr(r) ? n : nf(n, t(r));
}
function yi(r) {
  return Ef(r, Ch, Af);
}
var vi = gr(xt, "DataView"), xi = gr(xt, "Promise"), wi = gr(xt, "Set"), xa = "[object Map]", Nf = "[object Object]", wa = "[object Promise]", Aa = "[object Set]", Ea = "[object WeakMap]", Na = "[object DataView]", Tf = mr(vi), kf = mr(pn), Sf = mr(xi), Cf = mr(wi), _f = mr(gi), at = Vr;
(vi && at(new vi(new ArrayBuffer(1))) != Na || pn && at(new pn()) != xa || xi && at(xi.resolve()) != wa || wi && at(new wi()) != Aa || gi && at(new gi()) != Ea) && (at = function(r) {
  var e = Vr(r), t = e == Nf ? r.constructor : void 0, n = t ? mr(t) : "";
  if (n)
    switch (n) {
      case Tf:
        return Na;
      case kf:
        return xa;
      case Sf:
        return wa;
      case Cf:
        return Aa;
      case _f:
        return Ea;
    }
  return e;
});
var Lf = Object.prototype, qf = Lf.hasOwnProperty;
function If(r) {
  var e = r.length, t = new r.constructor(e);
  return e && typeof r[0] == "string" && qf.call(r, "index") && (t.index = r.index, t.input = r.input), t;
}
var es = xt.Uint8Array;
function Vi(r) {
  var e = new r.constructor(r.byteLength);
  return new es(e).set(new es(r)), e;
}
function Of(r, e) {
  var t = Vi(r.buffer);
  return new r.constructor(t, r.byteOffset, r.byteLength);
}
var Rf = /\w*$/;
function $f(r) {
  var e = new r.constructor(r.source, Rf.exec(r));
  return e.lastIndex = r.lastIndex, e;
}
var Ta = Zt ? Zt.prototype : void 0, ka = Ta ? Ta.valueOf : void 0;
function Df(r) {
  return ka ? Object(ka.call(r)) : {};
}
function el(r, e) {
  var t = e ? Vi(r.buffer) : r.buffer;
  return new r.constructor(t, r.byteOffset, r.length);
}
var Bf = "[object Boolean]", Ff = "[object Date]", Mf = "[object Map]", jf = "[object Number]", Pf = "[object RegExp]", Uf = "[object Set]", Vf = "[object String]", zf = "[object Symbol]", Hf = "[object ArrayBuffer]", Kf = "[object DataView]", Gf = "[object Float32Array]", Wf = "[object Float64Array]", Zf = "[object Int8Array]", Yf = "[object Int16Array]", Xf = "[object Int32Array]", Qf = "[object Uint8Array]", Jf = "[object Uint8ClampedArray]", ep = "[object Uint16Array]", tp = "[object Uint32Array]";
function rp(r, e, t) {
  var n = r.constructor;
  switch (e) {
    case Hf:
      return Vi(r);
    case Bf:
    case Ff:
      return new n(+r);
    case Kf:
      return Of(r);
    case Gf:
    case Wf:
    case Zf:
    case Yf:
    case Xf:
    case Qf:
    case Jf:
    case ep:
    case tp:
      return el(r, t);
    case Mf:
      return new n();
    case jf:
    case Vf:
      return new n(r);
    case Pf:
      return $f(r);
    case Uf:
      return new n();
    case zf:
      return Df(r);
  }
}
function tl(r) {
  return typeof r.constructor == "function" && !ji(r) ? wd(Yo(r)) : {};
}
var np = "[object Map]";
function sp(r) {
  return Ot(r) && at(r) == np;
}
var Sa = Pr && Pr.isMap, ip = Sa ? Pi(Sa) : sp, ap = "[object Set]";
function op(r) {
  return Ot(r) && at(r) == ap;
}
var Ca = Pr && Pr.isSet, lp = Ca ? Pi(Ca) : op, up = 1, rl = "[object Arguments]", cp = "[object Array]", dp = "[object Boolean]", hp = "[object Date]", fp = "[object Error]", nl = "[object Function]", pp = "[object GeneratorFunction]", mp = "[object Map]", gp = "[object Number]", sl = "[object Object]", bp = "[object RegExp]", yp = "[object Set]", vp = "[object String]", xp = "[object Symbol]", wp = "[object WeakMap]", Ap = "[object ArrayBuffer]", Ep = "[object DataView]", Np = "[object Float32Array]", Tp = "[object Float64Array]", kp = "[object Int8Array]", Sp = "[object Int16Array]", Cp = "[object Int32Array]", _p = "[object Uint8Array]", Lp = "[object Uint8ClampedArray]", qp = "[object Uint16Array]", Ip = "[object Uint32Array]", ve = {};
ve[rl] = ve[cp] = ve[Ap] = ve[Ep] = ve[dp] = ve[hp] = ve[Np] = ve[Tp] = ve[kp] = ve[Sp] = ve[Cp] = ve[mp] = ve[gp] = ve[sl] = ve[bp] = ve[yp] = ve[vp] = ve[xp] = ve[_p] = ve[Lp] = ve[qp] = ve[Ip] = !0;
ve[fp] = ve[nl] = ve[wp] = !1;
function Yn(r, e, t, n, s, i) {
  var o, l = e & up;
  if (o !== void 0)
    return o;
  if (!Xt(r))
    return r;
  var u = dr(r);
  if (u)
    o = If(r);
  else {
    var d = at(r), p = d == nl || d == pp;
    if (hn(r))
      return Jo(r, l);
    if (d == sl || d == rl || p && !s)
      o = p ? {} : tl(r);
    else {
      if (!ve[d])
        return s ? r : {};
      o = rp(r, d, l);
    }
  }
  i || (i = new yt());
  var b = i.get(r);
  if (b)
    return b;
  i.set(r, o), lp(r) ? r.forEach(function(E) {
    o.add(Yn(E, e, t, E, r, i));
  }) : ip(r) && r.forEach(function(E, C) {
    o.set(C, Yn(E, e, t, C, r, i));
  });
  var h = yi, w = u ? void 0 : h(r);
  return qd(w || r, function(E, C) {
    w && (C = E, E = r[C]), Uo(o, C, Yn(E, e, t, C, r, i));
  }), o;
}
var Op = 1, Rp = 4;
function Dr(r) {
  return Yn(r, Op | Rp);
}
var $p = "__lodash_hash_undefined__";
function Dp(r) {
  return this.__data__.set(r, $p), this;
}
function Bp(r) {
  return this.__data__.has(r);
}
function ts(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.__data__ = new br(); ++e < t; )
    this.add(r[e]);
}
ts.prototype.add = ts.prototype.push = Dp;
ts.prototype.has = Bp;
function Fp(r, e) {
  for (var t = -1, n = r == null ? 0 : r.length; ++t < n; )
    if (e(r[t], t, r))
      return !0;
  return !1;
}
function Mp(r, e) {
  return r.has(e);
}
var jp = 1, Pp = 2;
function il(r, e, t, n, s, i) {
  var o = t & jp, l = r.length, u = e.length;
  if (l != u && !(o && u > l))
    return !1;
  var d = i.get(r), p = i.get(e);
  if (d && p)
    return d == e && p == r;
  var b = -1, h = !0, w = t & Pp ? new ts() : void 0;
  for (i.set(r, e), i.set(e, r); ++b < l; ) {
    var E = r[b], C = e[b];
    if (n)
      var L = o ? n(C, E, b, e, r, i) : n(E, C, b, r, e, i);
    if (L !== void 0) {
      if (L)
        continue;
      h = !1;
      break;
    }
    if (w) {
      if (!Fp(e, function(R, j) {
        if (!Mp(w, j) && (E === R || s(E, R, t, n, i)))
          return w.push(j);
      })) {
        h = !1;
        break;
      }
    } else if (!(E === C || s(E, C, t, n, i))) {
      h = !1;
      break;
    }
  }
  return i.delete(r), i.delete(e), h;
}
function Up(r) {
  var e = -1, t = Array(r.size);
  return r.forEach(function(n, s) {
    t[++e] = [s, n];
  }), t;
}
function Vp(r) {
  var e = -1, t = Array(r.size);
  return r.forEach(function(n) {
    t[++e] = n;
  }), t;
}
var zp = 1, Hp = 2, Kp = "[object Boolean]", Gp = "[object Date]", Wp = "[object Error]", Zp = "[object Map]", Yp = "[object Number]", Xp = "[object RegExp]", Qp = "[object Set]", Jp = "[object String]", em = "[object Symbol]", tm = "[object ArrayBuffer]", rm = "[object DataView]", _a = Zt ? Zt.prototype : void 0, ti = _a ? _a.valueOf : void 0;
function nm(r, e, t, n, s, i, o) {
  switch (t) {
    case rm:
      if (r.byteLength != e.byteLength || r.byteOffset != e.byteOffset)
        return !1;
      r = r.buffer, e = e.buffer;
    case tm:
      return !(r.byteLength != e.byteLength || !i(new es(r), new es(e)));
    case Kp:
    case Gp:
    case Yp:
      return xn(+r, +e);
    case Wp:
      return r.name == e.name && r.message == e.message;
    case Xp:
    case Jp:
      return r == e + "";
    case Zp:
      var l = Up;
    case Qp:
      var u = n & zp;
      if (l || (l = Vp), r.size != e.size && !u)
        return !1;
      var d = o.get(r);
      if (d)
        return d == e;
      n |= Hp, o.set(r, e);
      var p = il(l(r), l(e), n, s, i, o);
      return o.delete(r), p;
    case em:
      if (ti)
        return ti.call(r) == ti.call(e);
  }
  return !1;
}
var sm = 1, im = Object.prototype, am = im.hasOwnProperty;
function om(r, e, t, n, s, i) {
  var o = t & sm, l = yi(r), u = l.length, d = yi(e), p = d.length;
  if (u != p && !o)
    return !1;
  for (var b = u; b--; ) {
    var h = l[b];
    if (!(o ? h in e : am.call(e, h)))
      return !1;
  }
  var w = i.get(r), E = i.get(e);
  if (w && E)
    return w == e && E == r;
  var C = !0;
  i.set(r, e), i.set(e, r);
  for (var L = o; ++b < u; ) {
    h = l[b];
    var R = r[h], j = e[h];
    if (n)
      var z = o ? n(j, R, h, e, r, i) : n(R, j, h, r, e, i);
    if (!(z === void 0 ? R === j || s(R, j, t, n, i) : z)) {
      C = !1;
      break;
    }
    L || (L = h == "constructor");
  }
  if (C && !L) {
    var Q = r.constructor, K = e.constructor;
    Q != K && "constructor" in r && "constructor" in e && !(typeof Q == "function" && Q instanceof Q && typeof K == "function" && K instanceof K) && (C = !1);
  }
  return i.delete(r), i.delete(e), C;
}
var lm = 1, La = "[object Arguments]", qa = "[object Array]", Fn = "[object Object]", um = Object.prototype, Ia = um.hasOwnProperty;
function cm(r, e, t, n, s, i) {
  var o = dr(r), l = dr(e), u = o ? qa : at(r), d = l ? qa : at(e);
  u = u == La ? Fn : u, d = d == La ? Fn : d;
  var p = u == Fn, b = d == Fn, h = u == d;
  if (h && hn(r)) {
    if (!hn(e))
      return !1;
    o = !0, p = !1;
  }
  if (h && !p)
    return i || (i = new yt()), o || Ui(r) ? il(r, e, t, n, s, i) : nm(r, e, u, t, n, s, i);
  if (!(t & lm)) {
    var w = p && Ia.call(r, "__wrapped__"), E = b && Ia.call(e, "__wrapped__");
    if (w || E) {
      var C = w ? r.value() : r, L = E ? e.value() : e;
      return i || (i = new yt()), s(C, L, t, n, i);
    }
  }
  return h ? (i || (i = new yt()), om(r, e, t, n, s, i)) : !1;
}
function al(r, e, t, n, s) {
  return r === e ? !0 : r == null || e == null || !Ot(r) && !Ot(e) ? r !== r && e !== e : cm(r, e, t, n, al, s);
}
function dm(r) {
  return function(e, t, n) {
    for (var s = -1, i = Object(e), o = n(e), l = o.length; l--; ) {
      var u = o[++s];
      if (t(i[u], u, i) === !1)
        break;
    }
    return e;
  };
}
var hm = dm();
function Ai(r, e, t) {
  (t !== void 0 && !xn(r[e], t) || t === void 0 && !(e in r)) && Mi(r, e, t);
}
function fm(r) {
  return Ot(r) && ls(r);
}
function Ei(r, e) {
  if (!(e === "constructor" && typeof r[e] == "function") && e != "__proto__")
    return r[e];
}
function pm(r) {
  return Dd(r, Zo(r));
}
function mm(r, e, t, n, s, i, o) {
  var l = Ei(r, t), u = Ei(e, t), d = o.get(u);
  if (d) {
    Ai(r, t, d);
    return;
  }
  var p = i ? i(l, u, t + "", r, e, o) : void 0, b = p === void 0;
  if (b) {
    var h = dr(u), w = !h && hn(u), E = !h && !w && Ui(u);
    p = u, h || w || E ? dr(l) ? p = l : fm(l) ? p = Ed(l) : w ? (b = !1, p = Jo(u, !0)) : E ? (b = !1, p = el(u, !0)) : p = [] : cf(u) || bi(u) ? (p = l, bi(l) ? p = pm(l) : (!Xt(l) || Fi(l)) && (p = tl(u))) : b = !1;
  }
  b && (o.set(u, p), s(p, u, n, i, o), o.delete(u)), Ai(r, t, p);
}
function ol(r, e, t, n, s) {
  r !== e && hm(e, function(i, o) {
    if (s || (s = new yt()), Xt(i))
      mm(r, e, o, t, ol, n, s);
    else {
      var l = n ? n(Ei(r, o), i, o + "", r, e, s) : void 0;
      l === void 0 && (l = i), Ai(r, o, l);
    }
  }, Zo);
}
function zi(r, e) {
  return al(r, e);
}
var Kt = Pd(function(r, e, t) {
  ol(r, e, t);
}), W = /* @__PURE__ */ ((r) => (r[r.TYPE = 3] = "TYPE", r[r.LEVEL = 12] = "LEVEL", r[r.ATTRIBUTE = 13] = "ATTRIBUTE", r[r.BLOT = 14] = "BLOT", r[r.INLINE = 7] = "INLINE", r[r.BLOCK = 11] = "BLOCK", r[r.BLOCK_BLOT = 10] = "BLOCK_BLOT", r[r.INLINE_BLOT = 6] = "INLINE_BLOT", r[r.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", r[r.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", r[r.ANY = 15] = "ANY", r))(W || {});
class vt {
  constructor(e, t, n = {}) {
    this.attrName = e, this.keyName = t;
    const s = W.TYPE & W.ATTRIBUTE;
    this.scope = n.scope != null ? (
      // Ignore type bits, force attribute bit
      n.scope & W.LEVEL | s
    ) : W.ATTRIBUTE, n.whitelist != null && (this.whitelist = n.whitelist);
  }
  static keys(e) {
    return Array.from(e.attributes).map((t) => t.name);
  }
  add(e, t) {
    return this.canAdd(e, t) ? (e.setAttribute(this.keyName, t), !0) : !1;
  }
  canAdd(e, t) {
    return this.whitelist == null ? !0 : typeof t == "string" ? this.whitelist.indexOf(t.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(t) > -1;
  }
  remove(e) {
    e.removeAttribute(this.keyName);
  }
  value(e) {
    const t = e.getAttribute(this.keyName);
    return this.canAdd(e, t) && t ? t : "";
  }
}
class Br extends Error {
  constructor(e) {
    e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
  }
}
const ll = class Ni {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(e, t = !1) {
    if (e == null)
      return null;
    if (this.blots.has(e))
      return this.blots.get(e) || null;
    if (t) {
      let n = null;
      try {
        n = e.parentNode;
      } catch {
        return null;
      }
      return this.find(n, t);
    }
    return null;
  }
  create(e, t, n) {
    const s = this.query(t);
    if (s == null)
      throw new Br(`Unable to create ${t} blot`);
    const i = s, o = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : i.create(n)
    ), l = new i(e, o, n);
    return Ni.blots.set(l.domNode, l), l;
  }
  find(e, t = !1) {
    return Ni.find(e, t);
  }
  query(e, t = W.ANY) {
    let n;
    return typeof e == "string" ? n = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? n = this.types.text : typeof e == "number" ? e & W.LEVEL & W.BLOCK ? n = this.types.block : e & W.LEVEL & W.INLINE && (n = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((s) => (n = this.classes[s], !!n)), n = n || this.tags[e.tagName]), n == null ? null : "scope" in n && t & W.LEVEL & n.scope && t & W.TYPE & n.scope ? n : null;
  }
  register(...e) {
    return e.map((t) => {
      const n = "blotName" in t, s = "attrName" in t;
      if (!n && !s)
        throw new Br("Invalid definition");
      if (n && t.blotName === "abstract")
        throw new Br("Cannot register abstract class");
      const i = n ? t.blotName : s ? t.attrName : void 0;
      return this.types[i] = t, s ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : n && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((o) => o.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((o) => {
        (this.tags[o] == null || t.className == null) && (this.tags[o] = t);
      }))), t;
    });
  }
};
ll.blots = /* @__PURE__ */ new WeakMap();
let Ur = ll;
function Oa(r, e) {
  return (r.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class gm extends vt {
  static keys(e) {
    return (e.getAttribute("class") || "").split(/\s+/).map((t) => t.split("-").slice(0, -1).join("-"));
  }
  add(e, t) {
    return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
  }
  remove(e) {
    Oa(e, this.keyName).forEach((t) => {
      e.classList.remove(t);
    }), e.classList.length === 0 && e.removeAttribute("class");
  }
  value(e) {
    const t = (Oa(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(e, t) ? t : "";
  }
}
const ht = gm;
function ri(r) {
  const e = r.split("-"), t = e.slice(1).map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  return e[0] + t;
}
class bm extends vt {
  static keys(e) {
    return (e.getAttribute("style") || "").split(";").map((t) => t.split(":")[0].trim());
  }
  add(e, t) {
    return this.canAdd(e, t) ? (e.style[ri(this.keyName)] = t, !0) : !1;
  }
  remove(e) {
    e.style[ri(this.keyName)] = "", e.getAttribute("style") || e.removeAttribute("style");
  }
  value(e) {
    const t = e.style[ri(this.keyName)];
    return this.canAdd(e, t) ? t : "";
  }
}
const Qt = bm;
class ym {
  constructor(e) {
    this.attributes = {}, this.domNode = e, this.build();
  }
  attribute(e, t) {
    t ? e.add(this.domNode, t) && (e.value(this.domNode) != null ? this.attributes[e.attrName] = e : delete this.attributes[e.attrName]) : (e.remove(this.domNode), delete this.attributes[e.attrName]);
  }
  build() {
    this.attributes = {};
    const e = Ur.find(this.domNode);
    if (e == null)
      return;
    const t = vt.keys(this.domNode), n = ht.keys(this.domNode), s = Qt.keys(this.domNode);
    t.concat(n).concat(s).forEach((i) => {
      const o = e.scroll.query(i, W.ATTRIBUTE);
      o instanceof vt && (this.attributes[o.attrName] = o);
    });
  }
  copy(e) {
    Object.keys(this.attributes).forEach((t) => {
      const n = this.attributes[t].value(this.domNode);
      e.format(t, n);
    });
  }
  move(e) {
    this.copy(e), Object.keys(this.attributes).forEach((t) => {
      this.attributes[t].remove(this.domNode);
    }), this.attributes = {};
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (e, t) => (e[t] = this.attributes[t].value(this.domNode), e),
      {}
    );
  }
}
const ds = ym, ul = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, Ur.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new Br("Blot definition missing tagName");
    let t, n;
    return Array.isArray(this.tagName) ? (typeof e == "string" ? (n = e.toUpperCase(), parseInt(n, 10).toString() === n && (n = parseInt(n, 10))) : typeof e == "number" && (n = e), typeof n == "number" ? t = document.createElement(this.tagName[n - 1]) : n && this.tagName.indexOf(n) > -1 ? t = document.createElement(n) : t = document.createElement(this.tagName[0])) : t = document.createElement(this.tagName), this.className && t.classList.add(this.className), t;
  }
  // Hack for accessing inherited static methods
  get statics() {
    return this.constructor;
  }
  attach() {
  }
  clone() {
    const e = this.domNode.cloneNode(!1);
    return this.scroll.create(e);
  }
  detach() {
    this.parent != null && this.parent.removeChild(this), Ur.blots.delete(this.domNode);
  }
  deleteAt(e, t) {
    this.isolate(e, t).remove();
  }
  formatAt(e, t, n, s) {
    const i = this.isolate(e, t);
    if (this.scroll.query(n, W.BLOT) != null && s)
      i.wrap(n, s);
    else if (this.scroll.query(n, W.ATTRIBUTE) != null) {
      const o = this.scroll.create(this.statics.scope);
      i.wrap(o), o.format(n, s);
    }
  }
  insertAt(e, t, n) {
    const s = n == null ? this.scroll.create("text", t) : this.scroll.create(t, n), i = this.split(e);
    this.parent.insertBefore(s, i || void 0);
  }
  isolate(e, t) {
    const n = this.split(e);
    if (n == null)
      throw new Error("Attempt to isolate at end");
    return n.split(t), n;
  }
  length() {
    return 1;
  }
  offset(e = this.parent) {
    return this.parent == null || this === e ? 0 : this.parent.children.offset(this) + this.parent.offset(e);
  }
  optimize(e) {
    this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
  }
  remove() {
    this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
  }
  replaceWith(e, t) {
    const n = typeof e == "string" ? this.scroll.create(e, t) : e;
    return this.parent != null && (this.parent.insertBefore(n, this.next || void 0), this.remove()), n;
  }
  split(e, t) {
    return e === 0 ? this : this.next;
  }
  update(e, t) {
  }
  wrap(e, t) {
    const n = typeof e == "string" ? this.scroll.create(e, t) : e;
    if (this.parent != null && this.parent.insertBefore(n, this.next || void 0), typeof n.appendChild != "function")
      throw new Br(`Cannot wrap ${e}`);
    return n.appendChild(this), n;
  }
};
ul.blotName = "abstract";
let cl = ul;
const dl = class extends cl {
  /**
   * Returns the value represented by domNode if it is this Blot's type
   * No checking that domNode can represent this Blot type is required so
   * applications needing it should check externally before calling.
   */
  static value(e) {
    return !0;
  }
  /**
   * Given location represented by node and offset from DOM Selection Range,
   * return index to that location.
   */
  index(e, t) {
    return this.domNode === e || this.domNode.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(t, 1) : -1;
  }
  /**
   * Given index to location within blot, return node and offset representing
   * that location, consumable by DOM Selection Range
   */
  position(e, t) {
    let n = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
    return e > 0 && (n += 1), [this.parent.domNode, n];
  }
  /**
   * Return value represented by this blot
   * Should not change without interaction from API or
   * user change detectable by update()
   */
  value() {
    return {
      [this.statics.blotName]: this.statics.value(this.domNode) || !0
    };
  }
};
dl.scope = W.INLINE_BLOT;
let vm = dl;
const Ue = vm;
class xm {
  constructor() {
    this.head = null, this.tail = null, this.length = 0;
  }
  append(...e) {
    if (this.insertBefore(e[0], null), e.length > 1) {
      const t = e.slice(1);
      this.append(...t);
    }
  }
  at(e) {
    const t = this.iterator();
    let n = t();
    for (; n && e > 0; )
      e -= 1, n = t();
    return n;
  }
  contains(e) {
    const t = this.iterator();
    let n = t();
    for (; n; ) {
      if (n === e)
        return !0;
      n = t();
    }
    return !1;
  }
  indexOf(e) {
    const t = this.iterator();
    let n = t(), s = 0;
    for (; n; ) {
      if (n === e)
        return s;
      s += 1, n = t();
    }
    return -1;
  }
  insertBefore(e, t) {
    e != null && (this.remove(e), e.next = t, t != null ? (e.prev = t.prev, t.prev != null && (t.prev.next = e), t.prev = e, t === this.head && (this.head = e)) : this.tail != null ? (this.tail.next = e, e.prev = this.tail, this.tail = e) : (e.prev = null, this.head = this.tail = e), this.length += 1);
  }
  offset(e) {
    let t = 0, n = this.head;
    for (; n != null; ) {
      if (n === e)
        return t;
      t += n.length(), n = n.next;
    }
    return -1;
  }
  remove(e) {
    this.contains(e) && (e.prev != null && (e.prev.next = e.next), e.next != null && (e.next.prev = e.prev), e === this.head && (this.head = e.next), e === this.tail && (this.tail = e.prev), this.length -= 1);
  }
  iterator(e = this.head) {
    return () => {
      const t = e;
      return e != null && (e = e.next), t;
    };
  }
  find(e, t = !1) {
    const n = this.iterator();
    let s = n();
    for (; s; ) {
      const i = s.length();
      if (e < i || t && e === i && (s.next == null || s.next.length() !== 0))
        return [s, e];
      e -= i, s = n();
    }
    return [null, 0];
  }
  forEach(e) {
    const t = this.iterator();
    let n = t();
    for (; n; )
      e(n), n = t();
  }
  forEachAt(e, t, n) {
    if (t <= 0)
      return;
    const [s, i] = this.find(e);
    let o = e - i;
    const l = this.iterator(s);
    let u = l();
    for (; u && o < e + t; ) {
      const d = u.length();
      e > o ? n(
        u,
        e - o,
        Math.min(t, o + d - e)
      ) : n(u, 0, Math.min(d, e + t - o)), o += d, u = l();
    }
  }
  map(e) {
    return this.reduce((t, n) => (t.push(e(n)), t), []);
  }
  reduce(e, t) {
    const n = this.iterator();
    let s = n();
    for (; s; )
      t = e(t, s), s = n();
    return t;
  }
}
function Ra(r, e) {
  const t = e.find(r);
  if (t)
    return t;
  try {
    return e.create(r);
  } catch {
    const n = e.create(W.INLINE);
    return Array.from(r.childNodes).forEach((s) => {
      n.domNode.appendChild(s);
    }), r.parentNode && r.parentNode.replaceChild(n.domNode, r), n.attach(), n;
  }
}
const hl = class Pt extends cl {
  constructor(e, t) {
    super(e, t), this.uiNode = null, this.build();
  }
  appendChild(e) {
    this.insertBefore(e);
  }
  attach() {
    super.attach(), this.children.forEach((e) => {
      e.attach();
    });
  }
  attachUI(e) {
    this.uiNode != null && this.uiNode.remove(), this.uiNode = e, Pt.uiClass && this.uiNode.classList.add(Pt.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new xm(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = Ra(e, this.scroll);
        this.insertBefore(t, this.children.head || void 0);
      } catch (t) {
        if (t instanceof Br)
          return;
        throw t;
      }
    });
  }
  deleteAt(e, t) {
    if (e === 0 && t === this.length())
      return this.remove();
    this.children.forEachAt(e, t, (n, s, i) => {
      n.deleteAt(s, i);
    });
  }
  descendant(e, t = 0) {
    const [n, s] = this.children.find(t);
    return e.blotName == null && e(n) || e.blotName != null && n instanceof e ? [n, s] : n instanceof Pt ? n.descendant(e, s) : [null, -1];
  }
  descendants(e, t = 0, n = Number.MAX_VALUE) {
    let s = [], i = n;
    return this.children.forEachAt(
      t,
      n,
      (o, l, u) => {
        (e.blotName == null && e(o) || e.blotName != null && o instanceof e) && s.push(o), o instanceof Pt && (s = s.concat(
          o.descendants(e, l, i)
        )), i -= u;
      }
    ), s;
  }
  detach() {
    this.children.forEach((e) => {
      e.detach();
    }), super.detach();
  }
  enforceAllowedChildren() {
    let e = !1;
    this.children.forEach((t) => {
      e || this.statics.allowedChildren.some(
        (n) => t instanceof n
      ) || (t.statics.scope === W.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof Pt ? t.unwrap() : t.remove());
    });
  }
  formatAt(e, t, n, s) {
    this.children.forEachAt(e, t, (i, o, l) => {
      i.formatAt(o, l, n, s);
    });
  }
  insertAt(e, t, n) {
    const [s, i] = this.children.find(e);
    if (s)
      s.insertAt(i, t, n);
    else {
      const o = n == null ? this.scroll.create("text", t) : this.scroll.create(t, n);
      this.appendChild(o);
    }
  }
  insertBefore(e, t) {
    e.parent != null && e.parent.children.remove(e);
    let n = null;
    this.children.insertBefore(e, t || null), e.parent = this, t != null && (n = t.domNode), (this.domNode.parentNode !== e.domNode || this.domNode.nextSibling !== n) && this.domNode.insertBefore(e.domNode, n), e.attach();
  }
  length() {
    return this.children.reduce((e, t) => e + t.length(), 0);
  }
  moveChildren(e, t) {
    this.children.forEach((n) => {
      e.insertBefore(n, t);
    });
  }
  optimize(e) {
    if (super.optimize(e), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
      if (this.statics.defaultChild != null) {
        const t = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(t);
      } else
        this.remove();
  }
  path(e, t = !1) {
    const [n, s] = this.children.find(e, t), i = [[this, e]];
    return n instanceof Pt ? i.concat(n.path(s, t)) : (n != null && i.push([n, s]), i);
  }
  removeChild(e) {
    this.children.remove(e);
  }
  replaceWith(e, t) {
    const n = typeof e == "string" ? this.scroll.create(e, t) : e;
    return n instanceof Pt && this.moveChildren(n), super.replaceWith(n);
  }
  split(e, t = !1) {
    if (!t) {
      if (e === 0)
        return this;
      if (e === this.length())
        return this.next;
    }
    const n = this.clone();
    return this.parent && this.parent.insertBefore(n, this.next || void 0), this.children.forEachAt(e, this.length(), (s, i, o) => {
      const l = s.split(i, t);
      l != null && n.appendChild(l);
    }), n;
  }
  splitAfter(e) {
    const t = this.clone();
    for (; e.next != null; )
      t.appendChild(e.next);
    return this.parent && this.parent.insertBefore(t, this.next || void 0), t;
  }
  unwrap() {
    this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
  }
  update(e, t) {
    const n = [], s = [];
    e.forEach((i) => {
      i.target === this.domNode && i.type === "childList" && (n.push(...i.addedNodes), s.push(...i.removedNodes));
    }), s.forEach((i) => {
      if (i.parentNode != null && // @ts-expect-error Fix me later
      i.tagName !== "IFRAME" && document.body.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const o = this.scroll.find(i);
      o != null && (o.domNode.parentNode == null || o.domNode.parentNode === this.domNode) && o.detach();
    }), n.filter((i) => i.parentNode === this.domNode && i !== this.uiNode).sort((i, o) => i === o ? 0 : i.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((i) => {
      let o = null;
      i.nextSibling != null && (o = this.scroll.find(i.nextSibling));
      const l = Ra(i, this.scroll);
      (l.next !== o || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
hl.uiClass = "";
let wm = hl;
const ct = wm;
function Am(r, e) {
  if (Object.keys(r).length !== Object.keys(e).length)
    return !1;
  for (const t in r)
    if (r[t] !== e[t])
      return !1;
  return !0;
}
const Lr = class qr extends ct {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const n = t.query(qr.blotName);
    if (!(n != null && e.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new ds(this.domNode);
  }
  format(e, t) {
    if (e === this.statics.blotName && !t)
      this.children.forEach((n) => {
        n instanceof qr || (n = n.wrap(qr.blotName, !0)), this.attributes.copy(n);
      }), this.unwrap();
    else {
      const n = this.scroll.query(e, W.INLINE);
      if (n == null)
        return;
      n instanceof vt ? this.attributes.attribute(n, t) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t);
    }
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, n, s) {
    this.formats()[n] != null || this.scroll.query(n, W.ATTRIBUTE) ? this.isolate(e, t).format(n, s) : super.formatAt(e, t, n, s);
  }
  optimize(e) {
    super.optimize(e);
    const t = this.formats();
    if (Object.keys(t).length === 0)
      return this.unwrap();
    const n = this.next;
    n instanceof qr && n.prev === this && Am(t, n.formats()) && (n.moveChildren(this), n.remove());
  }
  replaceWith(e, t) {
    const n = super.replaceWith(e, t);
    return this.attributes.copy(n), n;
  }
  update(e, t) {
    super.update(e, t), e.some(
      (n) => n.target === this.domNode && n.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(e, t) {
    const n = super.wrap(e, t);
    return n instanceof qr && this.attributes.move(n), n;
  }
};
Lr.allowedChildren = [Lr, Ue], Lr.blotName = "inline", Lr.scope = W.INLINE_BLOT, Lr.tagName = "SPAN";
let Em = Lr;
const Hi = Em, Ir = class Ti extends ct {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const n = t.query(Ti.blotName);
    if (!(n != null && e.tagName === n.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new ds(this.domNode);
  }
  format(e, t) {
    const n = this.scroll.query(e, W.BLOCK);
    n != null && (n instanceof vt ? this.attributes.attribute(n, t) : e === this.statics.blotName && !t ? this.replaceWith(Ti.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, n, s) {
    this.scroll.query(n, W.BLOCK) != null ? this.format(n, s) : super.formatAt(e, t, n, s);
  }
  insertAt(e, t, n) {
    if (n == null || this.scroll.query(t, W.INLINE) != null)
      super.insertAt(e, t, n);
    else {
      const s = this.split(e);
      if (s != null) {
        const i = this.scroll.create(t, n);
        s.parent.insertBefore(i, s);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(e, t) {
    const n = super.replaceWith(e, t);
    return this.attributes.copy(n), n;
  }
  update(e, t) {
    super.update(e, t), e.some(
      (n) => n.target === this.domNode && n.type === "attributes"
    ) && this.attributes.build();
  }
};
Ir.blotName = "block", Ir.scope = W.BLOCK_BLOT, Ir.tagName = "P", Ir.allowedChildren = [
  Hi,
  Ir,
  Ue
];
let Nm = Ir;
const mn = Nm, ki = class extends ct {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(e, t) {
    super.deleteAt(e, t), this.enforceAllowedChildren();
  }
  formatAt(e, t, n, s) {
    super.formatAt(e, t, n, s), this.enforceAllowedChildren();
  }
  insertAt(e, t, n) {
    super.insertAt(e, t, n), this.enforceAllowedChildren();
  }
  optimize(e) {
    super.optimize(e), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
ki.blotName = "container", ki.scope = W.BLOCK_BLOT;
let Tm = ki;
const hs = Tm;
class km extends Ue {
  static formats(e, t) {
  }
  format(e, t) {
    super.formatAt(0, this.length(), e, t);
  }
  formatAt(e, t, n, s) {
    e === 0 && t === this.length() ? this.format(n, s) : super.formatAt(e, t, n, s);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const Xe = km, Sm = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, Cm = 100, Or = class extends ct {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((n) => {
      this.update(n);
    }), this.observer.observe(this.domNode, Sm), this.attach();
  }
  create(e, t) {
    return this.registry.create(this, e, t);
  }
  find(e, t = !1) {
    const n = this.registry.find(e, t);
    return n ? n.scroll === this ? n : t ? this.find(n.scroll.domNode.parentNode, !0) : null : null;
  }
  query(e, t = W.ANY) {
    return this.registry.query(e, t);
  }
  register(...e) {
    return this.registry.register(...e);
  }
  build() {
    this.scroll != null && super.build();
  }
  detach() {
    super.detach(), this.observer.disconnect();
  }
  deleteAt(e, t) {
    this.update(), e === 0 && t === this.length() ? this.children.forEach((n) => {
      n.remove();
    }) : super.deleteAt(e, t);
  }
  formatAt(e, t, n, s) {
    this.update(), super.formatAt(e, t, n, s);
  }
  insertAt(e, t, n) {
    this.update(), super.insertAt(e, t, n);
  }
  optimize(e = [], t = {}) {
    super.optimize(t);
    const n = t.mutationsMap || /* @__PURE__ */ new WeakMap();
    let s = Array.from(this.observer.takeRecords());
    for (; s.length > 0; )
      e.push(s.pop());
    const i = (u, d = !0) => {
      u == null || u === this || u.domNode.parentNode != null && (n.has(u.domNode) || n.set(u.domNode, []), d && i(u.parent));
    }, o = (u) => {
      n.has(u.domNode) && (u instanceof ct && u.children.forEach(o), n.delete(u.domNode), u.optimize(t));
    };
    let l = e;
    for (let u = 0; l.length > 0; u += 1) {
      if (u >= Cm)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((d) => {
        const p = this.find(d.target, !0);
        p != null && (p.domNode === d.target && (d.type === "childList" ? (i(this.find(d.previousSibling, !1)), Array.from(d.addedNodes).forEach((b) => {
          const h = this.find(b, !1);
          i(h, !1), h instanceof ct && h.children.forEach((w) => {
            i(w, !1);
          });
        })) : d.type === "attributes" && i(p.prev)), i(p));
      }), this.children.forEach(o), l = Array.from(this.observer.takeRecords()), s = l.slice(); s.length > 0; )
        e.push(s.pop());
    }
  }
  update(e, t = {}) {
    e = e || this.observer.takeRecords();
    const n = /* @__PURE__ */ new WeakMap();
    e.map((s) => {
      const i = this.find(s.target, !0);
      return i == null ? null : n.has(i.domNode) ? (n.get(i.domNode).push(s), null) : (n.set(i.domNode, [s]), i);
    }).forEach((s) => {
      s != null && s !== this && n.has(s.domNode) && s.update(n.get(s.domNode) || [], t);
    }), t.mutationsMap = n, n.has(this.domNode) && super.update(n.get(this.domNode), t), this.optimize(e, t);
  }
};
Or.blotName = "scroll", Or.defaultChild = mn, Or.allowedChildren = [mn, hs], Or.scope = W.BLOCK_BLOT, Or.tagName = "DIV";
let _m = Or;
const Ki = _m, Si = class fl extends Ue {
  static create(e) {
    return document.createTextNode(e);
  }
  static value(e) {
    return e.data;
  }
  constructor(e, t) {
    super(e, t), this.text = this.statics.value(this.domNode);
  }
  deleteAt(e, t) {
    this.domNode.data = this.text = this.text.slice(0, e) + this.text.slice(e + t);
  }
  index(e, t) {
    return this.domNode === e ? t : -1;
  }
  insertAt(e, t, n) {
    n == null ? (this.text = this.text.slice(0, e) + t + this.text.slice(e), this.domNode.data = this.text) : super.insertAt(e, t, n);
  }
  length() {
    return this.text.length;
  }
  optimize(e) {
    super.optimize(e), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof fl && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
  }
  position(e, t = !1) {
    return [this.domNode, e];
  }
  split(e, t = !1) {
    if (!t) {
      if (e === 0)
        return this;
      if (e === this.length())
        return this.next;
    }
    const n = this.scroll.create(this.domNode.splitText(e));
    return this.parent.insertBefore(n, this.next || void 0), this.text = this.statics.value(this.domNode), n;
  }
  update(e, t) {
    e.some((n) => n.type === "characterData" && n.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
Si.blotName = "text", Si.scope = W.INLINE_BLOT;
let Lm = Si;
const rs = Lm, qm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: vt,
  AttributorStore: ds,
  BlockBlot: mn,
  ClassAttributor: ht,
  ContainerBlot: hs,
  EmbedBlot: Xe,
  InlineBlot: Hi,
  LeafBlot: Ue,
  ParentBlot: ct,
  Registry: Ur,
  Scope: W,
  ScrollBlot: Ki,
  StyleAttributor: Qt,
  TextBlot: rs
}, Symbol.toStringTag, { value: "Module" }));
var zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pl(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Mn = { exports: {} }, ni, $a;
function Im() {
  if ($a) return ni;
  $a = 1;
  var r = -1, e = 1, t = 0;
  function n(y, M, k, _, f) {
    if (y === M)
      return y ? [[t, y]] : [];
    if (k != null) {
      var A = Ae(y, M, k);
      if (A)
        return A;
    }
    var S = l(y, M), P = y.substring(0, S);
    y = y.substring(S), M = M.substring(S), S = d(y, M);
    var D = y.substring(y.length - S);
    y = y.substring(0, y.length - S), M = M.substring(0, M.length - S);
    var T = s(y, M);
    return P && T.unshift([t, P]), D && T.push([t, D]), j(T, f), _ && b(T), T;
  }
  function s(y, M) {
    var k;
    if (!y)
      return [[e, M]];
    if (!M)
      return [[r, y]];
    var _ = y.length > M.length ? y : M, f = y.length > M.length ? M : y, A = _.indexOf(f);
    if (A !== -1)
      return k = [
        [e, _.substring(0, A)],
        [t, f],
        [e, _.substring(A + f.length)]
      ], y.length > M.length && (k[0][0] = k[2][0] = r), k;
    if (f.length === 1)
      return [
        [r, y],
        [e, M]
      ];
    var S = p(y, M);
    if (S) {
      var P = S[0], D = S[1], T = S[2], N = S[3], U = S[4], V = n(P, T), J = n(D, N);
      return V.concat([[t, U]], J);
    }
    return i(y, M);
  }
  function i(y, M) {
    for (var k = y.length, _ = M.length, f = Math.ceil((k + _) / 2), A = f, S = 2 * f, P = new Array(S), D = new Array(S), T = 0; T < S; T++)
      P[T] = -1, D[T] = -1;
    P[A + 1] = 0, D[A + 1] = 0;
    for (var N = k - _, U = N % 2 !== 0, V = 0, J = 0, Z = 0, ge = 0, ye = 0; ye < f; ye++) {
      for (var ne = -ye + V; ne <= ye - J; ne += 2) {
        var oe = A + ne, le;
        ne === -ye || ne !== ye && P[oe - 1] < P[oe + 1] ? le = P[oe + 1] : le = P[oe - 1] + 1;
        for (var ce = le - ne; le < k && ce < _ && y.charAt(le) === M.charAt(ce); )
          le++, ce++;
        if (P[oe] = le, le > k)
          J += 2;
        else if (ce > _)
          V += 2;
        else if (U) {
          var de = A + N - ne;
          if (de >= 0 && de < S && D[de] !== -1) {
            var pe = k - D[de];
            if (le >= pe)
              return o(y, M, le, ce);
          }
        }
      }
      for (var Ee = -ye + Z; Ee <= ye - ge; Ee += 2) {
        var de = A + Ee, pe;
        Ee === -ye || Ee !== ye && D[de - 1] < D[de + 1] ? pe = D[de + 1] : pe = D[de - 1] + 1;
        for (var Ce = pe - Ee; pe < k && Ce < _ && y.charAt(k - pe - 1) === M.charAt(_ - Ce - 1); )
          pe++, Ce++;
        if (D[de] = pe, pe > k)
          ge += 2;
        else if (Ce > _)
          Z += 2;
        else if (!U) {
          var oe = A + N - Ee;
          if (oe >= 0 && oe < S && P[oe] !== -1) {
            var le = P[oe], ce = A + le - oe;
            if (pe = k - pe, le >= pe)
              return o(y, M, le, ce);
          }
        }
      }
    }
    return [
      [r, y],
      [e, M]
    ];
  }
  function o(y, M, k, _) {
    var f = y.substring(0, k), A = M.substring(0, _), S = y.substring(k), P = M.substring(_), D = n(f, A), T = n(S, P);
    return D.concat(T);
  }
  function l(y, M) {
    if (!y || !M || y.charAt(0) !== M.charAt(0))
      return 0;
    for (var k = 0, _ = Math.min(y.length, M.length), f = _, A = 0; k < f; )
      y.substring(A, f) == M.substring(A, f) ? (k = f, A = k) : _ = f, f = Math.floor((_ - k) / 2 + k);
    return z(y.charCodeAt(f - 1)) && f--, f;
  }
  function u(y, M) {
    var k = y.length, _ = M.length;
    if (k == 0 || _ == 0)
      return 0;
    k > _ ? y = y.substring(k - _) : k < _ && (M = M.substring(0, k));
    var f = Math.min(k, _);
    if (y == M)
      return f;
    for (var A = 0, S = 1; ; ) {
      var P = y.substring(f - S), D = M.indexOf(P);
      if (D == -1)
        return A;
      S += D, (D == 0 || y.substring(f - S) == M.substring(0, S)) && (A = S, S++);
    }
  }
  function d(y, M) {
    if (!y || !M || y.slice(-1) !== M.slice(-1))
      return 0;
    for (var k = 0, _ = Math.min(y.length, M.length), f = _, A = 0; k < f; )
      y.substring(y.length - f, y.length - A) == M.substring(M.length - f, M.length - A) ? (k = f, A = k) : _ = f, f = Math.floor((_ - k) / 2 + k);
    return Q(y.charCodeAt(y.length - f)) && f--, f;
  }
  function p(y, M) {
    var k = y.length > M.length ? y : M, _ = y.length > M.length ? M : y;
    if (k.length < 4 || _.length * 2 < k.length)
      return null;
    function f(J, Z, ge) {
      for (var ye = J.substring(ge, ge + Math.floor(J.length / 4)), ne = -1, oe = "", le, ce, de, pe; (ne = Z.indexOf(ye, ne + 1)) !== -1; ) {
        var Ee = l(
          J.substring(ge),
          Z.substring(ne)
        ), Ce = d(
          J.substring(0, ge),
          Z.substring(0, ne)
        );
        oe.length < Ce + Ee && (oe = Z.substring(ne - Ce, ne) + Z.substring(ne, ne + Ee), le = J.substring(0, ge - Ce), ce = J.substring(ge + Ee), de = Z.substring(0, ne - Ce), pe = Z.substring(ne + Ee));
      }
      return oe.length * 2 >= J.length ? [
        le,
        ce,
        de,
        pe,
        oe
      ] : null;
    }
    var A = f(
      k,
      _,
      Math.ceil(k.length / 4)
    ), S = f(
      k,
      _,
      Math.ceil(k.length / 2)
    ), P;
    if (!A && !S)
      return null;
    S ? A ? P = A[4].length > S[4].length ? A : S : P = S : P = A;
    var D, T, N, U;
    y.length > M.length ? (D = P[0], T = P[1], N = P[2], U = P[3]) : (N = P[0], U = P[1], D = P[2], T = P[3]);
    var V = P[4];
    return [D, T, N, U, V];
  }
  function b(y) {
    for (var M = !1, k = [], _ = 0, f = null, A = 0, S = 0, P = 0, D = 0, T = 0; A < y.length; )
      y[A][0] == t ? (k[_++] = A, S = D, P = T, D = 0, T = 0, f = y[A][1]) : (y[A][0] == e ? D += y[A][1].length : T += y[A][1].length, f && f.length <= Math.max(S, P) && f.length <= Math.max(D, T) && (y.splice(k[_ - 1], 0, [
        r,
        f
      ]), y[k[_ - 1] + 1][0] = e, _--, _--, A = _ > 0 ? k[_ - 1] : -1, S = 0, P = 0, D = 0, T = 0, f = null, M = !0)), A++;
    for (M && j(y), R(y), A = 1; A < y.length; ) {
      if (y[A - 1][0] == r && y[A][0] == e) {
        var N = y[A - 1][1], U = y[A][1], V = u(N, U), J = u(U, N);
        V >= J ? (V >= N.length / 2 || V >= U.length / 2) && (y.splice(A, 0, [
          t,
          U.substring(0, V)
        ]), y[A - 1][1] = N.substring(
          0,
          N.length - V
        ), y[A + 1][1] = U.substring(V), A++) : (J >= N.length / 2 || J >= U.length / 2) && (y.splice(A, 0, [
          t,
          N.substring(0, J)
        ]), y[A - 1][0] = e, y[A - 1][1] = U.substring(
          0,
          U.length - J
        ), y[A + 1][0] = r, y[A + 1][1] = N.substring(J), A++), A++;
      }
      A++;
    }
  }
  var h = /[^a-zA-Z0-9]/, w = /\s/, E = /[\r\n]/, C = /\n\r?\n$/, L = /^\r?\n\r?\n/;
  function R(y) {
    function M(J, Z) {
      if (!J || !Z)
        return 6;
      var ge = J.charAt(J.length - 1), ye = Z.charAt(0), ne = ge.match(h), oe = ye.match(h), le = ne && ge.match(w), ce = oe && ye.match(w), de = le && ge.match(E), pe = ce && ye.match(E), Ee = de && J.match(C), Ce = pe && Z.match(L);
      return Ee || Ce ? 5 : de || pe ? 4 : ne && !le && ce ? 3 : le || ce ? 2 : ne || oe ? 1 : 0;
    }
    for (var k = 1; k < y.length - 1; ) {
      if (y[k - 1][0] == t && y[k + 1][0] == t) {
        var _ = y[k - 1][1], f = y[k][1], A = y[k + 1][1], S = d(_, f);
        if (S) {
          var P = f.substring(f.length - S);
          _ = _.substring(0, _.length - S), f = P + f.substring(0, f.length - S), A = P + A;
        }
        for (var D = _, T = f, N = A, U = M(_, f) + M(f, A); f.charAt(0) === A.charAt(0); ) {
          _ += f.charAt(0), f = f.substring(1) + A.charAt(0), A = A.substring(1);
          var V = M(_, f) + M(f, A);
          V >= U && (U = V, D = _, T = f, N = A);
        }
        y[k - 1][1] != D && (D ? y[k - 1][1] = D : (y.splice(k - 1, 1), k--), y[k][1] = T, N ? y[k + 1][1] = N : (y.splice(k + 1, 1), k--));
      }
      k++;
    }
  }
  function j(y, M) {
    y.push([t, ""]);
    for (var k = 0, _ = 0, f = 0, A = "", S = "", P; k < y.length; ) {
      if (k < y.length - 1 && !y[k][1]) {
        y.splice(k, 1);
        continue;
      }
      switch (y[k][0]) {
        case e:
          f++, S += y[k][1], k++;
          break;
        case r:
          _++, A += y[k][1], k++;
          break;
        case t:
          var D = k - f - _ - 1;
          if (M) {
            if (D >= 0 && ae(y[D][1])) {
              var T = y[D][1].slice(-1);
              if (y[D][1] = y[D][1].slice(
                0,
                -1
              ), A = T + A, S = T + S, !y[D][1]) {
                y.splice(D, 1), k--;
                var N = D - 1;
                y[N] && y[N][0] === e && (f++, S = y[N][1] + S, N--), y[N] && y[N][0] === r && (_++, A = y[N][1] + A, N--), D = N;
              }
            }
            if (K(y[k][1])) {
              var T = y[k][1].charAt(0);
              y[k][1] = y[k][1].slice(1), A += T, S += T;
            }
          }
          if (k < y.length - 1 && !y[k][1]) {
            y.splice(k, 1);
            break;
          }
          if (A.length > 0 || S.length > 0) {
            A.length > 0 && S.length > 0 && (P = l(S, A), P !== 0 && (D >= 0 ? y[D][1] += S.substring(
              0,
              P
            ) : (y.splice(0, 0, [
              t,
              S.substring(0, P)
            ]), k++), S = S.substring(P), A = A.substring(P)), P = d(S, A), P !== 0 && (y[k][1] = S.substring(S.length - P) + y[k][1], S = S.substring(
              0,
              S.length - P
            ), A = A.substring(
              0,
              A.length - P
            )));
            var U = f + _;
            A.length === 0 && S.length === 0 ? (y.splice(k - U, U), k = k - U) : A.length === 0 ? (y.splice(k - U, U, [e, S]), k = k - U + 1) : S.length === 0 ? (y.splice(k - U, U, [r, A]), k = k - U + 1) : (y.splice(
              k - U,
              U,
              [r, A],
              [e, S]
            ), k = k - U + 2);
          }
          k !== 0 && y[k - 1][0] === t ? (y[k - 1][1] += y[k][1], y.splice(k, 1)) : k++, f = 0, _ = 0, A = "", S = "";
          break;
      }
    }
    y[y.length - 1][1] === "" && y.pop();
    var V = !1;
    for (k = 1; k < y.length - 1; )
      y[k - 1][0] === t && y[k + 1][0] === t && (y[k][1].substring(
        y[k][1].length - y[k - 1][1].length
      ) === y[k - 1][1] ? (y[k][1] = y[k - 1][1] + y[k][1].substring(
        0,
        y[k][1].length - y[k - 1][1].length
      ), y[k + 1][1] = y[k - 1][1] + y[k + 1][1], y.splice(k - 1, 1), V = !0) : y[k][1].substring(0, y[k + 1][1].length) == y[k + 1][1] && (y[k - 1][1] += y[k + 1][1], y[k][1] = y[k][1].substring(y[k + 1][1].length) + y[k + 1][1], y.splice(k + 1, 1), V = !0)), k++;
    V && j(y, M);
  }
  function z(y) {
    return y >= 55296 && y <= 56319;
  }
  function Q(y) {
    return y >= 56320 && y <= 57343;
  }
  function K(y) {
    return Q(y.charCodeAt(0));
  }
  function ae(y) {
    return z(y.charCodeAt(y.length - 1));
  }
  function ie(y) {
    for (var M = [], k = 0; k < y.length; k++)
      y[k][1].length > 0 && M.push(y[k]);
    return M;
  }
  function be(y, M, k, _) {
    return ae(y) || K(_) ? null : ie([
      [t, y],
      [r, M],
      [e, k],
      [t, _]
    ]);
  }
  function Ae(y, M, k) {
    var _ = typeof k == "number" ? { index: k, length: 0 } : k.oldRange, f = typeof k == "number" ? null : k.newRange, A = y.length, S = M.length;
    if (_.length === 0 && (f === null || f.length === 0)) {
      var P = _.index, D = y.slice(0, P), T = y.slice(P), N = f ? f.index : null;
      e: {
        var U = P + S - A;
        if (N !== null && N !== U || U < 0 || U > S)
          break e;
        var V = M.slice(0, U), J = M.slice(U);
        if (J !== T)
          break e;
        var Z = Math.min(P, U), ge = D.slice(0, Z), ye = V.slice(0, Z);
        if (ge !== ye)
          break e;
        var ne = D.slice(Z), oe = V.slice(Z);
        return be(ge, ne, oe, T);
      }
      e: {
        if (N !== null && N !== P)
          break e;
        var le = P, V = M.slice(0, le), J = M.slice(le);
        if (V !== D)
          break e;
        var ce = Math.min(A - le, S - le), de = T.slice(T.length - ce), pe = J.slice(J.length - ce);
        if (de !== pe)
          break e;
        var ne = T.slice(0, T.length - ce), oe = J.slice(0, J.length - ce);
        return be(D, ne, oe, de);
      }
    }
    if (_.length > 0 && f && f.length === 0)
      e: {
        var ge = y.slice(0, _.index), de = y.slice(_.index + _.length), Z = ge.length, ce = de.length;
        if (S < Z + ce)
          break e;
        var ye = M.slice(0, Z), pe = M.slice(S - ce);
        if (ge !== ye || de !== pe)
          break e;
        var ne = y.slice(Z, A - ce), oe = M.slice(Z, S - ce);
        return be(ge, ne, oe, de);
      }
    return null;
  }
  function we(y, M, k, _) {
    return n(y, M, k, _, !0);
  }
  return we.INSERT = e, we.DELETE = r, we.EQUAL = t, ni = we, ni;
}
var rn = { exports: {} };
rn.exports;
var Da;
function ml() {
  return Da || (Da = 1, (function(r, e) {
    var t = 200, n = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", u = "[object Date]", d = "[object Error]", p = "[object Function]", b = "[object GeneratorFunction]", h = "[object Map]", w = "[object Number]", E = "[object Object]", C = "[object Promise]", L = "[object RegExp]", R = "[object Set]", j = "[object String]", z = "[object Symbol]", Q = "[object WeakMap]", K = "[object ArrayBuffer]", ae = "[object DataView]", ie = "[object Float32Array]", be = "[object Float64Array]", Ae = "[object Int8Array]", we = "[object Int16Array]", y = "[object Int32Array]", M = "[object Uint8Array]", k = "[object Uint8ClampedArray]", _ = "[object Uint16Array]", f = "[object Uint32Array]", A = /[\\^$.*+?()[\]{}|]/g, S = /\w*$/, P = /^\[object .+?Constructor\]$/, D = /^(?:0|[1-9]\d*)$/, T = {};
    T[i] = T[o] = T[K] = T[ae] = T[l] = T[u] = T[ie] = T[be] = T[Ae] = T[we] = T[y] = T[h] = T[w] = T[E] = T[L] = T[R] = T[j] = T[z] = T[M] = T[k] = T[_] = T[f] = !0, T[d] = T[p] = T[Q] = !1;
    var N = typeof zt == "object" && zt && zt.Object === Object && zt, U = typeof self == "object" && self && self.Object === Object && self, V = N || U || Function("return this")(), J = e && !e.nodeType && e, Z = J && !0 && r && !r.nodeType && r, ge = Z && Z.exports === J;
    function ye(a, c) {
      return a.set(c[0], c[1]), a;
    }
    function ne(a, c) {
      return a.add(c), a;
    }
    function oe(a, c) {
      for (var x = -1, O = a ? a.length : 0; ++x < O && c(a[x], x, a) !== !1; )
        ;
      return a;
    }
    function le(a, c) {
      for (var x = -1, O = c.length, se = a.length; ++x < O; )
        a[se + x] = c[x];
      return a;
    }
    function ce(a, c, x, O) {
      for (var se = -1, Y = a ? a.length : 0; ++se < Y; )
        x = c(x, a[se], se, a);
      return x;
    }
    function de(a, c) {
      for (var x = -1, O = Array(a); ++x < a; )
        O[x] = c(x);
      return O;
    }
    function pe(a, c) {
      return a?.[c];
    }
    function Ee(a) {
      var c = !1;
      if (a != null && typeof a.toString != "function")
        try {
          c = !!(a + "");
        } catch {
        }
      return c;
    }
    function Ce(a) {
      var c = -1, x = Array(a.size);
      return a.forEach(function(O, se) {
        x[++c] = [se, O];
      }), x;
    }
    function Jt(a, c) {
      return function(x) {
        return a(c(x));
      };
    }
    function er(a) {
      var c = -1, x = Array(a.size);
      return a.forEach(function(O) {
        x[++c] = O;
      }), x;
    }
    var wr = Array.prototype, tr = Function.prototype, At = Object.prototype, rr = V["__core-js_shared__"], Ar = (function() {
      var a = /[^.]+$/.exec(rr && rr.keys && rr.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), Er = tr.toString, Qe = At.hasOwnProperty, Et = At.toString, Nr = RegExp(
      "^" + Er.call(Qe).replace(A, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Nt = ge ? V.Buffer : void 0, Tt = V.Symbol, pt = V.Uint8Array, Ve = Jt(Object.getPrototypeOf, Object), kt = Object.create, St = At.propertyIsEnumerable, Hr = wr.splice, nr = Object.getOwnPropertySymbols, Bt = Nt ? Nt.isBuffer : void 0, sr = Jt(Object.keys, Object), Ft = st(V, "DataView"), m = st(V, "Map"), g = st(V, "Promise"), q = st(V, "Set"), B = st(V, "WeakMap"), re = st(Object, "create"), fe = ze(Ft), Le = ze(m), ir = ze(g), Mt = ze(q), ar = ze(B), Be = Tt ? Tt.prototype : void 0, Tn = Be ? Be.valueOf : void 0;
    function Ct(a) {
      var c = -1, x = a ? a.length : 0;
      for (this.clear(); ++c < x; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function gs() {
      this.__data__ = re ? re(null) : {};
    }
    function bs(a) {
      return this.has(a) && delete this.__data__[a];
    }
    function ys(a) {
      var c = this.__data__;
      if (re) {
        var x = c[a];
        return x === n ? void 0 : x;
      }
      return Qe.call(c, a) ? c[a] : void 0;
    }
    function kn(a) {
      var c = this.__data__;
      return re ? c[a] !== void 0 : Qe.call(c, a);
    }
    function Kr(a, c) {
      var x = this.__data__;
      return x[a] = re && c === void 0 ? n : c, this;
    }
    Ct.prototype.clear = gs, Ct.prototype.delete = bs, Ct.prototype.get = ys, Ct.prototype.has = kn, Ct.prototype.set = Kr;
    function qe(a) {
      var c = -1, x = a ? a.length : 0;
      for (this.clear(); ++c < x; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function vs() {
      this.__data__ = [];
    }
    function xs(a) {
      var c = this.__data__, x = kr(c, a);
      if (x < 0)
        return !1;
      var O = c.length - 1;
      return x == O ? c.pop() : Hr.call(c, x, 1), !0;
    }
    function ws(a) {
      var c = this.__data__, x = kr(c, a);
      return x < 0 ? void 0 : c[x][1];
    }
    function As(a) {
      return kr(this.__data__, a) > -1;
    }
    function Es(a, c) {
      var x = this.__data__, O = kr(x, a);
      return O < 0 ? x.push([a, c]) : x[O][1] = c, this;
    }
    qe.prototype.clear = vs, qe.prototype.delete = xs, qe.prototype.get = ws, qe.prototype.has = As, qe.prototype.set = Es;
    function Fe(a) {
      var c = -1, x = a ? a.length : 0;
      for (this.clear(); ++c < x; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function Ns() {
      this.__data__ = {
        hash: new Ct(),
        map: new (m || qe)(),
        string: new Ct()
      };
    }
    function Ts(a) {
      return lr(this, a).delete(a);
    }
    function ks(a) {
      return lr(this, a).get(a);
    }
    function Ss(a) {
      return lr(this, a).has(a);
    }
    function Cs(a, c) {
      return lr(this, a).set(a, c), this;
    }
    Fe.prototype.clear = Ns, Fe.prototype.delete = Ts, Fe.prototype.get = ks, Fe.prototype.has = Ss, Fe.prototype.set = Cs;
    function Ge(a) {
      this.__data__ = new qe(a);
    }
    function _s() {
      this.__data__ = new qe();
    }
    function Ls(a) {
      return this.__data__.delete(a);
    }
    function qs(a) {
      return this.__data__.get(a);
    }
    function Is(a) {
      return this.__data__.has(a);
    }
    function Os(a, c) {
      var x = this.__data__;
      if (x instanceof qe) {
        var O = x.__data__;
        if (!m || O.length < t - 1)
          return O.push([a, c]), this;
        x = this.__data__ = new Fe(O);
      }
      return x.set(a, c), this;
    }
    Ge.prototype.clear = _s, Ge.prototype.delete = Ls, Ge.prototype.get = qs, Ge.prototype.has = Is, Ge.prototype.set = Os;
    function Tr(a, c) {
      var x = Yr(a) || Cr(a) ? de(a.length, String) : [], O = x.length, se = !!O;
      for (var Y in a)
        Qe.call(a, Y) && !(se && (Y == "length" || Gs(Y, O))) && x.push(Y);
      return x;
    }
    function Sn(a, c, x) {
      var O = a[c];
      (!(Qe.call(a, c) && In(O, x)) || x === void 0 && !(c in a)) && (a[c] = x);
    }
    function kr(a, c) {
      for (var x = a.length; x--; )
        if (In(a[x][0], c))
          return x;
      return -1;
    }
    function mt(a, c) {
      return a && Zr(c, Qr(c), a);
    }
    function Gr(a, c, x, O, se, Y, he) {
      var ue;
      if (O && (ue = Y ? O(a, se, Y, he) : O(a)), ue !== void 0)
        return ue;
      if (!bt(a))
        return a;
      var Ne = Yr(a);
      if (Ne) {
        if (ue = Hs(a), !c)
          return Us(a, ue);
      } else {
        var me = Lt(a), Me = me == p || me == b;
        if (On(a))
          return Sr(a, c);
        if (me == E || me == i || Me && !Y) {
          if (Ee(a))
            return Y ? a : {};
          if (ue = gt(Me ? {} : a), !c)
            return Vs(a, mt(ue, a));
        } else {
          if (!T[me])
            return Y ? a : {};
          ue = Ks(a, me, Gr, c);
        }
      }
      he || (he = new Ge());
      var We = he.get(a);
      if (We)
        return We;
      if (he.set(a, ue), !Ne)
        var ke = x ? zs(a) : Qr(a);
      return oe(ke || a, function(je, Ie) {
        ke && (Ie = je, je = a[Ie]), Sn(ue, Ie, Gr(je, c, x, O, Ie, a, he));
      }), ue;
    }
    function Rs(a) {
      return bt(a) ? kt(a) : {};
    }
    function $s(a, c, x) {
      var O = c(a);
      return Yr(a) ? O : le(O, x(a));
    }
    function Ds(a) {
      return Et.call(a);
    }
    function Bs(a) {
      if (!bt(a) || Zs(a))
        return !1;
      var c = Xr(a) || Ee(a) ? Nr : P;
      return c.test(ze(a));
    }
    function Fs(a) {
      if (!Ln(a))
        return sr(a);
      var c = [];
      for (var x in Object(a))
        Qe.call(a, x) && x != "constructor" && c.push(x);
      return c;
    }
    function Sr(a, c) {
      if (c)
        return a.slice();
      var x = new a.constructor(a.length);
      return a.copy(x), x;
    }
    function Wr(a) {
      var c = new a.constructor(a.byteLength);
      return new pt(c).set(new pt(a)), c;
    }
    function or(a, c) {
      var x = c ? Wr(a.buffer) : a.buffer;
      return new a.constructor(x, a.byteOffset, a.byteLength);
    }
    function Cn(a, c, x) {
      var O = c ? x(Ce(a), !0) : Ce(a);
      return ce(O, ye, new a.constructor());
    }
    function _n(a) {
      var c = new a.constructor(a.source, S.exec(a));
      return c.lastIndex = a.lastIndex, c;
    }
    function Ms(a, c, x) {
      var O = c ? x(er(a), !0) : er(a);
      return ce(O, ne, new a.constructor());
    }
    function js(a) {
      return Tn ? Object(Tn.call(a)) : {};
    }
    function Ps(a, c) {
      var x = c ? Wr(a.buffer) : a.buffer;
      return new a.constructor(x, a.byteOffset, a.length);
    }
    function Us(a, c) {
      var x = -1, O = a.length;
      for (c || (c = Array(O)); ++x < O; )
        c[x] = a[x];
      return c;
    }
    function Zr(a, c, x, O) {
      x || (x = {});
      for (var se = -1, Y = c.length; ++se < Y; ) {
        var he = c[se], ue = void 0;
        Sn(x, he, ue === void 0 ? a[he] : ue);
      }
      return x;
    }
    function Vs(a, c) {
      return Zr(a, _t(a), c);
    }
    function zs(a) {
      return $s(a, Qr, _t);
    }
    function lr(a, c) {
      var x = a.__data__;
      return Ws(c) ? x[typeof c == "string" ? "string" : "hash"] : x.map;
    }
    function st(a, c) {
      var x = pe(a, c);
      return Bs(x) ? x : void 0;
    }
    var _t = nr ? Jt(nr, Object) : Xs, Lt = Ds;
    (Ft && Lt(new Ft(new ArrayBuffer(1))) != ae || m && Lt(new m()) != h || g && Lt(g.resolve()) != C || q && Lt(new q()) != R || B && Lt(new B()) != Q) && (Lt = function(a) {
      var c = Et.call(a), x = c == E ? a.constructor : void 0, O = x ? ze(x) : void 0;
      if (O)
        switch (O) {
          case fe:
            return ae;
          case Le:
            return h;
          case ir:
            return C;
          case Mt:
            return R;
          case ar:
            return Q;
        }
      return c;
    });
    function Hs(a) {
      var c = a.length, x = a.constructor(c);
      return c && typeof a[0] == "string" && Qe.call(a, "index") && (x.index = a.index, x.input = a.input), x;
    }
    function gt(a) {
      return typeof a.constructor == "function" && !Ln(a) ? Rs(Ve(a)) : {};
    }
    function Ks(a, c, x, O) {
      var se = a.constructor;
      switch (c) {
        case K:
          return Wr(a);
        case l:
        case u:
          return new se(+a);
        case ae:
          return or(a, O);
        case ie:
        case be:
        case Ae:
        case we:
        case y:
        case M:
        case k:
        case _:
        case f:
          return Ps(a, O);
        case h:
          return Cn(a, O, x);
        case w:
        case j:
          return new se(a);
        case L:
          return _n(a);
        case R:
          return Ms(a, O, x);
        case z:
          return js(a);
      }
    }
    function Gs(a, c) {
      return c = c ?? s, !!c && (typeof a == "number" || D.test(a)) && a > -1 && a % 1 == 0 && a < c;
    }
    function Ws(a) {
      var c = typeof a;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? a !== "__proto__" : a === null;
    }
    function Zs(a) {
      return !!Ar && Ar in a;
    }
    function Ln(a) {
      var c = a && a.constructor, x = typeof c == "function" && c.prototype || At;
      return a === x;
    }
    function ze(a) {
      if (a != null) {
        try {
          return Er.call(a);
        } catch {
        }
        try {
          return a + "";
        } catch {
        }
      }
      return "";
    }
    function qn(a) {
      return Gr(a, !0, !0);
    }
    function In(a, c) {
      return a === c || a !== a && c !== c;
    }
    function Cr(a) {
      return Ys(a) && Qe.call(a, "callee") && (!St.call(a, "callee") || Et.call(a) == i);
    }
    var Yr = Array.isArray;
    function _r(a) {
      return a != null && Rn(a.length) && !Xr(a);
    }
    function Ys(a) {
      return $n(a) && _r(a);
    }
    var On = Bt || Qs;
    function Xr(a) {
      var c = bt(a) ? Et.call(a) : "";
      return c == p || c == b;
    }
    function Rn(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= s;
    }
    function bt(a) {
      var c = typeof a;
      return !!a && (c == "object" || c == "function");
    }
    function $n(a) {
      return !!a && typeof a == "object";
    }
    function Qr(a) {
      return _r(a) ? Tr(a) : Fs(a);
    }
    function Xs() {
      return [];
    }
    function Qs() {
      return !1;
    }
    r.exports = qn;
  })(rn, rn.exports)), rn.exports;
}
var nn = { exports: {} };
nn.exports;
var Ba;
function gl() {
  return Ba || (Ba = 1, (function(r, e) {
    var t = 200, n = "__lodash_hash_undefined__", s = 1, i = 2, o = 9007199254740991, l = "[object Arguments]", u = "[object Array]", d = "[object AsyncFunction]", p = "[object Boolean]", b = "[object Date]", h = "[object Error]", w = "[object Function]", E = "[object GeneratorFunction]", C = "[object Map]", L = "[object Number]", R = "[object Null]", j = "[object Object]", z = "[object Promise]", Q = "[object Proxy]", K = "[object RegExp]", ae = "[object Set]", ie = "[object String]", be = "[object Symbol]", Ae = "[object Undefined]", we = "[object WeakMap]", y = "[object ArrayBuffer]", M = "[object DataView]", k = "[object Float32Array]", _ = "[object Float64Array]", f = "[object Int8Array]", A = "[object Int16Array]", S = "[object Int32Array]", P = "[object Uint8Array]", D = "[object Uint8ClampedArray]", T = "[object Uint16Array]", N = "[object Uint32Array]", U = /[\\^$.*+?()[\]{}|]/g, V = /^\[object .+?Constructor\]$/, J = /^(?:0|[1-9]\d*)$/, Z = {};
    Z[k] = Z[_] = Z[f] = Z[A] = Z[S] = Z[P] = Z[D] = Z[T] = Z[N] = !0, Z[l] = Z[u] = Z[y] = Z[p] = Z[M] = Z[b] = Z[h] = Z[w] = Z[C] = Z[L] = Z[j] = Z[K] = Z[ae] = Z[ie] = Z[we] = !1;
    var ge = typeof zt == "object" && zt && zt.Object === Object && zt, ye = typeof self == "object" && self && self.Object === Object && self, ne = ge || ye || Function("return this")(), oe = e && !e.nodeType && e, le = oe && !0 && r && !r.nodeType && r, ce = le && le.exports === oe, de = ce && ge.process, pe = (function() {
      try {
        return de && de.binding && de.binding("util");
      } catch {
      }
    })(), Ee = pe && pe.isTypedArray;
    function Ce(a, c) {
      for (var x = -1, O = a == null ? 0 : a.length, se = 0, Y = []; ++x < O; ) {
        var he = a[x];
        c(he, x, a) && (Y[se++] = he);
      }
      return Y;
    }
    function Jt(a, c) {
      for (var x = -1, O = c.length, se = a.length; ++x < O; )
        a[se + x] = c[x];
      return a;
    }
    function er(a, c) {
      for (var x = -1, O = a == null ? 0 : a.length; ++x < O; )
        if (c(a[x], x, a))
          return !0;
      return !1;
    }
    function wr(a, c) {
      for (var x = -1, O = Array(a); ++x < a; )
        O[x] = c(x);
      return O;
    }
    function tr(a) {
      return function(c) {
        return a(c);
      };
    }
    function At(a, c) {
      return a.has(c);
    }
    function rr(a, c) {
      return a?.[c];
    }
    function Ar(a) {
      var c = -1, x = Array(a.size);
      return a.forEach(function(O, se) {
        x[++c] = [se, O];
      }), x;
    }
    function Er(a, c) {
      return function(x) {
        return a(c(x));
      };
    }
    function Qe(a) {
      var c = -1, x = Array(a.size);
      return a.forEach(function(O) {
        x[++c] = O;
      }), x;
    }
    var Et = Array.prototype, Nr = Function.prototype, Nt = Object.prototype, Tt = ne["__core-js_shared__"], pt = Nr.toString, Ve = Nt.hasOwnProperty, kt = (function() {
      var a = /[^.]+$/.exec(Tt && Tt.keys && Tt.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), St = Nt.toString, Hr = RegExp(
      "^" + pt.call(Ve).replace(U, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), nr = ce ? ne.Buffer : void 0, Bt = ne.Symbol, sr = ne.Uint8Array, Ft = Nt.propertyIsEnumerable, m = Et.splice, g = Bt ? Bt.toStringTag : void 0, q = Object.getOwnPropertySymbols, B = nr ? nr.isBuffer : void 0, re = Er(Object.keys, Object), fe = _t(ne, "DataView"), Le = _t(ne, "Map"), ir = _t(ne, "Promise"), Mt = _t(ne, "Set"), ar = _t(ne, "WeakMap"), Be = _t(Object, "create"), Tn = ze(fe), Ct = ze(Le), gs = ze(ir), bs = ze(Mt), ys = ze(ar), kn = Bt ? Bt.prototype : void 0, Kr = kn ? kn.valueOf : void 0;
    function qe(a) {
      var c = -1, x = a == null ? 0 : a.length;
      for (this.clear(); ++c < x; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function vs() {
      this.__data__ = Be ? Be(null) : {}, this.size = 0;
    }
    function xs(a) {
      var c = this.has(a) && delete this.__data__[a];
      return this.size -= c ? 1 : 0, c;
    }
    function ws(a) {
      var c = this.__data__;
      if (Be) {
        var x = c[a];
        return x === n ? void 0 : x;
      }
      return Ve.call(c, a) ? c[a] : void 0;
    }
    function As(a) {
      var c = this.__data__;
      return Be ? c[a] !== void 0 : Ve.call(c, a);
    }
    function Es(a, c) {
      var x = this.__data__;
      return this.size += this.has(a) ? 0 : 1, x[a] = Be && c === void 0 ? n : c, this;
    }
    qe.prototype.clear = vs, qe.prototype.delete = xs, qe.prototype.get = ws, qe.prototype.has = As, qe.prototype.set = Es;
    function Fe(a) {
      var c = -1, x = a == null ? 0 : a.length;
      for (this.clear(); ++c < x; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function Ns() {
      this.__data__ = [], this.size = 0;
    }
    function Ts(a) {
      var c = this.__data__, x = Sr(c, a);
      if (x < 0)
        return !1;
      var O = c.length - 1;
      return x == O ? c.pop() : m.call(c, x, 1), --this.size, !0;
    }
    function ks(a) {
      var c = this.__data__, x = Sr(c, a);
      return x < 0 ? void 0 : c[x][1];
    }
    function Ss(a) {
      return Sr(this.__data__, a) > -1;
    }
    function Cs(a, c) {
      var x = this.__data__, O = Sr(x, a);
      return O < 0 ? (++this.size, x.push([a, c])) : x[O][1] = c, this;
    }
    Fe.prototype.clear = Ns, Fe.prototype.delete = Ts, Fe.prototype.get = ks, Fe.prototype.has = Ss, Fe.prototype.set = Cs;
    function Ge(a) {
      var c = -1, x = a == null ? 0 : a.length;
      for (this.clear(); ++c < x; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function _s() {
      this.size = 0, this.__data__ = {
        hash: new qe(),
        map: new (Le || Fe)(),
        string: new qe()
      };
    }
    function Ls(a) {
      var c = st(this, a).delete(a);
      return this.size -= c ? 1 : 0, c;
    }
    function qs(a) {
      return st(this, a).get(a);
    }
    function Is(a) {
      return st(this, a).has(a);
    }
    function Os(a, c) {
      var x = st(this, a), O = x.size;
      return x.set(a, c), this.size += x.size == O ? 0 : 1, this;
    }
    Ge.prototype.clear = _s, Ge.prototype.delete = Ls, Ge.prototype.get = qs, Ge.prototype.has = Is, Ge.prototype.set = Os;
    function Tr(a) {
      var c = -1, x = a == null ? 0 : a.length;
      for (this.__data__ = new Ge(); ++c < x; )
        this.add(a[c]);
    }
    function Sn(a) {
      return this.__data__.set(a, n), this;
    }
    function kr(a) {
      return this.__data__.has(a);
    }
    Tr.prototype.add = Tr.prototype.push = Sn, Tr.prototype.has = kr;
    function mt(a) {
      var c = this.__data__ = new Fe(a);
      this.size = c.size;
    }
    function Gr() {
      this.__data__ = new Fe(), this.size = 0;
    }
    function Rs(a) {
      var c = this.__data__, x = c.delete(a);
      return this.size = c.size, x;
    }
    function $s(a) {
      return this.__data__.get(a);
    }
    function Ds(a) {
      return this.__data__.has(a);
    }
    function Bs(a, c) {
      var x = this.__data__;
      if (x instanceof Fe) {
        var O = x.__data__;
        if (!Le || O.length < t - 1)
          return O.push([a, c]), this.size = ++x.size, this;
        x = this.__data__ = new Ge(O);
      }
      return x.set(a, c), this.size = x.size, this;
    }
    mt.prototype.clear = Gr, mt.prototype.delete = Rs, mt.prototype.get = $s, mt.prototype.has = Ds, mt.prototype.set = Bs;
    function Fs(a, c) {
      var x = Cr(a), O = !x && In(a), se = !x && !O && _r(a), Y = !x && !O && !se && $n(a), he = x || O || se || Y, ue = he ? wr(a.length, String) : [], Ne = ue.length;
      for (var me in a)
        Ve.call(a, me) && !(he && // Safari 9 has enumerable `arguments.length` in strict mode.
        (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        se && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Y && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
        Ks(me, Ne))) && ue.push(me);
      return ue;
    }
    function Sr(a, c) {
      for (var x = a.length; x--; )
        if (qn(a[x][0], c))
          return x;
      return -1;
    }
    function Wr(a, c, x) {
      var O = c(a);
      return Cr(a) ? O : Jt(O, x(a));
    }
    function or(a) {
      return a == null ? a === void 0 ? Ae : R : g && g in Object(a) ? Lt(a) : Ln(a);
    }
    function Cn(a) {
      return bt(a) && or(a) == l;
    }
    function _n(a, c, x, O, se) {
      return a === c ? !0 : a == null || c == null || !bt(a) && !bt(c) ? a !== a && c !== c : Ms(a, c, x, O, _n, se);
    }
    function Ms(a, c, x, O, se, Y) {
      var he = Cr(a), ue = Cr(c), Ne = he ? u : gt(a), me = ue ? u : gt(c);
      Ne = Ne == l ? j : Ne, me = me == l ? j : me;
      var Me = Ne == j, We = me == j, ke = Ne == me;
      if (ke && _r(a)) {
        if (!_r(c))
          return !1;
        he = !0, Me = !1;
      }
      if (ke && !Me)
        return Y || (Y = new mt()), he || $n(a) ? Zr(a, c, x, O, se, Y) : Vs(a, c, Ne, x, O, se, Y);
      if (!(x & s)) {
        var je = Me && Ve.call(a, "__wrapped__"), Ie = We && Ve.call(c, "__wrapped__");
        if (je || Ie) {
          var jt = je ? a.value() : a, qt = Ie ? c.value() : c;
          return Y || (Y = new mt()), se(jt, qt, x, O, Y);
        }
      }
      return ke ? (Y || (Y = new mt()), zs(a, c, x, O, se, Y)) : !1;
    }
    function js(a) {
      if (!Rn(a) || Ws(a))
        return !1;
      var c = On(a) ? Hr : V;
      return c.test(ze(a));
    }
    function Ps(a) {
      return bt(a) && Xr(a.length) && !!Z[or(a)];
    }
    function Us(a) {
      if (!Zs(a))
        return re(a);
      var c = [];
      for (var x in Object(a))
        Ve.call(a, x) && x != "constructor" && c.push(x);
      return c;
    }
    function Zr(a, c, x, O, se, Y) {
      var he = x & s, ue = a.length, Ne = c.length;
      if (ue != Ne && !(he && Ne > ue))
        return !1;
      var me = Y.get(a);
      if (me && Y.get(c))
        return me == c;
      var Me = -1, We = !0, ke = x & i ? new Tr() : void 0;
      for (Y.set(a, c), Y.set(c, a); ++Me < ue; ) {
        var je = a[Me], Ie = c[Me];
        if (O)
          var jt = he ? O(Ie, je, Me, c, a, Y) : O(je, Ie, Me, a, c, Y);
        if (jt !== void 0) {
          if (jt)
            continue;
          We = !1;
          break;
        }
        if (ke) {
          if (!er(c, function(qt, ur) {
            if (!At(ke, ur) && (je === qt || se(je, qt, x, O, Y)))
              return ke.push(ur);
          })) {
            We = !1;
            break;
          }
        } else if (!(je === Ie || se(je, Ie, x, O, Y))) {
          We = !1;
          break;
        }
      }
      return Y.delete(a), Y.delete(c), We;
    }
    function Vs(a, c, x, O, se, Y, he) {
      switch (x) {
        case M:
          if (a.byteLength != c.byteLength || a.byteOffset != c.byteOffset)
            return !1;
          a = a.buffer, c = c.buffer;
        case y:
          return !(a.byteLength != c.byteLength || !Y(new sr(a), new sr(c)));
        case p:
        case b:
        case L:
          return qn(+a, +c);
        case h:
          return a.name == c.name && a.message == c.message;
        case K:
        case ie:
          return a == c + "";
        case C:
          var ue = Ar;
        case ae:
          var Ne = O & s;
          if (ue || (ue = Qe), a.size != c.size && !Ne)
            return !1;
          var me = he.get(a);
          if (me)
            return me == c;
          O |= i, he.set(a, c);
          var Me = Zr(ue(a), ue(c), O, se, Y, he);
          return he.delete(a), Me;
        case be:
          if (Kr)
            return Kr.call(a) == Kr.call(c);
      }
      return !1;
    }
    function zs(a, c, x, O, se, Y) {
      var he = x & s, ue = lr(a), Ne = ue.length, me = lr(c), Me = me.length;
      if (Ne != Me && !he)
        return !1;
      for (var We = Ne; We--; ) {
        var ke = ue[We];
        if (!(he ? ke in c : Ve.call(c, ke)))
          return !1;
      }
      var je = Y.get(a);
      if (je && Y.get(c))
        return je == c;
      var Ie = !0;
      Y.set(a, c), Y.set(c, a);
      for (var jt = he; ++We < Ne; ) {
        ke = ue[We];
        var qt = a[ke], ur = c[ke];
        if (O)
          var sa = he ? O(ur, qt, ke, c, a, Y) : O(qt, ur, ke, a, c, Y);
        if (!(sa === void 0 ? qt === ur || se(qt, ur, x, O, Y) : sa)) {
          Ie = !1;
          break;
        }
        jt || (jt = ke == "constructor");
      }
      if (Ie && !jt) {
        var Dn = a.constructor, Bn = c.constructor;
        Dn != Bn && "constructor" in a && "constructor" in c && !(typeof Dn == "function" && Dn instanceof Dn && typeof Bn == "function" && Bn instanceof Bn) && (Ie = !1);
      }
      return Y.delete(a), Y.delete(c), Ie;
    }
    function lr(a) {
      return Wr(a, Qr, Hs);
    }
    function st(a, c) {
      var x = a.__data__;
      return Gs(c) ? x[typeof c == "string" ? "string" : "hash"] : x.map;
    }
    function _t(a, c) {
      var x = rr(a, c);
      return js(x) ? x : void 0;
    }
    function Lt(a) {
      var c = Ve.call(a, g), x = a[g];
      try {
        a[g] = void 0;
        var O = !0;
      } catch {
      }
      var se = St.call(a);
      return O && (c ? a[g] = x : delete a[g]), se;
    }
    var Hs = q ? function(a) {
      return a == null ? [] : (a = Object(a), Ce(q(a), function(c) {
        return Ft.call(a, c);
      }));
    } : Xs, gt = or;
    (fe && gt(new fe(new ArrayBuffer(1))) != M || Le && gt(new Le()) != C || ir && gt(ir.resolve()) != z || Mt && gt(new Mt()) != ae || ar && gt(new ar()) != we) && (gt = function(a) {
      var c = or(a), x = c == j ? a.constructor : void 0, O = x ? ze(x) : "";
      if (O)
        switch (O) {
          case Tn:
            return M;
          case Ct:
            return C;
          case gs:
            return z;
          case bs:
            return ae;
          case ys:
            return we;
        }
      return c;
    });
    function Ks(a, c) {
      return c = c ?? o, !!c && (typeof a == "number" || J.test(a)) && a > -1 && a % 1 == 0 && a < c;
    }
    function Gs(a) {
      var c = typeof a;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? a !== "__proto__" : a === null;
    }
    function Ws(a) {
      return !!kt && kt in a;
    }
    function Zs(a) {
      var c = a && a.constructor, x = typeof c == "function" && c.prototype || Nt;
      return a === x;
    }
    function Ln(a) {
      return St.call(a);
    }
    function ze(a) {
      if (a != null) {
        try {
          return pt.call(a);
        } catch {
        }
        try {
          return a + "";
        } catch {
        }
      }
      return "";
    }
    function qn(a, c) {
      return a === c || a !== a && c !== c;
    }
    var In = Cn(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Cn : function(a) {
      return bt(a) && Ve.call(a, "callee") && !Ft.call(a, "callee");
    }, Cr = Array.isArray;
    function Yr(a) {
      return a != null && Xr(a.length) && !On(a);
    }
    var _r = B || Qs;
    function Ys(a, c) {
      return _n(a, c);
    }
    function On(a) {
      if (!Rn(a))
        return !1;
      var c = or(a);
      return c == w || c == E || c == d || c == Q;
    }
    function Xr(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= o;
    }
    function Rn(a) {
      var c = typeof a;
      return a != null && (c == "object" || c == "function");
    }
    function bt(a) {
      return a != null && typeof a == "object";
    }
    var $n = Ee ? tr(Ee) : Ps;
    function Qr(a) {
      return Yr(a) ? Fs(a) : Us(a);
    }
    function Xs() {
      return [];
    }
    function Qs() {
      return !1;
    }
    r.exports = Ys;
  })(nn, nn.exports)), nn.exports;
}
var jn = {}, Fa;
function Om() {
  if (Fa) return jn;
  Fa = 1, Object.defineProperty(jn, "__esModule", { value: !0 });
  const r = ml(), e = gl();
  var t;
  return (function(n) {
    function s(u = {}, d = {}, p = !1) {
      typeof u != "object" && (u = {}), typeof d != "object" && (d = {});
      let b = r(d);
      p || (b = Object.keys(b).reduce((h, w) => (b[w] != null && (h[w] = b[w]), h), {}));
      for (const h in u)
        u[h] !== void 0 && d[h] === void 0 && (b[h] = u[h]);
      return Object.keys(b).length > 0 ? b : void 0;
    }
    n.compose = s;
    function i(u = {}, d = {}) {
      typeof u != "object" && (u = {}), typeof d != "object" && (d = {});
      const p = Object.keys(u).concat(Object.keys(d)).reduce((b, h) => (e(u[h], d[h]) || (b[h] = d[h] === void 0 ? null : d[h]), b), {});
      return Object.keys(p).length > 0 ? p : void 0;
    }
    n.diff = i;
    function o(u = {}, d = {}) {
      u = u || {};
      const p = Object.keys(d).reduce((b, h) => (d[h] !== u[h] && u[h] !== void 0 && (b[h] = d[h]), b), {});
      return Object.keys(u).reduce((b, h) => (u[h] !== d[h] && d[h] === void 0 && (b[h] = null), b), p);
    }
    n.invert = o;
    function l(u, d, p = !1) {
      if (typeof u != "object")
        return d;
      if (typeof d != "object")
        return;
      if (!p)
        return d;
      const b = Object.keys(d).reduce((h, w) => (u[w] === void 0 && (h[w] = d[w]), h), {});
      return Object.keys(b).length > 0 ? b : void 0;
    }
    n.transform = l;
  })(t || (t = {})), jn.default = t, jn;
}
var Pn = {}, Ma;
function bl() {
  if (Ma) return Pn;
  Ma = 1, Object.defineProperty(Pn, "__esModule", { value: !0 });
  var r;
  return (function(e) {
    function t(n) {
      return typeof n.delete == "number" ? n.delete : typeof n.retain == "number" ? n.retain : typeof n.retain == "object" && n.retain !== null ? 1 : typeof n.insert == "string" ? n.insert.length : 1;
    }
    e.length = t;
  })(r || (r = {})), Pn.default = r, Pn;
}
var Un = {}, ja;
function Rm() {
  if (ja) return Un;
  ja = 1, Object.defineProperty(Un, "__esModule", { value: !0 });
  const r = bl();
  class e {
    constructor(n) {
      this.ops = n, this.index = 0, this.offset = 0;
    }
    hasNext() {
      return this.peekLength() < 1 / 0;
    }
    next(n) {
      n || (n = 1 / 0);
      const s = this.ops[this.index];
      if (s) {
        const i = this.offset, o = r.default.length(s);
        if (n >= o - i ? (n = o - i, this.index += 1, this.offset = 0) : this.offset += n, typeof s.delete == "number")
          return { delete: n };
        {
          const l = {};
          return s.attributes && (l.attributes = s.attributes), typeof s.retain == "number" ? l.retain = n : typeof s.retain == "object" && s.retain !== null ? l.retain = s.retain : typeof s.insert == "string" ? l.insert = s.insert.substr(i, n) : l.insert = s.insert, l;
        }
      } else
        return { retain: 1 / 0 };
    }
    peek() {
      return this.ops[this.index];
    }
    peekLength() {
      return this.ops[this.index] ? r.default.length(this.ops[this.index]) - this.offset : 1 / 0;
    }
    peekType() {
      const n = this.ops[this.index];
      return n ? typeof n.delete == "number" ? "delete" : typeof n.retain == "number" || typeof n.retain == "object" && n.retain !== null ? "retain" : "insert" : "retain";
    }
    rest() {
      if (this.hasNext()) {
        if (this.offset === 0)
          return this.ops.slice(this.index);
        {
          const n = this.offset, s = this.index, i = this.next(), o = this.ops.slice(this.index);
          return this.offset = n, this.index = s, [i].concat(o);
        }
      } else return [];
    }
  }
  return Un.default = e, Un;
}
var Pa;
function $m() {
  return Pa || (Pa = 1, (function(r, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = Im(), n = ml(), s = gl(), i = Om();
    e.AttributeMap = i.default;
    const o = bl();
    e.Op = o.default;
    const l = Rm();
    e.OpIterator = l.default;
    const u = "\0", d = (b, h) => {
      if (typeof b != "object" || b === null)
        throw new Error(`cannot retain a ${typeof b}`);
      if (typeof h != "object" || h === null)
        throw new Error(`cannot retain a ${typeof h}`);
      const w = Object.keys(b)[0];
      if (!w || w !== Object.keys(h)[0])
        throw new Error(`embed types not matched: ${w} != ${Object.keys(h)[0]}`);
      return [w, b[w], h[w]];
    };
    class p {
      constructor(h) {
        Array.isArray(h) ? this.ops = h : h != null && Array.isArray(h.ops) ? this.ops = h.ops : this.ops = [];
      }
      static registerEmbed(h, w) {
        this.handlers[h] = w;
      }
      static unregisterEmbed(h) {
        delete this.handlers[h];
      }
      static getHandler(h) {
        const w = this.handlers[h];
        if (!w)
          throw new Error(`no handlers for embed type "${h}"`);
        return w;
      }
      insert(h, w) {
        const E = {};
        return typeof h == "string" && h.length === 0 ? this : (E.insert = h, w != null && typeof w == "object" && Object.keys(w).length > 0 && (E.attributes = w), this.push(E));
      }
      delete(h) {
        return h <= 0 ? this : this.push({ delete: h });
      }
      retain(h, w) {
        if (typeof h == "number" && h <= 0)
          return this;
        const E = { retain: h };
        return w != null && typeof w == "object" && Object.keys(w).length > 0 && (E.attributes = w), this.push(E);
      }
      push(h) {
        let w = this.ops.length, E = this.ops[w - 1];
        if (h = n(h), typeof E == "object") {
          if (typeof h.delete == "number" && typeof E.delete == "number")
            return this.ops[w - 1] = { delete: E.delete + h.delete }, this;
          if (typeof E.delete == "number" && h.insert != null && (w -= 1, E = this.ops[w - 1], typeof E != "object"))
            return this.ops.unshift(h), this;
          if (s(h.attributes, E.attributes)) {
            if (typeof h.insert == "string" && typeof E.insert == "string")
              return this.ops[w - 1] = { insert: E.insert + h.insert }, typeof h.attributes == "object" && (this.ops[w - 1].attributes = h.attributes), this;
            if (typeof h.retain == "number" && typeof E.retain == "number")
              return this.ops[w - 1] = { retain: E.retain + h.retain }, typeof h.attributes == "object" && (this.ops[w - 1].attributes = h.attributes), this;
          }
        }
        return w === this.ops.length ? this.ops.push(h) : this.ops.splice(w, 0, h), this;
      }
      chop() {
        const h = this.ops[this.ops.length - 1];
        return h && typeof h.retain == "number" && !h.attributes && this.ops.pop(), this;
      }
      filter(h) {
        return this.ops.filter(h);
      }
      forEach(h) {
        this.ops.forEach(h);
      }
      map(h) {
        return this.ops.map(h);
      }
      partition(h) {
        const w = [], E = [];
        return this.forEach((C) => {
          (h(C) ? w : E).push(C);
        }), [w, E];
      }
      reduce(h, w) {
        return this.ops.reduce(h, w);
      }
      changeLength() {
        return this.reduce((h, w) => w.insert ? h + o.default.length(w) : w.delete ? h - w.delete : h, 0);
      }
      length() {
        return this.reduce((h, w) => h + o.default.length(w), 0);
      }
      slice(h = 0, w = 1 / 0) {
        const E = [], C = new l.default(this.ops);
        let L = 0;
        for (; L < w && C.hasNext(); ) {
          let R;
          L < h ? R = C.next(h - L) : (R = C.next(w - L), E.push(R)), L += o.default.length(R);
        }
        return new p(E);
      }
      compose(h) {
        const w = new l.default(this.ops), E = new l.default(h.ops), C = [], L = E.peek();
        if (L != null && typeof L.retain == "number" && L.attributes == null) {
          let j = L.retain;
          for (; w.peekType() === "insert" && w.peekLength() <= j; )
            j -= w.peekLength(), C.push(w.next());
          L.retain - j > 0 && E.next(L.retain - j);
        }
        const R = new p(C);
        for (; w.hasNext() || E.hasNext(); )
          if (E.peekType() === "insert")
            R.push(E.next());
          else if (w.peekType() === "delete")
            R.push(w.next());
          else {
            const j = Math.min(w.peekLength(), E.peekLength()), z = w.next(j), Q = E.next(j);
            if (Q.retain) {
              const K = {};
              if (typeof z.retain == "number")
                K.retain = typeof Q.retain == "number" ? j : Q.retain;
              else if (typeof Q.retain == "number")
                z.retain == null ? K.insert = z.insert : K.retain = z.retain;
              else {
                const ie = z.retain == null ? "insert" : "retain", [be, Ae, we] = d(z[ie], Q.retain), y = p.getHandler(be);
                K[ie] = {
                  [be]: y.compose(Ae, we, ie === "retain")
                };
              }
              const ae = i.default.compose(z.attributes, Q.attributes, typeof z.retain == "number");
              if (ae && (K.attributes = ae), R.push(K), !E.hasNext() && s(R.ops[R.ops.length - 1], K)) {
                const ie = new p(w.rest());
                return R.concat(ie).chop();
              }
            } else typeof Q.delete == "number" && (typeof z.retain == "number" || typeof z.retain == "object" && z.retain !== null) && R.push(Q);
          }
        return R.chop();
      }
      concat(h) {
        const w = new p(this.ops.slice());
        return h.ops.length > 0 && (w.push(h.ops[0]), w.ops = w.ops.concat(h.ops.slice(1))), w;
      }
      diff(h, w) {
        if (this.ops === h.ops)
          return new p();
        const E = [this, h].map((z) => z.map((Q) => {
          if (Q.insert != null)
            return typeof Q.insert == "string" ? Q.insert : u;
          const K = z === h ? "on" : "with";
          throw new Error("diff() called " + K + " non-document");
        }).join("")), C = new p(), L = t(E[0], E[1], w, !0), R = new l.default(this.ops), j = new l.default(h.ops);
        return L.forEach((z) => {
          let Q = z[1].length;
          for (; Q > 0; ) {
            let K = 0;
            switch (z[0]) {
              case t.INSERT:
                K = Math.min(j.peekLength(), Q), C.push(j.next(K));
                break;
              case t.DELETE:
                K = Math.min(Q, R.peekLength()), R.next(K), C.delete(K);
                break;
              case t.EQUAL:
                K = Math.min(R.peekLength(), j.peekLength(), Q);
                const ae = R.next(K), ie = j.next(K);
                s(ae.insert, ie.insert) ? C.retain(K, i.default.diff(ae.attributes, ie.attributes)) : C.push(ie).delete(K);
                break;
            }
            Q -= K;
          }
        }), C.chop();
      }
      eachLine(h, w = `
`) {
        const E = new l.default(this.ops);
        let C = new p(), L = 0;
        for (; E.hasNext(); ) {
          if (E.peekType() !== "insert")
            return;
          const R = E.peek(), j = o.default.length(R) - E.peekLength(), z = typeof R.insert == "string" ? R.insert.indexOf(w, j) - j : -1;
          if (z < 0)
            C.push(E.next());
          else if (z > 0)
            C.push(E.next(z));
          else {
            if (h(C, E.next(1).attributes || {}, L) === !1)
              return;
            L += 1, C = new p();
          }
        }
        C.length() > 0 && h(C, {}, L);
      }
      invert(h) {
        const w = new p();
        return this.reduce((E, C) => {
          if (C.insert)
            w.delete(o.default.length(C));
          else {
            if (typeof C.retain == "number" && C.attributes == null)
              return w.retain(C.retain), E + C.retain;
            if (C.delete || typeof C.retain == "number") {
              const L = C.delete || C.retain;
              return h.slice(E, E + L).forEach((j) => {
                C.delete ? w.push(j) : C.retain && C.attributes && w.retain(o.default.length(j), i.default.invert(C.attributes, j.attributes));
              }), E + L;
            } else if (typeof C.retain == "object" && C.retain !== null) {
              const L = h.slice(E, E + 1), R = new l.default(L.ops).next(), [j, z, Q] = d(C.retain, R.insert), K = p.getHandler(j);
              return w.retain({ [j]: K.invert(z, Q) }, i.default.invert(C.attributes, R.attributes)), E + 1;
            }
          }
          return E;
        }, 0), w.chop();
      }
      transform(h, w = !1) {
        if (w = !!w, typeof h == "number")
          return this.transformPosition(h, w);
        const E = h, C = new l.default(this.ops), L = new l.default(E.ops), R = new p();
        for (; C.hasNext() || L.hasNext(); )
          if (C.peekType() === "insert" && (w || L.peekType() !== "insert"))
            R.retain(o.default.length(C.next()));
          else if (L.peekType() === "insert")
            R.push(L.next());
          else {
            const j = Math.min(C.peekLength(), L.peekLength()), z = C.next(j), Q = L.next(j);
            if (z.delete)
              continue;
            if (Q.delete)
              R.push(Q);
            else {
              const K = z.retain, ae = Q.retain;
              let ie = typeof ae == "object" && ae !== null ? ae : j;
              if (typeof K == "object" && K !== null && typeof ae == "object" && ae !== null) {
                const be = Object.keys(K)[0];
                if (be === Object.keys(ae)[0]) {
                  const Ae = p.getHandler(be);
                  Ae && (ie = {
                    [be]: Ae.transform(K[be], ae[be], w)
                  });
                }
              }
              R.retain(ie, i.default.transform(z.attributes, Q.attributes, w));
            }
          }
        return R.chop();
      }
      transformPosition(h, w = !1) {
        w = !!w;
        const E = new l.default(this.ops);
        let C = 0;
        for (; E.hasNext() && C <= h; ) {
          const L = E.peekLength(), R = E.peekType();
          if (E.next(), R === "delete") {
            h -= Math.min(L, h - C);
            continue;
          } else R === "insert" && (C < h || !w) && (h += L);
          C += L;
        }
        return h;
      }
    }
    p.Op = o.default, p.OpIterator = l.default, p.AttributeMap = i.default, p.handlers = {}, e.default = p, r.exports = p, r.exports.default = p;
  })(Mn, Mn.exports)), Mn.exports;
}
var nt = $m();
const G = /* @__PURE__ */ pl(nt);
class ft extends Xe {
  static value() {
  }
  optimize() {
    (this.prev || this.next) && this.remove();
  }
  length() {
    return 0;
  }
  value() {
    return "";
  }
}
ft.blotName = "break";
ft.tagName = "BR";
let dt = class extends rs {
};
const Dm = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function fs(r) {
  return r.replace(/[&<>"']/g, (e) => Dm[e]);
}
class He extends Hi {
  static allowedChildren = [He, ft, Xe, dt];
  // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
  static order = [
    "cursor",
    "inline",
    // Must be lower
    "link",
    // Chrome wants <a> to be lower
    "underline",
    "strike",
    "italic",
    "bold",
    "script",
    "code"
    // Must be higher
  ];
  static compare(e, t) {
    const n = He.order.indexOf(e), s = He.order.indexOf(t);
    return n >= 0 || s >= 0 ? n - s : e === t ? 0 : e < t ? -1 : 1;
  }
  formatAt(e, t, n, s) {
    if (He.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, W.BLOT)) {
      const i = this.isolate(e, t);
      s && i.wrap(n, s);
    } else
      super.formatAt(e, t, n, s);
  }
  optimize(e) {
    if (super.optimize(e), this.parent instanceof He && He.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const t = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(t), t.wrap(this);
    }
  }
}
const Ua = 1;
class De extends mn {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = yl(this)), this.cache.delta;
  }
  deleteAt(e, t) {
    super.deleteAt(e, t), this.cache = {};
  }
  formatAt(e, t, n, s) {
    t <= 0 || (this.scroll.query(n, W.BLOCK) ? e + t === this.length() && this.format(n, s) : super.formatAt(e, Math.min(t, this.length() - e - 1), n, s), this.cache = {});
  }
  insertAt(e, t, n) {
    if (n != null) {
      super.insertAt(e, t, n), this.cache = {};
      return;
    }
    if (t.length === 0) return;
    const s = t.split(`
`), i = s.shift();
    i.length > 0 && (e < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(e, this.length() - 1), i) : this.children.tail.insertAt(this.children.tail.length(), i), this.cache = {});
    let o = this;
    s.reduce((l, u) => (o = o.split(l, !0), o.insertAt(0, u), u.length), e + i.length);
  }
  insertBefore(e, t) {
    const {
      head: n
    } = this.children;
    super.insertBefore(e, t), n instanceof ft && n.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Ua), this.cache.length;
  }
  moveChildren(e, t) {
    super.moveChildren(e, t), this.cache = {};
  }
  optimize(e) {
    super.optimize(e), this.cache = {};
  }
  path(e) {
    return super.path(e, !0);
  }
  removeChild(e) {
    super.removeChild(e), this.cache = {};
  }
  split(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (t && (e === 0 || e >= this.length() - Ua)) {
      const s = this.clone();
      return e === 0 ? (this.parent.insertBefore(s, this), this) : (this.parent.insertBefore(s, this.next), s);
    }
    const n = super.split(e, t);
    return this.cache = {}, n;
  }
}
De.blotName = "block";
De.tagName = "P";
De.defaultChild = ft;
De.allowedChildren = [ft, He, Xe, dt];
class rt extends Xe {
  attach() {
    super.attach(), this.attributes = new ds(this.domNode);
  }
  delta() {
    return new G().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(e, t) {
    const n = this.scroll.query(e, W.BLOCK_ATTRIBUTE);
    n != null && this.attributes.attribute(n, t);
  }
  formatAt(e, t, n, s) {
    this.format(n, s);
  }
  insertAt(e, t, n) {
    if (n != null) {
      super.insertAt(e, t, n);
      return;
    }
    const s = t.split(`
`), i = s.pop(), o = s.map((u) => {
      const d = this.scroll.create(De.blotName);
      return d.insertAt(0, u), d;
    }), l = this.split(e);
    o.forEach((u) => {
      this.parent.insertBefore(u, l);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), l);
  }
}
rt.scope = W.BLOCK_BLOT;
function yl(r) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return r.descendants(Ue).reduce((t, n) => n.length() === 0 ? t : t.insert(n.value(), et(n, {}, e)), new G()).insert(`
`, et(r));
}
function et(r) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return r == null || ("formats" in r && typeof r.formats == "function" && (e = {
    ...e,
    ...r.formats()
  }, t && delete e["code-token"]), r.parent == null || r.parent.statics.blotName === "scroll" || r.parent.statics.scope !== r.statics.scope) ? e : et(r.parent, e, t);
}
class ot extends Xe {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(e, t, n) {
    super(e, t), this.selection = n, this.textNode = document.createTextNode(ot.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
  }
  detach() {
    this.parent != null && this.parent.removeChild(this);
  }
  format(e, t) {
    if (this.savedLength !== 0) {
      super.format(e, t);
      return;
    }
    let n = this, s = 0;
    for (; n != null && n.statics.scope !== W.BLOCK_BLOT; )
      s += n.offset(n.parent), n = n.parent;
    n != null && (this.savedLength = ot.CONTENTS.length, n.optimize(), n.formatAt(s, ot.CONTENTS.length, e, t), this.savedLength = 0);
  }
  index(e, t) {
    return e === this.textNode ? 0 : super.index(e, t);
  }
  length() {
    return this.savedLength;
  }
  position() {
    return [this.textNode, this.textNode.data.length];
  }
  remove() {
    super.remove(), this.parent = null;
  }
  restore() {
    if (this.selection.composing || this.parent == null) return null;
    const e = this.selection.getNativeRange();
    for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
      this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
    const t = this.prev instanceof dt ? this.prev : null, n = t ? t.length() : 0, s = this.next instanceof dt ? this.next : null, i = s ? s.text : "", {
      textNode: o
    } = this, l = o.data.split(ot.CONTENTS).join("");
    o.data = ot.CONTENTS;
    let u;
    if (t)
      u = t, (l || s) && (t.insertAt(t.length(), l + i), s && s.remove());
    else if (s)
      u = s, s.insertAt(0, l);
    else {
      const d = document.createTextNode(l);
      u = this.scroll.create(d), this.parent.insertBefore(u, this);
    }
    if (this.remove(), e) {
      const d = (h, w) => t && h === t.domNode ? w : h === o ? n + w - 1 : s && h === s.domNode ? n + l.length + w : null, p = d(e.start.node, e.start.offset), b = d(e.end.node, e.end.offset);
      if (p !== null && b !== null)
        return {
          startNode: u.domNode,
          startOffset: p,
          endNode: u.domNode,
          endOffset: b
        };
    }
    return null;
  }
  update(e, t) {
    if (e.some((n) => n.type === "characterData" && n.target === this.textNode)) {
      const n = this.restore();
      n && (t.range = n);
    }
  }
  // Avoid .ql-cursor being a descendant of `<a/>`.
  // The reason is Safari pushes down `<a/>` on text insertion.
  // That will cause DOM nodes not sync with the model.
  //
  // For example ({I} is the caret), given the markup:
  //    <a><span class="ql-cursor">\uFEFF{I}</span></a>
  // When typing a char "x", `<a/>` will be pushed down inside the `<span>` first:
  //    <span class="ql-cursor"><a>\uFEFF{I}</a></span>
  // And then "x" will be inserted after `<a/>`:
  //    <span class="ql-cursor"><a>\uFEFF</a>d{I}</span>
  optimize(e) {
    super.optimize(e);
    let {
      parent: t
    } = this;
    for (; t; ) {
      if (t.domNode.tagName === "A") {
        this.savedLength = ot.CONTENTS.length, t.isolate(this.offset(t), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      t = t.parent;
    }
  }
  value() {
    return "";
  }
}
var si = { exports: {} }, Va;
function Bm() {
  return Va || (Va = 1, (function(r) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (t = !1));
    function s(u, d, p) {
      this.fn = u, this.context = d, this.once = p || !1;
    }
    function i(u, d, p, b, h) {
      if (typeof p != "function")
        throw new TypeError("The listener must be a function");
      var w = new s(p, b || u, h), E = t ? t + d : d;
      return u._events[E] ? u._events[E].fn ? u._events[E] = [u._events[E], w] : u._events[E].push(w) : (u._events[E] = w, u._eventsCount++), u;
    }
    function o(u, d) {
      --u._eventsCount === 0 ? u._events = new n() : delete u._events[d];
    }
    function l() {
      this._events = new n(), this._eventsCount = 0;
    }
    l.prototype.eventNames = function() {
      var d = [], p, b;
      if (this._eventsCount === 0) return d;
      for (b in p = this._events)
        e.call(p, b) && d.push(t ? b.slice(1) : b);
      return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(p)) : d;
    }, l.prototype.listeners = function(d) {
      var p = t ? t + d : d, b = this._events[p];
      if (!b) return [];
      if (b.fn) return [b.fn];
      for (var h = 0, w = b.length, E = new Array(w); h < w; h++)
        E[h] = b[h].fn;
      return E;
    }, l.prototype.listenerCount = function(d) {
      var p = t ? t + d : d, b = this._events[p];
      return b ? b.fn ? 1 : b.length : 0;
    }, l.prototype.emit = function(d, p, b, h, w, E) {
      var C = t ? t + d : d;
      if (!this._events[C]) return !1;
      var L = this._events[C], R = arguments.length, j, z;
      if (L.fn) {
        switch (L.once && this.removeListener(d, L.fn, void 0, !0), R) {
          case 1:
            return L.fn.call(L.context), !0;
          case 2:
            return L.fn.call(L.context, p), !0;
          case 3:
            return L.fn.call(L.context, p, b), !0;
          case 4:
            return L.fn.call(L.context, p, b, h), !0;
          case 5:
            return L.fn.call(L.context, p, b, h, w), !0;
          case 6:
            return L.fn.call(L.context, p, b, h, w, E), !0;
        }
        for (z = 1, j = new Array(R - 1); z < R; z++)
          j[z - 1] = arguments[z];
        L.fn.apply(L.context, j);
      } else {
        var Q = L.length, K;
        for (z = 0; z < Q; z++)
          switch (L[z].once && this.removeListener(d, L[z].fn, void 0, !0), R) {
            case 1:
              L[z].fn.call(L[z].context);
              break;
            case 2:
              L[z].fn.call(L[z].context, p);
              break;
            case 3:
              L[z].fn.call(L[z].context, p, b);
              break;
            case 4:
              L[z].fn.call(L[z].context, p, b, h);
              break;
            default:
              if (!j) for (K = 1, j = new Array(R - 1); K < R; K++)
                j[K - 1] = arguments[K];
              L[z].fn.apply(L[z].context, j);
          }
      }
      return !0;
    }, l.prototype.on = function(d, p, b) {
      return i(this, d, p, b, !1);
    }, l.prototype.once = function(d, p, b) {
      return i(this, d, p, b, !0);
    }, l.prototype.removeListener = function(d, p, b, h) {
      var w = t ? t + d : d;
      if (!this._events[w]) return this;
      if (!p)
        return o(this, w), this;
      var E = this._events[w];
      if (E.fn)
        E.fn === p && (!h || E.once) && (!b || E.context === b) && o(this, w);
      else {
        for (var C = 0, L = [], R = E.length; C < R; C++)
          (E[C].fn !== p || h && !E[C].once || b && E[C].context !== b) && L.push(E[C]);
        L.length ? this._events[w] = L.length === 1 ? L[0] : L : o(this, w);
      }
      return this;
    }, l.prototype.removeAllListeners = function(d) {
      var p;
      return d ? (p = t ? t + d : d, this._events[p] && o(this, p)) : (this._events = new n(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = t, l.EventEmitter = l, r.exports = l;
  })(si)), si.exports;
}
var Fm = Bm();
const Mm = /* @__PURE__ */ pl(Fm), Ci = /* @__PURE__ */ new WeakMap(), _i = ["error", "warn", "log", "info"];
let Li = "warn";
function vl(r) {
  if (Li && _i.indexOf(r) <= _i.indexOf(Li)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
      t[n - 1] = arguments[n];
    console[r](...t);
  }
}
function Dt(r) {
  return _i.reduce((e, t) => (e[t] = vl.bind(console, t, r), e), {});
}
Dt.level = (r) => {
  Li = r;
};
vl.level = Dt.level;
const ii = Dt("quill:events"), jm = ["selectionchange", "mousedown", "mouseup", "click"];
jm.forEach((r) => {
  document.addEventListener(r, function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    Array.from(document.querySelectorAll(".ql-container")).forEach((s) => {
      const i = Ci.get(s);
      i && i.emitter && i.emitter.handleDOM(...t);
    });
  });
});
class H extends Mm {
  static events = {
    EDITOR_CHANGE: "editor-change",
    SCROLL_BEFORE_UPDATE: "scroll-before-update",
    SCROLL_BLOT_MOUNT: "scroll-blot-mount",
    SCROLL_BLOT_UNMOUNT: "scroll-blot-unmount",
    SCROLL_OPTIMIZE: "scroll-optimize",
    SCROLL_UPDATE: "scroll-update",
    SCROLL_EMBED_UPDATE: "scroll-embed-update",
    SELECTION_CHANGE: "selection-change",
    TEXT_CHANGE: "text-change",
    COMPOSITION_BEFORE_START: "composition-before-start",
    COMPOSITION_START: "composition-start",
    COMPOSITION_BEFORE_END: "composition-before-end",
    COMPOSITION_END: "composition-end"
  };
  static sources = {
    API: "api",
    SILENT: "silent",
    USER: "user"
  };
  constructor() {
    super(), this.domListeners = {}, this.on("error", ii.error);
  }
  emit() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return ii.log.call(ii, ...t), super.emit(...t);
  }
  handleDOM(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      n[s - 1] = arguments[s];
    (this.domListeners[e.type] || []).forEach((i) => {
      let {
        node: o,
        handler: l
      } = i;
      (e.target === o || o.contains(e.target)) && l(e, ...n);
    });
  }
  listenDOM(e, t, n) {
    this.domListeners[e] || (this.domListeners[e] = []), this.domListeners[e].push({
      node: t,
      handler: n
    });
  }
}
const ai = Dt("quill:selection");
class fr {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class Pm {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new fr(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, H.sources.USER), 1);
    }), this.emitter.on(H.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const n = this.getNativeRange();
      n != null && n.start.node !== this.cursor.textNode && this.emitter.once(H.events.SCROLL_UPDATE, (s, i) => {
        try {
          this.root.contains(n.start.node) && this.root.contains(n.end.node) && this.setNativeRange(n.start.node, n.start.offset, n.end.node, n.end.offset);
          const o = i.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(o ? H.sources.SILENT : s);
        } catch {
        }
      });
    }), this.emitter.on(H.events.SCROLL_OPTIMIZE, (n, s) => {
      if (s.range) {
        const {
          startNode: i,
          startOffset: o,
          endNode: l,
          endOffset: u
        } = s.range;
        this.setNativeRange(i, o, l, u), this.update(H.sources.SILENT);
      }
    }), this.update(H.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(H.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(H.events.COMPOSITION_END, () => {
      if (this.composing = !1, this.cursor.parent) {
        const e = this.cursor.restore();
        if (!e) return;
        setTimeout(() => {
          this.setNativeRange(e.startNode, e.startOffset, e.endNode, e.endOffset);
        }, 1);
      }
    });
  }
  handleDragging() {
    this.emitter.listenDOM("mousedown", document.body, () => {
      this.mouseDown = !0;
    }), this.emitter.listenDOM("mouseup", document.body, () => {
      this.mouseDown = !1, this.update(H.sources.USER);
    });
  }
  focus() {
    this.hasFocus() || (this.root.focus({
      preventScroll: !0
    }), this.setRange(this.savedRange));
  }
  format(e, t) {
    this.scroll.update();
    const n = this.getNativeRange();
    if (!(n == null || !n.native.collapsed || this.scroll.query(e, W.BLOCK))) {
      if (n.start.node !== this.cursor.textNode) {
        const s = this.scroll.find(n.start.node, !1);
        if (s == null) return;
        if (s instanceof Ue) {
          const i = s.split(n.start.offset);
          s.parent.insertBefore(this.cursor, i);
        } else
          s.insertBefore(this.cursor, n.start.node);
        this.cursor.attach();
      }
      this.cursor.format(e, t), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
    }
  }
  getBounds(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const n = this.scroll.length();
    e = Math.min(e, n - 1), t = Math.min(e + t, n - 1) - e;
    let s, [i, o] = this.scroll.leaf(e);
    if (i == null) return null;
    if (t > 0 && o === i.length()) {
      const [p] = this.scroll.leaf(e + 1);
      if (p) {
        const [b] = this.scroll.line(e), [h] = this.scroll.line(e + 1);
        b === h && (i = p, o = 0);
      }
    }
    [s, o] = i.position(o, !0);
    const l = document.createRange();
    if (t > 0)
      return l.setStart(s, o), [i, o] = this.scroll.leaf(e + t), i == null ? null : ([s, o] = i.position(o, !0), l.setEnd(s, o), l.getBoundingClientRect());
    let u = "left", d;
    if (s instanceof Text) {
      if (!s.data.length)
        return null;
      o < s.data.length ? (l.setStart(s, o), l.setEnd(s, o + 1)) : (l.setStart(s, o - 1), l.setEnd(s, o), u = "right"), d = l.getBoundingClientRect();
    } else {
      if (!(i.domNode instanceof Element)) return null;
      d = i.domNode.getBoundingClientRect(), o > 0 && (u = "right");
    }
    return {
      bottom: d.top + d.height,
      height: d.height,
      left: d[u],
      right: d[u],
      top: d.top,
      width: 0
    };
  }
  getNativeRange() {
    const e = document.getSelection();
    if (e == null || e.rangeCount <= 0) return null;
    const t = e.getRangeAt(0);
    if (t == null) return null;
    const n = this.normalizeNative(t);
    return ai.info("getNativeRange", n), n;
  }
  getRange() {
    const e = this.scroll.domNode;
    if ("isConnected" in e && !e.isConnected)
      return [null, null];
    const t = this.getNativeRange();
    return t == null ? [null, null] : [this.normalizedToRange(t), t];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && oi(this.root, document.activeElement);
  }
  normalizedToRange(e) {
    const t = [[e.start.node, e.start.offset]];
    e.native.collapsed || t.push([e.end.node, e.end.offset]);
    const n = t.map((o) => {
      const [l, u] = o, d = this.scroll.find(l, !0), p = d.offset(this.scroll);
      return u === 0 ? p : d instanceof Ue ? p + d.index(l, u) : p + d.length();
    }), s = Math.min(Math.max(...n), this.scroll.length() - 1), i = Math.min(s, ...n);
    return new fr(i, s - i);
  }
  normalizeNative(e) {
    if (!oi(this.root, e.startContainer) || !e.collapsed && !oi(this.root, e.endContainer))
      return null;
    const t = {
      start: {
        node: e.startContainer,
        offset: e.startOffset
      },
      end: {
        node: e.endContainer,
        offset: e.endOffset
      },
      native: e
    };
    return [t.start, t.end].forEach((n) => {
      let {
        node: s,
        offset: i
      } = n;
      for (; !(s instanceof Text) && s.childNodes.length > 0; )
        if (s.childNodes.length > i)
          s = s.childNodes[i], i = 0;
        else if (s.childNodes.length === i)
          s = s.lastChild, s instanceof Text ? i = s.data.length : s.childNodes.length > 0 ? i = s.childNodes.length : i = s.childNodes.length + 1;
        else
          break;
      n.node = s, n.offset = i;
    }), t;
  }
  rangeToNative(e) {
    const t = this.scroll.length(), n = (s, i) => {
      s = Math.min(t - 1, s);
      const [o, l] = this.scroll.leaf(s);
      return o ? o.position(l, i) : [null, -1];
    };
    return [...n(e.index, !1), ...n(e.index + e.length, !0)];
  }
  setNativeRange(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : t, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (ai.info("setNativeRange", e, t, n, s), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
    n.parentNode == null))
      return;
    const o = document.getSelection();
    if (o != null)
      if (e != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: l
        } = this.getNativeRange() || {};
        if (l == null || i || e !== l.startContainer || t !== l.startOffset || n !== l.endContainer || s !== l.endOffset) {
          e instanceof Element && e.tagName === "BR" && (t = Array.from(e.parentNode.childNodes).indexOf(e), e = e.parentNode), n instanceof Element && n.tagName === "BR" && (s = Array.from(n.parentNode.childNodes).indexOf(n), n = n.parentNode);
          const u = document.createRange();
          u.setStart(e, t), u.setEnd(n, s), o.removeAllRanges(), o.addRange(u);
        }
      } else
        o.removeAllRanges(), this.root.blur();
  }
  setRange(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H.sources.API;
    if (typeof t == "string" && (n = t, t = !1), ai.info("setRange", e), e != null) {
      const s = this.rangeToNative(e);
      this.setNativeRange(...s, t);
    } else
      this.setNativeRange(null);
    this.update(n);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : H.sources.USER;
    const t = this.lastRange, [n, s] = this.getRange();
    if (this.lastRange = n, this.lastNative = s, this.lastRange != null && (this.savedRange = this.lastRange), !zi(t, this.lastRange)) {
      if (!this.composing && s != null && s.native.collapsed && s.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const i = [H.events.SELECTION_CHANGE, Dr(this.lastRange), Dr(t), e];
      this.emitter.emit(H.events.EDITOR_CHANGE, ...i), e !== H.sources.SILENT && this.emitter.emit(...i);
    }
  }
}
function oi(r, e) {
  try {
    e.parentNode;
  } catch {
    return !1;
  }
  return r.contains(e);
}
const Um = /^[ -~]*$/;
class Vm {
  constructor(e) {
    this.scroll = e, this.delta = this.getDelta();
  }
  applyDelta(e) {
    this.scroll.update();
    let t = this.scroll.length();
    this.scroll.batchStart();
    const n = za(e), s = new G();
    return Hm(n.ops.slice()).reduce((o, l) => {
      const u = nt.Op.length(l);
      let d = l.attributes || {}, p = !1, b = !1;
      if (l.insert != null) {
        if (s.retain(u), typeof l.insert == "string") {
          const E = l.insert;
          b = !E.endsWith(`
`) && (t <= o || !!this.scroll.descendant(rt, o)[0]), this.scroll.insertAt(o, E);
          const [C, L] = this.scroll.line(o);
          let R = Kt({}, et(C));
          if (C instanceof De) {
            const [j] = C.descendant(Ue, L);
            j && (R = Kt(R, et(j)));
          }
          d = nt.AttributeMap.diff(R, d) || {};
        } else if (typeof l.insert == "object") {
          const E = Object.keys(l.insert)[0];
          if (E == null) return o;
          const C = this.scroll.query(E, W.INLINE) != null;
          if (C)
            (t <= o || this.scroll.descendant(rt, o)[0]) && (b = !0);
          else if (o > 0) {
            const [L, R] = this.scroll.descendant(Ue, o - 1);
            L instanceof dt ? L.value()[R] !== `
` && (p = !0) : L instanceof Xe && L.statics.scope === W.INLINE_BLOT && (p = !0);
          }
          if (this.scroll.insertAt(o, E, l.insert[E]), C) {
            const [L] = this.scroll.descendant(Ue, o);
            if (L) {
              const R = Kt({}, et(L));
              d = nt.AttributeMap.diff(R, d) || {};
            }
          }
        }
        t += u;
      } else if (s.push(l), l.retain !== null && typeof l.retain == "object") {
        const E = Object.keys(l.retain)[0];
        if (E == null) return o;
        this.scroll.updateEmbedAt(o, E, l.retain[E]);
      }
      Object.keys(d).forEach((E) => {
        this.scroll.formatAt(o, u, E, d[E]);
      });
      const h = p ? 1 : 0, w = b ? 1 : 0;
      return t += h + w, s.retain(h), s.delete(w), o + u + h + w;
    }, 0), s.reduce((o, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(o, l.delete), o) : o + nt.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new G().retain(e).delete(t));
  }
  formatLine(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(n).forEach((i) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((o) => {
        o.format(i, n[i]);
      });
    }), this.scroll.optimize();
    const s = new G().retain(e).retain(t, Dr(n));
    return this.update(s);
  }
  formatText(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(n).forEach((i) => {
      this.scroll.formatAt(e, t, i, n[i]);
    });
    const s = new G().retain(e).retain(t, Dr(n));
    return this.update(s);
  }
  getContents(e, t) {
    return this.delta.slice(e, e + t);
  }
  getDelta() {
    return this.scroll.lines().reduce((e, t) => e.concat(t.delta()), new G());
  }
  getFormat(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = [], s = [];
    t === 0 ? this.scroll.path(e).forEach((l) => {
      const [u] = l;
      u instanceof De ? n.push(u) : u instanceof Ue && s.push(u);
    }) : (n = this.scroll.lines(e, t), s = this.scroll.descendants(Ue, e, t));
    const [i, o] = [n, s].map((l) => {
      const u = l.shift();
      if (u == null) return {};
      let d = et(u);
      for (; Object.keys(d).length > 0; ) {
        const p = l.shift();
        if (p == null) return d;
        d = zm(et(p), d);
      }
      return d;
    });
    return {
      ...i,
      ...o
    };
  }
  getHTML(e, t) {
    const [n, s] = this.scroll.line(e);
    if (n) {
      const i = n.length();
      return n.length() >= s + t && !(s === 0 && t === i) ? gn(n, s, t, !0) : gn(this.scroll, e, t, !0);
    }
    return "";
  }
  getText(e, t) {
    return this.getContents(e, t).filter((n) => typeof n.insert == "string").map((n) => n.insert).join("");
  }
  insertContents(e, t) {
    const n = za(t), s = new G().retain(e).concat(n);
    return this.scroll.insertContents(e, n), this.update(s);
  }
  insertEmbed(e, t, n) {
    return this.scroll.insertAt(e, t, n), this.update(new G().retain(e).insert({
      [t]: n
    }));
  }
  insertText(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return t = t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(e, t), Object.keys(n).forEach((s) => {
      this.scroll.formatAt(e, t.length, s, n[s]);
    }), this.update(new G().retain(e).insert(t, Dr(n)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if (e?.statics.blotName !== De.blotName) return !1;
    const t = e;
    return t.children.length > 1 ? !1 : t.children.head instanceof ft;
  }
  removeFormat(e, t) {
    const n = this.getText(e, t), [s, i] = this.scroll.line(e + t);
    let o = 0, l = new G();
    s != null && (o = s.length() - i, l = s.delta().slice(i, i + o - 1).insert(`
`));
    const d = this.getContents(e, t + o).diff(new G().insert(n).concat(l)), p = new G().retain(e).concat(d);
    return this.applyDelta(p);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const s = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(Um) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), o = et(i), l = i.offset(this.scroll), u = t[0].oldValue.replace(ot.CONTENTS, ""), d = new G().insert(u), p = new G().insert(i.value()), b = n && {
        oldRange: Ha(n.oldRange, -l),
        newRange: Ha(n.newRange, -l)
      };
      e = new G().retain(l).concat(d.diff(p, b)).reduce((w, E) => E.insert ? w.insert(E.insert, o) : w.push(E), new G()), this.delta = s.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !zi(s.compose(e), this.delta)) && (e = s.diff(this.delta, n));
    return e;
  }
}
function Rr(r, e, t) {
  if (r.length === 0) {
    const [w] = li(t.pop());
    return e <= 0 ? `</li></${w}>` : `</li></${w}>${Rr([], e - 1, t)}`;
  }
  const [{
    child: n,
    offset: s,
    length: i,
    indent: o,
    type: l
  }, ...u] = r, [d, p] = li(l);
  if (o > e)
    return t.push(l), o === e + 1 ? `<${d}><li${p}>${gn(n, s, i)}${Rr(u, o, t)}` : `<${d}><li>${Rr(r, e + 1, t)}`;
  const b = t[t.length - 1];
  if (o === e && l === b)
    return `</li><li${p}>${gn(n, s, i)}${Rr(u, o, t)}`;
  const [h] = li(t.pop());
  return `</li></${h}>${Rr(r, e - 1, t)}`;
}
function gn(r, e, t) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in r && typeof r.html == "function")
    return r.html(e, t);
  if (r instanceof dt)
    return fs(r.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (r instanceof ct) {
    if (r.statics.blotName === "list-container") {
      const d = [];
      return r.children.forEachAt(e, t, (p, b, h) => {
        const w = "formats" in p && typeof p.formats == "function" ? p.formats() : {};
        d.push({
          child: p,
          offset: b,
          length: h,
          indent: w.indent || 0,
          type: w.list
        });
      }), Rr(d, -1, []);
    }
    const s = [];
    if (r.children.forEachAt(e, t, (d, p, b) => {
      s.push(gn(d, p, b));
    }), n || r.statics.blotName === "list")
      return s.join("");
    const {
      outerHTML: i,
      innerHTML: o
    } = r.domNode, [l, u] = i.split(`>${o}<`);
    return l === "<table" ? `<table style="border: 1px solid #000;">${s.join("")}<${u}` : `${l}>${s.join("")}<${u}`;
  }
  return r.domNode instanceof Element ? r.domNode.outerHTML : "";
}
function zm(r, e) {
  return Object.keys(e).reduce((t, n) => {
    if (r[n] == null) return t;
    const s = e[n];
    return s === r[n] ? t[n] = s : Array.isArray(s) ? s.indexOf(r[n]) < 0 ? t[n] = s.concat([r[n]]) : t[n] = s : t[n] = [s, r[n]], t;
  }, {});
}
function li(r) {
  const e = r === "ordered" ? "ol" : "ul";
  switch (r) {
    case "checked":
      return [e, ' data-list="checked"'];
    case "unchecked":
      return [e, ' data-list="unchecked"'];
    default:
      return [e, ""];
  }
}
function za(r) {
  return r.reduce((e, t) => {
    if (typeof t.insert == "string") {
      const n = t.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return e.insert(n, t.attributes);
    }
    return e.push(t);
  }, new G());
}
function Ha(r, e) {
  let {
    index: t,
    length: n
  } = r;
  return new fr(t + e, n);
}
function Hm(r) {
  const e = [];
  return r.forEach((t) => {
    typeof t.insert == "string" ? t.insert.split(`
`).forEach((s, i) => {
      i && e.push({
        insert: `
`,
        attributes: t.attributes
      }), s && e.push({
        insert: s,
        attributes: t.attributes
      });
    }) : e.push(t);
  }), e;
}
class wt {
  static DEFAULTS = {};
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = e, this.options = t;
  }
}
const Vn = "\uFEFF";
class Gi extends Xe {
  constructor(e, t) {
    super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((n) => {
      this.contentNode.appendChild(n);
    }), this.leftGuard = document.createTextNode(Vn), this.rightGuard = document.createTextNode(Vn), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(e, t) {
    return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
  }
  restore(e) {
    let t = null, n;
    const s = e.data.split(Vn).join("");
    if (e === this.leftGuard)
      if (this.prev instanceof dt) {
        const i = this.prev.length();
        this.prev.insertAt(i, s), t = {
          startNode: this.prev.domNode,
          startOffset: i + s.length
        };
      } else
        n = document.createTextNode(s), this.parent.insertBefore(this.scroll.create(n), this), t = {
          startNode: n,
          startOffset: s.length
        };
    else e === this.rightGuard && (this.next instanceof dt ? (this.next.insertAt(0, s), t = {
      startNode: this.next.domNode,
      startOffset: s.length
    }) : (n = document.createTextNode(s), this.parent.insertBefore(this.scroll.create(n), this.next), t = {
      startNode: n,
      startOffset: s.length
    }));
    return e.data = Vn, t;
  }
  update(e, t) {
    e.forEach((n) => {
      if (n.type === "characterData" && (n.target === this.leftGuard || n.target === this.rightGuard)) {
        const s = this.restore(n.target);
        s && (t.range = s);
      }
    });
  }
}
class Km {
  isComposing = !1;
  constructor(e, t) {
    this.scroll = e, this.emitter = t, this.setupListeners();
  }
  setupListeners() {
    this.scroll.domNode.addEventListener("compositionstart", (e) => {
      this.isComposing || this.handleCompositionStart(e);
    }), this.scroll.domNode.addEventListener("compositionend", (e) => {
      this.isComposing && queueMicrotask(() => {
        this.handleCompositionEnd(e);
      });
    });
  }
  handleCompositionStart(e) {
    const t = e.target instanceof Node ? this.scroll.find(e.target, !0) : null;
    t && !(t instanceof Gi) && (this.emitter.emit(H.events.COMPOSITION_BEFORE_START, e), this.scroll.batchStart(), this.emitter.emit(H.events.COMPOSITION_START, e), this.isComposing = !0);
  }
  handleCompositionEnd(e) {
    this.emitter.emit(H.events.COMPOSITION_BEFORE_END, e), this.scroll.batchEnd(), this.emitter.emit(H.events.COMPOSITION_END, e), this.isComposing = !1;
  }
}
class zr {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: zr
  };
  modules = {};
  constructor(e, t) {
    this.quill = e, this.options = t;
  }
  init() {
    Object.keys(this.options.modules).forEach((e) => {
      this.modules[e] == null && this.addModule(e);
    });
  }
  addModule(e) {
    const t = this.quill.constructor.import(`modules/${e}`);
    return this.modules[e] = new t(this.quill, this.options.modules[e] || {}), this.modules[e];
  }
}
const Gm = (r) => r.parentElement || r.getRootNode().host || null, Wm = (r) => {
  const e = r.getBoundingClientRect(), t = "offsetWidth" in r && Math.abs(e.width) / r.offsetWidth || 1, n = "offsetHeight" in r && Math.abs(e.height) / r.offsetHeight || 1;
  return {
    top: e.top,
    right: e.left + r.clientWidth * t,
    bottom: e.top + r.clientHeight * n,
    left: e.left
  };
}, zn = (r) => {
  const e = parseInt(r, 10);
  return Number.isNaN(e) ? 0 : e;
}, Ka = (r, e, t, n, s, i) => r < t && e > n ? 0 : r < t ? -(t - r + s) : e > n ? e - r > n - t ? r + s - t : e - n + i : 0, Zm = (r, e) => {
  const t = r.ownerDocument;
  let n = e, s = r;
  for (; s; ) {
    const i = s === t.body, o = i ? {
      top: 0,
      right: window.visualViewport?.width ?? t.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? t.documentElement.clientHeight,
      left: 0
    } : Wm(s), l = getComputedStyle(s), u = Ka(n.left, n.right, o.left, o.right, zn(l.scrollPaddingLeft), zn(l.scrollPaddingRight)), d = Ka(n.top, n.bottom, o.top, o.bottom, zn(l.scrollPaddingTop), zn(l.scrollPaddingBottom));
    if (u || d)
      if (i)
        t.defaultView?.scrollBy(u, d);
      else {
        const {
          scrollLeft: p,
          scrollTop: b
        } = s;
        d && (s.scrollTop += d), u && (s.scrollLeft += u);
        const h = s.scrollLeft - p, w = s.scrollTop - b;
        n = {
          left: n.left - h,
          top: n.top - w,
          right: n.right - h,
          bottom: n.bottom - w
        };
      }
    s = i || l.position === "fixed" ? null : Gm(s);
  }
}, Ym = 100, Xm = ["block", "break", "cursor", "inline", "scroll", "text"], Qm = (r, e, t) => {
  const n = new Ur();
  return Xm.forEach((s) => {
    const i = e.query(s);
    i && n.register(i);
  }), r.forEach((s) => {
    let i = e.query(s);
    i || t.error(`Cannot register "${s}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; i; )
      if (n.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, o += 1, o > Ym) {
        t.error(`Cycle detected in registering blot requiredContainer: "${s}"`);
        break;
      }
  }), n;
}, Fr = Dt("quill"), Hn = new Ur();
ct.uiClass = "ql-ui";
class $ {
  static DEFAULTS = {
    bounds: null,
    modules: {
      clipboard: !0,
      keyboard: !0,
      history: !0,
      uploader: !0
    },
    placeholder: "",
    readOnly: !1,
    registry: Hn,
    theme: "default"
  };
  static events = H.events;
  static sources = H.sources;
  static version = "2.0.3";
  static imports = {
    delta: G,
    parchment: qm,
    "core/module": wt,
    "core/theme": zr
  };
  static debug(e) {
    e === !0 && (e = "log"), Dt.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Ci.get(e) || Hn.find(e, t);
  }
  static import(e) {
    return this.imports[e] == null && Fr.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), n = "attrName" in e ? e.attrName : e.blotName;
      typeof n == "string" ? this.register(`formats/${n}`, e, t) : Object.keys(e).forEach((s) => {
        this.register(s, e[s], t);
      });
    } else {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], n = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[e] != null && !n && Fr.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && Hn.register(t), typeof t.register == "function" && t.register(Hn);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = Jm(e, t), this.container = this.options.container, this.container == null) {
      Fr.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && $.debug(this.options.debug);
    const n = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Ci.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new H();
    const s = Ki.blotName, i = this.options.registry.query(s);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${s}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Vm(this.scroll), this.selection = new Pm(this.scroll, this.emitter), this.composition = new Km(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(H.events.EDITOR_CHANGE, (o) => {
      o === H.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(H.events.SCROLL_UPDATE, (o, l) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      it.call(this, () => this.editor.update(null, l, p), o);
    }), this.emitter.on(H.events.SCROLL_EMBED_UPDATE, (o, l) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      it.call(this, () => {
        const b = new G().retain(o.offset(this)).retain({
          [o.statics.blotName]: l
        });
        return this.editor.update(b, [], p);
      }, $.sources.USER);
    }), n) {
      const o = this.clipboard.convert({
        html: `${n}<p><br></p>`,
        text: `
`
      });
      this.setContents(o);
    }
    this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable(), this.allowReadOnlyEdits = !1;
  }
  addContainer(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (typeof e == "string") {
      const n = e;
      e = document.createElement("div"), e.classList.add(n);
    }
    return this.container.insertBefore(e, t), e;
  }
  blur() {
    this.selection.setRange(null);
  }
  deleteText(e, t, n) {
    return [e, t, , n] = It(e, t, n), it.call(this, () => this.editor.deleteText(e, t), n, e, -1 * t);
  }
  disable() {
    this.enable(!1);
  }
  editReadOnly(e) {
    this.allowReadOnlyEdits = !0;
    const t = e();
    return this.allowReadOnlyEdits = !1, t;
  }
  enable() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.scroll.enable(e), this.container.classList.toggle("ql-disabled", !e);
  }
  focus() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.selection.focus(), e.preventScroll || this.scrollSelectionIntoView();
  }
  format(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H.sources.API;
    return it.call(this, () => {
      const s = this.getSelection(!0);
      let i = new G();
      if (s == null) return i;
      if (this.scroll.query(e, W.BLOCK))
        i = this.editor.formatLine(s.index, s.length, {
          [e]: t
        });
      else {
        if (s.length === 0)
          return this.selection.format(e, t), i;
        i = this.editor.formatText(s.index, s.length, {
          [e]: t
        });
      }
      return this.setSelection(s, H.sources.SILENT), i;
    }, n);
  }
  formatLine(e, t, n, s, i) {
    let o;
    return [e, t, o, i] = It(
      e,
      t,
      // @ts-expect-error
      n,
      s,
      i
    ), it.call(this, () => this.editor.formatLine(e, t, o), i, e, 0);
  }
  formatText(e, t, n, s, i) {
    let o;
    return [e, t, o, i] = It(
      // @ts-expect-error
      e,
      t,
      n,
      s,
      i
    ), it.call(this, () => this.editor.formatText(e, t, o), i, e, 0);
  }
  getBounds(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = null;
    if (typeof e == "number" ? n = this.selection.getBounds(e, t) : n = this.selection.getBounds(e.index, e.length), !n) return null;
    const s = this.container.getBoundingClientRect();
    return {
      bottom: n.bottom - s.top,
      height: n.height,
      left: n.left - s.left,
      right: n.right - s.left,
      top: n.top - s.top,
      width: n.width
    };
  }
  getContents() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - e;
    return [e, t] = It(e, t), this.editor.getContents(e, t);
  }
  getFormat() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return typeof e == "number" ? this.editor.getFormat(e, t) : this.editor.getFormat(e.index, e.length);
  }
  getIndex(e) {
    return e.offset(this.scroll);
  }
  getLength() {
    return this.scroll.length();
  }
  getLeaf(e) {
    return this.scroll.leaf(e);
  }
  getLine(e) {
    return this.scroll.line(e);
  }
  getLines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    return typeof e != "number" ? this.scroll.lines(e.index, e.length) : this.scroll.lines(e, t);
  }
  getModule(e) {
    return this.theme.modules[e];
  }
  getSelection() {
    return arguments.length > 0 && arguments[0] !== void 0 && arguments[0] && this.focus(), this.update(), this.selection.getRange()[0];
  }
  getSemanticHTML() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = It(e, t), this.editor.getHTML(e, t);
  }
  getText() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = It(e, t), this.editor.getText(e, t);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(e, t, n) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : $.sources.API;
    return it.call(this, () => this.editor.insertEmbed(e, t, n), s, e);
  }
  insertText(e, t, n, s, i) {
    let o;
    return [e, , o, i] = It(e, 0, n, s, i), it.call(this, () => this.editor.insertText(e, t, o), i, e, t.length);
  }
  isEnabled() {
    return this.scroll.isEnabled();
  }
  off() {
    return this.emitter.off(...arguments);
  }
  on() {
    return this.emitter.on(...arguments);
  }
  once() {
    return this.emitter.once(...arguments);
  }
  removeFormat(e, t, n) {
    return [e, t, , n] = It(e, t, n), it.call(this, () => this.editor.removeFormat(e, t), n, e);
  }
  scrollRectIntoView(e) {
    Zm(this.root, e);
  }
  /**
   * @deprecated Use Quill#scrollSelectionIntoView() instead.
   */
  scrollIntoView() {
    console.warn("Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead."), this.scrollSelectionIntoView();
  }
  /**
   * Scroll the current selection into the visible area.
   * If the selection is already visible, no scrolling will occur.
   */
  scrollSelectionIntoView() {
    const e = this.selection.lastRange, t = e && this.selection.getBounds(e.index, e.length);
    t && this.scrollRectIntoView(t);
  }
  setContents(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : H.sources.API;
    return it.call(this, () => {
      e = new G(e);
      const n = this.getLength(), s = this.editor.deleteText(0, n), i = this.editor.insertContents(0, e), o = this.editor.deleteText(this.getLength() - 1, 1);
      return s.compose(i).compose(o);
    }, t);
  }
  setSelection(e, t, n) {
    e == null ? this.selection.setRange(null, t || $.sources.API) : ([e, t, , n] = It(e, t, n), this.selection.setRange(new fr(Math.max(0, e), t), n), n !== H.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : H.sources.API;
    const n = new G().insert(e);
    return this.setContents(n, t);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : H.sources.USER;
    const t = this.scroll.update(e);
    return this.selection.update(e), t;
  }
  updateContents(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : H.sources.API;
    return it.call(this, () => (e = new G(e), this.editor.applyDelta(e)), t, !0);
  }
}
function Ga(r) {
  return typeof r == "string" ? document.querySelector(r) : r;
}
function ui(r) {
  return Object.entries(r ?? {}).reduce((e, t) => {
    let [n, s] = t;
    return {
      ...e,
      [n]: s === !0 ? {} : s
    };
  }, {});
}
function Wa(r) {
  return Object.fromEntries(Object.entries(r).filter((e) => e[1] !== void 0));
}
function Jm(r, e) {
  const t = Ga(r);
  if (!t)
    throw new Error("Invalid Quill container");
  const s = !e.theme || e.theme === $.DEFAULTS.theme ? zr : $.import(`themes/${e.theme}`);
  if (!s)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: i,
    ...o
  } = $.DEFAULTS, {
    modules: l,
    ...u
  } = s.DEFAULTS;
  let d = ui(e.modules);
  d != null && d.toolbar && d.toolbar.constructor !== Object && (d = {
    ...d,
    toolbar: {
      container: d.toolbar
    }
  });
  const p = Kt({}, ui(i), ui(l), d), b = {
    ...o,
    ...Wa(u),
    ...Wa(e)
  };
  let h = e.registry;
  return h ? e.formats && Fr.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? Qm(e.formats, b.registry, Fr) : b.registry, {
    ...b,
    registry: h,
    container: t,
    theme: s,
    modules: Object.entries(p).reduce((w, E) => {
      let [C, L] = E;
      if (!L) return w;
      const R = $.import(`modules/${C}`);
      return R == null ? (Fr.error(`Cannot load ${C} module. Are you sure you registered it?`), w) : {
        ...w,
        // @ts-expect-error
        [C]: Kt({}, R.DEFAULTS || {}, L)
      };
    }, {}),
    bounds: Ga(b.bounds)
  };
}
function it(r, e, t, n) {
  if (!this.isEnabled() && e === H.sources.USER && !this.allowReadOnlyEdits)
    return new G();
  let s = t == null ? null : this.getSelection();
  const i = this.editor.delta, o = r();
  if (s != null && (t === !0 && (t = s.index), n == null ? s = Za(s, o, e) : n !== 0 && (s = Za(s, t, n, e)), this.setSelection(s, H.sources.SILENT)), o.length() > 0) {
    const l = [H.events.TEXT_CHANGE, o, i, e];
    this.emitter.emit(H.events.EDITOR_CHANGE, ...l), e !== H.sources.SILENT && this.emitter.emit(...l);
  }
  return o;
}
function It(r, e, t, n, s) {
  let i = {};
  return typeof r.index == "number" && typeof r.length == "number" ? typeof e != "number" ? (s = n, n = t, t = e, e = r.length, r = r.index) : (e = r.length, r = r.index) : typeof e != "number" && (s = n, n = t, t = e, e = 0), typeof t == "object" ? (i = t, s = n) : typeof t == "string" && (n != null ? i[t] = n : s = t), s = s || H.sources.API, [r, e, i, s];
}
function Za(r, e, t, n) {
  const s = typeof t == "number" ? t : 0;
  if (r == null) return null;
  let i, o;
  return e && typeof e.transformPosition == "function" ? [i, o] = [r.index, r.index + r.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(l, n !== H.sources.USER)
  )) : [i, o] = [r.index, r.index + r.length].map((l) => l < e || l === e && n === H.sources.USER ? l : s >= 0 ? l + s : Math.max(e, l + s)), new fr(i, o - i);
}
class yr extends hs {
}
function Ya(r) {
  return r instanceof De || r instanceof rt;
}
function Xa(r) {
  return typeof r.updateContent == "function";
}
class eg extends Ki {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = De;
  static allowedChildren = [De, rt, yr];
  constructor(e, t, n) {
    let {
      emitter: s
    } = n;
    super(e, t), this.emitter = s, this.batch = !1, this.optimize(), this.enable(), this.domNode.addEventListener("dragstart", (i) => this.handleDragStart(i));
  }
  batchStart() {
    Array.isArray(this.batch) || (this.batch = []);
  }
  batchEnd() {
    if (!this.batch) return;
    const e = this.batch;
    this.batch = !1, this.update(e);
  }
  emitMount(e) {
    this.emitter.emit(H.events.SCROLL_BLOT_MOUNT, e);
  }
  emitUnmount(e) {
    this.emitter.emit(H.events.SCROLL_BLOT_UNMOUNT, e);
  }
  emitEmbedUpdate(e, t) {
    this.emitter.emit(H.events.SCROLL_EMBED_UPDATE, e, t);
  }
  deleteAt(e, t) {
    const [n, s] = this.line(e), [i] = this.line(e + t);
    if (super.deleteAt(e, t), i != null && n !== i && s > 0) {
      if (n instanceof rt || i instanceof rt) {
        this.optimize();
        return;
      }
      const o = i.children.head instanceof ft ? null : i.children.head;
      n.moveChildren(i, o), n.remove();
    }
    this.optimize();
  }
  enable() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.domNode.setAttribute("contenteditable", e ? "true" : "false");
  }
  formatAt(e, t, n, s) {
    super.formatAt(e, t, n, s), this.optimize();
  }
  insertAt(e, t, n) {
    if (e >= this.length())
      if (n == null || this.scroll.query(t, W.BLOCK) == null) {
        const s = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(s), n == null && t.endsWith(`
`) ? s.insertAt(0, t.slice(0, -1), n) : s.insertAt(0, t, n);
      } else {
        const s = this.scroll.create(t, n);
        this.appendChild(s);
      }
    else
      super.insertAt(e, t, n);
    this.optimize();
  }
  insertBefore(e, t) {
    if (e.statics.scope === W.INLINE_BLOT) {
      const n = this.scroll.create(this.statics.defaultChild.blotName);
      n.appendChild(e), super.insertBefore(n, t);
    } else
      super.insertBefore(e, t);
  }
  insertContents(e, t) {
    const n = this.deltaToRenderBlocks(t.concat(new G().insert(`
`))), s = n.pop();
    if (s == null) return;
    this.batchStart();
    const i = n.shift();
    if (i) {
      const u = i.type === "block" && (i.delta.length() === 0 || !this.descendant(rt, e)[0] && e < this.length()), d = i.type === "block" ? i.delta : new G().insert({
        [i.key]: i.value
      });
      ci(this, e, d);
      const p = i.type === "block" ? 1 : 0, b = e + d.length() + p;
      u && this.insertAt(b - 1, `
`);
      const h = et(this.line(e)[0]), w = nt.AttributeMap.diff(h, i.attributes) || {};
      Object.keys(w).forEach((E) => {
        this.formatAt(b - 1, 1, E, w[E]);
      }), e = b;
    }
    let [o, l] = this.children.find(e);
    if (n.length && (o && (o = o.split(l), l = 0), n.forEach((u) => {
      if (u.type === "block") {
        const d = this.createBlock(u.attributes, o || void 0);
        ci(d, 0, u.delta);
      } else {
        const d = this.create(u.key, u.value);
        this.insertBefore(d, o || void 0), Object.keys(u.attributes).forEach((p) => {
          d.format(p, u.attributes[p]);
        });
      }
    })), s.type === "block" && s.delta.length()) {
      const u = o ? o.offset(o.scroll) + l : this.length();
      ci(this, u, s.delta);
    }
    this.batchEnd(), this.optimize();
  }
  isEnabled() {
    return this.domNode.getAttribute("contenteditable") === "true";
  }
  leaf(e) {
    const t = this.path(e).pop();
    if (!t)
      return [null, -1];
    const [n, s] = t;
    return n instanceof Ue ? [n, s] : [null, -1];
  }
  line(e) {
    return e === this.length() ? this.line(e - 1) : this.descendant(Ya, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const n = (s, i, o) => {
      let l = [], u = o;
      return s.children.forEachAt(i, o, (d, p, b) => {
        Ya(d) ? l.push(d) : d instanceof hs && (l = l.concat(n(d, p, u))), u -= b;
      }), l;
    };
    return n(this, e, t);
  }
  optimize() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(e, t), e.length > 0 && this.emitter.emit(H.events.SCROLL_OPTIMIZE, e, t));
  }
  path(e) {
    return super.path(e).slice(1);
  }
  remove() {
  }
  update(e) {
    if (this.batch) {
      Array.isArray(e) && (this.batch = this.batch.concat(e));
      return;
    }
    let t = H.sources.USER;
    typeof e == "string" && (t = e), Array.isArray(e) || (e = this.observer.takeRecords()), e = e.filter((n) => {
      let {
        target: s
      } = n;
      const i = this.find(s, !0);
      return i && !Xa(i);
    }), e.length > 0 && this.emitter.emit(H.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(H.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, n) {
    const [s] = this.descendant((i) => i instanceof rt, e);
    s && s.statics.blotName === t && Xa(s) && s.updateContent(n);
  }
  handleDragStart(e) {
    e.preventDefault();
  }
  deltaToRenderBlocks(e) {
    const t = [];
    let n = new G();
    return e.forEach((s) => {
      const i = s?.insert;
      if (i)
        if (typeof i == "string") {
          const o = i.split(`
`);
          o.slice(0, -1).forEach((u) => {
            n.insert(u, s.attributes), t.push({
              type: "block",
              delta: n,
              attributes: s.attributes ?? {}
            }), n = new G();
          });
          const l = o[o.length - 1];
          l && n.insert(l, s.attributes);
        } else {
          const o = Object.keys(i)[0];
          if (!o) return;
          this.query(o, W.INLINE) ? n.push(s) : (n.length() && t.push({
            type: "block",
            delta: n,
            attributes: {}
          }), n = new G(), t.push({
            type: "blockEmbed",
            key: o,
            value: i[o],
            attributes: s.attributes ?? {}
          }));
        }
    }), n.length() && t.push({
      type: "block",
      delta: n,
      attributes: {}
    }), t;
  }
  createBlock(e, t) {
    let n;
    const s = {};
    Object.entries(e).forEach((l) => {
      let [u, d] = l;
      this.query(u, W.BLOCK & W.BLOT) != null ? n = u : s[u] = d;
    });
    const i = this.create(n || this.statics.defaultChild.blotName, n ? e[n] : void 0);
    this.insertBefore(i, t || void 0);
    const o = i.length();
    return Object.entries(s).forEach((l) => {
      let [u, d] = l;
      i.formatAt(0, o, u, d);
    }), i;
  }
}
function ci(r, e, t) {
  t.reduce((n, s) => {
    const i = nt.Op.length(s);
    let o = s.attributes || {};
    if (s.insert != null) {
      if (typeof s.insert == "string") {
        const l = s.insert;
        r.insertAt(n, l);
        const [u] = r.descendant(Ue, n), d = et(u);
        o = nt.AttributeMap.diff(d, o) || {};
      } else if (typeof s.insert == "object") {
        const l = Object.keys(s.insert)[0];
        if (l == null) return n;
        if (r.insertAt(n, l, s.insert[l]), r.scroll.query(l, W.INLINE) != null) {
          const [d] = r.descendant(Ue, n), p = et(d);
          o = nt.AttributeMap.diff(p, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((l) => {
      r.formatAt(n, i, l, o[l]);
    }), n + i;
  }, e);
}
const Wi = {
  scope: W.BLOCK,
  whitelist: ["right", "center", "justify"]
}, tg = new vt("align", "align", Wi), xl = new ht("align", "ql-align", Wi), wl = new Qt("align", "text-align", Wi);
class Al extends Qt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((s) => `00${parseInt(s, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const rg = new ht("color", "ql-color", {
  scope: W.INLINE
}), Zi = new Al("color", "color", {
  scope: W.INLINE
}), ng = new ht("background", "ql-bg", {
  scope: W.INLINE
}), Yi = new Al("background", "background-color", {
  scope: W.INLINE
});
class vr extends yr {
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("spellcheck", "false"), t;
  }
  code(e, t) {
    return this.children.map((n) => n.length() <= 1 ? "" : n.domNode.innerText).join(`
`).slice(e, e + t);
  }
  html(e, t) {
    return `<pre>
${fs(this.code(e, t))}
</pre>`;
  }
}
class Ke extends De {
  static TAB = "  ";
  static register() {
    $.register(vr);
  }
}
class Xi extends He {
}
Xi.blotName = "code";
Xi.tagName = "CODE";
Ke.blotName = "code-block";
Ke.className = "ql-code-block";
Ke.tagName = "DIV";
vr.blotName = "code-block-container";
vr.className = "ql-code-block-container";
vr.tagName = "DIV";
vr.allowedChildren = [Ke];
Ke.allowedChildren = [dt, ft, ot];
Ke.requiredContainer = vr;
const Qi = {
  scope: W.BLOCK,
  whitelist: ["rtl"]
}, El = new vt("direction", "dir", Qi), Nl = new ht("direction", "ql-direction", Qi), Tl = new Qt("direction", "direction", Qi), kl = {
  scope: W.INLINE,
  whitelist: ["serif", "monospace"]
}, Sl = new ht("font", "ql-font", kl);
class sg extends Qt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const Cl = new sg("font", "font-family", kl), _l = new ht("size", "ql-size", {
  scope: W.INLINE,
  whitelist: ["small", "large", "huge"]
}), Ll = new Qt("size", "font-size", {
  scope: W.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), ig = Dt("quill:keyboard"), ag = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class ps extends wt {
  static match(e, t) {
    return ["altKey", "ctrlKey", "metaKey", "shiftKey"].some((n) => !!t[n] !== e[n] && t[n] !== null) ? !1 : t.key === e.key || t.key === e.which;
  }
  constructor(e, t) {
    super(e, t), this.bindings = {}, Object.keys(this.options.bindings).forEach((n) => {
      this.options.bindings[n] && this.addBinding(this.options.bindings[n]);
    }), this.addBinding({
      key: "Enter",
      shiftKey: null
    }, this.handleEnter), this.addBinding({
      key: "Enter",
      metaKey: null,
      ctrlKey: null,
      altKey: null
    }, () => {
    }), /Firefox/i.test(navigator.userAgent) ? (this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !0
    }, this.handleBackspace), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !0
    }, this.handleDelete)) : (this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !0,
      prefix: /^.?$/
    }, this.handleBackspace), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !0,
      suffix: /^.?$/
    }, this.handleDelete)), this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !1
    }, this.handleDeleteRange), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !1
    }, this.handleDeleteRange), this.addBinding({
      key: "Backspace",
      altKey: null,
      ctrlKey: null,
      metaKey: null,
      shiftKey: null
    }, {
      collapsed: !0,
      offset: 0
    }, this.handleBackspace), this.listen();
  }
  addBinding(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const s = lg(e);
    if (s == null) {
      ig.warn("Attempted to add invalid keyboard binding", s);
      return;
    }
    typeof t == "function" && (t = {
      handler: t
    }), typeof n == "function" && (n = {
      handler: n
    }), (Array.isArray(s.key) ? s.key : [s.key]).forEach((o) => {
      const l = {
        ...s,
        key: o,
        ...t,
        ...n
      };
      this.bindings[l.key] = this.bindings[l.key] || [], this.bindings[l.key].push(l);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (e) => {
      if (e.defaultPrevented || e.isComposing || e.keyCode === 229 && (e.key === "Enter" || e.key === "Backspace")) return;
      const s = (this.bindings[e.key] || []).concat(this.bindings[e.which] || []).filter((R) => ps.match(e, R));
      if (s.length === 0) return;
      const i = $.find(e.target, !0);
      if (i && i.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [l, u] = this.quill.getLine(o.index), [d, p] = this.quill.getLeaf(o.index), [b, h] = o.length === 0 ? [d, p] : this.quill.getLeaf(o.index + o.length), w = d instanceof rs ? d.value().slice(0, p) : "", E = b instanceof rs ? b.value().slice(h) : "", C = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(o),
        line: l,
        offset: u,
        prefix: w,
        suffix: E,
        event: e
      };
      s.some((R) => {
        if (R.collapsed != null && R.collapsed !== C.collapsed || R.empty != null && R.empty !== C.empty || R.offset != null && R.offset !== C.offset)
          return !1;
        if (Array.isArray(R.format)) {
          if (R.format.every((j) => C.format[j] == null))
            return !1;
        } else if (typeof R.format == "object" && !Object.keys(R.format).every((j) => R.format[j] === !0 ? C.format[j] != null : R.format[j] === !1 ? C.format[j] == null : zi(R.format[j], C.format[j])))
          return !1;
        return R.prefix != null && !R.prefix.test(C.prefix) || R.suffix != null && !R.suffix.test(C.suffix) ? !1 : R.handler.call(this, o, C, R) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let o = new G().retain(e.index - n).delete(n);
    if (t.offset === 0) {
      const [l] = this.quill.getLine(e.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const d = i.formats(), p = this.quill.getFormat(e.index - 1, 1);
        if (s = nt.AttributeMap.diff(d, p) || {}, Object.keys(s).length > 0) {
          const b = new G().retain(e.index + i.length() - 2).retain(1, s);
          o = o.compose(b);
        }
      }
    }
    this.quill.updateContents(o, $.sources.USER), this.quill.focus();
  }
  handleDelete(e, t) {
    const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
    if (e.index >= this.quill.getLength() - n) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let o = new G().retain(e.index).delete(n);
    if (t.offset >= i.length() - 1) {
      const [l] = this.quill.getLine(e.index + 1);
      if (l) {
        const u = i.formats(), d = this.quill.getFormat(e.index, 1);
        s = nt.AttributeMap.diff(u, d) || {}, Object.keys(s).length > 0 && (o = o.retain(l.length() - 1).retain(1, s));
      }
    }
    this.quill.updateContents(o, $.sources.USER), this.quill.focus();
  }
  handleDeleteRange(e) {
    Ji({
      range: e,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(e, t) {
    const n = Object.keys(t.format).reduce((i, o) => (this.quill.scroll.query(o, W.BLOCK) && !Array.isArray(t.format[o]) && (i[o] = t.format[o]), i), {}), s = new G().retain(e.index).delete(e.length).insert(`
`, n);
    this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.focus();
  }
}
const og = {
  bindings: {
    bold: di("bold"),
    italic: di("italic"),
    underline: di("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(r, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "+1", $.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(r, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "-1", $.sources.USER), !1);
      }
    },
    "outdent backspace": {
      key: "Backspace",
      collapsed: !0,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ["indent", "list"],
      offset: 0,
      handler(r, e) {
        e.format.indent != null ? this.quill.format("indent", "-1", $.sources.USER) : e.format.list != null && this.quill.format("list", !1, $.sources.USER);
      }
    },
    "indent code-block": Qa(!0),
    "outdent code-block": Qa(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(r) {
        this.quill.deleteText(r.index - 1, 1, $.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(r, e) {
        if (e.format.table) return !0;
        this.quill.history.cutoff();
        const t = new G().retain(r.index).delete(r.length).insert("	");
        return this.quill.updateContents(t, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(r.index + 1, $.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, $.sources.USER);
      }
    },
    "list empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["list"],
      empty: !0,
      handler(r, e) {
        const t = {
          list: !1
        };
        e.format.indent && (t.indent = !1), this.quill.formatLine(r.index, r.length, t, $.sources.USER);
      }
    },
    "checklist enter": {
      key: "Enter",
      collapsed: !0,
      format: {
        list: "checked"
      },
      handler(r) {
        const [e, t] = this.quill.getLine(r.index), n = {
          // @ts-expect-error Fix me later
          ...e.formats(),
          list: "checked"
        }, s = new G().retain(r.index).insert(`
`, n).retain(e.length() - t - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(r.index + 1, $.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(r, e) {
        const [t, n] = this.quill.getLine(r.index), s = new G().retain(r.index).insert(`
`, e.format).retain(t.length() - n - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(r.index + 1, $.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "table backspace": {
      key: "Backspace",
      format: ["table"],
      collapsed: !0,
      offset: 0,
      handler() {
      }
    },
    "table delete": {
      key: "Delete",
      format: ["table"],
      collapsed: !0,
      suffix: /^$/,
      handler() {
      }
    },
    "table enter": {
      key: "Enter",
      shiftKey: null,
      format: ["table"],
      handler(r) {
        const e = this.quill.getModule("table");
        if (e) {
          const [t, n, s, i] = e.getTable(r), o = ug(t, n, s, i);
          if (o == null) return;
          let l = t.offset();
          if (o < 0) {
            const u = new G().retain(l).insert(`
`);
            this.quill.updateContents(u, $.sources.USER), this.quill.setSelection(r.index + 1, r.length, $.sources.SILENT);
          } else if (o > 0) {
            l += t.length();
            const u = new G().retain(l).insert(`
`);
            this.quill.updateContents(u, $.sources.USER), this.quill.setSelection(l, $.sources.USER);
          }
        }
      }
    },
    "table tab": {
      key: "Tab",
      shiftKey: null,
      format: ["table"],
      handler(r, e) {
        const {
          event: t,
          line: n
        } = e, s = n.offset(this.quill.scroll);
        t.shiftKey ? this.quill.setSelection(s - 1, $.sources.USER) : this.quill.setSelection(s + n.length(), $.sources.USER);
      }
    },
    "list autofill": {
      key: " ",
      shiftKey: null,
      collapsed: !0,
      format: {
        "code-block": !1,
        blockquote: !1,
        table: !1
      },
      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
      handler(r, e) {
        if (this.quill.scroll.query("list") == null) return !0;
        const {
          length: t
        } = e.prefix, [n, s] = this.quill.getLine(r.index);
        if (s > t) return !0;
        let i;
        switch (e.prefix.trim()) {
          case "[]":
          case "[ ]":
            i = "unchecked";
            break;
          case "[x]":
            i = "checked";
            break;
          case "-":
          case "*":
            i = "bullet";
            break;
          default:
            i = "ordered";
        }
        this.quill.insertText(r.index, " ", $.sources.USER), this.quill.history.cutoff();
        const o = new G().retain(r.index - s).delete(t + 1).retain(n.length() - 2 - s).retain(1, {
          list: i
        });
        return this.quill.updateContents(o, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(r.index - t, $.sources.SILENT), !1;
      }
    },
    "code exit": {
      key: "Enter",
      collapsed: !0,
      format: ["code-block"],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(r) {
        const [e, t] = this.quill.getLine(r.index);
        let n = 2, s = e;
        for (; s != null && s.length() <= 1 && s.formats()["code-block"]; )
          if (s = s.prev, n -= 1, n <= 0) {
            const i = new G().retain(r.index + e.length() - t - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(r.index - 1, $.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": Kn("ArrowLeft", !1),
    "embed left shift": Kn("ArrowLeft", !0),
    "embed right": Kn("ArrowRight", !1),
    "embed right shift": Kn("ArrowRight", !0),
    "table down": Ja(!1),
    "table up": Ja(!0)
  }
};
ps.DEFAULTS = og;
function Qa(r) {
  return {
    key: "Tab",
    shiftKey: !r,
    format: {
      "code-block": !0
    },
    handler(e, t) {
      let {
        event: n
      } = t;
      const s = this.quill.scroll.query("code-block"), {
        TAB: i
      } = s;
      if (e.length === 0 && !n.shiftKey) {
        this.quill.insertText(e.index, i, $.sources.USER), this.quill.setSelection(e.index + i.length, $.sources.SILENT);
        return;
      }
      const o = e.length === 0 ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
      let {
        index: l,
        length: u
      } = e;
      o.forEach((d, p) => {
        r ? (d.insertAt(0, i), p === 0 ? l += i.length : u += i.length) : d.domNode.textContent.startsWith(i) && (d.deleteAt(0, i.length), p === 0 ? l -= i.length : u -= i.length);
      }), this.quill.update($.sources.USER), this.quill.setSelection(l, u, $.sources.SILENT);
    }
  };
}
function Kn(r, e) {
  return {
    key: r,
    shiftKey: e,
    altKey: null,
    [r === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
    handler(n) {
      let {
        index: s
      } = n;
      r === "ArrowRight" && (s += n.length + 1);
      const [i] = this.quill.getLeaf(s);
      return i instanceof Xe ? (r === "ArrowLeft" ? e ? this.quill.setSelection(n.index - 1, n.length + 1, $.sources.USER) : this.quill.setSelection(n.index - 1, $.sources.USER) : e ? this.quill.setSelection(n.index, n.length + 1, $.sources.USER) : this.quill.setSelection(n.index + n.length + 1, $.sources.USER), !1) : !0;
    }
  };
}
function di(r) {
  return {
    key: r[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(r, !t.format[r], $.sources.USER);
    }
  };
}
function Ja(r) {
  return {
    key: r ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(e, t) {
      const n = r ? "prev" : "next", s = t.line, i = s.parent[n];
      if (i != null) {
        if (i.statics.blotName === "table-row") {
          let o = i.children.head, l = s;
          for (; l.prev != null; )
            l = l.prev, o = o.next;
          const u = o.offset(this.quill.scroll) + Math.min(t.offset, o.length() - 1);
          this.quill.setSelection(u, 0, $.sources.USER);
        }
      } else {
        const o = s.table()[n];
        o != null && (r ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, $.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, $.sources.USER));
      }
      return !1;
    }
  };
}
function lg(r) {
  if (typeof r == "string" || typeof r == "number")
    r = {
      key: r
    };
  else if (typeof r == "object")
    r = Dr(r);
  else
    return null;
  return r.shortKey && (r[ag] = r.shortKey, delete r.shortKey), r;
}
function Ji(r) {
  let {
    quill: e,
    range: t
  } = r;
  const n = e.getLines(t);
  let s = {};
  if (n.length > 1) {
    const i = n[0].formats(), o = n[n.length - 1].formats();
    s = nt.AttributeMap.diff(o, i) || {};
  }
  e.deleteText(t, $.sources.USER), Object.keys(s).length > 0 && e.formatLine(t.index, 1, s, $.sources.USER), e.setSelection(t.index, $.sources.SILENT);
}
function ug(r, e, t, n) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? n === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const cg = /font-weight:\s*normal/, dg = ["P", "OL", "UL"], eo = (r) => r && dg.includes(r.tagName), hg = (r) => {
  Array.from(r.querySelectorAll("br")).filter((e) => eo(e.previousElementSibling) && eo(e.nextElementSibling)).forEach((e) => {
    e.parentNode?.removeChild(e);
  });
}, fg = (r) => {
  Array.from(r.querySelectorAll('b[style*="font-weight"]')).filter((e) => e.getAttribute("style")?.match(cg)).forEach((e) => {
    const t = r.createDocumentFragment();
    t.append(...e.childNodes), e.parentNode?.replaceChild(t, e);
  });
};
function pg(r) {
  r.querySelector('[id^="docs-internal-guid-"]') && (fg(r), hg(r));
}
const mg = /\bmso-list:[^;]*ignore/i, gg = /\bmso-list:[^;]*\bl(\d+)/i, bg = /\bmso-list:[^;]*\blevel(\d+)/i, yg = (r, e) => {
  const t = r.getAttribute("style"), n = t?.match(gg);
  if (!n)
    return null;
  const s = Number(n[1]), i = t?.match(bg), o = i ? Number(i[1]) : 1, l = new RegExp(`@list l${s}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), u = e.match(l), d = u && u[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: s,
    indent: o,
    type: d,
    element: r
  };
}, vg = (r) => {
  const e = Array.from(r.querySelectorAll("[style*=mso-list]")), t = [], n = [];
  e.forEach((o) => {
    (o.getAttribute("style") || "").match(mg) ? t.push(o) : n.push(o);
  }), t.forEach((o) => o.parentNode?.removeChild(o));
  const s = r.documentElement.innerHTML, i = n.map((o) => yg(o, s)).filter((o) => o);
  for (; i.length; ) {
    const o = [];
    let l = i.shift();
    for (; l; )
      o.push(l), l = i.length && i[0]?.element === l.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      i[0].id === l.id ? i.shift() : null;
    const u = document.createElement("ul");
    o.forEach((b) => {
      const h = document.createElement("li");
      h.setAttribute("data-list", b.type), b.indent > 1 && h.setAttribute("class", `ql-indent-${b.indent - 1}`), h.innerHTML = b.element.innerHTML, u.appendChild(h);
    });
    const d = o[0]?.element, {
      parentNode: p
    } = d ?? {};
    d && p?.replaceChild(u, d), o.slice(1).forEach((b) => {
      let {
        element: h
      } = b;
      p?.removeChild(h);
    });
  }
};
function xg(r) {
  r.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && vg(r);
}
const wg = [xg, pg], Ag = (r) => {
  r.documentElement && wg.forEach((e) => {
    e(r);
  });
}, Eg = Dt("quill:clipboard"), Ng = [[Node.TEXT_NODE, Bg], [Node.TEXT_NODE, ro], ["br", Lg], [Node.ELEMENT_NODE, ro], [Node.ELEMENT_NODE, _g], [Node.ELEMENT_NODE, Cg], [Node.ELEMENT_NODE, $g], ["li", Og], ["ol, ul", Rg], ["pre", qg], ["tr", Dg], ["b", hi("bold")], ["i", hi("italic")], ["strike", hi("strike")], ["style", Ig]], Tg = [tg, El].reduce((r, e) => (r[e.keyName] = e, r), {}), to = [wl, Yi, Zi, Tl, Cl, Ll].reduce((r, e) => (r[e.keyName] = e, r), {});
class kg extends wt {
  static DEFAULTS = {
    matchers: []
  };
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (n) => this.onCaptureCopy(n, !1)), this.quill.root.addEventListener("cut", (n) => this.onCaptureCopy(n, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], Ng.concat(this.options.matchers ?? []).forEach((n) => {
      let [s, i] = n;
      this.addMatcher(s, i);
    });
  }
  addMatcher(e, t) {
    this.matchers.push([e, t]);
  }
  convert(e) {
    let {
      html: t,
      text: n
    } = e, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (s[Ke.blotName])
      return new G().insert(n || "", {
        [Ke.blotName]: s[Ke.blotName]
      });
    if (!t)
      return new G().insert(n || "", s);
    const i = this.convertHTML(t);
    return wn(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || s.table) ? i.compose(new G().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(e) {
    Ag(e);
  }
  convertHTML(e) {
    const t = new DOMParser().parseFromString(e, "text/html");
    this.normalizeHTML(t);
    const n = t.body, s = /* @__PURE__ */ new WeakMap(), [i, o] = this.prepareMatching(n, s);
    return ea(this.quill.scroll, n, i, o, s);
  }
  dangerouslyPasteHTML(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : $.sources.API;
    if (typeof e == "string") {
      const s = this.convert({
        html: e,
        text: ""
      });
      this.quill.setContents(s, t), this.quill.setSelection(0, $.sources.SILENT);
    } else {
      const s = this.convert({
        html: t,
        text: ""
      });
      this.quill.updateContents(new G().retain(e).concat(s), n), this.quill.setSelection(e + s.length(), $.sources.SILENT);
    }
  }
  onCaptureCopy(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (e.defaultPrevented) return;
    e.preventDefault();
    const [n] = this.quill.selection.getRange();
    if (n == null) return;
    const {
      html: s,
      text: i
    } = this.onCopy(n, t);
    e.clipboardData?.setData("text/plain", i), e.clipboardData?.setData("text/html", s), t && Ji({
      range: n,
      quill: this.quill
    });
  }
  /*
   * https://www.iana.org/assignments/media-types/text/uri-list
   */
  normalizeURIList(e) {
    return e.split(/\r?\n/).filter((t) => t[0] !== "#").join(`
`);
  }
  onCapturePaste(e) {
    if (e.defaultPrevented || !this.quill.isEnabled()) return;
    e.preventDefault();
    const t = this.quill.getSelection(!0);
    if (t == null) return;
    const n = e.clipboardData?.getData("text/html");
    let s = e.clipboardData?.getData("text/plain");
    if (!n && !s) {
      const o = e.clipboardData?.getData("text/uri-list");
      o && (s = this.normalizeURIList(o));
    }
    const i = Array.from(e.clipboardData?.files || []);
    if (!n && i.length > 0) {
      this.quill.uploader.upload(t, i);
      return;
    }
    if (n && i.length > 0) {
      const o = new DOMParser().parseFromString(n, "text/html");
      if (o.body.childElementCount === 1 && o.body.firstElementChild?.tagName === "IMG") {
        this.quill.uploader.upload(t, i);
        return;
      }
    }
    this.onPaste(t, {
      html: n,
      text: s
    });
  }
  onCopy(e) {
    const t = this.quill.getText(e);
    return {
      html: this.quill.getSemanticHTML(e),
      text: t
    };
  }
  onPaste(e, t) {
    let {
      text: n,
      html: s
    } = t;
    const i = this.quill.getFormat(e.index), o = this.convert({
      text: n,
      html: s
    }, i);
    Eg.log("onPaste", o, {
      text: n,
      html: s
    });
    const l = new G().retain(e.index).delete(e.length).concat(o);
    this.quill.updateContents(l, $.sources.USER), this.quill.setSelection(l.length() - e.length, $.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(e, t) {
    const n = [], s = [];
    return this.matchers.forEach((i) => {
      const [o, l] = i;
      switch (o) {
        case Node.TEXT_NODE:
          s.push(l);
          break;
        case Node.ELEMENT_NODE:
          n.push(l);
          break;
        default:
          Array.from(e.querySelectorAll(o)).forEach((u) => {
            t.has(u) ? t.get(u)?.push(l) : t.set(u, [l]);
          });
          break;
      }
    }), [n, s];
  }
}
function xr(r, e, t, n) {
  return n.query(e) ? r.reduce((s, i) => {
    if (!i.insert) return s;
    if (i.attributes && i.attributes[e])
      return s.push(i);
    const o = t ? {
      [e]: t
    } : {};
    return s.insert(i.insert, {
      ...o,
      ...i.attributes
    });
  }, new G()) : r;
}
function wn(r, e) {
  let t = "";
  for (let n = r.ops.length - 1; n >= 0 && t.length < e.length; --n) {
    const s = r.ops[n];
    if (typeof s.insert != "string") break;
    t = s.insert + t;
  }
  return t.slice(-1 * e.length) === e;
}
function Ht(r, e) {
  if (!(r instanceof Element)) return !1;
  const t = e.query(r);
  return t && t.prototype instanceof Xe ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(r.tagName.toLowerCase());
}
function Sg(r, e) {
  return r.previousElementSibling && r.nextElementSibling && !Ht(r.previousElementSibling, e) && !Ht(r.nextElementSibling, e);
}
const Gn = /* @__PURE__ */ new WeakMap();
function ql(r) {
  return r == null ? !1 : (Gn.has(r) || (r.tagName === "PRE" ? Gn.set(r, !0) : Gn.set(r, ql(r.parentNode))), Gn.get(r));
}
function ea(r, e, t, n, s) {
  return e.nodeType === e.TEXT_NODE ? n.reduce((i, o) => o(e, i, r), new G()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, o) => {
    let l = ea(r, o, t, n, s);
    return o.nodeType === e.ELEMENT_NODE && (l = t.reduce((u, d) => d(o, u, r), l), l = (s.get(o) || []).reduce((u, d) => d(o, u, r), l)), i.concat(l);
  }, new G()) : new G();
}
function hi(r) {
  return (e, t, n) => xr(t, r, !0, n);
}
function Cg(r, e, t) {
  const n = vt.keys(r), s = ht.keys(r), i = Qt.keys(r), o = {};
  return n.concat(s).concat(i).forEach((l) => {
    let u = t.query(l, W.ATTRIBUTE);
    u != null && (o[u.attrName] = u.value(r), o[u.attrName]) || (u = Tg[l], u != null && (u.attrName === l || u.keyName === l) && (o[u.attrName] = u.value(r) || void 0), u = to[l], u != null && (u.attrName === l || u.keyName === l) && (u = to[l], o[u.attrName] = u.value(r) || void 0));
  }), Object.entries(o).reduce((l, u) => {
    let [d, p] = u;
    return xr(l, d, p, t);
  }, e);
}
function _g(r, e, t) {
  const n = t.query(r);
  if (n == null) return e;
  if (n.prototype instanceof Xe) {
    const s = {}, i = n.value(r);
    if (i != null)
      return s[n.blotName] = i, new G().insert(s, n.formats(r, t));
  } else if (n.prototype instanceof mn && !wn(e, `
`) && e.insert(`
`), "blotName" in n && "formats" in n && typeof n.formats == "function")
    return xr(e, n.blotName, n.formats(r, t), t);
  return e;
}
function Lg(r, e) {
  return wn(e, `
`) || e.insert(`
`), e;
}
function qg(r, e, t) {
  const n = t.query("code-block"), s = n && "formats" in n && typeof n.formats == "function" ? n.formats(r, t) : !0;
  return xr(e, "code-block", s, t);
}
function Ig() {
  return new G();
}
function Og(r, e, t) {
  const n = t.query(r);
  if (n == null || // @ts-expect-error
  n.blotName !== "list" || !wn(e, `
`))
    return e;
  let s = -1, i = r.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (s += 1), i = i.parentNode;
  return s <= 0 ? e : e.reduce((o, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? o.push(l) : o.insert(l.insert, {
    indent: s,
    ...l.attributes || {}
  }) : o, new G());
}
function Rg(r, e, t) {
  const n = r;
  let s = n.tagName === "OL" ? "ordered" : "bullet";
  const i = n.getAttribute("data-checked");
  return i && (s = i === "true" ? "checked" : "unchecked"), xr(e, "list", s, t);
}
function ro(r, e, t) {
  if (!wn(e, `
`)) {
    if (Ht(r, t) && (r.childNodes.length > 0 || r instanceof HTMLParagraphElement))
      return e.insert(`
`);
    if (e.length() > 0 && r.nextSibling) {
      let n = r.nextSibling;
      for (; n != null; ) {
        if (Ht(n, t))
          return e.insert(`
`);
        const s = t.query(n);
        if (s && s.prototype instanceof rt)
          return e.insert(`
`);
        n = n.firstChild;
      }
    }
  }
  return e;
}
function $g(r, e, t) {
  const n = {}, s = r.style || {};
  return s.fontStyle === "italic" && (n.italic = !0), s.textDecoration === "underline" && (n.underline = !0), s.textDecoration === "line-through" && (n.strike = !0), (s.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(s.fontWeight, 10) >= 700) && (n.bold = !0), e = Object.entries(n).reduce((i, o) => {
    let [l, u] = o;
    return xr(i, l, u, t);
  }, e), parseFloat(s.textIndent || 0) > 0 ? new G().insert("	").concat(e) : e;
}
function Dg(r, e, t) {
  const n = r.parentElement?.tagName === "TABLE" ? r.parentElement : r.parentElement?.parentElement;
  if (n != null) {
    const i = Array.from(n.querySelectorAll("tr")).indexOf(r) + 1;
    return xr(e, "table", i, t);
  }
  return e;
}
function Bg(r, e, t) {
  let n = r.data;
  if (r.parentElement?.tagName === "O:P")
    return e.insert(n.trim());
  if (!ql(r)) {
    if (n.trim().length === 0 && n.includes(`
`) && !Sg(r, t))
      return e;
    n = n.replace(/[^\S\u00a0]/g, " "), n = n.replace(/ {2,}/g, " "), (r.previousSibling == null && r.parentElement != null && Ht(r.parentElement, t) || r.previousSibling instanceof Element && Ht(r.previousSibling, t)) && (n = n.replace(/^ /, "")), (r.nextSibling == null && r.parentElement != null && Ht(r.parentElement, t) || r.nextSibling instanceof Element && Ht(r.nextSibling, t)) && (n = n.replace(/ $/, "")), n = n.replaceAll(" ", " ");
  }
  return e.insert(n);
}
class Fg extends wt {
  static DEFAULTS = {
    delay: 1e3,
    maxStack: 100,
    userOnly: !1
  };
  lastRecorded = 0;
  ignoreChange = !1;
  stack = {
    undo: [],
    redo: []
  };
  currentRange = null;
  constructor(e, t) {
    super(e, t), this.quill.on($.events.EDITOR_CHANGE, (n, s, i, o) => {
      n === $.events.SELECTION_CHANGE ? s && o !== $.sources.SILENT && (this.currentRange = s) : n === $.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === $.sources.USER ? this.record(s, i) : this.transform(s)), this.currentRange = qi(this.currentRange, s));
    }), this.quill.keyboard.addBinding({
      key: "z",
      shortKey: !0
    }, this.undo.bind(this)), this.quill.keyboard.addBinding({
      key: ["z", "Z"],
      shortKey: !0,
      shiftKey: !0
    }, this.redo.bind(this)), /Win/i.test(navigator.platform) && this.quill.keyboard.addBinding({
      key: "y",
      shortKey: !0
    }, this.redo.bind(this)), this.quill.root.addEventListener("beforeinput", (n) => {
      n.inputType === "historyUndo" ? (this.undo(), n.preventDefault()) : n.inputType === "historyRedo" && (this.redo(), n.preventDefault());
    });
  }
  change(e, t) {
    if (this.stack[e].length === 0) return;
    const n = this.stack[e].pop();
    if (!n) return;
    const s = this.quill.getContents(), i = n.delta.invert(s);
    this.stack[t].push({
      delta: i,
      range: qi(n.range, i)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(n.delta, $.sources.USER), this.ignoreChange = !1, this.restoreSelection(n);
  }
  clear() {
    this.stack = {
      undo: [],
      redo: []
    };
  }
  cutoff() {
    this.lastRecorded = 0;
  }
  record(e, t) {
    if (e.ops.length === 0) return;
    this.stack.redo = [];
    let n = e.invert(t), s = this.currentRange;
    const i = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > i && this.stack.undo.length > 0
    ) {
      const o = this.stack.undo.pop();
      o && (n = n.compose(o.delta), s = o.range);
    } else
      this.lastRecorded = i;
    n.length() !== 0 && (this.stack.undo.push({
      delta: n,
      range: s
    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(e) {
    no(this.stack.undo, e), no(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, $.sources.USER);
    else {
      const t = jg(this.quill.scroll, e.delta);
      this.quill.setSelection(t, $.sources.USER);
    }
  }
}
function no(r, e) {
  let t = e;
  for (let n = r.length - 1; n >= 0; n -= 1) {
    const s = r[n];
    r[n] = {
      delta: t.transform(s.delta, !0),
      range: s.range && qi(s.range, t)
    }, t = s.delta.transform(t), r[n].delta.length() === 0 && r.splice(n, 1);
  }
}
function Mg(r, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((n) => r.query(n, W.BLOCK) != null) : !1;
}
function jg(r, e) {
  const t = e.reduce((s, i) => s + (i.delete || 0), 0);
  let n = e.length() - t;
  return Mg(r, e) && (n -= 1), n;
}
function qi(r, e) {
  if (!r) return r;
  const t = e.transformPosition(r.index), n = e.transformPosition(r.index + r.length);
  return {
    index: t,
    length: n - t
  };
}
class Il extends wt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("drop", (n) => {
      n.preventDefault();
      let s = null;
      if (document.caretRangeFromPoint)
        s = document.caretRangeFromPoint(n.clientX, n.clientY);
      else if (document.caretPositionFromPoint) {
        const o = document.caretPositionFromPoint(n.clientX, n.clientY);
        s = document.createRange(), s.setStart(o.offsetNode, o.offset), s.setEnd(o.offsetNode, o.offset);
      }
      const i = s && e.selection.normalizeNative(s);
      if (i) {
        const o = e.selection.normalizedToRange(i);
        n.dataTransfer?.files && this.upload(o, n.dataTransfer.files);
      }
    });
  }
  upload(e, t) {
    const n = [];
    Array.from(t).forEach((s) => {
      s && this.options.mimetypes?.includes(s.type) && n.push(s);
    }), n.length > 0 && this.options.handler.call(this, e, n);
  }
}
Il.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(r, e) {
    if (!this.quill.scroll.query("image"))
      return;
    const t = e.map((n) => new Promise((s) => {
      const i = new FileReader();
      i.onload = () => {
        s(i.result);
      }, i.readAsDataURL(n);
    }));
    Promise.all(t).then((n) => {
      const s = n.reduce((i, o) => i.insert({
        image: o
      }), new G().retain(r.index).delete(r.length));
      this.quill.updateContents(s, H.sources.USER), this.quill.setSelection(r.index + n.length, H.sources.SILENT);
    });
  }
};
const Pg = ["insertText", "insertReplacementText"];
class Ug extends wt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("beforeinput", (n) => {
      this.handleBeforeInput(n);
    }), /Android/i.test(navigator.userAgent) || e.on($.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(e) {
    Ji({
      range: e,
      quill: this.quill
    });
  }
  replaceText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (e.length === 0) return !1;
    if (t) {
      const n = this.quill.getFormat(e.index, 1);
      this.deleteRange(e), this.quill.updateContents(new G().retain(e.index).insert(t, n), $.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, $.sources.SILENT), !0;
  }
  handleBeforeInput(e) {
    if (this.quill.composition.isComposing || e.defaultPrevented || !Pg.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const n = Vg(e);
    if (n == null)
      return;
    const s = this.quill.selection.normalizeNative(t), i = s ? this.quill.selection.normalizedToRange(s) : null;
    i && this.replaceText(i, n) && e.preventDefault();
  }
  handleCompositionStart() {
    const e = this.quill.getSelection();
    e && this.replaceText(e);
  }
}
function Vg(r) {
  return typeof r.data == "string" ? r.data : r.dataTransfer?.types.includes("text/plain") ? r.dataTransfer.getData("text/plain") : null;
}
const zg = /Mac/i.test(navigator.platform), Hg = 100, Kg = (r) => !!(r.key === "ArrowLeft" || r.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
r.key === "ArrowUp" || r.key === "ArrowDown" || r.key === "Home" || zg && r.key === "a" && r.ctrlKey === !0);
class Gg extends wt {
  isListening = !1;
  selectionChangeDeadline = 0;
  constructor(e, t) {
    super(e, t), this.handleArrowKeys(), this.handleNavigationShortcuts();
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ["ArrowLeft", "ArrowRight"],
      offset: 0,
      shiftKey: null,
      handler(e, t) {
        let {
          line: n,
          event: s
        } = t;
        if (!(n instanceof ct) || !n.uiNode)
          return !0;
        const i = getComputedStyle(n.domNode).direction === "rtl";
        return i && s.key !== "ArrowRight" || !i && s.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (s.shiftKey ? 1 : 0), $.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && Kg(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + Hg, this.isListening) return;
    this.isListening = !0;
    const e = () => {
      this.isListening = !1, Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
    };
    document.addEventListener("selectionchange", e, {
      once: !0
    });
  }
  handleSelectionChange() {
    const e = document.getSelection();
    if (!e) return;
    const t = e.getRangeAt(0);
    if (t.collapsed !== !0 || t.startOffset !== 0) return;
    const n = this.quill.scroll.find(t.startContainer);
    if (!(n instanceof ct) || !n.uiNode) return;
    const s = document.createRange();
    s.setStartAfter(n.uiNode), s.setEndAfter(n.uiNode), e.removeAllRanges(), e.addRange(s);
  }
}
$.register({
  "blots/block": De,
  "blots/block/embed": rt,
  "blots/break": ft,
  "blots/container": yr,
  "blots/cursor": ot,
  "blots/embed": Gi,
  "blots/inline": He,
  "blots/scroll": eg,
  "blots/text": dt,
  "modules/clipboard": kg,
  "modules/history": Fg,
  "modules/keyboard": ps,
  "modules/uploader": Il,
  "modules/input": Ug,
  "modules/uiNode": Gg
});
class Wg extends ht {
  add(e, t) {
    let n = 0;
    if (t === "+1" || t === "-1") {
      const s = this.value(e) || 0;
      n = t === "+1" ? s + 1 : s - 1;
    } else typeof t == "number" && (n = t);
    return n === 0 ? (this.remove(e), !0) : super.add(e, n.toString());
  }
  canAdd(e, t) {
    return super.canAdd(e, t) || super.canAdd(e, parseInt(t, 10));
  }
  value(e) {
    return parseInt(super.value(e), 10) || void 0;
  }
}
const Zg = new Wg("indent", "ql-indent", {
  scope: W.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Yg extends De {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class Xg extends De {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
class An extends yr {
}
An.blotName = "list-container";
An.tagName = "OL";
class En extends De {
  static create(e) {
    const t = super.create();
    return t.setAttribute("data-list", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-list") || void 0;
  }
  static register() {
    $.register(An);
  }
  constructor(e, t) {
    super(e, t);
    const n = t.ownerDocument.createElement("span"), s = (i) => {
      if (!e.isEnabled()) return;
      const o = this.statics.formats(t, e);
      o === "checked" ? (this.format("list", "unchecked"), i.preventDefault()) : o === "unchecked" && (this.format("list", "checked"), i.preventDefault());
    };
    n.addEventListener("mousedown", s), n.addEventListener("touchstart", s), this.attachUI(n);
  }
  format(e, t) {
    e === this.statics.blotName && t ? this.domNode.setAttribute("data-list", t) : super.format(e, t);
  }
}
En.blotName = "list";
En.tagName = "LI";
An.allowedChildren = [En];
En.requiredContainer = An;
class ta extends He {
  static blotName = "bold";
  static tagName = ["STRONG", "B"];
  static create() {
    return super.create();
  }
  static formats() {
    return !0;
  }
  optimize(e) {
    super.optimize(e), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
  }
}
class Qg extends ta {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class ns extends He {
  static blotName = "link";
  static tagName = "A";
  static SANITIZED_URL = "about:blank";
  static PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel", "sms"];
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("href", this.sanitize(e)), t.setAttribute("rel", "noopener noreferrer"), t.setAttribute("target", "_blank"), t;
  }
  static formats(e) {
    return e.getAttribute("href");
  }
  static sanitize(e) {
    return Ol(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
  }
  format(e, t) {
    e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
  }
}
function Ol(r, e) {
  const t = document.createElement("a");
  t.href = r;
  const n = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(n) > -1;
}
class Jg extends He {
  static blotName = "script";
  static tagName = ["SUB", "SUP"];
  static create(e) {
    return e === "super" ? document.createElement("sup") : e === "sub" ? document.createElement("sub") : super.create(e);
  }
  static formats(e) {
    if (e.tagName === "SUB") return "sub";
    if (e.tagName === "SUP") return "super";
  }
}
class e0 extends ta {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class t0 extends He {
  static blotName = "underline";
  static tagName = "U";
}
class r0 extends Gi {
  static blotName = "formula";
  static className = "ql-formula";
  static tagName = "SPAN";
  static create(e) {
    if (window.katex == null)
      throw new Error("Formula module requires KaTeX.");
    const t = super.create(e);
    return typeof e == "string" && (window.katex.render(e, t, {
      throwOnError: !1,
      errorColor: "#f00"
    }), t.setAttribute("data-value", e)), t;
  }
  static value(e) {
    return e.getAttribute("data-value");
  }
  html() {
    const {
      formula: e
    } = this.value();
    return `<span>${e}</span>`;
  }
}
const so = ["alt", "height", "width"];
let n0 = class extends Xe {
  static blotName = "image";
  static tagName = "IMG";
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return so.reduce((t, n) => (e.hasAttribute(n) && (t[n] = e.getAttribute(n)), t), {});
  }
  static match(e) {
    return /\.(jpe?g|gif|png)$/.test(e) || /^data:image\/.+;base64/.test(e);
  }
  static sanitize(e) {
    return Ol(e, ["http", "https", "data"]) ? e : "//:0";
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    so.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
};
const io = ["height", "width"];
class s0 extends rt {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return io.reduce((t, n) => (e.hasAttribute(n) && (t[n] = e.getAttribute(n)), t), {});
  }
  static sanitize(e) {
    return ns.sanitize(e);
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    io.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
  html() {
    const {
      video: e
    } = this.value();
    return `<a href="${e}">${e}</a>`;
  }
}
const sn = new ht("code-token", "hljs", {
  scope: W.INLINE
});
class Rt extends He {
  static formats(e, t) {
    for (; e != null && e !== t.domNode; ) {
      if (e.classList && e.classList.contains(Ke.className))
        return super.formats(e, t);
      e = e.parentNode;
    }
  }
  constructor(e, t, n) {
    super(e, t, n), sn.add(this.domNode, n);
  }
  format(e, t) {
    e !== Rt.blotName ? super.format(e, t) : t ? sn.add(this.domNode, t) : (sn.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), sn.value(this.domNode) || this.unwrap();
  }
}
Rt.blotName = "code-token";
Rt.className = "ql-token";
class tt extends Ke {
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("data-language", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-language") || "plain";
  }
  static register() {
  }
  // Syntax module will register
  format(e, t) {
    e === this.statics.blotName && t ? this.domNode.setAttribute("data-language", t) : super.format(e, t);
  }
  replaceWith(e, t) {
    return this.formatAt(0, this.length(), Rt.blotName, !1), super.replaceWith(e, t);
  }
}
class cn extends vr {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(e, t) {
    e === tt.blotName && (this.forceNext = !0, this.children.forEach((n) => {
      n.format(e, t);
    }));
  }
  formatAt(e, t, n, s) {
    n === tt.blotName && (this.forceNext = !0), super.formatAt(e, t, n, s);
  }
  highlight(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const s = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, i = tt.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== s) {
      if (s.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((u, d) => u.concat(yl(d, !1)), new G()), l = e(s, i);
        o.diff(l).reduce((u, d) => {
          let {
            retain: p,
            attributes: b
          } = d;
          return p ? (b && Object.keys(b).forEach((h) => {
            [tt.blotName, Rt.blotName].includes(h) && this.formatAt(u, p, h, b[h]);
          }), u + p) : u;
        }, 0);
      }
      this.cachedText = s, this.forceNext = !1;
    }
  }
  html(e, t) {
    const [n] = this.children.find(e);
    return `<pre data-language="${n ? tt.formats(n.domNode) : "plain"}">
${fs(this.code(e, t))}
</pre>`;
  }
  optimize(e) {
    if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
      const t = tt.formats(this.children.head.domNode);
      t !== this.uiNode.value && (this.uiNode.value = t);
    }
  }
}
cn.allowedChildren = [tt];
tt.requiredContainer = cn;
tt.allowedChildren = [Rt, ot, dt, ft];
const i0 = (r, e, t) => {
  if (typeof r.versionString == "string") {
    const n = r.versionString.split(".")[0];
    if (parseInt(n, 10) >= 11)
      return r.highlight(t, {
        language: e
      }).value;
  }
  return r.highlight(e, t).value;
};
class Rl extends wt {
  static register() {
    $.register(Rt, !0), $.register(tt, !0), $.register(cn, !0);
  }
  constructor(e, t) {
    if (super(e, t), this.options.hljs == null)
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    this.languages = this.options.languages.reduce((n, s) => {
      let {
        key: i
      } = s;
      return n[i] = !0, n;
    }, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
  }
  initListener() {
    this.quill.on($.events.SCROLL_BLOT_MOUNT, (e) => {
      if (!(e instanceof cn)) return;
      const t = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((n) => {
        let {
          key: s,
          label: i
        } = n;
        const o = t.ownerDocument.createElement("option");
        o.textContent = i, o.setAttribute("value", s), t.appendChild(o);
      }), t.addEventListener("change", () => {
        e.format(tt.blotName, t.value), this.quill.root.focus(), this.highlight(e, !0);
      }), e.uiNode == null && (e.attachUI(t), e.children.head && (t.value = tt.formats(e.children.head.domNode)));
    });
  }
  initTimer() {
    let e = null;
    this.quill.on($.events.SCROLL_OPTIMIZE, () => {
      e && clearTimeout(e), e = setTimeout(() => {
        this.highlight(), e = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update($.sources.USER);
    const n = this.quill.getSelection();
    (e == null ? this.quill.scroll.descendants(cn) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update($.sources.SILENT), n != null && this.quill.setSelection(n, $.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return fs(e).split(`
`).reduce((s, i, o) => (o !== 0 && s.insert(`
`, {
        [Ke.blotName]: t
      }), s.insert(i)), new G());
    const n = this.quill.root.ownerDocument.createElement("div");
    return n.classList.add(Ke.className), n.innerHTML = i0(this.options.hljs, t, e), ea(this.quill.scroll, n, [(s, i) => {
      const o = sn.value(s);
      return o ? i.compose(new G().retain(i.length(), {
        [Rt.blotName]: o
      })) : i;
    }], [(s, i) => s.data.split(`
`).reduce((o, l, u) => (u !== 0 && o.insert(`
`, {
      [Ke.blotName]: t
    }), o.insert(l)), i)], /* @__PURE__ */ new WeakMap());
  }
}
Rl.DEFAULTS = {
  hljs: window.hljs,
  interval: 1e3,
  languages: [{
    key: "plain",
    label: "Plain"
  }, {
    key: "bash",
    label: "Bash"
  }, {
    key: "cpp",
    label: "C++"
  }, {
    key: "cs",
    label: "C#"
  }, {
    key: "css",
    label: "CSS"
  }, {
    key: "diff",
    label: "Diff"
  }, {
    key: "xml",
    label: "HTML/XML"
  }, {
    key: "java",
    label: "Java"
  }, {
    key: "javascript",
    label: "JavaScript"
  }, {
    key: "markdown",
    label: "Markdown"
  }, {
    key: "php",
    label: "PHP"
  }, {
    key: "python",
    label: "Python"
  }, {
    key: "ruby",
    label: "Ruby"
  }, {
    key: "sql",
    label: "SQL"
  }]
};
class lt extends De {
  static blotName = "table";
  static tagName = "TD";
  static create(e) {
    const t = super.create();
    return e ? t.setAttribute("data-row", e) : t.setAttribute("data-row", ra()), t;
  }
  static formats(e) {
    if (e.hasAttribute("data-row"))
      return e.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(e, t) {
    e === lt.blotName && t ? this.domNode.setAttribute("data-row", t) : super.format(e, t);
  }
  row() {
    return this.parent;
  }
  rowOffset() {
    return this.row() ? this.row().rowOffset() : -1;
  }
  table() {
    return this.row() && this.row().table();
  }
}
class pr extends yr {
  static blotName = "table-row";
  static tagName = "TR";
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const e = this.children.head.formats(), t = this.children.tail.formats(), n = this.next.children.head.formats(), s = this.next.children.tail.formats();
      return e.table === t.table && e.table === n.table && e.table === s.table;
    }
    return !1;
  }
  optimize(e) {
    super.optimize(e), this.children.forEach((t) => {
      if (t.next == null) return;
      const n = t.formats(), s = t.next.formats();
      if (n.table !== s.table) {
        const i = this.splitAfter(t);
        i && i.optimize(), this.prev && this.prev.optimize();
      }
    });
  }
  rowOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  table() {
    return this.parent && this.parent.parent;
  }
}
class Gt extends yr {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class ss extends yr {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const e = this.descendants(pr), t = e.reduce((n, s) => Math.max(s.children.length, n), 0);
    e.forEach((n) => {
      new Array(t - n.children.length).fill(0).forEach(() => {
        let s;
        n.children.head != null && (s = lt.formats(n.children.head.domNode));
        const i = this.scroll.create(lt.blotName, s);
        n.appendChild(i), i.optimize();
      });
    });
  }
  cells(e) {
    return this.rows().map((t) => t.children.at(e));
  }
  deleteColumn(e) {
    const [t] = this.descendant(Gt);
    t == null || t.children.head == null || t.children.forEach((n) => {
      const s = n.children.at(e);
      s?.remove();
    });
  }
  insertColumn(e) {
    const [t] = this.descendant(Gt);
    t == null || t.children.head == null || t.children.forEach((n) => {
      const s = n.children.at(e), i = lt.formats(n.children.head.domNode), o = this.scroll.create(lt.blotName, i);
      n.insertBefore(o, s);
    });
  }
  insertRow(e) {
    const [t] = this.descendant(Gt);
    if (t == null || t.children.head == null) return;
    const n = ra(), s = this.scroll.create(pr.blotName);
    t.children.head.children.forEach(() => {
      const o = this.scroll.create(lt.blotName, n);
      s.appendChild(o);
    });
    const i = t.children.at(e);
    t.insertBefore(s, i);
  }
  rows() {
    const e = this.children.head;
    return e == null ? [] : e.children.map((t) => t);
  }
}
ss.allowedChildren = [Gt];
Gt.requiredContainer = ss;
Gt.allowedChildren = [pr];
pr.requiredContainer = Gt;
pr.allowedChildren = [lt];
lt.requiredContainer = pr;
function ra() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class a0 extends wt {
  static register() {
    $.register(lt), $.register(pr), $.register(Gt), $.register(ss);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(ss).forEach((e) => {
      e.balanceCells();
    });
  }
  deleteColumn() {
    const [e, , t] = this.getTable();
    t != null && (e.deleteColumn(t.cellOffset()), this.quill.update($.sources.USER));
  }
  deleteRow() {
    const [, e] = this.getTable();
    e != null && (e.remove(), this.quill.update($.sources.USER));
  }
  deleteTable() {
    const [e] = this.getTable();
    if (e == null) return;
    const t = e.offset();
    e.remove(), this.quill.update($.sources.USER), this.quill.setSelection(t, $.sources.SILENT);
  }
  getTable() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (e == null) return [null, null, null, -1];
    const [t, n] = this.quill.getLine(e.index);
    if (t == null || t.statics.blotName !== lt.blotName)
      return [null, null, null, -1];
    const s = t.parent;
    return [s.parent.parent, s, t, n];
  }
  insertColumn(e) {
    const t = this.quill.getSelection();
    if (!t) return;
    const [n, s, i] = this.getTable(t);
    if (i == null) return;
    const o = i.cellOffset();
    n.insertColumn(o + e), this.quill.update($.sources.USER);
    let l = s.rowOffset();
    e === 0 && (l += 1), this.quill.setSelection(t.index + l, t.length, $.sources.SILENT);
  }
  insertColumnLeft() {
    this.insertColumn(0);
  }
  insertColumnRight() {
    this.insertColumn(1);
  }
  insertRow(e) {
    const t = this.quill.getSelection();
    if (!t) return;
    const [n, s, i] = this.getTable(t);
    if (i == null) return;
    const o = s.rowOffset();
    n.insertRow(o + e), this.quill.update($.sources.USER), e > 0 ? this.quill.setSelection(t, $.sources.SILENT) : this.quill.setSelection(t.index + s.children.length, t.length, $.sources.SILENT);
  }
  insertRowAbove() {
    this.insertRow(0);
  }
  insertRowBelow() {
    this.insertRow(1);
  }
  insertTable(e, t) {
    const n = this.quill.getSelection();
    if (n == null) return;
    const s = new Array(e).fill(0).reduce((i) => {
      const o = new Array(t).fill(`
`).join("");
      return i.insert(o, {
        table: ra()
      });
    }, new G().retain(n.index));
    this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(n.index, $.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on($.events.SCROLL_OPTIMIZE, (e) => {
      e.some((t) => ["TD", "TR", "TBODY", "TABLE"].includes(t.target.tagName) ? (this.quill.once($.events.TEXT_CHANGE, (n, s, i) => {
        i === $.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const ao = Dt("quill:toolbar");
class na extends wt {
  constructor(e, t) {
    if (super(e, t), Array.isArray(this.options.container)) {
      const n = document.createElement("div");
      n.setAttribute("role", "toolbar"), o0(n, this.options.container), e.container?.parentNode?.insertBefore(n, e.container), this.container = n;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      ao.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((n) => {
      const s = this.options.handlers?.[n];
      s && this.addHandler(n, s);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((n) => {
      this.attach(n);
    }), this.quill.on($.events.EDITOR_CHANGE, () => {
      const [n] = this.quill.selection.getRange();
      this.update(n);
    });
  }
  addHandler(e, t) {
    this.handlers[e] = t;
  }
  attach(e) {
    let t = Array.from(e.classList).find((s) => s.indexOf("ql-") === 0);
    if (!t) return;
    if (t = t.slice(3), e.tagName === "BUTTON" && e.setAttribute("type", "button"), this.handlers[t] == null && this.quill.scroll.query(t) == null) {
      ao.warn("ignoring attaching to nonexistent format", t, e);
      return;
    }
    const n = e.tagName === "SELECT" ? "change" : "click";
    e.addEventListener(n, (s) => {
      let i;
      if (e.tagName === "SELECT") {
        if (e.selectedIndex < 0) return;
        const l = e.options[e.selectedIndex];
        l.hasAttribute("selected") ? i = !1 : i = l.value || !1;
      } else
        e.classList.contains("ql-active") ? i = !1 : i = e.value || !e.hasAttribute("value"), s.preventDefault();
      this.quill.focus();
      const [o] = this.quill.selection.getRange();
      if (this.handlers[t] != null)
        this.handlers[t].call(this, i);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(t).prototype instanceof Xe
      ) {
        if (i = prompt(`Enter ${t}`), !i) return;
        this.quill.updateContents(new G().retain(o.index).delete(o.length).insert({
          [t]: i
        }), $.sources.USER);
      } else
        this.quill.format(t, i, $.sources.USER);
      this.update(o);
    }), this.controls.push([t, e]);
  }
  update(e) {
    const t = e == null ? {} : this.quill.getFormat(e);
    this.controls.forEach((n) => {
      const [s, i] = n;
      if (i.tagName === "SELECT") {
        let o = null;
        if (e == null)
          o = null;
        else if (t[s] == null)
          o = i.querySelector("option[selected]");
        else if (!Array.isArray(t[s])) {
          let l = t[s];
          typeof l == "string" && (l = l.replace(/"/g, '\\"')), o = i.querySelector(`option[value="${l}"]`);
        }
        o == null ? (i.value = "", i.selectedIndex = -1) : o.selected = !0;
      } else if (e == null)
        i.classList.remove("ql-active"), i.setAttribute("aria-pressed", "false");
      else if (i.hasAttribute("value")) {
        const o = t[s], l = o === i.getAttribute("value") || o != null && o.toString() === i.getAttribute("value") || o == null && !i.getAttribute("value");
        i.classList.toggle("ql-active", l), i.setAttribute("aria-pressed", l.toString());
      } else {
        const o = t[s] != null;
        i.classList.toggle("ql-active", o), i.setAttribute("aria-pressed", o.toString());
      }
    });
  }
}
na.DEFAULTS = {};
function oo(r, e, t) {
  const n = document.createElement("button");
  n.setAttribute("type", "button"), n.classList.add(`ql-${e}`), n.setAttribute("aria-pressed", "false"), t != null ? (n.value = t, n.setAttribute("aria-label", `${e}: ${t}`)) : n.setAttribute("aria-label", e), r.appendChild(n);
}
function o0(r, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const n = document.createElement("span");
    n.classList.add("ql-formats"), t.forEach((s) => {
      if (typeof s == "string")
        oo(n, s);
      else {
        const i = Object.keys(s)[0], o = s[i];
        Array.isArray(o) ? l0(n, i, o) : oo(n, i, o);
      }
    }), r.appendChild(n);
  });
}
function l0(r, e, t) {
  const n = document.createElement("select");
  n.classList.add(`ql-${e}`), t.forEach((s) => {
    const i = document.createElement("option");
    s !== !1 ? i.setAttribute("value", String(s)) : i.setAttribute("selected", "selected"), n.appendChild(i);
  }), r.appendChild(n);
}
na.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const r = this.quill.getSelection();
      if (r != null)
        if (r.length === 0) {
          const e = this.quill.getFormat();
          Object.keys(e).forEach((t) => {
            this.quill.scroll.query(t, W.INLINE) != null && this.quill.format(t, !1, $.sources.USER);
          });
        } else
          this.quill.removeFormat(r.index, r.length, $.sources.USER);
    },
    direction(r) {
      const {
        align: e
      } = this.quill.getFormat();
      r === "rtl" && e == null ? this.quill.format("align", "right", $.sources.USER) : !r && e === "right" && this.quill.format("align", !1, $.sources.USER), this.quill.format("direction", r, $.sources.USER);
    },
    indent(r) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e), n = parseInt(t.indent || 0, 10);
      if (r === "+1" || r === "-1") {
        let s = r === "+1" ? 1 : -1;
        t.direction === "rtl" && (s *= -1), this.quill.format("indent", n + s, $.sources.USER);
      }
    },
    link(r) {
      r === !0 && (r = prompt("Enter link URL:")), this.quill.format("link", r, $.sources.USER);
    },
    list(r) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e);
      r === "check" ? t.list === "checked" || t.list === "unchecked" ? this.quill.format("list", !1, $.sources.USER) : this.quill.format("list", "unchecked", $.sources.USER) : this.quill.format("list", r, $.sources.USER);
    }
  }
};
const u0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', c0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', d0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', h0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', f0 = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', p0 = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', m0 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', g0 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', lo = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', b0 = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', y0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', v0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', x0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', w0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', A0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', E0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', N0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', T0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', k0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', S0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', C0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', _0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', L0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', q0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', I0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', O0 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', R0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', $0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', D0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', B0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', F0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', M0 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', j0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', bn = {
  align: {
    "": u0,
    center: c0,
    right: d0,
    justify: h0
  },
  background: f0,
  blockquote: p0,
  bold: m0,
  clean: g0,
  code: lo,
  "code-block": lo,
  color: b0,
  direction: {
    "": y0,
    rtl: v0
  },
  formula: x0,
  header: {
    1: w0,
    2: A0,
    3: E0,
    4: N0,
    5: T0,
    6: k0
  },
  italic: S0,
  image: C0,
  indent: {
    "+1": _0,
    "-1": L0
  },
  link: q0,
  list: {
    bullet: I0,
    check: O0,
    ordered: R0
  },
  script: {
    sub: $0,
    super: D0
  },
  strike: B0,
  table: F0,
  underline: M0,
  video: j0
}, P0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let uo = 0;
function co(r, e) {
  r.setAttribute(e, `${r.getAttribute(e) !== "true"}`);
}
class ms {
  constructor(e) {
    this.select = e, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", () => {
      this.togglePicker();
    }), this.label.addEventListener("keydown", (t) => {
      switch (t.key) {
        case "Enter":
          this.togglePicker();
          break;
        case "Escape":
          this.escape(), t.preventDefault();
          break;
      }
    }), this.select.addEventListener("change", this.update.bind(this));
  }
  togglePicker() {
    this.container.classList.toggle("ql-expanded"), co(this.label, "aria-expanded"), co(this.options, "aria-hidden");
  }
  buildItem(e) {
    const t = document.createElement("span");
    t.tabIndex = "0", t.setAttribute("role", "button"), t.classList.add("ql-picker-item");
    const n = e.getAttribute("value");
    return n && t.setAttribute("data-value", n), e.textContent && t.setAttribute("data-label", e.textContent), t.addEventListener("click", () => {
      this.selectItem(t, !0);
    }), t.addEventListener("keydown", (s) => {
      switch (s.key) {
        case "Enter":
          this.selectItem(t, !0), s.preventDefault();
          break;
        case "Escape":
          this.escape(), s.preventDefault();
          break;
      }
    }), t;
  }
  buildLabel() {
    const e = document.createElement("span");
    return e.classList.add("ql-picker-label"), e.innerHTML = P0, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
  }
  buildOptions() {
    const e = document.createElement("span");
    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${uo}`, uo += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
      const n = this.buildItem(t);
      e.appendChild(n), t.selected === !0 && this.selectItem(n);
    }), this.container.appendChild(e);
  }
  buildPicker() {
    Array.from(this.select.attributes).forEach((e) => {
      this.container.setAttribute(e.name, e.value);
    }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
  }
  escape() {
    this.close(), setTimeout(() => this.label.focus(), 1);
  }
  close() {
    this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
  }
  selectItem(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    const n = this.container.querySelector(".ql-selected");
    e !== n && (n?.classList.remove("ql-selected"), e != null && (e.classList.add("ql-selected"), this.select.selectedIndex = Array.from(e.parentNode.children).indexOf(e), e.hasAttribute("data-value") ? this.label.setAttribute("data-value", e.getAttribute("data-value")) : this.label.removeAttribute("data-value"), e.hasAttribute("data-label") ? this.label.setAttribute("data-label", e.getAttribute("data-label")) : this.label.removeAttribute("data-label"), t && (this.select.dispatchEvent(new Event("change")), this.close())));
  }
  update() {
    let e;
    if (this.select.selectedIndex > -1) {
      const n = (
        // @ts-expect-error Fix me later
        this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex]
      );
      e = this.select.options[this.select.selectedIndex], this.selectItem(n);
    } else
      this.selectItem(null);
    const t = e != null && e !== this.select.querySelector("option[selected]");
    this.label.classList.toggle("ql-active", t);
  }
}
class $l extends ms {
  constructor(e, t) {
    super(e), this.label.innerHTML = t, this.container.classList.add("ql-color-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((n) => {
      n.classList.add("ql-primary");
    });
  }
  buildItem(e) {
    const t = super.buildItem(e);
    return t.style.backgroundColor = e.getAttribute("value") || "", t;
  }
  selectItem(e, t) {
    super.selectItem(e, t);
    const n = this.label.querySelector(".ql-color-label"), s = e && e.getAttribute("data-value") || "";
    n && (n.tagName === "line" ? n.style.stroke = s : n.style.fill = s);
  }
}
class Dl extends ms {
  constructor(e, t) {
    super(e), this.container.classList.add("ql-icon-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((n) => {
      n.innerHTML = t[n.getAttribute("data-value") || ""];
    }), this.defaultItem = this.container.querySelector(".ql-selected"), this.selectItem(this.defaultItem);
  }
  selectItem(e, t) {
    super.selectItem(e, t);
    const n = e || this.defaultItem;
    if (n != null) {
      if (this.label.innerHTML === n.innerHTML) return;
      this.label.innerHTML = n.innerHTML;
    }
  }
}
const U0 = (r) => {
  const {
    overflowY: e
  } = getComputedStyle(r, null);
  return e !== "visible" && e !== "clip";
};
class Bl {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, U0(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
      this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
    }), this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(e) {
    const t = e.left + e.width / 2 - this.root.offsetWidth / 2, n = e.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${t}px`, this.root.style.top = `${n}px`, this.root.classList.remove("ql-flip");
    const s = this.boundsContainer.getBoundingClientRect(), i = this.root.getBoundingClientRect();
    let o = 0;
    if (i.right > s.right && (o = s.right - i.right, this.root.style.left = `${t + o}px`), i.left < s.left && (o = s.left - i.left, this.root.style.left = `${t + o}px`), i.bottom > s.bottom) {
      const l = i.bottom - i.top, u = e.bottom - e.top + l;
      this.root.style.top = `${n - u}px`, this.root.classList.add("ql-flip");
    }
    return o;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const V0 = [!1, "center", "right", "justify"], z0 = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], H0 = [!1, "serif", "monospace"], K0 = ["1", "2", "3", !1], G0 = ["small", !1, "large", "huge"];
class Nn extends zr {
  constructor(e, t) {
    super(e, t);
    const n = (s) => {
      if (!document.body.contains(e.root)) {
        document.body.removeEventListener("click", n);
        return;
      }
      this.tooltip != null && // @ts-expect-error
      !this.tooltip.root.contains(s.target) && // @ts-expect-error
      document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus() && this.tooltip.hide(), this.pickers != null && this.pickers.forEach((i) => {
        i.container.contains(s.target) || i.close();
      });
    };
    e.emitter.listenDOM("click", document.body, n);
  }
  addModule(e) {
    const t = super.addModule(e);
    return e === "toolbar" && this.extendToolbar(t), t;
  }
  buildButtons(e, t) {
    Array.from(e).forEach((n) => {
      (n.getAttribute("class") || "").split(/\s+/).forEach((i) => {
        if (i.startsWith("ql-") && (i = i.slice(3), t[i] != null))
          if (i === "direction")
            n.innerHTML = t[i][""] + t[i].rtl;
          else if (typeof t[i] == "string")
            n.innerHTML = t[i];
          else {
            const o = n.value || "";
            o != null && t[i][o] && (n.innerHTML = t[i][o]);
          }
      });
    });
  }
  buildPickers(e, t) {
    this.pickers = Array.from(e).map((s) => {
      if (s.classList.contains("ql-align") && (s.querySelector("option") == null && tn(s, V0), typeof t.align == "object"))
        return new Dl(s, t.align);
      if (s.classList.contains("ql-background") || s.classList.contains("ql-color")) {
        const i = s.classList.contains("ql-background") ? "background" : "color";
        return s.querySelector("option") == null && tn(s, z0, i === "background" ? "#ffffff" : "#000000"), new $l(s, t[i]);
      }
      return s.querySelector("option") == null && (s.classList.contains("ql-font") ? tn(s, H0) : s.classList.contains("ql-header") ? tn(s, K0) : s.classList.contains("ql-size") && tn(s, G0)), new ms(s);
    });
    const n = () => {
      this.pickers.forEach((s) => {
        s.update();
      });
    };
    this.quill.on(H.events.EDITOR_CHANGE, n);
  }
}
Nn.DEFAULTS = Kt({}, zr.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let r = this.container.querySelector("input.ql-image[type=file]");
          r == null && (r = document.createElement("input"), r.setAttribute("type", "file"), r.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), r.classList.add("ql-image"), r.addEventListener("change", () => {
            const e = this.quill.getSelection(!0);
            this.quill.uploader.upload(e, r.files), r.value = "";
          }), this.container.appendChild(r)), r.click();
        },
        video() {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
class Fl extends Bl {
  constructor(e, t) {
    super(e, t), this.textbox = this.root.querySelector('input[type="text"]'), this.listen();
  }
  listen() {
    this.textbox.addEventListener("keydown", (e) => {
      e.key === "Enter" ? (this.save(), e.preventDefault()) : e.key === "Escape" && (this.cancel(), e.preventDefault());
    });
  }
  cancel() {
    this.hide(), this.restoreFocus();
  }
  edit() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), this.textbox == null) return;
    t != null ? this.textbox.value = t : e !== this.root.getAttribute("data-mode") && (this.textbox.value = "");
    const n = this.quill.getBounds(this.quill.selection.savedRange);
    n != null && this.position(n), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${e}`) || ""), this.root.setAttribute("data-mode", e);
  }
  restoreFocus() {
    this.quill.focus({
      preventScroll: !0
    });
  }
  save() {
    let {
      value: e
    } = this.textbox;
    switch (this.root.getAttribute("data-mode")) {
      case "link": {
        const {
          scrollTop: t
        } = this.quill.root;
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", e, H.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", e, H.sources.USER)), this.quill.root.scrollTop = t;
        break;
      }
      case "video":
        e = W0(e);
      // eslint-disable-next-line no-fallthrough
      case "formula": {
        if (!e) break;
        const t = this.quill.getSelection(!0);
        if (t != null) {
          const n = t.index + t.length;
          this.quill.insertEmbed(
            n,
            // @ts-expect-error Fix me later
            this.root.getAttribute("data-mode"),
            e,
            H.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(n + 1, " ", H.sources.USER), this.quill.setSelection(n + 2, H.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function W0(r) {
  let e = r.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || r.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return e ? `${e[1] || "https"}://www.youtube.com/embed/${e[2]}?showinfo=0` : (e = r.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${e[1] || "https"}://player.vimeo.com/video/${e[2]}/` : r;
}
function tn(r, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  e.forEach((n) => {
    const s = document.createElement("option");
    n === t ? s.setAttribute("selected", "selected") : s.setAttribute("value", String(n)), r.appendChild(s);
  });
}
const Z0 = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Y0 extends Fl {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(e, t) {
    super(e, t), this.quill.on(H.events.EDITOR_CHANGE, (n, s, i, o) => {
      if (n === H.events.SELECTION_CHANGE)
        if (s != null && s.length > 0 && o === H.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const l = this.quill.getLines(s.index, s.length);
          if (l.length === 1) {
            const u = this.quill.getBounds(s);
            u != null && this.position(u);
          } else {
            const u = l[l.length - 1], d = this.quill.getIndex(u), p = Math.min(u.length() - 1, s.index + s.length - d), b = this.quill.getBounds(new fr(d, p));
            b != null && this.position(b);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(H.events.SCROLL_OPTIMIZE, () => {
      setTimeout(() => {
        if (this.root.classList.contains("ql-hidden")) return;
        const e = this.quill.getSelection();
        if (e != null) {
          const t = this.quill.getBounds(e);
          t != null && this.position(t);
        }
      }, 1);
    });
  }
  cancel() {
    this.show();
  }
  position(e) {
    const t = super.position(e), n = this.root.querySelector(".ql-tooltip-arrow");
    return n.style.marginLeft = "", t !== 0 && (n.style.marginLeft = `${-1 * t - n.offsetWidth / 2}px`), t;
  }
}
class Ml extends Nn {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Z0), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new Y0(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), bn), this.buildPickers(e.container.querySelectorAll("select"), bn));
  }
}
Ml.DEFAULTS = Kt({}, Nn.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(r) {
          r ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, $.sources.USER);
        }
      }
    }
  }
});
const X0 = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Q0 extends Fl {
  static TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join("");
  preview = this.root.querySelector("a.ql-preview");
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (e) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), e.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (e) => {
      if (this.linkRange != null) {
        const t = this.linkRange;
        this.restoreFocus(), this.quill.formatText(t, "link", !1, H.sources.USER), delete this.linkRange;
      }
      e.preventDefault(), this.hide();
    }), this.quill.on(H.events.SELECTION_CHANGE, (e, t, n) => {
      if (e != null) {
        if (e.length === 0 && n === H.sources.USER) {
          const [s, i] = this.quill.scroll.descendant(ns, e.index);
          if (s != null) {
            this.linkRange = new fr(e.index - i, s.length());
            const o = ns.formats(s.domNode);
            this.preview.textContent = o, this.preview.setAttribute("href", o), this.show();
            const l = this.quill.getBounds(this.linkRange);
            l != null && this.position(l);
            return;
          }
        } else
          delete this.linkRange;
        this.hide();
      }
    });
  }
  show() {
    super.show(), this.root.removeAttribute("data-mode");
  }
}
class jl extends Nn {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = X0), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), bn), this.buildPickers(e.container.querySelectorAll("select"), bn), this.tooltip = new Q0(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, n) => {
      e.handlers.link.call(e, !n.format.link);
    }));
  }
}
jl.DEFAULTS = Kt({}, Nn.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(r) {
          if (r) {
            const e = this.quill.getSelection();
            if (e == null || e.length === 0) return;
            let t = this.quill.getText(e);
            /^\S+@\S+\.\S+$/.test(t) && t.indexOf("mailto:") !== 0 && (t = `mailto:${t}`);
            const {
              tooltip: n
            } = this.quill.theme;
            n.edit("link", t);
          } else
            this.quill.format("link", !1, $.sources.USER);
        }
      }
    }
  }
});
$.register({
  "attributors/attribute/direction": El,
  "attributors/class/align": xl,
  "attributors/class/background": ng,
  "attributors/class/color": rg,
  "attributors/class/direction": Nl,
  "attributors/class/font": Sl,
  "attributors/class/size": _l,
  "attributors/style/align": wl,
  "attributors/style/background": Yi,
  "attributors/style/color": Zi,
  "attributors/style/direction": Tl,
  "attributors/style/font": Cl,
  "attributors/style/size": Ll
}, !0);
$.register({
  "formats/align": xl,
  "formats/direction": Nl,
  "formats/indent": Zg,
  "formats/background": Yi,
  "formats/color": Zi,
  "formats/font": Sl,
  "formats/size": _l,
  "formats/blockquote": Yg,
  "formats/code-block": Ke,
  "formats/header": Xg,
  "formats/list": En,
  "formats/bold": ta,
  "formats/code": Xi,
  "formats/italic": Qg,
  "formats/link": ns,
  "formats/script": Jg,
  "formats/strike": e0,
  "formats/underline": t0,
  "formats/formula": r0,
  "formats/image": n0,
  "formats/video": s0,
  "modules/syntax": Rl,
  "modules/table": a0,
  "modules/toolbar": na,
  "themes/bubble": Ml,
  "themes/snow": jl,
  "ui/icons": bn,
  "ui/picker": ms,
  "ui/icon-picker": Dl,
  "ui/color-picker": $l,
  "ui/tooltip": Bl
}, !0);
const J0 = { class: "rounded-lg border border-slate-300 bg-white" }, eb = /* @__PURE__ */ Te({
  __name: "RichTextEditor",
  props: {
    modelValue: {},
    placeholder: { default: "Escribe aquí el contenido..." },
    subirImagen: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = r, n = e, s = ee(null);
    let i = null;
    yn(() => {
      s.value && (i = new $(s.value, {
        theme: "snow",
        placeholder: t.placeholder,
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, !1] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote", "code-block"],
              ["link", "image"],
              ["clean"]
            ],
            handlers: {
              image: o
            }
          }
        }
      }), i.root.innerHTML = t.modelValue || "", i.enable(!t.disabled), i.on("text-change", () => {
        i && n("update:modelValue", i.root.innerHTML);
      }));
    }), wo(() => {
      i = null;
    }), Wt(
      () => t.modelValue,
      (u) => {
        i && i.root.innerHTML !== u && (i.root.innerHTML = u || "");
      }
    ), Wt(
      () => t.disabled,
      (u) => {
        i?.enable(!u);
      }
    );
    async function o() {
      if (!i)
        return;
      const u = document.createElement("input");
      u.type = "file", u.accept = "image/*", u.click(), u.onchange = async () => {
        const d = u.files?.[0];
        if (!d)
          return;
        const p = i?.getSelection(!0);
        if (p)
          try {
            if (t.disabled)
              return;
            let b = "";
            t.subirImagen ? b = await t.subirImagen(d) : b = await l(d), i?.insertEmbed(p.index, "image", b, "user");
          } catch (b) {
            console.error("No se pudo subir la imagen al editor:", b);
          }
      };
    }
    function l(u) {
      return new Promise((d, p) => {
        const b = new FileReader();
        b.onload = () => d(String(b.result)), b.onerror = () => p(new Error("No fue posible leer la imagen.")), b.readAsDataURL(u);
      });
    }
    return (u, d) => (I(), F("div", J0, [
      v("div", {
        ref_key: "root",
        ref: s,
        class: "min-h-[260px]"
      }, null, 512)
    ]));
  }
}), tb = /* @__PURE__ */ Te({
  name: "RichTextFieldInput",
  __name: "RichTextFieldInput",
  props: {
    modelValue: {},
    disabled: { type: Boolean, default: !1 },
    uploadImage: {}
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = e;
    return (n, s) => (I(), _e(eb, {
      "model-value": r.modelValue,
      "subir-imagen": r.uploadImage,
      disabled: r.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["model-value", "subir-imagen", "disabled"]));
  }
}), rb = ["value", "disabled"], nb = ["value"], sb = /* @__PURE__ */ Te({
  name: "SelectFieldInput",
  __name: "SelectFieldInput",
  props: {
    modelValue: {},
    options: { default: () => [] },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = e;
    return (n, s) => (I(), F("select", {
      value: r.modelValue,
      disabled: r.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, [
      s[1] || (s[1] = v("option", { value: "" }, "Selecciona una opción", -1)),
      (I(!0), F(Re, null, $e(r.options, (i) => (I(), F("option", {
        key: i,
        value: i
      }, X(i), 9, nb))), 128))
    ], 40, rb));
  }
}), ib = ["value", "rows", "placeholder", "disabled"], ab = /* @__PURE__ */ Te({
  name: "TextareaFieldInput",
  __name: "TextareaFieldInput",
  props: {
    modelValue: {},
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 },
    rows: { default: 4 }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = e;
    return (n, s) => (I(), F("textarea", {
      value: r.modelValue,
      rows: r.rows,
      placeholder: r.placeholder,
      disabled: r.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, ib));
  }
}), ob = ["value", "placeholder", "disabled"], ho = /* @__PURE__ */ Te({
  name: "TextFieldInput",
  __name: "TextFieldInput",
  props: {
    modelValue: {},
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(r, { emit: e }) {
    const t = e;
    return (n, s) => (I(), F("input", {
      value: r.modelValue,
      type: "text",
      placeholder: r.placeholder,
      disabled: r.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, ob));
  }
}), lb = {
  key: 2,
  class: "space-y-1"
}, ub = {
  key: 0,
  class: "text-xs text-slate-500"
}, fo = /* @__PURE__ */ Te({
  name: "CmsFieldValueInput",
  __name: "CmsFieldValueInput",
  props: {
    field: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 },
    isAutoId: { type: Boolean, default: !1 },
    documentOptions: { default: () => [] },
    documentHint: { default: "" },
    uploadImage: {}
  },
  emits: ["update:modelValue", "update:file", "remove-image"],
  setup(r, { emit: e }) {
    const t = r, n = e;
    function s() {
      return typeof t.modelValue == "string" ? t.modelValue : "";
    }
    function i() {
      return !!t.modelValue;
    }
    function o() {
      return typeof t.modelValue == "string" ? t.modelValue : "";
    }
    function l() {
      return t.modelValue;
    }
    return (u, d) => (I(), F("div", null, [
      r.field.type === "text" ? (I(), _e(ho, {
        key: 0,
        "model-value": s(),
        placeholder: r.field.placeholder || "",
        disabled: r.disabled,
        "onUpdate:modelValue": d[0] || (d[0] = (p) => n("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : r.field.type === "date" ? (I(), _e(Dc, {
        key: 1,
        "model-value": s(),
        placeholder: r.field.placeholder || "",
        disabled: r.disabled,
        "onUpdate:modelValue": d[1] || (d[1] = (p) => n("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : r.field.type === "numeric" || r.field.type === "id" ? (I(), F("div", lb, [
        ut(Zc, {
          "model-value": o(),
          placeholder: r.field.placeholder || "",
          disabled: r.disabled || r.isAutoId,
          step: r.field.type === "id" ? "1" : "any",
          min: r.field.type === "id" ? 1 : null,
          "onUpdate:modelValue": d[2] || (d[2] = (p) => n("update:modelValue", p))
        }, null, 8, ["model-value", "placeholder", "disabled", "step", "min"]),
        r.isAutoId ? (I(), F("p", ub, " Se genera automáticamente al crear el documento. ")) : te("", !0)
      ])) : r.field.type === "textarea" ? (I(), _e(ab, {
        key: 3,
        "model-value": s(),
        placeholder: r.field.placeholder || "",
        disabled: r.disabled,
        "onUpdate:modelValue": d[3] || (d[3] = (p) => n("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : r.field.type === "select" ? (I(), _e(sb, {
        key: 4,
        "model-value": s(),
        options: r.field.options || [],
        disabled: r.disabled,
        "onUpdate:modelValue": d[4] || (d[4] = (p) => n("update:modelValue", p))
      }, null, 8, ["model-value", "options", "disabled"])) : r.field.type === "document" ? (I(), _e(Pc, {
        key: 5,
        "model-value": s(),
        options: r.documentOptions,
        hint: r.documentHint,
        disabled: r.disabled,
        "onUpdate:modelValue": d[5] || (d[5] = (p) => n("update:modelValue", p))
      }, null, 8, ["model-value", "options", "hint", "disabled"])) : r.field.type === "boolean" ? (I(), _e(cc, {
        key: 6,
        "model-value": i(),
        disabled: r.disabled,
        "onUpdate:modelValue": d[6] || (d[6] = (p) => n("update:modelValue", p))
      }, null, 8, ["model-value", "disabled"])) : r.field.type === "image" ? (I(), _e(Gc, {
        key: 7,
        "model-value": s(),
        disabled: r.disabled,
        "onUpdate:file": d[7] || (d[7] = (p) => n("update:file", p)),
        onRemove: d[8] || (d[8] = (p) => n("remove-image"))
      }, null, 8, ["model-value", "disabled"])) : r.field.type === "array" || r.field.type === "map" ? (I(), _e(Rc, {
        key: 8,
        field: r.field,
        "model-value": l(),
        disabled: r.disabled,
        "onUpdate:modelValue": d[9] || (d[9] = (p) => n("update:modelValue", p))
      }, null, 8, ["field", "model-value", "disabled"])) : r.field.type === "richtext" ? (I(), _e(tb, {
        key: 9,
        "model-value": s(),
        "upload-image": r.uploadImage,
        disabled: r.disabled,
        "onUpdate:modelValue": d[10] || (d[10] = (p) => n("update:modelValue", p))
      }, null, 8, ["model-value", "upload-image", "disabled"])) : (I(), _e(ho, {
        key: 10,
        "model-value": s(),
        placeholder: r.field.placeholder || "",
        disabled: r.disabled,
        "onUpdate:modelValue": d[11] || (d[11] = (p) => n("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"]))
    ]));
  }
}), cb = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};
async function db(r, e = {}) {
  if (!r.type.startsWith("image/"))
    return r;
  const t = { ...cb, ...e }, n = await fb(r), { width: s, height: i } = hb(n.width, n.height, t.maxWidth, t.maxHeight), o = document.createElement("canvas");
  o.width = s, o.height = i;
  const l = o.getContext("2d");
  if (!l)
    return r;
  l.drawImage(n, 0, 0, s, i);
  let u = t.quality, d = await po(o, r.type || "image/jpeg", u);
  const p = t.targetSizeKb * 1024;
  for (; d.size > p && u > 0.45; )
    u -= 0.08, d = await po(o, r.type || "image/jpeg", u);
  return d;
}
function hb(r, e, t, n) {
  let s = r, i = e;
  return s > t && (i = Math.round(i * t / s), s = t), i > n && (s = Math.round(s * n / i), i = n), { width: s, height: i };
}
function po(r, e, t) {
  return new Promise((n, s) => {
    r.toBlob(
      (i) => {
        if (!i) {
          s(new Error("No fue posible generar la imagen comprimida."));
          return;
        }
        n(i);
      },
      e,
      t
    );
  });
}
function fb(r) {
  return new Promise((e, t) => {
    const n = new Image(), s = URL.createObjectURL(r);
    n.onload = () => {
      URL.revokeObjectURL(s), e(n);
    }, n.onerror = () => {
      URL.revokeObjectURL(s), t(new Error("No fue posible leer la imagen."));
    }, n.src = s;
  });
}
async function pb(r, e, t) {
  const { storage: n } = Se(), s = Xl(n, r);
  return await Ql(s, e, t), Jl(s);
}
async function mo(r, e, t = {}) {
  const n = await db(e, {
    maxWidth: t.maxWidth,
    maxHeight: t.maxHeight,
    quality: t.quality,
    targetSizeKb: t.targetSizeKb
  });
  return pb(r, n, t.metadata);
}
async function mb(r, e) {
  const { firestore: t } = Se(), n = await wb(r, e);
  return (await Wl(cr(t, r.collectionName), {
    ...n,
    createdAt: Ze(),
    updatedAt: Ze()
  })).id;
}
async function go(r, e = 100) {
  const { firestore: t } = Se();
  try {
    const n = Ii(
      cr(t, r.collectionName),
      Oi("createdAt", "desc"),
      No(e)
    );
    return (await jr(n)).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  } catch {
    return (await jr(cr(t, r.collectionName))).docs.map((s) => ({
      id: s.id,
      data: s.data()
    }));
  }
}
async function gb(r, e) {
  const { firestore: t } = Se();
  await Zl(Yt(t, r.collectionName, e));
}
async function bb(r, e, t) {
  const { firestore: n } = Se(), s = Ab(r, t);
  await Eo(Yt(n, r.collectionName, e), {
    ...s,
    updatedAt: Ze()
  });
}
const Pl = "main", yb = "schema";
async function vb(r, e, t = Pl) {
  const { firestore: n } = Se(), s = r.dictionaryDocumentId || t, i = Ul(r), o = Yt(n, r.collectionName, s), l = await is(o), u = {
    updatedAt: Ze(),
    createdAt: l.exists() ? l.data().createdAt : Ze()
  };
  if (i)
    u[i] = e;
  else
    for (const [d, p] of Object.entries(e))
      u[d] = p;
  return await Xn(
    o,
    u,
    { merge: !0 }
  ), s;
}
async function xb(r, e = Pl) {
  const { firestore: t } = Se(), n = r.dictionaryDocumentId || e, s = await is(Yt(t, r.collectionName, n));
  if (!s.exists())
    return null;
  const i = s.data(), o = Ul(r), l = o ? i[o] : null;
  return l && typeof l == "object" && !Array.isArray(l) ? {
    id: s.id,
    data: l
  } : {
    id: s.id,
    data: i
  };
}
function Ul(r) {
  return r.storageType !== "dictionary" ? "" : typeof r.dictionaryRootKey == "string" && r.dictionaryRootKey.trim() ? r.dictionaryRootKey.trim() : yb;
}
async function wb(r, e) {
  const t = Vl(r);
  if (!t.length)
    return { ...e };
  const { firestore: n } = Se(), s = { ...e };
  for (const i of t) {
    if (i.type === "id") {
      s[i.key] = await Nb(n, r.collectionName, i.key);
      continue;
    }
    if (i.type === "date") {
      s[i.key] = /* @__PURE__ */ new Date();
      continue;
    }
  }
  return s;
}
function Ab(r, e) {
  const t = Vl(r);
  if (!t.length)
    return { ...e };
  const n = { ...e };
  for (const s of t)
    delete n[s.key];
  return n;
}
function Vl(r) {
  return r.storageType !== "document" ? [] : r.fields.filter((e) => Eb(e));
}
function Eb(r) {
  return r.type === "id" ? !0 : typeof r.autogenerated == "boolean" ? r.autogenerated : !1;
}
async function Nb(r, e, t) {
  let n = 0;
  try {
    const o = (await jr(
      Ii(
        cr(r, e),
        Oi(t, "desc"),
        No(1)
      )
    )).docs[0]?.data()?.[t], l = bo(o);
    l !== null && (n = l);
  } catch {
    n = 0;
  }
  if (n > 0)
    return n + 1;
  const s = await jr(cr(r, e));
  for (const i of s.docs) {
    const o = bo(i.data()?.[t]);
    o !== null && o > n && (n = o);
  }
  return n + 1;
}
function bo(r) {
  if (typeof r == "number" && Number.isFinite(r)) {
    const e = Math.trunc(r);
    return e >= 1 ? e : null;
  }
  if (typeof r == "string") {
    const e = r.trim();
    if (!e)
      return null;
    const t = Number(e);
    if (!Number.isFinite(t))
      return null;
    const n = Math.trunc(t);
    return n >= 1 ? n : null;
  }
  return null;
}
function Tb(r) {
  return `${r.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}-${Date.now().toString().slice(-6)}`;
}
const kb = { class: "space-y-4" }, Sb = { class: "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" }, Cb = {
  key: 0,
  class: "mt-2 text-xs text-slate-500"
}, _b = {
  key: 1,
  class: "mt-2 text-xs text-rose-700"
}, Lb = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, qb = { class: "text-xl font-black text-slate-900" }, Ib = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, Ob = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Rb = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, $b = { class: "block text-sm font-semibold text-slate-700" }, Db = {
  key: 0,
  class: "text-xs text-slate-500"
}, Bb = {
  key: 0,
  class: "rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700"
}, Fb = { class: "flex flex-wrap items-center gap-2" }, Mb = ["disabled"], jb = ["disabled"], Pb = { class: "mt-6 border-t border-slate-200 pt-5" }, Ub = { class: "flex flex-wrap items-center justify-between gap-3" }, Vb = ["disabled"], zb = {
  key: 0,
  class: "mt-3 text-sm text-slate-500"
}, Hb = {
  key: 1,
  class: "mt-3 text-sm text-slate-500"
}, Kb = {
  key: 2,
  class: "mt-3 space-y-2"
}, Gb = { class: "text-sm font-semibold text-slate-900" }, Wb = { class: "text-xs text-slate-500" }, Zb = {
  key: 0,
  class: "flex items-center gap-2"
}, Yb = ["disabled", "onClick"], Xb = ["disabled", "onClick"], Qb = { class: "w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-2xl" }, Jb = { class: "block text-sm font-semibold text-slate-700" }, e1 = {
  key: 0,
  class: "text-xs text-slate-500"
}, t1 = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, r1 = { class: "flex flex-wrap items-center gap-2" }, n1 = ["disabled"], s1 = /* @__PURE__ */ Te({
  __name: "AdminBlogPage",
  setup(r) {
    const e = as(), t = vn(), n = ee([]), s = ee(""), i = ee(!1), o = ee(""), l = ee({}), u = ee({}), d = ee([]), p = ee(!1), b = ee(!1), h = ee(""), w = ee(""), E = ee({}), C = ee(""), L = ee(!1), R = Oe(() => $r.value === "admin" || $r.value === "writer" || $r.value === "manager"), j = Oe(() => n.value.find((m) => m.id === s.value) ?? null), z = Oe(() => !!C.value);
    yn(async () => {
      await Q();
    }), Wt(
      j,
      async (m) => {
        if (!m) {
          l.value = {}, u.value = {}, d.value = [], E.value = {}, C.value = "", L.value = !1;
          return;
        }
        m.storageType !== "dictionary" && (L.value = !1), y(m), await M(m), await k(m);
      },
      { immediate: !0 }
    ), Wt(
      () => e.query.schema,
      (m) => {
        typeof m == "string" && n.value.some((g) => g.id === m) && s.value !== m && (s.value = m);
      }
    );
    async function Q() {
      i.value = !0, o.value = "";
      try {
        await K();
      } catch {
        o.value = "No se pudieron cargar los tipos de contenido.";
      } finally {
        i.value = !1;
      }
    }
    async function K() {
      const m = await Di();
      if (n.value = m, !m.length) {
        s.value = "";
        return;
      }
      const g = typeof e.query.schema == "string" ? e.query.schema : "";
      if (g && m.some((B) => B.id === g)) {
        s.value = g;
        return;
      }
      m.some((B) => B.id === s.value) || (s.value = m[0].id, await ae(s.value));
    }
    async function ae(m) {
      m && e.query.schema !== m && await t.replace({
        query: {
          ...e.query,
          schema: m
        }
      });
    }
    function ie(m) {
      return !!m && typeof m == "object" && !Array.isArray(m);
    }
    function be(m) {
      return m.type === "id" ? !0 : typeof m.autogenerated == "boolean" ? m.autogenerated : !1;
    }
    function Ae(m, g) {
      return be(g) ? g.type === "id" ? m.storageType === "document" : !0 : !1;
    }
    function we(m) {
      return m.fields.filter((g) => !Ae(m, g));
    }
    function y(m) {
      const g = {}, q = {};
      for (const B of m.fields)
        B.type === "boolean" ? g[B.key] = !1 : B.type === "array" ? g[B.key] = [] : B.type === "map" ? g[B.key] = {} : B.type === "date" ? g[B.key] = "" : B.type === "numeric" || B.type === "id" ? g[B.key] = null : (B.type, g[B.key] = ""), B.type === "image" && (q[B.key] = null);
      l.value = g, u.value = q, C.value = "", h.value = "", w.value = "";
    }
    async function M(m) {
      p.value = !0;
      try {
        if (m.storageType === "dictionary") {
          const q = await xb(m);
          d.value = q ? [q] : [], C.value = "", q && A(m, q);
          return;
        }
        const g = await go(m, 100);
        d.value = g, C.value && !g.some((q) => q.id === C.value) && (C.value = "");
      } finally {
        p.value = !1;
      }
    }
    async function k(m) {
      const g = m.fields.filter((B) => B.type === "document");
      if (!g.length) {
        E.value = {};
        return;
      }
      const q = {};
      await Promise.all(
        g.map(async (B) => {
          const re = typeof B.documentSchemaId == "string" ? B.documentSchemaId.trim() : "";
          if (!re) {
            q[B.key] = { options: [], byId: {} };
            return;
          }
          const fe = n.value.find((Be) => Be.id === re);
          if (!fe || fe.storageType !== "document") {
            q[B.key] = { options: [], byId: {} };
            return;
          }
          const Le = typeof B.documentLabelField == "string" && B.documentLabelField.trim() || fe.previewField || fe.slugFromField || fe.fields[0]?.key || "", ir = await go(fe, 200), Mt = {}, ar = ir.map((Be) => (Mt[Be.id] = Be, {
            id: Be.id,
            label: _(Be, Le),
            hint: f(Be)
          }));
          q[B.key] = { options: ar, byId: Mt };
        })
      ), E.value = q;
    }
    function _(m, g) {
      const q = g ? m.data[g] : null;
      return typeof q == "string" && q.trim() ? q.trim() : m.id;
    }
    function f(m) {
      const g = m.data.telefono;
      return typeof g == "string" && g.trim() ? `Tel: ${g.trim()}` : "";
    }
    function A(m, g) {
      const q = { ...l.value };
      for (const B of m.fields) {
        const re = g.data[B.key];
        B.type === "boolean" ? q[B.key] = !!re : B.type === "array" || B.type === "map" ? q[B.key] = J(B, re) : B.type === "date" ? q[B.key] = kt(re) : B.type === "numeric" ? q[B.key] = pt(re) : B.type === "id" ? q[B.key] = Ve(re) : B.type === "document" ? q[B.key] = typeof re == "string" ? re : "" : typeof re == "string" ? q[B.key] = re : q[B.key] = "";
      }
      l.value = q;
    }
    function S(m) {
      const g = j.value;
      !g || g.storageType !== "document" || (y(g), A(g, m), C.value = m.id);
    }
    function P() {
      const m = j.value;
      !m || m.storageType !== "dictionary" || (d.value[0] ? A(m, d.value[0]) : y(m), w.value = "", L.value = !0);
    }
    function D() {
      L.value = !1, w.value = "";
    }
    function T() {
      const m = j.value;
      !m || m.storageType !== "document" || y(m);
    }
    async function N() {
      const m = j.value;
      if (m) {
        if (h.value = "", w.value = "", !R.value) {
          w.value = "Tu rol no tiene permisos para crear o editar contenido.";
          return;
        }
        b.value = !0;
        try {
          const g = {};
          for (const B of m.fields)
            Ae(m, B) || (g[B.key] = await U(m, B), V(m, B, g[B.key]));
          const q = m.storageType === "document" && !C.value;
          if ((m.storageType === "dictionary" || q) && Ft(m, g), m.slugFromField) {
            const B = g[m.slugFromField];
            typeof B == "string" && B.trim() && (g.slug = Tb(B));
          }
          m.storageType === "dictionary" ? (await vb(m, g), h.value = "Registro de diccionario actualizado.", L.value = !1) : (C.value ? (await bb(m, C.value, g), h.value = "Registro actualizado correctamente.") : (await mb(m, g), h.value = "Registro creado correctamente."), y(m)), await M(m);
        } catch (g) {
          w.value = g instanceof Error ? g.message : "No se pudo guardar el registro.";
        } finally {
          b.value = !1;
        }
      }
    }
    async function U(m, g) {
      if (g.type === "boolean")
        return !!l.value[g.key];
      if (g.type === "image") {
        const q = u.value[g.key];
        if (!q)
          return oe(g.key);
        const B = Tt(q.name), re = await mo(
          `${m.collectionName}/${g.key}/${Date.now()}-${B}`,
          q,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return l.value[g.key] = re, u.value[g.key] = null, re;
      }
      return g.type === "array" || g.type === "map" ? J(g, l.value[g.key], !0) : g.type === "date" ? ce(g.key) : g.type === "numeric" ? de(g.key) : g.type === "id" ? m.storageType === "document" && !C.value ? null : Ve(l.value[g.key]) : (g.type === "document", oe(g.key));
    }
    function V(m, g, q) {
      if (g.required && g.type !== "boolean") {
        if (g.type === "array") {
          if (!Array.isArray(q) || !q.length)
            throw new Error(`El campo "${g.label}" es obligatorio y debe tener al menos 1 elemento.`);
          return;
        }
        if (g.type === "map") {
          if (!ie(q) || Object.keys(q).length === 0)
            throw new Error(`El campo "${g.label}" es obligatorio y debe tener al menos 1 propiedad.`);
          return;
        }
        if (!(g.type === "id" && m.storageType === "document" && !C.value)) {
          if (g.type === "numeric") {
            if (typeof q != "number" || !Number.isFinite(q))
              throw new Error(`El campo "${g.label}" es obligatorio y debe ser numérico.`);
            return;
          }
          if (g.type === "id") {
            if (typeof q != "number" || !Number.isInteger(q) || q < 1)
              throw new Error(`El campo "${g.label}" es obligatorio y debe ser un entero mayor o igual a 1.`);
            return;
          }
          if (g.type === "date") {
            if (!(q instanceof Date) || Number.isNaN(q.getTime()))
              throw new Error(`El campo "${g.label}" es obligatorio y debe ser una fecha válida.`);
            return;
          }
          if (typeof q != "string" || !q.trim())
            throw new Error(`El campo "${g.label}" es obligatorio.`);
        }
      }
    }
    function J(m, g, q = !1) {
      if (typeof g == "string") {
        const re = g.trim();
        if (!(re.startsWith("{") || re.startsWith("[")))
          g = m.type === "array" ? [] : {};
        else
          try {
            g = JSON.parse(re);
          } catch {
            g = m.type === "array" ? [] : {};
          }
      }
      if (m.type === "array") {
        const re = Array.isArray(g) ? g : [];
        return m.itemSchema ? re.map(
          (fe, Le) => ge(
            m.itemSchema,
            fe,
            `${m.label}[${Le}]`,
            q
          )
        ) : re;
      }
      const B = ie(g) ? g : {};
      return Array.isArray(m.mapFields) && m.mapFields.length > 0 ? Z(m.mapFields, B, m.label, q) : B;
    }
    function Z(m, g, q, B = !1) {
      const re = {};
      for (const fe of m) {
        const Le = fe.key;
        if (!(Le in g)) {
          if (fe.required)
            throw new Error(`Falta la propiedad requerida "${q}.${Le}".`);
          continue;
        }
        re[Le] = ge(fe, g[Le], `${q}.${Le}`, B);
      }
      return re;
    }
    function ge(m, g, q, B = !1) {
      if (m.type === "array") {
        if (!Array.isArray(g))
          throw new Error(`"${q}" debe ser un arreglo.`);
        return m.itemSchema ? g.map(
          (re, fe) => ge(m.itemSchema, re, `${q}[${fe}]`, B)
        ) : g;
      }
      if (m.type === "map") {
        if (!ie(g))
          throw new Error(`"${q}" debe ser un objeto.`);
        return !Array.isArray(m.mapFields) || m.mapFields.length === 0 ? g : Z(m.mapFields, g, q, B);
      }
      if (m.type === "boolean") {
        if (typeof g != "boolean")
          throw new Error(`"${q}" debe ser boolean.`);
        return g;
      }
      if (m.type === "document") {
        if (typeof g != "string")
          throw new Error(`"${q}" debe ser string (id de documento).`);
        return g;
      }
      if (m.type === "numeric") {
        if (typeof g != "number" || !Number.isFinite(g))
          throw new Error(`"${q}" debe ser numérico.`);
        return g;
      }
      if (m.type === "id") {
        if (typeof g != "number" || !Number.isInteger(g) || g < 1)
          throw new Error(`"${q}" debe ser un número entero mayor o igual a 1.`);
        return g;
      }
      if (m.type === "date") {
        const re = St(g);
        if (!re)
          throw new Error(`"${q}" debe ser una fecha válida.`);
        return B ? re : kt(re);
      }
      if (typeof g != "string")
        throw new Error(`"${q}" debe ser string.`);
      if (m.type === "select" && Array.isArray(m.options) && m.options.length > 0 && g && !m.options.includes(g))
        throw new Error(`"${q}" no coincide con las opciones del select.`);
      return g;
    }
    async function ye(m) {
      const g = j.value;
      if (!(!g || g.storageType !== "document")) {
        if (!R.value) {
          w.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await gb(g, m), C.value === m && y(g), await M(g));
      }
    }
    async function ne(m) {
      const g = j.value;
      if (!g)
        throw new Error("No hay schema seleccionado.");
      const q = Tt(m.name);
      return mo(
        `${g.collectionName}/editor/${Date.now()}-${q}`,
        m,
        { maxWidth: 1600, maxHeight: 1600, targetSizeKb: 700, quality: 0.8 }
      );
    }
    function oe(m) {
      const g = l.value[m];
      return typeof g == "string" ? g : "";
    }
    function le(m) {
      return kt(l.value[m]);
    }
    function ce(m) {
      return St(l.value[m]);
    }
    function de(m) {
      return pt(l.value[m]);
    }
    function pe(m) {
      const g = de(m);
      return typeof g == "number" ? String(g) : "";
    }
    function Ee(m, g) {
      l.value[m] = g;
    }
    function Ce(m, g) {
      l.value[m] = kt(g);
    }
    function Jt(m, g) {
      l.value[m] = pt(g);
    }
    function er(m) {
      return m.type === "boolean" ? Er(m.key) : m.type === "array" || m.type === "map" ? rr(m.key) : m.type === "numeric" || m.type === "id" ? pe(m.key) : m.type === "date" ? le(m.key) : oe(m.key);
    }
    function wr(m, g) {
      if (m.type === "boolean") {
        Qe(m.key, !!g);
        return;
      }
      if (m.type === "array" || m.type === "map") {
        Ar(m.key, g);
        return;
      }
      if (m.type === "numeric" || m.type === "id") {
        Jt(m.key, typeof g == "string" ? g : "");
        return;
      }
      if (m.type === "date") {
        Ce(m.key, typeof g == "string" ? g : "");
        return;
      }
      Ee(m.key, typeof g == "string" ? g : "");
    }
    function tr(m) {
      return E.value[m.key]?.options ?? [];
    }
    function At(m) {
      const g = oe(m.key);
      return g ? tr(m).find((B) => B.id === g)?.hint ?? "" : "";
    }
    function rr(m) {
      return l.value[m];
    }
    function Ar(m, g) {
      l.value[m] = g;
    }
    function Er(m) {
      return !!l.value[m];
    }
    function Qe(m, g) {
      l.value[m] = g;
    }
    function Et(m, g) {
      u.value[m] = g;
    }
    function Nr(m) {
      l.value[m] = "", u.value[m] = null;
    }
    function Nt(m, g) {
      const q = g.previewField || g.slugFromField || g.fields[0]?.key;
      if (!q)
        return m.id;
      const B = m.data[q];
      if (g.fields.find((fe) => fe.key === q)?.type === "date") {
        const fe = Bt(B);
        if (fe)
          return fe;
      }
      return typeof B == "string" && B.trim() ? B : typeof B == "boolean" ? B ? "true" : "false" : typeof B == "number" && Number.isFinite(B) ? String(B) : Array.isArray(B) ? `[array:${B.length}]` : ie(B) ? "[map]" : m.id;
    }
    function Tt(m) {
      return m.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
    }
    function pt(m) {
      if (typeof m == "number")
        return Number.isFinite(m) ? m : null;
      if (typeof m == "string") {
        const g = m.trim();
        if (!g)
          return null;
        const q = Number(g);
        return Number.isFinite(q) ? q : null;
      }
      return null;
    }
    function Ve(m) {
      const g = pt(m);
      return g === null || !Number.isInteger(g) || g < 1 ? null : g;
    }
    function kt(m) {
      const g = St(m);
      return g ? nr(g) : "";
    }
    function St(m) {
      if (m instanceof Date && !Number.isNaN(m.getTime()))
        return m;
      if (m && typeof m == "object" && "toDate" in m && typeof m.toDate == "function") {
        const g = m.toDate();
        if (g instanceof Date && !Number.isNaN(g.getTime()))
          return g;
      }
      if (typeof m == "string") {
        const g = m.trim();
        if (!g)
          return null;
        const q = Hr(g);
        if (q)
          return q;
        const B = new Date(g);
        return Number.isNaN(B.getTime()) ? null : B;
      }
      if (typeof m == "number" && Number.isFinite(m)) {
        const g = new Date(m);
        if (!Number.isNaN(g.getTime()))
          return g;
      }
      return null;
    }
    function Hr(m) {
      const g = /^(\d{4})-(\d{2})-(\d{2})$/.exec(m);
      if (!g)
        return null;
      const q = Number(g[1]), B = Number(g[2]), re = Number(g[3]), fe = new Date(Date.UTC(q, B - 1, re));
      return fe.getUTCFullYear() !== q || fe.getUTCMonth() + 1 !== B || fe.getUTCDate() !== re ? null : fe;
    }
    function nr(m) {
      const g = String(m.getUTCFullYear()).padStart(4, "0"), q = String(m.getUTCMonth() + 1).padStart(2, "0"), B = String(m.getUTCDate()).padStart(2, "0");
      return `${g}-${q}-${B}`;
    }
    function Bt(m) {
      const g = St(m);
      if (!g)
        return "";
      const q = String(g.getUTCDate()).padStart(2, "0"), B = String(g.getUTCMonth() + 1).padStart(2, "0"), re = String(g.getUTCFullYear()).padStart(4, "0");
      return `${q}/${B}/${re}`;
    }
    function sr(m) {
      return m.type === "id" && j.value?.storageType === "document";
    }
    function Ft(m, g) {
      for (const q of m.fields)
        Ae(m, q) && q.type === "date" && (g[q.key] = /* @__PURE__ */ new Date());
    }
    return (m, g) => (I(), F("section", kb, [
      v("article", Sb, [
        g[0] || (g[0] = Ye(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        g[1] || (g[1] = v("strong", null, "Esquemas", -1)),
        g[2] || (g[2] = Ye(". ", -1)),
        i.value ? (I(), F("p", Cb, "Cargando formularios...")) : o.value ? (I(), F("p", _b, X(o.value), 1)) : te("", !0)
      ]),
      v("article", Lb, [
        v("h3", qb, X(j.value ? `Formulario y registros: ${j.value.title}` : "Formulario y registros"), 1),
        g[5] || (g[5] = v("p", { class: "mt-1 text-sm text-slate-600" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        R.value ? te("", !0) : (I(), F("p", Ib, " No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        w.value ? (I(), F("p", Ob, X(w.value), 1)) : te("", !0),
        h.value ? (I(), F("p", Rb, X(h.value), 1)) : te("", !0),
        j.value && j.value.storageType === "document" ? (I(), F("form", {
          key: 3,
          class: "mt-5 space-y-4",
          onSubmit: an(N, ["prevent"])
        }, [
          (I(!0), F(Re, null, $e(we(j.value), (q) => (I(), F("div", {
            key: q.key,
            class: "space-y-1"
          }, [
            v("label", $b, X(q.label), 1),
            q.helpText ? (I(), F("p", Db, X(q.helpText), 1)) : te("", !0),
            ut(fo, {
              field: q,
              "model-value": er(q),
              disabled: !R.value,
              "is-auto-id": sr(q),
              "document-options": tr(q),
              "document-hint": At(q),
              "upload-image": ne,
              "onUpdate:modelValue": (B) => wr(q, B),
              "onUpdate:file": (B) => Et(q.key, B),
              onRemoveImage: (B) => Nr(q.key)
            }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
          ]))), 128)),
          j.value.storageType === "document" && z.value ? (I(), F("p", Bb, " Editando registro: " + X(C.value), 1)) : te("", !0),
          v("div", Fb, [
            v("button", {
              type: "submit",
              disabled: b.value || !R.value,
              class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            }, X(b.value ? "Guardando..." : z.value ? "Guardar cambios" : "Crear documento"), 9, Mb),
            j.value.storageType === "document" && z.value ? (I(), F("button", {
              key: 0,
              type: "button",
              disabled: b.value || !R.value,
              class: "rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
              onClick: T
            }, " Cancelar edición ", 8, jb)) : te("", !0)
          ])
        ], 32)) : te("", !0),
        v("div", Pb, [
          v("div", Ub, [
            g[3] || (g[3] = v("h4", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Registros guardados", -1)),
            j.value?.storageType === "dictionary" ? (I(), F("button", {
              key: 0,
              type: "button",
              disabled: !R.value || b.value,
              class: "rounded-md bg-slate-900 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400",
              onClick: P
            }, " + Nuevo ", 8, Vb)) : te("", !0)
          ]),
          p.value ? (I(), F("p", zb, "Cargando registros...")) : d.value.length ? (I(), F("ul", Kb, [
            (I(!0), F(Re, null, $e(d.value, (q) => (I(), F("li", {
              key: q.id,
              class: Je([
                "flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2",
                j.value?.storageType === "document" && C.value === q.id ? "border-sky-300 bg-sky-50" : ""
              ])
            }, [
              v("div", null, [
                v("p", Gb, X(j.value ? Nt(q, j.value) : q.id), 1),
                v("p", Wb, "ID: " + X(q.id), 1)
              ]),
              j.value?.storageType === "document" ? (I(), F("div", Zb, [
                v("button", {
                  type: "button",
                  disabled: !R.value || b.value,
                  class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => S(q)
                }, X(C.value === q.id ? "Editando" : "Editar"), 9, Yb),
                v("button", {
                  type: "button",
                  disabled: !R.value,
                  class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => ye(q.id)
                }, " Eliminar ", 8, Xb)
              ])) : te("", !0)
            ], 2))), 128))
          ])) : (I(), F("p", Hb, "No hay registros todavía."))
        ]),
        j.value?.storageType === "dictionary" && L.value ? (I(), F("div", {
          key: 4,
          class: "fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4",
          onClick: an(D, ["self"])
        }, [
          v("article", Qb, [
            v("header", { class: "flex items-center justify-between gap-3" }, [
              g[4] || (g[4] = v("h4", { class: "text-base font-black text-slate-900" }, "Editar diccionario", -1)),
              v("button", {
                type: "button",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50",
                onClick: D
              }, " Cerrar ")
            ]),
            v("form", {
              class: "mt-4 space-y-4",
              onSubmit: an(N, ["prevent"])
            }, [
              (I(!0), F(Re, null, $e(we(j.value), (q) => (I(), F("div", {
                key: q.key,
                class: "space-y-1"
              }, [
                v("label", Jb, X(q.label), 1),
                q.helpText ? (I(), F("p", e1, X(q.helpText), 1)) : te("", !0),
                ut(fo, {
                  field: q,
                  "model-value": er(q),
                  disabled: !R.value,
                  "is-auto-id": sr(q),
                  "document-options": tr(q),
                  "document-hint": At(q),
                  "upload-image": ne,
                  "onUpdate:modelValue": (B) => wr(q, B),
                  "onUpdate:file": (B) => Et(q.key, B),
                  onRemoveImage: (B) => Nr(q.key)
                }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
              ]))), 128)),
              w.value ? (I(), F("p", t1, X(w.value), 1)) : te("", !0),
              v("div", r1, [
                v("button", {
                  type: "submit",
                  disabled: b.value || !R.value,
                  class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                }, X(b.value ? "Guardando..." : "Guardar diccionario"), 9, n1),
                v("button", {
                  type: "button",
                  class: "rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50",
                  onClick: D
                }, " Cancelar ")
              ])
            ], 32)
          ])
        ])) : te("", !0)
      ])
    ]));
  }
}), i1 = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3" }, a1 = { class: "mb-3 flex items-start justify-between gap-2" }, o1 = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide text-slate-600"
}, l1 = ["disabled"], u1 = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, c1 = { class: "space-y-1" }, d1 = ["value", "disabled"], h1 = { class: "space-y-1" }, f1 = ["value", "disabled"], p1 = { class: "mt-2 grid gap-2 md:grid-cols-4" }, m1 = { class: "space-y-1" }, g1 = ["value", "disabled"], b1 = ["value"], y1 = { class: "space-y-1" }, v1 = ["value", "disabled"], x1 = { class: "space-y-1" }, w1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, A1 = ["checked", "disabled"], E1 = { class: "space-y-1" }, N1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, T1 = ["checked", "disabled"], k1 = { class: "mt-2 block space-y-1" }, S1 = ["value", "disabled"], C1 = {
  key: 1,
  class: "mt-2 block space-y-1"
}, _1 = ["value", "disabled"], L1 = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, q1 = { class: "space-y-1" }, I1 = ["value", "disabled"], O1 = { class: "space-y-1" }, R1 = ["value", "disabled"], $1 = {
  key: 3,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, D1 = { class: "mb-2 flex items-center justify-between" }, B1 = ["disabled"], F1 = { class: "space-y-2" }, M1 = {
  key: 4,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, j1 = /* @__PURE__ */ Te({
  name: "CmsSchemaFieldEditor",
  __name: "CmsSchemaFieldEditor",
  props: {
    modelValue: {},
    withIdentity: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 },
    canRemove: { type: Boolean, default: !1 },
    title: { default: "" }
  },
  emits: ["update:modelValue", "remove"],
  setup(r, { emit: e }) {
    const t = [
      { label: "Texto", value: "text" },
      { label: "Fecha", value: "date" },
      { label: "Numérico", value: "numeric" },
      { label: "ID autonumérico", value: "id" },
      { label: "Textarea", value: "textarea" },
      { label: "Editor enriquecido", value: "richtext" },
      { label: "Imagen", value: "image" },
      { label: "Select", value: "select" },
      { label: "Documento (relación)", value: "document" },
      { label: "Boolean", value: "boolean" },
      { label: "Array", value: "array" },
      { label: "Map", value: "map" }
    ], n = r, s = e;
    function i(T) {
      return !!T && typeof T == "object" && !Array.isArray(T);
    }
    function o(T) {
      return T === "date" || T === "numeric" || T === "id" || T === "textarea" || T === "richtext" || T === "image" || T === "select" || T === "document" || T === "boolean" || T === "array" || T === "map" ? T : "text";
    }
    function l(T) {
      return typeof T == "string" ? T : "";
    }
    function u(T) {
      return Array.isArray(T) ? T.map((N) => String(N).trim()).filter(Boolean) : [];
    }
    function d(T, N) {
      return typeof N == "boolean" ? N : T === "id";
    }
    function p() {
      return {
        type: "text",
        autogenerated: !1,
        required: !1,
        placeholder: "",
        helpText: "",
        options: []
      };
    }
    function b() {
      return {
        ...p(),
        key: "",
        label: ""
      };
    }
    function h(T) {
      const N = i(T) ? T : {}, U = o(N.type), V = {
        type: U,
        autogenerated: d(U, N.autogenerated),
        required: !!N.required,
        placeholder: l(N.placeholder),
        helpText: l(N.helpText),
        options: U === "select" ? u(N.options) : [],
        documentSchemaId: U === "document" ? l(N.documentSchemaId) : "",
        documentLabelField: U === "document" ? l(N.documentLabelField) : ""
      };
      return U === "map" && (V.mapFields = Array.isArray(N.mapFields) ? N.mapFields.map((J) => w(J)) : []), U === "array" && (V.itemSchema = h(N.itemSchema)), V;
    }
    function w(T) {
      const N = i(T) ? T : {};
      return {
        ...h(N),
        key: l(N.key),
        label: l(N.label)
      };
    }
    function E() {
      const T = h(n.modelValue);
      if (n.withIdentity) {
        const N = w(n.modelValue);
        T.key = N.key, T.label = N.label;
      }
      return T;
    }
    function C(T, N) {
      const U = h(T), V = {
        type: U.type,
        autogenerated: d(U.type, U.autogenerated),
        required: !!U.required,
        placeholder: l(U.placeholder),
        helpText: l(U.helpText),
        options: U.type === "select" ? u(U.options) : [],
        documentSchemaId: U.type === "document" ? l(U.documentSchemaId) : "",
        documentLabelField: U.type === "document" ? l(U.documentLabelField) : ""
      };
      if (U.type === "map" && (V.mapFields = (U.mapFields ?? []).map((J) => w(J))), U.type === "array" && (V.itemSchema = C(U.itemSchema ?? p(), !1)), N) {
        const J = w(T);
        V.key = J.key, V.label = J.label;
      }
      return V;
    }
    function L(T) {
      s("update:modelValue", C(T, n.withIdentity));
    }
    function R(T, N) {
      const U = E();
      U[T] = N, L(U);
    }
    function j(T) {
      const N = E(), U = o(T);
      N.type = U, N.autogenerated = U === "id", U !== "select" && (N.options = []), U !== "document" && (N.documentSchemaId = "", N.documentLabelField = ""), U === "map" ? (N.mapFields = Array.isArray(N.mapFields) ? N.mapFields.map((V) => w(V)) : [], delete N.itemSchema) : U === "array" ? (N.itemSchema = h(N.itemSchema ?? p()), delete N.mapFields) : (delete N.mapFields, delete N.itemSchema), L(N);
    }
    function z(T) {
      const N = E();
      N.required = T, L(N);
    }
    function Q(T) {
      const N = E();
      N.autogenerated = N.type === "id" ? !0 : T, L(N);
    }
    function K(T) {
      const N = E();
      N.placeholder = T, L(N);
    }
    function ae(T) {
      const N = E();
      N.helpText = T, L(N);
    }
    function ie() {
      return (E().options ?? []).join(", ");
    }
    function be(T) {
      const N = E();
      N.options = T.split(",").map((U) => U.trim()).filter(Boolean), L(N);
    }
    function Ae() {
      return E().documentSchemaId ?? "";
    }
    function we() {
      return E().documentLabelField ?? "";
    }
    function y(T) {
      const N = E();
      N.documentSchemaId = T, L(N);
    }
    function M(T) {
      const N = E();
      N.documentLabelField = T, L(N);
    }
    function k() {
      const T = E();
      return T.type !== "map" || !Array.isArray(T.mapFields) ? [] : T.mapFields.map((N) => w(N));
    }
    function _() {
      const T = E();
      T.type = "map", T.mapFields = [...k(), b()], L(T);
    }
    function f(T, N) {
      const U = E(), V = k();
      V[T] = w(N), U.mapFields = V, L(U);
    }
    function A(T) {
      const N = E(), U = k();
      U.splice(T, 1), N.mapFields = U, L(N);
    }
    function S() {
      const T = E();
      return T.type !== "array" ? p() : h(T.itemSchema ?? p());
    }
    function P(T) {
      const N = E();
      N.type = "array", N.itemSchema = h(T), L(N);
    }
    function D() {
      s("remove");
    }
    return (T, N) => {
      const U = Ao("CmsSchemaFieldEditor", !0);
      return I(), F("article", i1, [
        v("div", a1, [
          r.title ? (I(), F("p", o1, X(r.title), 1)) : te("", !0),
          r.canRemove ? (I(), F("button", {
            key: 1,
            type: "button",
            disabled: r.disabled,
            class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60",
            onClick: D
          }, " Quitar ", 8, l1)) : te("", !0)
        ]),
        r.withIdentity ? (I(), F("div", u1, [
          v("label", c1, [
            N[10] || (N[10] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Key", -1)),
            v("input", {
              value: E().key || "",
              type: "text",
              disabled: r.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[0] || (N[0] = (V) => R("key", V.target.value))
            }, null, 40, d1)
          ]),
          v("label", h1, [
            N[11] || (N[11] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Label", -1)),
            v("input", {
              value: E().label || "",
              type: "text",
              disabled: r.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[1] || (N[1] = (V) => R("label", V.target.value))
            }, null, 40, f1)
          ])
        ])) : te("", !0),
        v("div", p1, [
          v("label", m1, [
            N[12] || (N[12] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo", -1)),
            v("select", {
              value: E().type,
              disabled: r.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: N[2] || (N[2] = (V) => j(V.target.value))
            }, [
              (I(), F(Re, null, $e(t, (V) => v("option", {
                key: V.value,
                value: V.value
              }, X(V.label), 9, b1)), 64))
            ], 40, g1)
          ]),
          v("label", y1, [
            N[13] || (N[13] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Placeholder", -1)),
            v("input", {
              value: E().placeholder || "",
              type: "text",
              disabled: r.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[3] || (N[3] = (V) => K(V.target.value))
            }, null, 40, v1)
          ]),
          v("label", x1, [
            N[15] || (N[15] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Requerido", -1)),
            v("span", w1, [
              v("input", {
                checked: !!E().required,
                type: "checkbox",
                disabled: r.disabled,
                onChange: N[4] || (N[4] = (V) => z(V.target.checked))
              }, null, 40, A1),
              N[14] || (N[14] = v("span", { class: "ml-2" }, "Sí", -1))
            ])
          ]),
          v("label", E1, [
            N[17] || (N[17] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Autogenerado", -1)),
            v("span", N1, [
              v("input", {
                checked: !!E().autogenerated,
                type: "checkbox",
                disabled: r.disabled || E().type === "id",
                onChange: N[5] || (N[5] = (V) => Q(V.target.checked))
              }, null, 40, T1),
              N[16] || (N[16] = v("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        v("label", k1, [
          N[18] || (N[18] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Help text", -1)),
          v("input", {
            value: E().helpText || "",
            type: "text",
            disabled: r.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: N[6] || (N[6] = (V) => ae(V.target.value))
          }, null, 40, S1)
        ]),
        E().type === "select" ? (I(), F("label", C1, [
          N[19] || (N[19] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Opciones (separadas por coma)", -1)),
          v("input", {
            value: ie(),
            type: "text",
            disabled: r.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: N[7] || (N[7] = (V) => be(V.target.value))
          }, null, 40, _1)
        ])) : te("", !0),
        E().type === "document" ? (I(), F("div", L1, [
          v("label", q1, [
            N[20] || (N[20] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Schema destino", -1)),
            v("input", {
              value: Ae(),
              type: "text",
              disabled: r.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[8] || (N[8] = (V) => y(V.target.value))
            }, null, 40, I1)
          ]),
          v("label", O1, [
            N[21] || (N[21] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Campo etiqueta", -1)),
            v("input", {
              value: we(),
              type: "text",
              disabled: r.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[9] || (N[9] = (V) => M(V.target.value))
            }, null, 40, R1)
          ])
        ])) : te("", !0),
        E().type === "map" ? (I(), F("div", $1, [
          v("div", D1, [
            N[22] || (N[22] = v("p", { class: "text-xs font-bold uppercase tracking-wide text-slate-600" }, "Map fields", -1)),
            v("button", {
              type: "button",
              disabled: r.disabled,
              class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60",
              onClick: _
            }, " Agregar campo ", 8, B1)
          ]),
          v("div", F1, [
            (I(!0), F(Re, null, $e(k(), (V, J) => (I(), _e(U, {
              key: `map-field-${J}`,
              "model-value": V,
              disabled: r.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (Z) => f(J, Z),
              onRemove: (Z) => A(J)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : te("", !0),
        E().type === "array" ? (I(), F("div", M1, [
          N[23] || (N[23] = v("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-600" }, "Item schema", -1)),
          ut(U, {
            "model-value": S(),
            "with-identity": !1,
            disabled: r.disabled,
            title: "Estructura del ítem",
            "onUpdate:modelValue": P
          }, null, 8, ["model-value", "disabled"])
        ])) : te("", !0)
      ]);
    };
  }
}), P1 = { class: "space-y-4" }, U1 = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, V1 = {
  key: 1,
  class: "text-sm text-slate-500"
}, z1 = {
  key: 2,
  class: "text-sm text-slate-500"
}, H1 = {
  key: 3,
  class: "rounded-2xl border border-slate-200 bg-white p-5"
}, K1 = { class: "flex flex-wrap items-center justify-between gap-3" }, G1 = { class: "text-lg font-black text-slate-900" }, W1 = { class: "text-xs text-slate-500" }, Z1 = ["disabled"], Y1 = { class: "mt-4 grid gap-3 md:grid-cols-2" }, X1 = { class: "space-y-1" }, Q1 = ["value"], J1 = { class: "space-y-1" }, ey = ["value"], ty = { class: "space-y-1 md:col-span-2" }, ry = ["value"], ny = { class: "space-y-1" }, sy = ["value"], iy = { class: "space-y-1" }, ay = ["value"], oy = { class: "space-y-1" }, ly = ["value"], uy = { class: "space-y-1" }, cy = ["value"], dy = {
  key: 0,
  class: "space-y-1"
}, hy = ["value"], fy = {
  key: 1,
  class: "space-y-1"
}, py = ["value"], my = { class: "mt-5 border-t border-slate-200 pt-4" }, gy = { class: "space-y-3" }, by = {
  key: 0,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, yy = {
  key: 1,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, vy = /* @__PURE__ */ Te({
  __name: "AdminSchemasPage",
  setup(r) {
    const e = as(), t = vn(), n = ee([]), s = ee(""), i = ee(!1), o = ee(!1), l = ee(null), u = ee(!1), d = ee(""), p = ee(""), b = ee(""), h = Oe(() => n.value.find((f) => f.id === s.value) ?? null);
    yn(() => {
      w();
    }), Wt(
      () => e.query.schema,
      (f) => {
        typeof f == "string" && n.value.some((A) => A.id === f) && s.value !== f && (s.value = f);
      }
    ), Wt(
      h,
      (f) => {
        if (p.value = "", b.value = "", f) {
          u.value = !1, l.value = Q(f);
          return;
        }
        u.value || (l.value = null);
      },
      { immediate: !0 }
    );
    async function w() {
      i.value = !0, d.value = "";
      try {
        const f = await Di();
        n.value = f, E(f), s.value ? await C(s.value) : l.value || (u.value = !0, l.value = K());
      } catch {
        d.value = "No se pudieron cargar los esquemas.";
      } finally {
        i.value = !1;
      }
    }
    function E(f) {
      if (!f.length) {
        s.value = "";
        return;
      }
      const A = typeof e.query.schema == "string" ? e.query.schema : "";
      if (A && f.some((S) => S.id === A)) {
        s.value = A;
        return;
      }
      f.some((S) => S.id === s.value) || (s.value = f[0].id);
    }
    async function C(f) {
      !f || e.query.schema === f || await t.replace({
        query: {
          ...e.query,
          schema: f
        }
      });
    }
    function L() {
      return {
        type: "text",
        autogenerated: !1,
        required: !1,
        placeholder: "",
        helpText: "",
        options: []
      };
    }
    function R() {
      return {
        ...L(),
        key: "",
        label: ""
      };
    }
    function j(f) {
      const A = {
        type: f.type,
        autogenerated: !!f.autogenerated,
        required: !!f.required,
        placeholder: f.placeholder ?? "",
        helpText: f.helpText ?? "",
        options: Array.isArray(f.options) ? [...f.options] : []
      };
      return f.type === "map" && (A.mapFields = Array.isArray(f.mapFields) ? f.mapFields.map((S) => z(S)) : []), f.type === "array" && (A.itemSchema = f.itemSchema ? j(f.itemSchema) : L()), A;
    }
    function z(f) {
      return {
        ...j(f),
        key: f.key ?? "",
        label: f.label ?? ""
      };
    }
    function Q(f) {
      return {
        id: f.id,
        title: f.title,
        description: f.description ?? "",
        storageType: f.storageType,
        collectionName: f.collectionName,
        dictionaryDocumentId: f.dictionaryDocumentId ?? "",
        dictionaryRootKey: f.dictionaryRootKey ?? "",
        slugFromField: f.slugFromField ?? "",
        previewField: f.previewField ?? "",
        fields: f.fields.map((A) => z(A))
      };
    }
    function K() {
      return {
        id: "",
        title: "",
        description: "",
        storageType: "document",
        collectionName: "",
        dictionaryDocumentId: "",
        dictionaryRootKey: "",
        slugFromField: "",
        previewField: "",
        fields: [R()]
      };
    }
    async function ae() {
      u.value = !0, s.value = "", l.value = K(), p.value = "", b.value = "";
      const f = { ...e.query };
      delete f.schema, await t.replace({ query: f });
    }
    function ie(f, A) {
      l.value && (l.value = {
        ...l.value,
        [f]: A
      });
    }
    function be(f) {
      l.value && (l.value.storageType = f === "dictionary" ? "dictionary" : "document");
    }
    function Ae() {
      l.value && l.value.fields.push(R());
    }
    function we(f, A) {
      l.value && (l.value.fields[f] = z(A));
    }
    function y(f) {
      l.value && l.value.fields.splice(f, 1);
    }
    function M(f, A) {
      if (f.type === "map") {
        const S = Array.isArray(f.mapFields) ? f.mapFields : [];
        for (let P = 0; P < S.length; P += 1)
          k(S[P], `${A}.mapFields[${P}]`);
      }
      f.type === "array" && f.itemSchema && M(f.itemSchema, `${A}.itemSchema`);
    }
    function k(f, A) {
      if (!f.key.trim() || !f.label.trim())
        throw new Error(`${A}: completa key y label.`);
      M(f, A);
    }
    async function _() {
      if (l.value) {
        o.value = !0, p.value = "", b.value = "";
        try {
          const f = l.value;
          if (!f.id.trim() || !f.title.trim() || !f.collectionName.trim())
            throw new Error("Completa id, título y colección del esquema.");
          if (!f.fields.length)
            throw new Error("Agrega al menos un campo al esquema.");
          const A = f.fields.map((D) => z(D));
          for (let D = 0; D < A.length; D += 1)
            k(A[D], `fields[${D}]`);
          const S = {
            id: f.id,
            title: f.title,
            description: f.description,
            storageType: f.storageType,
            collectionName: f.collectionName,
            dictionaryDocumentId: f.storageType === "dictionary" ? f.dictionaryDocumentId : "",
            dictionaryRootKey: f.storageType === "dictionary" ? f.dictionaryRootKey : "",
            slugFromField: f.slugFromField,
            previewField: f.previewField,
            fields: A
          };
          await ku(S), await w(), s.value = S.id, u.value = !1, await C(S.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const P = n.value.find((D) => D.id === s.value);
          l.value = Q(P || S), b.value = "Esquema actualizado.";
        } catch (f) {
          p.value = f instanceof Error ? f.message : "No se pudo guardar el esquema.";
        } finally {
          o.value = !1;
        }
      }
    }
    return (f, A) => (I(), F("section", P1, [
      v("article", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        v("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
          A[9] || (A[9] = v("div", null, [
            v("h3", { class: "text-xl font-black text-slate-900" }, "Esquema editable"),
            v("p", { class: "mt-1 text-sm text-slate-600" }, [
              Ye(" Edición visual de campos. Los tipos "),
              v("strong", null, "map"),
              Ye(" y "),
              v("strong", null, "array"),
              Ye(" se editan por interfaz. ")
            ])
          ], -1)),
          v("div", { class: "flex items-center gap-2" }, [
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: ae
            }, " Nuevo esquema "),
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: w
            }, " Recargar ")
          ])
        ])
      ]),
      d.value ? (I(), F("p", U1, X(d.value), 1)) : te("", !0),
      i.value ? (I(), F("p", V1, "Cargando esquemas...")) : l.value ? (I(), F("article", H1, [
        v("div", K1, [
          v("div", null, [
            v("h4", G1, X(l.value.title || h.value?.title || "Nuevo esquema"), 1),
            v("p", W1, [
              A[10] || (A[10] = Ye(" ID: ", -1)),
              v("code", null, X(h.value?.id || "nuevo"), 1)
            ])
          ]),
          v("button", {
            type: "button",
            disabled: o.value,
            class: "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400",
            onClick: _
          }, X(o.value ? "Guardando..." : "Guardar cambios"), 9, Z1)
        ]),
        v("div", Y1, [
          v("label", X1, [
            A[11] || (A[11] = v("span", { class: "text-xs font-semibold text-slate-700" }, "ID", -1)),
            v("input", {
              value: l.value.id,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[0] || (A[0] = (S) => ie("id", S.target.value))
            }, null, 40, Q1)
          ]),
          v("label", J1, [
            A[12] || (A[12] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Título", -1)),
            v("input", {
              value: l.value.title,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[1] || (A[1] = (S) => ie("title", S.target.value))
            }, null, 40, ey)
          ]),
          v("label", ty, [
            A[13] || (A[13] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Descripción", -1)),
            v("input", {
              value: l.value.description,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[2] || (A[2] = (S) => ie("description", S.target.value))
            }, null, 40, ry)
          ]),
          v("label", ny, [
            A[15] || (A[15] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo de almacenamiento", -1)),
            v("select", {
              value: l.value.storageType,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onChange: A[3] || (A[3] = (S) => be(S.target.value))
            }, [...A[14] || (A[14] = [
              v("option", { value: "document" }, "document", -1),
              v("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, sy)
          ]),
          v("label", iy, [
            A[16] || (A[16] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Colección", -1)),
            v("input", {
              value: l.value.collectionName,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[4] || (A[4] = (S) => ie("collectionName", S.target.value))
            }, null, 40, ay)
          ]),
          v("label", oy, [
            A[17] || (A[17] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Slug desde campo", -1)),
            v("input", {
              value: l.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[5] || (A[5] = (S) => ie("slugFromField", S.target.value))
            }, null, 40, ly)
          ]),
          v("label", uy, [
            A[18] || (A[18] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Campo de preview", -1)),
            v("input", {
              value: l.value.previewField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[6] || (A[6] = (S) => ie("previewField", S.target.value))
            }, null, 40, cy)
          ]),
          l.value.storageType === "dictionary" ? (I(), F("label", dy, [
            A[19] || (A[19] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary document ID", -1)),
            v("input", {
              value: l.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[7] || (A[7] = (S) => ie("dictionaryDocumentId", S.target.value))
            }, null, 40, hy)
          ])) : te("", !0),
          l.value.storageType === "dictionary" ? (I(), F("label", fy, [
            A[20] || (A[20] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary root key", -1)),
            v("input", {
              value: l.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[8] || (A[8] = (S) => ie("dictionaryRootKey", S.target.value))
            }, null, 40, py)
          ])) : te("", !0)
        ]),
        v("div", my, [
          v("div", { class: "mb-3 flex items-center justify-between" }, [
            A[21] || (A[21] = v("h5", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Campos", -1)),
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: Ae
            }, " Agregar campo ")
          ]),
          v("div", gy, [
            (I(!0), F(Re, null, $e(l.value.fields, (S, P) => (I(), _e(j1, {
              key: `schema-field-${P}`,
              "model-value": S,
              "can-remove": !0,
              title: `Campo ${P + 1}`,
              "onUpdate:modelValue": (D) => we(P, D),
              onRemove: (D) => y(P)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        p.value ? (I(), F("p", by, X(p.value), 1)) : te("", !0),
        b.value ? (I(), F("p", yy, X(b.value), 1)) : te("", !0)
      ])) : (I(), F("p", z1, "No hay esquema seleccionado."))
    ]));
  }
}), xy = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, wy = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, Ay = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Ey = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, Ny = {
  key: 3,
  class: "mt-4 text-sm text-slate-500"
}, Ty = {
  key: 4,
  class: "mt-4 text-sm text-slate-500"
}, ky = {
  key: 5,
  class: "mt-4 space-y-3"
}, Sy = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, Cy = { class: "text-sm font-semibold text-slate-900" }, _y = { class: "text-xs text-slate-500" }, Ly = { class: "text-xs text-slate-500" }, qy = { class: "text-xs text-slate-500" }, Iy = { class: "flex flex-wrap gap-3" }, Oy = ["checked", "disabled", "onChange"], Ry = /* @__PURE__ */ Te({
  __name: "AdminUsersPage",
  setup(r) {
    const e = ee([]), t = ee(!1), n = ee(""), s = ee(""), i = ee(null), o = Oe(() => $r.value === "admin"), l = [
      { label: "Admin", value: "admin" },
      { label: "Writer", value: "writer" },
      { label: "Manager", value: "manager" },
      { label: "Sin rol", value: null }
    ];
    yn(async () => {
      await u();
    });
    async function u() {
      t.value = !0, n.value = "";
      try {
        e.value = await au();
      } catch {
        n.value = "No se pudieron cargar los usuarios.";
      } finally {
        t.value = !1;
      }
    }
    async function d(w, E) {
      if (s.value = "", n.value = "", !o.value) {
        n.value = "Solo un admin puede cambiar roles.";
        return;
      }
      const C = w.role === E ? null : E;
      i.value = w.id;
      try {
        await ou(w.id, C), w.role = C, s.value = "Rol actualizado correctamente.";
      } catch {
        n.value = "No se pudo actualizar el rol.";
      } finally {
        i.value = null;
      }
    }
    function p(w, E) {
      return w === E;
    }
    function b(w) {
      return w === null ? "Sin rol" : w.charAt(0).toUpperCase() + w.slice(1);
    }
    function h(w) {
      const E = w?.toDate?.();
      return E ? E.toLocaleString("es-ES") : "Sin registros";
    }
    return (w, E) => (I(), F("section", xy, [
      v("div", { class: "flex items-center justify-between" }, [
        E[0] || (E[0] = v("h3", { class: "text-xl font-black text-slate-900" }, "Usuarios", -1)),
        v("button", {
          type: "button",
          class: "rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
          onClick: u
        }, " Recargar ")
      ]),
      E[1] || (E[1] = v("p", { class: "mt-1 text-sm text-slate-600" }, "Listado de usuarios con último login y control de rol.", -1)),
      o.value ? te("", !0) : (I(), F("p", wy, " Solo usuarios con rol admin pueden editar roles. ")),
      n.value ? (I(), F("p", Ay, X(n.value), 1)) : te("", !0),
      s.value ? (I(), F("p", Ey, X(s.value), 1)) : te("", !0),
      t.value ? (I(), F("p", Ny, "Cargando usuarios...")) : e.value.length === 0 ? (I(), F("p", Ty, "No hay usuarios registrados.")) : (I(), F("div", ky, [
        (I(!0), F(Re, null, $e(e.value, (C) => (I(), F("article", {
          key: C.id,
          class: "rounded-lg border border-slate-200 p-4"
        }, [
          v("div", Sy, [
            v("div", null, [
              v("p", Cy, X(C.email || C.id), 1),
              v("p", _y, "UID: " + X(C.id), 1),
              v("p", Ly, "Último login: " + X(h(C.lastLoginAt)), 1),
              v("p", qy, "Rol actual: " + X(b(C.role)), 1)
            ]),
            v("div", Iy, [
              (I(), F(Re, null, $e(l, (L) => v("label", {
                key: L.label,
                class: "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
              }, [
                v("input", {
                  type: "checkbox",
                  checked: p(C.role, L.value),
                  disabled: !o.value || i.value === C.id,
                  onChange: (R) => d(C, L.value)
                }, null, 40, Oy),
                Ye(" " + X(L.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), yo = /* @__PURE__ */ new WeakSet();
function Wy(r, e) {
  if (yo.has(r))
    return;
  const t = Mr(e.basePath ?? "/admin"), n = Mr(e.loginPath ?? "/ingresar"), s = Mr(e.registerPath ?? "/registro"), i = Dy(e.homePath ?? "/");
  nu(e.firebase), pu({ basePath: t, loginPath: n, registerPath: s, homePath: i }), uu();
  const o = $y(t, n, s);
  for (const l of o)
    r.addRoute(l);
  r.beforeEach(async (l) => (await cu(), l.meta.cmsRequiresAuth && !dn.value ? {
    path: n,
    query: { redirect: l.fullPath }
  } : (l.path === n || l.path === s || l.meta.cmsGuestOnly) && dn.value ? { path: t } : !0)), yo.add(r);
}
function $y(r = "/admin", e = "/ingresar", t = "/registro") {
  const n = Mr(r), s = Mr(e), i = Mr(t);
  return [
    { path: s, component: vu, meta: { cmsGuestOnly: !0 } },
    { path: i, component: Nu, meta: { cmsGuestOnly: !0 } },
    {
      path: n,
      component: oc,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${n}/content` },
        { path: "content", component: s1, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: vy, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: Ry, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function Mr(r) {
  const e = String(r || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function Dy(r) {
  const e = String(r || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
ru();
export {
  bb as actualizarRegistroDocumento,
  fu as cerrarSesion,
  mb as crearRegistroDocumento,
  $y as createCmsRoutes,
  gb as eliminarRegistroDocumento,
  vb as guardarRegistroDiccionario,
  ku as guardarSchemaContenido,
  go as listarRegistrosDocumento,
  Di as listarSchemasContenido,
  xb as obtenerRegistroDiccionario,
  Wy as registerPifWarriorsCms,
  $r as rolActual,
  dn as usuarioActual
};
