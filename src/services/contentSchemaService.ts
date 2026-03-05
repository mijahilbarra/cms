import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { getCmsFirebaseServices } from "../firebase/context";
import { VIEW_TEMPLATES } from "../schemas";
import type { CmsContentSchema, CmsFieldSchema, CmsFieldType, CmsNestedFieldSchema } from "../types/contentSchema";
import type { RepeaterConfig, RepeaterField, SchemaField, SchemaFieldType, ViewTemplate } from "../types/viewSchema";

const SCHEMAS_COLLECTION = "cmsSchemas";
const VIEW_DICTIONARY_COLLECTION = "views";
const DEFAULT_DICTIONARY_ROOT_KEY = "schema";
const DEFAULT_DICTIONARY_DOC_ID = "main";
const VIEW_FIELD_SEPARATOR = "__";
const SCHEMA_CACHE_TTL_MS = 30_000;

let schemasCache: CmsContentSchema[] | null = null;
let schemasCacheTimestamp = 0;
let schemasCachePromise: Promise<CmsContentSchema[]> | null = null;

export const DEFAULT_BLOG_DOCUMENT_SCHEMA: CmsContentSchema = {
  id: "blog",
  title: "Blog",
  description: "Registros del blog público.",
  storageType: "document",
  collectionName: "blogs",
  slugFromField: "titulo",
  previewField: "titulo",
  fields: [
    { key: "titulo", label: "Título", type: "text", required: true },
    { key: "resumen", label: "Resumen", type: "textarea", required: true },
    { key: "imagenPrincipalUrl", label: "Imagen principal", type: "image" },
    { key: "contenidoHtml", label: "Contenido", type: "richtext", required: true },
    { key: "publicado", label: "Publicado", type: "boolean" }
  ]
};

export const DEFAULT_REPRESENTATIVES_DOCUMENT_SCHEMA: CmsContentSchema = {
  id: "representantes",
  title: "Representantes",
  description: "Representantes comerciales de inmuebles.",
  storageType: "document",
  collectionName: "representantes",
  previewField: "nombre",
  fields: [
    { key: "nombre", label: "Nombre", type: "text", required: true },
    { key: "apellido", label: "Apellido", type: "text", required: true },
    { key: "dni", label: "DNI", type: "text", required: true },
    { key: "telefono", label: "Teléfono", type: "text", required: true }
  ]
};

export const DEFAULT_PROPERTIES_DOCUMENT_SCHEMA: CmsContentSchema = {
  id: "inmuebles",
  title: "Inmuebles",
  description: "Propiedades para venta o alquiler.",
  storageType: "document",
  collectionName: "inmuebles",
  previewField: "direccion",
  fields: [
    { key: "imagenes", label: "Imágenes", type: "array", required: true, itemSchema: { type: "text" } },
    { key: "direccion", label: "Dirección", type: "text", required: true },
    { key: "cantidadCuartos", label: "Cantidad de cuartos", type: "text", required: true },
    { key: "cantidadBanos", label: "Cantidad de baños", type: "text", required: true },
    { key: "precio", label: "Precio", type: "text", required: true },
    {
      key: "tipo",
      label: "Tipo",
      type: "select",
      required: true,
      options: ["departamento", "casa", "terreno"]
    },
    {
      key: "representanteId",
      label: "Representante",
      type: "document",
      required: true,
      documentSchemaId: "representantes",
      documentLabelField: "nombre"
    },
    { key: "descripcion", label: "Descripción", type: "textarea", required: true },
    { key: "cochera", label: "Cochera", type: "boolean" }
  ]
};

const DEFAULT_VIEW_DICTIONARY_SCHEMAS: CmsContentSchema[] = VIEW_TEMPLATES.map((template) =>
  buildViewDictionarySchema(template)
);

export async function ensureDefaultSchemas(): Promise<void> {
  await Promise.all([
    ensureSchema(DEFAULT_BLOG_DOCUMENT_SCHEMA),
    ensureSchema(DEFAULT_REPRESENTATIVES_DOCUMENT_SCHEMA),
    ensureSchema(DEFAULT_PROPERTIES_DOCUMENT_SCHEMA),
    ...DEFAULT_VIEW_DICTIONARY_SCHEMAS.map((schema) => ensureSchema(schema))
  ]);
}

