import React from "react";

interface CraftsmanshipProps {
  onOpenBooking: () => void;
}

const steps = [
  {
    step: "01",
    title: "Considered Architectural Design",
    description:
      "Mounts engineered with balanced proportions and low baskets to maximize ambient diamond fire and lifetime comfort.",
    subtext: "Proportion · Balance · Longevity",
  },
  {
    step: "02",
    title: "Rigorous Diamond Selection",
    description:
      "Bruno Scarselli hand-inspects Type IIa lab-grown stones for crisp facet geometry and pure optical performance.",
    subtext: "IGI & GIA Certified · Type IIa Purity",
  },
  {
    step: "03",
    title: "Noble Precious Metals",
    description:
      "Hand-forged in substantial 950 platinum and solid 18k gold for permanent prong tenacity and lasting lustre.",
    subtext: "Pure 950 Platinum · Solid 18k Gold",
  },
  {
    step: "04",
    title: "Precision Setting & Hand Finishing",
    description:
      "Claws and bezels filed and burnished by hand under magnification for a secure hold and mirror polish.",
    subtext: "Micro-Setting · Low Profile · Mirror Polish",
  },
  {
    step: "05",
    title: "Private Atelier Presentation",
    description:
      "Private inspection of your finished piece alongside its original IGI or GIA dossier in our Midtown suite.",
    subtext: "580 Fifth Avenue · Personal Inspection",
  },
];

export const Craftsmanship: React.FC<CraftsmanshipProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="craftsmanship"
      className="py-12 min-[900px]:py-[88px] bg-[#0B1320] text-white border-b border-[#1F2937]"
      aria-labelledby="craftsmanship-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-[#C5A880] font-medium mb-2">
            Atelier Standards & Process
          </p>
          <h2
            id="craftsmanship-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white leading-tight"
          >
            How an Exceptional Piece is Realized
          </h2>
          <div className="w-12 h-px bg-[#C5A880] mx-auto mt-4" />
          <p className="mt-3 text-[15px] lg:text-[16px] text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
            From initial diamond selection through noble metal fabrication, every piece follows a
            disciplined sequence dedicated to beauty, security, and optical fire.
          </p>
        </div>

        {/* 5-Step Editorial Sequence (Consistent 24px gap on desktop, exactly 2 lines per card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={`p-7 sm:p-8 bg-[#0F1829] border border-[#23314B] hover:border-[#C5A880] transition-colors flex flex-col justify-between rounded-card shadow-soft overflow-hidden ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                <div className="mb-3">
                  <span className="font-serif text-3xl text-[#C5A880] font-normal block leading-none">
                    {item.step}
                  </span>
                  <span className="text-[12px] lg:text-[13px] tracking-wider uppercase font-medium text-slate-400 block mt-2">
                    {item.subtext}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Full description without ellipsis, 16px on desktop */}
                <p className="text-[15px] min-[900px]:text-[16px] leading-relaxed font-light text-slate-300">
                  {item.description}
                </p>
              </div>

              {index === 4 && (
                <div className="mt-6 pt-4 border-t border-[#1C273C]">
                  <button
                    onClick={onOpenBooking}
                    className="w-full h-11 min-[900px]:h-12 px-7 text-[12px] min-[900px]:text-[14px] uppercase tracking-[0.14em] font-medium text-[#0B1320] bg-[#C5A880] hover:bg-[#D4B991] transition-colors rounded-pill"
                  >
                    Schedule Private Viewing
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certified Provenance Note */}
        <div className="mt-10 p-5 bg-[#0F1829] border border-[#23314B] text-center max-w-2xl mx-auto rounded-card shadow-soft overflow-hidden">
          <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed font-light">
            <strong className="text-white font-medium">Certified Provenance:</strong> Every
            lab-grown diamond over 1.00 carat is accompanied by its original grading certificate
            from IGI or GIA, laser-inscribed on the girdle for complete verification.
          </p>
        </div>
      </div>
    </section>
  );
};
