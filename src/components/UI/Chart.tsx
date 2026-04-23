"use client";

import React, { useId, useState, useMemo } from "react";
import { motion } from "framer-motion";

// ─── Data types for specialized charts ──────────────────────────────────────

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
}

export interface BubblePoint {
  x: number;
  y: number;
  r: number;
  label?: string;
}

export interface BoxPlotItem {
  label?: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

export interface HeatmapData {
  rows: string[];
  cols: string[];
  values: number[][];
}



export interface GanttItem {
  label: string;
  start: number;
  end: number;
  color?: string;
}

// ─── Chart type union ───────────────────────────────────────────────────────

export type ChartType =
  | "bar"
  | "line"
  | "pie"
  | "histogram"
  | "scatter"
  | "area"
  | "bubble"
  | "boxplot"
  | "radar"
  | "heatmap"
  | "gantt";

// ─── Color palette ──────────────────────────────────────────────────────────

const PALETTE = [
  "#707FDD", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
  "#06b6d4", "#ec4899", "#14b8a6", "#f97316", "#6366f1",
  "#84cc16", "#e11d48", "#0ea5e9", "#a855f7", "#22c55e",
];

function getColor(index: number, colors?: string[]): string {
  if (colors && colors[index]) return colors[index];
  return PALETTE[index % PALETTE.length];
}

// ─── Props ──────────────────────────────────────────────────────────────────

interface ChartProps {
  /** Numeric data array — used by bar, line, pie, histogram, area, radar */
  data?: number[];
  labels?: string[];
  height?: string | number;
  width?: string | number;
  color?: string;
  colors?: string[];
  gradientFrom?: string;
  gradientTo?: string;
  labelColor?: string;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  className?: string;
  type?: ChartType;
  showGridLines?: boolean;
  animated?: boolean;
  /** Donut hole (0–1) for pie chart, 0 = solid pie, 0.6 = donut */
  innerRadius?: number;

  // Specialized data props
  scatterData?: ScatterPoint[];
  bubbleData?: BubblePoint[];
  boxPlotData?: BoxPlotItem[];
  heatmapData?: HeatmapData;

