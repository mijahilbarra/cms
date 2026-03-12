import "./styles/tailwind.css";
import "./styles/cms-static.css";
import { ensureCmsStyles } from "./styles/ensureCmsStyles";

ensureCmsStyles();

export { registerPifWarriorsCms, createCmsRoutes } from "./router";
export type { RegisterPifWarriorsCmsOptions } from "./router";
export type { CmsFirebaseServices } from "./firebase/context";
export { usuarioActual, cerrarSesion, rolActual } from "./firebase/auth";
export { listarSchemasContenido, guardarSchemaContenido } from "./services/contentSchemaService";
export {
  crearRegistroDocumento,
  actualizarRegistroDocumento,
  listarRegistrosDocumento,
  eliminarRegistroDocumento,
  guardarRegistroDiccionario,
  obtenerRegistroDiccionario
} from "./services/dynamicDocumentService";
export type {
  CmsStorageType,
  CmsFieldType,
  CmsNestedFieldSchema,
  CmsFieldSchema,
  CmsContentSchema
} from "./types/contentSchema";
export type { DynamicDocumentRecord } from "./services/dynamicDocumentService";
