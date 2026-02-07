"use client";

import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Box,
  AlertTriangle,
  CheckCircle,
  Truck,
  TrendingUp,
  Clock,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import { useState } from "react";
import Chart from "@/components/UI/Chart";
import Chips from "@/components/UI/Chips";

const DashboardHome = () => {
  const stats = [
    {
      label: "Production Output",
      value: "1,240",
      unit: "Units",
      trend: "+12%",
      trendUp: true,
      icon: <Box size={20} className="text-[#707FDD]" />,
    },
    {
      label: "Active Employees",
      value: "84",
      unit: "On Shift",
      trend: "+4",
      trendUp: true,
      icon: <Users size={20} className="text-emerald-500" />,
    },
    {
      label: "Efficiency Rate",
      value: "94.2",
      unit: "%",
      trend: "-1.5%",
      trendUp: false,
      icon: <Activity size={20} className="text-orange-500" />,
    },
    {
      label: "Safety Incidents",
      value: "0",
      unit: "This Month",
      trend: "0",
      trendUp: true,
      icon: <AlertTriangle size={20} className="text-green-500" />,
    },
  ];

  const activities = [
    {
      id: 1,
      type: "System",
      message: "Automated backup completed successfully.",
      time: "10 min ago",
      status: "success",
    },
    {
      id: 2,
      type: "Security",
      message: "Door 4A forced open alert cleared.",
      time: "45 min ago",
      status: "warning",
    },
    {
      id: 3,
      type: "Production",
      message: "Line B maintenance schedule created.",
      time: "2 hours ago",
      status: "info",
    },
    {
      id: 4,
      type: "Employee",
      message: "Shift A check-in completed.",
      time: "4 hours ago",
      status: "success",
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <Typography variant="h2">Factory Overview</Typography>
        <Typography variant="p" className="text-slate-500">
          Real-time production and system status monitoring
        </Typography>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
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
        {/* Main Chart Area (Mock) */}
        {/* Charts Grid */}
        <div className="lg:col-span-2 space-y-8">
          {/* Production Efficiency Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h5">Production Efficiency</Typography>
              <select className="text-sm border-slate-200 rounded-lg text-slate-500 focus:ring-0">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
            </div>

            {/* Custom CSS Bar Chart using Chart Component */}
            <Chart
              data={[
                65, 59, 80, 81, 56, 55, 40, 70, 75, 50, 60, 90, 85, 95, 100, 80,
                70, 60, 50, 40, 55, 65, 75, 85,
              ]}
              height={320}
              gradientFrom="from-blue-600"
              gradientTo="to-blue-400"
              labelColor="text-blue-400"
              labels={["00:00", "06:00", "12:00", "18:00", "23:59"]}
              className="px-2 relative z-10"
              showXAxis={false}
            />

            {/* Custom X-Axis Labels for Production Efficiency (since data points > labels) */}
            <div className="flex justify-between mt-6 text-xs font-mono text-slate-500 px-2 uppercase tracking-wide">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </div>

          {/* Logistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dispatch Chart */}
            <div className="bg-[#1a1f37] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Truck size={18} className="text-emerald-400" />
                </div>
                <Typography variant="h6" className="text-white font-medium">
                  Outbound Logistics
                </Typography>
              </div>

              <Chart
                data={[40, 60, 45, 70, 50, 80, 65]}
                height={180}
                gradientFrom="from-emerald-600"
                gradientTo="to-emerald-400"
                labelColor="text-emerald-400"
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                showXAxis={true}
              />
            </div>

            {/* Incoming Chart */}
            <div className="bg-[#1a1f37] p-6 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Box size={18} className="text-indigo-400" />
                </div>
                <Typography variant="h6" className="text-white font-medium">
                  Inbound Inventory
                </Typography>
              </div>

              <Chart
                data={[30, 45, 60, 40, 75, 50, 55]}
                height={180}
                gradientFrom="from-indigo-600"
                gradientTo="to-indigo-400"
                labelColor="text-indigo-400"
                labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                showXAxis={true}
              />
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Typography variant="h5" className="mb-6 flex items-center gap-2">
            <Clock size={18} /> Recent Activity
          </Typography>
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 ${
                      activity.status === "success"
                        ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                        : activity.status === "warning"
                          ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                          : "bg-blue-500"
                    }`}
                  ></div>
                  {activity.id !== activities.length && (
                    <div className="w-0.5 bg-slate-100 h-full absolute top-5 bottom-[-24px]"></div>
                  )}
                </div>
                <div className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {activity.type}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-snug">
                    {activity.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-[#707FDD] font-medium hover:bg-slate-50 rounded-lg transition-colors">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
