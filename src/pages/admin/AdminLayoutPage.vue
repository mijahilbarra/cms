<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import AdminSidebar from "./components/AdminSidebar.vue";
import { usuarioActual } from "../../firebase/auth";
import { getCmsFirebaseServices } from "../../firebase/context";
import { getCmsRouteConfig } from "../../runtime/cmsConfig";
import { listarSchemasContenido } from "../../services/contentSchemaService";
import type { CmsContentSchema } from "../../types/contentSchema";

const route = useRoute();
const router = useRouter();
const { basePath } = getCmsRouteConfig();
const DEVELOPER_MODE_STORAGE_KEY = "cms-developer-mode";

const schemasContenido = ref<CmsContentSchema[]>([]);
const cargandoSchemasContenido = ref(false);
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
    if (route.path.startsWith(`${basePath}/content`) || route.path.startsWith(`${basePath}/schemas`)) {
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

function handleSchemasUpdated(): void {
  void cargarSchemasContenido();
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

const schemasDocumento = computed(() => schemasContenido.value.filter((schema) => schema.storageType === "document"));
const schemasDiccionario = computed(() =>
  schemasContenido.value.filter((schema) => schema.storageType === "dictionary")
);

const contenidoSectionClass = computed(() => [
  "h-full overflow-y-auto pr-6 pb-6 pt-6 transition-[padding-left] duration-[180ms] ease-in-out",
  panelAbierto.value && esPantallaGrande.value ? "pl-[340px]" : "pl-0"
]);
</script>

<template>
  <main class="h-dvh min-h-dvh overflow-hidden bg-gray-100 font-sans text-gray-900">
    <AdminSidebar
      v-model:panel-abierto="panelAbierto"
      v-model:modo-desarrollador="modoDesarrollador"
      :es-pantalla-grande="esPantallaGrande"
      :titulo-panel="tituloPanel"
      :base-path="basePath"
      :cargando-schemas-contenido="cargandoSchemasContenido"
      :schemas-diccionario="schemasDiccionario"
      :schemas-documento="schemasDocumento"
      :schemas-contenido="schemasContenido"
      :email-actual="emailActual"
    />

    <section :class="contenidoSectionClass">
      <div class="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
        <section>
          <h1 class="m-0 text-[30px] font-extrabold">Dashboard</h1>
          <p class="mb-0 mt-2 text-sm text-gray-600">
            Esquema = campos del formulario. Formulario = datos que completa el usuario final.
          </p>
        </section>

        <section>
          <h2 class="mb-2.5 mt-0 text-[22px] font-extrabold">{{ tituloSeccion }}</h2>
          <div class="rounded-[14px] border border-gray-200 bg-white p-4">
            <RouterView />
          </div>
        </section>
      </div>
    </section>
  </main>
</template>
