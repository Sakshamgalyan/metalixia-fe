'use client';

import {
  Activity,
  Server,
  Cpu,
  Globe,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCcw,
  TrendingUp,
} from 'lucide-react';
import Typography from '@/components/UI/Typography';
import Chart from '@/components/UI/Chart';
import Table, { TableColumn } from '@/components/UI/Table';
import ProgressBar from '@/components/UI/ProgressBar';
import Button from '@/components/UI/Button';
import Chips from '@/components/UI/Chips';
import { motion } from 'framer-motion';

// Mock Data Interfaces
interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  source: string;
  message: string;
}

// Mock Data
const MOCK_LOGS: SystemLog[] = [
  {
    id: '1',
    timestamp: '2024-02-18 10:45:22',
    level: 'INFO',
    source: 'Zinc Line 2',
    message: 'Batch #4590 completed successfully. Thickness: 12 microns.',
  },
  {
    id: '2',
    timestamp: '2024-02-18 10:42:15',
    level: 'WARNING',
    source: 'Rectifier 4',
    message: 'High temperature alert (75°C) on Zinc Nickel line.',
  },
  {
    id: '3',
    timestamp: '2024-02-18 10:38:00',
    level: 'INFO',
    source: 'Maintenance',
    message: 'Alkaline Zinc bath filtration changed.',
  },
  {
    id: '4',
    timestamp: '2024-02-18 10:30:45',
    level: 'ERROR',
    source: 'Auto Hoist',
    message: 'Sensor timeout at Station 4 (Pickling Tank).',
  },
  {
    id: '5',
    timestamp: '2024-02-18 10:25:11',
    level: 'INFO',
    source: 'Quality',
    message: 'Hourly salt spray test passed for Zn-Ni batch.',
  },
];

