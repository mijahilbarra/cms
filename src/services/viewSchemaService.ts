import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type FirestoreError,
  type Unsubscribe
} from "firebase/firestore";
import { getCmsFirebaseServices } from "../firebase/context";
import { getViewTemplate } from "../schemas";
import type { RepeaterField, SchemaSection, ViewDocument, ViewSchema, ViewTemplate } from "../types/viewSchema";

const VIEWS_COLLECTION = "views";
export const LANDING_VIEW_ID = "landingPage";
export const NAV_VIEW_ID = "nav";
export const THEME_VIEW_ID = "siteTheme";
const VIEW_FIELD_SEPARATOR = "__";

export async function obtenerSchemaLanding(): Promise<ViewDocument> {
  return obtenerSchemaView(LANDING_VIEW_ID);
}

export async function guardarSchemaLanding(schema: ViewSchema): Promise<void> {
  return guardarSchemaView(LANDING_VIEW_ID, schema);
}

export async function obtenerSchemaView(viewId: string): Promise<ViewDocument> {
  const { firestore } = getCmsFirebaseServices();
  const reference = doc(firestore, VIEWS_COLLECTION, viewId);
  const snapshot = await getDoc(reference);

  if (!snapshot.exists()) {
    return { schema: clonarSchemaBase(viewId) };
  }

  const source = snapshot.data() as DocumentData;
  return {
    schema: fusionarSchemaConBase(viewId, source.schema)
  };
}

export async function guardarSchemaView(viewId: string, schema: ViewSchema): Promise<void> {
  const { firestore } = getCmsFirebaseServices();
  const reference = doc(firestore, VIEWS_COLLECTION, viewId);
  const serialized = serializarSchemaView(schema);
  const snapshot = await getDoc(reference);
  const current = snapshot.exists() ? (snapshot.data() as DocumentData) : {};

  await setDoc(
    reference,
    {
      ...current,
      schema: serialized,
      updatedAt: serverTimestamp()
    }
  );
}

export function escucharSchemaLanding(
  onChange: (schema: ViewSchema) => void,
  onError?: (error: FirestoreError) => void
): Unsubscribe {
  return escucharSchemaView(LANDING_VIEW_ID, onChange, onError);
}

export function escucharSchemaView(
  viewId: string,
  onChange: (schema: ViewSchema) => void,
  onError?: (error: FirestoreError) => void
): Unsubscribe {
  const { firestore } = getCmsFirebaseServices();
  const reference = doc(firestore, VIEWS_COLLECTION, viewId);

  return onSnapshot(
    reference,
    (snapshot) => {
      if (!snapshot.exists()) {
        onChange(clonarSchemaBase(viewId));
        return;
      }

      const source = snapshot.data() as DocumentData;
      onChange(fusionarSchemaConBase(viewId, source.schema));
    },
    (error) => {
      console.error(`No se pudo escuchar el schema ${viewId}:`, error);
      onChange(clonarSchemaBase(viewId));
      onError?.(error);
    }
  );
}

export function esperarPrimerSchemaView(viewId: string): Promise<void> {
  const { firestore } = getCmsFirebaseServices();
  const reference = doc(firestore, VIEWS_COLLECTION, viewId);

  return new Promise((resolve) => {
    let resolved = false;
    let unsubscribe: Unsubscribe | null = null;

    const finalizar = () => {
      if (resolved) {
        return;
      }
      resolved = true;
      if (unsubscribe) {
        unsubscribe();
      }
      resolve();
    };

    unsubscribe = onSnapshot(
      reference,
      () => finalizar(),
      () => finalizar()
    );

    // Cubre el caso donde el primer callback llega de forma síncrona.
    if (resolved && unsubscribe) {
      unsubscribe();
    }
  });
}

export function valorCampo(schema: ViewSchema, sectionKey: string, fieldKey: string): string {
  const field = schema[sectionKey]?.fields[fieldKey];
  if (!field) {
    return "";
  }
  return field.value ?? "";
}

export function valorCampoJson<T>(schema: ViewSchema, sectionKey: string, fieldKey: string, fallback: T): T {
  const value = valorCampo(schema, sectionKey, fieldKey);
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`JSON inválido en schema ${sectionKey}.${fieldKey}:`, error);
    return fallback;
  }
}

