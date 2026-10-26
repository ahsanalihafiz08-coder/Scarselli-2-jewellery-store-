import React from "react";
import { Product, DiamondShape } from "../data/products";
import { siteConfig } from "../config/siteConfig";
import { ProductImage } from "./ProductImage";

interface FeaturedCollectionProps {
  products: Omit<Product, "internalNotes">[];
  selectedShape: DiamondShape | "all";
  onSelectShape: (shape: DiamondShape | "all") => void;
  onSelectProduct: (product: Omit<Product, "internalNotes">) => void;
  onToggleSave: (productId: string) => void;
  savedProductIds: string[];
  onOpenBooking: (initialDetails?: { pieceName?: string; shape?: string }) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  products,
  selectedShape,
  onSelectShape,
  onSelectProduct,
  onToggleSave,
  savedProductIds,
  onOpenBooking,
}) => {
  return (
    <section
      id="collection"
      className="py-12 min-[900px]:py-[88px] bg-[#FAF8F5] border-b border-[rgba(10,20,40,0.08)]"
      aria-labelledby="collection-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-[#8C6D46] font-medium mb-2">
              Atelier Signatures
            </p>
            <h2
              id="collection-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#0B1320]"
            >
              Curated Fine Pieces
            </h2>
          </div>

          <div className="flex items-center gap-4 text-[13px] lg:text-[14px] tracking-wider uppercase text-[#6B7280]">
            <span>
              {products.length} {products.length === 1 ? "Piece" : "Pieces"}{" "}
              {selectedShape !== "all" && `(${selectedShape})`}
            </span>
            {selectedShape !== "all" && (
              <button
                onClick={() => onSelectShape("all")}
                className="text-[#0B1320] underline hover:text-[#8C6D46] transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Product Grid: 3 cards per row from 900px, 4 cards per row from 1280px, 24px gap, 1 per row on mobile */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 min-[900px]:grid-cols-3 min-[1280px]:grid-cols-4 gap-6">
            {products.map((product) => {
              const isSaved = savedProductIds.includes(product.id);
              const priceDisplay =
                siteConfig.features.showPrices && product.price
                  ? `${siteConfig.pricing.currencySymbol}${product.price.toLocaleString()}`
                  : siteConfig.pricing.priceOnRequestText;

              return (
                <article
                  key={product.id}
                  className="group flex flex-col bg-white border border-[#E8E3DC] hover:border-[#C5A880] transition-all duration-300 relative rounded-card shadow-soft overflow-hidden w-full max-w-[480px] mx-auto min-[900px]:max-w-none"
                >
                  {/* Image Container: compact 4:3 max-h 200px on desktop to reduce card height */}
                  <div className="relative aspect-square min-[900px]:aspect-[4/3] max-h-[320px] min-[900px]:max-h-[200px] bg-[#0F172A] overflow-hidden rounded-t-card">
                    <ProductImage
                      src={product.image}
                      alt={product.altText || product.name}
                      name={product.name}
                      shape={product.shape}
                      metal={product.metal}
                      imagePosition={product.imagePosition}
                      className="w-full h-full object-cover object-center max-h-[320px] min-[900px]:max-h-[200px] group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Favorite / Save Control: round circle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(product.id);
                      }}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors backdrop-blur-xs cursor-pointer ${
                        isSaved
                          ? "bg-[#0B1320] text-[#C5A880]"
                          : "bg-white/85 text-[#141A24] hover:bg-white hover:text-[#0B1320]"
                      }`}
                      aria-label={isSaved ? "Remove from saved pieces" : "Save piece"}
                      title={isSaved ? "Saved" : "Save piece"}
                    >
                      <svg
                        className="w-4 h-4"
                        fill={isSaved ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Card Details: reduced compact padding, proportional typography */}
                  <div className="p-3.5 min-[900px]:p-3.5 min-[900px]:pb-3 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Category & Metal tags */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] tracking-wider uppercase text-[#8C6D46] font-medium mb-1 min-[900px]:min-h-[24px] min-[900px]:content-start">
                        <span className="px-2 py-0.5 rounded-pill bg-[#8C6D46]/10 shrink-0">{product.categoryLabel}</span>
                        <span aria-hidden="true" className="opacity-40 shrink-0">·</span>
                        <span>{product.metal}</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-serif text-[18px] min-[900px]:text-[17px] text-[#0B1320] font-normal leading-snug group-hover:text-[#8C6D46] transition-colors line-clamp-1 min-[900px]:line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Specifications Summary */}
                      <div className="mt-1 text-[12px] text-[#5A6475] font-light flex items-center gap-1.5 flex-wrap">
                        {product.carat && <span>{product.carat.toFixed(2)} Carat</span>}
                        {product.color && product.clarity && (
                          <>
                            <span aria-hidden="true" className="opacity-40">·</span>
                            <span>
                              {product.color} / {product.clarity}
                            </span>
                          </>
                        )}
                        {product.certificateLab && (
                          <>
                            <span aria-hidden="true" className="opacity-40">·</span>
                            <span>{product.certificateLab} Verified</span>
                          </>
                        )}
                      </div>

                      {/* Short Description: compact 2 lines */}
                      <p className="mt-1 text-[13px] leading-relaxed text-[#4a4f5c] line-clamp-2 font-light">
                        {product.shortDescription}
                      </p>
                    </div>

                    {/* Bottom Action & Price Baseline: seamless on mobile and desktop without wrapping */}
                    <div className="mt-2.5 pt-2 border-t border-[#E8E3DC] flex items-center justify-between gap-2 flex-nowrap min-w-0 w-full">
                      <span className="text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#141A24] font-medium whitespace-nowrap shrink-0">
                        {priceDisplay}
                      </span>

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="h-8 px-3 sm:px-3.5 text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-[#0B1320] font-medium hover:text-white hover:bg-[#0B1320] transition-all inline-flex items-center justify-center gap-1 rounded-pill border border-[#0B1320]/25 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Discover</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Bespoke Empty State */
          <div className="text-center py-12 px-6 bg-[#FAF8F5] border border-[#E8E3DC] rounded-card shadow-soft max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl text-[#0B1320] mb-2">
              Bespoke {selectedShape !== "all" ? selectedShape.toUpperCase() : "Diamond"} Commissions
            </h3>
            <p className="text-[15px] text-[#5A6475] leading-relaxed max-w-lg mx-auto mb-6 font-light">
              Ready inventory in this silhouette has been acquired or is being curated. Bruno Scarselli
              personally sources certified Type IIa stones tailored to your exact carat and cut
              specifications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onOpenBooking({ shape: selectedShape })}
                className="h-11 px-7 rounded-pill text-[12px] uppercase tracking-[0.14em] font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] transition-colors cursor-pointer shadow-soft"
              >
                Inquire About {selectedShape !== "all" ? selectedShape : "Bespoke"} Cuts
              </button>
              <button
                type="button"
                onClick={() => onSelectShape("all")}
                className="h-11 px-7 rounded-pill text-[12px] uppercase tracking-[0.14em] text-[#0B1320] border border-[#D5CEBF] hover:border-[#0B1320] transition-colors cursor-pointer"
              >
                View All Featured Pieces
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
