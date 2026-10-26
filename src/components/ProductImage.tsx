import React, { useState } from "react";
import { toRelativeImagePath } from "../utils/imagePath";

interface ProductImageProps {
  src: string;
  alt: string;
  name: string;
  shape?: string;
  metal?: string;
  className?: string;
  imagePosition?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  name,
  shape,
  metal,
  className = "w-full h-full object-cover object-center",
  imagePosition,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="absolute inset-0 aspect-square flex flex-col items-center justify-center p-5 text-center bg-[#FAF8F5] border border-[#E8E3DC] select-none">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8C6D46] font-medium mb-1">
          Scarselli Atelier
        </span>
        <span className="font-serif text-[15px] sm:text-[16px] text-[#0B1320] leading-snug">
          {name}
        </span>
        {(shape || metal) && (
          <span className="text-[11px] sm:text-[12px] text-[#6B7280] mt-1.5 capitalize font-light">
            {shape ? `${shape} cut` : ""} {metal ? `· ${metal}` : ""}
          </span>
        )}
      </div>
    );
  }

  const computedClass = imagePosition
    ? className.replace("object-center", imagePosition)
    : className;

  return (
    <img
      src={toRelativeImagePath(src)}
      alt={alt || name}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className={computedClass}
    />
  );
};
