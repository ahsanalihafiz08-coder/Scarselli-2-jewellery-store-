import React, { useState, useEffect, useRef } from "react";
import { CONTACT } from "../config/siteConfig";

interface FloatingContactProps {
  onOpenBooking: () => void;
  isAnyModalOpen?: boolean;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({
  onOpenBooking,
  isAnyModalOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on click / tap outside the panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, { passive: true });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // If any modal (product, saved, appointment, policy) is active, hide the floating button
  if (isAnyModalOpen) return null;

  return (
    <aside
      className="fixed bottom-5 right-5 z-40"
      aria-label="Direct atelier contact assistance"
    >
      {/* Compact quick flyout panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Atelier quick contact"
          className="relative mb-3 w-[210px] sm:w-[220px] bg-[#0B1320] border border-[#2A364F] rounded-card shadow-soft overflow-hidden p-3.5 text-white text-xs transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* Exactly ONE 32px outlined close (X) button at top-right corner */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full border border-slate-600 hover:border-[#C5A880] text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            aria-label="Close atelier quick contact"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Compact header with small address line */}
          <div className="pb-1.5 pr-8 border-b border-slate-800">
            <span className="font-serif text-[13px] tracking-wider uppercase text-[#C5A880] block font-normal leading-tight">
              Scarselli Atelier
            </span>
            <span className="text-[10px] text-slate-400 font-light block mt-0.5 leading-tight">
              580 Fifth Ave, Suite 821, NY
            </span>
          </div>

          {/* 3 icon-only buttons in one row (WhatsApp, Phone, Calendar), 48px outline */}
          <div className="pt-3 pb-1 flex items-center justify-center gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full border border-[#C5A880]/60 hover:border-[#C5A880] bg-[#1A263B] hover:bg-[#253552] flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880] shrink-0"
              aria-label="WhatsApp message"
              title="WhatsApp message"
            >
              <svg
                className="w-5 h-5 text-[#C5A880] group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>

            <a
              href={`tel:${CONTACT.phone}`}
              className="group w-12 h-12 rounded-full border border-[#C5A880]/60 hover:border-[#C5A880] bg-[#1A263B] hover:bg-[#253552] flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880] shrink-0"
              aria-label="Call atelier"
              title="Call atelier"
            >
              <svg
                className="w-5 h-5 text-[#C5A880] group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="group w-12 h-12 rounded-full border border-[#C5A880] bg-[#C5A880] hover:bg-[#D4B991] text-[#0B1320] flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880] shrink-0"
              aria-label="Schedule viewing"
              title="Schedule viewing"
            >
              <svg
                className="w-5 h-5 text-[#0B1320]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Single Floating Toggle Button (40px) — Hidden while panel is open so exactly one X exists */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#0B1320] text-[#C5A880] hover:text-white border border-[#C5A880]/50 shadow-soft transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          aria-label="Open atelier quick contact"
          aria-expanded={false}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}
    </aside>
  );
};
