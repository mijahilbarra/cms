import landingPageSchema from "./landingPage.schema.json";
import blogPageSchema from "./blogPage.schema.json";
import quienesSomosPageSchema from "./quienesSomosPage.schema.json";
import navSchema from "./nav.schema.json";
import siteThemeSchema from "./siteTheme.schema.json";
import type { ViewSchema, ViewTemplate } from "../types/viewSchema";

export const VIEW_TEMPLATES: ViewTemplate[] = [
  {
    id: "landingPage",
    titulo: "Landing",
    descripcion: "Home de la inmobiliaria con hero, propuesta y FAQs.",
    schema: landingPageSchema as ViewSchema
  },
  {
    id: "quienesSomosPage",
    titulo: "Quiénes somos",
    descripcion: "Presentación de la inmobiliaria, valores y trayectoria.",
    schema: quienesSomosPageSchema as ViewSchema
  },
  {
    id: "blogPage",
    titulo: "Blog",
    descripcion: "Noticias y consejos del mercado inmobiliario.",
    schema: blogPageSchema as ViewSchema
  },
  {
    id: "nav",
    titulo: "Navegación",
    descripcion: "Textos del menú superior y botones de sesión.",
    schema: navSchema as ViewSchema
  },
  {
    id: "siteTheme",
    titulo: "Paleta",
    descripcion: "Colores globales del sitio.",
    schema: siteThemeSchema as ViewSchema
  }
];

export function getViewTemplate(viewId: string): ViewTemplate | null {
  return VIEW_TEMPLATES.find((item) => item.id === viewId) ?? null;
}
