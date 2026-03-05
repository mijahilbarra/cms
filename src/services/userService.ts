import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { getCmsFirebaseServices } from "../firebase/context";
import type { AppUser, NullableUserRole } from "../types/user";

const USERS_COLLECTION = "users";

export async function sincronizarPerfilUsuario(user: User): Promise<void> {
  const { firestore } = getCmsFirebaseServices();
  const reference = doc(firestore, USERS_COLLECTION, user.uid);
  const snapshot = await getDoc(reference);

  if (!snapshot.exists()) {
    await setDoc(reference, {
      email: user.email ?? "",
      role: null,
      lastLoginAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return;
  }

  await setDoc(
    reference,
    {
      email: user.email ?? "",
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function obtenerRolUsuario(uid: string): Promise<NullableUserRole> {
  const { firestore } = getCmsFirebaseServices();
  const snapshot = await getDoc(doc(firestore, USERS_COLLECTION, uid));
  if (!snapshot.exists()) {
    return null;
  }

  return normalizarRol(snapshot.data().role);
}

export async function listarUsuarios(): Promise<AppUser[]> {
  const { firestore } = getCmsFirebaseServices();
  const q = query(collection(firestore, USERS_COLLECTION), orderBy("email", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((entry) => ({
    id: entry.id,
    email: String(entry.data().email ?? ""),
    role: normalizarRol(entry.data().role),
    lastLoginAt: entry.data().lastLoginAt,
    createdAt: entry.data().createdAt,
    updatedAt: entry.data().updatedAt
  }));
}

export async function actualizarRolUsuario(uid: string, role: NullableUserRole): Promise<void> {
  const { firestore } = getCmsFirebaseServices();
  await updateDoc(doc(firestore, USERS_COLLECTION, uid), {
    role,
    updatedAt: serverTimestamp()
  });
}

function normalizarRol(value: unknown): NullableUserRole {
  if (value === "admin" || value === "writer" || value === "manager") {
    return value;
  }
  return null;
}
