/**
 * Safe local storage utility for private favorites bookmarks.
 * Handles disabled cookies / private browsing / quota errors without failing.
 */

const STORAGE_KEY = "scarselli_saved_pieces_v1";

export function loadSavedProductIds(): string[] {
  try {
    if (typeof window === "undefined" || !window.localStorage) return [];
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is string => typeof id === "string");
    }
    return [];
  } catch {
    return [];
  }
}

export function saveProductIds(ids: string[]): boolean {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}
