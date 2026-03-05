<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import RichTextEditor from "../../components/blog/RichTextEditor.vue";
import CmsNestedValueEditor from "../../components/admin/CmsNestedValueEditor.vue";
import { rolActual } from "../../firebase/auth";
import { uploadImageWithCompression } from "../../firebase/storage";
import {
  DEFAULT_BLOG_DOCUMENT_SCHEMA,
  ensureDefaultSchemas,
  guardarSchemaContenido,
  listarSchemasContenido
} from "../../services/contentSchemaService";
import {
  actualizarRegistroDocumento,
  crearRegistroDocumento,
  eliminarRegistroDocumento,
  guardarRegistroDiccionario,
  listarRegistrosDocumento,
  obtenerRegistroDiccionario,
  type DynamicDocumentRecord
} from "../../services/dynamicDocumentService";
import type {
  CmsContentSchema,
  CmsFieldSchema,
  CmsFieldType,
  CmsNestedFieldSchema
} from "../../types/contentSchema";
import { toSlug } from "../../utils/slug";

type EditableFieldDraft = {
  key: string;
  label: string;
  type: CmsFieldType;
  required: boolean;
  placeholder: string;
  helpText: string;
  optionsText: string;
  structureJson: string;
};

type DocumentRelationOption = {
  id: string;
  label: string;
  hint: string;
};

type DocumentRelationState = {
  options: DocumentRelationOption[];
  byId: Record<string, DynamicDocumentRecord>;
};

const FIELD_TYPE_OPTIONS: Array<{ label: string; value: CmsFieldType }> = [
  { label: "Texto", value: "text" },
  { label: "Textarea", value: "textarea" },
  { label: "Editor enriquecido", value: "richtext" },
  { label: "Imagen", value: "image" },
  { label: "Select", value: "select" },
  { label: "Documento (relación)", value: "document" },
  { label: "Boolean", value: "boolean" },
  { label: "Array", value: "array" },
  { label: "Map", value: "map" }
];

const route = useRoute();
const router = useRouter();
const schemas = ref<CmsContentSchema[]>([]);
const selectedSchemaId = ref("");
const cargandoSchemas = ref(false);
const guardandoSchema = ref(false);
const mensajeSchema = ref("");
const errorSchema = ref("");

const schemaDraft = ref({
  id: "",
  title: "",
  description: "",
  storageType: "document" as "document" | "dictionary",
  collectionName: "",
  slugFromField: "",
  previewField: ""
});
const schemaFieldDrafts = ref<EditableFieldDraft[]>([]);

const formValues = ref<Record<string, unknown>>({});
const formFiles = ref<Record<string, File | null>>({});
const registros = ref<DynamicDocumentRecord[]>([]);
const cargandoRegistros = ref(false);
const guardandoRegistro = ref(false);
const mensajeRegistro = ref("");
const errorRegistro = ref("");
const documentFieldState = ref<Record<string, DocumentRelationState>>({});
const registroEditandoId = ref("");

const puedeEditarContenido = computed(() => {
  return rolActual.value === "admin" || rolActual.value === "writer" || rolActual.value === "manager";
});

const puedeConfigurarSchemas = computed(() => {
  return rolActual.value === "admin" || rolActual.value === "manager";
});

const selectedSchema = computed(() => {
  return schemas.value.find((item) => item.id === selectedSchemaId.value) ?? null;
});

const estaEditandoRegistro = computed(() => {
  return Boolean(registroEditandoId.value);
});

onMounted(async () => {
  await cargarTodo();
});

watch(
  selectedSchema,
  async (schema) => {
    if (!schema) {
      formValues.value = {};
      formFiles.value = {};
      registros.value = [];
      documentFieldState.value = {};
      registroEditandoId.value = "";
      return;
    }

    hidratarEditorSchema(schema);
    inicializarFormularioRegistro(schema);
    await cargarRegistros(schema);
    await cargarOpcionesRelaciones(schema);
  },
  { immediate: true }
);

watch(
  () => route.query.schema,
  (value) => {
    if (typeof value !== "string") {
      return;
    }

    if (!schemas.value.some((schema) => schema.id === value)) {
      return;
    }

    if (selectedSchemaId.value !== value) {
      selectedSchemaId.value = value;
    }
  }
);

async function cargarTodo(): Promise<void> {
  cargandoSchemas.value = true;
  errorSchema.value = "";

  try {
    await cargarSchemas();
    if (!schemas.value.length) {
      await ensureDefaultSchemas();
      await cargarSchemas();
    }
  } catch {
    errorSchema.value = "No se pudieron cargar los tipos de contenido.";
  } finally {
    cargandoSchemas.value = false;
  }
}

