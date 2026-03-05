import fs from "node:fs/promises";
import path from "node:path";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const VIEW_FIELD_SEPARATOR = "__";
const DEFAULT_DICTIONARY_ROOT_KEY = "schema";
const MIGRATION_VERSION = 2;

const VIEW_DEFINITIONS = [
  { id: "landingPage", titulo: "Landing", schemaFile: "src/schemas/landingPage.schema.json" },
  { id: "productosPage", titulo: "Tratamiento", schemaFile: "src/schemas/productosPage.schema.json" },
  { id: "quienesSomosPage", titulo: "Quiénes somos", schemaFile: "src/schemas/quienesSomosPage.schema.json" },
  { id: "dondeEstamosPage", titulo: "Dónde estamos", schemaFile: "src/schemas/dondeEstamosPage.schema.json" },
  { id: "blogPage", titulo: "Blog", schemaFile: "src/schemas/blogPage.schema.json" },
  { id: "agradecimientosPage", titulo: "Agradecimientos", schemaFile: "src/schemas/agradecimientosPage.schema.json" },
  { id: "nav", titulo: "Navegación", schemaFile: "src/schemas/nav.schema.json" },
  { id: "siteTheme", titulo: "Paleta", schemaFile: "src/schemas/siteTheme.schema.json" }
];
const CANONICAL_VIEW_ID_BY_LOWER = new Map(
  VIEW_DEFINITIONS.map((definition) => [definition.id.toLowerCase(), definition.id])
);

const args = parseArgs(process.argv.slice(2));
const envFile = args.envFile || "../pifWarriors/.env";
const dryRun = normalizeBoolean(args.dryRun || "false");
await loadEnvFileIfExists(envFile);

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
if (!projectId) {
  throw new Error("Define FIREBASE_PROJECT_ID o VITE_FIREBASE_PROJECT_ID.");
}

const credential = await resolveCredential();
if (!getApps().length) {
  initializeApp({ credential, projectId });
}

const db = getFirestore();

console.log(`Proyecto Firebase: ${projectId}`);
console.log(`Modo: ${dryRun ? "DRY RUN" : "EJECUCION REAL"}`);

let migratedViews = 0;
let upsertedCmsSchemas = 0;

