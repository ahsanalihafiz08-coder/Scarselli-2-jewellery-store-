import React, { useState, useMemo } from "react";
import { Product, DiamondShape, ProductCategory } from "../data/products";
import { siteConfig } from "../config/siteConfig";
import { ProductImage } from "./ProductImage";

interface FullCollectionProps {
  products: Omit<Product, "internalNotes">[];
  onSelectProduct: (product: Omit<Product, "internalNotes">) => void;
  onToggleSave: (productId: string) => void;
  savedProductIds: string[];
  onOpenBooking: (initialDetails?: { pieceName?: string; shape?: string }) => void;
  selectedShape: DiamondShape | "all";
  onSelectShape: (shape: DiamondShape | "all") => void;
}

const categoryOptions: { key: ProductCategory | "all"; label: string }[] = [
  { key: "all", label: "All Categories" },
  { key: "rings", label: "Engagement Rings" },
  { key: "wedding_bands", label: "Wedding Bands" },
  { key: "earrings", label: "Earrings" },
  { key: "necklaces", label: "Necklaces" },
  { key: "bracelets", label: "Bracelets" },
  { key: "loose_diamonds", label: "Loose Diamonds" },
  { key: "bespoke", label: "Bespoke Commissions" },
];

const shapeOptions: { key: DiamondShape | "all"; label: string }[] = [
  { key: "all", label: "All Shapes" },
  { key: "round", label: "Round" },
  { key: "oval", label: "Oval" },
  { key: "emerald", label: "Emerald" },
  { key: "cushion", label: "Cushion" },
  { key: "radiant", label: "Radiant" },
  { key: "pear", label: "Pear" },
  { key: "asscher", label: "Asscher" },
  { key: "marquise", label: "Marquise" },
  { key: "princess", label: "Princess" },
];

const metalOptions: { key: string; label: string }[] = [
  { key: "all", label: "All Metals" },
  { key: "Platinum 950", label: "Platinum 950" },
  { key: "18k Yellow Gold", label: "18k Yellow Gold" },
  { key: "18k White Gold", label: "18k White Gold" },
  { key: "18k Rose Gold", label: "18k Rose Gold" },
];

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_INCREMENT = 12;

