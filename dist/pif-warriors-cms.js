import { signOut as Vl, onAuthStateChanged as zl, setPersistence as yo, browserLocalPersistence as vo, signInWithEmailAndPassword as Hl, createUserWithEmailAndPassword as Kl } from "firebase/auth";
import { ref as ee, defineComponent as Te, openBlock as I, createElementBlock as F, createElementVNode as v, withModifiers as ar, withDirectives as or, vModelText as lr, toDisplayString as X, createCommentVNode as te, createTextVNode as Ye, createVNode as ut, unref as je, withCtx as Ut, onMounted as yr, onBeforeUnmount as xo, watch as Wt, computed as Oe, normalizeClass as Je, Fragment as Re, renderList as $e, createBlock as _e, resolveComponent as wo } from "vue";
import { query as Ii, collection as dn, orderBy as Oi, getDocs as jn, updateDoc as Ao, doc as Yt, serverTimestamp as Ze, getDoc as is, setDoc as Xr, addDoc as Gl, deleteDoc as Wl, limit as Eo } from "firebase/firestore";
import { useRoute as as, useRouter as vr, RouterLink as Vt, RouterView as Zl } from "vue-router";
import { ref as Yl, uploadBytes as Xl, getDownloadURL as Ql } from "firebase/storage";
let fi = null;
function Jl(n) {
  fi = n;
}
function Ce() {
  if (!fi)
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  return fi;
}
const os = "users";
async function eu(n) {
  const { firestore: e } = Ce(), t = Yt(e, os, n.uid);
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
async function tu(n) {
  const { firestore: e } = Ce(), t = await is(Yt(e, os, n));
  return t.exists() ? No(t.data().role) : null;
}
async function nu() {
  const { firestore: n } = Ce(), e = Ii(dn(n, os), Oi("email", "asc"));
  return (await jn(e)).docs.map((r) => ({
    id: r.id,
    email: String(r.data().email ?? ""),
    role: No(r.data().role),
    lastLoginAt: r.data().lastLoginAt,
    createdAt: r.data().createdAt,
    updatedAt: r.data().updatedAt
  }));
}
async function ru(n, e) {
  const { firestore: t } = Ce();
  await Ao(Yt(t, os, n), {
    role: e,
    updatedAt: Ze()
  });
}
function No(n) {
  return n === "admin" || n === "writer" || n === "manager" ? n : null;
}
const dr = ee(null), To = ee(!1), Dn = ee(null);
let Wr = null, su = new Promise((n) => {
  Wr = n;
}), ia = !1;
function iu() {
  if (ia)
    return;
  const { auth: n } = Ce();
  dr.value = n.currentUser, zl(n, async (e) => {
    dr.value = e, Dn.value = null, e && await Ri(e), To.value = !0, Wr && (Wr(), Wr = null);
  }), ia = !0;
}
async function au() {
  To.value || await su;
}
async function ou(n, e) {
  const { auth: t } = Ce();
  await yo(t, vo);
  const r = await Kl(t, n, e);
  await Ri(r.user);
}
async function lu(n, e) {
  const { auth: t } = Ce();
  await yo(t, vo);
  const r = await Hl(t, n, e);
  await Ri(r.user);
}
async function uu() {
  const { auth: n } = Ce();
  await Vl(n);
}
async function Ri(n) {
  try {
    await eu(n), Dn.value = await tu(n.uid);
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
function cu(n) {
  pi = {
    ...pi,
    ...n
  };
}
function $i() {
  return pi;
}
const du = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, hu = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, fu = ["disabled"], pu = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, mu = /* @__PURE__ */ Te({
  __name: "LoginPage",
  setup(n) {
    const e = as(), t = vr(), { basePath: r, registerPath: s } = $i(), i = ee(""), o = ee(""), l = ee(!1), u = ee("");
    async function d() {
      u.value = "", l.value = !0;
      try {
        await lu(i.value, o.value);
        const p = typeof e.query.redirect == "string" ? e.query.redirect : r;
        await t.push(p);
      } catch {
        u.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, b) => (I(), F("main", du, [
      b[6] || (b[6] = v("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Ingresar", -1)),
      b[7] || (b[7] = v("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Accede para administrar contenido y esquemas.", -1)),
      v("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: ar(d, ["prevent"])
      }, [
        v("div", null, [
          b[2] || (b[2] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          or(v("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [lr, i.value]
          ])
        ]),
        v("div", null, [
          b[3] || (b[3] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          or(v("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (h) => o.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "********"
          }, null, 512), [
            [lr, o.value]
          ])
        ]),
        u.value ? (I(), F("p", hu, X(u.value), 1)) : te("", !0),
        v("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, X(l.value ? "Ingresando..." : "Entrar"), 9, fu)
      ], 32),
      v("p", pu, [
        b[5] || (b[5] = Ye(" ¿No tienes cuenta? ", -1)),
        ut(je(Vt), {
          to: je(s),
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
}), gu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, bu = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, yu = ["disabled"], vu = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, xu = /* @__PURE__ */ Te({
  __name: "RegisterPage",
  setup(n) {
    const e = vr(), { basePath: t, loginPath: r } = $i(), s = ee(""), i = ee(""), o = ee(""), l = ee(!1), u = ee("");
    async function d() {
      if (u.value = "", i.value !== o.value) {
        u.value = "Las contraseñas no coinciden.";
        return;
      }
      l.value = !0;
      try {
        await ou(s.value, i.value), await e.push(t);
      } catch {
        u.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, b) => (I(), F("main", gu, [
      b[8] || (b[8] = v("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Crear cuenta", -1)),
      b[9] || (b[9] = v("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Registro para administrar contenido.", -1)),
      v("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: ar(d, ["prevent"])
      }, [
        v("div", null, [
          b[3] || (b[3] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          or(v("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => s.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [lr, s.value]
          ])
        ]),
        v("div", null, [
          b[4] || (b[4] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          or(v("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (h) => i.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Mínimo 6 caracteres"
          }, null, 512), [
            [lr, i.value]
          ])
        ]),
        v("div", null, [
          b[5] || (b[5] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Confirmar contraseña", -1)),
          or(v("input", {
            "onUpdate:modelValue": b[2] || (b[2] = (h) => o.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [lr, o.value]
          ])
        ]),
        u.value ? (I(), F("p", bu, X(u.value), 1)) : te("", !0),
        v("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, X(l.value ? "Creando cuenta..." : "Registrarme"), 9, yu)
      ], 32),
      v("p", vu, [
        b[7] || (b[7] = Ye(" ¿Ya tienes cuenta? ", -1)),
        ut(je(Vt), {
          to: je(r),
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
}), So = "cmsSchemas", Co = "schema", ko = "main", wu = 3e4;
let Zr = null, mi = 0, er = null;
async function Di() {
  const n = Date.now();
  if (Zr && n - mi < wu)
    return Zr;
  if (er)
    return er;
  const { firestore: e } = Ce();
  er = (async () => {
    const r = (await jn(dn(e, So))).docs.map((s) => {
      const i = s.data();
      return _o({ ...i, id: s.id });
    }).sort((s, i) => s.title.localeCompare(i.title, "es"));
    return Zr = r, mi = Date.now(), r;
  })();
  try {
    return await er;
  } finally {
    er = null;
  }
}
async function Au(n) {
  const { firestore: e } = Ce(), t = _o(n), r = Yt(e, So, t.id);
  await Xr(
    r,
    {
      ...t,
      updatedAt: Ze(),
      createdAt: Ze()
    },
    { merge: !0 }
  ), Eu();
}
function Eu() {
  Zr = null, mi = 0;
}
function _o(n) {
  const e = n;
  let t = [];
  const r = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((u) => Qr(u)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([u, d]) => Qr({ key: u, ...d })
  ));
  const s = typeof e.dictionaryDocumentId == "string" ? e.dictionaryDocumentId : "", i = typeof e.dictionaryRootKey == "string" ? e.dictionaryRootKey : "", o = r === "dictionary" ? Su(s || ko) : "", l = r === "dictionary" ? Cu(i || Co) : "";
  return {
    id: Nu(String(e.id ?? "tipo-contenido")),
    title: String(e.title ?? "Tipo de contenido"),
    description: typeof e.description == "string" ? e.description : "",
    storageType: r,
    collectionName: Tu(String(e.collectionName ?? "registros")),
    dictionaryDocumentId: o,
    dictionaryRootKey: l,
    slugFromField: typeof e.slugFromField == "string" ? e.slugFromField : "",
    previewField: typeof e.previewField == "string" ? e.previewField : "",
    fields: t
  };
}
function Qr(n) {
  const e = qo(n.type), t = {
    key: Bi(String(n.key ?? "campo")),
    label: String(n.label ?? "Campo"),
    type: e,
    autogenerated: Oo(e, n.autogenerated),
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: Io(n.options),
    documentSchemaId: e === "document" ? $o(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Do(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Lo(
    Ro(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Qr(r)) : [] : delete t.mapFields, t;
}
function Lo(n) {
  const e = qo(n.type), t = {
    type: e,
    autogenerated: Oo(e, n.autogenerated),
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: Io(n.options),
    documentSchemaId: e === "document" ? $o(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Do(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Lo(
    Ro(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Qr(r)) : [] : delete t.mapFields, t;
}
function qo(n) {
  return n === "date" || n === "numeric" || n === "id" || n === "textarea" || n === "richtext" || n === "image" || n === "select" || n === "document" || n === "boolean" || n === "array" || n === "map" ? n : "text";
}
function Io(n) {
  return Array.isArray(n) ? n.map((e) => String(e).trim()).filter(Boolean) : [];
}
function Oo(n, e) {
  return typeof e == "boolean" ? e : n === "id";
}
function Ro(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function Bi(n) {
  return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function Nu(n) {
  return n.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function Tu(n) {
  return Bi(n);
}
function Su(n) {
  return String(n).trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || ko;
}
function Cu(n) {
  return String(n).trim().replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "") || Co;
}
function $o(n) {
  return String(n).trim().replace(/[^a-zA-Z0-9_-]/g, "").replace(/-+/g, "-");
}
function Do(n) {
  const e = String(n ?? "").trim();
  return e ? Bi(e) : "";
}
const ku = { class: "cms-root-fixed-height overflow-hidden bg-slate-100" }, _u = { class: "cms-sidebar-header mb-3 flex items-center justify-between lg:mb-0" }, Lu = { class: "text-sm font-black uppercase tracking-wide text-slate-700" }, qu = { class: "px-3" }, Iu = { class: "cms-sidebar-scroll space-y-2" }, Ou = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Ru = { class: "flex items-start justify-between gap-2" }, $u = { class: "material-symbols-outlined text-base leading-none" }, Du = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Bu = { class: "font-semibold" }, Fu = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Mu = {
  key: 1,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Pu = {
  key: 0,
  class: "space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3"
}, ju = { class: "font-semibold" }, Uu = {
  key: 1,
  class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white"
}, Vu = { class: "flex items-start justify-between gap-2" }, zu = { class: "material-symbols-outlined text-base leading-none" }, Hu = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Ku = { class: "font-semibold" }, Gu = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Wu = { class: "cms-sidebar-footer" }, Zu = { class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2" }, Yu = {
  type: "button",
  class: "min-w-0 flex-1 rounded-md bg-white px-3 py-2 text-left text-xs text-slate-700"
}, Xu = { class: "truncate text-slate-600" }, Qu = { class: "mx-auto w-full max-w-7xl space-y-6" }, Ju = { class: "text-xl font-black text-slate-900" }, ec = { class: "mt-3" }, aa = "cms-developer-mode", tc = /* @__PURE__ */ Te({
  __name: "AdminLayoutPage",
  setup(n) {
    const e = as(), t = vr(), { basePath: r, loginPath: s, homePath: i } = $i(), o = ee([]), l = ee(!1), u = ee(!0), d = ee(!0), p = ee(!0), b = ee(!1);
    yr(async () => {
      await h(), typeof window < "u" && window.innerWidth < 1024 && (p.value = !1), typeof window < "u" && (b.value = window.localStorage.getItem(aa) === "true", M()), window.addEventListener("cms-schemas-updated", P);
    }), xo(() => {
      window.removeEventListener("cms-schemas-updated", P);
    }), Wt(
      () => e.fullPath,
      () => {
        e.path.startsWith(`${r}/content`) && (u.value = !0, h()), e.path.startsWith(`${r}/schemas`) && (d.value = !0, h()), typeof window < "u" && window.innerWidth < 1024 && (p.value = !1), M();
      }
    ), Wt(b, (D) => {
      typeof window < "u" && window.localStorage.setItem(aa, D ? "true" : "false"), M();
    });
    async function h() {
      l.value = !0;
      try {
        o.value = await Di();
      } finally {
        l.value = !1;
      }
    }
    const w = Oe(() => e.path.startsWith(`${r}/content`)), E = Oe(() => e.path.startsWith(`${r}/schemas`)), k = Oe(() => o.value.filter((D) => D.storageType === "document")), L = Oe(() => o.value.filter((D) => D.storageType === "dictionary"));
    function R(D) {
      return e.path.startsWith(D);
    }
    function P() {
      h();
    }
    function z(D) {
      return {
        path: `${r}/content`,
        query: { schema: D }
      };
    }
    function Q(D) {
      return {
        path: `${r}/schemas`,
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
      b.value || (e.path.startsWith(`${r}/schemas`) || e.path.startsWith(`${r}/users`)) && await t.replace(`${r}/content`);
    }
    function S(D) {
      return /^(https?:)?\/\//i.test(D);
    }
    async function _() {
      if (i) {
        if (S(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await t.push(i);
      }
    }
    async function f() {
      await uu(), await t.push(s);
    }
    const A = Oe(() => dr.value?.email || "Sin correo"), C = Oe(() => {
      try {
        const D = Ce().auth.app.options.projectId;
        if (typeof D == "string" && D.trim().length > 0)
          return D;
      } catch {
      }
      return "Panel";
    }), j = Oe(() => {
      if (e.path.startsWith(`${r}/content`)) {
        const D = typeof e.query.schema == "string" ? e.query.schema : "", T = o.value.find((N) => N.id === D) ?? o.value[0] ?? null;
        return T ? `Contenido · ${T.title}` : "Contenido";
      }
      return e.path.startsWith(`${r}/schemas`) ? b.value ? "Esquemas" : "Contenido" : e.path.startsWith(`${r}/users`) ? b.value ? "Usuarios" : "Contenido" : "Dashboard";
    });
    return (D, T) => (I(), F("main", ku, [
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
        v("div", _u, [
          v("h2", Lu, X(C.value), 1),
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
        v("div", qu, [
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
        v("div", Iu, [
          v("div", Ou, [
            v("div", Ru, [
              ut(je(Vt), {
                to: `${je(r)}/content`,
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
                v("span", $u, X(u.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            u.value ? (I(), F("div", Du, [
              (I(!0), F(Re, null, $e(L.value, (N) => (I(), _e(je(Vt), {
                key: N.id,
                to: z(N.id),
                class: Je([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  K(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Ut(() => [
                  v("p", Bu, X(N.title), 1),
                  v("p", {
                    class: Je(K(N.id) ? "text-slate-300" : "text-slate-500")
                  }, X(N.storageType) + " · " + X(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (I(), F("p", Fu, " Cargando elementos... ")) : L.value.length ? te("", !0) : (I(), F("p", Mu, " No hay diccionarios configurados. "))
            ])) : te("", !0)
          ]),
          k.value.length ? (I(), F("div", Pu, [
            T[5] || (T[5] = v("p", { class: "px-1 text-[11px] font-black uppercase tracking-wide text-slate-500" }, "Documentos", -1)),
            (I(!0), F(Re, null, $e(k.value, (N) => (I(), _e(je(Vt), {
              key: `document-link-${N.id}`,
              to: z(N.id),
              class: Je([
                "block rounded-lg border px-2 py-1.5 text-xs transition",
                K(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              ])
            }, {
              default: Ut(() => [
                v("p", ju, X(N.title), 1),
                v("p", {
                  class: Je(K(N.id) ? "text-slate-300" : "text-slate-500")
                }, " document · " + X(N.collectionName), 3)
              ]),
              _: 2
            }, 1032, ["to", "class"]))), 128))
          ])) : te("", !0),
          b.value ? (I(), F("div", Uu, [
            v("div", Vu, [
              ut(je(Vt), {
                to: `${je(r)}/schemas`,
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
                v("span", zu, X(d.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            d.value ? (I(), F("div", Hu, [
              (I(!0), F(Re, null, $e(o.value, (N) => (I(), _e(je(Vt), {
                key: `schema-edit-${N.id}`,
                to: Q(N.id),
                class: Je([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  ae(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Ut(() => [
                  v("p", Ku, X(N.title), 1),
                  v("p", {
                    class: Je(ae(N.id) ? "text-slate-300" : "text-slate-500")
                  }, X(N.storageType) + " · " + X(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (I(), F("p", Gu, " Cargando elementos... ")) : te("", !0)
            ])) : te("", !0)
          ])) : te("", !0),
          b.value ? (I(), _e(je(Vt), {
            key: 2,
            to: `${je(r)}/users`,
            class: Je([
              "block rounded-xl border p-3 transition",
              R(`${je(r)}/users`) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            ])
          }, {
            default: Ut(() => [
              T[7] || (T[7] = v("p", { class: "text-sm font-black" }, "Usuarios", -1)),
              v("p", {
                class: Je(["text-xs", R(`${je(r)}/users`) ? "text-slate-200" : "text-slate-500"])
              }, " Roles y último ingreso ", 2)
            ]),
            _: 1
          }, 8, ["to", "class"])) : te("", !0)
        ]),
        v("div", Wu, [
          v("div", Zu, [
            v("button", Yu, [
              T[8] || (T[8] = v("p", { class: "font-semibold text-slate-900" }, "Cuenta actual", -1)),
              v("p", Xu, X(A.value), 1)
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
        v("div", Qu, [
          T[10] || (T[10] = v("section", null, [
            v("h1", { class: "text-3xl font-black text-slate-900" }, "Dashboard"),
            v("p", { class: "mt-2 text-sm text-slate-600" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          v("section", null, [
            v("h2", Ju, X(j.value), 1),
            v("div", ec, [
              ut(je(Zl))
            ])
          ])
        ])
      ], 2)
    ]));
  }
}), nc = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, s] of e)
    t[r] = s;
  return t;
}, rc = /* @__PURE__ */ nc(tc, [["__scopeId", "data-v-effd6d4a"]]), sc = { class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700" }, ic = ["checked", "disabled"], ac = /* @__PURE__ */ Te({
  name: "BooleanFieldInput",
  __name: "BooleanFieldInput",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), F("label", sc, [
      v("input", {
        checked: n.modelValue,
        type: "checkbox",
        disabled: n.disabled,
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.checked))
      }, null, 40, ic),
      s[1] || (s[1] = Ye(" Activo ", -1))
    ]));
  }
}), oc = { class: "space-y-2" }, lc = {
  key: 0,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, uc = { class: "block text-xs font-semibold uppercase tracking-wide text-slate-500" }, cc = {
  key: 0,
  class: "text-xs text-slate-500"
}, dc = {
  key: 0,
  class: "space-y-2"
}, hc = ["value", "disabled", "onChange"], fc = ["value", "disabled", "onInput"], pc = ["disabled", "onClick"], mc = ["disabled"], gc = {
  key: 1,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, bc = { class: "flex items-center justify-between" }, yc = { class: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, vc = ["disabled", "onClick"], xc = ["disabled"], wc = {
  key: 2,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, Ac = ["checked", "disabled"], Ec = ["value", "placeholder", "disabled"], Nc = ["value", "disabled"], Tc = ["value"], Sc = ["value", "placeholder", "disabled"], Cc = ["value", "step", "placeholder", "disabled"], kc = ["value", "placeholder", "disabled"], _c = /* @__PURE__ */ Te({
  name: "CmsNestedValueEditor",
  __name: "CmsNestedValueEditor",
  props: {
    schema: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = Oe(
      () => Array.isArray(t.schema.mapFields) ? t.schema.mapFields : []
    ), i = Oe(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), o = Oe(() => d(t.modelValue)), l = Oe(() => Array.isArray(t.modelValue) ? t.modelValue : []), u = Oe(() => Object.entries(o.value));
    function d(_) {
      return _ && typeof _ == "object" && !Array.isArray(_) ? _ : {};
    }
    function p(_) {
      return _.type === "array" ? [] : _.type === "map" ? {} : _.type === "boolean" ? !1 : _.type === "date" ? "" : _.type === "numeric" || _.type === "id" ? null : "";
    }
    function b(_, f) {
      r("update:modelValue", {
        ...o.value,
        [_]: f
      });
    }
    function h() {
      r("update:modelValue", [...l.value, p(i.value)]);
    }
    function w(_) {
      const f = [...l.value];
      f.splice(_, 1), r("update:modelValue", f);
    }
    function E(_, f) {
      const A = [...l.value];
      A[_] = f, r("update:modelValue", A);
    }
    function k(_) {
      r("update:modelValue", _);
    }
    function L(_) {
      r("update:modelValue", _);
    }
    function R(_) {
      if (!_.trim()) {
        r("update:modelValue", null);
        return;
      }
      const f = Number(_);
      r("update:modelValue", Number.isFinite(f) ? f : null);
    }
    function P(_) {
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
      r("update:modelValue", y(_));
    }
    function Q(_) {
      return y(_);
    }
    function K() {
      const _ = o.value;
      let f = 1, A = `campo_${f}`;
      for (; A in _; )
        f += 1, A = `campo_${f}`;
      r("update:modelValue", {
        ..._,
        [A]: ""
      });
    }
    function ae(_) {
      const f = { ...o.value };
      delete f[_], r("update:modelValue", f);
    }
    function ie(_, f) {
      const A = f.trim();
      if (!A || A === _)
        return;
      const C = { ...o.value }, j = C[_];
      delete C[_], C[A] = j, r("update:modelValue", C);
    }
    function be(_, f) {
      const A = { ...o.value };
      A[_] = we(f), r("update:modelValue", A);
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
          return S(A);
        const C = new Date(f);
        return Number.isNaN(C.getTime()) ? "" : S(C);
      }
      if (_ instanceof Date && !Number.isNaN(_.getTime()))
        return S(_);
      if (_ && typeof _ == "object" && "toDate" in _ && typeof _.toDate == "function") {
        const f = _.toDate();
        if (f instanceof Date && !Number.isNaN(f.getTime()))
          return S(f);
      }
      return "";
    }
    function M(_) {
      const f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(_);
      if (!f)
        return null;
      const A = Number(f[1]), C = Number(f[2]), j = Number(f[3]), D = new Date(Date.UTC(A, C - 1, j));
      return D.getUTCFullYear() !== A || D.getUTCMonth() + 1 !== C || D.getUTCDate() !== j ? null : D;
    }
    function S(_) {
      const f = String(_.getUTCFullYear()).padStart(4, "0"), A = String(_.getUTCMonth() + 1).padStart(2, "0"), C = String(_.getUTCDate()).padStart(2, "0");
      return `${f}-${A}-${C}`;
    }
    return (_, f) => {
      const A = wo("CmsNestedValueEditor", !0);
      return I(), F("div", oc, [
        n.schema.type === "map" ? (I(), F("section", lc, [
          (I(!0), F(Re, null, $e(s.value, (C) => (I(), F("article", {
            key: C.key,
            class: "space-y-1 rounded-md border border-slate-200 bg-white p-3"
          }, [
            v("label", uc, X(C.label), 1),
            C.helpText ? (I(), F("p", cc, X(C.helpText), 1)) : te("", !0),
            ut(A, {
              schema: C,
              "model-value": o.value[C.key],
              disabled: n.disabled,
              "onUpdate:modelValue": (j) => b(C.key, j)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          s.value.length ? te("", !0) : (I(), F("div", dc, [
            (I(!0), F(Re, null, $e(u.value, ([C, j]) => (I(), F("article", {
              key: C,
              class: "grid gap-2 rounded-md border border-slate-200 bg-white p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              v("input", {
                value: C,
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onChange: (D) => ie(C, D.target.value)
              }, null, 40, hc),
              v("input", {
                value: Ae(j),
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onInput: (D) => be(C, D.target.value)
              }, null, 40, fc),
              v("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (D) => ae(C)
              }, " Quitar ", 8, pc)
            ]))), 128)),
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
              disabled: n.disabled,
              onClick: K
            }, " Agregar item ", 8, mc),
            f[6] || (f[6] = v("p", { class: "text-xs text-slate-500" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : n.schema.type === "array" ? (I(), F("section", gc, [
          (I(!0), F(Re, null, $e(l.value, (C, j) => (I(), F("article", {
            key: j,
            class: "space-y-2 rounded-md border border-slate-200 bg-white p-3"
          }, [
            v("div", bc, [
              v("p", yc, "Item " + X(j + 1), 1),
              v("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (D) => w(j)
              }, " Quitar ", 8, vc)
            ]),
            ut(A, {
              schema: i.value,
              "model-value": C,
              disabled: n.disabled,
              "onUpdate:modelValue": (D) => E(j, D)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          v("button", {
            type: "button",
            class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
            disabled: n.disabled,
            onClick: h
          }, " Agregar item ", 8, xc)
        ])) : n.schema.type === "boolean" ? (I(), F("label", wc, [
          v("input", {
            type: "checkbox",
            checked: !!n.modelValue,
            disabled: n.disabled,
            onChange: f[0] || (f[0] = (C) => L(C.target.checked))
          }, null, 40, Ac),
          f[7] || (f[7] = Ye(" Activo ", -1))
        ])) : n.schema.type === "textarea" || n.schema.type === "richtext" ? (I(), F("textarea", {
          key: 3,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          rows: "4",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[1] || (f[1] = (C) => k(C.target.value))
        }, null, 40, Ec)) : n.schema.type === "select" ? (I(), F("select", {
          key: 4,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onChange: f[2] || (f[2] = (C) => k(C.target.value))
        }, [
          f[8] || (f[8] = v("option", { value: "" }, "Selecciona una opción", -1)),
          (I(!0), F(Re, null, $e(n.schema.options || [], (C) => (I(), F("option", {
            key: C,
            value: C
          }, X(C), 9, Tc))), 128))
        ], 40, Nc)) : n.schema.type === "date" ? (I(), F("input", {
          key: 5,
          value: Q(n.modelValue),
          type: "date",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[3] || (f[3] = (C) => z(C.target.value))
        }, null, 40, Sc)) : n.schema.type === "numeric" || n.schema.type === "id" ? (I(), F("input", {
          key: 6,
          value: P(n.modelValue),
          type: "number",
          step: n.schema.type === "id" ? "1" : "any",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[4] || (f[4] = (C) => R(C.target.value))
        }, null, 40, Cc)) : (I(), F("input", {
          key: 7,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          type: "text",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[5] || (f[5] = (C) => k(C.target.value))
        }, null, 40, kc))
      ]);
    };
  }
}), Lc = /* @__PURE__ */ Te({
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
    return (r, s) => (I(), _e(_c, {
      schema: n.field,
      "model-value": n.modelValue,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["schema", "model-value", "disabled"]));
  }
}), qc = ["value", "placeholder", "disabled"], Ic = /* @__PURE__ */ Te({
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
    return (r, s) => (I(), F("input", {
      value: n.modelValue,
      type: "date",
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, qc));
  }
}), Oc = { class: "space-y-2" }, Rc = ["value", "disabled"], $c = ["value"], Dc = {
  key: 0,
  class: "text-xs text-slate-500"
}, Bc = /* @__PURE__ */ Te({
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
    return (r, s) => (I(), F("div", Oc, [
      v("select", {
        value: n.modelValue,
        disabled: n.disabled,
        class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
      }, [
        s[1] || (s[1] = v("option", { value: "" }, "Selecciona un documento", -1)),
        (I(!0), F(Re, null, $e(n.options, (i) => (I(), F("option", {
          key: i.id,
          value: i.id
        }, X(i.label), 9, $c))), 128))
      ], 40, Rc),
      n.hint ? (I(), F("p", Dc, X(n.hint), 1)) : te("", !0)
    ]));
  }
}), Fc = { class: "space-y-2" }, Mc = ["disabled"], Pc = {
  key: 0,
  class: "text-xs text-slate-500 break-all"
}, jc = ["src"], Uc = ["disabled"], Vc = /* @__PURE__ */ Te({
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
    return (s, i) => (I(), F("div", Fc, [
      v("input", {
        type: "file",
        accept: "image/*",
        disabled: n.disabled,
        class: "block w-full text-sm text-slate-600 disabled:opacity-60",
        onChange: r
      }, null, 40, Mc),
      n.modelValue ? (I(), F("p", Pc, " URL actual: " + X(n.modelValue), 1)) : te("", !0),
      n.modelValue ? (I(), F("img", {
        key: 1,
        src: n.modelValue,
        alt: "Vista previa",
        class: "max-h-32 rounded-md border border-slate-200 object-cover"
      }, null, 8, jc)) : te("", !0),
      n.modelValue ? (I(), F("button", {
        key: 2,
        type: "button",
        class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50",
        disabled: n.disabled,
        onClick: i[0] || (i[0] = (o) => t("remove"))
      }, " Quitar URL ", 8, Uc)) : te("", !0)
    ]));
  }
}), zc = ["value", "step", "min", "placeholder", "disabled"], Hc = /* @__PURE__ */ Te({
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
    return (r, s) => (I(), F("input", {
      value: n.modelValue,
      type: "number",
      step: n.step,
      min: n.min ?? void 0,
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, zc));
  }
});
var Bo = typeof global == "object" && global && global.Object === Object && global, Kc = typeof self == "object" && self && self.Object === Object && self, xt = Bo || Kc || Function("return this")(), Zt = xt.Symbol, Fo = Object.prototype, Gc = Fo.hasOwnProperty, Wc = Fo.toString, tr = Zt ? Zt.toStringTag : void 0;
function Zc(n) {
  var e = Gc.call(n, tr), t = n[tr];
  try {
    n[tr] = void 0;
    var r = !0;
  } catch {
  }
  var s = Wc.call(n);
  return r && (e ? n[tr] = t : delete n[tr]), s;
}
var Yc = Object.prototype, Xc = Yc.toString;
function Qc(n) {
  return Xc.call(n);
}
var Jc = "[object Null]", ed = "[object Undefined]", oa = Zt ? Zt.toStringTag : void 0;
function zn(n) {
  return n == null ? n === void 0 ? ed : Jc : oa && oa in Object(n) ? Zc(n) : Qc(n);
}
function Ot(n) {
  return n != null && typeof n == "object";
}
var hn = Array.isArray;
function Xt(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
function Mo(n) {
  return n;
}
var td = "[object AsyncFunction]", nd = "[object Function]", rd = "[object GeneratorFunction]", sd = "[object Proxy]";
function Fi(n) {
  if (!Xt(n))
    return !1;
  var e = zn(n);
  return e == nd || e == rd || e == td || e == sd;
}
var Js = xt["__core-js_shared__"], la = (function() {
  var n = /[^.]+$/.exec(Js && Js.keys && Js.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function id(n) {
  return !!la && la in n;
}
var ad = Function.prototype, od = ad.toString;
function gn(n) {
  if (n != null) {
    try {
      return od.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var ld = /[\\^$.*+?()[\]{}|]/g, ud = /^\[object .+?Constructor\]$/, cd = Function.prototype, dd = Object.prototype, hd = cd.toString, fd = dd.hasOwnProperty, pd = RegExp(
  "^" + hd.call(fd).replace(ld, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function md(n) {
  if (!Xt(n) || id(n))
    return !1;
  var e = Fi(n) ? pd : ud;
  return e.test(gn(n));
}
function gd(n, e) {
  return n?.[e];
}
function bn(n, e) {
  var t = gd(n, e);
  return md(t) ? t : void 0;
}
var gi = bn(xt, "WeakMap"), ua = Object.create, bd = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(e) {
    if (!Xt(e))
      return {};
    if (ua)
      return ua(e);
    n.prototype = e;
    var t = new n();
    return n.prototype = void 0, t;
  };
})();
function yd(n, e, t) {
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
function vd(n, e) {
  var t = -1, r = n.length;
  for (e || (e = Array(r)); ++t < r; )
    e[t] = n[t];
  return e;
}
var xd = 800, wd = 16, Ad = Date.now;
function Ed(n) {
  var e = 0, t = 0;
  return function() {
    var r = Ad(), s = wd - (r - t);
    if (t = r, s > 0) {
      if (++e >= xd)
        return arguments[0];
    } else
      e = 0;
    return n.apply(void 0, arguments);
  };
}
function Nd(n) {
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
})(), Td = Jr ? function(n, e) {
  return Jr(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Nd(e),
    writable: !0
  });
} : Mo, Sd = Ed(Td);
function Cd(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r && e(n[t], t, n) !== !1; )
    ;
  return n;
}
var kd = 9007199254740991, _d = /^(?:0|[1-9]\d*)$/;
function Po(n, e) {
  var t = typeof n;
  return e = e ?? kd, !!e && (t == "number" || t != "symbol" && _d.test(n)) && n > -1 && n % 1 == 0 && n < e;
}
function Mi(n, e, t) {
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
var Ld = Object.prototype, qd = Ld.hasOwnProperty;
function jo(n, e, t) {
  var r = n[e];
  (!(qd.call(n, e) && xr(r, t)) || t === void 0 && !(e in n)) && Mi(n, e, t);
}
function Id(n, e, t, r) {
  var s = !t;
  t || (t = {});
  for (var i = -1, o = e.length; ++i < o; ) {
    var l = e[i], u = void 0;
    u === void 0 && (u = n[l]), s ? Mi(t, l, u) : jo(t, l, u);
  }
  return t;
}
var ca = Math.max;
function Od(n, e, t) {
  return e = ca(e === void 0 ? n.length - 1 : e, 0), function() {
    for (var r = arguments, s = -1, i = ca(r.length - e, 0), o = Array(i); ++s < i; )
      o[s] = r[e + s];
    s = -1;
    for (var l = Array(e + 1); ++s < e; )
      l[s] = r[s];
    return l[e] = t(o), yd(n, this, l);
  };
}
function Rd(n, e) {
  return Sd(Od(n, e, Mo), n + "");
}
var $d = 9007199254740991;
function Uo(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= $d;
}
function ls(n) {
  return n != null && Uo(n.length) && !Fi(n);
}
function Dd(n, e, t) {
  if (!Xt(t))
    return !1;
  var r = typeof e;
  return (r == "number" ? ls(t) && Po(e, t.length) : r == "string" && e in t) ? xr(t[e], n) : !1;
}
function Bd(n) {
  return Rd(function(e, t) {
    var r = -1, s = t.length, i = s > 1 ? t[s - 1] : void 0, o = s > 2 ? t[2] : void 0;
    for (i = n.length > 3 && typeof i == "function" ? (s--, i) : void 0, o && Dd(t[0], t[1], o) && (i = s < 3 ? void 0 : i, s = 1), e = Object(e); ++r < s; ) {
      var l = t[r];
      l && n(e, l, r, i);
    }
    return e;
  });
}
var Fd = Object.prototype;
function Pi(n) {
  var e = n && n.constructor, t = typeof e == "function" && e.prototype || Fd;
  return n === t;
}
function Md(n, e) {
  for (var t = -1, r = Array(n); ++t < n; )
    r[t] = e(t);
  return r;
}
var Pd = "[object Arguments]";
function da(n) {
  return Ot(n) && zn(n) == Pd;
}
var Vo = Object.prototype, jd = Vo.hasOwnProperty, Ud = Vo.propertyIsEnumerable, bi = da(/* @__PURE__ */ (function() {
  return arguments;
})()) ? da : function(n) {
  return Ot(n) && jd.call(n, "callee") && !Ud.call(n, "callee");
};
function Vd() {
  return !1;
}
var zo = typeof exports == "object" && exports && !exports.nodeType && exports, ha = zo && typeof module == "object" && module && !module.nodeType && module, zd = ha && ha.exports === zo, fa = zd ? xt.Buffer : void 0, Hd = fa ? fa.isBuffer : void 0, hr = Hd || Vd, Kd = "[object Arguments]", Gd = "[object Array]", Wd = "[object Boolean]", Zd = "[object Date]", Yd = "[object Error]", Xd = "[object Function]", Qd = "[object Map]", Jd = "[object Number]", eh = "[object Object]", th = "[object RegExp]", nh = "[object Set]", rh = "[object String]", sh = "[object WeakMap]", ih = "[object ArrayBuffer]", ah = "[object DataView]", oh = "[object Float32Array]", lh = "[object Float64Array]", uh = "[object Int8Array]", ch = "[object Int16Array]", dh = "[object Int32Array]", hh = "[object Uint8Array]", fh = "[object Uint8ClampedArray]", ph = "[object Uint16Array]", mh = "[object Uint32Array]", xe = {};
xe[oh] = xe[lh] = xe[uh] = xe[ch] = xe[dh] = xe[hh] = xe[fh] = xe[ph] = xe[mh] = !0;
xe[Kd] = xe[Gd] = xe[ih] = xe[Wd] = xe[ah] = xe[Zd] = xe[Yd] = xe[Xd] = xe[Qd] = xe[Jd] = xe[eh] = xe[th] = xe[nh] = xe[rh] = xe[sh] = !1;
function gh(n) {
  return Ot(n) && Uo(n.length) && !!xe[zn(n)];
}
function ji(n) {
  return function(e) {
    return n(e);
  };
}
var Ho = typeof exports == "object" && exports && !exports.nodeType && exports, ur = Ho && typeof module == "object" && module && !module.nodeType && module, bh = ur && ur.exports === Ho, ei = bh && Bo.process, Un = (function() {
  try {
    var n = ur && ur.require && ur.require("util").types;
    return n || ei && ei.binding && ei.binding("util");
  } catch {
  }
})(), pa = Un && Un.isTypedArray, Ui = pa ? ji(pa) : gh, yh = Object.prototype, vh = yh.hasOwnProperty;
function Ko(n, e) {
  var t = hn(n), r = !t && bi(n), s = !t && !r && hr(n), i = !t && !r && !s && Ui(n), o = t || r || s || i, l = o ? Md(n.length, String) : [], u = l.length;
  for (var d in n)
    (e || vh.call(n, d)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Po(d, u))) && l.push(d);
  return l;
}
function Go(n, e) {
  return function(t) {
    return n(e(t));
  };
}
var xh = Go(Object.keys, Object), wh = Object.prototype, Ah = wh.hasOwnProperty;
function Eh(n) {
  if (!Pi(n))
    return xh(n);
  var e = [];
  for (var t in Object(n))
    Ah.call(n, t) && t != "constructor" && e.push(t);
  return e;
}
function Nh(n) {
  return ls(n) ? Ko(n) : Eh(n);
}
function Th(n) {
  var e = [];
  if (n != null)
    for (var t in Object(n))
      e.push(t);
  return e;
}
var Sh = Object.prototype, Ch = Sh.hasOwnProperty;
function kh(n) {
  if (!Xt(n))
    return Th(n);
  var e = Pi(n), t = [];
  for (var r in n)
    r == "constructor" && (e || !Ch.call(n, r)) || t.push(r);
  return t;
}
function Wo(n) {
  return ls(n) ? Ko(n, !0) : kh(n);
}
var fr = bn(Object, "create");
function _h() {
  this.__data__ = fr ? fr(null) : {}, this.size = 0;
}
function Lh(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var qh = "__lodash_hash_undefined__", Ih = Object.prototype, Oh = Ih.hasOwnProperty;
function Rh(n) {
  var e = this.__data__;
  if (fr) {
    var t = e[n];
    return t === qh ? void 0 : t;
  }
  return Oh.call(e, n) ? e[n] : void 0;
}
var $h = Object.prototype, Dh = $h.hasOwnProperty;
function Bh(n) {
  var e = this.__data__;
  return fr ? e[n] !== void 0 : Dh.call(e, n);
}
var Fh = "__lodash_hash_undefined__";
function Mh(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = fr && e === void 0 ? Fh : e, this;
}
function fn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
fn.prototype.clear = _h;
fn.prototype.delete = Lh;
fn.prototype.get = Rh;
fn.prototype.has = Bh;
fn.prototype.set = Mh;
function Ph() {
  this.__data__ = [], this.size = 0;
}
function us(n, e) {
  for (var t = n.length; t--; )
    if (xr(n[t][0], e))
      return t;
  return -1;
}
var jh = Array.prototype, Uh = jh.splice;
function Vh(n) {
  var e = this.__data__, t = us(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : Uh.call(e, t, 1), --this.size, !0;
}
function zh(n) {
  var e = this.__data__, t = us(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function Hh(n) {
  return us(this.__data__, n) > -1;
}
function Kh(n, e) {
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
$t.prototype.clear = Ph;
$t.prototype.delete = Vh;
$t.prototype.get = zh;
$t.prototype.has = Hh;
$t.prototype.set = Kh;
var pr = bn(xt, "Map");
function Gh() {
  this.size = 0, this.__data__ = {
    hash: new fn(),
    map: new (pr || $t)(),
    string: new fn()
  };
}
function Wh(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function cs(n, e) {
  var t = n.__data__;
  return Wh(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Zh(n) {
  var e = cs(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function Yh(n) {
  return cs(this, n).get(n);
}
function Xh(n) {
  return cs(this, n).has(n);
}
function Qh(n, e) {
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
yn.prototype.clear = Gh;
yn.prototype.delete = Zh;
yn.prototype.get = Yh;
yn.prototype.has = Xh;
yn.prototype.set = Qh;
function Jh(n, e) {
  for (var t = -1, r = e.length, s = n.length; ++t < r; )
    n[s + t] = e[t];
  return n;
}
var Zo = Go(Object.getPrototypeOf, Object), ef = "[object Object]", tf = Function.prototype, nf = Object.prototype, Yo = tf.toString, rf = nf.hasOwnProperty, sf = Yo.call(Object);
function af(n) {
  if (!Ot(n) || zn(n) != ef)
    return !1;
  var e = Zo(n);
  if (e === null)
    return !0;
  var t = rf.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Yo.call(t) == sf;
}
function of() {
  this.__data__ = new $t(), this.size = 0;
}
function lf(n) {
  var e = this.__data__, t = e.delete(n);
  return this.size = e.size, t;
}
function uf(n) {
  return this.__data__.get(n);
}
function cf(n) {
  return this.__data__.has(n);
}
var df = 200;
function hf(n, e) {
  var t = this.__data__;
  if (t instanceof $t) {
    var r = t.__data__;
    if (!pr || r.length < df - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new yn(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function yt(n) {
  var e = this.__data__ = new $t(n);
  this.size = e.size;
}
yt.prototype.clear = of;
yt.prototype.delete = lf;
yt.prototype.get = uf;
yt.prototype.has = cf;
yt.prototype.set = hf;
var Xo = typeof exports == "object" && exports && !exports.nodeType && exports, ma = Xo && typeof module == "object" && module && !module.nodeType && module, ff = ma && ma.exports === Xo, ga = ff ? xt.Buffer : void 0, ba = ga ? ga.allocUnsafe : void 0;
function Qo(n, e) {
  if (e)
    return n.slice();
  var t = n.length, r = ba ? ba(t) : new n.constructor(t);
  return n.copy(r), r;
}
function pf(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, s = 0, i = []; ++t < r; ) {
    var o = n[t];
    e(o, t, n) && (i[s++] = o);
  }
  return i;
}
function mf() {
  return [];
}
var gf = Object.prototype, bf = gf.propertyIsEnumerable, ya = Object.getOwnPropertySymbols, yf = ya ? function(n) {
  return n == null ? [] : (n = Object(n), pf(ya(n), function(e) {
    return bf.call(n, e);
  }));
} : mf;
function vf(n, e, t) {
  var r = e(n);
  return hn(n) ? r : Jh(r, t(n));
}
function yi(n) {
  return vf(n, Nh, yf);
}
var vi = bn(xt, "DataView"), xi = bn(xt, "Promise"), wi = bn(xt, "Set"), va = "[object Map]", xf = "[object Object]", xa = "[object Promise]", wa = "[object Set]", Aa = "[object WeakMap]", Ea = "[object DataView]", wf = gn(vi), Af = gn(pr), Ef = gn(xi), Nf = gn(wi), Tf = gn(gi), at = zn;
(vi && at(new vi(new ArrayBuffer(1))) != Ea || pr && at(new pr()) != va || xi && at(xi.resolve()) != xa || wi && at(new wi()) != wa || gi && at(new gi()) != Aa) && (at = function(n) {
  var e = zn(n), t = e == xf ? n.constructor : void 0, r = t ? gn(t) : "";
  if (r)
    switch (r) {
      case wf:
        return Ea;
      case Af:
        return va;
      case Ef:
        return xa;
      case Nf:
        return wa;
      case Tf:
        return Aa;
    }
  return e;
});
var Sf = Object.prototype, Cf = Sf.hasOwnProperty;
function kf(n) {
  var e = n.length, t = new n.constructor(e);
  return e && typeof n[0] == "string" && Cf.call(n, "index") && (t.index = n.index, t.input = n.input), t;
}
var es = xt.Uint8Array;
function Vi(n) {
  var e = new n.constructor(n.byteLength);
  return new es(e).set(new es(n)), e;
}
function _f(n, e) {
  var t = Vi(n.buffer);
  return new n.constructor(t, n.byteOffset, n.byteLength);
}
var Lf = /\w*$/;
function qf(n) {
  var e = new n.constructor(n.source, Lf.exec(n));
  return e.lastIndex = n.lastIndex, e;
}
var Na = Zt ? Zt.prototype : void 0, Ta = Na ? Na.valueOf : void 0;
function If(n) {
  return Ta ? Object(Ta.call(n)) : {};
}
function Jo(n, e) {
  var t = e ? Vi(n.buffer) : n.buffer;
  return new n.constructor(t, n.byteOffset, n.length);
}
var Of = "[object Boolean]", Rf = "[object Date]", $f = "[object Map]", Df = "[object Number]", Bf = "[object RegExp]", Ff = "[object Set]", Mf = "[object String]", Pf = "[object Symbol]", jf = "[object ArrayBuffer]", Uf = "[object DataView]", Vf = "[object Float32Array]", zf = "[object Float64Array]", Hf = "[object Int8Array]", Kf = "[object Int16Array]", Gf = "[object Int32Array]", Wf = "[object Uint8Array]", Zf = "[object Uint8ClampedArray]", Yf = "[object Uint16Array]", Xf = "[object Uint32Array]";
function Qf(n, e, t) {
  var r = n.constructor;
  switch (e) {
    case jf:
      return Vi(n);
    case Of:
    case Rf:
      return new r(+n);
    case Uf:
      return _f(n);
    case Vf:
    case zf:
    case Hf:
    case Kf:
    case Gf:
    case Wf:
    case Zf:
    case Yf:
    case Xf:
      return Jo(n, t);
    case $f:
      return new r();
    case Df:
    case Mf:
      return new r(n);
    case Bf:
      return qf(n);
    case Ff:
      return new r();
    case Pf:
      return If(n);
  }
}
function el(n) {
  return typeof n.constructor == "function" && !Pi(n) ? bd(Zo(n)) : {};
}
var Jf = "[object Map]";
function ep(n) {
  return Ot(n) && at(n) == Jf;
}
var Sa = Un && Un.isMap, tp = Sa ? ji(Sa) : ep, np = "[object Set]";
function rp(n) {
  return Ot(n) && at(n) == np;
}
var Ca = Un && Un.isSet, sp = Ca ? ji(Ca) : rp, ip = 1, tl = "[object Arguments]", ap = "[object Array]", op = "[object Boolean]", lp = "[object Date]", up = "[object Error]", nl = "[object Function]", cp = "[object GeneratorFunction]", dp = "[object Map]", hp = "[object Number]", rl = "[object Object]", fp = "[object RegExp]", pp = "[object Set]", mp = "[object String]", gp = "[object Symbol]", bp = "[object WeakMap]", yp = "[object ArrayBuffer]", vp = "[object DataView]", xp = "[object Float32Array]", wp = "[object Float64Array]", Ap = "[object Int8Array]", Ep = "[object Int16Array]", Np = "[object Int32Array]", Tp = "[object Uint8Array]", Sp = "[object Uint8ClampedArray]", Cp = "[object Uint16Array]", kp = "[object Uint32Array]", ve = {};
ve[tl] = ve[ap] = ve[yp] = ve[vp] = ve[op] = ve[lp] = ve[xp] = ve[wp] = ve[Ap] = ve[Ep] = ve[Np] = ve[dp] = ve[hp] = ve[rl] = ve[fp] = ve[pp] = ve[mp] = ve[gp] = ve[Tp] = ve[Sp] = ve[Cp] = ve[kp] = !0;
ve[up] = ve[nl] = ve[bp] = !1;
function Yr(n, e, t, r, s, i) {
  var o, l = e & ip;
  if (o !== void 0)
    return o;
  if (!Xt(n))
    return n;
  var u = hn(n);
  if (u)
    o = kf(n);
  else {
    var d = at(n), p = d == nl || d == cp;
    if (hr(n))
      return Qo(n, l);
    if (d == rl || d == tl || p && !s)
      o = p ? {} : el(n);
    else {
      if (!ve[d])
        return s ? n : {};
      o = Qf(n, d, l);
    }
  }
  i || (i = new yt());
  var b = i.get(n);
  if (b)
    return b;
  i.set(n, o), sp(n) ? n.forEach(function(E) {
    o.add(Yr(E, e, t, E, n, i));
  }) : tp(n) && n.forEach(function(E, k) {
    o.set(k, Yr(E, e, t, k, n, i));
  });
  var h = yi, w = u ? void 0 : h(n);
  return Cd(w || n, function(E, k) {
    w && (k = E, E = n[k]), jo(o, k, Yr(E, e, t, k, n, i));
  }), o;
}
var _p = 1, Lp = 4;
function Bn(n) {
  return Yr(n, _p | Lp);
}
var qp = "__lodash_hash_undefined__";
function Ip(n) {
  return this.__data__.set(n, qp), this;
}
function Op(n) {
  return this.__data__.has(n);
}
function ts(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new yn(); ++e < t; )
    this.add(n[e]);
}
ts.prototype.add = ts.prototype.push = Ip;
ts.prototype.has = Op;
function Rp(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (e(n[t], t, n))
      return !0;
  return !1;
}
function $p(n, e) {
  return n.has(e);
}
var Dp = 1, Bp = 2;
function sl(n, e, t, r, s, i) {
  var o = t & Dp, l = n.length, u = e.length;
  if (l != u && !(o && u > l))
    return !1;
  var d = i.get(n), p = i.get(e);
  if (d && p)
    return d == e && p == n;
  var b = -1, h = !0, w = t & Bp ? new ts() : void 0;
  for (i.set(n, e), i.set(e, n); ++b < l; ) {
    var E = n[b], k = e[b];
    if (r)
      var L = o ? r(k, E, b, e, n, i) : r(E, k, b, n, e, i);
    if (L !== void 0) {
      if (L)
        continue;
      h = !1;
      break;
    }
    if (w) {
      if (!Rp(e, function(R, P) {
        if (!$p(w, P) && (E === R || s(E, R, t, r, i)))
          return w.push(P);
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
function Fp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r, s) {
    t[++e] = [s, r];
  }), t;
}
function Mp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var Pp = 1, jp = 2, Up = "[object Boolean]", Vp = "[object Date]", zp = "[object Error]", Hp = "[object Map]", Kp = "[object Number]", Gp = "[object RegExp]", Wp = "[object Set]", Zp = "[object String]", Yp = "[object Symbol]", Xp = "[object ArrayBuffer]", Qp = "[object DataView]", ka = Zt ? Zt.prototype : void 0, ti = ka ? ka.valueOf : void 0;
function Jp(n, e, t, r, s, i, o) {
  switch (t) {
    case Qp:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case Xp:
      return !(n.byteLength != e.byteLength || !i(new es(n), new es(e)));
    case Up:
    case Vp:
    case Kp:
      return xr(+n, +e);
    case zp:
      return n.name == e.name && n.message == e.message;
    case Gp:
    case Zp:
      return n == e + "";
    case Hp:
      var l = Fp;
    case Wp:
      var u = r & Pp;
      if (l || (l = Mp), n.size != e.size && !u)
        return !1;
      var d = o.get(n);
      if (d)
        return d == e;
      r |= jp, o.set(n, e);
      var p = sl(l(n), l(e), r, s, i, o);
      return o.delete(n), p;
    case Yp:
      if (ti)
        return ti.call(n) == ti.call(e);
  }
  return !1;
}
var em = 1, tm = Object.prototype, nm = tm.hasOwnProperty;
function rm(n, e, t, r, s, i) {
  var o = t & em, l = yi(n), u = l.length, d = yi(e), p = d.length;
  if (u != p && !o)
    return !1;
  for (var b = u; b--; ) {
    var h = l[b];
    if (!(o ? h in e : nm.call(e, h)))
      return !1;
  }
  var w = i.get(n), E = i.get(e);
  if (w && E)
    return w == e && E == n;
  var k = !0;
  i.set(n, e), i.set(e, n);
  for (var L = o; ++b < u; ) {
    h = l[b];
    var R = n[h], P = e[h];
    if (r)
      var z = o ? r(P, R, h, e, n, i) : r(R, P, h, n, e, i);
    if (!(z === void 0 ? R === P || s(R, P, t, r, i) : z)) {
      k = !1;
      break;
    }
    L || (L = h == "constructor");
  }
  if (k && !L) {
    var Q = n.constructor, K = e.constructor;
    Q != K && "constructor" in n && "constructor" in e && !(typeof Q == "function" && Q instanceof Q && typeof K == "function" && K instanceof K) && (k = !1);
  }
  return i.delete(n), i.delete(e), k;
}
var sm = 1, _a = "[object Arguments]", La = "[object Array]", Fr = "[object Object]", im = Object.prototype, qa = im.hasOwnProperty;
function am(n, e, t, r, s, i) {
  var o = hn(n), l = hn(e), u = o ? La : at(n), d = l ? La : at(e);
  u = u == _a ? Fr : u, d = d == _a ? Fr : d;
  var p = u == Fr, b = d == Fr, h = u == d;
  if (h && hr(n)) {
    if (!hr(e))
      return !1;
    o = !0, p = !1;
  }
  if (h && !p)
    return i || (i = new yt()), o || Ui(n) ? sl(n, e, t, r, s, i) : Jp(n, e, u, t, r, s, i);
  if (!(t & sm)) {
    var w = p && qa.call(n, "__wrapped__"), E = b && qa.call(e, "__wrapped__");
    if (w || E) {
      var k = w ? n.value() : n, L = E ? e.value() : e;
      return i || (i = new yt()), s(k, L, t, r, i);
    }
  }
  return h ? (i || (i = new yt()), rm(n, e, t, r, s, i)) : !1;
}
function il(n, e, t, r, s) {
  return n === e ? !0 : n == null || e == null || !Ot(n) && !Ot(e) ? n !== n && e !== e : am(n, e, t, r, il, s);
}
function om(n) {
  return function(e, t, r) {
    for (var s = -1, i = Object(e), o = r(e), l = o.length; l--; ) {
      var u = o[++s];
      if (t(i[u], u, i) === !1)
        break;
    }
    return e;
  };
}
var lm = om();
function Ai(n, e, t) {
  (t !== void 0 && !xr(n[e], t) || t === void 0 && !(e in n)) && Mi(n, e, t);
}
function um(n) {
  return Ot(n) && ls(n);
}
function Ei(n, e) {
  if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
    return n[e];
}
function cm(n) {
  return Id(n, Wo(n));
}
function dm(n, e, t, r, s, i, o) {
  var l = Ei(n, t), u = Ei(e, t), d = o.get(u);
  if (d) {
    Ai(n, t, d);
    return;
  }
  var p = i ? i(l, u, t + "", n, e, o) : void 0, b = p === void 0;
  if (b) {
    var h = hn(u), w = !h && hr(u), E = !h && !w && Ui(u);
    p = u, h || w || E ? hn(l) ? p = l : um(l) ? p = vd(l) : w ? (b = !1, p = Qo(u, !0)) : E ? (b = !1, p = Jo(u, !0)) : p = [] : af(u) || bi(u) ? (p = l, bi(l) ? p = cm(l) : (!Xt(l) || Fi(l)) && (p = el(u))) : b = !1;
  }
  b && (o.set(u, p), s(p, u, r, i, o), o.delete(u)), Ai(n, t, p);
}
function al(n, e, t, r, s) {
  n !== e && lm(e, function(i, o) {
    if (s || (s = new yt()), Xt(i))
      dm(n, e, o, t, al, r, s);
    else {
      var l = r ? r(Ei(n, o), i, o + "", n, e, s) : void 0;
      l === void 0 && (l = i), Ai(n, o, l);
    }
  }, Wo);
}
function zi(n, e) {
  return il(n, e);
}
var Kt = Bd(function(n, e, t) {
  al(n, e, t);
}), W = /* @__PURE__ */ ((n) => (n[n.TYPE = 3] = "TYPE", n[n.LEVEL = 12] = "LEVEL", n[n.ATTRIBUTE = 13] = "ATTRIBUTE", n[n.BLOT = 14] = "BLOT", n[n.INLINE = 7] = "INLINE", n[n.BLOCK = 11] = "BLOCK", n[n.BLOCK_BLOT = 10] = "BLOCK_BLOT", n[n.INLINE_BLOT = 6] = "INLINE_BLOT", n[n.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", n[n.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", n[n.ANY = 15] = "ANY", n))(W || {});
class vt {
  constructor(e, t, r = {}) {
    this.attrName = e, this.keyName = t;
    const s = W.TYPE & W.ATTRIBUTE;
    this.scope = r.scope != null ? (
      // Ignore type bits, force attribute bit
      r.scope & W.LEVEL | s
    ) : W.ATTRIBUTE, r.whitelist != null && (this.whitelist = r.whitelist);
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
const ol = class Ni {
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
    const i = s, o = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : i.create(r)
    ), l = new i(e, o, r);
    return Ni.blots.set(l.domNode, l), l;
  }
  find(e, t = !1) {
    return Ni.find(e, t);
  }
  query(e, t = W.ANY) {
    let r;
    return typeof e == "string" ? r = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? r = this.types.text : typeof e == "number" ? e & W.LEVEL & W.BLOCK ? r = this.types.block : e & W.LEVEL & W.INLINE && (r = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((s) => (r = this.classes[s], !!r)), r = r || this.tags[e.tagName]), r == null ? null : "scope" in r && t & W.LEVEL & r.scope && t & W.TYPE & r.scope ? r : null;
  }
  register(...e) {
    return e.map((t) => {
      const r = "blotName" in t, s = "attrName" in t;
      if (!r && !s)
        throw new Fn("Invalid definition");
      if (r && t.blotName === "abstract")
        throw new Fn("Cannot register abstract class");
      const i = r ? t.blotName : s ? t.attrName : void 0;
      return this.types[i] = t, s ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : r && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((o) => o.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((o) => {
        (this.tags[o] == null || t.className == null) && (this.tags[o] = t);
      }))), t;
    });
  }
};
ol.blots = /* @__PURE__ */ new WeakMap();
let Vn = ol;
function Ia(n, e) {
  return (n.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class hm extends vt {
  static keys(e) {
    return (e.getAttribute("class") || "").split(/\s+/).map((t) => t.split("-").slice(0, -1).join("-"));
  }
  add(e, t) {
    return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
  }
  remove(e) {
    Ia(e, this.keyName).forEach((t) => {
      e.classList.remove(t);
    }), e.classList.length === 0 && e.removeAttribute("class");
  }
  value(e) {
    const t = (Ia(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(e, t) ? t : "";
  }
}
const ht = hm;
function ni(n) {
  const e = n.split("-"), t = e.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  return e[0] + t;
}
class fm extends vt {
  static keys(e) {
    return (e.getAttribute("style") || "").split(";").map((t) => t.split(":")[0].trim());
  }
  add(e, t) {
    return this.canAdd(e, t) ? (e.style[ni(this.keyName)] = t, !0) : !1;
  }
  remove(e) {
    e.style[ni(this.keyName)] = "", e.getAttribute("style") || e.removeAttribute("style");
  }
  value(e) {
    const t = e.style[ni(this.keyName)];
    return this.canAdd(e, t) ? t : "";
  }
}
const Qt = fm;
class pm {
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
    const t = vt.keys(this.domNode), r = ht.keys(this.domNode), s = Qt.keys(this.domNode);
    t.concat(r).concat(s).forEach((i) => {
      const o = e.scroll.query(i, W.ATTRIBUTE);
      o instanceof vt && (this.attributes[o.attrName] = o);
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
const ds = pm, ll = class {
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
    if (this.scroll.query(r, W.BLOT) != null && s)
      i.wrap(r, s);
    else if (this.scroll.query(r, W.ATTRIBUTE) != null) {
      const o = this.scroll.create(this.statics.scope);
      i.wrap(o), o.format(r, s);
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
ll.blotName = "abstract";
let ul = ll;
const cl = class extends ul {
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
cl.scope = W.INLINE_BLOT;
let mm = cl;
const Ue = mm;
class gm {
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
    let o = e - i;
    const l = this.iterator(s);
    let u = l();
    for (; u && o < e + t; ) {
      const d = u.length();
      e > o ? r(
        u,
        e - o,
        Math.min(t, o + d - e)
      ) : r(u, 0, Math.min(d, e + t - o)), o += d, u = l();
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
function Oa(n, e) {
  const t = e.find(n);
  if (t)
    return t;
  try {
    return e.create(n);
  } catch {
    const r = e.create(W.INLINE);
    return Array.from(n.childNodes).forEach((s) => {
      r.domNode.appendChild(s);
    }), n.parentNode && n.parentNode.replaceChild(r.domNode, n), r.attach(), r;
  }
}
const dl = class jt extends ul {
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
    this.children = new gm(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = Oa(e, this.scroll);
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
      (o, l, u) => {
        (e.blotName == null && e(o) || e.blotName != null && o instanceof e) && s.push(o), o instanceof jt && (s = s.concat(
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
        (r) => t instanceof r
      ) || (t.statics.scope === W.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof jt ? t.unwrap() : t.remove());
    });
  }
  formatAt(e, t, r, s) {
    this.children.forEachAt(e, t, (i, o, l) => {
      i.formatAt(o, l, r, s);
    });
  }
  insertAt(e, t, r) {
    const [s, i] = this.children.find(e);
    if (s)
      s.insertAt(i, t, r);
    else {
      const o = r == null ? this.scroll.create("text", t) : this.scroll.create(t, r);
      this.appendChild(o);
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
    return this.parent && this.parent.insertBefore(r, this.next || void 0), this.children.forEachAt(e, this.length(), (s, i, o) => {
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
      const o = this.scroll.find(i);
      o != null && (o.domNode.parentNode == null || o.domNode.parentNode === this.domNode) && o.detach();
    }), r.filter((i) => i.parentNode === this.domNode && i !== this.uiNode).sort((i, o) => i === o ? 0 : i.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((i) => {
      let o = null;
      i.nextSibling != null && (o = this.scroll.find(i.nextSibling));
      const l = Oa(i, this.scroll);
      (l.next !== o || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
dl.uiClass = "";
let bm = dl;
const ct = bm;
function ym(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length)
    return !1;
  for (const t in n)
    if (n[t] !== e[t])
      return !1;
  return !0;
}
const qn = class In extends ct {
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
      const r = this.scroll.query(e, W.INLINE);
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
    this.formats()[r] != null || this.scroll.query(r, W.ATTRIBUTE) ? this.isolate(e, t).format(r, s) : super.formatAt(e, t, r, s);
  }
  optimize(e) {
    super.optimize(e);
    const t = this.formats();
    if (Object.keys(t).length === 0)
      return this.unwrap();
    const r = this.next;
    r instanceof In && r.prev === this && ym(t, r.formats()) && (r.moveChildren(this), r.remove());
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
qn.allowedChildren = [qn, Ue], qn.blotName = "inline", qn.scope = W.INLINE_BLOT, qn.tagName = "SPAN";
let vm = qn;
const Hi = vm, On = class Ti extends ct {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(Ti.blotName);
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
    const r = this.scroll.query(e, W.BLOCK);
    r != null && (r instanceof vt ? this.attributes.attribute(r, t) : e === this.statics.blotName && !t ? this.replaceWith(Ti.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, r, s) {
    this.scroll.query(r, W.BLOCK) != null ? this.format(r, s) : super.formatAt(e, t, r, s);
  }
  insertAt(e, t, r) {
    if (r == null || this.scroll.query(t, W.INLINE) != null)
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
On.blotName = "block", On.scope = W.BLOCK_BLOT, On.tagName = "P", On.allowedChildren = [
  Hi,
  On,
  Ue
];
let xm = On;
const mr = xm, Si = class extends ct {
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
Si.blotName = "container", Si.scope = W.BLOCK_BLOT;
let wm = Si;
const hs = wm;
class Am extends Ue {
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
const Xe = Am, Em = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, Nm = 100, Rn = class extends ct {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((r) => {
      this.update(r);
    }), this.observer.observe(this.domNode, Em), this.attach();
  }
  create(e, t) {
    return this.registry.create(this, e, t);
  }
  find(e, t = !1) {
    const r = this.registry.find(e, t);
    return r ? r.scroll === this ? r : t ? this.find(r.scroll.domNode.parentNode, !0) : null : null;
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
    }, o = (u) => {
      r.has(u.domNode) && (u instanceof ct && u.children.forEach(o), r.delete(u.domNode), u.optimize(t));
    };
    let l = e;
    for (let u = 0; l.length > 0; u += 1) {
      if (u >= Nm)
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
    const r = /* @__PURE__ */ new WeakMap();
    e.map((s) => {
      const i = this.find(s.target, !0);
      return i == null ? null : r.has(i.domNode) ? (r.get(i.domNode).push(s), null) : (r.set(i.domNode, [s]), i);
    }).forEach((s) => {
      s != null && s !== this && r.has(s.domNode) && s.update(r.get(s.domNode) || [], t);
    }), t.mutationsMap = r, r.has(this.domNode) && super.update(r.get(this.domNode), t), this.optimize(e, t);
  }
};
Rn.blotName = "scroll", Rn.defaultChild = mr, Rn.allowedChildren = [mr, hs], Rn.scope = W.BLOCK_BLOT, Rn.tagName = "DIV";
let Tm = Rn;
const Ki = Tm, Ci = class hl extends Ue {
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
    super.optimize(e), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof hl && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Ci.blotName = "text", Ci.scope = W.INLINE_BLOT;
let Sm = Ci;
const ns = Sm, Cm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: vt,
  AttributorStore: ds,
  BlockBlot: mr,
  ClassAttributor: ht,
  ContainerBlot: hs,
  EmbedBlot: Xe,
  InlineBlot: Hi,
  LeafBlot: Ue,
  ParentBlot: ct,
  Registry: Vn,
  Scope: W,
  ScrollBlot: Ki,
  StyleAttributor: Qt,
  TextBlot: ns
}, Symbol.toStringTag, { value: "Module" }));
var zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function fl(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Mr = { exports: {} }, ri, Ra;
function km() {
  if (Ra) return ri;
  Ra = 1;
  var n = -1, e = 1, t = 0;
  function r(y, M, S, _, f) {
    if (y === M)
      return y ? [[t, y]] : [];
    if (S != null) {
      var A = Ae(y, M, S);
      if (A)
        return A;
    }
    var C = l(y, M), j = y.substring(0, C);
    y = y.substring(C), M = M.substring(C), C = d(y, M);
    var D = y.substring(y.length - C);
    y = y.substring(0, y.length - C), M = M.substring(0, M.length - C);
    var T = s(y, M);
    return j && T.unshift([t, j]), D && T.push([t, D]), P(T, f), _ && b(T), T;
  }
  function s(y, M) {
    var S;
    if (!y)
      return [[e, M]];
    if (!M)
      return [[n, y]];
    var _ = y.length > M.length ? y : M, f = y.length > M.length ? M : y, A = _.indexOf(f);
    if (A !== -1)
      return S = [
        [e, _.substring(0, A)],
        [t, f],
        [e, _.substring(A + f.length)]
      ], y.length > M.length && (S[0][0] = S[2][0] = n), S;
    if (f.length === 1)
      return [
        [n, y],
        [e, M]
      ];
    var C = p(y, M);
    if (C) {
      var j = C[0], D = C[1], T = C[2], N = C[3], U = C[4], V = r(j, T), J = r(D, N);
      return V.concat([[t, U]], J);
    }
    return i(y, M);
  }
  function i(y, M) {
    for (var S = y.length, _ = M.length, f = Math.ceil((S + _) / 2), A = f, C = 2 * f, j = new Array(C), D = new Array(C), T = 0; T < C; T++)
      j[T] = -1, D[T] = -1;
    j[A + 1] = 0, D[A + 1] = 0;
    for (var N = S - _, U = N % 2 !== 0, V = 0, J = 0, Z = 0, ge = 0, ye = 0; ye < f; ye++) {
      for (var re = -ye + V; re <= ye - J; re += 2) {
        var oe = A + re, le;
        re === -ye || re !== ye && j[oe - 1] < j[oe + 1] ? le = j[oe + 1] : le = j[oe - 1] + 1;
        for (var ce = le - re; le < S && ce < _ && y.charAt(le) === M.charAt(ce); )
          le++, ce++;
        if (j[oe] = le, le > S)
          J += 2;
        else if (ce > _)
          V += 2;
        else if (U) {
          var de = A + N - re;
          if (de >= 0 && de < C && D[de] !== -1) {
            var pe = S - D[de];
            if (le >= pe)
              return o(y, M, le, ce);
          }
        }
      }
      for (var Ee = -ye + Z; Ee <= ye - ge; Ee += 2) {
        var de = A + Ee, pe;
        Ee === -ye || Ee !== ye && D[de - 1] < D[de + 1] ? pe = D[de + 1] : pe = D[de - 1] + 1;
        for (var ke = pe - Ee; pe < S && ke < _ && y.charAt(S - pe - 1) === M.charAt(_ - ke - 1); )
          pe++, ke++;
        if (D[de] = pe, pe > S)
          ge += 2;
        else if (ke > _)
          Z += 2;
        else if (!U) {
          var oe = A + N - Ee;
          if (oe >= 0 && oe < C && j[oe] !== -1) {
            var le = j[oe], ce = A + le - oe;
            if (pe = S - pe, le >= pe)
              return o(y, M, le, ce);
          }
        }
      }
    }
    return [
      [n, y],
      [e, M]
    ];
  }
  function o(y, M, S, _) {
    var f = y.substring(0, S), A = M.substring(0, _), C = y.substring(S), j = M.substring(_), D = r(f, A), T = r(C, j);
    return D.concat(T);
  }
  function l(y, M) {
    if (!y || !M || y.charAt(0) !== M.charAt(0))
      return 0;
    for (var S = 0, _ = Math.min(y.length, M.length), f = _, A = 0; S < f; )
      y.substring(A, f) == M.substring(A, f) ? (S = f, A = S) : _ = f, f = Math.floor((_ - S) / 2 + S);
    return z(y.charCodeAt(f - 1)) && f--, f;
  }
  function u(y, M) {
    var S = y.length, _ = M.length;
    if (S == 0 || _ == 0)
      return 0;
    S > _ ? y = y.substring(S - _) : S < _ && (M = M.substring(0, S));
    var f = Math.min(S, _);
    if (y == M)
      return f;
    for (var A = 0, C = 1; ; ) {
      var j = y.substring(f - C), D = M.indexOf(j);
      if (D == -1)
        return A;
      C += D, (D == 0 || y.substring(f - C) == M.substring(0, C)) && (A = C, C++);
    }
  }
  function d(y, M) {
    if (!y || !M || y.slice(-1) !== M.slice(-1))
      return 0;
    for (var S = 0, _ = Math.min(y.length, M.length), f = _, A = 0; S < f; )
      y.substring(y.length - f, y.length - A) == M.substring(M.length - f, M.length - A) ? (S = f, A = S) : _ = f, f = Math.floor((_ - S) / 2 + S);
    return Q(y.charCodeAt(y.length - f)) && f--, f;
  }
  function p(y, M) {
    var S = y.length > M.length ? y : M, _ = y.length > M.length ? M : y;
    if (S.length < 4 || _.length * 2 < S.length)
      return null;
    function f(J, Z, ge) {
      for (var ye = J.substring(ge, ge + Math.floor(J.length / 4)), re = -1, oe = "", le, ce, de, pe; (re = Z.indexOf(ye, re + 1)) !== -1; ) {
        var Ee = l(
          J.substring(ge),
          Z.substring(re)
        ), ke = d(
          J.substring(0, ge),
          Z.substring(0, re)
        );
        oe.length < ke + Ee && (oe = Z.substring(re - ke, re) + Z.substring(re, re + Ee), le = J.substring(0, ge - ke), ce = J.substring(ge + Ee), de = Z.substring(0, re - ke), pe = Z.substring(re + Ee));
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
      S,
      _,
      Math.ceil(S.length / 4)
    ), C = f(
      S,
      _,
      Math.ceil(S.length / 2)
    ), j;
    if (!A && !C)
      return null;
    C ? A ? j = A[4].length > C[4].length ? A : C : j = C : j = A;
    var D, T, N, U;
    y.length > M.length ? (D = j[0], T = j[1], N = j[2], U = j[3]) : (N = j[0], U = j[1], D = j[2], T = j[3]);
    var V = j[4];
    return [D, T, N, U, V];
  }
  function b(y) {
    for (var M = !1, S = [], _ = 0, f = null, A = 0, C = 0, j = 0, D = 0, T = 0; A < y.length; )
      y[A][0] == t ? (S[_++] = A, C = D, j = T, D = 0, T = 0, f = y[A][1]) : (y[A][0] == e ? D += y[A][1].length : T += y[A][1].length, f && f.length <= Math.max(C, j) && f.length <= Math.max(D, T) && (y.splice(S[_ - 1], 0, [
        n,
        f
      ]), y[S[_ - 1] + 1][0] = e, _--, _--, A = _ > 0 ? S[_ - 1] : -1, C = 0, j = 0, D = 0, T = 0, f = null, M = !0)), A++;
    for (M && P(y), R(y), A = 1; A < y.length; ) {
      if (y[A - 1][0] == n && y[A][0] == e) {
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
        ), y[A + 1][0] = n, y[A + 1][1] = N.substring(J), A++), A++;
      }
      A++;
    }
  }
  var h = /[^a-zA-Z0-9]/, w = /\s/, E = /[\r\n]/, k = /\n\r?\n$/, L = /^\r?\n\r?\n/;
  function R(y) {
    function M(J, Z) {
      if (!J || !Z)
        return 6;
      var ge = J.charAt(J.length - 1), ye = Z.charAt(0), re = ge.match(h), oe = ye.match(h), le = re && ge.match(w), ce = oe && ye.match(w), de = le && ge.match(E), pe = ce && ye.match(E), Ee = de && J.match(k), ke = pe && Z.match(L);
      return Ee || ke ? 5 : de || pe ? 4 : re && !le && ce ? 3 : le || ce ? 2 : re || oe ? 1 : 0;
    }
    for (var S = 1; S < y.length - 1; ) {
      if (y[S - 1][0] == t && y[S + 1][0] == t) {
        var _ = y[S - 1][1], f = y[S][1], A = y[S + 1][1], C = d(_, f);
        if (C) {
          var j = f.substring(f.length - C);
          _ = _.substring(0, _.length - C), f = j + f.substring(0, f.length - C), A = j + A;
        }
        for (var D = _, T = f, N = A, U = M(_, f) + M(f, A); f.charAt(0) === A.charAt(0); ) {
          _ += f.charAt(0), f = f.substring(1) + A.charAt(0), A = A.substring(1);
          var V = M(_, f) + M(f, A);
          V >= U && (U = V, D = _, T = f, N = A);
        }
        y[S - 1][1] != D && (D ? y[S - 1][1] = D : (y.splice(S - 1, 1), S--), y[S][1] = T, N ? y[S + 1][1] = N : (y.splice(S + 1, 1), S--));
      }
      S++;
    }
  }
  function P(y, M) {
    y.push([t, ""]);
    for (var S = 0, _ = 0, f = 0, A = "", C = "", j; S < y.length; ) {
      if (S < y.length - 1 && !y[S][1]) {
        y.splice(S, 1);
        continue;
      }
      switch (y[S][0]) {
        case e:
          f++, C += y[S][1], S++;
          break;
        case n:
          _++, A += y[S][1], S++;
          break;
        case t:
          var D = S - f - _ - 1;
          if (M) {
            if (D >= 0 && ae(y[D][1])) {
              var T = y[D][1].slice(-1);
              if (y[D][1] = y[D][1].slice(
                0,
                -1
              ), A = T + A, C = T + C, !y[D][1]) {
                y.splice(D, 1), S--;
                var N = D - 1;
                y[N] && y[N][0] === e && (f++, C = y[N][1] + C, N--), y[N] && y[N][0] === n && (_++, A = y[N][1] + A, N--), D = N;
              }
            }
            if (K(y[S][1])) {
              var T = y[S][1].charAt(0);
              y[S][1] = y[S][1].slice(1), A += T, C += T;
            }
          }
          if (S < y.length - 1 && !y[S][1]) {
            y.splice(S, 1);
            break;
          }
          if (A.length > 0 || C.length > 0) {
            A.length > 0 && C.length > 0 && (j = l(C, A), j !== 0 && (D >= 0 ? y[D][1] += C.substring(
              0,
              j
            ) : (y.splice(0, 0, [
              t,
              C.substring(0, j)
            ]), S++), C = C.substring(j), A = A.substring(j)), j = d(C, A), j !== 0 && (y[S][1] = C.substring(C.length - j) + y[S][1], C = C.substring(
              0,
              C.length - j
            ), A = A.substring(
              0,
              A.length - j
            )));
            var U = f + _;
            A.length === 0 && C.length === 0 ? (y.splice(S - U, U), S = S - U) : A.length === 0 ? (y.splice(S - U, U, [e, C]), S = S - U + 1) : C.length === 0 ? (y.splice(S - U, U, [n, A]), S = S - U + 1) : (y.splice(
              S - U,
              U,
              [n, A],
              [e, C]
            ), S = S - U + 2);
          }
          S !== 0 && y[S - 1][0] === t ? (y[S - 1][1] += y[S][1], y.splice(S, 1)) : S++, f = 0, _ = 0, A = "", C = "";
          break;
      }
    }
    y[y.length - 1][1] === "" && y.pop();
    var V = !1;
    for (S = 1; S < y.length - 1; )
      y[S - 1][0] === t && y[S + 1][0] === t && (y[S][1].substring(
        y[S][1].length - y[S - 1][1].length
      ) === y[S - 1][1] ? (y[S][1] = y[S - 1][1] + y[S][1].substring(
        0,
        y[S][1].length - y[S - 1][1].length
      ), y[S + 1][1] = y[S - 1][1] + y[S + 1][1], y.splice(S - 1, 1), V = !0) : y[S][1].substring(0, y[S + 1][1].length) == y[S + 1][1] && (y[S - 1][1] += y[S + 1][1], y[S][1] = y[S][1].substring(y[S + 1][1].length) + y[S + 1][1], y.splice(S + 1, 1), V = !0)), S++;
    V && P(y, M);
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
    for (var M = [], S = 0; S < y.length; S++)
      y[S][1].length > 0 && M.push(y[S]);
    return M;
  }
  function be(y, M, S, _) {
    return ae(y) || K(_) ? null : ie([
      [t, y],
      [n, M],
      [e, S],
      [t, _]
    ]);
  }
  function Ae(y, M, S) {
    var _ = typeof S == "number" ? { index: S, length: 0 } : S.oldRange, f = typeof S == "number" ? null : S.newRange, A = y.length, C = M.length;
    if (_.length === 0 && (f === null || f.length === 0)) {
      var j = _.index, D = y.slice(0, j), T = y.slice(j), N = f ? f.index : null;
      e: {
        var U = j + C - A;
        if (N !== null && N !== U || U < 0 || U > C)
          break e;
        var V = M.slice(0, U), J = M.slice(U);
        if (J !== T)
          break e;
        var Z = Math.min(j, U), ge = D.slice(0, Z), ye = V.slice(0, Z);
        if (ge !== ye)
          break e;
        var re = D.slice(Z), oe = V.slice(Z);
        return be(ge, re, oe, T);
      }
      e: {
        if (N !== null && N !== j)
          break e;
        var le = j, V = M.slice(0, le), J = M.slice(le);
        if (V !== D)
          break e;
        var ce = Math.min(A - le, C - le), de = T.slice(T.length - ce), pe = J.slice(J.length - ce);
        if (de !== pe)
          break e;
        var re = T.slice(0, T.length - ce), oe = J.slice(0, J.length - ce);
        return be(D, re, oe, de);
      }
    }
    if (_.length > 0 && f && f.length === 0)
      e: {
        var ge = y.slice(0, _.index), de = y.slice(_.index + _.length), Z = ge.length, ce = de.length;
        if (C < Z + ce)
          break e;
        var ye = M.slice(0, Z), pe = M.slice(C - ce);
        if (ge !== ye || de !== pe)
          break e;
        var re = y.slice(Z, A - ce), oe = M.slice(Z, C - ce);
        return be(ge, re, oe, de);
      }
    return null;
  }
  function we(y, M, S, _) {
    return r(y, M, S, _, !0);
  }
  return we.INSERT = e, we.DELETE = n, we.EQUAL = t, ri = we, ri;
}
var rr = { exports: {} };
rr.exports;
var $a;
function pl() {
  return $a || ($a = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", u = "[object Date]", d = "[object Error]", p = "[object Function]", b = "[object GeneratorFunction]", h = "[object Map]", w = "[object Number]", E = "[object Object]", k = "[object Promise]", L = "[object RegExp]", R = "[object Set]", P = "[object String]", z = "[object Symbol]", Q = "[object WeakMap]", K = "[object ArrayBuffer]", ae = "[object DataView]", ie = "[object Float32Array]", be = "[object Float64Array]", Ae = "[object Int8Array]", we = "[object Int16Array]", y = "[object Int32Array]", M = "[object Uint8Array]", S = "[object Uint8ClampedArray]", _ = "[object Uint16Array]", f = "[object Uint32Array]", A = /[\\^$.*+?()[\]{}|]/g, C = /\w*$/, j = /^\[object .+?Constructor\]$/, D = /^(?:0|[1-9]\d*)$/, T = {};
    T[i] = T[o] = T[K] = T[ae] = T[l] = T[u] = T[ie] = T[be] = T[Ae] = T[we] = T[y] = T[h] = T[w] = T[E] = T[L] = T[R] = T[P] = T[z] = T[M] = T[S] = T[_] = T[f] = !0, T[d] = T[p] = T[Q] = !1;
    var N = typeof zt == "object" && zt && zt.Object === Object && zt, U = typeof self == "object" && self && self.Object === Object && self, V = N || U || Function("return this")(), J = e && !e.nodeType && e, Z = J && !0 && n && !n.nodeType && n, ge = Z && Z.exports === J;
    function ye(a, c) {
      return a.set(c[0], c[1]), a;
    }
    function re(a, c) {
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
    function ke(a) {
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
    function en(a) {
      var c = -1, x = Array(a.size);
      return a.forEach(function(O) {
        x[++c] = O;
      }), x;
    }
    var An = Array.prototype, tn = Function.prototype, At = Object.prototype, nn = V["__core-js_shared__"], En = (function() {
      var a = /[^.]+$/.exec(nn && nn.keys && nn.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), Nn = tn.toString, Qe = At.hasOwnProperty, Et = At.toString, Tn = RegExp(
      "^" + Nn.call(Qe).replace(A, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Nt = ge ? V.Buffer : void 0, Tt = V.Symbol, pt = V.Uint8Array, Ve = Jt(Object.getPrototypeOf, Object), St = Object.create, Ct = At.propertyIsEnumerable, Kn = An.splice, rn = Object.getOwnPropertySymbols, Bt = Nt ? Nt.isBuffer : void 0, sn = Jt(Object.keys, Object), Ft = st(V, "DataView"), m = st(V, "Map"), g = st(V, "Promise"), q = st(V, "Set"), B = st(V, "WeakMap"), ne = st(Object, "create"), fe = ze(Ft), Le = ze(m), an = ze(g), Mt = ze(q), on = ze(B), Be = Tt ? Tt.prototype : void 0, Tr = Be ? Be.valueOf : void 0;
    function kt(a) {
      var c = -1, x = a ? a.length : 0;
      for (this.clear(); ++c < x; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function gs() {
      this.__data__ = ne ? ne(null) : {};
    }
    function bs(a) {
      return this.has(a) && delete this.__data__[a];
    }
    function ys(a) {
      var c = this.__data__;
      if (ne) {
        var x = c[a];
        return x === r ? void 0 : x;
      }
      return Qe.call(c, a) ? c[a] : void 0;
    }
    function Sr(a) {
      var c = this.__data__;
      return ne ? c[a] !== void 0 : Qe.call(c, a);
    }
    function Gn(a, c) {
      var x = this.__data__;
      return x[a] = ne && c === void 0 ? r : c, this;
    }
    kt.prototype.clear = gs, kt.prototype.delete = bs, kt.prototype.get = ys, kt.prototype.has = Sr, kt.prototype.set = Gn;
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
      var c = this.__data__, x = Cn(c, a);
      if (x < 0)
        return !1;
      var O = c.length - 1;
      return x == O ? c.pop() : Kn.call(c, x, 1), !0;
    }
    function ws(a) {
      var c = this.__data__, x = Cn(c, a);
      return x < 0 ? void 0 : c[x][1];
    }
    function As(a) {
      return Cn(this.__data__, a) > -1;
    }
    function Es(a, c) {
      var x = this.__data__, O = Cn(x, a);
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
        hash: new kt(),
        map: new (m || qe)(),
        string: new kt()
      };
    }
    function Ts(a) {
      return un(this, a).delete(a);
    }
    function Ss(a) {
      return un(this, a).get(a);
    }
    function Cs(a) {
      return un(this, a).has(a);
    }
    function ks(a, c) {
      return un(this, a).set(a, c), this;
    }
    Fe.prototype.clear = Ns, Fe.prototype.delete = Ts, Fe.prototype.get = Ss, Fe.prototype.has = Cs, Fe.prototype.set = ks;
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
    function Sn(a, c) {
      var x = Xn(a) || _n(a) ? de(a.length, String) : [], O = x.length, se = !!O;
      for (var Y in a)
        Qe.call(a, Y) && !(se && (Y == "length" || Gs(Y, O))) && x.push(Y);
      return x;
    }
    function Cr(a, c, x) {
      var O = a[c];
      (!(Qe.call(a, c) && Ir(O, x)) || x === void 0 && !(c in a)) && (a[c] = x);
    }
    function Cn(a, c) {
      for (var x = a.length; x--; )
        if (Ir(a[x][0], c))
          return x;
      return -1;
    }
    function mt(a, c) {
      return a && Yn(c, Jn(c), a);
    }
    function Wn(a, c, x, O, se, Y, he) {
      var ue;
      if (O && (ue = Y ? O(a, se, Y, he) : O(a)), ue !== void 0)
        return ue;
      if (!bt(a))
        return a;
      var Ne = Xn(a);
      if (Ne) {
        if (ue = Hs(a), !c)
          return Us(a, ue);
      } else {
        var me = Lt(a), Me = me == p || me == b;
        if (Or(a))
          return kn(a, c);
        if (me == E || me == i || Me && !Y) {
          if (Ee(a))
            return Y ? a : {};
          if (ue = gt(Me ? {} : a), !c)
            return Vs(a, mt(ue, a));
        } else {
          if (!T[me])
            return Y ? a : {};
          ue = Ks(a, me, Wn, c);
        }
      }
      he || (he = new Ge());
      var We = he.get(a);
      if (We)
        return We;
      if (he.set(a, ue), !Ne)
        var Se = x ? zs(a) : Jn(a);
      return oe(Se || a, function(Pe, Ie) {
        Se && (Ie = Pe, Pe = a[Ie]), Cr(ue, Ie, Wn(Pe, c, x, O, Ie, a, he));
      }), ue;
    }
    function Rs(a) {
      return bt(a) ? St(a) : {};
    }
    function $s(a, c, x) {
      var O = c(a);
      return Xn(a) ? O : le(O, x(a));
    }
    function Ds(a) {
      return Et.call(a);
    }
    function Bs(a) {
      if (!bt(a) || Zs(a))
        return !1;
      var c = Qn(a) || Ee(a) ? Tn : j;
      return c.test(ze(a));
    }
    function Fs(a) {
      if (!Lr(a))
        return sn(a);
      var c = [];
      for (var x in Object(a))
        Qe.call(a, x) && x != "constructor" && c.push(x);
      return c;
    }
    function kn(a, c) {
      if (c)
        return a.slice();
      var x = new a.constructor(a.length);
      return a.copy(x), x;
    }
    function Zn(a) {
      var c = new a.constructor(a.byteLength);
      return new pt(c).set(new pt(a)), c;
    }
    function ln(a, c) {
      var x = c ? Zn(a.buffer) : a.buffer;
      return new a.constructor(x, a.byteOffset, a.byteLength);
    }
    function kr(a, c, x) {
      var O = c ? x(ke(a), !0) : ke(a);
      return ce(O, ye, new a.constructor());
    }
    function _r(a) {
      var c = new a.constructor(a.source, C.exec(a));
      return c.lastIndex = a.lastIndex, c;
    }
    function Ms(a, c, x) {
      var O = c ? x(en(a), !0) : en(a);
      return ce(O, re, new a.constructor());
    }
    function Ps(a) {
      return Tr ? Object(Tr.call(a)) : {};
    }
    function js(a, c) {
      var x = c ? Zn(a.buffer) : a.buffer;
      return new a.constructor(x, a.byteOffset, a.length);
    }
    function Us(a, c) {
      var x = -1, O = a.length;
      for (c || (c = Array(O)); ++x < O; )
        c[x] = a[x];
      return c;
    }
    function Yn(a, c, x, O) {
      x || (x = {});
      for (var se = -1, Y = c.length; ++se < Y; ) {
        var he = c[se], ue = void 0;
        Cr(x, he, ue === void 0 ? a[he] : ue);
      }
      return x;
    }
    function Vs(a, c) {
      return Yn(a, _t(a), c);
    }
    function zs(a) {
      return $s(a, Jn, _t);
    }
    function un(a, c) {
      var x = a.__data__;
      return Ws(c) ? x[typeof c == "string" ? "string" : "hash"] : x.map;
    }
    function st(a, c) {
      var x = pe(a, c);
      return Bs(x) ? x : void 0;
    }
    var _t = rn ? Jt(rn, Object) : Xs, Lt = Ds;
    (Ft && Lt(new Ft(new ArrayBuffer(1))) != ae || m && Lt(new m()) != h || g && Lt(g.resolve()) != k || q && Lt(new q()) != R || B && Lt(new B()) != Q) && (Lt = function(a) {
      var c = Et.call(a), x = c == E ? a.constructor : void 0, O = x ? ze(x) : void 0;
      if (O)
        switch (O) {
          case fe:
            return ae;
          case Le:
            return h;
          case an:
            return k;
          case Mt:
            return R;
          case on:
            return Q;
        }
      return c;
    });
    function Hs(a) {
      var c = a.length, x = a.constructor(c);
      return c && typeof a[0] == "string" && Qe.call(a, "index") && (x.index = a.index, x.input = a.input), x;
    }
    function gt(a) {
      return typeof a.constructor == "function" && !Lr(a) ? Rs(Ve(a)) : {};
    }
    function Ks(a, c, x, O) {
      var se = a.constructor;
      switch (c) {
        case K:
          return Zn(a);
        case l:
        case u:
          return new se(+a);
        case ae:
          return ln(a, O);
        case ie:
        case be:
        case Ae:
        case we:
        case y:
        case M:
        case S:
        case _:
        case f:
          return js(a, O);
        case h:
          return kr(a, O, x);
        case w:
        case P:
          return new se(a);
        case L:
          return _r(a);
        case R:
          return Ms(a, O, x);
        case z:
          return Ps(a);
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
      return !!En && En in a;
    }
    function Lr(a) {
      var c = a && a.constructor, x = typeof c == "function" && c.prototype || At;
      return a === x;
    }
    function ze(a) {
      if (a != null) {
        try {
          return Nn.call(a);
        } catch {
        }
        try {
          return a + "";
        } catch {
        }
      }
      return "";
    }
    function qr(a) {
      return Wn(a, !0, !0);
    }
    function Ir(a, c) {
      return a === c || a !== a && c !== c;
    }
    function _n(a) {
      return Ys(a) && Qe.call(a, "callee") && (!Ct.call(a, "callee") || Et.call(a) == i);
    }
    var Xn = Array.isArray;
    function Ln(a) {
      return a != null && Rr(a.length) && !Qn(a);
    }
    function Ys(a) {
      return $r(a) && Ln(a);
    }
    var Or = Bt || Qs;
    function Qn(a) {
      var c = bt(a) ? Et.call(a) : "";
      return c == p || c == b;
    }
    function Rr(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= s;
    }
    function bt(a) {
      var c = typeof a;
      return !!a && (c == "object" || c == "function");
    }
    function $r(a) {
      return !!a && typeof a == "object";
    }
    function Jn(a) {
      return Ln(a) ? Sn(a) : Fs(a);
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
var Da;
function ml() {
  return Da || (Da = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 1, i = 2, o = 9007199254740991, l = "[object Arguments]", u = "[object Array]", d = "[object AsyncFunction]", p = "[object Boolean]", b = "[object Date]", h = "[object Error]", w = "[object Function]", E = "[object GeneratorFunction]", k = "[object Map]", L = "[object Number]", R = "[object Null]", P = "[object Object]", z = "[object Promise]", Q = "[object Proxy]", K = "[object RegExp]", ae = "[object Set]", ie = "[object String]", be = "[object Symbol]", Ae = "[object Undefined]", we = "[object WeakMap]", y = "[object ArrayBuffer]", M = "[object DataView]", S = "[object Float32Array]", _ = "[object Float64Array]", f = "[object Int8Array]", A = "[object Int16Array]", C = "[object Int32Array]", j = "[object Uint8Array]", D = "[object Uint8ClampedArray]", T = "[object Uint16Array]", N = "[object Uint32Array]", U = /[\\^$.*+?()[\]{}|]/g, V = /^\[object .+?Constructor\]$/, J = /^(?:0|[1-9]\d*)$/, Z = {};
    Z[S] = Z[_] = Z[f] = Z[A] = Z[C] = Z[j] = Z[D] = Z[T] = Z[N] = !0, Z[l] = Z[u] = Z[y] = Z[p] = Z[M] = Z[b] = Z[h] = Z[w] = Z[k] = Z[L] = Z[P] = Z[K] = Z[ae] = Z[ie] = Z[we] = !1;
    var ge = typeof zt == "object" && zt && zt.Object === Object && zt, ye = typeof self == "object" && self && self.Object === Object && self, re = ge || ye || Function("return this")(), oe = e && !e.nodeType && e, le = oe && !0 && n && !n.nodeType && n, ce = le && le.exports === oe, de = ce && ge.process, pe = (function() {
      try {
        return de && de.binding && de.binding("util");
      } catch {
      }
    })(), Ee = pe && pe.isTypedArray;
    function ke(a, c) {
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
    function en(a, c) {
      for (var x = -1, O = a == null ? 0 : a.length; ++x < O; )
        if (c(a[x], x, a))
          return !0;
      return !1;
    }
    function An(a, c) {
      for (var x = -1, O = Array(a); ++x < a; )
        O[x] = c(x);
      return O;
    }
    function tn(a) {
      return function(c) {
        return a(c);
      };
    }
    function At(a, c) {
      return a.has(c);
    }
    function nn(a, c) {
      return a?.[c];
    }
    function En(a) {
      var c = -1, x = Array(a.size);
      return a.forEach(function(O, se) {
        x[++c] = [se, O];
      }), x;
    }
    function Nn(a, c) {
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
    var Et = Array.prototype, Tn = Function.prototype, Nt = Object.prototype, Tt = re["__core-js_shared__"], pt = Tn.toString, Ve = Nt.hasOwnProperty, St = (function() {
      var a = /[^.]+$/.exec(Tt && Tt.keys && Tt.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), Ct = Nt.toString, Kn = RegExp(
      "^" + pt.call(Ve).replace(U, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), rn = ce ? re.Buffer : void 0, Bt = re.Symbol, sn = re.Uint8Array, Ft = Nt.propertyIsEnumerable, m = Et.splice, g = Bt ? Bt.toStringTag : void 0, q = Object.getOwnPropertySymbols, B = rn ? rn.isBuffer : void 0, ne = Nn(Object.keys, Object), fe = _t(re, "DataView"), Le = _t(re, "Map"), an = _t(re, "Promise"), Mt = _t(re, "Set"), on = _t(re, "WeakMap"), Be = _t(Object, "create"), Tr = ze(fe), kt = ze(Le), gs = ze(an), bs = ze(Mt), ys = ze(on), Sr = Bt ? Bt.prototype : void 0, Gn = Sr ? Sr.valueOf : void 0;
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
        return x === r ? void 0 : x;
      }
      return Ve.call(c, a) ? c[a] : void 0;
    }
    function As(a) {
      var c = this.__data__;
      return Be ? c[a] !== void 0 : Ve.call(c, a);
    }
    function Es(a, c) {
      var x = this.__data__;
      return this.size += this.has(a) ? 0 : 1, x[a] = Be && c === void 0 ? r : c, this;
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
      var c = this.__data__, x = kn(c, a);
      if (x < 0)
        return !1;
      var O = c.length - 1;
      return x == O ? c.pop() : m.call(c, x, 1), --this.size, !0;
    }
    function Ss(a) {
      var c = this.__data__, x = kn(c, a);
      return x < 0 ? void 0 : c[x][1];
    }
    function Cs(a) {
      return kn(this.__data__, a) > -1;
    }
    function ks(a, c) {
      var x = this.__data__, O = kn(x, a);
      return O < 0 ? (++this.size, x.push([a, c])) : x[O][1] = c, this;
    }
    Fe.prototype.clear = Ns, Fe.prototype.delete = Ts, Fe.prototype.get = Ss, Fe.prototype.has = Cs, Fe.prototype.set = ks;
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
    function Sn(a) {
      var c = -1, x = a == null ? 0 : a.length;
      for (this.__data__ = new Ge(); ++c < x; )
        this.add(a[c]);
    }
    function Cr(a) {
      return this.__data__.set(a, r), this;
    }
    function Cn(a) {
      return this.__data__.has(a);
    }
    Sn.prototype.add = Sn.prototype.push = Cr, Sn.prototype.has = Cn;
    function mt(a) {
      var c = this.__data__ = new Fe(a);
      this.size = c.size;
    }
    function Wn() {
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
    mt.prototype.clear = Wn, mt.prototype.delete = Rs, mt.prototype.get = $s, mt.prototype.has = Ds, mt.prototype.set = Bs;
    function Fs(a, c) {
      var x = _n(a), O = !x && Ir(a), se = !x && !O && Ln(a), Y = !x && !O && !se && $r(a), he = x || O || se || Y, ue = he ? An(a.length, String) : [], Ne = ue.length;
      for (var me in a)
        Ve.call(a, me) && !(he && // Safari 9 has enumerable `arguments.length` in strict mode.
        (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        se && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Y && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
        Ks(me, Ne))) && ue.push(me);
      return ue;
    }
    function kn(a, c) {
      for (var x = a.length; x--; )
        if (qr(a[x][0], c))
          return x;
      return -1;
    }
    function Zn(a, c, x) {
      var O = c(a);
      return _n(a) ? O : Jt(O, x(a));
    }
    function ln(a) {
      return a == null ? a === void 0 ? Ae : R : g && g in Object(a) ? Lt(a) : Lr(a);
    }
    function kr(a) {
      return bt(a) && ln(a) == l;
    }
    function _r(a, c, x, O, se) {
      return a === c ? !0 : a == null || c == null || !bt(a) && !bt(c) ? a !== a && c !== c : Ms(a, c, x, O, _r, se);
    }
    function Ms(a, c, x, O, se, Y) {
      var he = _n(a), ue = _n(c), Ne = he ? u : gt(a), me = ue ? u : gt(c);
      Ne = Ne == l ? P : Ne, me = me == l ? P : me;
      var Me = Ne == P, We = me == P, Se = Ne == me;
      if (Se && Ln(a)) {
        if (!Ln(c))
          return !1;
        he = !0, Me = !1;
      }
      if (Se && !Me)
        return Y || (Y = new mt()), he || $r(a) ? Yn(a, c, x, O, se, Y) : Vs(a, c, Ne, x, O, se, Y);
      if (!(x & s)) {
        var Pe = Me && Ve.call(a, "__wrapped__"), Ie = We && Ve.call(c, "__wrapped__");
        if (Pe || Ie) {
          var Pt = Pe ? a.value() : a, qt = Ie ? c.value() : c;
          return Y || (Y = new mt()), se(Pt, qt, x, O, Y);
        }
      }
      return Se ? (Y || (Y = new mt()), zs(a, c, x, O, se, Y)) : !1;
    }
    function Ps(a) {
      if (!Rr(a) || Ws(a))
        return !1;
      var c = Or(a) ? Kn : V;
      return c.test(ze(a));
    }
    function js(a) {
      return bt(a) && Qn(a.length) && !!Z[ln(a)];
    }
    function Us(a) {
      if (!Zs(a))
        return ne(a);
      var c = [];
      for (var x in Object(a))
        Ve.call(a, x) && x != "constructor" && c.push(x);
      return c;
    }
    function Yn(a, c, x, O, se, Y) {
      var he = x & s, ue = a.length, Ne = c.length;
      if (ue != Ne && !(he && Ne > ue))
        return !1;
      var me = Y.get(a);
      if (me && Y.get(c))
        return me == c;
      var Me = -1, We = !0, Se = x & i ? new Sn() : void 0;
      for (Y.set(a, c), Y.set(c, a); ++Me < ue; ) {
        var Pe = a[Me], Ie = c[Me];
        if (O)
          var Pt = he ? O(Ie, Pe, Me, c, a, Y) : O(Pe, Ie, Me, a, c, Y);
        if (Pt !== void 0) {
          if (Pt)
            continue;
          We = !1;
          break;
        }
        if (Se) {
          if (!en(c, function(qt, cn) {
            if (!At(Se, cn) && (Pe === qt || se(Pe, qt, x, O, Y)))
              return Se.push(cn);
          })) {
            We = !1;
            break;
          }
        } else if (!(Pe === Ie || se(Pe, Ie, x, O, Y))) {
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
          return !(a.byteLength != c.byteLength || !Y(new sn(a), new sn(c)));
        case p:
        case b:
        case L:
          return qr(+a, +c);
        case h:
          return a.name == c.name && a.message == c.message;
        case K:
        case ie:
          return a == c + "";
        case k:
          var ue = En;
        case ae:
          var Ne = O & s;
          if (ue || (ue = Qe), a.size != c.size && !Ne)
            return !1;
          var me = he.get(a);
          if (me)
            return me == c;
          O |= i, he.set(a, c);
          var Me = Yn(ue(a), ue(c), O, se, Y, he);
          return he.delete(a), Me;
        case be:
          if (Gn)
            return Gn.call(a) == Gn.call(c);
      }
      return !1;
    }
    function zs(a, c, x, O, se, Y) {
      var he = x & s, ue = un(a), Ne = ue.length, me = un(c), Me = me.length;
      if (Ne != Me && !he)
        return !1;
      for (var We = Ne; We--; ) {
        var Se = ue[We];
        if (!(he ? Se in c : Ve.call(c, Se)))
          return !1;
      }
      var Pe = Y.get(a);
      if (Pe && Y.get(c))
        return Pe == c;
      var Ie = !0;
      Y.set(a, c), Y.set(c, a);
      for (var Pt = he; ++We < Ne; ) {
        Se = ue[We];
        var qt = a[Se], cn = c[Se];
        if (O)
          var sa = he ? O(cn, qt, Se, c, a, Y) : O(qt, cn, Se, a, c, Y);
        if (!(sa === void 0 ? qt === cn || se(qt, cn, x, O, Y) : sa)) {
          Ie = !1;
          break;
        }
        Pt || (Pt = Se == "constructor");
      }
      if (Ie && !Pt) {
        var Dr = a.constructor, Br = c.constructor;
        Dr != Br && "constructor" in a && "constructor" in c && !(typeof Dr == "function" && Dr instanceof Dr && typeof Br == "function" && Br instanceof Br) && (Ie = !1);
      }
      return Y.delete(a), Y.delete(c), Ie;
    }
    function un(a) {
      return Zn(a, Jn, Hs);
    }
    function st(a, c) {
      var x = a.__data__;
      return Gs(c) ? x[typeof c == "string" ? "string" : "hash"] : x.map;
    }
    function _t(a, c) {
      var x = nn(a, c);
      return Ps(x) ? x : void 0;
    }
    function Lt(a) {
      var c = Ve.call(a, g), x = a[g];
      try {
        a[g] = void 0;
        var O = !0;
      } catch {
      }
      var se = Ct.call(a);
      return O && (c ? a[g] = x : delete a[g]), se;
    }
    var Hs = q ? function(a) {
      return a == null ? [] : (a = Object(a), ke(q(a), function(c) {
        return Ft.call(a, c);
      }));
    } : Xs, gt = ln;
    (fe && gt(new fe(new ArrayBuffer(1))) != M || Le && gt(new Le()) != k || an && gt(an.resolve()) != z || Mt && gt(new Mt()) != ae || on && gt(new on()) != we) && (gt = function(a) {
      var c = ln(a), x = c == P ? a.constructor : void 0, O = x ? ze(x) : "";
      if (O)
        switch (O) {
          case Tr:
            return M;
          case kt:
            return k;
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
      return !!St && St in a;
    }
    function Zs(a) {
      var c = a && a.constructor, x = typeof c == "function" && c.prototype || Nt;
      return a === x;
    }
    function Lr(a) {
      return Ct.call(a);
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
    function qr(a, c) {
      return a === c || a !== a && c !== c;
    }
    var Ir = kr(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? kr : function(a) {
      return bt(a) && Ve.call(a, "callee") && !Ft.call(a, "callee");
    }, _n = Array.isArray;
    function Xn(a) {
      return a != null && Qn(a.length) && !Or(a);
    }
    var Ln = B || Qs;
    function Ys(a, c) {
      return _r(a, c);
    }
    function Or(a) {
      if (!Rr(a))
        return !1;
      var c = ln(a);
      return c == w || c == E || c == d || c == Q;
    }
    function Qn(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= o;
    }
    function Rr(a) {
      var c = typeof a;
      return a != null && (c == "object" || c == "function");
    }
    function bt(a) {
      return a != null && typeof a == "object";
    }
    var $r = Ee ? tn(Ee) : js;
    function Jn(a) {
      return Xn(a) ? Fs(a) : Us(a);
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
var Pr = {}, Ba;
function _m() {
  if (Ba) return Pr;
  Ba = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  const n = pl(), e = ml();
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
    function o(u = {}, d = {}) {
      u = u || {};
      const p = Object.keys(d).reduce((b, h) => (d[h] !== u[h] && u[h] !== void 0 && (b[h] = d[h]), b), {});
      return Object.keys(u).reduce((b, h) => (u[h] !== d[h] && d[h] === void 0 && (b[h] = null), b), p);
    }
    r.invert = o;
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
var jr = {}, Fa;
function gl() {
  if (Fa) return jr;
  Fa = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  var n;
  return (function(e) {
    function t(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    e.length = t;
  })(n || (n = {})), jr.default = n, jr;
}
var Ur = {}, Ma;
function Lm() {
  if (Ma) return Ur;
  Ma = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  const n = gl();
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
        const i = this.offset, o = n.default.length(s);
        if (r >= o - i ? (r = o - i, this.index += 1, this.offset = 0) : this.offset += r, typeof s.delete == "number")
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
          const r = this.offset, s = this.index, i = this.next(), o = this.ops.slice(this.index);
          return this.offset = r, this.index = s, [i].concat(o);
        }
      } else return [];
    }
  }
  return Ur.default = e, Ur;
}
var Pa;
function qm() {
  return Pa || (Pa = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = km(), r = pl(), s = ml(), i = _m();
    e.AttributeMap = i.default;
    const o = gl();
    e.Op = o.default;
    const l = Lm();
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
        return this.reduce((h, w) => w.insert ? h + o.default.length(w) : w.delete ? h - w.delete : h, 0);
      }
      length() {
        return this.reduce((h, w) => h + o.default.length(w), 0);
      }
      slice(h = 0, w = 1 / 0) {
        const E = [], k = new l.default(this.ops);
        let L = 0;
        for (; L < w && k.hasNext(); ) {
          let R;
          L < h ? R = k.next(h - L) : (R = k.next(w - L), E.push(R)), L += o.default.length(R);
        }
        return new p(E);
      }
      compose(h) {
        const w = new l.default(this.ops), E = new l.default(h.ops), k = [], L = E.peek();
        if (L != null && typeof L.retain == "number" && L.attributes == null) {
          let P = L.retain;
          for (; w.peekType() === "insert" && w.peekLength() <= P; )
            P -= w.peekLength(), k.push(w.next());
          L.retain - P > 0 && E.next(L.retain - P);
        }
        const R = new p(k);
        for (; w.hasNext() || E.hasNext(); )
          if (E.peekType() === "insert")
            R.push(E.next());
          else if (w.peekType() === "delete")
            R.push(w.next());
          else {
            const P = Math.min(w.peekLength(), E.peekLength()), z = w.next(P), Q = E.next(P);
            if (Q.retain) {
              const K = {};
              if (typeof z.retain == "number")
                K.retain = typeof Q.retain == "number" ? P : Q.retain;
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
        }).join("")), k = new p(), L = t(E[0], E[1], w, !0), R = new l.default(this.ops), P = new l.default(h.ops);
        return L.forEach((z) => {
          let Q = z[1].length;
          for (; Q > 0; ) {
            let K = 0;
            switch (z[0]) {
              case t.INSERT:
                K = Math.min(P.peekLength(), Q), k.push(P.next(K));
                break;
              case t.DELETE:
                K = Math.min(Q, R.peekLength()), R.next(K), k.delete(K);
                break;
              case t.EQUAL:
                K = Math.min(R.peekLength(), P.peekLength(), Q);
                const ae = R.next(K), ie = P.next(K);
                s(ae.insert, ie.insert) ? k.retain(K, i.default.diff(ae.attributes, ie.attributes)) : k.push(ie).delete(K);
                break;
            }
            Q -= K;
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
          const R = E.peek(), P = o.default.length(R) - E.peekLength(), z = typeof R.insert == "string" ? R.insert.indexOf(w, P) - P : -1;
          if (z < 0)
            k.push(E.next());
          else if (z > 0)
            k.push(E.next(z));
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
            w.delete(o.default.length(k));
          else {
            if (typeof k.retain == "number" && k.attributes == null)
              return w.retain(k.retain), E + k.retain;
            if (k.delete || typeof k.retain == "number") {
              const L = k.delete || k.retain;
              return h.slice(E, E + L).forEach((P) => {
                k.delete ? w.push(P) : k.retain && k.attributes && w.retain(o.default.length(P), i.default.invert(k.attributes, P.attributes));
              }), E + L;
            } else if (typeof k.retain == "object" && k.retain !== null) {
              const L = h.slice(E, E + 1), R = new l.default(L.ops).next(), [P, z, Q] = d(k.retain, R.insert), K = p.getHandler(P);
              return w.retain({ [P]: K.invert(z, Q) }, i.default.invert(k.attributes, R.attributes)), E + 1;
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
            R.retain(o.default.length(k.next()));
          else if (L.peekType() === "insert")
            R.push(L.next());
          else {
            const P = Math.min(k.peekLength(), L.peekLength()), z = k.next(P), Q = L.next(P);
            if (z.delete)
              continue;
            if (Q.delete)
              R.push(Q);
            else {
              const K = z.retain, ae = Q.retain;
              let ie = typeof ae == "object" && ae !== null ? ae : P;
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
    p.Op = o.default, p.OpIterator = l.default, p.AttributeMap = i.default, p.handlers = {}, e.default = p, n.exports = p, n.exports.default = p;
  })(Mr, Mr.exports)), Mr.exports;
}
var rt = qm();
const G = /* @__PURE__ */ fl(rt);
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
let dt = class extends ns {
};
const Im = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function fs(n) {
  return n.replace(/[&<>"']/g, (e) => Im[e]);
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
    const r = He.order.indexOf(e), s = He.order.indexOf(t);
    return r >= 0 || s >= 0 ? r - s : e === t ? 0 : e < t ? -1 : 1;
  }
  formatAt(e, t, r, s) {
    if (He.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, W.BLOT)) {
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
const ja = 1;
class De extends mr {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = bl(this)), this.cache.delta;
  }
  deleteAt(e, t) {
    super.deleteAt(e, t), this.cache = {};
  }
  formatAt(e, t, r, s) {
    t <= 0 || (this.scroll.query(r, W.BLOCK) ? e + t === this.length() && this.format(r, s) : super.formatAt(e, Math.min(t, this.length() - e - 1), r, s), this.cache = {});
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
    let o = this;
    s.reduce((l, u) => (o = o.split(l, !0), o.insertAt(0, u), u.length), e + i.length);
  }
  insertBefore(e, t) {
    const {
      head: r
    } = this.children;
    super.insertBefore(e, t), r instanceof ft && r.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + ja), this.cache.length;
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
    if (t && (e === 0 || e >= this.length() - ja)) {
      const s = this.clone();
      return e === 0 ? (this.parent.insertBefore(s, this), this) : (this.parent.insertBefore(s, this.next), s);
    }
    const r = super.split(e, t);
    return this.cache = {}, r;
  }
}
De.blotName = "block";
De.tagName = "P";
De.defaultChild = ft;
De.allowedChildren = [ft, He, Xe, dt];
class nt extends Xe {
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
    const r = this.scroll.query(e, W.BLOCK_ATTRIBUTE);
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
`), i = s.pop(), o = s.map((u) => {
      const d = this.scroll.create(De.blotName);
      return d.insertAt(0, u), d;
    }), l = this.split(e);
    o.forEach((u) => {
      this.parent.insertBefore(u, l);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), l);
  }
}
nt.scope = W.BLOCK_BLOT;
function bl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n.descendants(Ue).reduce((t, r) => r.length() === 0 ? t : t.insert(r.value(), et(r, {}, e)), new G()).insert(`
`, et(n));
}
function et(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return n == null || ("formats" in n && typeof n.formats == "function" && (e = {
    ...e,
    ...n.formats()
  }, t && delete e["code-token"]), n.parent == null || n.parent.statics.blotName === "scroll" || n.parent.statics.scope !== n.statics.scope) ? e : et(n.parent, e, t);
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
    for (; r != null && r.statics.scope !== W.BLOCK_BLOT; )
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
    const t = this.prev instanceof dt ? this.prev : null, r = t ? t.length() : 0, s = this.next instanceof dt ? this.next : null, i = s ? s.text : "", {
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
      const d = (h, w) => t && h === t.domNode ? w : h === o ? r + w - 1 : s && h === s.domNode ? r + l.length + w : null, p = d(e.start.node, e.start.offset), b = d(e.end.node, e.end.offset);
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
var si = { exports: {} }, Ua;
function Om() {
  return Ua || (Ua = 1, (function(n) {
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
    function o(u, d) {
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
      var L = this._events[k], R = arguments.length, P, z;
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
        for (z = 1, P = new Array(R - 1); z < R; z++)
          P[z - 1] = arguments[z];
        L.fn.apply(L.context, P);
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
              if (!P) for (K = 1, P = new Array(R - 1); K < R; K++)
                P[K - 1] = arguments[K];
              L[z].fn.apply(L[z].context, P);
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
        for (var k = 0, L = [], R = E.length; k < R; k++)
          (E[k].fn !== p || h && !E[k].once || b && E[k].context !== b) && L.push(E[k]);
        L.length ? this._events[w] = L.length === 1 ? L[0] : L : o(this, w);
      }
      return this;
    }, l.prototype.removeAllListeners = function(d) {
      var p;
      return d ? (p = t ? t + d : d, this._events[p] && o(this, p)) : (this._events = new r(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = t, l.EventEmitter = l, n.exports = l;
  })(si)), si.exports;
}
var Rm = Om();
const $m = /* @__PURE__ */ fl(Rm), ki = /* @__PURE__ */ new WeakMap(), _i = ["error", "warn", "log", "info"];
let Li = "warn";
function yl(n) {
  if (Li && _i.indexOf(n) <= _i.indexOf(Li)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
      t[r - 1] = arguments[r];
    console[n](...t);
  }
}
function Dt(n) {
  return _i.reduce((e, t) => (e[t] = yl.bind(console, t, n), e), {});
}
Dt.level = (n) => {
  Li = n;
};
yl.level = Dt.level;
const ii = Dt("quill:events"), Dm = ["selectionchange", "mousedown", "mouseup", "click"];
Dm.forEach((n) => {
  document.addEventListener(n, function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    Array.from(document.querySelectorAll(".ql-container")).forEach((s) => {
      const i = ki.get(s);
      i && i.emitter && i.emitter.handleDOM(...t);
    });
  });
});
class H extends $m {
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
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return ii.log.call(ii, ...t), super.emit(...t);
  }
  handleDOM(e) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      r[s - 1] = arguments[s];
    (this.domListeners[e.type] || []).forEach((i) => {
      let {
        node: o,
        handler: l
      } = i;
      (e.target === o || o.contains(e.target)) && l(e, ...r);
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
class Bm {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new pn(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, H.sources.USER), 1);
    }), this.emitter.on(H.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const r = this.getNativeRange();
      r != null && r.start.node !== this.cursor.textNode && this.emitter.once(H.events.SCROLL_UPDATE, (s, i) => {
        try {
          this.root.contains(r.start.node) && this.root.contains(r.end.node) && this.setNativeRange(r.start.node, r.start.offset, r.end.node, r.end.offset);
          const o = i.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(o ? H.sources.SILENT : s);
        } catch {
        }
      });
    }), this.emitter.on(H.events.SCROLL_OPTIMIZE, (r, s) => {
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
    const r = this.getNativeRange();
    if (!(r == null || !r.native.collapsed || this.scroll.query(e, W.BLOCK))) {
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
    return document.activeElement === this.root || document.activeElement != null && oi(this.root, document.activeElement);
  }
  normalizedToRange(e) {
    const t = [[e.start.node, e.start.offset]];
    e.native.collapsed || t.push([e.end.node, e.end.offset]);
    const r = t.map((o) => {
      const [l, u] = o, d = this.scroll.find(l, !0), p = d.offset(this.scroll);
      return u === 0 ? p : d instanceof Ue ? p + d.index(l, u) : p + d.length();
    }), s = Math.min(Math.max(...r), this.scroll.length() - 1), i = Math.min(s, ...r);
    return new pn(i, s - i);
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
      const [o, l] = this.scroll.leaf(s);
      return o ? o.position(l, i) : [null, -1];
    };
    return [...r(e.index, !1), ...r(e.index + e.length, !0)];
  }
  setNativeRange(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : t, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (ai.info("setNativeRange", e, t, r, s), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
    r.parentNode == null))
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
        if (l == null || i || e !== l.startContainer || t !== l.startOffset || r !== l.endContainer || s !== l.endOffset) {
          e instanceof Element && e.tagName === "BR" && (t = Array.from(e.parentNode.childNodes).indexOf(e), e = e.parentNode), r instanceof Element && r.tagName === "BR" && (s = Array.from(r.parentNode.childNodes).indexOf(r), r = r.parentNode);
          const u = document.createRange();
          u.setStart(e, t), u.setEnd(r, s), o.removeAllRanges(), o.addRange(u);
        }
      } else
        o.removeAllRanges(), this.root.blur();
  }
  setRange(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H.sources.API;
    if (typeof t == "string" && (r = t, t = !1), ai.info("setRange", e), e != null) {
      const s = this.rangeToNative(e);
      this.setNativeRange(...s, t);
    } else
      this.setNativeRange(null);
    this.update(r);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : H.sources.USER;
    const t = this.lastRange, [r, s] = this.getRange();
    if (this.lastRange = r, this.lastNative = s, this.lastRange != null && (this.savedRange = this.lastRange), !zi(t, this.lastRange)) {
      if (!this.composing && s != null && s.native.collapsed && s.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const i = [H.events.SELECTION_CHANGE, Bn(this.lastRange), Bn(t), e];
      this.emitter.emit(H.events.EDITOR_CHANGE, ...i), e !== H.sources.SILENT && this.emitter.emit(...i);
    }
  }
}
function oi(n, e) {
  try {
    e.parentNode;
  } catch {
    return !1;
  }
  return n.contains(e);
}
const Fm = /^[ -~]*$/;
class Mm {
  constructor(e) {
    this.scroll = e, this.delta = this.getDelta();
  }
  applyDelta(e) {
    this.scroll.update();
    let t = this.scroll.length();
    this.scroll.batchStart();
    const r = Va(e), s = new G();
    return jm(r.ops.slice()).reduce((o, l) => {
      const u = rt.Op.length(l);
      let d = l.attributes || {}, p = !1, b = !1;
      if (l.insert != null) {
        if (s.retain(u), typeof l.insert == "string") {
          const E = l.insert;
          b = !E.endsWith(`
`) && (t <= o || !!this.scroll.descendant(nt, o)[0]), this.scroll.insertAt(o, E);
          const [k, L] = this.scroll.line(o);
          let R = Kt({}, et(k));
          if (k instanceof De) {
            const [P] = k.descendant(Ue, L);
            P && (R = Kt(R, et(P)));
          }
          d = rt.AttributeMap.diff(R, d) || {};
        } else if (typeof l.insert == "object") {
          const E = Object.keys(l.insert)[0];
          if (E == null) return o;
          const k = this.scroll.query(E, W.INLINE) != null;
          if (k)
            (t <= o || this.scroll.descendant(nt, o)[0]) && (b = !0);
          else if (o > 0) {
            const [L, R] = this.scroll.descendant(Ue, o - 1);
            L instanceof dt ? L.value()[R] !== `
` && (p = !0) : L instanceof Xe && L.statics.scope === W.INLINE_BLOT && (p = !0);
          }
          if (this.scroll.insertAt(o, E, l.insert[E]), k) {
            const [L] = this.scroll.descendant(Ue, o);
            if (L) {
              const R = Kt({}, et(L));
              d = rt.AttributeMap.diff(R, d) || {};
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
    }, 0), s.reduce((o, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(o, l.delete), o) : o + rt.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new G().retain(e).delete(t));
  }
  formatLine(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(r).forEach((i) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((o) => {
        o.format(i, r[i]);
      });
    }), this.scroll.optimize();
    const s = new G().retain(e).retain(t, Bn(r));
    return this.update(s);
  }
  formatText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((i) => {
      this.scroll.formatAt(e, t, i, r[i]);
    });
    const s = new G().retain(e).retain(t, Bn(r));
    return this.update(s);
  }
  getContents(e, t) {
    return this.delta.slice(e, e + t);
  }
  getDelta() {
    return this.scroll.lines().reduce((e, t) => e.concat(t.delta()), new G());
  }
  getFormat(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = [], s = [];
    t === 0 ? this.scroll.path(e).forEach((l) => {
      const [u] = l;
      u instanceof De ? r.push(u) : u instanceof Ue && s.push(u);
    }) : (r = this.scroll.lines(e, t), s = this.scroll.descendants(Ue, e, t));
    const [i, o] = [r, s].map((l) => {
      const u = l.shift();
      if (u == null) return {};
      let d = et(u);
      for (; Object.keys(d).length > 0; ) {
        const p = l.shift();
        if (p == null) return d;
        d = Pm(et(p), d);
      }
      return d;
    });
    return {
      ...i,
      ...o
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
    const r = Va(t), s = new G().retain(e).concat(r);
    return this.scroll.insertContents(e, r), this.update(s);
  }
  insertEmbed(e, t, r) {
    return this.scroll.insertAt(e, t, r), this.update(new G().retain(e).insert({
      [t]: r
    }));
  }
  insertText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return t = t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(e, t), Object.keys(r).forEach((s) => {
      this.scroll.formatAt(e, t.length, s, r[s]);
    }), this.update(new G().retain(e).insert(t, Bn(r)));
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
    const r = this.getText(e, t), [s, i] = this.scroll.line(e + t);
    let o = 0, l = new G();
    s != null && (o = s.length() - i, l = s.delta().slice(i, i + o - 1).insert(`
`));
    const d = this.getContents(e, t + o).diff(new G().insert(r).concat(l)), p = new G().retain(e).concat(d);
    return this.applyDelta(p);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const s = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(Fm) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), o = et(i), l = i.offset(this.scroll), u = t[0].oldValue.replace(ot.CONTENTS, ""), d = new G().insert(u), p = new G().insert(i.value()), b = r && {
        oldRange: za(r.oldRange, -l),
        newRange: za(r.newRange, -l)
      };
      e = new G().retain(l).concat(d.diff(p, b)).reduce((w, E) => E.insert ? w.insert(E.insert, o) : w.push(E), new G()), this.delta = s.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !zi(s.compose(e), this.delta)) && (e = s.diff(this.delta, r));
    return e;
  }
}
function $n(n, e, t) {
  if (n.length === 0) {
    const [w] = li(t.pop());
    return e <= 0 ? `</li></${w}>` : `</li></${w}>${$n([], e - 1, t)}`;
  }
  const [{
    child: r,
    offset: s,
    length: i,
    indent: o,
    type: l
  }, ...u] = n, [d, p] = li(l);
  if (o > e)
    return t.push(l), o === e + 1 ? `<${d}><li${p}>${gr(r, s, i)}${$n(u, o, t)}` : `<${d}><li>${$n(n, e + 1, t)}`;
  const b = t[t.length - 1];
  if (o === e && l === b)
    return `</li><li${p}>${gr(r, s, i)}${$n(u, o, t)}`;
  const [h] = li(t.pop());
  return `</li></${h}>${$n(n, e - 1, t)}`;
}
function gr(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in n && typeof n.html == "function")
    return n.html(e, t);
  if (n instanceof dt)
    return fs(n.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (n instanceof ct) {
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
      innerHTML: o
    } = n.domNode, [l, u] = i.split(`>${o}<`);
    return l === "<table" ? `<table style="border: 1px solid #000;">${s.join("")}<${u}` : `${l}>${s.join("")}<${u}`;
  }
  return n.domNode instanceof Element ? n.domNode.outerHTML : "";
}
function Pm(n, e) {
  return Object.keys(e).reduce((t, r) => {
    if (n[r] == null) return t;
    const s = e[r];
    return s === n[r] ? t[r] = s : Array.isArray(s) ? s.indexOf(n[r]) < 0 ? t[r] = s.concat([n[r]]) : t[r] = s : t[r] = [s, n[r]], t;
  }, {});
}
function li(n) {
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
function Va(n) {
  return n.reduce((e, t) => {
    if (typeof t.insert == "string") {
      const r = t.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return e.insert(r, t.attributes);
    }
    return e.push(t);
  }, new G());
}
function za(n, e) {
  let {
    index: t,
    length: r
  } = n;
  return new pn(t + e, r);
}
function jm(n) {
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
class Gi extends Xe {
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
      if (this.prev instanceof dt) {
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
    else e === this.rightGuard && (this.next instanceof dt ? (this.next.insertAt(0, s), t = {
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
class Um {
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
const Vm = (n) => n.parentElement || n.getRootNode().host || null, zm = (n) => {
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
}, Ha = (n, e, t, r, s, i) => n < t && e > r ? 0 : n < t ? -(t - n + s) : e > r ? e - n > r - t ? n + s - t : e - r + i : 0, Hm = (n, e) => {
  const t = n.ownerDocument;
  let r = e, s = n;
  for (; s; ) {
    const i = s === t.body, o = i ? {
      top: 0,
      right: window.visualViewport?.width ?? t.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? t.documentElement.clientHeight,
      left: 0
    } : zm(s), l = getComputedStyle(s), u = Ha(r.left, r.right, o.left, o.right, zr(l.scrollPaddingLeft), zr(l.scrollPaddingRight)), d = Ha(r.top, r.bottom, o.top, o.bottom, zr(l.scrollPaddingTop), zr(l.scrollPaddingBottom));
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
    s = i || l.position === "fixed" ? null : Vm(s);
  }
}, Km = 100, Gm = ["block", "break", "cursor", "inline", "scroll", "text"], Wm = (n, e, t) => {
  const r = new Vn();
  return Gm.forEach((s) => {
    const i = e.query(s);
    i && r.register(i);
  }), n.forEach((s) => {
    let i = e.query(s);
    i || t.error(`Cannot register "${s}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; i; )
      if (r.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, o += 1, o > Km) {
        t.error(`Cycle detected in registering blot requiredContainer: "${s}"`);
        break;
      }
  }), r;
}, Mn = Dt("quill"), Hr = new Vn();
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
    registry: Hr,
    theme: "default"
  };
  static events = H.events;
  static sources = H.sources;
  static version = "2.0.3";
  static imports = {
    delta: G,
    parchment: Cm,
    "core/module": wt,
    "core/theme": Hn
  };
  static debug(e) {
    e === !0 && (e = "log"), Dt.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return ki.get(e) || Hr.find(e, t);
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
    if (this.options = Zm(e, t), this.container = this.options.container, this.container == null) {
      Mn.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && $.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", ki.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new H();
    const s = Ki.blotName, i = this.options.registry.query(s);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${s}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Mm(this.scroll), this.selection = new Bm(this.scroll, this.emitter), this.composition = new Um(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(H.events.EDITOR_CHANGE, (o) => {
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
    }), r) {
      const o = this.clipboard.convert({
        html: `${r}<p><br></p>`,
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
      const r = e;
      e = document.createElement("div"), e.classList.add(r);
    }
    return this.container.insertBefore(e, t), e;
  }
  blur() {
    this.selection.setRange(null);
  }
  deleteText(e, t, r) {
    return [e, t, , r] = It(e, t, r), it.call(this, () => this.editor.deleteText(e, t), r, e, -1 * t);
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
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H.sources.API;
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
    }, r);
  }
  formatLine(e, t, r, s, i) {
    let o;
    return [e, t, o, i] = It(
      e,
      t,
      // @ts-expect-error
      r,
      s,
      i
    ), it.call(this, () => this.editor.formatLine(e, t, o), i, e, 0);
  }
  formatText(e, t, r, s, i) {
    let o;
    return [e, t, o, i] = It(
      // @ts-expect-error
      e,
      t,
      r,
      s,
      i
    ), it.call(this, () => this.editor.formatText(e, t, o), i, e, 0);
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
    return it.call(this, () => this.editor.insertEmbed(e, t, r), s, e);
  }
  insertText(e, t, r, s, i) {
    let o;
    return [e, , o, i] = It(e, 0, r, s, i), it.call(this, () => this.editor.insertText(e, t, o), i, e, t.length);
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
    return [e, t, , r] = It(e, t, r), it.call(this, () => this.editor.removeFormat(e, t), r, e);
  }
  scrollRectIntoView(e) {
    Hm(this.root, e);
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
      const r = this.getLength(), s = this.editor.deleteText(0, r), i = this.editor.insertContents(0, e), o = this.editor.deleteText(this.getLength() - 1, 1);
      return s.compose(i).compose(o);
    }, t);
  }
  setSelection(e, t, r) {
    e == null ? this.selection.setRange(null, t || $.sources.API) : ([e, t, , r] = It(e, t, r), this.selection.setRange(new pn(Math.max(0, e), t), r), r !== H.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : H.sources.API;
    const r = new G().insert(e);
    return this.setContents(r, t);
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
function Ka(n) {
  return typeof n == "string" ? document.querySelector(n) : n;
}
function ui(n) {
  return Object.entries(n ?? {}).reduce((e, t) => {
    let [r, s] = t;
    return {
      ...e,
      [r]: s === !0 ? {} : s
    };
  }, {});
}
function Ga(n) {
  return Object.fromEntries(Object.entries(n).filter((e) => e[1] !== void 0));
}
function Zm(n, e) {
  const t = Ka(n);
  if (!t)
    throw new Error("Invalid Quill container");
  const s = !e.theme || e.theme === $.DEFAULTS.theme ? Hn : $.import(`themes/${e.theme}`);
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
    ...Ga(u),
    ...Ga(e)
  };
  let h = e.registry;
  return h ? e.formats && Mn.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? Wm(e.formats, b.registry, Mn) : b.registry, {
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
    bounds: Ka(b.bounds)
  };
}
function it(n, e, t, r) {
  if (!this.isEnabled() && e === H.sources.USER && !this.allowReadOnlyEdits)
    return new G();
  let s = t == null ? null : this.getSelection();
  const i = this.editor.delta, o = n();
  if (s != null && (t === !0 && (t = s.index), r == null ? s = Wa(s, o, e) : r !== 0 && (s = Wa(s, t, r, e)), this.setSelection(s, H.sources.SILENT)), o.length() > 0) {
    const l = [H.events.TEXT_CHANGE, o, i, e];
    this.emitter.emit(H.events.EDITOR_CHANGE, ...l), e !== H.sources.SILENT && this.emitter.emit(...l);
  }
  return o;
}
function It(n, e, t, r, s) {
  let i = {};
  return typeof n.index == "number" && typeof n.length == "number" ? typeof e != "number" ? (s = r, r = t, t = e, e = n.length, n = n.index) : (e = n.length, n = n.index) : typeof e != "number" && (s = r, r = t, t = e, e = 0), typeof t == "object" ? (i = t, s = r) : typeof t == "string" && (r != null ? i[t] = r : s = t), s = s || H.sources.API, [n, e, i, s];
}
function Wa(n, e, t, r) {
  const s = typeof t == "number" ? t : 0;
  if (n == null) return null;
  let i, o;
  return e && typeof e.transformPosition == "function" ? [i, o] = [n.index, n.index + n.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(l, r !== H.sources.USER)
  )) : [i, o] = [n.index, n.index + n.length].map((l) => l < e || l === e && r === H.sources.USER ? l : s >= 0 ? l + s : Math.max(e, l + s)), new pn(i, o - i);
}
class vn extends hs {
}
function Za(n) {
  return n instanceof De || n instanceof nt;
}
function Ya(n) {
  return typeof n.updateContent == "function";
}
class Ym extends Ki {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = De;
  static allowedChildren = [De, nt, vn];
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
    this.emitter.emit(H.events.SCROLL_BLOT_MOUNT, e);
  }
  emitUnmount(e) {
    this.emitter.emit(H.events.SCROLL_BLOT_UNMOUNT, e);
  }
  emitEmbedUpdate(e, t) {
    this.emitter.emit(H.events.SCROLL_EMBED_UPDATE, e, t);
  }
  deleteAt(e, t) {
    const [r, s] = this.line(e), [i] = this.line(e + t);
    if (super.deleteAt(e, t), i != null && r !== i && s > 0) {
      if (r instanceof nt || i instanceof nt) {
        this.optimize();
        return;
      }
      const o = i.children.head instanceof ft ? null : i.children.head;
      r.moveChildren(i, o), r.remove();
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
      if (r == null || this.scroll.query(t, W.BLOCK) == null) {
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
    if (e.statics.scope === W.INLINE_BLOT) {
      const r = this.scroll.create(this.statics.defaultChild.blotName);
      r.appendChild(e), super.insertBefore(r, t);
    } else
      super.insertBefore(e, t);
  }
  insertContents(e, t) {
    const r = this.deltaToRenderBlocks(t.concat(new G().insert(`
`))), s = r.pop();
    if (s == null) return;
    this.batchStart();
    const i = r.shift();
    if (i) {
      const u = i.type === "block" && (i.delta.length() === 0 || !this.descendant(nt, e)[0] && e < this.length()), d = i.type === "block" ? i.delta : new G().insert({
        [i.key]: i.value
      });
      ci(this, e, d);
      const p = i.type === "block" ? 1 : 0, b = e + d.length() + p;
      u && this.insertAt(b - 1, `
`);
      const h = et(this.line(e)[0]), w = rt.AttributeMap.diff(h, i.attributes) || {};
      Object.keys(w).forEach((E) => {
        this.formatAt(b - 1, 1, E, w[E]);
      }), e = b;
    }
    let [o, l] = this.children.find(e);
    if (r.length && (o && (o = o.split(l), l = 0), r.forEach((u) => {
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
    const [r, s] = t;
    return r instanceof Ue ? [r, s] : [null, -1];
  }
  line(e) {
    return e === this.length() ? this.line(e - 1) : this.descendant(Za, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (s, i, o) => {
      let l = [], u = o;
      return s.children.forEachAt(i, o, (d, p, b) => {
        Za(d) ? l.push(d) : d instanceof hs && (l = l.concat(r(d, p, u))), u -= b;
      }), l;
    };
    return r(this, e, t);
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
    typeof e == "string" && (t = e), Array.isArray(e) || (e = this.observer.takeRecords()), e = e.filter((r) => {
      let {
        target: s
      } = r;
      const i = this.find(s, !0);
      return i && !Ya(i);
    }), e.length > 0 && this.emitter.emit(H.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(H.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, r) {
    const [s] = this.descendant((i) => i instanceof nt, e);
    s && s.statics.blotName === t && Ya(s) && s.updateContent(r);
  }
  handleDragStart(e) {
    e.preventDefault();
  }
  deltaToRenderBlocks(e) {
    const t = [];
    let r = new G();
    return e.forEach((s) => {
      const i = s?.insert;
      if (i)
        if (typeof i == "string") {
          const o = i.split(`
`);
          o.slice(0, -1).forEach((u) => {
            r.insert(u, s.attributes), t.push({
              type: "block",
              delta: r,
              attributes: s.attributes ?? {}
            }), r = new G();
          });
          const l = o[o.length - 1];
          l && r.insert(l, s.attributes);
        } else {
          const o = Object.keys(i)[0];
          if (!o) return;
          this.query(o, W.INLINE) ? r.push(s) : (r.length() && t.push({
            type: "block",
            delta: r,
            attributes: {}
          }), r = new G(), t.push({
            type: "blockEmbed",
            key: o,
            value: i[o],
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
      this.query(u, W.BLOCK & W.BLOT) != null ? r = u : s[u] = d;
    });
    const i = this.create(r || this.statics.defaultChild.blotName, r ? e[r] : void 0);
    this.insertBefore(i, t || void 0);
    const o = i.length();
    return Object.entries(s).forEach((l) => {
      let [u, d] = l;
      i.formatAt(0, o, u, d);
    }), i;
  }
}
function ci(n, e, t) {
  t.reduce((r, s) => {
    const i = rt.Op.length(s);
    let o = s.attributes || {};
    if (s.insert != null) {
      if (typeof s.insert == "string") {
        const l = s.insert;
        n.insertAt(r, l);
        const [u] = n.descendant(Ue, r), d = et(u);
        o = rt.AttributeMap.diff(d, o) || {};
      } else if (typeof s.insert == "object") {
        const l = Object.keys(s.insert)[0];
        if (l == null) return r;
        if (n.insertAt(r, l, s.insert[l]), n.scroll.query(l, W.INLINE) != null) {
          const [d] = n.descendant(Ue, r), p = et(d);
          o = rt.AttributeMap.diff(p, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((l) => {
      n.formatAt(r, i, l, o[l]);
    }), r + i;
  }, e);
}
const Wi = {
  scope: W.BLOCK,
  whitelist: ["right", "center", "justify"]
}, Xm = new vt("align", "align", Wi), vl = new ht("align", "ql-align", Wi), xl = new Qt("align", "text-align", Wi);
class wl extends Qt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((s) => `00${parseInt(s, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const Qm = new ht("color", "ql-color", {
  scope: W.INLINE
}), Zi = new wl("color", "color", {
  scope: W.INLINE
}), Jm = new ht("background", "ql-bg", {
  scope: W.INLINE
}), Yi = new wl("background", "background-color", {
  scope: W.INLINE
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
class Xi extends He {
}
Xi.blotName = "code";
Xi.tagName = "CODE";
Ke.blotName = "code-block";
Ke.className = "ql-code-block";
Ke.tagName = "DIV";
xn.blotName = "code-block-container";
xn.className = "ql-code-block-container";
xn.tagName = "DIV";
xn.allowedChildren = [Ke];
Ke.allowedChildren = [dt, ft, ot];
Ke.requiredContainer = xn;
const Qi = {
  scope: W.BLOCK,
  whitelist: ["rtl"]
}, Al = new vt("direction", "dir", Qi), El = new ht("direction", "ql-direction", Qi), Nl = new Qt("direction", "direction", Qi), Tl = {
  scope: W.INLINE,
  whitelist: ["serif", "monospace"]
}, Sl = new ht("font", "ql-font", Tl);
class eg extends Qt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const Cl = new eg("font", "font-family", Tl), kl = new ht("size", "ql-size", {
  scope: W.INLINE,
  whitelist: ["small", "large", "huge"]
}), _l = new Qt("size", "font-size", {
  scope: W.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), tg = Dt("quill:keyboard"), ng = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
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
    const s = sg(e);
    if (s == null) {
      tg.warn("Attempted to add invalid keyboard binding", s);
      return;
    }
    typeof t == "function" && (t = {
      handler: t
    }), typeof r == "function" && (r = {
      handler: r
    }), (Array.isArray(s.key) ? s.key : [s.key]).forEach((o) => {
      const l = {
        ...s,
        key: o,
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
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [l, u] = this.quill.getLine(o.index), [d, p] = this.quill.getLeaf(o.index), [b, h] = o.length === 0 ? [d, p] : this.quill.getLeaf(o.index + o.length), w = d instanceof ns ? d.value().slice(0, p) : "", E = b instanceof ns ? b.value().slice(h) : "", k = {
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
        if (R.collapsed != null && R.collapsed !== k.collapsed || R.empty != null && R.empty !== k.empty || R.offset != null && R.offset !== k.offset)
          return !1;
        if (Array.isArray(R.format)) {
          if (R.format.every((P) => k.format[P] == null))
            return !1;
        } else if (typeof R.format == "object" && !Object.keys(R.format).every((P) => R.format[P] === !0 ? k.format[P] != null : R.format[P] === !1 ? k.format[P] == null : zi(R.format[P], k.format[P])))
          return !1;
        return R.prefix != null && !R.prefix.test(k.prefix) || R.suffix != null && !R.suffix.test(k.suffix) ? !1 : R.handler.call(this, o, k, R) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let o = new G().retain(e.index - r).delete(r);
    if (t.offset === 0) {
      const [l] = this.quill.getLine(e.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const d = i.formats(), p = this.quill.getFormat(e.index - 1, 1);
        if (s = rt.AttributeMap.diff(d, p) || {}, Object.keys(s).length > 0) {
          const b = new G().retain(e.index + i.length() - 2).retain(1, s);
          o = o.compose(b);
        }
      }
    }
    this.quill.updateContents(o, $.sources.USER), this.quill.focus();
  }
  handleDelete(e, t) {
    const r = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
    if (e.index >= this.quill.getLength() - r) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let o = new G().retain(e.index).delete(r);
    if (t.offset >= i.length() - 1) {
      const [l] = this.quill.getLine(e.index + 1);
      if (l) {
        const u = i.formats(), d = this.quill.getFormat(e.index, 1);
        s = rt.AttributeMap.diff(u, d) || {}, Object.keys(s).length > 0 && (o = o.retain(l.length() - 1).retain(1, s));
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
    const r = Object.keys(t.format).reduce((i, o) => (this.quill.scroll.query(o, W.BLOCK) && !Array.isArray(t.format[o]) && (i[o] = t.format[o]), i), {}), s = new G().retain(e.index).delete(e.length).insert(`
`, r);
    this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.focus();
  }
}
const rg = {
  bindings: {
    bold: di("bold"),
    italic: di("italic"),
    underline: di("underline"),
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
    "indent code-block": Xa(!0),
    "outdent code-block": Xa(!1),
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
        const t = new G().retain(n.index).delete(n.length).insert("	");
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
        }, s = new G().retain(n.index).insert(`
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
        const [t, r] = this.quill.getLine(n.index), s = new G().retain(n.index).insert(`
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
          const [t, r, s, i] = e.getTable(n), o = ig(t, r, s, i);
          if (o == null) return;
          let l = t.offset();
          if (o < 0) {
            const u = new G().retain(l).insert(`
`);
            this.quill.updateContents(u, $.sources.USER), this.quill.setSelection(n.index + 1, n.length, $.sources.SILENT);
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
        const o = new G().retain(n.index - s).delete(t + 1).retain(r.length() - 2 - s).retain(1, {
          list: i
        });
        return this.quill.updateContents(o, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index - t, $.sources.SILENT), !1;
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
            const i = new G().retain(n.index + e.length() - t - 2).retain(1, {
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
    "table down": Qa(!1),
    "table up": Qa(!0)
  }
};
ps.DEFAULTS = rg;
function Xa(n) {
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
      const o = e.length === 0 ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
      let {
        index: l,
        length: u
      } = e;
      o.forEach((d, p) => {
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
function di(n) {
  return {
    key: n[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(n, !t.format[n], $.sources.USER);
    }
  };
}
function Qa(n) {
  return {
    key: n ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(e, t) {
      const r = n ? "prev" : "next", s = t.line, i = s.parent[r];
      if (i != null) {
        if (i.statics.blotName === "table-row") {
          let o = i.children.head, l = s;
          for (; l.prev != null; )
            l = l.prev, o = o.next;
          const u = o.offset(this.quill.scroll) + Math.min(t.offset, o.length() - 1);
          this.quill.setSelection(u, 0, $.sources.USER);
        }
      } else {
        const o = s.table()[r];
        o != null && (n ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, $.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, $.sources.USER));
      }
      return !1;
    }
  };
}
function sg(n) {
  if (typeof n == "string" || typeof n == "number")
    n = {
      key: n
    };
  else if (typeof n == "object")
    n = Bn(n);
  else
    return null;
  return n.shortKey && (n[ng] = n.shortKey, delete n.shortKey), n;
}
function Ji(n) {
  let {
    quill: e,
    range: t
  } = n;
  const r = e.getLines(t);
  let s = {};
  if (r.length > 1) {
    const i = r[0].formats(), o = r[r.length - 1].formats();
    s = rt.AttributeMap.diff(o, i) || {};
  }
  e.deleteText(t, $.sources.USER), Object.keys(s).length > 0 && e.formatLine(t.index, 1, s, $.sources.USER), e.setSelection(t.index, $.sources.SILENT);
}
function ig(n, e, t, r) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? r === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const ag = /font-weight:\s*normal/, og = ["P", "OL", "UL"], Ja = (n) => n && og.includes(n.tagName), lg = (n) => {
  Array.from(n.querySelectorAll("br")).filter((e) => Ja(e.previousElementSibling) && Ja(e.nextElementSibling)).forEach((e) => {
    e.parentNode?.removeChild(e);
  });
}, ug = (n) => {
  Array.from(n.querySelectorAll('b[style*="font-weight"]')).filter((e) => e.getAttribute("style")?.match(ag)).forEach((e) => {
    const t = n.createDocumentFragment();
    t.append(...e.childNodes), e.parentNode?.replaceChild(t, e);
  });
};
function cg(n) {
  n.querySelector('[id^="docs-internal-guid-"]') && (ug(n), lg(n));
}
const dg = /\bmso-list:[^;]*ignore/i, hg = /\bmso-list:[^;]*\bl(\d+)/i, fg = /\bmso-list:[^;]*\blevel(\d+)/i, pg = (n, e) => {
  const t = n.getAttribute("style"), r = t?.match(hg);
  if (!r)
    return null;
  const s = Number(r[1]), i = t?.match(fg), o = i ? Number(i[1]) : 1, l = new RegExp(`@list l${s}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), u = e.match(l), d = u && u[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: s,
    indent: o,
    type: d,
    element: n
  };
}, mg = (n) => {
  const e = Array.from(n.querySelectorAll("[style*=mso-list]")), t = [], r = [];
  e.forEach((o) => {
    (o.getAttribute("style") || "").match(dg) ? t.push(o) : r.push(o);
  }), t.forEach((o) => o.parentNode?.removeChild(o));
  const s = n.documentElement.innerHTML, i = r.map((o) => pg(o, s)).filter((o) => o);
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
function gg(n) {
  n.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && mg(n);
}
const bg = [gg, cg], yg = (n) => {
  n.documentElement && bg.forEach((e) => {
    e(n);
  });
}, vg = Dt("quill:clipboard"), xg = [[Node.TEXT_NODE, Og], [Node.TEXT_NODE, to], ["br", Sg], [Node.ELEMENT_NODE, to], [Node.ELEMENT_NODE, Tg], [Node.ELEMENT_NODE, Ng], [Node.ELEMENT_NODE, qg], ["li", _g], ["ol, ul", Lg], ["pre", Cg], ["tr", Ig], ["b", hi("bold")], ["i", hi("italic")], ["strike", hi("strike")], ["style", kg]], wg = [Xm, Al].reduce((n, e) => (n[e.keyName] = e, n), {}), eo = [xl, Yi, Zi, Nl, Cl, _l].reduce((n, e) => (n[e.keyName] = e, n), {});
class Ag extends wt {
  static DEFAULTS = {
    matchers: []
  };
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (r) => this.onCaptureCopy(r, !1)), this.quill.root.addEventListener("cut", (r) => this.onCaptureCopy(r, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], xg.concat(this.options.matchers ?? []).forEach((r) => {
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
      return new G().insert(r || "", {
        [Ke.blotName]: s[Ke.blotName]
      });
    if (!t)
      return new G().insert(r || "", s);
    const i = this.convertHTML(t);
    return wr(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || s.table) ? i.compose(new G().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(e) {
    yg(e);
  }
  convertHTML(e) {
    const t = new DOMParser().parseFromString(e, "text/html");
    this.normalizeHTML(t);
    const r = t.body, s = /* @__PURE__ */ new WeakMap(), [i, o] = this.prepareMatching(r, s);
    return ea(this.quill.scroll, r, i, o, s);
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
      this.quill.updateContents(new G().retain(e).concat(s), r), this.quill.setSelection(e + s.length(), $.sources.SILENT);
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
    e.clipboardData?.setData("text/plain", i), e.clipboardData?.setData("text/html", s), t && Ji({
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
      const o = e.clipboardData?.getData("text/uri-list");
      o && (s = this.normalizeURIList(o));
    }
    const i = Array.from(e.clipboardData?.files || []);
    if (!r && i.length > 0) {
      this.quill.uploader.upload(t, i);
      return;
    }
    if (r && i.length > 0) {
      const o = new DOMParser().parseFromString(r, "text/html");
      if (o.body.childElementCount === 1 && o.body.firstElementChild?.tagName === "IMG") {
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
    const i = this.quill.getFormat(e.index), o = this.convert({
      text: r,
      html: s
    }, i);
    vg.log("onPaste", o, {
      text: r,
      html: s
    });
    const l = new G().retain(e.index).delete(e.length).concat(o);
    this.quill.updateContents(l, $.sources.USER), this.quill.setSelection(l.length() - e.length, $.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(e, t) {
    const r = [], s = [];
    return this.matchers.forEach((i) => {
      const [o, l] = i;
      switch (o) {
        case Node.TEXT_NODE:
          s.push(l);
          break;
        case Node.ELEMENT_NODE:
          r.push(l);
          break;
        default:
          Array.from(e.querySelectorAll(o)).forEach((u) => {
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
    const o = t ? {
      [e]: t
    } : {};
    return s.insert(i.insert, {
      ...o,
      ...i.attributes
    });
  }, new G()) : n;
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
function Eg(n, e) {
  return n.previousElementSibling && n.nextElementSibling && !Ht(n.previousElementSibling, e) && !Ht(n.nextElementSibling, e);
}
const Gr = /* @__PURE__ */ new WeakMap();
function Ll(n) {
  return n == null ? !1 : (Gr.has(n) || (n.tagName === "PRE" ? Gr.set(n, !0) : Gr.set(n, Ll(n.parentNode))), Gr.get(n));
}
function ea(n, e, t, r, s) {
  return e.nodeType === e.TEXT_NODE ? r.reduce((i, o) => o(e, i, n), new G()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, o) => {
    let l = ea(n, o, t, r, s);
    return o.nodeType === e.ELEMENT_NODE && (l = t.reduce((u, d) => d(o, u, n), l), l = (s.get(o) || []).reduce((u, d) => d(o, u, n), l)), i.concat(l);
  }, new G()) : new G();
}
function hi(n) {
  return (e, t, r) => wn(t, n, !0, r);
}
function Ng(n, e, t) {
  const r = vt.keys(n), s = ht.keys(n), i = Qt.keys(n), o = {};
  return r.concat(s).concat(i).forEach((l) => {
    let u = t.query(l, W.ATTRIBUTE);
    u != null && (o[u.attrName] = u.value(n), o[u.attrName]) || (u = wg[l], u != null && (u.attrName === l || u.keyName === l) && (o[u.attrName] = u.value(n) || void 0), u = eo[l], u != null && (u.attrName === l || u.keyName === l) && (u = eo[l], o[u.attrName] = u.value(n) || void 0));
  }), Object.entries(o).reduce((l, u) => {
    let [d, p] = u;
    return wn(l, d, p, t);
  }, e);
}
function Tg(n, e, t) {
  const r = t.query(n);
  if (r == null) return e;
  if (r.prototype instanceof Xe) {
    const s = {}, i = r.value(n);
    if (i != null)
      return s[r.blotName] = i, new G().insert(s, r.formats(n, t));
  } else if (r.prototype instanceof mr && !wr(e, `
`) && e.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return wn(e, r.blotName, r.formats(n, t), t);
  return e;
}
function Sg(n, e) {
  return wr(e, `
`) || e.insert(`
`), e;
}
function Cg(n, e, t) {
  const r = t.query("code-block"), s = r && "formats" in r && typeof r.formats == "function" ? r.formats(n, t) : !0;
  return wn(e, "code-block", s, t);
}
function kg() {
  return new G();
}
function _g(n, e, t) {
  const r = t.query(n);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !wr(e, `
`))
    return e;
  let s = -1, i = n.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (s += 1), i = i.parentNode;
  return s <= 0 ? e : e.reduce((o, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? o.push(l) : o.insert(l.insert, {
    indent: s,
    ...l.attributes || {}
  }) : o, new G());
}
function Lg(n, e, t) {
  const r = n;
  let s = r.tagName === "OL" ? "ordered" : "bullet";
  const i = r.getAttribute("data-checked");
  return i && (s = i === "true" ? "checked" : "unchecked"), wn(e, "list", s, t);
}
function to(n, e, t) {
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
        if (s && s.prototype instanceof nt)
          return e.insert(`
`);
        r = r.firstChild;
      }
    }
  }
  return e;
}
function qg(n, e, t) {
  const r = {}, s = n.style || {};
  return s.fontStyle === "italic" && (r.italic = !0), s.textDecoration === "underline" && (r.underline = !0), s.textDecoration === "line-through" && (r.strike = !0), (s.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(s.fontWeight, 10) >= 700) && (r.bold = !0), e = Object.entries(r).reduce((i, o) => {
    let [l, u] = o;
    return wn(i, l, u, t);
  }, e), parseFloat(s.textIndent || 0) > 0 ? new G().insert("	").concat(e) : e;
}
function Ig(n, e, t) {
  const r = n.parentElement?.tagName === "TABLE" ? n.parentElement : n.parentElement?.parentElement;
  if (r != null) {
    const i = Array.from(r.querySelectorAll("tr")).indexOf(n) + 1;
    return wn(e, "table", i, t);
  }
  return e;
}
function Og(n, e, t) {
  let r = n.data;
  if (n.parentElement?.tagName === "O:P")
    return e.insert(r.trim());
  if (!Ll(n)) {
    if (r.trim().length === 0 && r.includes(`
`) && !Eg(n, t))
      return e;
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (n.previousSibling == null && n.parentElement != null && Ht(n.parentElement, t) || n.previousSibling instanceof Element && Ht(n.previousSibling, t)) && (r = r.replace(/^ /, "")), (n.nextSibling == null && n.parentElement != null && Ht(n.parentElement, t) || n.nextSibling instanceof Element && Ht(n.nextSibling, t)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return e.insert(r);
}
class Rg extends wt {
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
    super(e, t), this.quill.on($.events.EDITOR_CHANGE, (r, s, i, o) => {
      r === $.events.SELECTION_CHANGE ? s && o !== $.sources.SILENT && (this.currentRange = s) : r === $.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === $.sources.USER ? this.record(s, i) : this.transform(s)), this.currentRange = qi(this.currentRange, s));
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
      range: qi(r.range, i)
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
      const o = this.stack.undo.pop();
      o && (r = r.compose(o.delta), s = o.range);
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
    no(this.stack.undo, e), no(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, $.sources.USER);
    else {
      const t = Dg(this.quill.scroll, e.delta);
      this.quill.setSelection(t, $.sources.USER);
    }
  }
}
function no(n, e) {
  let t = e;
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const s = n[r];
    n[r] = {
      delta: t.transform(s.delta, !0),
      range: s.range && qi(s.range, t)
    }, t = s.delta.transform(t), n[r].delta.length() === 0 && n.splice(r, 1);
  }
}
function $g(n, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((r) => n.query(r, W.BLOCK) != null) : !1;
}
function Dg(n, e) {
  const t = e.reduce((s, i) => s + (i.delete || 0), 0);
  let r = e.length() - t;
  return $g(n, e) && (r -= 1), r;
}
function qi(n, e) {
  if (!n) return n;
  const t = e.transformPosition(n.index), r = e.transformPosition(n.index + n.length);
  return {
    index: t,
    length: r - t
  };
}
class ql extends wt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("drop", (r) => {
      r.preventDefault();
      let s = null;
      if (document.caretRangeFromPoint)
        s = document.caretRangeFromPoint(r.clientX, r.clientY);
      else if (document.caretPositionFromPoint) {
        const o = document.caretPositionFromPoint(r.clientX, r.clientY);
        s = document.createRange(), s.setStart(o.offsetNode, o.offset), s.setEnd(o.offsetNode, o.offset);
      }
      const i = s && e.selection.normalizeNative(s);
      if (i) {
        const o = e.selection.normalizedToRange(i);
        r.dataTransfer?.files && this.upload(o, r.dataTransfer.files);
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
ql.DEFAULTS = {
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
      const s = r.reduce((i, o) => i.insert({
        image: o
      }), new G().retain(n.index).delete(n.length));
      this.quill.updateContents(s, H.sources.USER), this.quill.setSelection(n.index + r.length, H.sources.SILENT);
    });
  }
};
const Bg = ["insertText", "insertReplacementText"];
class Fg extends wt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("beforeinput", (r) => {
      this.handleBeforeInput(r);
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
      const r = this.quill.getFormat(e.index, 1);
      this.deleteRange(e), this.quill.updateContents(new G().retain(e.index).insert(t, r), $.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, $.sources.SILENT), !0;
  }
  handleBeforeInput(e) {
    if (this.quill.composition.isComposing || e.defaultPrevented || !Bg.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const r = Mg(e);
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
function Mg(n) {
  return typeof n.data == "string" ? n.data : n.dataTransfer?.types.includes("text/plain") ? n.dataTransfer.getData("text/plain") : null;
}
const Pg = /Mac/i.test(navigator.platform), jg = 100, Ug = (n) => !!(n.key === "ArrowLeft" || n.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
n.key === "ArrowUp" || n.key === "ArrowDown" || n.key === "Home" || Pg && n.key === "a" && n.ctrlKey === !0);
class Vg extends wt {
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
        if (!(r instanceof ct) || !r.uiNode)
          return !0;
        const i = getComputedStyle(r.domNode).direction === "rtl";
        return i && s.key !== "ArrowRight" || !i && s.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (s.shiftKey ? 1 : 0), $.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && Ug(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + jg, this.isListening) return;
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
    if (!(r instanceof ct) || !r.uiNode) return;
    const s = document.createRange();
    s.setStartAfter(r.uiNode), s.setEndAfter(r.uiNode), e.removeAllRanges(), e.addRange(s);
  }
}
$.register({
  "blots/block": De,
  "blots/block/embed": nt,
  "blots/break": ft,
  "blots/container": vn,
  "blots/cursor": ot,
  "blots/embed": Gi,
  "blots/inline": He,
  "blots/scroll": Ym,
  "blots/text": dt,
  "modules/clipboard": Ag,
  "modules/history": Rg,
  "modules/keyboard": ps,
  "modules/uploader": ql,
  "modules/input": Fg,
  "modules/uiNode": Vg
});
class zg extends ht {
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
const Hg = new zg("indent", "ql-indent", {
  scope: W.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Kg extends De {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class Gg extends De {
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
      const o = this.statics.formats(t, e);
      o === "checked" ? (this.format("list", "unchecked"), i.preventDefault()) : o === "unchecked" && (this.format("list", "checked"), i.preventDefault());
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
class Wg extends ta {
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
    return Il(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
  }
  format(e, t) {
    e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
  }
}
function Il(n, e) {
  const t = document.createElement("a");
  t.href = n;
  const r = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(r) > -1;
}
class Zg extends He {
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
class Yg extends ta {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class Xg extends He {
  static blotName = "underline";
  static tagName = "U";
}
class Qg extends Gi {
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
const ro = ["alt", "height", "width"];
let Jg = class extends Xe {
  static blotName = "image";
  static tagName = "IMG";
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return ro.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static match(e) {
    return /\.(jpe?g|gif|png)$/.test(e) || /^data:image\/.+;base64/.test(e);
  }
  static sanitize(e) {
    return Il(e, ["http", "https", "data"]) ? e : "//:0";
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    ro.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
};
const so = ["height", "width"];
class e0 extends nt {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return so.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static sanitize(e) {
    return rs.sanitize(e);
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    so.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
  html() {
    const {
      video: e
    } = this.value();
    return `<a href="${e}">${e}</a>`;
  }
}
const ir = new ht("code-token", "hljs", {
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
class cr extends xn {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(e, t) {
    e === tt.blotName && (this.forceNext = !0, this.children.forEach((r) => {
      r.format(e, t);
    }));
  }
  formatAt(e, t, r, s) {
    r === tt.blotName && (this.forceNext = !0), super.formatAt(e, t, r, s);
  }
  highlight(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const s = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, i = tt.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== s) {
      if (s.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((u, d) => u.concat(bl(d, !1)), new G()), l = e(s, i);
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
    const [r] = this.children.find(e);
    return `<pre data-language="${r ? tt.formats(r.domNode) : "plain"}">
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
cr.allowedChildren = [tt];
tt.requiredContainer = cr;
tt.allowedChildren = [Rt, ot, dt, ft];
const t0 = (n, e, t) => {
  if (typeof n.versionString == "string") {
    const r = n.versionString.split(".")[0];
    if (parseInt(r, 10) >= 11)
      return n.highlight(t, {
        language: e
      }).value;
  }
  return n.highlight(e, t).value;
};
class Ol extends wt {
  static register() {
    $.register(Rt, !0), $.register(tt, !0), $.register(cr, !0);
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
    const r = this.quill.getSelection();
    (e == null ? this.quill.scroll.descendants(cr) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update($.sources.SILENT), r != null && this.quill.setSelection(r, $.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return fs(e).split(`
`).reduce((s, i, o) => (o !== 0 && s.insert(`
`, {
        [Ke.blotName]: t
      }), s.insert(i)), new G());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(Ke.className), r.innerHTML = t0(this.options.hljs, t, e), ea(this.quill.scroll, r, [(s, i) => {
      const o = ir.value(s);
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
Ol.DEFAULTS = {
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
    return e ? t.setAttribute("data-row", e) : t.setAttribute("data-row", na()), t;
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
        r.children.head != null && (s = lt.formats(r.children.head.domNode));
        const i = this.scroll.create(lt.blotName, s);
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
      const s = r.children.at(e), i = lt.formats(r.children.head.domNode), o = this.scroll.create(lt.blotName, i);
      r.insertBefore(o, s);
    });
  }
  insertRow(e) {
    const [t] = this.descendant(Gt);
    if (t == null || t.children.head == null) return;
    const r = na(), s = this.scroll.create(mn.blotName);
    t.children.head.children.forEach(() => {
      const o = this.scroll.create(lt.blotName, r);
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
Gt.allowedChildren = [mn];
mn.requiredContainer = Gt;
mn.allowedChildren = [lt];
lt.requiredContainer = mn;
function na() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class n0 extends wt {
  static register() {
    $.register(lt), $.register(mn), $.register(Gt), $.register(ss);
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
    if (t == null || t.statics.blotName !== lt.blotName)
      return [null, null, null, -1];
    const s = t.parent;
    return [s.parent.parent, s, t, r];
  }
  insertColumn(e) {
    const t = this.quill.getSelection();
    if (!t) return;
    const [r, s, i] = this.getTable(t);
    if (i == null) return;
    const o = i.cellOffset();
    r.insertColumn(o + e), this.quill.update($.sources.USER);
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
    const o = s.rowOffset();
    r.insertRow(o + e), this.quill.update($.sources.USER), e > 0 ? this.quill.setSelection(t, $.sources.SILENT) : this.quill.setSelection(t.index + s.children.length, t.length, $.sources.SILENT);
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
      const o = new Array(t).fill(`
`).join("");
      return i.insert(o, {
        table: na()
      });
    }, new G().retain(r.index));
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
const io = Dt("quill:toolbar");
class ra extends wt {
  constructor(e, t) {
    if (super(e, t), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), r0(r, this.options.container), e.container?.parentNode?.insertBefore(r, e.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      io.error("Container required for toolbar", this.options);
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
      io.warn("ignoring attaching to nonexistent format", t, e);
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
    this.controls.forEach((r) => {
      const [s, i] = r;
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
ra.DEFAULTS = {};
function ao(n, e, t) {
  const r = document.createElement("button");
  r.setAttribute("type", "button"), r.classList.add(`ql-${e}`), r.setAttribute("aria-pressed", "false"), t != null ? (r.value = t, r.setAttribute("aria-label", `${e}: ${t}`)) : r.setAttribute("aria-label", e), n.appendChild(r);
}
function r0(n, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const r = document.createElement("span");
    r.classList.add("ql-formats"), t.forEach((s) => {
      if (typeof s == "string")
        ao(r, s);
      else {
        const i = Object.keys(s)[0], o = s[i];
        Array.isArray(o) ? s0(r, i, o) : ao(r, i, o);
      }
    }), n.appendChild(r);
  });
}
function s0(n, e, t) {
  const r = document.createElement("select");
  r.classList.add(`ql-${e}`), t.forEach((s) => {
    const i = document.createElement("option");
    s !== !1 ? i.setAttribute("value", String(s)) : i.setAttribute("selected", "selected"), r.appendChild(i);
  }), n.appendChild(r);
}
ra.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const n = this.quill.getSelection();
      if (n != null)
        if (n.length === 0) {
          const e = this.quill.getFormat();
          Object.keys(e).forEach((t) => {
            this.quill.scroll.query(t, W.INLINE) != null && this.quill.format(t, !1, $.sources.USER);
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
const i0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', a0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', o0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', l0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', u0 = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', c0 = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', d0 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', h0 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', oo = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', f0 = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', p0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', m0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', g0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', b0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', y0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', v0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', x0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', w0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', A0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', E0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', N0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', T0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', S0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', C0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', k0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', _0 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', L0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', q0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', I0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', O0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', R0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', $0 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', D0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', br = {
  align: {
    "": i0,
    center: a0,
    right: o0,
    justify: l0
  },
  background: u0,
  blockquote: c0,
  bold: d0,
  clean: h0,
  code: oo,
  "code-block": oo,
  color: f0,
  direction: {
    "": p0,
    rtl: m0
  },
  formula: g0,
  header: {
    1: b0,
    2: y0,
    3: v0,
    4: x0,
    5: w0,
    6: A0
  },
  italic: E0,
  image: N0,
  indent: {
    "+1": T0,
    "-1": S0
  },
  link: C0,
  list: {
    bullet: k0,
    check: _0,
    ordered: L0
  },
  script: {
    sub: q0,
    super: I0
  },
  strike: O0,
  table: R0,
  underline: $0,
  video: D0
}, B0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let lo = 0;
function uo(n, e) {
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
    this.container.classList.toggle("ql-expanded"), uo(this.label, "aria-expanded"), uo(this.options, "aria-hidden");
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
    return e.classList.add("ql-picker-label"), e.innerHTML = B0, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
  }
  buildOptions() {
    const e = document.createElement("span");
    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${lo}`, lo += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
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
class Rl extends ms {
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
class $l extends ms {
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
const F0 = (n) => {
  const {
    overflowY: e
  } = getComputedStyle(n, null);
  return e !== "visible" && e !== "clip";
};
class Dl {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, F0(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
    let o = 0;
    if (i.right > s.right && (o = s.right - i.right, this.root.style.left = `${t + o}px`), i.left < s.left && (o = s.left - i.left, this.root.style.left = `${t + o}px`), i.bottom > s.bottom) {
      const l = i.bottom - i.top, u = e.bottom - e.top + l;
      this.root.style.top = `${r - u}px`, this.root.classList.add("ql-flip");
    }
    return o;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const M0 = [!1, "center", "right", "justify"], P0 = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], j0 = [!1, "serif", "monospace"], U0 = ["1", "2", "3", !1], V0 = ["small", !1, "large", "huge"];
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
            const o = r.value || "";
            o != null && t[i][o] && (r.innerHTML = t[i][o]);
          }
      });
    });
  }
  buildPickers(e, t) {
    this.pickers = Array.from(e).map((s) => {
      if (s.classList.contains("ql-align") && (s.querySelector("option") == null && nr(s, M0), typeof t.align == "object"))
        return new $l(s, t.align);
      if (s.classList.contains("ql-background") || s.classList.contains("ql-color")) {
        const i = s.classList.contains("ql-background") ? "background" : "color";
        return s.querySelector("option") == null && nr(s, P0, i === "background" ? "#ffffff" : "#000000"), new Rl(s, t[i]);
      }
      return s.querySelector("option") == null && (s.classList.contains("ql-font") ? nr(s, j0) : s.classList.contains("ql-header") ? nr(s, U0) : s.classList.contains("ql-size") && nr(s, V0)), new ms(s);
    });
    const r = () => {
      this.pickers.forEach((s) => {
        s.update();
      });
    };
    this.quill.on(H.events.EDITOR_CHANGE, r);
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
class Bl extends Dl {
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
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", e, H.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", e, H.sources.USER)), this.quill.root.scrollTop = t;
        break;
      }
      case "video":
        e = z0(e);
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
            H.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(r + 1, " ", H.sources.USER), this.quill.setSelection(r + 2, H.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function z0(n) {
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
const H0 = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class K0 extends Bl {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(e, t) {
    super(e, t), this.quill.on(H.events.EDITOR_CHANGE, (r, s, i, o) => {
      if (r === H.events.SELECTION_CHANGE)
        if (s != null && s.length > 0 && o === H.sources.USER) {
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
    const t = super.position(e), r = this.root.querySelector(".ql-tooltip-arrow");
    return r.style.marginLeft = "", t !== 0 && (r.style.marginLeft = `${-1 * t - r.offsetWidth / 2}px`), t;
  }
}
class Fl extends Nr {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = H0), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new K0(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), br), this.buildPickers(e.container.querySelectorAll("select"), br));
  }
}
Fl.DEFAULTS = Kt({}, Nr.DEFAULTS, {
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
const G0 = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class W0 extends Bl {
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
    }), this.quill.on(H.events.SELECTION_CHANGE, (e, t, r) => {
      if (e != null) {
        if (e.length === 0 && r === H.sources.USER) {
          const [s, i] = this.quill.scroll.descendant(rs, e.index);
          if (s != null) {
            this.linkRange = new pn(e.index - i, s.length());
            const o = rs.formats(s.domNode);
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
class Ml extends Nr {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = G0), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), br), this.buildPickers(e.container.querySelectorAll("select"), br), this.tooltip = new W0(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, r) => {
      e.handlers.link.call(e, !r.format.link);
    }));
  }
}
Ml.DEFAULTS = Kt({}, Nr.DEFAULTS, {
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
  "attributors/attribute/direction": Al,
  "attributors/class/align": vl,
  "attributors/class/background": Jm,
  "attributors/class/color": Qm,
  "attributors/class/direction": El,
  "attributors/class/font": Sl,
  "attributors/class/size": kl,
  "attributors/style/align": xl,
  "attributors/style/background": Yi,
  "attributors/style/color": Zi,
  "attributors/style/direction": Nl,
  "attributors/style/font": Cl,
  "attributors/style/size": _l
}, !0);
$.register({
  "formats/align": vl,
  "formats/direction": El,
  "formats/indent": Hg,
  "formats/background": Yi,
  "formats/color": Zi,
  "formats/font": Sl,
  "formats/size": kl,
  "formats/blockquote": Kg,
  "formats/code-block": Ke,
  "formats/header": Gg,
  "formats/list": Er,
  "formats/bold": ta,
  "formats/code": Xi,
  "formats/italic": Wg,
  "formats/link": rs,
  "formats/script": Zg,
  "formats/strike": Yg,
  "formats/underline": Xg,
  "formats/formula": Qg,
  "formats/image": Jg,
  "formats/video": e0,
  "modules/syntax": Ol,
  "modules/table": n0,
  "modules/toolbar": ra,
  "themes/bubble": Fl,
  "themes/snow": Ml,
  "ui/icons": br,
  "ui/picker": ms,
  "ui/icon-picker": $l,
  "ui/color-picker": Rl,
  "ui/tooltip": Dl
}, !0);
const Z0 = { class: "rounded-lg border border-slate-300 bg-white" }, Y0 = /* @__PURE__ */ Te({
  __name: "RichTextEditor",
  props: {
    modelValue: {},
    placeholder: { default: "Escribe aquí el contenido..." },
    subirImagen: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = ee(null);
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
              image: o
            }
          }
        }
      }), i.root.innerHTML = t.modelValue || "", i.enable(!t.disabled), i.on("text-change", () => {
        i && r("update:modelValue", i.root.innerHTML);
      }));
    }), xo(() => {
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
    return (u, d) => (I(), F("div", Z0, [
      v("div", {
        ref_key: "root",
        ref: s,
        class: "min-h-[260px]"
      }, null, 512)
    ]));
  }
}), X0 = /* @__PURE__ */ Te({
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
    return (r, s) => (I(), _e(Y0, {
      "model-value": n.modelValue,
      "subir-imagen": n.uploadImage,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["model-value", "subir-imagen", "disabled"]));
  }
}), Q0 = ["value", "disabled"], J0 = ["value"], eb = /* @__PURE__ */ Te({
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
    return (r, s) => (I(), F("select", {
      value: n.modelValue,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, [
      s[1] || (s[1] = v("option", { value: "" }, "Selecciona una opción", -1)),
      (I(!0), F(Re, null, $e(n.options, (i) => (I(), F("option", {
        key: i,
        value: i
      }, X(i), 9, J0))), 128))
    ], 40, Q0));
  }
}), tb = ["value", "rows", "placeholder", "disabled"], nb = /* @__PURE__ */ Te({
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
    return (r, s) => (I(), F("textarea", {
      value: n.modelValue,
      rows: n.rows,
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, tb));
  }
}), rb = ["value", "placeholder", "disabled"], co = /* @__PURE__ */ Te({
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
    return (r, s) => (I(), F("input", {
      value: n.modelValue,
      type: "text",
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, rb));
  }
}), sb = {
  key: 2,
  class: "space-y-1"
}, ib = {
  key: 0,
  class: "text-xs text-slate-500"
}, ho = /* @__PURE__ */ Te({
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
    function o() {
      return typeof t.modelValue == "string" ? t.modelValue : "";
    }
    function l() {
      return t.modelValue;
    }
    return (u, d) => (I(), F("div", null, [
      n.field.type === "text" ? (I(), _e(co, {
        key: 0,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[0] || (d[0] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "date" ? (I(), _e(Ic, {
        key: 1,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[1] || (d[1] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "numeric" || n.field.type === "id" ? (I(), F("div", sb, [
        ut(Hc, {
          "model-value": o(),
          placeholder: n.field.placeholder || "",
          disabled: n.disabled || n.isAutoId,
          step: n.field.type === "id" ? "1" : "any",
          min: n.field.type === "id" ? 1 : null,
          "onUpdate:modelValue": d[2] || (d[2] = (p) => r("update:modelValue", p))
        }, null, 8, ["model-value", "placeholder", "disabled", "step", "min"]),
        n.isAutoId ? (I(), F("p", ib, " Se genera automáticamente al crear el documento. ")) : te("", !0)
      ])) : n.field.type === "textarea" ? (I(), _e(nb, {
        key: 3,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[3] || (d[3] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "select" ? (I(), _e(eb, {
        key: 4,
        "model-value": s(),
        options: n.field.options || [],
        disabled: n.disabled,
        "onUpdate:modelValue": d[4] || (d[4] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "disabled"])) : n.field.type === "document" ? (I(), _e(Bc, {
        key: 5,
        "model-value": s(),
        options: n.documentOptions,
        hint: n.documentHint,
        disabled: n.disabled,
        "onUpdate:modelValue": d[5] || (d[5] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "hint", "disabled"])) : n.field.type === "boolean" ? (I(), _e(ac, {
        key: 6,
        "model-value": i(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[6] || (d[6] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "image" ? (I(), _e(Vc, {
        key: 7,
        "model-value": s(),
        disabled: n.disabled,
        "onUpdate:file": d[7] || (d[7] = (p) => r("update:file", p)),
        onRemove: d[8] || (d[8] = (p) => r("remove-image"))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "array" || n.field.type === "map" ? (I(), _e(Lc, {
        key: 8,
        field: n.field,
        "model-value": l(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[9] || (d[9] = (p) => r("update:modelValue", p))
      }, null, 8, ["field", "model-value", "disabled"])) : n.field.type === "richtext" ? (I(), _e(X0, {
        key: 9,
        "model-value": s(),
        "upload-image": n.uploadImage,
        disabled: n.disabled,
        "onUpdate:modelValue": d[10] || (d[10] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "upload-image", "disabled"])) : (I(), _e(co, {
        key: 10,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[11] || (d[11] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"]))
    ]));
  }
}), ab = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};
async function ob(n, e = {}) {
  if (!n.type.startsWith("image/"))
    return n;
  const t = { ...ab, ...e }, r = await ub(n), { width: s, height: i } = lb(r.width, r.height, t.maxWidth, t.maxHeight), o = document.createElement("canvas");
  o.width = s, o.height = i;
  const l = o.getContext("2d");
  if (!l)
    return n;
  l.drawImage(r, 0, 0, s, i);
  let u = t.quality, d = await fo(o, n.type || "image/jpeg", u);
  const p = t.targetSizeKb * 1024;
  for (; d.size > p && u > 0.45; )
    u -= 0.08, d = await fo(o, n.type || "image/jpeg", u);
  return d;
}
function lb(n, e, t, r) {
  let s = n, i = e;
  return s > t && (i = Math.round(i * t / s), s = t), i > r && (s = Math.round(s * r / i), i = r), { width: s, height: i };
}
function fo(n, e, t) {
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
function ub(n) {
  return new Promise((e, t) => {
    const r = new Image(), s = URL.createObjectURL(n);
    r.onload = () => {
      URL.revokeObjectURL(s), e(r);
    }, r.onerror = () => {
      URL.revokeObjectURL(s), t(new Error("No fue posible leer la imagen."));
    }, r.src = s;
  });
}
async function cb(n, e, t) {
  const { storage: r } = Ce(), s = Yl(r, n);
  return await Xl(s, e, t), Ql(s);
}
async function po(n, e, t = {}) {
  const r = await ob(e, {
    maxWidth: t.maxWidth,
    maxHeight: t.maxHeight,
    quality: t.quality,
    targetSizeKb: t.targetSizeKb
  });
  return cb(n, r, t.metadata);
}
async function db(n, e) {
  const { firestore: t } = Ce(), r = await bb(n, e);
  return (await Gl(dn(t, n.collectionName), {
    ...r,
    createdAt: Ze(),
    updatedAt: Ze()
  })).id;
}
async function mo(n, e = 100) {
  const { firestore: t } = Ce();
  try {
    const r = Ii(
      dn(t, n.collectionName),
      Oi("createdAt", "desc"),
      Eo(e)
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
async function hb(n, e) {
  const { firestore: t } = Ce();
  await Wl(Yt(t, n.collectionName, e));
}
async function fb(n, e, t) {
  const { firestore: r } = Ce(), s = yb(n, t);
  await Ao(Yt(r, n.collectionName, e), {
    ...s,
    updatedAt: Ze()
  });
}
const Pl = "main", pb = "schema";
async function mb(n, e, t = Pl) {
  const { firestore: r } = Ce(), s = n.dictionaryDocumentId || t, i = jl(n), o = Yt(r, n.collectionName, s), l = await is(o), u = {
    updatedAt: Ze(),
    createdAt: l.exists() ? l.data().createdAt : Ze()
  };
  if (i)
    u[i] = e;
  else
    for (const [d, p] of Object.entries(e))
      u[d] = p;
  return await Xr(
    o,
    u,
    { merge: !0 }
  ), s;
}
async function gb(n, e = Pl) {
  const { firestore: t } = Ce(), r = n.dictionaryDocumentId || e, s = await is(Yt(t, n.collectionName, r));
  if (!s.exists())
    return null;
  const i = s.data(), o = jl(n), l = o ? i[o] : null;
  return l && typeof l == "object" && !Array.isArray(l) ? {
    id: s.id,
    data: l
  } : {
    id: s.id,
    data: i
  };
}
function jl(n) {
  return n.storageType !== "dictionary" ? "" : typeof n.dictionaryRootKey == "string" && n.dictionaryRootKey.trim() ? n.dictionaryRootKey.trim() : pb;
}
async function bb(n, e) {
  const t = Ul(n);
  if (!t.length)
    return { ...e };
  const { firestore: r } = Ce(), s = { ...e };
  for (const i of t) {
    if (i.type === "id") {
      s[i.key] = await xb(r, n.collectionName, i.key);
      continue;
    }
    if (i.type === "date") {
      s[i.key] = /* @__PURE__ */ new Date();
      continue;
    }
  }
  return s;
}
function yb(n, e) {
  const t = Ul(n);
  if (!t.length)
    return { ...e };
  const r = { ...e };
  for (const s of t)
    delete r[s.key];
  return r;
}
function Ul(n) {
  return n.storageType !== "document" ? [] : n.fields.filter((e) => vb(e));
}
function vb(n) {
  return n.type === "id" ? !0 : typeof n.autogenerated == "boolean" ? n.autogenerated : !1;
}
async function xb(n, e, t) {
  let r = 0;
  try {
    const o = (await jn(
      Ii(
        dn(n, e),
        Oi(t, "desc"),
        Eo(1)
      )
    )).docs[0]?.data()?.[t], l = go(o);
    l !== null && (r = l);
  } catch {
    r = 0;
  }
  if (r > 0)
    return r + 1;
  const s = await jn(dn(n, e));
  for (const i of s.docs) {
    const o = go(i.data()?.[t]);
    o !== null && o > r && (r = o);
  }
  return r + 1;
}
function go(n) {
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
function wb(n) {
  return `${n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}-${Date.now().toString().slice(-6)}`;
}
const Ab = { class: "space-y-4" }, Eb = { class: "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" }, Nb = {
  key: 0,
  class: "mt-2 text-xs text-slate-500"
}, Tb = {
  key: 1,
  class: "mt-2 text-xs text-rose-700"
}, Sb = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, Cb = { class: "text-xl font-black text-slate-900" }, kb = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, _b = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Lb = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, qb = { class: "block text-sm font-semibold text-slate-700" }, Ib = {
  key: 0,
  class: "text-xs text-slate-500"
}, Ob = {
  key: 0,
  class: "rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700"
}, Rb = { class: "flex flex-wrap items-center gap-2" }, $b = ["disabled"], Db = ["disabled"], Bb = { class: "mt-6 border-t border-slate-200 pt-5" }, Fb = { class: "flex flex-wrap items-center justify-between gap-3" }, Mb = ["disabled"], Pb = {
  key: 0,
  class: "mt-3 text-sm text-slate-500"
}, jb = {
  key: 1,
  class: "mt-3 text-sm text-slate-500"
}, Ub = {
  key: 2,
  class: "mt-3 space-y-2"
}, Vb = { class: "text-sm font-semibold text-slate-900" }, zb = { class: "text-xs text-slate-500" }, Hb = {
  key: 0,
  class: "flex items-center gap-2"
}, Kb = ["disabled", "onClick"], Gb = ["disabled", "onClick"], Wb = { class: "w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-2xl" }, Zb = { class: "block text-sm font-semibold text-slate-700" }, Yb = {
  key: 0,
  class: "text-xs text-slate-500"
}, Xb = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Qb = { class: "flex flex-wrap items-center gap-2" }, Jb = ["disabled"], e1 = /* @__PURE__ */ Te({
  __name: "AdminBlogPage",
  setup(n) {
    const e = as(), t = vr(), r = ee([]), s = ee(""), i = ee(!1), o = ee(""), l = ee({}), u = ee({}), d = ee([]), p = ee(!1), b = ee(!1), h = ee(""), w = ee(""), E = ee({}), k = ee(""), L = ee(!1), R = Oe(() => Dn.value === "admin" || Dn.value === "writer" || Dn.value === "manager"), P = Oe(() => r.value.find((m) => m.id === s.value) ?? null), z = Oe(() => !!k.value);
    yr(async () => {
      await Q();
    }), Wt(
      P,
      async (m) => {
        if (!m) {
          l.value = {}, u.value = {}, d.value = [], E.value = {}, k.value = "", L.value = !1;
          return;
        }
        m.storageType !== "dictionary" && (L.value = !1), y(m), await M(m), await S(m);
      },
      { immediate: !0 }
    ), Wt(
      () => e.query.schema,
      (m) => {
        typeof m == "string" && r.value.some((g) => g.id === m) && s.value !== m && (s.value = m);
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
      if (r.value = m, !m.length) {
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
      l.value = g, u.value = q, k.value = "", h.value = "", w.value = "";
    }
    async function M(m) {
      p.value = !0;
      try {
        if (m.storageType === "dictionary") {
          const q = await gb(m);
          d.value = q ? [q] : [], k.value = "", q && A(m, q);
          return;
        }
        const g = await mo(m, 100);
        d.value = g, k.value && !g.some((q) => q.id === k.value) && (k.value = "");
      } finally {
        p.value = !1;
      }
    }
    async function S(m) {
      const g = m.fields.filter((B) => B.type === "document");
      if (!g.length) {
        E.value = {};
        return;
      }
      const q = {};
      await Promise.all(
        g.map(async (B) => {
          const ne = typeof B.documentSchemaId == "string" ? B.documentSchemaId.trim() : "";
          if (!ne) {
            q[B.key] = { options: [], byId: {} };
            return;
          }
          const fe = r.value.find((Be) => Be.id === ne);
          if (!fe || fe.storageType !== "document") {
            q[B.key] = { options: [], byId: {} };
            return;
          }
          const Le = typeof B.documentLabelField == "string" && B.documentLabelField.trim() || fe.previewField || fe.slugFromField || fe.fields[0]?.key || "", an = await mo(fe, 200), Mt = {}, on = an.map((Be) => (Mt[Be.id] = Be, {
            id: Be.id,
            label: _(Be, Le),
            hint: f(Be)
          }));
          q[B.key] = { options: on, byId: Mt };
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
        const ne = g.data[B.key];
        B.type === "boolean" ? q[B.key] = !!ne : B.type === "array" || B.type === "map" ? q[B.key] = J(B, ne) : B.type === "date" ? q[B.key] = St(ne) : B.type === "numeric" ? q[B.key] = pt(ne) : B.type === "id" ? q[B.key] = Ve(ne) : B.type === "document" ? q[B.key] = typeof ne == "string" ? ne : "" : typeof ne == "string" ? q[B.key] = ne : q[B.key] = "";
      }
      l.value = q;
    }
    function C(m) {
      const g = P.value;
      !g || g.storageType !== "document" || (y(g), A(g, m), k.value = m.id);
    }
    function j() {
      const m = P.value;
      !m || m.storageType !== "dictionary" || (d.value[0] ? A(m, d.value[0]) : y(m), w.value = "", L.value = !0);
    }
    function D() {
      L.value = !1, w.value = "";
    }
    function T() {
      const m = P.value;
      !m || m.storageType !== "document" || y(m);
    }
    async function N() {
      const m = P.value;
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
          const q = m.storageType === "document" && !k.value;
          if ((m.storageType === "dictionary" || q) && Ft(m, g), m.slugFromField) {
            const B = g[m.slugFromField];
            typeof B == "string" && B.trim() && (g.slug = wb(B));
          }
          m.storageType === "dictionary" ? (await mb(m, g), h.value = "Registro de diccionario actualizado.", L.value = !1) : (k.value ? (await fb(m, k.value, g), h.value = "Registro actualizado correctamente.") : (await db(m, g), h.value = "Registro creado correctamente."), y(m)), await M(m);
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
        const B = Tt(q.name), ne = await po(
          `${m.collectionName}/${g.key}/${Date.now()}-${B}`,
          q,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return l.value[g.key] = ne, u.value[g.key] = null, ne;
      }
      return g.type === "array" || g.type === "map" ? J(g, l.value[g.key], !0) : g.type === "date" ? ce(g.key) : g.type === "numeric" ? de(g.key) : g.type === "id" ? m.storageType === "document" && !k.value ? null : Ve(l.value[g.key]) : (g.type === "document", oe(g.key));
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
    function J(m, g, q = !1) {
      if (typeof g == "string") {
        const ne = g.trim();
        if (!(ne.startsWith("{") || ne.startsWith("[")))
          g = m.type === "array" ? [] : {};
        else
          try {
            g = JSON.parse(ne);
          } catch {
            g = m.type === "array" ? [] : {};
          }
      }
      if (m.type === "array") {
        const ne = Array.isArray(g) ? g : [];
        return m.itemSchema ? ne.map(
          (fe, Le) => ge(
            m.itemSchema,
            fe,
            `${m.label}[${Le}]`,
            q
          )
        ) : ne;
      }
      const B = ie(g) ? g : {};
      return Array.isArray(m.mapFields) && m.mapFields.length > 0 ? Z(m.mapFields, B, m.label, q) : B;
    }
    function Z(m, g, q, B = !1) {
      const ne = {};
      for (const fe of m) {
        const Le = fe.key;
        if (!(Le in g)) {
          if (fe.required)
            throw new Error(`Falta la propiedad requerida "${q}.${Le}".`);
          continue;
        }
        ne[Le] = ge(fe, g[Le], `${q}.${Le}`, B);
      }
      return ne;
    }
    function ge(m, g, q, B = !1) {
      if (m.type === "array") {
        if (!Array.isArray(g))
          throw new Error(`"${q}" debe ser un arreglo.`);
        return m.itemSchema ? g.map(
          (ne, fe) => ge(m.itemSchema, ne, `${q}[${fe}]`, B)
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
        const ne = Ct(g);
        if (!ne)
          throw new Error(`"${q}" debe ser una fecha válida.`);
        return B ? ne : St(ne);
      }
      if (typeof g != "string")
        throw new Error(`"${q}" debe ser string.`);
      if (m.type === "select" && Array.isArray(m.options) && m.options.length > 0 && g && !m.options.includes(g))
        throw new Error(`"${q}" no coincide con las opciones del select.`);
      return g;
    }
    async function ye(m) {
      const g = P.value;
      if (!(!g || g.storageType !== "document")) {
        if (!R.value) {
          w.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await hb(g, m), k.value === m && y(g), await M(g));
      }
    }
    async function re(m) {
      const g = P.value;
      if (!g)
        throw new Error("No hay schema seleccionado.");
      const q = Tt(m.name);
      return po(
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
      return St(l.value[m]);
    }
    function ce(m) {
      return Ct(l.value[m]);
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
    function ke(m, g) {
      l.value[m] = St(g);
    }
    function Jt(m, g) {
      l.value[m] = pt(g);
    }
    function en(m) {
      return m.type === "boolean" ? Nn(m.key) : m.type === "array" || m.type === "map" ? nn(m.key) : m.type === "numeric" || m.type === "id" ? pe(m.key) : m.type === "date" ? le(m.key) : oe(m.key);
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
        ke(m.key, typeof g == "string" ? g : "");
        return;
      }
      Ee(m.key, typeof g == "string" ? g : "");
    }
    function tn(m) {
      return E.value[m.key]?.options ?? [];
    }
    function At(m) {
      const g = oe(m.key);
      return g ? tn(m).find((B) => B.id === g)?.hint ?? "" : "";
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
    function Kn(m) {
      const g = /^(\d{4})-(\d{2})-(\d{2})$/.exec(m);
      if (!g)
        return null;
      const q = Number(g[1]), B = Number(g[2]), ne = Number(g[3]), fe = new Date(Date.UTC(q, B - 1, ne));
      return fe.getUTCFullYear() !== q || fe.getUTCMonth() + 1 !== B || fe.getUTCDate() !== ne ? null : fe;
    }
    function rn(m) {
      const g = String(m.getUTCFullYear()).padStart(4, "0"), q = String(m.getUTCMonth() + 1).padStart(2, "0"), B = String(m.getUTCDate()).padStart(2, "0");
      return `${g}-${q}-${B}`;
    }
    function Bt(m) {
      const g = Ct(m);
      if (!g)
        return "";
      const q = String(g.getUTCDate()).padStart(2, "0"), B = String(g.getUTCMonth() + 1).padStart(2, "0"), ne = String(g.getUTCFullYear()).padStart(4, "0");
      return `${q}/${B}/${ne}`;
    }
    function sn(m) {
      return m.type === "id" && P.value?.storageType === "document";
    }
    function Ft(m, g) {
      for (const q of m.fields)
        Ae(m, q) && q.type === "date" && (g[q.key] = /* @__PURE__ */ new Date());
    }
    return (m, g) => (I(), F("section", Ab, [
      v("article", Eb, [
        g[0] || (g[0] = Ye(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        g[1] || (g[1] = v("strong", null, "Esquemas", -1)),
        g[2] || (g[2] = Ye(". ", -1)),
        i.value ? (I(), F("p", Nb, "Cargando formularios...")) : o.value ? (I(), F("p", Tb, X(o.value), 1)) : te("", !0)
      ]),
      v("article", Sb, [
        v("h3", Cb, X(P.value ? `Formulario y registros: ${P.value.title}` : "Formulario y registros"), 1),
        g[5] || (g[5] = v("p", { class: "mt-1 text-sm text-slate-600" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        R.value ? te("", !0) : (I(), F("p", kb, " No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        w.value ? (I(), F("p", _b, X(w.value), 1)) : te("", !0),
        h.value ? (I(), F("p", Lb, X(h.value), 1)) : te("", !0),
        P.value && P.value.storageType === "document" ? (I(), F("form", {
          key: 3,
          class: "mt-5 space-y-4",
          onSubmit: ar(N, ["prevent"])
        }, [
          (I(!0), F(Re, null, $e(we(P.value), (q) => (I(), F("div", {
            key: q.key,
            class: "space-y-1"
          }, [
            v("label", qb, X(q.label), 1),
            q.helpText ? (I(), F("p", Ib, X(q.helpText), 1)) : te("", !0),
            ut(ho, {
              field: q,
              "model-value": en(q),
              disabled: !R.value,
              "is-auto-id": sn(q),
              "document-options": tn(q),
              "document-hint": At(q),
              "upload-image": re,
              "onUpdate:modelValue": (B) => An(q, B),
              "onUpdate:file": (B) => Et(q.key, B),
              onRemoveImage: (B) => Tn(q.key)
            }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
          ]))), 128)),
          P.value.storageType === "document" && z.value ? (I(), F("p", Ob, " Editando registro: " + X(k.value), 1)) : te("", !0),
          v("div", Rb, [
            v("button", {
              type: "submit",
              disabled: b.value || !R.value,
              class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            }, X(b.value ? "Guardando..." : z.value ? "Guardar cambios" : "Crear documento"), 9, $b),
            P.value.storageType === "document" && z.value ? (I(), F("button", {
              key: 0,
              type: "button",
              disabled: b.value || !R.value,
              class: "rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
              onClick: T
            }, " Cancelar edición ", 8, Db)) : te("", !0)
          ])
        ], 32)) : te("", !0),
        v("div", Bb, [
          v("div", Fb, [
            g[3] || (g[3] = v("h4", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Registros guardados", -1)),
            P.value?.storageType === "dictionary" ? (I(), F("button", {
              key: 0,
              type: "button",
              disabled: !R.value || b.value,
              class: "rounded-md bg-slate-900 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400",
              onClick: j
            }, " + Nuevo ", 8, Mb)) : te("", !0)
          ]),
          p.value ? (I(), F("p", Pb, "Cargando registros...")) : d.value.length ? (I(), F("ul", Ub, [
            (I(!0), F(Re, null, $e(d.value, (q) => (I(), F("li", {
              key: q.id,
              class: Je([
                "flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2",
                P.value?.storageType === "document" && k.value === q.id ? "border-sky-300 bg-sky-50" : ""
              ])
            }, [
              v("div", null, [
                v("p", Vb, X(P.value ? Nt(q, P.value) : q.id), 1),
                v("p", zb, "ID: " + X(q.id), 1)
              ]),
              P.value?.storageType === "document" ? (I(), F("div", Hb, [
                v("button", {
                  type: "button",
                  disabled: !R.value || b.value,
                  class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => C(q)
                }, X(k.value === q.id ? "Editando" : "Editar"), 9, Kb),
                v("button", {
                  type: "button",
                  disabled: !R.value,
                  class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => ye(q.id)
                }, " Eliminar ", 8, Gb)
              ])) : te("", !0)
            ], 2))), 128))
          ])) : (I(), F("p", jb, "No hay registros todavía."))
        ]),
        P.value?.storageType === "dictionary" && L.value ? (I(), F("div", {
          key: 4,
          class: "fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4",
          onClick: ar(D, ["self"])
        }, [
          v("article", Wb, [
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
              onSubmit: ar(N, ["prevent"])
            }, [
              (I(!0), F(Re, null, $e(we(P.value), (q) => (I(), F("div", {
                key: q.key,
                class: "space-y-1"
              }, [
                v("label", Zb, X(q.label), 1),
                q.helpText ? (I(), F("p", Yb, X(q.helpText), 1)) : te("", !0),
                ut(ho, {
                  field: q,
                  "model-value": en(q),
                  disabled: !R.value,
                  "is-auto-id": sn(q),
                  "document-options": tn(q),
                  "document-hint": At(q),
                  "upload-image": re,
                  "onUpdate:modelValue": (B) => An(q, B),
                  "onUpdate:file": (B) => Et(q.key, B),
                  onRemoveImage: (B) => Tn(q.key)
                }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
              ]))), 128)),
              w.value ? (I(), F("p", Xb, X(w.value), 1)) : te("", !0),
              v("div", Qb, [
                v("button", {
                  type: "submit",
                  disabled: b.value || !R.value,
                  class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                }, X(b.value ? "Guardando..." : "Guardar diccionario"), 9, Jb),
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
}), t1 = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3" }, n1 = { class: "mb-3 flex items-start justify-between gap-2" }, r1 = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide text-slate-600"
}, s1 = ["disabled"], i1 = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, a1 = { class: "space-y-1" }, o1 = ["value", "disabled"], l1 = { class: "space-y-1" }, u1 = ["value", "disabled"], c1 = { class: "mt-2 grid gap-2 md:grid-cols-4" }, d1 = { class: "space-y-1" }, h1 = ["value", "disabled"], f1 = ["value"], p1 = { class: "space-y-1" }, m1 = ["value", "disabled"], g1 = { class: "space-y-1" }, b1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, y1 = ["checked", "disabled"], v1 = { class: "space-y-1" }, x1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, w1 = ["checked", "disabled"], A1 = { class: "mt-2 block space-y-1" }, E1 = ["value", "disabled"], N1 = {
  key: 1,
  class: "mt-2 block space-y-1"
}, T1 = ["value", "disabled"], S1 = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, C1 = { class: "space-y-1" }, k1 = ["value", "disabled"], _1 = { class: "space-y-1" }, L1 = ["value", "disabled"], q1 = {
  key: 3,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, I1 = { class: "mb-2 flex items-center justify-between" }, O1 = ["disabled"], R1 = { class: "space-y-2" }, $1 = {
  key: 4,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, D1 = /* @__PURE__ */ Te({
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
      const T = h(r.modelValue);
      if (r.withIdentity) {
        const N = w(r.modelValue);
        T.key = N.key, T.label = N.label;
      }
      return T;
    }
    function k(T, N) {
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
      if (U.type === "map" && (V.mapFields = (U.mapFields ?? []).map((J) => w(J))), U.type === "array" && (V.itemSchema = k(U.itemSchema ?? p(), !1)), N) {
        const J = w(T);
        V.key = J.key, V.label = J.label;
      }
      return V;
    }
    function L(T) {
      s("update:modelValue", k(T, r.withIdentity));
    }
    function R(T, N) {
      const U = E();
      U[T] = N, L(U);
    }
    function P(T) {
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
    function S() {
      const T = E();
      return T.type !== "map" || !Array.isArray(T.mapFields) ? [] : T.mapFields.map((N) => w(N));
    }
    function _() {
      const T = E();
      T.type = "map", T.mapFields = [...S(), b()], L(T);
    }
    function f(T, N) {
      const U = E(), V = S();
      V[T] = w(N), U.mapFields = V, L(U);
    }
    function A(T) {
      const N = E(), U = S();
      U.splice(T, 1), N.mapFields = U, L(N);
    }
    function C() {
      const T = E();
      return T.type !== "array" ? p() : h(T.itemSchema ?? p());
    }
    function j(T) {
      const N = E();
      N.type = "array", N.itemSchema = h(T), L(N);
    }
    function D() {
      s("remove");
    }
    return (T, N) => {
      const U = wo("CmsSchemaFieldEditor", !0);
      return I(), F("article", t1, [
        v("div", n1, [
          n.title ? (I(), F("p", r1, X(n.title), 1)) : te("", !0),
          n.canRemove ? (I(), F("button", {
            key: 1,
            type: "button",
            disabled: n.disabled,
            class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60",
            onClick: D
          }, " Quitar ", 8, s1)) : te("", !0)
        ]),
        n.withIdentity ? (I(), F("div", i1, [
          v("label", a1, [
            N[10] || (N[10] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Key", -1)),
            v("input", {
              value: E().key || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[0] || (N[0] = (V) => R("key", V.target.value))
            }, null, 40, o1)
          ]),
          v("label", l1, [
            N[11] || (N[11] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Label", -1)),
            v("input", {
              value: E().label || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[1] || (N[1] = (V) => R("label", V.target.value))
            }, null, 40, u1)
          ])
        ])) : te("", !0),
        v("div", c1, [
          v("label", d1, [
            N[12] || (N[12] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo", -1)),
            v("select", {
              value: E().type,
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: N[2] || (N[2] = (V) => P(V.target.value))
            }, [
              (I(), F(Re, null, $e(t, (V) => v("option", {
                key: V.value,
                value: V.value
              }, X(V.label), 9, f1)), 64))
            ], 40, h1)
          ]),
          v("label", p1, [
            N[13] || (N[13] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Placeholder", -1)),
            v("input", {
              value: E().placeholder || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[3] || (N[3] = (V) => K(V.target.value))
            }, null, 40, m1)
          ]),
          v("label", g1, [
            N[15] || (N[15] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Requerido", -1)),
            v("span", b1, [
              v("input", {
                checked: !!E().required,
                type: "checkbox",
                disabled: n.disabled,
                onChange: N[4] || (N[4] = (V) => z(V.target.checked))
              }, null, 40, y1),
              N[14] || (N[14] = v("span", { class: "ml-2" }, "Sí", -1))
            ])
          ]),
          v("label", v1, [
            N[17] || (N[17] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Autogenerado", -1)),
            v("span", x1, [
              v("input", {
                checked: !!E().autogenerated,
                type: "checkbox",
                disabled: n.disabled || E().type === "id",
                onChange: N[5] || (N[5] = (V) => Q(V.target.checked))
              }, null, 40, w1),
              N[16] || (N[16] = v("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        v("label", A1, [
          N[18] || (N[18] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Help text", -1)),
          v("input", {
            value: E().helpText || "",
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: N[6] || (N[6] = (V) => ae(V.target.value))
          }, null, 40, E1)
        ]),
        E().type === "select" ? (I(), F("label", N1, [
          N[19] || (N[19] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Opciones (separadas por coma)", -1)),
          v("input", {
            value: ie(),
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: N[7] || (N[7] = (V) => be(V.target.value))
          }, null, 40, T1)
        ])) : te("", !0),
        E().type === "document" ? (I(), F("div", S1, [
          v("label", C1, [
            N[20] || (N[20] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Schema destino", -1)),
            v("input", {
              value: Ae(),
              type: "text",
              disabled: n.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[8] || (N[8] = (V) => y(V.target.value))
            }, null, 40, k1)
          ]),
          v("label", _1, [
            N[21] || (N[21] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Campo etiqueta", -1)),
            v("input", {
              value: we(),
              type: "text",
              disabled: n.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[9] || (N[9] = (V) => M(V.target.value))
            }, null, 40, L1)
          ])
        ])) : te("", !0),
        E().type === "map" ? (I(), F("div", q1, [
          v("div", I1, [
            N[22] || (N[22] = v("p", { class: "text-xs font-bold uppercase tracking-wide text-slate-600" }, "Map fields", -1)),
            v("button", {
              type: "button",
              disabled: n.disabled,
              class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60",
              onClick: _
            }, " Agregar campo ", 8, O1)
          ]),
          v("div", R1, [
            (I(!0), F(Re, null, $e(S(), (V, J) => (I(), _e(U, {
              key: `map-field-${J}`,
              "model-value": V,
              disabled: n.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (Z) => f(J, Z),
              onRemove: (Z) => A(J)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : te("", !0),
        E().type === "array" ? (I(), F("div", $1, [
          N[23] || (N[23] = v("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-600" }, "Item schema", -1)),
          ut(U, {
            "model-value": C(),
            "with-identity": !1,
            disabled: n.disabled,
            title: "Estructura del ítem",
            "onUpdate:modelValue": j
          }, null, 8, ["model-value", "disabled"])
        ])) : te("", !0)
      ]);
    };
  }
}), B1 = { class: "space-y-4" }, F1 = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, M1 = {
  key: 1,
  class: "text-sm text-slate-500"
}, P1 = {
  key: 2,
  class: "text-sm text-slate-500"
}, j1 = {
  key: 3,
  class: "rounded-2xl border border-slate-200 bg-white p-5"
}, U1 = { class: "flex flex-wrap items-center justify-between gap-3" }, V1 = { class: "text-lg font-black text-slate-900" }, z1 = { class: "text-xs text-slate-500" }, H1 = ["disabled"], K1 = { class: "mt-4 grid gap-3 md:grid-cols-2" }, G1 = { class: "space-y-1" }, W1 = ["value"], Z1 = { class: "space-y-1" }, Y1 = ["value"], X1 = { class: "space-y-1 md:col-span-2" }, Q1 = ["value"], J1 = { class: "space-y-1" }, ey = ["value"], ty = { class: "space-y-1" }, ny = ["value"], ry = { class: "space-y-1" }, sy = ["value"], iy = { class: "space-y-1" }, ay = ["value"], oy = {
  key: 0,
  class: "space-y-1"
}, ly = ["value"], uy = {
  key: 1,
  class: "space-y-1"
}, cy = ["value"], dy = { class: "mt-5 border-t border-slate-200 pt-4" }, hy = { class: "space-y-3" }, fy = {
  key: 0,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, py = {
  key: 1,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, my = /* @__PURE__ */ Te({
  __name: "AdminSchemasPage",
  setup(n) {
    const e = as(), t = vr(), r = ee([]), s = ee(""), i = ee(!1), o = ee(!1), l = ee(null), u = ee(!1), d = ee(""), p = ee(""), b = ee(""), h = Oe(() => r.value.find((f) => f.id === s.value) ?? null);
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
        r.value = f, E(f), s.value ? await k(s.value) : l.value || (u.value = !0, l.value = K());
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
      if (A && f.some((C) => C.id === A)) {
        s.value = A;
        return;
      }
      f.some((C) => C.id === s.value) || (s.value = f[0].id);
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
    function P(f) {
      const A = {
        type: f.type,
        autogenerated: !!f.autogenerated,
        required: !!f.required,
        placeholder: f.placeholder ?? "",
        helpText: f.helpText ?? "",
        options: Array.isArray(f.options) ? [...f.options] : []
      };
      return f.type === "map" && (A.mapFields = Array.isArray(f.mapFields) ? f.mapFields.map((C) => z(C)) : []), f.type === "array" && (A.itemSchema = f.itemSchema ? P(f.itemSchema) : L()), A;
    }
    function z(f) {
      return {
        ...P(f),
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
        const C = Array.isArray(f.mapFields) ? f.mapFields : [];
        for (let j = 0; j < C.length; j += 1)
          S(C[j], `${A}.mapFields[${j}]`);
      }
      f.type === "array" && f.itemSchema && M(f.itemSchema, `${A}.itemSchema`);
    }
    function S(f, A) {
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
            S(A[D], `fields[${D}]`);
          const C = {
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
          await Au(C), await w(), s.value = C.id, u.value = !1, await k(C.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const j = r.value.find((D) => D.id === s.value);
          l.value = Q(j || C), b.value = "Esquema actualizado.";
        } catch (f) {
          p.value = f instanceof Error ? f.message : "No se pudo guardar el esquema.";
        } finally {
          o.value = !1;
        }
      }
    }
    return (f, A) => (I(), F("section", B1, [
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
      d.value ? (I(), F("p", F1, X(d.value), 1)) : te("", !0),
      i.value ? (I(), F("p", M1, "Cargando esquemas...")) : l.value ? (I(), F("article", j1, [
        v("div", U1, [
          v("div", null, [
            v("h4", V1, X(l.value.title || h.value?.title || "Nuevo esquema"), 1),
            v("p", z1, [
              A[10] || (A[10] = Ye(" ID: ", -1)),
              v("code", null, X(h.value?.id || "nuevo"), 1)
            ])
          ]),
          v("button", {
            type: "button",
            disabled: o.value,
            class: "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400",
            onClick: _
          }, X(o.value ? "Guardando..." : "Guardar cambios"), 9, H1)
        ]),
        v("div", K1, [
          v("label", G1, [
            A[11] || (A[11] = v("span", { class: "text-xs font-semibold text-slate-700" }, "ID", -1)),
            v("input", {
              value: l.value.id,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[0] || (A[0] = (C) => ie("id", C.target.value))
            }, null, 40, W1)
          ]),
          v("label", Z1, [
            A[12] || (A[12] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Título", -1)),
            v("input", {
              value: l.value.title,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[1] || (A[1] = (C) => ie("title", C.target.value))
            }, null, 40, Y1)
          ]),
          v("label", X1, [
            A[13] || (A[13] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Descripción", -1)),
            v("input", {
              value: l.value.description,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[2] || (A[2] = (C) => ie("description", C.target.value))
            }, null, 40, Q1)
          ]),
          v("label", J1, [
            A[15] || (A[15] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo de almacenamiento", -1)),
            v("select", {
              value: l.value.storageType,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onChange: A[3] || (A[3] = (C) => be(C.target.value))
            }, [...A[14] || (A[14] = [
              v("option", { value: "document" }, "document", -1),
              v("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, ey)
          ]),
          v("label", ty, [
            A[16] || (A[16] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Colección", -1)),
            v("input", {
              value: l.value.collectionName,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[4] || (A[4] = (C) => ie("collectionName", C.target.value))
            }, null, 40, ny)
          ]),
          v("label", ry, [
            A[17] || (A[17] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Slug desde campo", -1)),
            v("input", {
              value: l.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[5] || (A[5] = (C) => ie("slugFromField", C.target.value))
            }, null, 40, sy)
          ]),
          v("label", iy, [
            A[18] || (A[18] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Campo de preview", -1)),
            v("input", {
              value: l.value.previewField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[6] || (A[6] = (C) => ie("previewField", C.target.value))
            }, null, 40, ay)
          ]),
          l.value.storageType === "dictionary" ? (I(), F("label", oy, [
            A[19] || (A[19] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary document ID", -1)),
            v("input", {
              value: l.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[7] || (A[7] = (C) => ie("dictionaryDocumentId", C.target.value))
            }, null, 40, ly)
          ])) : te("", !0),
          l.value.storageType === "dictionary" ? (I(), F("label", uy, [
            A[20] || (A[20] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary root key", -1)),
            v("input", {
              value: l.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: A[8] || (A[8] = (C) => ie("dictionaryRootKey", C.target.value))
            }, null, 40, cy)
          ])) : te("", !0)
        ]),
        v("div", dy, [
          v("div", { class: "mb-3 flex items-center justify-between" }, [
            A[21] || (A[21] = v("h5", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Campos", -1)),
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: Ae
            }, " Agregar campo ")
          ]),
          v("div", hy, [
            (I(!0), F(Re, null, $e(l.value.fields, (C, j) => (I(), _e(D1, {
              key: `schema-field-${j}`,
              "model-value": C,
              "can-remove": !0,
              title: `Campo ${j + 1}`,
              "onUpdate:modelValue": (D) => we(j, D),
              onRemove: (D) => y(j)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        p.value ? (I(), F("p", fy, X(p.value), 1)) : te("", !0),
        b.value ? (I(), F("p", py, X(b.value), 1)) : te("", !0)
      ])) : (I(), F("p", P1, "No hay esquema seleccionado."))
    ]));
  }
}), gy = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, by = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, yy = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, vy = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, xy = {
  key: 3,
  class: "mt-4 text-sm text-slate-500"
}, wy = {
  key: 4,
  class: "mt-4 text-sm text-slate-500"
}, Ay = {
  key: 5,
  class: "mt-4 space-y-3"
}, Ey = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, Ny = { class: "text-sm font-semibold text-slate-900" }, Ty = { class: "text-xs text-slate-500" }, Sy = { class: "text-xs text-slate-500" }, Cy = { class: "text-xs text-slate-500" }, ky = { class: "flex flex-wrap gap-3" }, _y = ["checked", "disabled", "onChange"], Ly = /* @__PURE__ */ Te({
  __name: "AdminUsersPage",
  setup(n) {
    const e = ee([]), t = ee(!1), r = ee(""), s = ee(""), i = ee(null), o = Oe(() => Dn.value === "admin"), l = [
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
        e.value = await nu();
      } catch {
        r.value = "No se pudieron cargar los usuarios.";
      } finally {
        t.value = !1;
      }
    }
    async function d(w, E) {
      if (s.value = "", r.value = "", !o.value) {
        r.value = "Solo un admin puede cambiar roles.";
        return;
      }
      const k = w.role === E ? null : E;
      i.value = w.id;
      try {
        await ru(w.id, k), w.role = k, s.value = "Rol actualizado correctamente.";
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
    return (w, E) => (I(), F("section", gy, [
      v("div", { class: "flex items-center justify-between" }, [
        E[0] || (E[0] = v("h3", { class: "text-xl font-black text-slate-900" }, "Usuarios", -1)),
        v("button", {
          type: "button",
          class: "rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
          onClick: u
        }, " Recargar ")
      ]),
      E[1] || (E[1] = v("p", { class: "mt-1 text-sm text-slate-600" }, "Listado de usuarios con último login y control de rol.", -1)),
      o.value ? te("", !0) : (I(), F("p", by, " Solo usuarios con rol admin pueden editar roles. ")),
      r.value ? (I(), F("p", yy, X(r.value), 1)) : te("", !0),
      s.value ? (I(), F("p", vy, X(s.value), 1)) : te("", !0),
      t.value ? (I(), F("p", xy, "Cargando usuarios...")) : e.value.length === 0 ? (I(), F("p", wy, "No hay usuarios registrados.")) : (I(), F("div", Ay, [
        (I(!0), F(Re, null, $e(e.value, (k) => (I(), F("article", {
          key: k.id,
          class: "rounded-lg border border-slate-200 p-4"
        }, [
          v("div", Ey, [
            v("div", null, [
              v("p", Ny, X(k.email || k.id), 1),
              v("p", Ty, "UID: " + X(k.id), 1),
              v("p", Sy, "Último login: " + X(h(k.lastLoginAt)), 1),
              v("p", Cy, "Rol actual: " + X(b(k.role)), 1)
            ]),
            v("div", ky, [
              (I(), F(Re, null, $e(l, (L) => v("label", {
                key: L.label,
                class: "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
              }, [
                v("input", {
                  type: "checkbox",
                  checked: p(k.role, L.value),
                  disabled: !o.value || i.value === k.id,
                  onChange: (R) => d(k, L.value)
                }, null, 40, _y),
                Ye(" " + X(L.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), bo = /* @__PURE__ */ new WeakSet();
function zy(n, e) {
  if (bo.has(n))
    return;
  const t = Pn(e.basePath ?? "/admin"), r = Pn(e.loginPath ?? "/ingresar"), s = Pn(e.registerPath ?? "/registro"), i = Iy(e.homePath ?? "/");
  Jl(e.firebase), cu({ basePath: t, loginPath: r, registerPath: s, homePath: i }), iu();
  const o = qy(t, r, s);
  for (const l of o)
    n.addRoute(l);
  n.beforeEach(async (l) => (await au(), l.meta.cmsRequiresAuth && !dr.value ? {
    path: r,
    query: { redirect: l.fullPath }
  } : (l.path === r || l.path === s || l.meta.cmsGuestOnly) && dr.value ? { path: t } : !0)), bo.add(n);
}
function qy(n = "/admin", e = "/ingresar", t = "/registro") {
  const r = Pn(n), s = Pn(e), i = Pn(t);
  return [
    { path: s, component: mu, meta: { cmsGuestOnly: !0 } },
    { path: i, component: xu, meta: { cmsGuestOnly: !0 } },
    {
      path: r,
      component: rc,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${r}/content` },
        { path: "content", component: e1, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: my, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: Ly, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function Pn(n) {
  const e = String(n || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function Iy(n) {
  const e = String(n || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
export {
  fb as actualizarRegistroDocumento,
  uu as cerrarSesion,
  db as crearRegistroDocumento,
  qy as createCmsRoutes,
  hb as eliminarRegistroDocumento,
  mb as guardarRegistroDiccionario,
  Au as guardarSchemaContenido,
  mo as listarRegistrosDocumento,
  Di as listarSchemasContenido,
  gb as obtenerRegistroDiccionario,
  zy as registerPifWarriorsCms,
  Dn as rolActual,
  dr as usuarioActual
};