async function cargarSchemas(): Promise<void> {
  const encontrados = await listarSchemasContenido();
  schemas.value = encontrados;

  if (!encontrados.length) {
    selectedSchemaId.value = "";
    return;
  }

  const schemaFromQuery = typeof route.query.schema === "string" ? route.query.schema : "";
  if (schemaFromQuery && encontrados.some((schema) => schema.id === schemaFromQuery)) {
    selectedSchemaId.value = schemaFromQuery;
    return;
  }

  const existeSeleccionActual = encontrados.some((schema) => schema.id === selectedSchemaId.value);
  if (existeSeleccionActual) {
    return;
  }

  const blogSchema = encontrados.find((schema) => schema.id === DEFAULT_BLOG_DOCUMENT_SCHEMA.id);
  selectedSchemaId.value = blogSchema?.id ?? encontrados[0].id;
  await actualizarRutaSchema(selectedSchemaId.value);
}

function crearCampoVacio(): EditableFieldDraft {
  return {
    key: "",
    label: "",
    type: "text",
    required: false,
    placeholder: "",
    helpText: "",
    optionsText: "",
    structureJson: ""
  };
}

function crearDraftDesdeCampo(field: CmsFieldSchema): EditableFieldDraft {
  return {
    key: field.key,
    label: field.label,
    type: field.type,
    required: Boolean(field.required),
    placeholder: field.placeholder ?? "",
    helpText: field.helpText ?? "",
    optionsText: Array.isArray(field.options) ? field.options.join(", ") : "",
    structureJson: serializarEstructuraCampo(field)
  };
}

function cargarPlantillaBlog(): void {
  schemaDraft.value = {
    id: "blog",
    title: "Blog",
    description: "Contenido público del blog",
    storageType: "document",
    collectionName: "blogs",
    slugFromField: "titulo",
    previewField: "titulo"
  };

  schemaFieldDrafts.value = DEFAULT_BLOG_DOCUMENT_SCHEMA.fields.map((field) => crearDraftDesdeCampo(field));

  mensajeSchema.value = "Plantilla de Blog cargada en el formulario de schema.";
  errorSchema.value = "";
}

function agregarCampoSchema(): void {
  schemaFieldDrafts.value.push(crearCampoVacio());
}

function eliminarCampoSchema(index: number): void {
  schemaFieldDrafts.value.splice(index, 1);
}

async function guardarSchema(): Promise<void> {
  mensajeSchema.value = "";
  errorSchema.value = "";

  if (!puedeConfigurarSchemas.value) {
    errorSchema.value = "Tu rol no puede crear ni editar tipos de contenido.";
    return;
  }

  if (!schemaDraft.value.id || !schemaDraft.value.title || !schemaDraft.value.collectionName) {
    errorSchema.value = "Completa id, título y colección del schema.";
    return;
  }

  let fields: CmsFieldSchema[] = [];
  try {
    fields = schemaFieldDrafts.value
      .map((field) => convertirCampo(field))
      .filter((field): field is CmsFieldSchema => field !== null);
  } catch (error) {
    errorSchema.value = error instanceof Error ? error.message : "Hay un error en la definición de campos.";
    return;
  }

  if (!fields.length) {
    errorSchema.value = "Agrega al menos un campo válido al schema.";
    return;
  }

  guardandoSchema.value = true;

  try {
    await guardarSchemaContenido({
      id: schemaDraft.value.id,
      title: schemaDraft.value.title,
      description: schemaDraft.value.description,
      storageType: schemaDraft.value.storageType,
      collectionName: schemaDraft.value.collectionName,
      slugFromField: schemaDraft.value.slugFromField,
      previewField: schemaDraft.value.previewField,
      fields
    });

    await cargarSchemas();

    const savedId = normalizarIdLocal(schemaDraft.value.id);
    selectedSchemaId.value = savedId;
    await actualizarRutaSchema(savedId);
    window.dispatchEvent(new Event("cms-schemas-updated"));
    mensajeSchema.value = "Schema guardado correctamente.";
  } catch {
    errorSchema.value = "No se pudo guardar el schema.";
  } finally {
    guardandoSchema.value = false;
  }
}

function hidratarEditorSchema(schema: CmsContentSchema): void {
  schemaDraft.value = {
    id: schema.id,
    title: schema.title,
    description: schema.description ?? "",
    storageType: schema.storageType,
    collectionName: schema.collectionName,
    slugFromField: schema.slugFromField ?? "",
    previewField: schema.previewField ?? ""
  };

  schemaFieldDrafts.value = schema.fields.map((field) => crearDraftDesdeCampo(field));
}

async function actualizarRutaSchema(schemaId: string): Promise<void> {
  if (!schemaId) {
    return;
  }
  if (route.query.schema === schemaId) {
    return;
  }

  await router.replace({
    query: {
      ...route.query,
      schema: schemaId
    }
  });
}

