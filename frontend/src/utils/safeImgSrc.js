export function safeImgSrc(url, fallback = "/default.png") {
  if (!url) return fallback;
  try {
    const u = new URL(url);
    const okProto = u.protocol === "http:";

    return okProto ? url : fallback;
  } catch {
    return fallback;
  }
}