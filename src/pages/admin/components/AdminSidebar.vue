<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink, useRoute, useRouter, type RouteLocationRaw } from "vue-router";
import { cerrarSesion } from "../../../firebase/auth";
import { getCmsRouteConfig } from "../../../runtime/cmsConfig";
import type { CmsContentSchema } from "../../../types/contentSchema";

type SidebarLink = RouteLocationRaw;

interface AdminSidebarProps {
  esPantallaGrande: boolean;
  tituloPanel: string;
  basePath: string;
  cargandoSchemasContenido: boolean;
  schemasDiccionario: CmsContentSchema[];
  schemasDocumento: CmsContentSchema[];
  schemasContenido: CmsContentSchema[];
  emailActual: string;
}

const props = defineProps<AdminSidebarProps>();

const route = useRoute();
const router = useRouter();
const { loginPath, homePath } = getCmsRouteConfig();

const sidebarEnSalida = ref(false);
const contenidoExpandido = ref(true);
const esquemasExpandido = ref(true);

const panelAbiertoModel = defineModel<boolean>("panelAbierto", { required: true });
const modoDesarrolladorModel = defineModel<boolean>("modoDesarrollador", { required: true });

watch(
  () => route.fullPath,
  () => {
    if (route.path.startsWith(`${props.basePath}/content`)) {
      contenidoExpandido.value = true;
    }

    if (route.path.startsWith(`${props.basePath}/schemas`)) {
      esquemasExpandido.value = true;
    }
  }
);

const buttonBaseClass =
  "cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900";

function linkClass(active: boolean): string {
  return [
    "block rounded-[10px] border px-2.5 py-2 text-xs no-underline",
    active ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-900"
  ].join(" ");
}

function metaClass(active: boolean): string {
  return active ? "mt-0.5 text-white/80" : "mt-0.5 text-gray-500";
}

function devBadgeClass(active: boolean): string {
  return [
    "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
    active ? "bg-emerald-500/20 text-emerald-700" : "bg-gray-500/15 text-gray-500"
  ].join(" ");
}

function handleSidebarBeforeLeave(): void {
  sidebarEnSalida.value = true;
}

function handleSidebarAfterLeave(): void {
  sidebarEnSalida.value = false;
}

function activoModulo(path: string): boolean {
  return route.path.startsWith(path);
}

function toContenidoLink(schemaId: string): SidebarLink {
  return {
    path: `${props.basePath}/content`,
    query: { schema: schemaId }
  };
}

function toEsquemaLink(schemaId: string): SidebarLink {
  return {
    path: `${props.basePath}/schemas`,
    query: { schema: schemaId }
  };
}

function contenidoActivo(schemaId: string): boolean {
  if (!route.path.startsWith(`${props.basePath}/content`)) {
    return false;
  }

  const currentSchema = typeof route.query.schema === "string" ? route.query.schema : "";
  if (currentSchema) {
    return currentSchema === schemaId;
  }

  return props.schemasContenido[0]?.id === schemaId;
}

function esquemaActivo(schemaId: string): boolean {
  if (!route.path.startsWith(`${props.basePath}/schemas`)) {
    return false;
  }

  const currentSchema = typeof route.query.schema === "string" ? route.query.schema : "";
  if (currentSchema) {
    return currentSchema === schemaId;
  }

  return props.schemasContenido[0]?.id === schemaId;
}

function togglePanel(): void {
  panelAbiertoModel.value = !panelAbiertoModel.value;
}

function cerrarPanel(): void {
  panelAbiertoModel.value = false;
}

function toggleContenido(): void {
  contenidoExpandido.value = !contenidoExpandido.value;
}

