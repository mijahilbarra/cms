<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VIEW_TEMPLATES } from "../../schemas";
import { uploadImageWithCompression } from "../../firebase/storage";
import { guardarSchemaView, obtenerSchemaView } from "../../services/viewSchemaService";
import type { RepeaterField, SchemaField, ViewSchema } from "../../types/viewSchema";

type RepeaterItem = Record<string, string>;

const schema = ref<ViewSchema | null>(null);
const viewIdActual = ref(VIEW_TEMPLATES[0]?.id ?? "landingPage");
const tituloViewActual = ref(VIEW_TEMPLATES[0]?.titulo ?? "Landing");
const guardandoSchema = ref(false);
const subiendoImagen = ref(false);
const campoSubiendo = ref("");
const mensajeSchema = ref("");
const errorSchema = ref("");

onMounted(async () => {
  await cargarSchema();
});

async function cargarSchema(): Promise<void> {
  const response = await obtenerSchemaView(viewIdActual.value);
  schema.value = response.schema;
}

async function guardarSchema(): Promise<void> {
  if (!schema.value) {
    return;
  }

  errorSchema.value = "";
  mensajeSchema.value = "";
  guardandoSchema.value = true;

  try {
    await guardarSchemaView(viewIdActual.value, schema.value);
    mensajeSchema.value = `Vista ${tituloViewActual.value} guardada en Firestore.`;
  } catch {
    errorSchema.value = "No se pudo guardar el esquema.";
  } finally {
    guardandoSchema.value = false;
  }
}

async function cambiarView(viewId: string): Promise<void> {
  viewIdActual.value = viewId;
  tituloViewActual.value = VIEW_TEMPLATES.find((item) => item.id === viewId)?.titulo ?? viewId;
  mensajeSchema.value = "";
  errorSchema.value = "";
  schema.value = null;
  await cargarSchema();
}

function esRepeater(field: SchemaField): boolean {
  return esTipo(field, "json") && Boolean(field.repeater);
}

function esTipo(field: SchemaField, tipo: string): boolean {
  return normalizarTipo(field.type) === tipo;
}

function esTipoRepeater(field: RepeaterField, tipo: RepeaterField["type"]): boolean {
  return normalizarTipo(field.type) === tipo;
}

function esSelect(field: SchemaField, sectionKey?: string): boolean {
  return esTipo(field, "select") || opcionesSelect(field, sectionKey).length > 0;
}

function opcionesSelect(field: SchemaField, sectionKey?: string): string[] {
  if (Array.isArray(field.options) && field.options.length > 0) {
    return field.options.filter((option) => typeof option === "string");
  }

  if (viewIdActual.value === "siteTheme" && sectionKey === "aplicacion" && schema.value?.base?.fields) {
    return Object.keys(schema.value.base.fields);
  }

  return [];
}

function normalizarTipo(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function leerRepeater(field: SchemaField): RepeaterItem[] {
  if (!field.value?.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(field.value);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => normalizarItem(item, field.repeater?.fields ?? []));
    }
  } catch {
    return [];
  }
  return [];
}

function agregarItem(field: SchemaField): void {
  const items = leerRepeater(field);
  const nuevoItem = crearItemVacio(field.repeater?.fields ?? []);
  items.push(nuevoItem);
  field.value = JSON.stringify(items, null, 2);
}

function eliminarItem(field: SchemaField, index: number): void {
  const items = leerRepeater(field);
  items.splice(index, 1);
  field.value = JSON.stringify(items, null, 2);
}

function actualizarItem(field: SchemaField, index: number, key: string, value: string): void {
  const items = leerRepeater(field);
  if (!items[index]) {
    return;
  }
  items[index][key] = value;
  field.value = JSON.stringify(items, null, 2);
}

function normalizarItem(item: unknown, fields: RepeaterField[]): RepeaterItem {
  const base = crearItemVacio(fields);
  if (!item || typeof item !== "object") {
    return base;
  }

  for (const field of fields) {
    const value = (item as Record<string, unknown>)[field.key];
    base[field.key] = typeof value === "string" ? value : "";
  }
  return base;
}

function crearItemVacio(fields: RepeaterField[]): RepeaterItem {
  return fields.reduce((accumulator, field) => {
    accumulator[field.key] = "";
    return accumulator;
  }, {} as RepeaterItem);
}

async function subirImagenCampo(field: SchemaField, event: Event, key: string): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) {
    return;
  }

  errorSchema.value = "";
  mensajeSchema.value = "";
  subiendoImagen.value = true;
  campoSubiendo.value = key;

  try {
    const nombre = limpiarNombreArchivo(file.name);
    const url = await uploadImageWithCompression(
      `views/${viewIdActual.value}/${Date.now()}-${nombre}`,
      file,
      {
        maxWidth: 1600,
        maxHeight: 1600,
        targetSizeKb: 900,
        quality: 0.82
      }
    );
    field.value = url;
    mensajeSchema.value = "Imagen subida correctamente.";
  } catch {
    errorSchema.value = "No se pudo subir la imagen.";
  } finally {
    input.value = "";
    subiendoImagen.value = false;
    campoSubiendo.value = "";
  }
}

