"use client";

import Typography from "@/components/UI/Typography";
import Chart from "@/components/UI/Chart";
import {
  Factory,
  Zap,
  AlertTriangle,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";

const ProductionSummary = () => {
  const stats = [
    {
      label: "OEE Score",
      value: "87%",
      unit: "Efficiency",
      trend: "+2%",
      trendUp: true,
      icon: <Activity size={20} className="text-blue-500" />,
    },
    {
      label: "Total Output",
      value: "45,200",
      unit: "Units",
      trend: "+12%",
      trendUp: true,
      icon: <Factory size={20} className="text-emerald-500" />,
    },
    {
      label: "Downtime",
      value: "45",
      unit: "Mins",
      trend: "-15%",
      trendUp: true, // Less downtime is good
      icon: <AlertTriangle size={20} className="text-orange-500" />,
    },
    {
      label: "Power Usage",
      value: "2.4",
      unit: "MW/h",
      trend: "+1%",
      trendUp: false, // More power usage is usually bad unless production is way up
      icon: <Zap size={20} className="text-yellow-500" />,
    },
  ];

  const lines = [
    {
      name: "Assembly Line A",
      status: "Running",
      efficiency: 92,
      product: "Auto Parts X1",
      target: 5000,
      current: 4850,
    },
    {
      name: "Assembly Line B",
      status: "Maintenance",
      efficiency: 0,
      product: "-",
      target: 0,
      current: 0,
    },
    {
      name: "Painting Unit",
      status: "Running",
      efficiency: 88,
      product: "Chassis Coating",
      target: 2000,
      current: 1750,
    },
    {
      name: "Packaging Line",
      status: "Running",
      efficiency: 95,
      product: "Final Pack",
      target: 10000,
      current: 9900,
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <Typography variant="h2" className="flex items-center gap-3">
          <Settings className="text-slate-800" size={32} /> Production Summary
        </Typography>
        <Typography variant="p" className="text-slate-500 mt-1">
          Real-time monitoring of manufacturing lines and resource utilization
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* KPI Cards */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5">Hourly Output (Last 24h)</Typography>
            <select className="text-sm border-slate-200 rounded-lg text-slate-500 focus:ring-0">
              <option>Assembly Line A</option>
              <option>Painting Unit</option>
              <option>Packaging Line</option>
            </select>
          </div>
          <Chart
            data={[
              40, 50, 45, 60, 55, 70, 80, 75, 60, 55, 45, 50, 60, 65, 70, 80,
              90, 85, 80, 75, 70, 60, 50, 45,
            ]}
            height={320}
            gradientFrom="from-emerald-600"
            gradientTo="to-emerald-400"
            labelColor="text-emerald-400"
            labels={["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]}
            showXAxis={false}
          />
          <div className="flex justify-between mt-6 text-xs font-mono text-slate-500 px-2 uppercase tracking-wide">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
          </div>
        </div>

        {/* Line Status */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Typography variant="h5" className="mb-6">
            Production Lines
          </Typography>
          <div className="space-y-4">
            {lines.map((line, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-slate-100 bg-slate-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-slate-800">{line.name}</h4>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      line.status === "Running"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {line.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mb-3">
                  Product: {line.product}
                </div>

                {/* Custom Progress Bar since Tool didn't show ProgressBar explicitly exported properly or I want custom style */}
                <div className="w-full bg-slate-200 rounded-full h-2 mb-1">
                  <div
                    className={`h-2 rounded-full ${line.efficiency > 90 ? "bg-green-500" : line.efficiency > 70 ? "bg-blue-500" : "bg-red-500"}`}
                    style={{ width: `${line.efficiency}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Efficiency: {line.efficiency}%</span>
                  <span>
                    {line.current} / {line.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionSummary;
