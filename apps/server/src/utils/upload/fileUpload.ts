import fs from 'fs';
import util from 'util';
import { Readable, pipeline } from 'stream';
import { randomUUID } from 'crypto';
import { fileTypeFromBuffer } from 'file-type';

const pump = util.promisify(pipeline);

export type FileUploadOptions =
  | { file: Buffer; files?: never }
  | { file?: never; files: Buffer[] }
  | { file: Buffer; files: Buffer[] };

// TODO: Better error handling for fileType
export async function saveFile(buffer: Buffer, path: string) {
  const uuid = randomUUID();
  const fileType = await fileTypeFromBuffer(buffer);

  if (!fileType) throw new Error('File has no extension');

  const fileName = `${path}/${uuid}.${fileType.ext}`;

  await pump(
    Readable.from(buffer),
    fs.createWriteStream(`./uploads${fileName}`)
  );

  return fileName;
}
