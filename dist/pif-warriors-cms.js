import { signOut as Fl, onAuthStateChanged as Pl, setPersistence as ma, browserLocalPersistence as ga, signInWithEmailAndPassword as jl, createUserWithEmailAndPassword as Ul } from "firebase/auth";
import { ref as te, defineComponent as St, openBlock as D, createElementBlock as M, createElementVNode as y, withModifiers as qi, withDirectives as rn, vModelText as nn, toDisplayString as ee, createCommentVNode as ie, createTextVNode as Ke, createVNode as Nt, unref as $e, withCtx as Bt, onMounted as pn, onBeforeUnmount as ba, watch as tr, computed as Le, normalizeClass as rt, Fragment as De, renderList as Me, createBlock as er, resolveComponent as ya } from "vue";
import { query as Oi, collection as rr, orderBy as Ii, getDocs as Or, updateDoc as va, doc as zt, serverTimestamp as Ve, getDoc as ns, setDoc as Zn, addDoc as zl, deleteDoc as Hl, limit as xa } from "firebase/firestore";
import { useRoute as ss, useRouter as mn, RouterLink as Dt, RouterView as Vl } from "vue-router";
import { ref as Kl, uploadBytes as Gl, getDownloadURL as Wl } from "firebase/storage";
let hi = null;
function Zl(n) {
  hi = n;
}
function Te() {
  if (!hi)
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  return hi;
}
const is = "users";
async function Yl(n) {
  const { firestore: e } = Te(), t = zt(e, is, n.uid);
  if (!(await ns(t)).exists()) {
    await Zn(t, {
      email: n.email ?? "",
      role: null,
      lastLoginAt: Ve(),
      createdAt: Ve(),
      updatedAt: Ve()
    });
    return;
  }
  await Zn(
    t,
    {
      email: n.email ?? "",
      lastLoginAt: Ve(),
      updatedAt: Ve()
    },
    { merge: !0 }
  );
}
async function Xl(n) {
  const { firestore: e } = Te(), t = await ns(zt(e, is, n));
  return t.exists() ? wa(t.data().role) : null;
}
async function Ql() {
  const { firestore: n } = Te(), e = Oi(rr(n, is), Ii("email", "asc"));
  return (await Or(e)).docs.map((r) => ({
    id: r.id,
    email: String(r.data().email ?? ""),
    role: wa(r.data().role),
    lastLoginAt: r.data().lastLoginAt,
    createdAt: r.data().createdAt,
    updatedAt: r.data().updatedAt
  }));
}
async function Jl(n, e) {
  const { firestore: t } = Te();
  await va(zt(t, is, n), {
    role: e,
    updatedAt: Ve()
  });
}
function wa(n) {
  return n === "admin" || n === "writer" || n === "manager" ? n : null;
}
const an = te(null), Aa = te(!1), Sr = te(null);
let Kn = null, ec = new Promise((n) => {
  Kn = n;
}), io = !1;
function tc() {
  if (io)
    return;
  const { auth: n } = Te();
  an.value = n.currentUser, Pl(n, async (e) => {
    an.value = e, Sr.value = null, e && await Ri(e), Aa.value = !0, Kn && (Kn(), Kn = null);
  }), io = !0;
}
async function rc() {
  Aa.value || await ec;
}
async function nc(n, e) {
  const { auth: t } = Te();
  await ma(t, ga);
  const r = await Ul(t, n, e);
  await Ri(r.user);
}
async function sc(n, e) {
  const { auth: t } = Te();
  await ma(t, ga);
  const r = await jl(t, n, e);
  await Ri(r.user);
}
async function ic() {
  const { auth: n } = Te();
  await Fl(n);
}
async function Ri(n) {
  try {
    await Yl(n), Sr.value = await Xl(n.uid);
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
}, cc = ["disabled"], uc = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, dc = /* @__PURE__ */ St({
  __name: "LoginPage",
  setup(n) {
    const e = ss(), t = mn(), { basePath: r, registerPath: s } = $i(), i = te(""), a = te(""), l = te(!1), c = te("");
    async function d() {
      c.value = "", l.value = !0;
      try {
        await sc(i.value, a.value);
        const b = typeof e.query.redirect == "string" ? e.query.redirect : r;
        await t.push(b);
      } catch {
        c.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (b, m) => (D(), M("main", ac, [
      m[6] || (m[6] = y("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Ingresar", -1)),
      m[7] || (m[7] = y("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Accede para administrar contenido y esquemas.", -1)),
      y("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        y("div", null, [
          m[2] || (m[2] = y("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          rn(y("input", {
            "onUpdate:modelValue": m[0] || (m[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [nn, i.value]
          ])
        ]),
        y("div", null, [
          m[3] || (m[3] = y("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          rn(y("input", {
            "onUpdate:modelValue": m[1] || (m[1] = (h) => a.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "********"
          }, null, 512), [
            [nn, a.value]
          ])
        ]),
        c.value ? (D(), M("p", lc, ee(c.value), 1)) : ie("", !0),
        y("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, ee(l.value ? "Ingresando..." : "Entrar"), 9, cc)
      ], 32),
      y("p", uc, [
        m[5] || (m[5] = Ke(" ¿No tienes cuenta? ", -1)),
        Nt($e(Dt), {
          to: $e(s),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Bt(() => [...m[4] || (m[4] = [
            Ke("Crear cuenta", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), hc = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, fc = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, pc = ["disabled"], mc = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, gc = /* @__PURE__ */ St({
  __name: "RegisterPage",
  setup(n) {
    const e = mn(), { basePath: t, loginPath: r } = $i(), s = te(""), i = te(""), a = te(""), l = te(!1), c = te("");
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
    return (b, m) => (D(), M("main", hc, [
      m[8] || (m[8] = y("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Crear cuenta", -1)),
      m[9] || (m[9] = y("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Registro para administrar contenido.", -1)),
      y("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        y("div", null, [
          m[3] || (m[3] = y("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          rn(y("input", {
            "onUpdate:modelValue": m[0] || (m[0] = (h) => s.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [nn, s.value]
          ])
        ]),
        y("div", null, [
          m[4] || (m[4] = y("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          rn(y("input", {
            "onUpdate:modelValue": m[1] || (m[1] = (h) => i.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Mínimo 6 caracteres"
          }, null, 512), [
            [nn, i.value]
          ])
        ]),
        y("div", null, [
          m[5] || (m[5] = y("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Confirmar contraseña", -1)),
          rn(y("input", {
            "onUpdate:modelValue": m[2] || (m[2] = (h) => a.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [nn, a.value]
          ])
        ]),
        c.value ? (D(), M("p", fc, ee(c.value), 1)) : ie("", !0),
        y("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, ee(l.value ? "Creando cuenta..." : "Registrarme"), 9, pc)
      ], 32),
      y("p", mc, [
        m[7] || (m[7] = Ke(" ¿Ya tienes cuenta? ", -1)),
        Nt($e(Dt), {
          to: $e(r),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Bt(() => [...m[6] || (m[6] = [
            Ke("Iniciar sesión", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), Ea = "cmsSchemas", Na = "schema", Ta = "main", bc = 3e4;
let Gn = null, pi = 0, Yr = null;
async function Bi() {
  const n = Date.now();
  if (Gn && n - pi < bc)
    return Gn;
  if (Yr)
    return Yr;
  const { firestore: e } = Te();
  Yr = (async () => {
    const r = (await Or(rr(e, Ea))).docs.map((s) => {
      const i = s.data();
      return _a({ ...i, id: s.id });
    }).sort((s, i) => s.title.localeCompare(i.title, "es"));
    return Gn = r, pi = Date.now(), r;
  })();
  try {
    return await Yr;
  } finally {
    Yr = null;
  }
}
async function yc(n) {
  const { firestore: e } = Te(), t = _a(n), r = zt(e, Ea, t.id);
  await Zn(
    r,
    {
      ...t,
      updatedAt: Ve(),
      createdAt: Ve()
    },
    { merge: !0 }
  ), vc();
}
function vc() {
  Gn = null, pi = 0;
}
function _a(n) {
  const e = n;
  let t = [];
  const r = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((c) => Yn(c)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([c, d]) => Yn({ key: c, ...d })
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
function Yn(n) {
  const e = ka(n.type), t = {
    key: Di(String(n.key ?? "campo")),
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
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Yn(r)) : [] : delete t.mapFields, t;
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
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Yn(r)) : [] : delete t.mapFields, t;
}
function ka(n) {
  return n === "numeric" || n === "id" || n === "textarea" || n === "richtext" || n === "image" || n === "select" || n === "document" || n === "boolean" || n === "array" || n === "map" ? n : "text";
}
function Ca(n) {
  return Array.isArray(n) ? n.map((e) => String(e).trim()).filter(Boolean) : [];
}
function La(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function Di(n) {
  return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function xc(n) {
  return n.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function wc(n) {
  return Di(n);
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
  return e ? Di(e) : "";
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
}, Bc = { class: "font-semibold" }, Dc = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Mc = { class: "flex items-start justify-between gap-2" }, Fc = { class: "material-symbols-outlined text-base leading-none" }, Pc = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, jc = { class: "font-semibold" }, Uc = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, zc = { class: "cms-sidebar-footer" }, Hc = { class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2" }, Vc = {
  type: "button",
  class: "min-w-0 flex-1 rounded-md bg-white px-3 py-2 text-left text-xs text-slate-700"
}, Kc = { class: "truncate text-slate-600" }, Gc = { class: "mx-auto w-full max-w-7xl space-y-6" }, Wc = { class: "text-xl font-black text-slate-900" }, Zc = { class: "mt-3" }, Yc = /* @__PURE__ */ St({
  __name: "AdminLayoutPage",
  setup(n) {
    const e = ss(), t = mn(), { basePath: r, loginPath: s, homePath: i } = $i(), a = te([]), l = te(!1), c = te(!0), d = te(!0), b = te(!0);
    pn(async () => {
      await m(), typeof window < "u" && window.innerWidth < 1024 && (b.value = !1), window.addEventListener("cms-schemas-updated", I);
    }), ba(() => {
      window.removeEventListener("cms-schemas-updated", I);
    }), tr(
      () => e.fullPath,
      () => {
        e.path.startsWith(`${r}/content`) && (c.value = !0, m()), e.path.startsWith(`${r}/schemas`) && (d.value = !0, m()), typeof window < "u" && window.innerWidth < 1024 && (b.value = !1);
      }
    );
    async function m() {
      l.value = !0;
      try {
        a.value = await Bi();
      } finally {
        l.value = !1;
      }
    }
    const h = Le(() => e.path.startsWith(`${r}/content`)), p = Le(() => e.path.startsWith(`${r}/schemas`)), T = Le(() => a.value.filter((v) => v.storageType === "document")), _ = Le(() => a.value.filter((v) => v.storageType === "dictionary"));
    function L(v) {
      return e.path.startsWith(v);
    }
    function I() {
      m();
    }
    function P(v) {
      return {
        path: `${r}/content`,
        query: { schema: v }
      };
    }
    function U(v) {
      return {
        path: `${r}/schemas`,
        query: { schema: v }
      };
    }
    function Y(v) {
      if (!h.value)
        return !1;
      const k = typeof e.query.schema == "string" ? e.query.schema : "";
      return k ? k === v : a.value[0]?.id === v;
    }
    function G(v) {
      if (!p.value)
        return !1;
      const k = typeof e.query.schema == "string" ? e.query.schema : "";
      return k ? k === v : a.value[0]?.id === v;
    }
    function oe() {
      c.value = !c.value;
    }
    function se() {
      d.value = !d.value;
    }
    function ye() {
      b.value = !b.value;
    }
    function z() {
      b.value = !1;
    }
    function H(v) {
      return /^(https?:)?\/\//i.test(v);
    }
    async function f() {
      if (i) {
        if (H(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await t.push(i);
      }
    }
    async function q() {
      await ic(), await t.push(s);
    }
    const A = Le(() => an.value?.email || "Sin correo"), F = Le(() => {
      try {
        const v = Te().auth.app.options.projectId;
        if (typeof v == "string" && v.trim().length > 0)
          return v;
      } catch {
      }
      return "Panel";
    }), w = Le(() => {
      if (e.path.startsWith(`${r}/content`)) {
        const v = typeof e.query.schema == "string" ? e.query.schema : "", k = a.value.find((N) => N.id === v) ?? a.value[0] ?? null;
        return k ? `Contenido · ${k.title}` : "Contenido";
      }
      return e.path.startsWith(`${r}/schemas`) ? "Esquemas" : e.path.startsWith(`${r}/users`) ? "Usuarios" : "Dashboard";
    });
    return (v, k) => (D(), M("main", Nc, [
      b.value ? ie("", !0) : (D(), M("button", {
        key: 0,
        type: "button",
        "aria-label": "Abrir sidebar",
        class: "fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg border border-l-0 border-slate-300 bg-white px-2 py-3 text-slate-700 shadow-lg hover:bg-slate-50",
        onClick: ye
      }, [...k[0] || (k[0] = [
        y("span", { class: "material-symbols-outlined text-lg" }, "left_panel_open", -1)
      ])])),
      b.value ? (D(), M("div", {
        key: 1,
        class: "fixed inset-0 z-30 bg-slate-900/20 lg:hidden",
        onClick: z
      })) : ie("", !0),
      y("aside", {
        class: rt(["cms-sidebar-panel cms-sidebar-fixed-height fixed inset-y-0 left-0 z-40 w-80 border-r border-slate-200 bg-white shadow-xl transition-transform duration-200", b.value ? "cms-sidebar-open" : "cms-sidebar-closed"])
      }, [
        y("div", Tc, [
          y("h2", _c, ee(F.value), 1),
          y("div", { class: "flex items-center gap-2" }, [
            y("button", {
              type: "button",
              "aria-label": "Ir a inicio",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: f
            }, [...k[1] || (k[1] = [
              y("span", { class: "material-symbols-outlined text-lg" }, "home", -1)
            ])]),
            y("button", {
              type: "button",
              "aria-label": "Cerrar sidebar",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: z
            }, [...k[2] || (k[2] = [
              y("span", { class: "material-symbols-outlined text-lg" }, "left_panel_close", -1)
            ])])
          ])
        ]),
        y("div", Sc, [
          y("div", kc, [
            y("div", Cc, [
              Nt($e(Dt), {
                to: `${$e(r)}/content`,
                class: "min-w-0 flex-1"
              }, {
                default: Bt(() => [...k[3] || (k[3] = [
                  y("p", { class: "text-sm font-black" }, "Contenido", -1),
                  y("p", { class: "text-xs text-slate-500" }, " Formularios y registros ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              y("button", {
                type: "button",
                "aria-label": "Expandir o contraer contenido",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: oe
              }, [
                y("span", Lc, ee(c.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            c.value ? (D(), M("div", qc, [
              (D(!0), M(De, null, Me(_.value, (N) => (D(), er($e(Dt), {
                key: N.id,
                to: P(N.id),
                class: rt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  Y(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Bt(() => [
                  y("p", Oc, ee(N.title), 1),
                  y("p", {
                    class: rt(Y(N.id) ? "text-slate-300" : "text-slate-500")
                  }, ee(N.storageType) + " · " + ee(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (D(), M("p", Ic, " Cargando elementos... ")) : _.value.length ? ie("", !0) : (D(), M("p", Rc, " No hay diccionarios configurados. "))
            ])) : ie("", !0)
          ]),
          T.value.length ? (D(), M("div", $c, [
            k[4] || (k[4] = y("p", { class: "px-1 text-[11px] font-black uppercase tracking-wide text-slate-500" }, "Documentos", -1)),
            (D(!0), M(De, null, Me(T.value, (N) => (D(), er($e(Dt), {
              key: `document-link-${N.id}`,
              to: P(N.id),
              class: rt([
                "block rounded-lg border px-2 py-1.5 text-xs transition",
                Y(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              ])
            }, {
              default: Bt(() => [
                y("p", Bc, ee(N.title), 1),
                y("p", {
                  class: rt(Y(N.id) ? "text-slate-300" : "text-slate-500")
                }, " document · " + ee(N.collectionName), 3)
              ]),
              _: 2
            }, 1032, ["to", "class"]))), 128))
          ])) : ie("", !0),
          y("div", Dc, [
            y("div", Mc, [
              Nt($e(Dt), {
                to: `${$e(r)}/schemas`,
                class: "min-w-0 flex-1"
              }, {
                default: Bt(() => [...k[5] || (k[5] = [
                  y("p", { class: "text-sm font-black" }, "Esquemas", -1),
                  y("p", { class: "text-xs text-slate-500" }, " Edición de esquemas ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              y("button", {
                type: "button",
                "aria-label": "Expandir o contraer esquemas",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: se
              }, [
                y("span", Fc, ee(d.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            d.value ? (D(), M("div", Pc, [
              (D(!0), M(De, null, Me(a.value, (N) => (D(), er($e(Dt), {
                key: `schema-edit-${N.id}`,
                to: U(N.id),
                class: rt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  G(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Bt(() => [
                  y("p", jc, ee(N.title), 1),
                  y("p", {
                    class: rt(G(N.id) ? "text-slate-300" : "text-slate-500")
                  }, ee(N.storageType) + " · " + ee(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (D(), M("p", Uc, " Cargando elementos... ")) : ie("", !0)
            ])) : ie("", !0)
          ]),
          Nt($e(Dt), {
            to: `${$e(r)}/users`,
            class: rt([
              "block rounded-xl border p-3 transition",
              L(`${$e(r)}/users`) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            ])
          }, {
            default: Bt(() => [
              k[6] || (k[6] = y("p", { class: "text-sm font-black" }, "Usuarios", -1)),
              y("p", {
                class: rt(["text-xs", L(`${$e(r)}/users`) ? "text-slate-200" : "text-slate-500"])
              }, " Roles y último ingreso ", 2)
            ]),
            _: 1
          }, 8, ["to", "class"])
        ]),
        y("div", zc, [
          y("div", Hc, [
            y("button", Vc, [
              k[7] || (k[7] = y("p", { class: "font-semibold text-slate-900" }, "Cuenta actual", -1)),
              y("p", Kc, ee(A.value), 1)
            ]),
            y("button", {
              type: "button",
              "aria-label": "Cerrar sesión",
              class: "rounded-md border border-slate-300 bg-white px-2 py-2 text-slate-700 hover:bg-slate-100",
              onClick: q
            }, [...k[8] || (k[8] = [
              y("span", { class: "material-symbols-outlined text-lg" }, "logout", -1)
            ])])
          ])
        ])
      ], 2),
      y("section", {
        class: rt(["cms-content-fixed-height min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8", b.value ? "cms-content-with-open-sidebar" : ""])
      }, [
        y("div", Gc, [
          k[9] || (k[9] = y("section", null, [
            y("h1", { class: "text-3xl font-black text-slate-900" }, "Dashboard"),
            y("p", { class: "mt-2 text-sm text-slate-600" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          y("section", null, [
            y("h2", Wc, ee(w.value), 1),
            y("div", Zc, [
              Nt($e(Vl))
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
var Ia = typeof global == "object" && global && global.Object === Object && global, Jc = typeof self == "object" && self && self.Object === Object && self, mt = Ia || Jc || Function("return this")(), Ut = mt.Symbol, Ra = Object.prototype, eu = Ra.hasOwnProperty, tu = Ra.toString, Xr = Ut ? Ut.toStringTag : void 0;
function ru(n) {
  var e = eu.call(n, Xr), t = n[Xr];
  try {
    n[Xr] = void 0;
    var r = !0;
  } catch {
  }
  var s = tu.call(n);
  return r && (e ? n[Xr] = t : delete n[Xr]), s;
}
var nu = Object.prototype, su = nu.toString;
function iu(n) {
  return su.call(n);
}
var ou = "[object Null]", au = "[object Undefined]", oo = Ut ? Ut.toStringTag : void 0;
function $r(n) {
  return n == null ? n === void 0 ? au : ou : oo && oo in Object(n) ? ru(n) : iu(n);
}
function Tt(n) {
  return n != null && typeof n == "object";
}
var nr = Array.isArray;
function Ht(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
function $a(n) {
  return n;
}
var lu = "[object AsyncFunction]", cu = "[object Function]", uu = "[object GeneratorFunction]", du = "[object Proxy]";
function Mi(n) {
  if (!Ht(n))
    return !1;
  var e = $r(n);
  return e == cu || e == uu || e == lu || e == du;
}
var Qs = mt["__core-js_shared__"], ao = (function() {
  var n = /[^.]+$/.exec(Qs && Qs.keys && Qs.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function hu(n) {
  return !!ao && ao in n;
}
var fu = Function.prototype, pu = fu.toString;
function ar(n) {
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
  if (!Ht(n) || hu(n))
    return !1;
  var e = Mi(n) ? wu : gu;
  return e.test(ar(n));
}
function Eu(n, e) {
  return n?.[e];
}
function lr(n, e) {
  var t = Eu(n, e);
  return Au(t) ? t : void 0;
}
var mi = lr(mt, "WeakMap"), lo = Object.create, Nu = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(e) {
    if (!Ht(e))
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
var Xn = (function() {
  try {
    var n = lr(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
})(), Ou = Xn ? function(n, e) {
  return Xn(n, "toString", {
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
var $u = 9007199254740991, Bu = /^(?:0|[1-9]\d*)$/;
function Ba(n, e) {
  var t = typeof n;
  return e = e ?? $u, !!e && (t == "number" || t != "symbol" && Bu.test(n)) && n > -1 && n % 1 == 0 && n < e;
}
function Fi(n, e, t) {
  e == "__proto__" && Xn ? Xn(n, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : n[e] = t;
}
function gn(n, e) {
  return n === e || n !== n && e !== e;
}
var Du = Object.prototype, Mu = Du.hasOwnProperty;
function Da(n, e, t) {
  var r = n[e];
  (!(Mu.call(n, e) && gn(r, t)) || t === void 0 && !(e in n)) && Fi(n, e, t);
}
function Fu(n, e, t, r) {
  var s = !t;
  t || (t = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var l = e[i], c = void 0;
    c === void 0 && (c = n[l]), s ? Fi(t, l, c) : Da(t, l, c);
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
function os(n) {
  return n != null && Ma(n.length) && !Mi(n);
}
function zu(n, e, t) {
  if (!Ht(t))
    return !1;
  var r = typeof e;
  return (r == "number" ? os(t) && Ba(e, t.length) : r == "string" && e in t) ? gn(t[e], n) : !1;
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
  return Tt(n) && $r(n) == Gu;
}
var Fa = Object.prototype, Wu = Fa.hasOwnProperty, Zu = Fa.propertyIsEnumerable, gi = uo(/* @__PURE__ */ (function() {
  return arguments;
})()) ? uo : function(n) {
  return Tt(n) && Wu.call(n, "callee") && !Zu.call(n, "callee");
};
function Yu() {
  return !1;
}
var Pa = typeof exports == "object" && exports && !exports.nodeType && exports, ho = Pa && typeof module == "object" && module && !module.nodeType && module, Xu = ho && ho.exports === Pa, fo = Xu ? mt.Buffer : void 0, Qu = fo ? fo.isBuffer : void 0, ln = Qu || Yu, Ju = "[object Arguments]", ed = "[object Array]", td = "[object Boolean]", rd = "[object Date]", nd = "[object Error]", sd = "[object Function]", id = "[object Map]", od = "[object Number]", ad = "[object Object]", ld = "[object RegExp]", cd = "[object Set]", ud = "[object String]", dd = "[object WeakMap]", hd = "[object ArrayBuffer]", fd = "[object DataView]", pd = "[object Float32Array]", md = "[object Float64Array]", gd = "[object Int8Array]", bd = "[object Int16Array]", yd = "[object Int32Array]", vd = "[object Uint8Array]", xd = "[object Uint8ClampedArray]", wd = "[object Uint16Array]", Ad = "[object Uint32Array]", we = {};
we[pd] = we[md] = we[gd] = we[bd] = we[yd] = we[vd] = we[xd] = we[wd] = we[Ad] = !0;
we[Ju] = we[ed] = we[hd] = we[td] = we[fd] = we[rd] = we[nd] = we[sd] = we[id] = we[od] = we[ad] = we[ld] = we[cd] = we[ud] = we[dd] = !1;
function Ed(n) {
  return Tt(n) && Ma(n.length) && !!we[$r(n)];
}
function ji(n) {
  return function(e) {
    return n(e);
  };
}
var ja = typeof exports == "object" && exports && !exports.nodeType && exports, sn = ja && typeof module == "object" && module && !module.nodeType && module, Nd = sn && sn.exports === ja, Js = Nd && Ia.process, Ir = (function() {
  try {
    var n = sn && sn.require && sn.require("util").types;
    return n || Js && Js.binding && Js.binding("util");
  } catch {
  }
})(), po = Ir && Ir.isTypedArray, Ui = po ? ji(po) : Ed, Td = Object.prototype, _d = Td.hasOwnProperty;
function Ua(n, e) {
  var t = nr(n), r = !t && gi(n), s = !t && !r && ln(n), i = !t && !r && !s && Ui(n), a = t || r || s || i, l = a ? Ku(n.length, String) : [], c = l.length;
  for (var d in n)
    (e || _d.call(n, d)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Ba(d, c))) && l.push(d);
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
  return os(n) ? Ua(n) : Ld(n);
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
  if (!Ht(n))
    return Od(n);
  var e = Pi(n), t = [];
  for (var r in n)
    r == "constructor" && (e || !Rd.call(n, r)) || t.push(r);
  return t;
}
function Ha(n) {
  return os(n) ? Ua(n, !0) : $d(n);
}
var cn = lr(Object, "create");
function Bd() {
  this.__data__ = cn ? cn(null) : {}, this.size = 0;
}
function Dd(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var Md = "__lodash_hash_undefined__", Fd = Object.prototype, Pd = Fd.hasOwnProperty;
function jd(n) {
  var e = this.__data__;
  if (cn) {
    var t = e[n];
    return t === Md ? void 0 : t;
  }
  return Pd.call(e, n) ? e[n] : void 0;
}
var Ud = Object.prototype, zd = Ud.hasOwnProperty;
function Hd(n) {
  var e = this.__data__;
  return cn ? e[n] !== void 0 : zd.call(e, n);
}
var Vd = "__lodash_hash_undefined__";
function Kd(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = cn && e === void 0 ? Vd : e, this;
}
function sr(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
sr.prototype.clear = Bd;
sr.prototype.delete = Dd;
sr.prototype.get = jd;
sr.prototype.has = Hd;
sr.prototype.set = Kd;
function Gd() {
  this.__data__ = [], this.size = 0;
}
function as(n, e) {
  for (var t = n.length; t--; )
    if (gn(n[t][0], e))
      return t;
  return -1;
}
var Wd = Array.prototype, Zd = Wd.splice;
function Yd(n) {
  var e = this.__data__, t = as(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : Zd.call(e, t, 1), --this.size, !0;
}
function Xd(n) {
  var e = this.__data__, t = as(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function Qd(n) {
  return as(this.__data__, n) > -1;
}
function Jd(n, e) {
  var t = this.__data__, r = as(t, n);
  return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
}
function kt(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
kt.prototype.clear = Gd;
kt.prototype.delete = Yd;
kt.prototype.get = Xd;
kt.prototype.has = Qd;
kt.prototype.set = Jd;
var un = lr(mt, "Map");
function eh() {
  this.size = 0, this.__data__ = {
    hash: new sr(),
    map: new (un || kt)(),
    string: new sr()
  };
}
function th(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function ls(n, e) {
  var t = n.__data__;
  return th(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function rh(n) {
  var e = ls(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function nh(n) {
  return ls(this, n).get(n);
}
function sh(n) {
  return ls(this, n).has(n);
}
function ih(n, e) {
  var t = ls(this, n), r = t.size;
  return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
}
function cr(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
cr.prototype.clear = eh;
cr.prototype.delete = rh;
cr.prototype.get = nh;
cr.prototype.has = sh;
cr.prototype.set = ih;
function oh(n, e) {
  for (var t = -1, r = e.length, s = n.length; ++t < r; )
    n[s + t] = e[t];
  return n;
}
var Va = za(Object.getPrototypeOf, Object), ah = "[object Object]", lh = Function.prototype, ch = Object.prototype, Ka = lh.toString, uh = ch.hasOwnProperty, dh = Ka.call(Object);
function hh(n) {
  if (!Tt(n) || $r(n) != ah)
    return !1;
  var e = Va(n);
  if (e === null)
    return !0;
  var t = uh.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Ka.call(t) == dh;
}
function fh() {
  this.__data__ = new kt(), this.size = 0;
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
  if (t instanceof kt) {
    var r = t.__data__;
    if (!un || r.length < bh - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new cr(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function ft(n) {
  var e = this.__data__ = new kt(n);
  this.size = e.size;
}
ft.prototype.clear = fh;
ft.prototype.delete = ph;
ft.prototype.get = mh;
ft.prototype.has = gh;
ft.prototype.set = yh;
var Ga = typeof exports == "object" && exports && !exports.nodeType && exports, mo = Ga && typeof module == "object" && module && !module.nodeType && module, vh = mo && mo.exports === Ga, go = vh ? mt.Buffer : void 0, bo = go ? go.allocUnsafe : void 0;
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
  return nr(n) ? r : oh(r, t(n));
}
function bi(n) {
  return Th(n, qd, Nh);
}
var yi = lr(mt, "DataView"), vi = lr(mt, "Promise"), xi = lr(mt, "Set"), vo = "[object Map]", _h = "[object Object]", xo = "[object Promise]", wo = "[object Set]", Ao = "[object WeakMap]", Eo = "[object DataView]", Sh = ar(yi), kh = ar(un), Ch = ar(vi), Lh = ar(xi), qh = ar(mi), nt = $r;
(yi && nt(new yi(new ArrayBuffer(1))) != Eo || un && nt(new un()) != vo || vi && nt(vi.resolve()) != xo || xi && nt(new xi()) != wo || mi && nt(new mi()) != Ao) && (nt = function(n) {
  var e = $r(n), t = e == _h ? n.constructor : void 0, r = t ? ar(t) : "";
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
var Qn = mt.Uint8Array;
function zi(n) {
  var e = new n.constructor(n.byteLength);
  return new Qn(e).set(new Qn(n)), e;
}
function $h(n, e) {
  var t = zi(n.buffer);
  return new n.constructor(t, n.byteOffset, n.byteLength);
}
var Bh = /\w*$/;
function Dh(n) {
  var e = new n.constructor(n.source, Bh.exec(n));
  return e.lastIndex = n.lastIndex, e;
}
var No = Ut ? Ut.prototype : void 0, To = No ? No.valueOf : void 0;
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
      return Dh(n);
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
  return Tt(n) && nt(n) == of;
}
var _o = Ir && Ir.isMap, lf = _o ? ji(_o) : af, cf = "[object Set]";
function uf(n) {
  return Tt(n) && nt(n) == cf;
}
var So = Ir && Ir.isSet, df = So ? ji(So) : uf, hf = 1, Xa = "[object Arguments]", ff = "[object Array]", pf = "[object Boolean]", mf = "[object Date]", gf = "[object Error]", Qa = "[object Function]", bf = "[object GeneratorFunction]", yf = "[object Map]", vf = "[object Number]", Ja = "[object Object]", xf = "[object RegExp]", wf = "[object Set]", Af = "[object String]", Ef = "[object Symbol]", Nf = "[object WeakMap]", Tf = "[object ArrayBuffer]", _f = "[object DataView]", Sf = "[object Float32Array]", kf = "[object Float64Array]", Cf = "[object Int8Array]", Lf = "[object Int16Array]", qf = "[object Int32Array]", Of = "[object Uint8Array]", If = "[object Uint8ClampedArray]", Rf = "[object Uint16Array]", $f = "[object Uint32Array]", xe = {};
xe[Xa] = xe[ff] = xe[Tf] = xe[_f] = xe[pf] = xe[mf] = xe[Sf] = xe[kf] = xe[Cf] = xe[Lf] = xe[qf] = xe[yf] = xe[vf] = xe[Ja] = xe[xf] = xe[wf] = xe[Af] = xe[Ef] = xe[Of] = xe[If] = xe[Rf] = xe[$f] = !0;
xe[gf] = xe[Qa] = xe[Nf] = !1;
function Wn(n, e, t, r, s, i) {
  var a, l = e & hf;
  if (a !== void 0)
    return a;
  if (!Ht(n))
    return n;
  var c = nr(n);
  if (c)
    a = Rh(n);
  else {
    var d = nt(n), b = d == Qa || d == bf;
    if (ln(n))
      return Wa(n, l);
    if (d == Ja || d == Xa || b && !s)
      a = b ? {} : Ya(n);
    else {
      if (!xe[d])
        return s ? n : {};
      a = sf(n, d, l);
    }
  }
  i || (i = new ft());
  var m = i.get(n);
  if (m)
    return m;
  i.set(n, a), df(n) ? n.forEach(function(T) {
    a.add(Wn(T, e, t, T, n, i));
  }) : lf(n) && n.forEach(function(T, _) {
    a.set(_, Wn(T, e, t, _, n, i));
  });
  var h = bi, p = c ? void 0 : h(n);
  return Ru(p || n, function(T, _) {
    p && (_ = T, T = n[_]), Da(a, _, Wn(T, e, t, _, n, i));
  }), a;
}
var Bf = 1, Df = 4;
function kr(n) {
  return Wn(n, Bf | Df);
}
var Mf = "__lodash_hash_undefined__";
function Ff(n) {
  return this.__data__.set(n, Mf), this;
}
function Pf(n) {
  return this.__data__.has(n);
}
function Jn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new cr(); ++e < t; )
    this.add(n[e]);
}
Jn.prototype.add = Jn.prototype.push = Ff;
Jn.prototype.has = Pf;
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
  var d = i.get(n), b = i.get(e);
  if (d && b)
    return d == e && b == n;
  var m = -1, h = !0, p = t & Hf ? new Jn() : void 0;
  for (i.set(n, e), i.set(e, n); ++m < l; ) {
    var T = n[m], _ = e[m];
    if (r)
      var L = a ? r(_, T, m, e, n, i) : r(T, _, m, n, e, i);
    if (L !== void 0) {
      if (L)
        continue;
      h = !1;
      break;
    }
    if (p) {
      if (!jf(e, function(I, P) {
        if (!Uf(p, P) && (T === I || s(T, I, t, r, i)))
          return p.push(P);
      })) {
        h = !1;
        break;
      }
    } else if (!(T === _ || s(T, _, t, r, i))) {
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
var Gf = 1, Wf = 2, Zf = "[object Boolean]", Yf = "[object Date]", Xf = "[object Error]", Qf = "[object Map]", Jf = "[object Number]", ep = "[object RegExp]", tp = "[object Set]", rp = "[object String]", np = "[object Symbol]", sp = "[object ArrayBuffer]", ip = "[object DataView]", ko = Ut ? Ut.prototype : void 0, ei = ko ? ko.valueOf : void 0;
function op(n, e, t, r, s, i, a) {
  switch (t) {
    case ip:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case sp:
      return !(n.byteLength != e.byteLength || !i(new Qn(n), new Qn(e)));
    case Zf:
    case Yf:
    case Jf:
      return gn(+n, +e);
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
      var b = el(l(n), l(e), r, s, i, a);
      return a.delete(n), b;
    case np:
      if (ei)
        return ei.call(n) == ei.call(e);
  }
  return !1;
}
var ap = 1, lp = Object.prototype, cp = lp.hasOwnProperty;
function up(n, e, t, r, s, i) {
  var a = t & ap, l = bi(n), c = l.length, d = bi(e), b = d.length;
  if (c != b && !a)
    return !1;
  for (var m = c; m--; ) {
    var h = l[m];
    if (!(a ? h in e : cp.call(e, h)))
      return !1;
  }
  var p = i.get(n), T = i.get(e);
  if (p && T)
    return p == e && T == n;
  var _ = !0;
  i.set(n, e), i.set(e, n);
  for (var L = a; ++m < c; ) {
    h = l[m];
    var I = n[h], P = e[h];
    if (r)
      var U = a ? r(P, I, h, e, n, i) : r(I, P, h, n, e, i);
    if (!(U === void 0 ? I === P || s(I, P, t, r, i) : U)) {
      _ = !1;
      break;
    }
    L || (L = h == "constructor");
  }
  if (_ && !L) {
    var Y = n.constructor, G = e.constructor;
    Y != G && "constructor" in n && "constructor" in e && !(typeof Y == "function" && Y instanceof Y && typeof G == "function" && G instanceof G) && (_ = !1);
  }
  return i.delete(n), i.delete(e), _;
}
var dp = 1, Co = "[object Arguments]", Lo = "[object Array]", Bn = "[object Object]", hp = Object.prototype, qo = hp.hasOwnProperty;
function fp(n, e, t, r, s, i) {
  var a = nr(n), l = nr(e), c = a ? Lo : nt(n), d = l ? Lo : nt(e);
  c = c == Co ? Bn : c, d = d == Co ? Bn : d;
  var b = c == Bn, m = d == Bn, h = c == d;
  if (h && ln(n)) {
    if (!ln(e))
      return !1;
    a = !0, b = !1;
  }
  if (h && !b)
    return i || (i = new ft()), a || Ui(n) ? el(n, e, t, r, s, i) : op(n, e, c, t, r, s, i);
  if (!(t & dp)) {
    var p = b && qo.call(n, "__wrapped__"), T = m && qo.call(e, "__wrapped__");
    if (p || T) {
      var _ = p ? n.value() : n, L = T ? e.value() : e;
      return i || (i = new ft()), s(_, L, t, r, i);
    }
  }
  return h ? (i || (i = new ft()), up(n, e, t, r, s, i)) : !1;
}
function tl(n, e, t, r, s) {
  return n === e ? !0 : n == null || e == null || !Tt(n) && !Tt(e) ? n !== n && e !== e : fp(n, e, t, r, tl, s);
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
  (t !== void 0 && !gn(n[e], t) || t === void 0 && !(e in n)) && Fi(n, e, t);
}
function gp(n) {
  return Tt(n) && os(n);
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
  var b = i ? i(l, c, t + "", n, e, a) : void 0, m = b === void 0;
  if (m) {
    var h = nr(c), p = !h && ln(c), T = !h && !p && Ui(c);
    b = c, h || p || T ? nr(l) ? b = l : gp(l) ? b = _u(l) : p ? (m = !1, b = Wa(c, !0)) : T ? (m = !1, b = Za(c, !0)) : b = [] : hh(c) || gi(c) ? (b = l, gi(l) ? b = bp(l) : (!Ht(l) || Mi(l)) && (b = Ya(c))) : m = !1;
  }
  m && (a.set(c, b), s(b, c, r, i, a), a.delete(c)), wi(n, t, b);
}
function rl(n, e, t, r, s) {
  n !== e && mp(e, function(i, a) {
    if (s || (s = new ft()), Ht(i))
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
var Pt = Hu(function(n, e, t) {
  rl(n, e, t);
}), W = /* @__PURE__ */ ((n) => (n[n.TYPE = 3] = "TYPE", n[n.LEVEL = 12] = "LEVEL", n[n.ATTRIBUTE = 13] = "ATTRIBUTE", n[n.BLOT = 14] = "BLOT", n[n.INLINE = 7] = "INLINE", n[n.BLOCK = 11] = "BLOCK", n[n.BLOCK_BLOT = 10] = "BLOCK_BLOT", n[n.INLINE_BLOT = 6] = "INLINE_BLOT", n[n.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", n[n.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", n[n.ANY = 15] = "ANY", n))(W || {});
class pt {
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
class Cr extends Error {
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
      throw new Cr(`Unable to create ${t} blot`);
    const i = s, a = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : i.create(r)
    ), l = new i(e, a, r);
    return Ei.blots.set(l.domNode, l), l;
  }
  find(e, t = !1) {
    return Ei.find(e, t);
  }
  query(e, t = W.ANY) {
    let r;
    return typeof e == "string" ? r = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? r = this.types.text : typeof e == "number" ? e & W.LEVEL & W.BLOCK ? r = this.types.block : e & W.LEVEL & W.INLINE && (r = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((s) => (r = this.classes[s], !!r)), r = r || this.tags[e.tagName]), r == null ? null : "scope" in r && t & W.LEVEL & r.scope && t & W.TYPE & r.scope ? r : null;
  }
  register(...e) {
    return e.map((t) => {
      const r = "blotName" in t, s = "attrName" in t;
      if (!r && !s)
        throw new Cr("Invalid definition");
      if (r && t.blotName === "abstract")
        throw new Cr("Cannot register abstract class");
      const i = r ? t.blotName : s ? t.attrName : void 0;
      return this.types[i] = t, s ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : r && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((a) => a.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((a) => {
        (this.tags[a] == null || t.className == null) && (this.tags[a] = t);
      }))), t;
    });
  }
};
nl.blots = /* @__PURE__ */ new WeakMap();
let Rr = nl;
function Oo(n, e) {
  return (n.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class vp extends pt {
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
class xp extends pt {
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
const Vt = xp;
class wp {
  constructor(e) {
    this.attributes = {}, this.domNode = e, this.build();
  }
  attribute(e, t) {
    t ? e.add(this.domNode, t) && (e.value(this.domNode) != null ? this.attributes[e.attrName] = e : delete this.attributes[e.attrName]) : (e.remove(this.domNode), delete this.attributes[e.attrName]);
  }
  build() {
    this.attributes = {};
    const e = Rr.find(this.domNode);
    if (e == null)
      return;
    const t = pt.keys(this.domNode), r = lt.keys(this.domNode), s = Vt.keys(this.domNode);
    t.concat(r).concat(s).forEach((i) => {
      const a = e.scroll.query(i, W.ATTRIBUTE);
      a instanceof pt && (this.attributes[a.attrName] = a);
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
const cs = wp, sl = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, Rr.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new Cr("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Rr.blots.delete(this.domNode);
  }
  deleteAt(e, t) {
    this.isolate(e, t).remove();
  }
  formatAt(e, t, r, s) {
    const i = this.isolate(e, t);
    if (this.scroll.query(r, W.BLOT) != null && s)
      i.wrap(r, s);
    else if (this.scroll.query(r, W.ATTRIBUTE) != null) {
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
      throw new Cr(`Cannot wrap ${e}`);
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
ol.scope = W.INLINE_BLOT;
let Ap = ol;
const Be = Ap;
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
    const r = e.create(W.INLINE);
    return Array.from(n.childNodes).forEach((s) => {
      r.domNode.appendChild(s);
    }), n.parentNode && n.parentNode.replaceChild(r.domNode, n), r.attach(), r;
  }
}
const al = class $t extends il {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = e, $t.uiClass && this.uiNode.classList.add($t.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
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
        if (t instanceof Cr)
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
    return e.blotName == null && e(r) || e.blotName != null && r instanceof e ? [r, s] : r instanceof $t ? r.descendant(e, s) : [null, -1];
  }
  descendants(e, t = 0, r = Number.MAX_VALUE) {
    let s = [], i = r;
    return this.children.forEachAt(
      t,
      r,
      (a, l, c) => {
        (e.blotName == null && e(a) || e.blotName != null && a instanceof e) && s.push(a), a instanceof $t && (s = s.concat(
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
      ) || (t.statics.scope === W.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof $t ? t.unwrap() : t.remove());
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
    return r instanceof $t ? i.concat(r.path(s, t)) : (r != null && i.push([r, s]), i);
  }
  removeChild(e) {
    this.children.remove(e);
  }
  replaceWith(e, t) {
    const r = typeof e == "string" ? this.scroll.create(e, t) : e;
    return r instanceof $t && this.moveChildren(r), super.replaceWith(r);
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
const Ar = class Er extends ot {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(Er.blotName);
    if (!(r != null && e.tagName === r.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new cs(this.domNode);
  }
  format(e, t) {
    if (e === this.statics.blotName && !t)
      this.children.forEach((r) => {
        r instanceof Er || (r = r.wrap(Er.blotName, !0)), this.attributes.copy(r);
      }), this.unwrap();
    else {
      const r = this.scroll.query(e, W.INLINE);
      if (r == null)
        return;
      r instanceof pt ? this.attributes.attribute(r, t) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t);
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
    r instanceof Er && r.prev === this && Tp(t, r.formats()) && (r.moveChildren(this), r.remove());
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
    return r instanceof Er && this.attributes.move(r), r;
  }
};
Ar.allowedChildren = [Ar, Be], Ar.blotName = "inline", Ar.scope = W.INLINE_BLOT, Ar.tagName = "SPAN";
let _p = Ar;
const Vi = _p, Nr = class Ni extends ot {
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
    super(e, t), this.attributes = new cs(this.domNode);
  }
  format(e, t) {
    const r = this.scroll.query(e, W.BLOCK);
    r != null && (r instanceof pt ? this.attributes.attribute(r, t) : e === this.statics.blotName && !t ? this.replaceWith(Ni.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
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
Nr.blotName = "block", Nr.scope = W.BLOCK_BLOT, Nr.tagName = "P", Nr.allowedChildren = [
  Vi,
  Nr,
  Be
];
let Sp = Nr;
const dn = Sp, Ti = class extends ot {
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
Ti.blotName = "container", Ti.scope = W.BLOCK_BLOT;
let kp = Ti;
const us = kp;
class Cp extends Be {
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
const Ge = Cp, Lp = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, qp = 100, Tr = class extends ot {
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
        const b = this.find(d.target, !0);
        b != null && (b.domNode === d.target && (d.type === "childList" ? (i(this.find(d.previousSibling, !1)), Array.from(d.addedNodes).forEach((m) => {
          const h = this.find(m, !1);
          i(h, !1), h instanceof ot && h.children.forEach((p) => {
            i(p, !1);
          });
        })) : d.type === "attributes" && i(b.prev)), i(b));
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
Tr.blotName = "scroll", Tr.defaultChild = dn, Tr.allowedChildren = [dn, us], Tr.scope = W.BLOCK_BLOT, Tr.tagName = "DIV";
let Op = Tr;
const Ki = Op, _i = class ll extends Be {
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
_i.blotName = "text", _i.scope = W.INLINE_BLOT;
let Ip = _i;
const es = Ip, Rp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: pt,
  AttributorStore: cs,
  BlockBlot: dn,
  ClassAttributor: lt,
  ContainerBlot: us,
  EmbedBlot: Ge,
  InlineBlot: Vi,
  LeafBlot: Be,
  ParentBlot: ot,
  Registry: Rr,
  Scope: W,
  ScrollBlot: Ki,
  StyleAttributor: Vt,
  TextBlot: es
}, Symbol.toStringTag, { value: "Module" }));
var Mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function cl(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Dn = { exports: {} }, ri, Ro;
function $p() {
  if (Ro) return ri;
  Ro = 1;
  var n = -1, e = 1, t = 0;
  function r(f, q, A, F, w) {
    if (f === q)
      return f ? [[t, f]] : [];
    if (A != null) {
      var v = z(f, q, A);
      if (v)
        return v;
    }
    var k = l(f, q), N = f.substring(0, k);
    f = f.substring(k), q = q.substring(k), k = d(f, q);
    var x = f.substring(f.length - k);
    f = f.substring(0, f.length - k), q = q.substring(0, q.length - k);
    var $ = s(f, q);
    return N && $.unshift([t, N]), x && $.push([t, x]), P($, w), F && m($), $;
  }
  function s(f, q) {
    var A;
    if (!f)
      return [[e, q]];
    if (!q)
      return [[n, f]];
    var F = f.length > q.length ? f : q, w = f.length > q.length ? q : f, v = F.indexOf(w);
    if (v !== -1)
      return A = [
        [e, F.substring(0, v)],
        [t, w],
        [e, F.substring(v + w.length)]
      ], f.length > q.length && (A[0][0] = A[2][0] = n), A;
    if (w.length === 1)
      return [
        [n, f],
        [e, q]
      ];
    var k = b(f, q);
    if (k) {
      var N = k[0], x = k[1], $ = k[2], j = k[3], Z = k[4], Q = r(N, $), ae = r(x, j);
      return Q.concat([[t, Z]], ae);
    }
    return i(f, q);
  }
  function i(f, q) {
    for (var A = f.length, F = q.length, w = Math.ceil((A + F) / 2), v = w, k = 2 * w, N = new Array(k), x = new Array(k), $ = 0; $ < k; $++)
      N[$] = -1, x[$] = -1;
    N[v + 1] = 0, x[v + 1] = 0;
    for (var j = A - F, Z = j % 2 !== 0, Q = 0, ae = 0, J = 0, fe = 0, ve = 0; ve < w; ve++) {
      for (var re = -ve + Q; re <= ve - ae; re += 2) {
        var le = v + re, ce;
        re === -ve || re !== ve && N[le - 1] < N[le + 1] ? ce = N[le + 1] : ce = N[le - 1] + 1;
        for (var de = ce - re; ce < A && de < F && f.charAt(ce) === q.charAt(de); )
          ce++, de++;
        if (N[le] = ce, ce > A)
          ae += 2;
        else if (de > F)
          Q += 2;
        else if (Z) {
          var pe = v + j - re;
          if (pe >= 0 && pe < k && x[pe] !== -1) {
            var me = A - x[pe];
            if (ce >= me)
              return a(f, q, ce, de);
          }
        }
      }
      for (var Ae = -ve + J; Ae <= ve - fe; Ae += 2) {
        var pe = v + Ae, me;
        Ae === -ve || Ae !== ve && x[pe - 1] < x[pe + 1] ? me = x[pe + 1] : me = x[pe - 1] + 1;
        for (var _e = me - Ae; me < A && _e < F && f.charAt(A - me - 1) === q.charAt(F - _e - 1); )
          me++, _e++;
        if (x[pe] = me, me > A)
          fe += 2;
        else if (_e > F)
          J += 2;
        else if (!Z) {
          var le = v + j - Ae;
          if (le >= 0 && le < k && N[le] !== -1) {
            var ce = N[le], de = v + ce - le;
            if (me = A - me, ce >= me)
              return a(f, q, ce, de);
          }
        }
      }
    }
    return [
      [n, f],
      [e, q]
    ];
  }
  function a(f, q, A, F) {
    var w = f.substring(0, A), v = q.substring(0, F), k = f.substring(A), N = q.substring(F), x = r(w, v), $ = r(k, N);
    return x.concat($);
  }
  function l(f, q) {
    if (!f || !q || f.charAt(0) !== q.charAt(0))
      return 0;
    for (var A = 0, F = Math.min(f.length, q.length), w = F, v = 0; A < w; )
      f.substring(v, w) == q.substring(v, w) ? (A = w, v = A) : F = w, w = Math.floor((F - A) / 2 + A);
    return U(f.charCodeAt(w - 1)) && w--, w;
  }
  function c(f, q) {
    var A = f.length, F = q.length;
    if (A == 0 || F == 0)
      return 0;
    A > F ? f = f.substring(A - F) : A < F && (q = q.substring(0, A));
    var w = Math.min(A, F);
    if (f == q)
      return w;
    for (var v = 0, k = 1; ; ) {
      var N = f.substring(w - k), x = q.indexOf(N);
      if (x == -1)
        return v;
      k += x, (x == 0 || f.substring(w - k) == q.substring(0, k)) && (v = k, k++);
    }
  }
  function d(f, q) {
    if (!f || !q || f.slice(-1) !== q.slice(-1))
      return 0;
    for (var A = 0, F = Math.min(f.length, q.length), w = F, v = 0; A < w; )
      f.substring(f.length - w, f.length - v) == q.substring(q.length - w, q.length - v) ? (A = w, v = A) : F = w, w = Math.floor((F - A) / 2 + A);
    return Y(f.charCodeAt(f.length - w)) && w--, w;
  }
  function b(f, q) {
    var A = f.length > q.length ? f : q, F = f.length > q.length ? q : f;
    if (A.length < 4 || F.length * 2 < A.length)
      return null;
    function w(ae, J, fe) {
      for (var ve = ae.substring(fe, fe + Math.floor(ae.length / 4)), re = -1, le = "", ce, de, pe, me; (re = J.indexOf(ve, re + 1)) !== -1; ) {
        var Ae = l(
          ae.substring(fe),
          J.substring(re)
        ), _e = d(
          ae.substring(0, fe),
          J.substring(0, re)
        );
        le.length < _e + Ae && (le = J.substring(re - _e, re) + J.substring(re, re + Ae), ce = ae.substring(0, fe - _e), de = ae.substring(fe + Ae), pe = J.substring(0, re - _e), me = J.substring(re + Ae));
      }
      return le.length * 2 >= ae.length ? [
        ce,
        de,
        pe,
        me,
        le
      ] : null;
    }
    var v = w(
      A,
      F,
      Math.ceil(A.length / 4)
    ), k = w(
      A,
      F,
      Math.ceil(A.length / 2)
    ), N;
    if (!v && !k)
      return null;
    k ? v ? N = v[4].length > k[4].length ? v : k : N = k : N = v;
    var x, $, j, Z;
    f.length > q.length ? (x = N[0], $ = N[1], j = N[2], Z = N[3]) : (j = N[0], Z = N[1], x = N[2], $ = N[3]);
    var Q = N[4];
    return [x, $, j, Z, Q];
  }
  function m(f) {
    for (var q = !1, A = [], F = 0, w = null, v = 0, k = 0, N = 0, x = 0, $ = 0; v < f.length; )
      f[v][0] == t ? (A[F++] = v, k = x, N = $, x = 0, $ = 0, w = f[v][1]) : (f[v][0] == e ? x += f[v][1].length : $ += f[v][1].length, w && w.length <= Math.max(k, N) && w.length <= Math.max(x, $) && (f.splice(A[F - 1], 0, [
        n,
        w
      ]), f[A[F - 1] + 1][0] = e, F--, F--, v = F > 0 ? A[F - 1] : -1, k = 0, N = 0, x = 0, $ = 0, w = null, q = !0)), v++;
    for (q && P(f), I(f), v = 1; v < f.length; ) {
      if (f[v - 1][0] == n && f[v][0] == e) {
        var j = f[v - 1][1], Z = f[v][1], Q = c(j, Z), ae = c(Z, j);
        Q >= ae ? (Q >= j.length / 2 || Q >= Z.length / 2) && (f.splice(v, 0, [
          t,
          Z.substring(0, Q)
        ]), f[v - 1][1] = j.substring(
          0,
          j.length - Q
        ), f[v + 1][1] = Z.substring(Q), v++) : (ae >= j.length / 2 || ae >= Z.length / 2) && (f.splice(v, 0, [
          t,
          j.substring(0, ae)
        ]), f[v - 1][0] = e, f[v - 1][1] = Z.substring(
          0,
          Z.length - ae
        ), f[v + 1][0] = n, f[v + 1][1] = j.substring(ae), v++), v++;
      }
      v++;
    }
  }
  var h = /[^a-zA-Z0-9]/, p = /\s/, T = /[\r\n]/, _ = /\n\r?\n$/, L = /^\r?\n\r?\n/;
  function I(f) {
    function q(ae, J) {
      if (!ae || !J)
        return 6;
      var fe = ae.charAt(ae.length - 1), ve = J.charAt(0), re = fe.match(h), le = ve.match(h), ce = re && fe.match(p), de = le && ve.match(p), pe = ce && fe.match(T), me = de && ve.match(T), Ae = pe && ae.match(_), _e = me && J.match(L);
      return Ae || _e ? 5 : pe || me ? 4 : re && !ce && de ? 3 : ce || de ? 2 : re || le ? 1 : 0;
    }
    for (var A = 1; A < f.length - 1; ) {
      if (f[A - 1][0] == t && f[A + 1][0] == t) {
        var F = f[A - 1][1], w = f[A][1], v = f[A + 1][1], k = d(F, w);
        if (k) {
          var N = w.substring(w.length - k);
          F = F.substring(0, F.length - k), w = N + w.substring(0, w.length - k), v = N + v;
        }
        for (var x = F, $ = w, j = v, Z = q(F, w) + q(w, v); w.charAt(0) === v.charAt(0); ) {
          F += w.charAt(0), w = w.substring(1) + v.charAt(0), v = v.substring(1);
          var Q = q(F, w) + q(w, v);
          Q >= Z && (Z = Q, x = F, $ = w, j = v);
        }
        f[A - 1][1] != x && (x ? f[A - 1][1] = x : (f.splice(A - 1, 1), A--), f[A][1] = $, j ? f[A + 1][1] = j : (f.splice(A + 1, 1), A--));
      }
      A++;
    }
  }
  function P(f, q) {
    f.push([t, ""]);
    for (var A = 0, F = 0, w = 0, v = "", k = "", N; A < f.length; ) {
      if (A < f.length - 1 && !f[A][1]) {
        f.splice(A, 1);
        continue;
      }
      switch (f[A][0]) {
        case e:
          w++, k += f[A][1], A++;
          break;
        case n:
          F++, v += f[A][1], A++;
          break;
        case t:
          var x = A - w - F - 1;
          if (q) {
            if (x >= 0 && oe(f[x][1])) {
              var $ = f[x][1].slice(-1);
              if (f[x][1] = f[x][1].slice(
                0,
                -1
              ), v = $ + v, k = $ + k, !f[x][1]) {
                f.splice(x, 1), A--;
                var j = x - 1;
                f[j] && f[j][0] === e && (w++, k = f[j][1] + k, j--), f[j] && f[j][0] === n && (F++, v = f[j][1] + v, j--), x = j;
              }
            }
            if (G(f[A][1])) {
              var $ = f[A][1].charAt(0);
              f[A][1] = f[A][1].slice(1), v += $, k += $;
            }
          }
          if (A < f.length - 1 && !f[A][1]) {
            f.splice(A, 1);
            break;
          }
          if (v.length > 0 || k.length > 0) {
            v.length > 0 && k.length > 0 && (N = l(k, v), N !== 0 && (x >= 0 ? f[x][1] += k.substring(
              0,
              N
            ) : (f.splice(0, 0, [
              t,
              k.substring(0, N)
            ]), A++), k = k.substring(N), v = v.substring(N)), N = d(k, v), N !== 0 && (f[A][1] = k.substring(k.length - N) + f[A][1], k = k.substring(
              0,
              k.length - N
            ), v = v.substring(
              0,
              v.length - N
            )));
            var Z = w + F;
            v.length === 0 && k.length === 0 ? (f.splice(A - Z, Z), A = A - Z) : v.length === 0 ? (f.splice(A - Z, Z, [e, k]), A = A - Z + 1) : k.length === 0 ? (f.splice(A - Z, Z, [n, v]), A = A - Z + 1) : (f.splice(
              A - Z,
              Z,
              [n, v],
              [e, k]
            ), A = A - Z + 2);
          }
          A !== 0 && f[A - 1][0] === t ? (f[A - 1][1] += f[A][1], f.splice(A, 1)) : A++, w = 0, F = 0, v = "", k = "";
          break;
      }
    }
    f[f.length - 1][1] === "" && f.pop();
    var Q = !1;
    for (A = 1; A < f.length - 1; )
      f[A - 1][0] === t && f[A + 1][0] === t && (f[A][1].substring(
        f[A][1].length - f[A - 1][1].length
      ) === f[A - 1][1] ? (f[A][1] = f[A - 1][1] + f[A][1].substring(
        0,
        f[A][1].length - f[A - 1][1].length
      ), f[A + 1][1] = f[A - 1][1] + f[A + 1][1], f.splice(A - 1, 1), Q = !0) : f[A][1].substring(0, f[A + 1][1].length) == f[A + 1][1] && (f[A - 1][1] += f[A + 1][1], f[A][1] = f[A][1].substring(f[A + 1][1].length) + f[A + 1][1], f.splice(A + 1, 1), Q = !0)), A++;
    Q && P(f, q);
  }
  function U(f) {
    return f >= 55296 && f <= 56319;
  }
  function Y(f) {
    return f >= 56320 && f <= 57343;
  }
  function G(f) {
    return Y(f.charCodeAt(0));
  }
  function oe(f) {
    return U(f.charCodeAt(f.length - 1));
  }
  function se(f) {
    for (var q = [], A = 0; A < f.length; A++)
      f[A][1].length > 0 && q.push(f[A]);
    return q;
  }
  function ye(f, q, A, F) {
    return oe(f) || G(F) ? null : se([
      [t, f],
      [n, q],
      [e, A],
      [t, F]
    ]);
  }
  function z(f, q, A) {
    var F = typeof A == "number" ? { index: A, length: 0 } : A.oldRange, w = typeof A == "number" ? null : A.newRange, v = f.length, k = q.length;
    if (F.length === 0 && (w === null || w.length === 0)) {
      var N = F.index, x = f.slice(0, N), $ = f.slice(N), j = w ? w.index : null;
      e: {
        var Z = N + k - v;
        if (j !== null && j !== Z || Z < 0 || Z > k)
          break e;
        var Q = q.slice(0, Z), ae = q.slice(Z);
        if (ae !== $)
          break e;
        var J = Math.min(N, Z), fe = x.slice(0, J), ve = Q.slice(0, J);
        if (fe !== ve)
          break e;
        var re = x.slice(J), le = Q.slice(J);
        return ye(fe, re, le, $);
      }
      e: {
        if (j !== null && j !== N)
          break e;
        var ce = N, Q = q.slice(0, ce), ae = q.slice(ce);
        if (Q !== x)
          break e;
        var de = Math.min(v - ce, k - ce), pe = $.slice($.length - de), me = ae.slice(ae.length - de);
        if (pe !== me)
          break e;
        var re = $.slice(0, $.length - de), le = ae.slice(0, ae.length - de);
        return ye(x, re, le, pe);
      }
    }
    if (F.length > 0 && w && w.length === 0)
      e: {
        var fe = f.slice(0, F.index), pe = f.slice(F.index + F.length), J = fe.length, de = pe.length;
        if (k < J + de)
          break e;
        var ve = q.slice(0, J), me = q.slice(k - de);
        if (fe !== ve || pe !== me)
          break e;
        var re = f.slice(J, v - de), le = q.slice(J, k - de);
        return ye(fe, re, le, pe);
      }
    return null;
  }
  function H(f, q, A, F) {
    return r(f, q, A, F, !0);
  }
  return H.INSERT = e, H.DELETE = n, H.EQUAL = t, ri = H, ri;
}
var Jr = { exports: {} };
Jr.exports;
var $o;
function ul() {
  return $o || ($o = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", a = "[object Array]", l = "[object Boolean]", c = "[object Date]", d = "[object Error]", b = "[object Function]", m = "[object GeneratorFunction]", h = "[object Map]", p = "[object Number]", T = "[object Object]", _ = "[object Promise]", L = "[object RegExp]", I = "[object Set]", P = "[object String]", U = "[object Symbol]", Y = "[object WeakMap]", G = "[object ArrayBuffer]", oe = "[object DataView]", se = "[object Float32Array]", ye = "[object Float64Array]", z = "[object Int8Array]", H = "[object Int16Array]", f = "[object Int32Array]", q = "[object Uint8Array]", A = "[object Uint8ClampedArray]", F = "[object Uint16Array]", w = "[object Uint32Array]", v = /[\\^$.*+?()[\]{}|]/g, k = /\w*$/, N = /^\[object .+?Constructor\]$/, x = /^(?:0|[1-9]\d*)$/, $ = {};
    $[i] = $[a] = $[G] = $[oe] = $[l] = $[c] = $[se] = $[ye] = $[z] = $[H] = $[f] = $[h] = $[p] = $[T] = $[L] = $[I] = $[P] = $[U] = $[q] = $[A] = $[F] = $[w] = !0, $[d] = $[b] = $[Y] = !1;
    var j = typeof Mt == "object" && Mt && Mt.Object === Object && Mt, Z = typeof self == "object" && self && self.Object === Object && self, Q = j || Z || Function("return this")(), ae = e && !e.nodeType && e, J = ae && !0 && n && !n.nodeType && n, fe = J && J.exports === ae;
    function ve(o, u) {
      return o.set(u[0], u[1]), o;
    }
    function re(o, u) {
      return o.add(u), o;
    }
    function le(o, u) {
      for (var g = -1, O = o ? o.length : 0; ++g < O && u(o[g], g, o) !== !1; )
        ;
      return o;
    }
    function ce(o, u) {
      for (var g = -1, O = u.length, ne = o.length; ++g < O; )
        o[ne + g] = u[g];
      return o;
    }
    function de(o, u, g, O) {
      for (var ne = -1, X = o ? o.length : 0; ++ne < X; )
        g = u(g, o[ne], ne, o);
      return g;
    }
    function pe(o, u) {
      for (var g = -1, O = Array(o); ++g < o; )
        O[g] = u(g);
      return O;
    }
    function me(o, u) {
      return o?.[u];
    }
    function Ae(o) {
      var u = !1;
      if (o != null && typeof o.toString != "function")
        try {
          u = !!(o + "");
        } catch {
        }
      return u;
    }
    function _e(o) {
      var u = -1, g = Array(o.size);
      return o.forEach(function(O, ne) {
        g[++u] = [ne, O];
      }), g;
    }
    function Kt(o, u) {
      return function(g) {
        return o(u(g));
      };
    }
    function Gt(o) {
      var u = -1, g = Array(o.size);
      return o.forEach(function(O) {
        g[++u] = O;
      }), g;
    }
    var Lt = Array.prototype, fr = Function.prototype, bt = Object.prototype, S = Q["__core-js_shared__"], E = (function() {
      var o = /[^.]+$/.exec(S && S.keys && S.keys.IE_PROTO || "");
      return o ? "Symbol(src)_1." + o : "";
    })(), C = fr.toString, B = bt.hasOwnProperty, ge = bt.toString, Se = RegExp(
      "^" + C.call(B).replace(v, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), yt = fe ? Q.Buffer : void 0, qt = Q.Symbol, Ot = Q.Uint8Array, Ue = Kt(Object.getPrototypeOf, Object), We = Object.create, wn = bt.propertyIsEnumerable, ps = Lt.splice, Dr = Object.getOwnPropertySymbols, pr = yt ? yt.isBuffer : void 0, An = Kt(Object.keys, Object), mr = et(Q, "DataView"), Wt = et(Q, "Map"), Je = et(Q, "Promise"), gr = et(Q, "Set"), Mr = et(Q, "WeakMap"), Zt = et(Object, "create"), Fr = Fe(mr), Yt = Fe(Wt), Pr = Fe(Je), jr = Fe(gr), Ur = Fe(Mr), It = qt ? qt.prototype : void 0, En = It ? It.valueOf : void 0;
    function vt(o) {
      var u = -1, g = o ? o.length : 0;
      for (this.clear(); ++u < g; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function ms() {
      this.__data__ = Zt ? Zt(null) : {};
    }
    function gs(o) {
      return this.has(o) && delete this.__data__[o];
    }
    function bs(o) {
      var u = this.__data__;
      if (Zt) {
        var g = u[o];
        return g === r ? void 0 : g;
      }
      return B.call(u, o) ? u[o] : void 0;
    }
    function Nn(o) {
      var u = this.__data__;
      return Zt ? u[o] !== void 0 : B.call(u, o);
    }
    function zr(o, u) {
      var g = this.__data__;
      return g[o] = Zt && u === void 0 ? r : u, this;
    }
    vt.prototype.clear = ms, vt.prototype.delete = gs, vt.prototype.get = bs, vt.prototype.has = Nn, vt.prototype.set = zr;
    function ke(o) {
      var u = -1, g = o ? o.length : 0;
      for (this.clear(); ++u < g; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function ys() {
      this.__data__ = [];
    }
    function vs(o) {
      var u = this.__data__, g = yr(u, o);
      if (g < 0)
        return !1;
      var O = u.length - 1;
      return g == O ? u.pop() : ps.call(u, g, 1), !0;
    }
    function xs(o) {
      var u = this.__data__, g = yr(u, o);
      return g < 0 ? void 0 : u[g][1];
    }
    function ws(o) {
      return yr(this.__data__, o) > -1;
    }
    function As(o, u) {
      var g = this.__data__, O = yr(g, o);
      return O < 0 ? g.push([o, u]) : g[O][1] = u, this;
    }
    ke.prototype.clear = ys, ke.prototype.delete = vs, ke.prototype.get = xs, ke.prototype.has = ws, ke.prototype.set = As;
    function Oe(o) {
      var u = -1, g = o ? o.length : 0;
      for (this.clear(); ++u < g; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function Es() {
      this.__data__ = {
        hash: new vt(),
        map: new (Wt || ke)(),
        string: new vt()
      };
    }
    function Ns(o) {
      return Qt(this, o).delete(o);
    }
    function Ts(o) {
      return Qt(this, o).get(o);
    }
    function _s(o) {
      return Qt(this, o).has(o);
    }
    function Ss(o, u) {
      return Qt(this, o).set(o, u), this;
    }
    Oe.prototype.clear = Es, Oe.prototype.delete = Ns, Oe.prototype.get = Ts, Oe.prototype.has = _s, Oe.prototype.set = Ss;
    function ze(o) {
      this.__data__ = new ke(o);
    }
    function ks() {
      this.__data__ = new ke();
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
      var g = this.__data__;
      if (g instanceof ke) {
        var O = g.__data__;
        if (!Wt || O.length < t - 1)
          return O.push([o, u]), this;
        g = this.__data__ = new Oe(O);
      }
      return g.set(o, u), this;
    }
    ze.prototype.clear = ks, ze.prototype.delete = Cs, ze.prototype.get = Ls, ze.prototype.has = qs, ze.prototype.set = Os;
    function br(o, u) {
      var g = Gr(o) || xr(o) ? pe(o.length, String) : [], O = g.length, ne = !!O;
      for (var X in o)
        B.call(o, X) && !(ne && (X == "length" || Ks(X, O))) && g.push(X);
      return g;
    }
    function Tn(o, u, g) {
      var O = o[u];
      (!(B.call(o, u) && Ln(O, g)) || g === void 0 && !(u in o)) && (o[u] = g);
    }
    function yr(o, u) {
      for (var g = o.length; g--; )
        if (Ln(o[g][0], u))
          return g;
      return -1;
    }
    function ut(o, u) {
      return o && Kr(u, Zr(u), o);
    }
    function Hr(o, u, g, O, ne, X, he) {
      var ue;
      if (O && (ue = X ? O(o, ne, X, he) : O(o)), ue !== void 0)
        return ue;
      if (!ht(o))
        return o;
      var Ee = Gr(o);
      if (Ee) {
        if (ue = Hs(o), !u)
          return js(o, ue);
      } else {
        var be = wt(o), Ie = be == b || be == m;
        if (qn(o))
          return vr(o, u);
        if (be == T || be == i || Ie && !X) {
          if (Ae(o))
            return X ? o : {};
          if (ue = dt(Ie ? {} : o), !u)
            return Us(o, ut(ue, o));
        } else {
          if (!$[be])
            return X ? o : {};
          ue = Vs(o, be, Hr, u);
        }
      }
      he || (he = new ze());
      var He = he.get(o);
      if (He)
        return He;
      if (he.set(o, ue), !Ee)
        var Ne = g ? zs(o) : Zr(o);
      return le(Ne || o, function(Re, Ce) {
        Ne && (Ce = Re, Re = o[Ce]), Tn(ue, Ce, Hr(Re, u, g, O, Ce, o, he));
      }), ue;
    }
    function Is(o) {
      return ht(o) ? We(o) : {};
    }
    function Rs(o, u, g) {
      var O = u(o);
      return Gr(o) ? O : ce(O, g(o));
    }
    function $s(o) {
      return ge.call(o);
    }
    function Bs(o) {
      if (!ht(o) || Ws(o))
        return !1;
      var u = Wr(o) || Ae(o) ? Se : N;
      return u.test(Fe(o));
    }
    function Ds(o) {
      if (!kn(o))
        return An(o);
      var u = [];
      for (var g in Object(o))
        B.call(o, g) && g != "constructor" && u.push(g);
      return u;
    }
    function vr(o, u) {
      if (u)
        return o.slice();
      var g = new o.constructor(o.length);
      return o.copy(g), g;
    }
    function Vr(o) {
      var u = new o.constructor(o.byteLength);
      return new Ot(u).set(new Ot(o)), u;
    }
    function Xt(o, u) {
      var g = u ? Vr(o.buffer) : o.buffer;
      return new o.constructor(g, o.byteOffset, o.byteLength);
    }
    function _n(o, u, g) {
      var O = u ? g(_e(o), !0) : _e(o);
      return de(O, ve, new o.constructor());
    }
    function Sn(o) {
      var u = new o.constructor(o.source, k.exec(o));
      return u.lastIndex = o.lastIndex, u;
    }
    function Ms(o, u, g) {
      var O = u ? g(Gt(o), !0) : Gt(o);
      return de(O, re, new o.constructor());
    }
    function Fs(o) {
      return En ? Object(En.call(o)) : {};
    }
    function Ps(o, u) {
      var g = u ? Vr(o.buffer) : o.buffer;
      return new o.constructor(g, o.byteOffset, o.length);
    }
    function js(o, u) {
      var g = -1, O = o.length;
      for (u || (u = Array(O)); ++g < O; )
        u[g] = o[g];
      return u;
    }
    function Kr(o, u, g, O) {
      g || (g = {});
      for (var ne = -1, X = u.length; ++ne < X; ) {
        var he = u[ne], ue = void 0;
        Tn(g, he, ue === void 0 ? o[he] : ue);
      }
      return g;
    }
    function Us(o, u) {
      return Kr(o, xt(o), u);
    }
    function zs(o) {
      return Rs(o, Zr, xt);
    }
    function Qt(o, u) {
      var g = o.__data__;
      return Gs(u) ? g[typeof u == "string" ? "string" : "hash"] : g.map;
    }
    function et(o, u) {
      var g = me(o, u);
      return Bs(g) ? g : void 0;
    }
    var xt = Dr ? Kt(Dr, Object) : Ys, wt = $s;
    (mr && wt(new mr(new ArrayBuffer(1))) != oe || Wt && wt(new Wt()) != h || Je && wt(Je.resolve()) != _ || gr && wt(new gr()) != I || Mr && wt(new Mr()) != Y) && (wt = function(o) {
      var u = ge.call(o), g = u == T ? o.constructor : void 0, O = g ? Fe(g) : void 0;
      if (O)
        switch (O) {
          case Fr:
            return oe;
          case Yt:
            return h;
          case Pr:
            return _;
          case jr:
            return I;
          case Ur:
            return Y;
        }
      return u;
    });
    function Hs(o) {
      var u = o.length, g = o.constructor(u);
      return u && typeof o[0] == "string" && B.call(o, "index") && (g.index = o.index, g.input = o.input), g;
    }
    function dt(o) {
      return typeof o.constructor == "function" && !kn(o) ? Is(Ue(o)) : {};
    }
    function Vs(o, u, g, O) {
      var ne = o.constructor;
      switch (u) {
        case G:
          return Vr(o);
        case l:
        case c:
          return new ne(+o);
        case oe:
          return Xt(o, O);
        case se:
        case ye:
        case z:
        case H:
        case f:
        case q:
        case A:
        case F:
        case w:
          return Ps(o, O);
        case h:
          return _n(o, O, g);
        case p:
        case P:
          return new ne(o);
        case L:
          return Sn(o);
        case I:
          return Ms(o, O, g);
        case U:
          return Fs(o);
      }
    }
    function Ks(o, u) {
      return u = u ?? s, !!u && (typeof o == "number" || x.test(o)) && o > -1 && o % 1 == 0 && o < u;
    }
    function Gs(o) {
      var u = typeof o;
      return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? o !== "__proto__" : o === null;
    }
    function Ws(o) {
      return !!E && E in o;
    }
    function kn(o) {
      var u = o && o.constructor, g = typeof u == "function" && u.prototype || bt;
      return o === g;
    }
    function Fe(o) {
      if (o != null) {
        try {
          return C.call(o);
        } catch {
        }
        try {
          return o + "";
        } catch {
        }
      }
      return "";
    }
    function Cn(o) {
      return Hr(o, !0, !0);
    }
    function Ln(o, u) {
      return o === u || o !== o && u !== u;
    }
    function xr(o) {
      return Zs(o) && B.call(o, "callee") && (!wn.call(o, "callee") || ge.call(o) == i);
    }
    var Gr = Array.isArray;
    function wr(o) {
      return o != null && On(o.length) && !Wr(o);
    }
    function Zs(o) {
      return In(o) && wr(o);
    }
    var qn = pr || Xs;
    function Wr(o) {
      var u = ht(o) ? ge.call(o) : "";
      return u == b || u == m;
    }
    function On(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= s;
    }
    function ht(o) {
      var u = typeof o;
      return !!o && (u == "object" || u == "function");
    }
    function In(o) {
      return !!o && typeof o == "object";
    }
    function Zr(o) {
      return wr(o) ? br(o) : Ds(o);
    }
    function Ys() {
      return [];
    }
    function Xs() {
      return !1;
    }
    n.exports = Cn;
  })(Jr, Jr.exports)), Jr.exports;
}
var en = { exports: {} };
en.exports;
var Bo;
function dl() {
  return Bo || (Bo = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 1, i = 2, a = 9007199254740991, l = "[object Arguments]", c = "[object Array]", d = "[object AsyncFunction]", b = "[object Boolean]", m = "[object Date]", h = "[object Error]", p = "[object Function]", T = "[object GeneratorFunction]", _ = "[object Map]", L = "[object Number]", I = "[object Null]", P = "[object Object]", U = "[object Promise]", Y = "[object Proxy]", G = "[object RegExp]", oe = "[object Set]", se = "[object String]", ye = "[object Symbol]", z = "[object Undefined]", H = "[object WeakMap]", f = "[object ArrayBuffer]", q = "[object DataView]", A = "[object Float32Array]", F = "[object Float64Array]", w = "[object Int8Array]", v = "[object Int16Array]", k = "[object Int32Array]", N = "[object Uint8Array]", x = "[object Uint8ClampedArray]", $ = "[object Uint16Array]", j = "[object Uint32Array]", Z = /[\\^$.*+?()[\]{}|]/g, Q = /^\[object .+?Constructor\]$/, ae = /^(?:0|[1-9]\d*)$/, J = {};
    J[A] = J[F] = J[w] = J[v] = J[k] = J[N] = J[x] = J[$] = J[j] = !0, J[l] = J[c] = J[f] = J[b] = J[q] = J[m] = J[h] = J[p] = J[_] = J[L] = J[P] = J[G] = J[oe] = J[se] = J[H] = !1;
    var fe = typeof Mt == "object" && Mt && Mt.Object === Object && Mt, ve = typeof self == "object" && self && self.Object === Object && self, re = fe || ve || Function("return this")(), le = e && !e.nodeType && e, ce = le && !0 && n && !n.nodeType && n, de = ce && ce.exports === le, pe = de && fe.process, me = (function() {
      try {
        return pe && pe.binding && pe.binding("util");
      } catch {
      }
    })(), Ae = me && me.isTypedArray;
    function _e(o, u) {
      for (var g = -1, O = o == null ? 0 : o.length, ne = 0, X = []; ++g < O; ) {
        var he = o[g];
        u(he, g, o) && (X[ne++] = he);
      }
      return X;
    }
    function Kt(o, u) {
      for (var g = -1, O = u.length, ne = o.length; ++g < O; )
        o[ne + g] = u[g];
      return o;
    }
    function Gt(o, u) {
      for (var g = -1, O = o == null ? 0 : o.length; ++g < O; )
        if (u(o[g], g, o))
          return !0;
      return !1;
    }
    function Lt(o, u) {
      for (var g = -1, O = Array(o); ++g < o; )
        O[g] = u(g);
      return O;
    }
    function fr(o) {
      return function(u) {
        return o(u);
      };
    }
    function bt(o, u) {
      return o.has(u);
    }
    function S(o, u) {
      return o?.[u];
    }
    function E(o) {
      var u = -1, g = Array(o.size);
      return o.forEach(function(O, ne) {
        g[++u] = [ne, O];
      }), g;
    }
    function C(o, u) {
      return function(g) {
        return o(u(g));
      };
    }
    function B(o) {
      var u = -1, g = Array(o.size);
      return o.forEach(function(O) {
        g[++u] = O;
      }), g;
    }
    var ge = Array.prototype, Se = Function.prototype, yt = Object.prototype, qt = re["__core-js_shared__"], Ot = Se.toString, Ue = yt.hasOwnProperty, We = (function() {
      var o = /[^.]+$/.exec(qt && qt.keys && qt.keys.IE_PROTO || "");
      return o ? "Symbol(src)_1." + o : "";
    })(), wn = yt.toString, ps = RegExp(
      "^" + Ot.call(Ue).replace(Z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Dr = de ? re.Buffer : void 0, pr = re.Symbol, An = re.Uint8Array, mr = yt.propertyIsEnumerable, Wt = ge.splice, Je = pr ? pr.toStringTag : void 0, gr = Object.getOwnPropertySymbols, Mr = Dr ? Dr.isBuffer : void 0, Zt = C(Object.keys, Object), Fr = xt(re, "DataView"), Yt = xt(re, "Map"), Pr = xt(re, "Promise"), jr = xt(re, "Set"), Ur = xt(re, "WeakMap"), It = xt(Object, "create"), En = Fe(Fr), vt = Fe(Yt), ms = Fe(Pr), gs = Fe(jr), bs = Fe(Ur), Nn = pr ? pr.prototype : void 0, zr = Nn ? Nn.valueOf : void 0;
    function ke(o) {
      var u = -1, g = o == null ? 0 : o.length;
      for (this.clear(); ++u < g; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function ys() {
      this.__data__ = It ? It(null) : {}, this.size = 0;
    }
    function vs(o) {
      var u = this.has(o) && delete this.__data__[o];
      return this.size -= u ? 1 : 0, u;
    }
    function xs(o) {
      var u = this.__data__;
      if (It) {
        var g = u[o];
        return g === r ? void 0 : g;
      }
      return Ue.call(u, o) ? u[o] : void 0;
    }
    function ws(o) {
      var u = this.__data__;
      return It ? u[o] !== void 0 : Ue.call(u, o);
    }
    function As(o, u) {
      var g = this.__data__;
      return this.size += this.has(o) ? 0 : 1, g[o] = It && u === void 0 ? r : u, this;
    }
    ke.prototype.clear = ys, ke.prototype.delete = vs, ke.prototype.get = xs, ke.prototype.has = ws, ke.prototype.set = As;
    function Oe(o) {
      var u = -1, g = o == null ? 0 : o.length;
      for (this.clear(); ++u < g; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function Es() {
      this.__data__ = [], this.size = 0;
    }
    function Ns(o) {
      var u = this.__data__, g = vr(u, o);
      if (g < 0)
        return !1;
      var O = u.length - 1;
      return g == O ? u.pop() : Wt.call(u, g, 1), --this.size, !0;
    }
    function Ts(o) {
      var u = this.__data__, g = vr(u, o);
      return g < 0 ? void 0 : u[g][1];
    }
    function _s(o) {
      return vr(this.__data__, o) > -1;
    }
    function Ss(o, u) {
      var g = this.__data__, O = vr(g, o);
      return O < 0 ? (++this.size, g.push([o, u])) : g[O][1] = u, this;
    }
    Oe.prototype.clear = Es, Oe.prototype.delete = Ns, Oe.prototype.get = Ts, Oe.prototype.has = _s, Oe.prototype.set = Ss;
    function ze(o) {
      var u = -1, g = o == null ? 0 : o.length;
      for (this.clear(); ++u < g; ) {
        var O = o[u];
        this.set(O[0], O[1]);
      }
    }
    function ks() {
      this.size = 0, this.__data__ = {
        hash: new ke(),
        map: new (Yt || Oe)(),
        string: new ke()
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
      var g = et(this, o), O = g.size;
      return g.set(o, u), this.size += g.size == O ? 0 : 1, this;
    }
    ze.prototype.clear = ks, ze.prototype.delete = Cs, ze.prototype.get = Ls, ze.prototype.has = qs, ze.prototype.set = Os;
    function br(o) {
      var u = -1, g = o == null ? 0 : o.length;
      for (this.__data__ = new ze(); ++u < g; )
        this.add(o[u]);
    }
    function Tn(o) {
      return this.__data__.set(o, r), this;
    }
    function yr(o) {
      return this.__data__.has(o);
    }
    br.prototype.add = br.prototype.push = Tn, br.prototype.has = yr;
    function ut(o) {
      var u = this.__data__ = new Oe(o);
      this.size = u.size;
    }
    function Hr() {
      this.__data__ = new Oe(), this.size = 0;
    }
    function Is(o) {
      var u = this.__data__, g = u.delete(o);
      return this.size = u.size, g;
    }
    function Rs(o) {
      return this.__data__.get(o);
    }
    function $s(o) {
      return this.__data__.has(o);
    }
    function Bs(o, u) {
      var g = this.__data__;
      if (g instanceof Oe) {
        var O = g.__data__;
        if (!Yt || O.length < t - 1)
          return O.push([o, u]), this.size = ++g.size, this;
        g = this.__data__ = new ze(O);
      }
      return g.set(o, u), this.size = g.size, this;
    }
    ut.prototype.clear = Hr, ut.prototype.delete = Is, ut.prototype.get = Rs, ut.prototype.has = $s, ut.prototype.set = Bs;
    function Ds(o, u) {
      var g = xr(o), O = !g && Ln(o), ne = !g && !O && wr(o), X = !g && !O && !ne && In(o), he = g || O || ne || X, ue = he ? Lt(o.length, String) : [], Ee = ue.length;
      for (var be in o)
        Ue.call(o, be) && !(he && // Safari 9 has enumerable `arguments.length` in strict mode.
        (be == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        ne && (be == "offset" || be == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        X && (be == "buffer" || be == "byteLength" || be == "byteOffset") || // Skip index properties.
        Vs(be, Ee))) && ue.push(be);
      return ue;
    }
    function vr(o, u) {
      for (var g = o.length; g--; )
        if (Cn(o[g][0], u))
          return g;
      return -1;
    }
    function Vr(o, u, g) {
      var O = u(o);
      return xr(o) ? O : Kt(O, g(o));
    }
    function Xt(o) {
      return o == null ? o === void 0 ? z : I : Je && Je in Object(o) ? wt(o) : kn(o);
    }
    function _n(o) {
      return ht(o) && Xt(o) == l;
    }
    function Sn(o, u, g, O, ne) {
      return o === u ? !0 : o == null || u == null || !ht(o) && !ht(u) ? o !== o && u !== u : Ms(o, u, g, O, Sn, ne);
    }
    function Ms(o, u, g, O, ne, X) {
      var he = xr(o), ue = xr(u), Ee = he ? c : dt(o), be = ue ? c : dt(u);
      Ee = Ee == l ? P : Ee, be = be == l ? P : be;
      var Ie = Ee == P, He = be == P, Ne = Ee == be;
      if (Ne && wr(o)) {
        if (!wr(u))
          return !1;
        he = !0, Ie = !1;
      }
      if (Ne && !Ie)
        return X || (X = new ut()), he || In(o) ? Kr(o, u, g, O, ne, X) : Us(o, u, Ee, g, O, ne, X);
      if (!(g & s)) {
        var Re = Ie && Ue.call(o, "__wrapped__"), Ce = He && Ue.call(u, "__wrapped__");
        if (Re || Ce) {
          var Rt = Re ? o.value() : o, At = Ce ? u.value() : u;
          return X || (X = new ut()), ne(Rt, At, g, O, X);
        }
      }
      return Ne ? (X || (X = new ut()), zs(o, u, g, O, ne, X)) : !1;
    }
    function Fs(o) {
      if (!On(o) || Gs(o))
        return !1;
      var u = qn(o) ? ps : Q;
      return u.test(Fe(o));
    }
    function Ps(o) {
      return ht(o) && Wr(o.length) && !!J[Xt(o)];
    }
    function js(o) {
      if (!Ws(o))
        return Zt(o);
      var u = [];
      for (var g in Object(o))
        Ue.call(o, g) && g != "constructor" && u.push(g);
      return u;
    }
    function Kr(o, u, g, O, ne, X) {
      var he = g & s, ue = o.length, Ee = u.length;
      if (ue != Ee && !(he && Ee > ue))
        return !1;
      var be = X.get(o);
      if (be && X.get(u))
        return be == u;
      var Ie = -1, He = !0, Ne = g & i ? new br() : void 0;
      for (X.set(o, u), X.set(u, o); ++Ie < ue; ) {
        var Re = o[Ie], Ce = u[Ie];
        if (O)
          var Rt = he ? O(Ce, Re, Ie, u, o, X) : O(Re, Ce, Ie, o, u, X);
        if (Rt !== void 0) {
          if (Rt)
            continue;
          He = !1;
          break;
        }
        if (Ne) {
          if (!Gt(u, function(At, Jt) {
            if (!bt(Ne, Jt) && (Re === At || ne(Re, At, g, O, X)))
              return Ne.push(Jt);
          })) {
            He = !1;
            break;
          }
        } else if (!(Re === Ce || ne(Re, Ce, g, O, X))) {
          He = !1;
          break;
        }
      }
      return X.delete(o), X.delete(u), He;
    }
    function Us(o, u, g, O, ne, X, he) {
      switch (g) {
        case q:
          if (o.byteLength != u.byteLength || o.byteOffset != u.byteOffset)
            return !1;
          o = o.buffer, u = u.buffer;
        case f:
          return !(o.byteLength != u.byteLength || !X(new An(o), new An(u)));
        case b:
        case m:
        case L:
          return Cn(+o, +u);
        case h:
          return o.name == u.name && o.message == u.message;
        case G:
        case se:
          return o == u + "";
        case _:
          var ue = E;
        case oe:
          var Ee = O & s;
          if (ue || (ue = B), o.size != u.size && !Ee)
            return !1;
          var be = he.get(o);
          if (be)
            return be == u;
          O |= i, he.set(o, u);
          var Ie = Kr(ue(o), ue(u), O, ne, X, he);
          return he.delete(o), Ie;
        case ye:
          if (zr)
            return zr.call(o) == zr.call(u);
      }
      return !1;
    }
    function zs(o, u, g, O, ne, X) {
      var he = g & s, ue = Qt(o), Ee = ue.length, be = Qt(u), Ie = be.length;
      if (Ee != Ie && !he)
        return !1;
      for (var He = Ee; He--; ) {
        var Ne = ue[He];
        if (!(he ? Ne in u : Ue.call(u, Ne)))
          return !1;
      }
      var Re = X.get(o);
      if (Re && X.get(u))
        return Re == u;
      var Ce = !0;
      X.set(o, u), X.set(u, o);
      for (var Rt = he; ++He < Ee; ) {
        Ne = ue[He];
        var At = o[Ne], Jt = u[Ne];
        if (O)
          var so = he ? O(Jt, At, Ne, u, o, X) : O(At, Jt, Ne, o, u, X);
        if (!(so === void 0 ? At === Jt || ne(At, Jt, g, O, X) : so)) {
          Ce = !1;
          break;
        }
        Rt || (Rt = Ne == "constructor");
      }
      if (Ce && !Rt) {
        var Rn = o.constructor, $n = u.constructor;
        Rn != $n && "constructor" in o && "constructor" in u && !(typeof Rn == "function" && Rn instanceof Rn && typeof $n == "function" && $n instanceof $n) && (Ce = !1);
      }
      return X.delete(o), X.delete(u), Ce;
    }
    function Qt(o) {
      return Vr(o, Zr, Hs);
    }
    function et(o, u) {
      var g = o.__data__;
      return Ks(u) ? g[typeof u == "string" ? "string" : "hash"] : g.map;
    }
    function xt(o, u) {
      var g = S(o, u);
      return Fs(g) ? g : void 0;
    }
    function wt(o) {
      var u = Ue.call(o, Je), g = o[Je];
      try {
        o[Je] = void 0;
        var O = !0;
      } catch {
      }
      var ne = wn.call(o);
      return O && (u ? o[Je] = g : delete o[Je]), ne;
    }
    var Hs = gr ? function(o) {
      return o == null ? [] : (o = Object(o), _e(gr(o), function(u) {
        return mr.call(o, u);
      }));
    } : Ys, dt = Xt;
    (Fr && dt(new Fr(new ArrayBuffer(1))) != q || Yt && dt(new Yt()) != _ || Pr && dt(Pr.resolve()) != U || jr && dt(new jr()) != oe || Ur && dt(new Ur()) != H) && (dt = function(o) {
      var u = Xt(o), g = u == P ? o.constructor : void 0, O = g ? Fe(g) : "";
      if (O)
        switch (O) {
          case En:
            return q;
          case vt:
            return _;
          case ms:
            return U;
          case gs:
            return oe;
          case bs:
            return H;
        }
      return u;
    });
    function Vs(o, u) {
      return u = u ?? a, !!u && (typeof o == "number" || ae.test(o)) && o > -1 && o % 1 == 0 && o < u;
    }
    function Ks(o) {
      var u = typeof o;
      return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? o !== "__proto__" : o === null;
    }
    function Gs(o) {
      return !!We && We in o;
    }
    function Ws(o) {
      var u = o && o.constructor, g = typeof u == "function" && u.prototype || yt;
      return o === g;
    }
    function kn(o) {
      return wn.call(o);
    }
    function Fe(o) {
      if (o != null) {
        try {
          return Ot.call(o);
        } catch {
        }
        try {
          return o + "";
        } catch {
        }
      }
      return "";
    }
    function Cn(o, u) {
      return o === u || o !== o && u !== u;
    }
    var Ln = _n(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? _n : function(o) {
      return ht(o) && Ue.call(o, "callee") && !mr.call(o, "callee");
    }, xr = Array.isArray;
    function Gr(o) {
      return o != null && Wr(o.length) && !qn(o);
    }
    var wr = Mr || Xs;
    function Zs(o, u) {
      return Sn(o, u);
    }
    function qn(o) {
      if (!On(o))
        return !1;
      var u = Xt(o);
      return u == p || u == T || u == d || u == Y;
    }
    function Wr(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= a;
    }
    function On(o) {
      var u = typeof o;
      return o != null && (u == "object" || u == "function");
    }
    function ht(o) {
      return o != null && typeof o == "object";
    }
    var In = Ae ? fr(Ae) : Ps;
    function Zr(o) {
      return Gr(o) ? Ds(o) : js(o);
    }
    function Ys() {
      return [];
    }
    function Xs() {
      return !1;
    }
    n.exports = Zs;
  })(en, en.exports)), en.exports;
}
var Mn = {}, Do;
function Bp() {
  if (Do) return Mn;
  Do = 1, Object.defineProperty(Mn, "__esModule", { value: !0 });
  const n = ul(), e = dl();
  var t;
  return (function(r) {
    function s(c = {}, d = {}, b = !1) {
      typeof c != "object" && (c = {}), typeof d != "object" && (d = {});
      let m = n(d);
      b || (m = Object.keys(m).reduce((h, p) => (m[p] != null && (h[p] = m[p]), h), {}));
      for (const h in c)
        c[h] !== void 0 && d[h] === void 0 && (m[h] = c[h]);
      return Object.keys(m).length > 0 ? m : void 0;
    }
    r.compose = s;
    function i(c = {}, d = {}) {
      typeof c != "object" && (c = {}), typeof d != "object" && (d = {});
      const b = Object.keys(c).concat(Object.keys(d)).reduce((m, h) => (e(c[h], d[h]) || (m[h] = d[h] === void 0 ? null : d[h]), m), {});
      return Object.keys(b).length > 0 ? b : void 0;
    }
    r.diff = i;
    function a(c = {}, d = {}) {
      c = c || {};
      const b = Object.keys(d).reduce((m, h) => (d[h] !== c[h] && c[h] !== void 0 && (m[h] = d[h]), m), {});
      return Object.keys(c).reduce((m, h) => (c[h] !== d[h] && d[h] === void 0 && (m[h] = null), m), b);
    }
    r.invert = a;
    function l(c, d, b = !1) {
      if (typeof c != "object")
        return d;
      if (typeof d != "object")
        return;
      if (!b)
        return d;
      const m = Object.keys(d).reduce((h, p) => (c[p] === void 0 && (h[p] = d[p]), h), {});
      return Object.keys(m).length > 0 ? m : void 0;
    }
    r.transform = l;
  })(t || (t = {})), Mn.default = t, Mn;
}
var Fn = {}, Mo;
function hl() {
  if (Mo) return Fn;
  Mo = 1, Object.defineProperty(Fn, "__esModule", { value: !0 });
  var n;
  return (function(e) {
    function t(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    e.length = t;
  })(n || (n = {})), Fn.default = n, Fn;
}
var Pn = {}, Fo;
function Dp() {
  if (Fo) return Pn;
  Fo = 1, Object.defineProperty(Pn, "__esModule", { value: !0 });
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
  return Pn.default = e, Pn;
}
var Po;
function Mp() {
  return Po || (Po = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = $p(), r = ul(), s = dl(), i = Bp();
    e.AttributeMap = i.default;
    const a = hl();
    e.Op = a.default;
    const l = Dp();
    e.OpIterator = l.default;
    const c = "\0", d = (m, h) => {
      if (typeof m != "object" || m === null)
        throw new Error(`cannot retain a ${typeof m}`);
      if (typeof h != "object" || h === null)
        throw new Error(`cannot retain a ${typeof h}`);
      const p = Object.keys(m)[0];
      if (!p || p !== Object.keys(h)[0])
        throw new Error(`embed types not matched: ${p} != ${Object.keys(h)[0]}`);
      return [p, m[p], h[p]];
    };
    class b {
      constructor(h) {
        Array.isArray(h) ? this.ops = h : h != null && Array.isArray(h.ops) ? this.ops = h.ops : this.ops = [];
      }
      static registerEmbed(h, p) {
        this.handlers[h] = p;
      }
      static unregisterEmbed(h) {
        delete this.handlers[h];
      }
      static getHandler(h) {
        const p = this.handlers[h];
        if (!p)
          throw new Error(`no handlers for embed type "${h}"`);
        return p;
      }
      insert(h, p) {
        const T = {};
        return typeof h == "string" && h.length === 0 ? this : (T.insert = h, p != null && typeof p == "object" && Object.keys(p).length > 0 && (T.attributes = p), this.push(T));
      }
      delete(h) {
        return h <= 0 ? this : this.push({ delete: h });
      }
      retain(h, p) {
        if (typeof h == "number" && h <= 0)
          return this;
        const T = { retain: h };
        return p != null && typeof p == "object" && Object.keys(p).length > 0 && (T.attributes = p), this.push(T);
      }
      push(h) {
        let p = this.ops.length, T = this.ops[p - 1];
        if (h = r(h), typeof T == "object") {
          if (typeof h.delete == "number" && typeof T.delete == "number")
            return this.ops[p - 1] = { delete: T.delete + h.delete }, this;
          if (typeof T.delete == "number" && h.insert != null && (p -= 1, T = this.ops[p - 1], typeof T != "object"))
            return this.ops.unshift(h), this;
          if (s(h.attributes, T.attributes)) {
            if (typeof h.insert == "string" && typeof T.insert == "string")
              return this.ops[p - 1] = { insert: T.insert + h.insert }, typeof h.attributes == "object" && (this.ops[p - 1].attributes = h.attributes), this;
            if (typeof h.retain == "number" && typeof T.retain == "number")
              return this.ops[p - 1] = { retain: T.retain + h.retain }, typeof h.attributes == "object" && (this.ops[p - 1].attributes = h.attributes), this;
          }
        }
        return p === this.ops.length ? this.ops.push(h) : this.ops.splice(p, 0, h), this;
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
        const p = [], T = [];
        return this.forEach((_) => {
          (h(_) ? p : T).push(_);
        }), [p, T];
      }
      reduce(h, p) {
        return this.ops.reduce(h, p);
      }
      changeLength() {
        return this.reduce((h, p) => p.insert ? h + a.default.length(p) : p.delete ? h - p.delete : h, 0);
      }
      length() {
        return this.reduce((h, p) => h + a.default.length(p), 0);
      }
      slice(h = 0, p = 1 / 0) {
        const T = [], _ = new l.default(this.ops);
        let L = 0;
        for (; L < p && _.hasNext(); ) {
          let I;
          L < h ? I = _.next(h - L) : (I = _.next(p - L), T.push(I)), L += a.default.length(I);
        }
        return new b(T);
      }
      compose(h) {
        const p = new l.default(this.ops), T = new l.default(h.ops), _ = [], L = T.peek();
        if (L != null && typeof L.retain == "number" && L.attributes == null) {
          let P = L.retain;
          for (; p.peekType() === "insert" && p.peekLength() <= P; )
            P -= p.peekLength(), _.push(p.next());
          L.retain - P > 0 && T.next(L.retain - P);
        }
        const I = new b(_);
        for (; p.hasNext() || T.hasNext(); )
          if (T.peekType() === "insert")
            I.push(T.next());
          else if (p.peekType() === "delete")
            I.push(p.next());
          else {
            const P = Math.min(p.peekLength(), T.peekLength()), U = p.next(P), Y = T.next(P);
            if (Y.retain) {
              const G = {};
              if (typeof U.retain == "number")
                G.retain = typeof Y.retain == "number" ? P : Y.retain;
              else if (typeof Y.retain == "number")
                U.retain == null ? G.insert = U.insert : G.retain = U.retain;
              else {
                const se = U.retain == null ? "insert" : "retain", [ye, z, H] = d(U[se], Y.retain), f = b.getHandler(ye);
                G[se] = {
                  [ye]: f.compose(z, H, se === "retain")
                };
              }
              const oe = i.default.compose(U.attributes, Y.attributes, typeof U.retain == "number");
              if (oe && (G.attributes = oe), I.push(G), !T.hasNext() && s(I.ops[I.ops.length - 1], G)) {
                const se = new b(p.rest());
                return I.concat(se).chop();
              }
            } else typeof Y.delete == "number" && (typeof U.retain == "number" || typeof U.retain == "object" && U.retain !== null) && I.push(Y);
          }
        return I.chop();
      }
      concat(h) {
        const p = new b(this.ops.slice());
        return h.ops.length > 0 && (p.push(h.ops[0]), p.ops = p.ops.concat(h.ops.slice(1))), p;
      }
      diff(h, p) {
        if (this.ops === h.ops)
          return new b();
        const T = [this, h].map((U) => U.map((Y) => {
          if (Y.insert != null)
            return typeof Y.insert == "string" ? Y.insert : c;
          const G = U === h ? "on" : "with";
          throw new Error("diff() called " + G + " non-document");
        }).join("")), _ = new b(), L = t(T[0], T[1], p, !0), I = new l.default(this.ops), P = new l.default(h.ops);
        return L.forEach((U) => {
          let Y = U[1].length;
          for (; Y > 0; ) {
            let G = 0;
            switch (U[0]) {
              case t.INSERT:
                G = Math.min(P.peekLength(), Y), _.push(P.next(G));
                break;
              case t.DELETE:
                G = Math.min(Y, I.peekLength()), I.next(G), _.delete(G);
                break;
              case t.EQUAL:
                G = Math.min(I.peekLength(), P.peekLength(), Y);
                const oe = I.next(G), se = P.next(G);
                s(oe.insert, se.insert) ? _.retain(G, i.default.diff(oe.attributes, se.attributes)) : _.push(se).delete(G);
                break;
            }
            Y -= G;
          }
        }), _.chop();
      }
      eachLine(h, p = `
`) {
        const T = new l.default(this.ops);
        let _ = new b(), L = 0;
        for (; T.hasNext(); ) {
          if (T.peekType() !== "insert")
            return;
          const I = T.peek(), P = a.default.length(I) - T.peekLength(), U = typeof I.insert == "string" ? I.insert.indexOf(p, P) - P : -1;
          if (U < 0)
            _.push(T.next());
          else if (U > 0)
            _.push(T.next(U));
          else {
            if (h(_, T.next(1).attributes || {}, L) === !1)
              return;
            L += 1, _ = new b();
          }
        }
        _.length() > 0 && h(_, {}, L);
      }
      invert(h) {
        const p = new b();
        return this.reduce((T, _) => {
          if (_.insert)
            p.delete(a.default.length(_));
          else {
            if (typeof _.retain == "number" && _.attributes == null)
              return p.retain(_.retain), T + _.retain;
            if (_.delete || typeof _.retain == "number") {
              const L = _.delete || _.retain;
              return h.slice(T, T + L).forEach((P) => {
                _.delete ? p.push(P) : _.retain && _.attributes && p.retain(a.default.length(P), i.default.invert(_.attributes, P.attributes));
              }), T + L;
            } else if (typeof _.retain == "object" && _.retain !== null) {
              const L = h.slice(T, T + 1), I = new l.default(L.ops).next(), [P, U, Y] = d(_.retain, I.insert), G = b.getHandler(P);
              return p.retain({ [P]: G.invert(U, Y) }, i.default.invert(_.attributes, I.attributes)), T + 1;
            }
          }
          return T;
        }, 0), p.chop();
      }
      transform(h, p = !1) {
        if (p = !!p, typeof h == "number")
          return this.transformPosition(h, p);
        const T = h, _ = new l.default(this.ops), L = new l.default(T.ops), I = new b();
        for (; _.hasNext() || L.hasNext(); )
          if (_.peekType() === "insert" && (p || L.peekType() !== "insert"))
            I.retain(a.default.length(_.next()));
          else if (L.peekType() === "insert")
            I.push(L.next());
          else {
            const P = Math.min(_.peekLength(), L.peekLength()), U = _.next(P), Y = L.next(P);
            if (U.delete)
              continue;
            if (Y.delete)
              I.push(Y);
            else {
              const G = U.retain, oe = Y.retain;
              let se = typeof oe == "object" && oe !== null ? oe : P;
              if (typeof G == "object" && G !== null && typeof oe == "object" && oe !== null) {
                const ye = Object.keys(G)[0];
                if (ye === Object.keys(oe)[0]) {
                  const z = b.getHandler(ye);
                  z && (se = {
                    [ye]: z.transform(G[ye], oe[ye], p)
                  });
                }
              }
              I.retain(se, i.default.transform(U.attributes, Y.attributes, p));
            }
          }
        return I.chop();
      }
      transformPosition(h, p = !1) {
        p = !!p;
        const T = new l.default(this.ops);
        let _ = 0;
        for (; T.hasNext() && _ <= h; ) {
          const L = T.peekLength(), I = T.peekType();
          if (T.next(), I === "delete") {
            h -= Math.min(L, h - _);
            continue;
          } else I === "insert" && (_ < h || !p) && (h += L);
          _ += L;
        }
        return h;
      }
    }
    b.Op = a.default, b.OpIterator = l.default, b.AttributeMap = i.default, b.handlers = {}, e.default = b, n.exports = b, n.exports.default = b;
  })(Dn, Dn.exports)), Dn.exports;
}
var Qe = Mp();
const K = /* @__PURE__ */ cl(Qe);
class ct extends Ge {
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
let at = class extends es {
};
const Fp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function ds(n) {
  return n.replace(/[&<>"']/g, (e) => Fp[e]);
}
class Pe extends Vi {
  static allowedChildren = [Pe, ct, Ge, at];
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
    const r = Pe.order.indexOf(e), s = Pe.order.indexOf(t);
    return r >= 0 || s >= 0 ? r - s : e === t ? 0 : e < t ? -1 : 1;
  }
  formatAt(e, t, r, s) {
    if (Pe.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, W.BLOT)) {
      const i = this.isolate(e, t);
      s && i.wrap(r, s);
    } else
      super.formatAt(e, t, r, s);
  }
  optimize(e) {
    if (super.optimize(e), this.parent instanceof Pe && Pe.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const t = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(t), t.wrap(this);
    }
  }
}
const jo = 1;
class qe extends dn {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = fl(this)), this.cache.delta;
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
qe.blotName = "block";
qe.tagName = "P";
qe.defaultChild = ct;
qe.allowedChildren = [ct, Pe, Ge, at];
class Xe extends Ge {
  attach() {
    super.attach(), this.attributes = new cs(this.domNode);
  }
  delta() {
    return new K().insert(this.value(), {
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
`), i = s.pop(), a = s.map((c) => {
      const d = this.scroll.create(qe.blotName);
      return d.insertAt(0, c), d;
    }), l = this.split(e);
    a.forEach((c) => {
      this.parent.insertBefore(c, l);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), l);
  }
}
Xe.scope = W.BLOCK_BLOT;
function fl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n.descendants(Be).reduce((t, r) => r.length() === 0 ? t : t.insert(r.value(), Ze(r, {}, e)), new K()).insert(`
`, Ze(n));
}
function Ze(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return n == null || ("formats" in n && typeof n.formats == "function" && (e = {
    ...e,
    ...n.formats()
  }, t && delete e["code-token"]), n.parent == null || n.parent.statics.blotName === "scroll" || n.parent.statics.scope !== n.statics.scope) ? e : Ze(n.parent, e, t);
}
class st extends Ge {
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
    for (; r != null && r.statics.scope !== W.BLOCK_BLOT; )
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
      const d = (h, p) => t && h === t.domNode ? p : h === a ? r + p - 1 : s && h === s.domNode ? r + l.length + p : null, b = d(e.start.node, e.start.offset), m = d(e.end.node, e.end.offset);
      if (b !== null && m !== null)
        return {
          startNode: c.domNode,
          startOffset: b,
          endNode: c.domNode,
          endOffset: m
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
    function s(c, d, b) {
      this.fn = c, this.context = d, this.once = b || !1;
    }
    function i(c, d, b, m, h) {
      if (typeof b != "function")
        throw new TypeError("The listener must be a function");
      var p = new s(b, m || c, h), T = t ? t + d : d;
      return c._events[T] ? c._events[T].fn ? c._events[T] = [c._events[T], p] : c._events[T].push(p) : (c._events[T] = p, c._eventsCount++), c;
    }
    function a(c, d) {
      --c._eventsCount === 0 ? c._events = new r() : delete c._events[d];
    }
    function l() {
      this._events = new r(), this._eventsCount = 0;
    }
    l.prototype.eventNames = function() {
      var d = [], b, m;
      if (this._eventsCount === 0) return d;
      for (m in b = this._events)
        e.call(b, m) && d.push(t ? m.slice(1) : m);
      return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(b)) : d;
    }, l.prototype.listeners = function(d) {
      var b = t ? t + d : d, m = this._events[b];
      if (!m) return [];
      if (m.fn) return [m.fn];
      for (var h = 0, p = m.length, T = new Array(p); h < p; h++)
        T[h] = m[h].fn;
      return T;
    }, l.prototype.listenerCount = function(d) {
      var b = t ? t + d : d, m = this._events[b];
      return m ? m.fn ? 1 : m.length : 0;
    }, l.prototype.emit = function(d, b, m, h, p, T) {
      var _ = t ? t + d : d;
      if (!this._events[_]) return !1;
      var L = this._events[_], I = arguments.length, P, U;
      if (L.fn) {
        switch (L.once && this.removeListener(d, L.fn, void 0, !0), I) {
          case 1:
            return L.fn.call(L.context), !0;
          case 2:
            return L.fn.call(L.context, b), !0;
          case 3:
            return L.fn.call(L.context, b, m), !0;
          case 4:
            return L.fn.call(L.context, b, m, h), !0;
          case 5:
            return L.fn.call(L.context, b, m, h, p), !0;
          case 6:
            return L.fn.call(L.context, b, m, h, p, T), !0;
        }
        for (U = 1, P = new Array(I - 1); U < I; U++)
          P[U - 1] = arguments[U];
        L.fn.apply(L.context, P);
      } else {
        var Y = L.length, G;
        for (U = 0; U < Y; U++)
          switch (L[U].once && this.removeListener(d, L[U].fn, void 0, !0), I) {
            case 1:
              L[U].fn.call(L[U].context);
              break;
            case 2:
              L[U].fn.call(L[U].context, b);
              break;
            case 3:
              L[U].fn.call(L[U].context, b, m);
              break;
            case 4:
              L[U].fn.call(L[U].context, b, m, h);
              break;
            default:
              if (!P) for (G = 1, P = new Array(I - 1); G < I; G++)
                P[G - 1] = arguments[G];
              L[U].fn.apply(L[U].context, P);
          }
      }
      return !0;
    }, l.prototype.on = function(d, b, m) {
      return i(this, d, b, m, !1);
    }, l.prototype.once = function(d, b, m) {
      return i(this, d, b, m, !0);
    }, l.prototype.removeListener = function(d, b, m, h) {
      var p = t ? t + d : d;
      if (!this._events[p]) return this;
      if (!b)
        return a(this, p), this;
      var T = this._events[p];
      if (T.fn)
        T.fn === b && (!h || T.once) && (!m || T.context === m) && a(this, p);
      else {
        for (var _ = 0, L = [], I = T.length; _ < I; _++)
          (T[_].fn !== b || h && !T[_].once || m && T[_].context !== m) && L.push(T[_]);
        L.length ? this._events[p] = L.length === 1 ? L[0] : L : a(this, p);
      }
      return this;
    }, l.prototype.removeAllListeners = function(d) {
      var b;
      return d ? (b = t ? t + d : d, this._events[b] && a(this, b)) : (this._events = new r(), this._eventsCount = 0), this;
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
function Ct(n) {
  return ki.reduce((e, t) => (e[t] = pl.bind(console, t, n), e), {});
}
Ct.level = (n) => {
  Ci = n;
};
pl.level = Ct.level;
const si = Ct("quill:events"), zp = ["selectionchange", "mousedown", "mouseup", "click"];
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
class V extends Up {
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
const ii = Ct("quill:selection");
class ir {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class Hp {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new ir(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, V.sources.USER), 1);
    }), this.emitter.on(V.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const r = this.getNativeRange();
      r != null && r.start.node !== this.cursor.textNode && this.emitter.once(V.events.SCROLL_UPDATE, (s, i) => {
        try {
          this.root.contains(r.start.node) && this.root.contains(r.end.node) && this.setNativeRange(r.start.node, r.start.offset, r.end.node, r.end.offset);
          const a = i.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(a ? V.sources.SILENT : s);
        } catch {
        }
      });
    }), this.emitter.on(V.events.SCROLL_OPTIMIZE, (r, s) => {
      if (s.range) {
        const {
          startNode: i,
          startOffset: a,
          endNode: l,
          endOffset: c
        } = s.range;
        this.setNativeRange(i, a, l, c), this.update(V.sources.SILENT);
      }
    }), this.update(V.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(V.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(V.events.COMPOSITION_END, () => {
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
      this.mouseDown = !1, this.update(V.sources.USER);
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
        if (s instanceof Be) {
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
      const [b] = this.scroll.leaf(e + 1);
      if (b) {
        const [m] = this.scroll.line(e), [h] = this.scroll.line(e + 1);
        m === h && (i = b, a = 0);
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
      const [l, c] = a, d = this.scroll.find(l, !0), b = d.offset(this.scroll);
      return c === 0 ? b : d instanceof Be ? b + d.index(l, c) : b + d.length();
    }), s = Math.min(Math.max(...r), this.scroll.length() - 1), i = Math.min(s, ...r);
    return new ir(i, s - i);
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
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : V.sources.API;
    if (typeof t == "string" && (r = t, t = !1), ii.info("setRange", e), e != null) {
      const s = this.rangeToNative(e);
      this.setNativeRange(...s, t);
    } else
      this.setNativeRange(null);
    this.update(r);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : V.sources.USER;
    const t = this.lastRange, [r, s] = this.getRange();
    if (this.lastRange = r, this.lastNative = s, this.lastRange != null && (this.savedRange = this.lastRange), !Hi(t, this.lastRange)) {
      if (!this.composing && s != null && s.native.collapsed && s.start.node !== this.cursor.textNode) {
        const a = this.cursor.restore();
        a && this.setNativeRange(a.startNode, a.startOffset, a.endNode, a.endOffset);
      }
      const i = [V.events.SELECTION_CHANGE, kr(this.lastRange), kr(t), e];
      this.emitter.emit(V.events.EDITOR_CHANGE, ...i), e !== V.sources.SILENT && this.emitter.emit(...i);
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
    const r = zo(e), s = new K();
    return Wp(r.ops.slice()).reduce((a, l) => {
      const c = Qe.Op.length(l);
      let d = l.attributes || {}, b = !1, m = !1;
      if (l.insert != null) {
        if (s.retain(c), typeof l.insert == "string") {
          const T = l.insert;
          m = !T.endsWith(`
`) && (t <= a || !!this.scroll.descendant(Xe, a)[0]), this.scroll.insertAt(a, T);
          const [_, L] = this.scroll.line(a);
          let I = Pt({}, Ze(_));
          if (_ instanceof qe) {
            const [P] = _.descendant(Be, L);
            P && (I = Pt(I, Ze(P)));
          }
          d = Qe.AttributeMap.diff(I, d) || {};
        } else if (typeof l.insert == "object") {
          const T = Object.keys(l.insert)[0];
          if (T == null) return a;
          const _ = this.scroll.query(T, W.INLINE) != null;
          if (_)
            (t <= a || this.scroll.descendant(Xe, a)[0]) && (m = !0);
          else if (a > 0) {
            const [L, I] = this.scroll.descendant(Be, a - 1);
            L instanceof at ? L.value()[I] !== `
` && (b = !0) : L instanceof Ge && L.statics.scope === W.INLINE_BLOT && (b = !0);
          }
          if (this.scroll.insertAt(a, T, l.insert[T]), _) {
            const [L] = this.scroll.descendant(Be, a);
            if (L) {
              const I = Pt({}, Ze(L));
              d = Qe.AttributeMap.diff(I, d) || {};
            }
          }
        }
        t += c;
      } else if (s.push(l), l.retain !== null && typeof l.retain == "object") {
        const T = Object.keys(l.retain)[0];
        if (T == null) return a;
        this.scroll.updateEmbedAt(a, T, l.retain[T]);
      }
      Object.keys(d).forEach((T) => {
        this.scroll.formatAt(a, c, T, d[T]);
      });
      const h = b ? 1 : 0, p = m ? 1 : 0;
      return t += h + p, s.retain(h), s.delete(p), a + c + h + p;
    }, 0), s.reduce((a, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(a, l.delete), a) : a + Qe.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new K().retain(e).delete(t));
  }
  formatLine(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(r).forEach((i) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((a) => {
        a.format(i, r[i]);
      });
    }), this.scroll.optimize();
    const s = new K().retain(e).retain(t, kr(r));
    return this.update(s);
  }
  formatText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((i) => {
      this.scroll.formatAt(e, t, i, r[i]);
    });
    const s = new K().retain(e).retain(t, kr(r));
    return this.update(s);
  }
  getContents(e, t) {
    return this.delta.slice(e, e + t);
  }
  getDelta() {
    return this.scroll.lines().reduce((e, t) => e.concat(t.delta()), new K());
  }
  getFormat(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = [], s = [];
    t === 0 ? this.scroll.path(e).forEach((l) => {
      const [c] = l;
      c instanceof qe ? r.push(c) : c instanceof Be && s.push(c);
    }) : (r = this.scroll.lines(e, t), s = this.scroll.descendants(Be, e, t));
    const [i, a] = [r, s].map((l) => {
      const c = l.shift();
      if (c == null) return {};
      let d = Ze(c);
      for (; Object.keys(d).length > 0; ) {
        const b = l.shift();
        if (b == null) return d;
        d = Gp(Ze(b), d);
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
      return r.length() >= s + t && !(s === 0 && t === i) ? hn(r, s, t, !0) : hn(this.scroll, e, t, !0);
    }
    return "";
  }
  getText(e, t) {
    return this.getContents(e, t).filter((r) => typeof r.insert == "string").map((r) => r.insert).join("");
  }
  insertContents(e, t) {
    const r = zo(t), s = new K().retain(e).concat(r);
    return this.scroll.insertContents(e, r), this.update(s);
  }
  insertEmbed(e, t, r) {
    return this.scroll.insertAt(e, t, r), this.update(new K().retain(e).insert({
      [t]: r
    }));
  }
  insertText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return t = t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(e, t), Object.keys(r).forEach((s) => {
      this.scroll.formatAt(e, t.length, s, r[s]);
    }), this.update(new K().retain(e).insert(t, kr(r)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if (e?.statics.blotName !== qe.blotName) return !1;
    const t = e;
    return t.children.length > 1 ? !1 : t.children.head instanceof ct;
  }
  removeFormat(e, t) {
    const r = this.getText(e, t), [s, i] = this.scroll.line(e + t);
    let a = 0, l = new K();
    s != null && (a = s.length() - i, l = s.delta().slice(i, i + a - 1).insert(`
`));
    const d = this.getContents(e, t + a).diff(new K().insert(r).concat(l)), b = new K().retain(e).concat(d);
    return this.applyDelta(b);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const s = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(Vp) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), a = Ze(i), l = i.offset(this.scroll), c = t[0].oldValue.replace(st.CONTENTS, ""), d = new K().insert(c), b = new K().insert(i.value()), m = r && {
        oldRange: Ho(r.oldRange, -l),
        newRange: Ho(r.newRange, -l)
      };
      e = new K().retain(l).concat(d.diff(b, m)).reduce((p, T) => T.insert ? p.insert(T.insert, a) : p.push(T), new K()), this.delta = s.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !Hi(s.compose(e), this.delta)) && (e = s.diff(this.delta, r));
    return e;
  }
}
function _r(n, e, t) {
  if (n.length === 0) {
    const [p] = ai(t.pop());
    return e <= 0 ? `</li></${p}>` : `</li></${p}>${_r([], e - 1, t)}`;
  }
  const [{
    child: r,
    offset: s,
    length: i,
    indent: a,
    type: l
  }, ...c] = n, [d, b] = ai(l);
  if (a > e)
    return t.push(l), a === e + 1 ? `<${d}><li${b}>${hn(r, s, i)}${_r(c, a, t)}` : `<${d}><li>${_r(n, e + 1, t)}`;
  const m = t[t.length - 1];
  if (a === e && l === m)
    return `</li><li${b}>${hn(r, s, i)}${_r(c, a, t)}`;
  const [h] = ai(t.pop());
  return `</li></${h}>${_r(n, e - 1, t)}`;
}
function hn(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in n && typeof n.html == "function")
    return n.html(e, t);
  if (n instanceof at)
    return ds(n.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (n instanceof ot) {
    if (n.statics.blotName === "list-container") {
      const d = [];
      return n.children.forEachAt(e, t, (b, m, h) => {
        const p = "formats" in b && typeof b.formats == "function" ? b.formats() : {};
        d.push({
          child: b,
          offset: m,
          length: h,
          indent: p.indent || 0,
          type: p.list
        });
      }), _r(d, -1, []);
    }
    const s = [];
    if (n.children.forEachAt(e, t, (d, b, m) => {
      s.push(hn(d, b, m));
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
  }, new K());
}
function Ho(n, e) {
  let {
    index: t,
    length: r
  } = n;
  return new ir(t + e, r);
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
class gt {
  static DEFAULTS = {};
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = e, this.options = t;
  }
}
const jn = "\uFEFF";
class Gi extends Ge {
  constructor(e, t) {
    super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((r) => {
      this.contentNode.appendChild(r);
    }), this.leftGuard = document.createTextNode(jn), this.rightGuard = document.createTextNode(jn), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(e, t) {
    return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
  }
  restore(e) {
    let t = null, r;
    const s = e.data.split(jn).join("");
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
    return e.data = jn, t;
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
    t && !(t instanceof Gi) && (this.emitter.emit(V.events.COMPOSITION_BEFORE_START, e), this.scroll.batchStart(), this.emitter.emit(V.events.COMPOSITION_START, e), this.isComposing = !0);
  }
  handleCompositionEnd(e) {
    this.emitter.emit(V.events.COMPOSITION_BEFORE_END, e), this.scroll.batchEnd(), this.emitter.emit(V.events.COMPOSITION_END, e), this.isComposing = !1;
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
}, Un = (n) => {
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
    } : Xp(s), l = getComputedStyle(s), c = Vo(r.left, r.right, a.left, a.right, Un(l.scrollPaddingLeft), Un(l.scrollPaddingRight)), d = Vo(r.top, r.bottom, a.top, a.bottom, Un(l.scrollPaddingTop), Un(l.scrollPaddingBottom));
    if (c || d)
      if (i)
        t.defaultView?.scrollBy(c, d);
      else {
        const {
          scrollLeft: b,
          scrollTop: m
        } = s;
        d && (s.scrollTop += d), c && (s.scrollLeft += c);
        const h = s.scrollLeft - b, p = s.scrollTop - m;
        r = {
          left: r.left - h,
          top: r.top - p,
          right: r.right - h,
          bottom: r.bottom - p
        };
      }
    s = i || l.position === "fixed" ? null : Yp(s);
  }
}, Jp = 100, em = ["block", "break", "cursor", "inline", "scroll", "text"], tm = (n, e, t) => {
  const r = new Rr();
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
}, Lr = Ct("quill"), zn = new Rr();
ot.uiClass = "ql-ui";
class R {
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
    registry: zn,
    theme: "default"
  };
  static events = V.events;
  static sources = V.sources;
  static version = "2.0.3";
  static imports = {
    delta: K,
    parchment: Rp,
    "core/module": gt,
    "core/theme": Br
  };
  static debug(e) {
    e === !0 && (e = "log"), Ct.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Si.get(e) || zn.find(e, t);
  }
  static import(e) {
    return this.imports[e] == null && Lr.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), r = "attrName" in e ? e.attrName : e.blotName;
      typeof r == "string" ? this.register(`formats/${r}`, e, t) : Object.keys(e).forEach((s) => {
        this.register(s, e[s], t);
      });
    } else {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], r = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[e] != null && !r && Lr.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && zn.register(t), typeof t.register == "function" && t.register(zn);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = rm(e, t), this.container = this.options.container, this.container == null) {
      Lr.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && R.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Si.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new V();
    const s = Ki.blotName, i = this.options.registry.query(s);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${s}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Kp(this.scroll), this.selection = new Hp(this.scroll, this.emitter), this.composition = new Zp(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(V.events.EDITOR_CHANGE, (a) => {
      a === V.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(V.events.SCROLL_UPDATE, (a, l) => {
      const c = this.selection.lastRange, [d] = this.selection.getRange(), b = c && d ? {
        oldRange: c,
        newRange: d
      } : void 0;
      tt.call(this, () => this.editor.update(null, l, b), a);
    }), this.emitter.on(V.events.SCROLL_EMBED_UPDATE, (a, l) => {
      const c = this.selection.lastRange, [d] = this.selection.getRange(), b = c && d ? {
        oldRange: c,
        newRange: d
      } : void 0;
      tt.call(this, () => {
        const m = new K().retain(a.offset(this)).retain({
          [a.statics.blotName]: l
        });
        return this.editor.update(m, [], b);
      }, R.sources.USER);
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
    return [e, t, , r] = Et(e, t, r), tt.call(this, () => this.editor.deleteText(e, t), r, e, -1 * t);
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
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : V.sources.API;
    return tt.call(this, () => {
      const s = this.getSelection(!0);
      let i = new K();
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
      return this.setSelection(s, V.sources.SILENT), i;
    }, r);
  }
  formatLine(e, t, r, s, i) {
    let a;
    return [e, t, a, i] = Et(
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
    return [e, t, a, i] = Et(
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
    return [e, t] = Et(e, t), this.editor.getContents(e, t);
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
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = Et(e, t), this.editor.getHTML(e, t);
  }
  getText() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = Et(e, t), this.editor.getText(e, t);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(e, t, r) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : R.sources.API;
    return tt.call(this, () => this.editor.insertEmbed(e, t, r), s, e);
  }
  insertText(e, t, r, s, i) {
    let a;
    return [e, , a, i] = Et(e, 0, r, s, i), tt.call(this, () => this.editor.insertText(e, t, a), i, e, t.length);
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
    return [e, t, , r] = Et(e, t, r), tt.call(this, () => this.editor.removeFormat(e, t), r, e);
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
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : V.sources.API;
    return tt.call(this, () => {
      e = new K(e);
      const r = this.getLength(), s = this.editor.deleteText(0, r), i = this.editor.insertContents(0, e), a = this.editor.deleteText(this.getLength() - 1, 1);
      return s.compose(i).compose(a);
    }, t);
  }
  setSelection(e, t, r) {
    e == null ? this.selection.setRange(null, t || R.sources.API) : ([e, t, , r] = Et(e, t, r), this.selection.setRange(new ir(Math.max(0, e), t), r), r !== V.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : V.sources.API;
    const r = new K().insert(e);
    return this.setContents(r, t);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : V.sources.USER;
    const t = this.scroll.update(e);
    return this.selection.update(e), t;
  }
  updateContents(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : V.sources.API;
    return tt.call(this, () => (e = new K(e), this.editor.applyDelta(e)), t, !0);
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
  const s = !e.theme || e.theme === R.DEFAULTS.theme ? Br : R.import(`themes/${e.theme}`);
  if (!s)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: i,
    ...a
  } = R.DEFAULTS, {
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
  const b = Pt({}, li(i), li(l), d), m = {
    ...a,
    ...Go(c),
    ...Go(e)
  };
  let h = e.registry;
  return h ? e.formats && Lr.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? tm(e.formats, m.registry, Lr) : m.registry, {
    ...m,
    registry: h,
    container: t,
    theme: s,
    modules: Object.entries(b).reduce((p, T) => {
      let [_, L] = T;
      if (!L) return p;
      const I = R.import(`modules/${_}`);
      return I == null ? (Lr.error(`Cannot load ${_} module. Are you sure you registered it?`), p) : {
        ...p,
        // @ts-expect-error
        [_]: Pt({}, I.DEFAULTS || {}, L)
      };
    }, {}),
    bounds: Ko(m.bounds)
  };
}
function tt(n, e, t, r) {
  if (!this.isEnabled() && e === V.sources.USER && !this.allowReadOnlyEdits)
    return new K();
  let s = t == null ? null : this.getSelection();
  const i = this.editor.delta, a = n();
  if (s != null && (t === !0 && (t = s.index), r == null ? s = Wo(s, a, e) : r !== 0 && (s = Wo(s, t, r, e)), this.setSelection(s, V.sources.SILENT)), a.length() > 0) {
    const l = [V.events.TEXT_CHANGE, a, i, e];
    this.emitter.emit(V.events.EDITOR_CHANGE, ...l), e !== V.sources.SILENT && this.emitter.emit(...l);
  }
  return a;
}
function Et(n, e, t, r, s) {
  let i = {};
  return typeof n.index == "number" && typeof n.length == "number" ? typeof e != "number" ? (s = r, r = t, t = e, e = n.length, n = n.index) : (e = n.length, n = n.index) : typeof e != "number" && (s = r, r = t, t = e, e = 0), typeof t == "object" ? (i = t, s = r) : typeof t == "string" && (r != null ? i[t] = r : s = t), s = s || V.sources.API, [n, e, i, s];
}
function Wo(n, e, t, r) {
  const s = typeof t == "number" ? t : 0;
  if (n == null) return null;
  let i, a;
  return e && typeof e.transformPosition == "function" ? [i, a] = [n.index, n.index + n.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(l, r !== V.sources.USER)
  )) : [i, a] = [n.index, n.index + n.length].map((l) => l < e || l === e && r === V.sources.USER ? l : s >= 0 ? l + s : Math.max(e, l + s)), new ir(i, a - i);
}
class ur extends us {
}
function Zo(n) {
  return n instanceof qe || n instanceof Xe;
}
function Yo(n) {
  return typeof n.updateContent == "function";
}
class nm extends Ki {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = qe;
  static allowedChildren = [qe, Xe, ur];
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
    this.emitter.emit(V.events.SCROLL_BLOT_MOUNT, e);
  }
  emitUnmount(e) {
    this.emitter.emit(V.events.SCROLL_BLOT_UNMOUNT, e);
  }
  emitEmbedUpdate(e, t) {
    this.emitter.emit(V.events.SCROLL_EMBED_UPDATE, e, t);
  }
  deleteAt(e, t) {
    const [r, s] = this.line(e), [i] = this.line(e + t);
    if (super.deleteAt(e, t), i != null && r !== i && s > 0) {
      if (r instanceof Xe || i instanceof Xe) {
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
    const r = this.deltaToRenderBlocks(t.concat(new K().insert(`
`))), s = r.pop();
    if (s == null) return;
    this.batchStart();
    const i = r.shift();
    if (i) {
      const c = i.type === "block" && (i.delta.length() === 0 || !this.descendant(Xe, e)[0] && e < this.length()), d = i.type === "block" ? i.delta : new K().insert({
        [i.key]: i.value
      });
      ci(this, e, d);
      const b = i.type === "block" ? 1 : 0, m = e + d.length() + b;
      c && this.insertAt(m - 1, `
`);
      const h = Ze(this.line(e)[0]), p = Qe.AttributeMap.diff(h, i.attributes) || {};
      Object.keys(p).forEach((T) => {
        this.formatAt(m - 1, 1, T, p[T]);
      }), e = m;
    }
    let [a, l] = this.children.find(e);
    if (r.length && (a && (a = a.split(l), l = 0), r.forEach((c) => {
      if (c.type === "block") {
        const d = this.createBlock(c.attributes, a || void 0);
        ci(d, 0, c.delta);
      } else {
        const d = this.create(c.key, c.value);
        this.insertBefore(d, a || void 0), Object.keys(c.attributes).forEach((b) => {
          d.format(b, c.attributes[b]);
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
    return r instanceof Be ? [r, s] : [null, -1];
  }
  line(e) {
    return e === this.length() ? this.line(e - 1) : this.descendant(Zo, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (s, i, a) => {
      let l = [], c = a;
      return s.children.forEachAt(i, a, (d, b, m) => {
        Zo(d) ? l.push(d) : d instanceof us && (l = l.concat(r(d, b, c))), c -= m;
      }), l;
    };
    return r(this, e, t);
  }
  optimize() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(e, t), e.length > 0 && this.emitter.emit(V.events.SCROLL_OPTIMIZE, e, t));
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
    let t = V.sources.USER;
    typeof e == "string" && (t = e), Array.isArray(e) || (e = this.observer.takeRecords()), e = e.filter((r) => {
      let {
        target: s
      } = r;
      const i = this.find(s, !0);
      return i && !Yo(i);
    }), e.length > 0 && this.emitter.emit(V.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(V.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, r) {
    const [s] = this.descendant((i) => i instanceof Xe, e);
    s && s.statics.blotName === t && Yo(s) && s.updateContent(r);
  }
  handleDragStart(e) {
    e.preventDefault();
  }
  deltaToRenderBlocks(e) {
    const t = [];
    let r = new K();
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
            }), r = new K();
          });
          const l = a[a.length - 1];
          l && r.insert(l, s.attributes);
        } else {
          const a = Object.keys(i)[0];
          if (!a) return;
          this.query(a, W.INLINE) ? r.push(s) : (r.length() && t.push({
            type: "block",
            delta: r,
            attributes: {}
          }), r = new K(), t.push({
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
      this.query(c, W.BLOCK & W.BLOT) != null ? r = c : s[c] = d;
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
    const i = Qe.Op.length(s);
    let a = s.attributes || {};
    if (s.insert != null) {
      if (typeof s.insert == "string") {
        const l = s.insert;
        n.insertAt(r, l);
        const [c] = n.descendant(Be, r), d = Ze(c);
        a = Qe.AttributeMap.diff(d, a) || {};
      } else if (typeof s.insert == "object") {
        const l = Object.keys(s.insert)[0];
        if (l == null) return r;
        if (n.insertAt(r, l, s.insert[l]), n.scroll.query(l, W.INLINE) != null) {
          const [d] = n.descendant(Be, r), b = Ze(d);
          a = Qe.AttributeMap.diff(b, a) || {};
        }
      }
    }
    return Object.keys(a).forEach((l) => {
      n.formatAt(r, i, l, a[l]);
    }), r + i;
  }, e);
}
const Wi = {
  scope: W.BLOCK,
  whitelist: ["right", "center", "justify"]
}, sm = new pt("align", "align", Wi), ml = new lt("align", "ql-align", Wi), gl = new Vt("align", "text-align", Wi);
class bl extends Vt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((s) => `00${parseInt(s, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const im = new lt("color", "ql-color", {
  scope: W.INLINE
}), Zi = new bl("color", "color", {
  scope: W.INLINE
}), om = new lt("background", "ql-bg", {
  scope: W.INLINE
}), Yi = new bl("background", "background-color", {
  scope: W.INLINE
});
class dr extends ur {
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
${ds(this.code(e, t))}
</pre>`;
  }
}
class je extends qe {
  static TAB = "  ";
  static register() {
    R.register(dr);
  }
}
class Xi extends Pe {
}
Xi.blotName = "code";
Xi.tagName = "CODE";
je.blotName = "code-block";
je.className = "ql-code-block";
je.tagName = "DIV";
dr.blotName = "code-block-container";
dr.className = "ql-code-block-container";
dr.tagName = "DIV";
dr.allowedChildren = [je];
je.allowedChildren = [at, ct, st];
je.requiredContainer = dr;
const Qi = {
  scope: W.BLOCK,
  whitelist: ["rtl"]
}, yl = new pt("direction", "dir", Qi), vl = new lt("direction", "ql-direction", Qi), xl = new Vt("direction", "direction", Qi), wl = {
  scope: W.INLINE,
  whitelist: ["serif", "monospace"]
}, Al = new lt("font", "ql-font", wl);
class am extends Vt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const El = new am("font", "font-family", wl), Nl = new lt("size", "ql-size", {
  scope: W.INLINE,
  whitelist: ["small", "large", "huge"]
}), Tl = new Vt("size", "font-size", {
  scope: W.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), lm = Ct("quill:keyboard"), cm = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class hs extends gt {
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
      const s = (this.bindings[e.key] || []).concat(this.bindings[e.which] || []).filter((I) => hs.match(e, I));
      if (s.length === 0) return;
      const i = R.find(e.target, !0);
      if (i && i.scroll !== this.quill.scroll) return;
      const a = this.quill.getSelection();
      if (a == null || !this.quill.hasFocus()) return;
      const [l, c] = this.quill.getLine(a.index), [d, b] = this.quill.getLeaf(a.index), [m, h] = a.length === 0 ? [d, b] : this.quill.getLeaf(a.index + a.length), p = d instanceof es ? d.value().slice(0, b) : "", T = m instanceof es ? m.value().slice(h) : "", _ = {
        collapsed: a.length === 0,
        // @ts-expect-error Fix me later
        empty: a.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(a),
        line: l,
        offset: c,
        prefix: p,
        suffix: T,
        event: e
      };
      s.some((I) => {
        if (I.collapsed != null && I.collapsed !== _.collapsed || I.empty != null && I.empty !== _.empty || I.offset != null && I.offset !== _.offset)
          return !1;
        if (Array.isArray(I.format)) {
          if (I.format.every((P) => _.format[P] == null))
            return !1;
        } else if (typeof I.format == "object" && !Object.keys(I.format).every((P) => I.format[P] === !0 ? _.format[P] != null : I.format[P] === !1 ? _.format[P] == null : Hi(I.format[P], _.format[P])))
          return !1;
        return I.prefix != null && !I.prefix.test(_.prefix) || I.suffix != null && !I.suffix.test(_.suffix) ? !1 : I.handler.call(this, a, _, I) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let a = new K().retain(e.index - r).delete(r);
    if (t.offset === 0) {
      const [l] = this.quill.getLine(e.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const d = i.formats(), b = this.quill.getFormat(e.index - 1, 1);
        if (s = Qe.AttributeMap.diff(d, b) || {}, Object.keys(s).length > 0) {
          const m = new K().retain(e.index + i.length() - 2).retain(1, s);
          a = a.compose(m);
        }
      }
    }
    this.quill.updateContents(a, R.sources.USER), this.quill.focus();
  }
  handleDelete(e, t) {
    const r = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
    if (e.index >= this.quill.getLength() - r) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let a = new K().retain(e.index).delete(r);
    if (t.offset >= i.length() - 1) {
      const [l] = this.quill.getLine(e.index + 1);
      if (l) {
        const c = i.formats(), d = this.quill.getFormat(e.index, 1);
        s = Qe.AttributeMap.diff(c, d) || {}, Object.keys(s).length > 0 && (a = a.retain(l.length() - 1).retain(1, s));
      }
    }
    this.quill.updateContents(a, R.sources.USER), this.quill.focus();
  }
  handleDeleteRange(e) {
    Ji({
      range: e,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(e, t) {
    const r = Object.keys(t.format).reduce((i, a) => (this.quill.scroll.query(a, W.BLOCK) && !Array.isArray(t.format[a]) && (i[a] = t.format[a]), i), {}), s = new K().retain(e.index).delete(e.length).insert(`
`, r);
    this.quill.updateContents(s, R.sources.USER), this.quill.setSelection(e.index + 1, R.sources.SILENT), this.quill.focus();
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
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "+1", R.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(n, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "-1", R.sources.USER), !1);
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
        e.format.indent != null ? this.quill.format("indent", "-1", R.sources.USER) : e.format.list != null && this.quill.format("list", !1, R.sources.USER);
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
        this.quill.deleteText(n.index - 1, 1, R.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(n, e) {
        if (e.format.table) return !0;
        this.quill.history.cutoff();
        const t = new K().retain(n.index).delete(n.length).insert("	");
        return this.quill.updateContents(t, R.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index + 1, R.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, R.sources.USER);
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
        e.format.indent && (t.indent = !1), this.quill.formatLine(n.index, n.length, t, R.sources.USER);
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
        }, s = new K().retain(n.index).insert(`
`, r).retain(e.length() - t - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(s, R.sources.USER), this.quill.setSelection(n.index + 1, R.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(n, e) {
        const [t, r] = this.quill.getLine(n.index), s = new K().retain(n.index).insert(`
`, e.format).retain(t.length() - r - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(s, R.sources.USER), this.quill.setSelection(n.index + 1, R.sources.SILENT), this.quill.scrollSelectionIntoView();
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
            const c = new K().retain(l).insert(`
`);
            this.quill.updateContents(c, R.sources.USER), this.quill.setSelection(n.index + 1, n.length, R.sources.SILENT);
          } else if (a > 0) {
            l += t.length();
            const c = new K().retain(l).insert(`
`);
            this.quill.updateContents(c, R.sources.USER), this.quill.setSelection(l, R.sources.USER);
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
        t.shiftKey ? this.quill.setSelection(s - 1, R.sources.USER) : this.quill.setSelection(s + r.length(), R.sources.USER);
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
        this.quill.insertText(n.index, " ", R.sources.USER), this.quill.history.cutoff();
        const a = new K().retain(n.index - s).delete(t + 1).retain(r.length() - 2 - s).retain(1, {
          list: i
        });
        return this.quill.updateContents(a, R.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index - t, R.sources.SILENT), !1;
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
            const i = new K().retain(n.index + e.length() - t - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(i, R.sources.USER), this.quill.setSelection(n.index - 1, R.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": Hn("ArrowLeft", !1),
    "embed left shift": Hn("ArrowLeft", !0),
    "embed right": Hn("ArrowRight", !1),
    "embed right shift": Hn("ArrowRight", !0),
    "table down": Qo(!1),
    "table up": Qo(!0)
  }
};
hs.DEFAULTS = um;
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
        this.quill.insertText(e.index, i, R.sources.USER), this.quill.setSelection(e.index + i.length, R.sources.SILENT);
        return;
      }
      const a = e.length === 0 ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
      let {
        index: l,
        length: c
      } = e;
      a.forEach((d, b) => {
        n ? (d.insertAt(0, i), b === 0 ? l += i.length : c += i.length) : d.domNode.textContent.startsWith(i) && (d.deleteAt(0, i.length), b === 0 ? l -= i.length : c -= i.length);
      }), this.quill.update(R.sources.USER), this.quill.setSelection(l, c, R.sources.SILENT);
    }
  };
}
function Hn(n, e) {
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
      return i instanceof Ge ? (n === "ArrowLeft" ? e ? this.quill.setSelection(r.index - 1, r.length + 1, R.sources.USER) : this.quill.setSelection(r.index - 1, R.sources.USER) : e ? this.quill.setSelection(r.index, r.length + 1, R.sources.USER) : this.quill.setSelection(r.index + r.length + 1, R.sources.USER), !1) : !0;
    }
  };
}
function ui(n) {
  return {
    key: n[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(n, !t.format[n], R.sources.USER);
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
          this.quill.setSelection(c, 0, R.sources.USER);
        }
      } else {
        const a = s.table()[r];
        a != null && (n ? this.quill.setSelection(a.offset(this.quill.scroll) + a.length() - 1, 0, R.sources.USER) : this.quill.setSelection(a.offset(this.quill.scroll), 0, R.sources.USER));
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
    n = kr(n);
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
    s = Qe.AttributeMap.diff(a, i) || {};
  }
  e.deleteText(t, R.sources.USER), Object.keys(s).length > 0 && e.formatLine(t.index, 1, s, R.sources.USER), e.setSelection(t.index, R.sources.SILENT);
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
    a.forEach((m) => {
      const h = document.createElement("li");
      h.setAttribute("data-list", m.type), m.indent > 1 && h.setAttribute("class", `ql-indent-${m.indent - 1}`), h.innerHTML = m.element.innerHTML, c.appendChild(h);
    });
    const d = a[0]?.element, {
      parentNode: b
    } = d ?? {};
    d && b?.replaceChild(c, d), a.slice(1).forEach((m) => {
      let {
        element: h
      } = m;
      b?.removeChild(h);
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
}, _m = Ct("quill:clipboard"), Sm = [[Node.TEXT_NODE, Pm], [Node.TEXT_NODE, ta], ["br", Im], [Node.ELEMENT_NODE, ta], [Node.ELEMENT_NODE, Om], [Node.ELEMENT_NODE, qm], [Node.ELEMENT_NODE, Mm], ["li", Bm], ["ol, ul", Dm], ["pre", Rm], ["tr", Fm], ["b", di("bold")], ["i", di("italic")], ["strike", di("strike")], ["style", $m]], km = [sm, yl].reduce((n, e) => (n[e.keyName] = e, n), {}), ea = [gl, Yi, Zi, xl, El, Tl].reduce((n, e) => (n[e.keyName] = e, n), {});
class Cm extends gt {
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
    if (s[je.blotName])
      return new K().insert(r || "", {
        [je.blotName]: s[je.blotName]
      });
    if (!t)
      return new K().insert(r || "", s);
    const i = this.convertHTML(t);
    return bn(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || s.table) ? i.compose(new K().retain(i.length() - 1).delete(1)) : i;
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
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : R.sources.API;
    if (typeof e == "string") {
      const s = this.convert({
        html: e,
        text: ""
      });
      this.quill.setContents(s, t), this.quill.setSelection(0, R.sources.SILENT);
    } else {
      const s = this.convert({
        html: t,
        text: ""
      });
      this.quill.updateContents(new K().retain(e).concat(s), r), this.quill.setSelection(e + s.length(), R.sources.SILENT);
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
    const l = new K().retain(e.index).delete(e.length).concat(a);
    this.quill.updateContents(l, R.sources.USER), this.quill.setSelection(l.length() - e.length, R.sources.SILENT), this.quill.scrollSelectionIntoView();
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
function hr(n, e, t, r) {
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
  }, new K()) : n;
}
function bn(n, e) {
  let t = "";
  for (let r = n.ops.length - 1; r >= 0 && t.length < e.length; --r) {
    const s = n.ops[r];
    if (typeof s.insert != "string") break;
    t = s.insert + t;
  }
  return t.slice(-1 * e.length) === e;
}
function Ft(n, e) {
  if (!(n instanceof Element)) return !1;
  const t = e.query(n);
  return t && t.prototype instanceof Ge ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(n.tagName.toLowerCase());
}
function Lm(n, e) {
  return n.previousElementSibling && n.nextElementSibling && !Ft(n.previousElementSibling, e) && !Ft(n.nextElementSibling, e);
}
const Vn = /* @__PURE__ */ new WeakMap();
function _l(n) {
  return n == null ? !1 : (Vn.has(n) || (n.tagName === "PRE" ? Vn.set(n, !0) : Vn.set(n, _l(n.parentNode))), Vn.get(n));
}
function eo(n, e, t, r, s) {
  return e.nodeType === e.TEXT_NODE ? r.reduce((i, a) => a(e, i, n), new K()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, a) => {
    let l = eo(n, a, t, r, s);
    return a.nodeType === e.ELEMENT_NODE && (l = t.reduce((c, d) => d(a, c, n), l), l = (s.get(a) || []).reduce((c, d) => d(a, c, n), l)), i.concat(l);
  }, new K()) : new K();
}
function di(n) {
  return (e, t, r) => hr(t, n, !0, r);
}
function qm(n, e, t) {
  const r = pt.keys(n), s = lt.keys(n), i = Vt.keys(n), a = {};
  return r.concat(s).concat(i).forEach((l) => {
    let c = t.query(l, W.ATTRIBUTE);
    c != null && (a[c.attrName] = c.value(n), a[c.attrName]) || (c = km[l], c != null && (c.attrName === l || c.keyName === l) && (a[c.attrName] = c.value(n) || void 0), c = ea[l], c != null && (c.attrName === l || c.keyName === l) && (c = ea[l], a[c.attrName] = c.value(n) || void 0));
  }), Object.entries(a).reduce((l, c) => {
    let [d, b] = c;
    return hr(l, d, b, t);
  }, e);
}
function Om(n, e, t) {
  const r = t.query(n);
  if (r == null) return e;
  if (r.prototype instanceof Ge) {
    const s = {}, i = r.value(n);
    if (i != null)
      return s[r.blotName] = i, new K().insert(s, r.formats(n, t));
  } else if (r.prototype instanceof dn && !bn(e, `
`) && e.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return hr(e, r.blotName, r.formats(n, t), t);
  return e;
}
function Im(n, e) {
  return bn(e, `
`) || e.insert(`
`), e;
}
function Rm(n, e, t) {
  const r = t.query("code-block"), s = r && "formats" in r && typeof r.formats == "function" ? r.formats(n, t) : !0;
  return hr(e, "code-block", s, t);
}
function $m() {
  return new K();
}
function Bm(n, e, t) {
  const r = t.query(n);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !bn(e, `
`))
    return e;
  let s = -1, i = n.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (s += 1), i = i.parentNode;
  return s <= 0 ? e : e.reduce((a, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? a.push(l) : a.insert(l.insert, {
    indent: s,
    ...l.attributes || {}
  }) : a, new K());
}
function Dm(n, e, t) {
  const r = n;
  let s = r.tagName === "OL" ? "ordered" : "bullet";
  const i = r.getAttribute("data-checked");
  return i && (s = i === "true" ? "checked" : "unchecked"), hr(e, "list", s, t);
}
function ta(n, e, t) {
  if (!bn(e, `
`)) {
    if (Ft(n, t) && (n.childNodes.length > 0 || n instanceof HTMLParagraphElement))
      return e.insert(`
`);
    if (e.length() > 0 && n.nextSibling) {
      let r = n.nextSibling;
      for (; r != null; ) {
        if (Ft(r, t))
          return e.insert(`
`);
        const s = t.query(r);
        if (s && s.prototype instanceof Xe)
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
    return hr(i, l, c, t);
  }, e), parseFloat(s.textIndent || 0) > 0 ? new K().insert("	").concat(e) : e;
}
function Fm(n, e, t) {
  const r = n.parentElement?.tagName === "TABLE" ? n.parentElement : n.parentElement?.parentElement;
  if (r != null) {
    const i = Array.from(r.querySelectorAll("tr")).indexOf(n) + 1;
    return hr(e, "table", i, t);
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
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (n.previousSibling == null && n.parentElement != null && Ft(n.parentElement, t) || n.previousSibling instanceof Element && Ft(n.previousSibling, t)) && (r = r.replace(/^ /, "")), (n.nextSibling == null && n.parentElement != null && Ft(n.parentElement, t) || n.nextSibling instanceof Element && Ft(n.nextSibling, t)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return e.insert(r);
}
class jm extends gt {
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
    super(e, t), this.quill.on(R.events.EDITOR_CHANGE, (r, s, i, a) => {
      r === R.events.SELECTION_CHANGE ? s && a !== R.sources.SILENT && (this.currentRange = s) : r === R.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || a === R.sources.USER ? this.record(s, i) : this.transform(s)), this.currentRange = Li(this.currentRange, s));
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
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(r.delta, R.sources.USER), this.ignoreChange = !1, this.restoreSelection(r);
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
      this.quill.setSelection(e.range, R.sources.USER);
    else {
      const t = zm(this.quill.scroll, e.delta);
      this.quill.setSelection(t, R.sources.USER);
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
`) : t.attributes != null ? Object.keys(t.attributes).some((r) => n.query(r, W.BLOCK) != null) : !1;
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
class Sl extends gt {
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
      }), new K().retain(n.index).delete(n.length));
      this.quill.updateContents(s, V.sources.USER), this.quill.setSelection(n.index + r.length, V.sources.SILENT);
    });
  }
};
const Hm = ["insertText", "insertReplacementText"];
class Vm extends gt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("beforeinput", (r) => {
      this.handleBeforeInput(r);
    }), /Android/i.test(navigator.userAgent) || e.on(R.events.COMPOSITION_BEFORE_START, () => {
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
      this.deleteRange(e), this.quill.updateContents(new K().retain(e.index).insert(t, r), R.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, R.sources.SILENT), !0;
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
class Ym extends gt {
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
        return i && s.key !== "ArrowRight" || !i && s.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (s.shiftKey ? 1 : 0), R.sources.USER), !1);
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
R.register({
  "blots/block": qe,
  "blots/block/embed": Xe,
  "blots/break": ct,
  "blots/container": ur,
  "blots/cursor": st,
  "blots/embed": Gi,
  "blots/inline": Pe,
  "blots/scroll": nm,
  "blots/text": at,
  "modules/clipboard": Cm,
  "modules/history": jm,
  "modules/keyboard": hs,
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
  scope: W.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Jm extends qe {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class eg extends qe {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
class yn extends ur {
}
yn.blotName = "list-container";
yn.tagName = "OL";
class vn extends qe {
  static create(e) {
    const t = super.create();
    return t.setAttribute("data-list", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-list") || void 0;
  }
  static register() {
    R.register(yn);
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
vn.blotName = "list";
vn.tagName = "LI";
yn.allowedChildren = [vn];
vn.requiredContainer = yn;
class to extends Pe {
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
class ts extends Pe {
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
class rg extends Pe {
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
class sg extends Pe {
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
let og = class extends Ge {
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
class ag extends Xe {
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
    return ts.sanitize(e);
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
const tn = new lt("code-token", "hljs", {
  scope: W.INLINE
});
class _t extends Pe {
  static formats(e, t) {
    for (; e != null && e !== t.domNode; ) {
      if (e.classList && e.classList.contains(je.className))
        return super.formats(e, t);
      e = e.parentNode;
    }
  }
  constructor(e, t, r) {
    super(e, t, r), tn.add(this.domNode, r);
  }
  format(e, t) {
    e !== _t.blotName ? super.format(e, t) : t ? tn.add(this.domNode, t) : (tn.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), tn.value(this.domNode) || this.unwrap();
  }
}
_t.blotName = "code-token";
_t.className = "ql-token";
class Ye extends je {
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
    return this.formatAt(0, this.length(), _t.blotName, !1), super.replaceWith(e, t);
  }
}
class on extends dr {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(e, t) {
    e === Ye.blotName && (this.forceNext = !0, this.children.forEach((r) => {
      r.format(e, t);
    }));
  }
  formatAt(e, t, r, s) {
    r === Ye.blotName && (this.forceNext = !0), super.formatAt(e, t, r, s);
  }
  highlight(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const s = `${Array.from(this.domNode.childNodes).filter((a) => a !== this.uiNode).map((a) => a.textContent).join(`
`)}
`, i = Ye.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== s) {
      if (s.trim().length > 0 || this.cachedText == null) {
        const a = this.children.reduce((c, d) => c.concat(fl(d, !1)), new K()), l = e(s, i);
        a.diff(l).reduce((c, d) => {
          let {
            retain: b,
            attributes: m
          } = d;
          return b ? (m && Object.keys(m).forEach((h) => {
            [Ye.blotName, _t.blotName].includes(h) && this.formatAt(c, b, h, m[h]);
          }), c + b) : c;
        }, 0);
      }
      this.cachedText = s, this.forceNext = !1;
    }
  }
  html(e, t) {
    const [r] = this.children.find(e);
    return `<pre data-language="${r ? Ye.formats(r.domNode) : "plain"}">
${ds(this.code(e, t))}
</pre>`;
  }
  optimize(e) {
    if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
      const t = Ye.formats(this.children.head.domNode);
      t !== this.uiNode.value && (this.uiNode.value = t);
    }
  }
}
on.allowedChildren = [Ye];
Ye.requiredContainer = on;
Ye.allowedChildren = [_t, st, at, ct];
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
class Cl extends gt {
  static register() {
    R.register(_t, !0), R.register(Ye, !0), R.register(on, !0);
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
    this.quill.on(R.events.SCROLL_BLOT_MOUNT, (e) => {
      if (!(e instanceof on)) return;
      const t = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((r) => {
        let {
          key: s,
          label: i
        } = r;
        const a = t.ownerDocument.createElement("option");
        a.textContent = i, a.setAttribute("value", s), t.appendChild(a);
      }), t.addEventListener("change", () => {
        e.format(Ye.blotName, t.value), this.quill.root.focus(), this.highlight(e, !0);
      }), e.uiNode == null && (e.attachUI(t), e.children.head && (t.value = Ye.formats(e.children.head.domNode)));
    });
  }
  initTimer() {
    let e = null;
    this.quill.on(R.events.SCROLL_OPTIMIZE, () => {
      e && clearTimeout(e), e = setTimeout(() => {
        this.highlight(), e = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(R.sources.USER);
    const r = this.quill.getSelection();
    (e == null ? this.quill.scroll.descendants(on) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update(R.sources.SILENT), r != null && this.quill.setSelection(r, R.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return ds(e).split(`
`).reduce((s, i, a) => (a !== 0 && s.insert(`
`, {
        [je.blotName]: t
      }), s.insert(i)), new K());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(je.className), r.innerHTML = lg(this.options.hljs, t, e), eo(this.quill.scroll, r, [(s, i) => {
      const a = tn.value(s);
      return a ? i.compose(new K().retain(i.length(), {
        [_t.blotName]: a
      })) : i;
    }], [(s, i) => s.data.split(`
`).reduce((a, l, c) => (c !== 0 && a.insert(`
`, {
      [je.blotName]: t
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
class it extends qe {
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
class or extends ur {
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
class jt extends ur {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class rs extends ur {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const e = this.descendants(or), t = e.reduce((r, s) => Math.max(s.children.length, r), 0);
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
    const [t] = this.descendant(jt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e);
      s?.remove();
    });
  }
  insertColumn(e) {
    const [t] = this.descendant(jt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e), i = it.formats(r.children.head.domNode), a = this.scroll.create(it.blotName, i);
      r.insertBefore(a, s);
    });
  }
  insertRow(e) {
    const [t] = this.descendant(jt);
    if (t == null || t.children.head == null) return;
    const r = ro(), s = this.scroll.create(or.blotName);
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
rs.allowedChildren = [jt];
jt.requiredContainer = rs;
jt.allowedChildren = [or];
or.requiredContainer = jt;
or.allowedChildren = [it];
it.requiredContainer = or;
function ro() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class cg extends gt {
  static register() {
    R.register(it), R.register(or), R.register(jt), R.register(rs);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(rs).forEach((e) => {
      e.balanceCells();
    });
  }
  deleteColumn() {
    const [e, , t] = this.getTable();
    t != null && (e.deleteColumn(t.cellOffset()), this.quill.update(R.sources.USER));
  }
  deleteRow() {
    const [, e] = this.getTable();
    e != null && (e.remove(), this.quill.update(R.sources.USER));
  }
  deleteTable() {
    const [e] = this.getTable();
    if (e == null) return;
    const t = e.offset();
    e.remove(), this.quill.update(R.sources.USER), this.quill.setSelection(t, R.sources.SILENT);
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
    r.insertColumn(a + e), this.quill.update(R.sources.USER);
    let l = s.rowOffset();
    e === 0 && (l += 1), this.quill.setSelection(t.index + l, t.length, R.sources.SILENT);
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
    r.insertRow(a + e), this.quill.update(R.sources.USER), e > 0 ? this.quill.setSelection(t, R.sources.SILENT) : this.quill.setSelection(t.index + s.children.length, t.length, R.sources.SILENT);
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
    }, new K().retain(r.index));
    this.quill.updateContents(s, R.sources.USER), this.quill.setSelection(r.index, R.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(R.events.SCROLL_OPTIMIZE, (e) => {
      e.some((t) => ["TD", "TR", "TBODY", "TABLE"].includes(t.target.tagName) ? (this.quill.once(R.events.TEXT_CHANGE, (r, s, i) => {
        i === R.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const ia = Ct("quill:toolbar");
class no extends gt {
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
    }), this.quill.on(R.events.EDITOR_CHANGE, () => {
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
        this.quill.scroll.query(t).prototype instanceof Ge
      ) {
        if (i = prompt(`Enter ${t}`), !i) return;
        this.quill.updateContents(new K().retain(a.index).delete(a.length).insert({
          [t]: i
        }), R.sources.USER);
      } else
        this.quill.format(t, i, R.sources.USER);
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
            this.quill.scroll.query(t, W.INLINE) != null && this.quill.format(t, !1, R.sources.USER);
          });
        } else
          this.quill.removeFormat(n.index, n.length, R.sources.USER);
    },
    direction(n) {
      const {
        align: e
      } = this.quill.getFormat();
      n === "rtl" && e == null ? this.quill.format("align", "right", R.sources.USER) : !n && e === "right" && this.quill.format("align", !1, R.sources.USER), this.quill.format("direction", n, R.sources.USER);
    },
    indent(n) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e), r = parseInt(t.indent || 0, 10);
      if (n === "+1" || n === "-1") {
        let s = n === "+1" ? 1 : -1;
        t.direction === "rtl" && (s *= -1), this.quill.format("indent", r + s, R.sources.USER);
      }
    },
    link(n) {
      n === !0 && (n = prompt("Enter link URL:")), this.quill.format("link", n, R.sources.USER);
    },
    list(n) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e);
      n === "check" ? t.list === "checked" || t.list === "unchecked" ? this.quill.format("list", !1, R.sources.USER) : this.quill.format("list", "unchecked", R.sources.USER) : this.quill.format("list", n, R.sources.USER);
    }
  }
};
const hg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', fg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', pg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', mg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', gg = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', bg = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', yg = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', vg = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', aa = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', xg = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', wg = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', Ag = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', Eg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', Ng = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', Tg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', _g = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Sg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', kg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Cg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', Lg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', qg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', Og = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Ig = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', Rg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', $g = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Bg = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', Dg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', Mg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', Fg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', Pg = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', jg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Ug = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', zg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', fn = {
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
    check: Bg,
    ordered: Dg
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
class fs {
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
class Ll extends fs {
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
class ql extends fs {
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
class xn extends Br {
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
      if (s.classList.contains("ql-align") && (s.querySelector("option") == null && Qr(s, Kg), typeof t.align == "object"))
        return new ql(s, t.align);
      if (s.classList.contains("ql-background") || s.classList.contains("ql-color")) {
        const i = s.classList.contains("ql-background") ? "background" : "color";
        return s.querySelector("option") == null && Qr(s, Gg, i === "background" ? "#ffffff" : "#000000"), new Ll(s, t[i]);
      }
      return s.querySelector("option") == null && (s.classList.contains("ql-font") ? Qr(s, Wg) : s.classList.contains("ql-header") ? Qr(s, Zg) : s.classList.contains("ql-size") && Qr(s, Yg)), new fs(s);
    });
    const r = () => {
      this.pickers.forEach((s) => {
        s.update();
      });
    };
    this.quill.on(V.events.EDITOR_CHANGE, r);
  }
}
xn.DEFAULTS = Pt({}, Br.DEFAULTS, {
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
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", e, V.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", e, V.sources.USER)), this.quill.root.scrollTop = t;
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
            V.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(r + 1, " ", V.sources.USER), this.quill.setSelection(r + 2, V.sources.USER);
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
function Qr(n, e) {
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
    super(e, t), this.quill.on(V.events.EDITOR_CHANGE, (r, s, i, a) => {
      if (r === V.events.SELECTION_CHANGE)
        if (s != null && s.length > 0 && a === V.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const l = this.quill.getLines(s.index, s.length);
          if (l.length === 1) {
            const c = this.quill.getBounds(s);
            c != null && this.position(c);
          } else {
            const c = l[l.length - 1], d = this.quill.getIndex(c), b = Math.min(c.length() - 1, s.index + s.length - d), m = this.quill.getBounds(new ir(d, b));
            m != null && this.position(m);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(V.events.SCROLL_OPTIMIZE, () => {
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
class Rl extends xn {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Qg), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new Jg(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), fn), this.buildPickers(e.container.querySelectorAll("select"), fn));
  }
}
Rl.DEFAULTS = Pt({}, xn.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(n) {
          n ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, R.sources.USER);
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
        this.restoreFocus(), this.quill.formatText(t, "link", !1, V.sources.USER), delete this.linkRange;
      }
      e.preventDefault(), this.hide();
    }), this.quill.on(V.events.SELECTION_CHANGE, (e, t, r) => {
      if (e != null) {
        if (e.length === 0 && r === V.sources.USER) {
          const [s, i] = this.quill.scroll.descendant(ts, e.index);
          if (s != null) {
            this.linkRange = new ir(e.index - i, s.length());
            const a = ts.formats(s.domNode);
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
class $l extends xn {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = e0), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), fn), this.buildPickers(e.container.querySelectorAll("select"), fn), this.tooltip = new t0(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, r) => {
      e.handlers.link.call(e, !r.format.link);
    }));
  }
}
$l.DEFAULTS = Pt({}, xn.DEFAULTS, {
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
            this.quill.format("link", !1, R.sources.USER);
        }
      }
    }
  }
});
R.register({
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
R.register({
  "formats/align": ml,
  "formats/direction": vl,
  "formats/indent": Qm,
  "formats/background": Yi,
  "formats/color": Zi,
  "formats/font": Al,
  "formats/size": Nl,
  "formats/blockquote": Jm,
  "formats/code-block": je,
  "formats/header": eg,
  "formats/list": vn,
  "formats/bold": to,
  "formats/code": Xi,
  "formats/italic": tg,
  "formats/link": ts,
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
  "ui/icons": fn,
  "ui/picker": fs,
  "ui/icon-picker": ql,
  "ui/color-picker": Ll,
  "ui/tooltip": Ol
}, !0);
const r0 = { class: "rounded-lg border border-slate-300 bg-white" }, n0 = /* @__PURE__ */ St({
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
    pn(() => {
      s.value && (i = new R(s.value, {
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
    }), tr(
      () => t.modelValue,
      (c) => {
        i && i.root.innerHTML !== c && (i.root.innerHTML = c || "");
      }
    ), tr(
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
        const b = i?.getSelection(!0);
        if (b)
          try {
            if (t.disabled)
              return;
            let m = "";
            t.subirImagen ? m = await t.subirImagen(d) : m = await l(d), i?.insertEmbed(b.index, "image", m, "user");
          } catch (m) {
            console.error("No se pudo subir la imagen al editor:", m);
          }
      };
    }
    function l(c) {
      return new Promise((d, b) => {
        const m = new FileReader();
        m.onload = () => d(String(m.result)), m.onerror = () => b(new Error("No fue posible leer la imagen.")), m.readAsDataURL(c);
      });
    }
    return (c, d) => (D(), M("div", r0, [
      y("div", {
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
}, v0 = ["checked", "disabled"], x0 = ["value", "placeholder", "disabled"], w0 = ["value", "disabled"], A0 = ["value"], E0 = ["value", "step", "placeholder", "disabled"], N0 = ["value", "placeholder", "disabled"], T0 = /* @__PURE__ */ St({
  name: "CmsNestedValueEditor",
  __name: "CmsNestedValueEditor",
  props: {
    schema: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = Le(
      () => Array.isArray(t.schema.mapFields) ? t.schema.mapFields : []
    ), i = Le(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), a = Le(() => d(t.modelValue)), l = Le(() => Array.isArray(t.modelValue) ? t.modelValue : []), c = Le(() => Object.entries(a.value));
    function d(z) {
      return z && typeof z == "object" && !Array.isArray(z) ? z : {};
    }
    function b(z) {
      return z.type === "array" ? [] : z.type === "map" ? {} : z.type === "boolean" ? !1 : z.type === "numeric" || z.type === "id" ? null : "";
    }
    function m(z, H) {
      r("update:modelValue", {
        ...a.value,
        [z]: H
      });
    }
    function h() {
      r("update:modelValue", [...l.value, b(i.value)]);
    }
    function p(z) {
      const H = [...l.value];
      H.splice(z, 1), r("update:modelValue", H);
    }
    function T(z, H) {
      const f = [...l.value];
      f[z] = H, r("update:modelValue", f);
    }
    function _(z) {
      r("update:modelValue", z);
    }
    function L(z) {
      r("update:modelValue", z);
    }
    function I(z) {
      if (!z.trim()) {
        r("update:modelValue", null);
        return;
      }
      const H = Number(z);
      r("update:modelValue", Number.isFinite(H) ? H : null);
    }
    function P(z) {
      if (typeof z == "number" && Number.isFinite(z))
        return String(z);
      if (typeof z == "string") {
        const H = z.trim();
        if (!H)
          return "";
        const f = Number(H);
        if (Number.isFinite(f))
          return String(f);
      }
      return "";
    }
    function U() {
      const z = a.value;
      let H = 1, f = `campo_${H}`;
      for (; f in z; )
        H += 1, f = `campo_${H}`;
      r("update:modelValue", {
        ...z,
        [f]: ""
      });
    }
    function Y(z) {
      const H = { ...a.value };
      delete H[z], r("update:modelValue", H);
    }
    function G(z, H) {
      const f = H.trim();
      if (!f || f === z)
        return;
      const q = { ...a.value }, A = q[z];
      delete q[z], q[f] = A, r("update:modelValue", q);
    }
    function oe(z, H) {
      const f = { ...a.value };
      f[z] = ye(H), r("update:modelValue", f);
    }
    function se(z) {
      if (typeof z == "string")
        return z;
      if (z == null)
        return "";
      try {
        return JSON.stringify(z);
      } catch {
        return String(z);
      }
    }
    function ye(z) {
      const H = z.trim();
      if (!H)
        return "";
      if (H.startsWith("{") && H.endsWith("}") || H.startsWith("[") && H.endsWith("]"))
        try {
          return JSON.parse(H);
        } catch {
          return z;
        }
      return z;
    }
    return (z, H) => {
      const f = ya("CmsNestedValueEditor", !0);
      return D(), M("div", s0, [
        n.schema.type === "map" ? (D(), M("section", i0, [
          (D(!0), M(De, null, Me(s.value, (q) => (D(), M("article", {
            key: q.key,
            class: "space-y-1 rounded-md border border-slate-200 bg-white p-3"
          }, [
            y("label", o0, ee(q.label), 1),
            q.helpText ? (D(), M("p", a0, ee(q.helpText), 1)) : ie("", !0),
            Nt(f, {
              schema: q,
              "model-value": a.value[q.key],
              disabled: n.disabled,
              "onUpdate:modelValue": (A) => m(q.key, A)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          s.value.length ? ie("", !0) : (D(), M("div", l0, [
            (D(!0), M(De, null, Me(c.value, ([q, A]) => (D(), M("article", {
              key: q,
              class: "grid gap-2 rounded-md border border-slate-200 bg-white p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              y("input", {
                value: q,
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onChange: (F) => G(q, F.target.value)
              }, null, 40, c0),
              y("input", {
                value: se(A),
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onInput: (F) => oe(q, F.target.value)
              }, null, 40, u0),
              y("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (F) => Y(q)
              }, " Quitar ", 8, d0)
            ]))), 128)),
            y("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
              disabled: n.disabled,
              onClick: U
            }, " Agregar propiedad ", 8, h0),
            H[5] || (H[5] = y("p", { class: "text-xs text-slate-500" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : n.schema.type === "array" ? (D(), M("section", f0, [
          (D(!0), M(De, null, Me(l.value, (q, A) => (D(), M("article", {
            key: A,
            class: "space-y-2 rounded-md border border-slate-200 bg-white p-3"
          }, [
            y("div", p0, [
              y("p", m0, "Item " + ee(A + 1), 1),
              y("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (F) => p(A)
              }, " Quitar ", 8, g0)
            ]),
            Nt(f, {
              schema: i.value,
              "model-value": q,
              disabled: n.disabled,
              "onUpdate:modelValue": (F) => T(A, F)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          y("button", {
            type: "button",
            class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
            disabled: n.disabled,
            onClick: h
          }, " Agregar item ", 8, b0)
        ])) : n.schema.type === "boolean" ? (D(), M("label", y0, [
          y("input", {
            type: "checkbox",
            checked: !!n.modelValue,
            disabled: n.disabled,
            onChange: H[0] || (H[0] = (q) => L(q.target.checked))
          }, null, 40, v0),
          H[6] || (H[6] = Ke(" Activo ", -1))
        ])) : n.schema.type === "textarea" || n.schema.type === "richtext" ? (D(), M("textarea", {
          key: 3,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          rows: "4",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: H[1] || (H[1] = (q) => _(q.target.value))
        }, null, 40, x0)) : n.schema.type === "select" ? (D(), M("select", {
          key: 4,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onChange: H[2] || (H[2] = (q) => _(q.target.value))
        }, [
          H[7] || (H[7] = y("option", { value: "" }, "Selecciona una opción", -1)),
          (D(!0), M(De, null, Me(n.schema.options || [], (q) => (D(), M("option", {
            key: q,
            value: q
          }, ee(q), 9, A0))), 128))
        ], 40, w0)) : n.schema.type === "numeric" || n.schema.type === "id" ? (D(), M("input", {
          key: 5,
          value: P(n.modelValue),
          type: "number",
          step: n.schema.type === "id" ? "1" : "any",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: H[3] || (H[3] = (q) => I(q.target.value))
        }, null, 40, E0)) : (D(), M("input", {
          key: 6,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          type: "text",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: H[4] || (H[4] = (q) => _(q.target.value))
        }, null, 40, N0))
      ]);
    };
  }
}), _0 = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};
async function S0(n, e = {}) {
  if (!n.type.startsWith("image/"))
    return n;
  const t = { ..._0, ...e }, r = await C0(n), { width: s, height: i } = k0(r.width, r.height, t.maxWidth, t.maxHeight), a = document.createElement("canvas");
  a.width = s, a.height = i;
  const l = a.getContext("2d");
  if (!l)
    return n;
  l.drawImage(r, 0, 0, s, i);
  let c = t.quality, d = await ua(a, n.type || "image/jpeg", c);
  const b = t.targetSizeKb * 1024;
  for (; d.size > b && c > 0.45; )
    c -= 0.08, d = await ua(a, n.type || "image/jpeg", c);
  return d;
}
function k0(n, e, t, r) {
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
function C0(n) {
  return new Promise((e, t) => {
    const r = new Image(), s = URL.createObjectURL(n);
    r.onload = () => {
      URL.revokeObjectURL(s), e(r);
    }, r.onerror = () => {
      URL.revokeObjectURL(s), t(new Error("No fue posible leer la imagen."));
    }, r.src = s;
  });
}
async function L0(n, e, t) {
  const { storage: r } = Te(), s = Kl(r, n);
  return await Gl(s, e, t), Wl(s);
}
async function da(n, e, t = {}) {
  const r = await S0(e, {
    maxWidth: t.maxWidth,
    maxHeight: t.maxHeight,
    quality: t.quality,
    targetSizeKb: t.targetSizeKb
  });
  return L0(n, r, t.metadata);
}
async function q0(n, e) {
  const { firestore: t } = Te(), r = await D0(n, e);
  return (await zl(rr(t, n.collectionName), {
    ...r,
    createdAt: Ve(),
    updatedAt: Ve()
  })).id;
}
async function ha(n, e = 100) {
  const { firestore: t } = Te();
  try {
    const r = Oi(
      rr(t, n.collectionName),
      Ii("createdAt", "desc"),
      xa(e)
    );
    return (await Or(r)).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  } catch {
    return (await Or(rr(t, n.collectionName))).docs.map((s) => ({
      id: s.id,
      data: s.data()
    }));
  }
}
async function O0(n, e) {
  const { firestore: t } = Te();
  await Hl(zt(t, n.collectionName, e));
}
async function I0(n, e, t) {
  const { firestore: r } = Te(), s = M0(n, t);
  await va(zt(r, n.collectionName, e), {
    ...s,
    updatedAt: Ve()
  });
}
const Bl = "main", R0 = "schema";
async function $0(n, e, t = Bl) {
  const { firestore: r } = Te(), s = n.dictionaryDocumentId || t, i = Dl(n), a = zt(r, n.collectionName, s), l = await ns(a), c = {
    updatedAt: Ve(),
    createdAt: l.exists() ? l.data().createdAt : Ve()
  };
  if (i)
    c[i] = e;
  else
    for (const [d, b] of Object.entries(e))
      c[d] = b;
  return await Zn(
    a,
    c,
    { merge: !0 }
  ), s;
}
async function B0(n, e = Bl) {
  const { firestore: t } = Te(), r = n.dictionaryDocumentId || e, s = await ns(zt(t, n.collectionName, r));
  if (!s.exists())
    return null;
  const i = s.data(), a = Dl(n), l = a ? i[a] : null;
  return l && typeof l == "object" && !Array.isArray(l) ? {
    id: s.id,
    data: l
  } : {
    id: s.id,
    data: i
  };
}
function Dl(n) {
  return n.storageType !== "dictionary" ? "" : typeof n.dictionaryRootKey == "string" && n.dictionaryRootKey.trim() ? n.dictionaryRootKey.trim() : R0;
}
async function D0(n, e) {
  const t = Ml(n);
  if (!t.length)
    return { ...e };
  const { firestore: r } = Te(), s = { ...e };
  for (const i of t)
    s[i.key] = await F0(r, n.collectionName, i.key);
  return s;
}
function M0(n, e) {
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
async function F0(n, e, t) {
  let r = 0;
  try {
    const a = (await Or(
      Oi(
        rr(n, e),
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
  const s = await Or(rr(n, e));
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
function P0(n) {
  return `${n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}-${Date.now().toString().slice(-6)}`;
}
const j0 = { class: "space-y-4" }, U0 = { class: "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" }, z0 = {
  key: 0,
  class: "mt-2 text-xs text-slate-500"
}, H0 = {
  key: 1,
  class: "mt-2 text-xs text-rose-700"
}, V0 = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, K0 = { class: "text-xl font-black text-slate-900" }, G0 = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, W0 = { class: "block text-sm font-semibold text-slate-700" }, Z0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, Y0 = ["value", "placeholder", "disabled", "onInput"], X0 = {
  key: 2,
  class: "space-y-1"
}, Q0 = ["value", "step", "min", "placeholder", "disabled", "onInput"], J0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, e1 = ["value", "placeholder", "disabled", "onInput"], t1 = ["value", "disabled", "onChange"], r1 = ["value"], n1 = {
  key: 5,
  class: "space-y-2"
}, s1 = ["value", "disabled", "onChange"], i1 = ["value"], o1 = {
  key: 0,
  class: "text-xs text-slate-500"
}, a1 = {
  key: 6,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, l1 = ["checked", "disabled", "onChange"], c1 = {
  key: 7,
  class: "space-y-2"
}, u1 = ["disabled", "onChange"], d1 = {
  key: 0,
  class: "text-xs text-slate-500 break-all"
}, h1 = ["src"], f1 = ["disabled", "onClick"], p1 = {
  key: 0,
  class: "rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700"
}, m1 = {
  key: 1,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, g1 = {
  key: 2,
  class: "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, b1 = { class: "flex flex-wrap items-center gap-2" }, y1 = ["disabled"], v1 = ["disabled"], x1 = { class: "mt-6 border-t border-slate-200 pt-5" }, w1 = {
  key: 0,
  class: "mt-3 text-sm text-slate-500"
}, A1 = {
  key: 1,
  class: "mt-3 text-sm text-slate-500"
}, E1 = {
  key: 2,
  class: "mt-3 space-y-2"
}, N1 = { class: "text-sm font-semibold text-slate-900" }, T1 = { class: "text-xs text-slate-500" }, _1 = {
  key: 0,
  class: "flex items-center gap-2"
}, S1 = ["disabled", "onClick"], k1 = ["disabled", "onClick"], C1 = /* @__PURE__ */ St({
  __name: "AdminBlogPage",
  setup(n) {
    const e = ss(), t = mn(), r = te([]), s = te(""), i = te(!1), a = te(""), l = te({}), c = te({}), d = te([]), b = te(!1), m = te(!1), h = te(""), p = te(""), T = te({}), _ = te(""), L = Le(() => Sr.value === "admin" || Sr.value === "writer" || Sr.value === "manager"), I = Le(() => r.value.find((S) => S.id === s.value) ?? null), P = Le(() => !!_.value);
    pn(async () => {
      await U();
    }), tr(
      I,
      async (S) => {
        if (!S) {
          l.value = {}, c.value = {}, d.value = [], T.value = {}, _.value = "";
          return;
        }
        se(S), await ye(S), await z(S);
      },
      { immediate: !0 }
    ), tr(
      () => e.query.schema,
      (S) => {
        typeof S == "string" && r.value.some((E) => E.id === S) && s.value !== S && (s.value = S);
      }
    );
    async function U() {
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
      const S = await Bi();
      if (r.value = S, !S.length) {
        s.value = "";
        return;
      }
      const E = typeof e.query.schema == "string" ? e.query.schema : "";
      if (E && S.some((B) => B.id === E)) {
        s.value = E;
        return;
      }
      S.some((B) => B.id === s.value) || (s.value = S[0].id, await G(s.value));
    }
    async function G(S) {
      S && e.query.schema !== S && await t.replace({
        query: {
          ...e.query,
          schema: S
        }
      });
    }
    function oe(S) {
      return !!S && typeof S == "object" && !Array.isArray(S);
    }
    function se(S) {
      const E = {}, C = {};
      for (const B of S.fields)
        B.type === "boolean" ? E[B.key] = !1 : B.type === "array" ? E[B.key] = [] : B.type === "map" ? E[B.key] = {} : B.type === "numeric" || B.type === "id" ? E[B.key] = null : (B.type, E[B.key] = ""), B.type === "image" && (C[B.key] = null);
      l.value = E, c.value = C, _.value = "", h.value = "", p.value = "";
    }
    async function ye(S) {
      b.value = !0;
      try {
        if (S.storageType === "dictionary") {
          const C = await B0(S);
          d.value = C ? [C] : [], _.value = "", C && q(S, C);
          return;
        }
        const E = await ha(S, 100);
        d.value = E, _.value && !E.some((C) => C.id === _.value) && (_.value = "");
      } finally {
        b.value = !1;
      }
    }
    async function z(S) {
      const E = S.fields.filter((B) => B.type === "document");
      if (!E.length) {
        T.value = {};
        return;
      }
      const C = {};
      await Promise.all(
        E.map(async (B) => {
          const ge = typeof B.documentSchemaId == "string" ? B.documentSchemaId.trim() : "";
          if (!ge) {
            C[B.key] = { options: [], byId: {} };
            return;
          }
          const Se = r.value.find((We) => We.id === ge);
          if (!Se || Se.storageType !== "document") {
            C[B.key] = { options: [], byId: {} };
            return;
          }
          const yt = typeof B.documentLabelField == "string" && B.documentLabelField.trim() || Se.previewField || Se.slugFromField || Se.fields[0]?.key || "", qt = await ha(Se, 200), Ot = {}, Ue = qt.map((We) => (Ot[We.id] = We, {
            id: We.id,
            label: H(We, yt),
            hint: f(We)
          }));
          C[B.key] = { options: Ue, byId: Ot };
        })
      ), T.value = C;
    }
    function H(S, E) {
      const C = E ? S.data[E] : null;
      return typeof C == "string" && C.trim() ? C.trim() : S.id;
    }
    function f(S) {
      const E = S.data.telefono;
      return typeof E == "string" && E.trim() ? `Tel: ${E.trim()}` : "";
    }
    function q(S, E) {
      const C = { ...l.value };
      for (const B of S.fields) {
        const ge = E.data[B.key];
        B.type === "boolean" ? C[B.key] = !!ge : B.type === "array" || B.type === "map" ? C[B.key] = N(B, ge) : B.type === "numeric" ? C[B.key] = Lt(ge) : B.type === "id" ? C[B.key] = fr(ge) : B.type === "document" ? C[B.key] = typeof ge == "string" ? ge : "" : typeof ge == "string" ? C[B.key] = ge : C[B.key] = "";
      }
      l.value = C;
    }
    function A(S) {
      const E = I.value;
      !E || E.storageType !== "document" || (se(E), q(E, S), _.value = S.id);
    }
    function F() {
      const S = I.value;
      !S || S.storageType !== "document" || se(S);
    }
    async function w() {
      const S = I.value;
      if (S) {
        if (h.value = "", p.value = "", !L.value) {
          p.value = "Tu rol no tiene permisos para crear o editar contenido.";
          return;
        }
        m.value = !0;
        try {
          const E = {};
          for (const C of S.fields)
            E[C.key] = await v(S, C), k(S, C, E[C.key]);
          if (S.slugFromField) {
            const C = E[S.slugFromField];
            typeof C == "string" && C.trim() && (E.slug = P0(C));
          }
          S.storageType === "dictionary" ? (await $0(S, E), h.value = "Registro de diccionario actualizado.") : (_.value ? (await I0(S, _.value, E), h.value = "Registro actualizado correctamente.") : (await q0(S, E), h.value = "Registro creado correctamente."), se(S)), await ye(S);
        } catch (E) {
          p.value = E instanceof Error ? E.message : "No se pudo guardar el registro.";
        } finally {
          m.value = !1;
        }
      }
    }
    async function v(S, E) {
      if (E.type === "boolean")
        return !!l.value[E.key];
      if (E.type === "image") {
        const C = c.value[E.key];
        if (!C)
          return Q(E.key);
        const B = Gt(C.name), ge = await da(
          `${S.collectionName}/${E.key}/${Date.now()}-${B}`,
          C,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return l.value[E.key] = ge, c.value[E.key] = null, ge;
      }
      return E.type === "array" || E.type === "map" ? N(E, l.value[E.key]) : E.type === "numeric" ? ae(E.key) : E.type === "id" ? S.storageType === "document" && !_.value ? null : fr(l.value[E.key]) : (E.type === "document", Q(E.key));
    }
    function k(S, E, C) {
      if (E.required && E.type !== "boolean") {
        if (E.type === "array") {
          if (!Array.isArray(C) || !C.length)
            throw new Error(`El campo "${E.label}" es obligatorio y debe tener al menos 1 elemento.`);
          return;
        }
        if (E.type === "map") {
          if (!oe(C) || Object.keys(C).length === 0)
            throw new Error(`El campo "${E.label}" es obligatorio y debe tener al menos 1 propiedad.`);
          return;
        }
        if (!(E.type === "id" && S.storageType === "document" && !_.value)) {
          if (E.type === "numeric") {
            if (typeof C != "number" || !Number.isFinite(C))
              throw new Error(`El campo "${E.label}" es obligatorio y debe ser numérico.`);
            return;
          }
          if (E.type === "id") {
            if (typeof C != "number" || !Number.isInteger(C) || C < 1)
              throw new Error(`El campo "${E.label}" es obligatorio y debe ser un entero mayor o igual a 1.`);
            return;
          }
          if (typeof C != "string" || !C.trim())
            throw new Error(`El campo "${E.label}" es obligatorio.`);
        }
      }
    }
    function N(S, E) {
      if (typeof E == "string") {
        const B = E.trim();
        if (!(B.startsWith("{") || B.startsWith("[")))
          E = S.type === "array" ? [] : {};
        else
          try {
            E = JSON.parse(B);
          } catch {
            E = S.type === "array" ? [] : {};
          }
      }
      if (S.type === "array") {
        const B = Array.isArray(E) ? E : [];
        return S.itemSchema ? B.map(
          (ge, Se) => $(S.itemSchema, ge, `${S.label}[${Se}]`)
        ) : B;
      }
      const C = oe(E) ? E : {};
      return Array.isArray(S.mapFields) && S.mapFields.length > 0 ? x(S.mapFields, C, S.label) : C;
    }
    function x(S, E, C) {
      const B = {};
      for (const ge of S) {
        const Se = ge.key;
        if (!(Se in E)) {
          if (ge.required)
            throw new Error(`Falta la propiedad requerida "${C}.${Se}".`);
          continue;
        }
        B[Se] = $(ge, E[Se], `${C}.${Se}`);
      }
      return B;
    }
    function $(S, E, C) {
      if (S.type === "array") {
        if (!Array.isArray(E))
          throw new Error(`"${C}" debe ser un arreglo.`);
        return S.itemSchema ? E.map((B, ge) => $(S.itemSchema, B, `${C}[${ge}]`)) : E;
      }
      if (S.type === "map") {
        if (!oe(E))
          throw new Error(`"${C}" debe ser un objeto.`);
        return !Array.isArray(S.mapFields) || S.mapFields.length === 0 ? E : x(S.mapFields, E, C);
      }
      if (S.type === "boolean") {
        if (typeof E != "boolean")
          throw new Error(`"${C}" debe ser boolean.`);
        return E;
      }
      if (S.type === "document") {
        if (typeof E != "string")
          throw new Error(`"${C}" debe ser string (id de documento).`);
        return E;
      }
      if (S.type === "numeric") {
        if (typeof E != "number" || !Number.isFinite(E))
          throw new Error(`"${C}" debe ser numérico.`);
        return E;
      }
      if (S.type === "id") {
        if (typeof E != "number" || !Number.isInteger(E) || E < 1)
          throw new Error(`"${C}" debe ser un número entero mayor o igual a 1.`);
        return E;
      }
      if (typeof E != "string")
        throw new Error(`"${C}" debe ser string.`);
      if (S.type === "select" && Array.isArray(S.options) && S.options.length > 0 && E && !S.options.includes(E))
        throw new Error(`"${C}" no coincide con las opciones del select.`);
      return E;
    }
    async function j(S) {
      const E = I.value;
      if (!(!E || E.storageType !== "document")) {
        if (!L.value) {
          p.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await O0(E, S), _.value === S && se(E), await ye(E));
      }
    }
    async function Z(S) {
      const E = I.value;
      if (!E)
        throw new Error("No hay schema seleccionado.");
      const C = Gt(S.name);
      return da(
        `${E.collectionName}/editor/${Date.now()}-${C}`,
        S,
        { maxWidth: 1600, maxHeight: 1600, targetSizeKb: 700, quality: 0.8 }
      );
    }
    function Q(S) {
      const E = l.value[S];
      return typeof E == "string" ? E : "";
    }
    function ae(S) {
      return Lt(l.value[S]);
    }
    function J(S) {
      const E = ae(S);
      return typeof E == "number" ? String(E) : "";
    }
    function fe(S, E) {
      l.value[S] = E;
    }
    function ve(S, E) {
      l.value[S] = Lt(E);
    }
    function re(S) {
      return T.value[S.key]?.options ?? [];
    }
    function le(S) {
      const E = Q(S.key);
      return E ? re(S).find((B) => B.id === E)?.hint ?? "" : "";
    }
    function ce(S) {
      return l.value[S];
    }
    function de(S, E) {
      l.value[S] = E;
    }
    function pe(S) {
      return !!l.value[S];
    }
    function me(S, E) {
      l.value[S] = E;
    }
    function Ae(S, E) {
      const C = E.target;
      c.value[S] = C.files?.[0] ?? null;
    }
    function _e(S) {
      l.value[S] = "", c.value[S] = null;
    }
    function Kt(S, E) {
      const C = E.previewField || E.slugFromField || E.fields[0]?.key;
      if (!C)
        return S.id;
      const B = S.data[C];
      return typeof B == "string" && B.trim() ? B : typeof B == "boolean" ? B ? "true" : "false" : typeof B == "number" && Number.isFinite(B) ? String(B) : Array.isArray(B) ? `[array:${B.length}]` : oe(B) ? "[map]" : S.id;
    }
    function Gt(S) {
      return S.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
    }
    function Lt(S) {
      if (typeof S == "number")
        return Number.isFinite(S) ? S : null;
      if (typeof S == "string") {
        const E = S.trim();
        if (!E)
          return null;
        const C = Number(E);
        return Number.isFinite(C) ? C : null;
      }
      return null;
    }
    function fr(S) {
      const E = Lt(S);
      return E === null || !Number.isInteger(E) || E < 1 ? null : E;
    }
    function bt(S) {
      return S.type === "id" && I.value?.storageType === "document";
    }
    return (S, E) => (D(), M("section", j0, [
      y("article", U0, [
        E[0] || (E[0] = Ke(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        E[1] || (E[1] = y("strong", null, "Esquemas", -1)),
        E[2] || (E[2] = Ke(". ", -1)),
        i.value ? (D(), M("p", z0, "Cargando formularios...")) : a.value ? (D(), M("p", H0, ee(a.value), 1)) : ie("", !0)
      ]),
      y("article", V0, [
        y("h3", K0, ee(I.value ? `Formulario y registros: ${I.value.title}` : "Formulario y registros"), 1),
        E[7] || (E[7] = y("p", { class: "mt-1 text-sm text-slate-600" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        L.value ? ie("", !0) : (D(), M("p", G0, " No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        I.value ? (D(), M("form", {
          key: 1,
          class: "mt-5 space-y-4",
          onSubmit: qi(w, ["prevent"])
        }, [
          (D(!0), M(De, null, Me(I.value.fields, (C) => (D(), M("div", {
            key: C.key,
            class: "space-y-1"
          }, [
            y("label", W0, ee(C.label), 1),
            C.helpText ? (D(), M("p", Z0, ee(C.helpText), 1)) : ie("", !0),
            C.type === "text" ? (D(), M("input", {
              key: 1,
              value: Q(C.key),
              type: "text",
              placeholder: C.placeholder || "",
              disabled: !L.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: (B) => fe(C.key, B.target.value)
            }, null, 40, Y0)) : C.type === "numeric" || C.type === "id" ? (D(), M("div", X0, [
              y("input", {
                value: J(C.key),
                type: "number",
                step: C.type === "id" ? "1" : "any",
                min: C.type === "id" ? 1 : void 0,
                placeholder: C.placeholder || "",
                disabled: !L.value || bt(C),
                class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
                onInput: (B) => ve(C.key, B.target.value)
              }, null, 40, Q0),
              bt(C) ? (D(), M("p", J0, " Se genera automáticamente al crear el documento. ")) : ie("", !0)
            ])) : C.type === "textarea" ? (D(), M("textarea", {
              key: 3,
              value: Q(C.key),
              rows: "4",
              placeholder: C.placeholder || "",
              disabled: !L.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: (B) => fe(C.key, B.target.value)
            }, null, 40, e1)) : C.type === "select" ? (D(), M("select", {
              key: 4,
              value: Q(C.key),
              disabled: !L.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: (B) => fe(C.key, B.target.value)
            }, [
              E[3] || (E[3] = y("option", { value: "" }, "Selecciona una opción", -1)),
              (D(!0), M(De, null, Me(C.options || [], (B) => (D(), M("option", {
                key: B,
                value: B
              }, ee(B), 9, r1))), 128))
            ], 40, t1)) : C.type === "document" ? (D(), M("div", n1, [
              y("select", {
                value: Q(C.key),
                disabled: !L.value,
                class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
                onChange: (B) => fe(C.key, B.target.value)
              }, [
                E[4] || (E[4] = y("option", { value: "" }, "Selecciona un documento", -1)),
                (D(!0), M(De, null, Me(re(C), (B) => (D(), M("option", {
                  key: B.id,
                  value: B.id
                }, ee(B.label), 9, i1))), 128))
              ], 40, s1),
              le(C) ? (D(), M("p", o1, ee(le(C)), 1)) : ie("", !0)
            ])) : C.type === "boolean" ? (D(), M("label", a1, [
              y("input", {
                checked: pe(C.key),
                type: "checkbox",
                disabled: !L.value,
                onChange: (B) => me(C.key, B.target.checked)
              }, null, 40, l1),
              E[5] || (E[5] = Ke(" Activo ", -1))
            ])) : C.type === "image" ? (D(), M("div", c1, [
              y("input", {
                type: "file",
                accept: "image/*",
                disabled: !L.value,
                class: "block w-full text-sm text-slate-600 disabled:opacity-60",
                onChange: (B) => Ae(C.key, B)
              }, null, 40, u1),
              Q(C.key) ? (D(), M("p", d1, " URL actual: " + ee(Q(C.key)), 1)) : ie("", !0),
              Q(C.key) ? (D(), M("img", {
                key: 1,
                src: Q(C.key),
                alt: "Vista previa",
                class: "max-h-32 rounded-md border border-slate-200 object-cover"
              }, null, 8, h1)) : ie("", !0),
              Q(C.key) ? (D(), M("button", {
                key: 2,
                type: "button",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50",
                disabled: !L.value,
                onClick: (B) => _e(C.key)
              }, " Quitar URL ", 8, f1)) : ie("", !0)
            ])) : C.type === "array" || C.type === "map" ? (D(), er(T0, {
              key: 8,
              schema: C,
              "model-value": ce(C.key),
              disabled: !L.value,
              "onUpdate:modelValue": (B) => de(C.key, B)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])) : C.type === "richtext" ? (D(), er(n0, {
              key: 9,
              "model-value": Q(C.key),
              "subir-imagen": Z,
              disabled: !L.value,
              "onUpdate:modelValue": (B) => fe(C.key, B)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])) : ie("", !0)
          ]))), 128)),
          I.value.storageType === "document" && P.value ? (D(), M("p", p1, " Editando registro: " + ee(_.value), 1)) : ie("", !0),
          p.value ? (D(), M("p", m1, ee(p.value), 1)) : ie("", !0),
          h.value ? (D(), M("p", g1, ee(h.value), 1)) : ie("", !0),
          y("div", b1, [
            y("button", {
              type: "submit",
              disabled: m.value || !L.value,
              class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            }, ee(m.value ? "Guardando..." : I.value.storageType === "dictionary" ? "Guardar diccionario" : P.value ? "Guardar cambios" : "Crear documento"), 9, y1),
            I.value.storageType === "document" && P.value ? (D(), M("button", {
              key: 0,
              type: "button",
              disabled: m.value || !L.value,
              class: "rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
              onClick: F
            }, " Cancelar edición ", 8, v1)) : ie("", !0)
          ])
        ], 32)) : ie("", !0),
        y("div", x1, [
          E[6] || (E[6] = y("h4", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Registros guardados", -1)),
          b.value ? (D(), M("p", w1, "Cargando registros...")) : d.value.length ? (D(), M("ul", E1, [
            (D(!0), M(De, null, Me(d.value, (C) => (D(), M("li", {
              key: C.id,
              class: rt([
                "flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2",
                I.value?.storageType === "document" && _.value === C.id ? "border-sky-300 bg-sky-50" : ""
              ])
            }, [
              y("div", null, [
                y("p", N1, ee(I.value ? Kt(C, I.value) : C.id), 1),
                y("p", T1, "ID: " + ee(C.id), 1)
              ]),
              I.value?.storageType === "document" ? (D(), M("div", _1, [
                y("button", {
                  type: "button",
                  disabled: !L.value || m.value,
                  class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => A(C)
                }, ee(_.value === C.id ? "Editando" : "Editar"), 9, S1),
                y("button", {
                  type: "button",
                  disabled: !L.value,
                  class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => j(C.id)
                }, " Eliminar ", 8, k1)
              ])) : ie("", !0)
            ], 2))), 128))
          ])) : (D(), M("p", A1, "No hay registros todavía."))
        ])
      ])
    ]));
  }
}), L1 = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3" }, q1 = { class: "mb-3 flex items-start justify-between gap-2" }, O1 = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide text-slate-600"
}, I1 = ["disabled"], R1 = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, $1 = { class: "space-y-1" }, B1 = ["value", "disabled"], D1 = { class: "space-y-1" }, M1 = ["value", "disabled"], F1 = { class: "mt-2 grid gap-2 md:grid-cols-3" }, P1 = { class: "space-y-1" }, j1 = ["value", "disabled"], U1 = ["value"], z1 = { class: "space-y-1" }, H1 = ["value", "disabled"], V1 = { class: "space-y-1" }, K1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, G1 = ["checked", "disabled"], W1 = { class: "mt-2 block space-y-1" }, Z1 = ["value", "disabled"], Y1 = {
  key: 1,
  class: "mt-2 block space-y-1"
}, X1 = ["value", "disabled"], Q1 = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, J1 = { class: "space-y-1" }, eb = ["value", "disabled"], tb = { class: "space-y-1" }, rb = ["value", "disabled"], nb = {
  key: 3,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, sb = { class: "mb-2 flex items-center justify-between" }, ib = ["disabled"], ob = { class: "space-y-2" }, ab = {
  key: 4,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, lb = /* @__PURE__ */ St({
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
      return N === "numeric" || N === "id" || N === "textarea" || N === "richtext" || N === "image" || N === "select" || N === "document" || N === "boolean" || N === "array" || N === "map" ? N : "text";
    }
    function l(N) {
      return typeof N == "string" ? N : "";
    }
    function c(N) {
      return Array.isArray(N) ? N.map((x) => String(x).trim()).filter(Boolean) : [];
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
    function b() {
      return {
        ...d(),
        key: "",
        label: ""
      };
    }
    function m(N) {
      const x = i(N) ? N : {}, $ = a(x.type), j = {
        type: $,
        required: !!x.required,
        placeholder: l(x.placeholder),
        helpText: l(x.helpText),
        options: $ === "select" ? c(x.options) : [],
        documentSchemaId: $ === "document" ? l(x.documentSchemaId) : "",
        documentLabelField: $ === "document" ? l(x.documentLabelField) : ""
      };
      return $ === "map" && (j.mapFields = Array.isArray(x.mapFields) ? x.mapFields.map((Z) => h(Z)) : []), $ === "array" && (j.itemSchema = m(x.itemSchema)), j;
    }
    function h(N) {
      const x = i(N) ? N : {};
      return {
        ...m(x),
        key: l(x.key),
        label: l(x.label)
      };
    }
    function p() {
      const N = m(r.modelValue);
      if (r.withIdentity) {
        const x = h(r.modelValue);
        N.key = x.key, N.label = x.label;
      }
      return N;
    }
    function T(N, x) {
      const $ = m(N), j = {
        type: $.type,
        required: !!$.required,
        placeholder: l($.placeholder),
        helpText: l($.helpText),
        options: $.type === "select" ? c($.options) : [],
        documentSchemaId: $.type === "document" ? l($.documentSchemaId) : "",
        documentLabelField: $.type === "document" ? l($.documentLabelField) : ""
      };
      if ($.type === "map" && (j.mapFields = ($.mapFields ?? []).map((Z) => h(Z))), $.type === "array" && (j.itemSchema = T($.itemSchema ?? d(), !1)), x) {
        const Z = h(N);
        j.key = Z.key, j.label = Z.label;
      }
      return j;
    }
    function _(N) {
      s("update:modelValue", T(N, r.withIdentity));
    }
    function L(N, x) {
      const $ = p();
      $[N] = x, _($);
    }
    function I(N) {
      const x = p(), $ = a(N);
      x.type = $, $ !== "select" && (x.options = []), $ !== "document" && (x.documentSchemaId = "", x.documentLabelField = ""), $ === "map" ? (x.mapFields = Array.isArray(x.mapFields) ? x.mapFields.map((j) => h(j)) : [], delete x.itemSchema) : $ === "array" ? (x.itemSchema = m(x.itemSchema ?? d()), delete x.mapFields) : (delete x.mapFields, delete x.itemSchema), _(x);
    }
    function P(N) {
      const x = p();
      x.required = N, _(x);
    }
    function U(N) {
      const x = p();
      x.placeholder = N, _(x);
    }
    function Y(N) {
      const x = p();
      x.helpText = N, _(x);
    }
    function G() {
      return (p().options ?? []).join(", ");
    }
    function oe(N) {
      const x = p();
      x.options = N.split(",").map(($) => $.trim()).filter(Boolean), _(x);
    }
    function se() {
      return p().documentSchemaId ?? "";
    }
    function ye() {
      return p().documentLabelField ?? "";
    }
    function z(N) {
      const x = p();
      x.documentSchemaId = N, _(x);
    }
    function H(N) {
      const x = p();
      x.documentLabelField = N, _(x);
    }
    function f() {
      const N = p();
      return N.type !== "map" || !Array.isArray(N.mapFields) ? [] : N.mapFields.map((x) => h(x));
    }
    function q() {
      const N = p();
      N.type = "map", N.mapFields = [...f(), b()], _(N);
    }
    function A(N, x) {
      const $ = p(), j = f();
      j[N] = h(x), $.mapFields = j, _($);
    }
    function F(N) {
      const x = p(), $ = f();
      $.splice(N, 1), x.mapFields = $, _(x);
    }
    function w() {
      const N = p();
      return N.type !== "array" ? d() : m(N.itemSchema ?? d());
    }
    function v(N) {
      const x = p();
      x.type = "array", x.itemSchema = m(N), _(x);
    }
    function k() {
      s("remove");
    }
    return (N, x) => {
      const $ = ya("CmsSchemaFieldEditor", !0);
      return D(), M("article", L1, [
        y("div", q1, [
          n.title ? (D(), M("p", O1, ee(n.title), 1)) : ie("", !0),
          n.canRemove ? (D(), M("button", {
            key: 1,
            type: "button",
            disabled: n.disabled,
            class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60",
            onClick: k
          }, " Quitar ", 8, I1)) : ie("", !0)
        ]),
        n.withIdentity ? (D(), M("div", R1, [
          y("label", $1, [
            x[9] || (x[9] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Key", -1)),
            y("input", {
              value: p().key || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[0] || (x[0] = (j) => L("key", j.target.value))
            }, null, 40, B1)
          ]),
          y("label", D1, [
            x[10] || (x[10] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Label", -1)),
            y("input", {
              value: p().label || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[1] || (x[1] = (j) => L("label", j.target.value))
            }, null, 40, M1)
          ])
        ])) : ie("", !0),
        y("div", F1, [
          y("label", P1, [
            x[11] || (x[11] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo", -1)),
            y("select", {
              value: p().type,
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: x[2] || (x[2] = (j) => I(j.target.value))
            }, [
              (D(), M(De, null, Me(t, (j) => y("option", {
                key: j.value,
                value: j.value
              }, ee(j.label), 9, U1)), 64))
            ], 40, j1)
          ]),
          y("label", z1, [
            x[12] || (x[12] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Placeholder", -1)),
            y("input", {
              value: p().placeholder || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[3] || (x[3] = (j) => U(j.target.value))
            }, null, 40, H1)
          ]),
          y("label", V1, [
            x[14] || (x[14] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Requerido", -1)),
            y("span", K1, [
              y("input", {
                checked: !!p().required,
                type: "checkbox",
                disabled: n.disabled,
                onChange: x[4] || (x[4] = (j) => P(j.target.checked))
              }, null, 40, G1),
              x[13] || (x[13] = y("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        y("label", W1, [
          x[15] || (x[15] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Help text", -1)),
          y("input", {
            value: p().helpText || "",
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: x[5] || (x[5] = (j) => Y(j.target.value))
          }, null, 40, Z1)
        ]),
        p().type === "select" ? (D(), M("label", Y1, [
          x[16] || (x[16] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Opciones (separadas por coma)", -1)),
          y("input", {
            value: G(),
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: x[6] || (x[6] = (j) => oe(j.target.value))
          }, null, 40, X1)
        ])) : ie("", !0),
        p().type === "document" ? (D(), M("div", Q1, [
          y("label", J1, [
            x[17] || (x[17] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Schema destino", -1)),
            y("input", {
              value: se(),
              type: "text",
              disabled: n.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[7] || (x[7] = (j) => z(j.target.value))
            }, null, 40, eb)
          ]),
          y("label", tb, [
            x[18] || (x[18] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Campo etiqueta", -1)),
            y("input", {
              value: ye(),
              type: "text",
              disabled: n.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[8] || (x[8] = (j) => H(j.target.value))
            }, null, 40, rb)
          ])
        ])) : ie("", !0),
        p().type === "map" ? (D(), M("div", nb, [
          y("div", sb, [
            x[19] || (x[19] = y("p", { class: "text-xs font-bold uppercase tracking-wide text-slate-600" }, "Map fields", -1)),
            y("button", {
              type: "button",
              disabled: n.disabled,
              class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60",
              onClick: q
            }, " Agregar campo ", 8, ib)
          ]),
          y("div", ob, [
            (D(!0), M(De, null, Me(f(), (j, Z) => (D(), er($, {
              key: `map-field-${Z}`,
              "model-value": j,
              disabled: n.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (Q) => A(Z, Q),
              onRemove: (Q) => F(Z)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : ie("", !0),
        p().type === "array" ? (D(), M("div", ab, [
          x[20] || (x[20] = y("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-600" }, "Item schema", -1)),
          Nt($, {
            "model-value": w(),
            "with-identity": !1,
            disabled: n.disabled,
            title: "Estructura del ítem",
            "onUpdate:modelValue": v
          }, null, 8, ["model-value", "disabled"])
        ])) : ie("", !0)
      ]);
    };
  }
}), cb = { class: "space-y-4" }, ub = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, db = {
  key: 1,
  class: "text-sm text-slate-500"
}, hb = {
  key: 2,
  class: "text-sm text-slate-500"
}, fb = {
  key: 3,
  class: "rounded-2xl border border-slate-200 bg-white p-5"
}, pb = { class: "flex flex-wrap items-center justify-between gap-3" }, mb = { class: "text-lg font-black text-slate-900" }, gb = { class: "text-xs text-slate-500" }, bb = ["disabled"], yb = { class: "mt-4 grid gap-3 md:grid-cols-2" }, vb = { class: "space-y-1" }, xb = ["value"], wb = { class: "space-y-1" }, Ab = ["value"], Eb = { class: "space-y-1 md:col-span-2" }, Nb = ["value"], Tb = { class: "space-y-1" }, _b = ["value"], Sb = { class: "space-y-1" }, kb = ["value"], Cb = { class: "space-y-1" }, Lb = ["value"], qb = { class: "space-y-1" }, Ob = ["value"], Ib = {
  key: 0,
  class: "space-y-1"
}, Rb = ["value"], $b = {
  key: 1,
  class: "space-y-1"
}, Bb = ["value"], Db = { class: "mt-5 border-t border-slate-200 pt-4" }, Mb = { class: "space-y-3" }, Fb = {
  key: 0,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Pb = {
  key: 1,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, jb = /* @__PURE__ */ St({
  __name: "AdminSchemasPage",
  setup(n) {
    const e = ss(), t = mn(), r = te([]), s = te(""), i = te(!1), a = te(!1), l = te(null), c = te(!1), d = te(""), b = te(""), m = te(""), h = Le(() => r.value.find((w) => w.id === s.value) ?? null);
    pn(() => {
      p();
    }), tr(
      () => e.query.schema,
      (w) => {
        typeof w == "string" && r.value.some((v) => v.id === w) && s.value !== w && (s.value = w);
      }
    ), tr(
      h,
      (w) => {
        if (b.value = "", m.value = "", w) {
          c.value = !1, l.value = Y(w);
          return;
        }
        c.value || (l.value = null);
      },
      { immediate: !0 }
    );
    async function p() {
      i.value = !0, d.value = "";
      try {
        const w = await Bi();
        r.value = w, T(w), s.value ? await _(s.value) : l.value || (c.value = !0, l.value = G());
      } catch {
        d.value = "No se pudieron cargar los esquemas.";
      } finally {
        i.value = !1;
      }
    }
    function T(w) {
      if (!w.length) {
        s.value = "";
        return;
      }
      const v = typeof e.query.schema == "string" ? e.query.schema : "";
      if (v && w.some((k) => k.id === v)) {
        s.value = v;
        return;
      }
      w.some((k) => k.id === s.value) || (s.value = w[0].id);
    }
    async function _(w) {
      !w || e.query.schema === w || await t.replace({
        query: {
          ...e.query,
          schema: w
        }
      });
    }
    function L() {
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
        ...L(),
        key: "",
        label: ""
      };
    }
    function P(w) {
      const v = {
        type: w.type,
        required: !!w.required,
        placeholder: w.placeholder ?? "",
        helpText: w.helpText ?? "",
        options: Array.isArray(w.options) ? [...w.options] : []
      };
      return w.type === "map" && (v.mapFields = Array.isArray(w.mapFields) ? w.mapFields.map((k) => U(k)) : []), w.type === "array" && (v.itemSchema = w.itemSchema ? P(w.itemSchema) : L()), v;
    }
    function U(w) {
      return {
        ...P(w),
        key: w.key ?? "",
        label: w.label ?? ""
      };
    }
    function Y(w) {
      return {
        id: w.id,
        title: w.title,
        description: w.description ?? "",
        storageType: w.storageType,
        collectionName: w.collectionName,
        dictionaryDocumentId: w.dictionaryDocumentId ?? "",
        dictionaryRootKey: w.dictionaryRootKey ?? "",
        slugFromField: w.slugFromField ?? "",
        previewField: w.previewField ?? "",
        fields: w.fields.map((v) => U(v))
      };
    }
    function G() {
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
    async function oe() {
      c.value = !0, s.value = "", l.value = G(), b.value = "", m.value = "";
      const w = { ...e.query };
      delete w.schema, await t.replace({ query: w });
    }
    function se(w, v) {
      l.value && (l.value = {
        ...l.value,
        [w]: v
      });
    }
    function ye(w) {
      l.value && (l.value.storageType = w === "dictionary" ? "dictionary" : "document");
    }
    function z() {
      l.value && l.value.fields.push(I());
    }
    function H(w, v) {
      l.value && (l.value.fields[w] = U(v));
    }
    function f(w) {
      l.value && l.value.fields.splice(w, 1);
    }
    function q(w, v) {
      if (w.type === "map") {
        const k = Array.isArray(w.mapFields) ? w.mapFields : [];
        for (let N = 0; N < k.length; N += 1)
          A(k[N], `${v}.mapFields[${N}]`);
      }
      w.type === "array" && w.itemSchema && q(w.itemSchema, `${v}.itemSchema`);
    }
    function A(w, v) {
      if (!w.key.trim() || !w.label.trim())
        throw new Error(`${v}: completa key y label.`);
      q(w, v);
    }
    async function F() {
      if (l.value) {
        a.value = !0, b.value = "", m.value = "";
        try {
          const w = l.value;
          if (!w.id.trim() || !w.title.trim() || !w.collectionName.trim())
            throw new Error("Completa id, título y colección del esquema.");
          if (!w.fields.length)
            throw new Error("Agrega al menos un campo al esquema.");
          const v = w.fields.map((x) => U(x));
          for (let x = 0; x < v.length; x += 1)
            A(v[x], `fields[${x}]`);
          const k = {
            id: w.id,
            title: w.title,
            description: w.description,
            storageType: w.storageType,
            collectionName: w.collectionName,
            dictionaryDocumentId: w.storageType === "dictionary" ? w.dictionaryDocumentId : "",
            dictionaryRootKey: w.storageType === "dictionary" ? w.dictionaryRootKey : "",
            slugFromField: w.slugFromField,
            previewField: w.previewField,
            fields: v
          };
          await yc(k), await p(), s.value = k.id, c.value = !1, await _(k.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const N = r.value.find((x) => x.id === s.value);
          l.value = Y(N || k), m.value = "Esquema actualizado.";
        } catch (w) {
          b.value = w instanceof Error ? w.message : "No se pudo guardar el esquema.";
        } finally {
          a.value = !1;
        }
      }
    }
    return (w, v) => (D(), M("section", cb, [
      y("article", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        y("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
          v[9] || (v[9] = y("div", null, [
            y("h3", { class: "text-xl font-black text-slate-900" }, "Esquema editable"),
            y("p", { class: "mt-1 text-sm text-slate-600" }, [
              Ke(" Edición visual de campos. Los tipos "),
              y("strong", null, "map"),
              Ke(" y "),
              y("strong", null, "array"),
              Ke(" se editan por interfaz. ")
            ])
          ], -1)),
          y("div", { class: "flex items-center gap-2" }, [
            y("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: oe
            }, " Nuevo esquema "),
            y("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: p
            }, " Recargar ")
          ])
        ])
      ]),
      d.value ? (D(), M("p", ub, ee(d.value), 1)) : ie("", !0),
      i.value ? (D(), M("p", db, "Cargando esquemas...")) : l.value ? (D(), M("article", fb, [
        y("div", pb, [
          y("div", null, [
            y("h4", mb, ee(l.value.title || h.value?.title || "Nuevo esquema"), 1),
            y("p", gb, [
              v[10] || (v[10] = Ke(" ID: ", -1)),
              y("code", null, ee(h.value?.id || "nuevo"), 1)
            ])
          ]),
          y("button", {
            type: "button",
            disabled: a.value,
            class: "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400",
            onClick: F
          }, ee(a.value ? "Guardando..." : "Guardar cambios"), 9, bb)
        ]),
        y("div", yb, [
          y("label", vb, [
            v[11] || (v[11] = y("span", { class: "text-xs font-semibold text-slate-700" }, "ID", -1)),
            y("input", {
              value: l.value.id,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: v[0] || (v[0] = (k) => se("id", k.target.value))
            }, null, 40, xb)
          ]),
          y("label", wb, [
            v[12] || (v[12] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Título", -1)),
            y("input", {
              value: l.value.title,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: v[1] || (v[1] = (k) => se("title", k.target.value))
            }, null, 40, Ab)
          ]),
          y("label", Eb, [
            v[13] || (v[13] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Descripción", -1)),
            y("input", {
              value: l.value.description,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: v[2] || (v[2] = (k) => se("description", k.target.value))
            }, null, 40, Nb)
          ]),
          y("label", Tb, [
            v[15] || (v[15] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo de almacenamiento", -1)),
            y("select", {
              value: l.value.storageType,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onChange: v[3] || (v[3] = (k) => ye(k.target.value))
            }, [...v[14] || (v[14] = [
              y("option", { value: "document" }, "document", -1),
              y("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, _b)
          ]),
          y("label", Sb, [
            v[16] || (v[16] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Colección", -1)),
            y("input", {
              value: l.value.collectionName,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: v[4] || (v[4] = (k) => se("collectionName", k.target.value))
            }, null, 40, kb)
          ]),
          y("label", Cb, [
            v[17] || (v[17] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Slug desde campo", -1)),
            y("input", {
              value: l.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: v[5] || (v[5] = (k) => se("slugFromField", k.target.value))
            }, null, 40, Lb)
          ]),
          y("label", qb, [
            v[18] || (v[18] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Campo de preview", -1)),
            y("input", {
              value: l.value.previewField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: v[6] || (v[6] = (k) => se("previewField", k.target.value))
            }, null, 40, Ob)
          ]),
          l.value.storageType === "dictionary" ? (D(), M("label", Ib, [
            v[19] || (v[19] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary document ID", -1)),
            y("input", {
              value: l.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: v[7] || (v[7] = (k) => se("dictionaryDocumentId", k.target.value))
            }, null, 40, Rb)
          ])) : ie("", !0),
          l.value.storageType === "dictionary" ? (D(), M("label", $b, [
            v[20] || (v[20] = y("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary root key", -1)),
            y("input", {
              value: l.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: v[8] || (v[8] = (k) => se("dictionaryRootKey", k.target.value))
            }, null, 40, Bb)
          ])) : ie("", !0)
        ]),
        y("div", Db, [
          y("div", { class: "mb-3 flex items-center justify-between" }, [
            v[21] || (v[21] = y("h5", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Campos", -1)),
            y("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: z
            }, " Agregar campo ")
          ]),
          y("div", Mb, [
            (D(!0), M(De, null, Me(l.value.fields, (k, N) => (D(), er(lb, {
              key: `schema-field-${N}`,
              "model-value": k,
              "can-remove": !0,
              title: `Campo ${N + 1}`,
              "onUpdate:modelValue": (x) => H(N, x),
              onRemove: (x) => f(N)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        b.value ? (D(), M("p", Fb, ee(b.value), 1)) : ie("", !0),
        m.value ? (D(), M("p", Pb, ee(m.value), 1)) : ie("", !0)
      ])) : (D(), M("p", hb, "No hay esquema seleccionado."))
    ]));
  }
}), Ub = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, zb = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, Hb = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Vb = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, Kb = {
  key: 3,
  class: "mt-4 text-sm text-slate-500"
}, Gb = {
  key: 4,
  class: "mt-4 text-sm text-slate-500"
}, Wb = {
  key: 5,
  class: "mt-4 space-y-3"
}, Zb = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, Yb = { class: "text-sm font-semibold text-slate-900" }, Xb = { class: "text-xs text-slate-500" }, Qb = { class: "text-xs text-slate-500" }, Jb = { class: "text-xs text-slate-500" }, ey = { class: "flex flex-wrap gap-3" }, ty = ["checked", "disabled", "onChange"], ry = /* @__PURE__ */ St({
  __name: "AdminUsersPage",
  setup(n) {
    const e = te([]), t = te(!1), r = te(""), s = te(""), i = te(null), a = Le(() => Sr.value === "admin"), l = [
      { label: "Admin", value: "admin" },
      { label: "Writer", value: "writer" },
      { label: "Manager", value: "manager" },
      { label: "Sin rol", value: null }
    ];
    pn(async () => {
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
    async function d(p, T) {
      if (s.value = "", r.value = "", !a.value) {
        r.value = "Solo un admin puede cambiar roles.";
        return;
      }
      const _ = p.role === T ? null : T;
      i.value = p.id;
      try {
        await Jl(p.id, _), p.role = _, s.value = "Rol actualizado correctamente.";
      } catch {
        r.value = "No se pudo actualizar el rol.";
      } finally {
        i.value = null;
      }
    }
    function b(p, T) {
      return p === T;
    }
    function m(p) {
      return p === null ? "Sin rol" : p.charAt(0).toUpperCase() + p.slice(1);
    }
    function h(p) {
      const T = p?.toDate?.();
      return T ? T.toLocaleString("es-ES") : "Sin registros";
    }
    return (p, T) => (D(), M("section", Ub, [
      y("div", { class: "flex items-center justify-between" }, [
        T[0] || (T[0] = y("h3", { class: "text-xl font-black text-slate-900" }, "Usuarios", -1)),
        y("button", {
          type: "button",
          class: "rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
          onClick: c
        }, " Recargar ")
      ]),
      T[1] || (T[1] = y("p", { class: "mt-1 text-sm text-slate-600" }, "Listado de usuarios con último login y control de rol.", -1)),
      a.value ? ie("", !0) : (D(), M("p", zb, " Solo usuarios con rol admin pueden editar roles. ")),
      r.value ? (D(), M("p", Hb, ee(r.value), 1)) : ie("", !0),
      s.value ? (D(), M("p", Vb, ee(s.value), 1)) : ie("", !0),
      t.value ? (D(), M("p", Kb, "Cargando usuarios...")) : e.value.length === 0 ? (D(), M("p", Gb, "No hay usuarios registrados.")) : (D(), M("div", Wb, [
        (D(!0), M(De, null, Me(e.value, (_) => (D(), M("article", {
          key: _.id,
          class: "rounded-lg border border-slate-200 p-4"
        }, [
          y("div", Zb, [
            y("div", null, [
              y("p", Yb, ee(_.email || _.id), 1),
              y("p", Xb, "UID: " + ee(_.id), 1),
              y("p", Qb, "Último login: " + ee(h(_.lastLoginAt)), 1),
              y("p", Jb, "Rol actual: " + ee(m(_.role)), 1)
            ]),
            y("div", ey, [
              (D(), M(De, null, Me(l, (L) => y("label", {
                key: L.label,
                class: "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
              }, [
                y("input", {
                  type: "checkbox",
                  checked: b(_.role, L.value),
                  disabled: !a.value || i.value === _.id,
                  onChange: (I) => d(_, L.value)
                }, null, 40, ty),
                Ke(" " + ee(L.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), pa = /* @__PURE__ */ new WeakSet();
function gy(n, e) {
  if (pa.has(n))
    return;
  const t = qr(e.basePath ?? "/admin"), r = qr(e.loginPath ?? "/ingresar"), s = qr(e.registerPath ?? "/registro"), i = sy(e.homePath ?? "/");
  Zl(e.firebase), oc({ basePath: t, loginPath: r, registerPath: s, homePath: i }), tc();
  const a = ny(t, r, s);
  for (const l of a)
    n.addRoute(l);
  n.beforeEach(async (l) => (await rc(), l.meta.cmsRequiresAuth && !an.value ? {
    path: r,
    query: { redirect: l.fullPath }
  } : (l.path === r || l.path === s || l.meta.cmsGuestOnly) && an.value ? { path: t } : !0)), pa.add(n);
}
function ny(n = "/admin", e = "/ingresar", t = "/registro") {
  const r = qr(n), s = qr(e), i = qr(t);
  return [
    { path: s, component: dc, meta: { cmsGuestOnly: !0 } },
    { path: i, component: gc, meta: { cmsGuestOnly: !0 } },
    {
      path: r,
      component: Qc,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${r}/content` },
        { path: "content", component: C1, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: jb, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: ry, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function qr(n) {
  const e = String(n || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function sy(n) {
  const e = String(n || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
export {
  I0 as actualizarRegistroDocumento,
  ic as cerrarSesion,
  q0 as crearRegistroDocumento,
  ny as createCmsRoutes,
  O0 as eliminarRegistroDocumento,
  $0 as guardarRegistroDiccionario,
  yc as guardarSchemaContenido,
  ha as listarRegistrosDocumento,
  Bi as listarSchemasContenido,
  B0 as obtenerRegistroDiccionario,
  gy as registerPifWarriorsCms,
  Sr as rolActual,
  an as usuarioActual
};
