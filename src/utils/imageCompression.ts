type CompressionOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  targetSizeKb?: number;
};

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.82,
  targetSizeKb: 900
};

export async function compressImage(file: File, options: CompressionOptions = {}): Promise<Blob> {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  const settings = { ...DEFAULT_OPTIONS, ...options };
  const image = await loadImage(file);
  const { width, height } = calculateDimensions(image.width, image.height, settings.maxWidth, settings.maxHeight);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    return file;
  }

  context.drawImage(image, 0, 0, width, height);

  let quality = settings.quality;
  let result = await toBlob(canvas, file.type || "image/jpeg", quality);
  const targetBytes = settings.targetSizeKb * 1024;

  while (result.size > targetBytes && quality > 0.45) {
    quality -= 0.08;
    result = await toBlob(canvas, file.type || "image/jpeg", quality);
  }

  return result;
}

function calculateDimensions(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  let nextWidth = width;
  let nextHeight = height;

  if (nextWidth > maxWidth) {
    nextHeight = Math.round((nextHeight * maxWidth) / nextWidth);
    nextWidth = maxWidth;
  }

  if (nextHeight > maxHeight) {
    nextWidth = Math.round((nextWidth * maxHeight) / nextHeight);
    nextHeight = maxHeight;
  }

  return { width: nextWidth, height: nextHeight };
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("No fue posible generar la imagen comprimida."));
          return;
        }
        resolve(blob);
      },
      type,
      quality
    );
  });
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No fue posible leer la imagen."));
    };
    image.src = objectUrl;
  });
}