function convertirCampo(field: EditableFieldDraft): CmsFieldSchema | null {
  const key = field.key.trim();
  const label = field.label.trim();

  if (!key || !label) {
    return null;
  }

  const converted: CmsFieldSchema = {
    key,
    label,
    type: field.type,
    required: field.required,
    placeholder: field.placeholder,
    helpText: field.helpText,
    options: field.type === "select" ? parsearOpciones(field.optionsText) : []
  };

  if (field.type === "array") {
    converted.itemSchema = parsearItemArray(field.structureJson, field.label || field.key);
  }

  if (field.type === "map") {
    converted.mapFields = parsearMapFields(field.structureJson, field.label || field.key);
  }

  return converted;
}

function parsearOpciones(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function serializarEstructuraCampo(field: CmsFieldSchema): string {
  if (field.type === "array") {
    return JSON.stringify(
      {
        item: field.itemSchema ?? { type: "text" }
      },
      null,
      2
    );
  }

  if (field.type === "map") {
    return JSON.stringify(
      {
        fields: field.mapFields ?? []
      },
      null,
      2
    );
  }

  return "";
}

function placeholderEstructuraPorTipo(type: CmsFieldType): string {
  if (type === "array") {
    return '{\n  "item": {\n    "type": "map",\n    "mapFields": [\n      { "key": "titulo", "label": "Título", "type": "text" }\n    ]\n  }\n}';
  }
  if (type === "map") {
    return '{\n  "fields": [\n    { "key": "titulo", "label": "Título", "type": "text" },\n    {\n      "key": "meta",\n      "label": "Meta",\n      "type": "map",\n      "mapFields": [\n        { "key": "autor", "label": "Autor", "type": "text" }\n      ]\n    }\n  ]\n}';
  }
  return "";
}

function parsearItemArray(raw: string, contexto: string): CmsNestedFieldSchema {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { type: "text" };
  }

  const parsed = parsearJsonObjeto(trimmed, `${contexto}: estructura de array inválida`);
  if (!esRegistro(parsed)) {
    throw new Error(`${contexto}: la estructura de array debe ser un objeto JSON.`);
  }

  const item = parsed.item;
  if (!esRegistro(item)) {
    throw new Error(`${contexto}: define la clave "item" con su schema.`);
  }

  return normalizarSchemaAnidado(item, `${contexto}.item`);
}

function parsearMapFields(raw: string, contexto: string): CmsFieldSchema[] {
  const trimmed = raw.trim();
  if (!trimmed) {
    return [];
  }

  const parsed = parsearJsonObjeto(trimmed, `${contexto}: estructura de map inválida`);
  if (!esRegistro(parsed)) {
    throw new Error(`${contexto}: la estructura de map debe ser un objeto JSON.`);
  }

  const fields = parsed.fields;
  if (!Array.isArray(fields)) {
    throw new Error(`${contexto}: define "fields" como un arreglo.`);
  }

  return fields.map((entry, index) => normalizarSchemaCampo(entry, `${contexto}.fields[${index}]`));
}

function normalizarSchemaCampo(value: unknown, contexto: string): CmsFieldSchema {
  if (!esRegistro(value)) {
    throw new Error(`${contexto}: cada campo debe ser un objeto JSON.`);
  }

  const key = typeof value.key === "string" ? value.key.trim() : "";
  const label = typeof value.label === "string" ? value.label.trim() : "";
  if (!key || !label) {
    throw new Error(`${contexto}: cada campo requiere "key" y "label".`);
  }

  const type = resolveFieldType(value.type);
  const output: CmsFieldSchema = {
    key,
    label,
    type,
    required: Boolean(value.required),
    placeholder: typeof value.placeholder === "string" ? value.placeholder : "",
    helpText: typeof value.helpText === "string" ? value.helpText : "",
    options: type === "select" ? parsearOpcionesDesdeUnknown(value.options) : [],
    documentSchemaId: type === "document" ? parsearTexto(value.documentSchemaId) : "",
    documentLabelField: type === "document" ? parsearTexto(value.documentLabelField) : ""
  };

  if (type === "array") {
    const item = value.itemSchema;
    if (!esRegistro(item)) {
      throw new Error(`${contexto}: un campo array requiere "itemSchema".`);
    }
    output.itemSchema = normalizarSchemaAnidado(item, `${contexto}.itemSchema`);
  }

  if (type === "map") {
    const mapFields = value.mapFields;
    if (!Array.isArray(mapFields)) {
      throw new Error(`${contexto}: un campo map requiere "mapFields".`);
    }
    output.mapFields = mapFields.map((entry, index) =>
      normalizarSchemaCampo(entry, `${contexto}.mapFields[${index}]`)
    );
  }

  return output;
}

