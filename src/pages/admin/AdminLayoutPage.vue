<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, type CSSProperties } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { cerrarSesion, usuarioActual } from "../../firebase/auth";
import { getCmsFirebaseServices } from "../../firebase/context";
import { getCmsRouteConfig } from "../../runtime/cmsConfig";
import { listarSchemasContenido } from "../../services/contentSchemaService";
import type { CmsContentSchema } from "../../types/contentSchema";

const route = useRoute();
const router = useRouter();
const { basePath, loginPath, homePath } = getCmsRouteConfig();
const DEVELOPER_MODE_STORAGE_KEY = "cms-developer-mode";
const schemasContenido = ref<CmsContentSchema[]>([]);
const cargandoSchemasContenido = ref(false);
const contenidoExpandido = ref(true);
const esquemasExpandido = ref(true);
const panelAbierto = ref(true);
const modoDesarrollador = ref(false);
const esPantallaGrande = ref(false);

const cmsBg = "var(--cms-bg, #f3f4f6)";
const cmsSurface = "var(--cms-surface, #ffffff)";
const cmsBorder = "var(--cms-border, #d1d5db)";
const cmsText = "var(--cms-text, #111827)";
const cmsMuted = "var(--cms-muted, #6b7280)";
const cmsPrimary = "var(--cms-primary, #111827)";
const cmsPrimaryText = "var(--cms-primary-text, #ffffff)";

onMounted(async () => {
 await cargarSchemasContenido();
 actualizarEstadoPantalla();
 if (typeof window !== "undefined") {
 modoDesarrollador.value = window.localStorage.getItem(DEVELOPER_MODE_STORAGE_KEY) === "true";
 void asegurarRutaVisible();
 window.addEventListener("resize", actualizarEstadoPantalla);
 }
 window.addEventListener("cms-schemas-updated", handleSchemasUpdated);
});

onBeforeUnmount(() => {
 window.removeEventListener("cms-schemas-updated", handleSchemasUpdated);
 if (typeof window !== "undefined") {
 window.removeEventListener("resize", actualizarEstadoPantalla);
 }
});

watch(
 () => route.fullPath,
 () => {
 if (route.path.startsWith(`${basePath}/content`)) {
 contenidoExpandido.value = true;
 void cargarSchemasContenido();
 }
 if (route.path.startsWith(`${basePath}/schemas`)) {
 esquemasExpandido.value = true;
 void cargarSchemasContenido();
 }
 actualizarEstadoPantalla();
 void asegurarRutaVisible();
 }
);

watch(modoDesarrollador, (value) => {
 if (typeof window !== "undefined") {
 window.localStorage.setItem(DEVELOPER_MODE_STORAGE_KEY, value ? "true" : "false");
 }
 void asegurarRutaVisible();
});

async function cargarSchemasContenido(): Promise<void> {
 cargandoSchemasContenido.value = true;
 try {
 schemasContenido.value = await listarSchemasContenido();
 } finally {
 cargandoSchemasContenido.value = false;
 }
}

const isContenidoRoute = computed(() => route.path.startsWith(`${basePath}/content`));
const isEsquemasRoute = computed(() => route.path.startsWith(`${basePath}/schemas`));
const schemasDocumento = computed(() => schemasContenido.value.filter((schema) => schema.storageType === "document"));
const schemasDiccionario = computed(() => schemasContenido.value.filter((schema) => schema.storageType === "dictionary"));

function activoModulo(path: string): boolean {
 return route.path.startsWith(path);
}

function handleSchemasUpdated(): void {
 void cargarSchemasContenido();
}

function toContenidoLink(schemaId: string): { path: string; query: Record<string, string> } {
 return {
 path: `${basePath}/content`,
 query: { schema: schemaId }
 };
}

function toEsquemaLink(schemaId: string): { path: string; query: Record<string, string> } {
 return {
 path: `${basePath}/schemas`,
 query: { schema: schemaId }
 };
}

function contenidoActivo(schemaId: string): boolean {
 if (!isContenidoRoute.value) {
 return false;
 }
 const currentSchema = typeof route.query.schema === "string" ? route.query.schema : "";
 if (currentSchema) {
 return currentSchema === schemaId;
 }
 return schemasContenido.value[0]?.id === schemaId;
}

function esquemaActivo(schemaId: string): boolean {
 if (!isEsquemasRoute.value) {
 return false;
 }
 const currentSchema = typeof route.query.schema === "string" ? route.query.schema : "";
 if (currentSchema) {
 return currentSchema === schemaId;
 }
 return schemasContenido.value[0]?.id === schemaId;
}

