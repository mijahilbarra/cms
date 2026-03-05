import type { Auth, User } from "firebase/auth";
import type { Firestore, FirestoreError, Timestamp, Unsubscribe } from "firebase/firestore";
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

export type BlogPost = {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  contenidoHtml: string;
  imagenPrincipalUrl: string;
  publicado: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type BlogPostInput = Omit<BlogPost, "id" | "slug" | "createdAt" | "updatedAt">;

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

export type SchemaFieldType = "text" | "textarea" | "url" | "color" | "json" | "select";

export type RepeaterField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url";
  placeholder?: string;
};

export type RepeaterConfig = {
  itemLabel: string;
  fields: RepeaterField[];
};

export type SchemaField = {
  label: string;
  type: SchemaFieldType;
  value: string;
  options?: string[];
  placeholder?: string;
  helpText?: string;
  repeater?: RepeaterConfig;
};

export type SchemaSection = {
  label: string;
  description?: string;
  fields: Record<string, SchemaField>;
};

export type ViewSchema = Record<string, SchemaSection>;

export type ViewDocument = {
  schema: ViewSchema;
};

export type CmsRouterLike = {
  addRoute: (route: unknown) => unknown;
  beforeEach: (guard: (to: { meta: Record<string, unknown>; path: string; fullPath: string }) => unknown) => unknown;
};

export declare function registerPifWarriorsCms(
  router: CmsRouterLike,
  options: RegisterPifWarriorsCmsOptions
): void;

export declare const usuarioActual: Ref<User | null>;
export declare const rolActual: Ref<"admin" | "writer" | "manager" | null>;
export declare function cerrarSesion(): Promise<void>;

export declare function crearBlog(input: BlogPostInput): Promise<string>;
export declare function listarBlogs(max?: number): Promise<BlogPost[]>;
export declare function obtenerBlogPorSlug(slug: string): Promise<BlogPost | null>;
export declare function eliminarBlog(id: string): Promise<void>;
export declare const DEFAULT_BLOG_DOCUMENT_SCHEMA: CmsContentSchema;
export declare const DEFAULT_REPRESENTATIVES_DOCUMENT_SCHEMA: CmsContentSchema;
export declare const DEFAULT_PROPERTIES_DOCUMENT_SCHEMA: CmsContentSchema;
export declare function ensureDefaultSchemas(): Promise<void>;
export declare function listarSchemasContenido(): Promise<CmsContentSchema[]>;
export declare function guardarSchemaContenido(schema: CmsContentSchema): Promise<void>;
export declare function crearRegistroDocumento(
  schema: CmsContentSchema,
  data: Record<string, unknown>
): Promise<string>;
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

export declare const LANDING_VIEW_ID: "landingPage";
export declare const NAV_VIEW_ID: "nav";
export declare const THEME_VIEW_ID: "siteTheme";

export declare function obtenerSchemaLanding(): Promise<ViewDocument>;
export declare function guardarSchemaLanding(schema: ViewSchema): Promise<void>;
export declare function obtenerSchemaView(viewId: string): Promise<ViewDocument>;
export declare function guardarSchemaView(viewId: string, schema: ViewSchema): Promise<void>;
export declare function escucharSchemaLanding(
  onChange: (schema: ViewSchema) => void,
  onError?: (error: FirestoreError) => void
): Unsubscribe;
export declare function escucharSchemaView(
  viewId: string,
  onChange: (schema: ViewSchema) => void,
  onError?: (error: FirestoreError) => void
): Unsubscribe;
export declare function esperarPrimerSchemaView(viewId: string): Promise<void>;
export declare function valorCampo(schema: ViewSchema, sectionKey: string, fieldKey: string): string;
export declare function valorCampoJson<T>(
  schema: ViewSchema,
  sectionKey: string,
  fieldKey: string,
  fallback: T
): T;