async function ensureSchema(schemaBase: CmsContentSchema): Promise<void> {
  const { firestore } = getCmsFirebaseServices();
  const normalizedBase = normalizarSchema(schemaBase);
  await migrateLegacyLowercaseSchemaId(normalizedBase.id);
  const reference = doc(firestore, SCHEMAS_COLLECTION, normalizedBase.id);
  const snapshot = await getDoc(reference);

  if (!snapshot.exists()) {
    await setDoc(reference, {
      ...normalizedBase,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    invalidateSchemasCache();
    return;
  }

  const merged = normalizarSchema({
    ...normalizedBase,
    ...(snapshot.data() as Record<string, unknown>)
  });

  await setDoc(
    reference,
    {
      ...merged,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
  invalidateSchemasCache();
}

async function migrateLegacyLowercaseSchemaId(canonicalId: string): Promise<void> {
  if (!canonicalId.startsWith("view-")) {
    return;
  }

  const legacyId = canonicalId.toLowerCase();
  if (legacyId === canonicalId) {
    return;
  }

  const { firestore } = getCmsFirebaseServices();
  const canonicalRef = doc(firestore, SCHEMAS_COLLECTION, canonicalId);
  const legacyRef = doc(firestore, SCHEMAS_COLLECTION, legacyId);
  const [canonicalSnapshot, legacySnapshot] = await Promise.all([getDoc(canonicalRef), getDoc(legacyRef)]);

  if (!legacySnapshot.exists()) {
    return;
  }

  if (!canonicalSnapshot.exists()) {
    await setDoc(
      canonicalRef,
      {
        ...(legacySnapshot.data() as Record<string, unknown>),
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  }

  await deleteDoc(legacyRef);
  invalidateSchemasCache();
}

export async function listarSchemasContenido(): Promise<CmsContentSchema[]> {
  const now = Date.now();
  if (schemasCache && now - schemasCacheTimestamp < SCHEMA_CACHE_TTL_MS) {
    return schemasCache;
  }

  if (schemasCachePromise) {
    return schemasCachePromise;
  }

  const { firestore } = getCmsFirebaseServices();
  schemasCachePromise = (async () => {
    const snapshot = await getDocs(collection(firestore, SCHEMAS_COLLECTION));

    const nextSchemas = snapshot.docs
      .map((entry) => {
        const source = entry.data() as Record<string, unknown>;
        return normalizarSchema({ ...source, id: entry.id });
      })
      .sort((a, b) => a.title.localeCompare(b.title, "es"));

    schemasCache = nextSchemas;
    schemasCacheTimestamp = Date.now();
    return nextSchemas;
  })();

  try {
    return await schemasCachePromise;
  } finally {
    schemasCachePromise = null;
  }
}

export async function guardarSchemaContenido(schema: CmsContentSchema): Promise<void> {
  const { firestore } = getCmsFirebaseServices();
  const normalized = normalizarSchema(schema);
  const reference = doc(firestore, SCHEMAS_COLLECTION, normalized.id);

  await setDoc(
    reference,
    {
      ...normalized,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    },
    { merge: true }
  );
  invalidateSchemasCache();
}

function invalidateSchemasCache(): void {
  schemasCache = null;
  schemasCacheTimestamp = 0;
}

function normalizarSchema(input: Record<string, unknown> | CmsContentSchema): CmsContentSchema {
  const draft = input as Partial<CmsContentSchema> & Record<string, unknown>;
  let normalizedFields: CmsFieldSchema[] = [];
  const storageType = draft.storageType === "dictionary" ? "dictionary" : "document";

  if (Array.isArray(draft.fields)) {
    normalizedFields = draft.fields.map((field) => normalizarCampo(field as Partial<CmsFieldSchema>));
  } else if (draft.fields && typeof draft.fields === "object") {
    normalizedFields = Object.entries(draft.fields as Record<string, unknown>).map(([key, value]) =>
      normalizarCampo({ key, ...(value as Partial<CmsFieldSchema>) })
    );
  }

  const dictionaryDocumentIdRaw =
    typeof draft.dictionaryDocumentId === "string" ? draft.dictionaryDocumentId : "";
  const dictionaryRootKeyRaw = typeof draft.dictionaryRootKey === "string" ? draft.dictionaryRootKey : "";
  const dictionaryDocumentId =
    storageType === "dictionary"
      ? sanitizeDictionaryDocumentId(dictionaryDocumentIdRaw || DEFAULT_DICTIONARY_DOC_ID)
      : "";
  const dictionaryRootKey =
    storageType === "dictionary"
      ? sanitizeDictionaryRootKey(dictionaryRootKeyRaw || DEFAULT_DICTIONARY_ROOT_KEY)
      : "";

  return {
    id: sanitizeSchemaId(String(draft.id ?? "tipo-contenido")),
    title: String(draft.title ?? "Tipo de contenido"),
    description: typeof draft.description === "string" ? draft.description : "",
    storageType,
    collectionName: sanitizeCollectionName(String(draft.collectionName ?? "registros")),
    dictionaryDocumentId,
    dictionaryRootKey,
    slugFromField: typeof draft.slugFromField === "string" ? draft.slugFromField : "",
    previewField: typeof draft.previewField === "string" ? draft.previewField : "",
    fields: normalizedFields
  };
}

function normalizarCampo(input: Partial<CmsFieldSchema>): CmsFieldSchema {
  const type = resolveFieldType(input.type);
  const normalized: CmsFieldSchema = {
    key: sanitizeId(String(input.key ?? "campo")),
    label: String(input.label ?? "Campo"),
    type,
    required: Boolean(input.required),
    placeholder: typeof input.placeholder === "string" ? input.placeholder : "",
    helpText: typeof input.helpText === "string" ? input.helpText : "",
    options: normalizeOptions(input.options),
    documentSchemaId:
      type === "document"
        ? sanitizeDocumentSchemaId(typeof input.documentSchemaId === "string" ? input.documentSchemaId : "")
        : "",
    documentLabelField:
      type === "document"
        ? sanitizeDocumentLabelField(typeof input.documentLabelField === "string" ? input.documentLabelField : "")
        : ""
  };

  if (type !== "select") {
    normalized.options = [];
  }
  if (type !== "document") {
    normalized.documentSchemaId = "";
    normalized.documentLabelField = "";
  }

  if (type === "array") {
    normalized.itemSchema = normalizarNestedCampo(
      isRecord(input.itemSchema) ? (input.itemSchema as Partial<CmsNestedFieldSchema>) : { type: "text" }
    );
  } else {
    delete normalized.itemSchema;
  }

  if (type === "map") {
    normalized.mapFields = Array.isArray(input.mapFields)
      ? input.mapFields.map((field) => normalizarCampo(field as Partial<CmsFieldSchema>))
      : [];
  } else {
    delete normalized.mapFields;
  }

  return normalized;
}

function normalizarNestedCampo(input: Partial<CmsNestedFieldSchema>): CmsNestedFieldSchema {
  const type = resolveFieldType(input.type);
  const normalized: CmsNestedFieldSchema = {
    type,
    required: Boolean(input.required),
    placeholder: typeof input.placeholder === "string" ? input.placeholder : "",
    helpText: typeof input.helpText === "string" ? input.helpText : "",
    options: normalizeOptions(input.options),
    documentSchemaId:
      type === "document"
        ? sanitizeDocumentSchemaId(typeof input.documentSchemaId === "string" ? input.documentSchemaId : "")
        : "",
    documentLabelField:
      type === "document"
        ? sanitizeDocumentLabelField(typeof input.documentLabelField === "string" ? input.documentLabelField : "")
        : ""
  };

  if (type !== "select") {
    normalized.options = [];
  }
  if (type !== "document") {
    normalized.documentSchemaId = "";
    normalized.documentLabelField = "";
  }

  if (type === "array") {
    normalized.itemSchema = normalizarNestedCampo(
      isRecord(input.itemSchema) ? (input.itemSchema as Partial<CmsNestedFieldSchema>) : { type: "text" }
    );
  } else {
    delete normalized.itemSchema;
  }

  if (type === "map") {
    normalized.mapFields = Array.isArray(input.mapFields)
      ? input.mapFields.map((field) => normalizarCampo(field as Partial<CmsFieldSchema>))
      : [];
  } else {
    delete normalized.mapFields;
  }

  return normalized;
}

function resolveFieldType(value: unknown): CmsFieldType {
  if (
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

  return "text";
}

function normalizeOptions(options: unknown): string[] {
  return Array.isArray(options) ? options.map((option) => String(option).trim()).filter(Boolean) : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function buildViewDictionarySchema(template: ViewTemplate): CmsContentSchema {
  const fields: CmsFieldSchema[] = [];

  for (const [sectionKey, section] of Object.entries(template.schema)) {
    for (const [fieldKey, field] of Object.entries(section.fields)) {
      const key = normalizarViewFieldKey(sectionKey, fieldKey);
      const baseField: CmsFieldSchema = {
        key,
        label: `${section.label} · ${field.label}`,
        type: mapViewFieldTypeToCmsFieldType(field.type),
        required: false,
        placeholder: typeof field.placeholder === "string" ? field.placeholder : "",
        helpText: typeof field.helpText === "string" ? field.helpText : "",
        options: Array.isArray(field.options) ? field.options : []
      };
      fields.push(mapViewFieldToCmsField(baseField, field));
    }
  }

  return {
    id: `view-${template.id}`,
    title: `View: ${template.titulo}`,
    description: `Edición dinámica del schema de ${template.titulo} en documento único.`,
    storageType: "dictionary",
    collectionName: VIEW_DICTIONARY_COLLECTION,
    dictionaryDocumentId: template.id,
    dictionaryRootKey: DEFAULT_DICTIONARY_ROOT_KEY,
    previewField: fields[0]?.key ?? "",
    fields
  };
}

function mapViewFieldTypeToCmsFieldType(type: SchemaFieldType): CmsFieldSchema["type"] {
  if (type === "textarea") {
    return "textarea";
  }
  if (type === "select") {
    return "select";
  }
  return "text";
}

function mapViewFieldToCmsField(base: CmsFieldSchema, source: SchemaField): CmsFieldSchema {
  if (source.type !== "json") {
    return base;
  }

  const repeaterSchema = buildNestedSchemaFromRepeater(source.repeater);
  if (repeaterSchema) {
    return {
      ...base,
      type: "array",
      options: [],
      itemSchema: repeaterSchema
    };
  }

  const inferred = inferNestedSchemaFromJsonValue(source.value);
  if (inferred?.type === "array") {
    return {
      ...base,
      type: "array",
      options: [],
      itemSchema: inferred.itemSchema ?? { type: "text" }
    };
  }

  if (inferred?.type === "map") {
    return {
      ...base,
      type: "map",
      options: [],
      mapFields: inferred.mapFields ?? []
    };
  }

  return { ...base, type: "textarea" };
}

function buildNestedSchemaFromRepeater(repeater?: RepeaterConfig): CmsNestedFieldSchema | null {
  if (!repeater || !Array.isArray(repeater.fields) || !repeater.fields.length) {
    return null;
  }

  const mapFields = repeater.fields.map((field) => convertRepeaterFieldToCmsField(field));
  return {
    type: "map",
    mapFields
  };
}

function convertRepeaterFieldToCmsField(field: RepeaterField): CmsFieldSchema {
  const type = mapRepeaterFieldType(field.type);
  return {
    key: sanitizeId(field.key),
    label: field.label || field.key,
    type,
    required: false,
    placeholder: field.placeholder ?? "",
    helpText: "",
    options: []
  };
}

function mapRepeaterFieldType(type: RepeaterField["type"]): CmsFieldType {
  if (type === "textarea") {
    return "textarea";
  }
  return "text";
}

function inferNestedSchemaFromJsonValue(raw: string): CmsNestedFieldSchema | null {
  if (typeof raw !== "string" || !raw.trim()) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return inferNestedFromSample(parsed);
  } catch {
    return null;
  }
}

function inferNestedFromSample(sample: unknown): CmsNestedFieldSchema | null {
  if (Array.isArray(sample)) {
    const first = sample.find((entry) => entry !== null && entry !== undefined);
    return {
      type: "array",
      itemSchema: first !== undefined ? inferNestedFromSample(first) ?? { type: "text" } : { type: "text" }
    };
  }

  if (isRecord(sample)) {
    const mapFields = Object.entries(sample).map(([key, value]) => {
      const nested = inferNestedFromSample(value);
      const base: CmsFieldSchema = {
        key: sanitizeId(key),
        label: key,
        type: nested?.type ?? "text",
        required: false,
        placeholder: "",
        helpText: "",
        options: []
      };

      if (nested?.type === "array") {
        base.itemSchema = nested.itemSchema;
      }
      if (nested?.type === "map") {
        base.mapFields = nested.mapFields ?? [];
      }

      return base;
    });

    return {
      type: "map",
      mapFields
    };
  }

  if (typeof sample === "boolean") {
    return { type: "boolean" };
  }

  return { type: "text" };
}

function normalizarViewFieldKey(sectionKey: string, fieldKey: string): string {
  return sanitizeId(`${sectionKey}${VIEW_FIELD_SEPARATOR}${fieldKey}`);
}

function sanitizeId(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "tipo-contenido";
}

function sanitizeSchemaId(value: string): string {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "tipo-contenido";
}

function sanitizeCollectionName(value: string): string {
  return sanitizeId(value) || "registros";
}

function sanitizeDictionaryDocumentId(value: string): string {
  return String(value)
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || DEFAULT_DICTIONARY_DOC_ID;
}

function sanitizeDictionaryRootKey(value: string): string {
  return String(value)
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "") || DEFAULT_DICTIONARY_ROOT_KEY;
}

function sanitizeDocumentSchemaId(value: string): string {
  return String(value)
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .replace(/-+/g, "-");
}

function sanitizeDocumentLabelField(value: string): string {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return "";
  }
  return sanitizeId(raw);
}
