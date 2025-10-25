import { headers } from "next/headers";

export function getBaseUrl() {
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto =
      h.get("x-forwarded-proto") ??
      (process.env.NODE_ENV === "production" ? "https" : "http");

    if (host) return `${proto}://${host}`;
  } catch {
    // headers() may fail in some contexts (e.g., edge/dev)
  }
  // Fallback for dev / when no request headers:
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}