function normalizarSchemaAnidado(value: unknown, contexto: string): CmsNestedFieldSchema {
  if (!esRegistro(value)) {
    throw new Error(`${contexto}: el nodo debe ser un objeto JSON.`);
  }

  const type = resolveFieldType(value.type);
  const output: CmsNestedFieldSchema = {
    type,
    required: Boolean(value.required),
    placeholder: typeof value.placeholder === "string" ? value.placeholder : "",
    helpText: typeof value.helpText === "string" ? value.helpText : "",
    options: type === "select" ? parsearOpcionesDesdeUnknown(value.options) : [],
    documentSchemaId: type === "document" ? parsearTexto(value.documentSchemaId) : "",
    documentLabelField: type === "document" ? parsearTexto(value.documentLabelField) : ""
  };

  if (type === "array") {
    const item = value.itemSchema;
    if (!esRegistro(item)) {
      throw new Error(`${contexto}: un nodo array requiere "itemSchema".`);
    }
    output.itemSchema = normalizarSchemaAnidado(item, `${contexto}.itemSchema`);
  }

  if (type === "map") {
    const mapFields = value.mapFields;
    if (!Array.isArray(mapFields)) {
      throw new Error(`${contexto}: un nodo map requiere "mapFields".`);
    }
    output.mapFields = mapFields.map((entry, index) =>
      normalizarSchemaCampo(entry, `${contexto}.mapFields[${index}]`)
    );
  }

  return output;
}

function resolveFieldType(value: unknown): CmsFieldType {
  if (
    value === "text" ||
    value === "textarea" ||
    value === "richtext" ||
    value === "image" ||
    value === "select" ||
    value === "document" ||
    value === "boolean" ||
    value === "array" ||
    value === "map"
  ) {
    return value;
  }
  throw new Error(`Tipo de campo no soportado: ${String(value || "")}`);
}

function parsearOpcionesDesdeUnknown(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : [];
}

function parsearTexto(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parsearJsonObjeto(value: string, errorMessage: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(errorMessage);
  }
}

