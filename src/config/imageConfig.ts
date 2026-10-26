/**
 * Central Image Configuration for Scarselli Atelier
 * All media URLs in the project are managed strictly from this single object.
 */

export const IMAGES = {
  // Hero Image (16:9, diamond engagement ring in box)
  hero: "https://i.ibb.co/bfXDsbr/Diamond-engagement-ring-in-box-20261024142721.jpg",

  // 29 Unique Product Photos
  products: {
    "sc-001": "https://i.ibb.co/500kR0r/Diamond-pave-hoop-earrings-resting-20261024143620.jpg",
    "sc-002": "https://i.ibb.co/qL1YY17M/Diamond-ring-on-velvet-fabric-20261024143541.jpg",
    "sc-003": "https://i.ibb.co/pj7rrVZJ/Diamond-ring-on-fabric-background-20261024143536.jpg",
    "sc-004": "https://i.ibb.co/mrxQnbMC/Diamond-ring-on-fabric-background-20261024143451.jpg",
    "sc-005": "https://i.ibb.co/LDpbbkMj/Bridal-jewelry-set-on-velvet-20261024143202.jpg",
    "sc-006": "https://i.ibb.co/zhQZn1JP/Diamond-cluster-pendant-necklace-20261024143201.jpg",
    "sc-007": "https://i.ibb.co/YTLgWtVz/Diamond-cluster-pendant-necklace-20261024143159.jpg",
    "sc-008": "https://i.ibb.co/xqJjK3r3/Bridal-jewelry-set-on-velvet-20261024143205.jpg",
    "sc-009": "https://i.ibb.co/35Bx7b6F/Diamond-bracelet-on-velvet-surface-20261024143156.jpg",
    "sc-010": "https://i.ibb.co/BHh84Gf5/Diamond-ring-on-silk-background-20261024143151.jpg",
    "sc-011": "https://i.ibb.co/1t2nkkRw/Diamond-ring-on-silk-background-20261024143149.jpg",
    "sc-012": "https://i.ibb.co/J1dxGFw/Diamond-eternity-band-shining-on-20261024143146.jpg",
    "sc-014": "https://i.ibb.co/S7vb2972/Diamond-pave-hoop-earrings-resting-20261024143140.jpg",
    "sc-015": "https://i.ibb.co/bj28TyYd/Diamond-choker-necklace-displayed-20261024143138.jpg",
    "sc-016": "https://i.ibb.co/4nXdWXDY/Diamond-choker-necklace-on-velvet-20261024143136.jpg",
    "sc-017": "https://i.ibb.co/GfTsnRsF/Diamond-drop-earrings-on-velvet-20261024143133.jpg",
    "sc-018": "https://i.ibb.co/4gpK0zZ4/Diamond-drop-earrings-on-velvet-20261024143132.jpg",
    "sc-019": "https://i.ibb.co/cXFbNkVp/Diamond-pendant-on-dark-fabric-20261024143123.jpg",
    "sc-020": "https://i.ibb.co/1t0FP5JR/Diamond-tennis-bracelet-coiled-20261024143119.jpg",
    "sc-021": "https://i.ibb.co/gL1Bxndy/Diamond-ring-on-charcoal-backdrop-20261024143116.jpg",
    "sc-022": "https://i.ibb.co/8gySkVTt/Diamond-cocktail-ring-on-surface-20261024143112.jpg",
    "sc-023": "https://i.ibb.co/nNz9rhsd/Platinum-diamond-band-ring-20261024143107.jpg",
    "sc-024": "https://i.ibb.co/dJWX3pFY/Three-stone-diamond-ring-displayed-20261024143104.jpg",
    "sc-025": "https://i.ibb.co/WvnMvqkc/Pear-cut-diamond-ring-resting-20261024143059.jpg",
    "sc-026": "https://i.ibb.co/m57SfwYb/Diamond-ring-on-velvet-background-20261024143056.jpg",
    "sc-027": "https://i.ibb.co/67QgCwmb/Asscher-cut-diamond-ring-resting-20261024143052.jpg",
    "sc-028": "https://i.ibb.co/YB7JHx05/Diamond-ring-on-fabric-backdrop-20261024143048.jpg",
    "sc-029": "https://i.ibb.co/mVCCPJrd/Diamond-ring-on-fabric-20261024143045.jpg",
    "sc-030": "https://i.ibb.co/yn5jdSkc/Diamond-ring-on-velvet-fabric-20261024143042.jpg",
  },

  // Simple decorative ring image for craftsmanship section
  decorativeRing: "https://i.ibb.co/bfXDsbr/Diamond-engagement-ring-in-box-20261024142721.jpg",

  // Editorial image placeholders (text-only by default)
  workshop: "",
  founderPortrait: "",
  certificates: "",
  ogImage: "https://i.ibb.co/bfXDsbr/Diamond-engagement-ring-in-box-20261024142721.jpg",
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
