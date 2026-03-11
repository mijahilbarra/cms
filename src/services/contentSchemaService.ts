import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { getCmsFirebaseServices } from "../firebase/context";
import type { CmsContentSchema, CmsFieldSchema, CmsFieldType, CmsNestedFieldSchema } from "../types/contentSchema";

const SCHEMAS_COLLECTION = "cmsSchemas";
const DEFAULT_DICTIONARY_ROOT_KEY = "schema";
const DEFAULT_DICTIONARY_DOC_ID = "main";
const SCHEMA_CACHE_TTL_MS = 30_000;

let schemasCache: CmsContentSchema[] | null = null;
let schemasCacheTimestamp = 0;
let schemasCachePromise: Promise<CmsContentSchema[]> | null = null;

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
