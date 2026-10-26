import React, { useState, useMemo, useEffect } from "react";
import { siteConfig } from "./config/siteConfig";
import {
  DiamondShape,
  Product,
  getPublishedProducts,
  getFeaturedProducts,
  getNonFeaturedProducts,
} from "./data/products";
import {
  loadSavedProductIds,
  saveProductIds,
} from "./utils/favoritesStorage";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AtelierIntro } from "./components/AtelierIntro";
import { DiamondShapes } from "./components/DiamondShapes";
import { FeaturedCollection } from "./components/FeaturedCollection";
import { FullCollection } from "./components/FullCollection";
import { Craftsmanship } from "./components/Craftsmanship";
import { AboutFounder } from "./components/AboutFounder";
import { ReviewsTrust } from "./components/ReviewsTrust";
import { FAQ } from "./components/FAQ";
import { ContactSection } from "./components/ContactSection";
import { ProductModal } from "./components/ProductModal";
import { AppointmentModal } from "./components/AppointmentModal";
import { SavedModal } from "./components/SavedModal";
import { PolicyModal, PolicyType } from "./components/PolicyModal";
import { FloatingContact } from "./components/FloatingContact";
import { Footer } from "./components/Footer";

export default function App() {
  const [selectedShape, setSelectedShape] = useState<DiamondShape | "all">("all");
  const [selectedProduct, setSelectedProduct] = useState<Omit<Product, "internalNotes"> | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [bookingInitialDetails, setBookingInitialDetails] = useState<{
    pieceName?: string;
    shape?: string;
    savedPieces?: string;
  }>({});
  
  // Persistent saved favorites from localStorage
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => loadSavedProductIds());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync favorites changes to localStorage
  useEffect(() => {
    saveProductIds(savedProductIds);
  }, [savedProductIds]);

  // All published products (strictly sanitized, samples excluded per hard rules)
  const publishedProducts = useMemo(() => getPublishedProducts(), []);
  const featuredProducts = useMemo(() => getFeaturedProducts(), []);
  const nonFeaturedProducts = useMemo(() => getNonFeaturedProducts(), []);

  // Filtered featured products based on selected shape
  const filteredFeaturedProducts = useMemo(() => {
    if (selectedShape === "all") return featuredProducts;
    return featuredProducts.filter((p) => p.shape === selectedShape);
  }, [featuredProducts, selectedShape]);

  // Saved products objects
  const savedProducts = useMemo(() => {
    return publishedProducts.filter((p) => savedProductIds.includes(p.id));
  }, [publishedProducts, savedProductIds]);

  // Product counts per diamond shape across all verified products
  const productCountByShape = useMemo(() => {
    const counts: Record<DiamondShape | "all", number> = {
      all: publishedProducts.length,
      round: 0,
      oval: 0,
      emerald: 0,
      pear: 0,
      cushion: 0,
      radiant: 0,
      marquise: 0,
      princess: 0,
      asscher: 0,
    };
    for (const p of publishedProducts) {
      if (counts[p.shape] !== undefined) {
        counts[p.shape]++;
      }
    }
    return counts;
  }, [publishedProducts]);

  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) => {
      const exists = prev.includes(productId);
      const target = publishedProducts.find((p) => p.id === productId);
      const name = target ? target.name : "Piece";
      if (exists) {
        setToastMessage(`Removed "${name}" from saved pieces`);
        setTimeout(() => setToastMessage(null), 3000);
        return prev.filter((id) => id !== productId);
      } else {
        setToastMessage(`Saved "${name}" to your private consultation list`);
        setTimeout(() => setToastMessage(null), 3000);
        return [...prev, productId];
      }
    });
  };

  const handleClearAllSaved = () => {
    setSavedProductIds([]);
    setToastMessage("Cleared all saved pieces");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenBooking = (initialDetails?: {
    pieceName?: string;
    shape?: string;
    savedPieces?: string;
  }) => {
    setBookingInitialDetails(initialDetails || {});
    setIsBookingOpen(true);
  };

  const handleSelectShape = (shape: DiamondShape | "all") => {
    setSelectedShape(shape);
    const collectionEl = document.querySelector("#collection");
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAnyModalOpen =
    isBookingOpen ||
    isSavedModalOpen ||
    Boolean(selectedProduct) ||
    Boolean(activePolicy) ||
    isMobileMenuOpen;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141A24] flex flex-col font-sans overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#0B1320] text-white px-5 py-3 shadow-xl border border-[#C5A880]/40 text-xs tracking-wide flex items-center gap-3 transition-opacity duration-300"
        >
          <span className="text-[#C5A880]">✦</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: HEADER */}
      <Header
        onOpenBooking={handleOpenBooking}
        savedCount={savedProductIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onMenuToggle={setIsMobileMenuOpen}
      />

      <main className="flex-grow">
        {/* SECTION 2: CINEMATIC HERO */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* SECTION 3: ATELIER INTRODUCTION */}
        <AtelierIntro onOpenBooking={() => handleOpenBooking()} />

        {/* SECTION 4: DIAMOND SHAPES */}
        <DiamondShapes
          selectedShape={selectedShape}
          onSelectShape={handleSelectShape}
          productCountByShape={productCountByShape}
        />

        {/* SECTION 5: FEATURED PIECES */}
        <FeaturedCollection
          products={filteredFeaturedProducts}
          selectedShape={selectedShape}
          onSelectShape={setSelectedShape}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleSave={handleToggleSave}
          savedProductIds={savedProductIds}
          onOpenBooking={handleOpenBooking}
        />

        {/* SECTION 6: FULL COLLECTION WITH MULTI-FILTERING & PAGINATION (NO DUPLICATES) */}
        <FullCollection
          products={nonFeaturedProducts}
          selectedShape={selectedShape}
          onSelectShape={setSelectedShape}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleSave={handleToggleSave}
          savedProductIds={savedProductIds}
          onOpenBooking={handleOpenBooking}
        />

        {/* SECTION 9: CRAFTSMANSHIP / HOW IT IS MADE */}
        <Craftsmanship onOpenBooking={() => handleOpenBooking()} />

        {/* SECTION 10: ABOUT BRUNO SCARSELLI */}
        <AboutFounder onOpenBooking={() => handleOpenBooking()} />

        {/* SECTION 11: REVIEWS & TRUST */}
        <ReviewsTrust />

        {/* SECTION 12: FAQ ACCORDION */}
        <FAQ />

        {/* SECTION 13 & 14: CONTACT & NETLIFY ENQUIRY FORM */}
        <ContactSection initialDetails={bookingInitialDetails} />
      </main>

      {/* FOOTER */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />

      {/* FLOATING QUICK CONTACT (Yields automatically when modals open) */}
      <FloatingContact
        onOpenBooking={() => handleOpenBooking()}
        isAnyModalOpen={isAnyModalOpen}
      />

      {/* SECTION 7: PRODUCT DETAIL EXPERIENCE MODAL */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenBooking={handleOpenBooking}
        onToggleSave={handleToggleSave}
        isSaved={selectedProduct ? savedProductIds.includes(selectedProduct.id) : false}
      />

      {/* APPOINTMENT BOOKING MODAL */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDetails={bookingInitialDetails}
      />

      {/* SECTION 8: SAVED PIECES MODAL / DRAWER */}
      <SavedModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProducts={savedProducts}
        onRemoveSave={handleToggleSave}
        onClearAll={handleClearAllSaved}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onOpenBooking={handleOpenBooking}
      />

      {/* POLICY MODAL (Privacy, Shipping, Resizing, Warranty, Returns) */}
      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
        onSelectPolicy={(type) => setActivePolicy(type)}
      />
    </div>
  );
}
