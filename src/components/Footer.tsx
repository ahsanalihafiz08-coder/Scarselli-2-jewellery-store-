import React from "react";
import { siteConfig, CONTACT } from "../config/siteConfig";
import { PolicyType } from "./PolicyModal";

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPolicy: (policy: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenPolicy }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#0B1320] text-slate-300 border-t border-[#1F2937]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 min-[900px]:py-[88px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-6">
          {/* Brand & Atelier Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-3xl tracking-[0.16em] uppercase text-white block">
              {siteConfig.brand.name}
            </span>
            <p className="text-[12px] lg:text-[13px] uppercase tracking-[0.2em] text-[#C5A880] font-medium">
              Private Fine Diamond Atelier · New York
            </p>
            <p className="text-[15px] lg:text-[16px] text-slate-300 font-light leading-relaxed max-w-md">
              Specializing in certified lab-grown diamonds, bespoke engagement rings, and
              custom jewellery crafted in solid 950 platinum and 18k gold. Visits conducted
              by private appointment only.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="h-10 min-[900px]:h-12 px-7 text-[12px] min-[900px]:text-[14px] uppercase tracking-[0.14em] font-medium text-[#0B1320] bg-[#C5A880] hover:bg-[#D4B991] transition-colors rounded-pill"
              >
                Schedule Private Viewing
              </button>
            </div>
          </div>

          {/* Location & Appointment Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-[12px] lg:text-[13px] uppercase tracking-[0.2em] text-[#C5A880] font-medium">
              Atelier Address
            </h3>
            <p className="font-serif text-xl text-white">
              {siteConfig.brand.address.street}
            </p>
            <p className="text-[14px] lg:text-[14px] text-slate-300 leading-relaxed">
              {siteConfig.brand.address.suite} <br />
              {siteConfig.brand.address.city}, {siteConfig.brand.address.state}{" "}
              {siteConfig.brand.address.zip}, USA
            </p>
            <div className="pt-2 text-[13px] lg:text-[14px] text-slate-300 space-y-1">
              <p>
                <strong className="text-white">Hours:</strong> {siteConfig.brand.hours.regular}
              </p>
              <p className="italic text-slate-400">{siteConfig.brand.hours.extended}</p>
            </div>
          </div>

          {/* Direct Coordination & Facts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-[12px] uppercase tracking-[0.2em] text-[#C5A880] font-medium">
              Direct Inquiries
            </h3>
            <p className="text-[15px]">
              <span className="text-slate-400 block text-[12px]">Phone & WhatsApp:</span>
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-white hover:text-[#C5A880] font-medium transition-colors"
              >
                {siteConfig.brand.contact.phone}
              </a>
            </p>
            <p className="text-[15px]">
              <span className="text-slate-400 block text-[12px]">Direct Email:</span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-white hover:text-[#C5A880] font-medium transition-colors"
              >
                {CONTACT.email}
              </a>
            </p>
            <p className="text-[13px] text-slate-400">
              Founder: <span className="text-slate-200">{siteConfig.brand.founder}</span>
            </p>

            <div className="pt-3 border-t border-slate-800 text-[13px] text-slate-300">
              <p className="font-serif text-white text-base">
                {siteConfig.brand.reviews.rating.toFixed(1)} ★ Rating
              </p>
              <p className="text-[13px] text-slate-400">
                Based on {siteConfig.brand.reviews.verifiedCount} verified Google reviews
              </p>
            </div>

            {/* 36px Round Outlined Social & Contact Buttons (Only active channels in CONTACT) */}
            <div className="pt-2 flex items-center gap-2.5">
              {CONTACT.phone && (
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="w-9 h-9 rounded-full border border-slate-600 hover:border-[#C5A880] text-slate-300 hover:text-[#C5A880] inline-flex items-center justify-center transition-colors"
                  title="Call Atelier"
                  aria-label="Call Atelier"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              )}

              {CONTACT.whatsapp && (
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-slate-600 hover:border-[#C5A880] text-slate-300 hover:text-[#C5A880] inline-flex items-center justify-center transition-colors"
                  title="WhatsApp Bruno Scarselli"
                  aria-label="WhatsApp Bruno Scarselli"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              )}

              {CONTACT.email && (
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="w-9 h-9 rounded-full border border-slate-600 hover:border-[#C5A880] text-slate-300 hover:text-[#C5A880] inline-flex items-center justify-center transition-colors"
                  title="Email Atelier"
                  aria-label="Email Atelier"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}

              {CONTACT.instagram && (
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-slate-600 hover:border-[#C5A880] text-slate-300 hover:text-[#C5A880] inline-flex items-center justify-center transition-colors"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}

              {CONTACT.facebook && (
                <a
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-slate-600 hover:border-[#C5A880] text-slate-300 hover:text-[#C5A880] inline-flex items-center justify-center transition-colors"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Policy Navigation Strip */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[13px] text-slate-400">
          <nav className="flex flex-wrap items-center gap-6" aria-label="Atelier Policies">
            <button
              type="button"
              onClick={() => onOpenPolicy("privacy")}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicy("shipping")}
              className="hover:text-white transition-colors"
            >
              Shipping & Insurance
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicy("resizing")}
              className="hover:text-white transition-colors"
            >
              Resizing & Repairs
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicy("warranty")}
              className="hover:text-white transition-colors"
            >
              Warranty & Care
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicy("returns")}
              className="hover:text-white transition-colors"
            >
              Returns & Terms
            </button>
          </nav>

          <span className="text-[12px] text-slate-400">
            Terms confirmed in writing prior to purchase
          </span>
        </div>

        {/* Bottom Bar: Copyright & Diamond Notice */}
        <div className="mt-5 pt-5 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[13px] text-slate-400 gap-4">
          <p>© {currentYear} Scarselli. All rights reserved.</p>
          <p className="text-[12px] text-slate-400 text-center sm:text-right">
            580 Fifth Avenue, Suite 821, New York, NY 10017 · Certified Lab-Grown Diamonds
          </p>
        </div>
      </div>
    </footer>
  );
};
