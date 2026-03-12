import { signOut as zl, onAuthStateChanged as Hl, setPersistence as va, browserLocalPersistence as xa, signInWithEmailAndPassword as Kl, createUserWithEmailAndPassword as Gl } from "firebase/auth";
import { ref as te, defineComponent as Se, openBlock as I, createElementBlock as B, createElementVNode as v, withModifiers as or, withDirectives as ar, vModelText as lr, toDisplayString as Q, createCommentVNode as ne, createTextVNode as Ye, createVNode as lt, unref as je, withCtx as Ut, onMounted as yr, onBeforeUnmount as wa, watch as Wt, computed as Te, normalizeStyle as Js, normalizeClass as bt, Fragment as Re, renderList as $e, createBlock as Le, resolveComponent as Aa } from "vue";
import { query as Oi, collection as dn, orderBy as Ri, getDocs as jn, updateDoc as Ea, doc as Yt, serverTimestamp as Ze, getDoc as is, setDoc as Xr, addDoc as Wl, deleteDoc as Zl, limit as Na } from "firebase/firestore";
import { useRoute as os, useRouter as vr, RouterLink as Vt, RouterView as Yl } from "vue-router";
import { ref as Xl, uploadBytes as Ql, getDownloadURL as Jl } from "firebase/storage";
let pi = null;
function eu(n) {
  pi = n;
}
function ke() {
  if (!pi)
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  return pi;
}
const as = "users";
async function tu(n) {
  const { firestore: e } = ke(), t = Yt(e, as, n.uid);
  if (!(await is(t)).exists()) {
    await Xr(t, {
      email: n.email ?? "",
      role: null,
      lastLoginAt: Ze(),
      createdAt: Ze(),
      updatedAt: Ze()
    });
    return;
  }
  await Xr(
    t,
    {
      email: n.email ?? "",
      lastLoginAt: Ze(),
      updatedAt: Ze()
    },
    { merge: !0 }
  );
}
async function nu(n) {
  const { firestore: e } = ke(), t = await is(Yt(e, as, n));
  return t.exists() ? Ta(t.data().role) : null;
}
async function ru() {
  const { firestore: n } = ke(), e = Oi(dn(n, as), Ri("email", "asc"));
  return (await jn(e)).docs.map((r) => ({
    id: r.id,
    email: String(r.data().email ?? ""),
    role: Ta(r.data().role),
    lastLoginAt: r.data().lastLoginAt,
    createdAt: r.data().createdAt,
    updatedAt: r.data().updatedAt
  }));
}
async function su(n, e) {
  const { firestore: t } = ke();
  await Ea(Yt(t, as, n), {
    role: e,
    updatedAt: Ze()
  });
}
function Ta(n) {
  return n === "admin" || n === "writer" || n === "manager" ? n : null;
}
const dr = te(null), Sa = te(!1), Dn = te(null);
let Wr = null, iu = new Promise((n) => {
  Wr = n;
}), oo = !1;
function ou() {
  if (oo)
    return;
  const { auth: n } = ke();
  dr.value = n.currentUser, Hl(n, async (e) => {
    dr.value = e, Dn.value = null, e && await $i(e), Sa.value = !0, Wr && (Wr(), Wr = null);
  }), oo = !0;
}
async function au() {
  Sa.value || await iu;
}
async function lu(n, e) {
  const { auth: t } = ke();
  await va(t, xa);
  const r = await Gl(t, n, e);
  await $i(r.user);
}
async function uu(n, e) {
  const { auth: t } = ke();
  await va(t, xa);
  const r = await Kl(t, n, e);
  await $i(r.user);
}
async function cu() {
  const { auth: n } = ke();
  await zl(n);
}
async function $i(n) {
  try {
    await tu(n), Dn.value = await nu(n.uid);
  } catch (e) {
    console.error("No se pudo sincronizar el perfil del usuario:", e);
  }
}
let mi = {
  basePath: "/admin",
  loginPath: "/ingresar",
  registerPath: "/registro",
  homePath: "/"
};
function du(n) {
  mi = {
    ...mi,
    ...n
  };
}
function Di() {
  return mi;
}
const hu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, fu = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, pu = ["disabled"], mu = { class: "mt-4 text-sm" }, gu = /* @__PURE__ */ Se({
  __name: "LoginPage",
  setup(n) {
    const e = os(), t = vr(), { basePath: r, registerPath: s } = Di(), i = te(""), a = te(""), l = te(!1), u = te("");
    async function d() {
      u.value = "", l.value = !0;
      try {
        await uu(i.value, a.value);
        const p = typeof e.query.redirect == "string" ? e.query.redirect : r;
        await t.push(p);
      } catch {
        u.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, b) => (I(), B("main", hu, [
      b[6] || (b[6] = v("h1", { class: "text-3xl font-black" }, "Ingresar", -1)),
      b[7] || (b[7] = v("p", { class: "mt-2 text-sm" }, "Accede para administrar contenido y esquemas.", -1)),
      v("form", {
        class: "mt-8 space-y-4 rounded-xl border p-5",
        onSubmit: or(d, ["prevent"])
      }, [
        v("div", null, [
          b[2] || (b[2] = v("label", { class: "mb-1 block text-sm font-semibold" }, "Correo", -1)),
          ar(v("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "tu@email.com"
          }, null, 512), [
            [lr, i.value]
          ])
        ]),
        v("div", null, [
          b[3] || (b[3] = v("label", { class: "mb-1 block text-sm font-semibold" }, "Contraseña", -1)),
          ar(v("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (h) => a.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "********"
          }, null, 512), [
            [lr, a.value]
          ])
        ]),
        u.value ? (I(), B("p", fu, Q(u.value), 1)) : ne("", !0),
        v("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        }, Q(l.value ? "Ingresando..." : "Entrar"), 9, pu)
      ], 32),
      v("p", mu, [
        b[5] || (b[5] = Ye(" ¿No tienes cuenta? ", -1)),
        lt(je(Vt), {
          to: je(s),
          class: "font-semibold"
        }, {
          default: Ut(() => [...b[4] || (b[4] = [
            Ye("Crear cuenta", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), bu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, yu = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, vu = ["disabled"], xu = { class: "mt-4 text-sm" }, wu = /* @__PURE__ */ Se({
  __name: "RegisterPage",
  setup(n) {
    const e = vr(), { basePath: t, loginPath: r } = Di(), s = te(""), i = te(""), a = te(""), l = te(!1), u = te("");
    async function d() {
      if (u.value = "", i.value !== a.value) {
        u.value = "Las contraseñas no coinciden.";
        return;
      }
      l.value = !0;
      try {
        await lu(s.value, i.value), await e.push(t);
      } catch {
        u.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, b) => (I(), B("main", bu, [
      b[8] || (b[8] = v("h1", { class: "text-3xl font-black" }, "Crear cuenta", -1)),
      b[9] || (b[9] = v("p", { class: "mt-2 text-sm" }, "Registro para administrar contenido.", -1)),
      v("form", {
        class: "mt-8 space-y-4 rounded-xl border p-5",
        onSubmit: or(d, ["prevent"])
      }, [
        v("div", null, [
          b[3] || (b[3] = v("label", { class: "mb-1 block text-sm font-semibold" }, "Correo", -1)),
          ar(v("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => s.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "tu@email.com"
          }, null, 512), [
            [lr, s.value]
          ])
        ]),
        v("div", null, [
          b[4] || (b[4] = v("label", { class: "mb-1 block text-sm font-semibold" }, "Contraseña", -1)),
          ar(v("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (h) => i.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "Mínimo 6 caracteres"
          }, null, 512), [
            [lr, i.value]
          ])
        ]),
        v("div", null, [
          b[5] || (b[5] = v("label", { class: "mb-1 block text-sm font-semibold" }, "Confirmar contraseña", -1)),
          ar(v("input", {
            "onUpdate:modelValue": b[2] || (b[2] = (h) => a.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [lr, a.value]
          ])
        ]),
        u.value ? (I(), B("p", yu, Q(u.value), 1)) : ne("", !0),
        v("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        }, Q(l.value ? "Creando cuenta..." : "Registrarme"), 9, vu)
      ], 32),
      v("p", xu, [
        b[7] || (b[7] = Ye(" ¿Ya tienes cuenta? ", -1)),
        lt(je(Vt), {
          to: je(r),
          class: "font-semibold"
        }, {
          default: Ut(() => [...b[6] || (b[6] = [
            Ye("Iniciar sesión", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), Ca = "cmsSchemas", ka = "schema", _a = "main", Au = 3e4;
let Zr = null, gi = 0, er = null;
async function Bi() {
  const n = Date.now();
  if (Zr && n - gi < Au)
    return Zr;
  if (er)
    return er;
  const { firestore: e } = ke();
  er = (async () => {
    const r = (await jn(dn(e, Ca))).docs.map((s) => {
      const i = s.data();
      return La({ ...i, id: s.id });
    }).sort((s, i) => s.title.localeCompare(i.title, "es"));
    return Zr = r, gi = Date.now(), r;
  })();
  try {
    return await er;
  } finally {
    er = null;
  }
}
async function Eu(n) {
  const { firestore: e } = ke(), t = La(n), r = Yt(e, Ca, t.id);
  await Xr(
    r,
    {
      ...t,
      updatedAt: Ze(),
      createdAt: Ze()
    },
    { merge: !0 }
  ), Nu();
}
function Nu() {
  Zr = null, gi = 0;
}
function La(n) {
  const e = n;
  let t = [];
  const r = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((u) => Qr(u)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([u, d]) => Qr({ key: u, ...d })
  ));
  const s = typeof e.dictionaryDocumentId == "string" ? e.dictionaryDocumentId : "", i = typeof e.dictionaryRootKey == "string" ? e.dictionaryRootKey : "", a = r === "dictionary" ? Cu(s || _a) : "", l = r === "dictionary" ? ku(i || ka) : "";
  return {
    id: Tu(String(e.id ?? "tipo-contenido")),
    title: String(e.title ?? "Tipo de contenido"),
    description: typeof e.description == "string" ? e.description : "",
    storageType: r,
    collectionName: Su(String(e.collectionName ?? "registros")),
    dictionaryDocumentId: a,
    dictionaryRootKey: l,
    slugFromField: typeof e.slugFromField == "string" ? e.slugFromField : "",
    previewField: typeof e.previewField == "string" ? e.previewField : "",
    fields: t
  };
}
function Qr(n) {
  const e = Ia(n.type), t = {
    key: Fi(String(n.key ?? "campo")),
    label: String(n.label ?? "Campo"),
    type: e,
    autogenerated: Ra(e, n.autogenerated),
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: Oa(n.options),
    documentSchemaId: e === "document" ? Da(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Ba(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = qa(
    $a(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Qr(r)) : [] : delete t.mapFields, t;
}
function qa(n) {
  const e = Ia(n.type), t = {
    type: e,
    autogenerated: Ra(e, n.autogenerated),
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: Oa(n.options),
    documentSchemaId: e === "document" ? Da(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Ba(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = qa(
    $a(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Qr(r)) : [] : delete t.mapFields, t;
}
function Ia(n) {
  return n === "date" || n === "numeric" || n === "id" || n === "textarea" || n === "richtext" || n === "image" || n === "select" || n === "document" || n === "boolean" || n === "array" || n === "map" ? n : "text";
}
function Oa(n) {
  return Array.isArray(n) ? n.map((e) => String(e).trim()).filter(Boolean) : [];
}
function Ra(n, e) {
  return typeof e == "boolean" ? e : n === "id";
}
function $a(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function Fi(n) {
  return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function Tu(n) {
  return n.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function Su(n) {
  return Fi(n);
}
function Cu(n) {
  return String(n).trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || _a;
}
function ku(n) {
  return String(n).trim().replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "") || ka;
}
function Da(n) {
  return String(n).trim().replace(/[^a-zA-Z0-9_-]/g, "").replace(/-+/g, "-");
}
function Ba(n) {
  const e = String(n ?? "").trim();
  return e ? Fi(e) : "";
}
const _u = { class: "mb-3 flex items-center justify-between p-3 lg:mb-0" }, Lu = { class: "text-sm font-black uppercase tracking-wide" }, qu = { class: "px-3" }, Iu = { class: "mt-3 flex-1 min-h-0 space-y-2 overflow-y-auto" }, Ou = { class: "rounded-xl border p-3 transition" }, Ru = { class: "flex items-start justify-between gap-2" }, $u = { class: "material-symbols-outlined text-base leading-none" }, Du = {
  key: 0,
  class: "mt-3 space-y-1 border-t pt-3"
}, Bu = { class: "font-semibold" }, Fu = {
  key: 0,
  class: "rounded-lg border px-2 py-1.5 text-xs"
}, Mu = {
  key: 1,
  class: "rounded-lg border px-2 py-1.5 text-xs"
}, Pu = {
  key: 0,
  class: "space-y-1 rounded-xl border p-3"
}, ju = { class: "font-semibold" }, Uu = {
  key: 1,
  class: "rounded-xl border p-3 transition"
}, Vu = { class: "flex items-start justify-between gap-2" }, zu = { class: "material-symbols-outlined text-base leading-none" }, Hu = {
  key: 0,
  class: "mt-3 space-y-1 border-t pt-3"
}, Ku = { class: "font-semibold" }, Gu = {
  key: 0,
  class: "rounded-lg border px-2 py-1.5 text-xs"
}, Wu = { class: "mt-3 border-t pt-3" }, Zu = { class: "flex items-center gap-2 rounded-xl border p-2" }, Yu = {
  type: "button",
  class: "min-w-0 flex-1 rounded-md px-3 py-2 text-left text-xs"
}, Xu = { class: "truncate" }, Qu = { class: "mx-auto w-full max-w-7xl space-y-6" }, Ju = { class: "text-xl font-black" }, ec = { class: "mt-3" }, ao = "cms-developer-mode", tc = /* @__PURE__ */ Se({
  __name: "AdminLayoutPage",
  setup(n) {
    const e = os(), t = vr(), { basePath: r, loginPath: s, homePath: i } = Di(), a = te([]), l = te(!1), u = te(!0), d = te(!0), p = te(!0), b = te(!1), h = te(!1);
    yr(async () => {
      await w(), N(), typeof window < "u" && (b.value = window.localStorage.getItem(ao) === "true", C(), window.addEventListener("resize", N)), window.addEventListener("cms-schemas-updated", K);
    }), wa(() => {
      window.removeEventListener("cms-schemas-updated", K), typeof window < "u" && window.removeEventListener("resize", N);
    }), Wt(
      () => e.fullPath,
      () => {
        e.path.startsWith(`${r}/content`) && (u.value = !0, w()), e.path.startsWith(`${r}/schemas`) && (d.value = !0, w()), N(), C();
      }
    ), Wt(b, (H) => {
      typeof window < "u" && window.localStorage.setItem(ao, H ? "true" : "false"), C();
    });
    async function w() {
      l.value = !0;
      try {
        a.value = await Bi();
      } finally {
        l.value = !1;
      }
    }
    const E = Te(() => e.path.startsWith(`${r}/content`)), k = Te(() => e.path.startsWith(`${r}/schemas`)), L = Te(() => a.value.filter((H) => H.storageType === "document")), R = Te(() => a.value.filter((H) => H.storageType === "dictionary"));
    function M(H) {
      return e.path.startsWith(H);
    }
    function K() {
      w();
    }
    function J(H) {
      return {
        path: `${r}/content`,
        query: { schema: H }
      };
    }
    function Y(H) {
      return {
        path: `${r}/schemas`,
        query: { schema: H }
      };
    }
    function ae(H) {
      if (!E.value)
        return !1;
      const U = typeof e.query.schema == "string" ? e.query.schema : "";
      return U ? U === H : a.value[0]?.id === H;
    }
    function oe(H) {
      if (!k.value)
        return !1;
      const U = typeof e.query.schema == "string" ? e.query.schema : "";
      return U ? U === H : a.value[0]?.id === H;
    }
    function be() {
      u.value = !u.value;
    }
    function Ae() {
      d.value = !d.value;
    }
    function we() {
      p.value = !p.value;
    }
    function y() {
      b.value = !b.value;
    }
    function F() {
      p.value = !1;
    }
    function N() {
      typeof window > "u" || (h.value = window.innerWidth >= 1024, h.value || (p.value = !1));
    }
    async function C() {
      b.value || (e.path.startsWith(`${r}/schemas`) || e.path.startsWith(`${r}/users`)) && await t.replace(`${r}/content`);
    }
    function f(H) {
      return /^(https?:)?\/\//i.test(H);
    }
    async function A() {
      if (i) {
        if (f(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await t.push(i);
      }
    }
    async function S() {
      await cu(), await t.push(s);
    }
    const j = Te(() => dr.value?.email || "Sin correo"), V = Te(() => {
      try {
        const H = ke().auth.app.options.projectId;
        if (typeof H == "string" && H.trim().length > 0)
          return H;
      } catch {
      }
      return "Panel";
    }), _ = Te(() => {
      if (e.path.startsWith(`${r}/content`)) {
        const H = typeof e.query.schema == "string" ? e.query.schema : "", U = a.value.find((ee) => ee.id === H) ?? a.value[0] ?? null;
        return U ? `Contenido · ${U.title}` : "Contenido";
      }
      return e.path.startsWith(`${r}/schemas`) ? b.value ? "Esquemas" : "Contenido" : e.path.startsWith(`${r}/users`) ? b.value ? "Usuarios" : "Contenido" : "Dashboard";
    }), T = Te(() => ({
      height: "100dvh",
      minHeight: "100dvh",
      overflow: "hidden"
    })), P = Te(() => ({
      height: "100dvh",
      maxHeight: "100dvh",
      overflow: "hidden",
      display: "flex",
      minHeight: "0",
      flexDirection: "column",
      padding: "0",
      transform: p.value ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 200ms ease-in-out"
    })), z = Te(() => ({
      height: "100%",
      overflowY: "auto",
      transition: "padding-left 200ms ease-in-out",
      paddingLeft: p.value && h.value ? "360px" : "0px"
    }));
    return (H, U) => (I(), B("main", {
      class: "overflow-hidden",
      style: Js(T.value)
    }, [
      p.value ? ne("", !0) : (I(), B("button", {
        key: 0,
        type: "button",
        "aria-label": "Abrir sidebar",
        class: "fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg border border-l-0 px-2 py-3 shadow-lg",
        onClick: we
      }, [...U[0] || (U[0] = [
        v("span", { class: "material-symbols-outlined text-lg" }, "left_panel_open", -1)
      ])])),
      p.value ? (I(), B("div", {
        key: 1,
        class: "fixed inset-0 z-30 lg:hidden",
        onClick: F
      })) : ne("", !0),
      v("aside", {
        class: "fixed inset-y-0 left-0 z-40 w-80 border-r shadow-xl",
        style: Js(P.value)
      }, [
        v("div", _u, [
          v("h2", Lu, Q(V.value), 1),
          v("div", { class: "flex items-center gap-2" }, [
            v("button", {
              type: "button",
              "aria-label": "Ir a inicio",
              class: "rounded-md border px-2 py-1",
              onClick: A
            }, [...U[1] || (U[1] = [
              v("span", { class: "material-symbols-outlined text-lg" }, "home", -1)
            ])]),
            v("button", {
              type: "button",
              "aria-label": "Cerrar sidebar",
              class: "rounded-md border px-2 py-1",
              onClick: F
            }, [...U[2] || (U[2] = [
              v("span", { class: "material-symbols-outlined text-lg" }, "left_panel_close", -1)
            ])])
          ])
        ]),
        v("div", qu, [
          v("button", {
            type: "button",
            class: "mb-2 flex w-full items-center justify-between rounded-md border px-3 py-2 text-xs font-semibold",
            onClick: y
          }, [
            U[3] || (U[3] = v("span", null, "Modo desarrollador", -1)),
            v("span", {
              class: bt(["rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", (b.value, " ")])
            }, Q(b.value ? "Activo" : "Oculto"), 3)
          ])
        ]),
        v("div", Iu, [
          v("div", Ou, [
            v("div", Ru, [
              lt(je(Vt), {
                to: `${je(r)}/content`,
                class: "min-w-0 flex-1"
              }, {
                default: Ut(() => [...U[4] || (U[4] = [
                  v("p", { class: "text-sm font-black" }, "Contenido", -1),
                  v("p", { class: "text-xs" }, " Formularios y registros ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              v("button", {
                type: "button",
                "aria-label": "Expandir o contraer contenido",
                class: "rounded-md border px-2 py-1",
                onClick: be
              }, [
                v("span", $u, Q(u.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            u.value ? (I(), B("div", Du, [
              (I(!0), B(Re, null, $e(R.value, (ee) => (I(), Le(je(Vt), {
                key: ee.id,
                to: J(ee.id),
                class: bt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  (ae(ee.id), " ")
                ])
              }, {
                default: Ut(() => [
                  v("p", Bu, Q(ee.title), 1),
                  v("p", {
                    class: bt((ae(ee.id), ""))
                  }, Q(ee.storageType) + " · " + Q(ee.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (I(), B("p", Fu, " Cargando elementos... ")) : R.value.length ? ne("", !0) : (I(), B("p", Mu, " No hay diccionarios configurados. "))
            ])) : ne("", !0)
          ]),
          L.value.length ? (I(), B("div", Pu, [
            U[5] || (U[5] = v("p", { class: "px-1 text-[11px] font-black uppercase tracking-wide" }, "Documentos", -1)),
            (I(!0), B(Re, null, $e(L.value, (ee) => (I(), Le(je(Vt), {
              key: `document-link-${ee.id}`,
              to: J(ee.id),
              class: bt([
                "block rounded-lg border px-2 py-1.5 text-xs transition",
                (ae(ee.id), " ")
              ])
            }, {
              default: Ut(() => [
                v("p", ju, Q(ee.title), 1),
                v("p", {
                  class: bt((ae(ee.id), ""))
                }, " document · " + Q(ee.collectionName), 3)
              ]),
              _: 2
            }, 1032, ["to", "class"]))), 128))
          ])) : ne("", !0),
          b.value ? (I(), B("div", Uu, [
            v("div", Vu, [
              lt(je(Vt), {
                to: `${je(r)}/schemas`,
                class: "min-w-0 flex-1"
              }, {
                default: Ut(() => [...U[6] || (U[6] = [
                  v("p", { class: "text-sm font-black" }, "Esquemas", -1),
                  v("p", { class: "text-xs" }, " Edición de esquemas ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              v("button", {
                type: "button",
                "aria-label": "Expandir o contraer esquemas",
                class: "rounded-md border px-2 py-1",
                onClick: Ae
              }, [
                v("span", zu, Q(d.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            d.value ? (I(), B("div", Hu, [
              (I(!0), B(Re, null, $e(a.value, (ee) => (I(), Le(je(Vt), {
                key: `schema-edit-${ee.id}`,
                to: Y(ee.id),
                class: bt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  (oe(ee.id), " ")
                ])
              }, {
                default: Ut(() => [
                  v("p", Ku, Q(ee.title), 1),
                  v("p", {
                    class: bt((oe(ee.id), ""))
                  }, Q(ee.storageType) + " · " + Q(ee.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (I(), B("p", Gu, " Cargando elementos... ")) : ne("", !0)
            ])) : ne("", !0)
          ])) : ne("", !0),
          b.value ? (I(), Le(je(Vt), {
            key: 2,
            to: `${je(r)}/users`,
            class: bt([
              "block rounded-xl border p-3 transition",
              (M(`${je(r)}/users`), " ")
            ])
          }, {
            default: Ut(() => [
              U[7] || (U[7] = v("p", { class: "text-sm font-black" }, "Usuarios", -1)),
              v("p", {
                class: bt(["text-xs", (M(`${je(r)}/users`), "")])
              }, " Roles y último ingreso ", 2)
            ]),
            _: 1
          }, 8, ["to", "class"])) : ne("", !0)
        ]),
        v("div", Wu, [
          v("div", Zu, [
            v("button", Yu, [
              U[8] || (U[8] = v("p", { class: "font-semibold" }, "Cuenta actual", -1)),
              v("p", Xu, Q(j.value), 1)
            ]),
            v("button", {
              type: "button",
              "aria-label": "Cerrar sesión",
              class: "rounded-md border px-2 py-2",
              onClick: S
            }, [...U[9] || (U[9] = [
              v("span", { class: "material-symbols-outlined text-lg" }, "logout", -1)
            ])])
          ])
        ])
      ], 4),
      v("section", {
        class: "min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8",
        style: Js(z.value)
      }, [
        v("div", Qu, [
          U[10] || (U[10] = v("section", null, [
            v("h1", { class: "text-3xl font-black" }, "Dashboard"),
            v("p", { class: "mt-2 text-sm" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          v("section", null, [
            v("h2", Ju, Q(_.value), 1),
            v("div", ec, [
              lt(je(Yl))
            ])
          ])
        ])
      ], 4)
    ], 4));
  }
}), nc = { class: "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm" }, rc = ["checked", "disabled"], sc = /* @__PURE__ */ Se({
  name: "BooleanFieldInput",
  __name: "BooleanFieldInput",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), B("label", nc, [
      v("input", {
        checked: n.modelValue,
        type: "checkbox",
        disabled: n.disabled,
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.checked))
      }, null, 40, rc),
      s[1] || (s[1] = Ye(" Activo ", -1))
    ]));
  }
}), ic = { class: "space-y-2" }, oc = {
  key: 0,
  class: "space-y-3 rounded-md border p-3"
}, ac = { class: "block text-xs font-semibold uppercase tracking-wide" }, lc = {
  key: 0,
  class: "text-xs"
}, uc = {
  key: 0,
  class: "space-y-2"
}, cc = ["value", "disabled", "onChange"], dc = ["value", "disabled", "onInput"], hc = ["disabled", "onClick"], fc = ["disabled"], pc = {
  key: 1,
  class: "space-y-3 rounded-md border p-3"
}, mc = { class: "flex items-center justify-between" }, gc = { class: "text-xs font-semibold uppercase tracking-wide" }, bc = ["disabled", "onClick"], yc = ["disabled"], vc = {
  key: 2,
  class: "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
}, xc = ["checked", "disabled"], wc = ["value", "placeholder", "disabled"], Ac = ["value", "disabled"], Ec = ["value"], Nc = ["value", "placeholder", "disabled"], Tc = ["value", "step", "placeholder", "disabled"], Sc = ["value", "placeholder", "disabled"], Cc = /* @__PURE__ */ Se({
  name: "CmsNestedValueEditor",
  __name: "CmsNestedValueEditor",
  props: {
    schema: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = Te(
      () => Array.isArray(t.schema.mapFields) ? t.schema.mapFields : []
    ), i = Te(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), a = Te(() => d(t.modelValue)), l = Te(() => Array.isArray(t.modelValue) ? t.modelValue : []), u = Te(() => Object.entries(a.value));
    function d(C) {
      return C && typeof C == "object" && !Array.isArray(C) ? C : {};
    }
    function p(C) {
      return C.type === "array" ? [] : C.type === "map" ? {} : C.type === "boolean" ? !1 : C.type === "date" ? "" : C.type === "numeric" || C.type === "id" ? null : "";
    }
    function b(C, f) {
      r("update:modelValue", {
        ...a.value,
        [C]: f
      });
    }
    function h() {
      r("update:modelValue", [...l.value, p(i.value)]);
    }
    function w(C) {
      const f = [...l.value];
      f.splice(C, 1), r("update:modelValue", f);
    }
    function E(C, f) {
      const A = [...l.value];
      A[C] = f, r("update:modelValue", A);
    }
    function k(C) {
      r("update:modelValue", C);
    }
    function L(C) {
      r("update:modelValue", C);
    }
    function R(C) {
      if (!C.trim()) {
        r("update:modelValue", null);
        return;
      }
      const f = Number(C);
      r("update:modelValue", Number.isFinite(f) ? f : null);
    }
    function M(C) {
      if (typeof C == "number" && Number.isFinite(C))
        return String(C);
      if (typeof C == "string") {
        const f = C.trim();
        if (!f)
          return "";
        const A = Number(f);
        if (Number.isFinite(A))
          return String(A);
      }
      return "";
    }
    function K(C) {
      r("update:modelValue", y(C));
    }
    function J(C) {
      return y(C);
    }
    function Y() {
      const C = a.value;
      let f = 1, A = `campo_${f}`;
      for (; A in C; )
        f += 1, A = `campo_${f}`;
      r("update:modelValue", {
        ...C,
        [A]: ""
      });
    }
    function ae(C) {
      const f = { ...a.value };
      delete f[C], r("update:modelValue", f);
    }
    function oe(C, f) {
      const A = f.trim();
      if (!A || A === C)
        return;
      const S = { ...a.value }, j = S[C];
      delete S[C], S[A] = j, r("update:modelValue", S);
    }
    function be(C, f) {
      const A = { ...a.value };
      A[C] = we(f), r("update:modelValue", A);
    }
    function Ae(C) {
      if (typeof C == "string")
        return C;
      if (C == null)
        return "";
      try {
        return JSON.stringify(C);
      } catch {
        return String(C);
      }
    }
    function we(C) {
      const f = C.trim();
      if (!f)
        return "";
      if (f.startsWith("{") && f.endsWith("}") || f.startsWith("[") && f.endsWith("]"))
        try {
          return JSON.parse(f);
        } catch {
          return C;
        }
      return C;
    }
    function y(C) {
      if (typeof C == "string") {
        const f = C.trim();
        if (!f)
          return "";
        const A = F(f);
        if (A)
          return N(A);
        const S = new Date(f);
        return Number.isNaN(S.getTime()) ? "" : N(S);
      }
      if (C instanceof Date && !Number.isNaN(C.getTime()))
        return N(C);
      if (C && typeof C == "object" && "toDate" in C && typeof C.toDate == "function") {
        const f = C.toDate();
        if (f instanceof Date && !Number.isNaN(f.getTime()))
          return N(f);
      }
      return "";
    }
    function F(C) {
      const f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(C);
      if (!f)
        return null;
      const A = Number(f[1]), S = Number(f[2]), j = Number(f[3]), V = new Date(Date.UTC(A, S - 1, j));
      return V.getUTCFullYear() !== A || V.getUTCMonth() + 1 !== S || V.getUTCDate() !== j ? null : V;
    }
    function N(C) {
      const f = String(C.getUTCFullYear()).padStart(4, "0"), A = String(C.getUTCMonth() + 1).padStart(2, "0"), S = String(C.getUTCDate()).padStart(2, "0");
      return `${f}-${A}-${S}`;
    }
    return (C, f) => {
      const A = Aa("CmsNestedValueEditor", !0);
      return I(), B("div", ic, [
        n.schema.type === "map" ? (I(), B("section", oc, [
          (I(!0), B(Re, null, $e(s.value, (S) => (I(), B("article", {
            key: S.key,
            class: "space-y-1 rounded-md border p-3"
          }, [
            v("label", ac, Q(S.label), 1),
            S.helpText ? (I(), B("p", lc, Q(S.helpText), 1)) : ne("", !0),
            lt(A, {
              schema: S,
              "model-value": a.value[S.key],
              disabled: n.disabled,
              "onUpdate:modelValue": (j) => b(S.key, j)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          s.value.length ? ne("", !0) : (I(), B("div", uc, [
            (I(!0), B(Re, null, $e(u.value, ([S, j]) => (I(), B("article", {
              key: S,
              class: "grid gap-2 rounded-md border p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              v("input", {
                value: S,
                type: "text",
                class: "rounded-md border px-2 py-1 text-xs outline-none",
                disabled: n.disabled,
                onChange: (V) => oe(S, V.target.value)
              }, null, 40, cc),
              v("input", {
                value: Ae(j),
                type: "text",
                class: "rounded-md border px-2 py-1 text-xs outline-none",
                disabled: n.disabled,
                onInput: (V) => be(S, V.target.value)
              }, null, 40, dc),
              v("button", {
                type: "button",
                class: "rounded-md border px-2 py-1 text-xs font-semibold",
                disabled: n.disabled,
                onClick: (V) => ae(S)
              }, " Quitar ", 8, hc)
            ]))), 128)),
            v("button", {
              type: "button",
              class: "rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-60",
              disabled: n.disabled,
              onClick: Y
            }, " Agregar item ", 8, fc),
            f[6] || (f[6] = v("p", { class: "text-xs" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : n.schema.type === "array" ? (I(), B("section", pc, [
          (I(!0), B(Re, null, $e(l.value, (S, j) => (I(), B("article", {
            key: j,
            class: "space-y-2 rounded-md border p-3"
          }, [
            v("div", mc, [
              v("p", gc, "Item " + Q(j + 1), 1),
              v("button", {
                type: "button",
                class: "rounded-md border px-2 py-1 text-xs font-semibold",
                disabled: n.disabled,
                onClick: (V) => w(j)
              }, " Quitar ", 8, bc)
            ]),
            lt(A, {
              schema: i.value,
              "model-value": S,
              disabled: n.disabled,
              "onUpdate:modelValue": (V) => E(j, V)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          v("button", {
            type: "button",
            class: "rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-60",
            disabled: n.disabled,
            onClick: h
          }, " Agregar item ", 8, yc)
        ])) : n.schema.type === "boolean" ? (I(), B("label", vc, [
          v("input", {
            type: "checkbox",
            checked: !!n.modelValue,
            disabled: n.disabled,
            onChange: f[0] || (f[0] = (S) => L(S.target.checked))
          }, null, 40, xc),
          f[7] || (f[7] = Ye(" Activo ", -1))
        ])) : n.schema.type === "textarea" || n.schema.type === "richtext" ? (I(), B("textarea", {
          key: 3,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          rows: "4",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onInput: f[1] || (f[1] = (S) => k(S.target.value))
        }, null, 40, wc)) : n.schema.type === "select" ? (I(), B("select", {
          key: 4,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onChange: f[2] || (f[2] = (S) => k(S.target.value))
        }, [
          f[8] || (f[8] = v("option", { value: "" }, "Selecciona una opción", -1)),
          (I(!0), B(Re, null, $e(n.schema.options || [], (S) => (I(), B("option", {
            key: S,
            value: S
          }, Q(S), 9, Ec))), 128))
        ], 40, Ac)) : n.schema.type === "date" ? (I(), B("input", {
          key: 5,
          value: J(n.modelValue),
          type: "date",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onInput: f[3] || (f[3] = (S) => K(S.target.value))
        }, null, 40, Nc)) : n.schema.type === "numeric" || n.schema.type === "id" ? (I(), B("input", {
          key: 6,
          value: M(n.modelValue),
          type: "number",
          step: n.schema.type === "id" ? "1" : "any",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onInput: f[4] || (f[4] = (S) => R(S.target.value))
        }, null, 40, Tc)) : (I(), B("input", {
          key: 7,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          type: "text",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onInput: f[5] || (f[5] = (S) => k(S.target.value))
        }, null, 40, Sc))
      ]);
    };
  }
}), kc = /* @__PURE__ */ Se({
  name: "ComplexFieldInput",
  __name: "ComplexFieldInput",
  props: {
    field: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), Le(Cc, {
      schema: n.field,
      "model-value": n.modelValue,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["schema", "model-value", "disabled"]));
  }
}), _c = ["value", "placeholder", "disabled"], Lc = /* @__PURE__ */ Se({
  name: "DateFieldInput",
  __name: "DateFieldInput",
  props: {
    modelValue: {},
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), B("input", {
      value: n.modelValue,
      type: "date",
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, _c));
  }
}), qc = { class: "space-y-2" }, Ic = ["value", "disabled"], Oc = ["value"], Rc = {
  key: 0,
  class: "text-xs"
}, $c = /* @__PURE__ */ Se({
  name: "DocumentFieldInput",
  __name: "DocumentFieldInput",
  props: {
    modelValue: {},
    options: { default: () => [] },
    hint: { default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), B("div", qc, [
      v("select", {
        value: n.modelValue,
        disabled: n.disabled,
        class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
      }, [
        s[1] || (s[1] = v("option", { value: "" }, "Selecciona un documento", -1)),
        (I(!0), B(Re, null, $e(n.options, (i) => (I(), B("option", {
          key: i.id,
          value: i.id
        }, Q(i.label), 9, Oc))), 128))
      ], 40, Ic),
      n.hint ? (I(), B("p", Rc, Q(n.hint), 1)) : ne("", !0)
    ]));
  }
}), Dc = { class: "space-y-2" }, Bc = ["disabled"], Fc = {
  key: 0,
  class: "text-xs break-all"
}, Mc = ["src"], Pc = ["disabled"], jc = /* @__PURE__ */ Se({
  name: "ImageFieldInput",
  __name: "ImageFieldInput",
  props: {
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:file", "remove"],
  setup(n, { emit: e }) {
    const t = e;
    function r(s) {
      const i = s.target;
      t("update:file", i.files?.[0] ?? null);
    }
    return (s, i) => (I(), B("div", Dc, [
      v("input", {
        type: "file",
        accept: "image/*",
        disabled: n.disabled,
        class: "block w-full text-sm disabled:opacity-60",
        onChange: r
      }, null, 40, Bc),
      n.modelValue ? (I(), B("p", Fc, " URL actual: " + Q(n.modelValue), 1)) : ne("", !0),
      n.modelValue ? (I(), B("img", {
        key: 1,
        src: n.modelValue,
        alt: "Vista previa",
        class: "max-h-32 rounded-md border object-cover"
      }, null, 8, Mc)) : ne("", !0),
      n.modelValue ? (I(), B("button", {
        key: 2,
        type: "button",
        class: "rounded-md border px-2 py-1 text-xs font-semibold",
        disabled: n.disabled,
        onClick: i[0] || (i[0] = (a) => t("remove"))
      }, " Quitar URL ", 8, Pc)) : ne("", !0)
    ]));
  }
}), Uc = ["value", "step", "min", "placeholder", "disabled"], Vc = /* @__PURE__ */ Se({
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
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), B("input", {
      value: n.modelValue,
      type: "number",
      step: n.step,
      min: n.min ?? void 0,
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, Uc));
  }
});
var Fa = typeof global == "object" && global && global.Object === Object && global, zc = typeof self == "object" && self && self.Object === Object && self, xt = Fa || zc || Function("return this")(), Zt = xt.Symbol, Ma = Object.prototype, Hc = Ma.hasOwnProperty, Kc = Ma.toString, tr = Zt ? Zt.toStringTag : void 0;
function Gc(n) {
  var e = Hc.call(n, tr), t = n[tr];
  try {
    n[tr] = void 0;
    var r = !0;
  } catch {
  }
  var s = Kc.call(n);
  return r && (e ? n[tr] = t : delete n[tr]), s;
}
var Wc = Object.prototype, Zc = Wc.toString;
function Yc(n) {
  return Zc.call(n);
}
var Xc = "[object Null]", Qc = "[object Undefined]", lo = Zt ? Zt.toStringTag : void 0;
function zn(n) {
  return n == null ? n === void 0 ? Qc : Xc : lo && lo in Object(n) ? Gc(n) : Yc(n);
}
function Ot(n) {
  return n != null && typeof n == "object";
}
var hn = Array.isArray;
function Xt(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
function Pa(n) {
  return n;
}
var Jc = "[object AsyncFunction]", ed = "[object Function]", td = "[object GeneratorFunction]", nd = "[object Proxy]";
function Mi(n) {
  if (!Xt(n))
    return !1;
  var e = zn(n);
  return e == ed || e == td || e == Jc || e == nd;
}
var ei = xt["__core-js_shared__"], uo = (function() {
  var n = /[^.]+$/.exec(ei && ei.keys && ei.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function rd(n) {
  return !!uo && uo in n;
}
var sd = Function.prototype, id = sd.toString;
function gn(n) {
  if (n != null) {
    try {
      return id.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var od = /[\\^$.*+?()[\]{}|]/g, ad = /^\[object .+?Constructor\]$/, ld = Function.prototype, ud = Object.prototype, cd = ld.toString, dd = ud.hasOwnProperty, hd = RegExp(
  "^" + cd.call(dd).replace(od, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function fd(n) {
  if (!Xt(n) || rd(n))
    return !1;
  var e = Mi(n) ? hd : ad;
  return e.test(gn(n));
}
function pd(n, e) {
  return n?.[e];
}
function bn(n, e) {
  var t = pd(n, e);
  return fd(t) ? t : void 0;
}
var bi = bn(xt, "WeakMap"), co = Object.create, md = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(e) {
    if (!Xt(e))
      return {};
    if (co)
      return co(e);
    n.prototype = e;
    var t = new n();
    return n.prototype = void 0, t;
  };
})();
function gd(n, e, t) {
  switch (t.length) {
    case 0:
      return n.call(e);
    case 1:
      return n.call(e, t[0]);
    case 2:
      return n.call(e, t[0], t[1]);
    case 3:
      return n.call(e, t[0], t[1], t[2]);
  }
  return n.apply(e, t);
}
function bd(n, e) {
  var t = -1, r = n.length;
  for (e || (e = Array(r)); ++t < r; )
    e[t] = n[t];
  return e;
}
var yd = 800, vd = 16, xd = Date.now;
function wd(n) {
  var e = 0, t = 0;
  return function() {
    var r = xd(), s = vd - (r - t);
    if (t = r, s > 0) {
      if (++e >= yd)
        return arguments[0];
    } else
      e = 0;
    return n.apply(void 0, arguments);
  };
}
function Ad(n) {
  return function() {
    return n;
  };
}
var Jr = (function() {
  try {
    var n = bn(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
})(), Ed = Jr ? function(n, e) {
  return Jr(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ad(e),
    writable: !0
  });
} : Pa, Nd = wd(Ed);
function Td(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r && e(n[t], t, n) !== !1; )
    ;
  return n;
}
var Sd = 9007199254740991, Cd = /^(?:0|[1-9]\d*)$/;
function ja(n, e) {
  var t = typeof n;
  return e = e ?? Sd, !!e && (t == "number" || t != "symbol" && Cd.test(n)) && n > -1 && n % 1 == 0 && n < e;
}
function Pi(n, e, t) {
  e == "__proto__" && Jr ? Jr(n, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : n[e] = t;
}
function xr(n, e) {
  return n === e || n !== n && e !== e;
}
var kd = Object.prototype, _d = kd.hasOwnProperty;
function Ua(n, e, t) {
  var r = n[e];
  (!(_d.call(n, e) && xr(r, t)) || t === void 0 && !(e in n)) && Pi(n, e, t);
}
function Ld(n, e, t, r) {
  var s = !t;
  t || (t = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var l = e[i], u = void 0;
    u === void 0 && (u = n[l]), s ? Pi(t, l, u) : Ua(t, l, u);
  }
  return t;
}
var ho = Math.max;
function qd(n, e, t) {
  return e = ho(e === void 0 ? n.length - 1 : e, 0), function() {
    for (var r = arguments, s = -1, i = ho(r.length - e, 0), a = Array(i); ++s < i; )
      a[s] = r[e + s];
    s = -1;
    for (var l = Array(e + 1); ++s < e; )
      l[s] = r[s];
    return l[e] = t(a), gd(n, this, l);
  };
}
function Id(n, e) {
  return Nd(qd(n, e, Pa), n + "");
}
var Od = 9007199254740991;
function Va(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Od;
}
function ls(n) {
  return n != null && Va(n.length) && !Mi(n);
}
function Rd(n, e, t) {
  if (!Xt(t))
    return !1;
  var r = typeof e;
  return (r == "number" ? ls(t) && ja(e, t.length) : r == "string" && e in t) ? xr(t[e], n) : !1;
}
function $d(n) {
  return Id(function(e, t) {
    var r = -1, s = t.length, i = s > 1 ? t[s - 1] : void 0, a = s > 2 ? t[2] : void 0;
    for (i = n.length > 3 && typeof i == "function" ? (s--, i) : void 0, a && Rd(t[0], t[1], a) && (i = s < 3 ? void 0 : i, s = 1), e = Object(e); ++r < s; ) {
      var l = t[r];
      l && n(e, l, r, i);
    }
    return e;
  });
}
var Dd = Object.prototype;
function ji(n) {
  var e = n && n.constructor, t = typeof e == "function" && e.prototype || Dd;
  return n === t;
}
function Bd(n, e) {
  for (var t = -1, r = Array(n); ++t < n; )
    r[t] = e(t);
  return r;
}
var Fd = "[object Arguments]";
function fo(n) {
  return Ot(n) && zn(n) == Fd;
}
var za = Object.prototype, Md = za.hasOwnProperty, Pd = za.propertyIsEnumerable, yi = fo(/* @__PURE__ */ (function() {
  return arguments;
})()) ? fo : function(n) {
  return Ot(n) && Md.call(n, "callee") && !Pd.call(n, "callee");
};
function jd() {
  return !1;
}
var Ha = typeof exports == "object" && exports && !exports.nodeType && exports, po = Ha && typeof module == "object" && module && !module.nodeType && module, Ud = po && po.exports === Ha, mo = Ud ? xt.Buffer : void 0, Vd = mo ? mo.isBuffer : void 0, hr = Vd || jd, zd = "[object Arguments]", Hd = "[object Array]", Kd = "[object Boolean]", Gd = "[object Date]", Wd = "[object Error]", Zd = "[object Function]", Yd = "[object Map]", Xd = "[object Number]", Qd = "[object Object]", Jd = "[object RegExp]", eh = "[object Set]", th = "[object String]", nh = "[object WeakMap]", rh = "[object ArrayBuffer]", sh = "[object DataView]", ih = "[object Float32Array]", oh = "[object Float64Array]", ah = "[object Int8Array]", lh = "[object Int16Array]", uh = "[object Int32Array]", ch = "[object Uint8Array]", dh = "[object Uint8ClampedArray]", hh = "[object Uint16Array]", fh = "[object Uint32Array]", xe = {};
xe[ih] = xe[oh] = xe[ah] = xe[lh] = xe[uh] = xe[ch] = xe[dh] = xe[hh] = xe[fh] = !0;
xe[zd] = xe[Hd] = xe[rh] = xe[Kd] = xe[sh] = xe[Gd] = xe[Wd] = xe[Zd] = xe[Yd] = xe[Xd] = xe[Qd] = xe[Jd] = xe[eh] = xe[th] = xe[nh] = !1;
function ph(n) {
  return Ot(n) && Va(n.length) && !!xe[zn(n)];
}
function Ui(n) {
  return function(e) {
    return n(e);
  };
}
var Ka = typeof exports == "object" && exports && !exports.nodeType && exports, ur = Ka && typeof module == "object" && module && !module.nodeType && module, mh = ur && ur.exports === Ka, ti = mh && Fa.process, Un = (function() {
  try {
    var n = ur && ur.require && ur.require("util").types;
    return n || ti && ti.binding && ti.binding("util");
  } catch {
  }
})(), go = Un && Un.isTypedArray, Vi = go ? Ui(go) : ph, gh = Object.prototype, bh = gh.hasOwnProperty;
function Ga(n, e) {
  var t = hn(n), r = !t && yi(n), s = !t && !r && hr(n), i = !t && !r && !s && Vi(n), a = t || r || s || i, l = a ? Bd(n.length, String) : [], u = l.length;
  for (var d in n)
    (e || bh.call(n, d)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    ja(d, u))) && l.push(d);
  return l;
}
function Wa(n, e) {
  return function(t) {
    return n(e(t));
  };
}
var yh = Wa(Object.keys, Object), vh = Object.prototype, xh = vh.hasOwnProperty;
function wh(n) {
  if (!ji(n))
    return yh(n);
  var e = [];
  for (var t in Object(n))
    xh.call(n, t) && t != "constructor" && e.push(t);
  return e;
}
function Ah(n) {
  return ls(n) ? Ga(n) : wh(n);
}
function Eh(n) {
  var e = [];
  if (n != null)
    for (var t in Object(n))
      e.push(t);
  return e;
}
var Nh = Object.prototype, Th = Nh.hasOwnProperty;
function Sh(n) {
  if (!Xt(n))
    return Eh(n);
  var e = ji(n), t = [];
  for (var r in n)
    r == "constructor" && (e || !Th.call(n, r)) || t.push(r);
  return t;
}
function Za(n) {
  return ls(n) ? Ga(n, !0) : Sh(n);
}
var fr = bn(Object, "create");
function Ch() {
  this.__data__ = fr ? fr(null) : {}, this.size = 0;
}
function kh(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var _h = "__lodash_hash_undefined__", Lh = Object.prototype, qh = Lh.hasOwnProperty;
function Ih(n) {
  var e = this.__data__;
  if (fr) {
    var t = e[n];
    return t === _h ? void 0 : t;
  }
  return qh.call(e, n) ? e[n] : void 0;
}
var Oh = Object.prototype, Rh = Oh.hasOwnProperty;
function $h(n) {
  var e = this.__data__;
  return fr ? e[n] !== void 0 : Rh.call(e, n);
}
var Dh = "__lodash_hash_undefined__";
function Bh(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = fr && e === void 0 ? Dh : e, this;
}
function fn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
fn.prototype.clear = Ch;
fn.prototype.delete = kh;
fn.prototype.get = Ih;
fn.prototype.has = $h;
fn.prototype.set = Bh;
function Fh() {
  this.__data__ = [], this.size = 0;
}
function us(n, e) {
  for (var t = n.length; t--; )
    if (xr(n[t][0], e))
      return t;
  return -1;
}
var Mh = Array.prototype, Ph = Mh.splice;
function jh(n) {
  var e = this.__data__, t = us(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : Ph.call(e, t, 1), --this.size, !0;
}
function Uh(n) {
  var e = this.__data__, t = us(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function Vh(n) {
  return us(this.__data__, n) > -1;
}
function zh(n, e) {
  var t = this.__data__, r = us(t, n);
  return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
}
function $t(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
$t.prototype.clear = Fh;
$t.prototype.delete = jh;
$t.prototype.get = Uh;
$t.prototype.has = Vh;
$t.prototype.set = zh;
var pr = bn(xt, "Map");
function Hh() {
  this.size = 0, this.__data__ = {
    hash: new fn(),
    map: new (pr || $t)(),
    string: new fn()
  };
}
function Kh(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function cs(n, e) {
  var t = n.__data__;
  return Kh(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Gh(n) {
  var e = cs(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function Wh(n) {
  return cs(this, n).get(n);
}
function Zh(n) {
  return cs(this, n).has(n);
}
function Yh(n, e) {
  var t = cs(this, n), r = t.size;
  return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
}
function yn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
yn.prototype.clear = Hh;
yn.prototype.delete = Gh;
yn.prototype.get = Wh;
yn.prototype.has = Zh;
yn.prototype.set = Yh;
function Xh(n, e) {
  for (var t = -1, r = e.length, s = n.length; ++t < r; )
    n[s + t] = e[t];
  return n;
}
var Ya = Wa(Object.getPrototypeOf, Object), Qh = "[object Object]", Jh = Function.prototype, ef = Object.prototype, Xa = Jh.toString, tf = ef.hasOwnProperty, nf = Xa.call(Object);
function rf(n) {
  if (!Ot(n) || zn(n) != Qh)
    return !1;
  var e = Ya(n);
  if (e === null)
    return !0;
  var t = tf.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Xa.call(t) == nf;
}
function sf() {
  this.__data__ = new $t(), this.size = 0;
}
function of(n) {
  var e = this.__data__, t = e.delete(n);
  return this.size = e.size, t;
}
function af(n) {
  return this.__data__.get(n);
}
function lf(n) {
  return this.__data__.has(n);
}
var uf = 200;
function cf(n, e) {
  var t = this.__data__;
  if (t instanceof $t) {
    var r = t.__data__;
    if (!pr || r.length < uf - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new yn(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function yt(n) {
  var e = this.__data__ = new $t(n);
  this.size = e.size;
}
yt.prototype.clear = sf;
yt.prototype.delete = of;
yt.prototype.get = af;
yt.prototype.has = lf;
yt.prototype.set = cf;
var Qa = typeof exports == "object" && exports && !exports.nodeType && exports, bo = Qa && typeof module == "object" && module && !module.nodeType && module, df = bo && bo.exports === Qa, yo = df ? xt.Buffer : void 0, vo = yo ? yo.allocUnsafe : void 0;
function Ja(n, e) {
  if (e)
    return n.slice();
  var t = n.length, r = vo ? vo(t) : new n.constructor(t);
  return n.copy(r), r;
}
function hf(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, s = 0, i = []; ++t < r; ) {
    var a = n[t];
    e(a, t, n) && (i[s++] = a);
  }
  return i;
}
function ff() {
  return [];
}
var pf = Object.prototype, mf = pf.propertyIsEnumerable, xo = Object.getOwnPropertySymbols, gf = xo ? function(n) {
  return n == null ? [] : (n = Object(n), hf(xo(n), function(e) {
    return mf.call(n, e);
  }));
} : ff;
function bf(n, e, t) {
  var r = e(n);
  return hn(n) ? r : Xh(r, t(n));
}
function vi(n) {
  return bf(n, Ah, gf);
}
var xi = bn(xt, "DataView"), wi = bn(xt, "Promise"), Ai = bn(xt, "Set"), wo = "[object Map]", yf = "[object Object]", Ao = "[object Promise]", Eo = "[object Set]", No = "[object WeakMap]", To = "[object DataView]", vf = gn(xi), xf = gn(pr), wf = gn(wi), Af = gn(Ai), Ef = gn(bi), it = zn;
(xi && it(new xi(new ArrayBuffer(1))) != To || pr && it(new pr()) != wo || wi && it(wi.resolve()) != Ao || Ai && it(new Ai()) != Eo || bi && it(new bi()) != No) && (it = function(n) {
  var e = zn(n), t = e == yf ? n.constructor : void 0, r = t ? gn(t) : "";
  if (r)
    switch (r) {
      case vf:
        return To;
      case xf:
        return wo;
      case wf:
        return Ao;
      case Af:
        return Eo;
      case Ef:
        return No;
    }
  return e;
});
var Nf = Object.prototype, Tf = Nf.hasOwnProperty;
function Sf(n) {
  var e = n.length, t = new n.constructor(e);
  return e && typeof n[0] == "string" && Tf.call(n, "index") && (t.index = n.index, t.input = n.input), t;
}
var es = xt.Uint8Array;
function zi(n) {
  var e = new n.constructor(n.byteLength);
  return new es(e).set(new es(n)), e;
}
function Cf(n, e) {
  var t = zi(n.buffer);
  return new n.constructor(t, n.byteOffset, n.byteLength);
}
var kf = /\w*$/;
function _f(n) {
  var e = new n.constructor(n.source, kf.exec(n));
  return e.lastIndex = n.lastIndex, e;
}
var So = Zt ? Zt.prototype : void 0, Co = So ? So.valueOf : void 0;
function Lf(n) {
  return Co ? Object(Co.call(n)) : {};
}
function el(n, e) {
  var t = e ? zi(n.buffer) : n.buffer;
  return new n.constructor(t, n.byteOffset, n.length);
}
var qf = "[object Boolean]", If = "[object Date]", Of = "[object Map]", Rf = "[object Number]", $f = "[object RegExp]", Df = "[object Set]", Bf = "[object String]", Ff = "[object Symbol]", Mf = "[object ArrayBuffer]", Pf = "[object DataView]", jf = "[object Float32Array]", Uf = "[object Float64Array]", Vf = "[object Int8Array]", zf = "[object Int16Array]", Hf = "[object Int32Array]", Kf = "[object Uint8Array]", Gf = "[object Uint8ClampedArray]", Wf = "[object Uint16Array]", Zf = "[object Uint32Array]";
function Yf(n, e, t) {
  var r = n.constructor;
  switch (e) {
    case Mf:
      return zi(n);
    case qf:
    case If:
      return new r(+n);
    case Pf:
      return Cf(n);
    case jf:
    case Uf:
    case Vf:
    case zf:
    case Hf:
    case Kf:
    case Gf:
    case Wf:
    case Zf:
      return el(n, t);
    case Of:
      return new r();
    case Rf:
    case Bf:
      return new r(n);
    case $f:
      return _f(n);
    case Df:
      return new r();
    case Ff:
      return Lf(n);
  }
}
function tl(n) {
  return typeof n.constructor == "function" && !ji(n) ? md(Ya(n)) : {};
}
var Xf = "[object Map]";
function Qf(n) {
  return Ot(n) && it(n) == Xf;
}
var ko = Un && Un.isMap, Jf = ko ? Ui(ko) : Qf, ep = "[object Set]";
function tp(n) {
  return Ot(n) && it(n) == ep;
}
var _o = Un && Un.isSet, np = _o ? Ui(_o) : tp, rp = 1, nl = "[object Arguments]", sp = "[object Array]", ip = "[object Boolean]", op = "[object Date]", ap = "[object Error]", rl = "[object Function]", lp = "[object GeneratorFunction]", up = "[object Map]", cp = "[object Number]", sl = "[object Object]", dp = "[object RegExp]", hp = "[object Set]", fp = "[object String]", pp = "[object Symbol]", mp = "[object WeakMap]", gp = "[object ArrayBuffer]", bp = "[object DataView]", yp = "[object Float32Array]", vp = "[object Float64Array]", xp = "[object Int8Array]", wp = "[object Int16Array]", Ap = "[object Int32Array]", Ep = "[object Uint8Array]", Np = "[object Uint8ClampedArray]", Tp = "[object Uint16Array]", Sp = "[object Uint32Array]", ve = {};
ve[nl] = ve[sp] = ve[gp] = ve[bp] = ve[ip] = ve[op] = ve[yp] = ve[vp] = ve[xp] = ve[wp] = ve[Ap] = ve[up] = ve[cp] = ve[sl] = ve[dp] = ve[hp] = ve[fp] = ve[pp] = ve[Ep] = ve[Np] = ve[Tp] = ve[Sp] = !0;
ve[ap] = ve[rl] = ve[mp] = !1;
function Yr(n, e, t, r, s, i) {
  var a, l = e & rp;
  if (a !== void 0)
    return a;
  if (!Xt(n))
    return n;
  var u = hn(n);
  if (u)
    a = Sf(n);
  else {
    var d = it(n), p = d == rl || d == lp;
    if (hr(n))
      return Ja(n, l);
    if (d == sl || d == nl || p && !s)
      a = p ? {} : tl(n);
    else {
      if (!ve[d])
        return s ? n : {};
      a = Yf(n, d, l);
    }
  }
  i || (i = new yt());
  var b = i.get(n);
  if (b)
    return b;
  i.set(n, a), np(n) ? n.forEach(function(E) {
    a.add(Yr(E, e, t, E, n, i));
  }) : Jf(n) && n.forEach(function(E, k) {
    a.set(k, Yr(E, e, t, k, n, i));
  });
  var h = vi, w = u ? void 0 : h(n);
  return Td(w || n, function(E, k) {
    w && (k = E, E = n[k]), Ua(a, k, Yr(E, e, t, k, n, i));
  }), a;
}
var Cp = 1, kp = 4;
function Bn(n) {
  return Yr(n, Cp | kp);
}
var _p = "__lodash_hash_undefined__";
function Lp(n) {
  return this.__data__.set(n, _p), this;
}
function qp(n) {
  return this.__data__.has(n);
}
function ts(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new yn(); ++e < t; )
    this.add(n[e]);
}
ts.prototype.add = ts.prototype.push = Lp;
ts.prototype.has = qp;
function Ip(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (e(n[t], t, n))
      return !0;
  return !1;
}
function Op(n, e) {
  return n.has(e);
}
var Rp = 1, $p = 2;
function il(n, e, t, r, s, i) {
  var a = t & Rp, l = n.length, u = e.length;
  if (l != u && !(a && u > l))
    return !1;
  var d = i.get(n), p = i.get(e);
  if (d && p)
    return d == e && p == n;
  var b = -1, h = !0, w = t & $p ? new ts() : void 0;
  for (i.set(n, e), i.set(e, n); ++b < l; ) {
    var E = n[b], k = e[b];
    if (r)
      var L = a ? r(k, E, b, e, n, i) : r(E, k, b, n, e, i);
    if (L !== void 0) {
      if (L)
        continue;
      h = !1;
      break;
    }
    if (w) {
      if (!Ip(e, function(R, M) {
        if (!Op(w, M) && (E === R || s(E, R, t, r, i)))
          return w.push(M);
      })) {
        h = !1;
        break;
      }
    } else if (!(E === k || s(E, k, t, r, i))) {
      h = !1;
      break;
    }
  }
  return i.delete(n), i.delete(e), h;
}
function Dp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r, s) {
    t[++e] = [s, r];
  }), t;
}
function Bp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var Fp = 1, Mp = 2, Pp = "[object Boolean]", jp = "[object Date]", Up = "[object Error]", Vp = "[object Map]", zp = "[object Number]", Hp = "[object RegExp]", Kp = "[object Set]", Gp = "[object String]", Wp = "[object Symbol]", Zp = "[object ArrayBuffer]", Yp = "[object DataView]", Lo = Zt ? Zt.prototype : void 0, ni = Lo ? Lo.valueOf : void 0;
function Xp(n, e, t, r, s, i, a) {
  switch (t) {
    case Yp:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case Zp:
      return !(n.byteLength != e.byteLength || !i(new es(n), new es(e)));
    case Pp:
    case jp:
    case zp:
      return xr(+n, +e);
    case Up:
      return n.name == e.name && n.message == e.message;
    case Hp:
    case Gp:
      return n == e + "";
    case Vp:
      var l = Dp;
    case Kp:
      var u = r & Fp;
      if (l || (l = Bp), n.size != e.size && !u)
        return !1;
      var d = a.get(n);
      if (d)
        return d == e;
      r |= Mp, a.set(n, e);
      var p = il(l(n), l(e), r, s, i, a);
      return a.delete(n), p;
    case Wp:
      if (ni)
        return ni.call(n) == ni.call(e);
  }
  return !1;
}
var Qp = 1, Jp = Object.prototype, em = Jp.hasOwnProperty;
function tm(n, e, t, r, s, i) {
  var a = t & Qp, l = vi(n), u = l.length, d = vi(e), p = d.length;
  if (u != p && !a)
    return !1;
  for (var b = u; b--; ) {
    var h = l[b];
    if (!(a ? h in e : em.call(e, h)))
      return !1;
  }
  var w = i.get(n), E = i.get(e);
  if (w && E)
    return w == e && E == n;
  var k = !0;
  i.set(n, e), i.set(e, n);
  for (var L = a; ++b < u; ) {
    h = l[b];
    var R = n[h], M = e[h];
    if (r)
      var K = a ? r(M, R, h, e, n, i) : r(R, M, h, n, e, i);
    if (!(K === void 0 ? R === M || s(R, M, t, r, i) : K)) {
      k = !1;
      break;
    }
    L || (L = h == "constructor");
  }
  if (k && !L) {
    var J = n.constructor, Y = e.constructor;
    J != Y && "constructor" in n && "constructor" in e && !(typeof J == "function" && J instanceof J && typeof Y == "function" && Y instanceof Y) && (k = !1);
  }
  return i.delete(n), i.delete(e), k;
}
var nm = 1, qo = "[object Arguments]", Io = "[object Array]", Fr = "[object Object]", rm = Object.prototype, Oo = rm.hasOwnProperty;
function sm(n, e, t, r, s, i) {
  var a = hn(n), l = hn(e), u = a ? Io : it(n), d = l ? Io : it(e);
  u = u == qo ? Fr : u, d = d == qo ? Fr : d;
  var p = u == Fr, b = d == Fr, h = u == d;
  if (h && hr(n)) {
    if (!hr(e))
      return !1;
    a = !0, p = !1;
  }
  if (h && !p)
    return i || (i = new yt()), a || Vi(n) ? il(n, e, t, r, s, i) : Xp(n, e, u, t, r, s, i);
  if (!(t & nm)) {
    var w = p && Oo.call(n, "__wrapped__"), E = b && Oo.call(e, "__wrapped__");
    if (w || E) {
      var k = w ? n.value() : n, L = E ? e.value() : e;
      return i || (i = new yt()), s(k, L, t, r, i);
    }
  }
  return h ? (i || (i = new yt()), tm(n, e, t, r, s, i)) : !1;
}
function ol(n, e, t, r, s) {
  return n === e ? !0 : n == null || e == null || !Ot(n) && !Ot(e) ? n !== n && e !== e : sm(n, e, t, r, ol, s);
}
function im(n) {
  return function(e, t, r) {
    for (var s = -1, i = Object(e), a = r(e), l = a.length; l--; ) {
      var u = a[++s];
      if (t(i[u], u, i) === !1)
        break;
    }
    return e;
  };
}
var om = im();
function Ei(n, e, t) {
  (t !== void 0 && !xr(n[e], t) || t === void 0 && !(e in n)) && Pi(n, e, t);
}
function am(n) {
  return Ot(n) && ls(n);
}
function Ni(n, e) {
  if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
    return n[e];
}
function lm(n) {
  return Ld(n, Za(n));
}
function um(n, e, t, r, s, i, a) {
  var l = Ni(n, t), u = Ni(e, t), d = a.get(u);
  if (d) {
    Ei(n, t, d);
    return;
  }
  var p = i ? i(l, u, t + "", n, e, a) : void 0, b = p === void 0;
  if (b) {
    var h = hn(u), w = !h && hr(u), E = !h && !w && Vi(u);
    p = u, h || w || E ? hn(l) ? p = l : am(l) ? p = bd(l) : w ? (b = !1, p = Ja(u, !0)) : E ? (b = !1, p = el(u, !0)) : p = [] : rf(u) || yi(u) ? (p = l, yi(l) ? p = lm(l) : (!Xt(l) || Mi(l)) && (p = tl(u))) : b = !1;
  }
  b && (a.set(u, p), s(p, u, r, i, a), a.delete(u)), Ei(n, t, p);
}
function al(n, e, t, r, s) {
  n !== e && om(e, function(i, a) {
    if (s || (s = new yt()), Xt(i))
      um(n, e, a, t, al, r, s);
    else {
      var l = r ? r(Ni(n, a), i, a + "", n, e, s) : void 0;
      l === void 0 && (l = i), Ei(n, a, l);
    }
  }, Za);
}
function Hi(n, e) {
  return ol(n, e);
}
var Kt = $d(function(n, e, t) {
  al(n, e, t);
}), Z = /* @__PURE__ */ ((n) => (n[n.TYPE = 3] = "TYPE", n[n.LEVEL = 12] = "LEVEL", n[n.ATTRIBUTE = 13] = "ATTRIBUTE", n[n.BLOT = 14] = "BLOT", n[n.INLINE = 7] = "INLINE", n[n.BLOCK = 11] = "BLOCK", n[n.BLOCK_BLOT = 10] = "BLOCK_BLOT", n[n.INLINE_BLOT = 6] = "INLINE_BLOT", n[n.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", n[n.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", n[n.ANY = 15] = "ANY", n))(Z || {});
class vt {
  constructor(e, t, r = {}) {
    this.attrName = e, this.keyName = t;
    const s = Z.TYPE & Z.ATTRIBUTE;
    this.scope = r.scope != null ? (
      // Ignore type bits, force attribute bit
      r.scope & Z.LEVEL | s
    ) : Z.ATTRIBUTE, r.whitelist != null && (this.whitelist = r.whitelist);
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
class Fn extends Error {
  constructor(e) {
    e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
  }
}
const ll = class Ti {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(e, t = !1) {
    if (e == null)
      return null;
    if (this.blots.has(e))
      return this.blots.get(e) || null;
    if (t) {
      let r = null;
      try {
        r = e.parentNode;
      } catch {
        return null;
      }
      return this.find(r, t);
    }
    return null;
  }
  create(e, t, r) {
    const s = this.query(t);
    if (s == null)
      throw new Fn(`Unable to create ${t} blot`);
    const i = s, a = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : i.create(r)
    ), l = new i(e, a, r);
    return Ti.blots.set(l.domNode, l), l;
  }
  find(e, t = !1) {
    return Ti.find(e, t);
  }
  query(e, t = Z.ANY) {
    let r;
    return typeof e == "string" ? r = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? r = this.types.text : typeof e == "number" ? e & Z.LEVEL & Z.BLOCK ? r = this.types.block : e & Z.LEVEL & Z.INLINE && (r = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((s) => (r = this.classes[s], !!r)), r = r || this.tags[e.tagName]), r == null ? null : "scope" in r && t & Z.LEVEL & r.scope && t & Z.TYPE & r.scope ? r : null;
  }
  register(...e) {
    return e.map((t) => {
      const r = "blotName" in t, s = "attrName" in t;
      if (!r && !s)
        throw new Fn("Invalid definition");
      if (r && t.blotName === "abstract")
        throw new Fn("Cannot register abstract class");
      const i = r ? t.blotName : s ? t.attrName : void 0;
      return this.types[i] = t, s ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : r && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((a) => a.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((a) => {
        (this.tags[a] == null || t.className == null) && (this.tags[a] = t);
      }))), t;
    });
  }
};
ll.blots = /* @__PURE__ */ new WeakMap();
let Vn = ll;
function Ro(n, e) {
  return (n.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class cm extends vt {
  static keys(e) {
    return (e.getAttribute("class") || "").split(/\s+/).map((t) => t.split("-").slice(0, -1).join("-"));
  }
  add(e, t) {
    return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
  }
  remove(e) {
    Ro(e, this.keyName).forEach((t) => {
      e.classList.remove(t);
    }), e.classList.length === 0 && e.removeAttribute("class");
  }
  value(e) {
    const t = (Ro(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(e, t) ? t : "";
  }
}
const dt = cm;
function ri(n) {
  const e = n.split("-"), t = e.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  return e[0] + t;
}
class dm extends vt {
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
const Qt = dm;
class hm {
  constructor(e) {
    this.attributes = {}, this.domNode = e, this.build();
  }
  attribute(e, t) {
    t ? e.add(this.domNode, t) && (e.value(this.domNode) != null ? this.attributes[e.attrName] = e : delete this.attributes[e.attrName]) : (e.remove(this.domNode), delete this.attributes[e.attrName]);
  }
  build() {
    this.attributes = {};
    const e = Vn.find(this.domNode);
    if (e == null)
      return;
    const t = vt.keys(this.domNode), r = dt.keys(this.domNode), s = Qt.keys(this.domNode);
    t.concat(r).concat(s).forEach((i) => {
      const a = e.scroll.query(i, Z.ATTRIBUTE);
      a instanceof vt && (this.attributes[a.attrName] = a);
    });
  }
  copy(e) {
    Object.keys(this.attributes).forEach((t) => {
      const r = this.attributes[t].value(this.domNode);
      e.format(t, r);
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
const ds = hm, ul = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, Vn.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new Fn("Blot definition missing tagName");
    let t, r;
    return Array.isArray(this.tagName) ? (typeof e == "string" ? (r = e.toUpperCase(), parseInt(r, 10).toString() === r && (r = parseInt(r, 10))) : typeof e == "number" && (r = e), typeof r == "number" ? t = document.createElement(this.tagName[r - 1]) : r && this.tagName.indexOf(r) > -1 ? t = document.createElement(r) : t = document.createElement(this.tagName[0])) : t = document.createElement(this.tagName), this.className && t.classList.add(this.className), t;
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
    this.parent != null && this.parent.removeChild(this), Vn.blots.delete(this.domNode);
  }
  deleteAt(e, t) {
    this.isolate(e, t).remove();
  }
  formatAt(e, t, r, s) {
    const i = this.isolate(e, t);
    if (this.scroll.query(r, Z.BLOT) != null && s)
      i.wrap(r, s);
    else if (this.scroll.query(r, Z.ATTRIBUTE) != null) {
      const a = this.scroll.create(this.statics.scope);
      i.wrap(a), a.format(r, s);
    }
  }
  insertAt(e, t, r) {
    const s = r == null ? this.scroll.create("text", t) : this.scroll.create(t, r), i = this.split(e);
    this.parent.insertBefore(s, i || void 0);
  }
  isolate(e, t) {
    const r = this.split(e);
    if (r == null)
      throw new Error("Attempt to isolate at end");
    return r.split(t), r;
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
    const r = typeof e == "string" ? this.scroll.create(e, t) : e;
    return this.parent != null && (this.parent.insertBefore(r, this.next || void 0), this.remove()), r;
  }
  split(e, t) {
    return e === 0 ? this : this.next;
  }
  update(e, t) {
  }
  wrap(e, t) {
    const r = typeof e == "string" ? this.scroll.create(e, t) : e;
    if (this.parent != null && this.parent.insertBefore(r, this.next || void 0), typeof r.appendChild != "function")
      throw new Fn(`Cannot wrap ${e}`);
    return r.appendChild(this), r;
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
    let r = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
    return e > 0 && (r += 1), [this.parent.domNode, r];
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
dl.scope = Z.INLINE_BLOT;
let fm = dl;
const Ue = fm;
class pm {
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
    let r = t();
    for (; r && e > 0; )
      e -= 1, r = t();
    return r;
  }
  contains(e) {
    const t = this.iterator();
    let r = t();
    for (; r; ) {
      if (r === e)
        return !0;
      r = t();
    }
    return !1;
  }
  indexOf(e) {
    const t = this.iterator();
    let r = t(), s = 0;
    for (; r; ) {
      if (r === e)
        return s;
      s += 1, r = t();
    }
    return -1;
  }
  insertBefore(e, t) {
    e != null && (this.remove(e), e.next = t, t != null ? (e.prev = t.prev, t.prev != null && (t.prev.next = e), t.prev = e, t === this.head && (this.head = e)) : this.tail != null ? (this.tail.next = e, e.prev = this.tail, this.tail = e) : (e.prev = null, this.head = this.tail = e), this.length += 1);
  }
  offset(e) {
    let t = 0, r = this.head;
    for (; r != null; ) {
      if (r === e)
        return t;
      t += r.length(), r = r.next;
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
    const r = this.iterator();
    let s = r();
    for (; s; ) {
      const i = s.length();
      if (e < i || t && e === i && (s.next == null || s.next.length() !== 0))
        return [s, e];
      e -= i, s = r();
    }
    return [null, 0];
  }
  forEach(e) {
    const t = this.iterator();
    let r = t();
    for (; r; )
      e(r), r = t();
  }
  forEachAt(e, t, r) {
    if (t <= 0)
      return;
    const [s, i] = this.find(e);
    let a = e - i;
    const l = this.iterator(s);
    let u = l();
    for (; u && a < e + t; ) {
      const d = u.length();
      e > a ? r(
        u,
        e - a,
        Math.min(t, a + d - e)
      ) : r(u, 0, Math.min(d, e + t - a)), a += d, u = l();
    }
  }
  map(e) {
    return this.reduce((t, r) => (t.push(e(r)), t), []);
  }
  reduce(e, t) {
    const r = this.iterator();
    let s = r();
    for (; s; )
      t = e(t, s), s = r();
    return t;
  }
}
function $o(n, e) {
  const t = e.find(n);
  if (t)
    return t;
  try {
    return e.create(n);
  } catch {
    const r = e.create(Z.INLINE);
    return Array.from(n.childNodes).forEach((s) => {
      r.domNode.appendChild(s);
    }), n.parentNode && n.parentNode.replaceChild(r.domNode, n), r.attach(), r;
  }
}
const hl = class jt extends cl {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = e, jt.uiClass && this.uiNode.classList.add(jt.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new pm(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = $o(e, this.scroll);
        this.insertBefore(t, this.children.head || void 0);
      } catch (t) {
        if (t instanceof Fn)
          return;
        throw t;
      }
    });
  }
  deleteAt(e, t) {
    if (e === 0 && t === this.length())
      return this.remove();
    this.children.forEachAt(e, t, (r, s, i) => {
      r.deleteAt(s, i);
    });
  }
  descendant(e, t = 0) {
    const [r, s] = this.children.find(t);
    return e.blotName == null && e(r) || e.blotName != null && r instanceof e ? [r, s] : r instanceof jt ? r.descendant(e, s) : [null, -1];
  }
  descendants(e, t = 0, r = Number.MAX_VALUE) {
    let s = [], i = r;
    return this.children.forEachAt(
      t,
      r,
      (a, l, u) => {
        (e.blotName == null && e(a) || e.blotName != null && a instanceof e) && s.push(a), a instanceof jt && (s = s.concat(
          a.descendants(e, l, i)
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
        (r) => t instanceof r
      ) || (t.statics.scope === Z.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof jt ? t.unwrap() : t.remove());
    });
  }
  formatAt(e, t, r, s) {
    this.children.forEachAt(e, t, (i, a, l) => {
      i.formatAt(a, l, r, s);
    });
  }
  insertAt(e, t, r) {
    const [s, i] = this.children.find(e);
    if (s)
      s.insertAt(i, t, r);
    else {
      const a = r == null ? this.scroll.create("text", t) : this.scroll.create(t, r);
      this.appendChild(a);
    }
  }
  insertBefore(e, t) {
    e.parent != null && e.parent.children.remove(e);
    let r = null;
    this.children.insertBefore(e, t || null), e.parent = this, t != null && (r = t.domNode), (this.domNode.parentNode !== e.domNode || this.domNode.nextSibling !== r) && this.domNode.insertBefore(e.domNode, r), e.attach();
  }
  length() {
    return this.children.reduce((e, t) => e + t.length(), 0);
  }
  moveChildren(e, t) {
    this.children.forEach((r) => {
      e.insertBefore(r, t);
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
    const [r, s] = this.children.find(e, t), i = [[this, e]];
    return r instanceof jt ? i.concat(r.path(s, t)) : (r != null && i.push([r, s]), i);
  }
  removeChild(e) {
    this.children.remove(e);
  }
  replaceWith(e, t) {
    const r = typeof e == "string" ? this.scroll.create(e, t) : e;
    return r instanceof jt && this.moveChildren(r), super.replaceWith(r);
  }
  split(e, t = !1) {
    if (!t) {
      if (e === 0)
        return this;
      if (e === this.length())
        return this.next;
    }
    const r = this.clone();
    return this.parent && this.parent.insertBefore(r, this.next || void 0), this.children.forEachAt(e, this.length(), (s, i, a) => {
      const l = s.split(i, t);
      l != null && r.appendChild(l);
    }), r;
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
    const r = [], s = [];
    e.forEach((i) => {
      i.target === this.domNode && i.type === "childList" && (r.push(...i.addedNodes), s.push(...i.removedNodes));
    }), s.forEach((i) => {
      if (i.parentNode != null && // @ts-expect-error Fix me later
      i.tagName !== "IFRAME" && document.body.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const a = this.scroll.find(i);
      a != null && (a.domNode.parentNode == null || a.domNode.parentNode === this.domNode) && a.detach();
    }), r.filter((i) => i.parentNode === this.domNode && i !== this.uiNode).sort((i, a) => i === a ? 0 : i.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((i) => {
      let a = null;
      i.nextSibling != null && (a = this.scroll.find(i.nextSibling));
      const l = $o(i, this.scroll);
      (l.next !== a || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, a || void 0));
    }), this.enforceAllowedChildren();
  }
};
hl.uiClass = "";
let mm = hl;
const ut = mm;
function gm(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length)
    return !1;
  for (const t in n)
    if (n[t] !== e[t])
      return !1;
  return !0;
}
const qn = class In extends ut {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(In.blotName);
    if (!(r != null && e.tagName === r.tagName)) {
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
      this.children.forEach((r) => {
        r instanceof In || (r = r.wrap(In.blotName, !0)), this.attributes.copy(r);
      }), this.unwrap();
    else {
      const r = this.scroll.query(e, Z.INLINE);
      if (r == null)
        return;
      r instanceof vt ? this.attributes.attribute(r, t) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t);
    }
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, r, s) {
    this.formats()[r] != null || this.scroll.query(r, Z.ATTRIBUTE) ? this.isolate(e, t).format(r, s) : super.formatAt(e, t, r, s);
  }
  optimize(e) {
    super.optimize(e);
    const t = this.formats();
    if (Object.keys(t).length === 0)
      return this.unwrap();
    const r = this.next;
    r instanceof In && r.prev === this && gm(t, r.formats()) && (r.moveChildren(this), r.remove());
  }
  replaceWith(e, t) {
    const r = super.replaceWith(e, t);
    return this.attributes.copy(r), r;
  }
  update(e, t) {
    super.update(e, t), e.some(
      (r) => r.target === this.domNode && r.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(e, t) {
    const r = super.wrap(e, t);
    return r instanceof In && this.attributes.move(r), r;
  }
};
qn.allowedChildren = [qn, Ue], qn.blotName = "inline", qn.scope = Z.INLINE_BLOT, qn.tagName = "SPAN";
let bm = qn;
const Ki = bm, On = class Si extends ut {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(Si.blotName);
    if (!(r != null && e.tagName === r.tagName)) {
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
    const r = this.scroll.query(e, Z.BLOCK);
    r != null && (r instanceof vt ? this.attributes.attribute(r, t) : e === this.statics.blotName && !t ? this.replaceWith(Si.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, r, s) {
    this.scroll.query(r, Z.BLOCK) != null ? this.format(r, s) : super.formatAt(e, t, r, s);
  }
  insertAt(e, t, r) {
    if (r == null || this.scroll.query(t, Z.INLINE) != null)
      super.insertAt(e, t, r);
    else {
      const s = this.split(e);
      if (s != null) {
        const i = this.scroll.create(t, r);
        s.parent.insertBefore(i, s);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(e, t) {
    const r = super.replaceWith(e, t);
    return this.attributes.copy(r), r;
  }
  update(e, t) {
    super.update(e, t), e.some(
      (r) => r.target === this.domNode && r.type === "attributes"
    ) && this.attributes.build();
  }
};
On.blotName = "block", On.scope = Z.BLOCK_BLOT, On.tagName = "P", On.allowedChildren = [
  Ki,
  On,
  Ue
];
let ym = On;
const mr = ym, Ci = class extends ut {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(e, t) {
    super.deleteAt(e, t), this.enforceAllowedChildren();
  }
  formatAt(e, t, r, s) {
    super.formatAt(e, t, r, s), this.enforceAllowedChildren();
  }
  insertAt(e, t, r) {
    super.insertAt(e, t, r), this.enforceAllowedChildren();
  }
  optimize(e) {
    super.optimize(e), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
Ci.blotName = "container", Ci.scope = Z.BLOCK_BLOT;
let vm = Ci;
const hs = vm;
class xm extends Ue {
  static formats(e, t) {
  }
  format(e, t) {
    super.formatAt(0, this.length(), e, t);
  }
  formatAt(e, t, r, s) {
    e === 0 && t === this.length() ? this.format(r, s) : super.formatAt(e, t, r, s);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const Xe = xm, wm = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, Am = 100, Rn = class extends ut {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((r) => {
      this.update(r);
    }), this.observer.observe(this.domNode, wm), this.attach();
  }
  create(e, t) {
    return this.registry.create(this, e, t);
  }
  find(e, t = !1) {
    const r = this.registry.find(e, t);
    return r ? r.scroll === this ? r : t ? this.find(r.scroll.domNode.parentNode, !0) : null : null;
  }
  query(e, t = Z.ANY) {
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
    this.update(), e === 0 && t === this.length() ? this.children.forEach((r) => {
      r.remove();
    }) : super.deleteAt(e, t);
  }
  formatAt(e, t, r, s) {
    this.update(), super.formatAt(e, t, r, s);
  }
  insertAt(e, t, r) {
    this.update(), super.insertAt(e, t, r);
  }
  optimize(e = [], t = {}) {
    super.optimize(t);
    const r = t.mutationsMap || /* @__PURE__ */ new WeakMap();
    let s = Array.from(this.observer.takeRecords());
    for (; s.length > 0; )
      e.push(s.pop());
    const i = (u, d = !0) => {
      u == null || u === this || u.domNode.parentNode != null && (r.has(u.domNode) || r.set(u.domNode, []), d && i(u.parent));
    }, a = (u) => {
      r.has(u.domNode) && (u instanceof ut && u.children.forEach(a), r.delete(u.domNode), u.optimize(t));
    };
    let l = e;
    for (let u = 0; l.length > 0; u += 1) {
      if (u >= Am)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((d) => {
        const p = this.find(d.target, !0);
        p != null && (p.domNode === d.target && (d.type === "childList" ? (i(this.find(d.previousSibling, !1)), Array.from(d.addedNodes).forEach((b) => {
          const h = this.find(b, !1);
          i(h, !1), h instanceof ut && h.children.forEach((w) => {
            i(w, !1);
          });
        })) : d.type === "attributes" && i(p.prev)), i(p));
      }), this.children.forEach(a), l = Array.from(this.observer.takeRecords()), s = l.slice(); s.length > 0; )
        e.push(s.pop());
    }
  }
  update(e, t = {}) {
    e = e || this.observer.takeRecords();
    const r = /* @__PURE__ */ new WeakMap();
    e.map((s) => {
      const i = this.find(s.target, !0);
      return i == null ? null : r.has(i.domNode) ? (r.get(i.domNode).push(s), null) : (r.set(i.domNode, [s]), i);
    }).forEach((s) => {
      s != null && s !== this && r.has(s.domNode) && s.update(r.get(s.domNode) || [], t);
    }), t.mutationsMap = r, r.has(this.domNode) && super.update(r.get(this.domNode), t), this.optimize(e, t);
  }
};
Rn.blotName = "scroll", Rn.defaultChild = mr, Rn.allowedChildren = [mr, hs], Rn.scope = Z.BLOCK_BLOT, Rn.tagName = "DIV";
let Em = Rn;
const Gi = Em, ki = class fl extends Ue {
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
  insertAt(e, t, r) {
    r == null ? (this.text = this.text.slice(0, e) + t + this.text.slice(e), this.domNode.data = this.text) : super.insertAt(e, t, r);
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
    const r = this.scroll.create(this.domNode.splitText(e));
    return this.parent.insertBefore(r, this.next || void 0), this.text = this.statics.value(this.domNode), r;
  }
  update(e, t) {
    e.some((r) => r.type === "characterData" && r.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
ki.blotName = "text", ki.scope = Z.INLINE_BLOT;
let Nm = ki;
const ns = Nm, Tm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: vt,
  AttributorStore: ds,
  BlockBlot: mr,
  ClassAttributor: dt,
  ContainerBlot: hs,
  EmbedBlot: Xe,
  InlineBlot: Ki,
  LeafBlot: Ue,
  ParentBlot: ut,
  Registry: Vn,
  Scope: Z,
  ScrollBlot: Gi,
  StyleAttributor: Qt,
  TextBlot: ns
}, Symbol.toStringTag, { value: "Module" }));
var zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pl(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Mr = { exports: {} }, si, Do;
function Sm() {
  if (Do) return si;
  Do = 1;
  var n = -1, e = 1, t = 0;
  function r(y, F, N, C, f) {
    if (y === F)
      return y ? [[t, y]] : [];
    if (N != null) {
      var A = Ae(y, F, N);
      if (A)
        return A;
    }
    var S = l(y, F), j = y.substring(0, S);
    y = y.substring(S), F = F.substring(S), S = d(y, F);
    var V = y.substring(y.length - S);
    y = y.substring(0, y.length - S), F = F.substring(0, F.length - S);
    var _ = s(y, F);
    return j && _.unshift([t, j]), V && _.push([t, V]), M(_, f), C && b(_), _;
  }
  function s(y, F) {
    var N;
    if (!y)
      return [[e, F]];
    if (!F)
      return [[n, y]];
    var C = y.length > F.length ? y : F, f = y.length > F.length ? F : y, A = C.indexOf(f);
    if (A !== -1)
      return N = [
        [e, C.substring(0, A)],
        [t, f],
        [e, C.substring(A + f.length)]
      ], y.length > F.length && (N[0][0] = N[2][0] = n), N;
    if (f.length === 1)
      return [
        [n, y],
        [e, F]
      ];
    var S = p(y, F);
    if (S) {
      var j = S[0], V = S[1], _ = S[2], T = S[3], P = S[4], z = r(j, _), H = r(V, T);
      return z.concat([[t, P]], H);
    }
    return i(y, F);
  }
  function i(y, F) {
    for (var N = y.length, C = F.length, f = Math.ceil((N + C) / 2), A = f, S = 2 * f, j = new Array(S), V = new Array(S), _ = 0; _ < S; _++)
      j[_] = -1, V[_] = -1;
    j[A + 1] = 0, V[A + 1] = 0;
    for (var T = N - C, P = T % 2 !== 0, z = 0, H = 0, U = 0, ee = 0, ye = 0; ye < f; ye++) {
      for (var se = -ye + z; se <= ye - H; se += 2) {
        var le = A + se, ue;
        se === -ye || se !== ye && j[le - 1] < j[le + 1] ? ue = j[le + 1] : ue = j[le - 1] + 1;
        for (var de = ue - se; ue < N && de < C && y.charAt(ue) === F.charAt(de); )
          ue++, de++;
        if (j[le] = ue, ue > N)
          H += 2;
        else if (de > C)
          z += 2;
        else if (P) {
          var he = A + T - se;
          if (he >= 0 && he < S && V[he] !== -1) {
            var me = N - V[he];
            if (ue >= me)
              return a(y, F, ue, de);
          }
        }
      }
      for (var Ee = -ye + U; Ee <= ye - ee; Ee += 2) {
        var he = A + Ee, me;
        Ee === -ye || Ee !== ye && V[he - 1] < V[he + 1] ? me = V[he + 1] : me = V[he - 1] + 1;
        for (var _e = me - Ee; me < N && _e < C && y.charAt(N - me - 1) === F.charAt(C - _e - 1); )
          me++, _e++;
        if (V[he] = me, me > N)
          ee += 2;
        else if (_e > C)
          U += 2;
        else if (!P) {
          var le = A + T - Ee;
          if (le >= 0 && le < S && j[le] !== -1) {
            var ue = j[le], de = A + ue - le;
            if (me = N - me, ue >= me)
              return a(y, F, ue, de);
          }
        }
      }
    }
    return [
      [n, y],
      [e, F]
    ];
  }
  function a(y, F, N, C) {
    var f = y.substring(0, N), A = F.substring(0, C), S = y.substring(N), j = F.substring(C), V = r(f, A), _ = r(S, j);
    return V.concat(_);
  }
  function l(y, F) {
    if (!y || !F || y.charAt(0) !== F.charAt(0))
      return 0;
    for (var N = 0, C = Math.min(y.length, F.length), f = C, A = 0; N < f; )
      y.substring(A, f) == F.substring(A, f) ? (N = f, A = N) : C = f, f = Math.floor((C - N) / 2 + N);
    return K(y.charCodeAt(f - 1)) && f--, f;
  }
  function u(y, F) {
    var N = y.length, C = F.length;
    if (N == 0 || C == 0)
      return 0;
    N > C ? y = y.substring(N - C) : N < C && (F = F.substring(0, N));
    var f = Math.min(N, C);
    if (y == F)
      return f;
    for (var A = 0, S = 1; ; ) {
      var j = y.substring(f - S), V = F.indexOf(j);
      if (V == -1)
        return A;
      S += V, (V == 0 || y.substring(f - S) == F.substring(0, S)) && (A = S, S++);
    }
  }
  function d(y, F) {
    if (!y || !F || y.slice(-1) !== F.slice(-1))
      return 0;
    for (var N = 0, C = Math.min(y.length, F.length), f = C, A = 0; N < f; )
      y.substring(y.length - f, y.length - A) == F.substring(F.length - f, F.length - A) ? (N = f, A = N) : C = f, f = Math.floor((C - N) / 2 + N);
    return J(y.charCodeAt(y.length - f)) && f--, f;
  }
  function p(y, F) {
    var N = y.length > F.length ? y : F, C = y.length > F.length ? F : y;
    if (N.length < 4 || C.length * 2 < N.length)
      return null;
    function f(H, U, ee) {
      for (var ye = H.substring(ee, ee + Math.floor(H.length / 4)), se = -1, le = "", ue, de, he, me; (se = U.indexOf(ye, se + 1)) !== -1; ) {
        var Ee = l(
          H.substring(ee),
          U.substring(se)
        ), _e = d(
          H.substring(0, ee),
          U.substring(0, se)
        );
        le.length < _e + Ee && (le = U.substring(se - _e, se) + U.substring(se, se + Ee), ue = H.substring(0, ee - _e), de = H.substring(ee + Ee), he = U.substring(0, se - _e), me = U.substring(se + Ee));
      }
      return le.length * 2 >= H.length ? [
        ue,
        de,
        he,
        me,
        le
      ] : null;
    }
    var A = f(
      N,
      C,
      Math.ceil(N.length / 4)
    ), S = f(
      N,
      C,
      Math.ceil(N.length / 2)
    ), j;
    if (!A && !S)
      return null;
    S ? A ? j = A[4].length > S[4].length ? A : S : j = S : j = A;
    var V, _, T, P;
    y.length > F.length ? (V = j[0], _ = j[1], T = j[2], P = j[3]) : (T = j[0], P = j[1], V = j[2], _ = j[3]);
    var z = j[4];
    return [V, _, T, P, z];
  }
  function b(y) {
    for (var F = !1, N = [], C = 0, f = null, A = 0, S = 0, j = 0, V = 0, _ = 0; A < y.length; )
      y[A][0] == t ? (N[C++] = A, S = V, j = _, V = 0, _ = 0, f = y[A][1]) : (y[A][0] == e ? V += y[A][1].length : _ += y[A][1].length, f && f.length <= Math.max(S, j) && f.length <= Math.max(V, _) && (y.splice(N[C - 1], 0, [
        n,
        f
      ]), y[N[C - 1] + 1][0] = e, C--, C--, A = C > 0 ? N[C - 1] : -1, S = 0, j = 0, V = 0, _ = 0, f = null, F = !0)), A++;
    for (F && M(y), R(y), A = 1; A < y.length; ) {
      if (y[A - 1][0] == n && y[A][0] == e) {
        var T = y[A - 1][1], P = y[A][1], z = u(T, P), H = u(P, T);
        z >= H ? (z >= T.length / 2 || z >= P.length / 2) && (y.splice(A, 0, [
          t,
          P.substring(0, z)
        ]), y[A - 1][1] = T.substring(
          0,
          T.length - z
        ), y[A + 1][1] = P.substring(z), A++) : (H >= T.length / 2 || H >= P.length / 2) && (y.splice(A, 0, [
          t,
          T.substring(0, H)
        ]), y[A - 1][0] = e, y[A - 1][1] = P.substring(
          0,
          P.length - H
        ), y[A + 1][0] = n, y[A + 1][1] = T.substring(H), A++), A++;
      }
      A++;
    }
  }
  var h = /[^a-zA-Z0-9]/, w = /\s/, E = /[\r\n]/, k = /\n\r?\n$/, L = /^\r?\n\r?\n/;
  function R(y) {
    function F(H, U) {
      if (!H || !U)
        return 6;
      var ee = H.charAt(H.length - 1), ye = U.charAt(0), se = ee.match(h), le = ye.match(h), ue = se && ee.match(w), de = le && ye.match(w), he = ue && ee.match(E), me = de && ye.match(E), Ee = he && H.match(k), _e = me && U.match(L);
      return Ee || _e ? 5 : he || me ? 4 : se && !ue && de ? 3 : ue || de ? 2 : se || le ? 1 : 0;
    }
    for (var N = 1; N < y.length - 1; ) {
      if (y[N - 1][0] == t && y[N + 1][0] == t) {
        var C = y[N - 1][1], f = y[N][1], A = y[N + 1][1], S = d(C, f);
        if (S) {
          var j = f.substring(f.length - S);
          C = C.substring(0, C.length - S), f = j + f.substring(0, f.length - S), A = j + A;
        }
        for (var V = C, _ = f, T = A, P = F(C, f) + F(f, A); f.charAt(0) === A.charAt(0); ) {
          C += f.charAt(0), f = f.substring(1) + A.charAt(0), A = A.substring(1);
          var z = F(C, f) + F(f, A);
          z >= P && (P = z, V = C, _ = f, T = A);
        }
        y[N - 1][1] != V && (V ? y[N - 1][1] = V : (y.splice(N - 1, 1), N--), y[N][1] = _, T ? y[N + 1][1] = T : (y.splice(N + 1, 1), N--));
      }
      N++;
    }
  }
  function M(y, F) {
    y.push([t, ""]);
    for (var N = 0, C = 0, f = 0, A = "", S = "", j; N < y.length; ) {
      if (N < y.length - 1 && !y[N][1]) {
        y.splice(N, 1);
        continue;
      }
      switch (y[N][0]) {
        case e:
          f++, S += y[N][1], N++;
          break;
        case n:
          C++, A += y[N][1], N++;
          break;
        case t:
          var V = N - f - C - 1;
          if (F) {
            if (V >= 0 && ae(y[V][1])) {
              var _ = y[V][1].slice(-1);
              if (y[V][1] = y[V][1].slice(
                0,
                -1
              ), A = _ + A, S = _ + S, !y[V][1]) {
                y.splice(V, 1), N--;
                var T = V - 1;
                y[T] && y[T][0] === e && (f++, S = y[T][1] + S, T--), y[T] && y[T][0] === n && (C++, A = y[T][1] + A, T--), V = T;
              }
            }
            if (Y(y[N][1])) {
              var _ = y[N][1].charAt(0);
              y[N][1] = y[N][1].slice(1), A += _, S += _;
            }
          }
          if (N < y.length - 1 && !y[N][1]) {
            y.splice(N, 1);
            break;
          }
          if (A.length > 0 || S.length > 0) {
            A.length > 0 && S.length > 0 && (j = l(S, A), j !== 0 && (V >= 0 ? y[V][1] += S.substring(
              0,
              j
            ) : (y.splice(0, 0, [
              t,
              S.substring(0, j)
            ]), N++), S = S.substring(j), A = A.substring(j)), j = d(S, A), j !== 0 && (y[N][1] = S.substring(S.length - j) + y[N][1], S = S.substring(
              0,
              S.length - j
            ), A = A.substring(
              0,
              A.length - j
            )));
            var P = f + C;
            A.length === 0 && S.length === 0 ? (y.splice(N - P, P), N = N - P) : A.length === 0 ? (y.splice(N - P, P, [e, S]), N = N - P + 1) : S.length === 0 ? (y.splice(N - P, P, [n, A]), N = N - P + 1) : (y.splice(
              N - P,
              P,
              [n, A],
              [e, S]
            ), N = N - P + 2);
          }
          N !== 0 && y[N - 1][0] === t ? (y[N - 1][1] += y[N][1], y.splice(N, 1)) : N++, f = 0, C = 0, A = "", S = "";
          break;
      }
    }
    y[y.length - 1][1] === "" && y.pop();
    var z = !1;
    for (N = 1; N < y.length - 1; )
      y[N - 1][0] === t && y[N + 1][0] === t && (y[N][1].substring(
        y[N][1].length - y[N - 1][1].length
      ) === y[N - 1][1] ? (y[N][1] = y[N - 1][1] + y[N][1].substring(
        0,
        y[N][1].length - y[N - 1][1].length
      ), y[N + 1][1] = y[N - 1][1] + y[N + 1][1], y.splice(N - 1, 1), z = !0) : y[N][1].substring(0, y[N + 1][1].length) == y[N + 1][1] && (y[N - 1][1] += y[N + 1][1], y[N][1] = y[N][1].substring(y[N + 1][1].length) + y[N + 1][1], y.splice(N + 1, 1), z = !0)), N++;
    z && M(y, F);
  }
  function K(y) {
    return y >= 55296 && y <= 56319;
  }
  function J(y) {
    return y >= 56320 && y <= 57343;
  }
  function Y(y) {
    return J(y.charCodeAt(0));
  }
  function ae(y) {
    return K(y.charCodeAt(y.length - 1));
  }
  function oe(y) {
    for (var F = [], N = 0; N < y.length; N++)
      y[N][1].length > 0 && F.push(y[N]);
    return F;
  }
  function be(y, F, N, C) {
    return ae(y) || Y(C) ? null : oe([
      [t, y],
      [n, F],
      [e, N],
      [t, C]
    ]);
  }
  function Ae(y, F, N) {
    var C = typeof N == "number" ? { index: N, length: 0 } : N.oldRange, f = typeof N == "number" ? null : N.newRange, A = y.length, S = F.length;
    if (C.length === 0 && (f === null || f.length === 0)) {
      var j = C.index, V = y.slice(0, j), _ = y.slice(j), T = f ? f.index : null;
      e: {
        var P = j + S - A;
        if (T !== null && T !== P || P < 0 || P > S)
          break e;
        var z = F.slice(0, P), H = F.slice(P);
        if (H !== _)
          break e;
        var U = Math.min(j, P), ee = V.slice(0, U), ye = z.slice(0, U);
        if (ee !== ye)
          break e;
        var se = V.slice(U), le = z.slice(U);
        return be(ee, se, le, _);
      }
      e: {
        if (T !== null && T !== j)
          break e;
        var ue = j, z = F.slice(0, ue), H = F.slice(ue);
        if (z !== V)
          break e;
        var de = Math.min(A - ue, S - ue), he = _.slice(_.length - de), me = H.slice(H.length - de);
        if (he !== me)
          break e;
        var se = _.slice(0, _.length - de), le = H.slice(0, H.length - de);
        return be(V, se, le, he);
      }
    }
    if (C.length > 0 && f && f.length === 0)
      e: {
        var ee = y.slice(0, C.index), he = y.slice(C.index + C.length), U = ee.length, de = he.length;
        if (S < U + de)
          break e;
        var ye = F.slice(0, U), me = F.slice(S - de);
        if (ee !== ye || he !== me)
          break e;
        var se = y.slice(U, A - de), le = F.slice(U, S - de);
        return be(ee, se, le, he);
      }
    return null;
  }
  function we(y, F, N, C) {
    return r(y, F, N, C, !0);
  }
  return we.INSERT = e, we.DELETE = n, we.EQUAL = t, si = we, si;
}
var rr = { exports: {} };
rr.exports;
var Bo;
function ml() {
  return Bo || (Bo = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", a = "[object Array]", l = "[object Boolean]", u = "[object Date]", d = "[object Error]", p = "[object Function]", b = "[object GeneratorFunction]", h = "[object Map]", w = "[object Number]", E = "[object Object]", k = "[object Promise]", L = "[object RegExp]", R = "[object Set]", M = "[object String]", K = "[object Symbol]", J = "[object WeakMap]", Y = "[object ArrayBuffer]", ae = "[object DataView]", oe = "[object Float32Array]", be = "[object Float64Array]", Ae = "[object Int8Array]", we = "[object Int16Array]", y = "[object Int32Array]", F = "[object Uint8Array]", N = "[object Uint8ClampedArray]", C = "[object Uint16Array]", f = "[object Uint32Array]", A = /[\\^$.*+?()[\]{}|]/g, S = /\w*$/, j = /^\[object .+?Constructor\]$/, V = /^(?:0|[1-9]\d*)$/, _ = {};
    _[i] = _[a] = _[Y] = _[ae] = _[l] = _[u] = _[oe] = _[be] = _[Ae] = _[we] = _[y] = _[h] = _[w] = _[E] = _[L] = _[R] = _[M] = _[K] = _[F] = _[N] = _[C] = _[f] = !0, _[d] = _[p] = _[J] = !1;
    var T = typeof zt == "object" && zt && zt.Object === Object && zt, P = typeof self == "object" && self && self.Object === Object && self, z = T || P || Function("return this")(), H = e && !e.nodeType && e, U = H && !0 && n && !n.nodeType && n, ee = U && U.exports === H;
    function ye(o, c) {
      return o.set(c[0], c[1]), o;
    }
    function se(o, c) {
      return o.add(c), o;
    }
    function le(o, c) {
      for (var x = -1, O = o ? o.length : 0; ++x < O && c(o[x], x, o) !== !1; )
        ;
      return o;
    }
    function ue(o, c) {
      for (var x = -1, O = c.length, ie = o.length; ++x < O; )
        o[ie + x] = c[x];
      return o;
    }
    function de(o, c, x, O) {
      for (var ie = -1, X = o ? o.length : 0; ++ie < X; )
        x = c(x, o[ie], ie, o);
      return x;
    }
    function he(o, c) {
      for (var x = -1, O = Array(o); ++x < o; )
        O[x] = c(x);
      return O;
    }
    function me(o, c) {
      return o?.[c];
    }
    function Ee(o) {
      var c = !1;
      if (o != null && typeof o.toString != "function")
        try {
          c = !!(o + "");
        } catch {
        }
      return c;
    }
    function _e(o) {
      var c = -1, x = Array(o.size);
      return o.forEach(function(O, ie) {
        x[++c] = [ie, O];
      }), x;
    }
    function Jt(o, c) {
      return function(x) {
        return o(c(x));
      };
    }
    function en(o) {
      var c = -1, x = Array(o.size);
      return o.forEach(function(O) {
        x[++c] = O;
      }), x;
    }
    var An = Array.prototype, tn = Function.prototype, At = Object.prototype, nn = z["__core-js_shared__"], En = (function() {
      var o = /[^.]+$/.exec(nn && nn.keys && nn.keys.IE_PROTO || "");
      return o ? "Symbol(src)_1." + o : "";
    })(), Nn = tn.toString, Qe = At.hasOwnProperty, Et = At.toString, Tn = RegExp(
      "^" + Nn.call(Qe).replace(A, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Nt = ee ? z.Buffer : void 0, Tt = z.Symbol, ft = z.Uint8Array, Ve = Jt(Object.getPrototypeOf, Object), St = Object.create, Ct = At.propertyIsEnumerable, Kn = An.splice, rn = Object.getOwnPropertySymbols, Bt = Nt ? Nt.isBuffer : void 0, sn = Jt(Object.keys, Object), Ft = rt(z, "DataView"), m = rt(z, "Map"), g = rt(z, "Promise"), q = rt(z, "Set"), D = rt(z, "WeakMap"), re = rt(Object, "create"), pe = ze(Ft), qe = ze(m), on = ze(g), Mt = ze(q), an = ze(D), Be = Tt ? Tt.prototype : void 0, Tr = Be ? Be.valueOf : void 0;
    function kt(o) {
      var c = -1, x = o ? o.length : 0;
      for (this.clear(); ++c < x; ) {
        var O = o[c];
        this.set(O[0], O[1]);
      }
    }
    function gs() {
      this.__data__ = re ? re(null) : {};
    }
    function bs(o) {
      return this.has(o) && delete this.__data__[o];
    }
    function ys(o) {
      var c = this.__data__;
      if (re) {
        var x = c[o];
        return x === r ? void 0 : x;
      }
      return Qe.call(c, o) ? c[o] : void 0;
    }
    function Sr(o) {
      var c = this.__data__;
      return re ? c[o] !== void 0 : Qe.call(c, o);
    }
    function Gn(o, c) {
      var x = this.__data__;
      return x[o] = re && c === void 0 ? r : c, this;
    }
    kt.prototype.clear = gs, kt.prototype.delete = bs, kt.prototype.get = ys, kt.prototype.has = Sr, kt.prototype.set = Gn;
    function Ie(o) {
      var c = -1, x = o ? o.length : 0;
      for (this.clear(); ++c < x; ) {
        var O = o[c];
        this.set(O[0], O[1]);
      }
    }
    function vs() {
      this.__data__ = [];
    }
    function xs(o) {
      var c = this.__data__, x = Cn(c, o);
      if (x < 0)
        return !1;
      var O = c.length - 1;
      return x == O ? c.pop() : Kn.call(c, x, 1), !0;
    }
    function ws(o) {
      var c = this.__data__, x = Cn(c, o);
      return x < 0 ? void 0 : c[x][1];
    }
    function As(o) {
      return Cn(this.__data__, o) > -1;
    }
    function Es(o, c) {
      var x = this.__data__, O = Cn(x, o);
      return O < 0 ? x.push([o, c]) : x[O][1] = c, this;
    }
    Ie.prototype.clear = vs, Ie.prototype.delete = xs, Ie.prototype.get = ws, Ie.prototype.has = As, Ie.prototype.set = Es;
    function Fe(o) {
      var c = -1, x = o ? o.length : 0;
      for (this.clear(); ++c < x; ) {
        var O = o[c];
        this.set(O[0], O[1]);
      }
    }
    function Ns() {
      this.__data__ = {
        hash: new kt(),
        map: new (m || Ie)(),
        string: new kt()
      };
    }
    function Ts(o) {
      return un(this, o).delete(o);
    }
    function Ss(o) {
      return un(this, o).get(o);
    }
    function Cs(o) {
      return un(this, o).has(o);
    }
    function ks(o, c) {
      return un(this, o).set(o, c), this;
    }
    Fe.prototype.clear = Ns, Fe.prototype.delete = Ts, Fe.prototype.get = Ss, Fe.prototype.has = Cs, Fe.prototype.set = ks;
    function Ge(o) {
      this.__data__ = new Ie(o);
    }
    function _s() {
      this.__data__ = new Ie();
    }
    function Ls(o) {
      return this.__data__.delete(o);
    }
    function qs(o) {
      return this.__data__.get(o);
    }
    function Is(o) {
      return this.__data__.has(o);
    }
    function Os(o, c) {
      var x = this.__data__;
      if (x instanceof Ie) {
        var O = x.__data__;
        if (!m || O.length < t - 1)
          return O.push([o, c]), this;
        x = this.__data__ = new Fe(O);
      }
      return x.set(o, c), this;
    }
    Ge.prototype.clear = _s, Ge.prototype.delete = Ls, Ge.prototype.get = qs, Ge.prototype.has = Is, Ge.prototype.set = Os;
    function Sn(o, c) {
      var x = Xn(o) || _n(o) ? he(o.length, String) : [], O = x.length, ie = !!O;
      for (var X in o)
        Qe.call(o, X) && !(ie && (X == "length" || Gs(X, O))) && x.push(X);
      return x;
    }
    function Cr(o, c, x) {
      var O = o[c];
      (!(Qe.call(o, c) && Ir(O, x)) || x === void 0 && !(c in o)) && (o[c] = x);
    }
    function Cn(o, c) {
      for (var x = o.length; x--; )
        if (Ir(o[x][0], c))
          return x;
      return -1;
    }
    function pt(o, c) {
      return o && Yn(c, Jn(c), o);
    }
    function Wn(o, c, x, O, ie, X, fe) {
      var ce;
      if (O && (ce = X ? O(o, ie, X, fe) : O(o)), ce !== void 0)
        return ce;
      if (!gt(o))
        return o;
      var Ne = Xn(o);
      if (Ne) {
        if (ce = Hs(o), !c)
          return Us(o, ce);
      } else {
        var ge = Lt(o), Me = ge == p || ge == b;
        if (Or(o))
          return kn(o, c);
        if (ge == E || ge == i || Me && !X) {
          if (Ee(o))
            return X ? o : {};
          if (ce = mt(Me ? {} : o), !c)
            return Vs(o, pt(ce, o));
        } else {
          if (!_[ge])
            return X ? o : {};
          ce = Ks(o, ge, Wn, c);
        }
      }
      fe || (fe = new Ge());
      var We = fe.get(o);
      if (We)
        return We;
      if (fe.set(o, ce), !Ne)
        var Ce = x ? zs(o) : Jn(o);
      return le(Ce || o, function(Pe, Oe) {
        Ce && (Oe = Pe, Pe = o[Oe]), Cr(ce, Oe, Wn(Pe, c, x, O, Oe, o, fe));
      }), ce;
    }
    function Rs(o) {
      return gt(o) ? St(o) : {};
    }
    function $s(o, c, x) {
      var O = c(o);
      return Xn(o) ? O : ue(O, x(o));
    }
    function Ds(o) {
      return Et.call(o);
    }
    function Bs(o) {
      if (!gt(o) || Zs(o))
        return !1;
      var c = Qn(o) || Ee(o) ? Tn : j;
      return c.test(ze(o));
    }
    function Fs(o) {
      if (!Lr(o))
        return sn(o);
      var c = [];
      for (var x in Object(o))
        Qe.call(o, x) && x != "constructor" && c.push(x);
      return c;
    }
    function kn(o, c) {
      if (c)
        return o.slice();
      var x = new o.constructor(o.length);
      return o.copy(x), x;
    }
    function Zn(o) {
      var c = new o.constructor(o.byteLength);
      return new ft(c).set(new ft(o)), c;
    }
    function ln(o, c) {
      var x = c ? Zn(o.buffer) : o.buffer;
      return new o.constructor(x, o.byteOffset, o.byteLength);
    }
    function kr(o, c, x) {
      var O = c ? x(_e(o), !0) : _e(o);
      return de(O, ye, new o.constructor());
    }
    function _r(o) {
      var c = new o.constructor(o.source, S.exec(o));
      return c.lastIndex = o.lastIndex, c;
    }
    function Ms(o, c, x) {
      var O = c ? x(en(o), !0) : en(o);
      return de(O, se, new o.constructor());
    }
    function Ps(o) {
      return Tr ? Object(Tr.call(o)) : {};
    }
    function js(o, c) {
      var x = c ? Zn(o.buffer) : o.buffer;
      return new o.constructor(x, o.byteOffset, o.length);
    }
    function Us(o, c) {
      var x = -1, O = o.length;
      for (c || (c = Array(O)); ++x < O; )
        c[x] = o[x];
      return c;
    }
    function Yn(o, c, x, O) {
      x || (x = {});
      for (var ie = -1, X = c.length; ++ie < X; ) {
        var fe = c[ie], ce = void 0;
        Cr(x, fe, ce === void 0 ? o[fe] : ce);
      }
      return x;
    }
    function Vs(o, c) {
      return Yn(o, _t(o), c);
    }
    function zs(o) {
      return $s(o, Jn, _t);
    }
    function un(o, c) {
      var x = o.__data__;
      return Ws(c) ? x[typeof c == "string" ? "string" : "hash"] : x.map;
    }
    function rt(o, c) {
      var x = me(o, c);
      return Bs(x) ? x : void 0;
    }
    var _t = rn ? Jt(rn, Object) : Xs, Lt = Ds;
    (Ft && Lt(new Ft(new ArrayBuffer(1))) != ae || m && Lt(new m()) != h || g && Lt(g.resolve()) != k || q && Lt(new q()) != R || D && Lt(new D()) != J) && (Lt = function(o) {
      var c = Et.call(o), x = c == E ? o.constructor : void 0, O = x ? ze(x) : void 0;
      if (O)
        switch (O) {
          case pe:
            return ae;
          case qe:
            return h;
          case on:
            return k;
          case Mt:
            return R;
          case an:
            return J;
        }
      return c;
    });
    function Hs(o) {
      var c = o.length, x = o.constructor(c);
      return c && typeof o[0] == "string" && Qe.call(o, "index") && (x.index = o.index, x.input = o.input), x;
    }
    function mt(o) {
      return typeof o.constructor == "function" && !Lr(o) ? Rs(Ve(o)) : {};
    }
    function Ks(o, c, x, O) {
      var ie = o.constructor;
      switch (c) {
        case Y:
          return Zn(o);
        case l:
        case u:
          return new ie(+o);
        case ae:
          return ln(o, O);
        case oe:
        case be:
        case Ae:
        case we:
        case y:
        case F:
        case N:
        case C:
        case f:
          return js(o, O);
        case h:
          return kr(o, O, x);
        case w:
        case M:
          return new ie(o);
        case L:
          return _r(o);
        case R:
          return Ms(o, O, x);
        case K:
          return Ps(o);
      }
    }
    function Gs(o, c) {
      return c = c ?? s, !!c && (typeof o == "number" || V.test(o)) && o > -1 && o % 1 == 0 && o < c;
    }
    function Ws(o) {
      var c = typeof o;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? o !== "__proto__" : o === null;
    }
    function Zs(o) {
      return !!En && En in o;
    }
    function Lr(o) {
      var c = o && o.constructor, x = typeof c == "function" && c.prototype || At;
      return o === x;
    }
    function ze(o) {
      if (o != null) {
        try {
          return Nn.call(o);
        } catch {
        }
        try {
          return o + "";
        } catch {
        }
      }
      return "";
    }
    function qr(o) {
      return Wn(o, !0, !0);
    }
    function Ir(o, c) {
      return o === c || o !== o && c !== c;
    }
    function _n(o) {
      return Ys(o) && Qe.call(o, "callee") && (!Ct.call(o, "callee") || Et.call(o) == i);
    }
    var Xn = Array.isArray;
    function Ln(o) {
      return o != null && Rr(o.length) && !Qn(o);
    }
    function Ys(o) {
      return $r(o) && Ln(o);
    }
    var Or = Bt || Qs;
    function Qn(o) {
      var c = gt(o) ? Et.call(o) : "";
      return c == p || c == b;
    }
    function Rr(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= s;
    }
    function gt(o) {
      var c = typeof o;
      return !!o && (c == "object" || c == "function");
    }
    function $r(o) {
      return !!o && typeof o == "object";
    }
    function Jn(o) {
      return Ln(o) ? Sn(o) : Fs(o);
    }
    function Xs() {
      return [];
    }
    function Qs() {
      return !1;
    }
    n.exports = qr;
  })(rr, rr.exports)), rr.exports;
}
var sr = { exports: {} };
sr.exports;
var Fo;
function gl() {
  return Fo || (Fo = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 1, i = 2, a = 9007199254740991, l = "[object Arguments]", u = "[object Array]", d = "[object AsyncFunction]", p = "[object Boolean]", b = "[object Date]", h = "[object Error]", w = "[object Function]", E = "[object GeneratorFunction]", k = "[object Map]", L = "[object Number]", R = "[object Null]", M = "[object Object]", K = "[object Promise]", J = "[object Proxy]", Y = "[object RegExp]", ae = "[object Set]", oe = "[object String]", be = "[object Symbol]", Ae = "[object Undefined]", we = "[object WeakMap]", y = "[object ArrayBuffer]", F = "[object DataView]", N = "[object Float32Array]", C = "[object Float64Array]", f = "[object Int8Array]", A = "[object Int16Array]", S = "[object Int32Array]", j = "[object Uint8Array]", V = "[object Uint8ClampedArray]", _ = "[object Uint16Array]", T = "[object Uint32Array]", P = /[\\^$.*+?()[\]{}|]/g, z = /^\[object .+?Constructor\]$/, H = /^(?:0|[1-9]\d*)$/, U = {};
    U[N] = U[C] = U[f] = U[A] = U[S] = U[j] = U[V] = U[_] = U[T] = !0, U[l] = U[u] = U[y] = U[p] = U[F] = U[b] = U[h] = U[w] = U[k] = U[L] = U[M] = U[Y] = U[ae] = U[oe] = U[we] = !1;
    var ee = typeof zt == "object" && zt && zt.Object === Object && zt, ye = typeof self == "object" && self && self.Object === Object && self, se = ee || ye || Function("return this")(), le = e && !e.nodeType && e, ue = le && !0 && n && !n.nodeType && n, de = ue && ue.exports === le, he = de && ee.process, me = (function() {
      try {
        return he && he.binding && he.binding("util");
      } catch {
      }
    })(), Ee = me && me.isTypedArray;
    function _e(o, c) {
      for (var x = -1, O = o == null ? 0 : o.length, ie = 0, X = []; ++x < O; ) {
        var fe = o[x];
        c(fe, x, o) && (X[ie++] = fe);
      }
      return X;
    }
    function Jt(o, c) {
      for (var x = -1, O = c.length, ie = o.length; ++x < O; )
        o[ie + x] = c[x];
      return o;
    }
    function en(o, c) {
      for (var x = -1, O = o == null ? 0 : o.length; ++x < O; )
        if (c(o[x], x, o))
          return !0;
      return !1;
    }
    function An(o, c) {
      for (var x = -1, O = Array(o); ++x < o; )
        O[x] = c(x);
      return O;
    }
    function tn(o) {
      return function(c) {
        return o(c);
      };
    }
    function At(o, c) {
      return o.has(c);
    }
    function nn(o, c) {
      return o?.[c];
    }
    function En(o) {
      var c = -1, x = Array(o.size);
      return o.forEach(function(O, ie) {
        x[++c] = [ie, O];
      }), x;
    }
    function Nn(o, c) {
      return function(x) {
        return o(c(x));
      };
    }
    function Qe(o) {
      var c = -1, x = Array(o.size);
      return o.forEach(function(O) {
        x[++c] = O;
      }), x;
    }
    var Et = Array.prototype, Tn = Function.prototype, Nt = Object.prototype, Tt = se["__core-js_shared__"], ft = Tn.toString, Ve = Nt.hasOwnProperty, St = (function() {
      var o = /[^.]+$/.exec(Tt && Tt.keys && Tt.keys.IE_PROTO || "");
      return o ? "Symbol(src)_1." + o : "";
    })(), Ct = Nt.toString, Kn = RegExp(
      "^" + ft.call(Ve).replace(P, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), rn = de ? se.Buffer : void 0, Bt = se.Symbol, sn = se.Uint8Array, Ft = Nt.propertyIsEnumerable, m = Et.splice, g = Bt ? Bt.toStringTag : void 0, q = Object.getOwnPropertySymbols, D = rn ? rn.isBuffer : void 0, re = Nn(Object.keys, Object), pe = _t(se, "DataView"), qe = _t(se, "Map"), on = _t(se, "Promise"), Mt = _t(se, "Set"), an = _t(se, "WeakMap"), Be = _t(Object, "create"), Tr = ze(pe), kt = ze(qe), gs = ze(on), bs = ze(Mt), ys = ze(an), Sr = Bt ? Bt.prototype : void 0, Gn = Sr ? Sr.valueOf : void 0;
    function Ie(o) {
      var c = -1, x = o == null ? 0 : o.length;
      for (this.clear(); ++c < x; ) {
        var O = o[c];
        this.set(O[0], O[1]);
      }
    }
    function vs() {
      this.__data__ = Be ? Be(null) : {}, this.size = 0;
    }
    function xs(o) {
      var c = this.has(o) && delete this.__data__[o];
      return this.size -= c ? 1 : 0, c;
    }
    function ws(o) {
      var c = this.__data__;
      if (Be) {
        var x = c[o];
        return x === r ? void 0 : x;
      }
      return Ve.call(c, o) ? c[o] : void 0;
    }
    function As(o) {
      var c = this.__data__;
      return Be ? c[o] !== void 0 : Ve.call(c, o);
    }
    function Es(o, c) {
      var x = this.__data__;
      return this.size += this.has(o) ? 0 : 1, x[o] = Be && c === void 0 ? r : c, this;
    }
    Ie.prototype.clear = vs, Ie.prototype.delete = xs, Ie.prototype.get = ws, Ie.prototype.has = As, Ie.prototype.set = Es;
    function Fe(o) {
      var c = -1, x = o == null ? 0 : o.length;
      for (this.clear(); ++c < x; ) {
        var O = o[c];
        this.set(O[0], O[1]);
      }
    }
    function Ns() {
      this.__data__ = [], this.size = 0;
    }
    function Ts(o) {
      var c = this.__data__, x = kn(c, o);
      if (x < 0)
        return !1;
      var O = c.length - 1;
      return x == O ? c.pop() : m.call(c, x, 1), --this.size, !0;
    }
    function Ss(o) {
      var c = this.__data__, x = kn(c, o);
      return x < 0 ? void 0 : c[x][1];
    }
    function Cs(o) {
      return kn(this.__data__, o) > -1;
    }
    function ks(o, c) {
      var x = this.__data__, O = kn(x, o);
      return O < 0 ? (++this.size, x.push([o, c])) : x[O][1] = c, this;
    }
    Fe.prototype.clear = Ns, Fe.prototype.delete = Ts, Fe.prototype.get = Ss, Fe.prototype.has = Cs, Fe.prototype.set = ks;
    function Ge(o) {
      var c = -1, x = o == null ? 0 : o.length;
      for (this.clear(); ++c < x; ) {
        var O = o[c];
        this.set(O[0], O[1]);
      }
    }
    function _s() {
      this.size = 0, this.__data__ = {
        hash: new Ie(),
        map: new (qe || Fe)(),
        string: new Ie()
      };
    }
    function Ls(o) {
      var c = rt(this, o).delete(o);
      return this.size -= c ? 1 : 0, c;
    }
    function qs(o) {
      return rt(this, o).get(o);
    }
    function Is(o) {
      return rt(this, o).has(o);
    }
    function Os(o, c) {
      var x = rt(this, o), O = x.size;
      return x.set(o, c), this.size += x.size == O ? 0 : 1, this;
    }
    Ge.prototype.clear = _s, Ge.prototype.delete = Ls, Ge.prototype.get = qs, Ge.prototype.has = Is, Ge.prototype.set = Os;
    function Sn(o) {
      var c = -1, x = o == null ? 0 : o.length;
      for (this.__data__ = new Ge(); ++c < x; )
        this.add(o[c]);
    }
    function Cr(o) {
      return this.__data__.set(o, r), this;
    }
    function Cn(o) {
      return this.__data__.has(o);
    }
    Sn.prototype.add = Sn.prototype.push = Cr, Sn.prototype.has = Cn;
    function pt(o) {
      var c = this.__data__ = new Fe(o);
      this.size = c.size;
    }
    function Wn() {
      this.__data__ = new Fe(), this.size = 0;
    }
    function Rs(o) {
      var c = this.__data__, x = c.delete(o);
      return this.size = c.size, x;
    }
    function $s(o) {
      return this.__data__.get(o);
    }
    function Ds(o) {
      return this.__data__.has(o);
    }
    function Bs(o, c) {
      var x = this.__data__;
      if (x instanceof Fe) {
        var O = x.__data__;
        if (!qe || O.length < t - 1)
          return O.push([o, c]), this.size = ++x.size, this;
        x = this.__data__ = new Ge(O);
      }
      return x.set(o, c), this.size = x.size, this;
    }
    pt.prototype.clear = Wn, pt.prototype.delete = Rs, pt.prototype.get = $s, pt.prototype.has = Ds, pt.prototype.set = Bs;
    function Fs(o, c) {
      var x = _n(o), O = !x && Ir(o), ie = !x && !O && Ln(o), X = !x && !O && !ie && $r(o), fe = x || O || ie || X, ce = fe ? An(o.length, String) : [], Ne = ce.length;
      for (var ge in o)
        Ve.call(o, ge) && !(fe && // Safari 9 has enumerable `arguments.length` in strict mode.
        (ge == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        ie && (ge == "offset" || ge == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        X && (ge == "buffer" || ge == "byteLength" || ge == "byteOffset") || // Skip index properties.
        Ks(ge, Ne))) && ce.push(ge);
      return ce;
    }
    function kn(o, c) {
      for (var x = o.length; x--; )
        if (qr(o[x][0], c))
          return x;
      return -1;
    }
    function Zn(o, c, x) {
      var O = c(o);
      return _n(o) ? O : Jt(O, x(o));
    }
    function ln(o) {
      return o == null ? o === void 0 ? Ae : R : g && g in Object(o) ? Lt(o) : Lr(o);
    }
    function kr(o) {
      return gt(o) && ln(o) == l;
    }
    function _r(o, c, x, O, ie) {
      return o === c ? !0 : o == null || c == null || !gt(o) && !gt(c) ? o !== o && c !== c : Ms(o, c, x, O, _r, ie);
    }
    function Ms(o, c, x, O, ie, X) {
      var fe = _n(o), ce = _n(c), Ne = fe ? u : mt(o), ge = ce ? u : mt(c);
      Ne = Ne == l ? M : Ne, ge = ge == l ? M : ge;
      var Me = Ne == M, We = ge == M, Ce = Ne == ge;
      if (Ce && Ln(o)) {
        if (!Ln(c))
          return !1;
        fe = !0, Me = !1;
      }
      if (Ce && !Me)
        return X || (X = new pt()), fe || $r(o) ? Yn(o, c, x, O, ie, X) : Vs(o, c, Ne, x, O, ie, X);
      if (!(x & s)) {
        var Pe = Me && Ve.call(o, "__wrapped__"), Oe = We && Ve.call(c, "__wrapped__");
        if (Pe || Oe) {
          var Pt = Pe ? o.value() : o, qt = Oe ? c.value() : c;
          return X || (X = new pt()), ie(Pt, qt, x, O, X);
        }
      }
      return Ce ? (X || (X = new pt()), zs(o, c, x, O, ie, X)) : !1;
    }
    function Ps(o) {
      if (!Rr(o) || Ws(o))
        return !1;
      var c = Or(o) ? Kn : z;
      return c.test(ze(o));
    }
    function js(o) {
      return gt(o) && Qn(o.length) && !!U[ln(o)];
    }
    function Us(o) {
      if (!Zs(o))
        return re(o);
      var c = [];
      for (var x in Object(o))
        Ve.call(o, x) && x != "constructor" && c.push(x);
      return c;
    }
    function Yn(o, c, x, O, ie, X) {
      var fe = x & s, ce = o.length, Ne = c.length;
      if (ce != Ne && !(fe && Ne > ce))
        return !1;
      var ge = X.get(o);
      if (ge && X.get(c))
        return ge == c;
      var Me = -1, We = !0, Ce = x & i ? new Sn() : void 0;
      for (X.set(o, c), X.set(c, o); ++Me < ce; ) {
        var Pe = o[Me], Oe = c[Me];
        if (O)
          var Pt = fe ? O(Oe, Pe, Me, c, o, X) : O(Pe, Oe, Me, o, c, X);
        if (Pt !== void 0) {
          if (Pt)
            continue;
          We = !1;
          break;
        }
        if (Ce) {
          if (!en(c, function(qt, cn) {
            if (!At(Ce, cn) && (Pe === qt || ie(Pe, qt, x, O, X)))
              return Ce.push(cn);
          })) {
            We = !1;
            break;
          }
        } else if (!(Pe === Oe || ie(Pe, Oe, x, O, X))) {
          We = !1;
          break;
        }
      }
      return X.delete(o), X.delete(c), We;
    }
    function Vs(o, c, x, O, ie, X, fe) {
      switch (x) {
        case F:
          if (o.byteLength != c.byteLength || o.byteOffset != c.byteOffset)
            return !1;
          o = o.buffer, c = c.buffer;
        case y:
          return !(o.byteLength != c.byteLength || !X(new sn(o), new sn(c)));
        case p:
        case b:
        case L:
          return qr(+o, +c);
        case h:
          return o.name == c.name && o.message == c.message;
        case Y:
        case oe:
          return o == c + "";
        case k:
          var ce = En;
        case ae:
          var Ne = O & s;
          if (ce || (ce = Qe), o.size != c.size && !Ne)
            return !1;
          var ge = fe.get(o);
          if (ge)
            return ge == c;
          O |= i, fe.set(o, c);
          var Me = Yn(ce(o), ce(c), O, ie, X, fe);
          return fe.delete(o), Me;
        case be:
          if (Gn)
            return Gn.call(o) == Gn.call(c);
      }
      return !1;
    }
    function zs(o, c, x, O, ie, X) {
      var fe = x & s, ce = un(o), Ne = ce.length, ge = un(c), Me = ge.length;
      if (Ne != Me && !fe)
        return !1;
      for (var We = Ne; We--; ) {
        var Ce = ce[We];
        if (!(fe ? Ce in c : Ve.call(c, Ce)))
          return !1;
      }
      var Pe = X.get(o);
      if (Pe && X.get(c))
        return Pe == c;
      var Oe = !0;
      X.set(o, c), X.set(c, o);
      for (var Pt = fe; ++We < Ne; ) {
        Ce = ce[We];
        var qt = o[Ce], cn = c[Ce];
        if (O)
          var io = fe ? O(cn, qt, Ce, c, o, X) : O(qt, cn, Ce, o, c, X);
        if (!(io === void 0 ? qt === cn || ie(qt, cn, x, O, X) : io)) {
          Oe = !1;
          break;
        }
        Pt || (Pt = Ce == "constructor");
      }
      if (Oe && !Pt) {
        var Dr = o.constructor, Br = c.constructor;
        Dr != Br && "constructor" in o && "constructor" in c && !(typeof Dr == "function" && Dr instanceof Dr && typeof Br == "function" && Br instanceof Br) && (Oe = !1);
      }
      return X.delete(o), X.delete(c), Oe;
    }
    function un(o) {
      return Zn(o, Jn, Hs);
    }
    function rt(o, c) {
      var x = o.__data__;
      return Gs(c) ? x[typeof c == "string" ? "string" : "hash"] : x.map;
    }
    function _t(o, c) {
      var x = nn(o, c);
      return Ps(x) ? x : void 0;
    }
    function Lt(o) {
      var c = Ve.call(o, g), x = o[g];
      try {
        o[g] = void 0;
        var O = !0;
      } catch {
      }
      var ie = Ct.call(o);
      return O && (c ? o[g] = x : delete o[g]), ie;
    }
    var Hs = q ? function(o) {
      return o == null ? [] : (o = Object(o), _e(q(o), function(c) {
        return Ft.call(o, c);
      }));
    } : Xs, mt = ln;
    (pe && mt(new pe(new ArrayBuffer(1))) != F || qe && mt(new qe()) != k || on && mt(on.resolve()) != K || Mt && mt(new Mt()) != ae || an && mt(new an()) != we) && (mt = function(o) {
      var c = ln(o), x = c == M ? o.constructor : void 0, O = x ? ze(x) : "";
      if (O)
        switch (O) {
          case Tr:
            return F;
          case kt:
            return k;
          case gs:
            return K;
          case bs:
            return ae;
          case ys:
            return we;
        }
      return c;
    });
    function Ks(o, c) {
      return c = c ?? a, !!c && (typeof o == "number" || H.test(o)) && o > -1 && o % 1 == 0 && o < c;
    }
    function Gs(o) {
      var c = typeof o;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? o !== "__proto__" : o === null;
    }
    function Ws(o) {
      return !!St && St in o;
    }
    function Zs(o) {
      var c = o && o.constructor, x = typeof c == "function" && c.prototype || Nt;
      return o === x;
    }
    function Lr(o) {
      return Ct.call(o);
    }
    function ze(o) {
      if (o != null) {
        try {
          return ft.call(o);
        } catch {
        }
        try {
          return o + "";
        } catch {
        }
      }
      return "";
    }
    function qr(o, c) {
      return o === c || o !== o && c !== c;
    }
    var Ir = kr(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? kr : function(o) {
      return gt(o) && Ve.call(o, "callee") && !Ft.call(o, "callee");
    }, _n = Array.isArray;
    function Xn(o) {
      return o != null && Qn(o.length) && !Or(o);
    }
    var Ln = D || Qs;
    function Ys(o, c) {
      return _r(o, c);
    }
    function Or(o) {
      if (!Rr(o))
        return !1;
      var c = ln(o);
      return c == w || c == E || c == d || c == J;
    }
    function Qn(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= a;
    }
    function Rr(o) {
      var c = typeof o;
      return o != null && (c == "object" || c == "function");
    }
    function gt(o) {
      return o != null && typeof o == "object";
    }
    var $r = Ee ? tn(Ee) : js;
    function Jn(o) {
      return Xn(o) ? Fs(o) : Us(o);
    }
    function Xs() {
      return [];
    }
    function Qs() {
      return !1;
    }
    n.exports = Ys;
  })(sr, sr.exports)), sr.exports;
}
var Pr = {}, Mo;
function Cm() {
  if (Mo) return Pr;
  Mo = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  const n = ml(), e = gl();
  var t;
  return (function(r) {
    function s(u = {}, d = {}, p = !1) {
      typeof u != "object" && (u = {}), typeof d != "object" && (d = {});
      let b = n(d);
      p || (b = Object.keys(b).reduce((h, w) => (b[w] != null && (h[w] = b[w]), h), {}));
      for (const h in u)
        u[h] !== void 0 && d[h] === void 0 && (b[h] = u[h]);
      return Object.keys(b).length > 0 ? b : void 0;
    }
    r.compose = s;
    function i(u = {}, d = {}) {
      typeof u != "object" && (u = {}), typeof d != "object" && (d = {});
      const p = Object.keys(u).concat(Object.keys(d)).reduce((b, h) => (e(u[h], d[h]) || (b[h] = d[h] === void 0 ? null : d[h]), b), {});
      return Object.keys(p).length > 0 ? p : void 0;
    }
    r.diff = i;
    function a(u = {}, d = {}) {
      u = u || {};
      const p = Object.keys(d).reduce((b, h) => (d[h] !== u[h] && u[h] !== void 0 && (b[h] = d[h]), b), {});
      return Object.keys(u).reduce((b, h) => (u[h] !== d[h] && d[h] === void 0 && (b[h] = null), b), p);
    }
    r.invert = a;
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
    r.transform = l;
  })(t || (t = {})), Pr.default = t, Pr;
}
var jr = {}, Po;
function bl() {
  if (Po) return jr;
  Po = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  var n;
  return (function(e) {
    function t(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    e.length = t;
  })(n || (n = {})), jr.default = n, jr;
}
var Ur = {}, jo;
function km() {
  if (jo) return Ur;
  jo = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  const n = bl();
  class e {
    constructor(r) {
      this.ops = r, this.index = 0, this.offset = 0;
    }
    hasNext() {
      return this.peekLength() < 1 / 0;
    }
    next(r) {
      r || (r = 1 / 0);
      const s = this.ops[this.index];
      if (s) {
        const i = this.offset, a = n.default.length(s);
        if (r >= a - i ? (r = a - i, this.index += 1, this.offset = 0) : this.offset += r, typeof s.delete == "number")
          return { delete: r };
        {
          const l = {};
          return s.attributes && (l.attributes = s.attributes), typeof s.retain == "number" ? l.retain = r : typeof s.retain == "object" && s.retain !== null ? l.retain = s.retain : typeof s.insert == "string" ? l.insert = s.insert.substr(i, r) : l.insert = s.insert, l;
        }
      } else
        return { retain: 1 / 0 };
    }
    peek() {
      return this.ops[this.index];
    }
    peekLength() {
      return this.ops[this.index] ? n.default.length(this.ops[this.index]) - this.offset : 1 / 0;
    }
    peekType() {
      const r = this.ops[this.index];
      return r ? typeof r.delete == "number" ? "delete" : typeof r.retain == "number" || typeof r.retain == "object" && r.retain !== null ? "retain" : "insert" : "retain";
    }
    rest() {
      if (this.hasNext()) {
        if (this.offset === 0)
          return this.ops.slice(this.index);
        {
          const r = this.offset, s = this.index, i = this.next(), a = this.ops.slice(this.index);
          return this.offset = r, this.index = s, [i].concat(a);
        }
      } else return [];
    }
  }
  return Ur.default = e, Ur;
}
var Uo;
function _m() {
  return Uo || (Uo = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = Sm(), r = ml(), s = gl(), i = Cm();
    e.AttributeMap = i.default;
    const a = bl();
    e.Op = a.default;
    const l = km();
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
        if (h = r(h), typeof E == "object") {
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
        return this.forEach((k) => {
          (h(k) ? w : E).push(k);
        }), [w, E];
      }
      reduce(h, w) {
        return this.ops.reduce(h, w);
      }
      changeLength() {
        return this.reduce((h, w) => w.insert ? h + a.default.length(w) : w.delete ? h - w.delete : h, 0);
      }
      length() {
        return this.reduce((h, w) => h + a.default.length(w), 0);
      }
      slice(h = 0, w = 1 / 0) {
        const E = [], k = new l.default(this.ops);
        let L = 0;
        for (; L < w && k.hasNext(); ) {
          let R;
          L < h ? R = k.next(h - L) : (R = k.next(w - L), E.push(R)), L += a.default.length(R);
        }
        return new p(E);
      }
      compose(h) {
        const w = new l.default(this.ops), E = new l.default(h.ops), k = [], L = E.peek();
        if (L != null && typeof L.retain == "number" && L.attributes == null) {
          let M = L.retain;
          for (; w.peekType() === "insert" && w.peekLength() <= M; )
            M -= w.peekLength(), k.push(w.next());
          L.retain - M > 0 && E.next(L.retain - M);
        }
        const R = new p(k);
        for (; w.hasNext() || E.hasNext(); )
          if (E.peekType() === "insert")
            R.push(E.next());
          else if (w.peekType() === "delete")
            R.push(w.next());
          else {
            const M = Math.min(w.peekLength(), E.peekLength()), K = w.next(M), J = E.next(M);
            if (J.retain) {
              const Y = {};
              if (typeof K.retain == "number")
                Y.retain = typeof J.retain == "number" ? M : J.retain;
              else if (typeof J.retain == "number")
                K.retain == null ? Y.insert = K.insert : Y.retain = K.retain;
              else {
                const oe = K.retain == null ? "insert" : "retain", [be, Ae, we] = d(K[oe], J.retain), y = p.getHandler(be);
                Y[oe] = {
                  [be]: y.compose(Ae, we, oe === "retain")
                };
              }
              const ae = i.default.compose(K.attributes, J.attributes, typeof K.retain == "number");
              if (ae && (Y.attributes = ae), R.push(Y), !E.hasNext() && s(R.ops[R.ops.length - 1], Y)) {
                const oe = new p(w.rest());
                return R.concat(oe).chop();
              }
            } else typeof J.delete == "number" && (typeof K.retain == "number" || typeof K.retain == "object" && K.retain !== null) && R.push(J);
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
        const E = [this, h].map((K) => K.map((J) => {
          if (J.insert != null)
            return typeof J.insert == "string" ? J.insert : u;
          const Y = K === h ? "on" : "with";
          throw new Error("diff() called " + Y + " non-document");
        }).join("")), k = new p(), L = t(E[0], E[1], w, !0), R = new l.default(this.ops), M = new l.default(h.ops);
        return L.forEach((K) => {
          let J = K[1].length;
          for (; J > 0; ) {
            let Y = 0;
            switch (K[0]) {
              case t.INSERT:
                Y = Math.min(M.peekLength(), J), k.push(M.next(Y));
                break;
              case t.DELETE:
                Y = Math.min(J, R.peekLength()), R.next(Y), k.delete(Y);
                break;
              case t.EQUAL:
                Y = Math.min(R.peekLength(), M.peekLength(), J);
                const ae = R.next(Y), oe = M.next(Y);
                s(ae.insert, oe.insert) ? k.retain(Y, i.default.diff(ae.attributes, oe.attributes)) : k.push(oe).delete(Y);
                break;
            }
            J -= Y;
          }
        }), k.chop();
      }
      eachLine(h, w = `
`) {
        const E = new l.default(this.ops);
        let k = new p(), L = 0;
        for (; E.hasNext(); ) {
          if (E.peekType() !== "insert")
            return;
          const R = E.peek(), M = a.default.length(R) - E.peekLength(), K = typeof R.insert == "string" ? R.insert.indexOf(w, M) - M : -1;
          if (K < 0)
            k.push(E.next());
          else if (K > 0)
            k.push(E.next(K));
          else {
            if (h(k, E.next(1).attributes || {}, L) === !1)
              return;
            L += 1, k = new p();
          }
        }
        k.length() > 0 && h(k, {}, L);
      }
      invert(h) {
        const w = new p();
        return this.reduce((E, k) => {
          if (k.insert)
            w.delete(a.default.length(k));
          else {
            if (typeof k.retain == "number" && k.attributes == null)
              return w.retain(k.retain), E + k.retain;
            if (k.delete || typeof k.retain == "number") {
              const L = k.delete || k.retain;
              return h.slice(E, E + L).forEach((M) => {
                k.delete ? w.push(M) : k.retain && k.attributes && w.retain(a.default.length(M), i.default.invert(k.attributes, M.attributes));
              }), E + L;
            } else if (typeof k.retain == "object" && k.retain !== null) {
              const L = h.slice(E, E + 1), R = new l.default(L.ops).next(), [M, K, J] = d(k.retain, R.insert), Y = p.getHandler(M);
              return w.retain({ [M]: Y.invert(K, J) }, i.default.invert(k.attributes, R.attributes)), E + 1;
            }
          }
          return E;
        }, 0), w.chop();
      }
      transform(h, w = !1) {
        if (w = !!w, typeof h == "number")
          return this.transformPosition(h, w);
        const E = h, k = new l.default(this.ops), L = new l.default(E.ops), R = new p();
        for (; k.hasNext() || L.hasNext(); )
          if (k.peekType() === "insert" && (w || L.peekType() !== "insert"))
            R.retain(a.default.length(k.next()));
          else if (L.peekType() === "insert")
            R.push(L.next());
          else {
            const M = Math.min(k.peekLength(), L.peekLength()), K = k.next(M), J = L.next(M);
            if (K.delete)
              continue;
            if (J.delete)
              R.push(J);
            else {
              const Y = K.retain, ae = J.retain;
              let oe = typeof ae == "object" && ae !== null ? ae : M;
              if (typeof Y == "object" && Y !== null && typeof ae == "object" && ae !== null) {
                const be = Object.keys(Y)[0];
                if (be === Object.keys(ae)[0]) {
                  const Ae = p.getHandler(be);
                  Ae && (oe = {
                    [be]: Ae.transform(Y[be], ae[be], w)
                  });
                }
              }
              R.retain(oe, i.default.transform(K.attributes, J.attributes, w));
            }
          }
        return R.chop();
      }
      transformPosition(h, w = !1) {
        w = !!w;
        const E = new l.default(this.ops);
        let k = 0;
        for (; E.hasNext() && k <= h; ) {
          const L = E.peekLength(), R = E.peekType();
          if (E.next(), R === "delete") {
            h -= Math.min(L, h - k);
            continue;
          } else R === "insert" && (k < h || !w) && (h += L);
          k += L;
        }
        return h;
      }
    }
    p.Op = a.default, p.OpIterator = l.default, p.AttributeMap = i.default, p.handlers = {}, e.default = p, n.exports = p, n.exports.default = p;
  })(Mr, Mr.exports)), Mr.exports;
}
var nt = _m();
const W = /* @__PURE__ */ pl(nt);
class ht extends Xe {
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
ht.blotName = "break";
ht.tagName = "BR";
let ct = class extends ns {
};
const Lm = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function fs(n) {
  return n.replace(/[&<>"']/g, (e) => Lm[e]);
}
class He extends Ki {
  static allowedChildren = [He, ht, Xe, ct];
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
    const r = He.order.indexOf(e), s = He.order.indexOf(t);
    return r >= 0 || s >= 0 ? r - s : e === t ? 0 : e < t ? -1 : 1;
  }
  formatAt(e, t, r, s) {
    if (He.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, Z.BLOT)) {
      const i = this.isolate(e, t);
      s && i.wrap(r, s);
    } else
      super.formatAt(e, t, r, s);
  }
  optimize(e) {
    if (super.optimize(e), this.parent instanceof He && He.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const t = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(t), t.wrap(this);
    }
  }
}
const Vo = 1;
class De extends mr {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = yl(this)), this.cache.delta;
  }
  deleteAt(e, t) {
    super.deleteAt(e, t), this.cache = {};
  }
  formatAt(e, t, r, s) {
    t <= 0 || (this.scroll.query(r, Z.BLOCK) ? e + t === this.length() && this.format(r, s) : super.formatAt(e, Math.min(t, this.length() - e - 1), r, s), this.cache = {});
  }
  insertAt(e, t, r) {
    if (r != null) {
      super.insertAt(e, t, r), this.cache = {};
      return;
    }
    if (t.length === 0) return;
    const s = t.split(`
`), i = s.shift();
    i.length > 0 && (e < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(e, this.length() - 1), i) : this.children.tail.insertAt(this.children.tail.length(), i), this.cache = {});
    let a = this;
    s.reduce((l, u) => (a = a.split(l, !0), a.insertAt(0, u), u.length), e + i.length);
  }
  insertBefore(e, t) {
    const {
      head: r
    } = this.children;
    super.insertBefore(e, t), r instanceof ht && r.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Vo), this.cache.length;
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
    if (t && (e === 0 || e >= this.length() - Vo)) {
      const s = this.clone();
      return e === 0 ? (this.parent.insertBefore(s, this), this) : (this.parent.insertBefore(s, this.next), s);
    }
    const r = super.split(e, t);
    return this.cache = {}, r;
  }
}
De.blotName = "block";
De.tagName = "P";
De.defaultChild = ht;
De.allowedChildren = [ht, He, Xe, ct];
class tt extends Xe {
  attach() {
    super.attach(), this.attributes = new ds(this.domNode);
  }
  delta() {
    return new W().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(e, t) {
    const r = this.scroll.query(e, Z.BLOCK_ATTRIBUTE);
    r != null && this.attributes.attribute(r, t);
  }
  formatAt(e, t, r, s) {
    this.format(r, s);
  }
  insertAt(e, t, r) {
    if (r != null) {
      super.insertAt(e, t, r);
      return;
    }
    const s = t.split(`
`), i = s.pop(), a = s.map((u) => {
      const d = this.scroll.create(De.blotName);
      return d.insertAt(0, u), d;
    }), l = this.split(e);
    a.forEach((u) => {
      this.parent.insertBefore(u, l);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), l);
  }
}
tt.scope = Z.BLOCK_BLOT;
function yl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n.descendants(Ue).reduce((t, r) => r.length() === 0 ? t : t.insert(r.value(), Je(r, {}, e)), new W()).insert(`
`, Je(n));
}
function Je(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return n == null || ("formats" in n && typeof n.formats == "function" && (e = {
    ...e,
    ...n.formats()
  }, t && delete e["code-token"]), n.parent == null || n.parent.statics.blotName === "scroll" || n.parent.statics.scope !== n.statics.scope) ? e : Je(n.parent, e, t);
}
class ot extends Xe {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(e, t, r) {
    super(e, t), this.selection = r, this.textNode = document.createTextNode(ot.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
  }
  detach() {
    this.parent != null && this.parent.removeChild(this);
  }
  format(e, t) {
    if (this.savedLength !== 0) {
      super.format(e, t);
      return;
    }
    let r = this, s = 0;
    for (; r != null && r.statics.scope !== Z.BLOCK_BLOT; )
      s += r.offset(r.parent), r = r.parent;
    r != null && (this.savedLength = ot.CONTENTS.length, r.optimize(), r.formatAt(s, ot.CONTENTS.length, e, t), this.savedLength = 0);
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
    const t = this.prev instanceof ct ? this.prev : null, r = t ? t.length() : 0, s = this.next instanceof ct ? this.next : null, i = s ? s.text : "", {
      textNode: a
    } = this, l = a.data.split(ot.CONTENTS).join("");
    a.data = ot.CONTENTS;
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
      const d = (h, w) => t && h === t.domNode ? w : h === a ? r + w - 1 : s && h === s.domNode ? r + l.length + w : null, p = d(e.start.node, e.start.offset), b = d(e.end.node, e.end.offset);
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
    if (e.some((r) => r.type === "characterData" && r.target === this.textNode)) {
      const r = this.restore();
      r && (t.range = r);
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
var ii = { exports: {} }, zo;
function qm() {
  return zo || (zo = 1, (function(n) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (t = !1));
    function s(u, d, p) {
      this.fn = u, this.context = d, this.once = p || !1;
    }
    function i(u, d, p, b, h) {
      if (typeof p != "function")
        throw new TypeError("The listener must be a function");
      var w = new s(p, b || u, h), E = t ? t + d : d;
      return u._events[E] ? u._events[E].fn ? u._events[E] = [u._events[E], w] : u._events[E].push(w) : (u._events[E] = w, u._eventsCount++), u;
    }
    function a(u, d) {
      --u._eventsCount === 0 ? u._events = new r() : delete u._events[d];
    }
    function l() {
      this._events = new r(), this._eventsCount = 0;
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
      var k = t ? t + d : d;
      if (!this._events[k]) return !1;
      var L = this._events[k], R = arguments.length, M, K;
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
        for (K = 1, M = new Array(R - 1); K < R; K++)
          M[K - 1] = arguments[K];
        L.fn.apply(L.context, M);
      } else {
        var J = L.length, Y;
        for (K = 0; K < J; K++)
          switch (L[K].once && this.removeListener(d, L[K].fn, void 0, !0), R) {
            case 1:
              L[K].fn.call(L[K].context);
              break;
            case 2:
              L[K].fn.call(L[K].context, p);
              break;
            case 3:
              L[K].fn.call(L[K].context, p, b);
              break;
            case 4:
              L[K].fn.call(L[K].context, p, b, h);
              break;
            default:
              if (!M) for (Y = 1, M = new Array(R - 1); Y < R; Y++)
                M[Y - 1] = arguments[Y];
              L[K].fn.apply(L[K].context, M);
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
        return a(this, w), this;
      var E = this._events[w];
      if (E.fn)
        E.fn === p && (!h || E.once) && (!b || E.context === b) && a(this, w);
      else {
        for (var k = 0, L = [], R = E.length; k < R; k++)
          (E[k].fn !== p || h && !E[k].once || b && E[k].context !== b) && L.push(E[k]);
        L.length ? this._events[w] = L.length === 1 ? L[0] : L : a(this, w);
      }
      return this;
    }, l.prototype.removeAllListeners = function(d) {
      var p;
      return d ? (p = t ? t + d : d, this._events[p] && a(this, p)) : (this._events = new r(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = t, l.EventEmitter = l, n.exports = l;
  })(ii)), ii.exports;
}
var Im = qm();
const Om = /* @__PURE__ */ pl(Im), _i = /* @__PURE__ */ new WeakMap(), Li = ["error", "warn", "log", "info"];
let qi = "warn";
function vl(n) {
  if (qi && Li.indexOf(n) <= Li.indexOf(qi)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
      t[r - 1] = arguments[r];
    console[n](...t);
  }
}
function Dt(n) {
  return Li.reduce((e, t) => (e[t] = vl.bind(console, t, n), e), {});
}
Dt.level = (n) => {
  qi = n;
};
vl.level = Dt.level;
const oi = Dt("quill:events"), Rm = ["selectionchange", "mousedown", "mouseup", "click"];
Rm.forEach((n) => {
  document.addEventListener(n, function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    Array.from(document.querySelectorAll(".ql-container")).forEach((s) => {
      const i = _i.get(s);
      i && i.emitter && i.emitter.handleDOM(...t);
    });
  });
});
class G extends Om {
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
    super(), this.domListeners = {}, this.on("error", oi.error);
  }
  emit() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return oi.log.call(oi, ...t), super.emit(...t);
  }
  handleDOM(e) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      r[s - 1] = arguments[s];
    (this.domListeners[e.type] || []).forEach((i) => {
      let {
        node: a,
        handler: l
      } = i;
      (e.target === a || a.contains(e.target)) && l(e, ...r);
    });
  }
  listenDOM(e, t, r) {
    this.domListeners[e] || (this.domListeners[e] = []), this.domListeners[e].push({
      node: t,
      handler: r
    });
  }
}
const ai = Dt("quill:selection");
class pn {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class $m {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new pn(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, G.sources.USER), 1);
    }), this.emitter.on(G.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const r = this.getNativeRange();
      r != null && r.start.node !== this.cursor.textNode && this.emitter.once(G.events.SCROLL_UPDATE, (s, i) => {
        try {
          this.root.contains(r.start.node) && this.root.contains(r.end.node) && this.setNativeRange(r.start.node, r.start.offset, r.end.node, r.end.offset);
          const a = i.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(a ? G.sources.SILENT : s);
        } catch {
        }
      });
    }), this.emitter.on(G.events.SCROLL_OPTIMIZE, (r, s) => {
      if (s.range) {
        const {
          startNode: i,
          startOffset: a,
          endNode: l,
          endOffset: u
        } = s.range;
        this.setNativeRange(i, a, l, u), this.update(G.sources.SILENT);
      }
    }), this.update(G.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(G.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(G.events.COMPOSITION_END, () => {
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
      this.mouseDown = !1, this.update(G.sources.USER);
    });
  }
  focus() {
    this.hasFocus() || (this.root.focus({
      preventScroll: !0
    }), this.setRange(this.savedRange));
  }
  format(e, t) {
    this.scroll.update();
    const r = this.getNativeRange();
    if (!(r == null || !r.native.collapsed || this.scroll.query(e, Z.BLOCK))) {
      if (r.start.node !== this.cursor.textNode) {
        const s = this.scroll.find(r.start.node, !1);
        if (s == null) return;
        if (s instanceof Ue) {
          const i = s.split(r.start.offset);
          s.parent.insertBefore(this.cursor, i);
        } else
          s.insertBefore(this.cursor, r.start.node);
        this.cursor.attach();
      }
      this.cursor.format(e, t), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
    }
  }
  getBounds(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const r = this.scroll.length();
    e = Math.min(e, r - 1), t = Math.min(e + t, r - 1) - e;
    let s, [i, a] = this.scroll.leaf(e);
    if (i == null) return null;
    if (t > 0 && a === i.length()) {
      const [p] = this.scroll.leaf(e + 1);
      if (p) {
        const [b] = this.scroll.line(e), [h] = this.scroll.line(e + 1);
        b === h && (i = p, a = 0);
      }
    }
    [s, a] = i.position(a, !0);
    const l = document.createRange();
    if (t > 0)
      return l.setStart(s, a), [i, a] = this.scroll.leaf(e + t), i == null ? null : ([s, a] = i.position(a, !0), l.setEnd(s, a), l.getBoundingClientRect());
    let u = "left", d;
    if (s instanceof Text) {
      if (!s.data.length)
        return null;
      a < s.data.length ? (l.setStart(s, a), l.setEnd(s, a + 1)) : (l.setStart(s, a - 1), l.setEnd(s, a), u = "right"), d = l.getBoundingClientRect();
    } else {
      if (!(i.domNode instanceof Element)) return null;
      d = i.domNode.getBoundingClientRect(), a > 0 && (u = "right");
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
    const r = this.normalizeNative(t);
    return ai.info("getNativeRange", r), r;
  }
  getRange() {
    const e = this.scroll.domNode;
    if ("isConnected" in e && !e.isConnected)
      return [null, null];
    const t = this.getNativeRange();
    return t == null ? [null, null] : [this.normalizedToRange(t), t];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && li(this.root, document.activeElement);
  }
  normalizedToRange(e) {
    const t = [[e.start.node, e.start.offset]];
    e.native.collapsed || t.push([e.end.node, e.end.offset]);
    const r = t.map((a) => {
      const [l, u] = a, d = this.scroll.find(l, !0), p = d.offset(this.scroll);
      return u === 0 ? p : d instanceof Ue ? p + d.index(l, u) : p + d.length();
    }), s = Math.min(Math.max(...r), this.scroll.length() - 1), i = Math.min(s, ...r);
    return new pn(i, s - i);
  }
  normalizeNative(e) {
    if (!li(this.root, e.startContainer) || !e.collapsed && !li(this.root, e.endContainer))
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
    return [t.start, t.end].forEach((r) => {
      let {
        node: s,
        offset: i
      } = r;
      for (; !(s instanceof Text) && s.childNodes.length > 0; )
        if (s.childNodes.length > i)
          s = s.childNodes[i], i = 0;
        else if (s.childNodes.length === i)
          s = s.lastChild, s instanceof Text ? i = s.data.length : s.childNodes.length > 0 ? i = s.childNodes.length : i = s.childNodes.length + 1;
        else
          break;
      r.node = s, r.offset = i;
    }), t;
  }
  rangeToNative(e) {
    const t = this.scroll.length(), r = (s, i) => {
      s = Math.min(t - 1, s);
      const [a, l] = this.scroll.leaf(s);
      return a ? a.position(l, i) : [null, -1];
    };
    return [...r(e.index, !1), ...r(e.index + e.length, !0)];
  }
  setNativeRange(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : t, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (ai.info("setNativeRange", e, t, r, s), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
    r.parentNode == null))
      return;
    const a = document.getSelection();
    if (a != null)
      if (e != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: l
        } = this.getNativeRange() || {};
        if (l == null || i || e !== l.startContainer || t !== l.startOffset || r !== l.endContainer || s !== l.endOffset) {
          e instanceof Element && e.tagName === "BR" && (t = Array.from(e.parentNode.childNodes).indexOf(e), e = e.parentNode), r instanceof Element && r.tagName === "BR" && (s = Array.from(r.parentNode.childNodes).indexOf(r), r = r.parentNode);
          const u = document.createRange();
          u.setStart(e, t), u.setEnd(r, s), a.removeAllRanges(), a.addRange(u);
        }
      } else
        a.removeAllRanges(), this.root.blur();
  }
  setRange(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : G.sources.API;
    if (typeof t == "string" && (r = t, t = !1), ai.info("setRange", e), e != null) {
      const s = this.rangeToNative(e);
      this.setNativeRange(...s, t);
    } else
      this.setNativeRange(null);
    this.update(r);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : G.sources.USER;
    const t = this.lastRange, [r, s] = this.getRange();
    if (this.lastRange = r, this.lastNative = s, this.lastRange != null && (this.savedRange = this.lastRange), !Hi(t, this.lastRange)) {
      if (!this.composing && s != null && s.native.collapsed && s.start.node !== this.cursor.textNode) {
        const a = this.cursor.restore();
        a && this.setNativeRange(a.startNode, a.startOffset, a.endNode, a.endOffset);
      }
      const i = [G.events.SELECTION_CHANGE, Bn(this.lastRange), Bn(t), e];
      this.emitter.emit(G.events.EDITOR_CHANGE, ...i), e !== G.sources.SILENT && this.emitter.emit(...i);
    }
  }
}
function li(n, e) {
  try {
    e.parentNode;
  } catch {
    return !1;
  }
  return n.contains(e);
}
const Dm = /^[ -~]*$/;
class Bm {
  constructor(e) {
    this.scroll = e, this.delta = this.getDelta();
  }
  applyDelta(e) {
    this.scroll.update();
    let t = this.scroll.length();
    this.scroll.batchStart();
    const r = Ho(e), s = new W();
    return Mm(r.ops.slice()).reduce((a, l) => {
      const u = nt.Op.length(l);
      let d = l.attributes || {}, p = !1, b = !1;
      if (l.insert != null) {
        if (s.retain(u), typeof l.insert == "string") {
          const E = l.insert;
          b = !E.endsWith(`
`) && (t <= a || !!this.scroll.descendant(tt, a)[0]), this.scroll.insertAt(a, E);
          const [k, L] = this.scroll.line(a);
          let R = Kt({}, Je(k));
          if (k instanceof De) {
            const [M] = k.descendant(Ue, L);
            M && (R = Kt(R, Je(M)));
          }
          d = nt.AttributeMap.diff(R, d) || {};
        } else if (typeof l.insert == "object") {
          const E = Object.keys(l.insert)[0];
          if (E == null) return a;
          const k = this.scroll.query(E, Z.INLINE) != null;
          if (k)
            (t <= a || this.scroll.descendant(tt, a)[0]) && (b = !0);
          else if (a > 0) {
            const [L, R] = this.scroll.descendant(Ue, a - 1);
            L instanceof ct ? L.value()[R] !== `
` && (p = !0) : L instanceof Xe && L.statics.scope === Z.INLINE_BLOT && (p = !0);
          }
          if (this.scroll.insertAt(a, E, l.insert[E]), k) {
            const [L] = this.scroll.descendant(Ue, a);
            if (L) {
              const R = Kt({}, Je(L));
              d = nt.AttributeMap.diff(R, d) || {};
            }
          }
        }
        t += u;
      } else if (s.push(l), l.retain !== null && typeof l.retain == "object") {
        const E = Object.keys(l.retain)[0];
        if (E == null) return a;
        this.scroll.updateEmbedAt(a, E, l.retain[E]);
      }
      Object.keys(d).forEach((E) => {
        this.scroll.formatAt(a, u, E, d[E]);
      });
      const h = p ? 1 : 0, w = b ? 1 : 0;
      return t += h + w, s.retain(h), s.delete(w), a + u + h + w;
    }, 0), s.reduce((a, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(a, l.delete), a) : a + nt.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new W().retain(e).delete(t));
  }
  formatLine(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(r).forEach((i) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((a) => {
        a.format(i, r[i]);
      });
    }), this.scroll.optimize();
    const s = new W().retain(e).retain(t, Bn(r));
    return this.update(s);
  }
  formatText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((i) => {
      this.scroll.formatAt(e, t, i, r[i]);
    });
    const s = new W().retain(e).retain(t, Bn(r));
    return this.update(s);
  }
  getContents(e, t) {
    return this.delta.slice(e, e + t);
  }
  getDelta() {
    return this.scroll.lines().reduce((e, t) => e.concat(t.delta()), new W());
  }
  getFormat(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = [], s = [];
    t === 0 ? this.scroll.path(e).forEach((l) => {
      const [u] = l;
      u instanceof De ? r.push(u) : u instanceof Ue && s.push(u);
    }) : (r = this.scroll.lines(e, t), s = this.scroll.descendants(Ue, e, t));
    const [i, a] = [r, s].map((l) => {
      const u = l.shift();
      if (u == null) return {};
      let d = Je(u);
      for (; Object.keys(d).length > 0; ) {
        const p = l.shift();
        if (p == null) return d;
        d = Fm(Je(p), d);
      }
      return d;
    });
    return {
      ...i,
      ...a
    };
  }
  getHTML(e, t) {
    const [r, s] = this.scroll.line(e);
    if (r) {
      const i = r.length();
      return r.length() >= s + t && !(s === 0 && t === i) ? gr(r, s, t, !0) : gr(this.scroll, e, t, !0);
    }
    return "";
  }
  getText(e, t) {
    return this.getContents(e, t).filter((r) => typeof r.insert == "string").map((r) => r.insert).join("");
  }
  insertContents(e, t) {
    const r = Ho(t), s = new W().retain(e).concat(r);
    return this.scroll.insertContents(e, r), this.update(s);
  }
  insertEmbed(e, t, r) {
    return this.scroll.insertAt(e, t, r), this.update(new W().retain(e).insert({
      [t]: r
    }));
  }
  insertText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return t = t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(e, t), Object.keys(r).forEach((s) => {
      this.scroll.formatAt(e, t.length, s, r[s]);
    }), this.update(new W().retain(e).insert(t, Bn(r)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if (e?.statics.blotName !== De.blotName) return !1;
    const t = e;
    return t.children.length > 1 ? !1 : t.children.head instanceof ht;
  }
  removeFormat(e, t) {
    const r = this.getText(e, t), [s, i] = this.scroll.line(e + t);
    let a = 0, l = new W();
    s != null && (a = s.length() - i, l = s.delta().slice(i, i + a - 1).insert(`
`));
    const d = this.getContents(e, t + a).diff(new W().insert(r).concat(l)), p = new W().retain(e).concat(d);
    return this.applyDelta(p);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const s = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(Dm) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), a = Je(i), l = i.offset(this.scroll), u = t[0].oldValue.replace(ot.CONTENTS, ""), d = new W().insert(u), p = new W().insert(i.value()), b = r && {
        oldRange: Ko(r.oldRange, -l),
        newRange: Ko(r.newRange, -l)
      };
      e = new W().retain(l).concat(d.diff(p, b)).reduce((w, E) => E.insert ? w.insert(E.insert, a) : w.push(E), new W()), this.delta = s.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !Hi(s.compose(e), this.delta)) && (e = s.diff(this.delta, r));
    return e;
  }
}
function $n(n, e, t) {
  if (n.length === 0) {
    const [w] = ui(t.pop());
    return e <= 0 ? `</li></${w}>` : `</li></${w}>${$n([], e - 1, t)}`;
  }
  const [{
    child: r,
    offset: s,
    length: i,
    indent: a,
    type: l
  }, ...u] = n, [d, p] = ui(l);
  if (a > e)
    return t.push(l), a === e + 1 ? `<${d}><li${p}>${gr(r, s, i)}${$n(u, a, t)}` : `<${d}><li>${$n(n, e + 1, t)}`;
  const b = t[t.length - 1];
  if (a === e && l === b)
    return `</li><li${p}>${gr(r, s, i)}${$n(u, a, t)}`;
  const [h] = ui(t.pop());
  return `</li></${h}>${$n(n, e - 1, t)}`;
}
function gr(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in n && typeof n.html == "function")
    return n.html(e, t);
  if (n instanceof ct)
    return fs(n.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (n instanceof ut) {
    if (n.statics.blotName === "list-container") {
      const d = [];
      return n.children.forEachAt(e, t, (p, b, h) => {
        const w = "formats" in p && typeof p.formats == "function" ? p.formats() : {};
        d.push({
          child: p,
          offset: b,
          length: h,
          indent: w.indent || 0,
          type: w.list
        });
      }), $n(d, -1, []);
    }
    const s = [];
    if (n.children.forEachAt(e, t, (d, p, b) => {
      s.push(gr(d, p, b));
    }), r || n.statics.blotName === "list")
      return s.join("");
    const {
      outerHTML: i,
      innerHTML: a
    } = n.domNode, [l, u] = i.split(`>${a}<`);
    return l === "<table" ? `<table style="border: 1px solid #000;">${s.join("")}<${u}` : `${l}>${s.join("")}<${u}`;
  }
  return n.domNode instanceof Element ? n.domNode.outerHTML : "";
}
function Fm(n, e) {
  return Object.keys(e).reduce((t, r) => {
    if (n[r] == null) return t;
    const s = e[r];
    return s === n[r] ? t[r] = s : Array.isArray(s) ? s.indexOf(n[r]) < 0 ? t[r] = s.concat([n[r]]) : t[r] = s : t[r] = [s, n[r]], t;
  }, {});
}
function ui(n) {
  const e = n === "ordered" ? "ol" : "ul";
  switch (n) {
    case "checked":
      return [e, ' data-list="checked"'];
    case "unchecked":
      return [e, ' data-list="unchecked"'];
    default:
      return [e, ""];
  }
}
function Ho(n) {
  return n.reduce((e, t) => {
    if (typeof t.insert == "string") {
      const r = t.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return e.insert(r, t.attributes);
    }
    return e.push(t);
  }, new W());
}
function Ko(n, e) {
  let {
    index: t,
    length: r
  } = n;
  return new pn(t + e, r);
}
function Mm(n) {
  const e = [];
  return n.forEach((t) => {
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
const Vr = "\uFEFF";
class Wi extends Xe {
  constructor(e, t) {
    super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((r) => {
      this.contentNode.appendChild(r);
    }), this.leftGuard = document.createTextNode(Vr), this.rightGuard = document.createTextNode(Vr), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(e, t) {
    return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
  }
  restore(e) {
    let t = null, r;
    const s = e.data.split(Vr).join("");
    if (e === this.leftGuard)
      if (this.prev instanceof ct) {
        const i = this.prev.length();
        this.prev.insertAt(i, s), t = {
          startNode: this.prev.domNode,
          startOffset: i + s.length
        };
      } else
        r = document.createTextNode(s), this.parent.insertBefore(this.scroll.create(r), this), t = {
          startNode: r,
          startOffset: s.length
        };
    else e === this.rightGuard && (this.next instanceof ct ? (this.next.insertAt(0, s), t = {
      startNode: this.next.domNode,
      startOffset: s.length
    }) : (r = document.createTextNode(s), this.parent.insertBefore(this.scroll.create(r), this.next), t = {
      startNode: r,
      startOffset: s.length
    }));
    return e.data = Vr, t;
  }
  update(e, t) {
    e.forEach((r) => {
      if (r.type === "characterData" && (r.target === this.leftGuard || r.target === this.rightGuard)) {
        const s = this.restore(r.target);
        s && (t.range = s);
      }
    });
  }
}
class Pm {
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
    t && !(t instanceof Wi) && (this.emitter.emit(G.events.COMPOSITION_BEFORE_START, e), this.scroll.batchStart(), this.emitter.emit(G.events.COMPOSITION_START, e), this.isComposing = !0);
  }
  handleCompositionEnd(e) {
    this.emitter.emit(G.events.COMPOSITION_BEFORE_END, e), this.scroll.batchEnd(), this.emitter.emit(G.events.COMPOSITION_END, e), this.isComposing = !1;
  }
}
class Hn {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: Hn
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
const jm = (n) => n.parentElement || n.getRootNode().host || null, Um = (n) => {
  const e = n.getBoundingClientRect(), t = "offsetWidth" in n && Math.abs(e.width) / n.offsetWidth || 1, r = "offsetHeight" in n && Math.abs(e.height) / n.offsetHeight || 1;
  return {
    top: e.top,
    right: e.left + n.clientWidth * t,
    bottom: e.top + n.clientHeight * r,
    left: e.left
  };
}, zr = (n) => {
  const e = parseInt(n, 10);
  return Number.isNaN(e) ? 0 : e;
}, Go = (n, e, t, r, s, i) => n < t && e > r ? 0 : n < t ? -(t - n + s) : e > r ? e - n > r - t ? n + s - t : e - r + i : 0, Vm = (n, e) => {
  const t = n.ownerDocument;
  let r = e, s = n;
  for (; s; ) {
    const i = s === t.body, a = i ? {
      top: 0,
      right: window.visualViewport?.width ?? t.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? t.documentElement.clientHeight,
      left: 0
    } : Um(s), l = getComputedStyle(s), u = Go(r.left, r.right, a.left, a.right, zr(l.scrollPaddingLeft), zr(l.scrollPaddingRight)), d = Go(r.top, r.bottom, a.top, a.bottom, zr(l.scrollPaddingTop), zr(l.scrollPaddingBottom));
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
        r = {
          left: r.left - h,
          top: r.top - w,
          right: r.right - h,
          bottom: r.bottom - w
        };
      }
    s = i || l.position === "fixed" ? null : jm(s);
  }
}, zm = 100, Hm = ["block", "break", "cursor", "inline", "scroll", "text"], Km = (n, e, t) => {
  const r = new Vn();
  return Hm.forEach((s) => {
    const i = e.query(s);
    i && r.register(i);
  }), n.forEach((s) => {
    let i = e.query(s);
    i || t.error(`Cannot register "${s}" specified in "formats" config. Are you sure it was registered?`);
    let a = 0;
    for (; i; )
      if (r.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, a += 1, a > zm) {
        t.error(`Cycle detected in registering blot requiredContainer: "${s}"`);
        break;
      }
  }), r;
}, Mn = Dt("quill"), Hr = new Vn();
ut.uiClass = "ql-ui";
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
    registry: Hr,
    theme: "default"
  };
  static events = G.events;
  static sources = G.sources;
  static version = "2.0.3";
  static imports = {
    delta: W,
    parchment: Tm,
    "core/module": wt,
    "core/theme": Hn
  };
  static debug(e) {
    e === !0 && (e = "log"), Dt.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return _i.get(e) || Hr.find(e, t);
  }
  static import(e) {
    return this.imports[e] == null && Mn.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), r = "attrName" in e ? e.attrName : e.blotName;
      typeof r == "string" ? this.register(`formats/${r}`, e, t) : Object.keys(e).forEach((s) => {
        this.register(s, e[s], t);
      });
    } else {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], r = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[e] != null && !r && Mn.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && Hr.register(t), typeof t.register == "function" && t.register(Hr);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = Gm(e, t), this.container = this.options.container, this.container == null) {
      Mn.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && $.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", _i.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new G();
    const s = Gi.blotName, i = this.options.registry.query(s);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${s}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Bm(this.scroll), this.selection = new $m(this.scroll, this.emitter), this.composition = new Pm(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(G.events.EDITOR_CHANGE, (a) => {
      a === G.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(G.events.SCROLL_UPDATE, (a, l) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      st.call(this, () => this.editor.update(null, l, p), a);
    }), this.emitter.on(G.events.SCROLL_EMBED_UPDATE, (a, l) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      st.call(this, () => {
        const b = new W().retain(a.offset(this)).retain({
          [a.statics.blotName]: l
        });
        return this.editor.update(b, [], p);
      }, $.sources.USER);
    }), r) {
      const a = this.clipboard.convert({
        html: `${r}<p><br></p>`,
        text: `
`
      });
      this.setContents(a);
    }
    this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable(), this.allowReadOnlyEdits = !1;
  }
  addContainer(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (typeof e == "string") {
      const r = e;
      e = document.createElement("div"), e.classList.add(r);
    }
    return this.container.insertBefore(e, t), e;
  }
  blur() {
    this.selection.setRange(null);
  }
  deleteText(e, t, r) {
    return [e, t, , r] = It(e, t, r), st.call(this, () => this.editor.deleteText(e, t), r, e, -1 * t);
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
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : G.sources.API;
    return st.call(this, () => {
      const s = this.getSelection(!0);
      let i = new W();
      if (s == null) return i;
      if (this.scroll.query(e, Z.BLOCK))
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
      return this.setSelection(s, G.sources.SILENT), i;
    }, r);
  }
  formatLine(e, t, r, s, i) {
    let a;
    return [e, t, a, i] = It(
      e,
      t,
      // @ts-expect-error
      r,
      s,
      i
    ), st.call(this, () => this.editor.formatLine(e, t, a), i, e, 0);
  }
  formatText(e, t, r, s, i) {
    let a;
    return [e, t, a, i] = It(
      // @ts-expect-error
      e,
      t,
      r,
      s,
      i
    ), st.call(this, () => this.editor.formatText(e, t, a), i, e, 0);
  }
  getBounds(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = null;
    if (typeof e == "number" ? r = this.selection.getBounds(e, t) : r = this.selection.getBounds(e.index, e.length), !r) return null;
    const s = this.container.getBoundingClientRect();
    return {
      bottom: r.bottom - s.top,
      height: r.height,
      left: r.left - s.left,
      right: r.right - s.left,
      top: r.top - s.top,
      width: r.width
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
  insertEmbed(e, t, r) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : $.sources.API;
    return st.call(this, () => this.editor.insertEmbed(e, t, r), s, e);
  }
  insertText(e, t, r, s, i) {
    let a;
    return [e, , a, i] = It(e, 0, r, s, i), st.call(this, () => this.editor.insertText(e, t, a), i, e, t.length);
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
  removeFormat(e, t, r) {
    return [e, t, , r] = It(e, t, r), st.call(this, () => this.editor.removeFormat(e, t), r, e);
  }
  scrollRectIntoView(e) {
    Vm(this.root, e);
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
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : G.sources.API;
    return st.call(this, () => {
      e = new W(e);
      const r = this.getLength(), s = this.editor.deleteText(0, r), i = this.editor.insertContents(0, e), a = this.editor.deleteText(this.getLength() - 1, 1);
      return s.compose(i).compose(a);
    }, t);
  }
  setSelection(e, t, r) {
    e == null ? this.selection.setRange(null, t || $.sources.API) : ([e, t, , r] = It(e, t, r), this.selection.setRange(new pn(Math.max(0, e), t), r), r !== G.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : G.sources.API;
    const r = new W().insert(e);
    return this.setContents(r, t);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : G.sources.USER;
    const t = this.scroll.update(e);
    return this.selection.update(e), t;
  }
  updateContents(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : G.sources.API;
    return st.call(this, () => (e = new W(e), this.editor.applyDelta(e)), t, !0);
  }
}
function Wo(n) {
  return typeof n == "string" ? document.querySelector(n) : n;
}
function ci(n) {
  return Object.entries(n ?? {}).reduce((e, t) => {
    let [r, s] = t;
    return {
      ...e,
      [r]: s === !0 ? {} : s
    };
  }, {});
}
function Zo(n) {
  return Object.fromEntries(Object.entries(n).filter((e) => e[1] !== void 0));
}
function Gm(n, e) {
  const t = Wo(n);
  if (!t)
    throw new Error("Invalid Quill container");
  const s = !e.theme || e.theme === $.DEFAULTS.theme ? Hn : $.import(`themes/${e.theme}`);
  if (!s)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: i,
    ...a
  } = $.DEFAULTS, {
    modules: l,
    ...u
  } = s.DEFAULTS;
  let d = ci(e.modules);
  d != null && d.toolbar && d.toolbar.constructor !== Object && (d = {
    ...d,
    toolbar: {
      container: d.toolbar
    }
  });
  const p = Kt({}, ci(i), ci(l), d), b = {
    ...a,
    ...Zo(u),
    ...Zo(e)
  };
  let h = e.registry;
  return h ? e.formats && Mn.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? Km(e.formats, b.registry, Mn) : b.registry, {
    ...b,
    registry: h,
    container: t,
    theme: s,
    modules: Object.entries(p).reduce((w, E) => {
      let [k, L] = E;
      if (!L) return w;
      const R = $.import(`modules/${k}`);
      return R == null ? (Mn.error(`Cannot load ${k} module. Are you sure you registered it?`), w) : {
        ...w,
        // @ts-expect-error
        [k]: Kt({}, R.DEFAULTS || {}, L)
      };
    }, {}),
    bounds: Wo(b.bounds)
  };
}
function st(n, e, t, r) {
  if (!this.isEnabled() && e === G.sources.USER && !this.allowReadOnlyEdits)
    return new W();
  let s = t == null ? null : this.getSelection();
  const i = this.editor.delta, a = n();
  if (s != null && (t === !0 && (t = s.index), r == null ? s = Yo(s, a, e) : r !== 0 && (s = Yo(s, t, r, e)), this.setSelection(s, G.sources.SILENT)), a.length() > 0) {
    const l = [G.events.TEXT_CHANGE, a, i, e];
    this.emitter.emit(G.events.EDITOR_CHANGE, ...l), e !== G.sources.SILENT && this.emitter.emit(...l);
  }
  return a;
}
function It(n, e, t, r, s) {
  let i = {};
  return typeof n.index == "number" && typeof n.length == "number" ? typeof e != "number" ? (s = r, r = t, t = e, e = n.length, n = n.index) : (e = n.length, n = n.index) : typeof e != "number" && (s = r, r = t, t = e, e = 0), typeof t == "object" ? (i = t, s = r) : typeof t == "string" && (r != null ? i[t] = r : s = t), s = s || G.sources.API, [n, e, i, s];
}
function Yo(n, e, t, r) {
  const s = typeof t == "number" ? t : 0;
  if (n == null) return null;
  let i, a;
  return e && typeof e.transformPosition == "function" ? [i, a] = [n.index, n.index + n.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(l, r !== G.sources.USER)
  )) : [i, a] = [n.index, n.index + n.length].map((l) => l < e || l === e && r === G.sources.USER ? l : s >= 0 ? l + s : Math.max(e, l + s)), new pn(i, a - i);
}
class vn extends hs {
}
function Xo(n) {
  return n instanceof De || n instanceof tt;
}
function Qo(n) {
  return typeof n.updateContent == "function";
}
class Wm extends Gi {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = De;
  static allowedChildren = [De, tt, vn];
  constructor(e, t, r) {
    let {
      emitter: s
    } = r;
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
    this.emitter.emit(G.events.SCROLL_BLOT_MOUNT, e);
  }
  emitUnmount(e) {
    this.emitter.emit(G.events.SCROLL_BLOT_UNMOUNT, e);
  }
  emitEmbedUpdate(e, t) {
    this.emitter.emit(G.events.SCROLL_EMBED_UPDATE, e, t);
  }
  deleteAt(e, t) {
    const [r, s] = this.line(e), [i] = this.line(e + t);
    if (super.deleteAt(e, t), i != null && r !== i && s > 0) {
      if (r instanceof tt || i instanceof tt) {
        this.optimize();
        return;
      }
      const a = i.children.head instanceof ht ? null : i.children.head;
      r.moveChildren(i, a), r.remove();
    }
    this.optimize();
  }
  enable() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.domNode.setAttribute("contenteditable", e ? "true" : "false");
  }
  formatAt(e, t, r, s) {
    super.formatAt(e, t, r, s), this.optimize();
  }
  insertAt(e, t, r) {
    if (e >= this.length())
      if (r == null || this.scroll.query(t, Z.BLOCK) == null) {
        const s = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(s), r == null && t.endsWith(`
`) ? s.insertAt(0, t.slice(0, -1), r) : s.insertAt(0, t, r);
      } else {
        const s = this.scroll.create(t, r);
        this.appendChild(s);
      }
    else
      super.insertAt(e, t, r);
    this.optimize();
  }
  insertBefore(e, t) {
    if (e.statics.scope === Z.INLINE_BLOT) {
      const r = this.scroll.create(this.statics.defaultChild.blotName);
      r.appendChild(e), super.insertBefore(r, t);
    } else
      super.insertBefore(e, t);
  }
  insertContents(e, t) {
    const r = this.deltaToRenderBlocks(t.concat(new W().insert(`
`))), s = r.pop();
    if (s == null) return;
    this.batchStart();
    const i = r.shift();
    if (i) {
      const u = i.type === "block" && (i.delta.length() === 0 || !this.descendant(tt, e)[0] && e < this.length()), d = i.type === "block" ? i.delta : new W().insert({
        [i.key]: i.value
      });
      di(this, e, d);
      const p = i.type === "block" ? 1 : 0, b = e + d.length() + p;
      u && this.insertAt(b - 1, `
`);
      const h = Je(this.line(e)[0]), w = nt.AttributeMap.diff(h, i.attributes) || {};
      Object.keys(w).forEach((E) => {
        this.formatAt(b - 1, 1, E, w[E]);
      }), e = b;
    }
    let [a, l] = this.children.find(e);
    if (r.length && (a && (a = a.split(l), l = 0), r.forEach((u) => {
      if (u.type === "block") {
        const d = this.createBlock(u.attributes, a || void 0);
        di(d, 0, u.delta);
      } else {
        const d = this.create(u.key, u.value);
        this.insertBefore(d, a || void 0), Object.keys(u.attributes).forEach((p) => {
          d.format(p, u.attributes[p]);
        });
      }
    })), s.type === "block" && s.delta.length()) {
      const u = a ? a.offset(a.scroll) + l : this.length();
      di(this, u, s.delta);
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
    const [r, s] = t;
    return r instanceof Ue ? [r, s] : [null, -1];
  }
  line(e) {
    return e === this.length() ? this.line(e - 1) : this.descendant(Xo, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (s, i, a) => {
      let l = [], u = a;
      return s.children.forEachAt(i, a, (d, p, b) => {
        Xo(d) ? l.push(d) : d instanceof hs && (l = l.concat(r(d, p, u))), u -= b;
      }), l;
    };
    return r(this, e, t);
  }
  optimize() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(e, t), e.length > 0 && this.emitter.emit(G.events.SCROLL_OPTIMIZE, e, t));
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
    let t = G.sources.USER;
    typeof e == "string" && (t = e), Array.isArray(e) || (e = this.observer.takeRecords()), e = e.filter((r) => {
      let {
        target: s
      } = r;
      const i = this.find(s, !0);
      return i && !Qo(i);
    }), e.length > 0 && this.emitter.emit(G.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(G.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, r) {
    const [s] = this.descendant((i) => i instanceof tt, e);
    s && s.statics.blotName === t && Qo(s) && s.updateContent(r);
  }
  handleDragStart(e) {
    e.preventDefault();
  }
  deltaToRenderBlocks(e) {
    const t = [];
    let r = new W();
    return e.forEach((s) => {
      const i = s?.insert;
      if (i)
        if (typeof i == "string") {
          const a = i.split(`
`);
          a.slice(0, -1).forEach((u) => {
            r.insert(u, s.attributes), t.push({
              type: "block",
              delta: r,
              attributes: s.attributes ?? {}
            }), r = new W();
          });
          const l = a[a.length - 1];
          l && r.insert(l, s.attributes);
        } else {
          const a = Object.keys(i)[0];
          if (!a) return;
          this.query(a, Z.INLINE) ? r.push(s) : (r.length() && t.push({
            type: "block",
            delta: r,
            attributes: {}
          }), r = new W(), t.push({
            type: "blockEmbed",
            key: a,
            value: i[a],
            attributes: s.attributes ?? {}
          }));
        }
    }), r.length() && t.push({
      type: "block",
      delta: r,
      attributes: {}
    }), t;
  }
  createBlock(e, t) {
    let r;
    const s = {};
    Object.entries(e).forEach((l) => {
      let [u, d] = l;
      this.query(u, Z.BLOCK & Z.BLOT) != null ? r = u : s[u] = d;
    });
    const i = this.create(r || this.statics.defaultChild.blotName, r ? e[r] : void 0);
    this.insertBefore(i, t || void 0);
    const a = i.length();
    return Object.entries(s).forEach((l) => {
      let [u, d] = l;
      i.formatAt(0, a, u, d);
    }), i;
  }
}
function di(n, e, t) {
  t.reduce((r, s) => {
    const i = nt.Op.length(s);
    let a = s.attributes || {};
    if (s.insert != null) {
      if (typeof s.insert == "string") {
        const l = s.insert;
        n.insertAt(r, l);
        const [u] = n.descendant(Ue, r), d = Je(u);
        a = nt.AttributeMap.diff(d, a) || {};
      } else if (typeof s.insert == "object") {
        const l = Object.keys(s.insert)[0];
        if (l == null) return r;
        if (n.insertAt(r, l, s.insert[l]), n.scroll.query(l, Z.INLINE) != null) {
          const [d] = n.descendant(Ue, r), p = Je(d);
          a = nt.AttributeMap.diff(p, a) || {};
        }
      }
    }
    return Object.keys(a).forEach((l) => {
      n.formatAt(r, i, l, a[l]);
    }), r + i;
  }, e);
}
const Zi = {
  scope: Z.BLOCK,
  whitelist: ["right", "center", "justify"]
}, Zm = new vt("align", "align", Zi), xl = new dt("align", "ql-align", Zi), wl = new Qt("align", "text-align", Zi);
class Al extends Qt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((s) => `00${parseInt(s, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const Ym = new dt("color", "ql-color", {
  scope: Z.INLINE
}), Yi = new Al("color", "color", {
  scope: Z.INLINE
}), Xm = new dt("background", "ql-bg", {
  scope: Z.INLINE
}), Xi = new Al("background", "background-color", {
  scope: Z.INLINE
});
class xn extends vn {
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("spellcheck", "false"), t;
  }
  code(e, t) {
    return this.children.map((r) => r.length() <= 1 ? "" : r.domNode.innerText).join(`
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
    $.register(xn);
  }
}
class Qi extends He {
}
Qi.blotName = "code";
Qi.tagName = "CODE";
Ke.blotName = "code-block";
Ke.className = "ql-code-block";
Ke.tagName = "DIV";
xn.blotName = "code-block-container";
xn.className = "ql-code-block-container";
xn.tagName = "DIV";
xn.allowedChildren = [Ke];
Ke.allowedChildren = [ct, ht, ot];
Ke.requiredContainer = xn;
const Ji = {
  scope: Z.BLOCK,
  whitelist: ["rtl"]
}, El = new vt("direction", "dir", Ji), Nl = new dt("direction", "ql-direction", Ji), Tl = new Qt("direction", "direction", Ji), Sl = {
  scope: Z.INLINE,
  whitelist: ["serif", "monospace"]
}, Cl = new dt("font", "ql-font", Sl);
class Qm extends Qt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const kl = new Qm("font", "font-family", Sl), _l = new dt("size", "ql-size", {
  scope: Z.INLINE,
  whitelist: ["small", "large", "huge"]
}), Ll = new Qt("size", "font-size", {
  scope: Z.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), Jm = Dt("quill:keyboard"), eg = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class ps extends wt {
  static match(e, t) {
    return ["altKey", "ctrlKey", "metaKey", "shiftKey"].some((r) => !!t[r] !== e[r] && t[r] !== null) ? !1 : t.key === e.key || t.key === e.which;
  }
  constructor(e, t) {
    super(e, t), this.bindings = {}, Object.keys(this.options.bindings).forEach((r) => {
      this.options.bindings[r] && this.addBinding(this.options.bindings[r]);
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
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const s = ng(e);
    if (s == null) {
      Jm.warn("Attempted to add invalid keyboard binding", s);
      return;
    }
    typeof t == "function" && (t = {
      handler: t
    }), typeof r == "function" && (r = {
      handler: r
    }), (Array.isArray(s.key) ? s.key : [s.key]).forEach((a) => {
      const l = {
        ...s,
        key: a,
        ...t,
        ...r
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
      const a = this.quill.getSelection();
      if (a == null || !this.quill.hasFocus()) return;
      const [l, u] = this.quill.getLine(a.index), [d, p] = this.quill.getLeaf(a.index), [b, h] = a.length === 0 ? [d, p] : this.quill.getLeaf(a.index + a.length), w = d instanceof ns ? d.value().slice(0, p) : "", E = b instanceof ns ? b.value().slice(h) : "", k = {
        collapsed: a.length === 0,
        // @ts-expect-error Fix me later
        empty: a.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(a),
        line: l,
        offset: u,
        prefix: w,
        suffix: E,
        event: e
      };
      s.some((R) => {
        if (R.collapsed != null && R.collapsed !== k.collapsed || R.empty != null && R.empty !== k.empty || R.offset != null && R.offset !== k.offset)
          return !1;
        if (Array.isArray(R.format)) {
          if (R.format.every((M) => k.format[M] == null))
            return !1;
        } else if (typeof R.format == "object" && !Object.keys(R.format).every((M) => R.format[M] === !0 ? k.format[M] != null : R.format[M] === !1 ? k.format[M] == null : Hi(R.format[M], k.format[M])))
          return !1;
        return R.prefix != null && !R.prefix.test(k.prefix) || R.suffix != null && !R.suffix.test(k.suffix) ? !1 : R.handler.call(this, a, k, R) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let a = new W().retain(e.index - r).delete(r);
    if (t.offset === 0) {
      const [l] = this.quill.getLine(e.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const d = i.formats(), p = this.quill.getFormat(e.index - 1, 1);
        if (s = nt.AttributeMap.diff(d, p) || {}, Object.keys(s).length > 0) {
          const b = new W().retain(e.index + i.length() - 2).retain(1, s);
          a = a.compose(b);
        }
      }
    }
    this.quill.updateContents(a, $.sources.USER), this.quill.focus();
  }
  handleDelete(e, t) {
    const r = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
    if (e.index >= this.quill.getLength() - r) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let a = new W().retain(e.index).delete(r);
    if (t.offset >= i.length() - 1) {
      const [l] = this.quill.getLine(e.index + 1);
      if (l) {
        const u = i.formats(), d = this.quill.getFormat(e.index, 1);
        s = nt.AttributeMap.diff(u, d) || {}, Object.keys(s).length > 0 && (a = a.retain(l.length() - 1).retain(1, s));
      }
    }
    this.quill.updateContents(a, $.sources.USER), this.quill.focus();
  }
  handleDeleteRange(e) {
    eo({
      range: e,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(e, t) {
    const r = Object.keys(t.format).reduce((i, a) => (this.quill.scroll.query(a, Z.BLOCK) && !Array.isArray(t.format[a]) && (i[a] = t.format[a]), i), {}), s = new W().retain(e.index).delete(e.length).insert(`
`, r);
    this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.focus();
  }
}
const tg = {
  bindings: {
    bold: hi("bold"),
    italic: hi("italic"),
    underline: hi("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(n, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "+1", $.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(n, e) {
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
      handler(n, e) {
        e.format.indent != null ? this.quill.format("indent", "-1", $.sources.USER) : e.format.list != null && this.quill.format("list", !1, $.sources.USER);
      }
    },
    "indent code-block": Jo(!0),
    "outdent code-block": Jo(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(n) {
        this.quill.deleteText(n.index - 1, 1, $.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(n, e) {
        if (e.format.table) return !0;
        this.quill.history.cutoff();
        const t = new W().retain(n.index).delete(n.length).insert("	");
        return this.quill.updateContents(t, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index + 1, $.sources.SILENT), !1;
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
      handler(n, e) {
        const t = {
          list: !1
        };
        e.format.indent && (t.indent = !1), this.quill.formatLine(n.index, n.length, t, $.sources.USER);
      }
    },
    "checklist enter": {
      key: "Enter",
      collapsed: !0,
      format: {
        list: "checked"
      },
      handler(n) {
        const [e, t] = this.quill.getLine(n.index), r = {
          // @ts-expect-error Fix me later
          ...e.formats(),
          list: "checked"
        }, s = new W().retain(n.index).insert(`
`, r).retain(e.length() - t - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(n.index + 1, $.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(n, e) {
        const [t, r] = this.quill.getLine(n.index), s = new W().retain(n.index).insert(`
`, e.format).retain(t.length() - r - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(n.index + 1, $.sources.SILENT), this.quill.scrollSelectionIntoView();
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
      handler(n) {
        const e = this.quill.getModule("table");
        if (e) {
          const [t, r, s, i] = e.getTable(n), a = rg(t, r, s, i);
          if (a == null) return;
          let l = t.offset();
          if (a < 0) {
            const u = new W().retain(l).insert(`
`);
            this.quill.updateContents(u, $.sources.USER), this.quill.setSelection(n.index + 1, n.length, $.sources.SILENT);
          } else if (a > 0) {
            l += t.length();
            const u = new W().retain(l).insert(`
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
      handler(n, e) {
        const {
          event: t,
          line: r
        } = e, s = r.offset(this.quill.scroll);
        t.shiftKey ? this.quill.setSelection(s - 1, $.sources.USER) : this.quill.setSelection(s + r.length(), $.sources.USER);
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
      handler(n, e) {
        if (this.quill.scroll.query("list") == null) return !0;
        const {
          length: t
        } = e.prefix, [r, s] = this.quill.getLine(n.index);
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
        this.quill.insertText(n.index, " ", $.sources.USER), this.quill.history.cutoff();
        const a = new W().retain(n.index - s).delete(t + 1).retain(r.length() - 2 - s).retain(1, {
          list: i
        });
        return this.quill.updateContents(a, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index - t, $.sources.SILENT), !1;
      }
    },
    "code exit": {
      key: "Enter",
      collapsed: !0,
      format: ["code-block"],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(n) {
        const [e, t] = this.quill.getLine(n.index);
        let r = 2, s = e;
        for (; s != null && s.length() <= 1 && s.formats()["code-block"]; )
          if (s = s.prev, r -= 1, r <= 0) {
            const i = new W().retain(n.index + e.length() - t - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(n.index - 1, $.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": Kr("ArrowLeft", !1),
    "embed left shift": Kr("ArrowLeft", !0),
    "embed right": Kr("ArrowRight", !1),
    "embed right shift": Kr("ArrowRight", !0),
    "table down": ea(!1),
    "table up": ea(!0)
  }
};
ps.DEFAULTS = tg;
function Jo(n) {
  return {
    key: "Tab",
    shiftKey: !n,
    format: {
      "code-block": !0
    },
    handler(e, t) {
      let {
        event: r
      } = t;
      const s = this.quill.scroll.query("code-block"), {
        TAB: i
      } = s;
      if (e.length === 0 && !r.shiftKey) {
        this.quill.insertText(e.index, i, $.sources.USER), this.quill.setSelection(e.index + i.length, $.sources.SILENT);
        return;
      }
      const a = e.length === 0 ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
      let {
        index: l,
        length: u
      } = e;
      a.forEach((d, p) => {
        n ? (d.insertAt(0, i), p === 0 ? l += i.length : u += i.length) : d.domNode.textContent.startsWith(i) && (d.deleteAt(0, i.length), p === 0 ? l -= i.length : u -= i.length);
      }), this.quill.update($.sources.USER), this.quill.setSelection(l, u, $.sources.SILENT);
    }
  };
}
function Kr(n, e) {
  return {
    key: n,
    shiftKey: e,
    altKey: null,
    [n === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
    handler(r) {
      let {
        index: s
      } = r;
      n === "ArrowRight" && (s += r.length + 1);
      const [i] = this.quill.getLeaf(s);
      return i instanceof Xe ? (n === "ArrowLeft" ? e ? this.quill.setSelection(r.index - 1, r.length + 1, $.sources.USER) : this.quill.setSelection(r.index - 1, $.sources.USER) : e ? this.quill.setSelection(r.index, r.length + 1, $.sources.USER) : this.quill.setSelection(r.index + r.length + 1, $.sources.USER), !1) : !0;
    }
  };
}
function hi(n) {
  return {
    key: n[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(n, !t.format[n], $.sources.USER);
    }
  };
}
function ea(n) {
  return {
    key: n ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(e, t) {
      const r = n ? "prev" : "next", s = t.line, i = s.parent[r];
      if (i != null) {
        if (i.statics.blotName === "table-row") {
          let a = i.children.head, l = s;
          for (; l.prev != null; )
            l = l.prev, a = a.next;
          const u = a.offset(this.quill.scroll) + Math.min(t.offset, a.length() - 1);
          this.quill.setSelection(u, 0, $.sources.USER);
        }
      } else {
        const a = s.table()[r];
        a != null && (n ? this.quill.setSelection(a.offset(this.quill.scroll) + a.length() - 1, 0, $.sources.USER) : this.quill.setSelection(a.offset(this.quill.scroll), 0, $.sources.USER));
      }
      return !1;
    }
  };
}
function ng(n) {
  if (typeof n == "string" || typeof n == "number")
    n = {
      key: n
    };
  else if (typeof n == "object")
    n = Bn(n);
  else
    return null;
  return n.shortKey && (n[eg] = n.shortKey, delete n.shortKey), n;
}
function eo(n) {
  let {
    quill: e,
    range: t
  } = n;
  const r = e.getLines(t);
  let s = {};
  if (r.length > 1) {
    const i = r[0].formats(), a = r[r.length - 1].formats();
    s = nt.AttributeMap.diff(a, i) || {};
  }
  e.deleteText(t, $.sources.USER), Object.keys(s).length > 0 && e.formatLine(t.index, 1, s, $.sources.USER), e.setSelection(t.index, $.sources.SILENT);
}
function rg(n, e, t, r) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? r === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const sg = /font-weight:\s*normal/, ig = ["P", "OL", "UL"], ta = (n) => n && ig.includes(n.tagName), og = (n) => {
  Array.from(n.querySelectorAll("br")).filter((e) => ta(e.previousElementSibling) && ta(e.nextElementSibling)).forEach((e) => {
    e.parentNode?.removeChild(e);
  });
}, ag = (n) => {
  Array.from(n.querySelectorAll('b[style*="font-weight"]')).filter((e) => e.getAttribute("style")?.match(sg)).forEach((e) => {
    const t = n.createDocumentFragment();
    t.append(...e.childNodes), e.parentNode?.replaceChild(t, e);
  });
};
function lg(n) {
  n.querySelector('[id^="docs-internal-guid-"]') && (ag(n), og(n));
}
const ug = /\bmso-list:[^;]*ignore/i, cg = /\bmso-list:[^;]*\bl(\d+)/i, dg = /\bmso-list:[^;]*\blevel(\d+)/i, hg = (n, e) => {
  const t = n.getAttribute("style"), r = t?.match(cg);
  if (!r)
    return null;
  const s = Number(r[1]), i = t?.match(dg), a = i ? Number(i[1]) : 1, l = new RegExp(`@list l${s}:level${a}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), u = e.match(l), d = u && u[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: s,
    indent: a,
    type: d,
    element: n
  };
}, fg = (n) => {
  const e = Array.from(n.querySelectorAll("[style*=mso-list]")), t = [], r = [];
  e.forEach((a) => {
    (a.getAttribute("style") || "").match(ug) ? t.push(a) : r.push(a);
  }), t.forEach((a) => a.parentNode?.removeChild(a));
  const s = n.documentElement.innerHTML, i = r.map((a) => hg(a, s)).filter((a) => a);
  for (; i.length; ) {
    const a = [];
    let l = i.shift();
    for (; l; )
      a.push(l), l = i.length && i[0]?.element === l.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      i[0].id === l.id ? i.shift() : null;
    const u = document.createElement("ul");
    a.forEach((b) => {
      const h = document.createElement("li");
      h.setAttribute("data-list", b.type), b.indent > 1 && h.setAttribute("class", `ql-indent-${b.indent - 1}`), h.innerHTML = b.element.innerHTML, u.appendChild(h);
    });
    const d = a[0]?.element, {
      parentNode: p
    } = d ?? {};
    d && p?.replaceChild(u, d), a.slice(1).forEach((b) => {
      let {
        element: h
      } = b;
      p?.removeChild(h);
    });
  }
};
function pg(n) {
  n.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && fg(n);
}
const mg = [pg, lg], gg = (n) => {
  n.documentElement && mg.forEach((e) => {
    e(n);
  });
}, bg = Dt("quill:clipboard"), yg = [[Node.TEXT_NODE, qg], [Node.TEXT_NODE, ra], ["br", Ng], [Node.ELEMENT_NODE, ra], [Node.ELEMENT_NODE, Eg], [Node.ELEMENT_NODE, Ag], [Node.ELEMENT_NODE, _g], ["li", Cg], ["ol, ul", kg], ["pre", Tg], ["tr", Lg], ["b", fi("bold")], ["i", fi("italic")], ["strike", fi("strike")], ["style", Sg]], vg = [Zm, El].reduce((n, e) => (n[e.keyName] = e, n), {}), na = [wl, Xi, Yi, Tl, kl, Ll].reduce((n, e) => (n[e.keyName] = e, n), {});
class xg extends wt {
  static DEFAULTS = {
    matchers: []
  };
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (r) => this.onCaptureCopy(r, !1)), this.quill.root.addEventListener("cut", (r) => this.onCaptureCopy(r, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], yg.concat(this.options.matchers ?? []).forEach((r) => {
      let [s, i] = r;
      this.addMatcher(s, i);
    });
  }
  addMatcher(e, t) {
    this.matchers.push([e, t]);
  }
  convert(e) {
    let {
      html: t,
      text: r
    } = e, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (s[Ke.blotName])
      return new W().insert(r || "", {
        [Ke.blotName]: s[Ke.blotName]
      });
    if (!t)
      return new W().insert(r || "", s);
    const i = this.convertHTML(t);
    return wr(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || s.table) ? i.compose(new W().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(e) {
    gg(e);
  }
  convertHTML(e) {
    const t = new DOMParser().parseFromString(e, "text/html");
    this.normalizeHTML(t);
    const r = t.body, s = /* @__PURE__ */ new WeakMap(), [i, a] = this.prepareMatching(r, s);
    return to(this.quill.scroll, r, i, a, s);
  }
  dangerouslyPasteHTML(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : $.sources.API;
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
      this.quill.updateContents(new W().retain(e).concat(s), r), this.quill.setSelection(e + s.length(), $.sources.SILENT);
    }
  }
  onCaptureCopy(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (e.defaultPrevented) return;
    e.preventDefault();
    const [r] = this.quill.selection.getRange();
    if (r == null) return;
    const {
      html: s,
      text: i
    } = this.onCopy(r, t);
    e.clipboardData?.setData("text/plain", i), e.clipboardData?.setData("text/html", s), t && eo({
      range: r,
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
    const r = e.clipboardData?.getData("text/html");
    let s = e.clipboardData?.getData("text/plain");
    if (!r && !s) {
      const a = e.clipboardData?.getData("text/uri-list");
      a && (s = this.normalizeURIList(a));
    }
    const i = Array.from(e.clipboardData?.files || []);
    if (!r && i.length > 0) {
      this.quill.uploader.upload(t, i);
      return;
    }
    if (r && i.length > 0) {
      const a = new DOMParser().parseFromString(r, "text/html");
      if (a.body.childElementCount === 1 && a.body.firstElementChild?.tagName === "IMG") {
        this.quill.uploader.upload(t, i);
        return;
      }
    }
    this.onPaste(t, {
      html: r,
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
      text: r,
      html: s
    } = t;
    const i = this.quill.getFormat(e.index), a = this.convert({
      text: r,
      html: s
    }, i);
    bg.log("onPaste", a, {
      text: r,
      html: s
    });
    const l = new W().retain(e.index).delete(e.length).concat(a);
    this.quill.updateContents(l, $.sources.USER), this.quill.setSelection(l.length() - e.length, $.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(e, t) {
    const r = [], s = [];
    return this.matchers.forEach((i) => {
      const [a, l] = i;
      switch (a) {
        case Node.TEXT_NODE:
          s.push(l);
          break;
        case Node.ELEMENT_NODE:
          r.push(l);
          break;
        default:
          Array.from(e.querySelectorAll(a)).forEach((u) => {
            t.has(u) ? t.get(u)?.push(l) : t.set(u, [l]);
          });
          break;
      }
    }), [r, s];
  }
}
function wn(n, e, t, r) {
  return r.query(e) ? n.reduce((s, i) => {
    if (!i.insert) return s;
    if (i.attributes && i.attributes[e])
      return s.push(i);
    const a = t ? {
      [e]: t
    } : {};
    return s.insert(i.insert, {
      ...a,
      ...i.attributes
    });
  }, new W()) : n;
}
function wr(n, e) {
  let t = "";
  for (let r = n.ops.length - 1; r >= 0 && t.length < e.length; --r) {
    const s = n.ops[r];
    if (typeof s.insert != "string") break;
    t = s.insert + t;
  }
  return t.slice(-1 * e.length) === e;
}
function Ht(n, e) {
  if (!(n instanceof Element)) return !1;
  const t = e.query(n);
  return t && t.prototype instanceof Xe ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(n.tagName.toLowerCase());
}
function wg(n, e) {
  return n.previousElementSibling && n.nextElementSibling && !Ht(n.previousElementSibling, e) && !Ht(n.nextElementSibling, e);
}
const Gr = /* @__PURE__ */ new WeakMap();
function ql(n) {
  return n == null ? !1 : (Gr.has(n) || (n.tagName === "PRE" ? Gr.set(n, !0) : Gr.set(n, ql(n.parentNode))), Gr.get(n));
}
function to(n, e, t, r, s) {
  return e.nodeType === e.TEXT_NODE ? r.reduce((i, a) => a(e, i, n), new W()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, a) => {
    let l = to(n, a, t, r, s);
    return a.nodeType === e.ELEMENT_NODE && (l = t.reduce((u, d) => d(a, u, n), l), l = (s.get(a) || []).reduce((u, d) => d(a, u, n), l)), i.concat(l);
  }, new W()) : new W();
}
function fi(n) {
  return (e, t, r) => wn(t, n, !0, r);
}
function Ag(n, e, t) {
  const r = vt.keys(n), s = dt.keys(n), i = Qt.keys(n), a = {};
  return r.concat(s).concat(i).forEach((l) => {
    let u = t.query(l, Z.ATTRIBUTE);
    u != null && (a[u.attrName] = u.value(n), a[u.attrName]) || (u = vg[l], u != null && (u.attrName === l || u.keyName === l) && (a[u.attrName] = u.value(n) || void 0), u = na[l], u != null && (u.attrName === l || u.keyName === l) && (u = na[l], a[u.attrName] = u.value(n) || void 0));
  }), Object.entries(a).reduce((l, u) => {
    let [d, p] = u;
    return wn(l, d, p, t);
  }, e);
}
function Eg(n, e, t) {
  const r = t.query(n);
  if (r == null) return e;
  if (r.prototype instanceof Xe) {
    const s = {}, i = r.value(n);
    if (i != null)
      return s[r.blotName] = i, new W().insert(s, r.formats(n, t));
  } else if (r.prototype instanceof mr && !wr(e, `
`) && e.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return wn(e, r.blotName, r.formats(n, t), t);
  return e;
}
function Ng(n, e) {
  return wr(e, `
`) || e.insert(`
`), e;
}
function Tg(n, e, t) {
  const r = t.query("code-block"), s = r && "formats" in r && typeof r.formats == "function" ? r.formats(n, t) : !0;
  return wn(e, "code-block", s, t);
}
function Sg() {
  return new W();
}
function Cg(n, e, t) {
  const r = t.query(n);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !wr(e, `
`))
    return e;
  let s = -1, i = n.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (s += 1), i = i.parentNode;
  return s <= 0 ? e : e.reduce((a, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? a.push(l) : a.insert(l.insert, {
    indent: s,
    ...l.attributes || {}
  }) : a, new W());
}
function kg(n, e, t) {
  const r = n;
  let s = r.tagName === "OL" ? "ordered" : "bullet";
  const i = r.getAttribute("data-checked");
  return i && (s = i === "true" ? "checked" : "unchecked"), wn(e, "list", s, t);
}
function ra(n, e, t) {
  if (!wr(e, `
`)) {
    if (Ht(n, t) && (n.childNodes.length > 0 || n instanceof HTMLParagraphElement))
      return e.insert(`
`);
    if (e.length() > 0 && n.nextSibling) {
      let r = n.nextSibling;
      for (; r != null; ) {
        if (Ht(r, t))
          return e.insert(`
`);
        const s = t.query(r);
        if (s && s.prototype instanceof tt)
          return e.insert(`
`);
        r = r.firstChild;
      }
    }
  }
  return e;
}
function _g(n, e, t) {
  const r = {}, s = n.style || {};
  return s.fontStyle === "italic" && (r.italic = !0), s.textDecoration === "underline" && (r.underline = !0), s.textDecoration === "line-through" && (r.strike = !0), (s.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(s.fontWeight, 10) >= 700) && (r.bold = !0), e = Object.entries(r).reduce((i, a) => {
    let [l, u] = a;
    return wn(i, l, u, t);
  }, e), parseFloat(s.textIndent || 0) > 0 ? new W().insert("	").concat(e) : e;
}
function Lg(n, e, t) {
  const r = n.parentElement?.tagName === "TABLE" ? n.parentElement : n.parentElement?.parentElement;
  if (r != null) {
    const i = Array.from(r.querySelectorAll("tr")).indexOf(n) + 1;
    return wn(e, "table", i, t);
  }
  return e;
}
function qg(n, e, t) {
  let r = n.data;
  if (n.parentElement?.tagName === "O:P")
    return e.insert(r.trim());
  if (!ql(n)) {
    if (r.trim().length === 0 && r.includes(`
`) && !wg(n, t))
      return e;
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (n.previousSibling == null && n.parentElement != null && Ht(n.parentElement, t) || n.previousSibling instanceof Element && Ht(n.previousSibling, t)) && (r = r.replace(/^ /, "")), (n.nextSibling == null && n.parentElement != null && Ht(n.parentElement, t) || n.nextSibling instanceof Element && Ht(n.nextSibling, t)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return e.insert(r);
}
class Ig extends wt {
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
    super(e, t), this.quill.on($.events.EDITOR_CHANGE, (r, s, i, a) => {
      r === $.events.SELECTION_CHANGE ? s && a !== $.sources.SILENT && (this.currentRange = s) : r === $.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || a === $.sources.USER ? this.record(s, i) : this.transform(s)), this.currentRange = Ii(this.currentRange, s));
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
    }, this.redo.bind(this)), this.quill.root.addEventListener("beforeinput", (r) => {
      r.inputType === "historyUndo" ? (this.undo(), r.preventDefault()) : r.inputType === "historyRedo" && (this.redo(), r.preventDefault());
    });
  }
  change(e, t) {
    if (this.stack[e].length === 0) return;
    const r = this.stack[e].pop();
    if (!r) return;
    const s = this.quill.getContents(), i = r.delta.invert(s);
    this.stack[t].push({
      delta: i,
      range: Ii(r.range, i)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(r.delta, $.sources.USER), this.ignoreChange = !1, this.restoreSelection(r);
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
    let r = e.invert(t), s = this.currentRange;
    const i = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > i && this.stack.undo.length > 0
    ) {
      const a = this.stack.undo.pop();
      a && (r = r.compose(a.delta), s = a.range);
    } else
      this.lastRecorded = i;
    r.length() !== 0 && (this.stack.undo.push({
      delta: r,
      range: s
    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(e) {
    sa(this.stack.undo, e), sa(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, $.sources.USER);
    else {
      const t = Rg(this.quill.scroll, e.delta);
      this.quill.setSelection(t, $.sources.USER);
    }
  }
}
function sa(n, e) {
  let t = e;
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const s = n[r];
    n[r] = {
      delta: t.transform(s.delta, !0),
      range: s.range && Ii(s.range, t)
    }, t = s.delta.transform(t), n[r].delta.length() === 0 && n.splice(r, 1);
  }
}
function Og(n, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((r) => n.query(r, Z.BLOCK) != null) : !1;
}
function Rg(n, e) {
  const t = e.reduce((s, i) => s + (i.delete || 0), 0);
  let r = e.length() - t;
  return Og(n, e) && (r -= 1), r;
}
function Ii(n, e) {
  if (!n) return n;
  const t = e.transformPosition(n.index), r = e.transformPosition(n.index + n.length);
  return {
    index: t,
    length: r - t
  };
}
class Il extends wt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("drop", (r) => {
      r.preventDefault();
      let s = null;
      if (document.caretRangeFromPoint)
        s = document.caretRangeFromPoint(r.clientX, r.clientY);
      else if (document.caretPositionFromPoint) {
        const a = document.caretPositionFromPoint(r.clientX, r.clientY);
        s = document.createRange(), s.setStart(a.offsetNode, a.offset), s.setEnd(a.offsetNode, a.offset);
      }
      const i = s && e.selection.normalizeNative(s);
      if (i) {
        const a = e.selection.normalizedToRange(i);
        r.dataTransfer?.files && this.upload(a, r.dataTransfer.files);
      }
    });
  }
  upload(e, t) {
    const r = [];
    Array.from(t).forEach((s) => {
      s && this.options.mimetypes?.includes(s.type) && r.push(s);
    }), r.length > 0 && this.options.handler.call(this, e, r);
  }
}
Il.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(n, e) {
    if (!this.quill.scroll.query("image"))
      return;
    const t = e.map((r) => new Promise((s) => {
      const i = new FileReader();
      i.onload = () => {
        s(i.result);
      }, i.readAsDataURL(r);
    }));
    Promise.all(t).then((r) => {
      const s = r.reduce((i, a) => i.insert({
        image: a
      }), new W().retain(n.index).delete(n.length));
      this.quill.updateContents(s, G.sources.USER), this.quill.setSelection(n.index + r.length, G.sources.SILENT);
    });
  }
};
const $g = ["insertText", "insertReplacementText"];
class Dg extends wt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("beforeinput", (r) => {
      this.handleBeforeInput(r);
    }), /Android/i.test(navigator.userAgent) || e.on($.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(e) {
    eo({
      range: e,
      quill: this.quill
    });
  }
  replaceText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (e.length === 0) return !1;
    if (t) {
      const r = this.quill.getFormat(e.index, 1);
      this.deleteRange(e), this.quill.updateContents(new W().retain(e.index).insert(t, r), $.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, $.sources.SILENT), !0;
  }
  handleBeforeInput(e) {
    if (this.quill.composition.isComposing || e.defaultPrevented || !$g.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const r = Bg(e);
    if (r == null)
      return;
    const s = this.quill.selection.normalizeNative(t), i = s ? this.quill.selection.normalizedToRange(s) : null;
    i && this.replaceText(i, r) && e.preventDefault();
  }
  handleCompositionStart() {
    const e = this.quill.getSelection();
    e && this.replaceText(e);
  }
}
function Bg(n) {
  return typeof n.data == "string" ? n.data : n.dataTransfer?.types.includes("text/plain") ? n.dataTransfer.getData("text/plain") : null;
}
const Fg = /Mac/i.test(navigator.platform), Mg = 100, Pg = (n) => !!(n.key === "ArrowLeft" || n.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
n.key === "ArrowUp" || n.key === "ArrowDown" || n.key === "Home" || Fg && n.key === "a" && n.ctrlKey === !0);
class jg extends wt {
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
          line: r,
          event: s
        } = t;
        if (!(r instanceof ut) || !r.uiNode)
          return !0;
        const i = getComputedStyle(r.domNode).direction === "rtl";
        return i && s.key !== "ArrowRight" || !i && s.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (s.shiftKey ? 1 : 0), $.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && Pg(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + Mg, this.isListening) return;
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
    const r = this.quill.scroll.find(t.startContainer);
    if (!(r instanceof ut) || !r.uiNode) return;
    const s = document.createRange();
    s.setStartAfter(r.uiNode), s.setEndAfter(r.uiNode), e.removeAllRanges(), e.addRange(s);
  }
}
$.register({
  "blots/block": De,
  "blots/block/embed": tt,
  "blots/break": ht,
  "blots/container": vn,
  "blots/cursor": ot,
  "blots/embed": Wi,
  "blots/inline": He,
  "blots/scroll": Wm,
  "blots/text": ct,
  "modules/clipboard": xg,
  "modules/history": Ig,
  "modules/keyboard": ps,
  "modules/uploader": Il,
  "modules/input": Dg,
  "modules/uiNode": jg
});
class Ug extends dt {
  add(e, t) {
    let r = 0;
    if (t === "+1" || t === "-1") {
      const s = this.value(e) || 0;
      r = t === "+1" ? s + 1 : s - 1;
    } else typeof t == "number" && (r = t);
    return r === 0 ? (this.remove(e), !0) : super.add(e, r.toString());
  }
  canAdd(e, t) {
    return super.canAdd(e, t) || super.canAdd(e, parseInt(t, 10));
  }
  value(e) {
    return parseInt(super.value(e), 10) || void 0;
  }
}
const Vg = new Ug("indent", "ql-indent", {
  scope: Z.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class zg extends De {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class Hg extends De {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
class Ar extends vn {
}
Ar.blotName = "list-container";
Ar.tagName = "OL";
class Er extends De {
  static create(e) {
    const t = super.create();
    return t.setAttribute("data-list", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-list") || void 0;
  }
  static register() {
    $.register(Ar);
  }
  constructor(e, t) {
    super(e, t);
    const r = t.ownerDocument.createElement("span"), s = (i) => {
      if (!e.isEnabled()) return;
      const a = this.statics.formats(t, e);
      a === "checked" ? (this.format("list", "unchecked"), i.preventDefault()) : a === "unchecked" && (this.format("list", "checked"), i.preventDefault());
    };
    r.addEventListener("mousedown", s), r.addEventListener("touchstart", s), this.attachUI(r);
  }
  format(e, t) {
    e === this.statics.blotName && t ? this.domNode.setAttribute("data-list", t) : super.format(e, t);
  }
}
Er.blotName = "list";
Er.tagName = "LI";
Ar.allowedChildren = [Er];
Er.requiredContainer = Ar;
class no extends He {
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
class Kg extends no {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class rs extends He {
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
function Ol(n, e) {
  const t = document.createElement("a");
  t.href = n;
  const r = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(r) > -1;
}
class Gg extends He {
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
class Wg extends no {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class Zg extends He {
  static blotName = "underline";
  static tagName = "U";
}
class Yg extends Wi {
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
const ia = ["alt", "height", "width"];
let Xg = class extends Xe {
  static blotName = "image";
  static tagName = "IMG";
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return ia.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
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
    ia.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
};
const oa = ["height", "width"];
class Qg extends tt {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return oa.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static sanitize(e) {
    return rs.sanitize(e);
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    oa.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
  html() {
    const {
      video: e
    } = this.value();
    return `<a href="${e}">${e}</a>`;
  }
}
const ir = new dt("code-token", "hljs", {
  scope: Z.INLINE
});
class Rt extends He {
  static formats(e, t) {
    for (; e != null && e !== t.domNode; ) {
      if (e.classList && e.classList.contains(Ke.className))
        return super.formats(e, t);
      e = e.parentNode;
    }
  }
  constructor(e, t, r) {
    super(e, t, r), ir.add(this.domNode, r);
  }
  format(e, t) {
    e !== Rt.blotName ? super.format(e, t) : t ? ir.add(this.domNode, t) : (ir.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), ir.value(this.domNode) || this.unwrap();
  }
}
Rt.blotName = "code-token";
Rt.className = "ql-token";
class et extends Ke {
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
class cr extends xn {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(e, t) {
    e === et.blotName && (this.forceNext = !0, this.children.forEach((r) => {
      r.format(e, t);
    }));
  }
  formatAt(e, t, r, s) {
    r === et.blotName && (this.forceNext = !0), super.formatAt(e, t, r, s);
  }
  highlight(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const s = `${Array.from(this.domNode.childNodes).filter((a) => a !== this.uiNode).map((a) => a.textContent).join(`
`)}
`, i = et.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== s) {
      if (s.trim().length > 0 || this.cachedText == null) {
        const a = this.children.reduce((u, d) => u.concat(yl(d, !1)), new W()), l = e(s, i);
        a.diff(l).reduce((u, d) => {
          let {
            retain: p,
            attributes: b
          } = d;
          return p ? (b && Object.keys(b).forEach((h) => {
            [et.blotName, Rt.blotName].includes(h) && this.formatAt(u, p, h, b[h]);
          }), u + p) : u;
        }, 0);
      }
      this.cachedText = s, this.forceNext = !1;
    }
  }
  html(e, t) {
    const [r] = this.children.find(e);
    return `<pre data-language="${r ? et.formats(r.domNode) : "plain"}">
${fs(this.code(e, t))}
</pre>`;
  }
  optimize(e) {
    if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
      const t = et.formats(this.children.head.domNode);
      t !== this.uiNode.value && (this.uiNode.value = t);
    }
  }
}
cr.allowedChildren = [et];
et.requiredContainer = cr;
et.allowedChildren = [Rt, ot, ct, ht];
const Jg = (n, e, t) => {
  if (typeof n.versionString == "string") {
    const r = n.versionString.split(".")[0];
    if (parseInt(r, 10) >= 11)
      return n.highlight(t, {
        language: e
      }).value;
  }
  return n.highlight(e, t).value;
};
class Rl extends wt {
  static register() {
    $.register(Rt, !0), $.register(et, !0), $.register(cr, !0);
  }
  constructor(e, t) {
    if (super(e, t), this.options.hljs == null)
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    this.languages = this.options.languages.reduce((r, s) => {
      let {
        key: i
      } = s;
      return r[i] = !0, r;
    }, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
  }
  initListener() {
    this.quill.on($.events.SCROLL_BLOT_MOUNT, (e) => {
      if (!(e instanceof cr)) return;
      const t = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((r) => {
        let {
          key: s,
          label: i
        } = r;
        const a = t.ownerDocument.createElement("option");
        a.textContent = i, a.setAttribute("value", s), t.appendChild(a);
      }), t.addEventListener("change", () => {
        e.format(et.blotName, t.value), this.quill.root.focus(), this.highlight(e, !0);
      }), e.uiNode == null && (e.attachUI(t), e.children.head && (t.value = et.formats(e.children.head.domNode)));
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
    const r = this.quill.getSelection();
    (e == null ? this.quill.scroll.descendants(cr) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update($.sources.SILENT), r != null && this.quill.setSelection(r, $.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return fs(e).split(`
`).reduce((s, i, a) => (a !== 0 && s.insert(`
`, {
        [Ke.blotName]: t
      }), s.insert(i)), new W());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(Ke.className), r.innerHTML = Jg(this.options.hljs, t, e), to(this.quill.scroll, r, [(s, i) => {
      const a = ir.value(s);
      return a ? i.compose(new W().retain(i.length(), {
        [Rt.blotName]: a
      })) : i;
    }], [(s, i) => s.data.split(`
`).reduce((a, l, u) => (u !== 0 && a.insert(`
`, {
      [Ke.blotName]: t
    }), a.insert(l)), i)], /* @__PURE__ */ new WeakMap());
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
class at extends De {
  static blotName = "table";
  static tagName = "TD";
  static create(e) {
    const t = super.create();
    return e ? t.setAttribute("data-row", e) : t.setAttribute("data-row", ro()), t;
  }
  static formats(e) {
    if (e.hasAttribute("data-row"))
      return e.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(e, t) {
    e === at.blotName && t ? this.domNode.setAttribute("data-row", t) : super.format(e, t);
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
class mn extends vn {
  static blotName = "table-row";
  static tagName = "TR";
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const e = this.children.head.formats(), t = this.children.tail.formats(), r = this.next.children.head.formats(), s = this.next.children.tail.formats();
      return e.table === t.table && e.table === r.table && e.table === s.table;
    }
    return !1;
  }
  optimize(e) {
    super.optimize(e), this.children.forEach((t) => {
      if (t.next == null) return;
      const r = t.formats(), s = t.next.formats();
      if (r.table !== s.table) {
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
class Gt extends vn {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class ss extends vn {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const e = this.descendants(mn), t = e.reduce((r, s) => Math.max(s.children.length, r), 0);
    e.forEach((r) => {
      new Array(t - r.children.length).fill(0).forEach(() => {
        let s;
        r.children.head != null && (s = at.formats(r.children.head.domNode));
        const i = this.scroll.create(at.blotName, s);
        r.appendChild(i), i.optimize();
      });
    });
  }
  cells(e) {
    return this.rows().map((t) => t.children.at(e));
  }
  deleteColumn(e) {
    const [t] = this.descendant(Gt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e);
      s?.remove();
    });
  }
  insertColumn(e) {
    const [t] = this.descendant(Gt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e), i = at.formats(r.children.head.domNode), a = this.scroll.create(at.blotName, i);
      r.insertBefore(a, s);
    });
  }
  insertRow(e) {
    const [t] = this.descendant(Gt);
    if (t == null || t.children.head == null) return;
    const r = ro(), s = this.scroll.create(mn.blotName);
    t.children.head.children.forEach(() => {
      const a = this.scroll.create(at.blotName, r);
      s.appendChild(a);
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
Gt.allowedChildren = [mn];
mn.requiredContainer = Gt;
mn.allowedChildren = [at];
at.requiredContainer = mn;
function ro() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class e1 extends wt {
  static register() {
    $.register(at), $.register(mn), $.register(Gt), $.register(ss);
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
    const [t, r] = this.quill.getLine(e.index);
    if (t == null || t.statics.blotName !== at.blotName)
      return [null, null, null, -1];
    const s = t.parent;
    return [s.parent.parent, s, t, r];
  }
  insertColumn(e) {
    const t = this.quill.getSelection();
    if (!t) return;
    const [r, s, i] = this.getTable(t);
    if (i == null) return;
    const a = i.cellOffset();
    r.insertColumn(a + e), this.quill.update($.sources.USER);
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
    const [r, s, i] = this.getTable(t);
    if (i == null) return;
    const a = s.rowOffset();
    r.insertRow(a + e), this.quill.update($.sources.USER), e > 0 ? this.quill.setSelection(t, $.sources.SILENT) : this.quill.setSelection(t.index + s.children.length, t.length, $.sources.SILENT);
  }
  insertRowAbove() {
    this.insertRow(0);
  }
  insertRowBelow() {
    this.insertRow(1);
  }
  insertTable(e, t) {
    const r = this.quill.getSelection();
    if (r == null) return;
    const s = new Array(e).fill(0).reduce((i) => {
      const a = new Array(t).fill(`
`).join("");
      return i.insert(a, {
        table: ro()
      });
    }, new W().retain(r.index));
    this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(r.index, $.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on($.events.SCROLL_OPTIMIZE, (e) => {
      e.some((t) => ["TD", "TR", "TBODY", "TABLE"].includes(t.target.tagName) ? (this.quill.once($.events.TEXT_CHANGE, (r, s, i) => {
        i === $.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const aa = Dt("quill:toolbar");
class so extends wt {
  constructor(e, t) {
    if (super(e, t), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), t1(r, this.options.container), e.container?.parentNode?.insertBefore(r, e.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      aa.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      const s = this.options.handlers?.[r];
      s && this.addHandler(r, s);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on($.events.EDITOR_CHANGE, () => {
      const [r] = this.quill.selection.getRange();
      this.update(r);
    });
  }
  addHandler(e, t) {
    this.handlers[e] = t;
  }
  attach(e) {
    let t = Array.from(e.classList).find((s) => s.indexOf("ql-") === 0);
    if (!t) return;
    if (t = t.slice(3), e.tagName === "BUTTON" && e.setAttribute("type", "button"), this.handlers[t] == null && this.quill.scroll.query(t) == null) {
      aa.warn("ignoring attaching to nonexistent format", t, e);
      return;
    }
    const r = e.tagName === "SELECT" ? "change" : "click";
    e.addEventListener(r, (s) => {
      let i;
      if (e.tagName === "SELECT") {
        if (e.selectedIndex < 0) return;
        const l = e.options[e.selectedIndex];
        l.hasAttribute("selected") ? i = !1 : i = l.value || !1;
      } else
        e.classList.contains("ql-active") ? i = !1 : i = e.value || !e.hasAttribute("value"), s.preventDefault();
      this.quill.focus();
      const [a] = this.quill.selection.getRange();
      if (this.handlers[t] != null)
        this.handlers[t].call(this, i);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(t).prototype instanceof Xe
      ) {
        if (i = prompt(`Enter ${t}`), !i) return;
        this.quill.updateContents(new W().retain(a.index).delete(a.length).insert({
          [t]: i
        }), $.sources.USER);
      } else
        this.quill.format(t, i, $.sources.USER);
      this.update(a);
    }), this.controls.push([t, e]);
  }
  update(e) {
    const t = e == null ? {} : this.quill.getFormat(e);
    this.controls.forEach((r) => {
      const [s, i] = r;
      if (i.tagName === "SELECT") {
        let a = null;
        if (e == null)
          a = null;
        else if (t[s] == null)
          a = i.querySelector("option[selected]");
        else if (!Array.isArray(t[s])) {
          let l = t[s];
          typeof l == "string" && (l = l.replace(/"/g, '\\"')), a = i.querySelector(`option[value="${l}"]`);
        }
        a == null ? (i.value = "", i.selectedIndex = -1) : a.selected = !0;
      } else if (e == null)
        i.classList.remove("ql-active"), i.setAttribute("aria-pressed", "false");
      else if (i.hasAttribute("value")) {
        const a = t[s], l = a === i.getAttribute("value") || a != null && a.toString() === i.getAttribute("value") || a == null && !i.getAttribute("value");
        i.classList.toggle("ql-active", l), i.setAttribute("aria-pressed", l.toString());
      } else {
        const a = t[s] != null;
        i.classList.toggle("ql-active", a), i.setAttribute("aria-pressed", a.toString());
      }
    });
  }
}
so.DEFAULTS = {};
function la(n, e, t) {
  const r = document.createElement("button");
  r.setAttribute("type", "button"), r.classList.add(`ql-${e}`), r.setAttribute("aria-pressed", "false"), t != null ? (r.value = t, r.setAttribute("aria-label", `${e}: ${t}`)) : r.setAttribute("aria-label", e), n.appendChild(r);
}
function t1(n, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const r = document.createElement("span");
    r.classList.add("ql-formats"), t.forEach((s) => {
      if (typeof s == "string")
        la(r, s);
      else {
        const i = Object.keys(s)[0], a = s[i];
        Array.isArray(a) ? n1(r, i, a) : la(r, i, a);
      }
    }), n.appendChild(r);
  });
}
function n1(n, e, t) {
  const r = document.createElement("select");
  r.classList.add(`ql-${e}`), t.forEach((s) => {
    const i = document.createElement("option");
    s !== !1 ? i.setAttribute("value", String(s)) : i.setAttribute("selected", "selected"), r.appendChild(i);
  }), n.appendChild(r);
}
so.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const n = this.quill.getSelection();
      if (n != null)
        if (n.length === 0) {
          const e = this.quill.getFormat();
          Object.keys(e).forEach((t) => {
            this.quill.scroll.query(t, Z.INLINE) != null && this.quill.format(t, !1, $.sources.USER);
          });
        } else
          this.quill.removeFormat(n.index, n.length, $.sources.USER);
    },
    direction(n) {
      const {
        align: e
      } = this.quill.getFormat();
      n === "rtl" && e == null ? this.quill.format("align", "right", $.sources.USER) : !n && e === "right" && this.quill.format("align", !1, $.sources.USER), this.quill.format("direction", n, $.sources.USER);
    },
    indent(n) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e), r = parseInt(t.indent || 0, 10);
      if (n === "+1" || n === "-1") {
        let s = n === "+1" ? 1 : -1;
        t.direction === "rtl" && (s *= -1), this.quill.format("indent", r + s, $.sources.USER);
      }
    },
    link(n) {
      n === !0 && (n = prompt("Enter link URL:")), this.quill.format("link", n, $.sources.USER);
    },
    list(n) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e);
      n === "check" ? t.list === "checked" || t.list === "unchecked" ? this.quill.format("list", !1, $.sources.USER) : this.quill.format("list", "unchecked", $.sources.USER) : this.quill.format("list", n, $.sources.USER);
    }
  }
};
const r1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', s1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', i1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', o1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', a1 = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', l1 = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', u1 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', c1 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', ua = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', d1 = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', h1 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', f1 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', p1 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', m1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', g1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', b1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', y1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', v1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', x1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', w1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', A1 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', E1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', N1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', T1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', S1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', C1 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', k1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', _1 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', L1 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', q1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', I1 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', O1 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', R1 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', br = {
  align: {
    "": r1,
    center: s1,
    right: i1,
    justify: o1
  },
  background: a1,
  blockquote: l1,
  bold: u1,
  clean: c1,
  code: ua,
  "code-block": ua,
  color: d1,
  direction: {
    "": h1,
    rtl: f1
  },
  formula: p1,
  header: {
    1: m1,
    2: g1,
    3: b1,
    4: y1,
    5: v1,
    6: x1
  },
  italic: w1,
  image: A1,
  indent: {
    "+1": E1,
    "-1": N1
  },
  link: T1,
  list: {
    bullet: S1,
    check: C1,
    ordered: k1
  },
  script: {
    sub: _1,
    super: L1
  },
  strike: q1,
  table: I1,
  underline: O1,
  video: R1
}, $1 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let ca = 0;
function da(n, e) {
  n.setAttribute(e, `${n.getAttribute(e) !== "true"}`);
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
    this.container.classList.toggle("ql-expanded"), da(this.label, "aria-expanded"), da(this.options, "aria-hidden");
  }
  buildItem(e) {
    const t = document.createElement("span");
    t.tabIndex = "0", t.setAttribute("role", "button"), t.classList.add("ql-picker-item");
    const r = e.getAttribute("value");
    return r && t.setAttribute("data-value", r), e.textContent && t.setAttribute("data-label", e.textContent), t.addEventListener("click", () => {
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
    return e.classList.add("ql-picker-label"), e.innerHTML = $1, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
  }
  buildOptions() {
    const e = document.createElement("span");
    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${ca}`, ca += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
      const r = this.buildItem(t);
      e.appendChild(r), t.selected === !0 && this.selectItem(r);
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
    const r = this.container.querySelector(".ql-selected");
    e !== r && (r?.classList.remove("ql-selected"), e != null && (e.classList.add("ql-selected"), this.select.selectedIndex = Array.from(e.parentNode.children).indexOf(e), e.hasAttribute("data-value") ? this.label.setAttribute("data-value", e.getAttribute("data-value")) : this.label.removeAttribute("data-value"), e.hasAttribute("data-label") ? this.label.setAttribute("data-label", e.getAttribute("data-label")) : this.label.removeAttribute("data-label"), t && (this.select.dispatchEvent(new Event("change")), this.close())));
  }
  update() {
    let e;
    if (this.select.selectedIndex > -1) {
      const r = (
        // @ts-expect-error Fix me later
        this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex]
      );
      e = this.select.options[this.select.selectedIndex], this.selectItem(r);
    } else
      this.selectItem(null);
    const t = e != null && e !== this.select.querySelector("option[selected]");
    this.label.classList.toggle("ql-active", t);
  }
}
class $l extends ms {
  constructor(e, t) {
    super(e), this.label.innerHTML = t, this.container.classList.add("ql-color-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((r) => {
      r.classList.add("ql-primary");
    });
  }
  buildItem(e) {
    const t = super.buildItem(e);
    return t.style.backgroundColor = e.getAttribute("value") || "", t;
  }
  selectItem(e, t) {
    super.selectItem(e, t);
    const r = this.label.querySelector(".ql-color-label"), s = e && e.getAttribute("data-value") || "";
    r && (r.tagName === "line" ? r.style.stroke = s : r.style.fill = s);
  }
}
class Dl extends ms {
  constructor(e, t) {
    super(e), this.container.classList.add("ql-icon-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((r) => {
      r.innerHTML = t[r.getAttribute("data-value") || ""];
    }), this.defaultItem = this.container.querySelector(".ql-selected"), this.selectItem(this.defaultItem);
  }
  selectItem(e, t) {
    super.selectItem(e, t);
    const r = e || this.defaultItem;
    if (r != null) {
      if (this.label.innerHTML === r.innerHTML) return;
      this.label.innerHTML = r.innerHTML;
    }
  }
}
const D1 = (n) => {
  const {
    overflowY: e
  } = getComputedStyle(n, null);
  return e !== "visible" && e !== "clip";
};
class Bl {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, D1(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
      this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
    }), this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(e) {
    const t = e.left + e.width / 2 - this.root.offsetWidth / 2, r = e.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${t}px`, this.root.style.top = `${r}px`, this.root.classList.remove("ql-flip");
    const s = this.boundsContainer.getBoundingClientRect(), i = this.root.getBoundingClientRect();
    let a = 0;
    if (i.right > s.right && (a = s.right - i.right, this.root.style.left = `${t + a}px`), i.left < s.left && (a = s.left - i.left, this.root.style.left = `${t + a}px`), i.bottom > s.bottom) {
      const l = i.bottom - i.top, u = e.bottom - e.top + l;
      this.root.style.top = `${r - u}px`, this.root.classList.add("ql-flip");
    }
    return a;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const B1 = [!1, "center", "right", "justify"], F1 = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], M1 = [!1, "serif", "monospace"], P1 = ["1", "2", "3", !1], j1 = ["small", !1, "large", "huge"];
class Nr extends Hn {
  constructor(e, t) {
    super(e, t);
    const r = (s) => {
      if (!document.body.contains(e.root)) {
        document.body.removeEventListener("click", r);
        return;
      }
      this.tooltip != null && // @ts-expect-error
      !this.tooltip.root.contains(s.target) && // @ts-expect-error
      document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus() && this.tooltip.hide(), this.pickers != null && this.pickers.forEach((i) => {
        i.container.contains(s.target) || i.close();
      });
    };
    e.emitter.listenDOM("click", document.body, r);
  }
  addModule(e) {
    const t = super.addModule(e);
    return e === "toolbar" && this.extendToolbar(t), t;
  }
  buildButtons(e, t) {
    Array.from(e).forEach((r) => {
      (r.getAttribute("class") || "").split(/\s+/).forEach((i) => {
        if (i.startsWith("ql-") && (i = i.slice(3), t[i] != null))
          if (i === "direction")
            r.innerHTML = t[i][""] + t[i].rtl;
          else if (typeof t[i] == "string")
            r.innerHTML = t[i];
          else {
            const a = r.value || "";
            a != null && t[i][a] && (r.innerHTML = t[i][a]);
          }
      });
    });
  }
  buildPickers(e, t) {
    this.pickers = Array.from(e).map((s) => {
      if (s.classList.contains("ql-align") && (s.querySelector("option") == null && nr(s, B1), typeof t.align == "object"))
        return new Dl(s, t.align);
      if (s.classList.contains("ql-background") || s.classList.contains("ql-color")) {
        const i = s.classList.contains("ql-background") ? "background" : "color";
        return s.querySelector("option") == null && nr(s, F1, i === "background" ? "#ffffff" : "#000000"), new $l(s, t[i]);
      }
      return s.querySelector("option") == null && (s.classList.contains("ql-font") ? nr(s, M1) : s.classList.contains("ql-header") ? nr(s, P1) : s.classList.contains("ql-size") && nr(s, j1)), new ms(s);
    });
    const r = () => {
      this.pickers.forEach((s) => {
        s.update();
      });
    };
    this.quill.on(G.events.EDITOR_CHANGE, r);
  }
}
Nr.DEFAULTS = Kt({}, Hn.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let n = this.container.querySelector("input.ql-image[type=file]");
          n == null && (n = document.createElement("input"), n.setAttribute("type", "file"), n.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), n.classList.add("ql-image"), n.addEventListener("change", () => {
            const e = this.quill.getSelection(!0);
            this.quill.uploader.upload(e, n.files), n.value = "";
          }), this.container.appendChild(n)), n.click();
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
    const r = this.quill.getBounds(this.quill.selection.savedRange);
    r != null && this.position(r), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${e}`) || ""), this.root.setAttribute("data-mode", e);
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
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", e, G.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", e, G.sources.USER)), this.quill.root.scrollTop = t;
        break;
      }
      case "video":
        e = U1(e);
      // eslint-disable-next-line no-fallthrough
      case "formula": {
        if (!e) break;
        const t = this.quill.getSelection(!0);
        if (t != null) {
          const r = t.index + t.length;
          this.quill.insertEmbed(
            r,
            // @ts-expect-error Fix me later
            this.root.getAttribute("data-mode"),
            e,
            G.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(r + 1, " ", G.sources.USER), this.quill.setSelection(r + 2, G.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function U1(n) {
  let e = n.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || n.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return e ? `${e[1] || "https"}://www.youtube.com/embed/${e[2]}?showinfo=0` : (e = n.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${e[1] || "https"}://player.vimeo.com/video/${e[2]}/` : n;
}
function nr(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  e.forEach((r) => {
    const s = document.createElement("option");
    r === t ? s.setAttribute("selected", "selected") : s.setAttribute("value", String(r)), n.appendChild(s);
  });
}
const V1 = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class z1 extends Fl {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(e, t) {
    super(e, t), this.quill.on(G.events.EDITOR_CHANGE, (r, s, i, a) => {
      if (r === G.events.SELECTION_CHANGE)
        if (s != null && s.length > 0 && a === G.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const l = this.quill.getLines(s.index, s.length);
          if (l.length === 1) {
            const u = this.quill.getBounds(s);
            u != null && this.position(u);
          } else {
            const u = l[l.length - 1], d = this.quill.getIndex(u), p = Math.min(u.length() - 1, s.index + s.length - d), b = this.quill.getBounds(new pn(d, p));
            b != null && this.position(b);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(G.events.SCROLL_OPTIMIZE, () => {
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
    const t = super.position(e), r = this.root.querySelector(".ql-tooltip-arrow");
    return r.style.marginLeft = "", t !== 0 && (r.style.marginLeft = `${-1 * t - r.offsetWidth / 2}px`), t;
  }
}
class Ml extends Nr {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = V1), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new z1(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), br), this.buildPickers(e.container.querySelectorAll("select"), br));
  }
}
Ml.DEFAULTS = Kt({}, Nr.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(n) {
          n ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, $.sources.USER);
        }
      }
    }
  }
});
const H1 = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class K1 extends Fl {
  static TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join("");
  preview = this.root.querySelector("a.ql-preview");
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (e) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), e.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (e) => {
      if (this.linkRange != null) {
        const t = this.linkRange;
        this.restoreFocus(), this.quill.formatText(t, "link", !1, G.sources.USER), delete this.linkRange;
      }
      e.preventDefault(), this.hide();
    }), this.quill.on(G.events.SELECTION_CHANGE, (e, t, r) => {
      if (e != null) {
        if (e.length === 0 && r === G.sources.USER) {
          const [s, i] = this.quill.scroll.descendant(rs, e.index);
          if (s != null) {
            this.linkRange = new pn(e.index - i, s.length());
            const a = rs.formats(s.domNode);
            this.preview.textContent = a, this.preview.setAttribute("href", a), this.show();
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
class Pl extends Nr {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = H1), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), br), this.buildPickers(e.container.querySelectorAll("select"), br), this.tooltip = new K1(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, r) => {
      e.handlers.link.call(e, !r.format.link);
    }));
  }
}
Pl.DEFAULTS = Kt({}, Nr.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(n) {
          if (n) {
            const e = this.quill.getSelection();
            if (e == null || e.length === 0) return;
            let t = this.quill.getText(e);
            /^\S+@\S+\.\S+$/.test(t) && t.indexOf("mailto:") !== 0 && (t = `mailto:${t}`);
            const {
              tooltip: r
            } = this.quill.theme;
            r.edit("link", t);
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
  "attributors/class/background": Xm,
  "attributors/class/color": Ym,
  "attributors/class/direction": Nl,
  "attributors/class/font": Cl,
  "attributors/class/size": _l,
  "attributors/style/align": wl,
  "attributors/style/background": Xi,
  "attributors/style/color": Yi,
  "attributors/style/direction": Tl,
  "attributors/style/font": kl,
  "attributors/style/size": Ll
}, !0);
$.register({
  "formats/align": xl,
  "formats/direction": Nl,
  "formats/indent": Vg,
  "formats/background": Xi,
  "formats/color": Yi,
  "formats/font": Cl,
  "formats/size": _l,
  "formats/blockquote": zg,
  "formats/code-block": Ke,
  "formats/header": Hg,
  "formats/list": Er,
  "formats/bold": no,
  "formats/code": Qi,
  "formats/italic": Kg,
  "formats/link": rs,
  "formats/script": Gg,
  "formats/strike": Wg,
  "formats/underline": Zg,
  "formats/formula": Yg,
  "formats/image": Xg,
  "formats/video": Qg,
  "modules/syntax": Rl,
  "modules/table": e1,
  "modules/toolbar": so,
  "themes/bubble": Ml,
  "themes/snow": Pl,
  "ui/icons": br,
  "ui/picker": ms,
  "ui/icon-picker": Dl,
  "ui/color-picker": $l,
  "ui/tooltip": Bl
}, !0);
const G1 = { class: "rounded-lg border" }, W1 = /* @__PURE__ */ Se({
  __name: "RichTextEditor",
  props: {
    modelValue: {},
    placeholder: { default: "Escribe aquí el contenido..." },
    subirImagen: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = te(null);
    let i = null;
    yr(() => {
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
              image: a
            }
          }
        }
      }), i.root.innerHTML = t.modelValue || "", i.enable(!t.disabled), i.on("text-change", () => {
        i && r("update:modelValue", i.root.innerHTML);
      }));
    }), wa(() => {
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
    async function a() {
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
    return (u, d) => (I(), B("div", G1, [
      v("div", {
        ref_key: "root",
        ref: s,
        class: "min-h-[260px]"
      }, null, 512)
    ]));
  }
}), Z1 = /* @__PURE__ */ Se({
  name: "RichTextFieldInput",
  __name: "RichTextFieldInput",
  props: {
    modelValue: {},
    disabled: { type: Boolean, default: !1 },
    uploadImage: {}
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), Le(W1, {
      "model-value": n.modelValue,
      "subir-imagen": n.uploadImage,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["model-value", "subir-imagen", "disabled"]));
  }
}), Y1 = ["value", "disabled"], X1 = ["value"], Q1 = /* @__PURE__ */ Se({
  name: "SelectFieldInput",
  __name: "SelectFieldInput",
  props: {
    modelValue: {},
    options: { default: () => [] },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), B("select", {
      value: n.modelValue,
      disabled: n.disabled,
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, [
      s[1] || (s[1] = v("option", { value: "" }, "Selecciona una opción", -1)),
      (I(!0), B(Re, null, $e(n.options, (i) => (I(), B("option", {
        key: i,
        value: i
      }, Q(i), 9, X1))), 128))
    ], 40, Y1));
  }
}), J1 = ["value", "rows", "placeholder", "disabled"], eb = /* @__PURE__ */ Se({
  name: "TextareaFieldInput",
  __name: "TextareaFieldInput",
  props: {
    modelValue: {},
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 },
    rows: { default: 4 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), B("textarea", {
      value: n.modelValue,
      rows: n.rows,
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, J1));
  }
}), tb = ["value", "placeholder", "disabled"], ha = /* @__PURE__ */ Se({
  name: "TextFieldInput",
  __name: "TextFieldInput",
  props: {
    modelValue: {},
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), B("input", {
      value: n.modelValue,
      type: "text",
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, tb));
  }
}), nb = {
  key: 2,
  class: "space-y-1"
}, rb = {
  key: 0,
  class: "text-xs"
}, fa = /* @__PURE__ */ Se({
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
  setup(n, { emit: e }) {
    const t = n, r = e;
    function s() {
      return typeof t.modelValue == "string" ? t.modelValue : "";
    }
    function i() {
      return !!t.modelValue;
    }
    function a() {
      return typeof t.modelValue == "string" ? t.modelValue : "";
    }
    function l() {
      return t.modelValue;
    }
    return (u, d) => (I(), B("div", null, [
      n.field.type === "text" ? (I(), Le(ha, {
        key: 0,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[0] || (d[0] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "date" ? (I(), Le(Lc, {
        key: 1,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[1] || (d[1] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "numeric" || n.field.type === "id" ? (I(), B("div", nb, [
        lt(Vc, {
          "model-value": a(),
          placeholder: n.field.placeholder || "",
          disabled: n.disabled || n.isAutoId,
          step: n.field.type === "id" ? "1" : "any",
          min: n.field.type === "id" ? 1 : null,
          "onUpdate:modelValue": d[2] || (d[2] = (p) => r("update:modelValue", p))
        }, null, 8, ["model-value", "placeholder", "disabled", "step", "min"]),
        n.isAutoId ? (I(), B("p", rb, " Se genera automáticamente al crear el documento. ")) : ne("", !0)
      ])) : n.field.type === "textarea" ? (I(), Le(eb, {
        key: 3,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[3] || (d[3] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "select" ? (I(), Le(Q1, {
        key: 4,
        "model-value": s(),
        options: n.field.options || [],
        disabled: n.disabled,
        "onUpdate:modelValue": d[4] || (d[4] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "disabled"])) : n.field.type === "document" ? (I(), Le($c, {
        key: 5,
        "model-value": s(),
        options: n.documentOptions,
        hint: n.documentHint,
        disabled: n.disabled,
        "onUpdate:modelValue": d[5] || (d[5] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "hint", "disabled"])) : n.field.type === "boolean" ? (I(), Le(sc, {
        key: 6,
        "model-value": i(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[6] || (d[6] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "image" ? (I(), Le(jc, {
        key: 7,
        "model-value": s(),
        disabled: n.disabled,
        "onUpdate:file": d[7] || (d[7] = (p) => r("update:file", p)),
        onRemove: d[8] || (d[8] = (p) => r("remove-image"))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "array" || n.field.type === "map" ? (I(), Le(kc, {
        key: 8,
        field: n.field,
        "model-value": l(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[9] || (d[9] = (p) => r("update:modelValue", p))
      }, null, 8, ["field", "model-value", "disabled"])) : n.field.type === "richtext" ? (I(), Le(Z1, {
        key: 9,
        "model-value": s(),
        "upload-image": n.uploadImage,
        disabled: n.disabled,
        "onUpdate:modelValue": d[10] || (d[10] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "upload-image", "disabled"])) : (I(), Le(ha, {
        key: 10,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[11] || (d[11] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"]))
    ]));
  }
}), sb = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};
async function ib(n, e = {}) {
  if (!n.type.startsWith("image/"))
    return n;
  const t = { ...sb, ...e }, r = await ab(n), { width: s, height: i } = ob(r.width, r.height, t.maxWidth, t.maxHeight), a = document.createElement("canvas");
  a.width = s, a.height = i;
  const l = a.getContext("2d");
  if (!l)
    return n;
  l.drawImage(r, 0, 0, s, i);
  let u = t.quality, d = await pa(a, n.type || "image/jpeg", u);
  const p = t.targetSizeKb * 1024;
  for (; d.size > p && u > 0.45; )
    u -= 0.08, d = await pa(a, n.type || "image/jpeg", u);
  return d;
}
function ob(n, e, t, r) {
  let s = n, i = e;
  return s > t && (i = Math.round(i * t / s), s = t), i > r && (s = Math.round(s * r / i), i = r), { width: s, height: i };
}
function pa(n, e, t) {
  return new Promise((r, s) => {
    n.toBlob(
      (i) => {
        if (!i) {
          s(new Error("No fue posible generar la imagen comprimida."));
          return;
        }
        r(i);
      },
      e,
      t
    );
  });
}
function ab(n) {
  return new Promise((e, t) => {
    const r = new Image(), s = URL.createObjectURL(n);
    r.onload = () => {
      URL.revokeObjectURL(s), e(r);
    }, r.onerror = () => {
      URL.revokeObjectURL(s), t(new Error("No fue posible leer la imagen."));
    }, r.src = s;
  });
}
async function lb(n, e, t) {
  const { storage: r } = ke(), s = Xl(r, n);
  return await Ql(s, e, t), Jl(s);
}
async function ma(n, e, t = {}) {
  const r = await ib(e, {
    maxWidth: t.maxWidth,
    maxHeight: t.maxHeight,
    quality: t.quality,
    targetSizeKb: t.targetSizeKb
  });
  return lb(n, r, t.metadata);
}
async function ub(n, e) {
  const { firestore: t } = ke(), r = await mb(n, e);
  return (await Wl(dn(t, n.collectionName), {
    ...r,
    createdAt: Ze(),
    updatedAt: Ze()
  })).id;
}
async function ga(n, e = 100) {
  const { firestore: t } = ke();
  try {
    const r = Oi(
      dn(t, n.collectionName),
      Ri("createdAt", "desc"),
      Na(e)
    );
    return (await jn(r)).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  } catch {
    return (await jn(dn(t, n.collectionName))).docs.map((s) => ({
      id: s.id,
      data: s.data()
    }));
  }
}
async function cb(n, e) {
  const { firestore: t } = ke();
  await Zl(Yt(t, n.collectionName, e));
}
async function db(n, e, t) {
  const { firestore: r } = ke(), s = gb(n, t);
  await Ea(Yt(r, n.collectionName, e), {
    ...s,
    updatedAt: Ze()
  });
}
const jl = "main", hb = "schema";
async function fb(n, e, t = jl) {
  const { firestore: r } = ke(), s = n.dictionaryDocumentId || t, i = Ul(n), a = Yt(r, n.collectionName, s), l = await is(a), u = {
    updatedAt: Ze(),
    createdAt: l.exists() ? l.data().createdAt : Ze()
  };
  if (i)
    u[i] = e;
  else
    for (const [d, p] of Object.entries(e))
      u[d] = p;
  return await Xr(
    a,
    u,
    { merge: !0 }
  ), s;
}
async function pb(n, e = jl) {
  const { firestore: t } = ke(), r = n.dictionaryDocumentId || e, s = await is(Yt(t, n.collectionName, r));
  if (!s.exists())
    return null;
  const i = s.data(), a = Ul(n), l = a ? i[a] : null;
  return l && typeof l == "object" && !Array.isArray(l) ? {
    id: s.id,
    data: l
  } : {
    id: s.id,
    data: i
  };
}
function Ul(n) {
  return n.storageType !== "dictionary" ? "" : typeof n.dictionaryRootKey == "string" && n.dictionaryRootKey.trim() ? n.dictionaryRootKey.trim() : hb;
}
async function mb(n, e) {
  const t = Vl(n);
  if (!t.length)
    return { ...e };
  const { firestore: r } = ke(), s = { ...e };
  for (const i of t) {
    if (i.type === "id") {
      s[i.key] = await yb(r, n.collectionName, i.key);
      continue;
    }
    if (i.type === "date") {
      s[i.key] = /* @__PURE__ */ new Date();
      continue;
    }
  }
  return s;
}
function gb(n, e) {
  const t = Vl(n);
  if (!t.length)
    return { ...e };
  const r = { ...e };
  for (const s of t)
    delete r[s.key];
  return r;
}
function Vl(n) {
  return n.storageType !== "document" ? [] : n.fields.filter((e) => bb(e));
}
function bb(n) {
  return n.type === "id" ? !0 : typeof n.autogenerated == "boolean" ? n.autogenerated : !1;
}
async function yb(n, e, t) {
  let r = 0;
  try {
    const a = (await jn(
      Oi(
        dn(n, e),
        Ri(t, "desc"),
        Na(1)
      )
    )).docs[0]?.data()?.[t], l = ba(a);
    l !== null && (r = l);
  } catch {
    r = 0;
  }
  if (r > 0)
    return r + 1;
  const s = await jn(dn(n, e));
  for (const i of s.docs) {
    const a = ba(i.data()?.[t]);
    a !== null && a > r && (r = a);
  }
  return r + 1;
}
function ba(n) {
  if (typeof n == "number" && Number.isFinite(n)) {
    const e = Math.trunc(n);
    return e >= 1 ? e : null;
  }
  if (typeof n == "string") {
    const e = n.trim();
    if (!e)
      return null;
    const t = Number(e);
    if (!Number.isFinite(t))
      return null;
    const r = Math.trunc(t);
    return r >= 1 ? r : null;
  }
  return null;
}
function vb(n) {
  return `${n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}-${Date.now().toString().slice(-6)}`;
}
const xb = { class: "space-y-4" }, wb = { class: "rounded-2xl border px-4 py-3 text-sm" }, Ab = {
  key: 0,
  class: "mt-2 text-xs"
}, Eb = {
  key: 1,
  class: "mt-2 text-xs"
}, Nb = { class: "rounded-2xl border p-5" }, Tb = { class: "text-xl font-black" }, Sb = {
  key: 0,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, Cb = {
  key: 1,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, kb = {
  key: 2,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, _b = { class: "block text-sm font-semibold" }, Lb = {
  key: 0,
  class: "text-xs"
}, qb = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, Ib = { class: "flex flex-wrap items-center gap-2" }, Ob = ["disabled"], Rb = ["disabled"], $b = { class: "mt-6 border-t pt-5" }, Db = { class: "flex flex-wrap items-center justify-between gap-3" }, Bb = ["disabled"], Fb = {
  key: 0,
  class: "mt-3 text-sm"
}, Mb = {
  key: 1,
  class: "mt-3 text-sm"
}, Pb = {
  key: 2,
  class: "mt-3 space-y-2"
}, jb = { class: "text-sm font-semibold" }, Ub = { class: "text-xs" }, Vb = {
  key: 0,
  class: "flex items-center gap-2"
}, zb = ["disabled", "onClick"], Hb = ["disabled", "onClick"], Kb = { class: "w-full max-w-2xl rounded-xl border p-5 shadow-2xl" }, Gb = { class: "block text-sm font-semibold" }, Wb = {
  key: 0,
  class: "text-xs"
}, Zb = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, Yb = { class: "flex flex-wrap items-center gap-2" }, Xb = ["disabled"], Qb = /* @__PURE__ */ Se({
  __name: "AdminBlogPage",
  setup(n) {
    const e = os(), t = vr(), r = te([]), s = te(""), i = te(!1), a = te(""), l = te({}), u = te({}), d = te([]), p = te(!1), b = te(!1), h = te(""), w = te(""), E = te({}), k = te(""), L = te(!1), R = Te(() => Dn.value === "admin" || Dn.value === "writer" || Dn.value === "manager"), M = Te(() => r.value.find((m) => m.id === s.value) ?? null), K = Te(() => !!k.value);
    yr(async () => {
      await J();
    }), Wt(
      M,
      async (m) => {
        if (!m) {
          l.value = {}, u.value = {}, d.value = [], E.value = {}, k.value = "", L.value = !1;
          return;
        }
        m.storageType !== "dictionary" && (L.value = !1), y(m), await F(m), await N(m);
      },
      { immediate: !0 }
    ), Wt(
      () => e.query.schema,
      (m) => {
        typeof m == "string" && r.value.some((g) => g.id === m) && s.value !== m && (s.value = m);
      }
    );
    async function J() {
      i.value = !0, a.value = "";
      try {
        await Y();
      } catch {
        a.value = "No se pudieron cargar los tipos de contenido.";
      } finally {
        i.value = !1;
      }
    }
    async function Y() {
      const m = await Bi();
      if (r.value = m, !m.length) {
        s.value = "";
        return;
      }
      const g = typeof e.query.schema == "string" ? e.query.schema : "";
      if (g && m.some((D) => D.id === g)) {
        s.value = g;
        return;
      }
      m.some((D) => D.id === s.value) || (s.value = m[0].id, await ae(s.value));
    }
    async function ae(m) {
      m && e.query.schema !== m && await t.replace({
        query: {
          ...e.query,
          schema: m
        }
      });
    }
    function oe(m) {
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
      for (const D of m.fields)
        D.type === "boolean" ? g[D.key] = !1 : D.type === "array" ? g[D.key] = [] : D.type === "map" ? g[D.key] = {} : D.type === "date" ? g[D.key] = "" : D.type === "numeric" || D.type === "id" ? g[D.key] = null : (D.type, g[D.key] = ""), D.type === "image" && (q[D.key] = null);
      l.value = g, u.value = q, k.value = "", h.value = "", w.value = "";
    }
    async function F(m) {
      p.value = !0;
      try {
        if (m.storageType === "dictionary") {
          const q = await pb(m);
          d.value = q ? [q] : [], k.value = "", q && A(m, q);
          return;
        }
        const g = await ga(m, 100);
        d.value = g, k.value && !g.some((q) => q.id === k.value) && (k.value = "");
      } finally {
        p.value = !1;
      }
    }
    async function N(m) {
      const g = m.fields.filter((D) => D.type === "document");
      if (!g.length) {
        E.value = {};
        return;
      }
      const q = {};
      await Promise.all(
        g.map(async (D) => {
          const re = typeof D.documentSchemaId == "string" ? D.documentSchemaId.trim() : "";
          if (!re) {
            q[D.key] = { options: [], byId: {} };
            return;
          }
          const pe = r.value.find((Be) => Be.id === re);
          if (!pe || pe.storageType !== "document") {
            q[D.key] = { options: [], byId: {} };
            return;
          }
          const qe = typeof D.documentLabelField == "string" && D.documentLabelField.trim() || pe.previewField || pe.slugFromField || pe.fields[0]?.key || "", on = await ga(pe, 200), Mt = {}, an = on.map((Be) => (Mt[Be.id] = Be, {
            id: Be.id,
            label: C(Be, qe),
            hint: f(Be)
          }));
          q[D.key] = { options: an, byId: Mt };
        })
      ), E.value = q;
    }
    function C(m, g) {
      const q = g ? m.data[g] : null;
      return typeof q == "string" && q.trim() ? q.trim() : m.id;
    }
    function f(m) {
      const g = m.data.telefono;
      return typeof g == "string" && g.trim() ? `Tel: ${g.trim()}` : "";
    }
    function A(m, g) {
      const q = { ...l.value };
      for (const D of m.fields) {
        const re = g.data[D.key];
        D.type === "boolean" ? q[D.key] = !!re : D.type === "array" || D.type === "map" ? q[D.key] = H(D, re) : D.type === "date" ? q[D.key] = St(re) : D.type === "numeric" ? q[D.key] = ft(re) : D.type === "id" ? q[D.key] = Ve(re) : D.type === "document" ? q[D.key] = typeof re == "string" ? re : "" : typeof re == "string" ? q[D.key] = re : q[D.key] = "";
      }
      l.value = q;
    }
    function S(m) {
      const g = M.value;
      !g || g.storageType !== "document" || (y(g), A(g, m), k.value = m.id);
    }
    function j() {
      const m = M.value;
      !m || m.storageType !== "dictionary" || (d.value[0] ? A(m, d.value[0]) : y(m), w.value = "", L.value = !0);
    }
    function V() {
      L.value = !1, w.value = "";
    }
    function _() {
      const m = M.value;
      !m || m.storageType !== "document" || y(m);
    }
    async function T() {
      const m = M.value;
      if (m) {
        if (h.value = "", w.value = "", !R.value) {
          w.value = "Tu rol no tiene permisos para crear o editar contenido.";
          return;
        }
        b.value = !0;
        try {
          const g = {};
          for (const D of m.fields)
            Ae(m, D) || (g[D.key] = await P(m, D), z(m, D, g[D.key]));
          const q = m.storageType === "document" && !k.value;
          if ((m.storageType === "dictionary" || q) && Ft(m, g), m.slugFromField) {
            const D = g[m.slugFromField];
            typeof D == "string" && D.trim() && (g.slug = vb(D));
          }
          m.storageType === "dictionary" ? (await fb(m, g), h.value = "Registro de diccionario actualizado.", L.value = !1) : (k.value ? (await db(m, k.value, g), h.value = "Registro actualizado correctamente.") : (await ub(m, g), h.value = "Registro creado correctamente."), y(m)), await F(m);
        } catch (g) {
          w.value = g instanceof Error ? g.message : "No se pudo guardar el registro.";
        } finally {
          b.value = !1;
        }
      }
    }
    async function P(m, g) {
      if (g.type === "boolean")
        return !!l.value[g.key];
      if (g.type === "image") {
        const q = u.value[g.key];
        if (!q)
          return le(g.key);
        const D = Tt(q.name), re = await ma(
          `${m.collectionName}/${g.key}/${Date.now()}-${D}`,
          q,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return l.value[g.key] = re, u.value[g.key] = null, re;
      }
      return g.type === "array" || g.type === "map" ? H(g, l.value[g.key], !0) : g.type === "date" ? de(g.key) : g.type === "numeric" ? he(g.key) : g.type === "id" ? m.storageType === "document" && !k.value ? null : Ve(l.value[g.key]) : (g.type === "document", le(g.key));
    }
    function z(m, g, q) {
      if (g.required && g.type !== "boolean") {
        if (g.type === "array") {
          if (!Array.isArray(q) || !q.length)
            throw new Error(`El campo "${g.label}" es obligatorio y debe tener al menos 1 elemento.`);
          return;
        }
        if (g.type === "map") {
          if (!oe(q) || Object.keys(q).length === 0)
            throw new Error(`El campo "${g.label}" es obligatorio y debe tener al menos 1 propiedad.`);
          return;
        }
        if (!(g.type === "id" && m.storageType === "document" && !k.value)) {
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
    function H(m, g, q = !1) {
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
          (pe, qe) => ee(
            m.itemSchema,
            pe,
            `${m.label}[${qe}]`,
            q
          )
        ) : re;
      }
      const D = oe(g) ? g : {};
      return Array.isArray(m.mapFields) && m.mapFields.length > 0 ? U(m.mapFields, D, m.label, q) : D;
    }
    function U(m, g, q, D = !1) {
      const re = {};
      for (const pe of m) {
        const qe = pe.key;
        if (!(qe in g)) {
          if (pe.required)
            throw new Error(`Falta la propiedad requerida "${q}.${qe}".`);
          continue;
        }
        re[qe] = ee(pe, g[qe], `${q}.${qe}`, D);
      }
      return re;
    }
    function ee(m, g, q, D = !1) {
      if (m.type === "array") {
        if (!Array.isArray(g))
          throw new Error(`"${q}" debe ser un arreglo.`);
        return m.itemSchema ? g.map(
          (re, pe) => ee(m.itemSchema, re, `${q}[${pe}]`, D)
        ) : g;
      }
      if (m.type === "map") {
        if (!oe(g))
          throw new Error(`"${q}" debe ser un objeto.`);
        return !Array.isArray(m.mapFields) || m.mapFields.length === 0 ? g : U(m.mapFields, g, q, D);
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
        const re = Ct(g);
        if (!re)
          throw new Error(`"${q}" debe ser una fecha válida.`);
        return D ? re : St(re);
      }
      if (typeof g != "string")
        throw new Error(`"${q}" debe ser string.`);
      if (m.type === "select" && Array.isArray(m.options) && m.options.length > 0 && g && !m.options.includes(g))
        throw new Error(`"${q}" no coincide con las opciones del select.`);
      return g;
    }
    async function ye(m) {
      const g = M.value;
      if (!(!g || g.storageType !== "document")) {
        if (!R.value) {
          w.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await cb(g, m), k.value === m && y(g), await F(g));
      }
    }
    async function se(m) {
      const g = M.value;
      if (!g)
        throw new Error("No hay schema seleccionado.");
      const q = Tt(m.name);
      return ma(
        `${g.collectionName}/editor/${Date.now()}-${q}`,
        m,
        { maxWidth: 1600, maxHeight: 1600, targetSizeKb: 700, quality: 0.8 }
      );
    }
    function le(m) {
      const g = l.value[m];
      return typeof g == "string" ? g : "";
    }
    function ue(m) {
      return St(l.value[m]);
    }
    function de(m) {
      return Ct(l.value[m]);
    }
    function he(m) {
      return ft(l.value[m]);
    }
    function me(m) {
      const g = he(m);
      return typeof g == "number" ? String(g) : "";
    }
    function Ee(m, g) {
      l.value[m] = g;
    }
    function _e(m, g) {
      l.value[m] = St(g);
    }
    function Jt(m, g) {
      l.value[m] = ft(g);
    }
    function en(m) {
      return m.type === "boolean" ? Nn(m.key) : m.type === "array" || m.type === "map" ? nn(m.key) : m.type === "numeric" || m.type === "id" ? me(m.key) : m.type === "date" ? ue(m.key) : le(m.key);
    }
    function An(m, g) {
      if (m.type === "boolean") {
        Qe(m.key, !!g);
        return;
      }
      if (m.type === "array" || m.type === "map") {
        En(m.key, g);
        return;
      }
      if (m.type === "numeric" || m.type === "id") {
        Jt(m.key, typeof g == "string" ? g : "");
        return;
      }
      if (m.type === "date") {
        _e(m.key, typeof g == "string" ? g : "");
        return;
      }
      Ee(m.key, typeof g == "string" ? g : "");
    }
    function tn(m) {
      return E.value[m.key]?.options ?? [];
    }
    function At(m) {
      const g = le(m.key);
      return g ? tn(m).find((D) => D.id === g)?.hint ?? "" : "";
    }
    function nn(m) {
      return l.value[m];
    }
    function En(m, g) {
      l.value[m] = g;
    }
    function Nn(m) {
      return !!l.value[m];
    }
    function Qe(m, g) {
      l.value[m] = g;
    }
    function Et(m, g) {
      u.value[m] = g;
    }
    function Tn(m) {
      l.value[m] = "", u.value[m] = null;
    }
    function Nt(m, g) {
      const q = g.previewField || g.slugFromField || g.fields[0]?.key;
      if (!q)
        return m.id;
      const D = m.data[q];
      if (g.fields.find((pe) => pe.key === q)?.type === "date") {
        const pe = Bt(D);
        if (pe)
          return pe;
      }
      return typeof D == "string" && D.trim() ? D : typeof D == "boolean" ? D ? "true" : "false" : typeof D == "number" && Number.isFinite(D) ? String(D) : Array.isArray(D) ? `[array:${D.length}]` : oe(D) ? "[map]" : m.id;
    }
    function Tt(m) {
      return m.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
    }
    function ft(m) {
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
      const g = ft(m);
      return g === null || !Number.isInteger(g) || g < 1 ? null : g;
    }
    function St(m) {
      const g = Ct(m);
      return g ? rn(g) : "";
    }
    function Ct(m) {
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
        const q = Kn(g);
        if (q)
          return q;
        const D = new Date(g);
        return Number.isNaN(D.getTime()) ? null : D;
      }
      if (typeof m == "number" && Number.isFinite(m)) {
        const g = new Date(m);
        if (!Number.isNaN(g.getTime()))
          return g;
      }
      return null;
    }
    function Kn(m) {
      const g = /^(\d{4})-(\d{2})-(\d{2})$/.exec(m);
      if (!g)
        return null;
      const q = Number(g[1]), D = Number(g[2]), re = Number(g[3]), pe = new Date(Date.UTC(q, D - 1, re));
      return pe.getUTCFullYear() !== q || pe.getUTCMonth() + 1 !== D || pe.getUTCDate() !== re ? null : pe;
    }
    function rn(m) {
      const g = String(m.getUTCFullYear()).padStart(4, "0"), q = String(m.getUTCMonth() + 1).padStart(2, "0"), D = String(m.getUTCDate()).padStart(2, "0");
      return `${g}-${q}-${D}`;
    }
    function Bt(m) {
      const g = Ct(m);
      if (!g)
        return "";
      const q = String(g.getUTCDate()).padStart(2, "0"), D = String(g.getUTCMonth() + 1).padStart(2, "0"), re = String(g.getUTCFullYear()).padStart(4, "0");
      return `${q}/${D}/${re}`;
    }
    function sn(m) {
      return m.type === "id" && M.value?.storageType === "document";
    }
    function Ft(m, g) {
      for (const q of m.fields)
        Ae(m, q) && q.type === "date" && (g[q.key] = /* @__PURE__ */ new Date());
    }
    return (m, g) => (I(), B("section", xb, [
      v("article", wb, [
        g[0] || (g[0] = Ye(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        g[1] || (g[1] = v("strong", null, "Esquemas", -1)),
        g[2] || (g[2] = Ye(". ", -1)),
        i.value ? (I(), B("p", Ab, "Cargando formularios...")) : a.value ? (I(), B("p", Eb, Q(a.value), 1)) : ne("", !0)
      ]),
      v("article", Nb, [
        v("h3", Tb, Q(M.value ? `Formulario y registros: ${M.value.title}` : "Formulario y registros"), 1),
        g[5] || (g[5] = v("p", { class: "mt-1 text-sm" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        R.value ? ne("", !0) : (I(), B("p", Sb, " No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        w.value ? (I(), B("p", Cb, Q(w.value), 1)) : ne("", !0),
        h.value ? (I(), B("p", kb, Q(h.value), 1)) : ne("", !0),
        M.value && M.value.storageType === "document" ? (I(), B("form", {
          key: 3,
          class: "mt-5 space-y-4",
          onSubmit: or(T, ["prevent"])
        }, [
          (I(!0), B(Re, null, $e(we(M.value), (q) => (I(), B("div", {
            key: q.key,
            class: "space-y-1"
          }, [
            v("label", _b, Q(q.label), 1),
            q.helpText ? (I(), B("p", Lb, Q(q.helpText), 1)) : ne("", !0),
            lt(fa, {
              field: q,
              "model-value": en(q),
              disabled: !R.value,
              "is-auto-id": sn(q),
              "document-options": tn(q),
              "document-hint": At(q),
              "upload-image": se,
              "onUpdate:modelValue": (D) => An(q, D),
              "onUpdate:file": (D) => Et(q.key, D),
              onRemoveImage: (D) => Tn(q.key)
            }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
          ]))), 128)),
          M.value.storageType === "document" && K.value ? (I(), B("p", qb, " Editando registro: " + Q(k.value), 1)) : ne("", !0),
          v("div", Ib, [
            v("button", {
              type: "submit",
              disabled: b.value || !R.value,
              class: "rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed"
            }, Q(b.value ? "Guardando..." : K.value ? "Guardar cambios" : "Crear documento"), 9, Ob),
            M.value.storageType === "document" && K.value ? (I(), B("button", {
              key: 0,
              type: "button",
              disabled: b.value || !R.value,
              class: "rounded-md border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50",
              onClick: _
            }, " Cancelar edición ", 8, Rb)) : ne("", !0)
          ])
        ], 32)) : ne("", !0),
        v("div", $b, [
          v("div", Db, [
            g[3] || (g[3] = v("h4", { class: "text-sm font-black uppercase tracking-wide" }, "Registros guardados", -1)),
            M.value?.storageType === "dictionary" ? (I(), B("button", {
              key: 0,
              type: "button",
              disabled: !R.value || b.value,
              class: "rounded-md px-3 py-1 text-sm font-semibold disabled:cursor-not-allowed",
              onClick: j
            }, " + Nuevo ", 8, Bb)) : ne("", !0)
          ]),
          p.value ? (I(), B("p", Fb, "Cargando registros...")) : d.value.length ? (I(), B("ul", Pb, [
            (I(!0), B(Re, null, $e(d.value, (q) => (I(), B("li", {
              key: q.id,
              class: bt([
                "flex items-center justify-between gap-3 rounded-lg border px-3 py-2",
                M.value?.storageType === "document" && k.value === q.id ? " " : ""
              ])
            }, [
              v("div", null, [
                v("p", jb, Q(M.value ? Nt(q, M.value) : q.id), 1),
                v("p", Ub, "ID: " + Q(q.id), 1)
              ]),
              M.value?.storageType === "document" ? (I(), B("div", Vb, [
                v("button", {
                  type: "button",
                  disabled: !R.value || b.value,
                  class: "rounded-md border px-2 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (D) => S(q)
                }, Q(k.value === q.id ? "Editando" : "Editar"), 9, zb),
                v("button", {
                  type: "button",
                  disabled: !R.value,
                  class: "rounded-md border px-2 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (D) => ye(q.id)
                }, " Eliminar ", 8, Hb)
              ])) : ne("", !0)
            ], 2))), 128))
          ])) : (I(), B("p", Mb, "No hay registros todavía."))
        ]),
        M.value?.storageType === "dictionary" && L.value ? (I(), B("div", {
          key: 4,
          class: "fixed inset-0 z-40 flex items-center justify-center p-4",
          onClick: or(V, ["self"])
        }, [
          v("article", Kb, [
            v("header", { class: "flex items-center justify-between gap-3" }, [
              g[4] || (g[4] = v("h4", { class: "text-base font-black" }, "Editar diccionario", -1)),
              v("button", {
                type: "button",
                class: "rounded-md border px-2 py-1 text-xs font-semibold",
                onClick: V
              }, " Cerrar ")
            ]),
            v("form", {
              class: "mt-4 space-y-4",
              onSubmit: or(T, ["prevent"])
            }, [
              (I(!0), B(Re, null, $e(we(M.value), (q) => (I(), B("div", {
                key: q.key,
                class: "space-y-1"
              }, [
                v("label", Gb, Q(q.label), 1),
                q.helpText ? (I(), B("p", Wb, Q(q.helpText), 1)) : ne("", !0),
                lt(fa, {
                  field: q,
                  "model-value": en(q),
                  disabled: !R.value,
                  "is-auto-id": sn(q),
                  "document-options": tn(q),
                  "document-hint": At(q),
                  "upload-image": se,
                  "onUpdate:modelValue": (D) => An(q, D),
                  "onUpdate:file": (D) => Et(q.key, D),
                  onRemoveImage: (D) => Tn(q.key)
                }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
              ]))), 128)),
              w.value ? (I(), B("p", Zb, Q(w.value), 1)) : ne("", !0),
              v("div", Yb, [
                v("button", {
                  type: "submit",
                  disabled: b.value || !R.value,
                  class: "rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed"
                }, Q(b.value ? "Guardando..." : "Guardar diccionario"), 9, Xb),
                v("button", {
                  type: "button",
                  class: "rounded-md border px-4 py-2 text-sm font-semibold",
                  onClick: V
                }, " Cancelar ")
              ])
            ], 32)
          ])
        ])) : ne("", !0)
      ])
    ]));
  }
}), Jb = { class: "rounded-xl border p-3" }, ey = { class: "mb-3 flex items-start justify-between gap-2" }, ty = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide"
}, ny = ["disabled"], ry = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, sy = { class: "space-y-1" }, iy = ["value", "disabled"], oy = { class: "space-y-1" }, ay = ["value", "disabled"], ly = { class: "mt-2 grid gap-2 md:grid-cols-4" }, uy = { class: "space-y-1" }, cy = ["value", "disabled"], dy = ["value"], hy = { class: "space-y-1" }, fy = ["value", "disabled"], py = { class: "space-y-1" }, my = { class: "flex h-[34px] items-center rounded-md border px-2 text-sm" }, gy = ["checked", "disabled"], by = { class: "space-y-1" }, yy = { class: "flex h-[34px] items-center rounded-md border px-2 text-sm" }, vy = ["checked", "disabled"], xy = { class: "mt-2 block space-y-1" }, wy = ["value", "disabled"], Ay = {
  key: 1,
  class: "mt-2 block space-y-1"
}, Ey = ["value", "disabled"], Ny = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, Ty = { class: "space-y-1" }, Sy = ["value", "disabled"], Cy = { class: "space-y-1" }, ky = ["value", "disabled"], _y = {
  key: 3,
  class: "mt-3 rounded-lg border p-2"
}, Ly = { class: "mb-2 flex items-center justify-between" }, qy = ["disabled"], Iy = { class: "space-y-2" }, Oy = {
  key: 4,
  class: "mt-3 rounded-lg border p-2"
}, Ry = /* @__PURE__ */ Se({
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
  setup(n, { emit: e }) {
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
    ], r = n, s = e;
    function i(_) {
      return !!_ && typeof _ == "object" && !Array.isArray(_);
    }
    function a(_) {
      return _ === "date" || _ === "numeric" || _ === "id" || _ === "textarea" || _ === "richtext" || _ === "image" || _ === "select" || _ === "document" || _ === "boolean" || _ === "array" || _ === "map" ? _ : "text";
    }
    function l(_) {
      return typeof _ == "string" ? _ : "";
    }
    function u(_) {
      return Array.isArray(_) ? _.map((T) => String(T).trim()).filter(Boolean) : [];
    }
    function d(_, T) {
      return typeof T == "boolean" ? T : _ === "id";
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
    function h(_) {
      const T = i(_) ? _ : {}, P = a(T.type), z = {
        type: P,
        autogenerated: d(P, T.autogenerated),
        required: !!T.required,
        placeholder: l(T.placeholder),
        helpText: l(T.helpText),
        options: P === "select" ? u(T.options) : [],
        documentSchemaId: P === "document" ? l(T.documentSchemaId) : "",
        documentLabelField: P === "document" ? l(T.documentLabelField) : ""
      };
      return P === "map" && (z.mapFields = Array.isArray(T.mapFields) ? T.mapFields.map((H) => w(H)) : []), P === "array" && (z.itemSchema = h(T.itemSchema)), z;
    }
    function w(_) {
      const T = i(_) ? _ : {};
      return {
        ...h(T),
        key: l(T.key),
        label: l(T.label)
      };
    }
    function E() {
      const _ = h(r.modelValue);
      if (r.withIdentity) {
        const T = w(r.modelValue);
        _.key = T.key, _.label = T.label;
      }
      return _;
    }
    function k(_, T) {
      const P = h(_), z = {
        type: P.type,
        autogenerated: d(P.type, P.autogenerated),
        required: !!P.required,
        placeholder: l(P.placeholder),
        helpText: l(P.helpText),
        options: P.type === "select" ? u(P.options) : [],
        documentSchemaId: P.type === "document" ? l(P.documentSchemaId) : "",
        documentLabelField: P.type === "document" ? l(P.documentLabelField) : ""
      };
      if (P.type === "map" && (z.mapFields = (P.mapFields ?? []).map((H) => w(H))), P.type === "array" && (z.itemSchema = k(P.itemSchema ?? p(), !1)), T) {
        const H = w(_);
        z.key = H.key, z.label = H.label;
      }
      return z;
    }
    function L(_) {
      s("update:modelValue", k(_, r.withIdentity));
    }
    function R(_, T) {
      const P = E();
      P[_] = T, L(P);
    }
    function M(_) {
      const T = E(), P = a(_);
      T.type = P, T.autogenerated = P === "id", P !== "select" && (T.options = []), P !== "document" && (T.documentSchemaId = "", T.documentLabelField = ""), P === "map" ? (T.mapFields = Array.isArray(T.mapFields) ? T.mapFields.map((z) => w(z)) : [], delete T.itemSchema) : P === "array" ? (T.itemSchema = h(T.itemSchema ?? p()), delete T.mapFields) : (delete T.mapFields, delete T.itemSchema), L(T);
    }
    function K(_) {
      const T = E();
      T.required = _, L(T);
    }
    function J(_) {
      const T = E();
      T.autogenerated = T.type === "id" ? !0 : _, L(T);
    }
    function Y(_) {
      const T = E();
      T.placeholder = _, L(T);
    }
    function ae(_) {
      const T = E();
      T.helpText = _, L(T);
    }
    function oe() {
      return (E().options ?? []).join(", ");
    }
    function be(_) {
      const T = E();
      T.options = _.split(",").map((P) => P.trim()).filter(Boolean), L(T);
    }
    function Ae() {
      return E().documentSchemaId ?? "";
    }
    function we() {
      return E().documentLabelField ?? "";
    }
    function y(_) {
      const T = E();
      T.documentSchemaId = _, L(T);
    }
    function F(_) {
      const T = E();
      T.documentLabelField = _, L(T);
    }
    function N() {
      const _ = E();
      return _.type !== "map" || !Array.isArray(_.mapFields) ? [] : _.mapFields.map((T) => w(T));
    }
    function C() {
      const _ = E();
      _.type = "map", _.mapFields = [...N(), b()], L(_);
    }
    function f(_, T) {
      const P = E(), z = N();
      z[_] = w(T), P.mapFields = z, L(P);
    }
    function A(_) {
      const T = E(), P = N();
      P.splice(_, 1), T.mapFields = P, L(T);
    }
    function S() {
      const _ = E();
      return _.type !== "array" ? p() : h(_.itemSchema ?? p());
    }
    function j(_) {
      const T = E();
      T.type = "array", T.itemSchema = h(_), L(T);
    }
    function V() {
      s("remove");
    }
    return (_, T) => {
      const P = Aa("CmsSchemaFieldEditor", !0);
      return I(), B("article", Jb, [
        v("div", ey, [
          n.title ? (I(), B("p", ty, Q(n.title), 1)) : ne("", !0),
          n.canRemove ? (I(), B("button", {
            key: 1,
            type: "button",
            disabled: n.disabled,
            class: "rounded-md border px-2 py-1 text-xs font-semibold disabled:opacity-60",
            onClick: V
          }, " Quitar ", 8, ny)) : ne("", !0)
        ]),
        n.withIdentity ? (I(), B("div", ry, [
          v("label", sy, [
            T[10] || (T[10] = v("span", { class: "text-xs font-semibold" }, "Key", -1)),
            v("input", {
              value: E().key || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: T[0] || (T[0] = (z) => R("key", z.target.value))
            }, null, 40, iy)
          ]),
          v("label", oy, [
            T[11] || (T[11] = v("span", { class: "text-xs font-semibold" }, "Label", -1)),
            v("input", {
              value: E().label || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: T[1] || (T[1] = (z) => R("label", z.target.value))
            }, null, 40, ay)
          ])
        ])) : ne("", !0),
        v("div", ly, [
          v("label", uy, [
            T[12] || (T[12] = v("span", { class: "text-xs font-semibold" }, "Tipo", -1)),
            v("select", {
              value: E().type,
              disabled: n.disabled,
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onChange: T[2] || (T[2] = (z) => M(z.target.value))
            }, [
              (I(), B(Re, null, $e(t, (z) => v("option", {
                key: z.value,
                value: z.value
              }, Q(z.label), 9, dy)), 64))
            ], 40, cy)
          ]),
          v("label", hy, [
            T[13] || (T[13] = v("span", { class: "text-xs font-semibold" }, "Placeholder", -1)),
            v("input", {
              value: E().placeholder || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: T[3] || (T[3] = (z) => Y(z.target.value))
            }, null, 40, fy)
          ]),
          v("label", py, [
            T[15] || (T[15] = v("span", { class: "text-xs font-semibold" }, "Requerido", -1)),
            v("span", my, [
              v("input", {
                checked: !!E().required,
                type: "checkbox",
                disabled: n.disabled,
                onChange: T[4] || (T[4] = (z) => K(z.target.checked))
              }, null, 40, gy),
              T[14] || (T[14] = v("span", { class: "ml-2" }, "Sí", -1))
            ])
          ]),
          v("label", by, [
            T[17] || (T[17] = v("span", { class: "text-xs font-semibold" }, "Autogenerado", -1)),
            v("span", yy, [
              v("input", {
                checked: !!E().autogenerated,
                type: "checkbox",
                disabled: n.disabled || E().type === "id",
                onChange: T[5] || (T[5] = (z) => J(z.target.checked))
              }, null, 40, vy),
              T[16] || (T[16] = v("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        v("label", xy, [
          T[18] || (T[18] = v("span", { class: "text-xs font-semibold" }, "Help text", -1)),
          v("input", {
            value: E().helpText || "",
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
            onInput: T[6] || (T[6] = (z) => ae(z.target.value))
          }, null, 40, wy)
        ]),
        E().type === "select" ? (I(), B("label", Ay, [
          T[19] || (T[19] = v("span", { class: "text-xs font-semibold" }, "Opciones (separadas por coma)", -1)),
          v("input", {
            value: oe(),
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
            onInput: T[7] || (T[7] = (z) => be(z.target.value))
          }, null, 40, Ey)
        ])) : ne("", !0),
        E().type === "document" ? (I(), B("div", Ny, [
          v("label", Ty, [
            T[20] || (T[20] = v("span", { class: "text-xs font-semibold" }, "Schema destino", -1)),
            v("input", {
              value: Ae(),
              type: "text",
              disabled: n.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: T[8] || (T[8] = (z) => y(z.target.value))
            }, null, 40, Sy)
          ]),
          v("label", Cy, [
            T[21] || (T[21] = v("span", { class: "text-xs font-semibold" }, "Campo etiqueta", -1)),
            v("input", {
              value: we(),
              type: "text",
              disabled: n.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: T[9] || (T[9] = (z) => F(z.target.value))
            }, null, 40, ky)
          ])
        ])) : ne("", !0),
        E().type === "map" ? (I(), B("div", _y, [
          v("div", Ly, [
            T[22] || (T[22] = v("p", { class: "text-xs font-bold uppercase tracking-wide" }, "Map fields", -1)),
            v("button", {
              type: "button",
              disabled: n.disabled,
              class: "rounded-md border px-2 py-1 text-xs font-semibold disabled:opacity-60",
              onClick: C
            }, " Agregar campo ", 8, qy)
          ]),
          v("div", Iy, [
            (I(!0), B(Re, null, $e(N(), (z, H) => (I(), Le(P, {
              key: `map-field-${H}`,
              "model-value": z,
              disabled: n.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (U) => f(H, U),
              onRemove: (U) => A(H)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : ne("", !0),
        E().type === "array" ? (I(), B("div", Oy, [
          T[23] || (T[23] = v("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide" }, "Item schema", -1)),
          lt(P, {
            "model-value": S(),
            "with-identity": !1,
            disabled: n.disabled,
            title: "Estructura del ítem",
            "onUpdate:modelValue": j
          }, null, 8, ["model-value", "disabled"])
        ])) : ne("", !0)
      ]);
    };
  }
}), $y = { class: "space-y-4" }, Dy = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, By = {
  key: 1,
  class: "text-sm"
}, Fy = {
  key: 2,
  class: "text-sm"
}, My = {
  key: 3,
  class: "rounded-2xl border p-5"
}, Py = { class: "flex flex-wrap items-center justify-between gap-3" }, jy = { class: "text-lg font-black" }, Uy = { class: "text-xs" }, Vy = ["disabled"], zy = { class: "mt-4 grid gap-3 md:grid-cols-2" }, Hy = { class: "space-y-1" }, Ky = ["value"], Gy = { class: "space-y-1" }, Wy = ["value"], Zy = { class: "space-y-1 md:col-span-2" }, Yy = ["value"], Xy = { class: "space-y-1" }, Qy = ["value"], Jy = { class: "space-y-1" }, e0 = ["value"], t0 = { class: "space-y-1" }, n0 = ["value"], r0 = { class: "space-y-1" }, s0 = ["value"], i0 = {
  key: 0,
  class: "space-y-1"
}, o0 = ["value"], a0 = {
  key: 1,
  class: "space-y-1"
}, l0 = ["value"], u0 = { class: "mt-5 border-t pt-4" }, c0 = { class: "space-y-3" }, d0 = {
  key: 0,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, h0 = {
  key: 1,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, f0 = /* @__PURE__ */ Se({
  __name: "AdminSchemasPage",
  setup(n) {
    const e = os(), t = vr(), r = te([]), s = te(""), i = te(!1), a = te(!1), l = te(null), u = te(!1), d = te(""), p = te(""), b = te(""), h = Te(() => r.value.find((f) => f.id === s.value) ?? null);
    yr(() => {
      w();
    }), Wt(
      () => e.query.schema,
      (f) => {
        typeof f == "string" && r.value.some((A) => A.id === f) && s.value !== f && (s.value = f);
      }
    ), Wt(
      h,
      (f) => {
        if (p.value = "", b.value = "", f) {
          u.value = !1, l.value = J(f);
          return;
        }
        u.value || (l.value = null);
      },
      { immediate: !0 }
    );
    async function w() {
      i.value = !0, d.value = "";
      try {
        const f = await Bi();
        r.value = f, E(f), s.value ? await k(s.value) : l.value || (u.value = !0, l.value = Y());
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
    async function k(f) {
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
    function M(f) {
      const A = {
        type: f.type,
        autogenerated: !!f.autogenerated,
        required: !!f.required,
        placeholder: f.placeholder ?? "",
        helpText: f.helpText ?? "",
        options: Array.isArray(f.options) ? [...f.options] : []
      };
      return f.type === "map" && (A.mapFields = Array.isArray(f.mapFields) ? f.mapFields.map((S) => K(S)) : []), f.type === "array" && (A.itemSchema = f.itemSchema ? M(f.itemSchema) : L()), A;
    }
    function K(f) {
      return {
        ...M(f),
        key: f.key ?? "",
        label: f.label ?? ""
      };
    }
    function J(f) {
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
        fields: f.fields.map((A) => K(A))
      };
    }
    function Y() {
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
      u.value = !0, s.value = "", l.value = Y(), p.value = "", b.value = "";
      const f = { ...e.query };
      delete f.schema, await t.replace({ query: f });
    }
    function oe(f, A) {
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
      l.value && (l.value.fields[f] = K(A));
    }
    function y(f) {
      l.value && l.value.fields.splice(f, 1);
    }
    function F(f, A) {
      if (f.type === "map") {
        const S = Array.isArray(f.mapFields) ? f.mapFields : [];
        for (let j = 0; j < S.length; j += 1)
          N(S[j], `${A}.mapFields[${j}]`);
      }
      f.type === "array" && f.itemSchema && F(f.itemSchema, `${A}.itemSchema`);
    }
    function N(f, A) {
      if (!f.key.trim() || !f.label.trim())
        throw new Error(`${A}: completa key y label.`);
      F(f, A);
    }
    async function C() {
      if (l.value) {
        a.value = !0, p.value = "", b.value = "";
        try {
          const f = l.value;
          if (!f.id.trim() || !f.title.trim() || !f.collectionName.trim())
            throw new Error("Completa id, título y colección del esquema.");
          if (!f.fields.length)
            throw new Error("Agrega al menos un campo al esquema.");
          const A = f.fields.map((V) => K(V));
          for (let V = 0; V < A.length; V += 1)
            N(A[V], `fields[${V}]`);
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
          await Eu(S), await w(), s.value = S.id, u.value = !1, await k(S.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const j = r.value.find((V) => V.id === s.value);
          l.value = J(j || S), b.value = "Esquema actualizado.";
        } catch (f) {
          p.value = f instanceof Error ? f.message : "No se pudo guardar el esquema.";
        } finally {
          a.value = !1;
        }
      }
    }
    return (f, A) => (I(), B("section", $y, [
      v("article", { class: "rounded-2xl border p-5" }, [
        v("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
          A[9] || (A[9] = v("div", null, [
            v("h3", { class: "text-xl font-black" }, "Esquema editable"),
            v("p", { class: "mt-1 text-sm" }, [
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
              class: "rounded-md border px-3 py-1.5 text-xs font-semibold",
              onClick: ae
            }, " Nuevo esquema "),
            v("button", {
              type: "button",
              class: "rounded-md border px-3 py-1.5 text-xs font-semibold",
              onClick: w
            }, " Recargar ")
          ])
        ])
      ]),
      d.value ? (I(), B("p", Dy, Q(d.value), 1)) : ne("", !0),
      i.value ? (I(), B("p", By, "Cargando esquemas...")) : l.value ? (I(), B("article", My, [
        v("div", Py, [
          v("div", null, [
            v("h4", jy, Q(l.value.title || h.value?.title || "Nuevo esquema"), 1),
            v("p", Uy, [
              A[10] || (A[10] = Ye(" ID: ", -1)),
              v("code", null, Q(h.value?.id || "nuevo"), 1)
            ])
          ]),
          v("button", {
            type: "button",
            disabled: a.value,
            class: "rounded-md px-3 py-1.5 text-xs font-semibold",
            onClick: C
          }, Q(a.value ? "Guardando..." : "Guardar cambios"), 9, Vy)
        ]),
        v("div", zy, [
          v("label", Hy, [
            A[11] || (A[11] = v("span", { class: "text-xs font-semibold" }, "ID", -1)),
            v("input", {
              value: l.value.id,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[0] || (A[0] = (S) => oe("id", S.target.value))
            }, null, 40, Ky)
          ]),
          v("label", Gy, [
            A[12] || (A[12] = v("span", { class: "text-xs font-semibold" }, "Título", -1)),
            v("input", {
              value: l.value.title,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[1] || (A[1] = (S) => oe("title", S.target.value))
            }, null, 40, Wy)
          ]),
          v("label", Zy, [
            A[13] || (A[13] = v("span", { class: "text-xs font-semibold" }, "Descripción", -1)),
            v("input", {
              value: l.value.description,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[2] || (A[2] = (S) => oe("description", S.target.value))
            }, null, 40, Yy)
          ]),
          v("label", Xy, [
            A[15] || (A[15] = v("span", { class: "text-xs font-semibold" }, "Tipo de almacenamiento", -1)),
            v("select", {
              value: l.value.storageType,
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onChange: A[3] || (A[3] = (S) => be(S.target.value))
            }, [...A[14] || (A[14] = [
              v("option", { value: "document" }, "document", -1),
              v("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, Qy)
          ]),
          v("label", Jy, [
            A[16] || (A[16] = v("span", { class: "text-xs font-semibold" }, "Colección", -1)),
            v("input", {
              value: l.value.collectionName,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[4] || (A[4] = (S) => oe("collectionName", S.target.value))
            }, null, 40, e0)
          ]),
          v("label", t0, [
            A[17] || (A[17] = v("span", { class: "text-xs font-semibold" }, "Slug desde campo", -1)),
            v("input", {
              value: l.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[5] || (A[5] = (S) => oe("slugFromField", S.target.value))
            }, null, 40, n0)
          ]),
          v("label", r0, [
            A[18] || (A[18] = v("span", { class: "text-xs font-semibold" }, "Campo de preview", -1)),
            v("input", {
              value: l.value.previewField,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[6] || (A[6] = (S) => oe("previewField", S.target.value))
            }, null, 40, s0)
          ]),
          l.value.storageType === "dictionary" ? (I(), B("label", i0, [
            A[19] || (A[19] = v("span", { class: "text-xs font-semibold" }, "Dictionary document ID", -1)),
            v("input", {
              value: l.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[7] || (A[7] = (S) => oe("dictionaryDocumentId", S.target.value))
            }, null, 40, o0)
          ])) : ne("", !0),
          l.value.storageType === "dictionary" ? (I(), B("label", a0, [
            A[20] || (A[20] = v("span", { class: "text-xs font-semibold" }, "Dictionary root key", -1)),
            v("input", {
              value: l.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[8] || (A[8] = (S) => oe("dictionaryRootKey", S.target.value))
            }, null, 40, l0)
          ])) : ne("", !0)
        ]),
        v("div", u0, [
          v("div", { class: "mb-3 flex items-center justify-between" }, [
            A[21] || (A[21] = v("h5", { class: "text-sm font-black uppercase tracking-wide" }, "Campos", -1)),
            v("button", {
              type: "button",
              class: "rounded-md border px-3 py-1.5 text-xs font-semibold",
              onClick: Ae
            }, " Agregar campo ")
          ]),
          v("div", c0, [
            (I(!0), B(Re, null, $e(l.value.fields, (S, j) => (I(), Le(Ry, {
              key: `schema-field-${j}`,
              "model-value": S,
              "can-remove": !0,
              title: `Campo ${j + 1}`,
              "onUpdate:modelValue": (V) => we(j, V),
              onRemove: (V) => y(j)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        p.value ? (I(), B("p", d0, Q(p.value), 1)) : ne("", !0),
        b.value ? (I(), B("p", h0, Q(b.value), 1)) : ne("", !0)
      ])) : (I(), B("p", Fy, "No hay esquema seleccionado."))
    ]));
  }
}), p0 = { class: "rounded-2xl border p-5" }, m0 = {
  key: 0,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, g0 = {
  key: 1,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, b0 = {
  key: 2,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, y0 = {
  key: 3,
  class: "mt-4 text-sm"
}, v0 = {
  key: 4,
  class: "mt-4 text-sm"
}, x0 = {
  key: 5,
  class: "mt-4 space-y-3"
}, w0 = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, A0 = { class: "text-sm font-semibold" }, E0 = { class: "text-xs" }, N0 = { class: "text-xs" }, T0 = { class: "text-xs" }, S0 = { class: "flex flex-wrap gap-3" }, C0 = ["checked", "disabled", "onChange"], k0 = /* @__PURE__ */ Se({
  __name: "AdminUsersPage",
  setup(n) {
    const e = te([]), t = te(!1), r = te(""), s = te(""), i = te(null), a = Te(() => Dn.value === "admin"), l = [
      { label: "Admin", value: "admin" },
      { label: "Writer", value: "writer" },
      { label: "Manager", value: "manager" },
      { label: "Sin rol", value: null }
    ];
    yr(async () => {
      await u();
    });
    async function u() {
      t.value = !0, r.value = "";
      try {
        e.value = await ru();
      } catch {
        r.value = "No se pudieron cargar los usuarios.";
      } finally {
        t.value = !1;
      }
    }
    async function d(w, E) {
      if (s.value = "", r.value = "", !a.value) {
        r.value = "Solo un admin puede cambiar roles.";
        return;
      }
      const k = w.role === E ? null : E;
      i.value = w.id;
      try {
        await su(w.id, k), w.role = k, s.value = "Rol actualizado correctamente.";
      } catch {
        r.value = "No se pudo actualizar el rol.";
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
    return (w, E) => (I(), B("section", p0, [
      v("div", { class: "flex items-center justify-between" }, [
        E[0] || (E[0] = v("h3", { class: "text-xl font-black" }, "Usuarios", -1)),
        v("button", {
          type: "button",
          class: "rounded-md border px-3 py-1.5 text-sm font-semibold",
          onClick: u
        }, " Recargar ")
      ]),
      E[1] || (E[1] = v("p", { class: "mt-1 text-sm" }, "Listado de usuarios con último login y control de rol.", -1)),
      a.value ? ne("", !0) : (I(), B("p", m0, " Solo usuarios con rol admin pueden editar roles. ")),
      r.value ? (I(), B("p", g0, Q(r.value), 1)) : ne("", !0),
      s.value ? (I(), B("p", b0, Q(s.value), 1)) : ne("", !0),
      t.value ? (I(), B("p", y0, "Cargando usuarios...")) : e.value.length === 0 ? (I(), B("p", v0, "No hay usuarios registrados.")) : (I(), B("div", x0, [
        (I(!0), B(Re, null, $e(e.value, (k) => (I(), B("article", {
          key: k.id,
          class: "rounded-lg border p-4"
        }, [
          v("div", w0, [
            v("div", null, [
              v("p", A0, Q(k.email || k.id), 1),
              v("p", E0, "UID: " + Q(k.id), 1),
              v("p", N0, "Último login: " + Q(h(k.lastLoginAt)), 1),
              v("p", T0, "Rol actual: " + Q(b(k.role)), 1)
            ]),
            v("div", S0, [
              (I(), B(Re, null, $e(l, (L) => v("label", {
                key: L.label,
                class: "inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
              }, [
                v("input", {
                  type: "checkbox",
                  checked: p(k.role, L.value),
                  disabled: !a.value || i.value === k.id,
                  onChange: (R) => d(k, L.value)
                }, null, 40, C0),
                Ye(" " + Q(L.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), ya = /* @__PURE__ */ new WeakSet();
function U0(n, e) {
  if (ya.has(n))
    return;
  const t = Pn(e.basePath ?? "/admin"), r = Pn(e.loginPath ?? "/ingresar"), s = Pn(e.registerPath ?? "/registro"), i = L0(e.homePath ?? "/");
  eu(e.firebase), du({ basePath: t, loginPath: r, registerPath: s, homePath: i }), ou();
  const a = _0(t, r, s);
  for (const l of a)
    n.addRoute(l);
  n.beforeEach(async (l) => (await au(), l.meta.cmsRequiresAuth && !dr.value ? {
    path: r,
    query: { redirect: l.fullPath }
  } : (l.path === r || l.path === s || l.meta.cmsGuestOnly) && dr.value ? { path: t } : !0)), ya.add(n);
}
function _0(n = "/admin", e = "/ingresar", t = "/registro") {
  const r = Pn(n), s = Pn(e), i = Pn(t);
  return [
    { path: s, component: gu, meta: { cmsGuestOnly: !0 } },
    { path: i, component: wu, meta: { cmsGuestOnly: !0 } },
    {
      path: r,
      component: tc,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${r}/content` },
        { path: "content", component: Qb, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: f0, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: k0, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function Pn(n) {
  const e = String(n || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function L0(n) {
  const e = String(n || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
export {
  db as actualizarRegistroDocumento,
  cu as cerrarSesion,
  ub as crearRegistroDocumento,
  _0 as createCmsRoutes,
  cb as eliminarRegistroDocumento,
  fb as guardarRegistroDiccionario,
  Eu as guardarSchemaContenido,
  ga as listarRegistrosDocumento,
  Bi as listarSchemasContenido,
  pb as obtenerRegistroDiccionario,
  U0 as registerPifWarriorsCms,
  Dn as rolActual,
  dr as usuarioActual
};
