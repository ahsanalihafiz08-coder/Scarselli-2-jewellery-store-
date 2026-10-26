import React, { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-lab-grown",
    question: "What is a lab-grown diamond?",
    answer:
      "A lab-grown diamond is a diamond created through a controlled technological process replicating the high-pressure, high-temperature conditions under which diamonds form. It shares essentially the same crystal lattice structure, chemical composition, refractive index, and optical fire as a mined diamond; only its point of origin differs.",
  },
  {
    id: "faq-certification",
    question: "Are the diamonds certified?",
    answer:
      "Independent IGI or GIA laboratory documentation is supplied for all stones where formal certification has been verified and issued. Each qualifying certificate details the exact carat weight, color, clarity, and cut proportions. We invite you to inquire about the specific documentation accompanying any piece of interest.",
  },
  {
    id: "faq-shipping",
    question: "How does shipping and insurance work?",
    answer:
      "Delivery arrangements and transit insurance are arranged individually based on your piece, destination, value, and our confirmed security logistics. Exact carrier handling, insurance verification, and transit timelines are confirmed directly with you prior to dispatch.",
  },
  {
    id: "faq-resizing",
    question: "Can a ring be resized?",
    answer:
      "Whether a ring can be resized depends upon the specific setting architecture, metal choice, and whether accent stones span the shank (such as full eternity bands, which cannot be resized). For solitaires and bespoke rings, we encourage you to discuss sizing during your consultation to ensure optimal fit.",
  },
  {
    id: "faq-warranty",
    question: "What is the warranty and returns policy?",
    answer:
      "Warranty, repair parameters, and return terms are confirmed individually with each client in writing prior to purchase. As fine jewelry pieces and bespoke commissions involve individualized stone sourcing and sizing, all applicable terms and inspection guidelines are reviewed transparently before orders are finalized.",
  },
  {
    id: "faq-custom-design",
    question: "Can I request a custom design?",
    answer:
      "Yes. Clients are welcome to inquire about bespoke commissions. Bruno Scarselli conducts private consultations to review your design inspiration, preferred diamond silhouette, finger proportions, and metal selection in platinum or 18k gold to assess feasibility and craft an individualized proposal.",
  },
  {
    id: "faq-viewing-process",
    question: "How does a private viewing work?",
    answer:
      "You may submit a viewing request specifying your preferred date and time through our consultation form. The atelier will personally review the request and contact you to confirm room availability at 580 Fifth Avenue. Please note that submitting a request does not constitute a confirmed booking until acknowledged by the atelier. Evenings and weekends are by special arrangement.",
  },
];

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0].id]);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      className="py-12 min-[900px]:py-[88px] bg-[#FFFFFF] border-b border-[rgba(10,20,40,0.08)]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-[#8C6D46] font-medium mb-2">
            Atelier Inquiries
          </p>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#0B1320] leading-tight"
          >
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-px bg-[#C5A880] mx-auto mt-4" />
          <p className="mt-3 text-[15px] min-[900px]:text-[16px] text-[#4B5563] font-light max-w-lg mx-auto">
            Honest answers regarding diamond origins, certification standards, bespoke commissions,
            and private Fifth Avenue appointments.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div key={faq.id} className="rounded-card border border-[#E8E3DC] bg-white shadow-soft overflow-hidden transition-colors">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={faq.id}
                    className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                  >
                    <span className="font-serif text-lg min-[900px]:text-[18px] text-[#0B1320] font-normal leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`w-6 h-6 shrink-0 flex items-center justify-center text-xs text-[#8C6D46] transition-transform duration-200 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={faq.id}
                  role="region"
                  aria-labelledby={faq.id}
                  hidden={!isOpen}
                  className={`px-6 sm:px-8 pb-6 pt-1 text-[15px] min-[900px]:text-[16px] text-[#4B5563] font-light leading-relaxed ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
