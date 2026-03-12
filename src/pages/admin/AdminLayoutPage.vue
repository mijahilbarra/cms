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
const schemasDiccionario = computed(() =>
  schemasContenido.value.filter((schema) => schema.storageType === "dictionary")
);

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
    return modoDesarrollador.value ? "Esquemas" : "Contenido";
  }

  if (route.path.startsWith(`${basePath}/users`)) {
    return modoDesarrollador.value ? "Usuarios" : "Contenido";
  }

  return "Dashboard";
});

const mainStyle: CSSProperties = {
  height: "100dvh",
  minHeight: "100dvh",
  overflow: "hidden",
  backgroundColor: "#f3f4f6",
  color: "#111827"
};

const openSidebarButtonStyle: CSSProperties = {
  position: "fixed",
  left: "0",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: "50",
  border: "1px solid #d1d5db",
  borderLeft: "0",
  borderRadius: "0 10px 10px 0",
  backgroundColor: "#ffffff",
  color: "#111827",
  padding: "10px 8px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)"
};

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: "0",
  zIndex: "30",
  backgroundColor: "rgba(17,24,39,0.30)"
};

const sidebarStyle: CSSProperties = {
  position: "fixed",
  inset: "0 auto 0 0",
  width: "320px",
  zIndex: "40",
  display: "flex",
  flexDirection: "column",
  minHeight: "0",
  height: "100dvh",
  maxHeight: "100dvh",
  overflow: "hidden",
  backgroundColor: "#ffffff",
  color: "#111827",
  borderRight: "1px solid #d1d5db",
  boxShadow: "0 10px 30px rgba(0,0,0,0.16)"
};

const contentStyle = computed<CSSProperties>(() => ({
  height: "100%",
  overflowY: "auto",
  transition: "padding-left 200ms ease-in-out",
  paddingLeft: panelAbierto.value && esPantallaGrande.value ? "360px" : "0px"
}));

const buttonBaseStyle: CSSProperties = {
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: "#111827",
  padding: "4px 8px"
};

function linkStyle(active: boolean): CSSProperties {
  return {
    display: "block",
    border: active ? "1px solid #111827" : "1px solid #d1d5db",
    borderRadius: "10px",
    padding: "6px 8px",
    textDecoration: "none",
    fontSize: "12px",
    backgroundColor: active ? "#111827" : "#ffffff",
    color: active ? "#ffffff" : "#111827"
  };
}

function metaStyle(active: boolean): CSSProperties {
  return {
    color: active ? "rgba(255,255,255,0.82)" : "#6b7280"
  };
}
</script>

