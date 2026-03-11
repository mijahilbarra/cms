import { signOut as Bl, onAuthStateChanged as Dl, setPersistence as ho, browserLocalPersistence as fo, signInWithEmailAndPassword as Ml, createUserWithEmailAndPassword as Fl } from "firebase/auth";
import { ref as re, defineComponent as Tt, openBlock as B, createElementBlock as D, createElementVNode as v, withModifiers as qi, withDirectives as Qr, vModelText as Jr, toDisplayString as te, createCommentVNode as ae, createTextVNode as Ve, createVNode as At, unref as Re, withCtx as qt, onMounted as us, onBeforeUnmount as po, watch as Xt, computed as Ce, normalizeClass as rt, Fragment as Be, renderList as De, createBlock as Yt, resolveComponent as mo } from "vue";
import { query as go, collection as rs, orderBy as bo, getDocs as Ks, updateDoc as yo, doc as Mt, serverTimestamp as He, getDoc as tn, setDoc as Gs, addDoc as Pl, deleteDoc as jl, limit as Ul } from "firebase/firestore";
import { useRoute as rn, useRouter as ds, RouterLink as Ot, RouterView as zl } from "vue-router";
import { ref as Hl, uploadBytes as Vl, getDownloadURL as Kl } from "firebase/storage";
let hi = null;
function Gl(s) {
  hi = s;
}
function _e() {
  if (!hi)
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  return hi;
}
const sn = "users";
async function Wl(s) {
  const { firestore: e } = _e(), t = Mt(e, sn, s.uid);
  if (!(await tn(t)).exists()) {
    await Gs(t, {
      email: s.email ?? "",
      role: null,
      lastLoginAt: He(),
      createdAt: He(),
      updatedAt: He()
    });
    return;
  }
  await Gs(
    t,
    {
      email: s.email ?? "",
      lastLoginAt: He(),
      updatedAt: He()
    },
    { merge: !0 }
  );
}
async function Zl(s) {
  const { firestore: e } = _e(), t = await tn(Mt(e, sn, s));
  return t.exists() ? vo(t.data().role) : null;
}
async function Yl() {
  const { firestore: s } = _e(), e = go(rs(s, sn), bo("email", "asc"));
  return (await Ks(e)).docs.map((r) => ({
    id: r.id,
    email: String(r.data().email ?? ""),
    role: vo(r.data().role),
    lastLoginAt: r.data().lastLoginAt,
    createdAt: r.data().createdAt,
    updatedAt: r.data().updatedAt
  }));
}
async function Xl(s, e) {
  const { firestore: t } = _e();
  await yo(Mt(t, sn, s), {
    role: e,
    updatedAt: He()
  });
}
function vo(s) {
  return s === "admin" || s === "writer" || s === "manager" ? s : null;
}
const ss = re(null), xo = re(!1), Er = re(null);
let zs = null, Ql = new Promise((s) => {
  zs = s;
}), sa = !1;
function Jl() {
  if (sa)
    return;
  const { auth: s } = _e();
  ss.value = s.currentUser, Dl(s, async (e) => {
    ss.value = e, Er.value = null, e && await Oi(e), xo.value = !0, zs && (zs(), zs = null);
  }), sa = !0;
}
async function ec() {
  xo.value || await Ql;
}
async function tc(s, e) {
  const { auth: t } = _e();
  await ho(t, fo);
  const r = await Fl(t, s, e);
  await Oi(r.user);
}
async function rc(s, e) {
  const { auth: t } = _e();
  await ho(t, fo);
  const r = await Ml(t, s, e);
  await Oi(r.user);
}
async function sc() {
  const { auth: s } = _e();
  await Bl(s);
}
async function Oi(s) {
  try {
    await Wl(s), Er.value = await Zl(s.uid);
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
function nc(s) {
  fi = {
    ...fi,
    ...s
  };
}
function Ii() {
  return fi;
}
const ic = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, ac = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, oc = ["disabled"], lc = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, cc = /* @__PURE__ */ Tt({
  __name: "LoginPage",
  setup(s) {
    const e = rn(), t = ds(), { basePath: r, registerPath: n } = Ii(), i = re(""), o = re(""), l = re(!1), c = re("");
    async function d() {
      c.value = "", l.value = !0;
      try {
        await rc(i.value, o.value);
        const b = typeof e.query.redirect == "string" ? e.query.redirect : r;
        await t.push(b);
      } catch {
        c.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (b, m) => (B(), D("main", ic, [
      m[6] || (m[6] = v("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Ingresar", -1)),
      m[7] || (m[7] = v("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Accede para administrar contenido y esquemas.", -1)),
      v("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        v("div", null, [
          m[2] || (m[2] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          Qr(v("input", {
            "onUpdate:modelValue": m[0] || (m[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [Jr, i.value]
          ])
        ]),
        v("div", null, [
          m[3] || (m[3] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          Qr(v("input", {
            "onUpdate:modelValue": m[1] || (m[1] = (h) => o.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "********"
          }, null, 512), [
            [Jr, o.value]
          ])
        ]),
        c.value ? (B(), D("p", ac, te(c.value), 1)) : ae("", !0),
        v("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, te(l.value ? "Ingresando..." : "Entrar"), 9, oc)
      ], 32),
      v("p", lc, [
        m[5] || (m[5] = Ve(" ¿No tienes cuenta? ", -1)),
        At(Re(Ot), {
          to: Re(n),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: qt(() => [...m[4] || (m[4] = [
            Ve("Crear cuenta", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), uc = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, dc = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, hc = ["disabled"], fc = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, pc = /* @__PURE__ */ Tt({
  __name: "RegisterPage",
  setup(s) {
    const e = ds(), { basePath: t, loginPath: r } = Ii(), n = re(""), i = re(""), o = re(""), l = re(!1), c = re("");
    async function d() {
      if (c.value = "", i.value !== o.value) {
        c.value = "Las contraseñas no coinciden.";
        return;
      }
      l.value = !0;
      try {
        await tc(n.value, i.value), await e.push(t);
      } catch {
        c.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (b, m) => (B(), D("main", uc, [
      m[8] || (m[8] = v("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Crear cuenta", -1)),
      m[9] || (m[9] = v("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Registro para administrar contenido.", -1)),
      v("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        v("div", null, [
          m[3] || (m[3] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          Qr(v("input", {
            "onUpdate:modelValue": m[0] || (m[0] = (h) => n.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [Jr, n.value]
          ])
        ]),
        v("div", null, [
          m[4] || (m[4] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          Qr(v("input", {
            "onUpdate:modelValue": m[1] || (m[1] = (h) => i.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Mínimo 6 caracteres"
          }, null, 512), [
            [Jr, i.value]
          ])
        ]),
        v("div", null, [
          m[5] || (m[5] = v("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Confirmar contraseña", -1)),
          Qr(v("input", {
            "onUpdate:modelValue": m[2] || (m[2] = (h) => o.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [Jr, o.value]
          ])
        ]),
        c.value ? (B(), D("p", dc, te(c.value), 1)) : ae("", !0),
        v("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, te(l.value ? "Creando cuenta..." : "Registrarme"), 9, hc)
      ], 32),
      v("p", fc, [
        m[7] || (m[7] = Ve(" ¿Ya tienes cuenta? ", -1)),
        At(Re(Ot), {
          to: Re(r),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: qt(() => [...m[6] || (m[6] = [
            Ve("Iniciar sesión", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), wo = "cmsSchemas", Ao = "schema", Eo = "main", mc = 3e4;
let Hs = null, pi = 0, Kr = null;
async function Ri() {
  const s = Date.now();
  if (Hs && s - pi < mc)
    return Hs;
  if (Kr)
    return Kr;
  const { firestore: e } = _e();
  Kr = (async () => {
    const r = (await Ks(rs(e, wo))).docs.map((n) => {
      const i = n.data();
      return No({ ...i, id: n.id });
    }).sort((n, i) => n.title.localeCompare(i.title, "es"));
    return Hs = r, pi = Date.now(), r;
  })();
  try {
    return await Kr;
  } finally {
    Kr = null;
  }
}
async function gc(s) {
  const { firestore: e } = _e(), t = No(s), r = Mt(e, wo, t.id);
  await Gs(
    r,
    {
      ...t,
      updatedAt: He(),
      createdAt: He()
    },
    { merge: !0 }
  ), bc();
}
function bc() {
  Hs = null, pi = 0;
}
function No(s) {
  const e = s;
  let t = [];
  const r = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((c) => Ws(c)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([c, d]) => Ws({ key: c, ...d })
  ));
  const n = typeof e.dictionaryDocumentId == "string" ? e.dictionaryDocumentId : "", i = typeof e.dictionaryRootKey == "string" ? e.dictionaryRootKey : "", o = r === "dictionary" ? xc(n || Eo) : "", l = r === "dictionary" ? wc(i || Ao) : "";
  return {
    id: yc(String(e.id ?? "tipo-contenido")),
    title: String(e.title ?? "Tipo de contenido"),
    description: typeof e.description == "string" ? e.description : "",
    storageType: r,
    collectionName: vc(String(e.collectionName ?? "registros")),
    dictionaryDocumentId: o,
    dictionaryRootKey: l,
    slugFromField: typeof e.slugFromField == "string" ? e.slugFromField : "",
    previewField: typeof e.previewField == "string" ? e.previewField : "",
    fields: t
  };
}
function Ws(s) {
  const e = _o(s.type), t = {
    key: $i(String(s.key ?? "campo")),
    label: String(s.label ?? "Campo"),
    type: e,
    required: !!s.required,
    placeholder: typeof s.placeholder == "string" ? s.placeholder : "",
    helpText: typeof s.helpText == "string" ? s.helpText : "",
    options: So(s.options),
    documentSchemaId: e === "document" ? Co(typeof s.documentSchemaId == "string" ? s.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Lo(typeof s.documentLabelField == "string" ? s.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = To(
    ko(s.itemSchema) ? s.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(s.mapFields) ? s.mapFields.map((r) => Ws(r)) : [] : delete t.mapFields, t;
}
function To(s) {
  const e = _o(s.type), t = {
    type: e,
    required: !!s.required,
    placeholder: typeof s.placeholder == "string" ? s.placeholder : "",
    helpText: typeof s.helpText == "string" ? s.helpText : "",
    options: So(s.options),
    documentSchemaId: e === "document" ? Co(typeof s.documentSchemaId == "string" ? s.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Lo(typeof s.documentLabelField == "string" ? s.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = To(
    ko(s.itemSchema) ? s.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(s.mapFields) ? s.mapFields.map((r) => Ws(r)) : [] : delete t.mapFields, t;
}
function _o(s) {
  return s === "textarea" || s === "richtext" || s === "image" || s === "select" || s === "document" || s === "boolean" || s === "array" || s === "map" ? s : "text";
}
function So(s) {
  return Array.isArray(s) ? s.map((e) => String(e).trim()).filter(Boolean) : [];
}
function ko(s) {
  return !!s && typeof s == "object" && !Array.isArray(s);
}
function $i(s) {
  return s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function yc(s) {
  return s.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function vc(s) {
  return $i(s);
}
function xc(s) {
  return String(s).trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || Eo;
}
function wc(s) {
  return String(s).trim().replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "") || Ao;
}
function Co(s) {
  return String(s).trim().replace(/[^a-zA-Z0-9_-]/g, "").replace(/-+/g, "-");
}
function Lo(s) {
  const e = String(s ?? "").trim();
  return e ? $i(e) : "";
}
const Ac = { class: "cms-root-fixed-height overflow-hidden bg-slate-100" }, Ec = { class: "cms-sidebar-header mb-3 flex items-center justify-between lg:mb-0" }, Nc = { class: "text-sm font-black uppercase tracking-wide text-slate-700" }, Tc = { class: "cms-sidebar-scroll space-y-2" }, _c = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Sc = { class: "flex items-start justify-between gap-2" }, kc = { class: "material-symbols-outlined text-base leading-none" }, Cc = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Lc = { class: "font-semibold" }, qc = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Oc = {
  key: 1,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Ic = {
  key: 0,
  class: "space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3"
}, Rc = { class: "font-semibold" }, $c = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Bc = { class: "flex items-start justify-between gap-2" }, Dc = { class: "material-symbols-outlined text-base leading-none" }, Mc = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Fc = { class: "font-semibold" }, Pc = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, jc = { class: "cms-sidebar-footer" }, Uc = { class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2" }, zc = {
  type: "button",
  class: "min-w-0 flex-1 rounded-md bg-white px-3 py-2 text-left text-xs text-slate-700"
}, Hc = { class: "truncate text-slate-600" }, Vc = { class: "mx-auto w-full max-w-7xl space-y-6" }, Kc = { class: "text-xl font-black text-slate-900" }, Gc = { class: "mt-3" }, Wc = /* @__PURE__ */ Tt({
  __name: "AdminLayoutPage",
  setup(s) {
    const e = rn(), t = ds(), { basePath: r, loginPath: n, homePath: i } = Ii(), o = re([]), l = re(!1), c = re(!0), d = re(!0), b = re(!0);
    us(async () => {
      await m(), typeof window < "u" && window.innerWidth < 1024 && (b.value = !1), window.addEventListener("cms-schemas-updated", q);
    }), po(() => {
      window.removeEventListener("cms-schemas-updated", q);
    }), Xt(
      () => e.fullPath,
      () => {
        e.path.startsWith(`${r}/content`) && (c.value = !0, m()), e.path.startsWith(`${r}/schemas`) && (d.value = !0, m()), typeof window < "u" && window.innerWidth < 1024 && (b.value = !1);
      }
    );
    async function m() {
      l.value = !0;
      try {
        o.value = await Ri();
      } finally {
        l.value = !1;
      }
    }
    const h = Ce(() => e.path.startsWith(`${r}/content`)), p = Ce(() => e.path.startsWith(`${r}/schemas`)), E = Ce(() => o.value.filter((y) => y.storageType === "document")), N = Ce(() => o.value.filter((y) => y.storageType === "dictionary"));
    function C(y) {
      return e.path.startsWith(y);
    }
    function q() {
      m();
    }
    function F(y) {
      return {
        path: `${r}/content`,
        query: { schema: y }
      };
    }
    function z(y) {
      return {
        path: `${r}/schemas`,
        query: { schema: y }
      };
    }
    function Y(y) {
      if (!h.value)
        return !1;
      const S = typeof e.query.schema == "string" ? e.query.schema : "";
      return S ? S === y : o.value[0]?.id === y;
    }
    function G(y) {
      if (!p.value)
        return !1;
      const S = typeof e.query.schema == "string" ? e.query.schema : "";
      return S ? S === y : o.value[0]?.id === y;
    }
    function oe() {
      c.value = !c.value;
    }
    function U() {
      d.value = !d.value;
    }
    function H() {
      b.value = !b.value;
    }
    function le() {
      b.value = !1;
    }
    function ee(y) {
      return /^(https?:)?\/\//i.test(y);
    }
    async function f() {
      if (i) {
        if (ee(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await t.push(i);
      }
    }
    async function $() {
      await sc(), await t.push(n);
    }
    const T = Ce(() => ss.value?.email || "Sin correo"), P = Ce(() => {
      try {
        const y = _e().auth.app.options.projectId;
        if (typeof y == "string" && y.trim().length > 0)
          return y;
      } catch {
      }
      return "Panel";
    }), w = Ce(() => {
      if (e.path.startsWith(`${r}/content`)) {
        const y = typeof e.query.schema == "string" ? e.query.schema : "", S = o.value.find((A) => A.id === y) ?? o.value[0] ?? null;
        return S ? `Contenido · ${S.title}` : "Contenido";
      }
      return e.path.startsWith(`${r}/schemas`) ? "Esquemas" : e.path.startsWith(`${r}/users`) ? "Usuarios" : "Dashboard";
    });
    return (y, S) => (B(), D("main", Ac, [
      b.value ? ae("", !0) : (B(), D("button", {
        key: 0,
        type: "button",
        "aria-label": "Abrir sidebar",
        class: "fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg border border-l-0 border-slate-300 bg-white px-2 py-3 text-slate-700 shadow-lg hover:bg-slate-50",
        onClick: H
      }, [...S[0] || (S[0] = [
        v("span", { class: "material-symbols-outlined text-lg" }, "left_panel_open", -1)
      ])])),
      b.value ? (B(), D("div", {
        key: 1,
        class: "fixed inset-0 z-30 bg-slate-900/20 lg:hidden",
        onClick: le
      })) : ae("", !0),
      v("aside", {
        class: rt(["cms-sidebar-panel cms-sidebar-fixed-height fixed inset-y-0 left-0 z-40 w-80 border-r border-slate-200 bg-white shadow-xl transition-transform duration-200", b.value ? "cms-sidebar-open" : "cms-sidebar-closed"])
      }, [
        v("div", Ec, [
          v("h2", Nc, te(P.value), 1),
          v("div", { class: "flex items-center gap-2" }, [
            v("button", {
              type: "button",
              "aria-label": "Ir a inicio",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: f
            }, [...S[1] || (S[1] = [
              v("span", { class: "material-symbols-outlined text-lg" }, "home", -1)
            ])]),
            v("button", {
              type: "button",
              "aria-label": "Cerrar sidebar",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: le
            }, [...S[2] || (S[2] = [
              v("span", { class: "material-symbols-outlined text-lg" }, "left_panel_close", -1)
            ])])
          ])
        ]),
        v("div", Tc, [
          v("div", _c, [
            v("div", Sc, [
              At(Re(Ot), {
                to: `${Re(r)}/content`,
                class: "min-w-0 flex-1"
              }, {
                default: qt(() => [...S[3] || (S[3] = [
                  v("p", { class: "text-sm font-black" }, "Contenido", -1),
                  v("p", { class: "text-xs text-slate-500" }, " Formularios y registros ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              v("button", {
                type: "button",
                "aria-label": "Expandir o contraer contenido",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: oe
              }, [
                v("span", kc, te(c.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            c.value ? (B(), D("div", Cc, [
              (B(!0), D(Be, null, De(N.value, (A) => (B(), Yt(Re(Ot), {
                key: A.id,
                to: F(A.id),
                class: rt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  Y(A.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: qt(() => [
                  v("p", Lc, te(A.title), 1),
                  v("p", {
                    class: rt(Y(A.id) ? "text-slate-300" : "text-slate-500")
                  }, te(A.storageType) + " · " + te(A.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (B(), D("p", qc, " Cargando elementos... ")) : N.value.length ? ae("", !0) : (B(), D("p", Oc, " No hay diccionarios configurados. "))
            ])) : ae("", !0)
          ]),
          E.value.length ? (B(), D("div", Ic, [
            S[4] || (S[4] = v("p", { class: "px-1 text-[11px] font-black uppercase tracking-wide text-slate-500" }, "Documentos", -1)),
            (B(!0), D(Be, null, De(E.value, (A) => (B(), Yt(Re(Ot), {
              key: `document-link-${A.id}`,
              to: F(A.id),
              class: rt([
                "block rounded-lg border px-2 py-1.5 text-xs transition",
                Y(A.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              ])
            }, {
              default: qt(() => [
                v("p", Rc, te(A.title), 1),
                v("p", {
                  class: rt(Y(A.id) ? "text-slate-300" : "text-slate-500")
                }, " document · " + te(A.collectionName), 3)
              ]),
              _: 2
            }, 1032, ["to", "class"]))), 128))
          ])) : ae("", !0),
          v("div", $c, [
            v("div", Bc, [
              At(Re(Ot), {
                to: `${Re(r)}/schemas`,
                class: "min-w-0 flex-1"
              }, {
                default: qt(() => [...S[5] || (S[5] = [
                  v("p", { class: "text-sm font-black" }, "Esquemas", -1),
                  v("p", { class: "text-xs text-slate-500" }, " Edición de esquemas ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              v("button", {
                type: "button",
                "aria-label": "Expandir o contraer esquemas",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: U
              }, [
                v("span", Dc, te(d.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            d.value ? (B(), D("div", Mc, [
              (B(!0), D(Be, null, De(o.value, (A) => (B(), Yt(Re(Ot), {
                key: `schema-edit-${A.id}`,
                to: z(A.id),
                class: rt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  G(A.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: qt(() => [
                  v("p", Fc, te(A.title), 1),
                  v("p", {
                    class: rt(G(A.id) ? "text-slate-300" : "text-slate-500")
                  }, te(A.storageType) + " · " + te(A.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (B(), D("p", Pc, " Cargando elementos... ")) : ae("", !0)
            ])) : ae("", !0)
          ]),
          At(Re(Ot), {
            to: `${Re(r)}/users`,
            class: rt([
              "block rounded-xl border p-3 transition",
              C(`${Re(r)}/users`) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            ])
          }, {
            default: qt(() => [
              S[6] || (S[6] = v("p", { class: "text-sm font-black" }, "Usuarios", -1)),
              v("p", {
                class: rt(["text-xs", C(`${Re(r)}/users`) ? "text-slate-200" : "text-slate-500"])
              }, " Roles y último ingreso ", 2)
            ]),
            _: 1
          }, 8, ["to", "class"])
        ]),
        v("div", jc, [
          v("div", Uc, [
            v("button", zc, [
              S[7] || (S[7] = v("p", { class: "font-semibold text-slate-900" }, "Cuenta actual", -1)),
              v("p", Hc, te(T.value), 1)
            ]),
            v("button", {
              type: "button",
              "aria-label": "Cerrar sesión",
              class: "rounded-md border border-slate-300 bg-white px-2 py-2 text-slate-700 hover:bg-slate-100",
              onClick: $
            }, [...S[8] || (S[8] = [
              v("span", { class: "material-symbols-outlined text-lg" }, "logout", -1)
            ])])
          ])
        ])
      ], 2),
      v("section", {
        class: rt(["cms-content-fixed-height min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8", b.value ? "cms-content-with-open-sidebar" : ""])
      }, [
        v("div", Vc, [
          S[9] || (S[9] = v("section", null, [
            v("h1", { class: "text-3xl font-black text-slate-900" }, "Dashboard"),
            v("p", { class: "mt-2 text-sm text-slate-600" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          v("section", null, [
            v("h2", Kc, te(w.value), 1),
            v("div", Gc, [
              At(Re(zl))
            ])
          ])
        ])
      ], 2)
    ]));
  }
}), Zc = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, n] of e)
    t[r] = n;
  return t;
}, Yc = /* @__PURE__ */ Zc(Wc, [["__scopeId", "data-v-ef22c520"]]);
var qo = typeof global == "object" && global && global.Object === Object && global, Xc = typeof self == "object" && self && self.Object === Object && self, mt = qo || Xc || Function("return this")(), Dt = mt.Symbol, Oo = Object.prototype, Qc = Oo.hasOwnProperty, Jc = Oo.toString, Gr = Dt ? Dt.toStringTag : void 0;
function eu(s) {
  var e = Qc.call(s, Gr), t = s[Gr];
  try {
    s[Gr] = void 0;
    var r = !0;
  } catch {
  }
  var n = Jc.call(s);
  return r && (e ? s[Gr] = t : delete s[Gr]), n;
}
var tu = Object.prototype, ru = tu.toString;
function su(s) {
  return ru.call(s);
}
var nu = "[object Null]", iu = "[object Undefined]", na = Dt ? Dt.toStringTag : void 0;
function Lr(s) {
  return s == null ? s === void 0 ? iu : nu : na && na in Object(s) ? eu(s) : su(s);
}
function Et(s) {
  return s != null && typeof s == "object";
}
var Qt = Array.isArray;
function Ft(s) {
  var e = typeof s;
  return s != null && (e == "object" || e == "function");
}
function Io(s) {
  return s;
}
var au = "[object AsyncFunction]", ou = "[object Function]", lu = "[object GeneratorFunction]", cu = "[object Proxy]";
function Bi(s) {
  if (!Ft(s))
    return !1;
  var e = Lr(s);
  return e == ou || e == lu || e == au || e == cu;
}
var Qn = mt["__core-js_shared__"], ia = (function() {
  var s = /[^.]+$/.exec(Qn && Qn.keys && Qn.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
})();
function uu(s) {
  return !!ia && ia in s;
}
var du = Function.prototype, hu = du.toString;
function rr(s) {
  if (s != null) {
    try {
      return hu.call(s);
    } catch {
    }
    try {
      return s + "";
    } catch {
    }
  }
  return "";
}
var fu = /[\\^$.*+?()[\]{}|]/g, pu = /^\[object .+?Constructor\]$/, mu = Function.prototype, gu = Object.prototype, bu = mu.toString, yu = gu.hasOwnProperty, vu = RegExp(
  "^" + bu.call(yu).replace(fu, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function xu(s) {
  if (!Ft(s) || uu(s))
    return !1;
  var e = Bi(s) ? vu : pu;
  return e.test(rr(s));
}
function wu(s, e) {
  return s?.[e];
}
function sr(s, e) {
  var t = wu(s, e);
  return xu(t) ? t : void 0;
}
var mi = sr(mt, "WeakMap"), aa = Object.create, Au = /* @__PURE__ */ (function() {
  function s() {
  }
  return function(e) {
    if (!Ft(e))
      return {};
    if (aa)
      return aa(e);
    s.prototype = e;
    var t = new s();
    return s.prototype = void 0, t;
  };
})();
function Eu(s, e, t) {
  switch (t.length) {
    case 0:
      return s.call(e);
    case 1:
      return s.call(e, t[0]);
    case 2:
      return s.call(e, t[0], t[1]);
    case 3:
      return s.call(e, t[0], t[1], t[2]);
  }
  return s.apply(e, t);
}
function Nu(s, e) {
  var t = -1, r = s.length;
  for (e || (e = Array(r)); ++t < r; )
    e[t] = s[t];
  return e;
}
var Tu = 800, _u = 16, Su = Date.now;
function ku(s) {
  var e = 0, t = 0;
  return function() {
    var r = Su(), n = _u - (r - t);
    if (t = r, n > 0) {
      if (++e >= Tu)
        return arguments[0];
    } else
      e = 0;
    return s.apply(void 0, arguments);
  };
}
function Cu(s) {
  return function() {
    return s;
  };
}
var Zs = (function() {
  try {
    var s = sr(Object, "defineProperty");
    return s({}, "", {}), s;
  } catch {
  }
})(), Lu = Zs ? function(s, e) {
  return Zs(s, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Cu(e),
    writable: !0
  });
} : Io, qu = ku(Lu);
function Ou(s, e) {
  for (var t = -1, r = s == null ? 0 : s.length; ++t < r && e(s[t], t, s) !== !1; )
    ;
  return s;
}
var Iu = 9007199254740991, Ru = /^(?:0|[1-9]\d*)$/;
function Ro(s, e) {
  var t = typeof s;
  return e = e ?? Iu, !!e && (t == "number" || t != "symbol" && Ru.test(s)) && s > -1 && s % 1 == 0 && s < e;
}
function Di(s, e, t) {
  e == "__proto__" && Zs ? Zs(s, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : s[e] = t;
}
function hs(s, e) {
  return s === e || s !== s && e !== e;
}
var $u = Object.prototype, Bu = $u.hasOwnProperty;
function $o(s, e, t) {
  var r = s[e];
  (!(Bu.call(s, e) && hs(r, t)) || t === void 0 && !(e in s)) && Di(s, e, t);
}
function Du(s, e, t, r) {
  var n = !t;
  t || (t = {});
  for (var i = -1, o = e.length; ++i < o; ) {
    var l = e[i], c = void 0;
    c === void 0 && (c = s[l]), n ? Di(t, l, c) : $o(t, l, c);
  }
  return t;
}
var oa = Math.max;
function Mu(s, e, t) {
  return e = oa(e === void 0 ? s.length - 1 : e, 0), function() {
    for (var r = arguments, n = -1, i = oa(r.length - e, 0), o = Array(i); ++n < i; )
      o[n] = r[e + n];
    n = -1;
    for (var l = Array(e + 1); ++n < e; )
      l[n] = r[n];
    return l[e] = t(o), Eu(s, this, l);
  };
}
function Fu(s, e) {
  return qu(Mu(s, e, Io), s + "");
}
var Pu = 9007199254740991;
function Bo(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= Pu;
}
function nn(s) {
  return s != null && Bo(s.length) && !Bi(s);
}
function ju(s, e, t) {
  if (!Ft(t))
    return !1;
  var r = typeof e;
  return (r == "number" ? nn(t) && Ro(e, t.length) : r == "string" && e in t) ? hs(t[e], s) : !1;
}
function Uu(s) {
  return Fu(function(e, t) {
    var r = -1, n = t.length, i = n > 1 ? t[n - 1] : void 0, o = n > 2 ? t[2] : void 0;
    for (i = s.length > 3 && typeof i == "function" ? (n--, i) : void 0, o && ju(t[0], t[1], o) && (i = n < 3 ? void 0 : i, n = 1), e = Object(e); ++r < n; ) {
      var l = t[r];
      l && s(e, l, r, i);
    }
    return e;
  });
}
var zu = Object.prototype;
function Mi(s) {
  var e = s && s.constructor, t = typeof e == "function" && e.prototype || zu;
  return s === t;
}
function Hu(s, e) {
  for (var t = -1, r = Array(s); ++t < s; )
    r[t] = e(t);
  return r;
}
var Vu = "[object Arguments]";
function la(s) {
  return Et(s) && Lr(s) == Vu;
}
var Do = Object.prototype, Ku = Do.hasOwnProperty, Gu = Do.propertyIsEnumerable, gi = la(/* @__PURE__ */ (function() {
  return arguments;
})()) ? la : function(s) {
  return Et(s) && Ku.call(s, "callee") && !Gu.call(s, "callee");
};
function Wu() {
  return !1;
}
var Mo = typeof exports == "object" && exports && !exports.nodeType && exports, ca = Mo && typeof module == "object" && module && !module.nodeType && module, Zu = ca && ca.exports === Mo, ua = Zu ? mt.Buffer : void 0, Yu = ua ? ua.isBuffer : void 0, ns = Yu || Wu, Xu = "[object Arguments]", Qu = "[object Array]", Ju = "[object Boolean]", ed = "[object Date]", td = "[object Error]", rd = "[object Function]", sd = "[object Map]", nd = "[object Number]", id = "[object Object]", ad = "[object RegExp]", od = "[object Set]", ld = "[object String]", cd = "[object WeakMap]", ud = "[object ArrayBuffer]", dd = "[object DataView]", hd = "[object Float32Array]", fd = "[object Float64Array]", pd = "[object Int8Array]", md = "[object Int16Array]", gd = "[object Int32Array]", bd = "[object Uint8Array]", yd = "[object Uint8ClampedArray]", vd = "[object Uint16Array]", xd = "[object Uint32Array]", we = {};
we[hd] = we[fd] = we[pd] = we[md] = we[gd] = we[bd] = we[yd] = we[vd] = we[xd] = !0;
we[Xu] = we[Qu] = we[ud] = we[Ju] = we[dd] = we[ed] = we[td] = we[rd] = we[sd] = we[nd] = we[id] = we[ad] = we[od] = we[ld] = we[cd] = !1;
function wd(s) {
  return Et(s) && Bo(s.length) && !!we[Lr(s)];
}
function Fi(s) {
  return function(e) {
    return s(e);
  };
}
var Fo = typeof exports == "object" && exports && !exports.nodeType && exports, es = Fo && typeof module == "object" && module && !module.nodeType && module, Ad = es && es.exports === Fo, Jn = Ad && qo.process, kr = (function() {
  try {
    var s = es && es.require && es.require("util").types;
    return s || Jn && Jn.binding && Jn.binding("util");
  } catch {
  }
})(), da = kr && kr.isTypedArray, Pi = da ? Fi(da) : wd, Ed = Object.prototype, Nd = Ed.hasOwnProperty;
function Po(s, e) {
  var t = Qt(s), r = !t && gi(s), n = !t && !r && ns(s), i = !t && !r && !n && Pi(s), o = t || r || n || i, l = o ? Hu(s.length, String) : [], c = l.length;
  for (var d in s)
    (e || Nd.call(s, d)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Ro(d, c))) && l.push(d);
  return l;
}
function jo(s, e) {
  return function(t) {
    return s(e(t));
  };
}
var Td = jo(Object.keys, Object), _d = Object.prototype, Sd = _d.hasOwnProperty;
function kd(s) {
  if (!Mi(s))
    return Td(s);
  var e = [];
  for (var t in Object(s))
    Sd.call(s, t) && t != "constructor" && e.push(t);
  return e;
}
function Cd(s) {
  return nn(s) ? Po(s) : kd(s);
}
function Ld(s) {
  var e = [];
  if (s != null)
    for (var t in Object(s))
      e.push(t);
  return e;
}
var qd = Object.prototype, Od = qd.hasOwnProperty;
function Id(s) {
  if (!Ft(s))
    return Ld(s);
  var e = Mi(s), t = [];
  for (var r in s)
    r == "constructor" && (e || !Od.call(s, r)) || t.push(r);
  return t;
}
function Uo(s) {
  return nn(s) ? Po(s, !0) : Id(s);
}
var is = sr(Object, "create");
function Rd() {
  this.__data__ = is ? is(null) : {}, this.size = 0;
}
function $d(s) {
  var e = this.has(s) && delete this.__data__[s];
  return this.size -= e ? 1 : 0, e;
}
var Bd = "__lodash_hash_undefined__", Dd = Object.prototype, Md = Dd.hasOwnProperty;
function Fd(s) {
  var e = this.__data__;
  if (is) {
    var t = e[s];
    return t === Bd ? void 0 : t;
  }
  return Md.call(e, s) ? e[s] : void 0;
}
var Pd = Object.prototype, jd = Pd.hasOwnProperty;
function Ud(s) {
  var e = this.__data__;
  return is ? e[s] !== void 0 : jd.call(e, s);
}
var zd = "__lodash_hash_undefined__";
function Hd(s, e) {
  var t = this.__data__;
  return this.size += this.has(s) ? 0 : 1, t[s] = is && e === void 0 ? zd : e, this;
}
function Jt(s) {
  var e = -1, t = s == null ? 0 : s.length;
  for (this.clear(); ++e < t; ) {
    var r = s[e];
    this.set(r[0], r[1]);
  }
}
Jt.prototype.clear = Rd;
Jt.prototype.delete = $d;
Jt.prototype.get = Fd;
Jt.prototype.has = Ud;
Jt.prototype.set = Hd;
function Vd() {
  this.__data__ = [], this.size = 0;
}
function an(s, e) {
  for (var t = s.length; t--; )
    if (hs(s[t][0], e))
      return t;
  return -1;
}
var Kd = Array.prototype, Gd = Kd.splice;
function Wd(s) {
  var e = this.__data__, t = an(e, s);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : Gd.call(e, t, 1), --this.size, !0;
}
function Zd(s) {
  var e = this.__data__, t = an(e, s);
  return t < 0 ? void 0 : e[t][1];
}
function Yd(s) {
  return an(this.__data__, s) > -1;
}
function Xd(s, e) {
  var t = this.__data__, r = an(t, s);
  return r < 0 ? (++this.size, t.push([s, e])) : t[r][1] = e, this;
}
function _t(s) {
  var e = -1, t = s == null ? 0 : s.length;
  for (this.clear(); ++e < t; ) {
    var r = s[e];
    this.set(r[0], r[1]);
  }
}
_t.prototype.clear = Vd;
_t.prototype.delete = Wd;
_t.prototype.get = Zd;
_t.prototype.has = Yd;
_t.prototype.set = Xd;
var as = sr(mt, "Map");
function Qd() {
  this.size = 0, this.__data__ = {
    hash: new Jt(),
    map: new (as || _t)(),
    string: new Jt()
  };
}
function Jd(s) {
  var e = typeof s;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? s !== "__proto__" : s === null;
}
function on(s, e) {
  var t = s.__data__;
  return Jd(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function eh(s) {
  var e = on(this, s).delete(s);
  return this.size -= e ? 1 : 0, e;
}
function th(s) {
  return on(this, s).get(s);
}
function rh(s) {
  return on(this, s).has(s);
}
function sh(s, e) {
  var t = on(this, s), r = t.size;
  return t.set(s, e), this.size += t.size == r ? 0 : 1, this;
}
function nr(s) {
  var e = -1, t = s == null ? 0 : s.length;
  for (this.clear(); ++e < t; ) {
    var r = s[e];
    this.set(r[0], r[1]);
  }
}
nr.prototype.clear = Qd;
nr.prototype.delete = eh;
nr.prototype.get = th;
nr.prototype.has = rh;
nr.prototype.set = sh;
function nh(s, e) {
  for (var t = -1, r = e.length, n = s.length; ++t < r; )
    s[n + t] = e[t];
  return s;
}
var zo = jo(Object.getPrototypeOf, Object), ih = "[object Object]", ah = Function.prototype, oh = Object.prototype, Ho = ah.toString, lh = oh.hasOwnProperty, ch = Ho.call(Object);
function uh(s) {
  if (!Et(s) || Lr(s) != ih)
    return !1;
  var e = zo(s);
  if (e === null)
    return !0;
  var t = lh.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Ho.call(t) == ch;
}
function dh() {
  this.__data__ = new _t(), this.size = 0;
}
function hh(s) {
  var e = this.__data__, t = e.delete(s);
  return this.size = e.size, t;
}
function fh(s) {
  return this.__data__.get(s);
}
function ph(s) {
  return this.__data__.has(s);
}
var mh = 200;
function gh(s, e) {
  var t = this.__data__;
  if (t instanceof _t) {
    var r = t.__data__;
    if (!as || r.length < mh - 1)
      return r.push([s, e]), this.size = ++t.size, this;
    t = this.__data__ = new nr(r);
  }
  return t.set(s, e), this.size = t.size, this;
}
function ft(s) {
  var e = this.__data__ = new _t(s);
  this.size = e.size;
}
ft.prototype.clear = dh;
ft.prototype.delete = hh;
ft.prototype.get = fh;
ft.prototype.has = ph;
ft.prototype.set = gh;
var Vo = typeof exports == "object" && exports && !exports.nodeType && exports, ha = Vo && typeof module == "object" && module && !module.nodeType && module, bh = ha && ha.exports === Vo, fa = bh ? mt.Buffer : void 0, pa = fa ? fa.allocUnsafe : void 0;
function Ko(s, e) {
  if (e)
    return s.slice();
  var t = s.length, r = pa ? pa(t) : new s.constructor(t);
  return s.copy(r), r;
}
function yh(s, e) {
  for (var t = -1, r = s == null ? 0 : s.length, n = 0, i = []; ++t < r; ) {
    var o = s[t];
    e(o, t, s) && (i[n++] = o);
  }
  return i;
}
function vh() {
  return [];
}
var xh = Object.prototype, wh = xh.propertyIsEnumerable, ma = Object.getOwnPropertySymbols, Ah = ma ? function(s) {
  return s == null ? [] : (s = Object(s), yh(ma(s), function(e) {
    return wh.call(s, e);
  }));
} : vh;
function Eh(s, e, t) {
  var r = e(s);
  return Qt(s) ? r : nh(r, t(s));
}
function bi(s) {
  return Eh(s, Cd, Ah);
}
var yi = sr(mt, "DataView"), vi = sr(mt, "Promise"), xi = sr(mt, "Set"), ga = "[object Map]", Nh = "[object Object]", ba = "[object Promise]", ya = "[object Set]", va = "[object WeakMap]", xa = "[object DataView]", Th = rr(yi), _h = rr(as), Sh = rr(vi), kh = rr(xi), Ch = rr(mi), st = Lr;
(yi && st(new yi(new ArrayBuffer(1))) != xa || as && st(new as()) != ga || vi && st(vi.resolve()) != ba || xi && st(new xi()) != ya || mi && st(new mi()) != va) && (st = function(s) {
  var e = Lr(s), t = e == Nh ? s.constructor : void 0, r = t ? rr(t) : "";
  if (r)
    switch (r) {
      case Th:
        return xa;
      case _h:
        return ga;
      case Sh:
        return ba;
      case kh:
        return ya;
      case Ch:
        return va;
    }
  return e;
});
var Lh = Object.prototype, qh = Lh.hasOwnProperty;
function Oh(s) {
  var e = s.length, t = new s.constructor(e);
  return e && typeof s[0] == "string" && qh.call(s, "index") && (t.index = s.index, t.input = s.input), t;
}
var Ys = mt.Uint8Array;
function ji(s) {
  var e = new s.constructor(s.byteLength);
  return new Ys(e).set(new Ys(s)), e;
}
function Ih(s, e) {
  var t = ji(s.buffer);
  return new s.constructor(t, s.byteOffset, s.byteLength);
}
var Rh = /\w*$/;
function $h(s) {
  var e = new s.constructor(s.source, Rh.exec(s));
  return e.lastIndex = s.lastIndex, e;
}
var wa = Dt ? Dt.prototype : void 0, Aa = wa ? wa.valueOf : void 0;
function Bh(s) {
  return Aa ? Object(Aa.call(s)) : {};
}
function Go(s, e) {
  var t = e ? ji(s.buffer) : s.buffer;
  return new s.constructor(t, s.byteOffset, s.length);
}
var Dh = "[object Boolean]", Mh = "[object Date]", Fh = "[object Map]", Ph = "[object Number]", jh = "[object RegExp]", Uh = "[object Set]", zh = "[object String]", Hh = "[object Symbol]", Vh = "[object ArrayBuffer]", Kh = "[object DataView]", Gh = "[object Float32Array]", Wh = "[object Float64Array]", Zh = "[object Int8Array]", Yh = "[object Int16Array]", Xh = "[object Int32Array]", Qh = "[object Uint8Array]", Jh = "[object Uint8ClampedArray]", ef = "[object Uint16Array]", tf = "[object Uint32Array]";
function rf(s, e, t) {
  var r = s.constructor;
  switch (e) {
    case Vh:
      return ji(s);
    case Dh:
    case Mh:
      return new r(+s);
    case Kh:
      return Ih(s);
    case Gh:
    case Wh:
    case Zh:
    case Yh:
    case Xh:
    case Qh:
    case Jh:
    case ef:
    case tf:
      return Go(s, t);
    case Fh:
      return new r();
    case Ph:
    case zh:
      return new r(s);
    case jh:
      return $h(s);
    case Uh:
      return new r();
    case Hh:
      return Bh(s);
  }
}
function Wo(s) {
  return typeof s.constructor == "function" && !Mi(s) ? Au(zo(s)) : {};
}
var sf = "[object Map]";
function nf(s) {
  return Et(s) && st(s) == sf;
}
var Ea = kr && kr.isMap, af = Ea ? Fi(Ea) : nf, of = "[object Set]";
function lf(s) {
  return Et(s) && st(s) == of;
}
var Na = kr && kr.isSet, cf = Na ? Fi(Na) : lf, uf = 1, Zo = "[object Arguments]", df = "[object Array]", hf = "[object Boolean]", ff = "[object Date]", pf = "[object Error]", Yo = "[object Function]", mf = "[object GeneratorFunction]", gf = "[object Map]", bf = "[object Number]", Xo = "[object Object]", yf = "[object RegExp]", vf = "[object Set]", xf = "[object String]", wf = "[object Symbol]", Af = "[object WeakMap]", Ef = "[object ArrayBuffer]", Nf = "[object DataView]", Tf = "[object Float32Array]", _f = "[object Float64Array]", Sf = "[object Int8Array]", kf = "[object Int16Array]", Cf = "[object Int32Array]", Lf = "[object Uint8Array]", qf = "[object Uint8ClampedArray]", Of = "[object Uint16Array]", If = "[object Uint32Array]", ve = {};
ve[Zo] = ve[df] = ve[Ef] = ve[Nf] = ve[hf] = ve[ff] = ve[Tf] = ve[_f] = ve[Sf] = ve[kf] = ve[Cf] = ve[gf] = ve[bf] = ve[Xo] = ve[yf] = ve[vf] = ve[xf] = ve[wf] = ve[Lf] = ve[qf] = ve[Of] = ve[If] = !0;
ve[pf] = ve[Yo] = ve[Af] = !1;
function Vs(s, e, t, r, n, i) {
  var o, l = e & uf;
  if (o !== void 0)
    return o;
  if (!Ft(s))
    return s;
  var c = Qt(s);
  if (c)
    o = Oh(s);
  else {
    var d = st(s), b = d == Yo || d == mf;
    if (ns(s))
      return Ko(s, l);
    if (d == Xo || d == Zo || b && !n)
      o = b ? {} : Wo(s);
    else {
      if (!ve[d])
        return n ? s : {};
      o = rf(s, d, l);
    }
  }
  i || (i = new ft());
  var m = i.get(s);
  if (m)
    return m;
  i.set(s, o), cf(s) ? s.forEach(function(E) {
    o.add(Vs(E, e, t, E, s, i));
  }) : af(s) && s.forEach(function(E, N) {
    o.set(N, Vs(E, e, t, N, s, i));
  });
  var h = bi, p = c ? void 0 : h(s);
  return Ou(p || s, function(E, N) {
    p && (N = E, E = s[N]), $o(o, N, Vs(E, e, t, N, s, i));
  }), o;
}
var Rf = 1, $f = 4;
function Nr(s) {
  return Vs(s, Rf | $f);
}
var Bf = "__lodash_hash_undefined__";
function Df(s) {
  return this.__data__.set(s, Bf), this;
}
function Mf(s) {
  return this.__data__.has(s);
}
function Xs(s) {
  var e = -1, t = s == null ? 0 : s.length;
  for (this.__data__ = new nr(); ++e < t; )
    this.add(s[e]);
}
Xs.prototype.add = Xs.prototype.push = Df;
Xs.prototype.has = Mf;
function Ff(s, e) {
  for (var t = -1, r = s == null ? 0 : s.length; ++t < r; )
    if (e(s[t], t, s))
      return !0;
  return !1;
}
function Pf(s, e) {
  return s.has(e);
}
var jf = 1, Uf = 2;
function Qo(s, e, t, r, n, i) {
  var o = t & jf, l = s.length, c = e.length;
  if (l != c && !(o && c > l))
    return !1;
  var d = i.get(s), b = i.get(e);
  if (d && b)
    return d == e && b == s;
  var m = -1, h = !0, p = t & Uf ? new Xs() : void 0;
  for (i.set(s, e), i.set(e, s); ++m < l; ) {
    var E = s[m], N = e[m];
    if (r)
      var C = o ? r(N, E, m, e, s, i) : r(E, N, m, s, e, i);
    if (C !== void 0) {
      if (C)
        continue;
      h = !1;
      break;
    }
    if (p) {
      if (!Ff(e, function(q, F) {
        if (!Pf(p, F) && (E === q || n(E, q, t, r, i)))
          return p.push(F);
      })) {
        h = !1;
        break;
      }
    } else if (!(E === N || n(E, N, t, r, i))) {
      h = !1;
      break;
    }
  }
  return i.delete(s), i.delete(e), h;
}
function zf(s) {
  var e = -1, t = Array(s.size);
  return s.forEach(function(r, n) {
    t[++e] = [n, r];
  }), t;
}
function Hf(s) {
  var e = -1, t = Array(s.size);
  return s.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var Vf = 1, Kf = 2, Gf = "[object Boolean]", Wf = "[object Date]", Zf = "[object Error]", Yf = "[object Map]", Xf = "[object Number]", Qf = "[object RegExp]", Jf = "[object Set]", ep = "[object String]", tp = "[object Symbol]", rp = "[object ArrayBuffer]", sp = "[object DataView]", Ta = Dt ? Dt.prototype : void 0, ei = Ta ? Ta.valueOf : void 0;
function np(s, e, t, r, n, i, o) {
  switch (t) {
    case sp:
      if (s.byteLength != e.byteLength || s.byteOffset != e.byteOffset)
        return !1;
      s = s.buffer, e = e.buffer;
    case rp:
      return !(s.byteLength != e.byteLength || !i(new Ys(s), new Ys(e)));
    case Gf:
    case Wf:
    case Xf:
      return hs(+s, +e);
    case Zf:
      return s.name == e.name && s.message == e.message;
    case Qf:
    case ep:
      return s == e + "";
    case Yf:
      var l = zf;
    case Jf:
      var c = r & Vf;
      if (l || (l = Hf), s.size != e.size && !c)
        return !1;
      var d = o.get(s);
      if (d)
        return d == e;
      r |= Kf, o.set(s, e);
      var b = Qo(l(s), l(e), r, n, i, o);
      return o.delete(s), b;
    case tp:
      if (ei)
        return ei.call(s) == ei.call(e);
  }
  return !1;
}
var ip = 1, ap = Object.prototype, op = ap.hasOwnProperty;
function lp(s, e, t, r, n, i) {
  var o = t & ip, l = bi(s), c = l.length, d = bi(e), b = d.length;
  if (c != b && !o)
    return !1;
  for (var m = c; m--; ) {
    var h = l[m];
    if (!(o ? h in e : op.call(e, h)))
      return !1;
  }
  var p = i.get(s), E = i.get(e);
  if (p && E)
    return p == e && E == s;
  var N = !0;
  i.set(s, e), i.set(e, s);
  for (var C = o; ++m < c; ) {
    h = l[m];
    var q = s[h], F = e[h];
    if (r)
      var z = o ? r(F, q, h, e, s, i) : r(q, F, h, s, e, i);
    if (!(z === void 0 ? q === F || n(q, F, t, r, i) : z)) {
      N = !1;
      break;
    }
    C || (C = h == "constructor");
  }
  if (N && !C) {
    var Y = s.constructor, G = e.constructor;
    Y != G && "constructor" in s && "constructor" in e && !(typeof Y == "function" && Y instanceof Y && typeof G == "function" && G instanceof G) && (N = !1);
  }
  return i.delete(s), i.delete(e), N;
}
var cp = 1, _a = "[object Arguments]", Sa = "[object Array]", Is = "[object Object]", up = Object.prototype, ka = up.hasOwnProperty;
function dp(s, e, t, r, n, i) {
  var o = Qt(s), l = Qt(e), c = o ? Sa : st(s), d = l ? Sa : st(e);
  c = c == _a ? Is : c, d = d == _a ? Is : d;
  var b = c == Is, m = d == Is, h = c == d;
  if (h && ns(s)) {
    if (!ns(e))
      return !1;
    o = !0, b = !1;
  }
  if (h && !b)
    return i || (i = new ft()), o || Pi(s) ? Qo(s, e, t, r, n, i) : np(s, e, c, t, r, n, i);
  if (!(t & cp)) {
    var p = b && ka.call(s, "__wrapped__"), E = m && ka.call(e, "__wrapped__");
    if (p || E) {
      var N = p ? s.value() : s, C = E ? e.value() : e;
      return i || (i = new ft()), n(N, C, t, r, i);
    }
  }
  return h ? (i || (i = new ft()), lp(s, e, t, r, n, i)) : !1;
}
function Jo(s, e, t, r, n) {
  return s === e ? !0 : s == null || e == null || !Et(s) && !Et(e) ? s !== s && e !== e : dp(s, e, t, r, Jo, n);
}
function hp(s) {
  return function(e, t, r) {
    for (var n = -1, i = Object(e), o = r(e), l = o.length; l--; ) {
      var c = o[++n];
      if (t(i[c], c, i) === !1)
        break;
    }
    return e;
  };
}
var fp = hp();
function wi(s, e, t) {
  (t !== void 0 && !hs(s[e], t) || t === void 0 && !(e in s)) && Di(s, e, t);
}
function pp(s) {
  return Et(s) && nn(s);
}
function Ai(s, e) {
  if (!(e === "constructor" && typeof s[e] == "function") && e != "__proto__")
    return s[e];
}
function mp(s) {
  return Du(s, Uo(s));
}
function gp(s, e, t, r, n, i, o) {
  var l = Ai(s, t), c = Ai(e, t), d = o.get(c);
  if (d) {
    wi(s, t, d);
    return;
  }
  var b = i ? i(l, c, t + "", s, e, o) : void 0, m = b === void 0;
  if (m) {
    var h = Qt(c), p = !h && ns(c), E = !h && !p && Pi(c);
    b = c, h || p || E ? Qt(l) ? b = l : pp(l) ? b = Nu(l) : p ? (m = !1, b = Ko(c, !0)) : E ? (m = !1, b = Go(c, !0)) : b = [] : uh(c) || gi(c) ? (b = l, gi(l) ? b = mp(l) : (!Ft(l) || Bi(l)) && (b = Wo(c))) : m = !1;
  }
  m && (o.set(c, b), n(b, c, r, i, o), o.delete(c)), wi(s, t, b);
}
function el(s, e, t, r, n) {
  s !== e && fp(e, function(i, o) {
    if (n || (n = new ft()), Ft(i))
      gp(s, e, o, t, el, r, n);
    else {
      var l = r ? r(Ai(s, o), i, o + "", s, e, n) : void 0;
      l === void 0 && (l = i), wi(s, o, l);
    }
  }, Uo);
}
function Ui(s, e) {
  return Jo(s, e);
}
var $t = Uu(function(s, e, t) {
  el(s, e, t);
}), W = /* @__PURE__ */ ((s) => (s[s.TYPE = 3] = "TYPE", s[s.LEVEL = 12] = "LEVEL", s[s.ATTRIBUTE = 13] = "ATTRIBUTE", s[s.BLOT = 14] = "BLOT", s[s.INLINE = 7] = "INLINE", s[s.BLOCK = 11] = "BLOCK", s[s.BLOCK_BLOT = 10] = "BLOCK_BLOT", s[s.INLINE_BLOT = 6] = "INLINE_BLOT", s[s.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", s[s.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", s[s.ANY = 15] = "ANY", s))(W || {});
class pt {
  constructor(e, t, r = {}) {
    this.attrName = e, this.keyName = t;
    const n = W.TYPE & W.ATTRIBUTE;
    this.scope = r.scope != null ? (
      // Ignore type bits, force attribute bit
      r.scope & W.LEVEL | n
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
class Tr extends Error {
  constructor(e) {
    e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
  }
}
const tl = class Ei {
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
    const n = this.query(t);
    if (n == null)
      throw new Tr(`Unable to create ${t} blot`);
    const i = n, o = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : i.create(r)
    ), l = new i(e, o, r);
    return Ei.blots.set(l.domNode, l), l;
  }
  find(e, t = !1) {
    return Ei.find(e, t);
  }
  query(e, t = W.ANY) {
    let r;
    return typeof e == "string" ? r = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? r = this.types.text : typeof e == "number" ? e & W.LEVEL & W.BLOCK ? r = this.types.block : e & W.LEVEL & W.INLINE && (r = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((n) => (r = this.classes[n], !!r)), r = r || this.tags[e.tagName]), r == null ? null : "scope" in r && t & W.LEVEL & r.scope && t & W.TYPE & r.scope ? r : null;
  }
  register(...e) {
    return e.map((t) => {
      const r = "blotName" in t, n = "attrName" in t;
      if (!r && !n)
        throw new Tr("Invalid definition");
      if (r && t.blotName === "abstract")
        throw new Tr("Cannot register abstract class");
      const i = r ? t.blotName : n ? t.attrName : void 0;
      return this.types[i] = t, n ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : r && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((o) => o.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((o) => {
        (this.tags[o] == null || t.className == null) && (this.tags[o] = t);
      }))), t;
    });
  }
};
tl.blots = /* @__PURE__ */ new WeakMap();
let Cr = tl;
function Ca(s, e) {
  return (s.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class bp extends pt {
  static keys(e) {
    return (e.getAttribute("class") || "").split(/\s+/).map((t) => t.split("-").slice(0, -1).join("-"));
  }
  add(e, t) {
    return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
  }
  remove(e) {
    Ca(e, this.keyName).forEach((t) => {
      e.classList.remove(t);
    }), e.classList.length === 0 && e.removeAttribute("class");
  }
  value(e) {
    const t = (Ca(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(e, t) ? t : "";
  }
}
const lt = bp;
function ti(s) {
  const e = s.split("-"), t = e.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  return e[0] + t;
}
class yp extends pt {
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
const Pt = yp;
class vp {
  constructor(e) {
    this.attributes = {}, this.domNode = e, this.build();
  }
  attribute(e, t) {
    t ? e.add(this.domNode, t) && (e.value(this.domNode) != null ? this.attributes[e.attrName] = e : delete this.attributes[e.attrName]) : (e.remove(this.domNode), delete this.attributes[e.attrName]);
  }
  build() {
    this.attributes = {};
    const e = Cr.find(this.domNode);
    if (e == null)
      return;
    const t = pt.keys(this.domNode), r = lt.keys(this.domNode), n = Pt.keys(this.domNode);
    t.concat(r).concat(n).forEach((i) => {
      const o = e.scroll.query(i, W.ATTRIBUTE);
      o instanceof pt && (this.attributes[o.attrName] = o);
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
const ln = vp, rl = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, Cr.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new Tr("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Cr.blots.delete(this.domNode);
  }
  deleteAt(e, t) {
    this.isolate(e, t).remove();
  }
  formatAt(e, t, r, n) {
    const i = this.isolate(e, t);
    if (this.scroll.query(r, W.BLOT) != null && n)
      i.wrap(r, n);
    else if (this.scroll.query(r, W.ATTRIBUTE) != null) {
      const o = this.scroll.create(this.statics.scope);
      i.wrap(o), o.format(r, n);
    }
  }
  insertAt(e, t, r) {
    const n = r == null ? this.scroll.create("text", t) : this.scroll.create(t, r), i = this.split(e);
    this.parent.insertBefore(n, i || void 0);
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
      throw new Tr(`Cannot wrap ${e}`);
    return r.appendChild(this), r;
  }
};
rl.blotName = "abstract";
let sl = rl;
const nl = class extends sl {
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
nl.scope = W.INLINE_BLOT;
let xp = nl;
const $e = xp;
class wp {
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
    let r = t(), n = 0;
    for (; r; ) {
      if (r === e)
        return n;
      n += 1, r = t();
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
    let n = r();
    for (; n; ) {
      const i = n.length();
      if (e < i || t && e === i && (n.next == null || n.next.length() !== 0))
        return [n, e];
      e -= i, n = r();
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
    const [n, i] = this.find(e);
    let o = e - i;
    const l = this.iterator(n);
    let c = l();
    for (; c && o < e + t; ) {
      const d = c.length();
      e > o ? r(
        c,
        e - o,
        Math.min(t, o + d - e)
      ) : r(c, 0, Math.min(d, e + t - o)), o += d, c = l();
    }
  }
  map(e) {
    return this.reduce((t, r) => (t.push(e(r)), t), []);
  }
  reduce(e, t) {
    const r = this.iterator();
    let n = r();
    for (; n; )
      t = e(t, n), n = r();
    return t;
  }
}
function La(s, e) {
  const t = e.find(s);
  if (t)
    return t;
  try {
    return e.create(s);
  } catch {
    const r = e.create(W.INLINE);
    return Array.from(s.childNodes).forEach((n) => {
      r.domNode.appendChild(n);
    }), s.parentNode && s.parentNode.replaceChild(r.domNode, s), r.attach(), r;
  }
}
const il = class Lt extends sl {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = e, Lt.uiClass && this.uiNode.classList.add(Lt.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new wp(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = La(e, this.scroll);
        this.insertBefore(t, this.children.head || void 0);
      } catch (t) {
        if (t instanceof Tr)
          return;
        throw t;
      }
    });
  }
  deleteAt(e, t) {
    if (e === 0 && t === this.length())
      return this.remove();
    this.children.forEachAt(e, t, (r, n, i) => {
      r.deleteAt(n, i);
    });
  }
  descendant(e, t = 0) {
    const [r, n] = this.children.find(t);
    return e.blotName == null && e(r) || e.blotName != null && r instanceof e ? [r, n] : r instanceof Lt ? r.descendant(e, n) : [null, -1];
  }
  descendants(e, t = 0, r = Number.MAX_VALUE) {
    let n = [], i = r;
    return this.children.forEachAt(
      t,
      r,
      (o, l, c) => {
        (e.blotName == null && e(o) || e.blotName != null && o instanceof e) && n.push(o), o instanceof Lt && (n = n.concat(
          o.descendants(e, l, i)
        )), i -= c;
      }
    ), n;
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
      ) || (t.statics.scope === W.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof Lt ? t.unwrap() : t.remove());
    });
  }
  formatAt(e, t, r, n) {
    this.children.forEachAt(e, t, (i, o, l) => {
      i.formatAt(o, l, r, n);
    });
  }
  insertAt(e, t, r) {
    const [n, i] = this.children.find(e);
    if (n)
      n.insertAt(i, t, r);
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
    const [r, n] = this.children.find(e, t), i = [[this, e]];
    return r instanceof Lt ? i.concat(r.path(n, t)) : (r != null && i.push([r, n]), i);
  }
  removeChild(e) {
    this.children.remove(e);
  }
  replaceWith(e, t) {
    const r = typeof e == "string" ? this.scroll.create(e, t) : e;
    return r instanceof Lt && this.moveChildren(r), super.replaceWith(r);
  }
  split(e, t = !1) {
    if (!t) {
      if (e === 0)
        return this;
      if (e === this.length())
        return this.next;
    }
    const r = this.clone();
    return this.parent && this.parent.insertBefore(r, this.next || void 0), this.children.forEachAt(e, this.length(), (n, i, o) => {
      const l = n.split(i, t);
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
    const r = [], n = [];
    e.forEach((i) => {
      i.target === this.domNode && i.type === "childList" && (r.push(...i.addedNodes), n.push(...i.removedNodes));
    }), n.forEach((i) => {
      if (i.parentNode != null && // @ts-expect-error Fix me later
      i.tagName !== "IFRAME" && document.body.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const o = this.scroll.find(i);
      o != null && (o.domNode.parentNode == null || o.domNode.parentNode === this.domNode) && o.detach();
    }), r.filter((i) => i.parentNode === this.domNode && i !== this.uiNode).sort((i, o) => i === o ? 0 : i.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((i) => {
      let o = null;
      i.nextSibling != null && (o = this.scroll.find(i.nextSibling));
      const l = La(i, this.scroll);
      (l.next !== o || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
il.uiClass = "";
let Ap = il;
const at = Ap;
function Ep(s, e) {
  if (Object.keys(s).length !== Object.keys(e).length)
    return !1;
  for (const t in s)
    if (s[t] !== e[t])
      return !1;
  return !0;
}
const yr = class vr extends at {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(vr.blotName);
    if (!(r != null && e.tagName === r.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new ln(this.domNode);
  }
  format(e, t) {
    if (e === this.statics.blotName && !t)
      this.children.forEach((r) => {
        r instanceof vr || (r = r.wrap(vr.blotName, !0)), this.attributes.copy(r);
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
  formatAt(e, t, r, n) {
    this.formats()[r] != null || this.scroll.query(r, W.ATTRIBUTE) ? this.isolate(e, t).format(r, n) : super.formatAt(e, t, r, n);
  }
  optimize(e) {
    super.optimize(e);
    const t = this.formats();
    if (Object.keys(t).length === 0)
      return this.unwrap();
    const r = this.next;
    r instanceof vr && r.prev === this && Ep(t, r.formats()) && (r.moveChildren(this), r.remove());
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
    return r instanceof vr && this.attributes.move(r), r;
  }
};
yr.allowedChildren = [yr, $e], yr.blotName = "inline", yr.scope = W.INLINE_BLOT, yr.tagName = "SPAN";
let Np = yr;
const zi = Np, xr = class Ni extends at {
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
    super(e, t), this.attributes = new ln(this.domNode);
  }
  format(e, t) {
    const r = this.scroll.query(e, W.BLOCK);
    r != null && (r instanceof pt ? this.attributes.attribute(r, t) : e === this.statics.blotName && !t ? this.replaceWith(Ni.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
  }
  formats() {
    const e = this.attributes.values(), t = this.statics.formats(this.domNode, this.scroll);
    return t != null && (e[this.statics.blotName] = t), e;
  }
  formatAt(e, t, r, n) {
    this.scroll.query(r, W.BLOCK) != null ? this.format(r, n) : super.formatAt(e, t, r, n);
  }
  insertAt(e, t, r) {
    if (r == null || this.scroll.query(t, W.INLINE) != null)
      super.insertAt(e, t, r);
    else {
      const n = this.split(e);
      if (n != null) {
        const i = this.scroll.create(t, r);
        n.parent.insertBefore(i, n);
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
xr.blotName = "block", xr.scope = W.BLOCK_BLOT, xr.tagName = "P", xr.allowedChildren = [
  zi,
  xr,
  $e
];
let Tp = xr;
const os = Tp, Ti = class extends at {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(e, t) {
    super.deleteAt(e, t), this.enforceAllowedChildren();
  }
  formatAt(e, t, r, n) {
    super.formatAt(e, t, r, n), this.enforceAllowedChildren();
  }
  insertAt(e, t, r) {
    super.insertAt(e, t, r), this.enforceAllowedChildren();
  }
  optimize(e) {
    super.optimize(e), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
Ti.blotName = "container", Ti.scope = W.BLOCK_BLOT;
let _p = Ti;
const cn = _p;
class Sp extends $e {
  static formats(e, t) {
  }
  format(e, t) {
    super.formatAt(0, this.length(), e, t);
  }
  formatAt(e, t, r, n) {
    e === 0 && t === this.length() ? this.format(r, n) : super.formatAt(e, t, r, n);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const Ke = Sp, kp = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, Cp = 100, wr = class extends at {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((r) => {
      this.update(r);
    }), this.observer.observe(this.domNode, kp), this.attach();
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
  formatAt(e, t, r, n) {
    this.update(), super.formatAt(e, t, r, n);
  }
  insertAt(e, t, r) {
    this.update(), super.insertAt(e, t, r);
  }
  optimize(e = [], t = {}) {
    super.optimize(t);
    const r = t.mutationsMap || /* @__PURE__ */ new WeakMap();
    let n = Array.from(this.observer.takeRecords());
    for (; n.length > 0; )
      e.push(n.pop());
    const i = (c, d = !0) => {
      c == null || c === this || c.domNode.parentNode != null && (r.has(c.domNode) || r.set(c.domNode, []), d && i(c.parent));
    }, o = (c) => {
      r.has(c.domNode) && (c instanceof at && c.children.forEach(o), r.delete(c.domNode), c.optimize(t));
    };
    let l = e;
    for (let c = 0; l.length > 0; c += 1) {
      if (c >= Cp)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((d) => {
        const b = this.find(d.target, !0);
        b != null && (b.domNode === d.target && (d.type === "childList" ? (i(this.find(d.previousSibling, !1)), Array.from(d.addedNodes).forEach((m) => {
          const h = this.find(m, !1);
          i(h, !1), h instanceof at && h.children.forEach((p) => {
            i(p, !1);
          });
        })) : d.type === "attributes" && i(b.prev)), i(b));
      }), this.children.forEach(o), l = Array.from(this.observer.takeRecords()), n = l.slice(); n.length > 0; )
        e.push(n.pop());
    }
  }
  update(e, t = {}) {
    e = e || this.observer.takeRecords();
    const r = /* @__PURE__ */ new WeakMap();
    e.map((n) => {
      const i = this.find(n.target, !0);
      return i == null ? null : r.has(i.domNode) ? (r.get(i.domNode).push(n), null) : (r.set(i.domNode, [n]), i);
    }).forEach((n) => {
      n != null && n !== this && r.has(n.domNode) && n.update(r.get(n.domNode) || [], t);
    }), t.mutationsMap = r, r.has(this.domNode) && super.update(r.get(this.domNode), t), this.optimize(e, t);
  }
};
wr.blotName = "scroll", wr.defaultChild = os, wr.allowedChildren = [os, cn], wr.scope = W.BLOCK_BLOT, wr.tagName = "DIV";
let Lp = wr;
const Hi = Lp, _i = class al extends $e {
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
    super.optimize(e), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof al && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
let qp = _i;
const Qs = qp, Op = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: pt,
  AttributorStore: ln,
  BlockBlot: os,
  ClassAttributor: lt,
  ContainerBlot: cn,
  EmbedBlot: Ke,
  InlineBlot: zi,
  LeafBlot: $e,
  ParentBlot: at,
  Registry: Cr,
  Scope: W,
  ScrollBlot: Hi,
  StyleAttributor: Pt,
  TextBlot: Qs
}, Symbol.toStringTag, { value: "Module" }));
var It = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ol(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var Rs = { exports: {} }, ri, qa;
function Ip() {
  if (qa) return ri;
  qa = 1;
  var s = -1, e = 1, t = 0;
  function r(f, $, T, P, w) {
    if (f === $)
      return f ? [[t, f]] : [];
    if (T != null) {
      var y = le(f, $, T);
      if (y)
        return y;
    }
    var S = l(f, $), A = f.substring(0, S);
    f = f.substring(S), $ = $.substring(S), S = d(f, $);
    var x = f.substring(f.length - S);
    f = f.substring(0, f.length - S), $ = $.substring(0, $.length - S);
    var R = n(f, $);
    return A && R.unshift([t, A]), x && R.push([t, x]), F(R, w), P && m(R), R;
  }
  function n(f, $) {
    var T;
    if (!f)
      return [[e, $]];
    if (!$)
      return [[s, f]];
    var P = f.length > $.length ? f : $, w = f.length > $.length ? $ : f, y = P.indexOf(w);
    if (y !== -1)
      return T = [
        [e, P.substring(0, y)],
        [t, w],
        [e, P.substring(y + w.length)]
      ], f.length > $.length && (T[0][0] = T[2][0] = s), T;
    if (w.length === 1)
      return [
        [s, f],
        [e, $]
      ];
    var S = b(f, $);
    if (S) {
      var A = S[0], x = S[1], R = S[2], j = S[3], Z = S[4], J = r(A, R), ne = r(x, j);
      return J.concat([[t, Z]], ne);
    }
    return i(f, $);
  }
  function i(f, $) {
    for (var T = f.length, P = $.length, w = Math.ceil((T + P) / 2), y = w, S = 2 * w, A = new Array(S), x = new Array(S), R = 0; R < S; R++)
      A[R] = -1, x[R] = -1;
    A[y + 1] = 0, x[y + 1] = 0;
    for (var j = T - P, Z = j % 2 !== 0, J = 0, ne = 0, X = 0, be = 0, ye = 0; ye < w; ye++) {
      for (var ie = -ye + J; ie <= ye - ne; ie += 2) {
        var de = y + ie, ce;
        ie === -ye || ie !== ye && A[de - 1] < A[de + 1] ? ce = A[de + 1] : ce = A[de - 1] + 1;
        for (var he = ce - ie; ce < T && he < P && f.charAt(ce) === $.charAt(he); )
          ce++, he++;
        if (A[de] = ce, ce > T)
          ne += 2;
        else if (he > P)
          J += 2;
        else if (Z) {
          var pe = y + j - ie;
          if (pe >= 0 && pe < S && x[pe] !== -1) {
            var me = T - x[pe];
            if (ce >= me)
              return o(f, $, ce, he);
          }
        }
      }
      for (var Ae = -ye + X; Ae <= ye - be; Ae += 2) {
        var pe = y + Ae, me;
        Ae === -ye || Ae !== ye && x[pe - 1] < x[pe + 1] ? me = x[pe + 1] : me = x[pe - 1] + 1;
        for (var _ = me - Ae; me < T && _ < P && f.charAt(T - me - 1) === $.charAt(P - _ - 1); )
          me++, _++;
        if (x[pe] = me, me > T)
          be += 2;
        else if (_ > P)
          X += 2;
        else if (!Z) {
          var de = y + j - Ae;
          if (de >= 0 && de < S && A[de] !== -1) {
            var ce = A[de], he = y + ce - de;
            if (me = T - me, ce >= me)
              return o(f, $, ce, he);
          }
        }
      }
    }
    return [
      [s, f],
      [e, $]
    ];
  }
  function o(f, $, T, P) {
    var w = f.substring(0, T), y = $.substring(0, P), S = f.substring(T), A = $.substring(P), x = r(w, y), R = r(S, A);
    return x.concat(R);
  }
  function l(f, $) {
    if (!f || !$ || f.charAt(0) !== $.charAt(0))
      return 0;
    for (var T = 0, P = Math.min(f.length, $.length), w = P, y = 0; T < w; )
      f.substring(y, w) == $.substring(y, w) ? (T = w, y = T) : P = w, w = Math.floor((P - T) / 2 + T);
    return z(f.charCodeAt(w - 1)) && w--, w;
  }
  function c(f, $) {
    var T = f.length, P = $.length;
    if (T == 0 || P == 0)
      return 0;
    T > P ? f = f.substring(T - P) : T < P && ($ = $.substring(0, T));
    var w = Math.min(T, P);
    if (f == $)
      return w;
    for (var y = 0, S = 1; ; ) {
      var A = f.substring(w - S), x = $.indexOf(A);
      if (x == -1)
        return y;
      S += x, (x == 0 || f.substring(w - S) == $.substring(0, S)) && (y = S, S++);
    }
  }
  function d(f, $) {
    if (!f || !$ || f.slice(-1) !== $.slice(-1))
      return 0;
    for (var T = 0, P = Math.min(f.length, $.length), w = P, y = 0; T < w; )
      f.substring(f.length - w, f.length - y) == $.substring($.length - w, $.length - y) ? (T = w, y = T) : P = w, w = Math.floor((P - T) / 2 + T);
    return Y(f.charCodeAt(f.length - w)) && w--, w;
  }
  function b(f, $) {
    var T = f.length > $.length ? f : $, P = f.length > $.length ? $ : f;
    if (T.length < 4 || P.length * 2 < T.length)
      return null;
    function w(ne, X, be) {
      for (var ye = ne.substring(be, be + Math.floor(ne.length / 4)), ie = -1, de = "", ce, he, pe, me; (ie = X.indexOf(ye, ie + 1)) !== -1; ) {
        var Ae = l(
          ne.substring(be),
          X.substring(ie)
        ), _ = d(
          ne.substring(0, be),
          X.substring(0, ie)
        );
        de.length < _ + Ae && (de = X.substring(ie - _, ie) + X.substring(ie, ie + Ae), ce = ne.substring(0, be - _), he = ne.substring(be + Ae), pe = X.substring(0, ie - _), me = X.substring(ie + Ae));
      }
      return de.length * 2 >= ne.length ? [
        ce,
        he,
        pe,
        me,
        de
      ] : null;
    }
    var y = w(
      T,
      P,
      Math.ceil(T.length / 4)
    ), S = w(
      T,
      P,
      Math.ceil(T.length / 2)
    ), A;
    if (!y && !S)
      return null;
    S ? y ? A = y[4].length > S[4].length ? y : S : A = S : A = y;
    var x, R, j, Z;
    f.length > $.length ? (x = A[0], R = A[1], j = A[2], Z = A[3]) : (j = A[0], Z = A[1], x = A[2], R = A[3]);
    var J = A[4];
    return [x, R, j, Z, J];
  }
  function m(f) {
    for (var $ = !1, T = [], P = 0, w = null, y = 0, S = 0, A = 0, x = 0, R = 0; y < f.length; )
      f[y][0] == t ? (T[P++] = y, S = x, A = R, x = 0, R = 0, w = f[y][1]) : (f[y][0] == e ? x += f[y][1].length : R += f[y][1].length, w && w.length <= Math.max(S, A) && w.length <= Math.max(x, R) && (f.splice(T[P - 1], 0, [
        s,
        w
      ]), f[T[P - 1] + 1][0] = e, P--, P--, y = P > 0 ? T[P - 1] : -1, S = 0, A = 0, x = 0, R = 0, w = null, $ = !0)), y++;
    for ($ && F(f), q(f), y = 1; y < f.length; ) {
      if (f[y - 1][0] == s && f[y][0] == e) {
        var j = f[y - 1][1], Z = f[y][1], J = c(j, Z), ne = c(Z, j);
        J >= ne ? (J >= j.length / 2 || J >= Z.length / 2) && (f.splice(y, 0, [
          t,
          Z.substring(0, J)
        ]), f[y - 1][1] = j.substring(
          0,
          j.length - J
        ), f[y + 1][1] = Z.substring(J), y++) : (ne >= j.length / 2 || ne >= Z.length / 2) && (f.splice(y, 0, [
          t,
          j.substring(0, ne)
        ]), f[y - 1][0] = e, f[y - 1][1] = Z.substring(
          0,
          Z.length - ne
        ), f[y + 1][0] = s, f[y + 1][1] = j.substring(ne), y++), y++;
      }
      y++;
    }
  }
  var h = /[^a-zA-Z0-9]/, p = /\s/, E = /[\r\n]/, N = /\n\r?\n$/, C = /^\r?\n\r?\n/;
  function q(f) {
    function $(ne, X) {
      if (!ne || !X)
        return 6;
      var be = ne.charAt(ne.length - 1), ye = X.charAt(0), ie = be.match(h), de = ye.match(h), ce = ie && be.match(p), he = de && ye.match(p), pe = ce && be.match(E), me = he && ye.match(E), Ae = pe && ne.match(N), _ = me && X.match(C);
      return Ae || _ ? 5 : pe || me ? 4 : ie && !ce && he ? 3 : ce || he ? 2 : ie || de ? 1 : 0;
    }
    for (var T = 1; T < f.length - 1; ) {
      if (f[T - 1][0] == t && f[T + 1][0] == t) {
        var P = f[T - 1][1], w = f[T][1], y = f[T + 1][1], S = d(P, w);
        if (S) {
          var A = w.substring(w.length - S);
          P = P.substring(0, P.length - S), w = A + w.substring(0, w.length - S), y = A + y;
        }
        for (var x = P, R = w, j = y, Z = $(P, w) + $(w, y); w.charAt(0) === y.charAt(0); ) {
          P += w.charAt(0), w = w.substring(1) + y.charAt(0), y = y.substring(1);
          var J = $(P, w) + $(w, y);
          J >= Z && (Z = J, x = P, R = w, j = y);
        }
        f[T - 1][1] != x && (x ? f[T - 1][1] = x : (f.splice(T - 1, 1), T--), f[T][1] = R, j ? f[T + 1][1] = j : (f.splice(T + 1, 1), T--));
      }
      T++;
    }
  }
  function F(f, $) {
    f.push([t, ""]);
    for (var T = 0, P = 0, w = 0, y = "", S = "", A; T < f.length; ) {
      if (T < f.length - 1 && !f[T][1]) {
        f.splice(T, 1);
        continue;
      }
      switch (f[T][0]) {
        case e:
          w++, S += f[T][1], T++;
          break;
        case s:
          P++, y += f[T][1], T++;
          break;
        case t:
          var x = T - w - P - 1;
          if ($) {
            if (x >= 0 && oe(f[x][1])) {
              var R = f[x][1].slice(-1);
              if (f[x][1] = f[x][1].slice(
                0,
                -1
              ), y = R + y, S = R + S, !f[x][1]) {
                f.splice(x, 1), T--;
                var j = x - 1;
                f[j] && f[j][0] === e && (w++, S = f[j][1] + S, j--), f[j] && f[j][0] === s && (P++, y = f[j][1] + y, j--), x = j;
              }
            }
            if (G(f[T][1])) {
              var R = f[T][1].charAt(0);
              f[T][1] = f[T][1].slice(1), y += R, S += R;
            }
          }
          if (T < f.length - 1 && !f[T][1]) {
            f.splice(T, 1);
            break;
          }
          if (y.length > 0 || S.length > 0) {
            y.length > 0 && S.length > 0 && (A = l(S, y), A !== 0 && (x >= 0 ? f[x][1] += S.substring(
              0,
              A
            ) : (f.splice(0, 0, [
              t,
              S.substring(0, A)
            ]), T++), S = S.substring(A), y = y.substring(A)), A = d(S, y), A !== 0 && (f[T][1] = S.substring(S.length - A) + f[T][1], S = S.substring(
              0,
              S.length - A
            ), y = y.substring(
              0,
              y.length - A
            )));
            var Z = w + P;
            y.length === 0 && S.length === 0 ? (f.splice(T - Z, Z), T = T - Z) : y.length === 0 ? (f.splice(T - Z, Z, [e, S]), T = T - Z + 1) : S.length === 0 ? (f.splice(T - Z, Z, [s, y]), T = T - Z + 1) : (f.splice(
              T - Z,
              Z,
              [s, y],
              [e, S]
            ), T = T - Z + 2);
          }
          T !== 0 && f[T - 1][0] === t ? (f[T - 1][1] += f[T][1], f.splice(T, 1)) : T++, w = 0, P = 0, y = "", S = "";
          break;
      }
    }
    f[f.length - 1][1] === "" && f.pop();
    var J = !1;
    for (T = 1; T < f.length - 1; )
      f[T - 1][0] === t && f[T + 1][0] === t && (f[T][1].substring(
        f[T][1].length - f[T - 1][1].length
      ) === f[T - 1][1] ? (f[T][1] = f[T - 1][1] + f[T][1].substring(
        0,
        f[T][1].length - f[T - 1][1].length
      ), f[T + 1][1] = f[T - 1][1] + f[T + 1][1], f.splice(T - 1, 1), J = !0) : f[T][1].substring(0, f[T + 1][1].length) == f[T + 1][1] && (f[T - 1][1] += f[T + 1][1], f[T][1] = f[T][1].substring(f[T + 1][1].length) + f[T + 1][1], f.splice(T + 1, 1), J = !0)), T++;
    J && F(f, $);
  }
  function z(f) {
    return f >= 55296 && f <= 56319;
  }
  function Y(f) {
    return f >= 56320 && f <= 57343;
  }
  function G(f) {
    return Y(f.charCodeAt(0));
  }
  function oe(f) {
    return z(f.charCodeAt(f.length - 1));
  }
  function U(f) {
    for (var $ = [], T = 0; T < f.length; T++)
      f[T][1].length > 0 && $.push(f[T]);
    return $;
  }
  function H(f, $, T, P) {
    return oe(f) || G(P) ? null : U([
      [t, f],
      [s, $],
      [e, T],
      [t, P]
    ]);
  }
  function le(f, $, T) {
    var P = typeof T == "number" ? { index: T, length: 0 } : T.oldRange, w = typeof T == "number" ? null : T.newRange, y = f.length, S = $.length;
    if (P.length === 0 && (w === null || w.length === 0)) {
      var A = P.index, x = f.slice(0, A), R = f.slice(A), j = w ? w.index : null;
      e: {
        var Z = A + S - y;
        if (j !== null && j !== Z || Z < 0 || Z > S)
          break e;
        var J = $.slice(0, Z), ne = $.slice(Z);
        if (ne !== R)
          break e;
        var X = Math.min(A, Z), be = x.slice(0, X), ye = J.slice(0, X);
        if (be !== ye)
          break e;
        var ie = x.slice(X), de = J.slice(X);
        return H(be, ie, de, R);
      }
      e: {
        if (j !== null && j !== A)
          break e;
        var ce = A, J = $.slice(0, ce), ne = $.slice(ce);
        if (J !== x)
          break e;
        var he = Math.min(y - ce, S - ce), pe = R.slice(R.length - he), me = ne.slice(ne.length - he);
        if (pe !== me)
          break e;
        var ie = R.slice(0, R.length - he), de = ne.slice(0, ne.length - he);
        return H(x, ie, de, pe);
      }
    }
    if (P.length > 0 && w && w.length === 0)
      e: {
        var be = f.slice(0, P.index), pe = f.slice(P.index + P.length), X = be.length, he = pe.length;
        if (S < X + he)
          break e;
        var ye = $.slice(0, X), me = $.slice(S - he);
        if (be !== ye || pe !== me)
          break e;
        var ie = f.slice(X, y - he), de = $.slice(X, S - he);
        return H(be, ie, de, pe);
      }
    return null;
  }
  function ee(f, $, T, P) {
    return r(f, $, T, P, !0);
  }
  return ee.INSERT = e, ee.DELETE = s, ee.EQUAL = t, ri = ee, ri;
}
var Zr = { exports: {} };
Zr.exports;
var Oa;
function ll() {
  return Oa || (Oa = 1, (function(s, e) {
    var t = 200, r = "__lodash_hash_undefined__", n = 9007199254740991, i = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", c = "[object Date]", d = "[object Error]", b = "[object Function]", m = "[object GeneratorFunction]", h = "[object Map]", p = "[object Number]", E = "[object Object]", N = "[object Promise]", C = "[object RegExp]", q = "[object Set]", F = "[object String]", z = "[object Symbol]", Y = "[object WeakMap]", G = "[object ArrayBuffer]", oe = "[object DataView]", U = "[object Float32Array]", H = "[object Float64Array]", le = "[object Int8Array]", ee = "[object Int16Array]", f = "[object Int32Array]", $ = "[object Uint8Array]", T = "[object Uint8ClampedArray]", P = "[object Uint16Array]", w = "[object Uint32Array]", y = /[\\^$.*+?()[\]{}|]/g, S = /\w*$/, A = /^\[object .+?Constructor\]$/, x = /^(?:0|[1-9]\d*)$/, R = {};
    R[i] = R[o] = R[G] = R[oe] = R[l] = R[c] = R[U] = R[H] = R[le] = R[ee] = R[f] = R[h] = R[p] = R[E] = R[C] = R[q] = R[F] = R[z] = R[$] = R[T] = R[P] = R[w] = !0, R[d] = R[b] = R[Y] = !1;
    var j = typeof It == "object" && It && It.Object === Object && It, Z = typeof self == "object" && self && self.Object === Object && self, J = j || Z || Function("return this")(), ne = e && !e.nodeType && e, X = ne && !0 && s && !s.nodeType && s, be = X && X.exports === ne;
    function ye(a, u) {
      return a.set(u[0], u[1]), a;
    }
    function ie(a, u) {
      return a.add(u), a;
    }
    function de(a, u) {
      for (var g = -1, L = a ? a.length : 0; ++g < L && u(a[g], g, a) !== !1; )
        ;
      return a;
    }
    function ce(a, u) {
      for (var g = -1, L = u.length, se = a.length; ++g < L; )
        a[se + g] = u[g];
      return a;
    }
    function he(a, u, g, L) {
      for (var se = -1, Q = a ? a.length : 0; ++se < Q; )
        g = u(g, a[se], se, a);
      return g;
    }
    function pe(a, u) {
      for (var g = -1, L = Array(a); ++g < a; )
        L[g] = u(g);
      return L;
    }
    function me(a, u) {
      return a?.[u];
    }
    function Ae(a) {
      var u = !1;
      if (a != null && typeof a.toString != "function")
        try {
          u = !!(a + "");
        } catch {
        }
      return u;
    }
    function _(a) {
      var u = -1, g = Array(a.size);
      return a.forEach(function(L, se) {
        g[++u] = [se, L];
      }), g;
    }
    function k(a, u) {
      return function(g) {
        return a(u(g));
      };
    }
    function O(a) {
      var u = -1, g = Array(a.size);
      return a.forEach(function(L) {
        g[++u] = L;
      }), g;
    }
    var M = Array.prototype, xe = Function.prototype, Ee = Object.prototype, jt = J["__core-js_shared__"], lr = (function() {
      var a = /[^.]+$/.exec(jt && jt.keys && jt.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), Ut = xe.toString, Ge = Ee.hasOwnProperty, je = Ee.toString, fn = RegExp(
      "^" + Ut.call(Ge).replace(y, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), zt = be ? J.Buffer : void 0, cr = J.Symbol, Or = J.Uint8Array, We = k(Object.getPrototypeOf, Object), bs = Object.create, ys = Ee.propertyIsEnumerable, pn = M.splice, Ir = Object.getOwnPropertySymbols, ur = zt ? zt.isBuffer : void 0, vs = k(Object.keys, Object), dr = et(J, "DataView"), Ht = et(J, "Map"), Je = et(J, "Promise"), hr = et(J, "Set"), Rr = et(J, "WeakMap"), Vt = et(Object, "create"), $r = Me(dr), Kt = Me(Ht), Br = Me(Je), Dr = Me(hr), Mr = Me(Rr), kt = cr ? cr.prototype : void 0, xs = kt ? kt.valueOf : void 0;
    function bt(a) {
      var u = -1, g = a ? a.length : 0;
      for (this.clear(); ++u < g; ) {
        var L = a[u];
        this.set(L[0], L[1]);
      }
    }
    function mn() {
      this.__data__ = Vt ? Vt(null) : {};
    }
    function gn(a) {
      return this.has(a) && delete this.__data__[a];
    }
    function bn(a) {
      var u = this.__data__;
      if (Vt) {
        var g = u[a];
        return g === r ? void 0 : g;
      }
      return Ge.call(u, a) ? u[a] : void 0;
    }
    function ws(a) {
      var u = this.__data__;
      return Vt ? u[a] !== void 0 : Ge.call(u, a);
    }
    function Fr(a, u) {
      var g = this.__data__;
      return g[a] = Vt && u === void 0 ? r : u, this;
    }
    bt.prototype.clear = mn, bt.prototype.delete = gn, bt.prototype.get = bn, bt.prototype.has = ws, bt.prototype.set = Fr;
    function Se(a) {
      var u = -1, g = a ? a.length : 0;
      for (this.clear(); ++u < g; ) {
        var L = a[u];
        this.set(L[0], L[1]);
      }
    }
    function yn() {
      this.__data__ = [];
    }
    function vn(a) {
      var u = this.__data__, g = pr(u, a);
      if (g < 0)
        return !1;
      var L = u.length - 1;
      return g == L ? u.pop() : pn.call(u, g, 1), !0;
    }
    function xn(a) {
      var u = this.__data__, g = pr(u, a);
      return g < 0 ? void 0 : u[g][1];
    }
    function wn(a) {
      return pr(this.__data__, a) > -1;
    }
    function An(a, u) {
      var g = this.__data__, L = pr(g, a);
      return L < 0 ? g.push([a, u]) : g[L][1] = u, this;
    }
    Se.prototype.clear = yn, Se.prototype.delete = vn, Se.prototype.get = xn, Se.prototype.has = wn, Se.prototype.set = An;
    function qe(a) {
      var u = -1, g = a ? a.length : 0;
      for (this.clear(); ++u < g; ) {
        var L = a[u];
        this.set(L[0], L[1]);
      }
    }
    function En() {
      this.__data__ = {
        hash: new bt(),
        map: new (Ht || Se)(),
        string: new bt()
      };
    }
    function Nn(a) {
      return Wt(this, a).delete(a);
    }
    function Tn(a) {
      return Wt(this, a).get(a);
    }
    function _n(a) {
      return Wt(this, a).has(a);
    }
    function Sn(a, u) {
      return Wt(this, a).set(a, u), this;
    }
    qe.prototype.clear = En, qe.prototype.delete = Nn, qe.prototype.get = Tn, qe.prototype.has = _n, qe.prototype.set = Sn;
    function Ue(a) {
      this.__data__ = new Se(a);
    }
    function kn() {
      this.__data__ = new Se();
    }
    function Cn(a) {
      return this.__data__.delete(a);
    }
    function Ln(a) {
      return this.__data__.get(a);
    }
    function qn(a) {
      return this.__data__.has(a);
    }
    function On(a, u) {
      var g = this.__data__;
      if (g instanceof Se) {
        var L = g.__data__;
        if (!Ht || L.length < t - 1)
          return L.push([a, u]), this;
        g = this.__data__ = new qe(L);
      }
      return g.set(a, u), this;
    }
    Ue.prototype.clear = kn, Ue.prototype.delete = Cn, Ue.prototype.get = Ln, Ue.prototype.has = qn, Ue.prototype.set = On;
    function fr(a, u) {
      var g = zr(a) || gr(a) ? pe(a.length, String) : [], L = g.length, se = !!L;
      for (var Q in a)
        Ge.call(a, Q) && !(se && (Q == "length" || Kn(Q, L))) && g.push(Q);
      return g;
    }
    function As(a, u, g) {
      var L = a[u];
      (!(Ge.call(a, u) && Ss(L, g)) || g === void 0 && !(u in a)) && (a[u] = g);
    }
    function pr(a, u) {
      for (var g = a.length; g--; )
        if (Ss(a[g][0], u))
          return g;
      return -1;
    }
    function ut(a, u) {
      return a && Ur(u, Vr(u), a);
    }
    function Pr(a, u, g, L, se, Q, fe) {
      var ue;
      if (L && (ue = Q ? L(a, se, Q, fe) : L(a)), ue !== void 0)
        return ue;
      if (!ht(a))
        return a;
      var Ne = zr(a);
      if (Ne) {
        if (ue = Hn(a), !u)
          return jn(a, ue);
      } else {
        var ge = vt(a), Oe = ge == b || ge == m;
        if (ks(a))
          return mr(a, u);
        if (ge == E || ge == i || Oe && !Q) {
          if (Ae(a))
            return Q ? a : {};
          if (ue = dt(Oe ? {} : a), !u)
            return Un(a, ut(ue, a));
        } else {
          if (!R[ge])
            return Q ? a : {};
          ue = Vn(a, ge, Pr, u);
        }
      }
      fe || (fe = new Ue());
      var ze = fe.get(a);
      if (ze)
        return ze;
      if (fe.set(a, ue), !Ne)
        var Te = g ? zn(a) : Vr(a);
      return de(Te || a, function(Ie, ke) {
        Te && (ke = Ie, Ie = a[ke]), As(ue, ke, Pr(Ie, u, g, L, ke, a, fe));
      }), ue;
    }
    function In(a) {
      return ht(a) ? bs(a) : {};
    }
    function Rn(a, u, g) {
      var L = u(a);
      return zr(a) ? L : ce(L, g(a));
    }
    function $n(a) {
      return je.call(a);
    }
    function Bn(a) {
      if (!ht(a) || Wn(a))
        return !1;
      var u = Hr(a) || Ae(a) ? fn : A;
      return u.test(Me(a));
    }
    function Dn(a) {
      if (!Ts(a))
        return vs(a);
      var u = [];
      for (var g in Object(a))
        Ge.call(a, g) && g != "constructor" && u.push(g);
      return u;
    }
    function mr(a, u) {
      if (u)
        return a.slice();
      var g = new a.constructor(a.length);
      return a.copy(g), g;
    }
    function jr(a) {
      var u = new a.constructor(a.byteLength);
      return new Or(u).set(new Or(a)), u;
    }
    function Gt(a, u) {
      var g = u ? jr(a.buffer) : a.buffer;
      return new a.constructor(g, a.byteOffset, a.byteLength);
    }
    function Es(a, u, g) {
      var L = u ? g(_(a), !0) : _(a);
      return he(L, ye, new a.constructor());
    }
    function Ns(a) {
      var u = new a.constructor(a.source, S.exec(a));
      return u.lastIndex = a.lastIndex, u;
    }
    function Mn(a, u, g) {
      var L = u ? g(O(a), !0) : O(a);
      return he(L, ie, new a.constructor());
    }
    function Fn(a) {
      return xs ? Object(xs.call(a)) : {};
    }
    function Pn(a, u) {
      var g = u ? jr(a.buffer) : a.buffer;
      return new a.constructor(g, a.byteOffset, a.length);
    }
    function jn(a, u) {
      var g = -1, L = a.length;
      for (u || (u = Array(L)); ++g < L; )
        u[g] = a[g];
      return u;
    }
    function Ur(a, u, g, L) {
      g || (g = {});
      for (var se = -1, Q = u.length; ++se < Q; ) {
        var fe = u[se], ue = void 0;
        As(g, fe, ue === void 0 ? a[fe] : ue);
      }
      return g;
    }
    function Un(a, u) {
      return Ur(a, yt(a), u);
    }
    function zn(a) {
      return Rn(a, Vr, yt);
    }
    function Wt(a, u) {
      var g = a.__data__;
      return Gn(u) ? g[typeof u == "string" ? "string" : "hash"] : g.map;
    }
    function et(a, u) {
      var g = me(a, u);
      return Bn(g) ? g : void 0;
    }
    var yt = Ir ? k(Ir, Object) : Yn, vt = $n;
    (dr && vt(new dr(new ArrayBuffer(1))) != oe || Ht && vt(new Ht()) != h || Je && vt(Je.resolve()) != N || hr && vt(new hr()) != q || Rr && vt(new Rr()) != Y) && (vt = function(a) {
      var u = je.call(a), g = u == E ? a.constructor : void 0, L = g ? Me(g) : void 0;
      if (L)
        switch (L) {
          case $r:
            return oe;
          case Kt:
            return h;
          case Br:
            return N;
          case Dr:
            return q;
          case Mr:
            return Y;
        }
      return u;
    });
    function Hn(a) {
      var u = a.length, g = a.constructor(u);
      return u && typeof a[0] == "string" && Ge.call(a, "index") && (g.index = a.index, g.input = a.input), g;
    }
    function dt(a) {
      return typeof a.constructor == "function" && !Ts(a) ? In(We(a)) : {};
    }
    function Vn(a, u, g, L) {
      var se = a.constructor;
      switch (u) {
        case G:
          return jr(a);
        case l:
        case c:
          return new se(+a);
        case oe:
          return Gt(a, L);
        case U:
        case H:
        case le:
        case ee:
        case f:
        case $:
        case T:
        case P:
        case w:
          return Pn(a, L);
        case h:
          return Es(a, L, g);
        case p:
        case F:
          return new se(a);
        case C:
          return Ns(a);
        case q:
          return Mn(a, L, g);
        case z:
          return Fn(a);
      }
    }
    function Kn(a, u) {
      return u = u ?? n, !!u && (typeof a == "number" || x.test(a)) && a > -1 && a % 1 == 0 && a < u;
    }
    function Gn(a) {
      var u = typeof a;
      return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? a !== "__proto__" : a === null;
    }
    function Wn(a) {
      return !!lr && lr in a;
    }
    function Ts(a) {
      var u = a && a.constructor, g = typeof u == "function" && u.prototype || Ee;
      return a === g;
    }
    function Me(a) {
      if (a != null) {
        try {
          return Ut.call(a);
        } catch {
        }
        try {
          return a + "";
        } catch {
        }
      }
      return "";
    }
    function _s(a) {
      return Pr(a, !0, !0);
    }
    function Ss(a, u) {
      return a === u || a !== a && u !== u;
    }
    function gr(a) {
      return Zn(a) && Ge.call(a, "callee") && (!ys.call(a, "callee") || je.call(a) == i);
    }
    var zr = Array.isArray;
    function br(a) {
      return a != null && Cs(a.length) && !Hr(a);
    }
    function Zn(a) {
      return Ls(a) && br(a);
    }
    var ks = ur || Xn;
    function Hr(a) {
      var u = ht(a) ? je.call(a) : "";
      return u == b || u == m;
    }
    function Cs(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= n;
    }
    function ht(a) {
      var u = typeof a;
      return !!a && (u == "object" || u == "function");
    }
    function Ls(a) {
      return !!a && typeof a == "object";
    }
    function Vr(a) {
      return br(a) ? fr(a) : Dn(a);
    }
    function Yn() {
      return [];
    }
    function Xn() {
      return !1;
    }
    s.exports = _s;
  })(Zr, Zr.exports)), Zr.exports;
}
var Yr = { exports: {} };
Yr.exports;
var Ia;
function cl() {
  return Ia || (Ia = 1, (function(s, e) {
    var t = 200, r = "__lodash_hash_undefined__", n = 1, i = 2, o = 9007199254740991, l = "[object Arguments]", c = "[object Array]", d = "[object AsyncFunction]", b = "[object Boolean]", m = "[object Date]", h = "[object Error]", p = "[object Function]", E = "[object GeneratorFunction]", N = "[object Map]", C = "[object Number]", q = "[object Null]", F = "[object Object]", z = "[object Promise]", Y = "[object Proxy]", G = "[object RegExp]", oe = "[object Set]", U = "[object String]", H = "[object Symbol]", le = "[object Undefined]", ee = "[object WeakMap]", f = "[object ArrayBuffer]", $ = "[object DataView]", T = "[object Float32Array]", P = "[object Float64Array]", w = "[object Int8Array]", y = "[object Int16Array]", S = "[object Int32Array]", A = "[object Uint8Array]", x = "[object Uint8ClampedArray]", R = "[object Uint16Array]", j = "[object Uint32Array]", Z = /[\\^$.*+?()[\]{}|]/g, J = /^\[object .+?Constructor\]$/, ne = /^(?:0|[1-9]\d*)$/, X = {};
    X[T] = X[P] = X[w] = X[y] = X[S] = X[A] = X[x] = X[R] = X[j] = !0, X[l] = X[c] = X[f] = X[b] = X[$] = X[m] = X[h] = X[p] = X[N] = X[C] = X[F] = X[G] = X[oe] = X[U] = X[ee] = !1;
    var be = typeof It == "object" && It && It.Object === Object && It, ye = typeof self == "object" && self && self.Object === Object && self, ie = be || ye || Function("return this")(), de = e && !e.nodeType && e, ce = de && !0 && s && !s.nodeType && s, he = ce && ce.exports === de, pe = he && be.process, me = (function() {
      try {
        return pe && pe.binding && pe.binding("util");
      } catch {
      }
    })(), Ae = me && me.isTypedArray;
    function _(a, u) {
      for (var g = -1, L = a == null ? 0 : a.length, se = 0, Q = []; ++g < L; ) {
        var fe = a[g];
        u(fe, g, a) && (Q[se++] = fe);
      }
      return Q;
    }
    function k(a, u) {
      for (var g = -1, L = u.length, se = a.length; ++g < L; )
        a[se + g] = u[g];
      return a;
    }
    function O(a, u) {
      for (var g = -1, L = a == null ? 0 : a.length; ++g < L; )
        if (u(a[g], g, a))
          return !0;
      return !1;
    }
    function M(a, u) {
      for (var g = -1, L = Array(a); ++g < a; )
        L[g] = u(g);
      return L;
    }
    function xe(a) {
      return function(u) {
        return a(u);
      };
    }
    function Ee(a, u) {
      return a.has(u);
    }
    function jt(a, u) {
      return a?.[u];
    }
    function lr(a) {
      var u = -1, g = Array(a.size);
      return a.forEach(function(L, se) {
        g[++u] = [se, L];
      }), g;
    }
    function Ut(a, u) {
      return function(g) {
        return a(u(g));
      };
    }
    function Ge(a) {
      var u = -1, g = Array(a.size);
      return a.forEach(function(L) {
        g[++u] = L;
      }), g;
    }
    var je = Array.prototype, fn = Function.prototype, zt = Object.prototype, cr = ie["__core-js_shared__"], Or = fn.toString, We = zt.hasOwnProperty, bs = (function() {
      var a = /[^.]+$/.exec(cr && cr.keys && cr.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), ys = zt.toString, pn = RegExp(
      "^" + Or.call(We).replace(Z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Ir = he ? ie.Buffer : void 0, ur = ie.Symbol, vs = ie.Uint8Array, dr = zt.propertyIsEnumerable, Ht = je.splice, Je = ur ? ur.toStringTag : void 0, hr = Object.getOwnPropertySymbols, Rr = Ir ? Ir.isBuffer : void 0, Vt = Ut(Object.keys, Object), $r = yt(ie, "DataView"), Kt = yt(ie, "Map"), Br = yt(ie, "Promise"), Dr = yt(ie, "Set"), Mr = yt(ie, "WeakMap"), kt = yt(Object, "create"), xs = Me($r), bt = Me(Kt), mn = Me(Br), gn = Me(Dr), bn = Me(Mr), ws = ur ? ur.prototype : void 0, Fr = ws ? ws.valueOf : void 0;
    function Se(a) {
      var u = -1, g = a == null ? 0 : a.length;
      for (this.clear(); ++u < g; ) {
        var L = a[u];
        this.set(L[0], L[1]);
      }
    }
    function yn() {
      this.__data__ = kt ? kt(null) : {}, this.size = 0;
    }
    function vn(a) {
      var u = this.has(a) && delete this.__data__[a];
      return this.size -= u ? 1 : 0, u;
    }
    function xn(a) {
      var u = this.__data__;
      if (kt) {
        var g = u[a];
        return g === r ? void 0 : g;
      }
      return We.call(u, a) ? u[a] : void 0;
    }
    function wn(a) {
      var u = this.__data__;
      return kt ? u[a] !== void 0 : We.call(u, a);
    }
    function An(a, u) {
      var g = this.__data__;
      return this.size += this.has(a) ? 0 : 1, g[a] = kt && u === void 0 ? r : u, this;
    }
    Se.prototype.clear = yn, Se.prototype.delete = vn, Se.prototype.get = xn, Se.prototype.has = wn, Se.prototype.set = An;
    function qe(a) {
      var u = -1, g = a == null ? 0 : a.length;
      for (this.clear(); ++u < g; ) {
        var L = a[u];
        this.set(L[0], L[1]);
      }
    }
    function En() {
      this.__data__ = [], this.size = 0;
    }
    function Nn(a) {
      var u = this.__data__, g = mr(u, a);
      if (g < 0)
        return !1;
      var L = u.length - 1;
      return g == L ? u.pop() : Ht.call(u, g, 1), --this.size, !0;
    }
    function Tn(a) {
      var u = this.__data__, g = mr(u, a);
      return g < 0 ? void 0 : u[g][1];
    }
    function _n(a) {
      return mr(this.__data__, a) > -1;
    }
    function Sn(a, u) {
      var g = this.__data__, L = mr(g, a);
      return L < 0 ? (++this.size, g.push([a, u])) : g[L][1] = u, this;
    }
    qe.prototype.clear = En, qe.prototype.delete = Nn, qe.prototype.get = Tn, qe.prototype.has = _n, qe.prototype.set = Sn;
    function Ue(a) {
      var u = -1, g = a == null ? 0 : a.length;
      for (this.clear(); ++u < g; ) {
        var L = a[u];
        this.set(L[0], L[1]);
      }
    }
    function kn() {
      this.size = 0, this.__data__ = {
        hash: new Se(),
        map: new (Kt || qe)(),
        string: new Se()
      };
    }
    function Cn(a) {
      var u = et(this, a).delete(a);
      return this.size -= u ? 1 : 0, u;
    }
    function Ln(a) {
      return et(this, a).get(a);
    }
    function qn(a) {
      return et(this, a).has(a);
    }
    function On(a, u) {
      var g = et(this, a), L = g.size;
      return g.set(a, u), this.size += g.size == L ? 0 : 1, this;
    }
    Ue.prototype.clear = kn, Ue.prototype.delete = Cn, Ue.prototype.get = Ln, Ue.prototype.has = qn, Ue.prototype.set = On;
    function fr(a) {
      var u = -1, g = a == null ? 0 : a.length;
      for (this.__data__ = new Ue(); ++u < g; )
        this.add(a[u]);
    }
    function As(a) {
      return this.__data__.set(a, r), this;
    }
    function pr(a) {
      return this.__data__.has(a);
    }
    fr.prototype.add = fr.prototype.push = As, fr.prototype.has = pr;
    function ut(a) {
      var u = this.__data__ = new qe(a);
      this.size = u.size;
    }
    function Pr() {
      this.__data__ = new qe(), this.size = 0;
    }
    function In(a) {
      var u = this.__data__, g = u.delete(a);
      return this.size = u.size, g;
    }
    function Rn(a) {
      return this.__data__.get(a);
    }
    function $n(a) {
      return this.__data__.has(a);
    }
    function Bn(a, u) {
      var g = this.__data__;
      if (g instanceof qe) {
        var L = g.__data__;
        if (!Kt || L.length < t - 1)
          return L.push([a, u]), this.size = ++g.size, this;
        g = this.__data__ = new Ue(L);
      }
      return g.set(a, u), this.size = g.size, this;
    }
    ut.prototype.clear = Pr, ut.prototype.delete = In, ut.prototype.get = Rn, ut.prototype.has = $n, ut.prototype.set = Bn;
    function Dn(a, u) {
      var g = gr(a), L = !g && Ss(a), se = !g && !L && br(a), Q = !g && !L && !se && Ls(a), fe = g || L || se || Q, ue = fe ? M(a.length, String) : [], Ne = ue.length;
      for (var ge in a)
        We.call(a, ge) && !(fe && // Safari 9 has enumerable `arguments.length` in strict mode.
        (ge == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        se && (ge == "offset" || ge == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Q && (ge == "buffer" || ge == "byteLength" || ge == "byteOffset") || // Skip index properties.
        Vn(ge, Ne))) && ue.push(ge);
      return ue;
    }
    function mr(a, u) {
      for (var g = a.length; g--; )
        if (_s(a[g][0], u))
          return g;
      return -1;
    }
    function jr(a, u, g) {
      var L = u(a);
      return gr(a) ? L : k(L, g(a));
    }
    function Gt(a) {
      return a == null ? a === void 0 ? le : q : Je && Je in Object(a) ? vt(a) : Ts(a);
    }
    function Es(a) {
      return ht(a) && Gt(a) == l;
    }
    function Ns(a, u, g, L, se) {
      return a === u ? !0 : a == null || u == null || !ht(a) && !ht(u) ? a !== a && u !== u : Mn(a, u, g, L, Ns, se);
    }
    function Mn(a, u, g, L, se, Q) {
      var fe = gr(a), ue = gr(u), Ne = fe ? c : dt(a), ge = ue ? c : dt(u);
      Ne = Ne == l ? F : Ne, ge = ge == l ? F : ge;
      var Oe = Ne == F, ze = ge == F, Te = Ne == ge;
      if (Te && br(a)) {
        if (!br(u))
          return !1;
        fe = !0, Oe = !1;
      }
      if (Te && !Oe)
        return Q || (Q = new ut()), fe || Ls(a) ? Ur(a, u, g, L, se, Q) : Un(a, u, Ne, g, L, se, Q);
      if (!(g & n)) {
        var Ie = Oe && We.call(a, "__wrapped__"), ke = ze && We.call(u, "__wrapped__");
        if (Ie || ke) {
          var Ct = Ie ? a.value() : a, xt = ke ? u.value() : u;
          return Q || (Q = new ut()), se(Ct, xt, g, L, Q);
        }
      }
      return Te ? (Q || (Q = new ut()), zn(a, u, g, L, se, Q)) : !1;
    }
    function Fn(a) {
      if (!Cs(a) || Gn(a))
        return !1;
      var u = ks(a) ? pn : J;
      return u.test(Me(a));
    }
    function Pn(a) {
      return ht(a) && Hr(a.length) && !!X[Gt(a)];
    }
    function jn(a) {
      if (!Wn(a))
        return Vt(a);
      var u = [];
      for (var g in Object(a))
        We.call(a, g) && g != "constructor" && u.push(g);
      return u;
    }
    function Ur(a, u, g, L, se, Q) {
      var fe = g & n, ue = a.length, Ne = u.length;
      if (ue != Ne && !(fe && Ne > ue))
        return !1;
      var ge = Q.get(a);
      if (ge && Q.get(u))
        return ge == u;
      var Oe = -1, ze = !0, Te = g & i ? new fr() : void 0;
      for (Q.set(a, u), Q.set(u, a); ++Oe < ue; ) {
        var Ie = a[Oe], ke = u[Oe];
        if (L)
          var Ct = fe ? L(ke, Ie, Oe, u, a, Q) : L(Ie, ke, Oe, a, u, Q);
        if (Ct !== void 0) {
          if (Ct)
            continue;
          ze = !1;
          break;
        }
        if (Te) {
          if (!O(u, function(xt, Zt) {
            if (!Ee(Te, Zt) && (Ie === xt || se(Ie, xt, g, L, Q)))
              return Te.push(Zt);
          })) {
            ze = !1;
            break;
          }
        } else if (!(Ie === ke || se(Ie, ke, g, L, Q))) {
          ze = !1;
          break;
        }
      }
      return Q.delete(a), Q.delete(u), ze;
    }
    function Un(a, u, g, L, se, Q, fe) {
      switch (g) {
        case $:
          if (a.byteLength != u.byteLength || a.byteOffset != u.byteOffset)
            return !1;
          a = a.buffer, u = u.buffer;
        case f:
          return !(a.byteLength != u.byteLength || !Q(new vs(a), new vs(u)));
        case b:
        case m:
        case C:
          return _s(+a, +u);
        case h:
          return a.name == u.name && a.message == u.message;
        case G:
        case U:
          return a == u + "";
        case N:
          var ue = lr;
        case oe:
          var Ne = L & n;
          if (ue || (ue = Ge), a.size != u.size && !Ne)
            return !1;
          var ge = fe.get(a);
          if (ge)
            return ge == u;
          L |= i, fe.set(a, u);
          var Oe = Ur(ue(a), ue(u), L, se, Q, fe);
          return fe.delete(a), Oe;
        case H:
          if (Fr)
            return Fr.call(a) == Fr.call(u);
      }
      return !1;
    }
    function zn(a, u, g, L, se, Q) {
      var fe = g & n, ue = Wt(a), Ne = ue.length, ge = Wt(u), Oe = ge.length;
      if (Ne != Oe && !fe)
        return !1;
      for (var ze = Ne; ze--; ) {
        var Te = ue[ze];
        if (!(fe ? Te in u : We.call(u, Te)))
          return !1;
      }
      var Ie = Q.get(a);
      if (Ie && Q.get(u))
        return Ie == u;
      var ke = !0;
      Q.set(a, u), Q.set(u, a);
      for (var Ct = fe; ++ze < Ne; ) {
        Te = ue[ze];
        var xt = a[Te], Zt = u[Te];
        if (L)
          var ra = fe ? L(Zt, xt, Te, u, a, Q) : L(xt, Zt, Te, a, u, Q);
        if (!(ra === void 0 ? xt === Zt || se(xt, Zt, g, L, Q) : ra)) {
          ke = !1;
          break;
        }
        Ct || (Ct = Te == "constructor");
      }
      if (ke && !Ct) {
        var qs = a.constructor, Os = u.constructor;
        qs != Os && "constructor" in a && "constructor" in u && !(typeof qs == "function" && qs instanceof qs && typeof Os == "function" && Os instanceof Os) && (ke = !1);
      }
      return Q.delete(a), Q.delete(u), ke;
    }
    function Wt(a) {
      return jr(a, Vr, Hn);
    }
    function et(a, u) {
      var g = a.__data__;
      return Kn(u) ? g[typeof u == "string" ? "string" : "hash"] : g.map;
    }
    function yt(a, u) {
      var g = jt(a, u);
      return Fn(g) ? g : void 0;
    }
    function vt(a) {
      var u = We.call(a, Je), g = a[Je];
      try {
        a[Je] = void 0;
        var L = !0;
      } catch {
      }
      var se = ys.call(a);
      return L && (u ? a[Je] = g : delete a[Je]), se;
    }
    var Hn = hr ? function(a) {
      return a == null ? [] : (a = Object(a), _(hr(a), function(u) {
        return dr.call(a, u);
      }));
    } : Yn, dt = Gt;
    ($r && dt(new $r(new ArrayBuffer(1))) != $ || Kt && dt(new Kt()) != N || Br && dt(Br.resolve()) != z || Dr && dt(new Dr()) != oe || Mr && dt(new Mr()) != ee) && (dt = function(a) {
      var u = Gt(a), g = u == F ? a.constructor : void 0, L = g ? Me(g) : "";
      if (L)
        switch (L) {
          case xs:
            return $;
          case bt:
            return N;
          case mn:
            return z;
          case gn:
            return oe;
          case bn:
            return ee;
        }
      return u;
    });
    function Vn(a, u) {
      return u = u ?? o, !!u && (typeof a == "number" || ne.test(a)) && a > -1 && a % 1 == 0 && a < u;
    }
    function Kn(a) {
      var u = typeof a;
      return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? a !== "__proto__" : a === null;
    }
    function Gn(a) {
      return !!bs && bs in a;
    }
    function Wn(a) {
      var u = a && a.constructor, g = typeof u == "function" && u.prototype || zt;
      return a === g;
    }
    function Ts(a) {
      return ys.call(a);
    }
    function Me(a) {
      if (a != null) {
        try {
          return Or.call(a);
        } catch {
        }
        try {
          return a + "";
        } catch {
        }
      }
      return "";
    }
    function _s(a, u) {
      return a === u || a !== a && u !== u;
    }
    var Ss = Es(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Es : function(a) {
      return ht(a) && We.call(a, "callee") && !dr.call(a, "callee");
    }, gr = Array.isArray;
    function zr(a) {
      return a != null && Hr(a.length) && !ks(a);
    }
    var br = Rr || Xn;
    function Zn(a, u) {
      return Ns(a, u);
    }
    function ks(a) {
      if (!Cs(a))
        return !1;
      var u = Gt(a);
      return u == p || u == E || u == d || u == Y;
    }
    function Hr(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= o;
    }
    function Cs(a) {
      var u = typeof a;
      return a != null && (u == "object" || u == "function");
    }
    function ht(a) {
      return a != null && typeof a == "object";
    }
    var Ls = Ae ? xe(Ae) : Pn;
    function Vr(a) {
      return zr(a) ? Dn(a) : jn(a);
    }
    function Yn() {
      return [];
    }
    function Xn() {
      return !1;
    }
    s.exports = Zn;
  })(Yr, Yr.exports)), Yr.exports;
}
var $s = {}, Ra;
function Rp() {
  if (Ra) return $s;
  Ra = 1, Object.defineProperty($s, "__esModule", { value: !0 });
  const s = ll(), e = cl();
  var t;
  return (function(r) {
    function n(c = {}, d = {}, b = !1) {
      typeof c != "object" && (c = {}), typeof d != "object" && (d = {});
      let m = s(d);
      b || (m = Object.keys(m).reduce((h, p) => (m[p] != null && (h[p] = m[p]), h), {}));
      for (const h in c)
        c[h] !== void 0 && d[h] === void 0 && (m[h] = c[h]);
      return Object.keys(m).length > 0 ? m : void 0;
    }
    r.compose = n;
    function i(c = {}, d = {}) {
      typeof c != "object" && (c = {}), typeof d != "object" && (d = {});
      const b = Object.keys(c).concat(Object.keys(d)).reduce((m, h) => (e(c[h], d[h]) || (m[h] = d[h] === void 0 ? null : d[h]), m), {});
      return Object.keys(b).length > 0 ? b : void 0;
    }
    r.diff = i;
    function o(c = {}, d = {}) {
      c = c || {};
      const b = Object.keys(d).reduce((m, h) => (d[h] !== c[h] && c[h] !== void 0 && (m[h] = d[h]), m), {});
      return Object.keys(c).reduce((m, h) => (c[h] !== d[h] && d[h] === void 0 && (m[h] = null), m), b);
    }
    r.invert = o;
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
  })(t || (t = {})), $s.default = t, $s;
}
var Bs = {}, $a;
function ul() {
  if ($a) return Bs;
  $a = 1, Object.defineProperty(Bs, "__esModule", { value: !0 });
  var s;
  return (function(e) {
    function t(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    e.length = t;
  })(s || (s = {})), Bs.default = s, Bs;
}
var Ds = {}, Ba;
function $p() {
  if (Ba) return Ds;
  Ba = 1, Object.defineProperty(Ds, "__esModule", { value: !0 });
  const s = ul();
  class e {
    constructor(r) {
      this.ops = r, this.index = 0, this.offset = 0;
    }
    hasNext() {
      return this.peekLength() < 1 / 0;
    }
    next(r) {
      r || (r = 1 / 0);
      const n = this.ops[this.index];
      if (n) {
        const i = this.offset, o = s.default.length(n);
        if (r >= o - i ? (r = o - i, this.index += 1, this.offset = 0) : this.offset += r, typeof n.delete == "number")
          return { delete: r };
        {
          const l = {};
          return n.attributes && (l.attributes = n.attributes), typeof n.retain == "number" ? l.retain = r : typeof n.retain == "object" && n.retain !== null ? l.retain = n.retain : typeof n.insert == "string" ? l.insert = n.insert.substr(i, r) : l.insert = n.insert, l;
        }
      } else
        return { retain: 1 / 0 };
    }
    peek() {
      return this.ops[this.index];
    }
    peekLength() {
      return this.ops[this.index] ? s.default.length(this.ops[this.index]) - this.offset : 1 / 0;
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
          const r = this.offset, n = this.index, i = this.next(), o = this.ops.slice(this.index);
          return this.offset = r, this.index = n, [i].concat(o);
        }
      } else return [];
    }
  }
  return Ds.default = e, Ds;
}
var Da;
function Bp() {
  return Da || (Da = 1, (function(s, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = Ip(), r = ll(), n = cl(), i = Rp();
    e.AttributeMap = i.default;
    const o = ul();
    e.Op = o.default;
    const l = $p();
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
        const E = {};
        return typeof h == "string" && h.length === 0 ? this : (E.insert = h, p != null && typeof p == "object" && Object.keys(p).length > 0 && (E.attributes = p), this.push(E));
      }
      delete(h) {
        return h <= 0 ? this : this.push({ delete: h });
      }
      retain(h, p) {
        if (typeof h == "number" && h <= 0)
          return this;
        const E = { retain: h };
        return p != null && typeof p == "object" && Object.keys(p).length > 0 && (E.attributes = p), this.push(E);
      }
      push(h) {
        let p = this.ops.length, E = this.ops[p - 1];
        if (h = r(h), typeof E == "object") {
          if (typeof h.delete == "number" && typeof E.delete == "number")
            return this.ops[p - 1] = { delete: E.delete + h.delete }, this;
          if (typeof E.delete == "number" && h.insert != null && (p -= 1, E = this.ops[p - 1], typeof E != "object"))
            return this.ops.unshift(h), this;
          if (n(h.attributes, E.attributes)) {
            if (typeof h.insert == "string" && typeof E.insert == "string")
              return this.ops[p - 1] = { insert: E.insert + h.insert }, typeof h.attributes == "object" && (this.ops[p - 1].attributes = h.attributes), this;
            if (typeof h.retain == "number" && typeof E.retain == "number")
              return this.ops[p - 1] = { retain: E.retain + h.retain }, typeof h.attributes == "object" && (this.ops[p - 1].attributes = h.attributes), this;
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
        const p = [], E = [];
        return this.forEach((N) => {
          (h(N) ? p : E).push(N);
        }), [p, E];
      }
      reduce(h, p) {
        return this.ops.reduce(h, p);
      }
      changeLength() {
        return this.reduce((h, p) => p.insert ? h + o.default.length(p) : p.delete ? h - p.delete : h, 0);
      }
      length() {
        return this.reduce((h, p) => h + o.default.length(p), 0);
      }
      slice(h = 0, p = 1 / 0) {
        const E = [], N = new l.default(this.ops);
        let C = 0;
        for (; C < p && N.hasNext(); ) {
          let q;
          C < h ? q = N.next(h - C) : (q = N.next(p - C), E.push(q)), C += o.default.length(q);
        }
        return new b(E);
      }
      compose(h) {
        const p = new l.default(this.ops), E = new l.default(h.ops), N = [], C = E.peek();
        if (C != null && typeof C.retain == "number" && C.attributes == null) {
          let F = C.retain;
          for (; p.peekType() === "insert" && p.peekLength() <= F; )
            F -= p.peekLength(), N.push(p.next());
          C.retain - F > 0 && E.next(C.retain - F);
        }
        const q = new b(N);
        for (; p.hasNext() || E.hasNext(); )
          if (E.peekType() === "insert")
            q.push(E.next());
          else if (p.peekType() === "delete")
            q.push(p.next());
          else {
            const F = Math.min(p.peekLength(), E.peekLength()), z = p.next(F), Y = E.next(F);
            if (Y.retain) {
              const G = {};
              if (typeof z.retain == "number")
                G.retain = typeof Y.retain == "number" ? F : Y.retain;
              else if (typeof Y.retain == "number")
                z.retain == null ? G.insert = z.insert : G.retain = z.retain;
              else {
                const U = z.retain == null ? "insert" : "retain", [H, le, ee] = d(z[U], Y.retain), f = b.getHandler(H);
                G[U] = {
                  [H]: f.compose(le, ee, U === "retain")
                };
              }
              const oe = i.default.compose(z.attributes, Y.attributes, typeof z.retain == "number");
              if (oe && (G.attributes = oe), q.push(G), !E.hasNext() && n(q.ops[q.ops.length - 1], G)) {
                const U = new b(p.rest());
                return q.concat(U).chop();
              }
            } else typeof Y.delete == "number" && (typeof z.retain == "number" || typeof z.retain == "object" && z.retain !== null) && q.push(Y);
          }
        return q.chop();
      }
      concat(h) {
        const p = new b(this.ops.slice());
        return h.ops.length > 0 && (p.push(h.ops[0]), p.ops = p.ops.concat(h.ops.slice(1))), p;
      }
      diff(h, p) {
        if (this.ops === h.ops)
          return new b();
        const E = [this, h].map((z) => z.map((Y) => {
          if (Y.insert != null)
            return typeof Y.insert == "string" ? Y.insert : c;
          const G = z === h ? "on" : "with";
          throw new Error("diff() called " + G + " non-document");
        }).join("")), N = new b(), C = t(E[0], E[1], p, !0), q = new l.default(this.ops), F = new l.default(h.ops);
        return C.forEach((z) => {
          let Y = z[1].length;
          for (; Y > 0; ) {
            let G = 0;
            switch (z[0]) {
              case t.INSERT:
                G = Math.min(F.peekLength(), Y), N.push(F.next(G));
                break;
              case t.DELETE:
                G = Math.min(Y, q.peekLength()), q.next(G), N.delete(G);
                break;
              case t.EQUAL:
                G = Math.min(q.peekLength(), F.peekLength(), Y);
                const oe = q.next(G), U = F.next(G);
                n(oe.insert, U.insert) ? N.retain(G, i.default.diff(oe.attributes, U.attributes)) : N.push(U).delete(G);
                break;
            }
            Y -= G;
          }
        }), N.chop();
      }
      eachLine(h, p = `
`) {
        const E = new l.default(this.ops);
        let N = new b(), C = 0;
        for (; E.hasNext(); ) {
          if (E.peekType() !== "insert")
            return;
          const q = E.peek(), F = o.default.length(q) - E.peekLength(), z = typeof q.insert == "string" ? q.insert.indexOf(p, F) - F : -1;
          if (z < 0)
            N.push(E.next());
          else if (z > 0)
            N.push(E.next(z));
          else {
            if (h(N, E.next(1).attributes || {}, C) === !1)
              return;
            C += 1, N = new b();
          }
        }
        N.length() > 0 && h(N, {}, C);
      }
      invert(h) {
        const p = new b();
        return this.reduce((E, N) => {
          if (N.insert)
            p.delete(o.default.length(N));
          else {
            if (typeof N.retain == "number" && N.attributes == null)
              return p.retain(N.retain), E + N.retain;
            if (N.delete || typeof N.retain == "number") {
              const C = N.delete || N.retain;
              return h.slice(E, E + C).forEach((F) => {
                N.delete ? p.push(F) : N.retain && N.attributes && p.retain(o.default.length(F), i.default.invert(N.attributes, F.attributes));
              }), E + C;
            } else if (typeof N.retain == "object" && N.retain !== null) {
              const C = h.slice(E, E + 1), q = new l.default(C.ops).next(), [F, z, Y] = d(N.retain, q.insert), G = b.getHandler(F);
              return p.retain({ [F]: G.invert(z, Y) }, i.default.invert(N.attributes, q.attributes)), E + 1;
            }
          }
          return E;
        }, 0), p.chop();
      }
      transform(h, p = !1) {
        if (p = !!p, typeof h == "number")
          return this.transformPosition(h, p);
        const E = h, N = new l.default(this.ops), C = new l.default(E.ops), q = new b();
        for (; N.hasNext() || C.hasNext(); )
          if (N.peekType() === "insert" && (p || C.peekType() !== "insert"))
            q.retain(o.default.length(N.next()));
          else if (C.peekType() === "insert")
            q.push(C.next());
          else {
            const F = Math.min(N.peekLength(), C.peekLength()), z = N.next(F), Y = C.next(F);
            if (z.delete)
              continue;
            if (Y.delete)
              q.push(Y);
            else {
              const G = z.retain, oe = Y.retain;
              let U = typeof oe == "object" && oe !== null ? oe : F;
              if (typeof G == "object" && G !== null && typeof oe == "object" && oe !== null) {
                const H = Object.keys(G)[0];
                if (H === Object.keys(oe)[0]) {
                  const le = b.getHandler(H);
                  le && (U = {
                    [H]: le.transform(G[H], oe[H], p)
                  });
                }
              }
              q.retain(U, i.default.transform(z.attributes, Y.attributes, p));
            }
          }
        return q.chop();
      }
      transformPosition(h, p = !1) {
        p = !!p;
        const E = new l.default(this.ops);
        let N = 0;
        for (; E.hasNext() && N <= h; ) {
          const C = E.peekLength(), q = E.peekType();
          if (E.next(), q === "delete") {
            h -= Math.min(C, h - N);
            continue;
          } else q === "insert" && (N < h || !p) && (h += C);
          N += C;
        }
        return h;
      }
    }
    b.Op = o.default, b.OpIterator = l.default, b.AttributeMap = i.default, b.handlers = {}, e.default = b, s.exports = b, s.exports.default = b;
  })(Rs, Rs.exports)), Rs.exports;
}
var Qe = Bp();
const K = /* @__PURE__ */ ol(Qe);
class ct extends Ke {
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
let ot = class extends Qs {
};
const Dp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function un(s) {
  return s.replace(/[&<>"']/g, (e) => Dp[e]);
}
class Fe extends zi {
  static allowedChildren = [Fe, ct, Ke, ot];
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
    const r = Fe.order.indexOf(e), n = Fe.order.indexOf(t);
    return r >= 0 || n >= 0 ? r - n : e === t ? 0 : e < t ? -1 : 1;
  }
  formatAt(e, t, r, n) {
    if (Fe.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, W.BLOT)) {
      const i = this.isolate(e, t);
      n && i.wrap(r, n);
    } else
      super.formatAt(e, t, r, n);
  }
  optimize(e) {
    if (super.optimize(e), this.parent instanceof Fe && Fe.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const t = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(t), t.wrap(this);
    }
  }
}
const Ma = 1;
class Le extends os {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = dl(this)), this.cache.delta;
  }
  deleteAt(e, t) {
    super.deleteAt(e, t), this.cache = {};
  }
  formatAt(e, t, r, n) {
    t <= 0 || (this.scroll.query(r, W.BLOCK) ? e + t === this.length() && this.format(r, n) : super.formatAt(e, Math.min(t, this.length() - e - 1), r, n), this.cache = {});
  }
  insertAt(e, t, r) {
    if (r != null) {
      super.insertAt(e, t, r), this.cache = {};
      return;
    }
    if (t.length === 0) return;
    const n = t.split(`
`), i = n.shift();
    i.length > 0 && (e < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(e, this.length() - 1), i) : this.children.tail.insertAt(this.children.tail.length(), i), this.cache = {});
    let o = this;
    n.reduce((l, c) => (o = o.split(l, !0), o.insertAt(0, c), c.length), e + i.length);
  }
  insertBefore(e, t) {
    const {
      head: r
    } = this.children;
    super.insertBefore(e, t), r instanceof ct && r.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Ma), this.cache.length;
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
    if (t && (e === 0 || e >= this.length() - Ma)) {
      const n = this.clone();
      return e === 0 ? (this.parent.insertBefore(n, this), this) : (this.parent.insertBefore(n, this.next), n);
    }
    const r = super.split(e, t);
    return this.cache = {}, r;
  }
}
Le.blotName = "block";
Le.tagName = "P";
Le.defaultChild = ct;
Le.allowedChildren = [ct, Fe, Ke, ot];
class Xe extends Ke {
  attach() {
    super.attach(), this.attributes = new ln(this.domNode);
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
  formatAt(e, t, r, n) {
    this.format(r, n);
  }
  insertAt(e, t, r) {
    if (r != null) {
      super.insertAt(e, t, r);
      return;
    }
    const n = t.split(`
`), i = n.pop(), o = n.map((c) => {
      const d = this.scroll.create(Le.blotName);
      return d.insertAt(0, c), d;
    }), l = this.split(e);
    o.forEach((c) => {
      this.parent.insertBefore(c, l);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), l);
  }
}
Xe.scope = W.BLOCK_BLOT;
function dl(s) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return s.descendants($e).reduce((t, r) => r.length() === 0 ? t : t.insert(r.value(), Ze(r, {}, e)), new K()).insert(`
`, Ze(s));
}
function Ze(s) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return s == null || ("formats" in s && typeof s.formats == "function" && (e = {
    ...e,
    ...s.formats()
  }, t && delete e["code-token"]), s.parent == null || s.parent.statics.blotName === "scroll" || s.parent.statics.scope !== s.statics.scope) ? e : Ze(s.parent, e, t);
}
class nt extends Ke {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(e, t, r) {
    super(e, t), this.selection = r, this.textNode = document.createTextNode(nt.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
  }
  detach() {
    this.parent != null && this.parent.removeChild(this);
  }
  format(e, t) {
    if (this.savedLength !== 0) {
      super.format(e, t);
      return;
    }
    let r = this, n = 0;
    for (; r != null && r.statics.scope !== W.BLOCK_BLOT; )
      n += r.offset(r.parent), r = r.parent;
    r != null && (this.savedLength = nt.CONTENTS.length, r.optimize(), r.formatAt(n, nt.CONTENTS.length, e, t), this.savedLength = 0);
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
    const t = this.prev instanceof ot ? this.prev : null, r = t ? t.length() : 0, n = this.next instanceof ot ? this.next : null, i = n ? n.text : "", {
      textNode: o
    } = this, l = o.data.split(nt.CONTENTS).join("");
    o.data = nt.CONTENTS;
    let c;
    if (t)
      c = t, (l || n) && (t.insertAt(t.length(), l + i), n && n.remove());
    else if (n)
      c = n, n.insertAt(0, l);
    else {
      const d = document.createTextNode(l);
      c = this.scroll.create(d), this.parent.insertBefore(c, this);
    }
    if (this.remove(), e) {
      const d = (h, p) => t && h === t.domNode ? p : h === o ? r + p - 1 : n && h === n.domNode ? r + l.length + p : null, b = d(e.start.node, e.start.offset), m = d(e.end.node, e.end.offset);
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
        this.savedLength = nt.CONTENTS.length, t.isolate(this.offset(t), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      t = t.parent;
    }
  }
  value() {
    return "";
  }
}
var si = { exports: {} }, Fa;
function Mp() {
  return Fa || (Fa = 1, (function(s) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (t = !1));
    function n(c, d, b) {
      this.fn = c, this.context = d, this.once = b || !1;
    }
    function i(c, d, b, m, h) {
      if (typeof b != "function")
        throw new TypeError("The listener must be a function");
      var p = new n(b, m || c, h), E = t ? t + d : d;
      return c._events[E] ? c._events[E].fn ? c._events[E] = [c._events[E], p] : c._events[E].push(p) : (c._events[E] = p, c._eventsCount++), c;
    }
    function o(c, d) {
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
      for (var h = 0, p = m.length, E = new Array(p); h < p; h++)
        E[h] = m[h].fn;
      return E;
    }, l.prototype.listenerCount = function(d) {
      var b = t ? t + d : d, m = this._events[b];
      return m ? m.fn ? 1 : m.length : 0;
    }, l.prototype.emit = function(d, b, m, h, p, E) {
      var N = t ? t + d : d;
      if (!this._events[N]) return !1;
      var C = this._events[N], q = arguments.length, F, z;
      if (C.fn) {
        switch (C.once && this.removeListener(d, C.fn, void 0, !0), q) {
          case 1:
            return C.fn.call(C.context), !0;
          case 2:
            return C.fn.call(C.context, b), !0;
          case 3:
            return C.fn.call(C.context, b, m), !0;
          case 4:
            return C.fn.call(C.context, b, m, h), !0;
          case 5:
            return C.fn.call(C.context, b, m, h, p), !0;
          case 6:
            return C.fn.call(C.context, b, m, h, p, E), !0;
        }
        for (z = 1, F = new Array(q - 1); z < q; z++)
          F[z - 1] = arguments[z];
        C.fn.apply(C.context, F);
      } else {
        var Y = C.length, G;
        for (z = 0; z < Y; z++)
          switch (C[z].once && this.removeListener(d, C[z].fn, void 0, !0), q) {
            case 1:
              C[z].fn.call(C[z].context);
              break;
            case 2:
              C[z].fn.call(C[z].context, b);
              break;
            case 3:
              C[z].fn.call(C[z].context, b, m);
              break;
            case 4:
              C[z].fn.call(C[z].context, b, m, h);
              break;
            default:
              if (!F) for (G = 1, F = new Array(q - 1); G < q; G++)
                F[G - 1] = arguments[G];
              C[z].fn.apply(C[z].context, F);
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
        return o(this, p), this;
      var E = this._events[p];
      if (E.fn)
        E.fn === b && (!h || E.once) && (!m || E.context === m) && o(this, p);
      else {
        for (var N = 0, C = [], q = E.length; N < q; N++)
          (E[N].fn !== b || h && !E[N].once || m && E[N].context !== m) && C.push(E[N]);
        C.length ? this._events[p] = C.length === 1 ? C[0] : C : o(this, p);
      }
      return this;
    }, l.prototype.removeAllListeners = function(d) {
      var b;
      return d ? (b = t ? t + d : d, this._events[b] && o(this, b)) : (this._events = new r(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = t, l.EventEmitter = l, s.exports = l;
  })(si)), si.exports;
}
var Fp = Mp();
const Pp = /* @__PURE__ */ ol(Fp), Si = /* @__PURE__ */ new WeakMap(), ki = ["error", "warn", "log", "info"];
let Ci = "warn";
function hl(s) {
  if (Ci && ki.indexOf(s) <= ki.indexOf(Ci)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
      t[r - 1] = arguments[r];
    console[s](...t);
  }
}
function St(s) {
  return ki.reduce((e, t) => (e[t] = hl.bind(console, t, s), e), {});
}
St.level = (s) => {
  Ci = s;
};
hl.level = St.level;
const ni = St("quill:events"), jp = ["selectionchange", "mousedown", "mouseup", "click"];
jp.forEach((s) => {
  document.addEventListener(s, function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    Array.from(document.querySelectorAll(".ql-container")).forEach((n) => {
      const i = Si.get(n);
      i && i.emitter && i.emitter.handleDOM(...t);
    });
  });
});
class V extends Pp {
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
    super(), this.domListeners = {}, this.on("error", ni.error);
  }
  emit() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return ni.log.call(ni, ...t), super.emit(...t);
  }
  handleDOM(e) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      r[n - 1] = arguments[n];
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
const ii = St("quill:selection");
class er {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class Up {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new er(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, V.sources.USER), 1);
    }), this.emitter.on(V.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const r = this.getNativeRange();
      r != null && r.start.node !== this.cursor.textNode && this.emitter.once(V.events.SCROLL_UPDATE, (n, i) => {
        try {
          this.root.contains(r.start.node) && this.root.contains(r.end.node) && this.setNativeRange(r.start.node, r.start.offset, r.end.node, r.end.offset);
          const o = i.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(o ? V.sources.SILENT : n);
        } catch {
        }
      });
    }), this.emitter.on(V.events.SCROLL_OPTIMIZE, (r, n) => {
      if (n.range) {
        const {
          startNode: i,
          startOffset: o,
          endNode: l,
          endOffset: c
        } = n.range;
        this.setNativeRange(i, o, l, c), this.update(V.sources.SILENT);
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
        const n = this.scroll.find(r.start.node, !1);
        if (n == null) return;
        if (n instanceof $e) {
          const i = n.split(r.start.offset);
          n.parent.insertBefore(this.cursor, i);
        } else
          n.insertBefore(this.cursor, r.start.node);
        this.cursor.attach();
      }
      this.cursor.format(e, t), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
    }
  }
  getBounds(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const r = this.scroll.length();
    e = Math.min(e, r - 1), t = Math.min(e + t, r - 1) - e;
    let n, [i, o] = this.scroll.leaf(e);
    if (i == null) return null;
    if (t > 0 && o === i.length()) {
      const [b] = this.scroll.leaf(e + 1);
      if (b) {
        const [m] = this.scroll.line(e), [h] = this.scroll.line(e + 1);
        m === h && (i = b, o = 0);
      }
    }
    [n, o] = i.position(o, !0);
    const l = document.createRange();
    if (t > 0)
      return l.setStart(n, o), [i, o] = this.scroll.leaf(e + t), i == null ? null : ([n, o] = i.position(o, !0), l.setEnd(n, o), l.getBoundingClientRect());
    let c = "left", d;
    if (n instanceof Text) {
      if (!n.data.length)
        return null;
      o < n.data.length ? (l.setStart(n, o), l.setEnd(n, o + 1)) : (l.setStart(n, o - 1), l.setEnd(n, o), c = "right"), d = l.getBoundingClientRect();
    } else {
      if (!(i.domNode instanceof Element)) return null;
      d = i.domNode.getBoundingClientRect(), o > 0 && (c = "right");
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
    return document.activeElement === this.root || document.activeElement != null && ai(this.root, document.activeElement);
  }
  normalizedToRange(e) {
    const t = [[e.start.node, e.start.offset]];
    e.native.collapsed || t.push([e.end.node, e.end.offset]);
    const r = t.map((o) => {
      const [l, c] = o, d = this.scroll.find(l, !0), b = d.offset(this.scroll);
      return c === 0 ? b : d instanceof $e ? b + d.index(l, c) : b + d.length();
    }), n = Math.min(Math.max(...r), this.scroll.length() - 1), i = Math.min(n, ...r);
    return new er(i, n - i);
  }
  normalizeNative(e) {
    if (!ai(this.root, e.startContainer) || !e.collapsed && !ai(this.root, e.endContainer))
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
        node: n,
        offset: i
      } = r;
      for (; !(n instanceof Text) && n.childNodes.length > 0; )
        if (n.childNodes.length > i)
          n = n.childNodes[i], i = 0;
        else if (n.childNodes.length === i)
          n = n.lastChild, n instanceof Text ? i = n.data.length : n.childNodes.length > 0 ? i = n.childNodes.length : i = n.childNodes.length + 1;
        else
          break;
      r.node = n, r.offset = i;
    }), t;
  }
  rangeToNative(e) {
    const t = this.scroll.length(), r = (n, i) => {
      n = Math.min(t - 1, n);
      const [o, l] = this.scroll.leaf(n);
      return o ? o.position(l, i) : [null, -1];
    };
    return [...r(e.index, !1), ...r(e.index + e.length, !0)];
  }
  setNativeRange(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : t, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (ii.info("setNativeRange", e, t, r, n), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
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
        if (l == null || i || e !== l.startContainer || t !== l.startOffset || r !== l.endContainer || n !== l.endOffset) {
          e instanceof Element && e.tagName === "BR" && (t = Array.from(e.parentNode.childNodes).indexOf(e), e = e.parentNode), r instanceof Element && r.tagName === "BR" && (n = Array.from(r.parentNode.childNodes).indexOf(r), r = r.parentNode);
          const c = document.createRange();
          c.setStart(e, t), c.setEnd(r, n), o.removeAllRanges(), o.addRange(c);
        }
      } else
        o.removeAllRanges(), this.root.blur();
  }
  setRange(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : V.sources.API;
    if (typeof t == "string" && (r = t, t = !1), ii.info("setRange", e), e != null) {
      const n = this.rangeToNative(e);
      this.setNativeRange(...n, t);
    } else
      this.setNativeRange(null);
    this.update(r);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : V.sources.USER;
    const t = this.lastRange, [r, n] = this.getRange();
    if (this.lastRange = r, this.lastNative = n, this.lastRange != null && (this.savedRange = this.lastRange), !Ui(t, this.lastRange)) {
      if (!this.composing && n != null && n.native.collapsed && n.start.node !== this.cursor.textNode) {
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const i = [V.events.SELECTION_CHANGE, Nr(this.lastRange), Nr(t), e];
      this.emitter.emit(V.events.EDITOR_CHANGE, ...i), e !== V.sources.SILENT && this.emitter.emit(...i);
    }
  }
}
function ai(s, e) {
  try {
    e.parentNode;
  } catch {
    return !1;
  }
  return s.contains(e);
}
const zp = /^[ -~]*$/;
class Hp {
  constructor(e) {
    this.scroll = e, this.delta = this.getDelta();
  }
  applyDelta(e) {
    this.scroll.update();
    let t = this.scroll.length();
    this.scroll.batchStart();
    const r = Pa(e), n = new K();
    return Kp(r.ops.slice()).reduce((o, l) => {
      const c = Qe.Op.length(l);
      let d = l.attributes || {}, b = !1, m = !1;
      if (l.insert != null) {
        if (n.retain(c), typeof l.insert == "string") {
          const E = l.insert;
          m = !E.endsWith(`
`) && (t <= o || !!this.scroll.descendant(Xe, o)[0]), this.scroll.insertAt(o, E);
          const [N, C] = this.scroll.line(o);
          let q = $t({}, Ze(N));
          if (N instanceof Le) {
            const [F] = N.descendant($e, C);
            F && (q = $t(q, Ze(F)));
          }
          d = Qe.AttributeMap.diff(q, d) || {};
        } else if (typeof l.insert == "object") {
          const E = Object.keys(l.insert)[0];
          if (E == null) return o;
          const N = this.scroll.query(E, W.INLINE) != null;
          if (N)
            (t <= o || this.scroll.descendant(Xe, o)[0]) && (m = !0);
          else if (o > 0) {
            const [C, q] = this.scroll.descendant($e, o - 1);
            C instanceof ot ? C.value()[q] !== `
` && (b = !0) : C instanceof Ke && C.statics.scope === W.INLINE_BLOT && (b = !0);
          }
          if (this.scroll.insertAt(o, E, l.insert[E]), N) {
            const [C] = this.scroll.descendant($e, o);
            if (C) {
              const q = $t({}, Ze(C));
              d = Qe.AttributeMap.diff(q, d) || {};
            }
          }
        }
        t += c;
      } else if (n.push(l), l.retain !== null && typeof l.retain == "object") {
        const E = Object.keys(l.retain)[0];
        if (E == null) return o;
        this.scroll.updateEmbedAt(o, E, l.retain[E]);
      }
      Object.keys(d).forEach((E) => {
        this.scroll.formatAt(o, c, E, d[E]);
      });
      const h = b ? 1 : 0, p = m ? 1 : 0;
      return t += h + p, n.retain(h), n.delete(p), o + c + h + p;
    }, 0), n.reduce((o, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(o, l.delete), o) : o + Qe.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new K().retain(e).delete(t));
  }
  formatLine(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(r).forEach((i) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((o) => {
        o.format(i, r[i]);
      });
    }), this.scroll.optimize();
    const n = new K().retain(e).retain(t, Nr(r));
    return this.update(n);
  }
  formatText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((i) => {
      this.scroll.formatAt(e, t, i, r[i]);
    });
    const n = new K().retain(e).retain(t, Nr(r));
    return this.update(n);
  }
  getContents(e, t) {
    return this.delta.slice(e, e + t);
  }
  getDelta() {
    return this.scroll.lines().reduce((e, t) => e.concat(t.delta()), new K());
  }
  getFormat(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = [], n = [];
    t === 0 ? this.scroll.path(e).forEach((l) => {
      const [c] = l;
      c instanceof Le ? r.push(c) : c instanceof $e && n.push(c);
    }) : (r = this.scroll.lines(e, t), n = this.scroll.descendants($e, e, t));
    const [i, o] = [r, n].map((l) => {
      const c = l.shift();
      if (c == null) return {};
      let d = Ze(c);
      for (; Object.keys(d).length > 0; ) {
        const b = l.shift();
        if (b == null) return d;
        d = Vp(Ze(b), d);
      }
      return d;
    });
    return {
      ...i,
      ...o
    };
  }
  getHTML(e, t) {
    const [r, n] = this.scroll.line(e);
    if (r) {
      const i = r.length();
      return r.length() >= n + t && !(n === 0 && t === i) ? ls(r, n, t, !0) : ls(this.scroll, e, t, !0);
    }
    return "";
  }
  getText(e, t) {
    return this.getContents(e, t).filter((r) => typeof r.insert == "string").map((r) => r.insert).join("");
  }
  insertContents(e, t) {
    const r = Pa(t), n = new K().retain(e).concat(r);
    return this.scroll.insertContents(e, r), this.update(n);
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
`), this.scroll.insertAt(e, t), Object.keys(r).forEach((n) => {
      this.scroll.formatAt(e, t.length, n, r[n]);
    }), this.update(new K().retain(e).insert(t, Nr(r)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if (e?.statics.blotName !== Le.blotName) return !1;
    const t = e;
    return t.children.length > 1 ? !1 : t.children.head instanceof ct;
  }
  removeFormat(e, t) {
    const r = this.getText(e, t), [n, i] = this.scroll.line(e + t);
    let o = 0, l = new K();
    n != null && (o = n.length() - i, l = n.delta().slice(i, i + o - 1).insert(`
`));
    const d = this.getContents(e, t + o).diff(new K().insert(r).concat(l)), b = new K().retain(e).concat(d);
    return this.applyDelta(b);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const n = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(zp) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), o = Ze(i), l = i.offset(this.scroll), c = t[0].oldValue.replace(nt.CONTENTS, ""), d = new K().insert(c), b = new K().insert(i.value()), m = r && {
        oldRange: ja(r.oldRange, -l),
        newRange: ja(r.newRange, -l)
      };
      e = new K().retain(l).concat(d.diff(b, m)).reduce((p, E) => E.insert ? p.insert(E.insert, o) : p.push(E), new K()), this.delta = n.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !Ui(n.compose(e), this.delta)) && (e = n.diff(this.delta, r));
    return e;
  }
}
function Ar(s, e, t) {
  if (s.length === 0) {
    const [p] = oi(t.pop());
    return e <= 0 ? `</li></${p}>` : `</li></${p}>${Ar([], e - 1, t)}`;
  }
  const [{
    child: r,
    offset: n,
    length: i,
    indent: o,
    type: l
  }, ...c] = s, [d, b] = oi(l);
  if (o > e)
    return t.push(l), o === e + 1 ? `<${d}><li${b}>${ls(r, n, i)}${Ar(c, o, t)}` : `<${d}><li>${Ar(s, e + 1, t)}`;
  const m = t[t.length - 1];
  if (o === e && l === m)
    return `</li><li${b}>${ls(r, n, i)}${Ar(c, o, t)}`;
  const [h] = oi(t.pop());
  return `</li></${h}>${Ar(s, e - 1, t)}`;
}
function ls(s, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in s && typeof s.html == "function")
    return s.html(e, t);
  if (s instanceof ot)
    return un(s.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (s instanceof at) {
    if (s.statics.blotName === "list-container") {
      const d = [];
      return s.children.forEachAt(e, t, (b, m, h) => {
        const p = "formats" in b && typeof b.formats == "function" ? b.formats() : {};
        d.push({
          child: b,
          offset: m,
          length: h,
          indent: p.indent || 0,
          type: p.list
        });
      }), Ar(d, -1, []);
    }
    const n = [];
    if (s.children.forEachAt(e, t, (d, b, m) => {
      n.push(ls(d, b, m));
    }), r || s.statics.blotName === "list")
      return n.join("");
    const {
      outerHTML: i,
      innerHTML: o
    } = s.domNode, [l, c] = i.split(`>${o}<`);
    return l === "<table" ? `<table style="border: 1px solid #000;">${n.join("")}<${c}` : `${l}>${n.join("")}<${c}`;
  }
  return s.domNode instanceof Element ? s.domNode.outerHTML : "";
}
function Vp(s, e) {
  return Object.keys(e).reduce((t, r) => {
    if (s[r] == null) return t;
    const n = e[r];
    return n === s[r] ? t[r] = n : Array.isArray(n) ? n.indexOf(s[r]) < 0 ? t[r] = n.concat([s[r]]) : t[r] = n : t[r] = [n, s[r]], t;
  }, {});
}
function oi(s) {
  const e = s === "ordered" ? "ol" : "ul";
  switch (s) {
    case "checked":
      return [e, ' data-list="checked"'];
    case "unchecked":
      return [e, ' data-list="unchecked"'];
    default:
      return [e, ""];
  }
}
function Pa(s) {
  return s.reduce((e, t) => {
    if (typeof t.insert == "string") {
      const r = t.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return e.insert(r, t.attributes);
    }
    return e.push(t);
  }, new K());
}
function ja(s, e) {
  let {
    index: t,
    length: r
  } = s;
  return new er(t + e, r);
}
function Kp(s) {
  const e = [];
  return s.forEach((t) => {
    typeof t.insert == "string" ? t.insert.split(`
`).forEach((n, i) => {
      i && e.push({
        insert: `
`,
        attributes: t.attributes
      }), n && e.push({
        insert: n,
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
const Ms = "\uFEFF";
class Vi extends Ke {
  constructor(e, t) {
    super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((r) => {
      this.contentNode.appendChild(r);
    }), this.leftGuard = document.createTextNode(Ms), this.rightGuard = document.createTextNode(Ms), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(e, t) {
    return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
  }
  restore(e) {
    let t = null, r;
    const n = e.data.split(Ms).join("");
    if (e === this.leftGuard)
      if (this.prev instanceof ot) {
        const i = this.prev.length();
        this.prev.insertAt(i, n), t = {
          startNode: this.prev.domNode,
          startOffset: i + n.length
        };
      } else
        r = document.createTextNode(n), this.parent.insertBefore(this.scroll.create(r), this), t = {
          startNode: r,
          startOffset: n.length
        };
    else e === this.rightGuard && (this.next instanceof ot ? (this.next.insertAt(0, n), t = {
      startNode: this.next.domNode,
      startOffset: n.length
    }) : (r = document.createTextNode(n), this.parent.insertBefore(this.scroll.create(r), this.next), t = {
      startNode: r,
      startOffset: n.length
    }));
    return e.data = Ms, t;
  }
  update(e, t) {
    e.forEach((r) => {
      if (r.type === "characterData" && (r.target === this.leftGuard || r.target === this.rightGuard)) {
        const n = this.restore(r.target);
        n && (t.range = n);
      }
    });
  }
}
class Gp {
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
    t && !(t instanceof Vi) && (this.emitter.emit(V.events.COMPOSITION_BEFORE_START, e), this.scroll.batchStart(), this.emitter.emit(V.events.COMPOSITION_START, e), this.isComposing = !0);
  }
  handleCompositionEnd(e) {
    this.emitter.emit(V.events.COMPOSITION_BEFORE_END, e), this.scroll.batchEnd(), this.emitter.emit(V.events.COMPOSITION_END, e), this.isComposing = !1;
  }
}
class qr {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: qr
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
const Wp = (s) => s.parentElement || s.getRootNode().host || null, Zp = (s) => {
  const e = s.getBoundingClientRect(), t = "offsetWidth" in s && Math.abs(e.width) / s.offsetWidth || 1, r = "offsetHeight" in s && Math.abs(e.height) / s.offsetHeight || 1;
  return {
    top: e.top,
    right: e.left + s.clientWidth * t,
    bottom: e.top + s.clientHeight * r,
    left: e.left
  };
}, Fs = (s) => {
  const e = parseInt(s, 10);
  return Number.isNaN(e) ? 0 : e;
}, Ua = (s, e, t, r, n, i) => s < t && e > r ? 0 : s < t ? -(t - s + n) : e > r ? e - s > r - t ? s + n - t : e - r + i : 0, Yp = (s, e) => {
  const t = s.ownerDocument;
  let r = e, n = s;
  for (; n; ) {
    const i = n === t.body, o = i ? {
      top: 0,
      right: window.visualViewport?.width ?? t.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? t.documentElement.clientHeight,
      left: 0
    } : Zp(n), l = getComputedStyle(n), c = Ua(r.left, r.right, o.left, o.right, Fs(l.scrollPaddingLeft), Fs(l.scrollPaddingRight)), d = Ua(r.top, r.bottom, o.top, o.bottom, Fs(l.scrollPaddingTop), Fs(l.scrollPaddingBottom));
    if (c || d)
      if (i)
        t.defaultView?.scrollBy(c, d);
      else {
        const {
          scrollLeft: b,
          scrollTop: m
        } = n;
        d && (n.scrollTop += d), c && (n.scrollLeft += c);
        const h = n.scrollLeft - b, p = n.scrollTop - m;
        r = {
          left: r.left - h,
          top: r.top - p,
          right: r.right - h,
          bottom: r.bottom - p
        };
      }
    n = i || l.position === "fixed" ? null : Wp(n);
  }
}, Xp = 100, Qp = ["block", "break", "cursor", "inline", "scroll", "text"], Jp = (s, e, t) => {
  const r = new Cr();
  return Qp.forEach((n) => {
    const i = e.query(n);
    i && r.register(i);
  }), s.forEach((n) => {
    let i = e.query(n);
    i || t.error(`Cannot register "${n}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; i; )
      if (r.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, o += 1, o > Xp) {
        t.error(`Cycle detected in registering blot requiredContainer: "${n}"`);
        break;
      }
  }), r;
}, _r = St("quill"), Ps = new Cr();
at.uiClass = "ql-ui";
class I {
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
    registry: Ps,
    theme: "default"
  };
  static events = V.events;
  static sources = V.sources;
  static version = "2.0.3";
  static imports = {
    delta: K,
    parchment: Op,
    "core/module": gt,
    "core/theme": qr
  };
  static debug(e) {
    e === !0 && (e = "log"), St.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Si.get(e) || Ps.find(e, t);
  }
  static import(e) {
    return this.imports[e] == null && _r.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), r = "attrName" in e ? e.attrName : e.blotName;
      typeof r == "string" ? this.register(`formats/${r}`, e, t) : Object.keys(e).forEach((n) => {
        this.register(n, e[n], t);
      });
    } else {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], r = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[e] != null && !r && _r.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && Ps.register(t), typeof t.register == "function" && t.register(Ps);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = em(e, t), this.container = this.options.container, this.container == null) {
      _r.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && I.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Si.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new V();
    const n = Hi.blotName, i = this.options.registry.query(n);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${n}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Hp(this.scroll), this.selection = new Up(this.scroll, this.emitter), this.composition = new Gp(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(V.events.EDITOR_CHANGE, (o) => {
      o === V.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(V.events.SCROLL_UPDATE, (o, l) => {
      const c = this.selection.lastRange, [d] = this.selection.getRange(), b = c && d ? {
        oldRange: c,
        newRange: d
      } : void 0;
      tt.call(this, () => this.editor.update(null, l, b), o);
    }), this.emitter.on(V.events.SCROLL_EMBED_UPDATE, (o, l) => {
      const c = this.selection.lastRange, [d] = this.selection.getRange(), b = c && d ? {
        oldRange: c,
        newRange: d
      } : void 0;
      tt.call(this, () => {
        const m = new K().retain(o.offset(this)).retain({
          [o.statics.blotName]: l
        });
        return this.editor.update(m, [], b);
      }, I.sources.USER);
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
    return [e, t, , r] = wt(e, t, r), tt.call(this, () => this.editor.deleteText(e, t), r, e, -1 * t);
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
      const n = this.getSelection(!0);
      let i = new K();
      if (n == null) return i;
      if (this.scroll.query(e, W.BLOCK))
        i = this.editor.formatLine(n.index, n.length, {
          [e]: t
        });
      else {
        if (n.length === 0)
          return this.selection.format(e, t), i;
        i = this.editor.formatText(n.index, n.length, {
          [e]: t
        });
      }
      return this.setSelection(n, V.sources.SILENT), i;
    }, r);
  }
  formatLine(e, t, r, n, i) {
    let o;
    return [e, t, o, i] = wt(
      e,
      t,
      // @ts-expect-error
      r,
      n,
      i
    ), tt.call(this, () => this.editor.formatLine(e, t, o), i, e, 0);
  }
  formatText(e, t, r, n, i) {
    let o;
    return [e, t, o, i] = wt(
      // @ts-expect-error
      e,
      t,
      r,
      n,
      i
    ), tt.call(this, () => this.editor.formatText(e, t, o), i, e, 0);
  }
  getBounds(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = null;
    if (typeof e == "number" ? r = this.selection.getBounds(e, t) : r = this.selection.getBounds(e.index, e.length), !r) return null;
    const n = this.container.getBoundingClientRect();
    return {
      bottom: r.bottom - n.top,
      height: r.height,
      left: r.left - n.left,
      right: r.right - n.left,
      top: r.top - n.top,
      width: r.width
    };
  }
  getContents() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - e;
    return [e, t] = wt(e, t), this.editor.getContents(e, t);
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
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = wt(e, t), this.editor.getHTML(e, t);
  }
  getText() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = wt(e, t), this.editor.getText(e, t);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(e, t, r) {
    let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : I.sources.API;
    return tt.call(this, () => this.editor.insertEmbed(e, t, r), n, e);
  }
  insertText(e, t, r, n, i) {
    let o;
    return [e, , o, i] = wt(e, 0, r, n, i), tt.call(this, () => this.editor.insertText(e, t, o), i, e, t.length);
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
    return [e, t, , r] = wt(e, t, r), tt.call(this, () => this.editor.removeFormat(e, t), r, e);
  }
  scrollRectIntoView(e) {
    Yp(this.root, e);
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
      const r = this.getLength(), n = this.editor.deleteText(0, r), i = this.editor.insertContents(0, e), o = this.editor.deleteText(this.getLength() - 1, 1);
      return n.compose(i).compose(o);
    }, t);
  }
  setSelection(e, t, r) {
    e == null ? this.selection.setRange(null, t || I.sources.API) : ([e, t, , r] = wt(e, t, r), this.selection.setRange(new er(Math.max(0, e), t), r), r !== V.sources.SILENT && this.scrollSelectionIntoView());
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
function za(s) {
  return typeof s == "string" ? document.querySelector(s) : s;
}
function li(s) {
  return Object.entries(s ?? {}).reduce((e, t) => {
    let [r, n] = t;
    return {
      ...e,
      [r]: n === !0 ? {} : n
    };
  }, {});
}
function Ha(s) {
  return Object.fromEntries(Object.entries(s).filter((e) => e[1] !== void 0));
}
function em(s, e) {
  const t = za(s);
  if (!t)
    throw new Error("Invalid Quill container");
  const n = !e.theme || e.theme === I.DEFAULTS.theme ? qr : I.import(`themes/${e.theme}`);
  if (!n)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: i,
    ...o
  } = I.DEFAULTS, {
    modules: l,
    ...c
  } = n.DEFAULTS;
  let d = li(e.modules);
  d != null && d.toolbar && d.toolbar.constructor !== Object && (d = {
    ...d,
    toolbar: {
      container: d.toolbar
    }
  });
  const b = $t({}, li(i), li(l), d), m = {
    ...o,
    ...Ha(c),
    ...Ha(e)
  };
  let h = e.registry;
  return h ? e.formats && _r.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? Jp(e.formats, m.registry, _r) : m.registry, {
    ...m,
    registry: h,
    container: t,
    theme: n,
    modules: Object.entries(b).reduce((p, E) => {
      let [N, C] = E;
      if (!C) return p;
      const q = I.import(`modules/${N}`);
      return q == null ? (_r.error(`Cannot load ${N} module. Are you sure you registered it?`), p) : {
        ...p,
        // @ts-expect-error
        [N]: $t({}, q.DEFAULTS || {}, C)
      };
    }, {}),
    bounds: za(m.bounds)
  };
}
function tt(s, e, t, r) {
  if (!this.isEnabled() && e === V.sources.USER && !this.allowReadOnlyEdits)
    return new K();
  let n = t == null ? null : this.getSelection();
  const i = this.editor.delta, o = s();
  if (n != null && (t === !0 && (t = n.index), r == null ? n = Va(n, o, e) : r !== 0 && (n = Va(n, t, r, e)), this.setSelection(n, V.sources.SILENT)), o.length() > 0) {
    const l = [V.events.TEXT_CHANGE, o, i, e];
    this.emitter.emit(V.events.EDITOR_CHANGE, ...l), e !== V.sources.SILENT && this.emitter.emit(...l);
  }
  return o;
}
function wt(s, e, t, r, n) {
  let i = {};
  return typeof s.index == "number" && typeof s.length == "number" ? typeof e != "number" ? (n = r, r = t, t = e, e = s.length, s = s.index) : (e = s.length, s = s.index) : typeof e != "number" && (n = r, r = t, t = e, e = 0), typeof t == "object" ? (i = t, n = r) : typeof t == "string" && (r != null ? i[t] = r : n = t), n = n || V.sources.API, [s, e, i, n];
}
function Va(s, e, t, r) {
  const n = typeof t == "number" ? t : 0;
  if (s == null) return null;
  let i, o;
  return e && typeof e.transformPosition == "function" ? [i, o] = [s.index, s.index + s.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(l, r !== V.sources.USER)
  )) : [i, o] = [s.index, s.index + s.length].map((l) => l < e || l === e && r === V.sources.USER ? l : n >= 0 ? l + n : Math.max(e, l + n)), new er(i, o - i);
}
class ir extends cn {
}
function Ka(s) {
  return s instanceof Le || s instanceof Xe;
}
function Ga(s) {
  return typeof s.updateContent == "function";
}
class tm extends Hi {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = Le;
  static allowedChildren = [Le, Xe, ir];
  constructor(e, t, r) {
    let {
      emitter: n
    } = r;
    super(e, t), this.emitter = n, this.batch = !1, this.optimize(), this.enable(), this.domNode.addEventListener("dragstart", (i) => this.handleDragStart(i));
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
    const [r, n] = this.line(e), [i] = this.line(e + t);
    if (super.deleteAt(e, t), i != null && r !== i && n > 0) {
      if (r instanceof Xe || i instanceof Xe) {
        this.optimize();
        return;
      }
      const o = i.children.head instanceof ct ? null : i.children.head;
      r.moveChildren(i, o), r.remove();
    }
    this.optimize();
  }
  enable() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.domNode.setAttribute("contenteditable", e ? "true" : "false");
  }
  formatAt(e, t, r, n) {
    super.formatAt(e, t, r, n), this.optimize();
  }
  insertAt(e, t, r) {
    if (e >= this.length())
      if (r == null || this.scroll.query(t, W.BLOCK) == null) {
        const n = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(n), r == null && t.endsWith(`
`) ? n.insertAt(0, t.slice(0, -1), r) : n.insertAt(0, t, r);
      } else {
        const n = this.scroll.create(t, r);
        this.appendChild(n);
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
`))), n = r.pop();
    if (n == null) return;
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
      Object.keys(p).forEach((E) => {
        this.formatAt(m - 1, 1, E, p[E]);
      }), e = m;
    }
    let [o, l] = this.children.find(e);
    if (r.length && (o && (o = o.split(l), l = 0), r.forEach((c) => {
      if (c.type === "block") {
        const d = this.createBlock(c.attributes, o || void 0);
        ci(d, 0, c.delta);
      } else {
        const d = this.create(c.key, c.value);
        this.insertBefore(d, o || void 0), Object.keys(c.attributes).forEach((b) => {
          d.format(b, c.attributes[b]);
        });
      }
    })), n.type === "block" && n.delta.length()) {
      const c = o ? o.offset(o.scroll) + l : this.length();
      ci(this, c, n.delta);
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
    const [r, n] = t;
    return r instanceof $e ? [r, n] : [null, -1];
  }
  line(e) {
    return e === this.length() ? this.line(e - 1) : this.descendant(Ka, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (n, i, o) => {
      let l = [], c = o;
      return n.children.forEachAt(i, o, (d, b, m) => {
        Ka(d) ? l.push(d) : d instanceof cn && (l = l.concat(r(d, b, c))), c -= m;
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
        target: n
      } = r;
      const i = this.find(n, !0);
      return i && !Ga(i);
    }), e.length > 0 && this.emitter.emit(V.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(V.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, r) {
    const [n] = this.descendant((i) => i instanceof Xe, e);
    n && n.statics.blotName === t && Ga(n) && n.updateContent(r);
  }
  handleDragStart(e) {
    e.preventDefault();
  }
  deltaToRenderBlocks(e) {
    const t = [];
    let r = new K();
    return e.forEach((n) => {
      const i = n?.insert;
      if (i)
        if (typeof i == "string") {
          const o = i.split(`
`);
          o.slice(0, -1).forEach((c) => {
            r.insert(c, n.attributes), t.push({
              type: "block",
              delta: r,
              attributes: n.attributes ?? {}
            }), r = new K();
          });
          const l = o[o.length - 1];
          l && r.insert(l, n.attributes);
        } else {
          const o = Object.keys(i)[0];
          if (!o) return;
          this.query(o, W.INLINE) ? r.push(n) : (r.length() && t.push({
            type: "block",
            delta: r,
            attributes: {}
          }), r = new K(), t.push({
            type: "blockEmbed",
            key: o,
            value: i[o],
            attributes: n.attributes ?? {}
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
    const n = {};
    Object.entries(e).forEach((l) => {
      let [c, d] = l;
      this.query(c, W.BLOCK & W.BLOT) != null ? r = c : n[c] = d;
    });
    const i = this.create(r || this.statics.defaultChild.blotName, r ? e[r] : void 0);
    this.insertBefore(i, t || void 0);
    const o = i.length();
    return Object.entries(n).forEach((l) => {
      let [c, d] = l;
      i.formatAt(0, o, c, d);
    }), i;
  }
}
function ci(s, e, t) {
  t.reduce((r, n) => {
    const i = Qe.Op.length(n);
    let o = n.attributes || {};
    if (n.insert != null) {
      if (typeof n.insert == "string") {
        const l = n.insert;
        s.insertAt(r, l);
        const [c] = s.descendant($e, r), d = Ze(c);
        o = Qe.AttributeMap.diff(d, o) || {};
      } else if (typeof n.insert == "object") {
        const l = Object.keys(n.insert)[0];
        if (l == null) return r;
        if (s.insertAt(r, l, n.insert[l]), s.scroll.query(l, W.INLINE) != null) {
          const [d] = s.descendant($e, r), b = Ze(d);
          o = Qe.AttributeMap.diff(b, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((l) => {
      s.formatAt(r, i, l, o[l]);
    }), r + i;
  }, e);
}
const Ki = {
  scope: W.BLOCK,
  whitelist: ["right", "center", "justify"]
}, rm = new pt("align", "align", Ki), fl = new lt("align", "ql-align", Ki), pl = new Pt("align", "text-align", Ki);
class ml extends Pt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((n) => `00${parseInt(n, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const sm = new lt("color", "ql-color", {
  scope: W.INLINE
}), Gi = new ml("color", "color", {
  scope: W.INLINE
}), nm = new lt("background", "ql-bg", {
  scope: W.INLINE
}), Wi = new ml("background", "background-color", {
  scope: W.INLINE
});
class ar extends ir {
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
${un(this.code(e, t))}
</pre>`;
  }
}
class Pe extends Le {
  static TAB = "  ";
  static register() {
    I.register(ar);
  }
}
class Zi extends Fe {
}
Zi.blotName = "code";
Zi.tagName = "CODE";
Pe.blotName = "code-block";
Pe.className = "ql-code-block";
Pe.tagName = "DIV";
ar.blotName = "code-block-container";
ar.className = "ql-code-block-container";
ar.tagName = "DIV";
ar.allowedChildren = [Pe];
Pe.allowedChildren = [ot, ct, nt];
Pe.requiredContainer = ar;
const Yi = {
  scope: W.BLOCK,
  whitelist: ["rtl"]
}, gl = new pt("direction", "dir", Yi), bl = new lt("direction", "ql-direction", Yi), yl = new Pt("direction", "direction", Yi), vl = {
  scope: W.INLINE,
  whitelist: ["serif", "monospace"]
}, xl = new lt("font", "ql-font", vl);
class im extends Pt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const wl = new im("font", "font-family", vl), Al = new lt("size", "ql-size", {
  scope: W.INLINE,
  whitelist: ["small", "large", "huge"]
}), El = new Pt("size", "font-size", {
  scope: W.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), am = St("quill:keyboard"), om = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class dn extends gt {
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
    const n = cm(e);
    if (n == null) {
      am.warn("Attempted to add invalid keyboard binding", n);
      return;
    }
    typeof t == "function" && (t = {
      handler: t
    }), typeof r == "function" && (r = {
      handler: r
    }), (Array.isArray(n.key) ? n.key : [n.key]).forEach((o) => {
      const l = {
        ...n,
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
      const n = (this.bindings[e.key] || []).concat(this.bindings[e.which] || []).filter((q) => dn.match(e, q));
      if (n.length === 0) return;
      const i = I.find(e.target, !0);
      if (i && i.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [l, c] = this.quill.getLine(o.index), [d, b] = this.quill.getLeaf(o.index), [m, h] = o.length === 0 ? [d, b] : this.quill.getLeaf(o.index + o.length), p = d instanceof Qs ? d.value().slice(0, b) : "", E = m instanceof Qs ? m.value().slice(h) : "", N = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(o),
        line: l,
        offset: c,
        prefix: p,
        suffix: E,
        event: e
      };
      n.some((q) => {
        if (q.collapsed != null && q.collapsed !== N.collapsed || q.empty != null && q.empty !== N.empty || q.offset != null && q.offset !== N.offset)
          return !1;
        if (Array.isArray(q.format)) {
          if (q.format.every((F) => N.format[F] == null))
            return !1;
        } else if (typeof q.format == "object" && !Object.keys(q.format).every((F) => q.format[F] === !0 ? N.format[F] != null : q.format[F] === !1 ? N.format[F] == null : Ui(q.format[F], N.format[F])))
          return !1;
        return q.prefix != null && !q.prefix.test(N.prefix) || q.suffix != null && !q.suffix.test(N.suffix) ? !1 : q.handler.call(this, o, N, q) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let n = {};
    const [i] = this.quill.getLine(e.index);
    let o = new K().retain(e.index - r).delete(r);
    if (t.offset === 0) {
      const [l] = this.quill.getLine(e.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const d = i.formats(), b = this.quill.getFormat(e.index - 1, 1);
        if (n = Qe.AttributeMap.diff(d, b) || {}, Object.keys(n).length > 0) {
          const m = new K().retain(e.index + i.length() - 2).retain(1, n);
          o = o.compose(m);
        }
      }
    }
    this.quill.updateContents(o, I.sources.USER), this.quill.focus();
  }
  handleDelete(e, t) {
    const r = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
    if (e.index >= this.quill.getLength() - r) return;
    let n = {};
    const [i] = this.quill.getLine(e.index);
    let o = new K().retain(e.index).delete(r);
    if (t.offset >= i.length() - 1) {
      const [l] = this.quill.getLine(e.index + 1);
      if (l) {
        const c = i.formats(), d = this.quill.getFormat(e.index, 1);
        n = Qe.AttributeMap.diff(c, d) || {}, Object.keys(n).length > 0 && (o = o.retain(l.length() - 1).retain(1, n));
      }
    }
    this.quill.updateContents(o, I.sources.USER), this.quill.focus();
  }
  handleDeleteRange(e) {
    Xi({
      range: e,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(e, t) {
    const r = Object.keys(t.format).reduce((i, o) => (this.quill.scroll.query(o, W.BLOCK) && !Array.isArray(t.format[o]) && (i[o] = t.format[o]), i), {}), n = new K().retain(e.index).delete(e.length).insert(`
`, r);
    this.quill.updateContents(n, I.sources.USER), this.quill.setSelection(e.index + 1, I.sources.SILENT), this.quill.focus();
  }
}
const lm = {
  bindings: {
    bold: ui("bold"),
    italic: ui("italic"),
    underline: ui("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(s, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "+1", I.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(s, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "-1", I.sources.USER), !1);
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
      handler(s, e) {
        e.format.indent != null ? this.quill.format("indent", "-1", I.sources.USER) : e.format.list != null && this.quill.format("list", !1, I.sources.USER);
      }
    },
    "indent code-block": Wa(!0),
    "outdent code-block": Wa(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(s) {
        this.quill.deleteText(s.index - 1, 1, I.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(s, e) {
        if (e.format.table) return !0;
        this.quill.history.cutoff();
        const t = new K().retain(s.index).delete(s.length).insert("	");
        return this.quill.updateContents(t, I.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(s.index + 1, I.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, I.sources.USER);
      }
    },
    "list empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["list"],
      empty: !0,
      handler(s, e) {
        const t = {
          list: !1
        };
        e.format.indent && (t.indent = !1), this.quill.formatLine(s.index, s.length, t, I.sources.USER);
      }
    },
    "checklist enter": {
      key: "Enter",
      collapsed: !0,
      format: {
        list: "checked"
      },
      handler(s) {
        const [e, t] = this.quill.getLine(s.index), r = {
          // @ts-expect-error Fix me later
          ...e.formats(),
          list: "checked"
        }, n = new K().retain(s.index).insert(`
`, r).retain(e.length() - t - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(n, I.sources.USER), this.quill.setSelection(s.index + 1, I.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(s, e) {
        const [t, r] = this.quill.getLine(s.index), n = new K().retain(s.index).insert(`
`, e.format).retain(t.length() - r - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(n, I.sources.USER), this.quill.setSelection(s.index + 1, I.sources.SILENT), this.quill.scrollSelectionIntoView();
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
      handler(s) {
        const e = this.quill.getModule("table");
        if (e) {
          const [t, r, n, i] = e.getTable(s), o = um(t, r, n, i);
          if (o == null) return;
          let l = t.offset();
          if (o < 0) {
            const c = new K().retain(l).insert(`
`);
            this.quill.updateContents(c, I.sources.USER), this.quill.setSelection(s.index + 1, s.length, I.sources.SILENT);
          } else if (o > 0) {
            l += t.length();
            const c = new K().retain(l).insert(`
`);
            this.quill.updateContents(c, I.sources.USER), this.quill.setSelection(l, I.sources.USER);
          }
        }
      }
    },
    "table tab": {
      key: "Tab",
      shiftKey: null,
      format: ["table"],
      handler(s, e) {
        const {
          event: t,
          line: r
        } = e, n = r.offset(this.quill.scroll);
        t.shiftKey ? this.quill.setSelection(n - 1, I.sources.USER) : this.quill.setSelection(n + r.length(), I.sources.USER);
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
      handler(s, e) {
        if (this.quill.scroll.query("list") == null) return !0;
        const {
          length: t
        } = e.prefix, [r, n] = this.quill.getLine(s.index);
        if (n > t) return !0;
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
        this.quill.insertText(s.index, " ", I.sources.USER), this.quill.history.cutoff();
        const o = new K().retain(s.index - n).delete(t + 1).retain(r.length() - 2 - n).retain(1, {
          list: i
        });
        return this.quill.updateContents(o, I.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(s.index - t, I.sources.SILENT), !1;
      }
    },
    "code exit": {
      key: "Enter",
      collapsed: !0,
      format: ["code-block"],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(s) {
        const [e, t] = this.quill.getLine(s.index);
        let r = 2, n = e;
        for (; n != null && n.length() <= 1 && n.formats()["code-block"]; )
          if (n = n.prev, r -= 1, r <= 0) {
            const i = new K().retain(s.index + e.length() - t - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(i, I.sources.USER), this.quill.setSelection(s.index - 1, I.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": js("ArrowLeft", !1),
    "embed left shift": js("ArrowLeft", !0),
    "embed right": js("ArrowRight", !1),
    "embed right shift": js("ArrowRight", !0),
    "table down": Za(!1),
    "table up": Za(!0)
  }
};
dn.DEFAULTS = lm;
function Wa(s) {
  return {
    key: "Tab",
    shiftKey: !s,
    format: {
      "code-block": !0
    },
    handler(e, t) {
      let {
        event: r
      } = t;
      const n = this.quill.scroll.query("code-block"), {
        TAB: i
      } = n;
      if (e.length === 0 && !r.shiftKey) {
        this.quill.insertText(e.index, i, I.sources.USER), this.quill.setSelection(e.index + i.length, I.sources.SILENT);
        return;
      }
      const o = e.length === 0 ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
      let {
        index: l,
        length: c
      } = e;
      o.forEach((d, b) => {
        s ? (d.insertAt(0, i), b === 0 ? l += i.length : c += i.length) : d.domNode.textContent.startsWith(i) && (d.deleteAt(0, i.length), b === 0 ? l -= i.length : c -= i.length);
      }), this.quill.update(I.sources.USER), this.quill.setSelection(l, c, I.sources.SILENT);
    }
  };
}
function js(s, e) {
  return {
    key: s,
    shiftKey: e,
    altKey: null,
    [s === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
    handler(r) {
      let {
        index: n
      } = r;
      s === "ArrowRight" && (n += r.length + 1);
      const [i] = this.quill.getLeaf(n);
      return i instanceof Ke ? (s === "ArrowLeft" ? e ? this.quill.setSelection(r.index - 1, r.length + 1, I.sources.USER) : this.quill.setSelection(r.index - 1, I.sources.USER) : e ? this.quill.setSelection(r.index, r.length + 1, I.sources.USER) : this.quill.setSelection(r.index + r.length + 1, I.sources.USER), !1) : !0;
    }
  };
}
function ui(s) {
  return {
    key: s[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(s, !t.format[s], I.sources.USER);
    }
  };
}
function Za(s) {
  return {
    key: s ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(e, t) {
      const r = s ? "prev" : "next", n = t.line, i = n.parent[r];
      if (i != null) {
        if (i.statics.blotName === "table-row") {
          let o = i.children.head, l = n;
          for (; l.prev != null; )
            l = l.prev, o = o.next;
          const c = o.offset(this.quill.scroll) + Math.min(t.offset, o.length() - 1);
          this.quill.setSelection(c, 0, I.sources.USER);
        }
      } else {
        const o = n.table()[r];
        o != null && (s ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, I.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, I.sources.USER));
      }
      return !1;
    }
  };
}
function cm(s) {
  if (typeof s == "string" || typeof s == "number")
    s = {
      key: s
    };
  else if (typeof s == "object")
    s = Nr(s);
  else
    return null;
  return s.shortKey && (s[om] = s.shortKey, delete s.shortKey), s;
}
function Xi(s) {
  let {
    quill: e,
    range: t
  } = s;
  const r = e.getLines(t);
  let n = {};
  if (r.length > 1) {
    const i = r[0].formats(), o = r[r.length - 1].formats();
    n = Qe.AttributeMap.diff(o, i) || {};
  }
  e.deleteText(t, I.sources.USER), Object.keys(n).length > 0 && e.formatLine(t.index, 1, n, I.sources.USER), e.setSelection(t.index, I.sources.SILENT);
}
function um(s, e, t, r) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? r === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const dm = /font-weight:\s*normal/, hm = ["P", "OL", "UL"], Ya = (s) => s && hm.includes(s.tagName), fm = (s) => {
  Array.from(s.querySelectorAll("br")).filter((e) => Ya(e.previousElementSibling) && Ya(e.nextElementSibling)).forEach((e) => {
    e.parentNode?.removeChild(e);
  });
}, pm = (s) => {
  Array.from(s.querySelectorAll('b[style*="font-weight"]')).filter((e) => e.getAttribute("style")?.match(dm)).forEach((e) => {
    const t = s.createDocumentFragment();
    t.append(...e.childNodes), e.parentNode?.replaceChild(t, e);
  });
};
function mm(s) {
  s.querySelector('[id^="docs-internal-guid-"]') && (pm(s), fm(s));
}
const gm = /\bmso-list:[^;]*ignore/i, bm = /\bmso-list:[^;]*\bl(\d+)/i, ym = /\bmso-list:[^;]*\blevel(\d+)/i, vm = (s, e) => {
  const t = s.getAttribute("style"), r = t?.match(bm);
  if (!r)
    return null;
  const n = Number(r[1]), i = t?.match(ym), o = i ? Number(i[1]) : 1, l = new RegExp(`@list l${n}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), c = e.match(l), d = c && c[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: n,
    indent: o,
    type: d,
    element: s
  };
}, xm = (s) => {
  const e = Array.from(s.querySelectorAll("[style*=mso-list]")), t = [], r = [];
  e.forEach((o) => {
    (o.getAttribute("style") || "").match(gm) ? t.push(o) : r.push(o);
  }), t.forEach((o) => o.parentNode?.removeChild(o));
  const n = s.documentElement.innerHTML, i = r.map((o) => vm(o, n)).filter((o) => o);
  for (; i.length; ) {
    const o = [];
    let l = i.shift();
    for (; l; )
      o.push(l), l = i.length && i[0]?.element === l.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      i[0].id === l.id ? i.shift() : null;
    const c = document.createElement("ul");
    o.forEach((m) => {
      const h = document.createElement("li");
      h.setAttribute("data-list", m.type), m.indent > 1 && h.setAttribute("class", `ql-indent-${m.indent - 1}`), h.innerHTML = m.element.innerHTML, c.appendChild(h);
    });
    const d = o[0]?.element, {
      parentNode: b
    } = d ?? {};
    d && b?.replaceChild(c, d), o.slice(1).forEach((m) => {
      let {
        element: h
      } = m;
      b?.removeChild(h);
    });
  }
};
function wm(s) {
  s.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && xm(s);
}
const Am = [wm, mm], Em = (s) => {
  s.documentElement && Am.forEach((e) => {
    e(s);
  });
}, Nm = St("quill:clipboard"), Tm = [[Node.TEXT_NODE, Mm], [Node.TEXT_NODE, Qa], ["br", qm], [Node.ELEMENT_NODE, Qa], [Node.ELEMENT_NODE, Lm], [Node.ELEMENT_NODE, Cm], [Node.ELEMENT_NODE, Bm], ["li", Rm], ["ol, ul", $m], ["pre", Om], ["tr", Dm], ["b", di("bold")], ["i", di("italic")], ["strike", di("strike")], ["style", Im]], _m = [rm, gl].reduce((s, e) => (s[e.keyName] = e, s), {}), Xa = [pl, Wi, Gi, yl, wl, El].reduce((s, e) => (s[e.keyName] = e, s), {});
class Sm extends gt {
  static DEFAULTS = {
    matchers: []
  };
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (r) => this.onCaptureCopy(r, !1)), this.quill.root.addEventListener("cut", (r) => this.onCaptureCopy(r, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], Tm.concat(this.options.matchers ?? []).forEach((r) => {
      let [n, i] = r;
      this.addMatcher(n, i);
    });
  }
  addMatcher(e, t) {
    this.matchers.push([e, t]);
  }
  convert(e) {
    let {
      html: t,
      text: r
    } = e, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (n[Pe.blotName])
      return new K().insert(r || "", {
        [Pe.blotName]: n[Pe.blotName]
      });
    if (!t)
      return new K().insert(r || "", n);
    const i = this.convertHTML(t);
    return fs(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || n.table) ? i.compose(new K().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(e) {
    Em(e);
  }
  convertHTML(e) {
    const t = new DOMParser().parseFromString(e, "text/html");
    this.normalizeHTML(t);
    const r = t.body, n = /* @__PURE__ */ new WeakMap(), [i, o] = this.prepareMatching(r, n);
    return Qi(this.quill.scroll, r, i, o, n);
  }
  dangerouslyPasteHTML(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : I.sources.API;
    if (typeof e == "string") {
      const n = this.convert({
        html: e,
        text: ""
      });
      this.quill.setContents(n, t), this.quill.setSelection(0, I.sources.SILENT);
    } else {
      const n = this.convert({
        html: t,
        text: ""
      });
      this.quill.updateContents(new K().retain(e).concat(n), r), this.quill.setSelection(e + n.length(), I.sources.SILENT);
    }
  }
  onCaptureCopy(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (e.defaultPrevented) return;
    e.preventDefault();
    const [r] = this.quill.selection.getRange();
    if (r == null) return;
    const {
      html: n,
      text: i
    } = this.onCopy(r, t);
    e.clipboardData?.setData("text/plain", i), e.clipboardData?.setData("text/html", n), t && Xi({
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
    let n = e.clipboardData?.getData("text/plain");
    if (!r && !n) {
      const o = e.clipboardData?.getData("text/uri-list");
      o && (n = this.normalizeURIList(o));
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
      text: n
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
      html: n
    } = t;
    const i = this.quill.getFormat(e.index), o = this.convert({
      text: r,
      html: n
    }, i);
    Nm.log("onPaste", o, {
      text: r,
      html: n
    });
    const l = new K().retain(e.index).delete(e.length).concat(o);
    this.quill.updateContents(l, I.sources.USER), this.quill.setSelection(l.length() - e.length, I.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(e, t) {
    const r = [], n = [];
    return this.matchers.forEach((i) => {
      const [o, l] = i;
      switch (o) {
        case Node.TEXT_NODE:
          n.push(l);
          break;
        case Node.ELEMENT_NODE:
          r.push(l);
          break;
        default:
          Array.from(e.querySelectorAll(o)).forEach((c) => {
            t.has(c) ? t.get(c)?.push(l) : t.set(c, [l]);
          });
          break;
      }
    }), [r, n];
  }
}
function or(s, e, t, r) {
  return r.query(e) ? s.reduce((n, i) => {
    if (!i.insert) return n;
    if (i.attributes && i.attributes[e])
      return n.push(i);
    const o = t ? {
      [e]: t
    } : {};
    return n.insert(i.insert, {
      ...o,
      ...i.attributes
    });
  }, new K()) : s;
}
function fs(s, e) {
  let t = "";
  for (let r = s.ops.length - 1; r >= 0 && t.length < e.length; --r) {
    const n = s.ops[r];
    if (typeof n.insert != "string") break;
    t = n.insert + t;
  }
  return t.slice(-1 * e.length) === e;
}
function Rt(s, e) {
  if (!(s instanceof Element)) return !1;
  const t = e.query(s);
  return t && t.prototype instanceof Ke ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(s.tagName.toLowerCase());
}
function km(s, e) {
  return s.previousElementSibling && s.nextElementSibling && !Rt(s.previousElementSibling, e) && !Rt(s.nextElementSibling, e);
}
const Us = /* @__PURE__ */ new WeakMap();
function Nl(s) {
  return s == null ? !1 : (Us.has(s) || (s.tagName === "PRE" ? Us.set(s, !0) : Us.set(s, Nl(s.parentNode))), Us.get(s));
}
function Qi(s, e, t, r, n) {
  return e.nodeType === e.TEXT_NODE ? r.reduce((i, o) => o(e, i, s), new K()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, o) => {
    let l = Qi(s, o, t, r, n);
    return o.nodeType === e.ELEMENT_NODE && (l = t.reduce((c, d) => d(o, c, s), l), l = (n.get(o) || []).reduce((c, d) => d(o, c, s), l)), i.concat(l);
  }, new K()) : new K();
}
function di(s) {
  return (e, t, r) => or(t, s, !0, r);
}
function Cm(s, e, t) {
  const r = pt.keys(s), n = lt.keys(s), i = Pt.keys(s), o = {};
  return r.concat(n).concat(i).forEach((l) => {
    let c = t.query(l, W.ATTRIBUTE);
    c != null && (o[c.attrName] = c.value(s), o[c.attrName]) || (c = _m[l], c != null && (c.attrName === l || c.keyName === l) && (o[c.attrName] = c.value(s) || void 0), c = Xa[l], c != null && (c.attrName === l || c.keyName === l) && (c = Xa[l], o[c.attrName] = c.value(s) || void 0));
  }), Object.entries(o).reduce((l, c) => {
    let [d, b] = c;
    return or(l, d, b, t);
  }, e);
}
function Lm(s, e, t) {
  const r = t.query(s);
  if (r == null) return e;
  if (r.prototype instanceof Ke) {
    const n = {}, i = r.value(s);
    if (i != null)
      return n[r.blotName] = i, new K().insert(n, r.formats(s, t));
  } else if (r.prototype instanceof os && !fs(e, `
`) && e.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return or(e, r.blotName, r.formats(s, t), t);
  return e;
}
function qm(s, e) {
  return fs(e, `
`) || e.insert(`
`), e;
}
function Om(s, e, t) {
  const r = t.query("code-block"), n = r && "formats" in r && typeof r.formats == "function" ? r.formats(s, t) : !0;
  return or(e, "code-block", n, t);
}
function Im() {
  return new K();
}
function Rm(s, e, t) {
  const r = t.query(s);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !fs(e, `
`))
    return e;
  let n = -1, i = s.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (n += 1), i = i.parentNode;
  return n <= 0 ? e : e.reduce((o, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? o.push(l) : o.insert(l.insert, {
    indent: n,
    ...l.attributes || {}
  }) : o, new K());
}
function $m(s, e, t) {
  const r = s;
  let n = r.tagName === "OL" ? "ordered" : "bullet";
  const i = r.getAttribute("data-checked");
  return i && (n = i === "true" ? "checked" : "unchecked"), or(e, "list", n, t);
}
function Qa(s, e, t) {
  if (!fs(e, `
`)) {
    if (Rt(s, t) && (s.childNodes.length > 0 || s instanceof HTMLParagraphElement))
      return e.insert(`
`);
    if (e.length() > 0 && s.nextSibling) {
      let r = s.nextSibling;
      for (; r != null; ) {
        if (Rt(r, t))
          return e.insert(`
`);
        const n = t.query(r);
        if (n && n.prototype instanceof Xe)
          return e.insert(`
`);
        r = r.firstChild;
      }
    }
  }
  return e;
}
function Bm(s, e, t) {
  const r = {}, n = s.style || {};
  return n.fontStyle === "italic" && (r.italic = !0), n.textDecoration === "underline" && (r.underline = !0), n.textDecoration === "line-through" && (r.strike = !0), (n.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(n.fontWeight, 10) >= 700) && (r.bold = !0), e = Object.entries(r).reduce((i, o) => {
    let [l, c] = o;
    return or(i, l, c, t);
  }, e), parseFloat(n.textIndent || 0) > 0 ? new K().insert("	").concat(e) : e;
}
function Dm(s, e, t) {
  const r = s.parentElement?.tagName === "TABLE" ? s.parentElement : s.parentElement?.parentElement;
  if (r != null) {
    const i = Array.from(r.querySelectorAll("tr")).indexOf(s) + 1;
    return or(e, "table", i, t);
  }
  return e;
}
function Mm(s, e, t) {
  let r = s.data;
  if (s.parentElement?.tagName === "O:P")
    return e.insert(r.trim());
  if (!Nl(s)) {
    if (r.trim().length === 0 && r.includes(`
`) && !km(s, t))
      return e;
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (s.previousSibling == null && s.parentElement != null && Rt(s.parentElement, t) || s.previousSibling instanceof Element && Rt(s.previousSibling, t)) && (r = r.replace(/^ /, "")), (s.nextSibling == null && s.parentElement != null && Rt(s.parentElement, t) || s.nextSibling instanceof Element && Rt(s.nextSibling, t)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return e.insert(r);
}
class Fm extends gt {
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
    super(e, t), this.quill.on(I.events.EDITOR_CHANGE, (r, n, i, o) => {
      r === I.events.SELECTION_CHANGE ? n && o !== I.sources.SILENT && (this.currentRange = n) : r === I.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === I.sources.USER ? this.record(n, i) : this.transform(n)), this.currentRange = Li(this.currentRange, n));
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
    const n = this.quill.getContents(), i = r.delta.invert(n);
    this.stack[t].push({
      delta: i,
      range: Li(r.range, i)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(r.delta, I.sources.USER), this.ignoreChange = !1, this.restoreSelection(r);
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
    let r = e.invert(t), n = this.currentRange;
    const i = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > i && this.stack.undo.length > 0
    ) {
      const o = this.stack.undo.pop();
      o && (r = r.compose(o.delta), n = o.range);
    } else
      this.lastRecorded = i;
    r.length() !== 0 && (this.stack.undo.push({
      delta: r,
      range: n
    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(e) {
    Ja(this.stack.undo, e), Ja(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, I.sources.USER);
    else {
      const t = jm(this.quill.scroll, e.delta);
      this.quill.setSelection(t, I.sources.USER);
    }
  }
}
function Ja(s, e) {
  let t = e;
  for (let r = s.length - 1; r >= 0; r -= 1) {
    const n = s[r];
    s[r] = {
      delta: t.transform(n.delta, !0),
      range: n.range && Li(n.range, t)
    }, t = n.delta.transform(t), s[r].delta.length() === 0 && s.splice(r, 1);
  }
}
function Pm(s, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((r) => s.query(r, W.BLOCK) != null) : !1;
}
function jm(s, e) {
  const t = e.reduce((n, i) => n + (i.delete || 0), 0);
  let r = e.length() - t;
  return Pm(s, e) && (r -= 1), r;
}
function Li(s, e) {
  if (!s) return s;
  const t = e.transformPosition(s.index), r = e.transformPosition(s.index + s.length);
  return {
    index: t,
    length: r - t
  };
}
class Tl extends gt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("drop", (r) => {
      r.preventDefault();
      let n = null;
      if (document.caretRangeFromPoint)
        n = document.caretRangeFromPoint(r.clientX, r.clientY);
      else if (document.caretPositionFromPoint) {
        const o = document.caretPositionFromPoint(r.clientX, r.clientY);
        n = document.createRange(), n.setStart(o.offsetNode, o.offset), n.setEnd(o.offsetNode, o.offset);
      }
      const i = n && e.selection.normalizeNative(n);
      if (i) {
        const o = e.selection.normalizedToRange(i);
        r.dataTransfer?.files && this.upload(o, r.dataTransfer.files);
      }
    });
  }
  upload(e, t) {
    const r = [];
    Array.from(t).forEach((n) => {
      n && this.options.mimetypes?.includes(n.type) && r.push(n);
    }), r.length > 0 && this.options.handler.call(this, e, r);
  }
}
Tl.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(s, e) {
    if (!this.quill.scroll.query("image"))
      return;
    const t = e.map((r) => new Promise((n) => {
      const i = new FileReader();
      i.onload = () => {
        n(i.result);
      }, i.readAsDataURL(r);
    }));
    Promise.all(t).then((r) => {
      const n = r.reduce((i, o) => i.insert({
        image: o
      }), new K().retain(s.index).delete(s.length));
      this.quill.updateContents(n, V.sources.USER), this.quill.setSelection(s.index + r.length, V.sources.SILENT);
    });
  }
};
const Um = ["insertText", "insertReplacementText"];
class zm extends gt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("beforeinput", (r) => {
      this.handleBeforeInput(r);
    }), /Android/i.test(navigator.userAgent) || e.on(I.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(e) {
    Xi({
      range: e,
      quill: this.quill
    });
  }
  replaceText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (e.length === 0) return !1;
    if (t) {
      const r = this.quill.getFormat(e.index, 1);
      this.deleteRange(e), this.quill.updateContents(new K().retain(e.index).insert(t, r), I.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, I.sources.SILENT), !0;
  }
  handleBeforeInput(e) {
    if (this.quill.composition.isComposing || e.defaultPrevented || !Um.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const r = Hm(e);
    if (r == null)
      return;
    const n = this.quill.selection.normalizeNative(t), i = n ? this.quill.selection.normalizedToRange(n) : null;
    i && this.replaceText(i, r) && e.preventDefault();
  }
  handleCompositionStart() {
    const e = this.quill.getSelection();
    e && this.replaceText(e);
  }
}
function Hm(s) {
  return typeof s.data == "string" ? s.data : s.dataTransfer?.types.includes("text/plain") ? s.dataTransfer.getData("text/plain") : null;
}
const Vm = /Mac/i.test(navigator.platform), Km = 100, Gm = (s) => !!(s.key === "ArrowLeft" || s.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
s.key === "ArrowUp" || s.key === "ArrowDown" || s.key === "Home" || Vm && s.key === "a" && s.ctrlKey === !0);
class Wm extends gt {
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
          event: n
        } = t;
        if (!(r instanceof at) || !r.uiNode)
          return !0;
        const i = getComputedStyle(r.domNode).direction === "rtl";
        return i && n.key !== "ArrowRight" || !i && n.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (n.shiftKey ? 1 : 0), I.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && Gm(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + Km, this.isListening) return;
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
    if (!(r instanceof at) || !r.uiNode) return;
    const n = document.createRange();
    n.setStartAfter(r.uiNode), n.setEndAfter(r.uiNode), e.removeAllRanges(), e.addRange(n);
  }
}
I.register({
  "blots/block": Le,
  "blots/block/embed": Xe,
  "blots/break": ct,
  "blots/container": ir,
  "blots/cursor": nt,
  "blots/embed": Vi,
  "blots/inline": Fe,
  "blots/scroll": tm,
  "blots/text": ot,
  "modules/clipboard": Sm,
  "modules/history": Fm,
  "modules/keyboard": dn,
  "modules/uploader": Tl,
  "modules/input": zm,
  "modules/uiNode": Wm
});
class Zm extends lt {
  add(e, t) {
    let r = 0;
    if (t === "+1" || t === "-1") {
      const n = this.value(e) || 0;
      r = t === "+1" ? n + 1 : n - 1;
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
const Ym = new Zm("indent", "ql-indent", {
  scope: W.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Xm extends Le {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class Qm extends Le {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
class ps extends ir {
}
ps.blotName = "list-container";
ps.tagName = "OL";
class ms extends Le {
  static create(e) {
    const t = super.create();
    return t.setAttribute("data-list", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-list") || void 0;
  }
  static register() {
    I.register(ps);
  }
  constructor(e, t) {
    super(e, t);
    const r = t.ownerDocument.createElement("span"), n = (i) => {
      if (!e.isEnabled()) return;
      const o = this.statics.formats(t, e);
      o === "checked" ? (this.format("list", "unchecked"), i.preventDefault()) : o === "unchecked" && (this.format("list", "checked"), i.preventDefault());
    };
    r.addEventListener("mousedown", n), r.addEventListener("touchstart", n), this.attachUI(r);
  }
  format(e, t) {
    e === this.statics.blotName && t ? this.domNode.setAttribute("data-list", t) : super.format(e, t);
  }
}
ms.blotName = "list";
ms.tagName = "LI";
ps.allowedChildren = [ms];
ms.requiredContainer = ps;
class Ji extends Fe {
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
class Jm extends Ji {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class Js extends Fe {
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
    return _l(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
  }
  format(e, t) {
    e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
  }
}
function _l(s, e) {
  const t = document.createElement("a");
  t.href = s;
  const r = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(r) > -1;
}
class eg extends Fe {
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
class tg extends Ji {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class rg extends Fe {
  static blotName = "underline";
  static tagName = "U";
}
class sg extends Vi {
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
const eo = ["alt", "height", "width"];
let ng = class extends Ke {
  static blotName = "image";
  static tagName = "IMG";
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return eo.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static match(e) {
    return /\.(jpe?g|gif|png)$/.test(e) || /^data:image\/.+;base64/.test(e);
  }
  static sanitize(e) {
    return _l(e, ["http", "https", "data"]) ? e : "//:0";
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    eo.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
};
const to = ["height", "width"];
class ig extends Xe {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return to.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static sanitize(e) {
    return Js.sanitize(e);
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    to.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
  html() {
    const {
      video: e
    } = this.value();
    return `<a href="${e}">${e}</a>`;
  }
}
const Xr = new lt("code-token", "hljs", {
  scope: W.INLINE
});
class Nt extends Fe {
  static formats(e, t) {
    for (; e != null && e !== t.domNode; ) {
      if (e.classList && e.classList.contains(Pe.className))
        return super.formats(e, t);
      e = e.parentNode;
    }
  }
  constructor(e, t, r) {
    super(e, t, r), Xr.add(this.domNode, r);
  }
  format(e, t) {
    e !== Nt.blotName ? super.format(e, t) : t ? Xr.add(this.domNode, t) : (Xr.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), Xr.value(this.domNode) || this.unwrap();
  }
}
Nt.blotName = "code-token";
Nt.className = "ql-token";
class Ye extends Pe {
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
    return this.formatAt(0, this.length(), Nt.blotName, !1), super.replaceWith(e, t);
  }
}
class ts extends ar {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(e, t) {
    e === Ye.blotName && (this.forceNext = !0, this.children.forEach((r) => {
      r.format(e, t);
    }));
  }
  formatAt(e, t, r, n) {
    r === Ye.blotName && (this.forceNext = !0), super.formatAt(e, t, r, n);
  }
  highlight(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const n = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, i = Ye.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== n) {
      if (n.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((c, d) => c.concat(dl(d, !1)), new K()), l = e(n, i);
        o.diff(l).reduce((c, d) => {
          let {
            retain: b,
            attributes: m
          } = d;
          return b ? (m && Object.keys(m).forEach((h) => {
            [Ye.blotName, Nt.blotName].includes(h) && this.formatAt(c, b, h, m[h]);
          }), c + b) : c;
        }, 0);
      }
      this.cachedText = n, this.forceNext = !1;
    }
  }
  html(e, t) {
    const [r] = this.children.find(e);
    return `<pre data-language="${r ? Ye.formats(r.domNode) : "plain"}">
${un(this.code(e, t))}
</pre>`;
  }
  optimize(e) {
    if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
      const t = Ye.formats(this.children.head.domNode);
      t !== this.uiNode.value && (this.uiNode.value = t);
    }
  }
}
ts.allowedChildren = [Ye];
Ye.requiredContainer = ts;
Ye.allowedChildren = [Nt, nt, ot, ct];
const ag = (s, e, t) => {
  if (typeof s.versionString == "string") {
    const r = s.versionString.split(".")[0];
    if (parseInt(r, 10) >= 11)
      return s.highlight(t, {
        language: e
      }).value;
  }
  return s.highlight(e, t).value;
};
class Sl extends gt {
  static register() {
    I.register(Nt, !0), I.register(Ye, !0), I.register(ts, !0);
  }
  constructor(e, t) {
    if (super(e, t), this.options.hljs == null)
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    this.languages = this.options.languages.reduce((r, n) => {
      let {
        key: i
      } = n;
      return r[i] = !0, r;
    }, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
  }
  initListener() {
    this.quill.on(I.events.SCROLL_BLOT_MOUNT, (e) => {
      if (!(e instanceof ts)) return;
      const t = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((r) => {
        let {
          key: n,
          label: i
        } = r;
        const o = t.ownerDocument.createElement("option");
        o.textContent = i, o.setAttribute("value", n), t.appendChild(o);
      }), t.addEventListener("change", () => {
        e.format(Ye.blotName, t.value), this.quill.root.focus(), this.highlight(e, !0);
      }), e.uiNode == null && (e.attachUI(t), e.children.head && (t.value = Ye.formats(e.children.head.domNode)));
    });
  }
  initTimer() {
    let e = null;
    this.quill.on(I.events.SCROLL_OPTIMIZE, () => {
      e && clearTimeout(e), e = setTimeout(() => {
        this.highlight(), e = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(I.sources.USER);
    const r = this.quill.getSelection();
    (e == null ? this.quill.scroll.descendants(ts) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update(I.sources.SILENT), r != null && this.quill.setSelection(r, I.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return un(e).split(`
`).reduce((n, i, o) => (o !== 0 && n.insert(`
`, {
        [Pe.blotName]: t
      }), n.insert(i)), new K());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(Pe.className), r.innerHTML = ag(this.options.hljs, t, e), Qi(this.quill.scroll, r, [(n, i) => {
      const o = Xr.value(n);
      return o ? i.compose(new K().retain(i.length(), {
        [Nt.blotName]: o
      })) : i;
    }], [(n, i) => n.data.split(`
`).reduce((o, l, c) => (c !== 0 && o.insert(`
`, {
      [Pe.blotName]: t
    }), o.insert(l)), i)], /* @__PURE__ */ new WeakMap());
  }
}
Sl.DEFAULTS = {
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
class it extends Le {
  static blotName = "table";
  static tagName = "TD";
  static create(e) {
    const t = super.create();
    return e ? t.setAttribute("data-row", e) : t.setAttribute("data-row", ea()), t;
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
class tr extends ir {
  static blotName = "table-row";
  static tagName = "TR";
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const e = this.children.head.formats(), t = this.children.tail.formats(), r = this.next.children.head.formats(), n = this.next.children.tail.formats();
      return e.table === t.table && e.table === r.table && e.table === n.table;
    }
    return !1;
  }
  optimize(e) {
    super.optimize(e), this.children.forEach((t) => {
      if (t.next == null) return;
      const r = t.formats(), n = t.next.formats();
      if (r.table !== n.table) {
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
class Bt extends ir {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class en extends ir {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const e = this.descendants(tr), t = e.reduce((r, n) => Math.max(n.children.length, r), 0);
    e.forEach((r) => {
      new Array(t - r.children.length).fill(0).forEach(() => {
        let n;
        r.children.head != null && (n = it.formats(r.children.head.domNode));
        const i = this.scroll.create(it.blotName, n);
        r.appendChild(i), i.optimize();
      });
    });
  }
  cells(e) {
    return this.rows().map((t) => t.children.at(e));
  }
  deleteColumn(e) {
    const [t] = this.descendant(Bt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const n = r.children.at(e);
      n?.remove();
    });
  }
  insertColumn(e) {
    const [t] = this.descendant(Bt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const n = r.children.at(e), i = it.formats(r.children.head.domNode), o = this.scroll.create(it.blotName, i);
      r.insertBefore(o, n);
    });
  }
  insertRow(e) {
    const [t] = this.descendant(Bt);
    if (t == null || t.children.head == null) return;
    const r = ea(), n = this.scroll.create(tr.blotName);
    t.children.head.children.forEach(() => {
      const o = this.scroll.create(it.blotName, r);
      n.appendChild(o);
    });
    const i = t.children.at(e);
    t.insertBefore(n, i);
  }
  rows() {
    const e = this.children.head;
    return e == null ? [] : e.children.map((t) => t);
  }
}
en.allowedChildren = [Bt];
Bt.requiredContainer = en;
Bt.allowedChildren = [tr];
tr.requiredContainer = Bt;
tr.allowedChildren = [it];
it.requiredContainer = tr;
function ea() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class og extends gt {
  static register() {
    I.register(it), I.register(tr), I.register(Bt), I.register(en);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(en).forEach((e) => {
      e.balanceCells();
    });
  }
  deleteColumn() {
    const [e, , t] = this.getTable();
    t != null && (e.deleteColumn(t.cellOffset()), this.quill.update(I.sources.USER));
  }
  deleteRow() {
    const [, e] = this.getTable();
    e != null && (e.remove(), this.quill.update(I.sources.USER));
  }
  deleteTable() {
    const [e] = this.getTable();
    if (e == null) return;
    const t = e.offset();
    e.remove(), this.quill.update(I.sources.USER), this.quill.setSelection(t, I.sources.SILENT);
  }
  getTable() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (e == null) return [null, null, null, -1];
    const [t, r] = this.quill.getLine(e.index);
    if (t == null || t.statics.blotName !== it.blotName)
      return [null, null, null, -1];
    const n = t.parent;
    return [n.parent.parent, n, t, r];
  }
  insertColumn(e) {
    const t = this.quill.getSelection();
    if (!t) return;
    const [r, n, i] = this.getTable(t);
    if (i == null) return;
    const o = i.cellOffset();
    r.insertColumn(o + e), this.quill.update(I.sources.USER);
    let l = n.rowOffset();
    e === 0 && (l += 1), this.quill.setSelection(t.index + l, t.length, I.sources.SILENT);
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
    const [r, n, i] = this.getTable(t);
    if (i == null) return;
    const o = n.rowOffset();
    r.insertRow(o + e), this.quill.update(I.sources.USER), e > 0 ? this.quill.setSelection(t, I.sources.SILENT) : this.quill.setSelection(t.index + n.children.length, t.length, I.sources.SILENT);
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
    const n = new Array(e).fill(0).reduce((i) => {
      const o = new Array(t).fill(`
`).join("");
      return i.insert(o, {
        table: ea()
      });
    }, new K().retain(r.index));
    this.quill.updateContents(n, I.sources.USER), this.quill.setSelection(r.index, I.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(I.events.SCROLL_OPTIMIZE, (e) => {
      e.some((t) => ["TD", "TR", "TBODY", "TABLE"].includes(t.target.tagName) ? (this.quill.once(I.events.TEXT_CHANGE, (r, n, i) => {
        i === I.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const ro = St("quill:toolbar");
class ta extends gt {
  constructor(e, t) {
    if (super(e, t), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), lg(r, this.options.container), e.container?.parentNode?.insertBefore(r, e.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      ro.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      const n = this.options.handlers?.[r];
      n && this.addHandler(r, n);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(I.events.EDITOR_CHANGE, () => {
      const [r] = this.quill.selection.getRange();
      this.update(r);
    });
  }
  addHandler(e, t) {
    this.handlers[e] = t;
  }
  attach(e) {
    let t = Array.from(e.classList).find((n) => n.indexOf("ql-") === 0);
    if (!t) return;
    if (t = t.slice(3), e.tagName === "BUTTON" && e.setAttribute("type", "button"), this.handlers[t] == null && this.quill.scroll.query(t) == null) {
      ro.warn("ignoring attaching to nonexistent format", t, e);
      return;
    }
    const r = e.tagName === "SELECT" ? "change" : "click";
    e.addEventListener(r, (n) => {
      let i;
      if (e.tagName === "SELECT") {
        if (e.selectedIndex < 0) return;
        const l = e.options[e.selectedIndex];
        l.hasAttribute("selected") ? i = !1 : i = l.value || !1;
      } else
        e.classList.contains("ql-active") ? i = !1 : i = e.value || !e.hasAttribute("value"), n.preventDefault();
      this.quill.focus();
      const [o] = this.quill.selection.getRange();
      if (this.handlers[t] != null)
        this.handlers[t].call(this, i);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(t).prototype instanceof Ke
      ) {
        if (i = prompt(`Enter ${t}`), !i) return;
        this.quill.updateContents(new K().retain(o.index).delete(o.length).insert({
          [t]: i
        }), I.sources.USER);
      } else
        this.quill.format(t, i, I.sources.USER);
      this.update(o);
    }), this.controls.push([t, e]);
  }
  update(e) {
    const t = e == null ? {} : this.quill.getFormat(e);
    this.controls.forEach((r) => {
      const [n, i] = r;
      if (i.tagName === "SELECT") {
        let o = null;
        if (e == null)
          o = null;
        else if (t[n] == null)
          o = i.querySelector("option[selected]");
        else if (!Array.isArray(t[n])) {
          let l = t[n];
          typeof l == "string" && (l = l.replace(/"/g, '\\"')), o = i.querySelector(`option[value="${l}"]`);
        }
        o == null ? (i.value = "", i.selectedIndex = -1) : o.selected = !0;
      } else if (e == null)
        i.classList.remove("ql-active"), i.setAttribute("aria-pressed", "false");
      else if (i.hasAttribute("value")) {
        const o = t[n], l = o === i.getAttribute("value") || o != null && o.toString() === i.getAttribute("value") || o == null && !i.getAttribute("value");
        i.classList.toggle("ql-active", l), i.setAttribute("aria-pressed", l.toString());
      } else {
        const o = t[n] != null;
        i.classList.toggle("ql-active", o), i.setAttribute("aria-pressed", o.toString());
      }
    });
  }
}
ta.DEFAULTS = {};
function so(s, e, t) {
  const r = document.createElement("button");
  r.setAttribute("type", "button"), r.classList.add(`ql-${e}`), r.setAttribute("aria-pressed", "false"), t != null ? (r.value = t, r.setAttribute("aria-label", `${e}: ${t}`)) : r.setAttribute("aria-label", e), s.appendChild(r);
}
function lg(s, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const r = document.createElement("span");
    r.classList.add("ql-formats"), t.forEach((n) => {
      if (typeof n == "string")
        so(r, n);
      else {
        const i = Object.keys(n)[0], o = n[i];
        Array.isArray(o) ? cg(r, i, o) : so(r, i, o);
      }
    }), s.appendChild(r);
  });
}
function cg(s, e, t) {
  const r = document.createElement("select");
  r.classList.add(`ql-${e}`), t.forEach((n) => {
    const i = document.createElement("option");
    n !== !1 ? i.setAttribute("value", String(n)) : i.setAttribute("selected", "selected"), r.appendChild(i);
  }), s.appendChild(r);
}
ta.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const s = this.quill.getSelection();
      if (s != null)
        if (s.length === 0) {
          const e = this.quill.getFormat();
          Object.keys(e).forEach((t) => {
            this.quill.scroll.query(t, W.INLINE) != null && this.quill.format(t, !1, I.sources.USER);
          });
        } else
          this.quill.removeFormat(s.index, s.length, I.sources.USER);
    },
    direction(s) {
      const {
        align: e
      } = this.quill.getFormat();
      s === "rtl" && e == null ? this.quill.format("align", "right", I.sources.USER) : !s && e === "right" && this.quill.format("align", !1, I.sources.USER), this.quill.format("direction", s, I.sources.USER);
    },
    indent(s) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e), r = parseInt(t.indent || 0, 10);
      if (s === "+1" || s === "-1") {
        let n = s === "+1" ? 1 : -1;
        t.direction === "rtl" && (n *= -1), this.quill.format("indent", r + n, I.sources.USER);
      }
    },
    link(s) {
      s === !0 && (s = prompt("Enter link URL:")), this.quill.format("link", s, I.sources.USER);
    },
    list(s) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e);
      s === "check" ? t.list === "checked" || t.list === "unchecked" ? this.quill.format("list", !1, I.sources.USER) : this.quill.format("list", "unchecked", I.sources.USER) : this.quill.format("list", s, I.sources.USER);
    }
  }
};
const ug = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', dg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', hg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', fg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', pg = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', mg = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', gg = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', bg = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', no = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', yg = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', vg = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', xg = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', wg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', Ag = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', Eg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Ng = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Tg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', _g = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Sg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', kg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', Cg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', Lg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', qg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', Og = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', Ig = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Rg = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', $g = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', Bg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', Dg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', Mg = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', Fg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Pg = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', jg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', cs = {
  align: {
    "": ug,
    center: dg,
    right: hg,
    justify: fg
  },
  background: pg,
  blockquote: mg,
  bold: gg,
  clean: bg,
  code: no,
  "code-block": no,
  color: yg,
  direction: {
    "": vg,
    rtl: xg
  },
  formula: wg,
  header: {
    1: Ag,
    2: Eg,
    3: Ng,
    4: Tg,
    5: _g,
    6: Sg
  },
  italic: kg,
  image: Cg,
  indent: {
    "+1": Lg,
    "-1": qg
  },
  link: Og,
  list: {
    bullet: Ig,
    check: Rg,
    ordered: $g
  },
  script: {
    sub: Bg,
    super: Dg
  },
  strike: Mg,
  table: Fg,
  underline: Pg,
  video: jg
}, Ug = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let io = 0;
function ao(s, e) {
  s.setAttribute(e, `${s.getAttribute(e) !== "true"}`);
}
class hn {
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
    this.container.classList.toggle("ql-expanded"), ao(this.label, "aria-expanded"), ao(this.options, "aria-hidden");
  }
  buildItem(e) {
    const t = document.createElement("span");
    t.tabIndex = "0", t.setAttribute("role", "button"), t.classList.add("ql-picker-item");
    const r = e.getAttribute("value");
    return r && t.setAttribute("data-value", r), e.textContent && t.setAttribute("data-label", e.textContent), t.addEventListener("click", () => {
      this.selectItem(t, !0);
    }), t.addEventListener("keydown", (n) => {
      switch (n.key) {
        case "Enter":
          this.selectItem(t, !0), n.preventDefault();
          break;
        case "Escape":
          this.escape(), n.preventDefault();
          break;
      }
    }), t;
  }
  buildLabel() {
    const e = document.createElement("span");
    return e.classList.add("ql-picker-label"), e.innerHTML = Ug, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
  }
  buildOptions() {
    const e = document.createElement("span");
    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${io}`, io += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
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
class kl extends hn {
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
    const r = this.label.querySelector(".ql-color-label"), n = e && e.getAttribute("data-value") || "";
    r && (r.tagName === "line" ? r.style.stroke = n : r.style.fill = n);
  }
}
class Cl extends hn {
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
const zg = (s) => {
  const {
    overflowY: e
  } = getComputedStyle(s, null);
  return e !== "visible" && e !== "clip";
};
class Ll {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, zg(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
      this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
    }), this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(e) {
    const t = e.left + e.width / 2 - this.root.offsetWidth / 2, r = e.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${t}px`, this.root.style.top = `${r}px`, this.root.classList.remove("ql-flip");
    const n = this.boundsContainer.getBoundingClientRect(), i = this.root.getBoundingClientRect();
    let o = 0;
    if (i.right > n.right && (o = n.right - i.right, this.root.style.left = `${t + o}px`), i.left < n.left && (o = n.left - i.left, this.root.style.left = `${t + o}px`), i.bottom > n.bottom) {
      const l = i.bottom - i.top, c = e.bottom - e.top + l;
      this.root.style.top = `${r - c}px`, this.root.classList.add("ql-flip");
    }
    return o;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const Hg = [!1, "center", "right", "justify"], Vg = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], Kg = [!1, "serif", "monospace"], Gg = ["1", "2", "3", !1], Wg = ["small", !1, "large", "huge"];
class gs extends qr {
  constructor(e, t) {
    super(e, t);
    const r = (n) => {
      if (!document.body.contains(e.root)) {
        document.body.removeEventListener("click", r);
        return;
      }
      this.tooltip != null && // @ts-expect-error
      !this.tooltip.root.contains(n.target) && // @ts-expect-error
      document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus() && this.tooltip.hide(), this.pickers != null && this.pickers.forEach((i) => {
        i.container.contains(n.target) || i.close();
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
    this.pickers = Array.from(e).map((n) => {
      if (n.classList.contains("ql-align") && (n.querySelector("option") == null && Wr(n, Hg), typeof t.align == "object"))
        return new Cl(n, t.align);
      if (n.classList.contains("ql-background") || n.classList.contains("ql-color")) {
        const i = n.classList.contains("ql-background") ? "background" : "color";
        return n.querySelector("option") == null && Wr(n, Vg, i === "background" ? "#ffffff" : "#000000"), new kl(n, t[i]);
      }
      return n.querySelector("option") == null && (n.classList.contains("ql-font") ? Wr(n, Kg) : n.classList.contains("ql-header") ? Wr(n, Gg) : n.classList.contains("ql-size") && Wr(n, Wg)), new hn(n);
    });
    const r = () => {
      this.pickers.forEach((n) => {
        n.update();
      });
    };
    this.quill.on(V.events.EDITOR_CHANGE, r);
  }
}
gs.DEFAULTS = $t({}, qr.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let s = this.container.querySelector("input.ql-image[type=file]");
          s == null && (s = document.createElement("input"), s.setAttribute("type", "file"), s.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), s.classList.add("ql-image"), s.addEventListener("change", () => {
            const e = this.quill.getSelection(!0);
            this.quill.uploader.upload(e, s.files), s.value = "";
          }), this.container.appendChild(s)), s.click();
        },
        video() {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
class ql extends Ll {
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
        e = Zg(e);
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
function Zg(s) {
  let e = s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || s.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return e ? `${e[1] || "https"}://www.youtube.com/embed/${e[2]}?showinfo=0` : (e = s.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${e[1] || "https"}://player.vimeo.com/video/${e[2]}/` : s;
}
function Wr(s, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  e.forEach((r) => {
    const n = document.createElement("option");
    r === t ? n.setAttribute("selected", "selected") : n.setAttribute("value", String(r)), s.appendChild(n);
  });
}
const Yg = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Xg extends ql {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(e, t) {
    super(e, t), this.quill.on(V.events.EDITOR_CHANGE, (r, n, i, o) => {
      if (r === V.events.SELECTION_CHANGE)
        if (n != null && n.length > 0 && o === V.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const l = this.quill.getLines(n.index, n.length);
          if (l.length === 1) {
            const c = this.quill.getBounds(n);
            c != null && this.position(c);
          } else {
            const c = l[l.length - 1], d = this.quill.getIndex(c), b = Math.min(c.length() - 1, n.index + n.length - d), m = this.quill.getBounds(new er(d, b));
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
class Ol extends gs {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Yg), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new Xg(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), cs), this.buildPickers(e.container.querySelectorAll("select"), cs));
  }
}
Ol.DEFAULTS = $t({}, gs.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(s) {
          s ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, I.sources.USER);
        }
      }
    }
  }
});
const Qg = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Jg extends ql {
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
          const [n, i] = this.quill.scroll.descendant(Js, e.index);
          if (n != null) {
            this.linkRange = new er(e.index - i, n.length());
            const o = Js.formats(n.domNode);
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
class Il extends gs {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Qg), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), cs), this.buildPickers(e.container.querySelectorAll("select"), cs), this.tooltip = new Jg(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, r) => {
      e.handlers.link.call(e, !r.format.link);
    }));
  }
}
Il.DEFAULTS = $t({}, gs.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(s) {
          if (s) {
            const e = this.quill.getSelection();
            if (e == null || e.length === 0) return;
            let t = this.quill.getText(e);
            /^\S+@\S+\.\S+$/.test(t) && t.indexOf("mailto:") !== 0 && (t = `mailto:${t}`);
            const {
              tooltip: r
            } = this.quill.theme;
            r.edit("link", t);
          } else
            this.quill.format("link", !1, I.sources.USER);
        }
      }
    }
  }
});
I.register({
  "attributors/attribute/direction": gl,
  "attributors/class/align": fl,
  "attributors/class/background": nm,
  "attributors/class/color": sm,
  "attributors/class/direction": bl,
  "attributors/class/font": xl,
  "attributors/class/size": Al,
  "attributors/style/align": pl,
  "attributors/style/background": Wi,
  "attributors/style/color": Gi,
  "attributors/style/direction": yl,
  "attributors/style/font": wl,
  "attributors/style/size": El
}, !0);
I.register({
  "formats/align": fl,
  "formats/direction": bl,
  "formats/indent": Ym,
  "formats/background": Wi,
  "formats/color": Gi,
  "formats/font": xl,
  "formats/size": Al,
  "formats/blockquote": Xm,
  "formats/code-block": Pe,
  "formats/header": Qm,
  "formats/list": ms,
  "formats/bold": Ji,
  "formats/code": Zi,
  "formats/italic": Jm,
  "formats/link": Js,
  "formats/script": eg,
  "formats/strike": tg,
  "formats/underline": rg,
  "formats/formula": sg,
  "formats/image": ng,
  "formats/video": ig,
  "modules/syntax": Sl,
  "modules/table": og,
  "modules/toolbar": ta,
  "themes/bubble": Ol,
  "themes/snow": Il,
  "ui/icons": cs,
  "ui/picker": hn,
  "ui/icon-picker": Cl,
  "ui/color-picker": kl,
  "ui/tooltip": Ll
}, !0);
const e0 = { class: "rounded-lg border border-slate-300 bg-white" }, t0 = /* @__PURE__ */ Tt({
  __name: "RichTextEditor",
  props: {
    modelValue: {},
    placeholder: { default: "Escribe aquí el contenido..." },
    subirImagen: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(s, { emit: e }) {
    const t = s, r = e, n = re(null);
    let i = null;
    us(() => {
      n.value && (i = new I(n.value, {
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
    }), po(() => {
      i = null;
    }), Xt(
      () => t.modelValue,
      (c) => {
        i && i.root.innerHTML !== c && (i.root.innerHTML = c || "");
      }
    ), Xt(
      () => t.disabled,
      (c) => {
        i?.enable(!c);
      }
    );
    async function o() {
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
    return (c, d) => (B(), D("div", e0, [
      v("div", {
        ref_key: "root",
        ref: n,
        class: "min-h-[260px]"
      }, null, 512)
    ]));
  }
}), r0 = { class: "space-y-2" }, s0 = {
  key: 0,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, n0 = { class: "block text-xs font-semibold uppercase tracking-wide text-slate-500" }, i0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, a0 = {
  key: 0,
  class: "space-y-2"
}, o0 = ["value", "disabled", "onChange"], l0 = ["value", "disabled", "onInput"], c0 = ["disabled", "onClick"], u0 = ["disabled"], d0 = {
  key: 1,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, h0 = { class: "flex items-center justify-between" }, f0 = { class: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, p0 = ["disabled", "onClick"], m0 = ["disabled"], g0 = {
  key: 2,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, b0 = ["checked", "disabled"], y0 = ["value", "placeholder", "disabled"], v0 = ["value", "disabled"], x0 = ["value"], w0 = ["value", "placeholder", "disabled"], A0 = /* @__PURE__ */ Tt({
  name: "CmsNestedValueEditor",
  __name: "CmsNestedValueEditor",
  props: {
    schema: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(s, { emit: e }) {
    const t = s, r = e, n = Ce(
      () => Array.isArray(t.schema.mapFields) ? t.schema.mapFields : []
    ), i = Ce(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), o = Ce(() => d(t.modelValue)), l = Ce(() => Array.isArray(t.modelValue) ? t.modelValue : []), c = Ce(() => Object.entries(o.value));
    function d(U) {
      return U && typeof U == "object" && !Array.isArray(U) ? U : {};
    }
    function b(U) {
      return U.type === "array" ? [] : U.type === "map" ? {} : U.type === "boolean" ? !1 : "";
    }
    function m(U, H) {
      r("update:modelValue", {
        ...o.value,
        [U]: H
      });
    }
    function h() {
      r("update:modelValue", [...l.value, b(i.value)]);
    }
    function p(U) {
      const H = [...l.value];
      H.splice(U, 1), r("update:modelValue", H);
    }
    function E(U, H) {
      const le = [...l.value];
      le[U] = H, r("update:modelValue", le);
    }
    function N(U) {
      r("update:modelValue", U);
    }
    function C(U) {
      r("update:modelValue", U);
    }
    function q() {
      const U = o.value;
      let H = 1, le = `campo_${H}`;
      for (; le in U; )
        H += 1, le = `campo_${H}`;
      r("update:modelValue", {
        ...U,
        [le]: ""
      });
    }
    function F(U) {
      const H = { ...o.value };
      delete H[U], r("update:modelValue", H);
    }
    function z(U, H) {
      const le = H.trim();
      if (!le || le === U)
        return;
      const ee = { ...o.value }, f = ee[U];
      delete ee[U], ee[le] = f, r("update:modelValue", ee);
    }
    function Y(U, H) {
      const le = { ...o.value };
      le[U] = oe(H), r("update:modelValue", le);
    }
    function G(U) {
      if (typeof U == "string")
        return U;
      if (U == null)
        return "";
      try {
        return JSON.stringify(U);
      } catch {
        return String(U);
      }
    }
    function oe(U) {
      const H = U.trim();
      if (!H)
        return "";
      if (H.startsWith("{") && H.endsWith("}") || H.startsWith("[") && H.endsWith("]"))
        try {
          return JSON.parse(H);
        } catch {
          return U;
        }
      return U;
    }
    return (U, H) => {
      const le = mo("CmsNestedValueEditor", !0);
      return B(), D("div", r0, [
        s.schema.type === "map" ? (B(), D("section", s0, [
          (B(!0), D(Be, null, De(n.value, (ee) => (B(), D("article", {
            key: ee.key,
            class: "space-y-1 rounded-md border border-slate-200 bg-white p-3"
          }, [
            v("label", n0, te(ee.label), 1),
            ee.helpText ? (B(), D("p", i0, te(ee.helpText), 1)) : ae("", !0),
            At(le, {
              schema: ee,
              "model-value": o.value[ee.key],
              disabled: s.disabled,
              "onUpdate:modelValue": (f) => m(ee.key, f)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          n.value.length ? ae("", !0) : (B(), D("div", a0, [
            (B(!0), D(Be, null, De(c.value, ([ee, f]) => (B(), D("article", {
              key: ee,
              class: "grid gap-2 rounded-md border border-slate-200 bg-white p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              v("input", {
                value: ee,
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: s.disabled,
                onChange: ($) => z(ee, $.target.value)
              }, null, 40, o0),
              v("input", {
                value: G(f),
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: s.disabled,
                onInput: ($) => Y(ee, $.target.value)
              }, null, 40, l0),
              v("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: s.disabled,
                onClick: ($) => F(ee)
              }, " Quitar ", 8, c0)
            ]))), 128)),
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
              disabled: s.disabled,
              onClick: q
            }, " Agregar propiedad ", 8, u0),
            H[4] || (H[4] = v("p", { class: "text-xs text-slate-500" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : s.schema.type === "array" ? (B(), D("section", d0, [
          (B(!0), D(Be, null, De(l.value, (ee, f) => (B(), D("article", {
            key: f,
            class: "space-y-2 rounded-md border border-slate-200 bg-white p-3"
          }, [
            v("div", h0, [
              v("p", f0, "Item " + te(f + 1), 1),
              v("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: s.disabled,
                onClick: ($) => p(f)
              }, " Quitar ", 8, p0)
            ]),
            At(le, {
              schema: i.value,
              "model-value": ee,
              disabled: s.disabled,
              "onUpdate:modelValue": ($) => E(f, $)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          v("button", {
            type: "button",
            class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
            disabled: s.disabled,
            onClick: h
          }, " Agregar item ", 8, m0)
        ])) : s.schema.type === "boolean" ? (B(), D("label", g0, [
          v("input", {
            type: "checkbox",
            checked: !!s.modelValue,
            disabled: s.disabled,
            onChange: H[0] || (H[0] = (ee) => C(ee.target.checked))
          }, null, 40, b0),
          H[5] || (H[5] = Ve(" Activo ", -1))
        ])) : s.schema.type === "textarea" || s.schema.type === "richtext" ? (B(), D("textarea", {
          key: 3,
          value: typeof s.modelValue == "string" ? s.modelValue : "",
          rows: "4",
          placeholder: s.schema.placeholder || "",
          disabled: s.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: H[1] || (H[1] = (ee) => N(ee.target.value))
        }, null, 40, y0)) : s.schema.type === "select" ? (B(), D("select", {
          key: 4,
          value: typeof s.modelValue == "string" ? s.modelValue : "",
          disabled: s.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onChange: H[2] || (H[2] = (ee) => N(ee.target.value))
        }, [
          H[6] || (H[6] = v("option", { value: "" }, "Selecciona una opción", -1)),
          (B(!0), D(Be, null, De(s.schema.options || [], (ee) => (B(), D("option", {
            key: ee,
            value: ee
          }, te(ee), 9, x0))), 128))
        ], 40, v0)) : (B(), D("input", {
          key: 5,
          value: typeof s.modelValue == "string" ? s.modelValue : "",
          type: "text",
          placeholder: s.schema.placeholder || "",
          disabled: s.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: H[3] || (H[3] = (ee) => N(ee.target.value))
        }, null, 40, w0))
      ]);
    };
  }
}), E0 = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};
async function N0(s, e = {}) {
  if (!s.type.startsWith("image/"))
    return s;
  const t = { ...E0, ...e }, r = await _0(s), { width: n, height: i } = T0(r.width, r.height, t.maxWidth, t.maxHeight), o = document.createElement("canvas");
  o.width = n, o.height = i;
  const l = o.getContext("2d");
  if (!l)
    return s;
  l.drawImage(r, 0, 0, n, i);
  let c = t.quality, d = await oo(o, s.type || "image/jpeg", c);
  const b = t.targetSizeKb * 1024;
  for (; d.size > b && c > 0.45; )
    c -= 0.08, d = await oo(o, s.type || "image/jpeg", c);
  return d;
}
function T0(s, e, t, r) {
  let n = s, i = e;
  return n > t && (i = Math.round(i * t / n), n = t), i > r && (n = Math.round(n * r / i), i = r), { width: n, height: i };
}
function oo(s, e, t) {
  return new Promise((r, n) => {
    s.toBlob(
      (i) => {
        if (!i) {
          n(new Error("No fue posible generar la imagen comprimida."));
          return;
        }
        r(i);
      },
      e,
      t
    );
  });
}
function _0(s) {
  return new Promise((e, t) => {
    const r = new Image(), n = URL.createObjectURL(s);
    r.onload = () => {
      URL.revokeObjectURL(n), e(r);
    }, r.onerror = () => {
      URL.revokeObjectURL(n), t(new Error("No fue posible leer la imagen."));
    }, r.src = n;
  });
}
async function S0(s, e, t) {
  const { storage: r } = _e(), n = Hl(r, s);
  return await Vl(n, e, t), Kl(n);
}
async function lo(s, e, t = {}) {
  const r = await N0(e, {
    maxWidth: t.maxWidth,
    maxHeight: t.maxHeight,
    quality: t.quality,
    targetSizeKb: t.targetSizeKb
  });
  return S0(s, r, t.metadata);
}
async function k0(s, e) {
  const { firestore: t } = _e();
  return (await Pl(rs(t, s.collectionName), {
    ...e,
    createdAt: He(),
    updatedAt: He()
  })).id;
}
async function co(s, e = 100) {
  const { firestore: t } = _e();
  try {
    const r = go(
      rs(t, s.collectionName),
      bo("createdAt", "desc"),
      Ul(e)
    );
    return (await Ks(r)).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  } catch {
    return (await Ks(rs(t, s.collectionName))).docs.map((n) => ({
      id: n.id,
      data: n.data()
    }));
  }
}
async function C0(s, e) {
  const { firestore: t } = _e();
  await jl(Mt(t, s.collectionName, e));
}
async function L0(s, e, t) {
  const { firestore: r } = _e();
  await yo(Mt(r, s.collectionName, e), {
    ...t,
    updatedAt: He()
  });
}
const Rl = "main", q0 = "schema";
async function O0(s, e, t = Rl) {
  const { firestore: r } = _e(), n = s.dictionaryDocumentId || t, i = $l(s), o = Mt(r, s.collectionName, n), l = await tn(o), c = {
    updatedAt: He(),
    createdAt: l.exists() ? l.data().createdAt : He()
  };
  if (i)
    c[i] = e;
  else
    for (const [d, b] of Object.entries(e))
      c[d] = b;
  return await Gs(
    o,
    c,
    { merge: !0 }
  ), n;
}
async function I0(s, e = Rl) {
  const { firestore: t } = _e(), r = s.dictionaryDocumentId || e, n = await tn(Mt(t, s.collectionName, r));
  if (!n.exists())
    return null;
  const i = n.data(), o = $l(s), l = o ? i[o] : null;
  return l && typeof l == "object" && !Array.isArray(l) ? {
    id: n.id,
    data: l
  } : {
    id: n.id,
    data: i
  };
}
function $l(s) {
  return s.storageType !== "dictionary" ? "" : typeof s.dictionaryRootKey == "string" && s.dictionaryRootKey.trim() ? s.dictionaryRootKey.trim() : q0;
}
function R0(s) {
  return `${s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}-${Date.now().toString().slice(-6)}`;
}
const $0 = { class: "space-y-4" }, B0 = { class: "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" }, D0 = {
  key: 0,
  class: "mt-2 text-xs text-slate-500"
}, M0 = {
  key: 1,
  class: "mt-2 text-xs text-rose-700"
}, F0 = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, P0 = { class: "text-xl font-black text-slate-900" }, j0 = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, U0 = { class: "block text-sm font-semibold text-slate-700" }, z0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, H0 = ["value", "placeholder", "disabled", "onInput"], V0 = ["value", "placeholder", "disabled", "onInput"], K0 = ["value", "disabled", "onChange"], G0 = ["value"], W0 = {
  key: 4,
  class: "space-y-2"
}, Z0 = ["value", "disabled", "onChange"], Y0 = ["value"], X0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, Q0 = {
  key: 5,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, J0 = ["checked", "disabled", "onChange"], e1 = {
  key: 6,
  class: "space-y-2"
}, t1 = ["disabled", "onChange"], r1 = {
  key: 0,
  class: "text-xs text-slate-500 break-all"
}, s1 = ["src"], n1 = ["disabled", "onClick"], i1 = {
  key: 0,
  class: "rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700"
}, a1 = {
  key: 1,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, o1 = {
  key: 2,
  class: "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, l1 = { class: "flex flex-wrap items-center gap-2" }, c1 = ["disabled"], u1 = ["disabled"], d1 = { class: "mt-6 border-t border-slate-200 pt-5" }, h1 = {
  key: 0,
  class: "mt-3 text-sm text-slate-500"
}, f1 = {
  key: 1,
  class: "mt-3 text-sm text-slate-500"
}, p1 = {
  key: 2,
  class: "mt-3 space-y-2"
}, m1 = { class: "text-sm font-semibold text-slate-900" }, g1 = { class: "text-xs text-slate-500" }, b1 = {
  key: 0,
  class: "flex items-center gap-2"
}, y1 = ["disabled", "onClick"], v1 = ["disabled", "onClick"], x1 = /* @__PURE__ */ Tt({
  __name: "AdminBlogPage",
  setup(s) {
    const e = rn(), t = ds(), r = re([]), n = re(""), i = re(!1), o = re(""), l = re({}), c = re({}), d = re([]), b = re(!1), m = re(!1), h = re(""), p = re(""), E = re({}), N = re(""), C = Ce(() => Er.value === "admin" || Er.value === "writer" || Er.value === "manager"), q = Ce(() => r.value.find((_) => _.id === n.value) ?? null), F = Ce(() => !!N.value);
    us(async () => {
      await z();
    }), Xt(
      q,
      async (_) => {
        if (!_) {
          l.value = {}, c.value = {}, d.value = [], E.value = {}, N.value = "";
          return;
        }
        U(_), await H(_), await le(_);
      },
      { immediate: !0 }
    ), Xt(
      () => e.query.schema,
      (_) => {
        typeof _ == "string" && r.value.some((k) => k.id === _) && n.value !== _ && (n.value = _);
      }
    );
    async function z() {
      i.value = !0, o.value = "";
      try {
        await Y();
      } catch {
        o.value = "No se pudieron cargar los tipos de contenido.";
      } finally {
        i.value = !1;
      }
    }
    async function Y() {
      const _ = await Ri();
      if (r.value = _, !_.length) {
        n.value = "";
        return;
      }
      const k = typeof e.query.schema == "string" ? e.query.schema : "";
      if (k && _.some((M) => M.id === k)) {
        n.value = k;
        return;
      }
      _.some((M) => M.id === n.value) || (n.value = _[0].id, await G(n.value));
    }
    async function G(_) {
      _ && e.query.schema !== _ && await t.replace({
        query: {
          ...e.query,
          schema: _
        }
      });
    }
    function oe(_) {
      return !!_ && typeof _ == "object" && !Array.isArray(_);
    }
    function U(_) {
      const k = {}, O = {};
      for (const M of _.fields)
        M.type === "boolean" ? k[M.key] = !1 : M.type === "array" ? k[M.key] = [] : M.type === "map" ? k[M.key] = {} : (M.type, k[M.key] = ""), M.type === "image" && (O[M.key] = null);
      l.value = k, c.value = O, N.value = "", h.value = "", p.value = "";
    }
    async function H(_) {
      b.value = !0;
      try {
        if (_.storageType === "dictionary") {
          const O = await I0(_);
          d.value = O ? [O] : [], N.value = "", O && $(_, O);
          return;
        }
        const k = await co(_, 100);
        d.value = k, N.value && !k.some((O) => O.id === N.value) && (N.value = "");
      } finally {
        b.value = !1;
      }
    }
    async function le(_) {
      const k = _.fields.filter((M) => M.type === "document");
      if (!k.length) {
        E.value = {};
        return;
      }
      const O = {};
      await Promise.all(
        k.map(async (M) => {
          const xe = typeof M.documentSchemaId == "string" ? M.documentSchemaId.trim() : "";
          if (!xe) {
            O[M.key] = { options: [], byId: {} };
            return;
          }
          const Ee = r.value.find((je) => je.id === xe);
          if (!Ee || Ee.storageType !== "document") {
            O[M.key] = { options: [], byId: {} };
            return;
          }
          const jt = typeof M.documentLabelField == "string" && M.documentLabelField.trim() || Ee.previewField || Ee.slugFromField || Ee.fields[0]?.key || "", lr = await co(Ee, 200), Ut = {}, Ge = lr.map((je) => (Ut[je.id] = je, {
            id: je.id,
            label: ee(je, jt),
            hint: f(je)
          }));
          O[M.key] = { options: Ge, byId: Ut };
        })
      ), E.value = O;
    }
    function ee(_, k) {
      const O = k ? _.data[k] : null;
      return typeof O == "string" && O.trim() ? O.trim() : _.id;
    }
    function f(_) {
      const k = _.data.telefono;
      return typeof k == "string" && k.trim() ? `Tel: ${k.trim()}` : "";
    }
    function $(_, k) {
      const O = { ...l.value };
      for (const M of _.fields) {
        const xe = k.data[M.key];
        M.type === "boolean" ? O[M.key] = !!xe : M.type === "array" || M.type === "map" ? O[M.key] = A(M, xe) : M.type === "document" ? O[M.key] = typeof xe == "string" ? xe : "" : typeof xe == "string" ? O[M.key] = xe : O[M.key] = "";
      }
      l.value = O;
    }
    function T(_) {
      const k = q.value;
      !k || k.storageType !== "document" || (U(k), $(k, _), N.value = _.id);
    }
    function P() {
      const _ = q.value;
      !_ || _.storageType !== "document" || U(_);
    }
    async function w() {
      const _ = q.value;
      if (_) {
        if (h.value = "", p.value = "", !C.value) {
          p.value = "Tu rol no tiene permisos para crear o editar contenido.";
          return;
        }
        m.value = !0;
        try {
          const k = {};
          for (const O of _.fields)
            k[O.key] = await y(_, O), S(O, k[O.key]);
          if (_.slugFromField) {
            const O = k[_.slugFromField];
            typeof O == "string" && O.trim() && (k.slug = R0(O));
          }
          _.storageType === "dictionary" ? (await O0(_, k), h.value = "Registro de diccionario actualizado.") : (N.value ? (await L0(_, N.value, k), h.value = "Registro actualizado correctamente.") : (await k0(_, k), h.value = "Registro creado correctamente."), U(_)), await H(_);
        } catch (k) {
          p.value = k instanceof Error ? k.message : "No se pudo guardar el registro.";
        } finally {
          m.value = !1;
        }
      }
    }
    async function y(_, k) {
      if (k.type === "boolean")
        return !!l.value[k.key];
      if (k.type === "image") {
        const O = c.value[k.key];
        if (!O)
          return J(k.key);
        const M = Ae(O.name), xe = await lo(
          `${_.collectionName}/${k.key}/${Date.now()}-${M}`,
          O,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return l.value[k.key] = xe, c.value[k.key] = null, xe;
      }
      return k.type === "array" || k.type === "map" ? A(k, l.value[k.key]) : (k.type === "document", J(k.key));
    }
    function S(_, k) {
      if (_.required && _.type !== "boolean") {
        if (_.type === "array") {
          if (!Array.isArray(k) || !k.length)
            throw new Error(`El campo "${_.label}" es obligatorio y debe tener al menos 1 elemento.`);
          return;
        }
        if (_.type === "map") {
          if (!oe(k) || Object.keys(k).length === 0)
            throw new Error(`El campo "${_.label}" es obligatorio y debe tener al menos 1 propiedad.`);
          return;
        }
        if (typeof k != "string" || !k.trim())
          throw new Error(`El campo "${_.label}" es obligatorio.`);
      }
    }
    function A(_, k) {
      if (typeof k == "string") {
        const M = k.trim();
        if (!(M.startsWith("{") || M.startsWith("[")))
          k = _.type === "array" ? [] : {};
        else
          try {
            k = JSON.parse(M);
          } catch {
            k = _.type === "array" ? [] : {};
          }
      }
      if (_.type === "array") {
        const M = Array.isArray(k) ? k : [];
        return _.itemSchema ? M.map(
          (xe, Ee) => R(_.itemSchema, xe, `${_.label}[${Ee}]`)
        ) : M;
      }
      const O = oe(k) ? k : {};
      return Array.isArray(_.mapFields) && _.mapFields.length > 0 ? x(_.mapFields, O, _.label) : O;
    }
    function x(_, k, O) {
      const M = {};
      for (const xe of _) {
        const Ee = xe.key;
        if (!(Ee in k)) {
          if (xe.required)
            throw new Error(`Falta la propiedad requerida "${O}.${Ee}".`);
          continue;
        }
        M[Ee] = R(xe, k[Ee], `${O}.${Ee}`);
      }
      return M;
    }
    function R(_, k, O) {
      if (_.type === "array") {
        if (!Array.isArray(k))
          throw new Error(`"${O}" debe ser un arreglo.`);
        return _.itemSchema ? k.map((M, xe) => R(_.itemSchema, M, `${O}[${xe}]`)) : k;
      }
      if (_.type === "map") {
        if (!oe(k))
          throw new Error(`"${O}" debe ser un objeto.`);
        return !Array.isArray(_.mapFields) || _.mapFields.length === 0 ? k : x(_.mapFields, k, O);
      }
      if (_.type === "boolean") {
        if (typeof k != "boolean")
          throw new Error(`"${O}" debe ser boolean.`);
        return k;
      }
      if (_.type === "document") {
        if (typeof k != "string")
          throw new Error(`"${O}" debe ser string (id de documento).`);
        return k;
      }
      if (typeof k != "string")
        throw new Error(`"${O}" debe ser string.`);
      if (_.type === "select" && Array.isArray(_.options) && _.options.length > 0 && k && !_.options.includes(k))
        throw new Error(`"${O}" no coincide con las opciones del select.`);
      return k;
    }
    async function j(_) {
      const k = q.value;
      if (!(!k || k.storageType !== "document")) {
        if (!C.value) {
          p.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await C0(k, _), N.value === _ && U(k), await H(k));
      }
    }
    async function Z(_) {
      const k = q.value;
      if (!k)
        throw new Error("No hay schema seleccionado.");
      const O = Ae(_.name);
      return lo(
        `${k.collectionName}/editor/${Date.now()}-${O}`,
        _,
        { maxWidth: 1600, maxHeight: 1600, targetSizeKb: 700, quality: 0.8 }
      );
    }
    function J(_) {
      const k = l.value[_];
      return typeof k == "string" ? k : "";
    }
    function ne(_, k) {
      l.value[_] = k;
    }
    function X(_) {
      return E.value[_.key]?.options ?? [];
    }
    function be(_) {
      const k = J(_.key);
      return k ? X(_).find((M) => M.id === k)?.hint ?? "" : "";
    }
    function ye(_) {
      return l.value[_];
    }
    function ie(_, k) {
      l.value[_] = k;
    }
    function de(_) {
      return !!l.value[_];
    }
    function ce(_, k) {
      l.value[_] = k;
    }
    function he(_, k) {
      const O = k.target;
      c.value[_] = O.files?.[0] ?? null;
    }
    function pe(_) {
      l.value[_] = "", c.value[_] = null;
    }
    function me(_, k) {
      const O = k.previewField || k.slugFromField || k.fields[0]?.key;
      if (!O)
        return _.id;
      const M = _.data[O];
      return typeof M == "string" && M.trim() ? M : typeof M == "boolean" ? M ? "true" : "false" : Array.isArray(M) ? `[array:${M.length}]` : oe(M) ? "[map]" : _.id;
    }
    function Ae(_) {
      return _.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
    }
    return (_, k) => (B(), D("section", $0, [
      v("article", B0, [
        k[0] || (k[0] = Ve(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        k[1] || (k[1] = v("strong", null, "Esquemas", -1)),
        k[2] || (k[2] = Ve(". ", -1)),
        i.value ? (B(), D("p", D0, "Cargando formularios...")) : o.value ? (B(), D("p", M0, te(o.value), 1)) : ae("", !0)
      ]),
      v("article", F0, [
        v("h3", P0, te(q.value ? `Formulario y registros: ${q.value.title}` : "Formulario y registros"), 1),
        k[7] || (k[7] = v("p", { class: "mt-1 text-sm text-slate-600" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        C.value ? ae("", !0) : (B(), D("p", j0, " No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        q.value ? (B(), D("form", {
          key: 1,
          class: "mt-5 space-y-4",
          onSubmit: qi(w, ["prevent"])
        }, [
          (B(!0), D(Be, null, De(q.value.fields, (O) => (B(), D("div", {
            key: O.key,
            class: "space-y-1"
          }, [
            v("label", U0, te(O.label), 1),
            O.helpText ? (B(), D("p", z0, te(O.helpText), 1)) : ae("", !0),
            O.type === "text" ? (B(), D("input", {
              key: 1,
              value: J(O.key),
              type: "text",
              placeholder: O.placeholder || "",
              disabled: !C.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: (M) => ne(O.key, M.target.value)
            }, null, 40, H0)) : O.type === "textarea" ? (B(), D("textarea", {
              key: 2,
              value: J(O.key),
              rows: "4",
              placeholder: O.placeholder || "",
              disabled: !C.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: (M) => ne(O.key, M.target.value)
            }, null, 40, V0)) : O.type === "select" ? (B(), D("select", {
              key: 3,
              value: J(O.key),
              disabled: !C.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: (M) => ne(O.key, M.target.value)
            }, [
              k[3] || (k[3] = v("option", { value: "" }, "Selecciona una opción", -1)),
              (B(!0), D(Be, null, De(O.options || [], (M) => (B(), D("option", {
                key: M,
                value: M
              }, te(M), 9, G0))), 128))
            ], 40, K0)) : O.type === "document" ? (B(), D("div", W0, [
              v("select", {
                value: J(O.key),
                disabled: !C.value,
                class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
                onChange: (M) => ne(O.key, M.target.value)
              }, [
                k[4] || (k[4] = v("option", { value: "" }, "Selecciona un documento", -1)),
                (B(!0), D(Be, null, De(X(O), (M) => (B(), D("option", {
                  key: M.id,
                  value: M.id
                }, te(M.label), 9, Y0))), 128))
              ], 40, Z0),
              be(O) ? (B(), D("p", X0, te(be(O)), 1)) : ae("", !0)
            ])) : O.type === "boolean" ? (B(), D("label", Q0, [
              v("input", {
                checked: de(O.key),
                type: "checkbox",
                disabled: !C.value,
                onChange: (M) => ce(O.key, M.target.checked)
              }, null, 40, J0),
              k[5] || (k[5] = Ve(" Activo ", -1))
            ])) : O.type === "image" ? (B(), D("div", e1, [
              v("input", {
                type: "file",
                accept: "image/*",
                disabled: !C.value,
                class: "block w-full text-sm text-slate-600 disabled:opacity-60",
                onChange: (M) => he(O.key, M)
              }, null, 40, t1),
              J(O.key) ? (B(), D("p", r1, " URL actual: " + te(J(O.key)), 1)) : ae("", !0),
              J(O.key) ? (B(), D("img", {
                key: 1,
                src: J(O.key),
                alt: "Vista previa",
                class: "max-h-32 rounded-md border border-slate-200 object-cover"
              }, null, 8, s1)) : ae("", !0),
              J(O.key) ? (B(), D("button", {
                key: 2,
                type: "button",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50",
                disabled: !C.value,
                onClick: (M) => pe(O.key)
              }, " Quitar URL ", 8, n1)) : ae("", !0)
            ])) : O.type === "array" || O.type === "map" ? (B(), Yt(A0, {
              key: 7,
              schema: O,
              "model-value": ye(O.key),
              disabled: !C.value,
              "onUpdate:modelValue": (M) => ie(O.key, M)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])) : O.type === "richtext" ? (B(), Yt(t0, {
              key: 8,
              "model-value": J(O.key),
              "subir-imagen": Z,
              disabled: !C.value,
              "onUpdate:modelValue": (M) => ne(O.key, M)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])) : ae("", !0)
          ]))), 128)),
          q.value.storageType === "document" && F.value ? (B(), D("p", i1, " Editando registro: " + te(N.value), 1)) : ae("", !0),
          p.value ? (B(), D("p", a1, te(p.value), 1)) : ae("", !0),
          h.value ? (B(), D("p", o1, te(h.value), 1)) : ae("", !0),
          v("div", l1, [
            v("button", {
              type: "submit",
              disabled: m.value || !C.value,
              class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            }, te(m.value ? "Guardando..." : q.value.storageType === "dictionary" ? "Guardar diccionario" : F.value ? "Guardar cambios" : "Crear documento"), 9, c1),
            q.value.storageType === "document" && F.value ? (B(), D("button", {
              key: 0,
              type: "button",
              disabled: m.value || !C.value,
              class: "rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
              onClick: P
            }, " Cancelar edición ", 8, u1)) : ae("", !0)
          ])
        ], 32)) : ae("", !0),
        v("div", d1, [
          k[6] || (k[6] = v("h4", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Registros guardados", -1)),
          b.value ? (B(), D("p", h1, "Cargando registros...")) : d.value.length ? (B(), D("ul", p1, [
            (B(!0), D(Be, null, De(d.value, (O) => (B(), D("li", {
              key: O.id,
              class: rt([
                "flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2",
                q.value?.storageType === "document" && N.value === O.id ? "border-sky-300 bg-sky-50" : ""
              ])
            }, [
              v("div", null, [
                v("p", m1, te(q.value ? me(O, q.value) : O.id), 1),
                v("p", g1, "ID: " + te(O.id), 1)
              ]),
              q.value?.storageType === "document" ? (B(), D("div", b1, [
                v("button", {
                  type: "button",
                  disabled: !C.value || m.value,
                  class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (M) => T(O)
                }, te(N.value === O.id ? "Editando" : "Editar"), 9, y1),
                v("button", {
                  type: "button",
                  disabled: !C.value,
                  class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (M) => j(O.id)
                }, " Eliminar ", 8, v1)
              ])) : ae("", !0)
            ], 2))), 128))
          ])) : (B(), D("p", f1, "No hay registros todavía."))
        ])
      ])
    ]));
  }
}), w1 = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3" }, A1 = { class: "mb-3 flex items-start justify-between gap-2" }, E1 = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide text-slate-600"
}, N1 = ["disabled"], T1 = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, _1 = { class: "space-y-1" }, S1 = ["value", "disabled"], k1 = { class: "space-y-1" }, C1 = ["value", "disabled"], L1 = { class: "mt-2 grid gap-2 md:grid-cols-3" }, q1 = { class: "space-y-1" }, O1 = ["value", "disabled"], I1 = ["value"], R1 = { class: "space-y-1" }, $1 = ["value", "disabled"], B1 = { class: "space-y-1" }, D1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, M1 = ["checked", "disabled"], F1 = { class: "mt-2 block space-y-1" }, P1 = ["value", "disabled"], j1 = {
  key: 1,
  class: "mt-2 block space-y-1"
}, U1 = ["value", "disabled"], z1 = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, H1 = { class: "space-y-1" }, V1 = ["value", "disabled"], K1 = { class: "space-y-1" }, G1 = ["value", "disabled"], W1 = {
  key: 3,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, Z1 = { class: "mb-2 flex items-center justify-between" }, Y1 = ["disabled"], X1 = { class: "space-y-2" }, Q1 = {
  key: 4,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, J1 = /* @__PURE__ */ Tt({
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
  setup(s, { emit: e }) {
    const t = [
      { label: "Texto", value: "text" },
      { label: "Textarea", value: "textarea" },
      { label: "Editor enriquecido", value: "richtext" },
      { label: "Imagen", value: "image" },
      { label: "Select", value: "select" },
      { label: "Documento (relación)", value: "document" },
      { label: "Boolean", value: "boolean" },
      { label: "Array", value: "array" },
      { label: "Map", value: "map" }
    ], r = s, n = e;
    function i(A) {
      return !!A && typeof A == "object" && !Array.isArray(A);
    }
    function o(A) {
      return A === "textarea" || A === "richtext" || A === "image" || A === "select" || A === "document" || A === "boolean" || A === "array" || A === "map" ? A : "text";
    }
    function l(A) {
      return typeof A == "string" ? A : "";
    }
    function c(A) {
      return Array.isArray(A) ? A.map((x) => String(x).trim()).filter(Boolean) : [];
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
    function m(A) {
      const x = i(A) ? A : {}, R = o(x.type), j = {
        type: R,
        required: !!x.required,
        placeholder: l(x.placeholder),
        helpText: l(x.helpText),
        options: R === "select" ? c(x.options) : [],
        documentSchemaId: R === "document" ? l(x.documentSchemaId) : "",
        documentLabelField: R === "document" ? l(x.documentLabelField) : ""
      };
      return R === "map" && (j.mapFields = Array.isArray(x.mapFields) ? x.mapFields.map((Z) => h(Z)) : []), R === "array" && (j.itemSchema = m(x.itemSchema)), j;
    }
    function h(A) {
      const x = i(A) ? A : {};
      return {
        ...m(x),
        key: l(x.key),
        label: l(x.label)
      };
    }
    function p() {
      const A = m(r.modelValue);
      if (r.withIdentity) {
        const x = h(r.modelValue);
        A.key = x.key, A.label = x.label;
      }
      return A;
    }
    function E(A, x) {
      const R = m(A), j = {
        type: R.type,
        required: !!R.required,
        placeholder: l(R.placeholder),
        helpText: l(R.helpText),
        options: R.type === "select" ? c(R.options) : [],
        documentSchemaId: R.type === "document" ? l(R.documentSchemaId) : "",
        documentLabelField: R.type === "document" ? l(R.documentLabelField) : ""
      };
      if (R.type === "map" && (j.mapFields = (R.mapFields ?? []).map((Z) => h(Z))), R.type === "array" && (j.itemSchema = E(R.itemSchema ?? d(), !1)), x) {
        const Z = h(A);
        j.key = Z.key, j.label = Z.label;
      }
      return j;
    }
    function N(A) {
      n("update:modelValue", E(A, r.withIdentity));
    }
    function C(A, x) {
      const R = p();
      R[A] = x, N(R);
    }
    function q(A) {
      const x = p(), R = o(A);
      x.type = R, R !== "select" && (x.options = []), R !== "document" && (x.documentSchemaId = "", x.documentLabelField = ""), R === "map" ? (x.mapFields = Array.isArray(x.mapFields) ? x.mapFields.map((j) => h(j)) : [], delete x.itemSchema) : R === "array" ? (x.itemSchema = m(x.itemSchema ?? d()), delete x.mapFields) : (delete x.mapFields, delete x.itemSchema), N(x);
    }
    function F(A) {
      const x = p();
      x.required = A, N(x);
    }
    function z(A) {
      const x = p();
      x.placeholder = A, N(x);
    }
    function Y(A) {
      const x = p();
      x.helpText = A, N(x);
    }
    function G() {
      return (p().options ?? []).join(", ");
    }
    function oe(A) {
      const x = p();
      x.options = A.split(",").map((R) => R.trim()).filter(Boolean), N(x);
    }
    function U() {
      return p().documentSchemaId ?? "";
    }
    function H() {
      return p().documentLabelField ?? "";
    }
    function le(A) {
      const x = p();
      x.documentSchemaId = A, N(x);
    }
    function ee(A) {
      const x = p();
      x.documentLabelField = A, N(x);
    }
    function f() {
      const A = p();
      return A.type !== "map" || !Array.isArray(A.mapFields) ? [] : A.mapFields.map((x) => h(x));
    }
    function $() {
      const A = p();
      A.type = "map", A.mapFields = [...f(), b()], N(A);
    }
    function T(A, x) {
      const R = p(), j = f();
      j[A] = h(x), R.mapFields = j, N(R);
    }
    function P(A) {
      const x = p(), R = f();
      R.splice(A, 1), x.mapFields = R, N(x);
    }
    function w() {
      const A = p();
      return A.type !== "array" ? d() : m(A.itemSchema ?? d());
    }
    function y(A) {
      const x = p();
      x.type = "array", x.itemSchema = m(A), N(x);
    }
    function S() {
      n("remove");
    }
    return (A, x) => {
      const R = mo("CmsSchemaFieldEditor", !0);
      return B(), D("article", w1, [
        v("div", A1, [
          s.title ? (B(), D("p", E1, te(s.title), 1)) : ae("", !0),
          s.canRemove ? (B(), D("button", {
            key: 1,
            type: "button",
            disabled: s.disabled,
            class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60",
            onClick: S
          }, " Quitar ", 8, N1)) : ae("", !0)
        ]),
        s.withIdentity ? (B(), D("div", T1, [
          v("label", _1, [
            x[9] || (x[9] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Key", -1)),
            v("input", {
              value: p().key || "",
              type: "text",
              disabled: s.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[0] || (x[0] = (j) => C("key", j.target.value))
            }, null, 40, S1)
          ]),
          v("label", k1, [
            x[10] || (x[10] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Label", -1)),
            v("input", {
              value: p().label || "",
              type: "text",
              disabled: s.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[1] || (x[1] = (j) => C("label", j.target.value))
            }, null, 40, C1)
          ])
        ])) : ae("", !0),
        v("div", L1, [
          v("label", q1, [
            x[11] || (x[11] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo", -1)),
            v("select", {
              value: p().type,
              disabled: s.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: x[2] || (x[2] = (j) => q(j.target.value))
            }, [
              (B(), D(Be, null, De(t, (j) => v("option", {
                key: j.value,
                value: j.value
              }, te(j.label), 9, I1)), 64))
            ], 40, O1)
          ]),
          v("label", R1, [
            x[12] || (x[12] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Placeholder", -1)),
            v("input", {
              value: p().placeholder || "",
              type: "text",
              disabled: s.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[3] || (x[3] = (j) => z(j.target.value))
            }, null, 40, $1)
          ]),
          v("label", B1, [
            x[14] || (x[14] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Requerido", -1)),
            v("span", D1, [
              v("input", {
                checked: !!p().required,
                type: "checkbox",
                disabled: s.disabled,
                onChange: x[4] || (x[4] = (j) => F(j.target.checked))
              }, null, 40, M1),
              x[13] || (x[13] = v("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        v("label", F1, [
          x[15] || (x[15] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Help text", -1)),
          v("input", {
            value: p().helpText || "",
            type: "text",
            disabled: s.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: x[5] || (x[5] = (j) => Y(j.target.value))
          }, null, 40, P1)
        ]),
        p().type === "select" ? (B(), D("label", j1, [
          x[16] || (x[16] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Opciones (separadas por coma)", -1)),
          v("input", {
            value: G(),
            type: "text",
            disabled: s.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: x[6] || (x[6] = (j) => oe(j.target.value))
          }, null, 40, U1)
        ])) : ae("", !0),
        p().type === "document" ? (B(), D("div", z1, [
          v("label", H1, [
            x[17] || (x[17] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Schema destino", -1)),
            v("input", {
              value: U(),
              type: "text",
              disabled: s.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[7] || (x[7] = (j) => le(j.target.value))
            }, null, 40, V1)
          ]),
          v("label", K1, [
            x[18] || (x[18] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Campo etiqueta", -1)),
            v("input", {
              value: H(),
              type: "text",
              disabled: s.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: x[8] || (x[8] = (j) => ee(j.target.value))
            }, null, 40, G1)
          ])
        ])) : ae("", !0),
        p().type === "map" ? (B(), D("div", W1, [
          v("div", Z1, [
            x[19] || (x[19] = v("p", { class: "text-xs font-bold uppercase tracking-wide text-slate-600" }, "Map fields", -1)),
            v("button", {
              type: "button",
              disabled: s.disabled,
              class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60",
              onClick: $
            }, " Agregar campo ", 8, Y1)
          ]),
          v("div", X1, [
            (B(!0), D(Be, null, De(f(), (j, Z) => (B(), Yt(R, {
              key: `map-field-${Z}`,
              "model-value": j,
              disabled: s.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (J) => T(Z, J),
              onRemove: (J) => P(Z)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : ae("", !0),
        p().type === "array" ? (B(), D("div", Q1, [
          x[20] || (x[20] = v("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-600" }, "Item schema", -1)),
          At(R, {
            "model-value": w(),
            "with-identity": !1,
            disabled: s.disabled,
            title: "Estructura del ítem",
            "onUpdate:modelValue": y
          }, null, 8, ["model-value", "disabled"])
        ])) : ae("", !0)
      ]);
    };
  }
}), eb = { class: "space-y-4" }, tb = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, rb = {
  key: 1,
  class: "text-sm text-slate-500"
}, sb = {
  key: 2,
  class: "text-sm text-slate-500"
}, nb = {
  key: 3,
  class: "rounded-2xl border border-slate-200 bg-white p-5"
}, ib = { class: "flex flex-wrap items-center justify-between gap-3" }, ab = { class: "text-lg font-black text-slate-900" }, ob = { class: "text-xs text-slate-500" }, lb = ["disabled"], cb = { class: "mt-4 grid gap-3 md:grid-cols-2" }, ub = { class: "space-y-1" }, db = ["value"], hb = { class: "space-y-1" }, fb = ["value"], pb = { class: "space-y-1 md:col-span-2" }, mb = ["value"], gb = { class: "space-y-1" }, bb = ["value"], yb = { class: "space-y-1" }, vb = ["value"], xb = { class: "space-y-1" }, wb = ["value"], Ab = { class: "space-y-1" }, Eb = ["value"], Nb = {
  key: 0,
  class: "space-y-1"
}, Tb = ["value"], _b = {
  key: 1,
  class: "space-y-1"
}, Sb = ["value"], kb = { class: "mt-5 border-t border-slate-200 pt-4" }, Cb = { class: "space-y-3" }, Lb = {
  key: 0,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, qb = {
  key: 1,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, Ob = /* @__PURE__ */ Tt({
  __name: "AdminSchemasPage",
  setup(s) {
    const e = rn(), t = ds(), r = re([]), n = re(""), i = re(!1), o = re(!1), l = re(null), c = re(!1), d = re(""), b = re(""), m = re(""), h = Ce(() => r.value.find((w) => w.id === n.value) ?? null);
    us(() => {
      p();
    }), Xt(
      () => e.query.schema,
      (w) => {
        typeof w == "string" && r.value.some((y) => y.id === w) && n.value !== w && (n.value = w);
      }
    ), Xt(
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
        const w = await Ri();
        r.value = w, E(w), n.value ? await N(n.value) : l.value || (c.value = !0, l.value = G());
      } catch {
        d.value = "No se pudieron cargar los esquemas.";
      } finally {
        i.value = !1;
      }
    }
    function E(w) {
      if (!w.length) {
        n.value = "";
        return;
      }
      const y = typeof e.query.schema == "string" ? e.query.schema : "";
      if (y && w.some((S) => S.id === y)) {
        n.value = y;
        return;
      }
      w.some((S) => S.id === n.value) || (n.value = w[0].id);
    }
    async function N(w) {
      !w || e.query.schema === w || await t.replace({
        query: {
          ...e.query,
          schema: w
        }
      });
    }
    function C() {
      return {
        type: "text",
        required: !1,
        placeholder: "",
        helpText: "",
        options: []
      };
    }
    function q() {
      return {
        ...C(),
        key: "",
        label: ""
      };
    }
    function F(w) {
      const y = {
        type: w.type,
        required: !!w.required,
        placeholder: w.placeholder ?? "",
        helpText: w.helpText ?? "",
        options: Array.isArray(w.options) ? [...w.options] : []
      };
      return w.type === "map" && (y.mapFields = Array.isArray(w.mapFields) ? w.mapFields.map((S) => z(S)) : []), w.type === "array" && (y.itemSchema = w.itemSchema ? F(w.itemSchema) : C()), y;
    }
    function z(w) {
      return {
        ...F(w),
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
        fields: w.fields.map((y) => z(y))
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
        fields: [q()]
      };
    }
    async function oe() {
      c.value = !0, n.value = "", l.value = G(), b.value = "", m.value = "";
      const w = { ...e.query };
      delete w.schema, await t.replace({ query: w });
    }
    function U(w, y) {
      l.value && (l.value = {
        ...l.value,
        [w]: y
      });
    }
    function H(w) {
      l.value && (l.value.storageType = w === "dictionary" ? "dictionary" : "document");
    }
    function le() {
      l.value && l.value.fields.push(q());
    }
    function ee(w, y) {
      l.value && (l.value.fields[w] = z(y));
    }
    function f(w) {
      l.value && l.value.fields.splice(w, 1);
    }
    function $(w, y) {
      if (w.type === "map") {
        const S = Array.isArray(w.mapFields) ? w.mapFields : [];
        for (let A = 0; A < S.length; A += 1)
          T(S[A], `${y}.mapFields[${A}]`);
      }
      w.type === "array" && w.itemSchema && $(w.itemSchema, `${y}.itemSchema`);
    }
    function T(w, y) {
      if (!w.key.trim() || !w.label.trim())
        throw new Error(`${y}: completa key y label.`);
      $(w, y);
    }
    async function P() {
      if (l.value) {
        o.value = !0, b.value = "", m.value = "";
        try {
          const w = l.value;
          if (!w.id.trim() || !w.title.trim() || !w.collectionName.trim())
            throw new Error("Completa id, título y colección del esquema.");
          if (!w.fields.length)
            throw new Error("Agrega al menos un campo al esquema.");
          const y = w.fields.map((x) => z(x));
          for (let x = 0; x < y.length; x += 1)
            T(y[x], `fields[${x}]`);
          const S = {
            id: w.id,
            title: w.title,
            description: w.description,
            storageType: w.storageType,
            collectionName: w.collectionName,
            dictionaryDocumentId: w.storageType === "dictionary" ? w.dictionaryDocumentId : "",
            dictionaryRootKey: w.storageType === "dictionary" ? w.dictionaryRootKey : "",
            slugFromField: w.slugFromField,
            previewField: w.previewField,
            fields: y
          };
          await gc(S), await p(), n.value = S.id, c.value = !1, await N(S.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const A = r.value.find((x) => x.id === n.value);
          l.value = Y(A || S), m.value = "Esquema actualizado.";
        } catch (w) {
          b.value = w instanceof Error ? w.message : "No se pudo guardar el esquema.";
        } finally {
          o.value = !1;
        }
      }
    }
    return (w, y) => (B(), D("section", eb, [
      v("article", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        v("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
          y[9] || (y[9] = v("div", null, [
            v("h3", { class: "text-xl font-black text-slate-900" }, "Esquema editable"),
            v("p", { class: "mt-1 text-sm text-slate-600" }, [
              Ve(" Edición visual de campos. Los tipos "),
              v("strong", null, "map"),
              Ve(" y "),
              v("strong", null, "array"),
              Ve(" se editan por interfaz. ")
            ])
          ], -1)),
          v("div", { class: "flex items-center gap-2" }, [
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: oe
            }, " Nuevo esquema "),
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: p
            }, " Recargar ")
          ])
        ])
      ]),
      d.value ? (B(), D("p", tb, te(d.value), 1)) : ae("", !0),
      i.value ? (B(), D("p", rb, "Cargando esquemas...")) : l.value ? (B(), D("article", nb, [
        v("div", ib, [
          v("div", null, [
            v("h4", ab, te(l.value.title || h.value?.title || "Nuevo esquema"), 1),
            v("p", ob, [
              y[10] || (y[10] = Ve(" ID: ", -1)),
              v("code", null, te(h.value?.id || "nuevo"), 1)
            ])
          ]),
          v("button", {
            type: "button",
            disabled: o.value,
            class: "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400",
            onClick: P
          }, te(o.value ? "Guardando..." : "Guardar cambios"), 9, lb)
        ]),
        v("div", cb, [
          v("label", ub, [
            y[11] || (y[11] = v("span", { class: "text-xs font-semibold text-slate-700" }, "ID", -1)),
            v("input", {
              value: l.value.id,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: y[0] || (y[0] = (S) => U("id", S.target.value))
            }, null, 40, db)
          ]),
          v("label", hb, [
            y[12] || (y[12] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Título", -1)),
            v("input", {
              value: l.value.title,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: y[1] || (y[1] = (S) => U("title", S.target.value))
            }, null, 40, fb)
          ]),
          v("label", pb, [
            y[13] || (y[13] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Descripción", -1)),
            v("input", {
              value: l.value.description,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: y[2] || (y[2] = (S) => U("description", S.target.value))
            }, null, 40, mb)
          ]),
          v("label", gb, [
            y[15] || (y[15] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo de almacenamiento", -1)),
            v("select", {
              value: l.value.storageType,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onChange: y[3] || (y[3] = (S) => H(S.target.value))
            }, [...y[14] || (y[14] = [
              v("option", { value: "document" }, "document", -1),
              v("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, bb)
          ]),
          v("label", yb, [
            y[16] || (y[16] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Colección", -1)),
            v("input", {
              value: l.value.collectionName,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: y[4] || (y[4] = (S) => U("collectionName", S.target.value))
            }, null, 40, vb)
          ]),
          v("label", xb, [
            y[17] || (y[17] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Slug desde campo", -1)),
            v("input", {
              value: l.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: y[5] || (y[5] = (S) => U("slugFromField", S.target.value))
            }, null, 40, wb)
          ]),
          v("label", Ab, [
            y[18] || (y[18] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Campo de preview", -1)),
            v("input", {
              value: l.value.previewField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: y[6] || (y[6] = (S) => U("previewField", S.target.value))
            }, null, 40, Eb)
          ]),
          l.value.storageType === "dictionary" ? (B(), D("label", Nb, [
            y[19] || (y[19] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary document ID", -1)),
            v("input", {
              value: l.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: y[7] || (y[7] = (S) => U("dictionaryDocumentId", S.target.value))
            }, null, 40, Tb)
          ])) : ae("", !0),
          l.value.storageType === "dictionary" ? (B(), D("label", _b, [
            y[20] || (y[20] = v("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary root key", -1)),
            v("input", {
              value: l.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: y[8] || (y[8] = (S) => U("dictionaryRootKey", S.target.value))
            }, null, 40, Sb)
          ])) : ae("", !0)
        ]),
        v("div", kb, [
          v("div", { class: "mb-3 flex items-center justify-between" }, [
            y[21] || (y[21] = v("h5", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Campos", -1)),
            v("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: le
            }, " Agregar campo ")
          ]),
          v("div", Cb, [
            (B(!0), D(Be, null, De(l.value.fields, (S, A) => (B(), Yt(J1, {
              key: `schema-field-${A}`,
              "model-value": S,
              "can-remove": !0,
              title: `Campo ${A + 1}`,
              "onUpdate:modelValue": (x) => ee(A, x),
              onRemove: (x) => f(A)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        b.value ? (B(), D("p", Lb, te(b.value), 1)) : ae("", !0),
        m.value ? (B(), D("p", qb, te(m.value), 1)) : ae("", !0)
      ])) : (B(), D("p", sb, "No hay esquema seleccionado."))
    ]));
  }
}), Ib = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, Rb = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, $b = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Bb = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, Db = {
  key: 3,
  class: "mt-4 text-sm text-slate-500"
}, Mb = {
  key: 4,
  class: "mt-4 text-sm text-slate-500"
}, Fb = {
  key: 5,
  class: "mt-4 space-y-3"
}, Pb = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, jb = { class: "text-sm font-semibold text-slate-900" }, Ub = { class: "text-xs text-slate-500" }, zb = { class: "text-xs text-slate-500" }, Hb = { class: "text-xs text-slate-500" }, Vb = { class: "flex flex-wrap gap-3" }, Kb = ["checked", "disabled", "onChange"], Gb = /* @__PURE__ */ Tt({
  __name: "AdminUsersPage",
  setup(s) {
    const e = re([]), t = re(!1), r = re(""), n = re(""), i = re(null), o = Ce(() => Er.value === "admin"), l = [
      { label: "Admin", value: "admin" },
      { label: "Writer", value: "writer" },
      { label: "Manager", value: "manager" },
      { label: "Sin rol", value: null }
    ];
    us(async () => {
      await c();
    });
    async function c() {
      t.value = !0, r.value = "";
      try {
        e.value = await Yl();
      } catch {
        r.value = "No se pudieron cargar los usuarios.";
      } finally {
        t.value = !1;
      }
    }
    async function d(p, E) {
      if (n.value = "", r.value = "", !o.value) {
        r.value = "Solo un admin puede cambiar roles.";
        return;
      }
      const N = p.role === E ? null : E;
      i.value = p.id;
      try {
        await Xl(p.id, N), p.role = N, n.value = "Rol actualizado correctamente.";
      } catch {
        r.value = "No se pudo actualizar el rol.";
      } finally {
        i.value = null;
      }
    }
    function b(p, E) {
      return p === E;
    }
    function m(p) {
      return p === null ? "Sin rol" : p.charAt(0).toUpperCase() + p.slice(1);
    }
    function h(p) {
      const E = p?.toDate?.();
      return E ? E.toLocaleString("es-ES") : "Sin registros";
    }
    return (p, E) => (B(), D("section", Ib, [
      v("div", { class: "flex items-center justify-between" }, [
        E[0] || (E[0] = v("h3", { class: "text-xl font-black text-slate-900" }, "Usuarios", -1)),
        v("button", {
          type: "button",
          class: "rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
          onClick: c
        }, " Recargar ")
      ]),
      E[1] || (E[1] = v("p", { class: "mt-1 text-sm text-slate-600" }, "Listado de usuarios con último login y control de rol.", -1)),
      o.value ? ae("", !0) : (B(), D("p", Rb, " Solo usuarios con rol admin pueden editar roles. ")),
      r.value ? (B(), D("p", $b, te(r.value), 1)) : ae("", !0),
      n.value ? (B(), D("p", Bb, te(n.value), 1)) : ae("", !0),
      t.value ? (B(), D("p", Db, "Cargando usuarios...")) : e.value.length === 0 ? (B(), D("p", Mb, "No hay usuarios registrados.")) : (B(), D("div", Fb, [
        (B(!0), D(Be, null, De(e.value, (N) => (B(), D("article", {
          key: N.id,
          class: "rounded-lg border border-slate-200 p-4"
        }, [
          v("div", Pb, [
            v("div", null, [
              v("p", jb, te(N.email || N.id), 1),
              v("p", Ub, "UID: " + te(N.id), 1),
              v("p", zb, "Último login: " + te(h(N.lastLoginAt)), 1),
              v("p", Hb, "Rol actual: " + te(m(N.role)), 1)
            ]),
            v("div", Vb, [
              (B(), D(Be, null, De(l, (C) => v("label", {
                key: C.label,
                class: "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
              }, [
                v("input", {
                  type: "checkbox",
                  checked: b(N.role, C.value),
                  disabled: !o.value || i.value === N.id,
                  onChange: (q) => d(N, C.value)
                }, null, 40, Kb),
                Ve(" " + te(C.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), uo = /* @__PURE__ */ new WeakSet();
function oy(s, e) {
  if (uo.has(s))
    return;
  const t = Sr(e.basePath ?? "/admin"), r = Sr(e.loginPath ?? "/ingresar"), n = Sr(e.registerPath ?? "/registro"), i = Zb(e.homePath ?? "/");
  Gl(e.firebase), nc({ basePath: t, loginPath: r, registerPath: n, homePath: i }), Jl();
  const o = Wb(t, r, n);
  for (const l of o)
    s.addRoute(l);
  s.beforeEach(async (l) => (await ec(), l.meta.cmsRequiresAuth && !ss.value ? {
    path: r,
    query: { redirect: l.fullPath }
  } : (l.path === r || l.path === n || l.meta.cmsGuestOnly) && ss.value ? { path: t } : !0)), uo.add(s);
}
function Wb(s = "/admin", e = "/ingresar", t = "/registro") {
  const r = Sr(s), n = Sr(e), i = Sr(t);
  return [
    { path: n, component: cc, meta: { cmsGuestOnly: !0 } },
    { path: i, component: pc, meta: { cmsGuestOnly: !0 } },
    {
      path: r,
      component: Yc,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${r}/content` },
        { path: "content", component: x1, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: Ob, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: Gb, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function Sr(s) {
  const e = String(s || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function Zb(s) {
  const e = String(s || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
export {
  L0 as actualizarRegistroDocumento,
  sc as cerrarSesion,
  k0 as crearRegistroDocumento,
  Wb as createCmsRoutes,
  C0 as eliminarRegistroDocumento,
  O0 as guardarRegistroDiccionario,
  gc as guardarSchemaContenido,
  co as listarRegistrosDocumento,
  Ri as listarSchemasContenido,
  I0 as obtenerRegistroDiccionario,
  oy as registerPifWarriorsCms,
  Er as rolActual,
  ss as usuarioActual
};