  ganttData?: GanttItem[];
}

// ─── Utility functions ──────────────────────────────────────────────────────

function smoothPath(
  points: { x: number; y: number }[],
  tension: number = 0.3
): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x},${points[0].y} L ${points[1].x},${points[1].y}`;
  }
  let path = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return path;
}



// ─── Main Component ─────────────────────────────────────────────────────────

const Chart = ({
  data,
  labels,
  height = 200,
  width,
  color = "#707FDD",
  colors,
  gradientFrom = "from-blue-600",
  gradientTo = "to-blue-400",
  labelColor = "text-blue-400",
  showTooltip = true,
  showXAxis = true,
  showYAxis = false,
  className = "",
  type = "bar",
  showGridLines = false,
  animated = true,
  innerRadius = 0,
  scatterData,
  bubbleData,
  boxPlotData,
  heatmapData,

  ganttData,
}: ChartProps) => {
  const uniqueId = useId();
  const safeData = data || [];
  const max = Math.max(...safeData, 1);
  const h = typeof height === "number" ? height : parseInt(height as string) || 200;
  const w = width ? (typeof width === "number" ? width : parseInt(width as string) || 400) : undefined;
  const [hovered, setHovered] = useState<number | null>(null);

  const uid = uniqueId.replace(/:/g, "");
  const gradientId = `cg-${uid}`;
  const glowId = `gl-${uid}`;
  const lineGradientId = `lg-${uid}`;

  // ═══════════════════════════════════════════════════════════════════════════
  // LINE CHART
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "line") {
    const pad = { top: 8, bottom: 4, left: 0, right: 0 };
    const vW = 100, vH = 100;
    const points = useMemo(
      () => safeData.map((v, i) => ({
        x: pad.left + (i / Math.max(safeData.length - 1, 1)) * (vW - pad.left - pad.right),
        y: pad.top + (1 - v / max) * (vH - pad.top - pad.bottom),
      })),
      [safeData, max]
    );
    const linePath = smoothPath(points);
    const areaPath = `${linePath} L ${points[points.length - 1].x},${vH} L ${points[0].x},${vH} Z`;
    const gridY = showGridLines ? [0.25, 0.5, 0.75].map(f => pad.top + f * (vH - pad.top - pad.bottom)) : [];

    return (
      <div className={`w-full flex flex-col ${className}`}>
        <div className="relative w-full" style={{ height: `${h}px` }}>
          <svg viewBox={`0 0 ${vW} ${vH}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                <stop offset="50%" stopColor={color} stopOpacity="0.08" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
              <linearGradient id={lineGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} stopOpacity="0.6" />
                <stop offset="50%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={color} stopOpacity="0.6" />
              </linearGradient>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {gridY.map((y, i) => (
              <line key={i} x1={pad.left} y1={y} x2={vW - pad.right} y2={y} stroke="currentColor" className="text-slate-200/40" strokeWidth="0.3" strokeDasharray="2,3" />
            ))}
            <motion.path d={areaPath} fill={`url(#${gradientId})`} initial={animated ? { opacity: 0 } : undefined} animate={animated ? { opacity: 1 } : undefined} transition={{ duration: 0.8 }} />
            <motion.path d={linePath} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity={0.15} filter={`url(#${glowId})`} initial={animated ? { pathLength: 0 } : undefined} animate={animated ? { pathLength: 1 } : undefined} transition={{ duration: 1.2 }} />
            <motion.path d={linePath} fill="none" stroke={`url(#${lineGradientId})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={animated ? { pathLength: 0 } : undefined} animate={animated ? { pathLength: 1 } : undefined} transition={{ duration: 1 }} />
            {showTooltip && points.map((pt, i) => (
              <motion.circle key={i} cx={pt.x} cy={pt.y} r="1.8" fill={color} stroke="white" strokeWidth="0.8"
                initial={animated ? { scale: 0, opacity: 0 } : undefined} animate={animated ? { scale: 1, opacity: 0.8 } : undefined}
                transition={{ delay: 0.8 + i * 0.04, duration: 0.3, ease: "backOut" }} />
            ))}
          </svg>
        </div>
        {showXAxis && labels && (
          <motion.div className="flex justify-between mt-3 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.12em] px-1 select-none"
            initial={animated ? { opacity: 0, y: 4 } : undefined} animate={animated ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0.6, duration: 0.4 }}>
            {labels.map((l, i) => <span key={i} className="transition-colors hover:text-slate-600">{l}</span>)}
          </motion.div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // AREA CHART — like line but with emphasized fill
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "area") {
    const pad = { top: 10, bottom: 4, left: 0, right: 0 };
    const vW = 100, vH = 100;
    const points = useMemo(
      () => safeData.map((v, i) => ({
        x: pad.left + (i / Math.max(safeData.length - 1, 1)) * (vW - pad.left - pad.right),
        y: pad.top + (1 - v / max) * (vH - pad.top - pad.bottom),
      })),
      [safeData, max]
    );
    const linePath = smoothPath(points);
    const areaPath = `${linePath} L ${points[points.length - 1].x},${vH} L ${points[0].x},${vH} Z`;

    return (
      <div className={`w-full flex flex-col ${className}`}>
        <div className="relative w-full" style={{ height: `${h}px` }}>
          <svg viewBox={`0 0 ${vW} ${vH}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.5" />
                <stop offset="60%" stopColor={color} stopOpacity="0.15" />
                <stop offset="100%" stopColor={color} stopOpacity="0.02" />
              </linearGradient>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {showGridLines && [0.25, 0.5, 0.75].map((f, i) => {
              const y = pad.top + f * (vH - pad.top - pad.bottom);
              return <line key={i} x1={0} y1={y} x2={vW} y2={y} stroke="currentColor" className="text-slate-200/40" strokeWidth="0.3" strokeDasharray="2,3" />;
            })}
            <motion.path d={areaPath} fill={`url(#${gradientId})`} initial={animated ? { opacity: 0 } : undefined} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
            <motion.path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${glowId})`}
              initial={animated ? { pathLength: 0 } : undefined} animate={animated ? { pathLength: 1 } : undefined} transition={{ duration: 1 }} />
          </svg>
        </div>
        {showXAxis && labels && (
          <div className="flex justify-between mt-3 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.12em] px-1 select-none">
            {labels.map((l, i) => <span key={i}>{l}</span>)}
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PIE CHART / DONUT
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "pie") {
    const total = safeData.reduce((s, v) => s + v, 0) || 1;
    const cx = 50, cy = 50, r = 40;
    const ir = r * Math.min(Math.max(innerRadius, 0), 0.95);
    let cumAngle = -90; // start from top

    const slices = safeData.map((v, i) => {
      const angle = (v / total) * 360;
      const startAngle = cumAngle;
      cumAngle += angle;
      const endAngle = cumAngle;
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const largeArc = angle > 180 ? 1 : 0;
      const outerX1 = cx + r * Math.cos(startRad);
      const outerY1 = cy + r * Math.sin(startRad);
      const outerX2 = cx + r * Math.cos(endRad);
      const outerY2 = cy + r * Math.sin(endRad);

      let d: string;
      if (ir > 0) {
        const innerX1 = cx + ir * Math.cos(startRad);
        const innerY1 = cy + ir * Math.sin(startRad);
        const innerX2 = cx + ir * Math.cos(endRad);
        const innerY2 = cy + ir * Math.sin(endRad);
        d = `M ${outerX1} ${outerY1} A ${r} ${r} 0 ${largeArc} 1 ${outerX2} ${outerY2} L ${innerX2} ${innerY2} A ${ir} ${ir} 0 ${largeArc} 0 ${innerX1} ${innerY1} Z`;
      } else {
        d = `M ${cx} ${cy} L ${outerX1} ${outerY1} A ${r} ${r} 0 ${largeArc} 1 ${outerX2} ${outerY2} Z`;
      }

      // Label position
      const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
      const labelR = ir > 0 ? (r + ir) / 2 : r * 0.65;
      const lx = cx + labelR * Math.cos(midAngle);
      const ly = cy + labelR * Math.sin(midAngle);

      return { d, color: getColor(i, colors), value: v, lx, ly, label: labels?.[i], angle, index: i };
    });

    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div style={{ height: `${h}px`, width: `${h}px` }} className="relative">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              <filter id={glowId} x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.15" />
              </filter>
            </defs>
            {slices.map((s, i) => (
              <motion.path
                key={i}
                d={s.d}
                fill={s.color}
                stroke="white"
                strokeWidth="0.8"
                filter={`url(#${glowId})`}
                className="cursor-pointer"
                initial={animated ? { scale: 0, opacity: 0 } : undefined}
                animate={{
                  scale: hovered === i ? 1.05 : 1,
                  opacity: hovered !== null && hovered !== i ? 0.6 : 1,
                }}
                transition={animated ? { delay: i * 0.06, duration: 0.5, ease: "backOut" } : { duration: 0.2 }}
                style={{ transformOrigin: "50px 50px" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
            {/* Percentage labels inside slices */}
            {slices.filter(s => s.angle > 20).map((s, i) => (
              <text key={i} x={s.lx} y={s.ly} textAnchor="middle" dominantBaseline="central"
                className="fill-white text-[5px] font-bold pointer-events-none select-none" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
                {Math.round((s.value / total) * 100)}%
              </text>
            ))}
            {/* Center label for donut */}
            {ir > 0 && (
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" className="fill-slate-700 text-[8px] font-black pointer-events-none select-none">
                {total}
              </text>
            )}
          </svg>
          {/* Tooltip */}
          {showTooltip && hovered !== null && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+20px)] bg-slate-900/90 backdrop-blur-md text-white text-[11px] py-1.5 px-3 rounded-lg shadow-xl border border-white/10 whitespace-nowrap font-medium z-30 pointer-events-none">
              <span className="font-bold" style={{ color: slices[hovered].color }}>{labels?.[hovered] || `Slice ${hovered + 1}`}</span>
              <span className="text-slate-300 ml-1.5">{safeData[hovered]} ({Math.round((safeData[hovered] / total) * 100)}%)</span>
            </div>
          )}
        </div>
        {/* Legend */}
        {labels && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider select-none">
            {labels.map((l, i) => (
              <div key={i} className="flex items-center gap-1.5 cursor-default" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: getColor(i, colors) }} />
                <span>{l}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HISTOGRAM — continuous bars (no gaps)
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "histogram") {
    return (
      <div className={`w-full flex flex-col ${className}`}>
        <div className="flex items-end w-full relative" style={{ height: `${h}px` }}>
          {showGridLines && (
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2">
              {[0, 1, 2, 3].map(i => <div key={i} className="w-full border-t border-dashed border-slate-100" />)}
            </div>
          )}
          {safeData.map((v, i) => {
            const pct = (v / max) * 100;
            return (
              <motion.div
                key={i}
                className="flex-1 relative cursor-pointer"
                style={{ height: `${Math.max(pct, 2)}%` }}
                initial={animated ? { height: 0, opacity: 0 } : undefined}
                animate={{ height: `${Math.max(pct, 2)}%`, opacity: hovered === i ? 1 : 0.8 }}
                transition={{ delay: i * 0.015, duration: 0.4 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="absolute inset-0 rounded-t-sm" style={{ backgroundColor: getColor(i, colors || [color]) }} />
                {showTooltip && hovered === i && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white text-[11px] py-1 px-2.5 rounded-lg shadow-xl border border-white/10 whitespace-nowrap font-medium z-30 pointer-events-none">
                    {v}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        {showXAxis && labels && (
          <div className="flex justify-between mt-3 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.12em] px-1 select-none">
            {labels.map((l, i) => <span key={i}>{l}</span>)}
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SCATTER PLOT
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "scatter" && scatterData) {
    const xs = scatterData.map(p => p.x);
    const ys = scatterData.map(p => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs, 1);
    const minY = Math.min(...ys), maxY = Math.max(...ys, 1);
    const pad = 12;
    const vW = 100, vH = 100;

    return (
      <div className={`w-full flex flex-col ${className}`}>
        <div className="relative w-full" style={{ height: `${h}px` }}>
          <svg viewBox={`0 0 ${vW} ${vH}`} className="w-full h-full overflow-visible">
            <defs>
              <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Axes */}
            <line x1={pad} y1={pad} x2={pad} y2={vH - pad} stroke="currentColor" className="text-slate-200" strokeWidth="0.3" />
            <line x1={pad} y1={vH - pad} x2={vW - pad} y2={vH - pad} stroke="currentColor" className="text-slate-200" strokeWidth="0.3" />
            {/* Grid */}
            {showGridLines && [0.25, 0.5, 0.75].map((f, i) => (
              <React.Fragment key={i}>
                <line x1={pad} y1={pad + f * (vH - 2 * pad)} x2={vW - pad} y2={pad + f * (vH - 2 * pad)} stroke="currentColor" className="text-slate-100" strokeWidth="0.2" strokeDasharray="1,2" />
                <line x1={pad + f * (vW - 2 * pad)} y1={pad} x2={pad + f * (vW - 2 * pad)} y2={vH - pad} stroke="currentColor" className="text-slate-100" strokeWidth="0.2" strokeDasharray="1,2" />
              </React.Fragment>
            ))}
            {/* Points */}
            {scatterData.map((pt, i) => {
              const px = pad + ((pt.x - minX) / (maxX - minX || 1)) * (vW - 2 * pad);
              const py = vH - pad - ((pt.y - minY) / (maxY - minY || 1)) * (vH - 2 * pad);
              return (
                <motion.circle
                  key={i}
                  cx={px} cy={py} r={hovered === i ? 3 : 2}
                  fill={color} stroke="white" strokeWidth="0.6"
                  filter={hovered === i ? `url(#${glowId})` : undefined}
                  className="cursor-pointer"
                  initial={animated ? { scale: 0, opacity: 0 } : undefined}
                  animate={{ scale: 1, opacity: hovered === i ? 1 : 0.75 }}
                  transition={{ delay: i * 0.02, duration: 0.35, ease: "backOut" }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}
          </svg>
          {showTooltip && hovered !== null && scatterData[hovered] && (
            <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-md text-white text-[11px] py-1.5 px-3 rounded-lg shadow-xl border border-white/10 whitespace-nowrap font-medium z-30 pointer-events-none">
              <span className="font-bold" style={{ color }}>{scatterData[hovered].label || `Point ${hovered + 1}`}</span>
              <span className="text-slate-300 ml-1.5">({scatterData[hovered].x}, {scatterData[hovered].y})</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // BUBBLE CHART
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "bubble" && bubbleData) {
    const xs = bubbleData.map(p => p.x);
    const ys = bubbleData.map(p => p.y);
    const rs = bubbleData.map(p => p.r);
    const minX = Math.min(...xs), maxX = Math.max(...xs, 1);
    const minY = Math.min(...ys), maxY = Math.max(...ys, 1);
    const maxR = Math.max(...rs, 1);
    const pad = 14;
    const vW = 100, vH = 100;

    return (
      <div className={`w-full flex flex-col ${className}`}>
        <div className="relative w-full" style={{ height: `${h}px` }}>
          <svg viewBox={`0 0 ${vW} ${vH}`} className="w-full h-full overflow-visible">
            <defs>
              <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
              </filter>
            </defs>
            <line x1={pad} y1={pad} x2={pad} y2={vH - pad} stroke="currentColor" className="text-slate-200" strokeWidth="0.3" />
            <line x1={pad} y1={vH - pad} x2={vW - pad} y2={vH - pad} stroke="currentColor" className="text-slate-200" strokeWidth="0.3" />
            {bubbleData.map((pt, i) => {
              const px = pad + ((pt.x - minX) / (maxX - minX || 1)) * (vW - 2 * pad);
              const py = vH - pad - ((pt.y - minY) / (maxY - minY || 1)) * (vH - 2 * pad);
              const pr = 2 + (pt.r / maxR) * 6;
              const c = getColor(i, colors);
              return (
                <React.Fragment key={i}>
                  <motion.circle cx={px} cy={py} r={pr} fill={c} opacity={0.12} filter={`url(#${glowId})`}
                    initial={animated ? { scale: 0 } : undefined} animate={{ scale: 1.6 }} transition={{ delay: i * 0.04, duration: 0.5 }} />
                  <motion.circle cx={px} cy={py} r={pr} fill={c} stroke="white" strokeWidth="0.5" opacity={hovered === i ? 0.95 : 0.7}
                    className="cursor-pointer"
                    initial={animated ? { scale: 0, opacity: 0 } : undefined} animate={{ scale: 1, opacity: hovered === i ? 0.95 : 0.7 }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: "backOut" }}
                    onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
                </React.Fragment>
              );
            })}
          </svg>
          {showTooltip && hovered !== null && bubbleData[hovered] && (
            <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-md text-white text-[11px] py-1.5 px-3 rounded-lg shadow-xl border border-white/10 whitespace-nowrap font-medium z-30 pointer-events-none">
              <span className="font-bold" style={{ color: getColor(hovered, colors) }}>{bubbleData[hovered].label || `Bubble ${hovered + 1}`}</span>
              <span className="text-slate-300 ml-1.5">({bubbleData[hovered].x}, {bubbleData[hovered].y}) r={bubbleData[hovered].r}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // BOX PLOT
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "boxplot" && boxPlotData) {
    const allVals = boxPlotData.flatMap(b => [b.min, b.max]);
    const globalMin = Math.min(...allVals);
    const globalMax = Math.max(...allVals, 1);
    const pad = { top: 10, bottom: 10, left: 5, right: 5 };
    const vW = 100, vH = 100;
    const boxW = Math.min(12, (vW - pad.left - pad.right) / boxPlotData.length - 2);

    const mapY = (v: number) => vH - pad.bottom - ((v - globalMin) / (globalMax - globalMin || 1)) * (vH - pad.top - pad.bottom);

    return (
      <div className={`w-full flex flex-col ${className}`}>
        <div className="relative w-full" style={{ height: `${h}px` }}>
          <svg viewBox={`0 0 ${vW} ${vH}`} className="w-full h-full overflow-visible">
            {showGridLines && [0.25, 0.5, 0.75].map((f, i) => {
              const y = pad.top + f * (vH - pad.top - pad.bottom);
              return <line key={i} x1={pad.left} y1={y} x2={vW - pad.right} y2={y} stroke="currentColor" className="text-slate-100" strokeWidth="0.2" strokeDasharray="1,2" />;
            })}
            {boxPlotData.map((b, i) => {
              const cx = pad.left + (i + 0.5) * ((vW - pad.left - pad.right) / boxPlotData.length);
              const c = getColor(i, colors);
              return (
                <motion.g key={i} initial={animated ? { opacity: 0, y: 10 } : undefined} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }} className="cursor-pointer"
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                  {/* Whisker line */}
                  <line x1={cx} y1={mapY(b.min)} x2={cx} y2={mapY(b.max)} stroke={c} strokeWidth="0.6" opacity="0.5" />
                  {/* Min/Max caps */}
                  <line x1={cx - boxW / 4} y1={mapY(b.min)} x2={cx + boxW / 4} y2={mapY(b.min)} stroke={c} strokeWidth="0.8" />
                  <line x1={cx - boxW / 4} y1={mapY(b.max)} x2={cx + boxW / 4} y2={mapY(b.max)} stroke={c} strokeWidth="0.8" />
                  {/* IQR Box */}
                  <rect x={cx - boxW / 2} y={mapY(b.q3)} width={boxW} height={mapY(b.q1) - mapY(b.q3)}
                    fill={c} fillOpacity={hovered === i ? 0.3 : 0.15} stroke={c} strokeWidth="0.8" rx="1" />
                  {/* Median line */}
                  <line x1={cx - boxW / 2} y1={mapY(b.median)} x2={cx + boxW / 2} y2={mapY(b.median)}
                    stroke={c} strokeWidth="1.5" strokeLinecap="round" />
                </motion.g>
              );
            })}
          </svg>
          {showTooltip && hovered !== null && boxPlotData[hovered] && (
            <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-md text-white text-[10px] py-2 px-3 rounded-lg shadow-xl border border-white/10 whitespace-nowrap font-medium z-30 pointer-events-none leading-relaxed">
              <div className="font-bold mb-1" style={{ color: getColor(hovered, colors) }}>{boxPlotData[hovered].label || `Box ${hovered + 1}`}</div>
              <div>Max: {boxPlotData[hovered].max} · Q3: {boxPlotData[hovered].q3}</div>
              <div>Med: {boxPlotData[hovered].median}</div>
              <div>Q1: {boxPlotData[hovered].q1} · Min: {boxPlotData[hovered].min}</div>
            </div>
          )}
        </div>
        {labels && (
          <div className="flex justify-around mt-3 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.12em] select-none">
            {labels.map((l, i) => <span key={i}>{l}</span>)}
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RADAR CHART (Spider)
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "radar") {
    const n = safeData.length;
    if (n < 3) return <div className="text-xs text-slate-400 p-4">Radar needs ≥ 3 data points</div>;
    const cx = 50, cy = 50, r = 38;
    const angleStep = (2 * Math.PI) / n;
    const levels = [0.25, 0.5, 0.75, 1];

    const radarPoints = safeData.map((v, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const ratio = v / max;
      return {
        x: cx + r * ratio * Math.cos(angle),
        y: cy + r * ratio * Math.sin(angle),
      };
    });
    const radarPath = radarPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ") + " Z";

    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div style={{ height: `${h}px`, width: `${h}px` }}>
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Grid polygons */}
            {levels.map((lv, li) => {
              const pts = Array.from({ length: n }, (_, i) => {
                const a = i * angleStep - Math.PI / 2;
                return `${cx + r * lv * Math.cos(a)},${cy + r * lv * Math.sin(a)}`;
              }).join(" ");
              return <polygon key={li} points={pts} fill="none" stroke="currentColor" className="text-slate-200" strokeWidth="0.3" />;
            })}
            {/* Axis lines */}
            {Array.from({ length: n }, (_, i) => {
              const a = i * angleStep - Math.PI / 2;
              return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="currentColor" className="text-slate-200" strokeWidth="0.2" />;
            })}
            {/* Data polygon */}
            <motion.path d={radarPath} fill={`url(#${gradientId})`} stroke={color} strokeWidth="1.5" strokeLinejoin="round"
              initial={animated ? { scale: 0, opacity: 0 } : undefined} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }} style={{ transformOrigin: "50px 50px" }} />
            {/* Data dots */}
            {radarPoints.map((p, i) => (
              <motion.circle key={i} cx={p.x} cy={p.y} r={hovered === i ? 2.5 : 1.8} fill={color} stroke="white" strokeWidth="0.6"
                className="cursor-pointer"
                initial={animated ? { scale: 0 } : undefined} animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.3, ease: "backOut" }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
            ))}
            {/* Labels */}
            {labels && labels.map((l, i) => {
              const a = i * angleStep - Math.PI / 2;
              const lx = cx + (r + 7) * Math.cos(a);
              const ly = cy + (r + 7) * Math.sin(a);
              return (
                <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="central"
                  className="fill-slate-400 text-[3.5px] font-semibold uppercase select-none pointer-events-none">
                  {l}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HEATMAP
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "heatmap" && heatmapData) {
    const { rows, cols, values } = heatmapData;
    const allVals = values.flat();
    const heatMin = Math.min(...allVals);
    const heatMax = Math.max(...allVals, 1);
    const labelPad = 18;
    const vW = labelPad + cols.length * 10;
    const vH = labelPad + rows.length * 10;

    const getHeatColor = (v: number) => {
      const t = (v - heatMin) / (heatMax - heatMin || 1);
      const r = Math.round(255 * (1 - t * 0.6));
      const g = Math.round(255 * (1 - t * 0.8));
      const b = Math.round(255 * (1 - t * 0.1));
      return `rgb(${Math.round(t * 112 + (1 - t) * r)}, ${Math.round(t * 127 + (1 - t) * g)}, ${Math.round(t * 221 + (1 - t) * b)})`;
    };

    return (
      <div className={`w-full flex flex-col ${className}`}>
        <div className="relative w-full overflow-x-auto" style={{ height: `${h}px` }}>
          <svg viewBox={`0 0 ${vW} ${vH}`} className="w-full h-full" preserveAspectRatio="xMinYMin meet">
            {rows.map((row, ri) => (
              <React.Fragment key={ri}>
                <text x={labelPad - 2} y={labelPad + ri * 10 + 5} textAnchor="end" dominantBaseline="central"
                  className="fill-slate-400 text-[3px] font-semibold uppercase select-none">{row}</text>
                {cols.map((col, ci) => {
                  const v = values[ri]?.[ci] ?? 0;
                  const cellKey = ri * cols.length + ci;
                  return (
                    <motion.rect
                      key={ci}
                      x={labelPad + ci * 10} y={labelPad + ri * 10}
                      width={9.5} height={9.5} rx={1.5}
                      fill={getHeatColor(v)}
                      className="cursor-pointer"
                      initial={animated ? { opacity: 0 } : undefined}
                      animate={{ opacity: hovered === cellKey ? 1 : 0.85 }}
                      transition={{ delay: (ri + ci) * 0.01, duration: 0.3 }}
                      onMouseEnter={() => setHovered(cellKey)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  );
                })}
              </React.Fragment>
            ))}
            {cols.map((col, ci) => (
              <text key={ci} x={labelPad + ci * 10 + 4.75} y={labelPad - 3} textAnchor="middle"
                className="fill-slate-400 text-[3px] font-semibold uppercase select-none">{col}</text>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GANTT CHART
  // ═══════════════════════════════════════════════════════════════════════════
  if (type === "gantt" && ganttData) {
    const minStart = Math.min(...ganttData.map(g => g.start));
    const maxEnd = Math.max(...ganttData.map(g => g.end), 1);
    const range = maxEnd - minStart || 1;
    const rowH = Math.min(10, (100 - 10) / ganttData.length);
    const pad = 25;

    return (
      <div className={`w-full flex flex-col ${className}`}>
        <div className="relative w-full" style={{ height: `${h}px` }}>
          <svg viewBox={`0 0 100 ${5 + ganttData.length * (rowH + 2)}`} className="w-full h-full overflow-visible" preserveAspectRatio="xMinYMin meet">
            {ganttData.map((g, i) => {
              const x = pad + ((g.start - minStart) / range) * (100 - pad - 3);
              const width = Math.max(((g.end - g.start) / range) * (100 - pad - 3), 1);
              const y = 3 + i * (rowH + 2);
              const c = g.color || getColor(i, colors);
              return (
                <React.Fragment key={i}>
                  {/* Row label */}
                  <text x={pad - 2} y={y + rowH / 2} textAnchor="end" dominantBaseline="central"
                    className="fill-slate-500 text-[3px] font-semibold select-none">{g.label}</text>
                  {/* Row background */}
                  <rect x={pad} y={y} width={100 - pad - 3} height={rowH} rx={1} fill="currentColor" className="text-slate-50" />
                  {/* Bar */}
                  <motion.rect
                    x={x} y={y + 1} width={width} height={rowH - 2} rx={2}
                    fill={c} className="cursor-pointer"
                    initial={animated ? { width: 0, opacity: 0 } : undefined}
                    animate={{ width, opacity: hovered === i ? 1 : 0.8 }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                  />
                </React.Fragment>
              );
            })}
          </svg>
          {showTooltip && hovered !== null && ganttData[hovered] && (
            <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-md text-white text-[11px] py-1.5 px-3 rounded-lg shadow-xl border border-white/10 whitespace-nowrap font-medium z-30 pointer-events-none">
              <span className="font-bold" style={{ color: ganttData[hovered].color || getColor(hovered, colors) }}>{ganttData[hovered].label}</span>
              <span className="text-slate-300 ml-1.5">{ganttData[hovered].start} → {ganttData[hovered].end}</span>
            </div>
          )}
        </div>
      </div>
    );
  }


  // ═══════════════════════════════════════════════════════════════════════════
  // BAR CHART (default)
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className={`w-full flex flex-col ${className}`}>
      <div className="flex items-end justify-between gap-[3px] w-full relative" style={{ height: `${h}px` }}>
        {showGridLines && (
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2">
            {[0, 1, 2, 3].map(i => <div key={i} className="w-full border-t border-dashed border-slate-100" />)}
          </div>
        )}
        {safeData.map((value, index) => {
          const percentage = (value / max) * 100;
          const isHovered = hovered === index;
          return (
            <div key={index} className="flex-1 relative group cursor-pointer h-full flex items-end overflow-visible max-w-[10px] mx-auto"
              onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}>
              <motion.div
                className={`w-full bg-gradient-to-t ${gradientFrom} ${gradientTo} rounded-full relative overflow-hidden`}
                initial={animated ? { height: 0, opacity: 0 } : undefined}
                animate={{ height: `${Math.max(percentage, 4)}%`, opacity: isHovered ? 1 : 0.75 }}
                transition={animated ? { height: { delay: index * 0.02, duration: 0.5, ease: "easeOut" }, opacity: { duration: 0.2 } } : { opacity: { duration: 0.2 } }}
                style={{ minHeight: "3px" }}>
                <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out ${isHovered ? "-translate-y-full" : "translate-y-full"}`} />
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-white/50 blur-[2px] transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </motion.div>
              {showTooltip && (
                <div className={`absolute -top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-300 ease-out ${isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}`}>
                  <div className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] py-1.5 px-3 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.25)] border border-white/10 whitespace-nowrap font-medium">
                    <span className={`font-bold ${labelColor}`}>{value}</span>
                    <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-slate-900/90 border-r border-b border-white/10 rotate-45" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showXAxis && labels && (
        <motion.div className="flex justify-between mt-3 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.12em] px-1 select-none"
          initial={animated ? { opacity: 0, y: 4 } : undefined} animate={animated ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0.5, duration: 0.4 }}>
          {labels.map((l, i) => <span key={i} className={`transition-colors cursor-default ${hovered === i ? "text-slate-700" : "hover:text-slate-500"}`}>{l}</span>)}
        </motion.div>
      )}
    </div>
  );
};

export default Chart;
