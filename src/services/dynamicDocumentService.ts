import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type DocumentData
} from "firebase/firestore";
import { getCmsFirebaseServices } from "../firebase/context";
import type { CmsContentSchema } from "../types/contentSchema";

export type DynamicDocumentRecord = {
  id: string;
  data: Record<string, unknown>;
};

export async function crearRegistroDocumento(
  schema: CmsContentSchema,
  data: Record<string, unknown>
): Promise<string> {
  const { firestore } = getCmsFirebaseServices();
  const response = await addDoc(collection(firestore, schema.collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return response.id;
}

export async function listarRegistrosDocumento(
  schema: CmsContentSchema,
  max = 100
): Promise<DynamicDocumentRecord[]> {
  const { firestore } = getCmsFirebaseServices();
  try {
    const q = query(
      collection(firestore, schema.collectionName),
      orderBy("createdAt", "desc"),
      limit(max)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((entry) => ({
      id: entry.id,
      data: entry.data() as DocumentData
    }));
  } catch {
    const fallback = await getDocs(collection(firestore, schema.collectionName));
    return fallback.docs.map((entry) => ({
      id: entry.id,
      data: entry.data() as DocumentData
    }));
  }
}

export async function eliminarRegistroDocumento(
  schema: CmsContentSchema,
  documentId: string
): Promise<void> {
  const { firestore } = getCmsFirebaseServices();
  await deleteDoc(doc(firestore, schema.collectionName, documentId));
}

const DEFAULT_DICTIONARY_DOC_ID = "main";
const DEFAULT_DICTIONARY_ROOT_KEY = "schema";

export async function guardarRegistroDiccionario(
  schema: CmsContentSchema,
  data: Record<string, unknown>,
  documentId = DEFAULT_DICTIONARY_DOC_ID
): Promise<string> {
  const { firestore } = getCmsFirebaseServices();
  const dictionaryId = schema.dictionaryDocumentId || documentId;
  const rootKey = resolveDictionaryRootKey(schema);
  const reference = doc(firestore, schema.collectionName, dictionaryId);
  const snapshot = await getDoc(reference);

  const payload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
    createdAt: snapshot.exists() ? snapshot.data().createdAt : serverTimestamp()
  };

  if (rootKey) {
    payload[rootKey] = data;
  } else {
    for (const [key, value] of Object.entries(data)) {
      payload[key] = value;
    }
  }

  await setDoc(
    reference,
    payload,
    { merge: true }
  );

  return dictionaryId;
}

export async function obtenerRegistroDiccionario(
  schema: CmsContentSchema,
  documentId = DEFAULT_DICTIONARY_DOC_ID
): Promise<DynamicDocumentRecord | null> {
  const { firestore } = getCmsFirebaseServices();
  const dictionaryId = schema.dictionaryDocumentId || documentId;
  const snapshot = await getDoc(doc(firestore, schema.collectionName, dictionaryId));

  if (!snapshot.exists()) {
    return null;
  }

  const raw = snapshot.data() as DocumentData;
  const rootKey = resolveDictionaryRootKey(schema);
  const nested = rootKey ? raw[rootKey] : null;

  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    return {
      id: snapshot.id,
      data: nested as Record<string, unknown>
    };
  }

  return {
    id: snapshot.id,
    data: raw
  };
}

function resolveDictionaryRootKey(schema: CmsContentSchema): string {
  if (schema.storageType !== "dictionary") {
    return "";
  }

  if (typeof schema.dictionaryRootKey === "string" && schema.dictionaryRootKey.trim()) {
    return schema.dictionaryRootKey.trim();
  }

  return DEFAULT_DICTIONARY_ROOT_KEY;
}