function fusionarSchemaConBase(viewId: string, input: unknown): ViewSchema {
  const base = clonarSchemaBase(viewId);
  if (!isRecord(input)) {
    return base;
  }

  if (isSchemaDictionaryMap(input)) {
    aplicarSchemaDictionary(base, input);
    return base;
  }

  for (const [sectionKey, incomingSection] of Object.entries(input)) {
    if (!isSchemaSection(incomingSection)) {
      continue;
    }

    if (!base[sectionKey]) {
      base[sectionKey] = incomingSection;
      continue;
    }

    const currentSection = base[sectionKey];
    currentSection.label = incomingSection.label || currentSection.label;
    currentSection.description = incomingSection.description || currentSection.description;

    for (const [fieldKey, incomingField] of Object.entries(incomingSection.fields)) {
      if (!incomingField || typeof incomingField !== "object") {
        continue;
      }

      if (!currentSection.fields[fieldKey]) {
        currentSection.fields[fieldKey] = incomingField as SchemaSection["fields"][string];
        continue;
      }

      const currentField = currentSection.fields[fieldKey];
      currentField.value = readString((incomingField as Record<string, unknown>).value, currentField.value);
      currentField.label = readString((incomingField as Record<string, unknown>).label, currentField.label);
      currentField.type = readString((incomingField as Record<string, unknown>).type, currentField.type) as
        | "text"
        | "textarea"
        | "url"
        | "color"
        | "json"
        | "select";
      const incomingOptions = (incomingField as Record<string, unknown>).options;
      if (Array.isArray(incomingOptions)) {
        currentField.options = incomingOptions.filter((option) => typeof option === "string");
      }
      currentField.placeholder = readString(
        (incomingField as Record<string, unknown>).placeholder,
        currentField.placeholder ?? ""
      );
      currentField.helpText = readString(
        (incomingField as Record<string, unknown>).helpText,
        currentField.helpText ?? ""
      );
      const incomingRepeater = (incomingField as Record<string, unknown>).repeater;
      if (incomingRepeater && typeof incomingRepeater === "object") {
        currentField.repeater = fusionarRepeaterConfig(
          currentField.repeater,
          incomingRepeater as Record<string, unknown>
        );
      }
    }
  }

  return base;
}

function clonarSchemaBase(viewId: string): ViewSchema {
  const template = getTemplateOrThrow(viewId);
  return JSON.parse(JSON.stringify(template.schema)) as ViewSchema;
}

function getTemplateOrThrow(viewId: string): ViewTemplate {
  const template = getViewTemplate(viewId);
  if (!template) {
    throw new Error(`No existe un template para viewId: ${viewId}`);
  }
  return template;
}

function serializarSchemaView(schema: ViewSchema): Record<string, string> {
  const dictionary: Record<string, string> = {};

  for (const [sectionKey, section] of Object.entries(schema)) {
    for (const [fieldKey, field] of Object.entries(section.fields)) {
      const key = normalizarViewFieldKey(sectionKey, fieldKey);
      dictionary[key] = typeof field.value === "string" ? field.value : "";
    }
  }

  return dictionary;
}

function isSchemaDictionaryMap(input: Record<string, unknown>): boolean {
  return Object.values(input).every((value) => {
    if (typeof value === "string") {
      return true;
    }

    if (value === null || value === undefined) {
      return true;
    }

    return typeof value === "number" || typeof value === "boolean";
  });
}

function aplicarSchemaDictionary(base: ViewSchema, dictionary: Record<string, unknown>): void {
  for (const [sectionKey, section] of Object.entries(base)) {
    for (const [fieldKey, field] of Object.entries(section.fields)) {
      const lookupKey = normalizarViewFieldKey(sectionKey, fieldKey);
      const incomingValue = dictionary[lookupKey];
      if (incomingValue === undefined || incomingValue === null) {
        continue;
      }

      field.value = String(incomingValue);
    }
  }
}

function normalizarViewFieldKey(sectionKey: string, fieldKey: string): string {
  return String(`${sectionKey}${VIEW_FIELD_SEPARATOR}${fieldKey}`)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isSchemaSection(value: unknown): value is SchemaSection {
  return isRecord(value) && isRecord(value.fields);
}

function readString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function fusionarRepeaterConfig(
  baseRepeater: SchemaSection["fields"][string]["repeater"],
  incomingRepeater: Record<string, unknown>
): NonNullable<SchemaSection["fields"][string]["repeater"]> {
  const fieldsMap = new Map<string, RepeaterField>();

  for (const field of baseRepeater?.fields ?? []) {
    fieldsMap.set(field.key, { ...field });
  }

  const incomingFields = incomingRepeater.fields;
  if (Array.isArray(incomingFields)) {
    for (const rawField of incomingFields) {
      if (!isRecord(rawField)) {
        continue;
      }

      const key = readString(rawField.key, "").trim();
      if (!key) {
        continue;
      }

      const baseField = fieldsMap.get(key);
      const placeholder = readString(rawField.placeholder, baseField?.placeholder ?? "");
      const mergedField: RepeaterField = {
        key,
        label: readString(rawField.label, baseField?.label ?? key),
        type: normalizarTipoRepeater(rawField.type, baseField?.type ?? "text")
      };
      if (placeholder) {
        mergedField.placeholder = placeholder;
      }

      fieldsMap.set(key, mergedField);
    }
  }

  return {
    itemLabel: readString(incomingRepeater.itemLabel, baseRepeater?.itemLabel ?? "item"),
    fields: Array.from(fieldsMap.values())
  };
}

function normalizarTipoRepeater(value: unknown, fallback: RepeaterField["type"]): RepeaterField["type"] {
  const candidate = readString(value, fallback).trim().toLowerCase();
  if (candidate === "textarea" || candidate === "url" || candidate === "text") {
    return candidate;
  }
  return fallback;
}
