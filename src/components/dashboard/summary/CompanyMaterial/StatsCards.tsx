import Chart from '@/components/UI/Chart';
import Typography from '@/components/UI/Typography';
import { Building2, CalendarDays, Package, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  statsData: any;
  statsLoading: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  statsData,
  statsLoading,
}) => {
  const dailyCounts = statsData?.dailyCounts || [];
  const chartData = dailyCounts.map((d: any) => d.count);
  const chartLabels = dailyCounts.map((d: any) => {
    const date = new Date(d.date);
    return date.toLocaleDateString('en-IN', { weekday: 'short' });
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      {/* Card 1: Materials Received (Bar Chart) */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm p-5 group hover:shadow-md transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#707FDD] to-[#5a67c4] flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <Typography
              variant="p"
              className="text-slate-500 text-xs font-medium uppercase tracking-wider"
            >
              Last 7 Days
            </Typography>
          </div>
          <div className="flex items-end justify-between mt-2">
            <div>
              <Typography
                variant="h3"
                className="text-slate-900 text-2xl font-bold"
              >
                {statsLoading ? '...' : (statsData?.totalThisWeek ?? 0)}
              </Typography>
              <Typography variant="p" className="text-slate-500 text-xs">
                Materials received
              </Typography>
            </div>
          </div>
          <div className="mt-4">
            {chartData.length > 0 && !statsLoading ? (
              <Chart
                data={chartData}
                labels={chartLabels}
                height={80}
                color="#707FDD"
                gradientFrom="from-[#707FDD]"
                gradientTo="to-[#a5b0f0]"
                labelColor="text-indigo-400"
                showXAxis
              />
            ) : (
              <div className="h-[80px] flex items-center justify-center text-xs text-slate-400">
                {statsLoading ? 'Loading...' : 'No data'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card 2: Total Quantity */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm p-5 group hover:shadow-md transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <Typography
              variant="p"
              className="text-slate-500 text-xs font-medium uppercase tracking-wider"
            >
              Quantity This Week
            </Typography>
          </div>
          <div className="mt-2">
            <Typography
              variant="h3"
              className="text-slate-900 text-2xl font-bold"
            >
              {statsLoading
                ? '...'
                : (statsData?.totalQuantityThisWeek ?? 0).toLocaleString(
                    'en-IN',
                  )}
            </Typography>
            <Typography variant="p" className="text-slate-500 text-xs">
              Total units processed
            </Typography>
          </div>
          <div className="mt-4">
            {dailyCounts.length > 0 && !statsLoading ? (
              <Chart
                data={dailyCounts.map((d: any) => d.totalQuantity)}
                labels={chartLabels}
                height={80}
                color="#10b981"
                gradientFrom="from-emerald-500"
                gradientTo="to-emerald-300"
                labelColor="text-emerald-400"
                showXAxis
              />
            ) : (
              <div className="h-[80px] flex items-center justify-center text-xs text-slate-400">
                {statsLoading ? 'Loading...' : 'No data'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card 3: Active Companies */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm p-5 group hover:shadow-md transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Building2 size={16} className="text-white" />
            </div>
            <Typography
              variant="p"
              className="text-slate-500 text-xs font-medium uppercase tracking-wider"
            >
              Active Companies
            </Typography>
          </div>
          <div className="mt-2">
            <Typography
              variant="h3"
              className="text-slate-900 text-2xl font-bold"
            >
              {statsLoading ? '...' : (statsData?.activeCompanies ?? 0)}
            </Typography>
            <Typography variant="p" className="text-slate-500 text-xs">
              Companies this week
            </Typography>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <CalendarDays size={14} className="text-amber-500" />
            <Typography variant="p" className="text-slate-500 text-xs">
              Last 7 days activity
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