function toggleContenido(): void {
 contenidoExpandido.value = !contenidoExpandido.value;
}

function toggleEsquemas(): void {
 esquemasExpandido.value = !esquemasExpandido.value;
}

function togglePanel(): void {
 panelAbierto.value = !panelAbierto.value;
}

function toggleModoDesarrollador(): void {
 modoDesarrollador.value = !modoDesarrollador.value;
}

function cerrarPanel(): void {
 panelAbierto.value = false;
}

function actualizarEstadoPantalla(): void {
 if (typeof window === "undefined") {
 return;
 }
 esPantallaGrande.value = window.innerWidth >= 1024;
 if (!esPantallaGrande.value) {
 panelAbierto.value = false;
 }
}

async function asegurarRutaVisible(): Promise<void> {
 if (modoDesarrollador.value) {
 return;
 }
 if (route.path.startsWith(`${basePath}/schemas`) || route.path.startsWith(`${basePath}/users`)) {
 await router.replace(`${basePath}/content`);
 }
}

function esRutaExterna(path: string): boolean {
 return /^(https?:)?\/\//i.test(path);
}

async function irAInicio(): Promise<void> {
 if (!homePath) {
 return;
 }
 if (esRutaExterna(homePath)) {
 if (typeof window !== "undefined") {
 window.location.assign(homePath);
 }
 return;
 }
 await router.push(homePath);
}

async function cerrarSesionActual(): Promise<void> {
 await cerrarSesion();
 await router.push(loginPath);
}

const emailActual = computed(() => usuarioActual.value?.email || "Sin correo");
const tituloPanel = computed(() => {
 try {
 const projectId = getCmsFirebaseServices().auth.app.options.projectId;
 if (typeof projectId === "string" && projectId.trim().length > 0) {
 return projectId;
 }
 } catch {
 // Fallback when CMS services are not initialized yet.
 }
 return "Panel";
});

const tituloSeccion = computed(() => {
 if (route.path.startsWith(`${basePath}/content`)) {
 const currentSchema = typeof route.query.schema === "string" ? route.query.schema : "";
 const selected =
 schemasContenido.value.find((schema) => schema.id === currentSchema) ?? schemasContenido.value[0] ?? null;
 return selected ? `Contenido · ${selected.title}` : "Contenido";
 }
 if (route.path.startsWith(`${basePath}/schemas`)) {
 if (!modoDesarrollador.value) {
 return "Contenido";
 }
 return "Esquemas";
 }
 if (route.path.startsWith(`${basePath}/users`)) {
 if (!modoDesarrollador.value) {
 return "Contenido";
 }
 return "Usuarios";
 }
 return "Dashboard";
});

const rootStyle = computed<CSSProperties>(() => ({
 height: "100dvh",
 minHeight: "100dvh",
 overflow: "hidden",
 backgroundColor: cmsBg,
 color: cmsText
}));

const openSidebarButtonStyle = computed<CSSProperties>(() => ({
 position: "fixed",
 left: "0",
 top: "50%",
 transform: "translateY(-50%)",
 zIndex: "50",
 border: `1px solid ${cmsBorder}`,
 borderLeft: "0",
 borderRadius: "0 10px 10px 0",
 backgroundColor: cmsSurface,
 color: cmsText,
 padding: "10px 8px",
 boxShadow: "0 8px 24px rgba(0,0,0,0.18)"
}));

const overlayStyle = computed<CSSProperties>(() => ({
 position: "fixed",
 inset: "0",
 zIndex: "30",
 backgroundColor: "rgba(17,24,39,0.30)"
}));

const sidebarStyle = computed<CSSProperties>(() => ({
 height: "100dvh",
 maxHeight: "100dvh",
 overflow: "hidden",
 display: "flex",
 minHeight: "0",
 flexDirection: "column",
 padding: "0",
 backgroundColor: cmsSurface,
 color: cmsText,
 borderRight: `1px solid ${cmsBorder}`,
 boxShadow: "0 10px 30px rgba(0,0,0,0.16)"
}));

const contentStyle = computed<CSSProperties>(() => ({
 height: "100%",
 overflowY: "auto",
 transition: "padding-left 200ms ease-in-out",
  paddingLeft: panelAbierto.value && esPantallaGrande.value ? "360px" : "0px"
}));

const iconButtonStyle: CSSProperties = {
 border: `1px solid ${cmsBorder}`,
 borderRadius: "8px",
 backgroundColor: cmsSurface,
 color: cmsText,
 padding: "4px 8px"
};

