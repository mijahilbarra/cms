import { signOut as Kl, onAuthStateChanged as Gl, setPersistence as wo, browserLocalPersistence as Ao, signInWithEmailAndPassword as Wl, createUserWithEmailAndPassword as Zl } from "firebase/auth";
import { ref as ee, defineComponent as Ne, openBlock as I, createElementBlock as F, createElementVNode as x, withModifiers as ur, withDirectives as Dn, vModelText as cr, toDisplayString as Q, createCommentVNode as te, createTextVNode as Xe, createVNode as Ze, unref as et, withCtx as yt, useModel as aa, watch as Rt, Fragment as _e, vShow as Yl, Transition as oa, normalizeClass as Pe, renderList as Re, createBlock as Le, mergeModels as Xl, onMounted as xr, onBeforeUnmount as Eo, computed as je, resolveComponent as No } from "vue";
import { query as Ri, collection as dn, orderBy as $i, getDocs as Un, updateDoc as To, doc as Yt, serverTimestamp as Ye, getDoc as os, setDoc as Jr, addDoc as Ql, deleteDoc as Jl, limit as So } from "firebase/firestore";
import { useRoute as wr, useRouter as Hn, RouterLink as zt, RouterView as eu } from "vue-router";
import { ref as tu, uploadBytes as nu, getDownloadURL as ru } from "firebase/storage";
let mi = null;
function su(n) {
  mi = n;
}
function Ce() {
  if (!mi)
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  return mi;
}
const ls = "users";
async function iu(n) {
  const { firestore: e } = Ce(), t = Yt(e, ls, n.uid);
  if (!(await os(t)).exists()) {
    await Jr(t, {
      email: n.email ?? "",
      role: null,
      lastLoginAt: Ye(),
      createdAt: Ye(),
      updatedAt: Ye()
    });
    return;
  }
  await Jr(
    t,
    {
      email: n.email ?? "",
      lastLoginAt: Ye(),
      updatedAt: Ye()
    },
    { merge: !0 }
  );
}
async function au(n) {
  const { firestore: e } = Ce(), t = await os(Yt(e, ls, n));
  return t.exists() ? Co(t.data().role) : null;
}
async function ou() {
  const { firestore: n } = Ce(), e = Ri(dn(n, ls), $i("email", "asc"));
  return (await Un(e)).docs.map((r) => ({
    id: r.id,
    email: String(r.data().email ?? ""),
    role: Co(r.data().role),
    lastLoginAt: r.data().lastLoginAt,
    createdAt: r.data().createdAt,
    updatedAt: r.data().updatedAt
  }));
}
async function lu(n, e) {
  const { firestore: t } = Ce();
  await To(Yt(t, ls, n), {
    role: e,
    updatedAt: Ye()
  });
}
function Co(n) {
  return n === "admin" || n === "writer" || n === "manager" ? n : null;
}
const fr = ee(null), ko = ee(!1), Bn = ee(null);
let Yr = null, uu = new Promise((n) => {
  Yr = n;
}), la = !1;
function cu() {
  if (la)
    return;
  const { auth: n } = Ce();
  fr.value = n.currentUser, Gl(n, async (e) => {
    fr.value = e, Bn.value = null, e && await Di(e), ko.value = !0, Yr && (Yr(), Yr = null);
  }), la = !0;
}
async function du() {
  ko.value || await uu;
}
async function hu(n, e) {
  const { auth: t } = Ce();
  await wo(t, Ao);
  const r = await Zl(t, n, e);
  await Di(r.user);
}
async function fu(n, e) {
  const { auth: t } = Ce();
  await wo(t, Ao);
  const r = await Wl(t, n, e);
  await Di(r.user);
}
async function pu() {
  const { auth: n } = Ce();
  await Kl(n);
}
async function Di(n) {
  try {
    await iu(n), Bn.value = await au(n.uid);
  } catch (e) {
    console.error("No se pudo sincronizar el perfil del usuario:", e);
  }
}
let gi = {
  basePath: "/admin",
  loginPath: "/ingresar",
  registerPath: "/registro",
  homePath: "/"
};
function mu(n) {
  gi = {
    ...gi,
    ...n
  };
}
function us() {
  return gi;
}
const gu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, bu = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, yu = ["disabled"], vu = { class: "mt-4 text-sm" }, xu = /* @__PURE__ */ Ne({
  __name: "LoginPage",
  setup(n) {
    const e = wr(), t = Hn(), { basePath: r, registerPath: s } = us(), i = ee(""), o = ee(""), l = ee(!1), u = ee("");
    async function d() {
      u.value = "", l.value = !0;
      try {
        await fu(i.value, o.value);
        const p = typeof e.query.redirect == "string" ? e.query.redirect : r;
        await t.push(p);
      } catch {
        u.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, b) => (I(), F("main", gu, [
      b[6] || (b[6] = x("h1", { class: "text-3xl font-black" }, "Ingresar", -1)),
      b[7] || (b[7] = x("p", { class: "mt-2 text-sm" }, "Accede para administrar contenido y esquemas.", -1)),
      x("form", {
        class: "mt-8 space-y-4 rounded-xl border p-5",
        onSubmit: ur(d, ["prevent"])
      }, [
        x("div", null, [
          b[2] || (b[2] = x("label", { class: "mb-1 block text-sm font-semibold" }, "Correo", -1)),
          Dn(x("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "tu@email.com"
          }, null, 512), [
            [cr, i.value]
          ])
        ]),
        x("div", null, [
          b[3] || (b[3] = x("label", { class: "mb-1 block text-sm font-semibold" }, "Contraseña", -1)),
          Dn(x("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (h) => o.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "********"
          }, null, 512), [
            [cr, o.value]
          ])
        ]),
        u.value ? (I(), F("p", bu, Q(u.value), 1)) : te("", !0),
        x("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        }, Q(l.value ? "Ingresando..." : "Entrar"), 9, yu)
      ], 32),
      x("p", vu, [
        b[5] || (b[5] = Xe(" ¿No tienes cuenta? ", -1)),
        Ze(et(zt), {
          to: et(s),
          class: "font-semibold"
        }, {
          default: yt(() => [...b[4] || (b[4] = [
            Xe("Crear cuenta", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), wu = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, Au = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, Eu = ["disabled"], Nu = { class: "mt-4 text-sm" }, Tu = /* @__PURE__ */ Ne({
  __name: "RegisterPage",
  setup(n) {
    const e = Hn(), { basePath: t, loginPath: r } = us(), s = ee(""), i = ee(""), o = ee(""), l = ee(!1), u = ee("");
    async function d() {
      if (u.value = "", i.value !== o.value) {
        u.value = "Las contraseñas no coinciden.";
        return;
      }
      l.value = !0;
      try {
        await hu(s.value, i.value), await e.push(t);
      } catch {
        u.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (p, b) => (I(), F("main", wu, [
      b[8] || (b[8] = x("h1", { class: "text-3xl font-black" }, "Crear cuenta", -1)),
      b[9] || (b[9] = x("p", { class: "mt-2 text-sm" }, "Registro para administrar contenido.", -1)),
      x("form", {
        class: "mt-8 space-y-4 rounded-xl border p-5",
        onSubmit: ur(d, ["prevent"])
      }, [
        x("div", null, [
          b[3] || (b[3] = x("label", { class: "mb-1 block text-sm font-semibold" }, "Correo", -1)),
          Dn(x("input", {
            "onUpdate:modelValue": b[0] || (b[0] = (h) => s.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "tu@email.com"
          }, null, 512), [
            [cr, s.value]
          ])
        ]),
        x("div", null, [
          b[4] || (b[4] = x("label", { class: "mb-1 block text-sm font-semibold" }, "Contraseña", -1)),
          Dn(x("input", {
            "onUpdate:modelValue": b[1] || (b[1] = (h) => i.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "Mínimo 6 caracteres"
          }, null, 512), [
            [cr, i.value]
          ])
        ]),
        x("div", null, [
          b[5] || (b[5] = x("label", { class: "mb-1 block text-sm font-semibold" }, "Confirmar contraseña", -1)),
          Dn(x("input", {
            "onUpdate:modelValue": b[2] || (b[2] = (h) => o.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [cr, o.value]
          ])
        ]),
        u.value ? (I(), F("p", Au, Q(u.value), 1)) : te("", !0),
        x("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        }, Q(l.value ? "Creando cuenta..." : "Registrarme"), 9, Eu)
      ], 32),
      x("p", Nu, [
        b[7] || (b[7] = Xe(" ¿Ya tienes cuenta? ", -1)),
        Ze(et(zt), {
          to: et(r),
          class: "font-semibold"
        }, {
          default: yt(() => [...b[6] || (b[6] = [
            Xe("Iniciar sesión", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), Su = {
  key: 0,
  class: "fixed bottom-0 left-0 top-0 z-50 h-dvh w-80 border-r border-gray-200 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
}, Cu = { class: "flex h-full flex-col gap-3 p-3" }, ku = { class: "flex items-center justify-between gap-2" }, Lu = { class: "m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.05em]" }, _u = { class: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto" }, qu = { class: "rounded-xl border border-gray-200 bg-white p-3" }, Iu = { class: "flex items-start justify-between gap-2" }, Ou = {
  key: 0,
  class: "mt-2.5 flex flex-col gap-1.5 border-t border-gray-200 pt-2.5"
}, Ru = { class: "m-0 font-bold" }, $u = {
  key: 0,
  class: "m-0 text-xs text-gray-500"
}, Du = {
  key: 1,
  class: "m-0 text-xs text-gray-500"
}, Bu = {
  key: 0,
  class: "rounded-xl border border-gray-200 bg-white p-3"
}, Fu = { class: "flex flex-col gap-1.5" }, Mu = { class: "m-0 font-bold" }, Pu = {
  key: 1,
  class: "rounded-xl border border-gray-200 bg-white p-3"
}, ju = { class: "flex items-start justify-between gap-2" }, Uu = {
  key: 0,
  class: "mt-2.5 flex flex-col gap-1.5 border-t border-gray-200 pt-2.5"
}, Vu = { class: "m-0 font-bold" }, zu = {
  key: 0,
  class: "m-0 text-xs text-gray-500"
}, Hu = { class: "mt-auto border-t border-gray-200 pt-3" }, Ku = { class: "flex items-center gap-2 rounded-xl border border-gray-200 p-2" }, Gu = {
  type: "button",
  class: "min-w-0 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-left text-gray-900"
}, Wu = { class: "mt-1 mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500" }, nr = "cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900", Zu = /* @__PURE__ */ Ne({
  __name: "AdminSidebar",
  props: /* @__PURE__ */ Xl({
    esPantallaGrande: { type: Boolean },
    tituloPanel: {},
    basePath: {},
    cargandoSchemasContenido: { type: Boolean },
    schemasDiccionario: {},
    schemasDocumento: {},
    schemasContenido: {},
    emailActual: {}
  }, {
    panelAbierto: { type: Boolean, required: !0 },
    panelAbiertoModifiers: {},
    modoDesarrollador: { type: Boolean, required: !0 },
    modoDesarrolladorModifiers: {}
  }),
  emits: ["update:panelAbierto", "update:modoDesarrollador"],
  setup(n) {
    const e = n, t = wr(), r = Hn(), { loginPath: s, homePath: i } = us(), o = ee(!1), l = ee(!0), u = ee(!0), d = aa(n, "panelAbierto"), p = aa(n, "modoDesarrollador");
    Rt(
      () => t.fullPath,
      () => {
        t.path.startsWith(`${e.basePath}/content`) && (l.value = !0), t.path.startsWith(`${e.basePath}/schemas`) && (u.value = !0);
      }
    );
    function b(R) {
      return [
        "block rounded-[10px] border px-2.5 py-2 text-xs no-underline",
        R ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-900"
      ].join(" ");
    }
    function h(R) {
      return R ? "mt-0.5 text-white/80" : "mt-0.5 text-gray-500";
    }
    function w(R) {
      return [
        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
        R ? "bg-emerald-500/20 text-emerald-700" : "bg-gray-500/15 text-gray-500"
      ].join(" ");
    }
    function E() {
      o.value = !0;
    }
    function k() {
      o.value = !1;
    }
    function _(R) {
      return t.path.startsWith(R);
    }
    function $(R) {
      return {
        path: `${e.basePath}/content`,
        query: { schema: R }
      };
    }
    function M(R) {
      return {
        path: `${e.basePath}/schemas`,
        query: { schema: R }
      };
    }
    function U(R) {
      if (!t.path.startsWith(`${e.basePath}/content`))
        return !1;
      const N = typeof t.query.schema == "string" ? t.query.schema : "";
      return N ? N === R : e.schemasContenido[0]?.id === R;
    }
    function K(R) {
      if (!t.path.startsWith(`${e.basePath}/schemas`))
        return !1;
      const N = typeof t.query.schema == "string" ? t.query.schema : "";
      return N ? N === R : e.schemasContenido[0]?.id === R;
    }
    function H() {
      d.value = !d.value;
    }
    function ae() {
      d.value = !1;
    }
    function ie() {
      l.value = !l.value;
    }
    function be() {
      u.value = !u.value;
    }
    function Ae(R) {
      return /^(https?:)?\/\//i.test(R);
    }
    async function we() {
      if (i) {
        if (Ae(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await r.push(i);
      }
    }
    async function y() {
      await pu(), await r.push(s);
    }
    return (R, N) => (I(), F(_e, null, [
      Dn(x("button", {
        type: "button",
        "aria-label": "Abrir sidebar",
        class: "fixed left-0 top-1/2 z-[60] -translate-y-1/2 cursor-pointer rounded-r-xl border border-l-0 border-gray-300 bg-white px-[9px] py-[10px] text-gray-900 shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
        onClick: H
      }, " ☰ ", 512), [
        [Yl, !d.value && !o.value]
      ]),
      Ze(oa, {
        "enter-active-class": "transition-opacity duration-[180ms] ease-out",
        "enter-from-class": "opacity-0",
        "enter-to-class": "opacity-100",
        "leave-active-class": "transition-opacity duration-[180ms] ease-out",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: yt(() => [
          d.value && !e.esPantallaGrande ? (I(), F("div", {
            key: 0,
            class: "fixed inset-0 z-40 bg-white",
            onClick: ae
          })) : te("", !0)
        ]),
        _: 1
      }),
      Ze(oa, {
        "enter-active-class": "transition-all duration-[220ms] ease-out",
        "enter-from-class": "-translate-x-full opacity-0",
        "enter-to-class": "translate-x-0 opacity-100",
        "leave-active-class": "transition-all duration-[220ms] ease-out",
        "leave-from-class": "translate-x-0 opacity-100",
        "leave-to-class": "-translate-x-full opacity-0",
        onBeforeLeave: E,
        onAfterLeave: k,
        onLeaveCancelled: k
      }, {
        default: yt(() => [
          d.value ? (I(), F("aside", Su, [
            x("div", Cu, [
              x("div", ku, [
                x("h2", Lu, Q(e.tituloPanel), 1),
                x("div", { class: "flex items-center gap-2" }, [
                  x("button", {
                    type: "button",
                    "aria-label": "Ir a inicio",
                    class: Pe(nr),
                    onClick: we
                  }, "Inicio"),
                  x("button", {
                    type: "button",
                    "aria-label": "Cerrar sidebar",
                    class: Pe(nr),
                    onClick: ae
                  }, "Cerrar")
                ])
              ]),
              x("button", {
                type: "button",
                class: "flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900",
                onClick: N[0] || (N[0] = (T) => p.value = !p.value)
              }, [
                N[1] || (N[1] = x("span", null, "Modo desarrollador", -1)),
                x("span", {
                  class: Pe(w(p.value))
                }, Q(p.value ? "Activo" : "Oculto"), 3)
              ]),
              x("div", _u, [
                x("div", qu, [
                  x("div", Iu, [
                    Ze(et(zt), {
                      to: `${e.basePath}/content`,
                      class: "min-w-0 flex-1 text-inherit no-underline"
                    }, {
                      default: yt(() => [...N[2] || (N[2] = [
                        x("p", { class: "m-0 text-sm font-extrabold" }, "Contenido", -1),
                        x("p", { class: "mt-1 mb-0 text-xs text-gray-500" }, "Formularios y registros", -1)
                      ])]),
                      _: 1
                    }, 8, ["to"]),
                    x("button", {
                      type: "button",
                      "aria-label": "Expandir o contraer contenido",
                      class: Pe(nr),
                      onClick: ie
                    }, Q(l.value ? "-" : "+"), 1)
                  ]),
                  l.value ? (I(), F("div", Ou, [
                    (I(!0), F(_e, null, Re(e.schemasDiccionario, (T) => (I(), Le(et(zt), {
                      key: T.id,
                      to: $(T.id),
                      class: Pe(b(U(T.id)))
                    }, {
                      default: yt(() => [
                        x("p", Ru, Q(T.title), 1),
                        x("p", {
                          class: Pe(h(U(T.id)))
                        }, Q(T.storageType) + " · " + Q(T.collectionName), 3)
                      ]),
                      _: 2
                    }, 1032, ["to", "class"]))), 128)),
                    e.cargandoSchemasContenido ? (I(), F("p", $u, "Cargando elementos...")) : e.schemasDiccionario.length ? te("", !0) : (I(), F("p", Du, "No hay diccionarios configurados."))
                  ])) : te("", !0)
                ]),
                e.schemasDocumento.length ? (I(), F("div", Bu, [
                  N[3] || (N[3] = x("p", { class: "mb-2 m-0 text-[11px] font-extrabold uppercase text-gray-500" }, "Documentos", -1)),
                  x("div", Fu, [
                    (I(!0), F(_e, null, Re(e.schemasDocumento, (T) => (I(), Le(et(zt), {
                      key: `document-link-${T.id}`,
                      to: $(T.id),
                      class: Pe(b(U(T.id)))
                    }, {
                      default: yt(() => [
                        x("p", Mu, Q(T.title), 1),
                        x("p", {
                          class: Pe(h(U(T.id)))
                        }, "document · " + Q(T.collectionName), 3)
                      ]),
                      _: 2
                    }, 1032, ["to", "class"]))), 128))
                  ])
                ])) : te("", !0),
                p.value ? (I(), F("div", Pu, [
                  x("div", ju, [
                    Ze(et(zt), {
                      to: `${e.basePath}/schemas`,
                      class: "min-w-0 flex-1 text-inherit no-underline"
                    }, {
                      default: yt(() => [...N[4] || (N[4] = [
                        x("p", { class: "m-0 text-sm font-extrabold" }, "Esquemas", -1),
                        x("p", { class: "mt-1 mb-0 text-xs text-gray-500" }, "Edición de esquemas", -1)
                      ])]),
                      _: 1
                    }, 8, ["to"]),
                    x("button", {
                      type: "button",
                      "aria-label": "Expandir o contraer esquemas",
                      class: Pe(nr),
                      onClick: be
                    }, Q(u.value ? "-" : "+"), 1)
                  ]),
                  u.value ? (I(), F("div", Uu, [
                    (I(!0), F(_e, null, Re(e.schemasContenido, (T) => (I(), Le(et(zt), {
                      key: `schema-edit-${T.id}`,
                      to: M(T.id),
                      class: Pe(b(K(T.id)))
                    }, {
                      default: yt(() => [
                        x("p", Vu, Q(T.title), 1),
                        x("p", {
                          class: Pe(h(K(T.id)))
                        }, Q(T.storageType) + " · " + Q(T.collectionName), 3)
                      ]),
                      _: 2
                    }, 1032, ["to", "class"]))), 128)),
                    e.cargandoSchemasContenido ? (I(), F("p", zu, "Cargando elementos...")) : te("", !0)
                  ])) : te("", !0)
                ])) : te("", !0),
                p.value ? (I(), Le(et(zt), {
                  key: 2,
                  to: `${e.basePath}/users`,
                  class: Pe(b(_(`${e.basePath}/users`)))
                }, {
                  default: yt(() => [
                    N[5] || (N[5] = x("p", { class: "m-0 text-sm font-extrabold" }, "Usuarios", -1)),
                    x("p", {
                      class: Pe(h(_(`${e.basePath}/users`)))
                    }, "Roles y último ingreso", 2)
                  ]),
                  _: 1
                }, 8, ["to", "class"])) : te("", !0)
              ]),
              x("div", Hu, [
                x("div", Ku, [
                  x("button", Gu, [
                    N[6] || (N[6] = x("p", { class: "m-0 text-xs font-bold" }, "Cuenta actual", -1)),
                    x("p", Wu, Q(e.emailActual), 1)
                  ]),
                  x("button", {
                    type: "button",
                    "aria-label": "Cerrar sesión",
                    class: Pe(nr),
                    onClick: y
                  }, "Salir")
                ])
              ])
            ])
          ])) : te("", !0)
        ]),
        _: 1
      })
    ], 64));
  }
}), Lo = "cmsSchemas", _o = "schema", qo = "main", Yu = 3e4;
let Xr = null, bi = 0, rr = null;
async function Bi() {
  const n = Date.now();
  if (Xr && n - bi < Yu)
    return Xr;
  if (rr)
    return rr;
  const { firestore: e } = Ce();
  rr = (async () => {
    const r = (await Un(dn(e, Lo))).docs.map((s) => {
      const i = s.data();
      return Io({ ...i, id: s.id });
    }).sort((s, i) => s.title.localeCompare(i.title, "es"));
    return Xr = r, bi = Date.now(), r;
  })();
  try {
    return await rr;
  } finally {
    rr = null;
  }
}
async function Xu(n) {
  const { firestore: e } = Ce(), t = Io(n), r = Yt(e, Lo, t.id);
  await Jr(
    r,
    {
      ...t,
      updatedAt: Ye(),
      createdAt: Ye()
    },
    { merge: !0 }
  ), Qu();
}
function Qu() {
  Xr = null, bi = 0;
}
function Io(n) {
  const e = n;
  let t = [];
  const r = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((u) => es(u)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([u, d]) => es({ key: u, ...d })
  ));
  const s = typeof e.dictionaryDocumentId == "string" ? e.dictionaryDocumentId : "", i = typeof e.dictionaryRootKey == "string" ? e.dictionaryRootKey : "", o = r === "dictionary" ? tc(s || qo) : "", l = r === "dictionary" ? nc(i || _o) : "";
  return {
    id: Ju(String(e.id ?? "tipo-contenido")),
    title: String(e.title ?? "Tipo de contenido"),
    description: typeof e.description == "string" ? e.description : "",
    storageType: r,
    collectionName: ec(String(e.collectionName ?? "registros")),
    dictionaryDocumentId: o,
    dictionaryRootKey: l,
    slugFromField: typeof e.slugFromField == "string" ? e.slugFromField : "",
    previewField: typeof e.previewField == "string" ? e.previewField : "",
    fields: t
  };
}
function es(n) {
  const e = Ro(n.type), t = {
    key: Fi(String(n.key ?? "campo")),
    label: String(n.label ?? "Campo"),
    type: e,
    autogenerated: Do(e, n.autogenerated),
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: $o(n.options),
    documentSchemaId: e === "document" ? Fo(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Mo(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Oo(
    Bo(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => es(r)) : [] : delete t.mapFields, t;
}
function Oo(n) {
  const e = Ro(n.type), t = {
    type: e,
    autogenerated: Do(e, n.autogenerated),
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: $o(n.options),
    documentSchemaId: e === "document" ? Fo(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Mo(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = Oo(
    Bo(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => es(r)) : [] : delete t.mapFields, t;
}
function Ro(n) {
  return n === "date" || n === "numeric" || n === "id" || n === "textarea" || n === "richtext" || n === "image" || n === "select" || n === "document" || n === "boolean" || n === "array" || n === "map" ? n : "text";
}
function $o(n) {
  return Array.isArray(n) ? n.map((e) => String(e).trim()).filter(Boolean) : [];
}
function Do(n, e) {
  return typeof e == "boolean" ? e : n === "id";
}
function Bo(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function Fi(n) {
  return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function Ju(n) {
  return n.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function ec(n) {
  return Fi(n);
}
function tc(n) {
  return String(n).trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || qo;
}
function nc(n) {
  return String(n).trim().replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "") || _o;
}
function Fo(n) {
  return String(n).trim().replace(/[^a-zA-Z0-9_-]/g, "").replace(/-+/g, "-");
}
function Mo(n) {
  const e = String(n ?? "").trim();
  return e ? Fi(e) : "";
}
const rc = { class: "h-dvh min-h-dvh overflow-hidden bg-gray-100 font-sans text-gray-900" }, sc = { class: "mx-auto flex w-full max-w-[1200px] flex-col gap-5" }, ic = { class: "mb-2.5 mt-0 text-[22px] font-extrabold" }, ac = { class: "rounded-[14px] border border-gray-200 bg-white p-4" }, ua = "cms-developer-mode", oc = /* @__PURE__ */ Ne({
  __name: "AdminLayoutPage",
  setup(n) {
    const e = wr(), t = Hn(), { basePath: r } = us(), s = ee([]), i = ee(!1), o = ee(!0), l = ee(!1), u = ee(!1);
    xr(async () => {
      await d(), b(), typeof window < "u" && (l.value = window.localStorage.getItem(ua) === "true", h(), window.addEventListener("resize", b)), window.addEventListener("cms-schemas-updated", p);
    }), Eo(() => {
      window.removeEventListener("cms-schemas-updated", p), typeof window < "u" && window.removeEventListener("resize", b);
    }), Rt(
      () => e.fullPath,
      () => {
        (e.path.startsWith(`${r}/content`) || e.path.startsWith(`${r}/schemas`)) && d(), b(), h();
      }
    ), Rt(l, (U) => {
      typeof window < "u" && window.localStorage.setItem(ua, U ? "true" : "false"), h();
    });
    async function d() {
      i.value = !0;
      try {
        s.value = await Bi();
      } finally {
        i.value = !1;
      }
    }
    function p() {
      d();
    }
    function b() {
      typeof window > "u" || (u.value = window.innerWidth >= 1024, u.value || (o.value = !1));
    }
    async function h() {
      l.value || (e.path.startsWith(`${r}/schemas`) || e.path.startsWith(`${r}/users`)) && await t.replace(`${r}/content`);
    }
    const w = je(() => fr.value?.email || "Sin correo"), E = je(() => {
      try {
        const U = Ce().auth.app.options.projectId;
        if (typeof U == "string" && U.trim().length > 0)
          return U;
      } catch {
      }
      return "Panel";
    }), k = je(() => {
      if (e.path.startsWith(`${r}/content`)) {
        const U = typeof e.query.schema == "string" ? e.query.schema : "", K = s.value.find((H) => H.id === U) ?? s.value[0] ?? null;
        return K ? `Contenido · ${K.title}` : "Contenido";
      }
      return e.path.startsWith(`${r}/schemas`) ? l.value ? "Esquemas" : "Contenido" : e.path.startsWith(`${r}/users`) ? l.value ? "Usuarios" : "Contenido" : "Dashboard";
    }), _ = je(() => s.value.filter((U) => U.storageType === "document")), $ = je(
      () => s.value.filter((U) => U.storageType === "dictionary")
    ), M = je(() => [
      "h-full overflow-y-auto pr-6 pb-6 pt-6 transition-[padding-left] duration-[180ms] ease-in-out",
      o.value && u.value ? "pl-[340px]" : "pl-0"
    ]);
    return (U, K) => (I(), F("main", rc, [
      Ze(Zu, {
        "panel-abierto": o.value,
        "onUpdate:panelAbierto": K[0] || (K[0] = (H) => o.value = H),
        "modo-desarrollador": l.value,
        "onUpdate:modoDesarrollador": K[1] || (K[1] = (H) => l.value = H),
        "es-pantalla-grande": u.value,
        "titulo-panel": E.value,
        "base-path": et(r),
        "cargando-schemas-contenido": i.value,
        "schemas-diccionario": $.value,
        "schemas-documento": _.value,
        "schemas-contenido": s.value,
        "email-actual": w.value
      }, null, 8, ["panel-abierto", "modo-desarrollador", "es-pantalla-grande", "titulo-panel", "base-path", "cargando-schemas-contenido", "schemas-diccionario", "schemas-documento", "schemas-contenido", "email-actual"]),
      x("section", {
        class: Pe(M.value)
      }, [
        x("div", sc, [
          K[2] || (K[2] = x("section", null, [
            x("h1", { class: "m-0 text-[30px] font-extrabold" }, "Dashboard"),
            x("p", { class: "mb-0 mt-2 text-sm text-gray-600" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          x("section", null, [
            x("h2", ic, Q(k.value), 1),
            x("div", ac, [
              Ze(et(eu))
            ])
          ])
        ])
      ], 2)
    ]));
  }
}), lc = { class: "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm" }, uc = ["checked", "disabled"], cc = /* @__PURE__ */ Ne({
  name: "BooleanFieldInput",
  __name: "BooleanFieldInput",
  props: {
    modelValue: { type: Boolean },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = e;
    return (r, s) => (I(), F("label", lc, [
      x("input", {
        checked: n.modelValue,
        type: "checkbox",
        disabled: n.disabled,
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.checked))
      }, null, 40, uc),
      s[1] || (s[1] = Xe(" Activo ", -1))
    ]));
  }
}), dc = { class: "space-y-2" }, hc = {
  key: 0,
  class: "space-y-3 rounded-md border p-3"
}, fc = { class: "block text-xs font-semibold uppercase tracking-wide" }, pc = {
  key: 0,
  class: "text-xs"
}, mc = {
  key: 0,
  class: "space-y-2"
}, gc = ["value", "disabled", "onChange"], bc = ["value", "disabled", "onInput"], yc = ["disabled", "onClick"], vc = ["disabled"], xc = {
  key: 1,
  class: "space-y-3 rounded-md border p-3"
}, wc = { class: "flex items-center justify-between" }, Ac = { class: "text-xs font-semibold uppercase tracking-wide" }, Ec = ["disabled", "onClick"], Nc = ["disabled"], Tc = {
  key: 2,
  class: "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
}, Sc = ["checked", "disabled"], Cc = ["value", "placeholder", "disabled"], kc = ["value", "disabled"], Lc = ["value"], _c = ["value", "placeholder", "disabled"], qc = ["value", "step", "placeholder", "disabled"], Ic = ["value", "placeholder", "disabled"], Oc = /* @__PURE__ */ Ne({
  name: "CmsNestedValueEditor",
  __name: "CmsNestedValueEditor",
  props: {
    schema: {},
    modelValue: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = je(
      () => Array.isArray(t.schema.mapFields) ? t.schema.mapFields : []
    ), i = je(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), o = je(() => d(t.modelValue)), l = je(() => Array.isArray(t.modelValue) ? t.modelValue : []), u = je(() => Object.entries(o.value));
    function d(T) {
      return T && typeof T == "object" && !Array.isArray(T) ? T : {};
    }
    function p(T) {
      return T.type === "array" ? [] : T.type === "map" ? {} : T.type === "boolean" ? !1 : T.type === "date" ? "" : T.type === "numeric" || T.type === "id" ? null : "";
    }
    function b(T, f) {
      r("update:modelValue", {
        ...o.value,
        [T]: f
      });
    }
    function h() {
      r("update:modelValue", [...l.value, p(i.value)]);
    }
    function w(T) {
      const f = [...l.value];
      f.splice(T, 1), r("update:modelValue", f);
    }
    function E(T, f) {
      const A = [...l.value];
      A[T] = f, r("update:modelValue", A);
    }
    function k(T) {
      r("update:modelValue", T);
    }
    function _(T) {
      r("update:modelValue", T);
    }
    function $(T) {
      if (!T.trim()) {
        r("update:modelValue", null);
        return;
      }
      const f = Number(T);
      r("update:modelValue", Number.isFinite(f) ? f : null);
    }
    function M(T) {
      if (typeof T == "number" && Number.isFinite(T))
        return String(T);
      if (typeof T == "string") {
        const f = T.trim();
        if (!f)
          return "";
        const A = Number(f);
        if (Number.isFinite(A))
          return String(A);
      }
      return "";
    }
    function U(T) {
      r("update:modelValue", y(T));
    }
    function K(T) {
      return y(T);
    }
    function H() {
      const T = o.value;
      let f = 1, A = `campo_${f}`;
      for (; A in T; )
        f += 1, A = `campo_${f}`;
      r("update:modelValue", {
        ...T,
        [A]: ""
      });
    }
    function ae(T) {
      const f = { ...o.value };
      delete f[T], r("update:modelValue", f);
    }
    function ie(T, f) {
      const A = f.trim();
      if (!A || A === T)
        return;
      const C = { ...o.value }, j = C[T];
      delete C[T], C[A] = j, r("update:modelValue", C);
    }
    function be(T, f) {
      const A = { ...o.value };
      A[T] = we(f), r("update:modelValue", A);
    }
    function Ae(T) {
      if (typeof T == "string")
        return T;
      if (T == null)
        return "";
      try {
        return JSON.stringify(T);
      } catch {
        return String(T);
      }
    }
    function we(T) {
      const f = T.trim();
      if (!f)
        return "";
      if (f.startsWith("{") && f.endsWith("}") || f.startsWith("[") && f.endsWith("]"))
        try {
          return JSON.parse(f);
        } catch {
          return T;
        }
      return T;
    }
    function y(T) {
      if (typeof T == "string") {
        const f = T.trim();
        if (!f)
          return "";
        const A = R(f);
        if (A)
          return N(A);
        const C = new Date(f);
        return Number.isNaN(C.getTime()) ? "" : N(C);
      }
      if (T instanceof Date && !Number.isNaN(T.getTime()))
        return N(T);
      if (T && typeof T == "object" && "toDate" in T && typeof T.toDate == "function") {
        const f = T.toDate();
        if (f instanceof Date && !Number.isNaN(f.getTime()))
          return N(f);
      }
      return "";
    }
    function R(T) {
      const f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(T);
      if (!f)
        return null;
      const A = Number(f[1]), C = Number(f[2]), j = Number(f[3]), V = new Date(Date.UTC(A, C - 1, j));
      return V.getUTCFullYear() !== A || V.getUTCMonth() + 1 !== C || V.getUTCDate() !== j ? null : V;
    }
    function N(T) {
      const f = String(T.getUTCFullYear()).padStart(4, "0"), A = String(T.getUTCMonth() + 1).padStart(2, "0"), C = String(T.getUTCDate()).padStart(2, "0");
      return `${f}-${A}-${C}`;
    }
    return (T, f) => {
      const A = No("CmsNestedValueEditor", !0);
      return I(), F("div", dc, [
        n.schema.type === "map" ? (I(), F("section", hc, [
          (I(!0), F(_e, null, Re(s.value, (C) => (I(), F("article", {
            key: C.key,
            class: "space-y-1 rounded-md border p-3"
          }, [
            x("label", fc, Q(C.label), 1),
            C.helpText ? (I(), F("p", pc, Q(C.helpText), 1)) : te("", !0),
            Ze(A, {
              schema: C,
              "model-value": o.value[C.key],
              disabled: n.disabled,
              "onUpdate:modelValue": (j) => b(C.key, j)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          s.value.length ? te("", !0) : (I(), F("div", mc, [
            (I(!0), F(_e, null, Re(u.value, ([C, j]) => (I(), F("article", {
              key: C,
              class: "grid gap-2 rounded-md border p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              x("input", {
                value: C,
                type: "text",
                class: "rounded-md border px-2 py-1 text-xs outline-none",
                disabled: n.disabled,
                onChange: (V) => ie(C, V.target.value)
              }, null, 40, gc),
              x("input", {
                value: Ae(j),
                type: "text",
                class: "rounded-md border px-2 py-1 text-xs outline-none",
                disabled: n.disabled,
                onInput: (V) => be(C, V.target.value)
              }, null, 40, bc),
              x("button", {
                type: "button",
                class: "rounded-md border px-2 py-1 text-xs font-semibold",
                disabled: n.disabled,
                onClick: (V) => ae(C)
              }, " Quitar ", 8, yc)
            ]))), 128)),
            x("button", {
              type: "button",
              class: "rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-60",
              disabled: n.disabled,
              onClick: H
            }, " Agregar item ", 8, vc),
            f[6] || (f[6] = x("p", { class: "text-xs" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : n.schema.type === "array" ? (I(), F("section", xc, [
          (I(!0), F(_e, null, Re(l.value, (C, j) => (I(), F("article", {
            key: j,
            class: "space-y-2 rounded-md border p-3"
          }, [
            x("div", wc, [
              x("p", Ac, "Item " + Q(j + 1), 1),
              x("button", {
                type: "button",
                class: "rounded-md border px-2 py-1 text-xs font-semibold",
                disabled: n.disabled,
                onClick: (V) => w(j)
              }, " Quitar ", 8, Ec)
            ]),
            Ze(A, {
              schema: i.value,
              "model-value": C,
              disabled: n.disabled,
              "onUpdate:modelValue": (V) => E(j, V)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          x("button", {
            type: "button",
            class: "rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-60",
            disabled: n.disabled,
            onClick: h
          }, " Agregar item ", 8, Nc)
        ])) : n.schema.type === "boolean" ? (I(), F("label", Tc, [
          x("input", {
            type: "checkbox",
            checked: !!n.modelValue,
            disabled: n.disabled,
            onChange: f[0] || (f[0] = (C) => _(C.target.checked))
          }, null, 40, Sc),
          f[7] || (f[7] = Xe(" Activo ", -1))
        ])) : n.schema.type === "textarea" || n.schema.type === "richtext" ? (I(), F("textarea", {
          key: 3,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          rows: "4",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onInput: f[1] || (f[1] = (C) => k(C.target.value))
        }, null, 40, Cc)) : n.schema.type === "select" ? (I(), F("select", {
          key: 4,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onChange: f[2] || (f[2] = (C) => k(C.target.value))
        }, [
          f[8] || (f[8] = x("option", { value: "" }, "Selecciona una opción", -1)),
          (I(!0), F(_e, null, Re(n.schema.options || [], (C) => (I(), F("option", {
            key: C,
            value: C
          }, Q(C), 9, Lc))), 128))
        ], 40, kc)) : n.schema.type === "date" ? (I(), F("input", {
          key: 5,
          value: K(n.modelValue),
          type: "date",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onInput: f[3] || (f[3] = (C) => U(C.target.value))
        }, null, 40, _c)) : n.schema.type === "numeric" || n.schema.type === "id" ? (I(), F("input", {
          key: 6,
          value: M(n.modelValue),
          type: "number",
          step: n.schema.type === "id" ? "1" : "any",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onInput: f[4] || (f[4] = (C) => $(C.target.value))
        }, null, 40, qc)) : (I(), F("input", {
          key: 7,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          type: "text",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
          onInput: f[5] || (f[5] = (C) => k(C.target.value))
        }, null, 40, Ic))
      ]);
    };
  }
}), Rc = /* @__PURE__ */ Ne({
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
    return (r, s) => (I(), Le(Oc, {
      schema: n.field,
      "model-value": n.modelValue,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["schema", "model-value", "disabled"]));
  }
}), $c = ["value", "placeholder", "disabled"], Dc = /* @__PURE__ */ Ne({
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
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, $c));
  }
}), Bc = { class: "space-y-2" }, Fc = ["value", "disabled"], Mc = ["value"], Pc = {
  key: 0,
  class: "text-xs"
}, jc = /* @__PURE__ */ Ne({
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
    return (r, s) => (I(), F("div", Bc, [
      x("select", {
        value: n.modelValue,
        disabled: n.disabled,
        class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
        onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
      }, [
        s[1] || (s[1] = x("option", { value: "" }, "Selecciona un documento", -1)),
        (I(!0), F(_e, null, Re(n.options, (i) => (I(), F("option", {
          key: i.id,
          value: i.id
        }, Q(i.label), 9, Mc))), 128))
      ], 40, Fc),
      n.hint ? (I(), F("p", Pc, Q(n.hint), 1)) : te("", !0)
    ]));
  }
}), Uc = { class: "space-y-2" }, Vc = ["disabled"], zc = {
  key: 0,
  class: "text-xs break-all"
}, Hc = ["src"], Kc = ["disabled"], Gc = /* @__PURE__ */ Ne({
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
    return (s, i) => (I(), F("div", Uc, [
      x("input", {
        type: "file",
        accept: "image/*",
        disabled: n.disabled,
        class: "block w-full text-sm disabled:opacity-60",
        onChange: r
      }, null, 40, Vc),
      n.modelValue ? (I(), F("p", zc, " URL actual: " + Q(n.modelValue), 1)) : te("", !0),
      n.modelValue ? (I(), F("img", {
        key: 1,
        src: n.modelValue,
        alt: "Vista previa",
        class: "max-h-32 rounded-md border object-cover"
      }, null, 8, Hc)) : te("", !0),
      n.modelValue ? (I(), F("button", {
        key: 2,
        type: "button",
        class: "rounded-md border px-2 py-1 text-xs font-semibold",
        disabled: n.disabled,
        onClick: i[0] || (i[0] = (o) => t("remove"))
      }, " Quitar URL ", 8, Kc)) : te("", !0)
    ]));
  }
}), Wc = ["value", "step", "min", "placeholder", "disabled"], Zc = /* @__PURE__ */ Ne({
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
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, Wc));
  }
});
var Po = typeof global == "object" && global && global.Object === Object && global, Yc = typeof self == "object" && self && self.Object === Object && self, wt = Po || Yc || Function("return this")(), Zt = wt.Symbol, jo = Object.prototype, Xc = jo.hasOwnProperty, Qc = jo.toString, sr = Zt ? Zt.toStringTag : void 0;
function Jc(n) {
  var e = Xc.call(n, sr), t = n[sr];
  try {
    n[sr] = void 0;
    var r = !0;
  } catch {
  }
  var s = Qc.call(n);
  return r && (e ? n[sr] = t : delete n[sr]), s;
}
var ed = Object.prototype, td = ed.toString;
function nd(n) {
  return td.call(n);
}
var rd = "[object Null]", sd = "[object Undefined]", ca = Zt ? Zt.toStringTag : void 0;
function Kn(n) {
  return n == null ? n === void 0 ? sd : rd : ca && ca in Object(n) ? Jc(n) : nd(n);
}
function $t(n) {
  return n != null && typeof n == "object";
}
var hn = Array.isArray;
function Xt(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
function Uo(n) {
  return n;
}
var id = "[object AsyncFunction]", ad = "[object Function]", od = "[object GeneratorFunction]", ld = "[object Proxy]";
function Mi(n) {
  if (!Xt(n))
    return !1;
  var e = Kn(n);
  return e == ad || e == od || e == id || e == ld;
}
var ti = wt["__core-js_shared__"], da = (function() {
  var n = /[^.]+$/.exec(ti && ti.keys && ti.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function ud(n) {
  return !!da && da in n;
}
var cd = Function.prototype, dd = cd.toString;
function gn(n) {
  if (n != null) {
    try {
      return dd.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var hd = /[\\^$.*+?()[\]{}|]/g, fd = /^\[object .+?Constructor\]$/, pd = Function.prototype, md = Object.prototype, gd = pd.toString, bd = md.hasOwnProperty, yd = RegExp(
  "^" + gd.call(bd).replace(hd, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function vd(n) {
  if (!Xt(n) || ud(n))
    return !1;
  var e = Mi(n) ? yd : fd;
  return e.test(gn(n));
}
function xd(n, e) {
  return n?.[e];
}
function bn(n, e) {
  var t = xd(n, e);
  return vd(t) ? t : void 0;
}
var yi = bn(wt, "WeakMap"), ha = Object.create, wd = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(e) {
    if (!Xt(e))
      return {};
    if (ha)
      return ha(e);
    n.prototype = e;
    var t = new n();
    return n.prototype = void 0, t;
  };
})();
function Ad(n, e, t) {
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
function Ed(n, e) {
  var t = -1, r = n.length;
  for (e || (e = Array(r)); ++t < r; )
    e[t] = n[t];
  return e;
}
var Nd = 800, Td = 16, Sd = Date.now;
function Cd(n) {
  var e = 0, t = 0;
  return function() {
    var r = Sd(), s = Td - (r - t);
    if (t = r, s > 0) {
      if (++e >= Nd)
        return arguments[0];
    } else
      e = 0;
    return n.apply(void 0, arguments);
  };
}
function kd(n) {
  return function() {
    return n;
  };
}
var ts = (function() {
  try {
    var n = bn(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
})(), Ld = ts ? function(n, e) {
  return ts(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: kd(e),
    writable: !0
  });
} : Uo, _d = Cd(Ld);
function qd(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r && e(n[t], t, n) !== !1; )
    ;
  return n;
}
var Id = 9007199254740991, Od = /^(?:0|[1-9]\d*)$/;
function Vo(n, e) {
  var t = typeof n;
  return e = e ?? Id, !!e && (t == "number" || t != "symbol" && Od.test(n)) && n > -1 && n % 1 == 0 && n < e;
}
function Pi(n, e, t) {
  e == "__proto__" && ts ? ts(n, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : n[e] = t;
}
function Ar(n, e) {
  return n === e || n !== n && e !== e;
}
var Rd = Object.prototype, $d = Rd.hasOwnProperty;
function zo(n, e, t) {
  var r = n[e];
  (!($d.call(n, e) && Ar(r, t)) || t === void 0 && !(e in n)) && Pi(n, e, t);
}
function Dd(n, e, t, r) {
  var s = !t;
  t || (t = {});
  for (var i = -1, o = e.length; ++i < o; ) {
    var l = e[i], u = void 0;
    u === void 0 && (u = n[l]), s ? Pi(t, l, u) : zo(t, l, u);
  }
  return t;
}
var fa = Math.max;
function Bd(n, e, t) {
  return e = fa(e === void 0 ? n.length - 1 : e, 0), function() {
    for (var r = arguments, s = -1, i = fa(r.length - e, 0), o = Array(i); ++s < i; )
      o[s] = r[e + s];
    s = -1;
    for (var l = Array(e + 1); ++s < e; )
      l[s] = r[s];
    return l[e] = t(o), Ad(n, this, l);
  };
}
function Fd(n, e) {
  return _d(Bd(n, e, Uo), n + "");
}
var Md = 9007199254740991;
function Ho(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Md;
}
function cs(n) {
  return n != null && Ho(n.length) && !Mi(n);
}
function Pd(n, e, t) {
  if (!Xt(t))
    return !1;
  var r = typeof e;
  return (r == "number" ? cs(t) && Vo(e, t.length) : r == "string" && e in t) ? Ar(t[e], n) : !1;
}
function jd(n) {
  return Fd(function(e, t) {
    var r = -1, s = t.length, i = s > 1 ? t[s - 1] : void 0, o = s > 2 ? t[2] : void 0;
    for (i = n.length > 3 && typeof i == "function" ? (s--, i) : void 0, o && Pd(t[0], t[1], o) && (i = s < 3 ? void 0 : i, s = 1), e = Object(e); ++r < s; ) {
      var l = t[r];
      l && n(e, l, r, i);
    }
    return e;
  });
}
var Ud = Object.prototype;
function ji(n) {
  var e = n && n.constructor, t = typeof e == "function" && e.prototype || Ud;
  return n === t;
}
function Vd(n, e) {
  for (var t = -1, r = Array(n); ++t < n; )
    r[t] = e(t);
  return r;
}
var zd = "[object Arguments]";
function pa(n) {
  return $t(n) && Kn(n) == zd;
}
var Ko = Object.prototype, Hd = Ko.hasOwnProperty, Kd = Ko.propertyIsEnumerable, vi = pa(/* @__PURE__ */ (function() {
  return arguments;
})()) ? pa : function(n) {
  return $t(n) && Hd.call(n, "callee") && !Kd.call(n, "callee");
};
function Gd() {
  return !1;
}
var Go = typeof exports == "object" && exports && !exports.nodeType && exports, ma = Go && typeof module == "object" && module && !module.nodeType && module, Wd = ma && ma.exports === Go, ga = Wd ? wt.Buffer : void 0, Zd = ga ? ga.isBuffer : void 0, pr = Zd || Gd, Yd = "[object Arguments]", Xd = "[object Array]", Qd = "[object Boolean]", Jd = "[object Date]", eh = "[object Error]", th = "[object Function]", nh = "[object Map]", rh = "[object Number]", sh = "[object Object]", ih = "[object RegExp]", ah = "[object Set]", oh = "[object String]", lh = "[object WeakMap]", uh = "[object ArrayBuffer]", ch = "[object DataView]", dh = "[object Float32Array]", hh = "[object Float64Array]", fh = "[object Int8Array]", ph = "[object Int16Array]", mh = "[object Int32Array]", gh = "[object Uint8Array]", bh = "[object Uint8ClampedArray]", yh = "[object Uint16Array]", vh = "[object Uint32Array]", xe = {};
xe[dh] = xe[hh] = xe[fh] = xe[ph] = xe[mh] = xe[gh] = xe[bh] = xe[yh] = xe[vh] = !0;
xe[Yd] = xe[Xd] = xe[uh] = xe[Qd] = xe[ch] = xe[Jd] = xe[eh] = xe[th] = xe[nh] = xe[rh] = xe[sh] = xe[ih] = xe[ah] = xe[oh] = xe[lh] = !1;
function xh(n) {
  return $t(n) && Ho(n.length) && !!xe[Kn(n)];
}
function Ui(n) {
  return function(e) {
    return n(e);
  };
}
var Wo = typeof exports == "object" && exports && !exports.nodeType && exports, dr = Wo && typeof module == "object" && module && !module.nodeType && module, wh = dr && dr.exports === Wo, ni = wh && Po.process, Vn = (function() {
  try {
    var n = dr && dr.require && dr.require("util").types;
    return n || ni && ni.binding && ni.binding("util");
  } catch {
  }
})(), ba = Vn && Vn.isTypedArray, Vi = ba ? Ui(ba) : xh, Ah = Object.prototype, Eh = Ah.hasOwnProperty;
function Zo(n, e) {
  var t = hn(n), r = !t && vi(n), s = !t && !r && pr(n), i = !t && !r && !s && Vi(n), o = t || r || s || i, l = o ? Vd(n.length, String) : [], u = l.length;
  for (var d in n)
    (e || Eh.call(n, d)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Vo(d, u))) && l.push(d);
  return l;
}
function Yo(n, e) {
  return function(t) {
    return n(e(t));
  };
}
var Nh = Yo(Object.keys, Object), Th = Object.prototype, Sh = Th.hasOwnProperty;
function Ch(n) {
  if (!ji(n))
    return Nh(n);
  var e = [];
  for (var t in Object(n))
    Sh.call(n, t) && t != "constructor" && e.push(t);
  return e;
}
function kh(n) {
  return cs(n) ? Zo(n) : Ch(n);
}
function Lh(n) {
  var e = [];
  if (n != null)
    for (var t in Object(n))
      e.push(t);
  return e;
}
var _h = Object.prototype, qh = _h.hasOwnProperty;
function Ih(n) {
  if (!Xt(n))
    return Lh(n);
  var e = ji(n), t = [];
  for (var r in n)
    r == "constructor" && (e || !qh.call(n, r)) || t.push(r);
  return t;
}
function Xo(n) {
  return cs(n) ? Zo(n, !0) : Ih(n);
}
var mr = bn(Object, "create");
function Oh() {
  this.__data__ = mr ? mr(null) : {}, this.size = 0;
}
function Rh(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var $h = "__lodash_hash_undefined__", Dh = Object.prototype, Bh = Dh.hasOwnProperty;
function Fh(n) {
  var e = this.__data__;
  if (mr) {
    var t = e[n];
    return t === $h ? void 0 : t;
  }
  return Bh.call(e, n) ? e[n] : void 0;
}
var Mh = Object.prototype, Ph = Mh.hasOwnProperty;
function jh(n) {
  var e = this.__data__;
  return mr ? e[n] !== void 0 : Ph.call(e, n);
}
var Uh = "__lodash_hash_undefined__";
function Vh(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = mr && e === void 0 ? Uh : e, this;
}
function fn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
fn.prototype.clear = Oh;
fn.prototype.delete = Rh;
fn.prototype.get = Fh;
fn.prototype.has = jh;
fn.prototype.set = Vh;
function zh() {
  this.__data__ = [], this.size = 0;
}
function ds(n, e) {
  for (var t = n.length; t--; )
    if (Ar(n[t][0], e))
      return t;
  return -1;
}
var Hh = Array.prototype, Kh = Hh.splice;
function Gh(n) {
  var e = this.__data__, t = ds(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : Kh.call(e, t, 1), --this.size, !0;
}
function Wh(n) {
  var e = this.__data__, t = ds(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function Zh(n) {
  return ds(this.__data__, n) > -1;
}
function Yh(n, e) {
  var t = this.__data__, r = ds(t, n);
  return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
}
function Bt(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
Bt.prototype.clear = zh;
Bt.prototype.delete = Gh;
Bt.prototype.get = Wh;
Bt.prototype.has = Zh;
Bt.prototype.set = Yh;
var gr = bn(wt, "Map");
function Xh() {
  this.size = 0, this.__data__ = {
    hash: new fn(),
    map: new (gr || Bt)(),
    string: new fn()
  };
}
function Qh(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function hs(n, e) {
  var t = n.__data__;
  return Qh(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Jh(n) {
  var e = hs(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function ef(n) {
  return hs(this, n).get(n);
}
function tf(n) {
  return hs(this, n).has(n);
}
function nf(n, e) {
  var t = hs(this, n), r = t.size;
  return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
}
function yn(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
yn.prototype.clear = Xh;
yn.prototype.delete = Jh;
yn.prototype.get = ef;
yn.prototype.has = tf;
yn.prototype.set = nf;
function rf(n, e) {
  for (var t = -1, r = e.length, s = n.length; ++t < r; )
    n[s + t] = e[t];
  return n;
}
var Qo = Yo(Object.getPrototypeOf, Object), sf = "[object Object]", af = Function.prototype, of = Object.prototype, Jo = af.toString, lf = of.hasOwnProperty, uf = Jo.call(Object);
function cf(n) {
  if (!$t(n) || Kn(n) != sf)
    return !1;
  var e = Qo(n);
  if (e === null)
    return !0;
  var t = lf.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && Jo.call(t) == uf;
}
function df() {
  this.__data__ = new Bt(), this.size = 0;
}
function hf(n) {
  var e = this.__data__, t = e.delete(n);
  return this.size = e.size, t;
}
function ff(n) {
  return this.__data__.get(n);
}
function pf(n) {
  return this.__data__.has(n);
}
var mf = 200;
function gf(n, e) {
  var t = this.__data__;
  if (t instanceof Bt) {
    var r = t.__data__;
    if (!gr || r.length < mf - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new yn(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function vt(n) {
  var e = this.__data__ = new Bt(n);
  this.size = e.size;
}
vt.prototype.clear = df;
vt.prototype.delete = hf;
vt.prototype.get = ff;
vt.prototype.has = pf;
vt.prototype.set = gf;
var el = typeof exports == "object" && exports && !exports.nodeType && exports, ya = el && typeof module == "object" && module && !module.nodeType && module, bf = ya && ya.exports === el, va = bf ? wt.Buffer : void 0, xa = va ? va.allocUnsafe : void 0;
function tl(n, e) {
  if (e)
    return n.slice();
  var t = n.length, r = xa ? xa(t) : new n.constructor(t);
  return n.copy(r), r;
}
function yf(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, s = 0, i = []; ++t < r; ) {
    var o = n[t];
    e(o, t, n) && (i[s++] = o);
  }
  return i;
}
function vf() {
  return [];
}
var xf = Object.prototype, wf = xf.propertyIsEnumerable, wa = Object.getOwnPropertySymbols, Af = wa ? function(n) {
  return n == null ? [] : (n = Object(n), yf(wa(n), function(e) {
    return wf.call(n, e);
  }));
} : vf;
function Ef(n, e, t) {
  var r = e(n);
  return hn(n) ? r : rf(r, t(n));
}
function xi(n) {
  return Ef(n, kh, Af);
}
var wi = bn(wt, "DataView"), Ai = bn(wt, "Promise"), Ei = bn(wt, "Set"), Aa = "[object Map]", Nf = "[object Object]", Ea = "[object Promise]", Na = "[object Set]", Ta = "[object WeakMap]", Sa = "[object DataView]", Tf = gn(wi), Sf = gn(gr), Cf = gn(Ai), kf = gn(Ei), Lf = gn(yi), ot = Kn;
(wi && ot(new wi(new ArrayBuffer(1))) != Sa || gr && ot(new gr()) != Aa || Ai && ot(Ai.resolve()) != Ea || Ei && ot(new Ei()) != Na || yi && ot(new yi()) != Ta) && (ot = function(n) {
  var e = Kn(n), t = e == Nf ? n.constructor : void 0, r = t ? gn(t) : "";
  if (r)
    switch (r) {
      case Tf:
        return Sa;
      case Sf:
        return Aa;
      case Cf:
        return Ea;
      case kf:
        return Na;
      case Lf:
        return Ta;
    }
  return e;
});
var _f = Object.prototype, qf = _f.hasOwnProperty;
function If(n) {
  var e = n.length, t = new n.constructor(e);
  return e && typeof n[0] == "string" && qf.call(n, "index") && (t.index = n.index, t.input = n.input), t;
}
var ns = wt.Uint8Array;
function zi(n) {
  var e = new n.constructor(n.byteLength);
  return new ns(e).set(new ns(n)), e;
}
function Of(n, e) {
  var t = zi(n.buffer);
  return new n.constructor(t, n.byteOffset, n.byteLength);
}
var Rf = /\w*$/;
function $f(n) {
  var e = new n.constructor(n.source, Rf.exec(n));
  return e.lastIndex = n.lastIndex, e;
}
var Ca = Zt ? Zt.prototype : void 0, ka = Ca ? Ca.valueOf : void 0;
function Df(n) {
  return ka ? Object(ka.call(n)) : {};
}
function nl(n, e) {
  var t = e ? zi(n.buffer) : n.buffer;
  return new n.constructor(t, n.byteOffset, n.length);
}
var Bf = "[object Boolean]", Ff = "[object Date]", Mf = "[object Map]", Pf = "[object Number]", jf = "[object RegExp]", Uf = "[object Set]", Vf = "[object String]", zf = "[object Symbol]", Hf = "[object ArrayBuffer]", Kf = "[object DataView]", Gf = "[object Float32Array]", Wf = "[object Float64Array]", Zf = "[object Int8Array]", Yf = "[object Int16Array]", Xf = "[object Int32Array]", Qf = "[object Uint8Array]", Jf = "[object Uint8ClampedArray]", ep = "[object Uint16Array]", tp = "[object Uint32Array]";
function np(n, e, t) {
  var r = n.constructor;
  switch (e) {
    case Hf:
      return zi(n);
    case Bf:
    case Ff:
      return new r(+n);
    case Kf:
      return Of(n);
    case Gf:
    case Wf:
    case Zf:
    case Yf:
    case Xf:
    case Qf:
    case Jf:
    case ep:
    case tp:
      return nl(n, t);
    case Mf:
      return new r();
    case Pf:
    case Vf:
      return new r(n);
    case jf:
      return $f(n);
    case Uf:
      return new r();
    case zf:
      return Df(n);
  }
}
function rl(n) {
  return typeof n.constructor == "function" && !ji(n) ? wd(Qo(n)) : {};
}
var rp = "[object Map]";
function sp(n) {
  return $t(n) && ot(n) == rp;
}
var La = Vn && Vn.isMap, ip = La ? Ui(La) : sp, ap = "[object Set]";
function op(n) {
  return $t(n) && ot(n) == ap;
}
var _a = Vn && Vn.isSet, lp = _a ? Ui(_a) : op, up = 1, sl = "[object Arguments]", cp = "[object Array]", dp = "[object Boolean]", hp = "[object Date]", fp = "[object Error]", il = "[object Function]", pp = "[object GeneratorFunction]", mp = "[object Map]", gp = "[object Number]", al = "[object Object]", bp = "[object RegExp]", yp = "[object Set]", vp = "[object String]", xp = "[object Symbol]", wp = "[object WeakMap]", Ap = "[object ArrayBuffer]", Ep = "[object DataView]", Np = "[object Float32Array]", Tp = "[object Float64Array]", Sp = "[object Int8Array]", Cp = "[object Int16Array]", kp = "[object Int32Array]", Lp = "[object Uint8Array]", _p = "[object Uint8ClampedArray]", qp = "[object Uint16Array]", Ip = "[object Uint32Array]", ve = {};
ve[sl] = ve[cp] = ve[Ap] = ve[Ep] = ve[dp] = ve[hp] = ve[Np] = ve[Tp] = ve[Sp] = ve[Cp] = ve[kp] = ve[mp] = ve[gp] = ve[al] = ve[bp] = ve[yp] = ve[vp] = ve[xp] = ve[Lp] = ve[_p] = ve[qp] = ve[Ip] = !0;
ve[fp] = ve[il] = ve[wp] = !1;
function Qr(n, e, t, r, s, i) {
  var o, l = e & up;
  if (o !== void 0)
    return o;
  if (!Xt(n))
    return n;
  var u = hn(n);
  if (u)
    o = If(n);
  else {
    var d = ot(n), p = d == il || d == pp;
    if (pr(n))
      return tl(n, l);
    if (d == al || d == sl || p && !s)
      o = p ? {} : rl(n);
    else {
      if (!ve[d])
        return s ? n : {};
      o = np(n, d, l);
    }
  }
  i || (i = new vt());
  var b = i.get(n);
  if (b)
    return b;
  i.set(n, o), lp(n) ? n.forEach(function(E) {
    o.add(Qr(E, e, t, E, n, i));
  }) : ip(n) && n.forEach(function(E, k) {
    o.set(k, Qr(E, e, t, k, n, i));
  });
  var h = xi, w = u ? void 0 : h(n);
  return qd(w || n, function(E, k) {
    w && (k = E, E = n[k]), zo(o, k, Qr(E, e, t, k, n, i));
  }), o;
}
var Op = 1, Rp = 4;
function Fn(n) {
  return Qr(n, Op | Rp);
}
var $p = "__lodash_hash_undefined__";
function Dp(n) {
  return this.__data__.set(n, $p), this;
}
function Bp(n) {
  return this.__data__.has(n);
}
function rs(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new yn(); ++e < t; )
    this.add(n[e]);
}
rs.prototype.add = rs.prototype.push = Dp;
rs.prototype.has = Bp;
function Fp(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (e(n[t], t, n))
      return !0;
  return !1;
}
function Mp(n, e) {
  return n.has(e);
}
var Pp = 1, jp = 2;
function ol(n, e, t, r, s, i) {
  var o = t & Pp, l = n.length, u = e.length;
  if (l != u && !(o && u > l))
    return !1;
  var d = i.get(n), p = i.get(e);
  if (d && p)
    return d == e && p == n;
  var b = -1, h = !0, w = t & jp ? new rs() : void 0;
  for (i.set(n, e), i.set(e, n); ++b < l; ) {
    var E = n[b], k = e[b];
    if (r)
      var _ = o ? r(k, E, b, e, n, i) : r(E, k, b, n, e, i);
    if (_ !== void 0) {
      if (_)
        continue;
      h = !1;
      break;
    }
    if (w) {
      if (!Fp(e, function($, M) {
        if (!Mp(w, M) && (E === $ || s(E, $, t, r, i)))
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
function Up(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r, s) {
    t[++e] = [s, r];
  }), t;
}
function Vp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var zp = 1, Hp = 2, Kp = "[object Boolean]", Gp = "[object Date]", Wp = "[object Error]", Zp = "[object Map]", Yp = "[object Number]", Xp = "[object RegExp]", Qp = "[object Set]", Jp = "[object String]", em = "[object Symbol]", tm = "[object ArrayBuffer]", nm = "[object DataView]", qa = Zt ? Zt.prototype : void 0, ri = qa ? qa.valueOf : void 0;
function rm(n, e, t, r, s, i, o) {
  switch (t) {
    case nm:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case tm:
      return !(n.byteLength != e.byteLength || !i(new ns(n), new ns(e)));
    case Kp:
    case Gp:
    case Yp:
      return Ar(+n, +e);
    case Wp:
      return n.name == e.name && n.message == e.message;
    case Xp:
    case Jp:
      return n == e + "";
    case Zp:
      var l = Up;
    case Qp:
      var u = r & zp;
      if (l || (l = Vp), n.size != e.size && !u)
        return !1;
      var d = o.get(n);
      if (d)
        return d == e;
      r |= Hp, o.set(n, e);
      var p = ol(l(n), l(e), r, s, i, o);
      return o.delete(n), p;
    case em:
      if (ri)
        return ri.call(n) == ri.call(e);
  }
  return !1;
}
var sm = 1, im = Object.prototype, am = im.hasOwnProperty;
function om(n, e, t, r, s, i) {
  var o = t & sm, l = xi(n), u = l.length, d = xi(e), p = d.length;
  if (u != p && !o)
    return !1;
  for (var b = u; b--; ) {
    var h = l[b];
    if (!(o ? h in e : am.call(e, h)))
      return !1;
  }
  var w = i.get(n), E = i.get(e);
  if (w && E)
    return w == e && E == n;
  var k = !0;
  i.set(n, e), i.set(e, n);
  for (var _ = o; ++b < u; ) {
    h = l[b];
    var $ = n[h], M = e[h];
    if (r)
      var U = o ? r(M, $, h, e, n, i) : r($, M, h, n, e, i);
    if (!(U === void 0 ? $ === M || s($, M, t, r, i) : U)) {
      k = !1;
      break;
    }
    _ || (_ = h == "constructor");
  }
  if (k && !_) {
    var K = n.constructor, H = e.constructor;
    K != H && "constructor" in n && "constructor" in e && !(typeof K == "function" && K instanceof K && typeof H == "function" && H instanceof H) && (k = !1);
  }
  return i.delete(n), i.delete(e), k;
}
var lm = 1, Ia = "[object Arguments]", Oa = "[object Array]", Pr = "[object Object]", um = Object.prototype, Ra = um.hasOwnProperty;
function cm(n, e, t, r, s, i) {
  var o = hn(n), l = hn(e), u = o ? Oa : ot(n), d = l ? Oa : ot(e);
  u = u == Ia ? Pr : u, d = d == Ia ? Pr : d;
  var p = u == Pr, b = d == Pr, h = u == d;
  if (h && pr(n)) {
    if (!pr(e))
      return !1;
    o = !0, p = !1;
  }
  if (h && !p)
    return i || (i = new vt()), o || Vi(n) ? ol(n, e, t, r, s, i) : rm(n, e, u, t, r, s, i);
  if (!(t & lm)) {
    var w = p && Ra.call(n, "__wrapped__"), E = b && Ra.call(e, "__wrapped__");
    if (w || E) {
      var k = w ? n.value() : n, _ = E ? e.value() : e;
      return i || (i = new vt()), s(k, _, t, r, i);
    }
  }
  return h ? (i || (i = new vt()), om(n, e, t, r, s, i)) : !1;
}
function ll(n, e, t, r, s) {
  return n === e ? !0 : n == null || e == null || !$t(n) && !$t(e) ? n !== n && e !== e : cm(n, e, t, r, ll, s);
}
function dm(n) {
  return function(e, t, r) {
    for (var s = -1, i = Object(e), o = r(e), l = o.length; l--; ) {
      var u = o[++s];
      if (t(i[u], u, i) === !1)
        break;
    }
    return e;
  };
}
var hm = dm();
function Ni(n, e, t) {
  (t !== void 0 && !Ar(n[e], t) || t === void 0 && !(e in n)) && Pi(n, e, t);
}
function fm(n) {
  return $t(n) && cs(n);
}
function Ti(n, e) {
  if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
    return n[e];
}
function pm(n) {
  return Dd(n, Xo(n));
}
function mm(n, e, t, r, s, i, o) {
  var l = Ti(n, t), u = Ti(e, t), d = o.get(u);
  if (d) {
    Ni(n, t, d);
    return;
  }
  var p = i ? i(l, u, t + "", n, e, o) : void 0, b = p === void 0;
  if (b) {
    var h = hn(u), w = !h && pr(u), E = !h && !w && Vi(u);
    p = u, h || w || E ? hn(l) ? p = l : fm(l) ? p = Ed(l) : w ? (b = !1, p = tl(u, !0)) : E ? (b = !1, p = nl(u, !0)) : p = [] : cf(u) || vi(u) ? (p = l, vi(l) ? p = pm(l) : (!Xt(l) || Mi(l)) && (p = rl(u))) : b = !1;
  }
  b && (o.set(u, p), s(p, u, r, i, o), o.delete(u)), Ni(n, t, p);
}
function ul(n, e, t, r, s) {
  n !== e && hm(e, function(i, o) {
    if (s || (s = new vt()), Xt(i))
      mm(n, e, o, t, ul, r, s);
    else {
      var l = r ? r(Ti(n, o), i, o + "", n, e, s) : void 0;
      l === void 0 && (l = i), Ni(n, o, l);
    }
  }, Xo);
}
function Hi(n, e) {
  return ll(n, e);
}
var Gt = jd(function(n, e, t) {
  ul(n, e, t);
}), Z = /* @__PURE__ */ ((n) => (n[n.TYPE = 3] = "TYPE", n[n.LEVEL = 12] = "LEVEL", n[n.ATTRIBUTE = 13] = "ATTRIBUTE", n[n.BLOT = 14] = "BLOT", n[n.INLINE = 7] = "INLINE", n[n.BLOCK = 11] = "BLOCK", n[n.BLOCK_BLOT = 10] = "BLOCK_BLOT", n[n.INLINE_BLOT = 6] = "INLINE_BLOT", n[n.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", n[n.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", n[n.ANY = 15] = "ANY", n))(Z || {});
class xt {
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
class Mn extends Error {
  constructor(e) {
    e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
  }
}
const cl = class Si {
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
      throw new Mn(`Unable to create ${t} blot`);
    const i = s, o = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : i.create(r)
    ), l = new i(e, o, r);
    return Si.blots.set(l.domNode, l), l;
  }
  find(e, t = !1) {
    return Si.find(e, t);
  }
  query(e, t = Z.ANY) {
    let r;
    return typeof e == "string" ? r = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? r = this.types.text : typeof e == "number" ? e & Z.LEVEL & Z.BLOCK ? r = this.types.block : e & Z.LEVEL & Z.INLINE && (r = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((s) => (r = this.classes[s], !!r)), r = r || this.tags[e.tagName]), r == null ? null : "scope" in r && t & Z.LEVEL & r.scope && t & Z.TYPE & r.scope ? r : null;
  }
  register(...e) {
    return e.map((t) => {
      const r = "blotName" in t, s = "attrName" in t;
      if (!r && !s)
        throw new Mn("Invalid definition");
      if (r && t.blotName === "abstract")
        throw new Mn("Cannot register abstract class");
      const i = r ? t.blotName : s ? t.attrName : void 0;
      return this.types[i] = t, s ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : r && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((o) => o.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((o) => {
        (this.tags[o] == null || t.className == null) && (this.tags[o] = t);
      }))), t;
    });
  }
};
cl.blots = /* @__PURE__ */ new WeakMap();
let zn = cl;
function $a(n, e) {
  return (n.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class gm extends xt {
  static keys(e) {
    return (e.getAttribute("class") || "").split(/\s+/).map((t) => t.split("-").slice(0, -1).join("-"));
  }
  add(e, t) {
    return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
  }
  remove(e) {
    $a(e, this.keyName).forEach((t) => {
      e.classList.remove(t);
    }), e.classList.length === 0 && e.removeAttribute("class");
  }
  value(e) {
    const t = ($a(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(e, t) ? t : "";
  }
}
const ht = gm;
function si(n) {
  const e = n.split("-"), t = e.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  return e[0] + t;
}
class bm extends xt {
  static keys(e) {
    return (e.getAttribute("style") || "").split(";").map((t) => t.split(":")[0].trim());
  }
  add(e, t) {
    return this.canAdd(e, t) ? (e.style[si(this.keyName)] = t, !0) : !1;
  }
  remove(e) {
    e.style[si(this.keyName)] = "", e.getAttribute("style") || e.removeAttribute("style");
  }
  value(e) {
    const t = e.style[si(this.keyName)];
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
    const e = zn.find(this.domNode);
    if (e == null)
      return;
    const t = xt.keys(this.domNode), r = ht.keys(this.domNode), s = Qt.keys(this.domNode);
    t.concat(r).concat(s).forEach((i) => {
      const o = e.scroll.query(i, Z.ATTRIBUTE);
      o instanceof xt && (this.attributes[o.attrName] = o);
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
const fs = ym, dl = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, zn.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new Mn("Blot definition missing tagName");
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
    this.parent != null && this.parent.removeChild(this), zn.blots.delete(this.domNode);
  }
  deleteAt(e, t) {
    this.isolate(e, t).remove();
  }
  formatAt(e, t, r, s) {
    const i = this.isolate(e, t);
    if (this.scroll.query(r, Z.BLOT) != null && s)
      i.wrap(r, s);
    else if (this.scroll.query(r, Z.ATTRIBUTE) != null) {
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
      throw new Mn(`Cannot wrap ${e}`);
    return r.appendChild(this), r;
  }
};
dl.blotName = "abstract";
let hl = dl;
const fl = class extends hl {
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
fl.scope = Z.INLINE_BLOT;
let vm = fl;
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
function Da(n, e) {
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
const pl = class Vt extends hl {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = e, Vt.uiClass && this.uiNode.classList.add(Vt.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new xm(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = Da(e, this.scroll);
        this.insertBefore(t, this.children.head || void 0);
      } catch (t) {
        if (t instanceof Mn)
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
    return e.blotName == null && e(r) || e.blotName != null && r instanceof e ? [r, s] : r instanceof Vt ? r.descendant(e, s) : [null, -1];
  }
  descendants(e, t = 0, r = Number.MAX_VALUE) {
    let s = [], i = r;
    return this.children.forEachAt(
      t,
      r,
      (o, l, u) => {
        (e.blotName == null && e(o) || e.blotName != null && o instanceof e) && s.push(o), o instanceof Vt && (s = s.concat(
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
      ) || (t.statics.scope === Z.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof Vt ? t.unwrap() : t.remove());
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
    return r instanceof Vt ? i.concat(r.path(s, t)) : (r != null && i.push([r, s]), i);
  }
  removeChild(e) {
    this.children.remove(e);
  }
  replaceWith(e, t) {
    const r = typeof e == "string" ? this.scroll.create(e, t) : e;
    return r instanceof Vt && this.moveChildren(r), super.replaceWith(r);
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
      const l = Da(i, this.scroll);
      (l.next !== o || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, o || void 0));
    }), this.enforceAllowedChildren();
  }
};
pl.uiClass = "";
let wm = pl;
const ct = wm;
function Am(n, e) {
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
    super(e, t), this.attributes = new fs(this.domNode);
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
      r instanceof xt ? this.attributes.attribute(r, t) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t);
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
    r instanceof In && r.prev === this && Am(t, r.formats()) && (r.moveChildren(this), r.remove());
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
let Em = qn;
const Ki = Em, On = class Ci extends ct {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(Ci.blotName);
    if (!(r != null && e.tagName === r.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new fs(this.domNode);
  }
  format(e, t) {
    const r = this.scroll.query(e, Z.BLOCK);
    r != null && (r instanceof xt ? this.attributes.attribute(r, t) : e === this.statics.blotName && !t ? this.replaceWith(Ci.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
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
let Nm = On;
const br = Nm, ki = class extends ct {
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
ki.blotName = "container", ki.scope = Z.BLOCK_BLOT;
let Tm = ki;
const ps = Tm;
class Sm extends Ue {
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
const Qe = Sm, Cm = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, km = 100, Rn = class extends ct {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((r) => {
      this.update(r);
    }), this.observer.observe(this.domNode, Cm), this.attach();
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
    }, o = (u) => {
      r.has(u.domNode) && (u instanceof ct && u.children.forEach(o), r.delete(u.domNode), u.optimize(t));
    };
    let l = e;
    for (let u = 0; l.length > 0; u += 1) {
      if (u >= km)
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
Rn.blotName = "scroll", Rn.defaultChild = br, Rn.allowedChildren = [br, ps], Rn.scope = Z.BLOCK_BLOT, Rn.tagName = "DIV";
let Lm = Rn;
const Gi = Lm, Li = class ml extends Ue {
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
    super.optimize(e), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof ml && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Li.blotName = "text", Li.scope = Z.INLINE_BLOT;
let _m = Li;
const ss = _m, qm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: xt,
  AttributorStore: fs,
  BlockBlot: br,
  ClassAttributor: ht,
  ContainerBlot: ps,
  EmbedBlot: Qe,
  InlineBlot: Ki,
  LeafBlot: Ue,
  ParentBlot: ct,
  Registry: zn,
  Scope: Z,
  ScrollBlot: Gi,
  StyleAttributor: Qt,
  TextBlot: ss
}, Symbol.toStringTag, { value: "Module" }));
var Ht = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gl(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var jr = { exports: {} }, ii, Ba;
function Im() {
  if (Ba) return ii;
  Ba = 1;
  var n = -1, e = 1, t = 0;
  function r(y, R, N, T, f) {
    if (y === R)
      return y ? [[t, y]] : [];
    if (N != null) {
      var A = Ae(y, R, N);
      if (A)
        return A;
    }
    var C = l(y, R), j = y.substring(0, C);
    y = y.substring(C), R = R.substring(C), C = d(y, R);
    var V = y.substring(y.length - C);
    y = y.substring(0, y.length - C), R = R.substring(0, R.length - C);
    var L = s(y, R);
    return j && L.unshift([t, j]), V && L.push([t, V]), M(L, f), T && b(L), L;
  }
  function s(y, R) {
    var N;
    if (!y)
      return [[e, R]];
    if (!R)
      return [[n, y]];
    var T = y.length > R.length ? y : R, f = y.length > R.length ? R : y, A = T.indexOf(f);
    if (A !== -1)
      return N = [
        [e, T.substring(0, A)],
        [t, f],
        [e, T.substring(A + f.length)]
      ], y.length > R.length && (N[0][0] = N[2][0] = n), N;
    if (f.length === 1)
      return [
        [n, y],
        [e, R]
      ];
    var C = p(y, R);
    if (C) {
      var j = C[0], V = C[1], L = C[2], S = C[3], P = C[4], z = r(j, L), J = r(V, S);
      return z.concat([[t, P]], J);
    }
    return i(y, R);
  }
  function i(y, R) {
    for (var N = y.length, T = R.length, f = Math.ceil((N + T) / 2), A = f, C = 2 * f, j = new Array(C), V = new Array(C), L = 0; L < C; L++)
      j[L] = -1, V[L] = -1;
    j[A + 1] = 0, V[A + 1] = 0;
    for (var S = N - T, P = S % 2 !== 0, z = 0, J = 0, Y = 0, ge = 0, ye = 0; ye < f; ye++) {
      for (var re = -ye + z; re <= ye - J; re += 2) {
        var oe = A + re, le;
        re === -ye || re !== ye && j[oe - 1] < j[oe + 1] ? le = j[oe + 1] : le = j[oe - 1] + 1;
        for (var ce = le - re; le < N && ce < T && y.charAt(le) === R.charAt(ce); )
          le++, ce++;
        if (j[oe] = le, le > N)
          J += 2;
        else if (ce > T)
          z += 2;
        else if (P) {
          var de = A + S - re;
          if (de >= 0 && de < C && V[de] !== -1) {
            var pe = N - V[de];
            if (le >= pe)
              return o(y, R, le, ce);
          }
        }
      }
      for (var Ee = -ye + Y; Ee <= ye - ge; Ee += 2) {
        var de = A + Ee, pe;
        Ee === -ye || Ee !== ye && V[de - 1] < V[de + 1] ? pe = V[de + 1] : pe = V[de - 1] + 1;
        for (var ke = pe - Ee; pe < N && ke < T && y.charAt(N - pe - 1) === R.charAt(T - ke - 1); )
          pe++, ke++;
        if (V[de] = pe, pe > N)
          ge += 2;
        else if (ke > T)
          Y += 2;
        else if (!P) {
          var oe = A + S - Ee;
          if (oe >= 0 && oe < C && j[oe] !== -1) {
            var le = j[oe], ce = A + le - oe;
            if (pe = N - pe, le >= pe)
              return o(y, R, le, ce);
          }
        }
      }
    }
    return [
      [n, y],
      [e, R]
    ];
  }
  function o(y, R, N, T) {
    var f = y.substring(0, N), A = R.substring(0, T), C = y.substring(N), j = R.substring(T), V = r(f, A), L = r(C, j);
    return V.concat(L);
  }
  function l(y, R) {
    if (!y || !R || y.charAt(0) !== R.charAt(0))
      return 0;
    for (var N = 0, T = Math.min(y.length, R.length), f = T, A = 0; N < f; )
      y.substring(A, f) == R.substring(A, f) ? (N = f, A = N) : T = f, f = Math.floor((T - N) / 2 + N);
    return U(y.charCodeAt(f - 1)) && f--, f;
  }
  function u(y, R) {
    var N = y.length, T = R.length;
    if (N == 0 || T == 0)
      return 0;
    N > T ? y = y.substring(N - T) : N < T && (R = R.substring(0, N));
    var f = Math.min(N, T);
    if (y == R)
      return f;
    for (var A = 0, C = 1; ; ) {
      var j = y.substring(f - C), V = R.indexOf(j);
      if (V == -1)
        return A;
      C += V, (V == 0 || y.substring(f - C) == R.substring(0, C)) && (A = C, C++);
    }
  }
  function d(y, R) {
    if (!y || !R || y.slice(-1) !== R.slice(-1))
      return 0;
    for (var N = 0, T = Math.min(y.length, R.length), f = T, A = 0; N < f; )
      y.substring(y.length - f, y.length - A) == R.substring(R.length - f, R.length - A) ? (N = f, A = N) : T = f, f = Math.floor((T - N) / 2 + N);
    return K(y.charCodeAt(y.length - f)) && f--, f;
  }
  function p(y, R) {
    var N = y.length > R.length ? y : R, T = y.length > R.length ? R : y;
    if (N.length < 4 || T.length * 2 < N.length)
      return null;
    function f(J, Y, ge) {
      for (var ye = J.substring(ge, ge + Math.floor(J.length / 4)), re = -1, oe = "", le, ce, de, pe; (re = Y.indexOf(ye, re + 1)) !== -1; ) {
        var Ee = l(
          J.substring(ge),
          Y.substring(re)
        ), ke = d(
          J.substring(0, ge),
          Y.substring(0, re)
        );
        oe.length < ke + Ee && (oe = Y.substring(re - ke, re) + Y.substring(re, re + Ee), le = J.substring(0, ge - ke), ce = J.substring(ge + Ee), de = Y.substring(0, re - ke), pe = Y.substring(re + Ee));
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
      N,
      T,
      Math.ceil(N.length / 4)
    ), C = f(
      N,
      T,
      Math.ceil(N.length / 2)
    ), j;
    if (!A && !C)
      return null;
    C ? A ? j = A[4].length > C[4].length ? A : C : j = C : j = A;
    var V, L, S, P;
    y.length > R.length ? (V = j[0], L = j[1], S = j[2], P = j[3]) : (S = j[0], P = j[1], V = j[2], L = j[3]);
    var z = j[4];
    return [V, L, S, P, z];
  }
  function b(y) {
    for (var R = !1, N = [], T = 0, f = null, A = 0, C = 0, j = 0, V = 0, L = 0; A < y.length; )
      y[A][0] == t ? (N[T++] = A, C = V, j = L, V = 0, L = 0, f = y[A][1]) : (y[A][0] == e ? V += y[A][1].length : L += y[A][1].length, f && f.length <= Math.max(C, j) && f.length <= Math.max(V, L) && (y.splice(N[T - 1], 0, [
        n,
        f
      ]), y[N[T - 1] + 1][0] = e, T--, T--, A = T > 0 ? N[T - 1] : -1, C = 0, j = 0, V = 0, L = 0, f = null, R = !0)), A++;
    for (R && M(y), $(y), A = 1; A < y.length; ) {
      if (y[A - 1][0] == n && y[A][0] == e) {
        var S = y[A - 1][1], P = y[A][1], z = u(S, P), J = u(P, S);
        z >= J ? (z >= S.length / 2 || z >= P.length / 2) && (y.splice(A, 0, [
          t,
          P.substring(0, z)
        ]), y[A - 1][1] = S.substring(
          0,
          S.length - z
        ), y[A + 1][1] = P.substring(z), A++) : (J >= S.length / 2 || J >= P.length / 2) && (y.splice(A, 0, [
          t,
          S.substring(0, J)
        ]), y[A - 1][0] = e, y[A - 1][1] = P.substring(
          0,
          P.length - J
        ), y[A + 1][0] = n, y[A + 1][1] = S.substring(J), A++), A++;
      }
      A++;
    }
  }
  var h = /[^a-zA-Z0-9]/, w = /\s/, E = /[\r\n]/, k = /\n\r?\n$/, _ = /^\r?\n\r?\n/;
  function $(y) {
    function R(J, Y) {
      if (!J || !Y)
        return 6;
      var ge = J.charAt(J.length - 1), ye = Y.charAt(0), re = ge.match(h), oe = ye.match(h), le = re && ge.match(w), ce = oe && ye.match(w), de = le && ge.match(E), pe = ce && ye.match(E), Ee = de && J.match(k), ke = pe && Y.match(_);
      return Ee || ke ? 5 : de || pe ? 4 : re && !le && ce ? 3 : le || ce ? 2 : re || oe ? 1 : 0;
    }
    for (var N = 1; N < y.length - 1; ) {
      if (y[N - 1][0] == t && y[N + 1][0] == t) {
        var T = y[N - 1][1], f = y[N][1], A = y[N + 1][1], C = d(T, f);
        if (C) {
          var j = f.substring(f.length - C);
          T = T.substring(0, T.length - C), f = j + f.substring(0, f.length - C), A = j + A;
        }
        for (var V = T, L = f, S = A, P = R(T, f) + R(f, A); f.charAt(0) === A.charAt(0); ) {
          T += f.charAt(0), f = f.substring(1) + A.charAt(0), A = A.substring(1);
          var z = R(T, f) + R(f, A);
          z >= P && (P = z, V = T, L = f, S = A);
        }
        y[N - 1][1] != V && (V ? y[N - 1][1] = V : (y.splice(N - 1, 1), N--), y[N][1] = L, S ? y[N + 1][1] = S : (y.splice(N + 1, 1), N--));
      }
      N++;
    }
  }
  function M(y, R) {
    y.push([t, ""]);
    for (var N = 0, T = 0, f = 0, A = "", C = "", j; N < y.length; ) {
      if (N < y.length - 1 && !y[N][1]) {
        y.splice(N, 1);
        continue;
      }
      switch (y[N][0]) {
        case e:
          f++, C += y[N][1], N++;
          break;
        case n:
          T++, A += y[N][1], N++;
          break;
        case t:
          var V = N - f - T - 1;
          if (R) {
            if (V >= 0 && ae(y[V][1])) {
              var L = y[V][1].slice(-1);
              if (y[V][1] = y[V][1].slice(
                0,
                -1
              ), A = L + A, C = L + C, !y[V][1]) {
                y.splice(V, 1), N--;
                var S = V - 1;
                y[S] && y[S][0] === e && (f++, C = y[S][1] + C, S--), y[S] && y[S][0] === n && (T++, A = y[S][1] + A, S--), V = S;
              }
            }
            if (H(y[N][1])) {
              var L = y[N][1].charAt(0);
              y[N][1] = y[N][1].slice(1), A += L, C += L;
            }
          }
          if (N < y.length - 1 && !y[N][1]) {
            y.splice(N, 1);
            break;
          }
          if (A.length > 0 || C.length > 0) {
            A.length > 0 && C.length > 0 && (j = l(C, A), j !== 0 && (V >= 0 ? y[V][1] += C.substring(
              0,
              j
            ) : (y.splice(0, 0, [
              t,
              C.substring(0, j)
            ]), N++), C = C.substring(j), A = A.substring(j)), j = d(C, A), j !== 0 && (y[N][1] = C.substring(C.length - j) + y[N][1], C = C.substring(
              0,
              C.length - j
            ), A = A.substring(
              0,
              A.length - j
            )));
            var P = f + T;
            A.length === 0 && C.length === 0 ? (y.splice(N - P, P), N = N - P) : A.length === 0 ? (y.splice(N - P, P, [e, C]), N = N - P + 1) : C.length === 0 ? (y.splice(N - P, P, [n, A]), N = N - P + 1) : (y.splice(
              N - P,
              P,
              [n, A],
              [e, C]
            ), N = N - P + 2);
          }
          N !== 0 && y[N - 1][0] === t ? (y[N - 1][1] += y[N][1], y.splice(N, 1)) : N++, f = 0, T = 0, A = "", C = "";
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
    z && M(y, R);
  }
  function U(y) {
    return y >= 55296 && y <= 56319;
  }
  function K(y) {
    return y >= 56320 && y <= 57343;
  }
  function H(y) {
    return K(y.charCodeAt(0));
  }
  function ae(y) {
    return U(y.charCodeAt(y.length - 1));
  }
  function ie(y) {
    for (var R = [], N = 0; N < y.length; N++)
      y[N][1].length > 0 && R.push(y[N]);
    return R;
  }
  function be(y, R, N, T) {
    return ae(y) || H(T) ? null : ie([
      [t, y],
      [n, R],
      [e, N],
      [t, T]
    ]);
  }
  function Ae(y, R, N) {
    var T = typeof N == "number" ? { index: N, length: 0 } : N.oldRange, f = typeof N == "number" ? null : N.newRange, A = y.length, C = R.length;
    if (T.length === 0 && (f === null || f.length === 0)) {
      var j = T.index, V = y.slice(0, j), L = y.slice(j), S = f ? f.index : null;
      e: {
        var P = j + C - A;
        if (S !== null && S !== P || P < 0 || P > C)
          break e;
        var z = R.slice(0, P), J = R.slice(P);
        if (J !== L)
          break e;
        var Y = Math.min(j, P), ge = V.slice(0, Y), ye = z.slice(0, Y);
        if (ge !== ye)
          break e;
        var re = V.slice(Y), oe = z.slice(Y);
        return be(ge, re, oe, L);
      }
      e: {
        if (S !== null && S !== j)
          break e;
        var le = j, z = R.slice(0, le), J = R.slice(le);
        if (z !== V)
          break e;
        var ce = Math.min(A - le, C - le), de = L.slice(L.length - ce), pe = J.slice(J.length - ce);
        if (de !== pe)
          break e;
        var re = L.slice(0, L.length - ce), oe = J.slice(0, J.length - ce);
        return be(V, re, oe, de);
      }
    }
    if (T.length > 0 && f && f.length === 0)
      e: {
        var ge = y.slice(0, T.index), de = y.slice(T.index + T.length), Y = ge.length, ce = de.length;
        if (C < Y + ce)
          break e;
        var ye = R.slice(0, Y), pe = R.slice(C - ce);
        if (ge !== ye || de !== pe)
          break e;
        var re = y.slice(Y, A - ce), oe = R.slice(Y, C - ce);
        return be(ge, re, oe, de);
      }
    return null;
  }
  function we(y, R, N, T) {
    return r(y, R, N, T, !0);
  }
  return we.INSERT = e, we.DELETE = n, we.EQUAL = t, ii = we, ii;
}
var ar = { exports: {} };
ar.exports;
var Fa;
function bl() {
  return Fa || (Fa = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", o = "[object Array]", l = "[object Boolean]", u = "[object Date]", d = "[object Error]", p = "[object Function]", b = "[object GeneratorFunction]", h = "[object Map]", w = "[object Number]", E = "[object Object]", k = "[object Promise]", _ = "[object RegExp]", $ = "[object Set]", M = "[object String]", U = "[object Symbol]", K = "[object WeakMap]", H = "[object ArrayBuffer]", ae = "[object DataView]", ie = "[object Float32Array]", be = "[object Float64Array]", Ae = "[object Int8Array]", we = "[object Int16Array]", y = "[object Int32Array]", R = "[object Uint8Array]", N = "[object Uint8ClampedArray]", T = "[object Uint16Array]", f = "[object Uint32Array]", A = /[\\^$.*+?()[\]{}|]/g, C = /\w*$/, j = /^\[object .+?Constructor\]$/, V = /^(?:0|[1-9]\d*)$/, L = {};
    L[i] = L[o] = L[H] = L[ae] = L[l] = L[u] = L[ie] = L[be] = L[Ae] = L[we] = L[y] = L[h] = L[w] = L[E] = L[_] = L[$] = L[M] = L[U] = L[R] = L[N] = L[T] = L[f] = !0, L[d] = L[p] = L[K] = !1;
    var S = typeof Ht == "object" && Ht && Ht.Object === Object && Ht, P = typeof self == "object" && self && self.Object === Object && self, z = S || P || Function("return this")(), J = e && !e.nodeType && e, Y = J && !0 && n && !n.nodeType && n, ge = Y && Y.exports === J;
    function ye(a, c) {
      return a.set(c[0], c[1]), a;
    }
    function re(a, c) {
      return a.add(c), a;
    }
    function oe(a, c) {
      for (var v = -1, O = a ? a.length : 0; ++v < O && c(a[v], v, a) !== !1; )
        ;
      return a;
    }
    function le(a, c) {
      for (var v = -1, O = c.length, se = a.length; ++v < O; )
        a[se + v] = c[v];
      return a;
    }
    function ce(a, c, v, O) {
      for (var se = -1, X = a ? a.length : 0; ++se < X; )
        v = c(v, a[se], se, a);
      return v;
    }
    function de(a, c) {
      for (var v = -1, O = Array(a); ++v < a; )
        O[v] = c(v);
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
      var c = -1, v = Array(a.size);
      return a.forEach(function(O, se) {
        v[++c] = [se, O];
      }), v;
    }
    function Jt(a, c) {
      return function(v) {
        return a(c(v));
      };
    }
    function en(a) {
      var c = -1, v = Array(a.size);
      return a.forEach(function(O) {
        v[++c] = O;
      }), v;
    }
    var An = Array.prototype, tn = Function.prototype, Et = Object.prototype, nn = z["__core-js_shared__"], En = (function() {
      var a = /[^.]+$/.exec(nn && nn.keys && nn.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), Nn = tn.toString, Je = Et.hasOwnProperty, Nt = Et.toString, Tn = RegExp(
      "^" + Nn.call(Je).replace(A, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Tt = ge ? z.Buffer : void 0, St = z.Symbol, pt = z.Uint8Array, Ve = Jt(Object.getPrototypeOf, Object), Ct = Object.create, kt = Et.propertyIsEnumerable, Wn = An.splice, rn = Object.getOwnPropertySymbols, Mt = Tt ? Tt.isBuffer : void 0, sn = Jt(Object.keys, Object), Pt = it(z, "DataView"), m = it(z, "Map"), g = it(z, "Promise"), q = it(z, "Set"), B = it(z, "WeakMap"), ne = it(Object, "create"), fe = ze(Pt), qe = ze(m), an = ze(g), jt = ze(q), on = ze(B), De = St ? St.prototype : void 0, Cr = De ? De.valueOf : void 0;
    function Lt(a) {
      var c = -1, v = a ? a.length : 0;
      for (this.clear(); ++c < v; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function ys() {
      this.__data__ = ne ? ne(null) : {};
    }
    function vs(a) {
      return this.has(a) && delete this.__data__[a];
    }
    function xs(a) {
      var c = this.__data__;
      if (ne) {
        var v = c[a];
        return v === r ? void 0 : v;
      }
      return Je.call(c, a) ? c[a] : void 0;
    }
    function kr(a) {
      var c = this.__data__;
      return ne ? c[a] !== void 0 : Je.call(c, a);
    }
    function Zn(a, c) {
      var v = this.__data__;
      return v[a] = ne && c === void 0 ? r : c, this;
    }
    Lt.prototype.clear = ys, Lt.prototype.delete = vs, Lt.prototype.get = xs, Lt.prototype.has = kr, Lt.prototype.set = Zn;
    function Ie(a) {
      var c = -1, v = a ? a.length : 0;
      for (this.clear(); ++c < v; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function ws() {
      this.__data__ = [];
    }
    function As(a) {
      var c = this.__data__, v = Cn(c, a);
      if (v < 0)
        return !1;
      var O = c.length - 1;
      return v == O ? c.pop() : Wn.call(c, v, 1), !0;
    }
    function Es(a) {
      var c = this.__data__, v = Cn(c, a);
      return v < 0 ? void 0 : c[v][1];
    }
    function Ns(a) {
      return Cn(this.__data__, a) > -1;
    }
    function Ts(a, c) {
      var v = this.__data__, O = Cn(v, a);
      return O < 0 ? v.push([a, c]) : v[O][1] = c, this;
    }
    Ie.prototype.clear = ws, Ie.prototype.delete = As, Ie.prototype.get = Es, Ie.prototype.has = Ns, Ie.prototype.set = Ts;
    function Be(a) {
      var c = -1, v = a ? a.length : 0;
      for (this.clear(); ++c < v; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function Ss() {
      this.__data__ = {
        hash: new Lt(),
        map: new (m || Ie)(),
        string: new Lt()
      };
    }
    function Cs(a) {
      return un(this, a).delete(a);
    }
    function ks(a) {
      return un(this, a).get(a);
    }
    function Ls(a) {
      return un(this, a).has(a);
    }
    function _s(a, c) {
      return un(this, a).set(a, c), this;
    }
    Be.prototype.clear = Ss, Be.prototype.delete = Cs, Be.prototype.get = ks, Be.prototype.has = Ls, Be.prototype.set = _s;
    function Ge(a) {
      this.__data__ = new Ie(a);
    }
    function qs() {
      this.__data__ = new Ie();
    }
    function Is(a) {
      return this.__data__.delete(a);
    }
    function Os(a) {
      return this.__data__.get(a);
    }
    function Rs(a) {
      return this.__data__.has(a);
    }
    function $s(a, c) {
      var v = this.__data__;
      if (v instanceof Ie) {
        var O = v.__data__;
        if (!m || O.length < t - 1)
          return O.push([a, c]), this;
        v = this.__data__ = new Be(O);
      }
      return v.set(a, c), this;
    }
    Ge.prototype.clear = qs, Ge.prototype.delete = Is, Ge.prototype.get = Os, Ge.prototype.has = Rs, Ge.prototype.set = $s;
    function Sn(a, c) {
      var v = Jn(a) || Ln(a) ? de(a.length, String) : [], O = v.length, se = !!O;
      for (var X in a)
        Je.call(a, X) && !(se && (X == "length" || Zs(X, O))) && v.push(X);
      return v;
    }
    function Lr(a, c, v) {
      var O = a[c];
      (!(Je.call(a, c) && Rr(O, v)) || v === void 0 && !(c in a)) && (a[c] = v);
    }
    function Cn(a, c) {
      for (var v = a.length; v--; )
        if (Rr(a[v][0], c))
          return v;
      return -1;
    }
    function mt(a, c) {
      return a && Qn(c, tr(c), a);
    }
    function Yn(a, c, v, O, se, X, he) {
      var ue;
      if (O && (ue = X ? O(a, se, X, he) : O(a)), ue !== void 0)
        return ue;
      if (!bt(a))
        return a;
      var Te = Jn(a);
      if (Te) {
        if (ue = Gs(a), !c)
          return zs(a, ue);
      } else {
        var me = qt(a), Fe = me == p || me == b;
        if ($r(a))
          return kn(a, c);
        if (me == E || me == i || Fe && !X) {
          if (Ee(a))
            return X ? a : {};
          if (ue = gt(Fe ? {} : a), !c)
            return Hs(a, mt(ue, a));
        } else {
          if (!L[me])
            return X ? a : {};
          ue = Ws(a, me, Yn, c);
        }
      }
      he || (he = new Ge());
      var We = he.get(a);
      if (We)
        return We;
      if (he.set(a, ue), !Te)
        var Se = v ? Ks(a) : tr(a);
      return oe(Se || a, function(Me, Oe) {
        Se && (Oe = Me, Me = a[Oe]), Lr(ue, Oe, Yn(Me, c, v, O, Oe, a, he));
      }), ue;
    }
    function Ds(a) {
      return bt(a) ? Ct(a) : {};
    }
    function Bs(a, c, v) {
      var O = c(a);
      return Jn(a) ? O : le(O, v(a));
    }
    function Fs(a) {
      return Nt.call(a);
    }
    function Ms(a) {
      if (!bt(a) || Xs(a))
        return !1;
      var c = er(a) || Ee(a) ? Tn : j;
      return c.test(ze(a));
    }
    function Ps(a) {
      if (!Ir(a))
        return sn(a);
      var c = [];
      for (var v in Object(a))
        Je.call(a, v) && v != "constructor" && c.push(v);
      return c;
    }
    function kn(a, c) {
      if (c)
        return a.slice();
      var v = new a.constructor(a.length);
      return a.copy(v), v;
    }
    function Xn(a) {
      var c = new a.constructor(a.byteLength);
      return new pt(c).set(new pt(a)), c;
    }
    function ln(a, c) {
      var v = c ? Xn(a.buffer) : a.buffer;
      return new a.constructor(v, a.byteOffset, a.byteLength);
    }
    function _r(a, c, v) {
      var O = c ? v(ke(a), !0) : ke(a);
      return ce(O, ye, new a.constructor());
    }
    function qr(a) {
      var c = new a.constructor(a.source, C.exec(a));
      return c.lastIndex = a.lastIndex, c;
    }
    function js(a, c, v) {
      var O = c ? v(en(a), !0) : en(a);
      return ce(O, re, new a.constructor());
    }
    function Us(a) {
      return Cr ? Object(Cr.call(a)) : {};
    }
    function Vs(a, c) {
      var v = c ? Xn(a.buffer) : a.buffer;
      return new a.constructor(v, a.byteOffset, a.length);
    }
    function zs(a, c) {
      var v = -1, O = a.length;
      for (c || (c = Array(O)); ++v < O; )
        c[v] = a[v];
      return c;
    }
    function Qn(a, c, v, O) {
      v || (v = {});
      for (var se = -1, X = c.length; ++se < X; ) {
        var he = c[se], ue = void 0;
        Lr(v, he, ue === void 0 ? a[he] : ue);
      }
      return v;
    }
    function Hs(a, c) {
      return Qn(a, _t(a), c);
    }
    function Ks(a) {
      return Bs(a, tr, _t);
    }
    function un(a, c) {
      var v = a.__data__;
      return Ys(c) ? v[typeof c == "string" ? "string" : "hash"] : v.map;
    }
    function it(a, c) {
      var v = pe(a, c);
      return Ms(v) ? v : void 0;
    }
    var _t = rn ? Jt(rn, Object) : Js, qt = Fs;
    (Pt && qt(new Pt(new ArrayBuffer(1))) != ae || m && qt(new m()) != h || g && qt(g.resolve()) != k || q && qt(new q()) != $ || B && qt(new B()) != K) && (qt = function(a) {
      var c = Nt.call(a), v = c == E ? a.constructor : void 0, O = v ? ze(v) : void 0;
      if (O)
        switch (O) {
          case fe:
            return ae;
          case qe:
            return h;
          case an:
            return k;
          case jt:
            return $;
          case on:
            return K;
        }
      return c;
    });
    function Gs(a) {
      var c = a.length, v = a.constructor(c);
      return c && typeof a[0] == "string" && Je.call(a, "index") && (v.index = a.index, v.input = a.input), v;
    }
    function gt(a) {
      return typeof a.constructor == "function" && !Ir(a) ? Ds(Ve(a)) : {};
    }
    function Ws(a, c, v, O) {
      var se = a.constructor;
      switch (c) {
        case H:
          return Xn(a);
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
        case R:
        case N:
        case T:
        case f:
          return Vs(a, O);
        case h:
          return _r(a, O, v);
        case w:
        case M:
          return new se(a);
        case _:
          return qr(a);
        case $:
          return js(a, O, v);
        case U:
          return Us(a);
      }
    }
    function Zs(a, c) {
      return c = c ?? s, !!c && (typeof a == "number" || V.test(a)) && a > -1 && a % 1 == 0 && a < c;
    }
    function Ys(a) {
      var c = typeof a;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? a !== "__proto__" : a === null;
    }
    function Xs(a) {
      return !!En && En in a;
    }
    function Ir(a) {
      var c = a && a.constructor, v = typeof c == "function" && c.prototype || Et;
      return a === v;
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
    function Or(a) {
      return Yn(a, !0, !0);
    }
    function Rr(a, c) {
      return a === c || a !== a && c !== c;
    }
    function Ln(a) {
      return Qs(a) && Je.call(a, "callee") && (!kt.call(a, "callee") || Nt.call(a) == i);
    }
    var Jn = Array.isArray;
    function _n(a) {
      return a != null && Dr(a.length) && !er(a);
    }
    function Qs(a) {
      return Br(a) && _n(a);
    }
    var $r = Mt || ei;
    function er(a) {
      var c = bt(a) ? Nt.call(a) : "";
      return c == p || c == b;
    }
    function Dr(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= s;
    }
    function bt(a) {
      var c = typeof a;
      return !!a && (c == "object" || c == "function");
    }
    function Br(a) {
      return !!a && typeof a == "object";
    }
    function tr(a) {
      return _n(a) ? Sn(a) : Ps(a);
    }
    function Js() {
      return [];
    }
    function ei() {
      return !1;
    }
    n.exports = Or;
  })(ar, ar.exports)), ar.exports;
}
var or = { exports: {} };
or.exports;
var Ma;
function yl() {
  return Ma || (Ma = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 1, i = 2, o = 9007199254740991, l = "[object Arguments]", u = "[object Array]", d = "[object AsyncFunction]", p = "[object Boolean]", b = "[object Date]", h = "[object Error]", w = "[object Function]", E = "[object GeneratorFunction]", k = "[object Map]", _ = "[object Number]", $ = "[object Null]", M = "[object Object]", U = "[object Promise]", K = "[object Proxy]", H = "[object RegExp]", ae = "[object Set]", ie = "[object String]", be = "[object Symbol]", Ae = "[object Undefined]", we = "[object WeakMap]", y = "[object ArrayBuffer]", R = "[object DataView]", N = "[object Float32Array]", T = "[object Float64Array]", f = "[object Int8Array]", A = "[object Int16Array]", C = "[object Int32Array]", j = "[object Uint8Array]", V = "[object Uint8ClampedArray]", L = "[object Uint16Array]", S = "[object Uint32Array]", P = /[\\^$.*+?()[\]{}|]/g, z = /^\[object .+?Constructor\]$/, J = /^(?:0|[1-9]\d*)$/, Y = {};
    Y[N] = Y[T] = Y[f] = Y[A] = Y[C] = Y[j] = Y[V] = Y[L] = Y[S] = !0, Y[l] = Y[u] = Y[y] = Y[p] = Y[R] = Y[b] = Y[h] = Y[w] = Y[k] = Y[_] = Y[M] = Y[H] = Y[ae] = Y[ie] = Y[we] = !1;
    var ge = typeof Ht == "object" && Ht && Ht.Object === Object && Ht, ye = typeof self == "object" && self && self.Object === Object && self, re = ge || ye || Function("return this")(), oe = e && !e.nodeType && e, le = oe && !0 && n && !n.nodeType && n, ce = le && le.exports === oe, de = ce && ge.process, pe = (function() {
      try {
        return de && de.binding && de.binding("util");
      } catch {
      }
    })(), Ee = pe && pe.isTypedArray;
    function ke(a, c) {
      for (var v = -1, O = a == null ? 0 : a.length, se = 0, X = []; ++v < O; ) {
        var he = a[v];
        c(he, v, a) && (X[se++] = he);
      }
      return X;
    }
    function Jt(a, c) {
      for (var v = -1, O = c.length, se = a.length; ++v < O; )
        a[se + v] = c[v];
      return a;
    }
    function en(a, c) {
      for (var v = -1, O = a == null ? 0 : a.length; ++v < O; )
        if (c(a[v], v, a))
          return !0;
      return !1;
    }
    function An(a, c) {
      for (var v = -1, O = Array(a); ++v < a; )
        O[v] = c(v);
      return O;
    }
    function tn(a) {
      return function(c) {
        return a(c);
      };
    }
    function Et(a, c) {
      return a.has(c);
    }
    function nn(a, c) {
      return a?.[c];
    }
    function En(a) {
      var c = -1, v = Array(a.size);
      return a.forEach(function(O, se) {
        v[++c] = [se, O];
      }), v;
    }
    function Nn(a, c) {
      return function(v) {
        return a(c(v));
      };
    }
    function Je(a) {
      var c = -1, v = Array(a.size);
      return a.forEach(function(O) {
        v[++c] = O;
      }), v;
    }
    var Nt = Array.prototype, Tn = Function.prototype, Tt = Object.prototype, St = re["__core-js_shared__"], pt = Tn.toString, Ve = Tt.hasOwnProperty, Ct = (function() {
      var a = /[^.]+$/.exec(St && St.keys && St.keys.IE_PROTO || "");
      return a ? "Symbol(src)_1." + a : "";
    })(), kt = Tt.toString, Wn = RegExp(
      "^" + pt.call(Ve).replace(P, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), rn = ce ? re.Buffer : void 0, Mt = re.Symbol, sn = re.Uint8Array, Pt = Tt.propertyIsEnumerable, m = Nt.splice, g = Mt ? Mt.toStringTag : void 0, q = Object.getOwnPropertySymbols, B = rn ? rn.isBuffer : void 0, ne = Nn(Object.keys, Object), fe = _t(re, "DataView"), qe = _t(re, "Map"), an = _t(re, "Promise"), jt = _t(re, "Set"), on = _t(re, "WeakMap"), De = _t(Object, "create"), Cr = ze(fe), Lt = ze(qe), ys = ze(an), vs = ze(jt), xs = ze(on), kr = Mt ? Mt.prototype : void 0, Zn = kr ? kr.valueOf : void 0;
    function Ie(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.clear(); ++c < v; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function ws() {
      this.__data__ = De ? De(null) : {}, this.size = 0;
    }
    function As(a) {
      var c = this.has(a) && delete this.__data__[a];
      return this.size -= c ? 1 : 0, c;
    }
    function Es(a) {
      var c = this.__data__;
      if (De) {
        var v = c[a];
        return v === r ? void 0 : v;
      }
      return Ve.call(c, a) ? c[a] : void 0;
    }
    function Ns(a) {
      var c = this.__data__;
      return De ? c[a] !== void 0 : Ve.call(c, a);
    }
    function Ts(a, c) {
      var v = this.__data__;
      return this.size += this.has(a) ? 0 : 1, v[a] = De && c === void 0 ? r : c, this;
    }
    Ie.prototype.clear = ws, Ie.prototype.delete = As, Ie.prototype.get = Es, Ie.prototype.has = Ns, Ie.prototype.set = Ts;
    function Be(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.clear(); ++c < v; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function Ss() {
      this.__data__ = [], this.size = 0;
    }
    function Cs(a) {
      var c = this.__data__, v = kn(c, a);
      if (v < 0)
        return !1;
      var O = c.length - 1;
      return v == O ? c.pop() : m.call(c, v, 1), --this.size, !0;
    }
    function ks(a) {
      var c = this.__data__, v = kn(c, a);
      return v < 0 ? void 0 : c[v][1];
    }
    function Ls(a) {
      return kn(this.__data__, a) > -1;
    }
    function _s(a, c) {
      var v = this.__data__, O = kn(v, a);
      return O < 0 ? (++this.size, v.push([a, c])) : v[O][1] = c, this;
    }
    Be.prototype.clear = Ss, Be.prototype.delete = Cs, Be.prototype.get = ks, Be.prototype.has = Ls, Be.prototype.set = _s;
    function Ge(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.clear(); ++c < v; ) {
        var O = a[c];
        this.set(O[0], O[1]);
      }
    }
    function qs() {
      this.size = 0, this.__data__ = {
        hash: new Ie(),
        map: new (qe || Be)(),
        string: new Ie()
      };
    }
    function Is(a) {
      var c = it(this, a).delete(a);
      return this.size -= c ? 1 : 0, c;
    }
    function Os(a) {
      return it(this, a).get(a);
    }
    function Rs(a) {
      return it(this, a).has(a);
    }
    function $s(a, c) {
      var v = it(this, a), O = v.size;
      return v.set(a, c), this.size += v.size == O ? 0 : 1, this;
    }
    Ge.prototype.clear = qs, Ge.prototype.delete = Is, Ge.prototype.get = Os, Ge.prototype.has = Rs, Ge.prototype.set = $s;
    function Sn(a) {
      var c = -1, v = a == null ? 0 : a.length;
      for (this.__data__ = new Ge(); ++c < v; )
        this.add(a[c]);
    }
    function Lr(a) {
      return this.__data__.set(a, r), this;
    }
    function Cn(a) {
      return this.__data__.has(a);
    }
    Sn.prototype.add = Sn.prototype.push = Lr, Sn.prototype.has = Cn;
    function mt(a) {
      var c = this.__data__ = new Be(a);
      this.size = c.size;
    }
    function Yn() {
      this.__data__ = new Be(), this.size = 0;
    }
    function Ds(a) {
      var c = this.__data__, v = c.delete(a);
      return this.size = c.size, v;
    }
    function Bs(a) {
      return this.__data__.get(a);
    }
    function Fs(a) {
      return this.__data__.has(a);
    }
    function Ms(a, c) {
      var v = this.__data__;
      if (v instanceof Be) {
        var O = v.__data__;
        if (!qe || O.length < t - 1)
          return O.push([a, c]), this.size = ++v.size, this;
        v = this.__data__ = new Ge(O);
      }
      return v.set(a, c), this.size = v.size, this;
    }
    mt.prototype.clear = Yn, mt.prototype.delete = Ds, mt.prototype.get = Bs, mt.prototype.has = Fs, mt.prototype.set = Ms;
    function Ps(a, c) {
      var v = Ln(a), O = !v && Rr(a), se = !v && !O && _n(a), X = !v && !O && !se && Br(a), he = v || O || se || X, ue = he ? An(a.length, String) : [], Te = ue.length;
      for (var me in a)
        Ve.call(a, me) && !(he && // Safari 9 has enumerable `arguments.length` in strict mode.
        (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        se && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        X && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
        Ws(me, Te))) && ue.push(me);
      return ue;
    }
    function kn(a, c) {
      for (var v = a.length; v--; )
        if (Or(a[v][0], c))
          return v;
      return -1;
    }
    function Xn(a, c, v) {
      var O = c(a);
      return Ln(a) ? O : Jt(O, v(a));
    }
    function ln(a) {
      return a == null ? a === void 0 ? Ae : $ : g && g in Object(a) ? qt(a) : Ir(a);
    }
    function _r(a) {
      return bt(a) && ln(a) == l;
    }
    function qr(a, c, v, O, se) {
      return a === c ? !0 : a == null || c == null || !bt(a) && !bt(c) ? a !== a && c !== c : js(a, c, v, O, qr, se);
    }
    function js(a, c, v, O, se, X) {
      var he = Ln(a), ue = Ln(c), Te = he ? u : gt(a), me = ue ? u : gt(c);
      Te = Te == l ? M : Te, me = me == l ? M : me;
      var Fe = Te == M, We = me == M, Se = Te == me;
      if (Se && _n(a)) {
        if (!_n(c))
          return !1;
        he = !0, Fe = !1;
      }
      if (Se && !Fe)
        return X || (X = new mt()), he || Br(a) ? Qn(a, c, v, O, se, X) : Hs(a, c, Te, v, O, se, X);
      if (!(v & s)) {
        var Me = Fe && Ve.call(a, "__wrapped__"), Oe = We && Ve.call(c, "__wrapped__");
        if (Me || Oe) {
          var Ut = Me ? a.value() : a, It = Oe ? c.value() : c;
          return X || (X = new mt()), se(Ut, It, v, O, X);
        }
      }
      return Se ? (X || (X = new mt()), Ks(a, c, v, O, se, X)) : !1;
    }
    function Us(a) {
      if (!Dr(a) || Ys(a))
        return !1;
      var c = $r(a) ? Wn : z;
      return c.test(ze(a));
    }
    function Vs(a) {
      return bt(a) && er(a.length) && !!Y[ln(a)];
    }
    function zs(a) {
      if (!Xs(a))
        return ne(a);
      var c = [];
      for (var v in Object(a))
        Ve.call(a, v) && v != "constructor" && c.push(v);
      return c;
    }
    function Qn(a, c, v, O, se, X) {
      var he = v & s, ue = a.length, Te = c.length;
      if (ue != Te && !(he && Te > ue))
        return !1;
      var me = X.get(a);
      if (me && X.get(c))
        return me == c;
      var Fe = -1, We = !0, Se = v & i ? new Sn() : void 0;
      for (X.set(a, c), X.set(c, a); ++Fe < ue; ) {
        var Me = a[Fe], Oe = c[Fe];
        if (O)
          var Ut = he ? O(Oe, Me, Fe, c, a, X) : O(Me, Oe, Fe, a, c, X);
        if (Ut !== void 0) {
          if (Ut)
            continue;
          We = !1;
          break;
        }
        if (Se) {
          if (!en(c, function(It, cn) {
            if (!Et(Se, cn) && (Me === It || se(Me, It, v, O, X)))
              return Se.push(cn);
          })) {
            We = !1;
            break;
          }
        } else if (!(Me === Oe || se(Me, Oe, v, O, X))) {
          We = !1;
          break;
        }
      }
      return X.delete(a), X.delete(c), We;
    }
    function Hs(a, c, v, O, se, X, he) {
      switch (v) {
        case R:
          if (a.byteLength != c.byteLength || a.byteOffset != c.byteOffset)
            return !1;
          a = a.buffer, c = c.buffer;
        case y:
          return !(a.byteLength != c.byteLength || !X(new sn(a), new sn(c)));
        case p:
        case b:
        case _:
          return Or(+a, +c);
        case h:
          return a.name == c.name && a.message == c.message;
        case H:
        case ie:
          return a == c + "";
        case k:
          var ue = En;
        case ae:
          var Te = O & s;
          if (ue || (ue = Je), a.size != c.size && !Te)
            return !1;
          var me = he.get(a);
          if (me)
            return me == c;
          O |= i, he.set(a, c);
          var Fe = Qn(ue(a), ue(c), O, se, X, he);
          return he.delete(a), Fe;
        case be:
          if (Zn)
            return Zn.call(a) == Zn.call(c);
      }
      return !1;
    }
    function Ks(a, c, v, O, se, X) {
      var he = v & s, ue = un(a), Te = ue.length, me = un(c), Fe = me.length;
      if (Te != Fe && !he)
        return !1;
      for (var We = Te; We--; ) {
        var Se = ue[We];
        if (!(he ? Se in c : Ve.call(c, Se)))
          return !1;
      }
      var Me = X.get(a);
      if (Me && X.get(c))
        return Me == c;
      var Oe = !0;
      X.set(a, c), X.set(c, a);
      for (var Ut = he; ++We < Te; ) {
        Se = ue[We];
        var It = a[Se], cn = c[Se];
        if (O)
          var ia = he ? O(cn, It, Se, c, a, X) : O(It, cn, Se, a, c, X);
        if (!(ia === void 0 ? It === cn || se(It, cn, v, O, X) : ia)) {
          Oe = !1;
          break;
        }
        Ut || (Ut = Se == "constructor");
      }
      if (Oe && !Ut) {
        var Fr = a.constructor, Mr = c.constructor;
        Fr != Mr && "constructor" in a && "constructor" in c && !(typeof Fr == "function" && Fr instanceof Fr && typeof Mr == "function" && Mr instanceof Mr) && (Oe = !1);
      }
      return X.delete(a), X.delete(c), Oe;
    }
    function un(a) {
      return Xn(a, tr, Gs);
    }
    function it(a, c) {
      var v = a.__data__;
      return Zs(c) ? v[typeof c == "string" ? "string" : "hash"] : v.map;
    }
    function _t(a, c) {
      var v = nn(a, c);
      return Us(v) ? v : void 0;
    }
    function qt(a) {
      var c = Ve.call(a, g), v = a[g];
      try {
        a[g] = void 0;
        var O = !0;
      } catch {
      }
      var se = kt.call(a);
      return O && (c ? a[g] = v : delete a[g]), se;
    }
    var Gs = q ? function(a) {
      return a == null ? [] : (a = Object(a), ke(q(a), function(c) {
        return Pt.call(a, c);
      }));
    } : Js, gt = ln;
    (fe && gt(new fe(new ArrayBuffer(1))) != R || qe && gt(new qe()) != k || an && gt(an.resolve()) != U || jt && gt(new jt()) != ae || on && gt(new on()) != we) && (gt = function(a) {
      var c = ln(a), v = c == M ? a.constructor : void 0, O = v ? ze(v) : "";
      if (O)
        switch (O) {
          case Cr:
            return R;
          case Lt:
            return k;
          case ys:
            return U;
          case vs:
            return ae;
          case xs:
            return we;
        }
      return c;
    });
    function Ws(a, c) {
      return c = c ?? o, !!c && (typeof a == "number" || J.test(a)) && a > -1 && a % 1 == 0 && a < c;
    }
    function Zs(a) {
      var c = typeof a;
      return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? a !== "__proto__" : a === null;
    }
    function Ys(a) {
      return !!Ct && Ct in a;
    }
    function Xs(a) {
      var c = a && a.constructor, v = typeof c == "function" && c.prototype || Tt;
      return a === v;
    }
    function Ir(a) {
      return kt.call(a);
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
    function Or(a, c) {
      return a === c || a !== a && c !== c;
    }
    var Rr = _r(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? _r : function(a) {
      return bt(a) && Ve.call(a, "callee") && !Pt.call(a, "callee");
    }, Ln = Array.isArray;
    function Jn(a) {
      return a != null && er(a.length) && !$r(a);
    }
    var _n = B || ei;
    function Qs(a, c) {
      return qr(a, c);
    }
    function $r(a) {
      if (!Dr(a))
        return !1;
      var c = ln(a);
      return c == w || c == E || c == d || c == K;
    }
    function er(a) {
      return typeof a == "number" && a > -1 && a % 1 == 0 && a <= o;
    }
    function Dr(a) {
      var c = typeof a;
      return a != null && (c == "object" || c == "function");
    }
    function bt(a) {
      return a != null && typeof a == "object";
    }
    var Br = Ee ? tn(Ee) : Vs;
    function tr(a) {
      return Jn(a) ? Ps(a) : zs(a);
    }
    function Js() {
      return [];
    }
    function ei() {
      return !1;
    }
    n.exports = Qs;
  })(or, or.exports)), or.exports;
}
var Ur = {}, Pa;
function Om() {
  if (Pa) return Ur;
  Pa = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  const n = bl(), e = yl();
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
  })(t || (t = {})), Ur.default = t, Ur;
}
var Vr = {}, ja;
function vl() {
  if (ja) return Vr;
  ja = 1, Object.defineProperty(Vr, "__esModule", { value: !0 });
  var n;
  return (function(e) {
    function t(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    e.length = t;
  })(n || (n = {})), Vr.default = n, Vr;
}
var zr = {}, Ua;
function Rm() {
  if (Ua) return zr;
  Ua = 1, Object.defineProperty(zr, "__esModule", { value: !0 });
  const n = vl();
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
  return zr.default = e, zr;
}
var Va;
function $m() {
  return Va || (Va = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = Im(), r = bl(), s = yl(), i = Om();
    e.AttributeMap = i.default;
    const o = vl();
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
        let _ = 0;
        for (; _ < w && k.hasNext(); ) {
          let $;
          _ < h ? $ = k.next(h - _) : ($ = k.next(w - _), E.push($)), _ += o.default.length($);
        }
        return new p(E);
      }
      compose(h) {
        const w = new l.default(this.ops), E = new l.default(h.ops), k = [], _ = E.peek();
        if (_ != null && typeof _.retain == "number" && _.attributes == null) {
          let M = _.retain;
          for (; w.peekType() === "insert" && w.peekLength() <= M; )
            M -= w.peekLength(), k.push(w.next());
          _.retain - M > 0 && E.next(_.retain - M);
        }
        const $ = new p(k);
        for (; w.hasNext() || E.hasNext(); )
          if (E.peekType() === "insert")
            $.push(E.next());
          else if (w.peekType() === "delete")
            $.push(w.next());
          else {
            const M = Math.min(w.peekLength(), E.peekLength()), U = w.next(M), K = E.next(M);
            if (K.retain) {
              const H = {};
              if (typeof U.retain == "number")
                H.retain = typeof K.retain == "number" ? M : K.retain;
              else if (typeof K.retain == "number")
                U.retain == null ? H.insert = U.insert : H.retain = U.retain;
              else {
                const ie = U.retain == null ? "insert" : "retain", [be, Ae, we] = d(U[ie], K.retain), y = p.getHandler(be);
                H[ie] = {
                  [be]: y.compose(Ae, we, ie === "retain")
                };
              }
              const ae = i.default.compose(U.attributes, K.attributes, typeof U.retain == "number");
              if (ae && (H.attributes = ae), $.push(H), !E.hasNext() && s($.ops[$.ops.length - 1], H)) {
                const ie = new p(w.rest());
                return $.concat(ie).chop();
              }
            } else typeof K.delete == "number" && (typeof U.retain == "number" || typeof U.retain == "object" && U.retain !== null) && $.push(K);
          }
        return $.chop();
      }
      concat(h) {
        const w = new p(this.ops.slice());
        return h.ops.length > 0 && (w.push(h.ops[0]), w.ops = w.ops.concat(h.ops.slice(1))), w;
      }
      diff(h, w) {
        if (this.ops === h.ops)
          return new p();
        const E = [this, h].map((U) => U.map((K) => {
          if (K.insert != null)
            return typeof K.insert == "string" ? K.insert : u;
          const H = U === h ? "on" : "with";
          throw new Error("diff() called " + H + " non-document");
        }).join("")), k = new p(), _ = t(E[0], E[1], w, !0), $ = new l.default(this.ops), M = new l.default(h.ops);
        return _.forEach((U) => {
          let K = U[1].length;
          for (; K > 0; ) {
            let H = 0;
            switch (U[0]) {
              case t.INSERT:
                H = Math.min(M.peekLength(), K), k.push(M.next(H));
                break;
              case t.DELETE:
                H = Math.min(K, $.peekLength()), $.next(H), k.delete(H);
                break;
              case t.EQUAL:
                H = Math.min($.peekLength(), M.peekLength(), K);
                const ae = $.next(H), ie = M.next(H);
                s(ae.insert, ie.insert) ? k.retain(H, i.default.diff(ae.attributes, ie.attributes)) : k.push(ie).delete(H);
                break;
            }
            K -= H;
          }
        }), k.chop();
      }
      eachLine(h, w = `
`) {
        const E = new l.default(this.ops);
        let k = new p(), _ = 0;
        for (; E.hasNext(); ) {
          if (E.peekType() !== "insert")
            return;
          const $ = E.peek(), M = o.default.length($) - E.peekLength(), U = typeof $.insert == "string" ? $.insert.indexOf(w, M) - M : -1;
          if (U < 0)
            k.push(E.next());
          else if (U > 0)
            k.push(E.next(U));
          else {
            if (h(k, E.next(1).attributes || {}, _) === !1)
              return;
            _ += 1, k = new p();
          }
        }
        k.length() > 0 && h(k, {}, _);
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
              const _ = k.delete || k.retain;
              return h.slice(E, E + _).forEach((M) => {
                k.delete ? w.push(M) : k.retain && k.attributes && w.retain(o.default.length(M), i.default.invert(k.attributes, M.attributes));
              }), E + _;
            } else if (typeof k.retain == "object" && k.retain !== null) {
              const _ = h.slice(E, E + 1), $ = new l.default(_.ops).next(), [M, U, K] = d(k.retain, $.insert), H = p.getHandler(M);
              return w.retain({ [M]: H.invert(U, K) }, i.default.invert(k.attributes, $.attributes)), E + 1;
            }
          }
          return E;
        }, 0), w.chop();
      }
      transform(h, w = !1) {
        if (w = !!w, typeof h == "number")
          return this.transformPosition(h, w);
        const E = h, k = new l.default(this.ops), _ = new l.default(E.ops), $ = new p();
        for (; k.hasNext() || _.hasNext(); )
          if (k.peekType() === "insert" && (w || _.peekType() !== "insert"))
            $.retain(o.default.length(k.next()));
          else if (_.peekType() === "insert")
            $.push(_.next());
          else {
            const M = Math.min(k.peekLength(), _.peekLength()), U = k.next(M), K = _.next(M);
            if (U.delete)
              continue;
            if (K.delete)
              $.push(K);
            else {
              const H = U.retain, ae = K.retain;
              let ie = typeof ae == "object" && ae !== null ? ae : M;
              if (typeof H == "object" && H !== null && typeof ae == "object" && ae !== null) {
                const be = Object.keys(H)[0];
                if (be === Object.keys(ae)[0]) {
                  const Ae = p.getHandler(be);
                  Ae && (ie = {
                    [be]: Ae.transform(H[be], ae[be], w)
                  });
                }
              }
              $.retain(ie, i.default.transform(U.attributes, K.attributes, w));
            }
          }
        return $.chop();
      }
      transformPosition(h, w = !1) {
        w = !!w;
        const E = new l.default(this.ops);
        let k = 0;
        for (; E.hasNext() && k <= h; ) {
          const _ = E.peekLength(), $ = E.peekType();
          if (E.next(), $ === "delete") {
            h -= Math.min(_, h - k);
            continue;
          } else $ === "insert" && (k < h || !w) && (h += _);
          k += _;
        }
        return h;
      }
    }
    p.Op = o.default, p.OpIterator = l.default, p.AttributeMap = i.default, p.handlers = {}, e.default = p, n.exports = p, n.exports.default = p;
  })(jr, jr.exports)), jr.exports;
}
var st = $m();
const W = /* @__PURE__ */ gl(st);
class ft extends Qe {
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
let dt = class extends ss {
};
const Dm = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function ms(n) {
  return n.replace(/[&<>"']/g, (e) => Dm[e]);
}
class He extends Ki {
  static allowedChildren = [He, ft, Qe, dt];
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
const za = 1;
class $e extends br {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = xl(this)), this.cache.delta;
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
    return this.cache.length == null && (this.cache.length = super.length() + za), this.cache.length;
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
    if (t && (e === 0 || e >= this.length() - za)) {
      const s = this.clone();
      return e === 0 ? (this.parent.insertBefore(s, this), this) : (this.parent.insertBefore(s, this.next), s);
    }
    const r = super.split(e, t);
    return this.cache = {}, r;
  }
}
$e.blotName = "block";
$e.tagName = "P";
$e.defaultChild = ft;
$e.allowedChildren = [ft, He, Qe, dt];
class rt extends Qe {
  attach() {
    super.attach(), this.attributes = new fs(this.domNode);
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
`), i = s.pop(), o = s.map((u) => {
      const d = this.scroll.create($e.blotName);
      return d.insertAt(0, u), d;
    }), l = this.split(e);
    o.forEach((u) => {
      this.parent.insertBefore(u, l);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), l);
  }
}
rt.scope = Z.BLOCK_BLOT;
function xl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n.descendants(Ue).reduce((t, r) => r.length() === 0 ? t : t.insert(r.value(), tt(r, {}, e)), new W()).insert(`
`, tt(n));
}
function tt(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return n == null || ("formats" in n && typeof n.formats == "function" && (e = {
    ...e,
    ...n.formats()
  }, t && delete e["code-token"]), n.parent == null || n.parent.statics.blotName === "scroll" || n.parent.statics.scope !== n.statics.scope) ? e : tt(n.parent, e, t);
}
class lt extends Qe {
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
    for (; r != null && r.statics.scope !== Z.BLOCK_BLOT; )
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
var ai = { exports: {} }, Ha;
function Bm() {
  return Ha || (Ha = 1, (function(n) {
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
      var _ = this._events[k], $ = arguments.length, M, U;
      if (_.fn) {
        switch (_.once && this.removeListener(d, _.fn, void 0, !0), $) {
          case 1:
            return _.fn.call(_.context), !0;
          case 2:
            return _.fn.call(_.context, p), !0;
          case 3:
            return _.fn.call(_.context, p, b), !0;
          case 4:
            return _.fn.call(_.context, p, b, h), !0;
          case 5:
            return _.fn.call(_.context, p, b, h, w), !0;
          case 6:
            return _.fn.call(_.context, p, b, h, w, E), !0;
        }
        for (U = 1, M = new Array($ - 1); U < $; U++)
          M[U - 1] = arguments[U];
        _.fn.apply(_.context, M);
      } else {
        var K = _.length, H;
        for (U = 0; U < K; U++)
          switch (_[U].once && this.removeListener(d, _[U].fn, void 0, !0), $) {
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
              if (!M) for (H = 1, M = new Array($ - 1); H < $; H++)
                M[H - 1] = arguments[H];
              _[U].fn.apply(_[U].context, M);
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
        for (var k = 0, _ = [], $ = E.length; k < $; k++)
          (E[k].fn !== p || h && !E[k].once || b && E[k].context !== b) && _.push(E[k]);
        _.length ? this._events[w] = _.length === 1 ? _[0] : _ : o(this, w);
      }
      return this;
    }, l.prototype.removeAllListeners = function(d) {
      var p;
      return d ? (p = t ? t + d : d, this._events[p] && o(this, p)) : (this._events = new r(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = t, l.EventEmitter = l, n.exports = l;
  })(ai)), ai.exports;
}
var Fm = Bm();
const Mm = /* @__PURE__ */ gl(Fm), _i = /* @__PURE__ */ new WeakMap(), qi = ["error", "warn", "log", "info"];
let Ii = "warn";
function wl(n) {
  if (Ii && qi.indexOf(n) <= qi.indexOf(Ii)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
      t[r - 1] = arguments[r];
    console[n](...t);
  }
}
function Ft(n) {
  return qi.reduce((e, t) => (e[t] = wl.bind(console, t, n), e), {});
}
Ft.level = (n) => {
  Ii = n;
};
wl.level = Ft.level;
const oi = Ft("quill:events"), Pm = ["selectionchange", "mousedown", "mouseup", "click"];
Pm.forEach((n) => {
  document.addEventListener(n, function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    Array.from(document.querySelectorAll(".ql-container")).forEach((s) => {
      const i = _i.get(s);
      i && i.emitter && i.emitter.handleDOM(...t);
    });
  });
});
class G extends Mm {
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
const li = Ft("quill:selection");
class pn {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class jm {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new pn(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, G.sources.USER), 1);
    }), this.emitter.on(G.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const r = this.getNativeRange();
      r != null && r.start.node !== this.cursor.textNode && this.emitter.once(G.events.SCROLL_UPDATE, (s, i) => {
        try {
          this.root.contains(r.start.node) && this.root.contains(r.end.node) && this.setNativeRange(r.start.node, r.start.offset, r.end.node, r.end.offset);
          const o = i.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(o ? G.sources.SILENT : s);
        } catch {
        }
      });
    }), this.emitter.on(G.events.SCROLL_OPTIMIZE, (r, s) => {
      if (s.range) {
        const {
          startNode: i,
          startOffset: o,
          endNode: l,
          endOffset: u
        } = s.range;
        this.setNativeRange(i, o, l, u), this.update(G.sources.SILENT);
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
    return li.info("getNativeRange", r), r;
  }
  getRange() {
    const e = this.scroll.domNode;
    if ("isConnected" in e && !e.isConnected)
      return [null, null];
    const t = this.getNativeRange();
    return t == null ? [null, null] : [this.normalizedToRange(t), t];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && ui(this.root, document.activeElement);
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
    if (!ui(this.root, e.startContainer) || !e.collapsed && !ui(this.root, e.endContainer))
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
    if (li.info("setNativeRange", e, t, r, s), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
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
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : G.sources.API;
    if (typeof t == "string" && (r = t, t = !1), li.info("setRange", e), e != null) {
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
        const o = this.cursor.restore();
        o && this.setNativeRange(o.startNode, o.startOffset, o.endNode, o.endOffset);
      }
      const i = [G.events.SELECTION_CHANGE, Fn(this.lastRange), Fn(t), e];
      this.emitter.emit(G.events.EDITOR_CHANGE, ...i), e !== G.sources.SILENT && this.emitter.emit(...i);
    }
  }
}
function ui(n, e) {
  try {
    e.parentNode;
  } catch {
    return !1;
  }
  return n.contains(e);
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
    const r = Ka(e), s = new W();
    return Hm(r.ops.slice()).reduce((o, l) => {
      const u = st.Op.length(l);
      let d = l.attributes || {}, p = !1, b = !1;
      if (l.insert != null) {
        if (s.retain(u), typeof l.insert == "string") {
          const E = l.insert;
          b = !E.endsWith(`
`) && (t <= o || !!this.scroll.descendant(rt, o)[0]), this.scroll.insertAt(o, E);
          const [k, _] = this.scroll.line(o);
          let $ = Gt({}, tt(k));
          if (k instanceof $e) {
            const [M] = k.descendant(Ue, _);
            M && ($ = Gt($, tt(M)));
          }
          d = st.AttributeMap.diff($, d) || {};
        } else if (typeof l.insert == "object") {
          const E = Object.keys(l.insert)[0];
          if (E == null) return o;
          const k = this.scroll.query(E, Z.INLINE) != null;
          if (k)
            (t <= o || this.scroll.descendant(rt, o)[0]) && (b = !0);
          else if (o > 0) {
            const [_, $] = this.scroll.descendant(Ue, o - 1);
            _ instanceof dt ? _.value()[$] !== `
` && (p = !0) : _ instanceof Qe && _.statics.scope === Z.INLINE_BLOT && (p = !0);
          }
          if (this.scroll.insertAt(o, E, l.insert[E]), k) {
            const [_] = this.scroll.descendant(Ue, o);
            if (_) {
              const $ = Gt({}, tt(_));
              d = st.AttributeMap.diff($, d) || {};
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
    }, 0), s.reduce((o, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(o, l.delete), o) : o + st.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new W().retain(e).delete(t));
  }
  formatLine(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(r).forEach((i) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((o) => {
        o.format(i, r[i]);
      });
    }), this.scroll.optimize();
    const s = new W().retain(e).retain(t, Fn(r));
    return this.update(s);
  }
  formatText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((i) => {
      this.scroll.formatAt(e, t, i, r[i]);
    });
    const s = new W().retain(e).retain(t, Fn(r));
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
      u instanceof $e ? r.push(u) : u instanceof Ue && s.push(u);
    }) : (r = this.scroll.lines(e, t), s = this.scroll.descendants(Ue, e, t));
    const [i, o] = [r, s].map((l) => {
      const u = l.shift();
      if (u == null) return {};
      let d = tt(u);
      for (; Object.keys(d).length > 0; ) {
        const p = l.shift();
        if (p == null) return d;
        d = zm(tt(p), d);
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
      return r.length() >= s + t && !(s === 0 && t === i) ? yr(r, s, t, !0) : yr(this.scroll, e, t, !0);
    }
    return "";
  }
  getText(e, t) {
    return this.getContents(e, t).filter((r) => typeof r.insert == "string").map((r) => r.insert).join("");
  }
  insertContents(e, t) {
    const r = Ka(t), s = new W().retain(e).concat(r);
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
    }), this.update(new W().retain(e).insert(t, Fn(r)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if (e?.statics.blotName !== $e.blotName) return !1;
    const t = e;
    return t.children.length > 1 ? !1 : t.children.head instanceof ft;
  }
  removeFormat(e, t) {
    const r = this.getText(e, t), [s, i] = this.scroll.line(e + t);
    let o = 0, l = new W();
    s != null && (o = s.length() - i, l = s.delta().slice(i, i + o - 1).insert(`
`));
    const d = this.getContents(e, t + o).diff(new W().insert(r).concat(l)), p = new W().retain(e).concat(d);
    return this.applyDelta(p);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const s = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(Um) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), o = tt(i), l = i.offset(this.scroll), u = t[0].oldValue.replace(lt.CONTENTS, ""), d = new W().insert(u), p = new W().insert(i.value()), b = r && {
        oldRange: Ga(r.oldRange, -l),
        newRange: Ga(r.newRange, -l)
      };
      e = new W().retain(l).concat(d.diff(p, b)).reduce((w, E) => E.insert ? w.insert(E.insert, o) : w.push(E), new W()), this.delta = s.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !Hi(s.compose(e), this.delta)) && (e = s.diff(this.delta, r));
    return e;
  }
}
function $n(n, e, t) {
  if (n.length === 0) {
    const [w] = ci(t.pop());
    return e <= 0 ? `</li></${w}>` : `</li></${w}>${$n([], e - 1, t)}`;
  }
  const [{
    child: r,
    offset: s,
    length: i,
    indent: o,
    type: l
  }, ...u] = n, [d, p] = ci(l);
  if (o > e)
    return t.push(l), o === e + 1 ? `<${d}><li${p}>${yr(r, s, i)}${$n(u, o, t)}` : `<${d}><li>${$n(n, e + 1, t)}`;
  const b = t[t.length - 1];
  if (o === e && l === b)
    return `</li><li${p}>${yr(r, s, i)}${$n(u, o, t)}`;
  const [h] = ci(t.pop());
  return `</li></${h}>${$n(n, e - 1, t)}`;
}
function yr(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in n && typeof n.html == "function")
    return n.html(e, t);
  if (n instanceof dt)
    return ms(n.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
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
      s.push(yr(d, p, b));
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
function zm(n, e) {
  return Object.keys(e).reduce((t, r) => {
    if (n[r] == null) return t;
    const s = e[r];
    return s === n[r] ? t[r] = s : Array.isArray(s) ? s.indexOf(n[r]) < 0 ? t[r] = s.concat([n[r]]) : t[r] = s : t[r] = [s, n[r]], t;
  }, {});
}
function ci(n) {
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
function Ka(n) {
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
function Ga(n, e) {
  let {
    index: t,
    length: r
  } = n;
  return new pn(t + e, r);
}
function Hm(n) {
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
const Hr = "\uFEFF";
class Wi extends Qe {
  constructor(e, t) {
    super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((r) => {
      this.contentNode.appendChild(r);
    }), this.leftGuard = document.createTextNode(Hr), this.rightGuard = document.createTextNode(Hr), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(e, t) {
    return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
  }
  restore(e) {
    let t = null, r;
    const s = e.data.split(Hr).join("");
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
    return e.data = Hr, t;
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
    t && !(t instanceof Wi) && (this.emitter.emit(G.events.COMPOSITION_BEFORE_START, e), this.scroll.batchStart(), this.emitter.emit(G.events.COMPOSITION_START, e), this.isComposing = !0);
  }
  handleCompositionEnd(e) {
    this.emitter.emit(G.events.COMPOSITION_BEFORE_END, e), this.scroll.batchEnd(), this.emitter.emit(G.events.COMPOSITION_END, e), this.isComposing = !1;
  }
}
class Gn {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: Gn
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
const Gm = (n) => n.parentElement || n.getRootNode().host || null, Wm = (n) => {
  const e = n.getBoundingClientRect(), t = "offsetWidth" in n && Math.abs(e.width) / n.offsetWidth || 1, r = "offsetHeight" in n && Math.abs(e.height) / n.offsetHeight || 1;
  return {
    top: e.top,
    right: e.left + n.clientWidth * t,
    bottom: e.top + n.clientHeight * r,
    left: e.left
  };
}, Kr = (n) => {
  const e = parseInt(n, 10);
  return Number.isNaN(e) ? 0 : e;
}, Wa = (n, e, t, r, s, i) => n < t && e > r ? 0 : n < t ? -(t - n + s) : e > r ? e - n > r - t ? n + s - t : e - r + i : 0, Zm = (n, e) => {
  const t = n.ownerDocument;
  let r = e, s = n;
  for (; s; ) {
    const i = s === t.body, o = i ? {
      top: 0,
      right: window.visualViewport?.width ?? t.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? t.documentElement.clientHeight,
      left: 0
    } : Wm(s), l = getComputedStyle(s), u = Wa(r.left, r.right, o.left, o.right, Kr(l.scrollPaddingLeft), Kr(l.scrollPaddingRight)), d = Wa(r.top, r.bottom, o.top, o.bottom, Kr(l.scrollPaddingTop), Kr(l.scrollPaddingBottom));
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
    s = i || l.position === "fixed" ? null : Gm(s);
  }
}, Ym = 100, Xm = ["block", "break", "cursor", "inline", "scroll", "text"], Qm = (n, e, t) => {
  const r = new zn();
  return Xm.forEach((s) => {
    const i = e.query(s);
    i && r.register(i);
  }), n.forEach((s) => {
    let i = e.query(s);
    i || t.error(`Cannot register "${s}" specified in "formats" config. Are you sure it was registered?`);
    let o = 0;
    for (; i; )
      if (r.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, o += 1, o > Ym) {
        t.error(`Cycle detected in registering blot requiredContainer: "${s}"`);
        break;
      }
  }), r;
}, Pn = Ft("quill"), Gr = new zn();
ct.uiClass = "ql-ui";
class D {
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
    registry: Gr,
    theme: "default"
  };
  static events = G.events;
  static sources = G.sources;
  static version = "2.0.3";
  static imports = {
    delta: W,
    parchment: qm,
    "core/module": At,
    "core/theme": Gn
  };
  static debug(e) {
    e === !0 && (e = "log"), Ft.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return _i.get(e) || Gr.find(e, t);
  }
  static import(e) {
    return this.imports[e] == null && Pn.error(`Cannot import ${e}. Are you sure it was registered?`), this.imports[e];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = !!(!(arguments.length <= 1) && arguments[1]), r = "attrName" in e ? e.attrName : e.blotName;
      typeof r == "string" ? this.register(`formats/${r}`, e, t) : Object.keys(e).forEach((s) => {
        this.register(s, e[s], t);
      });
    } else {
      const e = arguments.length <= 0 ? void 0 : arguments[0], t = arguments.length <= 1 ? void 0 : arguments[1], r = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[e] != null && !r && Pn.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && Gr.register(t), typeof t.register == "function" && t.register(Gr);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = Jm(e, t), this.container = this.options.container, this.container == null) {
      Pn.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && D.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", _i.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new G();
    const s = Gi.blotName, i = this.options.registry.query(s);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${s}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Vm(this.scroll), this.selection = new jm(this.scroll, this.emitter), this.composition = new Km(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(G.events.EDITOR_CHANGE, (o) => {
      o === G.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(G.events.SCROLL_UPDATE, (o, l) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      at.call(this, () => this.editor.update(null, l, p), o);
    }), this.emitter.on(G.events.SCROLL_EMBED_UPDATE, (o, l) => {
      const u = this.selection.lastRange, [d] = this.selection.getRange(), p = u && d ? {
        oldRange: u,
        newRange: d
      } : void 0;
      at.call(this, () => {
        const b = new W().retain(o.offset(this)).retain({
          [o.statics.blotName]: l
        });
        return this.editor.update(b, [], p);
      }, D.sources.USER);
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
    return [e, t, , r] = Ot(e, t, r), at.call(this, () => this.editor.deleteText(e, t), r, e, -1 * t);
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
    return at.call(this, () => {
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
    let o;
    return [e, t, o, i] = Ot(
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
    return [e, t, o, i] = Ot(
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
    return [e, t] = Ot(e, t), this.editor.getContents(e, t);
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
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = Ot(e, t), this.editor.getHTML(e, t);
  }
  getText() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = Ot(e, t), this.editor.getText(e, t);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(e, t, r) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : D.sources.API;
    return at.call(this, () => this.editor.insertEmbed(e, t, r), s, e);
  }
  insertText(e, t, r, s, i) {
    let o;
    return [e, , o, i] = Ot(e, 0, r, s, i), at.call(this, () => this.editor.insertText(e, t, o), i, e, t.length);
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
    return [e, t, , r] = Ot(e, t, r), at.call(this, () => this.editor.removeFormat(e, t), r, e);
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
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : G.sources.API;
    return at.call(this, () => {
      e = new W(e);
      const r = this.getLength(), s = this.editor.deleteText(0, r), i = this.editor.insertContents(0, e), o = this.editor.deleteText(this.getLength() - 1, 1);
      return s.compose(i).compose(o);
    }, t);
  }
  setSelection(e, t, r) {
    e == null ? this.selection.setRange(null, t || D.sources.API) : ([e, t, , r] = Ot(e, t, r), this.selection.setRange(new pn(Math.max(0, e), t), r), r !== G.sources.SILENT && this.scrollSelectionIntoView());
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
    return at.call(this, () => (e = new W(e), this.editor.applyDelta(e)), t, !0);
  }
}
function Za(n) {
  return typeof n == "string" ? document.querySelector(n) : n;
}
function di(n) {
  return Object.entries(n ?? {}).reduce((e, t) => {
    let [r, s] = t;
    return {
      ...e,
      [r]: s === !0 ? {} : s
    };
  }, {});
}
function Ya(n) {
  return Object.fromEntries(Object.entries(n).filter((e) => e[1] !== void 0));
}
function Jm(n, e) {
  const t = Za(n);
  if (!t)
    throw new Error("Invalid Quill container");
  const s = !e.theme || e.theme === D.DEFAULTS.theme ? Gn : D.import(`themes/${e.theme}`);
  if (!s)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: i,
    ...o
  } = D.DEFAULTS, {
    modules: l,
    ...u
  } = s.DEFAULTS;
  let d = di(e.modules);
  d != null && d.toolbar && d.toolbar.constructor !== Object && (d = {
    ...d,
    toolbar: {
      container: d.toolbar
    }
  });
  const p = Gt({}, di(i), di(l), d), b = {
    ...o,
    ...Ya(u),
    ...Ya(e)
  };
  let h = e.registry;
  return h ? e.formats && Pn.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? Qm(e.formats, b.registry, Pn) : b.registry, {
    ...b,
    registry: h,
    container: t,
    theme: s,
    modules: Object.entries(p).reduce((w, E) => {
      let [k, _] = E;
      if (!_) return w;
      const $ = D.import(`modules/${k}`);
      return $ == null ? (Pn.error(`Cannot load ${k} module. Are you sure you registered it?`), w) : {
        ...w,
        // @ts-expect-error
        [k]: Gt({}, $.DEFAULTS || {}, _)
      };
    }, {}),
    bounds: Za(b.bounds)
  };
}
function at(n, e, t, r) {
  if (!this.isEnabled() && e === G.sources.USER && !this.allowReadOnlyEdits)
    return new W();
  let s = t == null ? null : this.getSelection();
  const i = this.editor.delta, o = n();
  if (s != null && (t === !0 && (t = s.index), r == null ? s = Xa(s, o, e) : r !== 0 && (s = Xa(s, t, r, e)), this.setSelection(s, G.sources.SILENT)), o.length() > 0) {
    const l = [G.events.TEXT_CHANGE, o, i, e];
    this.emitter.emit(G.events.EDITOR_CHANGE, ...l), e !== G.sources.SILENT && this.emitter.emit(...l);
  }
  return o;
}
function Ot(n, e, t, r, s) {
  let i = {};
  return typeof n.index == "number" && typeof n.length == "number" ? typeof e != "number" ? (s = r, r = t, t = e, e = n.length, n = n.index) : (e = n.length, n = n.index) : typeof e != "number" && (s = r, r = t, t = e, e = 0), typeof t == "object" ? (i = t, s = r) : typeof t == "string" && (r != null ? i[t] = r : s = t), s = s || G.sources.API, [n, e, i, s];
}
function Xa(n, e, t, r) {
  const s = typeof t == "number" ? t : 0;
  if (n == null) return null;
  let i, o;
  return e && typeof e.transformPosition == "function" ? [i, o] = [n.index, n.index + n.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(l, r !== G.sources.USER)
  )) : [i, o] = [n.index, n.index + n.length].map((l) => l < e || l === e && r === G.sources.USER ? l : s >= 0 ? l + s : Math.max(e, l + s)), new pn(i, o - i);
}
class vn extends ps {
}
function Qa(n) {
  return n instanceof $e || n instanceof rt;
}
function Ja(n) {
  return typeof n.updateContent == "function";
}
class eg extends Gi {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = $e;
  static allowedChildren = [$e, rt, vn];
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
      if (r instanceof rt || i instanceof rt) {
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
      const u = i.type === "block" && (i.delta.length() === 0 || !this.descendant(rt, e)[0] && e < this.length()), d = i.type === "block" ? i.delta : new W().insert({
        [i.key]: i.value
      });
      hi(this, e, d);
      const p = i.type === "block" ? 1 : 0, b = e + d.length() + p;
      u && this.insertAt(b - 1, `
`);
      const h = tt(this.line(e)[0]), w = st.AttributeMap.diff(h, i.attributes) || {};
      Object.keys(w).forEach((E) => {
        this.formatAt(b - 1, 1, E, w[E]);
      }), e = b;
    }
    let [o, l] = this.children.find(e);
    if (r.length && (o && (o = o.split(l), l = 0), r.forEach((u) => {
      if (u.type === "block") {
        const d = this.createBlock(u.attributes, o || void 0);
        hi(d, 0, u.delta);
      } else {
        const d = this.create(u.key, u.value);
        this.insertBefore(d, o || void 0), Object.keys(u.attributes).forEach((p) => {
          d.format(p, u.attributes[p]);
        });
      }
    })), s.type === "block" && s.delta.length()) {
      const u = o ? o.offset(o.scroll) + l : this.length();
      hi(this, u, s.delta);
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
    return e === this.length() ? this.line(e - 1) : this.descendant(Qa, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (s, i, o) => {
      let l = [], u = o;
      return s.children.forEachAt(i, o, (d, p, b) => {
        Qa(d) ? l.push(d) : d instanceof ps && (l = l.concat(r(d, p, u))), u -= b;
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
      return i && !Ja(i);
    }), e.length > 0 && this.emitter.emit(G.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(G.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, r) {
    const [s] = this.descendant((i) => i instanceof rt, e);
    s && s.statics.blotName === t && Ja(s) && s.updateContent(r);
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
          const o = i.split(`
`);
          o.slice(0, -1).forEach((u) => {
            r.insert(u, s.attributes), t.push({
              type: "block",
              delta: r,
              attributes: s.attributes ?? {}
            }), r = new W();
          });
          const l = o[o.length - 1];
          l && r.insert(l, s.attributes);
        } else {
          const o = Object.keys(i)[0];
          if (!o) return;
          this.query(o, Z.INLINE) ? r.push(s) : (r.length() && t.push({
            type: "block",
            delta: r,
            attributes: {}
          }), r = new W(), t.push({
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
      this.query(u, Z.BLOCK & Z.BLOT) != null ? r = u : s[u] = d;
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
function hi(n, e, t) {
  t.reduce((r, s) => {
    const i = st.Op.length(s);
    let o = s.attributes || {};
    if (s.insert != null) {
      if (typeof s.insert == "string") {
        const l = s.insert;
        n.insertAt(r, l);
        const [u] = n.descendant(Ue, r), d = tt(u);
        o = st.AttributeMap.diff(d, o) || {};
      } else if (typeof s.insert == "object") {
        const l = Object.keys(s.insert)[0];
        if (l == null) return r;
        if (n.insertAt(r, l, s.insert[l]), n.scroll.query(l, Z.INLINE) != null) {
          const [d] = n.descendant(Ue, r), p = tt(d);
          o = st.AttributeMap.diff(p, o) || {};
        }
      }
    }
    return Object.keys(o).forEach((l) => {
      n.formatAt(r, i, l, o[l]);
    }), r + i;
  }, e);
}
const Zi = {
  scope: Z.BLOCK,
  whitelist: ["right", "center", "justify"]
}, tg = new xt("align", "align", Zi), Al = new ht("align", "ql-align", Zi), El = new Qt("align", "text-align", Zi);
class Nl extends Qt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((s) => `00${parseInt(s, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const ng = new ht("color", "ql-color", {
  scope: Z.INLINE
}), Yi = new Nl("color", "color", {
  scope: Z.INLINE
}), rg = new ht("background", "ql-bg", {
  scope: Z.INLINE
}), Xi = new Nl("background", "background-color", {
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
${ms(this.code(e, t))}
</pre>`;
  }
}
class Ke extends $e {
  static TAB = "  ";
  static register() {
    D.register(xn);
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
Ke.allowedChildren = [dt, ft, lt];
Ke.requiredContainer = xn;
const Ji = {
  scope: Z.BLOCK,
  whitelist: ["rtl"]
}, Tl = new xt("direction", "dir", Ji), Sl = new ht("direction", "ql-direction", Ji), Cl = new Qt("direction", "direction", Ji), kl = {
  scope: Z.INLINE,
  whitelist: ["serif", "monospace"]
}, Ll = new ht("font", "ql-font", kl);
class sg extends Qt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const _l = new sg("font", "font-family", kl), ql = new ht("size", "ql-size", {
  scope: Z.INLINE,
  whitelist: ["small", "large", "huge"]
}), Il = new Qt("size", "font-size", {
  scope: Z.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), ig = Ft("quill:keyboard"), ag = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class gs extends At {
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
    const s = lg(e);
    if (s == null) {
      ig.warn("Attempted to add invalid keyboard binding", s);
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
      const s = (this.bindings[e.key] || []).concat(this.bindings[e.which] || []).filter(($) => gs.match(e, $));
      if (s.length === 0) return;
      const i = D.find(e.target, !0);
      if (i && i.scroll !== this.quill.scroll) return;
      const o = this.quill.getSelection();
      if (o == null || !this.quill.hasFocus()) return;
      const [l, u] = this.quill.getLine(o.index), [d, p] = this.quill.getLeaf(o.index), [b, h] = o.length === 0 ? [d, p] : this.quill.getLeaf(o.index + o.length), w = d instanceof ss ? d.value().slice(0, p) : "", E = b instanceof ss ? b.value().slice(h) : "", k = {
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
      s.some(($) => {
        if ($.collapsed != null && $.collapsed !== k.collapsed || $.empty != null && $.empty !== k.empty || $.offset != null && $.offset !== k.offset)
          return !1;
        if (Array.isArray($.format)) {
          if ($.format.every((M) => k.format[M] == null))
            return !1;
        } else if (typeof $.format == "object" && !Object.keys($.format).every((M) => $.format[M] === !0 ? k.format[M] != null : $.format[M] === !1 ? k.format[M] == null : Hi($.format[M], k.format[M])))
          return !1;
        return $.prefix != null && !$.prefix.test(k.prefix) || $.suffix != null && !$.suffix.test(k.suffix) ? !1 : $.handler.call(this, o, k, $) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let o = new W().retain(e.index - r).delete(r);
    if (t.offset === 0) {
      const [l] = this.quill.getLine(e.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const d = i.formats(), p = this.quill.getFormat(e.index - 1, 1);
        if (s = st.AttributeMap.diff(d, p) || {}, Object.keys(s).length > 0) {
          const b = new W().retain(e.index + i.length() - 2).retain(1, s);
          o = o.compose(b);
        }
      }
    }
    this.quill.updateContents(o, D.sources.USER), this.quill.focus();
  }
  handleDelete(e, t) {
    const r = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
    if (e.index >= this.quill.getLength() - r) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let o = new W().retain(e.index).delete(r);
    if (t.offset >= i.length() - 1) {
      const [l] = this.quill.getLine(e.index + 1);
      if (l) {
        const u = i.formats(), d = this.quill.getFormat(e.index, 1);
        s = st.AttributeMap.diff(u, d) || {}, Object.keys(s).length > 0 && (o = o.retain(l.length() - 1).retain(1, s));
      }
    }
    this.quill.updateContents(o, D.sources.USER), this.quill.focus();
  }
  handleDeleteRange(e) {
    ea({
      range: e,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(e, t) {
    const r = Object.keys(t.format).reduce((i, o) => (this.quill.scroll.query(o, Z.BLOCK) && !Array.isArray(t.format[o]) && (i[o] = t.format[o]), i), {}), s = new W().retain(e.index).delete(e.length).insert(`
`, r);
    this.quill.updateContents(s, D.sources.USER), this.quill.setSelection(e.index + 1, D.sources.SILENT), this.quill.focus();
  }
}
const og = {
  bindings: {
    bold: fi("bold"),
    italic: fi("italic"),
    underline: fi("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(n, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "+1", D.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(n, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "-1", D.sources.USER), !1);
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
        e.format.indent != null ? this.quill.format("indent", "-1", D.sources.USER) : e.format.list != null && this.quill.format("list", !1, D.sources.USER);
      }
    },
    "indent code-block": eo(!0),
    "outdent code-block": eo(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(n) {
        this.quill.deleteText(n.index - 1, 1, D.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(n, e) {
        if (e.format.table) return !0;
        this.quill.history.cutoff();
        const t = new W().retain(n.index).delete(n.length).insert("	");
        return this.quill.updateContents(t, D.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index + 1, D.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, D.sources.USER);
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
        e.format.indent && (t.indent = !1), this.quill.formatLine(n.index, n.length, t, D.sources.USER);
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
        this.quill.updateContents(s, D.sources.USER), this.quill.setSelection(n.index + 1, D.sources.SILENT), this.quill.scrollSelectionIntoView();
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
        this.quill.updateContents(s, D.sources.USER), this.quill.setSelection(n.index + 1, D.sources.SILENT), this.quill.scrollSelectionIntoView();
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
          const [t, r, s, i] = e.getTable(n), o = ug(t, r, s, i);
          if (o == null) return;
          let l = t.offset();
          if (o < 0) {
            const u = new W().retain(l).insert(`
`);
            this.quill.updateContents(u, D.sources.USER), this.quill.setSelection(n.index + 1, n.length, D.sources.SILENT);
          } else if (o > 0) {
            l += t.length();
            const u = new W().retain(l).insert(`
`);
            this.quill.updateContents(u, D.sources.USER), this.quill.setSelection(l, D.sources.USER);
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
        t.shiftKey ? this.quill.setSelection(s - 1, D.sources.USER) : this.quill.setSelection(s + r.length(), D.sources.USER);
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
        this.quill.insertText(n.index, " ", D.sources.USER), this.quill.history.cutoff();
        const o = new W().retain(n.index - s).delete(t + 1).retain(r.length() - 2 - s).retain(1, {
          list: i
        });
        return this.quill.updateContents(o, D.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index - t, D.sources.SILENT), !1;
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
            return this.quill.updateContents(i, D.sources.USER), this.quill.setSelection(n.index - 1, D.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": Wr("ArrowLeft", !1),
    "embed left shift": Wr("ArrowLeft", !0),
    "embed right": Wr("ArrowRight", !1),
    "embed right shift": Wr("ArrowRight", !0),
    "table down": to(!1),
    "table up": to(!0)
  }
};
gs.DEFAULTS = og;
function eo(n) {
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
        this.quill.insertText(e.index, i, D.sources.USER), this.quill.setSelection(e.index + i.length, D.sources.SILENT);
        return;
      }
      const o = e.length === 0 ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
      let {
        index: l,
        length: u
      } = e;
      o.forEach((d, p) => {
        n ? (d.insertAt(0, i), p === 0 ? l += i.length : u += i.length) : d.domNode.textContent.startsWith(i) && (d.deleteAt(0, i.length), p === 0 ? l -= i.length : u -= i.length);
      }), this.quill.update(D.sources.USER), this.quill.setSelection(l, u, D.sources.SILENT);
    }
  };
}
function Wr(n, e) {
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
      return i instanceof Qe ? (n === "ArrowLeft" ? e ? this.quill.setSelection(r.index - 1, r.length + 1, D.sources.USER) : this.quill.setSelection(r.index - 1, D.sources.USER) : e ? this.quill.setSelection(r.index, r.length + 1, D.sources.USER) : this.quill.setSelection(r.index + r.length + 1, D.sources.USER), !1) : !0;
    }
  };
}
function fi(n) {
  return {
    key: n[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(n, !t.format[n], D.sources.USER);
    }
  };
}
function to(n) {
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
          this.quill.setSelection(u, 0, D.sources.USER);
        }
      } else {
        const o = s.table()[r];
        o != null && (n ? this.quill.setSelection(o.offset(this.quill.scroll) + o.length() - 1, 0, D.sources.USER) : this.quill.setSelection(o.offset(this.quill.scroll), 0, D.sources.USER));
      }
      return !1;
    }
  };
}
function lg(n) {
  if (typeof n == "string" || typeof n == "number")
    n = {
      key: n
    };
  else if (typeof n == "object")
    n = Fn(n);
  else
    return null;
  return n.shortKey && (n[ag] = n.shortKey, delete n.shortKey), n;
}
function ea(n) {
  let {
    quill: e,
    range: t
  } = n;
  const r = e.getLines(t);
  let s = {};
  if (r.length > 1) {
    const i = r[0].formats(), o = r[r.length - 1].formats();
    s = st.AttributeMap.diff(o, i) || {};
  }
  e.deleteText(t, D.sources.USER), Object.keys(s).length > 0 && e.formatLine(t.index, 1, s, D.sources.USER), e.setSelection(t.index, D.sources.SILENT);
}
function ug(n, e, t, r) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? r === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const cg = /font-weight:\s*normal/, dg = ["P", "OL", "UL"], no = (n) => n && dg.includes(n.tagName), hg = (n) => {
  Array.from(n.querySelectorAll("br")).filter((e) => no(e.previousElementSibling) && no(e.nextElementSibling)).forEach((e) => {
    e.parentNode?.removeChild(e);
  });
}, fg = (n) => {
  Array.from(n.querySelectorAll('b[style*="font-weight"]')).filter((e) => e.getAttribute("style")?.match(cg)).forEach((e) => {
    const t = n.createDocumentFragment();
    t.append(...e.childNodes), e.parentNode?.replaceChild(t, e);
  });
};
function pg(n) {
  n.querySelector('[id^="docs-internal-guid-"]') && (fg(n), hg(n));
}
const mg = /\bmso-list:[^;]*ignore/i, gg = /\bmso-list:[^;]*\bl(\d+)/i, bg = /\bmso-list:[^;]*\blevel(\d+)/i, yg = (n, e) => {
  const t = n.getAttribute("style"), r = t?.match(gg);
  if (!r)
    return null;
  const s = Number(r[1]), i = t?.match(bg), o = i ? Number(i[1]) : 1, l = new RegExp(`@list l${s}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), u = e.match(l), d = u && u[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: s,
    indent: o,
    type: d,
    element: n
  };
}, vg = (n) => {
  const e = Array.from(n.querySelectorAll("[style*=mso-list]")), t = [], r = [];
  e.forEach((o) => {
    (o.getAttribute("style") || "").match(mg) ? t.push(o) : r.push(o);
  }), t.forEach((o) => o.parentNode?.removeChild(o));
  const s = n.documentElement.innerHTML, i = r.map((o) => yg(o, s)).filter((o) => o);
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
function xg(n) {
  n.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && vg(n);
}
const wg = [xg, pg], Ag = (n) => {
  n.documentElement && wg.forEach((e) => {
    e(n);
  });
}, Eg = Ft("quill:clipboard"), Ng = [[Node.TEXT_NODE, Bg], [Node.TEXT_NODE, so], ["br", _g], [Node.ELEMENT_NODE, so], [Node.ELEMENT_NODE, Lg], [Node.ELEMENT_NODE, kg], [Node.ELEMENT_NODE, $g], ["li", Og], ["ol, ul", Rg], ["pre", qg], ["tr", Dg], ["b", pi("bold")], ["i", pi("italic")], ["strike", pi("strike")], ["style", Ig]], Tg = [tg, Tl].reduce((n, e) => (n[e.keyName] = e, n), {}), ro = [El, Xi, Yi, Cl, _l, Il].reduce((n, e) => (n[e.keyName] = e, n), {});
class Sg extends At {
  static DEFAULTS = {
    matchers: []
  };
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (r) => this.onCaptureCopy(r, !1)), this.quill.root.addEventListener("cut", (r) => this.onCaptureCopy(r, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], Ng.concat(this.options.matchers ?? []).forEach((r) => {
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
    return Er(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || s.table) ? i.compose(new W().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(e) {
    Ag(e);
  }
  convertHTML(e) {
    const t = new DOMParser().parseFromString(e, "text/html");
    this.normalizeHTML(t);
    const r = t.body, s = /* @__PURE__ */ new WeakMap(), [i, o] = this.prepareMatching(r, s);
    return ta(this.quill.scroll, r, i, o, s);
  }
  dangerouslyPasteHTML(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : D.sources.API;
    if (typeof e == "string") {
      const s = this.convert({
        html: e,
        text: ""
      });
      this.quill.setContents(s, t), this.quill.setSelection(0, D.sources.SILENT);
    } else {
      const s = this.convert({
        html: t,
        text: ""
      });
      this.quill.updateContents(new W().retain(e).concat(s), r), this.quill.setSelection(e + s.length(), D.sources.SILENT);
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
    e.clipboardData?.setData("text/plain", i), e.clipboardData?.setData("text/html", s), t && ea({
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
    Eg.log("onPaste", o, {
      text: r,
      html: s
    });
    const l = new W().retain(e.index).delete(e.length).concat(o);
    this.quill.updateContents(l, D.sources.USER), this.quill.setSelection(l.length() - e.length, D.sources.SILENT), this.quill.scrollSelectionIntoView();
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
  }, new W()) : n;
}
function Er(n, e) {
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
  return t && t.prototype instanceof Qe ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(n.tagName.toLowerCase());
}
function Cg(n, e) {
  return n.previousElementSibling && n.nextElementSibling && !Kt(n.previousElementSibling, e) && !Kt(n.nextElementSibling, e);
}
const Zr = /* @__PURE__ */ new WeakMap();
function Ol(n) {
  return n == null ? !1 : (Zr.has(n) || (n.tagName === "PRE" ? Zr.set(n, !0) : Zr.set(n, Ol(n.parentNode))), Zr.get(n));
}
function ta(n, e, t, r, s) {
  return e.nodeType === e.TEXT_NODE ? r.reduce((i, o) => o(e, i, n), new W()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, o) => {
    let l = ta(n, o, t, r, s);
    return o.nodeType === e.ELEMENT_NODE && (l = t.reduce((u, d) => d(o, u, n), l), l = (s.get(o) || []).reduce((u, d) => d(o, u, n), l)), i.concat(l);
  }, new W()) : new W();
}
function pi(n) {
  return (e, t, r) => wn(t, n, !0, r);
}
function kg(n, e, t) {
  const r = xt.keys(n), s = ht.keys(n), i = Qt.keys(n), o = {};
  return r.concat(s).concat(i).forEach((l) => {
    let u = t.query(l, Z.ATTRIBUTE);
    u != null && (o[u.attrName] = u.value(n), o[u.attrName]) || (u = Tg[l], u != null && (u.attrName === l || u.keyName === l) && (o[u.attrName] = u.value(n) || void 0), u = ro[l], u != null && (u.attrName === l || u.keyName === l) && (u = ro[l], o[u.attrName] = u.value(n) || void 0));
  }), Object.entries(o).reduce((l, u) => {
    let [d, p] = u;
    return wn(l, d, p, t);
  }, e);
}
function Lg(n, e, t) {
  const r = t.query(n);
  if (r == null) return e;
  if (r.prototype instanceof Qe) {
    const s = {}, i = r.value(n);
    if (i != null)
      return s[r.blotName] = i, new W().insert(s, r.formats(n, t));
  } else if (r.prototype instanceof br && !Er(e, `
`) && e.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return wn(e, r.blotName, r.formats(n, t), t);
  return e;
}
function _g(n, e) {
  return Er(e, `
`) || e.insert(`
`), e;
}
function qg(n, e, t) {
  const r = t.query("code-block"), s = r && "formats" in r && typeof r.formats == "function" ? r.formats(n, t) : !0;
  return wn(e, "code-block", s, t);
}
function Ig() {
  return new W();
}
function Og(n, e, t) {
  const r = t.query(n);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !Er(e, `
`))
    return e;
  let s = -1, i = n.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (s += 1), i = i.parentNode;
  return s <= 0 ? e : e.reduce((o, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? o.push(l) : o.insert(l.insert, {
    indent: s,
    ...l.attributes || {}
  }) : o, new W());
}
function Rg(n, e, t) {
  const r = n;
  let s = r.tagName === "OL" ? "ordered" : "bullet";
  const i = r.getAttribute("data-checked");
  return i && (s = i === "true" ? "checked" : "unchecked"), wn(e, "list", s, t);
}
function so(n, e, t) {
  if (!Er(e, `
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
        if (s && s.prototype instanceof rt)
          return e.insert(`
`);
        r = r.firstChild;
      }
    }
  }
  return e;
}
function $g(n, e, t) {
  const r = {}, s = n.style || {};
  return s.fontStyle === "italic" && (r.italic = !0), s.textDecoration === "underline" && (r.underline = !0), s.textDecoration === "line-through" && (r.strike = !0), (s.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(s.fontWeight, 10) >= 700) && (r.bold = !0), e = Object.entries(r).reduce((i, o) => {
    let [l, u] = o;
    return wn(i, l, u, t);
  }, e), parseFloat(s.textIndent || 0) > 0 ? new W().insert("	").concat(e) : e;
}
function Dg(n, e, t) {
  const r = n.parentElement?.tagName === "TABLE" ? n.parentElement : n.parentElement?.parentElement;
  if (r != null) {
    const i = Array.from(r.querySelectorAll("tr")).indexOf(n) + 1;
    return wn(e, "table", i, t);
  }
  return e;
}
function Bg(n, e, t) {
  let r = n.data;
  if (n.parentElement?.tagName === "O:P")
    return e.insert(r.trim());
  if (!Ol(n)) {
    if (r.trim().length === 0 && r.includes(`
`) && !Cg(n, t))
      return e;
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (n.previousSibling == null && n.parentElement != null && Kt(n.parentElement, t) || n.previousSibling instanceof Element && Kt(n.previousSibling, t)) && (r = r.replace(/^ /, "")), (n.nextSibling == null && n.parentElement != null && Kt(n.parentElement, t) || n.nextSibling instanceof Element && Kt(n.nextSibling, t)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return e.insert(r);
}
class Fg extends At {
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
    super(e, t), this.quill.on(D.events.EDITOR_CHANGE, (r, s, i, o) => {
      r === D.events.SELECTION_CHANGE ? s && o !== D.sources.SILENT && (this.currentRange = s) : r === D.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || o === D.sources.USER ? this.record(s, i) : this.transform(s)), this.currentRange = Oi(this.currentRange, s));
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
      range: Oi(r.range, i)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(r.delta, D.sources.USER), this.ignoreChange = !1, this.restoreSelection(r);
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
    io(this.stack.undo, e), io(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, D.sources.USER);
    else {
      const t = Pg(this.quill.scroll, e.delta);
      this.quill.setSelection(t, D.sources.USER);
    }
  }
}
function io(n, e) {
  let t = e;
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const s = n[r];
    n[r] = {
      delta: t.transform(s.delta, !0),
      range: s.range && Oi(s.range, t)
    }, t = s.delta.transform(t), n[r].delta.length() === 0 && n.splice(r, 1);
  }
}
function Mg(n, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((r) => n.query(r, Z.BLOCK) != null) : !1;
}
function Pg(n, e) {
  const t = e.reduce((s, i) => s + (i.delete || 0), 0);
  let r = e.length() - t;
  return Mg(n, e) && (r -= 1), r;
}
function Oi(n, e) {
  if (!n) return n;
  const t = e.transformPosition(n.index), r = e.transformPosition(n.index + n.length);
  return {
    index: t,
    length: r - t
  };
}
class Rl extends At {
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
Rl.DEFAULTS = {
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
      }), new W().retain(n.index).delete(n.length));
      this.quill.updateContents(s, G.sources.USER), this.quill.setSelection(n.index + r.length, G.sources.SILENT);
    });
  }
};
const jg = ["insertText", "insertReplacementText"];
class Ug extends At {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("beforeinput", (r) => {
      this.handleBeforeInput(r);
    }), /Android/i.test(navigator.userAgent) || e.on(D.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(e) {
    ea({
      range: e,
      quill: this.quill
    });
  }
  replaceText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (e.length === 0) return !1;
    if (t) {
      const r = this.quill.getFormat(e.index, 1);
      this.deleteRange(e), this.quill.updateContents(new W().retain(e.index).insert(t, r), D.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, D.sources.SILENT), !0;
  }
  handleBeforeInput(e) {
    if (this.quill.composition.isComposing || e.defaultPrevented || !jg.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const r = Vg(e);
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
function Vg(n) {
  return typeof n.data == "string" ? n.data : n.dataTransfer?.types.includes("text/plain") ? n.dataTransfer.getData("text/plain") : null;
}
const zg = /Mac/i.test(navigator.platform), Hg = 100, Kg = (n) => !!(n.key === "ArrowLeft" || n.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
n.key === "ArrowUp" || n.key === "ArrowDown" || n.key === "Home" || zg && n.key === "a" && n.ctrlKey === !0);
class Gg extends At {
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
        return i && s.key !== "ArrowRight" || !i && s.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (s.shiftKey ? 1 : 0), D.sources.USER), !1);
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
    const r = this.quill.scroll.find(t.startContainer);
    if (!(r instanceof ct) || !r.uiNode) return;
    const s = document.createRange();
    s.setStartAfter(r.uiNode), s.setEndAfter(r.uiNode), e.removeAllRanges(), e.addRange(s);
  }
}
D.register({
  "blots/block": $e,
  "blots/block/embed": rt,
  "blots/break": ft,
  "blots/container": vn,
  "blots/cursor": lt,
  "blots/embed": Wi,
  "blots/inline": He,
  "blots/scroll": eg,
  "blots/text": dt,
  "modules/clipboard": Sg,
  "modules/history": Fg,
  "modules/keyboard": gs,
  "modules/uploader": Rl,
  "modules/input": Ug,
  "modules/uiNode": Gg
});
class Wg extends ht {
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
const Zg = new Wg("indent", "ql-indent", {
  scope: Z.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Yg extends $e {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class Xg extends $e {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
class Nr extends vn {
}
Nr.blotName = "list-container";
Nr.tagName = "OL";
class Tr extends $e {
  static create(e) {
    const t = super.create();
    return t.setAttribute("data-list", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-list") || void 0;
  }
  static register() {
    D.register(Nr);
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
Tr.blotName = "list";
Tr.tagName = "LI";
Nr.allowedChildren = [Tr];
Tr.requiredContainer = Nr;
class na extends He {
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
class Qg extends na {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class is extends He {
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
    return $l(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
  }
  format(e, t) {
    e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
  }
}
function $l(n, e) {
  const t = document.createElement("a");
  t.href = n;
  const r = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(r) > -1;
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
class e1 extends na {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class t1 extends He {
  static blotName = "underline";
  static tagName = "U";
}
class n1 extends Wi {
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
const ao = ["alt", "height", "width"];
let r1 = class extends Qe {
  static blotName = "image";
  static tagName = "IMG";
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return ao.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static match(e) {
    return /\.(jpe?g|gif|png)$/.test(e) || /^data:image\/.+;base64/.test(e);
  }
  static sanitize(e) {
    return $l(e, ["http", "https", "data"]) ? e : "//:0";
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    ao.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
};
const oo = ["height", "width"];
class s1 extends rt {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return oo.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static sanitize(e) {
    return is.sanitize(e);
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    oo.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
  html() {
    const {
      video: e
    } = this.value();
    return `<a href="${e}">${e}</a>`;
  }
}
const lr = new ht("code-token", "hljs", {
  scope: Z.INLINE
});
class Dt extends He {
  static formats(e, t) {
    for (; e != null && e !== t.domNode; ) {
      if (e.classList && e.classList.contains(Ke.className))
        return super.formats(e, t);
      e = e.parentNode;
    }
  }
  constructor(e, t, r) {
    super(e, t, r), lr.add(this.domNode, r);
  }
  format(e, t) {
    e !== Dt.blotName ? super.format(e, t) : t ? lr.add(this.domNode, t) : (lr.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), lr.value(this.domNode) || this.unwrap();
  }
}
Dt.blotName = "code-token";
Dt.className = "ql-token";
class nt extends Ke {
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
    return this.formatAt(0, this.length(), Dt.blotName, !1), super.replaceWith(e, t);
  }
}
class hr extends xn {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(e, t) {
    e === nt.blotName && (this.forceNext = !0, this.children.forEach((r) => {
      r.format(e, t);
    }));
  }
  formatAt(e, t, r, s) {
    r === nt.blotName && (this.forceNext = !0), super.formatAt(e, t, r, s);
  }
  highlight(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const s = `${Array.from(this.domNode.childNodes).filter((o) => o !== this.uiNode).map((o) => o.textContent).join(`
`)}
`, i = nt.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== s) {
      if (s.trim().length > 0 || this.cachedText == null) {
        const o = this.children.reduce((u, d) => u.concat(xl(d, !1)), new W()), l = e(s, i);
        o.diff(l).reduce((u, d) => {
          let {
            retain: p,
            attributes: b
          } = d;
          return p ? (b && Object.keys(b).forEach((h) => {
            [nt.blotName, Dt.blotName].includes(h) && this.formatAt(u, p, h, b[h]);
          }), u + p) : u;
        }, 0);
      }
      this.cachedText = s, this.forceNext = !1;
    }
  }
  html(e, t) {
    const [r] = this.children.find(e);
    return `<pre data-language="${r ? nt.formats(r.domNode) : "plain"}">
${ms(this.code(e, t))}
</pre>`;
  }
  optimize(e) {
    if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
      const t = nt.formats(this.children.head.domNode);
      t !== this.uiNode.value && (this.uiNode.value = t);
    }
  }
}
hr.allowedChildren = [nt];
nt.requiredContainer = hr;
nt.allowedChildren = [Dt, lt, dt, ft];
const i1 = (n, e, t) => {
  if (typeof n.versionString == "string") {
    const r = n.versionString.split(".")[0];
    if (parseInt(r, 10) >= 11)
      return n.highlight(t, {
        language: e
      }).value;
  }
  return n.highlight(e, t).value;
};
class Dl extends At {
  static register() {
    D.register(Dt, !0), D.register(nt, !0), D.register(hr, !0);
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
    this.quill.on(D.events.SCROLL_BLOT_MOUNT, (e) => {
      if (!(e instanceof hr)) return;
      const t = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((r) => {
        let {
          key: s,
          label: i
        } = r;
        const o = t.ownerDocument.createElement("option");
        o.textContent = i, o.setAttribute("value", s), t.appendChild(o);
      }), t.addEventListener("change", () => {
        e.format(nt.blotName, t.value), this.quill.root.focus(), this.highlight(e, !0);
      }), e.uiNode == null && (e.attachUI(t), e.children.head && (t.value = nt.formats(e.children.head.domNode)));
    });
  }
  initTimer() {
    let e = null;
    this.quill.on(D.events.SCROLL_OPTIMIZE, () => {
      e && clearTimeout(e), e = setTimeout(() => {
        this.highlight(), e = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(D.sources.USER);
    const r = this.quill.getSelection();
    (e == null ? this.quill.scroll.descendants(hr) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update(D.sources.SILENT), r != null && this.quill.setSelection(r, D.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return ms(e).split(`
`).reduce((s, i, o) => (o !== 0 && s.insert(`
`, {
        [Ke.blotName]: t
      }), s.insert(i)), new W());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(Ke.className), r.innerHTML = i1(this.options.hljs, t, e), ta(this.quill.scroll, r, [(s, i) => {
      const o = lr.value(s);
      return o ? i.compose(new W().retain(i.length(), {
        [Dt.blotName]: o
      })) : i;
    }], [(s, i) => s.data.split(`
`).reduce((o, l, u) => (u !== 0 && o.insert(`
`, {
      [Ke.blotName]: t
    }), o.insert(l)), i)], /* @__PURE__ */ new WeakMap());
  }
}
Dl.DEFAULTS = {
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
class ut extends $e {
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
class Wt extends vn {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class as extends vn {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const e = this.descendants(mn), t = e.reduce((r, s) => Math.max(s.children.length, r), 0);
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
    const r = ra(), s = this.scroll.create(mn.blotName);
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
as.allowedChildren = [Wt];
Wt.requiredContainer = as;
Wt.allowedChildren = [mn];
mn.requiredContainer = Wt;
mn.allowedChildren = [ut];
ut.requiredContainer = mn;
function ra() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class a1 extends At {
  static register() {
    D.register(ut), D.register(mn), D.register(Wt), D.register(as);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(as).forEach((e) => {
      e.balanceCells();
    });
  }
  deleteColumn() {
    const [e, , t] = this.getTable();
    t != null && (e.deleteColumn(t.cellOffset()), this.quill.update(D.sources.USER));
  }
  deleteRow() {
    const [, e] = this.getTable();
    e != null && (e.remove(), this.quill.update(D.sources.USER));
  }
  deleteTable() {
    const [e] = this.getTable();
    if (e == null) return;
    const t = e.offset();
    e.remove(), this.quill.update(D.sources.USER), this.quill.setSelection(t, D.sources.SILENT);
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
    r.insertColumn(o + e), this.quill.update(D.sources.USER);
    let l = s.rowOffset();
    e === 0 && (l += 1), this.quill.setSelection(t.index + l, t.length, D.sources.SILENT);
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
    r.insertRow(o + e), this.quill.update(D.sources.USER), e > 0 ? this.quill.setSelection(t, D.sources.SILENT) : this.quill.setSelection(t.index + s.children.length, t.length, D.sources.SILENT);
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
        table: ra()
      });
    }, new W().retain(r.index));
    this.quill.updateContents(s, D.sources.USER), this.quill.setSelection(r.index, D.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(D.events.SCROLL_OPTIMIZE, (e) => {
      e.some((t) => ["TD", "TR", "TBODY", "TABLE"].includes(t.target.tagName) ? (this.quill.once(D.events.TEXT_CHANGE, (r, s, i) => {
        i === D.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const lo = Ft("quill:toolbar");
class sa extends At {
  constructor(e, t) {
    if (super(e, t), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), o1(r, this.options.container), e.container?.parentNode?.insertBefore(r, e.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      lo.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      const s = this.options.handlers?.[r];
      s && this.addHandler(r, s);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(D.events.EDITOR_CHANGE, () => {
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
      lo.warn("ignoring attaching to nonexistent format", t, e);
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
        this.quill.scroll.query(t).prototype instanceof Qe
      ) {
        if (i = prompt(`Enter ${t}`), !i) return;
        this.quill.updateContents(new W().retain(o.index).delete(o.length).insert({
          [t]: i
        }), D.sources.USER);
      } else
        this.quill.format(t, i, D.sources.USER);
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
sa.DEFAULTS = {};
function uo(n, e, t) {
  const r = document.createElement("button");
  r.setAttribute("type", "button"), r.classList.add(`ql-${e}`), r.setAttribute("aria-pressed", "false"), t != null ? (r.value = t, r.setAttribute("aria-label", `${e}: ${t}`)) : r.setAttribute("aria-label", e), n.appendChild(r);
}
function o1(n, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const r = document.createElement("span");
    r.classList.add("ql-formats"), t.forEach((s) => {
      if (typeof s == "string")
        uo(r, s);
      else {
        const i = Object.keys(s)[0], o = s[i];
        Array.isArray(o) ? l1(r, i, o) : uo(r, i, o);
      }
    }), n.appendChild(r);
  });
}
function l1(n, e, t) {
  const r = document.createElement("select");
  r.classList.add(`ql-${e}`), t.forEach((s) => {
    const i = document.createElement("option");
    s !== !1 ? i.setAttribute("value", String(s)) : i.setAttribute("selected", "selected"), r.appendChild(i);
  }), n.appendChild(r);
}
sa.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const n = this.quill.getSelection();
      if (n != null)
        if (n.length === 0) {
          const e = this.quill.getFormat();
          Object.keys(e).forEach((t) => {
            this.quill.scroll.query(t, Z.INLINE) != null && this.quill.format(t, !1, D.sources.USER);
          });
        } else
          this.quill.removeFormat(n.index, n.length, D.sources.USER);
    },
    direction(n) {
      const {
        align: e
      } = this.quill.getFormat();
      n === "rtl" && e == null ? this.quill.format("align", "right", D.sources.USER) : !n && e === "right" && this.quill.format("align", !1, D.sources.USER), this.quill.format("direction", n, D.sources.USER);
    },
    indent(n) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e), r = parseInt(t.indent || 0, 10);
      if (n === "+1" || n === "-1") {
        let s = n === "+1" ? 1 : -1;
        t.direction === "rtl" && (s *= -1), this.quill.format("indent", r + s, D.sources.USER);
      }
    },
    link(n) {
      n === !0 && (n = prompt("Enter link URL:")), this.quill.format("link", n, D.sources.USER);
    },
    list(n) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e);
      n === "check" ? t.list === "checked" || t.list === "unchecked" ? this.quill.format("list", !1, D.sources.USER) : this.quill.format("list", "unchecked", D.sources.USER) : this.quill.format("list", n, D.sources.USER);
    }
  }
};
const u1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', c1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', d1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', h1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', f1 = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', p1 = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', m1 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', g1 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', co = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', b1 = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', y1 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', v1 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', x1 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', w1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', A1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', E1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', N1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', T1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', S1 = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', C1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', k1 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', L1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', _1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', q1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', I1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', O1 = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', R1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', $1 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', D1 = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', B1 = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', F1 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', M1 = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', P1 = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', vr = {
  align: {
    "": u1,
    center: c1,
    right: d1,
    justify: h1
  },
  background: f1,
  blockquote: p1,
  bold: m1,
  clean: g1,
  code: co,
  "code-block": co,
  color: b1,
  direction: {
    "": y1,
    rtl: v1
  },
  formula: x1,
  header: {
    1: w1,
    2: A1,
    3: E1,
    4: N1,
    5: T1,
    6: S1
  },
  italic: C1,
  image: k1,
  indent: {
    "+1": L1,
    "-1": _1
  },
  link: q1,
  list: {
    bullet: I1,
    check: O1,
    ordered: R1
  },
  script: {
    sub: $1,
    super: D1
  },
  strike: B1,
  table: F1,
  underline: M1,
  video: P1
}, j1 = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let ho = 0;
function fo(n, e) {
  n.setAttribute(e, `${n.getAttribute(e) !== "true"}`);
}
class bs {
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
    this.container.classList.toggle("ql-expanded"), fo(this.label, "aria-expanded"), fo(this.options, "aria-hidden");
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
    return e.classList.add("ql-picker-label"), e.innerHTML = j1, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
  }
  buildOptions() {
    const e = document.createElement("span");
    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${ho}`, ho += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
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
class Bl extends bs {
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
class Fl extends bs {
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
const U1 = (n) => {
  const {
    overflowY: e
  } = getComputedStyle(n, null);
  return e !== "visible" && e !== "clip";
};
class Ml {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, U1(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
const V1 = [!1, "center", "right", "justify"], z1 = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], H1 = [!1, "serif", "monospace"], K1 = ["1", "2", "3", !1], G1 = ["small", !1, "large", "huge"];
class Sr extends Gn {
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
      if (s.classList.contains("ql-align") && (s.querySelector("option") == null && ir(s, V1), typeof t.align == "object"))
        return new Fl(s, t.align);
      if (s.classList.contains("ql-background") || s.classList.contains("ql-color")) {
        const i = s.classList.contains("ql-background") ? "background" : "color";
        return s.querySelector("option") == null && ir(s, z1, i === "background" ? "#ffffff" : "#000000"), new Bl(s, t[i]);
      }
      return s.querySelector("option") == null && (s.classList.contains("ql-font") ? ir(s, H1) : s.classList.contains("ql-header") ? ir(s, K1) : s.classList.contains("ql-size") && ir(s, G1)), new bs(s);
    });
    const r = () => {
      this.pickers.forEach((s) => {
        s.update();
      });
    };
    this.quill.on(G.events.EDITOR_CHANGE, r);
  }
}
Sr.DEFAULTS = Gt({}, Gn.DEFAULTS, {
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
class Pl extends Ml {
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
        e = W1(e);
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
function W1(n) {
  let e = n.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || n.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return e ? `${e[1] || "https"}://www.youtube.com/embed/${e[2]}?showinfo=0` : (e = n.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${e[1] || "https"}://player.vimeo.com/video/${e[2]}/` : n;
}
function ir(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  e.forEach((r) => {
    const s = document.createElement("option");
    r === t ? s.setAttribute("selected", "selected") : s.setAttribute("value", String(r)), n.appendChild(s);
  });
}
const Z1 = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Y1 extends Pl {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(e, t) {
    super(e, t), this.quill.on(G.events.EDITOR_CHANGE, (r, s, i, o) => {
      if (r === G.events.SELECTION_CHANGE)
        if (s != null && s.length > 0 && o === G.sources.USER) {
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
class jl extends Sr {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Z1), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new Y1(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), vr), this.buildPickers(e.container.querySelectorAll("select"), vr));
  }
}
jl.DEFAULTS = Gt({}, Sr.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(n) {
          n ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, D.sources.USER);
        }
      }
    }
  }
});
const X1 = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Q1 extends Pl {
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
          const [s, i] = this.quill.scroll.descendant(is, e.index);
          if (s != null) {
            this.linkRange = new pn(e.index - i, s.length());
            const o = is.formats(s.domNode);
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
class Ul extends Sr {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = X1), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), vr), this.buildPickers(e.container.querySelectorAll("select"), vr), this.tooltip = new Q1(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, r) => {
      e.handlers.link.call(e, !r.format.link);
    }));
  }
}
Ul.DEFAULTS = Gt({}, Sr.DEFAULTS, {
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
            this.quill.format("link", !1, D.sources.USER);
        }
      }
    }
  }
});
D.register({
  "attributors/attribute/direction": Tl,
  "attributors/class/align": Al,
  "attributors/class/background": rg,
  "attributors/class/color": ng,
  "attributors/class/direction": Sl,
  "attributors/class/font": Ll,
  "attributors/class/size": ql,
  "attributors/style/align": El,
  "attributors/style/background": Xi,
  "attributors/style/color": Yi,
  "attributors/style/direction": Cl,
  "attributors/style/font": _l,
  "attributors/style/size": Il
}, !0);
D.register({
  "formats/align": Al,
  "formats/direction": Sl,
  "formats/indent": Zg,
  "formats/background": Xi,
  "formats/color": Yi,
  "formats/font": Ll,
  "formats/size": ql,
  "formats/blockquote": Yg,
  "formats/code-block": Ke,
  "formats/header": Xg,
  "formats/list": Tr,
  "formats/bold": na,
  "formats/code": Qi,
  "formats/italic": Qg,
  "formats/link": is,
  "formats/script": Jg,
  "formats/strike": e1,
  "formats/underline": t1,
  "formats/formula": n1,
  "formats/image": r1,
  "formats/video": s1,
  "modules/syntax": Dl,
  "modules/table": a1,
  "modules/toolbar": sa,
  "themes/bubble": jl,
  "themes/snow": Ul,
  "ui/icons": vr,
  "ui/picker": bs,
  "ui/icon-picker": Fl,
  "ui/color-picker": Bl,
  "ui/tooltip": Ml
}, !0);
const J1 = { class: "rounded-lg border" }, eb = /* @__PURE__ */ Ne({
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
    xr(() => {
      s.value && (i = new D(s.value, {
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
    }), Eo(() => {
      i = null;
    }), Rt(
      () => t.modelValue,
      (u) => {
        i && i.root.innerHTML !== u && (i.root.innerHTML = u || "");
      }
    ), Rt(
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
    return (u, d) => (I(), F("div", J1, [
      x("div", {
        ref_key: "root",
        ref: s,
        class: "min-h-[260px]"
      }, null, 512)
    ]));
  }
}), tb = /* @__PURE__ */ Ne({
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
    return (r, s) => (I(), Le(eb, {
      "model-value": n.modelValue,
      "subir-imagen": n.uploadImage,
      disabled: n.disabled,
      "onUpdate:modelValue": s[0] || (s[0] = (i) => t("update:modelValue", i))
    }, null, 8, ["model-value", "subir-imagen", "disabled"]));
  }
}), nb = ["value", "disabled"], rb = ["value"], sb = /* @__PURE__ */ Ne({
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
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onChange: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, [
      s[1] || (s[1] = x("option", { value: "" }, "Selecciona una opción", -1)),
      (I(!0), F(_e, null, Re(n.options, (i) => (I(), F("option", {
        key: i,
        value: i
      }, Q(i), 9, rb))), 128))
    ], 40, nb));
  }
}), ib = ["value", "rows", "placeholder", "disabled"], ab = /* @__PURE__ */ Ne({
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
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, ib));
  }
}), ob = ["value", "placeholder", "disabled"], po = /* @__PURE__ */ Ne({
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
      class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
      onInput: s[0] || (s[0] = (i) => t("update:modelValue", i.target.value))
    }, null, 40, ob));
  }
}), lb = {
  key: 2,
  class: "space-y-1"
}, ub = {
  key: 0,
  class: "text-xs"
}, mo = /* @__PURE__ */ Ne({
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
      n.field.type === "text" ? (I(), Le(po, {
        key: 0,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[0] || (d[0] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "date" ? (I(), Le(Dc, {
        key: 1,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[1] || (d[1] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "numeric" || n.field.type === "id" ? (I(), F("div", lb, [
        Ze(Zc, {
          "model-value": o(),
          placeholder: n.field.placeholder || "",
          disabled: n.disabled || n.isAutoId,
          step: n.field.type === "id" ? "1" : "any",
          min: n.field.type === "id" ? 1 : null,
          "onUpdate:modelValue": d[2] || (d[2] = (p) => r("update:modelValue", p))
        }, null, 8, ["model-value", "placeholder", "disabled", "step", "min"]),
        n.isAutoId ? (I(), F("p", ub, " Se genera automáticamente al crear el documento. ")) : te("", !0)
      ])) : n.field.type === "textarea" ? (I(), Le(ab, {
        key: 3,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[3] || (d[3] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"])) : n.field.type === "select" ? (I(), Le(sb, {
        key: 4,
        "model-value": s(),
        options: n.field.options || [],
        disabled: n.disabled,
        "onUpdate:modelValue": d[4] || (d[4] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "disabled"])) : n.field.type === "document" ? (I(), Le(jc, {
        key: 5,
        "model-value": s(),
        options: n.documentOptions,
        hint: n.documentHint,
        disabled: n.disabled,
        "onUpdate:modelValue": d[5] || (d[5] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "options", "hint", "disabled"])) : n.field.type === "boolean" ? (I(), Le(cc, {
        key: 6,
        "model-value": i(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[6] || (d[6] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "image" ? (I(), Le(Gc, {
        key: 7,
        "model-value": s(),
        disabled: n.disabled,
        "onUpdate:file": d[7] || (d[7] = (p) => r("update:file", p)),
        onRemove: d[8] || (d[8] = (p) => r("remove-image"))
      }, null, 8, ["model-value", "disabled"])) : n.field.type === "array" || n.field.type === "map" ? (I(), Le(Rc, {
        key: 8,
        field: n.field,
        "model-value": l(),
        disabled: n.disabled,
        "onUpdate:modelValue": d[9] || (d[9] = (p) => r("update:modelValue", p))
      }, null, 8, ["field", "model-value", "disabled"])) : n.field.type === "richtext" ? (I(), Le(tb, {
        key: 9,
        "model-value": s(),
        "upload-image": n.uploadImage,
        disabled: n.disabled,
        "onUpdate:modelValue": d[10] || (d[10] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "upload-image", "disabled"])) : (I(), Le(po, {
        key: 10,
        "model-value": s(),
        placeholder: n.field.placeholder || "",
        disabled: n.disabled,
        "onUpdate:modelValue": d[11] || (d[11] = (p) => r("update:modelValue", p))
      }, null, 8, ["model-value", "placeholder", "disabled"]))
    ]));
  }
}), cb = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};
async function db(n, e = {}) {
  if (!n.type.startsWith("image/"))
    return n;
  const t = { ...cb, ...e }, r = await fb(n), { width: s, height: i } = hb(r.width, r.height, t.maxWidth, t.maxHeight), o = document.createElement("canvas");
  o.width = s, o.height = i;
  const l = o.getContext("2d");
  if (!l)
    return n;
  l.drawImage(r, 0, 0, s, i);
  let u = t.quality, d = await go(o, n.type || "image/jpeg", u);
  const p = t.targetSizeKb * 1024;
  for (; d.size > p && u > 0.45; )
    u -= 0.08, d = await go(o, n.type || "image/jpeg", u);
  return d;
}
function hb(n, e, t, r) {
  let s = n, i = e;
  return s > t && (i = Math.round(i * t / s), s = t), i > r && (s = Math.round(s * r / i), i = r), { width: s, height: i };
}
function go(n, e, t) {
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
function fb(n) {
  return new Promise((e, t) => {
    const r = new Image(), s = URL.createObjectURL(n);
    r.onload = () => {
      URL.revokeObjectURL(s), e(r);
    }, r.onerror = () => {
      URL.revokeObjectURL(s), t(new Error("No fue posible leer la imagen."));
    }, r.src = s;
  });
}
async function pb(n, e, t) {
  const { storage: r } = Ce(), s = tu(r, n);
  return await nu(s, e, t), ru(s);
}
async function bo(n, e, t = {}) {
  const r = await db(e, {
    maxWidth: t.maxWidth,
    maxHeight: t.maxHeight,
    quality: t.quality,
    targetSizeKb: t.targetSizeKb
  });
  return pb(n, r, t.metadata);
}
async function mb(n, e) {
  const { firestore: t } = Ce(), r = await wb(n, e);
  return (await Ql(dn(t, n.collectionName), {
    ...r,
    createdAt: Ye(),
    updatedAt: Ye()
  })).id;
}
async function yo(n, e = 100) {
  const { firestore: t } = Ce();
  try {
    const r = Ri(
      dn(t, n.collectionName),
      $i("createdAt", "desc"),
      So(e)
    );
    return (await Un(r)).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  } catch {
    return (await Un(dn(t, n.collectionName))).docs.map((s) => ({
      id: s.id,
      data: s.data()
    }));
  }
}
async function gb(n, e) {
  const { firestore: t } = Ce();
  await Jl(Yt(t, n.collectionName, e));
}
async function bb(n, e, t) {
  const { firestore: r } = Ce(), s = Ab(n, t);
  await To(Yt(r, n.collectionName, e), {
    ...s,
    updatedAt: Ye()
  });
}
const Vl = "main", yb = "schema";
async function vb(n, e, t = Vl) {
  const { firestore: r } = Ce(), s = n.dictionaryDocumentId || t, i = zl(n), o = Yt(r, n.collectionName, s), l = await os(o), u = {
    updatedAt: Ye(),
    createdAt: l.exists() ? l.data().createdAt : Ye()
  };
  if (i)
    u[i] = e;
  else
    for (const [d, p] of Object.entries(e))
      u[d] = p;
  return await Jr(
    o,
    u,
    { merge: !0 }
  ), s;
}
async function xb(n, e = Vl) {
  const { firestore: t } = Ce(), r = n.dictionaryDocumentId || e, s = await os(Yt(t, n.collectionName, r));
  if (!s.exists())
    return null;
  const i = s.data(), o = zl(n), l = o ? i[o] : null;
  return l && typeof l == "object" && !Array.isArray(l) ? {
    id: s.id,
    data: l
  } : {
    id: s.id,
    data: i
  };
}
function zl(n) {
  return n.storageType !== "dictionary" ? "" : typeof n.dictionaryRootKey == "string" && n.dictionaryRootKey.trim() ? n.dictionaryRootKey.trim() : yb;
}
async function wb(n, e) {
  const t = Hl(n);
  if (!t.length)
    return { ...e };
  const { firestore: r } = Ce(), s = { ...e };
  for (const i of t) {
    if (i.type === "id") {
      s[i.key] = await Nb(r, n.collectionName, i.key);
      continue;
    }
    if (i.type === "date") {
      s[i.key] = /* @__PURE__ */ new Date();
      continue;
    }
  }
  return s;
}
function Ab(n, e) {
  const t = Hl(n);
  if (!t.length)
    return { ...e };
  const r = { ...e };
  for (const s of t)
    delete r[s.key];
  return r;
}
function Hl(n) {
  return n.storageType !== "document" ? [] : n.fields.filter((e) => Eb(e));
}
function Eb(n) {
  return n.type === "id" ? !0 : typeof n.autogenerated == "boolean" ? n.autogenerated : !1;
}
async function Nb(n, e, t) {
  let r = 0;
  try {
    const o = (await Un(
      Ri(
        dn(n, e),
        $i(t, "desc"),
        So(1)
      )
    )).docs[0]?.data()?.[t], l = vo(o);
    l !== null && (r = l);
  } catch {
    r = 0;
  }
  if (r > 0)
    return r + 1;
  const s = await Un(dn(n, e));
  for (const i of s.docs) {
    const o = vo(i.data()?.[t]);
    o !== null && o > r && (r = o);
  }
  return r + 1;
}
function vo(n) {
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
function Tb(n) {
  return `${n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}-${Date.now().toString().slice(-6)}`;
}
const Sb = { class: "space-y-4" }, Cb = { class: "rounded-2xl border px-4 py-3 text-sm" }, kb = {
  key: 0,
  class: "mt-2 text-xs"
}, Lb = {
  key: 1,
  class: "mt-2 text-xs"
}, _b = { class: "rounded-2xl border p-5" }, qb = { class: "text-xl font-black" }, Ib = {
  key: 0,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, Ob = {
  key: 1,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, Rb = {
  key: 2,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, $b = { class: "block text-sm font-semibold" }, Db = {
  key: 0,
  class: "text-xs"
}, Bb = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, Fb = { class: "flex flex-wrap items-center gap-2" }, Mb = ["disabled"], Pb = ["disabled"], jb = { class: "mt-6 border-t pt-5" }, Ub = { class: "flex flex-wrap items-center justify-between gap-3" }, Vb = ["disabled"], zb = {
  key: 0,
  class: "mt-3 text-sm"
}, Hb = {
  key: 1,
  class: "mt-3 text-sm"
}, Kb = {
  key: 2,
  class: "mt-3 space-y-2"
}, Gb = { class: "text-sm font-semibold" }, Wb = { class: "text-xs" }, Zb = {
  key: 0,
  class: "flex items-center gap-2"
}, Yb = ["disabled", "onClick"], Xb = ["disabled", "onClick"], Qb = { class: "w-full max-w-2xl rounded-xl border p-5 shadow-2xl" }, Jb = { class: "block text-sm font-semibold" }, ey = {
  key: 0,
  class: "text-xs"
}, ty = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, ny = { class: "flex flex-wrap items-center gap-2" }, ry = ["disabled"], sy = /* @__PURE__ */ Ne({
  __name: "AdminBlogPage",
  setup(n) {
    const e = wr(), t = Hn(), r = ee([]), s = ee(""), i = ee(!1), o = ee(""), l = ee({}), u = ee({}), d = ee([]), p = ee(!1), b = ee(!1), h = ee(""), w = ee(""), E = ee({}), k = ee(""), _ = ee(!1), $ = je(() => Bn.value === "admin" || Bn.value === "writer" || Bn.value === "manager"), M = je(() => r.value.find((m) => m.id === s.value) ?? null), U = je(() => !!k.value);
    xr(async () => {
      await K();
    }), Rt(
      M,
      async (m) => {
        if (!m) {
          l.value = {}, u.value = {}, d.value = [], E.value = {}, k.value = "", _.value = !1;
          return;
        }
        m.storageType !== "dictionary" && (_.value = !1), y(m), await R(m), await N(m);
      },
      { immediate: !0 }
    ), Rt(
      () => e.query.schema,
      (m) => {
        typeof m == "string" && r.value.some((g) => g.id === m) && s.value !== m && (s.value = m);
      }
    );
    async function K() {
      i.value = !0, o.value = "";
      try {
        await H();
      } catch {
        o.value = "No se pudieron cargar los tipos de contenido.";
      } finally {
        i.value = !1;
      }
    }
    async function H() {
      const m = await Bi();
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
    async function R(m) {
      p.value = !0;
      try {
        if (m.storageType === "dictionary") {
          const q = await xb(m);
          d.value = q ? [q] : [], k.value = "", q && A(m, q);
          return;
        }
        const g = await yo(m, 100);
        d.value = g, k.value && !g.some((q) => q.id === k.value) && (k.value = "");
      } finally {
        p.value = !1;
      }
    }
    async function N(m) {
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
          const fe = r.value.find((De) => De.id === ne);
          if (!fe || fe.storageType !== "document") {
            q[B.key] = { options: [], byId: {} };
            return;
          }
          const qe = typeof B.documentLabelField == "string" && B.documentLabelField.trim() || fe.previewField || fe.slugFromField || fe.fields[0]?.key || "", an = await yo(fe, 200), jt = {}, on = an.map((De) => (jt[De.id] = De, {
            id: De.id,
            label: T(De, qe),
            hint: f(De)
          }));
          q[B.key] = { options: on, byId: jt };
        })
      ), E.value = q;
    }
    function T(m, g) {
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
        B.type === "boolean" ? q[B.key] = !!ne : B.type === "array" || B.type === "map" ? q[B.key] = J(B, ne) : B.type === "date" ? q[B.key] = Ct(ne) : B.type === "numeric" ? q[B.key] = pt(ne) : B.type === "id" ? q[B.key] = Ve(ne) : B.type === "document" ? q[B.key] = typeof ne == "string" ? ne : "" : typeof ne == "string" ? q[B.key] = ne : q[B.key] = "";
      }
      l.value = q;
    }
    function C(m) {
      const g = M.value;
      !g || g.storageType !== "document" || (y(g), A(g, m), k.value = m.id);
    }
    function j() {
      const m = M.value;
      !m || m.storageType !== "dictionary" || (d.value[0] ? A(m, d.value[0]) : y(m), w.value = "", _.value = !0);
    }
    function V() {
      _.value = !1, w.value = "";
    }
    function L() {
      const m = M.value;
      !m || m.storageType !== "document" || y(m);
    }
    async function S() {
      const m = M.value;
      if (m) {
        if (h.value = "", w.value = "", !$.value) {
          w.value = "Tu rol no tiene permisos para crear o editar contenido.";
          return;
        }
        b.value = !0;
        try {
          const g = {};
          for (const B of m.fields)
            Ae(m, B) || (g[B.key] = await P(m, B), z(m, B, g[B.key]));
          const q = m.storageType === "document" && !k.value;
          if ((m.storageType === "dictionary" || q) && Pt(m, g), m.slugFromField) {
            const B = g[m.slugFromField];
            typeof B == "string" && B.trim() && (g.slug = Tb(B));
          }
          m.storageType === "dictionary" ? (await vb(m, g), h.value = "Registro de diccionario actualizado.", _.value = !1) : (k.value ? (await bb(m, k.value, g), h.value = "Registro actualizado correctamente.") : (await mb(m, g), h.value = "Registro creado correctamente."), y(m)), await R(m);
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
          return oe(g.key);
        const B = St(q.name), ne = await bo(
          `${m.collectionName}/${g.key}/${Date.now()}-${B}`,
          q,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return l.value[g.key] = ne, u.value[g.key] = null, ne;
      }
      return g.type === "array" || g.type === "map" ? J(g, l.value[g.key], !0) : g.type === "date" ? ce(g.key) : g.type === "numeric" ? de(g.key) : g.type === "id" ? m.storageType === "document" && !k.value ? null : Ve(l.value[g.key]) : (g.type === "document", oe(g.key));
    }
    function z(m, g, q) {
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
          (fe, qe) => ge(
            m.itemSchema,
            fe,
            `${m.label}[${qe}]`,
            q
          )
        ) : ne;
      }
      const B = ie(g) ? g : {};
      return Array.isArray(m.mapFields) && m.mapFields.length > 0 ? Y(m.mapFields, B, m.label, q) : B;
    }
    function Y(m, g, q, B = !1) {
      const ne = {};
      for (const fe of m) {
        const qe = fe.key;
        if (!(qe in g)) {
          if (fe.required)
            throw new Error(`Falta la propiedad requerida "${q}.${qe}".`);
          continue;
        }
        ne[qe] = ge(fe, g[qe], `${q}.${qe}`, B);
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
        return !Array.isArray(m.mapFields) || m.mapFields.length === 0 ? g : Y(m.mapFields, g, q, B);
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
        const ne = kt(g);
        if (!ne)
          throw new Error(`"${q}" debe ser una fecha válida.`);
        return B ? ne : Ct(ne);
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
        if (!$.value) {
          w.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await gb(g, m), k.value === m && y(g), await R(g));
      }
    }
    async function re(m) {
      const g = M.value;
      if (!g)
        throw new Error("No hay schema seleccionado.");
      const q = St(m.name);
      return bo(
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
      return Ct(l.value[m]);
    }
    function ce(m) {
      return kt(l.value[m]);
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
      l.value[m] = Ct(g);
    }
    function Jt(m, g) {
      l.value[m] = pt(g);
    }
    function en(m) {
      return m.type === "boolean" ? Nn(m.key) : m.type === "array" || m.type === "map" ? nn(m.key) : m.type === "numeric" || m.type === "id" ? pe(m.key) : m.type === "date" ? le(m.key) : oe(m.key);
    }
    function An(m, g) {
      if (m.type === "boolean") {
        Je(m.key, !!g);
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
    function Et(m) {
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
    function Je(m, g) {
      l.value[m] = g;
    }
    function Nt(m, g) {
      u.value[m] = g;
    }
    function Tn(m) {
      l.value[m] = "", u.value[m] = null;
    }
    function Tt(m, g) {
      const q = g.previewField || g.slugFromField || g.fields[0]?.key;
      if (!q)
        return m.id;
      const B = m.data[q];
      if (g.fields.find((fe) => fe.key === q)?.type === "date") {
        const fe = Mt(B);
        if (fe)
          return fe;
      }
      return typeof B == "string" && B.trim() ? B : typeof B == "boolean" ? B ? "true" : "false" : typeof B == "number" && Number.isFinite(B) ? String(B) : Array.isArray(B) ? `[array:${B.length}]` : ie(B) ? "[map]" : m.id;
    }
    function St(m) {
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
    function Ct(m) {
      const g = kt(m);
      return g ? rn(g) : "";
    }
    function kt(m) {
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
        const q = Wn(g);
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
    function Wn(m) {
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
    function Mt(m) {
      const g = kt(m);
      if (!g)
        return "";
      const q = String(g.getUTCDate()).padStart(2, "0"), B = String(g.getUTCMonth() + 1).padStart(2, "0"), ne = String(g.getUTCFullYear()).padStart(4, "0");
      return `${q}/${B}/${ne}`;
    }
    function sn(m) {
      return m.type === "id" && M.value?.storageType === "document";
    }
    function Pt(m, g) {
      for (const q of m.fields)
        Ae(m, q) && q.type === "date" && (g[q.key] = /* @__PURE__ */ new Date());
    }
    return (m, g) => (I(), F("section", Sb, [
      x("article", Cb, [
        g[0] || (g[0] = Xe(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        g[1] || (g[1] = x("strong", null, "Esquemas", -1)),
        g[2] || (g[2] = Xe(". ", -1)),
        i.value ? (I(), F("p", kb, "Cargando formularios...")) : o.value ? (I(), F("p", Lb, Q(o.value), 1)) : te("", !0)
      ]),
      x("article", _b, [
        x("h3", qb, Q(M.value ? `Formulario y registros: ${M.value.title}` : "Formulario y registros"), 1),
        g[5] || (g[5] = x("p", { class: "mt-1 text-sm" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        $.value ? te("", !0) : (I(), F("p", Ib, " No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        w.value ? (I(), F("p", Ob, Q(w.value), 1)) : te("", !0),
        h.value ? (I(), F("p", Rb, Q(h.value), 1)) : te("", !0),
        M.value && M.value.storageType === "document" ? (I(), F("form", {
          key: 3,
          class: "mt-5 space-y-4",
          onSubmit: ur(S, ["prevent"])
        }, [
          (I(!0), F(_e, null, Re(we(M.value), (q) => (I(), F("div", {
            key: q.key,
            class: "space-y-1"
          }, [
            x("label", $b, Q(q.label), 1),
            q.helpText ? (I(), F("p", Db, Q(q.helpText), 1)) : te("", !0),
            Ze(mo, {
              field: q,
              "model-value": en(q),
              disabled: !$.value,
              "is-auto-id": sn(q),
              "document-options": tn(q),
              "document-hint": Et(q),
              "upload-image": re,
              "onUpdate:modelValue": (B) => An(q, B),
              "onUpdate:file": (B) => Nt(q.key, B),
              onRemoveImage: (B) => Tn(q.key)
            }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
          ]))), 128)),
          M.value.storageType === "document" && U.value ? (I(), F("p", Bb, " Editando registro: " + Q(k.value), 1)) : te("", !0),
          x("div", Fb, [
            x("button", {
              type: "submit",
              disabled: b.value || !$.value,
              class: "rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed"
            }, Q(b.value ? "Guardando..." : U.value ? "Guardar cambios" : "Crear documento"), 9, Mb),
            M.value.storageType === "document" && U.value ? (I(), F("button", {
              key: 0,
              type: "button",
              disabled: b.value || !$.value,
              class: "rounded-md border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50",
              onClick: L
            }, " Cancelar edición ", 8, Pb)) : te("", !0)
          ])
        ], 32)) : te("", !0),
        x("div", jb, [
          x("div", Ub, [
            g[3] || (g[3] = x("h4", { class: "text-sm font-black uppercase tracking-wide" }, "Registros guardados", -1)),
            M.value?.storageType === "dictionary" ? (I(), F("button", {
              key: 0,
              type: "button",
              disabled: !$.value || b.value,
              class: "rounded-md px-3 py-1 text-sm font-semibold disabled:cursor-not-allowed",
              onClick: j
            }, " + Nuevo ", 8, Vb)) : te("", !0)
          ]),
          p.value ? (I(), F("p", zb, "Cargando registros...")) : d.value.length ? (I(), F("ul", Kb, [
            (I(!0), F(_e, null, Re(d.value, (q) => (I(), F("li", {
              key: q.id,
              class: Pe([
                "flex items-center justify-between gap-3 rounded-lg border px-3 py-2",
                M.value?.storageType === "document" && k.value === q.id ? " " : ""
              ])
            }, [
              x("div", null, [
                x("p", Gb, Q(M.value ? Tt(q, M.value) : q.id), 1),
                x("p", Wb, "ID: " + Q(q.id), 1)
              ]),
              M.value?.storageType === "document" ? (I(), F("div", Zb, [
                x("button", {
                  type: "button",
                  disabled: !$.value || b.value,
                  class: "rounded-md border px-2 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => C(q)
                }, Q(k.value === q.id ? "Editando" : "Editar"), 9, Yb),
                x("button", {
                  type: "button",
                  disabled: !$.value,
                  class: "rounded-md border px-2 py-1 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50",
                  onClick: (B) => ye(q.id)
                }, " Eliminar ", 8, Xb)
              ])) : te("", !0)
            ], 2))), 128))
          ])) : (I(), F("p", Hb, "No hay registros todavía."))
        ]),
        M.value?.storageType === "dictionary" && _.value ? (I(), F("div", {
          key: 4,
          class: "fixed inset-0 z-40 flex items-center justify-center p-4",
          onClick: ur(V, ["self"])
        }, [
          x("article", Qb, [
            x("header", { class: "flex items-center justify-between gap-3" }, [
              g[4] || (g[4] = x("h4", { class: "text-base font-black" }, "Editar diccionario", -1)),
              x("button", {
                type: "button",
                class: "rounded-md border px-2 py-1 text-xs font-semibold",
                onClick: V
              }, " Cerrar ")
            ]),
            x("form", {
              class: "mt-4 space-y-4",
              onSubmit: ur(S, ["prevent"])
            }, [
              (I(!0), F(_e, null, Re(we(M.value), (q) => (I(), F("div", {
                key: q.key,
                class: "space-y-1"
              }, [
                x("label", Jb, Q(q.label), 1),
                q.helpText ? (I(), F("p", ey, Q(q.helpText), 1)) : te("", !0),
                Ze(mo, {
                  field: q,
                  "model-value": en(q),
                  disabled: !$.value,
                  "is-auto-id": sn(q),
                  "document-options": tn(q),
                  "document-hint": Et(q),
                  "upload-image": re,
                  "onUpdate:modelValue": (B) => An(q, B),
                  "onUpdate:file": (B) => Nt(q.key, B),
                  onRemoveImage: (B) => Tn(q.key)
                }, null, 8, ["field", "model-value", "disabled", "is-auto-id", "document-options", "document-hint", "onUpdate:modelValue", "onUpdate:file", "onRemoveImage"])
              ]))), 128)),
              w.value ? (I(), F("p", ty, Q(w.value), 1)) : te("", !0),
              x("div", ny, [
                x("button", {
                  type: "submit",
                  disabled: b.value || !$.value,
                  class: "rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed"
                }, Q(b.value ? "Guardando..." : "Guardar diccionario"), 9, ry),
                x("button", {
                  type: "button",
                  class: "rounded-md border px-4 py-2 text-sm font-semibold",
                  onClick: V
                }, " Cancelar ")
              ])
            ], 32)
          ])
        ])) : te("", !0)
      ])
    ]));
  }
}), iy = { class: "rounded-xl border p-3" }, ay = { class: "mb-3 flex items-start justify-between gap-2" }, oy = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide"
}, ly = ["disabled"], uy = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, cy = { class: "space-y-1" }, dy = ["value", "disabled"], hy = { class: "space-y-1" }, fy = ["value", "disabled"], py = { class: "mt-2 grid gap-2 md:grid-cols-4" }, my = { class: "space-y-1" }, gy = ["value", "disabled"], by = ["value"], yy = { class: "space-y-1" }, vy = ["value", "disabled"], xy = { class: "space-y-1" }, wy = { class: "flex h-[34px] items-center rounded-md border px-2 text-sm" }, Ay = ["checked", "disabled"], Ey = { class: "space-y-1" }, Ny = { class: "flex h-[34px] items-center rounded-md border px-2 text-sm" }, Ty = ["checked", "disabled"], Sy = { class: "mt-2 block space-y-1" }, Cy = ["value", "disabled"], ky = {
  key: 1,
  class: "mt-2 block space-y-1"
}, Ly = ["value", "disabled"], _y = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, qy = { class: "space-y-1" }, Iy = ["value", "disabled"], Oy = { class: "space-y-1" }, Ry = ["value", "disabled"], $y = {
  key: 3,
  class: "mt-3 rounded-lg border p-2"
}, Dy = { class: "mb-2 flex items-center justify-between" }, By = ["disabled"], Fy = { class: "space-y-2" }, My = {
  key: 4,
  class: "mt-3 rounded-lg border p-2"
}, Py = /* @__PURE__ */ Ne({
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
    function i(L) {
      return !!L && typeof L == "object" && !Array.isArray(L);
    }
    function o(L) {
      return L === "date" || L === "numeric" || L === "id" || L === "textarea" || L === "richtext" || L === "image" || L === "select" || L === "document" || L === "boolean" || L === "array" || L === "map" ? L : "text";
    }
    function l(L) {
      return typeof L == "string" ? L : "";
    }
    function u(L) {
      return Array.isArray(L) ? L.map((S) => String(S).trim()).filter(Boolean) : [];
    }
    function d(L, S) {
      return typeof S == "boolean" ? S : L === "id";
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
    function h(L) {
      const S = i(L) ? L : {}, P = o(S.type), z = {
        type: P,
        autogenerated: d(P, S.autogenerated),
        required: !!S.required,
        placeholder: l(S.placeholder),
        helpText: l(S.helpText),
        options: P === "select" ? u(S.options) : [],
        documentSchemaId: P === "document" ? l(S.documentSchemaId) : "",
        documentLabelField: P === "document" ? l(S.documentLabelField) : ""
      };
      return P === "map" && (z.mapFields = Array.isArray(S.mapFields) ? S.mapFields.map((J) => w(J)) : []), P === "array" && (z.itemSchema = h(S.itemSchema)), z;
    }
    function w(L) {
      const S = i(L) ? L : {};
      return {
        ...h(S),
        key: l(S.key),
        label: l(S.label)
      };
    }
    function E() {
      const L = h(r.modelValue);
      if (r.withIdentity) {
        const S = w(r.modelValue);
        L.key = S.key, L.label = S.label;
      }
      return L;
    }
    function k(L, S) {
      const P = h(L), z = {
        type: P.type,
        autogenerated: d(P.type, P.autogenerated),
        required: !!P.required,
        placeholder: l(P.placeholder),
        helpText: l(P.helpText),
        options: P.type === "select" ? u(P.options) : [],
        documentSchemaId: P.type === "document" ? l(P.documentSchemaId) : "",
        documentLabelField: P.type === "document" ? l(P.documentLabelField) : ""
      };
      if (P.type === "map" && (z.mapFields = (P.mapFields ?? []).map((J) => w(J))), P.type === "array" && (z.itemSchema = k(P.itemSchema ?? p(), !1)), S) {
        const J = w(L);
        z.key = J.key, z.label = J.label;
      }
      return z;
    }
    function _(L) {
      s("update:modelValue", k(L, r.withIdentity));
    }
    function $(L, S) {
      const P = E();
      P[L] = S, _(P);
    }
    function M(L) {
      const S = E(), P = o(L);
      S.type = P, S.autogenerated = P === "id", P !== "select" && (S.options = []), P !== "document" && (S.documentSchemaId = "", S.documentLabelField = ""), P === "map" ? (S.mapFields = Array.isArray(S.mapFields) ? S.mapFields.map((z) => w(z)) : [], delete S.itemSchema) : P === "array" ? (S.itemSchema = h(S.itemSchema ?? p()), delete S.mapFields) : (delete S.mapFields, delete S.itemSchema), _(S);
    }
    function U(L) {
      const S = E();
      S.required = L, _(S);
    }
    function K(L) {
      const S = E();
      S.autogenerated = S.type === "id" ? !0 : L, _(S);
    }
    function H(L) {
      const S = E();
      S.placeholder = L, _(S);
    }
    function ae(L) {
      const S = E();
      S.helpText = L, _(S);
    }
    function ie() {
      return (E().options ?? []).join(", ");
    }
    function be(L) {
      const S = E();
      S.options = L.split(",").map((P) => P.trim()).filter(Boolean), _(S);
    }
    function Ae() {
      return E().documentSchemaId ?? "";
    }
    function we() {
      return E().documentLabelField ?? "";
    }
    function y(L) {
      const S = E();
      S.documentSchemaId = L, _(S);
    }
    function R(L) {
      const S = E();
      S.documentLabelField = L, _(S);
    }
    function N() {
      const L = E();
      return L.type !== "map" || !Array.isArray(L.mapFields) ? [] : L.mapFields.map((S) => w(S));
    }
    function T() {
      const L = E();
      L.type = "map", L.mapFields = [...N(), b()], _(L);
    }
    function f(L, S) {
      const P = E(), z = N();
      z[L] = w(S), P.mapFields = z, _(P);
    }
    function A(L) {
      const S = E(), P = N();
      P.splice(L, 1), S.mapFields = P, _(S);
    }
    function C() {
      const L = E();
      return L.type !== "array" ? p() : h(L.itemSchema ?? p());
    }
    function j(L) {
      const S = E();
      S.type = "array", S.itemSchema = h(L), _(S);
    }
    function V() {
      s("remove");
    }
    return (L, S) => {
      const P = No("CmsSchemaFieldEditor", !0);
      return I(), F("article", iy, [
        x("div", ay, [
          n.title ? (I(), F("p", oy, Q(n.title), 1)) : te("", !0),
          n.canRemove ? (I(), F("button", {
            key: 1,
            type: "button",
            disabled: n.disabled,
            class: "rounded-md border px-2 py-1 text-xs font-semibold disabled:opacity-60",
            onClick: V
          }, " Quitar ", 8, ly)) : te("", !0)
        ]),
        n.withIdentity ? (I(), F("div", uy, [
          x("label", cy, [
            S[10] || (S[10] = x("span", { class: "text-xs font-semibold" }, "Key", -1)),
            x("input", {
              value: E().key || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: S[0] || (S[0] = (z) => $("key", z.target.value))
            }, null, 40, dy)
          ]),
          x("label", hy, [
            S[11] || (S[11] = x("span", { class: "text-xs font-semibold" }, "Label", -1)),
            x("input", {
              value: E().label || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: S[1] || (S[1] = (z) => $("label", z.target.value))
            }, null, 40, fy)
          ])
        ])) : te("", !0),
        x("div", py, [
          x("label", my, [
            S[12] || (S[12] = x("span", { class: "text-xs font-semibold" }, "Tipo", -1)),
            x("select", {
              value: E().type,
              disabled: n.disabled,
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onChange: S[2] || (S[2] = (z) => M(z.target.value))
            }, [
              (I(), F(_e, null, Re(t, (z) => x("option", {
                key: z.value,
                value: z.value
              }, Q(z.label), 9, by)), 64))
            ], 40, gy)
          ]),
          x("label", yy, [
            S[13] || (S[13] = x("span", { class: "text-xs font-semibold" }, "Placeholder", -1)),
            x("input", {
              value: E().placeholder || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: S[3] || (S[3] = (z) => H(z.target.value))
            }, null, 40, vy)
          ]),
          x("label", xy, [
            S[15] || (S[15] = x("span", { class: "text-xs font-semibold" }, "Requerido", -1)),
            x("span", wy, [
              x("input", {
                checked: !!E().required,
                type: "checkbox",
                disabled: n.disabled,
                onChange: S[4] || (S[4] = (z) => U(z.target.checked))
              }, null, 40, Ay),
              S[14] || (S[14] = x("span", { class: "ml-2" }, "Sí", -1))
            ])
          ]),
          x("label", Ey, [
            S[17] || (S[17] = x("span", { class: "text-xs font-semibold" }, "Autogenerado", -1)),
            x("span", Ny, [
              x("input", {
                checked: !!E().autogenerated,
                type: "checkbox",
                disabled: n.disabled || E().type === "id",
                onChange: S[5] || (S[5] = (z) => K(z.target.checked))
              }, null, 40, Ty),
              S[16] || (S[16] = x("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        x("label", Sy, [
          S[18] || (S[18] = x("span", { class: "text-xs font-semibold" }, "Help text", -1)),
          x("input", {
            value: E().helpText || "",
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
            onInput: S[6] || (S[6] = (z) => ae(z.target.value))
          }, null, 40, Cy)
        ]),
        E().type === "select" ? (I(), F("label", ky, [
          S[19] || (S[19] = x("span", { class: "text-xs font-semibold" }, "Opciones (separadas por coma)", -1)),
          x("input", {
            value: ie(),
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
            onInput: S[7] || (S[7] = (z) => be(z.target.value))
          }, null, 40, Ly)
        ])) : te("", !0),
        E().type === "document" ? (I(), F("div", _y, [
          x("label", qy, [
            S[20] || (S[20] = x("span", { class: "text-xs font-semibold" }, "Schema destino", -1)),
            x("input", {
              value: Ae(),
              type: "text",
              disabled: n.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: S[8] || (S[8] = (z) => y(z.target.value))
            }, null, 40, Iy)
          ]),
          x("label", Oy, [
            S[21] || (S[21] = x("span", { class: "text-xs font-semibold" }, "Campo etiqueta", -1)),
            x("input", {
              value: we(),
              type: "text",
              disabled: n.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border px-2 py-1.5 text-sm outline-none",
              onInput: S[9] || (S[9] = (z) => R(z.target.value))
            }, null, 40, Ry)
          ])
        ])) : te("", !0),
        E().type === "map" ? (I(), F("div", $y, [
          x("div", Dy, [
            S[22] || (S[22] = x("p", { class: "text-xs font-bold uppercase tracking-wide" }, "Map fields", -1)),
            x("button", {
              type: "button",
              disabled: n.disabled,
              class: "rounded-md border px-2 py-1 text-xs font-semibold disabled:opacity-60",
              onClick: T
            }, " Agregar campo ", 8, By)
          ]),
          x("div", Fy, [
            (I(!0), F(_e, null, Re(N(), (z, J) => (I(), Le(P, {
              key: `map-field-${J}`,
              "model-value": z,
              disabled: n.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (Y) => f(J, Y),
              onRemove: (Y) => A(J)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : te("", !0),
        E().type === "array" ? (I(), F("div", My, [
          S[23] || (S[23] = x("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide" }, "Item schema", -1)),
          Ze(P, {
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
}), jy = { class: "space-y-4" }, Uy = {
  key: 0,
  class: "rounded-md border px-3 py-2 text-sm"
}, Vy = {
  key: 1,
  class: "text-sm"
}, zy = {
  key: 2,
  class: "text-sm"
}, Hy = {
  key: 3,
  class: "rounded-2xl border p-5"
}, Ky = { class: "flex flex-wrap items-center justify-between gap-3" }, Gy = { class: "text-lg font-black" }, Wy = { class: "text-xs" }, Zy = ["disabled"], Yy = { class: "mt-4 grid gap-3 md:grid-cols-2" }, Xy = { class: "space-y-1" }, Qy = ["value"], Jy = { class: "space-y-1" }, e0 = ["value"], t0 = { class: "space-y-1 md:col-span-2" }, n0 = ["value"], r0 = { class: "space-y-1" }, s0 = ["value"], i0 = { class: "space-y-1" }, a0 = ["value"], o0 = { class: "space-y-1" }, l0 = ["value"], u0 = { class: "space-y-1" }, c0 = ["value"], d0 = {
  key: 0,
  class: "space-y-1"
}, h0 = ["value"], f0 = {
  key: 1,
  class: "space-y-1"
}, p0 = ["value"], m0 = { class: "mt-5 border-t pt-4" }, g0 = { class: "space-y-3" }, b0 = {
  key: 0,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, y0 = {
  key: 1,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, v0 = /* @__PURE__ */ Ne({
  __name: "AdminSchemasPage",
  setup(n) {
    const e = wr(), t = Hn(), r = ee([]), s = ee(""), i = ee(!1), o = ee(!1), l = ee(null), u = ee(!1), d = ee(""), p = ee(""), b = ee(""), h = je(() => r.value.find((f) => f.id === s.value) ?? null);
    xr(() => {
      w();
    }), Rt(
      () => e.query.schema,
      (f) => {
        typeof f == "string" && r.value.some((A) => A.id === f) && s.value !== f && (s.value = f);
      }
    ), Rt(
      h,
      (f) => {
        if (p.value = "", b.value = "", f) {
          u.value = !1, l.value = K(f);
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
        r.value = f, E(f), s.value ? await k(s.value) : l.value || (u.value = !0, l.value = H());
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
    function $() {
      return {
        ..._(),
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
      return f.type === "map" && (A.mapFields = Array.isArray(f.mapFields) ? f.mapFields.map((C) => U(C)) : []), f.type === "array" && (A.itemSchema = f.itemSchema ? M(f.itemSchema) : _()), A;
    }
    function U(f) {
      return {
        ...M(f),
        key: f.key ?? "",
        label: f.label ?? ""
      };
    }
    function K(f) {
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
        fields: f.fields.map((A) => U(A))
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
        fields: [$()]
      };
    }
    async function ae() {
      u.value = !0, s.value = "", l.value = H(), p.value = "", b.value = "";
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
      l.value && l.value.fields.push($());
    }
    function we(f, A) {
      l.value && (l.value.fields[f] = U(A));
    }
    function y(f) {
      l.value && l.value.fields.splice(f, 1);
    }
    function R(f, A) {
      if (f.type === "map") {
        const C = Array.isArray(f.mapFields) ? f.mapFields : [];
        for (let j = 0; j < C.length; j += 1)
          N(C[j], `${A}.mapFields[${j}]`);
      }
      f.type === "array" && f.itemSchema && R(f.itemSchema, `${A}.itemSchema`);
    }
    function N(f, A) {
      if (!f.key.trim() || !f.label.trim())
        throw new Error(`${A}: completa key y label.`);
      R(f, A);
    }
    async function T() {
      if (l.value) {
        o.value = !0, p.value = "", b.value = "";
        try {
          const f = l.value;
          if (!f.id.trim() || !f.title.trim() || !f.collectionName.trim())
            throw new Error("Completa id, título y colección del esquema.");
          if (!f.fields.length)
            throw new Error("Agrega al menos un campo al esquema.");
          const A = f.fields.map((V) => U(V));
          for (let V = 0; V < A.length; V += 1)
            N(A[V], `fields[${V}]`);
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
          await Xu(C), await w(), s.value = C.id, u.value = !1, await k(C.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const j = r.value.find((V) => V.id === s.value);
          l.value = K(j || C), b.value = "Esquema actualizado.";
        } catch (f) {
          p.value = f instanceof Error ? f.message : "No se pudo guardar el esquema.";
        } finally {
          o.value = !1;
        }
      }
    }
    return (f, A) => (I(), F("section", jy, [
      x("article", { class: "rounded-2xl border p-5" }, [
        x("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
          A[9] || (A[9] = x("div", null, [
            x("h3", { class: "text-xl font-black" }, "Esquema editable"),
            x("p", { class: "mt-1 text-sm" }, [
              Xe(" Edición visual de campos. Los tipos "),
              x("strong", null, "map"),
              Xe(" y "),
              x("strong", null, "array"),
              Xe(" se editan por interfaz. ")
            ])
          ], -1)),
          x("div", { class: "flex items-center gap-2" }, [
            x("button", {
              type: "button",
              class: "rounded-md border px-3 py-1.5 text-xs font-semibold",
              onClick: ae
            }, " Nuevo esquema "),
            x("button", {
              type: "button",
              class: "rounded-md border px-3 py-1.5 text-xs font-semibold",
              onClick: w
            }, " Recargar ")
          ])
        ])
      ]),
      d.value ? (I(), F("p", Uy, Q(d.value), 1)) : te("", !0),
      i.value ? (I(), F("p", Vy, "Cargando esquemas...")) : l.value ? (I(), F("article", Hy, [
        x("div", Ky, [
          x("div", null, [
            x("h4", Gy, Q(l.value.title || h.value?.title || "Nuevo esquema"), 1),
            x("p", Wy, [
              A[10] || (A[10] = Xe(" ID: ", -1)),
              x("code", null, Q(h.value?.id || "nuevo"), 1)
            ])
          ]),
          x("button", {
            type: "button",
            disabled: o.value,
            class: "rounded-md px-3 py-1.5 text-xs font-semibold",
            onClick: T
          }, Q(o.value ? "Guardando..." : "Guardar cambios"), 9, Zy)
        ]),
        x("div", Yy, [
          x("label", Xy, [
            A[11] || (A[11] = x("span", { class: "text-xs font-semibold" }, "ID", -1)),
            x("input", {
              value: l.value.id,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[0] || (A[0] = (C) => ie("id", C.target.value))
            }, null, 40, Qy)
          ]),
          x("label", Jy, [
            A[12] || (A[12] = x("span", { class: "text-xs font-semibold" }, "Título", -1)),
            x("input", {
              value: l.value.title,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[1] || (A[1] = (C) => ie("title", C.target.value))
            }, null, 40, e0)
          ]),
          x("label", t0, [
            A[13] || (A[13] = x("span", { class: "text-xs font-semibold" }, "Descripción", -1)),
            x("input", {
              value: l.value.description,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[2] || (A[2] = (C) => ie("description", C.target.value))
            }, null, 40, n0)
          ]),
          x("label", r0, [
            A[15] || (A[15] = x("span", { class: "text-xs font-semibold" }, "Tipo de almacenamiento", -1)),
            x("select", {
              value: l.value.storageType,
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onChange: A[3] || (A[3] = (C) => be(C.target.value))
            }, [...A[14] || (A[14] = [
              x("option", { value: "document" }, "document", -1),
              x("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, s0)
          ]),
          x("label", i0, [
            A[16] || (A[16] = x("span", { class: "text-xs font-semibold" }, "Colección", -1)),
            x("input", {
              value: l.value.collectionName,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[4] || (A[4] = (C) => ie("collectionName", C.target.value))
            }, null, 40, a0)
          ]),
          x("label", o0, [
            A[17] || (A[17] = x("span", { class: "text-xs font-semibold" }, "Slug desde campo", -1)),
            x("input", {
              value: l.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[5] || (A[5] = (C) => ie("slugFromField", C.target.value))
            }, null, 40, l0)
          ]),
          x("label", u0, [
            A[18] || (A[18] = x("span", { class: "text-xs font-semibold" }, "Campo de preview", -1)),
            x("input", {
              value: l.value.previewField,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[6] || (A[6] = (C) => ie("previewField", C.target.value))
            }, null, 40, c0)
          ]),
          l.value.storageType === "dictionary" ? (I(), F("label", d0, [
            A[19] || (A[19] = x("span", { class: "text-xs font-semibold" }, "Dictionary document ID", -1)),
            x("input", {
              value: l.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[7] || (A[7] = (C) => ie("dictionaryDocumentId", C.target.value))
            }, null, 40, h0)
          ])) : te("", !0),
          l.value.storageType === "dictionary" ? (I(), F("label", f0, [
            A[20] || (A[20] = x("span", { class: "text-xs font-semibold" }, "Dictionary root key", -1)),
            x("input", {
              value: l.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border px-3 py-2 text-sm outline-none",
              onInput: A[8] || (A[8] = (C) => ie("dictionaryRootKey", C.target.value))
            }, null, 40, p0)
          ])) : te("", !0)
        ]),
        x("div", m0, [
          x("div", { class: "mb-3 flex items-center justify-between" }, [
            A[21] || (A[21] = x("h5", { class: "text-sm font-black uppercase tracking-wide" }, "Campos", -1)),
            x("button", {
              type: "button",
              class: "rounded-md border px-3 py-1.5 text-xs font-semibold",
              onClick: Ae
            }, " Agregar campo ")
          ]),
          x("div", g0, [
            (I(!0), F(_e, null, Re(l.value.fields, (C, j) => (I(), Le(Py, {
              key: `schema-field-${j}`,
              "model-value": C,
              "can-remove": !0,
              title: `Campo ${j + 1}`,
              "onUpdate:modelValue": (V) => we(j, V),
              onRemove: (V) => y(j)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        p.value ? (I(), F("p", b0, Q(p.value), 1)) : te("", !0),
        b.value ? (I(), F("p", y0, Q(b.value), 1)) : te("", !0)
      ])) : (I(), F("p", zy, "No hay esquema seleccionado."))
    ]));
  }
}), x0 = { class: "rounded-2xl border p-5" }, w0 = {
  key: 0,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, A0 = {
  key: 1,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, E0 = {
  key: 2,
  class: "mt-3 rounded-md border px-3 py-2 text-sm"
}, N0 = {
  key: 3,
  class: "mt-4 text-sm"
}, T0 = {
  key: 4,
  class: "mt-4 text-sm"
}, S0 = {
  key: 5,
  class: "mt-4 space-y-3"
}, C0 = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, k0 = { class: "text-sm font-semibold" }, L0 = { class: "text-xs" }, _0 = { class: "text-xs" }, q0 = { class: "text-xs" }, I0 = { class: "flex flex-wrap gap-3" }, O0 = ["checked", "disabled", "onChange"], R0 = /* @__PURE__ */ Ne({
  __name: "AdminUsersPage",
  setup(n) {
    const e = ee([]), t = ee(!1), r = ee(""), s = ee(""), i = ee(null), o = je(() => Bn.value === "admin"), l = [
      { label: "Admin", value: "admin" },
      { label: "Writer", value: "writer" },
      { label: "Manager", value: "manager" },
      { label: "Sin rol", value: null }
    ];
    xr(async () => {
      await u();
    });
    async function u() {
      t.value = !0, r.value = "";
      try {
        e.value = await ou();
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
        await lu(w.id, k), w.role = k, s.value = "Rol actualizado correctamente.";
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
    return (w, E) => (I(), F("section", x0, [
      x("div", { class: "flex items-center justify-between" }, [
        E[0] || (E[0] = x("h3", { class: "text-xl font-black" }, "Usuarios", -1)),
        x("button", {
          type: "button",
          class: "rounded-md border px-3 py-1.5 text-sm font-semibold",
          onClick: u
        }, " Recargar ")
      ]),
      E[1] || (E[1] = x("p", { class: "mt-1 text-sm" }, "Listado de usuarios con último login y control de rol.", -1)),
      o.value ? te("", !0) : (I(), F("p", w0, " Solo usuarios con rol admin pueden editar roles. ")),
      r.value ? (I(), F("p", A0, Q(r.value), 1)) : te("", !0),
      s.value ? (I(), F("p", E0, Q(s.value), 1)) : te("", !0),
      t.value ? (I(), F("p", N0, "Cargando usuarios...")) : e.value.length === 0 ? (I(), F("p", T0, "No hay usuarios registrados.")) : (I(), F("div", S0, [
        (I(!0), F(_e, null, Re(e.value, (k) => (I(), F("article", {
          key: k.id,
          class: "rounded-lg border p-4"
        }, [
          x("div", C0, [
            x("div", null, [
              x("p", k0, Q(k.email || k.id), 1),
              x("p", L0, "UID: " + Q(k.id), 1),
              x("p", _0, "Último login: " + Q(h(k.lastLoginAt)), 1),
              x("p", q0, "Rol actual: " + Q(b(k.role)), 1)
            ]),
            x("div", I0, [
              (I(), F(_e, null, Re(l, (_) => x("label", {
                key: _.label,
                class: "inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
              }, [
                x("input", {
                  type: "checkbox",
                  checked: p(k.role, _.value),
                  disabled: !o.value || i.value === k.id,
                  onChange: ($) => d(k, _.value)
                }, null, 40, O0),
                Xe(" " + Q(_.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), xo = /* @__PURE__ */ new WeakSet();
function W0(n, e) {
  if (xo.has(n))
    return;
  const t = jn(e.basePath ?? "/admin"), r = jn(e.loginPath ?? "/ingresar"), s = jn(e.registerPath ?? "/registro"), i = D0(e.homePath ?? "/");
  su(e.firebase), mu({ basePath: t, loginPath: r, registerPath: s, homePath: i }), cu();
  const o = $0(t, r, s);
  for (const l of o)
    n.addRoute(l);
  n.beforeEach(async (l) => (await du(), l.meta.cmsRequiresAuth && !fr.value ? {
    path: r,
    query: { redirect: l.fullPath }
  } : (l.path === r || l.path === s || l.meta.cmsGuestOnly) && fr.value ? { path: t } : !0)), xo.add(n);
}
function $0(n = "/admin", e = "/ingresar", t = "/registro") {
  const r = jn(n), s = jn(e), i = jn(t);
  return [
    { path: s, component: xu, meta: { cmsGuestOnly: !0 } },
    { path: i, component: Tu, meta: { cmsGuestOnly: !0 } },
    {
      path: r,
      component: oc,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${r}/content` },
        { path: "content", component: sy, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: v0, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: R0, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function jn(n) {
  const e = String(n || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function D0(n) {
  const e = String(n || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
export {
  bb as actualizarRegistroDocumento,
  pu as cerrarSesion,
  mb as crearRegistroDocumento,
  $0 as createCmsRoutes,
  gb as eliminarRegistroDocumento,
  vb as guardarRegistroDiccionario,
  Xu as guardarSchemaContenido,
  yo as listarRegistrosDocumento,
  Bi as listarSchemasContenido,
  xb as obtenerRegistroDiccionario,
  W0 as registerPifWarriorsCms,
  Bn as rolActual,
  fr as usuarioActual
};