function esRegistro(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function inicializarFormularioRegistro(schema: CmsContentSchema): void {
  const values: Record<string, unknown> = {};
  const files: Record<string, File | null> = {};

  for (const field of schema.fields) {
    if (field.type === "boolean") {
      values[field.key] = false;
    } else if (field.type === "array") {
      values[field.key] = [];
    } else if (field.type === "map") {
      values[field.key] = {};
    } else if (field.type === "document") {
      values[field.key] = "";
    } else {
      values[field.key] = "";
    }
    if (field.type === "image") {
      files[field.key] = null;
    }
  }

  formValues.value = values;
  formFiles.value = files;
  registroEditandoId.value = "";
  mensajeRegistro.value = "";
  errorRegistro.value = "";
}

async function cargarRegistros(schema: CmsContentSchema): Promise<void> {
  cargandoRegistros.value = true;

  try {
    if (schema.storageType === "dictionary") {
      const dictionary = await obtenerRegistroDiccionario(schema);
      registros.value = dictionary ? [dictionary] : [];
      registroEditandoId.value = "";
      if (dictionary) {
        hidratarFormularioDesdeRegistro(schema, dictionary);
      }
      return;
    }

    const encontrados = await listarRegistrosDocumento(schema, 100);
    registros.value = encontrados;

    if (registroEditandoId.value && !encontrados.some((record) => record.id === registroEditandoId.value)) {
      registroEditandoId.value = "";
    }
  } finally {
    cargandoRegistros.value = false;
  }
}

async function cargarOpcionesRelaciones(schema: CmsContentSchema): Promise<void> {
  const relationFields = schema.fields.filter((field) => field.type === "document");
  if (!relationFields.length) {
    documentFieldState.value = {};
    return;
  }

  const nextState: Record<string, DocumentRelationState> = {};

  await Promise.all(
    relationFields.map(async (field) => {
      const relationSchemaId = typeof field.documentSchemaId === "string" ? field.documentSchemaId.trim() : "";
      if (!relationSchemaId) {
        nextState[field.key] = { options: [], byId: {} };
        return;
      }

      const targetSchema = schemas.value.find((entry) => entry.id === relationSchemaId);
      if (!targetSchema || targetSchema.storageType !== "document") {
        nextState[field.key] = { options: [], byId: {} };
        return;
      }

      const labelField =
        (typeof field.documentLabelField === "string" && field.documentLabelField.trim()) ||
        targetSchema.previewField ||
        targetSchema.slugFromField ||
        targetSchema.fields[0]?.key ||
        "";

      const targetRecords = await listarRegistrosDocumento(targetSchema, 200);
      const byId: Record<string, DynamicDocumentRecord> = {};
      const options = targetRecords.map((record) => {
        byId[record.id] = record;
        return {
          id: record.id,
          label: relationLabel(record, labelField),
          hint: relationHint(record)
        };
      });

      nextState[field.key] = { options, byId };
    })
  );

  documentFieldState.value = nextState;
}

function relationLabel(record: DynamicDocumentRecord, labelField: string): string {
  const rawValue = labelField ? record.data[labelField] : null;
  if (typeof rawValue === "string" && rawValue.trim()) {
    return rawValue.trim();
  }
  return record.id;
}

function relationHint(record: DynamicDocumentRecord): string {
  const telefono = record.data.telefono;
  if (typeof telefono === "string" && telefono.trim()) {
    return `Tel: ${telefono.trim()}`;
  }
  return "";
}

function hidratarFormularioDesdeRegistro(
  schema: CmsContentSchema,
  registro: DynamicDocumentRecord
): void {
  const nextValues = { ...formValues.value };

  for (const field of schema.fields) {
    const value = registro.data[field.key];
    if (field.type === "boolean") {
      nextValues[field.key] = Boolean(value);
    } else if (field.type === "array" || field.type === "map") {
      nextValues[field.key] = parsearValorComplejo(field, value);
    } else if (field.type === "document") {
      nextValues[field.key] = typeof value === "string" ? value : "";
    } else if (typeof value === "string") {
      nextValues[field.key] = value;
    } else {
      nextValues[field.key] = "";
    }
  }

  formValues.value = nextValues;
}

function editarRegistro(registro: DynamicDocumentRecord): void {
  const schema = selectedSchema.value;
  if (!schema || schema.storageType !== "document") {
    return;
  }

  inicializarFormularioRegistro(schema);
  hidratarFormularioDesdeRegistro(schema, registro);
  registroEditandoId.value = registro.id;
}

function cancelarEdicionRegistro(): void {
  const schema = selectedSchema.value;
  if (!schema || schema.storageType !== "document") {
    return;
  }

  inicializarFormularioRegistro(schema);
}

async function guardarRegistro(): Promise<void> {
  const schema = selectedSchema.value;
  if (!schema) {
    return;
  }

  mensajeRegistro.value = "";
  errorRegistro.value = "";

  if (!puedeEditarContenido.value) {
    errorRegistro.value = "Tu rol no tiene permisos para crear o editar contenido.";
    return;
  }

  guardandoRegistro.value = true;

  try {
    const payload: Record<string, unknown> = {};

    for (const field of schema.fields) {
      payload[field.key] = await resolverValorCampo(schema, field);
      validarCampoRequerido(field, payload[field.key]);
    }

    if (schema.slugFromField) {
      const source = payload[schema.slugFromField];
      if (typeof source === "string" && source.trim()) {
        payload.slug = toSlug(source);
      }
    }

    if (schema.storageType === "dictionary") {
      await guardarRegistroDiccionario(schema, payload);
      mensajeRegistro.value = "Registro de diccionario actualizado.";
    } else {
      if (registroEditandoId.value) {
        await actualizarRegistroDocumento(schema, registroEditandoId.value, payload);
        mensajeRegistro.value = "Registro actualizado correctamente.";
      } else {
        await crearRegistroDocumento(schema, payload);
        mensajeRegistro.value = "Registro creado correctamente.";
      }
      inicializarFormularioRegistro(schema);
    }

    await cargarRegistros(schema);
  } catch (error) {
    errorRegistro.value = error instanceof Error ? error.message : "No se pudo guardar el registro.";
  } finally {
    guardandoRegistro.value = false;
  }
}

async function resolverValorCampo(
  schema: CmsContentSchema,
  field: CmsFieldSchema
): Promise<unknown> {
  if (field.type === "boolean") {
    return Boolean(formValues.value[field.key]);
  }

  if (field.type === "image") {
    const file = formFiles.value[field.key];
    if (!file) {
      return valorTexto(field.key);
    }

    const cleanName = limpiarNombreArchivo(file.name);
    const url = await uploadImageWithCompression(
      `${schema.collectionName}/${field.key}/${Date.now()}-${cleanName}`,
      file,
      { maxWidth: 1920, maxHeight: 1080, targetSizeKb: 900, quality: 0.82 }
    );

    formValues.value[field.key] = url;
    formFiles.value[field.key] = null;
    return url;
  }

  if (field.type === "array" || field.type === "map") {
    return parsearValorComplejo(field, formValues.value[field.key]);
  }

  if (field.type === "document") {
    return valorTexto(field.key);
  }

  return valorTexto(field.key);
}

function validarCampoRequerido(field: CmsFieldSchema, value: unknown): void {
  if (!field.required) {
    return;
  }

  if (field.type === "boolean") {
    return;
  }

  if (field.type === "array") {
    if (!Array.isArray(value) || !value.length) {
      throw new Error(`El campo \"${field.label}\" es obligatorio y debe tener al menos 1 elemento.`);
    }
    return;
  }

  if (field.type === "map") {
    if (!esRegistro(value) || Object.keys(value).length === 0) {
      throw new Error(`El campo \"${field.label}\" es obligatorio y debe tener al menos 1 propiedad.`);
    }
    return;
  }

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`El campo \"${field.label}\" es obligatorio.`);
  }
}

