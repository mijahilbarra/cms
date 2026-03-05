import type { Timestamp } from "firebase/firestore";

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
