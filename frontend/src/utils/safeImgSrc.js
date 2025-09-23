export function safeImgSrc(url, fallback = "/default.png") {
  if (!url) return fallback;
  try {
    const u = new URL(url);
    const okProto = u.protocol === "http:" || u.protocol === "https:";

    return okProto ? url : fallback;
  } catch {
    return fallback;
  }
}