function parsearValorComplejo(field: CmsFieldSchema, parsed: unknown): unknown {
  if (typeof parsed === "string") {
    const trimmed = parsed.trim();
    const legacyStringAsJson = trimmed.startsWith("{") || trimmed.startsWith("[");
    if (!legacyStringAsJson) {
      parsed = field.type === "array" ? [] : {};
    } else {
      try {
        parsed = JSON.parse(trimmed);
      } catch {
        parsed = field.type === "array" ? [] : {};
      }
    }
  }

  if (field.type === "array") {
    const arrayValue = Array.isArray(parsed) ? parsed : [];
    if (field.itemSchema) {
      return arrayValue.map((item, index) =>
        normalizarValorContraNodo(field.itemSchema as CmsNestedFieldSchema, item, `${field.label}[${index}]`)
      );
    }
    return arrayValue;
  }

  const mapValue = esRegistro(parsed) ? parsed : {};

  if (Array.isArray(field.mapFields) && field.mapFields.length > 0) {
    return normalizarValorContraMapFields(field.mapFields, mapValue, field.label);
  }

  return mapValue;
}

function normalizarValorContraMapFields(
  fields: CmsFieldSchema[],
  value: Record<string, unknown>,
  contexto: string
): Record<string, unknown> {
  const output: Record<string, unknown> = {};

  for (const field of fields) {
    const key = field.key;
    if (!(key in value)) {
      if (field.required) {
        throw new Error(`Falta la propiedad requerida \"${contexto}.${key}\".`);
      }
      continue;
    }

    output[key] = normalizarValorContraNodo(field, value[key], `${contexto}.${key}`);
  }

  return output;
}

function normalizarValorContraNodo(
  schema: CmsNestedFieldSchema,
  value: unknown,
  contexto: string
): unknown {
  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      throw new Error(`\"${contexto}\" debe ser un arreglo.`);
    }
    if (!schema.itemSchema) {
      return value;
    }
    return value.map((item, index) => normalizarValorContraNodo(schema.itemSchema!, item, `${contexto}[${index}]`));
  }

  if (schema.type === "map") {
    if (!esRegistro(value)) {
      throw new Error(`\"${contexto}\" debe ser un objeto.`);
    }
    if (!Array.isArray(schema.mapFields) || schema.mapFields.length === 0) {
      return value;
    }
    return normalizarValorContraMapFields(schema.mapFields, value, contexto);
  }

  if (schema.type === "boolean") {
    if (typeof value !== "boolean") {
      throw new Error(`\"${contexto}\" debe ser boolean.`);
    }
    return value;
  }

  if (schema.type === "document") {
    if (typeof value !== "string") {
      throw new Error(`\"${contexto}\" debe ser string (id de documento).`);
    }
    return value;
  }

  if (typeof value !== "string") {
    throw new Error(`\"${contexto}\" debe ser string.`);
  }

  if (schema.type === "select" && Array.isArray(schema.options) && schema.options.length > 0) {
    if (value && !schema.options.includes(value)) {
      throw new Error(`\"${contexto}\" no coincide con las opciones del select.`);
    }
  }

  return value;
}

async function borrarRegistro(recordId: string): Promise<void> {
  const schema = selectedSchema.value;
  if (!schema || schema.storageType !== "document") {
    return;
  }

  if (!puedeEditarContenido.value) {
    errorRegistro.value = "Tu rol no tiene permisos para eliminar contenido.";
    return;
  }

  if (!window.confirm("¿Seguro que quieres eliminar este registro?")) {
    return;
  }

  await eliminarRegistroDocumento(schema, recordId);
  if (registroEditandoId.value === recordId) {
    inicializarFormularioRegistro(schema);
  }
  await cargarRegistros(schema);
}

async function subirImagenEditor(file: File): Promise<string> {
  const schema = selectedSchema.value;
  if (!schema) {
    throw new Error("No hay schema seleccionado.");
  }

  const cleanName = limpiarNombreArchivo(file.name);
  return uploadImageWithCompression(
    `${schema.collectionName}/editor/${Date.now()}-${cleanName}`,
    file,
    { maxWidth: 1600, maxHeight: 1600, targetSizeKb: 700, quality: 0.8 }
  );
}