const blockButtonStyle: CSSProperties = {
 width: "100%",
 display: "flex",
 alignItems: "center",
 justifyContent: "space-between",
 border: `1px solid ${cmsBorder}`,
 borderRadius: "10px",
 backgroundColor: cmsSurface,
 color: cmsText,
 padding: "8px 12px",
 fontSize: "12px",
 fontWeight: "600"
};

const navCardStyle: CSSProperties = {
 border: `1px solid ${cmsBorder}`,
 borderRadius: "12px",
 padding: "12px"
};

const headerRowStyle: CSSProperties = {
 display: "flex",
 alignItems: "flex-start",
 justifyContent: "space-between",
 gap: "8px"
};

const footerStyle: CSSProperties = {
 marginTop: "12px",
 borderTop: `1px solid ${cmsBorder}`,
 paddingTop: "12px"
};

function estadoBadgeStyle(activo: boolean): CSSProperties {
 return {
 borderRadius: "999px",
 padding: "2px 8px",
 fontSize: "10px",
 fontWeight: "700",
 textTransform: "uppercase",
 backgroundColor: activo ? "rgba(16,185,129,0.18)" : "rgba(107,114,128,0.16)",
 color: activo ? "#047857" : cmsMuted
 };
}

function navItemStyle(activo: boolean): CSSProperties {
 return {
 display: "block",
 border: `1px solid ${activo ? cmsPrimary : cmsBorder}`,
 borderRadius: "10px",
 padding: "6px 8px",
 fontSize: "12px",
 textDecoration: "none",
 backgroundColor: activo ? cmsPrimary : "transparent",
 color: activo ? cmsPrimaryText : cmsText
 };
}

function navMetaStyle(activo: boolean): CSSProperties {
 return {
 color: activo ? "rgba(255,255,255,0.82)" : cmsMuted
 };
}
</script>

