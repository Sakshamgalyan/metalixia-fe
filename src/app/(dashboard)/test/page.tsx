'use client';

import Chart from '@/components/UI/Chart';
import Typography from '@/components/UI/Typography';
import type {
  ScatterPoint,
  BubblePoint,
  BoxPlotItem,
  HeatmapData,
  GanttItem,
} from '@/components/UI/Chart';

// ─── Sample data ────────────────────────────────────────────────────────────

const barData = [65, 59, 80, 81, 56, 55, 40, 70, 75, 50, 60, 90];
const barLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const lineData = [30, 45, 28, 60, 72, 55, 90, 68, 82, 75];
const lineLabels = [
  'W1',
  'W2',
  'W3',
  'W4',
  'W5',
  'W6',
  'W7',
  'W8',
  'W9',
  'W10',
];

const pieData = [35, 25, 20, 12, 8];
const pieLabels = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'];

const histogramData = [12, 19, 25, 33, 45, 50, 42, 36, 28, 18, 10, 5, 3, 1];
const histogramLabels = ['0-10', '10-20', '20-30', '30-40'];

const scatterData: ScatterPoint[] = [
  { x: 10, y: 20, label: 'Alpha' },
  { x: 25, y: 45, label: 'Beta' },
  { x: 40, y: 30, label: 'Gamma' },
  { x: 55, y: 70, label: 'Delta' },
  { x: 60, y: 50, label: 'Epsilon' },
  { x: 75, y: 85, label: 'Zeta' },
  { x: 80, y: 40, label: 'Eta' },
  { x: 90, y: 65, label: 'Theta' },
  { x: 30, y: 55, label: 'Iota' },
  { x: 50, y: 25, label: 'Kappa' },
  { x: 15, y: 72, label: 'Lambda' },
  { x: 70, y: 88, label: 'Mu' },
];

const areaData = [20, 35, 25, 50, 45, 70, 60, 85, 75, 90, 80, 95];
const areaLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const bubbleData: BubblePoint[] = [
  { x: 20, y: 30, r: 15, label: 'Project A' },
  { x: 40, y: 60, r: 25, label: 'Project B' },
  { x: 60, y: 40, r: 10, label: 'Project C' },
  { x: 80, y: 70, r: 35, label: 'Project D' },
  { x: 30, y: 80, r: 20, label: 'Project E' },
  { x: 70, y: 20, r: 18, label: 'Project F' },
  { x: 50, y: 50, r: 30, label: 'Project G' },
];

const boxPlotData: BoxPlotItem[] = [
  { label: 'Q1', min: 10, q1: 25, median: 40, q3: 55, max: 70 },
  { label: 'Q2', min: 15, q1: 30, median: 50, q3: 65, max: 80 },
  { label: 'Q3', min: 20, q1: 35, median: 45, q3: 60, max: 75 },
  { label: 'Q4', min: 5, q1: 20, median: 35, q3: 50, max: 90 },
  { label: 'Q5', min: 12, q1: 28, median: 42, q3: 58, max: 72 },
];

const radarData = [85, 70, 90, 60, 75, 80];
const radarLabels = [
  'Speed',
  'Power',
  'Defense',
  'Range',
  'Stealth',
  'Agility',
];

const heatmapData: HeatmapData = {
  rows: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  cols: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm'],
  values: [
    [2, 5, 8, 12, 6, 4, 7, 3],
    [3, 7, 10, 15, 9, 5, 8, 4],
    [1, 4, 6, 10, 5, 3, 6, 2],
    [4, 8, 12, 18, 10, 7, 9, 5],
    [2, 6, 9, 14, 8, 4, 7, 3],
  ],
};

const ganttData: GanttItem[] = [
  { label: 'Research', start: 0, end: 3, color: '#707FDD' },
  { label: 'Design', start: 2, end: 5, color: '#8b5cf6' },
  { label: 'Develop', start: 4, end: 9, color: '#10b981' },
  { label: 'Testing', start: 7, end: 10, color: '#f59e0b' },
  { label: 'Deploy', start: 9, end: 11, color: '#ef4444' },
  { label: 'Monitor', start: 10, end: 12, color: '#06b6d4' },
];

// ─── Card wrapper ───────────────────────────────────────────────────────────

