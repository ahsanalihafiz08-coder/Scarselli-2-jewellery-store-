import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { toRelativeImagePath } from "../utils/imagePath";

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const heroImageSrc = toRelativeImagePath(siteConfig.media.heroImagePath);
  const isVideoEnabled =
    siteConfig.features.enableHeroVideo && Boolean(siteConfig.media.heroVideoPath);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const collectionSection = document.querySelector("#collection");
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* =========================================================================
       * MOBILE HERO (< 900px):
       * Stacked layout: Photo above, text below on solid navy (#0B1320).
       * ========================================================================= */}
      <div className="block min-[900px]:hidden bg-[#0B1320] text-white" aria-label="Atelier Hero Mobile">
        {/* Full-width Photo Block directly under fixed transparent header */}
        <div className="relative w-full aspect-[4/3] max-h-[340px] overflow-hidden bg-[#0B1320]">
          {!imageError && heroImageSrc ? (
            <img
              src={heroImageSrc}
              alt="Exceptional diamond engagement ring in presentation box crafted by Scarselli"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-center brightness-[1.08] contrast-[1.04] transition-opacity duration-500 ease-out ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null}

          {/* Soft 40px fade at bottom edge into navy */}
          <div
            className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0B1320] to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Hero Text Block BELOW the photo on solid navy with 24px (px-6) side padding */}
        <div className="w-full bg-[#0B1320] px-6 pt-5 pb-8 flex flex-col items-center text-center">
          {/* Small label: 12px, letter-spacing 0.12em */}
          <div className="mb-2 text-[12px] tracking-[0.12em] uppercase text-[#C5A880] font-medium whitespace-nowrap">
            580 FIFTH AVENUE · NEW YORK · SUITE 821
          </div>

          {/* Heading: 36px, line-height 1.15 */}
          <h1 className="text-[36px] leading-[1.15] font-serif font-normal text-white mb-3 tracking-tight">
            Exceptional Diamonds. <br />
            <span className="italic font-light text-slate-100">Personally Chosen.</span>
          </h1>

          {/* Subtext: 16px, line-height 1.6, colour rgba(255,255,255,0.85) */}
          <p className="text-[16px] leading-[1.6] text-[rgba(255,255,255,0.85)] font-light mb-6 max-w-[360px] mx-auto">
            Private appointments in Midtown Manhattan. Curated IGI- & GIA-certified
            lab-grown diamonds, sculpted in platinum and 18k gold.
          </p>

          {/* Buttons: border-radius 4px on mobile */}
          <div className="flex flex-col gap-3 w-full max-w-[360px] items-center">
            <button
              onClick={onOpenBooking}
              className="w-full h-[52px] px-6 rounded-[4px] text-[13px] uppercase tracking-[0.14em] font-medium text-[#0B1320] bg-[#C5A880] hover:bg-[#D4B991] active:bg-[#B39264] transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
            >
              Book a private viewing
            </button>

            <a
              href="#collection"
              onClick={handleExploreClick}
              className="w-full h-[52px] px-6 rounded-[4px] text-[13px] uppercase tracking-[0.14em] font-medium text-white hover:bg-white/5 transition-colors border border-[#C5A880] flex items-center justify-center cursor-pointer"
            >
              Explore the collection
            </a>
          </div>

          {/* Stats row: value 16px and label 13px, three equal columns */}
          <div className="mt-6 pt-4 border-t border-white/20 w-full max-w-[360px] grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="block font-serif text-[16px] text-white font-normal leading-tight">
                Type IIa
              </span>
              <span className="block text-[13px] text-[#C5A880] font-medium tracking-tight mt-0.5">
                Optically pure
              </span>
            </div>
            <div>
              <span className="block font-serif text-[16px] text-white font-normal leading-tight">
                5.0 ★
              </span>
              <span className="block text-[13px] text-[#C5A880] font-medium tracking-tight mt-0.5">
                Google reviews
              </span>
            </div>
            <div>
              <span className="block font-serif text-[16px] text-white font-normal leading-tight">
                Suite 821
              </span>
              <span className="block text-[13px] text-[#C5A880] font-medium tracking-tight mt-0.5">
                By appointment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
       * DESKTOP HERO (900px and wider):
       * - .hero: position: relative; background: #0B1320; overflow: hidden;
       * - Photo panel on right: position: absolute; top: 0; right: 0; bottom: 0; width: 55%;
       *   ring photo inside with object-fit: cover; object-position: 50% 50%; no scale/zoom/overlay
       * - Soft gradient only on LEFT edge of panel: navy to transparent, about 120px wide
       * - Text content in column on LEFT: max-width 45% of hero, z-index above, never overlaps photo
       * ========================================================================= */}
      <section
        className="hero hidden min-[900px]:flex relative w-full min-[900px]:h-auto min-[900px]:min-h-[440px] min-[900px]:max-h-[600px] pt-[80px] pb-4 bg-[#0B1320] items-center text-white overflow-hidden"
        aria-label="Atelier Hero Desktop"
      >
        {/* Photo panel on the right: position: absolute; top: 0; right: 0; bottom: 0; width: 55%; */}
        {!imageError && heroImageSrc ? (
          <div
            className="absolute top-0 right-0 bottom-0 w-[55%] h-full overflow-hidden pointer-events-none"
            style={{ width: "55%" }}
          >
            <img
              src={heroImageSrc}
              alt="Exceptional diamond engagement ring in presentation box crafted by Scarselli"
              className="w-full h-full brightness-100 contrast-100"
              style={{
                objectFit: "cover",
                objectPosition: "50% 50%",
              }}
            />
            {/* Soft gradient only on the LEFT edge of that panel (navy to transparent, about 120px wide) */}
            <div
              className="absolute top-0 bottom-0 left-0 pointer-events-none"
              style={{
                width: "120px",
                background: "linear-gradient(to right, #0B1320 0%, rgba(11, 19, 32, 0) 100%)",
              }}
              aria-hidden="true"
            />
          </div>
        ) : null}

        {/* Text content in a column on the LEFT, max-width 45% of the hero, z-index above */}
        <div className="relative z-10 w-full h-full flex items-center px-6 lg:px-8 max-w-[1200px] mx-auto">
          <div
            className="w-full flex flex-col items-start justify-center text-left py-4"
            style={{ maxWidth: "45%" }}
          >
            {/* Atelier Kicker: 13px */}
            <div className="inline-flex items-center justify-start gap-1.5 mb-2.5 text-[13px] tracking-[0.16em] uppercase text-[#C5A880] font-medium whitespace-nowrap">
              <span>580 FIFTH AVENUE · NEW YORK · SUITE 821</span>
            </div>

            {/* Main Headline: 48px */}
            <h1 className="text-[48px] font-serif font-normal tracking-tight text-white mb-3 leading-[1.15]">
              Exceptional Diamonds. <br />
              <span className="italic font-light text-slate-100">Personally Chosen.</span>
            </h1>

            {/* Supporting Line: 18px */}
            <p className="text-[18px] text-slate-200 font-light leading-relaxed mb-6">
              Private appointments in Midtown Manhattan. Curated IGI- & GIA-certified
              lab-grown diamonds, sculpted in platinum and 18k gold.
            </p>

            {/* Action CTAs: Two buttons side by side with 16px gap, 52px high with 14px text */}
            <div className="flex flex-wrap items-center gap-4 w-full">
              <button
                onClick={onOpenBooking}
                className="h-[52px] px-7 rounded-pill text-[14px] uppercase tracking-[0.12em] font-medium text-[#0B1320] bg-[#C5A880] hover:bg-[#D4B991] active:bg-[#B39264] transition-colors whitespace-nowrap flex items-center justify-center cursor-pointer shadow-soft"
              >
                Book a private viewing
              </button>

              <a
                href="#collection"
                onClick={handleExploreClick}
                className="h-[52px] px-7 rounded-pill text-[14px] uppercase tracking-[0.12em] font-medium text-slate-100 hover:text-white transition-colors border border-[#C5A880] hover:bg-white/5 whitespace-nowrap flex items-center justify-center cursor-pointer"
              >
                Explore collection
              </a>
            </div>

            {/* Bottom Stats: stats value 20px and stats label 14px */}
            <div className="mt-6 pt-4 border-t border-white/20 w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif text-[20px] text-white font-normal leading-tight">
                  Type IIa
                </span>
                <span className="block text-[14px] text-[#C5A880] font-medium tracking-wide mt-0.5">
                  Optically pure
                </span>
              </div>
              <div>
                <span className="block font-serif text-[20px] text-white font-normal leading-tight">
                  5.0 ★
                </span>
                <span className="block text-[14px] text-[#C5A880] font-medium tracking-wide mt-0.5">
                  Google reviews
                </span>
              </div>
              <div>
                <span className="block font-serif text-[20px] text-white font-normal leading-tight">
                  Suite 821
                </span>
                <span className="block text-[14px] text-[#C5A880] font-medium tracking-wide mt-0.5">
                  By appointment
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
