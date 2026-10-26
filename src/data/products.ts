/**
 * Central Product Catalog for Scarselli
 *
 * All media URLs are managed strictly through IMAGES from imageConfig.
 * Each product has a unique name, accurate stone and metal description,
 * verified silhouette/shape, and one unique descriptive sentence.
 */

import { siteConfig } from "../config/siteConfig";
import { IMAGES } from "../config/imageConfig";

// Re-export IMAGES so it is easily accessible at the top of the code
export { IMAGES };

export type DiamondShape =
  | "round"
  | "oval"
  | "emerald"
  | "pear"
  | "cushion"
  | "radiant"
  | "marquise"
  | "princess"
  | "asscher";

export type ProductCategory =
  | "rings"
  | "wedding_bands"
  | "earrings"
  | "necklaces"
  | "bracelets"
  | "loose_diamonds"
  | "bespoke";

export type MetalType =
  | "Platinum 950"
  | "18k Yellow Gold"
  | "18k White Gold"
  | "18k Rose Gold";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  published: boolean;
  isSample: boolean;
  shortDescription: string;
  detailedDescription: string;
  image: string;
  gallery: string[];
  metal: MetalType | string;
  stone: string;
  shape: DiamondShape;
  carat?: number;
  color?: string;
  clarity?: string;
  cut?: string;
  certificateLab?: "IGI" | "GIA";
  certificateNumber?: string;
  price?: number;
  priceOnRequest: boolean;
  availableSizes?: string[];
  metalOptions?: MetalType[];
  certificateImage?: string;
  availability: "available" | "made_to_order" | "archive";
  featured: boolean;
  altText: string;
  imagePosition?: string;
  internalNotes?: string;
}

