import React, { useState } from "react";
import { toRelativeImagePath } from "../utils/imagePath";

interface SectionImageProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  aspectRatio?: "16/9" | "4/5" | "1/1";
  maxHeight?: string;
  className?: string;
}

export const SectionImage: React.FC<SectionImageProps> = ({
  src,
  alt,
  title,
  subtitle,
  aspectRatio = "16/9",
  maxHeight = "max-h-[60vh]",
  className = "",
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspectRatio === "16/9"
      ? "aspect-[16/9]"
      : aspectRatio === "4/5"
      ? "aspect-[4/5]"
      : "aspect-square";

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectClass} ${maxHeight} bg-[#FAF8F5] border border-[#E8E3DC] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D46] font-medium mb-1.5">
          Scarselli Atelier
        </span>
        <span className="font-serif text-lg sm:text-xl text-[#0B1320] font-normal leading-snug">
          {title}
        </span>
        {subtitle && (
          <span className="text-[12px] text-[#6B7280] mt-1.5 font-light">
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`w-full ${aspectClass} ${maxHeight} overflow-hidden bg-[#0F172A] border border-[#E8E3DC] ${className}`}
    >
      <img
        src={toRelativeImagePath(src)}
        alt={alt || title}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover object-center ${maxHeight}`}
      />
    </div>
  );
};