for (const definition of VIEW_DEFINITIONS) {
  const templateSchema = await readJson(path.resolve(process.cwd(), definition.schemaFile));
  const baseDictionary = flattenTemplateSchema(templateSchema);

  const viewRef = db.collection("views").doc(definition.id);
  const viewSnapshot = await viewRef.get();
  const existingViewData = viewSnapshot.exists ? viewSnapshot.data() || {} : {};
  const existingSchema = existingViewData.schema || null;
  const nextDictionary = flattenExistingSchema(existingSchema, baseDictionary);

  const cmsSchema = buildCmsDictionarySchema(definition, templateSchema);
  const cmsRef = db.collection("cmsSchemas").doc(cmsSchema.id);

  if (!dryRun) {
    await viewRef.set({
      ...existingViewData,
      schema: nextDictionary,
      updatedAt: FieldValue.serverTimestamp(),
      migratedAt: FieldValue.serverTimestamp(),
      migrationVersion: MIGRATION_VERSION
    });

    await cmsRef.set(
      {
        ...cmsSchema,
        updatedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  }

  migratedViews += 1;
  upsertedCmsSchemas += 1;
  console.log(`- OK ${definition.id}: schema plano + cmsSchemas/${cmsSchema.id}`);
}

await normalizeDictionarySchemas(db, dryRun);

console.log("Migración completada.");
console.log(`- views migradas: ${migratedViews}`);
console.log(`- cmsSchemas upsert: ${upsertedCmsSchemas}`);

async function normalizeDictionarySchemas(dbRef, dryRunMode) {
  const snapshot = await dbRef.collection("cmsSchemas").where("storageType", "==", "dictionary").get();
  let touched = 0;

  for (const entry of snapshot.docs) {
    const source = entry.data() || {};
    const patch = {};

    if (typeof source.dictionaryRootKey !== "string" || !source.dictionaryRootKey.trim()) {
      patch.dictionaryRootKey = DEFAULT_DICTIONARY_ROOT_KEY;
    }

    if (typeof source.dictionaryDocumentId !== "string" || !source.dictionaryDocumentId.trim()) {
      if (String(entry.id).startsWith("view-")) {
        const rawViewId = String(entry.id).slice("view-".length);
        patch.dictionaryDocumentId = CANONICAL_VIEW_ID_BY_LOWER.get(rawViewId.toLowerCase()) || rawViewId;
      } else {
        patch.dictionaryDocumentId = "main";
      }
    }

    if (Object.keys(patch).length === 0) {
      continue;
    }

    patch.updatedAt = FieldValue.serverTimestamp();

    if (!dryRunMode) {
      await entry.ref.set(patch, { merge: true });
    }

    touched += 1;
  }

  console.log(`- dictionary schemas normalizados: ${touched}`);
}

function buildCmsDictionarySchema(definition, templateSchema) {
  const fields = [];

  for (const [sectionKey, section] of Object.entries(templateSchema)) {
    if (!section || typeof section !== "object" || !section.fields || typeof section.fields !== "object") {
      continue;
    }

    for (const [fieldKey, field] of Object.entries(section.fields)) {
      if (!field || typeof field !== "object") {
        continue;
      }

      fields.push({
        key: normalizeViewFieldKey(sectionKey, fieldKey),
        label: `${toStringOrFallback(section.label, sectionKey)} · ${toStringOrFallback(field.label, fieldKey)}`,
        type: mapViewTypeToCmsType(field.type),
        required: false,
        placeholder: toStringOrFallback(field.placeholder, ""),
        helpText: toStringOrFallback(field.helpText, ""),
        options: Array.isArray(field.options) ? field.options.filter((option) => typeof option === "string") : []
      });

      const current = fields[fields.length - 1];
      const expanded = expandJsonFieldDefinition(current, field);
      fields[fields.length - 1] = expanded;
    }
  }

  return {
    id: `view-${definition.id}`,
    title: `View: ${definition.titulo}`,
    description: `Schema dictionary por documento para ${definition.titulo}.`,
    storageType: "dictionary",
    collectionName: "views",
    dictionaryDocumentId: definition.id,
    dictionaryRootKey: DEFAULT_DICTIONARY_ROOT_KEY,
    previewField: fields[0]?.key || "",
    fields
  };
}

function flattenTemplateSchema(templateSchema) {
  const flat = {};

  for (const [sectionKey, section] of Object.entries(templateSchema || {})) {
    if (!section || typeof section !== "object" || !section.fields || typeof section.fields !== "object") {
      continue;
    }

    for (const [fieldKey, field] of Object.entries(section.fields)) {
      if (!field || typeof field !== "object") {
        continue;
      }

      flat[normalizeViewFieldKey(sectionKey, fieldKey)] = toStringOrFallback(field.value, "");
    }
  }

  return flat;
}

function flattenExistingSchema(input, fallback) {
  const next = { ...fallback };
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return next;
  }

  if (isFlatDictionary(input)) {
    for (const [key, value] of Object.entries(input)) {
      next[normalizeRawMapKey(key)] = toStringOrFallback(value, "");
    }
    return next;
  }

  for (const [sectionKey, section] of Object.entries(input)) {
    if (!section || typeof section !== "object" || !section.fields || typeof section.fields !== "object") {
      continue;
    }

    for (const [fieldKey, field] of Object.entries(section.fields)) {
      if (!field || typeof field !== "object") {
        continue;
      }

      next[normalizeViewFieldKey(sectionKey, fieldKey)] = toStringOrFallback(field.value, "");
    }
  }

  return next;
}

function isFlatDictionary(value) {
  return Object.values(value).every((item) => {
    if (item === null || item === undefined) {
      return true;
    }
    return typeof item === "string" || typeof item === "number" || typeof item === "boolean";
  });
}

function normalizeViewFieldKey(sectionKey, fieldKey) {
  return normalizeRawMapKey(`${sectionKey}${VIEW_FIELD_SEPARATOR}${fieldKey}`);
}

function normalizeRawMapKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapViewTypeToCmsType(viewType) {
  const normalized = String(viewType || "").trim().toLowerCase();
  if (normalized === "textarea") {
    return "textarea";
  }
  if (normalized === "select") {
    return "select";
  }
  return "text";
}

function expandJsonFieldDefinition(baseField, sourceField) {
  const normalized = String(sourceField?.type || "").trim().toLowerCase();
  if (normalized !== "json") {
    return baseField;
  }

  const repeaterSchema = buildNestedFromRepeater(sourceField?.repeater);
  if (repeaterSchema) {
    return {
      ...baseField,
      type: "array",
      options: [],
      itemSchema: repeaterSchema
    };
  }

  const inferred = inferNestedSchemaFromJsonValue(sourceField?.value);
  if (inferred?.type === "array") {
    return {
      ...baseField,
      type: "array",
      options: [],
      itemSchema: inferred.itemSchema || { type: "text" }
    };
  }
  if (inferred?.type === "map") {
    return {
      ...baseField,
      type: "map",
      options: [],
      mapFields: inferred.mapFields || []
    };
  }

  return {
    ...baseField,
    type: "textarea"
  };
}

function buildNestedFromRepeater(repeater) {
  const fields = Array.isArray(repeater?.fields) ? repeater.fields : [];
  if (!fields.length) {
    return null;
  }
  return {
    type: "map",
    mapFields: fields
      .map((field) => toMapField(field))
      .filter(Boolean)
  };
}

function toMapField(field) {
  if (!field || typeof field !== "object") {
    return null;
  }
  const key = normalizeRawMapKey(field.key);
  if (!key) {
    return null;
  }
  const rawType = String(field.type || "").trim().toLowerCase();
  return {
    key,
    label: toStringOrFallback(field.label, key),
    type: rawType === "textarea" ? "textarea" : "text",
    required: false,
    placeholder: toStringOrFallback(field.placeholder, ""),
    helpText: "",
    options: []
  };
}

function inferNestedSchemaFromJsonValue(raw) {
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

function inferNestedFromSample(sample) {
  if (Array.isArray(sample)) {
    const first = sample.find((entry) => entry !== null && entry !== undefined);
    return {
      type: "array",
      itemSchema: first !== undefined ? inferNestedFromSample(first) || { type: "text" } : { type: "text" }
    };
  }

  if (sample && typeof sample === "object" && !Array.isArray(sample)) {
    const mapFields = Object.entries(sample).map(([key, value]) => {
      const nested = inferNestedFromSample(value);
      const field = {
        key: normalizeRawMapKey(key),
        label: key,
        type: nested?.type || "text",
        required: false,
        placeholder: "",
        helpText: "",
        options: []
      };
      if (nested?.type === "array") {
        field.itemSchema = nested.itemSchema;
      }
      if (nested?.type === "map") {
        field.mapFields = nested.mapFields || [];
      }
      return field;
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

function toStringOrFallback(value, fallback) {
  return typeof value === "string" ? value : fallback;
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function parseArgs(values) {
  const output = {};
  for (let i = 0; i < values.length; i += 1) {
    const token = values[i];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = values[i + 1];
    if (!next || next.startsWith("--")) {
      output[toCamel(key)] = "true";
      continue;
    }

    output[toCamel(key)] = next;
    i += 1;
  }
  return output;
}

function toCamel(value) {
  return String(value).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

async function loadEnvFileIfExists(relativeOrAbsolutePath) {
  const candidate = path.resolve(process.cwd(), relativeOrAbsolutePath);

  try {
    const raw = await fs.readFile(candidate, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const equalIndex = trimmed.indexOf("=");
      if (equalIndex <= 0) {
        continue;
      }

      const key = trimmed.slice(0, equalIndex).trim();
      let value = trimmed.slice(equalIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // Si no existe .env, seguimos con variables ya definidas en entorno.
  }
}

async function resolveCredential() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON));
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const serviceAccountRaw = await fs.readFile(
      path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH),
      "utf8"
    );
    return cert(JSON.parse(serviceAccountRaw));
  }

  return applicationDefault();
}

function normalizeBoolean(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return ["1", "true", "yes", "si", "sí", "on"].includes(normalized);
}
