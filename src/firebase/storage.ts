import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  type UploadMetadata
} from "firebase/storage";
import { compressImage } from "../utils/imageCompression";
import { getCmsFirebaseServices } from "./context";

type Uploadable = Blob | Uint8Array | ArrayBuffer;

export async function uploadFile(
  path: string,
  data: Uploadable,
  metadata?: UploadMetadata
): Promise<string> {
  const { storage } = getCmsFirebaseServices();
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, data, metadata);
  return getDownloadURL(fileRef);
}

export async function getFileUrl(path: string): Promise<string> {
  const { storage } = getCmsFirebaseServices();
  return getDownloadURL(ref(storage, path));
}

export async function removeFile(path: string): Promise<void> {
  const { storage } = getCmsFirebaseServices();
  await deleteObject(ref(storage, path));
}

type ImageUploadOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  targetSizeKb?: number;
  metadata?: UploadMetadata;
};

export async function uploadImageWithCompression(
  path: string,
  file: File,
  options: ImageUploadOptions = {}
): Promise<string> {
  const compressed = await compressImage(file, {
    maxWidth: options.maxWidth,
    maxHeight: options.maxHeight,
    quality: options.quality,
    targetSizeKb: options.targetSizeKb
  });

  return uploadFile(path, compressed, options.metadata);
}
