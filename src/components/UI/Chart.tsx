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
  type?: "bar" | "line";
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
  type = "bar",
}: ChartProps) => {
  const max = Math.max(...data, 1); // Avoid division by zero
  const h = typeof height === "number" ? height : parseInt(height as string) || 200;

  if (type === "line") {
    // Generate points for the SVG path
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / max) * 100;
      return `${x},${y}`;
    });

    const pathData = `M ${points.join(" L ")}`;
    const areaData = `${pathData} L 100,100 L 0,100 Z`;

    return (
      <div className={`w-full flex flex-col ${className}`}>
        <div className="relative w-full" style={{ height: `${h}px` }}>
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" className="text-current opacity-20" style={{ color: color }} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Area Fill */}
            <path d={areaData} fill="url(#chartGradient)" />
            {/* Smooth Line */}
            <path
              d={pathData}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {showXAxis && labels && (
          <div className="flex justify-between mt-3 text-[10px] font-medium text-slate-500 uppercase tracking-wider px-1">
            {labels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* Chart Area */}
      <div
        className="flex items-end justify-between gap-1 w-full relative"
        style={{ height: `${h}px` }}
      >
        {data.map((value, index) => {
          const percentage = (value / max) * 100;
          return (
            <div
              key={index}
              className="flex-1 rounded-t-lg relative group cursor-pointer h-full flex items-end overflow-hidden max-w-[8px] mx-auto"
            >
              <div
                className={`w-full bg-gradient-to-t ${gradientFrom} ${gradientTo} opacity-80 group-hover:opacity-100 transition-all duration-300 rounded-full relative`}
                style={{ height: `${Math.max(percentage, 5)}%` }}
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
