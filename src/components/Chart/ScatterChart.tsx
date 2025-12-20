import { useMemo } from "react";
import type { ChartOptions, ChartData } from "chart.js";
import { Scatter } from "react-chartjs-2";

import LoadingIndicator from "../Feedback/LoadingIndicator";
import EmptyState from "../Feedback/EmptyState";
import type { CropSample } from "../../types/crop";
import { getColor } from "../../utils/colorUtils";

type ScatterPoint = {
  x: number;
  y: number;
  crop: string;
  ph: number;
};

type ScatterChartProps = {
  samples: CropSample[];
  cropLabels: string[];
  isLoading: boolean;
  height?: number;
};

export default function ScatterChart({
  samples,
  cropLabels,
  isLoading,
  height = 650,
}: ScatterChartProps) {
  // --- DATA ---
  const scatterData: ChartData<"scatter", ScatterPoint[]> = useMemo(() => {
    if (!samples.length) {
      return { datasets: [] };
    }

    const grouped: Record<
      string,
      {
        label: string;
        data: ScatterPoint[];
        backgroundColor: string;
        pointRadius: number;
        pointHoverRadius: number;
      }
    > = {};

    samples.forEach((sample) => {
      const label = sample.label;

      if (!grouped[label]) {
        grouped[label] = {
          label,
          data: [],
          backgroundColor: getColor(label, cropLabels),
          pointRadius: 6,
          pointHoverRadius: 8,
        };
      }

      grouped[label].data.push({
        x: sample.temperature,
        y: sample.humidity,
        crop: label,
        ph: sample.ph,
      });
    });

    return {
      datasets: Object.values(grouped),
    };
  }, [samples, cropLabels]);

  // --- OPTIONS ---
  const scatterOptions: ChartOptions<"scatter"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,

      interaction: {
        mode: "nearest",
        intersect: false,
      },

      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 20,
            color: "#4b5563",
          },
        },

        title: {
          display: true,

          // ✅ CONTEGGIO CORRETTO DEI PUNTI VISIBILI
          text: (ctx) => {
            const chart = ctx.chart;

            const visiblePoints = chart.data.datasets.reduce(
              (sum, dataset, index) => {
                const meta = chart.getDatasetMeta(index);
                if (meta.hidden) return sum;
                return sum + (dataset.data?.length ?? 0);
              },
              0
            );

            return `Punti visibili: ${visiblePoints}`;
          },

          font: { size: 16, weight: "bold" },
          color: "#4b5563",
          align: "start",
          padding: { bottom: 20 },
        },

        tooltip: {
          mode: "nearest",
          intersect: false,
          callbacks: {
            label: (ctx) => {
              const raw = ctx.raw as ScatterPoint;

              return `${raw.crop} — Temp: ${raw.x.toFixed(
                1
              )}°C • Umidità: ${raw.y.toFixed(1)}% • pH: ${raw.ph.toFixed(2)}`;
            },
          },
        },
      },

      scales: {
        x: {
          type: "linear",
          title: {
            display: true,
            text: "Temperatura (°C)",
            font: { weight: "bold" },
            color: "#1f2937",
          },
          grid: { color: "#e5e7eb" },
        },
        y: {
          type: "linear",
          title: {
            display: true,
            text: "Umidità (%)",
            font: { weight: "bold" },
            color: "#1f2937",
          },
          grid: { color: "#e5e7eb" },
        },
      },
    }),
    []
  );

  // --- RENDER ---
  return (
    <div style={{ height, width: "100%" }}>
      {isLoading ? (
        <LoadingIndicator text="Caricamento dati campioni..." className="h-full" />
      ) : samples.length === 0 ? (
        <EmptyState message="Nessun campione soddisfa i filtri selezionati." />
      ) : (
        <Scatter data={scatterData} options={scatterOptions} />
      )}
    </div>
  );
}
