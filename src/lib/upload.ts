import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export async function saveImage(
  file: File,
  folder: string
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name);

  const filename = `${Date.now()}-${uuid()}${ext}`;

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    folder
  );

  await fs.mkdir(uploadDir, {
    recursive: true,
  });

  const filepath = path.join(uploadDir, filename);

  await fs.writeFile(filepath, buffer);

  return `/uploads/${folder}/${filename}`;
}

export async function deleteImage(filepath: string) {
  try {
    const fullpath = path.join(
      process.cwd(),
      "public",
      filepath
    );

    await fs.unlink(fullpath);
  } catch {}
}

export function isImage(file: File) {
  return file.type.startsWith("image/");
}