export const FullCollection: React.FC<FullCollectionProps> = ({
  products,
  onSelectProduct,
  onToggleSave,
  savedProductIds,
  onOpenBooking,
  selectedShape,
  onSelectShape,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [selectedMetal, setSelectedMetal] = useState<string>("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

  // Reset pagination whenever filters change
  const handleFilterChange = (type: "category" | "shape" | "metal", value: string) => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    if (type === "category") setSelectedCategory(value as ProductCategory | "all");
    if (type === "shape") onSelectShape(value as DiamondShape | "all");
    if (type === "metal") setSelectedMetal(value);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    onSelectShape("all");
    setSelectedMetal("all");
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  // Combine filters strictly across non-featured products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Shape filter
      if (selectedShape !== "all" && item.shape !== selectedShape) {
        return false;
      }
      // Metal filter
      if (selectedMetal !== "all") {
        const matchesPrimary = item.metal.includes(selectedMetal);
        const matchesOption = item.metalOptions?.some((opt) => opt.includes(selectedMetal));
        if (!matchesPrimary && !matchesOption) return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedShape, selectedMetal]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedShape !== "all" ? 1 : 0) +
    (selectedMetal !== "all" ? 1 : 0);

  return (
    <section
      id="full-collection"
      className="py-12 min-[900px]:py-[88px] bg-[#FFFFFF] border-b border-[rgba(10,20,40,0.08)]"
      aria-labelledby="main-collection-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-[#8C6D46] font-medium mb-2">
              Atelier Catalogue
            </p>
            <h2
              id="main-collection-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#0B1320]"
            >
              The Complete Collection
            </h2>
            <p className="text-[14px] lg:text-[15px] text-[#6B7280] mt-1 font-light">
              Additional verified pieces across our catalogue (no duplicates from above).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[13px] lg:text-[14px] uppercase tracking-wider text-[#6B7280]">
              Showing {visibleProducts.length} of {filteredProducts.length} additional pieces
            </span>

            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden h-10 px-5 rounded-pill text-[12px] uppercase tracking-wider font-medium text-[#0B1320] bg-white border border-[#D5CEBF] flex items-center gap-2 cursor-pointer shadow-soft"
              aria-expanded={isMobileFilterOpen}
              aria-controls="mobile-filter-drawer"
            >
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#0B1320] text-white text-[11px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Filter Bar */}
        <div className="hidden lg:block bg-[#FAF8F5] p-6 border border-[#E8E3DC] rounded-card mb-10 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Category Select */}
            <div>
              <label
                htmlFor="category-filter"
                className="block text-[12px] uppercase tracking-[0.14em] text-[#8C6D46] font-medium mb-2"
              >
                Jewellery Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input text-[13px] text-[#141A24] focus:outline-none focus:border-[#0B1320] cursor-pointer"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Shape Select */}
            <div>
              <label
                htmlFor="shape-filter"
                className="block text-[12px] uppercase tracking-[0.14em] text-[#8C6D46] font-medium mb-2"
              >
                Diamond Silhouette
              </label>
              <select
                id="shape-filter"
                value={selectedShape}
                onChange={(e) => handleFilterChange("shape", e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input text-[13px] text-[#141A24] focus:outline-none focus:border-[#0B1320] cursor-pointer"
              >
                {shapeOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Metal Select */}
            <div>
              <label
                htmlFor="metal-filter"
                className="block text-[12px] uppercase tracking-[0.14em] text-[#8C6D46] font-medium mb-2"
              >
                Precious Metal
              </label>
              <select
                id="metal-filter"
                value={selectedMetal}
                onChange={(e) => handleFilterChange("metal", e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input text-[13px] text-[#141A24] focus:outline-none focus:border-[#0B1320] cursor-pointer"
              >
                {metalOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Clear Row */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-[#F0EBE5] flex items-center justify-between text-[13px] text-[#6B7280]">
              <div className="flex items-center gap-3">
                <span className="font-medium text-[#141A24]">Active Filters:</span>
                {selectedCategory !== "all" && (
                  <span>Category: {selectedCategory.replace("_", " ")}</span>
                )}
                {selectedShape !== "all" && <span>Shape: {selectedShape}</span>}
                {selectedMetal !== "all" && <span>Metal: {selectedMetal}</span>}
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[#0B1320] hover:text-[#8C6D46] underline uppercase tracking-wider font-medium text-[12px] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div
            id="mobile-filter-drawer"
            className="lg:hidden bg-white p-5 border border-[#E8E3DC] rounded-card mb-8 shadow-soft space-y-4"
          >
            <div>
              <label className="block text-[12px] uppercase tracking-wider text-[#8C6D46] font-medium mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#D5CEBF] rounded-input text-[14px] text-[#141A24]"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-wider text-[#8C6D46] font-medium mb-1">
                Silhouette
              </label>
              <select
                value={selectedShape}
                onChange={(e) => handleFilterChange("shape", e.target.value)}
                className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#D5CEBF] rounded-input text-[14px] text-[#141A24]"
              >
                {shapeOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-wider text-[#8C6D46] font-medium mb-1">
                Precious Metal
              </label>
              <select
                value={selectedMetal}
                onChange={(e) => handleFilterChange("metal", e.target.value)}
                className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#D5CEBF] rounded-input text-[14px] text-[#141A24]"
              >
                {metalOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[12px] uppercase tracking-wider text-[#6B7280] underline cursor-pointer"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="h-10 px-6 rounded-pill text-[12px] uppercase tracking-wider font-medium text-white bg-[#0B1320] cursor-pointer shadow-soft"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        )}

        {/* Product Cards Grid: 3 cards per row from 900px, 4 cards per row from 1280px, 24px gap, 1 per row on mobile */}
        {visibleProducts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 min-[900px]:grid-cols-3 min-[1280px]:grid-cols-4 gap-6">
              {visibleProducts.map((product) => {
                const isSaved = savedProductIds.includes(product.id);
                const priceDisplay =
                  siteConfig.features.showPrices && product.price
                    ? `${siteConfig.pricing.currencySymbol}${product.price.toLocaleString()}`
                    : siteConfig.pricing.priceOnRequestText;

                return (
                  <article
                    key={product.id}
                    className="group flex flex-col bg-[#FAF8F5] border border-[#E8E3DC] hover:border-[#C5A880] transition-all duration-300 relative rounded-card shadow-soft overflow-hidden w-full max-w-[480px] mx-auto min-[900px]:max-w-none"
                  >
                    {/* Image Container with compact desktop height */}
                    <div className="relative aspect-square max-h-[280px] min-[900px]:aspect-[4/3] min-[900px]:max-h-[200px] bg-[#0F172A] overflow-hidden rounded-t-card">
                      <ProductImage
                        src={product.image}
                        alt={product.altText || product.name}
                        name={product.name}
                        shape={product.shape}
                        metal={product.metal}
                        imagePosition={product.imagePosition}
                        className="w-full h-full object-cover object-center max-h-[280px] min-[900px]:max-h-[200px] group-hover:scale-105 transition-transform duration-500 ease-out"
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

                    {/* Card Details: compact vertical height & padding */}
                    <div className="p-3.5 min-[900px]:p-3.5 min-[900px]:pb-3 flex flex-col flex-grow justify-between">
                      <div>
                        {/* Category & Metal: 11px/12px, clean fit */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-[12px] tracking-wider uppercase text-[#8C6D46] font-medium mb-1 min-[900px]:min-h-[24px]">
                          <span className="px-2 py-0.5 rounded-pill bg-[#8C6D46]/10 shrink-0">{product.categoryLabel}</span>
                          <span aria-hidden="true" className="opacity-40 shrink-0">·</span>
                          <span className="truncate">{product.metal}</span>
                        </div>

                        {/* Product Name */}
                        <h3 className="font-serif text-[17px] min-[900px]:text-[18px] text-[#0B1320] font-normal leading-snug group-hover:text-[#8C6D46] transition-colors line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Specifications */}
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

                        {/* Short Description */}
                        <p className="mt-1 text-[13px] leading-relaxed text-[#4a4f5c] line-clamp-2 font-light">
                          {product.shortDescription}
                        </p>
                      </div>

                      {/* Bottom Action & Price: nowrap, clean fit for mobile & desktop */}
                      <div className="mt-3 pt-2.5 border-t border-[#F0EBE5] flex items-center justify-between gap-2 flex-nowrap min-w-0 w-full">
                        <span className="text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#141A24] font-medium whitespace-nowrap shrink-0">
                          {priceDisplay}
                        </span>

                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-[#0B1320] font-medium hover:text-white hover:bg-[#0B1320] transition-all inline-flex items-center justify-center gap-1 h-8 px-3 sm:px-3.5 rounded-pill border border-[#0B1320]/25 cursor-pointer whitespace-nowrap shrink-0"
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

            {/* Load More Button: 48px height and 14px font on desktop */}
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_INCREMENT)}
                  className="h-11 min-[900px]:h-12 px-7 rounded-pill text-[12px] min-[900px]:text-[14px] uppercase tracking-[0.14em] font-medium text-[#0B1320] bg-white border border-[#0B1320] hover:bg-[#0B1320] hover:text-white transition-colors cursor-pointer shadow-soft"
                >
                  Load More Pieces ({filteredProducts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 px-6 bg-white border border-[#E8E3DC] max-w-xl mx-auto shadow-xs">
            <h3 className="font-serif text-2xl text-[#0B1320] mb-2">No Additional Pieces in Stock</h3>
            <p className="text-[15px] text-[#5A6475] leading-relaxed mb-6 font-light">
              We do not currently have an additional inventory piece matching that exact combination of
              category, silhouette, and metal. Bruno Scarselli personally sources stones and crafts
              bespoke mounts for your specific parameters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-10 px-5 text-[12px] uppercase tracking-wider text-[#0B1320] border border-[#D5CEBF] hover:border-[#0B1320]"
              >
                Reset All Filters
              </button>
              <button
                type="button"
                onClick={() =>
                  onOpenBooking({
                    shape: selectedShape !== "all" ? selectedShape : undefined,
                  })
                }
                className="h-10 px-5 text-[12px] uppercase tracking-wider font-medium text-white bg-[#0B1320] hover:bg-[#1E293B]"
              >
                Inquire Bespoke Commission
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
