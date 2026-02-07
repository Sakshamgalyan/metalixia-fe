"use client";

import React from "react";

interface ChartProps {
  data: number[];
  labels?: string[];
  height?: string | number;
  color?: string; // Main accent color hex (e.g., #707FDD)
  gradientFrom?: string; // Tailwind class (e.g., from-blue-600)
  gradientTo?: string; // Tailwind class (e.g., to-blue-400)
  labelColor?: string; // Tailwind class for text color
  showTooltip?: boolean;
  showXAxis?: boolean;
  className?: string;
  type?: "bar"; // Extensible for later
}

const Chart = ({
  data,
  labels,
  height = 200,
  color = "#707FDD",
  gradientFrom = "from-blue-600",
  gradientTo = "to-blue-400",
  labelColor = "text-blue-400",
  showTooltip = true,
  showXAxis = true,
  className = "",
}: ChartProps) => {
  const max = Math.max(...data);

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* Chart Area */}
      <div
        className="flex items-end justify-between gap-1.5 w-full relative"
        style={{ height: typeof height === "number" ? `${height}px` : height }}
      >
        {data.map((value, index) => {
          const percentage = (value / max) * 100;
          return (
            <div
              key={index}
              className="flex-1 rounded-t-sm relative group cursor-pointer h-full flex items-end overflow-hidden"
            >
              <div
                className={`w-full bg-gradient-to-t ${gradientFrom} ${gradientTo} opacity-60 group-hover:opacity-100 transition-all duration-300 rounded-t-sm relative`}
                style={{ height: `${percentage}%` }}
              >
                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out"></div>
              </div>

              {/* Tooltip */}
              {showTooltip && (
                <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl pointer-events-none transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-20 whitespace-nowrap">
                  <span className={`font-bold ${labelColor}`}>{value}</span>
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-r border-b border-slate-700 rotate-45"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* X-Axis Labels */}
      {showXAxis && labels && (
        <div className="flex justify-between mt-3 text-[10px] font-medium text-slate-500 uppercase tracking-wider px-1">
          {labels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chart;
