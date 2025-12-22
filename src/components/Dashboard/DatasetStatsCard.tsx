import { useMemo } from "react";
import type { CropSample } from "../../types/crop";
import { getDatasetStats } from "../../utils/datasetStats";
import { BADGE_COLORS } from "../../constants/badges";
import type { BadgeColor } from "../../constants/badges";

type StatRow = {
  label: string;
  color: BadgeColor;
  min: { value: string | number; label: string };
  max: { value: string | number; label: string };
};

type DatasetStatsCardProps = {
  samples: CropSample[];
};

export default function DatasetStatsCard({
  samples,
}: DatasetStatsCardProps) {
  const datasetStats = useMemo(() => {
    if (!samples.length) return null;
    return getDatasetStats(samples);
  }, [samples]);

  const rows: StatRow[] = useMemo(() => {
    if (!datasetStats) return [];

    return [
      {
        label: "Azoto (N)",
        color: "emerald",
        min: datasetStats.N.min,
        max: datasetStats.N.max,
      },
      {
        label: "Fosforo (P)",
        color: "indigo",
        min: datasetStats.P.min,
        max: datasetStats.P.max,
      },
      {
        label: "Potassio (K)",
        color: "orange",
        min: datasetStats.K.min,
        max: datasetStats.K.max,
      },
      {
        label: "Temperatura (°C)",
        color: "red",
        min: {
          value: datasetStats.temperature.min.value.toFixed(1),
          label: datasetStats.temperature.min.label,
        },
        max: {
          value: datasetStats.temperature.max.value.toFixed(1),
          label: datasetStats.temperature.max.label,
        },
      },
      {
        label: "Umidità (%)",
        color: "blue",
        min: datasetStats.humidity.min,
        max: datasetStats.humidity.max,
      },
      {
        label: "pH",
        color: "purple",
        min: {
          value: datasetStats.ph.min.value.toFixed(2),
          label: datasetStats.ph.min.label,
        },
        max: {
          value: datasetStats.ph.max.value.toFixed(2),
          label: datasetStats.ph.max.label,
        },
      },
      {
        label: "Pioggia (mm)",
        color: "cyan",
        min: datasetStats.rainfall.min,
        max: datasetStats.rainfall.max,
      },
    ];
  }, [datasetStats]);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      {/* HEADER */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          Statistiche Dataset
        </h3>
        <p className="text-sm text-gray-500">
          Valori minimi e massimi per ogni feature
        </p>
      </div>

      {/* BODY */}
      <div className="space-y-4 flex-1 flex flex-col justify-between">
        {rows.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-800">
              {item.label}
            </span>

            <div className="flex items-center gap-3 text-xs">
              <span className={BADGE_COLORS[item.color].min}>
                min {item.min.value} · {item.min.label}
              </span>
              <span className={BADGE_COLORS[item.color].max}>
                max {item.max.value} · {item.max.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
