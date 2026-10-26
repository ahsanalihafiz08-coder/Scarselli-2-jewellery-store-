import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

interface HeaderProps {
  onOpenBooking: (initialDetails?: { pieceName?: string; shape?: string }) => void;
  savedCount: number;
  onOpenSaved?: () => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  savedCount,
  onOpenSaved,
  onMenuToggle,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    onMenuToggle?.(isMenuOpen);
  }, [isMenuOpen, onMenuToggle]);

  // Track scroll threshold > 40px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Collection", href: "#collection" },
    { label: "Catalogue", href: "#full-collection" },
    { label: "Craftsmanship", href: "#craftsmanship" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isSolid = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[56px] lg:h-16 transition-all duration-300 ease-in-out ${
        isSolid
          ? "bg-[rgba(10,20,40,0.96)] backdrop-blur-sm border-b border-[#2A364F]/50 shadow-sm shadow-[#0B1320]/40"
          : "bg-[linear-gradient(to_bottom,rgba(10,20,40,0.5)_0px,rgba(10,20,40,0)_40px)] border-0 border-none shadow-none"
      }`}
      style={{
        backgroundColor: isSolid ? "rgba(10, 20, 40, 0.96)" : "transparent",
        borderBottom: isSolid ? undefined : "none",
        borderTop: "none",
        boxShadow: isSolid ? undefined : "none",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between gap-4 lg:gap-6 h-full">
          {/* 1. Logo "SCARSELLI" on the left */}
          <div className="flex items-center shrink-0">
            <a
              href="#"
              className="text-[18px] lg:text-[20px] font-serif tracking-[0.16em] sm:tracking-[0.18em] uppercase text-white hover:text-[#C5A880] transition-colors whitespace-nowrap"
              aria-label={`${siteConfig.brand.name} Fine Diamond Atelier`}
            >
              {siteConfig.brand.name}
            </a>
          </div>

          {/* 2. Centre: Nav links (Desktop 1024px+) */}
          <nav
            className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 text-[12px] tracking-[0.12em] uppercase text-slate-200"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#C5A880] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#C5A880] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 3. Right: "Book private viewing", Heart icon, Hamburger (mobile/tablet only) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Favourites Heart icon: ALWAYS visible on every screen size */}
            <button
              type="button"
              onClick={onOpenSaved}
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-slate-100 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#C5A880] shrink-0 transition-colors cursor-pointer"
              aria-label={savedCount > 0 ? `Saved pieces (${savedCount})` : "Saved pieces"}
              title="Saved pieces"
            >
              <svg
                className="w-6 h-6 text-slate-100 hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              {savedCount > 0 && (
                <span
                  className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-[#C5A880] text-[#0B1320] flex items-center justify-center leading-none pointer-events-none shadow-sm"
                  aria-label={`${savedCount} saved`}
                >
                  {savedCount}
                </span>
              )}
            </button>

            {/* "Book private viewing" button (Desktop 1024px+): fully rounded pill, padding 0 28px (px-7) */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden lg:inline-flex shrink-0 items-center justify-center h-10 px-7 rounded-pill text-[12px] uppercase tracking-[0.14em] font-medium text-[#0B1320] bg-[#C5A880] hover:bg-[#D4B991] active:bg-[#B39264] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880] whitespace-nowrap cursor-pointer shadow-soft"
            >
              Book private viewing
            </button>

            {/* Hamburger (Three lines) icon: ONLY visible below 1024px (hidden on desktop) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-slate-100 hover:text-white focus:outline-none focus:ring-1 focus:ring-[#C5A880] shrink-0 transition-colors cursor-pointer"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6 text-slate-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-slate-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Drawer Overlay & Panel (Closes on X, Escape, or backdrop click) */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[56px] lg:top-16 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu Panel */}
          <div
            className="fixed inset-x-0 top-[56px] lg:top-16 bg-[#0B1320] z-50 flex flex-col justify-between p-6 sm:p-8 border-t border-[#2A364F] rounded-b-modal max-h-[calc(100vh-56px)] lg:max-h-[calc(100vh-64px)] overflow-y-auto shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div className="flex flex-col space-y-6 pt-2 max-w-[640px] mx-auto w-full">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg font-serif tracking-[0.08em] text-slate-100 hover:text-[#C5A880] transition-colors py-2.5 px-3 rounded-card border-b border-[#2A364F]/40 hover:bg-white/5 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-[#C5A880]/60 text-sm">→</span>
                  </a>
                ))}
              </nav>

              {onOpenSaved && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenSaved();
                  }}
                  className="flex items-center justify-between text-sm uppercase tracking-wider text-[#C5A880] py-2.5 px-4 rounded-pill border border-[#C5A880]/30 hover:border-[#C5A880] bg-[#C5A880]/5 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-[#C5A880]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    Saved Pieces
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[#C5A880] text-[#0B1320] font-bold rounded-full">
                    {savedCount}
                  </span>
                </button>
              )}
            </div>

            <div className="flex flex-col space-y-4 pt-6 border-t border-[#2A364F] max-w-[640px] mx-auto w-full mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full h-12 px-7 rounded-pill flex items-center justify-center text-xs uppercase tracking-[0.14em] font-medium text-[#0B1320] bg-[#C5A880] hover:bg-[#D4B991] transition-colors cursor-pointer shadow-soft"
              >
                Book Private Viewing
              </button>

              <div className="text-center text-xs text-slate-400 space-y-1">
                <p className="font-serif italic text-slate-300">
                  {siteConfig.brand.address.full}
                </p>
                <p className="text-[11px] tracking-wide text-slate-400">
                  By Private Appointment Only
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
