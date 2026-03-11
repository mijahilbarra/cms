import fs from "node:fs/promises";
import path from "node:path";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const args = parseArgs(process.argv.slice(2));
const envFile = args.envFile || ".env";
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
const schemaId = String(args.schemaId || "").trim();
if (!schemaId && !args.schemaFile) {
  throw new Error("Define --schema-id o --schema-file para indicar el esquema a usar.");
}
const schema = await resolveSchema(db, schemaId, args.schemaFile || "");

const latestFixture = await resolveFixture(schema.id, args.fixture || "");
const fixtureData = { ...latestFixture.data };

if (typeof args.title === "string" && args.title.trim()) {
  fixtureData.titulo = args.title.trim();
}
if (typeof args.summary === "string" && args.summary.trim()) {
  fixtureData.resumen = args.summary.trim();
}
if (typeof args.html === "string" && args.html.trim()) {
  fixtureData.contenidoHtml = args.html.trim();
}
if (typeof args.cover === "string" && args.cover.trim()) {
  fixtureData.imagenPrincipalUrl = args.cover.trim();
}
if (typeof args.published === "string") {
  fixtureData.publicado = normalizeBoolean(args.published);
}

const payload = buildPayloadFromSchema(schema, fixtureData);
if (schema.slugFromField && typeof payload[schema.slugFromField] === "string") {
  payload.slug = toSlug(payload[schema.slugFromField]);
}

payload.createdAt = FieldValue.serverTimestamp();
payload.updatedAt = FieldValue.serverTimestamp();

const collectionRef = db.collection(schema.collectionName);

let docId = "";
if (schema.storageType === "dictionary") {
  const dictionaryId = args.dictionaryId || schema.dictionaryDocumentId || "main";
  const rootKey = schema.dictionaryRootKey || "schema";
  const dictionaryPayload = rootKey ? { [rootKey]: payload } : payload;
  await collectionRef.doc(dictionaryId).set(dictionaryPayload, { merge: true });
  docId = dictionaryId;
} else {
  const created = await collectionRef.add(payload);
  docId = created.id;
}

