import React from "react";
import { DiamondShape } from "../data/products";

interface ShapeIconProps {
  shape: DiamondShape;
  className?: string;
}

export const ShapeIcon: React.FC<ShapeIconProps> = ({ shape, className = "w-6 h-6" }) => {
  switch (shape) {
    case "round":
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <circle cx="24" cy="24" r="18" stroke="currentColor" />
          <circle cx="24" cy="24" r="10" stroke="currentColor" strokeOpacity="0.4" />
          <path d="M24 6L24 42M6 24L42 24M11.3 11.3L36.7 36.7M11.3 36.7L36.7 11.3" stroke="currentColor" strokeOpacity="0.25" />
        </svg>
      );
    case "oval":
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <ellipse cx="24" cy="24" rx="14" ry="20" stroke="currentColor" />
          <ellipse cx="24" cy="24" rx="8" ry="12" stroke="currentColor" strokeOpacity="0.4" />
          <path d="M24 4L24 44M10 24L38 24" stroke="currentColor" strokeOpacity="0.25" />
        </svg>
      );
    case "emerald":
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          {/* Octagonal step cut */}
          <path d="M16 6H32L40 14V34L32 42H16L8 34V14L16 6Z" stroke="currentColor" />
          <path d="M20 12H28L33 17V31L28 36H20L15 31V17L20 12Z" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="20" y="16" width="8" height="16" stroke="currentColor" strokeOpacity="0.3" />
        </svg>
      );
    case "pear":
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M24 6C24 6 11 22 11 32C11 39.18 16.82 45 24 45C31.18 45 37 39.18 37 32C37 22 24 6 24 6Z" stroke="currentColor" />
          <circle cx="24" cy="32" r="7" stroke="currentColor" strokeOpacity="0.35" />
          <path d="M24 6V45" stroke="currentColor" strokeOpacity="0.25" />
        </svg>
      );
    case "cushion":
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <rect x="9" y="9" width="30" height="30" rx="9" stroke="currentColor" />
          <rect x="15" y="15" width="18" height="18" rx="5" stroke="currentColor" strokeOpacity="0.4" />
          <path d="M9 24H39M24 9V39" stroke="currentColor" strokeOpacity="0.2" />
        </svg>
      );
    case "radiant":
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M14 8H34L40 14V34L34 40H14L8 34V14L14 8Z" stroke="currentColor" />
          <line x1="8" y1="14" x2="40" y2="34" stroke="currentColor" strokeOpacity="0.25" />
          <line x1="8" y1="34" x2="40" y2="14" stroke="currentColor" strokeOpacity="0.25" />
          <rect x="18" y="18" width="12" height="12" stroke="currentColor" strokeOpacity="0.4" />
        </svg>
      );
    case "asscher":
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M15 9H33L39 15V33L33 39H15L9 33V15L15 9Z" stroke="currentColor" />
          <path d="M19 15H29L33 19V29L29 33H19L15 29V19L19 15Z" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="20" y="20" width="8" height="8" stroke="currentColor" strokeOpacity="0.3" />
        </svg>
      );
    case "marquise":
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M24 4C14 16 12 24 12 24C12 24 14 32 24 44C34 32 36 24 36 24C36 24 34 16 24 4Z" stroke="currentColor" />
          <ellipse cx="24" cy="24" rx="6" ry="10" stroke="currentColor" strokeOpacity="0.35" />
          <path d="M24 4V44M12 24H36" stroke="currentColor" strokeOpacity="0.2" />
        </svg>
      );
    case "princess":
      return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <rect x="9" y="9" width="30" height="30" stroke="currentColor" />
          <line x1="9" y1="9" x2="39" y2="39" stroke="currentColor" strokeOpacity="0.35" />
          <line x1="39" y1="9" x2="9" y2="39" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="17" y="17" width="14" height="14" stroke="currentColor" strokeOpacity="0.3" />
        </svg>
      );
  }
};