function toggleEsquemas(): void {
  esquemasExpandido.value = !esquemasExpandido.value;
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
</script>

<template>
  <button
    v-show="!panelAbiertoModel && !sidebarEnSalida"
    type="button"
    aria-label="Abrir sidebar"
    class="fixed left-0 top-1/2 z-[60] -translate-y-1/2 cursor-pointer rounded-r-xl border border-l-0 border-gray-300 bg-white px-[9px] py-[10px] text-gray-900 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
    @click="togglePanel"
  >
    ☰
  </button>

  <Transition
    enter-active-class="transition-opacity duration-[180ms] ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-[180ms] ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="panelAbiertoModel && !props.esPantallaGrande" class="fixed inset-0 z-40 bg-white" @click="cerrarPanel"></div>
  </Transition>

  <Transition
    enter-active-class="transition-all duration-[220ms] ease-out"
    enter-from-class="-translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition-all duration-[220ms] ease-out"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="-translate-x-full opacity-0"
    @before-leave="handleSidebarBeforeLeave"
    @after-leave="handleSidebarAfterLeave"
    @leave-cancelled="handleSidebarAfterLeave"
  >
    <aside
      v-if="panelAbiertoModel"
      class="fixed bottom-0 left-0 top-0 z-50 h-dvh w-80 border-r border-gray-200 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
    >
      <div class="flex h-full flex-col gap-3 p-3">
        <div class="flex items-center justify-between gap-2">
          <h2 class="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.05em]">
            {{ props.tituloPanel }}
          </h2>
          <div class="flex items-center gap-2">
            <button type="button" aria-label="Ir a inicio" :class="buttonBaseClass" @click="irAInicio">Inicio</button>
            <button type="button" aria-label="Cerrar sidebar" :class="buttonBaseClass" @click="cerrarPanel">Cerrar</button>
          </div>
        </div>

        <button
          type="button"
          class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900"
          @click="modoDesarrolladorModel = !modoDesarrolladorModel"
        >
          <span>Modo desarrollador</span>
          <span :class="devBadgeClass(modoDesarrolladorModel)">
            {{ modoDesarrolladorModel ? "Activo" : "Oculto" }}
          </span>
        </button>

        <div class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
          <div class="rounded-xl border border-gray-200 bg-white p-3">
            <div class="flex items-start justify-between gap-2">
              <RouterLink :to="`${props.basePath}/content`" class="min-w-0 flex-1 text-inherit no-underline">
                <p class="m-0 text-sm font-extrabold">Contenido</p>
                <p class="mt-1 mb-0 text-xs text-gray-500">Formularios y registros</p>
              </RouterLink>
              <button
                type="button"
                aria-label="Expandir o contraer contenido"
                :class="buttonBaseClass"
                @click="toggleContenido"
              >
                {{ contenidoExpandido ? "-" : "+" }}
              </button>
            </div>

            <div v-if="contenidoExpandido" class="mt-2.5 flex flex-col gap-1.5 border-t border-gray-200 pt-2.5">
              <RouterLink
                v-for="schema in props.schemasDiccionario"
                :key="schema.id"
                :to="toContenidoLink(schema.id)"
                :class="linkClass(contenidoActivo(schema.id))"
              >
                <p class="m-0 font-bold">{{ schema.title }}</p>
                <p :class="metaClass(contenidoActivo(schema.id))">{{ schema.storageType }} · {{ schema.collectionName }}</p>
              </RouterLink>

              <p v-if="props.cargandoSchemasContenido" class="m-0 text-xs text-gray-500">Cargando elementos...</p>
              <p v-else-if="!props.schemasDiccionario.length" class="m-0 text-xs text-gray-500">No hay diccionarios configurados.</p>
            </div>
          </div>

          <div v-if="props.schemasDocumento.length" class="rounded-xl border border-gray-200 bg-white p-3">
            <p class="mb-2 m-0 text-[11px] font-extrabold uppercase text-gray-500">Documentos</p>
            <div class="flex flex-col gap-1.5">
              <RouterLink
                v-for="schema in props.schemasDocumento"
                :key="`document-link-${schema.id}`"
                :to="toContenidoLink(schema.id)"
                :class="linkClass(contenidoActivo(schema.id))"
              >
                <p class="m-0 font-bold">{{ schema.title }}</p>
                <p :class="metaClass(contenidoActivo(schema.id))">document · {{ schema.collectionName }}</p>
              </RouterLink>
            </div>
          </div>

          <div v-if="modoDesarrolladorModel" class="rounded-xl border border-gray-200 bg-white p-3">
            <div class="flex items-start justify-between gap-2">
              <RouterLink :to="`${props.basePath}/schemas`" class="min-w-0 flex-1 text-inherit no-underline">
                <p class="m-0 text-sm font-extrabold">Esquemas</p>
                <p class="mt-1 mb-0 text-xs text-gray-500">Edición de esquemas</p>
              </RouterLink>
              <button
                type="button"
                aria-label="Expandir o contraer esquemas"
                :class="buttonBaseClass"
                @click="toggleEsquemas"
              >
                {{ esquemasExpandido ? "-" : "+" }}
              </button>
            </div>

            <div v-if="esquemasExpandido" class="mt-2.5 flex flex-col gap-1.5 border-t border-gray-200 pt-2.5">
              <RouterLink
                v-for="schema in props.schemasContenido"
                :key="`schema-edit-${schema.id}`"
                :to="toEsquemaLink(schema.id)"
                :class="linkClass(esquemaActivo(schema.id))"
              >
                <p class="m-0 font-bold">{{ schema.title }}</p>
                <p :class="metaClass(esquemaActivo(schema.id))">{{ schema.storageType }} · {{ schema.collectionName }}</p>
              </RouterLink>
              <p v-if="props.cargandoSchemasContenido" class="m-0 text-xs text-gray-500">Cargando elementos...</p>
            </div>
          </div>

          <RouterLink
            v-if="modoDesarrolladorModel"
            :to="`${props.basePath}/users`"
            :class="linkClass(activoModulo(`${props.basePath}/users`))"
          >
            <p class="m-0 text-sm font-extrabold">Usuarios</p>
            <p :class="metaClass(activoModulo(`${props.basePath}/users`))">Roles y último ingreso</p>
          </RouterLink>
        </div>

        <div class="mt-auto border-t border-gray-200 pt-3">
          <div class="flex items-center gap-2 rounded-xl border border-gray-200 p-2">
            <button type="button" class="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-left text-gray-900">
              <p class="m-0 text-xs font-bold">Cuenta actual</p>
              <p class="mt-1 mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500">
                {{ props.emailActual }}
              </p>
            </button>
            <button type="button" aria-label="Cerrar sesión" :class="buttonBaseClass" @click="cerrarSesionActual">Salir</button>
          </div>
        </div>
      </div>
    </aside>
  </Transition>
</template>
