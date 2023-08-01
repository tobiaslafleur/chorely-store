import fs from 'fs';

const folders = ['./uploads', './uploads/images'] as const;

export async function createFolders() {
  for (const folder of folders) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }
}
