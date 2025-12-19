import { useMemo } from "react";
import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

import LoadingIndicator from "../Feedback/LoadingIndicator";
import EmptyState from "../Feedback/EmptyState";
import MetricSelector from "../MultiSelect/MetricSelector";

import type { MetricKey } from "../../hooks/useAnalyticsData";

type AvgEntry = {
  label: string;
  avgTemp: number;
  avgPH: number;
  avgRain: number;
};

const BAR_METRIC_COLORS: Record<MetricKey, string> = {
  avgTemp: "#fb923c",
  avgPH: "#a78bfa",
  avgRain: "#22d3ee",
};

const METRIC_LABELS: Record<MetricKey, string> = {
  avgTemp: "Temperatura Media (°C)",
  avgPH: "pH Medio (%)",
  avgRain: "Pioggia Media (mm)",
};

type HorizontalBarChartProps = {
  data: AvgEntry[];
  selectedMetric: MetricKey;
  onMetricChange: (metric: MetricKey) => void;
  isLoading: boolean;
  height?: number;
};

export default function HorizontalBarChart({
  data,
  selectedMetric,
  onMetricChange,
  isLoading,
  height = 500,
}: HorizontalBarChartProps) {
  // Dati chart
  const chartData = useMemo(() => {
    if (!data.length) {
      return { labels: [], datasets: [] };
    }

    const sorted = [...data].sort((a, b) =>
      a.label.localeCompare(b.label)
    );

    return {
      labels: sorted.map((d) => d.label),
      datasets: [
        {
          label: METRIC_LABELS[selectedMetric],
          data: sorted.map((d) => d[selectedMetric]),
          backgroundColor: BAR_METRIC_COLORS[selectedMetric],
          borderRadius: 6,
          minBarLength: 5,
          barThickness: 16,
        },
      ],
    };
  }, [data, selectedMetric]);

  // Opzioni chart
  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: METRIC_LABELS[selectedMetric],
          font: { size: 16, weight: "bold" },
          color: "#1f2937",
          align: "start",
          padding: { bottom: 20 },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: (ctx) => {
              const value =
                typeof ctx.parsed.x === "number"
                  ? ctx.parsed.x.toFixed(2)
                  : ctx.parsed.x;
              return `${ctx.dataset.label}: ${value}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Valore Medio" },
          grid: { color: "#e5e7eb" },
        },
        y: { grid: { display: false } },
      },
    }),
    [selectedMetric]
  );

  return (
    <div className="w-full">
      {/* Header con selector */}
      <div className="flex justify-end mb-4">
        <MetricSelector
          selected={selectedMetric}
          onSelect={onMetricChange}
        />
      </div>

      <div style={{ height: `${height}px`, width: "100%" }}>
        {isLoading ? (
          <LoadingIndicator text="Caricamento dati..." className="h-full" />
        ) : chartData.labels.length === 0 ? (
          <EmptyState message="Nessuna coltura selezionata o dati non disponibili." />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
