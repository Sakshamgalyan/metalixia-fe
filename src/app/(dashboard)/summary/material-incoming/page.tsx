"use client";

import Typography from "@/components/UI/Typography";
import Chart from "@/components/UI/Chart";
import {
  ArrowDownCircle,
  CheckSquare,
  XCircle,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";

const MaterialIncoming = () => {
  const stats = [
    {
      label: "Total Received",
      value: "1,850",
      unit: "Tons",
      trend: "+12%",
      trendUp: true,
      icon: <ArrowDownCircle size={20} className="text-blue-500" />,
    },
    {
      label: "QC Pending",
      value: "120",
      unit: "Tons",
      trend: "+5%",
      trendUp: false, // More pending is generally "bad" or needs attention, but let's stick to arrow logic
      icon: <CheckSquare size={20} className="text-orange-500" />,
    },
    {
      label: "Rejected Material",
      value: "15",
      unit: "Tons",
      trend: "-2%",
      trendUp: true, // Less rejection is good
      icon: <XCircle size={20} className="text-red-500" />,
    },
  ];

  const arrivals = [
    {
      id: "INC-3321",
      supplier: "RawMetals Co.",
      material: "Iron Ore",
      quantity: "200 Tons",
      time: "08:15 AM",
      status: "QC Passed",
    },
    {
      id: "INC-3320",
      supplier: "ChemSupply Ltd.",
      material: "Industrial Solvents",
      quantity: "5000 Liters",
      time: "07:30 AM",
      status: "QC Pending",
    },
    {
      id: "INC-3319",
      supplier: "Alloy Experts",
      material: "Nickel Alloy",
      quantity: "50 Tons",
      time: "Yesterday",
      status: "Rejected",
    },
    {
      id: "INC-3318",
      supplier: "Global Mining",
      material: "Copper Concentrate",
      quantity: "120 Tons",
      time: "Yesterday",
      status: "QC Passed",
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <Typography variant="h2" className="flex items-center gap-3">
          <Package className="text-slate-800" size={32} /> Material Incoming
        </Typography>
        <Typography variant="p" className="text-slate-500 mt-1">
          Track inbound shipments, quality control status, and inventory updates
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* KPI Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-lg">{stat.icon}</div>
                <div
                  className={`flex items-center text-xs font-bold px-2 py-1 rounded ${stat.trendUp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                >
                  {stat.trendUp ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {stat.trend}
                </div>
              </div>
              <div>
                <h3 className="text-slate-500 text-sm font-medium">
                  {stat.label}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </span>
                  <span className="text-sm text-slate-400">{stat.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5">Incoming Volume Trend</Typography>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              <span className="text-xs text-slate-500">Tons Received</span>
            </div>
          </div>
          <Chart
            data={[90, 110, 130, 100, 160, 140, 150]}
            height={300}
            gradientFrom="from-indigo-600"
            gradientTo="to-indigo-400"
            labelColor="text-indigo-400"
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            showXAxis={true}
          />
        </div>

        {/* Recent Arrivals - Sidebar style */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Typography variant="h5" className="mb-6">
            Recent Arrivals
          </Typography>
          <div className="space-y-4">
            {arrivals.map((log, i) => (
              <div
                key={i}
                className="group p-4 rounded-lg border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {log.id}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      log.status === "QC Passed"
                        ? "bg-green-100 text-green-700"
                        : log.status === "QC Pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">
                  {log.supplier}
                </h4>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>{log.material}</span>
                  <span>{log.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors">
            View All Arrivals
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialIncoming;
