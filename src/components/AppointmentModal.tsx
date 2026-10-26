import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: {
    pieceName?: string;
    shape?: string;
  };
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialDetails,
}) => {
  const [consultationType, setConsultationType] = useState<"in_person" | "virtual">("in_person");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeWindow, setTimeWindow] = useState("afternoon");
  const [pieceInterest, setPieceInterest] = useState(initialDetails?.pieceName || "");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialDetails?.pieceName) {
      setPieceInterest(initialDetails.pieceName);
    } else if (initialDetails?.shape) {
      setPieceInterest(`Bespoke ${initialDetails.shape.toUpperCase()} Cut Commission`);
    }
  }, [initialDetails]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1320]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl bg-white border border-[#E8E3DC] rounded-modal shadow-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#6B7280] hover:text-[#0B1320] border border-[#E8E3DC] rounded-full"
          aria-label="Close appointment modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center max-w-md mx-auto mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-medium mb-2">
                Private Viewing Request
              </p>
              <h2 id="appointment-title" className="font-serif text-2xl sm:text-3xl text-[#0B1320] font-normal">
                Schedule a Consultation
              </h2>
              <p className="mt-2 text-xs text-[#6B7280] font-light">
                580 Fifth Avenue, Suite 821, New York · Strictly by Private Appointment
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              {/* Consultation Type Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#141A24] font-medium mb-2">
                  Consultation Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType("in_person")}
                    className={`p-3 text-left border rounded-card transition-all ${
                      consultationType === "in_person"
                        ? "border-[#0B1320] bg-[#FAF8F5] text-[#0B1320] ring-1 ring-[#0B1320]"
                        : "border-[#E8E3DC] text-[#6B7280] hover:border-[#C5A880]"
                    }`}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wider">
                      Atelier Viewing (NYC)
                    </span>
                    <span className="text-[11px] text-[#6B7280]">
                      580 Fifth Avenue, Suite 821
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultationType("virtual")}
                    className={`p-3 text-left border rounded-card transition-all ${
                      consultationType === "virtual"
                        ? "border-[#0B1320] bg-[#FAF8F5] text-[#0B1320] ring-1 ring-[#0B1320]"
                        : "border-[#E8E3DC] text-[#6B7280] hover:border-[#C5A880]"
                    }`}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wider">
                      Virtual Consultation
                    </span>
                    <span className="text-[11px] text-[#6B7280]">
                      High-Definition Diamond Review
                    </span>
                  </button>
                </div>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-[#141A24] font-medium mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-sm text-[#141A24]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#141A24] font-medium mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-sm text-[#141A24]"
                  />
                </div>
              </div>

              {/* Phone & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#141A24] font-medium mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-sm text-[#141A24]"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-xs uppercase tracking-wider text-[#141A24] font-medium mb-1.5">
                    Preferred Viewing Date (Optional)
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    placeholder="YYYY-MM-DD"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-sm text-[#141A24] cursor-pointer"
                  />
                </div>
              </div>

              {/* Time Window */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#141A24] font-medium mb-1.5">
                  Preferred Time Window
                </label>
                <select
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-sm text-[#141A24]"
                >
                  <option value="morning">Morning (10:00 AM – 1:00 PM)</option>
                  <option value="afternoon">Afternoon (1:00 PM – 4:00 PM)</option>
                  <option value="late_afternoon">Late Afternoon (4:00 PM – 6:00 PM)</option>
                  <option value="special">Evening or Weekend (Special Arrangement)</option>
                </select>
              </div>

              {/* Piece of Interest */}
              <div>
                <label htmlFor="piece" className="block text-xs uppercase tracking-wider text-[#141A24] font-medium mb-1.5">
                  Piece or Diamond Requirement
                </label>
                <input
                  id="piece"
                  type="text"
                  value={pieceInterest}
                  onChange={(e) => setPieceInterest(e.target.value)}
                  placeholder="e.g. The Fifth Avenue Emerald Solitaire or 3ct Oval Type IIa"
                  className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-sm text-[#141A24]"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-xs uppercase tracking-wider text-[#141A24] font-medium mb-1.5">
                  Specific Requests or Questions
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details on target budget ($10,000–$100,000), diamond proportions, metal preference, or timeline..."
                  className="w-full p-3 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-sm text-[#141A24]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full h-12 px-7 flex items-center justify-center text-xs uppercase tracking-[0.16em] font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] transition-colors rounded-pill"
                >
                  Confirm Viewing Request
                </button>
                <p className="mt-2 text-[11px] text-center text-[#6B7280]">
                  Bruno Scarselli personally confirms all private atelier viewings.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center max-w-md mx-auto space-y-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF8F5] border border-[#C5A880] flex items-center justify-center text-[#8C6D46] text-xl">
              ✓
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0B1320]">
              Viewing Request Received
            </h2>
            <p className="text-sm text-[#4B5563] font-light leading-relaxed">
              Thank you, <strong className="font-medium text-[#0B1320]">{fullName}</strong>. Your
              request for an appointment regarding{" "}
              <strong className="font-medium text-[#0B1320]">{pieceInterest || "a private diamond consultation"}</strong>{" "}
              has been recorded.
            </p>

            <div className="p-4 bg-[#FAF8F5] border border-[#E8E3DC] rounded-card text-xs text-[#5A6475] space-y-2 text-left">
              <p>
                <strong>Atelier:</strong> 580 Fifth Avenue, Suite 821, New York
              </p>
              <p>
                <strong>Format:</strong>{" "}
                {consultationType === "in_person"
                  ? "In-Person Atelier Viewing (NYC)"
                  : "Private Virtual Consultation"}
              </p>
              {preferredDate && (
                <p>
                  <strong>Requested Date:</strong> {preferredDate}
                </p>
              )}
            </div>

            {/* Direct Instant Contact */}
            <div className="pt-2 border-t border-[#F0EBE5] space-y-3">
              <p className="text-xs text-[#6B7280]">
                Need immediate coordination or same-week confirmation?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${siteConfig.brand.contact.whatsappRaw}?text=${encodeURIComponent(
                    `Hello Bruno, I have submitted a private viewing request for ${
                      pieceInterest || "a diamond consultation"
                    } on ${preferredDate || "an upcoming date"}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-11 px-7 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-medium text-white bg-[#1E293B] hover:bg-[#0B1320] transition-colors rounded-pill"
                >
                  <span>Direct WhatsApp</span>
                </a>
                <a
                  href={`tel:${siteConfig.brand.contact.phoneRaw}`}
                  className="w-full sm:w-auto h-11 px-7 inline-flex items-center justify-center text-xs uppercase tracking-wider font-medium text-[#0B1320] border border-[#D5CEBF] hover:border-[#0B1320] transition-colors rounded-pill"
                >
                  Call {siteConfig.brand.contact.phone}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs uppercase tracking-wider text-[#6B7280] hover:text-[#0B1320] underline pt-4"
            >
              Close and Return to Atelier
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
