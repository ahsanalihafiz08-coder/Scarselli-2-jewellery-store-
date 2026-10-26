/**
 * Helper to ensure all image paths are relative (e.g. ./assets/... or ./images/...)
 * rather than absolute (/...) so images never disappear or break on static
 * hosting platforms like Netlify.
 */
export function toRelativeImagePath(src: string): string {
  if (!src) return src;
  // If it's an absolute path starting with / and not // (protocol-relative) or http(s)
  if (src.startsWith("/") && !src.startsWith("//")) {
    return `.${src}`;
  }
  return src;
}
