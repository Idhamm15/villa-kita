import Cookies from "js-cookie";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = Cookies.get("access_token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token
          ? `Bearer ${token}`
          : "",
        ...options.headers,
      },
    }
  );

  return response.json();
}