function valorTexto(key: string): string {
  const value = formValues.value[key];
  return typeof value === "string" ? value : "";
}

function setTexto(key: string, value: string): void {
  formValues.value[key] = value;
}

function opcionesDocumento(field: CmsFieldSchema): DocumentRelationOption[] {
  return documentFieldState.value[field.key]?.options ?? [];
}

function hintDocumentoSeleccionado(field: CmsFieldSchema): string {
  const selectedId = valorTexto(field.key);
  if (!selectedId) {
    return "";
  }

  const option = opcionesDocumento(field).find((entry) => entry.id === selectedId);
  return option?.hint ?? "";
}

function valorComplejo(key: string): unknown {
  return formValues.value[key];
}

function setValorComplejo(key: string, value: unknown): void {
  formValues.value[key] = value;
}

function valorBoolean(key: string): boolean {
  return Boolean(formValues.value[key]);
}

function setBoolean(key: string, value: boolean): void {
  formValues.value[key] = value;
}

function setArchivo(key: string, event: Event): void {
  const input = event.target as HTMLInputElement;
  formFiles.value[key] = input.files?.[0] ?? null;
}

function quitarImagen(key: string): void {
  formValues.value[key] = "";
  formFiles.value[key] = null;
}

function valorPreviewRegistro(record: DynamicDocumentRecord, schema: CmsContentSchema): string {
  const previewKey = schema.previewField || schema.slugFromField || schema.fields[0]?.key;
  if (!previewKey) {
    return record.id;
  }

  const value = record.data[previewKey];
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (Array.isArray(value)) {
    return `[array:${value.length}]`;
  }

  if (esRegistro(value)) {
    return "[map]";
  }

  return record.id;
}

function blogPublicUrl(record: DynamicDocumentRecord): string {
  const slug = record.data.slug;
  return typeof slug === "string" && slug.trim() ? `/blog/${slug}` : "";
}

function limpiarNombreArchivo(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-");
}

