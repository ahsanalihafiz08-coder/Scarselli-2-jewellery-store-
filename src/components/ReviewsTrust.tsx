import React, { useState } from "react";
import { siteConfig, CONTACT } from "../config/siteConfig";

const REVIEWS = [
  {
    name: "G Pal",
    text: "Davide made the entire experience of selecting and creating an engagement ring truly exceptional. From our first conversation, his professionalism and depth of knowledge stood out, and he…",
  },
  {
    name: "Dov Ginsburg",
    text: "I had an amazing experience working with Scarselli Diamonds, especially with David. His professionalism and attention to detail made the entire process smooth and enjoyable. The…",
  },
  {
    name: "Ramzi Bishtawi",
    text: "Davide helped me embark on the journey of purchasing an engagement ring and provided top notch service. I am most appreciative of his patience and expertise throughout the process…",
  },
  {
    name: "Eiley Stern",
    text: "My husband and I have worked with Scarselli diamonds for a few jewelry needs, and we couldn't be happier with the results! Thank you Bruno and Scarselli team for being patient,…",
  },
  {
    name: "marc S",
    text: "My wife and I had the pleasure of working with Davide over the course of a year and we purchased a diamond ring. He and the company are amazing to work with. He will never rush you…",
  },
];

export const ReviewsTrust: React.FC = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { rating, verifiedCount, googleBusinessProfileUrl } = siteConfig.brand.reviews;
  const visibleReviews = showAllReviews ? REVIEWS : REVIEWS.slice(0, 3);

  return (
    <>
      {/* =========================================================================
       * TRACK RECORD SECTION
       * ========================================================================= */}
      <section
        id="track-record"
        className="py-12 min-[900px]:py-[88px] bg-[#0B1320] text-white border-b border-[#1F2937]"
        aria-labelledby="trust-heading"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] lg:text-[13px] uppercase tracking-[0.24em] text-[#C5A880] font-medium mb-2">
              Reputation & Standards
            </p>
            <h2
              id="trust-heading"
              className="text-3xl sm:text-4xl font-serif font-normal text-white leading-tight"
            >
              A Track Record of Uncompromising Care
            </h2>
            <div className="w-12 h-px bg-[#C5A880] mx-auto mt-4" />
          </div>

          {/* 3-Column Trust & Verification Grid (Consistent 24px gap on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 items-stretch">
            {/* Card 1: Google Rating */}
            <div className="p-7 sm:p-8 bg-[#0F1829] border border-[#23314B] rounded-card shadow-soft overflow-hidden flex flex-col justify-between text-center">
              <div>
                <span className="text-[12px] lg:text-[13px] uppercase tracking-[0.18em] text-[#C5A880] font-medium block mb-2">
                  Verified Client Feedback
                </span>
                <div className="text-4xl sm:text-5xl font-serif text-white mb-2">
                  {rating.toFixed(1)}
                  <span className="text-xl text-[#C5A880] font-light"> / 5.0</span>
                </div>
                <div className="text-[#C5A880] tracking-widest text-base mb-3">★★★★★</div>
                <p className="text-[15px] lg:text-[16px] text-slate-300 font-light leading-relaxed">
                  Based on <strong className="text-white font-medium">{verifiedCount} verified Google reviews</strong>.
                  Private atelier appointments conducted with singular focus on client comfort and gemstone education.
                </p>
              </div>

              <div className="pt-5 border-t border-[#1C273C] mt-5">
                {googleBusinessProfileUrl ? (
                  <a
                    href={googleBusinessProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[#C5A880] hover:text-white underline uppercase tracking-wider transition-colors"
                  >
                    View on Google Business Profile →
                  </a>
                ) : (
                  <span className="text-[13px] text-slate-400 uppercase tracking-wider">
                    Verified Google Business Profile
                  </span>
                )}
              </div>
            </div>

            {/* Card 2: Independent Lab Certification */}
            <div className="p-7 sm:p-8 bg-[#0F1829] border border-[#23314B] rounded-card shadow-soft overflow-hidden flex flex-col justify-between text-center">
              <div>
                <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.18em] text-[#C5A880] font-medium block mb-2">
                  Independent Grading
                </span>
                <div className="text-2xl sm:text-3xl font-serif text-white mb-2 tracking-wide">
                  IGI & GIA
                </div>
                <span className="text-[13px] text-[#C5A880] uppercase tracking-wider font-medium block mb-2">
                  Documented Laboratory Reports
                </span>
                <p className="text-[15px] text-slate-300 font-light leading-relaxed">
                  Every qualifying lab-grown diamond is independently tested and graded for the 4Cs
                  (Carat, Color, Clarity, Cut) with matching microscopic laser inscriptions on the
                  girdle.
                </p>
              </div>

              <div className="pt-5 border-t border-[#1C273C] mt-5">
                <span className="text-[13px] text-slate-400 uppercase tracking-wider">
                  Full Dossier Delivered with Each Piece
                </span>
              </div>
            </div>

            {/* Card 3: Optical Purity & Metal Integrity */}
            <div className="p-7 sm:p-8 bg-[#0F1829] border border-[#23314B] rounded-card shadow-soft overflow-hidden flex flex-col justify-between text-center">
              <div>
                <span className="text-[12px] sm:text-[13px] uppercase tracking-[0.18em] text-[#C5A880] font-medium block mb-2">
                  Material Authenticity
                </span>
                <div className="text-2xl sm:text-3xl font-serif text-white mb-2 tracking-wide">
                  Type IIa & 950 Platinum
                </div>
                <span className="text-[13px] text-[#C5A880] uppercase tracking-wider font-medium block mb-2">
                  Verified Optical Purity
                </span>
                <p className="text-[15px] text-slate-300 font-light leading-relaxed">
                  Type IIa diamonds contain no measurable nitrogen impurities, representing the most
                  chemically pure crystalline diamond carbon. Mounted strictly in solid 950 platinum
                  and 18k gold.
                </p>
              </div>

              <div className="pt-5 border-t border-[#1C273C] mt-5">
                <span className="text-[13px] text-slate-400 uppercase tracking-wider">
                  Nickel-Free · Hypoallergenic Craft
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * REVIEWS SECTION (Directly follows Track Record, menu link scrolls here)
       * ========================================================================= */}
      <section
        id="reviews"
        className="py-12 min-[900px]:py-[88px] bg-[#0A111E] text-white border-b border-[#1F2937]"
        aria-labelledby="reviews-heading"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] lg:text-[13px] uppercase tracking-[0.24em] text-[#C5A880] font-medium mb-2">
              Client Experiences
            </p>
            <h2
              id="reviews-heading"
              className="text-3xl sm:text-4xl font-serif font-normal text-white leading-tight"
            >
              What Our Clients Say
            </h2>
            <div className="w-12 h-px bg-[#C5A880] mx-auto mt-4" />
          </div>

          {/* Above the cards: "5.0 · 11 Google reviews" and optional link */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 pb-4 border-b border-[#1C273C]">
            <div className="flex items-center gap-2.5">
              <span className="text-[#C5A880] tracking-widest text-base">★★★★★</span>
              <span className="text-[15px] sm:text-[16px] text-white font-medium">
                5.0 · 11 Google reviews
              </span>
            </div>

            {/* Read all reviews on Google link (hidden when CONTACT.googleReviews is empty) */}
            {CONTACT.googleReviews ? (
              <a
                href={CONTACT.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#C5A880] hover:text-white underline uppercase tracking-wider transition-colors"
              >
                Read all reviews on Google →
              </a>
            ) : null}
          </div>
        </div>

        {/* 3 cards per row on desktop and a clean compact swipeable row on mobile */}
        <div className="reviews-grid flex min-[900px]:grid gap-4 sm:gap-6 overflow-x-auto min-[900px]:overflow-visible pb-4 min-[900px]:pb-0 snap-x snap-mandatory px-4 sm:px-6">
          {visibleReviews.map((rev, idx) => (
            <article
              key={idx}
              className="review-card w-[82vw] max-w-[310px] shrink-0 min-[900px]:w-auto min-[900px]:max-w-none snap-center bg-[#0F1829] border border-[#23314B] hover:border-[#C5A880]/60 transition-colors p-5 min-[900px]:p-6 rounded-card shadow-soft overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="text-[#C5A880] text-xs sm:text-sm tracking-widest mb-2.5">★★★★★</div>
                <p className="text-[14px] min-[900px]:text-[15px] text-slate-200 italic font-light leading-relaxed mb-3 line-clamp-4 min-[900px]:line-clamp-none">
                  "{rev.text}"
                </p>
              </div>
              <div className="pt-3 min-[900px]:pt-4 border-t border-[#1C273C] flex items-center justify-between">
                <span className="font-medium text-white text-[14px] min-[900px]:text-[15px]">{rev.name}</span>
                <span className="text-[11px] sm:text-[12px] text-[#C5A880] tracking-wide">Google review</span>
              </div>
            </article>
          ))}
        </div>

        {/* Show more button (reveals the other reviews) */}
        {REVIEWS.length > 3 && (
          <div className="text-center" style={{ marginTop: "32px" }}>
            <button
              type="button"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="h-11 min-[900px]:h-12 px-7 text-[13px] min-[900px]:text-[14px] uppercase tracking-[0.14em] font-medium text-white border border-[#C5A880] hover:bg-[#C5A880] hover:text-[#0B1320] transition-colors rounded-pill cursor-pointer"
            >
              {showAllReviews ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </section>
    </>
  );
};
