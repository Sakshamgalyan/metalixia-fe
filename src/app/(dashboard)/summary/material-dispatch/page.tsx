"use client";

import Typography from "@/components/UI/Typography";
import Chart from "@/components/UI/Chart";
import {
  Truck,
  Package,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";

const MaterialDispatch = () => {
  const stats = [
    {
      label: "Total Dispatched",
      value: "2,540",
      unit: "Tons",
      trend: "+8%",
      trendUp: true,
      icon: <Truck size={20} className="text-blue-500" />,
    },
    {
      label: "In Transit",
      value: "14",
      unit: "Trucks",
      trend: "+2",
      trendUp: true,
      icon: <Clock size={20} className="text-orange-500" />,
    },
    {
      label: "Avg. Loading Time",
      value: "45",
      unit: "Mins",
      trend: "-5%",
      trendUp: true,
      // trendUp is "good" here meaning it went down (faster) but logically displayed up/down arrow.
      // For now I'll stick to trendUp logic in the loop: if trendUp is true -> green arrow up.
      // If I want green arrow down, I might need custom logic.
      // But let's assume trendUp means POSITIVE outcome.
      icon: <Package size={20} className="text-purple-500" />,
    },
  ];

  const logs = [
    {
      id: "DSP-8492",
      dest: "Global Construction Inc.",
      material: "Steel Rods",
      quantity: "45 Tons",
      time: "10:30 AM",
      status: "On Road",
    },
    {
      id: "DSP-8491",
      dest: "AutoParts Mfg.",
      material: "Aluminum Sheets",
      quantity: "22 Tons",
      time: "09:15 AM",
      status: "Delivered",
    },
    {
      id: "DSP-8490",
      dest: "City Infra Project",
      material: "Copper Wiring",
      quantity: "12 Tons",
      time: "08:45 AM",
      status: "Delivered",
    },
    {
      id: "DSP-8489",
      dest: "Marine Shipyard",
      material: "Steel Plates",
      quantity: "60 Tons",
      time: "Yesterday",
      status: "Delivered",
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <Typography variant="h2" className="flex items-center gap-3">
          <Truck className="text-slate-800" size={32} /> Material Dispatch
        </Typography>
        <Typography variant="p" className="text-slate-500 mt-1">
          Overview of outgoing shipments and logistics performance
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
            <Typography variant="h5">Dispatch Volume Trend</Typography>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-xs text-slate-500">Tons Dispatched</span>
            </div>
          </div>
          <Chart
            data={[120, 145, 130, 180, 160, 210, 190]}
            height={300}
            gradientFrom="from-blue-600"
            gradientTo="to-blue-400"
            labelColor="text-blue-400"
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            showXAxis={true}
          />
        </div>

        {/* Recent Logs - Sidebar style */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Typography variant="h5" className="mb-6">
            Recent Dispatches
          </Typography>
          <div className="space-y-4">
            {logs.map((log, i) => (
              <div
                key={i}
                className="group p-4 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {log.id}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${log.status === "On Road" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}
                  >
                    {log.status}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">
                  {log.dest}
                </h4>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>{log.material}</span>
                  <span>{log.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors">
            View All Dispatch Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialDispatch;
