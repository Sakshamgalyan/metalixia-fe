"use client";

import React from "react";
import Chart from "@/components/UI/Chart";
import Typography from "@/components/UI/Typography";
import {
  Layers,
  IndianRupee,
  Truck,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface RawStatsCardsProps {
  statsData: any;
  statsLoading: boolean;
  isSuperAdmin: boolean;
}

export const RawStatsCards: React.FC<RawStatsCardsProps> = ({
  statsData,
  statsLoading,
  isSuperAdmin,
}) => {
  const dailyCounts = statsData?.dailyCounts || [];
  const chartLabels = dailyCounts.map((d: any) => {
    const date = new Date(d.date);
    return date.toLocaleDateString("en-IN", { weekday: "short" });
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      {/* Card 1: Procurement Activity */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Typography
                variant="p"
                className="text-slate-400 text-[11px] font-bold uppercase tracking-widest"
              >
                Weekly Total
              </Typography>
              <Typography
                variant="h4"
                className="text-slate-800 font-extrabold text-xl"
              >
                Procurement
              </Typography>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(124,58,237,0.3)]">
              <Layers size={22} className="stroke-[2.5px]" />
            </div>
          </div>

          <div className="mt-8">
            <Typography className="text-4xl font-black text-slate-900 tracking-tight">
              {statsLoading ? "..." : (statsData?.totalThisWeek ?? 0)}
            </Typography>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border-2 border-white bg-violet-100 flex items-center justify-center"
                  >
                    <div className="w-1 h-1 rounded-full bg-violet-600" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Active Inventory
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Sparkline Section */}
        <div className="h-16 mt-2 relative">
          {!statsLoading && dailyCounts.length > 0 ? (
            <div className="absolute inset-0 opacity-40">
              <Chart
                data={dailyCounts.map((d: any) => d.count)}
                height={64}
                type="line"
                color="#7c3aed"
                showXAxis={false}
                showTooltip={false}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-300 uppercase tracking-widest">
              Calculating trends...
            </div>
          )}
        </div>
      </motion.div>

      {/* Card 2: Total Investment */}
      {isSuperAdmin && (
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Typography
                  variant="p"
                  className="text-slate-400 text-[11px] font-bold uppercase tracking-widest"
                >
                  Capital Flow
                </Typography>
                <Typography
                  variant="h4"
                  className="text-slate-800 font-extrabold text-xl"
                >
                  Investment
                </Typography>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(225,29,72,0.3)]">
                <IndianRupee size={22} className="stroke-[2.5px]" />
              </div>
            </div>

            <div className="mt-8">
              <Typography className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {statsLoading
                  ? "..."
                  : formatCurrency(statsData?.totalInvestmentThisWeek ?? 0)}
              </Typography>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Live Market Value
                </span>
              </div>
            </div>
          </div>

          <div className="h-16 mt-2 relative">
            {!statsLoading && dailyCounts.length > 0 ? (
              <div className="absolute inset-0 opacity-40">
                <Chart
                  data={dailyCounts.map((d: any) => d.totalValue)}
                  height={64}
                  type="line"
                  color="#e11d48"
                  showXAxis={false}
                  showTooltip={false}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-300 uppercase tracking-widest">
                Analyzing value...
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Card 3: Vendor Network */}
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Typography
                variant="p"
                className="text-slate-400 text-[11px] font-bold uppercase tracking-widest"
              >
                Logistical
              </Typography>
              <Typography
                variant="h4"
                className="text-slate-800 font-extrabold text-xl"
              >
                Network
              </Typography>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(8,145,178,0.3)]">
              <Truck size={22} className="stroke-[2.5px]" />
            </div>
          </div>

          <div className="mt-8">
            <Typography className="text-4xl font-black text-slate-900 tracking-tight">
              {statsLoading ? "..." : (statsData?.activeSources ?? 0)}
            </Typography>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Verified Sources
              </span>
            </div>
          </div>
        </div>

        <div className="h-16 mt-2 flex items-end p-4">
          <div className="w-full flex items-center justify-between text-[10px] font-semibold text-slate-400 border-t border-slate-100 pt-3 uppercase tracking-[0.1em]">
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-cyan-500" />
              <span>Aggregate</span>
            </div>
            <span>Last 7 Days</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