function normalizarIdLocal(value: string): string {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
</script>

<template>
  <section class="space-y-4">
    <article class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
      Contenido muestra formularios y registros. Los esquemas se muestran en la vista <strong>Esquemas</strong>.
      <p v-if="cargandoSchemas" class="mt-2 text-xs text-slate-500">Cargando formularios...</p>
      <p v-else-if="errorSchema" class="mt-2 text-xs text-rose-700">{{ errorSchema }}</p>
    </article>

    <article class="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 class="text-xl font-black text-slate-900">
        {{ selectedSchema ? `Formulario y registros: ${selectedSchema.title}` : "Formulario y registros" }}
      </h3>
      <p class="mt-1 text-sm text-slate-600">El formulario se genera desde el esquema y lo completa el usuario final.</p>

      <p
        v-if="!puedeEditarContenido"
        class="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700"
      >
        No tienes permisos para crear, editar o eliminar contenido. Roles permitidos: admin, writer, manager.
      </p>

      <form
        v-if="selectedSchema"
        class="mt-5 space-y-4"
        @submit.prevent="guardarRegistro"
      >
        <div v-for="field in selectedSchema.fields" :key="field.key" class="space-y-1">
          <label class="block text-sm font-semibold text-slate-700">{{ field.label }}</label>
          <p v-if="field.helpText" class="text-xs text-slate-500">{{ field.helpText }}</p>

          <input
            v-if="field.type === 'text'"
            :value="valorTexto(field.key)"
            type="text"
            :placeholder="field.placeholder || ''"
            :disabled="!puedeEditarContenido"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
            @input="setTexto(field.key, ($event.target as HTMLInputElement).value)"
          />

          <textarea
            v-else-if="field.type === 'textarea'"
            :value="valorTexto(field.key)"
            rows="4"
            :placeholder="field.placeholder || ''"
            :disabled="!puedeEditarContenido"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
            @input="setTexto(field.key, ($event.target as HTMLTextAreaElement).value)"
          ></textarea>

          <select
            v-else-if="field.type === 'select'"
            :value="valorTexto(field.key)"
            :disabled="!puedeEditarContenido"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
            @change="setTexto(field.key, ($event.target as HTMLSelectElement).value)"
          >
            <option value="">Selecciona una opción</option>
            <option
              v-for="option in field.options || []"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>

          <div v-else-if="field.type === 'document'" class="space-y-2">
            <select
              :value="valorTexto(field.key)"
              :disabled="!puedeEditarContenido"
              class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
              @change="setTexto(field.key, ($event.target as HTMLSelectElement).value)"
            >
              <option value="">Selecciona un documento</option>
              <option
                v-for="option in opcionesDocumento(field)"
                :key="option.id"
                :value="option.id"
              >
                {{ option.label }}
              </option>
            </select>
            <p v-if="hintDocumentoSeleccionado(field)" class="text-xs text-slate-500">
              {{ hintDocumentoSeleccionado(field) }}
            </p>
          </div>

          <label
            v-else-if="field.type === 'boolean'"
            class="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
          >
            <input
              :checked="valorBoolean(field.key)"
              type="checkbox"
              :disabled="!puedeEditarContenido"
              @change="setBoolean(field.key, ($event.target as HTMLInputElement).checked)"
            />
            Activo
          </label>

          <div v-else-if="field.type === 'image'" class="space-y-2">
            <input
              type="file"
              accept="image/*"
              :disabled="!puedeEditarContenido"
              class="block w-full text-sm text-slate-600 disabled:opacity-60"
              @change="setArchivo(field.key, $event)"
            />
            <p v-if="valorTexto(field.key)" class="text-xs text-slate-500 break-all">
              URL actual: {{ valorTexto(field.key) }}
            </p>
            <img
              v-if="valorTexto(field.key)"
              :src="valorTexto(field.key)"
              alt="Vista previa"
              class="max-h-32 rounded-md border border-slate-200 object-cover"
            />
            <button
              v-if="valorTexto(field.key)"
              type="button"
              class="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              :disabled="!puedeEditarContenido"
              @click="quitarImagen(field.key)"
            >
              Quitar URL
            </button>
          </div>

          <CmsNestedValueEditor
            v-else-if="field.type === 'array' || field.type === 'map'"
            :schema="field"
            :model-value="valorComplejo(field.key)"
            :disabled="!puedeEditarContenido"
            @update:model-value="setValorComplejo(field.key, $event)"
          />

          <RichTextEditor
            v-else-if="field.type === 'richtext'"
            :model-value="valorTexto(field.key)"
            :subir-imagen="subirImagenEditor"
            :disabled="!puedeEditarContenido"
            @update:model-value="setTexto(field.key, $event)"
          />
        </div>

        <p
          v-if="selectedSchema.storageType === 'document' && estaEditandoRegistro"
          class="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700"
        >
          Editando registro: {{ registroEditandoId }}
        </p>
        <p
          v-if="errorRegistro"
          class="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
        >
          {{ errorRegistro }}
        </p>
        <p
          v-if="mensajeRegistro"
          class="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
        >
          {{ mensajeRegistro }}
        </p>

        <div class="flex flex-wrap items-center gap-2">
          <button
            type="submit"
            :disabled="guardandoRegistro || !puedeEditarContenido"
            class="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {{
              guardandoRegistro
                ? "Guardando..."
                : selectedSchema.storageType === "dictionary"
                  ? "Guardar diccionario"
                  : estaEditandoRegistro
                    ? "Guardar cambios"
                    : "Crear documento"
            }}
          </button>
          <button
            v-if="selectedSchema.storageType === 'document' && estaEditandoRegistro"
            type="button"
            :disabled="guardandoRegistro || !puedeEditarContenido"
            class="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            @click="cancelarEdicionRegistro"
          >
            Cancelar edición
          </button>
        </div>
      </form>

      <div class="mt-6 border-t border-slate-200 pt-5">
        <h4 class="text-sm font-black uppercase tracking-wide text-slate-600">Registros guardados</h4>

        <p v-if="cargandoRegistros" class="mt-3 text-sm text-slate-500">Cargando registros...</p>
        <p v-else-if="!registros.length" class="mt-3 text-sm text-slate-500">No hay registros todavía.</p>

        <ul v-else class="mt-3 space-y-2">
          <li
            v-for="record in registros"
            :key="record.id"
            :class="[
              'flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2',
              selectedSchema?.storageType === 'document' && registroEditandoId === record.id
                ? 'border-sky-300 bg-sky-50'
                : ''
            ]"
          >
            <div>
              <p class="text-sm font-semibold text-slate-900">
                {{ selectedSchema ? valorPreviewRegistro(record, selectedSchema) : record.id }}
              </p>
              <p class="text-xs text-slate-500">ID: {{ record.id }}</p>
              <RouterLink
                v-if="selectedSchema?.id === 'blog' && blogPublicUrl(record)"
                :to="blogPublicUrl(record)"
                class="text-xs text-sky-700 hover:text-sky-800"
              >
                Ver público
              </RouterLink>
            </div>

            <div v-if="selectedSchema?.storageType === 'document'" class="flex items-center gap-2">
              <button
                type="button"
                :disabled="!puedeEditarContenido || guardandoRegistro"
                class="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                @click="editarRegistro(record)"
              >
                {{ registroEditandoId === record.id ? "Editando" : "Editar" }}
              </button>
              <button
                type="button"
                :disabled="!puedeEditarContenido"
                class="rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                @click="borrarRegistro(record.id)"
              >
                Eliminar
              </button>
            </div>
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>
