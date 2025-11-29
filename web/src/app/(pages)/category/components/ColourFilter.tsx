import React from "react";

interface ColourFilterProps {
    selectedColors: string[];
    toggleColor: (color: string) => void;
}

const ColourFilter:React.FC <ColourFilterProps> = ({selectedColors,toggleColor}) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-medium text-sm mb-2">Colour</h3>
        <div className="grid grid-cols-5 gap-2">
          {[
            "red",
            "blue",
            "green",
            "gray",
            "purple",
            "black",
            "white",
            "beige",
            "olive",
            "yellow",
            "navy",
            "brown",
          ].map((color) => (
            <div
              key={color}
              onClick={() => toggleColor(color)}
              className={`w-6 h-6 rounded-md cursor-pointer border-2 relative flex items-center justify-center ${
                selectedColors.includes(color)
                  ? "border-black"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
            >
              {selectedColors.includes(color) && (
                <span className="text-black text-xs font-bold">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColourFilter;
