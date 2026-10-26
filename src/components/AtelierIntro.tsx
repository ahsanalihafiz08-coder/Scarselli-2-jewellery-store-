import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";

interface AtelierIntroProps {
  onOpenBooking: () => void;
}

export const AtelierIntro: React.FC<AtelierIntroProps> = ({ onOpenBooking }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="atelier"
      className="py-12 min-[900px]:py-[88px] bg-[#FAF8F5] text-[#141A24] border-b border-[rgba(10,20,40,0.08)]"
      aria-labelledby="atelier-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-[#8C6D46] font-medium mb-2">
            The Private Atelier
          </p>
          <h2
            id="atelier-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#0B1320] leading-tight"
          >
            A Considered Approach to Modern Fine Jewellery
          </h2>
          <div className="w-12 h-px bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Editorial 2-Column Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Column 1: Atelier Philosophy */}
          <div className="lg:col-span-7 space-y-4 text-[15px] min-[900px]:text-[16px] leading-relaxed text-[#3B4353] font-light">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#0B1320] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
              Located at 580 Fifth Avenue in Midtown Manhattan, Scarselli operates strictly as a private atelier. Led personally by Bruno Scarselli, visits are scheduled one client at a time for an intimate, unhurried fine diamond consultation.
            </p>

            {/* Collapsed by default to ~3 lines; toggled via Read more / Read less on desktop and mobile */}
            {isExpanded && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <p>
                  Every stone in our collection is an independently certified
                  lab-grown diamond, accompanied by comprehensive reports from IGI or
                  GIA. By focusing on exceptional cuts and verified Type IIa optical
                  purity, we present diamonds that exhibit superlative brilliance and
                  fire, mounted solely in solid 950 platinum or 18k gold.
                </p>
                <p>
                  Whether you arrive seeking a ready solitaire, a matched tennis
                  bracelet, or a completely custom engagement ring setting, your
                  viewing is private and dedicated solely to your preferences.
                </p>
              </div>
            )}

            {/* Read More / Read Less Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[13px] lg:text-[14px] text-[#8C6D46] hover:text-[#0B1320] font-medium underline underline-offset-4 focus:outline-none transition-colors"
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button
                onClick={onOpenBooking}
                className="h-11 min-[900px]:h-12 px-7 text-[12px] min-[900px]:text-[14px] uppercase tracking-[0.14em] font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] transition-colors rounded-pill"
              >
                Request an Appointment
              </button>

              <div className="text-[13px] lg:text-[14px] text-[#6B7280] space-y-0.5">
                <span className="font-medium text-[#141A24] block">
                  Visits by Private Appointment Only
                </span>
                <span>{siteConfig.brand.hours.regular}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Atelier Specifications & Verified Business Facts */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#E8E3DC] shadow-xs space-y-6">
            <div>
              <h3 className="text-[12px] uppercase tracking-[0.16em] text-[#8C6D46] font-medium mb-1.5">
                Atelier Location
              </h3>
              <p className="font-serif text-2xl text-[#0B1320]">
                {siteConfig.brand.address.street}
              </p>
              <p className="text-[14px] text-[#4B5563] mt-0.5">
                {siteConfig.brand.address.suite}, {siteConfig.brand.address.city},{" "}
                {siteConfig.brand.address.state} {siteConfig.brand.address.zip}
              </p>
            </div>

            <div className="border-t border-[#F0EBE5] pt-5">
              <h3 className="text-[12px] uppercase tracking-[0.16em] text-[#8C6D46] font-medium mb-2">
                Materials & Provenance
              </h3>
              <ul className="text-[14px] text-[#4B5563] space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#C5A880]">✦</span>
                  <span>Pure 950 Platinum & Solid 18k Gold</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C5A880]">✦</span>
                  <span>IGI & GIA Certified Lab-Grown Diamonds</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C5A880]">✦</span>
                  <span>Type IIa Optical Purity Verified</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#C5A880]">✦</span>
                  <span>Handcrafted in New York</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-[#F0EBE5] pt-5">
              <h3 className="text-[12px] uppercase tracking-[0.16em] text-[#8C6D46] font-medium mb-1.5">
                Direct Contact
              </h3>
              <p className="text-[14px] text-[#141A24] font-medium">
                Phone & WhatsApp:{" "}
                <a
                  href={`tel:${siteConfig.brand.contact.phoneRaw}`}
                  className="text-[#0B1320] hover:text-[#8C6D46] underline decoration-slate-300 underline-offset-4"
                >
                  {siteConfig.brand.contact.phone}
                </a>
              </p>
              <p className="text-[13px] text-[#6B7280] mt-0.5">
                {siteConfig.brand.hours.extended}
              </p>
            </div>

            {/* Verified Google Review Fact */}
            <div className="border-t border-[#F0EBE5] pt-5 bg-[#FAF8F5] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[12px] tracking-wider uppercase text-[#8C6D46] block font-medium">
                    Google Business Rating
                  </span>
                  <span className="text-xl font-serif font-medium text-[#0B1320]">
                    5.0 Stars
                  </span>
                  <span className="text-[13px] text-[#6B7280] ml-2">
                    ({siteConfig.brand.reviews.verifiedCount} verified reviews)
                  </span>
                </div>
                <span className="text-[#C5A880] tracking-widest text-sm">
                  ★★★★★
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