const ChartCard = ({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300 ${className}`}
  >
    <div className="mb-5">
      <Typography variant="h5" className="text-slate-800 font-bold text-sm">
        {title}
      </Typography>
      <Typography variant="p" className="text-slate-400 text-[11px] mt-0.5">
        {subtitle}
      </Typography>
    </div>
    {children}
  </div>
);

// ─── Page ───────────────────────────────────────────────────────────────────

export default function TestChartsPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-10">
        <Typography variant="h2" className="text-slate-900 font-black">
          Chart Gallery
        </Typography>
        <Typography variant="p" className="text-slate-500 mt-1">
          All 14 chart types rendered with the unified{' '}
          <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600">
            {'<Chart />'}
          </code>{' '}
          component
        </Typography>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* 1. Bar Chart */}
        <ChartCard title="Bar Chart" subtitle="Monthly performance metrics">
          <Chart
            data={barData}
            labels={barLabels}
            height={220}
            type="bar"
            gradientFrom="from-[#707FDD]"
            gradientTo="to-[#a5b0f0]"
            labelColor="text-indigo-400"
            showGridLines
          />
        </ChartCard>

        {/* 2. Line Chart */}
        <ChartCard
          title="Line Chart"
          subtitle="Weekly trend with smooth Bézier interpolation"
        >
          <Chart
            data={lineData}
            labels={lineLabels}
            height={220}
            type="line"
            color="#8b5cf6"
            showGridLines
          />
        </ChartCard>

        {/* 3. Pie Chart */}
        <ChartCard
          title="Pie Chart"
          subtitle="Browser market share distribution"
        >
          <Chart data={pieData} labels={pieLabels} height={220} type="pie" />
        </ChartCard>

        {/* 4. Donut (pie with innerRadius) */}
        <ChartCard
          title="Donut Chart"
          subtitle="Same data as pie, with 60% inner cutout"
        >
          <Chart
            data={pieData}
            labels={pieLabels}
            height={220}
            type="pie"
            innerRadius={0.6}
          />
        </ChartCard>

        {/* 5. Histogram */}
        <ChartCard
          title="Histogram"
          subtitle="Continuous frequency distribution"
        >
          <Chart
            data={histogramData}
            labels={histogramLabels}
            height={220}
            type="histogram"
            color="#f59e0b"
            showGridLines
          />
        </ChartCard>

        {/* 6. Scatter Plot */}
        <ChartCard
          title="Scatter Plot"
          subtitle="Correlation between two variables"
        >
          <Chart
            type="scatter"
            scatterData={scatterData}
            height={220}
            color="#06b6d4"
            showGridLines
          />
        </ChartCard>

        {/* 7. Area Chart */}
        <ChartCard
          title="Area Chart"
          subtitle="Cumulative growth visualization"
        >
          <Chart
            data={areaData}
            labels={areaLabels}
            height={220}
            type="area"
            color="#10b981"
            showGridLines
          />
        </ChartCard>

        {/* 8. Bubble Chart */}
        <ChartCard
          title="Bubble Chart"
          subtitle="Multi-dimensional project comparison"
        >
          <Chart type="bubble" bubbleData={bubbleData} height={220} />
        </ChartCard>

        {/* 9. Box Plot */}
        <ChartCard
          title="Box Plot"
          subtitle="Statistical spread — min, Q1, median, Q3, max"
        >
          <Chart
            type="boxplot"
            boxPlotData={boxPlotData}
            labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']}
            height={220}
            showGridLines
          />
        </ChartCard>

        {/* 10. Radar Chart */}
        <ChartCard
          title="Radar Chart"
          subtitle="Spider chart for multi-axis comparison"
        >
          <Chart
            data={radarData}
            labels={radarLabels}
            height={260}
            type="radar"
            color="#ec4899"
          />
        </ChartCard>

        {/* 11. Heatmap */}
        <ChartCard
          title="Heatmap"
          subtitle="Activity intensity across time grid"
        >
          <Chart type="heatmap" heatmapData={heatmapData} height={200} />
        </ChartCard>

        {/* 12. Gantt Chart */}
        <ChartCard
          title="Gantt Chart"
          subtitle="Project timeline with overlapping phases"
        >
          <Chart type="gantt" ganttData={ganttData} height={220} />
        </ChartCard>
      </div>

      {/* Footer spacing */}
      <div className="h-16" />
    </div>
  );
}
