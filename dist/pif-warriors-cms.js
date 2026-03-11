import { signOut as Po, onAuthStateChanged as jo, setPersistence as ml, browserLocalPersistence as gl, signInWithEmailAndPassword as Uo, createUserWithEmailAndPassword as Vo } from "firebase/auth";
import { ref as J, defineComponent as Te, openBlock as R, createElementBlock as F, createElementVNode as A, withModifiers as qi, withDirectives as ar, vModelText as lr, toDisplayString as X, createCommentVNode as se, createTextVNode as Qe, createVNode as dt, unref as Fe, withCtx as Ut, onMounted as br, onBeforeUnmount as bl, watch as on, computed as Ie, normalizeClass as lt, Fragment as Pe, renderList as je, createBlock as qe, resolveComponent as yl } from "vue";
import { query as Ii, collection as un, orderBy as Oi, getDocs as Dn, updateDoc as vl, doc as Zt, serverTimestamp as Xe, getDoc as ss, setDoc as Yr, addDoc as zo, deleteDoc as Ho, limit as xl } from "firebase/firestore";
import { useRoute as is, useRouter as yr, RouterLink as Vt, RouterView as Ko } from "vue-router";
import { ref as Go, uploadBytes as Wo, getDownloadURL as Zo } from "firebase/storage";
let hi = null;
function Yo(n) {
  hi = n;
}
function Ce() {
  if (!hi)
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  return hi;
}
const as = "users";
async function Xo(n) {
  const { firestore: e } = Ce(), t = Zt(e, as, n.uid);
  if (!(await ss(t)).exists()) {
    await Yr(t, {
      email: n.email ?? "",
      role: null,
      lastLoginAt: Xe(),
      createdAt: Xe(),
      updatedAt: Xe()
    });
    return;
  }
  await Yr(
    t,
    {
      email: n.email ?? "",
      lastLoginAt: Xe(),
      updatedAt: Xe()
    },
    { merge: !0 }
  );
}
async function Qo(n) {
  const { firestore: e } = Ce(), t = await ss(Zt(e, as, n));
  return t.exists() ? wl(t.data().role) : null;
}
async function Jo() {
  const { firestore: n } = Ce(), e = Ii(un(n, as), Oi("email", "asc"));
  return (await Dn(e)).docs.map((r) => ({
    id: r.id,
    email: String(r.data().email ?? ""),
    role: wl(r.data().role),
    lastLoginAt: r.data().lastLoginAt,
    createdAt: r.data().createdAt,
    updatedAt: r.data().updatedAt
  }));
}
async function eu(n, e) {
  const { firestore: t } = Ce();
  await vl(Zt(t, as, n), {
    role: e,
    updatedAt: Xe()
  });
}
function wl(n) {
  return n === "admin" || n === "writer" || n === "manager" ? n : null;
}
const cr = J(null), Al = J(!1), qn = J(null);
let Gr = null, tu = new Promise((n) => {
  Gr = n;
}), ia = !1;
function nu() {
  if (ia)
    return;
  const { auth: n } = Ce();
  cr.value = n.currentUser, jo(n, async (e) => {
    cr.value = e, qn.value = null, e && await Ri(e), Al.value = !0, Gr && (Gr(), Gr = null);
  }), ia = !0;
}
async function ru() {
  Al.value || await tu;
}
async function su(n, e) {
  const { auth: t } = Ce();
  await ml(t, gl);
  const r = await Vo(t, n, e);
  await Ri(r.user);
}
async function iu(n, e) {
  const { auth: t } = Ce();
  await ml(t, gl);
  const r = await Uo(t, n, e);
  await Ri(r.user);
}
async function au() {
  const { auth: n } = Ce();
  await Po(n);
}
async function Ri(n) {
  try {
    await Xo(n), qn.value = await Qo(n.uid);
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
function lu(n) {
  fi = {
    ...fi,
    ...n
  };
}
function $i() {
  return fi;
}
const ou = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, uu = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, cu = ["disabled"], du = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, hu = /* @__PURE__ */ Te({
  __name: "LoginPage",
  setup(n) {
    const e = is(), t = yr(), { basePath: r, registerPath: s } = $i(), i = J(""), l = J(""), o = J(!1), u = J("");
    async function d() {
      u.value = "", o.value = !0;
      try {
        await iu(i.value, l.value);
        const p = typeof e.query.redirect == "string" ? e.query.redirect : r;
        await t.push(p);
      } catch {
        u.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        o.value = !1;
      }
    }
    return (p, b) => (R(), F("main", ou, [
      b[6] || (b[6] = A("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Ingresar", -1)),
      b[7] || (b[7] = A("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Accede para administrar contenido y esquemas.", -1)),
      A("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        A("div", null, [
          b[2] || (b[2] = A("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          ar(A("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [lr, i.value]
          ])
        ]),
        A("div", null, [
          b[3] || (b[3] = A("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          ar(A("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (h) => l.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "********"
          }, null, 512), [
            [lr, l.value]
          ])
        ]),
        u.value ? (R(), F("p", uu, X(u.value), 1)) : se("", !0),
        A("button", {
          type: "submit",
          disabled: o.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, X(o.value ? "Ingresando..." : "Entrar"), 9, cu)
      ], 32),
      A("p", du, [
        b[5] || (b[5] = Qe(" ¿No tienes cuenta? ", -1)),
        dt(Fe(Vt), {
          to: Fe(s),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Ut(() => [...b[4] || (b[4] = [
            Qe("Crear cuenta", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), fu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, pu = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, mu = ["disabled"], gu = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, bu = /* @__PURE__ */ Te({
  __name: "RegisterPage",
  setup(n) {
    const e = yr(), { basePath: t, loginPath: r } = $i(), s = J(""), i = J(""), l = J(""), o = J(!1), u = J("");
    async function d() {
      if (u.value = "", i.value !== l.value) {
        u.value = "Las contraseñas no coinciden.";
        return;
      }
      o.value = !0;
      try {
        await su(s.value, i.value), await e.push(t);
      } catch {
        u.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
      } finally {
        o.value = !1;
      }
    }
    return (p, b) => (R(), F("main", fu, [
      b[8] || (b[8] = A("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Crear cuenta", -1)),
      b[9] || (b[9] = A("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Registro para administrar contenido.", -1)),
      A("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        A("div", null, [
          b[3] || (b[3] = A("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          ar(A("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => s.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [lr, s.value]
          ])
        ]),
        A("div", null, [
          b[4] || (b[4] = A("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          ar(A("input", {
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
        A("div", null, [
          b[5] || (b[5] = A("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Confirmar contraseña", -1)),
          ar(A("input", {
            "onUpdate:modelValue": b[2] || (b[2] = (h) => l.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [lr, l.value]
          ])
        ]),
        u.value ? (R(), F("p", pu, X(u.value), 1)) : se("", !0),
        A("button", {
          type: "submit",
          disabled: o.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, X(o.value ? "Creando cuenta..." : "Registrarme"), 9, mu)
      ], 32),
      A("p", gu, [
        b[7] || (b[7] = Qe(" ¿Ya tienes cuenta? ", -1)),
        dt(Fe(Vt), {
          to: Fe(r),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Ut(() => [...b[6] || (b[6] = [
            Qe("Iniciar sesión", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), El = "cmsSchemas", Nl = "schema", Tl = "main", yu = 3e4;
let Wr = null, pi = 0, er = null;
async function Di() {
  const n = Date.now();
  if (Wr && n - pi < yu)
    return Wr;
  if (er)
    return er;
  const { firestore: e } = Ce();
  er = (async () => {
    const r = (await Dn(un(e, El))).docs.map((s) => {
      const i = s.data();
      return Sl({ ...i, id: s.id });
    }).sort((s, i) => s.title.localeCompare(i.title, "es"));
    return Wr = r, pi = Date.now(), r;
  })();
  try {
    return await er;
  } finally {
    er = null;
  }
}
async function vu(n) {
  const { firestore: e } = Ce(), t = Sl(n), r = Zt(e, El, t.id);
  await Yr(
    r,
    {
      ...t,
      updatedAt: Xe(),
      createdAt: Xe()
    },
    { merge: !0 }
  ), xu();
}
function xu() {
  Wr = null, pi = 0;
}
function Sl(n) {
  const e = n;
  let t = [];
  const r = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((u) => Xr(u)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([u, d]) => Xr({ key: u, ...d })
  ));
  const s = typeof e.dictionaryDocumentId == "string" ? e.dictionaryDocumentId : "", i = typeof e.dictionaryRootKey == "string" ? e.dictionaryRootKey : "", l = r === "dictionary" ? Eu(s || Tl) : "", o = r === "dictionary" ? Nu(i || Nl) : "";
  return {
    id: wu(String(e.id ?? "tipo-contenido")),
    title: String(e.title ?? "Tipo de contenido"),
    description: typeof e.description == "string" ? e.description : "",
    storageType: r,
    collectionName: Au(String(e.collectionName ?? "registros")),
    dictionaryDocumentId: l,
    dictionaryRootKey: o,
    slugFromField: typeof e.slugFromField == "string" ? e.slugFromField : "",
    previewField: typeof e.previewField == "string" ? e.previewField : "",
    fields: t
  };
}
function Xr(n) {
  const e = kl(n.type), t = {
    key: Bi(String(n.key ?? "campo")),
    label: String(n.label ?? "Campo"),
    type: e,
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: Ll(n.options),
    documentSchemaId: e === "document" ? ql(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Il(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Cl(
    _l(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Xr(r)) : [] : delete t.mapFields, t;
}
function Cl(n) {
  const e = kl(n.type), t = {
    type: e,
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: Ll(n.options),
    documentSchemaId: e === "document" ? ql(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Il(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Cl(
    _l(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Xr(r)) : [] : delete t.mapFields, t;
}
function kl(n) {
  return n === "date" || n === "numeric" || n === "id" || n === "textarea" || n === "richtext" || n === "image" || n === "select" || n === "document" || n === "boolean" || n === "array" || n === "map" ? n : "text";
}
function Ll(n) {
  return Array.isArray(n) ? n.map((e) => String(e).trim()).filter(Boolean) : [];
}
function _l(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function Bi(n) {
  return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function wu(n) {
  return n.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function Au(n) {
  return Bi(n);
}
function Eu(n) {
  return String(n).trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || Tl;
}
function Nu(n) {
  return String(n).trim().replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "") || Nl;
}
function ql(n) {
  return String(n).trim().replace(/[^a-zA-Z0-9_-]/g, "").replace(/-+/g, "-");
}
function Il(n) {
  const e = String(n ?? "").trim();
  return e ? Bi(e) : "";
}
const Tu = { class: "cms-root-fixed-height overflow-hidden bg-slate-100" }, Su = { class: "cms-sidebar-header mb-3 flex items-center justify-between lg:mb-0" }, Cu = { class: "text-sm font-black uppercase tracking-wide text-slate-700" }, ku = { class: "cms-sidebar-scroll space-y-2" }, Lu = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, _u = { class: "flex items-start justify-between gap-2" }, qu = { class: "material-symbols-outlined text-base leading-none" }, Iu = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Ou = { class: "font-semibold" }, Ru = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, $u = {
  key: 1,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Du = {
  key: 0,
  class: "space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3"
}, Bu = { class: "font-semibold" }, Fu = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Mu = { class: "flex items-start justify-between gap-2" }, Pu = { class: "material-symbols-outlined text-base leading-none" }, ju = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Uu = { class: "font-semibold" }, Vu = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, zu = { class: "cms-sidebar-footer" }, Hu = { class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2" }, Ku = {
  type: "button",
  class: "min-w-0 flex-1 rounded-md bg-white px-3 py-2 text-left text-xs text-slate-700"
}, Gu = { class: "truncate text-slate-600" }, Wu = { class: "mx-auto w-full max-w-7xl space-y-6" }, Zu = { class: "text-xl font-black text-slate-900" }, Yu = { class: "mt-3" }, Xu = /* @__PURE__ */ Te({
  __name: "AdminLayoutPage",
  setup(n) {
    const e = is(), t = yr(), { basePath: r, loginPath: s, homePath: i } = $i(), l = J([]), o = J(!1), u = J(!0), d = J(!0), p = J(!0);
    br(async () => {
      await b(), typeof window < "u" && window.innerWidth < 1024 && (p.value = !1), window.addEventListener("cms-schemas-updated", I);
    }), bl(() => {
      window.removeEventListener("cms-schemas-updated", I);
    }), on(
      () => e.fullPath,
      () => {
        e.path.startsWith(`${r}/content`) && (u.value = !0, b()), e.path.startsWith(`${r}/schemas`) && (d.value = !0, b()), typeof window < "u" && window.innerWidth < 1024 && (p.value = !1);
      }
    );
    async function b() {
      o.value = !0;
      try {
        l.value = await Di();
      } finally {
        o.value = !1;
      }
    }
    const h = Ie(() => e.path.startsWith(`${r}/content`)), g = Ie(() => e.path.startsWith(`${r}/schemas`)), S = Ie(() => l.value.filter((m) => m.storageType === "document")), k = Ie(() => l.value.filter((m) => m.storageType === "dictionary"));
    function _(m) {
      return e.path.startsWith(m);
    }
    function I() {
      b();
    }
    function P(m) {
      return {
        path: `${r}/content`,
        query: { schema: m }
      };
    }
    function U(m) {
      return {
        path: `${r}/schemas`,
        query: { schema: m }
      };
    }
    function W(m) {
      if (!h.value)
        return !1;
      const N = typeof e.query.schema == "string" ? e.query.schema : "";
      return N ? N === m : l.value[0]?.id === m;
    }
    function H(m) {
      if (!g.value)
        return !1;
      const N = typeof e.query.schema == "string" ? e.query.schema : "";
      return N ? N === m : l.value[0]?.id === m;
    }
    function ie() {
      u.value = !u.value;
    }
    function re() {
      d.value = !d.value;
    }
    function ge() {
      p.value = !p.value;
    }
    function Ae() {
      p.value = !1;
    }
    function we(m) {
      return /^(https?:)?\/\//i.test(m);
    }
    async function y() {
      if (i) {
        if (we(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await t.push(i);
      }
    }
    async function B() {
      await au(), await t.push(s);
    }
    const C = Ie(() => cr.value?.email || "Sin correo"), L = Ie(() => {
      try {
        const m = Ce().auth.app.options.projectId;
        if (typeof m == "string" && m.trim().length > 0)
          return m;
      } catch {
      }
      return "Panel";
    }), f = Ie(() => {
      if (e.path.startsWith(`${r}/content`)) {
        const m = typeof e.query.schema == "string" ? e.query.schema : "", N = l.value.find((T) => T.id === m) ?? l.value[0] ?? null;
        return N ? `Contenido · ${N.title}` : "Contenido";
      }
      return e.path.startsWith(`${r}/schemas`) ? "Esquemas" : e.path.startsWith(`${r}/users`) ? "Usuarios" : "Dashboard";
    });
    return (m, N) => (R(), F("main", Tu, [
      p.value ? se("", !0) : (R(), F("button", {
        key: 0,
        type: "button",
        "aria-label": "Abrir sidebar",
        class: "fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg border border-l-0 border-slate-300 bg-white px-2 py-3 text-slate-700 shadow-lg hover:bg-slate-50",
        onClick: ge
      }, [...N[0] || (N[0] = [
        A("span", { class: "material-symbols-outlined text-lg" }, "left_panel_open", -1)
      ])])),
      p.value ? (R(), F("div", {
        key: 1,
        class: "fixed inset-0 z-30 bg-slate-900/20 lg:hidden",
        onClick: Ae
      })) : se("", !0),
      A("aside", {
        class: lt(["cms-sidebar-panel cms-sidebar-fixed-height fixed inset-y-0 left-0 z-40 w-80 border-r border-slate-200 bg-white shadow-xl transition-transform duration-200", p.value ? "cms-sidebar-open" : "cms-sidebar-closed"])
      }, [
        A("div", Su, [
          A("h2", Cu, X(L.value), 1),
          A("div", { class: "flex items-center gap-2" }, [
            A("button", {
              type: "button",
              "aria-label": "Ir a inicio",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: y
            }, [...N[1] || (N[1] = [
              A("span", { class: "material-symbols-outlined text-lg" }, "home", -1)
            ])]),
            A("button", {
              type: "button",
              "aria-label": "Cerrar sidebar",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: Ae
            }, [...N[2] || (N[2] = [
              A("span", { class: "material-symbols-outlined text-lg" }, "left_panel_close", -1)
            ])])
          ])
        ]),
        A("div", ku, [
          A("div", Lu, [
            A("div", _u, [
              dt(Fe(Vt), {
                to: `${Fe(r)}/content`,
                class: "min-w-0 flex-1"
              }, {
                default: Ut(() => [...N[3] || (N[3] = [
                  A("p", { class: "text-sm font-black" }, "Contenido", -1),
                  A("p", { class: "text-xs text-slate-500" }, " Formularios y registros ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              A("button", {
                type: "button",
                "aria-label": "Expandir o contraer contenido",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: ie
              }, [
                A("span", qu, X(u.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            u.value ? (R(), F("div", Iu, [
              (R(!0), F(Pe, null, je(k.value, (T) => (R(), qe(Fe(Vt), {
                key: T.id,
                to: P(T.id),
                class: lt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  W(T.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Ut(() => [
                  A("p", Ou, X(T.title), 1),
                  A("p", {
                    class: lt(W(T.id) ? "text-slate-300" : "text-slate-500")
                  }, X(T.storageType) + " · " + X(T.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              o.value ? (R(), F("p", Ru, " Cargando elementos... ")) : k.value.length ? se("", !0) : (R(), F("p", $u, " No hay diccionarios configurados. "))
            ])) : se("", !0)
          ]),
          S.value.length ? (R(), F("div", Du, [
            N[4] || (N[4] = A("p", { class: "px-1 text-[11px] font-black uppercase tracking-wide text-slate-500" }, "Documentos", -1)),
            (R(!0), F(Pe, null, je(S.value, (T) => (R(), qe(Fe(Vt), {
              key: `document-link-${T.id}`,
              to: P(T.id),
              class: lt([
                "block rounded-lg border px-2 py-1.5 text-xs transition",
                W(T.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              ])
            }, {
              default: Ut(() => [
                A("p", Bu, X(T.title), 1),
                A("p", {
                  class: lt(W(T.id) ? "text-slate-300" : "text-slate-500")
                }, " document · " + X(T.collectionName), 3)
              ]),
              _: 2
            }, 1032, ["to", "class"]))), 128))
          ])) : se("", !0),
          A("div", Fu, [
            A("div", Mu, [
              dt(Fe(Vt), {
                to: `${Fe(r)}/schemas`,
                class: "min-w-0 flex-1"
              }, {
                default: Ut(() => [...N[5] || (N[5] = [
                  A("p", { class: "text-sm font-black" }, "Esquemas", -1),
                  A("p", { class: "text-xs text-slate-500" }, " Edición de esquemas ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              A("button", {
                type: "button",
                "aria-label": "Expandir o contraer esquemas",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: re
              }, [
                A("span", Pu, X(d.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            d.value ? (R(), F("div", ju, [
              (R(!0), F(Pe, null, je(l.value, (T) => (R(), qe(Fe(Vt), {
                key: `schema-edit-${T.id}`,
                to: U(T.id),
                class: lt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  H(T.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Ut(() => [
                  A("p", Uu, X(T.title), 1),
                  A("p", {
                    class: lt(H(T.id) ? "text-slate-300" : "text-slate-500")
                  }, X(T.storageType) + " · " + X(T.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              o.value ? (R(), F("p", Vu, " Cargando elementos... ")) : se("", !0)
            ])) : se("", !0)
          ]),
          dt(Fe(Vt), {
            to: `${Fe(r)}/users`,
            class: lt([
              "block rounded-xl border p-3 transition",
              _(`${Fe(r)}/users`) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            ])
          }, {
            default: Ut(() => [
              N[6] || (N[6] = A("p", { class: "text-sm font-black" }, "Usuarios", -1)),
              A("p", {
                class: lt(["text-xs", _(`${Fe(r)}/users`) ? "text-slate-200" : "text-slate-500"])
              }, " Roles y último ingreso ", 2)
            ]),
            _: 1
          }, 8, ["to", "class"])
        ]),
        A("div", zu, [
          A("div", Hu, [
            A("button", Ku, [
              N[7] || (N[7] = A("p", { class: "font-semibold text-slate-900" }, "Cuenta actual", -1)),
              A("p", Gu, X(C.value), 1)
            ]),
            A("button", {
              type: "button",
              "aria-label": "Cerrar sesión",
              class: "rounded-md border border-slate-300 bg-white px-2 py-2 text-slate-700 hover:bg-slate-100",
              onClick: B
            }, [...N[8] || (N[8] = [
              A("span", { class: "material-symbols-outlined text-lg" }, "logout", -1)
            ])])
          ])
        ])
      ], 2),
      A("section", {
        class: lt(["cms-content-fixed-height min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8", p.value ? "cms-content-with-open-sidebar" : ""])
      }, [
        A("div", Wu, [
          N[9] || (N[9] = A("section", null, [
            A("h1", { class: "text-3xl font-black text-slate-900" }, "Dashboard"),
            A("p", { class: "mt-2 text-sm text-slate-600" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          A("section", null, [
            A("h2", Zu, X(f.value), 1),
            A("div", Yu, [
              dt(Fe(Ko))
            ])
          ])
        ])
      ], 2)
    ]));
  }
}), Qu = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, s] of e)
    t[r] = s;
  return t;
}, Ju = /* @__PURE__ */ Qu(Xu, [["__scopeId", "data-v-ef22c520"]]), ec = { class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700" }, tc = ["checked", "disabled"], nc = /* @__PURE__ */ Te({
  name: "BooleanFieldInput",
  __name: "BooleanFieldInput",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (R(), F("label", ec, [
      A("input", {
        checked: n.modelValue,
        type: "checkbox",
        disabled: n.disabled,
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.checked))
      }, null, 40, tc),
      s[1] || (s[1] = Qe(" Activo ", -1))
    ]));
  }
}), rc = { class: "space-y-2" }, sc = {
  key: 0,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, ic = { class: "block text-xs font-semibold uppercase tracking-wide text-slate-500" }, ac = {
  key: 0,
  class: "text-xs text-slate-500"
}, lc = {
  key: 0,
  class: "space-y-2"
}, oc = ["value", "disabled", "onChange"], uc = ["value", "disabled", "onInput"], cc = ["disabled", "onClick"], dc = ["disabled"], hc = {
  key: 1,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, fc = { class: "flex items-center justify-between" }, pc = { class: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, mc = ["disabled", "onClick"], gc = ["disabled"], bc = {
  key: 2,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, yc = ["checked", "disabled"], vc = ["value", "placeholder", "disabled"], xc = ["value", "disabled"], wc = ["value"], Ac = ["value", "placeholder", "disabled"], Ec = ["value", "step", "placeholder", "disabled"], Nc = ["value", "placeholder", "disabled"], Tc = /* @__PURE__ */ Te({
  name: "CmsNestedValueEditor",
  __name: "CmsNestedValueEditor",
  props: {
    schema: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = Ie(
      () => Array.isArray(t.schema.mapFields) ? t.schema.mapFields : []
    ), i = Ie(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), l = Ie(() => d(t.modelValue)), o = Ie(() => Array.isArray(t.modelValue) ? t.modelValue : []), u = Ie(() => Object.entries(l.value));
    function d(L) {
      return L && typeof L == "object" && !Array.isArray(L) ? L : {};
    }
    function p(L) {
      return L.type === "array" ? [] : L.type === "map" ? {} : L.type === "boolean" ? !1 : L.type === "date" ? "" : L.type === "numeric" || L.type === "id" ? null : "";
    }
    function b(L, f) {
      r("update:modelValue", {
        ...l.value,
        [L]: f
      });
    }
    function h() {
      r("update:modelValue", [...o.value, p(i.value)]);
    }
    function g(L) {
      const f = [...o.value];
      f.splice(L, 1), r("update:modelValue", f);
    }
    function S(L, f) {
      const m = [...o.value];
      m[L] = f, r("update:modelValue", m);
    }
    function k(L) {
      r("update:modelValue", L);
    }
    function _(L) {
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
        const m = Number(f);
        if (Number.isFinite(m))
          return String(m);
      }
      return "";
    }
    function U(L) {
      r("update:modelValue", y(L));
    }
    function W(L) {
      return y(L);
    }
    function H() {
      const L = l.value;
      let f = 1, m = `campo_${f}`;
      for (; m in L; )
        f += 1, m = `campo_${f}`;
      r("update:modelValue", {
        ...L,
        [m]: ""
      });
    }
    function ie(L) {
      const f = { ...l.value };
      delete f[L], r("update:modelValue", f);
    }
    function re(L, f) {
      const m = f.trim();
      if (!m || m === L)
        return;
      const N = { ...l.value }, T = N[L];
      delete N[L], N[m] = T, r("update:modelValue", N);
    }
    function ge(L, f) {
      const m = { ...l.value };
      m[L] = we(f), r("update:modelValue", m);
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
    function y(L) {
      if (typeof L == "string") {
        const f = L.trim();
        if (!f)
          return "";
        const m = B(f);
        if (m)
          return C(m);
        const N = new Date(f);
        return Number.isNaN(N.getTime()) ? "" : C(N);
      }
      if (L instanceof Date && !Number.isNaN(L.getTime()))
        return C(L);
      if (L && typeof L == "object" && "toDate" in L && typeof L.toDate == "function") {
        const f = L.toDate();
        if (f instanceof Date && !Number.isNaN(f.getTime()))
          return C(f);
      }
      return "";
    }
    function B(L) {
      const f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(L);
      if (!f)
        return null;
      const m = Number(f[1]), N = Number(f[2]), T = Number(f[3]), E = new Date(Date.UTC(m, N - 1, T));
      return E.getUTCFullYear() !== m || E.getUTCMonth() + 1 !== N || E.getUTCDate() !== T ? null : E;
    }
    function C(L) {
      const f = String(L.getUTCFullYear()).padStart(4, "0"), m = String(L.getUTCMonth() + 1).padStart(2, "0"), N = String(L.getUTCDate()).padStart(2, "0");
      return `${f}-${m}-${N}`;
    }
    return (L, f) => {
      const m = yl("CmsNestedValueEditor", !0);
      return R(), F("div", rc, [
        n.schema.type === "map" ? (R(), F("section", sc, [
          (R(!0), F(Pe, null, je(s.value, (N) => (R(), F("article", {
            key: N.key,
            class: "space-y-1 rounded-md border border-slate-200 bg-white p-3"
          }, [
            A("label", ic, X(N.label), 1),
            N.helpText ? (R(), F("p", ac, X(N.helpText), 1)) : se("", !0),
            dt(m, {
              schema: N,
              "model-value": l.value[N.key],
              disabled: n.disabled,
              "onUpdate:modelValue": (T) => b(N.key, T)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          s.value.length ? se("", !0) : (R(), F("div", lc, [
            (R(!0), F(Pe, null, je(u.value, ([N, T]) => (R(), F("article", {
              key: N,
              class: "grid gap-2 rounded-md border border-slate-200 bg-white p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              A("input", {
                value: N,
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onChange: (E) => re(N, E.target.value)
              }, null, 40, oc),
              A("input", {
                value: Ae(T),
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onInput: (E) => ge(N, E.target.value)
              }, null, 40, uc),
              A("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (E) => ie(N)
              }, " Quitar ", 8, cc)
            ]))), 128)),
            A("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
              disabled: n.disabled,
              onClick: H
            }, " Agregar propiedad ", 8, dc),
            f[6] || (f[6] = A("p", { class: "text-xs text-slate-500" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : n.schema.type === "array" ? (R(), F("section", hc, [
          (R(!0), F(Pe, null, je(o.value, (N, T) => (R(), F("article", {
            key: T,
            class: "space-y-2 rounded-md border border-slate-200 bg-white p-3"
          }, [
            A("div", fc, [
              A("p", pc, "Item " + X(T + 1), 1),
              A("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (E) => g(T)
              }, " Quitar ", 8, mc)
            ]),
            dt(m, {
              schema: i.value,
              "model-value": N,
              disabled: n.disabled,
              "onUpdate:modelValue": (E) => S(T, E)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          A("button", {
            type: "button",
            class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
            disabled: n.disabled,
            onClick: h
          }, " Agregar item ", 8, gc)
        ])) : n.schema.type === "boolean" ? (R(), F("label", bc, [
          A("input", {
            type: "checkbox",
            checked: !!n.modelValue,
            disabled: n.disabled,
            onChange: f[0] || (f[0] = (N) => _(N.target.checked))
          }, null, 40, yc),
          f[7] || (f[7] = Qe(" Activo ", -1))
        ])) : n.schema.type === "textarea" || n.schema.type === "richtext" ? (R(), F("textarea", {
          key: 3,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          rows: "4",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[1] || (f[1] = (N) => k(N.target.value))
        }, null, 40, vc)) : n.schema.type === "select" ? (R(), F("select", {
          key: 4,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onChange: f[2] || (f[2] = (N) => k(N.target.value))
        }, [
          f[8] || (f[8] = A("option", { value: "" }, "Selecciona una opción", -1)),
          (R(!0), F(Pe, null, je(n.schema.options || [], (N) => (R(), F("option", {
            key: N,
            value: N
          }, X(N), 9, wc))), 128))
        ], 40, xc)) : n.schema.type === "date" ? (R(), F("input", {
          key: 5,
          value: W(n.modelValue),
          type: "date",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[3] || (f[3] = (N) => U(N.target.value))
        }, null, 40, Ac)) : n.schema.type === "numeric" || n.schema.type === "id" ? (R(), F("input", {
          key: 6,
          value: P(n.modelValue),
          type: "number",
          step: n.schema.type === "id" ? "1" : "any",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[4] || (f[4] = (N) => I(N.target.value))
        }, null, 40, Ec)) : (R(), F("input", {
          key: 7,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          type: "text",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[5] || (f[5] = (N) => k(N.target.value))
        }, null, 40, Nc))
      ]);
    };
  }
}), Sc = /* @__PURE__ */ Te({
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
    return (r, s) => (R(), qe(Tc, {
      schema: n.field,
      "model-value": n.modelValue,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["schema", "model-value", "disabled"]));
  }
}), Cc = ["value", "placeholder", "disabled"], kc = /* @__PURE__ */ Te({
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
    return (r, s) => (R(), F("input", {
      value: n.modelValue,
      type: "date",
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, Cc));
  }
}), Lc = { class: "space-y-2" }, _c = ["value", "disabled"], qc = ["value"], Ic = {
  key: 0,
  class: "text-xs text-slate-500"
}, Oc = /* @__PURE__ */ Te({
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
    return (r, s) => (R(), F("div", Lc, [
      A("select", {
        value: n.modelValue,
        disabled: n.disabled,
        class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
      }, [
        s[1] || (s[1] = A("option", { value: "" }, "Selecciona un documento", -1)),
        (R(!0), F(Pe, null, je(n.options, (i) => (R(), F("option", {
          key: i.id,
          value: i.id
        }, X(i.label), 9, qc))), 128))
      ], 40, _c),
      n.hint ? (R(), F("p", Ic, X(n.hint), 1)) : se("", !0)
    ]));
  }
}), Rc = { class: "space-y-2" }, $c = ["disabled"], Dc = {
  key: 0,
  class: "text-xs text-slate-500 break-all"
}, Bc = ["src"], Fc = ["disabled"], Mc = /* @__PURE__ */ Te({
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
    return (s, i) => (R(), F("div", Rc, [
      A("input", {
        type: "file",
        accept: "image/*",
        disabled: n.disabled,
        class: "block w-full text-sm text-slate-600 disabled:opacity-60",
        onChange: r
      }, null, 40, $c),
      n.modelValue ? (R(), F("p", Dc, " URL actual: " + X(n.modelValue), 1)) : se("", !0),
      n.modelValue ? (R(), F("img", {
        key: 1,
        src: n.modelValue,
        alt: "Vista previa",
        class: "max-h-32 rounded-md border border-slate-200 object-cover"
      }, null, 8, Bc)) : se("", !0),
      n.modelValue ? (R(), F("button", {
        key: 2,
        type: "button",
        class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50",
        disabled: n.disabled,
        onClick: i[0] || (i[0] = (l) => t("remove"))
      }, " Quitar URL ", 8, Fc)) : se("", !0)
    ]));
  }
}), Pc = ["value", "step", "min", "placeholder", "disabled"], jc = /* @__PURE__ */ Te({
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
    return (r, s) => (R(), F("input", {
      value: n.modelValue,
      type: "number",
      step: n.step,
      min: n.min ?? void 0,
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, Pc));
  }
});
var Ol = typeof global == "object" && global && global.Object === Object && global, Uc = typeof self == "object" && self && self.Object === Object && self, wt = Ol || Uc || Function("return this")(), Wt = wt.Symbol, Rl = Object.prototype, Vc = Rl.hasOwnProperty, zc = Rl.toString, tr = Wt ? Wt.toStringTag : void 0;
function Hc(n) {
  var e = Vc.call(n, tr), t = n[tr];
  try {
    n[tr] = void 0;
    var r = !0;
  } catch {
  }
  var s = zc.call(n);
  return r && (e ? n[tr] = t : delete n[tr]), s;
}
var Kc = Object.prototype, Gc = Kc.toString;
function Wc(n) {
  return Gc.call(n);
}
var Zc = "[object Null]", Yc = "[object Undefined]", aa = Wt ? Wt.toStringTag : void 0;
function Mn(n) {
  return n == null ? n === void 0 ? Yc : Zc : aa && aa in Object(n) ? Hc(n) : Wc(n);
}
function qt(n) {
  return n != null && typeof n == "object";
}
var cn = Array.isArray;
function Yt(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
function $l(n) {
  return n;
}
var Xc = "[object AsyncFunction]", Qc = "[object Function]", Jc = "[object GeneratorFunction]", ed = "[object Proxy]";
function Fi(n) {
  if (!Yt(n))
    return !1;
  var e = Mn(n);
  return e == Qc || e == Jc || e == Xc || e == ed;
}
var Qs = wt["__core-js_shared__"], la = (function() {
  var n = /[^.]+$/.exec(Qs && Qs.keys && Qs.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function td(n) {
  return !!la && la in n;
}
var nd = Function.prototype, rd = nd.toString;
function pn(n) {
  if (n != null) {
    try {
      return rd.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var sd = /[\\^$.*+?()[\]{}|]/g, id = /^\[object .+?Constructor\]$/, ad = Function.prototype, ld = Object.prototype, od = ad.toString, ud = ld.hasOwnProperty, cd = RegExp(
  "^" + od.call(ud).replace(sd, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function dd(n) {
  if (!Yt(n) || td(n))
    return !1;
  var e = Fi(n) ? cd : id;
  return e.test(pn(n));
}
function hd(n, e) {
  return n?.[e];
}
function mn(n, e) {
  var t = hd(n, e);
  return dd(t) ? t : void 0;
}
var mi = mn(wt, "WeakMap"), oa = Object.create, fd = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(e) {
    if (!Yt(e))
      return {};
    if (oa)
      return oa(e);
    n.prototype = e;
    var t = new n();
    return n.prototype = void 0, t;
  };
})();
function pd(n, e, t) {
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
function md(n, e) {
  var t = -1, r = n.length;
  for (e || (e = Array(r)); ++t < r; )
    e[t] = n[t];
  return e;
}
var gd = 800, bd = 16, yd = Date.now;
function vd(n) {
  var e = 0, t = 0;
  return function() {
    var r = yd(), s = bd - (r - t);
    if (t = r, s > 0) {
      if (++e >= gd)
        return arguments[0];
    } else
      e = 0;
    return n.apply(void 0, arguments);
  };
}
function xd(n) {
  return function() {
    return n;
  };
}
var Qr = (function() {
  try {
    var n = mn(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
})(), wd = Qr ? function(n, e) {
  return Qr(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: xd(e),
    writable: !0
  });
} : $l, Ad = vd(wd);
function Ed(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r && e(n[t], t, n) !== !1; )
    ;
  return n;
}
var Nd = 9007199254740991, Td = /^(?:0|[1-9]\d*)$/;
function Dl(n, e) {
  var t = typeof n;
  return e = e ?? Nd, !!e && (t == "number" || t != "symbol" && Td.test(n)) && n > -1 && n % 1 == 0 && n < e;
}
function Mi(n, e, t) {
  e == "__proto__" && Qr ? Qr(n, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : n[e] = t;
}
function vr(n, e) {
  return n === e || n !== n && e !== e;
}
var Sd = Object.prototype, Cd = Sd.hasOwnProperty;
function Bl(n, e, t) {
  var r = n[e];
  (!(Cd.call(n, e) && vr(r, t)) || t === void 0 && !(e in n)) && Mi(n, e, t);
}
function kd(n, e, t, r) {
  var s = !t;
  t || (t = {});
  for (var i = -1, l = e.length; ++i < l; ) {
    var o = e[i], u = void 0;
    u === void 0 && (u = n[o]), s ? Mi(t, o, u) : Bl(t, o, u);
  }
  return t;
}
var ua = Math.max;
function Ld(n, e, t) {
  return e = ua(e === void 0 ? n.length - 1 : e, 0), function() {
    for (var r = arguments, s = -1, i = ua(r.length - e, 0), l = Array(i); ++s < i; )
      l[s] = r[e + s];
    s = -1;
    for (var o = Array(e + 1); ++s < e; )
      o[s] = r[s];
    return o[e] = t(l), pd(n, this, o);
  };
}
function _d(n, e) {
  return Ad(Ld(n, e, $l), n + "");
}
var qd = 9007199254740991;
function Fl(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= qd;
}
function ls(n) {
  return n != null && Fl(n.length) && !Fi(n);
}
function Id(n, e, t) {
  if (!Yt(t))
    return !1;
  var r = typeof e;
  return (r == "number" ? ls(t) && Dl(e, t.length) : r == "string" && e in t) ? vr(t[e], n) : !1;
}
function Od(n) {
  return _d(function(e, t) {
    var r = -1, s = t.length, i = s > 1 ? t[s - 1] : void 0, l = s > 2 ? t[2] : void 0;
    for (i = n.length > 3 && typeof i == "function" ? (s--, i) : void 0, l && Id(t[0], t[1], l) && (i = s < 3 ? void 0 : i, s = 1), e = Object(e); ++r < s; ) {
      var o = t[r];
      o && n(e, o, r, i);
    }
    return e;
  });
}
var Rd = Object.prototype;
function Pi(n) {
  var e = n && n.constructor, t = typeof e == "function" && e.prototype || Rd;
  return n === t;
}
function $d(n, e) {
  for (var t = -1, r = Array(n); ++t < n; )
    r[t] = e(t);
  return r;
}
var Dd = "[object Arguments]";
function ca(n) {
  return qt(n) && Mn(n) == Dd;
}
var Ml = Object.prototype, Bd = Ml.hasOwnProperty, Fd = Ml.propertyIsEnumerable, gi = ca(/* @__PURE__ */ (function() {
  return arguments;
})()) ? ca : function(n) {
  return qt(n) && Bd.call(n, "callee") && !Fd.call(n, "callee");
};
function Md() {
  return !1;
}
var Pl = typeof exports == "object" && exports && !exports.nodeType && exports, da = Pl && typeof module == "object" && module && !module.nodeType && module, Pd = da && da.exports === Pl, ha = Pd ? wt.Buffer : void 0, jd = ha ? ha.isBuffer : void 0, dr = jd || Md, Ud = "[object Arguments]", Vd = "[object Array]", zd = "[object Boolean]", Hd = "[object Date]", Kd = "[object Error]", Gd = "[object Function]", Wd = "[object Map]", Zd = "[object Number]", Yd = "[object Object]", Xd = "[object RegExp]", Qd = "[object Set]", Jd = "[object String]", eh = "[object WeakMap]", th = "[object ArrayBuffer]", nh = "[object DataView]", rh = "[object Float32Array]", sh = "[object Float64Array]", ih = "[object Int8Array]", ah = "[object Int16Array]", lh = "[object Int32Array]", oh = "[object Uint8Array]", uh = "[object Uint8ClampedArray]", ch = "[object Uint16Array]", dh = "[object Uint32Array]", xe = {};
xe[rh] = xe[sh] = xe[ih] = xe[ah] = xe[lh] = xe[oh] = xe[uh] = xe[ch] = xe[dh] = !0;
xe[Ud] = xe[Vd] = xe[th] = xe[zd] = xe[nh] = xe[Hd] = xe[Kd] = xe[Gd] = xe[Wd] = xe[Zd] = xe[Yd] = xe[Xd] = xe[Qd] = xe[Jd] = xe[eh] = !1;
function hh(n) {
  return qt(n) && Fl(n.length) && !!xe[Mn(n)];
}
function ji(n) {
  return function(e) {
    return n(e);
  };
}
var jl = typeof exports == "object" && exports && !exports.nodeType && exports, or = jl && typeof module == "object" && module && !module.nodeType && module, fh = or && or.exports === jl, Js = fh && Ol.process, Bn = (function() {
  try {
    var n = or && or.require && or.require("util").types;
    return n || Js && Js.binding && Js.binding("util");
  } catch {
  }
})(), fa = Bn && Bn.isTypedArray, Ui = fa ? ji(fa) : hh, ph = Object.prototype, mh = ph.hasOwnProperty;
function Ul(n, e) {
  var t = cn(n), r = !t && gi(n), s = !t && !r && dr(n), i = !t && !r && !s && Ui(n), l = t || r || s || i, o = l ? $d(n.length, String) : [], u = o.length;
  for (var d in n)
    (e || mh.call(n, d)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Dl(d, u))) && o.push(d);
  return o;
}
function Vl(n, e) {
  return function(t) {
    return n(e(t));
  };
}
var gh = Vl(Object.keys, Object), bh = Object.prototype, yh = bh.hasOwnProperty;
function vh(n) {
  if (!Pi(n))
    return gh(n);
  var e = [];
  for (var t in Object(n))
    yh.call(n, t) && t != "constructor" && e.push(t);
  return e;
}
function xh(n) {
  return ls(n) ? Ul(n) : vh(n);
}
function wh(n) {
  var e = [];
  if (n != null)
    for (var t in Object(n))
      e.push(t);
  return e;
}
var Ah = Object.prototype, Eh = Ah.hasOwnProperty;
function Nh(n) {
  if (!Yt(n))
    return wh(n);
  var e = Pi(n), t = [];
  for (var r in n)
    r == "constructor" && (e || !Eh.call(n, r)) || t.push(r);
  return t;
}
function zl(n) {
  return ls(n) ? Ul(n, !0) : Nh(n);
}
var hr = mn(Object, "create");
function Th() {
  this.__data__ = hr ? hr(null) : {}, this.size = 0;
}
function Sh(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var Ch = "__lodash_hash_undefined__", kh = Object.prototype, Lh = kh.hasOwnProperty;
function _h(n) {
  var e = this.__data__;
  if (hr) {
    var t = e[n];
    return t === Ch ? void 0 : t;
  }
  return Lh.call(e, n) ? e[n] : void 0;
}
var qh = Object.prototype, Ih = qh.hasOwnProperty;
function Oh(n) {
  var e = this.__data__;
  return hr ? e[n] !== void 0 : Ih.call(e, n);
}
var Rh = "__lodash_hash_undefined__";
function $h(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = hr && e === void 0 ? Rh : e, this;
}
function dn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
dn.prototype.clear = Th;
dn.prototype.delete = Sh;
dn.prototype.get = _h;
dn.prototype.has = Oh;
dn.prototype.set = $h;
function Dh() {
  this.__data__ = [], this.size = 0;
}
function os(n, e) {
  for (var t = n.length; t--; )
    if (vr(n[t][0], e))
      return t;
  return -1;
}
var Bh = Array.prototype, Fh = Bh.splice;
function Mh(n) {
  var e = this.__data__, t = os(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : Fh.call(e, t, 1), --this.size, !0;
}
function Ph(n) {
  var e = this.__data__, t = os(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function jh(n) {
  return os(this.__data__, n) > -1;
}
function Uh(n, e) {
  var t = this.__data__, r = os(t, n);
  return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
}
function Ot(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
Ot.prototype.clear = Dh;
Ot.prototype.delete = Mh;
Ot.prototype.get = Ph;
Ot.prototype.has = jh;
Ot.prototype.set = Uh;
var fr = mn(wt, "Map");
function Vh() {
  this.size = 0, this.__data__ = {
    hash: new dn(),
    map: new (fr || Ot)(),
    string: new dn()
  };
}
function zh(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function us(n, e) {
  var t = n.__data__;
  return zh(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Hh(n) {
  var e = us(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function Kh(n) {
  return us(this, n).get(n);
}
function Gh(n) {
  return us(this, n).has(n);
}
function Wh(n, e) {
  var t = us(this, n), r = t.size;
  return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
}
function gn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
gn.prototype.clear = Vh;
gn.prototype.delete = Hh;
gn.prototype.get = Kh;
gn.prototype.has = Gh;
gn.prototype.set = Wh;
function Zh(n, e) {
  for (var t = -1, r = e.length, s = n.length; ++t < r; )
    n[s + t] = e[t];
  return n;
}
var Hl = Vl(Object.getPrototypeOf, Object), Yh = "[object Object]", Xh = Function.prototype, Qh = Object.prototype, Kl = Xh.toString, Jh = Qh.hasOwnProperty, ef = Kl.call(Object);
function tf(n) {
  if (!qt(n) || Mn(n) != Yh)
    return !1;
  var e = Hl(n);
  if (e === null)
    return !0;
  var t = Jh.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Kl.call(t) == ef;
}
function nf() {
  this.__data__ = new Ot(), this.size = 0;
}
function rf(n) {
  var e = this.__data__, t = e.delete(n);
  return this.size = e.size, t;
}
function sf(n) {
  return this.__data__.get(n);
}
function af(n) {
  return this.__data__.has(n);
}
var lf = 200;
function of(n, e) {
  var t = this.__data__;
  if (t instanceof Ot) {
    var r = t.__data__;
    if (!fr || r.length < lf - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new gn(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function vt(n) {
  var e = this.__data__ = new Ot(n);
  this.size = e.size;
}
vt.prototype.clear = nf;
vt.prototype.delete = rf;
vt.prototype.get = sf;
vt.prototype.has = af;
vt.prototype.set = of;
var Gl = typeof exports == "object" && exports && !exports.nodeType && exports, pa = Gl && typeof module == "object" && module && !module.nodeType && module, uf = pa && pa.exports === Gl, ma = uf ? wt.Buffer : void 0, ga = ma ? ma.allocUnsafe : void 0;
function Wl(n, e) {
  if (e)
    return n.slice();
  var t = n.length, r = ga ? ga(t) : new n.constructor(t);
  return n.copy(r), r;
}
function cf(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, s = 0, i = []; ++t < r; ) {
    var l = n[t];
    e(l, t, n) && (i[s++] = l);
  }
  return i;
}
function df() {
  return [];
}
var hf = Object.prototype, ff = hf.propertyIsEnumerable, ba = Object.getOwnPropertySymbols, pf = ba ? function(n) {
  return n == null ? [] : (n = Object(n), cf(ba(n), function(e) {
    return ff.call(n, e);
  }));
} : df;
function mf(n, e, t) {
  var r = e(n);
  return cn(n) ? r : Zh(r, t(n));
}
function bi(n) {
  return mf(n, xh, pf);
}
var yi = mn(wt, "DataView"), vi = mn(wt, "Promise"), xi = mn(wt, "Set"), ya = "[object Map]", gf = "[object Object]", va = "[object Promise]", xa = "[object Set]", wa = "[object WeakMap]", Aa = "[object DataView]", bf = pn(yi), yf = pn(fr), vf = pn(vi), xf = pn(xi), wf = pn(mi), ot = Mn;
(yi && ot(new yi(new ArrayBuffer(1))) != Aa || fr && ot(new fr()) != ya || vi && ot(vi.resolve()) != va || xi && ot(new xi()) != xa || mi && ot(new mi()) != wa) && (ot = function(n) {
  var e = Mn(n), t = e == gf ? n.constructor : void 0, r = t ? pn(t) : "";
  if (r)
    switch (r) {
      case bf:
        return Aa;
      case yf:
        return ya;
      case vf:
        return va;
      case xf:
        return xa;
      case wf:
        return wa;
    }
  return e;
});
var Af = Object.prototype, Ef = Af.hasOwnProperty;
function Nf(n) {
  var e = n.length, t = new n.constructor(e);
  return e && typeof n[0] == "string" && Ef.call(n, "index") && (t.index = n.index, t.input = n.input), t;
}
var Jr = wt.Uint8Array;
function Vi(n) {
  var e = new n.constructor(n.byteLength);
  return new Jr(e).set(new Jr(n)), e;
}
function Tf(n, e) {
  var t = Vi(n.buffer);
  return new n.constructor(t, n.byteOffset, n.byteLength);
}
var Sf = /\w*$/;
function Cf(n) {
  var e = new n.constructor(n.source, Sf.exec(n));
  return e.lastIndex = n.lastIndex, e;
}
var Ea = Wt ? Wt.prototype : void 0, Na = Ea ? Ea.valueOf : void 0;
function kf(n) {
  return Na ? Object(Na.call(n)) : {};
}
function Zl(n, e) {
  var t = e ? Vi(n.buffer) : n.buffer;
  return new n.constructor(t, n.byteOffset, n.length);
}
var Lf = "[object Boolean]", _f = "[object Date]", qf = "[object Map]", If = "[object Number]", Of = "[object RegExp]", Rf = "[object Set]", $f = "[object String]", Df = "[object Symbol]", Bf = "[object ArrayBuffer]", Ff = "[object DataView]", Mf = "[object Float32Array]", Pf = "[object Float64Array]", jf = "[object Int8Array]", Uf = "[object Int16Array]", Vf = "[object Int32Array]", zf = "[object Uint8Array]", Hf = "[object Uint8ClampedArray]", Kf = "[object Uint16Array]", Gf = "[object Uint32Array]";
function Wf(n, e, t) {
  var r = n.constructor;
  switch (e) {
    case Bf:
      return Vi(n);
    case Lf:
    case _f:
      return new r(+n);
    case Ff:
      return Tf(n);
    case Mf:
    case Pf:
    case jf:
    case Uf:
    case Vf:
    case zf:
    case Hf:
    case Kf:
    case Gf:
      return Zl(n, t);
    case qf:
      return new r();
    case If:
    case $f:
      return new r(n);
    case Of:
      return Cf(n);
    case Rf:
      return new r();
    case Df:
      return kf(n);
  }
}
function Yl(n) {
  return typeof n.constructor == "function" && !Pi(n) ? fd(Hl(n)) : {};
}
var Zf = "[object Map]";
function Yf(n) {
  return qt(n) && ot(n) == Zf;
}
var Ta = Bn && Bn.isMap, Xf = Ta ? ji(Ta) : Yf, Qf = "[object Set]";
function Jf(n) {
  return qt(n) && ot(n) == Qf;
}
var Sa = Bn && Bn.isSet, ep = Sa ? ji(Sa) : Jf, tp = 1, Xl = "[object Arguments]", np = "[object Array]", rp = "[object Boolean]", sp = "[object Date]", ip = "[object Error]", Ql = "[object Function]", ap = "[object GeneratorFunction]", lp = "[object Map]", op = "[object Number]", Jl = "[object Object]", up = "[object RegExp]", cp = "[object Set]", dp = "[object String]", hp = "[object Symbol]", fp = "[object WeakMap]", pp = "[object ArrayBuffer]", mp = "[object DataView]", gp = "[object Float32Array]", bp = "[object Float64Array]", yp = "[object Int8Array]", vp = "[object Int16Array]", xp = "[object Int32Array]", wp = "[object Uint8Array]", Ap = "[object Uint8ClampedArray]", Ep = "[object Uint16Array]", Np = "[object Uint32Array]", ve = {};
ve[Xl] = ve[np] = ve[pp] = ve[mp] = ve[rp] = ve[sp] = ve[gp] = ve[bp] = ve[yp] = ve[vp] = ve[xp] = ve[lp] = ve[op] = ve[Jl] = ve[up] = ve[cp] = ve[dp] = ve[hp] = ve[wp] = ve[Ap] = ve[Ep] = ve[Np] = !0;
ve[ip] = ve[Ql] = ve[fp] = !1;
function Zr(n, e, t, r, s, i) {
  var l, o = e & tp;
  if (l !== void 0)
    return l;
  if (!Yt(n))
    return n;
  var u = cn(n);
  if (u)
    l = Nf(n);
  else {
    var d = ot(n), p = d == Ql || d == ap;
    if (dr(n))
      return Wl(n, o);
    if (d == Jl || d == Xl || p && !s)
      l = p ? {} : Yl(n);
    else {
      if (!ve[d])
        return s ? n : {};
      l = Wf(n, d, o);
    }
  }
  i || (i = new vt());
  var b = i.get(n);
  if (b)
    return b;
  i.set(n, l), ep(n) ? n.forEach(function(S) {
    l.add(Zr(S, e, t, S, n, i));
  }) : Xf(n) && n.forEach(function(S, k) {
    l.set(k, Zr(S, e, t, k, n, i));
  });
  var h = bi, g = u ? void 0 : h(n);
  return Ed(g || n, function(S, k) {
    g && (k = S, S = n[k]), Bl(l, k, Zr(S, e, t, k, n, i));
  }), l;
}
var Tp = 1, Sp = 4;
function In(n) {
  return Zr(n, Tp | Sp);
}
var Cp = "__lodash_hash_undefined__";
function kp(n) {
  return this.__data__.set(n, Cp), this;
}
function Lp(n) {
  return this.__data__.has(n);
}
function es(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new gn(); ++e < t; )
    this.add(n[e]);
}
es.prototype.add = es.prototype.push = kp;
es.prototype.has = Lp;
function _p(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (e(n[t], t, n))
      return !0;
  return !1;
}
function qp(n, e) {
  return n.has(e);
}
var Ip = 1, Op = 2;
function eo(n, e, t, r, s, i) {
  var l = t & Ip, o = n.length, u = e.length;
  if (o != u && !(l && u > o))
    return !1;
  var d = i.get(n), p = i.get(e);
  if (d && p)
    return d == e && p == n;
  var b = -1, h = !0, g = t & Op ? new es() : void 0;
  for (i.set(n, e), i.set(e, n); ++b < o; ) {
    var S = n[b], k = e[b];
    if (r)
      var _ = l ? r(k, S, b, e, n, i) : r(S, k, b, n, e, i);
    if (_ !== void 0) {
      if (_)
        continue;
      h = !1;
      break;
    }
    if (g) {
      if (!_p(e, function(I, P) {
        if (!qp(g, P) && (S === I || s(S, I, t, r, i)))
          return g.push(P);
      })) {
        h = !1;
        break;
      }
    } else if (!(S === k || s(S, k, t, r, i))) {
      h = !1;
      break;
    }
  }
  return i.delete(n), i.delete(e), h;
}
function Rp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r, s) {
    t[++e] = [s, r];
  }), t;
}
function $p(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var Dp = 1, Bp = 2, Fp = "[object Boolean]", Mp = "[object Date]", Pp = "[object Error]", jp = "[object Map]", Up = "[object Number]", Vp = "[object RegExp]", zp = "[object Set]", Hp = "[object String]", Kp = "[object Symbol]", Gp = "[object ArrayBuffer]", Wp = "[object DataView]", Ca = Wt ? Wt.prototype : void 0, ei = Ca ? Ca.valueOf : void 0;
function Zp(n, e, t, r, s, i, l) {
  switch (t) {
    case Wp:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case Gp:
      return !(n.byteLength != e.byteLength || !i(new Jr(n), new Jr(e)));
    case Fp:
    case Mp:
    case Up:
      return vr(+n, +e);
    case Pp:
      return n.name == e.name && n.message == e.message;
    case Vp:
    case Hp:
      return n == e + "";
    case jp:
      var o = Rp;
    case zp:
      var u = r & Dp;
      if (o || (o = $p), n.size != e.size && !u)
        return !1;
      var d = l.get(n);
      if (d)
        return d == e;
      r |= Bp, l.set(n, e);
      var p = eo(o(n), o(e), r, s, i, l);
      return l.delete(n), p;
    case Kp:
      if (ei)
        return ei.call(n) == ei.call(e);
  }
  return !1;
}
var Yp = 1, Xp = Object.prototype, Qp = Xp.hasOwnProperty;
function Jp(n, e, t, r, s, i) {
  var l = t & Yp, o = bi(n), u = o.length, d = bi(e), p = d.length;
  if (u != p && !l)
    return !1;
  for (var b = u; b--; ) {
    var h = o[b];
    if (!(l ? h in e : Qp.call(e, h)))
      return !1;
  }
  var g = i.get(n), S = i.get(e);
  if (g && S)
    return g == e && S == n;
  var k = !0;
  i.set(n, e), i.set(e, n);
  for (var _ = l; ++b < u; ) {
    h = o[b];
    var I = n[h], P = e[h];
    if (r)
      var U = l ? r(P, I, h, e, n, i) : r(I, P, h, n, e, i);
    if (!(U === void 0 ? I === P || s(I, P, t, r, i) : U)) {
      k = !1;
      break;
    }
    _ || (_ = h == "constructor");
  }
  if (k && !_) {
    var W = n.constructor, H = e.constructor;
    W != H && "constructor" in n && "constructor" in e && !(typeof W == "function" && W instanceof W && typeof H == "function" && H instanceof H) && (k = !1);
  }
  return i.delete(n), i.delete(e), k;
}
var em = 1, ka = "[object Arguments]", La = "[object Array]", Br = "[object Object]", tm = Object.prototype, _a = tm.hasOwnProperty;
function nm(n, e, t, r, s, i) {
  var l = cn(n), o = cn(e), u = l ? La : ot(n), d = o ? La : ot(e);
  u = u == ka ? Br : u, d = d == ka ? Br : d;
  var p = u == Br, b = d == Br, h = u == d;
  if (h && dr(n)) {
    if (!dr(e))
      return !1;
    l = !0, p = !1;
  }
  if (h && !p)
    return i || (i = new vt()), l || Ui(n) ? eo(n, e, t, r, s, i) : Zp(n, e, u, t, r, s, i);
  if (!(t & em)) {
    var g = p && _a.call(n, "__wrapped__"), S = b && _a.call(e, "__wrapped__");
    if (g || S) {
      var k = g ? n.value() : n, _ = S ? e.value() : e;
      return i || (i = new vt()), s(k, _, t, r, i);
    }
  }
  return h ? (i || (i = new vt()), Jp(n, e, t, r, s, i)) : !1;
}
function to(n, e, t, r, s) {
  return n === e ? !0 : n == null || e == null || !qt(n) && !qt(e) ? n !== n && e !== e : nm(n, e, t, r, to, s);
}
function rm(n) {
  return function(e, t, r) {
    for (var s = -1, i = Object(e), l = r(e), o = l.length; o--; ) {
      var u = l[++s];
      if (t(i[u], u, i) === !1)
        break;
    }
    return e;
  };
}
var sm = rm();
function wi(n, e, t) {
  (t !== void 0 && !vr(n[e], t) || t === void 0 && !(e in n)) && Mi(n, e, t);
}
function im(n) {
  return qt(n) && ls(n);
}
function Ai(n, e) {
  if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
    return n[e];
}
function am(n) {
  return kd(n, zl(n));
}
function lm(n, e, t, r, s, i, l) {
  var o = Ai(n, t), u = Ai(e, t), d = l.get(u);
  if (d) {
    wi(n, t, d);
    return;
  }
  var p = i ? i(o, u, t + "", n, e, l) : void 0, b = p === void 0;
  if (b) {
    var h = cn(u), g = !h && dr(u), S = !h && !g && Ui(u);
    p = u, h || g || S ? cn(o) ? p = o : im(o) ? p = md(o) : g ? (b = !1, p = Wl(u, !0)) : S ? (b = !1, p = Zl(u, !0)) : p = [] : tf(u) || gi(u) ? (p = o, gi(o) ? p = am(o) : (!Yt(o) || Fi(o)) && (p = Yl(u))) : b = !1;
  }
  b && (l.set(u, p), s(p, u, r, i, l), l.delete(u)), wi(n, t, p);
}
function no(n, e, t, r, s) {
  n !== e && sm(e, function(i, l) {
    if (s || (s = new vt()), Yt(i))
      lm(n, e, l, t, no, r, s);
    else {
      var o = r ? r(Ai(n, l), i, l + "", n, e, s) : void 0;
      o === void 0 && (o = i), wi(n, l, o);
    }
  }, zl);
}
function zi(n, e) {
  return to(n, e);
}
var Kt = Od(function(n, e, t) {
  no(n, e, t);
}), K = /* @__PURE__ */ ((n) => (n[n.TYPE = 3] = "TYPE", n[n.LEVEL = 12] = "LEVEL", n[n.ATTRIBUTE = 13] = "ATTRIBUTE", n[n.BLOT = 14] = "BLOT", n[n.INLINE = 7] = "INLINE", n[n.BLOCK = 11] = "BLOCK", n[n.BLOCK_BLOT = 10] = "BLOCK_BLOT", n[n.INLINE_BLOT = 6] = "INLINE_BLOT", n[n.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", n[n.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", n[n.ANY = 15] = "ANY", n))(K || {});
class xt {
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
class On extends Error {
  constructor(e) {
    e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
  }
}
const ro = class Ei {
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
      throw new On(`Unable to create ${t} blot`);
    const i = s, l = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : i.create(r)
    ), o = new i(e, l, r);
    return Ei.blots.set(o.domNode, o), o;
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
        throw new On("Invalid definition");
      if (r && t.blotName === "abstract")
        throw new On("Cannot register abstract class");
      const i = r ? t.blotName : s ? t.attrName : void 0;
      return this.types[i] = t, s ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : r && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((l) => l.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((l) => {
        (this.tags[l] == null || t.className == null) && (this.tags[l] = t);
      }))), t;
    });
  }
};
ro.blots = /* @__PURE__ */ new WeakMap();
let Fn = ro;
function qa(n, e) {
  return (n.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class om extends xt {
  static keys(e) {
    return (e.getAttribute("class") || "").split(/\s+/).map((t) => t.split("-").slice(0, -1).join("-"));
  }
  add(e, t) {
    return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
  }
  remove(e) {
    qa(e, this.keyName).forEach((t) => {
      e.classList.remove(t);
    }), e.classList.length === 0 && e.removeAttribute("class");
  }
  value(e) {
    const t = (qa(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(e, t) ? t : "";
  }
}
const pt = om;
function ti(n) {
  const e = n.split("-"), t = e.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  return e[0] + t;
}
class um extends xt {
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
const Xt = um;
class cm {
  constructor(e) {
    this.attributes = {}, this.domNode = e, this.build();
  }
  attribute(e, t) {
    t ? e.add(this.domNode, t) && (e.value(this.domNode) != null ? this.attributes[e.attrName] = e : delete this.attributes[e.attrName]) : (e.remove(this.domNode), delete this.attributes[e.attrName]);
  }
  build() {
    this.attributes = {};
    const e = Fn.find(this.domNode);
    if (e == null)
      return;
    const t = xt.keys(this.domNode), r = pt.keys(this.domNode), s = Xt.keys(this.domNode);
    t.concat(r).concat(s).forEach((i) => {
      const l = e.scroll.query(i, K.ATTRIBUTE);
      l instanceof xt && (this.attributes[l.attrName] = l);
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
const cs = cm, so = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, Fn.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new On("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Fn.blots.delete(this.domNode);
  }
  deleteAt(e, t) {
    this.isolate(e, t).remove();
  }
  formatAt(e, t, r, s) {
    const i = this.isolate(e, t);
    if (this.scroll.query(r, K.BLOT) != null && s)
      i.wrap(r, s);
    else if (this.scroll.query(r, K.ATTRIBUTE) != null) {
      const l = this.scroll.create(this.statics.scope);
      i.wrap(l), l.format(r, s);
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
      throw new On(`Cannot wrap ${e}`);
    return r.appendChild(this), r;
  }
};
so.blotName = "abstract";
let io = so;
const ao = class extends io {
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
ao.scope = K.INLINE_BLOT;
let dm = ao;
const Me = dm;
class hm {
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
    let l = e - i;
    const o = this.iterator(s);
    let u = o();
    for (; u && l < e + t; ) {
      const d = u.length();
      e > l ? r(
        u,
        e - l,
        Math.min(t, l + d - e)
      ) : r(u, 0, Math.min(d, e + t - l)), l += d, u = o();
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
function Ia(n, e) {
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
const lo = class jt extends io {
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
    this.children = new hm(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = Ia(e, this.scroll);
        this.insertBefore(t, this.children.head || void 0);
      } catch (t) {
        if (t instanceof On)
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
      (l, o, u) => {
        (e.blotName == null && e(l) || e.blotName != null && l instanceof e) && s.push(l), l instanceof jt && (s = s.concat(
          l.descendants(e, o, i)
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
      ) || (t.statics.scope === K.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof jt ? t.unwrap() : t.remove());
    });
  }
  formatAt(e, t, r, s) {
    this.children.forEachAt(e, t, (i, l, o) => {
      i.formatAt(l, o, r, s);
    });
  }
  insertAt(e, t, r) {
    const [s, i] = this.children.find(e);
    if (s)
      s.insertAt(i, t, r);
    else {
      const l = r == null ? this.scroll.create("text", t) : this.scroll.create(t, r);
      this.appendChild(l);
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
    return this.parent && this.parent.insertBefore(r, this.next || void 0), this.children.forEachAt(e, this.length(), (s, i, l) => {
      const o = s.split(i, t);
      o != null && r.appendChild(o);
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
      const l = this.scroll.find(i);
      l != null && (l.domNode.parentNode == null || l.domNode.parentNode === this.domNode) && l.detach();
    }), r.filter((i) => i.parentNode === this.domNode && i !== this.uiNode).sort((i, l) => i === l ? 0 : i.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((i) => {
      let l = null;
      i.nextSibling != null && (l = this.scroll.find(i.nextSibling));
      const o = Ia(i, this.scroll);
      (o.next !== l || o.next == null) && (o.parent != null && o.parent.removeChild(this), this.insertBefore(o, l || void 0));
    }), this.enforceAllowedChildren();
  }
};
lo.uiClass = "";
let fm = lo;
const ht = fm;
function pm(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length)
    return !1;
  for (const t in n)
    if (n[t] !== e[t])
      return !1;
  return !0;
}
const Sn = class Cn extends ht {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(Cn.blotName);
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
        r instanceof Cn || (r = r.wrap(Cn.blotName, !0)), this.attributes.copy(r);
      }), this.unwrap();
    else {
      const r = this.scroll.query(e, K.INLINE);
      if (r == null)
        return;
      r instanceof xt ? this.attributes.attribute(r, t) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t);
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
    r instanceof Cn && r.prev === this && pm(t, r.formats()) && (r.moveChildren(this), r.remove());
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
    return r instanceof Cn && this.attributes.move(r), r;
  }
};
Sn.allowedChildren = [Sn, Me], Sn.blotName = "inline", Sn.scope = K.INLINE_BLOT, Sn.tagName = "SPAN";
let mm = Sn;
const Hi = mm, kn = class Ni extends ht {
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
    const r = this.scroll.query(e, K.BLOCK);
    r != null && (r instanceof xt ? this.attributes.attribute(r, t) : e === this.statics.blotName && !t ? this.replaceWith(Ni.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
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
kn.blotName = "block", kn.scope = K.BLOCK_BLOT, kn.tagName = "P", kn.allowedChildren = [
  Hi,
  kn,
  Me
];
let gm = kn;
const pr = gm, Ti = class extends ht {
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
let bm = Ti;
const ds = bm;
class ym extends Me {
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
const Je = ym, vm = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, xm = 100, Ln = class extends ht {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((r) => {
      this.update(r);
    }), this.observer.observe(this.domNode, vm), this.attach();
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
    const i = (u, d = !0) => {
      u == null || u === this || u.domNode.parentNode != null && (r.has(u.domNode) || r.set(u.domNode, []), d && i(u.parent));
    }, l = (u) => {
      r.has(u.domNode) && (u instanceof ht && u.children.forEach(l), r.delete(u.domNode), u.optimize(t));
    };
    let o = e;
    for (let u = 0; o.length > 0; u += 1) {
      if (u >= xm)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (o.forEach((d) => {
        const p = this.find(d.target, !0);
        p != null && (p.domNode === d.target && (d.type === "childList" ? (i(this.find(d.previousSibling, !1)), Array.from(d.addedNodes).forEach((b) => {
          const h = this.find(b, !1);
          i(h, !1), h instanceof ht && h.children.forEach((g) => {
            i(g, !1);
          });
        })) : d.type === "attributes" && i(p.prev)), i(p));
      }), this.children.forEach(l), o = Array.from(this.observer.takeRecords()), s = o.slice(); s.length > 0; )
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
Ln.blotName = "scroll", Ln.defaultChild = pr, Ln.allowedChildren = [pr, ds], Ln.scope = K.BLOCK_BLOT, Ln.tagName = "DIV";
let wm = Ln;
const Ki = wm, Si = class oo extends Me {
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
    super.optimize(e), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof oo && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Si.blotName = "text", Si.scope = K.INLINE_BLOT;
let Am = Si;
const ts = Am, Em = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: xt,
  AttributorStore: cs,
  BlockBlot: pr,
  ClassAttributor: pt,
  ContainerBlot: ds,
  EmbedBlot: Je,
  InlineBlot: Hi,
  LeafBlot: Me,
  ParentBlot: ht,
  Registry: Fn,
  Scope: K,
  ScrollBlot: Ki,
  StyleAttributor: Xt,
  TextBlot: ts
}, Symbol.toStringTag, { value: "Module" }));
var zt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function uo(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Fr = { exports: {} }, ni, Oa;
function Nm() {
  if (Oa) return ni;
  Oa = 1;
  var n = -1, e = 1, t = 0;
  function r(y, B, C, L, f) {
    if (y === B)
      return y ? [[t, y]] : [];
    if (C != null) {
      var m = Ae(y, B, C);
      if (m)
        return m;
    }
    var N = o(y, B), T = y.substring(0, N);
    y = y.substring(N), B = B.substring(N), N = d(y, B);
    var E = y.substring(y.length - N);
    y = y.substring(0, y.length - N), B = B.substring(0, B.length - N);
    var D = s(y, B);
    return T && D.unshift([t, T]), E && D.push([t, E]), P(D, f), L && b(D), D;
  }
  function s(y, B) {
    var C;
    if (!y)
      return [[e, B]];
    if (!B)
      return [[n, y]];
    var L = y.length > B.length ? y : B, f = y.length > B.length ? B : y, m = L.indexOf(f);
    if (m !== -1)
      return C = [
        [e, L.substring(0, m)],
        [t, f],
        [e, L.substring(m + f.length)]
      ], y.length > B.length && (C[0][0] = C[2][0] = n), C;
    if (f.length === 1)
      return [
        [n, y],
        [e, B]
      ];
    var N = p(y, B);
    if (N) {
      var T = N[0], E = N[1], D = N[2], j = N[3], G = N[4], Q = r(T, D), ae = r(E, j);
      return Q.concat([[t, G]], ae);
    }
    return i(y, B);
  }
  function i(y, B) {
    for (var C = y.length, L = B.length, f = Math.ceil((C + L) / 2), m = f, N = 2 * f, T = new Array(N), E = new Array(N), D = 0; D < N; D++)
      T[D] = -1, E[D] = -1;
    T[m + 1] = 0, E[m + 1] = 0;
    for (var j = C - L, G = j % 2 !== 0, Q = 0, ae = 0, Y = 0, be = 0, ye = 0; ye < f; ye++) {
      for (var ne = -ye + Q; ne <= ye - ae; ne += 2) {
        var ue = m + ne, le;
        ne === -ye || ne !== ye && T[ue - 1] < T[ue + 1] ? le = T[ue + 1] : le = T[ue - 1] + 1;
        for (var ce = le - ne; le < C && ce < L && y.charAt(le) === B.charAt(ce); )
          le++, ce++;
        if (T[ue] = le, le > C)
          ae += 2;
        else if (ce > L)
          Q += 2;
        else if (G) {
          var he = m + j - ne;
          if (he >= 0 && he < N && E[he] !== -1) {
            var fe = C - E[he];
            if (le >= fe)
              return l(y, B, le, ce);
          }
        }
      }
      for (var Ee = -ye + Y; Ee <= ye - be; Ee += 2) {
        var he = m + Ee, fe;
        Ee === -ye || Ee !== ye && E[he - 1] < E[he + 1] ? fe = E[he + 1] : fe = E[he - 1] + 1;
        for (var ke = fe - Ee; fe < C && ke < L && y.charAt(C - fe - 1) === B.charAt(L - ke - 1); )
          fe++, ke++;
        if (E[he] = fe, fe > C)
          be += 2;
        else if (ke > L)
          Y += 2;
        else if (!G) {
          var ue = m + j - Ee;
          if (ue >= 0 && ue < N && T[ue] !== -1) {
            var le = T[ue], ce = m + le - ue;
            if (fe = C - fe, le >= fe)
              return l(y, B, le, ce);
          }
        }
      }
    }
    return [
      [n, y],
      [e, B]
    ];
  }
  function l(y, B, C, L) {
    var f = y.substring(0, C), m = B.substring(0, L), N = y.substring(C), T = B.substring(L), E = r(f, m), D = r(N, T);
    return E.concat(D);
  }
  function o(y, B) {
    if (!y || !B || y.charAt(0) !== B.charAt(0))
      return 0;
    for (var C = 0, L = Math.min(y.length, B.length), f = L, m = 0; C < f; )
      y.substring(m, f) == B.substring(m, f) ? (C = f, m = C) : L = f, f = Math.floor((L - C) / 2 + C);
    return U(y.charCodeAt(f - 1)) && f--, f;
  }
  function u(y, B) {
    var C = y.length, L = B.length;
    if (C == 0 || L == 0)
      return 0;
    C > L ? y = y.substring(C - L) : C < L && (B = B.substring(0, C));
    var f = Math.min(C, L);
    if (y == B)
      return f;
    for (var m = 0, N = 1; ; ) {
      var T = y.substring(f - N), E = B.indexOf(T);
      if (E == -1)
        return m;
      N += E, (E == 0 || y.substring(f - N) == B.substring(0, N)) && (m = N, N++);
    }
  }
  function d(y, B) {
    if (!y || !B || y.slice(-1) !== B.slice(-1))
      return 0;
    for (var C = 0, L = Math.min(y.length, B.length), f = L, m = 0; C < f; )
      y.substring(y.length - f, y.length - m) == B.substring(B.length - f, B.length - m) ? (C = f, m = C) : L = f, f = Math.floor((L - C) / 2 + C);
    return W(y.charCodeAt(y.length - f)) && f--, f;
  }
  function p(y, B) {
    var C = y.length > B.length ? y : B, L = y.length > B.length ? B : y;
    if (C.length < 4 || L.length * 2 < C.length)
      return null;
    function f(ae, Y, be) {
      for (var ye = ae.substring(be, be + Math.floor(ae.length / 4)), ne = -1, ue = "", le, ce, he, fe; (ne = Y.indexOf(ye, ne + 1)) !== -1; ) {
        var Ee = o(
          ae.substring(be),
          Y.substring(ne)
        ), ke = d(
          ae.substring(0, be),
          Y.substring(0, ne)
        );
        ue.length < ke + Ee && (ue = Y.substring(ne - ke, ne) + Y.substring(ne, ne + Ee), le = ae.substring(0, be - ke), ce = ae.substring(be + Ee), he = Y.substring(0, ne - ke), fe = Y.substring(ne + Ee));
      }
      return ue.length * 2 >= ae.length ? [
        le,
        ce,
        he,
        fe,
        ue
      ] : null;
    }
    var m = f(
      C,
      L,
      Math.ceil(C.length / 4)
    ), N = f(
      C,
      L,
      Math.ceil(C.length / 2)
    ), T;
    if (!m && !N)
      return null;
    N ? m ? T = m[4].length > N[4].length ? m : N : T = N : T = m;
    var E, D, j, G;
    y.length > B.length ? (E = T[0], D = T[1], j = T[2], G = T[3]) : (j = T[0], G = T[1], E = T[2], D = T[3]);
    var Q = T[4];
    return [E, D, j, G, Q];
  }
  function b(y) {
    for (var B = !1, C = [], L = 0, f = null, m = 0, N = 0, T = 0, E = 0, D = 0; m < y.length; )
      y[m][0] == t ? (C[L++] = m, N = E, T = D, E = 0, D = 0, f = y[m][1]) : (y[m][0] == e ? E += y[m][1].length : D += y[m][1].length, f && f.length <= Math.max(N, T) && f.length <= Math.max(E, D) && (y.splice(C[L - 1], 0, [
        n,
        f
      ]), y[C[L - 1] + 1][0] = e, L--, L--, m = L > 0 ? C[L - 1] : -1, N = 0, T = 0, E = 0, D = 0, f = null, B = !0)), m++;
    for (B && P(y), I(y), m = 1; m < y.length; ) {
      if (y[m - 1][0] == n && y[m][0] == e) {
        var j = y[m - 1][1], G = y[m][1], Q = u(j, G), ae = u(G, j);
        Q >= ae ? (Q >= j.length / 2 || Q >= G.length / 2) && (y.splice(m, 0, [
          t,
          G.substring(0, Q)
        ]), y[m - 1][1] = j.substring(
          0,
          j.length - Q
        ), y[m + 1][1] = G.substring(Q), m++) : (ae >= j.length / 2 || ae >= G.length / 2) && (y.splice(m, 0, [
          t,
          j.substring(0, ae)
        ]), y[m - 1][0] = e, y[m - 1][1] = G.substring(
          0,
          G.length - ae
        ), y[m + 1][0] = n, y[m + 1][1] = j.substring(ae), m++), m++;
      }
      m++;
    }
  }
  var h = /[^a-zA-Z0-9]/, g = /\s/, S = /[\r\n]/, k = /\n\r?\n$/, _ = /^\r?\n\r?\n/;
  function I(y) {
    function B(ae, Y) {
      if (!ae || !Y)
        return 6;
      var be = ae.charAt(ae.length - 1), ye = Y.charAt(0), ne = be.match(h), ue = ye.match(h), le = ne && be.match(g), ce = ue && ye.match(g), he = le && be.match(S), fe = ce && ye.match(S), Ee = he && ae.match(k), ke = fe && Y.match(_);
      return Ee || ke ? 5 : he || fe ? 4 : ne && !le && ce ? 3 : le || ce ? 2 : ne || ue ? 1 : 0;
    }
    for (var C = 1; C < y.length - 1; ) {
      if (y[C - 1][0] == t && y[C + 1][0] == t) {
        var L = y[C - 1][1], f = y[C][1], m = y[C + 1][1], N = d(L, f);
        if (N) {
          var T = f.substring(f.length - N);
          L = L.substring(0, L.length - N), f = T + f.substring(0, f.length - N), m = T + m;
        }
        for (var E = L, D = f, j = m, G = B(L, f) + B(f, m); f.charAt(0) === m.charAt(0); ) {
          L += f.charAt(0), f = f.substring(1) + m.charAt(0), m = m.substring(1);
          var Q = B(L, f) + B(f, m);
          Q >= G && (G = Q, E = L, D = f, j = m);
        }
        y[C - 1][1] != E && (E ? y[C - 1][1] = E : (y.splice(C - 1, 1), C--), y[C][1] = D, j ? y[C + 1][1] = j : (y.splice(C + 1, 1), C--));
      }
      C++;
    }
  }
  function P(y, B) {
    y.push([t, ""]);
    for (var C = 0, L = 0, f = 0, m = "", N = "", T; C < y.length; ) {
      if (C < y.length - 1 && !y[C][1]) {
        y.splice(C, 1);
        continue;
      }
      switch (y[C][0]) {
        case e:
          f++, N += y[C][1], C++;
          break;
        case n:
          L++, m += y[C][1], C++;
          break;
        case t:
          var E = C - f - L - 1;
          if (B) {
            if (E >= 0 && ie(y[E][1])) {
              var D = y[E][1].slice(-1);
              if (y[E][1] = y[E][1].slice(
                0,
                -1
              ), m = D + m, N = D + N, !y[E][1]) {
                y.splice(E, 1), C--;
                var j = E - 1;
                y[j] && y[j][0] === e && (f++, N = y[j][1] + N, j--), y[j] && y[j][0] === n && (L++, m = y[j][1] + m, j--), E = j;
              }
            }
            if (H(y[C][1])) {
              var D = y[C][1].charAt(0);
              y[C][1] = y[C][1].slice(1), m += D, N += D;
            }
          }
          if (C < y.length - 1 && !y[C][1]) {
            y.splice(C, 1);
            break;
          }
          if (m.length > 0 || N.length > 0) {
            m.length > 0 && N.length > 0 && (T = o(N, m), T !== 0 && (E >= 0 ? y[E][1] += N.substring(
              0,
              T
            ) : (y.splice(0, 0, [
              t,
              N.substring(0, T)
            ]), C++), N = N.substring(T), m = m.substring(T)), T = d(N, m), T !== 0 && (y[C][1] = N.substring(N.length - T) + y[C][1], N = N.substring(
              0,
              N.length - T
            ), m = m.substring(
              0,
              m.length - T
            )));
            var G = f + L;
            m.length === 0 && N.length === 0 ? (y.splice(C - G, G), C = C - G) : m.length === 0 ? (y.splice(C - G, G, [e, N]), C = C - G + 1) : N.length === 0 ? (y.splice(C - G, G, [n, m]), C = C - G + 1) : (y.splice(
              C - G,
              G,
              [n, m],
              [e, N]
            ), C = C - G + 2);
          }
          C !== 0 && y[C - 1][0] === t ? (y[C - 1][1] += y[C][1], y.splice(C, 1)) : C++, f = 0, L = 0, m = "", N = "";
          break;
      }
    }
    y[y.length - 1][1] === "" && y.pop();
    var Q = !1;
    for (C = 1; C < y.length - 1; )
      y[C - 1][0] === t && y[C + 1][0] === t && (y[C][1].substring(
        y[C][1].length - y[C - 1][1].length
      ) === y[C - 1][1] ? (y[C][1] = y[C - 1][1] + y[C][1].substring(
        0,
        y[C][1].length - y[C - 1][1].length
      ), y[C + 1][1] = y[C - 1][1] + y[C + 1][1], y.splice(C - 1, 1), Q = !0) : y[C][1].substring(0, y[C + 1][1].length) == y[C + 1][1] && (y[C - 1][1] += y[C + 1][1], y[C][1] = y[C][1].substring(y[C + 1][1].length) + y[C + 1][1], y.splice(C + 1, 1), Q = !0)), C++;
    Q && P(y, B);
  }
  function U(y) {
    return y >= 55296 && y <= 56319;
  }
  function W(y) {
    return y >= 56320 && y <= 57343;
  }
  function H(y) {
    return W(y.charCodeAt(0));
  }
  function ie(y) {
    return U(y.charCodeAt(y.length - 1));
  }
  function re(y) {
    for (var B = [], C = 0; C < y.length; C++)
      y[C][1].length > 0 && B.push(y[C]);
    return B;
  }
  function ge(y, B, C, L) {
    return ie(y) || H(L) ? null : re([
      [t, y],
      [n, B],
      [e, C],
      [t, L]
    ]);
  }
  function Ae(y, B, C) {
    var L = typeof C == "number" ? { index: C, length: 0 } : C.oldRange, f = typeof C == "number" ? null : C.newRange, m = y.length, N = B.length;
    if (L.length === 0 && (f === null || f.length === 0)) {
      var T = L.index, E = y.slice(0, T), D = y.slice(T), j = f ? f.index : null;
      e: {
        var G = T + N - m;
        if (j !== null && j !== G || G < 0 || G > N)
          break e;
        var Q = B.slice(0, G), ae = B.slice(G);
        if (ae !== D)
          break e;
        var Y = Math.min(T, G), be = E.slice(0, Y), ye = Q.slice(0, Y);
        if (be !== ye)
          break e;
        var ne = E.slice(Y), ue = Q.slice(Y);
        return ge(be, ne, ue, D);
      }
      e: {
        if (j !== null && j !== T)
          break e;
        var le = T, Q = B.slice(0, le), ae = B.slice(le);
        if (Q !== E)
          break e;
        var ce = Math.min(m - le, N - le), he = D.slice(D.length - ce), fe = ae.slice(ae.length - ce);
        if (he !== fe)
          break e;
        var ne = D.slice(0, D.length - ce), ue = ae.slice(0, ae.length - ce);
        return ge(E, ne, ue, he);
      }
    }
    if (L.length > 0 && f && f.length === 0)
      e: {
        var be = y.slice(0, L.index), he = y.slice(L.index + L.length), Y = be.length, ce = he.length;
        if (N < Y + ce)
          break e;
        var ye = B.slice(0, Y), fe = B.slice(N - ce);
        if (be !== ye || he !== fe)
          break e;
        var ne = y.slice(Y, m - ce), ue = B.slice(Y, N - ce);
        return ge(be, ne, ue, he);
      }
    return null;
  }
  function we(y, B, C, L) {
    return r(y, B, C, L, !0);
  }
  return we.INSERT = e, we.DELETE = n, we.EQUAL = t, ni = we, ni;
}
var rr = { exports: {} };
rr.exports;
var Ra;
function co() {
  return Ra || (Ra = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", l = "[object Array]", o = "[object Boolean]", u = "[object Date]", d = "[object Error]", p = "[object Function]", b = "[object GeneratorFunction]", h = "[object Map]", g = "[object Number]", S = "[object Object]", k = "[object Promise]", _ = "[object RegExp]", I = "[object Set]", P = "[object String]", U = "[object Symbol]", W = "[object WeakMap]", H = "[object ArrayBuffer]", ie = "[object DataView]", re = "[object Float32Array]", ge = "[object Float64Array]", Ae = "[object Int8Array]", we = "[object Int16Array]", y = "[object Int32Array]", B = "[object Uint8Array]", C = "[object Uint8ClampedArray]", L = "[object Uint16Array]", f = "[object Uint32Array]", m = /[\\^$.*+?()[\]{}|]/g, N = /\w*$/, T = /^\[object .+?Constructor\]$/, E = /^(?:0|[1-9]\d*)$/, D = {};
    D[i] = D[l] = D[H] = D[ie] = D[o] = D[u] = D[re] = D[ge] = D[Ae] = D[we] = D[y] = D[h] = D[g] = D[S] = D[_] = D[I] = D[P] = D[U] = D[B] = D[C] = D[L] = D[f] = !0, D[d] = D[p] = D[W] = !1;
    var j = typeof zt == "object" && zt && zt.Object === Object && zt, G = typeof self == "object" && self && self.Object === Object && self, Q = j || G || Function("return this")(), ae = e && !e.nodeType && e, Y = ae && !0 && n && !n.nodeType && n, be = Y && Y.exports === ae;
    function ye(a, c) {
      return a.set(c[0], c[1]), a;
    }
    function ne(a, c) {
      return a.add(c), a;
    }
    function ue(a, c) {
      for (var v = -1, q = a ? a.length : 0; ++v < q && c(a[v], v, a) !== !1; )
        ;
      return a;
    }
    function le(a, c) {
      for (var v = -1, q = c.length, te = a.length; ++v < q; )
        a[te + v] = c[v];
      return a;
    }
    function ce(a, c, v, q) {
      for (var te = -1, Z = a ? a.length : 0; ++te < Z; )
        v = c(v, a[te], te, a);
      return v;
    }
    function he(a, c) {
      for (var v = -1, q = Array(a); ++v < a; )
        q[v] = c(v);
      return q;
    }
    function fe(a, c) {
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
      var c = -1, v = Array(a.size);
      return a.forEach(function(q, te) {
        v[++c] = [te, q];
      }), v;
    }
    function Qt(a, c) {
      return function(v) {
        return a(c(v));
      };
    }
    function xn(a) {
      var c = -1, v = Array(a.size);
      return a.forEach(function(q) {
        v[++c] = q;
      }), v;
    }
    var jn = Array.prototype, Un = Function.prototype, $t = Object.prototype, Jt = Q["__core-js_shared__"], en = (function() {
      var a = /[^.]+$/.exec(Jt && Jt.keys && Jt.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), Et = Un.toString, Ze = $t.hasOwnProperty, st = $t.toString, Dt = RegExp(
      "^" + Et.call(Ze).replace(m, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Nt = be ? Q.Buffer : void 0, Bt = Q.Symbol, tn = Q.Uint8Array, He = Qt(Object.getPrototypeOf, Object), w = Object.create, x = $t.propertyIsEnumerable, O = jn.splice, M = Object.getOwnPropertySymbols, ee = Nt ? Nt.isBuffer : void 0, pe = Qt(Object.keys, Object), Re = it(Q, "DataView"), Tt = it(Q, "Map"), Ke = it(Q, "Promise"), Ft = it(Q, "Set"), Ye = it(Q, "WeakMap"), nn = it(Object, "create"), Vn = Ue(Re), rn = Ue(Tt), zn = Ue(Ke), Hn = Ue(Ft), Kn = Ue(Ye), Mt = Bt ? Bt.prototype : void 0, Nr = Mt ? Mt.valueOf : void 0;
    function St(a) {
      var c = -1, v = a ? a.length : 0;
      for (this.clear(); ++c < v; ) {
        var q = a[c];
        this.set(q[0], q[1]);
      }
    }
    function ms() {
      this.__data__ = nn ? nn(null) : {};
    }
    function gs(a) {
      return this.has(a) && delete this.__data__[a];
    }
    function bs(a) {
      var c = this.__data__;
      if (nn) {
        var v = c[a];
        return v === r ? void 0 : v;
      }
      return Ze.call(c, a) ? c[a] : void 0;
    }
    function Tr(a) {
      var c = this.__data__;
      return nn ? c[a] !== void 0 : Ze.call(c, a);
    }
    function Gn(a, c) {
      var v = this.__data__;
      return v[a] = nn && c === void 0 ? r : c, this;
    }
    St.prototype.clear = ms, St.prototype.delete = gs, St.prototype.get = bs, St.prototype.has = Tr, St.prototype.set = Gn;
    function Le(a) {
      var c = -1, v = a ? a.length : 0;
      for (this.clear(); ++c < v; ) {
        var q = a[c];
        this.set(q[0], q[1]);
      }
    }
    function ys() {
      this.__data__ = [];
    }
    function vs(a) {
      var c = this.__data__, v = An(c, a);
      if (v < 0)
        return !1;
      var q = c.length - 1;
      return v == q ? c.pop() : O.call(c, v, 1), !0;
    }
    function xs(a) {
      var c = this.__data__, v = An(c, a);
      return v < 0 ? void 0 : c[v][1];
    }
    function ws(a) {
      return An(this.__data__, a) > -1;
    }
    function As(a, c) {
      var v = this.__data__, q = An(v, a);
      return q < 0 ? v.push([a, c]) : v[q][1] = c, this;
    }
    Le.prototype.clear = ys, Le.prototype.delete = vs, Le.prototype.get = xs, Le.prototype.has = ws, Le.prototype.set = As;
    function $e(a) {
      var c = -1, v = a ? a.length : 0;
      for (this.clear(); ++c < v; ) {
        var q = a[c];
        this.set(q[0], q[1]);
      }
    }
    function Es() {
      this.__data__ = {
        hash: new St(),
        map: new (Tt || Le)(),
        string: new St()
      };
    }
    function Ns(a) {
      return an(this, a).delete(a);
    }
    function Ts(a) {
      return an(this, a).get(a);
    }
    function Ss(a) {
      return an(this, a).has(a);
    }
    function Cs(a, c) {
      return an(this, a).set(a, c), this;
    }
    $e.prototype.clear = Es, $e.prototype.delete = Ns, $e.prototype.get = Ts, $e.prototype.has = Ss, $e.prototype.set = Cs;
    function Ge(a) {
      this.__data__ = new Le(a);
    }
    function ks() {
      this.__data__ = new Le();
    }
    function Ls(a) {
      return this.__data__.delete(a);
    }
    function _s(a) {
      return this.__data__.get(a);
    }
    function qs(a) {
      return this.__data__.has(a);
    }
    function Is(a, c) {
      var v = this.__data__;
      if (v instanceof Le) {
        var q = v.__data__;
        if (!Tt || q.length < t - 1)
          return q.push([a, c]), this;
        v = this.__data__ = new $e(q);
      }
      return v.set(a, c), this;
    }
    Ge.prototype.clear = ks, Ge.prototype.delete = Ls, Ge.prototype.get = _s, Ge.prototype.has = qs, Ge.prototype.set = Is;
    function wn(a, c) {
      var v = Xn(a) || Nn(a) ? he(a.length, String) : [], q = v.length, te = !!q;
      for (var Z in a)
        Ze.call(a, Z) && !(te && (Z == "length" || Ks(Z, q))) && v.push(Z);
      return v;
    }
    function Sr(a, c, v) {
      var q = a[c];
      (!(Ze.call(a, c) && qr(q, v)) || v === void 0 && !(c in a)) && (a[c] = v);
    }
    function An(a, c) {
      for (var v = a.length; v--; )
        if (qr(a[v][0], c))
          return v;
      return -1;
    }
    function gt(a, c) {
      return a && Yn(c, Jn(c), a);
    }
    function Wn(a, c, v, q, te, Z, de) {
      var oe;
      if (q && (oe = Z ? q(a, te, Z, de) : q(a)), oe !== void 0)
        return oe;
      if (!yt(a))
        return a;
      var Ne = Xn(a);
      if (Ne) {
        if (oe = zs(a), !c)
          return js(a, oe);
      } else {
        var me = kt(a), De = me == p || me == b;
        if (Ir(a))
          return En(a, c);
        if (me == S || me == i || De && !Z) {
          if (Ee(a))
            return Z ? a : {};
          if (oe = bt(De ? {} : a), !c)
            return Us(a, gt(oe, a));
        } else {
          if (!D[me])
            return Z ? a : {};
          oe = Hs(a, me, Wn, c);
        }
      }
      de || (de = new Ge());
      var We = de.get(a);
      if (We)
        return We;
      if (de.set(a, oe), !Ne)
        var Se = v ? Vs(a) : Jn(a);
      return ue(Se || a, function(Be, _e) {
        Se && (_e = Be, Be = a[_e]), Sr(oe, _e, Wn(Be, c, v, q, _e, a, de));
      }), oe;
    }
    function Os(a) {
      return yt(a) ? w(a) : {};
    }
    function Rs(a, c, v) {
      var q = c(a);
      return Xn(a) ? q : le(q, v(a));
    }
    function $s(a) {
      return st.call(a);
    }
    function Ds(a) {
      if (!yt(a) || Ws(a))
        return !1;
      var c = Qn(a) || Ee(a) ? Dt : T;
      return c.test(Ue(a));
    }
    function Bs(a) {
      if (!Lr(a))
        return pe(a);
      var c = [];
      for (var v in Object(a))
        Ze.call(a, v) && v != "constructor" && c.push(v);
      return c;
    }
    function En(a, c) {
      if (c)
        return a.slice();
      var v = new a.constructor(a.length);
      return a.copy(v), v;
    }
    function Zn(a) {
      var c = new a.constructor(a.byteLength);
      return new tn(c).set(new tn(a)), c;
    }
    function sn(a, c) {
      var v = c ? Zn(a.buffer) : a.buffer;
      return new a.constructor(v, a.byteOffset, a.byteLength);
    }
    function Cr(a, c, v) {
      var q = c ? v(ke(a), !0) : ke(a);
      return ce(q, ye, new a.constructor());
    }
    function kr(a) {
      var c = new a.constructor(a.source, N.exec(a));
      return c.lastIndex = a.lastIndex, c;
    }
    function Fs(a, c, v) {
      var q = c ? v(xn(a), !0) : xn(a);
      return ce(q, ne, new a.constructor());
    }
    function Ms(a) {
      return Nr ? Object(Nr.call(a)) : {};
    }
    function Ps(a, c) {
      var v = c ? Zn(a.buffer) : a.buffer;
      return new a.constructor(v, a.byteOffset, a.length);
    }
    function js(a, c) {
      var v = -1, q = a.length;
      for (c || (c = Array(q)); ++v < q; )
        c[v] = a[v];
      return c;
    }
    function Yn(a, c, v, q) {
      v || (v = {});
      for (var te = -1, Z = c.length; ++te < Z; ) {
        var de = c[te], oe = void 0;
        Sr(v, de, oe === void 0 ? a[de] : oe);
      }
      return v;
    }
    function Us(a, c) {
      return Yn(a, Ct(a), c);
    }
    function Vs(a) {
      return Rs(a, Jn, Ct);
    }
    function an(a, c) {
      var v = a.__data__;
      return Gs(c) ? v[typeof c == "string" ? "string" : "hash"] : v.map;
    }
    function it(a, c) {
      var v = fe(a, c);
      return Ds(v) ? v : void 0;
    }
    var Ct = M ? Qt(M, Object) : Ys, kt = $s;
    (Re && kt(new Re(new ArrayBuffer(1))) != ie || Tt && kt(new Tt()) != h || Ke && kt(Ke.resolve()) != k || Ft && kt(new Ft()) != I || Ye && kt(new Ye()) != W) && (kt = function(a) {
      var c = st.call(a), v = c == S ? a.constructor : void 0, q = v ? Ue(v) : void 0;
      if (q)
        switch (q) {
          case Vn:
            return ie;
          case rn:
            return h;
          case zn:
            return k;
          case Hn:
            return I;
          case Kn:
            return W;
        }
      return c;
    });
    function zs(a) {
      var c = a.length, v = a.constructor(c);
      return c && typeof a[0] == "string" && Ze.call(a, "index") && (v.index = a.index, v.input = a.input), v;
    }
    function bt(a) {
      return typeof a.constructor == "function" && !Lr(a) ? Os(He(a)) : {};
    }
    function Hs(a, c, v, q) {
      var te = a.constructor;
      switch (c) {
        case H:
          return Zn(a);
        case o:
        case u:
          return new te(+a);
        case ie:
          return sn(a, q);
        case re:
        case ge:
        case Ae:
        case we:
        case y:
        case B:
        case C:
        case L:
        case f:
          return Ps(a, q);
        case h:
          return Cr(a, q, v);
        case g:
        case P:
          return new te(a);
        case _:
          return kr(a);
        case I:
          return Fs(a, q, v);
        case U:
          return Ms(a);
      }
    }
    function Ks(a, c) {
      return c = c ?? s, !!c && (typeof a == "number" || E.test(a)) && a > -1 && a % 1 == 0 && a < c;
    }
    function Gs(a) {
      var c = typeof a;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? a !== "__proto__" : a === null;
    }
    function Ws(a) {
      return !!en && en in a;
    }
    function Lr(a) {
      var c = a && a.constructor, v = typeof c == "function" && c.prototype || $t;
      return a === v;
    }
    function Ue(a) {
      if (a != null) {
        try {
          return Et.call(a);
        } catch {
        }
        try {
          return a + "";
        } catch {
        }
      }
      return "";
    }
    function _r(a) {
      return Wn(a, !0, !0);
    }
    function qr(a, c) {
      return a === c || a !== a && c !== c;
    }
    function Nn(a) {
      return Zs(a) && Ze.call(a, "callee") && (!x.call(a, "callee") || st.call(a) == i);
    }
    var Xn = Array.isArray;
    function Tn(a) {
      return a != null && Or(a.length) && !Qn(a);
    }
    function Zs(a) {
      return Rr(a) && Tn(a);
    }
    var Ir = ee || Xs;
    function Qn(a) {
      var c = yt(a) ? st.call(a) : "";
      return c == p || c == b;
    }
    function Or(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= s;
    }
    function yt(a) {
      var c = typeof a;
      return !!a && (c == "object" || c == "function");
    }
    function Rr(a) {
      return !!a && typeof a == "object";
    }
    function Jn(a) {
      return Tn(a) ? wn(a) : Bs(a);
    }
    function Ys() {
      return [];
    }
    function Xs() {
      return !1;
    }
    n.exports = _r;
  })(rr, rr.exports)), rr.exports;
}
var sr = { exports: {} };
sr.exports;
var $a;
function ho() {
  return $a || ($a = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 1, i = 2, l = 9007199254740991, o = "[object Arguments]", u = "[object Array]", d = "[object AsyncFunction]", p = "[object Boolean]", b = "[object Date]", h = "[object Error]", g = "[object Function]", S = "[object GeneratorFunction]", k = "[object Map]", _ = "[object Number]", I = "[object Null]", P = "[object Object]", U = "[object Promise]", W = "[object Proxy]", H = "[object RegExp]", ie = "[object Set]", re = "[object String]", ge = "[object Symbol]", Ae = "[object Undefined]", we = "[object WeakMap]", y = "[object ArrayBuffer]", B = "[object DataView]", C = "[object Float32Array]", L = "[object Float64Array]", f = "[object Int8Array]", m = "[object Int16Array]", N = "[object Int32Array]", T = "[object Uint8Array]", E = "[object Uint8ClampedArray]", D = "[object Uint16Array]", j = "[object Uint32Array]", G = /[\\^$.*+?()[\]{}|]/g, Q = /^\[object .+?Constructor\]$/, ae = /^(?:0|[1-9]\d*)$/, Y = {};
    Y[C] = Y[L] = Y[f] = Y[m] = Y[N] = Y[T] = Y[E] = Y[D] = Y[j] = !0, Y[o] = Y[u] = Y[y] = Y[p] = Y[B] = Y[b] = Y[h] = Y[g] = Y[k] = Y[_] = Y[P] = Y[H] = Y[ie] = Y[re] = Y[we] = !1;
    var be = typeof zt == "object" && zt && zt.Object === Object && zt, ye = typeof self == "object" && self && self.Object === Object && self, ne = be || ye || Function("return this")(), ue = e && !e.nodeType && e, le = ue && !0 && n && !n.nodeType && n, ce = le && le.exports === ue, he = ce && be.process, fe = (function() {
      try {
        return he && he.binding && he.binding("util");
      } catch {
      }
    })(), Ee = fe && fe.isTypedArray;
    function ke(a, c) {
      for (var v = -1, q = a == null ? 0 : a.length, te = 0, Z = []; ++v < q; ) {
        var de = a[v];
        c(de, v, a) && (Z[te++] = de);
      }
      return Z;
    }
    function Qt(a, c) {
      for (var v = -1, q = c.length, te = a.length; ++v < q; )
        a[te + v] = c[v];
      return a;
    }
    function xn(a, c) {
      for (var v = -1, q = a == null ? 0 : a.length; ++v < q; )
        if (c(a[v], v, a))
          return !0;
      return !1;
    }
    function jn(a, c) {
      for (var v = -1, q = Array(a); ++v < a; )
        q[v] = c(v);
      return q;
    }
    function Un(a) {
      return function(c) {
        return a(c);
      };
    }
    function $t(a, c) {
      return a.has(c);
    }
    function Jt(a, c) {
      return a?.[c];
    }
    function en(a) {
      var c = -1, v = Array(a.size);
      return a.forEach(function(q, te) {
        v[++c] = [te, q];
      }), v;
    }
    function Et(a, c) {
      return function(v) {
        return a(c(v));
      };
    }
    function Ze(a) {
      var c = -1, v = Array(a.size);
      return a.forEach(function(q) {
        v[++c] = q;
      }), v;
    }
    var st = Array.prototype, Dt = Function.prototype, Nt = Object.prototype, Bt = ne["__core-js_shared__"], tn = Dt.toString, He = Nt.hasOwnProperty, w = (function() {
      var a = /[^.]+$/.exec(Bt && Bt.keys && Bt.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), x = Nt.toString, O = RegExp(
      "^" + tn.call(He).replace(G, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), M = ce ? ne.Buffer : void 0, ee = ne.Symbol, pe = ne.Uint8Array, Re = Nt.propertyIsEnumerable, Tt = st.splice, Ke = ee ? ee.toStringTag : void 0, Ft = Object.getOwnPropertySymbols, Ye = M ? M.isBuffer : void 0, nn = Et(Object.keys, Object), Vn = Ct(ne, "DataView"), rn = Ct(ne, "Map"), zn = Ct(ne, "Promise"), Hn = Ct(ne, "Set"), Kn = Ct(ne, "WeakMap"), Mt = Ct(Object, "create"), Nr = Ue(Vn), St = Ue(rn), ms = Ue(zn), gs = Ue(Hn), bs = Ue(Kn), Tr = ee ? ee.prototype : void 0, Gn = Tr ? Tr.valueOf : void 0;
    function Le(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.clear(); ++c < v; ) {
        var q = a[c];
        this.set(q[0], q[1]);
      }
    }
    function ys() {
      this.__data__ = Mt ? Mt(null) : {}, this.size = 0;
    }
    function vs(a) {
      var c = this.has(a) && delete this.__data__[a];
      return this.size -= c ? 1 : 0, c;
    }
    function xs(a) {
      var c = this.__data__;
      if (Mt) {
        var v = c[a];
        return v === r ? void 0 : v;
      }
      return He.call(c, a) ? c[a] : void 0;
    }
    function ws(a) {
      var c = this.__data__;
      return Mt ? c[a] !== void 0 : He.call(c, a);
    }
    function As(a, c) {
      var v = this.__data__;
      return this.size += this.has(a) ? 0 : 1, v[a] = Mt && c === void 0 ? r : c, this;
    }
    Le.prototype.clear = ys, Le.prototype.delete = vs, Le.prototype.get = xs, Le.prototype.has = ws, Le.prototype.set = As;
    function $e(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.clear(); ++c < v; ) {
        var q = a[c];
        this.set(q[0], q[1]);
      }
    }
    function Es() {
      this.__data__ = [], this.size = 0;
    }
    function Ns(a) {
      var c = this.__data__, v = En(c, a);
      if (v < 0)
        return !1;
      var q = c.length - 1;
      return v == q ? c.pop() : Tt.call(c, v, 1), --this.size, !0;
    }
    function Ts(a) {
      var c = this.__data__, v = En(c, a);
      return v < 0 ? void 0 : c[v][1];
    }
    function Ss(a) {
      return En(this.__data__, a) > -1;
    }
    function Cs(a, c) {
      var v = this.__data__, q = En(v, a);
      return q < 0 ? (++this.size, v.push([a, c])) : v[q][1] = c, this;
    }
    $e.prototype.clear = Es, $e.prototype.delete = Ns, $e.prototype.get = Ts, $e.prototype.has = Ss, $e.prototype.set = Cs;
    function Ge(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.clear(); ++c < v; ) {
        var q = a[c];
        this.set(q[0], q[1]);
      }
    }
    function ks() {
      this.size = 0, this.__data__ = {
        hash: new Le(),
        map: new (rn || $e)(),
        string: new Le()
      };
    }
    function Ls(a) {
      var c = it(this, a).delete(a);
      return this.size -= c ? 1 : 0, c;
    }
    function _s(a) {
      return it(this, a).get(a);
    }
    function qs(a) {
      return it(this, a).has(a);
    }
    function Is(a, c) {
      var v = it(this, a), q = v.size;
      return v.set(a, c), this.size += v.size == q ? 0 : 1, this;
    }
    Ge.prototype.clear = ks, Ge.prototype.delete = Ls, Ge.prototype.get = _s, Ge.prototype.has = qs, Ge.prototype.set = Is;
    function wn(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.__data__ = new Ge(); ++c < v; )
        this.add(a[c]);
    }
    function Sr(a) {
      return this.__data__.set(a, r), this;
    }
    function An(a) {
      return this.__data__.has(a);
    }
    wn.prototype.add = wn.prototype.push = Sr, wn.prototype.has = An;
    function gt(a) {
      var c = this.__data__ = new $e(a);
      this.size = c.size;
    }
    function Wn() {
      this.__data__ = new $e(), this.size = 0;
    }
    function Os(a) {
      var c = this.__data__, v = c.delete(a);
      return this.size = c.size, v;
    }
    function Rs(a) {
      return this.__data__.get(a);
    }
    function $s(a) {
      return this.__data__.has(a);
    }
    function Ds(a, c) {
      var v = this.__data__;
      if (v instanceof $e) {
        var q = v.__data__;
        if (!rn || q.length < t - 1)
          return q.push([a, c]), this.size = ++v.size, this;
        v = this.__data__ = new Ge(q);
      }
      return v.set(a, c), this.size = v.size, this;
    }
    gt.prototype.clear = Wn, gt.prototype.delete = Os, gt.prototype.get = Rs, gt.prototype.has = $s, gt.prototype.set = Ds;
    function Bs(a, c) {
      var v = Nn(a), q = !v && qr(a), te = !v && !q && Tn(a), Z = !v && !q && !te && Rr(a), de = v || q || te || Z, oe = de ? jn(a.length, String) : [], Ne = oe.length;
      for (var me in a)
        He.call(a, me) && !(de && // Safari 9 has enumerable `arguments.length` in strict mode.
        (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        te && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Z && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
        Hs(me, Ne))) && oe.push(me);
      return oe;
    }
    function En(a, c) {
      for (var v = a.length; v--; )
        if (_r(a[v][0], c))
          return v;
      return -1;
    }
    function Zn(a, c, v) {
      var q = c(a);
      return Nn(a) ? q : Qt(q, v(a));
    }
    function sn(a) {
      return a == null ? a === void 0 ? Ae : I : Ke && Ke in Object(a) ? kt(a) : Lr(a);
    }
    function Cr(a) {
      return yt(a) && sn(a) == o;
    }
    function kr(a, c, v, q, te) {
      return a === c ? !0 : a == null || c == null || !yt(a) && !yt(c) ? a !== a && c !== c : Fs(a, c, v, q, kr, te);
    }
    function Fs(a, c, v, q, te, Z) {
      var de = Nn(a), oe = Nn(c), Ne = de ? u : bt(a), me = oe ? u : bt(c);
      Ne = Ne == o ? P : Ne, me = me == o ? P : me;
      var De = Ne == P, We = me == P, Se = Ne == me;
      if (Se && Tn(a)) {
        if (!Tn(c))
          return !1;
        de = !0, De = !1;
      }
      if (Se && !De)
        return Z || (Z = new gt()), de || Rr(a) ? Yn(a, c, v, q, te, Z) : Us(a, c, Ne, v, q, te, Z);
      if (!(v & s)) {
        var Be = De && He.call(a, "__wrapped__"), _e = We && He.call(c, "__wrapped__");
        if (Be || _e) {
          var Pt = Be ? a.value() : a, Lt = _e ? c.value() : c;
          return Z || (Z = new gt()), te(Pt, Lt, v, q, Z);
        }
      }
      return Se ? (Z || (Z = new gt()), Vs(a, c, v, q, te, Z)) : !1;
    }
    function Ms(a) {
      if (!Or(a) || Gs(a))
        return !1;
      var c = Ir(a) ? O : Q;
      return c.test(Ue(a));
    }
    function Ps(a) {
      return yt(a) && Qn(a.length) && !!Y[sn(a)];
    }
    function js(a) {
      if (!Ws(a))
        return nn(a);
      var c = [];
      for (var v in Object(a))
        He.call(a, v) && v != "constructor" && c.push(v);
      return c;
    }
    function Yn(a, c, v, q, te, Z) {
      var de = v & s, oe = a.length, Ne = c.length;
      if (oe != Ne && !(de && Ne > oe))
        return !1;
      var me = Z.get(a);
      if (me && Z.get(c))
        return me == c;
      var De = -1, We = !0, Se = v & i ? new wn() : void 0;
      for (Z.set(a, c), Z.set(c, a); ++De < oe; ) {
        var Be = a[De], _e = c[De];
        if (q)
          var Pt = de ? q(_e, Be, De, c, a, Z) : q(Be, _e, De, a, c, Z);
        if (Pt !== void 0) {
          if (Pt)
            continue;
          We = !1;
          break;
        }
        if (Se) {
          if (!xn(c, function(Lt, ln) {
            if (!$t(Se, ln) && (Be === Lt || te(Be, Lt, v, q, Z)))
              return Se.push(ln);
          })) {
            We = !1;
            break;
          }
        } else if (!(Be === _e || te(Be, _e, v, q, Z))) {
          We = !1;
          break;
        }
      }
      return Z.delete(a), Z.delete(c), We;
    }
    function Us(a, c, v, q, te, Z, de) {
      switch (v) {
        case B:
          if (a.byteLength != c.byteLength || a.byteOffset != c.byteOffset)
            return !1;
          a = a.buffer, c = c.buffer;
        case y:
          return !(a.byteLength != c.byteLength || !Z(new pe(a), new pe(c)));
        case p:
        case b:
        case _:
          return _r(+a, +c);
        case h:
          return a.name == c.name && a.message == c.message;
        case H:
        case re:
          return a == c + "";
        case k:
          var oe = en;
        case ie:
          var Ne = q & s;
          if (oe || (oe = Ze), a.size != c.size && !Ne)
            return !1;
          var me = de.get(a);
          if (me)
            return me == c;
          q |= i, de.set(a, c);
          var De = Yn(oe(a), oe(c), q, te, Z, de);
          return de.delete(a), De;
        case ge:
          if (Gn)
            return Gn.call(a) == Gn.call(c);
      }
      return !1;
    }
    function Vs(a, c, v, q, te, Z) {
      var de = v & s, oe = an(a), Ne = oe.length, me = an(c), De = me.length;
      if (Ne != De && !de)
        return !1;
      for (var We = Ne; We--; ) {
        var Se = oe[We];
        if (!(de ? Se in c : He.call(c, Se)))
          return !1;
      }
      var Be = Z.get(a);
      if (Be && Z.get(c))
        return Be == c;
      var _e = !0;
      Z.set(a, c), Z.set(c, a);
      for (var Pt = de; ++We < Ne; ) {
        Se = oe[We];
        var Lt = a[Se], ln = c[Se];
        if (q)
          var sa = de ? q(ln, Lt, Se, c, a, Z) : q(Lt, ln, Se, a, c, Z);
        if (!(sa === void 0 ? Lt === ln || te(Lt, ln, v, q, Z) : sa)) {
          _e = !1;
          break;
        }
        Pt || (Pt = Se == "constructor");
      }
      if (_e && !Pt) {
        var $r = a.constructor, Dr = c.constructor;
        $r != Dr && "constructor" in a && "constructor" in c && !(typeof $r == "function" && $r instanceof $r && typeof Dr == "function" && Dr instanceof Dr) && (_e = !1);
      }
      return Z.delete(a), Z.delete(c), _e;
    }
    function an(a) {
      return Zn(a, Jn, zs);
    }
    function it(a, c) {
      var v = a.__data__;
      return Ks(c) ? v[typeof c == "string" ? "string" : "hash"] : v.map;
    }
    function Ct(a, c) {
      var v = Jt(a, c);
      return Ms(v) ? v : void 0;
    }
    function kt(a) {
      var c = He.call(a, Ke), v = a[Ke];
      try {
        a[Ke] = void 0;
        var q = !0;
      } catch {
      }
      var te = x.call(a);
      return q && (c ? a[Ke] = v : delete a[Ke]), te;
    }
    var zs = Ft ? function(a) {
      return a == null ? [] : (a = Object(a), ke(Ft(a), function(c) {
        return Re.call(a, c);
      }));
    } : Ys, bt = sn;
    (Vn && bt(new Vn(new ArrayBuffer(1))) != B || rn && bt(new rn()) != k || zn && bt(zn.resolve()) != U || Hn && bt(new Hn()) != ie || Kn && bt(new Kn()) != we) && (bt = function(a) {
      var c = sn(a), v = c == P ? a.constructor : void 0, q = v ? Ue(v) : "";
      if (q)
        switch (q) {
          case Nr:
            return B;
          case St:
            return k;
          case ms:
            return U;
          case gs:
            return ie;
          case bs:
            return we;
        }
      return c;
    });
    function Hs(a, c) {
      return c = c ?? l, !!c && (typeof a == "number" || ae.test(a)) && a > -1 && a % 1 == 0 && a < c;
    }
    function Ks(a) {
      var c = typeof a;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? a !== "__proto__" : a === null;
    }
    function Gs(a) {
      return !!w && w in a;
    }
    function Ws(a) {
      var c = a && a.constructor, v = typeof c == "function" && c.prototype || Nt;
      return a === v;
    }
    function Lr(a) {
      return x.call(a);
    }
    function Ue(a) {
      if (a != null) {
        try {
          return tn.call(a);
        } catch {
        }
        try {
          return a + "";
        } catch {
        }
      }
      return "";
    }
    function _r(a, c) {
      return a === c || a !== a && c !== c;
    }
    var qr = Cr(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Cr : function(a) {
      return yt(a) && He.call(a, "callee") && !Re.call(a, "callee");
    }, Nn = Array.isArray;
    function Xn(a) {
      return a != null && Qn(a.length) && !Ir(a);
    }
    var Tn = Ye || Xs;
    function Zs(a, c) {
      return kr(a, c);
    }
    function Ir(a) {
      if (!Or(a))
        return !1;
      var c = sn(a);
      return c == g || c == S || c == d || c == W;
    }
    function Qn(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= l;
    }
    function Or(a) {
      var c = typeof a;
      return a != null && (c == "object" || c == "function");
    }
    function yt(a) {
      return a != null && typeof a == "object";
    }
    var Rr = Ee ? Un(Ee) : Ps;
    function Jn(a) {
      return Xn(a) ? Bs(a) : js(a);
    }
    function Ys() {
      return [];
    }
    function Xs() {
      return !1;
    }
    n.exports = Zs;
  })(sr, sr.exports)), sr.exports;
}
var Mr = {}, Da;
function Tm() {
  if (Da) return Mr;
  Da = 1, Object.defineProperty(Mr, "__esModule", { value: !0 });
  const n = co(), e = ho();
  var t;
  return (function(r) {
    function s(u = {}, d = {}, p = !1) {
      typeof u != "object" && (u = {}), typeof d != "object" && (d = {});
      let b = n(d);
      p || (b = Object.keys(b).reduce((h, g) => (b[g] != null && (h[g] = b[g]), h), {}));
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
    function l(u = {}, d = {}) {
      u = u || {};
      const p = Object.keys(d).reduce((b, h) => (d[h] !== u[h] && u[h] !== void 0 && (b[h] = d[h]), b), {});
      return Object.keys(u).reduce((b, h) => (u[h] !== d[h] && d[h] === void 0 && (b[h] = null), b), p);
    }
    r.invert = l;
    function o(u, d, p = !1) {
      if (typeof u != "object")
        return d;
      if (typeof d != "object")
        return;
      if (!p)
        return d;
      const b = Object.keys(d).reduce((h, g) => (u[g] === void 0 && (h[g] = d[g]), h), {});
      return Object.keys(b).length > 0 ? b : void 0;
    }
    r.transform = o;
  })(t || (t = {})), Mr.default = t, Mr;
}
var Pr = {}, Ba;
function fo() {
  if (Ba) return Pr;
  Ba = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  var n;
  return (function(e) {
    function t(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    e.length = t;
  })(n || (n = {})), Pr.default = n, Pr;
}
var jr = {}, Fa;
function Sm() {
  if (Fa) return jr;
  Fa = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  const n = fo();
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
        const i = this.offset, l = n.default.length(s);
        if (r >= l - i ? (r = l - i, this.index += 1, this.offset = 0) : this.offset += r, typeof s.delete == "number")
          return { delete: r };
        {
          const o = {};
          return s.attributes && (o.attributes = s.attributes), typeof s.retain == "number" ? o.retain = r : typeof s.retain == "object" && s.retain !== null ? o.retain = s.retain : typeof s.insert == "string" ? o.insert = s.insert.substr(i, r) : o.insert = s.insert, o;
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
          const r = this.offset, s = this.index, i = this.next(), l = this.ops.slice(this.index);
          return this.offset = r, this.index = s, [i].concat(l);
        }
      } else return [];
    }
  }
  return jr.default = e, jr;
}
var Ma;
function Cm() {
  return Ma || (Ma = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = Nm(), r = co(), s = ho(), i = Tm();
    e.AttributeMap = i.default;
    const l = fo();
    e.Op = l.default;
    const o = Sm();
    e.OpIterator = o.default;
    const u = "\0", d = (b, h) => {
      if (typeof b != "object" || b === null)
        throw new Error(`cannot retain a ${typeof b}`);
      if (typeof h != "object" || h === null)
        throw new Error(`cannot retain a ${typeof h}`);
      const g = Object.keys(b)[0];
      if (!g || g !== Object.keys(h)[0])
        throw new Error(`embed types not matched: ${g} != ${Object.keys(h)[0]}`);
      return [g, b[g], h[g]];
    };
    class p {
      constructor(h) {
        Array.isArray(h) ? this.ops = h : h != null && Array.isArray(h.ops) ? this.ops = h.ops : this.ops = [];
      }
      static registerEmbed(h, g) {
        this.handlers[h] = g;
      }
      static unregisterEmbed(h) {
        delete this.handlers[h];
      }
      static getHandler(h) {
        const g = this.handlers[h];
        if (!g)
          throw new Error(`no handlers for embed type "${h}"`);
        return g;
      }
      insert(h, g) {
        const S = {};
        return typeof h == "string" && h.length === 0 ? this : (S.insert = h, g != null && typeof g == "object" && Object.keys(g).length > 0 && (S.attributes = g), this.push(S));
      }
      delete(h) {
        return h <= 0 ? this : this.push({ delete: h });
      }
      retain(h, g) {
        if (typeof h == "number" && h <= 0)
          return this;
        const S = { retain: h };
        return g != null && typeof g == "object" && Object.keys(g).length > 0 && (S.attributes = g), this.push(S);
      }
      push(h) {
        let g = this.ops.length, S = this.ops[g - 1];
        if (h = r(h), typeof S == "object") {
          if (typeof h.delete == "number" && typeof S.delete == "number")
            return this.ops[g - 1] = { delete: S.delete + h.delete }, this;
          if (typeof S.delete == "number" && h.insert != null && (g -= 1, S = this.ops[g - 1], typeof S != "object"))
            return this.ops.unshift(h), this;
          if (s(h.attributes, S.attributes)) {
            if (typeof h.insert == "string" && typeof S.insert == "string")
              return this.ops[g - 1] = { insert: S.insert + h.insert }, typeof h.attributes == "object" && (this.ops[g - 1].attributes = h.attributes), this;
            if (typeof h.retain == "number" && typeof S.retain == "number")
              return this.ops[g - 1] = { retain: S.retain + h.retain }, typeof h.attributes == "object" && (this.ops[g - 1].attributes = h.attributes), this;
          }
        }
        return g === this.ops.length ? this.ops.push(h) : this.ops.splice(g, 0, h), this;
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
        const g = [], S = [];
        return this.forEach((k) => {
          (h(k) ? g : S).push(k);
        }), [g, S];
      }
      reduce(h, g) {
        return this.ops.reduce(h, g);
      }
      changeLength() {
        return this.reduce((h, g) => g.insert ? h + l.default.length(g) : g.delete ? h - g.delete : h, 0);
      }
      length() {
        return this.reduce((h, g) => h + l.default.length(g), 0);
      }
      slice(h = 0, g = 1 / 0) {
        const S = [], k = new o.default(this.ops);
        let _ = 0;
        for (; _ < g && k.hasNext(); ) {
          let I;
          _ < h ? I = k.next(h - _) : (I = k.next(g - _), S.push(I)), _ += l.default.length(I);
        }
        return new p(S);
      }
      compose(h) {
        const g = new o.default(this.ops), S = new o.default(h.ops), k = [], _ = S.peek();
        if (_ != null && typeof _.retain == "number" && _.attributes == null) {
          let P = _.retain;
          for (; g.peekType() === "insert" && g.peekLength() <= P; )
            P -= g.peekLength(), k.push(g.next());
          _.retain - P > 0 && S.next(_.retain - P);
        }
        const I = new p(k);
        for (; g.hasNext() || S.hasNext(); )
          if (S.peekType() === "insert")
            I.push(S.next());
          else if (g.peekType() === "delete")
            I.push(g.next());
          else {
            const P = Math.min(g.peekLength(), S.peekLength()), U = g.next(P), W = S.next(P);
            if (W.retain) {
              const H = {};
              if (typeof U.retain == "number")
                H.retain = typeof W.retain == "number" ? P : W.retain;
              else if (typeof W.retain == "number")
                U.retain == null ? H.insert = U.insert : H.retain = U.retain;
              else {
                const re = U.retain == null ? "insert" : "retain", [ge, Ae, we] = d(U[re], W.retain), y = p.getHandler(ge);
                H[re] = {
                  [ge]: y.compose(Ae, we, re === "retain")
                };
              }
              const ie = i.default.compose(U.attributes, W.attributes, typeof U.retain == "number");
              if (ie && (H.attributes = ie), I.push(H), !S.hasNext() && s(I.ops[I.ops.length - 1], H)) {
                const re = new p(g.rest());
                return I.concat(re).chop();
              }
            } else typeof W.delete == "number" && (typeof U.retain == "number" || typeof U.retain == "object" && U.retain !== null) && I.push(W);
          }
        return I.chop();
      }
      concat(h) {
        const g = new p(this.ops.slice());
        return h.ops.length > 0 && (g.push(h.ops[0]), g.ops = g.ops.concat(h.ops.slice(1))), g;
      }
      diff(h, g) {
        if (this.ops === h.ops)
          return new p();
        const S = [this, h].map((U) => U.map((W) => {
          if (W.insert != null)
            return typeof W.insert == "string" ? W.insert : u;
          const H = U === h ? "on" : "with";
          throw new Error("diff() called " + H + " non-document");
        }).join("")), k = new p(), _ = t(S[0], S[1], g, !0), I = new o.default(this.ops), P = new o.default(h.ops);
        return _.forEach((U) => {
          let W = U[1].length;
          for (; W > 0; ) {
            let H = 0;
            switch (U[0]) {
              case t.INSERT:
                H = Math.min(P.peekLength(), W), k.push(P.next(H));
                break;
              case t.DELETE:
                H = Math.min(W, I.peekLength()), I.next(H), k.delete(H);
                break;
              case t.EQUAL:
                H = Math.min(I.peekLength(), P.peekLength(), W);
                const ie = I.next(H), re = P.next(H);
                s(ie.insert, re.insert) ? k.retain(H, i.default.diff(ie.attributes, re.attributes)) : k.push(re).delete(H);
                break;
            }
            W -= H;
          }
        }), k.chop();
      }
      eachLine(h, g = `
`) {
        const S = new o.default(this.ops);
        let k = new p(), _ = 0;
        for (; S.hasNext(); ) {
          if (S.peekType() !== "insert")
            return;
          const I = S.peek(), P = l.default.length(I) - S.peekLength(), U = typeof I.insert == "string" ? I.insert.indexOf(g, P) - P : -1;
          if (U < 0)
            k.push(S.next());
          else if (U > 0)
            k.push(S.next(U));
          else {
            if (h(k, S.next(1).attributes || {}, _) === !1)
              return;
            _ += 1, k = new p();
          }
        }
        k.length() > 0 && h(k, {}, _);
      }
      invert(h) {
        const g = new p();
        return this.reduce((S, k) => {
          if (k.insert)
            g.delete(l.default.length(k));
          else {
            if (typeof k.retain == "number" && k.attributes == null)
              return g.retain(k.retain), S + k.retain;
            if (k.delete || typeof k.retain == "number") {
              const _ = k.delete || k.retain;
              return h.slice(S, S + _).forEach((P) => {
                k.delete ? g.push(P) : k.retain && k.attributes && g.retain(l.default.length(P), i.default.invert(k.attributes, P.attributes));
              }), S + _;
            } else if (typeof k.retain == "object" && k.retain !== null) {
              const _ = h.slice(S, S + 1), I = new o.default(_.ops).next(), [P, U, W] = d(k.retain, I.insert), H = p.getHandler(P);
              return g.retain({ [P]: H.invert(U, W) }, i.default.invert(k.attributes, I.attributes)), S + 1;
            }
          }
          return S;
        }, 0), g.chop();
      }
      transform(h, g = !1) {
        if (g = !!g, typeof h == "number")
          return this.transformPosition(h, g);
        const S = h, k = new o.default(this.ops), _ = new o.default(S.ops), I = new p();
        for (; k.hasNext() || _.hasNext(); )
          if (k.peekType() === "insert" && (g || _.peekType() !== "insert"))
            I.retain(l.default.length(k.next()));
          else if (_.peekType() === "insert")
            I.push(_.next());
          else {
            const P = Math.min(k.peekLength(), _.peekLength()), U = k.next(P), W = _.next(P);
            if (U.delete)
              continue;
            if (W.delete)
              I.push(W);
            else {
              const H = U.retain, ie = W.retain;
              let re = typeof ie == "object" && ie !== null ? ie : P;
              if (typeof H == "object" && H !== null && typeof ie == "object" && ie !== null) {
                const ge = Object.keys(H)[0];
                if (ge === Object.keys(ie)[0]) {
                  const Ae = p.getHandler(ge);
                  Ae && (re = {
                    [ge]: Ae.transform(H[ge], ie[ge], g)
                  });
                }
              }
              I.retain(re, i.default.transform(U.attributes, W.attributes, g));
            }
          }
        return I.chop();
      }
      transformPosition(h, g = !1) {
        g = !!g;
        const S = new o.default(this.ops);
        let k = 0;
        for (; S.hasNext() && k <= h; ) {
          const _ = S.peekLength(), I = S.peekType();
          if (S.next(), I === "delete") {
            h -= Math.min(_, h - k);
            continue;
          } else I === "insert" && (k < h || !g) && (h += _);
          k += _;
        }
        return h;
      }
    }
    p.Op = l.default, p.OpIterator = o.default, p.AttributeMap = i.default, p.handlers = {}, e.default = p, n.exports = p, n.exports.default = p;
  })(Fr, Fr.exports)), Fr.exports;
}
var rt = Cm();
const z = /* @__PURE__ */ uo(rt);
class mt extends Je {
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
mt.blotName = "break";
mt.tagName = "BR";
let ft = class extends ts {
};
const km = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function hs(n) {
  return n.replace(/[&<>"']/g, (e) => km[e]);
}
class Ve extends Hi {
  static allowedChildren = [Ve, mt, Je, ft];
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
    const r = Ve.order.indexOf(e), s = Ve.order.indexOf(t);
    return r >= 0 || s >= 0 ? r - s : e === t ? 0 : e < t ? -1 : 1;
  }
  formatAt(e, t, r, s) {
    if (Ve.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, K.BLOT)) {
      const i = this.isolate(e, t);
      s && i.wrap(r, s);
    } else
      super.formatAt(e, t, r, s);
  }
  optimize(e) {
    if (super.optimize(e), this.parent instanceof Ve && Ve.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const t = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(t), t.wrap(this);
    }
  }
}
const Pa = 1;
class Oe extends pr {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = po(this)), this.cache.delta;
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
    let l = this;
    s.reduce((o, u) => (l = l.split(o, !0), l.insertAt(0, u), u.length), e + i.length);
  }
  insertBefore(e, t) {
    const {
      head: r
    } = this.children;
    super.insertBefore(e, t), r instanceof mt && r.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + Pa), this.cache.length;
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
    if (t && (e === 0 || e >= this.length() - Pa)) {
      const s = this.clone();
      return e === 0 ? (this.parent.insertBefore(s, this), this) : (this.parent.insertBefore(s, this.next), s);
    }
    const r = super.split(e, t);
    return this.cache = {}, r;
  }
}
Oe.blotName = "block";
Oe.tagName = "P";
Oe.defaultChild = mt;
Oe.allowedChildren = [mt, Ve, Je, ft];
class nt extends Je {
  attach() {
    super.attach(), this.attributes = new cs(this.domNode);
  }
  delta() {
    return new z().insert(this.value(), {
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
`), i = s.pop(), l = s.map((u) => {
      const d = this.scroll.create(Oe.blotName);
      return d.insertAt(0, u), d;
    }), o = this.split(e);
    l.forEach((u) => {
      this.parent.insertBefore(u, o);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), o);
  }
}
nt.scope = K.BLOCK_BLOT;
function po(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n.descendants(Me).reduce((t, r) => r.length() === 0 ? t : t.insert(r.value(), et(r, {}, e)), new z()).insert(`
`, et(n));
}
function et(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return n == null || ("formats" in n && typeof n.formats == "function" && (e = {
    ...e,
    ...n.formats()
  }, t && delete e["code-token"]), n.parent == null || n.parent.statics.blotName === "scroll" || n.parent.statics.scope !== n.statics.scope) ? e : et(n.parent, e, t);
}
class ut extends Je {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(e, t, r) {
    super(e, t), this.selection = r, this.textNode = document.createTextNode(ut.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
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
    r != null && (this.savedLength = ut.CONTENTS.length, r.optimize(), r.formatAt(s, ut.CONTENTS.length, e, t), this.savedLength = 0);
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
    const t = this.prev instanceof ft ? this.prev : null, r = t ? t.length() : 0, s = this.next instanceof ft ? this.next : null, i = s ? s.text : "", {
      textNode: l
    } = this, o = l.data.split(ut.CONTENTS).join("");
    l.data = ut.CONTENTS;
    let u;
    if (t)
      u = t, (o || s) && (t.insertAt(t.length(), o + i), s && s.remove());
    else if (s)
      u = s, s.insertAt(0, o);
    else {
      const d = document.createTextNode(o);
      u = this.scroll.create(d), this.parent.insertBefore(u, this);
    }
    if (this.remove(), e) {
      const d = (h, g) => t && h === t.domNode ? g : h === l ? r + g - 1 : s && h === s.domNode ? r + o.length + g : null, p = d(e.start.node, e.start.offset), b = d(e.end.node, e.end.offset);
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
        this.savedLength = ut.CONTENTS.length, t.isolate(this.offset(t), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      t = t.parent;
    }
  }
  value() {
    return "";
  }
}
var ri = { exports: {} }, ja;
function Lm() {
  return ja || (ja = 1, (function(n) {
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
      var g = new s(p, b || u, h), S = t ? t + d : d;
      return u._events[S] ? u._events[S].fn ? u._events[S] = [u._events[S], g] : u._events[S].push(g) : (u._events[S] = g, u._eventsCount++), u;
    }
    function l(u, d) {
      --u._eventsCount === 0 ? u._events = new r() : delete u._events[d];
    }
    function o() {
      this._events = new r(), this._eventsCount = 0;
    }
    o.prototype.eventNames = function() {
      var d = [], p, b;
      if (this._eventsCount === 0) return d;
      for (b in p = this._events)
        e.call(p, b) && d.push(t ? b.slice(1) : b);
      return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(p)) : d;
    }, o.prototype.listeners = function(d) {
      var p = t ? t + d : d, b = this._events[p];
      if (!b) return [];
      if (b.fn) return [b.fn];
      for (var h = 0, g = b.length, S = new Array(g); h < g; h++)
        S[h] = b[h].fn;
      return S;
    }, o.prototype.listenerCount = function(d) {
      var p = t ? t + d : d, b = this._events[p];
      return b ? b.fn ? 1 : b.length : 0;
    }, o.prototype.emit = function(d, p, b, h, g, S) {
      var k = t ? t + d : d;
      if (!this._events[k]) return !1;
      var _ = this._events[k], I = arguments.length, P, U;
      if (_.fn) {
        switch (_.once && this.removeListener(d, _.fn, void 0, !0), I) {
          case 1:
            return _.fn.call(_.context), !0;
          case 2:
            return _.fn.call(_.context, p), !0;
          case 3:
            return _.fn.call(_.context, p, b), !0;
          case 4:
            return _.fn.call(_.context, p, b, h), !0;
          case 5:
            return _.fn.call(_.context, p, b, h, g), !0;
          case 6:
            return _.fn.call(_.context, p, b, h, g, S), !0;
        }
        for (U = 1, P = new Array(I - 1); U < I; U++)
          P[U - 1] = arguments[U];
        _.fn.apply(_.context, P);
      } else {
        var W = _.length, H;
        for (U = 0; U < W; U++)
          switch (_[U].once && this.removeListener(d, _[U].fn, void 0, !0), I) {
            case 1:
              _[U].fn.call(_[U].context);
              break;
            case 2:
              _[U].fn.call(_[U].context, p);
              break;
            case 3:
              _[U].fn.call(_[U].context, p, b);
              break;
            case 4:
              _[U].fn.call(_[U].context, p, b, h);
              break;
            default:
              if (!P) for (H = 1, P = new Array(I - 1); H < I; H++)
                P[H - 1] = arguments[H];
              _[U].fn.apply(_[U].context, P);
          }
      }
      return !0;
    }, o.prototype.on = function(d, p, b) {
      return i(this, d, p, b, !1);
    }, o.prototype.once = function(d, p, b) {
      return i(this, d, p, b, !0);
    }, o.prototype.removeListener = function(d, p, b, h) {
      var g = t ? t + d : d;
      if (!this._events[g]) return this;
      if (!p)
        return l(this, g), this;
      var S = this._events[g];
      if (S.fn)
        S.fn === p && (!h || S.once) && (!b || S.context === b) && l(this, g);
      else {
        for (var k = 0, _ = [], I = S.length; k < I; k++)
          (S[k].fn !== p || h && !S[k].once || b && S[k].context !== b) && _.push(S[k]);
        _.length ? this._events[g] = _.length === 1 ? _[0] : _ : l(this, g);
      }
      return this;
    }, o.prototype.removeAllListeners = function(d) {
      var p;
      return d ? (p = t ? t + d : d, this._events[p] && l(this, p)) : (this._events = new r(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, n.exports = o;
  })(ri)), ri.exports;
}
var _m = Lm();
const qm = /* @__PURE__ */ uo(_m), Ci = /* @__PURE__ */ new WeakMap(), ki = ["error", "warn", "log", "info"];
let Li = "warn";
function mo(n) {
  if (Li && ki.indexOf(n) <= ki.indexOf(Li)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
      t[r - 1] = arguments[r];
    console[n](...t);
  }
}
function Rt(n) {
  return ki.reduce((e, t) => (e[t] = mo.bind(console, t, n), e), {});
}
Rt.level = (n) => {
  Li = n;
};
mo.level = Rt.level;
const si = Rt("quill:events"), Im = ["selectionchange", "mousedown", "mouseup", "click"];
Im.forEach((n) => {
  document.addEventListener(n, function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    Array.from(document.querySelectorAll(".ql-container")).forEach((s) => {
      const i = Ci.get(s);
      i && i.emitter && i.emitter.handleDOM(...t);
    });
  });
});
class V extends qm {
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
        node: l,
        handler: o
      } = i;
      (e.target === l || l.contains(e.target)) && o(e, ...r);
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
class hn {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class Om {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new hn(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, V.sources.USER), 1);
    }), this.emitter.on(V.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const r = this.getNativeRange();
      r != null && r.start.node !== this.cursor.textNode && this.emitter.once(V.events.SCROLL_UPDATE, (s, i) => {
        try {
          this.root.contains(r.start.node) && this.root.contains(r.end.node) && this.setNativeRange(r.start.node, r.start.offset, r.end.node, r.end.offset);
          const l = i.some((o) => o.type === "characterData" || o.type === "childList" || o.type === "attributes" && o.target === this.root);
          this.update(l ? V.sources.SILENT : s);
        } catch {
        }
      });
    }), this.emitter.on(V.events.SCROLL_OPTIMIZE, (r, s) => {
      if (s.range) {
        const {
          startNode: i,
          startOffset: l,
          endNode: o,
          endOffset: u
        } = s.range;
        this.setNativeRange(i, l, o, u), this.update(V.sources.SILENT);
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
    let s, [i, l] = this.scroll.leaf(e);
    if (i == null) return null;
    if (t > 0 && l === i.length()) {
      const [p] = this.scroll.leaf(e + 1);
      if (p) {
        const [b] = this.scroll.line(e), [h] = this.scroll.line(e + 1);
        b === h && (i = p, l = 0);
      }
    }
    [s, l] = i.position(l, !0);
    const o = document.createRange();
    if (t > 0)
      return o.setStart(s, l), [i, l] = this.scroll.leaf(e + t), i == null ? null : ([s, l] = i.position(l, !0), o.setEnd(s, l), o.getBoundingClientRect());
    let u = "left", d;
    if (s instanceof Text) {
      if (!s.data.length)
        return null;
      l < s.data.length ? (o.setStart(s, l), o.setEnd(s, l + 1)) : (o.setStart(s, l - 1), o.setEnd(s, l), u = "right"), d = o.getBoundingClientRect();
    } else {
      if (!(i.domNode instanceof Element)) return null;
      d = i.domNode.getBoundingClientRect(), l > 0 && (u = "right");
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
    const r = t.map((l) => {
      const [o, u] = l, d = this.scroll.find(o, !0), p = d.offset(this.scroll);
      return u === 0 ? p : d instanceof Me ? p + d.index(o, u) : p + d.length();
    }), s = Math.min(Math.max(...r), this.scroll.length() - 1), i = Math.min(s, ...r);
    return new hn(i, s - i);
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
      const [l, o] = this.scroll.leaf(s);
      return l ? l.position(o, i) : [null, -1];
    };
    return [...r(e.index, !1), ...r(e.index + e.length, !0)];
  }
  setNativeRange(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : t, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (ii.info("setNativeRange", e, t, r, s), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
    r.parentNode == null))
      return;
    const l = document.getSelection();
    if (l != null)
      if (e != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: o
        } = this.getNativeRange() || {};
        if (o == null || i || e !== o.startContainer || t !== o.startOffset || r !== o.endContainer || s !== o.endOffset) {
          e instanceof Element && e.tagName === "BR" && (t = Array.from(e.parentNode.childNodes).indexOf(e), e = e.parentNode), r instanceof Element && r.tagName === "BR" && (s = Array.from(r.parentNode.childNodes).indexOf(r), r = r.parentNode);
          const u = document.createRange();
          u.setStart(e, t), u.setEnd(r, s), l.removeAllRanges(), l.addRange(u);
        }
      } else
        l.removeAllRanges(), this.root.blur();
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
    if (this.lastRange = r, this.lastNative = s, this.lastRange != null && (this.savedRange = this.lastRange), !zi(t, this.lastRange)) {
      if (!this.composing && s != null && s.native.collapsed && s.start.node !== this.cursor.textNode) {
        const l = this.cursor.restore();
        l && this.setNativeRange(l.startNode, l.startOffset, l.endNode, l.endOffset);
      }
      const i = [V.events.SELECTION_CHANGE, In(this.lastRange), In(t), e];
      this.emitter.emit(V.events.EDITOR_CHANGE, ...i), e !== V.sources.SILENT && this.emitter.emit(...i);
    }
  }
}
function ai(n, e) {
  try {
    e.parentNode;
  } catch {
    return !1;
  }
  return n.contains(e);
}
const Rm = /^[ -~]*$/;
class $m {
  constructor(e) {
    this.scroll = e, this.delta = this.getDelta();
  }
  applyDelta(e) {
    this.scroll.update();
    let t = this.scroll.length();
    this.scroll.batchStart();
    const r = Ua(e), s = new z();
    return Bm(r.ops.slice()).reduce((l, o) => {
      const u = rt.Op.length(o);
      let d = o.attributes || {}, p = !1, b = !1;
      if (o.insert != null) {
        if (s.retain(u), typeof o.insert == "string") {
          const S = o.insert;
          b = !S.endsWith(`
`) && (t <= l || !!this.scroll.descendant(nt, l)[0]), this.scroll.insertAt(l, S);
          const [k, _] = this.scroll.line(l);
          let I = Kt({}, et(k));
          if (k instanceof Oe) {
            const [P] = k.descendant(Me, _);
            P && (I = Kt(I, et(P)));
          }
          d = rt.AttributeMap.diff(I, d) || {};
        } else if (typeof o.insert == "object") {
          const S = Object.keys(o.insert)[0];
          if (S == null) return l;
          const k = this.scroll.query(S, K.INLINE) != null;
          if (k)
            (t <= l || this.scroll.descendant(nt, l)[0]) && (b = !0);
          else if (l > 0) {
            const [_, I] = this.scroll.descendant(Me, l - 1);
            _ instanceof ft ? _.value()[I] !== `
` && (p = !0) : _ instanceof Je && _.statics.scope === K.INLINE_BLOT && (p = !0);
          }
          if (this.scroll.insertAt(l, S, o.insert[S]), k) {
            const [_] = this.scroll.descendant(Me, l);
            if (_) {
              const I = Kt({}, et(_));
              d = rt.AttributeMap.diff(I, d) || {};
            }
          }
        }
        t += u;
      } else if (s.push(o), o.retain !== null && typeof o.retain == "object") {
        const S = Object.keys(o.retain)[0];
        if (S == null) return l;
        this.scroll.updateEmbedAt(l, S, o.retain[S]);
      }
      Object.keys(d).forEach((S) => {
        this.scroll.formatAt(l, u, S, d[S]);
      });
      const h = p ? 1 : 0, g = b ? 1 : 0;
      return t += h + g, s.retain(h), s.delete(g), l + u + h + g;
    }, 0), s.reduce((l, o) => typeof o.delete == "number" ? (this.scroll.deleteAt(l, o.delete), l) : l + rt.Op.length(o), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new z().retain(e).delete(t));
  }
  formatLine(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(r).forEach((i) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((l) => {
        l.format(i, r[i]);
      });
    }), this.scroll.optimize();
    const s = new z().retain(e).retain(t, In(r));
    return this.update(s);
  }
  formatText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((i) => {
      this.scroll.formatAt(e, t, i, r[i]);
    });
    const s = new z().retain(e).retain(t, In(r));
    return this.update(s);
  }
  getContents(e, t) {
    return this.delta.slice(e, e + t);
  }
  getDelta() {
    return this.scroll.lines().reduce((e, t) => e.concat(t.delta()), new z());
  }
  getFormat(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = [], s = [];
    t === 0 ? this.scroll.path(e).forEach((o) => {
      const [u] = o;
      u instanceof Oe ? r.push(u) : u instanceof Me && s.push(u);
    }) : (r = this.scroll.lines(e, t), s = this.scroll.descendants(Me, e, t));
    const [i, l] = [r, s].map((o) => {
      const u = o.shift();
      if (u == null) return {};
      let d = et(u);
      for (; Object.keys(d).length > 0; ) {
        const p = o.shift();
        if (p == null) return d;
        d = Dm(et(p), d);
      }
      return d;
    });
    return {
      ...i,
      ...l
    };
  }
  getHTML(e, t) {
    const [r, s] = this.scroll.line(e);
    if (r) {
      const i = r.length();
      return r.length() >= s + t && !(s === 0 && t === i) ? mr(r, s, t, !0) : mr(this.scroll, e, t, !0);
    }
    return "";
  }
  getText(e, t) {
    return this.getContents(e, t).filter((r) => typeof r.insert == "string").map((r) => r.insert).join("");
  }
  insertContents(e, t) {
    const r = Ua(t), s = new z().retain(e).concat(r);
    return this.scroll.insertContents(e, r), this.update(s);
  }
  insertEmbed(e, t, r) {
    return this.scroll.insertAt(e, t, r), this.update(new z().retain(e).insert({
      [t]: r
    }));
  }
  insertText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return t = t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(e, t), Object.keys(r).forEach((s) => {
      this.scroll.formatAt(e, t.length, s, r[s]);
    }), this.update(new z().retain(e).insert(t, In(r)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if (e?.statics.blotName !== Oe.blotName) return !1;
    const t = e;
    return t.children.length > 1 ? !1 : t.children.head instanceof mt;
  }
  removeFormat(e, t) {
    const r = this.getText(e, t), [s, i] = this.scroll.line(e + t);
    let l = 0, o = new z();
    s != null && (l = s.length() - i, o = s.delta().slice(i, i + l - 1).insert(`
`));
    const d = this.getContents(e, t + l).diff(new z().insert(r).concat(o)), p = new z().retain(e).concat(d);
    return this.applyDelta(p);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const s = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(Rm) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), l = et(i), o = i.offset(this.scroll), u = t[0].oldValue.replace(ut.CONTENTS, ""), d = new z().insert(u), p = new z().insert(i.value()), b = r && {
        oldRange: Va(r.oldRange, -o),
        newRange: Va(r.newRange, -o)
      };
      e = new z().retain(o).concat(d.diff(p, b)).reduce((g, S) => S.insert ? g.insert(S.insert, l) : g.push(S), new z()), this.delta = s.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !zi(s.compose(e), this.delta)) && (e = s.diff(this.delta, r));
    return e;
  }
}
function _n(n, e, t) {
  if (n.length === 0) {
    const [g] = li(t.pop());
    return e <= 0 ? `</li></${g}>` : `</li></${g}>${_n([], e - 1, t)}`;
  }
  const [{
    child: r,
    offset: s,
    length: i,
    indent: l,
    type: o
  }, ...u] = n, [d, p] = li(o);
  if (l > e)
    return t.push(o), l === e + 1 ? `<${d}><li${p}>${mr(r, s, i)}${_n(u, l, t)}` : `<${d}><li>${_n(n, e + 1, t)}`;
  const b = t[t.length - 1];
  if (l === e && o === b)
    return `</li><li${p}>${mr(r, s, i)}${_n(u, l, t)}`;
  const [h] = li(t.pop());
  return `</li></${h}>${_n(n, e - 1, t)}`;
}
function mr(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in n && typeof n.html == "function")
    return n.html(e, t);
  if (n instanceof ft)
    return hs(n.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (n instanceof ht) {
    if (n.statics.blotName === "list-container") {
      const d = [];
      return n.children.forEachAt(e, t, (p, b, h) => {
        const g = "formats" in p && typeof p.formats == "function" ? p.formats() : {};
        d.push({
          child: p,
          offset: b,
          length: h,
          indent: g.indent || 0,
          type: g.list
        });
      }), _n(d, -1, []);
    }
    const s = [];
    if (n.children.forEachAt(e, t, (d, p, b) => {
      s.push(mr(d, p, b));
    }), r || n.statics.blotName === "list")
      return s.join("");
    const {
      outerHTML: i,
      innerHTML: l
    } = n.domNode, [o, u] = i.split(`>${l}<`);
    return o === "<table" ? `<table style="border: 1px solid #000;">${s.join("")}<${u}` : `${o}>${s.join("")}<${u}`;
  }
  return n.domNode instanceof Element ? n.domNode.outerHTML : "";
}
function Dm(n, e) {
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
function Ua(n) {
  return n.reduce((e, t) => {
    if (typeof t.insert == "string") {
      const r = t.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return e.insert(r, t.attributes);
    }
    return e.push(t);
  }, new z());
}
function Va(n, e) {
  let {
    index: t,
    length: r
  } = n;
  return new hn(t + e, r);
}
function Bm(n) {
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
class At {
  static DEFAULTS = {};
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = e, this.options = t;
  }
}
const Ur = "\uFEFF";
class Gi extends Je {
  constructor(e, t) {
    super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((r) => {
      this.contentNode.appendChild(r);
    }), this.leftGuard = document.createTextNode(Ur), this.rightGuard = document.createTextNode(Ur), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(e, t) {
    return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
  }
  restore(e) {
    let t = null, r;
    const s = e.data.split(Ur).join("");
    if (e === this.leftGuard)
      if (this.prev instanceof ft) {
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
    else e === this.rightGuard && (this.next instanceof ft ? (this.next.insertAt(0, s), t = {
      startNode: this.next.domNode,
      startOffset: s.length
    }) : (r = document.createTextNode(s), this.parent.insertBefore(this.scroll.create(r), this.next), t = {
      startNode: r,
      startOffset: s.length
    }));
    return e.data = Ur, t;
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
class Fm {
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
class Pn {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: Pn
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
const Mm = (n) => n.parentElement || n.getRootNode().host || null, Pm = (n) => {
  const e = n.getBoundingClientRect(), t = "offsetWidth" in n && Math.abs(e.width) / n.offsetWidth || 1, r = "offsetHeight" in n && Math.abs(e.height) / n.offsetHeight || 1;
  return {
    top: e.top,
    right: e.left + n.clientWidth * t,
    bottom: e.top + n.clientHeight * r,
    left: e.left
  };
}, Vr = (n) => {
  const e = parseInt(n, 10);
  return Number.isNaN(e) ? 0 : e;
}, za = (n, e, t, r, s, i) => n < t && e > r ? 0 : n < t ? -(t - n + s) : e > r ? e - n > r - t ? n + s - t : e - r + i : 0, jm = (n, e) => {
  const t = n.ownerDocument;
  let r = e, s = n;
  for (; s; ) {
    const i = s === t.body, l = i ? {
      top: 0,
      right: window.visualViewport?.width ?? t.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? t.documentElement.clientHeight,
      left: 0
    } : Pm(s), o = getComputedStyle(s), u = za(r.left, r.right, l.left, l.right, Vr(o.scrollPaddingLeft), Vr(o.scrollPaddingRight)), d = za(r.top, r.bottom, l.top, l.bottom, Vr(o.scrollPaddingTop), Vr(o.scrollPaddingBottom));
    if (u || d)
      if (i)
        t.defaultView?.scrollBy(u, d);
      else {
        const {
          scrollLeft: p,
          scrollTop: b
        } = s;
        d && (s.scrollTop += d), u && (s.scrollLeft += u);
        const h = s.scrollLeft - p, g = s.scrollTop - b;
        r = {
          left: r.left - h,
          top: r.top - g,
          right: r.right - h,
          bottom: r.bottom - g
        };
      }
    s = i || o.position === "fixed" ? null : Mm(s);
  }
}, Um = 100, Vm = ["block", "break", "cursor", "inline", "scroll", "text"], zm = (n, e, t) => {
  const r = new Fn();
  return Vm.forEach((s) => {
    const i = e.query(s);
    i && r.register(i);
  }), n.forEach((s) => {
    let i = e.query(s);
    i || t.error(`Cannot register "${s}" specified in "formats" config. Are you sure it was registered?`);
    let l = 0;
    for (; i; )
      if (r.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, l += 1, l > Um) {
        t.error(`Cycle detected in registering blot requiredContainer: "${s}"`);
        break;
      }
  }), r;
}, Rn = Rt("quill"), zr = new Fn();
ht.uiClass = "ql-ui";
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
    registry: zr,
    theme: "default"
  };
  static events = V.events;
  static sources = V.sources;
  static version = "2.0.3";
  static imports = {
    delta: z,
    parchment: Em,
    "core/module": At,
    "core/theme": Pn
  };
  static debug(e) {
    e === !0 && (e = "log"), Rt.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Ci.get(e) || zr.find(e, t);
  }
  static import(e) {
    return this.imports[e] == null && Rn.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), r = "attrName" in e ? e.attrName : e.blotName;
      typeof r == "string" ? this.register(`formats/${r}`, e, t) : Object.keys(e).forEach((s) => {
        this.register(s, e[s], t);
      });
    } else {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], r = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[e] != null && !r && Rn.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && zr.register(t), typeof t.register == "function" && t.register(zr);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = Hm(e, t), this.container = this.options.container, this.container == null) {
      Rn.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && $.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Ci.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new V();
    const s = Ki.blotName, i = this.options.registry.query(s);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${s}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new $m(this.scroll), this.selection = new Om(this.scroll, this.emitter), this.composition = new Fm(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(V.events.EDITOR_CHANGE, (l) => {
      l === V.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(V.events.SCROLL_UPDATE, (l, o) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      at.call(this, () => this.editor.update(null, o, p), l);
    }), this.emitter.on(V.events.SCROLL_EMBED_UPDATE, (l, o) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      at.call(this, () => {
        const b = new z().retain(l.offset(this)).retain({
          [l.statics.blotName]: o
        });
        return this.editor.update(b, [], p);
      }, $.sources.USER);
    }), r) {
      const l = this.clipboard.convert({
        html: `${r}<p><br></p>`,
        text: `
`
      });
      this.setContents(l);
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
    return [e, t, , r] = _t(e, t, r), at.call(this, () => this.editor.deleteText(e, t), r, e, -1 * t);
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
    return at.call(this, () => {
      const s = this.getSelection(!0);
      let i = new z();
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
      return this.setSelection(s, V.sources.SILENT), i;
    }, r);
  }
  formatLine(e, t, r, s, i) {
    let l;
    return [e, t, l, i] = _t(
      e,
      t,
      // @ts-expect-error
      r,
      s,
      i
    ), at.call(this, () => this.editor.formatLine(e, t, l), i, e, 0);
  }
  formatText(e, t, r, s, i) {
    let l;
    return [e, t, l, i] = _t(
      // @ts-expect-error
      e,
      t,
      r,
      s,
      i
    ), at.call(this, () => this.editor.formatText(e, t, l), i, e, 0);
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
    return [e, t] = _t(e, t), this.editor.getContents(e, t);
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
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = _t(e, t), this.editor.getHTML(e, t);
  }
  getText() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = _t(e, t), this.editor.getText(e, t);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(e, t, r) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : $.sources.API;
    return at.call(this, () => this.editor.insertEmbed(e, t, r), s, e);
  }
  insertText(e, t, r, s, i) {
    let l;
    return [e, , l, i] = _t(e, 0, r, s, i), at.call(this, () => this.editor.insertText(e, t, l), i, e, t.length);
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
    return [e, t, , r] = _t(e, t, r), at.call(this, () => this.editor.removeFormat(e, t), r, e);
  }
  scrollRectIntoView(e) {
    jm(this.root, e);
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
    return at.call(this, () => {
      e = new z(e);
      const r = this.getLength(), s = this.editor.deleteText(0, r), i = this.editor.insertContents(0, e), l = this.editor.deleteText(this.getLength() - 1, 1);
      return s.compose(i).compose(l);
    }, t);
  }
  setSelection(e, t, r) {
    e == null ? this.selection.setRange(null, t || $.sources.API) : ([e, t, , r] = _t(e, t, r), this.selection.setRange(new hn(Math.max(0, e), t), r), r !== V.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : V.sources.API;
    const r = new z().insert(e);
    return this.setContents(r, t);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : V.sources.USER;
    const t = this.scroll.update(e);
    return this.selection.update(e), t;
  }
  updateContents(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : V.sources.API;
    return at.call(this, () => (e = new z(e), this.editor.applyDelta(e)), t, !0);
  }
}
function Ha(n) {
  return typeof n == "string" ? document.querySelector(n) : n;
}
function oi(n) {
  return Object.entries(n ?? {}).reduce((e, t) => {
    let [r, s] = t;
    return {
      ...e,
      [r]: s === !0 ? {} : s
    };
  }, {});
}
function Ka(n) {
  return Object.fromEntries(Object.entries(n).filter((e) => e[1] !== void 0));
}
function Hm(n, e) {
  const t = Ha(n);
  if (!t)
    throw new Error("Invalid Quill container");
  const s = !e.theme || e.theme === $.DEFAULTS.theme ? Pn : $.import(`themes/${e.theme}`);
  if (!s)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: i,
    ...l
  } = $.DEFAULTS, {
    modules: o,
    ...u
  } = s.DEFAULTS;
  let d = oi(e.modules);
  d != null && d.toolbar && d.toolbar.constructor !== Object && (d = {
    ...d,
    toolbar: {
      container: d.toolbar
    }
  });
  const p = Kt({}, oi(i), oi(o), d), b = {
    ...l,
    ...Ka(u),
    ...Ka(e)
  };
  let h = e.registry;
  return h ? e.formats && Rn.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? zm(e.formats, b.registry, Rn) : b.registry, {
    ...b,
    registry: h,
    container: t,
    theme: s,
    modules: Object.entries(p).reduce((g, S) => {
      let [k, _] = S;
      if (!_) return g;
      const I = $.import(`modules/${k}`);
      return I == null ? (Rn.error(`Cannot load ${k} module. Are you sure you registered it?`), g) : {
        ...g,
        // @ts-expect-error
        [k]: Kt({}, I.DEFAULTS || {}, _)
      };
    }, {}),
    bounds: Ha(b.bounds)
  };
}
function at(n, e, t, r) {
  if (!this.isEnabled() && e === V.sources.USER && !this.allowReadOnlyEdits)
    return new z();
  let s = t == null ? null : this.getSelection();
  const i = this.editor.delta, l = n();
  if (s != null && (t === !0 && (t = s.index), r == null ? s = Ga(s, l, e) : r !== 0 && (s = Ga(s, t, r, e)), this.setSelection(s, V.sources.SILENT)), l.length() > 0) {
    const o = [V.events.TEXT_CHANGE, l, i, e];
    this.emitter.emit(V.events.EDITOR_CHANGE, ...o), e !== V.sources.SILENT && this.emitter.emit(...o);
  }
  return l;
}
function _t(n, e, t, r, s) {
  let i = {};
  return typeof n.index == "number" && typeof n.length == "number" ? typeof e != "number" ? (s = r, r = t, t = e, e = n.length, n = n.index) : (e = n.length, n = n.index) : typeof e != "number" && (s = r, r = t, t = e, e = 0), typeof t == "object" ? (i = t, s = r) : typeof t == "string" && (r != null ? i[t] = r : s = t), s = s || V.sources.API, [n, e, i, s];
}
function Ga(n, e, t, r) {
  const s = typeof t == "number" ? t : 0;
  if (n == null) return null;
  let i, l;
  return e && typeof e.transformPosition == "function" ? [i, l] = [n.index, n.index + n.length].map((o) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(o, r !== V.sources.USER)
  )) : [i, l] = [n.index, n.index + n.length].map((o) => o < e || o === e && r === V.sources.USER ? o : s >= 0 ? o + s : Math.max(e, o + s)), new hn(i, l - i);
}
class bn extends ds {
}
function Wa(n) {
  return n instanceof Oe || n instanceof nt;
}
function Za(n) {
  return typeof n.updateContent == "function";
}
class Km extends Ki {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = Oe;
  static allowedChildren = [Oe, nt, bn];
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
      if (r instanceof nt || i instanceof nt) {
        this.optimize();
        return;
      }
      const l = i.children.head instanceof mt ? null : i.children.head;
      r.moveChildren(i, l), r.remove();
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
    const r = this.deltaToRenderBlocks(t.concat(new z().insert(`
`))), s = r.pop();
    if (s == null) return;
    this.batchStart();
    const i = r.shift();
    if (i) {
      const u = i.type === "block" && (i.delta.length() === 0 || !this.descendant(nt, e)[0] && e < this.length()), d = i.type === "block" ? i.delta : new z().insert({
        [i.key]: i.value
      });
      ui(this, e, d);
      const p = i.type === "block" ? 1 : 0, b = e + d.length() + p;
      u && this.insertAt(b - 1, `
`);
      const h = et(this.line(e)[0]), g = rt.AttributeMap.diff(h, i.attributes) || {};
      Object.keys(g).forEach((S) => {
        this.formatAt(b - 1, 1, S, g[S]);
      }), e = b;
    }
    let [l, o] = this.children.find(e);
    if (r.length && (l && (l = l.split(o), o = 0), r.forEach((u) => {
      if (u.type === "block") {
        const d = this.createBlock(u.attributes, l || void 0);
        ui(d, 0, u.delta);
      } else {
        const d = this.create(u.key, u.value);
        this.insertBefore(d, l || void 0), Object.keys(u.attributes).forEach((p) => {
          d.format(p, u.attributes[p]);
        });
      }
    })), s.type === "block" && s.delta.length()) {
      const u = l ? l.offset(l.scroll) + o : this.length();
      ui(this, u, s.delta);
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
    return e === this.length() ? this.line(e - 1) : this.descendant(Wa, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (s, i, l) => {
      let o = [], u = l;
      return s.children.forEachAt(i, l, (d, p, b) => {
        Wa(d) ? o.push(d) : d instanceof ds && (o = o.concat(r(d, p, u))), u -= b;
      }), o;
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
      return i && !Za(i);
    }), e.length > 0 && this.emitter.emit(V.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(V.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, r) {
    const [s] = this.descendant((i) => i instanceof nt, e);
    s && s.statics.blotName === t && Za(s) && s.updateContent(r);
  }
  handleDragStart(e) {
    e.preventDefault();
  }
  deltaToRenderBlocks(e) {
    const t = [];
    let r = new z();
    return e.forEach((s) => {
      const i = s?.insert;
      if (i)
        if (typeof i == "string") {
          const l = i.split(`
`);
          l.slice(0, -1).forEach((u) => {
            r.insert(u, s.attributes), t.push({
              type: "block",
              delta: r,
              attributes: s.attributes ?? {}
            }), r = new z();
          });
          const o = l[l.length - 1];
          o && r.insert(o, s.attributes);
        } else {
          const l = Object.keys(i)[0];
          if (!l) return;
          this.query(l, K.INLINE) ? r.push(s) : (r.length() && t.push({
            type: "block",
            delta: r,
            attributes: {}
          }), r = new z(), t.push({
            type: "blockEmbed",
            key: l,
            value: i[l],
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
    Object.entries(e).forEach((o) => {
      let [u, d] = o;
      this.query(u, K.BLOCK & K.BLOT) != null ? r = u : s[u] = d;
    });
    const i = this.create(r || this.statics.defaultChild.blotName, r ? e[r] : void 0);
    this.insertBefore(i, t || void 0);
    const l = i.length();
    return Object.entries(s).forEach((o) => {
      let [u, d] = o;
      i.formatAt(0, l, u, d);
    }), i;
  }
}
function ui(n, e, t) {
  t.reduce((r, s) => {
    const i = rt.Op.length(s);
    let l = s.attributes || {};
    if (s.insert != null) {
      if (typeof s.insert == "string") {
        const o = s.insert;
        n.insertAt(r, o);
        const [u] = n.descendant(Me, r), d = et(u);
        l = rt.AttributeMap.diff(d, l) || {};
      } else if (typeof s.insert == "object") {
        const o = Object.keys(s.insert)[0];
        if (o == null) return r;
        if (n.insertAt(r, o, s.insert[o]), n.scroll.query(o, K.INLINE) != null) {
          const [d] = n.descendant(Me, r), p = et(d);
          l = rt.AttributeMap.diff(p, l) || {};
        }
      }
    }
    return Object.keys(l).forEach((o) => {
      n.formatAt(r, i, o, l[o]);
    }), r + i;
  }, e);
}
const Wi = {
  scope: K.BLOCK,
  whitelist: ["right", "center", "justify"]
}, Gm = new xt("align", "align", Wi), go = new pt("align", "ql-align", Wi), bo = new Xt("align", "text-align", Wi);
class yo extends Xt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((s) => `00${parseInt(s, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const Wm = new pt("color", "ql-color", {
  scope: K.INLINE
}), Zi = new yo("color", "color", {
  scope: K.INLINE
}), Zm = new pt("background", "ql-bg", {
  scope: K.INLINE
}), Yi = new yo("background", "background-color", {
  scope: K.INLINE
});
class yn extends bn {
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
class ze extends Oe {
  static TAB = "  ";
  static register() {
    $.register(yn);
  }
}
class Xi extends Ve {
}
Xi.blotName = "code";
Xi.tagName = "CODE";
ze.blotName = "code-block";
ze.className = "ql-code-block";
ze.tagName = "DIV";
yn.blotName = "code-block-container";
yn.className = "ql-code-block-container";
yn.tagName = "DIV";
yn.allowedChildren = [ze];
ze.allowedChildren = [ft, mt, ut];
ze.requiredContainer = yn;
const Qi = {
  scope: K.BLOCK,
  whitelist: ["rtl"]
}, vo = new xt("direction", "dir", Qi), xo = new pt("direction", "ql-direction", Qi), wo = new Xt("direction", "direction", Qi), Ao = {
  scope: K.INLINE,
  whitelist: ["serif", "monospace"]
}, Eo = new pt("font", "ql-font", Ao);
class Ym extends Xt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const No = new Ym("font", "font-family", Ao), To = new pt("size", "ql-size", {
  scope: K.INLINE,
  whitelist: ["small", "large", "huge"]
}), So = new Xt("size", "font-size", {
  scope: K.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), Xm = Rt("quill:keyboard"), Qm = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class fs extends At {
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
    const s = eg(e);
    if (s == null) {
      Xm.warn("Attempted to add invalid keyboard binding", s);
      return;
    }
    typeof t == "function" && (t = {
      handler: t
    }), typeof r == "function" && (r = {
      handler: r
    }), (Array.isArray(s.key) ? s.key : [s.key]).forEach((l) => {
      const o = {
        ...s,
        key: l,
        ...t,
        ...r
      };
      this.bindings[o.key] = this.bindings[o.key] || [], this.bindings[o.key].push(o);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (e) => {
      if (e.defaultPrevented || e.isComposing || e.keyCode === 229 && (e.key === "Enter" || e.key === "Backspace")) return;
      const s = (this.bindings[e.key] || []).concat(this.bindings[e.which] || []).filter((I) => fs.match(e, I));
      if (s.length === 0) return;
      const i = $.find(e.target, !0);
      if (i && i.scroll !== this.quill.scroll) return;
      const l = this.quill.getSelection();
      if (l == null || !this.quill.hasFocus()) return;
      const [o, u] = this.quill.getLine(l.index), [d, p] = this.quill.getLeaf(l.index), [b, h] = l.length === 0 ? [d, p] : this.quill.getLeaf(l.index + l.length), g = d instanceof ts ? d.value().slice(0, p) : "", S = b instanceof ts ? b.value().slice(h) : "", k = {
        collapsed: l.length === 0,
        // @ts-expect-error Fix me later
        empty: l.length === 0 && o.length() <= 1,
        format: this.quill.getFormat(l),
        line: o,
        offset: u,
        prefix: g,
        suffix: S,
        event: e
      };
      s.some((I) => {
        if (I.collapsed != null && I.collapsed !== k.collapsed || I.empty != null && I.empty !== k.empty || I.offset != null && I.offset !== k.offset)
          return !1;
        if (Array.isArray(I.format)) {
          if (I.format.every((P) => k.format[P] == null))
            return !1;
        } else if (typeof I.format == "object" && !Object.keys(I.format).every((P) => I.format[P] === !0 ? k.format[P] != null : I.format[P] === !1 ? k.format[P] == null : zi(I.format[P], k.format[P])))
          return !1;
        return I.prefix != null && !I.prefix.test(k.prefix) || I.suffix != null && !I.suffix.test(k.suffix) ? !1 : I.handler.call(this, l, k, I) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let l = new z().retain(e.index - r).delete(r);
    if (t.offset === 0) {
      const [o] = this.quill.getLine(e.index - 1);
      if (o && !(o.statics.blotName === "block" && o.length() <= 1)) {
        const d = i.formats(), p = this.quill.getFormat(e.index - 1, 1);
        if (s = rt.AttributeMap.diff(d, p) || {}, Object.keys(s).length > 0) {
          const b = new z().retain(e.index + i.length() - 2).retain(1, s);
          l = l.compose(b);
        }
      }
    }
    this.quill.updateContents(l, $.sources.USER), this.quill.focus();
  }
  handleDelete(e, t) {
    const r = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
    if (e.index >= this.quill.getLength() - r) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let l = new z().retain(e.index).delete(r);
    if (t.offset >= i.length() - 1) {
      const [o] = this.quill.getLine(e.index + 1);
      if (o) {
        const u = i.formats(), d = this.quill.getFormat(e.index, 1);
        s = rt.AttributeMap.diff(u, d) || {}, Object.keys(s).length > 0 && (l = l.retain(o.length() - 1).retain(1, s));
      }
    }
    this.quill.updateContents(l, $.sources.USER), this.quill.focus();
  }
  handleDeleteRange(e) {
    Ji({
      range: e,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(e, t) {
    const r = Object.keys(t.format).reduce((i, l) => (this.quill.scroll.query(l, K.BLOCK) && !Array.isArray(t.format[l]) && (i[l] = t.format[l]), i), {}), s = new z().retain(e.index).delete(e.length).insert(`
`, r);
    this.quill.updateContents(s, $.sources.USER), this.quill.setSelection(e.index + 1, $.sources.SILENT), this.quill.focus();
  }
}
const Jm = {
  bindings: {
    bold: ci("bold"),
    italic: ci("italic"),
    underline: ci("underline"),
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
    "indent code-block": Ya(!0),
    "outdent code-block": Ya(!1),
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
        const t = new z().retain(n.index).delete(n.length).insert("	");
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
        }, s = new z().retain(n.index).insert(`
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
        const [t, r] = this.quill.getLine(n.index), s = new z().retain(n.index).insert(`
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
          const [t, r, s, i] = e.getTable(n), l = tg(t, r, s, i);
          if (l == null) return;
          let o = t.offset();
          if (l < 0) {
            const u = new z().retain(o).insert(`
`);
            this.quill.updateContents(u, $.sources.USER), this.quill.setSelection(n.index + 1, n.length, $.sources.SILENT);
          } else if (l > 0) {
            o += t.length();
            const u = new z().retain(o).insert(`
`);
            this.quill.updateContents(u, $.sources.USER), this.quill.setSelection(o, $.sources.USER);
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
        const l = new z().retain(n.index - s).delete(t + 1).retain(r.length() - 2 - s).retain(1, {
          list: i
        });
        return this.quill.updateContents(l, $.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index - t, $.sources.SILENT), !1;
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
            const i = new z().retain(n.index + e.length() - t - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(i, $.sources.USER), this.quill.setSelection(n.index - 1, $.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": Hr("ArrowLeft", !1),
    "embed left shift": Hr("ArrowLeft", !0),
    "embed right": Hr("ArrowRight", !1),
    "embed right shift": Hr("ArrowRight", !0),
    "table down": Xa(!1),
    "table up": Xa(!0)
  }
};
fs.DEFAULTS = Jm;
function Ya(n) {
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
      const l = e.length === 0 ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
      let {
        index: o,
        length: u
      } = e;
      l.forEach((d, p) => {
        n ? (d.insertAt(0, i), p === 0 ? o += i.length : u += i.length) : d.domNode.textContent.startsWith(i) && (d.deleteAt(0, i.length), p === 0 ? o -= i.length : u -= i.length);
      }), this.quill.update($.sources.USER), this.quill.setSelection(o, u, $.sources.SILENT);
    }
  };
}
function Hr(n, e) {
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
      return i instanceof Je ? (n === "ArrowLeft" ? e ? this.quill.setSelection(r.index - 1, r.length + 1, $.sources.USER) : this.quill.setSelection(r.index - 1, $.sources.USER) : e ? this.quill.setSelection(r.index, r.length + 1, $.sources.USER) : this.quill.setSelection(r.index + r.length + 1, $.sources.USER), !1) : !0;
    }
  };
}
function ci(n) {
  return {
    key: n[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(n, !t.format[n], $.sources.USER);
    }
  };
}
function Xa(n) {
  return {
    key: n ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(e, t) {
      const r = n ? "prev" : "next", s = t.line, i = s.parent[r];
      if (i != null) {
        if (i.statics.blotName === "table-row") {
          let l = i.children.head, o = s;
          for (; o.prev != null; )
            o = o.prev, l = l.next;
          const u = l.offset(this.quill.scroll) + Math.min(t.offset, l.length() - 1);
          this.quill.setSelection(u, 0, $.sources.USER);
        }
      } else {
        const l = s.table()[r];
        l != null && (n ? this.quill.setSelection(l.offset(this.quill.scroll) + l.length() - 1, 0, $.sources.USER) : this.quill.setSelection(l.offset(this.quill.scroll), 0, $.sources.USER));
      }
      return !1;
    }
  };
}
function eg(n) {
  if (typeof n == "string" || typeof n == "number")
    n = {
      key: n
    };
  else if (typeof n == "object")
    n = In(n);
  else
    return null;
  return n.shortKey && (n[Qm] = n.shortKey, delete n.shortKey), n;
}
function Ji(n) {
  let {
    quill: e,
    range: t
  } = n;
  const r = e.getLines(t);
  let s = {};
  if (r.length > 1) {
    const i = r[0].formats(), l = r[r.length - 1].formats();
    s = rt.AttributeMap.diff(l, i) || {};
  }
  e.deleteText(t, $.sources.USER), Object.keys(s).length > 0 && e.formatLine(t.index, 1, s, $.sources.USER), e.setSelection(t.index, $.sources.SILENT);
}
function tg(n, e, t, r) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? r === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const ng = /font-weight:\s*normal/, rg = ["P", "OL", "UL"], Qa = (n) => n && rg.includes(n.tagName), sg = (n) => {
  Array.from(n.querySelectorAll("br")).filter((e) => Qa(e.previousElementSibling) && Qa(e.nextElementSibling)).forEach((e) => {
    e.parentNode?.removeChild(e);
  });
}, ig = (n) => {
  Array.from(n.querySelectorAll('b[style*="font-weight"]')).filter((e) => e.getAttribute("style")?.match(ng)).forEach((e) => {
    const t = n.createDocumentFragment();
    t.append(...e.childNodes), e.parentNode?.replaceChild(t, e);
  });
};
function ag(n) {
  n.querySelector('[id^="docs-internal-guid-"]') && (ig(n), sg(n));
}
const lg = /\bmso-list:[^;]*ignore/i, og = /\bmso-list:[^;]*\bl(\d+)/i, ug = /\bmso-list:[^;]*\blevel(\d+)/i, cg = (n, e) => {
  const t = n.getAttribute("style"), r = t?.match(og);
  if (!r)
    return null;
  const s = Number(r[1]), i = t?.match(ug), l = i ? Number(i[1]) : 1, o = new RegExp(`@list l${s}:level${l}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), u = e.match(o), d = u && u[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: s,
    indent: l,
    type: d,
    element: n
  };
}, dg = (n) => {
  const e = Array.from(n.querySelectorAll("[style*=mso-list]")), t = [], r = [];
  e.forEach((l) => {
    (l.getAttribute("style") || "").match(lg) ? t.push(l) : r.push(l);
  }), t.forEach((l) => l.parentNode?.removeChild(l));
  const s = n.documentElement.innerHTML, i = r.map((l) => cg(l, s)).filter((l) => l);
  for (; i.length; ) {
    const l = [];
    let o = i.shift();
    for (; o; )
      l.push(o), o = i.length && i[0]?.element === o.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      i[0].id === o.id ? i.shift() : null;
    const u = document.createElement("ul");
    l.forEach((b) => {
      const h = document.createElement("li");
      h.setAttribute("data-list", b.type), b.indent > 1 && h.setAttribute("class", `ql-indent-${b.indent - 1}`), h.innerHTML = b.element.innerHTML, u.appendChild(h);
    });
    const d = l[0]?.element, {
      parentNode: p
    } = d ?? {};
    d && p?.replaceChild(u, d), l.slice(1).forEach((b) => {
      let {
        element: h
      } = b;
      p?.removeChild(h);
    });
  }
};
function hg(n) {
  n.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && dg(n);
}
const fg = [hg, ag], pg = (n) => {
  n.documentElement && fg.forEach((e) => {
    e(n);
  });
}, mg = Rt("quill:clipboard"), gg = [[Node.TEXT_NODE, Lg], [Node.TEXT_NODE, el], ["br", Ag], [Node.ELEMENT_NODE, el], [Node.ELEMENT_NODE, wg], [Node.ELEMENT_NODE, xg], [Node.ELEMENT_NODE, Cg], ["li", Tg], ["ol, ul", Sg], ["pre", Eg], ["tr", kg], ["b", di("bold")], ["i", di("italic")], ["strike", di("strike")], ["style", Ng]], bg = [Gm, vo].reduce((n, e) => (n[e.keyName] = e, n), {}), Ja = [bo, Yi, Zi, wo, No, So].reduce((n, e) => (n[e.keyName] = e, n), {});
class yg extends At {
  static DEFAULTS = {
    matchers: []
  };
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (r) => this.onCaptureCopy(r, !1)), this.quill.root.addEventListener("cut", (r) => this.onCaptureCopy(r, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], gg.concat(this.options.matchers ?? []).forEach((r) => {
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
    if (s[ze.blotName])
      return new z().insert(r || "", {
        [ze.blotName]: s[ze.blotName]
      });
    if (!t)
      return new z().insert(r || "", s);
    const i = this.convertHTML(t);
    return xr(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || s.table) ? i.compose(new z().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(e) {
    pg(e);
  }
  convertHTML(e) {
    const t = new DOMParser().parseFromString(e, "text/html");
    this.normalizeHTML(t);
    const r = t.body, s = /* @__PURE__ */ new WeakMap(), [i, l] = this.prepareMatching(r, s);
    return ea(this.quill.scroll, r, i, l, s);
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
      this.quill.updateContents(new z().retain(e).concat(s), r), this.quill.setSelection(e + s.length(), $.sources.SILENT);
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
      const l = e.clipboardData?.getData("text/uri-list");
      l && (s = this.normalizeURIList(l));
    }
    const i = Array.from(e.clipboardData?.files || []);
    if (!r && i.length > 0) {
      this.quill.uploader.upload(t, i);
      return;
    }
    if (r && i.length > 0) {
      const l = new DOMParser().parseFromString(r, "text/html");
      if (l.body.childElementCount === 1 && l.body.firstElementChild?.tagName === "IMG") {
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
    const i = this.quill.getFormat(e.index), l = this.convert({
      text: r,
      html: s
    }, i);
    mg.log("onPaste", l, {
      text: r,
      html: s
    });
    const o = new z().retain(e.index).delete(e.length).concat(l);
    this.quill.updateContents(o, $.sources.USER), this.quill.setSelection(o.length() - e.length, $.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(e, t) {
    const r = [], s = [];
    return this.matchers.forEach((i) => {
      const [l, o] = i;
      switch (l) {
        case Node.TEXT_NODE:
          s.push(o);
          break;
        case Node.ELEMENT_NODE:
          r.push(o);
          break;
        default:
          Array.from(e.querySelectorAll(l)).forEach((u) => {
            t.has(u) ? t.get(u)?.push(o) : t.set(u, [o]);
          });
          break;
      }
    }), [r, s];
  }
}
function vn(n, e, t, r) {
  return r.query(e) ? n.reduce((s, i) => {
    if (!i.insert) return s;
    if (i.attributes && i.attributes[e])
      return s.push(i);
    const l = t ? {
      [e]: t
    } : {};
    return s.insert(i.insert, {
      ...l,
      ...i.attributes
    });
  }, new z()) : n;
}
function xr(n, e) {
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
  return t && t.prototype instanceof Je ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(n.tagName.toLowerCase());
}
function vg(n, e) {
  return n.previousElementSibling && n.nextElementSibling && !Ht(n.previousElementSibling, e) && !Ht(n.nextElementSibling, e);
}
const Kr = /* @__PURE__ */ new WeakMap();
function Co(n) {
  return n == null ? !1 : (Kr.has(n) || (n.tagName === "PRE" ? Kr.set(n, !0) : Kr.set(n, Co(n.parentNode))), Kr.get(n));
}
function ea(n, e, t, r, s) {
  return e.nodeType === e.TEXT_NODE ? r.reduce((i, l) => l(e, i, n), new z()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, l) => {
    let o = ea(n, l, t, r, s);
    return l.nodeType === e.ELEMENT_NODE && (o = t.reduce((u, d) => d(l, u, n), o), o = (s.get(l) || []).reduce((u, d) => d(l, u, n), o)), i.concat(o);
  }, new z()) : new z();
}
function di(n) {
  return (e, t, r) => vn(t, n, !0, r);
}
function xg(n, e, t) {
  const r = xt.keys(n), s = pt.keys(n), i = Xt.keys(n), l = {};
  return r.concat(s).concat(i).forEach((o) => {
    let u = t.query(o, K.ATTRIBUTE);
    u != null && (l[u.attrName] = u.value(n), l[u.attrName]) || (u = bg[o], u != null && (u.attrName === o || u.keyName === o) && (l[u.attrName] = u.value(n) || void 0), u = Ja[o], u != null && (u.attrName === o || u.keyName === o) && (u = Ja[o], l[u.attrName] = u.value(n) || void 0));
  }), Object.entries(l).reduce((o, u) => {
    let [d, p] = u;
    return vn(o, d, p, t);
  }, e);
}
function wg(n, e, t) {
  const r = t.query(n);
  if (r == null) return e;
  if (r.prototype instanceof Je) {
    const s = {}, i = r.value(n);
    if (i != null)
      return s[r.blotName] = i, new z().insert(s, r.formats(n, t));
  } else if (r.prototype instanceof pr && !xr(e, `
`) && e.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return vn(e, r.blotName, r.formats(n, t), t);
  return e;
}
function Ag(n, e) {
  return xr(e, `
`) || e.insert(`
`), e;
}
function Eg(n, e, t) {
  const r = t.query("code-block"), s = r && "formats" in r && typeof r.formats == "function" ? r.formats(n, t) : !0;
  return vn(e, "code-block", s, t);
}
function Ng() {
  return new z();
}
function Tg(n, e, t) {
  const r = t.query(n);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !xr(e, `
`))
    return e;
  let s = -1, i = n.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (s += 1), i = i.parentNode;
  return s <= 0 ? e : e.reduce((l, o) => o.insert ? o.attributes && typeof o.attributes.indent == "number" ? l.push(o) : l.insert(o.insert, {
    indent: s,
    ...o.attributes || {}
  }) : l, new z());
}
function Sg(n, e, t) {
  const r = n;
  let s = r.tagName === "OL" ? "ordered" : "bullet";
  const i = r.getAttribute("data-checked");
  return i && (s = i === "true" ? "checked" : "unchecked"), vn(e, "list", s, t);
}
function el(n, e, t) {
  if (!xr(e, `
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
function Cg(n, e, t) {
  const r = {}, s = n.style || {};
  return s.fontStyle === "italic" && (r.italic = !0), s.textDecoration === "underline" && (r.underline = !0), s.textDecoration === "line-through" && (r.strike = !0), (s.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(s.fontWeight, 10) >= 700) && (r.bold = !0), e = Object.entries(r).reduce((i, l) => {
    let [o, u] = l;
    return vn(i, o, u, t);
  }, e), parseFloat(s.textIndent || 0) > 0 ? new z().insert("	").concat(e) : e;
}
function kg(n, e, t) {
  const r = n.parentElement?.tagName === "TABLE" ? n.parentElement : n.parentElement?.parentElement;
  if (r != null) {
    const i = Array.from(r.querySelectorAll("tr")).indexOf(n) + 1;
    return vn(e, "table", i, t);
  }
  return e;
}
function Lg(n, e, t) {
  let r = n.data;
  if (n.parentElement?.tagName === "O:P")
    return e.insert(r.trim());
  if (!Co(n)) {
    if (r.trim().length === 0 && r.includes(`
`) && !vg(n, t))
      return e;
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (n.previousSibling == null && n.parentElement != null && Ht(n.parentElement, t) || n.previousSibling instanceof Element && Ht(n.previousSibling, t)) && (r = r.replace(/^ /, "")), (n.nextSibling == null && n.parentElement != null && Ht(n.parentElement, t) || n.nextSibling instanceof Element && Ht(n.nextSibling, t)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return e.insert(r);
}
class _g extends At {
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
    super(e, t), this.quill.on($.events.EDITOR_CHANGE, (r, s, i, l) => {
      r === $.events.SELECTION_CHANGE ? s && l !== $.sources.SILENT && (this.currentRange = s) : r === $.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || l === $.sources.USER ? this.record(s, i) : this.transform(s)), this.currentRange = _i(this.currentRange, s));
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
      range: _i(r.range, i)
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
      const l = this.stack.undo.pop();
      l && (r = r.compose(l.delta), s = l.range);
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
    tl(this.stack.undo, e), tl(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, $.sources.USER);
    else {
      const t = Ig(this.quill.scroll, e.delta);
      this.quill.setSelection(t, $.sources.USER);
    }
  }
}
function tl(n, e) {
  let t = e;
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const s = n[r];
    n[r] = {
      delta: t.transform(s.delta, !0),
      range: s.range && _i(s.range, t)
    }, t = s.delta.transform(t), n[r].delta.length() === 0 && n.splice(r, 1);
  }
}
function qg(n, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((r) => n.query(r, K.BLOCK) != null) : !1;
}
function Ig(n, e) {
  const t = e.reduce((s, i) => s + (i.delete || 0), 0);
  let r = e.length() - t;
  return qg(n, e) && (r -= 1), r;
}
function _i(n, e) {
  if (!n) return n;
  const t = e.transformPosition(n.index), r = e.transformPosition(n.index + n.length);
  return {
    index: t,
    length: r - t
  };
}
class ko extends At {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("drop", (r) => {
      r.preventDefault();
      let s = null;
      if (document.caretRangeFromPoint)
        s = document.caretRangeFromPoint(r.clientX, r.clientY);
      else if (document.caretPositionFromPoint) {
        const l = document.caretPositionFromPoint(r.clientX, r.clientY);
        s = document.createRange(), s.setStart(l.offsetNode, l.offset), s.setEnd(l.offsetNode, l.offset);
      }
      const i = s && e.selection.normalizeNative(s);
      if (i) {
        const l = e.selection.normalizedToRange(i);
        r.dataTransfer?.files && this.upload(l, r.dataTransfer.files);
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
ko.DEFAULTS = {
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
      const s = r.reduce((i, l) => i.insert({
        image: l
      }), new z().retain(n.index).delete(n.length));
      this.quill.updateContents(s, V.sources.USER), this.quill.setSelection(n.index + r.length, V.sources.SILENT);
    });
  }
};
const Og = ["insertText", "insertReplacementText"];
class Rg extends At {
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
      this.deleteRange(e), this.quill.updateContents(new z().retain(e.index).insert(t, r), $.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, $.sources.SILENT), !0;
  }
  handleBeforeInput(e) {
    if (this.quill.composition.isComposing || e.defaultPrevented || !Og.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const r = $g(e);
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
function $g(n) {
  return typeof n.data == "string" ? n.data : n.dataTransfer?.types.includes("text/plain") ? n.dataTransfer.getData("text/plain") : null;
}
const Dg = /Mac/i.test(navigator.platform), Bg = 100, Fg = (n) => !!(n.key === "ArrowLeft" || n.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
n.key === "ArrowUp" || n.key === "ArrowDown" || n.key === "Home" || Dg && n.key === "a" && n.ctrlKey === !0);
class Mg extends At {
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
        if (!(r instanceof ht) || !r.uiNode)
          return !0;
        const i = getComputedStyle(r.domNode).direction === "rtl";
        return i && s.key !== "ArrowRight" || !i && s.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (s.shiftKey ? 1 : 0), $.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && Fg(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + Bg, this.isListening) return;
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
    if (!(r instanceof ht) || !r.uiNode) return;
    const s = document.createRange();
    s.setStartAfter(r.uiNode), s.setEndAfter(r.uiNode), e.removeAllRanges(), e.addRange(s);
  }
}
$.register({
  "blots/block": Oe,
  "blots/block/embed": nt,
  "blots/break": mt,
  "blots/container": bn,
  "blots/cursor": ut,
  "blots/embed": Gi,
  "blots/inline": Ve,
  "blots/scroll": Km,
  "blots/text": ft,
  "modules/clipboard": yg,
  "modules/history": _g,
  "modules/keyboard": fs,
  "modules/uploader": ko,
  "modules/input": Rg,
  "modules/uiNode": Mg
});
class Pg extends pt {
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
const jg = new Pg("indent", "ql-indent", {
  scope: K.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Ug extends Oe {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class Vg extends Oe {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
class wr extends bn {
}
wr.blotName = "list-container";
wr.tagName = "OL";
class Ar extends Oe {
  static create(e) {
    const t = super.create();
    return t.setAttribute("data-list", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-list") || void 0;
  }
  static register() {
    $.register(wr);
  }
  constructor(e, t) {
    super(e, t);
    const r = t.ownerDocument.createElement("span"), s = (i) => {
      if (!e.isEnabled()) return;
      const l = this.statics.formats(t, e);
      l === "checked" ? (this.format("list", "unchecked"), i.preventDefault()) : l === "unchecked" && (this.format("list", "checked"), i.preventDefault());
    };
    r.addEventListener("mousedown", s), r.addEventListener("touchstart", s), this.attachUI(r);
  }
  format(e, t) {
    e === this.statics.blotName && t ? this.domNode.setAttribute("data-list", t) : super.format(e, t);
  }
}
Ar.blotName = "list";
Ar.tagName = "LI";
wr.allowedChildren = [Ar];
Ar.requiredContainer = wr;
class ta extends Ve {
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
class zg extends ta {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class ns extends Ve {
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
    return Lo(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
  }
  format(e, t) {
    e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
  }
}
function Lo(n, e) {
  const t = document.createElement("a");
  t.href = n;
  const r = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(r) > -1;
}
class Hg extends Ve {
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
class Kg extends ta {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class Gg extends Ve {
  static blotName = "underline";
  static tagName = "U";
}
class Wg extends Gi {
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
const nl = ["alt", "height", "width"];
let Zg = class extends Je {
  static blotName = "image";
  static tagName = "IMG";
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return nl.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static match(e) {
    return /\.(jpe?g|gif|png)$/.test(e) || /^data:image\/.+;base64/.test(e);
  }
  static sanitize(e) {
    return Lo(e, ["http", "https", "data"]) ? e : "//:0";
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    nl.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
};
const rl = ["height", "width"];
class Yg extends nt {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return rl.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static sanitize(e) {
    return ns.sanitize(e);
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    rl.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
  html() {
    const {
      video: e
    } = this.value();
    return `<a href="${e}">${e}</a>`;
  }
}
const ir = new pt("code-token", "hljs", {
  scope: K.INLINE
});
class It extends Ve {
  static formats(e, t) {
    for (; e != null && e !== t.domNode; ) {
      if (e.classList && e.classList.contains(ze.className))
        return super.formats(e, t);
      e = e.parentNode;
    }
  }
  constructor(e, t, r) {
    super(e, t, r), ir.add(this.domNode, r);
  }
  format(e, t) {
    e !== It.blotName ? super.format(e, t) : t ? ir.add(this.domNode, t) : (ir.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), ir.value(this.domNode) || this.unwrap();
  }
}
It.blotName = "code-token";
It.className = "ql-token";
class tt extends ze {
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
    return this.formatAt(0, this.length(), It.blotName, !1), super.replaceWith(e, t);
  }
}
class ur extends yn {
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
    const s = `${Array.from(this.domNode.childNodes).filter((l) => l !== this.uiNode).map((l) => l.textContent).join(`
`)}
`, i = tt.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== s) {
      if (s.trim().length > 0 || this.cachedText == null) {
        const l = this.children.reduce((u, d) => u.concat(po(d, !1)), new z()), o = e(s, i);
        l.diff(o).reduce((u, d) => {
          let {
            retain: p,
            attributes: b
          } = d;
          return p ? (b && Object.keys(b).forEach((h) => {
            [tt.blotName, It.blotName].includes(h) && this.formatAt(u, p, h, b[h]);
          }), u + p) : u;
        }, 0);
      }
      this.cachedText = s, this.forceNext = !1;
    }
  }
  html(e, t) {
    const [r] = this.children.find(e);
    return `<pre data-language="${r ? tt.formats(r.domNode) : "plain"}">
${hs(this.code(e, t))}
</pre>`;
  }
  optimize(e) {
    if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
      const t = tt.formats(this.children.head.domNode);
      t !== this.uiNode.value && (this.uiNode.value = t);
    }
  }
}
ur.allowedChildren = [tt];
tt.requiredContainer = ur;
tt.allowedChildren = [It, ut, ft, mt];
const Xg = (n, e, t) => {
  if (typeof n.versionString == "string") {
    const r = n.versionString.split(".")[0];
    if (parseInt(r, 10) >= 11)
      return n.highlight(t, {
        language: e
      }).value;
  }
  return n.highlight(e, t).value;
};
class _o extends At {
  static register() {
    $.register(It, !0), $.register(tt, !0), $.register(ur, !0);
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
      if (!(e instanceof ur)) return;
      const t = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((r) => {
        let {
          key: s,
          label: i
        } = r;
        const l = t.ownerDocument.createElement("option");
        l.textContent = i, l.setAttribute("value", s), t.appendChild(l);
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
    (e == null ? this.quill.scroll.descendants(ur) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update($.sources.SILENT), r != null && this.quill.setSelection(r, $.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return hs(e).split(`
`).reduce((s, i, l) => (l !== 0 && s.insert(`
`, {
        [ze.blotName]: t
      }), s.insert(i)), new z());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(ze.className), r.innerHTML = Xg(this.options.hljs, t, e), ea(this.quill.scroll, r, [(s, i) => {
      const l = ir.value(s);
      return l ? i.compose(new z().retain(i.length(), {
        [It.blotName]: l
      })) : i;
    }], [(s, i) => s.data.split(`
`).reduce((l, o, u) => (u !== 0 && l.insert(`
`, {
      [ze.blotName]: t
    }), l.insert(o)), i)], /* @__PURE__ */ new WeakMap());
  }
}
_o.DEFAULTS = {
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
class ct extends Oe {
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
    e === ct.blotName && t ? this.domNode.setAttribute("data-row", t) : super.format(e, t);
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
class fn extends bn {
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
class Gt extends bn {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class rs extends bn {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const e = this.descendants(fn), t = e.reduce((r, s) => Math.max(s.children.length, r), 0);
    e.forEach((r) => {
      new Array(t - r.children.length).fill(0).forEach(() => {
        let s;
        r.children.head != null && (s = ct.formats(r.children.head.domNode));
        const i = this.scroll.create(ct.blotName, s);
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
      const s = r.children.at(e), i = ct.formats(r.children.head.domNode), l = this.scroll.create(ct.blotName, i);
      r.insertBefore(l, s);
    });
  }
  insertRow(e) {
    const [t] = this.descendant(Gt);
    if (t == null || t.children.head == null) return;
    const r = na(), s = this.scroll.create(fn.blotName);
    t.children.head.children.forEach(() => {
      const l = this.scroll.create(ct.blotName, r);
      s.appendChild(l);
    });
    const i = t.children.at(e);
    t.insertBefore(s, i);
  }
  rows() {
    const e = this.children.head;
    return e == null ? [] : e.children.map((t) => t);
  }
}
rs.allowedChildren = [Gt];
Gt.requiredContainer = rs;
Gt.allowedChildren = [fn];
fn.requiredContainer = Gt;
fn.allowedChildren = [ct];
ct.requiredContainer = fn;
function na() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class Qg extends At {
  static register() {
    $.register(ct), $.register(fn), $.register(Gt), $.register(rs);
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
    if (t == null || t.statics.blotName !== ct.blotName)
      return [null, null, null, -1];
    const s = t.parent;
    return [s.parent.parent, s, t, r];
  }
  insertColumn(e) {
    const t = this.quill.getSelection();
    if (!t) return;
    const [r, s, i] = this.getTable(t);
    if (i == null) return;
    const l = i.cellOffset();
    r.insertColumn(l + e), this.quill.update($.sources.USER);
    let o = s.rowOffset();
    e === 0 && (o += 1), this.quill.setSelection(t.index + o, t.length, $.sources.SILENT);
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
    const l = s.rowOffset();
    r.insertRow(l + e), this.quill.update($.sources.USER), e > 0 ? this.quill.setSelection(t, $.sources.SILENT) : this.quill.setSelection(t.index + s.children.length, t.length, $.sources.SILENT);
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
      const l = new Array(t).fill(`
`).join("");
      return i.insert(l, {
        table: na()
      });
    }, new z().retain(r.index));
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
const sl = Rt("quill:toolbar");
class ra extends At {
  constructor(e, t) {
    if (super(e, t), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), Jg(r, this.options.container), e.container?.parentNode?.insertBefore(r, e.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      sl.error("Container required for toolbar", this.options);
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
      sl.warn("ignoring attaching to nonexistent format", t, e);
      return;
    }
    const r = e.tagName === "SELECT" ? "change" : "click";
    e.addEventListener(r, (s) => {
      let i;
      if (e.tagName === "SELECT") {
        if (e.selectedIndex < 0) return;
        const o = e.options[e.selectedIndex];
        o.hasAttribute("selected") ? i = !1 : i = o.value || !1;
      } else
        e.classList.contains("ql-active") ? i = !1 : i = e.value || !e.hasAttribute("value"), s.preventDefault();
      this.quill.focus();
      const [l] = this.quill.selection.getRange();
      if (this.handlers[t] != null)
        this.handlers[t].call(this, i);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(t).prototype instanceof Je
      ) {
        if (i = prompt(`Enter ${t}`), !i) return;
        this.quill.updateContents(new z().retain(l.index).delete(l.length).insert({
          [t]: i
        }), $.sources.USER);
      } else
        this.quill.format(t, i, $.sources.USER);
      this.update(l);
    }), this.controls.push([t, e]);
  }
  update(e) {
    const t = e == null ? {} : this.quill.getFormat(e);
    this.controls.forEach((r) => {
      const [s, i] = r;
      if (i.tagName === "SELECT") {
        let l = null;
        if (e == null)
          l = null;
        else if (t[s] == null)
          l = i.querySelector("option[selected]");
        else if (!Array.isArray(t[s])) {
          let o = t[s];
          typeof o == "string" && (o = o.replace(/"/g, '\\"')), l = i.querySelector(`option[value="${o}"]`);
        }
        l == null ? (i.value = "", i.selectedIndex = -1) : l.selected = !0;
      } else if (e == null)
        i.classList.remove("ql-active"), i.setAttribute("aria-pressed", "false");
      else if (i.hasAttribute("value")) {
        const l = t[s], o = l === i.getAttribute("value") || l != null && l.toString() === i.getAttribute("value") || l == null && !i.getAttribute("value");
        i.classList.toggle("ql-active", o), i.setAttribute("aria-pressed", o.toString());
      } else {
        const l = t[s] != null;
        i.classList.toggle("ql-active", l), i.setAttribute("aria-pressed", l.toString());
      }
    });
  }
}
ra.DEFAULTS = {};
function il(n, e, t) {
  const r = document.createElement("button");
  r.setAttribute("type", "button"), r.classList.add(`ql-${e}`), r.setAttribute("aria-pressed", "false"), t != null ? (r.value = t, r.setAttribute("aria-label", `${e}: ${t}`)) : r.setAttribute("aria-label", e), n.appendChild(r);
}
function Jg(n, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const r = document.createElement("span");
    r.classList.add("ql-formats"), t.forEach((s) => {
      if (typeof s == "string")
        il(r, s);
      else {
        const i = Object.keys(s)[0], l = s[i];
        Array.isArray(l) ? e0(r, i, l) : il(r, i, l);
      }
    }), n.appendChild(r);
  });
}
function e0(n, e, t) {
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
const t0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', n0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', r0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', s0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', i0 = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', a0 = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', l0 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', o0 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', al = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', u0 = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', c0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', d0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', h0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', f0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', p0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', m0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', g0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', b0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', y0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', v0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', x0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', w0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', A0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', E0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', N0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', T0 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', S0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', C0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', k0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', L0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', _0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', q0 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', I0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', gr = {
  align: {
    "": t0,
    center: n0,
    right: r0,
    justify: s0
  },
  background: i0,
  blockquote: a0,
  bold: l0,
  clean: o0,
  code: al,
  "code-block": al,
  color: u0,
  direction: {
    "": c0,
    rtl: d0
  },
  formula: h0,
  header: {
    1: f0,
    2: p0,
    3: m0,
    4: g0,
    5: b0,
    6: y0
  },
  italic: v0,
  image: x0,
  indent: {
    "+1": w0,
    "-1": A0
  },
  link: E0,
  list: {
    bullet: N0,
    check: T0,
    ordered: S0
  },
  script: {
    sub: C0,
    super: k0
  },
  strike: L0,
  table: _0,
  underline: q0,
  video: I0
}, O0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let ll = 0;
function ol(n, e) {
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
    this.container.classList.toggle("ql-expanded"), ol(this.label, "aria-expanded"), ol(this.options, "aria-hidden");
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
    return e.classList.add("ql-picker-label"), e.innerHTML = O0, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
  }
  buildOptions() {
    const e = document.createElement("span");
    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${ll}`, ll += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
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
class qo extends ps {
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
class Io extends ps {
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
const R0 = (n) => {
  const {
    overflowY: e
  } = getComputedStyle(n, null);
  return e !== "visible" && e !== "clip";
};
class Oo {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, R0(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
    let l = 0;
    if (i.right > s.right && (l = s.right - i.right, this.root.style.left = `${t + l}px`), i.left < s.left && (l = s.left - i.left, this.root.style.left = `${t + l}px`), i.bottom > s.bottom) {
      const o = i.bottom - i.top, u = e.bottom - e.top + o;
      this.root.style.top = `${r - u}px`, this.root.classList.add("ql-flip");
    }
    return l;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const $0 = [!1, "center", "right", "justify"], D0 = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], B0 = [!1, "serif", "monospace"], F0 = ["1", "2", "3", !1], M0 = ["small", !1, "large", "huge"];
class Er extends Pn {
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
            const l = r.value || "";
            l != null && t[i][l] && (r.innerHTML = t[i][l]);
          }
      });
    });
  }
  buildPickers(e, t) {
    this.pickers = Array.from(e).map((s) => {
      if (s.classList.contains("ql-align") && (s.querySelector("option") == null && nr(s, $0), typeof t.align == "object"))
        return new Io(s, t.align);
      if (s.classList.contains("ql-background") || s.classList.contains("ql-color")) {
        const i = s.classList.contains("ql-background") ? "background" : "color";
        return s.querySelector("option") == null && nr(s, D0, i === "background" ? "#ffffff" : "#000000"), new qo(s, t[i]);
      }
      return s.querySelector("option") == null && (s.classList.contains("ql-font") ? nr(s, B0) : s.classList.contains("ql-header") ? nr(s, F0) : s.classList.contains("ql-size") && nr(s, M0)), new ps(s);
    });
    const r = () => {
      this.pickers.forEach((s) => {
        s.update();
      });
    };
    this.quill.on(V.events.EDITOR_CHANGE, r);
  }
}
Er.DEFAULTS = Kt({}, Pn.DEFAULTS, {
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
class Ro extends Oo {
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
        e = P0(e);
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
function P0(n) {
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
const j0 = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class U0 extends Ro {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(e, t) {
    super(e, t), this.quill.on(V.events.EDITOR_CHANGE, (r, s, i, l) => {
      if (r === V.events.SELECTION_CHANGE)
        if (s != null && s.length > 0 && l === V.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const o = this.quill.getLines(s.index, s.length);
          if (o.length === 1) {
            const u = this.quill.getBounds(s);
            u != null && this.position(u);
          } else {
            const u = o[o.length - 1], d = this.quill.getIndex(u), p = Math.min(u.length() - 1, s.index + s.length - d), b = this.quill.getBounds(new hn(d, p));
            b != null && this.position(b);
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
class $o extends Er {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = j0), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new U0(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), gr), this.buildPickers(e.container.querySelectorAll("select"), gr));
  }
}
$o.DEFAULTS = Kt({}, Er.DEFAULTS, {
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
const V0 = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class z0 extends Ro {
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
          const [s, i] = this.quill.scroll.descendant(ns, e.index);
          if (s != null) {
            this.linkRange = new hn(e.index - i, s.length());
            const l = ns.formats(s.domNode);
            this.preview.textContent = l, this.preview.setAttribute("href", l), this.show();
            const o = this.quill.getBounds(this.linkRange);
            o != null && this.position(o);
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
class Do extends Er {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = V0), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), gr), this.buildPickers(e.container.querySelectorAll("select"), gr), this.tooltip = new z0(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, r) => {
      e.handlers.link.call(e, !r.format.link);
    }));
  }
}
Do.DEFAULTS = Kt({}, Er.DEFAULTS, {
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
  "attributors/attribute/direction": vo,
  "attributors/class/align": go,
  "attributors/class/background": Zm,
  "attributors/class/color": Wm,
  "attributors/class/direction": xo,
  "attributors/class/font": Eo,
  "attributors/class/size": To,
  "attributors/style/align": bo,
  "attributors/style/background": Yi,
  "attributors/style/color": Zi,
  "attributors/style/direction": wo,
  "attributors/style/font": No,
  "attributors/style/size": So
}, !0);
$.register({
  "formats/align": go,
  "formats/direction": xo,
  "formats/indent": jg,
  "formats/background": Yi,
  "formats/color": Zi,
  "formats/font": Eo,
  "formats/size": To,
  "formats/blockquote": Ug,
  "formats/code-block": ze,
  "formats/header": Vg,
  "formats/list": Ar,
  "formats/bold": ta,
  "formats/code": Xi,
  "formats/italic": zg,
  "formats/link": ns,
  "formats/script": Hg,
  "formats/strike": Kg,
  "formats/underline": Gg,
  "formats/formula": Wg,
  "formats/image": Zg,
  "formats/video": Yg,
  "modules/syntax": _o,
  "modules/table": Qg,
  "modules/toolbar": ra,
  "themes/bubble": $o,
  "themes/snow": Do,
  "ui/icons": gr,
  "ui/picker": ps,
  "ui/icon-picker": Io,
  "ui/color-picker": qo,
  "ui/tooltip": Oo
}, !0);
const H0 = { class: "rounded-lg border border-slate-300 bg-white" }, K0 = /* @__PURE__ */ Te({
  __name: "RichTextEditor",
  props: {
    modelValue: {},
    placeholder: { default: "Escribe aquí el contenido..." },
    subirImagen: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = J(null);
    let i = null;
    br(() => {
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
              image: l
            }
          }
        }
      }), i.root.innerHTML = t.modelValue || "", i.enable(!t.disabled), i.on("text-change", () => {
        i && r("update:modelValue", i.root.innerHTML);
      }));
    }), bl(() => {
      i = null;
    }), on(
      () => t.modelValue,
      (u) => {
        i && i.root.innerHTML !== u && (i.root.innerHTML = u || "");
      }
    ), on(
      () => t.disabled,
      (u) => {
        i?.enable(!u);
      }
    );
    async function l() {
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
            t.subirImagen ? b = await t.subirImagen(d) : b = await o(d), i?.insertEmbed(p.index, "image", b, "user");
          } catch (b) {
            console.error("No se pudo subir la imagen al editor:", b);
          }
      };
    }
    function o(u) {
      return new Promise((d, p) => {
        const b = new FileReader();
        b.onload = () => d(String(b.result)), b.onerror = () => p(new Error("No fue posible leer la imagen.")), b.readAsDataURL(u);
      });
    }
    return (u, d) => (R(), F("div", H0, [
      A("div", {
        ref_key: "root",
        ref: s,
        class: "min-h-[260px]"
      }, null, 512)
    ]));
  }
}), G0 = /* @__PURE__ */ Te({
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
    return (r, s) => (R(), qe(K0, {
      "model-value": n.modelValue,
      "subir-imagen": n.uploadImage,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["model-value", "subir-imagen", "disabled"]));
  }
}), W0 = ["value", "disabled"], Z0 = ["value"], Y0 = /* @__PURE__ */ Te({
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
    return (r, s) => (R(), F("select", {
      value: n.modelValue,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, [
      s[1] || (s[1] = A("option", { value: "" }, "Selecciona una opción", -1)),
      (R(!0), F(Pe, null, je(n.options, (i) => (R(), F("option", {
        key: i,
        value: i
      }, X(i), 9, Z0))), 128))
    ], 40, W0));
  }
}), X0 = ["value", "rows", "placeholder", "disabled"], Q0 = /* @__PURE__ */ Te({
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
    return (r, s) => (R(), F("textarea", {
      value: n.modelValue,
      rows: n.rows,
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, X0));
  }
}), J0 = ["value", "placeholder", "disabled"], ul = /* @__PURE__ */ Te({
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
    return (r, s) => (R(), F("input", {
      value: n.modelValue,
      type: "text",
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, J0));
  }
}), eb = {
  key: 2,
  class: "space-y-1"
}, tb = {
  key: 0,
  class: "text-xs text-slate-500"
}, nb = /* @__PURE__ */ Te({
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
    function l() {
      return typeof t.modelValue == "string" ? t.modelValue : "";
    }
    function o() {
      return t.modelValue;
    }
    return (u, d) => (R(), F("div", null, [
      n.field.type === "text" ? (R(), qe(ul, {
        key: 0,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[0] || (d[0] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "date" ? (R(), qe(kc, {
        key: 1,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[1] || (d[1] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "numeric" || n.field.type === "id" ? (R(), F("div", eb, [
        dt(jc, {
          "model-value": l(),
          placeholder: n.field.placeholder || "",
          disabled: n.disabled || n.isAutoId,
          step: n.field.type === "id" ? "1" : "any",
          min: n.field.type === "id" ? 1 : null,
          "onUpdate:modelValue": d[2] || (d[2] = (p) => r("update:modelValue", p))
        }, null, 8, ["model-value", "placeholder", "disabled", "step", "min"]),
        n.isAutoId ? (R(), F("p", tb, " Se genera automáticamente al crear el documento. ")) : se("", !0)
      ])) : n.field.type === "textarea" ? (R(), qe(Q0, {
        key: 3,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[3] || (d[3] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "select" ? (R(), qe(Y0, {
        key: 4,
        "model-value": s(),
        options: n.field.options || [],
        disabled: n.disabled,
        "onUpdate:modelValue": d[4] || (d[4] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "disabled"])) : n.field.type === "document" ? (R(), qe(Oc, {
        key: 5,
        "model-value": s(),
        options: n.documentOptions,
        hint: n.documentHint,
        disabled: n.disabled,
        "onUpdate:modelValue": d[5] || (d[5] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "hint", "disabled"])) : n.field.type === "boolean" ? (R(), qe(nc, {
        key: 6,
        "model-value": i(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[6] || (d[6] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "image" ? (R(), qe(Mc, {
        key: 7,
        "model-value": s(),
        disabled: n.disabled,
        "onUpdate:file": d[7] || (d[7] = (p) => r("update:file", p)),
        onRemove: d[8] || (d[8] = (p) => r("remove-image"))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "array" || n.field.type === "map" ? (R(), qe(Sc, {
        key: 8,
        field: n.field,
        "model-value": o(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[9] || (d[9] = (p) => r("update:modelValue", p))
      }, null, 8, ["field", "model-value", "disabled"])) : n.field.type === "richtext" ? (R(), qe(G0, {
        key: 9,
        "model-value": s(),
        "upload-image": n.uploadImage,
        disabled: n.disabled,
        "onUpdate:modelValue": d[10] || (d[10] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "upload-image", "disabled"])) : (R(), qe(ul, {
        key: 10,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[11] || (d[11] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"]))
    ]));
  }
}), rb = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};
async function sb(n, e = {}) {
  if (!n.type.startsWith("image/"))
    return n;
  const t = { ...rb, ...e }, r = await ab(n), { width: s, height: i } = ib(r.width, r.height, t.maxWidth, t.maxHeight), l = document.createElement("canvas");
  l.width = s, l.height = i;
  const o = l.getContext("2d");
  if (!o)
    return n;
  o.drawImage(r, 0, 0, s, i);
  let u = t.quality, d = await cl(l, n.type || "image/jpeg", u);
  const p = t.targetSizeKb * 1024;
  for (; d.size > p && u > 0.45; )
    u -= 0.08, d = await cl(l, n.type || "image/jpeg", u);
  return d;
}
function ib(n, e, t, r) {
  let s = n, i = e;
  return s > t && (i = Math.round(i * t / s), s = t), i > r && (s = Math.round(s * r / i), i = r), { width: s, height: i };
}
function cl(n, e, t) {
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
  const { storage: r } = Ce(), s = Go(r, n);
  return await Wo(s, e, t), Zo(s);
}
async function dl(n, e, t = {}) {
  const r = await sb(e, {
    maxWidth: t.maxWidth,
    maxHeight: t.maxHeight,
    quality: t.quality,
    targetSizeKb: t.targetSizeKb
  });
  return lb(n, r, t.metadata);
}
async function ob(n, e) {
  const { firestore: t } = Ce(), r = await pb(n, e);
  return (await zo(un(t, n.collectionName), {
    ...r,
    createdAt: Xe(),
    updatedAt: Xe()
  })).id;
}
async function hl(n, e = 100) {
  const { firestore: t } = Ce();
  try {
    const r = Ii(
      un(t, n.collectionName),
      Oi("createdAt", "desc"),
      xl(e)
    );
    return (await Dn(r)).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  } catch {
    return (await Dn(un(t, n.collectionName))).docs.map((s) => ({
      id: s.id,
      data: s.data()
    }));
  }
}
async function ub(n, e) {
  const { firestore: t } = Ce();
  await Ho(Zt(t, n.collectionName, e));
}
async function cb(n, e, t) {
  const { firestore: r } = Ce(), s = mb(n, t);
  await vl(Zt(r, n.collectionName, e), {
    ...s,
    updatedAt: Xe()
  });
}
const Bo = "main", db = "schema";
async function hb(n, e, t = Bo) {
  const { firestore: r } = Ce(), s = n.dictionaryDocumentId || t, i = Fo(n), l = Zt(r, n.collectionName, s), o = await ss(l), u = {
    updatedAt: Xe(),
    createdAt: o.exists() ? o.data().createdAt : Xe()
  };
  if (i)
    u[i] = e;
  else
    for (const [d, p] of Object.entries(e))
      u[d] = p;
  return await Yr(
    l,
    u,
    { merge: !0 }
  ), s;
}
async function fb(n, e = Bo) {
  const { firestore: t } = Ce(), r = n.dictionaryDocumentId || e, s = await ss(Zt(t, n.collectionName, r));
  if (!s.exists())
    return null;
  const i = s.data(), l = Fo(n), o = l ? i[l] : null;
  return o && typeof o == "object" && !Array.isArray(o) ? {
    id: s.id,
    data: o
  } : {
    id: s.id,
    data: i
  };
}
function Fo(n) {
  return n.storageType !== "dictionary" ? "" : typeof n.dictionaryRootKey == "string" && n.dictionaryRootKey.trim() ? n.dictionaryRootKey.trim() : db;
}
async function pb(n, e) {
  const t = Mo(n);
  if (!t.length)
    return { ...e };
  const { firestore: r } = Ce(), s = { ...e };
  for (const i of t)
    s[i.key] = await gb(r, n.collectionName, i.key);
  return s;
}
function mb(n, e) {
  const t = Mo(n);
  if (!t.length)
    return { ...e };
  const r = { ...e };
  for (const s of t)
    delete r[s.key];
  return r;
}
function Mo(n) {
  return n.storageType !== "document" ? [] : n.fields.filter((e) => e.type === "id");
}
async function gb(n, e, t) {
  let r = 0;
  try {
    const l = (await Dn(
      Ii(
        un(n, e),
        Oi(t, "desc"),
        xl(1)
      )
    )).docs[0]?.data()?.[t], o = fl(l);
    o !== null && (r = o);
  } catch {
    r = 0;
  }
  if (r > 0)
    return r + 1;
  const s = await Dn(un(n, e));
  for (const i of s.docs) {
    const l = fl(i.data()?.[t]);
    l !== null && l > r && (r = l);
  }
  return r + 1;
}
function fl(n) {
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
function bb(n) {
  return `${n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}-${Date.now().toString().slice(-6)}`;
}
const yb = { class: "space-y-4" }, vb = { class: "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" }, xb = {
  key: 0,
  class: "mt-2 text-xs text-slate-500"
}, wb = {
  key: 1,
  class: "mt-2 text-xs text-rose-700"
}, Ab = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, Eb = { class: "text-xl font-black text-slate-900" }, Nb = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, Tb = { class: "block text-sm font-semibold text-slate-700" }, Sb = {
  key: 0,
  class: "text-xs text-slate-500"
}, Cb = {
  key: 0,
  class: "rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700"
}, kb = {
  key: 1,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Lb = {
  key: 2,
  class: "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, _b = { class: "flex flex-wrap items-center gap-2" }, qb = ["disabled"], Ib = ["disabled"], Ob = { class: "mt-6 border-t border-slate-200 pt-5" }, Rb = {
  key: 0,
  class: "mt-3 text-sm text-slate-500"
}, $b = {
  key: 1,
  class: "mt-3 text-sm text-slate-500"
}, Db = {
  key: 2,
  class: "mt-3 space-y-2"
}, Bb = { class: "text-sm font-semibold text-slate-900" }, Fb = { class: "text-xs text-slate-500" }, Mb = {
  key: 0,
  class: "flex items-center gap-2"
}, Pb = ["disabled", "onClick"], jb = ["disabled", "onClick"], Ub = /* @__PURE__ */ Te({
  __name: "AdminBlogPage",
  setup(n) {
    const e = is(), t = yr(), r = J([]), s = J(""), i = J(!1), l = J(""), o = J({}), u = J({}), d = J([]), p = J(!1), b = J(!1), h = J(""), g = J(""), S = J({}), k = J(""), _ = Ie(() => qn.value === "admin" || qn.value === "writer" || qn.value === "manager"), I = Ie(() => r.value.find((w) => w.id === s.value) ?? null), P = Ie(() => !!k.value);
    br(async () => {
      await U();
    }), on(
      I,
      async (w) => {
        if (!w) {
          o.value = {}, u.value = {}, d.value = [], S.value = {}, k.value = "";
          return;
        }
        re(w), await ge(w), await Ae(w);
      },
      { immediate: !0 }
    ), on(
      () => e.query.schema,
      (w) => {
        typeof w == "string" && r.value.some((x) => x.id === w) && s.value !== w && (s.value = w);
      }
    );
    async function U() {
      i.value = !0, l.value = "";
      try {
        await W();
      } catch {
        l.value = "No se pudieron cargar los tipos de contenido.";
      } finally {
        i.value = !1;
      }
    }
    async function W() {
      const w = await Di();
      if (r.value = w, !w.length) {
        s.value = "";
        return;
      }
      const x = typeof e.query.schema == "string" ? e.query.schema : "";
      if (x && w.some((M) => M.id === x)) {
        s.value = x;
        return;
      }
      w.some((M) => M.id === s.value) || (s.value = w[0].id, await H(s.value));
    }
    async function H(w) {
      w && e.query.schema !== w && await t.replace({
        query: {
          ...e.query,
          schema: w
        }
      });
    }
    function ie(w) {
      return !!w && typeof w == "object" && !Array.isArray(w);
    }
    function re(w) {
      const x = {}, O = {};
      for (const M of w.fields)
        M.type === "boolean" ? x[M.key] = !1 : M.type === "array" ? x[M.key] = [] : M.type === "map" ? x[M.key] = {} : M.type === "date" ? x[M.key] = "" : M.type === "numeric" || M.type === "id" ? x[M.key] = null : (M.type, x[M.key] = ""), M.type === "image" && (O[M.key] = null);
      o.value = x, u.value = O, k.value = "", h.value = "", g.value = "";
    }
    async function ge(w) {
      p.value = !0;
      try {
        if (w.storageType === "dictionary") {
          const O = await fb(w);
          d.value = O ? [O] : [], k.value = "", O && B(w, O);
          return;
        }
        const x = await hl(w, 100);
        d.value = x, k.value && !x.some((O) => O.id === k.value) && (k.value = "");
      } finally {
        p.value = !1;
      }
    }
    async function Ae(w) {
      const x = w.fields.filter((M) => M.type === "document");
      if (!x.length) {
        S.value = {};
        return;
      }
      const O = {};
      await Promise.all(
        x.map(async (M) => {
          const ee = typeof M.documentSchemaId == "string" ? M.documentSchemaId.trim() : "";
          if (!ee) {
            O[M.key] = { options: [], byId: {} };
            return;
          }
          const pe = r.value.find((Ye) => Ye.id === ee);
          if (!pe || pe.storageType !== "document") {
            O[M.key] = { options: [], byId: {} };
            return;
          }
          const Re = typeof M.documentLabelField == "string" && M.documentLabelField.trim() || pe.previewField || pe.slugFromField || pe.fields[0]?.key || "", Tt = await hl(pe, 200), Ke = {}, Ft = Tt.map((Ye) => (Ke[Ye.id] = Ye, {
            id: Ye.id,
            label: we(Ye, Re),
            hint: y(Ye)
          }));
          O[M.key] = { options: Ft, byId: Ke };
        })
      ), S.value = O;
    }
    function we(w, x) {
      const O = x ? w.data[x] : null;
      return typeof O == "string" && O.trim() ? O.trim() : w.id;
    }
    function y(w) {
      const x = w.data.telefono;
      return typeof x == "string" && x.trim() ? `Tel: ${x.trim()}` : "";
    }
    function B(w, x) {
      const O = { ...o.value };
      for (const M of w.fields) {
        const ee = x.data[M.key];
        M.type === "boolean" ? O[M.key] = !!ee : M.type === "array" || M.type === "map" ? O[M.key] = T(M, ee) : M.type === "date" ? O[M.key] = st(ee) : M.type === "numeric" ? O[M.key] = Et(ee) : M.type === "id" ? O[M.key] = Ze(ee) : M.type === "document" ? O[M.key] = typeof ee == "string" ? ee : "" : typeof ee == "string" ? O[M.key] = ee : O[M.key] = "";
      }
      o.value = O;
    }
    function C(w) {
      const x = I.value;
      !x || x.storageType !== "document" || (re(x), B(x, w), k.value = w.id);
    }
    function L() {
      const w = I.value;
      !w || w.storageType !== "document" || re(w);
    }
    async function f() {
      const w = I.value;
      if (w) {
        if (h.value = "", g.value = "", !_.value) {
          g.value = "Tu rol no tiene permisos para crear o editar contenido.";
          return;
        }
        b.value = !0;
        try {
          const x = {};
          for (const O of w.fields)
            x[O.key] = await m(w, O), N(w, O, x[O.key]);
          if (w.slugFromField) {
            const O = x[w.slugFromField];
            typeof O == "string" && O.trim() && (x.slug = bb(O));
          }
          w.storageType === "dictionary" ? (await hb(w, x), h.value = "Registro de diccionario actualizado.") : (k.value ? (await cb(w, k.value, x), h.value = "Registro actualizado correctamente.") : (await ob(w, x), h.value = "Registro creado correctamente."), re(w)), await ge(w);
        } catch (x) {
          g.value = x instanceof Error ? x.message : "No se pudo guardar el registro.";
        } finally {
          b.value = !1;
        }
      }
    }
    async function m(w, x) {
      if (x.type === "boolean")
        return !!o.value[x.key];
      if (x.type === "image") {
        const O = u.value[x.key];
        if (!O)
          return Q(x.key);
        const M = en(O.name), ee = await dl(
          `${w.collectionName}/${x.key}/${Date.now()}-${M}`,
          O,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return o.value[x.key] = ee, u.value[x.key] = null, ee;
      }
      return x.type === "array" || x.type === "map" ? T(x, o.value[x.key], !0) : x.type === "date" ? Y(x.key) : x.type === "numeric" ? be(x.key) : x.type === "id" ? w.storageType === "document" && !k.value ? null : Ze(o.value[x.key]) : (x.type === "document", Q(x.key));
    }
    function N(w, x, O) {
      if (x.required && x.type !== "boolean") {
        if (x.type === "array") {
          if (!Array.isArray(O) || !O.length)
            throw new Error(`El campo "${x.label}" es obligatorio y debe tener al menos 1 elemento.`);
          return;
        }
        if (x.type === "map") {
          if (!ie(O) || Object.keys(O).length === 0)
            throw new Error(`El campo "${x.label}" es obligatorio y debe tener al menos 1 propiedad.`);
          return;
        }
        if (!(x.type === "id" && w.storageType === "document" && !k.value)) {
          if (x.type === "numeric") {
            if (typeof O != "number" || !Number.isFinite(O))
              throw new Error(`El campo "${x.label}" es obligatorio y debe ser numérico.`);
            return;
          }
          if (x.type === "id") {
            if (typeof O != "number" || !Number.isInteger(O) || O < 1)
              throw new Error(`El campo "${x.label}" es obligatorio y debe ser un entero mayor o igual a 1.`);
            return;
          }
          if (x.type === "date") {
            if (!(O instanceof Date) || Number.isNaN(O.getTime()))
              throw new Error(`El campo "${x.label}" es obligatorio y debe ser una fecha válida.`);
            return;
          }
          if (typeof O != "string" || !O.trim())
            throw new Error(`El campo "${x.label}" es obligatorio.`);
        }
      }
    }
    function T(w, x, O = !1) {
      if (typeof x == "string") {
        const ee = x.trim();
        if (!(ee.startsWith("{") || ee.startsWith("[")))
          x = w.type === "array" ? [] : {};
        else
          try {
            x = JSON.parse(ee);
          } catch {
            x = w.type === "array" ? [] : {};
          }
      }
      if (w.type === "array") {
        const ee = Array.isArray(x) ? x : [];
        return w.itemSchema ? ee.map(
          (pe, Re) => D(
            w.itemSchema,
            pe,
            `${w.label}[${Re}]`,
            O
          )
        ) : ee;
      }
      const M = ie(x) ? x : {};
      return Array.isArray(w.mapFields) && w.mapFields.length > 0 ? E(w.mapFields, M, w.label, O) : M;
    }
    function E(w, x, O, M = !1) {
      const ee = {};
      for (const pe of w) {
        const Re = pe.key;
        if (!(Re in x)) {
          if (pe.required)
            throw new Error(`Falta la propiedad requerida "${O}.${Re}".`);
          continue;
        }
        ee[Re] = D(pe, x[Re], `${O}.${Re}`, M);
      }
      return ee;
    }
    function D(w, x, O, M = !1) {
      if (w.type === "array") {
        if (!Array.isArray(x))
          throw new Error(`"${O}" debe ser un arreglo.`);
        return w.itemSchema ? x.map(
          (ee, pe) => D(w.itemSchema, ee, `${O}[${pe}]`, M)
        ) : x;
      }
      if (w.type === "map") {
        if (!ie(x))
          throw new Error(`"${O}" debe ser un objeto.`);
        return !Array.isArray(w.mapFields) || w.mapFields.length === 0 ? x : E(w.mapFields, x, O, M);
      }
      if (w.type === "boolean") {
        if (typeof x != "boolean")
          throw new Error(`"${O}" debe ser boolean.`);
        return x;
      }
      if (w.type === "document") {
        if (typeof x != "string")
          throw new Error(`"${O}" debe ser string (id de documento).`);
        return x;
      }
      if (w.type === "numeric") {
        if (typeof x != "number" || !Number.isFinite(x))
          throw new Error(`"${O}" debe ser numérico.`);
        return x;
      }
      if (w.type === "id") {
        if (typeof x != "number" || !Number.isInteger(x) || x < 1)
          throw new Error(`"${O}" debe ser un número entero mayor o igual a 1.`);
        return x;
      }
      if (w.type === "date") {
        const ee = Dt(x);
        if (!ee)
          throw new Error(`"${O}" debe ser una fecha válida.`);
        return M ? ee : st(ee);
      }
      if (typeof x != "string")
        throw new Error(`"${O}" debe ser string.`);
      if (w.type === "select" && Array.isArray(w.options) && w.options.length > 0 && x && !w.options.includes(x))
        throw new Error(`"${O}" no coincide con las opciones del select.`);
      return x;
    }
    async function j(w) {
      const x = I.value;
      if (!(!x || x.storageType !== "document")) {
        if (!_.value) {
          g.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await ub(x, w), k.value === w && re(x), await ge(x));
      }
    }
    async function G(w) {
      const x = I.value;
      if (!x)
        throw new Error("No hay schema seleccionado.");
      const O = en(w.name);
      return dl(
        `${x.collectionName}/editor/${Date.now()}-${O}`,
        w,
        { maxWidth: 1600, maxHeight: 1600, targetSizeKb: 700, quality: 0.8 }
      );
    }
    function Q(w) {
      const x = o.value[w];
      return typeof x == "string" ? x : "";
    }
    function ae(w) {
      return st(o.value[w]);
    }
    function Y(w) {
      return Dt(o.value[w]);
    }
    function be(w) {
      return Et(o.value[w]);
    }
    function ye(w) {
      const x = be(w);
      return typeof x == "number" ? String(x) : "";
    }
    function ne(w, x) {
      o.value[w] = x;
    }
    function ue(w, x) {
      o.value[w] = st(x);
    }
    function le(w, x) {
      o.value[w] = Et(x);
    }
    function ce(w) {
      return w.type === "boolean" ? xn(w.key) : w.type === "array" || w.type === "map" ? ke(w.key) : w.type === "numeric" || w.type === "id" ? ye(w.key) : w.type === "date" ? ae(w.key) : Q(w.key);
    }
    function he(w, x) {
      if (w.type === "boolean") {
        jn(w.key, !!x);
        return;
      }
      if (w.type === "array" || w.type === "map") {
        Qt(w.key, x);
        return;
      }
      if (w.type === "numeric" || w.type === "id") {
        le(w.key, typeof x == "string" ? x : "");
        return;
      }
      if (w.type === "date") {
        ue(w.key, typeof x == "string" ? x : "");
        return;
      }
      ne(w.key, typeof x == "string" ? x : "");
    }
    function fe(w) {
      return S.value[w.key]?.options ?? [];
    }
    function Ee(w) {
      const x = Q(w.key);
      return x ? fe(w).find((M) => M.id === x)?.hint ?? "" : "";
    }
    function ke(w) {
      return o.value[w];
    }
    function Qt(w, x) {
      o.value[w] = x;
    }
    function xn(w) {
      return !!o.value[w];
    }
    function jn(w, x) {
      o.value[w] = x;
    }
    function Un(w, x) {
      u.value[w] = x;
    }
    function $t(w) {
      o.value[w] = "", u.value[w] = null;
    }
    function Jt(w, x) {
      const O = x.previewField || x.slugFromField || x.fields[0]?.key;
      if (!O)
        return w.id;
      const M = w.data[O];
      if (x.fields.find((pe) => pe.key === O)?.type === "date") {
        const pe = tn(M);
        if (pe)
          return pe;
      }
      return typeof M == "string" && M.trim() ? M : typeof M == "boolean" ? M ? "true" : "false" : typeof M == "number" && Number.isFinite(M) ? String(M) : Array.isArray(M) ? `[array:${M.length}]` : ie(M) ? "[map]" : w.id;
    }
    function en(w) {
      return w.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
    }
    function Et(w) {
      if (typeof w == "number")
        return Number.isFinite(w) ? w : null;
      if (typeof w == "string") {
        const x = w.trim();
        if (!x)
          return null;
        const O = Number(x);
        return Number.isFinite(O) ? O : null;
      }
      return null;
    }
    function Ze(w) {
      const x = Et(w);
      return x === null || !Number.isInteger(x) || x < 1 ? null : x;
    }
    function st(w) {
      const x = Dt(w);
      return x ? Bt(x) : "";
    }
    function Dt(w) {
      if (w instanceof Date && !Number.isNaN(w.getTime()))
        return w;
      if (w && typeof w == "object" && "toDate" in w && typeof w.toDate == "function") {
        const x = w.toDate();
        if (x instanceof Date && !Number.isNaN(x.getTime()))
          return x;
      }
      if (typeof w == "string") {
        const x = w.trim();
        if (!x)
          return null;
        const O = Nt(x);
        if (O)
          return O;
        const M = new Date(x);
        return Number.isNaN(M.getTime()) ? null : M;
      }
      if (typeof w == "number" && Number.isFinite(w)) {
        const x = new Date(w);
        if (!Number.isNaN(x.getTime()))
          return x;
      }
      return null;
    }
    function Nt(w) {
      const x = /^(\d{4})-(\d{2})-(\d{2})$/.exec(w);
      if (!x)
        return null;
      const O = Number(x[1]), M = Number(x[2]), ee = Number(x[3]), pe = new Date(Date.UTC(O, M - 1, ee));
      return pe.getUTCFullYear() !== O || pe.getUTCMonth() + 1 !== M || pe.getUTCDate() !== ee ? null : pe;
    }
    function Bt(w) {
      const x = String(w.getUTCFullYear()).padStart(4, "0"), O = String(w.getUTCMonth() + 1).padStart(2, "0"), M = String(w.getUTCDate()).padStart(2, "0");
      return `${x}-${O}-${M}`;
    }
    function tn(w) {
      const x = Dt(w);
      if (!x)
        return "";
      const O = String(x.getUTCDate()).padStart(2, "0"), M = String(x.getUTCMonth() + 1).padStart(2, "0"), ee = String(x.getUTCFullYear()).padStart(4, "0");
      return `${O}/${M}/${ee}`;
    }
    function He(w) {
      return w.type === "id" && I.value?.storageType === "document";
    }
    return (w, x) => (R(), F("section", yb, [
      A("article", vb, [
        x[0] || (x[0] = Qe(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        x[1] || (x[1] = A("strong", null, "Esquemas", -1)),
        x[2] || (x[2] = Qe(". ", -1)),
        i.value ? (R(), F("p", xb, "Cargando formularios...")) : l.value ? (R(), F("p", wb, X(l.value), 1)) : se("", !0)
      ]),
      A("article", Ab, [
        A("h3", Eb, X(I.value ? `Formulario y registros: ${I.value.title}` : "Formulario y registros"), 1),
        x[4] || (x[4] = A("p", { class: "mt-1 text-sm text-slate-600" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        _.value ? se("", !0) : (R(), F("p", Nb, " No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        I.value ? (R(), F("form", {
          key: 1,
          class: "mt-5 space-y-4",
          onSubmit: qi(f, ["prevent"])
        }, [
          (R(!0), F(Pe, null, je(I.value.fields, (O) => (R(), F("div", {
            key: O.key,
            class: "space-y-1"
          }, [
            A("label", Tb, X(O.label), 1),
            O.helpText ? (R(), F("p", Sb, X(O.helpText), 1)) : se("", !0),
            dt(nb, {
              field: O,
              "model-value": ce(O),
              disabled: !_.value,
              "is-auto-id": He(O),
              "document-options": fe(O),
              "document-hint": Ee(O),
              "upload-image": G,
              "onUpdate:modelValue": (M) => he(O, M),
              "onUpdate:file": (M) => Un(O.key, M),
              onRemoveImage: (M) => $t(O.key)
            }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
          ]))), 128)),
          I.value.storageType === "document" && P.value ? (R(), F("p", Cb, " Editando registro: " + X(k.value), 1)) : se("", !0),
          g.value ? (R(), F("p", kb, X(g.value), 1)) : se("", !0),
          h.value ? (R(), F("p", Lb, X(h.value), 1)) : se("", !0),
          A("div", _b, [
            A("button", {
              type: "submit",
              disabled: b.value || !_.value,
              class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            }, X(b.value ? "Guardando..." : I.value.storageType === "dictionary" ? "Guardar diccionario" : P.value ? "Guardar cambios" : "Crear documento"), 9, qb),
            I.value.storageType === "document" && P.value ? (R(), F("button", {
              key: 0,
              type: "button",
              disabled: b.value || !_.value,
              class: "rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
              onClick: L
            }, " Cancelar edición ", 8, Ib)) : se("", !0)
          ])
        ], 32)) : se("", !0),
        A("div", Ob, [
          x[3] || (x[3] = A("h4", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Registros guardados", -1)),
          p.value ? (R(), F("p", Rb, "Cargando registros...")) : d.value.length ? (R(), F("ul", Db, [
            (R(!0), F(Pe, null, je(d.value, (O) => (R(), F("li", {
              key: O.id,
              class: lt([
                "flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2",
                I.value?.storageType === "document" && k.value === O.id ? "border-sky-300 bg-sky-50" : ""
              ])
            }, [
              A("div", null, [
                A("p", Bb, X(I.value ? Jt(O, I.value) : O.id), 1),
                A("p", Fb, "ID: " + X(O.id), 1)
              ]),
              I.value?.storageType === "document" ? (R(), F("div", Mb, [
                A("button", {
                  type: "button",
                  disabled: !_.value || b.value,
                  class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (M) => C(O)
                }, X(k.value === O.id ? "Editando" : "Editar"), 9, Pb),
                A("button", {
                  type: "button",
                  disabled: !_.value,
                  class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (M) => j(O.id)
                }, " Eliminar ", 8, jb)
              ])) : se("", !0)
            ], 2))), 128))
          ])) : (R(), F("p", $b, "No hay registros todavía."))
        ])
      ])
    ]));
  }
}), Vb = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3" }, zb = { class: "mb-3 flex items-start justify-between gap-2" }, Hb = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide text-slate-600"
}, Kb = ["disabled"], Gb = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, Wb = { class: "space-y-1" }, Zb = ["value", "disabled"], Yb = { class: "space-y-1" }, Xb = ["value", "disabled"], Qb = { class: "mt-2 grid gap-2 md:grid-cols-3" }, Jb = { class: "space-y-1" }, e1 = ["value", "disabled"], t1 = ["value"], n1 = { class: "space-y-1" }, r1 = ["value", "disabled"], s1 = { class: "space-y-1" }, i1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, a1 = ["checked", "disabled"], l1 = { class: "mt-2 block space-y-1" }, o1 = ["value", "disabled"], u1 = {
  key: 1,
  class: "mt-2 block space-y-1"
}, c1 = ["value", "disabled"], d1 = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, h1 = { class: "space-y-1" }, f1 = ["value", "disabled"], p1 = { class: "space-y-1" }, m1 = ["value", "disabled"], g1 = {
  key: 3,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, b1 = { class: "mb-2 flex items-center justify-between" }, y1 = ["disabled"], v1 = { class: "space-y-2" }, x1 = {
  key: 4,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, w1 = /* @__PURE__ */ Te({
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
    function l(T) {
      return T === "date" || T === "numeric" || T === "id" || T === "textarea" || T === "richtext" || T === "image" || T === "select" || T === "document" || T === "boolean" || T === "array" || T === "map" ? T : "text";
    }
    function o(T) {
      return typeof T == "string" ? T : "";
    }
    function u(T) {
      return Array.isArray(T) ? T.map((E) => String(E).trim()).filter(Boolean) : [];
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
    function p() {
      return {
        ...d(),
        key: "",
        label: ""
      };
    }
    function b(T) {
      const E = i(T) ? T : {}, D = l(E.type), j = {
        type: D,
        required: !!E.required,
        placeholder: o(E.placeholder),
        helpText: o(E.helpText),
        options: D === "select" ? u(E.options) : [],
        documentSchemaId: D === "document" ? o(E.documentSchemaId) : "",
        documentLabelField: D === "document" ? o(E.documentLabelField) : ""
      };
      return D === "map" && (j.mapFields = Array.isArray(E.mapFields) ? E.mapFields.map((G) => h(G)) : []), D === "array" && (j.itemSchema = b(E.itemSchema)), j;
    }
    function h(T) {
      const E = i(T) ? T : {};
      return {
        ...b(E),
        key: o(E.key),
        label: o(E.label)
      };
    }
    function g() {
      const T = b(r.modelValue);
      if (r.withIdentity) {
        const E = h(r.modelValue);
        T.key = E.key, T.label = E.label;
      }
      return T;
    }
    function S(T, E) {
      const D = b(T), j = {
        type: D.type,
        required: !!D.required,
        placeholder: o(D.placeholder),
        helpText: o(D.helpText),
        options: D.type === "select" ? u(D.options) : [],
        documentSchemaId: D.type === "document" ? o(D.documentSchemaId) : "",
        documentLabelField: D.type === "document" ? o(D.documentLabelField) : ""
      };
      if (D.type === "map" && (j.mapFields = (D.mapFields ?? []).map((G) => h(G))), D.type === "array" && (j.itemSchema = S(D.itemSchema ?? d(), !1)), E) {
        const G = h(T);
        j.key = G.key, j.label = G.label;
      }
      return j;
    }
    function k(T) {
      s("update:modelValue", S(T, r.withIdentity));
    }
    function _(T, E) {
      const D = g();
      D[T] = E, k(D);
    }
    function I(T) {
      const E = g(), D = l(T);
      E.type = D, D !== "select" && (E.options = []), D !== "document" && (E.documentSchemaId = "", E.documentLabelField = ""), D === "map" ? (E.mapFields = Array.isArray(E.mapFields) ? E.mapFields.map((j) => h(j)) : [], delete E.itemSchema) : D === "array" ? (E.itemSchema = b(E.itemSchema ?? d()), delete E.mapFields) : (delete E.mapFields, delete E.itemSchema), k(E);
    }
    function P(T) {
      const E = g();
      E.required = T, k(E);
    }
    function U(T) {
      const E = g();
      E.placeholder = T, k(E);
    }
    function W(T) {
      const E = g();
      E.helpText = T, k(E);
    }
    function H() {
      return (g().options ?? []).join(", ");
    }
    function ie(T) {
      const E = g();
      E.options = T.split(",").map((D) => D.trim()).filter(Boolean), k(E);
    }
    function re() {
      return g().documentSchemaId ?? "";
    }
    function ge() {
      return g().documentLabelField ?? "";
    }
    function Ae(T) {
      const E = g();
      E.documentSchemaId = T, k(E);
    }
    function we(T) {
      const E = g();
      E.documentLabelField = T, k(E);
    }
    function y() {
      const T = g();
      return T.type !== "map" || !Array.isArray(T.mapFields) ? [] : T.mapFields.map((E) => h(E));
    }
    function B() {
      const T = g();
      T.type = "map", T.mapFields = [...y(), p()], k(T);
    }
    function C(T, E) {
      const D = g(), j = y();
      j[T] = h(E), D.mapFields = j, k(D);
    }
    function L(T) {
      const E = g(), D = y();
      D.splice(T, 1), E.mapFields = D, k(E);
    }
    function f() {
      const T = g();
      return T.type !== "array" ? d() : b(T.itemSchema ?? d());
    }
    function m(T) {
      const E = g();
      E.type = "array", E.itemSchema = b(T), k(E);
    }
    function N() {
      s("remove");
    }
    return (T, E) => {
      const D = yl("CmsSchemaFieldEditor", !0);
      return R(), F("article", Vb, [
        A("div", zb, [
          n.title ? (R(), F("p", Hb, X(n.title), 1)) : se("", !0),
          n.canRemove ? (R(), F("button", {
            key: 1,
            type: "button",
            disabled: n.disabled,
            class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60",
            onClick: N
          }, " Quitar ", 8, Kb)) : se("", !0)
        ]),
        n.withIdentity ? (R(), F("div", Gb, [
          A("label", Wb, [
            E[9] || (E[9] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Key", -1)),
            A("input", {
              value: g().key || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: E[0] || (E[0] = (j) => _("key", j.target.value))
            }, null, 40, Zb)
          ]),
          A("label", Yb, [
            E[10] || (E[10] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Label", -1)),
            A("input", {
              value: g().label || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: E[1] || (E[1] = (j) => _("label", j.target.value))
            }, null, 40, Xb)
          ])
        ])) : se("", !0),
        A("div", Qb, [
          A("label", Jb, [
            E[11] || (E[11] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo", -1)),
            A("select", {
              value: g().type,
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: E[2] || (E[2] = (j) => I(j.target.value))
            }, [
              (R(), F(Pe, null, je(t, (j) => A("option", {
                key: j.value,
                value: j.value
              }, X(j.label), 9, t1)), 64))
            ], 40, e1)
          ]),
          A("label", n1, [
            E[12] || (E[12] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Placeholder", -1)),
            A("input", {
              value: g().placeholder || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: E[3] || (E[3] = (j) => U(j.target.value))
            }, null, 40, r1)
          ]),
          A("label", s1, [
            E[14] || (E[14] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Requerido", -1)),
            A("span", i1, [
              A("input", {
                checked: !!g().required,
                type: "checkbox",
                disabled: n.disabled,
                onChange: E[4] || (E[4] = (j) => P(j.target.checked))
              }, null, 40, a1),
              E[13] || (E[13] = A("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        A("label", l1, [
          E[15] || (E[15] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Help text", -1)),
          A("input", {
            value: g().helpText || "",
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: E[5] || (E[5] = (j) => W(j.target.value))
          }, null, 40, o1)
        ]),
        g().type === "select" ? (R(), F("label", u1, [
          E[16] || (E[16] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Opciones (separadas por coma)", -1)),
          A("input", {
            value: H(),
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: E[6] || (E[6] = (j) => ie(j.target.value))
          }, null, 40, c1)
        ])) : se("", !0),
        g().type === "document" ? (R(), F("div", d1, [
          A("label", h1, [
            E[17] || (E[17] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Schema destino", -1)),
            A("input", {
              value: re(),
              type: "text",
              disabled: n.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: E[7] || (E[7] = (j) => Ae(j.target.value))
            }, null, 40, f1)
          ]),
          A("label", p1, [
            E[18] || (E[18] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Campo etiqueta", -1)),
            A("input", {
              value: ge(),
              type: "text",
              disabled: n.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: E[8] || (E[8] = (j) => we(j.target.value))
            }, null, 40, m1)
          ])
        ])) : se("", !0),
        g().type === "map" ? (R(), F("div", g1, [
          A("div", b1, [
            E[19] || (E[19] = A("p", { class: "text-xs font-bold uppercase tracking-wide text-slate-600" }, "Map fields", -1)),
            A("button", {
              type: "button",
              disabled: n.disabled,
              class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60",
              onClick: B
            }, " Agregar campo ", 8, y1)
          ]),
          A("div", v1, [
            (R(!0), F(Pe, null, je(y(), (j, G) => (R(), qe(D, {
              key: `map-field-${G}`,
              "model-value": j,
              disabled: n.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (Q) => C(G, Q),
              onRemove: (Q) => L(G)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : se("", !0),
        g().type === "array" ? (R(), F("div", x1, [
          E[20] || (E[20] = A("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-600" }, "Item schema", -1)),
          dt(D, {
            "model-value": f(),
            "with-identity": !1,
            disabled: n.disabled,
            title: "Estructura del ítem",
            "onUpdate:modelValue": m
          }, null, 8, ["model-value", "disabled"])
        ])) : se("", !0)
      ]);
    };
  }
}), A1 = { class: "space-y-4" }, E1 = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, N1 = {
  key: 1,
  class: "text-sm text-slate-500"
}, T1 = {
  key: 2,
  class: "text-sm text-slate-500"
}, S1 = {
  key: 3,
  class: "rounded-2xl border border-slate-200 bg-white p-5"
}, C1 = { class: "flex flex-wrap items-center justify-between gap-3" }, k1 = { class: "text-lg font-black text-slate-900" }, L1 = { class: "text-xs text-slate-500" }, _1 = ["disabled"], q1 = { class: "mt-4 grid gap-3 md:grid-cols-2" }, I1 = { class: "space-y-1" }, O1 = ["value"], R1 = { class: "space-y-1" }, $1 = ["value"], D1 = { class: "space-y-1 md:col-span-2" }, B1 = ["value"], F1 = { class: "space-y-1" }, M1 = ["value"], P1 = { class: "space-y-1" }, j1 = ["value"], U1 = { class: "space-y-1" }, V1 = ["value"], z1 = { class: "space-y-1" }, H1 = ["value"], K1 = {
  key: 0,
  class: "space-y-1"
}, G1 = ["value"], W1 = {
  key: 1,
  class: "space-y-1"
}, Z1 = ["value"], Y1 = { class: "mt-5 border-t border-slate-200 pt-4" }, X1 = { class: "space-y-3" }, Q1 = {
  key: 0,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, J1 = {
  key: 1,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, ey = /* @__PURE__ */ Te({
  __name: "AdminSchemasPage",
  setup(n) {
    const e = is(), t = yr(), r = J([]), s = J(""), i = J(!1), l = J(!1), o = J(null), u = J(!1), d = J(""), p = J(""), b = J(""), h = Ie(() => r.value.find((f) => f.id === s.value) ?? null);
    br(() => {
      g();
    }), on(
      () => e.query.schema,
      (f) => {
        typeof f == "string" && r.value.some((m) => m.id === f) && s.value !== f && (s.value = f);
      }
    ), on(
      h,
      (f) => {
        if (p.value = "", b.value = "", f) {
          u.value = !1, o.value = W(f);
          return;
        }
        u.value || (o.value = null);
      },
      { immediate: !0 }
    );
    async function g() {
      i.value = !0, d.value = "";
      try {
        const f = await Di();
        r.value = f, S(f), s.value ? await k(s.value) : o.value || (u.value = !0, o.value = H());
      } catch {
        d.value = "No se pudieron cargar los esquemas.";
      } finally {
        i.value = !1;
      }
    }
    function S(f) {
      if (!f.length) {
        s.value = "";
        return;
      }
      const m = typeof e.query.schema == "string" ? e.query.schema : "";
      if (m && f.some((N) => N.id === m)) {
        s.value = m;
        return;
      }
      f.some((N) => N.id === s.value) || (s.value = f[0].id);
    }
    async function k(f) {
      !f || e.query.schema === f || await t.replace({
        query: {
          ...e.query,
          schema: f
        }
      });
    }
    function _() {
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
        ..._(),
        key: "",
        label: ""
      };
    }
    function P(f) {
      const m = {
        type: f.type,
        required: !!f.required,
        placeholder: f.placeholder ?? "",
        helpText: f.helpText ?? "",
        options: Array.isArray(f.options) ? [...f.options] : []
      };
      return f.type === "map" && (m.mapFields = Array.isArray(f.mapFields) ? f.mapFields.map((N) => U(N)) : []), f.type === "array" && (m.itemSchema = f.itemSchema ? P(f.itemSchema) : _()), m;
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
        fields: f.fields.map((m) => U(m))
      };
    }
    function H() {
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
      u.value = !0, s.value = "", o.value = H(), p.value = "", b.value = "";
      const f = { ...e.query };
      delete f.schema, await t.replace({ query: f });
    }
    function re(f, m) {
      o.value && (o.value = {
        ...o.value,
        [f]: m
      });
    }
    function ge(f) {
      o.value && (o.value.storageType = f === "dictionary" ? "dictionary" : "document");
    }
    function Ae() {
      o.value && o.value.fields.push(I());
    }
    function we(f, m) {
      o.value && (o.value.fields[f] = U(m));
    }
    function y(f) {
      o.value && o.value.fields.splice(f, 1);
    }
    function B(f, m) {
      if (f.type === "map") {
        const N = Array.isArray(f.mapFields) ? f.mapFields : [];
        for (let T = 0; T < N.length; T += 1)
          C(N[T], `${m}.mapFields[${T}]`);
      }
      f.type === "array" && f.itemSchema && B(f.itemSchema, `${m}.itemSchema`);
    }
    function C(f, m) {
      if (!f.key.trim() || !f.label.trim())
        throw new Error(`${m}: completa key y label.`);
      B(f, m);
    }
    async function L() {
      if (o.value) {
        l.value = !0, p.value = "", b.value = "";
        try {
          const f = o.value;
          if (!f.id.trim() || !f.title.trim() || !f.collectionName.trim())
            throw new Error("Completa id, título y colección del esquema.");
          if (!f.fields.length)
            throw new Error("Agrega al menos un campo al esquema.");
          const m = f.fields.map((E) => U(E));
          for (let E = 0; E < m.length; E += 1)
            C(m[E], `fields[${E}]`);
          const N = {
            id: f.id,
            title: f.title,
            description: f.description,
            storageType: f.storageType,
            collectionName: f.collectionName,
            dictionaryDocumentId: f.storageType === "dictionary" ? f.dictionaryDocumentId : "",
            dictionaryRootKey: f.storageType === "dictionary" ? f.dictionaryRootKey : "",
            slugFromField: f.slugFromField,
            previewField: f.previewField,
            fields: m
          };
          await vu(N), await g(), s.value = N.id, u.value = !1, await k(N.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const T = r.value.find((E) => E.id === s.value);
          o.value = W(T || N), b.value = "Esquema actualizado.";
        } catch (f) {
          p.value = f instanceof Error ? f.message : "No se pudo guardar el esquema.";
        } finally {
          l.value = !1;
        }
      }
    }
    return (f, m) => (R(), F("section", A1, [
      A("article", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        A("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
          m[9] || (m[9] = A("div", null, [
            A("h3", { class: "text-xl font-black text-slate-900" }, "Esquema editable"),
            A("p", { class: "mt-1 text-sm text-slate-600" }, [
              Qe(" Edición visual de campos. Los tipos "),
              A("strong", null, "map"),
              Qe(" y "),
              A("strong", null, "array"),
              Qe(" se editan por interfaz. ")
            ])
          ], -1)),
          A("div", { class: "flex items-center gap-2" }, [
            A("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: ie
            }, " Nuevo esquema "),
            A("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: g
            }, " Recargar ")
          ])
        ])
      ]),
      d.value ? (R(), F("p", E1, X(d.value), 1)) : se("", !0),
      i.value ? (R(), F("p", N1, "Cargando esquemas...")) : o.value ? (R(), F("article", S1, [
        A("div", C1, [
          A("div", null, [
            A("h4", k1, X(o.value.title || h.value?.title || "Nuevo esquema"), 1),
            A("p", L1, [
              m[10] || (m[10] = Qe(" ID: ", -1)),
              A("code", null, X(h.value?.id || "nuevo"), 1)
            ])
          ]),
          A("button", {
            type: "button",
            disabled: l.value,
            class: "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400",
            onClick: L
          }, X(l.value ? "Guardando..." : "Guardar cambios"), 9, _1)
        ]),
        A("div", q1, [
          A("label", I1, [
            m[11] || (m[11] = A("span", { class: "text-xs font-semibold text-slate-700" }, "ID", -1)),
            A("input", {
              value: o.value.id,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: m[0] || (m[0] = (N) => re("id", N.target.value))
            }, null, 40, O1)
          ]),
          A("label", R1, [
            m[12] || (m[12] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Título", -1)),
            A("input", {
              value: o.value.title,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: m[1] || (m[1] = (N) => re("title", N.target.value))
            }, null, 40, $1)
          ]),
          A("label", D1, [
            m[13] || (m[13] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Descripción", -1)),
            A("input", {
              value: o.value.description,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: m[2] || (m[2] = (N) => re("description", N.target.value))
            }, null, 40, B1)
          ]),
          A("label", F1, [
            m[15] || (m[15] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo de almacenamiento", -1)),
            A("select", {
              value: o.value.storageType,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onChange: m[3] || (m[3] = (N) => ge(N.target.value))
            }, [...m[14] || (m[14] = [
              A("option", { value: "document" }, "document", -1),
              A("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, M1)
          ]),
          A("label", P1, [
            m[16] || (m[16] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Colección", -1)),
            A("input", {
              value: o.value.collectionName,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: m[4] || (m[4] = (N) => re("collectionName", N.target.value))
            }, null, 40, j1)
          ]),
          A("label", U1, [
            m[17] || (m[17] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Slug desde campo", -1)),
            A("input", {
              value: o.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: m[5] || (m[5] = (N) => re("slugFromField", N.target.value))
            }, null, 40, V1)
          ]),
          A("label", z1, [
            m[18] || (m[18] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Campo de preview", -1)),
            A("input", {
              value: o.value.previewField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: m[6] || (m[6] = (N) => re("previewField", N.target.value))
            }, null, 40, H1)
          ]),
          o.value.storageType === "dictionary" ? (R(), F("label", K1, [
            m[19] || (m[19] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary document ID", -1)),
            A("input", {
              value: o.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: m[7] || (m[7] = (N) => re("dictionaryDocumentId", N.target.value))
            }, null, 40, G1)
          ])) : se("", !0),
          o.value.storageType === "dictionary" ? (R(), F("label", W1, [
            m[20] || (m[20] = A("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary root key", -1)),
            A("input", {
              value: o.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: m[8] || (m[8] = (N) => re("dictionaryRootKey", N.target.value))
            }, null, 40, Z1)
          ])) : se("", !0)
        ]),
        A("div", Y1, [
          A("div", { class: "mb-3 flex items-center justify-between" }, [
            m[21] || (m[21] = A("h5", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Campos", -1)),
            A("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: Ae
            }, " Agregar campo ")
          ]),
          A("div", X1, [
            (R(!0), F(Pe, null, je(o.value.fields, (N, T) => (R(), qe(w1, {
              key: `schema-field-${T}`,
              "model-value": N,
              "can-remove": !0,
              title: `Campo ${T + 1}`,
              "onUpdate:modelValue": (E) => we(T, E),
              onRemove: (E) => y(T)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        p.value ? (R(), F("p", Q1, X(p.value), 1)) : se("", !0),
        b.value ? (R(), F("p", J1, X(b.value), 1)) : se("", !0)
      ])) : (R(), F("p", T1, "No hay esquema seleccionado."))
    ]));
  }
}), ty = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, ny = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, ry = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, sy = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, iy = {
  key: 3,
  class: "mt-4 text-sm text-slate-500"
}, ay = {
  key: 4,
  class: "mt-4 text-sm text-slate-500"
}, ly = {
  key: 5,
  class: "mt-4 space-y-3"
}, oy = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, uy = { class: "text-sm font-semibold text-slate-900" }, cy = { class: "text-xs text-slate-500" }, dy = { class: "text-xs text-slate-500" }, hy = { class: "text-xs text-slate-500" }, fy = { class: "flex flex-wrap gap-3" }, py = ["checked", "disabled", "onChange"], my = /* @__PURE__ */ Te({
  __name: "AdminUsersPage",
  setup(n) {
    const e = J([]), t = J(!1), r = J(""), s = J(""), i = J(null), l = Ie(() => qn.value === "admin"), o = [
      { label: "Admin", value: "admin" },
      { label: "Writer", value: "writer" },
      { label: "Manager", value: "manager" },
      { label: "Sin rol", value: null }
    ];
    br(async () => {
      await u();
    });
    async function u() {
      t.value = !0, r.value = "";
      try {
        e.value = await Jo();
      } catch {
        r.value = "No se pudieron cargar los usuarios.";
      } finally {
        t.value = !1;
      }
    }
    async function d(g, S) {
      if (s.value = "", r.value = "", !l.value) {
        r.value = "Solo un admin puede cambiar roles.";
        return;
      }
      const k = g.role === S ? null : S;
      i.value = g.id;
      try {
        await eu(g.id, k), g.role = k, s.value = "Rol actualizado correctamente.";
      } catch {
        r.value = "No se pudo actualizar el rol.";
      } finally {
        i.value = null;
      }
    }
    function p(g, S) {
      return g === S;
    }
    function b(g) {
      return g === null ? "Sin rol" : g.charAt(0).toUpperCase() + g.slice(1);
    }
    function h(g) {
      const S = g?.toDate?.();
      return S ? S.toLocaleString("es-ES") : "Sin registros";
    }
    return (g, S) => (R(), F("section", ty, [
      A("div", { class: "flex items-center justify-between" }, [
        S[0] || (S[0] = A("h3", { class: "text-xl font-black text-slate-900" }, "Usuarios", -1)),
        A("button", {
          type: "button",
          class: "rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
          onClick: u
        }, " Recargar ")
      ]),
      S[1] || (S[1] = A("p", { class: "mt-1 text-sm text-slate-600" }, "Listado de usuarios con último login y control de rol.", -1)),
      l.value ? se("", !0) : (R(), F("p", ny, " Solo usuarios con rol admin pueden editar roles. ")),
      r.value ? (R(), F("p", ry, X(r.value), 1)) : se("", !0),
      s.value ? (R(), F("p", sy, X(s.value), 1)) : se("", !0),
      t.value ? (R(), F("p", iy, "Cargando usuarios...")) : e.value.length === 0 ? (R(), F("p", ay, "No hay usuarios registrados.")) : (R(), F("div", ly, [
        (R(!0), F(Pe, null, je(e.value, (k) => (R(), F("article", {
          key: k.id,
          class: "rounded-lg border border-slate-200 p-4"
        }, [
          A("div", oy, [
            A("div", null, [
              A("p", uy, X(k.email || k.id), 1),
              A("p", cy, "UID: " + X(k.id), 1),
              A("p", dy, "Último login: " + X(h(k.lastLoginAt)), 1),
              A("p", hy, "Rol actual: " + X(b(k.role)), 1)
            ]),
            A("div", fy, [
              (R(), F(Pe, null, je(o, (_) => A("label", {
                key: _.label,
                class: "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
              }, [
                A("input", {
                  type: "checkbox",
                  checked: p(k.role, _.value),
                  disabled: !l.value || i.value === k.id,
                  onChange: (I) => d(k, _.value)
                }, null, 40, py),
                Qe(" " + X(_.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), pl = /* @__PURE__ */ new WeakSet();
function Ly(n, e) {
  if (pl.has(n))
    return;
  const t = $n(e.basePath ?? "/admin"), r = $n(e.loginPath ?? "/ingresar"), s = $n(e.registerPath ?? "/registro"), i = by(e.homePath ?? "/");
  Yo(e.firebase), lu({ basePath: t, loginPath: r, registerPath: s, homePath: i }), nu();
  const l = gy(t, r, s);
  for (const o of l)
    n.addRoute(o);
  n.beforeEach(async (o) => (await ru(), o.meta.cmsRequiresAuth && !cr.value ? {
    path: r,
    query: { redirect: o.fullPath }
  } : (o.path === r || o.path === s || o.meta.cmsGuestOnly) && cr.value ? { path: t } : !0)), pl.add(n);
}
function gy(n = "/admin", e = "/ingresar", t = "/registro") {
  const r = $n(n), s = $n(e), i = $n(t);
  return [
    { path: s, component: hu, meta: { cmsGuestOnly: !0 } },
    { path: i, component: bu, meta: { cmsGuestOnly: !0 } },
    {
      path: r,
      component: Ju,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${r}/content` },
        { path: "content", component: Ub, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: ey, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: my, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function $n(n) {
  const e = String(n || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function by(n) {
  const e = String(n || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
export {
  cb as actualizarRegistroDocumento,
  au as cerrarSesion,
  ob as crearRegistroDocumento,
  gy as createCmsRoutes,
  ub as eliminarRegistroDocumento,
  hb as guardarRegistroDiccionario,
  vu as guardarSchemaContenido,
  hl as listarRegistrosDocumento,
  Di as listarSchemasContenido,
  fb as obtenerRegistroDiccionario,
  Ly as registerPifWarriorsCms,
  qn as rolActual,
  cr as usuarioActual
};