export const products: Product[] = [
  /* =========================================================================
   * 6 FEATURED PIECES (Displayed in "Curated Fine Pieces")
   * 3 Rings, 1 Earrings, 1 Bracelet, 1 Necklace
   * ========================================================================= */
  {
    id: "sc-025",
    slug: "aurelia-pear-solitaire",
    name: "The Aurelia Pear Solitaire",
    category: "rings",
    categoryLabel: "Engagement Ring",
    published: true,
    isSample: false,
    shortDescription:
      "A teardrop pear-cut lab-grown diamond protected by a dedicated V-prong tip and delicate side claws on a polished platinum band.",
    detailedDescription:
      "A teardrop pear-cut lab-grown diamond protected by a dedicated V-prong tip and delicate side claws on a polished platinum band.",
    image: IMAGES.products["sc-025"],
    gallery: [IMAGES.products["sc-025"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamond",
    shape: "pear",
    priceOnRequest: true,
    availableSizes: ["4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "Bespoke sizing"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k Rose Gold", "18k White Gold"],
    availability: "available",
    featured: true,
    altText: "Teardrop pear-cut lab-grown diamond solitaire engagement ring resting on clean platinum band",
  },
  {
    id: "sc-027",
    slug: "rockefeller-asscher-solitaire",
    name: "The Rockefeller Asscher Solitaire",
    category: "rings",
    categoryLabel: "Engagement Ring",
    published: true,
    isSample: false,
    shortDescription:
      "Mesmerizing windmill step facets define this geometric asscher-cut lab-grown diamond mounted on a warm 18k rose gold band.",
    detailedDescription:
      "Mesmerizing windmill step facets define this geometric asscher-cut lab-grown diamond mounted on a warm 18k rose gold band.",
    image: IMAGES.products["sc-027"],
    gallery: [IMAGES.products["sc-027"]],
    metal: "18k Rose Gold",
    stone: "Certified Lab-Grown Diamond",
    shape: "asscher",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0", "Bespoke sizing"],
    metalOptions: ["18k Rose Gold", "Platinum 950", "18k Yellow Gold"],
    availability: "available",
    featured: true,
    altText: "Architectural square asscher-cut lab-grown diamond solitaire set on 18k rose gold band",
  },
  {
    id: "sc-024",
    slug: "trilogy-three-stone-ring",
    name: "The Trilogy Three-Stone Ring",
    category: "rings",
    categoryLabel: "Three-Stone Ring",
    published: true,
    isSample: false,
    shortDescription:
      "Representing past, present, and future, an emerald-cut center lab-grown diamond flanked by perfectly matched radiant-cut side stones in a sculptural platinum setting.",
    detailedDescription:
      "Representing past, present, and future, an emerald-cut center lab-grown diamond flanked by perfectly matched radiant-cut side stones in a sculptural platinum setting.",
    image: IMAGES.products["sc-024"],
    gallery: [IMAGES.products["sc-024"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "emerald",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0", "Bespoke sizing"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k White Gold"],
    availability: "available",
    featured: true,
    altText: "Three-stone lab-grown diamond ring with radiant side stones in solid platinum displayed on pedestal",
  },
  {
    id: "sc-014",
    slug: "aurelia-white-gold-pave-hoops",
    name: "The Aurelia White Gold Pavé Hoops",
    category: "earrings",
    categoryLabel: "Fine Earrings",
    published: true,
    isSample: false,
    shortDescription:
      "Lustrous 18k white gold huggie hoops encrusted with precision micro-pavé lab-grown diamonds for effortless everyday elegance.",
    detailedDescription:
      "Lustrous 18k white gold huggie hoops encrusted with precision micro-pavé lab-grown diamonds for effortless everyday elegance.",
    image: IMAGES.products["sc-014"],
    gallery: [IMAGES.products["sc-014"]],
    metal: "18k White Gold",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    metalOptions: ["18k White Gold", "Platinum 950", "18k Yellow Gold"],
    availability: "available",
    featured: true,
    altText: "Pair of 18k white gold pavé diamond hoop earrings resting on flat surface",
  },
  {
    id: "sc-009",
    slug: "empire-articulated-bracelet",
    name: "The Empire Articulated Diamond Bracelet",
    category: "bracelets",
    categoryLabel: "Fine Bracelet",
    published: true,
    isSample: false,
    shortDescription:
      "A substantial articulated line of graduated lab-grown diamonds gracefully draped across dark luxury velvet.",
    detailedDescription:
      "A substantial articulated line of graduated lab-grown diamonds gracefully draped across dark luxury velvet.",
    image: IMAGES.products["sc-009"],
    gallery: [IMAGES.products["sc-009"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["6.5 inch", "7.0 inch", "7.5 inch"],
    metalOptions: ["Platinum 950", "18k White Gold", "18k Yellow Gold"],
    availability: "available",
    featured: true,
    altText: "Articulated diamond tennis bracelet in pure platinum resting over deep luxury velvet",
  },
  {
    id: "sc-015",
    slug: "manhattan-collar-choker",
    name: "The Manhattan Diamond Collar Choker",
    category: "necklaces",
    categoryLabel: "Fine Necklace",
    published: true,
    isSample: false,
    shortDescription:
      "A striking structured choker necklace hand-set with continuous brilliant lab-grown diamonds hugging the collarbone in solid platinum.",
    detailedDescription:
      "A striking structured choker necklace hand-set with continuous brilliant lab-grown diamonds hugging the collarbone in solid platinum.",
    image: IMAGES.products["sc-015"],
    gallery: [IMAGES.products["sc-015"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    metalOptions: ["Platinum 950", "18k White Gold"],
    availability: "available",
    featured: true,
    altText: "Fine diamond choker necklace displayed with continuous lab-grown stones in platinum",
  },

  /* =========================================================================
   * 23 NON-FEATURED PIECES (Displayed in "The Complete Collection")
   * No duplicates with Curated Fine Pieces
   * ========================================================================= */
  {
    id: "sc-001",
    slug: "valetta-pave-eternity-bands",
    name: "The Valetta Pavé Eternity Bands",
    category: "rings",
    categoryLabel: "Eternity Band Pair",
    published: true,
    isSample: false,
    shortDescription:
      "A matched pair of eternity rings encrusted with micro-pavé lab-grown diamonds crafted in mirror-finished platinum.",
    detailedDescription:
      "A matched pair of eternity rings encrusted with micro-pavé lab-grown diamonds crafted in mirror-finished platinum.",
    image: IMAGES.products["sc-001"],
    gallery: [IMAGES.products["sc-001"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Matched pair of platinum pavé eternity bands with brilliant lab-grown diamonds resting flat",
  },
  {
    id: "sc-002",
    slug: "belmont-hexagon-bezel-ring",
    name: "The Belmont Hexagon Bezel Ring",
    category: "rings",
    categoryLabel: "Solitaire Ring",
    published: true,
    isSample: false,
    shortDescription:
      "A geometric hexagonal bezel frame cradles an exquisite lab-grown diamond atop a clean 18k yellow gold band.",
    detailedDescription:
      "A geometric hexagonal bezel frame cradles an exquisite lab-grown diamond atop a clean 18k yellow gold band.",
    image: IMAGES.products["sc-002"],
    gallery: [IMAGES.products["sc-002"]],
    metal: "18k Yellow Gold",
    stone: "Certified Lab-Grown Diamond",
    shape: "cushion",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["18k Yellow Gold", "Platinum 950", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Lab-grown diamond ring with hexagonal bezel set in 18k yellow gold on velvet",
  },
  {
    id: "sc-003",
    slug: "madison-twisted-pave-solitaire",
    name: "The Madison Twisted Pavé Solitaire",
    category: "rings",
    categoryLabel: "Solitaire Ring",
    published: true,
    isSample: false,
    shortDescription:
      "A brilliant round lab-grown diamond sits poised atop an intertwining twisted pavé diamond band in solid platinum.",
    detailedDescription:
      "A brilliant round lab-grown diamond sits poised atop an intertwining twisted pavé diamond band in solid platinum.",
    image: IMAGES.products["sc-003"],
    gallery: [IMAGES.products["sc-003"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamond",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["4.5", "5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Round brilliant lab-grown diamond solitaire on twisted pavé platinum band",
  },
  {
    id: "sc-004",
    slug: "gramercy-foliage-solitaire",
    name: "The Gramercy Foliage Solitaire",
    category: "rings",
    categoryLabel: "Engagement Ring",
    published: true,
    isSample: false,
    shortDescription:
      "An organic botanical leaf-motif band in 18k rose gold delicately cradles a round brilliant lab-grown diamond.",
    detailedDescription:
      "An organic botanical leaf-motif band in 18k rose gold delicately cradles a round brilliant lab-grown diamond.",
    image: IMAGES.products["sc-004"],
    gallery: [IMAGES.products["sc-004"]],
    metal: "18k Rose Gold",
    stone: "Certified Lab-Grown Diamond",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["18k Rose Gold", "18k Yellow Gold", "Platinum 950"],
    availability: "available",
    featured: false,
    altText: "Round lab-grown diamond engagement ring with botanical leaf band in 18k rose gold",
  },
  {
    id: "sc-005",
    slug: "versailles-bridal-suite",
    name: "The Versailles Bridal Diamond Suite",
    category: "necklaces",
    categoryLabel: "Bridal Suite",
    published: true,
    isSample: false,
    shortDescription:
      "An opulent bridal suite arrayed on velvet, showcasing a harmonized diamond ring and companion stud earrings crafted in platinum.",
    detailedDescription:
      "An opulent bridal suite arrayed on velvet, showcasing a harmonized diamond ring and companion stud earrings crafted in platinum.",
    image: IMAGES.products["sc-005"],
    gallery: [IMAGES.products["sc-005"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    metalOptions: ["Platinum 950", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Bridal diamond jewellery suite arranged on velvet with matching ring and stud earrings",
  },
  {
    id: "sc-006",
    slug: "celeste-cluster-pendant",
    name: "The Celeste Diamond Cluster Pendant",
    category: "necklaces",
    categoryLabel: "Fine Necklace",
    published: true,
    isSample: false,
    shortDescription:
      "Multiple brilliant lab-grown diamonds arranged in a floral cluster pendant suspended from a fine platinum link chain.",
    detailedDescription:
      "Multiple brilliant lab-grown diamonds arranged in a floral cluster pendant suspended from a fine platinum link chain.",
    image: IMAGES.products["sc-006"],
    gallery: [IMAGES.products["sc-006"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    metalOptions: ["Platinum 950", "18k White Gold", "18k Yellow Gold"],
    availability: "available",
    featured: false,
    altText: "Cluster pendant necklace composed of brilliant lab-grown diamonds in platinum",
  },
  {
    id: "sc-007",
    slug: "lumina-blossom-cluster-pendant",
    name: "The Lumina Blossom Cluster Pendant",
    category: "necklaces",
    categoryLabel: "Fine Necklace",
    published: true,
    isSample: false,
    shortDescription:
      "A scintillating lab-grown diamond cluster pendant composed of articulated petals in warm 18k rose gold.",
    detailedDescription:
      "A scintillating lab-grown diamond cluster pendant composed of articulated petals in warm 18k rose gold.",
    image: IMAGES.products["sc-007"],
    gallery: [IMAGES.products["sc-007"]],
    metal: "18k Rose Gold",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    metalOptions: ["18k Rose Gold", "18k White Gold", "Platinum 950"],
    availability: "available",
    featured: false,
    altText: "Floral diamond cluster pendant necklace with shimmering lab-grown stones in 18k rose gold",
  },
  {
    id: "sc-008",
    slug: "sovereign-bridal-ensemble",
    name: "The Sovereign Bridal Diamond Ensemble",
    category: "necklaces",
    categoryLabel: "Bridal Suite",
    published: true,
    isSample: false,
    shortDescription:
      "A majestic high-jewellery bridal ensemble displayed on plush velvet, featuring matched cascading diamond motifs in pure platinum.",
    detailedDescription:
      "A majestic high-jewellery bridal ensemble displayed on plush velvet, featuring matched cascading diamond motifs in pure platinum.",
    image: IMAGES.products["sc-008"],
    gallery: [IMAGES.products["sc-008"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "pear",
    priceOnRequest: true,
    metalOptions: ["Platinum 950", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Grand bridal diamond jewellery suite displayed on luxury velvet",
  },
  {
    id: "sc-010",
    slug: "vanderbilt-heritage-ring",
    name: "The Vanderbilt Heritage Ring",
    category: "rings",
    categoryLabel: "Heritage Ring",
    published: true,
    isSample: false,
    shortDescription:
      "A vintage-inspired openwork heirloom ring featuring intricate filigree and delicate milgrain detailing set with lab-grown diamonds.",
    detailedDescription:
      "A vintage-inspired openwork heirloom ring featuring intricate filigree and delicate milgrain detailing set with lab-grown diamonds.",
    image: IMAGES.products["sc-010"],
    gallery: [IMAGES.products["sc-010"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamond",
    shape: "oval",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Vintage-inspired openwork lab-grown diamond heritage ring on fluid silk background",
  },
  {
    id: "sc-011",
    slug: "carnegie-cluster-cocktail-ring",
    name: "The Carnegie Cluster Cocktail Ring",
    category: "rings",
    categoryLabel: "Cocktail Ring",
    published: true,
    isSample: false,
    shortDescription:
      "An exquisite cluster of marquise and round lab-grown diamonds arranged in an organic botanical bloom set in warm 18k yellow gold.",
    detailedDescription:
      "An exquisite cluster of marquise and round lab-grown diamonds arranged in an organic botanical bloom set in warm 18k yellow gold.",
    image: IMAGES.products["sc-011"],
    gallery: [IMAGES.products["sc-011"]],
    metal: "18k Yellow Gold",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["4.5", "5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["18k Yellow Gold", "Platinum 950", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Marquise and round lab-grown diamond cluster cocktail ring in 18k yellow gold on silk",
  },
  {
    id: "sc-012",
    slug: "fifth-avenue-eternity-band",
    name: "The Fifth Avenue Full Eternity Band",
    category: "wedding_bands",
    categoryLabel: "Eternity Band",
    published: true,
    isSample: false,
    shortDescription:
      "An unbroken circle of shared-prong round brilliant lab-grown diamonds delivering continuous 360-degree scintillation.",
    detailedDescription:
      "An unbroken circle of shared-prong round brilliant lab-grown diamonds delivering continuous 360-degree scintillation.",
    image: IMAGES.products["sc-012"],
    gallery: [IMAGES.products["sc-012"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Full diamond eternity wedding band shining in pure platinum setting",
  },
  {
    id: "sc-016",
    slug: "astor-velvet-line-choker",
    name: "The Astor Velvet Line Choker",
    category: "necklaces",
    categoryLabel: "Fine Necklace",
    published: true,
    isSample: false,
    shortDescription:
      "Fluid articulated 18k white gold links set with calibrated lab-grown diamonds creating an ornate floral statement choker necklace on velvet.",
    detailedDescription:
      "Fluid articulated 18k white gold links set with calibrated lab-grown diamonds creating an ornate floral statement choker necklace on velvet.",
    image: IMAGES.products["sc-016"],
    gallery: [IMAGES.products["sc-016"]],
    metal: "18k White Gold",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    metalOptions: ["18k White Gold", "Platinum 950"],
    availability: "available",
    featured: false,
    altText: "Diamond choker necklace resting over luxury dark velvet fabric",
  },
  {
    id: "sc-017",
    slug: "seraphina-pear-drop-earrings",
    name: "The Seraphina Pear Drop Earrings",
    category: "earrings",
    categoryLabel: "Fine Earrings",
    published: true,
    isSample: false,
    shortDescription:
      "Cascading pear and round lab-grown diamond drops engineered with articulated platinum links for fluid kinetic movement.",
    detailedDescription:
      "Cascading pear and round lab-grown diamond drops engineered with articulated platinum links for fluid kinetic movement.",
    image: IMAGES.products["sc-017"],
    gallery: [IMAGES.products["sc-017"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "pear",
    priceOnRequest: true,
    metalOptions: ["Platinum 950", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Pear-shaped lab-grown diamond drop earrings resting on black velvet",
  },
  {
    id: "sc-018",
    slug: "genevieve-linear-drop-earrings",
    name: "The Genevieve Linear Drop Earrings",
    category: "earrings",
    categoryLabel: "Fine Earrings",
    published: true,
    isSample: false,
    shortDescription:
      "A clean architectural drop silhouette featuring tiered round brilliant lab-grown diamonds in mirror-polished 18k white gold.",
    detailedDescription:
      "A clean architectural drop silhouette featuring tiered round brilliant lab-grown diamonds in mirror-polished 18k white gold.",
    image: IMAGES.products["sc-018"],
    gallery: [IMAGES.products["sc-018"]],
    metal: "18k White Gold",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    metalOptions: ["18k White Gold", "Platinum 950"],
    availability: "available",
    featured: false,
    altText: "Linear tiered lab-grown diamond drop earrings on plush velvet",
  },
  {
    id: "sc-019",
    slug: "delancy-pear-pendant",
    name: "The Delancy Pear Diamond Pendant",
    category: "necklaces",
    categoryLabel: "Fine Necklace",
    published: true,
    isSample: false,
    shortDescription:
      "A luminous teardrop pear lab-grown diamond embraced by an ethereal diamond halo on a platinum trace chain.",
    detailedDescription:
      "A luminous teardrop pear lab-grown diamond embraced by an ethereal diamond halo on a platinum trace chain.",
    image: IMAGES.products["sc-019"],
    gallery: [IMAGES.products["sc-019"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "pear",
    priceOnRequest: true,
    metalOptions: ["Platinum 950", "18k White Gold", "18k Yellow Gold"],
    availability: "available",
    featured: false,
    altText: "Teardrop pear diamond pendant necklace displayed on dark weave fabric",
  },
  {
    id: "sc-020",
    slug: "gotham-coiled-tennis-bracelet",
    name: "The Gotham Coiled Tennis Bracelet",
    category: "bracelets",
    categoryLabel: "Fine Bracelet",
    published: true,
    isSample: false,
    shortDescription:
      "Calibrated round brilliant lab-grown diamonds hand-set in flexible four-prong platinum box mountings with concealed safety clasp.",
    detailedDescription:
      "Calibrated round brilliant lab-grown diamonds hand-set in flexible four-prong platinum box mountings with concealed safety clasp.",
    image: IMAGES.products["sc-020"],
    gallery: [IMAGES.products["sc-020"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["6.5 inch", "7.0 inch", "7.5 inch"],
    metalOptions: ["Platinum 950", "18k White Gold", "18k Yellow Gold"],
    availability: "available",
    featured: false,
    altText: "Coiled round brilliant diamond tennis bracelet in platinum setting",
  },
  {
    id: "sc-021",
    slug: "tribeca-cathedral-cushion",
    name: "The Tribeca Cathedral Cushion Solitaire",
    category: "rings",
    categoryLabel: "Engagement Ring",
    published: true,
    isSample: false,
    shortDescription:
      "Elevated cathedral shoulders rise to frame an exceptional cushion lab-grown diamond against a deep charcoal background.",
    detailedDescription:
      "Elevated cathedral shoulders rise to frame an exceptional cushion lab-grown diamond against a deep charcoal background.",
    image: IMAGES.products["sc-021"],
    gallery: [IMAGES.products["sc-021"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamond",
    shape: "cushion",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Cathedral cushion-cut lab-grown diamond engagement ring on charcoal stone backdrop",
  },
  {
    id: "sc-022",
    slug: "st-regis-cocktail-ring",
    name: "The St. Regis Diamond Cocktail Ring",
    category: "rings",
    categoryLabel: "Cocktail Ring",
    published: true,
    isSample: false,
    shortDescription:
      "A bold, multi-tiered cocktail statement ring boasting concentric halos of brilliant lab-grown diamonds in platinum.",
    detailedDescription:
      "A bold, multi-tiered cocktail statement ring boasting concentric halos of brilliant lab-grown diamonds in platinum.",
    image: IMAGES.products["sc-022"],
    gallery: [IMAGES.products["sc-022"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["5.5", "6.0", "6.5", "7.0", "7.5"],
    metalOptions: ["Platinum 950", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "High jewellery diamond cocktail ring with concentric halos of lab-grown stones",
  },
  {
    id: "sc-023",
    slug: "mercer-channel-band",
    name: "The Mercer Channel Platinum Band",
    category: "wedding_bands",
    categoryLabel: "Wedding Band",
    published: true,
    isSample: false,
    shortDescription:
      "Calibrated lab-grown diamonds set within smooth platinum channel borders for a contemporary, snag-free profile.",
    detailedDescription:
      "Calibrated lab-grown diamonds set within smooth platinum channel borders for a contemporary, snag-free profile.",
    image: IMAGES.products["sc-023"],
    gallery: [IMAGES.products["sc-023"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamonds",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0", "8.0", "9.0"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Solid platinum channel set diamond wedding band ring",
  },
  {
    id: "sc-026",
    slug: "highline-rose-gold-solitaire",
    name: "The Highline Rose Gold Solitaire",
    category: "rings",
    categoryLabel: "Engagement Ring",
    published: true,
    isSample: false,
    shortDescription:
      "Cast in romantic 18k rose gold, this solitaire cradles a radiant round lab-grown diamond in a warm, lustrous setting.",
    detailedDescription:
      "Cast in romantic 18k rose gold, this solitaire cradles a radiant round lab-grown diamond in a warm, lustrous setting.",
    image: IMAGES.products["sc-026"],
    gallery: [IMAGES.products["sc-026"]],
    metal: "18k Rose Gold",
    stone: "Certified Lab-Grown Diamond",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["4.5", "5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["18k Rose Gold", "Platinum 950", "18k Yellow Gold"],
    availability: "available",
    featured: false,
    altText: "Round brilliant lab-grown diamond solitaire ring in 18k rose gold on velvet background",
  },
  {
    id: "sc-028",
    slug: "soho-gold-oval-solitaire",
    name: "The SoHo Yellow Gold Oval",
    category: "rings",
    categoryLabel: "Engagement Ring",
    published: true,
    isSample: false,
    shortDescription:
      "A slender 18k yellow gold band provides rich contrast beneath an elongated oval brilliant lab-grown diamond center stone.",
    detailedDescription:
      "A slender 18k yellow gold band provides rich contrast beneath an elongated oval brilliant lab-grown diamond center stone.",
    image: IMAGES.products["sc-028"],
    gallery: [IMAGES.products["sc-028"]],
    metal: "18k Yellow Gold",
    stone: "Certified Lab-Grown Diamond",
    shape: "oval",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["18k Yellow Gold", "Platinum 950", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Elongated oval lab-grown diamond solitaire on 18k yellow gold band over textile backdrop",
  },
  {
    id: "sc-029",
    slug: "chelsea-hidden-halo-solitaire",
    name: "The Chelsea Hidden Halo Solitaire",
    category: "rings",
    categoryLabel: "Engagement Ring",
    published: true,
    isSample: false,
    shortDescription:
      "A timeless round brilliant lab-grown diamond elevated by a hidden pavé halo nestled discreetly beneath the center basket.",
    detailedDescription:
      "A timeless round brilliant lab-grown diamond elevated by a hidden pavé halo nestled discreetly beneath the center basket.",
    image: IMAGES.products["sc-029"],
    gallery: [IMAGES.products["sc-029"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamond",
    shape: "round",
    priceOnRequest: true,
    availableSizes: ["4.5", "5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Round lab-grown diamond solitaire engagement ring with hidden halo on clean fabric",
  },
  {
    id: "sc-030",
    slug: "plaza-cushion-solitaire",
    name: "The Plaza Cushion Solitaire",
    category: "rings",
    categoryLabel: "Engagement Ring",
    published: true,
    isSample: false,
    shortDescription:
      "Soft pillowed contours and deep scintillation highlight this cushion-cut lab-grown diamond resting on midnight velvet.",
    detailedDescription:
      "Soft pillowed contours and deep scintillation highlight this cushion-cut lab-grown diamond resting on midnight velvet.",
    image: IMAGES.products["sc-030"],
    gallery: [IMAGES.products["sc-030"]],
    metal: "Platinum 950",
    stone: "Certified Lab-Grown Diamond",
    shape: "cushion",
    priceOnRequest: true,
    availableSizes: ["5.0", "5.5", "6.0", "6.5", "7.0"],
    metalOptions: ["Platinum 950", "18k Yellow Gold", "18k White Gold"],
    availability: "available",
    featured: false,
    altText: "Cushion-cut lab-grown diamond solitaire in platinum resting on midnight velvet fabric",
  },
];

/**
 * Filter products safely.
 * Strips internalNotes from all returned objects to protect owner confidentiality.
 */
export function getPublishedProducts(): Omit<Product, "internalNotes">[] {
  return products
    .filter((p) => {
      if (!p.published) return false;
      if (p.isSample && !siteConfig.features.showSampleProducts) return false;
      return true;
    })
    .map(({ internalNotes, ...safeProduct }) => safeProduct);
}

export function getFeaturedProducts(): Omit<Product, "internalNotes">[] {
  return getPublishedProducts().filter((p) => p.featured);
}

export function getNonFeaturedProducts(): Omit<Product, "internalNotes">[] {
  return getPublishedProducts().filter((p) => !p.featured);
}

export function getProductsByShape(
  shape: DiamondShape | "all"
): Omit<Product, "internalNotes">[] {
  const published = getPublishedProducts();
  if (shape === "all") return published;
  return published.filter((p) => p.shape === shape);
}
