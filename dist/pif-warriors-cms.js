import { signOut as Fl, onAuthStateChanged as Pl, setPersistence as ma, browserLocalPersistence as ga, signInWithEmailAndPassword as jl, createUserWithEmailAndPassword as Ul } from "firebase/auth";
import { ref as ee, defineComponent as Ot, openBlock as B, createElementBlock as F, createElementVNode as w, withModifiers as qi, withDirectives as on, vModelText as an, toDisplayString as Q, createCommentVNode as se, createTextVNode as We, createVNode as Ct, unref as Be, withCtx as Ft, onMounted as bn, onBeforeUnmount as ba, watch as nr, computed as qe, normalizeClass as rt, Fragment as Fe, renderList as Pe, createBlock as rr, resolveComponent as ya } from "vue";
import { query as Oi, collection as sr, orderBy as Ii, getDocs as Ir, updateDoc as va, doc as Kt, serverTimestamp as Ge, getDoc as ss, setDoc as Yn, addDoc as zl, deleteDoc as Hl, limit as xa } from "firebase/firestore";
import { useRoute as is, useRouter as yn, RouterLink as Pt, RouterView as Vl } from "vue-router";
import { ref as Kl, uploadBytes as Gl, getDownloadURL as Wl } from "firebase/storage";
let hi = null;
function Zl(n) {
  hi = n;
}
function Se() {
  if (!hi)
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  return hi;
}
const os = "users";
async function Yl(n) {
  const { firestore: e } = Se(), t = Kt(e, os, n.uid);
  if (!(await ss(t)).exists()) {
    await Yn(t, {
      email: n.email ?? "",
      role: null,
      lastLoginAt: Ge(),
      createdAt: Ge(),
      updatedAt: Ge()
    });
    return;
  }
  await Yn(
    t,
    {
      email: n.email ?? "",
      lastLoginAt: Ge(),
      updatedAt: Ge()
    },
    { merge: !0 }
  );
}
async function Xl(n) {
  const { firestore: e } = Se(), t = await ss(Kt(e, os, n));
  return t.exists() ? wa(t.data().role) : null;
}
async function Ql() {
  const { firestore: n } = Se(), e = Oi(sr(n, os), Ii("email", "asc"));
  return (await Ir(e)).docs.map((r) => ({
    id: r.id,
    email: String(r.data().email ?? ""),
    role: wa(r.data().role),
    lastLoginAt: r.data().lastLoginAt,
    createdAt: r.data().createdAt,
    updatedAt: r.data().updatedAt
  }));
}
async function Jl(n, e) {
  const { firestore: t } = Se();
  await va(Kt(t, os, n), {
    role: e,
    updatedAt: Ge()
  });
}
function wa(n) {
  return n === "admin" || n === "writer" || n === "manager" ? n : null;
}
const un = ee(null), Aa = ee(!1), kr = ee(null);
let Gn = null, ec = new Promise((n) => {
  Gn = n;
}), io = !1;
function tc() {
  if (io)
    return;
  const { auth: n } = Se();
  un.value = n.currentUser, Pl(n, async (e) => {
    un.value = e, kr.value = null, e && await Ri(e), Aa.value = !0, Gn && (Gn(), Gn = null);
  }), io = !0;
}
async function rc() {
  Aa.value || await ec;
}
async function nc(n, e) {
  const { auth: t } = Se();
  await ma(t, ga);
  const r = await Ul(t, n, e);
  await Ri(r.user);
}
async function sc(n, e) {
  const { auth: t } = Se();
  await ma(t, ga);
  const r = await jl(t, n, e);
  await Ri(r.user);
}
async function ic() {
  const { auth: n } = Se();
  await Fl(n);
}
async function Ri(n) {
  try {
    await Yl(n), kr.value = await Xl(n.uid);
  } catch (e) {
    console.error("No se pudo sincronizar el perfil del usuario:", e);
  }
}
let fi = {
  basePath: "/admin",
  loginPath: "/ingresar",
  registerPath: "/registro",
  homePath: "/"
};
function oc(n) {
  fi = {
    ...fi,
    ...n
  };
}
function $i() {
  return fi;
}
const ac = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, lc = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, cc = ["disabled"], uc = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, dc = /* @__PURE__ */ Ot({
  __name: "LoginPage",
  setup(n) {
    const e = is(), t = yn(), { basePath: r, registerPath: s } = $i(), i = ee(""), a = ee(""), l = ee(!1), c = ee("");
    async function d() {
      c.value = "", l.value = !0;
      try {
        await sc(i.value, a.value);
        const x = typeof e.query.redirect == "string" ? e.query.redirect : r;
        await t.push(x);
      } catch {
        c.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (x, g) => (B(), F("main", ac, [
      g[6] || (g[6] = w("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Ingresar", -1)),
      g[7] || (g[7] = w("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Accede para administrar contenido y esquemas.", -1)),
      w("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        w("div", null, [
          g[2] || (g[2] = w("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          on(w("input", {
            "onUpdate:modelValue": g[0] || (g[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [an, i.value]
          ])
        ]),
        w("div", null, [
          g[3] || (g[3] = w("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          on(w("input", {
            "onUpdate:modelValue": g[1] || (g[1] = (h) => a.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "********"
          }, null, 512), [
            [an, a.value]
          ])
        ]),
        c.value ? (B(), F("p", lc, Q(c.value), 1)) : se("", !0),
        w("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, Q(l.value ? "Ingresando..." : "Entrar"), 9, cc)
      ], 32),
      w("p", uc, [
        g[5] || (g[5] = We(" ¿No tienes cuenta? ", -1)),
        Ct(Be(Pt), {
          to: Be(s),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Ft(() => [...g[4] || (g[4] = [
            We("Crear cuenta", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), hc = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, fc = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, pc = ["disabled"], mc = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, gc = /* @__PURE__ */ Ot({
  __name: "RegisterPage",
  setup(n) {
    const e = yn(), { basePath: t, loginPath: r } = $i(), s = ee(""), i = ee(""), a = ee(""), l = ee(!1), c = ee("");
    async function d() {
      if (c.value = "", i.value !== a.value) {
        c.value = "Las contraseñas no coinciden.";
        return;
      }
      l.value = !0;
      try {
        await nc(s.value, i.value), await e.push(t);
      } catch {
        c.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (x, g) => (B(), F("main", hc, [
      g[8] || (g[8] = w("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Crear cuenta", -1)),
      g[9] || (g[9] = w("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Registro para administrar contenido.", -1)),
      w("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        w("div", null, [
          g[3] || (g[3] = w("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          on(w("input", {
            "onUpdate:modelValue": g[0] || (g[0] = (h) => s.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [an, s.value]
          ])
        ]),
        w("div", null, [
          g[4] || (g[4] = w("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          on(w("input", {
            "onUpdate:modelValue": g[1] || (g[1] = (h) => i.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Mínimo 6 caracteres"
          }, null, 512), [
            [an, i.value]
          ])
        ]),
        w("div", null, [
          g[5] || (g[5] = w("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Confirmar contraseña", -1)),
          on(w("input", {
            "onUpdate:modelValue": g[2] || (g[2] = (h) => a.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [an, a.value]
          ])
        ]),
        c.value ? (B(), F("p", fc, Q(c.value), 1)) : se("", !0),
        w("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, Q(l.value ? "Creando cuenta..." : "Registrarme"), 9, pc)
      ], 32),
      w("p", mc, [
        g[7] || (g[7] = We(" ¿Ya tienes cuenta? ", -1)),
        Ct(Be(Pt), {
          to: Be(r),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Ft(() => [...g[6] || (g[6] = [
            We("Iniciar sesión", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), Ea = "cmsSchemas", Na = "schema", Ta = "main", bc = 3e4;
let Wn = null, pi = 0, Jr = null;
async function Di() {
  const n = Date.now();
  if (Wn && n - pi < bc)
    return Wn;
  if (Jr)
    return Jr;
  const { firestore: e } = Se();
  Jr = (async () => {
    const r = (await Ir(sr(e, Ea))).docs.map((s) => {
      const i = s.data();
      return _a({ ...i, id: s.id });
    }).sort((s, i) => s.title.localeCompare(i.title, "es"));
    return Wn = r, pi = Date.now(), r;
  })();
  try {
    return await Jr;
  } finally {
    Jr = null;
  }
}
async function yc(n) {
  const { firestore: e } = Se(), t = _a(n), r = Kt(e, Ea, t.id);
  await Yn(
    r,
    {
      ...t,
      updatedAt: Ge(),
      createdAt: Ge()
    },
    { merge: !0 }
  ), vc();
}
function vc() {
  Wn = null, pi = 0;
}
function _a(n) {
  const e = n;
  let t = [];
  const r = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((c) => Xn(c)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([c, d]) => Xn({ key: c, ...d })
  ));
  const s = typeof e.dictionaryDocumentId == "string" ? e.dictionaryDocumentId : "", i = typeof e.dictionaryRootKey == "string" ? e.dictionaryRootKey : "", a = r === "dictionary" ? Ac(s || Ta) : "", l = r === "dictionary" ? Ec(i || Na) : "";
  return {
    id: xc(String(e.id ?? "tipo-contenido")),
    title: String(e.title ?? "Tipo de contenido"),
    description: typeof e.description == "string" ? e.description : "",
    storageType: r,
    collectionName: wc(String(e.collectionName ?? "registros")),
    dictionaryDocumentId: a,
    dictionaryRootKey: l,
    slugFromField: typeof e.slugFromField == "string" ? e.slugFromField : "",
    previewField: typeof e.previewField == "string" ? e.previewField : "",
    fields: t
  };
}
function Xn(n) {
  const e = ka(n.type), t = {
    key: Bi(String(n.key ?? "campo")),
    label: String(n.label ?? "Campo"),
    type: e,
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: Ca(n.options),
    documentSchemaId: e === "document" ? qa(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Oa(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Sa(
    La(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Xn(r)) : [] : delete t.mapFields, t;
}
function Sa(n) {
  const e = ka(n.type), t = {
    type: e,
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: Ca(n.options),
    documentSchemaId: e === "document" ? qa(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Oa(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Sa(
    La(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Xn(r)) : [] : delete t.mapFields, t;
}
function ka(n) {
  return n === "date" || n === "numeric" || n === "id" || n === "textarea" || n === "richtext" || n === "image" || n === "select" || n === "document" || n === "boolean" || n === "array" || n === "map" ? n : "text";
}
function Ca(n) {
  return Array.isArray(n) ? n.map((e) => String(e).trim()).filter(Boolean) : [];
}
function La(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function Bi(n) {
  return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function xc(n) {
  return n.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function wc(n) {
  return Bi(n);
}
function Ac(n) {
  return String(n).trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || Ta;
}
function Ec(n) {
  return String(n).trim().replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "") || Na;
}
function qa(n) {
  return String(n).trim().replace(/[^a-zA-Z0-9_-]/g, "").replace(/-+/g, "-");
}
function Oa(n) {
  const e = String(n ?? "").trim();
  return e ? Bi(e) : "";
}
const Nc = { class: "cms-root-fixed-height overflow-hidden bg-slate-100" }, Tc = { class: "cms-sidebar-header mb-3 flex items-center justify-between lg:mb-0" }, _c = { class: "text-sm font-black uppercase tracking-wide text-slate-700" }, Sc = { class: "cms-sidebar-scroll space-y-2" }, kc = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Cc = { class: "flex items-start justify-between gap-2" }, Lc = { class: "material-symbols-outlined text-base leading-none" }, qc = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Oc = { class: "font-semibold" }, Ic = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Rc = {
  key: 1,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, $c = {
  key: 0,
  class: "space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3"
}, Dc = { class: "font-semibold" }, Bc = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Mc = { class: "flex items-start justify-between gap-2" }, Fc = { class: "material-symbols-outlined text-base leading-none" }, Pc = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, jc = { class: "font-semibold" }, Uc = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, zc = { class: "cms-sidebar-footer" }, Hc = { class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2" }, Vc = {
  type: "button",
  class: "min-w-0 flex-1 rounded-md bg-white px-3 py-2 text-left text-xs text-slate-700"
}, Kc = { class: "truncate text-slate-600" }, Gc = { class: "mx-auto w-full max-w-7xl space-y-6" }, Wc = { class: "text-xl font-black text-slate-900" }, Zc = { class: "mt-3" }, Yc = /* @__PURE__ */ Ot({
  __name: "AdminLayoutPage",
  setup(n) {
    const e = is(), t = yn(), { basePath: r, loginPath: s, homePath: i } = $i(), a = ee([]), l = ee(!1), c = ee(!0), d = ee(!0), x = ee(!0);
    bn(async () => {
      await g(), typeof window < "u" && window.innerWidth < 1024 && (x.value = !1), window.addEventListener("cms-schemas-updated", I);
    }), ba(() => {
      window.removeEventListener("cms-schemas-updated", I);
    }), nr(
      () => e.fullPath,
      () => {
        e.path.startsWith(`${r}/content`) && (c.value = !0, g()), e.path.startsWith(`${r}/schemas`) && (d.value = !0, g()), typeof window < "u" && window.innerWidth < 1024 && (x.value = !1);
      }
    );
    async function g() {
      l.value = !0;
      try {
        a.value = await Di();
      } finally {
        l.value = !1;
      }
    }
    const h = qe(() => e.path.startsWith(`${r}/content`)), m = qe(() => e.path.startsWith(`${r}/schemas`)), _ = qe(() => a.value.filter((p) => p.storageType === "document")), k = qe(() => a.value.filter((p) => p.storageType === "dictionary"));
    function q(p) {
      return e.path.startsWith(p);
    }
    function I() {
      g();
    }
    function P(p) {
      return {
        path: `${r}/content`,
        query: { schema: p }
      };
    }
    function U(p) {
      return {
        path: `${r}/schemas`,
        query: { schema: p }
      };
    }
    function W(p) {
      if (!h.value)
        return !1;
      const E = typeof e.query.schema == "string" ? e.query.schema : "";
      return E ? E === p : a.value[0]?.id === p;
    }
    function V(p) {
      if (!m.value)
        return !1;
      const E = typeof e.query.schema == "string" ? e.query.schema : "";
      return E ? E === p : a.value[0]?.id === p;
    }
    function ie() {
      c.value = !c.value;
    }
    function re() {
      d.value = !d.value;
    }
    function ge() {
      x.value = !x.value;
    }
    function Ae() {
      x.value = !1;
    }
    function we(p) {
      return /^(https?:)?\/\//i.test(p);
    }
    async function b() {
      if (i) {
        if (we(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await t.push(i);
      }
    }
    async function M() {
      await ic(), await t.push(s);
    }
    const S = qe(() => un.value?.email || "Sin correo"), L = qe(() => {
      try {
        const p = Se().auth.app.options.projectId;
        if (typeof p == "string" && p.trim().length > 0)
          return p;
      } catch {
      }
      return "Panel";
    }), f = qe(() => {
      if (e.path.startsWith(`${r}/content`)) {
        const p = typeof e.query.schema == "string" ? e.query.schema : "", E = a.value.find((N) => N.id === p) ?? a.value[0] ?? null;
        return E ? `Contenido · ${E.title}` : "Contenido";
      }
      return e.path.startsWith(`${r}/schemas`) ? "Esquemas" : e.path.startsWith(`${r}/users`) ? "Usuarios" : "Dashboard";
    });
    return (p, E) => (B(), F("main", Nc, [
      x.value ? se("", !0) : (B(), F("button", {
        key: 0,
        type: "button",
        "aria-label": "Abrir sidebar",
        class: "fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg border border-l-0 border-slate-300 bg-white px-2 py-3 text-slate-700 shadow-lg hover:bg-slate-50",
        onClick: ge
      }, [...E[0] || (E[0] = [
        w("span", { class: "material-symbols-outlined text-lg" }, "left_panel_open", -1)
      ])])),
      x.value ? (B(), F("div", {
        key: 1,
        class: "fixed inset-0 z-30 bg-slate-900/20 lg:hidden",
        onClick: Ae
      })) : se("", !0),
      w("aside", {
        class: rt(["cms-sidebar-panel cms-sidebar-fixed-height fixed inset-y-0 left-0 z-40 w-80 border-r border-slate-200 bg-white shadow-xl transition-transform duration-200", x.value ? "cms-sidebar-open" : "cms-sidebar-closed"])
      }, [
        w("div", Tc, [
          w("h2", _c, Q(L.value), 1),
          w("div", { class: "flex items-center gap-2" }, [
            w("button", {
              type: "button",
              "aria-label": "Ir a inicio",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: b
            }, [...E[1] || (E[1] = [
              w("span", { class: "material-symbols-outlined text-lg" }, "home", -1)
            ])]),
            w("button", {
              type: "button",
              "aria-label": "Cerrar sidebar",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: Ae
            }, [...E[2] || (E[2] = [
              w("span", { class: "material-symbols-outlined text-lg" }, "left_panel_close", -1)
            ])])
          ])
        ]),
        w("div", Sc, [
          w("div", kc, [
            w("div", Cc, [
              Ct(Be(Pt), {
                to: `${Be(r)}/content`,
                class: "min-w-0 flex-1"
              }, {
                default: Ft(() => [...E[3] || (E[3] = [
                  w("p", { class: "text-sm font-black" }, "Contenido", -1),
                  w("p", { class: "text-xs text-slate-500" }, " Formularios y registros ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              w("button", {
                type: "button",
                "aria-label": "Expandir o contraer contenido",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: ie
              }, [
                w("span", Lc, Q(c.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            c.value ? (B(), F("div", qc, [
              (B(!0), F(Fe, null, Pe(k.value, (N) => (B(), rr(Be(Pt), {
                key: N.id,
                to: P(N.id),
                class: rt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  W(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Ft(() => [
                  w("p", Oc, Q(N.title), 1),
                  w("p", {
                    class: rt(W(N.id) ? "text-slate-300" : "text-slate-500")
                  }, Q(N.storageType) + " · " + Q(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (B(), F("p", Ic, " Cargando elementos... ")) : k.value.length ? se("", !0) : (B(), F("p", Rc, " No hay diccionarios configurados. "))
            ])) : se("", !0)
          ]),
          _.value.length ? (B(), F("div", $c, [
            E[4] || (E[4] = w("p", { class: "px-1 text-[11px] font-black uppercase tracking-wide text-slate-500" }, "Documentos", -1)),
            (B(!0), F(Fe, null, Pe(_.value, (N) => (B(), rr(Be(Pt), {
              key: `document-link-${N.id}`,
              to: P(N.id),
              class: rt([
                "block rounded-lg border px-2 py-1.5 text-xs transition",
                W(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              ])
            }, {
              default: Ft(() => [
                w("p", Dc, Q(N.title), 1),
                w("p", {
                  class: rt(W(N.id) ? "text-slate-300" : "text-slate-500")
                }, " document · " + Q(N.collectionName), 3)
              ]),
              _: 2
            }, 1032, ["to", "class"]))), 128))
          ])) : se("", !0),
          w("div", Bc, [
            w("div", Mc, [
              Ct(Be(Pt), {
                to: `${Be(r)}/schemas`,
                class: "min-w-0 flex-1"
              }, {
                default: Ft(() => [...E[5] || (E[5] = [
                  w("p", { class: "text-sm font-black" }, "Esquemas", -1),
                  w("p", { class: "text-xs text-slate-500" }, " Edición de esquemas ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              w("button", {
                type: "button",
                "aria-label": "Expandir o contraer esquemas",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: re
              }, [
                w("span", Fc, Q(d.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            d.value ? (B(), F("div", Pc, [
              (B(!0), F(Fe, null, Pe(a.value, (N) => (B(), rr(Be(Pt), {
                key: `schema-edit-${N.id}`,
                to: U(N.id),
                class: rt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  V(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Ft(() => [
                  w("p", jc, Q(N.title), 1),
                  w("p", {
                    class: rt(V(N.id) ? "text-slate-300" : "text-slate-500")
                  }, Q(N.storageType) + " · " + Q(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (B(), F("p", Uc, " Cargando elementos... ")) : se("", !0)
            ])) : se("", !0)
          ]),
          Ct(Be(Pt), {
            to: `${Be(r)}/users`,
            class: rt([
              "block rounded-xl border p-3 transition",
              q(`${Be(r)}/users`) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            ])
          }, {
            default: Ft(() => [
              E[6] || (E[6] = w("p", { class: "text-sm font-black" }, "Usuarios", -1)),
              w("p", {
                class: rt(["text-xs", q(`${Be(r)}/users`) ? "text-slate-200" : "text-slate-500"])
              }, " Roles y último ingreso ", 2)
            ]),
            _: 1
          }, 8, ["to", "class"])
        ]),
        w("div", zc, [
          w("div", Hc, [
            w("button", Vc, [
              E[7] || (E[7] = w("p", { class: "font-semibold text-slate-900" }, "Cuenta actual", -1)),
              w("p", Kc, Q(S.value), 1)
            ]),
            w("button", {
              type: "button",
              "aria-label": "Cerrar sesión",
              class: "rounded-md border border-slate-300 bg-white px-2 py-2 text-slate-700 hover:bg-slate-100",
              onClick: M
            }, [...E[8] || (E[8] = [
              w("span", { class: "material-symbols-outlined text-lg" }, "logout", -1)
            ])])
          ])
        ])
      ], 2),
      w("section", {
        class: rt(["cms-content-fixed-height min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8", x.value ? "cms-content-with-open-sidebar" : ""])
      }, [
        w("div", Gc, [
          E[9] || (E[9] = w("section", null, [
            w("h1", { class: "text-3xl font-black text-slate-900" }, "Dashboard"),
            w("p", { class: "mt-2 text-sm text-slate-600" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          w("section", null, [
            w("h2", Wc, Q(f.value), 1),
            w("div", Zc, [
              Ct(Be(Vl))
            ])
          ])
        ])
      ], 2)
    ]));
  }
}), Xc = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, s] of e)
    t[r] = s;
  return t;
}, Qc = /* @__PURE__ */ Xc(Yc, [["__scopeId", "data-v-ef22c520"]]);
var Ia = typeof global == "object" && global && global.Object === Object && global, Jc = typeof self == "object" && self && self.Object === Object && self, gt = Ia || Jc || Function("return this")(), Vt = gt.Symbol, Ra = Object.prototype, eu = Ra.hasOwnProperty, tu = Ra.toString, en = Vt ? Vt.toStringTag : void 0;
function ru(n) {
  var e = eu.call(n, en), t = n[en];
  try {
    n[en] = void 0;
    var r = !0;
  } catch {
  }
  var s = tu.call(n);
  return r && (e ? n[en] = t : delete n[en]), s;
}
var nu = Object.prototype, su = nu.toString;
function iu(n) {
  return su.call(n);
}
var ou = "[object Null]", au = "[object Undefined]", oo = Vt ? Vt.toStringTag : void 0;
function Dr(n) {
  return n == null ? n === void 0 ? au : ou : oo && oo in Object(n) ? ru(n) : iu(n);
}
function Lt(n) {
  return n != null && typeof n == "object";
}
var ir = Array.isArray;
function Gt(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
function $a(n) {
  return n;
}
var lu = "[object AsyncFunction]", cu = "[object Function]", uu = "[object GeneratorFunction]", du = "[object Proxy]";
function Mi(n) {
  if (!Gt(n))
    return !1;
  var e = Dr(n);
  return e == cu || e == uu || e == lu || e == du;
}
var Qs = gt["__core-js_shared__"], ao = (function() {
  var n = /[^.]+$/.exec(Qs && Qs.keys && Qs.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function hu(n) {
  return !!ao && ao in n;
}
var fu = Function.prototype, pu = fu.toString;
function cr(n) {
  if (n != null) {
    try {
      return pu.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var mu = /[\\^$.*+?()[\]{}|]/g, gu = /^\[object .+?Constructor\]$/, bu = Function.prototype, yu = Object.prototype, vu = bu.toString, xu = yu.hasOwnProperty, wu = RegExp(
  "^" + vu.call(xu).replace(mu, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Au(n) {
  if (!Gt(n) || hu(n))
    return !1;
  var e = Mi(n) ? wu : gu;
  return e.test(cr(n));
}
function Eu(n, e) {
  return n?.[e];
}
function ur(n, e) {
  var t = Eu(n, e);
  return Au(t) ? t : void 0;
}
var mi = ur(gt, "WeakMap"), lo = Object.create, Nu = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(e) {
    if (!Gt(e))
      return {};
    if (lo)
      return lo(e);
    n.prototype = e;
    var t = new n();
    return n.prototype = void 0, t;
  };
})();
function Tu(n, e, t) {
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
function _u(n, e) {
  var t = -1, r = n.length;
  for (e || (e = Array(r)); ++t < r; )
    e[t] = n[t];
  return e;
}
var Su = 800, ku = 16, Cu = Date.now;
function Lu(n) {
  var e = 0, t = 0;
  return function() {
    var r = Cu(), s = ku - (r - t);
    if (t = r, s > 0) {
      if (++e >= Su)
        return arguments[0];
    } else
      e = 0;
    return n.apply(void 0, arguments);
  };
}
function qu(n) {
  return function() {
    return n;
  };
}
var Qn = (function() {
  try {
    var n = ur(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
})(), Ou = Qn ? function(n, e) {
  return Qn(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: qu(e),
    writable: !0
  });
} : $a, Iu = Lu(Ou);
function Ru(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r && e(n[t], t, n) !== !1; )
    ;
  return n;
}
var $u = 9007199254740991, Du = /^(?:0|[1-9]\d*)$/;
function Da(n, e) {
  var t = typeof n;
  return e = e ?? $u, !!e && (t == "number" || t != "symbol" && Du.test(n)) && n > -1 && n % 1 == 0 && n < e;
}
function Fi(n, e, t) {
  e == "__proto__" && Qn ? Qn(n, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : n[e] = t;
}
function vn(n, e) {
  return n === e || n !== n && e !== e;
}
var Bu = Object.prototype, Mu = Bu.hasOwnProperty;
function Ba(n, e, t) {
  var r = n[e];
  (!(Mu.call(n, e) && vn(r, t)) || t === void 0 && !(e in n)) && Fi(n, e, t);
}
function Fu(n, e, t, r) {
  var s = !t;
  t || (t = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var l = e[i], c = void 0;
    c === void 0 && (c = n[l]), s ? Fi(t, l, c) : Ba(t, l, c);
  }
  return t;
}
var co = Math.max;
function Pu(n, e, t) {
  return e = co(e === void 0 ? n.length - 1 : e, 0), function() {
    for (var r = arguments, s = -1, i = co(r.length - e, 0), a = Array(i); ++s < i; )
      a[s] = r[e + s];
    s = -1;
    for (var l = Array(e + 1); ++s < e; )
      l[s] = r[s];
    return l[e] = t(a), Tu(n, this, l);
  };
}
function ju(n, e) {
  return Iu(Pu(n, e, $a), n + "");
}
var Uu = 9007199254740991;
function Ma(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Uu;
}
function as(n) {
  return n != null && Ma(n.length) && !Mi(n);
}
function zu(n, e, t) {
  if (!Gt(t))
    return !1;
  var r = typeof e;
  return (r == "number" ? as(t) && Da(e, t.length) : r == "string" && e in t) ? vn(t[e], n) : !1;
}
function Hu(n) {
  return ju(function(e, t) {
    var r = -1, s = t.length, i = s > 1 ? t[s - 1] : void 0, a = s > 2 ? t[2] : void 0;
    for (i = n.length > 3 && typeof i == "function" ? (s--, i) : void 0, a && zu(t[0], t[1], a) && (i = s < 3 ? void 0 : i, s = 1), e = Object(e); ++r < s; ) {
      var l = t[r];
      l && n(e, l, r, i);
    }
    return e;
  });
}
var Vu = Object.prototype;
function Pi(n) {
  var e = n && n.constructor, t = typeof e == "function" && e.prototype || Vu;
  return n === t;
}
function Ku(n, e) {
  for (var t = -1, r = Array(n); ++t < n; )
    r[t] = e(t);
  return r;
}
var Gu = "[object Arguments]";
function uo(n) {
  return Lt(n) && Dr(n) == Gu;
}
var Fa = Object.prototype, Wu = Fa.hasOwnProperty, Zu = Fa.propertyIsEnumerable, gi = uo(/* @__PURE__ */ (function() {
  return arguments;
})()) ? uo : function(n) {
  return Lt(n) && Wu.call(n, "callee") && !Zu.call(n, "callee");
};
function Yu() {
  return !1;
}
var Pa = typeof exports == "object" && exports && !exports.nodeType && exports, ho = Pa && typeof module == "object" && module && !module.nodeType && module, Xu = ho && ho.exports === Pa, fo = Xu ? gt.Buffer : void 0, Qu = fo ? fo.isBuffer : void 0, dn = Qu || Yu, Ju = "[object Arguments]", ed = "[object Array]", td = "[object Boolean]", rd = "[object Date]", nd = "[object Error]", sd = "[object Function]", id = "[object Map]", od = "[object Number]", ad = "[object Object]", ld = "[object RegExp]", cd = "[object Set]", ud = "[object String]", dd = "[object WeakMap]", hd = "[object ArrayBuffer]", fd = "[object DataView]", pd = "[object Float32Array]", md = "[object Float64Array]", gd = "[object Int8Array]", bd = "[object Int16Array]", yd = "[object Int32Array]", vd = "[object Uint8Array]", xd = "[object Uint8ClampedArray]", wd = "[object Uint16Array]", Ad = "[object Uint32Array]", xe = {};
xe[pd] = xe[md] = xe[gd] = xe[bd] = xe[yd] = xe[vd] = xe[xd] = xe[wd] = xe[Ad] = !0;
xe[Ju] = xe[ed] = xe[hd] = xe[td] = xe[fd] = xe[rd] = xe[nd] = xe[sd] = xe[id] = xe[od] = xe[ad] = xe[ld] = xe[cd] = xe[ud] = xe[dd] = !1;
function Ed(n) {
  return Lt(n) && Ma(n.length) && !!xe[Dr(n)];
}
function ji(n) {
  return function(e) {
    return n(e);
  };
}
var ja = typeof exports == "object" && exports && !exports.nodeType && exports, ln = ja && typeof module == "object" && module && !module.nodeType && module, Nd = ln && ln.exports === ja, Js = Nd && Ia.process, Rr = (function() {
  try {
    var n = ln && ln.require && ln.require("util").types;
    return n || Js && Js.binding && Js.binding("util");
  } catch {
  }
})(), po = Rr && Rr.isTypedArray, Ui = po ? ji(po) : Ed, Td = Object.prototype, _d = Td.hasOwnProperty;
function Ua(n, e) {
  var t = ir(n), r = !t && gi(n), s = !t && !r && dn(n), i = !t && !r && !s && Ui(n), a = t || r || s || i, l = a ? Ku(n.length, String) : [], c = l.length;
  for (var d in n)
    (e || _d.call(n, d)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Da(d, c))) && l.push(d);
  return l;
}
function za(n, e) {
  return function(t) {
    return n(e(t));
  };
}
var Sd = za(Object.keys, Object), kd = Object.prototype, Cd = kd.hasOwnProperty;
function Ld(n) {
  if (!Pi(n))
    return Sd(n);
  var e = [];
  for (var t in Object(n))
    Cd.call(n, t) && t != "constructor" && e.push(t);
  return e;
}
function qd(n) {
  return as(n) ? Ua(n) : Ld(n);
}
function Od(n) {
  var e = [];
  if (n != null)
    for (var t in Object(n))
      e.push(t);
  return e;
}
var Id = Object.prototype, Rd = Id.hasOwnProperty;
function $d(n) {
  if (!Gt(n))
    return Od(n);
  var e = Pi(n), t = [];
  for (var r in n)
    r == "constructor" && (e || !Rd.call(n, r)) || t.push(r);
  return t;
}
function Ha(n) {
  return as(n) ? Ua(n, !0) : $d(n);
}
var hn = ur(Object, "create");
function Dd() {
  this.__data__ = hn ? hn(null) : {}, this.size = 0;
}
function Bd(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var Md = "__lodash_hash_undefined__", Fd = Object.prototype, Pd = Fd.hasOwnProperty;
function jd(n) {
  var e = this.__data__;
  if (hn) {
    var t = e[n];
    return t === Md ? void 0 : t;
  }
  return Pd.call(e, n) ? e[n] : void 0;
}
var Ud = Object.prototype, zd = Ud.hasOwnProperty;
function Hd(n) {
  var e = this.__data__;
  return hn ? e[n] !== void 0 : zd.call(e, n);
}
var Vd = "__lodash_hash_undefined__";
function Kd(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = hn && e === void 0 ? Vd : e, this;
}
function or(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
or.prototype.clear = Dd;
or.prototype.delete = Bd;
or.prototype.get = jd;
or.prototype.has = Hd;
or.prototype.set = Kd;
function Gd() {
  this.__data__ = [], this.size = 0;
}
function ls(n, e) {
  for (var t = n.length; t--; )
    if (vn(n[t][0], e))
      return t;
  return -1;
}
var Wd = Array.prototype, Zd = Wd.splice;
function Yd(n) {
  var e = this.__data__, t = ls(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : Zd.call(e, t, 1), --this.size, !0;
}
function Xd(n) {
  var e = this.__data__, t = ls(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function Qd(n) {
  return ls(this.__data__, n) > -1;
}
function Jd(n, e) {
  var t = this.__data__, r = ls(t, n);
  return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
}
function It(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
It.prototype.clear = Gd;
It.prototype.delete = Yd;
It.prototype.get = Xd;
It.prototype.has = Qd;
It.prototype.set = Jd;
var fn = ur(gt, "Map");
function eh() {
  this.size = 0, this.__data__ = {
    hash: new or(),
    map: new (fn || It)(),
    string: new or()
  };
}
function th(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function cs(n, e) {
  var t = n.__data__;
  return th(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function rh(n) {
  var e = cs(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function nh(n) {
  return cs(this, n).get(n);
}
function sh(n) {
  return cs(this, n).has(n);
}
function ih(n, e) {
  var t = cs(this, n), r = t.size;
  return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
}
function dr(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
dr.prototype.clear = eh;
dr.prototype.delete = rh;
dr.prototype.get = nh;
dr.prototype.has = sh;
dr.prototype.set = ih;
function oh(n, e) {
  for (var t = -1, r = e.length, s = n.length; ++t < r; )
    n[s + t] = e[t];
  return n;
}
var Va = za(Object.getPrototypeOf, Object), ah = "[object Object]", lh = Function.prototype, ch = Object.prototype, Ka = lh.toString, uh = ch.hasOwnProperty, dh = Ka.call(Object);
function hh(n) {
  if (!Lt(n) || Dr(n) != ah)
    return !1;
  var e = Va(n);
  if (e === null)
    return !0;
  var t = uh.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Ka.call(t) == dh;
}
function fh() {
  this.__data__ = new It(), this.size = 0;
}
function ph(n) {
  var e = this.__data__, t = e.delete(n);
  return this.size = e.size, t;
}
function mh(n) {
  return this.__data__.get(n);
}
function gh(n) {
  return this.__data__.has(n);
}
var bh = 200;
function yh(n, e) {
  var t = this.__data__;
  if (t instanceof It) {
    var r = t.__data__;
    if (!fn || r.length < bh - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new dr(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function pt(n) {
  var e = this.__data__ = new It(n);
  this.size = e.size;
}
pt.prototype.clear = fh;
pt.prototype.delete = ph;
pt.prototype.get = mh;
pt.prototype.has = gh;
pt.prototype.set = yh;
var Ga = typeof exports == "object" && exports && !exports.nodeType && exports, mo = Ga && typeof module == "object" && module && !module.nodeType && module, vh = mo && mo.exports === Ga, go = vh ? gt.Buffer : void 0, bo = go ? go.allocUnsafe : void 0;
function Wa(n, e) {
  if (e)
    return n.slice();
  var t = n.length, r = bo ? bo(t) : new n.constructor(t);
  return n.copy(r), r;
}
function xh(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, s = 0, i = []; ++t < r; ) {
    var a = n[t];
    e(a, t, n) && (i[s++] = a);
  }
  return i;
}
function wh() {
  return [];
}
var Ah = Object.prototype, Eh = Ah.propertyIsEnumerable, yo = Object.getOwnPropertySymbols, Nh = yo ? function(n) {
  return n == null ? [] : (n = Object(n), xh(yo(n), function(e) {
    return Eh.call(n, e);
  }));
} : wh;
function Th(n, e, t) {
  var r = e(n);
  return ir(n) ? r : oh(r, t(n));
}
function bi(n) {
  return Th(n, qd, Nh);
}
var yi = ur(gt, "DataView"), vi = ur(gt, "Promise"), xi = ur(gt, "Set"), vo = "[object Map]", _h = "[object Object]", xo = "[object Promise]", wo = "[object Set]", Ao = "[object WeakMap]", Eo = "[object DataView]", Sh = cr(yi), kh = cr(fn), Ch = cr(vi), Lh = cr(xi), qh = cr(mi), nt = Dr;
(yi && nt(new yi(new ArrayBuffer(1))) != Eo || fn && nt(new fn()) != vo || vi && nt(vi.resolve()) != xo || xi && nt(new xi()) != wo || mi && nt(new mi()) != Ao) && (nt = function(n) {
  var e = Dr(n), t = e == _h ? n.constructor : void 0, r = t ? cr(t) : "";
  if (r)
    switch (r) {
      case Sh:
        return Eo;
      case kh:
        return vo;
      case Ch:
        return xo;
      case Lh:
        return wo;
      case qh:
        return Ao;
    }
  return e;
});
var Oh = Object.prototype, Ih = Oh.hasOwnProperty;
function Rh(n) {
  var e = n.length, t = new n.constructor(e);
  return e && typeof n[0] == "string" && Ih.call(n, "index") && (t.index = n.index, t.input = n.input), t;
}
var Jn = gt.Uint8Array;
function zi(n) {
  var e = new n.constructor(n.byteLength);
  return new Jn(e).set(new Jn(n)), e;
}
function $h(n, e) {
  var t = zi(n.buffer);
  return new n.constructor(t, n.byteOffset, n.byteLength);
}
var Dh = /\w*$/;
function Bh(n) {
  var e = new n.constructor(n.source, Dh.exec(n));
  return e.lastIndex = n.lastIndex, e;
}
var No = Vt ? Vt.prototype : void 0, To = No ? No.valueOf : void 0;
function Mh(n) {
  return To ? Object(To.call(n)) : {};
}
function Za(n, e) {
  var t = e ? zi(n.buffer) : n.buffer;
  return new n.constructor(t, n.byteOffset, n.length);
}
var Fh = "[object Boolean]", Ph = "[object Date]", jh = "[object Map]", Uh = "[object Number]", zh = "[object RegExp]", Hh = "[object Set]", Vh = "[object String]", Kh = "[object Symbol]", Gh = "[object ArrayBuffer]", Wh = "[object DataView]", Zh = "[object Float32Array]", Yh = "[object Float64Array]", Xh = "[object Int8Array]", Qh = "[object Int16Array]", Jh = "[object Int32Array]", ef = "[object Uint8Array]", tf = "[object Uint8ClampedArray]", rf = "[object Uint16Array]", nf = "[object Uint32Array]";
function sf(n, e, t) {
  var r = n.constructor;
  switch (e) {
    case Gh:
      return zi(n);
    case Fh:
    case Ph:
      return new r(+n);
    case Wh:
      return $h(n);
    case Zh:
    case Yh:
    case Xh:
    case Qh:
    case Jh:
    case ef:
    case tf:
    case rf:
    case nf:
      return Za(n, t);
    case jh:
      return new r();
    case Uh:
    case Vh:
      return new r(n);
    case zh:
      return Bh(n);
    case Hh:
      return new r();
    case Kh:
      return Mh(n);
  }
}
function Ya(n) {
  return typeof n.constructor == "function" && !Pi(n) ? Nu(Va(n)) : {};
}
var of = "[object Map]";
function af(n) {
  return Lt(n) && nt(n) == of;
}
var _o = Rr && Rr.isMap, lf = _o ? ji(_o) : af, cf = "[object Set]";
function uf(n) {
  return Lt(n) && nt(n) == cf;
}
var So = Rr && Rr.isSet, df = So ? ji(So) : uf, hf = 1, Xa = "[object Arguments]", ff = "[object Array]", pf = "[object Boolean]", mf = "[object Date]", gf = "[object Error]", Qa = "[object Function]", bf = "[object GeneratorFunction]", yf = "[object Map]", vf = "[object Number]", Ja = "[object Object]", xf = "[object RegExp]", wf = "[object Set]", Af = "[object String]", Ef = "[object Symbol]", Nf = "[object WeakMap]", Tf = "[object ArrayBuffer]", _f = "[object DataView]", Sf = "[object Float32Array]", kf = "[object Float64Array]", Cf = "[object Int8Array]", Lf = "[object Int16Array]", qf = "[object Int32Array]", Of = "[object Uint8Array]", If = "[object Uint8ClampedArray]", Rf = "[object Uint16Array]", $f = "[object Uint32Array]", ve = {};
ve[Xa] = ve[ff] = ve[Tf] = ve[_f] = ve[pf] = ve[mf] = ve[Sf] = ve[kf] = ve[Cf] = ve[Lf] = ve[qf] = ve[yf] = ve[vf] = ve[Ja] = ve[xf] = ve[wf] = ve[Af] = ve[Ef] = ve[Of] = ve[If] = ve[Rf] = ve[$f] = !0;
ve[gf] = ve[Qa] = ve[Nf] = !1;
function Zn(n, e, t, r, s, i) {
  var a, l = e & hf;
  if (a !== void 0)
    return a;
  if (!Gt(n))
    return n;
  var c = ir(n);
  if (c)
    a = Rh(n);
  else {
    var d = nt(n), x = d == Qa || d == bf;
    if (dn(n))
      return Wa(n, l);
    if (d == Ja || d == Xa || x && !s)
      a = x ? {} : Ya(n);
    else {
      if (!ve[d])
        return s ? n : {};
      a = sf(n, d, l);
    }
  }
  i || (i = new pt());
  var g = i.get(n);
  if (g)
    return g;
  i.set(n, a), df(n) ? n.forEach(function(_) {
    a.add(Zn(_, e, t, _, n, i));
  }) : lf(n) && n.forEach(function(_, k) {
    a.set(k, Zn(_, e, t, k, n, i));
  });
  var h = bi, m = c ? void 0 : h(n);
  return Ru(m || n, function(_, k) {
    m && (k = _, _ = n[k]), Ba(a, k, Zn(_, e, t, k, n, i));
  }), a;
}
var Df = 1, Bf = 4;
function Cr(n) {
  return Zn(n, Df | Bf);
}
var Mf = "__lodash_hash_undefined__";
function Ff(n) {
  return this.__data__.set(n, Mf), this;
}
function Pf(n) {
  return this.__data__.has(n);
}
function es(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new dr(); ++e < t; )
    this.add(n[e]);
}
es.prototype.add = es.prototype.push = Ff;
es.prototype.has = Pf;
function jf(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (e(n[t], t, n))
      return !0;
  return !1;
}
function Uf(n, e) {
  return n.has(e);
}
var zf = 1, Hf = 2;
function el(n, e, t, r, s, i) {
  var a = t & zf, l = n.length, c = e.length;
  if (l != c && !(a && c > l))
    return !1;
  var d = i.get(n), x = i.get(e);
  if (d && x)
    return d == e && x == n;
  var g = -1, h = !0, m = t & Hf ? new es() : void 0;
  for (i.set(n, e), i.set(e, n); ++g < l; ) {
    var _ = n[g], k = e[g];
    if (r)
      var q = a ? r(k, _, g, e, n, i) : r(_, k, g, n, e, i);
    if (q !== void 0) {
      if (q)
        continue;
      h = !1;
      break;
    }
    if (m) {
      if (!jf(e, function(I, P) {
        if (!Uf(m, P) && (_ === I || s(_, I, t, r, i)))
          return m.push(P);
      })) {
        h = !1;
        break;
      }
    } else if (!(_ === k || s(_, k, t, r, i))) {
      h = !1;
      break;
    }
  }
  return i.delete(n), i.delete(e), h;
}
function Vf(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r, s) {
    t[++e] = [s, r];
  }), t;
}
function Kf(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var Gf = 1, Wf = 2, Zf = "[object Boolean]", Yf = "[object Date]", Xf = "[object Error]", Qf = "[object Map]", Jf = "[object Number]", ep = "[object RegExp]", tp = "[object Set]", rp = "[object String]", np = "[object Symbol]", sp = "[object ArrayBuffer]", ip = "[object DataView]", ko = Vt ? Vt.prototype : void 0, ei = ko ? ko.valueOf : void 0;
function op(n, e, t, r, s, i, a) {
  switch (t) {
    case ip:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case sp:
      return !(n.byteLength != e.byteLength || !i(new Jn(n), new Jn(e)));
    case Zf:
    case Yf:
    case Jf:
      return vn(+n, +e);
    case Xf:
      return n.name == e.name && n.message == e.message;
    case ep:
    case rp:
      return n == e + "";
    case Qf:
      var l = Vf;
    case tp:
      var c = r & Gf;
      if (l || (l = Kf), n.size != e.size && !c)
        return !1;
      var d = a.get(n);
      if (d)
        return d == e;
      r |= Wf, a.set(n, e);
      var x = el(l(n), l(e), r, s, i, a);
      return a.delete(n), x;
    case np:
      if (ei)
        return ei.call(n) == ei.call(e);
  }
  return !1;
}
var ap = 1, lp = Object.prototype, cp = lp.hasOwnProperty;
function up(n, e, t, r, s, i) {
  var a = t & ap, l = bi(n), c = l.length, d = bi(e), x = d.length;
  if (c != x && !a)
    return !1;
  for (var g = c; g--; ) {
    var h = l[g];
    if (!(a ? h in e : cp.call(e, h)))
      return !1;
  }
  var m = i.get(n), _ = i.get(e);
  if (m && _)
    return m == e && _ == n;
  var k = !0;
  i.set(n, e), i.set(e, n);
  for (var q = a; ++g < c; ) {
    h = l[g];
    var I = n[h], P = e[h];
    if (r)
      var U = a ? r(P, I, h, e, n, i) : r(I, P, h, n, e, i);
    if (!(U === void 0 ? I === P || s(I, P, t, r, i) : U)) {
      k = !1;
      break;
    }
    q || (q = h == "constructor");
  }
  if (k && !q) {
    var W = n.constructor, V = e.constructor;
    W != V && "constructor" in n && "constructor" in e && !(typeof W == "function" && W instanceof W && typeof V == "function" && V instanceof V) && (k = !1);
  }
  return i.delete(n), i.delete(e), k;
}
var dp = 1, Co = "[object Arguments]", Lo = "[object Array]", Bn = "[object Object]", hp = Object.prototype, qo = hp.hasOwnProperty;
function fp(n, e, t, r, s, i) {
  var a = ir(n), l = ir(e), c = a ? Lo : nt(n), d = l ? Lo : nt(e);
  c = c == Co ? Bn : c, d = d == Co ? Bn : d;
  var x = c == Bn, g = d == Bn, h = c == d;
  if (h && dn(n)) {
    if (!dn(e))
      return !1;
    a = !0, x = !1;
  }
  if (h && !x)
    return i || (i = new pt()), a || Ui(n) ? el(n, e, t, r, s, i) : op(n, e, c, t, r, s, i);
  if (!(t & dp)) {
    var m = x && qo.call(n, "__wrapped__"), _ = g && qo.call(e, "__wrapped__");
    if (m || _) {
      var k = m ? n.value() : n, q = _ ? e.value() : e;
      return i || (i = new pt()), s(k, q, t, r, i);
    }
  }
  return h ? (i || (i = new pt()), up(n, e, t, r, s, i)) : !1;
}
function tl(n, e, t, r, s) {
  return n === e ? !0 : n == null || e == null || !Lt(n) && !Lt(e) ? n !== n && e !== e : fp(n, e, t, r, tl, s);
}
function pp(n) {
  return function(e, t, r) {
    for (var s = -1, i = Object(e), a = r(e), l = a.length; l--; ) {
      var c = a[++s];
      if (t(i[c], c, i) === !1)
        break;
    }
    return e;
  };
}
var mp = pp();
function wi(n, e, t) {
  (t !== void 0 && !vn(n[e], t) || t === void 0 && !(e in n)) && Fi(n, e, t);
}
function gp(n) {
  return Lt(n) && as(n);
}
function Ai(n, e) {
  if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
    return n[e];
}
function bp(n) {
  return Fu(n, Ha(n));
}
function yp(n, e, t, r, s, i, a) {
  var l = Ai(n, t), c = Ai(e, t), d = a.get(c);
  if (d) {
    wi(n, t, d);
    return;
  }
  var x = i ? i(l, c, t + "", n, e, a) : void 0, g = x === void 0;
  if (g) {
    var h = ir(c), m = !h && dn(c), _ = !h && !m && Ui(c);
    x = c, h || m || _ ? ir(l) ? x = l : gp(l) ? x = _u(l) : m ? (g = !1, x = Wa(c, !0)) : _ ? (g = !1, x = Za(c, !0)) : x = [] : hh(c) || gi(c) ? (x = l, gi(l) ? x = bp(l) : (!Gt(l) || Mi(l)) && (x = Ya(c))) : g = !1;
  }
  g && (a.set(c, x), s(x, c, r, i, a), a.delete(c)), wi(n, t, x);
}
function rl(n, e, t, r, s) {
  n !== e && mp(e, function(i, a) {
    if (s || (s = new pt()), Gt(i))
      yp(n, e, a, t, rl, r, s);
    else {
      var l = r ? r(Ai(n, a), i, a + "", n, e, s) : void 0;
      l === void 0 && (l = i), wi(n, a, l);
    }
  }, Ha);
}
function Hi(n, e) {
  return tl(n, e);
}
var zt = Hu(function(n, e, t) {
  rl(n, e, t);
}), K = /* @__PURE__ */ ((n) => (n[n.TYPE = 3] = "TYPE", n[n.LEVEL = 12] = "LEVEL", n[n.ATTRIBUTE = 13] = "ATTRIBUTE", n[n.BLOT = 14] = "BLOT", n[n.INLINE = 7] = "INLINE", n[n.BLOCK = 11] = "BLOCK", n[n.BLOCK_BLOT = 10] = "BLOCK_BLOT", n[n.INLINE_BLOT = 6] = "INLINE_BLOT", n[n.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", n[n.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", n[n.ANY = 15] = "ANY", n))(K || {});
class mt {
  constructor(e, t, r = {}) {
    this.attrName = e, this.keyName = t;
    const s = K.TYPE & K.ATTRIBUTE;
    this.scope = r.scope != null ? (
      // Ignore type bits, force attribute bit
      r.scope & K.LEVEL | s
    ) : K.ATTRIBUTE, r.whitelist != null && (this.whitelist = r.whitelist);
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
class Lr extends Error {
  constructor(e) {
    e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
  }
}
const nl = class Ei {
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
      throw new Lr(`Unable to create ${t} blot`);
    const i = s, a = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : i.create(r)
    ), l = new i(e, a, r);
    return Ei.blots.set(l.domNode, l), l;
  }
  find(e, t = !1) {
    return Ei.find(e, t);
  }
  query(e, t = K.ANY) {
    let r;
    return typeof e == "string" ? r = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? r = this.types.text : typeof e == "number" ? e & K.LEVEL & K.BLOCK ? r = this.types.block : e & K.LEVEL & K.INLINE && (r = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((s) => (r = this.classes[s], !!r)), r = r || this.tags[e.tagName]), r == null ? null : "scope" in r && t & K.LEVEL & r.scope && t & K.TYPE & r.scope ? r : null;
  }
  register(...e) {
    return e.map((t) => {
      const r = "blotName" in t, s = "attrName" in t;
      if (!r && !s)
        throw new Lr("Invalid definition");
      if (r && t.blotName === "abstract")
        throw new Lr("Cannot register abstract class");
      const i = r ? t.blotName : s ? t.attrName : void 0;
      return this.types[i] = t, s ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : r && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((a) => a.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((a) => {
        (this.tags[a] == null || t.className == null) && (this.tags[a] = t);
      }))), t;
    });
  }
};
nl.blots = /* @__PURE__ */ new WeakMap();
let $r = nl;
function Oo(n, e) {
  return (n.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class vp extends mt {
  static keys(e) {
    return (e.getAttribute("class") || "").split(/\s+/).map((t) => t.split("-").slice(0, -1).join("-"));
  }
  add(e, t) {
    return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
  }
  remove(e) {
    Oo(e, this.keyName).forEach((t) => {
      e.classList.remove(t);
    }), e.classList.length === 0 && e.removeAttribute("class");
  }
  value(e) {
    const t = (Oo(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(e, t) ? t : "";
  }
}
const lt = vp;
function ti(n) {
  const e = n.split("-"), t = e.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  return e[0] + t;
}
class xp extends mt {
  static keys(e) {
    return (e.getAttribute("style") || "").split(";").map((t) => t.split(":")[0].trim());
  }
  add(e, t) {
    return this.canAdd(e, t) ? (e.style[ti(this.keyName)] = t, !0) : !1;
  }
  remove(e) {
    e.style[ti(this.keyName)] = "", e.getAttribute("style") || e.removeAttribute("style");
  }
  value(e) {
    const t = e.style[ti(this.keyName)];
    return this.canAdd(e, t) ? t : "";
  }
}
const Wt = xp;
class wp {
  constructor(e) {
    this.attributes = {}, this.domNode = e, this.build();
  }
  attribute(e, t) {
    t ? e.add(this.domNode, t) && (e.value(this.domNode) != null ? this.attributes[e.attrName] = e : delete this.attributes[e.attrName]) : (e.remove(this.domNode), delete this.attributes[e.attrName]);
  }
  build() {
    this.attributes = {};
    const e = $r.find(this.domNode);
    if (e == null)
      return;
    const t = mt.keys(this.domNode), r = lt.keys(this.domNode), s = Wt.keys(this.domNode);
    t.concat(r).concat(s).forEach((i) => {
      const a = e.scroll.query(i, K.ATTRIBUTE);
      a instanceof mt && (this.attributes[a.attrName] = a);
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
const us = wp, sl = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, $r.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new Lr("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), $r.blots.delete(this.domNode);
  }
  deleteAt(e, t) {
    this.isolate(e, t).remove();
  }
  formatAt(e, t, r, s) {
    const i = this.isolate(e, t);
    if (this.scroll.query(r, K.BLOT) != null && s)
      i.wrap(r, s);
    else if (this.scroll.query(r, K.ATTRIBUTE) != null) {
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
      throw new Lr(`Cannot wrap ${e}`);
    return r.appendChild(this), r;
  }
};
sl.blotName = "abstract";
let il = sl;
const ol = class extends il {
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
ol.scope = K.INLINE_BLOT;
let Ap = ol;
const Me = Ap;
class Ep {
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
    let c = l();
    for (; c && a < e + t; ) {
      const d = c.length();
      e > a ? r(
        c,
        e - a,
        Math.min(t, a + d - e)
      ) : r(c, 0, Math.min(d, e + t - a)), a += d, c = l();
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
function Io(n, e) {
  const t = e.find(n);
  if (t)
    return t;
  try {
    return e.create(n);
  } catch {
    const r = e.create(K.INLINE);
    return Array.from(n.childNodes).forEach((s) => {
      r.domNode.appendChild(s);
    }), n.parentNode && n.parentNode.replaceChild(r.domNode, n), r.attach(), r;
  }
}
const al = class Mt extends il {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = e, Mt.uiClass && this.uiNode.classList.add(Mt.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new Ep(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = Io(e, this.scroll);
        this.insertBefore(t, this.children.head || void 0);
      } catch (t) {
        if (t instanceof Lr)
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
    return e.blotName == null && e(r) || e.blotName != null && r instanceof e ? [r, s] : r instanceof Mt ? r.descendant(e, s) : [null, -1];
  }
  descendants(e, t = 0, r = Number.MAX_VALUE) {
    let s = [], i = r;
    return this.children.forEachAt(
      t,
      r,
      (a, l, c) => {
        (e.blotName == null && e(a) || e.blotName != null && a instanceof e) && s.push(a), a instanceof Mt && (s = s.concat(
          a.descendants(e, l, i)
        )), i -= c;
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
      ) || (t.statics.scope === K.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof Mt ? t.unwrap() : t.remove());
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
    return r instanceof Mt ? i.concat(r.path(s, t)) : (r != null && i.push([r, s]), i);
  }
  removeChild(e) {
    this.children.remove(e);
  }
  replaceWith(e, t) {
    const r = typeof e == "string" ? this.scroll.create(e, t) : e;
    return r instanceof Mt && this.moveChildren(r), super.replaceWith(r);
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
      const l = Io(i, this.scroll);
      (l.next !== a || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, a || void 0));
    }), this.enforceAllowedChildren();
  }
};
al.uiClass = "";
let Np = al;
const ot = Np;
function Tp(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length)
    return !1;
  for (const t in n)
    if (n[t] !== e[t])
      return !1;
  return !0;
}
const Er = class Nr extends ot {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(Nr.blotName);
    if (!(r != null && e.tagName === r.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new us(this.domNode);
  }
  format(e, t) {
    if (e === this.statics.blotName && !t)
      this.children.forEach((r) => {
        r instanceof Nr || (r = r.wrap(Nr.blotName, !0)), this.attributes.copy(r);
      }), this.unwrap();
    else {
      const r = this.scroll.query(e, K.INLINE);
      if (r == null)
        return;
      r instanceof mt ? this.attributes.attribute(r, t) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t);
    }
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, r, s) {
    this.formats()[r] != null || this.scroll.query(r, K.ATTRIBUTE) ? this.isolate(e, t).format(r, s) : super.formatAt(e, t, r, s);
  }
  optimize(e) {
    super.optimize(e);
    const t = this.formats();
    if (Object.keys(t).length === 0)
      return this.unwrap();
    const r = this.next;
    r instanceof Nr && r.prev === this && Tp(t, r.formats()) && (r.moveChildren(this), r.remove());
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
    return r instanceof Nr && this.attributes.move(r), r;
  }
};
Er.allowedChildren = [Er, Me], Er.blotName = "inline", Er.scope = K.INLINE_BLOT, Er.tagName = "SPAN";
let _p = Er;
const Vi = _p, Tr = class Ni extends ot {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(Ni.blotName);
    if (!(r != null && e.tagName === r.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new us(this.domNode);
  }
  format(e, t) {
    const r = this.scroll.query(e, K.BLOCK);
    r != null && (r instanceof mt ? this.attributes.attribute(r, t) : e === this.statics.blotName && !t ? this.replaceWith(Ni.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, r, s) {
    this.scroll.query(r, K.BLOCK) != null ? this.format(r, s) : super.formatAt(e, t, r, s);
  }
  insertAt(e, t, r) {
    if (r == null || this.scroll.query(t, K.INLINE) != null)
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
Tr.blotName = "block", Tr.scope = K.BLOCK_BLOT, Tr.tagName = "P", Tr.allowedChildren = [
  Vi,
  Tr,
  Me
];
let Sp = Tr;
const pn = Sp, Ti = class extends ot {
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
Ti.blotName = "container", Ti.scope = K.BLOCK_BLOT;
let kp = Ti;
const ds = kp;
class Cp extends Me {
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
const Ze = Cp, Lp = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, qp = 100, _r = class extends ot {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((r) => {
      this.update(r);
    }), this.observer.observe(this.domNode, Lp), this.attach();
  }
  create(e, t) {
    return this.registry.create(this, e, t);
  }
  find(e, t = !1) {
    const r = this.registry.find(e, t);
    return r ? r.scroll === this ? r : t ? this.find(r.scroll.domNode.parentNode, !0) : null : null;
  }
  query(e, t = K.ANY) {
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
    const i = (c, d = !0) => {
      c == null || c === this || c.domNode.parentNode != null && (r.has(c.domNode) || r.set(c.domNode, []), d && i(c.parent));
    }, a = (c) => {
      r.has(c.domNode) && (c instanceof ot && c.children.forEach(a), r.delete(c.domNode), c.optimize(t));
    };
    let l = e;
    for (let c = 0; l.length > 0; c += 1) {
      if (c >= qp)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((d) => {
        const x = this.find(d.target, !0);
        x != null && (x.domNode === d.target && (d.type === "childList" ? (i(this.find(d.previousSibling, !1)), Array.from(d.addedNodes).forEach((g) => {
          const h = this.find(g, !1);
          i(h, !1), h instanceof ot && h.children.forEach((m) => {
            i(m, !1);
          });
        })) : d.type === "attributes" && i(x.prev)), i(x));
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
_r.blotName = "scroll", _r.defaultChild = pn, _r.allowedChildren = [pn, ds], _r.scope = K.BLOCK_BLOT, _r.tagName = "DIV";
let Op = _r;
const Ki = Op, _i = class ll extends Me {
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
    super.optimize(e), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof ll && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
_i.blotName = "text", _i.scope = K.INLINE_BLOT;
let Ip = _i;
const ts = Ip, Rp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: mt,
  AttributorStore: us,
  BlockBlot: pn,
  ClassAttributor: lt,
  ContainerBlot: ds,
  EmbedBlot: Ze,
  InlineBlot: Vi,
  LeafBlot: Me,
  ParentBlot: ot,
  Registry: $r,
  Scope: K,
  ScrollBlot: Ki,
  StyleAttributor: Wt,
  TextBlot: ts
}, Symbol.toStringTag, { value: "Module" }));
var jt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function cl(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Mn = { exports: {} }, ri, Ro;
function $p() {
  if (Ro) return ri;
  Ro = 1;
  var n = -1, e = 1, t = 0;
  function r(b, M, S, L, f) {
    if (b === M)
      return b ? [[t, b]] : [];
    if (S != null) {
      var p = Ae(b, M, S);
      if (p)
        return p;
    }
    var E = l(b, M), N = b.substring(0, E);
    b = b.substring(E), M = M.substring(E), E = d(b, M);
    var A = b.substring(b.length - E);
    b = b.substring(0, b.length - E), M = M.substring(0, M.length - E);
    var D = s(b, M);
    return N && D.unshift([t, N]), A && D.push([t, A]), P(D, f), L && g(D), D;
  }
  function s(b, M) {
    var S;
    if (!b)
      return [[e, M]];
    if (!M)
      return [[n, b]];
    var L = b.length > M.length ? b : M, f = b.length > M.length ? M : b, p = L.indexOf(f);
    if (p !== -1)
      return S = [
        [e, L.substring(0, p)],
        [t, f],
        [e, L.substring(p + f.length)]
      ], b.length > M.length && (S[0][0] = S[2][0] = n), S;
    if (f.length === 1)
      return [
        [n, b],
        [e, M]
      ];
    var E = x(b, M);
    if (E) {
      var N = E[0], A = E[1], D = E[2], j = E[3], G = E[4], Y = r(N, D), oe = r(A, j);
      return Y.concat([[t, G]], oe);
    }
    return i(b, M);
  }
  function i(b, M) {
    for (var S = b.length, L = M.length, f = Math.ceil((S + L) / 2), p = f, E = 2 * f, N = new Array(E), A = new Array(E), D = 0; D < E; D++)
      N[D] = -1, A[D] = -1;
    N[p + 1] = 0, A[p + 1] = 0;
    for (var j = S - L, G = j % 2 !== 0, Y = 0, oe = 0, X = 0, be = 0, ye = 0; ye < f; ye++) {
      for (var J = -ye + Y; J <= ye - oe; J += 2) {
        var ue = p + J, ae;
        J === -ye || J !== ye && N[ue - 1] < N[ue + 1] ? ae = N[ue + 1] : ae = N[ue - 1] + 1;
        for (var le = ae - J; ae < S && le < L && b.charAt(ae) === M.charAt(le); )
          ae++, le++;
        if (N[ue] = ae, ae > S)
          oe += 2;
        else if (le > L)
          Y += 2;
        else if (G) {
          var de = p + j - J;
          if (de >= 0 && de < E && A[de] !== -1) {
            var pe = S - A[de];
            if (ae >= pe)
              return a(b, M, ae, le);
          }
        }
      }
      for (var Ee = -ye + X; Ee <= ye - be; Ee += 2) {
        var de = p + Ee, pe;
        Ee === -ye || Ee !== ye && A[de - 1] < A[de + 1] ? pe = A[de + 1] : pe = A[de - 1] + 1;
        for (var ke = pe - Ee; pe < S && ke < L && b.charAt(S - pe - 1) === M.charAt(L - ke - 1); )
          pe++, ke++;
        if (A[de] = pe, pe > S)
          be += 2;
        else if (ke > L)
          X += 2;
        else if (!G) {
          var ue = p + j - Ee;
          if (ue >= 0 && ue < E && N[ue] !== -1) {
            var ae = N[ue], le = p + ae - ue;
            if (pe = S - pe, ae >= pe)
              return a(b, M, ae, le);
          }
        }
      }
    }
    return [
      [n, b],
      [e, M]
    ];
  }
  function a(b, M, S, L) {
    var f = b.substring(0, S), p = M.substring(0, L), E = b.substring(S), N = M.substring(L), A = r(f, p), D = r(E, N);
    return A.concat(D);
  }
  function l(b, M) {
    if (!b || !M || b.charAt(0) !== M.charAt(0))
      return 0;
    for (var S = 0, L = Math.min(b.length, M.length), f = L, p = 0; S < f; )
      b.substring(p, f) == M.substring(p, f) ? (S = f, p = S) : L = f, f = Math.floor((L - S) / 2 + S);
    return U(b.charCodeAt(f - 1)) && f--, f;
  }
  function c(b, M) {
    var S = b.length, L = M.length;
    if (S == 0 || L == 0)
      return 0;
    S > L ? b = b.substring(S - L) : S < L && (M = M.substring(0, S));
    var f = Math.min(S, L);
    if (b == M)
      return f;
    for (var p = 0, E = 1; ; ) {
      var N = b.substring(f - E), A = M.indexOf(N);
      if (A == -1)
        return p;
      E += A, (A == 0 || b.substring(f - E) == M.substring(0, E)) && (p = E, E++);
    }
  }
  function d(b, M) {
    if (!b || !M || b.slice(-1) !== M.slice(-1))
      return 0;
    for (var S = 0, L = Math.min(b.length, M.length), f = L, p = 0; S < f; )
      b.substring(b.length - f, b.length - p) == M.substring(M.length - f, M.length - p) ? (S = f, p = S) : L = f, f = Math.floor((L - S) / 2 + S);
    return W(b.charCodeAt(b.length - f)) && f--, f;
  }
  function x(b, M) {
    var S = b.length > M.length ? b : M, L = b.length > M.length ? M : b;
    if (S.length < 4 || L.length * 2 < S.length)
      return null;
    function f(oe, X, be) {
      for (var ye = oe.substring(be, be + Math.floor(oe.length / 4)), J = -1, ue = "", ae, le, de, pe; (J = X.indexOf(ye, J + 1)) !== -1; ) {
        var Ee = l(
          oe.substring(be),
          X.substring(J)
        ), ke = d(
          oe.substring(0, be),
          X.substring(0, J)
        );
        ue.length < ke + Ee && (ue = X.substring(J - ke, J) + X.substring(J, J + Ee), ae = oe.substring(0, be - ke), le = oe.substring(be + Ee), de = X.substring(0, J - ke), pe = X.substring(J + Ee));
      }
      return ue.length * 2 >= oe.length ? [
        ae,
        le,
        de,
        pe,
        ue
      ] : null;
    }
    var p = f(
      S,
      L,
      Math.ceil(S.length / 4)
    ), E = f(
      S,
      L,
      Math.ceil(S.length / 2)
    ), N;
    if (!p && !E)
      return null;
    E ? p ? N = p[4].length > E[4].length ? p : E : N = E : N = p;
    var A, D, j, G;
    b.length > M.length ? (A = N[0], D = N[1], j = N[2], G = N[3]) : (j = N[0], G = N[1], A = N[2], D = N[3]);
    var Y = N[4];
    return [A, D, j, G, Y];
  }
  function g(b) {
    for (var M = !1, S = [], L = 0, f = null, p = 0, E = 0, N = 0, A = 0, D = 0; p < b.length; )
      b[p][0] == t ? (S[L++] = p, E = A, N = D, A = 0, D = 0, f = b[p][1]) : (b[p][0] == e ? A += b[p][1].length : D += b[p][1].length, f && f.length <= Math.max(E, N) && f.length <= Math.max(A, D) && (b.splice(S[L - 1], 0, [
        n,
        f
      ]), b[S[L - 1] + 1][0] = e, L--, L--, p = L > 0 ? S[L - 1] : -1, E = 0, N = 0, A = 0, D = 0, f = null, M = !0)), p++;
    for (M && P(b), I(b), p = 1; p < b.length; ) {
      if (b[p - 1][0] == n && b[p][0] == e) {
        var j = b[p - 1][1], G = b[p][1], Y = c(j, G), oe = c(G, j);
        Y >= oe ? (Y >= j.length / 2 || Y >= G.length / 2) && (b.splice(p, 0, [
          t,
          G.substring(0, Y)
        ]), b[p - 1][1] = j.substring(
          0,
          j.length - Y
        ), b[p + 1][1] = G.substring(Y), p++) : (oe >= j.length / 2 || oe >= G.length / 2) && (b.splice(p, 0, [
          t,
          j.substring(0, oe)
        ]), b[p - 1][0] = e, b[p - 1][1] = G.substring(
          0,
          G.length - oe
        ), b[p + 1][0] = n, b[p + 1][1] = j.substring(oe), p++), p++;
      }
      p++;
    }
  }
  var h = /[^a-zA-Z0-9]/, m = /\s/, _ = /[\r\n]/, k = /\n\r?\n$/, q = /^\r?\n\r?\n/;
  function I(b) {
    function M(oe, X) {
      if (!oe || !X)
        return 6;
      var be = oe.charAt(oe.length - 1), ye = X.charAt(0), J = be.match(h), ue = ye.match(h), ae = J && be.match(m), le = ue && ye.match(m), de = ae && be.match(_), pe = le && ye.match(_), Ee = de && oe.match(k), ke = pe && X.match(q);
      return Ee || ke ? 5 : de || pe ? 4 : J && !ae && le ? 3 : ae || le ? 2 : J || ue ? 1 : 0;
    }
    for (var S = 1; S < b.length - 1; ) {
      if (b[S - 1][0] == t && b[S + 1][0] == t) {
        var L = b[S - 1][1], f = b[S][1], p = b[S + 1][1], E = d(L, f);
        if (E) {
          var N = f.substring(f.length - E);
          L = L.substring(0, L.length - E), f = N + f.substring(0, f.length - E), p = N + p;
        }
        for (var A = L, D = f, j = p, G = M(L, f) + M(f, p); f.charAt(0) === p.charAt(0); ) {
          L += f.charAt(0), f = f.substring(1) + p.charAt(0), p = p.substring(1);
          var Y = M(L, f) + M(f, p);
          Y >= G && (G = Y, A = L, D = f, j = p);
        }
        b[S - 1][1] != A && (A ? b[S - 1][1] = A : (b.splice(S - 1, 1), S--), b[S][1] = D, j ? b[S + 1][1] = j : (b.splice(S + 1, 1), S--));
      }
      S++;
    }
  }
  function P(b, M) {
    b.push([t, ""]);
    for (var S = 0, L = 0, f = 0, p = "", E = "", N; S < b.length; ) {
      if (S < b.length - 1 && !b[S][1]) {
        b.splice(S, 1);
        continue;
      }
      switch (b[S][0]) {
        case e:
          f++, E += b[S][1], S++;
          break;
        case n:
          L++, p += b[S][1], S++;
          break;
        case t:
          var A = S - f - L - 1;
          if (M) {
            if (A >= 0 && ie(b[A][1])) {
              var D = b[A][1].slice(-1);
              if (b[A][1] = b[A][1].slice(
                0,
                -1
              ), p = D + p, E = D + E, !b[A][1]) {
                b.splice(A, 1), S--;
                var j = A - 1;
                b[j] && b[j][0] === e && (f++, E = b[j][1] + E, j--), b[j] && b[j][0] === n && (L++, p = b[j][1] + p, j--), A = j;
              }
            }
            if (V(b[S][1])) {
              var D = b[S][1].charAt(0);
              b[S][1] = b[S][1].slice(1), p += D, E += D;
            }
          }
          if (S < b.length - 1 && !b[S][1]) {
            b.splice(S, 1);
            break;
          }
          if (p.length > 0 || E.length > 0) {
            p.length > 0 && E.length > 0 && (N = l(E, p), N !== 0 && (A >= 0 ? b[A][1] += E.substring(
              0,
              N
            ) : (b.splice(0, 0, [
              t,
              E.substring(0, N)
            ]), S++), E = E.substring(N), p = p.substring(N)), N = d(E, p), N !== 0 && (b[S][1] = E.substring(E.length - N) + b[S][1], E = E.substring(
              0,
              E.length - N
            ), p = p.substring(
              0,
              p.length - N
            )));
            var G = f + L;
            p.length === 0 && E.length === 0 ? (b.splice(S - G, G), S = S - G) : p.length === 0 ? (b.splice(S - G, G, [e, E]), S = S - G + 1) : E.length === 0 ? (b.splice(S - G, G, [n, p]), S = S - G + 1) : (b.splice(
              S - G,
              G,
              [n, p],
              [e, E]
            ), S = S - G + 2);
          }
          S !== 0 && b[S - 1][0] === t ? (b[S - 1][1] += b[S][1], b.splice(S, 1)) : S++, f = 0, L = 0, p = "", E = "";
          break;
      }
    }
    b[b.length - 1][1] === "" && b.pop();
    var Y = !1;
    for (S = 1; S < b.length - 1; )
      b[S - 1][0] === t && b[S + 1][0] === t && (b[S][1].substring(
        b[S][1].length - b[S - 1][1].length
      ) === b[S - 1][1] ? (b[S][1] = b[S - 1][1] + b[S][1].substring(
        0,
        b[S][1].length - b[S - 1][1].length
      ), b[S + 1][1] = b[S - 1][1] + b[S + 1][1], b.splice(S - 1, 1), Y = !0) : b[S][1].substring(0, b[S + 1][1].length) == b[S + 1][1] && (b[S - 1][1] += b[S + 1][1], b[S][1] = b[S][1].substring(b[S + 1][1].length) + b[S + 1][1], b.splice(S + 1, 1), Y = !0)), S++;
    Y && P(b, M);
  }
  function U(b) {
    return b >= 55296 && b <= 56319;
  }
  function W(b) {
    return b >= 56320 && b <= 57343;
  }
  function V(b) {
    return W(b.charCodeAt(0));
  }
  function ie(b) {
    return U(b.charCodeAt(b.length - 1));
  }
  function re(b) {
    for (var M = [], S = 0; S < b.length; S++)
      b[S][1].length > 0 && M.push(b[S]);
    return M;
  }
  function ge(b, M, S, L) {
    return ie(b) || V(L) ? null : re([
      [t, b],
      [n, M],
      [e, S],
      [t, L]
    ]);
  }
  function Ae(b, M, S) {
    var L = typeof S == "number" ? { index: S, length: 0 } : S.oldRange, f = typeof S == "number" ? null : S.newRange, p = b.length, E = M.length;
    if (L.length === 0 && (f === null || f.length === 0)) {
      var N = L.index, A = b.slice(0, N), D = b.slice(N), j = f ? f.index : null;
      e: {
        var G = N + E - p;
        if (j !== null && j !== G || G < 0 || G > E)
          break e;
        var Y = M.slice(0, G), oe = M.slice(G);
        if (oe !== D)
          break e;
        var X = Math.min(N, G), be = A.slice(0, X), ye = Y.slice(0, X);
        if (be !== ye)
          break e;
        var J = A.slice(X), ue = Y.slice(X);
        return ge(be, J, ue, D);
      }
      e: {
        if (j !== null && j !== N)
          break e;
        var ae = N, Y = M.slice(0, ae), oe = M.slice(ae);
        if (Y !== A)
          break e;
        var le = Math.min(p - ae, E - ae), de = D.slice(D.length - le), pe = oe.slice(oe.length - le);
        if (de !== pe)
          break e;
        var J = D.slice(0, D.length - le), ue = oe.slice(0, oe.length - le);
        return ge(A, J, ue, de);
      }
    }
    if (L.length > 0 && f && f.length === 0)
      e: {
        var be = b.slice(0, L.index), de = b.slice(L.index + L.length), X = be.length, le = de.length;
        if (E < X + le)
          break e;
        var ye = M.slice(0, X), pe = M.slice(E - le);
        if (be !== ye || de !== pe)
          break e;
        var J = b.slice(X, p - le), ue = M.slice(X, E - le);
        return ge(be, J, ue, de);
      }
    return null;
  }
  function we(b, M, S, L) {
    return r(b, M, S, L, !0);
  }
  return we.INSERT = e, we.DELETE = n, we.EQUAL = t, ri = we, ri;
}
var rn = { exports: {} };
rn.exports;
var $o;
function ul() {
  return $o || ($o = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", a = "[object Array]", l = "[object Boolean]", c = "[object Date]", d = "[object Error]", x = "[object Function]", g = "[object GeneratorFunction]", h = "[object Map]", m = "[object Number]", _ = "[object Object]", k = "[object Promise]", q = "[object RegExp]", I = "[object Set]", P = "[object String]", U = "[object Symbol]", W = "[object WeakMap]", V = "[object ArrayBuffer]", ie = "[object DataView]", re = "[object Float32Array]", ge = "[object Float64Array]", Ae = "[object Int8Array]", we = "[object Int16Array]", b = "[object Int32Array]", M = "[object Uint8Array]", S = "[object Uint8ClampedArray]", L = "[object Uint16Array]", f = "[object Uint32Array]", p = /[\\^$.*+?()[\]{}|]/g, E = /\w*$/, N = /^\[object .+?Constructor\]$/, A = /^(?:0|[1-9]\d*)$/, D = {};
    D[i] = D[a] = D[V] = D[ie] = D[l] = D[c] = D[re] = D[ge] = D[Ae] = D[we] = D[b] = D[h] = D[m] = D[_] = D[q] = D[I] = D[P] = D[U] = D[M] = D[S] = D[L] = D[f] = !0, D[d] = D[x] = D[W] = !1;
    var j = typeof jt == "object" && jt && jt.Object === Object && jt, G = typeof self == "object" && self && self.Object === Object && self, Y = j || G || Function("return this")(), oe = e && !e.nodeType && e, X = oe && !0 && n && !n.nodeType && n, be = X && X.exports === oe;
    function ye(o, u) {
      return o.set(u[0], u[1]), o;
    }
    function J(o, u) {
      return o.add(u), o;
    }
    function ue(o, u) {
      for (var v = -1, O = o ? o.length : 0; ++v < O && u(o[v], v, o) !== !1; )
        ;
      return o;
    }
    function ae(o, u) {
      for (var v = -1, O = u.length, te = o.length; ++v < O; )
        o[te + v] = u[v];
      return o;
    }
    function le(o, u, v, O) {
      for (var te = -1, Z = o ? o.length : 0; ++te < Z; )
        v = u(v, o[te], te, o);
      return v;
    }
    function de(o, u) {
      for (var v = -1, O = Array(o); ++v < o; )
        O[v] = u(v);
      return O;
    }
    function pe(o, u) {
      return o?.[u];
    }
    function Ee(o) {
      var u = !1;
      if (o != null && typeof o.toString != "function")
        try {
          u = !!(o + "");
        } catch {
        }
      return u;
    }
    function ke(o) {
      var u = -1, v = Array(o.size);
      return o.forEach(function(O, te) {
        v[++u] = [te, O];
      }), v;
    }
    function Zt(o, u) {
      return function(v) {
        return o(u(v));
      };
    }
    function mr(o) {
      var u = -1, v = Array(o.size);
      return o.forEach(function(O) {
        v[++u] = O;
      }), v;
    }
    var Mr = Array.prototype, Fr = Function.prototype, yt = Object.prototype, ut = Y["__core-js_shared__"], Yt = (function() {
      var o = /[^.]+$/.exec(ut && ut.keys && ut.keys.IE_PROTO || "");
      return o ? "Symbol(src)_1." + o : "";
    })(), vt = Fr.toString, je = yt.hasOwnProperty, $t = yt.toString, Pr = RegExp(
      "^" + vt.call(je).replace(p, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), xt = be ? Y.Buffer : void 0, wt = Y.Symbol, T = Y.Uint8Array, y = Zt(Object.getPrototypeOf, Object), C = Object.create, R = yt.propertyIsEnumerable, ne = Mr.splice, fe = Object.getOwnPropertySymbols, Ie = xt ? xt.isBuffer : void 0, gr = Zt(Object.keys, Object), At = et(Y, "DataView"), Et = et(Y, "Map"), Te = et(Y, "Promise"), br = et(Y, "Set"), jr = et(Y, "WeakMap"), Xt = et(Object, "create"), Ur = Ue(At), Qt = Ue(Et), zr = Ue(Te), Hr = Ue(br), Vr = Ue(jr), Dt = wt ? wt.prototype : void 0, Nn = Dt ? Dt.valueOf : void 0;
    function Nt(o) {
      var u = -1, v = o ? o.length : 0;
      for (this.clear(); ++u < v; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function ms() {
      this.__data__ = Xt ? Xt(null) : {};
    }
    function gs(o) {
      return this.has(o) && delete this.__data__[o];
    }
    function bs(o) {
      var u = this.__data__;
      if (Xt) {
        var v = u[o];
        return v === r ? void 0 : v;
      }
      return je.call(u, o) ? u[o] : void 0;
    }
    function Tn(o) {
      var u = this.__data__;
      return Xt ? u[o] !== void 0 : je.call(u, o);
    }
    function Kr(o, u) {
      var v = this.__data__;
      return v[o] = Xt && u === void 0 ? r : u, this;
    }
    Nt.prototype.clear = ms, Nt.prototype.delete = gs, Nt.prototype.get = bs, Nt.prototype.has = Tn, Nt.prototype.set = Kr;
    function Ce(o) {
      var u = -1, v = o ? o.length : 0;
      for (this.clear(); ++u < v; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function ys() {
      this.__data__ = [];
    }
    function vs(o) {
      var u = this.__data__, v = vr(u, o);
      if (v < 0)
        return !1;
      var O = u.length - 1;
      return v == O ? u.pop() : ne.call(u, v, 1), !0;
    }
    function xs(o) {
      var u = this.__data__, v = vr(u, o);
      return v < 0 ? void 0 : u[v][1];
    }
    function ws(o) {
      return vr(this.__data__, o) > -1;
    }
    function As(o, u) {
      var v = this.__data__, O = vr(v, o);
      return O < 0 ? v.push([o, u]) : v[O][1] = u, this;
    }
    Ce.prototype.clear = ys, Ce.prototype.delete = vs, Ce.prototype.get = xs, Ce.prototype.has = ws, Ce.prototype.set = As;
    function Re(o) {
      var u = -1, v = o ? o.length : 0;
      for (this.clear(); ++u < v; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function Es() {
      this.__data__ = {
        hash: new Nt(),
        map: new (Et || Ce)(),
        string: new Nt()
      };
    }
    function Ns(o) {
      return er(this, o).delete(o);
    }
    function Ts(o) {
      return er(this, o).get(o);
    }
    function _s(o) {
      return er(this, o).has(o);
    }
    function Ss(o, u) {
      return er(this, o).set(o, u), this;
    }
    Re.prototype.clear = Es, Re.prototype.delete = Ns, Re.prototype.get = Ts, Re.prototype.has = _s, Re.prototype.set = Ss;
    function Ve(o) {
      this.__data__ = new Ce(o);
    }
    function ks() {
      this.__data__ = new Ce();
    }
    function Cs(o) {
      return this.__data__.delete(o);
    }
    function Ls(o) {
      return this.__data__.get(o);
    }
    function qs(o) {
      return this.__data__.has(o);
    }
    function Os(o, u) {
      var v = this.__data__;
      if (v instanceof Ce) {
        var O = v.__data__;
        if (!Et || O.length < t - 1)
          return O.push([o, u]), this;
        v = this.__data__ = new Re(O);
      }
      return v.set(o, u), this;
    }
    Ve.prototype.clear = ks, Ve.prototype.delete = Cs, Ve.prototype.get = Ls, Ve.prototype.has = qs, Ve.prototype.set = Os;
    function yr(o, u) {
      var v = Yr(o) || wr(o) ? de(o.length, String) : [], O = v.length, te = !!O;
      for (var Z in o)
        je.call(o, Z) && !(te && (Z == "length" || Ks(Z, O))) && v.push(Z);
      return v;
    }
    function _n(o, u, v) {
      var O = o[u];
      (!(je.call(o, u) && qn(O, v)) || v === void 0 && !(u in o)) && (o[u] = v);
    }
    function vr(o, u) {
      for (var v = o.length; v--; )
        if (qn(o[v][0], u))
          return v;
      return -1;
    }
    function dt(o, u) {
      return o && Zr(u, Qr(u), o);
    }
    function Gr(o, u, v, O, te, Z, he) {
      var ce;
      if (O && (ce = Z ? O(o, te, Z, he) : O(o)), ce !== void 0)
        return ce;
      if (!ft(o))
        return o;
      var Ne = Yr(o);
      if (Ne) {
        if (ce = Hs(o), !u)
          return js(o, ce);
      } else {
        var me = _t(o), $e = me == x || me == g;
        if (On(o))
          return xr(o, u);
        if (me == _ || me == i || $e && !Z) {
          if (Ee(o))
            return Z ? o : {};
          if (ce = ht($e ? {} : o), !u)
            return Us(o, dt(ce, o));
        } else {
          if (!D[me])
            return Z ? o : {};
          ce = Vs(o, me, Gr, u);
        }
      }
      he || (he = new Ve());
      var Ke = he.get(o);
      if (Ke)
        return Ke;
      if (he.set(o, ce), !Ne)
        var _e = v ? zs(o) : Qr(o);
      return ue(_e || o, function(De, Le) {
        _e && (Le = De, De = o[Le]), _n(ce, Le, Gr(De, u, v, O, Le, o, he));
      }), ce;
    }
    function Is(o) {
      return ft(o) ? C(o) : {};
    }
    function Rs(o, u, v) {
      var O = u(o);
      return Yr(o) ? O : ae(O, v(o));
    }
    function $s(o) {
      return $t.call(o);
    }
    function Ds(o) {
      if (!ft(o) || Ws(o))
        return !1;
      var u = Xr(o) || Ee(o) ? Pr : N;
      return u.test(Ue(o));
    }
    function Bs(o) {
      if (!Cn(o))
        return gr(o);
      var u = [];
      for (var v in Object(o))
        je.call(o, v) && v != "constructor" && u.push(v);
      return u;
    }
    function xr(o, u) {
      if (u)
        return o.slice();
      var v = new o.constructor(o.length);
      return o.copy(v), v;
    }
    function Wr(o) {
      var u = new o.constructor(o.byteLength);
      return new T(u).set(new T(o)), u;
    }
    function Jt(o, u) {
      var v = u ? Wr(o.buffer) : o.buffer;
      return new o.constructor(v, o.byteOffset, o.byteLength);
    }
    function Sn(o, u, v) {
      var O = u ? v(ke(o), !0) : ke(o);
      return le(O, ye, new o.constructor());
    }
    function kn(o) {
      var u = new o.constructor(o.source, E.exec(o));
      return u.lastIndex = o.lastIndex, u;
    }
    function Ms(o, u, v) {
      var O = u ? v(mr(o), !0) : mr(o);
      return le(O, J, new o.constructor());
    }
    function Fs(o) {
      return Nn ? Object(Nn.call(o)) : {};
    }
    function Ps(o, u) {
      var v = u ? Wr(o.buffer) : o.buffer;
      return new o.constructor(v, o.byteOffset, o.length);
    }
    function js(o, u) {
      var v = -1, O = o.length;
      for (u || (u = Array(O)); ++v < O; )
        u[v] = o[v];
      return u;
    }
    function Zr(o, u, v, O) {
      v || (v = {});
      for (var te = -1, Z = u.length; ++te < Z; ) {
        var he = u[te], ce = void 0;
        _n(v, he, ce === void 0 ? o[he] : ce);
      }
      return v;
    }
    function Us(o, u) {
      return Zr(o, Tt(o), u);
    }
    function zs(o) {
      return Rs(o, Qr, Tt);
    }
    function er(o, u) {
      var v = o.__data__;
      return Gs(u) ? v[typeof u == "string" ? "string" : "hash"] : v.map;
    }
    function et(o, u) {
      var v = pe(o, u);
      return Ds(v) ? v : void 0;
    }
    var Tt = fe ? Zt(fe, Object) : Ys, _t = $s;
    (At && _t(new At(new ArrayBuffer(1))) != ie || Et && _t(new Et()) != h || Te && _t(Te.resolve()) != k || br && _t(new br()) != I || jr && _t(new jr()) != W) && (_t = function(o) {
      var u = $t.call(o), v = u == _ ? o.constructor : void 0, O = v ? Ue(v) : void 0;
      if (O)
        switch (O) {
          case Ur:
            return ie;
          case Qt:
            return h;
          case zr:
            return k;
          case Hr:
            return I;
          case Vr:
            return W;
        }
      return u;
    });
    function Hs(o) {
      var u = o.length, v = o.constructor(u);
      return u && typeof o[0] == "string" && je.call(o, "index") && (v.index = o.index, v.input = o.input), v;
    }
    function ht(o) {
      return typeof o.constructor == "function" && !Cn(o) ? Is(y(o)) : {};
    }
    function Vs(o, u, v, O) {
      var te = o.constructor;
      switch (u) {
        case V:
          return Wr(o);
        case l:
        case c:
          return new te(+o);
        case ie:
          return Jt(o, O);
        case re:
        case ge:
        case Ae:
        case we:
        case b:
        case M:
        case S:
        case L:
        case f:
          return Ps(o, O);
        case h:
          return Sn(o, O, v);
        case m:
        case P:
          return new te(o);
        case q:
          return kn(o);
        case I:
          return Ms(o, O, v);
        case U:
          return Fs(o);
      }
    }
    function Ks(o, u) {
      return u = u ?? s, !!u && (typeof o == "number" || A.test(o)) && o > -1 && o % 1 == 0 && o < u;
    }
    function Gs(o) {
      var u = typeof o;
      return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? o !== "__proto__" : o === null;
    }
    function Ws(o) {
      return !!Yt && Yt in o;
    }
    function Cn(o) {
      var u = o && o.constructor, v = typeof u == "function" && u.prototype || yt;
      return o === v;
    }
    function Ue(o) {
      if (o != null) {
        try {
          return vt.call(o);
        } catch {
        }
        try {
          return o + "";
        } catch {
        }
      }
      return "";
    }
    function Ln(o) {
      return Gr(o, !0, !0);
    }
    function qn(o, u) {
      return o === u || o !== o && u !== u;
    }
    function wr(o) {
      return Zs(o) && je.call(o, "callee") && (!R.call(o, "callee") || $t.call(o) == i);
    }
    var Yr = Array.isArray;
    function Ar(o) {
      return o != null && In(o.length) && !Xr(o);
    }
    function Zs(o) {
      return Rn(o) && Ar(o);
    }
    var On = Ie || Xs;
    function Xr(o) {
      var u = ft(o) ? $t.call(o) : "";
      return u == x || u == g;
    }
    function In(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= s;
    }
    function ft(o) {
      var u = typeof o;
      return !!o && (u == "object" || u == "function");
    }
    function Rn(o) {
      return !!o && typeof o == "object";
    }
    function Qr(o) {
      return Ar(o) ? yr(o) : Bs(o);
    }
    function Ys() {
      return [];
    }
    function Xs() {
      return !1;
    }
    n.exports = Ln;
  })(rn, rn.exports)), rn.exports;
}
var nn = { exports: {} };
nn.exports;
var Do;
function dl() {
  return Do || (Do = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 1, i = 2, a = 9007199254740991, l = "[object Arguments]", c = "[object Array]", d = "[object AsyncFunction]", x = "[object Boolean]", g = "[object Date]", h = "[object Error]", m = "[object Function]", _ = "[object GeneratorFunction]", k = "[object Map]", q = "[object Number]", I = "[object Null]", P = "[object Object]", U = "[object Promise]", W = "[object Proxy]", V = "[object RegExp]", ie = "[object Set]", re = "[object String]", ge = "[object Symbol]", Ae = "[object Undefined]", we = "[object WeakMap]", b = "[object ArrayBuffer]", M = "[object DataView]", S = "[object Float32Array]", L = "[object Float64Array]", f = "[object Int8Array]", p = "[object Int16Array]", E = "[object Int32Array]", N = "[object Uint8Array]", A = "[object Uint8ClampedArray]", D = "[object Uint16Array]", j = "[object Uint32Array]", G = /[\\^$.*+?()[\]{}|]/g, Y = /^\[object .+?Constructor\]$/, oe = /^(?:0|[1-9]\d*)$/, X = {};
    X[S] = X[L] = X[f] = X[p] = X[E] = X[N] = X[A] = X[D] = X[j] = !0, X[l] = X[c] = X[b] = X[x] = X[M] = X[g] = X[h] = X[m] = X[k] = X[q] = X[P] = X[V] = X[ie] = X[re] = X[we] = !1;
    var be = typeof jt == "object" && jt && jt.Object === Object && jt, ye = typeof self == "object" && self && self.Object === Object && self, J = be || ye || Function("return this")(), ue = e && !e.nodeType && e, ae = ue && !0 && n && !n.nodeType && n, le = ae && ae.exports === ue, de = le && be.process, pe = (function() {
      try {
        return de && de.binding && de.binding("util");
      } catch {
      }
    })(), Ee = pe && pe.isTypedArray;
    function ke(o, u) {
      for (var v = -1, O = o == null ? 0 : o.length, te = 0, Z = []; ++v < O; ) {
        var he = o[v];
        u(he, v, o) && (Z[te++] = he);
      }
      return Z;
    }
    function Zt(o, u) {
      for (var v = -1, O = u.length, te = o.length; ++v < O; )
        o[te + v] = u[v];
      return o;
    }
    function mr(o, u) {
      for (var v = -1, O = o == null ? 0 : o.length; ++v < O; )
        if (u(o[v], v, o))
          return !0;
      return !1;
    }
    function Mr(o, u) {
      for (var v = -1, O = Array(o); ++v < o; )
        O[v] = u(v);
      return O;
    }
    function Fr(o) {
      return function(u) {
        return o(u);
      };
    }
    function yt(o, u) {
      return o.has(u);
    }
    function ut(o, u) {
      return o?.[u];
    }
    function Yt(o) {
      var u = -1, v = Array(o.size);
      return o.forEach(function(O, te) {
        v[++u] = [te, O];
      }), v;
    }
    function vt(o, u) {
      return function(v) {
        return o(u(v));
      };
    }
    function je(o) {
      var u = -1, v = Array(o.size);
      return o.forEach(function(O) {
        v[++u] = O;
      }), v;
    }
    var $t = Array.prototype, Pr = Function.prototype, xt = Object.prototype, wt = J["__core-js_shared__"], T = Pr.toString, y = xt.hasOwnProperty, C = (function() {
      var o = /[^.]+$/.exec(wt && wt.keys && wt.keys.IE_PROTO || "");
      return o ? "Symbol(src)_1." + o : "";
    })(), R = xt.toString, ne = RegExp(
      "^" + T.call(y).replace(G, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), fe = le ? J.Buffer : void 0, Ie = J.Symbol, gr = J.Uint8Array, At = xt.propertyIsEnumerable, Et = $t.splice, Te = Ie ? Ie.toStringTag : void 0, br = Object.getOwnPropertySymbols, jr = fe ? fe.isBuffer : void 0, Xt = vt(Object.keys, Object), Ur = Tt(J, "DataView"), Qt = Tt(J, "Map"), zr = Tt(J, "Promise"), Hr = Tt(J, "Set"), Vr = Tt(J, "WeakMap"), Dt = Tt(Object, "create"), Nn = Ue(Ur), Nt = Ue(Qt), ms = Ue(zr), gs = Ue(Hr), bs = Ue(Vr), Tn = Ie ? Ie.prototype : void 0, Kr = Tn ? Tn.valueOf : void 0;
    function Ce(o) {
      var u = -1, v = o == null ? 0 : o.length;
      for (this.clear(); ++u < v; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function ys() {
      this.__data__ = Dt ? Dt(null) : {}, this.size = 0;
    }
    function vs(o) {
      var u = this.has(o) && delete this.__data__[o];
      return this.size -= u ? 1 : 0, u;
    }
    function xs(o) {
      var u = this.__data__;
      if (Dt) {
        var v = u[o];
        return v === r ? void 0 : v;
      }
      return y.call(u, o) ? u[o] : void 0;
    }
    function ws(o) {
      var u = this.__data__;
      return Dt ? u[o] !== void 0 : y.call(u, o);
    }
    function As(o, u) {
      var v = this.__data__;
      return this.size += this.has(o) ? 0 : 1, v[o] = Dt && u === void 0 ? r : u, this;
    }
    Ce.prototype.clear = ys, Ce.prototype.delete = vs, Ce.prototype.get = xs, Ce.prototype.has = ws, Ce.prototype.set = As;
    function Re(o) {
      var u = -1, v = o == null ? 0 : o.length;
      for (this.clear(); ++u < v; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function Es() {
      this.__data__ = [], this.size = 0;
    }
    function Ns(o) {
      var u = this.__data__, v = xr(u, o);
      if (v < 0)
        return !1;
      var O = u.length - 1;
      return v == O ? u.pop() : Et.call(u, v, 1), --this.size, !0;
    }
    function Ts(o) {
      var u = this.__data__, v = xr(u, o);
      return v < 0 ? void 0 : u[v][1];
    }
    function _s(o) {
      return xr(this.__data__, o) > -1;
    }
    function Ss(o, u) {
      var v = this.__data__, O = xr(v, o);
      return O < 0 ? (++this.size, v.push([o, u])) : v[O][1] = u, this;
    }
    Re.prototype.clear = Es, Re.prototype.delete = Ns, Re.prototype.get = Ts, Re.prototype.has = _s, Re.prototype.set = Ss;
    function Ve(o) {
      var u = -1, v = o == null ? 0 : o.length;
      for (this.clear(); ++u < v; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function ks() {
      this.size = 0, this.__data__ = {
        hash: new Ce(),
        map: new (Qt || Re)(),
        string: new Ce()
      };
    }
    function Cs(o) {
      var u = et(this, o).delete(o);
      return this.size -= u ? 1 : 0, u;
    }
    function Ls(o) {
      return et(this, o).get(o);
    }
    function qs(o) {
      return et(this, o).has(o);
    }
    function Os(o, u) {
      var v = et(this, o), O = v.size;
      return v.set(o, u), this.size += v.size == O ? 0 : 1, this;
    }
    Ve.prototype.clear = ks, Ve.prototype.delete = Cs, Ve.prototype.get = Ls, Ve.prototype.has = qs, Ve.prototype.set = Os;
    function yr(o) {
      var u = -1, v = o == null ? 0 : o.length;
      for (this.__data__ = new Ve(); ++u < v; )
        this.add(o[u]);
    }
    function _n(o) {
      return this.__data__.set(o, r), this;
    }
    function vr(o) {
      return this.__data__.has(o);
    }
    yr.prototype.add = yr.prototype.push = _n, yr.prototype.has = vr;
    function dt(o) {
      var u = this.__data__ = new Re(o);
      this.size = u.size;
    }
    function Gr() {
      this.__data__ = new Re(), this.size = 0;
    }
    function Is(o) {
      var u = this.__data__, v = u.delete(o);
      return this.size = u.size, v;
    }
    function Rs(o) {
      return this.__data__.get(o);
    }
    function $s(o) {
      return this.__data__.has(o);
    }
    function Ds(o, u) {
      var v = this.__data__;
      if (v instanceof Re) {
        var O = v.__data__;
        if (!Qt || O.length < t - 1)
          return O.push([o, u]), this.size = ++v.size, this;
        v = this.__data__ = new Ve(O);
      }
      return v.set(o, u), this.size = v.size, this;
    }
    dt.prototype.clear = Gr, dt.prototype.delete = Is, dt.prototype.get = Rs, dt.prototype.has = $s, dt.prototype.set = Ds;
    function Bs(o, u) {
      var v = wr(o), O = !v && qn(o), te = !v && !O && Ar(o), Z = !v && !O && !te && Rn(o), he = v || O || te || Z, ce = he ? Mr(o.length, String) : [], Ne = ce.length;
      for (var me in o)
        y.call(o, me) && !(he && // Safari 9 has enumerable `arguments.length` in strict mode.
        (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        te && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Z && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
        Vs(me, Ne))) && ce.push(me);
      return ce;
    }
    function xr(o, u) {
      for (var v = o.length; v--; )
        if (Ln(o[v][0], u))
          return v;
      return -1;
    }
    function Wr(o, u, v) {
      var O = u(o);
      return wr(o) ? O : Zt(O, v(o));
    }
    function Jt(o) {
      return o == null ? o === void 0 ? Ae : I : Te && Te in Object(o) ? _t(o) : Cn(o);
    }
    function Sn(o) {
      return ft(o) && Jt(o) == l;
    }
    function kn(o, u, v, O, te) {
      return o === u ? !0 : o == null || u == null || !ft(o) && !ft(u) ? o !== o && u !== u : Ms(o, u, v, O, kn, te);
    }
    function Ms(o, u, v, O, te, Z) {
      var he = wr(o), ce = wr(u), Ne = he ? c : ht(o), me = ce ? c : ht(u);
      Ne = Ne == l ? P : Ne, me = me == l ? P : me;
      var $e = Ne == P, Ke = me == P, _e = Ne == me;
      if (_e && Ar(o)) {
        if (!Ar(u))
          return !1;
        he = !0, $e = !1;
      }
      if (_e && !$e)
        return Z || (Z = new dt()), he || Rn(o) ? Zr(o, u, v, O, te, Z) : Us(o, u, Ne, v, O, te, Z);
      if (!(v & s)) {
        var De = $e && y.call(o, "__wrapped__"), Le = Ke && y.call(u, "__wrapped__");
        if (De || Le) {
          var Bt = De ? o.value() : o, St = Le ? u.value() : u;
          return Z || (Z = new dt()), te(Bt, St, v, O, Z);
        }
      }
      return _e ? (Z || (Z = new dt()), zs(o, u, v, O, te, Z)) : !1;
    }
    function Fs(o) {
      if (!In(o) || Gs(o))
        return !1;
      var u = On(o) ? ne : Y;
      return u.test(Ue(o));
    }
    function Ps(o) {
      return ft(o) && Xr(o.length) && !!X[Jt(o)];
    }
    function js(o) {
      if (!Ws(o))
        return Xt(o);
      var u = [];
      for (var v in Object(o))
        y.call(o, v) && v != "constructor" && u.push(v);
      return u;
    }
    function Zr(o, u, v, O, te, Z) {
      var he = v & s, ce = o.length, Ne = u.length;
      if (ce != Ne && !(he && Ne > ce))
        return !1;
      var me = Z.get(o);
      if (me && Z.get(u))
        return me == u;
      var $e = -1, Ke = !0, _e = v & i ? new yr() : void 0;
      for (Z.set(o, u), Z.set(u, o); ++$e < ce; ) {
        var De = o[$e], Le = u[$e];
        if (O)
          var Bt = he ? O(Le, De, $e, u, o, Z) : O(De, Le, $e, o, u, Z);
        if (Bt !== void 0) {
          if (Bt)
            continue;
          Ke = !1;
          break;
        }
        if (_e) {
          if (!mr(u, function(St, tr) {
            if (!yt(_e, tr) && (De === St || te(De, St, v, O, Z)))
              return _e.push(tr);
          })) {
            Ke = !1;
            break;
          }
        } else if (!(De === Le || te(De, Le, v, O, Z))) {
          Ke = !1;
          break;
        }
      }
      return Z.delete(o), Z.delete(u), Ke;
    }
    function Us(o, u, v, O, te, Z, he) {
      switch (v) {
        case M:
          if (o.byteLength != u.byteLength || o.byteOffset != u.byteOffset)
            return !1;
          o = o.buffer, u = u.buffer;
        case b:
          return !(o.byteLength != u.byteLength || !Z(new gr(o), new gr(u)));
        case x:
        case g:
        case q:
          return Ln(+o, +u);
        case h:
          return o.name == u.name && o.message == u.message;
        case V:
        case re:
          return o == u + "";
        case k:
          var ce = Yt;
        case ie:
          var Ne = O & s;
          if (ce || (ce = je), o.size != u.size && !Ne)
            return !1;
          var me = he.get(o);
          if (me)
            return me == u;
          O |= i, he.set(o, u);
          var $e = Zr(ce(o), ce(u), O, te, Z, he);
          return he.delete(o), $e;
        case ge:
          if (Kr)
            return Kr.call(o) == Kr.call(u);
      }
      return !1;
    }
    function zs(o, u, v, O, te, Z) {
      var he = v & s, ce = er(o), Ne = ce.length, me = er(u), $e = me.length;
      if (Ne != $e && !he)
        return !1;
      for (var Ke = Ne; Ke--; ) {
        var _e = ce[Ke];
        if (!(he ? _e in u : y.call(u, _e)))
          return !1;
      }
      var De = Z.get(o);
      if (De && Z.get(u))
        return De == u;
      var Le = !0;
      Z.set(o, u), Z.set(u, o);
      for (var Bt = he; ++Ke < Ne; ) {
        _e = ce[Ke];
        var St = o[_e], tr = u[_e];
        if (O)
          var so = he ? O(tr, St, _e, u, o, Z) : O(St, tr, _e, o, u, Z);
        if (!(so === void 0 ? St === tr || te(St, tr, v, O, Z) : so)) {
          Le = !1;
          break;
        }
        Bt || (Bt = _e == "constructor");
      }
      if (Le && !Bt) {
        var $n = o.constructor, Dn = u.constructor;
        $n != Dn && "constructor" in o && "constructor" in u && !(typeof $n == "function" && $n instanceof $n && typeof Dn == "function" && Dn instanceof Dn) && (Le = !1);
      }
      return Z.delete(o), Z.delete(u), Le;
    }
    function er(o) {
      return Wr(o, Qr, Hs);
    }
    function et(o, u) {
      var v = o.__data__;
      return Ks(u) ? v[typeof u == "string" ? "string" : "hash"] : v.map;
    }
    function Tt(o, u) {
      var v = ut(o, u);
      return Fs(v) ? v : void 0;
    }
    function _t(o) {
      var u = y.call(o, Te), v = o[Te];
      try {
        o[Te] = void 0;
        var O = !0;
      } catch {
      }
      var te = R.call(o);
      return O && (u ? o[Te] = v : delete o[Te]), te;
    }
    var Hs = br ? function(o) {
      return o == null ? [] : (o = Object(o), ke(br(o), function(u) {
        return At.call(o, u);
      }));
    } : Ys, ht = Jt;
    (Ur && ht(new Ur(new ArrayBuffer(1))) != M || Qt && ht(new Qt()) != k || zr && ht(zr.resolve()) != U || Hr && ht(new Hr()) != ie || Vr && ht(new Vr()) != we) && (ht = function(o) {
      var u = Jt(o), v = u == P ? o.constructor : void 0, O = v ? Ue(v) : "";
      if (O)
        switch (O) {
          case Nn:
            return M;
          case Nt:
            return k;
          case ms:
            return U;
          case gs:
            return ie;
          case bs:
            return we;
        }
      return u;
    });
    function Vs(o, u) {
      return u = u ?? a, !!u && (typeof o == "number" || oe.test(o)) && o > -1 && o % 1 == 0 && o < u;
    }
    function Ks(o) {
      var u = typeof o;
      return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? o !== "__proto__" : o === null;
    }
    function Gs(o) {
      return !!C && C in o;
    }
    function Ws(o) {
      var u = o && o.constructor, v = typeof u == "function" && u.prototype || xt;
      return o === v;
    }
    function Cn(o) {
      return R.call(o);
    }
    function Ue(o) {
      if (o != null) {
        try {
          return T.call(o);
        } catch {
        }
        try {
          return o + "";
        } catch {
        }
      }
      return "";
    }
    function Ln(o, u) {
      return o === u || o !== o && u !== u;
    }
    var qn = Sn(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Sn : function(o) {
      return ft(o) && y.call(o, "callee") && !At.call(o, "callee");
    }, wr = Array.isArray;
    function Yr(o) {
      return o != null && Xr(o.length) && !On(o);
    }
    var Ar = jr || Xs;
    function Zs(o, u) {
      return kn(o, u);
    }
    function On(o) {
      if (!In(o))
        return !1;
      var u = Jt(o);
      return u == m || u == _ || u == d || u == W;
    }
    function Xr(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= a;
    }
    function In(o) {
      var u = typeof o;
      return o != null && (u == "object" || u == "function");
    }
    function ft(o) {
      return o != null && typeof o == "object";
    }
    var Rn = Ee ? Fr(Ee) : Ps;
    function Qr(o) {
      return Yr(o) ? Bs(o) : js(o);
    }
    function Ys() {
      return [];
    }
    function Xs() {
      return !1;
    }
    n.exports = Zs;
  })(nn, nn.exports)), nn.exports;
}
var Fn = {}, Bo;
function Dp() {
  if (Bo) return Fn;
  Bo = 1, Object.defineProperty(Fn, "__esModule", { value: !0 });
  const n = ul(), e = dl();
  var t;
  return (function(r) {
    function s(c = {}, d = {}, x = !1) {
      typeof c != "object" && (c = {}), typeof d != "object" && (d = {});
      let g = n(d);
      x || (g = Object.keys(g).reduce((h, m) => (g[m] != null && (h[m] = g[m]), h), {}));
      for (const h in c)
        c[h] !== void 0 && d[h] === void 0 && (g[h] = c[h]);
      return Object.keys(g).length > 0 ? g : void 0;
    }
    r.compose = s;
    function i(c = {}, d = {}) {
      typeof c != "object" && (c = {}), typeof d != "object" && (d = {});
      const x = Object.keys(c).concat(Object.keys(d)).reduce((g, h) => (e(c[h], d[h]) || (g[h] = d[h] === void 0 ? null : d[h]), g), {});
      return Object.keys(x).length > 0 ? x : void 0;
    }
    r.diff = i;
    function a(c = {}, d = {}) {
      c = c || {};
      const x = Object.keys(d).reduce((g, h) => (d[h] !== c[h] && c[h] !== void 0 && (g[h] = d[h]), g), {});
      return Object.keys(c).reduce((g, h) => (c[h] !== d[h] && d[h] === void 0 && (g[h] = null), g), x);
    }
    r.invert = a;
    function l(c, d, x = !1) {
      if (typeof c != "object")
        return d;
      if (typeof d != "object")
        return;
      if (!x)
        return d;
      const g = Object.keys(d).reduce((h, m) => (c[m] === void 0 && (h[m] = d[m]), h), {});
      return Object.keys(g).length > 0 ? g : void 0;
    }
    r.transform = l;
  })(t || (t = {})), Fn.default = t, Fn;
}
var Pn = {}, Mo;
function hl() {
  if (Mo) return Pn;
  Mo = 1, Object.defineProperty(Pn, "__esModule", { value: !0 });
  var n;
  return (function(e) {
    function t(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    e.length = t;
  })(n || (n = {})), Pn.default = n, Pn;
}
var jn = {}, Fo;
function Bp() {
  if (Fo) return jn;
  Fo = 1, Object.defineProperty(jn, "__esModule", { value: !0 });
  const n = hl();
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
  return jn.default = e, jn;
}
var Po;
function Mp() {
  return Po || (Po = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = $p(), r = ul(), s = dl(), i = Dp();
    e.AttributeMap = i.default;
    const a = hl();
    e.Op = a.default;
    const l = Bp();
    e.OpIterator = l.default;
    const c = "\0", d = (g, h) => {
      if (typeof g != "object" || g === null)
        throw new Error(`cannot retain a ${typeof g}`);
      if (typeof h != "object" || h === null)
        throw new Error(`cannot retain a ${typeof h}`);
      const m = Object.keys(g)[0];
      if (!m || m !== Object.keys(h)[0])
        throw new Error(`embed types not matched: ${m} != ${Object.keys(h)[0]}`);
      return [m, g[m], h[m]];
    };
    class x {
      constructor(h) {
        Array.isArray(h) ? this.ops = h : h != null && Array.isArray(h.ops) ? this.ops = h.ops : this.ops = [];
      }
      static registerEmbed(h, m) {
        this.handlers[h] = m;
      }
      static unregisterEmbed(h) {
        delete this.handlers[h];
      }
      static getHandler(h) {
        const m = this.handlers[h];
        if (!m)
          throw new Error(`no handlers for embed type "${h}"`);
        return m;
      }
      insert(h, m) {
        const _ = {};
        return typeof h == "string" && h.length === 0 ? this : (_.insert = h, m != null && typeof m == "object" && Object.keys(m).length > 0 && (_.attributes = m), this.push(_));
      }
      delete(h) {
        return h <= 0 ? this : this.push({ delete: h });
      }
      retain(h, m) {
        if (typeof h == "number" && h <= 0)
          return this;
        const _ = { retain: h };
        return m != null && typeof m == "object" && Object.keys(m).length > 0 && (_.attributes = m), this.push(_);
      }
      push(h) {
        let m = this.ops.length, _ = this.ops[m - 1];
        if (h = r(h), typeof _ == "object") {
          if (typeof h.delete == "number" && typeof _.delete == "number")
            return this.ops[m - 1] = { delete: _.delete + h.delete }, this;
          if (typeof _.delete == "number" && h.insert != null && (m -= 1, _ = this.ops[m - 1], typeof _ != "object"))
            return this.ops.unshift(h), this;
          if (s(h.attributes, _.attributes)) {
            if (typeof h.insert == "string" && typeof _.insert == "string")
              return this.ops[m - 1] = { insert: _.insert + h.insert }, typeof h.attributes == "object" && (this.ops[m - 1].attributes = h.attributes), this;
            if (typeof h.retain == "number" && typeof _.retain == "number")
              return this.ops[m - 1] = { retain: _.retain + h.retain }, typeof h.attributes == "object" && (this.ops[m - 1].attributes = h.attributes), this;
          }
        }
        return m === this.ops.length ? this.ops.push(h) : this.ops.splice(m, 0, h), this;
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
        const m = [], _ = [];
        return this.forEach((k) => {
          (h(k) ? m : _).push(k);
        }), [m, _];
      }
      reduce(h, m) {
        return this.ops.reduce(h, m);
      }
      changeLength() {
        return this.reduce((h, m) => m.insert ? h + a.default.length(m) : m.delete ? h - m.delete : h, 0);
      }
      length() {
        return this.reduce((h, m) => h + a.default.length(m), 0);
      }
      slice(h = 0, m = 1 / 0) {
        const _ = [], k = new l.default(this.ops);
        let q = 0;
        for (; q < m && k.hasNext(); ) {
          let I;
          q < h ? I = k.next(h - q) : (I = k.next(m - q), _.push(I)), q += a.default.length(I);
        }
        return new x(_);
      }
      compose(h) {
        const m = new l.default(this.ops), _ = new l.default(h.ops), k = [], q = _.peek();
        if (q != null && typeof q.retain == "number" && q.attributes == null) {
          let P = q.retain;
          for (; m.peekType() === "insert" && m.peekLength() <= P; )
            P -= m.peekLength(), k.push(m.next());
          q.retain - P > 0 && _.next(q.retain - P);
        }
        const I = new x(k);
        for (; m.hasNext() || _.hasNext(); )
          if (_.peekType() === "insert")
            I.push(_.next());
          else if (m.peekType() === "delete")
            I.push(m.next());
          else {
            const P = Math.min(m.peekLength(), _.peekLength()), U = m.next(P), W = _.next(P);
            if (W.retain) {
              const V = {};
              if (typeof U.retain == "number")
                V.retain = typeof W.retain == "number" ? P : W.retain;
              else if (typeof W.retain == "number")
                U.retain == null ? V.insert = U.insert : V.retain = U.retain;
              else {
                const re = U.retain == null ? "insert" : "retain", [ge, Ae, we] = d(U[re], W.retain), b = x.getHandler(ge);
                V[re] = {
                  [ge]: b.compose(Ae, we, re === "retain")
                };
              }
              const ie = i.default.compose(U.attributes, W.attributes, typeof U.retain == "number");
              if (ie && (V.attributes = ie), I.push(V), !_.hasNext() && s(I.ops[I.ops.length - 1], V)) {
                const re = new x(m.rest());
                return I.concat(re).chop();
              }
            } else typeof W.delete == "number" && (typeof U.retain == "number" || typeof U.retain == "object" && U.retain !== null) && I.push(W);
          }
        return I.chop();
      }
      concat(h) {
        const m = new x(this.ops.slice());
        return h.ops.length > 0 && (m.push(h.ops[0]), m.ops = m.ops.concat(h.ops.slice(1))), m;
      }
      diff(h, m) {
        if (this.ops === h.ops)
          return new x();
        const _ = [this, h].map((U) => U.map((W) => {
          if (W.insert != null)
            return typeof W.insert == "string" ? W.insert : c;
          const V = U === h ? "on" : "with";
          throw new Error("diff() called " + V + " non-document");
        }).join("")), k = new x(), q = t(_[0], _[1], m, !0), I = new l.default(this.ops), P = new l.default(h.ops);
        return q.forEach((U) => {
          let W = U[1].length;
          for (; W > 0; ) {
            let V = 0;
            switch (U[0]) {
              case t.INSERT:
                V = Math.min(P.peekLength(), W), k.push(P.next(V));
                break;
              case t.DELETE:
                V = Math.min(W, I.peekLength()), I.next(V), k.delete(V);
                break;
              case t.EQUAL:
                V = Math.min(I.peekLength(), P.peekLength(), W);
                const ie = I.next(V), re = P.next(V);
                s(ie.insert, re.insert) ? k.retain(V, i.default.diff(ie.attributes, re.attributes)) : k.push(re).delete(V);
                break;
            }
            W -= V;
          }
        }), k.chop();
      }
      eachLine(h, m = `
`) {
        const _ = new l.default(this.ops);
        let k = new x(), q = 0;
        for (; _.hasNext(); ) {
          if (_.peekType() !== "insert")
            return;
          const I = _.peek(), P = a.default.length(I) - _.peekLength(), U = typeof I.insert == "string" ? I.insert.indexOf(m, P) - P : -1;
          if (U < 0)
            k.push(_.next());
          else if (U > 0)
            k.push(_.next(U));
          else {
            if (h(k, _.next(1).attributes || {}, q) === !1)
              return;
            q += 1, k = new x();
          }
        }
        k.length() > 0 && h(k, {}, q);
      }
      invert(h) {
        const m = new x();
        return this.reduce((_, k) => {
          if (k.insert)
            m.delete(a.default.length(k));
          else {
            if (typeof k.retain == "number" && k.attributes == null)
              return m.retain(k.retain), _ + k.retain;
            if (k.delete || typeof k.retain == "number") {
              const q = k.delete || k.retain;
              return h.slice(_, _ + q).forEach((P) => {
                k.delete ? m.push(P) : k.retain && k.attributes && m.retain(a.default.length(P), i.default.invert(k.attributes, P.attributes));
              }), _ + q;
            } else if (typeof k.retain == "object" && k.retain !== null) {
              const q = h.slice(_, _ + 1), I = new l.default(q.ops).next(), [P, U, W] = d(k.retain, I.insert), V = x.getHandler(P);
              return m.retain({ [P]: V.invert(U, W) }, i.default.invert(k.attributes, I.attributes)), _ + 1;
            }
          }
          return _;
        }, 0), m.chop();
      }
      transform(h, m = !1) {
        if (m = !!m, typeof h == "number")
          return this.transformPosition(h, m);
        const _ = h, k = new l.default(this.ops), q = new l.default(_.ops), I = new x();
        for (; k.hasNext() || q.hasNext(); )
          if (k.peekType() === "insert" && (m || q.peekType() !== "insert"))
            I.retain(a.default.length(k.next()));
          else if (q.peekType() === "insert")
            I.push(q.next());
          else {
            const P = Math.min(k.peekLength(), q.peekLength()), U = k.next(P), W = q.next(P);
            if (U.delete)
              continue;
            if (W.delete)
              I.push(W);
            else {
              const V = U.retain, ie = W.retain;
              let re = typeof ie == "object" && ie !== null ? ie : P;
              if (typeof V == "object" && V !== null && typeof ie == "object" && ie !== null) {
                const ge = Object.keys(V)[0];
                if (ge === Object.keys(ie)[0]) {
                  const Ae = x.getHandler(ge);
                  Ae && (re = {
                    [ge]: Ae.transform(V[ge], ie[ge], m)
                  });
                }
              }
              I.retain(re, i.default.transform(U.attributes, W.attributes, m));
            }
          }
        return I.chop();
      }
      transformPosition(h, m = !1) {
        m = !!m;
        const _ = new l.default(this.ops);
        let k = 0;
        for (; _.hasNext() && k <= h; ) {
          const q = _.peekLength(), I = _.peekType();
          if (_.next(), I === "delete") {
            h -= Math.min(q, h - k);
            continue;
          } else I === "insert" && (k < h || !m) && (h += q);
          k += q;
        }
        return h;
      }
    }
    x.Op = a.default, x.OpIterator = l.default, x.AttributeMap = i.default, x.handlers = {}, e.default = x, n.exports = x, n.exports.default = x;
  })(Mn, Mn.exports)), Mn.exports;
}
var Je = Mp();
const H = /* @__PURE__ */ cl(Je);
class ct extends Ze {
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
ct.blotName = "break";
ct.tagName = "BR";
let at = class extends ts {
};
const Fp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function hs(n) {
  return n.replace(/[&<>"']/g, (e) => Fp[e]);
}
class ze extends Vi {
  static allowedChildren = [ze, ct, Ze, at];
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
    const r = ze.order.indexOf(e), s = ze.order.indexOf(t);
    return r >= 0 || s >= 0 ? r - s : e === t ? 0 : e < t ? -1 : 1;
  }
  formatAt(e, t, r, s) {
    if (ze.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, K.BLOT)) {
      const i = this.isolate(e, t);
      s && i.wrap(r, s);
    } else
      super.formatAt(e, t, r, s);
  }
  optimize(e) {
    if (super.optimize(e), this.parent instanceof ze && ze.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const t = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(t), t.wrap(this);
    }
  }
}
const jo = 1;
class Oe extends pn {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = fl(this)), this.cache.delta;
  }
  deleteAt(e, t) {
    super.deleteAt(e, t), this.cache = {};
  }
  formatAt(e, t, r, s) {
    t <= 0 || (this.scroll.query(r, K.BLOCK) ? e + t === this.length() && this.format(r, s) : super.formatAt(e, Math.min(t, this.length() - e - 1), r, s), this.cache = {});
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
    s.reduce((l, c) => (a = a.split(l, !0), a.insertAt(0, c), c.length), e + i.length);
  }
  insertBefore(e, t) {
    const {
      head: r
    } = this.children;
    super.insertBefore(e, t), r instanceof ct && r.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + jo), this.cache.length;
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
    if (t && (e === 0 || e >= this.length() - jo)) {
      const s = this.clone();
      return e === 0 ? (this.parent.insertBefore(s, this), this) : (this.parent.insertBefore(s, this.next), s);
    }
    const r = super.split(e, t);
    return this.cache = {}, r;
  }
}
Oe.blotName = "block";
Oe.tagName = "P";
Oe.defaultChild = ct;
Oe.allowedChildren = [ct, ze, Ze, at];
class Qe extends Ze {
  attach() {
    super.attach(), this.attributes = new us(this.domNode);
  }
  delta() {
    return new H().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(e, t) {
    const r = this.scroll.query(e, K.BLOCK_ATTRIBUTE);
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
`), i = s.pop(), a = s.map((c) => {
      const d = this.scroll.create(Oe.blotName);
      return d.insertAt(0, c), d;
    }), l = this.split(e);
    a.forEach((c) => {
      this.parent.insertBefore(c, l);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), l);
  }
}
Qe.scope = K.BLOCK_BLOT;
function fl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n.descendants(Me).reduce((t, r) => r.length() === 0 ? t : t.insert(r.value(), Ye(r, {}, e)), new H()).insert(`
`, Ye(n));
}
function Ye(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return n == null || ("formats" in n && typeof n.formats == "function" && (e = {
    ...e,
    ...n.formats()
  }, t && delete e["code-token"]), n.parent == null || n.parent.statics.blotName === "scroll" || n.parent.statics.scope !== n.statics.scope) ? e : Ye(n.parent, e, t);
}
class st extends Ze {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(e, t, r) {
    super(e, t), this.selection = r, this.textNode = document.createTextNode(st.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
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
    for (; r != null && r.statics.scope !== K.BLOCK_BLOT; )
      s += r.offset(r.parent), r = r.parent;
    r != null && (this.savedLength = st.CONTENTS.length, r.optimize(), r.formatAt(s, st.CONTENTS.length, e, t), this.savedLength = 0);
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
    const t = this.prev instanceof at ? this.prev : null, r = t ? t.length() : 0, s = this.next instanceof at ? this.next : null, i = s ? s.text : "", {
      textNode: a
    } = this, l = a.data.split(st.CONTENTS).join("");
    a.data = st.CONTENTS;
    let c;
    if (t)
      c = t, (l || s) && (t.insertAt(t.length(), l + i), s && s.remove());
    else if (s)
      c = s, s.insertAt(0, l);
    else {
      const d = document.createTextNode(l);
      c = this.scroll.create(d), this.parent.insertBefore(c, this);
    }
    if (this.remove(), e) {
      const d = (h, m) => t && h === t.domNode ? m : h === a ? r + m - 1 : s && h === s.domNode ? r + l.length + m : null, x = d(e.start.node, e.start.offset), g = d(e.end.node, e.end.offset);
      if (x !== null && g !== null)
        return {
          startNode: c.domNode,
          startOffset: x,
          endNode: c.domNode,
          endOffset: g
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
        this.savedLength = st.CONTENTS.length, t.isolate(this.offset(t), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      t = t.parent;
    }
  }
  value() {
    return "";
  }
}
var ni = { exports: {} }, Uo;
function Pp() {
  return Uo || (Uo = 1, (function(n) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (t = !1));
    function s(c, d, x) {
      this.fn = c, this.context = d, this.once = x || !1;
    }
    function i(c, d, x, g, h) {
      if (typeof x != "function")
        throw new TypeError("The listener must be a function");
      var m = new s(x, g || c, h), _ = t ? t + d : d;
      return c._events[_] ? c._events[_].fn ? c._events[_] = [c._events[_], m] : c._events[_].push(m) : (c._events[_] = m, c._eventsCount++), c;
    }
    function a(c, d) {
      --c._eventsCount === 0 ? c._events = new r() : delete c._events[d];
    }
    function l() {
      this._events = new r(), this._eventsCount = 0;
    }
    l.prototype.eventNames = function() {
      var d = [], x, g;
      if (this._eventsCount === 0) return d;
      for (g in x = this._events)
        e.call(x, g) && d.push(t ? g.slice(1) : g);
      return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(x)) : d;
    }, l.prototype.listeners = function(d) {
      var x = t ? t + d : d, g = this._events[x];
      if (!g) return [];
      if (g.fn) return [g.fn];
      for (var h = 0, m = g.length, _ = new Array(m); h < m; h++)
        _[h] = g[h].fn;
      return _;
    }, l.prototype.listenerCount = function(d) {
      var x = t ? t + d : d, g = this._events[x];
      return g ? g.fn ? 1 : g.length : 0;
    }, l.prototype.emit = function(d, x, g, h, m, _) {
      var k = t ? t + d : d;
      if (!this._events[k]) return !1;
      var q = this._events[k], I = arguments.length, P, U;
      if (q.fn) {
        switch (q.once && this.removeListener(d, q.fn, void 0, !0), I) {
          case 1:
            return q.fn.call(q.context), !0;
          case 2:
            return q.fn.call(q.context, x), !0;
          case 3:
            return q.fn.call(q.context, x, g), !0;
          case 4:
            return q.fn.call(q.context, x, g, h), !0;
          case 5:
            return q.fn.call(q.context, x, g, h, m), !0;
          case 6:
            return q.fn.call(q.context, x, g, h, m, _), !0;
        }
        for (U = 1, P = new Array(I - 1); U < I; U++)
          P[U - 1] = arguments[U];
        q.fn.apply(q.context, P);
      } else {
        var W = q.length, V;
        for (U = 0; U < W; U++)
          switch (q[U].once && this.removeListener(d, q[U].fn, void 0, !0), I) {
            case 1:
              q[U].fn.call(q[U].context);
              break;
            case 2:
              q[U].fn.call(q[U].context, x);
              break;
            case 3:
              q[U].fn.call(q[U].context, x, g);
              break;
            case 4:
              q[U].fn.call(q[U].context, x, g, h);
              break;
            default:
              if (!P) for (V = 1, P = new Array(I - 1); V < I; V++)
                P[V - 1] = arguments[V];
              q[U].fn.apply(q[U].context, P);
          }
      }
      return !0;
    }, l.prototype.on = function(d, x, g) {
      return i(this, d, x, g, !1);
    }, l.prototype.once = function(d, x, g) {
      return i(this, d, x, g, !0);
    }, l.prototype.removeListener = function(d, x, g, h) {
      var m = t ? t + d : d;
      if (!this._events[m]) return this;
      if (!x)
        return a(this, m), this;
      var _ = this._events[m];
      if (_.fn)
        _.fn === x && (!h || _.once) && (!g || _.context === g) && a(this, m);
      else {
        for (var k = 0, q = [], I = _.length; k < I; k++)
          (_[k].fn !== x || h && !_[k].once || g && _[k].context !== g) && q.push(_[k]);
        q.length ? this._events[m] = q.length === 1 ? q[0] : q : a(this, m);
      }
      return this;
    }, l.prototype.removeAllListeners = function(d) {
      var x;
      return d ? (x = t ? t + d : d, this._events[x] && a(this, x)) : (this._events = new r(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = t, l.EventEmitter = l, n.exports = l;
  })(ni)), ni.exports;
}
var jp = Pp();
const Up = /* @__PURE__ */ cl(jp), Si = /* @__PURE__ */ new WeakMap(), ki = ["error", "warn", "log", "info"];
let Ci = "warn";
function pl(n) {
  if (Ci && ki.indexOf(n) <= ki.indexOf(Ci)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
      t[r - 1] = arguments[r];
    console[n](...t);
  }
}
function Rt(n) {
  return ki.reduce((e, t) => (e[t] = pl.bind(console, t, n), e), {});
}
Rt.level = (n) => {
  Ci = n;
};
pl.level = Rt.level;
const si = Rt("quill:events"), zp = ["selectionchange", "mousedown", "mouseup", "click"];
zp.forEach((n) => {
  document.addEventListener(n, function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    Array.from(document.querySelectorAll(".ql-container")).forEach((s) => {
      const i = Si.get(s);
      i && i.emitter && i.emitter.handleDOM(...t);
    });
  });
});
class z extends Up {
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
    super(), this.domListeners = {}, this.on("error", si.error);
  }
  emit() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return si.log.call(si, ...t), super.emit(...t);
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
const ii = Rt("quill:selection");
class ar {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class Hp {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new ar(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, z.sources.USER), 1);
    }), this.emitter.on(z.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const r = this.getNativeRange();
      r != null && r.start.node !== this.cursor.textNode && this.emitter.once(z.events.SCROLL_UPDATE, (s, i) => {
        try {
          this.root.contains(r.start.node) && this.root.contains(r.end.node) && this.setNativeRange(r.start.node, r.start.offset, r.end.node, r.end.offset);
          const a = i.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(a ? z.sources.SILENT : s);
        } catch {
        }
      });
    }), this.emitter.on(z.events.SCROLL_OPTIMIZE, (r, s) => {
      if (s.range) {
        const {
          startNode: i,
          startOffset: a,
          endNode: l,
          endOffset: c
        } = s.range;
        this.setNativeRange(i, a, l, c), this.update(z.sources.SILENT);
      }
    }), this.update(z.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(z.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(z.events.COMPOSITION_END, () => {
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
      this.mouseDown = !1, this.update(z.sources.USER);
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
    if (!(r == null || !r.native.collapsed || this.scroll.query(e, K.BLOCK))) {
      if (r.start.node !== this.cursor.textNode) {
        const s = this.scroll.find(r.start.node, !1);
        if (s == null) return;
        if (s instanceof Me) {
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
      const [x] = this.scroll.leaf(e + 1);
      if (x) {
        const [g] = this.scroll.line(e), [h] = this.scroll.line(e + 1);
        g === h && (i = x, a = 0);
      }
    }
    [s, a] = i.position(a, !0);
    const l = document.createRange();
    if (t > 0)
      return l.setStart(s, a), [i, a] = this.scroll.leaf(e + t), i == null ? null : ([s, a] = i.position(a, !0), l.setEnd(s, a), l.getBoundingClientRect());
    let c = "left", d;
    if (s instanceof Text) {
      if (!s.data.length)
        return null;
      a < s.data.length ? (l.setStart(s, a), l.setEnd(s, a + 1)) : (l.setStart(s, a - 1), l.setEnd(s, a), c = "right"), d = l.getBoundingClientRect();
    } else {
      if (!(i.domNode instanceof Element)) return null;
      d = i.domNode.getBoundingClientRect(), a > 0 && (c = "right");
    }
    return {
      bottom: d.top + d.height,
      height: d.height,
      left: d[c],
      right: d[c],
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
    return ii.info("getNativeRange", r), r;
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
    const r = t.map((a) => {
      const [l, c] = a, d = this.scroll.find(l, !0), x = d.offset(this.scroll);
      return c === 0 ? x : d instanceof Me ? x + d.index(l, c) : x + d.length();
    }), s = Math.min(Math.max(...r), this.scroll.length() - 1), i = Math.min(s, ...r);
    return new ar(i, s - i);
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
      const [a, l] = this.scroll.leaf(s);
      return a ? a.position(l, i) : [null, -1];
    };
    return [...r(e.index, !1), ...r(e.index + e.length, !0)];
  }
  setNativeRange(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : t, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (ii.info("setNativeRange", e, t, r, s), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
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
          const c = document.createRange();
          c.setStart(e, t), c.setEnd(r, s), a.removeAllRanges(), a.addRange(c);
        }
      } else
        a.removeAllRanges(), this.root.blur();
  }
  setRange(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : z.sources.API;
    if (typeof t == "string" && (r = t, t = !1), ii.info("setRange", e), e != null) {
      const s = this.rangeToNative(e);
      this.setNativeRange(...s, t);
    } else
      this.setNativeRange(null);
    this.update(r);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : z.sources.USER;
    const t = this.lastRange, [r, s] = this.getRange();
    if (this.lastRange = r, this.lastNative = s, this.lastRange != null && (this.savedRange = this.lastRange), !Hi(t, this.lastRange)) {
      if (!this.composing && s != null && s.native.collapsed && s.start.node !== this.cursor.textNode) {
        const a = this.cursor.restore();
        a && this.setNativeRange(a.startNode, a.startOffset, a.endNode, a.endOffset);
      }
      const i = [z.events.SELECTION_CHANGE, Cr(this.lastRange), Cr(t), e];
      this.emitter.emit(z.events.EDITOR_CHANGE, ...i), e !== z.sources.SILENT && this.emitter.emit(...i);
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
const Vp = /^[ -~]*$/;
class Kp {
  constructor(e) {
    this.scroll = e, this.delta = this.getDelta();
  }
  applyDelta(e) {
    this.scroll.update();
    let t = this.scroll.length();
    this.scroll.batchStart();
    const r = zo(e), s = new H();
    return Wp(r.ops.slice()).reduce((a, l) => {
      const c = Je.Op.length(l);
      let d = l.attributes || {}, x = !1, g = !1;
      if (l.insert != null) {
        if (s.retain(c), typeof l.insert == "string") {
          const _ = l.insert;
          g = !_.endsWith(`
`) && (t <= a || !!this.scroll.descendant(Qe, a)[0]), this.scroll.insertAt(a, _);
          const [k, q] = this.scroll.line(a);
          let I = zt({}, Ye(k));
          if (k instanceof Oe) {
            const [P] = k.descendant(Me, q);
            P && (I = zt(I, Ye(P)));
          }
          d = Je.AttributeMap.diff(I, d) || {};
        } else if (typeof l.insert == "object") {
          const _ = Object.keys(l.insert)[0];
          if (_ == null) return a;
          const k = this.scroll.query(_, K.INLINE) != null;
          if (k)
            (t <= a || this.scroll.descendant(Qe, a)[0]) && (g = !0);
          else if (a > 0) {
            const [q, I] = this.scroll.descendant(Me, a - 1);
            q instanceof at ? q.value()[I] !== `
` && (x = !0) : q instanceof Ze && q.statics.scope === K.INLINE_BLOT && (x = !0);
          }
          if (this.scroll.insertAt(a, _, l.insert[_]), k) {
            const [q] = this.scroll.descendant(Me, a);
            if (q) {
              const I = zt({}, Ye(q));
              d = Je.AttributeMap.diff(I, d) || {};
            }
          }
        }
        t += c;
      } else if (s.push(l), l.retain !== null && typeof l.retain == "object") {
        const _ = Object.keys(l.retain)[0];
        if (_ == null) return a;
        this.scroll.updateEmbedAt(a, _, l.retain[_]);
      }
      Object.keys(d).forEach((_) => {
        this.scroll.formatAt(a, c, _, d[_]);
      });
      const h = x ? 1 : 0, m = g ? 1 : 0;
      return t += h + m, s.retain(h), s.delete(m), a + c + h + m;
    }, 0), s.reduce((a, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(a, l.delete), a) : a + Je.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new H().retain(e).delete(t));
  }
  formatLine(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(r).forEach((i) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((a) => {
        a.format(i, r[i]);
      });
    }), this.scroll.optimize();
    const s = new H().retain(e).retain(t, Cr(r));
    return this.update(s);
  }
  formatText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((i) => {
      this.scroll.formatAt(e, t, i, r[i]);
    });
    const s = new H().retain(e).retain(t, Cr(r));
    return this.update(s);
  }
  getContents(e, t) {
    return this.delta.slice(e, e + t);
  }
  getDelta() {
    return this.scroll.lines().reduce((e, t) => e.concat(t.delta()), new H());
  }
  getFormat(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = [], s = [];
    t === 0 ? this.scroll.path(e).forEach((l) => {
      const [c] = l;
      c instanceof Oe ? r.push(c) : c instanceof Me && s.push(c);
    }) : (r = this.scroll.lines(e, t), s = this.scroll.descendants(Me, e, t));
    const [i, a] = [r, s].map((l) => {
      const c = l.shift();
      if (c == null) return {};
      let d = Ye(c);
      for (; Object.keys(d).length > 0; ) {
        const x = l.shift();
        if (x == null) return d;
        d = Gp(Ye(x), d);
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
      return r.length() >= s + t && !(s === 0 && t === i) ? mn(r, s, t, !0) : mn(this.scroll, e, t, !0);
    }
    return "";
  }
  getText(e, t) {
    return this.getContents(e, t).filter((r) => typeof r.insert == "string").map((r) => r.insert).join("");
  }
  insertContents(e, t) {
    const r = zo(t), s = new H().retain(e).concat(r);
    return this.scroll.insertContents(e, r), this.update(s);
  }
  insertEmbed(e, t, r) {
    return this.scroll.insertAt(e, t, r), this.update(new H().retain(e).insert({
      [t]: r
    }));
  }
  insertText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return t = t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(e, t), Object.keys(r).forEach((s) => {
      this.scroll.formatAt(e, t.length, s, r[s]);
    }), this.update(new H().retain(e).insert(t, Cr(r)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if (e?.statics.blotName !== Oe.blotName) return !1;
    const t = e;
    return t.children.length > 1 ? !1 : t.children.head instanceof ct;
  }
  removeFormat(e, t) {
    const r = this.getText(e, t), [s, i] = this.scroll.line(e + t);
    let a = 0, l = new H();
    s != null && (a = s.length() - i, l = s.delta().slice(i, i + a - 1).insert(`
`));
    const d = this.getContents(e, t + a).diff(new H().insert(r).concat(l)), x = new H().retain(e).concat(d);
    return this.applyDelta(x);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const s = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(Vp) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), a = Ye(i), l = i.offset(this.scroll), c = t[0].oldValue.replace(st.CONTENTS, ""), d = new H().insert(c), x = new H().insert(i.value()), g = r && {
        oldRange: Ho(r.oldRange, -l),
        newRange: Ho(r.newRange, -l)
      };
      e = new H().retain(l).concat(d.diff(x, g)).reduce((m, _) => _.insert ? m.insert(_.insert, a) : m.push(_), new H()), this.delta = s.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !Hi(s.compose(e), this.delta)) && (e = s.diff(this.delta, r));
    return e;
  }
}
function Sr(n, e, t) {
  if (n.length === 0) {
    const [m] = ai(t.pop());
    return e <= 0 ? `</li></${m}>` : `</li></${m}>${Sr([], e - 1, t)}`;
  }
  const [{
    child: r,
    offset: s,
    length: i,
    indent: a,
    type: l
  }, ...c] = n, [d, x] = ai(l);
  if (a > e)
    return t.push(l), a === e + 1 ? `<${d}><li${x}>${mn(r, s, i)}${Sr(c, a, t)}` : `<${d}><li>${Sr(n, e + 1, t)}`;
  const g = t[t.length - 1];
  if (a === e && l === g)
    return `</li><li${x}>${mn(r, s, i)}${Sr(c, a, t)}`;
  const [h] = ai(t.pop());
  return `</li></${h}>${Sr(n, e - 1, t)}`;
}
function mn(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in n && typeof n.html == "function")
    return n.html(e, t);
  if (n instanceof at)
    return hs(n.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (n instanceof ot) {
    if (n.statics.blotName === "list-container") {
      const d = [];
      return n.children.forEachAt(e, t, (x, g, h) => {
        const m = "formats" in x && typeof x.formats == "function" ? x.formats() : {};
        d.push({
          child: x,
          offset: g,
          length: h,
          indent: m.indent || 0,
          type: m.list
        });
      }), Sr(d, -1, []);
    }
    const s = [];
    if (n.children.forEachAt(e, t, (d, x, g) => {
      s.push(mn(d, x, g));
    }), r || n.statics.blotName === "list")
      return s.join("");
    const {
      outerHTML: i,
      innerHTML: a
    } = n.domNode, [l, c] = i.split(`>${a}<`);
    return l === "<table" ? `<table style="border: 1px solid #000;">${s.join("")}<${c}` : `${l}>${s.join("")}<${c}`;
  }
  return n.domNode instanceof Element ? n.domNode.outerHTML : "";
}
function Gp(n, e) {
  return Object.keys(e).reduce((t, r) => {
    if (n[r] == null) return t;
    const s = e[r];
    return s === n[r] ? t[r] = s : Array.isArray(s) ? s.indexOf(n[r]) < 0 ? t[r] = s.concat([n[r]]) : t[r] = s : t[r] = [s, n[r]], t;
  }, {});
}
function ai(n) {
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
function zo(n) {
  return n.reduce((e, t) => {
    if (typeof t.insert == "string") {
      const r = t.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return e.insert(r, t.attributes);
    }
    return e.push(t);
  }, new H());
}
function Ho(n, e) {
  let {
    index: t,
    length: r
  } = n;
  return new ar(t + e, r);
}
function Wp(n) {
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
class bt {
  static DEFAULTS = {};
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = e, this.options = t;
  }
}
const Un = "\uFEFF";
class Gi extends Ze {
  constructor(e, t) {
    super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((r) => {
      this.contentNode.appendChild(r);
    }), this.leftGuard = document.createTextNode(Un), this.rightGuard = document.createTextNode(Un), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(e, t) {
    return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
  }
  restore(e) {
    let t = null, r;
    const s = e.data.split(Un).join("");
    if (e === this.leftGuard)
      if (this.prev instanceof at) {
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
    else e === this.rightGuard && (this.next instanceof at ? (this.next.insertAt(0, s), t = {
      startNode: this.next.domNode,
      startOffset: s.length
    }) : (r = document.createTextNode(s), this.parent.insertBefore(this.scroll.create(r), this.next), t = {
      startNode: r,
      startOffset: s.length
    }));
    return e.data = Un, t;
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
class Zp {
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
    t && !(t instanceof Gi) && (this.emitter.emit(z.events.COMPOSITION_BEFORE_START, e), this.scroll.batchStart(), this.emitter.emit(z.events.COMPOSITION_START, e), this.isComposing = !0);
  }
  handleCompositionEnd(e) {
    this.emitter.emit(z.events.COMPOSITION_BEFORE_END, e), this.scroll.batchEnd(), this.emitter.emit(z.events.COMPOSITION_END, e), this.isComposing = !1;
  }
}
class Br {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: Br
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
const Yp = (n) => n.parentElement || n.getRootNode().host || null, Xp = (n) => {
  const e = n.getBoundingClientRect(), t = "offsetWidth" in n && Math.abs(e.width) / n.offsetWidth || 1, r = "offsetHeight" in n && Math.abs(e.height) / n.offsetHeight || 1;
  return {
    top: e.top,
    right: e.left + n.clientWidth * t,
    bottom: e.top + n.clientHeight * r,
    left: e.left
  };
}, zn = (n) => {
  const e = parseInt(n, 10);
  return Number.isNaN(e) ? 0 : e;
}, Vo = (n, e, t, r, s, i) => n < t && e > r ? 0 : n < t ? -(t - n + s) : e > r ? e - n > r - t ? n + s - t : e - r + i : 0, Qp = (n, e) => {
  const t = n.ownerDocument;
  let r = e, s = n;
  for (; s; ) {
    const i = s === t.body, a = i ? {
      top: 0,
      right: window.visualViewport?.width ?? t.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? t.documentElement.clientHeight,
      left: 0
    } : Xp(s), l = getComputedStyle(s), c = Vo(r.left, r.right, a.left, a.right, zn(l.scrollPaddingLeft), zn(l.scrollPaddingRight)), d = Vo(r.top, r.bottom, a.top, a.bottom, zn(l.scrollPaddingTop), zn(l.scrollPaddingBottom));
    if (c || d)
      if (i)
        t.defaultView?.scrollBy(c, d);
      else {
        const {
          scrollLeft: x,
          scrollTop: g
        } = s;
        d && (s.scrollTop += d), c && (s.scrollLeft += c);
        const h = s.scrollLeft - x, m = s.scrollTop - g;
        r = {
          left: r.left - h,
          top: r.top - m,
          right: r.right - h,
          bottom: r.bottom - m
        };
      }
    s = i || l.position === "fixed" ? null : Yp(s);
  }
}, Jp = 100, em = ["block", "break", "cursor", "inline", "scroll", "text"], tm = (n, e, t) => {
  const r = new $r();
  return em.forEach((s) => {
    const i = e.query(s);
    i && r.register(i);
  }), n.forEach((s) => {
    let i = e.query(s);
    i || t.error(`Cannot register "${s}" specified in "formats" config. Are you sure it was registered?`);
    let a = 0;
    for (; i; )
      if (r.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, a += 1, a > Jp) {
        t.error(`Cycle detected in registering blot requiredContainer: "${s}"`);
        break;
      }
  }), r;
}, qr = Rt("quill"), Hn = new $r();
ot.uiClass = "ql-ui";
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
  static events = z.events;
  static sources = z.sources;
  static version = "2.0.3";
  static imports = {
    delta: H,
    parchment: Rp,
    "core/module": bt,
    "core/theme": Br
  };
  static debug(e) {
    e === !0 && (e = "log"), Rt.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Si.get(e) || Hn.find(e, t);
  }
  static import(e) {
    return this.imports[e] == null && qr.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), r = "attrName" in e ? e.attrName : e.blotName;
      typeof r == "string" ? this.register(`formats/${r}`, e, t) : Object.keys(e).forEach((s) => {
        this.register(s, e[s], t);
      });
    } else {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], r = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[e] != null && !r && qr.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && Hn.register(t), typeof t.register == "function" && t.register(Hn);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = rm(e, t), this.container = this.options.container, this.container == null) {
      qr.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && $.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Si.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new z();
    const s = Ki.blotName, i = this.options.registry.query(s);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${s}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Kp(this.scroll), this.selection = new Hp(this.scroll, this.emitter), this.composition = new Zp(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(z.events.EDITOR_CHANGE, (a) => {
      a === z.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(z.events.SCROLL_UPDATE, (a, l) => {
      const c = this.selection.lastRange, [d] = this.selection.getRange(), x = c && d ? {
        oldRange: c,
        newRange: d
      } : void 0;
      tt.call(this, () => this.editor.update(null, l, x), a);
    }), this.emitter.on(z.events.SCROLL_EMBED_UPDATE, (a, l) => {
      const c = this.selection.lastRange, [d] = this.selection.getRange(), x = c && d ? {
        oldRange: c,
        newRange: d
      } : void 0;
      tt.call(this, () => {
        const g = new H().retain(a.offset(this)).retain({
          [a.statics.blotName]: l
        });
        return this.editor.update(g, [], x);
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
    return [e, t, , r] = kt(e, t, r), tt.call(this, () => this.editor.deleteText(e, t), r, e, -1 * t);
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
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : z.sources.API;
    return tt.call(this, () => {
      const s = this.getSelection(!0);
      let i = new H();
      if (s == null) return i;
      if (this.scroll.query(e, K.BLOCK))
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
      return this.setSelection(s, z.sources.SILENT), i;
    }, r);
  }
  formatLine(e, t, r, s, i) {
    let a;
    return [e, t, a, i] = kt(
      e,
      t,
      // @ts-expect-error
      r,
      s,
      i
    ), tt.call(this, () => this.editor.formatLine(e, t, a), i, e, 0);
  }
  formatText(e, t, r, s, i) {
    let a;
    return [e, t, a, i] = kt(
      // @ts-expect-error
      e,
      t,
      r,
      s,
      i
    ), tt.call(this, () => this.editor.formatText(e, t, a), i, e, 0);
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
    return [e, t] = kt(e, t), this.editor.getContents(e, t);
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
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = kt(e, t), this.editor.getHTML(e, t);
  }
  getText() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = kt(e, t), this.editor.getText(e, t);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(e, t, r) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : $.sources.API;
    return tt.call(this, () => this.editor.insertEmbed(e, t, r), s, e);
  }
  insertText(e, t, r, s, i) {
    let a;
    return [e, , a, i] = kt(e, 0, r, s, i), tt.call(this, () => this.editor.insertText(e, t, a), i, e, t.length);
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
    return [e, t, , r] = kt(e, t, r), tt.call(this, () => this.editor.removeFormat(e, t), r, e);
  }
  scrollRectIntoView(e) {
    Qp(this.root, e);
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
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : z.sources.API;
    return tt.call(this, () => {
      e = new H(e);
      const r = this.getLength(), s = this.editor.deleteText(0, r), i = this.editor.insertContents(0, e), a = this.editor.deleteText(this.getLength() - 1, 1);
      return s.compose(i).compose(a);
    }, t);
  }
  setSelection(e, t, r) {
    e == null ? this.selection.setRange(null, t || $.sources.API) : ([e, t, , r] = kt(e, t, r), this.selection.setRange(new ar(Math.max(0, e), t), r), r !== z.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : z.sources.API;
    const r = new H().insert(e);
    return this.setContents(r, t);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : z.sources.USER;
    const t = this.scroll.update(e);
    return this.selection.update(e), t;
  }
  updateContents(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : z.sources.API;
    return tt.call(this, () => (e = new H(e), this.editor.applyDelta(e)), t, !0);
  }
}
function Ko(n) {
  return typeof n == "string" ? document.querySelector(n) : n;
}
function li(n) {
  return Object.entries(n ?? {}).reduce((e, t) => {
    let [r, s] = t;
    return {
      ...e,
      [r]: s === !0 ? {} : s
    };
  }, {});
}
function Go(n) {
  return Object.fromEntries(Object.entries(n).filter((e) => e[1] !== void 0));
}
function rm(n, e) {
  const t = Ko(n);
  if (!t)
    throw new Error("Invalid Quill container");
  const s = !e.theme || e.theme === $.DEFAULTS.theme ? Br : $.import(`themes/${e.theme}`);
  if (!s)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: i,
    ...a
  } = $.DEFAULTS, {
    modules: l,
    ...c
  } = s.DEFAULTS;
  let d = li(e.modules);
  d != null && d.toolbar && d.toolbar.constructor !== Object && (d = {
    ...d,
    toolbar: {
      container: d.toolbar
    }
  });
  const x = zt({}, li(i), li(l), d), g = {
    ...a,
    ...Go(c),
    ...Go(e)
  };
  let h = e.registry;
  return h ? e.formats && qr.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? tm(e.formats, g.registry, qr) : g.registry, {
    ...g,
    registry: h,
    container: t,
    theme: s,
    modules: Object.entries(x).reduce((m, _) => {
      let [k, q] = _;
      if (!q) return m;
      const I = $.import(`modules/${k}`);
      return I == null ? (qr.error(`Cannot load ${k} module. Are you sure you registered it?`), m) : {
        ...m,
        // @ts-expect-error
        [k]: zt({}, I.DEFAULTS || {}, q)
      };
    }, {}),
    bounds: Ko(g.bounds)
  };
}
function tt(n, e, t, r) {
  if (!this.isEnabled() && e === z.sources.USER && !this.allowReadOnlyEdits)
    return new H();
  let s = t == null ? null : this.getSelection();
  const i = this.editor.delta, a = n();
  if (s != null && (t === !0 && (t = s.index), r == null ? s = Wo(s, a, e) : r !== 0 && (s = Wo(s, t, r, e)), this.setSelection(s, z.sources.SILENT)), a.length() > 0) {
    const l = [z.events.TEXT_CHANGE, a, i, e];
    this.emitter.emit(z.events.EDITOR_CHANGE, ...l), e !== z.sources.SILENT && this.emitter.emit(...l);
  }
  return a;
}
function kt(n, e, t, r, s) {
  let i = {};
  return typeof n.index == "number" && typeof n.length == "number" ? typeof e != "number" ? (s = r, r = t, t = e, e = n.length, n = n.index) : (e = n.length, n = n.index) : typeof e != "number" && (s = r, r = t, t = e, e = 0), typeof t == "object" ? (i = t, s = r) : typeof t == "string" && (r != null ? i[t] = r : s = t), s = s || z.sources.API, [n, e, i, s];
}
function Wo(n, e, t, r) {
  const s = typeof t == "number" ? t : 0;
  if (n == null) return null;
  let i, a;
  return e && typeof e.transformPosition == "function" ? [i, a] = [n.index, n.index + n.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(l, r !== z.sources.USER)
  )) : [i, a] = [n.index, n.index + n.length].map((l) => l < e || l === e && r === z.sources.USER ? l : s >= 0 ? l + s : Math.max(e, l + s)), new ar(i, a - i);
}
class hr extends ds {
}
function Zo(n) {
  return n instanceof Oe || n instanceof Qe;
}
function Yo(n) {
  return typeof n.updateContent == "function";
}
class nm extends Ki {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = Oe;
  static allowedChildren = [Oe, Qe, hr];
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
    this.emitter.emit(z.events.SCROLL_BLOT_MOUNT, e);
  }
  emitUnmount(e) {
    this.emitter.emit(z.events.SCROLL_BLOT_UNMOUNT, e);
  }
  emitEmbedUpdate(e, t) {
    this.emitter.emit(z.events.SCROLL_EMBED_UPDATE, e, t);
  }
  deleteAt(e, t) {
    const [r, s] = this.line(e), [i] = this.line(e + t);
    if (super.deleteAt(e, t), i != null && r !== i && s > 0) {
      if (r instanceof Qe || i instanceof Qe) {
        this.optimize();
        return;
      }
      const a = i.children.head instanceof ct ? null : i.children.head;
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
      if (r == null || this.scroll.query(t, K.BLOCK) == null) {
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
    if (e.statics.scope === K.INLINE_BLOT) {
      const r = this.scroll.create(this.statics.defaultChild.blotName);
      r.appendChild(e), super.insertBefore(r, t);
    } else
      super.insertBefore(e, t);
  }
  insertContents(e, t) {
    const r = this.deltaToRenderBlocks(t.concat(new H().insert(`
`))), s = r.pop();
    if (s == null) return;
    this.batchStart();
    const i = r.shift();
    if (i) {
      const c = i.type === "block" && (i.delta.length() === 0 || !this.descendant(Qe, e)[0] && e < this.length()), d = i.type === "block" ? i.delta : new H().insert({
        [i.key]: i.value
      });
      ci(this, e, d);
      const x = i.type === "block" ? 1 : 0, g = e + d.length() + x;
      c && this.insertAt(g - 1, `
`);
      const h = Ye(this.line(e)[0]), m = Je.AttributeMap.diff(h, i.attributes) || {};
      Object.keys(m).forEach((_) => {
        this.formatAt(g - 1, 1, _, m[_]);
      }), e = g;
    }
    let [a, l] = this.children.find(e);
    if (r.length && (a && (a = a.split(l), l = 0), r.forEach((c) => {
      if (c.type === "block") {
        const d = this.createBlock(c.attributes, a || void 0);
        ci(d, 0, c.delta);
      } else {
        const d = this.create(c.key, c.value);
        this.insertBefore(d, a || void 0), Object.keys(c.attributes).forEach((x) => {
          d.format(x, c.attributes[x]);
        });
      }
    })), s.type === "block" && s.delta.length()) {
      const c = a ? a.offset(a.scroll) + l : this.length();
      ci(this, c, s.delta);
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
    return r instanceof Me ? [r, s] : [null, -1];
  }
  line(e) {
    return e === this.length() ? this.line(e - 1) : this.descendant(Zo, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (s, i, a) => {
      let l = [], c = a;
      return s.children.forEachAt(i, a, (d, x, g) => {
        Zo(d) ? l.push(d) : d instanceof ds && (l = l.concat(r(d, x, c))), c -= g;
      }), l;
    };
    return r(this, e, t);
  }
  optimize() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(e, t), e.length > 0 && this.emitter.emit(z.events.SCROLL_OPTIMIZE, e, t));
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
    let t = z.sources.USER;
    typeof e == "string" && (t = e), Array.isArray(e) || (e = this.observer.takeRecords()), e = e.filter((r) => {
      let {
        target: s
      } = r;
      const i = this.find(s, !0);
      return i && !Yo(i);
    }), e.length > 0 && this.emitter.emit(z.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(z.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, r) {
    const [s] = this.descendant((i) => i instanceof Qe, e);
    s && s.statics.blotName === t && Yo(s) && s.updateContent(r);
  }
  handleDragStart(e) {
    e.preventDefault();
  }
  deltaToRenderBlocks(e) {
    const t = [];
    let r = new H();
    return e.forEach((s) => {
      const i = s?.insert;
      if (i)
        if (typeof i == "string") {
          const a = i.split(`
`);
          a.slice(0, -1).forEach((c) => {
            r.insert(c, s.attributes), t.push({
              type: "block",
              delta: r,
              attributes: s.attributes ?? {}
            }), r = new H();
          });
          const l = a[a.length - 1];
          l && r.insert(l, s.attributes);
        } else {
          const a = Object.keys(i)[0];
          if (!a) return;
          this.query(a, K.INLINE) ? r.push(s) : (r.length() && t.push({
            type: "block",
            delta: r,
            attributes: {}
          }), r = new H(), t.push({
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
      let [c, d] = l;
      this.query(c, K.BLOCK & K.BLOT) != null ? r = c : s[c] = d;
    });
    const i = this.create(r || this.statics.defaultChild.blotName, r ? e[r] : void 0);
    this.insertBefore(i, t || void 0);
    const a = i.length();
    return Object.entries(s).forEach((l) => {
      let [c, d] = l;
      i.formatAt(0, a, c, d);
    }), i;
  }
}
function ci(n, e, t) {
  t.reduce((r, s) => {
    const i = Je.Op.length(s);
    let a = s.attributes || {};
    if (s.insert != null) {
      if (typeof s.insert == "string") {
        const l = s.insert;
        n.insertAt(r, l);
        const [c] = n.descendant(Me, r), d = Ye(c);
        a = Je.AttributeMap.diff(d, a) || {};
      } else if (typeof s.insert == "object") {
        const l = Object.keys(s.insert)[0];
        if (l == null) return r;
        if (n.insertAt(r, l, s.insert[l]), n.scroll.query(l, K.INLINE) != null) {
          const [d] = n.descendant(Me, r), x = Ye(d);
          a = Je.AttributeMap.diff(x, a) || {};
        }
      }
    }
    return Object.keys(a).forEach((l) => {
      n.formatAt(r, i, l, a[l]);
    }), r + i;
  }, e);
}
const Wi = {
  scope: K.BLOCK,
  whitelist: ["right", "center", "justify"]
}, sm = new mt("align", "align", Wi), ml = new lt("align", "ql-align", Wi), gl = new Wt("align", "text-align", Wi);
class bl extends Wt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((s) => `00${parseInt(s, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const im = new lt("color", "ql-color", {
  scope: K.INLINE
}), Zi = new bl("color", "color", {
  scope: K.INLINE
}), om = new lt("background", "ql-bg", {
  scope: K.INLINE
}), Yi = new bl("background", "background-color", {
  scope: K.INLINE
});
class fr extends hr {
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
${hs(this.code(e, t))}
</pre>`;
  }
}
class He extends Oe {
  static TAB = "  ";
  static register() {
    $.register(fr);
  }
}
class Xi extends ze {
}
Xi.blotName = "code";
Xi.tagName = "CODE";
He.blotName = "code-block";
He.className = "ql-code-block";
He.tagName = "DIV";
fr.blotName = "code-block-container";
fr.className = "ql-code-block-container";
fr.tagName = "DIV";
fr.allowedChildren = [He];
He.allowedChildren = [at, ct, st];
He.requiredContainer = fr;
const Qi = {
  scope: K.BLOCK,
  whitelist: ["rtl"]
}, yl = new mt("direction", "dir", Qi), vl = new lt("direction", "ql-direction", Qi), xl = new Wt("direction", "direction", Qi), wl = {
  scope: K.INLINE,
  whitelist: ["serif", "monospace"]
}, Al = new lt("font", "ql-font", wl);
class am extends Wt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const El = new am("font", "font-family", wl), Nl = new lt("size", "ql-size", {
  scope: K.INLINE,
  whitelist: ["small", "large", "huge"]
}), Tl = new Wt("size", "font-size", {
  scope: K.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), lm = Rt("quill:keyboard"), cm = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class fs extends bt {
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
    const s = dm(e);
    if (s == null) {
      lm.warn("Attempted to add invalid keyboard binding", s);
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
      const s = (this.bindings[e.key] || []).concat(this.bindings[e.which] || []).filter((I) => fs.match(e, I));
      if (s.length === 0) return;
      const i = $.find(e.target, !0);
      if (i && i.scroll !== this.quill.scroll) return;
      const a = this.quill.getSelection();
      if (a == null || !this.quill.hasFocus()) return;
      const [l, c] = this.quill.getLine(a.index), [d, x] = this.quill.getLeaf(a.index), [g, h] = a.length === 0 ? [d, x] : this.quill.getLeaf(a.index + a.length), m = d instanceof ts ? d.value().slice(0, x) : "", _ = g instanceof ts ? g.value().slice(h) : "", k = {
        collapsed: a.length === 0,
        // @ts-expect-error Fix me later
        empty: a.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(a),
        line: l,
        offset: c,
        prefix: m,
        suffix: _,
        event: e
      };
      s.some((I) => {
        if (I.collapsed != null && I.collapsed !== k.collapsed || I.empty != null && I.empty !== k.empty || I.offset != null && I.offset !== k.offset)
          return !1;
        if (Array.isArray(I.format)) {
          if (I.format.every((P) => k.format[P] == null))
            return !1;
        } else if (typeof I.format == "object" && !Object.keys(I.format).every((P) => I.format[P] === !0 ? k.format[P] != null : I.format[P] === !1 ? k.format[P] == null : Hi(I.format[P], k.format[P])))
          return !1;
        return I.prefix != null && !I.prefix.test(k.prefix) || I.suffix != null && !I.suffix.test(k.suffix) ? !1 : I.handler.call(this, a, k, I) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let a = new H().retain(e.index - r).delete(r);
    if (t.offset === 0) {
      const [l] = this.quill.getLine(e.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const d = i.formats(), x = this.quill.getFormat(e.index - 1, 1);
        if (s = Je.AttributeMap.diff(d, x) || {}, Object.keys(s).length > 0) {
          const g = new H().retain(e.index + i.length() - 2).retain(1, s);
          a = a.compose(g);
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
    let a = new H().retain(e.index).delete(r);
    if (t.offset >= i.length() - 1) {
      const [l] = this.quill.getLine(e.index + 1);
      if (l) {
        const c = i.formats(), d = this.quill.getFormat(e.index, 1);
        s = Je.AttributeMap.diff(c, d) || {}, Object.keys(s).length > 0 && (a = a.retain(l.length() - 1).retain(1, s));
      }
    }
    this.quill.updateContents(a, $.sources.USER), this.quill.focus();
  }
  handleDeleteRange(e) {
    Ji({
      range: e,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(e, t) {
    const r = Object.keys(t.format).reduce((i, a) => (this.quill.scroll.query(a, K.BLOCK) && !Array.isArray(t.format[a]) && (i[a] = t.format[a]), i), {}), s = new H().retain(e.index).delete(e.length).insert(`
`, r);
    this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.focus();
  }
}
const um = {
  bindings: {
    bold: ui("bold"),
    italic: ui("italic"),
    underline: ui("underline"),
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
    "indent code-block": Xo(!0),
    "outdent code-block": Xo(!1),
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
        const t = new H().retain(n.index).delete(n.length).insert("	");
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
        }, s = new H().retain(n.index).insert(`
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
        const [t, r] = this.quill.getLine(n.index), s = new H().retain(n.index).insert(`
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
          const [t, r, s, i] = e.getTable(n), a = hm(t, r, s, i);
          if (a == null) return;
          let l = t.offset();
          if (a < 0) {
            const c = new H().retain(l).insert(`
`);
            this.quill.updateContents(c, $.sources.USER), this.quill.setSelection(n.index + 1, n.length, $.sources.SILENT);
          } else if (a > 0) {
            l += t.length();
            const c = new H().retain(l).insert(`
`);
            this.quill.updateContents(c, $.sources.USER), this.quill.setSelection(l, $.sources.USER);
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
        const a = new H().retain(n.index - s).delete(t + 1).retain(r.length() - 2 - s).retain(1, {
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
            const i = new H().retain(n.index + e.length() - t - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(n.index - 1, $.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": Vn("ArrowLeft", !1),
    "embed left shift": Vn("ArrowLeft", !0),
    "embed right": Vn("ArrowRight", !1),
    "embed right shift": Vn("ArrowRight", !0),
    "table down": Qo(!1),
    "table up": Qo(!0)
  }
};
fs.DEFAULTS = um;
function Xo(n) {
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
        length: c
      } = e;
      a.forEach((d, x) => {
        n ? (d.insertAt(0, i), x === 0 ? l += i.length : c += i.length) : d.domNode.textContent.startsWith(i) && (d.deleteAt(0, i.length), x === 0 ? l -= i.length : c -= i.length);
      }), this.quill.update($.sources.USER), this.quill.setSelection(l, c, $.sources.SILENT);
    }
  };
}
function Vn(n, e) {
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
      return i instanceof Ze ? (n === "ArrowLeft" ? e ? this.quill.setSelection(r.index - 1, r.length + 1, $.sources.USER) : this.quill.setSelection(r.index - 1, $.sources.USER) : e ? this.quill.setSelection(r.index, r.length + 1, $.sources.USER) : this.quill.setSelection(r.index + r.length + 1, $.sources.USER), !1) : !0;
    }
  };
}
function ui(n) {
  return {
    key: n[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(n, !t.format[n], $.sources.USER);
    }
  };
}
function Qo(n) {
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
          const c = a.offset(this.quill.scroll) + Math.min(t.offset, a.length() - 1);
          this.quill.setSelection(c, 0, $.sources.USER);
        }
      } else {
        const a = s.table()[r];
        a != null && (n ? this.quill.setSelection(a.offset(this.quill.scroll) + a.length() - 1, 0, $.sources.USER) : this.quill.setSelection(a.offset(this.quill.scroll), 0, $.sources.USER));
      }
      return !1;
    }
  };
}
function dm(n) {
  if (typeof n == "string" || typeof n == "number")
    n = {
      key: n
    };
  else if (typeof n == "object")
    n = Cr(n);
  else
    return null;
  return n.shortKey && (n[cm] = n.shortKey, delete n.shortKey), n;
}
function Ji(n) {
  let {
    quill: e,
    range: t
  } = n;
  const r = e.getLines(t);
  let s = {};
  if (r.length > 1) {
    const i = r[0].formats(), a = r[r.length - 1].formats();
    s = Je.AttributeMap.diff(a, i) || {};
  }
  e.deleteText(t, $.sources.USER), Object.keys(s).length > 0 && e.formatLine(t.index, 1, s, $.sources.USER), e.setSelection(t.index, $.sources.SILENT);
}
function hm(n, e, t, r) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? r === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const fm = /font-weight:\s*normal/, pm = ["P", "OL", "UL"], Jo = (n) => n && pm.includes(n.tagName), mm = (n) => {
  Array.from(n.querySelectorAll("br")).filter((e) => Jo(e.previousElementSibling) && Jo(e.nextElementSibling)).forEach((e) => {
    e.parentNode?.removeChild(e);
  });
}, gm = (n) => {
  Array.from(n.querySelectorAll('b[style*="font-weight"]')).filter((e) => e.getAttribute("style")?.match(fm)).forEach((e) => {
    const t = n.createDocumentFragment();
    t.append(...e.childNodes), e.parentNode?.replaceChild(t, e);
  });
};
function bm(n) {
  n.querySelector('[id^="docs-internal-guid-"]') && (gm(n), mm(n));
}
const ym = /\bmso-list:[^;]*ignore/i, vm = /\bmso-list:[^;]*\bl(\d+)/i, xm = /\bmso-list:[^;]*\blevel(\d+)/i, wm = (n, e) => {
  const t = n.getAttribute("style"), r = t?.match(vm);
  if (!r)
    return null;
  const s = Number(r[1]), i = t?.match(xm), a = i ? Number(i[1]) : 1, l = new RegExp(`@list l${s}:level${a}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), c = e.match(l), d = c && c[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: s,
    indent: a,
    type: d,
    element: n
  };
}, Am = (n) => {
  const e = Array.from(n.querySelectorAll("[style*=mso-list]")), t = [], r = [];
  e.forEach((a) => {
    (a.getAttribute("style") || "").match(ym) ? t.push(a) : r.push(a);
  }), t.forEach((a) => a.parentNode?.removeChild(a));
  const s = n.documentElement.innerHTML, i = r.map((a) => wm(a, s)).filter((a) => a);
  for (; i.length; ) {
    const a = [];
    let l = i.shift();
    for (; l; )
      a.push(l), l = i.length && i[0]?.element === l.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      i[0].id === l.id ? i.shift() : null;
    const c = document.createElement("ul");
    a.forEach((g) => {
      const h = document.createElement("li");
      h.setAttribute("data-list", g.type), g.indent > 1 && h.setAttribute("class", `ql-indent-${g.indent - 1}`), h.innerHTML = g.element.innerHTML, c.appendChild(h);
    });
    const d = a[0]?.element, {
      parentNode: x
    } = d ?? {};
    d && x?.replaceChild(c, d), a.slice(1).forEach((g) => {
      let {
        element: h
      } = g;
      x?.removeChild(h);
    });
  }
};
function Em(n) {
  n.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && Am(n);
}
const Nm = [Em, bm], Tm = (n) => {
  n.documentElement && Nm.forEach((e) => {
    e(n);
  });
}, _m = Rt("quill:clipboard"), Sm = [[Node.TEXT_NODE, Pm], [Node.TEXT_NODE, ta], ["br", Im], [Node.ELEMENT_NODE, ta], [Node.ELEMENT_NODE, Om], [Node.ELEMENT_NODE, qm], [Node.ELEMENT_NODE, Mm], ["li", Dm], ["ol, ul", Bm], ["pre", Rm], ["tr", Fm], ["b", di("bold")], ["i", di("italic")], ["strike", di("strike")], ["style", $m]], km = [sm, yl].reduce((n, e) => (n[e.keyName] = e, n), {}), ea = [gl, Yi, Zi, xl, El, Tl].reduce((n, e) => (n[e.keyName] = e, n), {});
class Cm extends bt {
  static DEFAULTS = {
    matchers: []
  };
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (r) => this.onCaptureCopy(r, !1)), this.quill.root.addEventListener("cut", (r) => this.onCaptureCopy(r, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], Sm.concat(this.options.matchers ?? []).forEach((r) => {
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
    if (s[He.blotName])
      return new H().insert(r || "", {
        [He.blotName]: s[He.blotName]
      });
    if (!t)
      return new H().insert(r || "", s);
    const i = this.convertHTML(t);
    return xn(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || s.table) ? i.compose(new H().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(e) {
    Tm(e);
  }
  convertHTML(e) {
    const t = new DOMParser().parseFromString(e, "text/html");
    this.normalizeHTML(t);
    const r = t.body, s = /* @__PURE__ */ new WeakMap(), [i, a] = this.prepareMatching(r, s);
    return eo(this.quill.scroll, r, i, a, s);
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
      this.quill.updateContents(new H().retain(e).concat(s), r), this.quill.setSelection(e + s.length(), $.sources.SILENT);
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
    _m.log("onPaste", a, {
      text: r,
      html: s
    });
    const l = new H().retain(e.index).delete(e.length).concat(a);
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
          Array.from(e.querySelectorAll(a)).forEach((c) => {
            t.has(c) ? t.get(c)?.push(l) : t.set(c, [l]);
          });
          break;
      }
    }), [r, s];
  }
}
function pr(n, e, t, r) {
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
  }, new H()) : n;
}
function xn(n, e) {
  let t = "";
  for (let r = n.ops.length - 1; r >= 0 && t.length < e.length; --r) {
    const s = n.ops[r];
    if (typeof s.insert != "string") break;
    t = s.insert + t;
  }
  return t.slice(-1 * e.length) === e;
}
function Ut(n, e) {
  if (!(n instanceof Element)) return !1;
  const t = e.query(n);
  return t && t.prototype instanceof Ze ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(n.tagName.toLowerCase());
}
function Lm(n, e) {
  return n.previousElementSibling && n.nextElementSibling && !Ut(n.previousElementSibling, e) && !Ut(n.nextElementSibling, e);
}
const Kn = /* @__PURE__ */ new WeakMap();
function _l(n) {
  return n == null ? !1 : (Kn.has(n) || (n.tagName === "PRE" ? Kn.set(n, !0) : Kn.set(n, _l(n.parentNode))), Kn.get(n));
}
function eo(n, e, t, r, s) {
  return e.nodeType === e.TEXT_NODE ? r.reduce((i, a) => a(e, i, n), new H()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, a) => {
    let l = eo(n, a, t, r, s);
    return a.nodeType === e.ELEMENT_NODE && (l = t.reduce((c, d) => d(a, c, n), l), l = (s.get(a) || []).reduce((c, d) => d(a, c, n), l)), i.concat(l);
  }, new H()) : new H();
}
function di(n) {
  return (e, t, r) => pr(t, n, !0, r);
}
function qm(n, e, t) {
  const r = mt.keys(n), s = lt.keys(n), i = Wt.keys(n), a = {};
  return r.concat(s).concat(i).forEach((l) => {
    let c = t.query(l, K.ATTRIBUTE);
    c != null && (a[c.attrName] = c.value(n), a[c.attrName]) || (c = km[l], c != null && (c.attrName === l || c.keyName === l) && (a[c.attrName] = c.value(n) || void 0), c = ea[l], c != null && (c.attrName === l || c.keyName === l) && (c = ea[l], a[c.attrName] = c.value(n) || void 0));
  }), Object.entries(a).reduce((l, c) => {
    let [d, x] = c;
    return pr(l, d, x, t);
  }, e);
}
function Om(n, e, t) {
  const r = t.query(n);
  if (r == null) return e;
  if (r.prototype instanceof Ze) {
    const s = {}, i = r.value(n);
    if (i != null)
      return s[r.blotName] = i, new H().insert(s, r.formats(n, t));
  } else if (r.prototype instanceof pn && !xn(e, `
`) && e.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return pr(e, r.blotName, r.formats(n, t), t);
  return e;
}
function Im(n, e) {
  return xn(e, `
`) || e.insert(`
`), e;
}
function Rm(n, e, t) {
  const r = t.query("code-block"), s = r && "formats" in r && typeof r.formats == "function" ? r.formats(n, t) : !0;
  return pr(e, "code-block", s, t);
}
function $m() {
  return new H();
}
function Dm(n, e, t) {
  const r = t.query(n);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !xn(e, `
`))
    return e;
  let s = -1, i = n.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (s += 1), i = i.parentNode;
  return s <= 0 ? e : e.reduce((a, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? a.push(l) : a.insert(l.insert, {
    indent: s,
    ...l.attributes || {}
  }) : a, new H());
}
function Bm(n, e, t) {
  const r = n;
  let s = r.tagName === "OL" ? "ordered" : "bullet";
  const i = r.getAttribute("data-checked");
  return i && (s = i === "true" ? "checked" : "unchecked"), pr(e, "list", s, t);
}
function ta(n, e, t) {
  if (!xn(e, `
`)) {
    if (Ut(n, t) && (n.childNodes.length > 0 || n instanceof HTMLParagraphElement))
      return e.insert(`
`);
    if (e.length() > 0 && n.nextSibling) {
      let r = n.nextSibling;
      for (; r != null; ) {
        if (Ut(r, t))
          return e.insert(`
`);
        const s = t.query(r);
        if (s && s.prototype instanceof Qe)
          return e.insert(`
`);
        r = r.firstChild;
      }
    }
  }
  return e;
}
function Mm(n, e, t) {
  const r = {}, s = n.style || {};
  return s.fontStyle === "italic" && (r.italic = !0), s.textDecoration === "underline" && (r.underline = !0), s.textDecoration === "line-through" && (r.strike = !0), (s.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(s.fontWeight, 10) >= 700) && (r.bold = !0), e = Object.entries(r).reduce((i, a) => {
    let [l, c] = a;
    return pr(i, l, c, t);
  }, e), parseFloat(s.textIndent || 0) > 0 ? new H().insert("	").concat(e) : e;
}
function Fm(n, e, t) {
  const r = n.parentElement?.tagName === "TABLE" ? n.parentElement : n.parentElement?.parentElement;
  if (r != null) {
    const i = Array.from(r.querySelectorAll("tr")).indexOf(n) + 1;
    return pr(e, "table", i, t);
  }
  return e;
}
function Pm(n, e, t) {
  let r = n.data;
  if (n.parentElement?.tagName === "O:P")
    return e.insert(r.trim());
  if (!_l(n)) {
    if (r.trim().length === 0 && r.includes(`
`) && !Lm(n, t))
      return e;
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (n.previousSibling == null && n.parentElement != null && Ut(n.parentElement, t) || n.previousSibling instanceof Element && Ut(n.previousSibling, t)) && (r = r.replace(/^ /, "")), (n.nextSibling == null && n.parentElement != null && Ut(n.parentElement, t) || n.nextSibling instanceof Element && Ut(n.nextSibling, t)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return e.insert(r);
}
class jm extends bt {
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
      r === $.events.SELECTION_CHANGE ? s && a !== $.sources.SILENT && (this.currentRange = s) : r === $.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || a === $.sources.USER ? this.record(s, i) : this.transform(s)), this.currentRange = Li(this.currentRange, s));
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
      range: Li(r.range, i)
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
    ra(this.stack.undo, e), ra(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, $.sources.USER);
    else {
      const t = zm(this.quill.scroll, e.delta);
      this.quill.setSelection(t, $.sources.USER);
    }
  }
}
function ra(n, e) {
  let t = e;
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const s = n[r];
    n[r] = {
      delta: t.transform(s.delta, !0),
      range: s.range && Li(s.range, t)
    }, t = s.delta.transform(t), n[r].delta.length() === 0 && n.splice(r, 1);
  }
}
function Um(n, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((r) => n.query(r, K.BLOCK) != null) : !1;
}
function zm(n, e) {
  const t = e.reduce((s, i) => s + (i.delete || 0), 0);
  let r = e.length() - t;
  return Um(n, e) && (r -= 1), r;
}
function Li(n, e) {
  if (!n) return n;
  const t = e.transformPosition(n.index), r = e.transformPosition(n.index + n.length);
  return {
    index: t,
    length: r - t
  };
}
class Sl extends bt {
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
Sl.DEFAULTS = {
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
      }), new H().retain(n.index).delete(n.length));
      this.quill.updateContents(s, z.sources.USER), this.quill.setSelection(n.index + r.length, z.sources.SILENT);
    });
  }
};
const Hm = ["insertText", "insertReplacementText"];
class Vm extends bt {
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
      this.deleteRange(e), this.quill.updateContents(new H().retain(e.index).insert(t, r), $.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, $.sources.SILENT), !0;
  }
  handleBeforeInput(e) {
    if (this.quill.composition.isComposing || e.defaultPrevented || !Hm.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const r = Km(e);
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
function Km(n) {
  return typeof n.data == "string" ? n.data : n.dataTransfer?.types.includes("text/plain") ? n.dataTransfer.getData("text/plain") : null;
}
const Gm = /Mac/i.test(navigator.platform), Wm = 100, Zm = (n) => !!(n.key === "ArrowLeft" || n.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
n.key === "ArrowUp" || n.key === "ArrowDown" || n.key === "Home" || Gm && n.key === "a" && n.ctrlKey === !0);
class Ym extends bt {
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
        if (!(r instanceof ot) || !r.uiNode)
          return !0;
        const i = getComputedStyle(r.domNode).direction === "rtl";
        return i && s.key !== "ArrowRight" || !i && s.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (s.shiftKey ? 1 : 0), $.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && Zm(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + Wm, this.isListening) return;
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
    if (!(r instanceof ot) || !r.uiNode) return;
    const s = document.createRange();
    s.setStartAfter(r.uiNode), s.setEndAfter(r.uiNode), e.removeAllRanges(), e.addRange(s);
  }
}
$.register({
  "blots/block": Oe,
  "blots/block/embed": Qe,
  "blots/break": ct,
  "blots/container": hr,
  "blots/cursor": st,
  "blots/embed": Gi,
  "blots/inline": ze,
  "blots/scroll": nm,
  "blots/text": at,
  "modules/clipboard": Cm,
  "modules/history": jm,
  "modules/keyboard": fs,
  "modules/uploader": Sl,
  "modules/input": Vm,
  "modules/uiNode": Ym
});
class Xm extends lt {
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
const Qm = new Xm("indent", "ql-indent", {
  scope: K.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Jm extends Oe {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class eg extends Oe {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
class wn extends hr {
}
wn.blotName = "list-container";
wn.tagName = "OL";
class An extends Oe {
  static create(e) {
    const t = super.create();
    return t.setAttribute("data-list", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-list") || void 0;
  }
  static register() {
    $.register(wn);
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
An.blotName = "list";
An.tagName = "LI";
wn.allowedChildren = [An];
An.requiredContainer = wn;
class to extends ze {
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
class tg extends to {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class rs extends ze {
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
    return kl(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
  }
  format(e, t) {
    e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
  }
}
function kl(n, e) {
  const t = document.createElement("a");
  t.href = n;
  const r = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(r) > -1;
}
class rg extends ze {
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
class ng extends to {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class sg extends ze {
  static blotName = "underline";
  static tagName = "U";
}
class ig extends Gi {
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
const na = ["alt", "height", "width"];
let og = class extends Ze {
  static blotName = "image";
  static tagName = "IMG";
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return na.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static match(e) {
    return /\.(jpe?g|gif|png)$/.test(e) || /^data:image\/.+;base64/.test(e);
  }
  static sanitize(e) {
    return kl(e, ["http", "https", "data"]) ? e : "//:0";
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    na.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
};
const sa = ["height", "width"];
class ag extends Qe {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return sa.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static sanitize(e) {
    return rs.sanitize(e);
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    sa.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
  html() {
    const {
      video: e
    } = this.value();
    return `<a href="${e}">${e}</a>`;
  }
}
const sn = new lt("code-token", "hljs", {
  scope: K.INLINE
});
class qt extends ze {
  static formats(e, t) {
    for (; e != null && e !== t.domNode; ) {
      if (e.classList && e.classList.contains(He.className))
        return super.formats(e, t);
      e = e.parentNode;
    }
  }
  constructor(e, t, r) {
    super(e, t, r), sn.add(this.domNode, r);
  }
  format(e, t) {
    e !== qt.blotName ? super.format(e, t) : t ? sn.add(this.domNode, t) : (sn.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), sn.value(this.domNode) || this.unwrap();
  }
}
qt.blotName = "code-token";
qt.className = "ql-token";
class Xe extends He {
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
    return this.formatAt(0, this.length(), qt.blotName, !1), super.replaceWith(e, t);
  }
}
class cn extends fr {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(e, t) {
    e === Xe.blotName && (this.forceNext = !0, this.children.forEach((r) => {
      r.format(e, t);
    }));
  }
  formatAt(e, t, r, s) {
    r === Xe.blotName && (this.forceNext = !0), super.formatAt(e, t, r, s);
  }
  highlight(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const s = `${Array.from(this.domNode.childNodes).filter((a) => a !== this.uiNode).map((a) => a.textContent).join(`
`)}
`, i = Xe.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== s) {
      if (s.trim().length > 0 || this.cachedText == null) {
        const a = this.children.reduce((c, d) => c.concat(fl(d, !1)), new H()), l = e(s, i);
        a.diff(l).reduce((c, d) => {
          let {
            retain: x,
            attributes: g
          } = d;
          return x ? (g && Object.keys(g).forEach((h) => {
            [Xe.blotName, qt.blotName].includes(h) && this.formatAt(c, x, h, g[h]);
          }), c + x) : c;
        }, 0);
      }
      this.cachedText = s, this.forceNext = !1;
    }
  }
  html(e, t) {
    const [r] = this.children.find(e);
    return `<pre data-language="${r ? Xe.formats(r.domNode) : "plain"}">
${hs(this.code(e, t))}
</pre>`;
  }
  optimize(e) {
    if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
      const t = Xe.formats(this.children.head.domNode);
      t !== this.uiNode.value && (this.uiNode.value = t);
    }
  }
}
cn.allowedChildren = [Xe];
Xe.requiredContainer = cn;
Xe.allowedChildren = [qt, st, at, ct];
const lg = (n, e, t) => {
  if (typeof n.versionString == "string") {
    const r = n.versionString.split(".")[0];
    if (parseInt(r, 10) >= 11)
      return n.highlight(t, {
        language: e
      }).value;
  }
  return n.highlight(e, t).value;
};
class Cl extends bt {
  static register() {
    $.register(qt, !0), $.register(Xe, !0), $.register(cn, !0);
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
      if (!(e instanceof cn)) return;
      const t = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((r) => {
        let {
          key: s,
          label: i
        } = r;
        const a = t.ownerDocument.createElement("option");
        a.textContent = i, a.setAttribute("value", s), t.appendChild(a);
      }), t.addEventListener("change", () => {
        e.format(Xe.blotName, t.value), this.quill.root.focus(), this.highlight(e, !0);
      }), e.uiNode == null && (e.attachUI(t), e.children.head && (t.value = Xe.formats(e.children.head.domNode)));
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
    (e == null ? this.quill.scroll.descendants(cn) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update($.sources.SILENT), r != null && this.quill.setSelection(r, $.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return hs(e).split(`
`).reduce((s, i, a) => (a !== 0 && s.insert(`
`, {
        [He.blotName]: t
      }), s.insert(i)), new H());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(He.className), r.innerHTML = lg(this.options.hljs, t, e), eo(this.quill.scroll, r, [(s, i) => {
      const a = sn.value(s);
      return a ? i.compose(new H().retain(i.length(), {
        [qt.blotName]: a
      })) : i;
    }], [(s, i) => s.data.split(`
`).reduce((a, l, c) => (c !== 0 && a.insert(`
`, {
      [He.blotName]: t
    }), a.insert(l)), i)], /* @__PURE__ */ new WeakMap());
  }
}
Cl.DEFAULTS = {
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
class it extends Oe {
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
    e === it.blotName && t ? this.domNode.setAttribute("data-row", t) : super.format(e, t);
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
class lr extends hr {
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
class Ht extends hr {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class ns extends hr {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const e = this.descendants(lr), t = e.reduce((r, s) => Math.max(s.children.length, r), 0);
    e.forEach((r) => {
      new Array(t - r.children.length).fill(0).forEach(() => {
        let s;
        r.children.head != null && (s = it.formats(r.children.head.domNode));
        const i = this.scroll.create(it.blotName, s);
        r.appendChild(i), i.optimize();
      });
    });
  }
  cells(e) {
    return this.rows().map((t) => t.children.at(e));
  }
  deleteColumn(e) {
    const [t] = this.descendant(Ht);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e);
      s?.remove();
    });
  }
  insertColumn(e) {
    const [t] = this.descendant(Ht);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e), i = it.formats(r.children.head.domNode), a = this.scroll.create(it.blotName, i);
      r.insertBefore(a, s);
    });
  }
  insertRow(e) {
    const [t] = this.descendant(Ht);
    if (t == null || t.children.head == null) return;
    const r = ro(), s = this.scroll.create(lr.blotName);
    t.children.head.children.forEach(() => {
      const a = this.scroll.create(it.blotName, r);
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
ns.allowedChildren = [Ht];
Ht.requiredContainer = ns;
Ht.allowedChildren = [lr];
lr.requiredContainer = Ht;
lr.allowedChildren = [it];
it.requiredContainer = lr;
function ro() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class cg extends bt {
  static register() {
    $.register(it), $.register(lr), $.register(Ht), $.register(ns);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(ns).forEach((e) => {
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
    if (t == null || t.statics.blotName !== it.blotName)
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
    }, new H().retain(r.index));
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
const ia = Rt("quill:toolbar");
class no extends bt {
  constructor(e, t) {
    if (super(e, t), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), ug(r, this.options.container), e.container?.parentNode?.insertBefore(r, e.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      ia.error("Container required for toolbar", this.options);
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
      ia.warn("ignoring attaching to nonexistent format", t, e);
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
        this.quill.scroll.query(t).prototype instanceof Ze
      ) {
        if (i = prompt(`Enter ${t}`), !i) return;
        this.quill.updateContents(new H().retain(a.index).delete(a.length).insert({
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
no.DEFAULTS = {};
function oa(n, e, t) {
  const r = document.createElement("button");
  r.setAttribute("type", "button"), r.classList.add(`ql-${e}`), r.setAttribute("aria-pressed", "false"), t != null ? (r.value = t, r.setAttribute("aria-label", `${e}: ${t}`)) : r.setAttribute("aria-label", e), n.appendChild(r);
}
function ug(n, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const r = document.createElement("span");
    r.classList.add("ql-formats"), t.forEach((s) => {
      if (typeof s == "string")
        oa(r, s);
      else {
        const i = Object.keys(s)[0], a = s[i];
        Array.isArray(a) ? dg(r, i, a) : oa(r, i, a);
      }
    }), n.appendChild(r);
  });
}
function dg(n, e, t) {
  const r = document.createElement("select");
  r.classList.add(`ql-${e}`), t.forEach((s) => {
    const i = document.createElement("option");
    s !== !1 ? i.setAttribute("value", String(s)) : i.setAttribute("selected", "selected"), r.appendChild(i);
  }), n.appendChild(r);
}
no.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const n = this.quill.getSelection();
      if (n != null)
        if (n.length === 0) {
          const e = this.quill.getFormat();
          Object.keys(e).forEach((t) => {
            this.quill.scroll.query(t, K.INLINE) != null && this.quill.format(t, !1, $.sources.USER);
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
const hg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', fg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', pg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', mg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', gg = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', bg = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', yg = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', vg = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', aa = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', xg = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', wg = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', Ag = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', Eg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', Ng = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', Tg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', _g = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Sg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', kg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Cg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', Lg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', qg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', Og = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Ig = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', Rg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', $g = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Dg = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', Bg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', Mg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', Fg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', Pg = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', jg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Ug = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', zg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', gn = {
  align: {
    "": hg,
    center: fg,
    right: pg,
    justify: mg
  },
  background: gg,
  blockquote: bg,
  bold: yg,
  clean: vg,
  code: aa,
  "code-block": aa,
  color: xg,
  direction: {
    "": wg,
    rtl: Ag
  },
  formula: Eg,
  header: {
    1: Ng,
    2: Tg,
    3: _g,
    4: Sg,
    5: kg,
    6: Cg
  },
  italic: Lg,
  image: qg,
  indent: {
    "+1": Og,
    "-1": Ig
  },
  link: Rg,
  list: {
    bullet: $g,
    check: Dg,
    ordered: Bg
  },
  script: {
    sub: Mg,
    super: Fg
  },
  strike: Pg,
  table: jg,
  underline: Ug,
  video: zg
}, Hg = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let la = 0;
function ca(n, e) {
  n.setAttribute(e, `${n.getAttribute(e) !== "true"}`);
}
class ps {
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
    this.container.classList.toggle("ql-expanded"), ca(this.label, "aria-expanded"), ca(this.options, "aria-hidden");
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
    return e.classList.add("ql-picker-label"), e.innerHTML = Hg, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
  }
  buildOptions() {
    const e = document.createElement("span");
    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${la}`, la += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
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
class Ll extends ps {
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
class ql extends ps {
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
const Vg = (n) => {
  const {
    overflowY: e
  } = getComputedStyle(n, null);
  return e !== "visible" && e !== "clip";
};
class Ol {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, Vg(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
      const l = i.bottom - i.top, c = e.bottom - e.top + l;
      this.root.style.top = `${r - c}px`, this.root.classList.add("ql-flip");
    }
    return a;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const Kg = [!1, "center", "right", "justify"], Gg = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], Wg = [!1, "serif", "monospace"], Zg = ["1", "2", "3", !1], Yg = ["small", !1, "large", "huge"];
class En extends Br {
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
      if (s.classList.contains("ql-align") && (s.querySelector("option") == null && tn(s, Kg), typeof t.align == "object"))
        return new ql(s, t.align);
      if (s.classList.contains("ql-background") || s.classList.contains("ql-color")) {
        const i = s.classList.contains("ql-background") ? "background" : "color";
        return s.querySelector("option") == null && tn(s, Gg, i === "background" ? "#ffffff" : "#000000"), new Ll(s, t[i]);
      }
      return s.querySelector("option") == null && (s.classList.contains("ql-font") ? tn(s, Wg) : s.classList.contains("ql-header") ? tn(s, Zg) : s.classList.contains("ql-size") && tn(s, Yg)), new ps(s);
    });
    const r = () => {
      this.pickers.forEach((s) => {
        s.update();
      });
    };
    this.quill.on(z.events.EDITOR_CHANGE, r);
  }
}
En.DEFAULTS = zt({}, Br.DEFAULTS, {
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
class Il extends Ol {
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
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", e, z.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", e, z.sources.USER)), this.quill.root.scrollTop = t;
        break;
      }
      case "video":
        e = Xg(e);
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
            z.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(r + 1, " ", z.sources.USER), this.quill.setSelection(r + 2, z.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function Xg(n) {
  let e = n.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || n.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return e ? `${e[1] || "https"}://www.youtube.com/embed/${e[2]}?showinfo=0` : (e = n.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${e[1] || "https"}://player.vimeo.com/video/${e[2]}/` : n;
}
function tn(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  e.forEach((r) => {
    const s = document.createElement("option");
    r === t ? s.setAttribute("selected", "selected") : s.setAttribute("value", String(r)), n.appendChild(s);
  });
}
const Qg = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Jg extends Il {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(e, t) {
    super(e, t), this.quill.on(z.events.EDITOR_CHANGE, (r, s, i, a) => {
      if (r === z.events.SELECTION_CHANGE)
        if (s != null && s.length > 0 && a === z.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const l = this.quill.getLines(s.index, s.length);
          if (l.length === 1) {
            const c = this.quill.getBounds(s);
            c != null && this.position(c);
          } else {
            const c = l[l.length - 1], d = this.quill.getIndex(c), x = Math.min(c.length() - 1, s.index + s.length - d), g = this.quill.getBounds(new ar(d, x));
            g != null && this.position(g);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(z.events.SCROLL_OPTIMIZE, () => {
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
class Rl extends En {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Qg), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new Jg(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), gn), this.buildPickers(e.container.querySelectorAll("select"), gn));
  }
}
Rl.DEFAULTS = zt({}, En.DEFAULTS, {
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
const e0 = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class t0 extends Il {
  static TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join("");
  preview = this.root.querySelector("a.ql-preview");
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (e) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), e.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (e) => {
      if (this.linkRange != null) {
        const t = this.linkRange;
        this.restoreFocus(), this.quill.formatText(t, "link", !1, z.sources.USER), delete this.linkRange;
      }
      e.preventDefault(), this.hide();
    }), this.quill.on(z.events.SELECTION_CHANGE, (e, t, r) => {
      if (e != null) {
        if (e.length === 0 && r === z.sources.USER) {
          const [s, i] = this.quill.scroll.descendant(rs, e.index);
          if (s != null) {
            this.linkRange = new ar(e.index - i, s.length());
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
class $l extends En {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = e0), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), gn), this.buildPickers(e.container.querySelectorAll("select"), gn), this.tooltip = new t0(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, r) => {
      e.handlers.link.call(e, !r.format.link);
    }));
  }
}
$l.DEFAULTS = zt({}, En.DEFAULTS, {
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
  "attributors/attribute/direction": yl,
  "attributors/class/align": ml,
  "attributors/class/background": om,
  "attributors/class/color": im,
  "attributors/class/direction": vl,
  "attributors/class/font": Al,
  "attributors/class/size": Nl,
  "attributors/style/align": gl,
  "attributors/style/background": Yi,
  "attributors/style/color": Zi,
  "attributors/style/direction": xl,
  "attributors/style/font": El,
  "attributors/style/size": Tl
}, !0);
$.register({
  "formats/align": ml,
  "formats/direction": vl,
  "formats/indent": Qm,
  "formats/background": Yi,
  "formats/color": Zi,
  "formats/font": Al,
  "formats/size": Nl,
  "formats/blockquote": Jm,
  "formats/code-block": He,
  "formats/header": eg,
  "formats/list": An,
  "formats/bold": to,
  "formats/code": Xi,
  "formats/italic": tg,
  "formats/link": rs,
  "formats/script": rg,
  "formats/strike": ng,
  "formats/underline": sg,
  "formats/formula": ig,
  "formats/image": og,
  "formats/video": ag,
  "modules/syntax": Cl,
  "modules/table": cg,
  "modules/toolbar": no,
  "themes/bubble": Rl,
  "themes/snow": $l,
  "ui/icons": gn,
  "ui/picker": ps,
  "ui/icon-picker": ql,
  "ui/color-picker": Ll,
  "ui/tooltip": Ol
}, !0);
const r0 = { class: "rounded-lg border border-slate-300 bg-white" }, n0 = /* @__PURE__ */ Ot({
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
    bn(() => {
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
    }), ba(() => {
      i = null;
    }), nr(
      () => t.modelValue,
      (c) => {
        i && i.root.innerHTML !== c && (i.root.innerHTML = c || "");
      }
    ), nr(
      () => t.disabled,
      (c) => {
        i?.enable(!c);
      }
    );
    async function a() {
      if (!i)
        return;
      const c = document.createElement("input");
      c.type = "file", c.accept = "image/*", c.click(), c.onchange = async () => {
        const d = c.files?.[0];
        if (!d)
          return;
        const x = i?.getSelection(!0);
        if (x)
          try {
            if (t.disabled)
              return;
            let g = "";
            t.subirImagen ? g = await t.subirImagen(d) : g = await l(d), i?.insertEmbed(x.index, "image", g, "user");
          } catch (g) {
            console.error("No se pudo subir la imagen al editor:", g);
          }
      };
    }
    function l(c) {
      return new Promise((d, x) => {
        const g = new FileReader();
        g.onload = () => d(String(g.result)), g.onerror = () => x(new Error("No fue posible leer la imagen.")), g.readAsDataURL(c);
      });
    }
    return (c, d) => (B(), F("div", r0, [
      w("div", {
        ref_key: "root",
        ref: s,
        class: "min-h-[260px]"
      }, null, 512)
    ]));
  }
}), s0 = { class: "space-y-2" }, i0 = {
  key: 0,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, o0 = { class: "block text-xs font-semibold uppercase tracking-wide text-slate-500" }, a0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, l0 = {
  key: 0,
  class: "space-y-2"
}, c0 = ["value", "disabled", "onChange"], u0 = ["value", "disabled", "onInput"], d0 = ["disabled", "onClick"], h0 = ["disabled"], f0 = {
  key: 1,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, p0 = { class: "flex items-center justify-between" }, m0 = { class: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, g0 = ["disabled", "onClick"], b0 = ["disabled"], y0 = {
  key: 2,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, v0 = ["checked", "disabled"], x0 = ["value", "placeholder", "disabled"], w0 = ["value", "disabled"], A0 = ["value"], E0 = ["value", "placeholder", "disabled"], N0 = ["value", "step", "placeholder", "disabled"], T0 = ["value", "placeholder", "disabled"], _0 = /* @__PURE__ */ Ot({
  name: "CmsNestedValueEditor",
  __name: "CmsNestedValueEditor",
  props: {
    schema: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = qe(
      () => Array.isArray(t.schema.mapFields) ? t.schema.mapFields : []
    ), i = qe(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), a = qe(() => d(t.modelValue)), l = qe(() => Array.isArray(t.modelValue) ? t.modelValue : []), c = qe(() => Object.entries(a.value));
    function d(L) {
      return L && typeof L == "object" && !Array.isArray(L) ? L : {};
    }
    function x(L) {
      return L.type === "array" ? [] : L.type === "map" ? {} : L.type === "boolean" ? !1 : L.type === "date" ? "" : L.type === "numeric" || L.type === "id" ? null : "";
    }
    function g(L, f) {
      r("update:modelValue", {
        ...a.value,
        [L]: f
      });
    }
    function h() {
      r("update:modelValue", [...l.value, x(i.value)]);
    }
    function m(L) {
      const f = [...l.value];
      f.splice(L, 1), r("update:modelValue", f);
    }
    function _(L, f) {
      const p = [...l.value];
      p[L] = f, r("update:modelValue", p);
    }
    function k(L) {
      r("update:modelValue", L);
    }
    function q(L) {
      r("update:modelValue", L);
    }
    function I(L) {
      if (!L.trim()) {
        r("update:modelValue", null);
        return;
      }
      const f = Number(L);
      r("update:modelValue", Number.isFinite(f) ? f : null);
    }
    function P(L) {
      if (typeof L == "number" && Number.isFinite(L))
        return String(L);
      if (typeof L == "string") {
        const f = L.trim();
        if (!f)
          return "";
        const p = Number(f);
        if (Number.isFinite(p))
          return String(p);
      }
      return "";
    }
    function U(L) {
      r("update:modelValue", b(L));
    }
    function W(L) {
      return b(L);
    }
    function V() {
      const L = a.value;
      let f = 1, p = `campo_${f}`;
      for (; p in L; )
        f += 1, p = `campo_${f}`;
      r("update:modelValue", {
        ...L,
        [p]: ""
      });
    }
    function ie(L) {
      const f = { ...a.value };
      delete f[L], r("update:modelValue", f);
    }
    function re(L, f) {
      const p = f.trim();
      if (!p || p === L)
        return;
      const E = { ...a.value }, N = E[L];
      delete E[L], E[p] = N, r("update:modelValue", E);
    }
    function ge(L, f) {
      const p = { ...a.value };
      p[L] = we(f), r("update:modelValue", p);
    }
    function Ae(L) {
      if (typeof L == "string")
        return L;
      if (L == null)
        return "";
      try {
        return JSON.stringify(L);
      } catch {
        return String(L);
      }
    }
    function we(L) {
      const f = L.trim();
      if (!f)
        return "";
      if (f.startsWith("{") && f.endsWith("}") || f.startsWith("[") && f.endsWith("]"))
        try {
          return JSON.parse(f);
        } catch {
          return L;
        }
      return L;
    }
    function b(L) {
      if (typeof L == "string") {
        const f = L.trim();
        if (!f)
          return "";
        const p = M(f);
        if (p)
          return S(p);
        const E = new Date(f);
        return Number.isNaN(E.getTime()) ? "" : S(E);
      }
      if (L instanceof Date && !Number.isNaN(L.getTime()))
        return S(L);
      if (L && typeof L == "object" && "toDate" in L && typeof L.toDate == "function") {
        const f = L.toDate();
        if (f instanceof Date && !Number.isNaN(f.getTime()))
          return S(f);
      }
      return "";
    }
    function M(L) {
      const f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(L);
      if (!f)
        return null;
      const p = Number(f[1]), E = Number(f[2]), N = Number(f[3]), A = new Date(Date.UTC(p, E - 1, N));
      return A.getUTCFullYear() !== p || A.getUTCMonth() + 1 !== E || A.getUTCDate() !== N ? null : A;
    }
    function S(L) {
      const f = String(L.getUTCFullYear()).padStart(4, "0"), p = String(L.getUTCMonth() + 1).padStart(2, "0"), E = String(L.getUTCDate()).padStart(2, "0");
      return `${f}-${p}-${E}`;
    }
    return (L, f) => {
      const p = ya("CmsNestedValueEditor", !0);
      return B(), F("div", s0, [
        n.schema.type === "map" ? (B(), F("section", i0, [
          (B(!0), F(Fe, null, Pe(s.value, (E) => (B(), F("article", {
            key: E.key,
            class: "space-y-1 rounded-md border border-slate-200 bg-white p-3"
          }, [
            w("label", o0, Q(E.label), 1),
            E.helpText ? (B(), F("p", a0, Q(E.helpText), 1)) : se("", !0),
            Ct(p, {
              schema: E,
              "model-value": a.value[E.key],
              disabled: n.disabled,
              "onUpdate:modelValue": (N) => g(E.key, N)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          s.value.length ? se("", !0) : (B(), F("div", l0, [
            (B(!0), F(Fe, null, Pe(c.value, ([E, N]) => (B(), F("article", {
              key: E,
              class: "grid gap-2 rounded-md border border-slate-200 bg-white p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              w("input", {
                value: E,
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onChange: (A) => re(E, A.target.value)
              }, null, 40, c0),
              w("input", {
                value: Ae(N),
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onInput: (A) => ge(E, A.target.value)
              }, null, 40, u0),
              w("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (A) => ie(E)
              }, " Quitar ", 8, d0)
            ]))), 128)),
            w("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
              disabled: n.disabled,
              onClick: V
            }, " Agregar propiedad ", 8, h0),
            f[6] || (f[6] = w("p", { class: "text-xs text-slate-500" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : n.schema.type === "array" ? (B(), F("section", f0, [
          (B(!0), F(Fe, null, Pe(l.value, (E, N) => (B(), F("article", {
            key: N,
            class: "space-y-2 rounded-md border border-slate-200 bg-white p-3"
          }, [
            w("div", p0, [
              w("p", m0, "Item " + Q(N + 1), 1),
              w("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (A) => m(N)
              }, " Quitar ", 8, g0)
            ]),
            Ct(p, {
              schema: i.value,
              "model-value": E,
              disabled: n.disabled,
              "onUpdate:modelValue": (A) => _(N, A)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          w("button", {
            type: "button",
            class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
            disabled: n.disabled,
            onClick: h
          }, " Agregar item ", 8, b0)
        ])) : n.schema.type === "boolean" ? (B(), F("label", y0, [
          w("input", {
            type: "checkbox",
            checked: !!n.modelValue,
            disabled: n.disabled,
            onChange: f[0] || (f[0] = (E) => q(E.target.checked))
          }, null, 40, v0),
          f[7] || (f[7] = We(" Activo ", -1))
        ])) : n.schema.type === "textarea" || n.schema.type === "richtext" ? (B(), F("textarea", {
          key: 3,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          rows: "4",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[1] || (f[1] = (E) => k(E.target.value))
        }, null, 40, x0)) : n.schema.type === "select" ? (B(), F("select", {
          key: 4,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onChange: f[2] || (f[2] = (E) => k(E.target.value))
        }, [
          f[8] || (f[8] = w("option", { value: "" }, "Selecciona una opción", -1)),
          (B(!0), F(Fe, null, Pe(n.schema.options || [], (E) => (B(), F("option", {
            key: E,
            value: E
          }, Q(E), 9, A0))), 128))
        ], 40, w0)) : n.schema.type === "date" ? (B(), F("input", {
          key: 5,
          value: W(n.modelValue),
          type: "date",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[3] || (f[3] = (E) => U(E.target.value))
        }, null, 40, E0)) : n.schema.type === "numeric" || n.schema.type === "id" ? (B(), F("input", {
          key: 6,
          value: P(n.modelValue),
          type: "number",
          step: n.schema.type === "id" ? "1" : "any",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[4] || (f[4] = (E) => I(E.target.value))
        }, null, 40, N0)) : (B(), F("input", {
          key: 7,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          type: "text",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[5] || (f[5] = (E) => k(E.target.value))
        }, null, 40, T0))
      ]);
    };
  }
}), S0 = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};
async function k0(n, e = {}) {
  if (!n.type.startsWith("image/"))
    return n;
  const t = { ...S0, ...e }, r = await L0(n), { width: s, height: i } = C0(r.width, r.height, t.maxWidth, t.maxHeight), a = document.createElement("canvas");
  a.width = s, a.height = i;
  const l = a.getContext("2d");
  if (!l)
    return n;
  l.drawImage(r, 0, 0, s, i);
  let c = t.quality, d = await ua(a, n.type || "image/jpeg", c);
  const x = t.targetSizeKb * 1024;
  for (; d.size > x && c > 0.45; )
    c -= 0.08, d = await ua(a, n.type || "image/jpeg", c);
  return d;
}
function C0(n, e, t, r) {
  let s = n, i = e;
  return s > t && (i = Math.round(i * t / s), s = t), i > r && (s = Math.round(s * r / i), i = r), { width: s, height: i };
}
function ua(n, e, t) {
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
function L0(n) {
  return new Promise((e, t) => {
    const r = new Image(), s = URL.createObjectURL(n);
    r.onload = () => {
      URL.revokeObjectURL(s), e(r);
    }, r.onerror = () => {
      URL.revokeObjectURL(s), t(new Error("No fue posible leer la imagen."));
    }, r.src = s;
  });
}
async function q0(n, e, t) {
  const { storage: r } = Se(), s = Kl(r, n);
  return await Gl(s, e, t), Wl(s);
}
async function da(n, e, t = {}) {
  const r = await k0(e, {
    maxWidth: t.maxWidth,
    maxHeight: t.maxHeight,
    quality: t.quality,
    targetSizeKb: t.targetSizeKb
  });
  return q0(n, r, t.metadata);
}
async function O0(n, e) {
  const { firestore: t } = Se(), r = await M0(n, e);
  return (await zl(sr(t, n.collectionName), {
    ...r,
    createdAt: Ge(),
    updatedAt: Ge()
  })).id;
}
async function ha(n, e = 100) {
  const { firestore: t } = Se();
  try {
    const r = Oi(
      sr(t, n.collectionName),
      Ii("createdAt", "desc"),
      xa(e)
    );
    return (await Ir(r)).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  } catch {
    return (await Ir(sr(t, n.collectionName))).docs.map((s) => ({
      id: s.id,
      data: s.data()
    }));
  }
}
async function I0(n, e) {
  const { firestore: t } = Se();
  await Hl(Kt(t, n.collectionName, e));
}
async function R0(n, e, t) {
  const { firestore: r } = Se(), s = F0(n, t);
  await va(Kt(r, n.collectionName, e), {
    ...s,
    updatedAt: Ge()
  });
}
const Dl = "main", $0 = "schema";
async function D0(n, e, t = Dl) {
  const { firestore: r } = Se(), s = n.dictionaryDocumentId || t, i = Bl(n), a = Kt(r, n.collectionName, s), l = await ss(a), c = {
    updatedAt: Ge(),
    createdAt: l.exists() ? l.data().createdAt : Ge()
  };
  if (i)
    c[i] = e;
  else
    for (const [d, x] of Object.entries(e))
      c[d] = x;
  return await Yn(
    a,
    c,
    { merge: !0 }
  ), s;
}
async function B0(n, e = Dl) {
  const { firestore: t } = Se(), r = n.dictionaryDocumentId || e, s = await ss(Kt(t, n.collectionName, r));
  if (!s.exists())
    return null;
  const i = s.data(), a = Bl(n), l = a ? i[a] : null;
  return l && typeof l == "object" && !Array.isArray(l) ? {
    id: s.id,
    data: l
  } : {
    id: s.id,
    data: i
  };
}
function Bl(n) {
  return n.storageType !== "dictionary" ? "" : typeof n.dictionaryRootKey == "string" && n.dictionaryRootKey.trim() ? n.dictionaryRootKey.trim() : $0;
}
async function M0(n, e) {
  const t = Ml(n);
  if (!t.length)
    return { ...e };
  const { firestore: r } = Se(), s = { ...e };
  for (const i of t)
    s[i.key] = await P0(r, n.collectionName, i.key);
  return s;
}
function F0(n, e) {
  const t = Ml(n);
  if (!t.length)
    return { ...e };
  const r = { ...e };
  for (const s of t)
    delete r[s.key];
  return r;
}
function Ml(n) {
  return n.storageType !== "document" ? [] : n.fields.filter((e) => e.type === "id");
}
async function P0(n, e, t) {
  let r = 0;
  try {
    const a = (await Ir(
      Oi(
        sr(n, e),
        Ii(t, "desc"),
        xa(1)
      )
    )).docs[0]?.data()?.[t], l = fa(a);
    l !== null && (r = l);
  } catch {
    r = 0;
  }
  if (r > 0)
    return r + 1;
  const s = await Ir(sr(n, e));
  for (const i of s.docs) {
    const a = fa(i.data()?.[t]);
    a !== null && a > r && (r = a);
  }
  return r + 1;
}
function fa(n) {
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
function j0(n) {
  return `${n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}-${Date.now().toString().slice(-6)}`;
}
const U0 = { class: "space-y-4" }, z0 = { class: "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" }, H0 = {
  key: 0,
  class: "mt-2 text-xs text-slate-500"
}, V0 = {
  key: 1,
  class: "mt-2 text-xs text-rose-700"
}, K0 = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, G0 = { class: "text-xl font-black text-slate-900" }, W0 = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, Z0 = { class: "block text-sm font-semibold text-slate-700" }, Y0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, X0 = ["value", "placeholder", "disabled", "onInput"], Q0 = ["value", "placeholder", "disabled", "onInput"], J0 = {
  key: 3,
  class: "space-y-1"
}, e1 = ["value", "step", "min", "placeholder", "disabled", "onInput"], t1 = {
  key: 0,
  class: "text-xs text-slate-500"
}, r1 = ["value", "placeholder", "disabled", "onInput"], n1 = ["value", "disabled", "onChange"], s1 = ["value"], i1 = {
  key: 6,
  class: "space-y-2"
}, o1 = ["value", "disabled", "onChange"], a1 = ["value"], l1 = {
  key: 0,
  class: "text-xs text-slate-500"
}, c1 = {
  key: 7,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, u1 = ["checked", "disabled", "onChange"], d1 = {
  key: 8,
  class: "space-y-2"
}, h1 = ["disabled", "onChange"], f1 = {
  key: 0,
  class: "text-xs text-slate-500 break-all"
}, p1 = ["src"], m1 = ["disabled", "onClick"], g1 = {
  key: 0,
  class: "rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700"
}, b1 = {
  key: 1,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, y1 = {
  key: 2,
  class: "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, v1 = { class: "flex flex-wrap items-center gap-2" }, x1 = ["disabled"], w1 = ["disabled"], A1 = { class: "mt-6 border-t border-slate-200 pt-5" }, E1 = {
  key: 0,
  class: "mt-3 text-sm text-slate-500"
}, N1 = {
  key: 1,
  class: "mt-3 text-sm text-slate-500"
}, T1 = {
  key: 2,
  class: "mt-3 space-y-2"
}, _1 = { class: "text-sm font-semibold text-slate-900" }, S1 = { class: "text-xs text-slate-500" }, k1 = {
  key: 0,
  class: "flex items-center gap-2"
}, C1 = ["disabled", "onClick"], L1 = ["disabled", "onClick"], q1 = /* @__PURE__ */ Ot({
  __name: "AdminBlogPage",
  setup(n) {
    const e = is(), t = yn(), r = ee([]), s = ee(""), i = ee(!1), a = ee(""), l = ee({}), c = ee({}), d = ee([]), x = ee(!1), g = ee(!1), h = ee(""), m = ee(""), _ = ee({}), k = ee(""), q = qe(() => kr.value === "admin" || kr.value === "writer" || kr.value === "manager"), I = qe(() => r.value.find((T) => T.id === s.value) ?? null), P = qe(() => !!k.value);
    bn(async () => {
      await U();
    }), nr(
      I,
      async (T) => {
        if (!T) {
          l.value = {}, c.value = {}, d.value = [], _.value = {}, k.value = "";
          return;
        }
        re(T), await ge(T), await Ae(T);
      },
      { immediate: !0 }
    ), nr(
      () => e.query.schema,
      (T) => {
        typeof T == "string" && r.value.some((y) => y.id === T) && s.value !== T && (s.value = T);
      }
    );
    async function U() {
      i.value = !0, a.value = "";
      try {
        await W();
      } catch {
        a.value = "No se pudieron cargar los tipos de contenido.";
      } finally {
        i.value = !1;
      }
    }
    async function W() {
      const T = await Di();
      if (r.value = T, !T.length) {
        s.value = "";
        return;
      }
      const y = typeof e.query.schema == "string" ? e.query.schema : "";
      if (y && T.some((R) => R.id === y)) {
        s.value = y;
        return;
      }
      T.some((R) => R.id === s.value) || (s.value = T[0].id, await V(s.value));
    }
    async function V(T) {
      T && e.query.schema !== T && await t.replace({
        query: {
          ...e.query,
          schema: T
        }
      });
    }
    function ie(T) {
      return !!T && typeof T == "object" && !Array.isArray(T);
    }
    function re(T) {
      const y = {}, C = {};
      for (const R of T.fields)
        R.type === "boolean" ? y[R.key] = !1 : R.type === "array" ? y[R.key] = [] : R.type === "map" ? y[R.key] = {} : R.type === "date" ? y[R.key] = "" : R.type === "numeric" || R.type === "id" ? y[R.key] = null : (R.type, y[R.key] = ""), R.type === "image" && (C[R.key] = null);
      l.value = y, c.value = C, k.value = "", h.value = "", m.value = "";
    }
    async function ge(T) {
      x.value = !0;
      try {
        if (T.storageType === "dictionary") {
          const C = await B0(T);
          d.value = C ? [C] : [], k.value = "", C && M(T, C);
          return;
        }
        const y = await ha(T, 100);
        d.value = y, k.value && !y.some((C) => C.id === k.value) && (k.value = "");
      } finally {
        x.value = !1;
      }
    }
    async function Ae(T) {
      const y = T.fields.filter((R) => R.type === "document");
      if (!y.length) {
        _.value = {};
        return;
      }
      const C = {};
      await Promise.all(
        y.map(async (R) => {
          const ne = typeof R.documentSchemaId == "string" ? R.documentSchemaId.trim() : "";
          if (!ne) {
            C[R.key] = { options: [], byId: {} };
            return;
          }
          const fe = r.value.find((Te) => Te.id === ne);
          if (!fe || fe.storageType !== "document") {
            C[R.key] = { options: [], byId: {} };
            return;
          }
          const Ie = typeof R.documentLabelField == "string" && R.documentLabelField.trim() || fe.previewField || fe.slugFromField || fe.fields[0]?.key || "", gr = await ha(fe, 200), At = {}, Et = gr.map((Te) => (At[Te.id] = Te, {
            id: Te.id,
            label: we(Te, Ie),
            hint: b(Te)
          }));
          C[R.key] = { options: Et, byId: At };
        })
      ), _.value = C;
    }
    function we(T, y) {
      const C = y ? T.data[y] : null;
      return typeof C == "string" && C.trim() ? C.trim() : T.id;
    }
    function b(T) {
      const y = T.data.telefono;
      return typeof y == "string" && y.trim() ? `Tel: ${y.trim()}` : "";
    }
    function M(T, y) {
      const C = { ...l.value };
      for (const R of T.fields) {
        const ne = y.data[R.key];
        R.type === "boolean" ? C[R.key] = !!ne : R.type === "array" || R.type === "map" ? C[R.key] = N(R, ne) : R.type === "date" ? C[R.key] = vt(ne) : R.type === "numeric" ? C[R.key] = ut(ne) : R.type === "id" ? C[R.key] = Yt(ne) : R.type === "document" ? C[R.key] = typeof ne == "string" ? ne : "" : typeof ne == "string" ? C[R.key] = ne : C[R.key] = "";
      }
      l.value = C;
    }
    function S(T) {
      const y = I.value;
      !y || y.storageType !== "document" || (re(y), M(y, T), k.value = T.id);
    }
    function L() {
      const T = I.value;
      !T || T.storageType !== "document" || re(T);
    }
    async function f() {
      const T = I.value;
      if (T) {
        if (h.value = "", m.value = "", !q.value) {
          m.value = "Tu rol no tiene permisos para crear o editar contenido.";
          return;
        }
        g.value = !0;
        try {
          const y = {};
          for (const C of T.fields)
            y[C.key] = await p(T, C), E(T, C, y[C.key]);
          if (T.slugFromField) {
            const C = y[T.slugFromField];
            typeof C == "string" && C.trim() && (y.slug = j0(C));
          }
          T.storageType === "dictionary" ? (await D0(T, y), h.value = "Registro de diccionario actualizado.") : (k.value ? (await R0(T, k.value, y), h.value = "Registro actualizado correctamente.") : (await O0(T, y), h.value = "Registro creado correctamente."), re(T)), await ge(T);
        } catch (y) {
          m.value = y instanceof Error ? y.message : "No se pudo guardar el registro.";
        } finally {
          g.value = !1;
        }
      }
    }
    async function p(T, y) {
      if (y.type === "boolean")
        return !!l.value[y.key];
      if (y.type === "image") {
        const C = c.value[y.key];
        if (!C)
          return Y(y.key);
        const R = yt(C.name), ne = await da(
          `${T.collectionName}/${y.key}/${Date.now()}-${R}`,
          C,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return l.value[y.key] = ne, c.value[y.key] = null, ne;
      }
      return y.type === "array" || y.type === "map" ? N(y, l.value[y.key], !0) : y.type === "date" ? X(y.key) : y.type === "numeric" ? be(y.key) : y.type === "id" ? T.storageType === "document" && !k.value ? null : Yt(l.value[y.key]) : (y.type === "document", Y(y.key));
    }
    function E(T, y, C) {
      if (y.required && y.type !== "boolean") {
        if (y.type === "array") {
          if (!Array.isArray(C) || !C.length)
            throw new Error(`El campo "${y.label}" es obligatorio y debe tener al menos 1 elemento.`);
          return;
        }
        if (y.type === "map") {
          if (!ie(C) || Object.keys(C).length === 0)
            throw new Error(`El campo "${y.label}" es obligatorio y debe tener al menos 1 propiedad.`);
          return;
        }
        if (!(y.type === "id" && T.storageType === "document" && !k.value)) {
          if (y.type === "numeric") {
            if (typeof C != "number" || !Number.isFinite(C))
              throw new Error(`El campo "${y.label}" es obligatorio y debe ser numérico.`);
            return;
          }
          if (y.type === "id") {
            if (typeof C != "number" || !Number.isInteger(C) || C < 1)
              throw new Error(`El campo "${y.label}" es obligatorio y debe ser un entero mayor o igual a 1.`);
            return;
          }
          if (y.type === "date") {
            if (!(C instanceof Date) || Number.isNaN(C.getTime()))
              throw new Error(`El campo "${y.label}" es obligatorio y debe ser una fecha válida.`);
            return;
          }
          if (typeof C != "string" || !C.trim())
            throw new Error(`El campo "${y.label}" es obligatorio.`);
        }
      }
    }
    function N(T, y, C = !1) {
      if (typeof y == "string") {
        const ne = y.trim();
        if (!(ne.startsWith("{") || ne.startsWith("[")))
          y = T.type === "array" ? [] : {};
        else
          try {
            y = JSON.parse(ne);
          } catch {
            y = T.type === "array" ? [] : {};
          }
      }
      if (T.type === "array") {
        const ne = Array.isArray(y) ? y : [];
        return T.itemSchema ? ne.map(
          (fe, Ie) => D(
            T.itemSchema,
            fe,
            `${T.label}[${Ie}]`,
            C
          )
        ) : ne;
      }
      const R = ie(y) ? y : {};
      return Array.isArray(T.mapFields) && T.mapFields.length > 0 ? A(T.mapFields, R, T.label, C) : R;
    }
    function A(T, y, C, R = !1) {
      const ne = {};
      for (const fe of T) {
        const Ie = fe.key;
        if (!(Ie in y)) {
          if (fe.required)
            throw new Error(`Falta la propiedad requerida "${C}.${Ie}".`);
          continue;
        }
        ne[Ie] = D(fe, y[Ie], `${C}.${Ie}`, R);
      }
      return ne;
    }
    function D(T, y, C, R = !1) {
      if (T.type === "array") {
        if (!Array.isArray(y))
          throw new Error(`"${C}" debe ser un arreglo.`);
        return T.itemSchema ? y.map(
          (ne, fe) => D(T.itemSchema, ne, `${C}[${fe}]`, R)
        ) : y;
      }
      if (T.type === "map") {
        if (!ie(y))
          throw new Error(`"${C}" debe ser un objeto.`);
        return !Array.isArray(T.mapFields) || T.mapFields.length === 0 ? y : A(T.mapFields, y, C, R);
      }
      if (T.type === "boolean") {
        if (typeof y != "boolean")
          throw new Error(`"${C}" debe ser boolean.`);
        return y;
      }
      if (T.type === "document") {
        if (typeof y != "string")
          throw new Error(`"${C}" debe ser string (id de documento).`);
        return y;
      }
      if (T.type === "numeric") {
        if (typeof y != "number" || !Number.isFinite(y))
          throw new Error(`"${C}" debe ser numérico.`);
        return y;
      }
      if (T.type === "id") {
        if (typeof y != "number" || !Number.isInteger(y) || y < 1)
          throw new Error(`"${C}" debe ser un número entero mayor o igual a 1.`);
        return y;
      }
      if (T.type === "date") {
        const ne = je(y);
        if (!ne)
          throw new Error(`"${C}" debe ser una fecha válida.`);
        return R ? ne : vt(ne);
      }
      if (typeof y != "string")
        throw new Error(`"${C}" debe ser string.`);
      if (T.type === "select" && Array.isArray(T.options) && T.options.length > 0 && y && !T.options.includes(y))
        throw new Error(`"${C}" no coincide con las opciones del select.`);
      return y;
    }
    async function j(T) {
      const y = I.value;
      if (!(!y || y.storageType !== "document")) {
        if (!q.value) {
          m.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await I0(y, T), k.value === T && re(y), await ge(y));
      }
    }
    async function G(T) {
      const y = I.value;
      if (!y)
        throw new Error("No hay schema seleccionado.");
      const C = yt(T.name);
      return da(
        `${y.collectionName}/editor/${Date.now()}-${C}`,
        T,
        { maxWidth: 1600, maxHeight: 1600, targetSizeKb: 700, quality: 0.8 }
      );
    }
    function Y(T) {
      const y = l.value[T];
      return typeof y == "string" ? y : "";
    }
    function oe(T) {
      return vt(l.value[T]);
    }
    function X(T) {
      return je(l.value[T]);
    }
    function be(T) {
      return ut(l.value[T]);
    }
    function ye(T) {
      const y = be(T);
      return typeof y == "number" ? String(y) : "";
    }
    function J(T, y) {
      l.value[T] = y;
    }
    function ue(T, y) {
      l.value[T] = vt(y);
    }
    function ae(T, y) {
      l.value[T] = ut(y);
    }
    function le(T) {
      return _.value[T.key]?.options ?? [];
    }
    function de(T) {
      const y = Y(T.key);
      return y ? le(T).find((R) => R.id === y)?.hint ?? "" : "";
    }
    function pe(T) {
      return l.value[T];
    }
    function Ee(T, y) {
      l.value[T] = y;
    }
    function ke(T) {
      return !!l.value[T];
    }
    function Zt(T, y) {
      l.value[T] = y;
    }
    function mr(T, y) {
      const C = y.target;
      c.value[T] = C.files?.[0] ?? null;
    }
    function Mr(T) {
      l.value[T] = "", c.value[T] = null;
    }
    function Fr(T, y) {
      const C = y.previewField || y.slugFromField || y.fields[0]?.key;
      if (!C)
        return T.id;
      const R = T.data[C];
      if (y.fields.find((fe) => fe.key === C)?.type === "date") {
        const fe = xt(R);
        if (fe)
          return fe;
      }
      return typeof R == "string" && R.trim() ? R : typeof R == "boolean" ? R ? "true" : "false" : typeof R == "number" && Number.isFinite(R) ? String(R) : Array.isArray(R) ? `[array:${R.length}]` : ie(R) ? "[map]" : T.id;
    }
    function yt(T) {
      return T.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
    }
    function ut(T) {
      if (typeof T == "number")
        return Number.isFinite(T) ? T : null;
      if (typeof T == "string") {
        const y = T.trim();
        if (!y)
          return null;
        const C = Number(y);
        return Number.isFinite(C) ? C : null;
      }
      return null;
    }
    function Yt(T) {
      const y = ut(T);
      return y === null || !Number.isInteger(y) || y < 1 ? null : y;
    }
    function vt(T) {
      const y = je(T);
      return y ? Pr(y) : "";
    }
    function je(T) {
      if (T instanceof Date && !Number.isNaN(T.getTime()))
        return T;
      if (T && typeof T == "object" && "toDate" in T && typeof T.toDate == "function") {
        const y = T.toDate();
        if (y instanceof Date && !Number.isNaN(y.getTime()))
          return y;
      }
      if (typeof T == "string") {
        const y = T.trim();
        if (!y)
          return null;
        const C = $t(y);
        if (C)
          return C;
        const R = new Date(y);
        return Number.isNaN(R.getTime()) ? null : R;
      }
      if (typeof T == "number" && Number.isFinite(T)) {
        const y = new Date(T);
        if (!Number.isNaN(y.getTime()))
          return y;
      }
      return null;
    }
    function $t(T) {
      const y = /^(\d{4})-(\d{2})-(\d{2})$/.exec(T);
      if (!y)
        return null;
      const C = Number(y[1]), R = Number(y[2]), ne = Number(y[3]), fe = new Date(Date.UTC(C, R - 1, ne));
      return fe.getUTCFullYear() !== C || fe.getUTCMonth() + 1 !== R || fe.getUTCDate() !== ne ? null : fe;
    }
    function Pr(T) {
      const y = String(T.getUTCFullYear()).padStart(4, "0"), C = String(T.getUTCMonth() + 1).padStart(2, "0"), R = String(T.getUTCDate()).padStart(2, "0");
      return `${y}-${C}-${R}`;
    }
    function xt(T) {
      const y = je(T);
      if (!y)
        return "";
      const C = String(y.getUTCDate()).padStart(2, "0"), R = String(y.getUTCMonth() + 1).padStart(2, "0"), ne = String(y.getUTCFullYear()).padStart(4, "0");
      return `${C}/${R}/${ne}`;
    }
    function wt(T) {
      return T.type === "id" && I.value?.storageType === "document";
    }
    return (T, y) => (B(), F("section", U0, [
      w("article", z0, [
        y[0] || (y[0] = We(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        y[1] || (y[1] = w("strong", null, "Esquemas", -1)),
        y[2] || (y[2] = We(". ", -1)),
        i.value ? (B(), F("p", H0, "Cargando formularios...")) : a.value ? (B(), F("p", V0, Q(a.value), 1)) : se("", !0)
      ]),
      w("article", K0, [
        w("h3", G0, Q(I.value ? `Formulario y registros: ${I.value.title}` : "Formulario y registros"), 1),
        y[7] || (y[7] = w("p", { class: "mt-1 text-sm text-slate-600" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        q.value ? se("", !0) : (B(), F("p", W0, " No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        I.value ? (B(), F("form", {
          key: 1,
          class: "mt-5 space-y-4",
          onSubmit: qi(f, ["prevent"])
        }, [
          (B(!0), F(Fe, null, Pe(I.value.fields, (C) => (B(), F("div", {
            key: C.key,
            class: "space-y-1"
          }, [
            w("label", Z0, Q(C.label), 1),
            C.helpText ? (B(), F("p", Y0, Q(C.helpText), 1)) : se("", !0),
            C.type === "text" ? (B(), F("input", {
              key: 1,
              value: Y(C.key),
              type: "text",
              placeholder: C.placeholder || "",
              disabled: !q.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: (R) => J(C.key, R.target.value)
            }, null, 40, X0)) : C.type === "date" ? (B(), F("input", {
              key: 2,
              value: oe(C.key),
              type: "date",
              placeholder: C.placeholder || "",
              disabled: !q.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: (R) => ue(C.key, R.target.value)
            }, null, 40, Q0)) : C.type === "numeric" || C.type === "id" ? (B(), F("div", J0, [
              w("input", {
                value: ye(C.key),
                type: "number",
                step: C.type === "id" ? "1" : "any",
                min: C.type === "id" ? 1 : void 0,
                placeholder: C.placeholder || "",
                disabled: !q.value || wt(C),
                class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
                onInput: (R) => ae(C.key, R.target.value)
              }, null, 40, e1),
              wt(C) ? (B(), F("p", t1, " Se genera automáticamente al crear el documento. ")) : se("", !0)
            ])) : C.type === "textarea" ? (B(), F("textarea", {
              key: 4,
              value: Y(C.key),
              rows: "4",
              placeholder: C.placeholder || "",
              disabled: !q.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: (R) => J(C.key, R.target.value)
            }, null, 40, r1)) : C.type === "select" ? (B(), F("select", {
              key: 5,
              value: Y(C.key),
              disabled: !q.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: (R) => J(C.key, R.target.value)
            }, [
              y[3] || (y[3] = w("option", { value: "" }, "Selecciona una opción", -1)),
              (B(!0), F(Fe, null, Pe(C.options || [], (R) => (B(), F("option", {
                key: R,
                value: R
              }, Q(R), 9, s1))), 128))
            ], 40, n1)) : C.type === "document" ? (B(), F("div", i1, [
              w("select", {
                value: Y(C.key),
                disabled: !q.value,
                class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
                onChange: (R) => J(C.key, R.target.value)
              }, [
                y[4] || (y[4] = w("option", { value: "" }, "Selecciona un documento", -1)),
                (B(!0), F(Fe, null, Pe(le(C), (R) => (B(), F("option", {
                  key: R.id,
                  value: R.id
                }, Q(R.label), 9, a1))), 128))
              ], 40, o1),
              de(C) ? (B(), F("p", l1, Q(de(C)), 1)) : se("", !0)
            ])) : C.type === "boolean" ? (B(), F("label", c1, [
              w("input", {
                checked: ke(C.key),
                type: "checkbox",
                disabled: !q.value,
                onChange: (R) => Zt(C.key, R.target.checked)
              }, null, 40, u1),
              y[5] || (y[5] = We(" Activo ", -1))
            ])) : C.type === "image" ? (B(), F("div", d1, [
              w("input", {
                type: "file",
                accept: "image/*",
                disabled: !q.value,
                class: "block w-full text-sm text-slate-600 disabled:opacity-60",
                onChange: (R) => mr(C.key, R)
              }, null, 40, h1),
              Y(C.key) ? (B(), F("p", f1, " URL actual: " + Q(Y(C.key)), 1)) : se("", !0),
              Y(C.key) ? (B(), F("img", {
                key: 1,
                src: Y(C.key),
                alt: "Vista previa",
                class: "max-h-32 rounded-md border border-slate-200 object-cover"
              }, null, 8, p1)) : se("", !0),
              Y(C.key) ? (B(), F("button", {
                key: 2,
                type: "button",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50",
                disabled: !q.value,
                onClick: (R) => Mr(C.key)
              }, " Quitar URL ", 8, m1)) : se("", !0)
            ])) : C.type === "array" || C.type === "map" ? (B(), rr(_0, {
              key: 9,
              schema: C,
              "model-value": pe(C.key),
              disabled: !q.value,
              "onUpdate:modelValue": (R) => Ee(C.key, R)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])) : C.type === "richtext" ? (B(), rr(n0, {
              key: 10,
              "model-value": Y(C.key),
              "subir-imagen": G,
              disabled: !q.value,
              "onUpdate:modelValue": (R) => J(C.key, R)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])) : se("", !0)
          ]))), 128)),
          I.value.storageType === "document" && P.value ? (B(), F("p", g1, " Editando registro: " + Q(k.value), 1)) : se("", !0),
          m.value ? (B(), F("p", b1, Q(m.value), 1)) : se("", !0),
          h.value ? (B(), F("p", y1, Q(h.value), 1)) : se("", !0),
          w("div", v1, [
            w("button", {
              type: "submit",
              disabled: g.value || !q.value,
              class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            }, Q(g.value ? "Guardando..." : I.value.storageType === "dictionary" ? "Guardar diccionario" : P.value ? "Guardar cambios" : "Crear documento"), 9, x1),
            I.value.storageType === "document" && P.value ? (B(), F("button", {
              key: 0,
              type: "button",
              disabled: g.value || !q.value,
              class: "rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
              onClick: L
            }, " Cancelar edición ", 8, w1)) : se("", !0)
          ])
        ], 32)) : se("", !0),
        w("div", A1, [
          y[6] || (y[6] = w("h4", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Registros guardados", -1)),
          x.value ? (B(), F("p", E1, "Cargando registros...")) : d.value.length ? (B(), F("ul", T1, [
            (B(!0), F(Fe, null, Pe(d.value, (C) => (B(), F("li", {
              key: C.id,
              class: rt([
                "flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2",
                I.value?.storageType === "document" && k.value === C.id ? "border-sky-300 bg-sky-50" : ""
              ])
            }, [
              w("div", null, [
                w("p", _1, Q(I.value ? Fr(C, I.value) : C.id), 1),
                w("p", S1, "ID: " + Q(C.id), 1)
              ]),
              I.value?.storageType === "document" ? (B(), F("div", k1, [
                w("button", {
                  type: "button",
                  disabled: !q.value || g.value,
                  class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (R) => S(C)
                }, Q(k.value === C.id ? "Editando" : "Editar"), 9, C1),
                w("button", {
                  type: "button",
                  disabled: !q.value,
                  class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (R) => j(C.id)
                }, " Eliminar ", 8, L1)
              ])) : se("", !0)
            ], 2))), 128))
          ])) : (B(), F("p", N1, "No hay registros todavía."))
        ])
      ])
    ]));
  }
}), O1 = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3" }, I1 = { class: "mb-3 flex items-start justify-between gap-2" }, R1 = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide text-slate-600"
}, $1 = ["disabled"], D1 = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, B1 = { class: "space-y-1" }, M1 = ["value", "disabled"], F1 = { class: "space-y-1" }, P1 = ["value", "disabled"], j1 = { class: "mt-2 grid gap-2 md:grid-cols-3" }, U1 = { class: "space-y-1" }, z1 = ["value", "disabled"], H1 = ["value"], V1 = { class: "space-y-1" }, K1 = ["value", "disabled"], G1 = { class: "space-y-1" }, W1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, Z1 = ["checked", "disabled"], Y1 = { class: "mt-2 block space-y-1" }, X1 = ["value", "disabled"], Q1 = {
  key: 1,
  class: "mt-2 block space-y-1"
}, J1 = ["value", "disabled"], eb = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, tb = { class: "space-y-1" }, rb = ["value", "disabled"], nb = { class: "space-y-1" }, sb = ["value", "disabled"], ib = {
  key: 3,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, ob = { class: "mb-2 flex items-center justify-between" }, ab = ["disabled"], lb = { class: "space-y-2" }, cb = {
  key: 4,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, ub = /* @__PURE__ */ Ot({
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
    function i(N) {
      return !!N && typeof N == "object" && !Array.isArray(N);
    }
    function a(N) {
      return N === "date" || N === "numeric" || N === "id" || N === "textarea" || N === "richtext" || N === "image" || N === "select" || N === "document" || N === "boolean" || N === "array" || N === "map" ? N : "text";
    }
    function l(N) {
      return typeof N == "string" ? N : "";
    }
    function c(N) {
      return Array.isArray(N) ? N.map((A) => String(A).trim()).filter(Boolean) : [];
    }
    function d() {
      return {
        type: "text",
        required: !1,
        placeholder: "",
        helpText: "",
        options: []
      };
    }
    function x() {
      return {
        ...d(),
        key: "",
        label: ""
      };
    }
    function g(N) {
      const A = i(N) ? N : {}, D = a(A.type), j = {
        type: D,
        required: !!A.required,
        placeholder: l(A.placeholder),
        helpText: l(A.helpText),
        options: D === "select" ? c(A.options) : [],
        documentSchemaId: D === "document" ? l(A.documentSchemaId) : "",
        documentLabelField: D === "document" ? l(A.documentLabelField) : ""
      };
      return D === "map" && (j.mapFields = Array.isArray(A.mapFields) ? A.mapFields.map((G) => h(G)) : []), D === "array" && (j.itemSchema = g(A.itemSchema)), j;
    }
    function h(N) {
      const A = i(N) ? N : {};
      return {
        ...g(A),
        key: l(A.key),
        label: l(A.label)
      };
    }
    function m() {
      const N = g(r.modelValue);
      if (r.withIdentity) {
        const A = h(r.modelValue);
        N.key = A.key, N.label = A.label;
      }
      return N;
    }
    function _(N, A) {
      const D = g(N), j = {
        type: D.type,
        required: !!D.required,
        placeholder: l(D.placeholder),
        helpText: l(D.helpText),
        options: D.type === "select" ? c(D.options) : [],
        documentSchemaId: D.type === "document" ? l(D.documentSchemaId) : "",
        documentLabelField: D.type === "document" ? l(D.documentLabelField) : ""
      };
      if (D.type === "map" && (j.mapFields = (D.mapFields ?? []).map((G) => h(G))), D.type === "array" && (j.itemSchema = _(D.itemSchema ?? d(), !1)), A) {
        const G = h(N);
        j.key = G.key, j.label = G.label;
      }
      return j;
    }
    function k(N) {
      s("update:modelValue", _(N, r.withIdentity));
    }
    function q(N, A) {
      const D = m();
      D[N] = A, k(D);
    }
    function I(N) {
      const A = m(), D = a(N);
      A.type = D, D !== "select" && (A.options = []), D !== "document" && (A.documentSchemaId = "", A.documentLabelField = ""), D === "map" ? (A.mapFields = Array.isArray(A.mapFields) ? A.mapFields.map((j) => h(j)) : [], delete A.itemSchema) : D === "array" ? (A.itemSchema = g(A.itemSchema ?? d()), delete A.mapFields) : (delete A.mapFields, delete A.itemSchema), k(A);
    }
    function P(N) {
      const A = m();
      A.required = N, k(A);
    }
    function U(N) {
      const A = m();
      A.placeholder = N, k(A);
    }
    function W(N) {
      const A = m();
      A.helpText = N, k(A);
    }
    function V() {
      return (m().options ?? []).join(", ");
    }
    function ie(N) {
      const A = m();
      A.options = N.split(",").map((D) => D.trim()).filter(Boolean), k(A);
    }
    function re() {
      return m().documentSchemaId ?? "";
    }
    function ge() {
      return m().documentLabelField ?? "";
    }
    function Ae(N) {
      const A = m();
      A.documentSchemaId = N, k(A);
    }
    function we(N) {
      const A = m();
      A.documentLabelField = N, k(A);
    }
    function b() {
      const N = m();
      return N.type !== "map" || !Array.isArray(N.mapFields) ? [] : N.mapFields.map((A) => h(A));
    }
    function M() {
      const N = m();
      N.type = "map", N.mapFields = [...b(), x()], k(N);
    }
    function S(N, A) {
      const D = m(), j = b();
      j[N] = h(A), D.mapFields = j, k(D);
    }
    function L(N) {
      const A = m(), D = b();
      D.splice(N, 1), A.mapFields = D, k(A);
    }
    function f() {
      const N = m();
      return N.type !== "array" ? d() : g(N.itemSchema ?? d());
    }
    function p(N) {
      const A = m();
      A.type = "array", A.itemSchema = g(N), k(A);
    }
    function E() {
      s("remove");
    }
    return (N, A) => {
      const D = ya("CmsSchemaFieldEditor", !0);
      return B(), F("article", O1, [
        w("div", I1, [
          n.title ? (B(), F("p", R1, Q(n.title), 1)) : se("", !0),
          n.canRemove ? (B(), F("button", {
            key: 1,
            type: "button",
            disabled: n.disabled,
            class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60",
            onClick: E
          }, " Quitar ", 8, $1)) : se("", !0)
        ]),
        n.withIdentity ? (B(), F("div", D1, [
          w("label", B1, [
            A[9] || (A[9] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Key", -1)),
            w("input", {
              value: m().key || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[0] || (A[0] = (j) => q("key", j.target.value))
            }, null, 40, M1)
          ]),
          w("label", F1, [
            A[10] || (A[10] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Label", -1)),
            w("input", {
              value: m().label || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[1] || (A[1] = (j) => q("label", j.target.value))
            }, null, 40, P1)
          ])
        ])) : se("", !0),
        w("div", j1, [
          w("label", U1, [
            A[11] || (A[11] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo", -1)),
            w("select", {
              value: m().type,
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: A[2] || (A[2] = (j) => I(j.target.value))
            }, [
              (B(), F(Fe, null, Pe(t, (j) => w("option", {
                key: j.value,
                value: j.value
              }, Q(j.label), 9, H1)), 64))
            ], 40, z1)
          ]),
          w("label", V1, [
            A[12] || (A[12] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Placeholder", -1)),
            w("input", {
              value: m().placeholder || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[3] || (A[3] = (j) => U(j.target.value))
            }, null, 40, K1)
          ]),
          w("label", G1, [
            A[14] || (A[14] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Requerido", -1)),
            w("span", W1, [
              w("input", {
                checked: !!m().required,
                type: "checkbox",
                disabled: n.disabled,
                onChange: A[4] || (A[4] = (j) => P(j.target.checked))
              }, null, 40, Z1),
              A[13] || (A[13] = w("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        w("label", Y1, [
          A[15] || (A[15] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Help text", -1)),
          w("input", {
            value: m().helpText || "",
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: A[5] || (A[5] = (j) => W(j.target.value))
          }, null, 40, X1)
        ]),
        m().type === "select" ? (B(), F("label", Q1, [
          A[16] || (A[16] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Opciones (separadas por coma)", -1)),
          w("input", {
            value: V(),
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: A[6] || (A[6] = (j) => ie(j.target.value))
          }, null, 40, J1)
        ])) : se("", !0),
        m().type === "document" ? (B(), F("div", eb, [
          w("label", tb, [
            A[17] || (A[17] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Schema destino", -1)),
            w("input", {
              value: re(),
              type: "text",
              disabled: n.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[7] || (A[7] = (j) => Ae(j.target.value))
            }, null, 40, rb)
          ]),
          w("label", nb, [
            A[18] || (A[18] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Campo etiqueta", -1)),
            w("input", {
              value: ge(),
              type: "text",
              disabled: n.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[8] || (A[8] = (j) => we(j.target.value))
            }, null, 40, sb)
          ])
        ])) : se("", !0),
        m().type === "map" ? (B(), F("div", ib, [
          w("div", ob, [
            A[19] || (A[19] = w("p", { class: "text-xs font-bold uppercase tracking-wide text-slate-600" }, "Map fields", -1)),
            w("button", {
              type: "button",
              disabled: n.disabled,
              class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60",
              onClick: M
            }, " Agregar campo ", 8, ab)
          ]),
          w("div", lb, [
            (B(!0), F(Fe, null, Pe(b(), (j, G) => (B(), rr(D, {
              key: `map-field-${G}`,
              "model-value": j,
              disabled: n.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (Y) => S(G, Y),
              onRemove: (Y) => L(G)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : se("", !0),
        m().type === "array" ? (B(), F("div", cb, [
          A[20] || (A[20] = w("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-600" }, "Item schema", -1)),
          Ct(D, {
            "model-value": f(),
            "with-identity": !1,
            disabled: n.disabled,
            title: "Estructura del ítem",
            "onUpdate:modelValue": p
          }, null, 8, ["model-value", "disabled"])
        ])) : se("", !0)
      ]);
    };
  }
}), db = { class: "space-y-4" }, hb = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, fb = {
  key: 1,
  class: "text-sm text-slate-500"
}, pb = {
  key: 2,
  class: "text-sm text-slate-500"
}, mb = {
  key: 3,
  class: "rounded-2xl border border-slate-200 bg-white p-5"
}, gb = { class: "flex flex-wrap items-center justify-between gap-3" }, bb = { class: "text-lg font-black text-slate-900" }, yb = { class: "text-xs text-slate-500" }, vb = ["disabled"], xb = { class: "mt-4 grid gap-3 md:grid-cols-2" }, wb = { class: "space-y-1" }, Ab = ["value"], Eb = { class: "space-y-1" }, Nb = ["value"], Tb = { class: "space-y-1 md:col-span-2" }, _b = ["value"], Sb = { class: "space-y-1" }, kb = ["value"], Cb = { class: "space-y-1" }, Lb = ["value"], qb = { class: "space-y-1" }, Ob = ["value"], Ib = { class: "space-y-1" }, Rb = ["value"], $b = {
  key: 0,
  class: "space-y-1"
}, Db = ["value"], Bb = {
  key: 1,
  class: "space-y-1"
}, Mb = ["value"], Fb = { class: "mt-5 border-t border-slate-200 pt-4" }, Pb = { class: "space-y-3" }, jb = {
  key: 0,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Ub = {
  key: 1,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, zb = /* @__PURE__ */ Ot({
  __name: "AdminSchemasPage",
  setup(n) {
    const e = is(), t = yn(), r = ee([]), s = ee(""), i = ee(!1), a = ee(!1), l = ee(null), c = ee(!1), d = ee(""), x = ee(""), g = ee(""), h = qe(() => r.value.find((f) => f.id === s.value) ?? null);
    bn(() => {
      m();
    }), nr(
      () => e.query.schema,
      (f) => {
        typeof f == "string" && r.value.some((p) => p.id === f) && s.value !== f && (s.value = f);
      }
    ), nr(
      h,
      (f) => {
        if (x.value = "", g.value = "", f) {
          c.value = !1, l.value = W(f);
          return;
        }
        c.value || (l.value = null);
      },
      { immediate: !0 }
    );
    async function m() {
      i.value = !0, d.value = "";
      try {
        const f = await Di();
        r.value = f, _(f), s.value ? await k(s.value) : l.value || (c.value = !0, l.value = V());
      } catch {
        d.value = "No se pudieron cargar los esquemas.";
      } finally {
        i.value = !1;
      }
    }
    function _(f) {
      if (!f.length) {
        s.value = "";
        return;
      }
      const p = typeof e.query.schema == "string" ? e.query.schema : "";
      if (p && f.some((E) => E.id === p)) {
        s.value = p;
        return;
      }
      f.some((E) => E.id === s.value) || (s.value = f[0].id);
    }
    async function k(f) {
      !f || e.query.schema === f || await t.replace({
        query: {
          ...e.query,
          schema: f
        }
      });
    }
    function q() {
      return {
        type: "text",
        required: !1,
        placeholder: "",
        helpText: "",
        options: []
      };
    }
    function I() {
      return {
        ...q(),
        key: "",
        label: ""
      };
    }
    function P(f) {
      const p = {
        type: f.type,
        required: !!f.required,
        placeholder: f.placeholder ?? "",
        helpText: f.helpText ?? "",
        options: Array.isArray(f.options) ? [...f.options] : []
      };
      return f.type === "map" && (p.mapFields = Array.isArray(f.mapFields) ? f.mapFields.map((E) => U(E)) : []), f.type === "array" && (p.itemSchema = f.itemSchema ? P(f.itemSchema) : q()), p;
    }
    function U(f) {
      return {
        ...P(f),
        key: f.key ?? "",
        label: f.label ?? ""
      };
    }
    function W(f) {
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
        fields: f.fields.map((p) => U(p))
      };
    }
    function V() {
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
        fields: [I()]
      };
    }
    async function ie() {
      c.value = !0, s.value = "", l.value = V(), x.value = "", g.value = "";
      const f = { ...e.query };
      delete f.schema, await t.replace({ query: f });
    }
    function re(f, p) {
      l.value && (l.value = {
        ...l.value,
        [f]: p
      });
    }
    function ge(f) {
      l.value && (l.value.storageType = f === "dictionary" ? "dictionary" : "document");
    }
    function Ae() {
      l.value && l.value.fields.push(I());
    }
    function we(f, p) {
      l.value && (l.value.fields[f] = U(p));
    }
    function b(f) {
      l.value && l.value.fields.splice(f, 1);
    }
    function M(f, p) {
      if (f.type === "map") {
        const E = Array.isArray(f.mapFields) ? f.mapFields : [];
        for (let N = 0; N < E.length; N += 1)
          S(E[N], `${p}.mapFields[${N}]`);
      }
      f.type === "array" && f.itemSchema && M(f.itemSchema, `${p}.itemSchema`);
    }
    function S(f, p) {
      if (!f.key.trim() || !f.label.trim())
        throw new Error(`${p}: completa key y label.`);
      M(f, p);
    }
    async function L() {
      if (l.value) {
        a.value = !0, x.value = "", g.value = "";
        try {
          const f = l.value;
          if (!f.id.trim() || !f.title.trim() || !f.collectionName.trim())
            throw new Error("Completa id, título y colección del esquema.");
          if (!f.fields.length)
            throw new Error("Agrega al menos un campo al esquema.");
          const p = f.fields.map((A) => U(A));
          for (let A = 0; A < p.length; A += 1)
            S(p[A], `fields[${A}]`);
          const E = {
            id: f.id,
            title: f.title,
            description: f.description,
            storageType: f.storageType,
            collectionName: f.collectionName,
            dictionaryDocumentId: f.storageType === "dictionary" ? f.dictionaryDocumentId : "",
            dictionaryRootKey: f.storageType === "dictionary" ? f.dictionaryRootKey : "",
            slugFromField: f.slugFromField,
            previewField: f.previewField,
            fields: p
          };
          await yc(E), await m(), s.value = E.id, c.value = !1, await k(E.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const N = r.value.find((A) => A.id === s.value);
          l.value = W(N || E), g.value = "Esquema actualizado.";
        } catch (f) {
          x.value = f instanceof Error ? f.message : "No se pudo guardar el esquema.";
        } finally {
          a.value = !1;
        }
      }
    }
    return (f, p) => (B(), F("section", db, [
      w("article", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        w("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
          p[9] || (p[9] = w("div", null, [
            w("h3", { class: "text-xl font-black text-slate-900" }, "Esquema editable"),
            w("p", { class: "mt-1 text-sm text-slate-600" }, [
              We(" Edición visual de campos. Los tipos "),
              w("strong", null, "map"),
              We(" y "),
              w("strong", null, "array"),
              We(" se editan por interfaz. ")
            ])
          ], -1)),
          w("div", { class: "flex items-center gap-2" }, [
            w("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: ie
            }, " Nuevo esquema "),
            w("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: m
            }, " Recargar ")
          ])
        ])
      ]),
      d.value ? (B(), F("p", hb, Q(d.value), 1)) : se("", !0),
      i.value ? (B(), F("p", fb, "Cargando esquemas...")) : l.value ? (B(), F("article", mb, [
        w("div", gb, [
          w("div", null, [
            w("h4", bb, Q(l.value.title || h.value?.title || "Nuevo esquema"), 1),
            w("p", yb, [
              p[10] || (p[10] = We(" ID: ", -1)),
              w("code", null, Q(h.value?.id || "nuevo"), 1)
            ])
          ]),
          w("button", {
            type: "button",
            disabled: a.value,
            class: "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400",
            onClick: L
          }, Q(a.value ? "Guardando..." : "Guardar cambios"), 9, vb)
        ]),
        w("div", xb, [
          w("label", wb, [
            p[11] || (p[11] = w("span", { class: "text-xs font-semibold text-slate-700" }, "ID", -1)),
            w("input", {
              value: l.value.id,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: p[0] || (p[0] = (E) => re("id", E.target.value))
            }, null, 40, Ab)
          ]),
          w("label", Eb, [
            p[12] || (p[12] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Título", -1)),
            w("input", {
              value: l.value.title,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: p[1] || (p[1] = (E) => re("title", E.target.value))
            }, null, 40, Nb)
          ]),
          w("label", Tb, [
            p[13] || (p[13] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Descripción", -1)),
            w("input", {
              value: l.value.description,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: p[2] || (p[2] = (E) => re("description", E.target.value))
            }, null, 40, _b)
          ]),
          w("label", Sb, [
            p[15] || (p[15] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo de almacenamiento", -1)),
            w("select", {
              value: l.value.storageType,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onChange: p[3] || (p[3] = (E) => ge(E.target.value))
            }, [...p[14] || (p[14] = [
              w("option", { value: "document" }, "document", -1),
              w("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, kb)
          ]),
          w("label", Cb, [
            p[16] || (p[16] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Colección", -1)),
            w("input", {
              value: l.value.collectionName,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: p[4] || (p[4] = (E) => re("collectionName", E.target.value))
            }, null, 40, Lb)
          ]),
          w("label", qb, [
            p[17] || (p[17] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Slug desde campo", -1)),
            w("input", {
              value: l.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: p[5] || (p[5] = (E) => re("slugFromField", E.target.value))
            }, null, 40, Ob)
          ]),
          w("label", Ib, [
            p[18] || (p[18] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Campo de preview", -1)),
            w("input", {
              value: l.value.previewField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: p[6] || (p[6] = (E) => re("previewField", E.target.value))
            }, null, 40, Rb)
          ]),
          l.value.storageType === "dictionary" ? (B(), F("label", $b, [
            p[19] || (p[19] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary document ID", -1)),
            w("input", {
              value: l.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: p[7] || (p[7] = (E) => re("dictionaryDocumentId", E.target.value))
            }, null, 40, Db)
          ])) : se("", !0),
          l.value.storageType === "dictionary" ? (B(), F("label", Bb, [
            p[20] || (p[20] = w("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary root key", -1)),
            w("input", {
              value: l.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: p[8] || (p[8] = (E) => re("dictionaryRootKey", E.target.value))
            }, null, 40, Mb)
          ])) : se("", !0)
        ]),
        w("div", Fb, [
          w("div", { class: "mb-3 flex items-center justify-between" }, [
            p[21] || (p[21] = w("h5", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Campos", -1)),
            w("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: Ae
            }, " Agregar campo ")
          ]),
          w("div", Pb, [
            (B(!0), F(Fe, null, Pe(l.value.fields, (E, N) => (B(), rr(ub, {
              key: `schema-field-${N}`,
              "model-value": E,
              "can-remove": !0,
              title: `Campo ${N + 1}`,
              "onUpdate:modelValue": (A) => we(N, A),
              onRemove: (A) => b(N)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        x.value ? (B(), F("p", jb, Q(x.value), 1)) : se("", !0),
        g.value ? (B(), F("p", Ub, Q(g.value), 1)) : se("", !0)
      ])) : (B(), F("p", pb, "No hay esquema seleccionado."))
    ]));
  }
}), Hb = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, Vb = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, Kb = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Gb = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, Wb = {
  key: 3,
  class: "mt-4 text-sm text-slate-500"
}, Zb = {
  key: 4,
  class: "mt-4 text-sm text-slate-500"
}, Yb = {
  key: 5,
  class: "mt-4 space-y-3"
}, Xb = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, Qb = { class: "text-sm font-semibold text-slate-900" }, Jb = { class: "text-xs text-slate-500" }, ey = { class: "text-xs text-slate-500" }, ty = { class: "text-xs text-slate-500" }, ry = { class: "flex flex-wrap gap-3" }, ny = ["checked", "disabled", "onChange"], sy = /* @__PURE__ */ Ot({
  __name: "AdminUsersPage",
  setup(n) {
    const e = ee([]), t = ee(!1), r = ee(""), s = ee(""), i = ee(null), a = qe(() => kr.value === "admin"), l = [
      { label: "Admin", value: "admin" },
      { label: "Writer", value: "writer" },
      { label: "Manager", value: "manager" },
      { label: "Sin rol", value: null }
    ];
    bn(async () => {
      await c();
    });
    async function c() {
      t.value = !0, r.value = "";
      try {
        e.value = await Ql();
      } catch {
        r.value = "No se pudieron cargar los usuarios.";
      } finally {
        t.value = !1;
      }
    }
    async function d(m, _) {
      if (s.value = "", r.value = "", !a.value) {
        r.value = "Solo un admin puede cambiar roles.";
        return;
      }
      const k = m.role === _ ? null : _;
      i.value = m.id;
      try {
        await Jl(m.id, k), m.role = k, s.value = "Rol actualizado correctamente.";
      } catch {
        r.value = "No se pudo actualizar el rol.";
      } finally {
        i.value = null;
      }
    }
    function x(m, _) {
      return m === _;
    }
    function g(m) {
      return m === null ? "Sin rol" : m.charAt(0).toUpperCase() + m.slice(1);
    }
    function h(m) {
      const _ = m?.toDate?.();
      return _ ? _.toLocaleString("es-ES") : "Sin registros";
    }
    return (m, _) => (B(), F("section", Hb, [
      w("div", { class: "flex items-center justify-between" }, [
        _[0] || (_[0] = w("h3", { class: "text-xl font-black text-slate-900" }, "Usuarios", -1)),
        w("button", {
          type: "button",
          class: "rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
          onClick: c
        }, " Recargar ")
      ]),
      _[1] || (_[1] = w("p", { class: "mt-1 text-sm text-slate-600" }, "Listado de usuarios con último login y control de rol.", -1)),
      a.value ? se("", !0) : (B(), F("p", Vb, " Solo usuarios con rol admin pueden editar roles. ")),
      r.value ? (B(), F("p", Kb, Q(r.value), 1)) : se("", !0),
      s.value ? (B(), F("p", Gb, Q(s.value), 1)) : se("", !0),
      t.value ? (B(), F("p", Wb, "Cargando usuarios...")) : e.value.length === 0 ? (B(), F("p", Zb, "No hay usuarios registrados.")) : (B(), F("div", Yb, [
        (B(!0), F(Fe, null, Pe(e.value, (k) => (B(), F("article", {
          key: k.id,
          class: "rounded-lg border border-slate-200 p-4"
        }, [
          w("div", Xb, [
            w("div", null, [
              w("p", Qb, Q(k.email || k.id), 1),
              w("p", Jb, "UID: " + Q(k.id), 1),
              w("p", ey, "Último login: " + Q(h(k.lastLoginAt)), 1),
              w("p", ty, "Rol actual: " + Q(g(k.role)), 1)
            ]),
            w("div", ry, [
              (B(), F(Fe, null, Pe(l, (q) => w("label", {
                key: q.label,
                class: "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
              }, [
                w("input", {
                  type: "checkbox",
                  checked: x(k.role, q.value),
                  disabled: !a.value || i.value === k.id,
                  onChange: (I) => d(k, q.value)
                }, null, 40, ny),
                We(" " + Q(q.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), pa = /* @__PURE__ */ new WeakSet();
function yy(n, e) {
  if (pa.has(n))
    return;
  const t = Or(e.basePath ?? "/admin"), r = Or(e.loginPath ?? "/ingresar"), s = Or(e.registerPath ?? "/registro"), i = oy(e.homePath ?? "/");
  Zl(e.firebase), oc({ basePath: t, loginPath: r, registerPath: s, homePath: i }), tc();
  const a = iy(t, r, s);
  for (const l of a)
    n.addRoute(l);
  n.beforeEach(async (l) => (await rc(), l.meta.cmsRequiresAuth && !un.value ? {
    path: r,
    query: { redirect: l.fullPath }
  } : (l.path === r || l.path === s || l.meta.cmsGuestOnly) && un.value ? { path: t } : !0)), pa.add(n);
}
function iy(n = "/admin", e = "/ingresar", t = "/registro") {
  const r = Or(n), s = Or(e), i = Or(t);
  return [
    { path: s, component: dc, meta: { cmsGuestOnly: !0 } },
    { path: i, component: gc, meta: { cmsGuestOnly: !0 } },
    {
      path: r,
      component: Qc,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${r}/content` },
        { path: "content", component: q1, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: zb, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: sy, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function Or(n) {
  const e = String(n || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function oy(n) {
  const e = String(n || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
export {
  R0 as actualizarRegistroDocumento,
  ic as cerrarSesion,
  O0 as crearRegistroDocumento,
  iy as createCmsRoutes,
  I0 as eliminarRegistroDocumento,
  D0 as guardarRegistroDiccionario,
  yc as guardarSchemaContenido,
  ha as listarRegistrosDocumento,
  Di as listarSchemasContenido,
  B0 as obtenerRegistroDiccionario,
  yy as registerPifWarriorsCms,
  kr as rolActual,
  un as usuarioActual
};
