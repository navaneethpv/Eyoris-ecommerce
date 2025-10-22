import React from "react";

interface IndicatorProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export default function Indicator({ total, current, onChange }: IndicatorProps) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`w-3 h-3 rounded-full transition-opacity duration-300 ${
            index === current
              ? "bg-white opacity-100"
              : "bg-white opacity-50 hover:opacity-75"
          }`}
        />
      ))}
    </div>
  );
}
