import React, { useEffect, useState, useRef } from "react";
import { Product, DiamondShape } from "../data/products";
import { siteConfig } from "../config/siteConfig";
import { toRelativeImagePath } from "../utils/imagePath";

interface ProductModalProps {
  product: Omit<Product, "internalNotes"> | null;
  onClose: () => void;
  onOpenBooking: (initialDetails?: { pieceName?: string; shape?: string }) => void;
  onToggleSave: (productId: string) => void;
  isSaved: boolean;
}

const RING_SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "Bespoke"];

const SHAPE_OPTIONS: { id: DiamondShape; label: string }[] = [
  { id: "round", label: "Round" },
  { id: "oval", label: "Oval" },
  { id: "emerald", label: "Emerald" },
  { id: "cushion", label: "Cushion" },
  { id: "radiant", label: "Radiant" },
  { id: "pear", label: "Pear" },
  { id: "marquise", label: "Marquise" },
  { id: "princess", label: "Princess" },
  { id: "asscher", label: "Asscher" },
];

const METAL_OPTIONS = [
  { name: "Platinum 950", color: "#E2E8F0", border: "#94A3B8" },
  { name: "18k Yellow Gold", color: "#FACC15", border: "#CA8A04" },
  { name: "18k White Gold", color: "#F1F5F9", border: "#CBD5E1" },
  { name: "18k Rose Gold", color: "#FCA5A5", border: "#F87171" },
];