console.log("Registro CMS creado:");
console.log(`- schemaId: ${schema.id}`);
console.log(`- storageType: ${schema.storageType}`);
console.log(`- collection: ${schema.collectionName}`);
console.log(`- docId: ${docId}`);
console.log(`- fixture: ${latestFixture.path}`);
if (typeof payload.slug === "string") {
  console.log(`- slug: ${payload.slug}`);
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

async function resolveSchema(dbRef, schemaIdValue, schemaFile) {
  if (schemaFile) {
    const schemaRaw = await fs.readFile(path.resolve(process.cwd(), schemaFile), "utf8");
    return normalizeSchema(JSON.parse(schemaRaw));
  }

  const snapshot = await dbRef.collection("cmsSchemas").doc(schemaIdValue).get();
  if (snapshot.exists) {
    return normalizeSchema({ id: snapshot.id, ...snapshot.data() });
  }

  throw new Error(
    `No existe el schema \"${schemaIdValue}\" en cmsSchemas. Usa --schema-file para enviarlo.`
  );
}

async function resolveFixture(schemaIdValue, fixturePathArg) {
  if (fixturePathArg) {
    const absolute = path.resolve(process.cwd(), fixturePathArg);
    const raw = await fs.readFile(absolute, "utf8");
    return { path: absolute, data: JSON.parse(raw) };
  }

  const fixturesDir = path.resolve(process.cwd(), "scripts/fixtures/content");
  const files = await safeReadDir(fixturesDir);
  const candidates = files
    .filter((name) => name.startsWith(`${schemaIdValue}-`) && name.endsWith(".json"))
    .map((name) => ({ name, absolute: path.join(fixturesDir, name) }));

  if (!candidates.length) {
    const nowStamp = new Date().toISOString().replace(/[:.]/g, "-");
    const generatedPath = path.join(fixturesDir, `${schemaIdValue}-${nowStamp}.json`);
    const generatedData = defaultFixtureData(schemaIdValue);
    await fs.mkdir(fixturesDir, { recursive: true });
    await fs.writeFile(generatedPath, `${JSON.stringify(generatedData, null, 2)}\n`, "utf8");
    return { path: generatedPath, data: generatedData };
  }

  const withStats = await Promise.all(
    candidates.map(async (entry) => {
      const stat = await fs.stat(entry.absolute);
      return { ...entry, mtimeMs: stat.mtimeMs };
    })
  );

  withStats.sort((a, b) => b.mtimeMs - a.mtimeMs);
  const latest = withStats[0];
  const raw = await fs.readFile(latest.absolute, "utf8");
  return { path: latest.absolute, data: JSON.parse(raw) };
}

async function safeReadDir(dirPath) {
  try {
    return await fs.readdir(dirPath);
  } catch {
    return [];
  }
}

function defaultFixtureData(schemaIdValue) {
  return {};
}

function normalizeSchema(input) {
  const storageType = input.storageType === "dictionary" ? "dictionary" : "document";
  return {
    id: String(input.id || "content"),
    title: String(input.title || "Content"),
    storageType,
    collectionName: String(input.collectionName || "registros"),
    dictionaryDocumentId:
      storageType === "dictionary" ? String(input.dictionaryDocumentId || "main") : "",
    dictionaryRootKey: storageType === "dictionary" ? String(input.dictionaryRootKey || "schema") : "",
    slugFromField: String(input.slugFromField || ""),
    previewField: String(input.previewField || ""),
    fields: Array.isArray(input.fields) ? input.fields : []
  };
}

function buildPayloadFromSchema(schema, source) {
  const payload = {};

  for (const field of schema.fields) {
    const key = field.key;
    const incoming = source[key];

    switch (field.type) {
      case "boolean":
        payload[key] = typeof incoming === "boolean" ? incoming : false;
        break;
      case "array":
        payload[key] = normalizeArrayValue(field, incoming);
        break;
      case "map":
        payload[key] = normalizeMapValue(field, incoming);
        break;
      case "image":
      case "text":
      case "textarea":
      case "richtext":
      case "select":
      default:
        payload[key] = typeof incoming === "string" ? incoming : "";
        break;
    }
  }

  return payload;
}

function normalizeArrayValue(field, incoming) {
  if (!Array.isArray(incoming)) {
    return [];
  }
  if (!field.itemSchema || typeof field.itemSchema !== "object") {
    return incoming;
  }
  return incoming.map((item) => normalizeNestedValue(field.itemSchema, item));
}

function normalizeMapValue(field, incoming) {
  if (!isRecord(incoming)) {
    return {};
  }
  const mapFields = Array.isArray(field.mapFields) ? field.mapFields : [];
  if (!mapFields.length) {
    return incoming;
  }
  return normalizeRecordByFields(mapFields, incoming);
}

function normalizeNestedValue(schemaNode, incoming) {
  if (!schemaNode || typeof schemaNode !== "object") {
    return incoming;
  }

  if (schemaNode.type === "array") {
    if (!Array.isArray(incoming)) {
      return [];
    }
    if (!schemaNode.itemSchema || typeof schemaNode.itemSchema !== "object") {
      return incoming;
    }
    return incoming.map((item) => normalizeNestedValue(schemaNode.itemSchema, item));
  }

  if (schemaNode.type === "map") {
    if (!isRecord(incoming)) {
      return {};
    }
    const mapFields = Array.isArray(schemaNode.mapFields) ? schemaNode.mapFields : [];
    if (!mapFields.length) {
      return incoming;
    }
    return normalizeRecordByFields(mapFields, incoming);
  }

  if (schemaNode.type === "boolean") {
    return typeof incoming === "boolean" ? incoming : false;
  }

  return typeof incoming === "string" ? incoming : "";
}

function normalizeRecordByFields(fields, incoming) {
  const output = {};
  for (const field of fields) {
    if (!field || typeof field !== "object") {
      continue;
    }
    const key = String(field.key || "").trim();
    if (!key) {
      continue;
    }
    const value = incoming[key];
    output[key] = normalizeNestedValue(field, value);
  }
  return output;
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function toSlug(value) {
  const base = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return `${base}-${Date.now().toString().slice(-6)}`;
}

function normalizeBoolean(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return ["1", "true", "yes", "si", "sí", "on"].includes(normalized);
}
