"use client";

import React from "react";
import {
  Activity,
  Server,
  Cpu,
  HardDrive,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Card from "@/components/UI/Card";
import Chart from "@/components/UI/Chart";
import Table, { TableColumn } from "@/components/UI/Table";
import ProgressBar from "@/components/UI/ProgressBar";
import Button from "@/components/UI/Button";
import Chips from "@/components/UI/Chips";

// Mock Data Interfaces
interface SystemLog {
  id: string;
  timestamp: string;
  level: "INFO" | "WARNING" | "ERROR" | "CRITICAL";
  source: string;
  message: string;
}

// Mock Data
const MOCK_LOGS: SystemLog[] = [
  {
    id: "1",
    timestamp: "2024-02-18 10:45:22",
    level: "INFO",
    source: "Zinc Line 2",
    message: "Batch #4590 completed successfully. Thickness: 12 microns.",
  },
  {
    id: "2",
    timestamp: "2024-02-18 10:42:15",
    level: "WARNING",
    source: "Rectifier 4",
    message: "High temperature alert (75°C) on Zinc Nickel line.",
  },
  {
    id: "3",
    timestamp: "2024-02-18 10:38:00",
    level: "INFO",
    source: "Maintenance",
    message: "Alkaline Zinc bath filtration changed.",
  },
  {
    id: "4",
    timestamp: "2024-02-18 10:30:45",
    level: "ERROR",
    source: "Auto Hoist",
    message: "Sensor timeout at Station 4 (Pickling Tank).",
  },
  {
    id: "5",
    timestamp: "2024-02-18 10:25:11",
    level: "INFO",
    source: "Quality",
    message: "Hourly salt spray test passed for Zn-Ni batch.",
  },
];

const TRAFFIC_DATA = [
  450, 600, 750, 500, 800, 950, 700, 850, 600, 900, 1000, 850,
];
const TRAFFIC_LABELS = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const MonitoringCompt = () => {
  // Stats Data
  const stats = [
    {
      label: "Daily Production",
      value: "12.4 Tons",
      description: "Target: 15 Tons",
      icon: <Activity className="text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      label: "Active Lines",
      value: "3 / 4",
      description: "Zinc, Zn-Ni Running",
      icon: <Server className="text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      label: "Plant Efficiency",
      value: "92%",
      description: "OEE Score",
      icon: <Globe className="text-emerald-500" />,
      color: "bg-emerald-50",
    },
    {
      label: "Power Load",
      value: "450 kW",
      description: "Peak: 480 kW",
      icon: <Cpu className="text-orange-500" />,
      color: "bg-orange-50",
    },
  ];

  // Table Columns
  const logColumns: TableColumn<SystemLog>[] = [
    {
      header: "Timestamp",
      accessor: "timestamp",
      className: "text-slate-500 text-xs w-40",
    },
    {
      header: "Level",
      accessor: "level",
      className: "w-28",
      render: (row) => {
        let colorScheme: "success" | "warning" | "danger" | "default" =
          "default";
        if (row.level === "WARNING") colorScheme = "warning";
        if (row.level === "ERROR") colorScheme = "danger";
        if (row.level === "CRITICAL") colorScheme = "danger";

        return (
          <Chips
            colorScheme={colorScheme}
            variant="soft"
            label={row.level}
            size="sm"
            className="text-[10px]"
          />
        );
      },
    },
    {
      header: "Source",
      accessor: "source",
      className: "font-medium text-slate-700 w-32",
    },
    {
      header: "Message",
      accessor: "message",
      className: "text-slate-600",
    },
  ];

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3" className="text-slate-900">
            Plant Dashboard
          </Typography>
          <Typography variant="p" className="text-slate-500">
            Real-time production & process capability monitoring
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCcw size={16} />}
          >
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} padding="md" className="border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <Typography
                  variant="small"
                  className="font-medium text-slate-500"
                >
                  {stat.label}
                </Typography>
                <div className="mt-2">
                  <Typography variant="h4" className="text-slate-900">
                    {stat.value}
                  </Typography>
                  <Typography variant="small" className="text-slate-400 mt-1">
                    {stat.description}
                  </Typography>
                </div>
              </div>
              <div className={`p-2 rounded-lg ${stat.color}`}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h6" className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#707FDD]" />
                Hourly Output (Kg)
              </Typography>
              <div className="flex gap-2">
                <Chips
                  label="Today"
                  variant="filled"
                  colorScheme="default"
                  className="bg-slate-800 text-white"
                />
                <Chips label="Week" variant="soft" colorScheme="default" />
              </div>
            </div>
            <Chart
              data={TRAFFIC_DATA}
              labels={TRAFFIC_LABELS}
              height={300}
              gradientFrom="from-[#707FDD]"
              gradientTo="to-[#a3adf3]"
            />
          </Card>

          <Card className="p-0 border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <Typography variant="h6" className="flex items-center gap-2">
                <Server className="w-5 h-5 text-slate-700" />
                Process & Maintenance Logs
              </Typography>
              <Button variant="ghost" size="sm" className="text-slate-500">
                View All
              </Button>
            </div>
            <Table
              data={MOCK_LOGS}
              columns={logColumns}
              headerAlign="left"
              keyExtractor={(item) => item.id}
              emptyMessage="No logs available."
              paginationConfig={{
                currentPage: 1,
                totalPages: 1,
                totalCount: MOCK_LOGS.length,
                onPageChange: () => {},
                itemsPerPage: 5,
              }}
            />
          </Card>
        </div>

        {/* Side Panel: Line Status & Chemical Levels */}
        <div className="space-y-6">
          {/* Service Status */}
          <Card className="p-6 border-slate-200">
            <Typography variant="h6" className="mb-4">
              Plating Line Status
            </Typography>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <div>
                    <Typography
                      variant="p"
                      className="font-medium text-emerald-900"
                    >
                      Alkaline Zinc Line 1
                    </Typography>
                    <Typography variant="small" className="text-emerald-700">
                      Running - Batch #4591
                    </Typography>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <div>
                    <Typography
                      variant="p"
                      className="font-medium text-emerald-900"
                    >
                      Zinc Nickel Line
                    </Typography>
                    <Typography variant="small" className="text-emerald-700">
                      Running - OEM Parts
                    </Typography>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <div>
                    <Typography
                      variant="p"
                      className="font-medium text-amber-900"
                    >
                      Zinc Iron Line
                    </Typography>
                    <Typography variant="small" className="text-amber-700">
                      Maintenance - Heating
                    </Typography>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-slate-400" />
                  <div>
                    <Typography
                      variant="p"
                      className="font-medium text-slate-700"
                    >
                      ED Coating Plant
                    </Typography>
                    <Typography variant="small" className="text-slate-500">
                      Scheduled Downtime
                    </Typography>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              </div>
            </div>
          </Card>

          {/* Chemical Tank Levels */}
          <Card className="p-6 border-slate-200">
            <Typography variant="h6" className="mb-4">
              Chemical Tank Levels
            </Typography>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <Typography variant="small" className="font-medium">
                    Zinc Anode (Tank 1)
                  </Typography>
                  <Typography variant="small" className="text-slate-500">
                    85%
                  </Typography>
                </div>
                <ProgressBar progress={85} size="sm" variant="success" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Typography variant="small" className="font-medium">
                    Nickel Bath (Tank 3)
                  </Typography>
                  <Typography variant="small" className="text-slate-500">
                    42%
                  </Typography>
                </div>
                <ProgressBar progress={42} size="sm" variant="warning" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Typography variant="small" className="font-medium">
                    Acid Pickle (Tank 5)
                  </Typography>
                  <Typography variant="small" className="text-slate-500">
                    12%
                  </Typography>
                </div>
                <ProgressBar progress={12} size="sm" variant="danger" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#707FDD] to-[#5a67c4] text-white">
            <Typography variant="h6" className="mb-2 text-white">
              Plant Status
            </Typography>
            <Typography variant="p" className="text-blue-100 mb-4 text-sm">
              Production is on schedule. Zinc Nickel metrics are optimal. Acid
              Pickle refill needed.
            </Typography>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">92%</span>
              <span className="px-2 py-0.5 bg-white/20 rounded text-xs">
                OEE
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MonitoringCompt;