<template>
 <main class="overflow-hidden" :style="rootStyle">
 <button
 v-if="!panelAbierto"
  type="button"
  aria-label="Abrir sidebar"
 :style="openSidebarButtonStyle"
  @click="togglePanel"
 >
 <span class="material-symbols-outlined text-lg">left_panel_open</span>
 </button>

 <div
 v-if="panelAbierto && !esPantallaGrande"
 :style="overlayStyle"
  @click="cerrarPanel"
 ></div>

 <aside
 v-show="panelAbierto"
 class="fixed inset-y-0 left-0 z-40 w-80 border-r shadow-xl"
 :style="sidebarStyle"
 >
 <div class="mb-3 p-3 lg:mb-0" :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }">
 <h2 class="text-sm font-black uppercase tracking-wide" :style="{ color: cmsText }">{{ tituloPanel }}</h2>
 <div class="flex items-center gap-2" :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">
 <button
 type="button"
 aria-label="Ir a inicio"
 :style="iconButtonStyle"
 @click="irAInicio"
 >
 <span class="material-symbols-outlined text-lg">home</span>
 </button>
 <button
 type="button"
 aria-label="Cerrar sidebar"
 :style="iconButtonStyle"
 @click="cerrarPanel"
 >
 <span class="material-symbols-outlined text-lg">left_panel_close</span>
 </button>
 </div>
 </div>
 <div class="px-3">
 <button
 type="button"
 class="mb-2"
 :style="blockButtonStyle"
 @click="toggleModoDesarrollador"
 >
 <span>Modo desarrollador</span>
 <span :style="estadoBadgeStyle(modoDesarrollador)">
 {{ modoDesarrollador ? "Activo" : "Oculto" }}
 </span>
 </button>
 </div>
 <div class="mt-3 flex-1 min-h-0 space-y-2 overflow-y-auto">
 <div class="transition" :style="navCardStyle">
 <div :style="headerRowStyle">
 <RouterLink :to="`${basePath}/content`" class="min-w-0 flex-1">
 <p class="text-sm font-black" :style="{ color: cmsText }">Contenido</p>
 <p class="text-xs" :style="{ color: cmsMuted }">
 Formularios y registros
 </p>
 </RouterLink>
 <button
 type="button"
 aria-label="Expandir o contraer contenido"
 :style="iconButtonStyle"
 @click="toggleContenido"
 >
 <span class="material-symbols-outlined text-base leading-none">
 {{ contenidoExpandido ? "keyboard_arrow_up" : "keyboard_arrow_down" }}
 </span>
 </button>
 </div>

 <div v-if="contenidoExpandido" class="mt-3 space-y-1 border-t pt-3">
 <RouterLink
 v-for="schema in schemasDiccionario"
 :key="schema.id"
 :to="toContenidoLink(schema.id)"
 :style="navItemStyle(contenidoActivo(schema.id))"
 >
 <p class="font-semibold">{{ schema.title }}</p>
 <p :style="navMetaStyle(contenidoActivo(schema.id))">
 {{ schema.storageType }} · {{ schema.collectionName }}
 </p>
 </RouterLink>

 <p
 v-if="cargandoSchemasContenido"
 class="rounded-lg border px-2 py-1.5 text-xs "
 >
 Cargando elementos...
 </p>
 <p
 v-else-if="!schemasDiccionario.length"
 class="rounded-lg border px-2 py-1.5 text-xs "
 >
 No hay diccionarios configurados.
 </p>
 </div>
 </div>

 <div v-if="schemasDocumento.length" class="space-y-1 rounded-xl border p-3">
 <p class="px-1 text-[11px] font-black uppercase tracking-wide" :style="{ color: cmsMuted }">Documentos</p>
 <RouterLink
 v-for="schema in schemasDocumento"
 :key="`document-link-${schema.id}`"
 :to="toContenidoLink(schema.id)"
 :style="navItemStyle(contenidoActivo(schema.id))"
 >
 <p class="font-semibold">{{ schema.title }}</p>
 <p :style="navMetaStyle(contenidoActivo(schema.id))">
 document · {{ schema.collectionName }}
 </p>
 </RouterLink>
 </div>

 <div
 v-if="modoDesarrollador"
 class="transition"
 :style="navCardStyle"
 >
 <div :style="headerRowStyle">
 <RouterLink :to="`${basePath}/schemas`" class="min-w-0 flex-1">
 <p class="text-sm font-black" :style="{ color: cmsText }">Esquemas</p>
 <p class="text-xs" :style="{ color: cmsMuted }">
 Edición de esquemas
 </p>
 </RouterLink>
 <button
 type="button"
 aria-label="Expandir o contraer esquemas"
 :style="iconButtonStyle"
 @click="toggleEsquemas"
 >
 <span class="material-symbols-outlined text-base leading-none">
 {{ esquemasExpandido ? "keyboard_arrow_up" : "keyboard_arrow_down" }}
 </span>
 </button>
 </div>

 <div v-if="esquemasExpandido" class="mt-3 space-y-1 border-t pt-3">
 <RouterLink
 v-for="schema in schemasContenido"
 :key="`schema-edit-${schema.id}`"
 :to="toEsquemaLink(schema.id)"
 :style="navItemStyle(esquemaActivo(schema.id))"
 >
 <p class="font-semibold">{{ schema.title }}</p>
 <p :style="navMetaStyle(esquemaActivo(schema.id))">
 {{ schema.storageType }} · {{ schema.collectionName }}
 </p>
 </RouterLink>

 <p
 v-if="cargandoSchemasContenido"
 class="rounded-lg border px-2 py-1.5 text-xs "
 >
 Cargando elementos...
 </p>
 </div>
 </div>

 <RouterLink
 v-if="modoDesarrollador"
 :to="`${basePath}/users`"
 class="transition"
 :style="navItemStyle(activoModulo(`${basePath}/users`))"
 >
 <p class="text-sm font-black">Usuarios</p>
 <p class="text-xs" :style="navMetaStyle(activoModulo(`${basePath}/users`))">
 Roles y último ingreso
 </p>
 </RouterLink>
 </div>

 <div class="mt-3 border-t pt-3" :style="footerStyle">
 <div class="flex items-center gap-2 rounded-xl border p-2">
 <button
 type="button"
 class="min-w-0 flex-1 rounded-md px-3 py-2 text-left text-xs"
 :style="{ border: `1px solid ${cmsBorder}`, backgroundColor: cmsSurface, color: cmsText }"
 >
 <p class="font-semibold">Cuenta actual</p>
 <p class="truncate" :style="{ color: cmsMuted }">{{ emailActual }}</p>
 </button>
 <button
 type="button"
 aria-label="Cerrar sesión"
 :style="iconButtonStyle"
 @click="cerrarSesionActual"
 >
 <span class="material-symbols-outlined text-lg">logout</span>
 </button>
 </div>
 </div>
 </aside>

 <section
 class="min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8"
 :style="contentStyle"
 >
 <div class="mx-auto w-full max-w-7xl space-y-6">
 <section>
 <h1 class="text-3xl font-black ">Dashboard</h1>
 <p class="mt-2 text-sm ">
 Esquema = campos del formulario. Formulario = datos que completa el usuario final.
 </p>
 </section>

 <section>
 <h2 class="text-xl font-black ">{{ tituloSeccion }}</h2>
 <div class="mt-3">
 <RouterView />
 </div>
 </section>
 </div>
 </section>
 </main>
</template>
