# Scarselli — Private Fine Diamond Jewellery Atelier

**Atelier Address**: 580 Fifth Avenue, Suite 821, New York, NY 10017, USA  
**Founder & Principal**: Bruno Scarselli  
**Phone & Direct WhatsApp**: +1 (917) 880-1797  
**Hours**: Monday–Friday, 10:00 AM–6:00 PM (Evenings & weekends by special arrangement)  
**Deployment Target**: Netlify Static Hosting (`publish = "dist"`, `command = "npm run build"`)

---

## Complete Project Architecture & Implementation

This repository contains the complete, production-ready website for Scarselli, architected to Netlify static deployment standards.

### Architectural Highlights
1. **Central Configuration (`src/config/siteConfig.ts`)**:
   Controls business address, contact numbers, hours, hero asset paths, review statistics (11 reviews, 5.0 stars), pricing policy (`showPrices: false` defaults to "Price on request"), and strict lab-grown diamond policy.
2. **Central Product Catalog (`src/data/products.ts`)**:
   Sole source of truth for inventory. Verified inventory is published with genuine specifications. Sample slots are protected with `isSample: true` and `published: false` so they never appear to visitors. Internal notes are stripped from public rendering.
3. **Netlify Forms Integration (`index.html` & `src/components/ContactSection.tsx`)**:
   Static detection form `<form name="scarselli-enquiry" netlify netlify-honeypot="bot-field" hidden>` in `index.html` ensures Netlify detects the form at build time. The React form submits via URL-encoded `fetch` with bot honeypot protection, visible loading state, accessible error messaging, and honest confirmation states.
4. **Persistent Favorites (`src/utils/favoritesStorage.ts`)**:
   Safe `localStorage` bookmarking across browser sessions with a consultation list drawer and "Enquire About All Saved Pieces" transfer.
5. **Truthful Content Standard**:
   No fake testimonials, no invented awards, no fake certificate images, and no stock headshots disguised as Bruno Scarselli.

---

## Client To-Do List (Launch Preparation)

Before taking the website live in production, the client must supply or confirm the following 15 items:

1. **Hero Media Asset**: Supply a high-resolution hero photograph or short silent video, plus the intended mobile crop or poster image, to be placed at `/public/images/scarselli-hero.jpg`.
2. **Launch Inventory Verification**: Review and approve the curated list of 12–24 launch products in `src/data/products.ts`, confirming verified names, accurate descriptions, categories, metal alloys, and diamond specifications.
3. **Product Gallery & 360° Media**: Provide any additional angles or genuine 360-degree media files for individual pieces.
4. **Independent Lab Certificates**: Provide verified IGI/GIA certificate numbers and high-resolution certificate scans for applicable stones.
5. **Diamond Policy Confirmation**: Confirm whether Scarselli sells certified lab-grown diamonds exclusively or will also offer natural diamonds. Until explicitly confirmed, the website strictly enforces lab-grown-only language.
6. **Workshop Photography**: Supply real workshop/bench photography if desired. The workshop gallery currently remains cleanly disabled until approved photography is provided.
7. **Founder Portrait & Bio**: Supply Bruno Scarselli's approved portrait photograph and biography. When supplied, place the image at `/public/images/bruno-scarselli.jpg` and toggle `siteConfig.features.enableFounderPortrait = true`.
8. **Business Details Confirmation**: Confirm the atelier address (580 Fifth Avenue, Suite 821, New York, NY 10017), telephone and WhatsApp (+1 917 880-1797), and operating hours.
9. **Official Business Email**: Provide the confirmed business contact email to be listed in `siteConfig.brand.contact.email`.
10. **Google Business Profile & Social URLs**: Provide the verified Google Business Profile link and verified social media accounts in `siteConfig.brand.reviews.googleBusinessProfileUrl` and `siteConfig.brand.urls.socials`.
11. **Pricing Policy**: Confirm whether to display retail prices or maintain the luxury standard "Price on request" setting (`siteConfig.features.showPrices = false`).
12. **Commercial Terms**: Supply approved terms for shipping, transit insurance, ring resizing, atelier repairs, warranty, and returns.
13. **Legal & Privacy Policies**: Supply approved legal copy for the Privacy Policy and terms of service.
14. **Netlify Deployment & Form Testing**: Connect the Git repository to Netlify, verify that Netlify detects the `scarselli-enquiry` form, configure email notifications in the Netlify Forms dashboard, and complete a live test submission.
15. **Brand Assets & Verified Claims**: Supply any verified trademark wordmarks, registered badges, or special industry certifications for publication.
