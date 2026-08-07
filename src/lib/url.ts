export function fileUrl(path?: string | null) {
  if (!path) return null;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("/")) {
    return path;
  }

  const baseUrl = process.env.NEXT_APP_URL || "http://localhost:3000";

  return `${baseUrl}/${path}`;
}