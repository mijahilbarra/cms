import fs from "node:fs/promises";
import path from "node:path";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

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
const schemasSnapshot = await db.collection("cmsSchemas").get();
const schemas = schemasSnapshot.docs.map((entry) => ({ id: entry.id, ...(entry.data() || {}) }));

const findings = [];
const touchedDocs = new Map();
let convertedFields = 0;

for (const schema of schemas) {
  const fields = Array.isArray(schema.fields) ? schema.fields : [];
  const complexFields = fields.filter((field) => field && (field.type === "array" || field.type === "map"));
  if (!complexFields.length) {
    continue;
  }

  const collectionName = String(schema.collectionName || "").trim();
  if (!collectionName) {
    continue;
  }

  if (schema.storageType === "dictionary") {
    const rootKey = String(schema.dictionaryRootKey || "schema").trim();
    const documentId = String(schema.dictionaryDocumentId || "main").trim();
    const ref = db.collection(collectionName).doc(documentId);
    const snapshot = await ref.get();
    if (!snapshot.exists) {
      continue;
    }

    const rawDoc = snapshot.data() || {};
    const rootValue = rootKey && isRecord(rawDoc[rootKey]) ? rawDoc[rootKey] : rawDoc;
    if (!isRecord(rootValue)) {
      continue;
    }

    const { changed, nextValue, changedFields } = convertContainerBySchema(rootValue, complexFields);
    if (!changed) {
      continue;
    }

    for (const changedField of changedFields) {
      findings.push({
        schemaId: schema.id,
        storageType: "dictionary",
        collection: collectionName,
        documentId,
        fieldKey: changedField.key,
        fieldType: changedField.type
      });
      convertedFields += 1;
    }

    if (!dryRun) {
      const payload = {
        updatedAt: FieldValue.serverTimestamp()
      };
      if (rootKey) {
        payload[rootKey] = nextValue;
      } else {
        Object.assign(payload, nextValue);
      }
      await ref.set(payload, { merge: true });
    }

    touchedDocs.set(`${collectionName}/${documentId}`, true);
    continue;
  }

  const docsSnapshot = await db.collection(collectionName).get();
  for (const entry of docsSnapshot.docs) {
    const source = entry.data() || {};
    const { changed, nextValue, changedFields } = convertContainerBySchema(source, complexFields);
    if (!changed) {
      continue;
    }

    for (const changedField of changedFields) {
      findings.push({
        schemaId: schema.id,
        storageType: "document",
        collection: collectionName,
        documentId: entry.id,
        fieldKey: changedField.key,
        fieldType: changedField.type
      });
      convertedFields += 1;
    }

    if (!dryRun) {
      await entry.ref.set(
        {
          ...nextValue,
          updatedAt: FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    }

    touchedDocs.set(`${collectionName}/${entry.id}`, true);
  }
}

console.log(`Proyecto Firebase: ${projectId}`);
console.log(`Modo: ${dryRun ? "DRY RUN" : "EJECUCION REAL"}`);
console.log(`- docs tocados: ${touchedDocs.size}`);
console.log(`- campos convertidos: ${convertedFields}`);
console.log(`- hallazgos: ${findings.length}`);
for (const item of findings) {
  console.log(
    `  * ${item.schemaId} | ${item.collection}/${item.documentId} | ${item.fieldKey}:${item.fieldType}`
  );
}

function convertContainerBySchema(container, complexFields) {
  const nextValue = { ...container };
  const changedFields = [];

  for (const field of complexFields) {
    const key = String(field.key || "").trim();
    if (!key || !(key in nextValue)) {
      continue;
    }

    const currentValue = nextValue[key];
    const converted = convertStringifiedValue(field.type, currentValue);
    if (!converted.changed) {
      continue;
    }

    nextValue[key] = converted.value;
    changedFields.push({
      key,
      type: field.type
    });
  }

  return {
    changed: changedFields.length > 0,
    nextValue,
    changedFields
  };
}

function convertStringifiedValue(expectedType, value) {
  if (typeof value !== "string") {
    return { changed: false, value };
  }

  const trimmed = value.trim();
  if (!trimmed || (!trimmed.startsWith("{") && !trimmed.startsWith("["))) {
    return { changed: false, value };
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (expectedType === "array" && Array.isArray(parsed)) {
      return { changed: true, value: parsed };
    }
    if (expectedType === "map" && isRecord(parsed)) {
      return { changed: true, value: parsed };
    }
  } catch {
    return { changed: false, value };
  }

  return { changed: false, value };
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
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
