import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";

export type CmsFirebaseServices = {
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
};

let cmsFirebaseServices: CmsFirebaseServices | null = null;

export function setCmsFirebaseServices(services: CmsFirebaseServices): void {
  cmsFirebaseServices = services;
}

export function getCmsFirebaseServices(): CmsFirebaseServices {
  if (!cmsFirebaseServices) {
    throw new Error(
      "CMS no inicializado. Ejecuta registerPifWarriorsCms(router, { firebase: { auth, firestore, storage } })."
    );
  }
  return cmsFirebaseServices;
}
