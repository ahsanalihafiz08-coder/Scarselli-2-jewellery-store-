import React from "react";
import { siteConfig } from "../config/siteConfig";
import { toRelativeImagePath } from "../utils/imagePath";

interface AboutFounderProps {
  onOpenBooking: () => void;
}

export const AboutFounder: React.FC<AboutFounderProps> = ({ onOpenBooking }) => {
  const hasPortrait =
    siteConfig.features.enableFounderPortrait && Boolean(siteConfig.media.founderPortraitPath);

  return (
    <section
      id="about"
      className="py-12 min-[900px]:py-[88px] bg-[#FAF8F5] border-b border-[rgba(10,20,40,0.08)]"
      aria-labelledby="founder-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {hasPortrait ? (
          /* Split layout when real verified portrait photo is provided */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-[4/5] max-h-[420px] w-full max-w-sm bg-[#0B1320] overflow-hidden border border-[#D5CEBF] rounded-img shadow-soft">
                <img
                  src={toRelativeImagePath(siteConfig.media.founderPortraitPath)}
                  alt="Bruno Scarselli, founder of Scarselli"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover max-h-[420px]"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <p className="text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-[#8C6D46] font-medium">
                Founder & Principal
              </p>
              <h2
                id="founder-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#0B1320] leading-tight"
              >
                A Personal Relationship with Every Client
              </h2>
              <div className="text-[15px] lg:text-[16px] text-[#3B4353] font-light leading-relaxed max-w-xl">
                <p>
                  At Scarselli, fine jewellery is approached as a deeply personal, once-in-a-lifetime commission. Founded and led by Bruno Scarselli at 580 Fifth Avenue, Suite 821, the atelier operates strictly by private appointment. Bruno works directly with every client, guiding them through certified diamond selection and noble metalcraft in platinum and 18k gold to realize an enduring bespoke vision.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="h-11 px-7 text-[12px] sm:text-[13px] lg:text-[13px] uppercase tracking-[0.16em] font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] transition-colors rounded-pill"
                >
                  Book with Bruno Scarselli
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Clean text-only editorial layout when no portrait image is set (NO placeholder boxes!) */
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div>
              <p className="text-[12px] lg:text-[13px] tracking-[0.22em] uppercase text-[#8C6D46] font-medium mb-2">
                Founder & Principal · Private Atelier
              </p>
              <h2
                id="founder-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#0B1320] leading-tight"
              >
                {siteConfig.brand.founder}
              </h2>
              <p className="font-serif text-lg sm:text-xl text-[#6B7280] italic mt-2">
                A Personal Relationship with Every Client
              </p>
              <div className="w-12 h-px bg-[#C5A880] mx-auto mt-5" />
            </div>

            {/* Shortened to about 4 lines of elegant editorial copy */}
            <div className="text-[15px] min-[900px]:text-[16px] text-[#3B4353] font-light leading-relaxed text-left sm:text-center max-w-xl mx-auto">
              <p>
                At Scarselli, fine jewellery is approached as a deeply personal, once-in-a-lifetime commission. Founded and led by Bruno Scarselli at 580 Fifth Avenue, Suite 821, the atelier operates strictly by private appointment. Bruno works directly with every client, guiding them through certified diamond selection and noble metalcraft in platinum and 18k gold to realize an enduring bespoke vision.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <button
                onClick={onOpenBooking}
                className="h-11 min-[900px]:h-12 px-7 text-[12px] min-[900px]:text-[14px] uppercase tracking-[0.16em] font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] transition-colors rounded-pill"
              >
                Book with Bruno Scarselli
              </button>

              <div className="text-[13px] lg:text-[14px] text-[#6B7280]">
                <span className="text-[#141A24] font-medium block">
                  Private Appointments · Suite 821
                </span>
                <span>Direct Coordination: {siteConfig.brand.contact.phone}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