const SIZE_GUIDE_ROWS = [
  { us: "US 4", mm: "14.9 mm", circ: "46.8 mm" },
  { us: "US 5", mm: "15.7 mm", circ: "49.3 mm" },
  { us: "US 6", mm: "16.5 mm", circ: "51.9 mm" },
  { us: "US 7", mm: "17.3 mm", circ: "54.4 mm" },
  { us: "US 8", mm: "18.1 mm", circ: "57.0 mm" },
  { us: "US 9", mm: "18.9 mm", circ: "59.5 mm" },
  { us: "US 10", mm: "19.8 mm", circ: "62.1 mm" },
];

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenBooking,
  onToggleSave,
  isSaved,
}) => {
  const [activeImage, setActiveImage] = useState<string>("");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>("6.5");
  const [selectedShape, setSelectedShape] = useState<DiamondShape>("oval");
  const [selectedMetal, setSelectedMetal] = useState<string>("Platinum 950");
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setIsZoomed(false);
      setSelectedSize("6.5");
      setSelectedShape(product.shape);
      setSelectedMetal(product.metal || "Platinum 950");
      setShowSizeGuide(false);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, isZoomed, onClose]);

  if (!product) return null;

  const priceDisplay =
    siteConfig.features.showPrices && product.price
      ? `${siteConfig.pricing.currencySymbol}${product.price.toLocaleString()}`
      : siteConfig.pricing.priceOnRequestText;

  const galleryImages =
    product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#0B1320]/85 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      ref={modalRef}
    >
      {/* Backdrop click area */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={() => {
          if (isZoomed) setIsZoomed(false);
          else onClose();
        }}
        aria-hidden="true"
      />

      {/* Main Modal Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white shadow-2xl border border-[#E8E3DC] rounded-modal my-auto overflow-hidden">
        {/* Top Dismiss Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-white text-[#141A24] hover:text-[#0B1320] border border-[#E8E3DC] transition-colors cursor-pointer"
          aria-label="Close product view"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[88vh] md:max-h-[85vh] overflow-y-auto">
          {/* Left: Gallery & Zoomable Visual (7 cols) */}
          <div className="md:col-span-7 bg-[#0B1320] flex flex-col justify-between p-3.5 sm:p-6">
            <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/5] max-h-[220px] sm:max-h-[320px] md:max-h-[58vh] w-full flex items-center justify-center overflow-hidden bg-[#0F172A] rounded-img">
              <img
                src={toRelativeImagePath(activeImage || product.image)}
                alt={product.altText || product.name}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onClick={() => setIsZoomed(!isZoomed)}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector(".modal-fallback")) {
                    const fallback = document.createElement("div");
                    fallback.className =
                      "modal-fallback absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5] border border-[#E8E3DC] rounded-img";
                    fallback.innerHTML = `
                      <span class="text-xs uppercase tracking-widest text-[#8C6D46] font-medium mb-1">Scarselli Atelier</span>
                      <span class="font-serif text-xl text-[#0B1320]">${product.name}</span>
                      <span class="text-xs text-[#6B7280] mt-2 capitalize">${product.shape} cut · ${product.metal}</span>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
                className={`w-full h-full max-h-[220px] sm:max-h-[320px] md:max-h-[58vh] object-contain sm:object-cover transition-transform duration-300 cursor-zoom-in ${
                  product.imagePosition || "object-center"
                } ${
                  isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 hover:scale-105"
                }`}
              />

              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 text-[11px] sm:text-[12px] tracking-wider uppercase font-medium bg-[#0B1320]/80 text-[#C5A880] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-pill border border-[#C5A880]/30 backdrop-blur-xs flex items-center gap-1.5 cursor-pointer"
                aria-label={isZoomed ? "Zoom out image" : "Zoom in image"}
              >
                <span>{isZoomed ? "Zoom Out" : "Inspect"}</span>
                <span aria-hidden="true">{isZoomed ? "−" : "+"}</span>
              </button>
            </div>

            {galleryImages.length > 1 && (
              <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1">
                {galleryImages.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveImage(imgSrc);
                      setIsZoomed(false);
                    }}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 border overflow-hidden rounded-img transition-all cursor-pointer ${
                      activeImage === imgSrc
                        ? "border-[#C5A880] ring-1 ring-[#C5A880]"
                        : "border-slate-700 opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`View image thumbnail ${idx + 1}`}
                  >
                    <img
                      src={toRelativeImagePath(imgSrc)}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-800 text-[11px] sm:text-[12px] text-slate-300 flex items-center justify-between">
              <span>Verified Atelier Specimen</span>
              <span>100% Certified Lab-Grown</span>
            </div>
          </div>

          {/* Right: Specifications & Direct Actions (5 cols) */}
          <div className="md:col-span-5 p-4 sm:p-6 lg:p-7 flex flex-col justify-between bg-white space-y-4">
            <div>
              {/* Category & Metal */}
              <div className="flex items-center gap-2 text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#8C6D46] font-medium mb-1">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span>{selectedMetal}</span>
              </div>

              {/* Title */}
              <h2
                id="product-modal-title"
                className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#0B1320] font-normal leading-tight"
              >
                {product.name}
              </h2>

              {/* Price Baseline */}
              <div className="mt-1.5 text-[13px] sm:text-[14px] uppercase tracking-wider text-[#141A24] font-medium">
                {priceDisplay}
              </div>

              {/* Detailed Description */}
              <p className="mt-2 text-[13px] sm:text-[14px] text-[#4B5563] font-light leading-relaxed">
                {product.detailedDescription}
              </p>

              {/* 1. Ring Size Selection & Size Guide */}
              <div className="mt-4 pt-3 border-t border-[#F0EBE5]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] sm:text-[12px] uppercase tracking-wider text-[#141A24] font-medium">
                    Ring Size: <span className="text-[#8C6D46] font-normal">{selectedSize === "Bespoke" ? "Bespoke Fitting" : `US ${selectedSize}`}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[11px] uppercase tracking-wider text-[#8C6D46] hover:text-[#0B1320] font-medium underline flex items-center gap-1 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{showSizeGuide ? "Hide Guide" : "Size Guide"}</span>
                  </button>
                </div>

                {/* Collapsible Size Guide Table */}
                {showSizeGuide && (
                  <div className="mb-2.5 p-2.5 bg-[#FAF8F5] border border-[#E8E3DC] rounded-card text-[11px] text-[#4a4f5c]">
                    <div className="font-medium text-[#0B1320] uppercase tracking-wider text-[10px] mb-1 flex justify-between">
                      <span>US Size</span>
                      <span>Diameter</span>
                      <span>Circumference</span>
                    </div>
                    <div className="divide-y divide-[#E8E3DC] max-h-32 overflow-y-auto">
                      {SIZE_GUIDE_ROWS.map((row) => (
                        <div key={row.us} className="py-0.5 flex justify-between font-mono text-[10.5px]">
                          <span className="font-sans font-medium text-[#0B1320]">{row.us}</span>
                          <span>{row.mm}</span>
                          <span>{row.circ}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-1.5 text-[10px] leading-snug text-[#6B7280] italic border-t border-[#E8E3DC] pt-1">
                      Complimentary physical ring sizer kit available upon request. Includes 1 free atelier resizing.
                    </p>
                  </div>
                )}

                {/* Ring Sizes Grid/Scroll */}
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {RING_SIZES.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`h-7 px-2.5 text-[11px] rounded-pill font-medium transition-all cursor-pointer ${
                        selectedSize === sz
                          ? "bg-[#0B1320] text-white shadow-xs"
                          : "bg-[#FAF8F5] text-[#141A24] border border-[#E8E3DC] hover:border-[#0B1320]"
                      }`}
                    >
                      {sz === "Bespoke" ? "Bespoke" : `US ${sz}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Diamond Silhouette / Shapes Selector */}
              <div className="mt-3.5 pt-3 border-t border-[#F0EBE5]">
                <div className="text-[11px] sm:text-[12px] uppercase tracking-wider text-[#141A24] font-medium mb-1.5">
                  Silhouette / Shape: <span className="text-[#8C6D46] font-normal capitalize">{selectedShape}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SHAPE_OPTIONS.map((shp) => (
                    <button
                      key={shp.id}
                      type="button"
                      onClick={() => setSelectedShape(shp.id)}
                      className={`h-7 px-2.5 text-[11px] rounded-pill capitalize font-medium transition-all cursor-pointer ${
                        selectedShape.toLowerCase() === shp.id.toLowerCase()
                          ? "bg-[#0B1320] text-white shadow-xs"
                          : "bg-[#FAF8F5] text-[#141A24] border border-[#E8E3DC] hover:border-[#0B1320]"
                      }`}
                    >
                      {shp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Metal & Color Options */}
              <div className="mt-3.5 pt-3 border-t border-[#F0EBE5]">
                <div className="text-[11px] sm:text-[12px] uppercase tracking-wider text-[#141A24] font-medium mb-1.5">
                  Available Metal / Color: <span className="text-[#8C6D46] font-normal">{selectedMetal}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {METAL_OPTIONS.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => setSelectedMetal(m.name)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-pill border text-[11px] transition-all text-left cursor-pointer ${
                        selectedMetal === m.name
                          ? "bg-[#FAF8F5] border-[#0B1320] text-[#0B1320] font-medium shadow-xs ring-1 ring-[#0B1320]"
                          : "bg-white border-[#E8E3DC] text-[#4B5563] hover:border-[#8C6D46]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: m.color, border: `1px solid ${m.border}` }}
                        aria-hidden="true"
                      />
                      <span className="truncate">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirmed Specifications Table */}
              <div className="mt-4 border-t border-[#F0EBE5] pt-3">
                <h3 className="text-[11px] sm:text-[12px] uppercase tracking-wider text-[#8C6D46] font-medium mb-2">
                  Confirmed Specifications
                </h3>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px] sm:text-[13px]">
                  <div>
                    <dt className="text-[#6B7280]">Stone</dt>
                    <dd className="font-medium text-[#141A24]">{product.stone}</dd>
                  </div>
                  <div>
                    <dt className="text-[#6B7280]">Silhouette</dt>
                    <dd className="font-medium text-[#141A24] capitalize">{selectedShape}</dd>
                  </div>
                  {product.carat && (
                    <div>
                      <dt className="text-[#6B7280]">Carat Weight</dt>
                      <dd className="font-medium text-[#141A24]">{product.carat.toFixed(2)} ct</dd>
                    </div>
                  )}
                  {product.color && product.clarity && (
                    <div>
                      <dt className="text-[#6B7280]">Color & Clarity</dt>
                      <dd className="font-medium text-[#141A24]">
                        {product.color} / {product.clarity}
                      </dd>
                    </div>
                  )}
                  {product.cut && (
                    <div>
                      <dt className="text-[#6B7280]">Cut Grade</dt>
                      <dd className="font-medium text-[#141A24]">{product.cut}</dd>
                    </div>
                  )}
                  {product.certificateLab && (
                    <div>
                      <dt className="text-[#6B7280]">Report</dt>
                      <dd className="font-medium text-[#141A24]">{product.certificateLab} Verified</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-[#6B7280]">Selected Metal</dt>
                    <dd className="font-medium text-[#141A24]">{selectedMetal}</dd>
                  </div>
                  <div>
                    <dt className="text-[#6B7280]">Location</dt>
                    <dd className="font-medium text-[#141A24]">580 Fifth Ave, NYC</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#E8E3DC] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking({
                    pieceName: `${product.name} (${selectedMetal}, Size: ${selectedSize})`,
                    shape: selectedShape,
                  });
                }}
                className="w-full h-11 px-6 flex items-center justify-center text-[12px] sm:text-[13px] uppercase tracking-[0.16em] font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] transition-colors rounded-pill cursor-pointer"
              >
                Book a Private Viewing
              </button>

              <button
                type="button"
                onClick={() => onToggleSave(product.id)}
                className={`w-full h-10 px-6 flex items-center justify-center text-[11px] sm:text-[12px] uppercase tracking-[0.14em] border transition-colors rounded-pill cursor-pointer ${
                  isSaved
                    ? "bg-[#FAF8F5] border-[#0B1320] text-[#0B1320] font-medium"
                    : "border-[#D5CEBF] text-[#141A24] hover:border-[#0B1320]"
                }`}
              >
                {isSaved ? "★ In Your Private Consultation List" : "☆ Save to Consultation List"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
