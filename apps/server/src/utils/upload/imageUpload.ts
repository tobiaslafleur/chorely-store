import { FileUploadOptions, saveFile } from '@/utils/upload/fileUpload';
import fs from 'fs';

type ImageUploadResult<T extends FileUploadOptions> = T extends
  | {
      file: Buffer;
    }
  | { files: Buffer[] }
  ? ImageReturn[]
  : never;

export type ImageReturn = { url: string; isPrimary: boolean };

/**
 * WARNING: Changed file in @fastify/multipart to return Buffer instead of the toString(),
 * this will be added, so remember to update when update is released
 */
export async function handleImageUpload<T extends FileUploadOptions>(
  { file: primary, files: gallery }: T,
  fileArray: Array<ImageReturn>
): Promise<ImageUploadResult<T>> {
  const path = '/images';

  if (primary && gallery) {
    const fileName = await saveFile(primary, path);
    fileArray.push({ url: fileName, isPrimary: true });

    for (const image of gallery) {
      const fileName = await saveFile(image, path);
      fileArray.push({ url: fileName, isPrimary: false });
    }

    return fileArray as ImageUploadResult<T>;
  }

  if (gallery) {
    for (const image of gallery) {
      const fileName = await saveFile(image, path);
      fileArray.push({ url: fileName, isPrimary: false });
    }

    return fileArray as ImageUploadResult<T>;
  }

  const fileName = await saveFile(primary, path);
  fileArray.push({ url: fileName, isPrimary: true });

  return fileArray as ImageUploadResult<T>;
}

//TODO: handle error when removing file
export async function removeUploadedImages(images: ImageReturn[]) {
  for (const image of images) {
    const path = `./uploads/${image.url}`;

    if (fs.existsSync(path)) {
      try {
        fs.unlinkSync(path);
      } catch (error) {}
    }
  }
}
