import type { Auth, User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";
import type { Ref } from "vue";

export type CmsFirebaseServices = {
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
};

export type RegisterPifWarriorsCmsOptions = {
  firebase: CmsFirebaseServices;
  basePath?: string;
  loginPath?: string;
  registerPath?: string;
  homePath?: string;
};

export type CmsStorageType = "document" | "dictionary";

export type CmsFieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "image"
  | "select"
  | "document"
  | "boolean"
  | "array"
  | "map";

export type CmsNestedFieldSchema = {
  type: CmsFieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  documentSchemaId?: string;
  documentLabelField?: string;
  itemSchema?: CmsNestedFieldSchema;
  mapFields?: CmsFieldSchema[];
};

export type CmsFieldSchema = CmsNestedFieldSchema & {
  key: string;
  label: string;
};

export type CmsContentSchema = {
  id: string;
  title: string;
  description?: string;
  storageType: CmsStorageType;
  collectionName: string;
  dictionaryDocumentId?: string;
  dictionaryRootKey?: string;
  slugFromField?: string;
  previewField?: string;
  fields: CmsFieldSchema[];
};

export type DynamicDocumentRecord = {
  id: string;
  data: Record<string, unknown>;
};

export type CmsRouterLike = {
  addRoute: (route: unknown) => unknown;
  beforeEach: (guard: (to: { meta: Record<string, unknown>; path: string; fullPath: string }) => unknown) => unknown;
};

export declare function registerPifWarriorsCms(
  router: CmsRouterLike,
  options: RegisterPifWarriorsCmsOptions
): void;
export declare function createCmsRoutes(basePath?: string, loginPath?: string, registerPath?: string): unknown[];

export declare const usuarioActual: Ref<User | null>;
export declare const rolActual: Ref<"admin" | "writer" | "manager" | null>;
export declare function cerrarSesion(): Promise<void>;

export declare function listarSchemasContenido(): Promise<CmsContentSchema[]>;
export declare function guardarSchemaContenido(schema: CmsContentSchema): Promise<void>;

export declare function crearRegistroDocumento(
  schema: CmsContentSchema,
  data: Record<string, unknown>
): Promise<string>;
export declare function actualizarRegistroDocumento(
  schema: CmsContentSchema,
  documentId: string,
  data: Record<string, unknown>
): Promise<void>;
export declare function listarRegistrosDocumento(
  schema: CmsContentSchema,
  max?: number
): Promise<DynamicDocumentRecord[]>;
export declare function eliminarRegistroDocumento(
  schema: CmsContentSchema,
  documentId: string
): Promise<void>;
export declare function guardarRegistroDiccionario(
  schema: CmsContentSchema,
  data: Record<string, unknown>,
  documentId?: string
): Promise<string>;
export declare function obtenerRegistroDiccionario(
  schema: CmsContentSchema,
  documentId?: string
): Promise<DynamicDocumentRecord | null>;