<template>
  <main :style="mainStyle">
    <button
      v-show="!panelAbierto"
      type="button"
      aria-label="Abrir sidebar"
      :style="openSidebarButtonStyle"
      @click="togglePanel"
    >
      ☰
    </button>

    <div
      v-if="panelAbierto && !esPantallaGrande"
      :style="overlayStyle"
      @click="cerrarPanel"
    ></div>

    <aside v-show="panelAbierto" :style="sidebarStyle">
      <div class="mb-3 p-3 lg:mb-0" style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
        <h2 class="text-sm font-black uppercase tracking-wide">{{ tituloPanel }}</h2>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button type="button" aria-label="Ir a inicio" :style="buttonBaseStyle" @click="irAInicio">Inicio</button>
          <button type="button" aria-label="Cerrar sidebar" :style="buttonBaseStyle" @click="cerrarPanel">Cerrar</button>
        </div>
      </div>

      <div class="px-3">
        <button
          type="button"
          class="mb-2"
          style="width: 100%; display: flex; align-items: center; justify-content: space-between; border: 1px solid #d1d5db; border-radius: 10px; background: #fff; color: #111827; padding: 8px 12px; font-size: 12px; font-weight: 600;"
          @click="toggleModoDesarrollador"
        >
          <span>Modo desarrollador</span>
          <span
            style="border-radius: 999px; padding: 2px 8px; font-size: 10px; font-weight: 700; text-transform: uppercase;"
            :style="{ backgroundColor: modoDesarrollador ? 'rgba(16,185,129,0.18)' : 'rgba(107,114,128,0.16)', color: modoDesarrollador ? '#047857' : '#6b7280' }"
          >
            {{ modoDesarrollador ? "Activo" : "Oculto" }}
          </span>
        </button>
      </div>

      <div class="mt-3 flex-1 min-h-0 space-y-2 overflow-y-auto">
        <div style="border: 1px solid #d1d5db; border-radius: 12px; padding: 12px;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
            <RouterLink :to="`${basePath}/content`" class="min-w-0 flex-1">
              <p class="text-sm font-black">Contenido</p>
              <p class="text-xs" style="color: #6b7280;">Formularios y registros</p>
            </RouterLink>
            <button type="button" aria-label="Expandir o contraer contenido" :style="buttonBaseStyle" @click="toggleContenido">
              {{ contenidoExpandido ? "-" : "+" }}
            </button>
          </div>

          <div v-if="contenidoExpandido" class="mt-3 space-y-1 border-t pt-3">
            <RouterLink
              v-for="schema in schemasDiccionario"
              :key="schema.id"
              :to="toContenidoLink(schema.id)"
              :style="linkStyle(contenidoActivo(schema.id))"
            >
              <p class="font-semibold">{{ schema.title }}</p>
              <p :style="metaStyle(contenidoActivo(schema.id))">{{ schema.storageType }} · {{ schema.collectionName }}</p>
            </RouterLink>

            <p v-if="cargandoSchemasContenido" class="rounded-lg border px-2 py-1.5 text-xs">Cargando elementos...</p>
            <p v-else-if="!schemasDiccionario.length" class="rounded-lg border px-2 py-1.5 text-xs">No hay diccionarios configurados.</p>
          </div>
        </div>

        <div v-if="schemasDocumento.length" class="space-y-1 rounded-xl border p-3">
          <p class="px-1 text-[11px] font-black uppercase tracking-wide" style="color: #6b7280;">Documentos</p>
          <RouterLink
            v-for="schema in schemasDocumento"
            :key="`document-link-${schema.id}`"
            :to="toContenidoLink(schema.id)"
            :style="linkStyle(contenidoActivo(schema.id))"
          >
            <p class="font-semibold">{{ schema.title }}</p>
            <p :style="metaStyle(contenidoActivo(schema.id))">document · {{ schema.collectionName }}</p>
          </RouterLink>
        </div>

        <div v-if="modoDesarrollador" style="border: 1px solid #d1d5db; border-radius: 12px; padding: 12px;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
            <RouterLink :to="`${basePath}/schemas`" class="min-w-0 flex-1">
              <p class="text-sm font-black">Esquemas</p>
              <p class="text-xs" style="color: #6b7280;">Edición de esquemas</p>
            </RouterLink>
            <button type="button" aria-label="Expandir o contraer esquemas" :style="buttonBaseStyle" @click="toggleEsquemas">
              {{ esquemasExpandido ? "-" : "+" }}
            </button>
          </div>

          <div v-if="esquemasExpandido" class="mt-3 space-y-1 border-t pt-3">
            <RouterLink
              v-for="schema in schemasContenido"
              :key="`schema-edit-${schema.id}`"
              :to="toEsquemaLink(schema.id)"
              :style="linkStyle(esquemaActivo(schema.id))"
            >
              <p class="font-semibold">{{ schema.title }}</p>
              <p :style="metaStyle(esquemaActivo(schema.id))">{{ schema.storageType }} · {{ schema.collectionName }}</p>
            </RouterLink>
            <p v-if="cargandoSchemasContenido" class="rounded-lg border px-2 py-1.5 text-xs">Cargando elementos...</p>
          </div>
        </div>

        <RouterLink v-if="modoDesarrollador" :to="`${basePath}/users`" :style="linkStyle(activoModulo(`${basePath}/users`))">
          <p class="text-sm font-black">Usuarios</p>
          <p class="text-xs" :style="metaStyle(activoModulo(`${basePath}/users`))">Roles y último ingreso</p>
        </RouterLink>
      </div>

      <div style="margin-top: 12px; border-top: 1px solid #d1d5db; padding-top: 12px;">
        <div class="flex items-center gap-2 rounded-xl border p-2">
          <button
            type="button"
            class="min-w-0 flex-1 rounded-md px-3 py-2 text-left text-xs"
            style="border: 1px solid #d1d5db; background: #fff; color: #111827;"
          >
            <p class="font-semibold">Cuenta actual</p>
            <p class="truncate" style="color: #6b7280;">{{ emailActual }}</p>
          </button>
          <button type="button" aria-label="Cerrar sesión" :style="buttonBaseStyle" @click="cerrarSesionActual">Salir</button>
        </div>
      </div>
    </aside>

    <section class="min-w-0 h-full overflow-y-auto px-5 py-16 transition-all duration-200 lg:px-8 lg:py-8" :style="contentStyle">
      <div class="mx-auto w-full max-w-7xl space-y-6">
        <section>
          <h1 class="text-3xl font-black">Dashboard</h1>
          <p class="mt-2 text-sm">Esquema = campos del formulario. Formulario = datos que completa el usuario final.</p>
        </section>

        <section>
          <h2 class="text-xl font-black">{{ tituloSeccion }}</h2>
          <div class="mt-3">
            <RouterView />
          </div>
        </section>
      </div>
    </section>
  </main>
</template>
