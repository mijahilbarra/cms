import { signOut as ec, onAuthStateChanged as tc, setPersistence as ko, browserLocalPersistence as Lo, signInWithEmailAndPassword as rc, createUserWithEmailAndPassword as nc } from "firebase/auth";
import { ref as re, defineComponent as Ot, openBlock as D, createElementBlock as M, createElementVNode as x, withModifiers as Vi, withDirectives as an, vModelText as on, toDisplayString as te, createCommentVNode as oe, createTextVNode as Ge, createVNode as Ct, unref as qe, withCtx as St, onMounted as yn, onBeforeUnmount as qo, watch as rr, computed as Oe, normalizeClass as pt, Fragment as Fe, renderList as Me, createBlock as Ut, resolveComponent as Oo } from "vue";
import { query as fs, collection as Ht, orderBy as Hi, getDocs as Or, updateDoc as sc, doc as Ve, serverTimestamp as Ce, getDoc as kt, setDoc as Kt, deleteDoc as Ki, addDoc as Io, limit as Gi, where as ic, onSnapshot as Ro } from "firebase/firestore";
import { useRoute as ps, useRouter as vn, RouterLink as _t, RouterView as ac } from "vue-router";
import { ref as oc, uploadBytes as lc, getDownloadURL as cc } from "firebase/storage";
let Ti = null;
function uc(n) {
  Ti = n;
}
function xe() {
  if (!Ti)
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  return Ti;
}
const ms = "users";
async function dc(n) {
  const { firestore: e } = xe(), t = Ve(e, ms, n.uid);
  if (!(await kt(t)).exists()) {
    await Kt(t, {
      email: n.email ?? "",
      role: null,
      lastLoginAt: Ce(),
      createdAt: Ce(),
      updatedAt: Ce()
    });
    return;
  }
  await Kt(
    t,
    {
      email: n.email ?? "",
      lastLoginAt: Ce(),
      updatedAt: Ce()
    },
    { merge: !0 }
  );
}
async function hc(n) {
  const { firestore: e } = xe(), t = await kt(Ve(e, ms, n));
  return t.exists() ? $o(t.data().role) : null;
}
async function fc() {
  const { firestore: n } = xe(), e = fs(Ht(n, ms), Hi("email", "asc"));
  return (await Or(e)).docs.map((r) => ({
    id: r.id,
    email: String(r.data().email ?? ""),
    role: $o(r.data().role),
    lastLoginAt: r.data().lastLoginAt,
    createdAt: r.data().createdAt,
    updatedAt: r.data().updatedAt
  }));
}
async function pc(n, e) {
  const { firestore: t } = xe();
  await sc(Ve(t, ms, n), {
    role: e,
    updatedAt: Ce()
  });
}
function $o(n) {
  return n === "admin" || n === "writer" || n === "manager" ? n : null;
}
const un = re(null), Do = re(!1), Mt = re(null);
let Qn = null, mc = new Promise((n) => {
  Qn = n;
}), xa = !1;
function gc() {
  if (xa)
    return;
  const { auth: n } = xe();
  un.value = n.currentUser, tc(n, async (e) => {
    un.value = e, Mt.value = null, e && await Wi(e), Do.value = !0, Qn && (Qn(), Qn = null);
  }), xa = !0;
}
async function bc() {
  Do.value || await mc;
}
async function yc(n, e) {
  const { auth: t } = xe();
  await ko(t, Lo);
  const r = await nc(t, n, e);
  await Wi(r.user);
}
async function vc(n, e) {
  const { auth: t } = xe();
  await ko(t, Lo);
  const r = await rc(t, n, e);
  await Wi(r.user);
}
async function xc() {
  const { auth: n } = xe();
  await ec(n);
}
async function Wi(n) {
  try {
    await dc(n), Mt.value = await hc(n.uid);
  } catch (e) {
    console.error("No se pudo sincronizar el perfil del usuario:", e);
  }
}
let Ni = {
  basePath: "/admin",
  loginPath: "/ingresar",
  registerPath: "/registro",
  homePath: "/"
};
function wc(n) {
  Ni = {
    ...Ni,
    ...n
  };
}
function Zi() {
  return Ni;
}
const Ac = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, Ec = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Tc = ["disabled"], Nc = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, Sc = /* @__PURE__ */ Ot({
  __name: "LoginPage",
  setup(n) {
    const e = ps(), t = vn(), { basePath: r, registerPath: s } = Zi(), i = re(""), a = re(""), l = re(!1), c = re("");
    async function d() {
      c.value = "", l.value = !0;
      try {
        await vc(i.value, a.value);
        const g = typeof e.query.redirect == "string" ? e.query.redirect : r;
        await t.push(g);
      } catch {
        c.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (g, m) => (D(), M("main", Ac, [
      m[6] || (m[6] = x("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Ingresar", -1)),
      m[7] || (m[7] = x("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Accede para administrar blogs y vistas.", -1)),
      x("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: Vi(d, ["prevent"])
      }, [
        x("div", null, [
          m[2] || (m[2] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          an(x("input", {
            "onUpdate:modelValue": m[0] || (m[0] = (h) => i.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [on, i.value]
          ])
        ]),
        x("div", null, [
          m[3] || (m[3] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          an(x("input", {
            "onUpdate:modelValue": m[1] || (m[1] = (h) => a.value = h),
            type: "password",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "********"
          }, null, 512), [
            [on, a.value]
          ])
        ]),
        c.value ? (D(), M("p", Ec, te(c.value), 1)) : oe("", !0),
        x("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, te(l.value ? "Ingresando..." : "Entrar"), 9, Tc)
      ], 32),
      x("p", Nc, [
        m[5] || (m[5] = Ge(" ¿No tienes cuenta? ", -1)),
        Ct(qe(_t), {
          to: qe(s),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: St(() => [...m[4] || (m[4] = [
            Ge("Crear cuenta", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), _c = { class: "cms-main-shell mx-auto max-w-md px-5 py-14" }, Cc = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, kc = ["disabled"], Lc = { class: "mt-4 text-sm text-[var(--pw-muted-text)]" }, qc = /* @__PURE__ */ Ot({
  __name: "RegisterPage",
  setup(n) {
    const e = vn(), { basePath: t, loginPath: r } = Zi(), s = re(""), i = re(""), a = re(""), l = re(!1), c = re("");
    async function d() {
      if (c.value = "", i.value !== a.value) {
        c.value = "Las contraseñas no coinciden.";
        return;
      }
      l.value = !0;
      try {
        await yc(s.value, i.value), await e.push(t);
      } catch {
        c.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
      } finally {
        l.value = !1;
      }
    }
    return (g, m) => (D(), M("main", _c, [
      m[8] || (m[8] = x("h1", { class: "text-3xl font-black text-[var(--pw-text)]" }, "Crear cuenta", -1)),
      m[9] || (m[9] = x("p", { class: "mt-2 text-sm text-[var(--pw-muted-text)]" }, "Registro para administrar contenido.", -1)),
      x("form", {
        class: "mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5",
        onSubmit: Vi(d, ["prevent"])
      }, [
        x("div", null, [
          m[3] || (m[3] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Correo", -1)),
          an(x("input", {
            "onUpdate:modelValue": m[0] || (m[0] = (h) => s.value = h),
            type: "email",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "tu@email.com"
          }, null, 512), [
            [on, s.value]
          ])
        ]),
        x("div", null, [
          m[4] || (m[4] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Contraseña", -1)),
          an(x("input", {
            "onUpdate:modelValue": m[1] || (m[1] = (h) => i.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Mínimo 6 caracteres"
          }, null, 512), [
            [on, i.value]
          ])
        ]),
        x("div", null, [
          m[5] || (m[5] = x("label", { class: "mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]" }, "Confirmar contraseña", -1)),
          an(x("input", {
            "onUpdate:modelValue": m[2] || (m[2] = (h) => a.value = h),
            type: "password",
            minlength: "6",
            required: "",
            class: "w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]",
            placeholder: "Repite la contraseña"
          }, null, 512), [
            [on, a.value]
          ])
        ]),
        c.value ? (D(), M("p", Cc, te(c.value), 1)) : oe("", !0),
        x("button", {
          type: "submit",
          disabled: l.value,
          class: "w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        }, te(l.value ? "Creando cuenta..." : "Registrarme"), 9, kc)
      ], 32),
      x("p", Lc, [
        m[7] || (m[7] = Ge(" ¿Ya tienes cuenta? ", -1)),
        Ct(qe(_t), {
          to: qe(r),
          class: "font-semibold text-[var(--pw-accent)]"
        }, {
          default: St(() => [...m[6] || (m[6] = [
            Ge("Iniciar sesión", -1)
          ])]),
          _: 1
        }, 8, ["to"])
      ])
    ]));
  }
}), Oc = { label: "Hero principal", description: "Mensaje principal de la landing inmobiliaria.", fields: { badge: { label: "Etiqueta superior", type: "text", value: "Inmobiliaria Elmuki" }, titulo: { label: "Título", type: "text", value: "Encuentra el inmueble ideal para vivir o invertir" }, subtitulo: { label: "Subtítulo", type: "textarea", value: "Te acompañamos de punta a punta en la compra, venta y tasación de propiedades con asesoría clara y acompañamiento real." }, botonTexto: { label: "Texto del botón", type: "text", value: "Ver inmuebles" }, botonUrl: { label: "URL del botón", type: "url", value: "#inmuebles" }, imagenUrl: { label: "Imagen hero", type: "url", value: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80" } } }, Ic = { label: "Propuesta de valor", description: "Bloque institucional con métricas.", fields: { titulo: { label: "Título", type: "text", value: "Compras seguras, procesos ágiles y atención humana" }, descripcion: { label: "Descripción", type: "textarea", value: "Trabajamos con análisis legal, verificación documental y una red de representantes especializados para que tomes decisiones con confianza." }, metricas: { label: "Métricas", type: "json", value: '[{"label":"Operaciones cerradas","valor":"+420"},{"label":"Años de experiencia","valor":"14"},{"label":"Clientes satisfechos","valor":"98%"}]', repeater: { itemLabel: "Métrica", fields: [{ key: "label", label: "Etiqueta", type: "text" }, { key: "valor", label: "Valor", type: "text" }] } } } }, Rc = { label: "Sección de inmuebles", description: "Textos usados sobre el listado dinámico.", fields: { titulo: { label: "Título de sección", type: "text", value: "Inmuebles destacados" }, descripcion: { label: "Descripción", type: "textarea", value: "Selecciona una propiedad y contacta directamente con el representante asignado." }, tagPrecio: { label: "Etiqueta precio", type: "text", value: "Precio" }, tagTipo: { label: "Etiqueta tipo", type: "text", value: "Tipo" }, tagAmbientes: { label: "Etiqueta cuartos", type: "text", value: "Cuartos" }, tagBanos: { label: "Etiqueta baños", type: "text", value: "Baños" }, tagCochera: { label: "Etiqueta cochera", type: "text", value: "Cochera" }, sinResultados: { label: "Texto sin resultados", type: "textarea", value: "Todavía no hay inmuebles cargados. Puedes agregarlos desde el CMS en el tipo de contenido Inmuebles." } } }, $c = { label: "Proceso de trabajo", description: "Pasos del servicio inmobiliario.", fields: { titulo: { label: "Título", type: "text", value: "Así te acompañamos en cada operación" }, items: { label: "Pasos", type: "json", value: '[{"paso":"01","titulo":"Diagnóstico","descripcion":"Relevamos tu objetivo, presupuesto y zona de interés."},{"paso":"02","titulo":"Selección","descripcion":"Te mostramos propiedades validadas según tu perfil."},{"paso":"03","titulo":"Cierre","descripcion":"Negociamos, coordinamos documentación y cerramos la operación."}]', repeater: { itemLabel: "Paso", fields: [{ key: "paso", label: "Número", type: "text" }, { key: "titulo", label: "Título", type: "text" }, { key: "descripcion", label: "Descripción", type: "textarea" }] } } } }, Dc = { label: "Preguntas frecuentes", description: "FAQ para clientes.", fields: { titulo: { label: "Título", type: "text", value: "Preguntas frecuentes" }, items: { label: "FAQs", type: "json", value: '[{"pregunta":"¿Puedo visitar una propiedad antes de reservar?","respuesta":"Sí. Coordinamos visitas con el representante y te acompañamos durante el recorrido."},{"pregunta":"¿Trabajan con propiedades para inversión?","respuesta":"Sí. Evaluamos renta potencial, plusvalía y riesgos de cada operación."},{"pregunta":"¿También gestionan venta de inmuebles?","respuesta":"Sí, hacemos tasación, estrategia comercial y publicación multicanal."}]', repeater: { itemLabel: "FAQ", fields: [{ key: "pregunta", label: "Pregunta", type: "text" }, { key: "respuesta", label: "Respuesta", type: "textarea" }] } } } }, Bc = { label: "Pie de página", description: "Texto y acciones internas del footer global.", fields: { textoPrincipal: { label: "Texto principal", type: "text", value: "Contenido administrable desde CMS. Equipo interno: inicia sesión para editar vistas y documentos." }, loginLabel: { label: "Etiqueta botón ingresar", type: "text", value: "Iniciar sesión" }, panelLabel: { label: "Etiqueta botón panel", type: "text", value: "Panel" }, salirLabel: { label: "Etiqueta botón salir", type: "text", value: "Salir" } } }, Fc = {
  hero: Oc,
  propuesta: Ic,
  inmuebles: Rc,
  proceso: $c,
  faq: Dc,
  footer: Bc
}, Mc = { label: "Encabezado blog", description: "Textos de portada del blog.", fields: { titulo: { label: "Título", type: "text", value: "Blog inmobiliario" }, descripcion: { label: "Descripción", type: "textarea", value: "Tendencias del mercado, guías para compradores y consejos para vender mejor tu propiedad." } } }, Pc = {
  encabezado: Mc
}, jc = { label: "Encabezado", description: "Presentación de la empresa.", fields: { titulo: { label: "Título", type: "text", value: "Quiénes somos" }, descripcion: { label: "Descripción", type: "textarea", value: "Somos una inmobiliaria especializada en venta residencial y de inversión. Unimos análisis comercial, soporte legal y representación cercana para que cada cliente opere con seguridad." } } }, Uc = { label: "Trayectoria", description: "Resumen de experiencia de la firma.", fields: { titulo: { label: "Título", type: "text", value: "Experiencia que se traduce en resultados" }, descripcion: { label: "Descripción", type: "textarea", value: "Desde 2012 acompañamos operaciones inmobiliarias en zonas urbanas y suburbanas, con foco en transparencia documental y rentabilidad sostenible." }, aniosExperiencia: { label: "Años de experiencia", type: "text", value: "14" } } }, zc = { label: "Valores", description: "Pilares de trabajo.", fields: { items: { label: "Valores", type: "json", value: '[{"titulo":"Transparencia","descripcion":"Cada propiedad se publica con información verificable y documentación revisada."},{"titulo":"Acompañamiento","descripcion":"Guiamos al cliente en cada etapa: búsqueda, negociación y firma."},{"titulo":"Visión de inversión","descripcion":"Analizamos potencial de renta, valorización y riesgos antes de recomendar."}]', repeater: { itemLabel: "Valor", fields: [{ key: "titulo", label: "Título", type: "text" }, { key: "descripcion", label: "Descripción", type: "textarea" }] } } } }, Vc = { label: "Equipo", description: "Texto descriptivo del equipo.", fields: { titulo: { label: "Título", type: "text", value: "Un equipo comercial y legal trabajando en conjunto" }, descripcion: { label: "Descripción", type: "textarea", value: "Representantes comerciales, asesores hipotecarios y especialistas legales coordinan cada operación para reducir fricciones y tiempos de cierre." } } }, Hc = { label: "Llamado a la acción", description: "Bloque final de contacto.", fields: { titulo: { label: "Título", type: "text", value: "¿Listo para encontrar tu próximo inmueble?" }, descripcion: { label: "Descripción", type: "textarea", value: "Cuéntanos qué estás buscando y te proponemos opciones acordes a tu objetivo y presupuesto." }, botonTexto: { label: "Texto botón", type: "text", value: "Ver inmuebles" }, botonUrl: { label: "URL botón", type: "url", value: "/" } } }, Kc = {
  encabezado: jc,
  trayectoria: Uc,
  valores: zc,
  equipo: Vc,
  cta: Hc
}, Gc = { label: "Navegación principal", description: "Textos visibles en el menú superior.", fields: { marca: { label: "Marca", type: "text", value: "Inmobiliaria Elmuki" }, inicioLabel: { label: "Etiqueta Inicio", type: "text", value: "Inicio" }, quienesSomosLabel: { label: "Etiqueta Quiénes somos", type: "text", value: "Quiénes somos" }, blogLabel: { label: "Etiqueta Blog", type: "text", value: "Blog" } } }, Wc = {
  menu: Gc
}, Zc = { label: "Paleta base", description: "Colores principales del sistema.", fields: { primario: { label: "Color primario", type: "color", value: "#0E6E5D" }, secundario: { label: "Color secundario", type: "color", value: "#C17A35" }, terciario: { label: "Color terciario", type: "color", value: "#D8E6DF" }, claro1: { label: "Claro 1", type: "color", value: "#F3F2EC" }, claro2: { label: "Claro 2", type: "color", value: "#FFFDFC" }, oscuro1: { label: "Oscuro 1", type: "color", value: "#1F2A2E" }, oscuro2: { label: "Oscuro 2", type: "color", value: "#4E5B61" } } }, Yc = { label: "Asignación de paleta", description: "Cada campo usa el nombre de un color base: primario, secundario, terciario, claro1, claro2, oscuro1, oscuro2.", fields: { backgroundToken: { label: "Fondo general", type: "select", value: "claro1", options: ["primario", "secundario", "terciario", "claro1", "claro2", "oscuro1", "oscuro2"] }, surfaceToken: { label: "Superficies", type: "select", value: "claro2", options: ["primario", "secundario", "terciario", "claro1", "claro2", "oscuro1", "oscuro2"] }, borderToken: { label: "Bordes", type: "select", value: "terciario", options: ["primario", "secundario", "terciario", "claro1", "claro2", "oscuro1", "oscuro2"] }, textToken: { label: "Texto principal", type: "select", value: "oscuro1", options: ["primario", "secundario", "terciario", "claro1", "claro2", "oscuro1", "oscuro2"] }, mutedTextToken: { label: "Texto secundario", type: "select", value: "oscuro2", options: ["primario", "secundario", "terciario", "claro1", "claro2", "oscuro1", "oscuro2"] }, primaryToken: { label: "Botón principal", type: "select", value: "primario", options: ["primario", "secundario", "terciario", "claro1", "claro2", "oscuro1", "oscuro2"] }, primaryTextToken: { label: "Texto botón principal", type: "select", value: "claro2", options: ["primario", "secundario", "terciario", "claro1", "claro2", "oscuro1", "oscuro2"] }, accentToken: { label: "Acento / links", type: "select", value: "secundario", options: ["primario", "secundario", "terciario", "claro1", "claro2", "oscuro1", "oscuro2"] }, heroBackgroundToken: { label: "Fondo hero", type: "select", value: "claro2", options: ["primario", "secundario", "terciario", "claro1", "claro2", "oscuro1", "oscuro2"] } } }, Xc = {
  base: Zc,
  aplicacion: Yc
}, Bo = [
  {
    id: "landingPage",
    titulo: "Landing",
    descripcion: "Home de la inmobiliaria con hero, propuesta y FAQs.",
    schema: Fc
  },
  {
    id: "quienesSomosPage",
    titulo: "Quiénes somos",
    descripcion: "Presentación de la inmobiliaria, valores y trayectoria.",
    schema: Kc
  },
  {
    id: "blogPage",
    titulo: "Blog",
    descripcion: "Noticias y consejos del mercado inmobiliario.",
    schema: Pc
  },
  {
    id: "nav",
    titulo: "Navegación",
    descripcion: "Textos del menú superior y botones de sesión.",
    schema: Wc
  },
  {
    id: "siteTheme",
    titulo: "Paleta",
    descripcion: "Colores globales del sitio.",
    schema: Xc
  }
];
function Qc(n) {
  return Bo.find((e) => e.id === n) ?? null;
}
const dn = "cmsSchemas", Jc = "views", Yi = "schema", Fo = "main", eu = "__", tu = 3e4;
let Jn = null, Si = 0, Jr = null;
const Mo = {
  id: "blog",
  title: "Blog",
  description: "Registros del blog público.",
  storageType: "document",
  collectionName: "blogs",
  slugFromField: "titulo",
  previewField: "titulo",
  fields: [
    { key: "titulo", label: "Título", type: "text", required: !0 },
    { key: "resumen", label: "Resumen", type: "textarea", required: !0 },
    { key: "imagenPrincipalUrl", label: "Imagen principal", type: "image" },
    { key: "contenidoHtml", label: "Contenido", type: "richtext", required: !0 },
    { key: "publicado", label: "Publicado", type: "boolean" }
  ]
}, ru = {
  id: "representantes",
  title: "Representantes",
  description: "Representantes comerciales de inmuebles.",
  storageType: "document",
  collectionName: "representantes",
  previewField: "nombre",
  fields: [
    { key: "nombre", label: "Nombre", type: "text", required: !0 },
    { key: "apellido", label: "Apellido", type: "text", required: !0 },
    { key: "dni", label: "DNI", type: "text", required: !0 },
    { key: "telefono", label: "Teléfono", type: "text", required: !0 }
  ]
}, nu = {
  id: "inmuebles",
  title: "Inmuebles",
  description: "Propiedades para venta o alquiler.",
  storageType: "document",
  collectionName: "inmuebles",
  previewField: "direccion",
  fields: [
    { key: "imagenes", label: "Imágenes", type: "array", required: !0, itemSchema: { type: "text" } },
    { key: "direccion", label: "Dirección", type: "text", required: !0 },
    { key: "cantidadCuartos", label: "Cantidad de cuartos", type: "text", required: !0 },
    { key: "cantidadBanos", label: "Cantidad de baños", type: "text", required: !0 },
    { key: "precio", label: "Precio", type: "text", required: !0 },
    {
      key: "tipo",
      label: "Tipo",
      type: "select",
      required: !0,
      options: ["departamento", "casa", "terreno"]
    },
    {
      key: "representanteId",
      label: "Representante",
      type: "document",
      required: !0,
      documentSchemaId: "representantes",
      documentLabelField: "nombre"
    },
    { key: "descripcion", label: "Descripción", type: "textarea", required: !0 },
    { key: "cochera", label: "Cochera", type: "boolean" }
  ]
}, su = Bo.map(
  (n) => ou(n)
);
async function Po() {
  await Promise.all([
    jn(Mo),
    jn(ru),
    jn(nu),
    ...su.map((n) => jn(n))
  ]);
}
async function jn(n) {
  const { firestore: e } = xe(), t = ns(n);
  await iu(t.id);
  const r = Ve(e, dn, t.id), s = await kt(r);
  if (!s.exists()) {
    await Kt(r, {
      ...t,
      createdAt: Ce(),
      updatedAt: Ce()
    }), rs();
    return;
  }
  const i = ns({
    ...t,
    ...s.data()
  });
  await Kt(
    r,
    {
      ...i,
      updatedAt: Ce()
    },
    { merge: !0 }
  ), rs();
}
async function iu(n) {
  if (!n.startsWith("view-"))
    return;
  const e = n.toLowerCase();
  if (e === n)
    return;
  const { firestore: t } = xe(), r = Ve(t, dn, n), s = Ve(t, dn, e), [i, a] = await Promise.all([kt(r), kt(s)]);
  a.exists() && (i.exists() || await Kt(
    r,
    {
      ...a.data(),
      updatedAt: Ce()
    },
    { merge: !0 }
  ), await Ki(s), rs());
}
async function ts() {
  const n = Date.now();
  if (Jn && n - Si < tu)
    return Jn;
  if (Jr)
    return Jr;
  const { firestore: e } = xe();
  Jr = (async () => {
    const r = (await Or(Ht(e, dn))).docs.map((s) => {
      const i = s.data();
      return ns({ ...i, id: s.id });
    }).sort((s, i) => s.title.localeCompare(i.title, "es"));
    return Jn = r, Si = Date.now(), r;
  })();
  try {
    return await Jr;
  } finally {
    Jr = null;
  }
}
async function au(n) {
  const { firestore: e } = xe(), t = ns(n), r = Ve(e, dn, t.id);
  await Kt(
    r,
    {
      ...t,
      updatedAt: Ce(),
      createdAt: Ce()
    },
    { merge: !0 }
  ), rs();
}
function rs() {
  Jn = null, Si = 0;
}
function ns(n) {
  const e = n;
  let t = [];
  const r = e.storageType === "dictionary" ? "dictionary" : "document";
  Array.isArray(e.fields) ? t = e.fields.map((c) => ss(c)) : e.fields && typeof e.fields == "object" && (t = Object.entries(e.fields).map(
    ([c, d]) => ss({ key: c, ...d })
  ));
  const s = typeof e.dictionaryDocumentId == "string" ? e.dictionaryDocumentId : "", i = typeof e.dictionaryRootKey == "string" ? e.dictionaryRootKey : "", a = r === "dictionary" ? bu(s || Fo) : "", l = r === "dictionary" ? yu(i || Yi) : "";
  return {
    id: mu(String(e.id ?? "tipo-contenido")),
    title: String(e.title ?? "Tipo de contenido"),
    description: typeof e.description == "string" ? e.description : "",
    storageType: r,
    collectionName: gu(String(e.collectionName ?? "registros")),
    dictionaryDocumentId: a,
    dictionaryRootKey: l,
    slugFromField: typeof e.slugFromField == "string" ? e.slugFromField : "",
    previewField: typeof e.previewField == "string" ? e.previewField : "",
    fields: t
  };
}
function ss(n) {
  const e = Uo(n.type), t = {
    key: $r(String(n.key ?? "campo")),
    label: String(n.label ?? "Campo"),
    type: e,
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: zo(n.options),
    documentSchemaId: e === "document" ? Vo(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Ho(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = jo(
    Xi(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => ss(r)) : [] : delete t.mapFields, t;
}
function jo(n) {
  const e = Uo(n.type), t = {
    type: e,
    required: !!n.required,
    placeholder: typeof n.placeholder == "string" ? n.placeholder : "",
    helpText: typeof n.helpText == "string" ? n.helpText : "",
    options: zo(n.options),
    documentSchemaId: e === "document" ? Vo(typeof n.documentSchemaId == "string" ? n.documentSchemaId : "") : "",
    documentLabelField: e === "document" ? Ho(typeof n.documentLabelField == "string" ? n.documentLabelField : "") : ""
  };
  return e !== "select" && (t.options = []), e !== "document" && (t.documentSchemaId = "", t.documentLabelField = ""), e === "array" ? t.itemSchema = jo(
    Xi(n.itemSchema) ? n.itemSchema : { type: "text" }
  ) : delete t.itemSchema, e === "map" ? t.mapFields = Array.isArray(n.mapFields) ? n.mapFields.map((r) => ss(r)) : [] : delete t.mapFields, t;
}
function Uo(n) {
  return n === "textarea" || n === "richtext" || n === "image" || n === "select" || n === "document" || n === "boolean" || n === "array" || n === "map" ? n : "text";
}
function zo(n) {
  return Array.isArray(n) ? n.map((e) => String(e).trim()).filter(Boolean) : [];
}
function Xi(n) {
  return !!n && typeof n == "object" && !Array.isArray(n);
}
function ou(n) {
  const e = [];
  for (const [t, r] of Object.entries(n.schema))
    for (const [s, i] of Object.entries(r.fields)) {
      const l = {
        key: pu(t, s),
        label: `${r.label} · ${i.label}`,
        type: lu(i.type),
        required: !1,
        placeholder: typeof i.placeholder == "string" ? i.placeholder : "",
        helpText: typeof i.helpText == "string" ? i.helpText : "",
        options: Array.isArray(i.options) ? i.options : []
      };
      e.push(cu(l, i));
    }
  return {
    id: `view-${n.id}`,
    title: `View: ${n.titulo}`,
    description: `Edición dinámica del schema de ${n.titulo} en documento único.`,
    storageType: "dictionary",
    collectionName: Jc,
    dictionaryDocumentId: n.id,
    dictionaryRootKey: Yi,
    previewField: e[0]?.key ?? "",
    fields: e
  };
}
function lu(n) {
  return n === "textarea" ? "textarea" : n === "select" ? "select" : "text";
}
function cu(n, e) {
  if (e.type !== "json")
    return n;
  const t = uu(e.repeater);
  if (t)
    return {
      ...n,
      type: "array",
      options: [],
      itemSchema: t
    };
  const r = fu(e.value);
  return r?.type === "array" ? {
    ...n,
    type: "array",
    options: [],
    itemSchema: r.itemSchema ?? { type: "text" }
  } : r?.type === "map" ? {
    ...n,
    type: "map",
    options: [],
    mapFields: r.mapFields ?? []
  } : { ...n, type: "textarea" };
}
function uu(n) {
  return !n || !Array.isArray(n.fields) || !n.fields.length ? null : {
    type: "map",
    mapFields: n.fields.map((t) => du(t))
  };
}
function du(n) {
  const e = hu(n.type);
  return {
    key: $r(n.key),
    label: n.label || n.key,
    type: e,
    required: !1,
    placeholder: n.placeholder ?? "",
    helpText: "",
    options: []
  };
}
function hu(n) {
  return n === "textarea" ? "textarea" : "text";
}
function fu(n) {
  if (typeof n != "string" || !n.trim())
    return null;
  try {
    const e = JSON.parse(n);
    return _i(e);
  } catch {
    return null;
  }
}
function _i(n) {
  if (Array.isArray(n)) {
    const e = n.find((t) => t != null);
    return {
      type: "array",
      itemSchema: e !== void 0 ? _i(e) ?? { type: "text" } : { type: "text" }
    };
  }
  return Xi(n) ? {
    type: "map",
    mapFields: Object.entries(n).map(([t, r]) => {
      const s = _i(r), i = {
        key: $r(t),
        label: t,
        type: s?.type ?? "text",
        required: !1,
        placeholder: "",
        helpText: "",
        options: []
      };
      return s?.type === "array" && (i.itemSchema = s.itemSchema), s?.type === "map" && (i.mapFields = s.mapFields ?? []), i;
    })
  } : typeof n == "boolean" ? { type: "boolean" } : { type: "text" };
}
function pu(n, e) {
  return $r(`${n}${eu}${e}`);
}
function $r(n) {
  return n.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function mu(n) {
  return n.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "tipo-contenido";
}
function gu(n) {
  return $r(n);
}
function bu(n) {
  return String(n).trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || Fo;
}
function yu(n) {
  return String(n).trim().replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "") || Yi;
}
function Vo(n) {
  return String(n).trim().replace(/[^a-zA-Z0-9_-]/g, "").replace(/-+/g, "-");
}
function Ho(n) {
  const e = String(n ?? "").trim();
  return e ? $r(e) : "";
}
const vu = { class: "cms-root-fixed-height overflow-hidden bg-slate-100" }, xu = { class: "cms-sidebar-header mb-3 flex items-center justify-between lg:mb-0" }, wu = { class: "text-sm font-black uppercase tracking-wide text-slate-700" }, Au = { class: "cms-sidebar-scroll space-y-2" }, Eu = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Tu = { class: "flex items-start justify-between gap-2" }, Nu = { class: "material-symbols-outlined text-base leading-none" }, Su = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, _u = { class: "font-semibold" }, Cu = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, ku = {
  key: 1,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Lu = {
  key: 0,
  class: "space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3"
}, qu = { class: "font-semibold" }, Ou = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 transition hover:bg-white" }, Iu = { class: "flex items-start justify-between gap-2" }, Ru = { class: "material-symbols-outlined text-base leading-none" }, $u = {
  key: 0,
  class: "mt-3 space-y-1 border-t border-slate-200 pt-3"
}, Du = { class: "font-semibold" }, Bu = {
  key: 0,
  class: "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500"
}, Fu = { class: "cms-sidebar-footer" }, Mu = { class: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2" }, Pu = {
  type: "button",
  class: "min-w-0 flex-1 rounded-md bg-white px-3 py-2 text-left text-xs text-slate-700"
}, ju = { class: "truncate text-slate-600" }, Uu = { class: "mx-auto w-full max-w-7xl space-y-6" }, zu = { class: "text-xl font-black text-slate-900" }, Vu = { class: "mt-3" }, Hu = /* @__PURE__ */ Ot({
  __name: "AdminLayoutPage",
  setup(n) {
    const e = ps(), t = vn(), { basePath: r, loginPath: s, homePath: i } = Zi(), a = re([]), l = re(!1), c = re(!0), d = re(!0), g = re(!0);
    yn(async () => {
      await m(), typeof window < "u" && window.innerWidth < 1024 && (g.value = !1), window.addEventListener("cms-schemas-updated", L);
    }), qo(() => {
      window.removeEventListener("cms-schemas-updated", L);
    }), rr(
      () => e.fullPath,
      () => {
        e.path.startsWith(`${r}/blog`) && (c.value = !0, m()), e.path.startsWith(`${r}/schemas`) && (d.value = !0, m()), typeof window < "u" && window.innerWidth < 1024 && (g.value = !1);
      }
    );
    async function m() {
      l.value = !0;
      try {
        a.value = await ts();
      } finally {
        l.value = !1;
      }
    }
    const h = Oe(() => e.path.startsWith(`${r}/blog`)), b = Oe(() => e.path.startsWith(`${r}/schemas`)), w = Oe(() => a.value.filter((_) => _.storageType === "document")), E = Oe(() => a.value.filter((_) => _.storageType === "dictionary"));
    function k(_) {
      return e.path.startsWith(_);
    }
    function L() {
      m();
    }
    function F(_) {
      return {
        path: `${r}/blog`,
        query: { schema: _ }
      };
    }
    function U(_) {
      return {
        path: `${r}/schemas`,
        query: { schema: _ }
      };
    }
    function K(_) {
      if (!h.value)
        return !1;
      const R = typeof e.query.schema == "string" ? e.query.schema : "";
      return R ? R === _ : a.value[0]?.id === _;
    }
    function Z(_) {
      if (!b.value)
        return !1;
      const R = typeof e.query.schema == "string" ? e.query.schema : "";
      return R ? R === _ : a.value[0]?.id === _;
    }
    function le() {
      c.value = !c.value;
    }
    function z() {
      d.value = !d.value;
    }
    function V() {
      g.value = !g.value;
    }
    function ae() {
      g.value = !1;
    }
    function Q(_) {
      return /^(https?:)?\/\//i.test(_);
    }
    async function p() {
      if (i) {
        if (Q(i)) {
          typeof window < "u" && window.location.assign(i);
          return;
        }
        await t.push(i);
      }
    }
    async function v() {
      await xc(), await t.push(s);
    }
    const f = Oe(() => un.value?.email || "Sin correo"), O = Oe(() => {
      try {
        const _ = xe().auth.app.options.projectId;
        if (typeof _ == "string" && _.trim().length > 0)
          return _;
      } catch {
      }
      return "Panel";
    }), B = Oe(() => {
      if (e.path.startsWith(`${r}/blog`)) {
        const _ = typeof e.query.schema == "string" ? e.query.schema : "", R = a.value.find((T) => T.id === _) ?? a.value[0] ?? null;
        return R ? `Contenido · ${R.title}` : "Contenido";
      }
      return e.path.startsWith(`${r}/schemas`) ? "Esquemas" : e.path.startsWith(`${r}/users`) ? "Usuarios" : "Dashboard";
    });
    return (_, R) => (D(), M("main", vu, [
      g.value ? oe("", !0) : (D(), M("button", {
        key: 0,
        type: "button",
        "aria-label": "Abrir sidebar",
        class: "fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg border border-l-0 border-slate-300 bg-white px-2 py-3 text-slate-700 shadow-lg hover:bg-slate-50",
        onClick: V
      }, [...R[0] || (R[0] = [
        x("span", { class: "material-symbols-outlined text-lg" }, "left_panel_open", -1)
      ])])),
      g.value ? (D(), M("div", {
        key: 1,
        class: "fixed inset-0 z-30 bg-slate-900/20 lg:hidden",
        onClick: ae
      })) : oe("", !0),
      x("aside", {
        class: pt(["cms-sidebar-panel cms-sidebar-fixed-height fixed inset-y-0 left-0 z-40 w-80 border-r border-slate-200 bg-white shadow-xl transition-transform duration-200", g.value ? "cms-sidebar-open" : "cms-sidebar-closed"])
      }, [
        x("div", xu, [
          x("h2", wu, te(O.value), 1),
          x("div", { class: "flex items-center gap-2" }, [
            x("button", {
              type: "button",
              "aria-label": "Ir a inicio",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: p
            }, [...R[1] || (R[1] = [
              x("span", { class: "material-symbols-outlined text-lg" }, "home", -1)
            ])]),
            x("button", {
              type: "button",
              "aria-label": "Cerrar sidebar",
              class: "rounded-md border border-slate-300 px-2 py-1 text-slate-700 hover:bg-slate-50",
              onClick: ae
            }, [...R[2] || (R[2] = [
              x("span", { class: "material-symbols-outlined text-lg" }, "left_panel_close", -1)
            ])])
          ])
        ]),
        x("div", Au, [
          x("div", Eu, [
            x("div", Tu, [
              Ct(qe(_t), {
                to: `${qe(r)}/blog`,
                class: "min-w-0 flex-1"
              }, {
                default: St(() => [...R[3] || (R[3] = [
                  x("p", { class: "text-sm font-black" }, "Contenido", -1),
                  x("p", { class: "text-xs text-slate-500" }, " Formularios y registros ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              x("button", {
                type: "button",
                "aria-label": "Expandir o contraer contenido",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: le
              }, [
                x("span", Nu, te(c.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            c.value ? (D(), M("div", Su, [
              (D(!0), M(Fe, null, Me(E.value, (T) => (D(), Ut(qe(_t), {
                key: T.id,
                to: F(T.id),
                class: pt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  K(T.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: St(() => [
                  x("p", _u, te(T.title), 1),
                  x("p", {
                    class: pt(K(T.id) ? "text-slate-300" : "text-slate-500")
                  }, te(T.storageType) + " · " + te(T.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (D(), M("p", Cu, " Cargando elementos... ")) : E.value.length ? oe("", !0) : (D(), M("p", ku, " No hay diccionarios configurados. "))
            ])) : oe("", !0)
          ]),
          w.value.length ? (D(), M("div", Lu, [
            R[4] || (R[4] = x("p", { class: "px-1 text-[11px] font-black uppercase tracking-wide text-slate-500" }, "Documentos", -1)),
            (D(!0), M(Fe, null, Me(w.value, (T) => (D(), Ut(qe(_t), {
              key: `document-link-${T.id}`,
              to: F(T.id),
              class: pt([
                "block rounded-lg border px-2 py-1.5 text-xs transition",
                K(T.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              ])
            }, {
              default: St(() => [
                x("p", qu, te(T.title), 1),
                x("p", {
                  class: pt(K(T.id) ? "text-slate-300" : "text-slate-500")
                }, " document · " + te(T.collectionName), 3)
              ]),
              _: 2
            }, 1032, ["to", "class"]))), 128))
          ])) : oe("", !0),
          x("div", Ou, [
            x("div", Iu, [
              Ct(qe(_t), {
                to: `${qe(r)}/schemas`,
                class: "min-w-0 flex-1"
              }, {
                default: St(() => [...R[5] || (R[5] = [
                  x("p", { class: "text-sm font-black" }, "Esquemas", -1),
                  x("p", { class: "text-xs text-slate-500" }, " Edición de esquemas ", -1)
                ])]),
                _: 1
              }, 8, ["to"]),
              x("button", {
                type: "button",
                "aria-label": "Expandir o contraer esquemas",
                class: "rounded-md border border-slate-300 px-2 py-1 text-slate-600 hover:bg-white",
                onClick: z
              }, [
                x("span", Ru, te(d.value ? "keyboard_arrow_up" : "keyboard_arrow_down"), 1)
              ])
            ]),
            d.value ? (D(), M("div", $u, [
              (D(!0), M(Fe, null, Me(a.value, (T) => (D(), Ut(qe(_t), {
                key: `schema-edit-${T.id}`,
                to: U(T.id),
                class: pt([
                  "block rounded-lg border px-2 py-1.5 text-xs transition",
                  Z(T.id) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                ])
              }, {
                default: St(() => [
                  x("p", Du, te(T.title), 1),
                  x("p", {
                    class: pt(Z(T.id) ? "text-slate-300" : "text-slate-500")
                  }, te(T.storageType) + " · " + te(T.collectionName), 3)
                ]),
                _: 2
              }, 1032, ["to", "class"]))), 128)),
              l.value ? (D(), M("p", Bu, " Cargando elementos... ")) : oe("", !0)
            ])) : oe("", !0)
          ]),
          Ct(qe(_t), {
            to: `${qe(r)}/users`,
            class: pt([
              "block rounded-xl border p-3 transition",
              k(`${qe(r)}/users`) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-white"
            ])
          }, {
            default: St(() => [
              R[6] || (R[6] = x("p", { class: "text-sm font-black" }, "Usuarios", -1)),
              x("p", {
                class: pt(["text-xs", k(`${qe(r)}/users`) ? "text-slate-200" : "text-slate-500"])
              }, " Roles y último ingreso ", 2)
            ]),
            _: 1
          }, 8, ["to", "class"])
        ]),
        x("div", Fu, [
          x("div", Mu, [
            x("button", Pu, [
              R[7] || (R[7] = x("p", { class: "font-semibold text-slate-900" }, "Cuenta actual", -1)),
              x("p", ju, te(f.value), 1)
            ]),
            x("button", {
              type: "button",
              "aria-label": "Cerrar sesión",
              class: "rounded-md border border-slate-300 bg-white px-2 py-2 text-slate-700 hover:bg-slate-100",
              onClick: v
            }, [...R[8] || (R[8] = [
              x("span", { class: "material-symbols-outlined text-lg" }, "logout", -1)
            ])])
          ])
        ])
      ], 2),
      x("section", {
        class: pt(["cms-content-fixed-height min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8", g.value ? "cms-content-with-open-sidebar" : ""])
      }, [
        x("div", Uu, [
          R[9] || (R[9] = x("section", null, [
            x("h1", { class: "text-3xl font-black text-slate-900" }, "Dashboard"),
            x("p", { class: "mt-2 text-sm text-slate-600" }, " Esquema = campos del formulario. Formulario = datos que completa el usuario final. ")
          ], -1)),
          x("section", null, [
            x("h2", zu, te(B.value), 1),
            x("div", Vu, [
              Ct(qe(ac))
            ])
          ])
        ])
      ], 2)
    ]));
  }
}), Ku = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, s] of e)
    t[r] = s;
  return t;
}, Gu = /* @__PURE__ */ Ku(Hu, [["__scopeId", "data-v-94c956f5"]]);
var Ko = typeof global == "object" && global && global.Object === Object && global, Wu = typeof self == "object" && self && self.Object === Object && self, yt = Ko || Wu || Function("return this")(), Gt = yt.Symbol, Go = Object.prototype, Zu = Go.hasOwnProperty, Yu = Go.toString, en = Gt ? Gt.toStringTag : void 0;
function Xu(n) {
  var e = Zu.call(n, en), t = n[en];
  try {
    n[en] = void 0;
    var r = !0;
  } catch {
  }
  var s = Yu.call(n);
  return r && (e ? n[en] = t : delete n[en]), s;
}
var Qu = Object.prototype, Ju = Qu.toString;
function ed(n) {
  return Ju.call(n);
}
var td = "[object Null]", rd = "[object Undefined]", wa = Gt ? Gt.toStringTag : void 0;
function Dr(n) {
  return n == null ? n === void 0 ? rd : td : wa && wa in Object(n) ? Xu(n) : ed(n);
}
function Lt(n) {
  return n != null && typeof n == "object";
}
var nr = Array.isArray;
function Wt(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
function Wo(n) {
  return n;
}
var nd = "[object AsyncFunction]", sd = "[object Function]", id = "[object GeneratorFunction]", ad = "[object Proxy]";
function Qi(n) {
  if (!Wt(n))
    return !1;
  var e = Dr(n);
  return e == sd || e == id || e == nd || e == ad;
}
var ui = yt["__core-js_shared__"], Aa = (function() {
  var n = /[^.]+$/.exec(ui && ui.keys && ui.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
})();
function od(n) {
  return !!Aa && Aa in n;
}
var ld = Function.prototype, cd = ld.toString;
function or(n) {
  if (n != null) {
    try {
      return cd.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var ud = /[\\^$.*+?()[\]{}|]/g, dd = /^\[object .+?Constructor\]$/, hd = Function.prototype, fd = Object.prototype, pd = hd.toString, md = fd.hasOwnProperty, gd = RegExp(
  "^" + pd.call(md).replace(ud, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function bd(n) {
  if (!Wt(n) || od(n))
    return !1;
  var e = Qi(n) ? gd : dd;
  return e.test(or(n));
}
function yd(n, e) {
  return n?.[e];
}
function lr(n, e) {
  var t = yd(n, e);
  return bd(t) ? t : void 0;
}
var Ci = lr(yt, "WeakMap"), Ea = Object.create, vd = /* @__PURE__ */ (function() {
  function n() {
  }
  return function(e) {
    if (!Wt(e))
      return {};
    if (Ea)
      return Ea(e);
    n.prototype = e;
    var t = new n();
    return n.prototype = void 0, t;
  };
})();
function xd(n, e, t) {
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
function wd(n, e) {
  var t = -1, r = n.length;
  for (e || (e = Array(r)); ++t < r; )
    e[t] = n[t];
  return e;
}
var Ad = 800, Ed = 16, Td = Date.now;
function Nd(n) {
  var e = 0, t = 0;
  return function() {
    var r = Td(), s = Ed - (r - t);
    if (t = r, s > 0) {
      if (++e >= Ad)
        return arguments[0];
    } else
      e = 0;
    return n.apply(void 0, arguments);
  };
}
function Sd(n) {
  return function() {
    return n;
  };
}
var is = (function() {
  try {
    var n = lr(Object, "defineProperty");
    return n({}, "", {}), n;
  } catch {
  }
})(), _d = is ? function(n, e) {
  return is(n, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Sd(e),
    writable: !0
  });
} : Wo, Cd = Nd(_d);
function kd(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r && e(n[t], t, n) !== !1; )
    ;
  return n;
}
var Ld = 9007199254740991, qd = /^(?:0|[1-9]\d*)$/;
function Zo(n, e) {
  var t = typeof n;
  return e = e ?? Ld, !!e && (t == "number" || t != "symbol" && qd.test(n)) && n > -1 && n % 1 == 0 && n < e;
}
function Ji(n, e, t) {
  e == "__proto__" && is ? is(n, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : n[e] = t;
}
function xn(n, e) {
  return n === e || n !== n && e !== e;
}
var Od = Object.prototype, Id = Od.hasOwnProperty;
function Yo(n, e, t) {
  var r = n[e];
  (!(Id.call(n, e) && xn(r, t)) || t === void 0 && !(e in n)) && Ji(n, e, t);
}
function Rd(n, e, t, r) {
  var s = !t;
  t || (t = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var l = e[i], c = void 0;
    c === void 0 && (c = n[l]), s ? Ji(t, l, c) : Yo(t, l, c);
  }
  return t;
}
var Ta = Math.max;
function $d(n, e, t) {
  return e = Ta(e === void 0 ? n.length - 1 : e, 0), function() {
    for (var r = arguments, s = -1, i = Ta(r.length - e, 0), a = Array(i); ++s < i; )
      a[s] = r[e + s];
    s = -1;
    for (var l = Array(e + 1); ++s < e; )
      l[s] = r[s];
    return l[e] = t(a), xd(n, this, l);
  };
}
function Dd(n, e) {
  return Cd($d(n, e, Wo), n + "");
}
var Bd = 9007199254740991;
function Xo(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Bd;
}
function gs(n) {
  return n != null && Xo(n.length) && !Qi(n);
}
function Fd(n, e, t) {
  if (!Wt(t))
    return !1;
  var r = typeof e;
  return (r == "number" ? gs(t) && Zo(e, t.length) : r == "string" && e in t) ? xn(t[e], n) : !1;
}
function Md(n) {
  return Dd(function(e, t) {
    var r = -1, s = t.length, i = s > 1 ? t[s - 1] : void 0, a = s > 2 ? t[2] : void 0;
    for (i = n.length > 3 && typeof i == "function" ? (s--, i) : void 0, a && Fd(t[0], t[1], a) && (i = s < 3 ? void 0 : i, s = 1), e = Object(e); ++r < s; ) {
      var l = t[r];
      l && n(e, l, r, i);
    }
    return e;
  });
}
var Pd = Object.prototype;
function ea(n) {
  var e = n && n.constructor, t = typeof e == "function" && e.prototype || Pd;
  return n === t;
}
function jd(n, e) {
  for (var t = -1, r = Array(n); ++t < n; )
    r[t] = e(t);
  return r;
}
var Ud = "[object Arguments]";
function Na(n) {
  return Lt(n) && Dr(n) == Ud;
}
var Qo = Object.prototype, zd = Qo.hasOwnProperty, Vd = Qo.propertyIsEnumerable, ki = Na(/* @__PURE__ */ (function() {
  return arguments;
})()) ? Na : function(n) {
  return Lt(n) && zd.call(n, "callee") && !Vd.call(n, "callee");
};
function Hd() {
  return !1;
}
var Jo = typeof exports == "object" && exports && !exports.nodeType && exports, Sa = Jo && typeof module == "object" && module && !module.nodeType && module, Kd = Sa && Sa.exports === Jo, _a = Kd ? yt.Buffer : void 0, Gd = _a ? _a.isBuffer : void 0, hn = Gd || Hd, Wd = "[object Arguments]", Zd = "[object Array]", Yd = "[object Boolean]", Xd = "[object Date]", Qd = "[object Error]", Jd = "[object Function]", eh = "[object Map]", th = "[object Number]", rh = "[object Object]", nh = "[object RegExp]", sh = "[object Set]", ih = "[object String]", ah = "[object WeakMap]", oh = "[object ArrayBuffer]", lh = "[object DataView]", ch = "[object Float32Array]", uh = "[object Float64Array]", dh = "[object Int8Array]", hh = "[object Int16Array]", fh = "[object Int32Array]", ph = "[object Uint8Array]", mh = "[object Uint8ClampedArray]", gh = "[object Uint16Array]", bh = "[object Uint32Array]", Ae = {};
Ae[ch] = Ae[uh] = Ae[dh] = Ae[hh] = Ae[fh] = Ae[ph] = Ae[mh] = Ae[gh] = Ae[bh] = !0;
Ae[Wd] = Ae[Zd] = Ae[oh] = Ae[Yd] = Ae[lh] = Ae[Xd] = Ae[Qd] = Ae[Jd] = Ae[eh] = Ae[th] = Ae[rh] = Ae[nh] = Ae[sh] = Ae[ih] = Ae[ah] = !1;
function yh(n) {
  return Lt(n) && Xo(n.length) && !!Ae[Dr(n)];
}
function ta(n) {
  return function(e) {
    return n(e);
  };
}
var el = typeof exports == "object" && exports && !exports.nodeType && exports, ln = el && typeof module == "object" && module && !module.nodeType && module, vh = ln && ln.exports === el, di = vh && Ko.process, Ir = (function() {
  try {
    var n = ln && ln.require && ln.require("util").types;
    return n || di && di.binding && di.binding("util");
  } catch {
  }
})(), Ca = Ir && Ir.isTypedArray, ra = Ca ? ta(Ca) : yh, xh = Object.prototype, wh = xh.hasOwnProperty;
function tl(n, e) {
  var t = nr(n), r = !t && ki(n), s = !t && !r && hn(n), i = !t && !r && !s && ra(n), a = t || r || s || i, l = a ? jd(n.length, String) : [], c = l.length;
  for (var d in n)
    (e || wh.call(n, d)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Zo(d, c))) && l.push(d);
  return l;
}
function rl(n, e) {
  return function(t) {
    return n(e(t));
  };
}
var Ah = rl(Object.keys, Object), Eh = Object.prototype, Th = Eh.hasOwnProperty;
function Nh(n) {
  if (!ea(n))
    return Ah(n);
  var e = [];
  for (var t in Object(n))
    Th.call(n, t) && t != "constructor" && e.push(t);
  return e;
}
function Sh(n) {
  return gs(n) ? tl(n) : Nh(n);
}
function _h(n) {
  var e = [];
  if (n != null)
    for (var t in Object(n))
      e.push(t);
  return e;
}
var Ch = Object.prototype, kh = Ch.hasOwnProperty;
function Lh(n) {
  if (!Wt(n))
    return _h(n);
  var e = ea(n), t = [];
  for (var r in n)
    r == "constructor" && (e || !kh.call(n, r)) || t.push(r);
  return t;
}
function nl(n) {
  return gs(n) ? tl(n, !0) : Lh(n);
}
var fn = lr(Object, "create");
function qh() {
  this.__data__ = fn ? fn(null) : {}, this.size = 0;
}
function Oh(n) {
  var e = this.has(n) && delete this.__data__[n];
  return this.size -= e ? 1 : 0, e;
}
var Ih = "__lodash_hash_undefined__", Rh = Object.prototype, $h = Rh.hasOwnProperty;
function Dh(n) {
  var e = this.__data__;
  if (fn) {
    var t = e[n];
    return t === Ih ? void 0 : t;
  }
  return $h.call(e, n) ? e[n] : void 0;
}
var Bh = Object.prototype, Fh = Bh.hasOwnProperty;
function Mh(n) {
  var e = this.__data__;
  return fn ? e[n] !== void 0 : Fh.call(e, n);
}
var Ph = "__lodash_hash_undefined__";
function jh(n, e) {
  var t = this.__data__;
  return this.size += this.has(n) ? 0 : 1, t[n] = fn && e === void 0 ? Ph : e, this;
}
function sr(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
sr.prototype.clear = qh;
sr.prototype.delete = Oh;
sr.prototype.get = Dh;
sr.prototype.has = Mh;
sr.prototype.set = jh;
function Uh() {
  this.__data__ = [], this.size = 0;
}
function bs(n, e) {
  for (var t = n.length; t--; )
    if (xn(n[t][0], e))
      return t;
  return -1;
}
var zh = Array.prototype, Vh = zh.splice;
function Hh(n) {
  var e = this.__data__, t = bs(e, n);
  if (t < 0)
    return !1;
  var r = e.length - 1;
  return t == r ? e.pop() : Vh.call(e, t, 1), --this.size, !0;
}
function Kh(n) {
  var e = this.__data__, t = bs(e, n);
  return t < 0 ? void 0 : e[t][1];
}
function Gh(n) {
  return bs(this.__data__, n) > -1;
}
function Wh(n, e) {
  var t = this.__data__, r = bs(t, n);
  return r < 0 ? (++this.size, t.push([n, e])) : t[r][1] = e, this;
}
function It(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
It.prototype.clear = Uh;
It.prototype.delete = Hh;
It.prototype.get = Kh;
It.prototype.has = Gh;
It.prototype.set = Wh;
var pn = lr(yt, "Map");
function Zh() {
  this.size = 0, this.__data__ = {
    hash: new sr(),
    map: new (pn || It)(),
    string: new sr()
  };
}
function Yh(n) {
  var e = typeof n;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? n !== "__proto__" : n === null;
}
function ys(n, e) {
  var t = n.__data__;
  return Yh(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function Xh(n) {
  var e = ys(this, n).delete(n);
  return this.size -= e ? 1 : 0, e;
}
function Qh(n) {
  return ys(this, n).get(n);
}
function Jh(n) {
  return ys(this, n).has(n);
}
function ef(n, e) {
  var t = ys(this, n), r = t.size;
  return t.set(n, e), this.size += t.size == r ? 0 : 1, this;
}
function cr(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.clear(); ++e < t; ) {
    var r = n[e];
    this.set(r[0], r[1]);
  }
}
cr.prototype.clear = Zh;
cr.prototype.delete = Xh;
cr.prototype.get = Qh;
cr.prototype.has = Jh;
cr.prototype.set = ef;
function tf(n, e) {
  for (var t = -1, r = e.length, s = n.length; ++t < r; )
    n[s + t] = e[t];
  return n;
}
var sl = rl(Object.getPrototypeOf, Object), rf = "[object Object]", nf = Function.prototype, sf = Object.prototype, il = nf.toString, af = sf.hasOwnProperty, of = il.call(Object);
function lf(n) {
  if (!Lt(n) || Dr(n) != rf)
    return !1;
  var e = sl(n);
  if (e === null)
    return !0;
  var t = af.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && il.call(t) == of;
}
function cf() {
  this.__data__ = new It(), this.size = 0;
}
function uf(n) {
  var e = this.__data__, t = e.delete(n);
  return this.size = e.size, t;
}
function df(n) {
  return this.__data__.get(n);
}
function hf(n) {
  return this.__data__.has(n);
}
var ff = 200;
function pf(n, e) {
  var t = this.__data__;
  if (t instanceof It) {
    var r = t.__data__;
    if (!pn || r.length < ff - 1)
      return r.push([n, e]), this.size = ++t.size, this;
    t = this.__data__ = new cr(r);
  }
  return t.set(n, e), this.size = t.size, this;
}
function gt(n) {
  var e = this.__data__ = new It(n);
  this.size = e.size;
}
gt.prototype.clear = cf;
gt.prototype.delete = uf;
gt.prototype.get = df;
gt.prototype.has = hf;
gt.prototype.set = pf;
var al = typeof exports == "object" && exports && !exports.nodeType && exports, ka = al && typeof module == "object" && module && !module.nodeType && module, mf = ka && ka.exports === al, La = mf ? yt.Buffer : void 0, qa = La ? La.allocUnsafe : void 0;
function ol(n, e) {
  if (e)
    return n.slice();
  var t = n.length, r = qa ? qa(t) : new n.constructor(t);
  return n.copy(r), r;
}
function gf(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length, s = 0, i = []; ++t < r; ) {
    var a = n[t];
    e(a, t, n) && (i[s++] = a);
  }
  return i;
}
function bf() {
  return [];
}
var yf = Object.prototype, vf = yf.propertyIsEnumerable, Oa = Object.getOwnPropertySymbols, xf = Oa ? function(n) {
  return n == null ? [] : (n = Object(n), gf(Oa(n), function(e) {
    return vf.call(n, e);
  }));
} : bf;
function wf(n, e, t) {
  var r = e(n);
  return nr(n) ? r : tf(r, t(n));
}
function Li(n) {
  return wf(n, Sh, xf);
}
var qi = lr(yt, "DataView"), Oi = lr(yt, "Promise"), Ii = lr(yt, "Set"), Ia = "[object Map]", Af = "[object Object]", Ra = "[object Promise]", $a = "[object Set]", Da = "[object WeakMap]", Ba = "[object DataView]", Ef = or(qi), Tf = or(pn), Nf = or(Oi), Sf = or(Ii), _f = or(Ci), st = Dr;
(qi && st(new qi(new ArrayBuffer(1))) != Ba || pn && st(new pn()) != Ia || Oi && st(Oi.resolve()) != Ra || Ii && st(new Ii()) != $a || Ci && st(new Ci()) != Da) && (st = function(n) {
  var e = Dr(n), t = e == Af ? n.constructor : void 0, r = t ? or(t) : "";
  if (r)
    switch (r) {
      case Ef:
        return Ba;
      case Tf:
        return Ia;
      case Nf:
        return Ra;
      case Sf:
        return $a;
      case _f:
        return Da;
    }
  return e;
});
var Cf = Object.prototype, kf = Cf.hasOwnProperty;
function Lf(n) {
  var e = n.length, t = new n.constructor(e);
  return e && typeof n[0] == "string" && kf.call(n, "index") && (t.index = n.index, t.input = n.input), t;
}
var as = yt.Uint8Array;
function na(n) {
  var e = new n.constructor(n.byteLength);
  return new as(e).set(new as(n)), e;
}
function qf(n, e) {
  var t = na(n.buffer);
  return new n.constructor(t, n.byteOffset, n.byteLength);
}
var Of = /\w*$/;
function If(n) {
  var e = new n.constructor(n.source, Of.exec(n));
  return e.lastIndex = n.lastIndex, e;
}
var Fa = Gt ? Gt.prototype : void 0, Ma = Fa ? Fa.valueOf : void 0;
function Rf(n) {
  return Ma ? Object(Ma.call(n)) : {};
}
function ll(n, e) {
  var t = e ? na(n.buffer) : n.buffer;
  return new n.constructor(t, n.byteOffset, n.length);
}
var $f = "[object Boolean]", Df = "[object Date]", Bf = "[object Map]", Ff = "[object Number]", Mf = "[object RegExp]", Pf = "[object Set]", jf = "[object String]", Uf = "[object Symbol]", zf = "[object ArrayBuffer]", Vf = "[object DataView]", Hf = "[object Float32Array]", Kf = "[object Float64Array]", Gf = "[object Int8Array]", Wf = "[object Int16Array]", Zf = "[object Int32Array]", Yf = "[object Uint8Array]", Xf = "[object Uint8ClampedArray]", Qf = "[object Uint16Array]", Jf = "[object Uint32Array]";
function ep(n, e, t) {
  var r = n.constructor;
  switch (e) {
    case zf:
      return na(n);
    case $f:
    case Df:
      return new r(+n);
    case Vf:
      return qf(n);
    case Hf:
    case Kf:
    case Gf:
    case Wf:
    case Zf:
    case Yf:
    case Xf:
    case Qf:
    case Jf:
      return ll(n, t);
    case Bf:
      return new r();
    case Ff:
    case jf:
      return new r(n);
    case Mf:
      return If(n);
    case Pf:
      return new r();
    case Uf:
      return Rf(n);
  }
}
function cl(n) {
  return typeof n.constructor == "function" && !ea(n) ? vd(sl(n)) : {};
}
var tp = "[object Map]";
function rp(n) {
  return Lt(n) && st(n) == tp;
}
var Pa = Ir && Ir.isMap, np = Pa ? ta(Pa) : rp, sp = "[object Set]";
function ip(n) {
  return Lt(n) && st(n) == sp;
}
var ja = Ir && Ir.isSet, ap = ja ? ta(ja) : ip, op = 1, ul = "[object Arguments]", lp = "[object Array]", cp = "[object Boolean]", up = "[object Date]", dp = "[object Error]", dl = "[object Function]", hp = "[object GeneratorFunction]", fp = "[object Map]", pp = "[object Number]", hl = "[object Object]", mp = "[object RegExp]", gp = "[object Set]", bp = "[object String]", yp = "[object Symbol]", vp = "[object WeakMap]", xp = "[object ArrayBuffer]", wp = "[object DataView]", Ap = "[object Float32Array]", Ep = "[object Float64Array]", Tp = "[object Int8Array]", Np = "[object Int16Array]", Sp = "[object Int32Array]", _p = "[object Uint8Array]", Cp = "[object Uint8ClampedArray]", kp = "[object Uint16Array]", Lp = "[object Uint32Array]", we = {};
we[ul] = we[lp] = we[xp] = we[wp] = we[cp] = we[up] = we[Ap] = we[Ep] = we[Tp] = we[Np] = we[Sp] = we[fp] = we[pp] = we[hl] = we[mp] = we[gp] = we[bp] = we[yp] = we[_p] = we[Cp] = we[kp] = we[Lp] = !0;
we[dp] = we[dl] = we[vp] = !1;
function es(n, e, t, r, s, i) {
  var a, l = e & op;
  if (a !== void 0)
    return a;
  if (!Wt(n))
    return n;
  var c = nr(n);
  if (c)
    a = Lf(n);
  else {
    var d = st(n), g = d == dl || d == hp;
    if (hn(n))
      return ol(n, l);
    if (d == hl || d == ul || g && !s)
      a = g ? {} : cl(n);
    else {
      if (!we[d])
        return s ? n : {};
      a = ep(n, d, l);
    }
  }
  i || (i = new gt());
  var m = i.get(n);
  if (m)
    return m;
  i.set(n, a), ap(n) ? n.forEach(function(w) {
    a.add(es(w, e, t, w, n, i));
  }) : np(n) && n.forEach(function(w, E) {
    a.set(E, es(w, e, t, E, n, i));
  });
  var h = Li, b = c ? void 0 : h(n);
  return kd(b || n, function(w, E) {
    b && (E = w, w = n[E]), Yo(a, E, es(w, e, t, E, n, i));
  }), a;
}
var qp = 1, Op = 4;
function Cr(n) {
  return es(n, qp | Op);
}
var Ip = "__lodash_hash_undefined__";
function Rp(n) {
  return this.__data__.set(n, Ip), this;
}
function $p(n) {
  return this.__data__.has(n);
}
function os(n) {
  var e = -1, t = n == null ? 0 : n.length;
  for (this.__data__ = new cr(); ++e < t; )
    this.add(n[e]);
}
os.prototype.add = os.prototype.push = Rp;
os.prototype.has = $p;
function Dp(n, e) {
  for (var t = -1, r = n == null ? 0 : n.length; ++t < r; )
    if (e(n[t], t, n))
      return !0;
  return !1;
}
function Bp(n, e) {
  return n.has(e);
}
var Fp = 1, Mp = 2;
function fl(n, e, t, r, s, i) {
  var a = t & Fp, l = n.length, c = e.length;
  if (l != c && !(a && c > l))
    return !1;
  var d = i.get(n), g = i.get(e);
  if (d && g)
    return d == e && g == n;
  var m = -1, h = !0, b = t & Mp ? new os() : void 0;
  for (i.set(n, e), i.set(e, n); ++m < l; ) {
    var w = n[m], E = e[m];
    if (r)
      var k = a ? r(E, w, m, e, n, i) : r(w, E, m, n, e, i);
    if (k !== void 0) {
      if (k)
        continue;
      h = !1;
      break;
    }
    if (b) {
      if (!Dp(e, function(L, F) {
        if (!Bp(b, F) && (w === L || s(w, L, t, r, i)))
          return b.push(F);
      })) {
        h = !1;
        break;
      }
    } else if (!(w === E || s(w, E, t, r, i))) {
      h = !1;
      break;
    }
  }
  return i.delete(n), i.delete(e), h;
}
function Pp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r, s) {
    t[++e] = [s, r];
  }), t;
}
function jp(n) {
  var e = -1, t = Array(n.size);
  return n.forEach(function(r) {
    t[++e] = r;
  }), t;
}
var Up = 1, zp = 2, Vp = "[object Boolean]", Hp = "[object Date]", Kp = "[object Error]", Gp = "[object Map]", Wp = "[object Number]", Zp = "[object RegExp]", Yp = "[object Set]", Xp = "[object String]", Qp = "[object Symbol]", Jp = "[object ArrayBuffer]", em = "[object DataView]", Ua = Gt ? Gt.prototype : void 0, hi = Ua ? Ua.valueOf : void 0;
function tm(n, e, t, r, s, i, a) {
  switch (t) {
    case em:
      if (n.byteLength != e.byteLength || n.byteOffset != e.byteOffset)
        return !1;
      n = n.buffer, e = e.buffer;
    case Jp:
      return !(n.byteLength != e.byteLength || !i(new as(n), new as(e)));
    case Vp:
    case Hp:
    case Wp:
      return xn(+n, +e);
    case Kp:
      return n.name == e.name && n.message == e.message;
    case Zp:
    case Xp:
      return n == e + "";
    case Gp:
      var l = Pp;
    case Yp:
      var c = r & Up;
      if (l || (l = jp), n.size != e.size && !c)
        return !1;
      var d = a.get(n);
      if (d)
        return d == e;
      r |= zp, a.set(n, e);
      var g = fl(l(n), l(e), r, s, i, a);
      return a.delete(n), g;
    case Qp:
      if (hi)
        return hi.call(n) == hi.call(e);
  }
  return !1;
}
var rm = 1, nm = Object.prototype, sm = nm.hasOwnProperty;
function im(n, e, t, r, s, i) {
  var a = t & rm, l = Li(n), c = l.length, d = Li(e), g = d.length;
  if (c != g && !a)
    return !1;
  for (var m = c; m--; ) {
    var h = l[m];
    if (!(a ? h in e : sm.call(e, h)))
      return !1;
  }
  var b = i.get(n), w = i.get(e);
  if (b && w)
    return b == e && w == n;
  var E = !0;
  i.set(n, e), i.set(e, n);
  for (var k = a; ++m < c; ) {
    h = l[m];
    var L = n[h], F = e[h];
    if (r)
      var U = a ? r(F, L, h, e, n, i) : r(L, F, h, n, e, i);
    if (!(U === void 0 ? L === F || s(L, F, t, r, i) : U)) {
      E = !1;
      break;
    }
    k || (k = h == "constructor");
  }
  if (E && !k) {
    var K = n.constructor, Z = e.constructor;
    K != Z && "constructor" in n && "constructor" in e && !(typeof K == "function" && K instanceof K && typeof Z == "function" && Z instanceof Z) && (E = !1);
  }
  return i.delete(n), i.delete(e), E;
}
var am = 1, za = "[object Arguments]", Va = "[object Array]", Un = "[object Object]", om = Object.prototype, Ha = om.hasOwnProperty;
function lm(n, e, t, r, s, i) {
  var a = nr(n), l = nr(e), c = a ? Va : st(n), d = l ? Va : st(e);
  c = c == za ? Un : c, d = d == za ? Un : d;
  var g = c == Un, m = d == Un, h = c == d;
  if (h && hn(n)) {
    if (!hn(e))
      return !1;
    a = !0, g = !1;
  }
  if (h && !g)
    return i || (i = new gt()), a || ra(n) ? fl(n, e, t, r, s, i) : tm(n, e, c, t, r, s, i);
  if (!(t & am)) {
    var b = g && Ha.call(n, "__wrapped__"), w = m && Ha.call(e, "__wrapped__");
    if (b || w) {
      var E = b ? n.value() : n, k = w ? e.value() : e;
      return i || (i = new gt()), s(E, k, t, r, i);
    }
  }
  return h ? (i || (i = new gt()), im(n, e, t, r, s, i)) : !1;
}
function pl(n, e, t, r, s) {
  return n === e ? !0 : n == null || e == null || !Lt(n) && !Lt(e) ? n !== n && e !== e : lm(n, e, t, r, pl, s);
}
function cm(n) {
  return function(e, t, r) {
    for (var s = -1, i = Object(e), a = r(e), l = a.length; l--; ) {
      var c = a[++s];
      if (t(i[c], c, i) === !1)
        break;
    }
    return e;
  };
}
var um = cm();
function Ri(n, e, t) {
  (t !== void 0 && !xn(n[e], t) || t === void 0 && !(e in n)) && Ji(n, e, t);
}
function dm(n) {
  return Lt(n) && gs(n);
}
function $i(n, e) {
  if (!(e === "constructor" && typeof n[e] == "function") && e != "__proto__")
    return n[e];
}
function hm(n) {
  return Rd(n, nl(n));
}
function fm(n, e, t, r, s, i, a) {
  var l = $i(n, t), c = $i(e, t), d = a.get(c);
  if (d) {
    Ri(n, t, d);
    return;
  }
  var g = i ? i(l, c, t + "", n, e, a) : void 0, m = g === void 0;
  if (m) {
    var h = nr(c), b = !h && hn(c), w = !h && !b && ra(c);
    g = c, h || b || w ? nr(l) ? g = l : dm(l) ? g = wd(l) : b ? (m = !1, g = ol(c, !0)) : w ? (m = !1, g = ll(c, !0)) : g = [] : lf(c) || ki(c) ? (g = l, ki(l) ? g = hm(l) : (!Wt(l) || Qi(l)) && (g = cl(c))) : m = !1;
  }
  m && (a.set(c, g), s(g, c, r, i, a), a.delete(c)), Ri(n, t, g);
}
function ml(n, e, t, r, s) {
  n !== e && um(e, function(i, a) {
    if (s || (s = new gt()), Wt(i))
      fm(n, e, a, t, ml, r, s);
    else {
      var l = r ? r($i(n, a), i, a + "", n, e, s) : void 0;
      l === void 0 && (l = i), Ri(n, a, l);
    }
  }, nl);
}
function sa(n, e) {
  return pl(n, e);
}
var zt = Md(function(n, e, t) {
  ml(n, e, t);
}), W = /* @__PURE__ */ ((n) => (n[n.TYPE = 3] = "TYPE", n[n.LEVEL = 12] = "LEVEL", n[n.ATTRIBUTE = 13] = "ATTRIBUTE", n[n.BLOT = 14] = "BLOT", n[n.INLINE = 7] = "INLINE", n[n.BLOCK = 11] = "BLOCK", n[n.BLOCK_BLOT = 10] = "BLOCK_BLOT", n[n.INLINE_BLOT = 6] = "INLINE_BLOT", n[n.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", n[n.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", n[n.ANY = 15] = "ANY", n))(W || {});
class bt {
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
class kr extends Error {
  constructor(e) {
    e = "[Parchment] " + e, super(e), this.message = e, this.name = this.constructor.name;
  }
}
const gl = class Di {
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
      throw new kr(`Unable to create ${t} blot`);
    const i = s, a = (
      // @ts-expect-error Fix me later
      t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : i.create(r)
    ), l = new i(e, a, r);
    return Di.blots.set(l.domNode, l), l;
  }
  find(e, t = !1) {
    return Di.find(e, t);
  }
  query(e, t = W.ANY) {
    let r;
    return typeof e == "string" ? r = this.types[e] || this.attributes[e] : e instanceof Text || e.nodeType === Node.TEXT_NODE ? r = this.types.text : typeof e == "number" ? e & W.LEVEL & W.BLOCK ? r = this.types.block : e & W.LEVEL & W.INLINE && (r = this.types.inline) : e instanceof Element && ((e.getAttribute("class") || "").split(/\s+/).some((s) => (r = this.classes[s], !!r)), r = r || this.tags[e.tagName]), r == null ? null : "scope" in r && t & W.LEVEL & r.scope && t & W.TYPE & r.scope ? r : null;
  }
  register(...e) {
    return e.map((t) => {
      const r = "blotName" in t, s = "attrName" in t;
      if (!r && !s)
        throw new kr("Invalid definition");
      if (r && t.blotName === "abstract")
        throw new kr("Cannot register abstract class");
      const i = r ? t.blotName : s ? t.attrName : void 0;
      return this.types[i] = t, s ? typeof t.keyName == "string" && (this.attributes[t.keyName] = t) : r && (t.className && (this.classes[t.className] = t), t.tagName && (Array.isArray(t.tagName) ? t.tagName = t.tagName.map((a) => a.toUpperCase()) : t.tagName = t.tagName.toUpperCase(), (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((a) => {
        (this.tags[a] == null || t.className == null) && (this.tags[a] = t);
      }))), t;
    });
  }
};
gl.blots = /* @__PURE__ */ new WeakMap();
let Rr = gl;
function Ka(n, e) {
  return (n.getAttribute("class") || "").split(/\s+/).filter((t) => t.indexOf(`${e}-`) === 0);
}
class pm extends bt {
  static keys(e) {
    return (e.getAttribute("class") || "").split(/\s+/).map((t) => t.split("-").slice(0, -1).join("-"));
  }
  add(e, t) {
    return this.canAdd(e, t) ? (this.remove(e), e.classList.add(`${this.keyName}-${t}`), !0) : !1;
  }
  remove(e) {
    Ka(e, this.keyName).forEach((t) => {
      e.classList.remove(t);
    }), e.classList.length === 0 && e.removeAttribute("class");
  }
  value(e) {
    const t = (Ka(e, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(e, t) ? t : "";
  }
}
const ct = pm;
function fi(n) {
  const e = n.split("-"), t = e.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  return e[0] + t;
}
class mm extends bt {
  static keys(e) {
    return (e.getAttribute("style") || "").split(";").map((t) => t.split(":")[0].trim());
  }
  add(e, t) {
    return this.canAdd(e, t) ? (e.style[fi(this.keyName)] = t, !0) : !1;
  }
  remove(e) {
    e.style[fi(this.keyName)] = "", e.getAttribute("style") || e.removeAttribute("style");
  }
  value(e) {
    const t = e.style[fi(this.keyName)];
    return this.canAdd(e, t) ? t : "";
  }
}
const Zt = mm;
class gm {
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
    const t = bt.keys(this.domNode), r = ct.keys(this.domNode), s = Zt.keys(this.domNode);
    t.concat(r).concat(s).forEach((i) => {
      const a = e.scroll.query(i, W.ATTRIBUTE);
      a instanceof bt && (this.attributes[a.attrName] = a);
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
const vs = gm, bl = class {
  constructor(e, t) {
    this.scroll = e, this.domNode = t, Rr.blots.set(t, this), this.prev = null, this.next = null;
  }
  static create(e) {
    if (this.tagName == null)
      throw new kr("Blot definition missing tagName");
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
      throw new kr(`Cannot wrap ${e}`);
    return r.appendChild(this), r;
  }
};
bl.blotName = "abstract";
let yl = bl;
const vl = class extends yl {
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
vl.scope = W.INLINE_BLOT;
let bm = vl;
const Be = bm;
class ym {
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
function Ga(n, e) {
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
const xl = class Ft extends yl {
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
    this.uiNode != null && this.uiNode.remove(), this.uiNode = e, Ft.uiClass && this.uiNode.classList.add(Ft.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new ym(), Array.from(this.domNode.childNodes).filter((e) => e !== this.uiNode).reverse().forEach((e) => {
      try {
        const t = Ga(e, this.scroll);
        this.insertBefore(t, this.children.head || void 0);
      } catch (t) {
        if (t instanceof kr)
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
    return e.blotName == null && e(r) || e.blotName != null && r instanceof e ? [r, s] : r instanceof Ft ? r.descendant(e, s) : [null, -1];
  }
  descendants(e, t = 0, r = Number.MAX_VALUE) {
    let s = [], i = r;
    return this.children.forEachAt(
      t,
      r,
      (a, l, c) => {
        (e.blotName == null && e(a) || e.blotName != null && a instanceof e) && s.push(a), a instanceof Ft && (s = s.concat(
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
      ) || (t.statics.scope === W.BLOCK_BLOT ? (t.next != null && this.splitAfter(t), t.prev != null && this.splitAfter(t.prev), t.parent.unwrap(), e = !0) : t instanceof Ft ? t.unwrap() : t.remove());
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
    return r instanceof Ft ? i.concat(r.path(s, t)) : (r != null && i.push([r, s]), i);
  }
  removeChild(e) {
    this.children.remove(e);
  }
  replaceWith(e, t) {
    const r = typeof e == "string" ? this.scroll.create(e, t) : e;
    return r instanceof Ft && this.moveChildren(r), super.replaceWith(r);
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
      const l = Ga(i, this.scroll);
      (l.next !== a || l.next == null) && (l.parent != null && l.parent.removeChild(this), this.insertBefore(l, a || void 0));
    }), this.enforceAllowedChildren();
  }
};
xl.uiClass = "";
let vm = xl;
const ot = vm;
function xm(n, e) {
  if (Object.keys(n).length !== Object.keys(e).length)
    return !1;
  for (const t in n)
    if (n[t] !== e[t])
      return !1;
  return !0;
}
const Er = class Tr extends ot {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(Tr.blotName);
    if (!(r != null && e.tagName === r.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new vs(this.domNode);
  }
  format(e, t) {
    if (e === this.statics.blotName && !t)
      this.children.forEach((r) => {
        r instanceof Tr || (r = r.wrap(Tr.blotName, !0)), this.attributes.copy(r);
      }), this.unwrap();
    else {
      const r = this.scroll.query(e, W.INLINE);
      if (r == null)
        return;
      r instanceof bt ? this.attributes.attribute(r, t) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t);
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
    r instanceof Tr && r.prev === this && xm(t, r.formats()) && (r.moveChildren(this), r.remove());
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
    return r instanceof Tr && this.attributes.move(r), r;
  }
};
Er.allowedChildren = [Er, Be], Er.blotName = "inline", Er.scope = W.INLINE_BLOT, Er.tagName = "SPAN";
let wm = Er;
const ia = wm, Nr = class Bi extends ot {
  static create(e) {
    return super.create(e);
  }
  static formats(e, t) {
    const r = t.query(Bi.blotName);
    if (!(r != null && e.tagName === r.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return e.tagName.toLowerCase();
    }
  }
  constructor(e, t) {
    super(e, t), this.attributes = new vs(this.domNode);
  }
  format(e, t) {
    const r = this.scroll.query(e, W.BLOCK);
    r != null && (r instanceof bt ? this.attributes.attribute(r, t) : e === this.statics.blotName && !t ? this.replaceWith(Bi.blotName) : t && (e !== this.statics.blotName || this.formats()[e] !== t) && this.replaceWith(e, t));
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
  ia,
  Nr,
  Be
];
let Am = Nr;
const mn = Am, Fi = class extends ot {
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
Fi.blotName = "container", Fi.scope = W.BLOCK_BLOT;
let Em = Fi;
const xs = Em;
class Tm extends Be {
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
const We = Tm, Nm = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, Sm = 100, Sr = class extends ot {
  constructor(e, t) {
    super(null, t), this.registry = e, this.scroll = this, this.build(), this.observer = new MutationObserver((r) => {
      this.update(r);
    }), this.observer.observe(this.domNode, Nm), this.attach();
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
      if (c >= Sm)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (l.forEach((d) => {
        const g = this.find(d.target, !0);
        g != null && (g.domNode === d.target && (d.type === "childList" ? (i(this.find(d.previousSibling, !1)), Array.from(d.addedNodes).forEach((m) => {
          const h = this.find(m, !1);
          i(h, !1), h instanceof ot && h.children.forEach((b) => {
            i(b, !1);
          });
        })) : d.type === "attributes" && i(g.prev)), i(g));
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
Sr.blotName = "scroll", Sr.defaultChild = mn, Sr.allowedChildren = [mn, xs], Sr.scope = W.BLOCK_BLOT, Sr.tagName = "DIV";
let _m = Sr;
const aa = _m, Mi = class wl extends Be {
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
    super.optimize(e), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof wl && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
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
Mi.blotName = "text", Mi.scope = W.INLINE_BLOT;
let Cm = Mi;
const ls = Cm, km = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: bt,
  AttributorStore: vs,
  BlockBlot: mn,
  ClassAttributor: ct,
  ContainerBlot: xs,
  EmbedBlot: We,
  InlineBlot: ia,
  LeafBlot: Be,
  ParentBlot: ot,
  Registry: Rr,
  Scope: W,
  ScrollBlot: aa,
  StyleAttributor: Zt,
  TextBlot: ls
}, Symbol.toStringTag, { value: "Module" }));
var Pt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Al(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var zn = { exports: {} }, pi, Wa;
function Lm() {
  if (Wa) return pi;
  Wa = 1;
  var n = -1, e = 1, t = 0;
  function r(p, v, f, O, B) {
    if (p === v)
      return p ? [[t, p]] : [];
    if (f != null) {
      var _ = ae(p, v, f);
      if (_)
        return _;
    }
    var R = l(p, v), T = p.substring(0, R);
    p = p.substring(R), v = v.substring(R), R = d(p, v);
    var A = p.substring(p.length - R);
    p = p.substring(0, p.length - R), v = v.substring(0, v.length - R);
    var I = s(p, v);
    return T && I.unshift([t, T]), A && I.push([t, A]), F(I, B), O && m(I), I;
  }
  function s(p, v) {
    var f;
    if (!p)
      return [[e, v]];
    if (!v)
      return [[n, p]];
    var O = p.length > v.length ? p : v, B = p.length > v.length ? v : p, _ = O.indexOf(B);
    if (_ !== -1)
      return f = [
        [e, O.substring(0, _)],
        [t, B],
        [e, O.substring(_ + B.length)]
      ], p.length > v.length && (f[0][0] = f[2][0] = n), f;
    if (B.length === 1)
      return [
        [n, p],
        [e, v]
      ];
    var R = g(p, v);
    if (R) {
      var T = R[0], A = R[1], I = R[2], j = R[3], X = R[4], se = r(T, I), ee = r(A, j);
      return se.concat([[t, X]], ee);
    }
    return i(p, v);
  }
  function i(p, v) {
    for (var f = p.length, O = v.length, B = Math.ceil((f + O) / 2), _ = B, R = 2 * B, T = new Array(R), A = new Array(R), I = 0; I < R; I++)
      T[I] = -1, A[I] = -1;
    T[_ + 1] = 0, A[_ + 1] = 0;
    for (var j = f - O, X = j % 2 !== 0, se = 0, ee = 0, Y = 0, ye = 0, ve = 0; ve < B; ve++) {
      for (var ie = -ve + se; ie <= ve - ee; ie += 2) {
        var he = _ + ie, ce;
        ie === -ve || ie !== ve && T[he - 1] < T[he + 1] ? ce = T[he + 1] : ce = T[he - 1] + 1;
        for (var fe = ce - ie; ce < f && fe < O && p.charAt(ce) === v.charAt(fe); )
          ce++, fe++;
        if (T[he] = ce, ce > f)
          ee += 2;
        else if (fe > O)
          se += 2;
        else if (X) {
          var me = _ + j - ie;
          if (me >= 0 && me < R && A[me] !== -1) {
            var ge = f - A[me];
            if (ce >= ge)
              return a(p, v, ce, fe);
          }
        }
      }
      for (var Ee = -ve + Y; Ee <= ve - ye; Ee += 2) {
        var me = _ + Ee, ge;
        Ee === -ve || Ee !== ve && A[me - 1] < A[me + 1] ? ge = A[me + 1] : ge = A[me - 1] + 1;
        for (var Ne = ge - Ee; ge < f && Ne < O && p.charAt(f - ge - 1) === v.charAt(O - Ne - 1); )
          ge++, Ne++;
        if (A[me] = ge, ge > f)
          ye += 2;
        else if (Ne > O)
          Y += 2;
        else if (!X) {
          var he = _ + j - Ee;
          if (he >= 0 && he < R && T[he] !== -1) {
            var ce = T[he], fe = _ + ce - he;
            if (ge = f - ge, ce >= ge)
              return a(p, v, ce, fe);
          }
        }
      }
    }
    return [
      [n, p],
      [e, v]
    ];
  }
  function a(p, v, f, O) {
    var B = p.substring(0, f), _ = v.substring(0, O), R = p.substring(f), T = v.substring(O), A = r(B, _), I = r(R, T);
    return A.concat(I);
  }
  function l(p, v) {
    if (!p || !v || p.charAt(0) !== v.charAt(0))
      return 0;
    for (var f = 0, O = Math.min(p.length, v.length), B = O, _ = 0; f < B; )
      p.substring(_, B) == v.substring(_, B) ? (f = B, _ = f) : O = B, B = Math.floor((O - f) / 2 + f);
    return U(p.charCodeAt(B - 1)) && B--, B;
  }
  function c(p, v) {
    var f = p.length, O = v.length;
    if (f == 0 || O == 0)
      return 0;
    f > O ? p = p.substring(f - O) : f < O && (v = v.substring(0, f));
    var B = Math.min(f, O);
    if (p == v)
      return B;
    for (var _ = 0, R = 1; ; ) {
      var T = p.substring(B - R), A = v.indexOf(T);
      if (A == -1)
        return _;
      R += A, (A == 0 || p.substring(B - R) == v.substring(0, R)) && (_ = R, R++);
    }
  }
  function d(p, v) {
    if (!p || !v || p.slice(-1) !== v.slice(-1))
      return 0;
    for (var f = 0, O = Math.min(p.length, v.length), B = O, _ = 0; f < B; )
      p.substring(p.length - B, p.length - _) == v.substring(v.length - B, v.length - _) ? (f = B, _ = f) : O = B, B = Math.floor((O - f) / 2 + f);
    return K(p.charCodeAt(p.length - B)) && B--, B;
  }
  function g(p, v) {
    var f = p.length > v.length ? p : v, O = p.length > v.length ? v : p;
    if (f.length < 4 || O.length * 2 < f.length)
      return null;
    function B(ee, Y, ye) {
      for (var ve = ee.substring(ye, ye + Math.floor(ee.length / 4)), ie = -1, he = "", ce, fe, me, ge; (ie = Y.indexOf(ve, ie + 1)) !== -1; ) {
        var Ee = l(
          ee.substring(ye),
          Y.substring(ie)
        ), Ne = d(
          ee.substring(0, ye),
          Y.substring(0, ie)
        );
        he.length < Ne + Ee && (he = Y.substring(ie - Ne, ie) + Y.substring(ie, ie + Ee), ce = ee.substring(0, ye - Ne), fe = ee.substring(ye + Ee), me = Y.substring(0, ie - Ne), ge = Y.substring(ie + Ee));
      }
      return he.length * 2 >= ee.length ? [
        ce,
        fe,
        me,
        ge,
        he
      ] : null;
    }
    var _ = B(
      f,
      O,
      Math.ceil(f.length / 4)
    ), R = B(
      f,
      O,
      Math.ceil(f.length / 2)
    ), T;
    if (!_ && !R)
      return null;
    R ? _ ? T = _[4].length > R[4].length ? _ : R : T = R : T = _;
    var A, I, j, X;
    p.length > v.length ? (A = T[0], I = T[1], j = T[2], X = T[3]) : (j = T[0], X = T[1], A = T[2], I = T[3]);
    var se = T[4];
    return [A, I, j, X, se];
  }
  function m(p) {
    for (var v = !1, f = [], O = 0, B = null, _ = 0, R = 0, T = 0, A = 0, I = 0; _ < p.length; )
      p[_][0] == t ? (f[O++] = _, R = A, T = I, A = 0, I = 0, B = p[_][1]) : (p[_][0] == e ? A += p[_][1].length : I += p[_][1].length, B && B.length <= Math.max(R, T) && B.length <= Math.max(A, I) && (p.splice(f[O - 1], 0, [
        n,
        B
      ]), p[f[O - 1] + 1][0] = e, O--, O--, _ = O > 0 ? f[O - 1] : -1, R = 0, T = 0, A = 0, I = 0, B = null, v = !0)), _++;
    for (v && F(p), L(p), _ = 1; _ < p.length; ) {
      if (p[_ - 1][0] == n && p[_][0] == e) {
        var j = p[_ - 1][1], X = p[_][1], se = c(j, X), ee = c(X, j);
        se >= ee ? (se >= j.length / 2 || se >= X.length / 2) && (p.splice(_, 0, [
          t,
          X.substring(0, se)
        ]), p[_ - 1][1] = j.substring(
          0,
          j.length - se
        ), p[_ + 1][1] = X.substring(se), _++) : (ee >= j.length / 2 || ee >= X.length / 2) && (p.splice(_, 0, [
          t,
          j.substring(0, ee)
        ]), p[_ - 1][0] = e, p[_ - 1][1] = X.substring(
          0,
          X.length - ee
        ), p[_ + 1][0] = n, p[_ + 1][1] = j.substring(ee), _++), _++;
      }
      _++;
    }
  }
  var h = /[^a-zA-Z0-9]/, b = /\s/, w = /[\r\n]/, E = /\n\r?\n$/, k = /^\r?\n\r?\n/;
  function L(p) {
    function v(ee, Y) {
      if (!ee || !Y)
        return 6;
      var ye = ee.charAt(ee.length - 1), ve = Y.charAt(0), ie = ye.match(h), he = ve.match(h), ce = ie && ye.match(b), fe = he && ve.match(b), me = ce && ye.match(w), ge = fe && ve.match(w), Ee = me && ee.match(E), Ne = ge && Y.match(k);
      return Ee || Ne ? 5 : me || ge ? 4 : ie && !ce && fe ? 3 : ce || fe ? 2 : ie || he ? 1 : 0;
    }
    for (var f = 1; f < p.length - 1; ) {
      if (p[f - 1][0] == t && p[f + 1][0] == t) {
        var O = p[f - 1][1], B = p[f][1], _ = p[f + 1][1], R = d(O, B);
        if (R) {
          var T = B.substring(B.length - R);
          O = O.substring(0, O.length - R), B = T + B.substring(0, B.length - R), _ = T + _;
        }
        for (var A = O, I = B, j = _, X = v(O, B) + v(B, _); B.charAt(0) === _.charAt(0); ) {
          O += B.charAt(0), B = B.substring(1) + _.charAt(0), _ = _.substring(1);
          var se = v(O, B) + v(B, _);
          se >= X && (X = se, A = O, I = B, j = _);
        }
        p[f - 1][1] != A && (A ? p[f - 1][1] = A : (p.splice(f - 1, 1), f--), p[f][1] = I, j ? p[f + 1][1] = j : (p.splice(f + 1, 1), f--));
      }
      f++;
    }
  }
  function F(p, v) {
    p.push([t, ""]);
    for (var f = 0, O = 0, B = 0, _ = "", R = "", T; f < p.length; ) {
      if (f < p.length - 1 && !p[f][1]) {
        p.splice(f, 1);
        continue;
      }
      switch (p[f][0]) {
        case e:
          B++, R += p[f][1], f++;
          break;
        case n:
          O++, _ += p[f][1], f++;
          break;
        case t:
          var A = f - B - O - 1;
          if (v) {
            if (A >= 0 && le(p[A][1])) {
              var I = p[A][1].slice(-1);
              if (p[A][1] = p[A][1].slice(
                0,
                -1
              ), _ = I + _, R = I + R, !p[A][1]) {
                p.splice(A, 1), f--;
                var j = A - 1;
                p[j] && p[j][0] === e && (B++, R = p[j][1] + R, j--), p[j] && p[j][0] === n && (O++, _ = p[j][1] + _, j--), A = j;
              }
            }
            if (Z(p[f][1])) {
              var I = p[f][1].charAt(0);
              p[f][1] = p[f][1].slice(1), _ += I, R += I;
            }
          }
          if (f < p.length - 1 && !p[f][1]) {
            p.splice(f, 1);
            break;
          }
          if (_.length > 0 || R.length > 0) {
            _.length > 0 && R.length > 0 && (T = l(R, _), T !== 0 && (A >= 0 ? p[A][1] += R.substring(
              0,
              T
            ) : (p.splice(0, 0, [
              t,
              R.substring(0, T)
            ]), f++), R = R.substring(T), _ = _.substring(T)), T = d(R, _), T !== 0 && (p[f][1] = R.substring(R.length - T) + p[f][1], R = R.substring(
              0,
              R.length - T
            ), _ = _.substring(
              0,
              _.length - T
            )));
            var X = B + O;
            _.length === 0 && R.length === 0 ? (p.splice(f - X, X), f = f - X) : _.length === 0 ? (p.splice(f - X, X, [e, R]), f = f - X + 1) : R.length === 0 ? (p.splice(f - X, X, [n, _]), f = f - X + 1) : (p.splice(
              f - X,
              X,
              [n, _],
              [e, R]
            ), f = f - X + 2);
          }
          f !== 0 && p[f - 1][0] === t ? (p[f - 1][1] += p[f][1], p.splice(f, 1)) : f++, B = 0, O = 0, _ = "", R = "";
          break;
      }
    }
    p[p.length - 1][1] === "" && p.pop();
    var se = !1;
    for (f = 1; f < p.length - 1; )
      p[f - 1][0] === t && p[f + 1][0] === t && (p[f][1].substring(
        p[f][1].length - p[f - 1][1].length
      ) === p[f - 1][1] ? (p[f][1] = p[f - 1][1] + p[f][1].substring(
        0,
        p[f][1].length - p[f - 1][1].length
      ), p[f + 1][1] = p[f - 1][1] + p[f + 1][1], p.splice(f - 1, 1), se = !0) : p[f][1].substring(0, p[f + 1][1].length) == p[f + 1][1] && (p[f - 1][1] += p[f + 1][1], p[f][1] = p[f][1].substring(p[f + 1][1].length) + p[f + 1][1], p.splice(f + 1, 1), se = !0)), f++;
    se && F(p, v);
  }
  function U(p) {
    return p >= 55296 && p <= 56319;
  }
  function K(p) {
    return p >= 56320 && p <= 57343;
  }
  function Z(p) {
    return K(p.charCodeAt(0));
  }
  function le(p) {
    return U(p.charCodeAt(p.length - 1));
  }
  function z(p) {
    for (var v = [], f = 0; f < p.length; f++)
      p[f][1].length > 0 && v.push(p[f]);
    return v;
  }
  function V(p, v, f, O) {
    return le(p) || Z(O) ? null : z([
      [t, p],
      [n, v],
      [e, f],
      [t, O]
    ]);
  }
  function ae(p, v, f) {
    var O = typeof f == "number" ? { index: f, length: 0 } : f.oldRange, B = typeof f == "number" ? null : f.newRange, _ = p.length, R = v.length;
    if (O.length === 0 && (B === null || B.length === 0)) {
      var T = O.index, A = p.slice(0, T), I = p.slice(T), j = B ? B.index : null;
      e: {
        var X = T + R - _;
        if (j !== null && j !== X || X < 0 || X > R)
          break e;
        var se = v.slice(0, X), ee = v.slice(X);
        if (ee !== I)
          break e;
        var Y = Math.min(T, X), ye = A.slice(0, Y), ve = se.slice(0, Y);
        if (ye !== ve)
          break e;
        var ie = A.slice(Y), he = se.slice(Y);
        return V(ye, ie, he, I);
      }
      e: {
        if (j !== null && j !== T)
          break e;
        var ce = T, se = v.slice(0, ce), ee = v.slice(ce);
        if (se !== A)
          break e;
        var fe = Math.min(_ - ce, R - ce), me = I.slice(I.length - fe), ge = ee.slice(ee.length - fe);
        if (me !== ge)
          break e;
        var ie = I.slice(0, I.length - fe), he = ee.slice(0, ee.length - fe);
        return V(A, ie, he, me);
      }
    }
    if (O.length > 0 && B && B.length === 0)
      e: {
        var ye = p.slice(0, O.index), me = p.slice(O.index + O.length), Y = ye.length, fe = me.length;
        if (R < Y + fe)
          break e;
        var ve = v.slice(0, Y), ge = v.slice(R - fe);
        if (ye !== ve || me !== ge)
          break e;
        var ie = p.slice(Y, _ - fe), he = v.slice(Y, R - fe);
        return V(ye, ie, he, me);
      }
    return null;
  }
  function Q(p, v, f, O) {
    return r(p, v, f, O, !0);
  }
  return Q.INSERT = e, Q.DELETE = n, Q.EQUAL = t, pi = Q, pi;
}
var rn = { exports: {} };
rn.exports;
var Za;
function El() {
  return Za || (Za = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", a = "[object Array]", l = "[object Boolean]", c = "[object Date]", d = "[object Error]", g = "[object Function]", m = "[object GeneratorFunction]", h = "[object Map]", b = "[object Number]", w = "[object Object]", E = "[object Promise]", k = "[object RegExp]", L = "[object Set]", F = "[object String]", U = "[object Symbol]", K = "[object WeakMap]", Z = "[object ArrayBuffer]", le = "[object DataView]", z = "[object Float32Array]", V = "[object Float64Array]", ae = "[object Int8Array]", Q = "[object Int16Array]", p = "[object Int32Array]", v = "[object Uint8Array]", f = "[object Uint8ClampedArray]", O = "[object Uint16Array]", B = "[object Uint32Array]", _ = /[\\^$.*+?()[\]{}|]/g, R = /\w*$/, T = /^\[object .+?Constructor\]$/, A = /^(?:0|[1-9]\d*)$/, I = {};
    I[i] = I[a] = I[Z] = I[le] = I[l] = I[c] = I[z] = I[V] = I[ae] = I[Q] = I[p] = I[h] = I[b] = I[w] = I[k] = I[L] = I[F] = I[U] = I[v] = I[f] = I[O] = I[B] = !0, I[d] = I[g] = I[K] = !1;
    var j = typeof Pt == "object" && Pt && Pt.Object === Object && Pt, X = typeof self == "object" && self && self.Object === Object && self, se = j || X || Function("return this")(), ee = e && !e.nodeType && e, Y = ee && !0 && n && !n.nodeType && n, ye = Y && Y.exports === ee;
    function ve(o, u) {
      return o.set(u[0], u[1]), o;
    }
    function ie(o, u) {
      return o.add(u), o;
    }
    function he(o, u) {
      for (var y = -1, C = o ? o.length : 0; ++y < C && u(o[y], y, o) !== !1; )
        ;
      return o;
    }
    function ce(o, u) {
      for (var y = -1, C = u.length, ne = o.length; ++y < C; )
        o[ne + y] = u[y];
      return o;
    }
    function fe(o, u, y, C) {
      for (var ne = -1, J = o ? o.length : 0; ++ne < J; )
        y = u(y, o[ne], ne, o);
      return y;
    }
    function me(o, u) {
      for (var y = -1, C = Array(o); ++y < o; )
        C[y] = u(y);
      return C;
    }
    function ge(o, u) {
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
    function Ne(o) {
      var u = -1, y = Array(o.size);
      return o.forEach(function(C, ne) {
        y[++u] = [ne, C];
      }), y;
    }
    function $t(o, u) {
      return function(y) {
        return o(u(y));
      };
    }
    function N(o) {
      var u = -1, y = Array(o.size);
      return o.forEach(function(C) {
        y[++u] = C;
      }), y;
    }
    var S = Array.prototype, $ = Function.prototype, P = Object.prototype, ue = se["__core-js_shared__"], Se = (function() {
      var o = /[^.]+$/.exec(ue && ue.keys && ue.keys.IE_PROTO || "");
      return o ? "Symbol(src)_1." + o : "";
    })(), fr = $.toString, Ze = P.hasOwnProperty, xt = P.toString, Fr = RegExp(
      "^" + fr.call(Ze).replace(_, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Pe = ye ? se.Buffer : void 0, pr = se.Symbol, Mr = se.Uint8Array, Ye = $t(Object.getPrototypeOf, Object), Nn = Object.create, Sn = P.propertyIsEnumerable, Ss = S.splice, Pr = Object.getOwnPropertySymbols, mr = Pe ? Pe.isBuffer : void 0, _n = $t(Object.keys, Object), gr = rt(se, "DataView"), Yt = rt(se, "Map"), tt = rt(se, "Promise"), br = rt(se, "Set"), jr = rt(se, "WeakMap"), Xt = rt(Object, "create"), Ur = je(gr), Qt = je(Yt), zr = je(tt), Vr = je(br), Hr = je(jr), Dt = pr ? pr.prototype : void 0, Cn = Dt ? Dt.valueOf : void 0;
    function wt(o) {
      var u = -1, y = o ? o.length : 0;
      for (this.clear(); ++u < y; ) {
        var C = o[u];
        this.set(C[0], C[1]);
      }
    }
    function _s() {
      this.__data__ = Xt ? Xt(null) : {};
    }
    function Cs(o) {
      return this.has(o) && delete this.__data__[o];
    }
    function ks(o) {
      var u = this.__data__;
      if (Xt) {
        var y = u[o];
        return y === r ? void 0 : y;
      }
      return Ze.call(u, o) ? u[o] : void 0;
    }
    function kn(o) {
      var u = this.__data__;
      return Xt ? u[o] !== void 0 : Ze.call(u, o);
    }
    function Kr(o, u) {
      var y = this.__data__;
      return y[o] = Xt && u === void 0 ? r : u, this;
    }
    wt.prototype.clear = _s, wt.prototype.delete = Cs, wt.prototype.get = ks, wt.prototype.has = kn, wt.prototype.set = Kr;
    function ke(o) {
      var u = -1, y = o ? o.length : 0;
      for (this.clear(); ++u < y; ) {
        var C = o[u];
        this.set(C[0], C[1]);
      }
    }
    function Ls() {
      this.__data__ = [];
    }
    function qs(o) {
      var u = this.__data__, y = vr(u, o);
      if (y < 0)
        return !1;
      var C = u.length - 1;
      return y == C ? u.pop() : Ss.call(u, y, 1), !0;
    }
    function Os(o) {
      var u = this.__data__, y = vr(u, o);
      return y < 0 ? void 0 : u[y][1];
    }
    function Is(o) {
      return vr(this.__data__, o) > -1;
    }
    function Rs(o, u) {
      var y = this.__data__, C = vr(y, o);
      return C < 0 ? y.push([o, u]) : y[C][1] = u, this;
    }
    ke.prototype.clear = Ls, ke.prototype.delete = qs, ke.prototype.get = Os, ke.prototype.has = Is, ke.prototype.set = Rs;
    function Re(o) {
      var u = -1, y = o ? o.length : 0;
      for (this.clear(); ++u < y; ) {
        var C = o[u];
        this.set(C[0], C[1]);
      }
    }
    function $s() {
      this.__data__ = {
        hash: new wt(),
        map: new (Yt || ke)(),
        string: new wt()
      };
    }
    function Ds(o) {
      return er(this, o).delete(o);
    }
    function Bs(o) {
      return er(this, o).get(o);
    }
    function Fs(o) {
      return er(this, o).has(o);
    }
    function Ms(o, u) {
      return er(this, o).set(o, u), this;
    }
    Re.prototype.clear = $s, Re.prototype.delete = Ds, Re.prototype.get = Bs, Re.prototype.has = Fs, Re.prototype.set = Ms;
    function He(o) {
      this.__data__ = new ke(o);
    }
    function Ps() {
      this.__data__ = new ke();
    }
    function js(o) {
      return this.__data__.delete(o);
    }
    function Us(o) {
      return this.__data__.get(o);
    }
    function zs(o) {
      return this.__data__.has(o);
    }
    function Vs(o, u) {
      var y = this.__data__;
      if (y instanceof ke) {
        var C = y.__data__;
        if (!Yt || C.length < t - 1)
          return C.push([o, u]), this;
        y = this.__data__ = new Re(C);
      }
      return y.set(o, u), this;
    }
    He.prototype.clear = Ps, He.prototype.delete = js, He.prototype.get = Us, He.prototype.has = zs, He.prototype.set = Vs;
    function yr(o, u) {
      var y = Yr(o) || wr(o) ? me(o.length, String) : [], C = y.length, ne = !!C;
      for (var J in o)
        Ze.call(o, J) && !(ne && (J == "length" || si(J, C))) && y.push(J);
      return y;
    }
    function Ln(o, u, y) {
      var C = o[u];
      (!(Ze.call(o, u) && $n(C, y)) || y === void 0 && !(u in o)) && (o[u] = y);
    }
    function vr(o, u) {
      for (var y = o.length; y--; )
        if ($n(o[y][0], u))
          return y;
      return -1;
    }
    function dt(o, u) {
      return o && Zr(u, Qr(u), o);
    }
    function Gr(o, u, y, C, ne, J, pe) {
      var de;
      if (C && (de = J ? C(o, ne, J, pe) : C(o)), de !== void 0)
        return de;
      if (!ft(o))
        return o;
      var Te = Yr(o);
      if (Te) {
        if (de = ri(o), !u)
          return Js(o, de);
      } else {
        var be = Et(o), $e = be == g || be == m;
        if (Dn(o))
          return xr(o, u);
        if (be == w || be == i || $e && !J) {
          if (Ee(o))
            return J ? o : {};
          if (de = ht($e ? {} : o), !u)
            return ei(o, dt(de, o));
        } else {
          if (!I[be])
            return J ? o : {};
          de = ni(o, be, Gr, u);
        }
      }
      pe || (pe = new He());
      var Ke = pe.get(o);
      if (Ke)
        return Ke;
      if (pe.set(o, de), !Te)
        var _e = y ? ti(o) : Qr(o);
      return he(_e || o, function(De, Le) {
        _e && (Le = De, De = o[Le]), Ln(de, Le, Gr(De, u, y, C, Le, o, pe));
      }), de;
    }
    function Hs(o) {
      return ft(o) ? Nn(o) : {};
    }
    function Ks(o, u, y) {
      var C = u(o);
      return Yr(o) ? C : ce(C, y(o));
    }
    function Gs(o) {
      return xt.call(o);
    }
    function Ws(o) {
      if (!ft(o) || ai(o))
        return !1;
      var u = Xr(o) || Ee(o) ? Fr : T;
      return u.test(je(o));
    }
    function Zs(o) {
      if (!In(o))
        return _n(o);
      var u = [];
      for (var y in Object(o))
        Ze.call(o, y) && y != "constructor" && u.push(y);
      return u;
    }
    function xr(o, u) {
      if (u)
        return o.slice();
      var y = new o.constructor(o.length);
      return o.copy(y), y;
    }
    function Wr(o) {
      var u = new o.constructor(o.byteLength);
      return new Mr(u).set(new Mr(o)), u;
    }
    function Jt(o, u) {
      var y = u ? Wr(o.buffer) : o.buffer;
      return new o.constructor(y, o.byteOffset, o.byteLength);
    }
    function qn(o, u, y) {
      var C = u ? y(Ne(o), !0) : Ne(o);
      return fe(C, ve, new o.constructor());
    }
    function On(o) {
      var u = new o.constructor(o.source, R.exec(o));
      return u.lastIndex = o.lastIndex, u;
    }
    function Ys(o, u, y) {
      var C = u ? y(N(o), !0) : N(o);
      return fe(C, ie, new o.constructor());
    }
    function Xs(o) {
      return Cn ? Object(Cn.call(o)) : {};
    }
    function Qs(o, u) {
      var y = u ? Wr(o.buffer) : o.buffer;
      return new o.constructor(y, o.byteOffset, o.length);
    }
    function Js(o, u) {
      var y = -1, C = o.length;
      for (u || (u = Array(C)); ++y < C; )
        u[y] = o[y];
      return u;
    }
    function Zr(o, u, y, C) {
      y || (y = {});
      for (var ne = -1, J = u.length; ++ne < J; ) {
        var pe = u[ne], de = void 0;
        Ln(y, pe, de === void 0 ? o[pe] : de);
      }
      return y;
    }
    function ei(o, u) {
      return Zr(o, At(o), u);
    }
    function ti(o) {
      return Ks(o, Qr, At);
    }
    function er(o, u) {
      var y = o.__data__;
      return ii(u) ? y[typeof u == "string" ? "string" : "hash"] : y.map;
    }
    function rt(o, u) {
      var y = ge(o, u);
      return Ws(y) ? y : void 0;
    }
    var At = Pr ? $t(Pr, Object) : li, Et = Gs;
    (gr && Et(new gr(new ArrayBuffer(1))) != le || Yt && Et(new Yt()) != h || tt && Et(tt.resolve()) != E || br && Et(new br()) != L || jr && Et(new jr()) != K) && (Et = function(o) {
      var u = xt.call(o), y = u == w ? o.constructor : void 0, C = y ? je(y) : void 0;
      if (C)
        switch (C) {
          case Ur:
            return le;
          case Qt:
            return h;
          case zr:
            return E;
          case Vr:
            return L;
          case Hr:
            return K;
        }
      return u;
    });
    function ri(o) {
      var u = o.length, y = o.constructor(u);
      return u && typeof o[0] == "string" && Ze.call(o, "index") && (y.index = o.index, y.input = o.input), y;
    }
    function ht(o) {
      return typeof o.constructor == "function" && !In(o) ? Hs(Ye(o)) : {};
    }
    function ni(o, u, y, C) {
      var ne = o.constructor;
      switch (u) {
        case Z:
          return Wr(o);
        case l:
        case c:
          return new ne(+o);
        case le:
          return Jt(o, C);
        case z:
        case V:
        case ae:
        case Q:
        case p:
        case v:
        case f:
        case O:
        case B:
          return Qs(o, C);
        case h:
          return qn(o, C, y);
        case b:
        case F:
          return new ne(o);
        case k:
          return On(o);
        case L:
          return Ys(o, C, y);
        case U:
          return Xs(o);
      }
    }
    function si(o, u) {
      return u = u ?? s, !!u && (typeof o == "number" || A.test(o)) && o > -1 && o % 1 == 0 && o < u;
    }
    function ii(o) {
      var u = typeof o;
      return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? o !== "__proto__" : o === null;
    }
    function ai(o) {
      return !!Se && Se in o;
    }
    function In(o) {
      var u = o && o.constructor, y = typeof u == "function" && u.prototype || P;
      return o === y;
    }
    function je(o) {
      if (o != null) {
        try {
          return fr.call(o);
        } catch {
        }
        try {
          return o + "";
        } catch {
        }
      }
      return "";
    }
    function Rn(o) {
      return Gr(o, !0, !0);
    }
    function $n(o, u) {
      return o === u || o !== o && u !== u;
    }
    function wr(o) {
      return oi(o) && Ze.call(o, "callee") && (!Sn.call(o, "callee") || xt.call(o) == i);
    }
    var Yr = Array.isArray;
    function Ar(o) {
      return o != null && Bn(o.length) && !Xr(o);
    }
    function oi(o) {
      return Fn(o) && Ar(o);
    }
    var Dn = mr || ci;
    function Xr(o) {
      var u = ft(o) ? xt.call(o) : "";
      return u == g || u == m;
    }
    function Bn(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= s;
    }
    function ft(o) {
      var u = typeof o;
      return !!o && (u == "object" || u == "function");
    }
    function Fn(o) {
      return !!o && typeof o == "object";
    }
    function Qr(o) {
      return Ar(o) ? yr(o) : Zs(o);
    }
    function li() {
      return [];
    }
    function ci() {
      return !1;
    }
    n.exports = Rn;
  })(rn, rn.exports)), rn.exports;
}
var nn = { exports: {} };
nn.exports;
var Ya;
function Tl() {
  return Ya || (Ya = 1, (function(n, e) {
    var t = 200, r = "__lodash_hash_undefined__", s = 1, i = 2, a = 9007199254740991, l = "[object Arguments]", c = "[object Array]", d = "[object AsyncFunction]", g = "[object Boolean]", m = "[object Date]", h = "[object Error]", b = "[object Function]", w = "[object GeneratorFunction]", E = "[object Map]", k = "[object Number]", L = "[object Null]", F = "[object Object]", U = "[object Promise]", K = "[object Proxy]", Z = "[object RegExp]", le = "[object Set]", z = "[object String]", V = "[object Symbol]", ae = "[object Undefined]", Q = "[object WeakMap]", p = "[object ArrayBuffer]", v = "[object DataView]", f = "[object Float32Array]", O = "[object Float64Array]", B = "[object Int8Array]", _ = "[object Int16Array]", R = "[object Int32Array]", T = "[object Uint8Array]", A = "[object Uint8ClampedArray]", I = "[object Uint16Array]", j = "[object Uint32Array]", X = /[\\^$.*+?()[\]{}|]/g, se = /^\[object .+?Constructor\]$/, ee = /^(?:0|[1-9]\d*)$/, Y = {};
    Y[f] = Y[O] = Y[B] = Y[_] = Y[R] = Y[T] = Y[A] = Y[I] = Y[j] = !0, Y[l] = Y[c] = Y[p] = Y[g] = Y[v] = Y[m] = Y[h] = Y[b] = Y[E] = Y[k] = Y[F] = Y[Z] = Y[le] = Y[z] = Y[Q] = !1;
    var ye = typeof Pt == "object" && Pt && Pt.Object === Object && Pt, ve = typeof self == "object" && self && self.Object === Object && self, ie = ye || ve || Function("return this")(), he = e && !e.nodeType && e, ce = he && !0 && n && !n.nodeType && n, fe = ce && ce.exports === he, me = fe && ye.process, ge = (function() {
      try {
        return me && me.binding && me.binding("util");
      } catch {
      }
    })(), Ee = ge && ge.isTypedArray;
    function Ne(o, u) {
      for (var y = -1, C = o == null ? 0 : o.length, ne = 0, J = []; ++y < C; ) {
        var pe = o[y];
        u(pe, y, o) && (J[ne++] = pe);
      }
      return J;
    }
    function $t(o, u) {
      for (var y = -1, C = u.length, ne = o.length; ++y < C; )
        o[ne + y] = u[y];
      return o;
    }
    function N(o, u) {
      for (var y = -1, C = o == null ? 0 : o.length; ++y < C; )
        if (u(o[y], y, o))
          return !0;
      return !1;
    }
    function S(o, u) {
      for (var y = -1, C = Array(o); ++y < o; )
        C[y] = u(y);
      return C;
    }
    function $(o) {
      return function(u) {
        return o(u);
      };
    }
    function P(o, u) {
      return o.has(u);
    }
    function ue(o, u) {
      return o?.[u];
    }
    function Se(o) {
      var u = -1, y = Array(o.size);
      return o.forEach(function(C, ne) {
        y[++u] = [ne, C];
      }), y;
    }
    function fr(o, u) {
      return function(y) {
        return o(u(y));
      };
    }
    function Ze(o) {
      var u = -1, y = Array(o.size);
      return o.forEach(function(C) {
        y[++u] = C;
      }), y;
    }
    var xt = Array.prototype, Fr = Function.prototype, Pe = Object.prototype, pr = ie["__core-js_shared__"], Mr = Fr.toString, Ye = Pe.hasOwnProperty, Nn = (function() {
      var o = /[^.]+$/.exec(pr && pr.keys && pr.keys.IE_PROTO || "");
      return o ? "Symbol(src)_1." + o : "";
    })(), Sn = Pe.toString, Ss = RegExp(
      "^" + Mr.call(Ye).replace(X, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Pr = fe ? ie.Buffer : void 0, mr = ie.Symbol, _n = ie.Uint8Array, gr = Pe.propertyIsEnumerable, Yt = xt.splice, tt = mr ? mr.toStringTag : void 0, br = Object.getOwnPropertySymbols, jr = Pr ? Pr.isBuffer : void 0, Xt = fr(Object.keys, Object), Ur = At(ie, "DataView"), Qt = At(ie, "Map"), zr = At(ie, "Promise"), Vr = At(ie, "Set"), Hr = At(ie, "WeakMap"), Dt = At(Object, "create"), Cn = je(Ur), wt = je(Qt), _s = je(zr), Cs = je(Vr), ks = je(Hr), kn = mr ? mr.prototype : void 0, Kr = kn ? kn.valueOf : void 0;
    function ke(o) {
      var u = -1, y = o == null ? 0 : o.length;
      for (this.clear(); ++u < y; ) {
        var C = o[u];
        this.set(C[0], C[1]);
      }
    }
    function Ls() {
      this.__data__ = Dt ? Dt(null) : {}, this.size = 0;
    }
    function qs(o) {
      var u = this.has(o) && delete this.__data__[o];
      return this.size -= u ? 1 : 0, u;
    }
    function Os(o) {
      var u = this.__data__;
      if (Dt) {
        var y = u[o];
        return y === r ? void 0 : y;
      }
      return Ye.call(u, o) ? u[o] : void 0;
    }
    function Is(o) {
      var u = this.__data__;
      return Dt ? u[o] !== void 0 : Ye.call(u, o);
    }
    function Rs(o, u) {
      var y = this.__data__;
      return this.size += this.has(o) ? 0 : 1, y[o] = Dt && u === void 0 ? r : u, this;
    }
    ke.prototype.clear = Ls, ke.prototype.delete = qs, ke.prototype.get = Os, ke.prototype.has = Is, ke.prototype.set = Rs;
    function Re(o) {
      var u = -1, y = o == null ? 0 : o.length;
      for (this.clear(); ++u < y; ) {
        var C = o[u];
        this.set(C[0], C[1]);
      }
    }
    function $s() {
      this.__data__ = [], this.size = 0;
    }
    function Ds(o) {
      var u = this.__data__, y = xr(u, o);
      if (y < 0)
        return !1;
      var C = u.length - 1;
      return y == C ? u.pop() : Yt.call(u, y, 1), --this.size, !0;
    }
    function Bs(o) {
      var u = this.__data__, y = xr(u, o);
      return y < 0 ? void 0 : u[y][1];
    }
    function Fs(o) {
      return xr(this.__data__, o) > -1;
    }
    function Ms(o, u) {
      var y = this.__data__, C = xr(y, o);
      return C < 0 ? (++this.size, y.push([o, u])) : y[C][1] = u, this;
    }
    Re.prototype.clear = $s, Re.prototype.delete = Ds, Re.prototype.get = Bs, Re.prototype.has = Fs, Re.prototype.set = Ms;
    function He(o) {
      var u = -1, y = o == null ? 0 : o.length;
      for (this.clear(); ++u < y; ) {
        var C = o[u];
        this.set(C[0], C[1]);
      }
    }
    function Ps() {
      this.size = 0, this.__data__ = {
        hash: new ke(),
        map: new (Qt || Re)(),
        string: new ke()
      };
    }
    function js(o) {
      var u = rt(this, o).delete(o);
      return this.size -= u ? 1 : 0, u;
    }
    function Us(o) {
      return rt(this, o).get(o);
    }
    function zs(o) {
      return rt(this, o).has(o);
    }
    function Vs(o, u) {
      var y = rt(this, o), C = y.size;
      return y.set(o, u), this.size += y.size == C ? 0 : 1, this;
    }
    He.prototype.clear = Ps, He.prototype.delete = js, He.prototype.get = Us, He.prototype.has = zs, He.prototype.set = Vs;
    function yr(o) {
      var u = -1, y = o == null ? 0 : o.length;
      for (this.__data__ = new He(); ++u < y; )
        this.add(o[u]);
    }
    function Ln(o) {
      return this.__data__.set(o, r), this;
    }
    function vr(o) {
      return this.__data__.has(o);
    }
    yr.prototype.add = yr.prototype.push = Ln, yr.prototype.has = vr;
    function dt(o) {
      var u = this.__data__ = new Re(o);
      this.size = u.size;
    }
    function Gr() {
      this.__data__ = new Re(), this.size = 0;
    }
    function Hs(o) {
      var u = this.__data__, y = u.delete(o);
      return this.size = u.size, y;
    }
    function Ks(o) {
      return this.__data__.get(o);
    }
    function Gs(o) {
      return this.__data__.has(o);
    }
    function Ws(o, u) {
      var y = this.__data__;
      if (y instanceof Re) {
        var C = y.__data__;
        if (!Qt || C.length < t - 1)
          return C.push([o, u]), this.size = ++y.size, this;
        y = this.__data__ = new He(C);
      }
      return y.set(o, u), this.size = y.size, this;
    }
    dt.prototype.clear = Gr, dt.prototype.delete = Hs, dt.prototype.get = Ks, dt.prototype.has = Gs, dt.prototype.set = Ws;
    function Zs(o, u) {
      var y = wr(o), C = !y && $n(o), ne = !y && !C && Ar(o), J = !y && !C && !ne && Fn(o), pe = y || C || ne || J, de = pe ? S(o.length, String) : [], Te = de.length;
      for (var be in o)
        Ye.call(o, be) && !(pe && // Safari 9 has enumerable `arguments.length` in strict mode.
        (be == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        ne && (be == "offset" || be == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        J && (be == "buffer" || be == "byteLength" || be == "byteOffset") || // Skip index properties.
        ni(be, Te))) && de.push(be);
      return de;
    }
    function xr(o, u) {
      for (var y = o.length; y--; )
        if (Rn(o[y][0], u))
          return y;
      return -1;
    }
    function Wr(o, u, y) {
      var C = u(o);
      return wr(o) ? C : $t(C, y(o));
    }
    function Jt(o) {
      return o == null ? o === void 0 ? ae : L : tt && tt in Object(o) ? Et(o) : In(o);
    }
    function qn(o) {
      return ft(o) && Jt(o) == l;
    }
    function On(o, u, y, C, ne) {
      return o === u ? !0 : o == null || u == null || !ft(o) && !ft(u) ? o !== o && u !== u : Ys(o, u, y, C, On, ne);
    }
    function Ys(o, u, y, C, ne, J) {
      var pe = wr(o), de = wr(u), Te = pe ? c : ht(o), be = de ? c : ht(u);
      Te = Te == l ? F : Te, be = be == l ? F : be;
      var $e = Te == F, Ke = be == F, _e = Te == be;
      if (_e && Ar(o)) {
        if (!Ar(u))
          return !1;
        pe = !0, $e = !1;
      }
      if (_e && !$e)
        return J || (J = new dt()), pe || Fn(o) ? Zr(o, u, y, C, ne, J) : ei(o, u, Te, y, C, ne, J);
      if (!(y & s)) {
        var De = $e && Ye.call(o, "__wrapped__"), Le = Ke && Ye.call(u, "__wrapped__");
        if (De || Le) {
          var Bt = De ? o.value() : o, Tt = Le ? u.value() : u;
          return J || (J = new dt()), ne(Bt, Tt, y, C, J);
        }
      }
      return _e ? (J || (J = new dt()), ti(o, u, y, C, ne, J)) : !1;
    }
    function Xs(o) {
      if (!Bn(o) || ii(o))
        return !1;
      var u = Dn(o) ? Ss : se;
      return u.test(je(o));
    }
    function Qs(o) {
      return ft(o) && Xr(o.length) && !!Y[Jt(o)];
    }
    function Js(o) {
      if (!ai(o))
        return Xt(o);
      var u = [];
      for (var y in Object(o))
        Ye.call(o, y) && y != "constructor" && u.push(y);
      return u;
    }
    function Zr(o, u, y, C, ne, J) {
      var pe = y & s, de = o.length, Te = u.length;
      if (de != Te && !(pe && Te > de))
        return !1;
      var be = J.get(o);
      if (be && J.get(u))
        return be == u;
      var $e = -1, Ke = !0, _e = y & i ? new yr() : void 0;
      for (J.set(o, u), J.set(u, o); ++$e < de; ) {
        var De = o[$e], Le = u[$e];
        if (C)
          var Bt = pe ? C(Le, De, $e, u, o, J) : C(De, Le, $e, o, u, J);
        if (Bt !== void 0) {
          if (Bt)
            continue;
          Ke = !1;
          break;
        }
        if (_e) {
          if (!N(u, function(Tt, tr) {
            if (!P(_e, tr) && (De === Tt || ne(De, Tt, y, C, J)))
              return _e.push(tr);
          })) {
            Ke = !1;
            break;
          }
        } else if (!(De === Le || ne(De, Le, y, C, J))) {
          Ke = !1;
          break;
        }
      }
      return J.delete(o), J.delete(u), Ke;
    }
    function ei(o, u, y, C, ne, J, pe) {
      switch (y) {
        case v:
          if (o.byteLength != u.byteLength || o.byteOffset != u.byteOffset)
            return !1;
          o = o.buffer, u = u.buffer;
        case p:
          return !(o.byteLength != u.byteLength || !J(new _n(o), new _n(u)));
        case g:
        case m:
        case k:
          return Rn(+o, +u);
        case h:
          return o.name == u.name && o.message == u.message;
        case Z:
        case z:
          return o == u + "";
        case E:
          var de = Se;
        case le:
          var Te = C & s;
          if (de || (de = Ze), o.size != u.size && !Te)
            return !1;
          var be = pe.get(o);
          if (be)
            return be == u;
          C |= i, pe.set(o, u);
          var $e = Zr(de(o), de(u), C, ne, J, pe);
          return pe.delete(o), $e;
        case V:
          if (Kr)
            return Kr.call(o) == Kr.call(u);
      }
      return !1;
    }
    function ti(o, u, y, C, ne, J) {
      var pe = y & s, de = er(o), Te = de.length, be = er(u), $e = be.length;
      if (Te != $e && !pe)
        return !1;
      for (var Ke = Te; Ke--; ) {
        var _e = de[Ke];
        if (!(pe ? _e in u : Ye.call(u, _e)))
          return !1;
      }
      var De = J.get(o);
      if (De && J.get(u))
        return De == u;
      var Le = !0;
      J.set(o, u), J.set(u, o);
      for (var Bt = pe; ++Ke < Te; ) {
        _e = de[Ke];
        var Tt = o[_e], tr = u[_e];
        if (C)
          var va = pe ? C(tr, Tt, _e, u, o, J) : C(Tt, tr, _e, o, u, J);
        if (!(va === void 0 ? Tt === tr || ne(Tt, tr, y, C, J) : va)) {
          Le = !1;
          break;
        }
        Bt || (Bt = _e == "constructor");
      }
      if (Le && !Bt) {
        var Mn = o.constructor, Pn = u.constructor;
        Mn != Pn && "constructor" in o && "constructor" in u && !(typeof Mn == "function" && Mn instanceof Mn && typeof Pn == "function" && Pn instanceof Pn) && (Le = !1);
      }
      return J.delete(o), J.delete(u), Le;
    }
    function er(o) {
      return Wr(o, Qr, ri);
    }
    function rt(o, u) {
      var y = o.__data__;
      return si(u) ? y[typeof u == "string" ? "string" : "hash"] : y.map;
    }
    function At(o, u) {
      var y = ue(o, u);
      return Xs(y) ? y : void 0;
    }
    function Et(o) {
      var u = Ye.call(o, tt), y = o[tt];
      try {
        o[tt] = void 0;
        var C = !0;
      } catch {
      }
      var ne = Sn.call(o);
      return C && (u ? o[tt] = y : delete o[tt]), ne;
    }
    var ri = br ? function(o) {
      return o == null ? [] : (o = Object(o), Ne(br(o), function(u) {
        return gr.call(o, u);
      }));
    } : li, ht = Jt;
    (Ur && ht(new Ur(new ArrayBuffer(1))) != v || Qt && ht(new Qt()) != E || zr && ht(zr.resolve()) != U || Vr && ht(new Vr()) != le || Hr && ht(new Hr()) != Q) && (ht = function(o) {
      var u = Jt(o), y = u == F ? o.constructor : void 0, C = y ? je(y) : "";
      if (C)
        switch (C) {
          case Cn:
            return v;
          case wt:
            return E;
          case _s:
            return U;
          case Cs:
            return le;
          case ks:
            return Q;
        }
      return u;
    });
    function ni(o, u) {
      return u = u ?? a, !!u && (typeof o == "number" || ee.test(o)) && o > -1 && o % 1 == 0 && o < u;
    }
    function si(o) {
      var u = typeof o;
      return u == "string" || u == "number" || u == "symbol" || u == "boolean" ? o !== "__proto__" : o === null;
    }
    function ii(o) {
      return !!Nn && Nn in o;
    }
    function ai(o) {
      var u = o && o.constructor, y = typeof u == "function" && u.prototype || Pe;
      return o === y;
    }
    function In(o) {
      return Sn.call(o);
    }
    function je(o) {
      if (o != null) {
        try {
          return Mr.call(o);
        } catch {
        }
        try {
          return o + "";
        } catch {
        }
      }
      return "";
    }
    function Rn(o, u) {
      return o === u || o !== o && u !== u;
    }
    var $n = qn(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? qn : function(o) {
      return ft(o) && Ye.call(o, "callee") && !gr.call(o, "callee");
    }, wr = Array.isArray;
    function Yr(o) {
      return o != null && Xr(o.length) && !Dn(o);
    }
    var Ar = jr || ci;
    function oi(o, u) {
      return On(o, u);
    }
    function Dn(o) {
      if (!Bn(o))
        return !1;
      var u = Jt(o);
      return u == b || u == w || u == d || u == K;
    }
    function Xr(o) {
      return typeof o == "number" && o > -1 && o % 1 == 0 && o <= a;
    }
    function Bn(o) {
      var u = typeof o;
      return o != null && (u == "object" || u == "function");
    }
    function ft(o) {
      return o != null && typeof o == "object";
    }
    var Fn = Ee ? $(Ee) : Qs;
    function Qr(o) {
      return Yr(o) ? Zs(o) : Js(o);
    }
    function li() {
      return [];
    }
    function ci() {
      return !1;
    }
    n.exports = oi;
  })(nn, nn.exports)), nn.exports;
}
var Vn = {}, Xa;
function qm() {
  if (Xa) return Vn;
  Xa = 1, Object.defineProperty(Vn, "__esModule", { value: !0 });
  const n = El(), e = Tl();
  var t;
  return (function(r) {
    function s(c = {}, d = {}, g = !1) {
      typeof c != "object" && (c = {}), typeof d != "object" && (d = {});
      let m = n(d);
      g || (m = Object.keys(m).reduce((h, b) => (m[b] != null && (h[b] = m[b]), h), {}));
      for (const h in c)
        c[h] !== void 0 && d[h] === void 0 && (m[h] = c[h]);
      return Object.keys(m).length > 0 ? m : void 0;
    }
    r.compose = s;
    function i(c = {}, d = {}) {
      typeof c != "object" && (c = {}), typeof d != "object" && (d = {});
      const g = Object.keys(c).concat(Object.keys(d)).reduce((m, h) => (e(c[h], d[h]) || (m[h] = d[h] === void 0 ? null : d[h]), m), {});
      return Object.keys(g).length > 0 ? g : void 0;
    }
    r.diff = i;
    function a(c = {}, d = {}) {
      c = c || {};
      const g = Object.keys(d).reduce((m, h) => (d[h] !== c[h] && c[h] !== void 0 && (m[h] = d[h]), m), {});
      return Object.keys(c).reduce((m, h) => (c[h] !== d[h] && d[h] === void 0 && (m[h] = null), m), g);
    }
    r.invert = a;
    function l(c, d, g = !1) {
      if (typeof c != "object")
        return d;
      if (typeof d != "object")
        return;
      if (!g)
        return d;
      const m = Object.keys(d).reduce((h, b) => (c[b] === void 0 && (h[b] = d[b]), h), {});
      return Object.keys(m).length > 0 ? m : void 0;
    }
    r.transform = l;
  })(t || (t = {})), Vn.default = t, Vn;
}
var Hn = {}, Qa;
function Nl() {
  if (Qa) return Hn;
  Qa = 1, Object.defineProperty(Hn, "__esModule", { value: !0 });
  var n;
  return (function(e) {
    function t(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    e.length = t;
  })(n || (n = {})), Hn.default = n, Hn;
}
var Kn = {}, Ja;
function Om() {
  if (Ja) return Kn;
  Ja = 1, Object.defineProperty(Kn, "__esModule", { value: !0 });
  const n = Nl();
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
  return Kn.default = e, Kn;
}
var eo;
function Im() {
  return eo || (eo = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.AttributeMap = e.OpIterator = e.Op = void 0;
    const t = Lm(), r = El(), s = Tl(), i = qm();
    e.AttributeMap = i.default;
    const a = Nl();
    e.Op = a.default;
    const l = Om();
    e.OpIterator = l.default;
    const c = "\0", d = (m, h) => {
      if (typeof m != "object" || m === null)
        throw new Error(`cannot retain a ${typeof m}`);
      if (typeof h != "object" || h === null)
        throw new Error(`cannot retain a ${typeof h}`);
      const b = Object.keys(m)[0];
      if (!b || b !== Object.keys(h)[0])
        throw new Error(`embed types not matched: ${b} != ${Object.keys(h)[0]}`);
      return [b, m[b], h[b]];
    };
    class g {
      constructor(h) {
        Array.isArray(h) ? this.ops = h : h != null && Array.isArray(h.ops) ? this.ops = h.ops : this.ops = [];
      }
      static registerEmbed(h, b) {
        this.handlers[h] = b;
      }
      static unregisterEmbed(h) {
        delete this.handlers[h];
      }
      static getHandler(h) {
        const b = this.handlers[h];
        if (!b)
          throw new Error(`no handlers for embed type "${h}"`);
        return b;
      }
      insert(h, b) {
        const w = {};
        return typeof h == "string" && h.length === 0 ? this : (w.insert = h, b != null && typeof b == "object" && Object.keys(b).length > 0 && (w.attributes = b), this.push(w));
      }
      delete(h) {
        return h <= 0 ? this : this.push({ delete: h });
      }
      retain(h, b) {
        if (typeof h == "number" && h <= 0)
          return this;
        const w = { retain: h };
        return b != null && typeof b == "object" && Object.keys(b).length > 0 && (w.attributes = b), this.push(w);
      }
      push(h) {
        let b = this.ops.length, w = this.ops[b - 1];
        if (h = r(h), typeof w == "object") {
          if (typeof h.delete == "number" && typeof w.delete == "number")
            return this.ops[b - 1] = { delete: w.delete + h.delete }, this;
          if (typeof w.delete == "number" && h.insert != null && (b -= 1, w = this.ops[b - 1], typeof w != "object"))
            return this.ops.unshift(h), this;
          if (s(h.attributes, w.attributes)) {
            if (typeof h.insert == "string" && typeof w.insert == "string")
              return this.ops[b - 1] = { insert: w.insert + h.insert }, typeof h.attributes == "object" && (this.ops[b - 1].attributes = h.attributes), this;
            if (typeof h.retain == "number" && typeof w.retain == "number")
              return this.ops[b - 1] = { retain: w.retain + h.retain }, typeof h.attributes == "object" && (this.ops[b - 1].attributes = h.attributes), this;
          }
        }
        return b === this.ops.length ? this.ops.push(h) : this.ops.splice(b, 0, h), this;
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
        const b = [], w = [];
        return this.forEach((E) => {
          (h(E) ? b : w).push(E);
        }), [b, w];
      }
      reduce(h, b) {
        return this.ops.reduce(h, b);
      }
      changeLength() {
        return this.reduce((h, b) => b.insert ? h + a.default.length(b) : b.delete ? h - b.delete : h, 0);
      }
      length() {
        return this.reduce((h, b) => h + a.default.length(b), 0);
      }
      slice(h = 0, b = 1 / 0) {
        const w = [], E = new l.default(this.ops);
        let k = 0;
        for (; k < b && E.hasNext(); ) {
          let L;
          k < h ? L = E.next(h - k) : (L = E.next(b - k), w.push(L)), k += a.default.length(L);
        }
        return new g(w);
      }
      compose(h) {
        const b = new l.default(this.ops), w = new l.default(h.ops), E = [], k = w.peek();
        if (k != null && typeof k.retain == "number" && k.attributes == null) {
          let F = k.retain;
          for (; b.peekType() === "insert" && b.peekLength() <= F; )
            F -= b.peekLength(), E.push(b.next());
          k.retain - F > 0 && w.next(k.retain - F);
        }
        const L = new g(E);
        for (; b.hasNext() || w.hasNext(); )
          if (w.peekType() === "insert")
            L.push(w.next());
          else if (b.peekType() === "delete")
            L.push(b.next());
          else {
            const F = Math.min(b.peekLength(), w.peekLength()), U = b.next(F), K = w.next(F);
            if (K.retain) {
              const Z = {};
              if (typeof U.retain == "number")
                Z.retain = typeof K.retain == "number" ? F : K.retain;
              else if (typeof K.retain == "number")
                U.retain == null ? Z.insert = U.insert : Z.retain = U.retain;
              else {
                const z = U.retain == null ? "insert" : "retain", [V, ae, Q] = d(U[z], K.retain), p = g.getHandler(V);
                Z[z] = {
                  [V]: p.compose(ae, Q, z === "retain")
                };
              }
              const le = i.default.compose(U.attributes, K.attributes, typeof U.retain == "number");
              if (le && (Z.attributes = le), L.push(Z), !w.hasNext() && s(L.ops[L.ops.length - 1], Z)) {
                const z = new g(b.rest());
                return L.concat(z).chop();
              }
            } else typeof K.delete == "number" && (typeof U.retain == "number" || typeof U.retain == "object" && U.retain !== null) && L.push(K);
          }
        return L.chop();
      }
      concat(h) {
        const b = new g(this.ops.slice());
        return h.ops.length > 0 && (b.push(h.ops[0]), b.ops = b.ops.concat(h.ops.slice(1))), b;
      }
      diff(h, b) {
        if (this.ops === h.ops)
          return new g();
        const w = [this, h].map((U) => U.map((K) => {
          if (K.insert != null)
            return typeof K.insert == "string" ? K.insert : c;
          const Z = U === h ? "on" : "with";
          throw new Error("diff() called " + Z + " non-document");
        }).join("")), E = new g(), k = t(w[0], w[1], b, !0), L = new l.default(this.ops), F = new l.default(h.ops);
        return k.forEach((U) => {
          let K = U[1].length;
          for (; K > 0; ) {
            let Z = 0;
            switch (U[0]) {
              case t.INSERT:
                Z = Math.min(F.peekLength(), K), E.push(F.next(Z));
                break;
              case t.DELETE:
                Z = Math.min(K, L.peekLength()), L.next(Z), E.delete(Z);
                break;
              case t.EQUAL:
                Z = Math.min(L.peekLength(), F.peekLength(), K);
                const le = L.next(Z), z = F.next(Z);
                s(le.insert, z.insert) ? E.retain(Z, i.default.diff(le.attributes, z.attributes)) : E.push(z).delete(Z);
                break;
            }
            K -= Z;
          }
        }), E.chop();
      }
      eachLine(h, b = `
`) {
        const w = new l.default(this.ops);
        let E = new g(), k = 0;
        for (; w.hasNext(); ) {
          if (w.peekType() !== "insert")
            return;
          const L = w.peek(), F = a.default.length(L) - w.peekLength(), U = typeof L.insert == "string" ? L.insert.indexOf(b, F) - F : -1;
          if (U < 0)
            E.push(w.next());
          else if (U > 0)
            E.push(w.next(U));
          else {
            if (h(E, w.next(1).attributes || {}, k) === !1)
              return;
            k += 1, E = new g();
          }
        }
        E.length() > 0 && h(E, {}, k);
      }
      invert(h) {
        const b = new g();
        return this.reduce((w, E) => {
          if (E.insert)
            b.delete(a.default.length(E));
          else {
            if (typeof E.retain == "number" && E.attributes == null)
              return b.retain(E.retain), w + E.retain;
            if (E.delete || typeof E.retain == "number") {
              const k = E.delete || E.retain;
              return h.slice(w, w + k).forEach((F) => {
                E.delete ? b.push(F) : E.retain && E.attributes && b.retain(a.default.length(F), i.default.invert(E.attributes, F.attributes));
              }), w + k;
            } else if (typeof E.retain == "object" && E.retain !== null) {
              const k = h.slice(w, w + 1), L = new l.default(k.ops).next(), [F, U, K] = d(E.retain, L.insert), Z = g.getHandler(F);
              return b.retain({ [F]: Z.invert(U, K) }, i.default.invert(E.attributes, L.attributes)), w + 1;
            }
          }
          return w;
        }, 0), b.chop();
      }
      transform(h, b = !1) {
        if (b = !!b, typeof h == "number")
          return this.transformPosition(h, b);
        const w = h, E = new l.default(this.ops), k = new l.default(w.ops), L = new g();
        for (; E.hasNext() || k.hasNext(); )
          if (E.peekType() === "insert" && (b || k.peekType() !== "insert"))
            L.retain(a.default.length(E.next()));
          else if (k.peekType() === "insert")
            L.push(k.next());
          else {
            const F = Math.min(E.peekLength(), k.peekLength()), U = E.next(F), K = k.next(F);
            if (U.delete)
              continue;
            if (K.delete)
              L.push(K);
            else {
              const Z = U.retain, le = K.retain;
              let z = typeof le == "object" && le !== null ? le : F;
              if (typeof Z == "object" && Z !== null && typeof le == "object" && le !== null) {
                const V = Object.keys(Z)[0];
                if (V === Object.keys(le)[0]) {
                  const ae = g.getHandler(V);
                  ae && (z = {
                    [V]: ae.transform(Z[V], le[V], b)
                  });
                }
              }
              L.retain(z, i.default.transform(U.attributes, K.attributes, b));
            }
          }
        return L.chop();
      }
      transformPosition(h, b = !1) {
        b = !!b;
        const w = new l.default(this.ops);
        let E = 0;
        for (; w.hasNext() && E <= h; ) {
          const k = w.peekLength(), L = w.peekType();
          if (w.next(), L === "delete") {
            h -= Math.min(k, h - E);
            continue;
          } else L === "insert" && (E < h || !b) && (h += k);
          E += k;
        }
        return h;
      }
    }
    g.Op = a.default, g.OpIterator = l.default, g.AttributeMap = i.default, g.handlers = {}, e.default = g, n.exports = g, n.exports.default = g;
  })(zn, zn.exports)), zn.exports;
}
var et = Im();
const G = /* @__PURE__ */ Al(et);
class ut extends We {
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
ut.blotName = "break";
ut.tagName = "BR";
let lt = class extends ls {
};
const Rm = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function ws(n) {
  return n.replace(/[&<>"']/g, (e) => Rm[e]);
}
class Ue extends ia {
  static allowedChildren = [Ue, ut, We, lt];
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
    const r = Ue.order.indexOf(e), s = Ue.order.indexOf(t);
    return r >= 0 || s >= 0 ? r - s : e === t ? 0 : e < t ? -1 : 1;
  }
  formatAt(e, t, r, s) {
    if (Ue.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, W.BLOT)) {
      const i = this.isolate(e, t);
      s && i.wrap(r, s);
    } else
      super.formatAt(e, t, r, s);
  }
  optimize(e) {
    if (super.optimize(e), this.parent instanceof Ue && Ue.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const t = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(t), t.wrap(this);
    }
  }
}
const to = 1;
class Ie extends mn {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = Sl(this)), this.cache.delta;
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
    super.insertBefore(e, t), r instanceof ut && r.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + to), this.cache.length;
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
    if (t && (e === 0 || e >= this.length() - to)) {
      const s = this.clone();
      return e === 0 ? (this.parent.insertBefore(s, this), this) : (this.parent.insertBefore(s, this.next), s);
    }
    const r = super.split(e, t);
    return this.cache = {}, r;
  }
}
Ie.blotName = "block";
Ie.tagName = "P";
Ie.defaultChild = ut;
Ie.allowedChildren = [ut, Ue, We, lt];
class Je extends We {
  attach() {
    super.attach(), this.attributes = new vs(this.domNode);
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
`), i = s.pop(), a = s.map((c) => {
      const d = this.scroll.create(Ie.blotName);
      return d.insertAt(0, c), d;
    }), l = this.split(e);
    a.forEach((c) => {
      this.parent.insertBefore(c, l);
    }), i && this.parent.insertBefore(this.scroll.create("text", i), l);
  }
}
Je.scope = W.BLOCK_BLOT;
function Sl(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n.descendants(Be).reduce((t, r) => r.length() === 0 ? t : t.insert(r.value(), Xe(r, {}, e)), new G()).insert(`
`, Xe(n));
}
function Xe(n) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return n == null || ("formats" in n && typeof n.formats == "function" && (e = {
    ...e,
    ...n.formats()
  }, t && delete e["code-token"]), n.parent == null || n.parent.statics.blotName === "scroll" || n.parent.statics.scope !== n.statics.scope) ? e : Xe(n.parent, e, t);
}
class it extends We {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(e, t, r) {
    super(e, t), this.selection = r, this.textNode = document.createTextNode(it.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
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
    r != null && (this.savedLength = it.CONTENTS.length, r.optimize(), r.formatAt(s, it.CONTENTS.length, e, t), this.savedLength = 0);
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
    const t = this.prev instanceof lt ? this.prev : null, r = t ? t.length() : 0, s = this.next instanceof lt ? this.next : null, i = s ? s.text : "", {
      textNode: a
    } = this, l = a.data.split(it.CONTENTS).join("");
    a.data = it.CONTENTS;
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
      const d = (h, b) => t && h === t.domNode ? b : h === a ? r + b - 1 : s && h === s.domNode ? r + l.length + b : null, g = d(e.start.node, e.start.offset), m = d(e.end.node, e.end.offset);
      if (g !== null && m !== null)
        return {
          startNode: c.domNode,
          startOffset: g,
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
        this.savedLength = it.CONTENTS.length, t.isolate(this.offset(t), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      t = t.parent;
    }
  }
  value() {
    return "";
  }
}
var mi = { exports: {} }, ro;
function $m() {
  return ro || (ro = 1, (function(n) {
    var e = Object.prototype.hasOwnProperty, t = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (t = !1));
    function s(c, d, g) {
      this.fn = c, this.context = d, this.once = g || !1;
    }
    function i(c, d, g, m, h) {
      if (typeof g != "function")
        throw new TypeError("The listener must be a function");
      var b = new s(g, m || c, h), w = t ? t + d : d;
      return c._events[w] ? c._events[w].fn ? c._events[w] = [c._events[w], b] : c._events[w].push(b) : (c._events[w] = b, c._eventsCount++), c;
    }
    function a(c, d) {
      --c._eventsCount === 0 ? c._events = new r() : delete c._events[d];
    }
    function l() {
      this._events = new r(), this._eventsCount = 0;
    }
    l.prototype.eventNames = function() {
      var d = [], g, m;
      if (this._eventsCount === 0) return d;
      for (m in g = this._events)
        e.call(g, m) && d.push(t ? m.slice(1) : m);
      return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(g)) : d;
    }, l.prototype.listeners = function(d) {
      var g = t ? t + d : d, m = this._events[g];
      if (!m) return [];
      if (m.fn) return [m.fn];
      for (var h = 0, b = m.length, w = new Array(b); h < b; h++)
        w[h] = m[h].fn;
      return w;
    }, l.prototype.listenerCount = function(d) {
      var g = t ? t + d : d, m = this._events[g];
      return m ? m.fn ? 1 : m.length : 0;
    }, l.prototype.emit = function(d, g, m, h, b, w) {
      var E = t ? t + d : d;
      if (!this._events[E]) return !1;
      var k = this._events[E], L = arguments.length, F, U;
      if (k.fn) {
        switch (k.once && this.removeListener(d, k.fn, void 0, !0), L) {
          case 1:
            return k.fn.call(k.context), !0;
          case 2:
            return k.fn.call(k.context, g), !0;
          case 3:
            return k.fn.call(k.context, g, m), !0;
          case 4:
            return k.fn.call(k.context, g, m, h), !0;
          case 5:
            return k.fn.call(k.context, g, m, h, b), !0;
          case 6:
            return k.fn.call(k.context, g, m, h, b, w), !0;
        }
        for (U = 1, F = new Array(L - 1); U < L; U++)
          F[U - 1] = arguments[U];
        k.fn.apply(k.context, F);
      } else {
        var K = k.length, Z;
        for (U = 0; U < K; U++)
          switch (k[U].once && this.removeListener(d, k[U].fn, void 0, !0), L) {
            case 1:
              k[U].fn.call(k[U].context);
              break;
            case 2:
              k[U].fn.call(k[U].context, g);
              break;
            case 3:
              k[U].fn.call(k[U].context, g, m);
              break;
            case 4:
              k[U].fn.call(k[U].context, g, m, h);
              break;
            default:
              if (!F) for (Z = 1, F = new Array(L - 1); Z < L; Z++)
                F[Z - 1] = arguments[Z];
              k[U].fn.apply(k[U].context, F);
          }
      }
      return !0;
    }, l.prototype.on = function(d, g, m) {
      return i(this, d, g, m, !1);
    }, l.prototype.once = function(d, g, m) {
      return i(this, d, g, m, !0);
    }, l.prototype.removeListener = function(d, g, m, h) {
      var b = t ? t + d : d;
      if (!this._events[b]) return this;
      if (!g)
        return a(this, b), this;
      var w = this._events[b];
      if (w.fn)
        w.fn === g && (!h || w.once) && (!m || w.context === m) && a(this, b);
      else {
        for (var E = 0, k = [], L = w.length; E < L; E++)
          (w[E].fn !== g || h && !w[E].once || m && w[E].context !== m) && k.push(w[E]);
        k.length ? this._events[b] = k.length === 1 ? k[0] : k : a(this, b);
      }
      return this;
    }, l.prototype.removeAllListeners = function(d) {
      var g;
      return d ? (g = t ? t + d : d, this._events[g] && a(this, g)) : (this._events = new r(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = t, l.EventEmitter = l, n.exports = l;
  })(mi)), mi.exports;
}
var Dm = $m();
const Bm = /* @__PURE__ */ Al(Dm), Pi = /* @__PURE__ */ new WeakMap(), ji = ["error", "warn", "log", "info"];
let Ui = "warn";
function _l(n) {
  if (Ui && ji.indexOf(n) <= ji.indexOf(Ui)) {
    for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
      t[r - 1] = arguments[r];
    console[n](...t);
  }
}
function Rt(n) {
  return ji.reduce((e, t) => (e[t] = _l.bind(console, t, n), e), {});
}
Rt.level = (n) => {
  Ui = n;
};
_l.level = Rt.level;
const gi = Rt("quill:events"), Fm = ["selectionchange", "mousedown", "mouseup", "click"];
Fm.forEach((n) => {
  document.addEventListener(n, function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    Array.from(document.querySelectorAll(".ql-container")).forEach((s) => {
      const i = Pi.get(s);
      i && i.emitter && i.emitter.handleDOM(...t);
    });
  });
});
class H extends Bm {
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
    super(), this.domListeners = {}, this.on("error", gi.error);
  }
  emit() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return gi.log.call(gi, ...t), super.emit(...t);
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
const bi = Rt("quill:selection");
class ir {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = e, this.length = t;
  }
}
class Mm {
  constructor(e, t) {
    this.emitter = t, this.scroll = e, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new ir(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, H.sources.USER), 1);
    }), this.emitter.on(H.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const r = this.getNativeRange();
      r != null && r.start.node !== this.cursor.textNode && this.emitter.once(H.events.SCROLL_UPDATE, (s, i) => {
        try {
          this.root.contains(r.start.node) && this.root.contains(r.end.node) && this.setNativeRange(r.start.node, r.start.offset, r.end.node, r.end.offset);
          const a = i.some((l) => l.type === "characterData" || l.type === "childList" || l.type === "attributes" && l.target === this.root);
          this.update(a ? H.sources.SILENT : s);
        } catch {
        }
      });
    }), this.emitter.on(H.events.SCROLL_OPTIMIZE, (r, s) => {
      if (s.range) {
        const {
          startNode: i,
          startOffset: a,
          endNode: l,
          endOffset: c
        } = s.range;
        this.setNativeRange(i, a, l, c), this.update(H.sources.SILENT);
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
      const [g] = this.scroll.leaf(e + 1);
      if (g) {
        const [m] = this.scroll.line(e), [h] = this.scroll.line(e + 1);
        m === h && (i = g, a = 0);
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
    return bi.info("getNativeRange", r), r;
  }
  getRange() {
    const e = this.scroll.domNode;
    if ("isConnected" in e && !e.isConnected)
      return [null, null];
    const t = this.getNativeRange();
    return t == null ? [null, null] : [this.normalizedToRange(t), t];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && yi(this.root, document.activeElement);
  }
  normalizedToRange(e) {
    const t = [[e.start.node, e.start.offset]];
    e.native.collapsed || t.push([e.end.node, e.end.offset]);
    const r = t.map((a) => {
      const [l, c] = a, d = this.scroll.find(l, !0), g = d.offset(this.scroll);
      return c === 0 ? g : d instanceof Be ? g + d.index(l, c) : g + d.length();
    }), s = Math.min(Math.max(...r), this.scroll.length() - 1), i = Math.min(s, ...r);
    return new ir(i, s - i);
  }
  normalizeNative(e) {
    if (!yi(this.root, e.startContainer) || !e.collapsed && !yi(this.root, e.endContainer))
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
    if (bi.info("setNativeRange", e, t, r, s), e != null && (this.root.parentNode == null || e.parentNode == null || // @ts-expect-error Fix me later
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
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : H.sources.API;
    if (typeof t == "string" && (r = t, t = !1), bi.info("setRange", e), e != null) {
      const s = this.rangeToNative(e);
      this.setNativeRange(...s, t);
    } else
      this.setNativeRange(null);
    this.update(r);
  }
  update() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : H.sources.USER;
    const t = this.lastRange, [r, s] = this.getRange();
    if (this.lastRange = r, this.lastNative = s, this.lastRange != null && (this.savedRange = this.lastRange), !sa(t, this.lastRange)) {
      if (!this.composing && s != null && s.native.collapsed && s.start.node !== this.cursor.textNode) {
        const a = this.cursor.restore();
        a && this.setNativeRange(a.startNode, a.startOffset, a.endNode, a.endOffset);
      }
      const i = [H.events.SELECTION_CHANGE, Cr(this.lastRange), Cr(t), e];
      this.emitter.emit(H.events.EDITOR_CHANGE, ...i), e !== H.sources.SILENT && this.emitter.emit(...i);
    }
  }
}
function yi(n, e) {
  try {
    e.parentNode;
  } catch {
    return !1;
  }
  return n.contains(e);
}
const Pm = /^[ -~]*$/;
class jm {
  constructor(e) {
    this.scroll = e, this.delta = this.getDelta();
  }
  applyDelta(e) {
    this.scroll.update();
    let t = this.scroll.length();
    this.scroll.batchStart();
    const r = no(e), s = new G();
    return zm(r.ops.slice()).reduce((a, l) => {
      const c = et.Op.length(l);
      let d = l.attributes || {}, g = !1, m = !1;
      if (l.insert != null) {
        if (s.retain(c), typeof l.insert == "string") {
          const w = l.insert;
          m = !w.endsWith(`
`) && (t <= a || !!this.scroll.descendant(Je, a)[0]), this.scroll.insertAt(a, w);
          const [E, k] = this.scroll.line(a);
          let L = zt({}, Xe(E));
          if (E instanceof Ie) {
            const [F] = E.descendant(Be, k);
            F && (L = zt(L, Xe(F)));
          }
          d = et.AttributeMap.diff(L, d) || {};
        } else if (typeof l.insert == "object") {
          const w = Object.keys(l.insert)[0];
          if (w == null) return a;
          const E = this.scroll.query(w, W.INLINE) != null;
          if (E)
            (t <= a || this.scroll.descendant(Je, a)[0]) && (m = !0);
          else if (a > 0) {
            const [k, L] = this.scroll.descendant(Be, a - 1);
            k instanceof lt ? k.value()[L] !== `
` && (g = !0) : k instanceof We && k.statics.scope === W.INLINE_BLOT && (g = !0);
          }
          if (this.scroll.insertAt(a, w, l.insert[w]), E) {
            const [k] = this.scroll.descendant(Be, a);
            if (k) {
              const L = zt({}, Xe(k));
              d = et.AttributeMap.diff(L, d) || {};
            }
          }
        }
        t += c;
      } else if (s.push(l), l.retain !== null && typeof l.retain == "object") {
        const w = Object.keys(l.retain)[0];
        if (w == null) return a;
        this.scroll.updateEmbedAt(a, w, l.retain[w]);
      }
      Object.keys(d).forEach((w) => {
        this.scroll.formatAt(a, c, w, d[w]);
      });
      const h = g ? 1 : 0, b = m ? 1 : 0;
      return t += h + b, s.retain(h), s.delete(b), a + c + h + b;
    }, 0), s.reduce((a, l) => typeof l.delete == "number" ? (this.scroll.deleteAt(a, l.delete), a) : a + et.Op.length(l), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
  }
  deleteText(e, t) {
    return this.scroll.deleteAt(e, t), this.update(new G().retain(e).delete(t));
  }
  formatLine(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(r).forEach((i) => {
      this.scroll.lines(e, Math.max(t, 1)).forEach((a) => {
        a.format(i, r[i]);
      });
    }), this.scroll.optimize();
    const s = new G().retain(e).retain(t, Cr(r));
    return this.update(s);
  }
  formatText(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((i) => {
      this.scroll.formatAt(e, t, i, r[i]);
    });
    const s = new G().retain(e).retain(t, Cr(r));
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
      const [c] = l;
      c instanceof Ie ? r.push(c) : c instanceof Be && s.push(c);
    }) : (r = this.scroll.lines(e, t), s = this.scroll.descendants(Be, e, t));
    const [i, a] = [r, s].map((l) => {
      const c = l.shift();
      if (c == null) return {};
      let d = Xe(c);
      for (; Object.keys(d).length > 0; ) {
        const g = l.shift();
        if (g == null) return d;
        d = Um(Xe(g), d);
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
      return r.length() >= s + t && !(s === 0 && t === i) ? gn(r, s, t, !0) : gn(this.scroll, e, t, !0);
    }
    return "";
  }
  getText(e, t) {
    return this.getContents(e, t).filter((r) => typeof r.insert == "string").map((r) => r.insert).join("");
  }
  insertContents(e, t) {
    const r = no(t), s = new G().retain(e).concat(r);
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
    }), this.update(new G().retain(e).insert(t, Cr(r)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const e = this.scroll.children.head;
    if (e?.statics.blotName !== Ie.blotName) return !1;
    const t = e;
    return t.children.length > 1 ? !1 : t.children.head instanceof ut;
  }
  removeFormat(e, t) {
    const r = this.getText(e, t), [s, i] = this.scroll.line(e + t);
    let a = 0, l = new G();
    s != null && (a = s.length() - i, l = s.delta().slice(i, i + a - 1).insert(`
`));
    const d = this.getContents(e, t + a).diff(new G().insert(r).concat(l)), g = new G().retain(e).concat(d);
    return this.applyDelta(g);
  }
  update(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const s = this.delta;
    if (t.length === 1 && t[0].type === "characterData" && // @ts-expect-error Fix me later
    t[0].target.data.match(Pm) && this.scroll.find(t[0].target)) {
      const i = this.scroll.find(t[0].target), a = Xe(i), l = i.offset(this.scroll), c = t[0].oldValue.replace(it.CONTENTS, ""), d = new G().insert(c), g = new G().insert(i.value()), m = r && {
        oldRange: so(r.oldRange, -l),
        newRange: so(r.newRange, -l)
      };
      e = new G().retain(l).concat(d.diff(g, m)).reduce((b, w) => w.insert ? b.insert(w.insert, a) : b.push(w), new G()), this.delta = s.compose(e);
    } else
      this.delta = this.getDelta(), (!e || !sa(s.compose(e), this.delta)) && (e = s.diff(this.delta, r));
    return e;
  }
}
function _r(n, e, t) {
  if (n.length === 0) {
    const [b] = vi(t.pop());
    return e <= 0 ? `</li></${b}>` : `</li></${b}>${_r([], e - 1, t)}`;
  }
  const [{
    child: r,
    offset: s,
    length: i,
    indent: a,
    type: l
  }, ...c] = n, [d, g] = vi(l);
  if (a > e)
    return t.push(l), a === e + 1 ? `<${d}><li${g}>${gn(r, s, i)}${_r(c, a, t)}` : `<${d}><li>${_r(n, e + 1, t)}`;
  const m = t[t.length - 1];
  if (a === e && l === m)
    return `</li><li${g}>${gn(r, s, i)}${_r(c, a, t)}`;
  const [h] = vi(t.pop());
  return `</li></${h}>${_r(n, e - 1, t)}`;
}
function gn(n, e, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in n && typeof n.html == "function")
    return n.html(e, t);
  if (n instanceof lt)
    return ws(n.value().slice(e, e + t)).replaceAll(" ", "&nbsp;");
  if (n instanceof ot) {
    if (n.statics.blotName === "list-container") {
      const d = [];
      return n.children.forEachAt(e, t, (g, m, h) => {
        const b = "formats" in g && typeof g.formats == "function" ? g.formats() : {};
        d.push({
          child: g,
          offset: m,
          length: h,
          indent: b.indent || 0,
          type: b.list
        });
      }), _r(d, -1, []);
    }
    const s = [];
    if (n.children.forEachAt(e, t, (d, g, m) => {
      s.push(gn(d, g, m));
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
function Um(n, e) {
  return Object.keys(e).reduce((t, r) => {
    if (n[r] == null) return t;
    const s = e[r];
    return s === n[r] ? t[r] = s : Array.isArray(s) ? s.indexOf(n[r]) < 0 ? t[r] = s.concat([n[r]]) : t[r] = s : t[r] = [s, n[r]], t;
  }, {});
}
function vi(n) {
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
function no(n) {
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
function so(n, e) {
  let {
    index: t,
    length: r
  } = n;
  return new ir(t + e, r);
}
function zm(n) {
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
class vt {
  static DEFAULTS = {};
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = e, this.options = t;
  }
}
const Gn = "\uFEFF";
class oa extends We {
  constructor(e, t) {
    super(e, t), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((r) => {
      this.contentNode.appendChild(r);
    }), this.leftGuard = document.createTextNode(Gn), this.rightGuard = document.createTextNode(Gn), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(e, t) {
    return e === this.leftGuard ? 0 : e === this.rightGuard ? 1 : super.index(e, t);
  }
  restore(e) {
    let t = null, r;
    const s = e.data.split(Gn).join("");
    if (e === this.leftGuard)
      if (this.prev instanceof lt) {
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
    else e === this.rightGuard && (this.next instanceof lt ? (this.next.insertAt(0, s), t = {
      startNode: this.next.domNode,
      startOffset: s.length
    }) : (r = document.createTextNode(s), this.parent.insertBefore(this.scroll.create(r), this.next), t = {
      startNode: r,
      startOffset: s.length
    }));
    return e.data = Gn, t;
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
class Vm {
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
    t && !(t instanceof oa) && (this.emitter.emit(H.events.COMPOSITION_BEFORE_START, e), this.scroll.batchStart(), this.emitter.emit(H.events.COMPOSITION_START, e), this.isComposing = !0);
  }
  handleCompositionEnd(e) {
    this.emitter.emit(H.events.COMPOSITION_BEFORE_END, e), this.scroll.batchEnd(), this.emitter.emit(H.events.COMPOSITION_END, e), this.isComposing = !1;
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
const Hm = (n) => n.parentElement || n.getRootNode().host || null, Km = (n) => {
  const e = n.getBoundingClientRect(), t = "offsetWidth" in n && Math.abs(e.width) / n.offsetWidth || 1, r = "offsetHeight" in n && Math.abs(e.height) / n.offsetHeight || 1;
  return {
    top: e.top,
    right: e.left + n.clientWidth * t,
    bottom: e.top + n.clientHeight * r,
    left: e.left
  };
}, Wn = (n) => {
  const e = parseInt(n, 10);
  return Number.isNaN(e) ? 0 : e;
}, io = (n, e, t, r, s, i) => n < t && e > r ? 0 : n < t ? -(t - n + s) : e > r ? e - n > r - t ? n + s - t : e - r + i : 0, Gm = (n, e) => {
  const t = n.ownerDocument;
  let r = e, s = n;
  for (; s; ) {
    const i = s === t.body, a = i ? {
      top: 0,
      right: window.visualViewport?.width ?? t.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? t.documentElement.clientHeight,
      left: 0
    } : Km(s), l = getComputedStyle(s), c = io(r.left, r.right, a.left, a.right, Wn(l.scrollPaddingLeft), Wn(l.scrollPaddingRight)), d = io(r.top, r.bottom, a.top, a.bottom, Wn(l.scrollPaddingTop), Wn(l.scrollPaddingBottom));
    if (c || d)
      if (i)
        t.defaultView?.scrollBy(c, d);
      else {
        const {
          scrollLeft: g,
          scrollTop: m
        } = s;
        d && (s.scrollTop += d), c && (s.scrollLeft += c);
        const h = s.scrollLeft - g, b = s.scrollTop - m;
        r = {
          left: r.left - h,
          top: r.top - b,
          right: r.right - h,
          bottom: r.bottom - b
        };
      }
    s = i || l.position === "fixed" ? null : Hm(s);
  }
}, Wm = 100, Zm = ["block", "break", "cursor", "inline", "scroll", "text"], Ym = (n, e, t) => {
  const r = new Rr();
  return Zm.forEach((s) => {
    const i = e.query(s);
    i && r.register(i);
  }), n.forEach((s) => {
    let i = e.query(s);
    i || t.error(`Cannot register "${s}" specified in "formats" config. Are you sure it was registered?`);
    let a = 0;
    for (; i; )
      if (r.register(i), i = "blotName" in i ? i.requiredContainer ?? null : null, a += 1, a > Wm) {
        t.error(`Cycle detected in registering blot requiredContainer: "${s}"`);
        break;
      }
  }), r;
}, Lr = Rt("quill"), Zn = new Rr();
ot.uiClass = "ql-ui";
class q {
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
    registry: Zn,
    theme: "default"
  };
  static events = H.events;
  static sources = H.sources;
  static version = "2.0.3";
  static imports = {
    delta: G,
    parchment: km,
    "core/module": vt,
    "core/theme": Br
  };
  static debug(e) {
    e === !0 && (e = "log"), Rt.level(e);
  }
  static find(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return Pi.get(e) || Zn.find(e, t);
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
      this.imports[e] != null && !r && Lr.warn(`Overwriting ${e} with`, t), this.imports[e] = t, (e.startsWith("blots/") || e.startsWith("formats/")) && t && typeof t != "boolean" && t.blotName !== "abstract" && Zn.register(t), typeof t.register == "function" && t.register(Zn);
    }
  }
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = Xm(e, t), this.container = this.options.container, this.container == null) {
      Lr.error("Invalid Quill container", e);
      return;
    }
    this.options.debug && q.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", Pi.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new H();
    const s = aa.blotName, i = this.options.registry.query(s);
    if (!i || !("blotName" in i))
      throw new Error(`Cannot initialize Quill without "${s}" blot`);
    if (this.scroll = new i(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new jm(this.scroll), this.selection = new Mm(this.scroll, this.emitter), this.composition = new Vm(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(H.events.EDITOR_CHANGE, (a) => {
      a === H.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(H.events.SCROLL_UPDATE, (a, l) => {
      const c = this.selection.lastRange, [d] = this.selection.getRange(), g = c && d ? {
        oldRange: c,
        newRange: d
      } : void 0;
      nt.call(this, () => this.editor.update(null, l, g), a);
    }), this.emitter.on(H.events.SCROLL_EMBED_UPDATE, (a, l) => {
      const c = this.selection.lastRange, [d] = this.selection.getRange(), g = c && d ? {
        oldRange: c,
        newRange: d
      } : void 0;
      nt.call(this, () => {
        const m = new G().retain(a.offset(this)).retain({
          [a.statics.blotName]: l
        });
        return this.editor.update(m, [], g);
      }, q.sources.USER);
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
    return [e, t, , r] = Nt(e, t, r), nt.call(this, () => this.editor.deleteText(e, t), r, e, -1 * t);
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
    return nt.call(this, () => {
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
    let a;
    return [e, t, a, i] = Nt(
      e,
      t,
      // @ts-expect-error
      r,
      s,
      i
    ), nt.call(this, () => this.editor.formatLine(e, t, a), i, e, 0);
  }
  formatText(e, t, r, s, i) {
    let a;
    return [e, t, a, i] = Nt(
      // @ts-expect-error
      e,
      t,
      r,
      s,
      i
    ), nt.call(this, () => this.editor.formatText(e, t, a), i, e, 0);
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
    return [e, t] = Nt(e, t), this.editor.getContents(e, t);
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
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = Nt(e, t), this.editor.getHTML(e, t);
  }
  getText() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 ? arguments[1] : void 0;
    return typeof e == "number" && (t = t ?? this.getLength() - e), [e, t] = Nt(e, t), this.editor.getText(e, t);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(e, t, r) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : q.sources.API;
    return nt.call(this, () => this.editor.insertEmbed(e, t, r), s, e);
  }
  insertText(e, t, r, s, i) {
    let a;
    return [e, , a, i] = Nt(e, 0, r, s, i), nt.call(this, () => this.editor.insertText(e, t, a), i, e, t.length);
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
    return [e, t, , r] = Nt(e, t, r), nt.call(this, () => this.editor.removeFormat(e, t), r, e);
  }
  scrollRectIntoView(e) {
    Gm(this.root, e);
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
    return nt.call(this, () => {
      e = new G(e);
      const r = this.getLength(), s = this.editor.deleteText(0, r), i = this.editor.insertContents(0, e), a = this.editor.deleteText(this.getLength() - 1, 1);
      return s.compose(i).compose(a);
    }, t);
  }
  setSelection(e, t, r) {
    e == null ? this.selection.setRange(null, t || q.sources.API) : ([e, t, , r] = Nt(e, t, r), this.selection.setRange(new ir(Math.max(0, e), t), r), r !== H.sources.SILENT && this.scrollSelectionIntoView());
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
    return nt.call(this, () => (e = new G(e), this.editor.applyDelta(e)), t, !0);
  }
}
function ao(n) {
  return typeof n == "string" ? document.querySelector(n) : n;
}
function xi(n) {
  return Object.entries(n ?? {}).reduce((e, t) => {
    let [r, s] = t;
    return {
      ...e,
      [r]: s === !0 ? {} : s
    };
  }, {});
}
function oo(n) {
  return Object.fromEntries(Object.entries(n).filter((e) => e[1] !== void 0));
}
function Xm(n, e) {
  const t = ao(n);
  if (!t)
    throw new Error("Invalid Quill container");
  const s = !e.theme || e.theme === q.DEFAULTS.theme ? Br : q.import(`themes/${e.theme}`);
  if (!s)
    throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
  const {
    modules: i,
    ...a
  } = q.DEFAULTS, {
    modules: l,
    ...c
  } = s.DEFAULTS;
  let d = xi(e.modules);
  d != null && d.toolbar && d.toolbar.constructor !== Object && (d = {
    ...d,
    toolbar: {
      container: d.toolbar
    }
  });
  const g = zt({}, xi(i), xi(l), d), m = {
    ...a,
    ...oo(c),
    ...oo(e)
  };
  let h = e.registry;
  return h ? e.formats && Lr.warn('Ignoring "formats" option because "registry" is specified') : h = e.formats ? Ym(e.formats, m.registry, Lr) : m.registry, {
    ...m,
    registry: h,
    container: t,
    theme: s,
    modules: Object.entries(g).reduce((b, w) => {
      let [E, k] = w;
      if (!k) return b;
      const L = q.import(`modules/${E}`);
      return L == null ? (Lr.error(`Cannot load ${E} module. Are you sure you registered it?`), b) : {
        ...b,
        // @ts-expect-error
        [E]: zt({}, L.DEFAULTS || {}, k)
      };
    }, {}),
    bounds: ao(m.bounds)
  };
}
function nt(n, e, t, r) {
  if (!this.isEnabled() && e === H.sources.USER && !this.allowReadOnlyEdits)
    return new G();
  let s = t == null ? null : this.getSelection();
  const i = this.editor.delta, a = n();
  if (s != null && (t === !0 && (t = s.index), r == null ? s = lo(s, a, e) : r !== 0 && (s = lo(s, t, r, e)), this.setSelection(s, H.sources.SILENT)), a.length() > 0) {
    const l = [H.events.TEXT_CHANGE, a, i, e];
    this.emitter.emit(H.events.EDITOR_CHANGE, ...l), e !== H.sources.SILENT && this.emitter.emit(...l);
  }
  return a;
}
function Nt(n, e, t, r, s) {
  let i = {};
  return typeof n.index == "number" && typeof n.length == "number" ? typeof e != "number" ? (s = r, r = t, t = e, e = n.length, n = n.index) : (e = n.length, n = n.index) : typeof e != "number" && (s = r, r = t, t = e, e = 0), typeof t == "object" ? (i = t, s = r) : typeof t == "string" && (r != null ? i[t] = r : s = t), s = s || H.sources.API, [n, e, i, s];
}
function lo(n, e, t, r) {
  const s = typeof t == "number" ? t : 0;
  if (n == null) return null;
  let i, a;
  return e && typeof e.transformPosition == "function" ? [i, a] = [n.index, n.index + n.length].map((l) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    e.transformPosition(l, r !== H.sources.USER)
  )) : [i, a] = [n.index, n.index + n.length].map((l) => l < e || l === e && r === H.sources.USER ? l : s >= 0 ? l + s : Math.max(e, l + s)), new ir(i, a - i);
}
class ur extends xs {
}
function co(n) {
  return n instanceof Ie || n instanceof Je;
}
function uo(n) {
  return typeof n.updateContent == "function";
}
class Qm extends aa {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = Ie;
  static allowedChildren = [Ie, Je, ur];
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
      if (r instanceof Je || i instanceof Je) {
        this.optimize();
        return;
      }
      const a = i.children.head instanceof ut ? null : i.children.head;
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
    const r = this.deltaToRenderBlocks(t.concat(new G().insert(`
`))), s = r.pop();
    if (s == null) return;
    this.batchStart();
    const i = r.shift();
    if (i) {
      const c = i.type === "block" && (i.delta.length() === 0 || !this.descendant(Je, e)[0] && e < this.length()), d = i.type === "block" ? i.delta : new G().insert({
        [i.key]: i.value
      });
      wi(this, e, d);
      const g = i.type === "block" ? 1 : 0, m = e + d.length() + g;
      c && this.insertAt(m - 1, `
`);
      const h = Xe(this.line(e)[0]), b = et.AttributeMap.diff(h, i.attributes) || {};
      Object.keys(b).forEach((w) => {
        this.formatAt(m - 1, 1, w, b[w]);
      }), e = m;
    }
    let [a, l] = this.children.find(e);
    if (r.length && (a && (a = a.split(l), l = 0), r.forEach((c) => {
      if (c.type === "block") {
        const d = this.createBlock(c.attributes, a || void 0);
        wi(d, 0, c.delta);
      } else {
        const d = this.create(c.key, c.value);
        this.insertBefore(d, a || void 0), Object.keys(c.attributes).forEach((g) => {
          d.format(g, c.attributes[g]);
        });
      }
    })), s.type === "block" && s.delta.length()) {
      const c = a ? a.offset(a.scroll) + l : this.length();
      wi(this, c, s.delta);
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
    return e === this.length() ? this.line(e - 1) : this.descendant(co, e);
  }
  lines() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (s, i, a) => {
      let l = [], c = a;
      return s.children.forEachAt(i, a, (d, g, m) => {
        co(d) ? l.push(d) : d instanceof xs && (l = l.concat(r(d, g, c))), c -= m;
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
      return i && !uo(i);
    }), e.length > 0 && this.emitter.emit(H.events.SCROLL_BEFORE_UPDATE, t, e), super.update(e.concat([])), e.length > 0 && this.emitter.emit(H.events.SCROLL_UPDATE, t, e);
  }
  updateEmbedAt(e, t, r) {
    const [s] = this.descendant((i) => i instanceof Je, e);
    s && s.statics.blotName === t && uo(s) && s.updateContent(r);
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
          const a = i.split(`
`);
          a.slice(0, -1).forEach((c) => {
            r.insert(c, s.attributes), t.push({
              type: "block",
              delta: r,
              attributes: s.attributes ?? {}
            }), r = new G();
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
          }), r = new G(), t.push({
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
function wi(n, e, t) {
  t.reduce((r, s) => {
    const i = et.Op.length(s);
    let a = s.attributes || {};
    if (s.insert != null) {
      if (typeof s.insert == "string") {
        const l = s.insert;
        n.insertAt(r, l);
        const [c] = n.descendant(Be, r), d = Xe(c);
        a = et.AttributeMap.diff(d, a) || {};
      } else if (typeof s.insert == "object") {
        const l = Object.keys(s.insert)[0];
        if (l == null) return r;
        if (n.insertAt(r, l, s.insert[l]), n.scroll.query(l, W.INLINE) != null) {
          const [d] = n.descendant(Be, r), g = Xe(d);
          a = et.AttributeMap.diff(g, a) || {};
        }
      }
    }
    return Object.keys(a).forEach((l) => {
      n.formatAt(r, i, l, a[l]);
    }), r + i;
  }, e);
}
const la = {
  scope: W.BLOCK,
  whitelist: ["right", "center", "justify"]
}, Jm = new bt("align", "align", la), Cl = new ct("align", "ql-align", la), kl = new Zt("align", "text-align", la);
class Ll extends Zt {
  value(e) {
    let t = super.value(e);
    return t.startsWith("rgb(") ? (t = t.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${t.split(",").map((s) => `00${parseInt(s, 10).toString(16)}`.slice(-2)).join("")}`) : t;
  }
}
const eg = new ct("color", "ql-color", {
  scope: W.INLINE
}), ca = new Ll("color", "color", {
  scope: W.INLINE
}), tg = new ct("background", "ql-bg", {
  scope: W.INLINE
}), ua = new Ll("background", "background-color", {
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
${ws(this.code(e, t))}
</pre>`;
  }
}
class ze extends Ie {
  static TAB = "  ";
  static register() {
    q.register(dr);
  }
}
class da extends Ue {
}
da.blotName = "code";
da.tagName = "CODE";
ze.blotName = "code-block";
ze.className = "ql-code-block";
ze.tagName = "DIV";
dr.blotName = "code-block-container";
dr.className = "ql-code-block-container";
dr.tagName = "DIV";
dr.allowedChildren = [ze];
ze.allowedChildren = [lt, ut, it];
ze.requiredContainer = dr;
const ha = {
  scope: W.BLOCK,
  whitelist: ["rtl"]
}, ql = new bt("direction", "dir", ha), Ol = new ct("direction", "ql-direction", ha), Il = new Zt("direction", "direction", ha), Rl = {
  scope: W.INLINE,
  whitelist: ["serif", "monospace"]
}, $l = new ct("font", "ql-font", Rl);
class rg extends Zt {
  value(e) {
    return super.value(e).replace(/["']/g, "");
  }
}
const Dl = new rg("font", "font-family", Rl), Bl = new ct("size", "ql-size", {
  scope: W.INLINE,
  whitelist: ["small", "large", "huge"]
}), Fl = new Zt("size", "font-size", {
  scope: W.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), ng = Rt("quill:keyboard"), sg = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class As extends vt {
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
    const s = ag(e);
    if (s == null) {
      ng.warn("Attempted to add invalid keyboard binding", s);
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
      const s = (this.bindings[e.key] || []).concat(this.bindings[e.which] || []).filter((L) => As.match(e, L));
      if (s.length === 0) return;
      const i = q.find(e.target, !0);
      if (i && i.scroll !== this.quill.scroll) return;
      const a = this.quill.getSelection();
      if (a == null || !this.quill.hasFocus()) return;
      const [l, c] = this.quill.getLine(a.index), [d, g] = this.quill.getLeaf(a.index), [m, h] = a.length === 0 ? [d, g] : this.quill.getLeaf(a.index + a.length), b = d instanceof ls ? d.value().slice(0, g) : "", w = m instanceof ls ? m.value().slice(h) : "", E = {
        collapsed: a.length === 0,
        // @ts-expect-error Fix me later
        empty: a.length === 0 && l.length() <= 1,
        format: this.quill.getFormat(a),
        line: l,
        offset: c,
        prefix: b,
        suffix: w,
        event: e
      };
      s.some((L) => {
        if (L.collapsed != null && L.collapsed !== E.collapsed || L.empty != null && L.empty !== E.empty || L.offset != null && L.offset !== E.offset)
          return !1;
        if (Array.isArray(L.format)) {
          if (L.format.every((F) => E.format[F] == null))
            return !1;
        } else if (typeof L.format == "object" && !Object.keys(L.format).every((F) => L.format[F] === !0 ? E.format[F] != null : L.format[F] === !1 ? E.format[F] == null : sa(L.format[F], E.format[F])))
          return !1;
        return L.prefix != null && !L.prefix.test(E.prefix) || L.suffix != null && !L.suffix.test(E.suffix) ? !1 : L.handler.call(this, a, E, L) !== !0;
      }) && e.preventDefault();
    });
  }
  handleBackspace(e, t) {
    const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(t.prefix) ? 2 : 1;
    if (e.index === 0 || this.quill.getLength() <= 1) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let a = new G().retain(e.index - r).delete(r);
    if (t.offset === 0) {
      const [l] = this.quill.getLine(e.index - 1);
      if (l && !(l.statics.blotName === "block" && l.length() <= 1)) {
        const d = i.formats(), g = this.quill.getFormat(e.index - 1, 1);
        if (s = et.AttributeMap.diff(d, g) || {}, Object.keys(s).length > 0) {
          const m = new G().retain(e.index + i.length() - 2).retain(1, s);
          a = a.compose(m);
        }
      }
    }
    this.quill.updateContents(a, q.sources.USER), this.quill.focus();
  }
  handleDelete(e, t) {
    const r = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(t.suffix) ? 2 : 1;
    if (e.index >= this.quill.getLength() - r) return;
    let s = {};
    const [i] = this.quill.getLine(e.index);
    let a = new G().retain(e.index).delete(r);
    if (t.offset >= i.length() - 1) {
      const [l] = this.quill.getLine(e.index + 1);
      if (l) {
        const c = i.formats(), d = this.quill.getFormat(e.index, 1);
        s = et.AttributeMap.diff(c, d) || {}, Object.keys(s).length > 0 && (a = a.retain(l.length() - 1).retain(1, s));
      }
    }
    this.quill.updateContents(a, q.sources.USER), this.quill.focus();
  }
  handleDeleteRange(e) {
    fa({
      range: e,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(e, t) {
    const r = Object.keys(t.format).reduce((i, a) => (this.quill.scroll.query(a, W.BLOCK) && !Array.isArray(t.format[a]) && (i[a] = t.format[a]), i), {}), s = new G().retain(e.index).delete(e.length).insert(`
`, r);
    this.quill.updateContents(s, q.sources.USER), this.quill.setSelection(e.index + 1, q.sources.SILENT), this.quill.focus();
  }
}
const ig = {
  bindings: {
    bold: Ai("bold"),
    italic: Ai("italic"),
    underline: Ai("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(n, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "+1", q.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(n, e) {
        return e.collapsed && e.offset !== 0 ? !0 : (this.quill.format("indent", "-1", q.sources.USER), !1);
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
        e.format.indent != null ? this.quill.format("indent", "-1", q.sources.USER) : e.format.list != null && this.quill.format("list", !1, q.sources.USER);
      }
    },
    "indent code-block": ho(!0),
    "outdent code-block": ho(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(n) {
        this.quill.deleteText(n.index - 1, 1, q.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(n, e) {
        if (e.format.table) return !0;
        this.quill.history.cutoff();
        const t = new G().retain(n.index).delete(n.length).insert("	");
        return this.quill.updateContents(t, q.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index + 1, q.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, q.sources.USER);
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
        e.format.indent && (t.indent = !1), this.quill.formatLine(n.index, n.length, t, q.sources.USER);
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
        this.quill.updateContents(s, q.sources.USER), this.quill.setSelection(n.index + 1, q.sources.SILENT), this.quill.scrollSelectionIntoView();
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
        this.quill.updateContents(s, q.sources.USER), this.quill.setSelection(n.index + 1, q.sources.SILENT), this.quill.scrollSelectionIntoView();
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
          const [t, r, s, i] = e.getTable(n), a = og(t, r, s, i);
          if (a == null) return;
          let l = t.offset();
          if (a < 0) {
            const c = new G().retain(l).insert(`
`);
            this.quill.updateContents(c, q.sources.USER), this.quill.setSelection(n.index + 1, n.length, q.sources.SILENT);
          } else if (a > 0) {
            l += t.length();
            const c = new G().retain(l).insert(`
`);
            this.quill.updateContents(c, q.sources.USER), this.quill.setSelection(l, q.sources.USER);
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
        t.shiftKey ? this.quill.setSelection(s - 1, q.sources.USER) : this.quill.setSelection(s + r.length(), q.sources.USER);
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
        this.quill.insertText(n.index, " ", q.sources.USER), this.quill.history.cutoff();
        const a = new G().retain(n.index - s).delete(t + 1).retain(r.length() - 2 - s).retain(1, {
          list: i
        });
        return this.quill.updateContents(a, q.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(n.index - t, q.sources.SILENT), !1;
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
            return this.quill.updateContents(i, q.sources.USER), this.quill.setSelection(n.index - 1, q.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": Yn("ArrowLeft", !1),
    "embed left shift": Yn("ArrowLeft", !0),
    "embed right": Yn("ArrowRight", !1),
    "embed right shift": Yn("ArrowRight", !0),
    "table down": fo(!1),
    "table up": fo(!0)
  }
};
As.DEFAULTS = ig;
function ho(n) {
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
        this.quill.insertText(e.index, i, q.sources.USER), this.quill.setSelection(e.index + i.length, q.sources.SILENT);
        return;
      }
      const a = e.length === 0 ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
      let {
        index: l,
        length: c
      } = e;
      a.forEach((d, g) => {
        n ? (d.insertAt(0, i), g === 0 ? l += i.length : c += i.length) : d.domNode.textContent.startsWith(i) && (d.deleteAt(0, i.length), g === 0 ? l -= i.length : c -= i.length);
      }), this.quill.update(q.sources.USER), this.quill.setSelection(l, c, q.sources.SILENT);
    }
  };
}
function Yn(n, e) {
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
      return i instanceof We ? (n === "ArrowLeft" ? e ? this.quill.setSelection(r.index - 1, r.length + 1, q.sources.USER) : this.quill.setSelection(r.index - 1, q.sources.USER) : e ? this.quill.setSelection(r.index, r.length + 1, q.sources.USER) : this.quill.setSelection(r.index + r.length + 1, q.sources.USER), !1) : !0;
    }
  };
}
function Ai(n) {
  return {
    key: n[0],
    shortKey: !0,
    handler(e, t) {
      this.quill.format(n, !t.format[n], q.sources.USER);
    }
  };
}
function fo(n) {
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
          this.quill.setSelection(c, 0, q.sources.USER);
        }
      } else {
        const a = s.table()[r];
        a != null && (n ? this.quill.setSelection(a.offset(this.quill.scroll) + a.length() - 1, 0, q.sources.USER) : this.quill.setSelection(a.offset(this.quill.scroll), 0, q.sources.USER));
      }
      return !1;
    }
  };
}
function ag(n) {
  if (typeof n == "string" || typeof n == "number")
    n = {
      key: n
    };
  else if (typeof n == "object")
    n = Cr(n);
  else
    return null;
  return n.shortKey && (n[sg] = n.shortKey, delete n.shortKey), n;
}
function fa(n) {
  let {
    quill: e,
    range: t
  } = n;
  const r = e.getLines(t);
  let s = {};
  if (r.length > 1) {
    const i = r[0].formats(), a = r[r.length - 1].formats();
    s = et.AttributeMap.diff(a, i) || {};
  }
  e.deleteText(t, q.sources.USER), Object.keys(s).length > 0 && e.formatLine(t.index, 1, s, q.sources.USER), e.setSelection(t.index, q.sources.SILENT);
}
function og(n, e, t, r) {
  return e.prev == null && e.next == null ? t.prev == null && t.next == null ? r === 0 ? -1 : 1 : t.prev == null ? -1 : 1 : e.prev == null ? -1 : e.next == null ? 1 : null;
}
const lg = /font-weight:\s*normal/, cg = ["P", "OL", "UL"], po = (n) => n && cg.includes(n.tagName), ug = (n) => {
  Array.from(n.querySelectorAll("br")).filter((e) => po(e.previousElementSibling) && po(e.nextElementSibling)).forEach((e) => {
    e.parentNode?.removeChild(e);
  });
}, dg = (n) => {
  Array.from(n.querySelectorAll('b[style*="font-weight"]')).filter((e) => e.getAttribute("style")?.match(lg)).forEach((e) => {
    const t = n.createDocumentFragment();
    t.append(...e.childNodes), e.parentNode?.replaceChild(t, e);
  });
};
function hg(n) {
  n.querySelector('[id^="docs-internal-guid-"]') && (dg(n), ug(n));
}
const fg = /\bmso-list:[^;]*ignore/i, pg = /\bmso-list:[^;]*\bl(\d+)/i, mg = /\bmso-list:[^;]*\blevel(\d+)/i, gg = (n, e) => {
  const t = n.getAttribute("style"), r = t?.match(pg);
  if (!r)
    return null;
  const s = Number(r[1]), i = t?.match(mg), a = i ? Number(i[1]) : 1, l = new RegExp(`@list l${s}:level${a}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), c = e.match(l), d = c && c[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: s,
    indent: a,
    type: d,
    element: n
  };
}, bg = (n) => {
  const e = Array.from(n.querySelectorAll("[style*=mso-list]")), t = [], r = [];
  e.forEach((a) => {
    (a.getAttribute("style") || "").match(fg) ? t.push(a) : r.push(a);
  }), t.forEach((a) => a.parentNode?.removeChild(a));
  const s = n.documentElement.innerHTML, i = r.map((a) => gg(a, s)).filter((a) => a);
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
      parentNode: g
    } = d ?? {};
    d && g?.replaceChild(c, d), a.slice(1).forEach((m) => {
      let {
        element: h
      } = m;
      g?.removeChild(h);
    });
  }
};
function yg(n) {
  n.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && bg(n);
}
const vg = [yg, hg], xg = (n) => {
  n.documentElement && vg.forEach((e) => {
    e(n);
  });
}, wg = Rt("quill:clipboard"), Ag = [[Node.TEXT_NODE, $g], [Node.TEXT_NODE, go], ["br", Cg], [Node.ELEMENT_NODE, go], [Node.ELEMENT_NODE, _g], [Node.ELEMENT_NODE, Sg], [Node.ELEMENT_NODE, Ig], ["li", qg], ["ol, ul", Og], ["pre", kg], ["tr", Rg], ["b", Ei("bold")], ["i", Ei("italic")], ["strike", Ei("strike")], ["style", Lg]], Eg = [Jm, ql].reduce((n, e) => (n[e.keyName] = e, n), {}), mo = [kl, ua, ca, Il, Dl, Fl].reduce((n, e) => (n[e.keyName] = e, n), {});
class Tg extends vt {
  static DEFAULTS = {
    matchers: []
  };
  constructor(e, t) {
    super(e, t), this.quill.root.addEventListener("copy", (r) => this.onCaptureCopy(r, !1)), this.quill.root.addEventListener("cut", (r) => this.onCaptureCopy(r, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], Ag.concat(this.options.matchers ?? []).forEach((r) => {
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
    return wn(i, `
`) && (i.ops[i.ops.length - 1].attributes == null || s.table) ? i.compose(new G().retain(i.length() - 1).delete(1)) : i;
  }
  normalizeHTML(e) {
    xg(e);
  }
  convertHTML(e) {
    const t = new DOMParser().parseFromString(e, "text/html");
    this.normalizeHTML(t);
    const r = t.body, s = /* @__PURE__ */ new WeakMap(), [i, a] = this.prepareMatching(r, s);
    return pa(this.quill.scroll, r, i, a, s);
  }
  dangerouslyPasteHTML(e, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : q.sources.API;
    if (typeof e == "string") {
      const s = this.convert({
        html: e,
        text: ""
      });
      this.quill.setContents(s, t), this.quill.setSelection(0, q.sources.SILENT);
    } else {
      const s = this.convert({
        html: t,
        text: ""
      });
      this.quill.updateContents(new G().retain(e).concat(s), r), this.quill.setSelection(e + s.length(), q.sources.SILENT);
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
    e.clipboardData?.setData("text/plain", i), e.clipboardData?.setData("text/html", s), t && fa({
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
    wg.log("onPaste", a, {
      text: r,
      html: s
    });
    const l = new G().retain(e.index).delete(e.length).concat(a);
    this.quill.updateContents(l, q.sources.USER), this.quill.setSelection(l.length() - e.length, q.sources.SILENT), this.quill.scrollSelectionIntoView();
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
  }, new G()) : n;
}
function wn(n, e) {
  let t = "";
  for (let r = n.ops.length - 1; r >= 0 && t.length < e.length; --r) {
    const s = n.ops[r];
    if (typeof s.insert != "string") break;
    t = s.insert + t;
  }
  return t.slice(-1 * e.length) === e;
}
function jt(n, e) {
  if (!(n instanceof Element)) return !1;
  const t = e.query(n);
  return t && t.prototype instanceof We ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(n.tagName.toLowerCase());
}
function Ng(n, e) {
  return n.previousElementSibling && n.nextElementSibling && !jt(n.previousElementSibling, e) && !jt(n.nextElementSibling, e);
}
const Xn = /* @__PURE__ */ new WeakMap();
function Ml(n) {
  return n == null ? !1 : (Xn.has(n) || (n.tagName === "PRE" ? Xn.set(n, !0) : Xn.set(n, Ml(n.parentNode))), Xn.get(n));
}
function pa(n, e, t, r, s) {
  return e.nodeType === e.TEXT_NODE ? r.reduce((i, a) => a(e, i, n), new G()) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((i, a) => {
    let l = pa(n, a, t, r, s);
    return a.nodeType === e.ELEMENT_NODE && (l = t.reduce((c, d) => d(a, c, n), l), l = (s.get(a) || []).reduce((c, d) => d(a, c, n), l)), i.concat(l);
  }, new G()) : new G();
}
function Ei(n) {
  return (e, t, r) => hr(t, n, !0, r);
}
function Sg(n, e, t) {
  const r = bt.keys(n), s = ct.keys(n), i = Zt.keys(n), a = {};
  return r.concat(s).concat(i).forEach((l) => {
    let c = t.query(l, W.ATTRIBUTE);
    c != null && (a[c.attrName] = c.value(n), a[c.attrName]) || (c = Eg[l], c != null && (c.attrName === l || c.keyName === l) && (a[c.attrName] = c.value(n) || void 0), c = mo[l], c != null && (c.attrName === l || c.keyName === l) && (c = mo[l], a[c.attrName] = c.value(n) || void 0));
  }), Object.entries(a).reduce((l, c) => {
    let [d, g] = c;
    return hr(l, d, g, t);
  }, e);
}
function _g(n, e, t) {
  const r = t.query(n);
  if (r == null) return e;
  if (r.prototype instanceof We) {
    const s = {}, i = r.value(n);
    if (i != null)
      return s[r.blotName] = i, new G().insert(s, r.formats(n, t));
  } else if (r.prototype instanceof mn && !wn(e, `
`) && e.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return hr(e, r.blotName, r.formats(n, t), t);
  return e;
}
function Cg(n, e) {
  return wn(e, `
`) || e.insert(`
`), e;
}
function kg(n, e, t) {
  const r = t.query("code-block"), s = r && "formats" in r && typeof r.formats == "function" ? r.formats(n, t) : !0;
  return hr(e, "code-block", s, t);
}
function Lg() {
  return new G();
}
function qg(n, e, t) {
  const r = t.query(n);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !wn(e, `
`))
    return e;
  let s = -1, i = n.parentNode;
  for (; i != null; )
    ["OL", "UL"].includes(i.tagName) && (s += 1), i = i.parentNode;
  return s <= 0 ? e : e.reduce((a, l) => l.insert ? l.attributes && typeof l.attributes.indent == "number" ? a.push(l) : a.insert(l.insert, {
    indent: s,
    ...l.attributes || {}
  }) : a, new G());
}
function Og(n, e, t) {
  const r = n;
  let s = r.tagName === "OL" ? "ordered" : "bullet";
  const i = r.getAttribute("data-checked");
  return i && (s = i === "true" ? "checked" : "unchecked"), hr(e, "list", s, t);
}
function go(n, e, t) {
  if (!wn(e, `
`)) {
    if (jt(n, t) && (n.childNodes.length > 0 || n instanceof HTMLParagraphElement))
      return e.insert(`
`);
    if (e.length() > 0 && n.nextSibling) {
      let r = n.nextSibling;
      for (; r != null; ) {
        if (jt(r, t))
          return e.insert(`
`);
        const s = t.query(r);
        if (s && s.prototype instanceof Je)
          return e.insert(`
`);
        r = r.firstChild;
      }
    }
  }
  return e;
}
function Ig(n, e, t) {
  const r = {}, s = n.style || {};
  return s.fontStyle === "italic" && (r.italic = !0), s.textDecoration === "underline" && (r.underline = !0), s.textDecoration === "line-through" && (r.strike = !0), (s.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(s.fontWeight, 10) >= 700) && (r.bold = !0), e = Object.entries(r).reduce((i, a) => {
    let [l, c] = a;
    return hr(i, l, c, t);
  }, e), parseFloat(s.textIndent || 0) > 0 ? new G().insert("	").concat(e) : e;
}
function Rg(n, e, t) {
  const r = n.parentElement?.tagName === "TABLE" ? n.parentElement : n.parentElement?.parentElement;
  if (r != null) {
    const i = Array.from(r.querySelectorAll("tr")).indexOf(n) + 1;
    return hr(e, "table", i, t);
  }
  return e;
}
function $g(n, e, t) {
  let r = n.data;
  if (n.parentElement?.tagName === "O:P")
    return e.insert(r.trim());
  if (!Ml(n)) {
    if (r.trim().length === 0 && r.includes(`
`) && !Ng(n, t))
      return e;
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (n.previousSibling == null && n.parentElement != null && jt(n.parentElement, t) || n.previousSibling instanceof Element && jt(n.previousSibling, t)) && (r = r.replace(/^ /, "")), (n.nextSibling == null && n.parentElement != null && jt(n.parentElement, t) || n.nextSibling instanceof Element && jt(n.nextSibling, t)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return e.insert(r);
}
class Dg extends vt {
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
    super(e, t), this.quill.on(q.events.EDITOR_CHANGE, (r, s, i, a) => {
      r === q.events.SELECTION_CHANGE ? s && a !== q.sources.SILENT && (this.currentRange = s) : r === q.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || a === q.sources.USER ? this.record(s, i) : this.transform(s)), this.currentRange = zi(this.currentRange, s));
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
      range: zi(r.range, i)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(r.delta, q.sources.USER), this.ignoreChange = !1, this.restoreSelection(r);
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
    bo(this.stack.undo, e), bo(this.stack.redo, e);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(e) {
    if (e.range)
      this.quill.setSelection(e.range, q.sources.USER);
    else {
      const t = Fg(this.quill.scroll, e.delta);
      this.quill.setSelection(t, q.sources.USER);
    }
  }
}
function bo(n, e) {
  let t = e;
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const s = n[r];
    n[r] = {
      delta: t.transform(s.delta, !0),
      range: s.range && zi(s.range, t)
    }, t = s.delta.transform(t), n[r].delta.length() === 0 && n.splice(r, 1);
  }
}
function Bg(n, e) {
  const t = e.ops[e.ops.length - 1];
  return t == null ? !1 : t.insert != null ? typeof t.insert == "string" && t.insert.endsWith(`
`) : t.attributes != null ? Object.keys(t.attributes).some((r) => n.query(r, W.BLOCK) != null) : !1;
}
function Fg(n, e) {
  const t = e.reduce((s, i) => s + (i.delete || 0), 0);
  let r = e.length() - t;
  return Bg(n, e) && (r -= 1), r;
}
function zi(n, e) {
  if (!n) return n;
  const t = e.transformPosition(n.index), r = e.transformPosition(n.index + n.length);
  return {
    index: t,
    length: r - t
  };
}
class Pl extends vt {
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
Pl.DEFAULTS = {
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
      }), new G().retain(n.index).delete(n.length));
      this.quill.updateContents(s, H.sources.USER), this.quill.setSelection(n.index + r.length, H.sources.SILENT);
    });
  }
};
const Mg = ["insertText", "insertReplacementText"];
class Pg extends vt {
  constructor(e, t) {
    super(e, t), e.root.addEventListener("beforeinput", (r) => {
      this.handleBeforeInput(r);
    }), /Android/i.test(navigator.userAgent) || e.on(q.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(e) {
    fa({
      range: e,
      quill: this.quill
    });
  }
  replaceText(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (e.length === 0) return !1;
    if (t) {
      const r = this.quill.getFormat(e.index, 1);
      this.deleteRange(e), this.quill.updateContents(new G().retain(e.index).insert(t, r), q.sources.USER);
    } else
      this.deleteRange(e);
    return this.quill.setSelection(e.index + t.length, 0, q.sources.SILENT), !0;
  }
  handleBeforeInput(e) {
    if (this.quill.composition.isComposing || e.defaultPrevented || !Mg.includes(e.inputType))
      return;
    const t = e.getTargetRanges ? e.getTargetRanges()[0] : null;
    if (!t || t.collapsed === !0)
      return;
    const r = jg(e);
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
function jg(n) {
  return typeof n.data == "string" ? n.data : n.dataTransfer?.types.includes("text/plain") ? n.dataTransfer.getData("text/plain") : null;
}
const Ug = /Mac/i.test(navigator.platform), zg = 100, Vg = (n) => !!(n.key === "ArrowLeft" || n.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
n.key === "ArrowUp" || n.key === "ArrowDown" || n.key === "Home" || Ug && n.key === "a" && n.ctrlKey === !0);
class Hg extends vt {
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
        return i && s.key !== "ArrowRight" || !i && s.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(e.index - 1, e.length + (s.shiftKey ? 1 : 0), q.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (e) => {
      !e.defaultPrevented && Vg(e) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + zg, this.isListening) return;
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
q.register({
  "blots/block": Ie,
  "blots/block/embed": Je,
  "blots/break": ut,
  "blots/container": ur,
  "blots/cursor": it,
  "blots/embed": oa,
  "blots/inline": Ue,
  "blots/scroll": Qm,
  "blots/text": lt,
  "modules/clipboard": Tg,
  "modules/history": Dg,
  "modules/keyboard": As,
  "modules/uploader": Pl,
  "modules/input": Pg,
  "modules/uiNode": Hg
});
class Kg extends ct {
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
const Gg = new Kg("indent", "ql-indent", {
  scope: W.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Wg extends Ie {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class Zg extends Ie {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(e) {
    return this.tagName.indexOf(e.tagName) + 1;
  }
}
class An extends ur {
}
An.blotName = "list-container";
An.tagName = "OL";
class En extends Ie {
  static create(e) {
    const t = super.create();
    return t.setAttribute("data-list", e), t;
  }
  static formats(e) {
    return e.getAttribute("data-list") || void 0;
  }
  static register() {
    q.register(An);
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
En.blotName = "list";
En.tagName = "LI";
An.allowedChildren = [En];
En.requiredContainer = An;
class ma extends Ue {
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
class Yg extends ma {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class cs extends Ue {
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
    return jl(e, this.PROTOCOL_WHITELIST) ? e : this.SANITIZED_URL;
  }
  format(e, t) {
    e !== this.statics.blotName || !t ? super.format(e, t) : this.domNode.setAttribute("href", this.constructor.sanitize(t));
  }
}
function jl(n, e) {
  const t = document.createElement("a");
  t.href = n;
  const r = t.href.slice(0, t.href.indexOf(":"));
  return e.indexOf(r) > -1;
}
class Xg extends Ue {
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
class Qg extends ma {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class Jg extends Ue {
  static blotName = "underline";
  static tagName = "U";
}
class eb extends oa {
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
const yo = ["alt", "height", "width"];
let tb = class extends We {
  static blotName = "image";
  static tagName = "IMG";
  static create(e) {
    const t = super.create(e);
    return typeof e == "string" && t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return yo.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static match(e) {
    return /\.(jpe?g|gif|png)$/.test(e) || /^data:image\/.+;base64/.test(e);
  }
  static sanitize(e) {
    return jl(e, ["http", "https", "data"]) ? e : "//:0";
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    yo.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
};
const vo = ["height", "width"];
class rb extends Je {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(e) {
    const t = super.create(e);
    return t.setAttribute("frameborder", "0"), t.setAttribute("allowfullscreen", "true"), t.setAttribute("src", this.sanitize(e)), t;
  }
  static formats(e) {
    return vo.reduce((t, r) => (e.hasAttribute(r) && (t[r] = e.getAttribute(r)), t), {});
  }
  static sanitize(e) {
    return cs.sanitize(e);
  }
  static value(e) {
    return e.getAttribute("src");
  }
  format(e, t) {
    vo.indexOf(e) > -1 ? t ? this.domNode.setAttribute(e, t) : this.domNode.removeAttribute(e) : super.format(e, t);
  }
  html() {
    const {
      video: e
    } = this.value();
    return `<a href="${e}">${e}</a>`;
  }
}
const sn = new ct("code-token", "hljs", {
  scope: W.INLINE
});
class qt extends Ue {
  static formats(e, t) {
    for (; e != null && e !== t.domNode; ) {
      if (e.classList && e.classList.contains(ze.className))
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
class Qe extends ze {
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
class cn extends dr {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(e, t) {
    e === Qe.blotName && (this.forceNext = !0, this.children.forEach((r) => {
      r.format(e, t);
    }));
  }
  formatAt(e, t, r, s) {
    r === Qe.blotName && (this.forceNext = !0), super.formatAt(e, t, r, s);
  }
  highlight(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const s = `${Array.from(this.domNode.childNodes).filter((a) => a !== this.uiNode).map((a) => a.textContent).join(`
`)}
`, i = Qe.formats(this.children.head.domNode);
    if (t || this.forceNext || this.cachedText !== s) {
      if (s.trim().length > 0 || this.cachedText == null) {
        const a = this.children.reduce((c, d) => c.concat(Sl(d, !1)), new G()), l = e(s, i);
        a.diff(l).reduce((c, d) => {
          let {
            retain: g,
            attributes: m
          } = d;
          return g ? (m && Object.keys(m).forEach((h) => {
            [Qe.blotName, qt.blotName].includes(h) && this.formatAt(c, g, h, m[h]);
          }), c + g) : c;
        }, 0);
      }
      this.cachedText = s, this.forceNext = !1;
    }
  }
  html(e, t) {
    const [r] = this.children.find(e);
    return `<pre data-language="${r ? Qe.formats(r.domNode) : "plain"}">
${ws(this.code(e, t))}
</pre>`;
  }
  optimize(e) {
    if (super.optimize(e), this.parent != null && this.children.head != null && this.uiNode != null) {
      const t = Qe.formats(this.children.head.domNode);
      t !== this.uiNode.value && (this.uiNode.value = t);
    }
  }
}
cn.allowedChildren = [Qe];
Qe.requiredContainer = cn;
Qe.allowedChildren = [qt, it, lt, ut];
const nb = (n, e, t) => {
  if (typeof n.versionString == "string") {
    const r = n.versionString.split(".")[0];
    if (parseInt(r, 10) >= 11)
      return n.highlight(t, {
        language: e
      }).value;
  }
  return n.highlight(e, t).value;
};
class Ul extends vt {
  static register() {
    q.register(qt, !0), q.register(Qe, !0), q.register(cn, !0);
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
    this.quill.on(q.events.SCROLL_BLOT_MOUNT, (e) => {
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
        e.format(Qe.blotName, t.value), this.quill.root.focus(), this.highlight(e, !0);
      }), e.uiNode == null && (e.attachUI(t), e.children.head && (t.value = Qe.formats(e.children.head.domNode)));
    });
  }
  initTimer() {
    let e = null;
    this.quill.on(q.events.SCROLL_OPTIMIZE, () => {
      e && clearTimeout(e), e = setTimeout(() => {
        this.highlight(), e = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(q.sources.USER);
    const r = this.quill.getSelection();
    (e == null ? this.quill.scroll.descendants(cn) : [e]).forEach((i) => {
      i.highlight(this.highlightBlot, t);
    }), this.quill.update(q.sources.SILENT), r != null && this.quill.setSelection(r, q.sources.SILENT);
  }
  highlightBlot(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (t = this.languages[t] ? t : "plain", t === "plain")
      return ws(e).split(`
`).reduce((s, i, a) => (a !== 0 && s.insert(`
`, {
        [ze.blotName]: t
      }), s.insert(i)), new G());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(ze.className), r.innerHTML = nb(this.options.hljs, t, e), pa(this.quill.scroll, r, [(s, i) => {
      const a = sn.value(s);
      return a ? i.compose(new G().retain(i.length(), {
        [qt.blotName]: a
      })) : i;
    }], [(s, i) => s.data.split(`
`).reduce((a, l, c) => (c !== 0 && a.insert(`
`, {
      [ze.blotName]: t
    }), a.insert(l)), i)], /* @__PURE__ */ new WeakMap());
  }
}
Ul.DEFAULTS = {
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
class at extends Ie {
  static blotName = "table";
  static tagName = "TD";
  static create(e) {
    const t = super.create();
    return e ? t.setAttribute("data-row", e) : t.setAttribute("data-row", ga()), t;
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
class ar extends ur {
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
class Vt extends ur {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class us extends ur {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const e = this.descendants(ar), t = e.reduce((r, s) => Math.max(s.children.length, r), 0);
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
    const [t] = this.descendant(Vt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e);
      s?.remove();
    });
  }
  insertColumn(e) {
    const [t] = this.descendant(Vt);
    t == null || t.children.head == null || t.children.forEach((r) => {
      const s = r.children.at(e), i = at.formats(r.children.head.domNode), a = this.scroll.create(at.blotName, i);
      r.insertBefore(a, s);
    });
  }
  insertRow(e) {
    const [t] = this.descendant(Vt);
    if (t == null || t.children.head == null) return;
    const r = ga(), s = this.scroll.create(ar.blotName);
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
us.allowedChildren = [Vt];
Vt.requiredContainer = us;
Vt.allowedChildren = [ar];
ar.requiredContainer = Vt;
ar.allowedChildren = [at];
at.requiredContainer = ar;
function ga() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class sb extends vt {
  static register() {
    q.register(at), q.register(ar), q.register(Vt), q.register(us);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(us).forEach((e) => {
      e.balanceCells();
    });
  }
  deleteColumn() {
    const [e, , t] = this.getTable();
    t != null && (e.deleteColumn(t.cellOffset()), this.quill.update(q.sources.USER));
  }
  deleteRow() {
    const [, e] = this.getTable();
    e != null && (e.remove(), this.quill.update(q.sources.USER));
  }
  deleteTable() {
    const [e] = this.getTable();
    if (e == null) return;
    const t = e.offset();
    e.remove(), this.quill.update(q.sources.USER), this.quill.setSelection(t, q.sources.SILENT);
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
    r.insertColumn(a + e), this.quill.update(q.sources.USER);
    let l = s.rowOffset();
    e === 0 && (l += 1), this.quill.setSelection(t.index + l, t.length, q.sources.SILENT);
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
    r.insertRow(a + e), this.quill.update(q.sources.USER), e > 0 ? this.quill.setSelection(t, q.sources.SILENT) : this.quill.setSelection(t.index + s.children.length, t.length, q.sources.SILENT);
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
        table: ga()
      });
    }, new G().retain(r.index));
    this.quill.updateContents(s, q.sources.USER), this.quill.setSelection(r.index, q.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(q.events.SCROLL_OPTIMIZE, (e) => {
      e.some((t) => ["TD", "TR", "TBODY", "TABLE"].includes(t.target.tagName) ? (this.quill.once(q.events.TEXT_CHANGE, (r, s, i) => {
        i === q.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const xo = Rt("quill:toolbar");
class ba extends vt {
  constructor(e, t) {
    if (super(e, t), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), ib(r, this.options.container), e.container?.parentNode?.insertBefore(r, e.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      xo.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      const s = this.options.handlers?.[r];
      s && this.addHandler(r, s);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(q.events.EDITOR_CHANGE, () => {
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
      xo.warn("ignoring attaching to nonexistent format", t, e);
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
        this.quill.scroll.query(t).prototype instanceof We
      ) {
        if (i = prompt(`Enter ${t}`), !i) return;
        this.quill.updateContents(new G().retain(a.index).delete(a.length).insert({
          [t]: i
        }), q.sources.USER);
      } else
        this.quill.format(t, i, q.sources.USER);
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
ba.DEFAULTS = {};
function wo(n, e, t) {
  const r = document.createElement("button");
  r.setAttribute("type", "button"), r.classList.add(`ql-${e}`), r.setAttribute("aria-pressed", "false"), t != null ? (r.value = t, r.setAttribute("aria-label", `${e}: ${t}`)) : r.setAttribute("aria-label", e), n.appendChild(r);
}
function ib(n, e) {
  Array.isArray(e[0]) || (e = [e]), e.forEach((t) => {
    const r = document.createElement("span");
    r.classList.add("ql-formats"), t.forEach((s) => {
      if (typeof s == "string")
        wo(r, s);
      else {
        const i = Object.keys(s)[0], a = s[i];
        Array.isArray(a) ? ab(r, i, a) : wo(r, i, a);
      }
    }), n.appendChild(r);
  });
}
function ab(n, e, t) {
  const r = document.createElement("select");
  r.classList.add(`ql-${e}`), t.forEach((s) => {
    const i = document.createElement("option");
    s !== !1 ? i.setAttribute("value", String(s)) : i.setAttribute("selected", "selected"), r.appendChild(i);
  }), n.appendChild(r);
}
ba.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const n = this.quill.getSelection();
      if (n != null)
        if (n.length === 0) {
          const e = this.quill.getFormat();
          Object.keys(e).forEach((t) => {
            this.quill.scroll.query(t, W.INLINE) != null && this.quill.format(t, !1, q.sources.USER);
          });
        } else
          this.quill.removeFormat(n.index, n.length, q.sources.USER);
    },
    direction(n) {
      const {
        align: e
      } = this.quill.getFormat();
      n === "rtl" && e == null ? this.quill.format("align", "right", q.sources.USER) : !n && e === "right" && this.quill.format("align", !1, q.sources.USER), this.quill.format("direction", n, q.sources.USER);
    },
    indent(n) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e), r = parseInt(t.indent || 0, 10);
      if (n === "+1" || n === "-1") {
        let s = n === "+1" ? 1 : -1;
        t.direction === "rtl" && (s *= -1), this.quill.format("indent", r + s, q.sources.USER);
      }
    },
    link(n) {
      n === !0 && (n = prompt("Enter link URL:")), this.quill.format("link", n, q.sources.USER);
    },
    list(n) {
      const e = this.quill.getSelection(), t = this.quill.getFormat(e);
      n === "check" ? t.list === "checked" || t.list === "unchecked" ? this.quill.format("list", !1, q.sources.USER) : this.quill.format("list", "unchecked", q.sources.USER) : this.quill.format("list", n, q.sources.USER);
    }
  }
};
const ob = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', lb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', cb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', ub = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', db = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', hb = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', fb = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', pb = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', Ao = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', mb = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', gb = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', bb = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', yb = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', vb = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', xb = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', wb = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Ab = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', Eb = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Tb = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', Nb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', Sb = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', _b = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Cb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', kb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', Lb = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', qb = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', Ob = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', Ib = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', Rb = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', $b = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', Db = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Bb = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', Fb = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', bn = {
  align: {
    "": ob,
    center: lb,
    right: cb,
    justify: ub
  },
  background: db,
  blockquote: hb,
  bold: fb,
  clean: pb,
  code: Ao,
  "code-block": Ao,
  color: mb,
  direction: {
    "": gb,
    rtl: bb
  },
  formula: yb,
  header: {
    1: vb,
    2: xb,
    3: wb,
    4: Ab,
    5: Eb,
    6: Tb
  },
  italic: Nb,
  image: Sb,
  indent: {
    "+1": _b,
    "-1": Cb
  },
  link: kb,
  list: {
    bullet: Lb,
    check: qb,
    ordered: Ob
  },
  script: {
    sub: Ib,
    super: Rb
  },
  strike: $b,
  table: Db,
  underline: Bb,
  video: Fb
}, Mb = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let Eo = 0;
function To(n, e) {
  n.setAttribute(e, `${n.getAttribute(e) !== "true"}`);
}
class Es {
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
    this.container.classList.toggle("ql-expanded"), To(this.label, "aria-expanded"), To(this.options, "aria-hidden");
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
    return e.classList.add("ql-picker-label"), e.innerHTML = Mb, e.tabIndex = "0", e.setAttribute("role", "button"), e.setAttribute("aria-expanded", "false"), this.container.appendChild(e), e;
  }
  buildOptions() {
    const e = document.createElement("span");
    e.classList.add("ql-picker-options"), e.setAttribute("aria-hidden", "true"), e.tabIndex = "-1", e.id = `ql-picker-options-${Eo}`, Eo += 1, this.label.setAttribute("aria-controls", e.id), this.options = e, Array.from(this.select.options).forEach((t) => {
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
class zl extends Es {
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
class Vl extends Es {
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
const Pb = (n) => {
  const {
    overflowY: e
  } = getComputedStyle(n, null);
  return e !== "visible" && e !== "clip";
};
class Hl {
  constructor(e, t) {
    this.quill = e, this.boundsContainer = t || document.body, this.root = e.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, Pb(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
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
const jb = [!1, "center", "right", "justify"], Ub = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], zb = [!1, "serif", "monospace"], Vb = ["1", "2", "3", !1], Hb = ["small", !1, "large", "huge"];
class Tn extends Br {
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
      if (s.classList.contains("ql-align") && (s.querySelector("option") == null && tn(s, jb), typeof t.align == "object"))
        return new Vl(s, t.align);
      if (s.classList.contains("ql-background") || s.classList.contains("ql-color")) {
        const i = s.classList.contains("ql-background") ? "background" : "color";
        return s.querySelector("option") == null && tn(s, Ub, i === "background" ? "#ffffff" : "#000000"), new zl(s, t[i]);
      }
      return s.querySelector("option") == null && (s.classList.contains("ql-font") ? tn(s, zb) : s.classList.contains("ql-header") ? tn(s, Vb) : s.classList.contains("ql-size") && tn(s, Hb)), new Es(s);
    });
    const r = () => {
      this.pickers.forEach((s) => {
        s.update();
      });
    };
    this.quill.on(H.events.EDITOR_CHANGE, r);
  }
}
Tn.DEFAULTS = zt({}, Br.DEFAULTS, {
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
class Kl extends Hl {
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
        e = Kb(e);
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
function Kb(n) {
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
const Gb = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class Wb extends Kl {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(e, t) {
    super(e, t), this.quill.on(H.events.EDITOR_CHANGE, (r, s, i, a) => {
      if (r === H.events.SELECTION_CHANGE)
        if (s != null && s.length > 0 && a === H.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const l = this.quill.getLines(s.index, s.length);
          if (l.length === 1) {
            const c = this.quill.getBounds(s);
            c != null && this.position(c);
          } else {
            const c = l[l.length - 1], d = this.quill.getIndex(c), g = Math.min(c.length() - 1, s.index + s.length - d), m = this.quill.getBounds(new ir(d, g));
            m != null && this.position(m);
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
class Gl extends Tn {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Gb), super(e, t), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(e) {
    this.tooltip = new Wb(this.quill, this.options.bounds), e.container != null && (this.tooltip.root.appendChild(e.container), this.buildButtons(e.container.querySelectorAll("button"), bn), this.buildPickers(e.container.querySelectorAll("select"), bn));
  }
}
Gl.DEFAULTS = zt({}, Tn.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(n) {
          n ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, q.sources.USER);
        }
      }
    }
  }
});
const Zb = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class Yb extends Kl {
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
          const [s, i] = this.quill.scroll.descendant(cs, e.index);
          if (s != null) {
            this.linkRange = new ir(e.index - i, s.length());
            const a = cs.formats(s.domNode);
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
class Wl extends Tn {
  constructor(e, t) {
    t.modules.toolbar != null && t.modules.toolbar.container == null && (t.modules.toolbar.container = Zb), super(e, t), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(e) {
    e.container != null && (e.container.classList.add("ql-snow"), this.buildButtons(e.container.querySelectorAll("button"), bn), this.buildPickers(e.container.querySelectorAll("select"), bn), this.tooltip = new Yb(this.quill, this.options.bounds), e.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (t, r) => {
      e.handlers.link.call(e, !r.format.link);
    }));
  }
}
Wl.DEFAULTS = zt({}, Tn.DEFAULTS, {
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
            this.quill.format("link", !1, q.sources.USER);
        }
      }
    }
  }
});
q.register({
  "attributors/attribute/direction": ql,
  "attributors/class/align": Cl,
  "attributors/class/background": tg,
  "attributors/class/color": eg,
  "attributors/class/direction": Ol,
  "attributors/class/font": $l,
  "attributors/class/size": Bl,
  "attributors/style/align": kl,
  "attributors/style/background": ua,
  "attributors/style/color": ca,
  "attributors/style/direction": Il,
  "attributors/style/font": Dl,
  "attributors/style/size": Fl
}, !0);
q.register({
  "formats/align": Cl,
  "formats/direction": Ol,
  "formats/indent": Gg,
  "formats/background": ua,
  "formats/color": ca,
  "formats/font": $l,
  "formats/size": Bl,
  "formats/blockquote": Wg,
  "formats/code-block": ze,
  "formats/header": Zg,
  "formats/list": En,
  "formats/bold": ma,
  "formats/code": da,
  "formats/italic": Yg,
  "formats/link": cs,
  "formats/script": Xg,
  "formats/strike": Qg,
  "formats/underline": Jg,
  "formats/formula": eb,
  "formats/image": tb,
  "formats/video": rb,
  "modules/syntax": Ul,
  "modules/table": sb,
  "modules/toolbar": ba,
  "themes/bubble": Gl,
  "themes/snow": Wl,
  "ui/icons": bn,
  "ui/picker": Es,
  "ui/icon-picker": Vl,
  "ui/color-picker": zl,
  "ui/tooltip": Hl
}, !0);
const Xb = { class: "rounded-lg border border-slate-300 bg-white" }, Qb = /* @__PURE__ */ Ot({
  __name: "RichTextEditor",
  props: {
    modelValue: {},
    placeholder: { default: "Escribe aquí el contenido del blog..." },
    subirImagen: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const t = n, r = e, s = re(null);
    let i = null;
    yn(() => {
      s.value && (i = new q(s.value, {
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
    }), qo(() => {
      i = null;
    }), rr(
      () => t.modelValue,
      (c) => {
        i && i.root.innerHTML !== c && (i.root.innerHTML = c || "");
      }
    ), rr(
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
        const g = i?.getSelection(!0);
        if (g)
          try {
            if (t.disabled)
              return;
            let m = "";
            t.subirImagen ? m = await t.subirImagen(d) : m = await l(d), i?.insertEmbed(g.index, "image", m, "user");
          } catch (m) {
            console.error("No se pudo subir la imagen al editor:", m);
          }
      };
    }
    function l(c) {
      return new Promise((d, g) => {
        const m = new FileReader();
        m.onload = () => d(String(m.result)), m.onerror = () => g(new Error("No fue posible leer la imagen.")), m.readAsDataURL(c);
      });
    }
    return (c, d) => (D(), M("div", Xb, [
      x("div", {
        ref_key: "root",
        ref: s,
        class: "min-h-[260px]"
      }, null, 512)
    ]));
  }
}), Jb = { class: "space-y-2" }, e0 = {
  key: 0,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, t0 = { class: "block text-xs font-semibold uppercase tracking-wide text-slate-500" }, r0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, n0 = {
  key: 0,
  class: "space-y-2"
}, s0 = ["value", "disabled", "onChange"], i0 = ["value", "disabled", "onInput"], a0 = ["disabled", "onClick"], o0 = ["disabled"], l0 = {
  key: 1,
  class: "space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3"
}, c0 = { class: "flex items-center justify-between" }, u0 = { class: "text-xs font-semibold uppercase tracking-wide text-slate-500" }, d0 = ["disabled", "onClick"], h0 = ["disabled"], f0 = {
  key: 2,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, p0 = ["checked", "disabled"], m0 = ["value", "placeholder", "disabled"], g0 = ["value", "disabled"], b0 = ["value"], y0 = ["value", "placeholder", "disabled"], v0 = /* @__PURE__ */ Ot({
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
    ), i = Oe(() => t.schema.itemSchema && typeof t.schema.itemSchema == "object" ? t.schema.itemSchema : { type: "text" }), a = Oe(() => d(t.modelValue)), l = Oe(() => Array.isArray(t.modelValue) ? t.modelValue : []), c = Oe(() => Object.entries(a.value));
    function d(z) {
      return z && typeof z == "object" && !Array.isArray(z) ? z : {};
    }
    function g(z) {
      return z.type === "array" ? [] : z.type === "map" ? {} : z.type === "boolean" ? !1 : "";
    }
    function m(z, V) {
      r("update:modelValue", {
        ...a.value,
        [z]: V
      });
    }
    function h() {
      r("update:modelValue", [...l.value, g(i.value)]);
    }
    function b(z) {
      const V = [...l.value];
      V.splice(z, 1), r("update:modelValue", V);
    }
    function w(z, V) {
      const ae = [...l.value];
      ae[z] = V, r("update:modelValue", ae);
    }
    function E(z) {
      r("update:modelValue", z);
    }
    function k(z) {
      r("update:modelValue", z);
    }
    function L() {
      const z = a.value;
      let V = 1, ae = `campo_${V}`;
      for (; ae in z; )
        V += 1, ae = `campo_${V}`;
      r("update:modelValue", {
        ...z,
        [ae]: ""
      });
    }
    function F(z) {
      const V = { ...a.value };
      delete V[z], r("update:modelValue", V);
    }
    function U(z, V) {
      const ae = V.trim();
      if (!ae || ae === z)
        return;
      const Q = { ...a.value }, p = Q[z];
      delete Q[z], Q[ae] = p, r("update:modelValue", Q);
    }
    function K(z, V) {
      const ae = { ...a.value };
      ae[z] = le(V), r("update:modelValue", ae);
    }
    function Z(z) {
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
    function le(z) {
      const V = z.trim();
      if (!V)
        return "";
      if (V.startsWith("{") && V.endsWith("}") || V.startsWith("[") && V.endsWith("]"))
        try {
          return JSON.parse(V);
        } catch {
          return z;
        }
      return z;
    }
    return (z, V) => {
      const ae = Oo("CmsNestedValueEditor", !0);
      return D(), M("div", Jb, [
        n.schema.type === "map" ? (D(), M("section", e0, [
          (D(!0), M(Fe, null, Me(s.value, (Q) => (D(), M("article", {
            key: Q.key,
            class: "space-y-1 rounded-md border border-slate-200 bg-white p-3"
          }, [
            x("label", t0, te(Q.label), 1),
            Q.helpText ? (D(), M("p", r0, te(Q.helpText), 1)) : oe("", !0),
            Ct(ae, {
              schema: Q,
              "model-value": a.value[Q.key],
              disabled: n.disabled,
              "onUpdate:modelValue": (p) => m(Q.key, p)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          s.value.length ? oe("", !0) : (D(), M("div", n0, [
            (D(!0), M(Fe, null, Me(c.value, ([Q, p]) => (D(), M("article", {
              key: Q,
              class: "grid gap-2 rounded-md border border-slate-200 bg-white p-3 md:grid-cols-[180px,1fr,auto]"
            }, [
              x("input", {
                value: Q,
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onChange: (v) => U(Q, v.target.value)
              }, null, 40, s0),
              x("input", {
                value: Z(p),
                type: "text",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs outline-none focus:border-slate-500 disabled:bg-slate-100",
                disabled: n.disabled,
                onInput: (v) => K(Q, v.target.value)
              }, null, 40, i0),
              x("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (v) => F(Q)
              }, " Quitar ", 8, a0)
            ]))), 128)),
            x("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
              disabled: n.disabled,
              onClick: L
            }, " Agregar propiedad ", 8, o0),
            V[4] || (V[4] = x("p", { class: "text-xs text-slate-500" }, " Puedes escribir JSON en el valor para guardar objetos o arreglos. ", -1))
          ]))
        ])) : n.schema.type === "array" ? (D(), M("section", l0, [
          (D(!0), M(Fe, null, Me(l.value, (Q, p) => (D(), M("article", {
            key: p,
            class: "space-y-2 rounded-md border border-slate-200 bg-white p-3"
          }, [
            x("div", c0, [
              x("p", u0, "Item " + te(p + 1), 1),
              x("button", {
                type: "button",
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50",
                disabled: n.disabled,
                onClick: (v) => b(p)
              }, " Quitar ", 8, d0)
            ]),
            Ct(ae, {
              schema: i.value,
              "model-value": Q,
              disabled: n.disabled,
              "onUpdate:modelValue": (v) => w(p, v)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])
          ]))), 128)),
          x("button", {
            type: "button",
            class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-60",
            disabled: n.disabled,
            onClick: h
          }, " Agregar item ", 8, h0)
        ])) : n.schema.type === "boolean" ? (D(), M("label", f0, [
          x("input", {
            type: "checkbox",
            checked: !!n.modelValue,
            disabled: n.disabled,
            onChange: V[0] || (V[0] = (Q) => k(Q.target.checked))
          }, null, 40, p0),
          V[5] || (V[5] = Ge(" Activo ", -1))
        ])) : n.schema.type === "textarea" || n.schema.type === "richtext" ? (D(), M("textarea", {
          key: 3,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          rows: "4",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: V[1] || (V[1] = (Q) => E(Q.target.value))
        }, null, 40, m0)) : n.schema.type === "select" ? (D(), M("select", {
          key: 4,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onChange: V[2] || (V[2] = (Q) => E(Q.target.value))
        }, [
          V[6] || (V[6] = x("option", { value: "" }, "Selecciona una opción", -1)),
          (D(!0), M(Fe, null, Me(n.schema.options || [], (Q) => (D(), M("option", {
            key: Q,
            value: Q
          }, te(Q), 9, b0))), 128))
        ], 40, g0)) : (D(), M("input", {
          key: 5,
          value: typeof n.modelValue == "string" ? n.modelValue : "",
          type: "text",
          placeholder: n.schema.placeholder || "",
          disabled: n.disabled,
          class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
          onInput: V[3] || (V[3] = (Q) => E(Q.target.value))
        }, null, 40, y0))
      ]);
    };
  }
}), x0 = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};
async function w0(n, e = {}) {
  if (!n.type.startsWith("image/"))
    return n;
  const t = { ...x0, ...e }, r = await E0(n), { width: s, height: i } = A0(r.width, r.height, t.maxWidth, t.maxHeight), a = document.createElement("canvas");
  a.width = s, a.height = i;
  const l = a.getContext("2d");
  if (!l)
    return n;
  l.drawImage(r, 0, 0, s, i);
  let c = t.quality, d = await No(a, n.type || "image/jpeg", c);
  const g = t.targetSizeKb * 1024;
  for (; d.size > g && c > 0.45; )
    c -= 0.08, d = await No(a, n.type || "image/jpeg", c);
  return d;
}
function A0(n, e, t, r) {
  let s = n, i = e;
  return s > t && (i = Math.round(i * t / s), s = t), i > r && (s = Math.round(s * r / i), i = r), { width: s, height: i };
}
function No(n, e, t) {
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
function E0(n) {
  return new Promise((e, t) => {
    const r = new Image(), s = URL.createObjectURL(n);
    r.onload = () => {
      URL.revokeObjectURL(s), e(r);
    }, r.onerror = () => {
      URL.revokeObjectURL(s), t(new Error("No fue posible leer la imagen."));
    }, r.src = s;
  });
}
async function T0(n, e, t) {
  const { storage: r } = xe(), s = oc(r, n);
  return await lc(s, e, t), cc(s);
}
async function So(n, e, t = {}) {
  const r = await w0(e, {
    maxWidth: t.maxWidth,
    maxHeight: t.maxHeight,
    quality: t.quality,
    targetSizeKb: t.targetSizeKb
  });
  return T0(n, r, t.metadata);
}
async function N0(n, e) {
  const { firestore: t } = xe();
  return (await Io(Ht(t, n.collectionName), {
    ...e,
    createdAt: Ce(),
    updatedAt: Ce()
  })).id;
}
async function _o(n, e = 100) {
  const { firestore: t } = xe();
  try {
    const r = fs(
      Ht(t, n.collectionName),
      Hi("createdAt", "desc"),
      Gi(e)
    );
    return (await Or(r)).docs.map((i) => ({
      id: i.id,
      data: i.data()
    }));
  } catch {
    return (await Or(Ht(t, n.collectionName))).docs.map((s) => ({
      id: s.id,
      data: s.data()
    }));
  }
}
async function S0(n, e) {
  const { firestore: t } = xe();
  await Ki(Ve(t, n.collectionName, e));
}
const Zl = "main", _0 = "schema";
async function C0(n, e, t = Zl) {
  const { firestore: r } = xe(), s = n.dictionaryDocumentId || t, i = Yl(n), a = Ve(r, n.collectionName, s), l = await kt(a), c = {
    updatedAt: Ce(),
    createdAt: l.exists() ? l.data().createdAt : Ce()
  };
  if (i)
    c[i] = e;
  else
    for (const [d, g] of Object.entries(e))
      c[d] = g;
  return await Kt(
    a,
    c,
    { merge: !0 }
  ), s;
}
async function k0(n, e = Zl) {
  const { firestore: t } = xe(), r = n.dictionaryDocumentId || e, s = await kt(Ve(t, n.collectionName, r));
  if (!s.exists())
    return null;
  const i = s.data(), a = Yl(n), l = a ? i[a] : null;
  return l && typeof l == "object" && !Array.isArray(l) ? {
    id: s.id,
    data: l
  } : {
    id: s.id,
    data: i
  };
}
function Yl(n) {
  return n.storageType !== "dictionary" ? "" : typeof n.dictionaryRootKey == "string" && n.dictionaryRootKey.trim() ? n.dictionaryRootKey.trim() : _0;
}
function Xl(n) {
  return `${n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}-${Date.now().toString().slice(-6)}`;
}
const L0 = { class: "space-y-4" }, q0 = { class: "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600" }, O0 = {
  key: 0,
  class: "mt-2 text-xs text-slate-500"
}, I0 = {
  key: 1,
  class: "mt-2 text-xs text-rose-700"
}, R0 = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, $0 = { class: "text-xl font-black text-slate-900" }, D0 = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, B0 = { class: "block text-sm font-semibold text-slate-700" }, F0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, M0 = ["value", "placeholder", "disabled", "onInput"], P0 = ["value", "placeholder", "disabled", "onInput"], j0 = ["value", "disabled", "onChange"], U0 = ["value"], z0 = {
  key: 4,
  class: "space-y-2"
}, V0 = ["value", "disabled", "onChange"], H0 = ["value"], K0 = {
  key: 0,
  class: "text-xs text-slate-500"
}, G0 = {
  key: 5,
  class: "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
}, W0 = ["checked", "disabled", "onChange"], Z0 = {
  key: 6,
  class: "space-y-2"
}, Y0 = ["disabled", "onChange"], X0 = {
  key: 0,
  class: "text-xs text-slate-500 break-all"
}, Q0 = ["src"], J0 = ["disabled", "onClick"], e1 = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, t1 = {
  key: 1,
  class: "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, r1 = ["disabled"], n1 = { class: "mt-6 border-t border-slate-200 pt-5" }, s1 = {
  key: 0,
  class: "mt-3 text-sm text-slate-500"
}, i1 = {
  key: 1,
  class: "mt-3 text-sm text-slate-500"
}, a1 = {
  key: 2,
  class: "mt-3 space-y-2"
}, o1 = { class: "text-sm font-semibold text-slate-900" }, l1 = { class: "text-xs text-slate-500" }, c1 = ["disabled", "onClick"], u1 = /* @__PURE__ */ Ot({
  __name: "AdminBlogPage",
  setup(n) {
    const e = ps(), t = vn(), r = re([]), s = re(""), i = re(!1);
    re(!1), re("");
    const a = re(""), l = re({
      id: "",
      title: "",
      description: "",
      storageType: "document",
      collectionName: "",
      slugFromField: "",
      previewField: ""
    }), c = re([]), d = re({}), g = re({}), m = re([]), h = re(!1), b = re(!1), w = re(""), E = re(""), k = re({}), L = Oe(() => Mt.value === "admin" || Mt.value === "writer" || Mt.value === "manager");
    Oe(() => Mt.value === "admin" || Mt.value === "manager");
    const F = Oe(() => r.value.find((N) => N.id === s.value) ?? null);
    yn(async () => {
      await U();
    }), rr(
      F,
      async (N) => {
        if (!N) {
          d.value = {}, g.value = {}, m.value = [], k.value = {};
          return;
        }
        le(N), Q(N), await p(N), await v(N);
      },
      { immediate: !0 }
    ), rr(
      () => e.query.schema,
      (N) => {
        typeof N == "string" && r.value.some((S) => S.id === N) && s.value !== N && (s.value = N);
      }
    );
    async function U() {
      i.value = !0, a.value = "";
      try {
        await K(), r.value.length || (await Po(), await K());
      } catch {
        a.value = "No se pudieron cargar los tipos de contenido.";
      } finally {
        i.value = !1;
      }
    }
    async function K() {
      const N = await ts();
      if (r.value = N, !N.length) {
        s.value = "";
        return;
      }
      const S = typeof e.query.schema == "string" ? e.query.schema : "";
      if (S && N.some((ue) => ue.id === S)) {
        s.value = S;
        return;
      }
      if (N.some((ue) => ue.id === s.value))
        return;
      const P = N.find((ue) => ue.id === Mo.id);
      s.value = P?.id ?? N[0].id, await z(s.value);
    }
    function Z(N) {
      return {
        key: N.key,
        label: N.label,
        type: N.type,
        required: !!N.required,
        placeholder: N.placeholder ?? "",
        helpText: N.helpText ?? "",
        optionsText: Array.isArray(N.options) ? N.options.join(", ") : "",
        structureJson: V(N)
      };
    }
    function le(N) {
      l.value = {
        id: N.id,
        title: N.title,
        description: N.description ?? "",
        storageType: N.storageType,
        collectionName: N.collectionName,
        slugFromField: N.slugFromField ?? "",
        previewField: N.previewField ?? ""
      }, c.value = N.fields.map((S) => Z(S));
    }
    async function z(N) {
      N && e.query.schema !== N && await t.replace({
        query: {
          ...e.query,
          schema: N
        }
      });
    }
    function V(N) {
      return N.type === "array" ? JSON.stringify(
        {
          item: N.itemSchema ?? { type: "text" }
        },
        null,
        2
      ) : N.type === "map" ? JSON.stringify(
        {
          fields: N.mapFields ?? []
        },
        null,
        2
      ) : "";
    }
    function ae(N) {
      return !!N && typeof N == "object" && !Array.isArray(N);
    }
    function Q(N) {
      const S = {}, $ = {};
      for (const P of N.fields)
        P.type === "boolean" ? S[P.key] = !1 : P.type === "array" ? S[P.key] = [] : P.type === "map" ? S[P.key] = {} : (P.type, S[P.key] = ""), P.type === "image" && ($[P.key] = null);
      d.value = S, g.value = $, w.value = "", E.value = "";
    }
    async function p(N) {
      h.value = !0;
      try {
        if (N.storageType === "dictionary") {
          const S = await k0(N);
          m.value = S ? [S] : [], S && B(N, S);
          return;
        }
        m.value = await _o(N, 100);
      } finally {
        h.value = !1;
      }
    }
    async function v(N) {
      const S = N.fields.filter((P) => P.type === "document");
      if (!S.length) {
        k.value = {};
        return;
      }
      const $ = {};
      await Promise.all(
        S.map(async (P) => {
          const ue = typeof P.documentSchemaId == "string" ? P.documentSchemaId.trim() : "";
          if (!ue) {
            $[P.key] = { options: [], byId: {} };
            return;
          }
          const Se = r.value.find((Pe) => Pe.id === ue);
          if (!Se || Se.storageType !== "document") {
            $[P.key] = { options: [], byId: {} };
            return;
          }
          const fr = typeof P.documentLabelField == "string" && P.documentLabelField.trim() || Se.previewField || Se.slugFromField || Se.fields[0]?.key || "", Ze = await _o(Se, 200), xt = {}, Fr = Ze.map((Pe) => (xt[Pe.id] = Pe, {
            id: Pe.id,
            label: f(Pe, fr),
            hint: O(Pe)
          }));
          $[P.key] = { options: Fr, byId: xt };
        })
      ), k.value = $;
    }
    function f(N, S) {
      const $ = S ? N.data[S] : null;
      return typeof $ == "string" && $.trim() ? $.trim() : N.id;
    }
    function O(N) {
      const S = N.data.telefono;
      return typeof S == "string" && S.trim() ? `Tel: ${S.trim()}` : "";
    }
    function B(N, S) {
      const $ = { ...d.value };
      for (const P of N.fields) {
        const ue = S.data[P.key];
        P.type === "boolean" ? $[P.key] = !!ue : P.type === "array" || P.type === "map" ? $[P.key] = A(P, ue) : P.type === "document" ? $[P.key] = typeof ue == "string" ? ue : "" : typeof ue == "string" ? $[P.key] = ue : $[P.key] = "";
      }
      d.value = $;
    }
    async function _() {
      const N = F.value;
      if (N) {
        if (w.value = "", E.value = "", !L.value) {
          E.value = "Tu rol no tiene permisos para crear contenido.";
          return;
        }
        b.value = !0;
        try {
          const S = {};
          for (const $ of N.fields)
            S[$.key] = await R(N, $), T($, S[$.key]);
          if (N.slugFromField) {
            const $ = S[N.slugFromField];
            typeof $ == "string" && $.trim() && (S.slug = Xl($));
          }
          N.storageType === "dictionary" ? (await C0(N, S), w.value = "Registro de diccionario actualizado.") : (await N0(N, S), w.value = "Registro creado correctamente.", Q(N)), await p(N);
        } catch (S) {
          E.value = S instanceof Error ? S.message : "No se pudo guardar el registro.";
        } finally {
          b.value = !1;
        }
      }
    }
    async function R(N, S) {
      if (S.type === "boolean")
        return !!d.value[S.key];
      if (S.type === "image") {
        const $ = g.value[S.key];
        if (!$)
          return ee(S.key);
        const P = $t($.name), ue = await So(
          `${N.collectionName}/${S.key}/${Date.now()}-${P}`,
          $,
          { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
        );
        return d.value[S.key] = ue, g.value[S.key] = null, ue;
      }
      return S.type === "array" || S.type === "map" ? A(S, d.value[S.key]) : (S.type === "document", ee(S.key));
    }
    function T(N, S) {
      if (N.required && N.type !== "boolean") {
        if (N.type === "array") {
          if (!Array.isArray(S) || !S.length)
            throw new Error(`El campo "${N.label}" es obligatorio y debe tener al menos 1 elemento.`);
          return;
        }
        if (N.type === "map") {
          if (!ae(S) || Object.keys(S).length === 0)
            throw new Error(`El campo "${N.label}" es obligatorio y debe tener al menos 1 propiedad.`);
          return;
        }
        if (typeof S != "string" || !S.trim())
          throw new Error(`El campo "${N.label}" es obligatorio.`);
      }
    }
    function A(N, S) {
      if (typeof S == "string") {
        const P = S.trim();
        if (!(P.startsWith("{") || P.startsWith("[")))
          S = N.type === "array" ? [] : {};
        else
          try {
            S = JSON.parse(P);
          } catch {
            S = N.type === "array" ? [] : {};
          }
      }
      if (N.type === "array") {
        const P = Array.isArray(S) ? S : [];
        return N.itemSchema ? P.map(
          (ue, Se) => j(N.itemSchema, ue, `${N.label}[${Se}]`)
        ) : P;
      }
      const $ = ae(S) ? S : {};
      return Array.isArray(N.mapFields) && N.mapFields.length > 0 ? I(N.mapFields, $, N.label) : $;
    }
    function I(N, S, $) {
      const P = {};
      for (const ue of N) {
        const Se = ue.key;
        if (!(Se in S)) {
          if (ue.required)
            throw new Error(`Falta la propiedad requerida "${$}.${Se}".`);
          continue;
        }
        P[Se] = j(ue, S[Se], `${$}.${Se}`);
      }
      return P;
    }
    function j(N, S, $) {
      if (N.type === "array") {
        if (!Array.isArray(S))
          throw new Error(`"${$}" debe ser un arreglo.`);
        return N.itemSchema ? S.map((P, ue) => j(N.itemSchema, P, `${$}[${ue}]`)) : S;
      }
      if (N.type === "map") {
        if (!ae(S))
          throw new Error(`"${$}" debe ser un objeto.`);
        return !Array.isArray(N.mapFields) || N.mapFields.length === 0 ? S : I(N.mapFields, S, $);
      }
      if (N.type === "boolean") {
        if (typeof S != "boolean")
          throw new Error(`"${$}" debe ser boolean.`);
        return S;
      }
      if (N.type === "document") {
        if (typeof S != "string")
          throw new Error(`"${$}" debe ser string (id de documento).`);
        return S;
      }
      if (typeof S != "string")
        throw new Error(`"${$}" debe ser string.`);
      if (N.type === "select" && Array.isArray(N.options) && N.options.length > 0 && S && !N.options.includes(S))
        throw new Error(`"${$}" no coincide con las opciones del select.`);
      return S;
    }
    async function X(N) {
      const S = F.value;
      if (!(!S || S.storageType !== "document")) {
        if (!L.value) {
          E.value = "Tu rol no tiene permisos para eliminar contenido.";
          return;
        }
        window.confirm("¿Seguro que quieres eliminar este registro?") && (await S0(S, N), await p(S));
      }
    }
    async function se(N) {
      const S = F.value;
      if (!S)
        throw new Error("No hay schema seleccionado.");
      const $ = $t(N.name);
      return So(
        `${S.collectionName}/editor/${Date.now()}-${$}`,
        N,
        { maxWidth: 1600, maxHeight: 1600, targetSizeKb: 700, quality: 0.8 }
      );
    }
    function ee(N) {
      const S = d.value[N];
      return typeof S == "string" ? S : "";
    }
    function Y(N, S) {
      d.value[N] = S;
    }
    function ye(N) {
      return k.value[N.key]?.options ?? [];
    }
    function ve(N) {
      const S = ee(N.key);
      return S ? ye(N).find((P) => P.id === S)?.hint ?? "" : "";
    }
    function ie(N) {
      return d.value[N];
    }
    function he(N, S) {
      d.value[N] = S;
    }
    function ce(N) {
      return !!d.value[N];
    }
    function fe(N, S) {
      d.value[N] = S;
    }
    function me(N, S) {
      const $ = S.target;
      g.value[N] = $.files?.[0] ?? null;
    }
    function ge(N) {
      d.value[N] = "", g.value[N] = null;
    }
    function Ee(N, S) {
      const $ = S.previewField || S.slugFromField || S.fields[0]?.key;
      if (!$)
        return N.id;
      const P = N.data[$];
      return typeof P == "string" && P.trim() ? P : typeof P == "boolean" ? P ? "true" : "false" : Array.isArray(P) ? `[array:${P.length}]` : ae(P) ? "[map]" : N.id;
    }
    function Ne(N) {
      const S = N.data.slug;
      return typeof S == "string" && S.trim() ? `/blog/${S}` : "";
    }
    function $t(N) {
      return N.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
    }
    return (N, S) => (D(), M("section", L0, [
      x("article", q0, [
        S[0] || (S[0] = Ge(" Contenido muestra formularios y registros. Los esquemas se muestran en la vista ", -1)),
        S[1] || (S[1] = x("strong", null, "Esquemas", -1)),
        S[2] || (S[2] = Ge(". ", -1)),
        i.value ? (D(), M("p", O0, "Cargando formularios...")) : a.value ? (D(), M("p", I0, te(a.value), 1)) : oe("", !0)
      ]),
      x("article", R0, [
        x("h3", $0, te(F.value ? `Formulario y registros: ${F.value.title}` : "Formulario y registros"), 1),
        S[8] || (S[8] = x("p", { class: "mt-1 text-sm text-slate-600" }, "El formulario se genera desde el esquema y lo completa el usuario final.", -1)),
        L.value ? oe("", !0) : (D(), M("p", D0, " No tienes permisos para crear o eliminar contenido. Roles permitidos: admin, writer, manager. ")),
        F.value ? (D(), M("form", {
          key: 1,
          class: "mt-5 space-y-4",
          onSubmit: Vi(_, ["prevent"])
        }, [
          (D(!0), M(Fe, null, Me(F.value.fields, ($) => (D(), M("div", {
            key: $.key,
            class: "space-y-1"
          }, [
            x("label", B0, te($.label), 1),
            $.helpText ? (D(), M("p", F0, te($.helpText), 1)) : oe("", !0),
            $.type === "text" ? (D(), M("input", {
              key: 1,
              value: ee($.key),
              type: "text",
              placeholder: $.placeholder || "",
              disabled: !L.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: (P) => Y($.key, P.target.value)
            }, null, 40, M0)) : $.type === "textarea" ? (D(), M("textarea", {
              key: 2,
              value: ee($.key),
              rows: "4",
              placeholder: $.placeholder || "",
              disabled: !L.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: (P) => Y($.key, P.target.value)
            }, null, 40, P0)) : $.type === "select" ? (D(), M("select", {
              key: 3,
              value: ee($.key),
              disabled: !L.value,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: (P) => Y($.key, P.target.value)
            }, [
              S[3] || (S[3] = x("option", { value: "" }, "Selecciona una opción", -1)),
              (D(!0), M(Fe, null, Me($.options || [], (P) => (D(), M("option", {
                key: P,
                value: P
              }, te(P), 9, U0))), 128))
            ], 40, j0)) : $.type === "document" ? (D(), M("div", z0, [
              x("select", {
                value: ee($.key),
                disabled: !L.value,
                class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
                onChange: (P) => Y($.key, P.target.value)
              }, [
                S[4] || (S[4] = x("option", { value: "" }, "Selecciona un documento", -1)),
                (D(!0), M(Fe, null, Me(ye($), (P) => (D(), M("option", {
                  key: P.id,
                  value: P.id
                }, te(P.label), 9, H0))), 128))
              ], 40, V0),
              ve($) ? (D(), M("p", K0, te(ve($)), 1)) : oe("", !0)
            ])) : $.type === "boolean" ? (D(), M("label", G0, [
              x("input", {
                checked: ce($.key),
                type: "checkbox",
                disabled: !L.value,
                onChange: (P) => fe($.key, P.target.checked)
              }, null, 40, W0),
              S[5] || (S[5] = Ge(" Activo ", -1))
            ])) : $.type === "image" ? (D(), M("div", Z0, [
              x("input", {
                type: "file",
                accept: "image/*",
                disabled: !L.value,
                class: "block w-full text-sm text-slate-600 disabled:opacity-60",
                onChange: (P) => me($.key, P)
              }, null, 40, Y0),
              ee($.key) ? (D(), M("p", X0, " URL actual: " + te(ee($.key)), 1)) : oe("", !0),
              ee($.key) ? (D(), M("img", {
                key: 1,
                src: ee($.key),
                alt: "Vista previa",
                class: "max-h-32 rounded-md border border-slate-200 object-cover"
              }, null, 8, Q0)) : oe("", !0),
              ee($.key) ? (D(), M("button", {
                key: 2,
                type: "button",
                class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50",
                disabled: !L.value,
                onClick: (P) => ge($.key)
              }, " Quitar URL ", 8, J0)) : oe("", !0)
            ])) : $.type === "array" || $.type === "map" ? (D(), Ut(v0, {
              key: 7,
              schema: $,
              "model-value": ie($.key),
              disabled: !L.value,
              "onUpdate:modelValue": (P) => he($.key, P)
            }, null, 8, ["schema", "model-value", "disabled", "onUpdate:modelValue"])) : $.type === "richtext" ? (D(), Ut(Qb, {
              key: 8,
              "model-value": ee($.key),
              "subir-imagen": se,
              disabled: !L.value,
              "onUpdate:modelValue": (P) => Y($.key, P)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue"])) : oe("", !0)
          ]))), 128)),
          E.value ? (D(), M("p", e1, te(E.value), 1)) : oe("", !0),
          w.value ? (D(), M("p", t1, te(w.value), 1)) : oe("", !0),
          x("button", {
            type: "submit",
            disabled: b.value || !L.value,
            class: "rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          }, te(b.value ? "Guardando..." : F.value.storageType === "dictionary" ? "Guardar diccionario" : "Crear documento"), 9, r1)
        ], 32)) : oe("", !0),
        x("div", n1, [
          S[7] || (S[7] = x("h4", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Registros guardados", -1)),
          h.value ? (D(), M("p", s1, "Cargando registros...")) : m.value.length ? (D(), M("ul", a1, [
            (D(!0), M(Fe, null, Me(m.value, ($) => (D(), M("li", {
              key: $.id,
              class: "flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2"
            }, [
              x("div", null, [
                x("p", o1, te(F.value ? Ee($, F.value) : $.id), 1),
                x("p", l1, "ID: " + te($.id), 1),
                F.value?.id === "blog" && Ne($) ? (D(), Ut(qe(_t), {
                  key: 0,
                  to: Ne($),
                  class: "text-xs text-sky-700 hover:text-sky-800"
                }, {
                  default: St(() => [...S[6] || (S[6] = [
                    Ge(" Ver público ", -1)
                  ])]),
                  _: 1
                }, 8, ["to"])) : oe("", !0)
              ]),
              F.value?.storageType === "document" ? (D(), M("button", {
                key: 0,
                type: "button",
                disabled: !L.value,
                class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50",
                onClick: (P) => X($.id)
              }, " Eliminar ", 8, c1)) : oe("", !0)
            ]))), 128))
          ])) : (D(), M("p", i1, "No hay registros todavía."))
        ])
      ])
    ]));
  }
}), d1 = { class: "rounded-xl border border-slate-200 bg-slate-50 p-3" }, h1 = { class: "mb-3 flex items-start justify-between gap-2" }, f1 = {
  key: 0,
  class: "text-xs font-bold uppercase tracking-wide text-slate-600"
}, p1 = ["disabled"], m1 = {
  key: 0,
  class: "grid gap-2 md:grid-cols-2"
}, g1 = { class: "space-y-1" }, b1 = ["value", "disabled"], y1 = { class: "space-y-1" }, v1 = ["value", "disabled"], x1 = { class: "mt-2 grid gap-2 md:grid-cols-3" }, w1 = { class: "space-y-1" }, A1 = ["value", "disabled"], E1 = ["value"], T1 = { class: "space-y-1" }, N1 = ["value", "disabled"], S1 = { class: "space-y-1" }, _1 = { class: "flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700" }, C1 = ["checked", "disabled"], k1 = { class: "mt-2 block space-y-1" }, L1 = ["value", "disabled"], q1 = {
  key: 1,
  class: "mt-2 block space-y-1"
}, O1 = ["value", "disabled"], I1 = {
  key: 2,
  class: "mt-2 grid gap-2 md:grid-cols-2"
}, R1 = { class: "space-y-1" }, $1 = ["value", "disabled"], D1 = { class: "space-y-1" }, B1 = ["value", "disabled"], F1 = {
  key: 3,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, M1 = { class: "mb-2 flex items-center justify-between" }, P1 = ["disabled"], j1 = { class: "space-y-2" }, U1 = {
  key: 4,
  class: "mt-3 rounded-lg border border-slate-200 bg-white p-2"
}, z1 = /* @__PURE__ */ Ot({
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
    function a(T) {
      return T === "textarea" || T === "richtext" || T === "image" || T === "select" || T === "document" || T === "boolean" || T === "array" || T === "map" ? T : "text";
    }
    function l(T) {
      return typeof T == "string" ? T : "";
    }
    function c(T) {
      return Array.isArray(T) ? T.map((A) => String(A).trim()).filter(Boolean) : [];
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
    function g() {
      return {
        ...d(),
        key: "",
        label: ""
      };
    }
    function m(T) {
      const A = i(T) ? T : {}, I = a(A.type), j = {
        type: I,
        required: !!A.required,
        placeholder: l(A.placeholder),
        helpText: l(A.helpText),
        options: I === "select" ? c(A.options) : [],
        documentSchemaId: I === "document" ? l(A.documentSchemaId) : "",
        documentLabelField: I === "document" ? l(A.documentLabelField) : ""
      };
      return I === "map" && (j.mapFields = Array.isArray(A.mapFields) ? A.mapFields.map((X) => h(X)) : []), I === "array" && (j.itemSchema = m(A.itemSchema)), j;
    }
    function h(T) {
      const A = i(T) ? T : {};
      return {
        ...m(A),
        key: l(A.key),
        label: l(A.label)
      };
    }
    function b() {
      const T = m(r.modelValue);
      if (r.withIdentity) {
        const A = h(r.modelValue);
        T.key = A.key, T.label = A.label;
      }
      return T;
    }
    function w(T, A) {
      const I = m(T), j = {
        type: I.type,
        required: !!I.required,
        placeholder: l(I.placeholder),
        helpText: l(I.helpText),
        options: I.type === "select" ? c(I.options) : [],
        documentSchemaId: I.type === "document" ? l(I.documentSchemaId) : "",
        documentLabelField: I.type === "document" ? l(I.documentLabelField) : ""
      };
      if (I.type === "map" && (j.mapFields = (I.mapFields ?? []).map((X) => h(X))), I.type === "array" && (j.itemSchema = w(I.itemSchema ?? d(), !1)), A) {
        const X = h(T);
        j.key = X.key, j.label = X.label;
      }
      return j;
    }
    function E(T) {
      s("update:modelValue", w(T, r.withIdentity));
    }
    function k(T, A) {
      const I = b();
      I[T] = A, E(I);
    }
    function L(T) {
      const A = b(), I = a(T);
      A.type = I, I !== "select" && (A.options = []), I !== "document" && (A.documentSchemaId = "", A.documentLabelField = ""), I === "map" ? (A.mapFields = Array.isArray(A.mapFields) ? A.mapFields.map((j) => h(j)) : [], delete A.itemSchema) : I === "array" ? (A.itemSchema = m(A.itemSchema ?? d()), delete A.mapFields) : (delete A.mapFields, delete A.itemSchema), E(A);
    }
    function F(T) {
      const A = b();
      A.required = T, E(A);
    }
    function U(T) {
      const A = b();
      A.placeholder = T, E(A);
    }
    function K(T) {
      const A = b();
      A.helpText = T, E(A);
    }
    function Z() {
      return (b().options ?? []).join(", ");
    }
    function le(T) {
      const A = b();
      A.options = T.split(",").map((I) => I.trim()).filter(Boolean), E(A);
    }
    function z() {
      return b().documentSchemaId ?? "";
    }
    function V() {
      return b().documentLabelField ?? "";
    }
    function ae(T) {
      const A = b();
      A.documentSchemaId = T, E(A);
    }
    function Q(T) {
      const A = b();
      A.documentLabelField = T, E(A);
    }
    function p() {
      const T = b();
      return T.type !== "map" || !Array.isArray(T.mapFields) ? [] : T.mapFields.map((A) => h(A));
    }
    function v() {
      const T = b();
      T.type = "map", T.mapFields = [...p(), g()], E(T);
    }
    function f(T, A) {
      const I = b(), j = p();
      j[T] = h(A), I.mapFields = j, E(I);
    }
    function O(T) {
      const A = b(), I = p();
      I.splice(T, 1), A.mapFields = I, E(A);
    }
    function B() {
      const T = b();
      return T.type !== "array" ? d() : m(T.itemSchema ?? d());
    }
    function _(T) {
      const A = b();
      A.type = "array", A.itemSchema = m(T), E(A);
    }
    function R() {
      s("remove");
    }
    return (T, A) => {
      const I = Oo("CmsSchemaFieldEditor", !0);
      return D(), M("article", d1, [
        x("div", h1, [
          n.title ? (D(), M("p", f1, te(n.title), 1)) : oe("", !0),
          n.canRemove ? (D(), M("button", {
            key: 1,
            type: "button",
            disabled: n.disabled,
            class: "rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60",
            onClick: R
          }, " Quitar ", 8, p1)) : oe("", !0)
        ]),
        n.withIdentity ? (D(), M("div", m1, [
          x("label", g1, [
            A[9] || (A[9] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Key", -1)),
            x("input", {
              value: b().key || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[0] || (A[0] = (j) => k("key", j.target.value))
            }, null, 40, b1)
          ]),
          x("label", y1, [
            A[10] || (A[10] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Label", -1)),
            x("input", {
              value: b().label || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[1] || (A[1] = (j) => k("label", j.target.value))
            }, null, 40, v1)
          ])
        ])) : oe("", !0),
        x("div", x1, [
          x("label", w1, [
            A[11] || (A[11] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo", -1)),
            x("select", {
              value: b().type,
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onChange: A[2] || (A[2] = (j) => L(j.target.value))
            }, [
              (D(), M(Fe, null, Me(t, (j) => x("option", {
                key: j.value,
                value: j.value
              }, te(j.label), 9, E1)), 64))
            ], 40, A1)
          ]),
          x("label", T1, [
            A[12] || (A[12] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Placeholder", -1)),
            x("input", {
              value: b().placeholder || "",
              type: "text",
              disabled: n.disabled,
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[3] || (A[3] = (j) => U(j.target.value))
            }, null, 40, N1)
          ]),
          x("label", S1, [
            A[14] || (A[14] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Requerido", -1)),
            x("span", _1, [
              x("input", {
                checked: !!b().required,
                type: "checkbox",
                disabled: n.disabled,
                onChange: A[4] || (A[4] = (j) => F(j.target.checked))
              }, null, 40, C1),
              A[13] || (A[13] = x("span", { class: "ml-2" }, "Sí", -1))
            ])
          ])
        ]),
        x("label", k1, [
          A[15] || (A[15] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Help text", -1)),
          x("input", {
            value: b().helpText || "",
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: A[5] || (A[5] = (j) => K(j.target.value))
          }, null, 40, L1)
        ]),
        b().type === "select" ? (D(), M("label", q1, [
          A[16] || (A[16] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Opciones (separadas por coma)", -1)),
          x("input", {
            value: Z(),
            type: "text",
            disabled: n.disabled,
            class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
            onInput: A[6] || (A[6] = (j) => le(j.target.value))
          }, null, 40, O1)
        ])) : oe("", !0),
        b().type === "document" ? (D(), M("div", I1, [
          x("label", R1, [
            A[17] || (A[17] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Schema destino", -1)),
            x("input", {
              value: z(),
              type: "text",
              disabled: n.disabled,
              placeholder: "representantes",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[7] || (A[7] = (j) => ae(j.target.value))
            }, null, 40, $1)
          ]),
          x("label", D1, [
            A[18] || (A[18] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Campo etiqueta", -1)),
            x("input", {
              value: V(),
              type: "text",
              disabled: n.disabled,
              placeholder: "nombre",
              class: "w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100",
              onInput: A[8] || (A[8] = (j) => Q(j.target.value))
            }, null, 40, B1)
          ])
        ])) : oe("", !0),
        b().type === "map" ? (D(), M("div", F1, [
          x("div", M1, [
            A[19] || (A[19] = x("p", { class: "text-xs font-bold uppercase tracking-wide text-slate-600" }, "Map fields", -1)),
            x("button", {
              type: "button",
              disabled: n.disabled,
              class: "rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60",
              onClick: v
            }, " Agregar campo ", 8, P1)
          ]),
          x("div", j1, [
            (D(!0), M(Fe, null, Me(p(), (j, X) => (D(), Ut(I, {
              key: `map-field-${X}`,
              "model-value": j,
              disabled: n.disabled,
              "can-remove": !0,
              title: "Campo de map",
              "onUpdate:modelValue": (se) => f(X, se),
              onRemove: (se) => O(X)
            }, null, 8, ["model-value", "disabled", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ])) : oe("", !0),
        b().type === "array" ? (D(), M("div", U1, [
          A[20] || (A[20] = x("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide text-slate-600" }, "Item schema", -1)),
          Ct(I, {
            "model-value": B(),
            "with-identity": !1,
            disabled: n.disabled,
            title: "Estructura del ítem",
            "onUpdate:modelValue": _
          }, null, 8, ["model-value", "disabled"])
        ])) : oe("", !0)
      ]);
    };
  }
}), V1 = { class: "space-y-4" }, H1 = {
  key: 0,
  class: "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, K1 = {
  key: 1,
  class: "text-sm text-slate-500"
}, G1 = {
  key: 2,
  class: "text-sm text-slate-500"
}, W1 = {
  key: 3,
  class: "rounded-2xl border border-slate-200 bg-white p-5"
}, Z1 = { class: "flex flex-wrap items-center justify-between gap-3" }, Y1 = { class: "text-lg font-black text-slate-900" }, X1 = { class: "text-xs text-slate-500" }, Q1 = ["disabled"], J1 = { class: "mt-4 grid gap-3 md:grid-cols-2" }, ey = { class: "space-y-1" }, ty = ["value"], ry = { class: "space-y-1" }, ny = ["value"], sy = { class: "space-y-1 md:col-span-2" }, iy = ["value"], ay = { class: "space-y-1" }, oy = ["value"], ly = { class: "space-y-1" }, cy = ["value"], uy = { class: "space-y-1" }, dy = ["value"], hy = { class: "space-y-1" }, fy = ["value"], py = {
  key: 0,
  class: "space-y-1"
}, my = ["value"], gy = {
  key: 1,
  class: "space-y-1"
}, by = ["value"], yy = { class: "mt-5 border-t border-slate-200 pt-4" }, vy = { class: "space-y-3" }, xy = {
  key: 0,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, wy = {
  key: 1,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, Ay = /* @__PURE__ */ Ot({
  __name: "AdminSchemasPage",
  setup(n) {
    const e = ps(), t = vn(), r = re([]), s = re(""), i = re(!1), a = re(!1), l = re(null), c = re(""), d = re(""), g = re(""), m = Oe(() => r.value.find((v) => v.id === s.value) ?? null);
    yn(() => {
      h();
    }), rr(
      () => e.query.schema,
      (v) => {
        typeof v == "string" && r.value.some((f) => f.id === v) && s.value !== v && (s.value = v);
      }
    ), rr(
      m,
      (v) => {
        d.value = "", g.value = "", l.value = v ? U(v) : null;
      },
      { immediate: !0 }
    );
    async function h() {
      i.value = !0, c.value = "";
      try {
        let v = await ts();
        v.length || (await Po(), v = await ts()), r.value = v, b(v), s.value && await w(s.value);
      } catch {
        c.value = "No se pudieron cargar los esquemas.";
      } finally {
        i.value = !1;
      }
    }
    function b(v) {
      if (!v.length) {
        s.value = "";
        return;
      }
      const f = typeof e.query.schema == "string" ? e.query.schema : "";
      if (f && v.some((O) => O.id === f)) {
        s.value = f;
        return;
      }
      v.some((O) => O.id === s.value) || (s.value = v[0].id);
    }
    async function w(v) {
      !v || e.query.schema === v || await t.replace({
        query: {
          ...e.query,
          schema: v
        }
      });
    }
    function E() {
      return {
        type: "text",
        required: !1,
        placeholder: "",
        helpText: "",
        options: []
      };
    }
    function k() {
      return {
        ...E(),
        key: "",
        label: ""
      };
    }
    function L(v) {
      const f = {
        type: v.type,
        required: !!v.required,
        placeholder: v.placeholder ?? "",
        helpText: v.helpText ?? "",
        options: Array.isArray(v.options) ? [...v.options] : []
      };
      return v.type === "map" && (f.mapFields = Array.isArray(v.mapFields) ? v.mapFields.map((O) => F(O)) : []), v.type === "array" && (f.itemSchema = v.itemSchema ? L(v.itemSchema) : E()), f;
    }
    function F(v) {
      return {
        ...L(v),
        key: v.key ?? "",
        label: v.label ?? ""
      };
    }
    function U(v) {
      return {
        id: v.id,
        title: v.title,
        description: v.description ?? "",
        storageType: v.storageType,
        collectionName: v.collectionName,
        dictionaryDocumentId: v.dictionaryDocumentId ?? "",
        dictionaryRootKey: v.dictionaryRootKey ?? "",
        slugFromField: v.slugFromField ?? "",
        previewField: v.previewField ?? "",
        fields: v.fields.map((f) => F(f))
      };
    }
    function K(v, f) {
      l.value && (l.value = {
        ...l.value,
        [v]: f
      });
    }
    function Z(v) {
      l.value && (l.value.storageType = v === "dictionary" ? "dictionary" : "document");
    }
    function le() {
      l.value && l.value.fields.push(k());
    }
    function z(v, f) {
      l.value && (l.value.fields[v] = F(f));
    }
    function V(v) {
      l.value && l.value.fields.splice(v, 1);
    }
    function ae(v, f) {
      if (v.type === "map") {
        const O = Array.isArray(v.mapFields) ? v.mapFields : [];
        for (let B = 0; B < O.length; B += 1)
          Q(O[B], `${f}.mapFields[${B}]`);
      }
      v.type === "array" && v.itemSchema && ae(v.itemSchema, `${f}.itemSchema`);
    }
    function Q(v, f) {
      if (!v.key.trim() || !v.label.trim())
        throw new Error(`${f}: completa key y label.`);
      ae(v, f);
    }
    async function p() {
      if (!(!m.value || !l.value)) {
        a.value = !0, d.value = "", g.value = "";
        try {
          const v = l.value;
          if (!v.id.trim() || !v.title.trim() || !v.collectionName.trim())
            throw new Error("Completa id, título y colección del esquema.");
          if (!v.fields.length)
            throw new Error("Agrega al menos un campo al esquema.");
          const f = v.fields.map((_) => F(_));
          for (let _ = 0; _ < f.length; _ += 1)
            Q(f[_], `fields[${_}]`);
          const O = {
            id: v.id,
            title: v.title,
            description: v.description,
            storageType: v.storageType,
            collectionName: v.collectionName,
            dictionaryDocumentId: v.storageType === "dictionary" ? v.dictionaryDocumentId : "",
            dictionaryRootKey: v.storageType === "dictionary" ? v.dictionaryRootKey : "",
            slugFromField: v.slugFromField,
            previewField: v.previewField,
            fields: f
          };
          await au(O), await h(), s.value = O.id, await w(O.id), window.dispatchEvent(new Event("cms-schemas-updated"));
          const B = r.value.find((_) => _.id === s.value);
          l.value = U(B || O), g.value = "Esquema actualizado.";
        } catch (v) {
          d.value = v instanceof Error ? v.message : "No se pudo guardar el esquema.";
        } finally {
          a.value = !1;
        }
      }
    }
    return (v, f) => (D(), M("section", V1, [
      x("article", { class: "rounded-2xl border border-slate-200 bg-white p-5" }, [
        x("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
          f[9] || (f[9] = x("div", null, [
            x("h3", { class: "text-xl font-black text-slate-900" }, "Esquema editable"),
            x("p", { class: "mt-1 text-sm text-slate-600" }, [
              Ge(" Edición visual de campos. Los tipos "),
              x("strong", null, "map"),
              Ge(" y "),
              x("strong", null, "array"),
              Ge(" se editan por interfaz. ")
            ])
          ], -1)),
          x("button", {
            type: "button",
            class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
            onClick: h
          }, " Recargar ")
        ])
      ]),
      c.value ? (D(), M("p", H1, te(c.value), 1)) : oe("", !0),
      i.value ? (D(), M("p", K1, "Cargando esquemas...")) : !m.value || !l.value ? (D(), M("p", G1, "No hay esquema seleccionado.")) : (D(), M("article", W1, [
        x("div", Z1, [
          x("div", null, [
            x("h4", Y1, te(l.value.title || m.value.title), 1),
            x("p", X1, [
              f[10] || (f[10] = Ge(" ID: ", -1)),
              x("code", null, te(m.value.id), 1)
            ])
          ]),
          x("button", {
            type: "button",
            disabled: a.value,
            class: "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400",
            onClick: p
          }, te(a.value ? "Guardando..." : "Guardar cambios"), 9, Q1)
        ]),
        x("div", J1, [
          x("label", ey, [
            f[11] || (f[11] = x("span", { class: "text-xs font-semibold text-slate-700" }, "ID", -1)),
            x("input", {
              value: l.value.id,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: f[0] || (f[0] = (O) => K("id", O.target.value))
            }, null, 40, ty)
          ]),
          x("label", ry, [
            f[12] || (f[12] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Título", -1)),
            x("input", {
              value: l.value.title,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: f[1] || (f[1] = (O) => K("title", O.target.value))
            }, null, 40, ny)
          ]),
          x("label", sy, [
            f[13] || (f[13] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Descripción", -1)),
            x("input", {
              value: l.value.description,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: f[2] || (f[2] = (O) => K("description", O.target.value))
            }, null, 40, iy)
          ]),
          x("label", ay, [
            f[15] || (f[15] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Tipo de almacenamiento", -1)),
            x("select", {
              value: l.value.storageType,
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onChange: f[3] || (f[3] = (O) => Z(O.target.value))
            }, [...f[14] || (f[14] = [
              x("option", { value: "document" }, "document", -1),
              x("option", { value: "dictionary" }, "dictionary", -1)
            ])], 40, oy)
          ]),
          x("label", ly, [
            f[16] || (f[16] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Colección", -1)),
            x("input", {
              value: l.value.collectionName,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: f[4] || (f[4] = (O) => K("collectionName", O.target.value))
            }, null, 40, cy)
          ]),
          x("label", uy, [
            f[17] || (f[17] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Slug desde campo", -1)),
            x("input", {
              value: l.value.slugFromField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: f[5] || (f[5] = (O) => K("slugFromField", O.target.value))
            }, null, 40, dy)
          ]),
          x("label", hy, [
            f[18] || (f[18] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Campo de preview", -1)),
            x("input", {
              value: l.value.previewField,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: f[6] || (f[6] = (O) => K("previewField", O.target.value))
            }, null, 40, fy)
          ]),
          l.value.storageType === "dictionary" ? (D(), M("label", py, [
            f[19] || (f[19] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary document ID", -1)),
            x("input", {
              value: l.value.dictionaryDocumentId,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: f[7] || (f[7] = (O) => K("dictionaryDocumentId", O.target.value))
            }, null, 40, my)
          ])) : oe("", !0),
          l.value.storageType === "dictionary" ? (D(), M("label", gy, [
            f[20] || (f[20] = x("span", { class: "text-xs font-semibold text-slate-700" }, "Dictionary root key", -1)),
            x("input", {
              value: l.value.dictionaryRootKey,
              type: "text",
              class: "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500",
              onInput: f[8] || (f[8] = (O) => K("dictionaryRootKey", O.target.value))
            }, null, 40, by)
          ])) : oe("", !0)
        ]),
        x("div", yy, [
          x("div", { class: "mb-3 flex items-center justify-between" }, [
            f[21] || (f[21] = x("h5", { class: "text-sm font-black uppercase tracking-wide text-slate-600" }, "Campos", -1)),
            x("button", {
              type: "button",
              class: "rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
              onClick: le
            }, " Agregar campo ")
          ]),
          x("div", vy, [
            (D(!0), M(Fe, null, Me(l.value.fields, (O, B) => (D(), Ut(z1, {
              key: `schema-field-${B}`,
              "model-value": O,
              "can-remove": !0,
              title: `Campo ${B + 1}`,
              "onUpdate:modelValue": (_) => z(B, _),
              onRemove: (_) => V(B)
            }, null, 8, ["model-value", "title", "onUpdate:modelValue", "onRemove"]))), 128))
          ])
        ]),
        d.value ? (D(), M("p", xy, te(d.value), 1)) : oe("", !0),
        g.value ? (D(), M("p", wy, te(g.value), 1)) : oe("", !0)
      ]))
    ]));
  }
}), Ey = { class: "rounded-2xl border border-slate-200 bg-white p-5" }, Ty = {
  key: 0,
  class: "mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
}, Ny = {
  key: 1,
  class: "mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
}, Sy = {
  key: 2,
  class: "mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
}, _y = {
  key: 3,
  class: "mt-4 text-sm text-slate-500"
}, Cy = {
  key: 4,
  class: "mt-4 text-sm text-slate-500"
}, ky = {
  key: 5,
  class: "mt-4 space-y-3"
}, Ly = { class: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between" }, qy = { class: "text-sm font-semibold text-slate-900" }, Oy = { class: "text-xs text-slate-500" }, Iy = { class: "text-xs text-slate-500" }, Ry = { class: "text-xs text-slate-500" }, $y = { class: "flex flex-wrap gap-3" }, Dy = ["checked", "disabled", "onChange"], By = /* @__PURE__ */ Ot({
  __name: "AdminUsersPage",
  setup(n) {
    const e = re([]), t = re(!1), r = re(""), s = re(""), i = re(null), a = Oe(() => Mt.value === "admin"), l = [
      { label: "Admin", value: "admin" },
      { label: "Writer", value: "writer" },
      { label: "Manager", value: "manager" },
      { label: "Sin rol", value: null }
    ];
    yn(async () => {
      await c();
    });
    async function c() {
      t.value = !0, r.value = "";
      try {
        e.value = await fc();
      } catch {
        r.value = "No se pudieron cargar los usuarios.";
      } finally {
        t.value = !1;
      }
    }
    async function d(b, w) {
      if (s.value = "", r.value = "", !a.value) {
        r.value = "Solo un admin puede cambiar roles.";
        return;
      }
      const E = b.role === w ? null : w;
      i.value = b.id;
      try {
        await pc(b.id, E), b.role = E, s.value = "Rol actualizado correctamente.";
      } catch {
        r.value = "No se pudo actualizar el rol.";
      } finally {
        i.value = null;
      }
    }
    function g(b, w) {
      return b === w;
    }
    function m(b) {
      return b === null ? "Sin rol" : b.charAt(0).toUpperCase() + b.slice(1);
    }
    function h(b) {
      const w = b?.toDate?.();
      return w ? w.toLocaleString("es-ES") : "Sin registros";
    }
    return (b, w) => (D(), M("section", Ey, [
      x("div", { class: "flex items-center justify-between" }, [
        w[0] || (w[0] = x("h3", { class: "text-xl font-black text-slate-900" }, "Usuarios", -1)),
        x("button", {
          type: "button",
          class: "rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50",
          onClick: c
        }, " Recargar ")
      ]),
      w[1] || (w[1] = x("p", { class: "mt-1 text-sm text-slate-600" }, "Listado de usuarios con último login y control de rol.", -1)),
      a.value ? oe("", !0) : (D(), M("p", Ty, " Solo usuarios con rol admin pueden editar roles. ")),
      r.value ? (D(), M("p", Ny, te(r.value), 1)) : oe("", !0),
      s.value ? (D(), M("p", Sy, te(s.value), 1)) : oe("", !0),
      t.value ? (D(), M("p", _y, "Cargando usuarios...")) : e.value.length === 0 ? (D(), M("p", Cy, "No hay usuarios registrados.")) : (D(), M("div", ky, [
        (D(!0), M(Fe, null, Me(e.value, (E) => (D(), M("article", {
          key: E.id,
          class: "rounded-lg border border-slate-200 p-4"
        }, [
          x("div", Ly, [
            x("div", null, [
              x("p", qy, te(E.email || E.id), 1),
              x("p", Oy, "UID: " + te(E.id), 1),
              x("p", Iy, "Último login: " + te(h(E.lastLoginAt)), 1),
              x("p", Ry, "Rol actual: " + te(m(E.role)), 1)
            ]),
            x("div", $y, [
              (D(), M(Fe, null, Me(l, (k) => x("label", {
                key: k.label,
                class: "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
              }, [
                x("input", {
                  type: "checkbox",
                  checked: g(E.role, k.value),
                  disabled: !a.value || i.value === E.id,
                  onChange: (L) => d(E, k.value)
                }, null, 40, Dy),
                Ge(" " + te(k.label), 1)
              ])), 64))
            ])
          ])
        ]))), 128))
      ]))
    ]));
  }
}), Co = /* @__PURE__ */ new WeakSet();
function cv(n, e) {
  if (Co.has(n))
    return;
  const t = qr(e.basePath ?? "/admin"), r = qr(e.loginPath ?? "/ingresar"), s = qr(e.registerPath ?? "/registro"), i = My(e.homePath ?? "/");
  uc(e.firebase), wc({ basePath: t, loginPath: r, registerPath: s, homePath: i }), gc();
  const a = Fy(t, r, s);
  for (const l of a)
    n.addRoute(l);
  n.beforeEach(async (l) => (await bc(), l.meta.cmsRequiresAuth && !un.value ? {
    path: r,
    query: { redirect: l.fullPath }
  } : (l.path === r || l.path === s || l.meta.cmsGuestOnly) && un.value ? { path: t } : !0)), Co.add(n);
}
function Fy(n = "/admin", e = "/ingresar", t = "/registro") {
  const r = qr(n), s = qr(e), i = qr(t);
  return [
    { path: s, component: Sc, meta: { cmsGuestOnly: !0 } },
    { path: i, component: qc, meta: { cmsGuestOnly: !0 } },
    {
      path: r,
      component: Gu,
      meta: { cmsRequiresAuth: !0 },
      children: [
        { path: "", redirect: `${r}/blog` },
        { path: "blog", component: u1, meta: { cmsRequiresAuth: !0 } },
        { path: "schemas", component: Ay, meta: { cmsRequiresAuth: !0 } },
        { path: "users", component: By, meta: { cmsRequiresAuth: !0 } }
      ]
    }
  ];
}
function qr(n) {
  const e = String(n || "").trim();
  return e ? e.startsWith("/") ? e : `/${e}` : "/";
}
function My(n) {
  const e = String(n || "").trim();
  return e ? /^(https?:)?\/\//i.test(e) || e.startsWith("/") ? e : `/${e}` : "/";
}
const Ts = "blogs";
async function uv(n) {
  const { firestore: e } = xe(), t = Xl(n.titulo);
  return (await Io(Ht(e, Ts), {
    ...n,
    slug: t,
    createdAt: Ce(),
    updatedAt: Ce()
  })).id;
}
async function dv(n = 50) {
  const { firestore: e } = xe(), t = fs(Ht(e, Ts), Hi("createdAt", "desc"), Gi(n));
  return (await Or(t)).docs.map((s) => ({ id: s.id, ...s.data() }));
}
async function hv(n) {
  const { firestore: e } = xe(), t = String(n || "").trim();
  if (!t)
    return null;
  const r = fs(
    Ht(e, Ts),
    ic("slug", "==", t),
    Gi(1)
  ), s = await Or(r);
  if (s.empty)
    return null;
  const i = s.docs[0];
  return { id: i.id, ...i.data() };
}
async function fv(n) {
  const { firestore: e } = xe();
  await Ki(Ve(e, Ts, n));
}
const Ns = "views", ya = "landingPage", pv = "nav", mv = "siteTheme", Py = "__";
async function gv() {
  return jy(ya);
}
async function bv(n) {
  return Uy(ya, n);
}
async function jy(n) {
  const { firestore: e } = xe(), t = Ve(e, Ns, n), r = await kt(t);
  if (!r.exists())
    return { schema: ds(n) };
  const s = r.data();
  return {
    schema: Ql(n, s.schema)
  };
}
async function Uy(n, e) {
  const { firestore: t } = xe(), r = Ve(t, Ns, n), s = Ky(e), i = await kt(r), a = i.exists() ? i.data() : {};
  await Kt(
    r,
    {
      ...a,
      schema: s,
      updatedAt: Ce()
    }
  );
}
function yv(n, e) {
  return zy(ya, n, e);
}
function zy(n, e, t) {
  const { firestore: r } = xe(), s = Ve(r, Ns, n);
  return Ro(
    s,
    (i) => {
      if (!i.exists()) {
        e(ds(n));
        return;
      }
      const a = i.data();
      e(Ql(n, a.schema));
    },
    (i) => {
      console.error(`No se pudo escuchar el schema ${n}:`, i), e(ds(n)), t?.(i);
    }
  );
}
function vv(n) {
  const { firestore: e } = xe(), t = Ve(e, Ns, n);
  return new Promise((r) => {
    let s = !1, i = null;
    const a = () => {
      s || (s = !0, i && i(), r());
    };
    i = Ro(
      t,
      () => a(),
      () => a()
    ), s && i && i();
  });
}
function Vy(n, e, t) {
  const r = n[e]?.fields[t];
  return r ? r.value ?? "" : "";
}
function xv(n, e, t, r) {
  const s = Vy(n, e, t);
  if (!s)
    return r;
  try {
    return JSON.parse(s);
  } catch (i) {
    return console.error(`JSON inválido en schema ${e}.${t}:`, i), r;
  }
}
function Ql(n, e) {
  const t = ds(n);
  if (!hs(e))
    return t;
  if (Gy(e))
    return Wy(t, e), t;
  for (const [r, s] of Object.entries(e)) {
    if (!Zy(s))
      continue;
    if (!t[r]) {
      t[r] = s;
      continue;
    }
    const i = t[r];
    i.label = s.label || i.label, i.description = s.description || i.description;
    for (const [a, l] of Object.entries(s.fields)) {
      if (!l || typeof l != "object")
        continue;
      if (!i.fields[a]) {
        i.fields[a] = l;
        continue;
      }
      const c = i.fields[a];
      c.value = mt(l.value, c.value), c.label = mt(l.label, c.label), c.type = mt(l.type, c.type);
      const d = l.options;
      Array.isArray(d) && (c.options = d.filter((m) => typeof m == "string")), c.placeholder = mt(
        l.placeholder,
        c.placeholder ?? ""
      ), c.helpText = mt(
        l.helpText,
        c.helpText ?? ""
      );
      const g = l.repeater;
      g && typeof g == "object" && (c.repeater = Yy(
        c.repeater,
        g
      ));
    }
  }
  return t;
}
function ds(n) {
  const e = Hy(n);
  return JSON.parse(JSON.stringify(e.schema));
}
function Hy(n) {
  const e = Qc(n);
  if (!e)
    throw new Error(`No existe un template para viewId: ${n}`);
  return e;
}
function Ky(n) {
  const e = {};
  for (const [t, r] of Object.entries(n))
    for (const [s, i] of Object.entries(r.fields)) {
      const a = Jl(t, s);
      e[a] = typeof i.value == "string" ? i.value : "";
    }
  return e;
}
function Gy(n) {
  return Object.values(n).every((e) => typeof e == "string" || e == null ? !0 : typeof e == "number" || typeof e == "boolean");
}
function Wy(n, e) {
  for (const [t, r] of Object.entries(n))
    for (const [s, i] of Object.entries(r.fields)) {
      const a = Jl(t, s), l = e[a];
      l != null && (i.value = String(l));
    }
}
function Jl(n, e) {
  return `${n}${Py}${e}`.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function hs(n) {
  return !!n && typeof n == "object";
}
function Zy(n) {
  return hs(n) && hs(n.fields);
}
function mt(n, e) {
  return typeof n == "string" ? n : e;
}
function Yy(n, e) {
  const t = /* @__PURE__ */ new Map();
  for (const s of n?.fields ?? [])
    t.set(s.key, { ...s });
  const r = e.fields;
  if (Array.isArray(r))
    for (const s of r) {
      if (!hs(s))
        continue;
      const i = mt(s.key, "").trim();
      if (!i)
        continue;
      const a = t.get(i), l = mt(s.placeholder, a?.placeholder ?? ""), c = {
        key: i,
        label: mt(s.label, a?.label ?? i),
        type: Xy(s.type, a?.type ?? "text")
      };
      l && (c.placeholder = l), t.set(i, c);
    }
  return {
    itemLabel: mt(e.itemLabel, n?.itemLabel ?? "item"),
    fields: Array.from(t.values())
  };
}
function Xy(n, e) {
  const t = mt(n, e).trim().toLowerCase();
  return t === "textarea" || t === "url" || t === "text" ? t : e;
}
export {
  Mo as DEFAULT_BLOG_DOCUMENT_SCHEMA,
  nu as DEFAULT_PROPERTIES_DOCUMENT_SCHEMA,
  ru as DEFAULT_REPRESENTATIVES_DOCUMENT_SCHEMA,
  ya as LANDING_VIEW_ID,
  pv as NAV_VIEW_ID,
  mv as THEME_VIEW_ID,
  xc as cerrarSesion,
  uv as crearBlog,
  N0 as crearRegistroDocumento,
  Fy as createCmsRoutes,
  fv as eliminarBlog,
  S0 as eliminarRegistroDocumento,
  Po as ensureDefaultSchemas,
  yv as escucharSchemaLanding,
  zy as escucharSchemaView,
  vv as esperarPrimerSchemaView,
  C0 as guardarRegistroDiccionario,
  au as guardarSchemaContenido,
  bv as guardarSchemaLanding,
  Uy as guardarSchemaView,
  dv as listarBlogs,
  _o as listarRegistrosDocumento,
  ts as listarSchemasContenido,
  hv as obtenerBlogPorSlug,
  k0 as obtenerRegistroDiccionario,
  gv as obtenerSchemaLanding,
  jy as obtenerSchemaView,
  cv as registerPifWarriorsCms,
  Mt as rolActual,
  un as usuarioActual,
  Vy as valorCampo,
  xv as valorCampoJson
};
