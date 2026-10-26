import React, { useEffect } from "react";
import { Product } from "../data/products";
import { siteConfig } from "../config/siteConfig";
import { ProductImage } from "./ProductImage";

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Omit<Product, "internalNotes">[];
  onRemoveSave: (productId: string) => void;
  onClearAll: () => void;
  onSelectProduct: (product: Omit<Product, "internalNotes">) => void;
  onOpenBooking: (initialDetails?: { pieceName?: string; shape?: string }) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedProducts,
  onRemoveSave,
  onClearAll,
  onSelectProduct,
  onOpenBooking,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleEnquireAboutAll = () => {
    const piecesList = savedProducts.map((p) => p.name).join("; ");
    onClose();
    onOpenBooking({ pieceName: `Saved Atelier Selections: ${piecesList}` });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1320]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl bg-white border border-[#E8E3DC] rounded-modal shadow-2xl max-h-[92vh] overflow-y-auto p-4 sm:p-7">
        {/* Top Header with exactly ONE Close (X) button at top-right */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E8E3DC]">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-medium block">
              Private Consultation List
            </span>
            <h2 id="saved-modal-title" className="font-serif text-xl sm:text-3xl text-[#0B1320] leading-tight">
              Saved Pieces ({savedProducts.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#141A24] hover:text-[#0B1320] border border-[#E8E3DC] hover:border-[#0B1320] transition-colors"
            aria-label="Close saved pieces dialog"
          >
            ✕
          </button>
        </div>

        {savedProducts.length > 0 ? (
          <div>
            {/* List of Saved Items */}
            <div className="my-3 max-h-[55vh] overflow-y-auto pr-1">
              {savedProducts.map((p, index) => (
                <div
                  key={p.id}
                  className={`py-4 ${
                    index !== 0 ? "border-t border-[#E8E3DC]" : ""
                  }`}
                >
                  {/* Top layout: Image left (88px wide, aspect 1/1, rounded 12px) and text right */}
                  <div
                    className="flex gap-3.5 sm:gap-4 items-start w-full cursor-pointer group"
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                  >
                    <div className="w-[88px] h-[88px] shrink-0 relative overflow-hidden bg-[#0F172A] border border-[#E8E3DC] rounded-img">
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        name={p.name}
                        shape={p.shape}
                        metal={p.metal}
                        className="w-full h-full object-cover rounded-img"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Name 18px on at most 2 lines */}
                      <h3 className="font-serif text-[18px] text-[#0B1320] group-hover:text-[#8C6D46] transition-colors leading-snug line-clamp-2">
                        {p.name}
                      </h3>

                      {/* One line "Platinum 950 · pear cut" at 13px */}
                      <p className="text-[13px] text-[#5A6475] mt-1 capitalize leading-tight truncate">
                        {p.metal} · {p.shape} cut
                      </p>

                      {/* "Price on request" at 14px on ONE line without wrapping */}
                      <div className="text-[14px] text-[#141A24] font-medium mt-1.5 uppercase tracking-wider whitespace-nowrap">
                        {siteConfig.features.showPrices && p.price
                          ? `$${p.price.toLocaleString()}`
                          : siteConfig.pricing.priceOnRequestText}
                      </div>
                    </div>
                  </div>

                  {/* Two buttons BELOW the text in one row of equal width: 44px height, 12px gap, 12px uppercase */}
                  <div className="mt-3 flex items-center gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenBooking({ pieceName: p.name, shape: p.shape });
                      }}
                      className="flex-1 h-[44px] px-7 flex items-center justify-center text-[12px] uppercase tracking-[0.12em] font-medium bg-[#0B1320] text-white hover:bg-[#1E293B] active:bg-[#04070D] transition-colors rounded-pill"
                    >
                      Book
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveSave(p.id)}
                      className="flex-1 h-[44px] px-7 flex items-center justify-center text-[12px] uppercase tracking-[0.12em] font-medium text-[#0B1320] hover:text-white bg-white hover:bg-[#0B1320] border border-[#0B1320] transition-colors rounded-pill"
                      aria-label={`Remove ${p.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Atelier Policy / Saved Note */}
            <p className="text-[12px] text-[#6B7280] italic bg-[#FAF8F5] p-3.5 border border-[#E8E3DC] rounded-card my-3.5 leading-relaxed">
              * Saving a piece bookmarks it for your private appointment discussion. It does not
              constitute a reservation or guarantee diamond stone availability until confirmed with
              Bruno Scarselli.
            </p>

            {/* Bottom Row: Clear All (14px) and Enquire Button (52px height, 13px text) */}
            <div className="pt-3.5 border-t border-[#E8E3DC] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClearAll}
                className="text-[14px] uppercase tracking-wider text-[#6B7280] hover:text-[#0B1320] underline transition-colors"
              >
                Clear all saved pieces
              </button>

              <button
                type="button"
                onClick={handleEnquireAboutAll}
                className="w-full sm:w-auto h-[52px] px-7 text-[13px] uppercase tracking-[0.12em] font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] transition-colors flex items-center justify-center text-center rounded-pill"
              >
                Enquire about all saved pieces
              </button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="py-12 text-center text-[#6B7280] space-y-4">
            <div className="w-10 h-10 mx-auto text-[#C5A880]">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-serif text-xl text-[#0B1320]">No Pieces Saved Yet</p>
              <p className="text-xs mt-1 text-[#6B7280] max-w-sm mx-auto font-light leading-relaxed">
                Click the heart on any piece in our collection to save it for your private
                consultation with Bruno Scarselli.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                const col = document.querySelector("#full-collection") || document.querySelector("#collection");
                col?.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-10 px-7 text-xs uppercase tracking-wider font-medium text-[#0B1320] bg-white border border-[#0B1320] hover:bg-[#0B1320] hover:text-white transition-colors rounded-pill"
            >
              Explore the Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
