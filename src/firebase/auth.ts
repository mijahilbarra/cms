import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User
} from "firebase/auth";
import { ref } from "vue";
import { obtenerRolUsuario, sincronizarPerfilUsuario } from "../services/userService";
import type { NullableUserRole } from "../types/user";
import { getCmsFirebaseServices } from "./context";

export const usuarioActual = ref<User | null>(null);
export const authLista = ref(false);
export const rolActual = ref<NullableUserRole>(null);

let resolveReady: ((value: void | PromiseLike<void>) => void) | null = null;
let readyPromise = new Promise<void>((resolve) => {
  resolveReady = resolve;
});
let authInitialized = false;

export function initCmsAuthListener(): void {
  if (authInitialized) {
    return;
  }

  const { auth } = getCmsFirebaseServices();
  usuarioActual.value = auth.currentUser;

  onAuthStateChanged(auth, async (user) => {
    usuarioActual.value = user;
    rolActual.value = null;

    if (user) {
      await sincronizarSesionUsuario(user);
    }

    authLista.value = true;
    if (resolveReady) {
      resolveReady();
      resolveReady = null;
    }
  });

  authInitialized = true;
}

export async function esperarAuthLista(): Promise<void> {
  if (authLista.value) {
    return;
  }
  await readyPromise;
}

export async function registrarUsuario(email: string, password: string): Promise<void> {
  const { auth } = getCmsFirebaseServices();
  await setPersistence(auth, browserLocalPersistence);
  const credentials = await createUserWithEmailAndPassword(auth, email, password);
  await sincronizarSesionUsuario(credentials.user);
}

export async function iniciarSesion(email: string, password: string): Promise<void> {
  const { auth } = getCmsFirebaseServices();
  await setPersistence(auth, browserLocalPersistence);
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  await sincronizarSesionUsuario(credentials.user);
}

export async function cerrarSesion(): Promise<void> {
  const { auth } = getCmsFirebaseServices();
  await signOut(auth);
}

export function resetCmsAuthStateForTests(): void {
  authInitialized = false;
  authLista.value = false;
  usuarioActual.value = null;
  rolActual.value = null;
  readyPromise = new Promise<void>((resolve) => {
    resolveReady = resolve;
  });
}

async function sincronizarSesionUsuario(user: User): Promise<void> {
  try {
    await sincronizarPerfilUsuario(user);
    rolActual.value = await obtenerRolUsuario(user.uid);
  } catch (error) {
    console.error("No se pudo sincronizar el perfil del usuario:", error);
  }
}
