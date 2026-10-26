import React, { useState, useEffect } from "react";
import { siteConfig, CONTACT } from "../config/siteConfig";

interface ContactSectionProps {
  initialDetails?: {
    pieceName?: string;
    shape?: string;
    savedPieces?: string;
  };
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialDetails }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiryType, setEnquiryType] = useState("Private Viewing");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Afternoon (1:00 PM – 4:00 PM)");
  const [pieceInterest, setPieceInterest] = useState("");
  const [savedPieces, setSavedPieces] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync initialDetails if provided
  useEffect(() => {
    if (initialDetails?.pieceName) {
      setPieceInterest(initialDetails.pieceName);
      setEnquiryType("Engagement Ring");
    }
    if (initialDetails?.savedPieces) {
      setSavedPieces(initialDetails.savedPieces);
      setEnquiryType("Private Viewing");
    }
    if (initialDetails?.shape) {
      setPieceInterest(`Bespoke ${initialDetails.shape.toUpperCase()} Cut Commission`);
      setEnquiryType("Bespoke Commission");
    }
  }, [initialDetails]);

  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("580 Fifth Avenue Suite 821 New York NY 10017 USA");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!consent) {
      setSubmitError("Please confirm your consent to be contacted regarding this inquiry.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload: Record<string, string> = {
        "form-name": "scarselli-enquiry",
        name: fullName,
        email: email,
        phone: phone || "Not provided",
        enquiryType: enquiryType,
        preferredDate: preferredDate || "Flexible",
        preferredTime: preferredTime,
        pieceInterest: pieceInterest || "General Atelier Consultation",
        savedPieces: savedPieces || "None",
        message: message,
        consent: consent ? "yes" : "no",
      };

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formPayload).toString(),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(
          "Form submission endpoint is active upon deployment to Netlify. For immediate coordination with Bruno Scarselli, please use direct WhatsApp or call below."
        );
      }
    } catch {
      setSubmitError(
        "Network connection interrupted. Your details remain preserved in the form below; you can also reach Bruno directly via WhatsApp or phone."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setConsent(false);
  };

  return (
    <section
      id="contact"
      className="py-12 min-[900px]:py-[88px] bg-[#FAF8F5] border-b border-[rgba(10,20,40,0.08)]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-[#8C6D46] font-medium mb-2">
            Atelier Consultation
          </p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#0B1320] leading-tight"
          >
            Arrange a Private Appointment
          </h2>
          <div className="w-12 h-px bg-[#C5A880] mx-auto mt-4" />
          <p className="mt-3 text-[15px] lg:text-[16px] text-[#4B5563] font-light max-w-lg mx-auto leading-relaxed">
            Visits are strictly private and conducted by appointment at our Fifth Avenue suite or via
            virtual consultation. Submitting this form is an appointment request subject to atelier confirmation.
          </p>
        </div>

        {/* 2-Column Coordinates & Form (Consistent 24px gap on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-start">
          {/* Left Column: Coordinates & Real Google Map Embed (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-[#E8E3DC] rounded-card shadow-soft overflow-hidden space-y-5">
              <div>
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#8C6D46] font-medium block mb-1">
                  Atelier Address
                </span>
                <p className="font-serif text-2xl text-[#0B1320]">
                  {siteConfig.brand.name}
                </p>
                <p className="text-[15px] text-[#3B4353] mt-1 leading-relaxed">
                  {siteConfig.brand.address.street}, {siteConfig.brand.address.suite} <br />
                  {siteConfig.brand.address.city}, {siteConfig.brand.address.state}{" "}
                  {siteConfig.brand.address.zip}, USA
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E3DC]">
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#8C6D46] font-medium block mb-2">
                  Direct Inquiries & Coordinates
                </span>
                <p className="text-[15px] font-medium text-[#141A24]">
                  Phone:{" "}
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="text-[#0B1320] hover:text-[#8C6D46] underline decoration-slate-300"
                  >
                    {siteConfig.brand.contact.phone}
                  </a>
                </p>
                <p className="text-[15px] font-medium text-[#141A24] mt-1">
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-[#0B1320] hover:text-[#8C6D46] underline decoration-slate-300"
                  >
                    {CONTACT.email}
                  </a>
                </p>
                <p className="text-[15px] font-medium text-[#141A24] mt-1">
                  WhatsApp:{" "}
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0B1320] hover:text-[#8C6D46] underline decoration-slate-300"
                  >
                    {siteConfig.brand.contact.whatsapp}
                  </a>
                </p>

                {/* 36px Round Outlined Social & Contact Buttons */}
                <div className="mt-4 pt-3 border-t border-[#E8E3DC] flex items-center gap-2.5">
                  {CONTACT.phone && (
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="w-9 h-9 rounded-full border border-[#D5CEBF] hover:border-[#0B1320] text-[#141A24] hover:text-[#0B1320] inline-flex items-center justify-center transition-colors"
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
                      className="w-9 h-9 rounded-full border border-[#D5CEBF] hover:border-[#0B1320] text-[#141A24] hover:text-[#0B1320] inline-flex items-center justify-center transition-colors"
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
                      className="w-9 h-9 rounded-full border border-[#D5CEBF] hover:border-[#0B1320] text-[#141A24] hover:text-[#0B1320] inline-flex items-center justify-center transition-colors"
                      title="Email Bruno Scarselli"
                      aria-label="Email Bruno Scarselli"
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
                      className="w-9 h-9 rounded-full border border-[#D5CEBF] hover:border-[#0B1320] text-[#141A24] hover:text-[#0B1320] inline-flex items-center justify-center transition-colors"
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
                      className="w-9 h-9 rounded-full border border-[#D5CEBF] hover:border-[#0B1320] text-[#141A24] hover:text-[#0B1320] inline-flex items-center justify-center transition-colors"
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

              <div className="pt-4 border-t border-[#E8E3DC]">
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#8C6D46] font-medium block mb-1">
                  Atelier Hours
                </span>
                <p className="text-[14px] sm:text-[15px] text-[#3B4353] leading-relaxed">
                  <strong className="text-[#141A24] font-medium">Regular:</strong>{" "}
                  {siteConfig.brand.hours.regular}
                </p>
                <p className="text-[13px] text-[#6B7280] italic mt-0.5">
                  {siteConfig.brand.hours.extended}
                </p>
              </div>
            </div>

            {/* Real Google Map Embed (Fixed Height 320px, Loaded Lazily, 580 Fifth Avenue, Suite 821, NY) */}
            <div className="border border-[#E8E3DC] bg-[#FAF8F5] rounded-card shadow-soft overflow-hidden">
              <div className="h-[320px] w-full relative">
                <iframe
                  title="Scarselli Atelier Location Map"
                  src="https://maps.google.com/maps?q=580+Fifth+Avenue,+Suite+821,+New+York,+NY+10017&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white border-t border-[#E8E3DC]">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 px-7 flex items-center justify-center text-[12px] sm:text-[13px] uppercase tracking-wider font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] transition-colors rounded-pill"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Working Netlify Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 md:p-10 border border-[#E8E3DC] rounded-card shadow-soft overflow-hidden">
            {!submitSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5 text-sm" noValidate>
                {/* Netlify Forms Required Hidden Inputs */}
                <input type="hidden" name="form-name" value="scarselli-enquiry" />
                <p className="hidden">
                  <label>
                    Don’t fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                {/* Section Subhead */}
                <div className="border-b border-[#E8E3DC] pb-4 mb-4">
                  <h3 className="font-serif text-2xl text-[#0B1320]">
                    Consultation & Viewing Inquiry
                  </h3>
                  <p className="text-[13px] text-[#6B7280] mt-1 font-light">
                    Fields marked with an asterisk (*) are required.
                  </p>
                </div>

                {/* Error Banner with aria-live */}
                {submitError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-4 bg-red-50 border border-red-200 rounded-card text-[13px] text-red-800 space-y-2"
                  >
                    <p className="font-medium">{submitError}</p>
                    <div className="flex items-center gap-4 pt-1">
                      <a
                        href={`https://wa.me/${siteConfig.brand.contact.whatsappRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-900 underline font-semibold text-[13px]"
                      >
                        WhatsApp Bruno Scarselli →
                      </a>
                      <a
                        href={`tel:${siteConfig.brand.contact.phoneRaw}`}
                        className="text-red-900 underline font-semibold text-[13px]"
                      >
                        Call +1 (917) 880-1797
                      </a>
                    </div>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-[12px] min-[900px]:text-[13px] uppercase tracking-wider text-[#141A24] font-medium mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="full-name"
                      name="name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Catherine Morgan"
                      className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-[15px] text-[#141A24]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[12px] min-[900px]:text-[13px] uppercase tracking-wider text-[#141A24] font-medium mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="catherine@example.com"
                      className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-[15px] text-[#141A24]"
                    />
                  </div>
                </div>

                {/* Phone & Enquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[12px] min-[900px]:text-[13px] uppercase tracking-wider text-[#141A24] font-medium mb-1.5"
                    >
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-[15px] text-[#141A24]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="enquiry-type"
                      className="block text-[12px] min-[900px]:text-[13px] uppercase tracking-wider text-[#141A24] font-medium mb-1.5"
                    >
                      Inquiry Category
                    </label>
                    <select
                      id="enquiry-type"
                      name="enquiryType"
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value)}
                      className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-[15px] text-[#141A24]"
                    >
                      <option value="Private Viewing">Private Atelier Viewing (NYC)</option>
                      <option value="Engagement Ring">Engagement Ring</option>
                      <option value="Wedding Band">Wedding Band</option>
                      <option value="Loose Diamond">Certified Loose Diamond</option>
                      <option value="Bespoke Commission">Bespoke Commission</option>
                      <option value="General Enquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Time Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="preferred-date"
                      className="block text-[12px] uppercase tracking-wider text-[#141A24] font-medium mb-1.5"
                    >
                      Preferred Viewing Date (Optional)
                    </label>
                    <input
                      id="preferred-date"
                      name="preferredDate"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      placeholder="YYYY-MM-DD"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-[15px] text-[#141A24] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="preferred-time"
                      className="block text-[12px] min-[900px]:text-[13px] uppercase tracking-wider text-[#141A24] font-medium mb-1.5"
                    >
                      Preferred Time Window
                    </label>
                    <select
                      id="preferred-time"
                      name="preferredTime"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full h-11 px-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-[15px] text-[#141A24]"
                    >
                      <option value="Morning (10:00 AM – 1:00 PM)">
                        Morning (10:00 AM – 1:00 PM)
                      </option>
                      <option value="Afternoon (1:00 PM – 4:00 PM)">
                        Afternoon (1:00 PM – 4:00 PM)
                      </option>
                      <option value="Late Afternoon (4:00 PM – 6:00 PM)">
                        Late Afternoon (4:00 PM – 6:00 PM)
                      </option>
                      <option value="Special Arrangement (Evening/Weekend)">
                        Evening or Weekend (Special Arrangement)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Piece of Interest / Saved pieces */}
                {(pieceInterest || savedPieces) && (
                  <div className="p-4 bg-white border border-[#D5CEBF] rounded-card space-y-2">
                    {pieceInterest && (
                      <div>
                        <label className="block text-[12px] min-[900px]:text-[13px] uppercase tracking-wider text-[#8C6D46] font-medium">
                          Referenced Piece
                        </label>
                        <input
                          type="text"
                          name="pieceInterest"
                          value={pieceInterest}
                          onChange={(e) => setPieceInterest(e.target.value)}
                          className="w-full mt-1 p-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-input text-[13px] font-medium text-[#0B1320]"
                        />
                      </div>
                    )}
                    {savedPieces && (
                      <div>
                        <label className="block text-[12px] min-[900px]:text-[13px] uppercase tracking-wider text-[#8C6D46] font-medium">
                          Saved Consultation Pieces
                        </label>
                        <input
                          type="text"
                          name="savedPieces"
                          value={savedPieces}
                          onChange={(e) => setSavedPieces(e.target.value)}
                          className="w-full mt-1 p-2 bg-[#FAF8F5] border border-[#E8E3DC] rounded-input text-[13px] text-[#0B1320]"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[12px] min-[900px]:text-[13px] uppercase tracking-wider text-[#141A24] font-medium mb-1.5"
                  >
                    Your Message or Design Requirements *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please mention target carat size, diamond shape preference, metal (Platinum or 18k Gold), or key dates..."
                    className="w-full p-3.5 bg-white border border-[#D5CEBF] rounded-input focus:outline-none focus:border-[#0B1320] text-[15px] text-[#141A24]"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="consent-checkbox"
                    name="consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#0B1320] border-[#D5CEBF] rounded focus:ring-[#C5A880]"
                  />
                  <label htmlFor="consent-checkbox" className="text-[13px] text-[#4B5563] leading-relaxed">
                    I consent to Scarselli contacting me by email or telephone solely regarding this
                    inquiry. Personal details are kept confidential and are never shared.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 px-7 flex items-center justify-center text-[12px] min-[900px]:text-[14px] uppercase tracking-[0.16em] font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-pill"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Request...</span>
                      </span>
                    ) : (
                      "Submit Consultation Request"
                    )}
                  </button>
                  <p className="mt-2 text-[12px] text-center text-[#6B7280]">
                    Bruno Scarselli personally reviews and acknowledges all private viewing requests.
                  </p>
                </div>
              </form>
            ) : (
              /* Success State */
              <div
                role="status"
                aria-live="polite"
                className="py-12 px-4 text-center max-w-md mx-auto space-y-5"
              >
                <div className="w-14 h-14 mx-auto rounded-full border border-[#C5A880] flex items-center justify-center text-[#8C6D46] text-2xl font-light">
                  ✓
                </div>
                <h3 className="font-serif text-3xl text-[#0B1320]">
                  Inquiry Received
                </h3>
                <p className="text-[15px] text-[#4B5563] font-light leading-relaxed">
                  Thank you, <strong className="font-medium text-[#0B1320]">{fullName}</strong>. Your
                  inquiry has been received by Scarselli. The atelier will personally review your
                  request and respond via email or phone to discuss stone availability and confirm an
                  appointment time.
                </p>

                <div className="p-4 bg-white border border-[#E8E3DC] rounded-card text-[13px] text-[#4B5563] space-y-1.5 text-left">
                  <p>
                    <strong className="text-[#0B1320]">Atelier Location:</strong> 580 Fifth Avenue,
                    Suite 821, New York, NY 10017
                  </p>
                  <p>
                    <strong className="text-[#0B1320]">Inquiry Subject:</strong> {enquiryType}
                  </p>
                  {preferredDate && (
                    <p>
                      <strong className="text-[#0B1320]">Requested Date:</strong> {preferredDate} (
                      {preferredTime})
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E8E3DC] space-y-3">
                  <p className="text-[13px] text-[#6B7280]">
                    Need immediate assistance or direct coordination?
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${siteConfig.brand.contact.whatsappRaw}?text=${encodeURIComponent(
                        `Hello Bruno, I have submitted an inquiry on the website regarding ${enquiryType}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto h-11 px-7 inline-flex items-center justify-center text-[12px] uppercase tracking-wider font-medium text-white bg-[#0B1320] hover:bg-[#1E293B] transition-colors rounded-pill"
                    >
                      WhatsApp Bruno Scarselli
                    </a>
                    <a
                      href={`tel:${siteConfig.brand.contact.phoneRaw}`}
                      className="w-full sm:w-auto h-11 px-7 inline-flex items-center justify-center text-[12px] uppercase tracking-wider font-medium text-[#0B1320] border border-[#D5CEBF] hover:border-[#0B1320] transition-colors rounded-pill"
                    >
                      Call {siteConfig.brand.contact.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="mt-6 text-[13px] uppercase tracking-wider text-[#6B7280] hover:text-[#0B1320] underline block mx-auto"
                >
                  Send another inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
