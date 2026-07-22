import { toast } from "sonner";

export async function copyText(
  text: string,
  message = "Copied successfully."
) {
  await navigator.clipboard.writeText(text);

  toast.success(message);
}