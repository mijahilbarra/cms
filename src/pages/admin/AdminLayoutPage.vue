<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
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

onMounted(async () => {
 await cargarSchemasContenido();
 if (typeof window !== "undefined" && window.innerWidth < 1024) {
 panelAbierto.value = false;
 }
 if (typeof window !== "undefined") {
 modoDesarrollador.value = window.localStorage.getItem(DEVELOPER_MODE_STORAGE_KEY) === "true";
 void asegurarRutaVisible();
 }
 window.addEventListener("cms-schemas-updated", handleSchemasUpdated);
});

onBeforeUnmount(() => {
 window.removeEventListener("cms-schemas-updated", handleSchemasUpdated);
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
 if (typeof window !== "undefined" && window.innerWidth < 1024) {
 panelAbierto.value = false;
 }
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
</script>

<template>
 <main class="cms-root-fixed-height overflow-hidden ">
 <button
 v-if="!panelAbierto"
 type="button"
 aria-label="Abrir sidebar"
 class="fixed left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-lg border border-l-0 px-2 py-3 shadow-lg "
 @click="togglePanel"
 >
 <span class="material-symbols-outlined text-lg">left_panel_open</span>
 </button>

 <div
 v-if="panelAbierto"
 class="fixed inset-0 z-30 lg:hidden"
 @click="cerrarPanel"
 ></div>

 <aside
 class="cms-sidebar-panel cms-sidebar-fixed-height fixed inset-y-0 left-0 z-40 w-80 border-r shadow-xl transition-transform duration-200"
 :class="panelAbierto ? 'cms-sidebar-open' : 'cms-sidebar-closed'"
 >
 <div class="cms-sidebar-header mb-3 flex items-center justify-between lg:mb-0">
 <h2 class="text-sm font-black uppercase tracking-wide ">{{ tituloPanel }}</h2>
 <div class="flex items-center gap-2">
 <button
 type="button"
 aria-label="Ir a inicio"
 class="rounded-md border px-2 py-1 "
 @click="irAInicio"
 >
 <span class="material-symbols-outlined text-lg">home</span>
 </button>
 <button
 type="button"
 aria-label="Cerrar sidebar"
 class="rounded-md border px-2 py-1 "
 @click="cerrarPanel"
 >
 <span class="material-symbols-outlined text-lg">left_panel_close</span>
 </button>
 </div>
 </div>
 <div class="px-3">
 <button
 type="button"
 class="mb-2 flex w-full items-center justify-between rounded-md border px-3 py-2 text-xs font-semibold "
 @click="toggleModoDesarrollador"
 >
 <span>Modo desarrollador</span>
 <span
 class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
 :class="modoDesarrollador ? ' ' : ' '"
 >
 {{ modoDesarrollador ? "Activo" : "Oculto" }}
 </span>
 </button>
 </div>
 <div class="cms-sidebar-scroll space-y-2">
 <div class="rounded-xl border p-3 transition ">
 <div class="flex items-start justify-between gap-2">
 <RouterLink :to="`${basePath}/content`" class="min-w-0 flex-1">
 <p class="text-sm font-black">Contenido</p>
 <p class="text-xs ">
 Formularios y registros
 </p>
 </RouterLink>
 <button
 type="button"
 aria-label="Expandir o contraer contenido"
 class="rounded-md border px-2 py-1 "
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
 class="block rounded-lg border px-2 py-1.5 text-xs transition"
 :class="
 contenidoActivo(schema.id)
 ? ' '
 : ' '
 "
 >
 <p class="font-semibold">{{ schema.title }}</p>
 <p :class="contenidoActivo(schema.id) ? '' : ''">
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
 <p class="px-1 text-[11px] font-black uppercase tracking-wide ">Documentos</p>
 <RouterLink
 v-for="schema in schemasDocumento"
 :key="`document-link-${schema.id}`"
 :to="toContenidoLink(schema.id)"
 class="block rounded-lg border px-2 py-1.5 text-xs transition"
 :class="
 contenidoActivo(schema.id)
 ? ' '
 : ' '
 "
 >
 <p class="font-semibold">{{ schema.title }}</p>
 <p :class="contenidoActivo(schema.id) ? '' : ''">
 document · {{ schema.collectionName }}
 </p>
 </RouterLink>
 </div>

 <div
 v-if="modoDesarrollador"
 class="rounded-xl border p-3 transition "
 >
 <div class="flex items-start justify-between gap-2">
 <RouterLink :to="`${basePath}/schemas`" class="min-w-0 flex-1">
 <p class="text-sm font-black">Esquemas</p>
 <p class="text-xs ">
 Edición de esquemas
 </p>
 </RouterLink>
 <button
 type="button"
 aria-label="Expandir o contraer esquemas"
 class="rounded-md border px-2 py-1 "
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
 class="block rounded-lg border px-2 py-1.5 text-xs transition"
 :class="
 esquemaActivo(schema.id)
 ? ' '
 : ' '
 "
 >
 <p class="font-semibold">{{ schema.title }}</p>
 <p :class="esquemaActivo(schema.id) ? '' : ''">
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
 class="block rounded-xl border p-3 transition"
 :class="
 activoModulo(`${basePath}/users`)
 ? ' '
 : ' '
 "
 >
 <p class="text-sm font-black">Usuarios</p>
 <p class="text-xs" :class="activoModulo(`${basePath}/users`) ? '' : ''">
 Roles y último ingreso
 </p>
 </RouterLink>
 </div>

 <div class="cms-sidebar-footer">
 <div class="flex items-center gap-2 rounded-xl border p-2">
 <button
 type="button"
 class="min-w-0 flex-1 rounded-md px-3 py-2 text-left text-xs "
 >
 <p class="font-semibold ">Cuenta actual</p>
 <p class="truncate ">{{ emailActual }}</p>
 </button>
 <button
 type="button"
 aria-label="Cerrar sesión"
 class="rounded-md border px-2 py-2 "
 @click="cerrarSesionActual"
 >
 <span class="material-symbols-outlined text-lg">logout</span>
 </button>
 </div>
 </div>
 </aside>

 <section
 class="cms-content-fixed-height min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8"
 :class="panelAbierto ? 'cms-content-with-open-sidebar' : ''"
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0");

.material-symbols-outlined {
 font-variation-settings:
 "FILL" 0,
 "wght" 400,
 "GRAD" 0,
 "opsz" 24;
}

.cms-root-fixed-height {
 height: 100vh;
 height: 100dvh;
 min-height: 100vh;
 min-height: 100dvh;
 overflow: hidden;
}

.cms-sidebar-fixed-height {
 height: 100vh;
 height: 100dvh;
 max-height: 100vh;
 max-height: 100dvh;
 overflow: hidden;
}

.cms-sidebar-panel {
 display: flex;
 min-height: 0;
 flex-direction: column;
 padding: 0 !important;
 transform: translateX(-100%);
 transition: transform 200ms ease-in-out;
}

.cms-sidebar-open {
 transform: translateX(0);
}

.cms-sidebar-closed {
 transform: translateX(-100%);
}

.cms-content-fixed-height {
 height: 100%;
 overflow-y: auto;
 transition: padding-left 200ms ease-in-out;
}

@media (min-width: 1024px) {
 .cms-content-with-open-sidebar {
 padding-left: 360px;
 }
}

.cms-sidebar-scroll {
 margin-top: 0.75rem;
 flex: 1;
 min-height: 0;
 overflow-y: auto;
}

.cms-sidebar-header {
 padding: 0.75rem;
}

.cms-sidebar-footer {
 margin-top: 0.75rem;
 border-top: 1px solid rgb(226 232 240);
 padding-top: 0.75rem;
}
</style>