const TRAFFIC_DATA = [
  450, 600, 750, 500, 800, 950, 700, 850, 600, 900, 1000, 850,
];
const TRAFFIC_LABELS = [
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const MonitoringCompt = () => {
  const stats = [
    {
      label: 'Daily Production',
      value: '12.4 Tons',
      description: 'Target: 15 Tons',
      icon: <Activity size={20} />,
      gradient: 'from-blue-500 to-blue-700',
      shadow: 'shadow-blue-500/25',
      hoverShadow: 'hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]',
      orbBg: 'bg-blue-500/8',
      orbHover: 'group-hover:bg-blue-500/15',
      borderAccent: 'via-blue-400/30',
    },
    {
      label: 'Active Lines',
      value: '3 / 4',
      description: 'Zinc, Zn-Ni Running',
      icon: <Server size={20} />,
      gradient: 'from-violet-500 to-violet-700',
      shadow: 'shadow-violet-500/25',
      hoverShadow: 'hover:shadow-[0_8px_40px_rgba(139,92,246,0.12)]',
      orbBg: 'bg-violet-500/8',
      orbHover: 'group-hover:bg-violet-500/15',
      borderAccent: 'via-violet-400/30',
    },
    {
      label: 'Plant Efficiency',
      value: '92%',
      description: 'OEE Score',
      icon: <Globe size={20} />,
      gradient: 'from-emerald-500 to-emerald-700',
      shadow: 'shadow-emerald-500/25',
      hoverShadow: 'hover:shadow-[0_8px_40px_rgba(16,185,129,0.12)]',
      orbBg: 'bg-emerald-500/8',
      orbHover: 'group-hover:bg-emerald-500/15',
      borderAccent: 'via-emerald-400/30',
    },
    {
      label: 'Power Load',
      value: '450 kW',
      description: 'Peak: 480 kW',
      icon: <Cpu size={20} />,
      gradient: 'from-amber-500 to-amber-700',
      shadow: 'shadow-amber-500/25',
      hoverShadow: 'hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)]',
      orbBg: 'bg-amber-500/8',
      orbHover: 'group-hover:bg-amber-500/15',
      borderAccent: 'via-amber-400/30',
    },
  ];

  // Table Columns
  const logColumns: TableColumn<SystemLog>[] = [
    {
      header: 'Timestamp',
      accessor: 'timestamp',
      className: 'text-slate-500 text-xs w-40',
    },
    {
      header: 'Level',
      accessor: 'level',
      className: 'w-28',
      render: (row) => {
        let colorScheme: 'success' | 'warning' | 'danger' | 'default' =
          'default';
        if (row.level === 'WARNING') colorScheme = 'warning';
        if (row.level === 'ERROR') colorScheme = 'danger';
        if (row.level === 'CRITICAL') colorScheme = 'danger';

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
      header: 'Source',
      accessor: 'source',
      className: 'font-medium text-slate-700 w-32',
    },
    {
      header: 'Message',
      accessor: 'message',
      className: 'text-slate-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const cardVariants: any = {
    hidden: { y: 24, opacity: 0, scale: 0.97 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <Typography variant="h3" className="text-slate-900 font-black">
            Plant Dashboard
          </Typography>
          <Typography variant="p" className="text-slate-400 mt-0.5">
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
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              y: -6,
              transition: { duration: 0.25, ease: 'easeOut' },
            }}
            className={`relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.04)] ${stat.hoverShadow} transition-all duration-400 group`}
          >
            {/* Decorative gradient orb */}
            <div
              className={`absolute -top-12 -right-12 w-32 h-32 ${stat.orbBg} rounded-full blur-2xl ${stat.orbHover} transition-colors duration-500`}
            />
            <div
              className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${stat.borderAccent} to-transparent`}
            />

            <div className="relative p-5">
              <div className="flex items-start justify-between">
                <div>
                  <Typography
                    variant="small"
                    className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.14em]"
                  >
                    {stat.label}
                  </Typography>
                  <div className="mt-2">
                    <Typography
                      variant="h4"
                      className="text-slate-900 font-black text-xl tracking-tight tabular-nums"
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-slate-400 mt-0.5 text-[11px] font-medium"
                    >
                      {stat.description}
                    </Typography>
                  </div>
                </div>
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg ${stat.shadow} group-hover:scale-110 transition-all duration-300`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Hourly Output Chart */}
          <div className="relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.04)]">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />

            <div className="relative p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#707FDD] to-[#5563c9] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <TrendingUp
                      size={16}
                      className="text-white stroke-[2.5px]"
                    />
                  </div>
                  <Typography variant="h6" className="text-slate-800 font-bold">
                    Hourly Output (Kg)
                  </Typography>
                </div>
                <div className="flex gap-2">
                  <Chips
                    label="Today"
                    variant="filled"
                    colorScheme="default"
                    className="bg-slate-800 text-white text-[10px]"
                  />
                  <Chips
                    label="Week"
                    variant="soft"
                    colorScheme="default"
                    className="text-[10px]"
                  />
                </div>
              </div>
              <Chart
                data={TRAFFIC_DATA}
                labels={TRAFFIC_LABELS}
                height={300}
                type="area"
                color="#707FDD"
                showGridLines
              />
            </div>
          </div>

          {/* Logs Table */}
          <div className="relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.04)]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Server size={15} className="text-slate-600" />
                </div>
                <Typography variant="h6" className="text-slate-800 font-bold">
                  Process & Maintenance Logs
                </Typography>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-500 text-xs"
              >
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
          </div>
        </motion.div>

        {/* Side Panel */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Plating Line Status */}
          <div className="relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.04)]">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl" />

            <div className="relative p-6">
              <Typography
                variant="h6"
                className="mb-4 font-bold text-slate-800"
              >
                Plating Line Status
              </Typography>
              <div className="space-y-3">
                {/* Running Lines */}
                {[
                  {
                    name: 'Alkaline Zinc Line 1',
                    status: 'Running - Batch #4591',
                  },
                  { name: 'Zinc Nickel Line', status: 'Running - OEM Parts' },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-100/80"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                      <div>
                        <Typography
                          variant="p"
                          className="font-semibold text-emerald-900 text-sm"
                        >
                          {line.name}
                        </Typography>
                        <Typography
                          variant="small"
                          className="text-emerald-600 text-[11px]"
                        >
                          {line.status}
                        </Typography>
                      </div>
                    </div>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  </motion.div>
                ))}

                {/* Maintenance */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.62 }}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/80 border border-amber-100/80"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4.5 h-4.5 text-amber-600" />
                    <div>
                      <Typography
                        variant="p"
                        className="font-semibold text-amber-900 text-sm"
                      >
                        Zinc Iron Line
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-amber-600 text-[11px]"
                      >
                        Maintenance - Heating
                      </Typography>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                </motion.div>

                {/* Offline */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.68 }}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/60"
                >
                  <div className="flex items-center gap-3">
                    <XCircle className="w-4.5 h-4.5 text-slate-400" />
                    <div>
                      <Typography
                        variant="p"
                        className="font-semibold text-slate-600 text-sm"
                      >
                        ED Coating Plant
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-slate-400 text-[11px]"
                      >
                        Scheduled Downtime
                      </Typography>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Chemical Tank Levels */}
          <div className="relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.04)]">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/5 rounded-full blur-2xl" />

            <div className="relative p-6">
              <Typography
                variant="h6"
                className="mb-5 font-bold text-slate-800"
              >
                Chemical Tank Levels
              </Typography>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <Typography
                      variant="small"
                      className="font-semibold text-slate-700 text-[12px]"
                    >
                      Zinc Anode (Tank 1)
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-emerald-600 font-bold text-[12px]"
                    >
                      85%
                    </Typography>
                  </div>
                  <ProgressBar progress={85} size="sm" variant="success" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Typography
                      variant="small"
                      className="font-semibold text-slate-700 text-[12px]"
                    >
                      Nickel Bath (Tank 3)
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-amber-600 font-bold text-[12px]"
                    >
                      42%
                    </Typography>
                  </div>
                  <ProgressBar progress={42} size="sm" variant="warning" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Typography
                      variant="small"
                      className="font-semibold text-slate-700 text-[12px]"
                    >
                      Acid Pickle (Tank 5)
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-red-500 font-bold text-[12px]"
                    >
                      12%
                    </Typography>
                  </div>
                  <ProgressBar progress={12} size="sm" variant="danger" />
                </div>
              </div>
            </div>
          </div>

          {/* Plant Status Summary */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(112,127,221,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#707FDD] to-[#4f5ab3]" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />

            <div className="relative p-6">
              <Typography variant="h6" className="mb-2 text-white font-bold">
                Plant Status
              </Typography>
              <Typography
                variant="p"
                className="text-blue-100/80 mb-5 text-[12px] leading-relaxed"
              >
                Production is on schedule. Zinc Nickel metrics are optimal. Acid
                Pickle refill needed.
              </Typography>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-white tracking-tight">
                  92%
                </span>
                <span className="px-2.5 py-1 bg-white/15 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm border border-white/10">
                  OEE
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MonitoringCompt;
