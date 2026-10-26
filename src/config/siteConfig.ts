/**
 * Central Configuration for Scarselli
 * 580 Fifth Avenue, Suite 821, New York, NY 10017
 *
 * All business parameters, media paths, feature flags, and diamond policies
 * are controlled in this file.
 */

import { IMAGE_CONFIG, ImageConfig } from "./imageConfig";
export { IMAGE_CONFIG, type ImageConfig };

export interface SiteConfig {
  brand: {
    name: string;
    founder: string;
    type: string;
    tagline: string;
    speciality: string;
    materials: string;
    address: {
      street: string;
      suite: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      full: string;
    };
    contact: {
      phone: string;
      phoneRaw: string;
      whatsapp: string;
      whatsappRaw: string;
      email: string; // Left empty until verified by owner
    };
    hours: {
      regular: string;
      extended: string;
    };
    reviews: {
      verifiedCount: number;
      rating: number;
      googleBusinessProfileUrl: string; // Left empty until verified URL provided
    };
    urls: {
      mapUrl: string; // Left empty until verified URL provided
      socials: Record<string, string>; // Empty until verified
    };
  };
  media: {
    heroImagePath: string;
    heroVideoPath: string;
    heroPosterPath: string;
    founderPortraitPath: string; // Empty until verified client photo is provided
  };
  features: {
    enableHeroVideo: boolean;
    showPrices: boolean; // false = "Price on request"
    showSampleProducts: boolean; // false = strictly prevent unverified sample records from appearing
    enableFounderIntro: boolean;
    enableFounderPortrait: boolean; // false = use intentional architectural monogram fallback; never fake portrait
    enableWorkshopGallery: boolean; // false = hide until client supplies verified workshop photos
    enableReviewsFact: boolean;
    enableCertificateGallery: boolean;
    enableSocialLinks: boolean;
    labGrownOnlyStrict: boolean; // true = absolute enforcement of lab-grown only language
  };
  pricing: {
    currency: string;
    currencySymbol: string;
    priceOnRequestText: string;
    typicalRange: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "Scarselli",
    founder: "Bruno Scarselli",
    type: "Private fine diamond jewellery atelier; visits by private appointment only.",
    tagline: "Exceptional Diamonds. Personally Chosen.",
    speciality:
      "IGI- and GIA-certified lab-grown diamonds, described as Type IIa only where verified.",
    materials: "Platinum (950) and 18k Gold",
    address: {
      street: "580 Fifth Avenue",
      suite: "Suite 821",
      city: "New York",
      state: "NY",
      zip: "10017",
      country: "USA",
      full: "580 Fifth Avenue, Suite 821, New York, NY 10017, USA",
    },
    contact: {
      phone: "+1 (917) 880-1797",
      phoneRaw: "+19178801797",
      whatsapp: "+1 (917) 880-1797",
      whatsappRaw: "+19178801797",
      email: "bruno@scarselli.com",
    },
    hours: {
      regular: "Monday–Friday, 10:00 AM–6:00 PM",
      extended: "Evenings and weekends by special arrangement.",
    },
    reviews: {
      verifiedCount: 11,
      rating: 5.0,
      googleBusinessProfileUrl: "", // Only render link if verified URL is present
    },
    urls: {
      mapUrl: "", // Only render link if verified URL is present
      socials: {
        instagram: "https://www.instagram.com/bruno.scarselli",
        facebook: "https://www.facebook.com/profile.php?id=100057064495554",
      },
    },
  },
  media: {
    heroImagePath: IMAGE_CONFIG.hero,
    heroVideoPath: "",
    heroPosterPath: IMAGE_CONFIG.hero,
    founderPortraitPath: IMAGE_CONFIG.founderPortrait,
  },
  features: {
    enableHeroVideo: false,
    showPrices: false, // Default is "Price on request" per luxury atelier standard
    showSampleProducts: false, // Strictly prevents sample records from public view
    enableFounderIntro: true,
    enableFounderPortrait: false, // Never display stock/AI image as founder
    enableWorkshopGallery: false, // Hide workshop gallery until client supplies real photography
    enableReviewsFact: true,
    enableCertificateGallery: false,
    enableSocialLinks: true,
    labGrownOnlyStrict: true,
  },
  pricing: {
    currency: "USD",
    currencySymbol: "$",
    priceOnRequestText: "Price on request",
    typicalRange: "$10,000 – $100,000+",
  },
};

/**
 * Central CONTACT configuration for Scarselli Atelier
 * All social and contact buttons are driven strictly from this object.
 */
export const CONTACT = {
  email: "bruno@scarselli.com",
  phone: "+19178801797",
  whatsapp: "https://wa.me/19178801797",
  instagram: "https://www.instagram.com/bruno.scarselli",
  facebook: "https://www.facebook.com/profile.php?id=100057064495554",
  pinterest: "",
  youtube: "",
  googleReviews: "",
};

