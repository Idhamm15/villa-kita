export function fileUrl(path?: string | null) {
  if (!path) return null;

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  return `${baseUrl}${path}`;
}