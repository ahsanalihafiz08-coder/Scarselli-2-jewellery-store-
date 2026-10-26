import React from "react";
import { DiamondShape } from "../data/products";
import { ShapeIcon } from "./DiamondIcons";

interface DiamondShapesProps {
  selectedShape: DiamondShape | "all";
  onSelectShape: (shape: DiamondShape | "all") => void;
  productCountByShape: Record<DiamondShape | "all", number>;
}

const shapesList: { shape: DiamondShape; label: string; ratioNote: string }[] = [
  { shape: "round", label: "Round Brilliant", ratioNote: "Classic 57-Facet Fire" },
  { shape: "oval", label: "Oval Brilliant", ratioNote: "Elongated Brilliance" },
  { shape: "emerald", label: "Emerald Cut", ratioNote: "Step-Cut Hall of Mirrors" },
  { shape: "asscher", label: "Asscher Cut", ratioNote: "Square Step Geometry" },
  { shape: "cushion", label: "Cushion Cut", ratioNote: "Pillow Silhouette" },
  { shape: "radiant", label: "Radiant Cut", ratioNote: "Brilliant Step Hybrid" },
  { shape: "pear", label: "Pear Shape", ratioNote: "Graceful Teardrop" },
  { shape: "princess", label: "Princess Cut", ratioNote: "Square Modified Brilliant" },
];

export const DiamondShapes: React.FC<DiamondShapesProps> = ({
  selectedShape,
  onSelectShape,
  productCountByShape,
}) => {
  return (
    <section
      id="shapes"
      className="py-12 min-[900px]:py-[88px] bg-[#FFFFFF] border-b border-[rgba(10,20,40,0.08)]"
      aria-labelledby="shapes-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-[12px] lg:text-[13px] tracking-[0.2em] uppercase text-[#8C6D46] font-medium mb-2">
            Diamond Silhouettes
          </p>
          <h2
            id="shapes-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-[#0B1320]"
          >
            Explore by Diamond Cut
          </h2>
          <p className="mt-3 text-[15px] lg:text-[16px] text-[#4B5563] max-w-xl mx-auto font-light leading-relaxed">
            Filter our verified inventory or choose a silhouette for a private bespoke
            commission. Each shape reflects light with distinctive optical geometry.
          </p>
        </div>

        {/* Shape Selector Bar */}
        <div className="flex flex-col items-center">
          {/* All Shapes Reset Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => onSelectShape("all")}
              aria-pressed={selectedShape === "all"}
              className={`h-10 px-7 text-[12px] sm:text-[13px] uppercase tracking-[0.14em] font-medium transition-all rounded-pill ${
                selectedShape === "all"
                  ? "bg-[#0B1320] text-white shadow-soft"
                  : "bg-white text-[#141A24] border border-[#D5CEBF] hover:border-[#0B1320]"
              }`}
            >
              All Shapes ({productCountByShape["all"] || 0})
            </button>
          </div>

          {/* Interactive Shape Cards Grid */}
          <div
            role="toolbar"
            aria-label="Filter pieces by diamond cut"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 w-full"
          >
            {shapesList.map(({ shape, label, ratioNote }) => {
              const isSelected = selectedShape === shape;
              const count = productCountByShape[shape] || 0;

              return (
                <button
                  key={shape}
                  type="button"
                  onClick={() => onSelectShape(shape)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-center justify-between p-3.5 sm:p-4 min-h-[140px] text-center transition-all cursor-pointer border rounded-card shadow-soft overflow-hidden ${
                    isSelected
                      ? "bg-white border-[#0B1320] ring-1 ring-[#0B1320]"
                      : "bg-[#FDFBF7] border-[#E8E3DC] hover:border-[#C5A880] hover:bg-white"
                  }`}
                >
                  <div
                    className={`transition-colors my-2 ${
                      isSelected ? "text-[#0B1320]" : "text-[#0B1320]/85 hover:text-[#0B1320]"
                    }`}
                  >
                    <ShapeIcon shape={shape} className="w-9 h-9" />
                  </div>

                  <div className="w-full">
                    <span
                      className={`block text-[14px] font-medium tracking-wide ${
                        isSelected ? "text-[#0B1320]" : "text-[#141A24]"
                      }`}
                    >
                      {label.replace(" Brilliant", "").replace(" Cut", "").replace(" Shape", "")}
                    </span>
                    <span className="block text-[12px] text-[#4a4f5c] font-light mt-0.5 leading-snug line-clamp-2 max-w-full">
                      {ratioNote}
                    </span>
                  </div>

                  <span
                    className={`mt-2 text-[12px] tracking-wider uppercase font-medium ${
                      count > 0 ? "text-[#8C6D46]" : "text-[#9CA3AF]"
                    }`}
                  >
                    {count > 0 ? `${count} available` : "Bespoke only"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clarification Note */}
          <p className="text-[13px] text-[#6B7280] mt-5 text-center max-w-xl italic font-light">
            * Shape filters indicate design silhouettes. Pieces not currently in verified inventory
            can be privately sourced and bespoke-cut to your specific carat and ratio preferences.
          </p>
        </div>
      </div>
    </section>
  );
};
