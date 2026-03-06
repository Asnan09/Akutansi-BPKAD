import { memo, useMemo } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import type { ChartOptions, ScriptableContext } from "chart.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type CategoryValue =
  | "all"
  | "Lampiran"
  | "Keuangan"
  | "BKU"
  | "STS"
  | "Rekening Koran";

type Props = {
  data: { label: string; value: number }[];
  animationNonce: number;
  selectedCategory: CategoryValue;
  selectedMonth: number;
  selectedYear: number;
  onChangeCategory: (v: CategoryValue) => void;
  onChangeMonth: (v: number) => void;
  onChangeYear: (v: number) => void;
  categoryOptions: readonly CategoryValue[];
  monthOptions: { value: number; label: string }[];
  yearOptions: number[];
};

type DistributionCanvasProps = {
  chartKey: string;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderRadius: number;
      borderSkipped: boolean;
      maxBarThickness: number;
    }[];
  };
  options: ChartOptions<"bar">;
};

const DistributionCanvas = memo(
  function DistributionCanvas({ chartKey, chartData, options }: DistributionCanvasProps) {
    return <Bar key={chartKey} data={chartData} options={options} updateMode="none" />;
  },
  (prev, next) => prev.chartKey === next.chartKey,
);

const CATEGORY_COLORS: Record<string, string> = {
  Lampiran: "#F97316",
  Keuangan: "#3B82F6",
  BKU: "#14B8A6",
  STS: "#6366F1",
  "Rekening Koran": "#EC4899",
};

function DashboardDistributionChart(props: Props) {
  const {
    data,
    animationNonce,
    selectedCategory,
    selectedMonth,
    selectedYear,
    onChangeCategory,
    onChangeMonth,
    onChangeYear,
    categoryOptions,
    monthOptions,
    yearOptions,
  } = props;

  const chartKey = useMemo(() => `distribution-${animationNonce}`, [animationNonce]);

  const chartData = useMemo(
    () => ({
      labels: data.map((d) => d.label),
      datasets: [
        {
          label: "Jumlah Upload",
          data: data.map((d) => d.value),
          backgroundColor: data.map((d) => CATEGORY_COLORS[d.label] ?? "#94A3B8"),
          borderRadius: 10,
          borderSkipped: false,
          maxBarThickness: 56,
        },
      ],
    }),
    [data],
  );

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 850,
        easing: "easeOutQuart",
      },
      animations: {
        y: {
          from: (ctx: ScriptableContext<"bar">) => {
            if (ctx.type !== "data") return 0;
            const yScale = ctx.chart.scales.y;
            return yScale ? yScale.getPixelForValue(0) : 0;
          },
          duration: (ctx: ScriptableContext<"bar">) =>
            ctx.mode === "resize" ? 0 : 850,
          easing: "easeOutCubic",
          delay: (ctx: ScriptableContext<"bar">) =>
            ctx.mode === "default" && ctx.type === "data" ? ctx.dataIndex * 110 : 0,
        },
      },
      transitions: {
        resize: { animation: { duration: 0 } },
        active: { animation: { duration: 0 } },
      },
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { precision: 0, color: "#64748B" },
          grid: { color: "rgba(148,163,184,0.15)" },
        },
        x: {
          grid: { display: false },
          ticks: { color: "#475569" },
        },
      },
    }),
    [],
  );

  const selectClass =
    "h-10 w-full xl:w-[124px] rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 " +
    "transition-none focus:outline-none focus:ring-0 focus:border-slate-200 focus-visible:ring-0";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 whitespace-nowrap">
          Jumlah Dokumen
        </h3>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 xl:w-auto">
          <Select
            value={selectedCategory}
            onValueChange={(v) => onChangeCategory(v as CategoryValue)}
          >
            <SelectTrigger className={selectClass}>
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent className="max-h-[12.5rem]">
              {categoryOptions.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === "all" ? "Kategori" : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={String(selectedMonth)} onValueChange={(v) => onChangeMonth(Number(v))}>
            <SelectTrigger className={selectClass}>
              <SelectValue placeholder="Semua Bulan" />
            </SelectTrigger>
            <SelectContent className="max-h-[12.5rem]">
              {monthOptions.map((m) => (
                <SelectItem key={m.value} value={String(m.value)}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={String(selectedYear)} onValueChange={(v) => onChangeYear(Number(v))}>
            <SelectTrigger className={selectClass}>
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent className="max-h-[12.5rem]">
              <SelectItem value="0">Tahun</SelectItem>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[300px]">
        <DistributionCanvas chartKey={chartKey} chartData={chartData} options={options} />
      </div>
    </div>
  );
}

function arePropsEqual(prev: Props, next: Props) {
  if (prev.animationNonce !== next.animationNonce) return false;
  if (prev.selectedCategory !== next.selectedCategory) return false;
  if (prev.selectedMonth !== next.selectedMonth) return false;
  if (prev.selectedYear !== next.selectedYear) return false;
  if (prev.data.length !== next.data.length) return false;

  for (let i = 0; i < prev.data.length; i += 1) {
    if (prev.data[i].label !== next.data[i].label) return false;
    if (prev.data[i].value !== next.data[i].value) return false;
  }

  return true;
}

export default memo(DashboardDistributionChart, arePropsEqual);
