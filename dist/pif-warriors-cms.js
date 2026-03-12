import { signOut as Ul, onAuthStateChanged as Vl, setPersistence as bo, browserLocalPersistence as yo, signInWithEmailAndPassword as zl, createUserWithEmailAndPassword as Hl } from "firebase/auth";
import { ref as te, defineComponent as Te, openBlock as O, createElementBlock as M, createElementVNode as x, withModifiers as qi, withDirectives as ar, vModelText as or, toDisplayString as Q, createCommentVNode as se, createTextVNode as Ye, createVNode as vt, unref as Be, withCtx as Vt, onMounted as br, onBeforeUnmount as vo, watch as Zt, computed as Ie, normalizeClass as Je, Fragment as Me, renderList as Pe, createBlock as Le, resolveComponent as xo } from "vue";
import { query as Ii, collection as an, orderBy as Oi, getDocs as Bn, updateDoc as wo, doc as Xt, serverTimestamp as Ze, getDoc as ss, setDoc as Yr, addDoc as Kl, deleteDoc as Gl, limit as Ao } from "firebase/firestore";
import { useRoute as is, useRouter as yr, RouterLink as zt, RouterView as Wl } from "vue-router";
import { ref as Zl, uploadBytes as Yl, getDownloadURL as Xl } from "firebase/storage";
let hi = null;
function Ql(n) {
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
async function Jl(n) {
  const { firestore: e } = Ce(), t = Xt(e, as, n.uid);
  if (!(await ss(t)).exists()) {
    await Yr(t, {
      email: n.email ?? "",
      role: null,
      lastLoginAt: Ze(),
      createdAt: Ze(),
      updatedAt: Ze()
    });
    return;
  }
  await Yr(
    t,
    {
      email: n.email ?? "",
      lastLoginAt: Ze(),
      updatedAt: Ze()
    },
    { merge: !0 }
  );
}
async function eu(n) {
  const { firestore: e } = Ce(), t = await ss(Xt(e, as, n));
  return t.exists() ? Eo(t.data().role) : null;
}
async function tu() {
  const { firestore: n } = Ce(), e = Ii(an(n, as), Oi("email", "asc"));
  return (await Bn(e)).docs.map((r) => ({
    id: r.id,
    email: String(r.data().email ?? ""),
    role: Eo(r.data().role),
    lastLoginAt: r.data().lastLoginAt,
    createdAt: r.data().createdAt,
    updatedAt: r.data().updatedAt
  }));
}
async function nu(n, e) {
  const { firestore: t } = Ce();
  await wo(Xt(t, as, n), {
    role: e,
    updatedAt: Ze()
  });
}
function Eo(n) {
  return n === "admin" || n === "writer" || n === "manager" ? n : null;
}
const cr = te(null), No = te(!1), In = te(null);
let Gr = null, ru = new Promise((n) => {
  Gr = n;
}), ia = !1;
function su() {
  if (ia)
    return;
  const { auth: n } = Ce();
  cr.value = n.currentUser, Vl(n, async (e) => {
    cr.value = e, In.value = null, e && await Ri(e), No.value = !0, Gr && (Gr(), Gr = null);
  }), ia = !0;
}
async function iu() {
  No.value || await ru;
}
async function au(n, e) {
  const { auth: t } = Ce();
  await bo(t, yo);
  const r = await Hl(t, n, e);
  await Ri(r.user);
}
async function ou(n, e) {
  const { auth: t } = Ce();
  await bo(t, yo);
  const r = await zl(t, n, e);
  await Ri(r.user);
}
async function lu() {
  const { auth: n } = Ce();
  await Ul(n);
}
async function Ri(n) {
  try {
    await Jl(n), In.value = await eu(n.uid);
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
function uu(n) {
  fi = {
    ...fi,
    ...n
  };
}
function $i() {
  return fi;
}
const cu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, du = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, hu = ["disabled"], fu = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, pu = /* @__PURE__ */ Te({
  __name: "LoginPage",
  setup(n) {
    const e = is(), t = yr(), { basePath: r, registerPath: s } = $i(), i = te(""), o = te(""), l = te(!1), u = te("");
    async function d() {
      u.value = "", l.value = !0;
      try {
        await ou(i.value, o.value);
        const p = typeof e.query.redirect == "string" ? e.query.redirect : r;
        await t.push(p);
      } catch {
        u.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, g) => (O(), M("main", cu, [
      g[6] || (g[6] = x("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Ingresar", -1)),
      g[7] || (g[7] = x("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Accede para administrar contenido y esquemas.", -1)),
      x("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        x("div", null, [
          g[2] || (g[2] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          ar(x("input", {
            "onUpdate:modelValue": g[0] || (g[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [or, i.value]
          ])
        ]),
        x("div", null, [
          g[3] || (g[3] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          ar(x("input", {
            "onUpdate:modelValue": g[1] || (g[1] = (h) => o.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "********"
          }, null, 512), [
            [or, o.value]
          ])
        ]),
        u.value ? (O(), M("p", du, Q(u.value), 1)) : se("", !0),
        x("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, Q(l.value ? "Ingresando..." : "Entrar"), 9, hu)
      ], 32),
      x("p", fu, [
        g[5] || (g[5] = Ye(" ¿No tienes cuenta? ", -1)),
        vt(Be(zt), {
          to: Be(s),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Vt(() => [...g[4] || (g[4] = [
            Ye("Crear cuenta", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), mu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, gu = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, bu = ["disabled"], yu = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, vu = /* @__PURE__ */ Te({
  __name: "RegisterPage",
  setup(n) {
    const e = yr(), { basePath: t, loginPath: r } = $i(), s = te(""), i = te(""), o = te(""), l = te(!1), u = te("");
    async function d() {
      if (u.value = "", i.value !== o.value) {
        u.value = "Las contraseñas no coinciden.";
        return;
      }
      l.value = !0;
      try {
        await au(s.value, i.value), await e.push(t);
      } catch {
        u.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, g) => (O(), M("main", mu, [
      g[8] || (g[8] = x("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Crear cuenta", -1)),
      g[9] || (g[9] = x("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Registro para administrar contenido.", -1)),
      x("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: qi(d, ["prevent"])
      }, [
        x("div", null, [
          g[3] || (g[3] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          ar(x("input", {
            "onUpdate:modelValue": g[0] || (g[0] = (h) => s.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [or, s.value]
          ])
        ]),
        x("div", null, [
          g[4] || (g[4] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          ar(x("input", {
            "onUpdate:modelValue": g[1] || (g[1] = (h) => i.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Mínimo 6 caracteres"
          }, null, 512), [
            [or, i.value]
          ])
        ]),
        x("div", null, [
          g[5] || (g[5] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Confirmar contraseña", -1)),
          ar(x("input", {
            "onUpdate:modelValue": g[2] || (g[2] = (h) => o.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [or, o.value]
          ])
        ]),
        u.value ? (O(), M("p", gu, Q(u.value), 1)) : se("", !0),
        x("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, Q(l.value ? "Creando cuenta..." : "Registrarme"), 9, bu)
      ], 32),
      x("p", yu, [
        g[7] || (g[7] = Ye(" ¿Ya tienes cuenta? ", -1)),
        vt(Be(zt), {
          to: Be(r),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: Vt(() => [...g[6] || (g[6] = [
            Ye("Iniciar sesión", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), To = "cmsSchemas", So = "schema", Co = "main", xu = 3e4;
let Wr = null, pi = 0, er = null;
async function Di() {
  const n = Date.now();
  if (Wr && n - pi < xu)
    return Wr;
  if (er)
    return er;
  const { firestore: e } = Ce();
  er = (async () => {
    const r = (await Bn(an(e, To))).docs.map((s) => {
      const i = s.data();
      return ko({ ...i, id: s.id });
    }).sort((s, i) => s.title.localeCompare(i.title, "es"));
    return Wr = r, pi = Date.now(), r;
  })();
  try {
    return await er;
  } finally {
    er = null;
  }
}
async function wu(n) {
  const { firestore: e } = Ce(), t = ko(n), r = Xt(e, To, t.id);
  await Yr(
    r,
    {
      ...t,
      updatedAt: Ze(),
      createdAt: Ze()
    },
    { merge: !0 }
  ), Au();
}
function Au() {
  Wr = null, pi = 0;
}
function ko(n) {
  const e = n;
  let t = [];
  const r = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((u) => Xr(u)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([u, d]) => Xr({ key: u, ...d })
  ));
  const s = typeof e.dictionaryDocumentId == "string" ? e.dictionaryDocumentId : "", i = typeof e.dictionaryRootKey == "string" ? e.dictionaryRootKey : "", o = r === "dictionary" ? Tu(s || Co) : "", l = r === "dictionary" ? Su(i || So) : "";
  return {
    id: Eu(String(e.id ?? "tipo-contenido")),
    title: String(e.title ?? "Tipo de contenido"),
    description: typeof e.description == "string" ? e.description : "",
    storageType: r,
    collectionName: Nu(String(e.collectionName ?? "registros")),
    dictionaryDocumentId: o,
    dictionaryRootKey: l,
    slugFromField: typeof e.slugFromField == "string" ? e.slugFromField : "",
    previewField: typeof e.previewField == "string" ? e.previewField : "",
    fields: t
  };
}
function Xr(n) {
  const e = _o(n.type), t = {
    key: Bi(String(n.key ?? "campo")),
    label: String(n.label ?? "Campo"),
    type: e,
    autogenerated: Io(e, n.autogenerated),
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: qo(n.options),
    documentSchemaId: e === "document" ? Ro(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? $o(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Lo(
    Oo(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Xr(r)) : [] : delete t.mapFields, t;
}
function Lo(n) {
  const e = _o(n.type), t = {
    type: e,
    autogenerated: Io(e, n.autogenerated),
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: qo(n.options),
    documentSchemaId: e === "document" ? Ro(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? $o(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Lo(
    Oo(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => Xr(r)) : [] : delete t.mapFields, t;
}
function _o(n) {
  return n === "date" || n === "numeric" || n === "id" || n === "textarea" || n === "richtext" || n === "image" || n === "select" || n === "document" || n === "boolean" || n === "array" || n === "map" ? n : "text";
}
function qo(n) {
  return Array.isArray(n) ? n.map((e) => String(e).trim()).filter(Boolean) : [];
}
function Io(n, e) {
  return typeof e == "boolean" ? e : n === "id";
}
function Oo(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function Bi(n) {
  return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function Eu(n) {
  return n.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function Nu(n) {
  return Bi(n);
}
function Tu(n) {
  return String(n).trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || Co;
}
function Su(n) {
  return String(n).trim().replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "") || So;
}
function Ro(n) {
  return String(n).trim().replace(/[^a-zA-Z0-9_-]/g, "").replace(/-+/g, "-");
}
function $o(n) {
  const e = String(n ?? "").trim();
  return e ? Bi(e) : "";
}
const Cu = { class: "cms-root-fixed-height overflow-hidden bg-slate-100" }, ku = { class: "cms-sidebar-header mb-3 flex items-center justify-between lg:mb-0" }, Lu = { class: "text-sm font-black uppercase tracking-wide text-slate-700" }, _u = { class: "px-3" }, qu = { class: "cms-sidebar-scroll space-y-2" }, Iu = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Ou = { class: "flex items-start justify-between gap-2" }, Ru = { class: "material-symbols-outlined text-base leading-none" }, $u = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Du = { class: "font-semibold" }, Bu = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Fu = {
  key: 1,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Mu = {
  key: 0,
  class: "space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3"
}, Pu = { class: "font-semibold" }, ju = {
  key: 1,
  class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white"
}, Uu = { class: "flex items-start justify-between gap-2" }, Vu = { class: "material-symbols-outlined text-base leading-none" }, zu = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Hu = { class: "font-semibold" }, Ku = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Gu = { class: "cms-sidebar-footer" }, Wu = { class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2" }, Zu = {
  type: "button",
  class: "min-w-0 flex-1 rounded-md bg-white px-3 py-2 text-left text-xs text-slate-700"
}, Yu = { class: "truncate text-slate-600" }, Xu = { class: "mx-auto w-full max-w-7xl space-y-6" }, Qu = { class: "text-xl font-black text-slate-900" }, Ju = { class: "mt-3" }, aa = "cms-developer-mode", ec = /* @__PURE__ */ Te({
  __name: "AdminLayoutPage",
  setup(n) {
    const e = is(), t = yr(), { basePath: r, loginPath: s, homePath: i } = $i(), o = te([]), l = te(!1), u = te(!0), d = te(!0), p = te(!0), g = te(!1);
    br(async () => {
      await h(), typeof window < "u" && window.innerWidth < 1024 && (p.value = !1), typeof window < "u" && (g.value = window.localStorage.getItem(aa) === "true", F()), window.addEventListener("cms-schemas-updated", U);
    }), vo(() => {
      window.removeEventListener("cms-schemas-updated", U);
    }), Zt(
      () => e.fullPath,
      () => {
        e.path.startsWith(`${r}/content`) && (u.value = !0, h()), e.path.startsWith(`${r}/schemas`) && (d.value = !0, h()), typeof window < "u" && window.innerWidth < 1024 && (p.value = !1), F();
      }
    ), Zt(g, (D) => {
      typeof window < "u" && window.localStorage.setItem(aa, D ? "true" : "false"), F();
    });
    async function h() {
      l.value = !0;
      try {
        o.value = await Di();
      } finally {
        l.value = !1;
      }
    }
    const A = Ie(() => e.path.startsWith(`${r}/content`)), E = Ie(() => e.path.startsWith(`${r}/schemas`)), k = Ie(() => o.value.filter((D) => D.storageType === "document")), _ = Ie(() => o.value.filter((D) => D.storageType === "dictionary"));
    function q(D) {
      return e.path.startsWith(D);
    }
    function U() {
      h();
    }
    function z(D) {
      return {
        path: `${r}/content`,
        query: { schema: D }
      };
    }
    function X(D) {
      return {
        path: `${r}/schemas`,
        query: { schema: D }
      };
    }
    function K(D) {
      if (!A.value)
        return !1;
      const T = typeof e.query.schema == "string" ? e.query.schema : "";
      return T ? T === D : o.value[0]?.id === D;
    }
    function ie(D) {
      if (!E.value)
        return !1;
      const T = typeof e.query.schema == "string" ? e.query.schema : "";
      return T ? T === D : o.value[0]?.id === D;
    }
    function ae() {
      u.value = !u.value;
    }
    function be() {
      d.value = !d.value;
    }
    function Ee() {
      p.value = !p.value;
    }
    function ye() {
      g.value = !g.value;
    }
    function b() {
      p.value = !1;
    }
    async function F() {
      g.value || (e.path.startsWith(`${r}/schemas`) || e.path.startsWith(`${r}/users`)) && await t.replace(`${r}/content`);
    }
    function S(D) {
      return /^(https?:)?\/\//i.test(D);
    }
    async function L() {
      if (i) {
        if (S(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await t.push(i);
      }
    }
    async function f() {
      await lu(), await t.push(s);
    }
    const w = Ie(() => cr.value?.email || "Sin correo"), C = Ie(() => {
      try {
        const D = Ce().auth.app.options.projectId;
        if (typeof D == "string" && D.trim().length > 0)
          return D;
      } catch {
      }
      return "Panel";
    }), P = Ie(() => {
      if (e.path.startsWith(`${r}/content`)) {
        const D = typeof e.query.schema == "string" ? e.query.schema : "", T = o.value.find((N) => N.id === D) ?? o.value[0] ?? null;
        return T ? `Contenido · ${T.title}` : "Contenido";
      }
      return e.path.startsWith(`${r}/schemas`) ? g.value ? "Esquemas" : "Contenido" : e.path.startsWith(`${r}/users`) ? g.value ? "Usuarios" : "Contenido" : "Dashboard";
    });
    return (D, T) => (O(), M("main", Cu, [
      p.value ? se("", !0) : (O(), M("button", {
        key: 0,
        type: "button",
        "aria-label": "Abrir sidebar",
        class: "fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg border border-l-0 border-slate-300 bg-white px-2 py-3 text-slate-700 shadow-lg hover:bg-slate-50",
        onClick: Ee
      }, [...T[0] || (T[0] = [
        x("span", { class: "material-symbols-outlined text-lg" }, "left_panel_open", -1)
      ])])),
      p.value ? (O(), M("div", {
        key: 1,
        class: "fixed inset-0 z-30 bg-slate-900/20 lg:hidden",
        onClick: b
      })) : se("", !0),
      x("aside", {
        class: Je(["cms-sidebar-panel cms-sidebar-fixed-height fixed inset-y-0 left-0 z-40 w-80 border-r border-slate-200 bg-white shadow-xl transition-transform duration-200", p.value ? "cms-sidebar-open" : "cms-sidebar-closed"])
      }, [
        x("div", ku, [
          x("h2", Lu, Q(C.value), 1),
          x("div", { class: "flex items-center gap-2" }, [
            x("button", {
              type: "button",
              "aria-label": "Ir a inicio",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: L
            }, [...T[1] || (T[1] = [
              x("span", { class: "material-symbols-outlined text-lg" }, "home", -1)
            ])]),
            x("button", {
              type: "button",
              "aria-label": "Cerrar sidebar",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: b
            }, [...T[2] || (T[2] = [
              x("span", { class: "material-symbols-outlined text-lg" }, "left_panel_close", -1)
            ])])
          ])
        ]),
        x("div", _u, [
          x("button", {
            type: "button",
            class: "mb-2 flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50",
            onClick: ye
          }, [
            T[3] || (T[3] = x("span", null, "Modo desarrollador", -1)),
            x("span", {
              class: Je(["rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", g.value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"])
            }, Q(g.value ? "Activo" : "Oculto"), 3)
          ])
        ]),
        x("div", qu, [
          x("div", Iu, [
            x("div", Ou, [
              vt(Be(zt), {
                to: `${Be(r)}/content`,
                class: "min-w-0 flex-1"
              }, {
                default: Vt(() => [...T[4] || (T[4] = [
                  x("p", { class: "text-sm font-black" }, "Contenido", -1),
                  x("p", { class: "text-xs text-slate-500" }, " Formularios y registros ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              x("button", {
                type: "button",
                "aria-label": "Expandir o contraer contenido",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: ae
              }, [
                x("span", Ru, Q(u.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            u.value ? (O(), M("div", $u, [
              (O(!0), M(Me, null, Pe(_.value, (N) => (O(), Le(Be(zt), {
                key: N.id,
                to: z(N.id),
                class: Je([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  K(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Vt(() => [
                  x("p", Du, Q(N.title), 1),
                  x("p", {
                    class: Je(K(N.id) ? "text-slate-300" : "text-slate-500")
                  }, Q(N.storageType) + " · " + Q(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (O(), M("p", Bu, " Cargando elementos... ")) : _.value.length ? se("", !0) : (O(), M("p", Fu, " No hay diccionarios configurados. "))
            ])) : se("", !0)
          ]),
          k.value.length ? (O(), M("div", Mu, [
            T[5] || (T[5] = x("p", { class: "px-1 text-[11px] font-black uppercase tracking-wide text-slate-500" }, "Documentos", -1)),
            (O(!0), M(Me, null, Pe(k.value, (N) => (O(), Le(Be(zt), {
              key: `document-link-${N.id}`,
              to: z(N.id),
              class: Je([
                "block rounded-lg border px-2 py-1.5 text-xs transition",
                K(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              ])
            }, {
              default: Vt(() => [
                x("p", Pu, Q(N.title), 1),
                x("p", {
                  class: Je(K(N.id) ? "text-slate-300" : "text-slate-500")
                }, " document · " + Q(N.collectionName), 3)
              ]),
              _: 2
            }, 1032, ["to", "class"]))), 128))
          ])) : se("", !0),
          g.value ? (O(), M("div", ju, [
            x("div", Uu, [
              vt(Be(zt), {
                to: `${Be(r)}/schemas`,
                class: "min-w-0 flex-1"
              }, {
                default: Vt(() => [...T[6] || (T[6] = [
                  x("p", { class: "text-sm font-black" }, "Esquemas", -1),
                  x("p", { class: "text-xs text-slate-500" }, " Edición de esquemas ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              x("button", {
                type: "button",
                "aria-label": "Expandir o contraer esquemas",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: be
              }, [
                x("span", Vu, Q(d.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            d.value ? (O(), M("div", zu, [
              (O(!0), M(Me, null, Pe(o.value, (N) => (O(), Le(Be(zt), {
                key: `schema-edit-${N.id}`,
                to: X(N.id),
                class: Je([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  ie(N.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: Vt(() => [
                  x("p", Hu, Q(N.title), 1),
                  x("p", {
                    class: Je(ie(N.id) ? "text-slate-300" : "text-slate-500")
                  }, Q(N.storageType) + " · " + Q(N.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (O(), M("p", Ku, " Cargando elementos... ")) : se("", !0)
            ])) : se("", !0)
          ])) : se("", !0),
          g.value ? (O(), Le(Be(zt), {
            key: 2,
            to: `${Be(r)}/users`,
            class: Je([
              "block rounded-xl border p-3 transition",
              q(`${Be(r)}/users`) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            ])
          }, {
            default: Vt(() => [
              T[7] || (T[7] = x("p", { class: "text-sm font-black" }, "Usuarios", -1)),
              x("p", {
                class: Je(["text-xs", q(`${Be(r)}/users`) ? "text-slate-200" : "text-slate-500"])
              }, " Roles y último ingreso ", 2)
            ]),
            _: 1
          }, 8, ["to", "class"])) : se("", !0)
        ]),
        x("div", Gu, [
          x("div", Wu, [
            x("button", Zu, [
              T[8] || (T[8] = x("p", { class: "font-semibold text-slate-900" }, "Cuenta actual", -1)),
              x("p", Yu, Q(w.value), 1)
            ]),
            x("button", {
              type: "button",
              "aria-label": "Cerrar sesión",
              class: "rounded-md border border-slate-300 bg-white px-2 py-2 text-slate-700 hover:bg-slate-100",
              onClick: f
            }, [...T[9] || (T[9] = [
              x("span", { class: "material-symbols-outlined text-lg" }, "logout", -1)
            ])])
          ])
        ])
      ], 2),
      x("section", {
        class: Je(["cms-content-fixed-height min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8", p.value ? "cms-content-with-open-sidebar" : ""])
      }, [
        x("div", Xu, [
          T[10] || (T[10] = x("section", null, [
            x("h1", { class: "text-3xl font-black text-slate-900" }, "Dashboard"),
            x("p", { class: "mt-2 text-sm text-slate-600" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          x("section", null, [
            x("h2", Qu, Q(P.value), 1),
            x("div", Ju, [
              vt(Be(Wl))
            ])
          ])
        ])
      ], 2)
    ]));
  }
}), tc = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, s] of e)
    t[r] = s;
  return t;
}, nc = /* @__PURE__ */ tc(ec, [["__scopeId", "data-v-effd6d4a"]]), rc = { class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700" }, sc = ["checked", "disabled"], ic = /* @__PURE__ */ Te({
  name: "BooleanFieldInput",
  __name: "BooleanFieldInput",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (O(), M("label", rc, [
      x("input", {
        checked: n.modelValue,
        type: "checkbox",
        disabled: n.disabled,
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.checked))
      }, null, 40, sc),
      s[1] || (s[1] = Ye(" Activo ", -1))
    ]));
  }
}), ac = { class: "space-y-2" }, oc = {
  key: 0,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, lc = { class: "block text-xs font-semibold uppercase tracking-wide text-slate-500" }, uc = {
  key: 0,
  class: "text-xs text-slate-500"
}, cc = {
  key: 0,
  class: "space-y-2"
}, dc = ["value", "disabled", "onChange"], hc = ["value", "disabled", "onInput"], fc = ["disabled", "onClick"], pc = ["disabled"], mc = {
  key: 1,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, gc = { class: "flex items-center justify-between" }, bc = { class: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, yc = ["disabled", "onClick"], vc = ["disabled"], xc = {
  key: 2,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, wc = ["checked", "disabled"], Ac = ["value", "placeholder", "disabled"], Ec = ["value", "disabled"], Nc = ["value"], Tc = ["value", "placeholder", "disabled"], Sc = ["value", "step", "placeholder", "disabled"], Cc = ["value", "placeholder", "disabled"], kc = /* @__PURE__ */ Te({
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
    ), i = Ie(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), o = Ie(() => d(t.modelValue)), l = Ie(() => Array.isArray(t.modelValue) ? t.modelValue : []), u = Ie(() => Object.entries(o.value));
    function d(L) {
      return L && typeof L == "object" && !Array.isArray(L) ? L : {};
    }
    function p(L) {
      return L.type === "array" ? [] : L.type === "map" ? {} : L.type === "boolean" ? !1 : L.type === "date" ? "" : L.type === "numeric" || L.type === "id" ? null : "";
    }
    function g(L, f) {
      r("update:modelValue", {
        ...o.value,
        [L]: f
      });
    }
    function h() {
      r("update:modelValue", [...l.value, p(i.value)]);
    }
    function A(L) {
      const f = [...l.value];
      f.splice(L, 1), r("update:modelValue", f);
    }
    function E(L, f) {
      const w = [...l.value];
      w[L] = f, r("update:modelValue", w);
    }
    function k(L) {
      r("update:modelValue", L);
    }
    function _(L) {
      r("update:modelValue", L);
    }
    function q(L) {
      if (!L.trim()) {
        r("update:modelValue", null);
        return;
      }
      const f = Number(L);
      r("update:modelValue", Number.isFinite(f) ? f : null);
    }
    function U(L) {
      if (typeof L == "number" && Number.isFinite(L))
        return String(L);
      if (typeof L == "string") {
        const f = L.trim();
        if (!f)
          return "";
        const w = Number(f);
        if (Number.isFinite(w))
          return String(w);
      }
      return "";
    }
    function z(L) {
      r("update:modelValue", b(L));
    }
    function X(L) {
      return b(L);
    }
    function K() {
      const L = o.value;
      let f = 1, w = `campo_${f}`;
      for (; w in L; )
        f += 1, w = `campo_${f}`;
      r("update:modelValue", {
        ...L,
        [w]: ""
      });
    }
    function ie(L) {
      const f = { ...o.value };
      delete f[L], r("update:modelValue", f);
    }
    function ae(L, f) {
      const w = f.trim();
      if (!w || w === L)
        return;
      const C = { ...o.value }, P = C[L];
      delete C[L], C[w] = P, r("update:modelValue", C);
    }
    function be(L, f) {
      const w = { ...o.value };
      w[L] = ye(f), r("update:modelValue", w);
    }
    function Ee(L) {
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
    function ye(L) {
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
        const w = F(f);
        if (w)
          return S(w);
        const C = new Date(f);
        return Number.isNaN(C.getTime()) ? "" : S(C);
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
    function F(L) {
      const f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(L);
      if (!f)
        return null;
      const w = Number(f[1]), C = Number(f[2]), P = Number(f[3]), D = new Date(Date.UTC(w, C - 1, P));
      return D.getUTCFullYear() !== w || D.getUTCMonth() + 1 !== C || D.getUTCDate() !== P ? null : D;
    }
    function S(L) {
      const f = String(L.getUTCFullYear()).padStart(4, "0"), w = String(L.getUTCMonth() + 1).padStart(2, "0"), C = String(L.getUTCDate()).padStart(2, "0");
      return `${f}-${w}-${C}`;
    }
    return (L, f) => {
      const w = xo("CmsNestedValueEditor", !0);
      return O(), M("div", ac, [
        n.schema.type === "map" ? (O(), M("section", oc, [
          (O(!0), M(Me, null, Pe(s.value, (C) => (O(), M("article", {
            key: C.key,
            class: "space-y-1 rounded-md border border-slate-200 bg-white p-3"
          }, [
            x("label", lc, Q(C.label), 1),
            C.helpText ? (O(), M("p", uc, Q(C.helpText), 1)) : se("", !0),
            vt(w, {
              schema: C,
              "model-value": o.value[C.key],
              disabled: n.disabled,
              "onUpdate:modelValue": (P) => g(C.key, P)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          s.value.length ? se("", !0) : (O(), M("div", cc, [
            (O(!0), M(Me, null, Pe(u.value, ([C, P]) => (O(), M("article", {
              key: C,
              class: "grid gap-2 rounded-md border border-slate-200 bg-white p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              x("input", {
                value: C,
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onChange: (D) => ae(C, D.target.value)
              }, null, 40, dc),
              x("input", {
                value: Ee(P),
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onInput: (D) => be(C, D.target.value)
              }, null, 40, hc),
              x("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (D) => ie(C)
              }, " Quitar ", 8, fc)
            ]))), 128)),
            x("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
              disabled: n.disabled,
              onClick: K
            }, " Agregar item ", 8, pc),
            f[6] || (f[6] = x("p", { class: "text-xs text-slate-500" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : n.schema.type === "array" ? (O(), M("section", mc, [
          (O(!0), M(Me, null, Pe(l.value, (C, P) => (O(), M("article", {
            key: P,
            class: "space-y-2 rounded-md border border-slate-200 bg-white p-3"
          }, [
            x("div", gc, [
              x("p", bc, "Item " + Q(P + 1), 1),
              x("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (D) => A(P)
              }, " Quitar ", 8, yc)
            ]),
            vt(w, {
              schema: i.value,
              "model-value": C,
              disabled: n.disabled,
              "onUpdate:modelValue": (D) => E(P, D)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          x("button", {
            type: "button",
            class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
            disabled: n.disabled,
            onClick: h
          }, " Agregar item ", 8, vc)
        ])) : n.schema.type === "boolean" ? (O(), M("label", xc, [
          x("input", {
            type: "checkbox",
            checked: !!n.modelValue,
            disabled: n.disabled,
            onChange: f[0] || (f[0] = (C) => _(C.target.checked))
          }, null, 40, wc),
          f[7] || (f[7] = Ye(" Activo ", -1))
        ])) : n.schema.type === "textarea" || n.schema.type === "richtext" ? (O(), M("textarea", {
          key: 3,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          rows: "4",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[1] || (f[1] = (C) => k(C.target.value))
        }, null, 40, Ac)) : n.schema.type === "select" ? (O(), M("select", {
          key: 4,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onChange: f[2] || (f[2] = (C) => k(C.target.value))
        }, [
          f[8] || (f[8] = x("option", { value: "" }, "Selecciona una opción", -1)),
          (O(!0), M(Me, null, Pe(n.schema.options || [], (C) => (O(), M("option", {
            key: C,
            value: C
          }, Q(C), 9, Nc))), 128))
        ], 40, Ec)) : n.schema.type === "date" ? (O(), M("input", {
          key: 5,
          value: X(n.modelValue),
          type: "date",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[3] || (f[3] = (C) => z(C.target.value))
        }, null, 40, Tc)) : n.schema.type === "numeric" || n.schema.type === "id" ? (O(), M("input", {
          key: 6,
          value: U(n.modelValue),
          type: "number",
          step: n.schema.type === "id" ? "1" : "any",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[4] || (f[4] = (C) => q(C.target.value))
        }, null, 40, Sc)) : (O(), M("input", {
          key: 7,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          type: "text",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: f[5] || (f[5] = (C) => k(C.target.value))
        }, null, 40, Cc))
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
    return (r, s) => (O(), Le(kc, {
      schema: n.field,
      "model-value": n.modelValue,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["schema", "model-value", "disabled"]));
  }
}), _c = ["value", "placeholder", "disabled"], qc = /* @__PURE__ */ Te({
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
    return (r, s) => (O(), M("input", {
      value: n.modelValue,
      type: "date",
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, _c));
  }
}), Ic = { class: "space-y-2" }, Oc = ["value", "disabled"], Rc = ["value"], $c = {
  key: 0,
  class: "text-xs text-slate-500"
}, Dc = /* @__PURE__ */ Te({
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
    return (r, s) => (O(), M("div", Ic, [
      x("select", {
        value: n.modelValue,
        disabled: n.disabled,
        class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
      }, [
        s[1] || (s[1] = x("option", { value: "" }, "Selecciona un documento", -1)),
        (O(!0), M(Me, null, Pe(n.options, (i) => (O(), M("option", {
          key: i.id,
          value: i.id
        }, Q(i.label), 9, Rc))), 128))
      ], 40, Oc),
      n.hint ? (O(), M("p", $c, Q(n.hint), 1)) : se("", !0)
    ]));
  }
}), Bc = { class: "space-y-2" }, Fc = ["disabled"], Mc = {
  key: 0,
  class: "text-xs text-slate-500 break-all"
}, Pc = ["src"], jc = ["disabled"], Uc = /* @__PURE__ */ Te({
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
    return (s, i) => (O(), M("div", Bc, [
      x("input", {
        type: "file",
        accept: "image/*",
        disabled: n.disabled,
        class: "block w-full text-sm text-slate-600 disabled:opacity-60",
        onChange: r
      }, null, 40, Fc),
      n.modelValue ? (O(), M("p", Mc, " URL actual: " + Q(n.modelValue), 1)) : se("", !0),
      n.modelValue ? (O(), M("img", {
        key: 1,
        src: n.modelValue,
        alt: "Vista previa",
        class: "max-h-32 rounded-md border border-slate-200 object-cover"
      }, null, 8, Pc)) : se("", !0),
      n.modelValue ? (O(), M("button", {
        key: 2,
        type: "button",
        class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50",
        disabled: n.disabled,
        onClick: i[0] || (i[0] = (o) => t("remove"))
      }, " Quitar URL ", 8, jc)) : se("", !0)
    ]));
  }
}), Vc = ["value", "step", "min", "placeholder", "disabled"], zc = /* @__PURE__ */ Te({
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
    return (r, s) => (O(), M("input", {
      value: n.modelValue,
      type: "number",
      step: n.step,
      min: n.min ?? void 0,
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, Vc));
  }
});
var Do = typeof global == "object" && global && global.Object === Object && global, Hc = typeof self == "object" && self && self.Object === Object && self, At = Do || Hc || Function("return this")(), Yt = At.Symbol, Bo = Object.prototype, Kc = Bo.hasOwnProperty, Gc = Bo.toString, tr = Yt ? Yt.toStringTag : void 0;
function Wc(n) {
  var e = Kc.call(n, tr), t = n[tr];
  try {
    n[tr] = void 0;
    var r = !0;
  } catch {
  }
  var s = Gc.call(n);
  return r && (e ? n[tr] = t : delete n[tr]), s;
}
var Zc = Object.prototype, Yc = Zc.toString;
function Xc(n) {
  return Yc.call(n);
}
var Qc = "[object Null]", Jc = "[object Undefined]", oa = Yt ? Yt.toStringTag : void 0;
function Pn(n) {
  return n == null ? n === void 0 ? Jc : Qc : oa && oa in Object(n) ? Wc(n) : Xc(n);
}
function It(n) {
  return n != null && typeof n == "object";
}
var on = Array.isArray;
function Qt(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
function Fo(n) {
  return n;
}
var ed = "[object AsyncFunction]", td = "[object Function]", nd = "[object GeneratorFunction]", rd = "[object Proxy]";
function Fi(n) {
  if (!Qt(n))
    return !1;
  var e = Pn(n);
  return e == td || e == nd || e == ed || e == rd;
}
var Qs = At["__core-js_shared__"], la = (function() {
  var n = /[^.]+$/.exec(Qs && Qs.keys && Qs.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function sd(n) {
  return !!la && la in n;
}
var id = Function.prototype, ad = id.toString;
function dn(n) {
  if (n != null) {
    try {
      return ad.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var od = /[\\^$.*+?()[\]{}|]/g, ld = /^\[object .+?Constructor\]$/, ud = Function.prototype, cd = Object.prototype, dd = ud.toString, hd = cd.hasOwnProperty, fd = RegExp(
  "^" + dd.call(hd).replace(od, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function pd(n) {
  if (!Qt(n) || sd(n))
    return !1;
  var e = Fi(n) ? fd : ld;
  return e.test(dn(n));
}
function md(n, e) {
  return n?.[e];
}
function hn(n, e) {
  var t = md(n, e);
  return pd(t) ? t : void 0;
}
var mi = hn(At, "WeakMap"), ua = Object.create, gd = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(e) {
    if (!Qt(e))
      return {};
    if (ua)
      return ua(e);
    n.prototype = e;
    var t = new n();
    return n.prototype = void 0, t;
  };
})();
function bd(n, e, t) {
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
function yd(n, e) {
  var t = -1, r = n.length;
  for (e || (e = Array(r)); ++t < r; )
    e[t] = n[t];
  return e;
}
var vd = 800, xd = 16, wd = Date.now;
function Ad(n) {
  var e = 0, t = 0;
  return function() {
    var r = wd(), s = xd - (r - t);
    if (t = r, s > 0) {
      if (++e >= vd)
        return arguments[0];
    } else
      e = 0;
    return n.apply(void 0, arguments);
  };
}
function Ed(n) {
  return function() {
    return n;
  };
}
var Qr = (function() {
  try {
    var n = hn(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
})(), Nd = Qr ? function(n, e) {
  return Qr(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ed(e),
    writable: !0
  });
} : Fo, Td = Ad(Nd);
function Sd(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r && e(n[t], t, n) !== !1; )
    ;
  return n;
}
var Cd = 9007199254740991, kd = /^(?:0|[1-9]\d*)$/;
function Mo(n, e) {
  var t = typeof n;
  return e = e ?? Cd, !!e && (t == "number" || t != "symbol" && kd.test(n)) && n > -1 && n % 1 == 0 && n < e;
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
var Ld = Object.prototype, _d = Ld.hasOwnProperty;
function Po(n, e, t) {
  var r = n[e];
  (!(_d.call(n, e) && vr(r, t)) || t === void 0 && !(e in n)) && Mi(n, e, t);
}
function qd(n, e, t, r) {
  var s = !t;
  t || (t = {});
  for (var i = -1, o = e.length; ++i < o; ) {
    var l = e[i], u = void 0;
    u === void 0 && (u = n[l]), s ? Mi(t, l, u) : Po(t, l, u);
  }
  return t;
}
var ca = Math.max;
function Id(n, e, t) {
  return e = ca(e === void 0 ? n.length - 1 : e, 0), function() {
    for (var r = arguments, s = -1, i = ca(r.length - e, 0), o = Array(i); ++s < i; )
      o[s] = r[e + s];
    s = -1;
    for (var l = Array(e + 1); ++s < e; )
      l[s] = r[s];
    return l[e] = t(o), bd(n, this, l);
  };
}
function Od(n, e) {
  return Td(Id(n, e, Fo), n + "");
}
var Rd = 9007199254740991;
function jo(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Rd;
}
function os(n) {
  return n != null && jo(n.length) && !Fi(n);
}
function $d(n, e, t) {
  if (!Qt(t))
    return !1;
  var r = typeof e;
  return (r == "number" ? os(t) && Mo(e, t.length) : r == "string" && e in t) ? vr(t[e], n) : !1;
}
function Dd(n) {
  return Od(function(e, t) {
    var r = -1, s = t.length, i = s > 1 ? t[s - 1] : void 0, o = s > 2 ? t[2] : void 0;
    for (i = n.length > 3 && typeof i == "function" ? (s--, i) : void 0, o && $d(t[0], t[1], o) && (i = s < 3 ? void 0 : i, s = 1), e = Object(e); ++r < s; ) {
      var l = t[r];
      l && n(e, l, r, i);
    }
    return e;
  });
}
var Bd = Object.prototype;
function Pi(n) {
  var e = n && n.constructor, t = typeof e == "function" && e.prototype || Bd;
  return n === t;
}
function Fd(n, e) {
  for (var t = -1, r = Array(n); ++t < n; )
    r[t] = e(t);
  return r;
}
var Md = "[object Arguments]";
function da(n) {
  return It(n) && Pn(n) == Md;
}
var Uo = Object.prototype, Pd = Uo.hasOwnProperty, jd = Uo.propertyIsEnumerable, gi = da(/* @__PURE__ */ (function() {
  return arguments;
})()) ? da : function(n) {
  return It(n) && Pd.call(n, "callee") && !jd.call(n, "callee");
};
function Ud() {
  return !1;
}
var Vo = typeof exports == "object" && exports && !exports.nodeType && exports, ha = Vo && typeof module == "object" && module && !module.nodeType && module, Vd = ha && ha.exports === Vo, fa = Vd ? At.Buffer : void 0, zd = fa ? fa.isBuffer : void 0, dr = zd || Ud, Hd = "[object Arguments]", Kd = "[object Array]", Gd = "[object Boolean]", Wd = "[object Date]", Zd = "[object Error]", Yd = "[object Function]", Xd = "[object Map]", Qd = "[object Number]", Jd = "[object Object]", eh = "[object RegExp]", th = "[object Set]", nh = "[object String]", rh = "[object WeakMap]", sh = "[object ArrayBuffer]", ih = "[object DataView]", ah = "[object Float32Array]", oh = "[object Float64Array]", lh = "[object Int8Array]", uh = "[object Int16Array]", ch = "[object Int32Array]", dh = "[object Uint8Array]", hh = "[object Uint8ClampedArray]", fh = "[object Uint16Array]", ph = "[object Uint32Array]", we = {};
we[ah] = we[oh] = we[lh] = we[uh] = we[ch] = we[dh] = we[hh] = we[fh] = we[ph] = !0;
we[Hd] = we[Kd] = we[sh] = we[Gd] = we[ih] = we[Wd] = we[Zd] = we[Yd] = we[Xd] = we[Qd] = we[Jd] = we[eh] = we[th] = we[nh] = we[rh] = !1;
function mh(n) {
  return It(n) && jo(n.length) && !!we[Pn(n)];
}
function ji(n) {
  return function(e) {
    return n(e);
  };
}
var zo = typeof exports == "object" && exports && !exports.nodeType && exports, lr = zo && typeof module == "object" && module && !module.nodeType && module, gh = lr && lr.exports === zo, Js = gh && Do.process, Fn = (function() {
  try {
    var n = lr && lr.require && lr.require("util").types;
    return n || Js && Js.binding && Js.binding("util");
  } catch {
  }
})(), pa = Fn && Fn.isTypedArray, Ui = pa ? ji(pa) : mh, bh = Object.prototype, yh = bh.hasOwnProperty;
function Ho(n, e) {
  var t = on(n), r = !t && gi(n), s = !t && !r && dr(n), i = !t && !r && !s && Ui(n), o = t || r || s || i, l = o ? Fd(n.length, String) : [], u = l.length;
  for (var d in n)
    (e || yh.call(n, d)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Mo(d, u))) && l.push(d);
  return l;
}
function Ko(n, e) {
  return function(t) {
    return n(e(t));
  };
}
var vh = Ko(Object.keys, Object), xh = Object.prototype, wh = xh.hasOwnProperty;
function Ah(n) {
  if (!Pi(n))
    return vh(n);
  var e = [];
  for (var t in Object(n))
    wh.call(n, t) && t != "constructor" && e.push(t);
  return e;
}
function Eh(n) {
  return os(n) ? Ho(n) : Ah(n);
}
function Nh(n) {
  var e = [];
  if (n != null)
    for (var t in Object(n))
      e.push(t);
  return e;
}
var Th = Object.prototype, Sh = Th.hasOwnProperty;
function Ch(n) {
  if (!Qt(n))
    return Nh(n);
  var e = Pi(n), t = [];
  for (var r in n)
    r == "constructor" && (e || !Sh.call(n, r)) || t.push(r);
  return t;
}
function Go(n) {
  return os(n) ? Ho(n, !0) : Ch(n);
}
var hr = hn(Object, "create");
function kh() {
  this.__data__ = hr ? hr(null) : {}, this.size = 0;
}
function Lh(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var _h = "__lodash_hash_undefined__", qh = Object.prototype, Ih = qh.hasOwnProperty;
function Oh(n) {
  var e = this.__data__;
  if (hr) {
    var t = e[n];
    return t === _h ? void 0 : t;
  }
  return Ih.call(e, n) ? e[n] : void 0;
}
var Rh = Object.prototype, $h = Rh.hasOwnProperty;
function Dh(n) {
  var e = this.__data__;
  return hr ? e[n] !== void 0 : $h.call(e, n);
}
var Bh = "__lodash_hash_undefined__";
function Fh(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = hr && e === void 0 ? Bh : e, this;
}
function ln(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
ln.prototype.clear = kh;
ln.prototype.delete = Lh;
ln.prototype.get = Oh;
ln.prototype.has = Dh;
ln.prototype.set = Fh;
function Mh() {
  this.__data__ = [], this.size = 0;
}
function ls(n, e) {
  for (var t = n.length; t--; )
    if (vr(n[t][0], e))
      return t;
  return -1;
}
var Ph = Array.prototype, jh = Ph.splice;
function Uh(n) {
  var e = this.__data__, t = ls(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : jh.call(e, t, 1), --this.size, !0;
}
function Vh(n) {
  var e = this.__data__, t = ls(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function zh(n) {
  return ls(this.__data__, n) > -1;
}
function Hh(n, e) {
  var t = this.__data__, r = ls(t, n);
  return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
}
function Rt(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
Rt.prototype.clear = Mh;
Rt.prototype.delete = Uh;
Rt.prototype.get = Vh;
Rt.prototype.has = zh;
Rt.prototype.set = Hh;
var fr = hn(At, "Map");
function Kh() {
  this.size = 0, this.__data__ = {
    hash: new ln(),
    map: new (fr || Rt)(),
    string: new ln()
  };
}
function Gh(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function us(n, e) {
  var t = n.__data__;
  return Gh(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Wh(n) {
  var e = us(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function Zh(n) {
  return us(this, n).get(n);
}
function Yh(n) {
  return us(this, n).has(n);
}
function Xh(n, e) {
  var t = us(this, n), r = t.size;
  return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
}
function fn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
fn.prototype.clear = Kh;
fn.prototype.delete = Wh;
fn.prototype.get = Zh;
fn.prototype.has = Yh;
fn.prototype.set = Xh;
function Qh(n, e) {
  for (var t = -1, r = e.length, s = n.length; ++t < r; )
    n[s + t] = e[t];
  return n;
}
var Wo = Ko(Object.getPrototypeOf, Object), Jh = "[object Object]", ef = Function.prototype, tf = Object.prototype, Zo = ef.toString, nf = tf.hasOwnProperty, rf = Zo.call(Object);
function sf(n) {
  if (!It(n) || Pn(n) != Jh)
    return !1;
  var e = Wo(n);
  if (e === null)
    return !0;
  var t = nf.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Zo.call(t) == rf;
}
function af() {
  this.__data__ = new Rt(), this.size = 0;
}
function of(n) {
  var e = this.__data__, t = e.delete(n);
  return this.size = e.size, t;
}
function lf(n) {
  return this.__data__.get(n);
}
function uf(n) {
  return this.__data__.has(n);
}
var cf = 200;
function df(n, e) {
  var t = this.__data__;
  if (t instanceof Rt) {
    var r = t.__data__;
    if (!fr || r.length < cf - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new fn(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function xt(n) {
  var e = this.__data__ = new Rt(n);
  this.size = e.size;
}
xt.prototype.clear = af;
xt.prototype.delete = of;
xt.prototype.get = lf;
xt.prototype.has = uf;
xt.prototype.set = df;
var Yo = typeof exports == "object" && exports && !exports.nodeType && exports, ma = Yo && typeof module == "object" && module && !module.nodeType && module, hf = ma && ma.exports === Yo, ga = hf ? At.Buffer : void 0, ba = ga ? ga.allocUnsafe : void 0;
function Xo(n, e) {
  if (e)
    return n.slice();
  var t = n.length, r = ba ? ba(t) : new n.constructor(t);
  return n.copy(r), r;
}
function ff(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, s = 0, i = []; ++t < r; ) {
    var o = n[t];
    e(o, t, n) && (i[s++] = o);
  }
  return i;
}
function pf() {
  return [];
}
var mf = Object.prototype, gf = mf.propertyIsEnumerable, ya = Object.getOwnPropertySymbols, bf = ya ? function(n) {
  return n == null ? [] : (n = Object(n), ff(ya(n), function(e) {
    return gf.call(n, e);
  }));
} : pf;
function yf(n, e, t) {
  var r = e(n);
  return on(n) ? r : Qh(r, t(n));
}
function bi(n) {
  return yf(n, Eh, bf);
}
var yi = hn(At, "DataView"), vi = hn(At, "Promise"), xi = hn(At, "Set"), va = "[object Map]", vf = "[object Object]", xa = "[object Promise]", wa = "[object Set]", Aa = "[object WeakMap]", Ea = "[object DataView]", xf = dn(yi), wf = dn(fr), Af = dn(vi), Ef = dn(xi), Nf = dn(mi), ot = Pn;
(yi && ot(new yi(new ArrayBuffer(1))) != Ea || fr && ot(new fr()) != va || vi && ot(vi.resolve()) != xa || xi && ot(new xi()) != wa || mi && ot(new mi()) != Aa) && (ot = function(n) {
  var e = Pn(n), t = e == vf ? n.constructor : void 0, r = t ? dn(t) : "";
  if (r)
    switch (r) {
      case xf:
        return Ea;
      case wf:
        return va;
      case Af:
        return xa;
      case Ef:
        return wa;
      case Nf:
        return Aa;
    }
  return e;
});
var Tf = Object.prototype, Sf = Tf.hasOwnProperty;
function Cf(n) {
  var e = n.length, t = new n.constructor(e);
  return e && typeof n[0] == "string" && Sf.call(n, "index") && (t.index = n.index, t.input = n.input), t;
}
var Jr = At.Uint8Array;
function Vi(n) {
  var e = new n.constructor(n.byteLength);
  return new Jr(e).set(new Jr(n)), e;
}
function kf(n, e) {
  var t = Vi(n.buffer);
  return new n.constructor(t, n.byteOffset, n.byteLength);
}
var Lf = /\w*$/;
function _f(n) {
  var e = new n.constructor(n.source, Lf.exec(n));
  return e.lastIndex = n.lastIndex, e;
}
var Na = Yt ? Yt.prototype : void 0, Ta = Na ? Na.valueOf : void 0;
function qf(n) {
  return Ta ? Object(Ta.call(n)) : {};
}
function Qo(n, e) {
  var t = e ? Vi(n.buffer) : n.buffer;
  return new n.constructor(t, n.byteOffset, n.length);
}
var If = "[object Boolean]", Of = "[object Date]", Rf = "[object Map]", $f = "[object Number]", Df = "[object RegExp]", Bf = "[object Set]", Ff = "[object String]", Mf = "[object Symbol]", Pf = "[object ArrayBuffer]", jf = "[object DataView]", Uf = "[object Float32Array]", Vf = "[object Float64Array]", zf = "[object Int8Array]", Hf = "[object Int16Array]", Kf = "[object Int32Array]", Gf = "[object Uint8Array]", Wf = "[object Uint8ClampedArray]", Zf = "[object Uint16Array]", Yf = "[object Uint32Array]";
function Xf(n, e, t) {
  var r = n.constructor;
  switch (e) {
    case Pf:
      return Vi(n);
    case If:
    case Of:
      return new r(+n);
    case jf:
      return kf(n);
    case Uf:
    case Vf:
    case zf:
    case Hf:
    case Kf:
    case Gf:
    case Wf:
    case Zf:
    case Yf:
      return Qo(n, t);
    case Rf:
      return new r();
    case $f:
    case Ff:
      return new r(n);
    case Df:
      return _f(n);
    case Bf:
      return new r();
    case Mf:
      return qf(n);
  }
}
function Jo(n) {
  return typeof n.constructor == "function" && !Pi(n) ? gd(Wo(n)) : {};
}
var Qf = "[object Map]";
function Jf(n) {
  return It(n) && ot(n) == Qf;
}
var Sa = Fn && Fn.isMap, ep = Sa ? ji(Sa) : Jf, tp = "[object Set]";
function np(n) {
  return It(n) && ot(n) == tp;
}
var Ca = Fn && Fn.isSet, rp = Ca ? ji(Ca) : np, sp = 1, el = "[object Arguments]", ip = "[object Array]", ap = "[object Boolean]", op = "[object Date]", lp = "[object Error]", tl = "[object Function]", up = "[object GeneratorFunction]", cp = "[object Map]", dp = "[object Number]", nl = "[object Object]", hp = "[object RegExp]", fp = "[object Set]", pp = "[object String]", mp = "[object Symbol]", gp = "[object WeakMap]", bp = "[object ArrayBuffer]", yp = "[object DataView]", vp = "[object Float32Array]", xp = "[object Float64Array]", wp = "[object Int8Array]", Ap = "[object Int16Array]", Ep = "[object Int32Array]", Np = "[object Uint8Array]", Tp = "[object Uint8ClampedArray]", Sp = "[object Uint16Array]", Cp = "[object Uint32Array]", xe = {};
xe[el] = xe[ip] = xe[bp] = xe[yp] = xe[ap] = xe[op] = xe[vp] = xe[xp] = xe[wp] = xe[Ap] = xe[Ep] = xe[cp] = xe[dp] = xe[nl] = xe[hp] = xe[fp] = xe[pp] = xe[mp] = xe[Np] = xe[Tp] = xe[Sp] = xe[Cp] = !0;
xe[lp] = xe[tl] = xe[gp] = !1;
function Zr(n, e, t, r, s, i) {
  var o, l = e & sp;
  if (o !== void 0)
    return o;
  if (!Qt(n))
    return n;
  var u = on(n);
  if (u)
    o = Cf(n);
  else {
    var d = ot(n), p = d == tl || d == up;
    if (dr(n))
      return Xo(n, l);
    if (d == nl || d == el || p && !s)
      o = p ? {} : Jo(n);
    else {
      if (!xe[d])
        return s ? n : {};
      o = Xf(n, d, l);
    }
  }
  i || (i = new xt());
  var g = i.get(n);
  if (g)
    return g;
  i.set(n, o), rp(n) ? n.forEach(function(E) {
    o.add(Zr(E, e, t, E, n, i));
  }) : ep(n) && n.forEach(function(E, k) {
    o.set(k, Zr(E, e, t, k, n, i));
  });
  var h = bi, A = u ? void 0 : h(n);
  return Sd(A || n, function(E, k) {
    A && (k = E, E = n[k]), Po(o, k, Zr(E, e, t, k, n, i));
  }), o;
}
var kp = 1, Lp = 4;
function On(n) {
  return Zr(n, kp | Lp);
}
var _p = "__lodash_hash_undefined__";
function qp(n) {
  return this.__data__.set(n, _p), this;
}
function Ip(n) {
  return this.__data__.has(n);
}
function es(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new fn(); ++e < t; )
    this.add(n[e]);
}
es.prototype.add = es.prototype.push = qp;
es.prototype.has = Ip;
function Op(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (e(n[t], t, n))
      return !0;
  return !1;
}
function Rp(n, e) {
  return n.has(e);
}
var $p = 1, Dp = 2;
function rl(n, e, t, r, s, i) {
  var o = t & $p, l = n.length, u = e.length;
  if (l != u && !(o && u > l))
    return !1;
  var d = i.get(n), p = i.get(e);
  if (d && p)
    return d == e && p == n;
  var g = -1, h = !0, A = t & Dp ? new es() : void 0;
  for (i.set(n, e), i.set(e, n); ++g < l; ) {
    var E = n[g], k = e[g];
    if (r)
      var _ = o ? r(k, E, g, e, n, i) : r(E, k, g, n, e, i);
    if (_ !== void 0) {
      if (_)
        continue;
      h = !1;
      break;
    }
    if (A) {
      if (!Op(e, function(q, U) {
        if (!Rp(A, U) && (E === q || s(E, q, t, r, i)))
          return A.push(U);
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
function Bp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r, s) {
    t[++e] = [s, r];
  }), t;
}
function Fp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var Mp = 1, Pp = 2, jp = "[object Boolean]", Up = "[object Date]", Vp = "[object Error]", zp = "[object Map]", Hp = "[object Number]", Kp = "[object RegExp]", Gp = "[object Set]", Wp = "[object String]", Zp = "[object Symbol]", Yp = "[object ArrayBuffer]", Xp = "[object DataView]", ka = Yt ? Yt.prototype : void 0, ei = ka ? ka.valueOf : void 0;
function Qp(n, e, t, r, s, i, o) {
  switch (t) {
    case Xp:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case Yp:
      return !(n.byteLength != e.byteLength || !i(new Jr(n), new Jr(e)));
    case jp:
    case Up:
    case Hp:
      return vr(+n, +e);
    case Vp:
      return n.name == e.name && n.message == e.message;
    case Kp:
    case Wp:
      return n == e + "";
    case zp:
      var l = Bp;
    case Gp:
      var u = r & Mp;
      if (l || (l = Fp), n.size != e.size && !u)
        return !1;
      var d = o.get(n);
      if (d)
        return d == e;
      r |= Pp, o.set(n, e);
      var p = rl(l(n), l(e), r, s, i, o);
      return o.delete(n), p;
    case Zp:
      if (ei)
        return ei.call(n) == ei.call(e);
  }
  return !1;
}
var Jp = 1, em = Object.prototype, tm = em.hasOwnProperty;
function nm(n, e, t, r, s, i) {
  var o = t & Jp, l = bi(n), u = l.length, d = bi(e), p = d.length;
  if (u != p && !o)
    return !1;
  for (var g = u; g--; ) {
    var h = l[g];
    if (!(o ? h in e : tm.call(e, h)))
      return !1;
  }
  var A = i.get(n), E = i.get(e);
  if (A && E)
    return A == e && E == n;
  var k = !0;
  i.set(n, e), i.set(e, n);
  for (var _ = o; ++g < u; ) {
    h = l[g];
    var q = n[h], U = e[h];
    if (r)
      var z = o ? r(U, q, h, e, n, i) : r(q, U, h, n, e, i);
    if (!(z === void 0 ? q === U || s(q, U, t, r, i) : z)) {
      k = !1;
      break;
    }
    _ || (_ = h == "constructor");
  }
  if (k && !_) {
    var X = n.constructor, K = e.constructor;
    X != K && "constructor" in n && "constructor" in e && !(typeof X == "function" && X instanceof X && typeof K == "function" && K instanceof K) && (k = !1);
  }
  return i.delete(n), i.delete(e), k;
}
var rm = 1, La = "[object Arguments]", _a = "[object Array]", Br = "[object Object]", sm = Object.prototype, qa = sm.hasOwnProperty;
function im(n, e, t, r, s, i) {
  var o = on(n), l = on(e), u = o ? _a : ot(n), d = l ? _a : ot(e);
  u = u == La ? Br : u, d = d == La ? Br : d;
  var p = u == Br, g = d == Br, h = u == d;
  if (h && dr(n)) {
    if (!dr(e))
      return !1;
    o = !0, p = !1;
  }
  if (h && !p)
    return i || (i = new xt()), o || Ui(n) ? rl(n, e, t, r, s, i) : Qp(n, e, u, t, r, s, i);
  if (!(t & rm)) {
    var A = p && qa.call(n, "__wrapped__"), E = g && qa.call(e, "__wrapped__");
    if (A || E) {
      var k = A ? n.value() : n, _ = E ? e.value() : e;
      return i || (i = new xt()), s(k, _, t, r, i);
    }
  }
  return h ? (i || (i = new xt()), nm(n, e, t, r, s, i)) : !1;
}
function sl(n, e, t, r, s) {
  return n === e ? !0 : n == null || e == null || !It(n) && !It(e) ? n !== n && e !== e : im(n, e, t, r, sl, s);
}
function am(n) {
  return function(e, t, r) {
    for (var s = -1, i = Object(e), o = r(e), l = o.length; l--; ) {
      var u = o[++s];
      if (t(i[u], u, i) === !1)
        break;
    }
    return e;
  };
}
var om = am();
function wi(n, e, t) {
  (t !== void 0 && !vr(n[e], t) || t === void 0 && !(e in n)) && Mi(n, e, t);
}
function lm(n) {
  return It(n) && os(n);
}
function Ai(n, e) {
  if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
    return n[e];
}
function um(n) {
  return qd(n, Go(n));
}
function cm(n, e, t, r, s, i, o) {
  var l = Ai(n, t), u = Ai(e, t), d = o.get(u);
  if (d) {
    wi(n, t, d);
    return;
  }
  var p = i ? i(l, u, t + "", n, e, o) : void 0, g = p === void 0;
  if (g) {
    var h = on(u), A = !h && dr(u), E = !h && !A && Ui(u);
    p = u, h || A || E ? on(l) ? p = l : lm(l) ? p = yd(l) : A ? (g = !1, p = Xo(u, !0)) : E ? (g = !1, p = Qo(u, !0)) : p = [] : sf(u) || gi(u) ? (p = l, gi(l) ? p = um(l) : (!Qt(l) || Fi(l)) && (p = Jo(u))) : g = !1;
  }
  g && (o.set(u, p), s(p, u, r, i, o), o.delete(u)), wi(n, t, p);
}
function il(n, e, t, r, s) {
  n !== e && om(e, function(i, o) {
    if (s || (s = new xt()), Qt(i))
      cm(n, e, o, t, il, r, s);
    else {
      var l = r ? r(Ai(n, o), i, o + "", n, e, s) : void 0;
      l === void 0 && (l = i), wi(n, o, l);
    }
  }, Go);
}
function zi(n, e) {
  return sl(n, e);
}
var Gt = Dd(function(n, e, t) {
  il(n, e, t);
}), W = /* @__PURE__ */ ((n) => (n[n.TYPE = 3] = "TYPE", n[n.LEVEL = 12] = "LEVEL", n[n.ATTRIBUTE = 13] = "ATTRIBUTE", n[n.BLOT = 14] = "BLOT", n[n.INLINE = 7] = "INLINE", n[n.BLOCK = 11] = "BLOCK", n[n.BLOCK_BLOT = 10] = "BLOCK_BLOT", n[n.INLINE_BLOT = 6] = "INLINE_BLOT", n[n.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", n[n.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", n[n.ANY = 15] = "ANY", n))(W || {});
class wt {
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
class Rn extends Error {
  constructor(e) {
    e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
  }
}
const al = class Ei {
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
      throw new Rn(`Unable to create ${t} blot`);
    const i = s, o = (
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
    return typeof e == "string" ? r = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? r = this.types.text : typeof e == "number" ? e & W.LEVEL & W.BLOCK ? r = this.types.block : e & W.LEVEL & W.INLINE && (r = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((s) => (r = this.classes[s], !!r)), r = r || this.tags[e.tagName]), r == null ? null : "scope" in r && t & W.LEVEL & r.scope && t & W.TYPE & r.scope ? r : null;
  }
  register(...e) {
    return e.map((t) => {
      const r = "blotName" in t, s = "attrName" in t;
      if (!r && !s)
        throw new Rn("Invalid definition");
      if (r && t.blotName === "abstract")
        throw new Rn("Cannot register abstract class");
      const i = r ? t.blotName : s ? t.attrName : void 0;
      return this.types[i] = t, s ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : r && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((o) => o.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((o) => {
        (this.tags[o] == null || t.className == null) && (this.tags[o] = t);
      }))), t;
    });
  }
};
al.blots = /* @__PURE__ */ new WeakMap();
let Mn = al;
function Ia(n, e) {
  return (n.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class dm extends wt {
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
const ht = dm;
function ti(n) {
  const e = n.split("-"), t = e.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  return e[0] + t;
}
class hm extends wt {
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
const Jt = hm;
class fm {
  constructor(e) {
    this.attributes = {}, this.domNode = e, this.build();
  }
  attribute(e, t) {
    t ? e.add(this.domNode, t) && (e.value(this.domNode) != null ? this.attributes[e.attrName] = e : delete this.attributes[e.attrName]) : (e.remove(this.domNode), delete this.attributes[e.attrName]);
  }
  build() {
    this.attributes = {};
    const e = Mn.find(this.domNode);
    if (e == null)
      return;
    const t = wt.keys(this.domNode), r = ht.keys(this.domNode), s = Jt.keys(this.domNode);
    t.concat(r).concat(s).forEach((i) => {
      const o = e.scroll.query(i, W.ATTRIBUTE);
      o instanceof wt && (this.attributes[o.attrName] = o);
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
const cs = fm, ol = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, Mn.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new Rn("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), Mn.blots.delete(this.domNode);
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
      throw new Rn(`Cannot wrap ${e}`);
    return r.appendChild(this), r;
  }
};
ol.blotName = "abstract";
let ll = ol;
const ul = class extends ll {
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
ul.scope = W.INLINE_BLOT;
let pm = ul;
const Fe = pm;
class mm {
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
const cl = class Ut extends ll {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = e, Ut.uiClass && this.uiNode.classList.add(Ut.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new mm(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = Oa(e, this.scroll);
        this.insertBefore(t, this.children.head || void 0);
      } catch (t) {
        if (t instanceof Rn)
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
    return e.blotName == null && e(r) || e.blotName != null && r instanceof e ? [r, s] : r instanceof Ut ? r.descendant(e, s) : [null, -1];
  }
  descendants(e, t = 0, r = Number.MAX_VALUE) {
    let s = [], i = r;
    return this.children.forEachAt(
      t,
      r,
      (o, l, u) => {
        (e.blotName == null && e(o) || e.blotName != null && o instanceof e) && s.push(o), o instanceof Ut && (s = s.concat(
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
      ) || (t.statics.scope === W.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof Ut ? t.unwrap() : t.remove());
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
    return r instanceof Ut ? i.concat(r.path(s, t)) : (r != null && i.push([r, s]), i);
  }
  removeChild(e) {
    this.children.remove(e);
  }
  replaceWith(e, t) {
    const r = typeof e == "string" ? this.scroll.create(e, t) : e;
    return r instanceof Ut && this.moveChildren(r), super.replaceWith(r);
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
cl.uiClass = "";
let gm = cl;
const ct = gm;
function bm(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length)
    return !1;
  for (const t in n)
    if (n[t] !== e[t])
      return !1;
  return !0;
}
const Cn = class kn extends ct {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(kn.blotName);
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
        r instanceof kn || (r = r.wrap(kn.blotName, !0)), this.attributes.copy(r);
      }), this.unwrap();
    else {
      const r = this.scroll.query(e, W.INLINE);
      if (r == null)
        return;
      r instanceof wt ? this.attributes.attribute(r, t) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t);
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
    r instanceof kn && r.prev === this && bm(t, r.formats()) && (r.moveChildren(this), r.remove());
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
    return r instanceof kn && this.attributes.move(r), r;
  }
};
Cn.allowedChildren = [Cn, Fe], Cn.blotName = "inline", Cn.scope = W.INLINE_BLOT, Cn.tagName = "SPAN";
let ym = Cn;
const Hi = ym, Ln = class Ni extends ct {
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
    r != null && (r instanceof wt ? this.attributes.attribute(r, t) : e === this.statics.blotName && !t ? this.replaceWith(Ni.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
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
Ln.blotName = "block", Ln.scope = W.BLOCK_BLOT, Ln.tagName = "P", Ln.allowedChildren = [
  Hi,
  Ln,
  Fe
];
let vm = Ln;
const pr = vm, Ti = class extends ct {
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
let xm = Ti;
const ds = xm;
class wm extends Fe {
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
const Xe = wm, Am = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, Em = 100, _n = class extends ct {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((r) => {
      this.update(r);
    }), this.observer.observe(this.domNode, Am), this.attach();
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
      if (u >= Em)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((d) => {
        const p = this.find(d.target, !0);
        p != null && (p.domNode === d.target && (d.type === "childList" ? (i(this.find(d.previousSibling, !1)), Array.from(d.addedNodes).forEach((g) => {
          const h = this.find(g, !1);
          i(h, !1), h instanceof ct && h.children.forEach((A) => {
            i(A, !1);
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
_n.blotName = "scroll", _n.defaultChild = pr, _n.allowedChildren = [pr, ds], _n.scope = W.BLOCK_BLOT, _n.tagName = "DIV";
let Nm = _n;
const Ki = Nm, Si = class dl extends Fe {
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
    super.optimize(e), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof dl && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Si.blotName = "text", Si.scope = W.INLINE_BLOT;
let Tm = Si;
const ts = Tm, Sm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: wt,
  AttributorStore: cs,
  BlockBlot: pr,
  ClassAttributor: ht,
  ContainerBlot: ds,
  EmbedBlot: Xe,
  InlineBlot: Hi,
  LeafBlot: Fe,
  ParentBlot: ct,
  Registry: Mn,
  Scope: W,
  ScrollBlot: Ki,
  StyleAttributor: Jt,
  TextBlot: ts
}, Symbol.toStringTag, { value: "Module" }));
var Ht = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function hl(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Fr = { exports: {} }, ni, Ra;
function Cm() {
  if (Ra) return ni;
  Ra = 1;
  var n = -1, e = 1, t = 0;
  function r(b, F, S, L, f) {
    if (b === F)
      return b ? [[t, b]] : [];
    if (S != null) {
      var w = Ee(b, F, S);
      if (w)
        return w;
    }
    var C = l(b, F), P = b.substring(0, C);
    b = b.substring(C), F = F.substring(C), C = d(b, F);
    var D = b.substring(b.length - C);
    b = b.substring(0, b.length - C), F = F.substring(0, F.length - C);
    var T = s(b, F);
    return P && T.unshift([t, P]), D && T.push([t, D]), U(T, f), L && g(T), T;
  }
  function s(b, F) {
    var S;
    if (!b)
      return [[e, F]];
    if (!F)
      return [[n, b]];
    var L = b.length > F.length ? b : F, f = b.length > F.length ? F : b, w = L.indexOf(f);
    if (w !== -1)
      return S = [
        [e, L.substring(0, w)],
        [t, f],
        [e, L.substring(w + f.length)]
      ], b.length > F.length && (S[0][0] = S[2][0] = n), S;
    if (f.length === 1)
      return [
        [n, b],
        [e, F]
      ];
    var C = p(b, F);
    if (C) {
      var P = C[0], D = C[1], T = C[2], N = C[3], j = C[4], V = r(P, T), J = r(D, N);
      return V.concat([[t, j]], J);
    }
    return i(b, F);
  }
  function i(b, F) {
    for (var S = b.length, L = F.length, f = Math.ceil((S + L) / 2), w = f, C = 2 * f, P = new Array(C), D = new Array(C), T = 0; T < C; T++)
      P[T] = -1, D[T] = -1;
    P[w + 1] = 0, D[w + 1] = 0;
    for (var N = S - L, j = N % 2 !== 0, V = 0, J = 0, Z = 0, fe = 0, ve = 0; ve < f; ve++) {
      for (var re = -ve + V; re <= ve - J; re += 2) {
        var oe = w + re, le;
        re === -ve || re !== ve && P[oe - 1] < P[oe + 1] ? le = P[oe + 1] : le = P[oe - 1] + 1;
        for (var ce = le - re; le < S && ce < L && b.charAt(le) === F.charAt(ce); )
          le++, ce++;
        if (P[oe] = le, le > S)
          J += 2;
        else if (ce > L)
          V += 2;
        else if (j) {
          var pe = w + N - re;
          if (pe >= 0 && pe < C && D[pe] !== -1) {
            var me = S - D[pe];
            if (le >= me)
              return o(b, F, le, ce);
          }
        }
      }
      for (var Ae = -ve + Z; Ae <= ve - fe; Ae += 2) {
        var pe = w + Ae, me;
        Ae === -ve || Ae !== ve && D[pe - 1] < D[pe + 1] ? me = D[pe + 1] : me = D[pe - 1] + 1;
        for (var ke = me - Ae; me < S && ke < L && b.charAt(S - me - 1) === F.charAt(L - ke - 1); )
          me++, ke++;
        if (D[pe] = me, me > S)
          fe += 2;
        else if (ke > L)
          Z += 2;
        else if (!j) {
          var oe = w + N - Ae;
          if (oe >= 0 && oe < C && P[oe] !== -1) {
            var le = P[oe], ce = w + le - oe;
            if (me = S - me, le >= me)
              return o(b, F, le, ce);
          }
        }
      }
    }
    return [
      [n, b],
      [e, F]
    ];
  }
  function o(b, F, S, L) {
    var f = b.substring(0, S), w = F.substring(0, L), C = b.substring(S), P = F.substring(L), D = r(f, w), T = r(C, P);
    return D.concat(T);
  }
  function l(b, F) {
    if (!b || !F || b.charAt(0) !== F.charAt(0))
      return 0;
    for (var S = 0, L = Math.min(b.length, F.length), f = L, w = 0; S < f; )
      b.substring(w, f) == F.substring(w, f) ? (S = f, w = S) : L = f, f = Math.floor((L - S) / 2 + S);
    return z(b.charCodeAt(f - 1)) && f--, f;
  }
  function u(b, F) {
    var S = b.length, L = F.length;
    if (S == 0 || L == 0)
      return 0;
    S > L ? b = b.substring(S - L) : S < L && (F = F.substring(0, S));
    var f = Math.min(S, L);
    if (b == F)
      return f;
    for (var w = 0, C = 1; ; ) {
      var P = b.substring(f - C), D = F.indexOf(P);
      if (D == -1)
        return w;
      C += D, (D == 0 || b.substring(f - C) == F.substring(0, C)) && (w = C, C++);
    }
  }
  function d(b, F) {
    if (!b || !F || b.slice(-1) !== F.slice(-1))
      return 0;
    for (var S = 0, L = Math.min(b.length, F.length), f = L, w = 0; S < f; )
      b.substring(b.length - f, b.length - w) == F.substring(F.length - f, F.length - w) ? (S = f, w = S) : L = f, f = Math.floor((L - S) / 2 + S);
    return X(b.charCodeAt(b.length - f)) && f--, f;
  }
  function p(b, F) {
    var S = b.length > F.length ? b : F, L = b.length > F.length ? F : b;
    if (S.length < 4 || L.length * 2 < S.length)
      return null;
    function f(J, Z, fe) {
      for (var ve = J.substring(fe, fe + Math.floor(J.length / 4)), re = -1, oe = "", le, ce, pe, me; (re = Z.indexOf(ve, re + 1)) !== -1; ) {
        var Ae = l(
          J.substring(fe),
          Z.substring(re)
        ), ke = d(
          J.substring(0, fe),
          Z.substring(0, re)
        );
        oe.length < ke + Ae && (oe = Z.substring(re - ke, re) + Z.substring(re, re + Ae), le = J.substring(0, fe - ke), ce = J.substring(fe + Ae), pe = Z.substring(0, re - ke), me = Z.substring(re + Ae));
      }
      return oe.length * 2 >= J.length ? [
        le,
        ce,
        pe,
        me,
        oe
      ] : null;
    }
    var w = f(
      S,
      L,
      Math.ceil(S.length / 4)
    ), C = f(
      S,
      L,
      Math.ceil(S.length / 2)
    ), P;
    if (!w && !C)
      return null;
    C ? w ? P = w[4].length > C[4].length ? w : C : P = C : P = w;
    var D, T, N, j;
    b.length > F.length ? (D = P[0], T = P[1], N = P[2], j = P[3]) : (N = P[0], j = P[1], D = P[2], T = P[3]);
    var V = P[4];
    return [D, T, N, j, V];
  }
  function g(b) {
    for (var F = !1, S = [], L = 0, f = null, w = 0, C = 0, P = 0, D = 0, T = 0; w < b.length; )
      b[w][0] == t ? (S[L++] = w, C = D, P = T, D = 0, T = 0, f = b[w][1]) : (b[w][0] == e ? D += b[w][1].length : T += b[w][1].length, f && f.length <= Math.max(C, P) && f.length <= Math.max(D, T) && (b.splice(S[L - 1], 0, [
        n,
        f
      ]), b[S[L - 1] + 1][0] = e, L--, L--, w = L > 0 ? S[L - 1] : -1, C = 0, P = 0, D = 0, T = 0, f = null, F = !0)), w++;
    for (F && U(b), q(b), w = 1; w < b.length; ) {
      if (b[w - 1][0] == n && b[w][0] == e) {
        var N = b[w - 1][1], j = b[w][1], V = u(N, j), J = u(j, N);
        V >= J ? (V >= N.length / 2 || V >= j.length / 2) && (b.splice(w, 0, [
          t,
          j.substring(0, V)
        ]), b[w - 1][1] = N.substring(
          0,
          N.length - V
        ), b[w + 1][1] = j.substring(V), w++) : (J >= N.length / 2 || J >= j.length / 2) && (b.splice(w, 0, [
          t,
          N.substring(0, J)
        ]), b[w - 1][0] = e, b[w - 1][1] = j.substring(
          0,
          j.length - J
        ), b[w + 1][0] = n, b[w + 1][1] = N.substring(J), w++), w++;
      }
      w++;
    }
  }
  var h = /[^a-zA-Z0-9]/, A = /\s/, E = /[\r\n]/, k = /\n\r?\n$/, _ = /^\r?\n\r?\n/;
  function q(b) {
    function F(J, Z) {
      if (!J || !Z)
        return 6;
      var fe = J.charAt(J.length - 1), ve = Z.charAt(0), re = fe.match(h), oe = ve.match(h), le = re && fe.match(A), ce = oe && ve.match(A), pe = le && fe.match(E), me = ce && ve.match(E), Ae = pe && J.match(k), ke = me && Z.match(_);
      return Ae || ke ? 5 : pe || me ? 4 : re && !le && ce ? 3 : le || ce ? 2 : re || oe ? 1 : 0;
    }
    for (var S = 1; S < b.length - 1; ) {
      if (b[S - 1][0] == t && b[S + 1][0] == t) {
        var L = b[S - 1][1], f = b[S][1], w = b[S + 1][1], C = d(L, f);
        if (C) {
          var P = f.substring(f.length - C);
          L = L.substring(0, L.length - C), f = P + f.substring(0, f.length - C), w = P + w;
        }
        for (var D = L, T = f, N = w, j = F(L, f) + F(f, w); f.charAt(0) === w.charAt(0); ) {
          L += f.charAt(0), f = f.substring(1) + w.charAt(0), w = w.substring(1);
          var V = F(L, f) + F(f, w);
          V >= j && (j = V, D = L, T = f, N = w);
        }
        b[S - 1][1] != D && (D ? b[S - 1][1] = D : (b.splice(S - 1, 1), S--), b[S][1] = T, N ? b[S + 1][1] = N : (b.splice(S + 1, 1), S--));
      }
      S++;
    }
  }
  function U(b, F) {
    b.push([t, ""]);
    for (var S = 0, L = 0, f = 0, w = "", C = "", P; S < b.length; ) {
      if (S < b.length - 1 && !b[S][1]) {
        b.splice(S, 1);
        continue;
      }
      switch (b[S][0]) {
        case e:
          f++, C += b[S][1], S++;
          break;
        case n:
          L++, w += b[S][1], S++;
          break;
        case t:
          var D = S - f - L - 1;
          if (F) {
            if (D >= 0 && ie(b[D][1])) {
              var T = b[D][1].slice(-1);
              if (b[D][1] = b[D][1].slice(
                0,
                -1
              ), w = T + w, C = T + C, !b[D][1]) {
                b.splice(D, 1), S--;
                var N = D - 1;
                b[N] && b[N][0] === e && (f++, C = b[N][1] + C, N--), b[N] && b[N][0] === n && (L++, w = b[N][1] + w, N--), D = N;
              }
            }
            if (K(b[S][1])) {
              var T = b[S][1].charAt(0);
              b[S][1] = b[S][1].slice(1), w += T, C += T;
            }
          }
          if (S < b.length - 1 && !b[S][1]) {
            b.splice(S, 1);
            break;
          }
          if (w.length > 0 || C.length > 0) {
            w.length > 0 && C.length > 0 && (P = l(C, w), P !== 0 && (D >= 0 ? b[D][1] += C.substring(
              0,
              P
            ) : (b.splice(0, 0, [
              t,
              C.substring(0, P)
            ]), S++), C = C.substring(P), w = w.substring(P)), P = d(C, w), P !== 0 && (b[S][1] = C.substring(C.length - P) + b[S][1], C = C.substring(
              0,
              C.length - P
            ), w = w.substring(
              0,
              w.length - P
            )));
            var j = f + L;
            w.length === 0 && C.length === 0 ? (b.splice(S - j, j), S = S - j) : w.length === 0 ? (b.splice(S - j, j, [e, C]), S = S - j + 1) : C.length === 0 ? (b.splice(S - j, j, [n, w]), S = S - j + 1) : (b.splice(
              S - j,
              j,
              [n, w],
              [e, C]
            ), S = S - j + 2);
          }
          S !== 0 && b[S - 1][0] === t ? (b[S - 1][1] += b[S][1], b.splice(S, 1)) : S++, f = 0, L = 0, w = "", C = "";
          break;
      }
    }
    b[b.length - 1][1] === "" && b.pop();
    var V = !1;
    for (S = 1; S < b.length - 1; )
      b[S - 1][0] === t && b[S + 1][0] === t && (b[S][1].substring(
        b[S][1].length - b[S - 1][1].length
      ) === b[S - 1][1] ? (b[S][1] = b[S - 1][1] + b[S][1].substring(
        0,
        b[S][1].length - b[S - 1][1].length
      ), b[S + 1][1] = b[S - 1][1] + b[S + 1][1], b.splice(S - 1, 1), V = !0) : b[S][1].substring(0, b[S + 1][1].length) == b[S + 1][1] && (b[S - 1][1] += b[S + 1][1], b[S][1] = b[S][1].substring(b[S + 1][1].length) + b[S + 1][1], b.splice(S + 1, 1), V = !0)), S++;
    V && U(b, F);
  }
  function z(b) {
    return b >= 55296 && b <= 56319;
  }
  function X(b) {
    return b >= 56320 && b <= 57343;
  }
  function K(b) {
    return X(b.charCodeAt(0));
  }
  function ie(b) {
    return z(b.charCodeAt(b.length - 1));
  }
  function ae(b) {
    for (var F = [], S = 0; S < b.length; S++)
      b[S][1].length > 0 && F.push(b[S]);
    return F;
  }
  function be(b, F, S, L) {
    return ie(b) || K(L) ? null : ae([
      [t, b],
      [n, F],
      [e, S],
      [t, L]
    ]);
  }
  function Ee(b, F, S) {
    var L = typeof S == "number" ? { index: S, length: 0 } : S.oldRange, f = typeof S == "number" ? null : S.newRange, w = b.length, C = F.length;
    if (L.length === 0 && (f === null || f.length === 0)) {
      var P = L.index, D = b.slice(0, P), T = b.slice(P), N = f ? f.index : null;
      e: {
        var j = P + C - w;
        if (N !== null && N !== j || j < 0 || j > C)
          break e;
        var V = F.slice(0, j), J = F.slice(j);
        if (J !== T)
          break e;
        var Z = Math.min(P, j), fe = D.slice(0, Z), ve = V.slice(0, Z);
        if (fe !== ve)
          break e;
        var re = D.slice(Z), oe = V.slice(Z);
        return be(fe, re, oe, T);
      }
      e: {
        if (N !== null && N !== P)
          break e;
        var le = P, V = F.slice(0, le), J = F.slice(le);
        if (V !== D)
          break e;
        var ce = Math.min(w - le, C - le), pe = T.slice(T.length - ce), me = J.slice(J.length - ce);
        if (pe !== me)
          break e;
        var re = T.slice(0, T.length - ce), oe = J.slice(0, J.length - ce);
        return be(D, re, oe, pe);
      }
    }
    if (L.length > 0 && f && f.length === 0)
      e: {
        var fe = b.slice(0, L.index), pe = b.slice(L.index + L.length), Z = fe.length, ce = pe.length;
        if (C < Z + ce)
          break e;
        var ve = F.slice(0, Z), me = F.slice(C - ce);
        if (fe !== ve || pe !== me)
          break e;
        var re = b.slice(Z, w - ce), oe = F.slice(Z, C - ce);
        return be(fe, re, oe, pe);
      }
    return null;
  }
  function ye(b, F, S, L) {
    return r(b, F, S, L, !0);
  }
  return ye.INSERT = e, ye.DELETE = n, ye.EQUAL = t, ni = ye, ni;
}
var rr = { exports: {} };
rr.exports;
var $a;
function fl() {
  return $a || ($a = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", u = "[object Date]", d = "[object Error]", p = "[object Function]", g = "[object GeneratorFunction]", h = "[object Map]", A = "[object Number]", E = "[object Object]", k = "[object Promise]", _ = "[object RegExp]", q = "[object Set]", U = "[object String]", z = "[object Symbol]", X = "[object WeakMap]", K = "[object ArrayBuffer]", ie = "[object DataView]", ae = "[object Float32Array]", be = "[object Float64Array]", Ee = "[object Int8Array]", ye = "[object Int16Array]", b = "[object Int32Array]", F = "[object Uint8Array]", S = "[object Uint8ClampedArray]", L = "[object Uint16Array]", f = "[object Uint32Array]", w = /[\\^$.*+?()[\]{}|]/g, C = /\w*$/, P = /^\[object .+?Constructor\]$/, D = /^(?:0|[1-9]\d*)$/, T = {};
    T[i] = T[o] = T[K] = T[ie] = T[l] = T[u] = T[ae] = T[be] = T[Ee] = T[ye] = T[b] = T[h] = T[A] = T[E] = T[_] = T[q] = T[U] = T[z] = T[F] = T[S] = T[L] = T[f] = !0, T[d] = T[p] = T[X] = !1;
    var N = typeof Ht == "object" && Ht && Ht.Object === Object && Ht, j = typeof self == "object" && self && self.Object === Object && self, V = N || j || Function("return this")(), J = e && !e.nodeType && e, Z = J && !0 && n && !n.nodeType && n, fe = Z && Z.exports === J;
    function ve(a, c) {
      return a.set(c[0], c[1]), a;
    }
    function re(a, c) {
      return a.add(c), a;
    }
    function oe(a, c) {
      for (var v = -1, I = a ? a.length : 0; ++v < I && c(a[v], v, a) !== !1; )
        ;
      return a;
    }
    function le(a, c) {
      for (var v = -1, I = c.length, ne = a.length; ++v < I; )
        a[ne + v] = c[v];
      return a;
    }
    function ce(a, c, v, I) {
      for (var ne = -1, Y = a ? a.length : 0; ++ne < Y; )
        v = c(v, a[ne], ne, a);
      return v;
    }
    function pe(a, c) {
      for (var v = -1, I = Array(a); ++v < a; )
        I[v] = c(v);
      return I;
    }
    function me(a, c) {
      return a?.[c];
    }
    function Ae(a) {
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
      return a.forEach(function(I, ne) {
        v[++c] = [ne, I];
      }), v;
    }
    function Dt(a, c) {
      return function(v) {
        return a(c(v));
      };
    }
    function bn(a) {
      var c = -1, v = Array(a.size);
      return a.forEach(function(I) {
        v[++c] = I;
      }), v;
    }
    var Un = Array.prototype, Vn = Function.prototype, Bt = Object.prototype, en = V["__core-js_shared__"], yn = (function() {
      var a = /[^.]+$/.exec(en && en.keys && en.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), vn = Vn.toString, Qe = Bt.hasOwnProperty, Nt = Bt.toString, Ft = RegExp(
      "^" + vn.call(Qe).replace(w, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), pt = fe ? V.Buffer : void 0, st = V.Symbol, mt = V.Uint8Array, He = Dt(Object.getPrototypeOf, Object), xn = Object.create, wn = Bt.propertyIsEnumerable, zn = Un.splice, tn = Object.getOwnPropertySymbols, m = pt ? pt.isBuffer : void 0, y = Dt(Object.keys, Object), R = it(V, "DataView"), B = it(V, "Map"), ee = it(V, "Promise"), de = it(V, "Set"), je = it(V, "WeakMap"), Tt = it(Object, "create"), Mt = Ue(R), St = Ue(B), We = Ue(ee), Hn = Ue(de), Kn = Ue(je), Pt = st ? st.prototype : void 0, Nr = Pt ? Pt.valueOf : void 0;
    function Ct(a) {
      var c = -1, v = a ? a.length : 0;
      for (this.clear(); ++c < v; ) {
        var I = a[c];
        this.set(I[0], I[1]);
      }
    }
    function ms() {
      this.__data__ = Tt ? Tt(null) : {};
    }
    function gs(a) {
      return this.has(a) && delete this.__data__[a];
    }
    function bs(a) {
      var c = this.__data__;
      if (Tt) {
        var v = c[a];
        return v === r ? void 0 : v;
      }
      return Qe.call(c, a) ? c[a] : void 0;
    }
    function Tr(a) {
      var c = this.__data__;
      return Tt ? c[a] !== void 0 : Qe.call(c, a);
    }
    function Gn(a, c) {
      var v = this.__data__;
      return v[a] = Tt && c === void 0 ? r : c, this;
    }
    Ct.prototype.clear = ms, Ct.prototype.delete = gs, Ct.prototype.get = bs, Ct.prototype.has = Tr, Ct.prototype.set = Gn;
    function _e(a) {
      var c = -1, v = a ? a.length : 0;
      for (this.clear(); ++c < v; ) {
        var I = a[c];
        this.set(I[0], I[1]);
      }
    }
    function ys() {
      this.__data__ = [];
    }
    function vs(a) {
      var c = this.__data__, v = En(c, a);
      if (v < 0)
        return !1;
      var I = c.length - 1;
      return v == I ? c.pop() : zn.call(c, v, 1), !0;
    }
    function xs(a) {
      var c = this.__data__, v = En(c, a);
      return v < 0 ? void 0 : c[v][1];
    }
    function ws(a) {
      return En(this.__data__, a) > -1;
    }
    function As(a, c) {
      var v = this.__data__, I = En(v, a);
      return I < 0 ? v.push([a, c]) : v[I][1] = c, this;
    }
    _e.prototype.clear = ys, _e.prototype.delete = vs, _e.prototype.get = xs, _e.prototype.has = ws, _e.prototype.set = As;
    function Re(a) {
      var c = -1, v = a ? a.length : 0;
      for (this.clear(); ++c < v; ) {
        var I = a[c];
        this.set(I[0], I[1]);
      }
    }
    function Es() {
      this.__data__ = {
        hash: new Ct(),
        map: new (B || _e)(),
        string: new Ct()
      };
    }
    function Ns(a) {
      return rn(this, a).delete(a);
    }
    function Ts(a) {
      return rn(this, a).get(a);
    }
    function Ss(a) {
      return rn(this, a).has(a);
    }
    function Cs(a, c) {
      return rn(this, a).set(a, c), this;
    }
    Re.prototype.clear = Es, Re.prototype.delete = Ns, Re.prototype.get = Ts, Re.prototype.has = Ss, Re.prototype.set = Cs;
    function Ke(a) {
      this.__data__ = new _e(a);
    }
    function ks() {
      this.__data__ = new _e();
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
      if (v instanceof _e) {
        var I = v.__data__;
        if (!B || I.length < t - 1)
          return I.push([a, c]), this;
        v = this.__data__ = new Re(I);
      }
      return v.set(a, c), this;
    }
    Ke.prototype.clear = ks, Ke.prototype.delete = Ls, Ke.prototype.get = _s, Ke.prototype.has = qs, Ke.prototype.set = Is;
    function An(a, c) {
      var v = Xn(a) || Tn(a) ? pe(a.length, String) : [], I = v.length, ne = !!I;
      for (var Y in a)
        Qe.call(a, Y) && !(ne && (Y == "length" || Ks(Y, I))) && v.push(Y);
      return v;
    }
    function Sr(a, c, v) {
      var I = a[c];
      (!(Qe.call(a, c) && qr(I, v)) || v === void 0 && !(c in a)) && (a[c] = v);
    }
    function En(a, c) {
      for (var v = a.length; v--; )
        if (qr(a[v][0], c))
          return v;
      return -1;
    }
    function gt(a, c) {
      return a && Yn(c, Jn(c), a);
    }
    function Wn(a, c, v, I, ne, Y, he) {
      var ue;
      if (I && (ue = Y ? I(a, ne, Y, he) : I(a)), ue !== void 0)
        return ue;
      if (!yt(a))
        return a;
      var Ne = Xn(a);
      if (Ne) {
        if (ue = zs(a), !c)
          return js(a, ue);
      } else {
        var ge = Lt(a), $e = ge == p || ge == g;
        if (Ir(a))
          return Nn(a, c);
        if (ge == E || ge == i || $e && !Y) {
          if (Ae(a))
            return Y ? a : {};
          if (ue = bt($e ? {} : a), !c)
            return Us(a, gt(ue, a));
        } else {
          if (!T[ge])
            return Y ? a : {};
          ue = Hs(a, ge, Wn, c);
        }
      }
      he || (he = new Ke());
      var Ge = he.get(a);
      if (Ge)
        return Ge;
      if (he.set(a, ue), !Ne)
        var Se = v ? Vs(a) : Jn(a);
      return oe(Se || a, function(De, qe) {
        Se && (qe = De, De = a[qe]), Sr(ue, qe, Wn(De, c, v, I, qe, a, he));
      }), ue;
    }
    function Os(a) {
      return yt(a) ? xn(a) : {};
    }
    function Rs(a, c, v) {
      var I = c(a);
      return Xn(a) ? I : le(I, v(a));
    }
    function $s(a) {
      return Nt.call(a);
    }
    function Ds(a) {
      if (!yt(a) || Ws(a))
        return !1;
      var c = Qn(a) || Ae(a) ? Ft : P;
      return c.test(Ue(a));
    }
    function Bs(a) {
      if (!Lr(a))
        return y(a);
      var c = [];
      for (var v in Object(a))
        Qe.call(a, v) && v != "constructor" && c.push(v);
      return c;
    }
    function Nn(a, c) {
      if (c)
        return a.slice();
      var v = new a.constructor(a.length);
      return a.copy(v), v;
    }
    function Zn(a) {
      var c = new a.constructor(a.byteLength);
      return new mt(c).set(new mt(a)), c;
    }
    function nn(a, c) {
      var v = c ? Zn(a.buffer) : a.buffer;
      return new a.constructor(v, a.byteOffset, a.byteLength);
    }
    function Cr(a, c, v) {
      var I = c ? v(ke(a), !0) : ke(a);
      return ce(I, ve, new a.constructor());
    }
    function kr(a) {
      var c = new a.constructor(a.source, C.exec(a));
      return c.lastIndex = a.lastIndex, c;
    }
    function Fs(a, c, v) {
      var I = c ? v(bn(a), !0) : bn(a);
      return ce(I, re, new a.constructor());
    }
    function Ms(a) {
      return Nr ? Object(Nr.call(a)) : {};
    }
    function Ps(a, c) {
      var v = c ? Zn(a.buffer) : a.buffer;
      return new a.constructor(v, a.byteOffset, a.length);
    }
    function js(a, c) {
      var v = -1, I = a.length;
      for (c || (c = Array(I)); ++v < I; )
        c[v] = a[v];
      return c;
    }
    function Yn(a, c, v, I) {
      v || (v = {});
      for (var ne = -1, Y = c.length; ++ne < Y; ) {
        var he = c[ne], ue = void 0;
        Sr(v, he, ue === void 0 ? a[he] : ue);
      }
      return v;
    }
    function Us(a, c) {
      return Yn(a, kt(a), c);
    }
    function Vs(a) {
      return Rs(a, Jn, kt);
    }
    function rn(a, c) {
      var v = a.__data__;
      return Gs(c) ? v[typeof c == "string" ? "string" : "hash"] : v.map;
    }
    function it(a, c) {
      var v = me(a, c);
      return Ds(v) ? v : void 0;
    }
    var kt = tn ? Dt(tn, Object) : Ys, Lt = $s;
    (R && Lt(new R(new ArrayBuffer(1))) != ie || B && Lt(new B()) != h || ee && Lt(ee.resolve()) != k || de && Lt(new de()) != q || je && Lt(new je()) != X) && (Lt = function(a) {
      var c = Nt.call(a), v = c == E ? a.constructor : void 0, I = v ? Ue(v) : void 0;
      if (I)
        switch (I) {
          case Mt:
            return ie;
          case St:
            return h;
          case We:
            return k;
          case Hn:
            return q;
          case Kn:
            return X;
        }
      return c;
    });
    function zs(a) {
      var c = a.length, v = a.constructor(c);
      return c && typeof a[0] == "string" && Qe.call(a, "index") && (v.index = a.index, v.input = a.input), v;
    }
    function bt(a) {
      return typeof a.constructor == "function" && !Lr(a) ? Os(He(a)) : {};
    }
    function Hs(a, c, v, I) {
      var ne = a.constructor;
      switch (c) {
        case K:
          return Zn(a);
        case l:
        case u:
          return new ne(+a);
        case ie:
          return nn(a, I);
        case ae:
        case be:
        case Ee:
        case ye:
        case b:
        case F:
        case S:
        case L:
        case f:
          return Ps(a, I);
        case h:
          return Cr(a, I, v);
        case A:
        case U:
          return new ne(a);
        case _:
          return kr(a);
        case q:
          return Fs(a, I, v);
        case z:
          return Ms(a);
      }
    }
    function Ks(a, c) {
      return c = c ?? s, !!c && (typeof a == "number" || D.test(a)) && a > -1 && a % 1 == 0 && a < c;
    }
    function Gs(a) {
      var c = typeof a;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? a !== "__proto__" : a === null;
    }
    function Ws(a) {
      return !!yn && yn in a;
    }
    function Lr(a) {
      var c = a && a.constructor, v = typeof c == "function" && c.prototype || Bt;
      return a === v;
    }
    function Ue(a) {
      if (a != null) {
        try {
          return vn.call(a);
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
    function Tn(a) {
      return Zs(a) && Qe.call(a, "callee") && (!wn.call(a, "callee") || Nt.call(a) == i);
    }
    var Xn = Array.isArray;
    function Sn(a) {
      return a != null && Or(a.length) && !Qn(a);
    }
    function Zs(a) {
      return Rr(a) && Sn(a);
    }
    var Ir = m || Xs;
    function Qn(a) {
      var c = yt(a) ? Nt.call(a) : "";
      return c == p || c == g;
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
      return Sn(a) ? An(a) : Bs(a);
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
var Da;
function pl() {
  return Da || (Da = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 1, i = 2, o = 9007199254740991, l = "[object Arguments]", u = "[object Array]", d = "[object AsyncFunction]", p = "[object Boolean]", g = "[object Date]", h = "[object Error]", A = "[object Function]", E = "[object GeneratorFunction]", k = "[object Map]", _ = "[object Number]", q = "[object Null]", U = "[object Object]", z = "[object Promise]", X = "[object Proxy]", K = "[object RegExp]", ie = "[object Set]", ae = "[object String]", be = "[object Symbol]", Ee = "[object Undefined]", ye = "[object WeakMap]", b = "[object ArrayBuffer]", F = "[object DataView]", S = "[object Float32Array]", L = "[object Float64Array]", f = "[object Int8Array]", w = "[object Int16Array]", C = "[object Int32Array]", P = "[object Uint8Array]", D = "[object Uint8ClampedArray]", T = "[object Uint16Array]", N = "[object Uint32Array]", j = /[\\^$.*+?()[\]{}|]/g, V = /^\[object .+?Constructor\]$/, J = /^(?:0|[1-9]\d*)$/, Z = {};
    Z[S] = Z[L] = Z[f] = Z[w] = Z[C] = Z[P] = Z[D] = Z[T] = Z[N] = !0, Z[l] = Z[u] = Z[b] = Z[p] = Z[F] = Z[g] = Z[h] = Z[A] = Z[k] = Z[_] = Z[U] = Z[K] = Z[ie] = Z[ae] = Z[ye] = !1;
    var fe = typeof Ht == "object" && Ht && Ht.Object === Object && Ht, ve = typeof self == "object" && self && self.Object === Object && self, re = fe || ve || Function("return this")(), oe = e && !e.nodeType && e, le = oe && !0 && n && !n.nodeType && n, ce = le && le.exports === oe, pe = ce && fe.process, me = (function() {
      try {
        return pe && pe.binding && pe.binding("util");
      } catch {
      }
    })(), Ae = me && me.isTypedArray;
    function ke(a, c) {
      for (var v = -1, I = a == null ? 0 : a.length, ne = 0, Y = []; ++v < I; ) {
        var he = a[v];
        c(he, v, a) && (Y[ne++] = he);
      }
      return Y;
    }
    function Dt(a, c) {
      for (var v = -1, I = c.length, ne = a.length; ++v < I; )
        a[ne + v] = c[v];
      return a;
    }
    function bn(a, c) {
      for (var v = -1, I = a == null ? 0 : a.length; ++v < I; )
        if (c(a[v], v, a))
          return !0;
      return !1;
    }
    function Un(a, c) {
      for (var v = -1, I = Array(a); ++v < a; )
        I[v] = c(v);
      return I;
    }
    function Vn(a) {
      return function(c) {
        return a(c);
      };
    }
    function Bt(a, c) {
      return a.has(c);
    }
    function en(a, c) {
      return a?.[c];
    }
    function yn(a) {
      var c = -1, v = Array(a.size);
      return a.forEach(function(I, ne) {
        v[++c] = [ne, I];
      }), v;
    }
    function vn(a, c) {
      return function(v) {
        return a(c(v));
      };
    }
    function Qe(a) {
      var c = -1, v = Array(a.size);
      return a.forEach(function(I) {
        v[++c] = I;
      }), v;
    }
    var Nt = Array.prototype, Ft = Function.prototype, pt = Object.prototype, st = re["__core-js_shared__"], mt = Ft.toString, He = pt.hasOwnProperty, xn = (function() {
      var a = /[^.]+$/.exec(st && st.keys && st.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), wn = pt.toString, zn = RegExp(
      "^" + mt.call(He).replace(j, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), tn = ce ? re.Buffer : void 0, m = re.Symbol, y = re.Uint8Array, R = pt.propertyIsEnumerable, B = Nt.splice, ee = m ? m.toStringTag : void 0, de = Object.getOwnPropertySymbols, je = tn ? tn.isBuffer : void 0, Tt = vn(Object.keys, Object), Mt = kt(re, "DataView"), St = kt(re, "Map"), We = kt(re, "Promise"), Hn = kt(re, "Set"), Kn = kt(re, "WeakMap"), Pt = kt(Object, "create"), Nr = Ue(Mt), Ct = Ue(St), ms = Ue(We), gs = Ue(Hn), bs = Ue(Kn), Tr = m ? m.prototype : void 0, Gn = Tr ? Tr.valueOf : void 0;
    function _e(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.clear(); ++c < v; ) {
        var I = a[c];
        this.set(I[0], I[1]);
      }
    }
    function ys() {
      this.__data__ = Pt ? Pt(null) : {}, this.size = 0;
    }
    function vs(a) {
      var c = this.has(a) && delete this.__data__[a];
      return this.size -= c ? 1 : 0, c;
    }
    function xs(a) {
      var c = this.__data__;
      if (Pt) {
        var v = c[a];
        return v === r ? void 0 : v;
      }
      return He.call(c, a) ? c[a] : void 0;
    }
    function ws(a) {
      var c = this.__data__;
      return Pt ? c[a] !== void 0 : He.call(c, a);
    }
    function As(a, c) {
      var v = this.__data__;
      return this.size += this.has(a) ? 0 : 1, v[a] = Pt && c === void 0 ? r : c, this;
    }
    _e.prototype.clear = ys, _e.prototype.delete = vs, _e.prototype.get = xs, _e.prototype.has = ws, _e.prototype.set = As;
    function Re(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.clear(); ++c < v; ) {
        var I = a[c];
        this.set(I[0], I[1]);
      }
    }
    function Es() {
      this.__data__ = [], this.size = 0;
    }
    function Ns(a) {
      var c = this.__data__, v = Nn(c, a);
      if (v < 0)
        return !1;
      var I = c.length - 1;
      return v == I ? c.pop() : B.call(c, v, 1), --this.size, !0;
    }
    function Ts(a) {
      var c = this.__data__, v = Nn(c, a);
      return v < 0 ? void 0 : c[v][1];
    }
    function Ss(a) {
      return Nn(this.__data__, a) > -1;
    }
    function Cs(a, c) {
      var v = this.__data__, I = Nn(v, a);
      return I < 0 ? (++this.size, v.push([a, c])) : v[I][1] = c, this;
    }
    Re.prototype.clear = Es, Re.prototype.delete = Ns, Re.prototype.get = Ts, Re.prototype.has = Ss, Re.prototype.set = Cs;
    function Ke(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.clear(); ++c < v; ) {
        var I = a[c];
        this.set(I[0], I[1]);
      }
    }
    function ks() {
      this.size = 0, this.__data__ = {
        hash: new _e(),
        map: new (St || Re)(),
        string: new _e()
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
      var v = it(this, a), I = v.size;
      return v.set(a, c), this.size += v.size == I ? 0 : 1, this;
    }
    Ke.prototype.clear = ks, Ke.prototype.delete = Ls, Ke.prototype.get = _s, Ke.prototype.has = qs, Ke.prototype.set = Is;
    function An(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.__data__ = new Ke(); ++c < v; )
        this.add(a[c]);
    }
    function Sr(a) {
      return this.__data__.set(a, r), this;
    }
    function En(a) {
      return this.__data__.has(a);
    }
    An.prototype.add = An.prototype.push = Sr, An.prototype.has = En;
    function gt(a) {
      var c = this.__data__ = new Re(a);
      this.size = c.size;
    }
    function Wn() {
      this.__data__ = new Re(), this.size = 0;
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
      if (v instanceof Re) {
        var I = v.__data__;
        if (!St || I.length < t - 1)
          return I.push([a, c]), this.size = ++v.size, this;
        v = this.__data__ = new Ke(I);
      }
      return v.set(a, c), this.size = v.size, this;
    }
    gt.prototype.clear = Wn, gt.prototype.delete = Os, gt.prototype.get = Rs, gt.prototype.has = $s, gt.prototype.set = Ds;
    function Bs(a, c) {
      var v = Tn(a), I = !v && qr(a), ne = !v && !I && Sn(a), Y = !v && !I && !ne && Rr(a), he = v || I || ne || Y, ue = he ? Un(a.length, String) : [], Ne = ue.length;
      for (var ge in a)
        He.call(a, ge) && !(he && // Safari 9 has enumerable `arguments.length` in strict mode.
        (ge == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        ne && (ge == "offset" || ge == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Y && (ge == "buffer" || ge == "byteLength" || ge == "byteOffset") || // Skip index properties.
        Hs(ge, Ne))) && ue.push(ge);
      return ue;
    }
    function Nn(a, c) {
      for (var v = a.length; v--; )
        if (_r(a[v][0], c))
          return v;
      return -1;
    }
    function Zn(a, c, v) {
      var I = c(a);
      return Tn(a) ? I : Dt(I, v(a));
    }
    function nn(a) {
      return a == null ? a === void 0 ? Ee : q : ee && ee in Object(a) ? Lt(a) : Lr(a);
    }
    function Cr(a) {
      return yt(a) && nn(a) == l;
    }
    function kr(a, c, v, I, ne) {
      return a === c ? !0 : a == null || c == null || !yt(a) && !yt(c) ? a !== a && c !== c : Fs(a, c, v, I, kr, ne);
    }
    function Fs(a, c, v, I, ne, Y) {
      var he = Tn(a), ue = Tn(c), Ne = he ? u : bt(a), ge = ue ? u : bt(c);
      Ne = Ne == l ? U : Ne, ge = ge == l ? U : ge;
      var $e = Ne == U, Ge = ge == U, Se = Ne == ge;
      if (Se && Sn(a)) {
        if (!Sn(c))
          return !1;
        he = !0, $e = !1;
      }
      if (Se && !$e)
        return Y || (Y = new gt()), he || Rr(a) ? Yn(a, c, v, I, ne, Y) : Us(a, c, Ne, v, I, ne, Y);
      if (!(v & s)) {
        var De = $e && He.call(a, "__wrapped__"), qe = Ge && He.call(c, "__wrapped__");
        if (De || qe) {
          var jt = De ? a.value() : a, _t = qe ? c.value() : c;
          return Y || (Y = new gt()), ne(jt, _t, v, I, Y);
        }
      }
      return Se ? (Y || (Y = new gt()), Vs(a, c, v, I, ne, Y)) : !1;
    }
    function Ms(a) {
      if (!Or(a) || Gs(a))
        return !1;
      var c = Ir(a) ? zn : V;
      return c.test(Ue(a));
    }
    function Ps(a) {
      return yt(a) && Qn(a.length) && !!Z[nn(a)];
    }
    function js(a) {
      if (!Ws(a))
        return Tt(a);
      var c = [];
      for (var v in Object(a))
        He.call(a, v) && v != "constructor" && c.push(v);
      return c;
    }
    function Yn(a, c, v, I, ne, Y) {
      var he = v & s, ue = a.length, Ne = c.length;
      if (ue != Ne && !(he && Ne > ue))
        return !1;
      var ge = Y.get(a);
      if (ge && Y.get(c))
        return ge == c;
      var $e = -1, Ge = !0, Se = v & i ? new An() : void 0;
      for (Y.set(a, c), Y.set(c, a); ++$e < ue; ) {
        var De = a[$e], qe = c[$e];
        if (I)
          var jt = he ? I(qe, De, $e, c, a, Y) : I(De, qe, $e, a, c, Y);
        if (jt !== void 0) {
          if (jt)
            continue;
          Ge = !1;
          break;
        }
        if (Se) {
          if (!bn(c, function(_t, sn) {
            if (!Bt(Se, sn) && (De === _t || ne(De, _t, v, I, Y)))
              return Se.push(sn);
          })) {
            Ge = !1;
            break;
          }
        } else if (!(De === qe || ne(De, qe, v, I, Y))) {
          Ge = !1;
          break;
        }
      }
      return Y.delete(a), Y.delete(c), Ge;
    }
    function Us(a, c, v, I, ne, Y, he) {
      switch (v) {
        case F:
          if (a.byteLength != c.byteLength || a.byteOffset != c.byteOffset)
            return !1;
          a = a.buffer, c = c.buffer;
        case b:
          return !(a.byteLength != c.byteLength || !Y(new y(a), new y(c)));
        case p:
        case g:
        case _:
          return _r(+a, +c);
        case h:
          return a.name == c.name && a.message == c.message;
        case K:
        case ae:
          return a == c + "";
        case k:
          var ue = yn;
        case ie:
          var Ne = I & s;
          if (ue || (ue = Qe), a.size != c.size && !Ne)
            return !1;
          var ge = he.get(a);
          if (ge)
            return ge == c;
          I |= i, he.set(a, c);
          var $e = Yn(ue(a), ue(c), I, ne, Y, he);
          return he.delete(a), $e;
        case be:
          if (Gn)
            return Gn.call(a) == Gn.call(c);
      }
      return !1;
    }
    function Vs(a, c, v, I, ne, Y) {
      var he = v & s, ue = rn(a), Ne = ue.length, ge = rn(c), $e = ge.length;
      if (Ne != $e && !he)
        return !1;
      for (var Ge = Ne; Ge--; ) {
        var Se = ue[Ge];
        if (!(he ? Se in c : He.call(c, Se)))
          return !1;
      }
      var De = Y.get(a);
      if (De && Y.get(c))
        return De == c;
      var qe = !0;
      Y.set(a, c), Y.set(c, a);
      for (var jt = he; ++Ge < Ne; ) {
        Se = ue[Ge];
        var _t = a[Se], sn = c[Se];
        if (I)
          var sa = he ? I(sn, _t, Se, c, a, Y) : I(_t, sn, Se, a, c, Y);
        if (!(sa === void 0 ? _t === sn || ne(_t, sn, v, I, Y) : sa)) {
          qe = !1;
          break;
        }
        jt || (jt = Se == "constructor");
      }
      if (qe && !jt) {
        var $r = a.constructor, Dr = c.constructor;
        $r != Dr && "constructor" in a && "constructor" in c && !(typeof $r == "function" && $r instanceof $r && typeof Dr == "function" && Dr instanceof Dr) && (qe = !1);
      }
      return Y.delete(a), Y.delete(c), qe;
    }
    function rn(a) {
      return Zn(a, Jn, zs);
    }
    function it(a, c) {
      var v = a.__data__;
      return Ks(c) ? v[typeof c == "string" ? "string" : "hash"] : v.map;
    }
    function kt(a, c) {
      var v = en(a, c);
      return Ms(v) ? v : void 0;
    }
    function Lt(a) {
      var c = He.call(a, ee), v = a[ee];
      try {
        a[ee] = void 0;
        var I = !0;
      } catch {
      }
      var ne = wn.call(a);
      return I && (c ? a[ee] = v : delete a[ee]), ne;
    }
    var zs = de ? function(a) {
      return a == null ? [] : (a = Object(a), ke(de(a), function(c) {
        return R.call(a, c);
      }));
    } : Ys, bt = nn;
    (Mt && bt(new Mt(new ArrayBuffer(1))) != F || St && bt(new St()) != k || We && bt(We.resolve()) != z || Hn && bt(new Hn()) != ie || Kn && bt(new Kn()) != ye) && (bt = function(a) {
      var c = nn(a), v = c == U ? a.constructor : void 0, I = v ? Ue(v) : "";
      if (I)
        switch (I) {
          case Nr:
            return F;
          case Ct:
            return k;
          case ms:
            return z;
          case gs:
            return ie;
          case bs:
            return ye;
        }
      return c;
    });
    function Hs(a, c) {
      return c = c ?? o, !!c && (typeof a == "number" || J.test(a)) && a > -1 && a % 1 == 0 && a < c;
    }
    function Ks(a) {
      var c = typeof a;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? a !== "__proto__" : a === null;
    }
    function Gs(a) {
      return !!xn && xn in a;
    }
    function Ws(a) {
      var c = a && a.constructor, v = typeof c == "function" && c.prototype || pt;
      return a === v;
    }
    function Lr(a) {
      return wn.call(a);
    }
    function Ue(a) {
      if (a != null) {
        try {
          return mt.call(a);
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
      return yt(a) && He.call(a, "callee") && !R.call(a, "callee");
    }, Tn = Array.isArray;
    function Xn(a) {
      return a != null && Qn(a.length) && !Ir(a);
    }
    var Sn = je || Xs;
    function Zs(a, c) {
      return kr(a, c);
    }
    function Ir(a) {
      if (!Or(a))
        return !1;
      var c = nn(a);
      return c == A || c == E || c == d || c == X;
    }
    function Qn(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= o;
    }
    function Or(a) {
      var c = typeof a;
      return a != null && (c == "object" || c == "function");
    }
    function yt(a) {
      return a != null && typeof a == "object";
    }
    var Rr = Ae ? Vn(Ae) : Ps;
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
var Mr = {}, Ba;
function km() {
  if (Ba) return Mr;
  Ba = 1, Object.defineProperty(Mr, "__esModule", { value: !0 });
  const n = fl(), e = pl();
  var t;
  return (function(r) {
    function s(u = {}, d = {}, p = !1) {
      typeof u != "object" && (u = {}), typeof d != "object" && (d = {});
      let g = n(d);
      p || (g = Object.keys(g).reduce((h, A) => (g[A] != null && (h[A] = g[A]), h), {}));
      for (const h in u)
        u[h] !== void 0 && d[h] === void 0 && (g[h] = u[h]);
      return Object.keys(g).length > 0 ? g : void 0;
    }
    r.compose = s;
    function i(u = {}, d = {}) {
      typeof u != "object" && (u = {}), typeof d != "object" && (d = {});
      const p = Object.keys(u).concat(Object.keys(d)).reduce((g, h) => (e(u[h], d[h]) || (g[h] = d[h] === void 0 ? null : d[h]), g), {});
      return Object.keys(p).length > 0 ? p : void 0;
    }
    r.diff = i;
    function o(u = {}, d = {}) {
      u = u || {};
      const p = Object.keys(d).reduce((g, h) => (d[h] !== u[h] && u[h] !== void 0 && (g[h] = d[h]), g), {});
      return Object.keys(u).reduce((g, h) => (u[h] !== d[h] && d[h] === void 0 && (g[h] = null), g), p);
    }
    r.invert = o;
    function l(u, d, p = !1) {
      if (typeof u != "object")
        return d;
      if (typeof d != "object")
        return;
      if (!p)
        return d;
      const g = Object.keys(d).reduce((h, A) => (u[A] === void 0 && (h[A] = d[A]), h), {});
      return Object.keys(g).length > 0 ? g : void 0;
    }
    r.transform = l;
  })(t || (t = {})), Mr.default = t, Mr;
}
var Pr = {}, Fa;
function ml() {
  if (Fa) return Pr;
  Fa = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  var n;
  return (function(e) {
    function t(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    e.length = t;
  })(n || (n = {})), Pr.default = n, Pr;
}
var jr = {}, Ma;
function Lm() {
  if (Ma) return jr;
  Ma = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  const n = ml();
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
  return jr.default = e, jr;
}
var Pa;
function _m() {
  return Pa || (Pa = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = Cm(), r = fl(), s = pl(), i = km();
    e.AttributeMap = i.default;
    const o = ml();
    e.Op = o.default;
    const l = Lm();
    e.OpIterator = l.default;
    const u = "\0", d = (g, h) => {
      if (typeof g != "object" || g === null)
        throw new Error(`cannot retain a ${typeof g}`);
      if (typeof h != "object" || h === null)
        throw new Error(`cannot retain a ${typeof h}`);
      const A = Object.keys(g)[0];
      if (!A || A !== Object.keys(h)[0])
        throw new Error(`embed types not matched: ${A} != ${Object.keys(h)[0]}`);
      return [A, g[A], h[A]];
    };
    class p {
      constructor(h) {
        Array.isArray(h) ? this.ops = h : h != null && Array.isArray(h.ops) ? this.ops = h.ops : this.ops = [];
      }
      static registerEmbed(h, A) {
        this.handlers[h] = A;
      }
      static unregisterEmbed(h) {
        delete this.handlers[h];
      }
      static getHandler(h) {
        const A = this.handlers[h];
        if (!A)
          throw new Error(`no handlers for embed type "${h}"`);
        return A;
      }
      insert(h, A) {
        const E = {};
        return typeof h == "string" && h.length === 0 ? this : (E.insert = h, A != null && typeof A == "object" && Object.keys(A).length > 0 && (E.attributes = A), this.push(E));
      }
      delete(h) {
        return h <= 0 ? this : this.push({ delete: h });
      }
      retain(h, A) {
        if (typeof h == "number" && h <= 0)
          return this;
        const E = { retain: h };
        return A != null && typeof A == "object" && Object.keys(A).length > 0 && (E.attributes = A), this.push(E);
      }
      push(h) {
        let A = this.ops.length, E = this.ops[A - 1];
        if (h = r(h), typeof E == "object") {
          if (typeof h.delete == "number" && typeof E.delete == "number")
            return this.ops[A - 1] = { delete: E.delete + h.delete }, this;
          if (typeof E.delete == "number" && h.insert != null && (A -= 1, E = this.ops[A - 1], typeof E != "object"))
            return this.ops.unshift(h), this;
          if (s(h.attributes, E.attributes)) {
            if (typeof h.insert == "string" && typeof E.insert == "string")
              return this.ops[A - 1] = { insert: E.insert + h.insert }, typeof h.attributes == "object" && (this.ops[A - 1].attributes = h.attributes), this;
            if (typeof h.retain == "number" && typeof E.retain == "number")
              return this.ops[A - 1] = { retain: E.retain + h.retain }, typeof h.attributes == "object" && (this.ops[A - 1].attributes = h.attributes), this;
          }
        }
        return A === this.ops.length ? this.ops.push(h) : this.ops.splice(A, 0, h), this;
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
        const A = [], E = [];
        return this.forEach((k) => {
          (h(k) ? A : E).push(k);
        }), [A, E];
      }
      reduce(h, A) {
        return this.ops.reduce(h, A);
      }
      changeLength() {
        return this.reduce((h, A) => A.insert ? h + o.default.length(A) : A.delete ? h - A.delete : h, 0);
      }
      length() {
        return this.reduce((h, A) => h + o.default.length(A), 0);
      }
      slice(h = 0, A = 1 / 0) {
        const E = [], k = new l.default(this.ops);
        let _ = 0;
        for (; _ < A && k.hasNext(); ) {
          let q;
          _ < h ? q = k.next(h - _) : (q = k.next(A - _), E.push(q)), _ += o.default.length(q);
        }
        return new p(E);
      }
      compose(h) {
        const A = new l.default(this.ops), E = new l.default(h.ops), k = [], _ = E.peek();
        if (_ != null && typeof _.retain == "number" && _.attributes == null) {
          let U = _.retain;
          for (; A.peekType() === "insert" && A.peekLength() <= U; )
            U -= A.peekLength(), k.push(A.next());
          _.retain - U > 0 && E.next(_.retain - U);
        }
        const q = new p(k);
        for (; A.hasNext() || E.hasNext(); )
          if (E.peekType() === "insert")
            q.push(E.next());
          else if (A.peekType() === "delete")
            q.push(A.next());
          else {
            const U = Math.min(A.peekLength(), E.peekLength()), z = A.next(U), X = E.next(U);
            if (X.retain) {
              const K = {};
              if (typeof z.retain == "number")
                K.retain = typeof X.retain == "number" ? U : X.retain;
              else if (typeof X.retain == "number")
                z.retain == null ? K.insert = z.insert : K.retain = z.retain;
              else {
                const ae = z.retain == null ? "insert" : "retain", [be, Ee, ye] = d(z[ae], X.retain), b = p.getHandler(be);
                K[ae] = {
                  [be]: b.compose(Ee, ye, ae === "retain")
                };
              }
              const ie = i.default.compose(z.attributes, X.attributes, typeof z.retain == "number");
              if (ie && (K.attributes = ie), q.push(K), !E.hasNext() && s(q.ops[q.ops.length - 1], K)) {
                const ae = new p(A.rest());
                return q.concat(ae).chop();
              }
            } else typeof X.delete == "number" && (typeof z.retain == "number" || typeof z.retain == "object" && z.retain !== null) && q.push(X);
          }
        return q.chop();
      }
      concat(h) {
        const A = new p(this.ops.slice());
        return h.ops.length > 0 && (A.push(h.ops[0]), A.ops = A.ops.concat(h.ops.slice(1))), A;
      }
      diff(h, A) {
        if (this.ops === h.ops)
          return new p();
        const E = [this, h].map((z) => z.map((X) => {
          if (X.insert != null)
            return typeof X.insert == "string" ? X.insert : u;
          const K = z === h ? "on" : "with";
          throw new Error("diff() called " + K + " non-document");
        }).join("")), k = new p(), _ = t(E[0], E[1], A, !0), q = new l.default(this.ops), U = new l.default(h.ops);
        return _.forEach((z) => {
          let X = z[1].length;
          for (; X > 0; ) {
            let K = 0;
            switch (z[0]) {
              case t.INSERT:
                K = Math.min(U.peekLength(), X), k.push(U.next(K));
                break;
              case t.DELETE:
                K = Math.min(X, q.peekLength()), q.next(K), k.delete(K);
                break;
              case t.EQUAL:
                K = Math.min(q.peekLength(), U.peekLength(), X);
                const ie = q.next(K), ae = U.next(K);
                s(ie.insert, ae.insert) ? k.retain(K, i.default.diff(ie.attributes, ae.attributes)) : k.push(ae).delete(K);
                break;
            }
            X -= K;
          }
        }), k.chop();
      }
      eachLine(h, A = `
`) {
        const E = new l.default(this.ops);
        let k = new p(), _ = 0;
        for (; E.hasNext(); ) {
          if (E.peekType() !== "insert")
            return;
          const q = E.peek(), U = o.default.length(q) - E.peekLength(), z = typeof q.insert == "string" ? q.insert.indexOf(A, U) - U : -1;
          if (z < 0)
            k.push(E.next());
          else if (z > 0)
            k.push(E.next(z));
          else {
            if (h(k, E.next(1).attributes || {}, _) === !1)
              return;
            _ += 1, k = new p();
          }
        }
        k.length() > 0 && h(k, {}, _);
      }
      invert(h) {
        const A = new p();
        return this.reduce((E, k) => {
          if (k.insert)
            A.delete(o.default.length(k));
          else {
            if (typeof k.retain == "number" && k.attributes == null)
              return A.retain(k.retain), E + k.retain;
            if (k.delete || typeof k.retain == "number") {
              const _ = k.delete || k.retain;
              return h.slice(E, E + _).forEach((U) => {
                k.delete ? A.push(U) : k.retain && k.attributes && A.retain(o.default.length(U), i.default.invert(k.attributes, U.attributes));
              }), E + _;
            } else if (typeof k.retain == "object" && k.retain !== null) {
              const _ = h.slice(E, E + 1), q = new l.default(_.ops).next(), [U, z, X] = d(k.retain, q.insert), K = p.getHandler(U);
              return A.retain({ [U]: K.invert(z, X) }, i.default.invert(k.attributes, q.attributes)), E + 1;
            }
          }
          return E;
        }, 0), A.chop();
      }
      transform(h, A = !1) {
        if (A = !!A, typeof h == "number")
          return this.transformPosition(h, A);
        const E = h, k = new l.default(this.ops), _ = new l.default(E.ops), q = new p();
        for (; k.hasNext() || _.hasNext(); )
          if (k.peekType() === "insert" && (A || _.peekType() !== "insert"))
            q.retain(o.default.length(k.next()));
          else if (_.peekType() === "insert")
            q.push(_.next());
          else {
            const U = Math.min(k.peekLength(), _.peekLength()), z = k.next(U), X = _.next(U);
            if (z.delete)
              continue;
            if (X.delete)
              q.push(X);
            else {
              const K = z.retain, ie = X.retain;
              let ae = typeof ie == "object" && ie !== null ? ie : U;
              if (typeof K == "object" && K !== null && typeof ie == "object" && ie !== null) {
                const be = Object.keys(K)[0];
                if (be === Object.keys(ie)[0]) {
                  const Ee = p.getHandler(be);
                  Ee && (ae = {
                    [be]: Ee.transform(K[be], ie[be], A)
                  });
                }
              }
              q.retain(ae, i.default.transform(z.attributes, X.attributes, A));
            }
          }
        return q.chop();
      }
      transformPosition(h, A = !1) {
        A = !!A;
        const E = new l.default(this.ops);
        let k = 0;
        for (; E.hasNext() && k <= h; ) {
          const _ = E.peekLength(), q = E.peekType();
          if (E.next(), q === "delete") {
            h -= Math.min(_, h - k);
            continue;
          } else q === "insert" && (k < h || !A) && (h += _);
          k += _;
        }
        return h;
      }
    }
    p.Op = o.default, p.OpIterator = l.default, p.AttributeMap = i.default, p.handlers = {}, e.default = p, n.exports = p, n.exports.default = p;
  })(Fr, Fr.exports)), Fr.exports;
}
var rt = _m();
const G = /* @__PURE__ */ hl(rt);
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
let dt = class extends ts {
};
const qm = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function hs(n) {
  return n.replace(/[&<>"']/g, (e) => qm[e]);
}
class Ve extends Hi {
  static allowedChildren = [Ve, ft, Xe, dt];
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
    if (Ve.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, W.BLOT)) {
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
const ja = 1;
class Oe extends pr {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = gl(this)), this.cache.delta;
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
Oe.blotName = "block";
Oe.tagName = "P";
Oe.defaultChild = ft;
Oe.allowedChildren = [ft, Ve, Xe, dt];
class nt extends Xe {
  attach() {
    super.attach(), this.attributes = new cs(this.domNode);
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
      const d = this.scroll.create(Oe.blotName);
      return d.insertAt(0, u), d;
    }), l = this.split(e);
    o.forEach((u) => {
      this.parent.insertBefore(u, l);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), l);
  }
}
nt.scope = W.BLOCK_BLOT;
function gl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n.descendants(Fe).reduce((t, r) => r.length() === 0 ? t : t.insert(r.value(), et(r, {}, e)), new G()).insert(`
`, et(n));
}
function et(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return n == null || ("formats" in n && typeof n.formats == "function" && (e = {
    ...e,
    ...n.formats()
  }, t && delete e["code-token"]), n.parent == null || n.parent.statics.blotName === "scroll" || n.parent.statics.scope !== n.statics.scope) ? e : et(n.parent, e, t);
}
class lt extends Xe {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(e, t, r) {
    super(e, t), this.selection = r, this.textNode = document.createTextNode(lt.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
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
    r != null && (this.savedLength = lt.CONTENTS.length, r.optimize(), r.formatAt(s, lt.CONTENTS.length, e, t), this.savedLength = 0);
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
    } = this, l = o.data.split(lt.CONTENTS).join("");
    o.data = lt.CONTENTS;
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
      const d = (h, A) => t && h === t.domNode ? A : h === o ? r + A - 1 : s && h === s.domNode ? r + l.length + A : null, p = d(e.start.node, e.start.offset), g = d(e.end.node, e.end.offset);
      if (p !== null && g !== null)
        return {
          startNode: u.domNode,
          startOffset: p,
          endNode: u.domNode,
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
        this.savedLength = lt.CONTENTS.length, t.isolate(this.offset(t), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      t = t.parent;
    }
  }
  value() {
    return "";
  }
}
var ri = { exports: {} }, Ua;
function Im() {
  return Ua || (Ua = 1, (function(n) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (t = !1));
    function s(u, d, p) {
      this.fn = u, this.context = d, this.once = p || !1;
    }
    function i(u, d, p, g, h) {
      if (typeof p != "function")
        throw new TypeError("The listener must be a function");
      var A = new s(p, g || u, h), E = t ? t + d : d;
      return u._events[E] ? u._events[E].fn ? u._events[E] = [u._events[E], A] : u._events[E].push(A) : (u._events[E] = A, u._eventsCount++), u;
    }
    function o(u, d) {
      --u._eventsCount === 0 ? u._events = new r() : delete u._events[d];
    }
    function l() {
      this._events = new r(), this._eventsCount = 0;
    }
    l.prototype.eventNames = function() {
      var d = [], p, g;
      if (this._eventsCount === 0) return d;
      for (g in p = this._events)
        e.call(p, g) && d.push(t ? g.slice(1) : g);
      return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(p)) : d;
    }, l.prototype.listeners = function(d) {
      var p = t ? t + d : d, g = this._events[p];
      if (!g) return [];
      if (g.fn) return [g.fn];
      for (var h = 0, A = g.length, E = new Array(A); h < A; h++)
        E[h] = g[h].fn;
      return E;
    }, l.prototype.listenerCount = function(d) {
      var p = t ? t + d : d, g = this._events[p];
      return g ? g.fn ? 1 : g.length : 0;
    }, l.prototype.emit = function(d, p, g, h, A, E) {
      var k = t ? t + d : d;
      if (!this._events[k]) return !1;
      var _ = this._events[k], q = arguments.length, U, z;
      if (_.fn) {
        switch (_.once && this.removeListener(d, _.fn, void 0, !0), q) {
          case 1:
            return _.fn.call(_.context), !0;
          case 2:
            return _.fn.call(_.context, p), !0;
          case 3:
            return _.fn.call(_.context, p, g), !0;
          case 4:
            return _.fn.call(_.context, p, g, h), !0;
          case 5:
            return _.fn.call(_.context, p, g, h, A), !0;
          case 6:
            return _.fn.call(_.context, p, g, h, A, E), !0;
        }
        for (z = 1, U = new Array(q - 1); z < q; z++)
          U[z - 1] = arguments[z];
        _.fn.apply(_.context, U);
      } else {
        var X = _.length, K;
        for (z = 0; z < X; z++)
          switch (_[z].once && this.removeListener(d, _[z].fn, void 0, !0), q) {
            case 1:
              _[z].fn.call(_[z].context);
              break;
            case 2:
              _[z].fn.call(_[z].context, p);
              break;
            case 3:
              _[z].fn.call(_[z].context, p, g);
              break;
            case 4:
              _[z].fn.call(_[z].context, p, g, h);
              break;
            default:
              if (!U) for (K = 1, U = new Array(q - 1); K < q; K++)
                U[K - 1] = arguments[K];
              _[z].fn.apply(_[z].context, U);
          }
      }
      return !0;
    }, l.prototype.on = function(d, p, g) {
      return i(this, d, p, g, !1);
    }, l.prototype.once = function(d, p, g) {
      return i(this, d, p, g, !0);
    }, l.prototype.removeListener = function(d, p, g, h) {
      var A = t ? t + d : d;
      if (!this._events[A]) return this;
      if (!p)
        return o(this, A), this;
      var E = this._events[A];
      if (E.fn)
        E.fn === p && (!h || E.once) && (!g || E.context === g) && o(this, A);
      else {
        for (var k = 0, _ = [], q = E.length; k < q; k++)
          (E[k].fn !== p || h && !E[k].once || g && E[k].context !== g) && _.push(E[k]);
        _.length ? this._events[A] = _.length === 1 ? _[0] : _ : o(this, A);
      }
      return this;
    }, l.prototype.removeAllListeners = function(d) {
      var p;
      return d ? (p = t ? t + d : d, this._events[p] && o(this, p)) : (this._events = new r(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = t, l.EventEmitter = l, n.exports = l;
  })(ri)), ri.exports;
}
var Om = Im();
const Rm = /* @__PURE__ */ hl(Om), Ci = /* @__PURE__ */ new WeakMap(), ki = ["error", "warn", "log", "info"];
let Li = "warn";
function bl(n) {
  if (Li && ki.indexOf(n) <= ki.indexOf(Li)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
      t[r - 1] = arguments[r];
    console[n](...t);
  }
}
function $t(n) {
  return ki.reduce((e, t) => (e[t] = bl.bind(console, t, n), e), {});
}
$t.level = (n) => {
  Li = n;
};
bl.level = $t.level;
const si = $t("quill:events"), $m = ["selectionchange", "mousedown", "mouseup", "click"];
$m.forEach((n) => {
  document.addEventListener(n, function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    Array.from(document.querySelectorAll(".ql-container")).forEach((s) => {
      const i = Ci.get(s);
      i && i.emitter && i.emitter.handleDOM(...t);
    });
  });
});
class H extends Rm {
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
const ii = $t("quill:selection");
class un {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class Dm {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new un(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
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
        if (s instanceof Fe) {
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
        const [g] = this.scroll.line(e), [h] = this.scroll.line(e + 1);
        g === h && (i = p, o = 0);
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
      const [l, u] = o, d = this.scroll.find(l, !0), p = d.offset(this.scroll);
      return u === 0 ? p : d instanceof Fe ? p + d.index(l, u) : p + d.length();
    }), s = Math.min(Math.max(...r), this.scroll.length() - 1), i = Math.min(s, ...r);
    return new un(i, s - i);
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
      const [o, l] = this.scroll.leaf(s);
      return o ? o.position(l, i) : [null, -1];
    };
    return [...r(e.index, !1), ...r(e.index + e.length, !0)];
  }
  setNativeRange(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : t, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (ii.info("setNativeRange", e, t, r, s), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
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
    if (typeof t == "string" && (r = t, t = !1), ii.info("setRange", e), e != null) {
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
      const i = [H.events.SELECTION_CHANGE, On(this.lastRange), On(t), e];
      this.emitter.emit(H.events.EDITOR_CHANGE, ...i), e !== H.sources.SILENT && this.emitter.emit(...i);
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
const Bm = /^[ -~]*$/;
class Fm {
  constructor(e) {
    this.scroll = e, this.delta = this.getDelta();
  }
  applyDelta(e) {
    this.scroll.update();
    let t = this.scroll.length();
    this.scroll.batchStart();
    const r = Va(e), s = new G();
    return Pm(r.ops.slice()).reduce((o, l) => {
      const u = rt.Op.length(l);
      let d = l.attributes || {}, p = !1, g = !1;
      if (l.insert != null) {
        if (s.retain(u), typeof l.insert == "string") {
          const E = l.insert;
          g = !E.endsWith(`
`) && (t <= o || !!this.scroll.descendant(nt, o)[0]), this.scroll.insertAt(o, E);
          const [k, _] = this.scroll.line(o);
          let q = Gt({}, et(k));
          if (k instanceof Oe) {
            const [U] = k.descendant(Fe, _);
            U && (q = Gt(q, et(U)));
          }
          d = rt.AttributeMap.diff(q, d) || {};
        } else if (typeof l.insert == "object") {
          const E = Object.keys(l.insert)[0];
          if (E == null) return o;
          const k = this.scroll.query(E, W.INLINE) != null;
          if (k)
            (t <= o || this.scroll.descendant(nt, o)[0]) && (g = !0);
          else if (o > 0) {
            const [_, q] = this.scroll.descendant(Fe, o - 1);
            _ instanceof dt ? _.value()[q] !== `
` && (p = !0) : _ instanceof Xe && _.statics.scope === W.INLINE_BLOT && (p = !0);
          }
          if (this.scroll.insertAt(o, E, l.insert[E]), k) {
            const [_] = this.scroll.descendant(Fe, o);
            if (_) {
              const q = Gt({}, et(_));
              d = rt.AttributeMap.diff(q, d) || {};
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
      const h = p ? 1 : 0, A = g ? 1 : 0;
      return t += h + A, s.retain(h), s.delete(A), o + u + h + A;
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
    const s = new G().retain(e).retain(t, On(r));
    return this.update(s);
  }
  formatText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((i) => {
      this.scroll.formatAt(e, t, i, r[i]);
    });
    const s = new G().retain(e).retain(t, On(r));
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
      u instanceof Oe ? r.push(u) : u instanceof Fe && s.push(u);
    }) : (r = this.scroll.lines(e, t), s = this.scroll.descendants(Fe, e, t));
    const [i, o] = [r, s].map((l) => {
      const u = l.shift();
      if (u == null) return {};
      let d = et(u);
      for (; Object.keys(d).length > 0; ) {
        const p = l.shift();
        if (p == null) return d;
        d = Mm(et(p), d);
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
      return r.length() >= s + t && !(s === 0 && t === i) ? mr(r, s, t, !0) : mr(this.scroll, e, t, !0);
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
    }), this.update(new G().retain(e).insert(t, On(r)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if (e?.statics.blotName !== Oe.blotName) return !1;
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
    t[0].target.data.match(Bm) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), o = et(i), l = i.offset(this.scroll), u = t[0].oldValue.replace(lt.CONTENTS, ""), d = new G().insert(u), p = new G().insert(i.value()), g = r && {
        oldRange: za(r.oldRange, -l),
        newRange: za(r.newRange, -l)
      };
      e = new G().retain(l).concat(d.diff(p, g)).reduce((A, E) => E.insert ? A.insert(E.insert, o) : A.push(E), new G()), this.delta = s.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !zi(s.compose(e), this.delta)) && (e = s.diff(this.delta, r));
    return e;
  }
}
function qn(n, e, t) {
  if (n.length === 0) {
    const [A] = oi(t.pop());
    return e <= 0 ? `</li></${A}>` : `</li></${A}>${qn([], e - 1, t)}`;
  }
  const [{
    child: r,
    offset: s,
    length: i,
    indent: o,
    type: l
  }, ...u] = n, [d, p] = oi(l);
  if (o > e)
    return t.push(l), o === e + 1 ? `<${d}><li${p}>${mr(r, s, i)}${qn(u, o, t)}` : `<${d}><li>${qn(n, e + 1, t)}`;
  const g = t[t.length - 1];
  if (o === e && l === g)
    return `</li><li${p}>${mr(r, s, i)}${qn(u, o, t)}`;
  const [h] = oi(t.pop());
  return `</li></${h}>${qn(n, e - 1, t)}`;
}
function mr(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in n && typeof n.html == "function")
    return n.html(e, t);
  if (n instanceof dt)
    return hs(n.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (n instanceof ct) {
    if (n.statics.blotName === "list-container") {
      const d = [];
      return n.children.forEachAt(e, t, (p, g, h) => {
        const A = "formats" in p && typeof p.formats == "function" ? p.formats() : {};
        d.push({
          child: p,
          offset: g,
          length: h,
          indent: A.indent || 0,
          type: A.list
        });
      }), qn(d, -1, []);
    }
    const s = [];
    if (n.children.forEachAt(e, t, (d, p, g) => {
      s.push(mr(d, p, g));
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
function Mm(n, e) {
  return Object.keys(e).reduce((t, r) => {
    if (n[r] == null) return t;
    const s = e[r];
    return s === n[r] ? t[r] = s : Array.isArray(s) ? s.indexOf(n[r]) < 0 ? t[r] = s.concat([n[r]]) : t[r] = s : t[r] = [s, n[r]], t;
  }, {});
}
function oi(n) {
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
  return new un(t + e, r);
}
function Pm(n) {
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
class Et {
  static DEFAULTS = {};
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = e, this.options = t;
  }
}
const Ur = "\uFEFF";
class Gi extends Xe {
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
class jm {
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
class jn {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: jn
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
const Um = (n) => n.parentElement || n.getRootNode().host || null, Vm = (n) => {
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
}, Ha = (n, e, t, r, s, i) => n < t && e > r ? 0 : n < t ? -(t - n + s) : e > r ? e - n > r - t ? n + s - t : e - r + i : 0, zm = (n, e) => {
  const t = n.ownerDocument;
  let r = e, s = n;
  for (; s; ) {
    const i = s === t.body, o = i ? {
      top: 0,
      right: window.visualViewport?.width ?? t.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? t.documentElement.clientHeight,
      left: 0
    } : Vm(s), l = getComputedStyle(s), u = Ha(r.left, r.right, o.left, o.right, Vr(l.scrollPaddingLeft), Vr(l.scrollPaddingRight)), d = Ha(r.top, r.bottom, o.top, o.bottom, Vr(l.scrollPaddingTop), Vr(l.scrollPaddingBottom));
    if (u || d)
      if (i)
        t.defaultView?.scrollBy(u, d);
      else {
        const {
          scrollLeft: p,
          scrollTop: g
        } = s;
        d && (s.scrollTop += d), u && (s.scrollLeft += u);
        const h = s.scrollLeft - p, A = s.scrollTop - g;
        r = {
          left: r.left - h,
          top: r.top - A,
          right: r.right - h,
          bottom: r.bottom - A
        };
      }
    s = i || l.position === "fixed" ? null : Um(s);
  }
}, Hm = 100, Km = ["block", "break", "cursor", "inline", "scroll", "text"], Gm = (n, e, t) => {
  const r = new Mn();
  return Km.forEach((s) => {
    const i = e.query(s);
    i && r.register(i);
  }), n.forEach((s) => {
    let i = e.query(s);
    i || t.error(`Cannot register "${s}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; i; )
      if (r.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, o += 1, o > Hm) {
        t.error(`Cycle detected in registering blot requiredContainer: "${s}"`);
        break;
      }
  }), r;
}, $n = $t("quill"), zr = new Mn();
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
    registry: zr,
    theme: "default"
  };
  static events = H.events;
  static sources = H.sources;
  static version = "2.0.3";
  static imports = {
    delta: G,
    parchment: Sm,
    "core/module": Et,
    "core/theme": jn
  };
  static debug(e) {
    e === !0 && (e = "log"), $t.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Ci.get(e) || zr.find(e, t);
  }
  static import(e) {
    return this.imports[e] == null && $n.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), r = "attrName" in e ? e.attrName : e.blotName;
      typeof r == "string" ? this.register(`formats/${r}`, e, t) : Object.keys(e).forEach((s) => {
        this.register(s, e[s], t);
      });
    } else {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], r = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[e] != null && !r && $n.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && zr.register(t), typeof t.register == "function" && t.register(zr);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = Wm(e, t), this.container = this.options.container, this.container == null) {
      $n.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && $.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Ci.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new H();
    const s = Ki.blotName, i = this.options.registry.query(s);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${s}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Fm(this.scroll), this.selection = new Dm(this.scroll, this.emitter), this.composition = new jm(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(H.events.EDITOR_CHANGE, (o) => {
      o === H.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(H.events.SCROLL_UPDATE, (o, l) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      at.call(this, () => this.editor.update(null, l, p), o);
    }), this.emitter.on(H.events.SCROLL_EMBED_UPDATE, (o, l) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      at.call(this, () => {
        const g = new G().retain(o.offset(this)).retain({
          [o.statics.blotName]: l
        });
        return this.editor.update(g, [], p);
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
    return [e, t, , r] = qt(e, t, r), at.call(this, () => this.editor.deleteText(e, t), r, e, -1 * t);
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
    return at.call(this, () => {
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
    return [e, t, o, i] = qt(
      e,
      t,
      // @ts-expect-error
      r,
      s,
      i
    ), at.call(this, () => this.editor.formatLine(e, t, o), i, e, 0);
  }
  formatText(e, t, r, s, i) {
    let o;
    return [e, t, o, i] = qt(
      // @ts-expect-error
      e,
      t,
      r,
      s,
      i
    ), at.call(this, () => this.editor.formatText(e, t, o), i, e, 0);
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
    return [e, t] = qt(e, t), this.editor.getContents(e, t);
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
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = qt(e, t), this.editor.getHTML(e, t);
  }
  getText() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = qt(e, t), this.editor.getText(e, t);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(e, t, r) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : $.sources.API;
    return at.call(this, () => this.editor.insertEmbed(e, t, r), s, e);
  }
  insertText(e, t, r, s, i) {
    let o;
    return [e, , o, i] = qt(e, 0, r, s, i), at.call(this, () => this.editor.insertText(e, t, o), i, e, t.length);
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
    return [e, t, , r] = qt(e, t, r), at.call(this, () => this.editor.removeFormat(e, t), r, e);
  }
  scrollRectIntoView(e) {
    zm(this.root, e);
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
    return at.call(this, () => {
      e = new G(e);
      const r = this.getLength(), s = this.editor.deleteText(0, r), i = this.editor.insertContents(0, e), o = this.editor.deleteText(this.getLength() - 1, 1);
      return s.compose(i).compose(o);
    }, t);
  }
  setSelection(e, t, r) {
    e == null ? this.selection.setRange(null, t || $.sources.API) : ([e, t, , r] = qt(e, t, r), this.selection.setRange(new un(Math.max(0, e), t), r), r !== H.sources.SILENT && this.scrollSelectionIntoView());
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
    return at.call(this, () => (e = new G(e), this.editor.applyDelta(e)), t, !0);
  }
}
function Ka(n) {
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
function Ga(n) {
  return Object.fromEntries(Object.entries(n).filter((e) => e[1] !== void 0));
}
function Wm(n, e) {
  const t = Ka(n);
  if (!t)
    throw new Error("Invalid Quill container");
  const s = !e.theme || e.theme === $.DEFAULTS.theme ? jn : $.import(`themes/${e.theme}`);
  if (!s)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: i,
    ...o
  } = $.DEFAULTS, {
    modules: l,
    ...u
  } = s.DEFAULTS;
  let d = li(e.modules);
  d != null && d.toolbar && d.toolbar.constructor !== Object && (d = {
    ...d,
    toolbar: {
      container: d.toolbar
    }
  });
  const p = Gt({}, li(i), li(l), d), g = {
    ...o,
    ...Ga(u),
    ...Ga(e)
  };
  let h = e.registry;
  return h ? e.formats && $n.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? Gm(e.formats, g.registry, $n) : g.registry, {
    ...g,
    registry: h,
    container: t,
    theme: s,
    modules: Object.entries(p).reduce((A, E) => {
      let [k, _] = E;
      if (!_) return A;
      const q = $.import(`modules/${k}`);
      return q == null ? ($n.error(`Cannot load ${k} module. Are you sure you registered it?`), A) : {
        ...A,
        // @ts-expect-error
        [k]: Gt({}, q.DEFAULTS || {}, _)
      };
    }, {}),
    bounds: Ka(g.bounds)
  };
}
function at(n, e, t, r) {
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
function qt(n, e, t, r, s) {
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
  )) : [i, o] = [n.index, n.index + n.length].map((l) => l < e || l === e && r === H.sources.USER ? l : s >= 0 ? l + s : Math.max(e, l + s)), new un(i, o - i);
}
class pn extends ds {
}
function Za(n) {
  return n instanceof Oe || n instanceof nt;
}
function Ya(n) {
  return typeof n.updateContent == "function";
}
class Zm extends Ki {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = Oe;
  static allowedChildren = [Oe, nt, pn];
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
      ui(this, e, d);
      const p = i.type === "block" ? 1 : 0, g = e + d.length() + p;
      u && this.insertAt(g - 1, `
`);
      const h = et(this.line(e)[0]), A = rt.AttributeMap.diff(h, i.attributes) || {};
      Object.keys(A).forEach((E) => {
        this.formatAt(g - 1, 1, E, A[E]);
      }), e = g;
    }
    let [o, l] = this.children.find(e);
    if (r.length && (o && (o = o.split(l), l = 0), r.forEach((u) => {
      if (u.type === "block") {
        const d = this.createBlock(u.attributes, o || void 0);
        ui(d, 0, u.delta);
      } else {
        const d = this.create(u.key, u.value);
        this.insertBefore(d, o || void 0), Object.keys(u.attributes).forEach((p) => {
          d.format(p, u.attributes[p]);
        });
      }
    })), s.type === "block" && s.delta.length()) {
      const u = o ? o.offset(o.scroll) + l : this.length();
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
    return r instanceof Fe ? [r, s] : [null, -1];
  }
  line(e) {
    return e === this.length() ? this.line(e - 1) : this.descendant(Za, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (s, i, o) => {
      let l = [], u = o;
      return s.children.forEachAt(i, o, (d, p, g) => {
        Za(d) ? l.push(d) : d instanceof ds && (l = l.concat(r(d, p, u))), u -= g;
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
function ui(n, e, t) {
  t.reduce((r, s) => {
    const i = rt.Op.length(s);
    let o = s.attributes || {};
    if (s.insert != null) {
      if (typeof s.insert == "string") {
        const l = s.insert;
        n.insertAt(r, l);
        const [u] = n.descendant(Fe, r), d = et(u);
        o = rt.AttributeMap.diff(d, o) || {};
      } else if (typeof s.insert == "object") {
        const l = Object.keys(s.insert)[0];
        if (l == null) return r;
        if (n.insertAt(r, l, s.insert[l]), n.scroll.query(l, W.INLINE) != null) {
          const [d] = n.descendant(Fe, r), p = et(d);
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
}, Ym = new wt("align", "align", Wi), yl = new ht("align", "ql-align", Wi), vl = new Jt("align", "text-align", Wi);
class xl extends Jt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((s) => `00${parseInt(s, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const Xm = new ht("color", "ql-color", {
  scope: W.INLINE
}), Zi = new xl("color", "color", {
  scope: W.INLINE
}), Qm = new ht("background", "ql-bg", {
  scope: W.INLINE
}), Yi = new xl("background", "background-color", {
  scope: W.INLINE
});
class mn extends pn {
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
    $.register(mn);
  }
}
class Xi extends Ve {
}
Xi.blotName = "code";
Xi.tagName = "CODE";
ze.blotName = "code-block";
ze.className = "ql-code-block";
ze.tagName = "DIV";
mn.blotName = "code-block-container";
mn.className = "ql-code-block-container";
mn.tagName = "DIV";
mn.allowedChildren = [ze];
ze.allowedChildren = [dt, ft, lt];
ze.requiredContainer = mn;
const Qi = {
  scope: W.BLOCK,
  whitelist: ["rtl"]
}, wl = new wt("direction", "dir", Qi), Al = new ht("direction", "ql-direction", Qi), El = new Jt("direction", "direction", Qi), Nl = {
  scope: W.INLINE,
  whitelist: ["serif", "monospace"]
}, Tl = new ht("font", "ql-font", Nl);
class Jm extends Jt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const Sl = new Jm("font", "font-family", Nl), Cl = new ht("size", "ql-size", {
  scope: W.INLINE,
  whitelist: ["small", "large", "huge"]
}), kl = new Jt("size", "font-size", {
  scope: W.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), eg = $t("quill:keyboard"), tg = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class fs extends Et {
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
    const s = rg(e);
    if (s == null) {
      eg.warn("Attempted to add invalid keyboard binding", s);
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
      const s = (this.bindings[e.key] || []).concat(this.bindings[e.which] || []).filter((q) => fs.match(e, q));
      if (s.length === 0) return;
      const i = $.find(e.target, !0);
      if (i && i.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [l, u] = this.quill.getLine(o.index), [d, p] = this.quill.getLeaf(o.index), [g, h] = o.length === 0 ? [d, p] : this.quill.getLeaf(o.index + o.length), A = d instanceof ts ? d.value().slice(0, p) : "", E = g instanceof ts ? g.value().slice(h) : "", k = {
        collapsed: o.length === 0,
        // @ts-expect-error Fix me later
        empty: o.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(o),
        line: l,
        offset: u,
        prefix: A,
        suffix: E,
        event: e
      };
      s.some((q) => {
        if (q.collapsed != null && q.collapsed !== k.collapsed || q.empty != null && q.empty !== k.empty || q.offset != null && q.offset !== k.offset)
          return !1;
        if (Array.isArray(q.format)) {
          if (q.format.every((U) => k.format[U] == null))
            return !1;
        } else if (typeof q.format == "object" && !Object.keys(q.format).every((U) => q.format[U] === !0 ? k.format[U] != null : q.format[U] === !1 ? k.format[U] == null : zi(q.format[U], k.format[U])))
          return !1;
        return q.prefix != null && !q.prefix.test(k.prefix) || q.suffix != null && !q.suffix.test(k.suffix) ? !1 : q.handler.call(this, o, k, q) !== !0;
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
          const g = new G().retain(e.index + i.length() - 2).retain(1, s);
          o = o.compose(g);
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
const ng = {
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
          const [t, r, s, i] = e.getTable(n), o = sg(t, r, s, i);
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
    "embed left": Hr("ArrowLeft", !1),
    "embed left shift": Hr("ArrowLeft", !0),
    "embed right": Hr("ArrowRight", !1),
    "embed right shift": Hr("ArrowRight", !0),
    "table down": Qa(!1),
    "table up": Qa(!0)
  }
};
fs.DEFAULTS = ng;
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
      return i instanceof Xe ? (n === "ArrowLeft" ? e ? this.quill.setSelection(r.index - 1, r.length + 1, $.sources.USER) : this.quill.setSelection(r.index - 1, $.sources.USER) : e ? this.quill.setSelection(r.index, r.length + 1, $.sources.USER) : this.quill.setSelection(r.index + r.length + 1, $.sources.USER), !1) : !0;
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
function rg(n) {
  if (typeof n == "string" || typeof n == "number")
    n = {
      key: n
    };
  else if (typeof n == "object")
    n = On(n);
  else
    return null;
  return n.shortKey && (n[tg] = n.shortKey, delete n.shortKey), n;
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
function sg(n, e, t, r) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? r === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const ig = /font-weight:\s*normal/, ag = ["P", "OL", "UL"], Ja = (n) => n && ag.includes(n.tagName), og = (n) => {
  Array.from(n.querySelectorAll("br")).filter((e) => Ja(e.previousElementSibling) && Ja(e.nextElementSibling)).forEach((e) => {
    e.parentNode?.removeChild(e);
  });
}, lg = (n) => {
  Array.from(n.querySelectorAll('b[style*="font-weight"]')).filter((e) => e.getAttribute("style")?.match(ig)).forEach((e) => {
    const t = n.createDocumentFragment();
    t.append(...e.childNodes), e.parentNode?.replaceChild(t, e);
  });
};
function ug(n) {
  n.querySelector('[id^="docs-internal-guid-"]') && (lg(n), og(n));
}
const cg = /\bmso-list:[^;]*ignore/i, dg = /\bmso-list:[^;]*\bl(\d+)/i, hg = /\bmso-list:[^;]*\blevel(\d+)/i, fg = (n, e) => {
  const t = n.getAttribute("style"), r = t?.match(dg);
  if (!r)
    return null;
  const s = Number(r[1]), i = t?.match(hg), o = i ? Number(i[1]) : 1, l = new RegExp(`@list l${s}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), u = e.match(l), d = u && u[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: s,
    indent: o,
    type: d,
    element: n
  };
}, pg = (n) => {
  const e = Array.from(n.querySelectorAll("[style*=mso-list]")), t = [], r = [];
  e.forEach((o) => {
    (o.getAttribute("style") || "").match(cg) ? t.push(o) : r.push(o);
  }), t.forEach((o) => o.parentNode?.removeChild(o));
  const s = n.documentElement.innerHTML, i = r.map((o) => fg(o, s)).filter((o) => o);
  for (; i.length; ) {
    const o = [];
    let l = i.shift();
    for (; l; )
      o.push(l), l = i.length && i[0]?.element === l.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      i[0].id === l.id ? i.shift() : null;
    const u = document.createElement("ul");
    o.forEach((g) => {
      const h = document.createElement("li");
      h.setAttribute("data-list", g.type), g.indent > 1 && h.setAttribute("class", `ql-indent-${g.indent - 1}`), h.innerHTML = g.element.innerHTML, u.appendChild(h);
    });
    const d = o[0]?.element, {
      parentNode: p
    } = d ?? {};
    d && p?.replaceChild(u, d), o.slice(1).forEach((g) => {
      let {
        element: h
      } = g;
      p?.removeChild(h);
    });
  }
};
function mg(n) {
  n.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && pg(n);
}
const gg = [mg, ug], bg = (n) => {
  n.documentElement && gg.forEach((e) => {
    e(n);
  });
}, yg = $t("quill:clipboard"), vg = [[Node.TEXT_NODE, Ig], [Node.TEXT_NODE, to], ["br", Tg], [Node.ELEMENT_NODE, to], [Node.ELEMENT_NODE, Ng], [Node.ELEMENT_NODE, Eg], [Node.ELEMENT_NODE, _g], ["li", kg], ["ol, ul", Lg], ["pre", Sg], ["tr", qg], ["b", di("bold")], ["i", di("italic")], ["strike", di("strike")], ["style", Cg]], xg = [Ym, wl].reduce((n, e) => (n[e.keyName] = e, n), {}), eo = [vl, Yi, Zi, El, Sl, kl].reduce((n, e) => (n[e.keyName] = e, n), {});
class wg extends Et {
  static DEFAULTS = {
    matchers: []
  };
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (r) => this.onCaptureCopy(r, !1)), this.quill.root.addEventListener("cut", (r) => this.onCaptureCopy(r, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], vg.concat(this.options.matchers ?? []).forEach((r) => {
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
      return new G().insert(r || "", {
        [ze.blotName]: s[ze.blotName]
      });
    if (!t)
      return new G().insert(r || "", s);
    const i = this.convertHTML(t);
    return xr(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || s.table) ? i.compose(new G().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(e) {
    bg(e);
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
    yg.log("onPaste", o, {
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
function gn(n, e, t, r) {
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
function xr(n, e) {
  let t = "";
  for (let r = n.ops.length - 1; r >= 0 && t.length < e.length; --r) {
    const s = n.ops[r];
    if (typeof s.insert != "string") break;
    t = s.insert + t;
  }
  return t.slice(-1 * e.length) === e;
}
function Kt(n, e) {
  if (!(n instanceof Element)) return !1;
  const t = e.query(n);
  return t && t.prototype instanceof Xe ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(n.tagName.toLowerCase());
}
function Ag(n, e) {
  return n.previousElementSibling && n.nextElementSibling && !Kt(n.previousElementSibling, e) && !Kt(n.nextElementSibling, e);
}
const Kr = /* @__PURE__ */ new WeakMap();
function Ll(n) {
  return n == null ? !1 : (Kr.has(n) || (n.tagName === "PRE" ? Kr.set(n, !0) : Kr.set(n, Ll(n.parentNode))), Kr.get(n));
}
function ea(n, e, t, r, s) {
  return e.nodeType === e.TEXT_NODE ? r.reduce((i, o) => o(e, i, n), new G()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, o) => {
    let l = ea(n, o, t, r, s);
    return o.nodeType === e.ELEMENT_NODE && (l = t.reduce((u, d) => d(o, u, n), l), l = (s.get(o) || []).reduce((u, d) => d(o, u, n), l)), i.concat(l);
  }, new G()) : new G();
}
function di(n) {
  return (e, t, r) => gn(t, n, !0, r);
}
function Eg(n, e, t) {
  const r = wt.keys(n), s = ht.keys(n), i = Jt.keys(n), o = {};
  return r.concat(s).concat(i).forEach((l) => {
    let u = t.query(l, W.ATTRIBUTE);
    u != null && (o[u.attrName] = u.value(n), o[u.attrName]) || (u = xg[l], u != null && (u.attrName === l || u.keyName === l) && (o[u.attrName] = u.value(n) || void 0), u = eo[l], u != null && (u.attrName === l || u.keyName === l) && (u = eo[l], o[u.attrName] = u.value(n) || void 0));
  }), Object.entries(o).reduce((l, u) => {
    let [d, p] = u;
    return gn(l, d, p, t);
  }, e);
}
function Ng(n, e, t) {
  const r = t.query(n);
  if (r == null) return e;
  if (r.prototype instanceof Xe) {
    const s = {}, i = r.value(n);
    if (i != null)
      return s[r.blotName] = i, new G().insert(s, r.formats(n, t));
  } else if (r.prototype instanceof pr && !xr(e, `
`) && e.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return gn(e, r.blotName, r.formats(n, t), t);
  return e;
}
function Tg(n, e) {
  return xr(e, `
`) || e.insert(`
`), e;
}
function Sg(n, e, t) {
  const r = t.query("code-block"), s = r && "formats" in r && typeof r.formats == "function" ? r.formats(n, t) : !0;
  return gn(e, "code-block", s, t);
}
function Cg() {
  return new G();
}
function kg(n, e, t) {
  const r = t.query(n);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !xr(e, `
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
  return i && (s = i === "true" ? "checked" : "unchecked"), gn(e, "list", s, t);
}
function to(n, e, t) {
  if (!xr(e, `
`)) {
    if (Kt(n, t) && (n.childNodes.length > 0 || n instanceof HTMLParagraphElement))
      return e.insert(`
`);
    if (e.length() > 0 && n.nextSibling) {
      let r = n.nextSibling;
      for (; r != null; ) {
        if (Kt(r, t))
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
function _g(n, e, t) {
  const r = {}, s = n.style || {};
  return s.fontStyle === "italic" && (r.italic = !0), s.textDecoration === "underline" && (r.underline = !0), s.textDecoration === "line-through" && (r.strike = !0), (s.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(s.fontWeight, 10) >= 700) && (r.bold = !0), e = Object.entries(r).reduce((i, o) => {
    let [l, u] = o;
    return gn(i, l, u, t);
  }, e), parseFloat(s.textIndent || 0) > 0 ? new G().insert("	").concat(e) : e;
}
function qg(n, e, t) {
  const r = n.parentElement?.tagName === "TABLE" ? n.parentElement : n.parentElement?.parentElement;
  if (r != null) {
    const i = Array.from(r.querySelectorAll("tr")).indexOf(n) + 1;
    return gn(e, "table", i, t);
  }
  return e;
}
function Ig(n, e, t) {
  let r = n.data;
  if (n.parentElement?.tagName === "O:P")
    return e.insert(r.trim());
  if (!Ll(n)) {
    if (r.trim().length === 0 && r.includes(`
`) && !Ag(n, t))
      return e;
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (n.previousSibling == null && n.parentElement != null && Kt(n.parentElement, t) || n.previousSibling instanceof Element && Kt(n.previousSibling, t)) && (r = r.replace(/^ /, "")), (n.nextSibling == null && n.parentElement != null && Kt(n.parentElement, t) || n.nextSibling instanceof Element && Kt(n.nextSibling, t)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return e.insert(r);
}
class Og extends Et {
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
      r === $.events.SELECTION_CHANGE ? s && o !== $.sources.SILENT && (this.currentRange = s) : r === $.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === $.sources.USER ? this.record(s, i) : this.transform(s)), this.currentRange = _i(this.currentRange, s));
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
      const t = $g(this.quill.scroll, e.delta);
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
      range: s.range && _i(s.range, t)
    }, t = s.delta.transform(t), n[r].delta.length() === 0 && n.splice(r, 1);
  }
}
function Rg(n, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((r) => n.query(r, W.BLOCK) != null) : !1;
}
function $g(n, e) {
  const t = e.reduce((s, i) => s + (i.delete || 0), 0);
  let r = e.length() - t;
  return Rg(n, e) && (r -= 1), r;
}
function _i(n, e) {
  if (!n) return n;
  const t = e.transformPosition(n.index), r = e.transformPosition(n.index + n.length);
  return {
    index: t,
    length: r - t
  };
}
class _l extends Et {
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
_l.DEFAULTS = {
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
const Dg = ["insertText", "insertReplacementText"];
class Bg extends Et {
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
    if (this.quill.composition.isComposing || e.defaultPrevented || !Dg.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const r = Fg(e);
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
function Fg(n) {
  return typeof n.data == "string" ? n.data : n.dataTransfer?.types.includes("text/plain") ? n.dataTransfer.getData("text/plain") : null;
}
const Mg = /Mac/i.test(navigator.platform), Pg = 100, jg = (n) => !!(n.key === "ArrowLeft" || n.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
n.key === "ArrowUp" || n.key === "ArrowDown" || n.key === "Home" || Mg && n.key === "a" && n.ctrlKey === !0);
class Ug extends Et {
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
      !e.defaultPrevented && jg(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + Pg, this.isListening) return;
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
  "blots/block": Oe,
  "blots/block/embed": nt,
  "blots/break": ft,
  "blots/container": pn,
  "blots/cursor": lt,
  "blots/embed": Gi,
  "blots/inline": Ve,
  "blots/scroll": Zm,
  "blots/text": dt,
  "modules/clipboard": wg,
  "modules/history": Og,
  "modules/keyboard": fs,
  "modules/uploader": _l,
  "modules/input": Bg,
  "modules/uiNode": Ug
});
class Vg extends ht {
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
const zg = new Vg("indent", "ql-indent", {
  scope: W.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Hg extends Oe {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class Kg extends Oe {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
class wr extends pn {
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
      const o = this.statics.formats(t, e);
      o === "checked" ? (this.format("list", "unchecked"), i.preventDefault()) : o === "unchecked" && (this.format("list", "checked"), i.preventDefault());
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
class Gg extends ta {
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
    return ql(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
  }
  format(e, t) {
    e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
  }
}
function ql(n, e) {
  const t = document.createElement("a");
  t.href = n;
  const r = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(r) > -1;
}
class Wg extends Ve {
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
class Zg extends ta {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class Yg extends Ve {
  static blotName = "underline";
  static tagName = "U";
}
class Xg extends Gi {
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
let Qg = class extends Xe {
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
    return ql(e, ["http", "https", "data"]) ? e : "//:0";
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    ro.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
};
const so = ["height", "width"];
class Jg extends nt {
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
    return ns.sanitize(e);
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
class Ot extends Ve {
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
    e !== Ot.blotName ? super.format(e, t) : t ? ir.add(this.domNode, t) : (ir.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), ir.value(this.domNode) || this.unwrap();
  }
}
Ot.blotName = "code-token";
Ot.className = "ql-token";
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
    return this.formatAt(0, this.length(), Ot.blotName, !1), super.replaceWith(e, t);
  }
}
class ur extends mn {
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
        const o = this.children.reduce((u, d) => u.concat(gl(d, !1)), new G()), l = e(s, i);
        o.diff(l).reduce((u, d) => {
          let {
            retain: p,
            attributes: g
          } = d;
          return p ? (g && Object.keys(g).forEach((h) => {
            [tt.blotName, Ot.blotName].includes(h) && this.formatAt(u, p, h, g[h]);
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
tt.allowedChildren = [Ot, lt, dt, ft];
const e0 = (n, e, t) => {
  if (typeof n.versionString == "string") {
    const r = n.versionString.split(".")[0];
    if (parseInt(r, 10) >= 11)
      return n.highlight(t, {
        language: e
      }).value;
  }
  return n.highlight(e, t).value;
};
class Il extends Et {
  static register() {
    $.register(Ot, !0), $.register(tt, !0), $.register(ur, !0);
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
    (e == null ? this.quill.scroll.descendants(ur) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update($.sources.SILENT), r != null && this.quill.setSelection(r, $.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return hs(e).split(`
`).reduce((s, i, o) => (o !== 0 && s.insert(`
`, {
        [ze.blotName]: t
      }), s.insert(i)), new G());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(ze.className), r.innerHTML = e0(this.options.hljs, t, e), ea(this.quill.scroll, r, [(s, i) => {
      const o = ir.value(s);
      return o ? i.compose(new G().retain(i.length(), {
        [Ot.blotName]: o
      })) : i;
    }], [(s, i) => s.data.split(`
`).reduce((o, l, u) => (u !== 0 && o.insert(`
`, {
      [ze.blotName]: t
    }), o.insert(l)), i)], /* @__PURE__ */ new WeakMap());
  }
}
Il.DEFAULTS = {
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
class ut extends Oe {
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
    e === ut.blotName && t ? this.domNode.setAttribute("data-row", t) : super.format(e, t);
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
class cn extends pn {
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
class Wt extends pn {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class rs extends pn {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const e = this.descendants(cn), t = e.reduce((r, s) => Math.max(s.children.length, r), 0);
    e.forEach((r) => {
      new Array(t - r.children.length).fill(0).forEach(() => {
        let s;
        r.children.head != null && (s = ut.formats(r.children.head.domNode));
        const i = this.scroll.create(ut.blotName, s);
        r.appendChild(i), i.optimize();
      });
    });
  }
  cells(e) {
    return this.rows().map((t) => t.children.at(e));
  }
  deleteColumn(e) {
    const [t] = this.descendant(Wt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e);
      s?.remove();
    });
  }
  insertColumn(e) {
    const [t] = this.descendant(Wt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e), i = ut.formats(r.children.head.domNode), o = this.scroll.create(ut.blotName, i);
      r.insertBefore(o, s);
    });
  }
  insertRow(e) {
    const [t] = this.descendant(Wt);
    if (t == null || t.children.head == null) return;
    const r = na(), s = this.scroll.create(cn.blotName);
    t.children.head.children.forEach(() => {
      const o = this.scroll.create(ut.blotName, r);
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
rs.allowedChildren = [Wt];
Wt.requiredContainer = rs;
Wt.allowedChildren = [cn];
cn.requiredContainer = Wt;
cn.allowedChildren = [ut];
ut.requiredContainer = cn;
function na() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class t0 extends Et {
  static register() {
    $.register(ut), $.register(cn), $.register(Wt), $.register(rs);
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
    if (t == null || t.statics.blotName !== ut.blotName)
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
const io = $t("quill:toolbar");
class ra extends Et {
  constructor(e, t) {
    if (super(e, t), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), n0(r, this.options.container), e.container?.parentNode?.insertBefore(r, e.container), this.container = r;
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
function n0(n, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const r = document.createElement("span");
    r.classList.add("ql-formats"), t.forEach((s) => {
      if (typeof s == "string")
        ao(r, s);
      else {
        const i = Object.keys(s)[0], o = s[i];
        Array.isArray(o) ? r0(r, i, o) : ao(r, i, o);
      }
    }), n.appendChild(r);
  });
}
function r0(n, e, t) {
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
const s0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', i0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', a0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', o0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', l0 = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', u0 = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', c0 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', d0 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', oo = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', h0 = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', f0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', p0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', m0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', g0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', b0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', y0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', v0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', x0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', w0 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', A0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', E0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', N0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', T0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', S0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', C0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', k0 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', L0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', _0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', q0 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', I0 = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', O0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', R0 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', $0 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', gr = {
  align: {
    "": s0,
    center: i0,
    right: a0,
    justify: o0
  },
  background: l0,
  blockquote: u0,
  bold: c0,
  clean: d0,
  code: oo,
  "code-block": oo,
  color: h0,
  direction: {
    "": f0,
    rtl: p0
  },
  formula: m0,
  header: {
    1: g0,
    2: b0,
    3: y0,
    4: v0,
    5: x0,
    6: w0
  },
  italic: A0,
  image: E0,
  indent: {
    "+1": N0,
    "-1": T0
  },
  link: S0,
  list: {
    bullet: C0,
    check: k0,
    ordered: L0
  },
  script: {
    sub: _0,
    super: q0
  },
  strike: I0,
  table: O0,
  underline: R0,
  video: $0
}, D0 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let lo = 0;
function uo(n, e) {
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
    return e.classList.add("ql-picker-label"), e.innerHTML = D0, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
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
class Ol extends ps {
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
class Rl extends ps {
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
const B0 = (n) => {
  const {
    overflowY: e
  } = getComputedStyle(n, null);
  return e !== "visible" && e !== "clip";
};
class $l {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, B0(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
const F0 = [!1, "center", "right", "justify"], M0 = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], P0 = [!1, "serif", "monospace"], j0 = ["1", "2", "3", !1], U0 = ["small", !1, "large", "huge"];
class Er extends jn {
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
      if (s.classList.contains("ql-align") && (s.querySelector("option") == null && nr(s, F0), typeof t.align == "object"))
        return new Rl(s, t.align);
      if (s.classList.contains("ql-background") || s.classList.contains("ql-color")) {
        const i = s.classList.contains("ql-background") ? "background" : "color";
        return s.querySelector("option") == null && nr(s, M0, i === "background" ? "#ffffff" : "#000000"), new Ol(s, t[i]);
      }
      return s.querySelector("option") == null && (s.classList.contains("ql-font") ? nr(s, P0) : s.classList.contains("ql-header") ? nr(s, j0) : s.classList.contains("ql-size") && nr(s, U0)), new ps(s);
    });
    const r = () => {
      this.pickers.forEach((s) => {
        s.update();
      });
    };
    this.quill.on(H.events.EDITOR_CHANGE, r);
  }
}
Er.DEFAULTS = Gt({}, jn.DEFAULTS, {
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
class Dl extends $l {
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
        e = V0(e);
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
function V0(n) {
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
const z0 = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class H0 extends Dl {
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
            const u = l[l.length - 1], d = this.quill.getIndex(u), p = Math.min(u.length() - 1, s.index + s.length - d), g = this.quill.getBounds(new un(d, p));
            g != null && this.position(g);
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
class Bl extends Er {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = z0), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new H0(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), gr), this.buildPickers(e.container.querySelectorAll("select"), gr));
  }
}
Bl.DEFAULTS = Gt({}, Er.DEFAULTS, {
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
const K0 = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class G0 extends Dl {
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
          const [s, i] = this.quill.scroll.descendant(ns, e.index);
          if (s != null) {
            this.linkRange = new un(e.index - i, s.length());
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
class Fl extends Er {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = K0), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), gr), this.buildPickers(e.container.querySelectorAll("select"), gr), this.tooltip = new G0(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, r) => {
      e.handlers.link.call(e, !r.format.link);
    }));
  }
}
Fl.DEFAULTS = Gt({}, Er.DEFAULTS, {
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
  "attributors/attribute/direction": wl,
  "attributors/class/align": yl,
  "attributors/class/background": Qm,
  "attributors/class/color": Xm,
  "attributors/class/direction": Al,
  "attributors/class/font": Tl,
  "attributors/class/size": Cl,
  "attributors/style/align": vl,
  "attributors/style/background": Yi,
  "attributors/style/color": Zi,
  "attributors/style/direction": El,
  "attributors/style/font": Sl,
  "attributors/style/size": kl
}, !0);
$.register({
  "formats/align": yl,
  "formats/direction": Al,
  "formats/indent": zg,
  "formats/background": Yi,
  "formats/color": Zi,
  "formats/font": Tl,
  "formats/size": Cl,
  "formats/blockquote": Hg,
  "formats/code-block": ze,
  "formats/header": Kg,
  "formats/list": Ar,
  "formats/bold": ta,
  "formats/code": Xi,
  "formats/italic": Gg,
  "formats/link": ns,
  "formats/script": Wg,
  "formats/strike": Zg,
  "formats/underline": Yg,
  "formats/formula": Xg,
  "formats/image": Qg,
  "formats/video": Jg,
  "modules/syntax": Il,
  "modules/table": t0,
  "modules/toolbar": ra,
  "themes/bubble": Bl,
  "themes/snow": Fl,
  "ui/icons": gr,
  "ui/picker": ps,
  "ui/icon-picker": Rl,
  "ui/color-picker": Ol,
  "ui/tooltip": $l
}, !0);
const W0 = { class: "rounded-lg border border-slate-300 bg-white" }, Z0 = /* @__PURE__ */ Te({
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
              image: o
            }
          }
        }
      }), i.root.innerHTML = t.modelValue || "", i.enable(!t.disabled), i.on("text-change", () => {
        i && r("update:modelValue", i.root.innerHTML);
      }));
    }), vo(() => {
      i = null;
    }), Zt(
      () => t.modelValue,
      (u) => {
        i && i.root.innerHTML !== u && (i.root.innerHTML = u || "");
      }
    ), Zt(
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
            let g = "";
            t.subirImagen ? g = await t.subirImagen(d) : g = await l(d), i?.insertEmbed(p.index, "image", g, "user");
          } catch (g) {
            console.error("No se pudo subir la imagen al editor:", g);
          }
      };
    }
    function l(u) {
      return new Promise((d, p) => {
        const g = new FileReader();
        g.onload = () => d(String(g.result)), g.onerror = () => p(new Error("No fue posible leer la imagen.")), g.readAsDataURL(u);
      });
    }
    return (u, d) => (O(), M("div", W0, [
      x("div", {
        ref_key: "root",
        ref: s,
        class: "min-h-[260px]"
      }, null, 512)
    ]));
  }
}), Y0 = /* @__PURE__ */ Te({
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
    return (r, s) => (O(), Le(Z0, {
      "model-value": n.modelValue,
      "subir-imagen": n.uploadImage,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["model-value", "subir-imagen", "disabled"]));
  }
}), X0 = ["value", "disabled"], Q0 = ["value"], J0 = /* @__PURE__ */ Te({
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
    return (r, s) => (O(), M("select", {
      value: n.modelValue,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, [
      s[1] || (s[1] = x("option", { value: "" }, "Selecciona una opción", -1)),
      (O(!0), M(Me, null, Pe(n.options, (i) => (O(), M("option", {
        key: i,
        value: i
      }, Q(i), 9, Q0))), 128))
    ], 40, X0));
  }
}), eb = ["value", "rows", "placeholder", "disabled"], tb = /* @__PURE__ */ Te({
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
    return (r, s) => (O(), M("textarea", {
      value: n.modelValue,
      rows: n.rows,
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, eb));
  }
}), nb = ["value", "placeholder", "disabled"], co = /* @__PURE__ */ Te({
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
    return (r, s) => (O(), M("input", {
      value: n.modelValue,
      type: "text",
      placeholder: n.placeholder,
      disabled: n.disabled,
      class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, nb));
  }
}), rb = {
  key: 2,
  class: "space-y-1"
}, sb = {
  key: 0,
  class: "text-xs text-slate-500"
}, ib = /* @__PURE__ */ Te({
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
    return (u, d) => (O(), M("div", null, [
      n.field.type === "text" ? (O(), Le(co, {
        key: 0,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[0] || (d[0] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "date" ? (O(), Le(qc, {
        key: 1,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[1] || (d[1] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "numeric" || n.field.type === "id" ? (O(), M("div", rb, [
        vt(zc, {
          "model-value": o(),
          placeholder: n.field.placeholder || "",
          disabled: n.disabled || n.isAutoId,
          step: n.field.type === "id" ? "1" : "any",
          min: n.field.type === "id" ? 1 : null,
          "onUpdate:modelValue": d[2] || (d[2] = (p) => r("update:modelValue", p))
        }, null, 8, ["model-value", "placeholder", "disabled", "step", "min"]),
        n.isAutoId ? (O(), M("p", sb, " Se genera automáticamente al crear el documento. ")) : se("", !0)
      ])) : n.field.type === "textarea" ? (O(), Le(tb, {
        key: 3,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[3] || (d[3] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "select" ? (O(), Le(J0, {
        key: 4,
        "model-value": s(),
        options: n.field.options || [],
        disabled: n.disabled,
        "onUpdate:modelValue": d[4] || (d[4] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "disabled"])) : n.field.type === "document" ? (O(), Le(Dc, {
        key: 5,
        "model-value": s(),
        options: n.documentOptions,
        hint: n.documentHint,
        disabled: n.disabled,
        "onUpdate:modelValue": d[5] || (d[5] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "hint", "disabled"])) : n.field.type === "boolean" ? (O(), Le(ic, {
        key: 6,
        "model-value": i(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[6] || (d[6] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "image" ? (O(), Le(Uc, {
        key: 7,
        "model-value": s(),
        disabled: n.disabled,
        "onUpdate:file": d[7] || (d[7] = (p) => r("update:file", p)),
        onRemove: d[8] || (d[8] = (p) => r("remove-image"))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "array" || n.field.type === "map" ? (O(), Le(Lc, {
        key: 8,
        field: n.field,
        "model-value": l(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[9] || (d[9] = (p) => r("update:modelValue", p))
      }, null, 8, ["field", "model-value", "disabled"])) : n.field.type === "richtext" ? (O(), Le(Y0, {
        key: 9,
        "model-value": s(),
        "upload-image": n.uploadImage,
        disabled: n.disabled,
        "onUpdate:modelValue": d[10] || (d[10] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "upload-image", "disabled"])) : (O(), Le(co, {
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
  let u = t.quality, d = await ho(o, n.type || "image/jpeg", u);
  const p = t.targetSizeKb * 1024;
  for (; d.size > p && u > 0.45; )
    u -= 0.08, d = await ho(o, n.type || "image/jpeg", u);
  return d;
}
function lb(n, e, t, r) {
  let s = n, i = e;
  return s > t && (i = Math.round(i * t / s), s = t), i > r && (s = Math.round(s * r / i), i = r), { width: s, height: i };
}
function ho(n, e, t) {
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
  const { storage: r } = Ce(), s = Zl(r, n);
  return await Yl(s, e, t), Xl(s);
}
async function fo(n, e, t = {}) {
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
  return (await Kl(an(t, n.collectionName), {
    ...r,
    createdAt: Ze(),
    updatedAt: Ze()
  })).id;
}
async function po(n, e = 100) {
  const { firestore: t } = Ce();
  try {
    const r = Ii(
      an(t, n.collectionName),
      Oi("createdAt", "desc"),
      Ao(e)
    );
    return (await Bn(r)).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  } catch {
    return (await Bn(an(t, n.collectionName))).docs.map((s) => ({
      id: s.id,
      data: s.data()
    }));
  }
}
async function hb(n, e) {
  const { firestore: t } = Ce();
  await Gl(Xt(t, n.collectionName, e));
}
async function fb(n, e, t) {
  const { firestore: r } = Ce(), s = yb(n, t);
  await wo(Xt(r, n.collectionName, e), {
    ...s,
    updatedAt: Ze()
  });
}
const Ml = "main", pb = "schema";
async function mb(n, e, t = Ml) {
  const { firestore: r } = Ce(), s = n.dictionaryDocumentId || t, i = Pl(n), o = Xt(r, n.collectionName, s), l = await ss(o), u = {
    updatedAt: Ze(),
    createdAt: l.exists() ? l.data().createdAt : Ze()
  };
  if (i)
    u[i] = e;
  else
    for (const [d, p] of Object.entries(e))
      u[d] = p;
  return await Yr(
    o,
    u,
    { merge: !0 }
  ), s;
}
async function gb(n, e = Ml) {
  const { firestore: t } = Ce(), r = n.dictionaryDocumentId || e, s = await ss(Xt(t, n.collectionName, r));
  if (!s.exists())
    return null;
  const i = s.data(), o = Pl(n), l = o ? i[o] : null;
  return l && typeof l == "object" && !Array.isArray(l) ? {
    id: s.id,
    data: l
  } : {
    id: s.id,
    data: i
  };
}
function Pl(n) {
  return n.storageType !== "dictionary" ? "" : typeof n.dictionaryRootKey == "string" && n.dictionaryRootKey.trim() ? n.dictionaryRootKey.trim() : pb;
}
async function bb(n, e) {
  const t = jl(n);
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
  const t = jl(n);
  if (!t.length)
    return { ...e };
  const r = { ...e };
  for (const s of t)
    delete r[s.key];
  return r;
}
function jl(n) {
  return n.storageType !== "document" ? [] : n.fields.filter((e) => vb(e));
}
function vb(n) {
  return n.type === "id" ? !0 : typeof n.autogenerated == "boolean" ? n.autogenerated : !1;
}
async function xb(n, e, t) {
  let r = 0;
  try {
    const o = (await Bn(
      Ii(
        an(n, e),
        Oi(t, "desc"),
        Ao(1)
      )
    )).docs[0]?.data()?.[t], l = mo(o);
    l !== null && (r = l);
  } catch {
    r = 0;
  }
  if (r > 0)
    return r + 1;
  const s = await Bn(an(n, e));
  for (const i of s.docs) {
    const o = mo(i.data()?.[t]);
    o !== null && o > r && (r = o);
  }
  return r + 1;
}
function mo(n) {
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
}, Lb = { class: "block text-sm font-semibold text-slate-700" }, _b = {
  key: 0,
  class: "text-xs text-slate-500"
}, qb = {
  key: 0,
  class: "rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700"
}, Ib = {
  key: 1,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Ob = {
  key: 2,
  class: "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, Rb = { class: "flex flex-wrap items-center gap-2" }, $b = ["disabled"], Db = ["disabled"], Bb = { class: "mt-6 border-t border-slate-200 pt-5" }, Fb = {
  key: 0,
  class: "mt-3 text-sm text-slate-500"
}, Mb = {
  key: 1,
  class: "mt-3 text-sm text-slate-500"
}, Pb = {
  key: 2,
  class: "mt-3 space-y-2"
}, jb = { class: "text-sm font-semibold text-slate-900" }, Ub = { class: "text-xs text-slate-500" }, Vb = {
  key: 0,
  class: "flex items-center gap-2"
}, zb = ["disabled", "onClick"], Hb = ["disabled", "onClick"], Kb = /* @__PURE__ */ Te({
  __name: "AdminBlogPage",
  setup(n) {
    const e = is(), t = yr(), r = te([]), s = te(""), i = te(!1), o = te(""), l = te({}), u = te({}), d = te([]), p = te(!1), g = te(!1), h = te(""), A = te(""), E = te({}), k = te(""), _ = Ie(() => In.value === "admin" || In.value === "writer" || In.value === "manager"), q = Ie(() => r.value.find((m) => m.id === s.value) ?? null), U = Ie(() => !!k.value);
    br(async () => {
      await z();
    }), Zt(
      q,
      async (m) => {
        if (!m) {
          l.value = {}, u.value = {}, d.value = [], E.value = {}, k.value = "";
          return;
        }
        ye(m), await b(m), await F(m);
      },
      { immediate: !0 }
    ), Zt(
      () => e.query.schema,
      (m) => {
        typeof m == "string" && r.value.some((y) => y.id === m) && s.value !== m && (s.value = m);
      }
    );
    async function z() {
      i.value = !0, o.value = "";
      try {
        await X();
      } catch {
        o.value = "No se pudieron cargar los tipos de contenido.";
      } finally {
        i.value = !1;
      }
    }
    async function X() {
      const m = await Di();
      if (r.value = m, !m.length) {
        s.value = "";
        return;
      }
      const y = typeof e.query.schema == "string" ? e.query.schema : "";
      if (y && m.some((B) => B.id === y)) {
        s.value = y;
        return;
      }
      m.some((B) => B.id === s.value) || (s.value = m[0].id, await K(s.value));
    }
    async function K(m) {
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
    function ae(m) {
      return m.type === "id" ? !0 : typeof m.autogenerated == "boolean" ? m.autogenerated : !1;
    }
    function be(m, y) {
      return ae(y) ? y.type === "id" ? m.storageType === "document" : !0 : !1;
    }
    function Ee(m) {
      return m.fields.filter((y) => !be(m, y));
    }
    function ye(m) {
      const y = {}, R = {};
      for (const B of m.fields)
        B.type === "boolean" ? y[B.key] = !1 : B.type === "array" ? y[B.key] = [] : B.type === "map" ? y[B.key] = {} : B.type === "date" ? y[B.key] = "" : B.type === "numeric" || B.type === "id" ? y[B.key] = null : (B.type, y[B.key] = ""), B.type === "image" && (R[B.key] = null);
      l.value = y, u.value = R, k.value = "", h.value = "", A.value = "";
    }
    async function b(m) {
      p.value = !0;
      try {
        if (m.storageType === "dictionary") {
          const R = await gb(m);
          d.value = R ? [R] : [], k.value = "", R && f(m, R);
          return;
        }
        const y = await po(m, 100);
        d.value = y, k.value && !y.some((R) => R.id === k.value) && (k.value = "");
      } finally {
        p.value = !1;
      }
    }
    async function F(m) {
      const y = m.fields.filter((B) => B.type === "document");
      if (!y.length) {
        E.value = {};
        return;
      }
      const R = {};
      await Promise.all(
        y.map(async (B) => {
          const ee = typeof B.documentSchemaId == "string" ? B.documentSchemaId.trim() : "";
          if (!ee) {
            R[B.key] = { options: [], byId: {} };
            return;
          }
          const de = r.value.find((We) => We.id === ee);
          if (!de || de.storageType !== "document") {
            R[B.key] = { options: [], byId: {} };
            return;
          }
          const je = typeof B.documentLabelField == "string" && B.documentLabelField.trim() || de.previewField || de.slugFromField || de.fields[0]?.key || "", Tt = await po(de, 200), Mt = {}, St = Tt.map((We) => (Mt[We.id] = We, {
            id: We.id,
            label: S(We, je),
            hint: L(We)
          }));
          R[B.key] = { options: St, byId: Mt };
        })
      ), E.value = R;
    }
    function S(m, y) {
      const R = y ? m.data[y] : null;
      return typeof R == "string" && R.trim() ? R.trim() : m.id;
    }
    function L(m) {
      const y = m.data.telefono;
      return typeof y == "string" && y.trim() ? `Tel: ${y.trim()}` : "";
    }
    function f(m, y) {
      const R = { ...l.value };
      for (const B of m.fields) {
        const ee = y.data[B.key];
        B.type === "boolean" ? R[B.key] = !!ee : B.type === "array" || B.type === "map" ? R[B.key] = N(B, ee) : B.type === "date" ? R[B.key] = st(ee) : B.type === "numeric" ? R[B.key] = Ft(ee) : B.type === "id" ? R[B.key] = pt(ee) : B.type === "document" ? R[B.key] = typeof ee == "string" ? ee : "" : typeof ee == "string" ? R[B.key] = ee : R[B.key] = "";
      }
      l.value = R;
    }
    function w(m) {
      const y = q.value;
      !y || y.storageType !== "document" || (ye(y), f(y, m), k.value = m.id);
    }
    function C() {
      const m = q.value;
      !m || m.storageType !== "document" || ye(m);
    }
    async function P() {
      const m = q.value;
      if (m) {
        if (h.value = "", A.value = "", !_.value) {
          A.value = "Tu rol no tiene permisos para crear o editar contenido.";
          return;
        }
        g.value = !0;
        try {
          const y = {};
          for (const B of m.fields)
            be(m, B) || (y[B.key] = await D(m, B), T(m, B, y[B.key]));
          const R = m.storageType === "document" && !k.value;
          if ((m.storageType === "dictionary" || R) && tn(m, y), m.slugFromField) {
            const B = y[m.slugFromField];
            typeof B == "string" && B.trim() && (y.slug = wb(B));
          }
          m.storageType === "dictionary" ? (await mb(m, y), h.value = "Registro de diccionario actualizado.") : (k.value ? (await fb(m, k.value, y), h.value = "Registro actualizado correctamente.") : (await db(m, y), h.value = "Registro creado correctamente."), ye(m)), await b(m);
        } catch (y) {
          A.value = y instanceof Error ? y.message : "No se pudo guardar el registro.";
        } finally {
          g.value = !1;
        }
      }
    }
    async function D(m, y) {
      if (y.type === "boolean")
        return !!l.value[y.key];
      if (y.type === "image") {
        const R = u.value[y.key];
        if (!R)
          return fe(y.key);
        const B = Nt(R.name), ee = await fo(
          `${m.collectionName}/${y.key}/${Date.now()}-${B}`,
          R,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return l.value[y.key] = ee, u.value[y.key] = null, ee;
      }
      return y.type === "array" || y.type === "map" ? N(y, l.value[y.key], !0) : y.type === "date" ? re(y.key) : y.type === "numeric" ? oe(y.key) : y.type === "id" ? m.storageType === "document" && !k.value ? null : pt(l.value[y.key]) : (y.type === "document", fe(y.key));
    }
    function T(m, y, R) {
      if (y.required && y.type !== "boolean") {
        if (y.type === "array") {
          if (!Array.isArray(R) || !R.length)
            throw new Error(`El campo "${y.label}" es obligatorio y debe tener al menos 1 elemento.`);
          return;
        }
        if (y.type === "map") {
          if (!ie(R) || Object.keys(R).length === 0)
            throw new Error(`El campo "${y.label}" es obligatorio y debe tener al menos 1 propiedad.`);
          return;
        }
        if (!(y.type === "id" && m.storageType === "document" && !k.value)) {
          if (y.type === "numeric") {
            if (typeof R != "number" || !Number.isFinite(R))
              throw new Error(`El campo "${y.label}" es obligatorio y debe ser numérico.`);
            return;
          }
          if (y.type === "id") {
            if (typeof R != "number" || !Number.isInteger(R) || R < 1)
              throw new Error(`El campo "${y.label}" es obligatorio y debe ser un entero mayor o igual a 1.`);
            return;
          }
          if (y.type === "date") {
            if (!(R instanceof Date) || Number.isNaN(R.getTime()))
              throw new Error(`El campo "${y.label}" es obligatorio y debe ser una fecha válida.`);
            return;
          }
          if (typeof R != "string" || !R.trim())
            throw new Error(`El campo "${y.label}" es obligatorio.`);
        }
      }
    }
    function N(m, y, R = !1) {
      if (typeof y == "string") {
        const ee = y.trim();
        if (!(ee.startsWith("{") || ee.startsWith("[")))
          y = m.type === "array" ? [] : {};
        else
          try {
            y = JSON.parse(ee);
          } catch {
            y = m.type === "array" ? [] : {};
          }
      }
      if (m.type === "array") {
        const ee = Array.isArray(y) ? y : [];
        return m.itemSchema ? ee.map(
          (de, je) => V(
            m.itemSchema,
            de,
            `${m.label}[${je}]`,
            R
          )
        ) : ee;
      }
      const B = ie(y) ? y : {};
      return Array.isArray(m.mapFields) && m.mapFields.length > 0 ? j(m.mapFields, B, m.label, R) : B;
    }
    function j(m, y, R, B = !1) {
      const ee = {};
      for (const de of m) {
        const je = de.key;
        if (!(je in y)) {
          if (de.required)
            throw new Error(`Falta la propiedad requerida "${R}.${je}".`);
          continue;
        }
        ee[je] = V(de, y[je], `${R}.${je}`, B);
      }
      return ee;
    }
    function V(m, y, R, B = !1) {
      if (m.type === "array") {
        if (!Array.isArray(y))
          throw new Error(`"${R}" debe ser un arreglo.`);
        return m.itemSchema ? y.map(
          (ee, de) => V(m.itemSchema, ee, `${R}[${de}]`, B)
        ) : y;
      }
      if (m.type === "map") {
        if (!ie(y))
          throw new Error(`"${R}" debe ser un objeto.`);
        return !Array.isArray(m.mapFields) || m.mapFields.length === 0 ? y : j(m.mapFields, y, R, B);
      }
      if (m.type === "boolean") {
        if (typeof y != "boolean")
          throw new Error(`"${R}" debe ser boolean.`);
        return y;
      }
      if (m.type === "document") {
        if (typeof y != "string")
          throw new Error(`"${R}" debe ser string (id de documento).`);
        return y;
      }
      if (m.type === "numeric") {
        if (typeof y != "number" || !Number.isFinite(y))
          throw new Error(`"${R}" debe ser numérico.`);
        return y;
      }
      if (m.type === "id") {
        if (typeof y != "number" || !Number.isInteger(y) || y < 1)
          throw new Error(`"${R}" debe ser un número entero mayor o igual a 1.`);
        return y;
      }
      if (m.type === "date") {
        const ee = mt(y);
        if (!ee)
          throw new Error(`"${R}" debe ser una fecha válida.`);
        return B ? ee : st(ee);
      }
      if (typeof y != "string")
        throw new Error(`"${R}" debe ser string.`);
      if (m.type === "select" && Array.isArray(m.options) && m.options.length > 0 && y && !m.options.includes(y))
        throw new Error(`"${R}" no coincide con las opciones del select.`);
      return y;
    }
    async function J(m) {
      const y = q.value;
      if (!(!y || y.storageType !== "document")) {
        if (!_.value) {
          A.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await hb(y, m), k.value === m && ye(y), await b(y));
      }
    }
    async function Z(m) {
      const y = q.value;
      if (!y)
        throw new Error("No hay schema seleccionado.");
      const R = Nt(m.name);
      return fo(
        `${y.collectionName}/editor/${Date.now()}-${R}`,
        m,
        { maxWidth: 1600, maxHeight: 1600, targetSizeKb: 700, quality: 0.8 }
      );
    }
    function fe(m) {
      const y = l.value[m];
      return typeof y == "string" ? y : "";
    }
    function ve(m) {
      return st(l.value[m]);
    }
    function re(m) {
      return mt(l.value[m]);
    }
    function oe(m) {
      return Ft(l.value[m]);
    }
    function le(m) {
      const y = oe(m);
      return typeof y == "number" ? String(y) : "";
    }
    function ce(m, y) {
      l.value[m] = y;
    }
    function pe(m, y) {
      l.value[m] = st(y);
    }
    function me(m, y) {
      l.value[m] = Ft(y);
    }
    function Ae(m) {
      return m.type === "boolean" ? Bt(m.key) : m.type === "array" || m.type === "map" ? Un(m.key) : m.type === "numeric" || m.type === "id" ? le(m.key) : m.type === "date" ? ve(m.key) : fe(m.key);
    }
    function ke(m, y) {
      if (m.type === "boolean") {
        en(m.key, !!y);
        return;
      }
      if (m.type === "array" || m.type === "map") {
        Vn(m.key, y);
        return;
      }
      if (m.type === "numeric" || m.type === "id") {
        me(m.key, typeof y == "string" ? y : "");
        return;
      }
      if (m.type === "date") {
        pe(m.key, typeof y == "string" ? y : "");
        return;
      }
      ce(m.key, typeof y == "string" ? y : "");
    }
    function Dt(m) {
      return E.value[m.key]?.options ?? [];
    }
    function bn(m) {
      const y = fe(m.key);
      return y ? Dt(m).find((B) => B.id === y)?.hint ?? "" : "";
    }
    function Un(m) {
      return l.value[m];
    }
    function Vn(m, y) {
      l.value[m] = y;
    }
    function Bt(m) {
      return !!l.value[m];
    }
    function en(m, y) {
      l.value[m] = y;
    }
    function yn(m, y) {
      u.value[m] = y;
    }
    function vn(m) {
      l.value[m] = "", u.value[m] = null;
    }
    function Qe(m, y) {
      const R = y.previewField || y.slugFromField || y.fields[0]?.key;
      if (!R)
        return m.id;
      const B = m.data[R];
      if (y.fields.find((de) => de.key === R)?.type === "date") {
        const de = wn(B);
        if (de)
          return de;
      }
      return typeof B == "string" && B.trim() ? B : typeof B == "boolean" ? B ? "true" : "false" : typeof B == "number" && Number.isFinite(B) ? String(B) : Array.isArray(B) ? `[array:${B.length}]` : ie(B) ? "[map]" : m.id;
    }
    function Nt(m) {
      return m.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
    }
    function Ft(m) {
      if (typeof m == "number")
        return Number.isFinite(m) ? m : null;
      if (typeof m == "string") {
        const y = m.trim();
        if (!y)
          return null;
        const R = Number(y);
        return Number.isFinite(R) ? R : null;
      }
      return null;
    }
    function pt(m) {
      const y = Ft(m);
      return y === null || !Number.isInteger(y) || y < 1 ? null : y;
    }
    function st(m) {
      const y = mt(m);
      return y ? xn(y) : "";
    }
    function mt(m) {
      if (m instanceof Date && !Number.isNaN(m.getTime()))
        return m;
      if (m && typeof m == "object" && "toDate" in m && typeof m.toDate == "function") {
        const y = m.toDate();
        if (y instanceof Date && !Number.isNaN(y.getTime()))
          return y;
      }
      if (typeof m == "string") {
        const y = m.trim();
        if (!y)
          return null;
        const R = He(y);
        if (R)
          return R;
        const B = new Date(y);
        return Number.isNaN(B.getTime()) ? null : B;
      }
      if (typeof m == "number" && Number.isFinite(m)) {
        const y = new Date(m);
        if (!Number.isNaN(y.getTime()))
          return y;
      }
      return null;
    }
    function He(m) {
      const y = /^(\d{4})-(\d{2})-(\d{2})$/.exec(m);
      if (!y)
        return null;
      const R = Number(y[1]), B = Number(y[2]), ee = Number(y[3]), de = new Date(Date.UTC(R, B - 1, ee));
      return de.getUTCFullYear() !== R || de.getUTCMonth() + 1 !== B || de.getUTCDate() !== ee ? null : de;
    }
    function xn(m) {
      const y = String(m.getUTCFullYear()).padStart(4, "0"), R = String(m.getUTCMonth() + 1).padStart(2, "0"), B = String(m.getUTCDate()).padStart(2, "0");
      return `${y}-${R}-${B}`;
    }
    function wn(m) {
      const y = mt(m);
      if (!y)
        return "";
      const R = String(y.getUTCDate()).padStart(2, "0"), B = String(y.getUTCMonth() + 1).padStart(2, "0"), ee = String(y.getUTCFullYear()).padStart(4, "0");
      return `${R}/${B}/${ee}`;
    }
    function zn(m) {
      return m.type === "id" && q.value?.storageType === "document";
    }
    function tn(m, y) {
      for (const R of m.fields)
        be(m, R) && R.type === "date" && (y[R.key] = /* @__PURE__ */ new Date());
    }
    return (m, y) => (O(), M("section", Ab, [
      x("article", Eb, [
        y[0] || (y[0] = Ye(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        y[1] || (y[1] = x("strong", null, "Esquemas", -1)),
        y[2] || (y[2] = Ye(". ", -1)),
        i.value ? (O(), M("p", Nb, "Cargando formularios...")) : o.value ? (O(), M("p", Tb, Q(o.value), 1)) : se("", !0)
      ]),
      x("article", Sb, [
        x("h3", Cb, Q(q.value ? `Formulario y registros: ${q.value.title}` : "Formulario y registros"), 1),
        y[4] || (y[4] = x("p", { class: "mt-1 text-sm text-slate-600" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        _.value ? se("", !0) : (O(), M("p", kb, " No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        q.value ? (O(), M("form", {
          key: 1,
          class: "mt-5 space-y-4",
          onSubmit: qi(P, ["prevent"])
        }, [
          (O(!0), M(Me, null, Pe(Ee(q.value), (R) => (O(), M("div", {
            key: R.key,
            class: "space-y-1"
          }, [
            x("label", Lb, Q(R.label), 1),
            R.helpText ? (O(), M("p", _b, Q(R.helpText), 1)) : se("", !0),
            vt(ib, {
              field: R,
              "model-value": Ae(R),
              disabled: !_.value,
              "is-auto-id": zn(R),
              "document-options": Dt(R),
              "document-hint": bn(R),
              "upload-image": Z,
              "onUpdate:modelValue": (B) => ke(R, B),
              "onUpdate:file": (B) => yn(R.key, B),
              onRemoveImage: (B) => vn(R.key)
            }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
          ]))), 128)),
          q.value.storageType === "document" && U.value ? (O(), M("p", qb, " Editando registro: " + Q(k.value), 1)) : se("", !0),
          A.value ? (O(), M("p", Ib, Q(A.value), 1)) : se("", !0),
          h.value ? (O(), M("p", Ob, Q(h.value), 1)) : se("", !0),
          x("div", Rb, [
            x("button", {
              type: "submit",
              disabled: g.value || !_.value,
              class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            }, Q(g.value ? "Guardando..." : q.value.storageType === "dictionary" ? "Guardar diccionario" : U.value ? "Guardar cambios" : "Crear documento"), 9, $b),
            q.value.storageType === "document" && U.value ? (O(), M("button", {
              key: 0,
              type: "button",
              disabled: g.value || !_.value,
              class: "rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
              onClick: C
            }, " Cancelar edición ", 8, Db)) : se("", !0)
          ])
        ], 32)) : se("", !0),
        x("div", Bb, [
          y[3] || (y[3] = x("h4", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Registros guardados", -1)),
          p.value ? (O(), M("p", Fb, "Cargando registros...")) : d.value.length ? (O(), M("ul", Pb, [
            (O(!0), M(Me, null, Pe(d.value, (R) => (O(), M("li", {
              key: R.id,
              class: Je([
                "flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2",
                q.value?.storageType === "document" && k.value === R.id ? "border-sky-300 bg-sky-50" : ""
              ])
            }, [
              x("div", null, [
                x("p", jb, Q(q.value ? Qe(R, q.value) : R.id), 1),
                x("p", Ub, "ID: " + Q(R.id), 1)
              ]),
              q.value?.storageType === "document" ? (O(), M("div", Vb, [
                x("button", {
                  type: "button",
                  disabled: !_.value || g.value,
                  class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => w(R)
                }, Q(k.value === R.id ? "Editando" : "Editar"), 9, zb),
                x("button", {
                  type: "button",
                  disabled: !_.value,
                  class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => J(R.id)
                }, " Eliminar ", 8, Hb)
              ])) : se("", !0)
            ], 2))), 128))
          ])) : (O(), M("p", Mb, "No hay registros todavía."))
        ])
      ])
    ]));
  }
}), Gb = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3" }, Wb = { class: "mb-3 flex items-start justify-between gap-2" }, Zb = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide text-slate-600"
}, Yb = ["disabled"], Xb = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, Qb = { class: "space-y-1" }, Jb = ["value", "disabled"], e1 = { class: "space-y-1" }, t1 = ["value", "disabled"], n1 = { class: "mt-2 grid gap-2 md:grid-cols-4" }, r1 = { class: "space-y-1" }, s1 = ["value", "disabled"], i1 = ["value"], a1 = { class: "space-y-1" }, o1 = ["value", "disabled"], l1 = { class: "space-y-1" }, u1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, c1 = ["checked", "disabled"], d1 = { class: "space-y-1" }, h1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, f1 = ["checked", "disabled"], p1 = { class: "mt-2 block space-y-1" }, m1 = ["value", "disabled"], g1 = {
  key: 1,
  class: "mt-2 block space-y-1"
}, b1 = ["value", "disabled"], y1 = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, v1 = { class: "space-y-1" }, x1 = ["value", "disabled"], w1 = { class: "space-y-1" }, A1 = ["value", "disabled"], E1 = {
  key: 3,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, N1 = { class: "mb-2 flex items-center justify-between" }, T1 = ["disabled"], S1 = { class: "space-y-2" }, C1 = {
  key: 4,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, k1 = /* @__PURE__ */ Te({
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
    function g() {
      return {
        ...p(),
        key: "",
        label: ""
      };
    }
    function h(T) {
      const N = i(T) ? T : {}, j = o(N.type), V = {
        type: j,
        autogenerated: d(j, N.autogenerated),
        required: !!N.required,
        placeholder: l(N.placeholder),
        helpText: l(N.helpText),
        options: j === "select" ? u(N.options) : [],
        documentSchemaId: j === "document" ? l(N.documentSchemaId) : "",
        documentLabelField: j === "document" ? l(N.documentLabelField) : ""
      };
      return j === "map" && (V.mapFields = Array.isArray(N.mapFields) ? N.mapFields.map((J) => A(J)) : []), j === "array" && (V.itemSchema = h(N.itemSchema)), V;
    }
    function A(T) {
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
        const N = A(r.modelValue);
        T.key = N.key, T.label = N.label;
      }
      return T;
    }
    function k(T, N) {
      const j = h(T), V = {
        type: j.type,
        autogenerated: d(j.type, j.autogenerated),
        required: !!j.required,
        placeholder: l(j.placeholder),
        helpText: l(j.helpText),
        options: j.type === "select" ? u(j.options) : [],
        documentSchemaId: j.type === "document" ? l(j.documentSchemaId) : "",
        documentLabelField: j.type === "document" ? l(j.documentLabelField) : ""
      };
      if (j.type === "map" && (V.mapFields = (j.mapFields ?? []).map((J) => A(J))), j.type === "array" && (V.itemSchema = k(j.itemSchema ?? p(), !1)), N) {
        const J = A(T);
        V.key = J.key, V.label = J.label;
      }
      return V;
    }
    function _(T) {
      s("update:modelValue", k(T, r.withIdentity));
    }
    function q(T, N) {
      const j = E();
      j[T] = N, _(j);
    }
    function U(T) {
      const N = E(), j = o(T);
      N.type = j, N.autogenerated = j === "id", j !== "select" && (N.options = []), j !== "document" && (N.documentSchemaId = "", N.documentLabelField = ""), j === "map" ? (N.mapFields = Array.isArray(N.mapFields) ? N.mapFields.map((V) => A(V)) : [], delete N.itemSchema) : j === "array" ? (N.itemSchema = h(N.itemSchema ?? p()), delete N.mapFields) : (delete N.mapFields, delete N.itemSchema), _(N);
    }
    function z(T) {
      const N = E();
      N.required = T, _(N);
    }
    function X(T) {
      const N = E();
      N.autogenerated = N.type === "id" ? !0 : T, _(N);
    }
    function K(T) {
      const N = E();
      N.placeholder = T, _(N);
    }
    function ie(T) {
      const N = E();
      N.helpText = T, _(N);
    }
    function ae() {
      return (E().options ?? []).join(", ");
    }
    function be(T) {
      const N = E();
      N.options = T.split(",").map((j) => j.trim()).filter(Boolean), _(N);
    }
    function Ee() {
      return E().documentSchemaId ?? "";
    }
    function ye() {
      return E().documentLabelField ?? "";
    }
    function b(T) {
      const N = E();
      N.documentSchemaId = T, _(N);
    }
    function F(T) {
      const N = E();
      N.documentLabelField = T, _(N);
    }
    function S() {
      const T = E();
      return T.type !== "map" || !Array.isArray(T.mapFields) ? [] : T.mapFields.map((N) => A(N));
    }
    function L() {
      const T = E();
      T.type = "map", T.mapFields = [...S(), g()], _(T);
    }
    function f(T, N) {
      const j = E(), V = S();
      V[T] = A(N), j.mapFields = V, _(j);
    }
    function w(T) {
      const N = E(), j = S();
      j.splice(T, 1), N.mapFields = j, _(N);
    }
    function C() {
      const T = E();
      return T.type !== "array" ? p() : h(T.itemSchema ?? p());
    }
    function P(T) {
      const N = E();
      N.type = "array", N.itemSchema = h(T), _(N);
    }
    function D() {
      s("remove");
    }
    return (T, N) => {
      const j = xo("CmsSchemaFieldEditor", !0);
      return O(), M("article", Gb, [
        x("div", Wb, [
          n.title ? (O(), M("p", Zb, Q(n.title), 1)) : se("", !0),
          n.canRemove ? (O(), M("button", {
            key: 1,
            type: "button",
            disabled: n.disabled,
            class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60",
            onClick: D
          }, " Quitar ", 8, Yb)) : se("", !0)
        ]),
        n.withIdentity ? (O(), M("div", Xb, [
          x("label", Qb, [
            N[10] || (N[10] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Key", -1)),
            x("input", {
              value: E().key || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[0] || (N[0] = (V) => q("key", V.target.value))
            }, null, 40, Jb)
          ]),
          x("label", e1, [
            N[11] || (N[11] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Label", -1)),
            x("input", {
              value: E().label || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[1] || (N[1] = (V) => q("label", V.target.value))
            }, null, 40, t1)
          ])
        ])) : se("", !0),
        x("div", n1, [
          x("label", r1, [
            N[12] || (N[12] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo", -1)),
            x("select", {
              value: E().type,
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: N[2] || (N[2] = (V) => U(V.target.value))
            }, [
              (O(), M(Me, null, Pe(t, (V) => x("option", {
                key: V.value,
                value: V.value
              }, Q(V.label), 9, i1)), 64))
            ], 40, s1)
          ]),
          x("label", a1, [
            N[13] || (N[13] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Placeholder", -1)),
            x("input", {
              value: E().placeholder || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[3] || (N[3] = (V) => K(V.target.value))
            }, null, 40, o1)
          ]),
          x("label", l1, [
            N[15] || (N[15] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Requerido", -1)),
            x("span", u1, [
              x("input", {
                checked: !!E().required,
                type: "checkbox",
                disabled: n.disabled,
                onChange: N[4] || (N[4] = (V) => z(V.target.checked))
              }, null, 40, c1),
              N[14] || (N[14] = x("span", { class: "ml-2" }, "Sí", -1))
            ])
          ]),
          x("label", d1, [
            N[17] || (N[17] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Autogenerado", -1)),
            x("span", h1, [
              x("input", {
                checked: !!E().autogenerated,
                type: "checkbox",
                disabled: n.disabled || E().type === "id",
                onChange: N[5] || (N[5] = (V) => X(V.target.checked))
              }, null, 40, f1),
              N[16] || (N[16] = x("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        x("label", p1, [
          N[18] || (N[18] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Help text", -1)),
          x("input", {
            value: E().helpText || "",
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: N[6] || (N[6] = (V) => ie(V.target.value))
          }, null, 40, m1)
        ]),
        E().type === "select" ? (O(), M("label", g1, [
          N[19] || (N[19] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Opciones (separadas por coma)", -1)),
          x("input", {
            value: ae(),
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: N[7] || (N[7] = (V) => be(V.target.value))
          }, null, 40, b1)
        ])) : se("", !0),
        E().type === "document" ? (O(), M("div", y1, [
          x("label", v1, [
            N[20] || (N[20] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Schema destino", -1)),
            x("input", {
              value: Ee(),
              type: "text",
              disabled: n.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[8] || (N[8] = (V) => b(V.target.value))
            }, null, 40, x1)
          ]),
          x("label", w1, [
            N[21] || (N[21] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Campo etiqueta", -1)),
            x("input", {
              value: ye(),
              type: "text",
              disabled: n.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: N[9] || (N[9] = (V) => F(V.target.value))
            }, null, 40, A1)
          ])
        ])) : se("", !0),
        E().type === "map" ? (O(), M("div", E1, [
          x("div", N1, [
            N[22] || (N[22] = x("p", { class: "text-xs font-bold uppercase tracking-wide text-slate-600" }, "Map fields", -1)),
            x("button", {
              type: "button",
              disabled: n.disabled,
              class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60",
              onClick: L
            }, " Agregar campo ", 8, T1)
          ]),
          x("div", S1, [
            (O(!0), M(Me, null, Pe(S(), (V, J) => (O(), Le(j, {
              key: `map-field-${J}`,
              "model-value": V,
              disabled: n.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (Z) => f(J, Z),
              onRemove: (Z) => w(J)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : se("", !0),
        E().type === "array" ? (O(), M("div", C1, [
          N[23] || (N[23] = x("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-600" }, "Item schema", -1)),
          vt(j, {
            "model-value": C(),
            "with-identity": !1,
            disabled: n.disabled,
            title: "Estructura del ítem",
            "onUpdate:modelValue": P
          }, null, 8, ["model-value", "disabled"])
        ])) : se("", !0)
      ]);
    };
  }
}), L1 = { class: "space-y-4" }, _1 = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, q1 = {
  key: 1,
  class: "text-sm text-slate-500"
}, I1 = {
  key: 2,
  class: "text-sm text-slate-500"
}, O1 = {
  key: 3,
  class: "rounded-2xl border border-slate-200 bg-white p-5"
}, R1 = { class: "flex flex-wrap items-center justify-between gap-3" }, $1 = { class: "text-lg font-black text-slate-900" }, D1 = { class: "text-xs text-slate-500" }, B1 = ["disabled"], F1 = { class: "mt-4 grid gap-3 md:grid-cols-2" }, M1 = { class: "space-y-1" }, P1 = ["value"], j1 = { class: "space-y-1" }, U1 = ["value"], V1 = { class: "space-y-1 md:col-span-2" }, z1 = ["value"], H1 = { class: "space-y-1" }, K1 = ["value"], G1 = { class: "space-y-1" }, W1 = ["value"], Z1 = { class: "space-y-1" }, Y1 = ["value"], X1 = { class: "space-y-1" }, Q1 = ["value"], J1 = {
  key: 0,
  class: "space-y-1"
}, ey = ["value"], ty = {
  key: 1,
  class: "space-y-1"
}, ny = ["value"], ry = { class: "mt-5 border-t border-slate-200 pt-4" }, sy = { class: "space-y-3" }, iy = {
  key: 0,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, ay = {
  key: 1,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, oy = /* @__PURE__ */ Te({
  __name: "AdminSchemasPage",
  setup(n) {
    const e = is(), t = yr(), r = te([]), s = te(""), i = te(!1), o = te(!1), l = te(null), u = te(!1), d = te(""), p = te(""), g = te(""), h = Ie(() => r.value.find((f) => f.id === s.value) ?? null);
    br(() => {
      A();
    }), Zt(
      () => e.query.schema,
      (f) => {
        typeof f == "string" && r.value.some((w) => w.id === f) && s.value !== f && (s.value = f);
      }
    ), Zt(
      h,
      (f) => {
        if (p.value = "", g.value = "", f) {
          u.value = !1, l.value = X(f);
          return;
        }
        u.value || (l.value = null);
      },
      { immediate: !0 }
    );
    async function A() {
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
      const w = typeof e.query.schema == "string" ? e.query.schema : "";
      if (w && f.some((C) => C.id === w)) {
        s.value = w;
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
    function _() {
      return {
        type: "text",
        autogenerated: !1,
        required: !1,
        placeholder: "",
        helpText: "",
        options: []
      };
    }
    function q() {
      return {
        ..._(),
        key: "",
        label: ""
      };
    }
    function U(f) {
      const w = {
        type: f.type,
        autogenerated: !!f.autogenerated,
        required: !!f.required,
        placeholder: f.placeholder ?? "",
        helpText: f.helpText ?? "",
        options: Array.isArray(f.options) ? [...f.options] : []
      };
      return f.type === "map" && (w.mapFields = Array.isArray(f.mapFields) ? f.mapFields.map((C) => z(C)) : []), f.type === "array" && (w.itemSchema = f.itemSchema ? U(f.itemSchema) : _()), w;
    }
    function z(f) {
      return {
        ...U(f),
        key: f.key ?? "",
        label: f.label ?? ""
      };
    }
    function X(f) {
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
        fields: f.fields.map((w) => z(w))
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
        fields: [q()]
      };
    }
    async function ie() {
      u.value = !0, s.value = "", l.value = K(), p.value = "", g.value = "";
      const f = { ...e.query };
      delete f.schema, await t.replace({ query: f });
    }
    function ae(f, w) {
      l.value && (l.value = {
        ...l.value,
        [f]: w
      });
    }
    function be(f) {
      l.value && (l.value.storageType = f === "dictionary" ? "dictionary" : "document");
    }
    function Ee() {
      l.value && l.value.fields.push(q());
    }
    function ye(f, w) {
      l.value && (l.value.fields[f] = z(w));
    }
    function b(f) {
      l.value && l.value.fields.splice(f, 1);
    }
    function F(f, w) {
      if (f.type === "map") {
        const C = Array.isArray(f.mapFields) ? f.mapFields : [];
        for (let P = 0; P < C.length; P += 1)
          S(C[P], `${w}.mapFields[${P}]`);
      }
      f.type === "array" && f.itemSchema && F(f.itemSchema, `${w}.itemSchema`);
    }
    function S(f, w) {
      if (!f.key.trim() || !f.label.trim())
        throw new Error(`${w}: completa key y label.`);
      F(f, w);
    }
    async function L() {
      if (l.value) {
        o.value = !0, p.value = "", g.value = "";
        try {
          const f = l.value;
          if (!f.id.trim() || !f.title.trim() || !f.collectionName.trim())
            throw new Error("Completa id, título y colección del esquema.");
          if (!f.fields.length)
            throw new Error("Agrega al menos un campo al esquema.");
          const w = f.fields.map((D) => z(D));
          for (let D = 0; D < w.length; D += 1)
            S(w[D], `fields[${D}]`);
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
            fields: w
          };
          await wu(C), await A(), s.value = C.id, u.value = !1, await k(C.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const P = r.value.find((D) => D.id === s.value);
          l.value = X(P || C), g.value = "Esquema actualizado.";
        } catch (f) {
          p.value = f instanceof Error ? f.message : "No se pudo guardar el esquema.";
        } finally {
          o.value = !1;
        }
      }
    }
    return (f, w) => (O(), M("section", L1, [
      x("article", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        x("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
          w[9] || (w[9] = x("div", null, [
            x("h3", { class: "text-xl font-black text-slate-900" }, "Esquema editable"),
            x("p", { class: "mt-1 text-sm text-slate-600" }, [
              Ye(" Edición visual de campos. Los tipos "),
              x("strong", null, "map"),
              Ye(" y "),
              x("strong", null, "array"),
              Ye(" se editan por interfaz. ")
            ])
          ], -1)),
          x("div", { class: "flex items-center gap-2" }, [
            x("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: ie
            }, " Nuevo esquema "),
            x("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: A
            }, " Recargar ")
          ])
        ])
      ]),
      d.value ? (O(), M("p", _1, Q(d.value), 1)) : se("", !0),
      i.value ? (O(), M("p", q1, "Cargando esquemas...")) : l.value ? (O(), M("article", O1, [
        x("div", R1, [
          x("div", null, [
            x("h4", $1, Q(l.value.title || h.value?.title || "Nuevo esquema"), 1),
            x("p", D1, [
              w[10] || (w[10] = Ye(" ID: ", -1)),
              x("code", null, Q(h.value?.id || "nuevo"), 1)
            ])
          ]),
          x("button", {
            type: "button",
            disabled: o.value,
            class: "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400",
            onClick: L
          }, Q(o.value ? "Guardando..." : "Guardar cambios"), 9, B1)
        ]),
        x("div", F1, [
          x("label", M1, [
            w[11] || (w[11] = x("span", { class: "text-xs font-semibold text-slate-700" }, "ID", -1)),
            x("input", {
              value: l.value.id,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: w[0] || (w[0] = (C) => ae("id", C.target.value))
            }, null, 40, P1)
          ]),
          x("label", j1, [
            w[12] || (w[12] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Título", -1)),
            x("input", {
              value: l.value.title,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: w[1] || (w[1] = (C) => ae("title", C.target.value))
            }, null, 40, U1)
          ]),
          x("label", V1, [
            w[13] || (w[13] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Descripción", -1)),
            x("input", {
              value: l.value.description,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: w[2] || (w[2] = (C) => ae("description", C.target.value))
            }, null, 40, z1)
          ]),
          x("label", H1, [
            w[15] || (w[15] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo de almacenamiento", -1)),
            x("select", {
              value: l.value.storageType,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onChange: w[3] || (w[3] = (C) => be(C.target.value))
            }, [...w[14] || (w[14] = [
              x("option", { value: "document" }, "document", -1),
              x("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, K1)
          ]),
          x("label", G1, [
            w[16] || (w[16] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Colección", -1)),
            x("input", {
              value: l.value.collectionName,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: w[4] || (w[4] = (C) => ae("collectionName", C.target.value))
            }, null, 40, W1)
          ]),
          x("label", Z1, [
            w[17] || (w[17] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Slug desde campo", -1)),
            x("input", {
              value: l.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: w[5] || (w[5] = (C) => ae("slugFromField", C.target.value))
            }, null, 40, Y1)
          ]),
          x("label", X1, [
            w[18] || (w[18] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Campo de preview", -1)),
            x("input", {
              value: l.value.previewField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: w[6] || (w[6] = (C) => ae("previewField", C.target.value))
            }, null, 40, Q1)
          ]),
          l.value.storageType === "dictionary" ? (O(), M("label", J1, [
            w[19] || (w[19] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary document ID", -1)),
            x("input", {
              value: l.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: w[7] || (w[7] = (C) => ae("dictionaryDocumentId", C.target.value))
            }, null, 40, ey)
          ])) : se("", !0),
          l.value.storageType === "dictionary" ? (O(), M("label", ty, [
            w[20] || (w[20] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary root key", -1)),
            x("input", {
              value: l.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: w[8] || (w[8] = (C) => ae("dictionaryRootKey", C.target.value))
            }, null, 40, ny)
          ])) : se("", !0)
        ]),
        x("div", ry, [
          x("div", { class: "mb-3 flex items-center justify-between" }, [
            w[21] || (w[21] = x("h5", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Campos", -1)),
            x("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: Ee
            }, " Agregar campo ")
          ]),
          x("div", sy, [
            (O(!0), M(Me, null, Pe(l.value.fields, (C, P) => (O(), Le(k1, {
              key: `schema-field-${P}`,
              "model-value": C,
              "can-remove": !0,
              title: `Campo ${P + 1}`,
              "onUpdate:modelValue": (D) => ye(P, D),
              onRemove: (D) => b(P)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        p.value ? (O(), M("p", iy, Q(p.value), 1)) : se("", !0),
        g.value ? (O(), M("p", ay, Q(g.value), 1)) : se("", !0)
      ])) : (O(), M("p", I1, "No hay esquema seleccionado."))
    ]));
  }
}), ly = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, uy = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, cy = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, dy = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, hy = {
  key: 3,
  class: "mt-4 text-sm text-slate-500"
}, fy = {
  key: 4,
  class: "mt-4 text-sm text-slate-500"
}, py = {
  key: 5,
  class: "mt-4 space-y-3"
}, my = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, gy = { class: "text-sm font-semibold text-slate-900" }, by = { class: "text-xs text-slate-500" }, yy = { class: "text-xs text-slate-500" }, vy = { class: "text-xs text-slate-500" }, xy = { class: "flex flex-wrap gap-3" }, wy = ["checked", "disabled", "onChange"], Ay = /* @__PURE__ */ Te({
  __name: "AdminUsersPage",
  setup(n) {
    const e = te([]), t = te(!1), r = te(""), s = te(""), i = te(null), o = Ie(() => In.value === "admin"), l = [
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
        e.value = await tu();
      } catch {
        r.value = "No se pudieron cargar los usuarios.";
      } finally {
        t.value = !1;
      }
    }
    async function d(A, E) {
      if (s.value = "", r.value = "", !o.value) {
        r.value = "Solo un admin puede cambiar roles.";
        return;
      }
      const k = A.role === E ? null : E;
      i.value = A.id;
      try {
        await nu(A.id, k), A.role = k, s.value = "Rol actualizado correctamente.";
      } catch {
        r.value = "No se pudo actualizar el rol.";
      } finally {
        i.value = null;
      }
    }
    function p(A, E) {
      return A === E;
    }
    function g(A) {
      return A === null ? "Sin rol" : A.charAt(0).toUpperCase() + A.slice(1);
    }
    function h(A) {
      const E = A?.toDate?.();
      return E ? E.toLocaleString("es-ES") : "Sin registros";
    }
    return (A, E) => (O(), M("section", ly, [
      x("div", { class: "flex items-center justify-between" }, [
        E[0] || (E[0] = x("h3", { class: "text-xl font-black text-slate-900" }, "Usuarios", -1)),
        x("button", {
          type: "button",
          class: "rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
          onClick: u
        }, " Recargar ")
      ]),
      E[1] || (E[1] = x("p", { class: "mt-1 text-sm text-slate-600" }, "Listado de usuarios con último login y control de rol.", -1)),
      o.value ? se("", !0) : (O(), M("p", uy, " Solo usuarios con rol admin pueden editar roles. ")),
      r.value ? (O(), M("p", cy, Q(r.value), 1)) : se("", !0),
      s.value ? (O(), M("p", dy, Q(s.value), 1)) : se("", !0),
      t.value ? (O(), M("p", hy, "Cargando usuarios...")) : e.value.length === 0 ? (O(), M("p", fy, "No hay usuarios registrados.")) : (O(), M("div", py, [
        (O(!0), M(Me, null, Pe(e.value, (k) => (O(), M("article", {
          key: k.id,
          class: "rounded-lg border border-slate-200 p-4"
        }, [
          x("div", my, [
            x("div", null, [
              x("p", gy, Q(k.email || k.id), 1),
              x("p", by, "UID: " + Q(k.id), 1),
              x("p", yy, "Último login: " + Q(h(k.lastLoginAt)), 1),
              x("p", vy, "Rol actual: " + Q(g(k.role)), 1)
            ]),
            x("div", xy, [
              (O(), M(Me, null, Pe(l, (_) => x("label", {
                key: _.label,
                class: "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
              }, [
                x("input", {
                  type: "checkbox",
                  checked: p(k.role, _.value),
                  disabled: !o.value || i.value === k.id,
                  onChange: (q) => d(k, _.value)
                }, null, 40, wy),
                Ye(" " + Q(_.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), go = /* @__PURE__ */ new WeakSet();
function Dy(n, e) {
  if (go.has(n))
    return;
  const t = Dn(e.basePath ?? "/admin"), r = Dn(e.loginPath ?? "/ingresar"), s = Dn(e.registerPath ?? "/registro"), i = Ny(e.homePath ?? "/");
  Ql(e.firebase), uu({ basePath: t, loginPath: r, registerPath: s, homePath: i }), su();
  const o = Ey(t, r, s);
  for (const l of o)
    n.addRoute(l);
  n.beforeEach(async (l) => (await iu(), l.meta.cmsRequiresAuth && !cr.value ? {
    path: r,
    query: { redirect: l.fullPath }
  } : (l.path === r || l.path === s || l.meta.cmsGuestOnly) && cr.value ? { path: t } : !0)), go.add(n);
}
function Ey(n = "/admin", e = "/ingresar", t = "/registro") {
  const r = Dn(n), s = Dn(e), i = Dn(t);
  return [
    { path: s, component: pu, meta: { cmsGuestOnly: !0 } },
    { path: i, component: vu, meta: { cmsGuestOnly: !0 } },
    {
      path: r,
      component: nc,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${r}/content` },
        { path: "content", component: Kb, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: oy, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: Ay, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function Dn(n) {
  const e = String(n || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function Ny(n) {
  const e = String(n || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
export {
  fb as actualizarRegistroDocumento,
  lu as cerrarSesion,
  db as crearRegistroDocumento,
  Ey as createCmsRoutes,
  hb as eliminarRegistroDocumento,
  mb as guardarRegistroDiccionario,
  wu as guardarSchemaContenido,
  po as listarRegistrosDocumento,
  Di as listarSchemasContenido,
  gb as obtenerRegistroDiccionario,
  Dy as registerPifWarriorsCms,
  In as rolActual,
  cr as usuarioActual
};
