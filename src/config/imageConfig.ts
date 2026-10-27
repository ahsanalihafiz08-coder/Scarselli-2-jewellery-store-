/**
 * Central Image Configuration for Scarselli Atelier
 * All media URLs in the project are hosted locally and managed strictly from this single object.
 */

export const IMAGES = {
  // Hero Image (16:9, diamond engagement ring in box)
  hero: "./assets/images/scarselli-hero.jpg",

  // 29 Unique Product Photos hosted locally in the project repository
  products: {
    "sc-001": "./assets/images/products/sc-001.jpg",
    "sc-002": "./assets/images/products/sc-002.jpg",
    "sc-003": "./assets/images/products/sc-003.jpg",
    "sc-004": "./assets/images/products/sc-004.jpg",
    "sc-005": "./assets/images/products/sc-005.jpg",
    "sc-006": "./assets/images/products/sc-006.jpg",
    "sc-007": "./assets/images/products/sc-007.jpg",
    "sc-008": "./assets/images/products/sc-008.jpg",
    "sc-009": "./assets/images/products/sc-009.jpg",
    "sc-010": "./assets/images/products/sc-010.jpg",
    "sc-011": "./assets/images/products/sc-011.jpg",
    "sc-012": "./assets/images/products/sc-012.jpg",
    "sc-014": "./assets/images/products/sc-014.jpg",
    "sc-015": "./assets/images/products/sc-015.jpg",
    "sc-016": "./assets/images/products/sc-016.jpg",
    "sc-017": "./assets/images/products/sc-017.jpg",
    "sc-018": "./assets/images/products/sc-018.jpg",
    "sc-019": "./assets/images/products/sc-019.jpg",
    "sc-020": "./assets/images/products/sc-020.jpg",
    "sc-021": "./assets/images/products/sc-021.jpg",
    "sc-022": "./assets/images/products/sc-022.jpg",
    "sc-023": "./assets/images/products/sc-023.jpg",
    "sc-024": "./assets/images/products/sc-024.jpg",
    "sc-025": "./assets/images/products/sc-025.jpg",
    "sc-026": "./assets/images/products/sc-026.jpg",
    "sc-027": "./assets/images/products/sc-027.jpg",
    "sc-028": "./assets/images/products/sc-028.jpg",
    "sc-029": "./assets/images/products/sc-029.jpg",
    "sc-030": "./assets/images/products/sc-030.jpg",
  },

  // Simple decorative ring image for craftsmanship section
  decorativeRing: "./assets/images/scarselli-hero.jpg",

  // Editorial image placeholders (text-only by default)
  workshop: "",
  founderPortrait: "",
  certificates: "",
  ogImage: "./assets/images/scarselli-hero.jpg",
};

export interface ImageConfig {
  hero: string;
  productImages: Record<string, string>;
  workshop: string;
  founderPortrait: string;
  certificates: string;
  ogImage: string;
}

// Backwards-compatible alias for existing imports
export const IMAGE_CONFIG: ImageConfig = {
  hero: IMAGES.hero,
  productImages: IMAGES.products,
  workshop: IMAGES.workshop,
  founderPortrait: IMAGES.founderPortrait,
  certificates: IMAGES.certificates,
  ogImage: IMAGES.ogImage,
};

/**
 * Helper to safely resolve a product image path from IMAGES.
 * Falls back to an empty string to trigger the neutral placeholder component.
 */
export function getProductImagePath(productId: string): string {
  return IMAGES.products[productId as keyof typeof IMAGES.products] || "";
}
