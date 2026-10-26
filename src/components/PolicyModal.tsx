import React, { useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

export type PolicyType =
  | "privacy"
  | "shipping"
  | "resizing"
  | "warranty"
  | "returns";

interface PolicyModalProps {
  policyType: PolicyType | null;
  onClose: () => void;
  onSelectPolicy: (type: PolicyType) => void;
}

const policyContents: Record<
  PolicyType,
  { title: string; subtitle: string; content: string[] }
> = {
  privacy: {
    title: "Privacy Policy",
    subtitle: "Atelier Client Data Confidentiality",
    content: [
      "Scarselli respects the complete confidentiality of every private client. We collect only the contact information you provide (name, email address, telephone number, and jewelry preferences) strictly for communicating regarding your private appointment or bespoke commission.",
      "We never sell, rent, or distribute personal information to external marketing agencies or third parties. Information is preserved exclusively for direct coordination with Bruno Scarselli.",
      "The final, legally certified privacy notice will be formally published upon client approval. For questions concerning personal records, contact the atelier at +1 (917) 880-1797.",
    ],
  },
  shipping: {
    title: "Shipping & Insurance",
    subtitle: "Secure Transit & Armored Delivery Protocols",
    content: [
      "All fine jewelry leaving our Fifth Avenue atelier is transported via specialized high-value carriers with comprehensive door-to-door insurance coverage.",
      "Because each commission involves specific valuation and destination requirements across the United States, exact shipping options, armored delivery timelines, and recipient signature verification terms are confirmed individually with each client prior to order completion.",
      "Detailed courier tracking and insurance verification documents are delivered directly to you upon dispatch.",
    ],
  },
  resizing: {
    title: "Resizing & Atelier Repairs",
    subtitle: "Maintenance & Fit Adjustments",
    content: [
      "Ring resizing feasibility depends on the specific mount architecture, metal choice, and whether pave or step-cut diamonds span the shank (such as full eternity bands, which cannot be resized).",
      "Solitaires and bespoke engagement rings are precision-measured during your private consultation. If a resizing adjustment is required after presentation, our atelier assesses the piece individually to preserve stone tension and structural symmetry.",
      "Specific repair timelines and workshop terms are reviewed transparently prior to purchase.",
    ],
  },
  warranty: {
    title: "Warranty & Lifetime Care",
    subtitle: "Craftsmanship Integrity & Inspection",
    content: [
      "Scarselli mounts are engineered and cast in solid 950 platinum and 18k gold to provide lasting durability. Each diamond is set under magnification to secure prongs and bezels.",
      "We offer complimentary prong tightening and ultrasonic cleaning evaluations during private appointments at our Fifth Avenue atelier.",
      "Formal warranty, insurance appraisal documentation, and ongoing maintenance coverage are provided in writing with each verified purchase.",
    ],
  },
  returns: {
    title: "Returns & Consultations",
    subtitle: "Transparent Purchase Policies",
    content: [
      "Because our pieces involve individualized diamond curation, custom sizing, and bespoke metalwork, all order terms, deposit structures, and inspection periods are detailed in writing before payment is accepted.",
      "We believe in complete transparency: no client is asked to finalize a commission without clear, mutually agreed terms.",
      "To review the terms for a specific ready piece or bespoke commission, please discuss directly with Bruno Scarselli during your private consultation.",
    ],
  },
};

export const PolicyModal: React.FC<PolicyModalProps> = ({
  policyType,
  onClose,
  onSelectPolicy,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (policyType) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [policyType, onClose]);

  if (!policyType) return null;

  const current = policyContents[policyType];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1320]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-dialog-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-3xl bg-white border border-[#E8E3DC] rounded-modal shadow-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#0B1320] border border-[#E8E3DC]"
          aria-label="Close policy dialog"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Policy Tab Bar */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-[#E8E3DC] mb-6">
          {(
            [
              { key: "privacy", label: "Privacy" },
              { key: "shipping", label: "Shipping & Insurance" },
              { key: "resizing", label: "Resizing" },
              { key: "warranty", label: "Warranty & Care" },
              { key: "returns", label: "Returns" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onSelectPolicy(tab.key)}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium rounded-pill transition-colors ${
                policyType === tab.key
                  ? "bg-[#0B1320] text-white"
                  : "bg-[#FAF8F5] text-[#5A6475] hover:text-[#0B1320]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-medium">
            {current.subtitle}
          </p>
          <h2 id="policy-dialog-title" className="font-serif text-3xl text-[#0B1320]">
            {current.title}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed pt-2">
            {current.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8E3DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#6B7280]">
              <span className="font-medium text-[#0B1320] block">
                Direct Atelier Inquiries
              </span>
              <span>580 Fifth Avenue, Suite 821, New York · {siteConfig.brand.contact.phone}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto h-10 px-7 text-xs uppercase tracking-wider font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] rounded-pill"
            >
              Close Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
