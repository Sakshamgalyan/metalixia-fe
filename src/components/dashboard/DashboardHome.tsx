'use client';

import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Box,
  AlertTriangle,
  Truck,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';
import Typography from '@/components/UI/Typography';
import Chart from '@/components/UI/Chart';
import { motion } from 'framer-motion';

const DashboardHome = () => {
  const stats = [
    {
      label: 'Production Output',
      value: '1,240',
      unit: 'Units',
      trend: '+12%',
      trendUp: true,
      icon: <Box size={20} />,
      accent: 'violet',
      gradient: 'from-violet-500 to-violet-700',
      shadow: 'shadow-violet-500/25',
      hoverShadow: 'hover:shadow-[0_8px_40px_rgba(124,58,237,0.12)]',
      orbBg: 'bg-violet-500/8',
      orbHover: 'group-hover:bg-violet-500/15',
      trendBg: 'bg-violet-50',
      trendText: 'text-violet-700',
      borderAccent: 'via-violet-400/30',
    },
    {
      label: 'Active Employees',
      value: '84',
      unit: 'On Shift',
      trend: '+4',
      trendUp: true,
      icon: <Users size={20} />,
      accent: 'emerald',
      gradient: 'from-emerald-500 to-emerald-700',
      shadow: 'shadow-emerald-500/25',
      hoverShadow: 'hover:shadow-[0_8px_40px_rgba(16,185,129,0.12)]',
      orbBg: 'bg-emerald-500/8',
      orbHover: 'group-hover:bg-emerald-500/15',
      trendBg: 'bg-emerald-50',
      trendText: 'text-emerald-700',
      borderAccent: 'via-emerald-400/30',
    },
    {
      label: 'Efficiency Rate',
      value: '94.2',
      unit: '%',
      trend: '-1.5%',
      trendUp: false,
      icon: <Activity size={20} />,
      accent: 'amber',
      gradient: 'from-amber-500 to-amber-700',
      shadow: 'shadow-amber-500/25',
      hoverShadow: 'hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)]',
      orbBg: 'bg-amber-500/8',
      orbHover: 'group-hover:bg-amber-500/15',
      trendBg: 'bg-red-50',
      trendText: 'text-red-600',
      borderAccent: 'via-amber-400/30',
    },
    {
      label: 'Safety Incidents',
      value: '0',
      unit: 'This Month',
      trend: '0',
      trendUp: true,
      icon: <AlertTriangle size={20} />,
      accent: 'cyan',
      gradient: 'from-cyan-500 to-cyan-700',
      shadow: 'shadow-cyan-500/25',
      hoverShadow: 'hover:shadow-[0_8px_40px_rgba(6,182,212,0.12)]',
      orbBg: 'bg-cyan-500/8',
      orbHover: 'group-hover:bg-cyan-500/15',
      trendBg: 'bg-green-50',
      trendText: 'text-green-700',
      borderAccent: 'via-cyan-400/30',
    },
  ];

  const activities = [
    {
      id: 1,
      type: 'System',
      message: 'Automated backup completed successfully.',
      time: '10 min ago',
      status: 'success',
    },
    {
      id: 2,
      type: 'Security',
      message: 'Door 4A forced open alert cleared.',
      time: '45 min ago',
      status: 'warning',
    },
    {
      id: 3,
      type: 'Production',
      message: 'Line B maintenance schedule created.',
      time: '2 hours ago',
      status: 'info',
    },
    {
      id: 4,
      type: 'Employee',
      message: 'Shift A check-in completed.',
      time: '4 hours ago',
      status: 'success',
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
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" className="text-slate-900 font-black">
          Factory Overview
        </Typography>
        <Typography variant="p" className="text-slate-400 mt-1">
          Real-time production and system status monitoring
        </Typography>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
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

            <div className="relative p-6">
              <div className="flex justify-between items-start mb-5">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg ${stat.shadow} group-hover:scale-110 transition-all duration-300`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.trendBg} ${stat.trendText}`}
                >
                  {stat.trendUp ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}
                  {stat.trend}
                </div>
              </div>
              <div>
                <h3 className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.14em]">
                  {stat.label}
                </h3>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {stat.unit}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Column */}
        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Production Efficiency Chart */}
          <div className="relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.04)]">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />

            <div className="relative p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#707FDD] to-[#5563c9] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <TrendingUp
                      size={16}
                      className="text-white stroke-[2.5px]"
                    />
                  </div>
                  <Typography variant="h5" className="text-slate-800 font-bold">
                    Production Efficiency
                  </Typography>
                </div>
                <select className="text-xs border border-slate-200 rounded-lg text-slate-500 focus:ring-0 px-3 py-1.5 bg-slate-50 font-medium">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                </select>
              </div>

              <Chart
                data={[
                  65, 59, 80, 81, 56, 55, 40, 70, 75, 50, 60, 90, 85, 95, 100,
                  80, 70, 60, 50, 40, 55, 65, 75, 85,
                ]}
                height={300}
                type="area"
                color="#707FDD"
                showGridLines
                className="px-2 relative z-10"
                showXAxis={false}
              />

              <div className="flex justify-between mt-5 text-[10px] font-bold text-slate-400 px-2 uppercase tracking-[0.14em]">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
              </div>
            </div>
          </div>

          {/* Logistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dispatch Chart */}
            <div className="relative bg-[#111827] rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.15)] group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <Truck size={16} className="text-white stroke-[2.5px]" />
                  </div>
                  <Typography
                    variant="h6"
                    className="text-white font-semibold text-sm"
                  >
                    Outbound Logistics
                  </Typography>
                </div>

                <Chart
                  data={[40, 60, 45, 70, 50, 80, 65]}
                  height={180}
                  gradientFrom="from-emerald-600"
                  gradientTo="to-emerald-400"
                  labelColor="text-emerald-400"
                  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                  showXAxis={true}
                  showGridLines
                />
              </div>
            </div>

            {/* Incoming Chart */}
            <div className="relative bg-[#111827] rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.15)] group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />

              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <Box size={16} className="text-white stroke-[2.5px]" />
                  </div>
                  <Typography
                    variant="h6"
                    className="text-white font-semibold text-sm"
                  >
                    Inbound Inventory
                  </Typography>
                </div>

                <Chart
                  data={[30, 45, 60, 40, 75, 50, 55]}
                  height={180}
                  type="line"
                  color="#818cf8"
                  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                  showXAxis={true}
                  showGridLines
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.04)]"
        >
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-slate-500/5 rounded-full blur-2xl" />

          <div className="relative p-6">
            <Typography
              variant="h5"
              className="mb-6 flex items-center gap-2.5 text-slate-800 font-bold"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <Clock size={16} className="text-slate-600" />
              </div>
              Recent Activity
            </Typography>

            <div className="space-y-5">
              {activities.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  className="flex gap-4 relative"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.08 }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1.5 ring-4 ${
                        activity.status === 'success'
                          ? 'bg-emerald-500 ring-emerald-500/15'
                          : activity.status === 'warning'
                            ? 'bg-amber-500 ring-amber-500/15'
                            : 'bg-indigo-500 ring-indigo-500/15'
                      }`}
                    />
                    {activity.id !== activities.length && (
                      <div className="w-px bg-gradient-to-b from-slate-200 to-transparent h-full absolute top-5 bottom-[-12px]" />
                    )}
                  </div>
                  <div className="pb-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.12em]">
                        {activity.type}
                      </span>
                      <span className="text-[10px] text-slate-300 font-medium">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-snug">
                      {activity.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-6 py-2.5 text-xs text-[#707FDD] font-bold uppercase tracking-wider hover:bg-indigo-50/50 rounded-xl transition-colors border border-transparent hover:border-indigo-100">
              View All Logs
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