async function subirImagenItem(
  field: SchemaField,
  itemIndex: number,
  columnKey: string,
  event: Event,
  key: string
): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) {
    return;
  }

  errorSchema.value = "";
  mensajeSchema.value = "";
  subiendoImagen.value = true;
  campoSubiendo.value = key;

  try {
    const nombre = limpiarNombreArchivo(file.name);
    const url = await uploadImageWithCompression(
      `views/${viewIdActual.value}/${Date.now()}-${nombre}`,
      file,
      {
        maxWidth: 1600,
        maxHeight: 1600,
        targetSizeKb: 900,
        quality: 0.82
      }
    );
    actualizarItem(field, itemIndex, columnKey, url);
    mensajeSchema.value = "Imagen subida correctamente.";
  } catch {
    errorSchema.value = "No se pudo subir la imagen.";
  } finally {
    input.value = "";
    subiendoImagen.value = false;
    campoSubiendo.value = "";
  }
}

function limpiarNombreArchivo(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-");
}
</script>

<template>
  <section class="grid gap-5 lg:grid-cols-[260px,1fr]">
    <aside class="rounded-2xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-4">
      <h3 class="text-sm font-black uppercase tracking-wide text-[var(--pw-text)]">Views</h3>
      <p class="mt-1 text-xs text-[var(--pw-muted-text)]">Subpanel de schemas por vista.</p>

      <div class="mt-4 space-y-2">
        <button
          v-for="view in VIEW_TEMPLATES"
          :key="view.id"
          type="button"
          class="w-full rounded-lg border px-3 py-2 text-left transition"
          :class="
            view.id === viewIdActual
              ? 'border-[var(--pw-primary)] bg-[var(--pw-primary)] text-[var(--pw-primary-text)]'
              : 'border-[var(--pw-border)] bg-[var(--pw-background)] text-[var(--pw-text)] hover:opacity-80'
          "
          @click="cambiarView(view.id)"
        >
          <p class="text-sm font-semibold">{{ view.titulo }}</p>
          <p class="mt-1 text-xs" :class="view.id === viewIdActual ? 'text-[var(--pw-primary-text)]/80' : 'text-[var(--pw-muted-text)]'">
            {{ view.descripcion }}
          </p>
        </button>
      </div>
    </aside>

    <article class="rounded-2xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5">
      <h3 class="text-xl font-black text-[var(--pw-text)]">Vista: {{ tituloViewActual }}</h3>
      <p class="mt-1 text-sm text-[var(--pw-muted-text)]">
        Documento: <code>{{ viewIdActual }}</code>. `value` es la fuente actual de contenido en la vista pública.
      </p>

      <div v-if="!schema" class="mt-4 text-sm text-[var(--pw-muted-text)]">Cargando schema...</div>

      <form v-else class="mt-5 space-y-6" @submit.prevent="guardarSchema">
        <section
          v-for="(section, sectionKey) in schema"
          :key="sectionKey"
          class="rounded-xl border border-[var(--pw-border)] bg-[var(--pw-background)] p-4"
        >
          <h4 class="text-sm font-black uppercase tracking-wide text-[var(--pw-text)]">{{ section.label }}</h4>
          <p v-if="section.description" class="mt-1 text-xs text-[var(--pw-muted-text)]">{{ section.description }}</p>

          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <div v-for="(field, fieldKey) in section.fields" :key="fieldKey" class="space-y-2">
              <label class="block text-xs font-semibold uppercase tracking-wide text-[var(--pw-muted-text)]">
                {{ field.label }}
              </label>

              <template v-if="esRepeater(field)">
                <div class="space-y-3 rounded-lg border border-[var(--pw-border)] bg-[var(--pw-surface)] p-3">
                  <article
                    v-for="(item, itemIndex) in leerRepeater(field)"
                    :key="itemIndex"
                    class="space-y-2 rounded-md border border-[var(--pw-border)] bg-[var(--pw-background)] p-3"
                  >
                    <div
                      v-for="column in field.repeater?.fields || []"
                      :key="column.key"
                      class="space-y-1"
                    >
                      <label class="block text-xs font-semibold text-[var(--pw-muted-text)]">{{ column.label }}</label>

                      <div v-if="esTipoRepeater(column, 'url')" class="space-y-2">
                        <input
                          :value="item[column.key]"
                          type="url"
                          :placeholder="column.placeholder || ''"
                          class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
                          :disabled="subiendoImagen"
                          @input="
                            actualizarItem(
                              field,
                              itemIndex,
                              column.key,
                              ($event.target as HTMLInputElement).value
                            )
                          "
                        />
                        <input
                          type="file"
                          accept="image/*"
                          class="block w-full text-xs text-[var(--pw-muted-text)] disabled:opacity-60"
                          :disabled="subiendoImagen"
                          @change="
                            subirImagenItem(
                              field,
                              itemIndex,
                              column.key,
                              $event,
                              `${String(sectionKey)}.${String(fieldKey)}.${itemIndex}.${column.key}`
                            )
                          "
                        />
                        <p
                          v-if="subiendoImagen && campoSubiendo === `${String(sectionKey)}.${String(fieldKey)}.${itemIndex}.${column.key}`"
                          class="text-xs text-[var(--pw-muted-text)]"
                        >
                          Subiendo imagen...
                        </p>
                        <img
                          v-if="item[column.key]"
                          :src="item[column.key]"
                          :alt="`Vista previa ${column.label}`"
                          class="h-20 w-20 rounded-md border border-[var(--pw-border)] object-cover"
                        />
                      </div>

                      <textarea
                        v-else-if="esTipoRepeater(column, 'textarea')"
                        :value="item[column.key]"
                        rows="3"
                        class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
                        @input="
                          actualizarItem(
                            field,
                            itemIndex,
                            column.key,
                            ($event.target as HTMLTextAreaElement).value
                          )
                        "
                      ></textarea>

                      <input
                        v-else
                        :value="item[column.key]"
                        type="text"
                        :placeholder="column.placeholder || ''"
                        class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
                        :disabled="subiendoImagen"
                        @input="
                          actualizarItem(
                            field,
                            itemIndex,
                            column.key,
                            ($event.target as HTMLInputElement).value
                          )
                        "
                      />
                    </div>

                    <button
                      type="button"
                      class="rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700"
                      @click="eliminarItem(field, itemIndex)"
                    >
                      Eliminar {{ field.repeater?.itemLabel || "item" }}
                    </button>
                  </article>

                  <button
                    type="button"
                    class="rounded-md border border-[var(--pw-border)] px-3 py-1.5 text-sm font-semibold text-[var(--pw-muted-text)]"
                    @click="agregarItem(field)"
                  >
                    Agregar {{ field.repeater?.itemLabel || "item" }}
                  </button>
                </div>
              </template>

              <select
                v-else-if="esSelect(field, sectionKey as string)"
                v-model="field.value"
                class="block min-h-11 w-full rounded-md border border-[var(--pw-border)] bg-[var(--pw-surface)] px-3 py-2 text-sm text-[var(--pw-text)] outline-none focus:border-[var(--pw-accent)]"
              >
                <option v-for="option in opcionesSelect(field, sectionKey as string)" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>

              <input
                v-else-if="esTipo(field, 'text')"
                v-model="field.value"
                type="text"
                :placeholder="field.placeholder || ''"
                class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
              />
              <div v-else-if="esTipo(field, 'url')" class="space-y-2">
                <input
                  v-model="field.value"
                  type="url"
                  :placeholder="field.placeholder || ''"
                  class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
                />
                <input
                  type="file"
                  accept="image/*"
                  class="block w-full text-xs text-[var(--pw-muted-text)] disabled:opacity-60"
                  :disabled="subiendoImagen"
                  @change="subirImagenCampo(field, $event, `${String(sectionKey)}.${String(fieldKey)}`)"
                />
                <p
                  v-if="subiendoImagen && campoSubiendo === `${String(sectionKey)}.${String(fieldKey)}`"
                  class="text-xs text-[var(--pw-muted-text)]"
                >
                  Subiendo imagen...
                </p>
                <img
                  v-if="field.value"
                  :src="field.value"
                  :alt="`Vista previa ${field.label}`"
                  class="h-20 w-20 rounded-md border border-[var(--pw-border)] object-cover"
                />
              </div>

              <textarea
                v-else-if="esTipo(field, 'textarea') || esTipo(field, 'json')"
                v-model="field.value"
                :placeholder="field.placeholder || ''"
                :rows="esTipo(field, 'json') ? 8 : 3"
                class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
              ></textarea>

              <input
                v-else-if="esTipo(field, 'color')"
                v-model="field.value"
                type="color"
                class="h-10 w-24 rounded-md border border-[var(--pw-border)] bg-[var(--pw-surface)] p-1"
              />
            </div>
          </div>
        </section>

        <p v-if="errorSchema" class="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {{ errorSchema }}
        </p>
        <p
          v-if="mensajeSchema"
          class="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
        >
          {{ mensajeSchema }}
        </p>

        <button
          type="submit"
          :disabled="guardandoSchema || subiendoImagen"
          class="rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ guardandoSchema ? "Guardando..." : subiendoImagen ? "Subiendo imagen..." : "Guardar vista" }}
        </button>
      </form>
    </article>
  </section>
</template>
