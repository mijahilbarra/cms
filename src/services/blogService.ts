import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";
import { getCmsFirebaseServices } from "../firebase/context";
import type { BlogPost, BlogPostInput } from "../types/blog";
import { toSlug } from "../utils/slug";

const BLOG_COLLECTION = "blogs";

export async function crearBlog(input: BlogPostInput): Promise<string> {
  const { firestore } = getCmsFirebaseServices();
  const slug = toSlug(input.titulo);
  const response = await addDoc(collection(firestore, BLOG_COLLECTION), {
    ...input,
    slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return response.id;
}

export async function listarBlogs(max = 50): Promise<BlogPost[]> {
  const { firestore } = getCmsFirebaseServices();
  const q = query(collection(firestore, BLOG_COLLECTION), orderBy("createdAt", "desc"), limit(max));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((entry) => ({ id: entry.id, ...(entry.data() as Omit<BlogPost, "id">) }));
}

export async function obtenerBlogPorSlug(slug: string): Promise<BlogPost | null> {
  const { firestore } = getCmsFirebaseServices();
  const cleanSlug = String(slug || "").trim();
  if (!cleanSlug) {
    return null;
  }

  const q = query(
    collection(firestore, BLOG_COLLECTION),
    where("slug", "==", cleanSlug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return null;
  }

  const entry = snapshot.docs[0];
  return { id: entry.id, ...(entry.data() as Omit<BlogPost, "id">) };
}

export async function eliminarBlog(id: string): Promise<void> {
  const { firestore } = getCmsFirebaseServices();
  await deleteDoc(doc(firestore, BLOG_COLLECTION, id));
}
