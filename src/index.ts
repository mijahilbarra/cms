import "./styles/cms-static.css";

export { registerPifWarriorsCms, createCmsRoutes } from "./router";
export type { RegisterPifWarriorsCmsOptions } from "./router";
export type { CmsFirebaseServices } from "./firebase/context";
export { usuarioActual, cerrarSesion, rolActual } from "./firebase/auth";
export {
  crearBlog,
  listarBlogs,
  obtenerBlogPorSlug,
  eliminarBlog
} from "./services/blogService";
export {
  DEFAULT_BLOG_DOCUMENT_SCHEMA,
  DEFAULT_REPRESENTATIVES_DOCUMENT_SCHEMA,
  DEFAULT_PROPERTIES_DOCUMENT_SCHEMA,
  ensureDefaultSchemas,
  listarSchemasContenido,
  guardarSchemaContenido
} from "./services/contentSchemaService";
export {
  crearRegistroDocumento,
  actualizarRegistroDocumento,
  listarRegistrosDocumento,
  eliminarRegistroDocumento,
  guardarRegistroDiccionario,
  obtenerRegistroDiccionario
} from "./services/dynamicDocumentService";
export {
  LANDING_VIEW_ID,
  NAV_VIEW_ID,
  THEME_VIEW_ID,
  obtenerSchemaLanding,
  guardarSchemaLanding,
  obtenerSchemaView,
  guardarSchemaView,
  escucharSchemaLanding,
  escucharSchemaView,
  esperarPrimerSchemaView,
  valorCampo,
  valorCampoJson
} from "./services/viewSchemaService";
export type { BlogPost, BlogPostInput } from "./types/blog";
export type {
  CmsStorageType,
  CmsFieldType,
  CmsNestedFieldSchema,
  CmsFieldSchema,
  CmsContentSchema
} from "./types/contentSchema";
export type { DynamicDocumentRecord } from "./services/dynamicDocumentService";
export type { ViewDocument, ViewSchema } from "./types/viewSchema";
